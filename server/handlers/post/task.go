package post

import (
	"database/sql"
	"io"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/types"
)

func CrateTask(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	// Check Post Method
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return false
	}

	// Read body request
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	// Convert the body to a Task
	task := types.BodyToTask(body)
	if task == nil {
		http.Error(w, "Error transforming the body to task", http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.

	// Create the Task
	err = db.CreateTask(database, task)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("POST Request received correctly."))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Cannot create that task. ERROR: " + err.Error()))
	}

	return true
}

func CompleteTask(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	// Check Post Method
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return false
	}

	// Read body request
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	// Convert the body to a Task
	task := types.BodyToTask(body)
	if task == nil {
		http.Error(w, "Error transforming the body to task", http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.

	// Create the Task
	err = db.CompleteTask(database, task)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("POST Request received correctly."))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Cannot complete that task. ERROR: " + err.Error()))
	}

	return true
}

func DeleteTask(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	// Check Post Method
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return false
	}

	// Read body request
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	// Convert the body to a Task
	task := types.BodyToTask(body)
	if task == nil {
		http.Error(w, "Error transforming the body to task", http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.

	// Create the Task
	err = db.DeleteTask(database, task)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("POST Request received correctly."))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Cannot delete that task. ERROR: " + err.Error()))
	}

	return true
}
