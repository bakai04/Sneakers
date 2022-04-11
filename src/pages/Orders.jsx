import axios from "axios";
import React,{ useState, useContext , useEffect} from "react";
import Cards from "../components/Cards";
import AppContext from "../context";
function Orders({}){
  const [orders, setOrders] = useState([]);
const {onAddToCart, onAddToFavorites}=useContext(AppContext);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    const {data} = await axios.get("https://624e660953326d0cfe5ac0b5.mockapi.io/orders");
    setOrders(data.reduce((prev, obj)=>[...prev, ...obj.items],[]));
    setIsLoading(false);
  }
  fetchData()
}, []);
  return (
    <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>
    <div className="d-flex flex-wrap">
      {(isLoading ? [...Array(12)]:orders).map((item, index) => (
        <Cards
        key={index}
        loading={isLoading}
        {...item}
        />
      ))}
    </div>
  </div>
  );
}
export default Orders;