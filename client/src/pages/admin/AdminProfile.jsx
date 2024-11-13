import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AxiosInstance } from '../../config/AxiosInstance';
import { useSelector } from 'react-redux'; 
export const AdminProfile = () => {
 
  const admin= useSelector((state) => state.user.admin); 
  console.log(admin,"==add");
  
  const adminAuthorized = useSelector((state) => state.user.adminAuthorized); 
  const [isEditing, setIsEditing] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    name: '',
    email: '',
    password: '',
  });


 
  useEffect(() => {
    if (adminAuthorized && admin._id) {
      AxiosInstance.get('/admin/profile')
        .then((response) => {
          setAdminDetails({
            name: response.data.name,
            email: response.data.email,
          });
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [adminAuthorized, admin._id]);

  console.log(admin._id,"===ad id");
  const handleSave = async () => {
    try {
      const updatedAdmin = {
        name: adminDetails.name,
        email: adminDetails.email,
        password: adminDetails.password || undefined,
      };

      const response = await AxiosInstance.put('/admin/profile-update', updatedAdmin);

      if (response.status === 200) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  
  if (!adminAuthorized) {
    return <div>You must be logged in to view the admin profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Admin Profile</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">Admin Details</h3>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={adminDetails.name}
            onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={!isEditing}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={adminDetails.email}
            onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={!isEditing}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={adminDetails.password}
            onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={!isEditing}
          />
        </div>

        {/* Save and Edit Buttons */}
        <div className="mt-6 flex justify-center space-x-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-lg text-black transition duration-200"
            >
              Edit Details
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-lg text-black transition duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-lg text-lg text-black transition duration-200"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


