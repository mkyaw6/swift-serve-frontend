const request = require('async-request')

const OrderingService = {
  order: async (startTime, endTime, orderItems, tableId, token) => {
    const orderItemsProcessed = Object.keys(orderItems).map((key) => {return {item_id: key, quantity: orderItems[key]}})
    const body = { start_time: startTime, end_time: endTime, id:tableId, order_items: orderItemsProcessed }
    const options = {
      // url: 'https://e09bbfe35b86.ngrok.io/store/1/table',
      method: 'PUT',
      headers: {
        'Authorization': "Bearer " + token
      },
      data: JSON.stringify(body)
    };
    let result = await request(`https://e09bbfe35b86.ngrok.io/table/${tableId}/reserve`,options);
    // let output = []
    // // console.log(result.body)
    result = JSON.parse(result.body)
    // console.log(output)
    // return output
    return result
  },
}


const startTime = "2020-10-18T05:50:09.166Z"
const endTime = "2020-10-18T05:50:09.167Z"
const order_items = [
  {
    "item_id": 1,
    "quantity": 3
  }
]
export default OrderingService;