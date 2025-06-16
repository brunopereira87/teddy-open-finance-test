export type User = {
  name: string;
  salary: number;
  companyValuation: number;
}

export type UsersReponse = {
  clients: User[];
  currentPage: number;
  totalPages: number;
}