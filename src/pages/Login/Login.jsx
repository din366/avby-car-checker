import {useDispatch, useSelector} from "react-redux";
import {useResize} from "../../hooks/useResize.js";
import {useFormik} from "formik";
import {validate} from "./formikValidate.js";
import {getErrorData, getLoading, sendLoginRequest} from "../../store/loginSlice.js";
import styles from './Login.module.scss';
import {useLogged} from "../../features/useLogged.js";

const Login = () => {
  useLogged(true);
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const sendError = useSelector(getErrorData);
  const resize = useResize();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const errors = await validate(values);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        await dispatch(sendLoginRequest(values));
      }
      setSubmitting(false);
    },
  })

  return (
    <div className='mainBlockWrapper'>
      <div className="container">
        <div className={styles.formBlockWrapper}>
          <div className={styles.formBlock}>
            <h2 className={styles.formTitle}>Вход в аккаунт</h2>

            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="login">Login</label>
              <input
                id="login"
                name="login"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.login}
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              {formik.errors.login ? <div className={styles.errorBlock}>{formik.errors.login}</div> : null}
              {formik.errors.password ? <div className={styles.errorBlock}>{formik.errors.password}</div> : null}
              {sendError ? <div className={styles.errorBlock}>{sendError}</div> : null}

              <button type='submit' disabled={loading}>Вход</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;