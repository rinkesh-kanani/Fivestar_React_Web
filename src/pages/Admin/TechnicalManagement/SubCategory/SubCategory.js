import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { Trash2, Edit, ChevronUp, ChevronDown } from 'react-feather';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Modal, Table, Label } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import Pagination from '../../../../components/Pagination';
import { pagination } from '../../../../data/raw';
import { deleteSubCategory, getSubDetails } from '../../../../services/Technical/subCategoryService';
import { getAllTopic } from '../../../../services/Technical/topicService';
import { fetchMasterCategoryList } from '../../../../services/Technical/masterCategoryService';
import { fetchPrimeCategoryList } from '../../../../services/Technical/primeCategoryService';
import AddNewSubCategory from './AddNewSubCategory';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'p_id',
  search_master: '',
  search_topic: '',
  search_prime: '',
  search_sub_name: '',
  search_sub_code: ''
};
const SubCategory = () => {
  const subSelector = useSelector((state) => state.technical.sub);
  const { subs } = subSelector;
  const topicSelector = useSelector((state) => state.technical.topic);
  const { categoryTopics } = topicSelector;
  const fetchMasterListSelector = useSelector((state) => state.technical.master);
  const { masterCategoryList } = fetchMasterListSelector;
  const primeSelector = useSelector((state) => state.technical.prime);
  const { primeCategory } = primeSelector;

  const dispatch = useDispatch();
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [s_name, sets_name] = useState('');
  const [s_code, sets_code] = useState('');
  const [topic, setTopic] = useState();
  const [master, setMaster] = useState();
  const [prime, setPrime] = useState();

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

  const prime_category_list = useMemo(() => {
    const data = primeCategory?.data?.map((item) => {
      return { value: item?.p_id, label: item?.p_name };
    });
    return data;
  }, [primeCategory?.data]);

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getSubDetails(payload));
      if (isLoad) {
        dispatch(getAllTopic());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const onClickDelete = useCallback(
    (item) => {
      onOpenConfirmation();
      setSelectedItem(item);
    },
    [onOpenConfirmation]
  );

  const onDelete = useCallback(async () => {
    const payload = { s_id: selectedItem?.s_id };
    const result = await dispatch(deleteSubCategory(payload));
    if (result) {
      onCloseConfirmation();
      loadData(false);
    }
  }, [dispatch, loadData, onCloseConfirmation, selectedItem?.s_id]);

  const onClickEdit = useCallback((item) => {
    setFormModal(true);
    setSelectedItem(item);
  }, []);

  const onChangeTopic = useCallback(
    async (item) => {
      setTopic(item);
      setMaster(null);
      setPrime(null);
      const payload = {
        prime_topic: item?.value
      };
      await dispatch(fetchMasterCategoryList(payload));
    },
    [dispatch]
  );

  const onChangeMasterCategory = useCallback(
    async (item) => {
      setMaster(item);
      setPrime(null);
      const payload = {
        sub_master: item?.value
      };
      await dispatch(fetchPrimeCategoryList(payload));
    },
    [dispatch]
  );

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.search_sub_name = s_name;
      payload.search_sub_code = s_code;
      payload.search_topic = `${topic?.value || ''}`;
      payload.search_master = `${master?.value || ''}`;
      payload.search_prime = `${prime?.value || ''}`;
      loadData(false);
    },
    [s_name, s_code, topic?.value, master?.value, prime?.value, loadData]
  );
  const onSubmitClear = useCallback(() => {
    sets_name('');
    sets_code('');
    setPrime(null);
    setMaster(null);
    setTopic(null);
    payload.search_sub_name = '';
    payload.search_sub_code = '';
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
                <div class='form-group col-sm-3'>
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
                <div class='form-group col-sm-3'>
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
                      onChangeMasterCategory(item);
                    }}
                  />
                </div>
                <div class='form-group col-sm-3'>
                  <Label className='form-label ' for='Topic Name'>
                    Select Prime :
                  </Label>
                  <ReactSelect
                    className='React'
                    classNamePrefix='select'
                    value={prime}
                    name='clear'
                    options={prime_category_list}
                    isClearable={true}
                    onChange={(item) => {
                      setPrime(item);
                    }}
                  />
                </div>
                <div class='form-group col-sm-3'>
                  <Label className='form-label ' for='Topic Name'>
                    Enter Sub Category :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='search Topic Name'
                    placeholder='Enter Sub Category'
                    value={s_name}
                    onChange={(e) => {
                      sets_name(e.target.value);
                    }}
                    style={{ marginRight: 26 }}
                  />
                </div>
                <div class='form-group col-sm-3'>
                  <Label className='form-label ' for='Topic Name'>
                    Enter Sub Category Code :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='search Sub Category Code'
                    placeholder='Enter Sub Category Code'
                    value={s_code}
                    onChange={(e) => {
                      sets_code(e.target.value);
                    }}
                    style={{ marginRight: 28 }}
                  />
                </div>
                <div class='form-group col-md-6 ' style={{ marginTop: '20px' }}>
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
            <CardTitle>Sub Category List</CardTitle>
            <Button.Ripple className='mr-50' color='primary' onClick={toggleModal}>
              + Add New Sub Category
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
                      SUB CATEGORY NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('s_name', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('s_name', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      SUB CATEGORY CODE
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('s_code', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('s_code', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      PRIME CATEGORY NAME
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('p_name', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
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
                {subs?.data?.map((item, index) => {
                  return (
                    <tr key={`Subs_${item?.s_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.s_name}</td>
                      <td>{item?.s_code}</td>
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
              <span>{subs?.count}</span>
              <Pagination data={subs?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={formModal} toggle={toggleModal} className='modal-dialog modal-lg'>
        <AddNewSubCategory
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
export default SubCategory;
