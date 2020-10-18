
const ReservationService = {
  reserveSeat: (seatId) =>{
    const options = {
      headers: {
        'Authorization': "Bearer " + token
      }
    };
    
    let result = await request.put(`https://e09bbfe35b86.ngrok.io/table/${seatId}/reservation`,options);
    console.log(result.body)
    return result.body.tables
  },
  unreserveSeat: (seatId) =>{
    console.log(seatId)
  }
}

export default ReservationService;