const classes = clientClasses;

const relationships = [];
const umlGroups = [];

const diagramCanvas = document.createElement("canvas");
diagramCanvas.width = 1405;
diagramCanvas.height = 520 + 520 * Math.floor(classes.classes.length / 5);
diagramCanvas.style.margin = "1rem";
diagramCanvas.id = `classDiagramUML`;

document.querySelector("#canvas-start").after(diagramCanvas);

const diagramTitle = document.createElement("h2");
diagramTitle.setAttribute("aria-control", `classDiagramUML`);
diagramTitle.innerHTML = `UML Class Diagram`;

diagramTitle.addEventListener("click", event => initiateCanvasDownload(event));

document.querySelector("#canvas-start").after(diagramTitle);

const canvas = new fabric.Canvas(`classDiagramUML`);

for(const [index, element] of classes.classes.entries()) {
    if(!!element.relationships) {
        if(element.relationships.length > 0) {
            relationships.push([element.name, element.relationships])
        }
    }

    const classNameRect = new fabric.Rect({
        fill: "white",
        width: 200,
        height: 25,
        objectCaching: false,
        stroke: "black",
        strokeWidth: 2,
        originX: "center",
        originY: "center"
    });

    const className = element.name.length > 25 ? element.name.substr(0, 25) + "..." : element.name;
    
    const classNameText = new fabric.Text(className, {
        fontFamily: "Calibri",
        fontSize: 12,
        fontWeight: "bold",
        fill: "black",
        textAlign: "center",
        originX: "center",
        originY: "center"
    });
    
    const classNameGroup = new fabric.Group([classNameRect, classNameText], {
        left: 0,
        top: 0
    });

    let attributes = "";
    let attributesCount = 1;

    if(element.attributes.category.length > 0) {
        attributesCount = --attributesCount + element.attributes.category.length;

        attributes = "category: ["
        
        for(const [i, attribute] of element.attributes.category.entries()) {
            if(i == element.attributes.category.length - 1) {
                attributes = attributes + attribute
            } else {
                attributes = attributes + attribute + ", "
            }
        }

        attributes = attributes + "] \n"
    }

    if(element.attributes.quality.length > 0) {
        attributesCount = --attributesCount + element.attributes.quality.length;

        attributes = attributes + "quality: ["
        
        for(const [i, attribute] of element.attributes.quality.entries()) {
            if(i == element.attributes.quality.length - 1) {
                attributes = attributes + attribute
            } else {
                attributes = attributes + attribute + ", "
            }
        }

        attributes = attributes + "]"
    }

    const classAttrRect = new fabric.Rect({
        fill: "white",
        width: 200,
        height: 5 + 25 * attributesCount,
        objectCaching: false,
        stroke: "black",
        strokeWidth: 2,
        originX: "center",
        originY: "center"
    });
    
    const classAttrText = new fabric.Text(attributes, {
        top: 0,
        fontFamily: "Calibri",
        fontSize: 12,
        fill: "black",
        textAlign: "center",
        originX: "center",
        originY: "center"
    });
    
    const classAttrGroup = new fabric.Group([classAttrRect, classAttrText], {
        left: 0,
        top: 25
    });

    let methods = "";
    let methodsCount = 1;

    if(!!element.methods) {
        methodsCount = element.methods.length == 0 ? 1 : element.methods.length;
        
        for(const [i, method] of element.methods.entries()) {
            if(i == element.methods.length - 1) {
                methods = methods + method;
            } else {
                methods = methods + method + "\n";
            }
        }
    }

    const classMethodsRect = new fabric.Rect({
        fill: "white",
        width: 200,
        height: 5 + 25 * methodsCount,
        objectCaching: false,
        stroke: "black",
        strokeWidth: 2,
        originX: "center",
        originY: "center"
    });
    
    const classMethodsText = new fabric.Text(methods, {
        top: 0,
        fontFamily: "Calibri",
        fontSize: 12,
        fill: "black",
        textAlign: "center",
        originX: "center",
        originY: "center"
    });
    
    const classMethodsGroup = new fabric.Group([classMethodsRect, classMethodsText], {
        left: 0,
        top: 25 + 5 + (25 * attributesCount)
    });

    const classArea = new fabric.Group([classNameGroup, classAttrGroup, classMethodsGroup], {
        left: 20 + ((index % 5) * 280),
        top: 20 + 300 * (Math.floor(index / 5)) + Math.random() * 200
    });

    umlGroups.push([element.name, classArea])
}

const findUMLClassByName = name => {
    for(const umlClass of umlGroups) {
        if(umlClass[1]._objects[0]._objects[1].text == name) {
            return umlClass[1]
        }
    }

    return false;
} 

for(const relationship of relationships) {
    const source = relationship[0];
    const sourceClass = findUMLClassByName(source);

    if(!sourceClass) continue;

    for(const target of relationship[1]) {
        const targetClass = findUMLClassByName(target);

        if(!targetClass) continue;

        const coords = [(sourceClass.aCoords.bl.x + sourceClass.aCoords.br.x + Math.random() * 200)/2, sourceClass.aCoords.br.y, (targetClass.aCoords.bl.x + targetClass.aCoords.br.x + Math.random() * 200)/2, targetClass.aCoords.br.y]

        const associationLine = new fabric.Line(coords, {
            fill: "black",
            stroke: "black",
            strokeWidth: 1
        });

        canvas.add(associationLine);
    }
}

for(const umlClass of umlGroups) {
    canvas.add(umlClass[1]);
}

/*
    Image canvas download inspired by the solution of Thomas Wagenaar
    https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
*/

const initiateCanvasDownload = event => {
    const downloadTarget = event.target.getAttribute("aria-control");

    const link = document.getElementById("link");
    link.setAttribute("download", `${downloadTarget}.png`);
    link.setAttribute("href", document.querySelector(`#${downloadTarget}`).toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream"));
    link.click();
}

