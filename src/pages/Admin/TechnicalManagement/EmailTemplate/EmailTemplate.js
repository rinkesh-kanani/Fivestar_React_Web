import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Trash2, Edit, ChevronUp, ChevronDown } from 'react-feather';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Modal, Table, Label } from 'reactstrap';
import ReactSelect from 'react-select';
import { useHistory } from 'react-router-dom';
import Pagination from '../../../../components/Pagination';
import { pagination } from '../../../../data/raw';
import { getAllTopic } from '../../../../services/Technical/topicService';
import { getEmailTemplate, deleteEmailTemplate } from '../../../../services/Technical/EmailTemplateService';
import { fetchAllMasterList } from '../../../../services/Technical/masterCategoryService';
import { fetchSubCategoryList } from '../../../../services/Technical/subCategoryService';
import { fetchPrimeCategoryList } from '../../../../services/Technical/primeCategoryService';
const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'et_id',
  et_m_id: '',
  et_p_id: '',
  et_s_id: '',
  et_subject: ''
};
const EmailTemplate = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const EmailTemplateSelector = useSelector((state) => state.technical.EmailTemplate);
  const { EmailTemplate } = EmailTemplateSelector;

  const primeSelector = useSelector((state) => state.technical.prime);
  const { primeCategory } = primeSelector;

  const fetchAllMasterListSelector = useSelector((state) => state.technical.master);
  const { allMasterList } = fetchAllMasterListSelector;

  const subSelector = useSelector((state) => state.technical.sub);
  const { SubCategory } = subSelector;
  //console.log('fetchAllMasterListSelector', fetchAllMasterListSelector);
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });
  const [p_name, setp_name] = useState('');
  const [topic, setTopic] = useState();
  const [master, setMaster] = useState();
  const [prime, setPrime] = useState();
  const [sub, setSub] = useState();
  const [e_subject, sete_Subject] = useState();

  const selectmasters = useMemo(() => {
    const data = allMasterList?.data?.map((item) => {
      return { value: item?.m_id, label: item?.m_name };
    });
    return data;
  }, [allMasterList?.data]);

  const prime_category_list = useMemo(() => {
    const data = primeCategory?.data?.map((item) => {
      return { value: item?.p_id, label: item?.p_name };
    });
    return data;
  }, [primeCategory?.data]);

  const sub_category_list = useMemo(() => {
    const data = SubCategory?.data?.map((item) => {
      return { value: item?.s_id, label: item?.s_name };
    });
    return data;
  }, [SubCategory?.data]);

  const loadData = useCallback(
    async (isLoad = true) => {
      await dispatch(getEmailTemplate(payload));
      await dispatch(fetchAllMasterList());

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

  const onDelete = useCallback(async () => {
    const payload = { et_id: selectedItem?.et_id };
    const result = await dispatch(deleteEmailTemplate(payload));
    if (result) {
      onCloseConfirmation();
      loadData(false);
    }
  }, [selectedItem, dispatch, onCloseConfirmation, loadData]);

  const onClickDelete = useCallback(
    (item) => {
      onOpenConfirmation();
      setSelectedItem(item);
    },
    [onOpenConfirmation]
  );

  const onClickEdit = useCallback(
    (editId) => {
      history.push({
        pathname: '/AddNewEmailTemplate/',
        search: 'UpdateTemplet',
        state: { editId }
      });
    },
    [history]
  );

  const onChangePerPage = useCallback(
    (item) => {
      payload.per_page = item?.value;
      setPer_page(item);
      loadData(false);
    },
    [loadData]
  );

  const onChangeMaster = useCallback(
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

  const onChangePrime = useCallback(
    async (item) => {
      setPrime(item);
      setSub(null);
      const payload = {
        prime_id: item?.value
      };
      await dispatch(fetchSubCategoryList(payload));
    },
    [dispatch]
  );

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      payload.et_m_id = `${master?.value || ''}`;
      payload.et_p_id = `${prime?.value || ''}`;
      payload.et_s_id = `${sub?.value || ''}`;
      payload.et_subject = e_subject;
      loadData(false);
    },
    [master?.value, prime?.value, sub?.value, e_subject, loadData]
  );
  const onSubmitClear = useCallback(() => {
    sete_Subject('');
    setMaster(null);
    setPrime(null);
    setSub(null);
    payload.et_m_id = '';
    payload.et_p_id = '';
    payload.et_s_id = '';
    payload.et_subject = '';
    loadData(false);
  }, [loadData]);

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
                  <Label className='form-label ' for='Master Category'>
                    Select Master Category :
                  </Label>
                  <ReactSelect
                    className='React '
                    classNamePrefix='select'
                    value={master}
                    name='clear'
                    options={selectmasters}
                    isClearable={true}
                    onChange={(item) => {
                      onChangeMaster(item);
                    }}
                  />
                </div>
                <div class='form-group col-sm-3'>
                  <Label className='form-label ' for='Prime Category'>
                    Select Prime Category:
                  </Label>
                  <ReactSelect
                    className='React'
                    classNamePrefix='select'
                    value={prime}
                    name='clear'
                    options={prime_category_list}
                    isClearable={true}
                    onChange={(item) => {
                      onChangePrime(item);
                    }}
                    // onChange={(item) => {
                    //   setPrime(item);
                    // }}
                  />
                </div>

                <div class='form-group col-sm-3'>
                  <Label className='form-label ' for='Sub Category'>
                    Select Sub Category :
                  </Label>
                  <ReactSelect
                    className='React'
                    classNamePrefix='select'
                    value={sub}
                    name='clear'
                    options={sub_category_list}
                    isClearable={true}
                    onChange={(item) => {
                      setSub(item);
                    }}
                  />
                </div>
                <div class='form-group col-sm-3'>
                  <Label className='form-label ' for='Email Subject'>
                    Enter Email Subject :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='Enter Email Subject'
                    placeholder='Enter Email Subject'
                    value={e_subject}
                    onChange={(e) => {
                      sete_Subject(e.target.value);
                    }}
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
            <CardTitle>Email Template</CardTitle>
            <Button.Ripple className='mr-50' color='primary' onClick={() => history.push('/AddNewEmailTemplate/')}>
              + Add New Email Template
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
                    MASTER CATEGORY
                    <span>
                      <ChevronUp
                        className='menu-toggle-icon cursor-pointer'
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
                  </th>
                  <th>
                    PRIME CATEGORY
                    <ChevronUp
                      className='menu-toggle-icon cursor-pointer'
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
                  </th>
                  <th>
                    SUB CATEGORY
                    <ChevronUp
                      className='menu-toggle-icon cursor-pointer'
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
                  </th>
                  <th>
                    SUBJECT
                    <ChevronUp
                      className='menu-toggle-icon cursor-pointer'
                      size={15}
                      onClick={() => {
                        onClickOrderBy('et_subject', 'asc');
                      }}
                    />
                    <ChevronDown
                      className='menu-toggle-icon cursor-pointer'
                      size={15}
                      onClick={() => {
                        onClickOrderBy('et_subject', 'desc');
                      }}
                    />
                  </th>
                  <th>FROM ADDRESS</th>
                  <th>EMAIL CONTENT</th>
                  <th>SMS CONTENT</th>
                  <th>DISPLAY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {EmailTemplate?.data?.map((item, index) => {
                  return (
                    <tr key={`Subs_${item?.et_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.m_name}</td>
                      <td>{item?.p_name}</td>
                      <td>{item?.s_name}</td>
                      <td>{item?.et_subject}</td>
                      <td>{item?.et_from_address}</td>
                      <td dangerouslySetInnerHTML={{ __html: item?.et_description }}></td>
                      <td>{item?.et_sms_description}</td>
                      <td>{item?.et_status === 0 ? 'NO' : 'YES'}</td>
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
              <span>{EmailTemplate?.count}</span>
              <Pagination data={EmailTemplate?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
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
export default EmailTemplate;
