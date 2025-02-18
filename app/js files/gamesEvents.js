import favicon from "../../assets/images/favicon.png"
export const gamesEvents = {
    football:[
      {
      id:1,
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
      id:2,
      sport: "Football",
      location: "CA ST",
      date: "Jan 12, 2025",
      city: "Yerevan",
      region: "",
      teamA: [
        { name: "Mher", profilePhoto: favicon },
        // { name: "Jane", profilePhoto: favicon }
      ],
      teamB: [
        { name: "Njteh", profilePhoto: favicon }
      ]
    },
  
  ]
    ,
    tennis:[
      {
      id:3,
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
  }