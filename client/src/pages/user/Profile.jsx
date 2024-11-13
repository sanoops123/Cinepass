
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AxiosInstance } from '../../config/AxiosInstance'; 
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const user = useSelector((state) => state.user); 
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      AxiosInstance.get('/user/profile')
        .then((response) => {
          setUserDetails({
            name: response.data.name,
            email: response.data.email,
          });
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedUser = {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password || undefined,
      };

      const response = await AxiosInstance.put('/user/profile-update', updatedUser);

      if (response.status === 200) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        navigate("/")
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-semibold mb-6">My Profile</h2>

     
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
        <div>
          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            disabled={!isEditing}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            disabled={!isEditing}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            value={userDetails.password}
            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            disabled={!isEditing}
          />
        </div>

        <div className="mt-6 flex space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
            >
              Edit Details
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
