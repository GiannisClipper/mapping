import "./style/message.css";

import { Modal } from "./Modal"; 
import { CloseMiniButton } from "./Button";

function Message( { close, ...props } ) {

    return (
        <Modal>
            <div className="Message">
                { props.children }
                <br /><br /><br />
                <CloseMiniButton onClick={ close }/>
            </div>
        </Modal>
    ) 
}

export { Message };