import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useAuth } from "../components/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { roomIdService } from "../service/roomIdService";

export const CreateRoom = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { createRoom, isChecked, roomId } = useAuth();

  if (isChecked && roomId) {
    return <Navigate to={ `/chat/${roomId}` } />;
  }

  return (
    <>
    <Formik
      initialValues={{
        name: '',
      }}
      validateOnMount={true}
      onSubmit={({ name }) => {
        console.log(name)
        return createRoom({name})
          .then(() => {
            const roomId = roomIdService.get("rommId")
            navigate(`/chat/${roomId}`);
          })
          .catch((error) => {
            setError(error.message);
          });
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="box">
          <h1 className="title">Create Room</h1>
          <div className='field'>
            <label htmlFor="firstName">Room name</label>
  
            <div className="control has-icons-left has-icons-right">
                  <Field
                    // validate={validateEmail}
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Name room"
                    className={cn('input', {
                      'is-danger': touched.userName && errors.userName,
                    })}
                  />
  
                  <span className="icon is-small is-left">
                    <i className="fa fa-ghost"></i>
                  </span>
  
                  {touched.userName && errors.userName && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
            </div>    
          </div>
          <div className="field">
            <button
              type="submit"
              className={cn('button is-success has-text-weight-bold', {
                'is-loading': isSubmitting,
              })}
              disabled={isSubmitting || !!errors.userName || !!errors.password}
            >
              Create
            </button>
          </div>
         </Form>
      )}
    </Formik>

    {error && <p className="notification is-danger is-light">{error}</p>}
  </>
  )
}