package types

type Category struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Owner       int    `json:"owner"`
	ColorId     int    `json:"colorId"`
	ParentId    *int   `json:"parentId"`
}
