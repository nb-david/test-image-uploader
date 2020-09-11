import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";

import data from "./data";

const App = () => {
  const [image, setImage] = useState("")

  const onUpload = () => {
    console.log("upload");
    setImage("https://i.prt.news/t_200_200_aa8aba69bbf874593fe7bb28265f3f16.blob")
  }

  return (
    <>
      <ImageUploader {...data.ImageUploader} onUpload={onUpload} image={image}>
        <div>Tap to upload an image</div>
        <span>Picture size should not exceed 5Mb</span>
      </ImageUploader>
      <ImageUploader {...data.ImageUploader} className="myClass" coverText="Tap to add" />
    </>
  );
}

export default App;
