import React, { useEffect } from "react";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import routes from "../nav/Router";
// import {navigate, useRoutes} from "hookrouter";
import {Button} from "semantic-ui-react"
import OrderingService from "../Services/OrderingService"
// <<<<<<< main
import {useParams} from "react-router-dom"
// =======
// import "../App.css"
// >>>>>>> ryan2  removed in a merge
import "../App.css"
const request = require('request')


export default function Ordering (props){
    let { from, to, tableId } = useParams();
    const { oauth } = props
    console.log(tableId)

    const [data, setData] = React.useState([])
    const [order, setOrder] = React.useState([])

    useEffect(() => {
    
        request(`https://e09bbfe35b86.ngrok.io/store/1/item`, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        addItems(JSON.parse(body).items)
        });
        // fetch(`https://e09bbfe35b86.ngrok.io/store/1/item`)
        // .then(res => res.json())
        // .then(res=> addItems(res))
        // .then(console.log(data))
        // .catch((e)=> console.log(e))
    },[]);

    
    function processOrder() {
        let orderList = {}
        order.forEach((item) => {
            if (orderList[item.id]) { orderList[item.id] += 1}
            else { orderList[item.id] = 1}
        })
        console.log(orderList)
        return orderList
    }
    const orderMap = processOrder();
    return(
    <div>
         {/* <Button onClick = {populateMenu}>Populate Items</Button> */}
         <div/>
         <h1>Menu:</h1>
         <DataList/>
         <h1>Order:</h1>
         <ul>
            {Object.keys(orderMap).map((itemId) => {
                let quantity = orderMap[itemId]
                let item = getItemInfo(itemId)
                // console.log(item)
                return(
                    <div>
                        <li key = {itemId} value = {item.value}>{item.name}, Price: {item.price}, Quantity: {quantity}</li>
                    </div>)
            })}
         </ul>
         <button onClick={handleOrder}> Place Order </button>

    </div>)

    function handleData(data){
        setData(data)
    }

    function DataList() {
        const listData = data.map((item) =>
        <li>{item.name}, {item.price}
            <Button class = "addButton" onClick = {() => addToOrder(item)}>Add One</Button>
            <Button onClick = {() => removeFromOrder(item)}>Remove One</Button>
            <div/>
            {item.description}
        </li>)
        return(
            <ul>{listData}</ul>
        )
    }

    // function populateMenu(){
    //     setData([
    //         {value: 'carrot', name: 'carrot', price: '1.00', description: 'its orange'},
    //         {value: 'peanut', name: 'peanut', price: '1.50', description: 'its brown'}
    //     ]
    //     )
    // }

    
    function getItemInfo(itemId) {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            if (data[i].id == itemId) {
                return data[i]
            } 
        }
    }
    
    function addItems(items){
        const len = items.length
        var holder = []
        for(var i = 0; i < len; i++){
            var curr = items[i]
            holder.push(items[i])
        }
        handleData(holder)
    }

    function addToOrder(item){
        setOrder(order.concat(item))
    }

    function removeFromOrder(item){
        const found = order.indexOf(item)
        const holder = [...order]
        if (found > -1) {
            holder.splice(found, 1);
            setOrder(holder)
        }
    }

    function handleOrder() {
        console.log(orderMap)
        console.log(from)
        console.log(to)
        OrderingService.order(from, to, orderMap, tableId, oauth);
    }
}