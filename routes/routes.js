const express = require("express");

const { getUseCaseDiagramsPage } = require("../controllers/diagrams");

const router = express.Router();

router.use("/uc/:ucParam", getUseCaseDiagramsPage);

//router.use("/class/:classParam", omniRoutes);

router.use("/error", (req, res) => res.render("error"));

router.use("/", (req, res) => res.redirect("https://requml.co.uk/"));

module.exports = router;