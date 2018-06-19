const mappa = new Mappa('Leaflet');

const options = {
	lat: 0,
	lng: 0,
	zoom: 2.25,
	style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

const diameterMult = .001;
const alpha = 60;
const minYear = 1960;
const maxYear = 2016;
const textSizeYear = 20;
const textSizeCountry = 1.5;

let canvas;
let popMap;
let yearSlider;
let coordinates;

let countries;
let population;

let maxPop;
let currentYear;
let _mult, _currentYear;

function preload() {
	countries = loadTable('countries.csv', 'csv', 'header');
	population = loadTable('population.csv', 'csv', 'header');
}

function setup() {
	canvas = createCanvas(1280, 800);
	noStroke();
	pixelDensity(1);

	createDiv('Year');
	yearSlider = createSlider(minYear, maxYear, minYear);

	popMap = mappa.tileMap(options);
	popMap.overlay(canvas);
	popMap.onChange(drawPopulation);
	popMap.onChange(drawYear);

	currentYear = String(yearSlider.value());
	formatData();
}

function draw() {
	currentYear = String(yearSlider.value());
	if (currentYear != _currentYear && coordinates) {
		_currentYear = currentYear;
		updateData();
		drawPopulation();
		drawYear();
	}
}

function formatData() {
	coordinates = []
	for (let row of population.getRows()) {
		let name = row.get('Country Name');
		let code = row.get('Country Code');
		let country = countries.findRow(code, 'Alpha-3 code');
		if (country) {
			coordinates.push({
				name,
				lat: country.obj['Latitude (average)'],
				long: country.obj['Longitude (average)'],
				color: color(random(255), random(255), random(255), alpha)
			});
		}
	}
	updateData();
}

function updateData() {
	maxPop = 0;
	_mult = undefined;
	for (let i = 0; i < coordinates.length; i++) {
		let country = population.findRow(coordinates[i].name, 'Country Name');
		let newPop = Number(country.get(currentYear));
		if (newPop) {
			maxPop = Math.max(maxPop, newPop);
			coordinates[i].pop = newPop;
		} else {
			coordinates.splice(i, 1);
			i--;
		}
	}
	for (let i = 0; i < coordinates.length; i++) {
		coordinates[i].diameter = sqrt(coordinates[i].pop) * diameterMult;
	}
}

function drawPopulation() {
	canvas.clear();
	textAlign(CENTER);
	let mult = Math.pow(2, popMap.zoom());
	textSize(textSizeCountry * popMap.zoom());
	for (let i = 0; i < coordinates.length; i++) {

		let pix = popMap.latLngToPixel(coordinates[i].lat, coordinates[i].long);
		if (!coordinates[i].diameter) {
			coordinates[i].diameter = map(sqrt(coordinates[i].pop), 0, sqrt(maxPop), 0, maxDiameter);
		}
		if (_mult != mult) {
			coordinates[i].size = mult * coordinates[i].diameter
		}
		fill(coordinates[i].color);
		ellipse(pix.x, pix.y, coordinates[i].size, coordinates[i].size);
		fill(0);
		text(coordinates[i].name, pix.x, pix.y);
	}
	_mult = mult;
}

function drawYear() {
	textAlign(LEFT);
	textSize(textSizeYear);
	fill(0);
	text(currentYear, 0, height - textSizeYear);
}
