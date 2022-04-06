function Cards(props){
  return (
      <div className="card">
        <div className="favorite">
          <img src="/img/unliked.png" alt="Unliked" />
        </div>
        <img width={133} height={112} src={props.imgUrl} alt="Sneakers" />
        <h5>{props.title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{props.price}</b>
          </div>
          <button className="button" onClick={props.onClick}>
            <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
          </button>
        </div>
      </div>
    );
}
export default Cards;