package main

import (
	"github.com/diatmpravin/aakash/api"
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

	// Login handlers
	router.HandleFunc("/", api.LoginHandler)
	router.HandleFunc("/session/dashboard", api.DashboardHandler)

	// Session handlers
	router.HandleFunc("/session/new", api.SessionHandler)

	// Organization API handlers
	router.HandleFunc("/listallorganizations", api.OrgsHandler)

	// Space API handers
	router.HandleFunc("/listallspaces", api.SpaceHandler)

	// Apps API handlers
	router.HandleFunc("/listallapps", api.AppHandler)
	router.HandleFunc("/stopinganapp", api.AppHandler)
	router.HandleFunc("/startinganapp", api.AppHandler)

	return api.CORS(router)
}

func serveResource(w http.ResponseWriter, req *http.Request) {
	path := "web" + req.URL.Path
	http.ServeFile(w, req, path)
}

func main() {
	log.Printf("Listening Server........:8081")

	// CSS
	http.HandleFunc("/bower_components/bootstrap/dist/css/", serveResource)
	http.HandleFunc("/bower_components/font-awesome/css/", serveResource)
	http.HandleFunc("/bower_components/font-awesome/fonts/", serveResource)
	http.HandleFunc("/bower_components/metisMenu/dist/", serveResource)
	http.HandleFunc("/bower_components/morrisjs/", serveResource)
	http.HandleFunc("/dist/css/", serveResource)

	// Jquery
	http.HandleFunc("/bower_components/jquery/dist/", serveResource)
	http.HandleFunc("/bower_components/raphael/", serveResource)
	http.HandleFunc("/bower_components/bootstrap/dist/js/", serveResource)
	http.HandleFunc("/dist/js/", serveResource)
	http.HandleFunc("/js/", serveResource)

	if err := http.ListenAndServe("0.0.0.0:8081", nil); err != nil {
		log.Fatalf("ListenAndServe", err)
	}
}
