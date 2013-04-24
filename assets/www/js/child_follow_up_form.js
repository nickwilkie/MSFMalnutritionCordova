/*
 * These define all the questions that you'll see on a particular page.
 * It's a JSON array. I've given it its own variable to highlight it. The
 * childPage1Views variable gets used later on for the final structure.
*/

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
	{viewType : "number", conceptId : "enfage", label : "Age de l'enfant (en mois)"},
	{viewType : "radio", conceptId : "obtage", label : "Age de l'enfant (en mois)",
		options : [{label : "carnet de vaccination", value : "1"},
		           {label : "certificat naissance", value : "2"},
		           {label : "information maman", value : "3"},
		           {label : "utilisation calendrier local", value : "4"}]},
		          	{viewType : "radio", conceptId : "sexenf", label : "Sexe de l'enfant",
		          		options : [{label : "male", value : "1"},
		          		           {label : "female", value : "2"},
		          		           {label : "NA ou non sp\xE9cifi\xE9", value : "9"}]},
   	{viewType : "text", conceptId : "mernom", label : "Nom de famille de la m\xE8re"}, 
   	{viewType : "text", conceptId : "merpren", label : "Pr\xE9nom de la m\xE8re"}, 
   	{viewType : "text", conceptId : "pernom", label : "Nom de famille du p\xE8re"}, 
   	{viewType : "text", conceptId : "perpren", label : "Pr\xE9nom du p\xE8re"}, 
   	{viewType : "text", conceptId : "tel", label : "Num\xE9ro de t\xE9l\xE9phone"}, 
   	{viewType : "radio", conceptId : "accomp", label : "Accompagnant de l'enfant",
   		options : [{label : "m\xE8re", value : "1"},
   		           {label : "p\xE8re", value : "2"},
   		           {label : "grand m\xE8re", value : "3"},
   		           {label : "autre", value : "4"}]},
       		       	{viewType : "text", conceptId : "tel", label : "Num\xE9ro de t\xE9l\xE9phone"}, 
    		       	{viewType : "text", conceptId : "accompprecise", label : "Pr\xE9ciser:"}
];


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

/*
 * This represents a page. It uses the array we defined above to describe which views
 * should be on the page. This also contains some display data like the title, themes, etc.
 */

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

/*
 * formData is the global variable that the initializer uses to actually fill the form.
 * It can define global variables and defaults for the whole app. Right now it just has two pages.
 * 
 */

formData = {
	global : {
	},
	
	pages : [childPage1,
	         SubmitPage]
};

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
