var 
  express      = require('express'),
  app          = express(),
  conn         = require('./conn.js').conn,
  cookieParser = require('cookie-parser'),
  session      = require('express-session'),
  moment       = require('moment');
conn.connect();
var utilities = require('./utilities.js').util;
app
  .set('views', __dirname + '/views')
  .set('view engine','jade')
  .use(express.static(__dirname + '/public'))
  .use(cookieParser())
  .use(session({ secret: 'keyboard cat', name: 'wishSocial'}))
  .use(express.bodyParser());
app
  //新建一条开发记录
  .post('/developmentProcesses', function(req, res){
    var post = {
      title: req.body.title,
      content: req.body.content,
      content_html: req.body.contentHtml,
      create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      last_edit_time: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    conn.query('insert into development_processes set ?',post, function(err, rows, fields) {
      if (err) {
        console.log('conn.query.err: ' + err);
        res.send(500,'Sorry, but it seems that we got some trouble! We will fix it as soon as possible.');
        return ;
      }
      res.send(200);
    });
  })
  //更新开发记录
  .post('/developmentProcesses/:id',function(req,res){
    conn.query('update development_processes set ? where id='+req.params.id,{
      title: req.body.title,
      content: req.body.content,
      content_html: req.body.contentHtml, 
      last_edit_time: moment().format("YYYY-MM-DD HH:mm:ss")
    },function(err,rows){
      if(!err) {
        res.send(200);
      } else {
        console.log(err);
      }
    });
  })
  //获取模板
  .get(/^\/views\/(.+\.jade)$/,function(req,res){
    res.render(req.params[0]);
  })
  //前台入口
  .get('/',function(req,res){
    res.render('index');
  })
  //后台入口
  .get('/admin',function(req,res){
    res.render('admin');
  })
  /**
   * get one development process.
   * @return {json} 
   */
  .get('/developmentProcesses/:id',function(req,res){
    var id = req.params.id;
    conn.query('select * from development_processes where id = '+id,function(err,rows,fields){
      var jsonDevelopmentProcess;
      var objDevelopmentProcess;
      if (err) {console.log(err)}
      objDevelopmentProcess = utilities.chgSnake2Camel(rows);
      jsonDevelopmentProcess = objDevelopmentProcess;
      res.send(jsonDevelopmentProcess);
    })
  })  
  /**
   * get all development processes.
   * @return {json} 开发日志
   */
  .get('/developmentProcesses',function(req,res){
    // var objDevelopmentProcesses = [{
    //   title: '完成整个平台的运行平台代码的构建'
    //   ,content: '第一天开发记录'
    //   ,lastEditTime: '2013-01-12 14:00:00'
    // }];
    conn.query('SELECT * FROM development_processes order by create_time desc',function(err,rows,fields){
      if (err) {console.log(err);}
      var objDevelopmentProcesses = utilities.chgSnake2Camel(rows);
      // console.log(objDevelopmentProcesses);
      var jsonDevelopmentProcesses = JSON.stringify(objDevelopmentProcesses);
      res.send(jsonDevelopmentProcesses);
    })
  })
  //新建一条愿望
  .post('/wishes',function(req,res){
    var tags = req.body.tags;
    if(!tags || !tags.length) {
      res.send(400, JSON.stringify({err:'没有填写标签'}));
      return;
    }
    if(req.body.userName !== req.session.userName) {
      res.send(400, JSON.stringify({err:'会话已过期'}));
      return;
    }
    if(!req.body.title) {
      res.send(400, JSON.stringify({err:'没有填写标题'}));
      return;
    }
    if(!req.body.content) {
      res.send(400, JSON.stringify({err:'没有填写内容'}));
      return;
    }
    for (var i = tags.length - 1; i >= 0; i--) {
      tags[i] = utilities.trim(tags[i]);
    }
    tags = utilities.delSameItem(tags);   
    tags = utilities.filterInvldChar(tags,',');
    var numTags = tags.length;
    tags = tags.join(',');

    conn.query('select id from users where name = "' + req.body.userName+ '"', function(err, rows){
      if(err) console.log(err);
      if(!rows.length) {
        res.send(400, JSON.stringify({err:'您未登录'}));
        return;
      }
      var userId = rows[0].id;
      if(!req.body.id) {
        conn.query('call addNewWish("' + tags + '",' + numTags + ',"' + req.body.title + '","' + req.body.content + '","' + userId + '");', function (err, rows, fields) {
          if (err) {
            console.log(err);
            res.send(500);
          } else {
            var postRUsersBadges = {
              u_id: userId,
              b_id: 2
            };
            conn.query('insert into r_users_badges set ?', postRUsersBadges, function(){
              res.send(200, '已成功发布愿望！');
            });
          }
        });
      } else {
        conn.query('call updateWish("' + tags + '", ' +numTags +',"' + req.body.title + '","' + req.body.content + '","' + userId + '","'+req.body.id+'");', function(err,rows, fields){
          if (err) {
            console.log(err);
            res.send(500);
          }
          res.send(200, '已成功发布愿望！');
        });
      }
    });

  })
  //return for autocomplete tag content
  .get('/tags',function(req,res){
    var sqlGetTags = '';
    if(req.query.query) {
      sqlGetTags = 'select name from tags where name like "%'+req.query.query+'%"';
    } else {
      sqlGetTags = 'select name from tags';
    }
    conn.query(sqlGetTags, function(err, rows, fields) {
      if(err){
        console.log('conn.query.err: ' +err);
        res.send(500,'Sorry, but it seems that we got some trouble! We will fix it as soon as possible.');
        return ;
      }
      var resTags;
      if(req.query.query) {
        resTags = utilities.arrObjsSpecificKey2Arr(rows,'name');
      } else {
        resTags = rows;
      }
      res.send(200,resTags);
    });
  })
  .get('/tags/:wishId', function(req, res){
    var sqlGetTags = '';
    if(req.query.query) {
      sqlGetTags = 'select name from tags, r_wishes_tags where name like "%'+req.query.query+'%" and r_wishes_tags.t_id = tags.id and r_wishes_tags.w_id = "'+req.param('wishId')+'"';
    } else {
      sqlGetTags = 'select name from tags, r_wishes_tags where r_wishes_tags.t_id = tags.id and r_wishes_tags.w_id = "'+req.param('wishId')+'"';
    }
    conn.query(sqlGetTags, function(err, rows, fields) {
      if(err){
        console.log('conn.query.err: ' +err);
        res.send(500,'Sorry, but it seems that we got some trouble! We will fix it as soon as possible.');
        return ;
      }
      var resTags;
      if(req.query.query) {
        resTags = utilities.arrObjsSpecificKey2Arr(rows,'name');
      } else {
        resTags = rows;
      }
      res.send(200,resTags);
    });
  })
  .get('/rest/wishes', function(req, res){
    var userName = req.param('userName');
    var sqlGetWishes =
      ' select u.name as userName, u.home_href as userHomeHref, u.img_src as userImgSrc, u.gender as userGender,  ' +
      ' w.vote_count as voteCount, w.home_href as wishHomeHref, w.title as wishTitle, w.id as wishId, w.content as wishContent, w.img_src as wishImgSrc, w.comment_count as commentCount ' +
      ' from users u, wishes w ' +
      ' where u.id = w.user_id' +
      ' order by w.create_time desc ';

    var sqlGetVoters = 'select wishes.id as wishId, users.name as userName, users.home_href as userHomeHref from wishes, vote_users_wishes, users ' +
      'where wishes.id = vote_users_wishes.w_id and users.id = vote_users_wishes.u_id';
    var sqlGetWishesVoters = sqlGetWishes + ';' + sqlGetVoters;
    conn.query(sqlGetWishesVoters, function(err, rows) {
      if(err) throw err;
      var wishes = rows[0];
      var voters = rows[1];
      for(var wIndex=0; wIndex<wishes.length; wIndex++) {
        wishes[wIndex].voters = [];
        for(var vIndex=0; vIndex<voters.length; vIndex++){
          if(wishes[wIndex].wishId == voters[vIndex].wishId) {
            var tmpVoterObj = {
              userName: voters[vIndex].userName,
              userHomeHref: voters[vIndex].userHomeHref
            };
            wishes[wIndex].voters.push(tmpVoterObj);
          }
        }
      }
      res.send(JSON.stringify(wishes));
    });
  })
  .get('/rest/wishes/:userName', function(req, res) {

    var userName = req.param('userName');
    console.log(userName);
    var sqlFilterByUserName = userName ? (' and u.name = "'+userName +'"' ): '';
    var sqlGetWishes =
        ' select u.name as userName, u.home_href as userHomeHref, u.img_src as userImgSrc, u.gender as userGender,  ' +
        ' w.vote_count as voteCount, w.home_href as wishHomeHref, w.title as wishTitle, w.id as wishId, w.content as wishContent, w.img_src as wishImgSrc, w.comment_count as commentCount ' +
        ' from users u, wishes w ' +
        ' where u.id = w.user_id' + sqlFilterByUserName +
        ' order by w.create_time desc ';

    var sqlGetVoters = 'select wishes.id as wishId, users.name as userName, users.home_href as userHomeHref from wishes, vote_users_wishes, users ' +
        'where wishes.id = vote_users_wishes.w_id and users.id = vote_users_wishes.u_id';
    var sqlGetWishesVoters = sqlGetWishes + ';' + sqlGetVoters;
    conn.query(sqlGetWishesVoters, function(err, rows) {
        if(err) throw err;
        var wishes = rows[0];
        var voters = rows[1];
        for(var wIndex=0; wIndex<wishes.length; wIndex++) {
            wishes[wIndex].voters = [];
            for(var vIndex=0; vIndex<voters.length; vIndex++){
                if(wishes[wIndex].wishId == voters[vIndex].wishId) {
                    var tmpVoterObj = {
                        userName: voters[vIndex].userName,
                        userHomeHref: voters[vIndex].userHomeHref
                    };
                    wishes[wIndex].voters.push(tmpVoterObj);
                }
            }
        }
        res.send(JSON.stringify(wishes));
    });
  })
  .get('/rest/users', function(req, res) {
    conn.query('select id, name, img_src as imgSrc, introduce, home_href as homeHref, email from users', function(err, rows) {
      if(err) {
        console.log(err);
        res.send(300);
      } else {
        if(rows.length) {
          for(var index=0;index<rows.length;index++) {
            rows[index].keyName = rows[index].name;
          }
          res.send(200, JSON.stringify(rows));
        } else {
          res.send(200, JSON.stringify([]));
        }
      }
    });
  })
  .get('/rest/users/:userName', function(req, res) {
    conn.query('select name, img_src_128 as imgSrc128, introduce from users where name= "' +req.param('userName')+'"', function(err, rows) {
      if(err) {
        console.log(err);
        res.send(300);
      } else {
        if(rows.length) {
          var user = rows[0];
          user.keyName = user.name;
          res.send(200, JSON.stringify(user));
        } else {
          res.send(200, JSON.stringify([]));
        }
      }
    });
  })
  // 得到当前用户的数据
  .get('/rest/user', function(req, res){
    conn.query('select * from users where name="'+req.session.userName+'"', function(err, rows){
      if(rows.length) {
        res.send(200, JSON.stringify(utilities.chgSnake2Camel(rows[0])));
      } else {
        res.send(400, JSON.stringify({err:'会话已过期'}));
      }
    });
  })
  .get('/rest/badges', function(req, res){
    conn.query('select img_src as imgSrc, name,id from badges', function(err, rows) {
      if(err) {
        console.log(err);
        res.send(300);
      } else {
        if(rows.length) {
          res.send(200, JSON.stringify(rows));
        } else {
          res.send(200, JSON.stringify([]));
        }
      }
    });
  })
  .post('/admin/login', function(req, res){
    conn.query('select * from admin_users where name = "' + req.body.name + '" and pwd = "' + req.body.password +'"', function(err, rows){
      if(err) console.log(err);
      if(rows.length) {
        var sess = req.session;
        sess.adminUserName = rows[0].name ? rows[0].name : rows[0].email;
        res.send(200, JSON.stringify({userName: sess.adminUserName}));
      } else {
        res.send(300, JSON.stringify({err: '用户名或者密码错误'}));
      }
    });
  })
  .get('/rest/badges/:userName', function(req, res) {
    conn.query('select badges.img_src as imgSrc, badges.name from users, r_users_badges, badges where users.id =r_users_badges.u_id and r_users_badges.b_id = badges.id and users.name="'+req.param('userName')+'"', function(err, rows) {
      if(err) {
        console.log(err);
        res.send(300);
      } else {
        if(rows.length) {
          res.send(200, JSON.stringify(rows));
        } else {
          res.send(200, JSON.stringify([]));
        }
      }
    });
  })
  .post('/rest/badges/:badgeId', function(req, res) {
    var postBadge = {
      name: req.body.name,
      img_src: req.body.imgSrc
    };
    conn.query('update badges set ? where id='+req.param('badgeId'), postBadge, function(err, result){
      if(err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(200);
      }
    });
  })
  .delete('/rest/badges/:badgeId', function(req, res) {
    conn.query('delete from badges where id='+req.param('badgeId'), function(err, result){
      if(err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(200);
      }
    });
  })
  .get('/login/state', function(req, res){
    var loginState = {};
    var sess = req.session;
    if(sess.userName && sess.userName.length) {
      loginState.userName = sess.userName;
    } else {
      loginState.userName = "";
    }
    res.send(200, loginState);
  })
  .post('/login', function(req, res){
    conn.query('select * from users where email = "' + req.body.email + '" and pwd = "' + req.body.password +'"', function(err, rows){
      if(err) console.log(err);
      if(rows.length) {
        var sess = req.session;
        sess.userName = rows[0].name ? rows[0].name : rows[0].email;
        res.cookie('userName', sess.userName);
        res.send(200, JSON.stringify({userName: sess.userName}));
      } else {
        res.send(300, JSON.stringify({err: '用户名或者密码错误'}));
      }
    });
  })
  .post('/user/settings/password', function(req, res){
    if(!req.session.userName) {
      res.send(400, JSON.stringify({err:'用户已过期'}));
      return ;
    }
    conn.query('update users set pwd = "'+req.body.newPassword+'" where name = "'+req.session.userName+'" and pwd="'+req.body.oldPassword+'"', function(err, result){
      if(!err) {
        if(result.changedRows) {
          res.send(200);
        } else {
          res.send(400, JSON.stringify({err: '原始密码错误!'}));
        }
      } else {
        console.log(err);
        res.send(500);
      }
    });
//    conn.query('update ');
  })
  .post('/user/settings/profile', function(req, res) {
    if(!req.session.userName) {
      res.send(400, JSON.stringify({err: '会话已过期'}));
      return;
    }
    var postData = {
      name: req.body.name,
      introduce: req.body.introduce,
      home_href: '/user/'+req.body.name
    };
    conn.query('select * from users where name ="' +req.body.name+'"', function(err, rows){
      if(err) {
        console.log(err);
        res.send(400);
        return
      }
      if(rows.length && req.body.name !== req.session.userName) {
        res.send(400, JSON.stringify({err: '用户名已存在'}));
      } else {
        conn.query('update users set ? where name = "'+req.session.userName+'"', postData, function(err){
          if(!err) {
              res.send(200);
          } else {
            console.log(err);
            res.send(500);
          }
          req.session.userName = req.body.name;
        });
      }
    })

  })
  .post('/rest/users/:userName', function(req, res) {
    var postData = {
      name: req.body.name,
      introduce: req.body.introduce,
      home_href: '/user/' + req.body.name
    };
    conn.query('select * from users where name ="' + req.body.name + '"', function (err, rows) {
      if (err) {
        console.log(err);
        res.send(400);
        return
      }
      if (rows.length && req.body.name !== req.body.keyName) {
        res.send(400, JSON.stringify({err: '用户名已存在'}));
      } else {
        conn.query('update users set ? where name = "' + req.param('userName') + '"', postData, function (err, result) {
          if (!err) {
            res.send(200);
          } else {
            console.log(err);
            res.send(500);
          }
        });
      }
    })
  })
  .delete('/rest/users/:userName', function(req, res) {
    conn.query('delete from users where name="'+req.param('userName')+'"', function(err, result){
      if(err) {
        console.log(err);
        res.send(500,JSON.stringify({err:'服务器错误'}));
      } else {
        res.send(200);
      }
    });
  })
  .post('/register', function(req, res) {
    if(!req.body.email) {
      res.send(400, JSON.stringify({err:'邮箱不能为空'}));
      return;
    }
    if(!req.body.userName) {
      res.send(400, JSON.stringify({err:'用户名不能为空'}));
      return;
    }
    if(!req.body.password) {
      res.send(400, JSON.stringify({err:'密码不能为空'}));
      return;
    }
    if(!req.body.confirmPassword) {
      res.send(400, JSON.stringify({err:'确认密码不能为空'}));
      return;
    }
    if(req.body.password !== req.body.confirmPassword) {
      res.send(400, JSON.stringify({err:'两次密码不相等！'}));
      return;
    }
    conn.query('select * from users where email = "' + req.body.email + '"', function(err, rows) {
      if(err) console.log(err);
      if(rows.length) {
        res.send(400, JSON.stringify({err: '邮箱已存在'}));
      } else {
        conn.query('select * from users where name="' +req.body.userName+'"', function(err, rows){
          if(rows.length) {
            res.send(400, JSON.stringify({err: '用户名已存在'}));
          } else {
            var post = {
              email: req.body.email,
              pwd: req.body.password,
              name: req.body.userName,
              home_href: '/user/'+req.body.userName,
              img_src: '/images/avatar/user-64.png',
              img_src_128: '/images/avatar/user-128.png'
            };
            conn.query('insert into users set ?', post, function(err, result){
              var userId = result.insertId;
              var badgeId = 1;
              var postRUsersBadges = {
                u_id: userId,
                b_id: badgeId
              };
              conn.query('insert into r_users_badges set ?', postRUsersBadges, function(){
                req.session.userName = req.body.userName;
                res.send(200, JSON.stringify({userName: req.body.userName}));
              });
            });
          }
        });

      }
    });
  })
  .post('/wish/finish', function(req, res){
    if(!req.session.userName) {
      res.send(400);
    } else {
      conn.query('select id from users where name="'+req.session.userName+'"', function(err, rows){
        if(err){
          console.log(err);
          res.send(500);
        } else {
          var userId = rows[0].id;
          conn.query('update wishes set status = "finished" where user_id='+userId, function(err){
            if(err) {
              console.log(err);
              res.send(500);
            } else {
              res.send(200);
            }
          });
        }
      });
    }
  })
  .post('/logout', function(req, res){
    req.session.destroy();
    res.send(200);
  })
  .post('/help', function(req, res){
    var sess = req.session;
    if(sess.userName) {
      var sqlGetUserId = 'select id from users where name = "' + sess.userName + '"';
      conn.query(sqlGetUserId, function(err, rows){
        if(err) console.log(err);
        if(rows.length) {
          var userId = rows[0].id;
          console.log(req.body.wishId);
          conn.query('update wishes set helper_id = "' + userId + '", status="helping" where id = "' + req.body.wishId+ '"', function(){
            res.send(200);
          });
        }
      });
    } else {
      res.send(400);
    }
  })
  .get('/rest/wish/:id', function(req, res){
    var wishId = req.params.id;
    var wish = {};
    wish.tags = [];
    var sqlGetTags = 'select t.name, t.id from r_wishes_tags r_w_t, tags t where r_w_t.w_id = "' + wishId + '" and t.id = r_w_t.t_id';
    var sqlGetWish = 'select w.id, w.title, w.content, w.status, w.create_time, u.name as userName,u.img_src as userImgSrc from wishes w, users u where u.id = w.user_id and w.id = "' + wishId + '"';
    var sqlGetRes = sqlGetTags + ';' + sqlGetWish;
    conn.query(sqlGetRes, function(err, rows){
      if(err) console.log(err);
      if(rows[1].length == 0 ) {
        wish = {err: '对不起, 你找的愿望不存在:('};
        res.end(JSON.stringify(wish));
      } else {
        wish = rows[1][0];
        wish.tags = rows[0];
        res.send(JSON.stringify(wish));
      }
    });
  })
  .get('/admin/*', function(req, res){
    res.render('admin');
  })
  .get('/*', function(req, res){
    res.render('index');
  })
  ;
  //后台编辑
app.listen(3000);
console.log('Listening on port 3000');



