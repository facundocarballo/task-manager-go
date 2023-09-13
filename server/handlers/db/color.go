package db

import (
	"database/sql"

	"github.com/facundocarballo/task-manager/handlers/db/queries"
	"github.com/facundocarballo/task-manager/types"
)

func GetColorId(database *sql.DB, hex string) int {
	rows, err := database.Query(queries.GET_COLOR_FROM_HEX + hex)
	if err != nil {
		return -1
	}
	defer rows.Close()

	var colors []types.Color
	for rows.Next() {
		var color types.Color
		err := rows.Scan(&color.Id, &color.Hex)
		if err != nil {
			return -1
		}
		colors = append(colors, color)
	}

	if len(colors) > 0 {
		return colors[0].Id
	}

	return -1
}

func CreateColor(database *sql.DB, hex string) bool {
	_, err := database.Exec(
		queries.INSERT_COLOR_STATEMENT,
		hex,
	)
	return err == nil
}
