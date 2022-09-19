import "./style/signinPage.css"

import { useContext } from "react"; 
import { useCreateFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newRequestSchema as newSigninRequestSchema } from "./logic/schema";
import { useSigninValidation } from "./logic/useSigninValidation";
import { useSigninRequest } from "./logic/useSigninRequest";
import { useSigninResponse } from "./logic/useSigninResponse";
import { useMessage } from "../_commons/logic/useMessage";
import { SearchContext } from "../search/SearchContext";
import { MyMapsContext } from "../myMaps/MyMapsContext";
import { AppContext } from "../app/AppContext";import { Page } from "../app/Page";
import { SingleColumn } from "../app/Main";
import { Column } from "../_commons/Columns";
import { Rows } from "../_commons/Rows";
import { Input } from "../_commons/Input";
import { Text } from "../_commons/Text";
import { SigninButton } from "../_commons/Button";
import { Message } from "../_commons/Message";

function SigninPage() {

    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const appContext = useContext( AppContext );

    const onFinish = () => {
        searchContext.setMaps( [] ); 
        myMapsContext.setMaps( [] ); 
        appContext.setPage( { page: "HOME" } );
    }    

    const { values, getValue, setValue, resetValues } = useValues( newSigninRequestSchema() );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useCreateFlow( {
        values,
        resetValues,
        useValidation: useSigninValidation,
        useRequest: useSigninRequest,
        useResponse: useSigninResponse, 
        onError: openMessage,
        onFinish
    } );

    const onClickSignin = () => setStatus( { triggeredFlow: true } );

    return (
        <Page>
            <SingleColumn>
            <Column className="signin">
            <Rows>
                <Input
                    placeholder="Username..."
                    value={ getValue( "username" ) }
                    onChange={ e => setValue( "username", e.target.value ) } 
                />
                <Input
                    placeholder="Password..."
                    value={ getValue( "password" ) }
                    onChange={ e => setValue( "password", e.target.value ) } 
                />
                <SigninButton onClick={ onClickSignin } isWaiting={ status.onRequest }>
                    <Text>Signin</Text>
                </SigninButton>
            </Rows>
            </Column>
            </SingleColumn>

            { message 
            ? <Message close={ closeMessage }>{ message }</Message>
            : null 
            }
        </Page>
    );
}

export { SigninPage };
