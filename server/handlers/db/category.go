package db

import (
	"database/sql"

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
