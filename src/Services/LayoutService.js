const request = require('async-request')

async function saveItem(item, token) {
    const { id, x, y, width, height, seats, type } = item
    const body = {
      store_id: 1,
      internal_id: type,
      x_coords: x,
      y_coords: y,
      width: width,
      height: height,
      cap: seats || 0
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': "Bearer " + token
      },
      data: JSON.stringify(body)
    };
    let result
    try {
      result = await request('https://e09bbfe35b86.ngrok.io/table',options);
    } catch(err) {
      console.log(err)
    }
    console.log(result.body)
  }

const LayoutService = {
  getLayout: async (token) => {
    let tableId = 0
    const options = {
      // url: 'https://e09bbfe35b86.ngrok.io/store/1/table',
      headers: {
        'Authorization': "Bearer " + token
      }
    };
    
    let result = await request('https://e09bbfe35b86.ngrok.io/store/1/table',options);
    let output = []
    // console.log(result.body)
    result = JSON.parse(result.body)
    if (result.tables) {
      output = result.tables.map((item) => {
        const { store_id, x_coords, y_coords, width, height, cap, internal_id, id } = item
        let isTable = internal_id == 'Table'
        if (isTable) {
          tableId += 1
        }
        return { id: id.toString(), x: x_coords, y: y_coords, width, height, type: internal_id, seats: cap, tableId: isTable ? tableId : 0}
      })
    }
    // console.log(output)
    return output
  },
  saveLayout: async(items, token) => {
    items.forEach(async item => {
      await saveItem(item, token)
    })

    // let result = await request('https://e09bbfe35b86.ngrok.io/store/1/table',options).body;
    
  } 
}

export default LayoutService;