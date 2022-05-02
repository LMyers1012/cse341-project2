const router = require('express').Router();
const swaggerUiExpress = require('swagger-ui-express');
const swaggerDoc = require('../../swagger-output.json');

router.use('/api-docs', swaggerUiExpress.serve);
router.get('/api-docs', swaggerUiExpress.setup(swaggerDoc));

module.exports = router;
