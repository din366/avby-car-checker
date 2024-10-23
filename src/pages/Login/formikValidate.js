export const validate = async (values) => {
  const errors = {};

  if (!values.login && !values.password) {
    errors.login = 'Заполните поля для входа';
  } else {
    if (!values.login) {
      errors.login = 'Введите логин';
    }
    if (!values.password) {
      errors.password = 'Введите пароль';
    }
  }
  return errors;
};