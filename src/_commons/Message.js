import "./style/message.css";

import { Modal } from "./Modal"; 
import { CloseMiniButton, YesButton, NoButton } from "./Button";

function Content( { message } ) {

    message = Array.isArray( message ) ? message : [ message ];

    return (
        <div className="Content">
            { message.map( ( row, index ) => <div key={ index }>{ row }</div> ) }
        </div>
    );
}

function Buttons( props ) {

    return (
        <div className="Buttons">
            { props.children }
        </div>
    );
}

function Message( { message, onClose, ...props } ) {

    // while Modal standing as dark background of the Message, 
    // a click event passing to Modal fires Modal onClose()
    const onClick = e => e.stopPropagation();

    return (
        <Modal onClick={ onClose }>
            <div className="Message" onClick={ onClick }>
                {/* <Title onClickClose={ onClose } /> */}
                <Content message={ message } />
                <MessageButtons onClickClose={ onClose } />
            </div>
        </Modal>
    ) 
}

function MessageButtons( { onClickClose } ) {

    return (
        <Buttons>
            <CloseMiniButton onClick={ onClickClose } />
        </Buttons>
    );
}

function YesNoMessage( { message, onYes, onNo, ...props } ) {

    // while Modal standing as dark background of the Message, 
    // a click event passing to Modal fires Modal onClose()
    const onClick = e => e.stopPropagation();

    return (
        <Modal onClick={ onNo }>
            <div className="Message" onClick={ onClick }>
                {/* <Title onClickClose={ onNo } /> */}
                <Content message={ message } />
                <YesNoButtons onClickYes={ onYes } onClickNo={ onNo } />
            </div>
        </Modal>
    ) 
}

function YesNoButtons( { onClickYes, onClickNo } ) {

    return (
        <Buttons>
            <YesButton onClick={ onClickYes } />
            <NoButton onClick={ onClickNo } />
        </Buttons>
    );
}

export { Message, YesNoMessage };