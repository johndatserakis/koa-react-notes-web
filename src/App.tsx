import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "@/assets/css/app.scss";
import { useSelector, useDispatch } from "react-redux";
import { UserShort, UserThunkDispatch } from "@/store/user/types";
import { setUserAndTokens } from "@/store/user/actions";
import { runAxiosAuthInterceptor } from "@/common/program/axiosAuthInterceptor";
import { getNotes } from "@/store/note/actions";

// Partials
import { Nav } from "@/components/Partials/Main/Nav";
import { Footer } from "@/components/Partials/Main/Footer";

// Layouts
import { Home } from "@/components/Layouts/Pages/Home";

// // User
import { Login } from "@/components/User/Login";
import { Signup } from "@/components/User/Signup";
import { Forgot } from "@/components/User/Forgot";
import { Reset } from "@/components/User/Reset";

// // Program
import { Dashboard } from "@/components/Layouts/Program/Dashboard";
import { CreateNote } from "@/components/Layouts/Program/CreateNote";
import { EditNote } from "@/components/Layouts/Program/EditNote";
import { useToasts } from "react-toast-notifications";

export const App = () => {
  const user = useSelector((state: { user: UserShort }) => state.user);
  const dispatch = useDispatch<UserThunkDispatch>();
  const { addToast } = useToasts();

  const attachAxiosInterceptor = async () => {
    try {
      await dispatch(runAxiosAuthInterceptor());
    } catch (error) {
      console.log(error);
      addToast(
        "Hmm, there was an error retrieving your data. Please refresh the page and try again.",
        {
          appearance: "error",
        },
      );
    }
  };

  const checkUserStatus = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken != null && refreshToken != null) {
        await dispatch(setUserAndTokens({ accessToken, refreshToken }));
        await dispatch(
          getNotes({ sort: "", order: "desc", page: 0, limit: 1000 }),
        );
      }
    } catch (error) {
      console.log(error);
      addToast(
        "Hmm, there was an error retrieving your data. Please refresh the page and try again.",
        {
          appearance: "error",
        },
      );
    }
  };

  // Grab state on app load if possible
  useEffect(() => {
    attachAxiosInterceptor();
    checkUserStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="page-wrapper">
        <Nav />
        <div className="main-content-wrapper" role="main" aria-label="Main">
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/user/login" component={Login} />
            <Route path="/user/signup" component={Signup} />
            <Route path="/user/forgot" component={Forgot} />
            <Route path="/user/reset" component={Reset} />

            <Route
              path="/dashboard"
              render={() => (user ? <Dashboard /> : <Redirect to="/" />)}
            />
            <Route
              path="/create-note"
              render={() => (user ? <CreateNote /> : <Redirect to="/" />)}
            />
            <Route
              path="/edit-note"
              render={() => (user ? <EditNote /> : <Redirect to="/" />)}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
