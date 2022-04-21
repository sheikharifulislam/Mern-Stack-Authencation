const authRoutes = require("./authRoutes");

const routes = [
    {
        path: "/auth",
        handler: authRoutes,
    },
];

module.exports = (app) => {
    routes.forEach((route) => {
        app.use(route.path, route.handler);
    });
};
