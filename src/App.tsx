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
import { setUser } from "@/store/user/actions-store";
import { runAxiosAuthInterceptor } from "@/common/axios-auth-interceptor";
import { useToasts } from "react-toast-notifications";
import { RootState, GeneralThunkDispatch } from "@/store";
import { Nav } from "@/components/partials/main/Nav";
import { Footer } from "@/components/partials/main/Footer";
import { NotFound } from "@/components/layouts/main/NotFound";
import { Maintenance } from "@/components/layouts/main/Maintenance";
import { Home } from "@/components/layouts/pages/Home";
import { Login } from "@/components/user/components/Login";
import { Signup } from "@/components/user/components/Signup";
import { Forgot } from "@/components/user/components/Forgot";
import { Reset } from "@/components/user/components/Reset";
import { Dashboard } from "@/components/layouts/program/Dashboard";
import { CreateNote } from "@/components/layouts/program/CreateNote";
import { EditNote } from "@/components/layouts/program/EditNote";
import jwtDecode from "jwt-decode";
import GAListener from "@/common/ga-listener";

export const App = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<GeneralThunkDispatch>();
  const { addToast } = useToasts();
  const [isLoadingAppState, setIsLoadingAppState] = useState(true);
  const [ranInitialUserCheck, setRanInitialUserCheck] = useState(false);

  // Sometimes your app with need to run some actions on page refresh.
  // Right now we're going to load the base notes in the dashboard instead
  // const loadProgramData = async () => {};

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
      setIsLoadingAppState(false);
    }
  };

  // Two important things here, attach our axios interceptor and check for user
  useEffect(() => {
    runAxiosAuthInterceptor();
    checkUserStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // If we haven't checked for the user yet, and the app is done loading,
    // then check for the user and run loadProgramData if needed.
    if (!ranInitialUserCheck && !isLoadingAppState && user.id) {
      // loadProgramData();
      setRanInitialUserCheck(true);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Array of paths where we don't want to show the nav and footer
  const metaPaths = ["/maintenance"];

  // The logic here is that if we are loading the initial app state and
  // haven't checked for a user yet, let's just show a blank page. Otherwise,
  // show the home page, but take care to only allow traveling to user links
  // when a user is logged in.
  return isLoadingAppState && !ranInitialUserCheck ? (
    <div />
  ) : (
    <Router>
      <GAListener trackingId={process.env.REACT_APP_GA_TRACKING_ID}>
        <div className="page-wrapper">
          {!metaPaths.includes(window.location.pathname) && <Nav />}
          <div className="main-content-wrapper" role="main" aria-label="Main">
            <Switch>
              <Route path="/user/login">
                <Login />
              </Route>
              <Route path="/user/signup">
                <Signup />
              </Route>
              <Route path="/user/forgot">
                <Forgot />
              </Route>
              <Route path="/user/reset">
                <Reset />
              </Route>

              <Route path="/dashboard">
                {user.id ? <Dashboard /> : <Redirect to="/" />}
              </Route>
              <Route path="/create-note">
                {user.id ? <CreateNote /> : <Redirect to="/" />}
              </Route>
              <Route path="/edit-note/:id">
                {user.id ? <EditNote /> : <Redirect to="/" />}
              </Route>

              <Route exact path="/maintenance">
                <Maintenance />
              </Route>

              <Route exact path="/">
                <Home />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
          {!metaPaths.includes(window.location.pathname) && <Footer />}
        </div>
      </GAListener>
    </Router>
  );
};
