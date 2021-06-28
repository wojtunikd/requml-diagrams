const axios = require("axios").default;

exports.getUseCaseDiagramsPage = async (req, res) => {
    let response;

    try {
        response = await axios.get(`http://localhost:3333/api/orders/uc/${req.params.ucParam}`);
    } catch(error) {
        console.log(error);
        return res.redirect("/error");
    }

    if(!response || !response.data) return res.redirect("/error");

    if(response.status === 200) {
        res.render("uc-diagrams", {
            useCases: JSON.stringify(JSON.parse(response.data.useCases))
        })
    } else {
        return res.redirect("/error");
    }    
}