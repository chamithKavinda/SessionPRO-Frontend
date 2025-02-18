import React from 'react';

interface SpeakerFormPopupProps {
  showPopup: boolean;
  speakerData: { 
    name: string;
    bio: string;
    expertise: string;
    email: string;
    image: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  onClose: () => void;
}

const SpeakerFormPopup: React.FC<SpeakerFormPopupProps> = ({ showPopup, speakerData, handleInputChange, handleSubmit, handleFileChange, removeImage, onClose }) => {
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
            <h2 className="text-2xl mb-6 text-center font-bold">Add New Speaker</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Speaker Name</label>
                <input type="text" id="name" name="name" value={speakerData.name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expertise">Expertise</label>
                <input type="text" id="expertise" name="expertise" value={speakerData.expertise} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={speakerData.email} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" value={speakerData.bio} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Speaker Image</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              {speakerData.image && (
                <div className="md:col-span-2 relative flex flex-col items-center">
                  <img src={speakerData.image} alt="Speaker" className="w-32 h-32 object-cover rounded-full mb-2" />
                  <div className="absolute top-0 right-0 cursor-pointer mt-2 mr-2" onClick={removeImage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              )}
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

export default SpeakerFormPopup;
