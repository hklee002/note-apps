import React, { Component } from 'react'
import HtmlParser from 'react-html-parser'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import shallowCompare from 'react-addons-shallow-compare'
import * as actions from '../../actions'
import { Nav, Button, Tooltip } from '../Common'

import './Note.css'

class Note extends Component {

    constructor(props) {
        super();
        this.state = {
            note: [],
            noteId : props.match.params.id
        }
    }

    componentDidMount () {
        this.fetchData();
    }

    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    fetchData = () => {
        this.props.fetchNote(this.state.noteId)
        .then((data) => {
            this.setState({
                note : this.props.note.data[0]
            })
        });
    }

    removeNoteHandler = () => {
        let isDelete = window.confirm('delete?');
        if (isDelete) {
            this.props.history.replace('/notebook/' + this.state.note.notebookId)
            this.props.removeNote(this.state.note)
            .then((data) => {
                this.fetchData()
            })
            .catch((err) => {
            })
        }
    }

    historyBack = () => {
        if (  this.state.note.notebookId ) {
            this.props.history.replace('/notebook/' + this.state.note.notebookId)
        } else {
            this.props.history.goBack();
        }

    }

    render() {

console.log(this.state.note)

        return (
            <div className="note-container">
                <Nav>
                    <Button type="button" className="left" onClickHandler={this.historyBack.bind(this)}>Back</Button>
                    <Button type="button" className="right" onClickHandler={this.removeNoteHandler.bind(this)}>
                        <div className="tooltip">Delete
                            <Tooltip>Delete Note</Tooltip>
                        </div>
                    </Button>
                    <Button type="button" className="right">
                        <Link
                            to={{pathname:'/edit/',
                                state: { id : this.state.note.id, notebookId : this.state.note.notebookId }}} >
                            <div className="tooltip">Edit
                                <Tooltip>Edit Note</Tooltip>
                            </div>
                        </Link>
                    </Button>
                </Nav>
                <div className="content-container">
                    <h2 className="title">{this.state.note.title}</h2>
                    <div className="content">{HtmlParser(this.state.note.marked)}</div>
                    <div className="updatetime"><strong>Modified</strong> {this.state.note.updateTime}</div>
                </div>
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
        fetchNote: (noteId) => dispatch(actions.fetchNote(noteId)),
        removeNote: (note) => dispatch(actions.removeNote(note))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
