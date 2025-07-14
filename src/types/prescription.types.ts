// src/types/prescription.types.ts

export interface PrescriptionState {
    prescriptions: Prescription[];
    currentPrescription: Prescription | null;
    isLoading: boolean;
    error: string | null;
    stats: PrescriptionStats | null;
    meta: PaginationMeta | null;
  }
  
  export interface PaginationMeta {
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
  }
  
  export interface Prescription {
    id: string;
    prescriptionNumber: string;
    userId?: string | null;
    sessionId?: string | null;
    url: string;
    status: "pending" | "approved" | "rejected" | "in progress" | "delivered";
    
    // Contact details
    email?: string | null;
    phone?: string | null;
    fullName: string;
    preferredContactMethod?: "email" | "phone" | "sms";
    
    // Delivery details
    address: string;
    city: string;
    state?: string | null;
    postalCode?: string | null;
    country?: string;
    addressNotes?: string | null;
    
    notes?: string | null;
    verifiedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    
    // Associated user info that might come from DB joins
    user?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    verifier?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
  
  export interface CreatePrescriptionPayload {
    url: string;
    fullName: string;
    email?: string;
    phone?: string;
    preferredContactMethod?: "email" | "phone" | "sms";
    address: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
    addressNotes?: string;
    notes?: string;
    sessionId?: string;
  }
  
  export interface UpdatePrescriptionPayload {
    status: "pending" | "approved" | "rejected" | "in progress" | "delivered";
    notes?: string;
  }
  
  export interface PrescriptionFilterParams {
    status?: string;
    city?: string;
    search?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
    offset?: number;
  }
  
  export interface PrescriptionStats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    inProgress: number;
    delivered: number;
    todayNew: number;
    thisWeekNew: number;
    thisMonthNew: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    meta?: PaginationMeta;
  }