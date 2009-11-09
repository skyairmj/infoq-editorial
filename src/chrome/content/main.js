function start()
{
	var htmlWindow = new HtmlWindow(window);
	var addon = new Addon(htmlWindow);
	try
	{	
		addon.extractAndUploadToGoogleDoc();
	}
	catch(exception)
	{
		handleException(exception);
	}
}


function handleException(exception)
{
	alert(exception);
}
