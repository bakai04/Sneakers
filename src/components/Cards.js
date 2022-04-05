function Cards(){
    return (
        <div className="card">
          <div className="favorite">
            <img src="/img/unliked.png" alt="Unliked" />
          </div>
          <img width={133} height={112} src="/img/boots/1.jpg" alt="Sneakers" />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button className="button">
              <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
            </button>
          </div>
        </div>
      );
}
export default Cards;