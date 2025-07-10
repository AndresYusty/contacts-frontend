import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Contact, ContactFormData } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() contact: Contact | null = null;
  @Output() contactSaved = new EventEmitter<Contact>();
  @Output() cancelled = new EventEmitter<void>();

  contactForm!: FormGroup;
  loading = false;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.contact) {
      this.populateForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([])
    });

    // Add initial phone field
    this.addPhone();
  }

  private populateForm(): void {
    if (this.contact) {
      this.contactForm.patchValue({
        first_name: this.contact.first_name,
        last_name: this.contact.last_name,
        email: this.contact.email
      });

      // Clear existing phones and add the contact's phones
      this.phones.clear();
      if (this.contact.phones && this.contact.phones.length > 0) {
        this.contact.phones.forEach(phone => {
          this.phones.push(this.fb.control(phone, [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]));
        });
      } else {
        this.addPhone();
      }
    }
  }

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  addPhone(): void {
    const phoneControl = this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)
    ]);
    this.phones.push(phoneControl);
  }

  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      this.error = '';

      const formData: ContactFormData = {
        ...this.contactForm.value,
        phones: this.contactForm.value.phones.filter((phone: string) => phone.trim() !== '')
      };

      const operation = this.contact 
        ? this.contactService.updateContact(this.contact.id!, formData)
        : this.contactService.createContact(formData);

      operation.pipe(takeUntil(this.destroy$)).subscribe({
        next: (contact) => {
          this.loading = false;
          this.contactSaved.emit(contact);
        },
        error: (error) => {
          this.loading = false;
          this.error = this.contact 
            ? 'Error al actualizar el contacto'
            : 'Error al crear el contacto';
          console.error('Form submission error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched();
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['email']) {
        return 'Ingrese un email válido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['maxlength']) {
        return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        return 'Formato inválido';
      }
    }
    return '';
  }

  isPhoneInvalid(index: number): boolean {
    const phoneControl = this.phones.at(index);
    return !!(phoneControl && phoneControl.invalid && phoneControl.touched);
  }

  getPhoneError(index: number): string {
    const phoneControl = this.phones.at(index);
    if (phoneControl && phoneControl.errors && phoneControl.touched) {
      if (phoneControl.errors['required']) {
        return 'Número de teléfono requerido';
      }
      if (phoneControl.errors['pattern']) {
        return 'Formato de teléfono inválido';
      }
    }
    return '';
  }
} 