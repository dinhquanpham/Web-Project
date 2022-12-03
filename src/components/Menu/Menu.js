import * as React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { default as MuiMenu } from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

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
                className="button-menu"
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-owns={open ? "menu" : undefined}
                aria-haspopup={open ? "true" : "false"}
                aria-controls={open ? "menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenMenu}
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
                    <Grid
                        container
                        columns={3}
                        sx={{ flexGrow: 1, width: 700, height: "100%" }}
                    >
                        <Grid item xs={1} className="box">
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=hot`))
                                }
                            >
                                TRUYỆN HOT
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=new`))
                                }
                            >
                                TRUYỆN MỚI
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=5`))
                                }
                            >
                                NARUTO
                            </MenuItem>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                            sx={{
                                flexGrow: 1,
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=6`))
                                }
                            >
                                DRAGON BALL
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=7`))
                                }
                            >
                                ONE PIECE
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=8`))
                                }
                            >
                                BLEACH
                            </MenuItem>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                            sx={{
                                flexGrow: 1,
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=9`))
                                }
                            >
                                HARRY POTTER
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=10`))
                                }
                            >
                                IPM BOOK
                            </MenuItem>
                            <MenuItem
                                onClick={
                                    (handleCloseMenu,
                                    () => navigate(`/product-set/?id=11`))
                                }
                            >
                                SHERLOCK HOMLES
                            </MenuItem>
                        </Grid>
                    </Grid>
                </MuiMenu>
            </IconButton>
        </div>
    );
}
