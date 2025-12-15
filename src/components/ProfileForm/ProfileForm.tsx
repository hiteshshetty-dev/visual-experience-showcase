'use client';

import { useState } from 'react';

const ProfileForm = () => {
  const audiences = [
    { id: 'notset', label: 'Not Set', value: 'notset' },
    { id: 'single', label: 'Single', value: 'single' },
    { id: 'couple', label: 'Couple', value: 'couple' },
    { id: 'family', label: 'Family', value: 'family' },
  ];

  const [profiles, setProfiles] = useState<
    { firstName: string; lastName: string; audiences: string[] }[]
  >([{ firstName: '', lastName: '', audiences: ['couple'] }]);

  const handleAudienceChange = (value: string, profileIndex: number) => {
    setProfiles((prev) =>
      prev.map((profile, index) =>
        index === profileIndex
          ? {
              ...profile,
              audiences: profile.audiences.includes(value)
                ? profile.audiences.filter((item) => item !== value)
                : [...profile.audiences, value],
            }
          : profile,
      ),
    );
  };

  const handleSave = () => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, { firstName: '', lastName: '', audiences: [] }]);
  };

  const handleDeleteProfile = (index: number) => {
    if (profiles.length > 1) {
      setProfiles(profiles.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen w-full  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto space-y-6">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-[#0891b2] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-['Poppins'] font-medium text-white">
                New Profile
              </h2>
              <button
                onClick={() => handleDeleteProfile(index)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Delete profile"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-['Poppins'] font-normal text-[#404040]">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfiles([
                        ...profiles.slice(0, index),
                        { ...profile, firstName: e.target.value },
                        ...profiles.slice(index + 1),
                      ])
                    }
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent font-['Poppins'] text-base text-[#404040]"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-['Poppins'] font-normal text-[#404040]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfiles([
                        ...profiles.slice(0, index),
                        { ...profile, lastName: e.target.value },
                        ...profiles.slice(index + 1),
                      ])
                    }
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent font-['Poppins'] text-base text-[#404040]"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="flex  py-4">
                <div className="w-24 h-24 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#9CA3AF]"
                  >
                    <circle cx="12" cy="8" r="4" fill="currentColor" />
                    <path
                      d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-['Poppins'] font-normal text-[#404040]">
                  Audiences
                </label>
                <div className="space-y-3">
                  {audiences.map((audience) => {
                    const isChecked = profile.audiences.includes(
                      audience.value,
                    );
                    return (
                      <div
                        key={audience.id}
                        className="flex items-center space-x-3 cursor-pointer group"
                        onClick={() =>
                          handleAudienceChange(audience.value, index)
                        }
                      >
                        <input
                          type="checkbox"
                          id={`${audience.id}-${index}`}
                          checked={isChecked}
                          onChange={() =>
                            handleAudienceChange(audience.value, index)
                          }
                          className="w-5 h-5 text-[#0891b2] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#0891b2] cursor-pointer transition-colors"
                        />
                        <label
                          htmlFor={`${audience.id}-${index}`}
                          className="text-sm font-['Poppins'] font-normal text-[#404040] cursor-pointer select-none group-hover:text-[#0891b2] transition-colors"
                        >
                          {audience.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-[#0891b2] text-white font-['Poppins'] font-semibold text-sm rounded-md hover:bg-[#0e7490] transition-colors uppercase tracking-wider shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            onClick={handleAddProfile}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0891b2] bg-white text-[#0891b2] font-['Poppins'] font-semibold text-sm rounded-md hover:bg-[#E0F2FE] transition-colors uppercase tracking-wider"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v16M4 12h16" />
            </svg>
            <span>Add Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
