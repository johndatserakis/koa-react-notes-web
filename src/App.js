import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { setUserAndTokens } from 'store/actions/userActions';
import { getNotes } from 'store/actions/notesActions';

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

// Program
import Dashboard from './components/Program/Dashboard'
import CreateNote from './components/Program/CreateNote'
import EditNote from './components/Program/EditNote'

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

// Store actions and props
const mapActionsToProps = { setUserAndTokens, getNotes };
const mapStateToProps = (state, props) => {
    return {
        user: state.user.user
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        // Check and set the user
        await this.checkUserStatus()

        // Here we'll want to any data that's needed if
        // the user is logged in.
        if (this.props.user) {
            await this.loadProgramData()
        }
        this.setState({loading: false})
    }

    async checkUserStatus() {
        let accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
        let refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null
        if (accessToken) {
            await this.props.setUserAndTokens({accessToken: accessToken, refreshToken: refreshToken})
        }
        return Promise.resolve()
    }

    async loadProgramData() {
        try {
            await this.props.getNotes({
                sort: '',
                order: 'desc',
                page: 0,
                limit: 10000 // turning off paging for now
            })
        } catch (error) {
            console.log('here in error')
            // Dont' handle error here
        }
    }

    render() {
        if (this.state.loading) {
            return ''
        }

        return (
            <ThemeProvider theme={themeMain}>
                <PageWrapper>
                    <Nav />
                        <MainWrapper>
                            <Switch>
                                <Route exact path='/' component={Home}/>

                                <Route path='/user/login' component={Login}/>
                                <Route path='/user/signup' component={Signup}/>
                                <Route path='/user/forgot' component={Forgot}/>
                                <Route path='/user/reset' component={Reset}/>

                                <Route path="/dashboard" render={() => (
                                    (this.props.user) ? <Dashboard /> : <Redirect to="/" />
                                )}/>
                                <Route path="/createNote" render={() => (
                                    (this.props.user) ? <CreateNote /> : <Redirect to="/" />
                                )}/>
                                <Route path="/editNote" render={() => (
                                    (this.props.user) ? <EditNote /> : <Redirect to="/" />
                                )}/>
                            </Switch>
                        </MainWrapper>
                    <Footer />
                    <ToastContainer hideProgressBar={true} autoClose={2500} />
                </PageWrapper>
            </ThemeProvider>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
