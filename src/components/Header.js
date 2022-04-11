import React, { useContext } from "react";
import AppContext from "../context";
import {Link}  from "react-router-dom";
function Header(props){
  const {CartItems}=useContext(AppContext);
  const totalPrice= CartItems.reduce((sum, obj)=> obj.price+sum, 0);
    return (
        <header className="d-flex justify-between align-center p-40">
          <Link to="/home">
          <div className="d-flex align-center">
            <img width={40} height={40} src="/img/logo.png" />
            <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
          </div>
          </Link>
          <ul className="d-flex">
            <li className="mr-30 cu-p" onClick={props.onClickcart}>
              <img width={18} height={18} src="/img/cart.svg" alt="Корзина"/>
              <span>{totalPrice} руб.</span>
            </li>
            <li className="mr-30 cu-p">
              <Link to="/favorites">
                <img width={18} height={18} src="/img/heart.png" alt="Избранное" />
              </Link>
            </li>
            <li>
              <Link to="/Orders">
                <img width={18} height={18} src="/img/users.svg" alt="Пользователь"/>
              </Link>
            </li>
          </ul>
        </header>
      );
}
export default Header;