export interface Contact {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phones?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phones: string[];
} 