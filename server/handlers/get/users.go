package get

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/facundocarballo/task-manager/types"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request, database *sql.DB) {
	rows, err := database.Query("SELECT id, username, email FROM USER")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

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

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}
