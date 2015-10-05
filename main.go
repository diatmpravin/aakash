package main

import (
	"aakash/api"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func init() {
	router := NewRouter()
	http.Handle("/", router)
}

// NewRouter creates a new router to handle all the requests
func NewRouter() http.Handler {
	router := mux.NewRouter()
	router.HandleFunc("/", api.IndexHandler)
	router.HandleFunc("/save", api.SaveHandler)

	return api.CORS(router)
}

func main() {
	log.Printf("Listening Server........:8080")
	if err := http.ListenAndServe("0.0.0.0:8080", nil); err != nil {
		log.Fatalf("ListenAndServe", err)
	}
}
