// 生产环境下将不会导入mock
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import indexMock from "./index";
import userMock from "./user";
export const mockModules = [...indexMock, ...userMock];

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
