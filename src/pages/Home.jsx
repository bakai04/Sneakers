import Cards from "../components/Cards";
function Home({
    SearchValue,
    onChangeSearchInput,
    items,
    setSearchValue,
    onAddToFavorites,
    onAddToCart
}){
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
      {items.filter((items)=>items.title.toLowerCase().includes(SearchValue.toLowerCase()))
        .map((item, index) => (
        <Cards
          title={item.title}
          price={item.price}
          imgUrl={item.imgUrl}
          onFavorite={(obj) => (onAddToFavorites(obj))}
          onPlus={(obj) => (onAddToCart(obj))}
          key={index}
        />
      ))}
    </div>
  </div>
  );
}
export default Home;