import { createContext, useContext, useState } from 'react';

const ServiceContext = createContext(null);

export function ServiceProvider({ children }) {
  const [submissions, setSubmissions] = useState([]);
  const addSubmission = (floorId, values) =>
    setSubmissions((prev) => [...prev, { floorId, values }]);
  return (
    <ServiceContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </ServiceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useService = () => useContext(ServiceContext);
