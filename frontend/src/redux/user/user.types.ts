export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: {
    name: string;
    description: string;
    editable: boolean;
    permissions: {
      name: string;
    }[];
  };
  permissions: {
    name: string;
  }[];
  shifts: {
    id: string;
    startTime: string;
    endTime: string;
    notes: string;
  }[];
};
