//@ts-nocheck
import { useRef } from "react";
import ScriptLoader from "../ScriptLoader";

type VisualizerProps = {
    uri: string;
}

const Visualizer = (props: VisualizerProps) => {
    const vis = useRef(null);

    const handleContainerCallback = async (container: HTMLDivElement) => {
        vis.current = await window.vis.visualize(props.uri, null, null, container, { controlPanel: false, backlink: false, token: null });
        vis.current.engine.darkMode = true
        vis.current.engine.renderingOption = "simplified"
    }

    return (
        <ScriptLoader id="visualizer" src="https://app.activeloop.ai/visualizer/vis.js">
            <div id="container" ref={handleContainerCallback} />
        </ScriptLoader>
    )
}

export default Visualizer;