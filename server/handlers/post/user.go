package post

import (
	"database/sql"
	"io"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/handlers/messages"
	"github.com/facundocarballo/task-manager/types"
)

func CreateUser(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	if r.Method != http.MethodPost {
		http.Error(w, messages.METHOD_NOT_ALLOWED, http.StatusMethodNotAllowed)
		return false
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	user := types.BodyToUser(body)
	if user == nil {
		http.Error(w, messages.ERROR_BODY_TO_USER, http.StatusBadRequest)
		return false
	}

	err = db.CreateUser(database, user)

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(messages.POST_REQUEST_SUCCESSFUL))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(messages.CANNOT_CREATE_USER + " " + err.Error()))
	}

	return err == nil
}

func AuthUser(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	if r.Method != http.MethodPost {
		http.Error(w, messages.METHOD_NOT_ALLOWED, http.StatusMethodNotAllowed)
		return false
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	user := types.BodyToUser(body)
	if user == nil {
		http.Error(w, messages.ERROR_BODY_TO_USER, http.StatusBadRequest)
		return false
	}

	return true
}

func DeleteUser(w http.ResponseWriter, r *http.Request, database *sql.DB) bool {
	if r.Method != http.MethodPost {
		http.Error(w, messages.METHOD_NOT_ALLOWED, http.StatusMethodNotAllowed)
		return false
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, messages.READING_REQUEST_BODY, http.StatusBadRequest)
		return false
	}
	defer r.Body.Close()

	user := types.BodyToUser(body)
	if user == nil {
		http.Error(w, messages.ERROR_BODY_TO_USER, http.StatusBadRequest)
		return false
	}

	// TODO: Check that the user who sends this POST Request is the user itself.

	err = db.DeleteUser(database, user)

	// TODO: Check if the user have Categories and Tasks and DELETE those too.

	if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(messages.POST_REQUEST_SUCCESSFUL))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(messages.CANNOT_DELETE_USER + " " + err.Error()))
	}

	return err == nil
}
