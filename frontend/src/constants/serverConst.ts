const {
  REACT_APP_SERVER_HOST: SERVER_HOST,
  REACT_APP_SERVER_HOST_WEBSOCKET: SERVER_HOST_WEBSOCKET,
  REACT_APP_IMAGE_HOST: IMAGE_HOST,
} = process.env;
const serverConst = {
  url: SERVER_HOST,
  urlWebsocket: SERVER_HOST_WEBSOCKET,
  imgUrl: IMAGE_HOST,
};
export default serverConst;
