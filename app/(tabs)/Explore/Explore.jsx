import React, { useMemo, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExploreContext } from "./ExploreContext";

import ExploreHome from "./ExploreHome";
import ExploreSaved from "./ExploreSaved";
import ExploreMap from "./ExploreMap";
import ExploreVenueDetails from "./ExploreVenueDetails";

const Stack = createNativeStackNavigator();

export default function Explore() {
  const [saved, setSaved] = useState({
    hrazdan: false,
    dinamo: false,
  });

  const toggleSaved = (id) => {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const savedCount = (saved.hrazdan ? 1 : 0) + (saved.dinamo ? 1 : 0);

  const value = useMemo(
    () => ({
      saved,
      toggleSaved,
      savedCount,
    }),
    [saved, savedCount]
  );

  return (
    <ExploreContext.Provider value={value}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ExploreHome" component={ExploreHome} />
        <Stack.Screen name="ExploreSaved" component={ExploreSaved} />
        <Stack.Screen name="ExploreMap" component={ExploreMap} />
        <Stack.Screen name="ExploreVenueDetails" component={ExploreVenueDetails} />
      </Stack.Navigator>
    </ExploreContext.Provider>
  );
}
