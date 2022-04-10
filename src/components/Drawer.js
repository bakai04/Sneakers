function Drawer({ onClosecart, items = [], onRemove }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 align-center">
          Корзина <img onClick={onClosecart} className="cu-p" width={11} height={11} src="/img/remove.png" alt="Remove" />
        </h2>
        {
          items.length > 0 ? <div className="items">
            <div className="d-flex flex-column flex">
                {
                items.map((obj, index) => (
                  <div key={obj.id} className="cartItem d-flex align-center">
                    <div
                      style={{ backgroundImage: `url(${obj.imgUrl})` }}
                      className="cartItemImg"></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/remove.png" alt="Remove" />
                  </div>
                ))}
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
          </div> :
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.png" alt="Empty" />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button onClick={onClosecart} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
        }
      </div>
    </div>
  );
}
export default Drawer;