/**
 * Created by junyoung on 2017. 6. 17..
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(session({secret: 'hello:)', cookie: {}, resave: true, saveUninitialized: true}));

var users = [
    {
        userId: 0,
        name: '성준영',
        password: '123',
        isAdmin: true
    },
    {
        userId: 1,
        name: '김성주',
        password: '123',
        isAdmin: false
    },
    {
        userId: 2,
        name: '김민호',
        password: '123',
        isAdmin: false
    },
    {
        userId: 3,
        name: '조주영',
        password: '123',
        isAdmin: false
    }
];

app.get('/login/:userId/password/:password', function (req, res) {
    const userId = req.params.userId;
    const password = req.params.password;

    var loginUser = users.filter(function (user) {
        if (user.userId == userId && user.password == password) {
            return true;
        } else {
            return false;
        }
    });
    if (loginUser.length !== 1) {
        res.sendStatus(403);
        return;
    } else {
        loginUser = loginUser[0];
    }

    var sess = req.session;
    sess.userId = loginUser.userId;
    sess.isAdmin = loginUser.isAdmin;

    res.json({result: 'Login Successfully'});
});

app.get('/logout/:userId/password/:password', function (req, res) {
    const userId = req.params.userId;
    const password = req.params.password;

    var loginUser = users.filter(function (user) {
        if (user.userId == userId && user.password == password) {
            return true;
        } else {
            return false;
        }
    });
    if (loginUser.length !== 1) {
        res.sendStatus(403);
        return;
    } else {
        loginUser = loginUser[0];
    }

    var sess = req.session;
    sess.destroy();
    res.json({result: 'Logout Successfully'});
});

var auth = function (req, res, next) {
    var sess = req.session;
    if (!sess.isAdmin) {
        res.sendStatus(403);
    } else {
        next();
    }
};

app.get('/users/:userId', auth, function (req, res) {

    const userId = req.params.userId;
    var loginUser = users.filter(function (user) {
        if (user.userId == userId) {
            return true;
        } else {
            return false;
        }
    });

    if (loginUser.length !== 1) {
        res.status(404);
        res.json({result: 'User Not Found!'});
    } else {
        loginUser = loginUser[0];
        res.json({result: 'User Found', data: loginUser});
    }
});

app.put('/users/:userId', auth, function (req, res) {
    const userId = req.params.userId;
    const updateUserInfo = req.body;

    if (!updateUserInfo.name || !updateUserInfo.password || updateUserInfo.isAdmin === undefined) {
        res.sendStatus(400);
        return;
    }

    var updateIndex;
    var flag = false;
    for (var i in users) {
        if (userId == users[i].userId) {
            users[i].name = updateUserInfo.name;
            users[i].password = updateUserInfo.password;
            users[i].isAdmin = updateUserInfo.isAdmin;
            updateIndex = i;
            flag = true;
            break;
        }
    }

    if (!flag) {
        res.status(404);
        res.json({result: 'User Not Found!'});
    } else {
        res.json({result: 'User Updated', data: users});
    }
});


app.delete('/users/:userId', auth, function (req, res) {
    const userId = req.params.userId;

    var deleteIndex;
    var flag = false;
    for (var i in users) {
        if (userId == users[i].userId) {
            deleteIndex = i;
            flag = true;
            break;
        }
    }

    if (!flag) {
        res.status(404);
        res.json({result: 'User Not Found!'});
    } else {
        users.splice(deleteIndex,1);
        res.json({result: 'User Deleted', data: users});
    }
});


app.post('/users', auth, function (req, res) {
    const addUserInfo = req.body;

    if (!addUserInfo.name || !addUserInfo.password || addUserInfo.isAdmin === undefined) {
        res.sendStatus(400);
        return;
    }

    addUserInfo.userId = users.length;
    users.push(addUserInfo);
    res.json({result: 'User Added', data: users});
});

var server = app.listen(3000, function () {
    console.log('express listening port 3000!');
});