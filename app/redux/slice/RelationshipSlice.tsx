import {createSlice} from '@reduxjs/toolkit';
import {relationshipService} from '../service/RelationshipService';

const initialState = {
  samyakDetailsRelationshipPost: [],
};

export const relationshipSlice = createSlice({
  name: 'relationship',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      relationshipService.endpoints.samyakRelationshipPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsRelationshipPost = payload;
        console.log('relationshipPayload?????????', payload);
      },
    );
  },
});

export const {} = relationshipSlice.actions;

export default relationshipSlice.reducer;
