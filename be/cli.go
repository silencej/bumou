package main

import (
	"fmt"
	"time"

	"log"
	"os"

	"github.com/urfave/cli/v2"
)

func mainCli() {

	var language string
	var message string

	app := &cli.App{
		UseShortOptionHandling: true,
		Suggest:                true,
		Compiled:               time.Now(),
		Version:                "1.0.0",
		Description:            "Bumou backend service",
		Authors: []*cli.Author{
			{
				Name:  "Owen",
				Email: "Owen@bumou.com",
			},
		},
		Copyright:      "(c) 2023 bumou",
		DefaultCommand: "web",
	}

	app.Commands = []*cli.Command{

		{
			Name:    "web",
			Aliases: []string{"w"},
			Usage:   "Start web server",
			Action: func(c *cli.Context) error {
				mainWeb()
				return nil
			},
		},

		{
			Name:    "flag",
			Aliases: []string{"f"},
			Usage:   "flag",
			Flags: []cli.Flag{
				&cli.StringFlag{
					Name:    "lang",
					Aliases: []string{"l"},
					Value:   "english",
					Usage:   "`language` for the greeting",
					// Required: true,
					// If EnvVars contains more than one string, the first environment variable that resolves is used.
					EnvVars:     []string{"LEGACY_COMPAT_LANG", "APP_LANG", "LANG"},
					Destination: &language,
				},
			},
			Action: func(c *cli.Context) error {
				name := "Nefertiti"
				if c.NArg() > 0 {
					name = c.Args().Get(0)
				}
				// Both ways work:
				// if c.String("lang") == "spanish" {
				if language == "spanish" {
					fmt.Println("Hola", name)
				} else {
					fmt.Println("Hello", name)
				}
				return nil
			},
		},

		// go run simple.go combine -som "Some message"
		{
			Name:  "combine",
			Usage: "Combining short options",
			Flags: []cli.Flag{
				&cli.BoolFlag{Name: "serve", Aliases: []string{"s"}},
				&cli.BoolFlag{Name: "option", Aliases: []string{"o"}},
				&cli.StringFlag{Name: "message", Aliases: []string{"m"}, Destination: &message},
			},
			Action: func(c *cli.Context) error {
				fmt.Println("serve:", c.Bool("serve"))
				fmt.Println("option:", c.Bool("option"))
				fmt.Println("message:", c.String("message"), message)
				return nil
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
