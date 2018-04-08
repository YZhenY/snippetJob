import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button, Segment, TextArea} from 'semantic-ui-react'
import UserInput from './userInput.jsx';
import Display from './display.jsx';


class TemplateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            curSegment: 0,
            curPhase:0,
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
        this.handleStorySelection = this.handleStorySelection.bind(this);
        this.handleSimpleSelection = this.handleSimpleSelection.bind(this);
        this.segmentDisplay = this.segmentDisplay.bind(this);
        this.snippetDisplay = this.snippetDisplay.bind(this);
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
    
    handleSimpleSelection (e) {
        e.target.style['borderColor'] = 'blue';
        // console.log('Handle Selection called')
        this.addToResult(e.target.innerText).then(()=> {
            this.createInputs();
        })
    }

    //CODE FOR "STORY" DISPLAY PIPELINES
    handleStorySelection (e) {
        this.addToResult(e.target.innerText);
        this.setState({curPhase: curPhase += 1});
        
    }

    segmentDisplay() {
        return this.state.snippetData.pipeline[this.state.curSegment];
    }

    snippetDisplay() {
        var snippetsForPhase = this.state.snippetData.data[this.state.curSegment] || [];
        snippetsForPhase = snippetsForPhase.filter((snippetObj) => Number(snippetObj['order']) === this.state.curPhase);
        return snippetsForPhase;
    }

    //BELOW IS CODE FOR HANDLING USER INPUT VARIABLES
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
        newState[index] = event.target.value;
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
                <Display segment={this.segmentDisplay()} snippets={this.snippetDisplay()} handleSnippetClick={this.handleStorySelection}/>
                {
                    Array.prototype.map.call(this.state.snippetData['pipeline'], (segment, index) => {
                        return (
                            <div key={segment}>
                            <Header> {segment} </Header>
                            {
                                Array.prototype.map.call(this.state.snippetData.data[index], (snippet, snippetIndex) => {
                                    return (
                                        <Segment key={segment + snippetIndex} onClick={this.handleSimpleSelection}>
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