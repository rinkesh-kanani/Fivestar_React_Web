import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import { updateClient } from '../../../services/Admin/clientService';
import { getMembership, membershipChange } from '../../../services/DubaiStock/DubaiStockService';

const UpdateClient = ({ onClose, onEditClient, selectedItem }) => {
  const DubaiStockListSelector = useSelector((state) => state.DubaiStock.DubaiStock);
  const { membershipList } = DubaiStockListSelector;
  const [rg_telegram_user2, setrg_telegram_user2] = useState('');
  const [rg_telegram_user, setrg_telegram_user] = useState('');
  const [rg_sky, setrg_sky] = useState('');
  const [rg_wht, setrg_wht] = useState('');
  const [r_trn_no, setr_trn_no] = useState('');
  const [r_comp, setr_comp] = useState('');
  const [rg_f, setrg_f] = useState('');
  const [rg_mail, setrg_mail] = useState('');
  const [rg_l, setrg_l] = useState('');
  const [rg_ph, setrg_ph] = useState('');
  const [rg_mo, setrg_mo] = useState('');
  const [membership, setMembership] = useState();

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    const result = await dispatch(getMembership());
    const item = result?.data?.find((x) => x?.name === selectedItem?.membership);
    if (item) {
      setMembership(item);
    }
    setrg_f(selectedItem?.fname);
    setrg_l(selectedItem?.lname);
    setrg_mail(selectedItem?.email);
    setrg_mo(selectedItem?.mobile_no);
    setrg_ph(selectedItem?.phone_no);
    setr_trn_no(selectedItem?.trn);
    setrg_wht(selectedItem?.whatsapp);
    setrg_sky(selectedItem?.skype);
    setrg_telegram_user(selectedItem?.tele1);
    setrg_telegram_user2(selectedItem?.tele2);
  }, [
    dispatch,
    selectedItem?.email,
    selectedItem?.fname,
    selectedItem?.lname,
    selectedItem?.membership,
    selectedItem?.mobile_no,
    selectedItem?.phone_no,
    selectedItem?.skype,
    selectedItem?.tele1,
    selectedItem?.tele2,
    selectedItem?.trn,
    selectedItem?.whatsapp
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      let payload = {
        id: selectedItem?.uid,
        rg_sky,
        rg_telegram_user,
        rg_telegram_user2,
        r_trn_no,
        rg_wht,
        rg_mail,
        rg_f,
        r_comp,
        rg_l,
        rg_ph,
        rg_mo
      };
      if (selectedItem?.membership !== membership?.name) {
        const membershipPayload = {
          status: membership?.name,
          id: selectedItem?.uid
        };
        await dispatch(membershipChange(membershipPayload));
      }
      let result = await dispatch(updateClient(payload));
      if (result) {
        onEditClient();
        onClose();
      }
    },
    [
      dispatch,
      membership?.name,
      onClose,
      onEditClient,
      r_comp,
      r_trn_no,
      rg_f,
      rg_l,
      rg_mail,
      rg_mo,
      rg_ph,
      rg_sky,
      rg_telegram_user,
      rg_telegram_user2,
      rg_wht,
      selectedItem?.membership,
      selectedItem?.uid
    ]
  );

  return (
    <>
      <ModalHeader toggle={() => onClose()}>Update Client</ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <div class='form-row'>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                First Name :
              </Label>
              <Input
                type='text'
                id='firstName'
                placeholder='Enter your first name'
                value={rg_f}
                onChange={(e) => {
                  setrg_f(e.target.value);
                }}
              />
            </div>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Last Name :
              </Label>
              <Input
                type='text'
                id='lastName'
                placeholder='Enter your last name'
                value={rg_l}
                onChange={(e) => {
                  setrg_l(e.target.value);
                }}
              />
            </div>
          </div>
          <div class='form-row'>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Company :
              </Label>
              <Input
                type='text'
                id='Company'
                placeholder='Enter company'
                value={r_comp}
                onChange={(e) => {
                  setr_comp(e.target.value);
                }}
              />
            </div>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Email :
              </Label>
              <Input
                type='text'
                id='email'
                placeholder='Enter your email'
                value={rg_mail}
                onChange={(e) => {
                  setrg_mail(e.target.value);
                }}
              />
            </div>
          </div>
          <div class='form-row'>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Phone No :
              </Label>
              <Input
                type='text'
                id='phoneNo'
                placeholder='Enter your phone no'
                value={rg_ph}
                onChange={(e) => {
                  setrg_ph(e.target.value);
                }}
              />
            </div>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Mobile :
              </Label>
              <Input
                type='text'
                id='lastName'
                placeholder='Enter your last name'
                value={rg_mo}
                onChange={(e) => {
                  setrg_mo(e.target.value);
                }}
              />
            </div>
          </div>
          <div class='form-row'>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Whatsapp No :
              </Label>
              <Input
                type='text'
                id='whatsappNo'
                placeholder='Enter your whatsapp no'
                value={rg_wht}
                onChange={(e) => {
                  setrg_wht(e.target.value);
                }}
              />
            </div>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Skype Id :
              </Label>
              <Input
                type='text'
                id='skype'
                placeholder='Enter your skype id'
                value={rg_sky}
                onChange={(e) => {
                  setrg_sky(e.target.value);
                }}
              />
            </div>
          </div>
          <div class='form-row'>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Telegram Id 1 :
              </Label>
              <Input
                type='text'
                id='TelegramId1'
                placeholder='Enter your telegram id 1'
                value={rg_telegram_user}
                onChange={(e) => {
                  setrg_telegram_user(e.target.value);
                }}
              />
            </div>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                Telegram Id 2 :
              </Label>
              <Input
                type='text'
                id='TelegramId2'
                placeholder='Enter your telegram id 2'
                value={rg_telegram_user2}
                onChange={(e) => {
                  setrg_telegram_user2(e.target.value);
                }}
              />
            </div>
          </div>
          <div class='form-row'>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Prime'>
                TRN :
              </Label>
              <Input
                type='text'
                id='TRN'
                placeholder='Enter TRN'
                value={r_trn_no}
                onChange={(e) => {
                  setr_trn_no(e.target.value);
                }}
              />
            </div>
            <div className='form-group col-md-6'>
              <Label className='form-label' for='Topic Name'>
                Select Membership :
              </Label>
              <Select
                className='React'
                classNamePrefix='select'
                value={membership}
                name='clear'
                options={membershipList?.data}
                isClearable={true}
                onChange={(item) => {
                  setMembership(item);
                }}
              />
            </div>
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

export default UpdateClient;
