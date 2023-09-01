package db

const INSERT_USER_STATEMENT = "INSERT INTO User (username, email, password) VALUES (?, ?, ?)"
const INSERT_TASK_STATEMENT = "INSERT INTO Task (name, description, created, mustEnd, categoryId) VALUES (?, ?, ?, ?, ?)"
