import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Input, Button} from 'semantic-ui-react'
import InputSnippet from './components/inputSnippet.jsx';
import TemplateForm from './components/templateForm.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Header>ITS THE TEMPLATE</Header>
                <InputSnippet />
                <TemplateForm />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));