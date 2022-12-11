import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./ProductTab.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function ProductTab(productSetName, productInfo) {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const productTabShow = productInfo.map((data) => (
        <Box className="box">
            <Box
                className="box product-tab box-product-detail"
                onClick={() => navigate(`/product/?id=${data.id}`)}
            >
                <Box className="box product-tab box-product-image">
                    <img
                        className="image"
                        src={data.image}
                        alt={data.productName}
                    />
                </Box>
                <Box className="box product-tab box-product-detail-text">
                    <Box className="box product-tab box-product-name">
                        {data.productName}
                    </Box>
                    <Box className="box product-tab box-product-price">
                        Giá: {data.price}
                    </Box>
                    <Box className="box product-tab box-product-sold">
                        Đã bán: {data.soldNumber}
                    </Box>
                </Box>
            </Box>
            <Button
                className="box product-tab button-add-to-cart"
                variant="outlined"
                onClick={() => {
                    let userId = sessionStorage.getItem("userId");
                    let info = localStorage.getItem(userId * 1000 + data.id);
                    info = JSON.parse(info);
                    let quantity = info == null ? 0 : info.quantity;
                    quantity++;
                    let newInfo = {
                        productName: data.productName,
                        image: data.image,
                        price: data.price,
                        quantity: quantity,
                    };
                    newInfo = JSON.stringify(newInfo);
                    localStorage.setItem(userId * 1000 + data.id, newInfo);
                    setOpen(true);
                }}
            >
                THÊM VÀO GIỎ
            </Button>
        </Box>
    ));
    return (
        <Item className="box product-tab box-product-tab">
            <Box className="box product-tab box-product-set-name">
                <Typography className="box product-tab text-product-set-name">
                    {productSetName}
                </Typography>
            </Box>
            <Box className="box product-tab box-product-set-info">
                {Array.from(Array(5)).map((_, index) => (
                    <Item
                        className="box product-tab box-product-info"
                        key={index}
                    >
                        {productTabShow[index]}
                    </Item>
                ))}
            </Box>
            <Box className="box product-tab box-button-watch-more">
                <Button
                    className="box product-tab button-watch-more"
                    variant="outlined"
                    onClick={() => {
                        let productsetId = productInfo[0].productsetId;
                        let url = `/product-set/?id=${productsetId}`;
                        if (productSetName == "TRUYỆN HOT")
                            url = `/product-category/?id=hot`;
                        if (productSetName == "TRUYỆN MỚI")
                            url = `/product-category/?id=new`;
                        navigate(url);
                    }}
                >
                    Xem thêm
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>ĐÃ THÊM VÀO GIỎ HÀNG</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ĐỒNG Ý</Button>
                </DialogActions>
            </Dialog>
        </Item>
    );
}
