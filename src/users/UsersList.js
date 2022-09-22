import "./style/usersList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newRequestSchema as newUserRequestSchema } from "../user/logic/schema";
import { useUsersRequest } from "./logic/useUsersRequest";
import { useUsersResponse } from "./logic/useUsersResponse";
import { useForm } from "../_commons/logic/useForm";
import { AppContext  } from "../app/AppContext";
import { UsersContext } from "./UsersContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { List, Item } from '../_commons/List';
import { EditButton, ViewButton, TrashButton } from '../_commons/Button';
import { AdminIcon, UserIcon } from '../_commons/Icon';
import { Message } from "../_commons/Message";
import { CreateUserMiniForm, UpdateUserForm, DeleteUserForm } from "../user/UserForm";

function UsersList() {

    const { values, resetValues } = useValues( newUserRequestSchema() );
    const { message, openMessage, closeMessage } = useMessage();
    const { form, openForm, closeForm } = useForm();
    const { status, setStatus } = useRetrieveFlow( {
        values,
        resetValues,
        useRequest: useUsersRequest,
        useResponse: useUsersResponse, 
        onError: openMessage,
    } );
    
    const { users } = useContext( UsersContext );
    const { usersAutoRetrieve } = useContext( AppContext );
    
    useEffect( () => {
        if ( usersAutoRetrieve ) {
            setStatus( { triggeredFlow: true } );
        }
    }, [] );

    return (
        <>
        <List className="UsersList" disabled={ status.onRequest }>
            { users.map( ( user, index ) => 
                <Item key={ index }>
                    
                    { user.type === "ADMIN" ? <AdminIcon /> : <UserIcon /> }

                    <Text>{ user.username }</Text>

                    <Columns>
                        <EditButton onClick={ () => openForm( { onClickUpdate: true, user } ) } />
                        <ViewButton />
                        <TrashButton onClick={ () => openForm( { onClickDelete: true, user } ) } />
                    </Columns>
                </Item>
            ) }
            <Item>
                <CreateUserMiniForm user={ newUserRequestSchema() } />
            </Item>
        </List>

        { form && form.onClickUpdate
        ? <UpdateUserForm user={ form.user } closeForm={ closeForm } />
        : null 
        }

        { form && form.onClickDelete
        ? <DeleteUserForm user={ form.user } closeForm={ closeForm } />
        : null 
        }

        { message 
        ? <Message message={ message } close={ closeMessage } />        : null }
        </>
    );
}

export { UsersList };