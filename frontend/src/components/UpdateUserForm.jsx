import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const UpdateUserForm = ({ user, handleUpdateUser, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    nationality: '',
    skills: '',
    nid: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    educationalQualifications: {
      degree: '',
      university: '',
      session: '',
      cgpa: '',
    }
  });

  // Load user data into form when the component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        // skills: user.skills ? user.skills.join(', ') : '', // Convert skills array to comma-separated string
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      educationalQualifications: {
        ...prevData.educationalQualifications,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()), // Convert skills back to array
    };
    handleUpdateUser( updatedData); // Call the onUpdate function with the updated user data
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold">Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Age</label>
          <input name="age" type="number" value={formData.age} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Gender</label>
          <input name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Nationality</label>
          <input name="nationality" value={formData.nationality} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Skills (comma-separated)</label>
          <input name="skills" value={formData.skills} onChange={handleChange} className="border p-2 rounded" placeholder="e.g., JavaScript, React" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">NID</label>
          <input name="nid" value={formData.nid} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Address</label>
          <input name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Website</label>
          <input name="website" value={formData.website} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <h3 className="text-xl font-semibold mt-4">Educational Qualifications</h3>
        <div className="flex flex-col">
          <label className="font-semibold">Degree</label>
          <input name="degree" value={formData.educationalQualifications.degree} onChange={handleNestedChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">University</label>
          <input name="university" value={formData.educationalQualifications.university} onChange={handleNestedChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Session</label>
          <input name="session" value={formData.educationalQualifications.session} onChange={handleNestedChange} className="border p-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">CGPA</label>
          <input name="cgpa" type="number" step="0.01" value={formData.educationalQualifications.cgpa} onChange={handleNestedChange} className="border p-2 rounded" />
        </div>

        <div className="flex space-x-4 mt-4">
          <button type="submit" onClick={() => handleUpdateUser(user)} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Update User
          </button>
          <button type="button" onClick={onCancel} className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


UpdateUserForm.propTypes = {
  user: PropTypes.array.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default UpdateUserForm;
