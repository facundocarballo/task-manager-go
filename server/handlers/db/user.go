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

func GetUserFromId(id string, database *sql.DB) *types.User {
	rows, err := database.Query(queries.GET_USER_BY_ID + id)
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
