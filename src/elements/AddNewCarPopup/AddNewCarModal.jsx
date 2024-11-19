import styles from "./AddNewCarModal.module.scss";
import {useFormik} from "formik";
import {validateAddNewCar} from "./formikValidate.js";
import {addNewCarError, addNewCarIsLoading, sendRequestForCreateNewCar} from "../../store/addNewCarSlice.js";
import {useDispatch, useSelector} from "react-redux";
import blackCloseIcon from './../../assets/close-icon/close-icon-black.png';
import whiteCloseIcon from './../../assets/close-icon/close-icon-white.png';
import {useTheme} from "../../hooks/ThemeContext.jsx";

const AddNewCarModal = ({modalIsShow, setModalIsShow}) => {
  const loading = useSelector(addNewCarIsLoading);
  const sendError = useSelector(addNewCarError);
  const dispatch = useDispatch();
  const {theme} = useTheme();

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const errors = await validateAddNewCar(values);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
      } else {
        await dispatch(sendRequestForCreateNewCar(values.url));
        setModalIsShow(false);
      }
      setSubmitting(false);
    },
  })

  return (
    <div className={`${styles.addCarModalWrapper} ${modalIsShow && styles.addCarModalWrapperActive}`} onClick={() => {setModalIsShow(false)}}>
      <div className={styles.addCarModalBlock} onClick={(e) => {
        e.stopPropagation()
      }}>
        <span className={styles.addCarModalTitle}>Добавить новый автомобиль</span>
        <span className={styles.addCarModalText}>Ссылку необходимо скопировать из адресной строки браузера после выставления всех интересующих параметров авто. Ссылка должна иметь следующий вид: "https://cars.av.by/filter?параметры_поиска"</span>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="url">Ссылка av.by</label>
          <input
            id="url"
            name="url"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.url}
          />

          {formik.errors.url ? <div className={styles.errorBlock}>{formik.errors.url}</div> : null}
          {sendError ? <div className={styles.errorBlock}>{sendError}</div> : null}

          <button type='submit' disabled={loading}>Добавить автомобиль</button>
        </form>

        <div className={styles.closeIcon}><img src={theme === 'dark' ? whiteCloseIcon : blackCloseIcon} onClick={() => {
          setModalIsShow(false)
        }}/></div>
      </div>
    </div>
  );
};

export default AddNewCarModal;