import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import { AddNewEmail, updateEmail } from '../../../../services/Technical/EmailAddressService';

const options = [
  { value: '1', label: 'YES' },
  { value: '2', label: 'NO' }
];
const AddNewEmailAddress = ({ onClose, onAddTopic, selectedItem }) => {
  const EmailAddressSelector = useSelector((state) => state.technical.EmailAddress);
  const { EmailAddress } = EmailAddressSelector;

  const [ea_address, setea_address] = useState('');
  const [ea_uname, setea_uname] = useState();
  const [ea_pass, setea_pass] = useState();
  const [ea_host, setea_host] = useState();
  const [ea_port, setea_port] = useState();
  const [ea_status, setea_status] = useState();
  const dispatch = useDispatch();

  // ea_address: "info@fivestardiamondllc.com"
  // ea_create_by: "dondahiren2@gmail.com"
  // ea_create_date: "2018-08-09 17:01:43"
  // ea_host: "mail.fivestardiamondllc.com"
  // ea_id: 5
  // ea_l_update_by: "tejani.purvesh@outlook.com"
  // ea_l_update_date: "2018-11-08 16:03:35"
  // ea_pass: "Veer123@"
  // ea_port: "465"
  // ea_status: 1
  // ea_uname: "info@fivestardiamondllc.com"
  const loadData = useCallback(() => {
    console.log('selectedItem', selectedItem);
    if (selectedItem) {
      setea_address(selectedItem?.ea_address);
      setea_uname(selectedItem?.ea_address);
      setea_pass(selectedItem?.ea_pass);
      setea_host(selectedItem?.ea_host);
      setea_port(selectedItem?.ea_port);
      setea_address(selectedItem?.ea_address);

      const selected = EmailAddress?.data?.find((item) => item?.ea_id === selectedItem?.ea_id);

      const selected_item = {
        value: selected?.ea_id,
        label: selected?.ea_status === 1 ? 'YES' : 'NO'
      };
      console.log('selected_item', selected_item);
      setea_status(selected_item);
    }
  }, [EmailAddress?.data, selectedItem]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      let payload = {
        ea_address,
        ea_uname,
        ea_pass,
        ea_host,
        ea_port,
        ea_status: ea_status.value
      };

      let result;
      if (selectedItem) {
        payload = {
          ...payload,
          ea_id: selectedItem?.ea_id
        };
        result = await dispatch(updateEmail(payload));
      } else {
        result = await dispatch(AddNewEmail(payload));
      }
      if (result) {
        onAddTopic();
        onClose();
      }
    },
    [ea_address, ea_uname, ea_pass, ea_host, ea_port, ea_status, selectedItem, dispatch, onAddTopic, onClose]
  );

  return (
    <>
      <ModalHeader toggle={() => onClose()}>{selectedItem ? 'Update' : 'Add New'} Topic</ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='Topic Name'>
              Email Address :
            </Label>
            <Input
              required
              type='text'
              id='Email Address'
              placeholder='Enter Email Address'
              value={ea_address}
              onChange={(e) => {
                setea_address(e.target.value);
              }}
            />
            <Label className='form-label' for='Topic Name'>
              User Name :
            </Label>
            <Input
              required
              type='text'
              id='User Name'
              placeholder='Enter User Name'
              value={ea_uname}
              onChange={(e) => {
                setea_uname(e.target.value);
              }}
            />
            <Label className='form-label' for='Topic Name'>
              Password :
            </Label>
            <Input
              required
              type='text'
              id='Password '
              placeholder='Enter Password '
              value={ea_pass}
              onChange={(e) => {
                setea_pass(e.target.value);
              }}
            />
            <Label className='form-label' for='Topic Name'>
              Host :
            </Label>
            <Input
              required
              type='text'
              id='Host'
              placeholder='Host'
              value={ea_host}
              onChange={(e) => {
                setea_host(e.target.value);
              }}
            />
            <Label className='form-label' for='Topic Name'>
              Port :
            </Label>
            <Input
              required
              type='text'
              id='Port '
              placeholder='Port'
              value={ea_port}
              onChange={(e) => {
                setea_port(e.target.value);
              }}
            />
            <Label className='form-label' for='Topic Name'>
              Display :
            </Label>
            <Select
              className='React'
              classNamePrefix='select'
              value={ea_status}
              name='clear'
              options={options}
              isClearable={true}
              onChange={(item) => {
                setea_status(item);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' type='submit'>
            {selectedItem ? 'Update' : 'Submit'}
          </Button>
          <Button color='danger' type='button' onClick={() => onClose()}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default AddNewEmailAddress;
