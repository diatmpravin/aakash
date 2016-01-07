package api

import (
	"github.com/diatmpravin/gagan/api"
	"github.com/diatmpravin/gagan/commands"
	"github.com/diatmpravin/gagan/configuration"
	"github.com/diatmpravin/gagan/requirements"
	"net/http"
	"strings"
	"text/template"
)

// var configRepo = configuration.NewConfigurationDiskRepository()
var config = configuration.GetDefaultConfig()

var repoLocator = api.NewRepositoryLocator(config)
var cmdFactory = commands.NewFactory(repoLocator)

var reqFactory = requirements.NewFactory(repoLocator)
var cmdRunner = commands.NewRunner(reqFactory)

// custom template delimiters since the Go default delimiters clash
// with Angular's default.
var templateDelims = []string{"{{%", "%}}"}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	t := template.New("login.html")
	t.Delims(templateDelims[0], templateDelims[1])
	t.ParseFiles("web/pages/login.html")
	t.Execute(w, t)
}

// SessionHandler handle the session request of GET, POST, DELETE etc.
func SessionHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		commands.SessionPostCase(w, r)
	}
}

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	t := template.New("index.html")
	t.Delims(templateDelims[0], templateDelims[1])
	t.ParseFiles("web/pages/index.html")
	t.Execute(w, t)
}

// OrgsHandler handle the org request of GET, POST, DELETE etc.
func OrgsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		switch r.URL.Path {
		case "/listallorganizations":
			cmd := cmdFactory.NewOrganizationList()
			cmdRunner.Run(w, r, cmd)
		}
	}
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
