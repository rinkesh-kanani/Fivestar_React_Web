import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Table, Label } from 'reactstrap';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import { ChevronUp, ChevronDown } from 'react-feather';
import { order_status, pagination } from '../../../data/raw';
import Pagination from '../../../components/Pagination';
import { changeOrderStatus, getAutoCompany, getOrderList } from '../../../services/Admin/orderService';
import { updateOrderListItem } from '../../../redux/actions/admin/orderActions';
import { ADMIN_ROUTE } from '../../../constants/constant';
const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'ol_order_id',
  fetch_for: '',
  id: ''
};

const OrderList = (props) => {
  const adminSelector = useSelector((state) => state.admin.order);
  const { orderList } = adminSelector;
  const dispatch = useDispatch();
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });
  const [selectedCompany, setSelectedCompany] = useState();

  const loadData = useCallback(async () => {
    await dispatch(getOrderList(payload));
  }, [dispatch]);

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

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.fetch_for = '';
      loadData();
    },
    [loadData]
  );

  const onSubmitClear = useCallback(() => {
    payload.fetch_for = '';
    loadData();
  }, [loadData]);

  const onClickOrder = useCallback(
    (item) => {
      props.history.push({ pathname: `${ADMIN_ROUTE}/order_details`, state: { order_id: item?.order_id } });
    },
    [props.history]
  );

  const onChangeStatus = useCallback(
    (statusitem, item) => {
      const newItem = {
        ...item,
        status: statusitem?.value
      };
      dispatch(updateOrderListItem({ item: newItem }));
    },
    [dispatch]
  );

  const onSubmitItem = useCallback(
    async (item) => {
      const payload = {
        status: item?.status,
        id: item?.order_id
      };
      const result = await dispatch(changeOrderStatus(payload));
      if (result) {
        loadData();
      }
    },
    [dispatch, loadData]
  );
  // const filterColors = (inputValue) => {
  //   return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  // };
  const loadOptions = (inputValue) => {
    const payload = {
      term: inputValue
    };
    return dispatch(getAutoCompany(payload));
  };

  const onChangeCompany = useCallback((item) => {
    setSelectedCompany(item);
  }, []);

  return (
    <>
      <Col sm='12'>
        <Card noBody>
          <CardHeader>
            <CardTitle>Search Filter</CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={onSubmitSearch}>
              <div class='form-row '>
                <div class='form-group col-md-3'>
                  <Label className='form-label ' for='Topic Name'>
                    Company Name :
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
                <div class='form-group col-md-6' style={{ marginTop: '20px' }}>
                  <Button.Ripple className='mr-50' color='primary' type='submit'>
                    Apply Filter
                  </Button.Ripple>
                  <Button.Ripple className='mr-50' color='primary' type='button' onClick={onSubmitClear}>
                    Clear Filter
                  </Button.Ripple>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
      <Col sm='12'>
        <Card noBody>
          <CardHeader>
            <CardTitle>Order List</CardTitle>
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
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      ORDER_ID
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('order_id', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('order_id', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      TOTAL_PCS
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('total_pcs', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('total_pcs', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      COMPANY NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('company_name', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('company_name', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      CONTACT NO
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('contact_no', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('contact_no', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      DATE
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('date', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('date', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      STATUS
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('status', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('status', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orderList?.data?.map((item, index) => {
                  const selectedStatus = { label: item?.status, value: item?.status };
                  return (
                    <tr key={`orderList_${item?.order_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td
                        className='cursor-pointer'
                        onClick={() => {
                          onClickOrder(item);
                        }}>
                        {item?.order_id}
                      </td>
                      <td>{item?.total_pcs}</td>
                      <td>{item?.company_name}</td>
                      <td>{item?.contact_no}</td>
                      <td>{item?.date}</td>
                      <td>
                        <ReactSelect
                          className='React col-12'
                          classNamePrefix='select'
                          value={selectedStatus}
                          name='clear'
                          options={order_status}
                          onChange={(statusitem) => {
                            onChangeStatus(statusitem, item);
                          }}
                        />
                      </td>
                      <td>
                        <Button.Ripple
                          className='mr-50'
                          color='primary'
                          type='button'
                          onClick={() => {
                            onSubmitItem(item);
                          }}>
                          Submit
                        </Button.Ripple>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{orderList?.count}</span>
              <Pagination data={orderList?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};
export default OrderList;
