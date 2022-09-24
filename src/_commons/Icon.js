import "./style/icon.css";

import { setClassName } from "./logic/helpers";

const Icon = ( { className, title, ...props } ) => (
    <div className={ setClassName( "Icon", className ) } title={ title }>
        { props.children }
    </div>
);

function RotatingIcon( { className, ...props } ) {
    return (
        <Icon className={ setClassName( "RotatingIcon", className ) } { ...props }>
            { props.children }
        </Icon>
    );
}

const HomeIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "HomeIcon", className ) } title="Home page" { ...props }>
    <i className="ri-home-2-line"></i></Icon>;

const SigninIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SigninIcon", className ) } title="Signin" { ...props }>
    <i className="ri-login-box-line"></i></Icon>;

const SignoutIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SignoutIcon", className ) } title="Signout" { ...props }>
    <i className="ri-logout-box-r-line"></i></Icon>;

const SearchIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SearchIcon", className ) } title="Search" { ...props }>
    <i className="ri-search-line"></i></Icon>;

const MyMapsIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "MyMapsIcon", className ) } title="MyMaps" { ...props }>
    <i className="ri-map-2-line"></i></Icon>;

const ProfileIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "ProfileIcon", className ) } title="Profile" { ...props }>
    <i className="ri-user-line"></i></Icon>;

const AdminIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "AdminIcon", className ) } title="Admin" { ...props }>
    <i className="ri-admin-line"></i></Icon>;

const UserIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UserIcon", className ) } title="User" { ...props }>
    <i className="ri-user-line"></i></Icon>;

const UsersIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UsersIcon", className ) } title="Users" { ...props }>
    <i className="ri-user-search-line"></i></Icon>;

const SaveIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SaveIcon", className ) } title="Save" { ...props }>
    <i className="ri-save-3-fill"></i></Icon>;

const CreateIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "CreateIcon", className ) } title="Create" { ...props }>
    <i className="ri-add-line"></i></Icon>;

const UpdateIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UpdateIcon", className ) } title="Update" { ...props }>
    <i className="ri-edit-2-line"></i></Icon>;

const MappingIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "MappingIcon", className ) } title="Mapping" { ...props }>
    <i className="ri-guide-line"></i></Icon>;

const NavIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "NavIcon", className ) } title="Navigate" { ...props }>
    <i className="ri-compass-discover-line"></i></Icon>;

const ViewIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "ViewIcon", className ) } title="View" { ...props }>
    <i className="ri-computer-line"></i></Icon>;

const DeleteIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "DeleteIcon", className ) } title="Delete" { ...props }>
    <i className="ri-delete-bin-line"></i></Icon>;

const OkIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "OkIcon", className ) } title="Ok" { ...props }>
    <i className="ri-check-line"></i></Icon>;

const CancelIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "CancelIcon", className ) } title="Cancel" { ...props }>
    <i className="ri-close-line"></i></Icon>;

const CloseIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "CloseIcon", className ) } title="Close" { ...props }>
    <i className="ri-close-line"></i></Icon>;

const UnpublishedIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UnpublishedIcon", className ) } title="Unpublished" { ...props }>
    <i className="ri-lock-fill"></i></Icon>;

const PublishedIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "PublishedIcon", className ) } title="Published" { ...props }>
    <i className="ri-lock-unlock-line"></i></Icon>;

const QuestionmarkIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "QuestionmarkIcon", className ) } title="Questionmark" { ...props }>
    <i className="ri-question-mark"></i></Icon>;

const NullIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "NullIcon", className ) } title="" { ...props }>
    <i className="ri-question-mark"></i></Icon>;

const LoaderIcon = ( { className, ...props } ) => 
    <RotatingIcon className={ setClassName( "LoaderIcon", className ) } title="" { ...props }>
    <i className="ri-loader-2-line"></i></RotatingIcon>;

const SimpleRightArrowIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SimpleRightArrowIcon", className ) } title="" { ...props }>
    <i className="ri-arrow-drop-right-line"></i></Icon>;

const SimpleDownArrowIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SimpleDownArrowIcon", className ) } title="" { ...props }>
    <i className="ri-arrow-drop-down-line"></i></Icon>;

export { 
    HomeIcon, SigninIcon, SignoutIcon, SearchIcon, MyMapsIcon, ProfileIcon, AdminIcon, UserIcon, UsersIcon,
    CreateIcon, UpdateIcon, MappingIcon, NavIcon, ViewIcon, DeleteIcon, 
    SaveIcon, OkIcon, CancelIcon, CloseIcon,
    PublishedIcon, UnpublishedIcon,
    QuestionmarkIcon, NullIcon, LoaderIcon,
    SimpleRightArrowIcon, SimpleDownArrowIcon,
};