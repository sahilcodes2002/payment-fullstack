import { Button2 } from "./Button2";
import { useNavigate } from "react-router-dom";



export function UserName({user,name}){
    const navigate = useNavigate();
    return <div className="rounded-lg align-middle flex justify-between m-1 bg-gray-200">
        <div className="flex p-1">
            <div className="rounded-full bg-green-500 text-center font-sm pt-1.5 h-9 w-9">
                {user.firstName[0].toUpperCase()}
            </div>

            <div className="align-middle pt-2.5 pl-3">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="p-1.5">
            <Button2 onClick={()=>{
                navigate(`/send?id=${user._id}&name=${user.firstName}&myname=${name}`)
            }} name={"Send money"}></Button2>
        </div>

    </div>
}