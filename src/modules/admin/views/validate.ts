export default {
  name: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length <= 200) || 'Имя не должно превышать более чем 200 символов',
  ],
};
