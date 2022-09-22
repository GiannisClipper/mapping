import "./style/message.css";

import { Modal } from "./Modal"; 
import { CloseMiniButton } from "./Button";

function Message( { message, close, ...props } ) {

    message = Array.isArray( message ) ? message : [ message ];

    return (
        <Modal>
            <div className="Message">
                <div className="title">
                    <CloseMiniButton onClick={ close } />
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