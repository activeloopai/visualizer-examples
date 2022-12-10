import React, { useRef } from 'react';

const importScripts = (onload: ()=>void) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://app.activeloop.ai/visualizer/vis.js"
  script.onload = onload
  document.body.appendChild(script);
}

function App() {
  const elementRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<any>(null)
  let loadingEngine = false
  const loadCallback = () => {
    if (elementRef.current && !loadingEngine && !engineRef.current) {
      loadingEngine = true
      /// @ts-ignore
      window.vis.visualize("hub://activeloop/mnist-train", null, null, elementRef.current, {
          backlink: false,
      }).then((e: any) => {
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
