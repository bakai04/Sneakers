import Cards from "../components/Cards";
import AppContext from "../context";
import React,{ useContext } from "react";
function Home({
    SearchValue,
    CartItems,
    onChangeSearchInput,
    items,
    setSearchValue,
    onAddToFavorites,
    onAddToCart,
    isLoading
}){
  const {isItemAdded}=useContext(AppContext);
  const renderItems=()=>{
    const filtredItems = items.filter((item)=> item.title.toLowerCase().includes(SearchValue.toLowerCase()))
    console.log(filtredItems);
    return (isLoading ? [...Array(12)]:filtredItems).map((item, index) => (
        <Cards
          onFavorite={(obj) => (onAddToFavorites(obj))}
          onPlus={(obj) => (onAddToCart(obj))}
          key={index}
          loading={isLoading}
          {...item}
        />
        ));
  };
  return (
    <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{SearchValue ? `Поиск по запросу:${SearchValue}` : `Все кроссовки`} </h1>
          <div className="search-block d-flex align-center">
            <img src="/img/Vector.svg" alt="Search" />
            <input onChange={onChangeSearchInput} value={SearchValue}  placeholder="Поиск..." />
            {SearchValue && <img onClick={()=>(setSearchValue(""))} className="removeBtn" width={11} height={11} src="/img/remove.png" alt="Remove" />}
          </div>
        </div>
    <div className="d-flex flex-wrap">
      {renderItems()}
    </div>
  </div>
  );
}
export default Home;