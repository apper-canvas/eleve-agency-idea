import modelsData from "@/services/mockData/models.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let models = [...modelsData];

export const modelService = {
  async getAll() {
    await delay(300);
    return [...models];
  },

  async getById(id) {
    await delay(200);
    const model = models.find(m => m.Id === parseInt(id));
    if (!model) {
      throw new Error("Model not found");
    }
    return { ...model };
  },

  async create(modelData) {
    await delay(400);
    const newId = Math.max(...models.map(m => m.Id)) + 1;
    const newModel = {
      ...modelData,
      Id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    models.push(newModel);
    return { ...newModel };
  },

  async update(id, modelData) {
    await delay(350);
    const index = models.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Model not found");
    }
    
    models[index] = {
      ...models[index],
      ...modelData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...models[index] };
  },

  async delete(id) {
    await delay(250);
    const index = models.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Model not found");
    }
    
    models.splice(index, 1);
    return true;
  },

  async search(query, filters = {}) {
    await delay(300);
    let filtered = [...models];

    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(model => 
        model.firstName.toLowerCase().includes(searchTerm) ||
        model.lastName.toLowerCase().includes(searchTerm) ||
        model.categories.some(cat => cat.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.availability && filters.availability !== "All") {
      filtered = filtered.filter(model => model.availability === filters.availability);
    }

    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(model => model.categories.includes(filters.category));
    }

    if (filters.experience && filters.experience !== "All") {
      filtered = filtered.filter(model => model.experience === filters.experience);
    }

    return filtered;
  }
};