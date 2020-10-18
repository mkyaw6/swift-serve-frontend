
const request = require('async-request')
const ReservationService = {
  getAvailableSeats: async (startTime, endTime, token) => {
    const body = { start_time: startTime, end_time: endTime }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + token
      },
      data: JSON.stringify(body)}
    let result = await request(`https://e09bbfe35b86.ngrok.io/store/1/table/available`,options);
    result = JSON.parse(result.body).tables
    // console.log(result)
    let available = new Set();
    result.forEach((item) => available.add(item.id.toString()))
    console.log(available)
    return available;
  }

  // reserveSeat: async (startTime, endTime, tableId, token) => {
  //   const body = { start_time: startTime, end_time: endTime }
  //   const options = {
  //     method: 'PUT',
  //     headers: {
  //       'Authorization': "Bearer " + token
  //     },
  //     data: JSON.stringify(body)}
    
  //   let result = await request(`https://e09bbfe35b86.ngrok.io/table/${tableId}/reservation`,options);
  //   console.log(result.body)
  //   // return result.body.tables
  // },
  // unreserveSeat: (seatId) =>{
  //   console.log(seatId)
  // }
}

// const time = "2020-10-18T03:51:52"
// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZjNjMDUwY2QtMzNkNS00MzQ2LTgyZjEtNDVjZDQyZjYxYWZjIiwiYXVkIjoiZmFzdGFwaS11c2VyczphdXRoIiwiZXhwIjoxNjAzMDAzNzAyfQ.fuupSn2fyFTP-OcSoGyNFbLAF-W5rGN0qfr-v0J5Yk0'
// ReservationService.reserveSeat(time, time, 3, token)

export default ReservationService;