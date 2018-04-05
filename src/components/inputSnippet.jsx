import React from 'react';
import { Input, Button } from 'semantic-ui-react';


class InputSnippet extends React.Component {
    constructor() {
        super();
        this.state = {
            segmentValue: '',
            orderValue: '',
            textValue: '',
        }
    }

    submitSnippet() {
        var data = {
            segment: this.state.segmentValue,
            order: this.state.orderValue,
            text: this.state.textValue,
            scenario: 'coverLetter',
        }
        fetch('/input', {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
          })
          .then(response => console.log(response)) // parses response to JSON
          .catch(err => console.log( 'Error submitting input',err));
    }

    handleChange(index, event) {
        var newState = {};
        newState[index] = event.target.value
        this.setState(newState);
    }

    render () {
        var stateIndexes = Object.keys(this.state);
        return (
            <div>
                {stateIndexes.map((index) => {
                    return (
                        <div>{index}
                            <Input value={this.state[index]} onChange={this.handleChange.bind(this, index)}></Input>
                        </div>
                    )
                })}
                <Button onClick={this.submitSnippet.bind(this)}>Submit</Button>
            </div>
        )
    }
}

export default InputSnippet;
