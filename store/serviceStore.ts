import { create } from "zustand";

interface ServiceProps {
  serviceId: string;
  name: string;
  description: string;
  price: number;
  time: string;
  active: boolean;
}

interface ServiceStore {
  services: ServiceProps[];
  fetchServices: () => Promise<void>;
  addService: (newService: ServiceProps) => Promise<void>;
}


const fetchServices = async (
  set: (partial: (state: ServiceStore) => Partial<ServiceStore>) => void
) => {
  try {
    const response = await fetch("/api/services");
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    set((state) => ({ ...state, services: data })); 
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  fetchServices: () => fetchServices(set),
  addService: async (newService) => {
    set((state) => ({
      ...state,
      services: [...state.services, newService],
    }));

    // Вызовем fetchServices для обновления списка
    await fetchServices(set);
  },
}));

export default useServiceStore;
