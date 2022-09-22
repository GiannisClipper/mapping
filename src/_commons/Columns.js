import "./style/columns.css";

import { setClassName } from "./logic/helpers";

function Columns( { className, onClick, ...props } ) {
    return (
        <div className={ setClassName( 'Columns', className ) } onClick={ onClick } { ...props }>
            { props.children }
        </div>
    );
}

function Column( { className, onClick, ...props } ) {
    return (
        <div className={ setClassName( 'Column', className ) } onClick={ onClick }>
            { props.children }
        </div>
    );
}

export { Columns, Column };