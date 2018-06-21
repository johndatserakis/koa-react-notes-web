import React from 'react';
import { Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components';
import { themeMain } from 'theme/global'

// Partials
import Nav from './components/Partials/Nav'
import Footer from './components/Partials/Footer'

// Layouts
import Home from './components/Layouts/Home'

// User
import Login from './components/User/Login'
import Signup from './components/User/Signup'
import Forgot from './components/User/Forgot'
import Reset from './components/User/Reset'

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PageWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const MainWrapper = styled.div`
    flex: 1 0 auto;
`;

class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            theme: themeMain
        }
    }

    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
                <PageWrapper>
                    <Nav />
                        <MainWrapper>
                            <Switch>
                                <Route exact path='/' component={Home}/>

                                <Route path='/user/login' component={Login}/>
                                <Route path='/user/signup' component={Signup}/>
                                <Route path='/user/forgot' component={Forgot}/>
                                <Route path='/user/reset' component={Reset}/>
                            </Switch>
                        </MainWrapper>
                    <Footer />
                    <ToastContainer />
                </PageWrapper>
            </ThemeProvider>
        );
    }
}

export default App
