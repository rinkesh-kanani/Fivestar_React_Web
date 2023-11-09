import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { ChevronDown, ChevronUp } from 'react-feather';
import { getDubaiStockList } from '../../services/DubaiStock/DubaiStockService';
import Pagination from '../../components/Pagination';
import { pagination_2 } from '../../data/raw';

const payload = {
  start: 1,
  per_page: '100',
  order_by: 'desc',
  order_by_field: 'st_id',
  fetch_for: '',
  id: '',
  stone_id: ''
};

const DubaiStock = () => {
  const dispatch = useDispatch();

  const DubaiStockListSelector = useSelector((state) => state.DubaiStock.DubaiStock);
  const { DubaiStockList } = DubaiStockListSelector;

  const [per_page, setPer_page] = useState({ label: 100, value: 100 });

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getDubaiStockList(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangePage = useCallback(
    (page) => {
      payload.start = page;
      loadData();
    },
    [loadData]
  );

  const onChangePerPage = useCallback(
    (item) => {
      payload.per_page = item?.value;
      setPer_page(item);
      loadData();
    },
    [loadData]
  );

  const onClickOrderBy = useCallback(
    (field, order) => {
      payload.order_by_field = field;
      payload.order_by = order;
      loadData();
    },
    [loadData]
  );

  return (
    <>
      <Col>
        <Card>
          <CardHeader>
            <CardTitle>Dubai Stock</CardTitle>
          </CardHeader>
          <Col sm='3' className='d-flex  align-items-center'>
            Show
            <ReactSelect
              className='React col-6'
              classNamePrefix='select'
              value={per_page}
              name='clear'
              options={pagination_2}
              onChange={(item) => {
                onChangePerPage(item);
              }}
            />
            Entries
          </Col>
          <CardBody>
            <div className='table-responsive-lg'>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>SR.NO.</th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        STOCK_ID
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_stock_id', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_stock_id', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        LAB
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_lab', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_lab', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        SHAPE
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_shape', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_shape', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        COL
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_col', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_col', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        CLA
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_cla', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_cla', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        SIZE
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_size', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_size', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        CERT_NO
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_cert_no', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_cert_no', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        LOT.NO
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_lot_no', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_lot_no', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        MEASUREMENT
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_measurement', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_measurement', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        CUT
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_cut', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_cut', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        POL
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_pol', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_pol', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        SYM
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_sym', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_sym', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        FLOU
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_flou', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_flou', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        RAP
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_rap', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_rap', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        DEPTH
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_depth', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_depth', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        TABLE
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_table', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_table', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        W/B
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_wb', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_wb', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        LASER/SEAL
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_laser_seal', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_laser_seal', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        BGM
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_bgm', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_bgm', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        REF
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_ref', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_ref', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center justify-content-between'>
                        DISC
                        <span>
                          <ChevronUp
                            className='menu-toggle-icon cursor-pointer d-flex'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_dis', 'asc');
                            }}
                          />
                          <ChevronDown
                            className='menu-toggle-icon cursor-pointer'
                            size={15}
                            onClick={() => {
                              onClickOrderBy('st_dis', 'desc');
                            }}
                          />
                        </span>
                      </div>
                    </th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {DubaiStockList?.data?.map((item, index) => {
                    return (
                      <tr key={`DubaiStockList_${item?.st_id}_index_${index}`}>
                        <th scope='row'>{index + 1}</th>
                        <td>{item?.st_stock_id}</td>
                        <td>{item?.st_lab}</td>
                        <td>{item?.st_shape}</td>
                        <td>{item?.st_col}</td>
                        <td>{item?.st_cla}</td>
                        <td>{item?.st_size}</td>
                        <td>{item?.st_cert_no}</td>
                        <td>{item?.st_lot_no}</td>
                        <td>{item?.st_measurement}</td>
                        <td>{item?.st_cut}</td>
                        <td>{item?.st_pol}</td>
                        <td>{item?.st_sym}</td>
                        <td>{item?.st_flou}</td>
                        <td>{item?.st_rap}</td>
                        <td>{item?.st_depth}</td>
                        <td>{item?.st_table}</td>
                        <td>{item?.st_wb}</td>
                        <td>{item?.st_laser_seal}</td>
                        <td>{item?.st_bgm}</td>
                        <td>{item?.st_ref}</td>
                        <td>{item?.st_dis}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{DubaiStockList?.count}</span>
              <Pagination data={DubaiStockList?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DubaiStock;
