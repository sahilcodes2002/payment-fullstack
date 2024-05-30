import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputField } from "../components/InputField"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export function Signin(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    return <div className=" h-screen bg-slate-300 flex justify-center">
            <div className=" flex flex-col justify-center">
                <div className="w-80 rounded-xl pt-3 pb-1 bg-slate-900 ">
                    <div className=" p-4 pt-3 pb-3 bg-slate-900 ">
                        <Heading title={"Sign in"}></Heading>
                    </div>
                    <div className="pt-2 text-center pl-3 pr-3">
                        <SubHeading SubHeading={"Enter your information to sign in "}></SubHeading>
                    </div>
                
                    <InputField onChange={(e)=>{
                        setUsername(e.target.value)
                    }} label={"Email"} holder={"abc@xyz.com"}></InputField>
                
                    <InputField onChange={(e)=>{
                        setPassword(e.target.value)
                    }} label={"Password (minimum 8 digit)"} holder={"********"}></InputField>
                    
                    <div className="pl-3 mt-4 pr-3">
                        <Button onClick={()=>{
                            axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,
                                password
                            }).then((response)=>{
                                localStorage.setItem("token",response.data.token)
                                navigate(`/dashboard?name=${response.data.name}`)
                            })
                        }} name={"Sign in"}></Button>
                    </div>
                    <div className="pb-2">
                        <BottomWarning warning={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
                    </div>
                </div>
            </div>
    </div>
}