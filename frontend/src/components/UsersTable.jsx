
import PropTypes from 'prop-types';
const UsersTable = ({ users, handleUpdateUser, handleDeleteUser, handleDetails }) => {
  return (
    <div className="overflow-x-auto">
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
          {users.map((user, index) => (
            <tr key={user._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.age}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4 flex space-x-2 justify-center">
                <button
                  onClick={() => handleDetails(user)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition"
                >
                  Details
                </button>
                <button
                  onClick={() => handleUpdateUser(user._id, { ...user, age: parseInt(user.age) + 1 })}
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition"
                >
                  Increase Age
                </button>


                


                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
    handleDeleteUser: PropTypes.func.isRequired,
    handleDetails: PropTypes.func
}

export default UsersTable;
