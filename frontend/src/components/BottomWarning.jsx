import { Link } from "react-router-dom"

export function BottomWarning({warning,to,buttonText}){
    return <div className="pt-3 flex justify-center text-gray-400 text-sm">
        <div>
            {warning}
        </div>
        <Link className="pointer curser-pointer underline" to={to}>{buttonText}</Link>
    </div>
}