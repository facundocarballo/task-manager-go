package post

import (
	"database/sql"
	"io/ioutil"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/types"
)

func CreateUser(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return false
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	user := types.BodyToUser(body)
	if user == nil {
		http.Error(w, "Error transforming the body to user", http.StatusBadRequest)
		return false
	}

	db.CreateUser(database, *user)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("POST Request received correctly."))

	return true
}