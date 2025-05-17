import { useEffect, useState } from "react";


export default function UserAvatar({ uid, size = 24, showTitle = false }) {
  const [user, setUser] = useState({});


  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
      );
      const data = await response.json();
      setUser(data);
    }
    getUser();
  }, [uid]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <img
        src={user?.image || "https://placehold.co/50x50.webp"}
        alt={user?.name}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <span style={{ fontSize: '0.95em' }}>
        {user?.name}
        {showTitle && user?.title ? ` – ${user.title}` : null}
      </span>
    </div>
  );
}
