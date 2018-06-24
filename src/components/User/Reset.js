import React from 'react';
import { Button, Input, UserActionPanel } from 'theme/global'
import { Container, Flex, Box } from 'theme/Grid'
import qs from 'query-string'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import { userActionReset } from 'store/actions/userActions';
const mapActionsToProps = { userActionReset };
const mapStateToProps = (state, props) => {
    return {
        user: state.user
    }
}

class Reset extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            passwordResetToken: qs.parse(this.props.location.search).passwordResetToken,
            email: qs.parse(this.props.location.search).email,
            password: '',
            passwordConfirm: ''
        }

        this.passwordConfirmElement = React.createRef()
        this.passwordElement = React.createRef()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputOnKeyup = this.handleInputOnKeyup.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        if (!qs.parse(this.props.location.search).passwordResetToken || !qs.parse(this.props.location.search).email) {
            toast.error('Hmm, please make sure you followed the correct link to reset your password.')
            this.props.history.push('/')
        }
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

        let form = document.getElementById('reset-form')

        if (!form.checkValidity()) {
            toast.error('Please complete all fields.')
            return
        }

        try {
            await this.props.userActionReset({
                password: this.state.password,
                passwordResetToken: this.state.passwordResetToken,
                email: this.state.email
            })
            toast.success('Successfully reset password. Please login.');
            this.props.history.push('/user/login')
        } catch (error) {
            console.log(error)
            if (!error.message) {
                toast.error('There was an issue resetting your password. Please use the forgot form to recieve another link.')
            } else if (error.message === 'RESET_TOKEN_EXPIRED') {
                toast.error('Your reset link has expired. Please use the forgot form to recieve another link.', { autoClose: 5000 })
            } else {
                toast.error('There was an issue resetting your password. Please use the forgot form to recieve another link.')
            }

        }
    }

    render() {
        return (
            <Container>
                <Flex>
                    <Box width={[1, 1/2]} mx="auto" py={4}>
                        <UserActionPanel>
                            <h1>Reset</h1>

                            <form onSubmit={this.handleSubmit} id="reset-form">
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
                                    innerRef={this.passwordElement}
                                />

                                <label>Confirm Password</label>
                                <Input
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder=" "
                                    value={this.state.passwordConfirm}
                                    onChange={this.handleInputChange}
                                    onKeyUp={this.handleInputOnKeyup}
                                    innerRef={this.passwordConfirmElement}
                                    title="Passwords must match."
                                />

                                <Button styleType="green" className="mt-2 w-100" type="submit" value="Submit">Reset</Button>
                            </form>
                        </UserActionPanel>
                    </Box>
                </Flex>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Reset);
