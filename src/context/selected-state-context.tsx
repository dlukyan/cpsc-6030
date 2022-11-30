import React, { createContext, ReactNode, useContext, useState } from 'react'

export const SelectedStateContext = createContext(null)

export const SelectedStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedState, setSelectedState] = useState<string>('')

  const setSelected = (state: string) => setSelectedState(state)

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SelectedStateContext.Provider value={{ state: selectedState, setSelected }}>
      {children}
    </SelectedStateContext.Provider>
  )
}

export const useSelectedState = (): { state: string; setSelected: (state: string) => void } =>
  useContext(SelectedStateContext) as unknown as { state: string; setSelected: (state: string) => void }
