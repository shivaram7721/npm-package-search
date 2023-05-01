import { List, ListItem, ListItemText, Button } from "@mui/material";

const PackageList = ({ packages, onAddToFavorites }) => {
  return (
    <List>
      {packages.map((pkg) => (
        <ListItem key={pkg.name}>
          <ListItemText primary={pkg.name} secondary={pkg.description} />
          <Button variant="contained" onClick={() => onAddToFavorites(pkg)}>
            Add to Favorites
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default PackageList;
