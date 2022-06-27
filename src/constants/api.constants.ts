const ENDPOINTS = {
  TWITCH_AUTH: '/api/twitch/auth',
  TWITCH_REWARDS: '/api/twitch/rewards',
  DA_AUTH: '/api/da/auth',
  TWITCH_CHANNEL_POINTS: '/api/twitch/channelPoints',
  CAMILLE_BOT: '/api/requests/camilleBot',
  USER: {
    USERNAME: '/api/username',
    AUC_SETTINGS: '/api/aucSettings',
    SETTINGS: '/api/user/settings/auc',
    DATA: '/api/user',
    INTEGRATION: '/api/user/settings/integration',
  },
  RESTORE_SETTINGS: {
    HAS_USER: '/api/oldUsers/hasUser',
    RESTORE_SETTINGS: '/api/oldUsers/restoreSettings',
  },
  RANDOM: {
    INTEGER: '/api/random/integer',
  },
  AUDIO_ROOM: {
    USER: '/api/audioRoom/user',
    PRESETS: '/api/audioRoom/presets',
  },
};

export default ENDPOINTS;
