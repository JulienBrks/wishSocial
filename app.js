var 
  express = require('express'),
  app = express(),
  conn = require('./conn.js').conn,
  moment = require('moment'); 
conn.connect();
var utilities = require('./utilities.js').util;
app
  .set('views', __dirname + '/views')
  .set('view engine','jade')
  .use(express.static(__dirname + '/public'))
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
      if (err) {console.log(err)};
      var objDevelopmentProcess = utilities.chgSnake2Camel(rows[0]);
      var jsonDevelopmentProcess = objDevelopmentProcess;
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
      if (err) {console.log(err4);};
      var objDevelopmentProcesses = utilities.chgSnake2Camel(rows);
      // console.log(objDevelopmentProcesses);
      var jsonDevelopmentProcesses = JSON.stringify(objDevelopmentProcesses);
      res.send(jsonDevelopmentProcesses);
    })
  })
  //新建一条愿望
  .post('/wishes',function(req,res){
    var tags = req.body.tags;
    for (var i = tags.length - 1; i >= 0; i--) {
      tags[i] = utilities.trim(tags[i]);
    };
    tags = utilities.delSameItem(tags);   
    tags = utilities.filterInvldChar(tags,',');
    var numTags = tags.length;
    tags = tags.join(',');
    conn.query('call addNewWish("'+tags+'",'+numTags+',"'+req.body.title+'","'+req.body.content+'");',function(err,rows,fields){
      if(err){
        console.log(err);
        res.send(500,'服务器出现错误');
      }
      res.send(200,'已成功发布愿望！'); 
    });       
  })
  //return for autocomplete tag content
  .get('/tags',function(req,res){
    conn.query('select name from tags where name like "%'+req.query.query+'%"', function(err, rows, fields) {
      if(err){
        console.log('conn.query.err: ' +err);
        res.send(500,'Sorry, but it seems that we got some trouble! We will fix it as soon as possible.');
        return ;
      }
      var resTags = utilities.arrObjsSpecificKey2Arr(rows,'name');
      res.send(200,resTags);
    });
  })
  .get('/wishes', function(req, res) {
    var wishes = [{
      userName: '',
      userHomeHref: '',
      userImgSrc: '',
      voteCount: '',
      userHomeHref: '',
      userName: '',
      userName: '',
      isConcernUser: '',
      userGender: '',
      wishHomeHref: '',
      wishTitle: '',
      wishId: '',
      wishImgSrc: '',
      wishImgSrc: '',
      wishContent: '',
      wishId: '',
      isCollapse: '',
      wishId: '',
      wishId: '',
      commentNum: '',
      wishId: '',
      wishId: '',
      wishId: '',
      wishId: '',
      isCollapse: '',
      voters: [{
        userHomeHref: '',
        userName: '',
        userName: ''
      }]
    }];
    res.send( 200, JSON.stringify(wishes) );
    conn.query('select * from wishes', function(err, rows, fields){
      var resWishes = rows;
      res.send(200, rows);
    });
  })
  ;
  //后台编辑
app.listen(3000);
console.log('Listening on port 3000');



