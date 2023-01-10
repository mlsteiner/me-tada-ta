// Name:			Toggle Me-tada-ta for InDesign
// Description:		Enables or disables Me-tada-ta and stores state as a macOS preference file
// Version:			2.0.2
// URL:				https://github.com/mlsteiner/me-tada-ta
// Author:			Mark Steiner
// Date:			2023.01.05

function getPreferences() {
	try {
		readDefaults = "do shell script \"defaults read com.me-tada-ta.helper PluginIsEnabled\"";
		var isEnabled = app.doScript(readDefaults, ScriptLanguage.APPLESCRIPT_LANGUAGE);
		
		if (isEnabled == 1) {
			togglePreferences(false);
			alert("Met-tada-ta has been disabled…");
			return;
		} else if (isEnabled !== 1) {
			togglePreferences(true);
			alert("Me-tada-ta is now enabled…");
			return;
		}
	} catch (e) {
		alert("No preference file found");
		togglePreferences(true);
		alert("Me-tada-ta is now enabled…");
		return;
	}
}

function togglePreferences(s) {
	var arguments = [s]
	writeDefaults = 'do shell script "defaults write com.me-tada-ta.helper PluginIsEnabled -bool " & item 1 of arguments';
	var isEnabled = app.doScript(writeDefaults, ScriptLanguage.APPLESCRIPT_LANGUAGE, arguments);
}

getPreferences();
