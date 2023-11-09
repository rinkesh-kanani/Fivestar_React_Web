import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { fetchMasterCategoryList } from '../../../../services/Technical/masterCategoryService';
import {
  addNewPrimeCategory,
  fetchPrimeCategoryList,
  updatePrimeCategory
} from '../../../../services/Technical/primeCategoryService';
import { isEmpty } from '../../../../helpers/common';

const AddNewSubCategory = ({ onClose, onAddSubCategory, selectedItem }) => {
  const topicSelector = useSelector((state) => state.technical.topic);
  const { categoryTopics } = topicSelector;

  const fetchMasterListSelector = useSelector((state) => state.technical.master);
  const { masterCategoryList } = fetchMasterListSelector;

  const primeSelector = useSelector((state) => state.technical.prime);
  const { primeCategory } = primeSelector;

  const [selectedTopic, setSelectedTopic] = useState();
  const [selectedMaster, setSelectedMaster] = useState('');
  const [selectedPrime, setSelectedPrime] = useState('');
  const [s_name, sets_name] = useState('');
  const [s_code, sets_code] = useState('');

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

  const onChangeMasterCategory = useCallback(
    async (item, isUpdate = false) => {
      setSelectedMaster(item);
      setSelectedPrime(null);
      const payload = {
        sub_master: item?.value
      };
      const result = await dispatch(fetchPrimeCategoryList(payload));
      if (result && isUpdate) {
        const prime_category = result?.data?.find((item) => item?.p_id === selectedItem?.s_p_id);
        const prime_category_item = {
          value: prime_category?.p_id,
          label: prime_category?.p_name
        };
        setSelectedPrime(prime_category_item);
      }
    },
    [dispatch, selectedItem?.s_p_id]
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
        const masterSelected = result?.data?.find((item) => item?.m_id === selectedItem?.s_m_id);
        const masterSelected_item = {
          value: masterSelected?.m_id,
          label: masterSelected?.m_name
        };
        setSelectedMaster(masterSelected_item);
        onChangeMasterCategory(masterSelected_item, true);
      }
    },
    [dispatch, onChangeMasterCategory, selectedItem?.s_m_id]
  );

  const loadData = useCallback(async () => {
    if (selectedItem) {
      sets_name(selectedItem?.s_name);
      sets_code(selectedItem?.s_code);
      //Select Topic
      const selected = categoryTopics?.data?.find((item) => item?.cc_id === selectedItem?.s_cc_id);
      const selected_item = {
        value: selected?.cc_id,
        label: selected?.cc_name
      };
      setSelectedTopic(selected_item);
      onChangeTopic(selected_item, true);
    }
  }, [selectedItem, categoryTopics?.data, onChangeTopic]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isEmpty(selectedTopic)) {
        toast.error('Please select topic');
        return;
      } else if (isEmpty(selectedMaster)) {
        toast.error('Please select master category');
        return;
      } else if (isEmpty(selectedPrime)) {
        toast.error('Please select prime category');
        return;
      } else if (isEmpty(s_name)) {
        toast.error('Please enter sub category name');
        return;
      } else if (isEmpty(s_code)) {
        toast.error('Please enter sub category code');
        return;
      }
      let payload = {
        s_name,
        s_cc_id: `${selectedTopic?.value}`,
        s_m_id: `${selectedMaster?.value}`,
        s_p_id: `${selectedPrime?.value}`,
        s_code
      };
      let result;
      if (selectedItem) {
        payload = {
          ...payload,
          s_id: selectedItem?.s_id
        };
        result = await dispatch(updatePrimeCategory(payload));
      } else {
        result = await dispatch(addNewPrimeCategory(payload));
      }
      if (result) {
        onAddSubCategory();
        onClose();
      }
    },
    [selectedTopic, selectedMaster, selectedPrime, s_name, s_code, selectedItem, dispatch, onAddSubCategory, onClose]
  );

  return (
    <>
      <ModalHeader toggle={() => onClose()}>{selectedItem ? 'Update' : 'Add New'} Sub Category</ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <div className='mb-2'>
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
          <div className='mb-2'>
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

          <div className='mb-2'>
            <Label className='form-label' for='Master'>
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
                setSelectedPrime(item);
              }}
            />
          </div>

          <div className='mb-2'>
            <Label className='form-label' for='Prime'>
              Enter Sub Category :
            </Label>
            <Input
              type='text'
              id='Prime'
              placeholder='Enter Enter Sub Category'
              value={s_name}
              onChange={(e) => {
                sets_name(e.target.value);
              }}
            />
          </div>

          <div className='mb-2'>
            <Label className='form-label' for='Prime'>
              Enter Sub Category Code :
            </Label>
            <Input
              type='text'
              id='Prime'
              placeholder='Enter Sub Category Code'
              value={s_code}
              onChange={(e) => {
                sets_code(e.target.value);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' type='submit'>
            {selectedItem ? 'Update' : 'Submit'}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default AddNewSubCategory;
