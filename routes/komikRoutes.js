const express = require('express');
const router = express.Router();
const komikController = require('../controllers/komikController');
const { validateKomik, validateId } = require('../middleware/komikValidator');

router.get('/komik', komikController.getAllKomik);
router.get('/komik/:id', validateId, komikController.getKomikById);
router.post('/komik', validateKomik, komikController.createKomik);
router.put('/komik/:id', validateId, validateKomik, komikController.updateKomik);
router.delete('/komik/:id', validateId, komikController.deleteKomik);

module.exports = router;