import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [SearchValue, setSearchValue] = useState('');

  useEffect(() => {
    // fetch("https://624e660953326d0cfe5ac0b5.mockapi.io/items").then((res)=>{
    //   return res.json();
    // }).then(json=>{
    // setItems(json);
    //  });
    axios.get("https://624e660953326d0cfe5ac0b5.mockapi.io/items").then((res) => { setItems(res.data) });
    axios.get("https://624e660953326d0cfe5ac0b5.mockapi.io/favorites").then((res) => { setFavorites(res.data) });
    axios.get("https://624e660953326d0cfe5ac0b5.mockapi.io/cart").then((res) => { setCartItems(res.data) });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://624e660953326d0cfe5ac0b5.mockapi.io/cart", obj);
    setCartItems([...CartItems, obj]);
    console.log(CartItems);
  }


  const onAddToFavorites = (obj) => {
    axios.post("https://624e660953326d0cfe5ac0b5.mockapi.io/favorites", obj);
    setFavorites([...favorites, obj]);
    console.log(favorites);
  }



  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }


  const onRemoveItem = (id) => {
    axios.delete(`https://624e660953326d0cfe5ac0b5.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }


  return (
    <div className="wrapper clear">
      {openCart ? <Drawer onClosecart={() => setOpenCart(false)} items={CartItems} onRemove={onRemoveItem} /> : null}
      <Header onClickcart={() => setOpenCart(true)} />
      <Routes>
        <Route path="/" element={<Home
          SearchValue={SearchValue}
          onChangeSearchInput={onChangeSearchInput}
          setSearchValue={setSearchValue}
          items={items}
          onAddToFavorites={onAddToFavorites}
          onAddToCart={onAddToCart}
        /> }/>
      </Routes>
      <Routes>
        <Route path="/favorites" element={<Favorites
        favorites={favorites}/> }/>

      </Routes>
    </div>
  )
}


export default App;
