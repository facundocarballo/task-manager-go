package crypto

import (
	"fmt"
	"os"
	"time"

	"github.com/facundocarballo/task-manager/types"
	"github.com/golang-jwt/jwt/v4"
)

const JWT_KEY = "JWT_KEY"

func GenerateJWT(user types.User) *string {
	secretKey := []byte(os.Getenv(JWT_KEY))

	oneDay := time.Hour * 24
	oneMoth := oneDay * 30
	oneYear := oneMoth*12 + (5 * oneDay)

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = "facundocarballo"
	claims["password"] = ""
	claims["expirationTime"] = time.Now().Add(oneYear).Unix()

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		fmt.Println("Error al firmar el token:", err)
		return nil
	}

	return &tokenString
}

func ValidateJWT(tokenString string) {
	secretKey := []byte(os.Getenv(JWT_KEY))

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("sign method not valid")
		}
		return secretKey, nil
	})

	if err != nil {
		return
	}

	// Verificar si el token es válido y no ha expirado
	if !token.Valid {
		return
	}

	// El token es válido, puedes permitir que el usuario acceda al recurso protegido
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return
	}

	// Ahora puedes acceder a los datos del token
	username := claims["username"].(string)
	password := claims["password"].(string)
	exp := claims["expirationTime"].(float64)

	println("Username: ", username)
	println("Password: ", password)
	println("Expiration Time: ", exp)
}
