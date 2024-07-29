import React from "react";
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/modal';

interface ModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    modalContent: React.ReactNode;
}

export default function _Modal({isOpen, onOpenChange, modalContent}: ModalProps) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Course Details</ModalHeader>
                            <ModalBody>
                                {modalContent}
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={onClose}>
                                    Close
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
