
import React,{ useContext } from "react";
import Cards from "../components/Cards";
import AppContext from "../context";
function Favorites({}){
  const {favorites, onAddToFavorites}=useContext(AppContext)
  return (
    <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>
    <div className="d-flex flex-wrap">
      {favorites.map((item, index) => (
        <Cards
          {...item}
          key={index}
          onFavorite={onAddToFavorites}
          favorited={true}
        />
      ))}
    </div>
  </div>
  );
}
export default Favorites;