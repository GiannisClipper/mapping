import { Icon } from "./Basic.js";

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

const SaveIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Save">
    <i class="ri-save-3-fill"></i></Icon>;

const AddIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Add">
    <i class="ri-add-line"></i></Icon>;

const EditIcon = ( { onClick } ) => 
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

const CloseIcon = ( { onClick } ) => 
    <Icon onClick={ onClick } title="Close">
    <i class="ri-close-line"></i></Icon>;

export { 
    HomeIcon, SigninIcon, SignoutIcon, SearchIcon, MyMapsIcon, ProfileIcon,
    AddIcon, EditIcon, DrawIcon, ShowIcon, DeleteIcon, 
    SaveIcon, OkIcon, CancelIcon, CloseIcon
};