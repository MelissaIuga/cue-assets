import { useEffect, useState } from "react";
import CollectionFolder from '../images/folders.svg';

export default function ContainerCard({ container }) {
  const [ownerImage, setOwnerImage] = useState(""); // State to store the owner's profile picture

  useEffect(() => {
    async function fetchOwnerImage() {
      try {
        // Replace this with your Firebase database or Firestore query
        const response = await fetch(
          `https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/users.json`
        );
        const users = await response.json();

        // Find the user whose name matches the container owner
        const user = Object.values(users).find(
          (user) => user.name === container.owner
        );

        if (user) {
          setOwnerImage(user.image); // Set the owner's profile picture
        } else {
          setOwnerImage(""); // Fallback if no user is found
        }
      } catch (error) {
        console.error("Failed to fetch owner image:", error);
      }
    }

    fetchOwnerImage();
  }, [container.owner]);

  return (
    <article className="collection-card">
      {/* Container Image */}
      <img
        src={container.image}
        alt={container.title}
        style={{ height: "78px", alignSelf: "stretch", objectFit: "cover" }}
      />

      <div className="inner-collection-card">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <img
    src={CollectionFolder}
    alt="CollectionFolder"
    style={{ width: "24px", height: "24px" }}
  />
  <h3
    style={{
      fontSize: "12px",
      color: "grey",
      fontWeight: "normal",
    }}
  >
    {container.title}
  </h3>
</div>
        <h2>{container.assets} New Assets Added</h2>

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Owner Image and Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={
                ownerImage ||
                "https://placehold.co/24x24?text=?" // Fallback image if no profile picture is found
              }
              alt={container.owner}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p style={{ margin: 0 }}>{container.owner}</p>
          </div>

          {/* Edited Date */}
          <p style={{ margin: 0 }}>{container.edited}</p>
        </section>
      </div>
    </article>
  );
}