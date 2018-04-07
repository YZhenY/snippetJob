import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button, Segment, TextArea} from 'semantic-ui-react'

class TemplateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            result: '',
            userInputs: {},
            snippetData: {
                pipeline: [],
                data: [],
            },
        }
        this.addToResult = this.addToResult.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }
    componentDidMount () {
        fetch('/startTemplate', {
            body: JSON.stringify({scenario:'coverLetter'}), // must match 'Content-Type' header
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
          })
        .then(response => {
            return response.json();
        }).then(result => {
            this.setState({snippetData: result});
        }).catch(err => console.log(err));
    }

    addToResult(str) {
        this.setState({result: this.state['result'] + str});
    }
    
    handleSelection (e) {
        this.addToResult(e.target.innerText);
    }

    render() {
        return (
            <div>
                {
                    Array.prototype.map.call(this.state.snippetData['pipeline'], (segment, index) => {
                        return (
                            <div key={segment}>
                            <Header> {segment} </Header>
                            {
                                Array.prototype.map.call(this.state.snippetData.data[index], (snippet, snippetIndex) => {
                                    return (
                                        <Segment key={segment + snippetIndex} onClick={this.handleSelection}>
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

export default TemplateForm;