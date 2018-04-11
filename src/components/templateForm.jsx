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
            inputSnippet:'',
        }
        
        this.addToResult = this.addToResult.bind(this);
        this.handleSimpleSelection = this.handleSimpleSelection.bind(this);
        
        //FOR DISPLAY
        this.handleStorySelection = this.handleStorySelection.bind(this);
        this.handleNextSegment = this.handleNextSegment.bind(this);
        this.segmentDisplay = this.segmentDisplay.bind(this);
        this.snippetDisplay = this.snippetDisplay.bind(this);
        
        //FOR NEW SNIPPETS
        this.handleNewSnippetChange = this.handleNewSnippetChange.bind(this);
        this.handleSnippetSubmission = this.handleSnippetSubmission.bind(this);
        
        //FOR VARIABLE INPUTS
        this.createInputs = this.createInputs.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.parsedOutput = this.parsedOutput.bind(this);
        
        //FOR LOGGING DATA
        this.log = [[]];

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
    handleStorySelection (key, e) {
        this.addToResult(e.target.innerText);
        this.log[this.state.curSegment][this.state.curPhase] = key;
        this.setState({curPhase: this.state.curPhase += 1});
    }

    handleNextSegment (e) {
        this.log.push([]);
        this.setState({curPhase: 0, curSegment: this.state.curSegment += 1});
        this.createInputs();
    }
    
    segmentDisplay() {
        return this.state.snippetData.pipeline[this.state.curSegment];
    }

    snippetDisplay() {
        var snippetsForPhase = this.state.snippetData.data[this.state.curSegment] || [];
        snippetsForPhase = snippetsForPhase.filter((snippetObj) => Number(snippetObj['order']) === this.state.curPhase);
        return snippetsForPhase;
    }

    //CODE FOR NEW SNIPPET INPUTS

    handleNewSnippetChange(e) {
        this.setState({inputSnippet:e.target.value});
    }

    handleSnippetSubmission() {
        var data = {
            segment: this.state.snippetData.pipeline[this.state.curSegment],
            order: String(this.state.curPhase),
            text: this.state.inputSnippet,
            scenario: 'coverLetter',
        }
        this.addToResult(this.state.inputSnippet);
        this.log[this.state.curSegment][this.state.curPhase] = 'New Input';
        this.setState({curPhase: this.state.curPhase += 1});
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
        console.log(this.log);
        fetch('/endTemplate', {
            body: JSON.stringify({feedback:this.log, id: this.state.snippetData.template_id}), // must match 'Content-Type' header
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
        return parsedOutput;
    }
    
    render() {
        //<Button onClick={this.handleMoreSnippets}>More Snippets</Button>
        return (
            <div id='template-form-container'>
                <Display segment={this.segmentDisplay()} snippets={this.snippetDisplay()} handleSnippetClick={this.handleStorySelection} />
                <TextArea id='template-new-snippet-box' onChange={this.handleNewSnippetChange} autoHeight style={{ minHeight: 18.85,}} placeholder='Or create your own snippet here (use ${abc} format for variables' value={this.state.inputSnippet}></TextArea>
                <Button onClick={this.handleNextSegment}>Next Segment</Button>

                <Button onClick={this.handleSnippetSubmission}>Create Snippet</Button>
                <Button onClick={this.parsedOutput}>Parse Output</Button> 
                <UserInput handleInputs={this.handleInputs} inputResults={this.state.inputResults} inputsRequired={this.state.requiredInputs} />
                <TextArea id='template-form-output-box' autoHeight style={{ minHeight: 100, }} placeholder='Your document outputs here!' value={this.state.result}></TextArea>
            </div>
        )

    }
}

export default TemplateForm;