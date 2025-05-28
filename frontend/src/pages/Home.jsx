import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import MapView from '../components/MapView';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/profiles')
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-4">Profile Viewer</h1>
       <button
          onClick={() => navigate('/admin')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Admin Panel
        </button>
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    
    <div className="flex flex-wrap justify-center gap-4">
      {filteredProfiles.map((profile) => (
        <ProfileCard
          key={profile._id}
          profile={profile}
          onShowMap={setSelectedProfile}
        />
      ))}
    </div>

    {selectedProfile && (
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Location for {selectedProfile.name}</h2>
        <MapView location={selectedProfile.location} />
      </div>
    )}
  </div>
);

}

export default Home;
