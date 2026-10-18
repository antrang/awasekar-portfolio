import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

/* eslint-disable react-refresh/only-export-components */
export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading] = useState(false);
  const [, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading: () => {},
    setLoading,
  };

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      <div className="main-body">{children}</div>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
