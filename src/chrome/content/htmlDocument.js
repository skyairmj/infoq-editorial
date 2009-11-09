function HtmlDocument(windowContent)
{
	this.location = windowContent.location;
	this.document = windowContent.document;
}

HtmlDocument.prototype.url = function()
{
	return this.location.href;
}

HtmlDocument.prototype.html = function()
{
	return this.document.documentElement.innerHTML;
}

HtmlDocument.prototype.createElement = function(tag)
{
	return this.document.createElement(tag);
}

HtmlDocument.prototype.createTextNode = function(text)
{
	return this.document.createTextNode(text);
}

HtmlDocument.prototype.addElement = function(element)
{
	this.body().appendChild(element);
}

HtmlDocument.prototype.body = function()
{
	return this.document.getElementsByTagName('body')[0];
}
