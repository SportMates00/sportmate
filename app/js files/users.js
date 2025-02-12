import favicon from "../../assets/images/favicon.png"
let completedEvents = [
  {
    sport: "Football",
    location: "NY ST",
    date: "Jan 30, 2025",
    city: "Yerevan",
    region: "",
    teamA: [
      { name: "John", profilePhoto: favicon },
      // { name: "Jane", profilePhoto: favicon }
    ],
    teamB: [
      { name: "Alex", profilePhoto: favicon }
    ]
  },
  {
    sport: "Tennis",
    location: "Miami Court",
    date: "Feb 2, 2025",
    city: "Miami",
    region: "FL",
    teamA: [
      { name: "Chris", profilePhoto: favicon },
      { name: "Emily", profilePhoto: favicon },
      { name: "David", profilePhoto: favicon }
    ],
    teamB: [
      { name: "Michael", profilePhoto: favicon },
      { name: "Sara", profilePhoto: favicon },
      { name: "Luke", profilePhoto: favicon }
    ],
    level: 'intermediate',
    time: '8pm',
    backgroundImage: '',      

  }
]



const users = [
    {firstName:'Lolig', lastName: 'Lion', email:'1', password:'1', profileInfo: {
      sport: 'Football',
      level: 'Beginner',
      location:'',
      age:'',
      gender:'',
      aboutMe:'Hello my name is Mher, I am you',
      sportsList:[{sport:'Football',level:'Intermediate'},{sport:'Basketball',level:'Beginner'},{sport:'Tennis',level:'Professional'}],
      reviews:'',
      activity:[{}],
      profileImageUrl:'',
      profileCompletePer:4,
      friendsList:[{firstName:'Mher', lastName:'Kevorkian',profilePicture:favicon},{firstName:'Njteh', lastName:'Melkonian',profilePicture:favicon}],
      completedEvents:completedEvents,
      availibility: {
          Mon: { Mor: false, Aft: true, Eve: false },
          Tue: { Mor: false, Aft: false, Eve: false },
          Wed: { Mor: false, Aft: false, Eve: false },
          Thu: { Mor: true, Aft: false, Eve: false },
          Fri: { Mor: false, Aft: false, Eve: false },
          Sat: { Mor: false, Aft: false, Eve: false },
          Sun: { Mor: false, Aft: false, Eve: false },
      },
    },}
]



export let users_list =  users