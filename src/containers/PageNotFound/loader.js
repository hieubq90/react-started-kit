import { errorLoading } from '../../utils/asyncInjectors';

export default () => cb => {
  import('./index').then(cb).catch(errorLoading);
};
