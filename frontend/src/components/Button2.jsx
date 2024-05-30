export function Button2({name,onClick}){
    return <div>
        <button onClick={onClick} type="submit" className="text-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full px-5 py-1.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">{name}</button>
    </div>
}