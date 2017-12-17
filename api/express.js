'use strict';

var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var connect = require('./db/connect');
var marked = require('markdown').markdown;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/notebook', function ( req, res ) {
    var id = req.param('id'), query = "";

    if ( id ) {
        query = { id : parseInt(id, '10') }
    }

    connect.selectNotebook(query)
    .then(function (data) {
        res.json({data});
    });
});

app.put('/notebook', function (req, res) {
    var body = req.body;

    if ( body ) {
        connect.removeNotebook(body)
        .then(function (data) {
            var result = new Promise(function(){
                connect.removeNote({ id : body.id })
                .then(function (data) {
                });

                res.json({data});
            });
        })
    }
});

app.post('/notebook', function (req, res) {
    var body = req.body;
    if ( body.id ) {
        connect.updateNotebook( { id: body.id }, { title: body.title, content : body.content })
        .then(function (data) {
            res.json({data});
        });
    } else {
        connect.insertNotebook(body)
        .then(function (data) {
            res.json({data});
        });
    }
});

app.get('/note', function( req, res ) {
    var notebookId = req.param('notebookId');
    var noteId = req.param('noteId');
    var sortType = req.param('sort') || 'title';
    var isMarked = req.param('marked') || 'N';
    var isSortSearch = (sortType === 'recently');

    if ( isSortSearch ) {
        connect.selectNote('', { limit: 4 })
        .then(function (data) {

            var result = new Promise(function(){
                var resultData = data.sort(function(a,b){
                    var prevValue = a['updateTime'];
                    var nextValue = b['updateTime'];
                    return nextValue-prevValue;
                });

                res.json({ data : resultData });
            });
        });
    } else if ( noteId ) {
        connect.selectNote( { id : parseInt(noteId,10) })
        .then(function (data) {
            var tree = marked.parse(data[0].content);
            var html = marked.renderJsonML( marked.toHTMLTree( tree ) )
            data[0].marked = html;
            res.json({data});
        });
    } else {
         connect.selectNote({ notebookId : notebookId }, { sort: sortType })
        .then(function (data) {

            if ( sortType.toLowerCase() === 'updatetime') {
                var result = new Promise(function(){
                    var resultData = data.sort(function(a,b){
                        var prevValue = a['updateTime'];
                        var nextValue = b['updateTime'];
                        return nextValue-prevValue;
                    });

                    res.json({ data : resultData});
                });
            } else {
                res.json({data});
            }
        })
    }
});


app.post('/note', function (req, res) {
    var body = req.body;

    if ( body instanceof Array ) {
        var result = new Promise(function(){
            var resultData = body.forEach(function( item, index ){
                connect.updateNote( {id : item.id},  { notebookId : item.notebookId })
                .then(function (data) {
                });
            });

            res.json({ 'status':'ok'});
        });
    } else if ( body.id  ) {
        connect.updateNote( {id : body.id},  { title: body.title, content : body.content, notebookId : body.notebookId, updateTime : body.updateTime })
        .then(function (data) {
            res.json({data});
        });
    } else {
        connect.insertNote(body)
        .then(function (data) {
            res.json({data});
        });
    }

});

app.put('/note', function (req, res) {
    var body = req.body;

    if ( body instanceof Array ) {
        var result = new Promise(function(){
            var resultData = body.forEach(function( item, index ){
                connect.removeNote({ id : item.id })
                .then(function (data) {
                });
            });

            res.json({data});
        });
    } else {
        var result = new Promise(function(){
            connect.removeNote(body)
            .then(function (data) {
                console.log('data:',data);
                res.json({data});
            });
        });


    }
});

app.listen('5000', function(){
    console.log('listen!');
});
