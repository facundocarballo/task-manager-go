package get

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/crypto"
	"github.com/facundocarballo/task-manager/handlers/db/queries"
	"github.com/facundocarballo/task-manager/handlers/messages"
	"github.com/facundocarballo/task-manager/handlers/params"
	"github.com/facundocarballo/task-manager/types"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request, database *sql.DB) {
	// Make the Query
	rows, err := database.Query("SELECT id, username, email FROM USER")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	// Iterate Rows
	var users []types.User
	for rows.Next() {
		var user types.User
		err := rows.Scan(&user.Id, &user.Username, &user.Email)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		users = append(users, user)
	}

	// Check Error on Rows
	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send response to the client
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func GetUser(w http.ResponseWriter, r *http.Request, database *sql.DB) {
	if !params.CheckParam(w, r, params.USER_EMAIL) {
		return
	}
	user := types.CreateUser(0, "", params.GetParam(params.USER_EMAIL, r), "")

	tokenString := crypto.GetJWTFromRequest(w, r)
	if tokenString == nil {
		return
	}

	if !crypto.ValidateJWT(*tokenString, user, crypto.EMAIL_KEY) {
		http.Error(w, messages.JWT_DONT_MATCH_WITH_USER, 404)
		return
	}

	// Make the Query
	rows, err := database.Query(queries.GET_USER_BY_EMAIL + "'" + user.Email + "'")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	// Iterate Rows
	var users []types.User
	for rows.Next() {
		var user types.User
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.Password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		users = append(users, user)
	}

	// Check Error on Rows
	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send response to the client
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func GetUserPassword(id string, database *sql.DB) *string {
	// Make the Query
	rows, err := database.Query(queries.GET_USER_PASSWORD + id)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	var passwords []string
	for rows.Next() {
		var password string
		err := rows.Scan(&password)
		if err != nil {
			return nil
		}
		passwords = append(passwords, password)
	}

	// Check Error on Rows
	if err := rows.Err(); err != nil {
		return nil
	}

	return &passwords[0]
}
