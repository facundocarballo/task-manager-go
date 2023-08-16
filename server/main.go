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
	http.HandleFunc("get/users", func(w http.ResponseWriter, r *http.Request) {
		get.GetAllUsers(w, r, database)
	})

	// Get a specefic user -> get/user?id=10
	http.HandleFunc("get/user", func(w http.ResponseWriter, r *http.Request) {

	})

	// Get all the categories -> get/user?id=10/categories
	http.HandleFunc("get/user/categories", func(w http.ResponseWriter, r *http.Request) {

	})

	// Get a specific category -> get/user?id=10/category?id=9
	http.HandleFunc("get/category/", func(w http.ResponseWriter, r *http.Request) {

	})

	// Post Endpoints
	http.HandleFunc("/post/auth-user", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/post/create-user", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/post/create-task", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/post/complete-task", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/post/delete-task", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/post/delete-user", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/post/category", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/post/delete-category", func(w http.ResponseWriter, r *http.Request) {

	})

	// Listen
	fmt.Println("Server listening on: localhost" + PORT)
	http.ListenAndServe(PORT, nil)

}
