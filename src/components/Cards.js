import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../context";
function Cards({
  id,
  title,
  imgUrl,
  price,
  onPlus,
  onFavorite,
  favorited = false,

  loading = false
}) {
  const {isItemAdded}=useContext(AppContext);

  const [isAddedtoFavorites, setIsAddedtoFavorites] = useState(favorited);
  const obj={ id, parentId: id, title, imgUrl, price };
  const onClickPlus = () => {
    onPlus(obj);

  };
  const onClickFavorites = () => {
    setIsAddedtoFavorites(!isAddedtoFavorites);
    onFavorite(obj);
  }
  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (<div className="favorite" onClick={onClickFavorites}>
            <img src={isAddedtoFavorites ? "/img/liked.png" : "/img/unliked.png"} alt="Unliked"  />
          </div>)}
          <img width={133} height={112} src={imgUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            {onPlus && (<img className="plus" src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"} alt="Plus" 
            onClick={onClickPlus} />)}
          </div>
        </>
      )}
    </div>
  );
}
export default Cards;