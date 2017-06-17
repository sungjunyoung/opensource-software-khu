/**
 * Created by junyoung on 2017. 6. 17..
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var books = [
    {
        id: 0,
        name: '0번책',
        author: '0번책 저자',
        price: 1000
    },
    {
        id: 1,
        name: '1번책',
        author: '1번책 저자',
        price: 2000
    },
    {
        id: 2,
        name: '2번책',
        author: '2번책 저자',
        price: 3000
    },
    {
        id: 3,
        name: '3번책',
        author: '3번책 저자',
        price: 4000
    },
    {
        id: 4,
        name: '4번책',
        author: '4번책 저자',
        price: 5000
    }
];

app.get('/books/:bookId', function (req, res) {
    const bookId = req.params.bookId;
    var findBookById = books.filter(function (book) {
        if (book.id == bookId) {
            return true;
        } else {
            return false;
        }
    });

    if (findBookById.length !== 1) {
        res.json({result: 'Cannot Find Book By ID'});
    } else {
        res.json({result: findBookById[0]});
    }
});

app.put('/books/:bookId', function (req, res) {
    const bookId = req.params.bookId;

    var updateIndex;
    var flag = false;
    for (var i in books) {
        if (books[i].id == bookId) {
            books[i].name = req.body.name;
            books[i].auther = req.body.author;
            books[i].price = req.body.price;
            flag = true;
            updateIndex = i;
            break;
        }
    }

    if (flag) {
        res.json({result: 'Updated', data: books});
    } else {
        res.sendStatus(400);
    }
});

app.post('/books', function (req, res) {
    const bookToAdd = req.body;
    if (!bookToAdd.author || !bookToAdd.price || !bookToAdd.name) {
        res.sendStatus(400);
        res.end();
    }

    bookToAdd.id = books.length;
    books.push(bookToAdd);
    res.json({result: 'Added', data: books});
});

app.delete('/books/:bookId', function (req, res) {
    const bookId = req.params.bookId;
    var deleteIndex;
    var flag = false;
    for (var i in books) {
        if(bookId == books[i].id){
            flag = true;
            deleteIndex = i;
            break;
        }
    }

    if(flag){
        books.splice(deleteIndex, 1);
        res.json({result: 'Deleted', data: books});
    } else {
        res.sendStatus(500);
    }
});

var server = app.listen(3000, function () {
    console.log('express listening port 3000!');
});