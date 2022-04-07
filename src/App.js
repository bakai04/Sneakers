import React, {useState,useEffect} from "react";
import Cards from "./components/Cards"
import Header from "./components/Header"
import Drawer from "./components/Drawer";

function App() {
  const [openCart, setOpenCart]=useState(false);
  const [items, setItems]=useState([]);
  const [CartItems, setCartItems]=useState([]);  
  
  
  useEffect(()=>{
    fetch("https://624e660953326d0cfe5ac0b5.mockapi.io/items").then((res)=>{
      return res.json();
    }).then(json=>{
    setItems(json);
    });
  },[]);

const onAddToCart=(obj)=>{
  setCartItems([...CartItems, obj]);
  console.log(CartItems);
}
  return(
<div className="wrapper clear">
  {openCart ? <Drawer onClosecart={()=>setOpenCart(false)} items={CartItems}/>: null}
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
      {items.map((item, index) => (
        <Cards
          title={item.title}
          price={item.price}
          imgUrl={item.imgUrl}
          onFavorite={() => console.log('Добавили в закладки')}
          onPlus={(obj) => (onAddToCart(obj))}
        />
      ))}
    </div>
  </div>
</div>
)}



export default App;
