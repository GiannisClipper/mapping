import "./style/button.css";

import { LoaderIcon, OkIcon, SaveIcon, DeleteIcon, CancelIcon } from "./Icon.js";
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

const OkButton = ( { className,...props } ) => (
    <WaitingButton className={ `OkButton ${className}` } { ...props }>
        <OkIcon />
        <Text>Ok</Text>
    </WaitingButton>
);

const CreateButton = ( { className, ...props } ) => (
    <WaitingButton className={ `CreateButton ${className}` } { ...props }>
        <SaveIcon />
        <Text>CreateButton</Text>
    </WaitingButton>
);

const UpdateButton = ( { className, ...props } ) => (
    <WaitingButton className={ `UpdateButton ${className}` } { ...props }>
        <SaveIcon />
        <Text>Update</Text>
    </WaitingButton>
);

const DeleteButton = ( { className, ...props } ) => (
    <WaitingButton className={ `DeleteButton ${className}` } { ...props }>
        <DeleteIcon />
        <Text>Delete !!</Text>
    </WaitingButton>
);

const CancelButton = ( { onClick } ) => (
    <Button className="CancelButton" onClick={ onClick }>
        <CancelIcon />
        <Text>Cancel</Text>
    </Button>
);

export { OkButton, CreateButton, UpdateButton, DeleteButton, CancelButton };
