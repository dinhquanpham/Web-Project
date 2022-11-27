import * as React from "react";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";

export default function Menu() {
    return (
        // <Paper sx={{ width: 320 }}>
        <MenuList>
            <MenuItem>
                <ListItemText inset>Single</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText inset>1.15</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText inset>Double</ListItemText>
            </MenuItem>
            <MenuItem>Custom: 1.2</MenuItem>
            <Divider />
            <MenuItem>
                <ListItemText>Add space before paragraph</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText>Add space after paragraph</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
                <ListItemText>Custom spacing...</ListItemText>
            </MenuItem>
        </MenuList>
        // </Paper>
    );
}
