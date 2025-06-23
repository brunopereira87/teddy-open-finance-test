export type User = {
  id?: number;
  name: string;
  salary: number;
  companyValuation: number;
  selected?: boolean;
}

export type UsersReponse = {
  clients: User[];
  currentPage: number;
  totalPages: number;
}