import React from "react";
import ImageUploader from "./components/ImageUploader";
import Theme from "./themes";

import data from './data'

const App = () => (
  <Theme>
    <ImageUploader {...data.ImageUploader} />
  </Theme>
);

export default App;
