import UserAvatar from "./UserAvatar";

export default function ContainerCard({ container }) {
  return (
    <article className="collection-card">
<img
  src={container.image}
  alt={container.title}
  style={{ height: "78px", alignSelf: "stretch", objectFit: "cover" }}
/>

      
      <div className="inner-collection-card">
      <h3 style={{ fontSize:"12px" }}>{container.title}</h3>


      <h2>{container.assets} New Assets Added</h2>


      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "0.5em" }}>
        <UserAvatar uid={container.owner} size={24} />
      </div>
      <p>{container.edited}</p>
      </div>
    </article>
  );
}
