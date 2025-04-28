// types/seller.ts

export interface FormData {
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  alternatePhone: string;
  gstin: string;
  panCard: string;
  legalBusinessName: string;
  displayName: string;
  storeDescription: string;
  logoUrl: string;
  websiteUrl: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  bankAccountNumber: string;
  bankIfscCode: string;
  bankAccountHolderName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface BusinessInfoFormData {
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  alternatePhone: string;
  gstin: string;
  panCard: string;
  legalBusinessName: string;
  displayName: string;
  storeDescription: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface AddressFormData {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
}

export interface AccountFormData {
  bankAccountNumber: '',
  bankIfscCode: '',
  bankAccountHolderName: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
}

export type SignupFormData = BusinessInfoFormData & AddressFormData & AccountFormData;

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface SellerData {
  business_name: string;
  business_type: string;
  email: string;
  phone: string;
  alternate_phone: string | null;
  gstin: string | null;
  pan_card: string;
  legal_business_name: string;
  display_name: string;
  store_description: string | null;
  logo_url: string | null;
  website_url: string | null;
  address: {
    address_line1: string;
    address_line2: string | null;
    landmark: string | null;
    pin_code: string;
    city: string;
    state: string;
    country: string;
  };
  bank_details: {
    account_number: string | null;
    ifsc_code: string | null;
    account_holder_name: string | null;
  };
  password: string;
}