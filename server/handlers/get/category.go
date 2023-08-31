package get

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/params"
	"github.com/facundocarballo/task-manager/types"
)

func GetCategories(w http.ResponseWriter, r *http.Request, database *sql.DB) {
	if !params.CheckParam(w, r, params.USER_ID) {
		return
	}
	userId := params.GetParam(params.USER_ID, r)

	// Make the Query
	rows, err := database.Query("SELECT * FROM Category WHERE owner = " + userId)
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
