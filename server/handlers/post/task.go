package post

import (
	"database/sql"
	"io"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/crypto"
	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/handlers/get"
	"github.com/facundocarballo/task-manager/handlers/messages"
	"github.com/facundocarballo/task-manager/types"
)

func CrateTask(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	// Check Post Method
	if r.Method != http.MethodPost {
		http.Error(w, messages.METHOD_NOT_ALLOWED, http.StatusMethodNotAllowed)
		return false
	}

	// Read body request
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	// Convert the body to a Task
	task := types.BodyToTask(body)
	if task == nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}

	user := get.GetTaskOwner(database, task)
	if user == nil {
		http.Error(w, messages.ERROR_GETTING_USER_ID, http.StatusBadRequest)
		return false
	}

	tokenString := crypto.GetJWTFromRequest(w, r)
	if tokenString == nil {
		return false
	}

	if !crypto.ValidateJWT(*tokenString, *user, crypto.ID_KEY) {
		http.Error(w, messages.JWT_DONT_MATCH_WITH_USER, 404)
		return false
	}

	// Create the Task
	err = db.CreateTask(database, task)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(messages.POST_REQUEST_SUCCESSFUL))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(messages.CANNOT_CREATE_TASK + " " + err.Error()))
	}

	return true
}

func CompleteTask(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	// Check Post Method
	if r.Method != http.MethodPost {
		http.Error(w, messages.METHOD_NOT_ALLOWED, http.StatusMethodNotAllowed)
		return false
	}

	// Read body request
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	// Convert the body to a Task
	task := types.BodyToTask(body)
	if task == nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}

	user := get.GetTaskOwner(database, task)
	if user == nil {
		http.Error(w, messages.ERROR_GETTING_USER_ID, http.StatusBadRequest)
		return false
	}

	tokenString := crypto.GetJWTFromRequest(w, r)
	if tokenString == nil {
		return false
	}

	if !crypto.ValidateJWT(*tokenString, *user, crypto.ID_KEY) {
		http.Error(w, messages.JWT_DONT_MATCH_WITH_USER, 404)
		return false
	}

	// Create the Task
	err = db.CompleteTask(database, task)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(messages.POST_REQUEST_SUCCESSFUL))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(messages.CANNOT_COMPLETE_TASK + " " + err.Error()))
	}

	return true
}

func DeleteTask(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	// Check Post Method
	if r.Method != http.MethodPost {
		http.Error(w, messages.METHOD_NOT_ALLOWED, http.StatusMethodNotAllowed)
		return false
	}

	// Read body request
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	// Convert the body to a Task
	task := types.BodyToTask(body)
	if task == nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.

	// Create the Task
	err = db.DeleteTask(database, task)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(messages.POST_REQUEST_SUCCESSFUL))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(messages.CANNOT_DELETE_TASK + " " + err.Error()))
	}

	return true
}
