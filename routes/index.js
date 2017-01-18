var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express1',indexO:{"id": 1} });


// });
router.get('/', function(req, res, next) {
  //数据
  var data = {
    title: '国内要闻',
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
  res.render('index', data);
});

module.exports = router;
