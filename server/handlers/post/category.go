package post

import (
	"database/sql"
	"io"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/handlers/messages"
	"github.com/facundocarballo/task-manager/types"
)

func CrateCategory(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
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

	// Convert the body to a Category
	category := types.BodyToCategory(body)
	if category == nil {
		http.Error(w, messages.ERROR_BODY_TO_CATEGORY, http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.
	// TODO: Check that the ColorID exist, if is not, we have to create that Color.
	// TODO: Check that the ParenId it's owned for the same user that make this request.

	// Create the Task
	err = db.CreateCategory(database, category)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(messages.POST_REQUEST_SUCCESSFUL))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(messages.CANNOT_CREATE_CATEGORY + " " + err.Error()))
	}

	return true
}

func DeleteCategory(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
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

	// Convert the body to a Category
	category := types.BodyToCategory(body)
	if category == nil {
		http.Error(w, messages.ERROR_BODY_TO_CATEGORY, http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.

	// Create the Task
	err = db.DeleteCategory(database, category)

	// TODO: Check if this Category has Task to do, and delete those tasks.

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(messages.POST_REQUEST_SUCCESSFUL))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(messages.CANNOT_DELETE_CATEGORY + " " + err.Error()))
	}

	return true
}
