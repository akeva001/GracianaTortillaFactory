import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";
import { useState } from "react";

export default function ToJSON() {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));

    console.log(initialData);
    console.log(file);
  };
  const display = () => {
    const result = generateObjects(currentSheet);
    console.log(result);
  };

  return (
    <div style={{ height: "30px", overflow: "hidden" }}>
      <input type="file" accept=".xlsx" onChange={handleUpload} />
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName="active-sheet"
        reactExcelClassName="react-excel"
      />
      <button onClick={display}></button>
    </div>
  );
}
