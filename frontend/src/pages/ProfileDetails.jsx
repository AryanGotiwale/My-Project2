import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profiles/${id}`) // Adjust port if needed
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
          <p className="text-gray-600 mb-4">{profile.description}</p>

          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Email:</span> {profile.email || "Not provided"}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Phone:</span> {profile.phone || "Not provided"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Location:</span>{" "}
              {profile.location?.lat}, {profile.location?.lng}
            </p>
          </div>

          <Link
            to="/"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded transition"
          >
            ← Back to Profiles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
