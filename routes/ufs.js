const express = require('express');
const router = express.Router();

// Lista fixa das UFs (abreviações)
const ufs = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
];

router.get('/', (req, res) => {
    res.json(ufs);
});

module.exports = router;
