import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import BootstrapTable from "react-bootstrap-table-next";
import "./index.css";
const selectRow = {
  mode: "checkbox", // single row selection
};

class table extends React.Component {
  render() {
    const { products, columns } = this.props;

    return (
      <div style={{ maxWidth: "1200px" }}>
        <BootstrapTable
          keyField="id"
          data={products}
          columns={columns}
          selectRow={selectRow}
        />
      </div>
    );
  }
}

export default table;
