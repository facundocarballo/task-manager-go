package errorsmessages

import (
	"github.com/facundocarballo/task-manager/handlers/params"
)

func GetErrorMessageOfParameterNotFound(parameter string) string {

	switch parameter {
	case params.USER_EMAIL:
		return USER_EMAIL_NOT_FOUND
	case params.USER_ID:
		return USER_ID_NOT_FOUND
	case params.USER_USERNAME:
		return USER_USERNAME_NOT_FOUND
	case params.CATEGORY_ID:
		return CATEGORY_ID_NOT_FOUND
	case params.TASK_ID:
		return TASK_ID_NOT_FOUND
	}

	return ""
}
