'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';

interface Profile {
  id?: number;
  firstName: string;
  lastName: string;
  audiences: string[];
  avatarUrl?: string;
}

const ProfileForm = () => {
  const audiences = [
    { id: 'notset', label: 'Not Set', value: 'notset' },
    { id: 'single', label: 'Single', value: 'single' },
    { id: 'couple', label: 'Couple', value: 'couple' },
    { id: 'family', label: 'Family', value: 'family' },
  ];

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles:', error);
        setProfiles([{ firstName: '', lastName: '', audiences: [] }]);
        return;
      }

      if (data && data.length > 0) {
        const transformedProfiles: Profile[] = data.map((profile) => {
          let parsedAudiences: string[] = [];
          if (profile.audiences) {
            try {
              parsedAudiences = JSON.parse(profile.audiences);
            } catch {
              parsedAudiences = [];
            }
          }
          return {
            id: profile.id,
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            audiences: parsedAudiences,
            avatarUrl: profile.avatar_url || undefined,
          };
        });
        setProfiles(transformedProfiles);
      } else {
        setProfiles([{ firstName: '', lastName: '', audiences: [] }]);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setProfiles([{ firstName: '', lastName: '', audiences: [] }]);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async (profileIndex: number) => {
    const profile = profiles[profileIndex];

    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      alert('Please fill in both first name and last name');
      return;
    }

    try {
      setSaving(true);
      const profileData = {
        user_id: (await supabase.auth.getUser()).data.user?.id,
        first_name: profile.firstName,
        last_name: profile.lastName,
        audiences: JSON.stringify(profile.audiences),
        avatar_url: profile.avatarUrl || null,
      };

      if (profile.id) {
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', profile.id);

        if (error) {
          console.error('Error updating profile:', error);
          if (error.code === '42501') {
            alert(
              'Permission denied. Please check your Supabase Row Level Security policies.',
            );
          } else {
            alert(`Failed to update profile: ${error.message}`);
          }
          return;
        }
      } else {
        const { data, error } = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single();

        if (error) {
          console.error('Error creating profile:', error);
          if (error.code === '42501') {
            alert(
              'Permission denied. Please check your Supabase Row Level Security policies.',
            );
          } else {
            alert(`Failed to create profile: ${error.message}`);
          }
          return;
        }

        if (data) {
          setProfiles((prev) =>
            prev.map((p, index) =>
              index === profileIndex ? { ...p, id: data.id } : p,
            ),
          );
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, { firstName: '', lastName: '', audiences: [] }]);
  };

  const handleDeleteProfile = async (index: number) => {
    const profile = profiles[index];

    if (profile.id) {
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', profile.id);

        if (error) {
          console.error('Error deleting profile:', error);
          if (error.code === '42501') {
            alert(
              'Permission denied. Please check your Supabase Row Level Security policies.',
            );
          } else {
            alert(`Failed to delete profile: ${error.message}`);
          }
          return;
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Failed to delete profile. Please try again.');
        return;
      }
    }

    if (profiles.length > 1) {
      setProfiles(profiles.filter((_, i) => i !== index));
    } else {
      setProfiles([{ firstName: '', lastName: '', audiences: [] }]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-[#404040]">
            Loading profiles...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto space-y-6">
        {profiles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#404040] font-['Poppins']">
              No profiles found. Add your first profile below.
            </p>
          </div>
        ) : (
          profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-[#0891b2] px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-medium text-white">
                  {profile.id ? 'Edit Profile' : 'New Profile'}
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
                    <label className="block text-sm font-normal text-[#404040]">
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
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent text-base text-[#404040]"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-normal text-[#404040]">
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
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent text-base text-[#404040]"
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
                  <label className="block text-sm font-normal text-[#404040]">
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
                        >
                          <input
                            type="checkbox"
                            id={`${audience.id}-${index}`}
                            checked={isChecked}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleAudienceChange(audience.value, index);
                            }}
                            className="w-5 h-5 text-[#0891b2] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#0891b2] cursor-pointer transition-colors"
                          />
                          <label
                            htmlFor={`${audience.id}-${index}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAudienceChange(audience.value, index);
                            }}
                            className="text-sm font-normal text-[#404040] cursor-pointer select-none group-hover:text-[#0891b2] transition-colors"
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
                    onClick={() => handleSave(index)}
                    disabled={saving}
                    className="px-8 py-3 bg-[#0891b2] text-white font-semibold text-sm rounded-md hover:bg-[#0e7490] transition-colors uppercase tracking-wider shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-center">
          <button
            onClick={handleAddProfile}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0891b2] bg-white text-[#0891b2] font-semibold text-sm rounded-md hover:bg-[#E0F2FE] transition-colors uppercase tracking-wider"
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
