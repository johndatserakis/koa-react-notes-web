import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "@/assets/css/app.scss";
import { useDispatch, useSelector } from "react-redux";
import { JwtDecodeData } from "@/store/user/types";
import { setUser } from "@/store/user/actions";
import { runAxiosAuthInterceptor } from "@/common/program/axiosAuthInterceptor";
import { useToasts } from "react-toast-notifications";
import { RootState, GeneralThunkDispatch } from "@/store";
import { getNotes } from "@/store/note/actions";
import { Nav } from "@/components/Partials/Main/Nav";
import { Footer } from "@/components/Partials/Main/Footer";
import { Home } from "@/components/Layouts/Pages/Home";
import { Login } from "@/components/User/Login";
import { Signup } from "@/components/User/Signup";
import { Forgot } from "@/components/User/Forgot";
import { Reset } from "@/components/User/Reset";
import { Dashboard } from "@/components/Layouts/Program/Dashboard";
import { CreateNote } from "@/components/Layouts/Program/CreateNote";
import { EditNote } from "@/components/Layouts/Program/EditNote";
import jwtDecode from "jwt-decode";

export const App = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<GeneralThunkDispatch>();
  const { addToast } = useToasts();
  const [isLoadingInitialAppState, setIsLoadingInitialAppState] = useState(
    true,
  ); // Init true
  const [ranInitialUserCheck, setRanInitialUserCheck] = useState(false);

  // Sometimes your app with need to run some actions on page refresh. In this
  // app, we want any possible Notes for the user added on load.
  const loadProgramData = async () => {
    try {
      await dispatch(
        getNotes({ sort: "", order: "desc", page: 0, limit: 1000 }),
      );
    } catch (error) {
      Promise.reject(error);
    }
  };

  // Check for a possible user...
  const checkUserStatus = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken != null && refreshToken != null) {
        const decoded: JwtDecodeData = jwtDecode(accessToken);
        dispatch(setUser(decoded.data));
      }
      return Promise.resolve();
    } catch (error) {
      addToast(
        "Hmm, there was an error retrieving your data. Please refresh the page and try again.",
        {
          appearance: "error",
        },
      );
    } finally {
      setIsLoadingInitialAppState(false);
    }
  };

  // Two important things here, attach our axios interceptor and check for user
  useEffect(() => {
    runAxiosAuthInterceptor();
    checkUserStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // If we haven't checked for the user yet and the app is done loading,
    // then check for the user and load their program data if needed.
    if (!ranInitialUserCheck && !isLoadingInitialAppState) {
      if (user.id) {
        loadProgramData();
        setRanInitialUserCheck(true);
      }
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // The logic here is that if we are loading the initial app state and
  // haven't checked for a user yet, let's just show a blank page. Otherwise,
  // show the home page, but take care to only allow traveling to user links
  // when a user is logged in.
  return isLoadingInitialAppState && !ranInitialUserCheck ? (
    <div />
  ) : (
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

            <Route path="/dashboard">
              {user.id ? <Dashboard /> : <Redirect to="/123" />}
            </Route>
            <Route path="/create-note">
              {user.id ? <CreateNote /> : <Redirect to="/" />}
            </Route>
            <Route path="/edit-note/:id">
              {user.id ? <EditNote /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
