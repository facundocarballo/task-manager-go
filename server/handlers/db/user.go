package db

import (
	"database/sql"
	"strconv"

	"github.com/facundocarballo/task-manager/handlers/crypto"
	"github.com/facundocarballo/task-manager/handlers/db/queries"
	"github.com/facundocarballo/task-manager/handlers/get"
	"github.com/facundocarballo/task-manager/types"
)

func CreateUser(database *sql.DB, user *types.User) error {

	_, err := database.Exec(
		queries.INSERT_USER_STATEMENT,
		user.Username,
		user.Email,
		crypto.TextToHash(user.Password),
	)

	return err
}

func DeleteUser(database *sql.DB, user *types.User) error {

	_, err := database.Exec(
		queries.DELETE_USER_STATEMENT,
		user.Id,
	)

	return err
}

func CheckUserPassword(database *sql.DB, user types.User) bool {
	return *(get.GetUserPassword(strconv.Itoa(user.Id), database)) == user.Password
}
