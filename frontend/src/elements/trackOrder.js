import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import searchIcon from "../pictures/search.png";
import axios from "axios";
import boxLogo from "../pictures/box.png";
import backIcon from "../pictures/back.png";

function ShowDetails ({order}) {
    return (
      <center>
        <center>{ order.code === undefined ? <h4 className="errorText">{order.error}</h4> : <></> }</center>
        <center>{ order.state === undefined ? <></> : 
               (order.state === 0 ? <h1 className="text1">Your order is IN OUR SYSTEM.</h1> : (
                order.state === 1 ? <h1 className="text1">Your order has been PICKED UP from the seller.</h1> : (
                order.state === 2 ? <h1 className="text1">Your company is IN A WAREHOUSE.</h1> : (
                order.state === 3 ? <h1 className="text1">Your order is ON ITS WAY.</h1> : 
                <h1 className="text1">Your order has been DELIVERED..</h1>)

               )))}</center>
        <center>{ order.code === undefined ? <></> : <img src={boxLogo}></img> } </center>
        <center> { order.length === undefined ? <></> : <h2>{order.length} x {order.width} x {order.height} </h2> } </center>
        <div className="row">
            { order.sender_name === undefined ? <></> : <h2 className="columnGreen">SENDER:</h2>}
            { order.receiver_name === undefined ? <></> : <h2 className="columnGreen">RECEIVER:</h2>}
        </div>
        <div className="row">
            { order.sender_name === undefined ? <></> : <h4 className="column">{order.sender_name}</h4>}
            { order.receiver_name === undefined ? <></> : <h4 className="column">{order.receiver_name}</h4>}
        </div>
        <div className="row">
            { order.sender_address === undefined ? <></> : <h4 className="column">{order.sender_address}</h4>}
            { order.receiver_address === undefined ? <></> : <h4 className="column">{order.receiver_address}</h4>}
        </div>
        <div className="row">
            { order.sender_city === undefined ? <></> : <h4 className="column">{order.sender_city}</h4>}
            { order.receiver_city === undefined ? <></> : <h4 className="column">{order.receiver_city}</h4>}
        </div>
        <div className="row">
            { order.sender_country === undefined ? <></> : <h4 className="column">{order.sender_country}</h4>}
            { order.receiver_country === undefined ? <></> : <h4 className="column">{order.receiver_country}</h4>}
        </div>
        <div className="row">
            { order.send_date === undefined ? <></> : <h4 className="column">SENT ON:</h4>}
            { order.delivery_date === undefined ? <></> : <h4 className="column">DELIVERY ON:</h4>}
        </div>
        <div className="row">
            { order.send_date === undefined ? <></> : <h4 className="column">{order.send_date}</h4>}
            { order.delivery_date === undefined ? <></> : <h4 className="column">{order.delivery_date}</h4>}
        </div>

      </center>
    );
}

function handleClick (code, setOrder) {
  if (code === "") {
    setOrder({error: "Please enter a code."});
    return;
  }
    axios.get(`http://localhost:3000/orders/${code}`)
    .then((response) => {
      setOrder(response.data);
    }).catch((error) => {
      setOrder(error.response.data)
    });
  }

function TrackOrder () {
  const history = useHistory(); 
  const [code, setCode] = React.useState("");

  const [order, setOrder] = React.useState({});


  return (
    <div>
      <img src={backIcon} onClick={ () => {
        history.push('/');
      }}></img>
      <h1 className="Title">Track your order here</h1>
      <div className="text-field">
      <input type="text" value={code} label="Enter the package's code:"
                className="field"
                onChange={(e) => {
                    setCode(e.target.value);
                }}
      />

      <img style={{ height: 50 }} src={searchIcon} onClick={ () => {
        handleClick(code, setOrder);
      }}/>
      </div>

      <ShowDetails order={order}/>

    </div>
  );
}

export default TrackOrder;