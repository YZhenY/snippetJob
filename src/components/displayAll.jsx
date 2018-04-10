import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button, Segment} from 'semantic-ui-react'

class DisplayAll extends React.Component {
    constructor(props) {
        super();
    }
    
    render() {
        return (
            <div>
            {
                Array.prototype.map.call(this.props.snippetData['pipeline'], (segment, index) => {
                    return (
                        <div key={segment}>
                        <Header> {segment} </Header>
                        {
                            Array.prototype.map.call(this.props.snippetData.data[index], (snippet, snippetIndex) => {
                                return (
                                    <Segment key={segment + snippetIndex} onClick={this.props.handleSimpleSelection}>
                                        {snippet.text} 
                                    </Segment>
                                )
                            })
                        }
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

export default DisplayAll;