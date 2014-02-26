// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function(num) {
  return new Array(num + 1).join(this);
};

(function($) {

  // Add segments to a slider
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
      var segmentGap = 100 / (amount - 1) + "%"
        , segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
      $(this).prepend(segment.repeat(amount - 2));
    });
  };

  $(function() {

    // Custom Selects
    // $("select[name='huge']").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    // $("select[name='large']").selectpicker({style: 'btn-lg btn-danger'});
    // $("select[name='info']").selectpicker({style: 'btn-info'});
    // $("select[name='small']").selectpicker({style: 'btn-sm btn-warning'});

    // Tabs
    $(".nav-tabs a").on('click', function (e) {
      e.preventDefault();
      $(this).tab("show");
    })

    // Tooltips
    // $("[data-toggle=tooltip]").tooltip("show");

    // Tags Input
    if ($(".tagsinput").length) {
      $(".tagsinput").tagsInput();  
    };

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
    ;
  var adminControllers = angular.module('wishSocial.admin.controllers',['ngSanitize']);
  adminControllers
    .controller('Init',function($http){
      //将post内容以表单格式传到服务端
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
        };
        $scope.editor.save();
        //创建一条开发记录
        var postData = JSON.parse(localStorage['adminMarkdownEditorContent']).epiceditor;
        if (!postData.content) {
          alert('Please input the content!');
        };
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
        };
        $scope.editor.save();
        var postData = JSON.parse(localStorage['adminMarkdownEditorContent']).epiceditor;
        if (!postData.content) {
          alert('Please input the content!');
        };
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
      function($routeProvider) {
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
          //显示开发者的所有日志
          .otherwise({
            redirectTo: '/view/developmentProcesses'
          })
          ;
      }
    );
  
  //My own index JS
  var indexDirectives = angular.module('wishSocial.index.directives',[]);
  var indexServices = angular.module('wishSocial.index.services',[]);
  var indexControllers = angular.module('wishSocial.index.controllers',['bootstrap-tagsinput']);
  indexControllers
    .controller('Init',function($http){
      //将post内容以表单格式传到服务端
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }) 
    .controller('AddWishCtrl',function($scope,$http,$location,$q){
      $scope.tags = [];

      $scope.queryTags = function(query) {
        return $http.get('/tags?query='+query);
      };  
      // console.log($scope);
      $scope.newWish = {
        title: '',
        content: ''
      };
      $scope.submitNewWish = function(){
        var newWishObj = {};
        newWishObj.title = $scope.newWish.title;
        newWishObj.content = $scope.newWish.content;
        newWishObj.tags = $scope.tags;
        var newWish = window.$.param(newWishObj);
        var url = '/wishes'
        $http.post(url,newWish)
        .success(function(){
          $location.path('/');
        });
      }
    })
    .controller('viewWishesCtrl',function($scope,$http,$location,$q) {

    });
  var index = angular.module(
    'wishSocial.index',
    ['ngRoute',
    'wishSocial.index.directives',
    'wishSocial.index.controllers',
    'wishSocial.index.services'
    ]
  );
  index.config(
    function($routeProvider) {
      $routeProvider
        .when('/',{
          controller: 'viewWishesCtrl',
          templateUrl: '/views/wishes.jade'
        })
        .when('/add/wish',{
          controller: 'AddWishCtrl',
          templateUrl: '/views/wish-add.jade'
        })
        .otherwise({
          redirectTo:'/'
        });
    }    
  );
})(jQuery);
