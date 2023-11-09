import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Table, Modal, Input, Label } from 'reactstrap';
import ReactSelect from 'react-select';
import { Trash2, Edit, ChevronDown, ChevronUp } from 'react-feather';
import { deleteMasterCategory, getMasterDetails } from '../../../../services/Technical/masterCategoryService';
import { pagination } from '../../../../data/raw';
import { getAllTopic } from '../../../../services/Technical/topicService';
import Pagination from '../../../../components/Pagination';
import AddNewMasterCategory from './AddNewMasterCategory';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'm_id',
  search_master: '',
  search_topic: ''
};

const MasterCategory = () => {
  const masterSelector = useSelector((state) => state.technical.master);
  const { masters } = masterSelector;
  const topicSelector = useSelector((state) => state.technical.topic);
  const { categoryTopics } = topicSelector;

  const dispatch = useDispatch();

  const [formModal, setFormModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });
  const [m_name, setm_name] = useState('');
  const [topic, setTopic] = useState();

  const topics = useMemo(() => {
    const data = categoryTopics?.data?.map((item) => {
      return { value: item?.cc_id, label: item?.cc_name };
    });
    return data;
  }, [categoryTopics?.data]);

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getMasterDetails(payload));
      if (isLoad) {
        dispatch(getAllTopic());
      }
    },
    [dispatch]
  );

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
    const payload = { m_id: selectedItem?.m_id };
    const result = await dispatch(deleteMasterCategory(payload));
    if (result) {
      onCloseConfirmation();
      loadData(false);
    }
  }, [selectedItem?.m_id, dispatch, onCloseConfirmation, loadData]);

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
      loadData(false);
    },
    [loadData]
  );

  const onClickOrderBy = useCallback(
    (field, order) => {
      payload.order_by_field = field;
      payload.order_by = order;
      loadData(false);
    },
    [loadData]
  );

  const onChangePage = useCallback(
    (page) => {
      payload.start = page;
      loadData(false);
    },
    [loadData]
  );
  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.search_master = m_name;
      payload.search_topic = `${topic?.value || ''}`;
      loadData(false);
    },
    [m_name, topic?.value, loadData]
  );
  const onSubmitClear = useCallback(() => {
    setm_name('');
    setTopic(null);
    payload.search_topic = '';
    payload.search_master = '';
    loadData(false);
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
                    Select Topic :
                  </Label>
                  <ReactSelect
                    className='React '
                    classNamePrefix='select'
                    value={topic}
                    name='clear'
                    options={topics}
                    isClearable={true}
                    onChange={(item) => {
                      setTopic(item);
                    }}
                  />
                </div>
                <div class='form-group col-md-3'>
                  <Label className='form-label ' for='Topic Name'>
                    Enter Master :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='search Topic Name'
                    placeholder='Enter Topic Name'
                    value={m_name}
                    onChange={(e) => {
                      setm_name(e.target.value);
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
            <CardTitle>Master Category List</CardTitle>
            <Button.Ripple className='mr-50' color='primary' onClick={toggleModal}>
              + Add New Master Category
            </Button.Ripple>
          </CardHeader>
          <Col sm='3' className='d-flex align-items-center'>
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
                      MASTER NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('m_name', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('m_name', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
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
                {masters?.data?.map((item, index) => {
                  return (
                    <tr key={`masters_${item?.m_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.m_name}</td>
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
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{masters?.count}</span>
              <Pagination data={masters?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={formModal} toggle={toggleModal} className='modal-dialog modal-lg'>
        <AddNewMasterCategory
          onClose={toggleModal}
          onAddMasterCategory={() => {
            loadData(false);
          }}
          selectedItem={selectedItem}
        />
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

export default MasterCategory;
