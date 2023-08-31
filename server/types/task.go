package types

import (
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
