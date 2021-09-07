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
    //updateMyData(index, id, value)
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
          },
          {
            Header: 'PS',
            accessor: 'ps',
            Filter: SelectColumnFilter,
            filter: 'includes',
            Cell: EditableCell,
          },
          {
            Header: 'Other',
            accessor: 'other',
            Filter: SelectColumnFilter,
            filter: 'includes',
            Cell: EditableCell,
          }
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Nome',
            accessor: 'name',
          },
          {
            Header: 'Contacto',
            accessor: 'contact',
          },
          {
            Header: 'Idade',
            accessor: 'age',
          },
          {
            Header: 'Morada',
            accessor: 'address',
          }
        ],
      },
    ],
    []
  )

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios.get("/api/users", {
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
            other: e.other
          })
          );
          console.log('result -> ', result);
          setData(result);
          // you tell it that you had the result
          setLoadingData(false);
        }
      });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default Eleitores