import React, { useEffect } from "react";
import "../App.css"
const request = require('request')


export default function ViewSchedule(props){

    const [data, setData] = React.useState([])

    useEffect(() => {
        const optionsTwo = {
            url: 'https://e09bbfe35b86.ngrok.io/store/1/reservation', 
            headers: {
              "Authorization": "Bearer " + props.oauth
            }
        };
        request(optionsTwo, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            addItems(JSON.parse(body).tables)
            });
    },[])

    function handleData(data){
        setData(data)
        console.log(data)
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

    return(
        <div>
            <div class = "specialBox">
        <h1 class = "ncrLargeTitle">Schedule:</h1>
        </div>
        <table class = "ui celled table">
            <thead>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Table #</th>
                    <th>Customer ID</th>
                </tr>
            </thead>
            <tbody>
             {data.map((e, key) => {
                 return(
                     <tr>
                         <td data-label = "Start">{e.start_time}</td>
                         <td data-label = "End">{e.end_time}</td>
                         <td data-label = "Table #">{e.table_id}</td>
                         <td data-label = "Customer ID">{e.customer_id}</td>
                     </tr>
                 )
             })}
             </tbody>
         </table>
         </div>
    )
}