function Drawer({onClosecart, items=[]}){
    return (
        <div className="overlay">
          <div className="drawer">
            <h2 className="d-flex justify-between mb-30 align-center">
              Корзина <img onClick={onClosecart} className="cu-p" width={11} height={11} src="/img/remove.png" alt="Remove" />
            </h2>
            <div className="items">
              {
              items.map((obj, index) => (     
              <div className="cartItem d-flex align-center">
                <div
                  style={{ backgroundImage: `url(${obj.imgUrl})`}}
                  className="cartItemImg"></div>
    
                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img className="removeBtn" src="/img/remove.png" alt="Remove" />
              </div>
            ))}
              </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        </div>
      );
}
export default Drawer;