package get

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/facundocarballo/task-manager/handlers/crypto"
	"github.com/facundocarballo/task-manager/handlers/db/queries"
	"github.com/facundocarballo/task-manager/handlers/messages"
	"github.com/facundocarballo/task-manager/handlers/params"
	"github.com/facundocarballo/task-manager/types"
)

func GetTasks(w http.ResponseWriter, r *http.Request, database *sql.DB) {
	if !params.CheckParam(w, r, params.CATEGORY_ID) {
		return
	}

	task := params.GetTaskFromCategoryId(w, r)
	if task == nil {
		return
	}

	user := GetTaskOwner(database, task)
	if user == nil {
		http.Error(w, messages.ERROR_GETTING_USER_ID, http.StatusInternalServerError)
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
	rows, err := database.Query(queries.GET_ALL_TASKS_FROM_CATEGORY_ID + params.GetParam(params.CATEGORY_ID, r))
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

func GetTaskOwner(database *sql.DB, task *types.Task) *types.User {
	rows, err := database.Query(queries.GET_USER_BY_CATEGORY_ID + strconv.Itoa(task.CategoryId) + ")")
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
			return nil
		}
		users = append(users, user)
	}

	// Check Error on Rows
	if err := rows.Err(); err != nil {
		return nil
	}

	return &users[0]
}
