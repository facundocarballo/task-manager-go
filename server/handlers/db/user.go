package db

import (
	"database/sql"

	"github.com/facundocarballo/task-manager/handlers/crypto"
	"github.com/facundocarballo/task-manager/types"
)

func CreateUser(database *sql.DB, user *types.User) error {

	_, err := database.Exec(
		INSERT_USER_STATEMENT,
		user.Username,
		user.Email,
		crypto.TextToHash(user.Password),
	)

	return err
}
