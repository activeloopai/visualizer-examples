import { useState } from 'react'
import Box from './components/svg/Box';
import Person from './components/svg/Person';
import Pin from './components/svg/Pin';
import { renderToString } from "react-dom/server";
import './App.css'
import Visualizer from './components/visualizer'

function App() {
  const [boxes, setBoxes] = useState<Array<any>>([]);
  const [people, setPeople] = useState<Array<any>>([]);
  const [pins, setPins] = useState<Array<any>>([]);

  const handleVisualizerLoaded = (vis: any) => {
    const e = vis.engine;

    const personString = renderToString(<Person />);
    const pinString = renderToString(<Pin />);
    const boxString = renderToString(<Box />);

    /// @ts-ignore
    const Anchor = window.vis.Anchor
    let boxes = []
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .5, y: .47 }, anchor: Anchor.bottom }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .6, y: .47 }, anchor: Anchor.bottom }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .7, y: .47 }, anchor: Anchor.bottom }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .35, y: .83 }, anchor: Anchor.bottom }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .45, y: .83 }, anchor: Anchor.bottom }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .55, y: .83 }, anchor: Anchor.bottom }, { x: 1, y: .12 }));

    let peoples = []
    peoples.push(e.addSvg(personString, 0, { coord: { x: .35, y: .47 }, anchor: Anchor.bottom }, { x: 1, y: .12 }))
    peoples.push(e.addSvg(personString, 0, { coord: { x: .5, y: .65 }, anchor: Anchor.bottom }, { x: 1, y: .12 }))
    peoples.push(e.addSvg(personString, 0, { coord: { x: .65, y: .83 }, anchor: Anchor.bottom }, { x: 1, y: .12 }))

    e.onClick = (sampleIndex: number) => {
      if (sampleIndex >= 0) {
        const pin = e.addSvg(pinString, sampleIndex, { coord: e.getHoverCoord(sampleIndex), anchor: Anchor.bottom }, { x: .1, y: .1 });
        setPins((pins) => [...pins, pin]);
      }
    }

    setBoxes(boxes);
    setPeople(peoples);
  }

  const handleHideShowBoxes = () => {
    boxes.forEach(box => box.hidden = !box.hidden);
  }
  const handleHideShowPeople = () => {
    people.forEach(person => person.hidden = !person.hidden);
  }
  const handleHideShowPins = () => {
    pins.forEach(pin => pin.hidden = !pin.hidden);
  }

  return (
    <div>
      <div className="topnav">
        <button onClick={handleHideShowBoxes}>Hide/show boxes</button>
        <button onClick={handleHideShowPeople}>Hide/show peoples</button>
        <button onClick={handleHideShowPins}>Hide/show pins</button>
      </div>
      <Visualizer uri="hub://activeloop/rembrandt" onLoaded={handleVisualizerLoaded} />
    </div>
  )
}

export default App
