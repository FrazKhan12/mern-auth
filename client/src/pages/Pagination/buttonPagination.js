import React, { useEffect, useState } from "react";
import { getHTTPrequest } from "../../utils/API";

const ButtonPagination = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(0, lastIndex);
  const numberOfPages = Math.ceil(users.length / recordsPerPage);
  console.log(numberOfPages);
  const getUsers = async () => {
    try {
      const response = await getHTTPrequest("/user/get-all-user");
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-slate-500">
        <thead className="text-left">
          <tr className="border border-slate-600 h-[40px] ">
            <th className="px-3">User ID</th>
            <th>Username</th>
            <th>City</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        {records.map((user, index) => {
          return (
            <tbody>
              <tr key={index} className="border border-slate-600 h-[40px] ">
                <td className="px-3">{user._id}</td>
                <td>{user.userName}</td>
                <td>{user.city}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="flex justify-center my-4">
        {lastIndex < users.length ? (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              className="px-3 py-1 bg-gray-200 border rounded"
            >
              Load More
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <button
              onClick={firstPage}
              className="px-3 py-1 bg-gray-200 border rounded"
            >
              First Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonPagination;
