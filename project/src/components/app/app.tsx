import { Route, Routes } from 'react-router-dom';
import { AuthStatus } from '../../const/auth-status';
import { AppRoute } from '../../const/routes';
import { useAppSelector } from '../../hooks/useAppSelector';
import LoginPage from '../../pages/login/login';
import MainPage from '../../pages/main/main';
import NotFoundPage from '../../pages/not_found/not_found';
import PropertyPage from '../../pages/property/property';
import { getDataLoadingStatus } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoading = useAppSelector(getDataLoadingStatus);

  if(authorizationStatus === AuthStatus.Unknown || isDataLoading) {
    return <LoadingScreen/>;
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage/>}/>
      <Route path={AppRoute.Login} element={<LoginPage/>}/>
      <Route path={AppRoute.Room} element={<PropertyPage/>}/>
      <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
