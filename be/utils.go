package main

import "database/sql"
import "golang.org/x/crypto/bcrypt"

func newNullStringNull() sql.NullString {
	return sql.NullString{}
}

func newNullString(s string) sql.NullString {
	// if len(s) == 0 {
	// 	return sql.NullString{}
	// }
	return sql.NullString{
		String: s,
		Valid:  true,
	}
}

func encPass(s string) (string, error) {
	cost := bcrypt.DefaultCost
	hashed, err := bcrypt.GenerateFromPassword([]byte(s), cost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}
func checkPass(pass string, hashed string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(pass))
	return err
}
