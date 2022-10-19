import './App.css';
import * as XLSX from "xlsx";
import file from "./book.xlsx"
import {useState} from "react";

function App() {

  const [data, setdata] = useState([])
  const readfile = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = XLSX.read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setdata(rows)
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  return (
    <div className="App">
      <div>TEST</div>
      <button>TEST</button>
      <input type={"file"} onChange={readfile}></input>
      <table style={{ margin: '20px auto' }}>
        <tr>
          <th>number</th>
          <th>name</th>
          <th>link</th>
          <th>image</th>
        </tr>
        {
          data.map((x, index) => {
            return <tr>
              <td>{index+1}</td>
              <td>{x.name}</td>
              <td>
                <a href={`https://vk.com${x.link}`}>link</a>
              </td>
              <td>
                <img src={x.image}/>
              </td>
            </tr>
          })
        }
      </table>
    </div>
  );
}

export default App;
