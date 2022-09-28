import "./style/button.css";

import { setClassName } from "./logic/helpers";
import { 
    LoaderIcon, OkIcon, SaveIcon, TrashIcon, CancelIcon, CloseIcon,
    AddIcon, EditIcon, MappingIcon, NavIcon, ViewIcon, NullIcon,
    SimpleDownArrowIcon, SimpleRightArrowIcon,
    HomeIcon, SearchIcon, SigninIcon, MapIcon, ProfileIcon, UsersIcon, SignoutIcon,
} from "./Icon.js";

function Button( { className, onClick, disabled, style, ...props } ) {

    return (
        <button className={ setClassName( "Button", className ) } onClick={ onClick } disabled={ disabled } style={ style }>
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

const CloseButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "CloseButton", className ) } { ...props }>
        <CloseIcon title={ title } />
        { props.children }
    </Button>
);

const OkButton = ( { className, title,...props } ) => (
    <WaitingButton className={ setClassName( "OkButton", className ) } { ...props }>
        <OkIcon title={ title } />
        { props.children }
    </WaitingButton>
);

const CancelButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "CancelButton", className ) } { ...props }>
        <CancelIcon title={ title } />
        { props.children }
    </Button>
);

const AddButton = ( { className, title, ...props } ) => (
    <WaitingButton className={ setClassName( "AddButton", className ) } { ...props }>
        <AddIcon title={ title } />
        { props.children }
    </WaitingButton>
);

const EditButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "EditButton", className ) } { ...props }>
        <EditIcon title={ title } />
        { props.children }
    </Button>
);

const MappingButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "MappingButton", className ) } { ...props }>
        <MappingIcon title={ title } />
        { props.children }
    </Button>
);

const SaveButton = ( { className, title, ...props } ) => (
    <WaitingButton className={ setClassName( "SaveButton", className ) } { ...props }>
        <SaveIcon title={ title } />
        { props.children }
    </WaitingButton>
);

const TrashButton = ( { className, title, ...props } ) => (
    <WaitingButton className={ setClassName( "TrashButton", className ) } { ...props }>
        <TrashIcon title={ title } />
        { props.children }
    </WaitingButton>
);

const ViewButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "ViewButton", className ) } { ...props }>
        <ViewIcon title={ title } />
        { props.children }
    </Button>
);

const NavButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "NavButton", className ) } { ...props }>
        <NavIcon title={ title } />
        { props.children }
    </Button>
);

const NullButton = ( { className, ...props } ) => (
    <Button className={ setClassName( "NullButton", className ) } disabled={ true } { ...props }>
        <NullIcon />
        { props.children }
    </Button>
);

const ColorButton = ( { className, color, ...props } ) => (
    <Button className={ setClassName( "ColorButton", className ) } { ...props }>
        <div style={ { color: color, backgroundColor: color } } title={ color }></div>
    </Button>
);

const SimpleDownArrowButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "SimpleDownArrowButton", className ) } { ...props }>
        { props.children }
        <SimpleDownArrowIcon title={ title } />
    </Button>
);

const SimpleRightArrowButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "SimpleRightArrowButton", className ) } { ...props }>
        { props.children }
        <SimpleRightArrowIcon title={ title } />
    </Button>
);

const HomeButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "HomeButton", className ) } { ...props }>
        <HomeIcon title={ title } />
        { props.children }
    </Button>
);

const SearchButton = ( { className, title, ...props } ) => (
    <WaitingButton className={ setClassName( "SearchButton", className ) } { ...props }>
        <SearchIcon title={ title } />
        { props.children }
    </WaitingButton>
);

const SigninButton = ( { className, title, ...props } ) => (
    <WaitingButton className={ setClassName( "SigninButton", className ) } { ...props }>
        <SigninIcon title={ title } />
        { props.children }
    </WaitingButton>
);

const MapButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "MapButton", className ) } { ...props }>
        <MapIcon title={ title } />
        { props.children }
    </Button>
);

const ProfileButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "ProfileButton", className ) } { ...props }>
        <ProfileIcon title={ title } />
        { props.children }
    </Button>
);

const UsersButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "UsersButton", className ) } { ...props }>
        <UsersIcon title={ title } />
        { props.children }
    </Button>
);

const SignoutButton = ( { className, title, ...props } ) => (
    <Button className={ setClassName( "SignoutButton", className ) } { ...props }>
        <SignoutIcon title={ title } />
        { props.children }
    </Button>
);

export { 
    Button, WaitingButton,
    CloseButton, OkButton, CancelButton,
    AddButton, EditButton, MappingButton, SaveButton, TrashButton, ViewButton, NavButton, 
    NullButton, ColorButton,
    SimpleDownArrowButton, SimpleRightArrowButton,
    HomeButton, SearchButton, SigninButton, MapButton, ProfileButton, UsersButton, SignoutButton,
};
