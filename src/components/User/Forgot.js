import React from 'react';
import { Button, Input, UserActionPanel } from 'theme/global'
import { Container, Flex, Box } from 'theme/Grid'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import { userActionForgot } from 'store/actions/userActions';
const mapActionsToProps = { userActionForgot };
const mapStateToProps = (state, props) => {
    return {
        user: state.user
    }
}

class Forgot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            url: process.env.REACT_APP_URL + '/user/reset',
            type: 'web'
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        event.preventDefault()
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
            await this.props.userActionForgot({
                email: this.state.email,
                url: process.env.REACT_APP_URL + '/user/reset',
                type: 'web'
            })
            toast.success('Please check your email address.');
            this.props.history.push('/')
        } catch (error) {
            toast.success('Please check your email address.');
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <Container>
                <Flex>
                    <Box width={[1, 1/2]} mx="auto" py={4}>
                        <UserActionPanel>
                            <h1>Forgot</h1>

                            <form onSubmit={this.handleSubmit}>
                                <label>Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    required
                                />

                                <Button styleType="green" className="mt-2 w-100" type="submit" value="Submit">Forgot</Button>
                            </form>
                        </UserActionPanel>
                    </Box>
                </Flex>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Forgot);
