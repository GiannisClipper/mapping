import "./style/button.css";

import { Columns } from "./Columns.js";
import { LoaderIcon, OkIcon, CancelIcon } from "./Icon.js";
import { Text } from "./Basics.js";

function Button( { className, onClick, ...props } ) {

    return (
        <button  className={ `Button ${className}` } onClick={ onClick }>
            { props.children }
        </button>
    ) 
}

function WaitingButton( { className, onClick, isWaiting, ...props } ) {

    return isWaiting ? (
        <Button className={ `WaitingButton ${className}` }>
            <LoaderIcon />
            { props.children[ 1 ] }
        </Button>
    ) : (
        <Button className={ `WaitingButton ${className}` } onClick={ onClick }>
            { props.children }
        </Button>
    );
}

const OkButton = ( { onClick, isWaiting } ) => (
    <WaitingButton className="OkButton" onClick={ onClick } isWaiting={ isWaiting }>
        <OkIcon />
        <Text>Ok</Text>
    </WaitingButton>
);

const CancelButton = ( { onClick } ) => (
    <Button className="CancelButton" onClick={ onClick }>
        <CancelIcon />
        <Text>Cancel</Text>
    </Button>
);

export { OkButton, CancelButton };
