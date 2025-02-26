import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavBar from '../../components/user/UserNavBar';
import UserSpeakerCard from '../../components/user/UserSpeakerCard';
import Speaker from '../../models/speaker';
import { toast } from 'react-toastify';

const SpeakersPage = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/speaker');
      setSpeakers(response.data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
      toast.error("Failed to fetch speakers");
    }
  };

  return (
    <div>
      <UserNavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {speakers.map((speaker) => (
          <UserSpeakerCard
            key={speaker.speakerEmail}
            speaker={speaker}
          />
        ))}
      </div>
    </div>
  );
};

export default SpeakersPage;
