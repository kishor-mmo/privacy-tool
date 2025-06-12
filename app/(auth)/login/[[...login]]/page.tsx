"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoginFailed, setIsLoginFailed] = useState(false)

    const loginHandleClick = () =>{
        console.log("login clicked")
        if(username === "admin" && password === "admin@1234"){
            // console.log("login successful")
            setIsLoggedIn(true)
        }else{
            console.log("login failed")
            // setIsLoggedIn(false)
            setIsLoginFailed(true)
        }
    }
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };
    return (
        isLoggedIn ? window.location.href = "/dsar-request":
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" value={username} onChange={handleUsernameChange} placeholder="abcd@gmail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">New Password</Label>
                                <PasswordInput
                                    id="password"
                                    // onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    placeholder="*****"
                                    value={password} onChange={handlePasswordChange}
                                />
                            </div>

                        </div>
                    </form>
                    <Label className="text-red-500 flex justify-center pt-5">{isLoginFailed ? "Login Failed" : ""}</Label>
                </CardContent>
                <CardFooter className="flex justify-center">
                    {/* <Button variant="outline">Cancel</Button> */}
                    <Button onClick={loginHandleClick}>Login</Button>
                </CardFooter>
            </Card>
        </div>
    )
}