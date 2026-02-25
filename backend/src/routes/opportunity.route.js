const express = require('express');
const router = express.Router();
const controller = require('../controllers/opportunity.controller');

router.get('/pipeline', controller.getPipeline);
router.get('/', controller.getOpportunities);
router.post('/', controller.createOpportunity);
router.get('/:id', controller.getOpportunityById);
router.put('/:id', controller.updateOpportunity);
router.patch('/:id/stage', controller.moveStage);

module.exports = router;
