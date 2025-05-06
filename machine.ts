let machineData = [
  {
    id: "1",
    name: "16K20",
    type: "Токарно-винторезный",
    max_load: "600 кг",
    commissioning_date: "2017-08-15",
    power: "11 кВт",
    dimensions: {
      length: "2500 мм",
      width: "1300 мм",
      height: "1600 мм",
    },
    current_status: "Работает",
    breakdown_history: [
      {
        date: "2020-04-10",
        description: "Поломка шпинделя. Износ подшипников.",
        status: "ремонт завершён",
      },
      {
        date: "2022-02-05",
        description: "Сбой в системе управления. Перепрошивка ЧПУ.",
        status: "ремонт завершён",
      },
    ],
  },
  {
    id: "2",
    name: "16К30",
    type: "Токарный",
    max_load: "800 кг",
    commissioning_date: "2019-03-22",
    power: "15 кВт",
    dimensions: {
      length: "3200 мм",
      width: "1500 мм",
      height: "1800 мм",
    },
    current_status: "Остановлен",
    breakdown_history: [
      {
        date: "2021-07-14",
        description: "Неисправность суппорта. Заклинивание каретки.",
        status: "ожидает ремонта",
      },
    ],
  },
  {
    id: "3",
    name: "6Р13",
    type: "Вертикально-фрезерный",
    max_load: "1200 кг",
    commissioning_date: "2016-11-05",
    power: "7.5 кВт",
    dimensions: {
      length: "2400 мм",
      width: "1900 мм",
      height: "2200 мм",
    },
    current_status: "Работает",
    breakdown_history: [
      {
        date: "2020-09-28",
        description: "Выход из строя электродвигателя оси Y.",
        status: "ремонт завершён",
      },
      {
        date: "2021-05-17",
        description: "Проблема с фрезерной головкой. Требуется замена.",
        status: "ремонт завершён",
      },
    ],
  },
  {
    id: "4",
    name: "Haas VF-12XT",
    type: "Фрезерный с ЧПУ",
    max_load: "1500 кг",
    commissioning_date: "2020-06-10",
    power: "22 кВт",
    dimensions: {
      length: "4200 мм",
      width: "2800 мм",
      height: "2600 мм",
    },
    current_status: "Работает",
    breakdown_history: [
      {
        date: "2021-11-11",
        description: "Ошибка системы охлаждения. Утечка хладагента.",
        status: "ремонт завершён",
      },
      {
        date: "2022-08-03",
        description: "Отказ блока питания CNC-контроллера.",
        status: "в процессе ремонта",
      },
    ],
  },
  {
    id: "5",
    name: "DMG MORI CTX gamma 1000",
    type: "Токарный с ЧПУ",
    max_load: "2000 кг",
    commissioning_date: "2021-01-25",
    power: "37 кВт",
    dimensions: {
      length: "5200 мм",
      width: "2600 мм",
      height: "2400 мм",
    },
    current_status: "Работает",
    breakdown_history: [
      {
        date: "2022-12-20",
        description: "Неисправность автоматической смены инструмента.",
        status: "ремонт завершён",
      },
    ],
  },
];

export default machineData;
