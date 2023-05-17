import { useRef } from 'react';

const importScripts = (onload) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://app.activeloop.ai/visualizer/vis.js"
  script.onload = onload
  document.body.appendChild(script);
}

function convertPointToImagePosition(point)
{
  point.y = (1 - point.y) / 2
  point.x = (point.x + 1) / 2
  return point
}

function containsPoint(rect, point) {
  return rect.x <= point.x && rect.y <= point.y && rect.x + rect.z > point.x && rect.y + rect.w > point.y;
}

function App() {
  const elementRef = useRef(null)
  const engineRef = useRef(null)
  let loadingEngine = false
  const loadCallback = () => {
    if (elementRef.current && !loadingEngine && !engineRef.current) {
      loadingEngine = true
      window.vis.visualize("hub://sasun/tiles_example", null, null, elementRef.current, {
        backlink: false,
      }).then(e => {
        loadingEngine = false
        engineRef.current = e
        const ds = e.dataset
        const tensor = ds.tensors[1]
        tensor.requestData(0).then(d => {
          const meta = JSON.parse(d)
          e.onClick = (index, position) => {
            if (index === 0) {
              const point = convertPointToImagePosition(position)
              for (const r of meta) {
                if (containsPoint(r.rect, point)) {
                  document.body.style.backgroundColor=r.color
                  console.log(r.color)
                }
              }
            }
          }
        })
      })
    }
  }
  importScripts(loadCallback)
  return (
    <div>
      <div id='colorDiv'></div>
      <div ref={elementRef}></div>
    </div>
  );
}

export default App;
