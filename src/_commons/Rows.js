import "./style/rows.css";

import { setClassName } from "./logic/helpers";

function Rows( { className, onClick, ...props } ) {
    return (
        <div className={ setClassName( 'Rows', className ) } onClick={ onClick } { ...props }>
            { props.children }
        </div>
    );
}

function Row( { className, onClick, ...props } ) {
    return (
        <div className={ setClassName( 'Row', className ) } onClick={ onClick } >
            { props.children }
        </div>
    );
}

export { Rows, Row };