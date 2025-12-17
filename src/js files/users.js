import { basketballSportIcon, footballSportIcon, tennisSportIcon } from "@/assets/sportIcons/sportIcons"
import favicon from "../../assets/images/favicon.png"
import mher from "../../assets/images/mher.jpg"
import njteh from "../../assets/images/njteh.jpg"

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
let reviews = [
  { id: '1', stars: 5, text: 'Great player! Really enjoyed the game.' },
  { id: '2', stars: 4, text: 'Good teammate but needs to improve punctuality.' },
  { id: '3', stars: 5, text: 'Good game, much respect to him!' },
]


const users = [
    {firstName:'Lolig', lastName: 'Lion', email:'1', password:'1', profileInfo: {
      mainSport: 'Football',
      location:'Yerevan',
      age:'',
      gender:'',
      aboutMe:'Hello my name is Mher, I am you',
      sportsList:[
          { id: 'basketball', sportName: 'Basketball', sportLevel: 'Beginner',sportIcon:basketballSportIcon },
          { id: 'tennis', sportName: 'Tennis', sportLevel: 'Professional', sportIcon:tennisSportIcon },
          { id: 'football', sportName: 'Football', sportLevel: 'Professional', sportIcon:footballSportIcon },
      ],
      reviews:reviews,
      profileImageUrl:'',
      profileCompletePer:5,
      friendsList:[{firstName:'Mher', lastName:'Kevorkian',profilePicture:mher},{firstName:'Njteh', lastName:'Melkonian',profilePicture:njteh}],
      completedEvents:completedEvents,
      availability: {
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