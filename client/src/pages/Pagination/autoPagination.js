import React, { useEffect, useState } from "react";
import { getHTTPrequest } from "../../utils/API";

const AutoPagination = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
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
  //   const loadMore = () => {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   };
  const handleScroll = () => {
    const scrolledToTop = document.documentElement.scrollTop === 0;

    if (scrolledToTop) {
      // User has scrolled to the top, reset pagination
      setCurrentPage(1);
    } else if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight
    ) {
      // Load more rows
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    getUsers();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mb-5">
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
        {users.slice(0, currentPage * recordsPerPage).map((user, index) => {
          return (
            <tbody>
              <tr
                key={index}
                className="border border-slate-600 h-[40px] mb-3 "
              >
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
      {/* <div className="flex justify-center my-4">
        {lastIndex < users.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              className="px-3 py-1 bg-gray-200 border rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default AutoPagination;
