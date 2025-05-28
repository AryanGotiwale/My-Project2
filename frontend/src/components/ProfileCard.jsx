import { Link } from "react-router-dom";

function ProfileCard({ profile, onShowMap }) {
  return (
    <div className="p-4 border rounded shadow-md w-full sm:w-1/2 md:w-1/3">
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-48 object-cover"
      />
      
      <h2 className="text-xl font-bold mt-2">{profile.name}</h2>
      <p>{profile.description}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => onShowMap(profile)}
          className="bg-blue-500 text-white px-4 py-1 rounded"

        >
          Summary
        </button>
        <Link
          to={`/profile/${profile._id}`}
          className="bg-gray-500 text-white px-4 py-1 rounded"
        onClick={()=>{console.log("Photo URL:", profile.photo);
          console.log("Photo URL:", profile.name)
          console.log("Photo URL:", profile.email)
}}
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;

