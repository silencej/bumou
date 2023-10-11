package main

import (
	"fmt"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
	// "github.com/dgrijalva/jwt-go"
)

var hmacSampleSecret []byte

func init() {
	hmacSampleSecret = []byte("my secret key")
}

func createToken(duration time.Duration, email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(duration).Unix(), // Date(2015, 10, 10, 12, 0, 0, 0, time.UTC).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString(hmacSampleSecret)
	log.Println("Generated token: ", tokenString)
	return tokenString, err
}

func verifyToken(tokenString string, email string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return hmacSampleSecret, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		log.Println(claims["email"], claims["exp"])
		if claims["email"] != email {
			log.Println("Email not match, supposed and actual: ", email, claims["email"])
			return fmt.Errorf("Invalid token")
		}
		return nil
	} else {
		log.Println(err)
		return fmt.Errorf("Invalid token")
	}
}
