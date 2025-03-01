import { createSlice } from '@reduxjs/toolkit'


export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    navigation: {
      sidePanel: 'text',
    },
    fileName: 'Untitled Design',
  },
  reducers: {
    setSidePanel: (state, action) => {
      state.navigation.sidePanel = action.payload
    },
    setFileName: (state, action) => {
      state.fileName = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSidePanel, setFileName } = preferencesSlice.actions

export default preferencesSlice.reducer