import React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import TableFooter from "./TableFooter";
import { Button } from '@mui/material';

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

async function deleteData(id) {
    let url = 'http://localhost:3030/models/address/delete/' + id;
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
}) => {
    const [page, setPage] = useState(1);
    let [currentData, setCurrentData] = useState([]);
    let [tableRange, setTableRange] = useState([]);
    let [slice, setSlice] = useState([]);
    let handleData = async () => {
      let userId = sessionStorage.getItem('userId');
      let response = await getUserInfoById(userId);
      setCurrentData(response.address);
    }
    useEffect (() => {
      handleData();
    },[])
    useEffect(() => {
      const range = calculateRange(currentData, rowsPerPage);
      setTableRange([...range]);
      const slice = sliceData(currentData, page, rowsPerPage);
      setSlice([...slice]);
    }, [setTableRange, page, setSlice, currentData]);
    const getCaps = (head, field) => {
        if (head) return head.toUpperCase();
        return field.toUpperCase();
    };
    const handleDeleteData = async (id) => {
        let response = await deleteData(id);
        if(response.message === 'Deleted') {
            let newData = [];
            currentData.forEach(element => {
                if(element.id !== id) {
                  newData.push(element);
                }
            });
            setCurrentData(newData);
            sessionStorage.setItem('address', 'updated');
        }
        else {
            console.log("Error");
        }
    }
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
                <td>
                    <Button                             
                    type="submit"
                    variant="contained"
                    size="small"
                    onClick= {(e)=> handleDeleteData(row.id)}>
                    Delete
                    </Button>
                </td>
                </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={tableRange} slice={slice} setPage={setPage} page={page} />
      {slice ? null : <p>No row to show</p>}
    </div>
  );
};

export default Table;
