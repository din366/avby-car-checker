export const validateAddNewCar = async (values) => {
  const errors = {};

  if (!values.url) {
    errors.url = 'Заполните поле для ссылки';
  }

  if (!values.url.includes('https://cars.av.by/filter?')) {
    errors.url = 'Некорректная ссылка'
  } // ! обработка кривой ссылки
  return errors;
};