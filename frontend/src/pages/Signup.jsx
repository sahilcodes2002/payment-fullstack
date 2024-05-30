import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputField } from "../components/InputField"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signup(){
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    return <div className=" h-screen bg-slate-300 flex justify-center">
            <div className=" flex flex-col justify-center">
                <div className="w-80 rounded-xl pt-3 pb-1 bg-slate-900 ">
                    <div className=" p-4 pt-3 pb-3 bg-slate-900 ">
                        <Heading title={"Sign up"}></Heading>
                    </div>
                    <div className="pt-2 text-center pl-3 pr-3">
                        <SubHeading SubHeading={"Enter your information to create an account "}></SubHeading>
                    </div>
                    <InputField onChange={(e)=>{
                        setFirstName(e.target.value);
                    }} label={"First Name"} holder={"Sahil"}></InputField>
                
                    <InputField onChange={(e)=>{
                        setLastName(e.target.value);
                    }} label={"Last Name"} holder={"Sinha"}></InputField>
                
                    <InputField onChange={(e)=>{
                        setUsername(e.target.value);
                    }} label={"Email"} holder={"sahil@gmail.com"}></InputField>
                
                    <InputField onChange={(e)=>{
                        setPassword(e.target.value);
                    }} label={"Password (minimum 8 digit)"} holder={"12345678"}></InputField>
                    
                    <div className="pl-3 mt-4 pr-3">
                        <Button onClick={async()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                firstName,
                                lastName,
                                username,
                                password
                            })
                            localStorage.setItem("token",response.data.token)
                            navigate(`/dashboard?name=${response.data.name}`)
                        }} name={"Sign up"}></Button>
                    </div>
                    <div className="pb-2">
                        <BottomWarning warning={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
                    </div>
                </div>
            </div>
    </div>
}