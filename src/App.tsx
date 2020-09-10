import React from "react";
import ImageUploader from "./components/ImageUploader";

import data from "./data";

const App = () => (
  <>
    <ImageUploader {...data.ImageUploader}>
      <div>Tap to upload an image</div>
      <span>Picture size should not exceed 5Mb</span>
    </ImageUploader>
    <ImageUploader {...data.ImageUploader} className="myClass" coverText="Tap to add" />
  </>
);

export default App;
