import { useTable, useFilters } from 'react-table'
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

function App() 
{
  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = e => 
  {
    const value = e.target.value || undefined;
    setFilter("hex", value);
    setFilterInput(value);
  };

  const [data, setData] = useState([]);

  useEffect(() => 
  {
    (async () => {
      const result = await axios("https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json");
      setData(result.data.colors);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Colours",
        columns: [
          {
            Header: "Name",
            accessor: "color"
          },
          {
            Header: "Hex",
            accessor: "hex",
          },
          {
            Header: "RGB",
            accessor: d => "tbd",
          }
        ]
      },
    ],
    []
  );

  const 
  {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters 
  );

  return (
    <>
    <div align= "center">
      <h2>Colour Searcher</h2>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search colour"}
        style={{padding: '10px',
              }}
      />
      <table {...getTableProps()} style={{ border: 'solid 1px gray', padding: '5px' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    background: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        background: 'white',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default App;