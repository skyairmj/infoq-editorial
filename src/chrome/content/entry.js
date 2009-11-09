function InfoQEntryFactory()
{
}

InfoQEntryFactory.create = function(htmlDocument)
{
	var url = htmlDocument.url();
	if(url.search(/www.infoq.com\/news\/\d{4}\/\d{2}\/.+/i) > -1
	|| url.search(/www.infoq.com\/articles\/.+/i) > -1)
	{
		return new InfoQEntry(htmlDocument);
	}

	throw "Not an InfoQ news or article.";
}

function InfoQEntry(htmlDocument)
{
	this.html = htmlDocument.html();
	this.url = htmlDocument.url();

	this.titlePattern = /<div class="box-content-5">[\s\S]*<h1>([^<]+?)<\/h1>/mi;
	this.abstractPattern = /<meta name="description" content="(.+?)"/mi;
	this.bodyPattern = /<dl class="tags2">[\s\S]*<\/dl>([\s\S]*?)<div style=".+">[\s\S]*<dl class="tags3">/mi;
	this.articleAdsPattern = /<div class="vendor-content-box-float">([\s\S]*?)<\/div>([\s\S]*?)<\/div>/mi;
}

InfoQEntry.prototype.getTitle = function()
{
	return this.getText(this.titlePattern);
}

InfoQEntry.prototype.getAbstract = function()
{
	return this.getText(this.abstractPattern);
}

InfoQEntry.prototype.getBody = function()
{
	return this.getText(this.bodyPattern).replace(this.articleAdsPattern, '');
}

InfoQEntry.prototype.getContent = function()
{
	return "<p>标题：" + this.getTitle() + "</p>"
			+ "<p>摘要：<br/>" + this.getAbstract() + "</p>"
			+ "<p>正文：<br/>" + this.getBody() +"</p>"
			+ "<b>查看英文原文：</b><a href='" + this.url + "'>" + this.getTitle() + "</a>";
}

InfoQEntry.prototype.getText = function(pattern)
{
	var match = this.html.match(pattern);
	return match? match[1] : "";
}
