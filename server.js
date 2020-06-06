const app = require('./routes.js');

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`now listening on port ${PORT}`));