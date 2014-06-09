// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this);
};

(function ($) {

  // Add segments to a slider
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
      var segmentGap = 100 / (amount - 1) + "%",
        segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
      $(this).prepend(segment.repeat(amount - 2));
    });
  };

  $(function() {

    // Custom Selects
    // $("select[name='huge']").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    // $("select[name='large']").selectpicker({style: 'btn-lg btn-danger'});
    // $("select[name='info']").selectpicker({style: 'btn-info'});
    // $("select[name='small']").selectpicker({style: 'btn-sm btn-warning'});

    // Tooltips
    // $("[data-toggle=tooltip]").tooltip("show");

    // Tags Input
    if ($(".tagsinput").length) {
      $(".tagsinput").tagsInput();  
    }

    // jQuery UI Sliders
    var $slider = $("#slider");
    if ($slider.length > 0) {
      $slider.slider({
        min: 1,
        max: 5,
        value: 3,
        orientation: "horizontal",
        range: "min"
      }).addSliderSegments($slider.slider("option").max);
    }

    var $slider2 = $("#slider2");
    if ($slider2.length > 0) {
      $slider2.slider({
        min: 1,
        max: 5,
        values: [3, 4],
        orientation: "horizontal",
        range: true
      }).addSliderSegments($slider2.slider("option").max);
    }

    var $slider3 = $("#slider3")
      , slider3ValueMultiplier = 100
      , slider3Options;

    if ($slider3.length > 0) {
      $slider3.slider({
        min: 1,
        max: 5,
        values: [3, 4],
        orientation: "horizontal",
        range: true,
        slide: function(event, ui) {
          $slider3.find(".ui-slider-value:first")
            .text("$" + ui.values[0] * slider3ValueMultiplier)
            .end()
            .find(".ui-slider-value:last")
            .text("$" + ui.values[1] * slider3ValueMultiplier);
        }
      });

      slider3Options = $slider3.slider("option");
      $slider3.addSliderSegments(slider3Options.max)
        .find(".ui-slider-value:first")
        .text("$" + slider3Options.values[0] * slider3ValueMultiplier)
        .end()
        .find(".ui-slider-value:last")
        .text("$" + slider3Options.values[1] * slider3ValueMultiplier);
    }

    // Add style class name to a tooltips
    $(".tooltip").addClass(function() {
      if ($(this).prev().attr("data-tooltip-style")) {
        return "tooltip-" + $(this).prev().attr("data-tooltip-style");
      }
    });

    // Placeholders for input/textarea
    if ($('input, textarea').length) {
      $("input, textarea").placeholder();
    } 
    // Make pagination demo work
    $(".pagination a").on('click', function() {
      $(this).parent().siblings("li").removeClass("active").end().addClass("active");
    });

    $(".btn-group a").on('click', function() {
      $(this).siblings().removeClass("active").end().addClass("active");
    });

    // Disable link clicks to prevent page scrolling
    $('a[href="#fakelink"]').on('click', function (e) {
      e.preventDefault();
    });

    // jQuery UI Spinner
    // $.widget( "ui.customspinner", $.ui.spinner, {
    //   widgetEventPrefix: $.ui.spinner.prototype.widgetEventPrefix,
    //   _buttonHtml: function() { // Remove arrows on the buttons
    //     return "" +
    //     "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" +
    //       "<span class='ui-icon " + this.options.icons.up + "'></span>" +
    //     "</a>" +
    //     "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +
    //       "<span class='ui-icon " + this.options.icons.down + "'></span>" +
    //     "</a>";
    //   }
    // });

    // $('#spinner-01').customspinner({
    //   min: -99,
    //   max: 99
    // }).on('focus', function () {
    //   $(this).closest('.ui-spinner').addClass('focus');
    // }).on('blur', function () {
    //   $(this).closest('.ui-spinner').removeClass('focus');
    // });


    // Focus state for append/prepend inputs
    $('.input-group').on('focus', '.form-control', function () {
      $(this).closest('.form-group, .navbar-search').addClass('focus');
    }).on('blur', '.form-control', function () {
      $(this).closest('.form-group, .navbar-search').removeClass('focus');
    });

    // Table: Toggle all checkboxes
    $('.table .toggle-all').on('click', function() {
      var ch = $(this).find(':checkbox').prop('checked');
      $(this).closest('.table').find('tbody :checkbox').checkbox(!ch ? 'check' : 'uncheck');
    });

    // Table: Add class row selected
    $('.table tbody :checkbox').on('check uncheck toggle', function (e) {
      var $this = $(this)
        , check = $this.prop('checked')
        , toggle = e.type == 'toggle'
        , checkboxes = $('.table tbody :checkbox')
        , checkAll = checkboxes.length == checkboxes.filter(':checked').length

      $this.closest('tr')[check ? 'addClass' : 'removeClass']('selected-row');
      if (toggle) $this.closest('.table').find('.toggle-all :checkbox').checkbox(checkAll ? 'check' : 'uncheck');
    });

    // jQuery UI Datepicker
    // var datepickerSelector = '#datepicker-01';
    // $(datepickerSelector).datepicker({
    //   showOtherMonths: true,
    //   selectOtherMonths: true,
    //   dateFormat: "d MM, yy",
    //   yearRange: '-1:+1'
    // }).prev('.btn').on('click', function (e) {
    //   e && e.preventDefault();
    //   $(datepickerSelector).focus();
    // });
    // $.extend($.datepicker, {_checkOffset:function(inst,offset,isFixed){return offset}});

    // Now let's align datepicker with the prepend button
    // $(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.input-group-btn').find('.btn').outerWidth()});

    // Switch
    // $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

    // make code pretty
    window.prettyPrint && prettyPrint();
  });

  //My own admin JS
  var adminDirectives = angular.module('wishSocial.admin.directives',[]);
  adminDirectives
    //after render developmentProcess-add.jade,load the epiceditor,
    .directive('loadEpiceditor',function(){
      return {
        scope: {
          content: '=content'
        },
        link: function(scope){
          var opts = {
            localStorageName: 'adminMarkdownEditorContent',
            basePath: "/css/epiceditor/",
            theme: {
              base: 'themes/base/epiceditor.css',
              preview: 'themes/preview/preview-dark.css',
              editor: 'themes/editor/epic-dark.css'
            },
            file: {
              autoSave: false  
            }
          };
          var editor = new EpicEditor(opts).load();
          editor.importFile('epiceditor',scope.content);
          scope.$parent.editor = editor;
        }
      };
    })
    .directive('editCell', function(){
      return {
        scope: {
          content: '@content'
        },
        link: function(scope, element){
          element.on('dblclick', function(){
            $(this).find('span').addClass('hide');
            $(this).find('input').removeClass('hide').focus();
          });
        }
      };
    })
    .directive('editCellBlur', function(){
      return {
        link: function(scope, element){
          element.blur(function(){
            $(this).prev().removeClass('hide');
            $(this).addClass('hide');
          });
        }
      }
    })
    ;
  var adminServices = angular.module('wishSocial.admin.services',['ngResource']);
  adminServices
    //开发日志对应的资源路径
    .factory('DevelopmentProcesses',function($resource){
      return $resource('/developmentProcesses/:id',{id:'@id'});
    })
    //载入所有开发日志
    .factory('DevelopmentProcessesLoader', function(DevelopmentProcesses,$q){
      return function(){
          var delay = $q.defer();
          DevelopmentProcesses.query(
            function(developmentProcesses){
              delay.resolve(developmentProcesses);
            }
            ,function() {
              delay.reject('Unable to fetch developmentProcesses!');
            }
          );
          return delay.promise;
      }
    })
    //Load one 开发日志
    .factory('DevelopmentProcessLoader', function(DevelopmentProcesses,$q,$route){
      return function(){
          var delay = $q.defer();
          DevelopmentProcesses.get({id:$route.current.params.id},
            function(developmentProcess){
              delay.resolve(developmentProcess);
            }
            ,function() {
              delay.reject('Unable to fetch developmentProcess!');
            }
          );
          return delay.promise;
      }
    })
    .factory('Users', function($resource){
      return $resource('/rest/users/:userName', {userName:'@keyName'});
    })
    .factory('UsersLoader', function(Users, $q, $route){
      return function(){
        var delay = $q.defer();
        if($route.current.params.userName) {
          Users.get(
            {keyName: $route.current.params.userName},
            function(user){
              delay.resolve(user);
            },
            function() {
              delay.reject('Unable to fetch the user!');
            }
          );
        } else {
          Users.query(
            function(users) {
              delay.resolve(users);
            },
            function() {
              delay.reject('Unable to fetch the user!');
            }
          );
        }
        return delay.promise;
      }
    })
    .factory('Badges', function($resource) {
      return $resource('/rest/badges/:userName/:badgeId', {userName: '@userName', badgeId: '@id'});
    })
    .factory('BadgesLoader', function(Badges, $q, $route){
      return function(){
        var delay = $q.defer();
        Badges.query(
          {userName: ''},
          function(badges){
            delay.resolve(badges);
          }
          ,function() {
            delay.reject('Unable to fetch badges!');
          }
        );
        return delay.promise;
      }
    })
  ;
  var adminControllers = angular.module('wishSocial.admin.controllers',['ngSanitize']);
  adminControllers
    .controller('Init',function($http, $scope, $location){
      //将post内容以表单格式传到服务端
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $http.defaults.transformRequest = function(obj){
        var str = [];
        for (var key in obj) {
          if (obj[key] instanceof Array) {
            for(var idx in obj[key]){
              var subObj = obj[key][idx];
              for(var subKey in subObj){
                str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "]=" + encodeURIComponent(subObj[subKey]));
              }
            }
          }
          else {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
          }
        }
        return str.join("&");
      }
      $scope.isActive = {
        users: false,
        wishes: false,
        badges: false
      };

      switch($location.path()) {
        case '/admin/users':
          $scope.isActive.users = true;
          break;
        case '/admin/wishes':
          $scope.isActive.wishes = true;
          break;
        case '/admin/badges':
          $scope.isActive.badges = true;
          break;
      }
      $scope.active = function(item) {
        angular.forEach($scope.isActive, function(value, key){
          this[key] = false;
        },$scope.isActive);
        $scope.isActive[item] = true;
      }
    })
    //对应查看所有开发日志视图
    .controller('DevelopmentProcessesCtrl',function($scope,$location,developmentProcesses){
      $scope.developmentProcesses = developmentProcesses;
      $scope.editDevelopmentProcess = function(scope) {
        // console.log(scope.developmentProcess.id);
        $location.path('/edit/developmentProcesses/'+scope.developmentProcess.id);
      }
    })
    .controller('AddDevlopmentProcessCtrl',function($scope,$http,$location){
      $scope.addDevelopmentProcess = function(){
        if (!$scope.title) {
          alert('Please input the title!');
        }
        $scope.editor.save();
        //创建一条开发记录
        var postData = JSON.parse(localStorage['adminMarkdownEditorContent']).epiceditor;
        if (!postData.content) {
          alert('Please input the content!');
        }
        postData.title = $scope.title;
        postData.contentHtml = $scope.editor.exportFile('epiceditor','html');
        postData = window.$.param(postData);
        var url = '/developmentProcesses';
        $http
          .post(url,postData)
          .success(function(data){
            $location.path('/view/developmentProcesses');
          })
          .error(function(data){
            alert(data);
          });
      }
    })
    .controller('EditDevelopmentProcessCtrl',function($scope,$location,$http,developmentProcess){
      $scope.developmentProcess = developmentProcess;
      //update one development process content.
      $scope.saveContent = function(){
        if (!$scope.developmentProcess.title) {
          alert('Please input the title!');
        }
        $scope.editor.save();
        var postData = JSON.parse(localStorage['adminMarkdownEditorContent']).epiceditor;
        if (!postData.content) {
          alert('Please input the content!');
        }
        postData.title = $scope.developmentProcess.title;
        postData.contentHtml = $scope.editor.exportFile('epiceditor','html');
        postData = window.$.param(postData);
        var url = '/developmentProcesses/'+$scope.developmentProcess.id;
        $http
          .post(url,postData)
          .success(function(data){
            $location.path('/view/developmentProcesses');
          })
          .error(function(data){
            alert(data);
          });
      }
    })
    .controller('UsersCtrl', function($scope, users){
      $scope.users = users;
      $scope.alert = {
        show: false,
        text: ''
      }
    })
    .controller('UserCtrl', function($scope, $http, Users){
      $scope.saveModified = function(){
        var user = $scope.$parent.user;
        Users.save({}, user,function(){
          $scope.$parent.$parent.alert.show = true;
          $scope.$parent.$parent.alert.text = '修改成功';

          $scope.isModified = false;
        }, function(res){
          $scope.$parent.$parent.alert.show = true;
          $scope.$parent.$parent.alert.text = res.data.err;
        });
      }
      $scope.delete = function($index){
        var user = $scope.$parent.user;
        Users.remove({}, user, function(){
          $scope.$parent.$parent.users.splice($index, 1);

          $scope.$parent.$parent.alert.show = true;
          $scope.$parent.$parent.alert.text = '删除成功';
        })
      }
    })
    .controller('BadgesCtrl', function($scope, badges){
      $scope.badges = badges;
      $scope.alert = {
        show: false,
        text: ''
      };
    })
    .controller('BadgeCtrl', function($scope, Badges){
      $scope.saveModified = function(){
        var badge = $scope.$parent.badge;
        Badges.save({}, badge,function(){
          $scope.$parent.$parent.alert.show = true;
          $scope.$parent.$parent.alert.text = '修改成功';

          $scope.isModified = false;
        }, function(res){
          $scope.$parent.$parent.alert.show = true;
          $scope.$parent.$parent.alert.text = res.data.err;
        });
      }
      $scope.delete = function($index){
        var badge = $scope.$parent.badge;
        Badges.remove({}, badge, function(){
          $scope.$parent.$parent.badges.splice($index, 1);

          $scope.$parent.$parent.alert.show = true;
          $scope.$parent.$parent.alert.text = '删除成功';
        })
      }
    })
    .controller('LoginCtrl', function($scope, $http, $location){
      $scope.admin = {
        name: '',
        password:''
      };
      $scope.login = function(){
        $http.post('/admin/login', $scope.admin)
          .success(function(res){
            $scope.$parent.admin = res.userName;

            $scope.$parent.active('users');
            $location.path('/admin/users');
          });
      }
    })
  ;
  var admin = angular.module(
    'wishSocial.admin'
    ,['ngRoute'
      ,'wishSocial.admin.directives'
      ,'wishSocial.admin.controllers'
      ,'wishSocial.admin.services'
      ]
  );    
  admin
    .config(
      function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider
          //查看所有的开发日志
          .when('/view/developmentProcesses',{
            controller:'DevelopmentProcessesCtrl'
            ,resolve: {
              developmentProcesses: function(DevelopmentProcessesLoader) {
                return DevelopmentProcessesLoader();
              }
            }
            ,templateUrl:'/views/developmentProcesses.jade'
          })
          //编辑某个开发日志
          .when('/edit/developmentProcesses/:id',{
            controller: 'EditDevelopmentProcessCtrl'
            ,resolve: {
              developmentProcess: function(DevelopmentProcessLoader) {
                return DevelopmentProcessLoader();
              } 
            }
            ,templateUrl: '/views/developmentProcess-edit.jade'
          })
          //add a development process.
          .when('/add/developmentProcess',{
            controller: 'AddDevlopmentProcessCtrl'
            ,templateUrl: '/views/developmentProcess-add.jade'
          })
          .when('/admin/users', {
            controller: 'UsersCtrl',
            templateUrl: '/views/admin/users.jade',
            resolve: {
              users: function(UsersLoader) {
                return UsersLoader();
              }
            }
          })
          .when('/admin/login', {
            controller: 'LoginCtrl',
            templateUrl: '/views/admin/login.jade'
          })
          .when('/admin/badges', {
            controller: 'BadgesCtrl',
            templateUrl: '/views/admin/badges.jade',
            resolve: {
              badges: function(BadgesLoader) {
                return BadgesLoader();
              }
            }
          })
          //显示开发者的所有日志
          .otherwise({
            redirectTo: '/admin/users'
          })
          ;
      }
    );
  
  //My own index JS
  var indexDirectives = angular.module('wishSocial.index.directives',[]);
  var indexServices = angular.module('wishSocial.index.services',['ngResource']);
  var indexFilters  = angular.module('wishSocial.index.filters', []);
  var indexControllers = angular.module('wishSocial.index.controllers',['bootstrap-tagsinput', 'ngCookies']);
  indexDirectives
    .directive('', function(){

    });
  indexFilters
    .filter('preppendComma', function(){
      return function(input){
        return input ? ',' + input : '';
      }
    });
  indexServices
    //所有愿望对应的资源路径
    .factory('Wishes',function($resource){
      return $resource('/rest/wishes/:userName',{userName: '@userName'});
    })
    //载入所有愿望
    .factory('WishesLoader', function(Wishes,$q, $route){
      return function(){
        var delay = $q.defer();
        Wishes.query(
          {userName: $route.current.params.userName},
          function(wishes){
            delay.resolve(wishes);
          }
          ,function() {
            delay.reject('Unable to fetch wishes!');
          }
        );
        return delay.promise;
      }
    })
    .factory('Users', function($resource){
      return $resource('/rest/users/:userName', {userName:'@useName'});
    })
    .factory('CurUser', function($resource){
      return $resource('/rest/user/');
    })
    .factory('CurUserLoader', function(CurUser, $q){
      return function(){
        var delay = $q.defer();
        CurUser.get(
          function(curUser) {
            delay.resolve(curUser);
          },
          function() {
            delay.reject('Unable to fetch the current user!');
          }
        );
        return delay.promise;
      };
    })
    .factory('UsersLoader', function(Users, $q, $route){
      return function(){
        var delay = $q.defer();
        if($route.current.params.userName) {
          Users.get(
            {userName: $route.current.params.userName},
            function(user){
              delay.resolve(user);
            },
            function() {
              delay.reject('Unable to fetch the user!');
            }
          );
        } else {
          Users.query(
            function(users) {
              delay.resolve(users);
            },
            function() {
              delay.reject('Unable to fetch the user!');
            }
          );
        }
        return delay.promise;
      }
    })
    .factory('Wish', function($resource){
      return $resource('/rest/wish/:id', {id: '@id'});
    })
    .factory('WishLoader', function(Wish, $q, $route){
      return function(){
        var delay = $q.defer();
        Wish.get(
          {id: $route.current.params.id},
          function(wish){
            delay.resolve(wish);
          },
          function() {
            delay.reject('Unable to fetch the wish!')
          }
        );
        return delay.promise;
      }
    })
    .factory('Badges', function($resource) {
      return $resource('/rest/badges/:userName', {userName: '@userName'});
    })
    .factory('BadgesLoader', function(Badges, $q, $route){
      return function(){
        var delay = $q.defer();
        Badges.query(
          {userName: $route.current.params.userName},
          function(badges){
            delay.resolve(badges);
          }
          ,function() {
            delay.reject('Unable to fetch badges!');
          }
        );
        return delay.promise;
      }
    })
    .factory('Tags', function($resource) {
      return $resource('/tags/:wishId', {wishId: '@wishId'});
    })
    .factory('TagsLoader', function(Tags, $q, $route){
      return function(){
        var delay = $q.defer();
        Tags.query(
          {wishId: $route.current.params.id},
          function(tags) {
            delay.resolve(tags);
          },
          function() {
            delay.reject('Unable to fetch the user!');
          }
        );
        return delay.promise;
      }
    })
  ;
  indexControllers
    .controller('Init',function($http, $scope, $location){
      $http.get('/login/state')
        .success(function(loginState){

          $scope.userName = loginState.userName ? loginState.userName : '登录';
          $scope.hrefLoginState = loginState.userName ? '#' : '/login' ;
          $scope.hrefUser = loginState.userName ? '/user/' + loginState.userName : '#';

          $scope.isUserName = loginState.userName ? true : false;
        });
      //将post内容以表单格式传到服务端
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      $scope.logout = function() {
        $http.post('/logout')
          .success(function(){
            $scope.userName = '登录';
            $scope.hrefLoginState = '/login';
            $scope.hrefUser = '#';
            $scope.isUserName = false;

            $location.path('/login');
          });
      }
      $scope.param = function(obj){
        var str = [];
        for (var key in obj) {
          if (obj[key] instanceof Array) {
            for(var idx in obj[key]){
              var subObj = obj[key][idx];
              for(var subKey in subObj){
                str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "]=" + encodeURIComponent(subObj[subKey]));
              }
            }
          }
          else {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
          }
        }
        return str.join("&");
      };
    })
    .controller('AddWishCtrl',function($scope,$http,$location){
      if($scope.$parent.userName == '登录') {
        $location.path('/login');
      }

      $scope.tags = [];

      $scope.queryTags = function(query) {
        return $http.get('/tags?query='+query);
      };  
      // console.log($scope);
      $scope.newWish = {
        title: '',
        content: '',
        userName: ''
      };
      $scope.alert = {
        text: '',
        show: false
      };
      $scope.submitNewWish = function(){
        if($scope.$parent.userName == '登录') {
          $location.path('/login');
        }

        var newWishObj = {};
        newWishObj.title = $scope.newWish.title;
        newWishObj.content = $scope.newWish.content;
        newWishObj.userName = $scope.$parent.userName;
        newWishObj.tags = $scope.tags;
        var newWish = window.$.param(newWishObj);
        var url = '/wishes';
        $http.post(url,newWish)
        .success(function(){
          $location.path('/');
        })
          .error(function(res){
            $scope.alert.show = true;
            $scope.alert.text = res.err;
          });
      }
    })
    .controller('EditWishCtrl', function($scope, $http, $location,  wish, tags){
      $scope.queryTags = function(query) {
        return $http.get('/tags?query='+query);
      };
      function arrObjsSpecificKey2Arr(arrObjs,key){
        var arr = [];
        arrObjs.map(function(item){
          arr.push(item[key]);
        });
        return arr;
      }
      $scope.tags = arrObjsSpecificKey2Arr(tags,'name');
      $scope.newWish = wish;
      $scope.alert = {
        show: false,
        text: ''
      };
      $scope.submitNewWish = function(){
        if($scope.$parent.userName == '登录') {
          $location.path('/login');
          return;
        }

        var newWishObj = {};
        newWishObj.id = $scope.newWish.id;
        newWishObj.title = $scope.newWish.title;
        newWishObj.content = $scope.newWish.content;
        newWishObj.userName = $scope.$parent.userName;
        newWishObj.tags = $scope.tags;
        var newWish = window.$.param(newWishObj);
        var url = '/wishes';
        $http.post(url,newWish)
          .success(function(){
            $location.path('/');
          })
          .error(function(res){
            $scope.alert.text = res.err;
            $scope.alert.show = true;
          });
      }
    })
    .controller('ViewWishesCtrl',function($scope,$location,wishes) {
      $scope.wishes = wishes;
    })
    .controller('LoginCtrl', function($scope, $location, $http){
      if($scope.$parent.userName !== '登录') {
        $location.path('/');
      }
      $scope.alert = {
        show: false,
        text: ''
      };
      $scope.login = function(){
        var postData = {
          email: $scope.email,
          password: $scope.password
        };
        postData = window.$.param(postData);
        $http.post('/login', postData)
        .success(function(loginState){

          $scope.$parent.userName = loginState.userName ? loginState.userName : '登录';
          $scope.$parent.hrefLoginState = loginState.userName ? '#' : '/login' ;
          $scope.$parent.hrefUser = loginState.userName ? '/user/' + loginState.userName : '#';

          $scope.$parent.isUserName = loginState.userName ? true : false;
          $location.path('/wishes');

        })
        .error(function(msg){
            $scope.alert.show = true;
            $scope.alert.text = msg.err;
        });
      };
      $scope.register = function(){
        $location.path('/register');
      }
    })
    .controller('RegisterCtrl', function($scope, $location, $http){
      $scope.registerForm = {
        userName: '',
        password: '',
        confirmPassword: '',
        email:''
      };
      $scope.alert = {
        text: '',
        show: false
      };
      $scope.register = function(){
        var registerData = window.$.param($scope.registerForm);
        var url = '/register';
        $http.post(url, registerData)
          .success(function(loginState){
            $location.path('/');


            $scope.$parent.userName = loginState.userName ? loginState.userName : '登录';
            $scope.$parent.hrefLoginState = loginState.userName ? '#' : '/login' ;
            $scope.$parent.hrefUser = loginState.userName ? '/user/' + loginState.userName : '#';

            $scope.$parent.isUserName = loginState.userName ? true : false;
          })
          .error(function(res){
            $scope.alert.show = true;
            $scope.alert.text = res.err;
          });
      };
    })
    .controller('UserSettingsCtrl', function($scope, $http,$location, curUser){
      if('登录' == $scope.$parent.userName) {
        $location.path('/login');
        return;
      }
      $scope.showProfile = true;
      $scope.showSettings = false;
      $scope.showTab = function(tabName){
        switch(tabName) {
          case 'profile':
            $scope.showProfile = true;
            $scope.showSettings = false;
            break;
          case 'settings':
            $scope.showSettings = true;
            $scope.showProfile = false;
            break;
        }
      };
      // 声明profile
      $scope.profile = {
        postData: {
          name: ''
        },
        alert: {
          show: false,
          text: ''
        },
        confirm: function(){
          if($scope.userName == '登录') {
            $location.path('/login');
            return;
          }
          $http.post('/user/settings/profile', $scope.$parent.param($scope.profile.postData))
            .success(function () {
              $scope.$parent.userName = $scope.profile.postData.name;
              $location.path('/user/'+$scope.userName);
            })
            .error(function(res){
              $scope.profile.alert.show = true;
              $scope.profile.alert.text = res.err;
            });
        }
      };
      // profile赋值
      $scope.profile.postData = curUser;
      $scope.password = {
        postData: {
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        },
        alert: {
          show: false,
          text: ''
        },
        confirm: function(){
          $http.post('/user/settings/password', $scope.$parent.param($scope.password.postData))
            .success(function(){

              $scope.password.alert.show = true;
              $scope.password.alert.text = '修改成功！';

              $location.path('/user/'+$scope.userName);
            })
            .error(function(res)
            {
              $scope.password.alert.show = true;
              $scope.password.alert.text = res.err;
            });
        }
      };
    })
    .controller('ViewWishCtrl', function($scope, wish,$http, $location){
      $scope.helpStateConfig = {
        'published': {
          disabled: false,
          text: '帮助'
        },
        'finished': {
          disabled: true,
          text: '已达成'
        },
        'helping': {
          disabled: true,
          text: '正在进行'
        },
        //愿望发起者看到的状态
        'helpingOwner': {
          disabled: false,
          text: '确认实现愿望'
        },
        'finishedOwner': {
          disabled: true,
          text: '已达成'
        },
        'publishedOwner': {
          disabled: true,
          text: '已发布'
        }
      };
      $scope.editWish = function(){
        $location.path('/edit/wish/'+$scope.wish.id);
      };
      $scope.wish = wish;
      $scope.helpState = {};
      if($scope.wish.status == null) {
        //是否是本人
        if($scope.wish.userName == $scope.$parent.userName) {
          $scope.isSelf = true;
          $scope.helpState = $scope.helpStateConfig['publishedOwner'];
        } else {
          $scope.isSelf = false;
          $scope.helpState = $scope.helpStateConfig['published'];
        }
      } else {
        //是否是本人
        if($scope.wish.userName == $scope.$parent.userName) {
          $scope.isSelf = true;
          var status = $scope.wish.status+'Owner';
          $scope.helpState = $scope.helpStateConfig[status];
        } else {
          $scope.isSelf = false;
          $scope.helpState = $scope.helpStateConfig[$scope.wish.status];
        }
      }
      $scope.help = function(){
        if($scope.$parent.userName == '登录') {
          $location.path('/login');
          return;
        }
        if($scope.wish.status == null || $scope.wish.status == 'published') {
          var postData = {
            wishId: $scope.wish.id
          };
          postData = window.$.param(postData);
          $http.post('/help', postData)
            .success(function(){
              $scope.wish.status = 'helping';
              $scope.helpState = $scope.helpStateConfig[$scope.wish.status];
            })
            .error(function(){
              alert('对不起，已被别人抢先一步了：（');
            });
        } else if($scope.wish.status == 'helping' && $scope.isSelf) {//确认愿望已经完成
          $http.post('/wish/finish',window.$.param({wishId: $scope.wish.id}))
            .success(function(){
              $scope.helpState = $scope.helpStateConfig['finishedOwner'];
            })
            .error(function(){
              $location.path('/login');
            });
        }
      };
    })
    .controller('ViewUserHome', function($scope, user, wishes, badges){
      $scope.user = user;
      $scope.wishes = wishes;
      $scope.badges = badges;
    })
  ;

  var index = angular.module(
    'wishSocial.index',
    [
      'ngCookies',
      'ngRoute',
      'wishSocial.index.directives',
      'wishSocial.index.controllers',
      'wishSocial.index.services',
      'wishSocial.index.filters'
    ]
  );
  index.config(
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
      $routeProvider
        .when('/',{
          controller: 'ViewWishesCtrl',
          resolve: {
            wishes: function(WishesLoader) {
              return WishesLoader();
            }
          },
          templateUrl: '/views/wishes.jade'
        })
        .when('/wishes',{
          controller: 'ViewWishesCtrl',
          resolve: {
            wishes: function(WishesLoader) {
              return WishesLoader();
            }
          },
          templateUrl: '/views/wishes.jade'
        })
        .when('/wishes/:userName',{
          controller: 'ViewWishesCtrl',
          resolve: {
            wishes: function(WishesLoader) {
              return WishesLoader();
            }
          },
          templateUrl: '/views/wishes.jade'
        })
        .when('/login', {
          controller: 'LoginCtrl',
          templateUrl: '/views/login.jade'
        })
        .when('/add/wish',{
          controller: 'AddWishCtrl',
          templateUrl: '/views/wish-add.jade'
        })
        .when('/wish/:id', {
          controller: 'ViewWishCtrl',
          resolve: {
            wish: function(WishLoader) {
              return WishLoader();
            }
          },
          templateUrl: '/views/wish.jade'
        })
        .when('/edit/wish/:id', {
          controller: 'EditWishCtrl',
          templateUrl: '/views/wish-add.jade',
          resolve: {
            wish: function(WishLoader) {
              return WishLoader();
            },
            tags: function(TagsLoader) {
              return TagsLoader();
            }
          }
        })
        .when('/register', {
          controller: 'RegisterCtrl',
          templateUrl: '/views/register.jade'
        })
        .when('/user/settings', {
          controller: 'UserSettingsCtrl',
          templateUrl: '/views/userSettings.jade',
          resolve: {
            curUser: function(CurUserLoader){
              return CurUserLoader();
            }
          }
        })
        .when('/user/:userName', {
          controller: 'ViewUserHome',
          templateUrl: '/views/userHome.jade',
          resolve: {
            user: function(UsersLoader){
              return UsersLoader();
            },
            wishes: function(WishesLoader){
              return WishesLoader();
            },
            badges: function(BadgesLoader) {
              return BadgesLoader();
            }
          }
        })
        .otherwise({
          redirectTo:'/'
        });
    }    
  );
})(jQuery);
