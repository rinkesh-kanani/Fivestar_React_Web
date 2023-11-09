import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { isEmpty } from '../../../../helpers/common';
import { addNewTopic, updateTopic } from '../../../../services/Technical/topicService';

const AddNewTopic = ({ onClose, onAddTopic, selectedItem }) => {
  const [cc_name, setCc_name] = useState('');
  const dispatch = useDispatch();

  const loadData = useCallback(() => {
    if (selectedItem) {
      setCc_name(selectedItem?.cc_name);
    }
  }, [selectedItem]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isEmpty(cc_name)) {
        toast.error('Please enter topic name');
        return;
      }
      let payload = {
        cc_name
      };
      let result;
      if (selectedItem) {
        payload = {
          ...payload,
          cc_id: selectedItem?.cc_id
        };
        result = await dispatch(updateTopic(payload));
      } else {
        result = await dispatch(addNewTopic(payload));
      }
      if (result) {
        onAddTopic();
        onClose();
      }
    },
    [cc_name, selectedItem, onAddTopic, onClose, dispatch]
  );

  return (
    <>
      <ModalHeader toggle={() => onClose()}>{selectedItem ? 'Update' : 'Add New'} Topic</ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='Topic Name'>
              Topic Name :
            </Label>
            <Input
              type='text'
              id='Topic Name'
              placeholder='Enter Topic Name'
              value={cc_name}
              onChange={(e) => {
                setCc_name(e.target.value);
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

export default AddNewTopic;
