#Aakash
========

Aakash is the open source web console for Cloud Foundry. It permits to connect to any Cloud Foundry API endpoint, for easy administration. At the moment only it allows to manage spaces and apps.

## Source organization

The project is composed for multiple components. The web server and dashboard source code are stored on the `web` folder.

## Development tools

You need the Go runtime to develop this project, as well as the Angular.js for dashboard.

## Getting Started

1. Install Golang
2. Install Redis
3. Clone source code
```
go get github.com/diatmpravin/aakash
cd $GOPATH/
cd $GOPATH/src/github.com/diatmpravin/aakash
go get
```
4. Run Aakash

```
go run main.go
```

## Contributing Guide

1. Install Golang
2. Install Redis
3. Fork Aakash on GitHub
4. Add your fork as a git remote

```
git remote add fork git@github.com:$USER/aakash.git
```

### Create a Feature Branch & Code Away!

Now that you've properly installed and forked Aakash, you are ready to start coding.

In order to have your pull requests accepted, we recommend you make your changes to Aakash on a
new git branch. For example,
```
$ git checkout -b new-feature                             # Create a new branch based on develop and switch to it
$ ...                                                     # Make your changes and commit them
$ git push fork new-feature                               # After new commits, push to your fork
```

### Format Your Code

Remember to run `go fmt` before committing your changes.

### Submit Pull Request

Once you've done all of the above & pushed your changes to your fork, you can create a pull request for review and acceptance.

## Contributing

We encourage you to contribute to Aakash! Please check out the [Contributing to Aakash guide](https://github.com/diatmpravin/aakash#contributing) for guidelines about how to proceed.

## License

Aakash is released under the [MIT License](http://www.opensource.org/licenses/MIT).