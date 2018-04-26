import React from 'react';
import ReactDOM from 'react-dom';
import {Input, TextArea} from 'semantic-ui-react'

class UserInput extends React.Component {
    constructor(props) {
        super();
    }

    bindCurrentInput(index, event) {
        this.props.handleInputs(index, event);
    }

    render() {
        return (
            <div id='template-form-user-input'>
                {
                    this.props.inputsRequired.map(singleInput => {
                        return (
                            <Input type='text' onChange={this.bindCurrentInput.bind(this, singleInput)} value={this.props.inputResults[singleInput]} placeholder={singleInput.slice(2,-1)} key={'user-input' + singleInput} className={'user-input-input'}/>
                        )
                    })
                }
            </div>
        )
    }
    
}

export default UserInput;