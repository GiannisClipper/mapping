import "./style/icon.css";

function Icon( { className, onClick, title, ...props } ) {

    className = ( className || "" ) + ( onClick ? " onClick" : "" );

    return (
        <div className={ `Icon ${className}` } onClick={ onClick } title={ title }>
            { props.children }
        </div>
    );
}

function RotatingIcon( props ) {
    return (
        <div className={ `Icon RotatingIcon` }>
            { props.children }
        </div>
    );
}

const HomeIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Home page">
    <i class="ri-home-2-line"></i></Icon>;

const SigninIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Signin">
    <i class="ri-login-box-line"></i></Icon>;

const SignoutIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Signout">
    <i class="ri-logout-box-r-line"></i></Icon>;

const SearchIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Search">
    <i class="ri-search-line"></i></Icon>;

const MyMapsIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="MyMaps">
    <i class="ri-map-2-line"></i></Icon>;

const ProfileIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Profile">
    <i class="ri-user-line"></i></Icon>;

const UsersIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Profile">
    <i class="ri-user-search-line"></i></Icon>;

const SaveIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Save">
    <i class="ri-save-3-fill"></i></Icon>;

const CreateIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Add">
    <i class="ri-add-line"></i></Icon>;

const UpdateIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Edit">
        <i class="ri-edit-2-line"></i></Icon>;

const DrawIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Draw">
    <i class="ri-route-line"></i></Icon>;

const ShowIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Show">
    <i class="ri-computer-line"></i></Icon>;

const DeleteIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Delete">
    <i class="ri-delete-bin-line"></i></Icon>;

const OkIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Ok">
    <i class="ri-check-line"></i></Icon>;

const CancelIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Cancel">
    <i class="ri-close-line"></i></Icon>;

const CloseIcon = ( { onClick, title } ) => 
    <Icon onClick={ onClick } title={ title || "Close" }>
    <i class="ri-close-line"></i></Icon>;

const UnpublishedIcon = ( { onClick, title } ) => 
    <Icon onClick={ onClick } title={ title || "Unpublished" }>
    <i class="ri-lock-fill"></i></Icon>;

const PublishedIcon = ( { onClick, title } ) => 
    <Icon onClick={ onClick } title={ title || "Published" }>
    <i class="ri-lock-unlock-line"></i></Icon>;

const LoaderIcon = () => <RotatingIcon><i class="ri-loader-2-line"></i></RotatingIcon>;

export { 
    HomeIcon, SigninIcon, SignoutIcon, SearchIcon, MyMapsIcon, ProfileIcon, UsersIcon,
    CreateIcon, UpdateIcon, DrawIcon, ShowIcon, DeleteIcon, 
    SaveIcon, OkIcon, CancelIcon, CloseIcon,
    PublishedIcon, UnpublishedIcon,
    LoaderIcon
};