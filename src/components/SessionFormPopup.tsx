import React from 'react';

interface SessionFormPopupProps {
  showPopup: boolean;
  sessionData: { 
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    duration: string;
    speakerName: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const SessionFormPopup: React.FC<SessionFormPopupProps> = ({ showPopup, sessionData, handleInputChange, handleSubmit, onClose }) => {
  return (
    showPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <button
            type="button"
            className="absolute top-3 right-4 text-gray-700 hover:text-red-600 focus:outline-none"
            onClick={onClose}
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
            <h2 className="text-2xl mb-6 text-center font-bold">Add New Session</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Session Name</label>
                <input type="text" id="name" name="name" value={sessionData.name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="speakerName">Speaker Name</label>
                <input type="text" id="speakerName" name="speakerName" value={sessionData.speakerName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={sessionData.date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time</label>
                <input type="time" id="time" name="time" value={sessionData.time} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
                <input type="text" id="location" name="location" value={sessionData.location} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">Duration</label>
                <input type="text" id="duration" name="duration" value={sessionData.duration} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                <textarea id="description" name="description" value={sessionData.description} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default SessionFormPopup;
