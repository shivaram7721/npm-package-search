import { useState, useEffect } from "react";

function Favorites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [description, setDescription] = useState("");

  // Load favorites from local storage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Update local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Search for packages on NPM when the search term changes
  useEffect(() => {
    if (searchTerm) {
      fetch(`https://api.npms.io/v2/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Add a package to favorites with a description
  const handleAddFavorite = (pkg) => {
    setFavorites((prevFavorites) => [
      ...prevFavorites,
      { ...pkg, description },
    ]);
    setDescription("");
  };

  // Remove a package from favorites
  const handleRemoveFavorite = (pkg) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.package.name !== pkg.package.name)
    );
  };

  return (
    <div>
      <h1>My Favorite NPM Packages</h1>
      <label>
        Search for packages:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((pkg) => (
            <li key={pkg.package.name}>
              <span>{pkg.package.name}</span>{" "}
              <button onClick={() => handleAddFavorite(pkg)}>Add</button>
            </li>
          ))}
        </ul>
      )}
      {favorites.length > 0 && (
        <div>
          <h2>My Favorites:</h2>
          <ul>
            {favorites.map((fav) => (
              <li key={fav.package.name}>
                <span>{fav.package.name}</span>{" "}
                <button onClick={() => handleRemoveFavorite(fav)}>
                  Remove
                </button>
                <p>
                  {fav.description || (
                    <em>No description provided.</em>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {favorites.length === 0 && <p>You haven `&apos;` t added any favorites yet!</p>}
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
    </div>
  );
}

export default Favorites;
