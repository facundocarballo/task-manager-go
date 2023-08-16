package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/facundocarballo/task-manager/handlers/db"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	http.HandleFunc("/", Home)
	http.ListenAndServe(":3690", nil)
}

func Home(w http.ResponseWriter, r *http.Request) {
	database, err := sql.Open("mysql", db.DATABASE_DATASOURCE)
	if err != nil {
		panic(err)
	}
	defer database.Close()

	rows, err := database.Query("SELECT username, email FROM USER")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var username string
		var email string
		err := rows.Scan(&username, &email)
		if err != nil {
			panic(err.Error())
		}
		fmt.Fprintf(w, "Usuario: "+username+"\n")
		fmt.Fprintf(w, "Email: "+email+"\n")
	}

	if err := rows.Err(); err != nil {
		panic(err.Error())
	}
}
