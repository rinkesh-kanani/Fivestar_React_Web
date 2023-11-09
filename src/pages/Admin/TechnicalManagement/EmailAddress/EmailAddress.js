import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Modal, Table, Label, Input } from 'reactstrap';
import ReactSelect from 'react-select';
import { Edit, ChevronDown, ChevronUp } from 'react-feather';
import { getEmailAddress } from '../../../../services/Technical/EmailAddressService';
import Pagination from '../../../../components/Pagination';
import { pagination } from '../../../../data/raw';
import AddNewEmailAddress from './AddNewEmailAddress';
const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'ea_id',
  search_email_address: '',
  search_email_user_name: ''
};

const EmailAddress = () => {
  const EmailAddressSelector = useSelector((state) => state.technical.EmailAddress);
  const { EmailAddress } = EmailAddressSelector;

  const dispatch = useDispatch();
  const [ea_address, setea_address] = useState('');
  const [ea_uname, setea_uname] = useState();
  const [formModal, setFormModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });

  const loadData = useCallback(async () => {
    await dispatch(getEmailAddress(payload));
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleModal = useCallback(() => {
    if (formModal) {
      setSelectedItem(undefined);
    }
    setFormModal(!formModal);
  }, [formModal]);
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
  const onClickEdit = useCallback((item) => {
    setFormModal(true);
    setSelectedItem(item);
  }, []);
  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.search_email_address = ea_address;
      payload.search_email_user_name = ea_uname;
      loadData();
    },
    [ea_address, ea_uname, loadData]
  );
  const onSubmitClear = useCallback(() => {
    setea_address('');
    setea_uname('');
    payload.search_email_address = '';
    payload.search_email_user_name = '';
    loadData();
  }, [loadData]);

  const onClickOrderBy = useCallback(
    (field, order) => {
      payload.order_by_field = field;
      payload.order_by = order;
      loadData(false);
    },
    [loadData]
  );

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
                    Email Address :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='search Email Address'
                    placeholder='Search Email Address'
                    value={ea_address}
                    onChange={(e) => {
                      setea_address(e.target.value);
                    }}
                    style={{ marginRight: 10 }}
                  />
                </div>
                <div class='form-group col-md-3'>
                  <Label className='form-label ' for='User Name'>
                    User Name :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='search  User Name'
                    placeholder='Search Email User Name'
                    value={ea_uname}
                    onChange={(e) => {
                      setea_uname(e.target.value);
                    }}
                    style={{ marginRight: 10 }}
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
            <CardTitle>Email address List</CardTitle>
            <Button.Ripple className='mr-50' color='primary' onClick={toggleModal}>
              + Create New Email address
            </Button.Ripple>
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
                    EMAIL ADDRESS
                    <span>
                      <ChevronUp
                        className='menu-toggle-icon cursor-pointer '
                        size={15}
                        onClick={() => {
                          onClickOrderBy('ea_address', 'asc');
                        }}
                      />
                      <ChevronDown
                        className='menu-toggle-icon cursor-pointer'
                        size={15}
                        onClick={() => {
                          onClickOrderBy('ea_address', 'desc');
                        }}
                      />
                    </span>
                  </th>
                  <th>
                    USER NAME
                    <span>
                      <ChevronUp
                        className='menu-toggle-icon cursor-pointer '
                        size={15}
                        onClick={() => {
                          onClickOrderBy('ea_uname', 'asc');
                        }}
                      />
                      <ChevronDown
                        className='menu-toggle-icon cursor-pointer'
                        size={15}
                        onClick={() => {
                          onClickOrderBy('ea_uname  ', 'desc');
                        }}
                      />
                    </span>
                  </th>
                  <th>PASSWORD</th>
                  <th>HOST</th>
                  <th>PORT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {EmailAddress?.data?.map((item, index) => {
                  return (
                    <tr key={`EmailAddress_${item?.ea_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.ea_address}</td>
                      <td>{item?.ea_uname}</td>
                      <td>{item?.ea_pass}</td>
                      <td>{item?.ea_host}</td>
                      <td>{item?.ea_port}</td>
                      <td>{item?.ea_status === 1 ? 'YES' : 'NO'}</td>
                      <td>
                        <Edit
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickEdit(item);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{EmailAddress?.count}</span>
              <Pagination data={EmailAddress?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={formModal} toggle={toggleModal} className='modal-dialog modal-lg'>
        <AddNewEmailAddress onClose={toggleModal} onAddTopic={loadData} selectedItem={selectedItem} />
      </Modal>
    </>
  );
};
export default EmailAddress;
