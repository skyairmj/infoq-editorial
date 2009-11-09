function GoogleDoc(authenticationTicket, title, content)
{
	this.title = title;
	this.content = content;
	this.authenticationTicket = authenticationTicket;
	this.docUrlBase = "https://docs.google.com/Doc?docid=";
	this.uploadUrl 	= "https://docs.google.com/feeds/documents/private/full";
}

GoogleDoc.prototype.upload = function()
{
	this.onuploding();
	try
	{
		return this.postDoc();	
	}
	finally
	{
		this.onuploaded();
	}
}
GoogleDoc.prototype.onuploaded = function()
{
	if(this.uploaded)
	{
		this.uploaded();
	}
}
GoogleDoc.prototype.onuploding = function()
{
	if(this.uploading)
	{
		this.uploading();
	}
}
GoogleDoc.prototype.postDoc = function()
{
	var xhr = Services.createXmlHttpRequest(); 
  	xhr.open("POST", this.uploadUrl, false);
  	xhr.setRequestHeader("Authorization", "GoogleLogin auth=" + this.authenticationTicket);
  	xhr.setRequestHeader("Content-Type",'multipart/related; boundary="END_OF_PART"');
  	xhr.setRequestHeader("Content-Length", this.content.length);
  	xhr.setRequestHeader("Slug", this.title);
	xhr.send(this.getPostData(this.title, this.content));

	if(xhr.status != 201)
	{
		throw('Unknown error when uploding:' + xhr.status + " " + xhr.responseText);
	}
	return this.extractDocUrl(xhr.responseText);
}

GoogleDoc.prototype.extractDocUrl = function(xml)
{
	var match = xml.match(/<id>(.+?)document%3A(.+?)<\/id>/i);
	return match? this.docUrlBase + match[2] : null;
}

GoogleDoc.prototype.getPostData =function(title, content)
{
	var atomPart = this.getAtomPart(title);
	var contentPart = this.getContentPart(content);
	var endOfPart = "--END_OF_PART\r\n";
	return endOfPart + atomPart + endOfPart+ contentPart + endOfPart;
}

GoogleDoc.prototype.getAtomPart = function(title)
{
	return "Content-Type: application/atom+xml\r\n\r\n"
				+ "<?xml version='1.0' encoding='utf-8'?>\r\n" 
		    +"<atom:entry xmlns:atom='http://www.w3.org/2005/Atom'>"
				+ " <atom:category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/docs/2007#document' label='document'/>"
				+ " <atom:title>" + title + "</atom:title>"
				+ " </atom:entry>"
				+ "\r\n";
}
GoogleDoc.prototype.getContentPart = function(content)
{
	return "Content-Type: text/html\r\n\r\n"
				+ content
				+ "\r\n";
}

				
