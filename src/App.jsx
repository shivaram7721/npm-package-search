import { useState } from 'react';
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}`);
    const data = await response.json();
    setSearchResults(data.objects);
  };
  console.log(searchResults)
  console.log(searchTerm)

  const handleFavorite = (packageName, description) => {
    const newFavorite = { packageName, description };
    setFavorites([...favorites, newFavorite]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));
  };

  return (
    <div className='container'>
      <div className='searchContainer'>
      <input className='input' type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button className='searchBtn' onClick={handleSearch}>Search</button>
      </div>
      <h2>Search Results</h2>
      <ul className='ul'>
        {searchResults.map((result) => (
          <li className='list' key={result.package.name}>
            {result.package.name} - {result.package.description}
            <div className='favDiv'>
            <button className='btnFav' onClick={() => handleFavorite(result.package.name, '')}>Add to favorites</button>
            <textarea className='textArea' placeholder="Why is this package your favorite?" onChange={(e) => handleFavorite(result.package.name, e.target.value)} />
            </div>
          </li>
        ))}
      </ul>

      <h2>Favorites</h2>
      <ul className='ul'>
        {favorites.map((favorite) => (
          <li className='list' key={favorite.packageName}>
            {favorite.packageName} - {favorite.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
