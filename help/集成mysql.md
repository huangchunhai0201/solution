http://www.tuicool.com/articles/JfqYN3I

1. 首先，我们先建几个目录，简单分下层（看出我还是很用心木有？）

在工程根目录新增三个目录：

util – 工具方法

conf – 配置

dao – 与数据库交互

完成后的工程结构

2.在conf目录中，编写mySQL数据库连接配置

// conf/db.js
// MySQL数据库联接配置
module.exports = {
	mysql: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database:'test', // 前面建的user表位于这个数据库中
		port: 3306
	}
};

3. 编写CRUD SQL语句

// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
	update:'update user set name=?, age=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};

module.exports = user;

3. 增加路由及实现数据库的CRUD

以C（新增）的具体实现举例，在/routes/users.js 中增加一个路由

// 增加用户
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

在userDao中实现add方法

// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/conf');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接
				connection.release();
			});
		});
	}
};

4. 测试整合是否成功

因为前面实现的是一个get请求的add方法， 所以可以在浏览器中直接使用地址访问，进入路由, http://localhost:3000/users/addUser?name=xyz&age=18.如果你得到如下JSON返回或看到数据表中有上面的数据插入，表示整合成功了

5. 同理，实现CRUD其它的方法，最终完整的的routes/user.js为：

var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});

module.exports = router;

完整的userDao.js为

// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
				// 使用页面进行跳转提示
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('fail',  {
						result: result
					});
				}

				connection.release();
			});
		});

	},
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();

			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}

};

除了update测试外，其它get请求都可以直接在浏览器中使用地址+参数完成测试。为了模拟post请求，同时简单使用下jade模板（Express支持的一种模板引擎），我们在/views目录新建三个jade文件

updateUser.jade

extends layout
block content
	h1 更新用户资料
	form(method='post', action='/p/users/updateUser')
		div.form-row
			label
				span ID:
				input(type='text',name='id')
		div.form-row
			label
				span name:
				input(type='text',name='name')
		div.form-row
			label
				span age:
				input(type='text',name='age')
		div.form-row
			input(type='submit')

suc.jade
block content
  h1 操作成功！
  pre #{JSON.stringify(result)}

fail.jade

block content
  h1 操作失败！
  pre #{JSON.stringify(result)}

  以下是更新测试结果

  最后，如果你使用的是idea或webStrom这样的IDE，你就不需要安装express和express项目种子生成器了。这两个IDE是可以直接创建NodeJS项目