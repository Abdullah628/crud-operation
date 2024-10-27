import { useState, useEffect, useRef } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import UserDetailsModal from "./UserDetailsModal";
import AddUserForm from "./AddUserForm";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    setUsers(response.data);
    console.log(response);
  };

  const handleAddUser = async (data) => {
    await axios.post("http://localhost:5000/api/users", data);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleUpdateUser = async (id, updatedUserData) => {
    await axios.put(
      `http://localhost:5000/api/users/${id}`,updatedUserData
    );
    fetchUsers();
  };

  const handleDetails = async (user) => {
    const response = await axios.get(
      `http://localhost:5000/api/users/${user._id}`
    );
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log(response.data);
  };

  // Scrolls to the Add User Form section when called
  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex justify-between w-11/12 m-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <button
          onClick={scrollToForm}
          className="mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Add User
        </button>
      </div>

      <div className="container mx-auto mt-10">
        <UsersTable
          users={users}
          handleUpdateUser={handleUpdateUser}
          handleDeleteUser={handleDeleteUser}
          handleDetails={handleDetails}
        />
      </div>

      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div ref={formRef} className="mt-10">
        <AddUserForm handleAddUser={handleAddUser} />
      </div>
    </div>
  );
};

export default Users;
