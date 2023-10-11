package main

import (
	// "database/sql"
	"log"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

//----- consts

//----- models

type User struct {
	gorm.Model
	Phone       *string `gorm:"unique"`
	Name        *string `gorm:"unique"`
	Email       string  `gorm:"unique"`
	Password    string
	UserType    string
	SchoolName  string
	ClassName   string
	TeacherName string
	Coordinates string
	Token       string
	Posts       []Post
	Avatar      string
}

// func defaultUser() User {
//   user := User{
// 		Phone: "",
// Name:
//   }
// }

type Post struct {
	gorm.Model
	Date     time.Time
	Mood     string
	Desc     string
	User     User
	UserID   uint
	Likes    []Like
	Comments []Comment
	// Comments string
}

type Like struct {
	gorm.Model
	Post   Post
	PostID uint
	From   User
	FromID uint
}

type Comment struct {
	gorm.Model
	Text   string
	Post   Post
	PostID uint
	From   User
	FromID uint
}

type Chat struct {
	gorm.Model
	Tag    string // All participants' ID, ordered increasingly, joined by '-'
	Text   string
	From   User
	FromID uint
}

//----- main

var db *gorm.DB

func init() {
	_db, err := gorm.Open(sqlite.Open("main.db"), &gorm.Config{
		CreateBatchSize: 1000,
	})
	if err != nil {
		log.Panic("failed to connect database")
	}

	// Migrate the schema
	err = _db.Debug().AutoMigrate(&User{}, &Post{}, &Like{}, &Comment{}, &Chat{})
	if err != nil {
		log.Panic(err)
	}

	db = _db
	log.Println("after init: ", db)
}

//----- utils

// Ensure the DB execution has no error
func ensureDB(db *gorm.DB) {
	ensureDBWithMsg(db, "")
}
func ensureDBWithMsg(db *gorm.DB, msg string) {
	if msg == "" {
		msg = "DB error: %s"
	}
	if err := db.Error; err != nil {
		log.Panicf(msg, err)
	}
}
