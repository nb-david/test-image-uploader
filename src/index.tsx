import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App type="cirle" onUpload={() => console.log("few")} image={"https://i.prt.news/t_200_200_0e9553da66d38b0bb746ef830ec04867.jpeg"} />, document.getElementById("root"));
