import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import { addNewMasterCategory, updateMasterCategory } from '../../../../services/Technical/masterCategoryService';
import { isEmpty } from '../../../../helpers/common';

const AddNewMasterCategory = ({ onClose, onAddMasterCategory, selectedItem }) => {
  const topicSelector = useSelector((state) => state.technical.topic);
  const { categoryTopics } = topicSelector;
  const [m_name, setM_name] = useState('');
  const [selectedMaster, setSelectedMaster] = useState();
  const dispatch = useDispatch();

  const topics = useMemo(() => {
    const data = categoryTopics?.data?.map((item) => {
      return { value: item?.cc_id, label: item?.cc_name };
    });
    return data;
  }, [categoryTopics?.data]);

  const loadData = useCallback(() => {
    if (selectedItem) {
      setM_name(selectedItem?.m_name);
      const selected = categoryTopics?.data?.find((item) => item?.cc_id === selectedItem?.m_cc_id);
      const selected_item = {
        value: selected?.cc_id,
        label: selected?.cc_name
      };
      setSelectedMaster(selected_item);
    }
  }, [selectedItem, categoryTopics?.data]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isEmpty(selectedMaster)) {
        toast.error('Please select topic');
        return;
      } else if (isEmpty(m_name)) {
        toast.error('Please enter master category name');
        return;
      }
      let payload = {
        m_name,
        m_cc_id: selectedMaster?.value
      };
      let result;
      if (selectedItem) {
        payload = {
          ...payload,
          m_id: selectedItem?.m_id
        };
        result = await dispatch(updateMasterCategory(payload));
      } else {
        result = await dispatch(addNewMasterCategory(payload));
      }
      if (result) {
        onAddMasterCategory();
        onClose();
      }
    },
    [selectedMaster, m_name, selectedItem, dispatch, onAddMasterCategory, onClose]
  );

  return (
    <>
      <ModalHeader toggle={() => onClose()}>{selectedItem ? 'Update' : 'Add New'} Master Category</ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='Topic Name'>
              Select Topic :
            </Label>
            <Select
              className='React'
              classNamePrefix='select'
              value={selectedMaster}
              name='clear'
              options={topics}
              isClearable={true}
              onChange={(item) => {
                setSelectedMaster(item);
              }}
            />
          </div>
          <div className='mb-2'>
            <Label className='form-label' for='Master'>
              Enter Master :
            </Label>
            <Input
              type='text'
              id='Master'
              placeholder='Enter Master Category Name'
              value={m_name}
              onChange={(e) => {
                setM_name(e.target.value);
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

export default AddNewMasterCategory;
