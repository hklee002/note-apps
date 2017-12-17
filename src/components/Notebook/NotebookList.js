import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions';
import { Nav, Button, Dropdown, Tooltip, Message } from '../Common'
import './NotebookList.css';

class NotebookList extends Component {

    constructor(props) {
        super(props)

        this.state = {
          notebooks : [],
          notes: []
        }
    }

    componentDidMount () {
        this.fetchData();
    }

    fetchData = () => {
        this.props.fetchNotebooks()
        .then((data) => {
            this.setState({
                notebooks: this.props.notebooks
            })
        });

        this.props.fetchNotes('', 'recently')
        .then((data) => {
            this.setState({
                notes: this.props.notes
            })
        })
    }

    createNotebookHandler = ( notebook ) => {
        this.props.createNotebook(notebook)
        .then(() => {
            this.fetchData()
        })
    }

    removeNotebookHandler = ( notebook ) => {
        this.props.removeNotebook(notebook)
        .then(() => {
            this.fetchData()
        })
    }

    updateNotebookHandler = ( notebook ) => {

        this.props.updateNotebook(notebook)
        .then(() => {
            this.fetchData()
        })
    }

    submitHandler = ( notebook ) => {
        if ( notebook.id ) {
            this.updateNotebookHandler(notebook)
        } else {
            this.createNotebookHandler(notebook)
        }
    }

    render() {
        return (
            <div className="container-main">
                <Nav>
                    <Button type="button" className="right">
                        <Link to='/editNotebook/'>
                            <div className="tooltip">Add
                                <Tooltip>Add Notebook</Tooltip>
                            </div>
                        </Link>
                    </Button>
                </Nav>

                <h2 className="title-notebooks"><span className="inner">Notebooks</span></h2>
                { typeof this.state.notebooks.data !== 'undefined' && this.state.notebooks.data.length > 0 ?
                <ul className="container-notebooks fade-in">
                    { typeof this.state.notebooks.data !== 'undefined' && this.state.notebooks.data.map( (notebook, index) =>
                        <li className="notebook transition" key={index}>
                            <Dropdown className="right">
                                <Link to={{pathname: '/editNotebook', state: { id: notebook.id }}}>
                                    Edit
                                </Link>
                                <a href="javascript:;" onClick={ event => {
                                    this.removeNotebookHandler(notebook)
                                }}>Delete</a>
                            </Dropdown>
                            <div className="content">
                            <Link to={{pathname:"/notebook/" + notebook.id,
                                state: { notebookName: notebook.title } }} >
                                    <h4 className="title ellipsis">
                                        {notebook.title}
                                    </h4>
                                    <p>{notebook.content}</p>
                                </Link>
                            </div>
                        </li>
                    )}
                </ul>
                : <Message>empty</Message>}

                <h2 className="title-notebooks">Recently</h2>
                { typeof this.state.notes.data !== 'undefined' && this.state.notes.data.length > 0 ?
                <ul className="container-notebooks fade-in">
                    { typeof this.state.notes.data !== 'undefined' && this.state.notes.data.map( (note, index) =>
                        <li className="notebook transition" key={index}>
                            <div className="content">
                            <Link to={{pathname:"/note/" + note.id,
                                state: { notebookId: note.notebookId } }} >
                                    <h4 className="title ellipsis">
                                        {note.title}
                                    </h4>
                                    <p>{note.content.replace(/<br>/g, " ")}</p>
                                </Link>
                            </div>
                        </li>
                    )}
                </ul>
                : <Message>empty</Message>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notebooks: state.notebooks,
        notes: state.notes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotebooks: () => dispatch(actions.fetchNotebooks()),
        createNotebook: (notebook) => dispatch(actions.createNotebook(notebook)),
        removeNotebook : (notebookId) => dispatch(actions.removeNotebook(notebookId)),
        updateNotebook : (notebook) => dispatch(actions.updateNotebook(notebook)),
        fetchNotes: (id, sortType) => dispatch(actions.fetchNotes(id,sortType))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookList);
