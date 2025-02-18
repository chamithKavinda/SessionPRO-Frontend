import React, { useState } from 'react';
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

  const [speakerData, setSpeakerData] = useState({
    name: '',
    bio: '',
    expertise: '',
    email: '',
    image: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpeakerData({ ...speakerData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingSpeakerEmail) {
      setSpeakers((prevSpeakers) =>
        prevSpeakers.map((speaker) =>
          speaker.speakerEmail === editingSpeakerEmail ? { ...speaker, ...speakerData } : speaker
        )
      );
      setEditingSpeakerEmail(null);
      toast.success("Speaker updated successfully!");
    } else {
      const newSpeaker = new Speaker(
        speakerData.name,
        speakerData.bio,
        speakerData.expertise,
        speakerData.email,
        speakerData.image
      );
      setSpeakers((prevSpeakers) => [...prevSpeakers, newSpeaker]);
      toast.success("Speaker added successfully!");
    }

    setSpeakerData({
      name: '',
      bio: '',
      expertise: '',
      email: '',
      image: ''
    });

    setShowPopup(false);
  };

  const handleOptionsClick = (speakerEmail: string) => {
    setSelectedSpeakerEmail((prev) => (prev === speakerEmail ? null : speakerEmail));
  };

  const handleDeleteSpeaker = (speakerEmail: string) => {
    setSpeakers(speakers.filter((speaker) => speaker.speakerEmail !== speakerEmail));
    setSelectedSpeakerEmail(null);

    toast.success("Speaker deleted successfully!");
  };

  const handleUpdateSpeaker = (speakerEmail: string) => {
    const speaker = speakers.find((s) => s.speakerEmail === speakerEmail);
    if (speaker) {
      setSpeakerData({
        name: speaker.name,
        bio: speaker.bio,
        expertise: speaker.expertise,
        email: speaker.speakerEmail,
        image: speaker.image
      });
      setEditingSpeakerEmail(speakerEmail);
      setShowPopup(true);

      toast.info(`Editing speaker: ${speaker.name}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSpeakerData({ ...speakerData, image: reader.result as string });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSpeakerData({ ...speakerData, image: '' });
  };

  return (
    <div>
      <NavBar />
      <button
        className="relative rounded-full bg-black ml-8 mt-8 px-4 py-2 font-mono font-bold text-white transition-colors duration-700 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-black hover:bg-black hover:before:bg-black"
        onClick={() => setShowPopup(true)}
      >
        Add Speaker
      </button>

      <SpeakerFormPopup
        showPopup={showPopup}
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
