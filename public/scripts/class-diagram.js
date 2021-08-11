const classes = JSON.parse(orderClasses);

const diagramCanvas = document.createElement("canvas");
diagramCanvas.width = 1405;
diagramCanvas.height = 1200;
diagramCanvas.style.margin = "1rem";
diagramCanvas.id = `classDiagramUML`;

document.querySelector("#canvas-start").after(diagramCanvas);

const diagramTitle = document.createElement("h2");
diagramTitle.setAttribute("aria-control", `classDiagramUML`);
diagramTitle.innerHTML = `UML Class Diagram`;

diagramTitle.addEventListener("click", event => initiateCanvasDownload(event));

document.querySelector("#canvas-start").after(diagramTitle);

const canvas = new fabric.Canvas(`classDiagramUML`);

for(const [index, element] of classes.entries()) {

	const classNameRect = new fabric.Rect({
        fill: "white",
        width: 150,
        height: 25,
        objectCaching: false,
        stroke: "black",
        strokeWidth: 2,
        originX: 'center',
		originY: 'center'
    });

    const className = element.name.length > 25 ? element.name.substr(0, 25) + "..." : element.name;
	
	const classNameText = new fabric.Text(className, {
		fontFamily: "Calibri",
		fontSize: 12,
		fill: "black",
		textAlign: 'center',
		originX: 'center',
		originY: 'center'
	});
	
	const classNameGroup = new fabric.Group([classNameRect, classNameText], {
		left: 0,
		top: 0
	});

    let attributes = "";
    let attributesCount = 1;

    if(!!element.attributes) {
        attributesCount = element.attributes.length;
        
        for(const attribute of element.attributes) {
            attributes = attributes + attribute + "\n"
        }
    }

    const classAttrRect = new fabric.Rect({
        fill: "white",
        width: 150,
        height: 30 * attributesCount,
        objectCaching: false,
        stroke: "black",
        strokeWidth: 2,
        originX: 'center',
		originY: 'center'
    });
	
	const classAttrText = new fabric.Text(attributes, {
        top: 3,
		fontFamily: "Calibri",
		fontSize: 12,
		fill: "black",
		textAlign: 'center',
		originX: 'center',
		originY: 'center'
	});
	
	const classAttrGroup = new fabric.Group([classAttrRect, classAttrText], {
		left: 0,
		top: 25
	});

    let methods = "";
    let methodsCount = 1;

    if(!!element.methods) {
        methodsCount = element.methods.length;
        
        for(const method of element.methods) {
            methods = methods + method + "\n"
        }
    }

    const classMethodsRect = new fabric.Rect({
        fill: "white",
        width: 150,
        height: 30 * methodsCount,
        objectCaching: false,
        stroke: "black",
        strokeWidth: 2,
        originX: 'center',
		originY: 'center'
    });
	
	const classMethodsText = new fabric.Text(methods, {
        top: 3,
		fontFamily: "Calibri",
		fontSize: 12,
		fill: "black",
		textAlign: 'center',
		originX: 'center',
		originY: 'center'
	});
	
	const classMethodsGroup = new fabric.Group([classMethodsRect, classMethodsText], {
		left: 0,
		top: -5 + (30 * attributesCount) + (30 * methodsCount)
	});

    const classArea = new fabric.Group([classNameGroup, classAttrGroup, classMethodsGroup], {
		left: 20 + ((index % 6) * 220),
		top: 20 + 220 * (Math.floor(index / 6))
	});
	
	canvas.add(classArea);
}

const initiateCanvasDownload = event => {
    const downloadTarget = event.target.getAttribute("aria-control");

	const link = document.getElementById("link");
	link.setAttribute("download", `${downloadTarget}.png`);
	link.setAttribute("href", document.querySelector(`#${downloadTarget}`).toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream"));
	link.click();
}

