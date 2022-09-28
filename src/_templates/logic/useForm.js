import { useCreateFlow, useUpdateFlow, useDeleteFlow } from "../../_commons/logic/useFlow";
import { useValues } from "../../_commons/logic/useValues";
import { useMessage } from "../../_commons/logic/useMessage";

function useCreateForm( { schema, useValidation, useRequest, useResponse, onComplete, onFinish } ) {
    
    const { values, setValues, resetValues, getValue, setValue } = useValues( schema );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useCreateFlow( {
        values,
        setValues,
        resetValues,
        useValidation,
        useRequest,
        useResponse, 
        onError: openMessage,
        onComplete,
        onFinish
    } );

    const onClickCreate = () => setStatus( { triggeredFlow: true } );
    const onClickCancel = onFinish;
    const onClickClose = onFinish;

    return { 
        values, setValues, resetValues, getValue, setValue,
        message, openMessage, closeMessage,
        status, setStatus,
        onClickCreate, onClickCancel, onClickClose,
    }
}

function useUpdateForm( { schema, useValidation, useRequest, useResponse, onComplete, onFinish } ) {

    const { values, setValues, resetValues, getValue, setValue } = useValues( schema );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useUpdateFlow( {
        values,
        setValues,
        resetValues,
        useValidation,
        useRequest,
        useResponse,
        onError: openMessage,
        onComplete,
        onFinish
    } );

    const onClickUpdate = () => setStatus( { triggeredFlow: true } );
    const onClickCancel = onFinish;
    const onClickClose = onFinish;

    return { 
        values, setValues, resetValues, getValue, setValue,
        message, openMessage, closeMessage,
        status, setStatus,
        onClickUpdate, onClickCancel, onClickClose,
    }
}

function useDeleteForm( { schema, useRequest, useResponse, onComplete, onFinish } ) {

    const { values, setValues, resetValues, getValue, setValue } = useValues( schema );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useDeleteFlow( {
        values,
        setValues,
        resetValues,
        useRequest,
        useResponse,
        onError: openMessage,
        onComplete,
        onFinish
    } );

    const onClickDelete = () => setStatus( { triggeredFlow: true } );
    const onClickCancel = onFinish;
    const onClickClose = onFinish;

    return { 
        values, setValues, resetValues, getValue, setValue,
        message, openMessage, closeMessage,
        status, setStatus,
        onClickDelete, onClickCancel, onClickClose,
    }
}

export { useCreateForm, useUpdateForm, useDeleteForm };