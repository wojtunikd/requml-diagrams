const express = require("express");

const { getUseCaseDiagramsPage, getClassDiagramPage } = require("../controllers/diagrams");

const router = express.Router();

router.use("/uc/:ucParam", getUseCaseDiagramsPage);

router.use("/class/:classParam", getClassDiagramPage);

router.use("/error", (req, res) => res.render("error"));

router.use("/", (req, res) => res.redirect("https://requml.co.uk/"));

module.exports = router;