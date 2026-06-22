export interface Branch {
  id: number;
  tenantId: number;
  parentId: number | null;
  name: string;
  code: string;
  status: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  timezone: string;
  capacity: number;
  logoUrl: string;
  createdAt: string;
}

export interface BranchListResponse {
  success: boolean;
  message: string;
  data: Branch[] | null;
  errors: string[] | null;
}

// ─── Create branch ────────────────────────────────────────────────
export interface BranchPayload {
  tenantId: number;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  timezone: string;
  capacity: number;
  logoUrl: string;
}

export interface BranchCreateResponse {
  success: boolean;
  message: string;
  data: Branch | null;
  errors: string[] | null;
}
