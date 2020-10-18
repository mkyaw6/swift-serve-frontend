const request = require('async-request')

const OrderDetailService = {
  getOrderDetail: async (orderId, token) => {
    const options = {
      // url: 'https://e09bbfe35b86.ngrok.io/store/1/table',
      headers: {
        'Authorization': "Bearer " + token
      },
    };
    let result = await request(`https://e09bbfe35b86.ngrok.io/order/${orderId}/`,options);
    // let output = []
    // // console.log(result.body)
    result = JSON.parse(result.body)
    console.log(result)
    return result
  },
}

export default OrderDetailService;