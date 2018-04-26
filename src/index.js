import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button, Menu} from 'semantic-ui-react'
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
        this.setState({chosenScenario: e.target.innerText});
    }

    handleLinkedInLogIn (e) {

    }

    render() {
        var content;
        if (!this.state.chosenScenario) {
            content = (
                    <div>
                        <script type="in/Login"></script>
                        <Header>What do you need?</Header>
                        <Menu>
                            {
                                this.state.scenarios.map(scenario => {
                                    return (
                                        <Menu.Item onClick={this.handleScenarioSelection}>{scenario}</Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </div>
                )
        } else {
            content = (
                <TemplateForm scenario={this.state.chosenScenario} />
            )
        }
        return (
            <div className="content">
                {content}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));