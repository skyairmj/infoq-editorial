function GoogleAccount(username, password)
{
	this.username = username;
	this.password = password;
	this.loginUrl 	= "https://www.google.com/accounts/ClientLogin";
}

GoogleAccount.prototype.authenticate = function()
{
	var xhr = Services.createXmlHttpRequest(); 
	xhr.open("POST", this.loginUrl, false);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("accountType=GOOGLE"
					+"&Email=" + this.username 
					+"&Passwd=" + this.password 
					+"&source=infoq-firefox-addon"
					+"&service=writely");
	switch(xhr.status)
	{
		case 403: 
			throw('Login failed.');
  		case 200: 
			var match = xhr.responseText.match(/Auth=(.+)/);
			if(!match)
			{
				throw('Can not find authentication ticket.');
			}
			return match[1]; 
		default: 
			throw('Unknown error when logining:' + xhr.status + " " + xhr.responseText);
	}
}


