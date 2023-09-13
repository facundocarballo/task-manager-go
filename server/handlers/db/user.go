package db

import (
	"database/sql"
	"strconv"

	"github.com/facundocarballo/task-manager/handlers/db/queries"
	"github.com/facundocarballo/task-manager/handlers/get"
	"github.com/facundocarballo/task-manager/types"
)

func CreateUser(database *sql.DB, user *types.User) error {

	_, err := database.Exec(
		queries.INSERT_USER_STATEMENT,
		user.Username,
		user.Email,
		user.Password,
	)

	return err
}

func DeleteUser(database *sql.DB, user *types.User) error {
	// Check if the user have Categories to delete too.
	categories := GetUserCategories(database, user)
	if categories != nil {
		for _, category := range *categories {
			DeleteCategory(database, &category)
		}
	}

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

func GetUserFromUsername(username string, database *sql.DB) *types.User {
	rows, err := database.Query(queries.GET_USER_BY_USERNAME + "'" + username + "'")
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

	if len(users) > 0 {
		return &users[0]
	}

	return nil
}

func GetUserCategories(database *sql.DB, user *types.User) *[]types.Category {
	rows, err := database.Query(queries.GET_CATEGORY_FROM_OWNER + strconv.Itoa(user.Id))
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	// Iterate Rows
	var categories []types.Category
	for rows.Next() {
		var category types.Category
		err := rows.Scan(&category.Id, &category.Name, &category.Description, &category.Owner, &category.ColorId, &category.ParentId)
		if err != nil {
			return nil
		}
		categories = append(categories, category)
	}

	return &categories
}
