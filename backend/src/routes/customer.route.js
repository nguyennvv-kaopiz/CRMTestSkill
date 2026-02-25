const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer.controller');

router.get('/', controller.getCustomers);
router.post('/', controller.createCustomer);
router.get('/:id/tags', controller.getCustomerTags);
router.get('/:id/history', controller.getInteractionHistory);
router.get('/:id', controller.getCustomerById);
router.put('/:id', controller.updateCustomer);
router.patch('/:id', controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);

module.exports = router;
