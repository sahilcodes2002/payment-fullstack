import { useEffect, useState } from "react"
import { Filter } from "../components/Filter";
import axios from "axios";
import { UserName } from "./UserName";
import { Balance } from "../components/Balance"
import { NavBar } from "./NavBar";
import { useSearchParams } from "react-router-dom";
export function Users(){
    const [filter,setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).
        then((response)=>{
            setUsers(response.data.users);
        })
    },[filter])
    return <div>
        <NavBar name={name}></NavBar>
        <div>
            <Balance></Balance>
        </div>
        <Filter onChange={(e)=>{
            setFilter(e.target.value);
        }} label={"Users"} holder={"Search users"}></Filter>
        <div className="ml-2 mr-2">
            {users.map(user=>{
                if(user.firstName!=name){
                    return <UserName key={user._id} user={user} name={name}></UserName>
                }
                
            })}
        </div>
    </div>
}