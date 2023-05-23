import useAsync from '../useAsync';
import * as activitiesDaysApi from '../../services/activitiesDaysApi';
import useToken from '../useToken';

export default function useActivitiesDays() {
  const token = useToken();

  const {
    data: activitiesDays,
    loading: activitiesDaysLoading,
    error: activitiesDaysError,
    act: getActivitiesDays,
  } = useAsync(() => activitiesDaysApi.getActivitiesDays(token));

  return {
    activitiesDays,
    activitiesDaysLoading,
    activitiesDaysError,
    getActivitiesDays,
  };
}
