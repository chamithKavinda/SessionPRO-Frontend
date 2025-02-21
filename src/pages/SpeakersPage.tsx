import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SpeakerFormPopup from '../components/SpeakerFormPopup';
import SpeakerCard from '../components/SpeakerCard';
import Speaker from '../models/speaker';
import { toast } from 'react-toastify';

const SpeakersPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [editingSpeakerEmail, setEditingSpeakerEmail] = useState<string | null>(null);
  const [selectedSpeakerEmail, setSelectedSpeakerEmail] = useState<string | null>(null);
  const [mode, setMode] = useState<'add' | 'update'>('add');

  const [speakerData, setSpeakerData] = useState({
    name: '',
    bio: '',
    expertise: '',
    speakerEmail: '',
    image: ''
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/speaker');
      setSpeakers(response.data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
      toast.error("Failed to fetch speakers");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpeakerData({ ...speakerData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSpeakerData({ ...speakerData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', speakerData.name);
    formData.append('bio', speakerData.bio);
    formData.append('expertise', speakerData.expertise);
    formData.append('speakerEmail', speakerData.speakerEmail);
    if (file) {
      formData.append('image', file);
    }

    if (editingSpeakerEmail) {
      try {
        const response = await axios.put(`http://localhost:3000/speaker/${editingSpeakerEmail}`, formData);
        setSpeakers((prevSpeakers) =>
          prevSpeakers.map((speaker) =>
            speaker.speakerEmail === editingSpeakerEmail ? response.data : speaker
          )
        );
        setEditingSpeakerEmail(null);
        toast.success("Speaker updated successfully!");
      } catch (error) {
        console.error("Error updating speaker:", error);
        toast.error("Failed to update speaker");
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/speaker', formData);
        setSpeakers((prevSpeakers) => [...prevSpeakers, response.data]);
        toast.success("Speaker added successfully!");
      } catch (error) {
        console.error("Error adding speaker:", error);
        toast.error("Failed to add speaker");
      }
    }

    setSpeakerData({
      name: '',
      bio: '',
      expertise: '',
      speakerEmail: '',
      image: ''
    });
    setFile(null);
    setShowPopup(false);
  };

  const handleOptionsClick = (speakerEmail: string) => {
    setSelectedSpeakerEmail((prev) => (prev === speakerEmail ? null : speakerEmail));
  };

  const handleDeleteSpeaker = async (speakerEmail: string) => {
    try {
      await axios.delete(`http://localhost:3000/speaker/${speakerEmail}`);
      setSpeakers(speakers.filter((speaker) => speaker.speakerEmail !== speakerEmail));
      toast.success("Speaker deleted successfully!");
    } catch (error) {
      console.error("Error deleting speaker:", error);
      toast.error("Failed to delete speaker");
    }
  };

  const handleUpdateSpeaker = (speakerEmail: string) => {
    const speaker = speakers.find((s) => s.speakerEmail === speakerEmail);
    if (speaker) {
      const image = speaker.image.startsWith('data:image/') ? speaker.image : `data:image/jpeg;base64,${speaker.image}`;
      setSpeakerData({
        name: speaker.name,
        bio: speaker.bio,
        expertise: speaker.expertise,
        speakerEmail: speaker.speakerEmail,
        image: image
      });
      setEditingSpeakerEmail(speakerEmail);
      setMode('update');
      setShowPopup(true);
      toast.info(`Editing speaker: ${speaker.name}`);
    }
  };

  const handleAddSpeaker = () => {
    setSpeakerData({
      name: '',
      bio: '',
      expertise: '',
      speakerEmail: '',
      image: ''
    });
    setMode('add');
    setShowPopup(true);
  };

  const removeImage = () => {
    setSpeakerData({ ...speakerData, image: '' });
    setFile(null);
  };

  return (
    <div>
      <NavBar />
      <button
        className="relative rounded-full bg-gray-700 ml-8 mt-8 px-4 py-2 font-mono font-bold text-white transition-colors duration-700 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-black hover:bg-black hover:before:bg-black"
        onClick={handleAddSpeaker}
      >
        Add Speaker
      </button>

      <SpeakerFormPopup
        showPopup={showPopup}
        mode={mode}
        speakerData={speakerData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        removeImage={removeImage}
        onClose={() => setShowPopup(false)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {speakers.map((speaker) => (
          <SpeakerCard
            key={speaker.speakerEmail}
            speaker={speaker}
            handleOptionsClick={handleOptionsClick}
            handleUpdateSpeaker={handleUpdateSpeaker}
            handleDeleteSpeaker={handleDeleteSpeaker}
            selectedSpeakerEmail={selectedSpeakerEmail}
          />
        ))}
      </div>
    </div>
  );
};

export default SpeakersPage;
