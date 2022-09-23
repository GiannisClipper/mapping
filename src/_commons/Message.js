import "./style/message.css";

import { Modal } from "./Modal"; 
import { CloseMiniButton } from "./Button";

function Message( { message, onClose, ...props } ) {

    message = Array.isArray( message ) ? message : [ message ];

    return (
        <Modal onClick={ onClose }>
            <div className="Message">
                <div className="title">
                    <CloseMiniButton onClick={ onClose } />
                </div>
                <div className="content">
                    { message.map( ( mess, index ) => 
                        <div key={ index }>{ mess }</div> )
                    }
                    { props.children }
                </div>
            </div>
        </Modal>
    ) 
}

export { Message };