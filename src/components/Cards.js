import React,{useState} from "react";
function Cards({title, imgUrl, price, onPlus, onFavorite}){
  const [isAdded, setIsAdded]=useState(false);
  const onClickPlus=()=>{
    onPlus({title, imgUrl, price});
    setIsAdded(!isAdded)
  }
  return (
    <div className="card">
      <div className="favorite" onClick={onFavorite}>  
        <img src="/img/unliked.png" alt="Unliked" />
      </div>
      <img width={133} height={112} src={imgUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img className="plus" src={isAdded ? "/img/btn-checked.svg" : "/img/plus.svg"} alt="Plus" onClick={onClickPlus} />
      </div>
    </div>
  );
}
export default Cards;