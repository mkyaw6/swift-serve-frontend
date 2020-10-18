import React, { useEffect } from "react";
import OrderDetailService from "../Services/OrderDetailService"
import {useParams} from "react-router-dom"
import {List, Container} from "semantic-ui-react"
import "../App.css"

function getOrderItemList(order_items) {
  return order_items.map((item) => {
    return <li> {item.name}, {item.quantity}x</li>
  })
}
export default function OrderDetail (props){
    let { orderId } = useParams();
    const { oauth } = props
    console.log(orderId)
    const [orderDetail, setOrderDetail] = React.useState({})
    const [orderItems, setItems] = React.useState([])
    useEffect(() => {
      OrderDetailService.getOrderDetail(orderId, oauth)
      .then((val) => {
        console.log(val)
        setOrderDetail(val)
        setItems(val["order_items"])
      })
    },[]);
    const statusMap = {'0': 'Your order has been placed', '1': 'Your food is being prepared', '2': 'Your food is ready at the table'}
    const { status } = orderDetail;
    console.log(orderItems)
    return(
    <div>
      <Container>
         <h1 class="ncrLargeTitle">Order Details:</h1>
         <List>
          <List.Item>
            <List.Header>Order Id</List.Header>
            {orderId}
          </List.Item>
          <List.Item>
            <List.Header>Status:</List.Header>
            {statusMap[status]}
          </List.Item>
          <List.Item>
            <List.Header>Items: </List.Header>
            {getOrderItemList(orderItems)}
          </List.Item>
        </List>
      </Container>
    </div>)}

  
