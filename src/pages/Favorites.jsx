import Cards from "../components/Cards";
function Favorites({favorites,favorited}){
  return (
    <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>
    <div className="d-flex flex-wrap">
      {favorites.map((item, index) => (
        <Cards
          title={item.title}
          price={item.price}
          imgUrl={item.imgUrl}
          key={index}
          favorited={true}
        />
      ))}
    </div>
  </div>
  );
}
export default Favorites;