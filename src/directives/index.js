/**
 * 配置和注册全局指令
 */
import { setupCopygDirective } from "./copy";
import { setupRotateDirective } from "./rotate";

export function setupGlobDirectives(app) {
  setupCopygDirective(app);
  setupRotateDirective(app);
}
