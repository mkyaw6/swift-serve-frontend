import React, { useEffect } from "react";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import routes from "../nav/Router";
// import {navigate, useRoutes} from "hookrouter";
import {Button} from "semantic-ui-react"
import OrderingService from "../Services/OrderingService"
// <<<<<<< main
import {useParams, Redirect} from "react-router-dom"
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
    const [redirect, setRedirect] = React.useState(false)
    const [orderId, setOrderId] = React.useState(-1)

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
    if (redirect) { return <Redirect to={`/orderDetail/${orderId}`}/>}
    return(
    <div>
            <div class = "row">
                <div class = "column">
                    <div class = "margleft">
                    <h1 class = "ncrLargeTitle">Menu:</h1>
                    </div>
                    <DataList/>
                </div>
                <div class = "column">
                    <h1 class = "marglefter ncrLargeTitle">Order:</h1>
        
                    {Object.keys(orderMap).map((itemId) => {
                        let quantity = orderMap[itemId]
                        let item = getItemInfo(itemId)
                        // console.log(item)
                        return(
                            <div>
                                <span class = "namePrice" key = {itemId} value = {item.value}>{item.name}, Price: ${item.price}, Quantity: {quantity}</span>
                            </div>)
                    })}
                    <Button onClick={handleOrder}> Place Order </Button>
                </div>
         </div>
        </div>
    )

    function handleData(data){
        setData(data)
    }

    function DataList() {
        const listData = data.map((item) =>
        <div class = "row">
            <div class = "column">
                <span class = "namePrice">{item.name}, ${item.price}</span>
                <p class = "ncrCaption">{item.description}</p>
            </div>
            <div class = "column">
                <div class = "row">
                    <Button class = "addButton" onClick = {() => addToOrder(item)}>Add</Button>
                    <Button onClick = {() => removeFromOrder(item)}>Remove</Button>
                </div>
            </div>
        </div>
        )
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
        OrderingService.order(from, to, orderMap, tableId, oauth)
        .then((val) => {
            console.log(val)
            console.log(val.order_id)
            setOrderId(val.order_id)
            setRedirect(true)
        });
    }
}