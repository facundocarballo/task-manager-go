package post

import (
	"database/sql"
	"io"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/types"
)

func CrateCategory(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
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

	// Convert the body to a Category
	category := types.BodyToCategory(body)
	if category == nil {
		http.Error(w, "Error transforming the body to task", http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.
	// TODO: Check that the ColorID exist, if is not, we have to create that Color.
	// TODO: Check that the ParenId it's owned for the same user that make this request.

	// Create the Task
	err = db.CreateCategory(database, category)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("POST Request received correctly."))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Cannot create that Category. ERROR: " + err.Error()))
	}

	return true
}

func DeleteCategory(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
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

	// Convert the body to a Category
	category := types.BodyToCategory(body)
	if category == nil {
		http.Error(w, "Error transforming the body to task", http.StatusBadRequest)
		return false
	}

	// TODO: Check the user who sends this POST Request are the owner of the category.

	// Create the Task
	err = db.DeleteCategory(database, category)

	// TODO: Check if this Category has Task to do, and delete those tasks.

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("POST Request received correctly."))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Cannot delete that Category. ERROR: " + err.Error()))
	}

	return true
}
