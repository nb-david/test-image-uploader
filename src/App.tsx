import React from "react";
import ImageUploader from "./components/ImageUploader";

import "./App.css";

export const App = () => (
  <div className="upload-cover">
    <ImageUploader type="circle" onUpload={() => console.log("few")} />
  </div>
);
