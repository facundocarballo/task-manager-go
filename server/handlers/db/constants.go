package db

const DATABASE_NAME = "Facundo"
const DATABASE_USER = "root"
const DATABASE_PASSWORD = "facundo00"
const DATABASE_HOST = "127.0.0.1"
const DATABASE_PORT = "3306"
const DATABASE_DATASOURCE = DATABASE_USER + ":" + DATABASE_PASSWORD + "@tcp(" + DATABASE_HOST + ":" + DATABASE_PORT + ")/" + DATABASE_NAME

const INSERT_USER_STATEMENT = "INSERT INTO User (username, email, password) VALUES (?, ?, ?)"
