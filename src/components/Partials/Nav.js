import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { userLogout } from 'store/actions/userActions';

import 'assets/css/navbar.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

const mapActionsToProps = { userLogout };
const mapStateToProps = (state, props) => {
    return {
        user: state.user.user
    }
}

class FullNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    async logoutClicked(e) {
        e.preventDefault()
        try {
            await this.props.userLogout()
            this.props.history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div className="navbar-section">
                <Navbar dark expand="md">
                <Link to="/" className="navbar-brand">
                    <i className="fa fa-sticky-note fa-fw"></i> Koa-React-Notes
                </Link>

                <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>

                        {this.props.user &&
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                </NavItem>
                                <NavItem>
                                    <a href="# " onClick={this.logoutClicked.bind(this)} className="nav-link">Logout</a>
                                </NavItem>
                            </Nav>
                        }

                        {!this.props.user &&
                            <Nav  className="mr-auto" navbar>
                                <NavItem>
                                    <Link to="/user/signup" className="nav-link">Signup</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/user/login" className="nav-link">Login</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/user/forgot" className="nav-link">Forgot</Link>
                                </NavItem>
                            </Nav>
                        }

                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/johndatserakis/koa-vue-notes-web">Web Code Code On GitHub</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/johndatserakis/koa-vue-notes-api">API Code On GitHub</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap"><i className="fa fa-info-circle"></i></NavLink>
                            </NavItem>
                        </Nav>

                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(FullNav));