const express = require('express');
const router = express.Router();
const controller = require('../controllers/lead.controller');

router.get('/', controller.getLeads);
router.post('/', controller.createLead);
router.get('/:id', controller.getLeadById);
router.put('/:id', controller.updateLead);
router.post('/:id/convert', controller.convertToCustomer);

module.exports = router;
