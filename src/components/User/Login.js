import React from 'react';
import { Button, Input, UserActionPanel } from 'theme/global'
import { Container, Flex, Box } from 'theme/Grid'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import { updateUser, userActionLogin } from 'store/actions/userActions';
const mapActionsToProps = {updateUser, userActionLogin};
const mapStateToProps = (state, props) => {
    return {
        user: state.user
    }
}

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
        try {
            this.props.userActionLogin({
                username: this.state.username,
                password: this.state.password
            })
        } catch (error) {
            toast("Wow so easy !");
        }
    }

    render() {
        return (
            <Container>
                <Flex>
                    <Box width={[1, 1/2]} mx="auto" pt={4}>
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
                    </Box>
                </Flex>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);
