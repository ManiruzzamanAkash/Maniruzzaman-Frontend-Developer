/**
 * Internal dependencies.
 */
import {Overlay} from "./Overlay";
import {IModal} from "../../interfaces";

const Modal = ({show = false, title = '', onCloseModal, children}: IModal) => {
    return (
        <>
            {show && (
                <>
                    <Overlay show={show}/>
                    <div className="bsf-spacex-modal">
                        <div className="modal-header">
                            <div className="">
                                {
                                    title.length > 0 &&
                                    <h2 className="modal-title">{title}</h2>
                                }
                            </div>
                            <div className="modal-close">
                                <button onClick={onCloseModal}>
                                    &times;
                                </button>
                            </div>
                        </div>

                        <div>{children}</div>
                    </div>
                </>
            )}
        </>
    );
};

export default Modal;
