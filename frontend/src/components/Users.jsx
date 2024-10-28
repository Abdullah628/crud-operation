
import  { useState, useEffect } from 'react';
import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser } from "../api";
import UserDetailsModal from './UserDetailsModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested educationalQualifications fields
    if (name.startsWith('educationalQualifications.')) {
      const field = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        educationalQualifications: {
          ...prevData.educationalQualifications,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      await updateUser(selectedUser._id, formData);
      setSelectedUser(null);
    } else {
      await createUser(formData);
    }
    setFormData({
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
      },
    });
    loadUsers();
  };

  const handleEdit = async (id) => {
    const user = await fetchUserById(id);
    setSelectedUser(user);
    setFormData(user);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleShowDetails = async (id) => {
    const user = await fetchUserById(id);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const scrollToSection = () => {
    document.getElementById("target-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-4">
     <div className="flex justify-between items-center mb-4">
     <h1 className="text-2xl font-bold mb-4">User Management</h1>
     <button onClick={scrollToSection} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >Add User</button>
     </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Age</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.age}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4 flex space-x-2 justify-center">
                <button onClick={() => handleEdit(user._id)} className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition">
                  Delete
                </button>
                <button onClick={() => handleShowDetails(user._id)} className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition">
                  User Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
      <div id="target-section" className='mt-10'>
        <h3 className='text-2xl font-bold '>{selectedUser ? 'Update User' : 'Add User'}</h3>
        <form onSubmit={handleSubmit} className="my-6 space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Gender</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Nationality</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Skills (comma-separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">NID</label>
          <input type="text" name="nid" value={formData.nid} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Website</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <h3 className="text-lg font-semibold mt-4">Educational Qualifications</h3>
        <div>
          <label className="block text-gray-700">Degree</label>
          <input
            type="text"
            name="educationalQualifications.degree"
            value={formData.educationalQualifications.degree}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">University</label>
          <input
            type="text"
            name="educationalQualifications.university"
            value={formData.educationalQualifications.university}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Session</label>
          <input
            type="text"
            name="educationalQualifications.session"
            value={formData.educationalQualifications.session}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">CGPA</label>
          <input
            type="number"
            name="educationalQualifications.cgpa"
            value={formData.educationalQualifications.cgpa}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {selectedUser ? 'Update User' : 'Add User'}
        </button>
        </form>
      </div>
      

      <UserDetailsModal user={selectedUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Users;
