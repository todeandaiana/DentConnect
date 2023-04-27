import { AbstractControl, FormGroup, Validator, ValidatorFn } from '@angular/forms';


export function ValidatePhone(prefix: string): ValidatorFn {
    const phoneRegex = new RegExp(`^${prefix}\\d{8}$`); // regex pentru a verifica structura numărului de telefon
  
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!phoneRegex.test(value) && value != null) {
        return { invalidPhone: true }; // numărul de telefon nu respectă structura dorită
      }
      return null; // numărul de telefon este valid
    };
  }

  export function ValidateName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const name = control.value as string;
  
      // Verificați dacă numele începe cu literă mare și conține minimum 2 cuvinte
      const regex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
      const isValid = regex.test(name);
  
      // Returnați obiectul de eroare dacă validatorul nu este respectat
      return isValid ? null : { invalidName: { value: control.value } };
    };
  }

  export function ValidateHour() : ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hour = control.value as string;

      const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; // regex pentru a verifica structura orei
      const isValid = regex.test(hour);

      return isValid ? null : { invalidHour: { value: control.value } };
  }
}

  export function ValidatePassword() : ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value as string;

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/; // regex pentru a verifica structura parolei
      //Minimum five characters, at least one uppercase letter, one lowercase letter, one number and one special character
      const isValid = regex.test(password);

      return isValid ? null : { invalidPassword: { value: control.value } };
  }
  }



