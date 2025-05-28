import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvpelkzyx/image/upload";
const UPLOAD_PRESET = "my_unsigned_preset";

function AdminPanel() {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    photo: "",
    description: "",
    email: "",
    phone: "",
    location: { lat: "", lng: "" },
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profiles")
      .then((response) => setProfiles(response.data))
      .catch((error) => console.error("Failed to fetch profiles:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lng") {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      setForm((prev) => ({ ...prev, photo: response.data.secure_url }));
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddOrUpdate = () => {
    const profileData = {
      name: form.name,
      photo: form.photo,
      description: form.description,
      email: form.email,
      phone: form.phone,
      location: {
        lat: parseFloat(form.location.lat) || 0,
        lng: parseFloat(form.location.lng) || 0,
      },
    };

    if (editId === null) {
      // Add
      axios
        .post("http://localhost:5000/api/profiles", profileData)
        .then((response) => setProfiles([...profiles, response.data]))
        .catch((error) => console.error("Add failed:", error));
    } else {
      // Update
      axios
        .put(`http://localhost:5000/api/profiles/${editId}`, profileData)
        .then((response) => {
          setProfiles(profiles.map((p) => (p._id === editId ? response.data : p)));
          setEditId(null);
        })
        .catch((error) => console.error("Update failed:", error));
    }

    // Reset form
    setForm({
      name: "",
      photo: "",
      description: "",
      email: "",
      phone: "",
      location: { lat: "", lng: "" },
    });
  };

  // Edit profile
  const handleEdit = (profile) => {
    setForm({
      name: profile.name || "",
      photo: profile.photo || "",
      description: profile.description || "",
      email: profile.email || "",
      phone: profile.phone || "",
      location: {
        lat: profile.location?.lat || "",
        lng: profile.location?.lng || "",
      },
    });
    setEditId(profile._id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/profiles/${id}`)
      .then(() => setProfiles(profiles.filter((p) => p._id !== id)))
      .catch((error) => console.error("Delete failed:", error));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Profiles</h1>
      <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go Back
        </button>
      <div className="bg-white p-4 rounded shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-2">
          {editId ? "Edit Profile" : "Add New Profile"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border rounded"
          />
          <input type="file" onChange={handleFileChange} className="p-2 border rounded" />
          {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
          {form.photo && (
            <img
              src={form.photo}
              alt="Preview"
              className="h-24 object-cover rounded border"
            />
          )}
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-2 border rounded"
          />
          <input
            name="lat"
            value={form.location.lat}
            onChange={handleChange}
            placeholder="Latitude"
            className="p-2 border rounded"
          />
          <input
            name="lng"
            value={form.location.lng}
            onChange={handleChange}
            placeholder="Longitude"
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className={`mt-4 px-4 py-2 rounded text-white ${
            editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editId ? "Update Profile" : "Add Profile"}
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Profiles List</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Photo</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile._id}>
                <td className="border p-2">{profile.name}</td>
                <td className="border p-2">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-12 w-12 object-cover"
                  />
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
