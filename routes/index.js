var express = require('express');
var request= require('request');

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express1',indexO:{"id": 1} });


// });
router.get('/test', function(req, res, next) {
  /*正式数据*/
  request('http://localhost:8080/rank/json/rank/getAccounts?departmentId=-10',function(error,response,body){
    /*判断请求是否成功*/
    if (!error && response.statusCode == 200) {
      /*把字符串转换为json*/
      var data=JSON.parse(body);
      /*渲染模板*/
      data.title = 'test';
      console.log(data.result);
      res.render('test/test', data);
    }
  });
});

router.get('/', function(req, res, next) {
  //数据
  var data = {
    title: 'Map',
    time: (new Date).toString(),
    list: [
      {
        id: '1',
        name: '张三'
      },
      {
        id: '2',
        name: '李四'
      }
    ]
  };
  //渲染模板
  res.render('index/index', data);
});

router.get('/index/map', function(req, res, next) {
  //数据
  var data = {
    title: 'Map',
    time: (new Date).toString(),
    list: [
      {
        id: '1',
        name: '张三'
      },
      {
        id: '2',
        name: '李四'
      }
    ]
  };
  //渲染模板
  res.render('index/map', data);
});

router.get('/other/index', function(req, res, next) {
  //数据
  var data = {
    title: '开发2',
    time: (new Date).toString(),
    list: [
      {
        id: '1',
        name: '张三'
      },
      {
        id: '2',
        name: '李四'
      }
    ]
  };
  //渲染模板
  res.render('other/index', data);
});

router.get('/component/index', function(req, res, next) {
  //数据
  var data = {
    title: '组件开发',
    time: (new Date).toString(),
    list: [
      {
        id: '1',
        name: '张三'
      },
      {
        id: '2',
        name: '李四'
      }
    ]
  };
  //渲染模板
  res.render('component/index', data);
});

module.exports = router;
