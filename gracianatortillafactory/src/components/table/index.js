import React from "react";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Form from "../form";
import Menu from "../menu";
import Select from "react-select";
import Button from "../../components/button";
import ReactToPrint from "react-to-print";
import Converter from "../toJSON";
import * as XLSX from "xlsx";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";

const options = [
  { value: "Corn", label: "Corn" },
  { value: "Flour", label: "Flour" },
  { value: "Chip", label: "Chip" },
];
const colors = [
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
  { value: "Yellow", label: "Yellow" },
  { value: "White", label: "White" },
];
const sizes = [
  { value: '4"', label: '4"' },
  { value: '5"', label: '5"' },
  { value: '6"', label: '6"' },
];
const options1 = [
  { value: "Color", label: "Color" },
  { value: "Size", label: "Size" },
];
const Items = [
  {
    id: 1,
    selected: false,
    code: "1000",
    description: '4" MINI RED CORN TORTILLA 5 DZ. 30',
    source: "BAT REG 4 | 5",
  },
  {
    id: 2,
    selected: false,
    code: "1005",
    description: '5" 1/4 MINI CORN TORTILLA 5 DZ. 37',
    source: "BAT REG 4 | 5",
  },
  {
    id: 3,
    selected: false,
    code: "1010",
    description: '4" 1/4 MINI CORN TORTILLA 5 DZ. 37',
    source: "BAT REG 4 | 5",
  },
  {
    id: 4,
    selected: false,
    code: "1080",
    description: '6" MINI CORN TORTILLA 5 DZ. 30',
    source: "BAT REG 4 | 5",
  },
  {
    id: 5,
    selected: false,
    code: "1040",
    description: '5" 1/4 MINI FLOUR TORTILLA 5 DZ. 37',
    source: "BAT REG 4 | 5",
  },
  {
    id: 6,
    selected: false,
    code: "1020",
    description: '4" 1/4 MINI CHIP TORTILLA 5 DZ. 37',
    source: "BAT REG 4 | 5",
  },
];

class SelectTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [{ Code: null, Description: null, Source: null, selected: false }],
      MasterChecked: false,
      SelectedList: [],
      shifts: "1",
      filteredList: [
        { Code: null, Description: null, Source: null, selected: false },
      ],
      tortilla: null,
      select: {
        value: options[0], // "One" as initial value for react-select
        options, // all available options
      },
      initialData: undefined,
      currentSheet: [
        { Code: null, Description: null, Source: null, selected: false },
      ],
    };

    this.filterList = this.filterList.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTortillaClick = this.onTortillaClick.bind(this);
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  onMasterCheckClear(e) {
    let tempList = Items;
    // // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = false));

    //Update State
    this.setState({
      MasterChecked: false,
      List: tempList,
      SelectedList: [],
    });
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.Code === item.Code) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
    //console.log(this.state.shifts);
  }
  onTortillaClick(e) {
    // Update State
    let list = this.state.List;
    const q = e.label.toLowerCase();
    this.setState({
      tortilla: q,
    });
    list = list.filter(function (item) {
      return item.Description.toLowerCase().toString().indexOf(q) != -1; // returns true or false
    });
    this.setState({ filteredList: list });
    console.log(this.state.tortilla);
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  onChange(event) {
    const q = event.target.value.toLowerCase();
    this.setState({ q }, () => this.filterList());
  }
  filterList() {
    let list = this.state.List;
    let q = this.state.q;

    list = list.filter(function (item) {
      return item.Code.toString().indexOf(q) != -1; // returns true or false
      console.log(item.Code.toLowerCas);
    });

    this.setState({ filteredList: list });
  }
  handleClear() {
    let tempList = this.state.List;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
    this.setState({ SelectedList: [], MasterChecked: false });
  }
  handleClear2() {
    this.setState({ filteredList: this.state.List });
  }
  setValue = (value) => {
    this.setState((prevState) => ({
      select: {
        ...prevState.select,
        value,
      },
    }));
  };

  handleChange = (value) => {
    this.setValue(value);
  };

  handleClick = () => {
    this.setValue(null); // here we reset value
  };

  handleUpload = (event) => {
    const file = event.target.files[0];

    //read excel file
    readFile(file)
      .then((readedData) => this.setState({ initialData: readedData }))

      .catch((error) => console.error(error));

    console.log(this.state.initialData);
    console.log(file);
    const result = generateObjects(this.state.currentSheet);
    this.setState({ filteredList: result, List: result });
  };
  display = () => {
    const result = generateObjects(this.state.currentSheet);
    this.setState({ filteredList: result, List: result });
    console.log(result);
  };

  render() {
    return (
      <div className="tableWrapper">
        <div className="row" style={{ margin: "10px", maxWidth: "1200px" }}>
          <div
            style={{
              height: "60px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              type="file"
              accept=".xlsx"
              onChange={this.handleUpload}
              style={{ borderRadius: "10px", paddingTop: "20px" }}
            />
            <div style={{ height: "0px", overflow: "hidden", width: "0px" }}>
              {" "}
              <ReactExcel
                initialData={this.state.initialData}
                onSheetUpdate={(currentSheet) =>
                  this.setState({ currentSheet: currentSheet })
                }
                activeSheetClassName="active-sheet"
                reactExcelClassName="react-excel"
              />
            </div>
            <div onClick={this.display}>
              <Button text={"Generate"} />
            </div>
          </div>
          <div
            style={{
              zIndex: "2",
            }}
          >
            <div className="dropdownWrapper">
              <div className="form">
                <input
                  placeholder={"Code"}
                  style={{
                    height: "37px",
                    borderRadius: "4px",
                    borderColor: "transparent",
                    paddingLeft: "15px",
                  }}
                  onChange={this.onChange}
                />
              </div>
              <div className="dropdown">
                <div style={{ margin: "1rem 0" }}>
                  <label
                    htmlFor="color"
                    style={{ padding: "7px", color: "white" }}
                  >
                    Tortilla
                  </label>
                  <Select
                    id="color"
                    options={options}
                    multi={true}
                    onChange={this.onTortillaClick}
                    //onBlur={this.handleBlur}
                    value={this.props.value}
                  />
                  {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {this.props.error}
                    </div>
                  )}
                </div>
              </div>
              <div className="dropdown">
                <div style={{ margin: "1rem 0" }}>
                  <label
                    htmlFor="color"
                    style={{ padding: "7px", color: "white" }}
                  >
                    Color
                  </label>
                  <Select
                    id="color"
                    options={colors}
                    multi={true}
                    onChange={this.onTortillaClick}
                    //onBlur={this.handleBlur}
                    value={this.props.value}
                  />
                  {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {this.props.error}
                    </div>
                  )}
                </div>
              </div>
              <div className="dropdown">
                <div style={{ margin: "1rem 0" }}>
                  <label
                    htmlFor="color"
                    style={{ padding: "7px", color: "white" }}
                  >
                    Size
                  </label>
                  <Select
                    id="color"
                    options={sizes}
                    multi={true}
                    onChange={this.onTortillaClick}
                    //onBlur={this.handleBlur}
                    value={this.props.value}
                  />
                  {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {this.props.error}
                    </div>
                  )}
                </div>
              </div>

              <div
                className="clearButton"
                onClick={() => {
                  this.handleClear2();
                  this.handleClick();
                }}
              >
                <Button text={"Clear"} />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                overflow: "hidden",
                maxHeight: "290px",
              }}
            >
              <Table striped bordered hover responsive="md">
                <thead>
                  <tr>
                    <th scope="col">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.MasterChecked}
                        id="mastercheck"
                        onChange={(e) => this.onMasterCheck(e)}
                      />
                    </th>
                    <th scope="col">ITEM CODE</th>
                    <th scope="col">ITEM DESCRIPTION</th>
                    <th scope="col">SOURCE</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filteredList.map((user) => (
                    <tr
                      key={user.id}
                      className={user.selected ? "selected" : ""}
                    >
                      <th scope="row">
                        <input
                          type="checkbox"
                          checked={user.selected}
                          className="form-check-input"
                          id="rowcheck{user.id}"
                          onChange={(e) => this.onItemCheck(e, user)}
                        />
                      </th>
                      <td style={{ color: "black" }}>{user.Code}</td>
                      <td style={{ color: "black" }}>{user.Description}</td>
                      <td style={{ color: "black" }}>{user.Source}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <h1 style={{ paddingTop: "30px", color: "white" }}>Preview</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              onClick={() =>
                this.setState({
                  shifts: "1",
                })
              }
            >
              <p
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  color: this.state.shifts === "1" ? "white" : "black",
                  fontSize: "25px",
                }}
              >
                1 Shift
              </p>
            </div>
            <div
              onClick={() =>
                this.setState({
                  shifts: "2",
                })
              }
            >
              <p
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  color: this.state.shifts === "2" ? "white" : "black",
                  fontSize: "25px",
                }}
              >
                2 Shifts
              </p>
            </div>
          </div>
          <div ref={(el) => (this.componentRef = el)}>
            {this.state.shifts === "1" ? (
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Table striped bordered hover responsive="md">
                  <thead>
                    <tr>
                      <th scope="col">ITEM CODE</th>
                      <th scope="col">ITEM DESCRIPTION</th>
                      <th scope="col">SOURCE</th>
                      <th scope="col">PRODUCT USED TO MAKE TORTILLA</th>
                      <th scope="col">NUMBER OF TORTILLAS MADE PER PACK</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "white" }}>
                    {this.state.SelectedList.map((user) => (
                      <tr
                        key={user.id}
                        className={user.selected ? "selected" : ""}
                      >
                        <th scope="row">
                          <td style={{ color: "black" }}>{user.Code}</td>
                        </th>

                        <td style={{ color: "black" }}>{user.Description}</td>
                        <td style={{ color: "black" }}>{user.Source}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Table striped bordered hover responsive="md">
                    <thead>
                      <tr>
                        <th scope="col">ITEM CODE</th>
                        <th scope="col">ITEM DESCRIPTION</th>
                        <th scope="col">SOURCE</th>
                        <th scope="col">PRODUCT USED TO MAKE TORTILLA</th>
                        <th scope="col">NUMBER OF TORTILLAS MADE PER PACK</th>
                        <th scope="col">SOURCE</th>
                        <th scope="col">PRODUCT USED TO MAKE TORTILLA</th>
                        <th scope="col">NUMBER OF TORTILLAS MADE PER PACK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.SelectedList.map((user) => (
                        <tr
                          key={user.id}
                          className={user.selected ? "selected" : ""}
                        >
                          <th scope="row">
                            <td style={{ color: "black" }}>{user.Code}</td>
                          </th>

                          <td style={{ color: "black" }}>{user.Description}</td>
                          <td style={{ color: "black" }}>{user.Source}</td>
                          <td></td>
                          <td></td>
                          <td style={{ color: "black" }}>{user.Source}</td>
                          <td></td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
          <div className="buttonWrapper">
            <div className="button" onClick={(e) => this.onMasterCheckClear(e)}>
              <Button text={"Clear"} />
            </div>
            <div className="button">
              <ReactToPrint
                documentTitle="Inventory"
                copyStyles
                trigger={() => {
                  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                  // to the root node of the returned component as it will be overwritten.
                  return (
                    <a href="#">
                      <Button text={"Print"} />{" "}
                    </a>
                  );
                }}
                content={() => this.componentRef}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTableComponent;
