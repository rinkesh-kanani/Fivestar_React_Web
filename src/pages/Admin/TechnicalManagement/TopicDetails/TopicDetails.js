import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Modal, Table, Label } from 'reactstrap';
import ReactSelect from 'react-select';
import { Trash2, Edit, ChevronUp, ChevronDown } from 'react-feather';
import SweetAlert from 'react-bootstrap-sweetalert';
import { pagination } from '../../../../data/raw';
import Pagination from '../../../../components/Pagination';
import { deleteTopic, getTopicDetails } from '../../../../services/Technical/topicService';
import AddNewTopic from './AddNewTopic';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'cc_id',
  search_topic: ''
};

const TopicDetails = () => {
  const topicSelector = useSelector((state) => state.technical.topic);
  const { topics } = topicSelector;
  const dispatch = useDispatch();
  const [formModal, setFormModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [cc_name, setCc_name] = useState();

  const [per_page, setPer_page] = useState({ label: 10, value: 10 });

  const loadData = useCallback(async () => {
    await dispatch(getTopicDetails(payload));
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onOpenConfirmation = useCallback(() => {
    setDeleteConfirmation(true);
  }, []);

  const onCloseConfirmation = useCallback(() => {
    setDeleteConfirmation(false);
    setSelectedItem(undefined);
  }, []);

  const onClickDelete = useCallback(
    (item) => {
      onOpenConfirmation();
      setSelectedItem(item);
    },
    [onOpenConfirmation]
  );

  const onDelete = useCallback(async () => {
    const payload = { cc_id: selectedItem?.cc_id };
    const result = await dispatch(deleteTopic(payload));
    if (result) {
      onCloseConfirmation();
      loadData();
    }
  }, [selectedItem?.cc_id, dispatch, onCloseConfirmation, loadData]);

  const onClickEdit = useCallback((item) => {
    setFormModal(true);
    setSelectedItem(item);
  }, []);

  const toggleModal = useCallback(() => {
    if (formModal) {
      setSelectedItem(undefined);
    }
    setFormModal(!formModal);
  }, [formModal]);

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
      payload.start = page;
      loadData();
    },
    [loadData]
  );

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.search_topic = cc_name;
      loadData();
    },
    [cc_name, loadData]
  );
  const onSubmitClear = useCallback(() => {
    setCc_name('');
    payload.search_topic = '';
    loadData();
  }, [loadData]);

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
                    Topic Name :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='search Topic Name'
                    placeholder='Enter Topic Name'
                    value={cc_name}
                    onChange={(e) => {
                      setCc_name(e.target.value);
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
            <CardTitle>Topic List</CardTitle>
            <Button.Ripple className='mr-50' color='primary' onClick={toggleModal}>
              + Add New Topic
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
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      TOPIC NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('cc_name', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('cc_name', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {topics?.data?.map((item, index) => {
                  return (
                    <tr key={`topics_${item?.cc_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.cc_name}</td>
                      <td>
                        <Trash2
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickDelete(item);
                          }}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Edit
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickEdit(item);
                          }}
                        />
                      </td>
                      {/* <td>@mdo</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{topics?.count}</span>
              <Pagination data={topics?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>

      <Modal isOpen={formModal} toggle={toggleModal} className='modal-dialog modal-lg'>
        <AddNewTopic onClose={toggleModal} onAddTopic={loadData} selectedItem={selectedItem} />
      </Modal>

      <SweetAlert
        title='Are you sure?'
        warning
        show={deleteConfirmation}
        showCancel
        reverseButtons
        cancelBtnBsStyle='danger'
        confirmBtnText='Yes, delete it!'
        cancelBtnText='Cancel'
        onConfirm={onDelete}
        onCancel={onCloseConfirmation}>
        You won't be able to revert this!
      </SweetAlert>
    </>
  );
};
export default TopicDetails;
