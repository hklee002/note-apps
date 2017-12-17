import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions';
import shallowCompare from 'react-addons-shallow-compare'
import { Link } from 'react-router-dom'
import { Dropdown, Nav, Button, Select, Tooltip, Message } from '../Common'
import * as Icon from 'react-icons/lib/fa'
import './NoteList.css'

class NoteList extends Component {

    constructor(props) {
        super();
        this.state = {
            notes: {
                data : []
            },
            notebooks: {
                data : []
            },
            currentNotebook : {},
            isEditing : false
        }
    }

    componentDidMount () {
        this.fetchData();
    }

    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    fetchData = (sortType) => {
        this.props.fetchNotes(this.props.match.params.id, (sortType || ''))
        .then((data) => {
            this.setState({
                notes : this.props.notes
            })
        });

        this.props.fetchNotebooks()
        .then((data) => {
            this.setState({
                notebooks: this.props.notebooks,
                currentNotebook: this.props.notebooks.data.filter( item => ( this.props.match.params.id == item.id ) )[0]
            })

        })
    }

    editHandler = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    getEditCheckboxs = () => {

        const self = this;
        const checkboxs = [];
        Object.keys(this.refs).forEach( function( key, index ) {
            if ( key.indexOf('edit-checkbox-') > -1 && self.refs[key].checked ) {
                checkboxs.push(self.refs[key])
            }
        });

        return checkboxs;
    }

    resetEditCheckbox = () => {
        this.getEditCheckboxs().forEach( function( item, index ) {
            item.checked = false
        });
    }

    removeNoteHandler = () => {
        const query = []
        this.getEditCheckboxs().map( ( item, index ) => {
            query.push({
                id: parseInt(item.value,10)
            })
        });

        this.props.removeNote(query)
        .then((data) => {
            this.fetchData()
        })
    }

    moveNoteHandler = (id) => {
        const query = []
        this.getEditCheckboxs().map( ( item, index ) => (
            query.push({
                id: parseInt(item.value,10), notebookId: id + ""
            })
        ));

        this.props.updateNote(query)
        .then((data) => {
            this.fetchData()
            this.resetEditCheckbox()
        })
    }

    selectOptionHandler = (event) => {
        this.fetchData(event.target.value)
    }

    render() {



        return (

            <div className={`notes-container ${this.state.isEditing ? 'edit' : ''}`}>

                <Nav>
                    <Button type="buton" className="left ">
                        <Link to='/' >
                            Back
                        </Link>
                    </Button>
                    <Button type="button" className="right" onClickHandler={this.editHandler.bind(this)}>
                        <div className="tooltip">Edit
                            <Tooltip>Edit Mode</Tooltip>
                        </div>
                    </Button>
                    <Button type="button" className="right">
                        <Link to={{pathname:'/edit/',
                            state: { notebookId : this.props.match.params.id }}}  >
                            <div className="tooltip">New
                                <Tooltip>Add Note</Tooltip>
                            </div>
                        </Link>
                    </Button>
                </Nav>

                <div className="notes-header">
                    <h2 className="title">{this.state.currentNotebook.title}</h2>
                    <div className="options left">
                        <div className="option_inner">
                            <span>Sort by</span>
                            <Select changeHandler={this.selectOptionHandler.bind(this)}>
                                <option value="title">title</option>
                                <option value="updateTime">update time</option>
                            </Select>
                        </div>
                    </div>
                    <div className="options right">
                        <div className="option_inner container-edit-mode">
                            <div className="icon_inner">
                                <Dropdown iconType="edit" className="large">
                                    { typeof this.state.notebooks.data !== 'undefined' && this.state.notebooks.data.map( (notebook, index) =>
                                        <a href="#none"
                                            key={index}
                                            onClick={ event => {
                                                if ( event.target.className === 'disabled') {
                                                    alert('can not move!')
                                                } else {
                                                    this.moveNoteHandler(notebook.id)
                                                }

                                            }}
                                            className={(this.props.match.params.id == notebook.id) ? 'disabled' : ''}>
                                            {notebook.title}
                                        </a>
                                    )}
                                </Dropdown>
                            </div>
                            <div className="icon_inner">
                                <Button onClickHandler={this.removeNoteHandler.bind(this)}>
                                    <div className="tooltip"><Icon.FaTrashO />
                                        <Tooltip>Trash!</Tooltip>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                { typeof this.state.notes.data !== 'undefined' && this.state.notes.data.length > 0 ?
                <ul className="notes-content fade-in">
                    { typeof this.state.notes.data !== 'undefined' && this.state.notes.data.map( (note, index) =>
                        <li className="note transition" key={index}>
                            <input className="checkbox-editing"
                                key={index}
                                type="checkbox"
                                ref={ 'edit-checkbox-' + index }
                                value={note.id} />
                            <Link to={`/note/${note.id}`} >
                                <div className="content ellipsis">
                                    <h4 className="title">
                                        {note.title}
                                    </h4>
                                    <p>{note.content.replace(/<br>/g, " ")}</p>
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                : <Message>Empty</Message>}


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notes: state.notes,
        notebooks : state.notebooks
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotes: (notebookId, sortType) => dispatch(actions.fetchNotes(notebookId, sortType)),
        fetchNotebooks : () => dispatch(actions.fetchNotebooks()),
        removeNote: (note) => dispatch(actions.removeNote(note)),
        updateNote: (note) => dispatch(actions.updateNote(note))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
