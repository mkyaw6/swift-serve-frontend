import React, { useState, useEffect } from 'react';
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  SelectionLayer,
  wrapShape,
} from 'react-shape-editor';
import { Container, Label, List, } from 'semantic-ui-react';
import LayoutService  from './Services/LayoutService';
import Table from './Components/Table'
import Wall from './Components/Wall'

function constrainMove(item) {
  return { x: item.originalX, y: item.originalY }
}
function constrainResize(item) {
  return { x:item.originalMovingCorner.x, y:item.originalMovingCorner.y}
}

const Editor = (props) => {
  const [items, setItems] = useState(
    [{"id":"0","x":9,"y":12,"width":86,"height":84,"type":"Table","reserved":false,"seats":4,"tableId":1},{"id":"1","x":243,"y":-9,"width":23,"height":204,"type":"Wall"},{"id":"2","x":10,"y":112,"width":87,"height":91,"type":"Table","reserved":true,"seats":4,"tableId":2},{"id":"3","x":137,"y":16,"width":82,"height":79,"type":"Table","reserved":false,"seats":4,"tableId":3},{"id":"4","x":134,"y":107,"width":94,"height":97,"type":"Table","reserved":false,"seats":4,"tableId":4},{"id":"5","x":285,"y":12,"width":91,"height":92,"type":"Table","reserved":false,"seats":4,"tableId":5},{"id":"6","x":400,"y":11,"width":92,"height":90,"type":"Table","reserved":false,"seats":4,"tableId":6},{"id":"7","x":525,"y":-1,"width":23,"height":204,"type":"Wall","tableId":7},{"id":"8","x":290,"y":122.296875,"width":195,"height":79,"type":"Table","reserved":false,"seats":4,"tableId":7},{"id":"9","x":122,"y":253,"width":94,"height":97,"type":"Table","reserved":false,"seats":4,"tableId":8},{"id":"10","x":267,"y":366,"width":94,"height":97,"type":"Table","reserved":false,"seats":4,"tableId":9},{"id":"11","x":405,"y":261,"width":94,"height":97,"type":"Table","reserved":false,"seats":4,"tableId":10},{"id":"12","x":24,"y":373,"width":94,"height":97,"type":"Table","reserved":false,"seats":4,"tableId":11}]
  );
  const { oauth } = props
  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });
  const [selectedShapeIds, setSelectedShapeIds] = useState([]);
  const [from, setFrom] = useState(getCurrDate());
  const [to, setTo] = useState(getCurrDate());

  useEffect(() => {
    // console.log(oauth)
    LayoutService.getLayout(oauth).then(
      (val) => {
        setItems(val)
    })
  }, [])

  const tables = items.map((item, index) => {
    const { id, height, width, x, y, type, reserved, seats, tableId } = item;
    if (type == 'Table') {
      return (
        <Table key={id} disabled={reserved} constrainMove={constrainMove} constrainResize={constrainResize} active={selectedShapeIds.indexOf(id) >= 0} shapeId={id} shapeIndex={index} height={height} width={width} type = {type} x={x} y={y} reserved={reserved} seats={seats} tableId={tableId}
        />
      );
    } 
  });
  const walls = items.map((item, index) => {
    const { id, height, width, x, y, type } = item;
    if (type == 'Wall') {
      return (
        <Wall key={id} disabled={true} constrainMove={constrainMove} constrainResize={constrainResize} active={selectedShapeIds.indexOf(id) >= 0} shapeId={id} shapeIndex={index} height={height} width={width} type = {type} x={x} y={y}
        />
      );
    }
  })

  function handleReserve() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id == selectedShapeIds[0]) {
        item.reserved = true
      }
    }
    setItems(items)
  }

  function getCurrDate() {
    const now = new Date();
    console.log(now.toISOString().split('.')[0])
    return now.toISOString().split('.')[0];
  }

  return (
    <div class="ui grid">
      <div class="twelve wide">
          <List divided relaxed>
            <List.Item> <List.Content> <Label>Select a table to reserve</Label>  </List.Content></List.Item>
            <List.Item> <List.Content>  <Label> From </Label> <input type="datetime-local" id="meeting-from" name="meeting-from" value={from} onChange={e=> setFrom(e.target.value)}></input>  </List.Content></List.Item>
            <List.Item> <List.Content>  <Label>  To  </Label> <input type="datetime-local" min={from} id="meeting-to" name="meeting-to" value={to} onChange={e=> setTo(e.target.value)}></input>  </List.Content></List.Item>
            <List.Item> <List.Content> {selectedShapeIds.length > 0 ? <button className="ui tiny green button" onClick={handleReserve}>Reserve Table</button> : null} </List.Content></List.Item>
          </List>
      </div>
      
      <div class="four wide">
        <ShapeEditor vectorWidth={vectorWidth} vectorHeight={vectorHeight}>
          <ImageLayer
            // Photo by Sarah Gualtieri on Unsplash
            src="canvas.jpg"
            onLoad={({ naturalWidth, naturalHeight }) => {
              setVectorDimensions({
                vectorWidth: 750,
                vectorHeight: 500,
              });
            }}
          />
          <SelectionLayer
            selectedShapeIds={selectedShapeIds}
            onSelectionChange={ids => setSelectedShapeIds(ids)}
            keyboardTransformMultiplier={5}
          >
            
          </SelectionLayer>
          {tables}
            {walls}
        </ShapeEditor>
      </div>
    </div>
  );
};




export default Editor;
