import React from 'react';

interface SpeakerCardProps {
  speaker: {
    speakerEmail: string;
    name: string;
    bio: string;
    expertise: string;
    image: string;
  };
  handleOptionsClick: (speakerEmail: string) => void;
  handleUpdateSpeaker: (speakerEmail: string) => void;
  handleDeleteSpeaker: (speakerEmail: string) => void;
  selectedSpeakerEmail: string | null;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, handleOptionsClick, handleUpdateSpeaker, handleDeleteSpeaker, selectedSpeakerEmail }) => {
  return (
    <article
      key={speaker.speakerEmail}
      className="w-[250px] h-[350px] mx-auto hover:animate-background rounded-xl shadow-2xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
    >
      <div className="relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => handleOptionsClick(speaker.speakerEmail)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
        </button>

        {selectedSpeakerEmail === speaker.speakerEmail && (
          <div className="absolute top-0 right-0 mt-8 w-32 bg-gray-100 shadow-lg rounded-lg p-2">
            <button onClick={() => handleUpdateSpeaker(speaker.speakerEmail)} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2">Update</button>
            <button onClick={() => handleDeleteSpeaker(speaker.speakerEmail)} className="block w-full text-left text-gray-700 hover:bg-red-300 p-2">Delete</button>
          </div>
        )}
      </div>

      <div className="rounded-[10px] bg-white p-4 h-full !pt-12 sm:p-6">
        <img src={speaker.image} alt={`${speaker.name}'s image`} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
        <h3 className="mt-0.5 text-lg font-medium text-gray-900">{speaker.name}</h3>
        <p className="mt-2 text-sm">{speaker.bio}</p>
        <p className="mt-3 text-sm text-gray-700">Expertise: {speaker.expertise}</p>
        <p className="mt-1 text-sm text-gray-700">Email: {speaker.speakerEmail}</p>
      </div>
    </article>
  );
};

export default SpeakerCard;
