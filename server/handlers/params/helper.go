package params

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/facundocarballo/task-manager/handlers/messages"
	"github.com/facundocarballo/task-manager/types"
)

func CheckParam(w http.ResponseWriter, r *http.Request, parameter string) bool {
	queryParams := r.URL.Query()

	if !queryParams.Has(parameter) {
		http.Error(w, "Parameter not found. Looking for `"+parameter+"` in the URL requested.", 404)
		return false
	}

	return true
}

func GetParam(parameter string, r *http.Request) string {
	queryParams := r.URL.Query()

	return strings.Replace(queryParams.Get(parameter), "\"", "", -1)
}

func GetUserFromId(w http.ResponseWriter, r *http.Request) *types.User {
	userIdStr := GetParam(USER_ID, r)
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, messages.ERROR_GETTING_USER_ID, http.StatusInternalServerError)
		return nil
	}
	user := types.CreateUser(userId, "", "", "")
	return &user
}

func GetTaskFromCategoryId(w http.ResponseWriter, r *http.Request) *types.Task {
	categoryIdStr := GetParam(CATEGORY_ID, r)
	categoryId, err := strconv.Atoi(categoryIdStr)
	if err != nil {
		http.Error(w, messages.ERROR_GETTING_USER_ID, http.StatusInternalServerError)
		return nil
	}

	task := types.CreateTask(0, "", "", time.Now(), nil, categoryId)

	return &task
}
