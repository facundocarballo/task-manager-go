package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	"github.com/facundocarballo/task-manager/handlers/get"
	"github.com/facundocarballo/task-manager/handlers/post"
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
	http.HandleFunc("/get/users", func(w http.ResponseWriter, r *http.Request) {
		get.GetAllUsers(w, r, database)
	})

	// Get a specefic user -> get/user?userId=1
	http.HandleFunc("/get/user", func(w http.ResponseWriter, r *http.Request) {
		get.GetUser(w, r, database)
	})

	// Get all the categories -> get/categories?userId=1
	http.HandleFunc("/get/categories", func(w http.ResponseWriter, r *http.Request) {
		get.GetCategories(w, r, database)
	})

	// Get a specific category -> get/tasks?categoryId=1
	http.HandleFunc("/get/tasks/", func(w http.ResponseWriter, r *http.Request) {
		get.GetTasks(w, r, database)
	})

	// Post Endpoints
	http.HandleFunc("/post/auth-user", func(w http.ResponseWriter, r *http.Request) {
		post.AuthUser(w, r, database)
	})

	http.HandleFunc("/post/create-user", func(w http.ResponseWriter, r *http.Request) {
		post.CreateUser(w, r, database)
	})

	http.HandleFunc("/post/create-task", func(w http.ResponseWriter, r *http.Request) {
		post.CrateTask(w, r, database)
	})

	http.HandleFunc("/post/complete-task", func(w http.ResponseWriter, r *http.Request) {
		post.CompleteTask(w, r, database)
	})

	http.HandleFunc("/post/delete-task", func(w http.ResponseWriter, r *http.Request) {
		post.DeleteTask(w, r, database)
	})

	http.HandleFunc("/post/delete-user", func(w http.ResponseWriter, r *http.Request) {
		post.DeleteUser(w, r, database)
	})

	http.HandleFunc("/post/category", func(w http.ResponseWriter, r *http.Request) {
		post.CrateCategory(w, r, database)
	})

	http.HandleFunc("/post/delete-category", func(w http.ResponseWriter, r *http.Request) {

	})

	// Listen
	fmt.Println("Server listening on: localhost" + PORT)
	http.ListenAndServe(PORT, nil)

}
