package db

import "os"

const DATABASE_NAME = "taskmanager"
const DATABASE_USER = "root"
const DATABASE_HOST = "127.0.0.1"
const DATABASE_PORT = "3306"
const DB_KEY = "DB_KEY"

func GetDatabaseDatasource() string {
	return DATABASE_USER + ":" + os.Getenv(DB_KEY) + "@tcp(" + DATABASE_HOST + ":" + DATABASE_PORT + ")/" + DATABASE_NAME + "?parseTime=true"
}
