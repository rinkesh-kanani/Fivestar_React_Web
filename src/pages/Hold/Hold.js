import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Modal, Button, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import { CheckCircle, ChevronDown, ChevronUp, Trash2 } from 'react-feather';
import { confirmOrderOnHold, getHoldList, removeHold } from '../../services/Hold/HoldService';
import Pagination from '../../components/Pagination';
import { pagination } from '../../data/raw';
import '../../assets/scss/plugins/tables/_agGridStyleOverride.scss';
import { isEmpty } from '../../helpers/common';
import '../../assets/scss/pages/users.scss';
import AddNewHold from './AddNewHold';

const payload = {
  start: 1,
  per_page: '10',
  order_by: 'desc',
  order_by_field: 'oh_id',
  fetch_for: '',
  id: ''
};

let timer = [];
const Hold = () => {
  const dispatch = useDispatch();

  const HoldListSelector = useSelector((state) => state.hold.Hold);
  const { HoldList } = HoldListSelector;
  const [per_page, setPer_page] = useState({ label: 10, value: 10 });
  const [formModal, setFormModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const seconds2time = (start, id) => {
    var hours = Math.floor(start / 3600);
    var minutes = Math.floor((start - hours * 3600) / 60);
    var seconds = start - hours * 3600 - minutes * 60;
    var time = '';
    if (hours !== 0) {
      time = hours + ':';
    }
    if (minutes !== 0 || time !== '') {
      minutes = minutes < 10 && time !== '' ? '0' + minutes : String(minutes);
      time += minutes + ':';
    }
    if (time === '') {
      time = seconds + 's';
    } else {
      time += seconds < 10 ? '0' + seconds : String(seconds);
    }
    if (start > 0) {
      document.getElementById('ct' + id).innerHTML = time;
      start = start - 1;
      document.getElementById('holdtimesa' + id).value = start;
    } else {
      document.getElementById('ct' + id).innerHTML = '00:00:00';
      document.getElementById('holdtimesa' + id).value = 0;
    }
  };

  const loadData = useCallback(async () => {
    const result = await dispatch(getHoldList(payload));
    if (result) {
      if (!isEmpty(timer)) {
        for (let index = 0; index < timer.length; index++) {
          clearInterval(timer[index]);
        }
      }
      for (let index = 0; index < result?.data?.length; index++) {
        const interval = setInterval(function () {
          var holdtimesa = document.getElementById(`holdtimesa${index}`);
          var start = holdtimesa?.value;
          if (start) {
            seconds2time(start, index);
          }
          timer.push(interval);
        }, 1000);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangePage = useCallback(
    (page) => {
      payload.start = page;
      loadData();
    },
    [loadData]
  );

  const onChangePerPage = useCallback(
    (item) => {
      payload.per_page = item?.value;
      setPer_page(item);
      loadData();
    },
    [loadData]
  );

  const onClickConfirm = useCallback(
    async (holdItem) => {
      const payload = {
        id: holdItem?.id,
        sid: holdItem?.stock_id,
        oh_email: holdItem?.mail,
        oh_company: holdItem?.company
      };
      const result = await dispatch(confirmOrderOnHold(payload));
      if (result) {
        loadData();
      }
    },
    [dispatch, loadData]
  );

  const onOpenConfirmation = useCallback(() => {
    setDeleteConfirmation(true);
  }, []);

  const onCloseConfirmation = useCallback(() => {
    setDeleteConfirmation(false);
    setSelectedItem(undefined);
  }, []);

  const onClickRemove = useCallback(
    (item) => {
      onOpenConfirmation();
      setSelectedItem(item);
    },
    [onOpenConfirmation]
  );

  const onDelete = useCallback(async () => {
    const payload = { id: selectedItem?.id, sid: selectedItem?.stock_id };
    const result = await dispatch(removeHold(payload));
    if (result) {
      onCloseConfirmation();
      loadData();
    }
  }, [dispatch, loadData, onCloseConfirmation, selectedItem]);

  const toggleModal = useCallback(() => {
    if (formModal) {
      setSelectedItem(undefined);
    }
    setFormModal(!formModal);
  }, [formModal]);

  const onClickOrderBy = useCallback(
    (field, order) => {
      payload.order_by_field = field;
      payload.order_by = order;
      loadData();
    },
    [loadData]
  );

  return (
    <>
      <Col sm='12'>
        <Card noBody>
          <CardHeader>
            <CardTitle>Hold</CardTitle>
            <Button.Ripple className='mr-50' color='primary' onClick={toggleModal}>
              Create Hold
            </Button.Ripple>
          </CardHeader>
          <Col sm='3' className='d-flex  align-items-center'>
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
            <Table hover responsive class='table'>
              <thead class='table-light'>
                <tr>
                  <th>SR.NO.</th>
                  <th>
                    <div className='d-flex align-items-center justify-content-between'>
                      DATE
                      <span>
                        <ChevronUp
                          className='menu-toggle-icon cursor-pointer d-flex'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('oh_date', 'asc');
                          }}
                        />
                        <ChevronDown
                          className='menu-toggle-icon cursor-pointer'
                          size={15}
                          onClick={() => {
                            onClickOrderBy('oh_date', 'desc');
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>TIME</th>
                  <th>STOCK_ID </th>
                  <th>LAB</th>
                  <th>SHAPE</th>
                  <th>COL</th>
                  <th>CLA</th>
                  <th>SIZE</th>
                  <th>CERT_NO</th>
                  <th>LOT.NO</th>
                  <th>MEASUREMENT </th>
                  <th>CUT</th>
                  <th>POL</th>
                  <th>SYM</th>
                  <th>FLOU</th>
                  <th>RAP</th>
                  <th>DEPTH</th>
                  <th>TABLE</th>
                  <th>BGM</th>
                  <th>NAME</th>
                  <th>RE-MARK</th>
                  <th>ST_DISC</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {HoldList?.data?.map((item, index) => {
                  return (
                    <tr key={`HoldList_${item?.oh_id}_index_${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.oh_date}</td>

                      <td id={`ct${index}`}></td>
                      <input type='hidden' id={`holdtimesa${index}`} value={`${item?.time}`} />
                      <td>{item?.stock_id}</td>
                      <td>{item?.lab}</td>
                      <td>{item?.shape}</td>
                      <td>{item?.color}</td>
                      <td>{item?.clarity}</td>
                      <td>{item?.size}</td>
                      <td>{item?.cert_no}</td>
                      <td>{item?.lot_no}</td>
                      <td>{item?.measurement}</td>
                      <td>{item?.cut}</td>
                      <td>{item?.polish}</td>
                      <td>{item?.symmetry}</td>
                      <td>{item?.flou}</td>
                      <td>{item?.rap}</td>
                      <td>{item?.depth}</td>
                      <td>{item?.table}</td>
                      <td>{item?.bgm}</td>
                      <td>{item?.company}</td>
                      <td>{item?.re_mark}</td>
                      <td>{item?.st_discount}</td>
                      <td className='cursor-pointer'>
                        <CheckCircle
                          className='mr-50'
                          size={15}
                          onClick={() => {
                            onClickConfirm(item);
                          }}
                        />
                        <Trash2
                          size={15}
                          onClick={() => {
                            onClickRemove(item);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Col sm='12' className='d-flex justify-content-between align-items-center'>
              <span>{HoldList?.count}</span>
              <Pagination data={HoldList?.pagination_object} onChangePage={onChangePage} />
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={formModal} toggle={toggleModal} className='modal-dialog modal-xl'>
        <AddNewHold onClose={toggleModal} onAddHold={loadData} selectedItem={selectedItem} />
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

export default Hold;
