const httpsRE = /^https:\/\//;
/**
 * Generate proxy
 * @param list
 */
// export function createProxy(list = []) {
//   // console.log('list:', list, typeof JSON.parse(list));
//   const ret = {};
//   for (const [prefix, target] of JSON.parse(list)) {
//     const isHttps = httpsRE.test(target);

//     // https://github.com/http-party/node-http-proxy#options
//     ret[prefix] = {
//       target: target,
//       changeOrigin: true,
//       ws: true,
//       rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
//       // https is require secure=false
//       ...(isHttps ? { secure: false } : {}),
//     };
//   }
//   return ret;
// }
