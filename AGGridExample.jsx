import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

// Custom dropdown cell editor component
const DropdownEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  const refInput = React.useRef(null);

  const statusOptions = [
    'Active',
    'Inactive', 
    'Pending',
    'Completed',
    'Cancelled'
  ];

  useEffect(() => {
    // Focus on the select element when editor opens
    setTimeout(() => refInput.current?.focus());
  }, []);

  useImperativeHandle(ref, () => {
    return {
      // the final value to send to the grid, on completion of editing
      getValue() {
        return value;
      },

      // Gets called once before editing starts, to give editor a chance to
      // cancel the editing before it even starts.
      isCancelBeforeStart() {
        return false;
      },

      // Gets called once when editing is finished (eg if Enter is pressed).
      // If you return true, then the result of the edit will be ignored.
      isCancelAfterEnd() {
        return false;
      }
    };
  });

  return (
    <select
      ref={refInput}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        padding: '4px'
      }}
    >
      {statusOptions.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});

const AGGridExample = () => {
  const [rowData, setRowData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Completed' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active' }
  ]);

  const columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      width: 80,
      sortable: true
    },
    {
      headerName: 'Name',
      field: 'name',
      width: 150,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 200,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 130,
      editable: true,
      cellEditor: DropdownEditor,
      sortable: true,
      filter: true,
      cellStyle: (params) => {
        const status = params.value;
        switch(status) {
          case 'Active':
            return { backgroundColor: '#d4edda', color: '#155724' };
          case 'Inactive':
            return { backgroundColor: '#f8d7da', color: '#721c24' };
          case 'Pending':
            return { backgroundColor: '#fff3cd', color: '#856404' };
          case 'Completed':
            return { backgroundColor: '#d1ecf1', color: '#0c5460' };
          case 'Cancelled':
            return { backgroundColor: '#f5c6cb', color: '#721c24' };
          default:
            return null;
        }
      }
    }
  ];

  const defaultColDef = {
    resizable: true,
    sortable: false,
    filter: false
  };

  const onCellValueChanged = (event) => {
    console.log('Cell value changed:', {
      rowIndex: event.rowIndex,
      field: event.colDef.field,
      oldValue: event.oldValue,
      newValue: event.newValue,
      data: event.data
    });
    
    // Update the row data state
    const updatedRowData = [...rowData];
    updatedRowData[event.rowIndex] = event.data;
    setRowData(updatedRowData);
  };

  return (
    <div className="w-full h-screen p-4 bg-gray-50">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          AG Grid with Editable Status Dropdown
        </h1>
        <p className="text-gray-600">
          Click on any Status cell to edit it using the dropdown menu
        </p>
      </div>
      
      <div 
        className="ag-theme-alpine w-full bg-white shadow-lg rounded-lg"
        style={{ height: '500px' }}
      >
        <div
          className="ag-theme-alpine"
          style={{ height: '100%', width: '100%' }}
        >
          {/* AG Grid would be rendered here in a real implementation */}
          <div className="p-4 border border-gray-200 rounded">
            <div className="mb-4 text-sm text-gray-600">
              <strong>Note:</strong> This is a demonstration component showing the structure for AG Grid integration.
            </div>
            
            {/* Manual table representation for demonstration */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rowData.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{row.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={row.status}
                        onChange={(e) => {
                          const newRowData = [...rowData];
                          newRowData[index] = { ...row, status: e.target.value };
                          setRowData(newRowData);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                          backgroundColor: (() => {
                            switch(row.status) {
                              case 'Active': return '#d4edda';
                              case 'Inactive': return '#f8d7da';
                              case 'Pending': return '#fff3cd';
                              case 'Completed': return '#d1ecf1';
                              case 'Cancelled': return '#f5c6cb';
                              default: return 'white';
                            }
                          })(),
                          color: (() => {
                            switch(row.status) {
                              case 'Active': return '#155724';
                              case 'Inactive': return '#721c24';
                              case 'Pending': return '#856404';
                              case 'Completed': return '#0c5460';
                              case 'Cancelled': return '#721c24';
                              default: return 'black';
                            }
                          })()
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Current Data:</h3>
        <pre className="text-sm text-gray-600 overflow-auto">
          {JSON.stringify(rowData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AGGridExample;
