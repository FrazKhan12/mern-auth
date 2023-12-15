import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { BiArrowBack } from "react-icons/bi";
import { getHTTPrequest } from "../../utils/API";

const SingleUserScreen = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  console.log(user);
  const { id } = useParams();

  const getData = async () => {
    try {
      const response = await getHTTPrequest(`/user/get-single-user/${id}`);
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  return (
    <div className="container mx-auto">
      <h1>
        <BiArrowBack
          className="cursor-pointer text-3xl mt-10"
          onClick={() => navigate("/admin-dashboard")}
        />
      </h1>
      <div className="container mx-auto flex w-full gap-[150px] items-start mt-20 pb-8">
        {user ? (
          <>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={
                <img
                  slt="cover"
                  src="https://iidamidamerica.org/wp-content/uploads/2020/12/male-placeholder-image.jpeg"
                />
              }
            >
              <Meta title={`${user.firstName} ${user.lastName}`} />{" "}
            </Card>
            <div className="mt-5">
              <h1 className="pb-5 text-3xl font-bold">User Details</h1>
              <p>
                <b>Name:</b> {user.userName}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Role:</b> {user.role}
              </p>
            </div>
          </>
        ) : (
          <p>Loading user data...</p> // Display a loading message
        )}
      </div>
    </div>
  );
};

export default SingleUserScreen;
