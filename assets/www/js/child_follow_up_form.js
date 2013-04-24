childPage1Views = [
{viewType : "date", conceptId : "datenq", label : "Date du suivi"}, 
{viewType : "text", conceptId : "nomenq", label : "Num\xE9ro de l'enqu\xEAteur"}, 
{viewType : "text", conceptId : "zonenom", label : "Nom de la zone"}, 
{viewType : "number", conceptId : "zonenum", label : "Num\xE9ro de la zone"}, 
{viewType : "number", conceptId : "nummen", label : "Num\xE9ro du m\xE9nage"}, 
{viewType : "number", conceptId : "nuvill", label : "Num\xE9ro du village"}, 
{viewType : "number", conceptId : "enfid", label : "Identification de l'enfant"}, 
{viewType : "number", conceptId : "numcoup", label : "Num\xE9ro du coupon"}, 
{viewType : "text", conceptId : "enfnom", label : "Nom de famille de l'enfant"}, 
{viewType : "text", conceptId : "prenenf", label : "Pr\xE9nom de l'enfant"}, 
{viewType : "date", conceptId : "naisenf", label : "Date de naissance de l'enfant"}, 
{viewType : "number", conceptId : "enfage", label : "Age de l'enfant (en mois)"}
];

exampleTextField = {
	viewType : "text",
	conceptId : "fullName",
	label : "What is your full name?"
};

exampleNumberField = {
		viewType : "number",
		conceptId : "numberOfBoats",
		label : "How many boats do you own?"
};

exampleRadio = {
		viewType : "radio",
		conceptId : "favoriteColor",
		label : "Which is your favorite color?",
		options : [{label : "Green", value : "greenvalue"},
		           {label : "Blue", value : "bluevalue"},
		           {label : "Purple", value : "purplevalue"}]
};

exampleCheckbox1 = {
		viewType : "checkboxgroup",
		label : "What sports do you like?",
		children : [{label : "Soccer", conceptId : "soccervalue"},
		           {label : "Football", conceptId : "footballvalue"},
		           {label : "Calvinball", conceptId : "calvinballvalue"}]
};

exampleCheckbox2 = {
		viewType : "checkboxgroup",
		label : "What are you allergic to?",
		children : [{label : "Sulfa", conceptId : "sulfaallergy"},
		           {label : "Wheat", conceptId : "wheatallergy"},
		           {label : "Nickel", conceptId : "nickelallergy"}]
};

introPage = {
	header : {
		title : "MSF Malnutrition",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : []
	}
};

childPage1 = {
	header : {
		title : "Working Test Config",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage1Views
	}
};

SubmitPage = {
		header : {
			title : "Submit form data",
			theme : "b"
		},
		footer : {
			theme : "c"
		},
		content : {
			theme : "c",
			views : [{viewType : "submitpage"}]
		}
};

formData = {
	global : {
	},
	
	pages : [childPage1,
	         SubmitPage]
};