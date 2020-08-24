import React from "react";
import ImageUploader from "./components/ImageUploader";

import data from "./data";

const App = () => (
  <>
    <ImageUploader {...data.ImageUploader} />
  </>
);

export default App;
