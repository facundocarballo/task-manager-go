package queries

// User
const GET_USER_PASSWORD = "SELECT (password) FROM User WHERE id = "
const GET_USER_BY_EMAIL = "SELECT * FROM User WHERE email = "
const GET_USER_BY_ID = "SELECT * FROM User WHERE id = "
const GET_USER_BY_CATEGORY_ID = "SELECT * FROM User WHERE id = (SELECT owner FROM Category WHERE id ="

// Task
const GET_ALL_TASKS_FROM_CATEGORY_ID = "SELECT * FROM Task WHERE categoryId = "
