package api

import (
	"net/http"
	"strings"
	"text/template"
)

// custom template delimiters since the Go default delimiters clash
// with Angular's default.
var templateDelims = []string{"{{%", "%}}"}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	t := template.New("login.html")
	t.Delims(templateDelims[0], templateDelims[1])
	t.ParseFiles("web/pages/login.html")
	t.Execute(w, t)
}

// CORS adds the necessary headres to the provided handler,
// allowing cros site requests from all hosts.
func CORS(h http.Handler) http.Handler {
	allowHeaders := strings.Join([]string{
		"Access-Control-Allow-Origin",
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Methods",
		"Content-Type",
		"Set-Cookie",
		"Cookie",
		"X-Login-With",
		"X-Requested-With",
	}, ",")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", r.Header.Get("Origin"))
		w.Header().Add("Access-Control-Allow-Headers", allowHeaders)
		w.Header().Add("Access-Control-Expose-Headers", allowHeaders)
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		if r.Method == "OPTIONS" {
			return
		}
		h.ServeHTTP(w, r)
	})
}
