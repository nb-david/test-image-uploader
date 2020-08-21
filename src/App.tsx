import React from "react";
import ImageUploader from "./components/ImageUploader";
import Theme from './themes'

interface AppProps {
  type: string;
  onUpload: () => void;
  image?: string;
  outputWidth?: number;
  outputHeight?: number;
}

const App = (props: AppProps) => (
  <Theme>
    <ImageUploader {...props} />
  </Theme>
);

export default App;
