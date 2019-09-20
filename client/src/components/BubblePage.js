import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
      console.log("colorlist", colorList)

  useEffect(()=>{
    axiosWithAuth()
    .get("/colors")
    .then(res =>{
      console.log("response from use effect bubblespage", res.data);
      setColorList(res.data)
    })
  }, [])//need dep array to stop loop.

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
