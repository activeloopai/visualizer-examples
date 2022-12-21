import React, { useEffect, useRef, useState } from 'react';

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
      window.vis.visualize("hub://activeloop/fashionpedia-train", null, null, elementRef.current, {
          backlink: false,
      }).then((e: any) => {
        loadingEngine = false
        engineRef.current = e
      })
    }
  }
  importScripts(loadCallback)
  useEffect(()=> {
    if (engineRef.current) {
      engineRef.current.setTensorHidden("", true)
      engineRef.current.setTensorHidden("images", false)
      engineRef.current.setTensorHidden("masks", false)
      const update = () => {
        if (engineRef.current.scale > 0.6) {
          engineRef.current.setTensorHidden("boxes", false)
          engineRef.current.setTensorHidden("masks", true)
        } else {
          engineRef.current.setTensorHidden("boxes", true)
          engineRef.current.setTensorHidden("masks", false)
        }
        requestAnimationFrame(update)
      }
      requestAnimationFrame(update)
    }
  }, [engineRef])
  return (
    <div ref={elementRef}></div>
  );
}

export default App;
