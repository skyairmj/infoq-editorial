function Services(){}
Services.copyToClipboard = function(text)
{
	var clipboard = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);  
	clipboard.copyString(text);
}

Services.createXmlHttpRequest = function()
{
	return Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
}

Services.getUsernameAndPassword = function()
{
	var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	username 	= {value:""};
	password 	= {value:""};
	okClicked = prompts.promptUsernameAndPassword(window, 'Login', 'Please provide your google account information to access google doc.', username, password, null, {});
	return okClicked? { username: username.value, password: password.value} : null;
}

				
