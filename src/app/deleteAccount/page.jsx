'use client'
// import Image from "next/image";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import {Button} from "@nextui-org/react";
import Nav from "@/app/components/navbar";

const DeleteUser = ({ userId, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete the account?")) {
            onDelete(userId);
        }
    };

    return (
        <RootLayout>
            <Nav />
                <p className="text-center mt-4">
                    Deleting your account will permanently remove your data and you won't be able to access it anymore. Are you sure you want to proceed?
                </p>
                <br/>
                <div className="flex justify-center">
                    <Button onClick={handleDelete} color="danger">
                        Delete Account
                    </Button>
                </div>
        </RootLayout>
    );
};

export default DeleteUser;
