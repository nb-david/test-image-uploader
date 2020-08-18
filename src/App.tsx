import React from "react";
import ImageUploader from "./components/ImageUploader";

import "./App.css";

const App = () => (
  <div className="upload-cover">
    <ImageUploader type="circle" onUpload={() => console.log("few")} />
  </div>
);

export default App;