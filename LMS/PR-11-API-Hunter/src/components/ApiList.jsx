import ApiCard from "./ApiCard";

const ApiList = ({ apis }) => {
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
            {apis.map((api, index) => (
                <ApiCard key={index} api={api} />
            ))}
        </div>
    );
};

export default ApiList;