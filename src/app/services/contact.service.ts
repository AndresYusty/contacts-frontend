import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Contact, ContactFormData } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;
  private localStorageKey = 'contacts';

  constructor(private http: HttpClient) {}

  // Get all contacts from API
  getContacts(): Observable<Contact[]> {
    console.log('🔗 Intentando conectar con:', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(contacts => {
        // Adaptar phones: de array de objetos a array de strings
        const adapted = contacts.map(contact => ({
          ...contact,
          phones: contact.phones
            ? contact.phones.map((p: any) => typeof p === 'string' ? p : p.phone_number)
            : []
        }));
        console.log('✅ Datos adaptados del backend:', adapted);
        return adapted;
      })
    );
  }

  // Create new contact
  createContact(contactData: ContactFormData): Observable<Contact> {
    console.log('📤 Enviando datos al backend:', contactData);
    return this.http.post<Contact>(this.apiUrl, contactData).pipe(
      map(contact => ({
        ...contact,
        phones: contact.phones
          ? contact.phones.map((p: any) => typeof p === 'string' ? p : p.phone_number)
          : []
      }))
    );
  }

  // Update existing contact
  updateContact(id: number, contactData: ContactFormData): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contactData).pipe(
      map(contact => ({
        ...contact,
        phones: contact.phones
          ? contact.phones.map((p: any) => typeof p === 'string' ? p : p.phone_number)
          : []
      }))
    );
  }

  // Delete contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get contact by ID
  getContactById(id: number): Observable<Contact | null> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }
} 