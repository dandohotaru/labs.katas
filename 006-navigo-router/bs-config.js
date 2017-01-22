module.exports = {
  "port": 8000,
  "files": ["./src/**/*.{html,htm,css,js}"],
  "server": {
    "baseDir": "src",
    "routes": { "/node_modules": "node_modules" }
  },
  notify: false
};