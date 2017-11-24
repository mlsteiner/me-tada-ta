#target indesign
#targetengine "session"
// Add Metadata each time the file is saved or exported
app.menuActions.itemByName("$ID/Save").eventListeners.add("beforeInvoke", addMetaData);
app.menuActions.itemByName("$ID/Save As...").eventListeners.add("beforeInvoke", addMetaData);
app.menuActions.itemByName("$ID/Export...").eventListeners.add("beforeInvoke", addMetaData);
// Collect information about Author and Document
function addMetaData() {
	var d = app.activeDocument;
	var u = $.getenv('USER');
	var nameOfDocument = d.name;
	try {
		var pathOfDocument = d.filePath.fsName + "/";
	} catch (e) {
		var pathOfDocument = "";
	}
	
// Write information to file
	with (d.metadataPreferences){
		author = u;
		documentTitle = nameOfDocument;
		description = "Location: " + pathOfDocument + nameOfDocument;
	}
}
