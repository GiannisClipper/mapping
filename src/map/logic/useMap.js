import { useEffect } from "react"; 
import { useUpdateMapFlow, useCreateMapFlow, useDeleteMapFlow } from "./useMapFlow";
import { useMapValues } from "./useMapValues";
import { useMapValidation } from "./useMapValidation";
import { useMapRequest } from "./useMapRequest";
import { useMessage } from "../../commons/logic/useMessage";

function useCreateMap( { map } ) {

    const { status, setStatus, setAssets } = useCreateMapFlow();
    const { values, getValue, setValue, onCreate } = useMapValues( { initial: map, setStatus } );
    const { validation, onValidate } = useMapValidation( { values, setStatus } );
    const { request, onPostRequest } = useMapRequest( { status, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, validation, onValidate, request, onPostRequest, onCreate, onError } );
    }, [ setAssets, values, validation, onValidate, request, onPostRequest, onCreate, onError ] );

    return { getValue, setValue, status, setStatus, message, closeMessage };
}

function useUpdateMap( { map, onClose } ) {

    const { status, setStatus, setAssets } = useUpdateMapFlow();
    const { values, getValue, setValue, onUpdate } = useMapValues( { initial: map, setStatus } );
    const { validation, onValidate } = useMapValidation( { values, setStatus } );
    const { request, onPutRequest } = useMapRequest( { status, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose } );
    }, [ setAssets, values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose ] );

    return { getValue, setValue, status, setStatus, message, closeMessage, onClose };
}

function useDeleteMap( { map, onClose } ) {

    const { status, setStatus, setAssets } = useDeleteMapFlow();
    const { values, getValue, onDelete } = useMapValues( { initial: map, setStatus } );
    const { request, onDeleteRequest } = useMapRequest( { status, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, request, onDeleteRequest, onDelete, onError, onClose } );
    }, [ setAssets, values, request, onDeleteRequest, onDelete, onError, onClose ] );

    return { getValue, status, setStatus, message, closeMessage, onClose };
}

export { useCreateMap, useUpdateMap, useDeleteMap };