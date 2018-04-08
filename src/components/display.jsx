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
                        <Segment key={this.props.segment + snippetIndex} onClick={this.handleSelection}>
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