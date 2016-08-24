var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:password@ds013966.mlab.com:13966/meantodosapp', ['todos']);

//Get All Todos
router.get('/todos', function (req, res, next) {
    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

//Get Single Todo
router.get('/todos/:id', function (req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

//Add Todo
router.post('/todos', function (req, res, next) {
    var todo = req.body;
    if (!todo.text || !(todo.completed + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Update Todo
router.put('/todos/:id', function (req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.completed) {
        updObj.completed = todo.completed;
    }

    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Delete Single Todo
router.delete('/todos/:id', function (req, res, next) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

module.exports = router;
