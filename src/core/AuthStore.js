import { createSlice } from '@reduxjs/toolkit';

const authStore = createSlice({
    name: 'auth',
    initialState: {
        role: '',
        isModalOpen: false,
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
            console.log("role ", state.role)
        },
        showModal: (state) => {
            console.log("aaaaaaaaaaaaaaaaa",showModal)
            state.isModalOpen = true;
        },
        hideModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { setRole, showModal, hideModal } = authStore.actions;
export default authStore.reducer;
