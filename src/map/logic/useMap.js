import { useEffect } from "react"; 
import { useUpdateFlow, useCreateFlow, useDeleteFlow } from "../../_commons/logic/useFlow";
import { useValues } from "../../_commons/logic/useValues";
import { newSchema as newMapSchema } from "./schema";
import { useMapValidation } from "./useMapValidation";
import { useMapRequest } from "./useMapRequest";
import { useMapResponse } from "./useMapResponse";
import { useMessage } from "../../_commons/logic/useMessage";

function useCreateMap() {

    const { status, setStatus, setAssets } = useCreateFlow();
    const { values, getValue, setValue, setInitial } = useValues( newMapSchema() );
    const { validation, onValidate } = useMapValidation( { values, setStatus } );
    const { request, onPostRequest } = useMapRequest( { status, setStatus } );
    const { onCreate } = useMapResponse( { setInitial, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, validation, onValidate, request, onPostRequest, onCreate, onError } );
    }, [ setAssets, values, validation, onValidate, request, onPostRequest, onCreate, onError ] );

    return { getValue, setValue, status, setStatus, message, closeMessage };
}

function useUpdateMap( { map, onClose } ) {

    const { status, setStatus, setAssets } = useUpdateFlow();
    const { values, getValue, setValue, setInitial } = useValues( map );
    const { validation, onValidate } = useMapValidation( { values, setStatus } );
    const { request, onPutRequest } = useMapRequest( { status, setStatus } );
    const { onUpdate } = useMapResponse( { setInitial, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose } );
    }, [ setAssets, values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose ] );

    return { getValue, setValue, status, setStatus, message, closeMessage, onClose };
}

function useDeleteMap( { map, onClose } ) {

    const { status, setStatus, setAssets } = useDeleteFlow();
    const { values, getValue, setInitial } = useValues( map );
    const { request, onDeleteRequest } = useMapRequest( { status, setStatus } );
    const { onDelete } = useMapResponse( { setInitial, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, request, onDeleteRequest, onDelete, onError, onClose } );
    }, [ setAssets, values, request, onDeleteRequest, onDelete, onError, onClose ] );

    return { getValue, status, setStatus, message, closeMessage, onClose };
}

export { useCreateMap, useUpdateMap, useDeleteMap };