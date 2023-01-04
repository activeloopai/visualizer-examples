import { Fragment, PropsWithChildren, useEffect, useState } from "react";

const loadScript = (id: string, src: string, callback?: () => void) => {
    const isScriptLoaded = document.getElementById(id);

    if (!isScriptLoaded) {
        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        // script.async = true;
        document.body.appendChild(script);

        script.onload = () => callback?.();
    }
}

type ScriptLoaderProps = PropsWithChildren<{
    id: string;
    src: string;
}>;

const ScriptLoader = (props: ScriptLoaderProps) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    console.log(isScriptLoaded);

    useEffect(() => loadScript(props.id, props.src, () => setIsScriptLoaded(true)));

    if (!isScriptLoaded) return null;

    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default ScriptLoader;