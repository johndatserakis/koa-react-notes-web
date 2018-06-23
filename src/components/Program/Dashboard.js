import React from 'react';
import { connect } from 'react-redux';
const mapStateToProps = (state, props) => {
    return {
        user: state.user.user
    }
}

class Dashboard extends React.Component {
    componentDidMount() {
        // console.log(this.props.user)
    }

    render() {
        return (
            <div>Dashboard</div>
        );
    }
}

export default connect(mapStateToProps)(Dashboard);