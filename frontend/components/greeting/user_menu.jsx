import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import style from "./style.scss";
import theme from "../theme/theme";

export default function UserMenu({ user, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div>
      <a>
        <Button
          variant="outlined"
          style={theme.palette.gradientSecondaryOutline}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <p className={`${style["username"]}`}>
            {capitalize(user.username)}
            {/* <ExpandMoreIcon style={theme.palette.noPadding} /> */}
          </p>
        </Button>
      </a>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/home" className={style["user-menu-link"]}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
