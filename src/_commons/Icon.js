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
    <i class="ri-home-2-line"></i></Icon>;

const SigninIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SigninIcon", className ) } title="Signin" { ...props }>
    <i class="ri-login-box-line"></i></Icon>;

const SignoutIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SignoutIcon", className ) } title="Signout" { ...props }>
    <i class="ri-logout-box-r-line"></i></Icon>;

const SearchIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SearchIcon", className ) } title="Search" { ...props }>
    <i class="ri-search-line"></i></Icon>;

const MyMapsIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "MyMapsIcon", className ) } title="MyMaps" { ...props }>
    <i class="ri-map-2-line"></i></Icon>;

const ProfileIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "ProfileIcon", className ) } title="Profile" { ...props }>
    <i class="ri-user-line"></i></Icon>;

const AdminIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "AdminIcon", className ) } title="Admin" { ...props }>
    <i class="ri-admin-line"></i></Icon>;

const UserIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UserIcon", className ) } title="User" { ...props }>
    <i class="ri-user-line"></i></Icon>;

const UsersIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UsersIcon", className ) } title="Users" { ...props }>
    <i class="ri-user-search-line"></i></Icon>;

const SaveIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SaveIcon", className ) } title="Save" { ...props }>
    <i class="ri-save-3-fill"></i></Icon>;

const CreateIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "CreateIcon", className ) } title="Create" { ...props }>
    <i class="ri-add-line"></i></Icon>;

const UpdateIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UpdateIcon", className ) } title="Update" { ...props }>
    <i class="ri-edit-2-line"></i></Icon>;

const MappingIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "MappingIcon", className ) } title="Mapping" { ...props }>
    <i class="ri-guide-line"></i></Icon>;

const ViewIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "ViewIcon", className ) } title="View" { ...props }>
    <i class="ri-computer-line"></i></Icon>;

const DeleteIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "DeleteIcon", className ) } title="Delete" { ...props }>
    <i class="ri-delete-bin-line"></i></Icon>;

const OkIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "OkIcon", className ) } title="Ok" { ...props }>
    <i class="ri-check-line"></i></Icon>;

const CancelIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "CancelIcon", className ) } title="Cancel" { ...props }>
    <i class="ri-close-line"></i></Icon>;

const CloseIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "CloseIcon", className ) } title="Close" { ...props }>
    <i class="ri-close-line"></i></Icon>;

const UnpublishedIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "UnpublishedIcon", className ) } title="Unpublished" { ...props }>
    <i class="ri-lock-fill"></i></Icon>;

const PublishedIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "PublishedIcon", className ) } title="Published" { ...props }>
    <i class="ri-lock-unlock-line"></i></Icon>;

const QuestionmarkIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "QuestionmarkIcon", className ) } title="Questionmark" { ...props }>
    <i class="ri-question-mark"></i></Icon>;

const NullIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "NullIcon", className ) } title="" { ...props }>
    <i class="ri-question-mark"></i></Icon>;

const LoaderIcon = ( { className, ...props } ) => 
    <RotatingIcon className={ setClassName( "LoaderIcon", className ) } title="" { ...props }>
    <i class="ri-loader-2-line"></i></RotatingIcon>;

const SimpleRightArrowIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SimpleRightArrowIcon", className ) } title="" { ...props }>
    <i class="ri-arrow-drop-right-line"></i></Icon>;

const SimpleDownArrowIcon = ( { className, ...props } ) => 
    <Icon className={ setClassName( "SimpleDownArrowIcon", className ) } title="" { ...props }>
    <i class="ri-arrow-drop-down-line"></i></Icon>;

export { 
    HomeIcon, SigninIcon, SignoutIcon, SearchIcon, MyMapsIcon, ProfileIcon, AdminIcon, UserIcon, UsersIcon,
    CreateIcon, UpdateIcon, MappingIcon, ViewIcon, DeleteIcon, 
    SaveIcon, OkIcon, CancelIcon, CloseIcon,
    PublishedIcon, UnpublishedIcon,
    QuestionmarkIcon, NullIcon, LoaderIcon,
    SimpleRightArrowIcon, SimpleDownArrowIcon,
};