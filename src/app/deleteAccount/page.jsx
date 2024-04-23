'use client'
// import Image from "next/image";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Nav from "@/app/components/navbar";

const DeleteUser = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete the account?")) {
            const uid = localStorage.getItem('uid');
            const data = { uid };
            const response = await fetch(`/api/delete`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                localStorage.clear();
                onOpen();

            } else {
                // Show error message
            }
        }

    };

    return (
        <RootLayout>
            <Nav />
            <p className="text-center mt-4">
                Deleting your account will permanently remove your data and you wont be able to access it anymore. Are you sure you want to proceed?
            </p>
            <br />
            <div className="flex justify-center">
                <Button onClick={handleDelete} color="danger">
                    Delete Account
                </Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Success!</ModalHeader>
                            <ModalBody>
                                <p>
                                    Account Successfully Deleted
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => {
                                    onClose();
                                    router.replace('/');
                                }}>
                                    OK
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </RootLayout>
    );
};

export default DeleteUser;
