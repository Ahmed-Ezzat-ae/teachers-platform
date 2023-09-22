import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slices/teacherRegister';
import loginSlice from './slices/teacherLogin';
import groupsSlice from './slices/gruopsSlice';
import levelOneSlice from './slices/groupsLevels/groupsLevel1';
import levelTwoSlice from './slices/groupsLevels/groupsLevel2';
import levelThreeSlice from './slices/groupsLevels/groupsLevel3';
import groupDetailsSlice from './slices/groupDetails';
import uploadSlice from './slices/uploads/uploadSlice';
import groupUploadsSlice from './slices/uploads/groupUploads';
import availableGroupSlice from './slices/availableGroups';
import profileSlice from './slices/profile';
import resetPasswordSlice from './slices/resetPassword';
import contentSlice from "./slices/content"

const store = configureStore({
  reducer: {
    teacherRegister: registerSlice,
    teacherLogin: loginSlice,
    group: groupsSlice,
    levelOneSlice,
    levelTwoSlice,
    levelThreeSlice,
    groupDetails: groupDetailsSlice,
    uploadSlice,
    groupUploads: groupUploadsSlice,
    availableGroups: availableGroupSlice,
    profile: profileSlice,
    resetPasswordSlice,
    contentSlice
  },
});

export default store;
