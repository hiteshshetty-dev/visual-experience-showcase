'use client';

import { useState } from 'react';

const ProfileForm = () => {
  const audiences = [
    { id: 'notset', label: 'Not Set', value: 'notset' },
    { id: 'single', label: 'Single', value: 'single' },
    { id: 'couple', label: 'Couple', value: 'couple' },
    { id: 'family', label: 'Family', value: 'family' },
  ];

  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<
    { firstName: string; lastName: string; audiences: string[] }[]
  >([{ firstName: '', lastName: '', audiences: [] }]);

  const handleAudienceChange = (value: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleSave = () => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, { firstName: '', lastName: '', audiences: [] }]);
  };

  return (
    <>
      {profiles.map((profile, index) => (
        <main
          key={index}
          className="flex flex-col justify-center items-start w-full   bg-white py-8 px-4"
        >
          <div className="w-full max-w-4xl border-[#0891b2] border-1 ">
            <h2 className="text-xl w-full font-poppins font-normal text-[rgba(64,64,64,1)] bg-[#0891b2] p-2 text-white">
              New Profile
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6 ">
              <div className="">
                <div className="flex items-center justify-between mb-6 "></div>

                <div className="grid grid-rows-1 md:grid-rows-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-['Poppins'] font-normal text-[rgba(64,64,64,1)]">
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
                      className="w-2/3 px-4 py-2 border border-[rgba(229,231,235,1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(8,145,178,1)] font-['Poppins'] text-base"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-['Poppins'] font-normal text-[rgba(64,64,64,1)]">
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
                      className="w-2/3 px-4 py-2 border border-[rgba(229,231,235,1)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(8,145,178,1)] font-['Poppins'] text-base"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="flex my-6">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    className="text-[rgba(64,64,64,1)]"
                  >
                    <circle cx="50" cy="35" r="20" fill="rgba(64, 64, 64, 1)" />
                    <path
                      d="M20 80c0-16.5 13.5-30 30-30s30 13.5 30 30"
                      fill="rgba(64, 64, 64, 1)"
                    />
                  </svg>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-['Poppins'] font-normal text-[rgba(64,64,64,1)] mb-3">
                    Audiences
                  </label>
                  <div className="grid grid-rows-2 md:grid-rows-4 gap-4">
                    {audiences.map((audience) => {
                      const isChecked = selectedAudiences.includes(
                        audience.value,
                      );
                      return (
                        <div
                          key={audience.id}
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleAudienceChange(audience.value)}
                        >
                          <input
                            type="checkbox"
                            id={audience.id}
                            checked={isChecked}
                            onChange={() =>
                              handleAudienceChange(audience.value)
                            }
                            className="w-4 h-4 text-[rgba(8,145,178,1)] border-[rgba(229,231,235,1)] rounded focus:ring-[rgba(8,145,178,1)] cursor-pointer"
                          />
                          <label
                            htmlFor={audience.id}
                            className="text-sm font-['Poppins'] font-normal text-[rgba(64,64,64,1)] cursor-pointer"
                          >
                            {audience.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full my-6 md:w-auto px-8 py-3 bg-[rgba(8,145,178,1)] text-white font-['Poppins'] font-bold text-base rounded-md hover:bg-[rgba(8,145,178,0.9)] transition-colors uppercase tracking-wider"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </main>
      ))}
      <button
        onClick={handleAddProfile}
        className="w-1/3 mx-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-[rgba(8,145,178,1)] text-[rgba(8,145,178,1)] font-['Poppins'] font-bold text-base rounded-md hover:bg-[rgba(8,145,178,0.1)] transition-colors uppercase tracking-wider "
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[rgba(8,145,178,1)]"
        >
          <path
            d="M12 4v16M4 12h16"
            stroke="rgba(8, 145, 178, 1)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>Add Profile</span>
      </button>
    </>
  );
};

export default ProfileForm;
