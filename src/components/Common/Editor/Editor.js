import React, {Component} from 'react'
import { Button } from '../../Common'


class Editor extends Component{

    constructor(props) {
        super(props);
        this.state = {
            markdown : [
                {label : '#heading', value : '#'},
                {label : 'list', value : '-'},
                {label : 'BlockQuote', value: '>'},
                {label : '**bold**', value: '**'},
                {label : 'todo', value:'-[ ]'}
            ]
        }
    }

    componentWillReceiveProps(nextProps) {

        let propNote = this.props.data.data || [];
        let nextPropsNote = nextProps.data.data || [];

        if ( typeof nextPropsNote !== 'undefined' && nextPropsNote[0] ) {

            if (nextPropsNote[0].title !== propNote.title ) {
              this.setTitleValue(nextPropsNote[0].title || '')
            }

            if (nextPropsNote[0].content !== propNote.content ) {
              this.setContentValue(nextPropsNote[0].content || '')
            }
        }
    }

    setTitleValue(value) {
        this.refs.titleInput.value = value
    }

    getTitleValue() {
        return this.refs.titleInput.value
    }

    setContentValue(value) {
        // this.refs.contentInput.value = value.replace(/<br>/g, "\n")
        this.refs.contentInput.value = value
    }

    getContentValue() {
        return this.refs.contentInput.value
        // return this.refs.contentInput.value.replace(/\n\r/g , "<br>")
    }

    guideButtonBarHandler = (event) => {
        const contentInput = this.refs.contentInput;
        const contentValue = this.getContentValue()
        const insertTag = event.target.value;

        if (document.selection) {
            contentInput.focus();
            let selection = document.selection.createRange();
            selection.text = insertTag;
        } else if (contentInput.selectionStart || contentInput.selectionStart == '0') {
            var startPosition = contentInput.selectionStart;
            var endPosition = contentInput.selectionEnd;
            let replaceText = contentValue.substring(0,startPosition) + insertTag + contentValue.substring(endPosition,contentValue.length)
            this.setContentValue(replaceText)
        } else {
            this.setContentValue ( contentValue + '' + insertTag);
        }
    }

    submitHandler(event) {
        event.preventDefault()

        let notebook = {
            title: this.getTitleValue(),
            content: this.getContentValue()
        }

        if (notebook.title !== '' && notebook.content !== '') {
            this.props.onSubmitHandler(notebook)
        } else {
            alert('입력해주세요.');
        }
    }

    render() {
        return (
            <div>
            <form className="editor-form" onSubmit={this.submitHandler.bind(this)}>
                <fieldset className="editor-content">
                    <input type="text"
                        ref="titleInput"
                        className="editor-input editor-title"
                        defaultValue=""
                        placeholder="A title"  />
                    <textarea
                        ref="contentInput"
                        className="editor-input editor-content"
                        placeholder="Details"
                        defaultValue=""
                        maxLength={this.props.maxLength}></textarea>
                </fieldset>
                <div className="editor-bottom">
                    <Button type="submit" className="editor-submit">Save</Button>
                </div>
            </form>
            {this.props.markdown == "Y" &&
                <div className="container-editor-guide">
                    { this.state.markdown.map( (item, index) =>
                        <Button value={item.value} key={index} onClickHandler={this.guideButtonBarHandler.bind(this)}>{item.label}</Button>
                    )}
                </div>
            }
            </div>
        )
    }

}

export default Editor
