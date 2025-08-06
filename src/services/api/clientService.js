import { toast } from 'react-toastify';
import clientsData from '@/services/mockData/clients.json';

// Create a copy to avoid mutating the original data
let clients = [...clientsData];

export const clientService = {
  // Get all clients
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...clients]);
      }, 500);
    });
  },

  // Get client by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const client = clients.find(c => c.Id === parseInt(id));
        if (client) {
          resolve({ ...client });
        } else {
          reject(new Error(`Client with ID ${id} not found`));
        }
      }, 300);
    });
  },


  // Update existing client
  update: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = clients.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          clients[index] = { ...clients[index], ...updates };
          toast.success('Client updated successfully!');
          resolve({ ...clients[index] });
        } else {
          const error = new Error(`Client with ID ${id} not found`);
          toast.error('Failed to update client');
          reject(error);
        }
      }, 500);
    });
  },

  // Delete client
  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = clients.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          const deletedClient = clients.splice(index, 1)[0];
          toast.success('Client deleted successfully!');
          resolve(deletedClient);
        } else {
          const error = new Error(`Client with ID ${id} not found`);
          toast.error('Failed to delete client');
          reject(error);
        }
      }, 500);
    });
  },

  // Update activity status
  updateActivityStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const client = clients.find(c => c.Id === parseInt(id));
        if (client) {
          client.activityStatus = status;
          client.lastActivity = new Date().toISOString();
          toast.success(`Client status updated to ${status}`);
          resolve({ ...client });
        } else {
          const error = new Error(`Client with ID ${id} not found`);
          toast.error('Failed to update client status');
          reject(error);
        }
      }, 300);
    });
  },

  // Search clients
search: (query, filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredClients = [...clients];

        // Apply search query
        if (query) {
          const searchLower = query.toLowerCase();
          filteredClients = filteredClients.filter(client =>
            client.companyName.toLowerCase().includes(searchLower) ||
            client.industry.toLowerCase().includes(searchLower) ||
            client.contactPerson.toLowerCase().includes(searchLower)
          );
        }

        // Apply industry filter
        if (filters.industry && filters.industry !== 'all') {
          filteredClients = filteredClients.filter(client =>
            client.industry === filters.industry
          );
        }

        // Apply activity status filter
        if (filters.activityStatus && filters.activityStatus !== 'all') {
          filteredClients = filteredClients.filter(client =>
            client.activityStatus === filters.activityStatus
          );
        }

        // Apply budget range filter
        if (filters.budgetRange && filters.budgetRange !== 'all') {
          filteredClients = filteredClients.filter(client => {
            const revenue = client.totalRevenue || 0;
            switch (filters.budgetRange) {
              case 'Under $50k':
                return revenue < 50000;
              case '$50k - $100k':
                return revenue >= 50000 && revenue <= 100000;
              case '$100k - $250k':
                return revenue > 100000 && revenue <= 250000;
              case 'Over $250k':
                return revenue > 250000;
              default:
                return true;
            }
          });
        }

        resolve(filteredClients);
      }, 300);
    });
  },

  create: (clientData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Generate new ID
          const newId = Math.max(...clients.map(c => c.Id)) + 1;
          
          // Create new client with default values
          const newClient = {
            Id: newId,
            companyName: clientData.companyName,
            industry: clientData.industry,
            logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(clientData.companyName)}&size=100&background=random`,
            contactPerson: clientData.contactPerson,
            email: clientData.email,
            phone: clientData.phone,
            website: clientData.website || '',
            address: clientData.address || '',
            activityStatus: 'Active',
            lastActivity: new Date().toISOString(),
            projectsCount: 0,
            totalRevenue: 0,
            contractStatus: 'Active',
            notes: clientData.notes || '',
            budget: clientData.budget || '',
            communicationPreference: clientData.communicationPreference || 'Email',
            projectType: clientData.projectType || 'Fashion',
            priority: clientData.priority || 'Medium'
          };

          // Add to clients array
          clients.unshift(newClient);
          
          resolve(newClient);
        } catch (error) {
          reject(new Error('Failed to create client'));
        }
      }, 500);
    });
  }
};