import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { ChevronDown, ChevronUp } from 'react-feather';
import { getFreelanchersList } from '../../../services/Admin/freelanchersService';
import Pagination from '../../../components/Pagination';
import { pagination } from '../../../data/raw';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'uid',
  fetch_for: '',
  id: ''
};

const Freelanchers = () => {
  const dispatch = useDispatch();

  const FreelanchersSelector = useSelector((state) => state.admin.Freelanchers);
  const { FreelanchersList } = FreelanchersSelector;

  const [per_page, setPer_page] = useState({ label: 10, value: 10 });

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getFreelanchersList(payload));
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
            <CardTitle>Freelanchers</CardTitle>
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
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      FULL NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('fullname', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('fullname', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      PHONE NO
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('phone_no', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('phone_no', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      MOBILE NO
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('mobile_no', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('mobile_no', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      ADDRESS
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('address', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('address', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      CITY
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('city', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('city', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      STATE
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('state', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('state', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    {' '}
                    <div className='d-flex align-items-center justify-content-between'>
                      COUNTRY
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('country', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('country', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      ZIP CODE
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('zip_code', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('zip_code', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      BIRTHDATE
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('birth_date', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('birth_date', 'desc');
                          }}
                        />
                      </span>
                    </div>{' '}
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      EMAIL
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('email', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('email', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    {' '}
                    <div className='d-flex align-items-center justify-content-between'>
                      USERNAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('uname', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('uname', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      PASSWORD
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('password', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('password', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      JOIN DATE
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('join_date', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('join_date', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      DISCOUNT(%)
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('discount', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('discount', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      MEMBERSHIP
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('membership', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('membership', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      FREELANCER MEMBERSHIP
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('free_membership', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('free_membership', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      HOLD TIME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('hold_time', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('hold_time', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      TERMS
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('terms', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('terms', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      WHATSAPP NO
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('whatsapp', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('whatsapp', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      SKYPE ID
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('skype', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('skype', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      TELEGRAM ID 1
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('tele1', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('tele1', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      TELEGRAM ID 2
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('tele2', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('tele2', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {FreelanchersList?.data?.map((item, index) => {
                  return (
                    <tr key={`FreelanchersList_${item?.uid}_index_${index}`}>
                      <td>{item?.uid}</td>
                      <td>{item?.fullname}</td>
                      <td>{item?.phone_no}</td>
                      <td>{item?.mobile_no}</td>
                      <td>{item?.address}</td>
                      <td>{item?.city}</td>
                      <td>{item?.state}</td>
                      <td>{item?.country}</td>
                      <td>{item?.zip_code}</td>
                      <td>{item?.birth_date}</td>
                      <td>{item?.email}</td>
                      <td>{item?.uname}</td>
                      <td>{item?.password}</td>
                      <td>{item?.join_date}</td>
                      <td>{item?.discount}</td>
                      <td>{item?.membership}</td>
                      <td>{item?.free_membership}</td>
                      <td>{item?.hold_time}</td>
                      <td>{item?.terms}</td>
                      <td>{item?.whatsapp}</td>
                      <td>{item?.skype}</td>
                      <td>{item?.tele1}</td>
                      <td>{item?.tele2}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{FreelanchersList?.count}</span>
              <Pagination data={FreelanchersList?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Freelanchers;
