import { Icons } from '@/components/icons';
import {
  getBiometricAttendanceLink,
  getCalendarLink,
  getDashboardLink,
  getDepartmentLink,
  getDesignationLink,
  getDocumentLink,
  getEmployeeAttendanceLink,
  getEmployeeLink,
  getFeedbackSuggestionsLink,
  getHelpSupportLink,
  getLeaveLink,
  getPayrollLink,
  getPerformanceReviewsLink,
  getRoleLink,
  getRolePermissionLink,
  getSecurityLink,
  getSettingsLink,
  getTeamManagementLink,
  getUserLink,
  getUserProfileLink,
} from '@/routes/router-link';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: getDashboardLink(),
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [],
  },
  {
    title: 'Users',
    url: getUserLink(),
    icon: 'user',
    isActive: false,
    shortcut: ['e', 'e'],
    items: [],
  },
  {
    title: 'Roles',
    url: getRoleLink(),
    icon: 'link',
    isActive: false,
    shortcut: ['e', 'e'],
    items: [],
  },
  {
    title: 'Employee',
    url: getEmployeeLink(),
    icon: 'user',
    isActive: false,
    shortcut: ['e', 'e'],
    items: [],
  },
  {
    title: 'Product',
    url: '/product',
    icon: 'monitor',
    isActive: false,
    items: [],
  },
  {
    title: 'Department',
    url: getDepartmentLink(),
    icon: 'monitor',
    isActive: false,
    items: [],
  },
  {
    title: 'Designation',
    url: getDesignationLink(),
    icon: 'section',
    isActive: false,
    items: [],
  },
  {
    title: 'Role & Permission',
    url: getRolePermissionLink(),
    icon: 'settings',
    isActive: false,
    items: [
      {
        title: 'Role',
        url: getRolePermissionLink(),
        icon: 'settings',
        isActive: false,
        items: [],
      },
      {
        title: 'Permission',
        url: getRolePermissionLink(),
        icon: 'settings',
        isActive: false,
        items: [],
      },
      {
        title: 'Role & Permission',
        url: getRolePermissionLink(),
        icon: 'settings',
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: 'Team Management',
    url: getTeamManagementLink(),
    icon: 'treePalm',
    isActive: false,
    items: [],
  },
  {
    title: 'Project & Task',
    url: '#',
    icon: 'link',
    isActive: false,
    items: [
      {
        title: 'Projects',
        url: getEmployeeAttendanceLink(),
        icon: 'link',
        shortcut: ['p', 'j'],
      },
      {
        title: 'Tasks',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['t', 'k'],
      },
      {
        title: 'Task Board',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['t', 'b'],
      },
    ],
  },
  {
    title: 'Attendance',
    url: '#',
    icon: 'link',
    isActive: false,
    items: [
      {
        title: 'Employee',
        url: getEmployeeAttendanceLink(),
        icon: 'link',
        shortcut: ['a', 'e'],
      },
      {
        title: 'Biometric',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['a', 'b'],
      },
    ],
  },
  {
    title: 'Tickets',
    url: getLeaveLink(),
    icon: 'link',
    isActive: false,
    items: [],
  },
  {
    title: 'Leave',
    url: getLeaveLink(),
    icon: 'link',
    isActive: false,
    items: [],
  },
  {
    title: 'Calendar',
    url: getCalendarLink(),
    icon: 'link',
    isActive: false,
    items: [],
  },
  {
    title: 'Performance Reviews',
    url: getPerformanceReviewsLink(),
    icon: 'link',
    isActive: false,
    items: [],
  },
  {
    title: 'Payroll',
    url: getPayrollLink(),
    icon: 'link',
    isActive: false,
    items: [],
  },
  {
    title: 'Document',
    url: getDocumentLink(),
    icon: 'link',
    isActive: false,
    items: [],
  },
  {
    title: 'Reports',
    url: '#',
    icon: 'link',
    isActive: false,
    items: [
      {
        title: 'Expense Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'e'],
      },
      {
        title: 'Invoice Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'i'],
      },
      {
        title: 'Payments Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'p'],
      },
      {
        title: 'Project Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'j'],
      },
      {
        title: 'Task Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 't'],
      },
      {
        title: 'User Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'u'],
      },
      {
        title: 'Employee Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'e'],
      },
      {
        title: 'Daily Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'd'],
      },
      {
        title: 'Leave Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'l'],
      },
      {
        title: 'Attendance Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'a'],
      },
      {
        title: 'Payslip Report',
        url: getBiometricAttendanceLink(),
        icon: 'link',
        shortcut: ['r', 'p'],
      },
    ],
  },
  {
    title: 'Settings',
    url: getSettingsLink(),
    icon: 'settings',
    isActive: false,
    items: [],
  },
  {
    title: 'User Profile & Security',
    url: '#',
    icon: 'link',
    isActive: false,
    items: [
      {
        title: 'User Profile',
        url: getUserProfileLink(),
        icon: 'link',
        shortcut: ['u', 'p'],
      },
      {
        title: 'Security',
        url: getSecurityLink(),
        icon: 'link',
        shortcut: ['s', 'e'],
      },
    ],
  },
  {
    title: 'Help & Support',
    url: getHelpSupportLink(),
    icon: 'help',
    isActive: false,
    items: [],
  },
  {
    title: 'Feedback & Suggestions',
    url: getFeedbackSuggestionsLink(),
    icon: 'link',
    isActive: false,
    items: [],
  },
];
