import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllTopic } from '../../../../services/Technical/topicService';
import { fetchMasterCategoryList } from '../../../../services/Technical/masterCategoryService';
import { fetchPrimeCategoryList } from '../../../../services/Technical/primeCategoryService';
import { fetchSubCategoryList } from '../../../../services/Technical/subCategoryService';
import { fetchEmailAddressList } from '../../../../services/Technical/EmailAddressService';
// eslint-disable-next-line max-len
import {
  AddEmailTemplate,
  getEditEmailTemplate,
  updateEmailTemplate
} from '../../../../services/Technical/EmailTemplateService';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const options = [
  { value: '0', label: 'NO' },
  { value: '1', label: 'YES' }
];
let template;
const AddNewEmailTemplate = ({ onClose, onAddTopic, selectedItem }) => {
  const history = useHistory();
  const location = useLocation();
  const Update = location.state?.editId;

  const topicSelector = useSelector((state) => state.technical.topic);
  const { categoryTopics } = topicSelector;

  const fetchMasterListSelector = useSelector((state) => state.technical.master);
  const { masterCategoryList } = fetchMasterListSelector;

  const primeSelector = useSelector((state) => state.technical.prime);
  const { primeCategory } = primeSelector;

  const subSelector = useSelector((state) => state.technical.sub);
  const { SubCategory } = subSelector;

  const EmailAddressSelector = useSelector((state) => state.technical.EmailAddress);
  const { EmailAddressList } = EmailAddressSelector;

  const EmailTemplateSelector = useSelector((state) => state.technical.EmailTemplate);
  const { EmailTemplate } = EmailTemplateSelector;
  //console.log('EmailTemplate', EmailTemplate);
  // const EditEmailSelector = useSelector((state) => state.technical.EmailTemplate);
  // const { EditEmailTemplate } = EditEmailSelector;

  const [selectedTopic, setSelectedTopic] = useState();
  const [selectedMaster, setSelectedMaster] = useState('');
  const [selectedPrime, setSelectedPrime] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [et_from_address, setet_from_address] = useState('');
  const [et_code, setet_Code] = useState('');
  const [et_status, setet_status] = useState();
  const [et_subject, setet_subject] = useState();
  const [et_sms_description, setet_sms_description] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [et_description, setet_description] = useState('');
  const dispatch = useDispatch();

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

  const sub_category_list = useMemo(() => {
    const data = SubCategory?.data?.map((item) => {
      return { value: item?.s_id, label: item?.s_name };
    });
    return data;
  }, [SubCategory?.data]);

  const Email_Address_list = useMemo(() => {
    const data = EmailAddressList?.data?.map((item) => {
      return { value: item?.ea_id, label: item?.ea_address };
    });
    return data;
  }, [EmailAddressList?.data]);

  const onChangePrimeCategory = useCallback(
    async (item, isUpdate = false) => {
      setSelectedPrime(item);
      setSelectedSub(null);
      const payload = {
        prime_id: item?.value
      };
      const result = await dispatch(fetchSubCategoryList(payload));
      if (result && isUpdate) {
        const Sub_category = result?.data?.find((item) => item?.s_id === template?.et_s_id);

        const sub_category_item = {
          value: Sub_category?.s_id,
          label: Sub_category?.s_name
        };
        setSelectedSub(sub_category_item);
      }
    },
    [dispatch]
  );

  const onChangeMasterCategory = useCallback(
    async (item, isUpdate = false) => {
      setSelectedMaster(item);
      setSelectedPrime(null);
      const payload = {
        sub_master: item?.value
      };
      const result = await dispatch(fetchPrimeCategoryList(payload));
      if (result && isUpdate) {
        const prime_category = result?.data?.find((item) => item?.p_id === template?.et_p_id);
        const prime_category_item = {
          value: prime_category?.p_id,
          label: prime_category?.p_name
        };
        setSelectedPrime(prime_category_item);
        onChangePrimeCategory(prime_category_item, true);
      }
    },
    [dispatch, onChangePrimeCategory]
  );

  const onChangeTopic = useCallback(
    async (item, isUpdate = false) => {
      setSelectedTopic(item);
      setSelectedMaster(null);
      setSelectedPrime(null);
      const payload = {
        prime_topic: item?.value
      };
      const result = await dispatch(fetchMasterCategoryList(payload));
      if (result && isUpdate) {
        const masterSelected = result?.data?.find((item) => item?.m_id === template?.et_m_id);
        const masterSelected_item = {
          value: masterSelected?.m_id,
          label: masterSelected?.m_name
        };
        setSelectedMaster(masterSelected_item);
        onChangeMasterCategory(masterSelected_item, true);
      }
    },
    [dispatch, onChangeMasterCategory]
  );

  const loadData = useCallback(async () => {
    const emailList = await dispatch(fetchEmailAddressList());

    const topicResult = await dispatch(getAllTopic());

    let payload = {
      et_id: Update
    };
    if (Update) {
      const result = await dispatch(getEditEmailTemplate(payload));
      if (result.data && result.data?.length > 0) {
        template = result.data[0];

        const selected = topicResult?.data?.find((item) => item?.cc_id === template?.et_c_id);
        const selected_item = {
          value: selected?.cc_id,
          label: selected?.cc_name
        };
        onChangeTopic(selected_item, true);

        const emailSelected = emailList?.data?.find((item) => item?.ea_address === template?.et_from_address);
        const emailSelected_item = {
          value: emailSelected?.ea_id,
          label: emailSelected?.ea_address
        };
        setet_from_address(emailSelected_item);

        const eaStatusSelected = EmailTemplate?.data?.find((item) => item?.et_status === template?.et_status);
        const eaStatusSelected_item = {
          value: eaStatusSelected?.et_id,
          label: eaStatusSelected?.et_status === 1 ? 'YES' : 'NO'
        };
        setet_status(eaStatusSelected_item);
        setet_Code(template?.et_code);
        setet_sms_description(template?.et_sms_description);
        setet_subject(template?.et_subject);
        setEditorState(
          EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(template?.et_description)))
        );
      }
    }
  }, [EmailTemplate?.data, Update, dispatch, onChangeTopic]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    let currentContentAsHTML = stateToHTML(editorState.getCurrentContent());
    setet_description(currentContentAsHTML);
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      let payload = {
        et_c_id: selectedTopic?.value,
        et_m_id: selectedMaster?.value,
        et_p_id: selectedPrime?.value,
        et_s_id: selectedSub?.value,
        et_subject,
        et_from_address: et_from_address?.label,
        et_code,
        et_description,
        et_sms_description,
        et_status: et_status?.value
      };

      let result;
      if (Update) {
        payload = {
          ...payload,
          et_id: Update
        };
        result = await dispatch(updateEmailTemplate(payload));
        history.push('/EmailTemplate/');
      } else {
        result = await dispatch(AddEmailTemplate(payload));
        if (result) {
          history.push('/EmailTemplate/');
        }
        //history.push('/EmailTemplate/');
      }
      if (result) {
        onAddTopic();
        onClose();
      }
    },
    // eslint-disable-next-line max-len
    [
      Update,
      dispatch,
      et_code,
      et_description,
      et_from_address?.label,
      et_sms_description,
      et_status?.value,
      et_subject,
      history,
      onAddTopic,
      onClose,
      selectedMaster?.value,
      selectedPrime?.value,
      selectedSub?.value,
      selectedTopic?.value
    ]
  );

  return (
    <>
      <Col sm='12'>
        <Card noBody>
          <CardHeader>
            <CardTitle>{Update ? 'Update' : 'Add New'} Email Template</CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={onSubmit}>
              <div className='form-row '>
                <div className='form-group col-sm-3'>
                  <Label className='form-label' for='Topic Name'>
                    Select Topic :
                  </Label>
                  <Select
                    className='React'
                    classNamePrefix='select'
                    value={selectedTopic}
                    name='clear'
                    options={topics}
                    isClearable={true}
                    onChange={(item) => {
                      onChangeTopic(item);
                    }}
                  />
                </div>
                <div className='form-group col-sm-3'>
                  <Label className='form-label' for='Master'>
                    Select Master Category :
                  </Label>
                  <Select
                    className='React'
                    classNamePrefix='select'
                    value={selectedMaster}
                    name='clear'
                    options={selectmasters}
                    isClearable={true}
                    onChange={(item) => {
                      onChangeMasterCategory(item);
                    }}
                  />
                </div>
                <div className='form-group col-sm-3'>
                  <Label className='form-label' for='Prime Category'>
                    Select Prime Category :
                  </Label>
                  <Select
                    className='React'
                    classNamePrefix='select'
                    value={selectedPrime}
                    name='clear'
                    options={prime_category_list}
                    isClearable={true}
                    onChange={(item) => {
                      onChangePrimeCategory(item);
                    }}
                  />
                </div>
                <div className='form-group col-sm-3'>
                  <Label className='form-label' for='Sub Category'>
                    Select Sub Category :
                  </Label>
                  <Select
                    className='React'
                    classNamePrefix='select'
                    value={selectedSub}
                    name='clear'
                    options={sub_category_list}
                    isClearable={true}
                    onChange={(item) => {
                      setSelectedSub(item);
                    }}
                  />
                </div>
                <div className='form-group col-sm-4'>
                  <Label className='form-label' for='Email Address'>
                    Select Send Email Address :
                  </Label>
                  <Select
                    className='React'
                    classNamePrefix='select'
                    value={et_from_address}
                    name='clear'
                    options={Email_Address_list}
                    isClearable={true}
                    onChange={(item) => {
                      setet_from_address(item);
                    }}
                  />
                </div>
                <div class='form-group col-md-4'>
                  <Label className='form-label ' for='Email Template Code'>
                    Email Template Code :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='text'
                    id='Email Template Code'
                    placeholder='Enter Email Template Code'
                    value={et_code}
                    onChange={(e) => {
                      setet_Code(e.target.value);
                    }}
                    style={{ marginRight: 10 }}
                  />
                </div>
                <div className='form-group col-md-4'>
                  <Label className='form-label' for='Topic Name'>
                    Display :
                  </Label>
                  <Select
                    className='React'
                    classNamePrefix='select'
                    value={et_status}
                    name='clear'
                    options={options}
                    isClearable={true}
                    onChange={(item) => {
                      setet_status(item);
                    }}
                  />
                </div>
                <div className='form-group col-md-6'>
                  <Label className='form-label' for='SMS Description '>
                    SMS Description :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='textarea'
                    id='SMS Description '
                    placeholder='Enter SMS Description '
                    value={et_sms_description}
                    onChange={(e) => {
                      setet_sms_description(e.target.value);
                    }}
                    style={{ marginRight: 10 }}
                  />
                </div>
                <div className='form-group col-md-6'>
                  <Label className='form-label' for='Email Description '>
                    Email Subject :
                  </Label>
                  <Input
                    className='form-control  remove_special'
                    type='textarea'
                    id='Email Subject '
                    placeholder='Enter Email Subject '
                    value={et_subject}
                    onChange={(e) => {
                      setet_subject(e.target.value);
                    }}
                    style={{ marginRight: 10 }}
                  />
                </div>

                <div className='editor'>
                  <Label className='form-label' for='Email Description '>
                    Email Description :
                  </Label>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName='wrapper-class'
                    editorClassName='editor-class'
                    toolbarClassName='toolbar-class'
                  />
                </div>

                <div className='form-group col-md-3'>
                  <Button.Ripple className='mr-50' color='primary' type='submit'>
                    {Update ? 'Update' : 'Save'} Details
                  </Button.Ripple>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default AddNewEmailTemplate;
