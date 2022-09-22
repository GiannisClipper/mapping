import { useCreateFlow, useUpdateFlow, useDeleteFlow } from "../../_commons/logic/useFlow";
import { useValues } from "../../_commons/logic/useValues";
import { useMessage } from "../../_commons/logic/useMessage";

function useCreateForm( { schema, useValidation, useRequest, useResponse, onSetup, onComplete, onFinish } ) {
    
    const { values, getValue, setValue, resetValues } = useValues( schema );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useCreateFlow( {
        values,
        resetValues,
        useValidation,
        useRequest,
        useResponse, 
        onError: openMessage,
        onSetup,
        onComplete,
        onFinish
    } );

    const onClickCreate = () => setStatus( { triggeredFlow: true } );
    const onClickCancel = onFinish;
    const onClickClose = onFinish;

    return { 
        values, getValue, setValue, resetValues,
        message, openMessage, closeMessage,
        status, setStatus,
        onClickCreate, onClickCancel, onClickClose,
    }
}

function useUpdateForm( { schema, useValidation, useRequest, useResponse, onSetup, onComplete, onFinish } ) {

    const { values, getValue, setValue, resetValues } = useValues( schema );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useUpdateFlow( {
        values,
        resetValues,
        useValidation,
        useRequest,
        useResponse,
        onError: openMessage,
        onSetup,
        onComplete,
        onFinish
    } );

    const onClickUpdate = () => setStatus( { triggeredFlow: true } );
    const onClickCancel = onFinish;
    const onClickClose = onFinish;

    return { 
        values, getValue, setValue, resetValues,
        message, openMessage, closeMessage,
        status, setStatus,
        onClickUpdate, onClickCancel, onClickClose,
    }
}

function useDeleteForm( { schema, useRequest, useResponse, onSetup, onComplete, onFinish } ) {

    const { values, getValue, resetValues } = useValues( schema );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useDeleteFlow( {
        values,
        resetValues,
        useRequest,
        useResponse,
        onError: openMessage,
        onSetup,
        onComplete,
        onFinish
    } );

    const onClickDelete = () => setStatus( { triggeredFlow: true } );
    const onClickCancel = onFinish;
    const onClickClose = onFinish;

    return { 
        values, getValue, resetValues,
        message, openMessage, closeMessage,
        status, setStatus,
        onClickDelete, onClickCancel, onClickClose,
    }
}

export { useCreateForm, useUpdateForm, useDeleteForm };