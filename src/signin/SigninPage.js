import "./style/signinPage.css"

import { useCreateSignin } from "./logic/useSignin";
import { Page } from "../app/Page";
import { SingleColumn } from "../app/Main";
import { Column } from "../_commons/Columns";
import { Rows } from "../_commons/Rows";
import { Input } from "../_commons/Input";
import { Text } from "../_commons/Text";
import { SigninButton } from "../_commons/Button";
import { Message } from "../_commons/Message";

function SigninPage() {

    const { getValue, setValue, status, setStatus, message, closeMessage } = useCreateSignin();

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
            : null }
            </Page>
    );
}

export { SigninPage };
