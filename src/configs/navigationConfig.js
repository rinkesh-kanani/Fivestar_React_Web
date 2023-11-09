import React from 'react';
import * as Icon from 'react-feather';
import { ADMIN_ROUTE, CLIENT_ROUTE } from '../constants/constant';
const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: <Icon.Home size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/analytics`
  },
  {
    id: 'cart',
    title: 'Cart',
    type: 'item',
    icon: <Icon.ShoppingCart size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/cart`
  },
  {
    id: 'hold',
    title: 'Hold',
    type: 'item',
    icon: <Icon.Eye size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/hold`
  },
  {
    id: 'myoffer',
    title: 'My Offer',
    type: 'item',
    icon: <Icon.StopCircle size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/my_offer`
  },
  {
    id: 'myorder',
    title: 'My Order',
    type: 'item',
    icon: <Icon.Users size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/my_order_list`
  },
  {
    id: 'DubaiStock',
    title: 'Dubai Stock',
    type: 'item',
    icon: <Icon.Archive size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/dubai_stock`
  },
  {
    id: 'WorldwideStock',
    title: 'Worldwide Stock',
    type: 'item',
    icon: <Icon.Globe size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/world_wide`
  },
  {
    id: 'Requirement',
    title: 'Requirement',
    type: 'item',
    icon: <Icon.StopCircle size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/requirement`
  },
  {
    id: 'DiamondReview',
    title: 'Diamond Review',
    type: 'item',
    icon: <Icon.Star size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/diamond_review`
  },
  {
    id: 'BookAppointment',
    title: 'Book Appointment',
    type: 'item',
    icon: <Icon.StopCircle size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/book_appointment`
  },
  {
    id: 'CallBack',
    title: 'Call Back',
    type: 'item',
    icon: <Icon.PhoneCall size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/call_back`
  },
  {
    id: 'BankDetail',
    title: 'Bank Detail',
    type: 'item',
    icon: <Icon.StopCircle size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: '/BankDetail'
  },
  {
    id: 'SpineWin',
    title: 'SPINE & WIN',
    type: 'item',
    icon: <Icon.StopCircle size={20} />,
    permissions: ['client', 'freelancer'],
    navLink: `${CLIENT_ROUTE}/spin_win`
  },
  {
    id: 'myearning',
    title: 'My Earning',
    type: 'item',
    icon: <Icon.StopCircle size={20} />,
    permissions: ['freelancer'],
    navLink: `/SpineWin`
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: <Icon.Home size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/analytics`
  },
  {
    id: 'cart',
    title: 'Cart',
    type: 'item',
    icon: <Icon.ShoppingCart size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/cart`
  },
  {
    id: 'hold',
    title: 'Hold',
    type: 'item',
    icon: <Icon.Eye size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/hold`
  },
  {
    id: 'DubaiStock',
    title: 'Dubai Stock',
    type: 'item',
    icon: <Icon.Archive size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/dubai_stock`
  },
  {
    id: 'WorldwideStock',
    title: 'Worldwide Stock',
    type: 'item',
    icon: <Icon.Globe size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/world_wide`
  },
  {
    id: 'DiamondReview',
    title: 'Diamond Review',
    type: 'item',
    icon: <Icon.Star size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/diamond_review`
  },
  {
    id: 'orderlist',
    title: 'Order List',
    type: 'item',
    icon: <Icon.ShoppingBag size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/order_list`
  },
  {
    id: 'CompanyWiseOrderList',
    title: 'Company Wise Order List',
    type: 'item',
    icon: <Icon.ShoppingBag size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/company_wise_list`
  },
  {
    id: 'FreelancerPayment',
    title: 'Freelancer Payment',
    type: 'item',
    icon: <Icon.DollarSign size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/freelancer_payment`
  },
  {
    id: 'Client',
    title: 'Client',
    type: 'item',
    icon: <Icon.UserCheck size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/edit_client`
  },
  {
    id: 'User',
    title: 'User',
    type: 'item',
    icon: <Icon.User size={20} />,
    permissions: ['admin'],
    navLink: '/User'
  },
  {
    id: 'Freelanchers',
    title: 'Freelanchers',
    type: 'item',
    icon: <Icon.UserPlus size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/edit_freelancer`
  },

  {
    id: 'ApprovalList',
    title: 'Approval List',
    type: 'item',
    icon: <Icon.CheckSquare size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/approval_list`
  },
  {
    id: 'CustomerOffer',
    title: 'Customer Offer',
    type: 'item',
    icon: <Icon.Users size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/customer_offer`
  },
  {
    id: 'TelegramActivity',
    title: 'Telegram Activity',
    type: 'item',
    icon: <Icon.Activity size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/telegram_activity`
  },
  {
    id: 'technical_management',
    title: 'Technical Management',
    type: 'collapse',
    icon: <Icon.Command size={20} />,
    permissions: ['admin'],
    children: [
      {
        id: 'TechnicalSetting',
        title: 'Technical Setting',
        type: 'item',
        icon: <Icon.Settings size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/tech_setting`
      },
      {
        id: 'BankDetails',
        title: 'Bank Details ',
        type: 'item',
        icon: <Icon.Users size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/bank_details`
      },
      {
        id: 'topic',
        title: 'Topic Details',
        type: 'item',
        icon: <Icon.Grid size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/topic`
      },
      {
        id: 'master',
        title: 'Master Category',
        type: 'item',
        icon: <Icon.Grid size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/master_category`
      },
      {
        id: 'prime',
        title: 'Prime Category',
        type: 'item',
        icon: <Icon.Grid size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/prime_category`
      },
      {
        id: 'sub',
        title: 'Sub Category',
        type: 'item',
        icon: <Icon.Grid size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/sub_category`
      },
      {
        id: 'EmailAddress',
        title: 'Email Address',
        type: 'item',
        icon: <Icon.Mail size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/email_address`
      },
      {
        id: 'EmailTemplate',
        title: 'Email Template',
        type: 'item',
        icon: <Icon.Mail size={12} />,
        permissions: ['admin'],
        navLink: `${ADMIN_ROUTE}/email_template`
      }
    ]
  },
  {
    id: 'TeamMember',
    title: 'Team Member',
    type: 'item',
    icon: <Icon.User size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/my_team`
  },
  {
    id: 'ApiPanel',
    title: 'Api Panel',
    type: 'item',
    icon: <Icon.Share2 size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/api_panel`
  },
  {
    id: 'ExternalApiPanel',
    title: 'External Api Panel',
    type: 'item',
    icon: <Icon.Share2 size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/ex_api_panel`
  },
  {
    id: 'PasswordChange',
    title: 'Password Change',
    type: 'item',
    icon: <Icon.Key size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/password_change`
  },
  {
    id: 'SendMail',
    title: 'Send Mail',
    type: 'item',
    icon: <Icon.Mail size={20} />,
    permissions: ['admin'],
    navLink: `${ADMIN_ROUTE}/password_change`
  }
  // {
  //   type: "groupHeader",
  //   groupTitle: "APPS",
  // },
  // {
  //   id: "todo",
  //   title: "Todo",
  //   type: "item",
  //   icon: <Icon.CheckSquare size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/todo/:filter",
  //   filterBase: "/todo/all",
  // },
  // {
  //   id: "users",
  //   title: "User",
  //   type: "collapse",
  //   icon: <Icon.User size={20} />,
  //   children: [
  //     {
  //       id: "list",
  //       title: "List",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/user/list",
  //     },
  //     {
  //       id: "view",
  //       title: "View",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/user/view",
  //     },
  //     {
  //       id: "edit",
  //       title: "Edit",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/user/edit",
  //     },
  //   ],
  // },
  // {
  //   type: "groupHeader",
  //   groupTitle: "UI ELEMENTS",
  // },
  // {
  //   id: "dataList",
  //   title: "Data List",
  //   type: "collapse",
  //   icon: <Icon.List size={20} />,
  //   badge: "primary",
  //   badgeText: "new",
  //   children: [
  //     {
  //       id: "listView",
  //       title: "List View",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/data-list/list-view",
  //     },
  //     {
  //       id: "thumbView",
  //       title: "Thumb View",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/data-list/thumb-view",
  //     },
  //   ],
  // },

  // {
  //   id: "components",
  //   title: "Components",
  //   type: "collapse",
  //   icon: <Icon.Briefcase size={20} />,
  //   children: [
  //     {
  //       id: "alerts",
  //       title: "Alerts",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/alerts",
  //     },
  //     {
  //       id: "buttons",
  //       title: "Buttons",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/buttons",
  //     },
  //     {
  //       id: "breadCrumbs",
  //       title: "Breadcrumbs",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/breadcrumbs",
  //     },
  //     {
  //       id: "carousel",
  //       title: "Carousel",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/carousel",
  //     },
  //     {
  //       id: "collapse",
  //       title: "Collapse",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/collapse",
  //     },
  //     {
  //       id: "dropDowns",
  //       title: "Dropdowns",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/dropdowns",
  //     },
  //     {
  //       id: "listGroup",
  //       title: "List Group",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/list-group",
  //     },
  //     {
  //       id: "modals",
  //       title: "Modals",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/modals",
  //     },
  //     {
  //       id: "pagination",
  //       title: "Pagination",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/pagination",
  //     },
  //     {
  //       id: "navsComponent",
  //       title: "Navs Component",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/nav-component",
  //     },
  //     {
  //       id: "navbar",
  //       title: "Navbar",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/navbar",
  //     },
  //     {
  //       id: "tabsComponent",
  //       title: "Tabs Component",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/tabs-component",
  //     },
  //     {
  //       id: "pillsComponent",
  //       title: "Pills Component",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/pills-component",
  //     },
  //     {
  //       id: "tooltips",
  //       title: "Tooltips",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/tooltips",
  //     },
  //     {
  //       id: "popovers",
  //       title: "Popovers",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/popovers",
  //     },
  //     {
  //       id: "badges",
  //       title: "Badges",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/badges",
  //     },
  //     {
  //       id: "pillBadges",
  //       title: "Pill Badges",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/pill-badges",
  //     },
  //     {
  //       id: "progress",
  //       title: "Progress",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/progress",
  //     },
  //     {
  //       id: "mediaObjects",
  //       title: "Media Objects",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/media-objects",
  //     },
  //     {
  //       id: "spinners",
  //       title: "Spinners",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/spinners",
  //     },
  //     {
  //       id: "toasts",
  //       title: "Toasts",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/components/toasts",
  //     },
  //   ],
  // },
  // {
  //   id: "extraComponents",
  //   title: "Extra Components",
  //   type: "collapse",
  //   icon: <Icon.Box size={20} />,
  //   children: [
  //     {
  //       id: "autoComplete",
  //       title: "Auto Complete",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/extra-components/auto-complete",
  //     },
  //     {
  //       id: "avatar",
  //       title: "Avatar",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/extra-components/avatar",
  //     },
  //     {
  //       id: "chips",
  //       title: "Chips",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/extra-components/chips",
  //     },
  //     {
  //       id: "divider",
  //       title: "Divider",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/extra-components/divider",
  //     },
  //   ],
  // },
  // {
  //   type: "groupHeader",
  //   groupTitle: "FORMS & TABLES",
  // },

  // {
  //   id: "formLayouts",
  //   title: "Form Layouts",
  //   type: "item",
  //   icon: <Icon.Box size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/forms/layout/form-layout",
  // },
  // {
  //   id: "wizard",
  //   title: "Form Wizard",
  //   type: "item",
  //   icon: <Icon.MoreHorizontal size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/forms/wizard",
  // },
  // {
  //   id: "formik",
  //   title: "Formik",
  //   type: "item",
  //   icon: <Icon.CheckCircle size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/forms/formik",
  // },
  // {
  //   id: "tables",
  //   title: "Tables",
  //   type: "collapse",
  //   icon: <Icon.Server size={20} />,
  //   children: [
  //     {
  //       id: "tablesReactstrap",
  //       title: "Reactstrap Tables",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/tables/reactstrap",
  //     },
  //     {
  //       id: "reactTables",
  //       title: "React Tables",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/tables/react-tables",
  //     },
  //     {
  //       id: "aggrid",
  //       title: "agGrid Table",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/tables/agGrid",
  //     },
  //     {
  //       id: "dataTable",
  //       title: "DataTables",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/tables/data-tables",
  //     },
  //   ],
  // },
  // {
  //   type: "groupHeader",
  //   groupTitle: "CHARTS & MAPS",
  // },

  // {
  //   type: "groupHeader",
  //   groupTitle: "EXTENSIONS",
  // },
  // {
  //   id: "sweetAlert",
  //   title: "Sweet Alerts",
  //   icon: <Icon.AlertCircle size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/sweet-alert",
  // },
  // {
  //   id: "toastr",
  //   title: "Toastr",
  //   icon: <Icon.Zap size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/toastr",
  // },
  // {
  //   id: "fileUploader",
  //   title: "File Uploader",
  //   icon: <Icon.UploadCloud size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/file-uploader",
  // },

  // {
  //   id: "drag_&_drop",
  //   title: "Drag & Drop",
  //   icon: <Icon.Droplet size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/drag-and-drop",
  // },
  // {
  //   id: "tour",
  //   title: "Tour",
  //   icon: <Icon.Info size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/tour",
  // },
  // {
  //   id: "clipBoard",
  //   title: "Clipboard",
  //   icon: <Icon.Copy size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/clipboard",
  // },
  // {
  // {
  //   id: "contentMenu",
  //   title: "Context Menu",
  //   icon: <Icon.Menu size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/context-menu",
  // },

  // {
  //   id: "extImport",
  //   title: "Import",
  //   icon: <Icon.DownloadCloud size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/import",
  // },
  // {
  //   id: "extExport",
  //   title: "Export",
  //   icon: <Icon.UploadCloud size={20} />,
  //   type: "item",
  //   permissions: ["admin", "editor"],
  //   navLink: "/extensions/export",
  // },
  // {
  //   id: "extExportSelected",
  //   title: "Export Selected",
  //   icon: <Icon.CheckSquare size={20} />,
  //   type: "item",
  //   navLink: "/extensions/export-selected",
  //   permissions: ["admin", "editor"],
  // },
];

export default navigationConfig;
