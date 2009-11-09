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

function checkWindowPage()
{
	url = window.content.location.href
	isInfoqNewsOrArticle = url.search(/www.infoq.com\/news\/\d{4}\/\d{2}\/.+/i) > 0 || url.search(/www.infoq.com\/articles\/.+/i) > 0;
	document.getElementById("infoq-news-conversion").hidden = !isInfoqNewsOrArticle;
}

function handleException(exception)
{
	alert(exception);
}
