import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Membership/Login';
import Cart from './pages/Cart/Cart';
import Hold from './pages/Hold/Hold';
import DubaiStock from './pages/Dubai-Stock/DubaiStock';
import WorldwideStock from './pages/Worldwide-Stock/WorldwideStock';
import Requirement from './pages/Requirement/Requirement';
import DiamondReview from './pages/Diamond-Review/DiamondReview';
import BookAppointment from './pages/Book-Appointment/BookAppointment';
import CallBack from './pages/Call-Back/CallBack';
import BankDetail from './pages/Bank-Detail/BankDetail';
import SpineWin from './pages/Spine&Win/SpineWin';
import userList from './pages/Cart/Cart';
import TechnicalSetting from './pages/Admin/TechnicalManagement/TechnicalSetting/TechnicalSetting';
import BankDetails from './pages/Admin/TechnicalManagement/BankDetails/BankDetails';
import TopicDetails from './pages/Admin/TechnicalManagement/TopicDetails/TopicDetails';
import PrimeCategory from './pages/Admin/TechnicalManagement/PrimeCategory/PrimeCategory';
import MasterCategory from './pages/Admin/TechnicalManagement/MasterCategory/MasterCategory';
import SubCategory from './pages/Admin/TechnicalManagement/SubCategory/SubCategory';
import EmailAddress from './pages/Admin/TechnicalManagement/EmailAddress/EmailAddress';
import EmailTemplate from './pages/Admin/TechnicalManagement/EmailTemplate/EmailTemplate';
import OrderList from './pages/Admin/OrderList/OrderList';
import User from './pages/Admin/User/User';
import CompanyWiseOrderList from './pages/Admin/CompanyWiseOrderList/CompanyWiseOrderList';
import FreelancerPayment from './pages/Admin/FreelancerPayment/FreelancerPayment';
import Client from './pages/Admin/Client/Client';
import Freelanchers from './pages/Admin/Freelanchers/Freelanchers';
import ApprovalList from './pages/Admin/ApprovalList/ApprovalList';
import TelegramActivity from './pages/Admin/TelegramActivity/TelegramActivity';
import TeamMember from './pages/Admin/TeamMember/TeamMember';
import CustomerOffer from './pages/Admin/CustomerOffer/CustomerOffer';
import ApiPanel from './pages/Admin/ApiPanel/ApiPanel';
import ExternalApiPanel from './pages/Admin/ExternalApiPanel/ExternalApiPanel';
import PasswordChange from './pages/Admin/PasswordChange/PasswordChange';
import SendMail from './pages/Admin/SendMail/SendMail';
import ComingSoon from './views/pages/misc/ComingSoon';
import Error404 from './views/pages/misc/error/404';
import { register } from './serviceWorker';
import ForgotPassword from './views/pages/authentication/ForgotPassword';
import ResetPassword from './views/pages/authentication/ResetPassword';
import Error500 from './views/pages/misc/error/500';
import NotAuthorized from './views/pages/misc/NotAuthorized';
import Maintenance from './views/pages/misc/Maintenance';
import { ADMIN_ROUTE, CLIENT_ROUTE, SITE_URL } from './constants/constant';
import AddNewEmailTemplate from './pages/Admin/TechnicalManagement/EmailTemplate/AddNewEmailTemplate';
import OrderDetails from './pages/Admin/OrderList/OrderDetails';

/**
 * Routes Array
 * Same properties should match for all attributes
 */
const routes = [
  {
    path: '/Index',
    component: Client,
    fullLayout: false,
    default: true
  },
  {
    path: `${CLIENT_ROUTE}/login`,
    component: Login,
    fullLayout: true
  },
  {
    path: `${ADMIN_ROUTE}/analytics`,
    component: Dashboard,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/analytics`,
    component: Dashboard,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/cart`,
    component: Cart,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/cart`,
    component: Cart,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/login`,
    component: Login,
    fullLayout: true
  },
  {
    path: `${ADMIN_ROUTE}/hold`,
    component: Hold
  },
  {
    path: `${CLIENT_ROUTE}/hold`,
    component: Hold,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/my_order_list`,
    component: Hold,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/my_offer`,
    component: Hold,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/dubai_stock`,
    component: DubaiStock,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/dubai_stock`,
    component: DubaiStock,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/world_wide`,
    component: WorldwideStock,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/world_wide`,
    component: WorldwideStock,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/requirement`,
    component: Requirement,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/diamond_review`,
    component: DiamondReview,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/diamond_review`,
    component: DiamondReview,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/book_appointment`,
    component: BookAppointment,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/call_back`,
    component: CallBack,
    exact: true
  },
  {
    path: `/BankDetail`,
    component: BankDetail,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/spin_win`,
    component: SpineWin,
    exact: true
  },
  {
    path: `/app/user/list`,
    component: userList,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/tech_setting`,
    component: TechnicalSetting,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/bank_details`,
    component: BankDetails,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/topic`,
    component: TopicDetails,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/master_category`,
    component: MasterCategory,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/prime_category`,
    component: PrimeCategory,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/sub_category`,
    component: SubCategory,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/email_address`,
    component: EmailAddress,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/email_template`,
    component: EmailTemplate,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/email_template_editor`,
    component: AddNewEmailTemplate,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/order_list`,
    component: OrderList,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/User`,
    component: User,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/company_wise_list`,
    component: CompanyWiseOrderList,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/freelancer_payment`,
    component: FreelancerPayment,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/edit_client`,
    component: Client,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/edit_freelancer`,
    component: Freelanchers,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/approval_list`,
    component: ApprovalList,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/telegram_activity`,
    component: TelegramActivity,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/my_team`,
    component: TeamMember,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/customer_offer`,
    component: CustomerOffer,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/api_panel`,
    component: ApiPanel,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/ex_api_panel`,
    component: ExternalApiPanel,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/password_change`,
    component: PasswordChange,
    exact: true
  },
  {
    path: `${CLIENT_ROUTE}/password_change`,
    component: PasswordChange,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/send_mail`,
    component: SendMail,
    exact: true
  },
  {
    path: `${ADMIN_ROUTE}/order_details`,
    component: OrderDetails,
    exact: true
  },
  {
    path: `/misc/coming-soon`,
    component: ComingSoon,
    fullLayout: true,
    exact: true
  },
  {
    path: `/misc/error/404`,
    component: Error404,
    fullLayout: true,
    exact: true
  },
  {
    path: `/pages/register`,
    component: register,
    fullLayout: true
  },
  {
    path: `/pages/forgot-password`,
    component: ForgotPassword,
    fullLayout: true,
    exact: true
  },
  {
    path: `/pages/reset-password`,
    component: ResetPassword,
    fullLayout: true,
    exact: true
  },
  {
    path: `/misc/error/500`,
    component: Error500,
    fullLayout: true,
    exact: true
  },
  {
    path: `/misc/coming-soon`,
    component: ComingSoon,
    fullLayout: true,
    exact: true
  },
  {
    path: `/misc/not-authorized`,
    component: NotAuthorized,
    fullLayout: true,
    exact: true
  },
  {
    path: `/misc/maintenance`,
    component: Maintenance,
    fullLayout: true,
    exact: true
  }
];

export default routes;
