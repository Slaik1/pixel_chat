const IS_DEV = true;

export const API_ADDRESS = IS_DEV ? 'localhost:5000' : 'MY_DOMAIN';

export const API_WS_ADDRESS = 'ws://' + API_ADDRESS;
