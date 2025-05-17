import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import Pinned from '../images/Pinned.svg';
import Calendar from '../images/calendar.svg';
import CollectionFolder from '../images/folders.svg';

export default function CollectionCard({ collection }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/collections/${collection.uid}`);
  }

  return (
    <article className="collection-card" onClick={handleClick}>
      <img src={collection.image} alt={collection.title} />

      <article className="inner-collection-card">

        <div className="collection-card-group">
          {collection.pinned && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src={Pinned} alt="Pinned" style={{ width: "18px", height: "18px" }} />
              <span className="pinned">Pinned</span>
            </div>
          )}

          <h3 style={{ lineHeight: "24px" }}>{collection.title}</h3>
        </div>

        <div className="collection-card-group" style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={Calendar} alt="Calendar" style={{ width: "24px", height: "24px" }} />
            <p>
              Last edited: {new Date(collection.edited).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={CollectionFolder} alt="CollectionFolder" style={{ width: "24px", height: "24px" }} />
            <p>Containers: {collection.numberOfContainers}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserAvatar uid={collection.ownerImage} size={24} />
          <p style={{ margin: 0 }}>{collection.owner}</p>
        </div>
      </article>

    </article>
  );
}
