import React, { Dispatch, SetStateAction, useState } from "react";

export const AppContext = React.createContext<AppContext>({
  appData: {
    meetingId: null,
    mode: null,
  },
  setAppData: () => {},
});

export interface AppData {
  meetingId: string | null;
  mode: string | null;
}

export interface AppContext {
  appData: AppData;
  setAppData: Dispatch<SetStateAction<AppData>>;
}

export const useAppData = (): AppContext => {
  return React.useContext(AppContext);
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appData, setAppData] = useState<AppData>({
    meetingId: null,
    mode: null,
  });

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
