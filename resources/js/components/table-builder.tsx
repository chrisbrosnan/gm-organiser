export default function TableBuilder({
    columns,
    data,
    actions
}){
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column} className="border border-gray-300 p-2 text-left">{column}</th>
                    ))}
                    {actions && actions.length > 0 && (
                        <th className="border border-gray-300 p-2 text-left">Actions</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column) => (
                            <td key={column} className="border border-gray-300 p-2">{row[column]}</td>
                        ))}
                        {actions && actions.length > 0 && (
                            <td className="border border-gray-300 p-2">
                                {actions.map((action, actionIndex) => (
                                    <button key={actionIndex} onClick={() => action.onClick(row)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                                        {action.label}
                                    </button>
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
