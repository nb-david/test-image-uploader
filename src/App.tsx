import React from "react";
import ImageUploader from "./components/ImageUploader";
import { default as Upload, RcFile } from "antd/lib/upload";

export const App = () => (
  <h1>
    Hello React
    <ImageUploader type="circle" onUpload={() => console.log("few")} />
  </h1>
);
