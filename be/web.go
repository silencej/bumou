package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	// "io/ioutil"

	"github.com/gin-contrib/cache/persistence"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var serverUrl = os.Getenv("SERVER_URL")

func init() {
	if serverUrl == "" {
		serverUrl = "http://0.0.0.0:58800"
	}
}

func getUrl(url string) string {
	if strings.Contains(url, "//") {
		res := strings.Split(serverUrl, "//")
		return res[1]
	}
	return url
}

func getPort(url string) string {
	res := strings.Split(serverUrl, "//")
	res = strings.Split(res[1], ":")
	if len(res) != 2 {
		log.Panic("Input url is not URL format: ", url)
	}
	return res[1]
}

func configCors(r *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin", "Authorization", "Content-Type"}
	// log.Println(config)
	r.Use(cors.New(config))
}

func mainWeb() {
	// r := gin.Default()
	engine := gin.New()
	engine.Use(gin.Logger(), gin.CustomRecovery(func(c *gin.Context, err any) {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err)
	}))

	// html := template.Must(template.ParseGlob("src/templates/*"))
	// r.SetHTMLTemplate(html)

	configCors(engine)

	r := engine.Group("/api")

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	cwd, err := os.Getwd()
	if err != nil {
		log.Panicln(err)
	}
	// Now you can visit /static/web.go
	r.Static("/static", filepath.Join(cwd, config.GetString("staticDir")))

	// authorized := ConfigOidc(r)
	// authorized.GET("/hello", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"message": "authorized",
	// 	})
	// })
	// authorized.GET("/", func(c *gin.Context) {
	//
	// })

	authed := checkAuth(r)

	authed.POST("/profile", func(c *gin.Context) {
		var input User
		if err := c.ShouldBindJSON(&input); err != nil {
			log.Panic(err)
		}
		log.Println("Input: ", input)

		var user User
		ensureDB(db.First(&user, "id = ?", c.Keys["userId"]))

		if user.Email != input.Email {
			log.Panicln("Email not match!")
		}

		ensureDB(db.Model(&user).Omit("ID", "Email", "Password", "Token").Updates(input))
		c.JSON(http.StatusOK, gin.H{})
	})

	authed.POST("/profile/avatar", func(c *gin.Context) {
		var input struct {
			Avatar string
		}
		if err := c.ShouldBindJSON(&input); err != nil {
			log.Panic(err)
		}
		log.Println("Input: ", input)

		var user User
		ensureDB(db.First(&user, "id = ?", c.Keys["userId"]))

		ensureDB(db.Model(&user).Omit("ID", "Email", "Password", "Token").Update("avatar", input.Avatar))
		c.JSON(http.StatusOK, gin.H{})
	})

	authed.POST("/posts", func(c *gin.Context) {
		var input struct {
			// Date time.Time
			Mood string
			Desc string
		}
		if err := c.BindJSON(&input); err != nil {
			log.Panicln(err)
		}
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))
		post := Post{
			Date: time.Now(),
			Mood: input.Mood,
			Desc: input.Desc,
		}
		ensureDB(db.Create(&post))
		log.Println("post id: ", post.ID)
		if err := db.Model(&user).Association("Posts").Append(&post); err != nil {
			log.Panicln(err)
		}
		c.JSON(http.StatusOK, gin.H{})
	})

	authed.GET("/posts", func(c *gin.Context) {
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))
		var posts []Post
		ensureDB(db.Preload("Likes").Preload("Comments").Preload("Comments.From").Preload("User").Order("updated_at desc").Find(&posts))
		var output []Post
		for _, p := range posts {
			if p.User.UserType == user.UserType {
				output = append(output, p)
			}
		}
		// log.Println("GET posts: ", posts)
		c.JSON(http.StatusOK, output)
	})

	authed.GET("/myposts", func(c *gin.Context) {
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))
		var posts []Post
		ensureDB(db.Preload("Likes").Preload("Comments").Find(&posts, "user_id = ?", user.ID))
		// log.Println("GET posts: ", posts)
		c.JSON(http.StatusOK, posts)
	})

	authed.POST("/likes", func(c *gin.Context) {
		var input struct {
			PostID uint
		}
		if err := c.BindJSON(&input); err != nil {
			log.Panicln(err)
		}
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))
		like := Like{
			PostID: input.PostID,
			FromID: user.ID,
		}
		ensureDB(db.Create(&like))
		log.Println("like id: ", like.ID)
		c.JSON(http.StatusOK, gin.H{})
	})
	authed.DELETE("/likes/:postID", func(c *gin.Context) {
		postID := c.Param("postID")
		if postID == "" {
			log.Panicln("postID is empty")
		}
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))

		var like Like
		ensureDB(db.Where("post_id = ?", postID).First(&like, "from_id = ?", user.ID))

		if like.FromID != user.ID {
			log.Panicln("No right to unlike")
		}
		ensureDB(db.Delete(&like))
		c.JSON(http.StatusOK, gin.H{})
	})

	authed.POST("/comments", func(c *gin.Context) {
		var input struct {
			PostID uint
			Text   string
		}
		if err := c.BindJSON(&input); err != nil {
			log.Panicln(err)
		}
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))
		comment := Comment{
			Text:   input.Text,
			PostID: input.PostID,
			FromID: user.ID,
		}
		ensureDB(db.Create(&comment))
		log.Println("comment id: ", comment.ID)
		c.JSON(http.StatusOK, gin.H{})
	})
	authed.DELETE("/comments/:id", func(c *gin.Context) {
		commentID := c.Param("id")
		if commentID == "" {
			log.Panicln("commentID is empty")
		}
		var comment Comment
		ensureDB(db.First(&comment, commentID))
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))

		if comment.FromID != user.ID {
			log.Panicln("No right to uncomment")
		}
		ensureDB(db.Delete(comment))
		c.JSON(http.StatusOK, gin.H{})
	})

	authed.GET("/users", func(c *gin.Context) {
		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))

		var users []User
		// ensureDB(db.Not("id = ?", user.ID).Find(&users))
		ensureDB(db.Find(&users))

		var output []User
		for _, u := range users {
			if u.UserType == user.UserType {
				output = append(output, u)
			}
		}

		// log.Println("GET posts: ", posts)
		c.JSON(http.StatusOK, output)
	})

	authed.POST("/chat", func(c *gin.Context) {
		log.Println("/chat request: ", c.Request)
		// x, _ := ioutil.ReadAll(c.Request.Body)
		// log.Println("/chat request body: ", x)

		var input struct {
			Tag  string
			Text string
		}
		if err := c.ShouldBindJSON(&input); err != nil {
			log.Panicln(err)
		}

		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))

		chat := Chat{
			From: user,
			Tag:  input.Tag,
			Text: input.Text,
		}
		ensureDB(db.Save(&chat))
		// log.Println("GET posts: ", posts)
		c.JSON(http.StatusOK, gin.H{})
	})

	authed.GET("/chat", func(c *gin.Context) {
		var input struct {
			Tag string
		}
		if err := c.BindQuery(&input); err != nil {
			log.Panicln(err)
		}

		if input.Tag == "" {
			c.JSON(http.StatusOK, gin.H{})
		}

		var user User
		ensureDB(db.First(&user, c.Keys["userId"]))
		var chat []Chat
		ensureDB(db.Find(&chat, "tag = ?", input.Tag))
		c.JSON(http.StatusOK, chat)
	})

	//----------

	store := persistence.NewInMemoryStore(time.Minute)
	log.Println(store)
	// All these are time consuming, so use cache for all of them
	// r.GET("/stats/total", cache.CachePage(store, time.Hour*4, getTotalHandler))

	listenUrl := getUrl(serverUrl)
	log.Printf("Listening on %s", listenUrl)
	// log.Panic(http.ListenAndServe(serverUrl, nil))
	log.Panicln(engine.Run(listenUrl))
}
