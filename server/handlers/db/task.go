package db

import (
	"database/sql"
	"time"

	"github.com/facundocarballo/task-manager/types"
)

func CreateTask(database *sql.DB, task *types.Task) error {
	_, err := database.Exec(
		INSERT_TASK_STATEMENT,
		task.Name,
		task.Description,
		time.Now(),
		task.MustEnd,
		task.CategoryId,
	)

	return err
}

func CompleteTask(database *sql.DB, task *types.Task) error {
	_, err := database.Exec(
		INSERT_TASK_COMPLETED_STATEMENT,
		task.Id,
		time.Now(),
	)

	return err
}

func DeleteTask(database *sql.DB, task *types.Task) error {
	_, err := database.Exec(
		INSERT_TASK_DELETED_STATEMENT,
		task.Id,
		time.Now(),
	)

	return err
}
