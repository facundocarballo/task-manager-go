package types

type Category struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	CratedBy int    `json:"created_by"`
}
