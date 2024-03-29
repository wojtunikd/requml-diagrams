const uc = clientUseCases;

for(const [index, actorUseCases] of uc.entries()) {
	let height = actorUseCases["useCases"].length * 110;

	if(height/2 < 150) height = 350;
	
	const diagramCanvas = document.createElement("canvas");
	diagramCanvas.width = 1000;
	diagramCanvas.height = height;
	diagramCanvas.style.margin = "2rem";
	diagramCanvas.id = `useCaseDiagram${index}`;
	
	document.querySelector("#canvas-start").after(diagramCanvas);
	
	const diagramTitle = document.createElement("h2");
    diagramTitle.setAttribute("aria-control", `useCaseDiagram${index}`);
	diagramTitle.innerHTML = `Use Case Diagram ${uc.length - index} for ${actorUseCases["actor"]}`;

    diagramTitle.addEventListener("click", event => initiateCanvasDownload(event));
	
	document.querySelector("#canvas-start").after(diagramTitle);
	
	const canvas = new fabric.Canvas(`useCaseDiagram${index}`);

	const actorIcon = document.querySelector("#actorIcon");

	const actorIconInstance = new fabric.Image(actorIcon, {
		originX: "center",
		originY: "bottom"
	});
	
	const actorText = new fabric.Text(actorUseCases["actor"], {
		fontFamily: "Calibri",
		fontSize: 13,
		fill: "black",
		textAlign: "center",
		originX: "center",
		originY: "top"
	});
	
	const actorGroup = new fabric.Group([actorIconInstance, actorText], {
		left: 5,
		top: height/2
	});
	
	canvas.add(actorGroup);
	
	const actorCoords = actorGroup._getCoords();
	
	for(const [i, useCase] of actorUseCases["useCases"].entries()) {
		const useCaseBubble = new fabric.Ellipse({
			fill: "#0c7cbb",
			rx: 130,
			ry: 50,
			hasRotatingPoint: false,
			originX: "center",
			originY: "center"
		});
		
		const ucText = useCase.useCase.split(" ");
        const coreWords = useCase.core;

        for(let i=0; i < ucText.length; i++) {
            if(coreWords.includes(i)) {
                const wordToHighlight = ucText[i];
                ucText.splice(i, 1, `${wordToHighlight.toUpperCase()}`);
            }
		}
		
		for(let i=0; i < ucText.length; i+=5) {
			ucText.splice(i, 0, "\n");
		}

        const finalText = ucText.join(" ");

		const useCaseText = new fabric.Text(finalText, {
			width: 240,
			fontFamily: 'Calibri',
			fontSize: finalText.length > 100 ? 11 : 13,
			fill: "white",
			textAlign: "center",
			top: -6,
			originX: "center",
			originY: "center",
			breakWords: true

		});

		const useCaseGroup = new fabric.Group([useCaseBubble, useCaseText], {
			left: i%2 === 0 ? 300 : 620,
			top: eval(10 + i*100)
		});

		useCaseGroup.hasControls = false;
		useCaseGroup.station = true;

		canvas.add(useCaseGroup);
		const ucGroupCoords = useCaseGroup._getCoords();
		
		canvas.add(new fabric.Line([actorCoords.tr.x, (actorCoords.tr.y + i*12), ucGroupCoords.tl.x, (ucGroupCoords.tl.y + ucGroupCoords.bl.y)/2], {
			stroke: "#000a26"
		}));
	}
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

