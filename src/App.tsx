import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "@/assets/css/app.scss";

// Partials
import { Nav } from "@/components/Partials/Main/Nav";
import { Footer } from "@/components/Partials/Main/Footer";

// Layouts
import { Home } from "@/components/Layouts/Pages/Home";

// // User
// import Login from './components/User/Login'
// import Signup from './components/User/Signup'
// import Forgot from './components/User/Forgot'
// import Reset from './components/User/Reset'

// // Program
// import Dashboard from './components/Program/Dashboard'
// import CreateNote from './components/Program/CreateNote'
// import EditNote from './components/Program/EditNote'


import { Layout } from "antd";

const { Content } = Layout;


// import { Counter } from "@/components/Partials/Components/counter/Counter"

function App() {
  return (
    <Router>
      {/* <div>
        1Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad tenetur, nihil asperiores adipisci quasi nam atque! A magni blanditiis provident soluta odio modi distinctio odit, tenetur dicta? Fugit, ratione dolor.
        <Counter />
      </div>
      <hr /> */}

      <Layout style={{ height: "100vh" }}>
        <Nav />
        <Content style={{ padding: "50px" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path='/user/login' component={Login} />
              <Route path='/user/signup' component={Signup} />
              <Route path='/user/forgot' component={Forgot} />
              <Route path='/user/reset' component={Reset} />
              <Route path="/dashboard" render={() => (
                <Dashboard />
                // (this.props.user) ? <Dashboard /> : <Redirect to="/" />
              )} />
              <Route path="/create-note" render={() => (
                <CreateNote />
                // (this.props.user) ? <CreateNote /> : <Redirect to="/" />
              )} />
              <Route path="/edit-note" render={() => (
                <EditNote />
                // (this.props.user) ? <EditNote /> : <Redirect to="/" />
              )} /> */}
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
