package db

import (
	"database/sql"
	"strconv"

	"github.com/facundocarballo/task-manager/handlers/db/queries"
	"github.com/facundocarballo/task-manager/types"
)

func CreateCategory(database *sql.DB, category *types.Category) error {

	_, err := database.Exec(
		queries.INSERT_CATEGORY_STATEMENT,
		category.Name,
		category.Description,
		category.Owner,
		category.ColorId,
		category.ParentId,
	)

	return err
}

func DeleteCategory(database *sql.DB, category *types.Category) error {

	_, err := database.Exec(
		queries.DELETE_CATEGORY_STATEMENT,
		category.Id,
	)

	return err
}

func CheckParentId(database *sql.DB, category *types.Category) bool {
	if category.ParentId == nil {
		return true
	}

	rows, err := database.Query(queries.GET_OWNER_CATEGORY_FROM_ID + strconv.Itoa(*category.ParentId))
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	var categories []types.Category
	for rows.Next() {
		var cat types.Category
		err := rows.Scan(&cat.Id, &cat.Name, &cat.Description, &cat.Owner, &cat.ColorId, &cat.ParentId)
		if err != nil {
			return false
		}
		categories = append(categories, cat)
	}

	if len(categories) == 0 {
		return false
	}

	return categories[0].Owner == category.Owner
}
