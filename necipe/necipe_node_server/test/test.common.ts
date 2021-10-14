import config from "../src/Configs/index";

const API_PORT = config.port;
const API_HOST = "localhost";
export const TEST_API = `http://${API_HOST}:${API_PORT}/api`;
