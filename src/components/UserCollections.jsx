import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";


export default function UserCollections({ uid }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function getCollections() {
      const url = `https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/collections.json?orderBy="uid"&equalTo="${uid}"`;
      const response = await fetch(url);
      const data = await response.json();
      const collectionsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setCollections(collectionsArray);
    }
    if (uid) {
      getCollections();
    }
  }, [uid]);
  return (
    <section className="grid">
      {collections.length ? (
        collections.map(collection => <CollectionCard collection={collection} key={collection.id} />)
      ) : (
        <p>No posts yet</p>
      )}
    </section>
  );
}
