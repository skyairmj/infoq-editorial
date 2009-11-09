function Addon(htmlWindow)
{
	this.htmlWindow = htmlWindow;
	this.htmlDocument = htmlWindow.htmlDocument();
}

Addon.prototype.extractAndUploadToGoogleDoc = function()
{
	var entry = InfoQEntryFactory.create(this.htmlDocument);
	var account = this.getUserAccount();
	if(account) 
	{
		var ticket = this.loginGoogle(account);	
		var gdocUrl = this.uploadToGoogleDoc(ticket, entry);
		this.open(gdocUrl);
	}
}

Addon.prototype.getUserAccount = function()
{
	return Services.getUsernameAndPassword();
}


Addon.prototype.uploadToGoogleDoc = function(ticket, entry)
{
	var progressBar = new ProgressBar(this.htmlDocument, "Uploading..."); 

	var gDoc = new GoogleDoc(ticket, entry.getTitle(), entry.getContent());
	gDoc.uploading = function() {progressBar.show();};
	gDoc.uploaded = function() {progressBar.hide();};

	return gDoc.upload();
}

Addon.prototype.loginGoogle = function(account)
{
	var googleAccount = new GoogleAccount(account.username, account.password);
	return googleAccount.authenticate();
}

Addon.prototype.open = function(url)
{
	this.htmlWindow.newTab(url);
}
