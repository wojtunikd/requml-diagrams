const express = require("express");

const { getUseCaseDiagramsPage, getClassDiagramPage } = require("../controllers/diagrams");

const router = express.Router();

router.get("/uc/:ucParam", getUseCaseDiagramsPage);

router.get("/class/:classParam", getClassDiagramPage);

router.get("/error", (req, res) => res.render("error"));

router.use("/", (req, res) => res.redirect("https://requml.co.uk/"));

module.exports = router;