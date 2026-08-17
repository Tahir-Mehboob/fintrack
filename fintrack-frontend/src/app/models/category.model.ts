export type TransactionType = 'INCOME' | 'EXPENSE';

export interface CategoryRequest {
  name: string;
  type: TransactionType;
}

export interface CategoryResponse {
  id: number;
  name: string;
  type: TransactionType;
}