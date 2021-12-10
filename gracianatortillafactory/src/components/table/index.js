import { generateObjects, ReactExcel, readFile } from "@ramonak/react-excel";
import React from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import Button from "../../components/button";

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

class SelectTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      MasterChecked: false,
      SelectedList: [],
      shifts: "1",
      filteredList: [],
      fileLabel: "Choose a file",
      code: {
        value: "", // all available options
      },
      tortilla: {
        value: options[""], // "" as initial value for react-select
        options, // all available options
      },
      color: {
        value: colors[""], // "" as initial value for react-select
        colors, // all available options
      },
      size: {
        value: sizes[""], // "" as initial value for react-select
        sizes, // all available options
      },
      initialData: undefined,
      currentSheet: [
        { Code: null, Description: null, Source: null, selected: false },
      ],
    };
    this.button = React.createRef(null);
    this.filterList = this.filterList.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTortillaClick = this.onTortillaClick.bind(this);
    this.onColorClick = this.onColorClick.bind(this);
    this.onSizeClick = this.onSizeClick.bind(this);
  }
  componentWillUnmount() {
    localStorage.setItem("filteredList", this.state.filteredList);
  }
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
    let tempList = this.state.List;
    // // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = false));

    //Update State
    this.setState({
      MasterChecked: false,
      List: tempList,
      SelectedList: [],
    });
  }
  getIndex(email) {
    return this.state.List.findIndex((obj) => obj.email === email);
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user, i) => {
      console.log(user);
      console.log(i);
      console.log(item);
      console.log(tempList.indexOf(user));
      if (user === item) {
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
    this.setTortilla(e);

    if (this.state.initialData !== undefined) {
      list = list.filter(function (item) {
        return item.Description.toLowerCase().toString().indexOf(q) !== -1; // returns true or false
      });
    } else {
      return;
    }
    this.setState({ filteredList: list });
    console.log(this.state.tortilla);
  }
  onColorClick(e) {
    // Update State
    let list = this.state.List;
    const q = e.label.toLowerCase();
    this.setColor(e);

    if (this.state.initialData !== undefined) {
      list = list.filter(function (item) {
        return item.Description.toLowerCase().toString().indexOf(q) !== -1; // returns true or false
      });
    } else {
      return;
    }
    this.setState({ filteredList: list });
  }
  onSizeClick(e) {
    // Update State
    let list = this.state.List;
    const q = e.label.toLowerCase();
    this.setSize(e);

    if (this.state.initialData !== undefined) {
      list = list.filter(function (item) {
        return item.Description.toLowerCase().toString().indexOf(q) !== -1; // returns true or false
      });
    } else {
      return;
    }
    this.setState({ filteredList: list });
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
    this.setCode(event);
  }
  filterList() {
    let list = this.state.List;
    let q = this.state.q;
    if (this.state.initialData !== undefined) {
      list = list.filter(function (item) {
        return item.Code.toString().indexOf(q) !== -1; // returns true or false
        console.log(item.Code.toLowerCas);
      });
    } else {
      return;
    }

    this.setState({ filteredList: list });
    console.log(this.state.filteredList);
  }
  handleClear() {
    let tempList = this.state.List;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
    this.setState({ SelectedList: [], MasterChecked: false });
  }
  handleClear2() {
    this.setState({ filteredList: this.state.List });
    this.state.tortilla.value = "";
    this.state.color.value = "";
    this.state.size.value = "";
    this.state.code.value = "";
  }
  setTortilla = (value) => {
    this.setState((prevState) => ({
      tortilla: {
        ...prevState.tortilla,
        value,
      },
    }));
  };
  setColor = (value) => {
    this.setState((prevState) => ({
      color: {
        ...prevState.color,
        value,
      },
    }));
  };
  setSize = (value) => {
    this.setState((prevState) => ({
      size: {
        ...prevState.size,
        value,
      },
    }));
  };
  setCode = (value) => {
    this.setState((prevState) => ({
      code: {
        ...prevState.code,
        value,
      },
    }));
  };

  handleUpload = (event) => {
    const file = event.target.files[0];
    this.onMasterCheckClear();
    //read excel file
    readFile(file)
      .then((readedData) => {
        this.setState({
          initialData: readedData,
          fileLabel: file.name,
        });
        this.button.current.click();
      })
      .catch((error) => console.error(error));

    console.log(this.state.initialData);
    console.log(file);
  };
  display = () => {
    const result = generateObjects(this.state.currentSheet);
    this.setState({ filteredList: result, List: result });
    console.log(result);
    console.log(this.state.currentSheet);
  };

  render() {
    return (
      <div className="tableWrapper">
        <div className="row" style={{ margin: "10px", maxWidth: "1200px" }}>
          <div
            style={{
              zIndex: "2",
            }}
          >
            <div className="dropdownWrapper">
              <div
                style={{
                  height: "60px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "49px",
                  marginRight: "20px",
                }}
              >
                <div style={{ paddingTop: "16px" }}>
                  <input
                    type="file"
                    name="file"
                    accept=".xlsx"
                    onChange={this.handleUpload}
                    className="inputfile"
                    id="file"
                  />
                  <label htmlFor="file">{this.state.fileLabel}</label>
                </div>

                <div
                  style={{ height: "0px", overflow: "hidden", width: "0px" }}
                >
                  {" "}
                  <ReactExcel
                    initialData={this.state.initialData}
                    onSheetUpdate={(currentSheet) => {
                      this.setState({
                        currentSheet: currentSheet,
                      });
                    }}
                    activeSheetClassName="active-sheet"
                    reactExcelClassName="react-excel"
                  />
                </div>
                <div
                  onClick={this.display}
                  style={{
                    height: ".01px",
                    width: ".01px",
                    opacity: "0",
                  }}
                  ref={this.button}
                >
                  <Button text={"Generate"} />
                </div>
              </div>
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
                  ref={(el) => (this.state.code = el)}
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
                    value={this.state.tortilla.value}
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
                    onChange={this.onColorClick}
                    value={this.state.color.value}
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
                    onChange={this.onSizeClick}
                    value={this.state.size.value}
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
                }}
              >
                <Button text={"Clear"} />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                overflowY: "scroll",
                maxHeight: "500px",
              }}
            >
              <Table striped bordered hover responsive="md">
                <thead
                  style={{
                    textAlign: "center",
                  }}
                >
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
                          onChange={(e) => {
                            this.onItemCheck(e, user);
                            console.log(user);
                          }}
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
                  color: this.state.shifts === "1" ? "white" : "#C0C0C0",
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
                  color: this.state.shifts === "2" ? "white" : "#C0C0C0",
                  fontSize: "25px",
                }}
              >
                2 Shifts
              </p>
            </div>
          </div>
          <div
            ref={(el) => (this.componentRef = el)}
            style={{
              boxSizing: "border-box",
            }}
          >
            {this.state.shifts === "1" ? (
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  overflow: "hidden",
                  margin: "10px",
                }}
              >
                <Table striped bordered hover responsive="md">
                  <thead>
                    <tr
                      style={{
                        textAlign: "center",
                      }}
                    >
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
                          <td
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {user.Code}
                          </td>
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
                    margin: "10px",
                  }}
                >
                  <Table striped bordered hover responsive="md">
                    <thead
                      style={{
                        textAlign: "center",
                      }}
                    >
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
                            <td
                              style={{
                                color: "black",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {user.Code}
                            </td>
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
              <Button text={"Save"} />
            </div>
            <div className="button">
              <ReactToPrint
                documentTitle="Inventory"
                copyStyles
                trigger={() => {
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
const inputFile = {
  margin: "40px",
  border: "5px solid pink",
};
export default SelectTableComponent;
