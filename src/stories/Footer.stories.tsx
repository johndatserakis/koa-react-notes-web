import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Footer } from "../components/partials/main/Footer";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Footer",
  decorators: [withKnobs],
};

export const MainFooter = () => {
  return (
    <div>
      <Footer />
    </div>
  );
};
