import React, { createContext, useState, useContext, useEffect } from 'react';

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

const initialCompanies = [
  { id: 'comp-1', name: 'Empresa Principal S.A.' },
  { id: 'comp-2', name: 'Sucursal Secundaria Ltda.' },
];

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [activeCompanyId, setActiveCompanyId] = useState(() => {
    return localStorage.getItem('activeCompanyId') || initialCompanies[0].id;
  });

  useEffect(() => {
    localStorage.setItem('activeCompanyId', activeCompanyId);
  }, [activeCompanyId]);

  const activeCompany = companies.find(c => c.id === activeCompanyId);

  const value = {
    companies,
    activeCompany,
    activeCompanyId,
    setActiveCompany: setActiveCompanyId,
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};