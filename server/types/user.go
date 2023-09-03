package types

import (
	"encoding/json"
)

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func BodyToUser(body []byte) *User {
	if len(body) == 0 {
		return nil
	}

	var user User
	err := json.Unmarshal(body, &user)
	if err != nil {
		return nil
	}

	return &user
}

func CreateUser(id int, username string, email string, password string) User {
	return User{
		Id:       id,
		Username: username,
		Email:    email,
		Password: password,
	}
}
