import axios from "axios";
import { useEffect, useState } from "react";

export function Balance(){
    const [balance, setBalance] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        const fetchBalance = () => {
            axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if(balance!=response.data.balance){
                    setBalance(response.data.balance);
                }
                
            }).catch(error => {
                console.error("Error fetching balance:", error);
            });
        };

        fetchBalance();
        const interval = setInterval(fetchBalance, 5000);

        return () => clearInterval(interval);
    }, []);

    return(
    <div className="p-2 flex">
        <div className="p-2 font-bold">
            Your Balance
        </div>
        <div className="p-2 flex">
            <div className="font-bold pr-1">Rs</div>
            <div>{balance}</div>
        </div>

    </div>)
}

