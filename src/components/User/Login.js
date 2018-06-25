import React from 'react';
import { Button, Input, UserActionPanel } from 'theme/global'
import { Container, Flex, Box } from 'theme/Grid'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import { userActionLogin } from 'store/actions/userActions';
import { getNotes } from 'store/actions/notesActions';
const mapActionsToProps = { userActionLogin, getNotes };
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

    async handleSubmit(event) {
        event.preventDefault()
        try {
            await this.props.userActionLogin({
                username: this.state.username,
                password: this.state.password
            })
            toast.success('Logged in.');

            // Ok, here we have to load any program data because the
            // user wasn't loggen in at first
            await this.props.getNotes({
                sort: '',
                order: 'desc',
                page: 0,
                limit: 10000 // turning off paging for now
            })

            this.props.history.push('/dashboard')
        } catch (error) {
            toast.error('Hmm, those details don\'t seem right.');
        }
    }

    render() {
        return (
            <Container>
                <Flex>
                    <Box width={[1, 1/2]} mx="auto" py={4}>
                        <UserActionPanel>
                            <h1>Login</h1>

                            <form onSubmit={this.handleSubmit}>
                                <label>Username</label>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder=" "
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    required
                                />

                                <label>Password</label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder=" "
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    required
                                />

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
