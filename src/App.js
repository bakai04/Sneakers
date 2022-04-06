import React from "react";
import Card from "./components/Cards"
import Header from "./components/Header"
import Drawer from "./components/Drawer";

const arr = [
  {title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 12999, imgUrl: "/img/boots/1.jpg",},
  {title: "Мужские Кроссовки Nike Air Max 270", price: 15670, imgUrl: "/img/boots/2.jpg",},
  {title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 8499, imgUrl: "/img/boots/3.jpg",},
  {title: "Кроссовки Puma X Aka Boku Future Rider", price: 8999, imgUrl: "/img/boots/4.jpg",}
];
function App() {
  return(
<div className="wrapper">
  <Drawer />
  <Header />
<div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/Vector.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
    <div className="d-flex">
      {arr.map((obj, index) => (
        <Card 
          title={obj.title}
          price={obj.price}
          imgUrl={obj.imgUrl}
          key={index}
          onClick={() => console.log(obj)}
        />
      ))}
    </div>
  </div>
</div>
)}
export default App;
