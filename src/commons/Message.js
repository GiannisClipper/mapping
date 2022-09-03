import "./style/message.css";
import { Modal } from "./Modal"; 
import { CloseIcon } from "./Icons";

function Message( { close, ...props } ) {

    return (
        <Modal>
            <div className="Message">
                { props.children }
                <br /><br /><br />
                <CloseIcon onClick={ close }/>
            </div>
        </Modal>
    ) 
}

export { Message };