import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { useMemo } from 'react';

const AgGridTable = ({ columnDefs, rowData, resizable, onSelectRows, ...props }) => {
  const onSelectionChanged = (data) => {
    if (onSelectRows) {
      var selectedRows = data.api.getSelectedRows();
      onSelectRows(selectedRows);
    }
  };
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true
    };
  }, []);

  return (
    <AgGridReact
      columnDefs={columnDefs}
      rowData={rowData}
      colResizeDefault={'shift'}
      defaultColDef={defaultColDef}
      pivotPanelShow='always'
      onSelectionChanged={onSelectionChanged}
      resizable={resizable}
      {...props}
    />
  );
};

export default AgGridTable;
