import React, { useCallback, useMemo, useState } from 'react';
import { CardBody, FormGroup, Form, Input, Button, Label, Card, CardHeader, CardTitle, Row, Col } from 'reactstrap';
import { Mail, Lock, Check } from 'react-feather';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Checkbox from '../../components/@vuexy/checkbox/CheckboxesVuexy';
import loginImg from '../../assets/img/pages/login.png';
import { adminLogin, clientLogin } from '../../services/auth/authService';
import { isAdminPanel } from '../../helpers/common';
import { ADMIN_ROUTE, CLIENT_ROUTE } from '../../constants/constant';

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAdmin = useMemo(() => {
    const admin = isAdminPanel(location.pathname);
    return admin;
  }, [location]);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      let result;
      if (isAdmin) {
        const payload = {
          admin_login_email: email,
          admin_login_password: password
        };
        result = await dispatch(adminLogin(payload));
      } else {
        const payload = {
          user: email,
          pass: password
        };
        result = await dispatch(clientLogin(payload));
      }
      if (result) {
        let route = isAdmin ? ADMIN_ROUTE : CLIENT_ROUTE;
        history.push(`${route}/analytics`);
      }
    },
    [dispatch, email, history, isAdmin, password]
  );

  return (
    <Row className='m-0 justify-content-center'>
      <Col sm='8' xl='7' lg='10' md='8' className='d-flex justify-content-center'>
        <Card className='bg-authentication login-card rounded-0 mb-0 w-100'>
          <Row className='m-0'>
            <Col lg='6' className='d-lg-block d-none text-center align-self-center px-1 py-0'>
              <img src={loginImg} alt='loginImg' />
            </Col>
            <Col lg='6' md='12' className='p-0'>
              <Card className='rounded-0 mb-0 px-2 login-tabs-container'>
                <CardHeader className='pb-1'>
                  <CardTitle>
                    <h4 className='mb-0'>Login</h4>
                  </CardTitle>
                </CardHeader>
                <p className='px-2 auth-title'>Welcome back, please login to your account.</p>
                <br />
                <CardBody className='pt-1'>
                  <Form onSubmit={handleLogin}>
                    <br />
                    <FormGroup className='form-label-group position-relative has-icon-left'>
                      <Input
                        type={isAdmin ? 'email' : 'text'}
                        placeholder={isAdmin ? 'Email' : 'User Name'}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                      <div className='form-control-position'>
                        <Mail size={15} />
                      </div>
                      <Label>{isAdmin ? 'Email' : 'User Name'}</Label>
                    </FormGroup>
                    <FormGroup className='form-label-group position-relative has-icon-left'>
                      <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                      <div className='form-control-position'>
                        <Lock size={15} />
                      </div>
                      <Label>Password</Label>
                    </FormGroup>
                    <FormGroup className='d-flex justify-content-between align-items-center'>
                      <Checkbox
                        color='primary'
                        icon={<Check className='vx-icon' size={16} />}
                        label='Remember me'
                        defaultChecked={false}
                        //   onChange={this.handleRemember}
                      />
                      <div className='float-right'>
                        <Link to='/pages/forgot-password'>Forgot Password?</Link>
                      </div>
                    </FormGroup>
                    <div className='d-flex justify-content-between'>
                      <Button.Ripple
                        color='primary'
                        outline
                        //   onClick={() => {
                        //     history.push('/pages/register');
                        //   }}
                        type='button'>
                        Register
                      </Button.Ripple>
                      <Button.Ripple color='primary' type='submit'>
                        Login
                      </Button.Ripple>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
