import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@coreui/angular';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionResponse } from '../../../models/transaction.model';
import { TransactionForm } from '../../transactions/transaction-form/transaction-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GridModule, ButtonModule, TransactionForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  transactions = signal<TransactionResponse[]>([]);
  loading = signal(true);
  editingTransaction = signal<TransactionResponse | null>(null);

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading.set(true);
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load transactions', err);
        this.loading.set(false);
      }
    });
  }

  onFormSuccess(): void {
    this.editingTransaction.set(null);
    this.loadTransactions();
  }

  editTransaction(txn: TransactionResponse): void {
    this.editingTransaction.set(txn);
  }

  cancelEdit(): void {
    this.editingTransaction.set(null);
  }

  deleteTransaction(id: number): void {
    if (!confirm('Delete this transaction?')) {
      return;
    }
    this.transactionService.delete(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err) => {
        console.error('Failed to delete transaction', err);
        alert(err.error?.error || 'Failed to delete transaction');
      }
    });
  }
}