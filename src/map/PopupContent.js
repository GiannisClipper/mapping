import "./style/popupContent.css";

function PopupContent( { title, description } ) {

    return ( "<b>" + title + "</b><p>" + description + "</p>" );
}

export { PopupContent };