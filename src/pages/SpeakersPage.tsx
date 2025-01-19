import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Speaker from '../models/speaker';

const SpeakersPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [speakerCount, setSpeakerCount] = useState(1);

  const [speakerData, setSpeakerData] = useState({
    name: '',
    bio: '',
    expertise: '',
    email: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSpeakerData({ ...speakerData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const speakerId = speakerCount.toString().padStart(2, '0');
    setSpeakerCount(speakerCount + 1);

    const newSpeaker = new Speaker(
      speakerData.name,
      speakerData.bio,
      speakerData.expertise,
      speakerData.email
    );
    setSpeakers([...speakers, newSpeaker]);
    setShowPopup(false);
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

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              type="button"
              className="absolute top-3 right-4 text-gray-700 hover:text-red-600 focus:outline-none"
              onClick={() => setShowPopup(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl mb-6 text-center font-bold">Add New Speaker</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Speaker Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Speaker Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={speakerData.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expertise">
                    Expertise
                  </label>
                  <input
                    type="text"
                    id="expertise"
                    name="expertise"
                    value={speakerData.expertise}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={speakerData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={speakerData.bio}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 relative mx-auto hover:animate-background transition-all"
          >
            {/* Three dots icon */}
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                // Add click handler for the icon if needed
                // onClick={() => handleIconClick(speaker.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  />
                </svg>
              </button>
            </div>

            {/* Speaker Details */}
            <h3 className="text-lg font-medium text-gray-900">{speaker.name}</h3>
            <p className="text-sm text-gray-700">{speaker.expertise}</p>
            <p className="text-sm text-gray-700">Bio: {speaker.bio}</p>
            <p className="text-sm text-gray-700">Email: {speaker.email}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default SpeakersPage;
