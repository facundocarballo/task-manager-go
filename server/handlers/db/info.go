package db

const DATABASE_NAME = "taskmanager"
const DATABASE_USER = "root"
const DATABASE_PASSWORD = "12345"
const DATABASE_HOST = "127.0.0.1"
const DATABASE_PORT = "3306"
const DATABASE_DATASOURCE = DATABASE_USER + ":" + DATABASE_PASSWORD + "@tcp(" + DATABASE_HOST + ":" + DATABASE_PORT + ")/" + DATABASE_NAME + "?parseTime=true"