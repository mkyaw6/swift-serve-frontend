import React, { useEffect } from "react";
import OrderDetailService from "../Services/OrderDetailService"
import {Redirect, useParams} from "react-router-dom"
import {List, Container, Button} from "semantic-ui-react"
import "../App.css"

function getOrderItemList(order_items) {
  return order_items.map((item) => {
    return <li> {item.name}, {item.quantity}x</li>
  })
}
export default function OrderDetail (props){
    let { orderId } = useParams();
    const { oauth, userType } = props;
    console.log(userType)
    console.log(orderId)
    const [orderDetail, setOrderDetail] = React.useState({})
    const [orderItems, setItems] = React.useState([])
    const [reload, setReload] = React.useState(false)
    const [status, setStatus] = React.useState(1)
    useEffect(() => {
      OrderDetailService.getOrderDetail(orderId, oauth)
      .then((val) => {
        console.log(val)
        setOrderDetail(val)
        setItems(val["order_items"])
        setStatus(val.status)
      })
    },[]);
    const statusMap = {'0': 'Your order has been placed', '1': 'Your food is being prepared', '2': 'Your food is ready at the table'}
    // const { status } = orderDetail;
    // console.log(orderDetail)
    if (reload) { return <Redirect to={`/orderDetail/${orderId}`}/>}
    return(
      <div class = "box">
        <div class = "column">
         <h1 class="ncrLargeTitle">Order Details:</h1>
         <List>
          <List.Item>
            <List.Header className = "ncrP">Order Id:</List.Header>
            {orderId}
          </List.Item>
          <List.Item>
            <List.Header className = "ncrP">Status:</List.Header>
            {statusMap[status]}
          </List.Item>
          <List.Item>
            <List.Header className = "ncrP">Items: </List.Header>
            {getOrderItemList(orderItems)}
          </List.Item>
        </List>
        {userType == 'admin' ? <button className="ui tiny blue button" onClick={() => {
          OrderDetailService.setInProgress(orderId,oauth)
          setStatus(1)
          // setReload(true)
        }} > Set In-progress </button> : null}
        {userType == 'admin' ? <button className="ui tiny green button" onClick={() => {
          OrderDetailService.setComplete(orderId,oauth)
          setStatus(2)
          // setReload(true)
        }} > Set Completed </button> : null}
        </div>
      </div>)}
    

  
