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
import { CreateUserForm, UpdateUserForm, DeleteUserForm } from "../user/UserForm";

function UsersList() {

    const { status, setStatus, setAssets } = useRetrieveFlow();
    const { values } = useValues( newUserRequestSchema() );
    const { request, onGetRequest } = useUsersRequest( { status, setStatus } );
    const { onRetrieve } = useUsersResponse( { setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => { setAssets( { values, request, onGetRequest, onRetrieve, onError } ) } );

    const { form, openForm, closeForm } = useForm();
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
                <CreateUserForm user={ newUserRequestSchema() } />
            </Item>
        </List>

        { form && form.onClickUpdate
        ? <UpdateUserForm user={ form.user } onClose={ closeForm } />
        : null }

        { form && form.onClickDelete
        ? <DeleteUserForm user={ form.user } onClose={ closeForm } />
        : null }

        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

export { UsersList };