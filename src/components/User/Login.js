import React from 'react';
import { Button, Input, UserActionPanel } from 'theme/global'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-5">

                        <UserActionPanel>
                            <h1>Login</h1>

                            <form onSubmit={this.handleSubmit}>
                                <label>Username</label>
                                <Input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />

                                <label>Password</label>
                                <Input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />

                                <Button styleType="green" className="mt-2 w-100" type="submit" value="Submit">Login</Button>
                            </form>
                        </UserActionPanel>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;