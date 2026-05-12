// // /**
// //  * @type {import('next').NextConfig}
// //  */

// // const nextConfig = {
// //   output: 'export',

// //   images: {
// //     unoptimized: true,
// //   },

// //   // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
// //   // trailingSlash: true,

// //   // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
// //   // skipTrailingSlashRedirect: true,

// //   // Optional: Change the output directory `out` -> `dist`
// //   // distDir: 'dist',
// // }

// // module.exports = nextConfig

// // module.exports = {
// //   assetPrefix: '.',
// // };

// const path = require("path");


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, options) => {
//     // 1️⃣ GLSL loader
//     config.module.rules.push({
//       test: /\.(glsl|vs|fs|vert|frag)$/,
//       use: ["raw-loader", "glslify-loader"],
//     });

//     // 2️⃣ Forcer une seule instance de Three.js
//     config.resolve.alias = {
//       ...(config.resolve.alias || {}),
//       "three": path.resolve("./node_modules/three"),
      
//     };

//     return config;
//   },

//   // output: 'export',
// };

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
