import { createSelector } from '@reduxjs/toolkit';

export const selectGameEvents = (state) => state.gameEvents.events;
export const selectCurrentUserId = (state) => state.auth.currentUserId;

const getEventDateTime = (game) =>
  new Date(`${game.date}T${game.time}:00`);

export const selectMyGameEvents = createSelector(
  [selectGameEvents, selectCurrentUserId],
  (events, userId) => {
    if (!userId) return [];

    return events.filter(game =>
      game?.host?.id === userId ||
      game?.players?.some(p => p.id === userId) ||
      game?.pendingRequests?.some(p => p.id === userId) ||
      game?.invitedPlayers?.some(p => p.id === userId) ||
      game?.rejectedPlayers?.some (p => p.id === userId)
    );
  }
);

export const selectPublicGames = createSelector(
  [selectGameEvents, selectCurrentUserId],
  (events, userId) => {
    if (!userId) return events;   // still show everything if not logged in

    return events.filter(game => {

      // exclude if I am host
      if (game?.host?.id === userId) return false;

      // exclude if I am a player
      if (game?.players?.some(p => p.id === userId)) return false;

      // exclude if I have a pending request
      if (game?.pendingRequests?.some(p => p.id === userId)) return false;

      // exclude if I was invited
      if (game?.invitedPlayers?.some(p => p.id === userId)) return false;

      // exclude if I was rejected (if you added this)
      if (game?.rejectedPlayers?.some(p => p.id === userId)) return false;

      return true; // otherwise keep it
    });
  }
);

export const selectMyCurrentGames = createSelector(
  [selectMyGameEvents, selectCurrentUserId],
  (games, userId) => {
    const now = new Date();

    return games.filter(game => {
      const isRejected =
        game?.rejectedPlayers?.some(u => u.id === userId);

      if (isRejected) return false;

      const eventAt = getEventDateTime(game);
      return eventAt >= now;
    });
  }
);

export const selectMyPastGames = createSelector(
  [selectMyGameEvents, selectCurrentUserId],
  (games, userId) => {
    const now = new Date();

    return games.filter(game => {
      const isRejected =
        game?.rejectedPlayers?.some(u => u.id === userId);

      if (isRejected) return true;   // always past UI-wise

      const eventAt = getEventDateTime(game);
      return eventAt < now;
    });
  }
);