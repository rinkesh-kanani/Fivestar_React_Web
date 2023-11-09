import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardTitle, Col, Table } from 'reactstrap';
import ReactSelect from 'react-select';
import { ChevronUp, ChevronDown } from 'react-feather';
import { pagination } from '../../../data/raw';
import Pagination from '../../../components/Pagination';
import { fetchSingleOrder } from '../../../services/Admin/orderService';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'ol_order_id',
  fetch_for: '',
  id: ''
};

const OrderDetails = (props) => {
  const id = props.location?.state?.order_id;
  const adminSelector = useSelector((state) => state.admin.order);
  const { singleOrder } = adminSelector;
  const dispatch = useDispatch();
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });

  const loadData = useCallback(async () => {
    payload.id = id;
    await dispatch(fetchSingleOrder(payload));
  }, [dispatch, id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const onChangePage = useCallback(
    (page) => {
      payload.start = `${page}`;
      loadData();
    },
    [loadData]
  );

  return (
    <>
      <Col sm='12'>
        <Card noBody>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <Col sm='3' className='d-flex  align-items-center'>
            Show
            <ReactSelect
              className='React col-6'
              classNamePrefix='select'
              value={per_page}
              name='clear'
              options={pagination}
              onChange={(item) => {
                onChangePerPage(item);
              }}
            />
            Entries
          </Col>

          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>SR.NO.</th>
                  <th className='d-flex'>
                    STOCK_ID
                    <span>
                      <ChevronUp
                        className='menu-toggle-icon cursor-pointer d-flex'
                        size={15}
                        onClick={() => {
                          onClickOrderBy('stock_id', 'asc');
                        }}
                      />
                      <ChevronDown
                        className='menu-toggle-icon cursor-pointer'
                        size={15}
                        onClick={() => {
                          onClickOrderBy('stock_id', 'desc');
                        }}
                      />
                    </span>
                  </th>
                  <th>LAB</th>
                  <th>SHAPE</th>
                  <th>COLOR</th>
                  <th>CLARITY</th>
                  <th>SIZE</th>
                  <th>CERT_NO</th>
                  <th>MEASUREMENT</th>
                  <th>CUT</th>
                  <th>POLISH</th>
                  <th>SYMMETRY</th>
                  <th>FLOU</th>
                  <th>RAP</th>
                  <th>DIS(%)</th>
                  <th>TOTAL</th>
                  <th>COMPANY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {singleOrder?.data?.map((item, index) => {
                  return (
                    <tr key={`order_${item?.order_id}_${item?.stock_id}_index_${index}`}>
                      <td>{index + 1}</td>
                      <td>{item?.stock_id}</td>
                      <td>
                        <a href={item?.certificate} target={'_blank'} rel='noreferrer'>
                          {item?.lab}
                        </a>
                      </td>
                      <td>{item?.shape}</td>
                      <td>{item?.color}</td>
                      <td>{item?.clarity}</td>
                      <td>{item?.size}</td>
                      <td>{item?.cert_no}</td>
                      <td>{item?.measurement}</td>
                      <td>{item?.cut}</td>
                      <td>{item?.polish}</td>
                      <td>{item?.symmetry}</td>
                      <td>{item?.flou}</td>
                      <td>{item?.rap}</td>
                      <td>{item?.discount}</td>
                      <td>{item?.total}</td>
                      <td>{item?.company_name}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{singleOrder?.count}</span>
              <Pagination data={singleOrder?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};
export default OrderDetails;
