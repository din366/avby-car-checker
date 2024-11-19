export const validateAddNewCar = async (values) => {
  const errors = {};

  if (!values.url) {
    errors.url = 'Заполните поля для входа';
  }
  return errors;
};