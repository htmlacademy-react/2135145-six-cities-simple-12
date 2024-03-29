import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthStatus } from '../../const/auth-status';
import { AppRoute } from '../../const/routes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { redirectToRoute } from '../../store/action';
import { loginAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthData } from '../../types/auth-data';

function LoginPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [authData, setAuthData] = useState<AuthData>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if(authorizationStatus === AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }, [authorizationStatus, dispatch]);

  const handleChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthData({...authData, [evt.target.name]: evt.target.value});
  };

  const isFormValid = (): boolean => {
    if(authData.password?.length < 2
      || authData.password.search(/\d/) === -1
      || authData.password.search(/[a-zA-Z]/) === -1){
      return false;
    }
    return true;
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(isFormValid()) {
      dispatch(loginAction(authData));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  data-testid="email__input"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={authData.email}
                  required
                  onChange={handleChangeInputValue}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  data-testid="password__input"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={authData.password}
                  required
                  onChange={handleChangeInputValue}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
