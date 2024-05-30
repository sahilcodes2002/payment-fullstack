export function Filter({onChange, label,holder}){
    return <div>
        <div>
            <div className="ml-3 mr-3">
                <label className="block mb-2 text-lg font-semibold text-gray-900">{label}</label>
                <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={holder} required />
            </div>
        </div>
    </div>
}