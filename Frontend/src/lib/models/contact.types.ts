export default interface Contact {
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  selectedServices: string[];
  companyName?: string;
  companyWebsite?: string;
}
