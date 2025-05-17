import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CollectionCard from "../components/CollectionCard";
import ContainerCard from "../components/ContainerCard";
import Logo from "../images/darklogo.svg";

export default function HomePage() {
  const [collections, setCollections] = useState([]);
  const [containers, setContainers] = useState([]);


  // Fetch collections
  useEffect(() => {
    async function fetchCollections() {
      const response = await fetch(
        "https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/collections.json"
      );
      const data = await response.json();
      const collectionsArray = Object.keys(data).map(collectionId => ({
        id: collectionId,
        ...data[collectionId]
      }));
      setCollections(collectionsArray);
    }

    fetchCollections();
  }, []);

  // Fetch containers
  useEffect(() => {
    async function fetchContainers() {
      const response = await fetch(
        "https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/containers.json"
      );
      const data = await response.json();
      const containersArray = Object.keys(data).map(containerId => ({
        id: containerId,
        ...data[containerId]
      }));
      setContainers(containersArray);
    }

    fetchContainers();
  }, []);

  return (
    <section className="page">
        <div className="logo-container">
  <img src={Logo} alt="Logo" className="logo" />
</div>

      <div>
        <div style={{display:"flex", justifyContent:"space-between"}}><h2>Recently worked on</h2><h2 style={{color: " #0552B5", fontSize:"16px"}}>See All (8)</h2></div>

        <div className="grid">
          {collections.map(collection => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>

        <div style={{display:"flex", justifyContent:"space-between", paddingTop:"32px"}}><h2>Recent Updates</h2><h2 style={{color: " #0552B5", fontSize:"16px"}}>See All (6)</h2></div>
        <div className="grid">
          {containers.map(container => (
            <ContainerCard key={container.id} container={container} />
          ))}
        </div>
      </div>
    </section>
  );
}
