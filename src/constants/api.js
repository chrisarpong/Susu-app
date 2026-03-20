// PledgePay API Configuration
// Update BASE_URL to your Spring Boot server's address
export const BASE_URL = 'http://localhost:8080/pledgepayservice/uat';

export const ENDPOINTS = {
  // Users
  USERS: {
    CREATE: `${BASE_URL}/users/create`,
    LIST: `${BASE_URL}/users/list`,
    GET: (id) => `${BASE_URL}/users/${id}`,
    UPDATE: (id) => `${BASE_URL}/users/${id}`,
    DELETE: (id) => `${BASE_URL}/users/${id}`,
  },
  // Groups
  GROUPS: {
    CREATE: `${BASE_URL}/groups/create`,
    LIST: `${BASE_URL}/groups/list`,
    GET: (id) => `${BASE_URL}/groups/${id}`,
    UPDATE: (id) => `${BASE_URL}/groups/${id}`,
    DELETE: (id) => `${BASE_URL}/groups/${id}`,
  },
  // Group Members
  GROUP_MEMBERS: {
    CREATE: `${BASE_URL}/group-members/create`,
    LIST: `${BASE_URL}/group-members/list`,
    GET: (id) => `${BASE_URL}/group-members/${id}`,
    UPDATE: (id) => `${BASE_URL}/group-members/${id}`,
    DELETE: (id) => `${BASE_URL}/group-members/${id}`,
  },
  // Contributions
  CONTRIBUTIONS: {
    CREATE: `${BASE_URL}/contributions/create`,
    LIST: `${BASE_URL}/contributions/list`,
    GET: (id) => `${BASE_URL}/contributions/${id}`,
    UPDATE: (id) => `${BASE_URL}/contributions/${id}`,
    DELETE: (id) => `${BASE_URL}/contributions/${id}`,
  },
  // Payouts
  PAYOUTS: {
    CREATE: `${BASE_URL}/payouts/create`,
    LIST: `${BASE_URL}/payouts/list`,
    GET: (id) => `${BASE_URL}/payouts/${id}`,
    UPDATE: (id) => `${BASE_URL}/payouts/${id}`,
    DELETE: (id) => `${BASE_URL}/payouts/${id}`,
  },
  // Transactions
  TRANSACTIONS: {
    CREATE: `${BASE_URL}/transactions/create`,
    LIST: `${BASE_URL}/transactions/list`,
    GET: (id) => `${BASE_URL}/transactions/${id}`,
    UPDATE: (id) => `${BASE_URL}/transactions/${id}`,
    DELETE: (id) => `${BASE_URL}/transactions/${id}`,
  },
  // Notifications
  NOTIFICATIONS: {
    CREATE: `${BASE_URL}/notifications/create`,
    LIST: `${BASE_URL}/notifications/list`,
    GET: (id) => `${BASE_URL}/notifications/${id}`,
    UPDATE: (id) => `${BASE_URL}/notifications/${id}`,
    DELETE: (id) => `${BASE_URL}/notifications/${id}`,
  },
  // Disputes
  DISPUTES: {
    CREATE: `${BASE_URL}/disputes/create`,
    LIST: `${BASE_URL}/disputes/list`,
    GET: (id) => `${BASE_URL}/disputes/${id}`,
    UPDATE: (id) => `${BASE_URL}/disputes/${id}`,
    DELETE: (id) => `${BASE_URL}/disputes/${id}`,
  },
  // Vaults
  VAULTS: {
    CREATE: `${BASE_URL}/vaults/create`,
    LIST: `${BASE_URL}/vaults/list`,
    GET: (id) => `${BASE_URL}/vaults/${id}`,
    UPDATE: (id) => `${BASE_URL}/vaults/${id}`,
    DELETE: (id) => `${BASE_URL}/vaults/${id}`,
  },
  // Vault Contributions
  VAULT_CONTRIBUTIONS: {
    CREATE: `${BASE_URL}/vault-contributions/create`,
    LIST: `${BASE_URL}/vault-contributions/list`,
    GET: (id) => `${BASE_URL}/vault-contributions/${id}`,
    UPDATE: (id) => `${BASE_URL}/vault-contributions/${id}`,
    DELETE: (id) => `${BASE_URL}/vault-contributions/${id}`,
  },
};
