export interface Country {
  error: boolean;
  msg:   string;
  data:  Datum[];
}

export interface Datum {
  iso2:    string;
  iso3:    string;
  country: string;
  cities:  string[];
}
