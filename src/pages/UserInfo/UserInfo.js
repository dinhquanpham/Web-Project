import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TextField from '@mui/material/TextField';
import './UserInfo.css'
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TableData  from "../../components/table/UserTable"

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`user-tabpanel-${index}`}
        aria-labelledby={`user-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

async function getUserInfoById(userId) {
    let url = "http://localhost:3030/models/user/info/" + userId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function changePassword(credentials) {
  return fetch('http://localhost:3030/account/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then (data => data.json())
}

async function addAddress(credentials) {
  return fetch('http://localhost:3030/models/address/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then (data => data.json())
}

export default function UserInfo() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    let [userInfo, setUserInfo] = useState([]);
    let [changed, setChanged] = useState(0);
    let [addressInfo, setAddressInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, [changed]);
    let handleData = async () => {
        let userId = sessionStorage.getItem('userId');
        let response = await getUserInfoById(userId);
        setUserInfo(response.user);
        setAddressInfo(response.address);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const handlePasswordSubmit = async (e) => {;
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let currentPassword = data.get('currentPassword');
        let newPassword = data.get('newPassword');
        let reNewPassword = data.get('reNewPassword');
        if(currentPassword === userInfo.password && newPassword === reNewPassword) {
          const response = await changePassword({
              id: sessionStorage.getItem('userId'),
              password: newPassword
          })
          if(response.message === "Updated") {
            navigate('/');
          }
          else {
            console.log("Không đổi được mật khẩu");
          }
        }
        else {
          if (currentPassword !== userInfo.password) {
            console.log("Mật khẩu hiện tại không chính xác");
          }
          else {
            console.log("Mật khẩu nhập lại không chính xác");
          }
        }
    };
    const handleAddAddress = async (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const response = await addAddress({
        homeAddress: data.get('homeAddress'),
        street : data.get('street'),
        district : data.get('district'),
        province :  data.get('province'),
        userId: sessionStorage.getItem('userId')
      })
      if (response.message !== "Error") {
        window.location.reload()
      }
      else {
        console.log("Lỗi khi thêm địa chỉ nhận hàng");
      }
    }

    const columns = [
      { field: "id", header: "ID" },
      { field: "homeAddress", header: "Số nhà" },
      { field: "street", header: "Đường" },
      { field: "district", header: "Phường/quận" },
      { field: "province", header: "Tỉnh/thành phố" },
    ];

    const userInfoShow = (() => (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="user tabs">
            <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
            <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
            <Tab label="Địa chỉ giao hàng" {...a11yProps(2)} />
            <Tab label="Lịch sử mua hàng" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <div className='line'>
          <div id="left">
              <TextField
              id="firstname"
              label="First name"
              defaultValue="Empty"
              value= {userInfo.firstname ? userInfo.firstname : ""}
              InputProps={{
                readOnly: true
              }}
              />
          </div>
          <div id="middle">
              <TextField
              id="middlename"
              label="Middle name"
              defaultValue="Empty"
              value= {userInfo.middlename ? userInfo.middlename : ""}
              InputProps={{
                readOnly: true
              }}
              />
          </div>
          <div id="right">
              <TextField
              id="lastname"
              label="Last name"
              defaultValue="Empty"
              value= {userInfo.lastname ? userInfo.lastname : ""}
              InputProps={{
                readOnly: true
              }}
              />
          </div>
        </div>
        <div className='line'>
          <div id="left">
              <TextField
              id="phone"
              label="Phone"
              defaultValue="Empty"
              value= {userInfo.phone ? userInfo.phone : ""}
              InputProps={{
                readOnly: true
              }}
              />
          </div>
          <div id="middle">
              <TextField
              id="email"
              label="Email"
              defaultValue="Empty"
              value = {userInfo.email ? userInfo.email : ""}
              InputProps={{
                readOnly: true
              }}
              />
          </div>
        </div>
      </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            component="form"
            onSubmit={handlePasswordSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <div className="line">
            <TextField
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              type="password"
              required
            />
            </div>
            <div className="line">
            <TextField
              id="newPassword"
              label="New Password"
              type="password"
              name="newPassword"
              required
            />
            </div>
            <div className="line">
            <TextField
              id="reNewPassword"
              label=" Re-enter your password"
              type="password"
              name="reNewPassword"
              required
            />
            </div>
            <Button                             
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
          <Box
            component="form"
            onSubmit={handleAddAddress}
            noValidate
            sx={{ mt: 1 }}
          >
             <TextField
              id="homeAddress"
              label="Số nhà"
              name= "homeAddress"
              />
              <TextField
              id="street"
              label="Đường"
              name ="street"
              />
              <TextField
              id="district"
              label="Phường/quận"
              name="district"
              />
              <TextField
              id="province"
              label="Tỉnh/thành phố"
              name="province"
              />
              <Button                             
              type="submit"
              variant="contained"
              size='large'
              >
              Submit
            </Button>
        </Box>
          <TableData  columns={columns} hover={true} striped={true}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
          </TabPanel>
      </Box>
    ))();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box width="100%">{Header()}</Box>
            <Box width="100%">{userInfoShow}</Box>
        </Box>
    );
}
