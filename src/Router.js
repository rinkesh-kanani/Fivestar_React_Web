import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import Spinner from './components/@vuexy/spinner/Loading-spinner';
import { ContextLayout } from './utility/context/Layout';

// Route-based code splitting
const comingSoon = lazy(() => import('./views/pages/misc/ComingSoon'));
const error404 = lazy(() => import('./views/pages/misc/error/404'));
const error500 = lazy(() => import('./views/pages/misc/error/500'));
const authorized = lazy(() => import('./views/pages/misc/NotAuthorized'));
const maintenance = lazy(() => import('./views/pages/misc/Maintenance'));
// const Login = lazy(() => import('./views/pages/authentication/login/Login'));
const Login = lazy(() => import('./pages/Membership/Login'));

const forgotPassword = lazy(() => import('./views/pages/authentication/ForgotPassword'));
const lockScreen = lazy(() => import('./views/pages/authentication/LockScreen'));
const resetPassword = lazy(() => import('./views/pages/authentication/ResetPassword'));
const register = lazy(() => import('./views/pages/authentication/register/Register'));
//--------------------------------------------------------------------
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

const Cart = lazy(() => import('./pages/Cart/Cart'));
const Hold = lazy(() => import('./pages/Hold/Hold'));
const DubaiStock = lazy(() => import('./pages/Dubai-Stock/DubaiStock'));
const WorldwideStock = lazy(() => import('./pages/Worldwide-Stock/WorldwideStock'));
const Requirement = lazy(() => import('./pages/Requirement/Requirement'));
const DiamondReview = lazy(() => import('./pages/Diamond-Review/DiamondReview'));
const BookAppointment = lazy(() => import('./pages/Book-Appointment/BookAppointment'));
const CallBack = lazy(() => import('./pages/Call-Back/CallBack'));
const BankDetail = lazy(() => import('./pages/Bank-Detail/BankDetail'));
const SpineWin = lazy(() => import('./pages/Spine&Win/SpineWin'));
const userList = lazy(() => import('./pages/Cart/Cart'));
const TechnicalSetting = lazy(() => import('./pages/Admin/TechnicalManagement/TechnicalSetting/TechnicalSetting'));
const BankDetails = lazy(() => import('./pages/Admin/TechnicalManagement/BankDetails/BankDetails'));
const TopicDetails = lazy(() => import('./pages/Admin/TechnicalManagement/TopicDetails/TopicDetails'));
const MasterCategory = lazy(() => import('./pages/Admin/TechnicalManagement/MasterCategory/MasterCategory'));
const PrimeCategory = lazy(() => import('./pages/Admin/TechnicalManagement/PrimeCategory/PrimeCategory'));
const SubCategory = lazy(() => import('./pages/Admin/TechnicalManagement/SubCategory/SubCategory'));
const EmailAddress = lazy(() => import('./pages/Admin/TechnicalManagement/EmailAddress/EmailAddress'));
const EmailTemplate = lazy(() => import('./pages/Admin/TechnicalManagement/EmailTemplate/EmailTemplate'));
const OrderList = lazy(() => import('./pages/Admin/OrderList/OrderList'));
const User = lazy(() => import('./pages/Admin/User/User'));
const CompanyWiseOrderList = lazy(() => import('./pages/Admin/CompanyWiseOrderList/CompanyWiseOrderList'));
const FreelancerPayment = lazy(() => import('./pages/Admin/FreelancerPayment/FreelancerPayment'));
const Client = lazy(() => import('./pages/Admin/Client/Client'));
const Freelanchers = lazy(() => import('./pages/Admin/Freelanchers/Freelanchers'));
const ApprovalList = lazy(() => import('./pages/Admin/ApprovalList/ApprovalList'));
const TelegramActivity = lazy(() => import('./pages/Admin/TelegramActivity/TelegramActivity'));
const TeamMember = lazy(() => import('./pages/Admin/TeamMember/TeamMember'));
const CustomerOffer = lazy(() => import('./pages/Admin/CustomerOffer/CustomerOffer'));
const ApiPanel = lazy(() => import('./pages/Admin/ApiPanel/ApiPanel'));
const ExternalApiPanel = lazy(() => import('./pages/Admin/ExternalApiPanel/ExternalApiPanel'));
const PasswordChange = lazy(() => import('./pages/Admin/PasswordChange/PasswordChange'));
const SendMail = lazy(() => import('./pages/Admin/SendMail/SendMail'));
const OrderDetails = lazy(() => import('./pages/Admin/OrderList/OrderDetails'));
const AddNewEmailTemplate = lazy(() => import('./pages/Admin/TechnicalManagement/EmailTemplate/AddNewEmailTemplate'));

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            const LayoutTag = fullLayout === true ? context.fullLayout : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

const AppRoute = RouteConfig;

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute path='/client_panel' component={Login} fullLayout />
          <AppRoute path='/fivestar_panel' component={Login} fullLayout />
          <AppRoute path='/dashboard' component={Dashboard} />

          <AppRoute path='/cart' component={Cart} />
          <AppRoute path='/onhold' component={Hold} />
          <AppRoute path='/myorder' component={Hold} />
          <AppRoute path='/myoffer' component={Hold} />
          <AppRoute path='/DubaiStock' component={DubaiStock} />
          <AppRoute path='/WorldwideStock' component={WorldwideStock} />
          <AppRoute path='/Requirement' component={Requirement} />
          <AppRoute path='/DiamondReview' component={DiamondReview} />
          <AppRoute path='/BookAppointment' component={BookAppointment} />
          <AppRoute path='/CallBack' component={CallBack} />
          <AppRoute path='/BankDetail' component={BankDetail} />
          <AppRoute path='/SpineWin' component={SpineWin} />
          <AppRoute path='/app/user/list' component={userList} />
          <AppRoute path='/TechnicalSetting' component={TechnicalSetting} />
          <AppRoute path='/BankDetails' component={BankDetails} />
          <AppRoute path='/topic' component={TopicDetails} />
          <AppRoute path='/master' component={MasterCategory} />
          <AppRoute path='/Prime' component={PrimeCategory} />
          <AppRoute path='/Sub' component={SubCategory} />
          <AppRoute path='/EmailAddress' component={EmailAddress} />
          <AppRoute path='/EmailTemplate' component={EmailTemplate} />
          <AppRoute path='/AddNewEmailTemplate' component={AddNewEmailTemplate} />
          <AppRoute path='/OrderList' component={OrderList} />
          <AppRoute path='/User' component={User} />
          <AppRoute path='/CompanyWiseOrderList' component={CompanyWiseOrderList} />
          <AppRoute path='/FreelancerPayment' component={FreelancerPayment} />
          <AppRoute path='/Client' component={Client} />
          <AppRoute path='/Freelanchers' component={Freelanchers} />
          <AppRoute path='/ApprovalList' component={ApprovalList} />
          <AppRoute path='/TelegramActivity' component={TelegramActivity} />
          <AppRoute path='/TeamMember' component={TeamMember} />
          <AppRoute path='/CustomerOffer' component={CustomerOffer} />
          <AppRoute path='/ApiPanel' component={ApiPanel} />
          <AppRoute path='/ExternalApiPanel' component={ExternalApiPanel} />
          <AppRoute path='/PasswordChange' component={PasswordChange} />
          <AppRoute path='/SendMail' component={SendMail} />
          <AppRoute path='/order-details' component={OrderDetails} />

          <AppRoute path='/misc/coming-soon' component={comingSoon} fullLayout />
          <AppRoute path='/misc/error/404' component={error404} fullLayout />
          <AppRoute path='/pages/register' component={register} fullLayout />
          <AppRoute path='/pages/forgot-password' component={forgotPassword} fullLayout />
          <AppRoute path='/pages/lock-screen' component={lockScreen} fullLayout />
          <AppRoute path='/pages/reset-password' component={resetPassword} fullLayout />
          <AppRoute path='/misc/error/500' component={error500} fullLayout />
          <AppRoute path='/misc/not-authorized' component={authorized} fullLayout />
          <AppRoute path='/misc/maintenance' component={maintenance} fullLayout />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
