package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", Home)
	http.ListenAndServe(":3690", nil)
}

func Home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world!!!")
}
