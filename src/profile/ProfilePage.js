import { useContext } from 'react';
import { SigninContext } from "../signin/SigninContext";
import { useMessage } from '../_commons/logic/useMessage';
import { useValues } from '../_commons/logic/useValues';
import { newProfileSchema } from "./logic/schema";
import { useRetrieveFlow, useUpdateFlow } from '../_commons/logic/useFlow';
import { useProfileRequest } from './logic/useProfileRequest';
import { useProfileResponse } from './logic/useProfileResponse';
import { Page } from '../app/Page';
import { SingleColumn } from '../_templates/Main';
import { LoaderIcon } from '../_commons/Icon';
import { UpdateProfileForm } from "./ProfileForm";
import { Message } from "../_commons/Message";

function ProfilePage() {

    const { responseSignin: { user_id: id } } = useContext( SigninContext );
    const { values, setValues } = useValues( newProfileSchema( { id } ) );
    const { message, openMessage, closeMessage } = useMessage();

    const { status: retrieveStatus } = useRetrieveFlow( {
        values,
        setValues,
        useRequest: useProfileRequest,
        useResponse: useProfileResponse, 
        onError: openMessage,
        initialStatus: { triggeredFlow: true }
    } );

    useUpdateFlow( {
        values,
        setValues,
        useRequest: useProfileRequest,
        useResponse: useProfileResponse, 
        onError: openMessage,
    } );

    return (
        <Page className="ProfilePage">
            <SingleColumn>
                { Object.keys( retrieveStatus ).length > 0
                ? <LoaderIcon />
                : <UpdateProfileForm user={ values.changeable } closeForm={ () => window.history.back() } />
                }
            </SingleColumn>

            { message 
            ? <Message message={ message } onClose={ closeMessage } />        
            : null 
            }
        </Page>
    );
}

export { ProfilePage };
