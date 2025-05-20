import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerCard from "../components/ContainerCard";
import { auth } from "../firebase-config";

export default function CollectionDetailPage() {
  const [collection, setCollection] = useState({});
  const [containers, setContainers] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const collectionUrl = `https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/collections/${params.id}.json`;
  const containersUrl = `https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/containers.json`;

  useEffect(() => {
    async function fetchCollection() {
      const response = await fetch(collectionUrl);
      const data = await response.json();
      if (data) {
        setCollection({ ...data, id: params.id });
      }
    }

    async function fetchContainers() {
      const response = await fetch(containersUrl);
      const data = await response.json();

      const containerArray = Object.keys(data || {}).map(id => ({
        id,
        ...data[id]
      }));

      // Optional: filter containers by collection ID if such a field exists
      // const filtered = containerArray.filter(c => c.collectionId === params.id);

      setContainers(containerArray); // or setContainers(filtered) if filtering
    }

    fetchCollection();
    fetchContainers();
  }, [params.id]);

  function navigateToUpdate() {
    navigate(`/collections/${params.id}/update`);
  }

  async function handleDelete() {
    const shouldDelete = window.confirm("Are you sure you want to delete this collection?");
    if (shouldDelete) {
      const response = await fetch(collectionUrl, { method: "DELETE" });
      if (response.ok) {
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    }
  }

  return (
    <section className="page" id="collection-page">
      <div className="container">
        <h1>{collection.title}</h1>

        {auth.currentUser?.uid === collection.owner && (
          <div className="btns">
            <button className="btn-cancel" onClick={handleDelete}>
              Delete collection
            </button>
            <button onClick={navigateToUpdate}>Update collection</button>
          </div>
        )}

<h2>{collection.title}</h2>
        <div
          className="grid"
          style={{
            display: "flex",
            flexWrap: "wrap", 
            gap: "16px", 
            justifyContent: "space-between",
          }}
        >
          {containers.map(container => (
            <ContainerCard key={container.id} container={container} />
          ))}
        </div>
      </div>
    </section>
  );
}
