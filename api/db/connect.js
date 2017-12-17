'use strict';

var _pocketdb = require('pocketdb');

var db = new _pocketdb.PocketDB('./noteapp');
var notebook = new _pocketdb.Collection(db, 'notebook');
var note = new _pocketdb.Collection(db, 'notes');

exports.selectNotebook = function ( query ) {
    return notebook.find(query);
};

exports.insertNotebook = function ( obj ) {
    return notebook.insertOne(obj);
};

exports.removeNotebook = function ( obj ) {
    return notebook.removeOne(obj);
}

exports.updateNotebook = function ( id, content ) {
    return notebook.updateOne(id, content)
}

exports.selectNote = function ( query, options ) {
    return note.find(query,options);
}

exports.insertNote = function ( obj ) {
    return note.insertOne(obj);
}

exports.updateNote = function ( id, conentent ) {
    return note.updateOne(id, conentent );
}

exports.removeNote = function ( query ) {
    return note.remove(query);
}
