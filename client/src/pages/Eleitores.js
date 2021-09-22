import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';

import styled from 'styled-components';

import Table from "../components/Table";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        width: 50px;

        &.inputSearch {
          width: 470px !important;
        }
      }

      &.cellName {
        input {
          width: 470px !important;
        }
      }

      &.cellContact {
        input {
          width: 100px !important;
        }
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

function Eleitores() {
  const [loadingData, setLoadingData] = useState(true);
  const [skipPageReset, setSkipPageReset] = useState(false)
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: 'Partido',
        columns: [
          {
            Header: 'PSD',
            accessor: 'psd',
            Filter: SelectColumnFilter,
            filter: 'includes',
            Cell: EditableCell,
            width: 70
          },
          {
            Header: 'PS',
            accessor: 'ps',
            Filter: SelectColumnFilter,
            filter: 'includes',
            Cell: EditableCell,
            width: 70
          },
          {
            Header: 'Other',
            accessor: 'other',
            Filter: SelectColumnFilter,
            filter: 'includes',
            Cell: EditableCell,
            width: 70
          }
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Votou',
            accessor: 'hasVoted',
            Filter: SelectColumnFilter,
            filter: 'includes',
            Cell: EditableCell,
            width: 20
          },
          {
            Header: 'Nome',
            accessor: 'name',
            Cell: EditableCell,
            width: 400,
            className: "cellName",
          },
          {
            Header: 'Contacto',
            accessor: 'contact',
            Cell: EditableCell,
            className: "cellContact",
            width: 100
          },
          {
            Header: 'Idade',
            accessor: 'age',
            Cell: EditableCell,
            width: 70
          },
          {
            Header: 'Morada',
            accessor: 'address',
            Cell: EditableCell,
            width: 400,
            className: "cellName",
          }
        ],
      },
    ],
    []
  )

  useEffect(() => {
    async function getData() {
      await axios.get("/api/eleitores", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        if (response.data.success) {
          const data = response.data.data;
          const result = data.map(e => ({
            id: e.id,
            name: e.name,
            contact: e.contact,
            age: e.age,
            address: e.address,
            psd: e.psd,
            ps: e.ps,
            other: e.other,
            hasVoted: e.hasVoted
          })
          );
          setData(result);
          setLoadingData(false);
        }
      });
    }
    if (loadingData) {
      getData();
    }
  }, []);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          const qs = require("qs");
          const eleitor_id = data[rowIndex].id;
          const url = "/api/eleitores/" + eleitor_id;
          const data_sent = { columnId: columnId, value: value }
          axios.put(url, qs.stringify(data_sent), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error)
          })
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  const createNewEleitor = () => {
    console.log(data)
  }

  return (
    <Styles>
      <button onClick={createNewEleitor}>Create new</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset} />
    </Styles>
  )
}

export default Eleitores