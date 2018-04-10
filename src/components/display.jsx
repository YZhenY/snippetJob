import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button, Segment} from 'semantic-ui-react'

class Display extends React.Component {
    constructor(props) {
        super();
    }
    
    render() {
        return (
            <div key={this.props.segment}>
            <Header> {this.props.segment} </Header>
            {
                Array.prototype.map.call(this.props.snippets, (snippet, snippetIndex) => {
                    return (
                        <Segment key={snippet._id} onClick={this.props.handleSnippetClick}>
                            {snippet.text} 
                        </Segment>
                    )
                })
            }
            </div>
        )
    }
}

export default Display;