import { useEffect, useState } from "react";
import CollectionCard from "../components/CollectionCard";
import Logo from "../images/darklogo.svg";

export default function LibraryPage() {
    const [collections, setCollections] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const [filteredCollections, setFilteredCollections] = useState([]); // State for filtered collections

    // Fetch collections
    useEffect(() => {
        async function fetchCollections() {
            const response = await fetch(
                "https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/collections.json"
            );
            const data = await response.json();
            const collectionsArray = Object.keys(data).map((collectionId) => ({
                id: collectionId,
                ...data[collectionId],
            }));
            setCollections(collectionsArray);
            setFilteredCollections(collectionsArray); // Initialize filtered collections
        }

        fetchCollections();
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter collections based on the search query
        const filtered = collections.filter((collection) =>
            collection.title.toLowerCase().includes(query)
        );
        setFilteredCollections(filtered);
    };

    return (
        <section className="page">
            <div className="logo-container">
                <img src={Logo} alt="Logo" className="logo" />
            </div>

            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="Search assets, collections..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                </div>

        
                <div
    className="pill-container"
    style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        gap: "10px",
        padding: "10px 0",
        scrollbarWidth: "none", // Hides scrollbar in Firefox
        msOverflowStyle: "none", // Hides scrollbar in IE/Edge
    }}
>
    <style>
        {`
        .pill-container::-webkit-scrollbar {
            display: none; /* Hides scrollbar in WebKit browsers */
        }
        `}
    </style>
    <div className="pill">Assets</div>
    <div className="pill">Collections</div>
    <div className="pill">Containers</div>
    <div className="pill">Projects</div>
</div>

                <div className="grid" style={{ marginTop: "20px" }}>
                    {filteredCollections.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            </div>
        </section>
    );
}