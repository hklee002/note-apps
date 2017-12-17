import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Nav, Button, Editor, Animate } from '../Common'


class NotebookEditor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notebookId : (typeof this.props.location.state !== "undefined") ? this.props.location.state.id : ""
        }
    }

    componentDidMount () {

        if ( this.state.notebookId && this.state.notebookId !== "" ) {
            this.fetchData();
        }
    }

    componentWillReceiveProps(nextProps) {

        // if (this.props.location.state.id !== nextProps.location.state.id) {
        //     this.setState({
        //         notebookId: nextProps.location.state.id
        //     })
        // }
    }

    componentDidUpdate () {
        console.log('notebookEditor componentDidUpdate')
    }

    fetchData() {
        this.props.fetchNotebookById(this.props.location.state.id)
        .then((data) => {})
    }

    submitHandler(notebook) {
        if ( this.state.notebookId ) {
            notebook.id = this.state.notebookId;
            this.props.updateNotebook(notebook)
            .then((data) => {
                this.props.history.replace('/')
            })
        } else {
            this.props.createNotebook(notebook)
            .then((data) => {
                this.props.history.replace('/')
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
                    maxLength="100"
                    onSubmitHandler={this.submitHandler.bind(this)}
                    data={this.props.notebook}/>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        notebook: state.notebook
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotebookById: (notebookId) => dispatch(actions.fetchNotebookById(notebookId)),
        createNotebook: (notebook) => dispatch(actions.createNotebook(notebook)),
        updateNotebook : (notebook) => dispatch(actions.updateNotebook(notebook))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookEditor);
