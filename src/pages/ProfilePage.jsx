import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import UserCollections from "../components/UserCollections";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Logo from "../images/darklogo.svg";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  const userUrl = `https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser?.uid}.json`;

  // Fetch user data on component mount
  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(userUrl);
        const data = await response.json();

        if (data) {
          setName(data.name || "");
          setTitle(data.title || "");
          setMail(data.mail || "");
          setImage(data.image || "");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data.");
      }
    }
    getUser();
  }, [userUrl]);

  // Save user data
  async function handleSaveUser(event) {
    event.preventDefault();

    const user = { name, title, mail, image };

    try {
      const response = await fetch(userUrl, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to save user data.");
      }
    } catch (error) {
      setErrorMessage("Sorry, something went wrong. Please try again.");
    }
  }

  // Handle image upload
  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size < 500000) {
      try {
        const imageUrl = await uploadImage(file);
        setImage(imageUrl);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to upload image.");
      }
    } else {
      setErrorMessage("The image file is too big! Please upload a file smaller than 0.5MB.");
    }
  }

  // Upload image to Firebase Storage
  async function uploadImage(imageFile) {
    const storage = getStorage();
    const storageRef = ref(storage, `profile-images/${auth.currentUser?.uid}/${imageFile.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl;
    } catch (error) {
      throw new Error("Image upload failed.");
    }
  }

  // Handle sign out
  function handleSignOut() {
    signOut(auth).catch(() => setErrorMessage("Failed to sign out."));
  }

  return (
    <section className="page">
      <div className="logo-container">
                      <img src={Logo} alt="Logo" className="logo" />
                  </div>
      <div className="container">
        {/* Profile Image Section */}
        <div className="profile-image-container" style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            id="image"
            className="image-preview"
            src={image || "https://placehold.co/150x150?text=Profile+Image"}
            alt="Profile"
            onError={(e) => (e.target.src = "https://placehold.co/150x150?text=Error+loading+image")}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current.click()}
          />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={() => fileInputRef.current.click()}>Upload Image</button>
            <button onClick={() => setImage("")} style={{ backgroundColor: "red", color: "white" }}>
              Remove Image
            </button>
          </div>
        </div>

        <h2>Profile</h2>
        <form className="form-grid" onSubmit={handleSaveUser}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Type name"
          />

          <label htmlFor="email">Mail</label>
          <input
            type="email"
            value={mail}
            name="email"
            placeholder="Type email"
            disabled
          />

          <input
            type="file"
            className="hide"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {errorMessage && (
            <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="formbtn">
            <button type="submit">Save User</button>
          </div>
        </form>

        <div className="btns" style={{ marginTop: "20px" }}>
          <button className="btn-cancel" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

    </section>
  );
}