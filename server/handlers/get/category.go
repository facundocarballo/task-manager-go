package get

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/facundocarballo/task-manager/handlers/crypto"
	"github.com/facundocarballo/task-manager/handlers/messages"
	"github.com/facundocarballo/task-manager/handlers/params"
	"github.com/facundocarballo/task-manager/types"
)

func GetCategories(w http.ResponseWriter, r *http.Request, database *sql.DB) {
	if !params.CheckParam(w, r, params.USER_ID) {
		return
	}

	user := params.GetUserFromId(w, r)
	if user == nil {
		return
	}

	tokenString := crypto.GetJWTFromRequest(w, r)
	if tokenString == nil {
		return
	}

	if !crypto.ValidateJWT(*tokenString, *user, crypto.ID_KEY) {
		http.Error(w, messages.JWT_DONT_MATCH_WITH_USER, 404)
		return
	}

	// Make the Query
	rows, err := database.Query("SELECT * FROM Category WHERE owner = " + strconv.Itoa(user.Id))
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	// Iterate Rows
	var categories []types.Category
	for rows.Next() {
		var category types.Category
		err := rows.Scan(&category.Id, &category.Name, &category.Description, &category.Owner, &category.ColorId, &category.ParentId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		categories = append(categories, category)
	}

	// Check Error on Rows
	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send response to the client
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(categories)
}
