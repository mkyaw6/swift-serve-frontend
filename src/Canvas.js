import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  SelectionLayer,
  wrapShape,
} from 'react-shape-editor';
import { Input, Label, List } from 'semantic-ui-react';
import LayoutService  from './Services/LayoutService';
import Table from './Components/Table'
import Wall from './Components/Wall'
import ModeDropdown from './Components/ModeDropdown'

function arrayReplace(arr, index, item) {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1),
  ];
}



const Editor = (props) => {
  const [items, setItems] = useState([
    { id: '0', x: 20, y: 120, width: 145, height: 140, type: 'Table', reserved: false, seats: 4, tableId: 1 },
    { id: '1', x: 15, y: 0, width: 150, height: 95, type: 'Wall' },
    { id: '2', x: 20, y: 300, width: 145, height: 140, type: 'Table', reserved: true, seats: 4, tableId: 2},
  ]);
  const { oauth } = props
  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });
  const [selectedShapeIds, setSelectedShapeIds] = useState([]);
  const [mode, setMode] = useState('Table');
  const [seats, setSeats] = useState(4);

  useEffect(() => {
    LayoutService.getLayout(oauth).then(
      (val) => {
        setItems(val)
        console.log(items)
    })
  }, [])

  let idIterator = items.length;
  function handleCopy() {
    for (let i = 0; i < selectedShapeIds.length; i++) {
      console.log(selectedShapeIds[i])
      let { x, y, width, height, type, reserved, seats } = items[selectedShapeIds[parseInt(i)]]
      let tableId = null;
      setItems(currentItems => [
        ...currentItems,
        { id: `${idIterator}`, x: x+10, y: y+10, width, height, type, reserved, seats, tableId: getTableId() },
      ]);
      idIterator += 1;
    }
  }

  async function handleSave() {
    await LayoutService.saveLayout(items, oauth);
    console.log('DOne')
  }

  function getTableId() {
    let id = 1;
    items.forEach((item) => {
      if (item.type == "Table") { id += 1}
    })
    return id
  }
  
  const tables = items.map((item, index) => {
    const { id, height, width, x, y, type, reserved, seats, tableId } = item;
    if (type == 'Table') {
      return (
        <Table key={id} active={selectedShapeIds.indexOf(id) >= 0} shapeId={id} shapeIndex={index} height={height} width={width} type = {type} x={x} y={y} reserved={reserved} seats={seats} tableId={tableId}
          onChange={newRect => {
            setItems(currentItems =>
              arrayReplace(currentItems, index, {
                ...item,
                ...newRect,
              })
            );
          }}
          onDelete={() => {
            setItems(currentItems => arrayReplace(currentItems, index, []));
          }}
        />
      );
    } 
  });
  const walls = items.map((item, index) => {
    const { id, height, width, x, y, type } = item;
    if (type == 'Wall') {
      return (
        <Wall key={id} active={selectedShapeIds.indexOf(id) >= 0} shapeId={id} shapeIndex={index} height={height} width={width} type = {type} x={x} y={y}
          onChange={newRect => {
            setItems(currentItems =>
              arrayReplace(currentItems, index, {
                ...item,
                ...newRect,
              })
            );
          }}
          onDelete={() => {
            setItems(currentItems => arrayReplace(currentItems, index, []));
          }}
        />
      );
    }
  })

  return (
      <div class="ui grid">
        <div class="twelve wide">
            <List divided relaxed>
            <List.Item> <List.Content> <ModeDropdown mode ={mode} setMode={setMode}/>  </List.Content></List.Item>
            <List.Item> <List.Content> <Label > Seats: </Label> <Input type='number' className="small" value={seats} onChange={(e) => setSeats(e.target.value)}/>  </List.Content></List.Item>
            <List.Item> <List.Content> <button className="ui tiny green button" onClick={handleSave}>Save</button></List.Content></List.Item>
            <List.Item> <List.Content> {selectedShapeIds.length > 0 ? <button className="ui tiny blue button" onClick={handleCopy}>Copy</button>: null}  </List.Content></List.Item>
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
              onChange={(newRects, selectedShapesProps) => {
                setItems(prevItems =>
                  newRects.reduce((acc, newRect, index) => {
                    const { shapeIndex } = selectedShapesProps[index];
                    const item = acc[shapeIndex];
                    return arrayReplace(acc, shapeIndex, {
                      ...item,
                      ...newRect,
                    });
                  }, prevItems)
                );
              }}
              onDelete={(event, selectedShapesProps) => {
                setItems(prevItems =>
                  selectedShapesProps
                    .map(p => p.shapeIndex)
                    .sort((a, b) => b - a)
                    .reduce(
                      (acc, shapeIndex) => arrayReplace(acc, shapeIndex, []),
                      prevItems
                    )
                );
              }}
            >
              <DrawLayer
                onAddShape={({ x, y, width, height }) => {
                  setItems(currentItems => [
                    ...currentItems,
                    { id: `${idIterator}`, x, y, width, height, type: mode, reserved: false, seats: seats, tableId: getTableId() },
                  ]);
                  idIterator += 1;
                }}
              />
              {tables}
              {walls}
            </SelectionLayer>
          </ShapeEditor>
        </div>
    </div>
  );
};




export default Editor;
