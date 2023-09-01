package types

import (
	"encoding/json"
	"time"
)

type Task struct {
	Id          int        `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Created     time.Time  `json:"created"`
	MustEnd     *time.Time `json:"mustEnd"`
	CategoryId  int        `json:"category"`
}

func BodyToTask(body []byte) *Task {
	if len(body) == 0 {
		return nil
	}

	var task Task
	err := json.Unmarshal(body, &task)
	if err != nil {
		print("ERROR: ", err.Error())
		return nil
	}

	return &task
}
