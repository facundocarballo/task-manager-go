package types

import "time"

type TaskCompleted struct {
	Id        int       `json:"id"`
	Task      Task      `json:"task"`
	Completed time.Time `json:"completed"`
}
