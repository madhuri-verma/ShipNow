export interface QuoteState {
  fromPostal: any;
  toPostal: any;
  fromCity?: string;
  fromProvince?: string;
  fromCountry?: string;
  packageWeight?: string;
  packageUnit?: string;
  toCity?: string;
  toProvince?: string;
  toCountry?: string;
  insuranceAmount?: string;
  currency?: string;
  agreeTerms?: boolean;
  weight?: string;
  unit?: string;
}

export interface Quote {
  quotes: QuoteState;
  error: string;
  success: string;
}
