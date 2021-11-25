import "./App.css";
import Menu from "../src/components/menu";
import Table from "../src/components/table";
import Form from "../src/components/form";
import PrintTable from "../src/components/printTable";

const options = [
  { value: "Corn", label: "Corn" },
  { value: "Flour", label: "Flour" },
  { value: "Chip", label: "Chip" },
];
const options1 = [
  { value: "Color", label: "Color" },
  { value: "Size", label: "Size" },
];
const products = [
  { id: 0, description: "Item name 0", source: 2100 },
  { id: 1, description: "Item name 1", source: 2101 },
  { id: 2, description: "Item name 2", source: 2102 },
  { id: 3, description: "Item name 3", source: 2103 },
];
const columns = [
  {
    dataField: "id",
    text: "ITEM CODE",
  },
  {
    dataField: "description",
    text: "ITEM DESCRIPTION",
  },
  {
    dataField: "source",
    text: "SOURCE",
  },
  {
    dataField: "products",
    text: "PPRODUCT USED TO MAKE TORTILLA",
  },
  {
    dataField: "number",
    text: "NUMBER OF TORTILLAS MADE PER PACK",
  },
];
const columns1 = [
  {
    dataField: "id",
    text: "ITEM CODE",
  },
  {
    dataField: "description",
    text: "ITEM DESCRIPTION",
  },
  {
    dataField: "source",
    text: "SOURCE",
  },
];
const App = () => {
  return (
    <div className="App">
      <div className="svg">
        <div className="img">
          <img src={"./images/Blog2.png"} alt="Logo" height="500px" />
        </div>
      </div>
      <div className="logo">
        <img src={"./images/logo.png"} alt="Logo" height="200px" />
      </div>

      <div className="tableWrapper">
        <div>
          <Table products={products} columns={columns1} columns1={columns} />
        </div>
      </div>
    </div>
  );
};

export default App;
