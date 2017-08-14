import { createSelector } from 'reselect';

const selectTestPage = state => state.get('page-test');

const makeSelectPageName = () =>
  createSelector(selectTestPage, testPageState =>
    testPageState.get('pageName')
  );

export { selectTestPage, makeSelectPageName };
