import navigationData from "@/services/mockData/navigation.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let navigation = [...navigationData];

export const navigationService = {
  async getAll() {
    await delay(100);
    return [...navigation];
  },

  async getById(id) {
    await delay(50);
    const item = navigation.find(n => n.Id === parseInt(id));
    if (!item) {
      throw new Error("Navigation item not found");
    }
    return { ...item };
  },

  async updateActive(activePath) {
    await delay(50);
    navigation = navigation.map(item => ({
      ...item,
      isActive: item.path === activePath
    }));
    return [...navigation];
  }
};