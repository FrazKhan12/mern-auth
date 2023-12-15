import { Tooltip, Table, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { deleteHTTPrequest, getHTTPrequest } from "../../utils/API";
import fileSaver from "file-saver";
import axios from "axios";

const UserData = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleDelete = async (userID, userName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the user: ${userName}?`
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await deleteHTTPrequest(`/user/delete-user/${userID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.success) {
        getAllUsers();
        toast.success("User Deleted Successfuly");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong2");
    }
  };

  const handleView = async (userId) => {
    try {
      const response = await getHTTPrequest(`/user/get-single-user/${userId}`);
      console.log(response);
      if (response.success) {
        navigate(`/user-screen/${userId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await getHTTPrequest("/user/get-all-user");
      console.log(response);
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };
  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.createdAt.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText) ||
      user.city.toLowerCase().includes(searchText)
  );
  useEffect(() => {
    getAllUsers();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => (
        <span dangerouslySetInnerHTML={{ __html: highlightSearchText(text) }} />
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text) => (
        <span dangerouslySetInnerHTML={{ __html: highlightSearchText(text) }} />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <span dangerouslySetInnerHTML={{ __html: highlightSearchText(text) }} />
      ),
    },

    {
      title: "created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = new Date(record.createdAt).toLocaleDateString(
          undefined,
          options
        );
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <span dangerouslySetInnerHTML={{ __html: highlightSearchText(text) }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3 ">
          <div
            onClick={() => handleView(record._id)}
            className="  text-center   cursor-pointer"
          >
            <span className=" h-[30px] flex items-center justify-center rounded">
              <GrFormView size={24} />
            </span>
          </div>
          <div
            onClick={() => handleDelete(record._id, record.userName)}
            className="  text-center   cursor-pointer"
          >
            <span className=" h-[30px] flex items-center justify-center rounded">
              <button disabled={record.role === "admin"}>
                <Tooltip
                  title={record.role === "admin" ? "Can't delete admin" : ""}
                >
                  <MdOutlineDeleteSweep
                    className={
                      record.role === "admin"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    size={24}
                  />
                </Tooltip>
              </button>
            </span>
          </div>
        </div>
      ),
    },
  ];
  const highlightSearchText = (text) => {
    const lowerCaseText = text.toLowerCase();
    const startIndex = lowerCaseText.indexOf(searchText);

    if (startIndex !== -1) {
      const endIndex = startIndex + searchText.length;
      const highlightedText =
        `<span class="bg-yellow-500 text-white font-bold">` +
        text.substring(startIndex, endIndex) +
        "</span>";

      return (
        text.substring(0, startIndex) +
        highlightedText +
        text.substring(endIndex, text.length)
      );
    }

    return text;
  };

  const handleExport = async () => {
    fetch("/api/user/get-user-csv")
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Log the received data to the console
        if (data !== undefined) {
          const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
          fileSaver.saveAs(blob, "users.xlsx");
        } else {
          console.error("Error: CSV data is undefined");
        }
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
      });
  };
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <Input
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-4 h-[40px] w-[200px]"
        />
        <Button
          onClick={handleExport}
          className="px-8 bg-gray-800 h-[40px] hover:bg-gray-800"
          type="primary"
          htmlType="submit"
        >
          Export Csv
        </Button>
      </div>
      <h1 className="text-2xl font-bold mt-4 mb-2">All Users</h1>

      <Table dataSource={filteredUsers} columns={columns} />
    </div>
  );
};

export default UserData;
