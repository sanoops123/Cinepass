import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

export const CreateScreen = () => {
  const { id } = useParams(); // Get the movie ID from the route params
  const navigate = useNavigate();
  console.log("===id",id);
  

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    screenType: "",
    seats: [{ seatNumber: [], isAvailable: true }],
    movieSchedules: [
      {
        movieId: id,
        showTime: [],
        showDate: "",
      },
    ],
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle showTime and seats updates
  const handleNestedChange = (index, name, value) => {
    const updatedSchedules = [...formData.movieSchedules];
    updatedSchedules[index][name] = value;
    setFormData({ ...formData, movieSchedules: updatedSchedules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post("screen/create-screen", formData);
      toast.success("Screen created successfully!");
      console.log(response?.data?.data);
      
      navigate(`/admin/moviespage`); // Redirect to movies page or other desired page
    } catch (error) {
      console.error("Error creating screen:", error);
      toast.error("Failed to create screen. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Screen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Screen Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Screen Name</label>
          <input
            type="text"
            name="name"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">City</label>
          <input
            type="text"
            name="city"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Screen Type */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Screen Type</label>
          <input
            type="text"
            name="screenType"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.screenType}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Show Times */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Show Times (comma-separated)</label>
          <input
            type="text"
            name="showTime"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.movieSchedules[0].showTime.join(", ")}
            onChange={(e) =>
              handleNestedChange(0, "showTime", e.target.value.split(",").map((time) => time.trim()))
            }
            required
          />
        </div>

        {/* Show Date */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Show Date</label>
          <input
            type="date"
            name="showDate"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.movieSchedules[0].showDate.split("T")[0]}
            onChange={(e) =>
              handleNestedChange(0, "showDate", new Date(e.target.value).toISOString())
            }
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Create Screen
        </button>
      </form>
    </div>
  );
};

