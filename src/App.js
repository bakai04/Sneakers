import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";


function App() {
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [SearchValue, setSearchValue] = useState('');
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    // fetch("https://624e660953326d0cfe5ac0b5.mockapi.io/items").then((res)=>{
    //   return res.json();
    // }).then(json=>{
    // setItems(json);
    //  });
    async function fetchData() {
      const cartResponse = await axios.get("https://624e660953326d0cfe5ac0b5.mockapi.io/cart");
      const favoriteResponse = await axios.get("https://624e660953326d0cfe5ac0b5.mockapi.io/favorites");
      const itemsResponse = await axios.get("https://624e660953326d0cfe5ac0b5.mockapi.io/items");
      setIsReady(false);
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData()
  }, []);

  const isItemAdded = (id) => {
    return CartItems.some((obj) => parseInt(obj.id) === parseInt(id))
  }

  const onAddToCart = (obj) => {
    console.log(obj);
    if (CartItems.find((item) => parseInt(item.id)) === parseInt(obj.id)) {
      axios.delete(`https://624e660953326d0cfe5ac0b5.mockapi.io/cart/${(obj.id)}`);
      setCartItems((prev) => prev.filter((item) => parseInt(item.id) !== parseInt(obj.id)));
    } else {
      axios.post("https://624e660953326d0cfe5ac0b5.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  }


  const onAddToFavorites = async (obj) => {
    if (favorites.find((favobj) => parseInt(favobj.id) === parseInt(obj.id))) {
      axios.delete(`https://624e660953326d0cfe5ac0b5.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => parseInt(item.id) !== parseInt(obj.id)))
    } else {
      const { data } = await axios.post("https://624e660953326d0cfe5ac0b5.mockapi.io/favorites", obj);
      setFavorites((prev) => [...prev, data]);
    }
  }



  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }


  const onRemoveItem = (id) => {
    axios.delete(`https://624e660953326d0cfe5ac0b5.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }


  return (
    <AppContext.Provider value={{ items, CartItems, favorites, isItemAdded ,  onAddToFavorites}}>
      <div className="wrapper clear">
        {openCart ? <Drawer onClosecart={() => setOpenCart(false)} items={CartItems} onRemove={onRemoveItem} /> : null}
        <Header onClickcart={() => setOpenCart(true)} />
        <Routes>
          <Route path="/home" element={
          <Home
            items={items}
            CartItems={CartItems}
            SearchValue={SearchValue}
            onChangeSearchInput={onChangeSearchInput}
            setSearchValue={setSearchValue}
            onAddToFavorites={onAddToFavorites}
            onAddToCart={onAddToCart}
            isLoading={isReady}
          />} />
        </Routes>
        <Routes>
          <Route path="/favorites" element={<Favorites />} />

        </Routes>
      </div>
    </AppContext.Provider>
  )
}


export default App;
