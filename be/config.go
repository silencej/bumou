package main

import (
	"encoding/json"
	"log"
	"os"
	"path/filepath"

	"github.com/spf13/viper"
)

var (
	defaultCfgPath string
	appName        string = ""
)

var config *viper.Viper

func init() {
	// Default ConfigName is "config", ConfigType is none.
	// You need to set ConfigType, and also AddConfigPath.
	// viper.SetConfigName("config")         // name of config file (without extension)
	viper.SetConfigType("yaml")

	p, err := os.UserConfigDir()
	if err != nil {
		log.Panicln(err)
	}
	if appName == "" {
		appName = filepath.Base(os.Args[0])
	}
	defaultCfgPath = filepath.Join(p, appName)
	log.Println("Default cfg path: ", defaultCfgPath)
	if err := os.MkdirAll(defaultCfgPath, 0755); err != nil {
		log.Panicln(err)
	}

	viper.AddConfigPath(defaultCfgPath) // The first path will be the default place to save config.
	viper.SetDefault("staticDir", ".")

	readCfg()
	log.Println("Current config: \n", map2str(viper.AllSettings()))

	config = viper.GetViper()
}

func writeDefault() {
	if err := viper.SafeWriteConfig(); err != nil {
		log.Panicln(err)
	}
}

func readCfg() {
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			log.Println("Config file not found: ", err)
			writeDefault()
			log.Println("Write default config to the path: ", defaultCfgPath)
		} else {
			// Config file was found but another error was produced
			log.Panicln(err)
		}
	}
}

func map2str(m map[string]interface{}) string {
	mJson, err := json.MarshalIndent(m, "", "  ")
	if err != nil {
		log.Panicln(err)
	}
	jsonStr := string(mJson)
	return jsonStr
}
