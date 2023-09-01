package db

// Usser
const INSERT_USER_STATEMENT = "INSERT INTO User (username, email, password) VALUES (?, ?, ?)"
const DELETE_USER_STATEMENT = "DELETE FROM User WHERE id = (?)"

// Task
const INSERT_TASK_STATEMENT = "INSERT INTO Task (name, description, created, mustEnd, categoryId) VALUES (?, ?, ?, ?, ?)"
const INSERT_TASK_COMPLETED_STATEMENT = "INSERT INTO TaskCompleted (taskId, date) VALUES (?, ?)"
const INSERT_TASK_DELETED_STATEMENT = "INSERT INTO TaskDeleted (taskId, date) VALUES (?, ?)"

// Category
const INSERT_CATEGORY_STATEMENT = "INSERT INTO Category (name, description, owner, colorId, parentId) VALUES (?, ?, ?, ?, ?)"
const DELETE_CATEGORY_STATEMENT = "DELETE FROM Category WHERE id = (?)"
