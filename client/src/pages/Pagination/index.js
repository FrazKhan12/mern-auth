import React from "react";
import { Tabs } from "antd";
import NumberPagination from "./numberPagination";
import AutoPagination from "./autoPagination";
import ButtonPagination from "./buttonPagination";
import AdvancePagination from "./advancePagination";

const Pagination = () => {
  const columns = [
    {
      key: "1",
      label: "Number Pagination",
      children: <NumberPagination />,
    },
    {
      key: "2",
      label: "Button Pagination",
      children: <ButtonPagination />,
    },
    {
      key: "3",
      label: "Auto Pagination",
      children: <AutoPagination />,
    },
    {
      key: "4",
      label: "Advance Pagination",
      children: <AdvancePagination />,
    },
  ];
  return (
    <div className="container mx-auto mt-10">
      <Tabs defaultActiveKey="1" items={columns} />
    </div>
  );
};

export default Pagination;
