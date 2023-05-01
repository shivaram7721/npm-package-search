import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    if (searchQuery !== "") {
      history.push(`/search/${searchQuery}`);
    }
  };

  return (
    <div>
      <TextField
        label="Search for an NPM package"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
