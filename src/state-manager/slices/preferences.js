import { createSlice } from '@reduxjs/toolkit'


export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    navigation: {
      sidePanel: 'text',
    },
    fileName: 'Untitled Design',
    loadStore: null
  },
  reducers: {
    setSidePanel: (state, action) => {
      state.navigation.sidePanel = action.payload
    },
    setFileName: (state, action) => {
      state.fileName = action.payload
    },
    setLoadStore: (state, action) => {  
      state.loadStore = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setSidePanel, setFileName, setLoadStore } = preferencesSlice.actions

export default preferencesSlice.reducer