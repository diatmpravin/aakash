angular.module('myDashboard', [])
.controller('myCtrl', ['$scope','$location', '$window', '$http', function($scope,$location,$window,$http) {

    if(angular.isDefined($window.sessionStorage.sessionid))                 {
        $scope.uname = $window.sessionStorage.uname;
    }

    var sessionid = $window.sessionStorage.sessionid;
    console.log(sessionid);

    $scope.init  =  function() {
        var encodedString = '{"sessionid": '+sessionid+',"Organization": {"Name":"" ,"Guid":"" }}';
        $http({
            method: 'POST',
            url: "/listallorganizations",
            data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            var orgJson = data;
            $scope.orgJson = orgJson;
            $scope["orgFirst"] = orgJson[0];
            console.log($scope["orgFirst"]);
            $scope.listspacesinit(angular.fromJson(orgJson[0]).Name,angular.fromJson(orgJson[0]).Guid);
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
            console.log(data);
        })
    }

    $scope.listspacesinit =  function(orgName,orgUID) {
        $scope.orgName  = orgName;
        $scope.orgUID  =  orgUID;
        var enString = '{"sessionid": '+sessionid+',"Organization": {"Name":"'+orgName+'" ,"Guid":"'+orgUID+'" }}';

        $http({
            method: 'POST',
            url: "/listallspaces",
            data: enString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            var spaceJson = data;
            $scope.spaceJson = spaceJson;
            $scope["spaceFirst"] = $scope.spaceJson[0];
            console.log($scope["spaceFirst"]);
            $scope.listappsinit(orgName, orgUID, angular.fromJson(spaceJson[0]).Name, angular.fromJson(spaceJson[0]).Guid);
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
        })
    }

    $scope.listappsinit =  function(orgName, orgUID, spaceName, spacegUID) {
        var enString = '{"sessionid": '+sessionid+',"Organization": {"Name":"'+orgName+'" ,"Guid":"'+orgUID+'" },"Space": {"Name":"'+spaceName+'" ,"Guid":"'+spacegUID+'" }}';

        $http({
            method: 'POST',
            url: "/listallapps",
            data: enString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            var appJson = data;
            console.log(data);
            if(angular.isArray(appJson))
            {
                $scope.appJson = appJson;
                $scope.currentorgname = orgName;
                $scope.currentorguid = orgUID;
                $scope.currentspacename = spaceName;
                $scope.currentspaceguid = spacegUID;
                $scope.namesspace2msg = "";
            }
            else
            {
                $scope.appJson = "";
                $scope.namesspace2msg = "No Applications in this Space";
            }
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
        })
    }

    $scope.listSpaces =  function(orgName,orgUID) {
        var enString1 = '{"sessionid": '+sessionid+',"Organization": {"Name":"'+orgName+'" ,"Guid":"'+orgUID+'" }}';

        $http({
            method: 'POST',
            url: "/listallspaces",
            data: enString1,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            var spaceJson = data;
            $scope.spaceJson = spaceJson;
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
        })
    }

    $scope.listapps =  function(orgName, orgUID, spaceName, spacegUID) {
        var enString = '{"sessionid": '+sessionid+',"Organization": {"Name":"'+orgName+'" ,"Guid":"'+orgUID+'" },"Space": {"Name":"'+spaceName+'" ,"Guid":"'+spacegUID+'" }}';
        console.log(enString);
        $http({
            method: 'POST',
            url: "/listallapps",
            data: enString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            var appJson = data;
            console.log(data);
            if(angular.isArray(appJson))
            {
                $scope.appJson = appJson;
                $scope.currentorgname = orgName;
                $scope.currentorguid = orgUID;
                $scope.currentspacename = spaceName;
                $scope.currentspaceguid = spacegUID;
                $scope.namesspace2msg = "";
            }
            else
            {
                $scope.appJson = "";
                $scope.namesspace2msg = "No Applications in this Space";
            }
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
        })
    }

    $scope.init();

    $scope["custom"] = true;
    $scope.toggleCustom = function() {
        this.custom =  this.custom === false ? true: false;
    };

    $scope.appState = function(index)
    {
        return $scope["arrchangestate"+index];
    }

    $scope.currentindex = "temp";
    $scope.stopApp = function(appName,state,index){
        $scope.currentindex = index;
        $scope["arrchangestatetemp"] = "wait";
        var enString = '{"sessionid": '+sessionid+',"Organization": {"Name":"'+$scope.currentorgname+'" ,"Guid":"'+$scope.currentorguid+'" },"Space": {"Name":"'+$scope.currentspacename+'" ,"Guid":"'+$scope.currentspaceguid+'" }}';
        console.log(enString);
        $http({
            method: 'POST',
            url: '/stopinganapp?appname='+appName,
            data: enString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            $scope["arrchangestatetemp"] = angular.lowercase(data.State);
            $scope["arrchangestate"+index] = angular.lowercase(data.State);
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
        })
    }

    $scope.startApp = function(appName,state,index){
        $scope.currentindex = index;
        $scope["arrchangestatetemp"] = "wait";
        var enString = '{"sessionid": '+sessionid+',"Organization": {"Name":"'+$scope.currentorgname+'" ,"Guid":"'+$scope.currentorguid+'" },"Space": {"Name":"'+$scope.currentspacename+'" ,"Guid":"'+$scope.currentspaceguid+'" }}';
        console.log(enString);
        $http({
            method: 'POST',
            url: '/startinganapp?appname='+appName,
            data: enString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            $scope["arrchangestatetemp"] = angular.lowercase(data.State);
            $scope["arrchangestate"+index] = angular.lowercase(data.State);
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
        })
    }

    $scope.logout = function(){
        var enString = '{"sessionid": '+sessionid+'}';
        $http({
            method: 'DELETE',
            url: '/session/delete?sessionid='+sessionid,
            data: enString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            delete sessionStorage.sessionid;
            delete sessionStorage.uname;
            window.location.href = '/';
        })
        .error(function(data, status, headers, config) {
        })
    }
}]);