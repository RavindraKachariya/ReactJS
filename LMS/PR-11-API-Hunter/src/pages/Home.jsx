import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ApiList from "../components/ApiList";

const Home = () => {
    const [apis, setApis] = useState([]);
    const [filteredApis, setFilteredApis] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchApis = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://api.publicapis.org/entries");
            setApis(res.data.entries);
            setFilteredApis(res.data.entries);
            setLoading(false);
        } catch (error) {S
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApis();
    }, []);

    useEffect(() => {
        let data = apis;

        if (search) {
            data = data.filter((api) =>
                api.API.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            data = data.filter((api) => api.Category === category);
        }

        setFilteredApis(data);
    }, [search, category]);

    const categories = [...new Set(apis.map((api) => api.Category))];

    return (
        <div>
            <Header />

            <SearchBar search={search} setSearch={setSearch} />

            <div className="flex justify-center p-2">
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat, i) => (
                        <option key={i}>{cat}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-center mt-10">Loading...</p>
            ) : (
                <ApiList apis={filteredApis} />
            )}

            <div className="text-center p-4 bg-gray-100 mt-5">
                Made by Ravindra
            </div>
        </div>
    );
};

export default Home;