package types

import (
	"time"
)

type Task struct {
	Id          int       `json:"id"`
	Created     time.Time `json:"created"`
	Description string    `json:"description"`
	CreatedBy   int       `json:"created_by"`
	Category    int       `json:"category"`
}
