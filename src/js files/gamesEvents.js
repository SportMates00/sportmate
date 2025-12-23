export const gameEvents = [
  {
    id: "game_001",

    /* ---------- SPORT ---------- */
    sport: "football",                // key from gamesTable
    sportName: "Football",

    /* ---------- VENUE (snapshot) ---------- */
    venue: {
      id: 1,
      stadiumName: "Hrazdan Stadium",
      city: "Yerevan",
      location: "Arabkir",
      hours: "08:00 - 23:00",
      price: "15,000 AMD",
      latitude: 40.2058,
      longitude: 44.5286,
    },

    /* ---------- DATE & TIME ---------- */
    date: "2025-06-30",                // YYYY-MM-DD
    time: "09:00",
    timezone: "GMT+4",

    /* ---------- GAME DETAILS ---------- */
    gameType: "Practice",              // Practice | Match | Tournament
    level: ["Intermediate"],
    maxPlayers: 10,
    courtBooked: true,
    price: 0,

    /* ---------- HOST ---------- */
    host: {
      id: "u1",
      name: "John",
      verified: true,
      profilePhoto: null,
    },

    /* ---------- PLAYERS ---------- */
    players: [
      { id: "u1", name: "John", profilePhoto: null },
      { id: "u2", name: "Alex", profilePhoto: null },
    ],

    pendingRequests: [
      { id: "u3", name: "Mike" }
    ],

    invitedPlayers: [],

    /* ---------- RULES ---------- */
    verifiedOnly: false,
    visibility: "public",              // public | private

    /* ---------- CHAT ---------- */
    chatEnabled: true,
    chatId: "chat_game_001",

    /* ---------- STATUS ---------- */
    status: "active",                  // active | canceled | finished
    createdAt: "2025-06-01T10:00:00Z",
  }
];
