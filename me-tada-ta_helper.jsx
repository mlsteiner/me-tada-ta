// Name:			Me-tada-ta Helper for InDesign
// Description:		Automagically adds user and file location information to an InDesign document as an encoded string
// Version:			2.0.3
// URL:				https://github.com/mlsteiner/me-tada-ta
// Author:			Mark Steiner
// Date:			2022.11.16

#target indesign
#targetengine "session"

// Setup event listeners to kick off process
app.menuActions.itemByName("$ID/Save").eventListeners.add("beforeInvoke", environmentCheck);
app.menuActions.itemByName("$ID/Save As...").eventListeners.add("beforeInvoke", environmentCheck);
app.menuActions.itemByName("$ID/Export...").eventListeners.add("beforeInvoke", environmentCheck);


// Check to see if helper is enabled [ or not ]
function environmentCheck() {
	try {
		readDefaults = "do shell script \"defaults read com.me-tada-ta.helper PluginIsEnabled\"";
		var isEnabled = app.doScript(readDefaults, ScriptLanguage.APPLESCRIPT_LANGUAGE);

		if (isEnabled == 1) {
			getPassword()
		} else {
			return;
		}
		} catch (e) {
			writeDefaults = 'do shell script "defaults write com.me-tada-ta.helper PluginIsEnabled -bool true"';
			var isEnabled = app.doScript(writeDefaults, ScriptLanguage.APPLESCRIPT_LANGUAGE);
			environmentCheck();
		}
	}

	// Check to see if a password has been set
	function getPassword() {
		// parse out task to bash via AppleScript
		findGenericPassword = "do shell script \"security find-generic-password -s 'Me-tada-ta' -w\"";
		var p = app.doScript(findGenericPassword, ScriptLanguage.APPLESCRIPT_LANGUAGE);

		if (p !== null) {
			addMetaData(p)
		} else if (p == null) {
			alert("Password is not set…");
			return;
		}
	}

	// Collect information about Author and Document
	function addMetaData(password) {
		var d = app.activeDocument;
		var u = $.getenv('USER');
		var nameOfDocument = d.name;
		try {
			var pathOfDocument = d.filePath.fsName + "/";
		} catch (e) {
			var pathOfDocument = "";
		}
		var s = "File Name " + nameOfDocument + " Created by " + u + " Location " + pathOfDocument + nameOfDocument;

		var arguments = [s, password];
		var shellScript = 'do shell script "echo \" & item 1 of arguments & " | openssl aes-256-cbc -a -A -salt -pass pass:" & item 2 of arguments';
		var encodedString = app.doScript(shellScript, ScriptLanguage.APPLESCRIPT_LANGUAGE, arguments);

		// Write information to file
		with(d.metadataPreferences) {
			// Clean up after Me-tada-ta 1.0
			author = "";
			documentTitle = "";
			// Add encoded string
			description = encodedString;
		}
	}
