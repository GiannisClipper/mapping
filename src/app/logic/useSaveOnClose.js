import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useMessage } from "../../_commons/logic/useMessage";

function useSaveOnClose( { isChanged, flowAssets, setFlowAssets, onSave } ) {

    const { currentPage, setCurrentPage } = useContext( AppContext );
    const { message, openMessage, closeMessage } = useMessage();

    const onYesAnswer = () => { 
        closeMessage(); 
        const { onFinish } = flowAssets;
        setFlowAssets( { onFinish: () => {
            onFinish && onFinish();
            setCurrentPage( { ...currentPage, onClose: null } ); 
        } } );
        onSave();
    }
    const onNoAnswer = () => {
        closeMessage(); 
        setCurrentPage( { ...currentPage, onClose: null } );
    }

    useEffect( () => () =>
        currentPage.onClose = () => { // direct assignment, avoid repeated rerenders
            if ( isChanged() ) {
                openMessage( "Save changes before close?" );
            } else {
                setCurrentPage( { ...currentPage, onClose: null } );
            }
        }
    );

    return { message, onYesAnswer, onNoAnswer };
}

export { useSaveOnClose };