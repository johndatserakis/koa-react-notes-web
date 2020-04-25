// https://github.com/react-ga/react-ga/issues/122#issuecomment-521781395

import { useEffect } from "react";
import ReactGA from "react-ga";
import { withRouter, RouteComponentProps } from "react-router";
import { Location, LocationListener, UnregisterCallback } from "history";

const debug = process.env.NODE_ENV === "development";

const sendPageView: LocationListener = (location: Location): void => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
};

interface Props extends RouteComponentProps {
  children: JSX.Element;
  trackingId?: string;
}
const GAListener = ({ children, trackingId, history }: Props): JSX.Element => {
  useEffect((): UnregisterCallback | void => {
    if (trackingId && !debug) {
      ReactGA.initialize(trackingId);
      sendPageView(history.location, "REPLACE");
      return history.listen(sendPageView);
    }
  }, [history, trackingId]);

  return children;
};

// eslint-disable-next-line import/no-default-export
export default withRouter(GAListener);
