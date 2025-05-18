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






</section>
      </div>
    </article>
  );
}
