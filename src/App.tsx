import React from "react";
import ImageUploader from "./components/ImageUploader";

import "./App.css";

interface AppProps {
  type: string;
  onUpload: () => void;
  image?: string;
  outputWidth?: number;
  outputHeight?: number;
}

const App = (props: AppProps) => <ImageUploader {...props} />;

export default App;
