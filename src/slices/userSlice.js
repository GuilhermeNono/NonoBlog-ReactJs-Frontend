import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//Get user details
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const dataP = await userService.profile(user, token);

    return dataP;
  }
); 

export const updateProfile = createAsyncThunk("user/update", async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    // Check for errors
    if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
})

//Get user Details
export const getUserDetails = createAsyncThunk("user/get", 
async (id, thunkAPI) => {
    const data = await userService.getUserDetails(id);

    return data
})

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(profile.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        }).addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.error = null;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso!"
        }).addCase(updateProfile.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false
            state.user = {}
        }).addCase(getUserDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getUserDetails.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        })
    }
})

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;