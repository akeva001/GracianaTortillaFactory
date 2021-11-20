import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.Code}</th>
      <th>{individualExcelData.Description}</th>
      <th>{individualExcelData.Source}</th>
    </>
  );
};
