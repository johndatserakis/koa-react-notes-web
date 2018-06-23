import React from 'react';
import { connect } from 'react-redux';
import { Container, Flex, Box } from 'theme/Grid'

const mapStateToProps = (state, props) => {
    return {
        user: state.user.user
    }
}

class Home extends React.Component {
    render() {
        return (
            <Container>
                <Flex>
                    <Box width={1} py={4}>
                        <h1><strong>Home</strong></h1>
                        <p>Note: Not yet fully functional. Please stand by. Vist <a href="https://koa-vue-notes-web.innermonkdesign.com/">https://koa-vue-notes-web.innermonkdesign.com/</a> for a working Vue version.</p>
                        <p>Here will be a check to see if you are currently logged in and your user info.</p>

                        {this.props.user
                            ? <p>{this.props.user.username}</p>
                            : <p>Hmm, doesn't look like you're logged in...</p>

                        }

                        <p><i className="fa fa-info-circle fa-fw"></i> This is a simple SPA built using Koa (2.5.1) as the backend and React (2.5.16) as the frontend. If you don't want to create an account you can just use demousername and demopassword to login to the app.</p>

                        <p>
                            <a href="https://github.com/johndatserakis/koa-react-notes-web" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/frontend--social.svg?style=social" alt="" /></a>
                            <a href="https://twitter.com/intent/tweet?text=Check+out+this+project+on+GitHub:+https://github.com/johndatserakis/koa-react-notes-web&url=%5Bobject%20Object%5D" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-react-notes-web.svg?style=social" alt="" /></a>
                            <a href="https://raw.githubusercontent.com/johndatserakis/koa-react-notes-web/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="" /></a>
                            <a href="https://github.com/johndatserakis/koa-react-notes-web/stargazers" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/stars/johndatserakis/koa-react-notes-web.svg" alt="" /></a>
                            <a href="https://github.com/johndatserakis/koa-react-notes-web/network" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/forks/johndatserakis/koa-react-notes-web.svg" alt="" /></a>
                        </p>

                        <p>
                            <a href="https://github.com/johndatserakis/koa-vue-notes-api" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Backend--social.svg?style=social" alt="" /></a>
                            <a href="https://twitter.com/intent/tweet?text=Check+out+this+project+on+GitHub:+https://github.com/johndatserakis/koa-vue-notes-api&url=%5Bobject%20Object%5D" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-vue-notes-api.svg?style=social" alt="" /></a>
                            <a href="https://raw.githubusercontent.com/johndatserakis/koa-vue-notes-api/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="" /></a>
                            <a href="https://github.com/johndatserakis/koa-vue-notes-api/stargazers" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/stars/johndatserakis/koa-vue-notes-api.svg" alt="" /></a>
                            <a href="https://github.com/johndatserakis/koa-vue-notes-api/network" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/forks/johndatserakis/koa-vue-notes-api.svg" alt="" /></a>
                        </p>
                    </Box>
                </Flex>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(Home);