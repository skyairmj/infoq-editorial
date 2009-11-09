function ProgressBar(htmlDocument, text)
{
	this.progress = this.createProgressElement(htmlDocument, text);
	htmlDocument.addElement(this.progress);
}

ProgressBar.prototype.createProgressElement = function(htmlDocument, text)
{
	var progress = htmlDocument.createElement('span');
	progress.setAttribute('style', 'background-color:red;color:white;position:fixed;right:5px;top:5px;padding:5px; display:none;');
	var content = htmlDocument.createTextNode(text);
	progress.appendChild(content);
	return progress;	
}

ProgressBar.prototype.show = function()
{
	this.progress.style.display = '';	
}

ProgressBar.prototype.hide = function()
{
	this.progress.style.display = 'none';	
}
