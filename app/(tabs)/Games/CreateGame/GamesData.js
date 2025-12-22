

const gamesData = {
  football: {
    id: 1,
    sportName: "Football",
    sportIcon: "football-outline",
    stadiums: [
      { id: 1, stadiumName: "Hrazdan Stadium", city: "Yerevan", location: "Arabkir", hours: "08:00 - 23:00", price: "15,000 AMD" },
      { id: 2, stadiumName: "Avan Academy Field", city: "Yerevan", location: "Avan", hours: "09:00 - 22:00", price: "12,000 AMD" },
      { id: 3, stadiumName: "Pyunik Training Ground", city: "Yerevan", location: "Malatia", hours: "10:00 - 21:00", price: "10,000 AMD" },
      { id: 4, stadiumName: "Banants Field", city: "Yerevan", location: "Nor Nork", hours: "08:00 - 22:00", price: "14,000 AMD" },
      { id: 5, stadiumName: "Shengavit Stadium", city: "Yerevan", location: "Shengavit", hours: "07:00 - 23:00", price: "13,000 AMD" },
      { id: 6, stadiumName: "Kanaker Field", city: "Yerevan", location: "Kanaker", hours: "08:00 - 21:00", price: "11,000 AMD" },
    ],
  },

  basketball: {
    id: 2,
    sportName: "Basketball",
    sportIcon: "basketball-outline",
    stadiums: [
      { id: 1, stadiumName: "Dinamo Indoor Court", city: "Yerevan", location: "Kentron", hours: "09:00 - 22:00", price: "8,000 AMD" },
      { id: 2, stadiumName: "Arabkir Sports Hall", city: "Yerevan", location: "Arabkir", hours: "10:00 - 21:00", price: "7,000 AMD" },
      { id: 3, stadiumName: "Olympic Reserve Court", city: "Yerevan", location: "Ajapnyak", hours: "08:00 - 20:00", price: "9,000 AMD" },
    ],
  },

  tennis: {
    id: 3,
    sportName: "Tennis",
    sportIcon: "tennisball-outline",
    stadiums: [
      { id: 1, stadiumName: "DSQ Tennis Club", city: "Yerevan", location: "Komitas", hours: "07:00 - 23:00", price: "12,000 AMD" },
      { id: 2, stadiumName: "Orange Tennis Center", city: "Yerevan", location: "Avan", hours: "08:00 - 22:00", price: "14,000 AMD" },
      { id: 3, stadiumName: "Ararat Tennis Courts", city: "Yerevan", location: "Erebuni", hours: "09:00 - 21:00", price: "11,000 AMD" },
    ],
  },

  pingpong: {
    id: 4,
    sportName: "Table Tennis",
    sportIcon: "disc-outline",
    stadiums: [
      { id: 1, stadiumName: "Spin Club", city: "Yerevan", location: "Kentron", hours: "10:00 - 22:00", price: "5,000 AMD" },
      { id: 2, stadiumName: "Ace Ping Pong Hall", city: "Yerevan", location: "Arabkir", hours: "09:00 - 21:00", price: "4,000 AMD" },
    ],
  },

  billiard: {
    id: 5,
    sportName: "Billiard",
    sportIcon: "ellipse-outline",
    stadiums: [
      { id: 1, stadiumName: "8 Ball Club", city: "Yerevan", location: "Kentron", hours: "12:00 - 02:00", price: "6,000 AMD" },
      { id: 2, stadiumName: "Royal Billiards", city: "Yerevan", location: "Shengavit", hours: "11:00 - 01:00", price: "7,000 AMD" },
      { id: 3, stadiumName: "Classic Snooker Hall", city: "Yerevan", location: "Nor Nork", hours: "10:00 - 00:00", price: "6,500 AMD" },
    ],
  },
};


export const gamesTable = gamesData;

