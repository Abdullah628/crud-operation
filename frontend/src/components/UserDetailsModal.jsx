import PropTypes from 'prop-types';

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <div className="space-y-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Nationality:</strong> {user.nationality}</p>
          <p><strong>NID:</strong> {user.nid}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> <a href={user.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{user.website}</a></p>
          <p><strong>Educational Qualifications:</strong></p>
          <ul className="ml-4 list-disc">
            <li><strong>Degree:</strong> {user.educationalQualifications.degree}</li>
            <li><strong>University:</strong> {user.educationalQualifications.university}</li>
            <li><strong>Session:</strong> {user.educationalQualifications.session}</li>
            <li><strong>CGPA:</strong> {user.educationalQualifications.cgpa}</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

UserDetailsModal.propTypes = {
  user: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default UserDetailsModal;
