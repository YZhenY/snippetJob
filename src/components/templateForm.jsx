import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button, Segment, TextArea} from 'semantic-ui-react'
import UserInput from './userInput.jsx';
import Display from './display.jsx';


class TemplateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            displaySegment:'header',
            displaySnippets: [],
            inputResults: {},
            requiredInputs: [],
            result: '',
            snippetData: {
                pipeline: [],
                data: [],
            },
        }
        this.addToResult = this.addToResult.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.createInputs = this.createInputs.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.parsedOutput = this.parsedOutput.bind(this);
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
        return new Promise ((resolve, reject) => {
            this.setState({result: this.state['result'] + str}, function (error) {
                if (error) console.log(error);
                resolve();
            });
        })
    }
    
    handleSelection (e) {
        e.target.style['borderColor'] = 'blue';
        // console.log('Handle Selection called')
        this.addToResult(e.target.innerText).then(()=> {
            this.createInputs();
        })
    }

    changeDisplay() {
        
    }

    createInputs () {
        // console.log('Create Inputs called')
        var regex = /\$\{.*?\}/g
        var matches = this.state.result.match(regex);
        matches = matches.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        })
        if (!(matches === null)) {
            this.setState({requiredInputs:matches});
        }
    }

    handleInputs (index, event) {
        var newState = {... this.state.inputResults};
        newState[index] = event.target.value
        this.setState({inputResults: newState});
    }

    parsedOutput() {
        var parsedOutput = this.state.result;
        var requiredReplacements = Object.keys(this.state.inputResults);
        requiredReplacements.map((inputKey) => {
            var regex = new RegExp('\\$\\{' + inputKey.slice(2,-1) + '\\}', 'g');
            parsedOutput = parsedOutput.replace(regex, this.state.inputResults[inputKey]);
        })
        console.log(parsedOutput)
        return parsedOutput;
    }

    render() {
        return (
            <div id='template-form-container'>
                <Display segment={this.state.displaySegment} snippets={this.state.displaySnippets} handleSnippetClick={this.handleSelection}/>
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

                <UserInput handleInputs={this.handleInputs} inputResults={this.state.inputResults} inputsRequired={this.state.requiredInputs} />
                <Button onClick={this.parsedOutput}>Parse Output</Button> 
                <TextArea id='template-form-output-box' autoHeight style={{ minHeight: 100, }} placeholder='Your document outputs here!' value={this.state.result}></TextArea>
            </div>
        )

    }
}

export default TemplateForm;