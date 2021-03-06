export default {
  fullName: [
    (v: any) => !!v || 'Выберите клиента',
  ],
  firstName: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length <= 15) || 'Имя не должно превышать более чем 15 символов',
  ],
  lastName: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length <= 15) || 'Фамилия не должна превышать более чем 15 символов',
  ],
  password: [
    (v: any) => !!v || 'Заполните поле',
  ],
  email: [
    (v: any) => !!v || 'Заполните поле',
    (v: string) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Введите email корректно',

  ],
  role: [
    (v: any) => !!v || 'Выберите роль',
  ],
  supplier: [
    (v: any) => !!v || 'Заполните поле',
  ],
  phone: [
    (v: any) => !!v || 'Заполните поле',
    (v: string) => /^\s?(\+?\s?7|8)([- ()]*\d){10}$/.test(v) && (v && v.length <= 12) || 'Введите номер ' +
      'телефона корректно',
  ],
  city: [(v: any) => !!v || 'Выберите город'],
  profiles: [(v: any) => !!v || 'Выберите профиль'],
  droneModel: [(v: any) => !!v || 'Выберите модель'],
  droneName: [(v: any) => !!v || 'Заполните имя вашего дрона'],
  packageType: [(v: any) => !!v || 'Выберите тип'],
  fullAddress: [(v: any) => !!v || 'Выберите адрес'],
  name: [
    (v: any) => !!v || 'Заполните поле',
    (v: string) => /[а-яА-ЯёЁa-zA-Z ,.-]+[0-9]+.*/.test(v) || 'Введите улицу и номер дома',
  ],
  date: [
    (v: any) => !!v || 'Выберите дату',
  ],
  droneBattery: [
    (v: any) => !!v || 'Заполните поле',
    (v: string) => /^\-?(([1-9]\d*)|0)(\.\d+)?$/.test(v) || 'Емкость аккумулятора должна быть дробным числом',
  ],
  width: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length <= 15) || 'Ширина не должна превышать более чем 15 символов',
  ],
  height: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length <= 15) || 'Высота не должна превышать более чем 15 символов',
  ],
  length: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length <= 15) || 'Длина не должна превышать более чем 15 символов',
  ],
  weight: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length <= 15) || 'Вес не должен превышать более чем 15 символов',
  ],
  type: [
    (v: any) => !!v || 'Выберите тип',
    (v: string) => /.*?[^0-9].*/.test(v) || 'Тип не должен состоять только из цифр',
  ],
  emptyField: [
    (v: any) => !!v || 'Заполните поле',
  ],
  option: [
    (v: any) => !!v || 'Выберите хотябы одну комплектацию',
  ],
  clientName: [
    (v: any) => !!v || 'Заполните поле',
    (v: string) => /.*?[^0-9].*/.test(v) || 'Данное поле не должно состоять только из цифр',
  ],
  cartonId: [
    (v: any) => !!v || 'Заполните поле',
    (v: { length: number; }) => (v && v.length === 6) || 'Номер посылки должен состоять из 6 символов',
  ],
  serviceType: [(v: any) => !!v || 'Выберите клиента'],
  pickupCity: [(v: any) => !!v || 'Выберите город'],
  deliveryCity: [(v: any) => !!v || 'Выберите город'],
  price: [
  (v: any) => !!v || 'Заполните поле',
  // (v: string) => /^[+-]?\d+(\.\d+)?$/.test(v) || 'Цена тарифа должна быть целочисленным',
  ],
  period: [(v: any) => !!v || 'Выберите период'],
};
