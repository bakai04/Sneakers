import React from "react";
import Card from "./components/Cards"
import Header from "./components/Header"
import Drawer from "./components/Drawer"
function App() {
  return(
<div className="wrapper">
    <Drawer />
<Header />
  <div className="content p-40">
    <h1 className="mb-40">Все кроссовки</h1>
    <div className="d-flex">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</div>
)}
export default App;
