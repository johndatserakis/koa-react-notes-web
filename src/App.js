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

const PageWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const MainWrapper = styled.div`
    flex: 1 0 auto;
`;

const baseUrl = process.env.PUBLIC_URL;

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
                                <Route exact path={baseUrl + "/"} component={Home}/>

                                <Route path={baseUrl + "/user/login"} component={Login}/>
                                <Route path={baseUrl + "/user/signup"} component={Signup}/>
                                <Route path={baseUrl + "/user/forgot"} component={Forgot}/>
                                <Route path={baseUrl + "/user/reset"} component={Reset}/>
                            </Switch>
                        </MainWrapper>
                    <Footer />
                </PageWrapper>
            </ThemeProvider>
        );
    }
}

export default App;
