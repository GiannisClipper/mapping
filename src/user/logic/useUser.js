import { useEffect } from "react"; 
import { useUpdateFlow, useCreateFlow, useDeleteFlow } from "../../_commons/logic/useFlow";
import { useValues } from "../../_commons/logic/useValues";
import { newRequestSchema as newUserRequestSchema } from "./schema";
import { useUserValidation } from "./useUserValidation";
import { useUserRequest } from "./useUserRequest";
import { useUserResponse } from "./useUserResponse";
import { useMessage } from "../../_commons/logic/useMessage";

function useCreateUser() {

    const { status, setStatus, setAssets } = useCreateFlow();
    const { values, getValue, setValue, resetValues } = useValues( newUserRequestSchema() );
    const { validation, onValidate } = useUserValidation( { values, setStatus } );
    const { request, onPostRequest } = useUserRequest( { status, setStatus } );
    const { onCreate } = useUserResponse( { resetValues, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, validation, onValidate, request, onPostRequest, onCreate, onError } );
    }, [ setAssets, values, validation, onValidate, request, onPostRequest, onCreate, onError ] );

    return { getValue, setValue, status, setStatus, message, closeMessage };
}

function useUpdateUser( { user, onClose } ) {

    const { status, setStatus, setAssets } = useUpdateFlow();
    const { values, getValue, setValue, resetValues } = useValues( user );
    const { validation, onValidate } = useUserValidation( { values, setStatus } );
    const { request, onPutRequest } = useUserRequest( { status, setStatus } );
    const { onUpdate } = useUserResponse( { resetValues, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose } );
    }, [ setAssets, values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose ] );

    return { getValue, setValue, status, setStatus, message, closeMessage, onClose };
}

function useDeleteUser( { user, onClose } ) {

    const { status, setStatus, setAssets } = useDeleteFlow();
    const { values, getValue, resetValues } = useValues( user );
    const { request, onDeleteRequest } = useUserRequest( { status, setStatus } );
    const { onDelete } = useUserResponse( { resetValues, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, request, onDeleteRequest, onDelete, onError, onClose } );
    }, [ setAssets, values, request, onDeleteRequest, onDelete, onError, onClose ] );

    return { getValue, status, setStatus, message, closeMessage, onClose };
}

export { useCreateUser, useUpdateUser, useDeleteUser };