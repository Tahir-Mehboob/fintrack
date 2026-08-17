import { TransactionType } from './category.model';

export interface TransactionRequest {
  categoryId: number;
  amount: number;
  description: string;
  transactionDate: string; // ISO format: yyyy-MM-dd
  type: TransactionType;
}

export interface TransactionResponse {
  id: number;
  categoryName: string;
  amount: number;
  description: string;
  transactionDate: string;
  type: TransactionType;
}