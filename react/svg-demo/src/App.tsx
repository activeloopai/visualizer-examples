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

    let boxes = []
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .5, y: .47 } }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .6, y: .47 } }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .7, y: .47 } }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .35, y: .83 } }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .45, y: .83 } }, { x: 1, y: .12 }));
    boxes.push(e.addSvg(boxString, 0, { coord: { x: .55, y: .83 } }, { x: 1, y: .12 }));

    let peoples = []
    peoples.push(e.addSvg(personString, 0, { coord: { x: .35, y: .47 } }, { x: 1, y: .12 }))
    peoples.push(e.addSvg(personString, 0, { coord: { x: .5, y: .65 } }, { x: 1, y: .12 }))
    peoples.push(e.addSvg(personString, 0, { coord: { x: .65, y: .83 } }, { x: 1, y: .12 }))

    e.onClick = (sampleIndex: number) => {
      if (sampleIndex >= 0) {
        const pin = e.addSvg(pinString, sampleIndex, { coord: e.getHoverCoord(sampleIndex) }, { x: .1, y: .1 });
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
        <a>
          <img className="site-logo"
            src="https://static.wixstatic.com/media/8eae5a_d7938906c3264579b155e8092ff7d459~mv2.png/v1/fill/w_1650,h_280,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_white-01.png"
            alt="Home" width="165" height="28" />
        </a>
        <button onClick={handleHideShowBoxes}>Hide/show boxes</button>
        <button onClick={handleHideShowPeople}>Hide/show peoples</button>
        <button onClick={handleHideShowPins}>Hide/show pins</button>
      </div>
      <Visualizer uri="hub://activeloop/rembrandt" onLoaded={handleVisualizerLoaded} />
    </div>
  )
}

export default App
