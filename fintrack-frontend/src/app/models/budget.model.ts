export interface BudgetRequest {
  categoryId: number;
  monthlyLimit: number;
  month: number;
  year: number;
}

export interface BudgetResponse {
  id: number;
  categoryName: string;
  monthlyLimit: number;
  month: number;
  year: number;
  spentSoFar: number;
}