import React, { useEffect, useState } from "react";
import { getHTTPrequest } from "../../utils/API";
import ReactPaginate from "react-paginate";

const AdvancePagination = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);
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
        {users.map((user, index) => {
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

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={numberOfPages}
        containerClassName={
          "flex items-center justify-between border-t border-gray-200 w-[40%] mx-auto bg-white px-4 py-3 sm:px-6"
        }
        pageLinkClassName={
          "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
        }
      />
    </div>
  );
};

export default AdvancePagination;
