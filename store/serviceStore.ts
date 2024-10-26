import { create } from "zustand";

export interface ServiceProps {
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
  deleteService: (serviceId: string) => Promise<void>; // Добавлено
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
  deleteService: async (serviceId) => {
    try {
      await fetch(`/api/services/${serviceId}`, { method: "DELETE" }); // Удаление услуги с API
      set((state) => ({
        services: state.services.filter(
          (service) => service.serviceId !== serviceId
        ), // Удаление услуги из состояния
      }));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  },
}));

export default useServiceStore;
