import React, { useState } from 'react';

interface SessionFormPopupProps {
  showPopup: boolean;
  formTitle: string;
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

const SessionFormPopup: React.FC<SessionFormPopupProps> = ({
  showPopup,
  formTitle,
  sessionData,
  handleInputChange,
  handleSubmit,
  onClose,
}) => {
  const [errors, setErrors] = useState({
    name: '',
    speakerName: '',
    date: '',
    time: '',
    location: '',
    duration: '',
    description: '',
  });

  const validateField = (name: string, value: string) => {
    const namePattern = /^[A-Za-z\s]+$/;
    const durationPattern = /^\d+\s*(hours?|minutes?|secs?|seconds?|days?)$/i;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const timePattern = /^\d{2}:\d{2}$/;

    switch (name) {
      case 'name':
        return value.trim() === ''
          ? 'Session name is required'
          : !namePattern.test(value)
          ? 'Session name should contain only letters and spaces'
          : '';
      case 'speakerName':
        return value.trim() === ''
          ? 'Speaker name is required'
          : !namePattern.test(value)
          ? 'Speaker name should contain only letters and spaces'
          : '';
      case 'date':
        return value.trim() === ''
          ? 'Date is required'
          : !datePattern.test(value)
          ? 'Invalid date format'
          : '';
      case 'time':
        return value.trim() === ''
          ? 'Time is required'
          : !timePattern.test(value)
          ? 'Invalid time format'
          : '';
      case 'location':
        return value.trim() === '' ? 'Location is required' : '';
      case 'duration':
        return value.trim() === ''
          ? 'Duration is required'
          : !durationPattern.test(value)
          ? 'Duration should be a number followed by an optional time unit'
          : '';
      case 'description':
        return value.trim() === '' ? 'Description is required' : '';
      default:
        return '';
    }
  };

  const handleInputChangeWithValidation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    handleInputChange(e);
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: validateField('name', sessionData.name),
      speakerName: validateField('speakerName', sessionData.speakerName),
      date: validateField('date', sessionData.date),
      time: validateField('time', sessionData.time),
      location: validateField('location', sessionData.location),
      duration: validateField('duration', sessionData.duration),
      description: validateField('description', sessionData.description),
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
              {formTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Session Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={sessionData.name}
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
                  htmlFor="speakerName"
                >
                  Speaker Name
                </label>
                <input
                  type="text"
                  id="speakerName"
                  name="speakerName"
                  value={sessionData.speakerName}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.speakerName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.speakerName}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={sessionData.date}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="time"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={sessionData.time}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={sessionData.location}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={sessionData.duration}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.duration && (
                  <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={sessionData.description}
                  onChange={handleInputChangeWithValidation}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
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

export default SessionFormPopup;