export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
}

export interface Asset {
  id: string;
  name: string;
  tag: string;
  type: 'hardware' | 'software' | 'furniture' | 'other';
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  status: 'active' | 'maintenance' | 'disposed' | 'borrowed' | 'moving';
  location: string;
  branchOffice: string;
  assignedTo?: string;
  nextMaintenanceDate?: string;
  maintenanceInterval: 'monthly' | 'quarterly' | 'biannual' | 'annual';
  lastMaintenanceDate?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  maintenanceHistory: MaintenanceRecord[];
  depreciationRate: number;
  specifications?: Record<string, string>;
  warranty?: {
    provider: string;
    expiryDate: string;
    terms: string;
  };
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection';
  description: string;
  cost: number;
  technician: string;
  findings: string;
  nextActionDate: string;
  status: 'completed' | 'scheduled' | 'overdue';
}

export interface License {
  id: string;
  name: string;
  type: string;
  expiryDate: string;
  seats: number;
  usedSeats: number;
  cost: number;
  vendor: string;
  branchOffice: string;
}

export interface BranchOffice {
  id: string;
  name: string;
  location: string;
  assetCount: number;
}

export interface AssetRequest {
  id: string;
  type: 'borrow' | 'move';
  assetId: string;
  requesterId: string;
  requesterName: string;
  requesterDepartment: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  purpose: string;
  duration?: {
    startDate: string;
    endDate: string;
  };
  destination?: string;
  approvers: {
    id: string;
    name: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    comment?: string;
    date?: string;
  }[];
}