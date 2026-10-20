'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CandidateInfo,
  ManifestoPillar,
  PromiseItem,
  Grievance,
  EmergencyContact,
  BloodDonor,
  BudgetItem,
  AgricultureInfo,
  initialCandidateInfo,
  initialManifestoPillars,
  initialPromises,
  initialGrievances,
  initialEmergencyContacts,
  initialBloodDonors,
  initialBudget,
  initialAgriculture
} from '@/data/initialData';

interface DataContextType {
  candidate: CandidateInfo;
  manifesto: ManifestoPillar[];
  promises: PromiseItem[];
  grievances: Grievance[];
  emergencyContacts: EmergencyContact[];
  bloodDonors: BloodDonor[];
  budget: BudgetItem;
  agriculture: AgricultureInfo;
  
  // Actions for Citizen & Admin
  updatePromise: (id: string, updated: Partial<PromiseItem>) => void;
  addPromise: (item: Omit<PromiseItem, 'id'>) => void;
  deletePromise: (id: string) => void;
  
  addGrievance: (item: Omit<Grievance, 'id' | 'trackingCode' | 'submittedAt' | 'status'>) => string;
  updateGrievanceStatus: (id: string, status: Grievance['status'], adminResponse?: string) => void;
  
  updateCandidateInfo: (info: Partial<CandidateInfo>) => void;
  pledgeSupport: () => void;
  
  addBloodDonor: (donor: Omit<BloodDonor, 'id'>) => void;
  updateBudget: (budget: BudgetItem) => void;
  
  resetAllData: () => void;
  isLoaded: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'amr_jugikhali_';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidate, setCandidate] = useState<CandidateInfo>(initialCandidateInfo);
  const [manifesto] = useState<ManifestoPillar[]>(initialManifestoPillars);
  const [promises, setPromises] = useState<PromiseItem[]>(initialPromises);
  const [grievances, setGrievances] = useState<Grievance[]>(initialGrievances);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(initialEmergencyContacts);
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(initialBloodDonors);
  const [budget, setBudget] = useState<BudgetItem>(initialBudget);
  const [agriculture] = useState<AgricultureInfo>(initialAgriculture);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCandidate = localStorage.getItem(`${STORAGE_KEY_PREFIX}candidate`);
      if (savedCandidate) {
        const parsed = JSON.parse(savedCandidate);
        setCandidate({
          ...initialCandidateInfo,
          ...parsed,
          phone: (!parsed.phone || parsed.phone.includes("1712-345678")) ? initialCandidateInfo.phone : parsed.phone,
          email: (!parsed.email || parsed.email.includes("latif-jugikhali.org")) ? initialCandidateInfo.email : parsed.email,
        });
      }

      const savedPromises = localStorage.getItem(`${STORAGE_KEY_PREFIX}promises`);
      if (savedPromises) setPromises(JSON.parse(savedPromises));

      const savedGrievances = localStorage.getItem(`${STORAGE_KEY_PREFIX}grievances`);
      if (savedGrievances) setGrievances(JSON.parse(savedGrievances));

      const savedEmergency = localStorage.getItem(`${STORAGE_KEY_PREFIX}emergency`);
      if (savedEmergency) {
        const parsed = JSON.parse(savedEmergency);
        // Ensure helpline contact is updated if old dummy was saved
        setEmergencyContacts(parsed.map((item: EmergencyContact) => 
          item.id === 'e4' && item.phone.includes("01700-112233")
            ? { ...item, phone: initialCandidateInfo.phone }
            : item
        ));
      }

      const savedDonors = localStorage.getItem(`${STORAGE_KEY_PREFIX}donors`);
      if (savedDonors) setBloodDonors(JSON.parse(savedDonors));

      const savedBudget = localStorage.getItem(`${STORAGE_KEY_PREFIX}budget`);
      if (savedBudget) setBudget(JSON.parse(savedBudget));
    } catch (e) {
      console.warn("Storage load error, using initial dataset", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const saveItem = (key: string, value: unknown) => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(value));
    } catch (e) {
      console.error("Storage save error", e);
    }
  };

  const updatePromise = (id: string, updated: Partial<PromiseItem>) => {
    setPromises(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updated } : p);
      saveItem('promises', next);
      return next;
    });
  };

  const addPromise = (item: Omit<PromiseItem, 'id'>) => {
    const newItem: PromiseItem = {
      ...item,
      id: `p_${Date.now()}`
    };
    setPromises(prev => {
      const next = [newItem, ...prev];
      saveItem('promises', next);
      return next;
    });
  };

  const deletePromise = (id: string) => {
    setPromises(prev => {
      const next = prev.filter(p => p.id !== id);
      saveItem('promises', next);
      return next;
    });
  };

  const addGrievance = (item: Omit<Grievance, 'id' | 'trackingCode' | 'submittedAt' | 'status'>) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `JUG-2026-${randomNum}`;
    const today = new Intl.DateTimeFormat('bn-BD', { dateStyle: 'long' }).format(new Date());

    const newGrievance: Grievance = {
      ...item,
      id: `g_${Date.now()}`,
      trackingCode,
      status: 'অপেক্ষমাণ (Pending)',
      submittedAt: today,
      adminResponse: 'আপনার অভিযোগটি সংরক্ষিত হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি তদন্ত শুরু করবেন।'
    };

    setGrievances(prev => {
      const next = [newGrievance, ...prev];
      saveItem('grievances', next);
      return next;
    });

    return trackingCode;
  };

  const updateGrievanceStatus = (id: string, status: Grievance['status'], adminResponse?: string) => {
    setGrievances(prev => {
      const next = prev.map(g => {
        if (g.id === id) {
          return {
            ...g,
            status,
            adminResponse: adminResponse || g.adminResponse
          };
        }
        return g;
      });
      saveItem('grievances', next);
      return next;
    });
  };

  const updateCandidateInfo = (info: Partial<CandidateInfo>) => {
    setCandidate(prev => {
      const next = { ...prev, ...info };
      saveItem('candidate', next);
      return next;
    });
  };

  const pledgeSupport = () => {
    setCandidate(prev => {
      const next = { ...prev, totalSupporters: prev.totalSupporters + 1 };
      saveItem('candidate', next);
      return next;
    });
  };

  const addBloodDonor = (donor: Omit<BloodDonor, 'id'>) => {
    const newDonor: BloodDonor = {
      ...donor,
      id: `b_${Date.now()}`
    };
    setBloodDonors(prev => {
      const next = [newDonor, ...prev];
      saveItem('donors', next);
      return next;
    });
  };

  const updateBudget = (newBudget: BudgetItem) => {
    setBudget(newBudget);
    saveItem('budget', newBudget);
  };

  const resetAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      setCandidate(initialCandidateInfo);
      setPromises(initialPromises);
      setGrievances(initialGrievances);
      setEmergencyContacts(initialEmergencyContacts);
      setBloodDonors(initialBloodDonors);
      setBudget(initialBudget);
    }
  };

  return (
    <DataContext.Provider
      value={{
        candidate,
        manifesto,
        promises,
        grievances,
        emergencyContacts,
        bloodDonors,
        budget,
        agriculture,
        updatePromise,
        addPromise,
        deletePromise,
        addGrievance,
        updateGrievanceStatus,
        updateCandidateInfo,
        pledgeSupport,
        addBloodDonor,
        updateBudget,
        resetAllData,
        isLoaded
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
