function HtmlWindow(window)
{
	this.window = window;
}

HtmlWindow.prototype.htmlDocument = function()
{
	return new HtmlDocument(this.window.content);
}

HtmlWindow.prototype.newTab = function(url)
{
	if(url)
	{
		this.window.gBrowser.addTab(url);
	}
}

