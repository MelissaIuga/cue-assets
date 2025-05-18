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
        <h3 style={{ fontSize: "12px" }}>{container.title}</h3>


        <h2>{container.assets} New Assets Added</h2>

        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  {/* User Avatar and Name */}
  <div style={{ display: "flex", alignItems: "center"}}>
    <UserAvatar uid={container.ownerImage} size={24} />
    <p style={{ margin: 0 }}>{container.owner}</p>
  </div>

  {/* Edited Text */}
  <p style={{ marginLeft: 43 }}>{container.edited}</p>
  
</section>
      </div>
    </article>
  );
}
