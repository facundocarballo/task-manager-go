package db

import (
	"database/sql"

	"github.com/facundocarballo/task-manager/handlers/db/queries"
	"github.com/facundocarballo/task-manager/types"
)

func CheckColorExist(database *sql.DB, hex string) bool {
	rows, err := database.Query(queries.GET_COLOR_FROM_HEX + hex)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	var colors []types.Color
	for rows.Next() {
		var color types.Color
		err := rows.Scan(&color.Id, &color.Hex)
		if err != nil {
			return false
		}
		colors = append(colors, color)
	}

	return len(colors) > 0
}

func CreateColor(database *sql.DB, hex string) bool {
	_, err := database.Exec(
		queries.INSERT_COLOR_STATEMENT,
		hex,
	)
	return err == nil
}
