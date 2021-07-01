const express = require("express");

const { getUseCaseDiagramsPage } = require("../controllers/diagrams");

const router = express.Router();

router.use("/uc/:ucParam", getUseCaseDiagramsPage);

//router.use("/class/:classParam", omniRoutes);

//router.use("/", (req, res) => res.redirect("http://requml.co.uk/"));

module.exports = router;