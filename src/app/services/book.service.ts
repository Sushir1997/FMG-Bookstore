import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/book/${bookId}`);
  }

  purchaseBook(bookId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/purchase/${bookId}`, {});
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/book`, book);
  }
}
