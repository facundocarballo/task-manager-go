package db

import (
	"database/sql"
	"os"

	"github.com/facundocarballo/task-manager/handlers/db/queries"
)

const DATABASE_NAME = "taskmanager"
const DATABASE_USER = "facundocarballo"
const DATABASE_HOST = "task-manager.c9crueea8b3q.us-east-2.rds.amazonaws.com"
const DATABASE_PORT = "3306"
const DB_KEY = "DB_KEY"

func GetDatabaseDatasource() string {
	return DATABASE_USER + ":" + os.Getenv(DB_KEY) + "@tcp(" + DATABASE_HOST + ":" + DATABASE_PORT + ")/" + DATABASE_NAME + "?parseTime=true"
}

func GetLastIdInserted(database *sql.DB) int {
	rows, err := database.Query(queries.GET_LAST_ID_INSERTED)
	if err != nil {
		return -1
	}
	defer rows.Close()

	var colors []int
	for rows.Next() {
		var color int
		err := rows.Scan(&color)
		if err != nil {
			return -1
		}
		colors = append(colors, color)
	}

	return colors[0]
}
