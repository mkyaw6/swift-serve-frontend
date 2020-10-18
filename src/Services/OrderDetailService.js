const asyncRequest = require('async-request')
const request = require('request')

const OrderDetailService = {
  getOrderDetail: async (orderId, token) => {
    const options = {
      // url: 'https://e09bbfe35b86.ngrok.io/store/1/table',
      headers: {
        'Authorization': "Bearer " + token
      },
    };
    let result = await asyncRequest(`https://e09bbfe35b86.ngrok.io/order/${orderId}/`,options);
    // let output = []
    // // console.log(result.body)
    result = JSON.parse(result.body)
    console.log(result)
    return result
  },

  setInProgress: async (orderId, token) => {
    const options = {
      uri: `https://e09bbfe35b86.ngrok.io/order/${orderId}/start`,
      method: 'PATCH',
      headers: {
        'Authorization': "Bearer " + token
      },
    };
    request.patch(options, function(err, resp, body) {
      console.log(body)
    })
    // let result = await request(`https://e09bbfe35b86.ngrok.io/order/${orderId}/start`,options);
    // // let output = []
    // // // console.log(result.body)
    // result = JSON.parse(result.body)
    // console.log(result)
    // return result
  },

  setComplete: async (orderId, token) => {
    const options = {
      uri: `https://e09bbfe35b86.ngrok.io/order/${orderId}/complete`,
      method: 'PATCH',
      headers: {
        'Authorization': "Bearer " + token
      },
    };
    request.patch(options, function(err, resp, body) {
      console.log(body)
    })
    // let result = await request(`https://e09bbfe35b86.ngrok.io/order/${orderId}/complete`,options);
    // // let output = []
    // // // console.log(result.body)
    // result = JSON.parse(result.body)
    // console.log(result)
    // return result
  },
}

export default OrderDetailService;