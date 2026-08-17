import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetRequest, BudgetResponse } from '../../models/budget.model';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private apiUrl = 'http://localhost:8080/api/budgets';

  constructor(private http: HttpClient) {}

  getByMonth(month: number, year: number): Observable<BudgetResponse[]> {
    return this.http.get<BudgetResponse[]>(this.apiUrl, {
      params: { month: month.toString(), year: year.toString() }
    });
  }

  create(request: BudgetRequest): Observable<BudgetResponse> {
    return this.http.post<BudgetResponse>(this.apiUrl, request);
  }
}