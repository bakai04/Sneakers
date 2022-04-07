import React,{useState} from "react";
function Cards(props){
  const [isAdded, setIsAdded]=useState(false);
  const onClickPlus=()=>{
    setIsAdded(!isAdded)
  }
  return (
      <div className="card">
        <div className="favorite" onClick={props.onClickFavorite}>  
          <img src="/img/unliked.png" alt="Unliked" />
        </div>
        <img width={133} height={112} src={props.imgUrl} alt="Sneakers" />
        <h5>{props.title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{props.price}</b>
          </div>
          <img className="plus" src={isAdded ? "/img/btn-checked.svg" : "/img/plus.svg"} alt="Plus" onClick={props.onClickPlus} />
        </div>
      </div>
    );
}
export default Cards;