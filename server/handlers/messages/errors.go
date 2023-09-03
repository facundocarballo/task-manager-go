package messages

import "github.com/facundocarballo/task-manager/handlers/web"

const USER_EMAIL_NOT_FOUND = "Try again with an URL like this `" + web.BASIC_URI + "get/user?userEmail=taskmanager@gmail.com`"
const METHOD_NOT_ALLOWED = "Method not allowed"
const READING_REQUEST_BODY = "Error reading request body"

// User
const ERROR_BODY_TO_USER = "Error converting the body request to User."
const CANNOT_CREATE_USER = "Cannot create that user."
const CANNOT_DELETE_USER = "Cannot create that user."
const ERROR_GETTING_USER_ID = "Error getting the user id."

// Task
const ERROR_BODY_TO_TASK = "Error converting the body request to Task."
const CANNOT_CREATE_TASK = "Cannot create that task."
const CANNOT_COMPLETE_TASK = "Cannot complete that task"
const CANNOT_DELETE_TASK = "Cannot delete that task."

// Category
const ERROR_BODY_TO_CATEGORY = "Error converting the body request to Category."
const CANNOT_CREATE_CATEGORY = "Cannot create that Category."
const CANNOT_DELETE_CATEGORY = "Cannot delete that Category."

// Login
const PASSWORD_EMPTY = "Password field is empty."
const PASSWORD_INCORRECT = "Incorrect Password."
const CANNOT_GET_USER_FROM_ID = "Cannot get user from Id."

// JWT
const JWT_DONT_MATCH_WITH_USER = "JWT doesn't match with the user that you want to request."
