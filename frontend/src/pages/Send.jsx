import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
export function SendMoney(){
    const [amount,SetAmount] = useState("");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const myname = searchParams.get("myname");
    const navigate = useNavigate()

    return <div className="h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div>
                <div>
                    

                    <div className="w-80 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-4xl text-center font-medium text-gray-900 dark:text-white pt-5 pb-5 mb-5">
                            Send Money
                        </div>

                        <div className="flex mb-5">
                            <div className="rounded-full bg-green-500 text-center py-3.5 px-5">
                                {name[0].toUpperCase()}
                            </div>
                            <div className="py-3.5 pl-3 text-slate-100">
                                {name}
                            </div>
                        </div>
                        
                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount (in Rs)</label>
                                <input onChange={(e)=>{
                                    SetAmount(e.target.value);
                                }} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter amount" required />
                            </div>
                            
                            
                            <button onClick={()=>{
                                const token = localStorage.getItem('token');
                                axios.post("http://localhost:3000/api/v1/account/transfer",{
                                    amount:amount,
                                    to:id
                                },{
                                    headers:{
                                        'Authorization': `Bearer ${token}`
                                    }
                                })
                                alert("Transfer successfull")
                                navigate(`/dashboard?name=${myname}`)
                            }} className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Initiate Transfer</button>
                        
                    </div>

                </div>
            </div>
        </div>
    </div>
}