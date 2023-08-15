import React from "react";
import { CSVLink } from "react-csv";

const DownloadExcel = ({ data }) => {
  const csvData = data.map((item) => {
    return {
      Name: item.name,
      Job: item.job,
      Email: item.email,
      Company: item.company,
      phone: item.phone,
      note: item.message,
    };
  });

  return (
    <CSVLink data={csvData} filename={`MyContacts.csv`} className="text-sm">
      Export via CSV
    </CSVLink>
  );
};

export default DownloadExcel;
