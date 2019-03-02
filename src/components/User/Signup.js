import React from 'react';
import { Button, Input, UserActionPanel } from 'theme/global'
import { Container, Flex, Box } from 'theme/Grid'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import { userActionSignup } from 'store/actions/userActions';
const mapActionsToProps = { userActionSignup };
const mapStateToProps = (state, props) => {
    return {
        user: state.user
    }
}

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }

        this.passwordConfirmElement = React.createRef()
        this.passwordElement = React.createRef()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputOnKeyup = this.handleInputOnKeyup.bind(this)
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

    handleInputOnKeyup(event) {
        const target = event.target;
        const name = target.name;

        if (name === 'passwordConfirm' || name === 'password') {
            if (this.state.password !== this.state.passwordConfirm) {
                this.passwordConfirmElement.current.setCustomValidity('Passwords must match.');
            } else {
                this.passwordConfirmElement.current.setCustomValidity('');
            }
        }
    }

    async handleSubmit(event) {
        event.preventDefault()

        let form = document.getElementById('submit-form')

        if (!form.checkValidity()) {
            toast.error('Please complete all fields.')
            return
        }

        try {
            await this.props.userActionSignup({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
            toast.success('Successfully signed up. Please login.');
            this.props.history.push('/user/login')
        } catch (error) {
            console.log(error.message)
            if (!error.message) {
                toast.error('There was an error connecting to the server. Please try again.')
            } else if (error.message === 'DUPLICATE_USERNAME') {
                toast.error('Hmm, that username is already in use. Please try another one.')
            } else if (error.message === 'DUPLICATE_EMAIL') {
                toast.error('Hmm, that email is already in use. Please try another one.')
            } else {
                toast.error('There was an error connecting to the server. Please try again.')
            }
        }
    }

    render() {
        return (
            <Container>
                <Flex>
                    <Box width={[1, 1/2]} mx="auto" py={4}>
                        <UserActionPanel>
                            <h1>Signup</h1>

                            <form onSubmit={this.handleSubmit} id="submit-form">
                                <label>First Name</label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder=" "
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                    required
                                />

                                <label>Last Name</label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder=" "
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                    required
                                />

                                <label>Username</label>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder=" "
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    required
                                />

                                <label>Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    required
                                />

                                <label>Password (Must be at least 8 characters with no spaces.)</label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder=" "
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    onKeyUp={this.handleInputOnKeyup}
                                    required
                                    pattern="\S{8,}"
                                    title="Must be at least 8 characters with no spaces."
                                    ref={this.passwordElement}
                                />

                                <label>Confirm Password</label>
                                <Input
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder=" "
                                    value={this.state.passwordConfirm}
                                    onChange={this.handleInputChange}
                                    onKeyUp={this.handleInputOnKeyup}
                                    ref={this.passwordConfirmElement}
                                    title="Passwords must match."
                                />

                                <Button styleType="green" className="mt-2 w-100" type="submit" value="Submit">Signup</Button>
                            </form>
                        </UserActionPanel>
                    </Box>
                </Flex>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Signup);
