import { useState, useRef } from "react";

function useFlow() {

    const [ status, setStatus ] = useState( {} );
    const assets = useRef( {} );
    const setAssets = passval => assets.current = passval; 

    return { status, setStatus, assets, setAssets };
}

export { useFlow };