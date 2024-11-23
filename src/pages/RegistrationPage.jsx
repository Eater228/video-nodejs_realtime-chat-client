import React, { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import  {Link, Navigate} from 'react-router-dom'
import { authService } from '../service/authService';

export const RegistrationPage = () => {
  const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  function validateEmail(value) {
    if (!value) return 'Email is required';
    if (!EMAIL_PATTERN.test(value)) return 'Email is not valid';
  }
  
  function validatePassword(value) {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'At least 6 characters';
  }

  const [register, setRegister] = useState(false);

  if (register) {
    return <Navigate to="/login" />;
  }

  // if (register) {
  //   return (
  //     <section className="">
  //       <h1 className="title">Check your email</h1>
  //       <p>We have sent you an email with the activation link</p>
  //     </section>
  //   )
  // }


  return (
    <>
      <Formik
        initialValues={{
          userName: '',
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({userName, email, password}, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          authService
            .register(userName, email, password)
            .then(() => setRegister(true))
            .catch((error) => {
              console.log(error)
            })
            .finally(() => formikHelpers.setSubmitting(false))
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className='box'>
            <h1 className='titel'>Sing in</h1>
            <div className='field'>
              <label htmlFor="userName">User Name</label>
    
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
    
                    {touched.email && errors.email && (
                      <span className="icon is-small is-right has-text-danger">
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                    )}
              </div>    
            </div>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="bobsmith@gmail.com"
                  className={cn('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>

                {touched.email && errors.email && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
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
                disabled={isSubmitting || !!errors.email || !!errors.password}
              >
                Sign up
              </button>
            </div>
            Already have an account? <Link to="/login">Log in</Link>
          </Form>
        )}

      </Formik>
    </>
  );
};