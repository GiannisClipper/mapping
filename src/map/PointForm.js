import { useCreateFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { usePointValidation } from "./logic/usePointValidation";
import { usePointResponse } from "./logic/usePointResponse";
import { useMessage } from "../_commons/logic/useMessage";
import { newPointSchema } from "./logic/schema";
import { Columns } from "../_commons/Columns";
import { Input } from "../_commons/Input";
import { AddButton } from "../_commons/Button";
import { Message } from "../_commons/Message";

function CreatePointMiniForm() {

    const { values, getValue, setValue, resetValues } = useValues( newPointSchema() );
    const { message, openMessage, closeMessage } = useMessage();
    const { setStatus } = useCreateFlow( {
        values,
        resetValues,
        useValidation: usePointValidation,
        useResponse: usePointResponse, 
        onError: openMessage,
    } );

    const onClickCreate = () => setStatus( { triggeredFlow: true } );

    return (
        <>
        <Input
            placeholder="Create new..."
            value={ getValue( "title" ) }
            onChange={ e => setValue( "title", e.target.value ) } 
        />
        <Columns>
            <AddButton onClick={ onClickCreate } />
        </Columns>

        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

export { CreatePointMiniForm };