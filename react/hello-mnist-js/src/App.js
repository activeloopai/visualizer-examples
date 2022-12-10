import { useRef } from 'react';

const importScripts = (onload) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://app.activeloop.ai/visualizer/vis.js"
  script.onload = onload
  document.body.appendChild(script);
}

function App() {
  const elementRef = useRef(null)
  const engineRef = useRef(null)
  let loadingEngine = false
  const loadCallback = () => {
    if (elementRef.current && !loadingEngine && !engineRef.current) {
      loadingEngine = true
      window.vis.visualize("hub://activeloop/mnist-train", null, null, elementRef.current, {
        backlink: false,
      }).then(e => {
        loadingEngine = false
        engineRef.current = e
      })
    }
  }
  importScripts(loadCallback)
  return (
    <div ref={elementRef}></div>
  );
}

export default App;
