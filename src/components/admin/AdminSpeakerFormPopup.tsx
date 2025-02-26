import React, { useState } from 'react';

interface SpeakerFormPopupProps {
  showPopup: boolean;
  mode: 'add' | 'update';
  speakerData: {
    name: string;
    bio: string;
    expertise: string;
    speakerEmail: string;
    image: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  onClose: () => void;
}

const SpeakerFormPopup: React.FC<SpeakerFormPopupProps> = ({
  showPopup,
  mode,
  speakerData,
  handleInputChange,
  handleSubmit,
  handleFileChange,
  removeImage,
  onClose,
}) => {
  const [errors, setErrors] = useState({
    name: '',
    expertise: '',
    speakerEmail: '',
    bio: '',
  });

  const validateField = (name: string, value: string) => {
    const namePattern = /^[A-Za-z\s]+$/;
    const expertisePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bioPattern = /.{4,500}/;

    switch (name) {
      case 'name':
        return value.trim() === ''
          ? 'Speaker name is required'
          : !namePattern.test(value)
          ? 'Speaker name should contain only letters and spaces'
          : '';
      case 'expertise':
        return value.trim() === ''
          ? 'Expertise is required'
          : !expertisePattern.test(value)
          ? 'Expertise should contain only letters and spaces'
          : '';
      case 'speakerEmail':
        return value.trim() === ''
          ? 'Email is required'
          : !emailPattern.test(value)
          ? 'Invalid email format'
          : '';
      case 'bio':
        return value.trim() === ''
          ? 'Bio is required'
          : !bioPattern.test(value)
          ? 'Bio should be between 10 and 500 characters'
          : '';
      default:
        return '';
    }
  };

  const handleInputChangeWithValidation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleInputChange(e);
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: validateField('name', speakerData.name),
      expertise: validateField('expertise', speakerData.expertise),
      speakerEmail: validateField('speakerEmail', speakerData.speakerEmail),
      bio: validateField('bio', speakerData.bio),
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      handleSubmit(e);
    }
  };

  return (
    showPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-lg">
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
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-2xl mb-6 text-center font-bold">
              {mode === 'add' ? 'Add New Speaker' : 'Update Speaker'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Speaker Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={speakerData.name}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="expertise"
                >
                  Expertise
                </label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  value={speakerData.expertise}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.expertise && (
                  <p className="text-red-500 text-xs mt-1">{errors.expertise}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="speakerEmail"
                  value={speakerData.speakerEmail}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.speakerEmail && (
                  <p className="text-red-500 text-xs mt-1">{errors.speakerEmail}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={speakerData.bio}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Speaker Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {speakerData.image && (
                <div className="md:col-span-2 relative flex flex-col items-center">
                  <img
                    src={speakerData.image}
                    alt="Speaker"
                    className="w-32 h-32 object-cover rounded-full mb-2"
                  />
                  <div
                    className="absolute top-0 right-0 cursor-pointer mt-2 mr-2"
                    onClick={removeImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600 hover:text-red-800"
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
                  </div>
                </div>
              )}
            </div>

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
    )
  );
};
export default SpeakerFormPopup;
