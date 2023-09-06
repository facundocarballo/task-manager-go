package types

import "encoding/json"

type Category struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Owner       int    `json:"owner"`
	Hex         string `json:"hex"`
	ColorId     *int   `json:"colorId"`
	ParentId    *int   `json:"parentId"`
}

func BodyToCategory(body []byte) *Category {
	if len(body) == 0 {
		return nil
	}

	var category Category
	err := json.Unmarshal(body, &category)
	if err != nil {
		print("ERROR: ", err.Error())
		return nil
	}

	return &category
}
