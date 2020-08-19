import React from "react";
import ImageUploader from "./components/ImageUploader";

import "./App.css";

interface AppProps {
  type: string;
  onUpload: () => void;
  image: string;
}

const App = ({ type, onUpload, image }: AppProps) => (
  <div className="upload-cover-component">
    <ImageUploader type={type} onUpload={onUpload} image={image} />
    <div className="upload-cover-illustrate">
      <div>Tap to add an image</div>
      <span>Picture size should not exceed 5M</span>
    </div>
  </div>
);

export default App;
