import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Table, Modal, Input, Label } from 'reactstrap';
import { Trash2, Edit, ChevronUp, ChevronDown } from 'react-feather';
import ReactSelect from 'react-select';
import { getAllTopic } from '../../../../services/Technical/topicService';
import { deletePrimeCategory, getPrimeDetails } from '../../../../services/Technical/primeCategoryService';
import Pagination from '../../../../components/Pagination';
import { pagination } from '../../../../data/raw';
import { fetchMasterCategoryList } from '../../../../services/Technical/masterCategoryService';
import AddNewPrimeCategory from './AddNewPrimeCategory';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'p_id',
  search_master: '',
  search_topic: '',
  search_prime: ''
};

const PrimeCategory = () => {
  const primeSelector = useSelector((state) => state.technical.prime);
  const { primes } = primeSelector;
  const topicSelector = useSelector((state) => state.technical.topic);
  const { categoryTopics } = topicSelector;
  const fetchMasterListSelector = useSelector((state) => state.technical.master);
  const { masterCategoryList } = fetchMasterListSelector;
  const dispatch = useDispatch();

  const [formModal, setFormModal] = useState(false);
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [p_name, setp_name] = useState('');
  const [topic, setTopic] = useState();
  const [master, setMaster] = useState();

  const topics = useMemo(() => {
    const data = categoryTopics?.data?.map((item) => {
      return { value: item?.cc_id, label: item?.cc_name };
    });
    return data;
  }, [categoryTopics?.data]);

  const selectmasters = useMemo(() => {
    const data = masterCategoryList?.data?.map((item) => {
      return { value: item?.m_id, label: item?.m_name };
    });
    return data;
  }, [masterCategoryList]);

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getPrimeDetails(payload));
      if (isLoad) {
        dispatch(getAllTopic());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleModal = useCallback(() => {
    if (formModal) {
      setSelectedItem(undefined);
    }
    setFormModal(!formModal);
  }, [formModal]);

  const onOpenConfirmation = useCallback(() => {
    setDeleteConfirmation(true);
  }, []);

  const onCloseConfirmation = useCallback(() => {
    setDeleteConfirmation(false);
    setSelectedItem(undefined);
  }, []);

  const onDelete = useCallback(async () => {
    const payload = { p_id: selectedItem?.p_id };
    const result = await dispatch(deletePrimeCategory(payload));
    if (result) {
      onCloseConfirmation();
      loadData(false);
    }
  }, [selectedItem?.p_id, dispatch, onCloseConfirmation, loadData]);

  const onClickDelete = useCallback(
    (item) => {
      onOpenConfirmation();
      setSelectedItem(item);
    },
    [onOpenConfirmation]
  );

  const onClickEdit = useCallback((item) => {
    setFormModal(true);
    setSelectedItem(item);
  }, []);

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

  const onChangeTopic = useCallback(
    async (item) => {
      setTopic(item);
      setMaster(null);
      const payload = {
        prime_topic: item?.value
      };
      await dispatch(fetchMasterCategoryList(payload));
    },
    [dispatch]
  );

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.search_prime = p_name;
      payload.search_topic = `${topic?.value || ''}`;
      payload.search_master = `${master?.value || ''}`;
      loadData(false);
    },
    [p_name, topic?.value, master?.value, loadData]
  );
  const onSubmitClear = useCallback(() => {
    setp_name('');
    setTopic(null);
    setMaster(null);
    payload.search_prime = '';
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
                <div class='form-group col-md-4'>
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
                      onChangeTopic(item);
                    }}
                  />
                </div>
                <div class='form-group col-md-4'>
                  <Label className='form-label ' for='Topic Name'>
                    Select Master :
                  </Label>
                  <ReactSelect
                    className='React '
                    classNamePrefix='select'
                    value={master}
                    name='clear'
                    options={selectmasters}
                    isClearable={true}
                    onChange={(item) => {
                      setMaster(item);
                    }}
                  />
                </div>
                <div class='form-group col-md-4'>
                  <Label className='form-label ' for='Topic Name'>
                    Enter Prime :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='search Prime Category'
                    placeholder='Enter Prime Category'
                    value={p_name}
                    onChange={(e) => {
                      setp_name(e.target.value);
                    }}
                    style={{ marginRight: 10 }}
                  />
                </div>
                <div class='form-group col-md-6'>
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
            <CardTitle>Prime Category List</CardTitle>
            <Button.Ripple className='mr-50' color='primary' onClick={toggleModal}>
              + Add New Prime Category
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
                      PRIME CATEGORY NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('p_name', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer  d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('p_name', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      MASTER CATEGORY NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer  d-flex'
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
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('cc_name', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer  d-flex'
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
                {primes?.data?.map((item, index) => {
                  return (
                    <tr key={`primes_${item?.p_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.p_name}</td>
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
              <span>{primes?.count}</span>
              <Pagination data={primes?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={formModal} toggle={toggleModal} className='modal-dialog modal-lg'>
        <AddNewPrimeCategory
          onClose={toggleModal}
          onAddPrimeCategory={() => {
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
export default PrimeCategory;
