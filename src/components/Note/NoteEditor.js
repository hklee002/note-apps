import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Nav, Button, Editor } from '../Common'

import './NoteEditor.css'

class NoteEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteId :  this.props.location.state.id,
            notebookId : this.props.location.state.notebookId,
            isUpdate : false
        }
    }

    componentDidMount () {

        if ( this.state.noteId ) {
            this.fetchData();
        }
    }

    fetchData = () => {
        this.props.fetchNote(this.state.noteId)
        .then((data) => {
            this.setState({
                isUpdate : true
            })
        });
    }

    fillZero(num) {
        return (num < 10 ? '0' : '') + num;
    }

    getUpdateTime() {
        let postDate = new Date();
        return [
            postDate.getFullYear(),
            this.fillZero(postDate.getMonth()+1),
            this.fillZero(postDate.getDate()),
            this.fillZero(postDate.getHours()),
            this.fillZero(postDate.getMinutes()),
            this.fillZero(postDate.getSeconds())
        ].join('')

    }

    submitHandler(note) {

        let postDate = this.getUpdateTime()

        note.updateTime = postDate
        note.notebookId = this.state.notebookId

        if ( this.state.isUpdate ) {
            note.id = this.state.noteId
            this.props.updateNote(note)
            .then(() => {
                this.props.history.replace('/note/' + this.state.noteId)
            })
        } else {
            this.props.createNote(note)
            .then(() => {
                this.props.history.replace('/notebook/' + this.state.notebookId)
            })
        }
    }

    historyBack () {
        this.props.history.goBack()
    }

    render() {
        return (
            <div className="editor-container">
                <Nav>
                    <Button type="button" className="left" onClickHandler={this.historyBack.bind(this)}>Cancel</Button>
                </Nav>

                <Editor
                    maxLength="2000"
                    onSubmitHandler={this.submitHandler.bind(this)}
                    data={this.props.note}
                    markdown="Y"
                    />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        note: state.notes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNote: (note) => dispatch(actions.createNote(note)),
        updateNote: (note) => dispatch(actions.updateNote(note)),
        fetchNote: (noteId) => dispatch(actions.fetchNote(noteId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);
