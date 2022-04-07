import React, {useState,useEffect} from "react";
import Card from "./components/Cards"
import Header from "./components/Header"
import Drawer from "./components/Drawer";

function App() {
  const [openCart, setOpenCart]=useState(false);
  const [items, setItems]=useState([]);
  const [CartItem, setCartItem]=useState([]);  
  let arr=[];
  
  
  useEffect(()=>{
    fetch("https://624e660953326d0cfe5ac0b5.mockapi.io/items").then((res)=>{
      return res.json();
    }).then(json=>{
    setItems(json);
    });
  },[]);



  return(
<div className="wrapper clear">
  {openCart ? <Drawer onClosecart={()=>setOpenCart(false)}CartItem={CartItem}/>: null}
  <Header onClickcart={()=>setOpenCart(true)} />
<div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/Vector.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
    <div className="d-flex flex-wrap">
      {items.map((obj, index) => (
        <Card 
          title={obj.title}
          price={obj.price}
          imgUrl={obj.imgUrl}
          key={index}
          onClickFavorite={()=>console.log("df")}
          onClickPlus={()=>{
            // arr=[...arr, obj];
            setCartItem([...CartItem, obj]);
          }}
        />
      ))}
    </div>
  </div>
</div>
)}



export default App;
