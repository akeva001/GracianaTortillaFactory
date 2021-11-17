import React from "react";
import { Table } from "react-bootstrap";

const Users = [
  {
    id: 1,
    selected: false,
    code: "1000",
    description: '4" MINI CORN TORTILLA 5 DZ. 30',
    source: "BAT REG 4 | 5",
  },
  {
    id: 2,
    selected: false,
    code: "1005",
    description: '4" 1/4 MINI CORN TORTILLA 5 DZ. 37',
    source: "BAT REG 4 | 5",
  },
];

class SelectTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: Users,
      MasterChecked: false,
      SelectedList: [],
      shifts: "1",
    };
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

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {
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
    console.log(this.state.shifts);
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  render() {
    return (
      <div className="tableWrapper">
        <div className="row">
          <div className="col-md-12">
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
                {this.state.List.map((user) => (
                  <tr key={user.id} className={user.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={user.selected}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                        onChange={(e) => this.onItemCheck(e, user)}
                      />
                    </th>
                    <td style={{ color: "white" }}>{user.code}</td>
                    <td style={{ color: "white" }}>{user.description}</td>
                    <td style={{ color: "white" }}>{user.source}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <h1 style={{ paddingTop: "20px" }}>Preview</h1>
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
                }}
              >
                2 Shifts
              </p>
            </div>
          </div>
          <div>
            {this.state.shifts === "1" ? (
              <div className="row">
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
                          <td style={{ color: "white" }}>{user.code}</td>
                        </th>

                        <td style={{ color: "white" }}>{user.description}</td>
                        <td style={{ color: "white" }}>{user.source}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className="row">
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
                          <td style={{ color: "white" }}>{user.code}</td>
                        </th>

                        <td style={{ color: "white" }}>{user.description}</td>
                        <td style={{ color: "white" }}>{user.source}</td>
                        <td></td>
                        <td></td>
                        <td style={{ color: "white" }}>{user.source}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTableComponent;
