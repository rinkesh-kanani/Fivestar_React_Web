import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import { fetchMasterCategoryList } from '../../../../services/Technical/masterCategoryService';
import { addNewPrimeCategory, updatePrimeCategory } from '../../../../services/Technical/primeCategoryService';
import { isEmpty } from '../../../../helpers/common';

const AddNewPrimeCategory = ({ onClose, onAddPrimeCategory, selectedItem }) => {
  const topicSelector = useSelector((state) => state.technical.topic);
  const { categoryTopics } = topicSelector;

  const fetchMasterListSelector = useSelector((state) => state.technical.master);
  const { masterCategoryList } = fetchMasterListSelector;

  const [SelectedMaster, setSelectedMaster] = useState('');
  const [p_name, setp_name] = useState('');
  const [selectedTopic, setSelectedTopic] = useState();
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

  const onChangeMasterCategory = useCallback(
    async (item, isUpdate = false) => {
      setSelectedTopic(item);
      setSelectedMaster(null);
      const payload = {
        prime_topic: item?.value
      };
      const result = await dispatch(fetchMasterCategoryList(payload));
      if (result && isUpdate) {
        const masterSelected = result?.data?.find((item) => item?.m_id === selectedItem?.p_m_id);
        const masterSelected_item = {
          value: masterSelected?.m_id,
          label: masterSelected?.m_name
        };
        setSelectedMaster(masterSelected_item);
      }
    },
    [dispatch, selectedItem?.p_m_id]
  );

  const loadData = useCallback(async () => {
    if (selectedItem) {
      setp_name(selectedItem?.p_name);
      const selected = categoryTopics?.data?.find((item) => item?.cc_id === selectedItem?.p_cc_id);
      const selected_item = {
        value: selected?.cc_id,
        label: selected?.cc_name
      };
      setSelectedTopic(selected_item);
      onChangeMasterCategory(selected_item, true);
    }
  }, [selectedItem, categoryTopics?.data, onChangeMasterCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isEmpty(selectedTopic)) {
        toast.error('Please select topic');
        return;
      } else if (isEmpty(SelectedMaster)) {
        toast.error('Please select master category');
        return;
      } else if (isEmpty(p_name)) {
        toast.error('Please enter prime category name');
        return;
      }
      let payload = {
        p_name,
        p_cc_id: selectedTopic?.value,
        p_m_id: SelectedMaster?.value
      };
      let result;
      if (selectedItem) {
        payload = {
          ...payload,
          p_id: selectedItem?.p_id
        };
        result = await dispatch(updatePrimeCategory(payload));
      } else {
        result = await dispatch(addNewPrimeCategory(payload));
      }
      if (result) {
        onAddPrimeCategory();
        onClose();
      }
    },
    [selectedTopic, SelectedMaster, p_name, selectedItem, dispatch, onAddPrimeCategory, onClose]
  );

  return (
    <>
      <ModalHeader toggle={() => onClose()}>{selectedItem ? 'Update' : 'Add New'} Prime Category</ModalHeader>
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
                onChangeMasterCategory(item);
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
              value={SelectedMaster}
              name='clear'
              options={selectmasters}
              isClearable={true}
              onChange={(item) => {
                setSelectedMaster(item);
              }}
            />
          </div>

          <div className='mb-2'>
            <Label className='form-label' for='Prime'>
              Enter Prime :
            </Label>
            <Input
              type='text'
              id='Prime'
              placeholder='Enter prime Category Name'
              value={p_name}
              onChange={(e) => {
                setp_name(e.target.value);
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

export default AddNewPrimeCategory;
