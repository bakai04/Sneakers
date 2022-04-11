import Info from "./Info";
import React, { useContext, useState } from "react";
import AppContext from "../context";
import axios from "axios";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({ onClosecart, items = [], onRemove , opened}) {
  const [isOrderComplete, setIsOrderComplete]=useState(false);
  const [orderId, setOrderId]=useState(false);
  const {CartItems,setCartItems}=useContext(AppContext);
  const totalPrice= CartItems.reduce((sum, obj)=> obj.price+sum, 0);

  const onClickOrder=async()=>{
    const {data}=await axios.post("https://624e660953326d0cfe5ac0b5.mockapi.io/orders",{items:CartItems})
    setOrderId(data.id);
    setIsOrderComplete(true);
    setCartItems([]);
    for(let i=0; i<CartItems.length; i++){
      const item=CartItems[i];
      await axios.delete(`https://624e660953326d0cfe5ac0b5.mockapi.io/cart/${item.id}`)
      await delay(1000);
    }
  }
  return (
    <div className={`overlay ${opened ? "overlayvisible": ""}`}>
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 align-center">
          Корзина <img onClick={onClosecart} className="cu-p" width={11} height={11} src="/img/remove.png" alt="Remove" />
        </h2>
        {
          items.length > 0 ? <div className="d-flex flex-column flex">
            <div className="items flex">
                {
                items.map((obj, index) => (
                  <div key={index} className="cartItem d-flex align-center">
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
                    <b>{totalPrice} руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{Math.round(totalPrice/100*5)} руб. </b>
                  </li>
                </ul>
                <button onClick={onClickOrder} className="greenButton">
                  Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          </div> :
          <Info title={isOrderComplete ? "Заказ оформлен!":"Корзина пустая"} 
          description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`:"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
          image={isOrderComplete ? "/img/complete.jpg" : "/img/empty-cart.png"} />
        }
      </div>
    </div>
  );
}
export default Drawer;