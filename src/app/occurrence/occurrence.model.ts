 export interface Occurrence {
  _id?: string;
  user_id?: string;
  ocurred_at?: any; //timestamp
  description?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: number;
  complement?: string;
  anonymous?: boolean;
  type?: string;
}

