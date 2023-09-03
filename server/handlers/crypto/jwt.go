package crypto

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/facundocarballo/task-manager/types"
	"github.com/golang-jwt/jwt/v4"
)

const JWT_KEY = "JWT_KEY"
const USERNAME_KEY = "username"
const PASSWORD_KEY = "password"
const ID_KEY = "id"
const EMAIL_KEY = "email"

func GenerateJWT(user types.User) *string {
	secretKey := []byte(os.Getenv(JWT_KEY))
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims[USERNAME_KEY] = user.Username
	claims[PASSWORD_KEY] = TextToHash(user.Password)
	claims[ID_KEY] = user.Id
	claims[EMAIL_KEY] = user.Email

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		fmt.Println("Error signing the token.", err)
		return nil
	}

	return &tokenString
}

func ValidateJWT(tokenString string, user types.User, key string) bool {
	secretKey := []byte(os.Getenv(JWT_KEY))

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("sign method not valid")
		}
		return secretKey, nil
	})

	if err != nil {
		return false
	}

	if !token.Valid {
		return false
	}

	// El token es válido, puedes permitir que el usuario acceda al recurso protegido
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return false
	}

	switch key {
	case "id":
		return user.Id == claims[ID_KEY].(int)
	case "username":
		return user.Username == claims[USERNAME_KEY].(string)
	case "email":
		return user.Email == claims[EMAIL_KEY].(string)
	case "password":
		return user.Password == claims[PASSWORD_KEY].(string)
	default:
		return false
	}
}

func GetJWTFromRequest(w http.ResponseWriter, r *http.Request) *string {
	authHeader := r.Header.Get("Authorization")

	if authHeader == "" {
		http.Error(w, "'Authorization' Header missing.", http.StatusUnauthorized)
		return nil
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		http.Error(w, "'Authorization' Header Incorrect Format.", http.StatusUnauthorized)
		return nil
	}

	return &parts[1]
}
