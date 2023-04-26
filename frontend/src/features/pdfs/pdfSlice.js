// features/pdf/pdfSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPdf: null,
}

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setSelectedPdf: (state, action) => {
      state.selectedPdf = action.payload
    },
    toggleSelectedPdf: (state, action) => {
      state.selectedPdf =
        state.selectedPdf === action.payload ? null : action.payload
    },
  },
})

export const { setSelectedPdf, toggleSelectedPdf } = pdfSlice.actions
export default pdfSlice.reducer
