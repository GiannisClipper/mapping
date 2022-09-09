import { useContext, useEffect } from "react"; 
import { useCreateFlow } from "../../_commons/logic/useFlow";
import { useValues } from "../../_commons/logic/useValues";
import { newRequestSchema as newSigninRequestSchema } from "./schema";
import { useSigninValidation } from "./useSigninValidation";
import { useSigninRequest } from "./useSigninRequest";
import { useSigninResponse } from "./useSigninResponse";
import { useMessage } from "../../_commons/logic/useMessage";
import { SearchContext } from "../../search/SearchContext";
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { AppContext } from "../../app/AppContext";

function useCreateSignin() {

    const { status, setStatus, setAssets } = useCreateFlow();
    const { values, getValue, setValue, setInitial } = useValues( newSigninRequestSchema() );
    const { validation, onValidate } = useSigninValidation( { values, setStatus } );
    const { request, onPostRequest } = useSigninRequest( { status, setStatus } );
    const { onCreate } = useSigninResponse( { setInitial, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const appContext = useContext( AppContext );

    useEffect( () => {
        const onClose = () => {
            searchContext.setMaps( [] ); 
            myMapsContext.setMaps( [] ); 
            appContext.setPage( "HOME" );
        }    
            setAssets( { values, validation, onValidate, request, onPostRequest, onCreate, onError, onClose } );
    }, [ 
        setAssets, values, validation, onValidate, request, onPostRequest, onCreate, onError,
        searchContext, myMapsContext, appContext 
    ] );

    return { getValue, setValue, status, setStatus, message, closeMessage };
}

export { useCreateSignin };