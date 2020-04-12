import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import "@/assets/css/app.scss";
import { useDispatch, useSelector } from "react-redux";
import { UserThunkDispatch } from "@/store/user/types";
import { setUserAndTokens } from "@/store/user/actions";
import { runAxiosAuthInterceptor } from "@/common/program/axiosAuthInterceptor";
import { useToasts } from "react-toast-notifications";
import { RootState } from "@/store";
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

export const App = () => {
  const user = useSelector((state: RootState) => state.user.user);
  // const isLoggedIn = !!user.id;
  const dispatch = useDispatch<UserThunkDispatch>();
  const { addToast } = useToasts();
  const [isLoadingInitialAppState, setIsLoadingInitialAppState] = useState(
    false,
  );

  async function checkUserStatus() {
    console.log("checkUserStatus init");
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
      console.log("checkUserStatus error", error.message);
      addToast(
        "Hmm, there was an error retrieving your data. Please refresh the page and try again.",
        {
          appearance: "error",
        },
      );
    }
  }

  // Grab state on app load if possible
  useEffect(() => {
    setIsLoadingInitialAppState(true);
    runAxiosAuthInterceptor();
    checkUserStatus();
    setIsLoadingInitialAppState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return <div>Loading..1</div>;

  return isLoadingInitialAppState ? (
    <div>Loading...</div>
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
              <Dashboard />
              {/* {isLoggedIn ? <Dashboard /> : <Redirect to="/123" />} */}
            </Route>
            <Route path="/create-note">
              <CreateNote />
              {/* {isLoggedIn ? <CreateNote /> : <Redirect to="/" />} */}
            </Route>
            <Route path="/edit-note/:id">
              <EditNote />
              {/* {isLoggedIn ? <EditNote /> : <Redirect to="/" />} */}
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
