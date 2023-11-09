import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { getAutoCompany } from '../../services/Admin/orderService';
import { getDubaiStockList } from '../../services/DubaiStock/DubaiStockService';
import '../../assets/scss/plugins/tables/_agGridStyleOverride.scss';
import '../../assets/scss/pages/users.scss';
import AgGridTable from '../../components/AgGridTable';
import { isEmail, isEmpty } from '../../helpers/common';
import { createOnHold } from '../../services/Hold/HoldService';

const payload = {
  start: 1,
  per_page: '100',
  order_by: 'desc',
  order_by_field: 'st_id',
  fetch_for: '',
  id: '',
  stone_id: ''
};

const AddNewHold = ({ onClose, onAddHold, selectedItem }) => {
  const [email, setEmail] = useState('');
  const [re_mark, setRe_mark] = useState('');
  const [stone_id, setStone_id] = useState('');
  const [selectedCompany, setSelectedCompany] = useState();
  const [rowData, setRowData] = useState();
  const [selectedRows, setSelectedRows] = useState();

  const dispatch = useDispatch();

  const columnDefs = useMemo(() => {
    return [
      {
        headerName: 'SR.NO.',
        field: 'st_id',
        width: 150,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true
      },
      {
        headerName: 'STOCK_ID',
        field: 'st_stock_id',
        width: 150
      },
      {
        headerName: 'LAB',
        field: 'st_lab',
        width: 150
      },
      {
        headerName: 'SHAPE',
        field: 'st_shape',
        width: 150
      },
      {
        headerName: 'COL',
        field: 'st_col',
        width: 150
      },
      {
        headerName: 'CLA',
        field: 'st_cla',
        width: 150
      },
      {
        headerName: 'SIZE',
        field: 'st_size',
        width: 150
      },
      {
        headerName: 'CERT_NO',
        field: 'st_cert_no',
        width: 150
      },
      {
        headerName: 'LOT.NO',
        field: 'st_lot_no',
        width: 150
      },
      {
        headerName: 'MEASUREMENT',
        field: 'st_measurement',
        width: 200
      },
      {
        headerName: 'CUT',
        field: 'st_cut',
        width: 150
      },
      {
        headerName: 'POL',
        field: 'st_pol',
        width: 150
      },
      {
        headerName: 'SYM',
        field: 'st_sym',
        width: 150
      },
      {
        headerName: 'FLOU',
        field: 'st_flou',
        width: 150
      },
      {
        headerName: 'RAP',
        field: 'st_rap',
        width: 150
      },
      {
        headerName: 'DEPTH',
        field: 'st_depth',
        width: 150
      },
      {
        headerName: 'TABLE',
        field: 'st_table',
        width: 150
      },
      {
        headerName: 'W/B',
        field: 'st_wb',
        width: 150
      },
      {
        headerName: 'LASER/SEAL',
        field: 'st_laser_seal',
        width: 150
      },
      {
        headerName: 'BGM',
        field: 'st_bgm',
        width: 150
      },

      {
        headerName: 'REF',
        field: 'st_ref',
        width: 150
      },
      {
        headerName: 'DISC',
        field: 'st_dis',
        width: 150
      }
    ];
  }, []);

  const loadData = useCallback(async () => {
    const result = await dispatch(getDubaiStockList(payload));
    if (result) {
      setRowData(result?.data);
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadOptions = (inputValue) => {
    const payload = {
      term: inputValue
    };
    return dispatch(getAutoCompany(payload));
  };

  const onChangeCompany = useCallback((item) => {
    setSelectedCompany(item);
    setEmail(item?.email);
  }, []);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.stone_id = stone_id;
      loadData();
    },
    [loadData, stone_id]
  );

  const onSubmitClear = useCallback(() => {
    setStone_id('');
    payload.stone_id = '';
    loadData();
  }, [loadData]);

  const onSelectRows = useCallback((rows) => {
    setSelectedRows(rows);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isEmpty(selectedCompany)) {
        toast.error('Please select company');
        return;
      } else if (isEmpty(email)) {
        toast.error('Please enter email');
        return;
      } else if (email && !isEmail(email)) {
        toast.error('Please enter valid email');
        return;
      } else if (isEmpty(re_mark)) {
        toast.error('Please enter re-mark');
        return;
      } else if (isEmpty(selectedRows)) {
        toast.error('Please select diamond');
        return;
      }
      const selectedStock = selectedRows?.map((item) => item?.st_stock_id);
      const selectedDisc = selectedRows?.map((item) => item?.st_dis);
      const sh = selectedStock.toString();
      const dis = selectedDisc.toString();
      const payload = {
        prty: selectedCompany?.idx,
        mails: email,
        remark: re_mark,
        rg_i: selectedCompany?.rg_i,
        rg_hold_time: selectedCompany?.rg_hold_time,
        bfrg_i: selectedCompany?.bfrg_i,
        sh,
        dis
      };
      const result = await dispatch(createOnHold(payload));
      if (result) {
        onAddHold();
        onClose();
      }
    },
    [dispatch, email, onAddHold, onClose, re_mark, selectedCompany, selectedRows]
  );

  // const isRowSelectable = useMemo(() => {
  //   return (rowNode) => {
  //     const index = HoldList?.data?.findIndex((x) => x?.stock_id === rowNode?.data?.st_stock_id);
  //     return index !== -1 ? true : false;
  //   };
  // }, [HoldList?.data]);

  return (
    <>
      <ModalHeader toggle={() => onClose()}>{selectedItem ? 'Update' : 'Create'} Hold</ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <div class='form-row '>
            <div class='form-group col-md-4'>
              <Label className='form-label' for='Company name'>
                Company name :
              </Label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                value={selectedCompany}
                onChange={(item) => {
                  onChangeCompany(item);
                }}
              />
            </div>
            <div class='form-group col-md-4'>
              <Label className='form-label' for='Email'>
                Email :
              </Label>
              <Input
                type='text'
                id='Email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div class='form-group col-md-4'>
              <Label className='form-label' for='Re-mark'>
                Re-mark :
              </Label>
              <Input
                type='text'
                id='Re-mark'
                placeholder='Enter re-mark'
                value={re_mark}
                onChange={(e) => {
                  setRe_mark(e.target.value);
                }}
              />
            </div>
          </div>

          <div class='form-row '>
            <div class='form-group col-md-4'>
              <Label className='form-label' for=' Stone Id'>
                Stone Id :
              </Label>
              <Input
                type='text'
                id=' StoneId'
                placeholder='Enter stone id here'
                value={stone_id}
                onChange={(e) => {
                  setStone_id(e.target.value);
                }}
              />
            </div>
            <div class='form-group col-md-6' style={{ marginTop: '20px' }}>
              <Button.Ripple className='mr-50' color='primary' type='button' onClick={onSubmitSearch}>
                Search
              </Button.Ripple>
              <Button.Ripple className='mr-50' color='primary' type='button' onClick={onSubmitClear}>
                Reset
              </Button.Ripple>
            </div>
          </div>

          <div className='ag-theme-material ag-grid-table'>
            {rowData !== null ? (
              <AgGridTable
                gridOptions={{}}
                rowSelection='multiple'
                columnDefs={columnDefs}
                rowData={rowData}
                colResizeDefault={'shift'}
                animateRows={true}
                pivotPanelShow='always'
                resizable={true}
                // isRowSelectable={isRowSelectable}
                onSelectRows={onSelectRows}
              />
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple className='mr-50' color='primary' type='submit'>
            Upload
          </Button.Ripple>
          <Button.Ripple className='mr-50' color='primary' type='button'>
            Reset
          </Button.Ripple>
        </ModalFooter>
      </form>
    </>
  );
};

export default AddNewHold;
