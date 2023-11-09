import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Input } from 'reactstrap';
import { Diamond, DiamondLabel, Shape, Shape3, Shape4, Slcer } from './styles';

const Requirement = () => {
  return (
    <>
      <Col sm='12'>
        <Card noBody>
          <Shape>
            <CardHeader className='d-flex'>
              <section class='col col-md-1' style={{ lineHeight: '60px' }}>
                <b>Shape</b>
              </section>
              <Diamond class='SL_S livecount ROUND' title='ROUND' id='ROUND'>
                <div>
                  <img style={{ width: 45 }} alt='ROUND' src='http://diamondz.s3.amazonaws.com/ROUND.png' />
                  <DiamondLabel>ROUND</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount PRINCESS' title='PRINCESS' id='PRINCESS'>
                <div>
                  <img style={{ width: 45 }} alt='PRINCESS' src='https://diamondz.s3.amazonaws.com/PRINCESS.png' />
                  <DiamondLabel>PRINCESS</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount CUSHION' title='CUSHION' id='CUSHION'>
                <div>
                  <img style={{ width: 45 }} alt='CUSHION' src='https://diamondz.s3.amazonaws.com/CUSHION.png' />
                  <DiamondLabel>CUSHION</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount CUSHION B' title='CUSHION B' id='CUSHION B'>
                <div>
                  <img style={{ width: 45 }} alt='CUSHION B' src='https://diamondz.s3.amazonaws.com/CUSHION%20B.png' />
                  <DiamondLabel>CUSHION B</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount PEAR' title='PEAR' id='PEAR'>
                <div>
                  <img style={{ width: 45 }} alt='PEAR' src='https://diamondz.s3.amazonaws.com/PEAR.png' />
                  <DiamondLabel>PEAR</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount OVAL' title='OVAL' id='OVAL'>
                <div>
                  <img style={{ width: 45 }} alt='OVAL' src='https://diamondz.s3.amazonaws.com/OVAL.png' />
                  <DiamondLabel>OVAL</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount MARQUISE' title='MARQUISE' id='MARQUISE'>
                <div>
                  <img style={{ width: 45 }} alt='MARQUISE' src='https://diamondz.s3.amazonaws.com/MARQUISE.png' />
                  <DiamondLabel>MARQUISE</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount HEART' title='HEART' id='HEART'>
                <div>
                  <img style={{ width: 45 }} alt='HEART' src='https://diamondz.s3.amazonaws.com/HEART.png' />
                  <DiamondLabel>HEART</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount EMERALD' title='EMERALD' id='EMERALD'>
                <div>
                  <img style={{ width: 45 }} alt='EMERALD' src='https://diamondz.s3.amazonaws.com/EMERALD.png' />
                  <DiamondLabel>EMERALD</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount ' title='S.EMERALD' id='S.EMERALD'>
                <div>
                  <img
                    style={{ width: 45 }}
                    alt='S.EMERALD'
                    src='https://diamondz.s3.amazonaws.com/S.EMERALD.png
'
                  />
                  <DiamondLabel>S.EMERALD</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount' title='L.RADIANT' id='L.RADIANT'>
                <div>
                  <img
                    style={{ width: 45 }}
                    alt='L.RADIANT'
                    src='https://diamondz.s3.amazonaws.com/L.RADIANT.png
'
                  />
                  <DiamondLabel>L.RADIANT</DiamondLabel>
                </div>
              </Diamond>
              <Diamond class='SL_S livecount RADIANT' title='RADIANT' id='RADIANT'>
                <div>
                  <img
                    style={{ width: 45 }}
                    alt='RADIANT'
                    src='https://diamondz.s3.amazonaws.com/RADIANT.png
'
                  />
                  <DiamondLabel>RADIANT</DiamondLabel>
                </div>
              </Diamond>
            </CardHeader>
          </Shape>
          <Shape>
            <div class='row col-md-6 col-md-6_mo'>
              <section class='col col-md-2 filtertitle'>
                <b>Carat</b>
              </section>
              <section class='col' style={{ marginTop: '5px', paddingLeft: '22px' }}>
                <Input
                  type='text'
                  class='form-control livecount'
                  id='min_carat'
                  placeholder='From (0.1)'
                  style={{ borderColor: '#51bbc9' }}
                />
              </section>
              <section class='col' style={{ marginTop: '5px' }}>
                <Input
                  type='text'
                  class='form-control livecount'
                  id='max_carat'
                  placeholder='To'
                  style={{ borderColor: '#51bbc9' }}
                />
              </section>
            </div>
            <div className='row'>
              <section className='col col-md-1 filtertitle'></section>
              <section>
                <b>Certificate</b>
              </section>
              <section className='col col-md-8'>
                <div className='col-md-12' id='Shape'>
                  <ul className='nav' id='min_cut'>
                    <Slcer class='SL_CER livecount GIA' title='GIA' id='GIA'>
                      GIA
                    </Slcer>
                    <Slcer class='SL_CER livecount HRD' title='HRD' id='HRD'>
                      HRD
                    </Slcer>
                    <Slcer class='SL_CER livecount IGI' title='IGI' id='IGI'>
                      IGI
                    </Slcer>
                  </ul>
                </div>
              </section>
            </div>
            <div class='row'>
              <Shape4 class='shape4 selectbgm livecount mobgm' id='BGM' style={{ fontSize: '12px' }}>
                BGM
              </Shape4>
              <Shape4 class='shape4 selectbgm livecount monobgm' id='NO BGM' style={{ fontSize: '12px' }}>
                NO-BGM
              </Shape4>
            </div>
          </Shape>
          <Shape class='row'>
            <div class='row col-md-12 col-md-12_mo' style={{ alignItems: 'center' }}>
              <section class='col col-md-1 filtertitle'>
                <b>Color</b>
              </section>
              <section class='col col-md-11'>
                <div class='col-md-12 shape2' id='Shape'>
                  <ul class='nav' id='min_cut'>
                    <Slcer class='SL_COL livecount D MO_COLOR_D' title='D' id='D'>
                      D
                    </Slcer>
                    <Slcer class='SL_COL livecount E MO_COLOR_E' title='E' id='E'>
                      E
                    </Slcer>
                    <Slcer class='SL_COL livecount F MO_COLOR_F' title='F' id='F'>
                      F
                    </Slcer>
                    <Slcer class='SL_COL livecount G MO_COLOR_G' title='G' id='G'>
                      G
                    </Slcer>
                    <Slcer class='SL_COL livecount H MO_COLOR_H' title='H' id='H'>
                      H
                    </Slcer>
                    <Slcer class='SL_COL livecount I MO_COLOR_I' title='I' id='I'>
                      I
                    </Slcer>
                    <Slcer class='SL_COL livecount J MO_COLOR_J' title='J' id='J'>
                      J
                    </Slcer>
                    <Slcer class='SL_COL livecount K MO_COLOR_K' title='K' id='K'>
                      K
                    </Slcer>
                    <Slcer class='SL_COL livecount L MO_COLOR_L' title='L' id='L'>
                      L
                    </Slcer>
                    <Slcer class='SL_COL livecount M MO_COLOR_M' title='M' id='M'>
                      M
                    </Slcer>
                    <Slcer class='SL_COL livecount N MO_COLOR_N' title='N' id='N'>
                      N
                    </Slcer>
                    <Slcer class='SL_COL livecount O MO_COLOR_O' title='O' id='O'>
                      O
                    </Slcer>
                    <Slcer class='SL_COL livecount P-Z MO_COLOR_P-Z' title='P-Z' id='P-Z'>
                      P-Z
                    </Slcer>
                  </ul>
                </div>
              </section>
            </div>
          </Shape>
          <Shape class='row'>
            <div class='row col-md-12 col-md-12_mo' style={{ alignItems: 'center' }}>
              <section class='col col-md-1 filtertitle'>
                <b>Clarity</b>
              </section>
              <section class='col col-md-11'>
                <div class='col-md-12 shape2' id='Shape'>
                  <ul class='nav' id='min_cut'>
                    <Slcer class='SL_CLA livecount FL' title='FL' id='FL'>
                      FL
                    </Slcer>
                    <Slcer class='SL_CLA livecount IF' title='IF' id='IF'>
                      IF
                    </Slcer>
                    <Slcer class='SL_CLA livecount VVS1' title='VVS1' id='VVS1'>
                      VVS1
                    </Slcer>
                    <Slcer class='SL_CLA livecount VVS2' title='VVS2' id='VVS2'>
                      VVS2
                    </Slcer>
                    <Slcer class='SL_CLA livecount VS1' title='VS1' id='VS1'>
                      VS1
                    </Slcer>
                    <Slcer class='SL_CLA livecount VS2' title='VS2' id='VS2'>
                      VS2
                    </Slcer>
                    <Slcer class='SL_CLA livecount SI1' title='SI1' id='SI1'>
                      SI1
                    </Slcer>
                    <Slcer class='SL_CLA livecount SI2' title='SI2' id='SI2'>
                      SI2
                    </Slcer>
                    <Slcer class='SL_CLA livecount SI3' title='SI3' id='SI3'>
                      SI3
                    </Slcer>
                    <Slcer class='SL_CLA livecount I1' title='I1' id='I1'>
                      I1
                    </Slcer>
                    <Slcer class='SL_CLA livecount I2' title='I2' id='I2'>
                      I2
                    </Slcer>
                    <Slcer class='SL_CLA livecount I3' title='I3' id='I3'>
                      I3
                    </Slcer>
                  </ul>
                </div>
              </section>
            </div>
          </Shape>
          <Shape class='row filterbox'>
            <div class='row col-md-12 col-md-12_mo' style={{ alignItems: 'center' }}>
              <section class='col col-md-1 filtertitle'>
                <b>Cut</b>
              </section>
              <section class='col col-md-11'>
                <div class='col-md-12 shape2' id='Shape'>
                  <ul class='nav' id='min_cut'>
                    <Slcer class='SL_CUT livecount EX MO_CUT_EX' title='EX' id='EX'>
                      EX
                    </Slcer>
                    <Slcer class='SL_CUT livecount VG MO_CUT_VG' title='VG' id='VG'>
                      VG
                    </Slcer>
                    <Slcer class='SL_CUT livecount GD MO_CUT_GD' title='GD' id='GD'>
                      GD
                    </Slcer>
                    <Slcer class='SL_CUT livecount F MO_CUT_F' title='F' id='F'>
                      F
                    </Slcer>
                  </ul>
                </div>
              </section>
            </div>
          </Shape>
          <Shape class='row filterbox'>
            <div class='row col-md-12 col-md-12_mo' style={{ alignItems: 'center' }}>
              <section class='col col-md-1 filtertitle'>
                <b>Polish</b>
              </section>
              <section class='col col-md-11'>
                <div class='col-md-12 shape2' id='Shape'>
                  <ul class='nav' id='min_cut'>
                    <Slcer class='SL_POL livecount EX MO_POLISH_EX' title='EX' id='EX'>
                      EX
                    </Slcer>
                    <Slcer class='SL_POL livecount VG MO_POLISH_VG' title='VG' id='VG'>
                      VG
                    </Slcer>
                    <Slcer class='SL_POL livecount GD MO_POLISH_GD' title='GD' id='GD'>
                      GD
                    </Slcer>
                    <Slcer class='SL_POL livecount F MO_POLISH_F' title='F' id='F'>
                      F
                    </Slcer>
                  </ul>
                </div>
              </section>
            </div>
          </Shape>
          <Shape class='row filterbox'>
            <div class='row col-md-12 col-md-12_mo' style={{ alignItems: 'center' }}>
              <section class='col col-md-1 filtertitle'>
                <b>Symmetry</b>
              </section>
              <section class='col col-md-11'>
                <div class='col-md-12 shape2' id='Shape'>
                  <ul class='nav' id='min_cut'>
                    <Slcer class='SL_SYM livecount EX MO_SYMM_EX' title='EX' id='EX'>
                      EX
                    </Slcer>
                    <Slcer class='SL_SYM livecount VG MO_SYMM_VG' title='VG' id='VG'>
                      VG
                    </Slcer>
                    <Slcer class='SL_SYM livecount GD MO_SYMM_GD' title='GD' id='GD'>
                      GD
                    </Slcer>
                    <Slcer class='SL_SYM livecount F MO_SYMM_F' title='F' id='F'>
                      F
                    </Slcer>
                  </ul>
                </div>
              </section>
            </div>
          </Shape>
          <Shape class='row filterbox'>
            <div class='row col-md-12 col-md-12_mo' style={{ alignItems: 'center' }}>
              <section class='col col-md-1 filtertitle'>
                <b>Fluorescence</b>
              </section>
              <section class='col col-md-11'>
                <div class='col-md-12 shape3' id='Shape'>
                  <ul class='nav' id='min_cut'>
                    <Shape3 class='SL_FLU livecount NONE' title='NONE' id='NONE'>
                      NONE
                    </Shape3>
                    <Shape3 class='SL_FLU livecount FAINT' title='FAINT' id='FAINT'>
                      FAINT
                    </Shape3>
                    <Shape3 class='SL_FLU livecount MEDIUM' title='MEDIUM' id='MEDIUM'>
                      MEDIUM
                    </Shape3>
                    <Shape3 class='SL_FLU livecount STRONG' title='STRONG' id='STRONG'>
                      STRONG
                    </Shape3>
                    <Shape3 class='SL_FLU livecount VERY STRONG' title='VERY STRONG' id='VERY STRONG'>
                      VERY STRONG
                    </Shape3>
                  </ul>
                </div>
              </section>
            </div>
          </Shape>
          <Shape class='row filterbox'>
            <section class='col col-md-1 filtertitle'>
              <span style={{ fontWeight: 'bold', lineHeight: '45px' }}>Stone Id</span>
            </section>
            <section class='col col-md-11 '>
              <div style={{ float: 'left' }}>
                <textarea
                  id='stoneid'
                  placeholder='Enter Stone Id here'
                  class='stockid_filter livecount'
                  style={{
                    borderColor: '#51bbc9',
                    width: '200px',
                    height: '45px',
                    border: '1px solid #51bbc9',
                    borderRadius: '5px'
                  }}></textarea>
              </div>
              <div
                style={{
                  marginRight: '17px',
                  marginLeft: '60px',
                  float: 'left',
                  fontWeight: 'bold',
                  lineHeight: '45px'
                }}>
                Report No
              </div>
              <div style={{ float: 'left' }}>
                <textarea
                  id='certi'
                  placeholder='Enter Certificate here'
                  class='stockid_filter livecount'
                  style={{
                    borderColor: '#51bbc9',
                    width: '200px',
                    height: '45px',
                    border: '1px solid #51bbc9',
                    borderRadius: '5px'
                  }}></textarea>
              </div>
            </section>
          </Shape>
        </Card>
      </Col>
    </>
  );
};

export default Requirement;
