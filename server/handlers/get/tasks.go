package get

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/params"
	"github.com/facundocarballo/task-manager/types"
)

func GetTasks(w http.ResponseWriter, r *http.Request, database *sql.DB) {
	if !params.CheckParam(w, r, params.CATEGORY_ID) {
		return
	}
	categoryId := params.GetParam(params.CATEGORY_ID, r)

	// Make the Query
	rows, err := database.Query("SELECT * FROM Task WHERE categoryId = " + categoryId)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	// Iterate Rows
	var tasks []types.Task
	for rows.Next() {
		var task types.Task
		err := rows.Scan(&task.Id, &task.Name, &task.Description, &task.Created, &task.MustEnd, &task.CategoryId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		tasks = append(tasks, task)
	}

	// Check Error on Rows
	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send response to the client
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(tasks)
}
