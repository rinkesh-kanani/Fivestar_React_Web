import React, { useState, useCallback, useEffect } from 'react';
import { Row, Card, CardBody, CardHeader, CardTitle, Col, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
//import { Edit, Trash2 } from 'react-feather';
import { getCustomerOfferList } from '../../../services/Admin/CustomerOfferService';
import Pagination from '../../../components/Pagination';
import { pagination } from '../../../data/raw';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'uo_id',
  fetch_for: '',
  status: ''
};

const CustomerOffer = () => {
  const dispatch = useDispatch();

  const CustomerOfferSelector = useSelector((state) => state.admin.CustomerOffer);
  const { CustomerOfferList } = CustomerOfferSelector;
  console.log(CustomerOfferList);
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getCustomerOfferList(payload));
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

  return (
    <>
      <Row className='app-user-list'>
        <Col sm='12'>
          <Card noBody>
            <CardHeader>
              <CardTitle>Customer Offer List</CardTitle>
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
                    <th>ID</th>
                    <th>STOCK_ID </th>
                    <th>LAB</th>
                    <th>SHAPE</th>
                    <th>COL</th>
                    <th>CLA</th>
                    <th>SIZE</th>
                    <th>CERT_NO</th>
                    <th>LOT.NO</th>
                    <th>MEASUREMENT </th>
                    <th>CUT</th>
                    <th>POL</th>
                    <th>SYM</th>
                    <th>FLOU</th>
                    <th>RAP</th>
                    <th>DEPTH</th>
                    <th>TABLE</th>
                    <th>W/B</th>
                    <th>LASER</th>
                    <th>BGM</th>
                    <th>REF</th>
                    <th>RE-MARK</th>
                    <th>DISC</th>
                    <th>COMPANY NAME</th>
                    <th>DATE</th>
                    <th>ST_STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {CustomerOfferList?.data?.map((item, index) => {
                    return (
                      <tr key={`CustomerOfferLi${item?.me_id}_index_${index}`}>
                        <th scope='row'>{index + 1}</th>
                        <td>{item?.stock_id}</td>
                        <td>{item?.lab}</td>
                        <td>{item?.shape}</td>
                        <td>{item?.color}</td>
                        <td>{item?.clarity}</td>
                        <td>{item?.size}</td>
                        <td>{item?.cert_no}</td>
                        <td>{item?.lot_no}</td>
                        <td>{item?.measurement}</td>
                        <td>{item?.cut}</td>
                        <td>{item?.polish}</td>
                        <td>{item?.symmetry}</td>
                        <td>{item?.flou}</td>
                        <td>{item?.rap}</td>
                        <td>{item?.depth}</td>
                        <td>{item?.table}</td>
                        <td>{item?.w_b}</td>
                        <td>{item?.laser}</td>
                        <td>{item?.bgm}</td>
                        <td>{item?.ref}</td>
                        <td>{item?.re_mark}</td>
                        <td>{item?.discount}</td>
                        <td>{item?.party}</td>
                        <td>{item?.date}</td>
                        <td>{item?.st_status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Col sm='12' className='d-flex justify-content-between align-items-center'>
                <span>{CustomerOfferList?.count}</span>
                <Pagination data={CustomerOfferList?.pagination_object} onChangePage={onChangePage} />
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CustomerOffer;
