import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { ChevronDown, ChevronUp } from 'react-feather';
import { getWorldwideStockList } from '../../services/WorldwideStock/WorldwideStockService';
import Pagination from '../../components/Pagination';
import { pagination_2 } from '../../data/raw';

const payload = {
  start: 1,
  per_page: '100',
  order_by: 'desc',
  order_by_field: 'ww_id',
  fetch_for: '',
  id: ''
};

const WorldwideStock = () => {
  const dispatch = useDispatch();

  const WorldwideStockListSelector = useSelector((state) => state.WorldwideStock.WorldwideStock);
  const { WorldwideStockList } = WorldwideStockListSelector;

  const [per_page, setPer_page] = useState({ label: 100, value: 100 });

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getWorldwideStockList(payload));
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
      <Col sm='12'>
        <Card noBody>
          <CardHeader>
            <CardTitle>World wide Stock</CardTitle>
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
            <Table hover responsive className='table table-striped table-fixed'>
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
                            onClickOrderBy('STONEID', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('STONEID', 'desc');
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
                            onClickOrderBy('LAB', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('LAB', 'desc');
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
                            onClickOrderBy('SHAPE', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('SHAPE', 'desc');
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
                            onClickOrderBy('COLOR', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('COLOR', 'desc');
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
                            onClickOrderBy('CLARITY', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('CLARITY', 'desc');
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
                            onClickOrderBy('WEIGHT', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('WEIGHT', 'desc');
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
                            onClickOrderBy('CERTIFICATENO', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('CERTIFICATENO', 'desc');
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
                            onClickOrderBy('MEASUREMENT', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('MEASUREMENT', 'desc');
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
                            onClickOrderBy('CUT', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('CUT', 'desc');
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
                            onClickOrderBy('POLISH', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('POLISH', 'desc');
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
                            onClickOrderBy('SYMMETRY', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('SYMMETRY', 'desc');
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
                            onClickOrderBy('FLUORESCENCE', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('FLUORESCENCE', 'desc');
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
                            onClickOrderBy('PRRATE', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('PRRATE', 'desc');
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
                            onClickOrderBy('TOTDEPTH', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('TOTDEPTH', 'desc');
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
                            onClickOrderBy('TABLED', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('TABLED', 'desc');
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
                            onClickOrderBy('ISNOBGMACTIVE', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('ISNOBGMACTIVE', 'desc');
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
                            onClickOrderBy('DIS', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('DIS', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {WorldwideStockList?.data?.map((item, index) => {
                  return (
                    <tr key={`WorldwideStockList_${item?.ww_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.STONEID}</td>
                      <td>{item?.LAB}</td>
                      <td>{item?.SHAPE}</td>
                      <td>{item?.COLOR}</td>
                      <td>{item?.CLARITY}</td>
                      <td>{item?.WEIGHT}</td>
                      <td>{item?.CERTIFICATENO}</td>
                      <td>{item?.MEASUREMENT}</td>
                      <td>{item?.CUT}</td>
                      <td>{item?.POLISH}</td>
                      <td>{item?.SYMMETRY}</td>
                      <td>{item?.FLUORESCENCE}</td>
                      <td>{item?.PRRATE}</td>
                      <td>{item?.TOTDEPTH}</td>
                      <td>{item?.TABLED}</td>
                      <td>{item?.ISNOBGMACTIVE}</td>
                      <td>{item?.DIS}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{WorldwideStockList?.count}</span>
              <Pagination data={WorldwideStockList?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default WorldwideStock;
