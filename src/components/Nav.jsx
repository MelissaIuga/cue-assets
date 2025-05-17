import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import homeIcon from '../images/home-default.svg';
import homeActiveIcon from '../images/home-active.svg';
import libraryIcon from '../images/library-default.svg';
import libraryActiveIcon from '../images/library-active.svg';
import uploadIcon from '../images/upload.svg';
import inboxIcon from '../images/inbox-default.svg';
import inboxActiveIcon from '../images/inbox-active.svg';

export default function Nav({ profileImage }) {
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isLibraryActive, setIsLibraryActive] = useState(false);
  const [isInboxActive, setIsInboxActive] = useState(false);
  const location = useLocation();

  const resetActiveStates = () => {
    setIsHomeActive(false);
    setIsLibraryActive(false);
    setIsInboxActive(false);
  };

  const handleHomeClick = () => {
    resetActiveStates();
    setIsHomeActive(true);
  };

  const handleLibraryClick = () => {
    resetActiveStates();
    setIsLibraryActive(true);
  };

  const handleInboxClick = () => {
    resetActiveStates();
    setIsInboxActive(true);
  };

  useEffect(() => {
    resetActiveStates();

    if (location.pathname === '/') {
      setIsHomeActive(true);
    } else if (location.pathname === '/library') {
      setIsLibraryActive(true);
    } else if (location.pathname === '/community') {
      setIsInboxActive(true);
    }
  }, [location]);

  return (
    <nav>
      <NavLink to="/" onClick={handleHomeClick}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <img
            src={isHomeActive ? homeActiveIcon : homeIcon}
            alt="Home"
            style={{ padding: '8px' }}
          />
          <span style={{ fontSize: '12px' }}>Home</span>
        </div>
      </NavLink>
      <NavLink to="/library" onClick={handleLibraryClick}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <img
            src={isLibraryActive ? libraryActiveIcon : libraryIcon}
            alt="Library"
            style={{ padding: '8px' }}
          />
          <span style={{ fontSize: '12px' }}>Library</span>
        </div>
      </NavLink>
      <NavLink to="/navigation">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <img 
            src={uploadIcon}
            alt="Upload"
            style={{ padding: '8px' }}
          />
          <span style={{ fontSize: '12px' }}>Upload</span>
        </div>
      </NavLink>
      <NavLink to="/community" onClick={handleInboxClick}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <img
            src={isInboxActive ? inboxActiveIcon : inboxIcon}
            alt="Inbox"
            style={{ padding: '8px' }}
          />
          <span style={{ fontSize: '12px' }}>Inbox</span>
        </div>
      </NavLink>
      <NavLink to="/profile">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                padding: '8px',
              }}
            />
          ) : (
            <img
              src={'../images/profile-nav.png'} // Default profile icon
              alt="Profile"
              style={{ padding: '8px' }}
            />
          )}
          <span style={{ fontSize: '12px' }}>Profile</span>
        </div>
      </NavLink>
    </nav>
  );
}