package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/handlers/get"
	_ "github.com/go-sql-driver/mysql"
)

// Global Variables
var database *sql.DB
var err error

const PORT string = ":3690"

func main() {
	database, err = sql.Open("mysql", db.DATABASE_DATASOURCE)
	if err != nil {
		panic(err)
	}
	defer database.Close()

	// Get Endpoints
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		get.GetAllUsers(w, r, database)
	})

	// Listen
	fmt.Println("Server listening on: localhost" + PORT)
	http.ListenAndServe(PORT, nil)

}
