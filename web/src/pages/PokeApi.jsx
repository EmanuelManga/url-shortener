import { useState, useEffect } from "react";
import Table from "../components/Table";
// import "./App.css";

function PokeApi() {
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
            const data = await response.json();
            setItems(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const updateTable = async (url) => {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
        setLoading(false);
    };

    return (
        <>
            {items.results ? (
                <Table
                    items={items.results}
                    keys={["name", "url"]}
                    url_next={items.next}
                    url_previous={items.previous}
                    onPageChange={updateTable}
                    loading={loading}
                />
            ) : (
                <p>Cargando...</p>
            )}
        </>
    );
}

export default PokeApi;
