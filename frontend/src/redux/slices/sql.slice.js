import { createSlice } from '@reduxjs/toolkit';

const sqlSlice = createSlice({
  name: 'sql',
  initialState: {
    createUserRoles: [],
    createRoleRoles: [],
  },
  reducers: {
    setGrantedRoles(state, action) {
      const { roleName, columnVal, isUser } = action.payload;
      const { key, value } = columnVal;

      const list = isUser ? state.createUserRoles : state.createRoleRoles;
      const index = list.findIndex((item) => item.roleName === roleName);

      if (index === -1) {
        let newRow = {
          roleName,
          granted: false,
          admin: false,
          default: false,
        };
        newRow[key] = value;
        if (isUser) state.createUserRoles.push(newRow);
        else state.createRoleRoles.push(newRow);
      } else {
        if (isUser) state.createUserRoles[index][key] = value;
        else state.createRoleRoles[index][key] = value;
      }
    },
    resetGrantedRoles(state, action) {
      const { isUser } = action.payload;
      if (isUser) state.createUserRoles = [];
      else state.createRoleRoles = [];
    },
  },
});

const { reducer, actions } = sqlSlice;
export const { setGrantedRoles, resetGrantedRoles } = actions;
export default reducer;
