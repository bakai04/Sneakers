
import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";


function App() {
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [SearchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData()
  }, []);

  const isItemAdded = (id) => {
    return CartItems.some((obj) => Number(obj.parentId) === Number(id))
  }
  const onRemoveItem = (id) => {
    axios.delete(`https://624e660953326d0cfe5ac0b5.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  }

  const onAddToCart = async (obj) => {
    try {
      const findItem = CartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://624e660953326d0cfe5ac0b5.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://624e660953326d0cfe5ac0b5.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

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
  return (
    <AppContext.Provider value={{ items, CartItems, favorites, isItemAdded, onAddToFavorites, setOpenCart, setCartItems, onAddToCart }}>
      <div className="wrapper clear">
        <Drawer onClosecart={() => setOpenCart(false)} items={CartItems} onRemove={onRemoveItem} opened={openCart} />
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
              isLoading={isLoading}
            />} />
        </Routes>
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Routes>
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}


export default App;
