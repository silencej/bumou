package main

import (
	"errors"
	"log"
	"net/http"
	"strings"
	"time"
  // "io/ioutil"

	"github.com/gin-gonic/gin"
)

func checkAuth(r *gin.RouterGroup) *gin.RouterGroup {

	r.POST("/signup", func(c *gin.Context) {
		var user User
		if err := c.Bind(&user); err != nil {
			log.Panic(err)
		}
		hashed, err := encPass(user.Password)
		if err != nil {
			log.Panic(err)
		}
		user.Password = hashed
		token, err := createToken(time.Hour*24*365, user.Email)
		if err != nil {
			log.Panic(err)
		}
		// user.Token = newNullString(token)
		user.Token = token
		ensureDB(db.Create(&user))

		user.Password = ""
		c.JSON(http.StatusOK, user)
	})

	r.POST("/login", func(c *gin.Context) {
		type LoginReq struct {
			UserType string
			Email    string
			Password string
		}
		var loginReq LoginReq
		if err := c.Bind(&loginReq); err != nil {
			log.Panic(err)
		}
		var user User
		ensureDB(db.First(&user, "email = ? and user_type = ?", loginReq.Email, loginReq.UserType))
		if err := checkPass(loginReq.Password, user.Password); err != nil {
			log.Panicln("Fail to auth: ", loginReq.Email)
		}
		token, err := createToken(time.Hour*4, user.Email)
		if err != nil {
			log.Panic(err)
		}
		ensureDB(db.Model(&user).Update("token", token))

		user.Password = ""
		log.Println("login user: ", user)
		c.JSON(http.StatusOK, user)
	})

	authorized := r.Group("/", func(c *gin.Context) {
		// defer func() {
		// 	if x := recover(); x != nil {
		// 		// c.JSON(http.StatusForbidden, "Token missing or invalid")
		// 		log.Println("error: ", x)
		// 		c.AbortWithError(http.StatusForbidden, errors.New("Token missing or invalid"))
		// 	}
		// }()

		// log.Println("Headers: ", c.Request.Header)
		// bearer := c.GetHeader("Authorization")
		// log.Println("bearer: ", bearer)

		// log.Println("/chat request: ", c.Request)

		// x, _ := ioutil.ReadAll(c.Request.Body)
    // log.Println("/chat request body: ", x)

		// Can't use bind in the middleware, otherwise the body will be emptied!!!
		var header struct {
			Authorization string
		}
		if err := c.ShouldBindHeader(&header); err != nil {
			log.Println(err)
			c.AbortWithError(http.StatusForbidden, errors.New("Token missing or invalid"))
		}
		auth := header.Authorization

		// auth := c.GetHeader("Authorization")
		// log.Println("auth: ", auth)
		// if len(auth) == 0 {
		// 	log.Println("Empty Authorization")
		// 	c.AbortWithError(http.StatusForbidden, errors.New("Token missing or invalid"))
		// 	return
		// }

		token := strings.TrimSpace(strings.Split(auth, " ")[1])
		log.Println("token: ", token)

		// Validate token
		var user User
		if err := db.First(&user, "token = ?", token).Error; err != nil {
			log.Println(err)
			c.AbortWithError(http.StatusForbidden, errors.New("Token missing or invalid"))
			return
		}
		if err := verifyToken(token, user.Email); err != nil {
			log.Println(err)
			c.AbortWithError(http.StatusForbidden, errors.New("Token missing or invalid"))
			return
		}

		c.Keys = make(map[string]any)
		c.Keys["userId"] = user.ID
		c.Keys["userEmail"] = user.Email

	})

	return authorized

}
