//@ts-nocheck
import { useRef } from "react";
import ScriptLoader from "../ScriptLoader";

type VisualizerProps = {
    uri: string;
    onLoaded?: (vis: any) => void;
}

const Visualizer = (props: VisualizerProps) => {
    const isLoaded = useRef(false);
    const visualizer = useRef(null);

    const handleContainerCallback = async (container: HTMLDivElement) => {
        if (isLoaded.current) {
            return;
        }

        const vis = await window.vis.visualize(props.uri, null, null, container, { controlPanel: false, backlink: false, token: null });
        vis.engine.darkMode = true
        vis.engine.renderingOption = "simplified"
        isLoaded.current = true;
        visualizer.current = vis;

        props.onLoaded?.(vis);
    }

    return (
        <ScriptLoader id="visualizer" src="https://app.activeloop.ai/visualizer/vis.js">
            <div id="container" ref={handleContainerCallback} />
        </ScriptLoader>
    )
}

export default Visualizer;