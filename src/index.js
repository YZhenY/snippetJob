import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button} from 'semantic-ui-react'
import InputSnippet from './components/inputSnippet.jsx';
import TemplateForm from './components/templateForm.jsx';


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            scenarios: [],
            chosenScenario: undefined,
        }

        this.handleScenarioSelection = this.handleScenarioSelection.bind(this);
    }

    componentDidMount () {
        fetch('/scenarios')
        .then(response => response.json())
        .then(result => this.setState({scenarios:result}))
        .catch(err => console.log(err));
    }

    handleScenarioSelection (e) {
        this.setState({chosenScenario: e.target.value});
    }

    render() {
        return (
            <div>
                <Header>What do you need?</Header>
                    {
                        this.state.scenarios.map(scenario => {
                            return (
                                <Button onClick={this.handleScenarioSelection}>{scenario}</Button>
                            )
                        })
                    }
                <TemplateForm />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));