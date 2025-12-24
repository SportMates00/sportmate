export const gameEvents = [
  {
    id: "game_001",
    sport: "football",
    sportName: "Football",
    venue: {
      id: 1, stadiumName: "Hrazdan Stadium", city: "Yerevan", location: "Arabkir",
      hours: "08:00 - 23:00", price: "15,000 AMD", latitude: 40.2058, longitude: 44.5286
    },
    date: "2025-06-30",
    time: "09:00",
    timezone: "GMT+4",
    gameType: "Practice",
    level: ["Intermediate"],
    maxPlayers: 10,
    courtBooked: true,
    price: 0,
    host: { id: "u1", name: "John", verified: true, profilePhoto: null },
    players: [
      { id: "u1", name: "John", profilePhoto: null },
      { id: "u2", name: "Alex", profilePhoto: null }
    ],
    pendingRequests: [{ id: "u3", name: "Mike" }],
    invitedPlayers: [],
    verifiedOnly: false,
    visibility: "public",
    chatEnabled: true,
    chatId: "chat_game_001",
    status: "active",
    createdAt: "2025-06-01T10:00:00Z"
  },

  {
    id: "game_002",
    sport: "tennis",
    sportName: "Tennis",
    venue: {
      id: 2, stadiumName: "TSU Tennis Courts", city: "Yerevan", location: "Kentron",
      hours: "09:00 - 22:00", price: "10,000 AMD", latitude: 40.1872, longitude: 44.5152
    },
    date: "2025-07-05",
    time: "18:30",
    timezone: "GMT+4",
    gameType: "Match",
    level: ["Advanced"],
    maxPlayers: 4,
    courtBooked: true,
    price: 5000,
    host: { id: "u5", name: "David", verified: false, profilePhoto: null },
    players: [
      { id: "u5", name: "David", profilePhoto: null },
      { id: "u6", name: "Ani", profilePhoto: null }
    ],
    pendingRequests: [{ id: "u7", name: "Sara" }],
    invitedPlayers: [{ id: "u8", name: "Mark" }],
    verifiedOnly: true,
    visibility: "public",
    chatEnabled: true,
    chatId: "chat_game_002",
    status: "active",
    createdAt: "2025-06-10T14:20:00Z"
  },

  {
    id: "game_003",
    sport: "basketball",
    sportName: "Basketball",
    venue: {
      id: 3, stadiumName: "Yerablur Sports Hall", city: "Yerevan", location: "Malatia-Sebastia",
      hours: "07:00 - 00:00", price: "20,000 AMD", latitude: 40.1596, longitude: 44.4572
    },
    date: "2025-07-12",
    time: "21:00",
    timezone: "GMT+4",
    gameType: "Practice",
    level: ["Lower Intermediate"],
    maxPlayers: 12,
    courtBooked: false,
    price: 0,
    host: { id: "u9", name: "Karen", verified: true, profilePhoto: null },
    players: [
      { id: "u9", name: "Karen", profilePhoto: null },
      { id: "u10", name: "Levon", profilePhoto: null },
      { id: "u11", name: "Aram", profilePhoto: null }
    ],
    pendingRequests: [],
    invitedPlayers: [{ id: "u12", name: "Narek" }],
    verifiedOnly: false,
    visibility: "private",
    chatEnabled: false,
    chatId: "chat_game_003",
    status: "active",
    createdAt: "2025-06-15T08:45:00Z"
  }
];
