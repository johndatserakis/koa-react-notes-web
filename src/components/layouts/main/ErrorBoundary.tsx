import React from "react";
import { FallbackProps } from "react-error-boundary";

export const ErrorBoundaryComponent = ({
  componentStack,
  error,
}: FallbackProps) => (
  <div style={{ padding: "2rem" }}>
    <p>
      <strong>Sorry, but there was an error displaying the page.</strong>
    </p>
    <p>Please refresh the page and try again.</p>
    <hr />
    <p>Here’s what we know…</p>
    <p>
      <strong>Error:</strong> {error ? error.toString() : undefined}
    </p>
    <p>
      <strong>Stacktrace:</strong> {componentStack}
    </p>
  </div>
);
