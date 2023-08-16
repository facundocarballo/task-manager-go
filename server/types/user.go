package types

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

	return &User{
		Id:       1,
		Username: "facundo",
		Email:    "facu@gmail.com",
		Password: "facundo00",
	}
}
