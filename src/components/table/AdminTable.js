import React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import TableFooter from "./TableFooter";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DataArray } from "@mui/icons-material";

const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let index = 1; index <= num; index++) {
      range.push(index);
    }
    return range;
};
  
const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

async function getData(type) {
  let url = "http://localhost:3030/models/";
  if (type === 'product' || type === 'product-set') url = url + type + "/admin/info";
  else {
    url = url + type;
  }
  console.log(url);
  let data = await fetch(url, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  }).then((data) => data.json());
  return data;
}

async function addData(credentials, type) {
  let url = "http://localhost:3030/models/";
  if (type === 'product' || type === 'product-set') {
    url = url + type + "/admin/add";
  } 
  else url = url + type + "/add";
  let data = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials)
}).then((data) => data.json());
return data;
}

async function deleteData(type, id) {
    let url = 'http://localhost:3030/models/' + type + '/delete/' + id;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then (data => data.json())
}

const Table = ({
  columns = null,
  hover = true,
  striped = true,
  rowsPerPage = 5,
  type = null
}) => {
    const [page, setPage] = useState(1);
    let [currentData, setCurrentData] = useState([]);
    let [soldStatus, setSoldStatus] = useState("");
    let [productSet, setProductSet] = useState([]);
    let [author, setAuthor] = useState([]);
    let [provider, setProvider] = useState([]);
    let [currentProductSet, setCurrentProductSet] = useState("");
    let [currentAuthor, setCurrentAuthor] = useState("");
    let [currentProvider, setCurrentProvider] = useState("");
    let [tableRange, setTableRange] = useState([]);
    let [slice, setSlice] = useState([]);
    useEffect (() => {
      handleData();
    },[])
    let handleData = async () => {
        let response = await getData(type);
        if (type === 'product') {
            setCurrentData(response.products);
            setAuthor(response.authors);
            setProductSet(response.sets);
            setProvider(response.providers);
        }
        else if (type === 'product-set') {
          setCurrentData(response.productSet);
          setAuthor(response.authors);
          setProvider(response.providers);
        } else {
          setCurrentData(response);
        }
    }
    useEffect(() => {
      const range = calculateRange(currentData, rowsPerPage);
      setTableRange([...range]);
      const slice = sliceData(currentData, page, rowsPerPage);
      setSlice([...slice]);
    }, [setTableRange, page, setSlice, currentData, author]);
    const getCaps = (head, field) => {
        if (head) return head.toUpperCase();
        return field.toUpperCase();
    };

    const handleAddData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let response = "";
        if(type === 'product') {
          response = await addData({
            productName: data.get('productName'),
            price: data.get('price'),
            quantityInStock: data.get('quantityInStock'),
            description: data.get('description'),
            publishedYear: data.get('publishedYear'),
            productSize: data.get('productSize'),
            pageNumber: data.get('pageNumber'),
            soldNumber: data.get('soldNumber'),
            image: data.get('data'),
            soldStatus: data.get('soldStatus'),
            authorName: currentAuthor,
            setName: currentProductSet,
            providerName: currentProvider
          }, type);
        }
        if (type === 'product-set') {
          response = await addData({
            name: data.get('name'),
            description: data.get('description'),
            newestChap: data.get('newestChap'),
            image: data.get('image'),
            authorName: currentAuthor,
            providerName: currentProvider
          }, type)
        }
        if (type === 'category') {
          response = await addData({
            name: data.get('name'),
            description: data.get('description')
          }, type)
        }
        if (type === 'author') {
          response = await addData({
            name: data.get('name'),
          }, type)
        }
        if (type === 'provider') {
          response = await addData({
            name: data.get('name'),
          }, type)
        }
        if (response.message !== "Error") {
          let newData = [];
          currentData.forEach(element => {
                newData.push(element);
          });
          setCurrentData(newData);
        }
        else {
          console.log("Thêm dữ liệu lỗi");
        }
    }
    const handleDeleteData = async (id) => {
        let response = await deleteData(type, id);
        if(response.message === 'Deleted') {
            let newData = [];
            currentData.forEach(element => {
                if(element.id !== id) {
                  newData.push(element);
                }
            });
            setCurrentData(newData);
        }
        else {
            console.log("Error");
        }
    }
    const handleSoldStatusChange = (event) => {
      console.log(event.target.value);
      setSoldStatus(event.target.value);
    };
    const handleAuthorChange = (event) => {
      setCurrentAuthor(event.target.value);
    };
    const handleProductsetChange = (event) => {
      setCurrentProductSet(event.target.value);
    };
    const handleProviderChange = (event) => {
      setCurrentProvider(event.target.value);
    };
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns &&
              columns.map((head) => (
                <th>{getCaps(head.header, head.field)}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {slice &&
            slice.map((row) => (
                <tr className={`${hover && "hover"} ${striped && "striped"}`}>
                {columns.map((col) => (
                <td>{row[col.field]}</td>
                ))}
                {row.roleId !== 1 && (
                    <td>
                    <Button                             
                    type="submit"
                    variant="contained"
                    size="small"
                    onClick= {(e)=> handleDeleteData(row.id)}>
                    Delete
                    </Button>
                </td>
                )}
                </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={tableRange} slice={slice} setPage={setPage} page={page} />
      {slice ? null : <p>No row to show</p>}
      {type === 'product' && (
                    <Box
                    component="form"
                    onSubmit={handleAddData}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                      margin="normal"
                      id="productName"
                      label="Tên sản phẩm"
                      name="productName"
                    />
                    <TextField
                      margin="normal"
                      name="price"
                      label="Giá"
                      id="price"
                    />
                    <TextField
                      margin="normal"
                      name="description"
                      label="Mô tả"
                      id="description"
                    />
                    <TextField
                      margin="normal"
                      name="image"
                      label="Ảnh"
                      id="image"
                    />
                    <TextField
                      margin="normal"
                      name="publishedYear"
                      label="Năm phát hành"
                      id="publishedYear"
                    />
                    <TextField
                      margin="normal"
                      name="productSize"
                      label="Kích thước"
                      id="productSize"
                    />
                    <TextField
                      margin="normal"
                      name="pageNumber"
                      label="Số trang"
                      id="pageNumber"
                    />
                    <TextField
                      margin="normal"
                      name="quantityInStock"
                      label="Số lượng trong kho"
                      id="quantityInStock"
                    />
                    <TextField
                      margin="normal"
                      name="soldNumber"
                      label="Số lượng đã bán"
                      id="soldNumber"
                    />
                    <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      labelId="soldStatus"
                      id="soldStatus"
                      value={soldStatus}
                      label="Age"
                      onChange={handleSoldStatusChange}
                    >
                      <MenuItem value={1}>Đang bán</MenuItem>
                      <MenuItem value={0}>Đã hết hàng</MenuItem>
                      <MenuItem value={2}>Chưa bán</MenuItem>
                    </Select>
                  </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Tên tác giả</InputLabel>
                  <Select
                    labelId="authorName"
                    id="authorName"
                    onChange={handleAuthorChange}
                    input={<OutlinedInput label="Name" />}
                  >
                    {Array.isArray(author) &&
                      author.map((name) => {
                        return (
                          <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        )
                      }
                    )}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Tên bộ sản phẩm</InputLabel>
                  <Select
                    labelId="productset"
                    id="productset"
                    onChange={handleProductsetChange}
                    input={<OutlinedInput label="Name" />}
                  >
                    {Array.isArray(productSet) &&
                      productSet.map((name) => {
                        return (
                          <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        )
                      }
                    )}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Tên nhà xuất bản</InputLabel>
                  <Select
                    labelId="provider"
                    id="provider"
                    onChange={handleProviderChange}
                    input={<OutlinedInput label="Name" />}
                  >
                    {Array.isArray(provider) &&
                      provider.map((name) => {
                        return (
                          <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        )
                      }
                    )}
                  </Select>
                </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add
                    </Button>
                  </Box>
            )}
            {type === 'product-set' && (
              <Box
                component="form"
                onSubmit={handleAddData}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  name="name"
                  label="Tên"
                  id="name"
                />
              <TextField
                margin="normal"
                name="description"
                label="Mô tả"
                id="description"
              />
              <TextField
                margin="normal"
                name="newestChap"
                label="Tập mới nhất"
                id="newestChap"
              />
              <TextField
                margin="normal"
                name="image"
                label="Ảnh"
                id="image"
              />
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Tên tác giả</InputLabel>
                <Select
                  labelId="authorName"
                  id="authorName"
                  onChange={handleAuthorChange}
                  input={<OutlinedInput label="Name" />}
                >
                  {Array.isArray(author) &&
                    author.map((name) => {
                      return (
                        <MenuItem key={name} value={name}>
                              {name}
                          </MenuItem>
                      )
                    }
                  )}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Tên nhà xuất bản</InputLabel>
                <Select
                  labelId="provider"
                  id="provider"
                  onChange={handleProviderChange}
                  input={<OutlinedInput label="Name" />}
                >
                  {Array.isArray(provider) &&
                    provider.map((name) => {
                      return (
                        <MenuItem key={name} value={name}>
                              {name}
                          </MenuItem>
                      )
                    }
                  )}
                </Select>
              </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  Add
              </Button>
              </Box>
            )}
            {type === 'category' && (
              <Box
              component="form"
              onSubmit={handleAddData}
              noValidate
              sx={{ mt: 1 }}
          >
              <TextField
                margin="normal"
                id="name"
                label="Tên"
                name="name"
              />
              <TextField
                margin="normal"
                name="description"
                label="Mô tả"
                id="description"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  Add
              </Button>
            </Box>
            )}
            {type === 'author' && (
              <Box
              component="form"
              onSubmit={handleAddData}
              noValidate
              sx={{ mt: 1 }}
          >
              <TextField
                margin="normal"
                id="name"
                label="Tên"
                name="name"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  Add
              </Button>
            </Box>
            )}   
            {type === 'provider' && (
              <Box
              component="form"
              onSubmit={handleAddData}
              noValidate
              sx={{ mt: 1 }}
          >
              <TextField
                margin="normal"
                id="name"
                label="Tên"
                name="name"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  Add
              </Button>
            </Box>
            )}         
    </div>
  );
};

export default Table;
