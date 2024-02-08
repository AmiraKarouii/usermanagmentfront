import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/table.css';

function Table({ people, onEditUser, searchResult , setSearchResult, noUsersFound, setNoUsersFound  }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [people]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/allusers');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/user/delete/${userId}`);
        if (response.status === 200) {
          await fetchData(); // Wait for fetchData() to complete
        } else {
          await fetchData();
          throw new Error(`Failed to delete user: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEditUser = (user) => {
    onEditUser(user);
  };

  const usersToMap = searchResult.length > 0 ? searchResult : users;

  const handleResetUsers = () => {
    fetchData();setNoUsersFound(false);
    setSearchResult([]);

  };

 return (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-2xl mx-auto">
    <table className="w-full full text-sm text-left rtl:text-right text-gray-500 sm:rounded-lg dark:text-gray-400 rounded-lg border">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 sm:rounded-lg dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            User
          </th>
          <th scope="col" className="px-6 py-3">
            Age
          </th>
          <th scope="col" className="px-6 py-3">
            Nationality
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
          <th scope="col" className="px-6 py-3">
            <button>
            <span
                className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                onClick={handleResetUsers}>Reset</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
      {noUsersFound && (
          <tr>
            <td colSpan="6" className="text-center text-red-600 dark:text-red-500">No users found.</td>
          </tr>
      )}
      {!noUsersFound && usersToMap.map((user, index) => (
          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {user.first_name} {user.last_name}
            </th>
            <td className="px-6 py-4">{user.age}</td>
            <td className="px-6 py-4">{user.nationality}</td>
            <td className="px-6 py-4">{user.gender}</td>
            <td className="px-6 py-4 text-right">
              <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEditUser(user)}>
                Edit
              </button>
            </td>
            <td className="px-6 py-4 text-right">
              <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDeleteUser(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


}

export default Table;
