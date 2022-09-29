import "./style/usersList.css";

import { useContext } from "react"; 
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
import { Input } from "../_commons/Input";
import { Text } from "../_commons/Text";
import { List, Item } from '../_commons/List';
import { NullButton, AddButton, EditButton, ViewButton, TrashButton } from '../_commons/Button';
import { NullIcon, LoaderIcon, AdminIcon, UserIcon } from '../_commons/Icon';
import { Message } from "../_commons/Message";
import { CreateUserForm, UpdateUserForm, DeleteUserForm } from "../user/UserForm";

function UsersList() {

    const { usersAutoRetrieve } = useContext( AppContext );

    const initialStatus = usersAutoRetrieve ? { triggeredFlow: true } : null;

    const { values, resetValues } = useValues( newUserRequestSchema() );
    const { message, openMessage, closeMessage } = useMessage();
    const { form, openForm, closeForm } = useForm();
    const { status } = useRetrieveFlow( {
        values,
        resetValues,
        useRequest: useUsersRequest,
        useResponse: useUsersResponse, 
        onError: openMessage,
        initialStatus
    } );

    const { users } = useContext( UsersContext );

    return (
        <>
        <List className="UsersList" disabled={ Object.keys( status ).length > 0 }>

            { Object.keys( status ).length > 0
            ? 
            <LoaderIcon />
            :

            <>
            { users.map( ( user, index ) => 
                <Item key={ index }>
                    
                    { user.type === "ADMIN" ? <AdminIcon /> : <UserIcon /> }

                    <Text>{ user.username }</Text>

                    <Columns>
                        <EditButton 
                            title="Update user" 
                            onClick={ () => openForm( { onClickUpdate: true, user } ) }
                        />
                        <ViewButton 
                            title="View user" 
                        />
                        <TrashButton 
                            title="Delete user" 
                            onClick={ () => openForm( { onClickDelete: true, user } ) } 
                        />
                    </Columns>
                </Item>
            ) }

            <Item>
                <NullIcon />
                <Input 
                    placeholder="Create new user..." 
                    onClick={ () => openForm( { onClickCreate: true } ) } 
                />
                <Columns>
                    <AddButton onClick={ () => openForm( { onClickCreate: true } ) } />
                    <NullButton />
                    <NullButton />
                </Columns>
            </Item>
            </>

            }
        </List>

        { form && form.onClickCreate
        ? <CreateUserForm user={ newUserRequestSchema() } closeForm={ closeForm } />
        : null 
        }

        { form && form.onClickUpdate
        ? <UpdateUserForm user={ form.user } closeForm={ closeForm } />
        : null 
        }

        { form && form.onClickDelete
        ? <DeleteUserForm user={ form.user } closeForm={ closeForm } />
        : null 
        }

        { message 
        ? <Message message={ message } onClose={ closeMessage } />        
        : null 
        }
        </>
    );
}

export { UsersList };