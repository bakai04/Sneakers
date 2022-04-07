import React, {useState,useEffect} from "react";
import axios from "axios";
import Cards from "./components/Cards"
import Header from "./components/Header"
import Drawer from "./components/Drawer";

function App() {
  const [openCart, setOpenCart]=useState(false);
  const [items, setItems]=useState([]);
  const [CartItems, setCartItems]=useState([]);  
  const [SearchValue, setSearchValue]=useState('');
  
  useEffect(()=>{
    // fetch("https://624f0d528c5bf4a10545be01.mockapi.io/item").then((res)=>{
    //   return res.json();
    // }).then(json=>{
    // setItems(json);
    //  });
    axios.get("https://624f0d528c5bf4a10545be01.mockapi.io/item").then((res)=>{setItems(res.data)})
    axios.get("https://624f0d528c5bf4a10545be01.mockapi.io/cart").then((res)=>{setCartItems(res.data)})
  },[]);

const onAddToCart=(obj)=>{
  axios.post("https://624f0d528c5bf4a10545be01.mockapi.io/cart", obj);
  setCartItems([...CartItems, obj]);
}
const onChangeSearchInput=(event)=>{
  setSearchValue(event.target.value);
}
  return(
<div className="wrapper clear">
  {openCart ? <Drawer onClosecart={()=>setOpenCart(false)} items={CartItems}/>: null}
  <Header onClickcart={()=>setOpenCart(true)} />
<div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{SearchValue ? `Поиск по запросу:${SearchValue}` : `Все кроссовки`} </h1>
          <div className="search-block d-flex align-center">
            <img src="/img/Vector.svg" alt="Search" />
            <input onChange={onChangeSearchInput} value={SearchValue}  placeholder="Поиск..." />
            {SearchValue && <img onClick={()=>(setSearchValue(""))} className="removeBtn" width={11} height={11} src="/img/remove.png" alt="Remove" />}
          </div>
        </div>
    <div className="d-flex flex-wrap">
      {items.filter((items)=>items.title.toLowerCase().includes(SearchValue.toLowerCase()))
        .map((item, index) => (
        <Cards
          title={item.title}
          price={item.price}
          imgUrl={item.imgUrl}
          onFavorite={() => console.log('Добавили в закладки')}
          onPlus={(obj) => (onAddToCart(obj))}
          key={index}
        />
      ))}
    </div>
  </div>
</div>
)}



export default App;
