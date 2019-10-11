/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

export const uidSelector = createSelector(
  (state) => state.auth,
  (auth) => auth.uid || '',
);
