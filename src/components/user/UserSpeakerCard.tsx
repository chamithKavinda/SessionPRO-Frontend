import React from 'react';

interface SpeakerCardProps {
  speaker: {
    speakerEmail: string;
    name: string;
    bio: string;
    expertise: string;
    image: string;
  };
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  const imageSrc = speaker.image.startsWith('data:image/')
    ? speaker.image
    : `data:image/jpeg;base64,${speaker.image}`;

  return (
    <article
      key={speaker.speakerEmail}
      className="w-[250px] h-[320px] mx-auto hover:animate-background rounded-xl shadow-2xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] transition-transform duration-300 transform hover:translate-y-[-10px]"
    >
      <div className="rounded-[10px] bg-white p-4 h-full !pt-12 sm:p-6">
        <img
          src={imageSrc}
          alt={`${speaker.name}'s image`}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
          {speaker.name}
        </h3>
        <p className="mt-0 text-sm">{speaker.bio}</p>
        <p className="mt-2 text-sm text-gray-700">Email: {speaker.speakerEmail}</p>
        <p className="mt-1 text-sm text-gray-700">Expertise: {speaker.expertise}</p>
      </div>
    </article>
  );
};

export default SpeakerCard;
