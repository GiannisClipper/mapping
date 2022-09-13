import "./style/button.css";

import { setClassName } from "./logic/helpers";
import { Text } from "./Text.js";
import { 
    HomeIcon, SearchIcon, SigninIcon, MyMapsIcon, ProfileIcon, UsersIcon, SignoutIcon,
    LoaderIcon, OkIcon, SaveIcon, DeleteIcon, CancelIcon,
    CreateIcon, UpdateIcon, MappingIcon, NavigateIcon, ViewIcon, NullIcon, CloseIcon,
    SimpleDownArrowIcon, SimpleRightArrowIcon,
} from "./Icon.js";

function Button( { className, onClick, disabled, ...props } ) {

    return (
        <button  className={ setClassName( "Button", className ) } onClick={ onClick } disabled={ disabled }>
            { props.children }
        </button>
    ) 
}

function WaitingButton( { className, isWaiting, ...props } ) {

    return isWaiting ? (
        <Button className={ setClassName( "WaitingButton", className ) }>
            <LoaderIcon />
            { props.children[ 1 ] }
        </Button>
    ) : (
        <Button className={ setClassName( "WaitingButton", className ) } { ...props }>
            { props.children }
        </Button>
    );
}

const HomeButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "HomeButton", className ) } { ...props }>
        <HomeIcon />
        { props.children }
    </Button>
);

const SearchButton = ( { className, ...props } ) => (
    <WaitingButton className={ setClassName( "SearchButton", className ) } { ...props }>
        <SearchIcon />
    </WaitingButton>
);

const SigninButton = ( { className, ...props } ) => (
    <WaitingButton className={ setClassName( "SigninButton", className ) } { ...props }>
        <SigninIcon />
        { props.children }
    </WaitingButton>
);

const MyMapsButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "MyMapsButton", className ) } { ...props }>
        <MyMapsIcon />
    </Button>
);

const ProfileButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "ProfileButton", className ) } { ...props }>
        <ProfileIcon />
    </Button>
);

const UsersButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "UsersButton", className ) } { ...props }>
        <UsersIcon />
    </Button>
);

const SignoutButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "SignoutButton", className ) } { ...props }>
        <SignoutIcon />
    </Button>
);

const OkButton = ( { className,...props } ) => (
    <WaitingButton className={ setClassName( "OkButton", className ) } { ...props }>
        <OkIcon />
        <Text>Ok</Text>
    </WaitingButton>
);

const CreateButton = ( { className, ...props } ) => (
    <WaitingButton className={ setClassName( "CreateButton", className ) } { ...props }>
        <SaveIcon />
        <Text>Create</Text>
    </WaitingButton>
);

const UpdateButton = ( { className, ...props } ) => (
    <WaitingButton className={ setClassName( "UpdateButton", className ) } { ...props }>
        <SaveIcon />
        <Text>Update</Text>
    </WaitingButton>
);

const DeleteButton = ( { className, ...props } ) => (
    <WaitingButton className={ setClassName( "DeleteButton", className ) } { ...props }>
        <DeleteIcon />
        <Text>Delete</Text>
    </WaitingButton>
);

const CancelButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "CancelButton", className ) } { ...props }>
        <CancelIcon />
        <Text>Cancel</Text>
    </Button>
);

const AddButton = ( { className, ...props } ) => (
    <WaitingButton className={ setClassName( "AddButton", className ) } { ...props }>
        <CreateIcon />
    </WaitingButton>
);

const EditButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "EditButton", className ) } { ...props }>
        <UpdateIcon />
    </Button>
);

const MappingButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "MappingButton", className ) } { ...props }>
        <MappingIcon />
    </Button>
);

const NavigateButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "NavigateButton", className ) } { ...props }>
        <NavigateIcon />
    </Button>
);

const ViewButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "ViewButton", className ) } { ...props }>
        <ViewIcon />
    </Button>
);

const TrashButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "TrashButton", className ) } { ...props }>
        <DeleteIcon />
    </Button>
);

const NullButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "NullButton", className ) } disabled={ true } { ...props }>
        <NullIcon />
    </Button>
);

const CloseButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "CloseButton", className ) } { ...props }>
        <CloseIcon />
        <Text>Close</Text>
    </Button>
);

const CloseMiniButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "CloseMiniButton", className ) } { ...props }>
        <CloseIcon />
    </Button>
);

const SimpleDownArrowButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "SimpleDownArrowButton", className ) } { ...props }>
        { props.children }
        <SimpleDownArrowIcon />
    </Button>
);

const SimpleRightArrowButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "SimpleRightArrowButton", className ) } { ...props }>
        { props.children }
        <SimpleRightArrowIcon />
    </Button>
);

export { 
    HomeButton, SearchButton, SigninButton, MyMapsButton, ProfileButton, UsersButton, SignoutButton,
    OkButton, CreateButton, UpdateButton, DeleteButton, CancelButton,
    AddButton, EditButton, MappingButton, NavigateButton, ViewButton, TrashButton, NullButton,
    CloseButton, CloseMiniButton,
    SimpleDownArrowButton, SimpleRightArrowButton,
};
