"use client"

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import RootLayout from "@/app/layout";
import { Button, ButtonGroup, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Nav from "@/app/components/navbar";
import { EyeFilledIcon } from "@/app/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/components/EyeSlashFilledIcon";

const Signup = () => {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");

    const [isMobileInvalid, setIsMobileInvalid] = useState(false);
    const [isAgeInvalid, setIsAgeInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    useEffect(() => {
        setIsPasswordMismatch(password !== passwordConf);
    }, [password, passwordConf]);

    useEffect(() => {
        if (email === "") setIsEmailInvalid(true);
        else {
            setIsEmailInvalid(!validateEmail(email))
        }
    }, [email]);


    useEffect(() => {
        setIsMobileInvalid(isNaN(mobile));
    }, [mobile]);

    useEffect(() => {
        setIsAgeInvalid(isNaN(age));
    }, [age]);

    const toggleVisibility1 = () => setIsVisible1(!isVisible1);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);

    const handleSubmit = async (event) => {

        event.preventDefault();
        //
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            // body: "Helo",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Redirect to the home page
            router.push('/accounts/login')

        } else {
            // Show error message
        }
    };

    const genders = [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" }
    ]

    return (
        <RootLayout>
            <Nav />
            <form onSubmit={handleSubmit} className="w-1/3 mx-auto flex flex-col space-y-4">
                <br />
                <Input isRequired name="name" label="Name" />
                <Input isRequired name="email" label="Email" type="email"
                    value={email}
                    onValueChange={setEmail}
                    isInvalid={isEmailInvalid}
                    color={isEmailInvalid ? "danger" : "default"}
                    errorMessage={isEmailInvalid && "Please enter a valid email"} />
                <Input isRequired name="uname" label="Username" />
                <Input isRequired name="password"
                    value={password}
                    onValueChange={setPassword}
                    label="Password" type={isVisible1 ? "text" : "password"} endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility1}>
                            {isVisible1 ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    } />
                <Input isRequired name="passwordConf"
                    value={passwordConf}
                    onValueChange={setPasswordConf}
                    isInvalid={isPasswordMismatch}
                    errorMessage={isPasswordMismatch && "Passwords do not match"}

                    label="Confirm Password" type={isVisible2 ? "text" : "password"} endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                            {isVisible2 ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    } />
                <Input isRequired name="mobile" label="Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    onValueChange={setMobile}
                    isInvalid={isMobileInvalid}
                    color={isMobileInvalid ? "danger" : "default"}
                    errorMessage={isMobileInvalid && "Please enter a valid number"} />
                <Input isRequired name="age" label="Age"
                    value={age}
                    onValueChange={setAge}
                    color={isAgeInvalid ? "danger" : "default"}
                    isInvalid={isAgeInvalid}
                    errorMessage={isAgeInvalid && "Please enter a valid number"} />
                <Select isRequired name="gender" label="Gender" items={genders}>
                    {(gender) => <SelectItem key={gender.value}>{gender.label}</SelectItem>}
                </Select>

                <Button type="submit">Signup</Button>

            </form>
        </RootLayout>
    );
}

export default Signup;
