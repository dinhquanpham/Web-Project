import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { default as MuiMenu } from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpenMenu = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-owns={open ? "menu" : undefined}
                aria-haspopup={open ? "true" : "false"}
                aria-controls={open ? "menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenMenu}
                //onMouseOver={handleOpenMenu}
            >
                <MenuIcon />
                <MuiMenu
                    id="menu"
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    onClose={handleCloseMenu}
                    disableRestoreFocus
                >
                    <MenuItem
                        onClick={
                            (handleCloseMenu,
                            () => navigate(`/product-set/?id=5`))
                        }
                    >
                        TRUYỆN HOT
                    </MenuItem>
                    <MenuItem
                        onClick={
                            (handleCloseMenu,
                            () => navigate(`/product-set/?id=6`))
                        }
                    >
                        TRUYỆN MỚI
                    </MenuItem>
                    <MenuItem
                        onClick={
                            (handleCloseMenu,
                            () => navigate(`/product-set/?id=7`))
                        }
                    >
                        MANGA COMIC
                    </MenuItem>
                </MuiMenu>
            </IconButton>
        </div>
    );
}
