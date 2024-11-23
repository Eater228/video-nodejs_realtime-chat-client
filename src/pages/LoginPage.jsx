import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';

// import { usePageError } from '../hooks/usePageError';


const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

function validateEmail(value) {
  if (!value) return 'Email is required';
  if (!EMAIL_PATTERN.test(value)) return 'Email is not valid';
}

function validatePassword(value) {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'At least 6 characters';
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const { login, isChecked, currentUser } = useAuth();

  if (isChecked && currentUser) {
    return <Navigate to="/room" />;
  }

  return (
    <>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ userName, password }) => {
          return login(userName, password)
            .then(() => {
              const state = location.state;
              console.log(location)
              navigate(state.from?.pathname ?? '/');
            })
            .catch((error) => {
              setError(error);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Log in</h1>
            <div className='field'>
              <label htmlFor="firstName">User Name</label>
    
              <div className="control has-icons-left has-icons-right">
                    <Field
                      // validate={validateEmail}
                      name="userName"
                      type="text"
                      id="userName"
                      placeholder="User name"
                      className={cn('input', {
                        'is-danger': touched.userName && errors.userName,
                      })}
                    />
    
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
    
                    {touched.userName && errors.userName && (
                      <span className="icon is-small is-right has-text-danger">
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                    )}
              </div>    
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                  className={cn('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>

                {touched.password && errors.password && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className="help is-danger">{errors.password}</p>
              ) : (
                <p className="help">At least 6 characters</p>
              )}
            </div>
            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || !!errors.userName || !!errors.password}
              >
                Log in
              </button>
            </div>
            Do not have an account? <Link to="/sign-up">Sign up</Link>
          </Form>
        )}
      </Formik>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </>
  );
};
