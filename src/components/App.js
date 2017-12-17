import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { NoteList, NotebookList, NotebookEditor, NoteEditor, Note } from '../components'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className="container">
                <Route exact path="/" component={NotebookList} />
                <Route path="/notebook/:id" component={NoteList} />
                <Route path="/note/:id" component={Note} />
                <Route path="/edit" component={NoteEditor} />
                <Route path="/editNotebook" component={NotebookEditor} />
            </div>
        )
    }
}

export default App
