import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button} from 'semantic-ui-react'

class App extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Input></Input>
                <Button>Submit</Button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));