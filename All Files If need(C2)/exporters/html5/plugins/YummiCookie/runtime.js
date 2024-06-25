// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.YummiCookie = function(runtime)
{
	this.runtime = runtime;
};

function _cleanOaVars(s)
{
	var v = s.toString();
    v = v.replace("'","");
    v = v.replace(" or ","");
    v = v.replace(" OR ","");
    v = v.replace(" DROP ","");
    v = v.replace(" drop ","");
    v = v.replace(" DELETE ","");
    v = v.replace(" delete ","");
    v = v.replace(" UNION ","");
    v = v.replace(" union ","");
    v = v.replace(" SELECT ","");

     v = v.replace("DROP ","");
    v = v.replace("drop ","");
    v = v.replace("DELETE ","");
    v = v.replace("delete ","");
    v = v.replace("UNION ","");
    v = v.replace("union ","");
    v = v.replace("SELECT ","");

     v = v.replace(" DROP","");
    v = v.replace(" drop","");
    v = v.replace(" DELETE","");
    v = v.replace(" delete","");
    v = v.replace(" UNION","");
    v = v.replace(" union","");
    v = v.replace(" SELECT","");

    v = v.replace(" UPDATE","");
    v = v.replace("UPDATE ","");
    v = v.replace(" UPDATE ","");

    v = v.replace(" update","");
    v = v.replace("update ","");
    v = v.replace(" update ","");

    v = v.replace(" WHERE ","");
    v = v.replace(" WHERE","");
    v = v.replace("WHERE ","");

    v = v.replace(" where ","");
    v = v.replace(" where","");
    v = v.replace("where ","");


    v = v.replace('"',"");
    v = v.replace(";","");
    v = v.replace("=","");

    return v;
}

(function ()
{
	/////////////////////////////////////
	var pluginProto = cr.plugins_.YummiCookie.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		this.YummiCookie_userName   = this.properties[0];
		this.YummiCookie_password   = this.properties[1];

		var YummiCookie = 
		{
			_userName: 0,
			_password: 0,
			init: function (userName,password) 
			{
				console.log("[YummiCookie] init : "+userName+" / "+password);
				this._userName = _cleanOaVars(userName);
				this._password = _cleanOaVars(password);


			},
			newPlayer: function (_emailAddress,_fullName,_mobileNumber,_acceptedTerms,_showIdin,_showNamein,_erroremail,_errorfullname,_errormobile,_errorterms,success,exists,error) 
			{ 
				console.log("[YummiCookie] POST : "+_emailAddress+" : "+_fullName+" : "+_mobileNumber+" : "+_acceptedTerms+" Show in : "+_showIdin+" : "+_showNamein);

				var _optInMarketing = true;

				_emailAddress = _cleanOaVars(_emailAddress);
				_mobileNumber = _cleanOaVars(_mobileNumber);	
				_acceptedTerms = _cleanOaVars(_acceptedTerms);	

				if(_emailAddress!="" && _fullName!="" && _mobileNumber!="")
				{

					var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // new HttpRequest instance 
					xmlhttp.open("POST", "https://takealot-gamealot-api.poweredbytechsys.co.za/player",true);
					xmlhttp.withCredentials = false;
					xmlhttp.onreadystatechange = function() 
					{
						console.log(xmlhttp.readyState+" "+xmlhttp.status);
				        if (xmlhttp.readyState>3 && xmlhttp.status==201)
				        { 
				        	if(xmlhttp)
			    			{
			    				var res = JSON.parse(xmlhttp.responseText);
			    				console.dir(res);

			    				if(res.id!="" && res.userName!="")
			    				{
			    					console.log("NickName : ("+_showIdin+") "+res.id);
					        		if(document.getElementById(_showIdin)){ document.getElementById(_showIdin).value = res.id; }

					        		console.log("NickName : ("+_showNamein+") "+res.userName);
					        		if(document.getElementById(_showNamein)){ document.getElementById(_showNamein).value = res.userName; }

				    				console.log("New User go to : "+success);
					        		if(success!="")
					        		{ 
					        			console.log("Go to : "+success);
					        			var i=0;var clockResponse;
									    clockResponse = setInterval(function ()
									    { 
									      if(i==1)
									      { 
									        clearTimeout(clockResponse);
									        c2_callFunction(success); 
									      }else{i++;} 
									    },500);
					        			
					        		}
					        	}else
					        	{
					        		if(res.created==false)
			    					{
			    						console.log("NickName : ("+_showIdin+") "+res.id);
					        			if(document.getElementById(_showIdin)){ document.getElementById(_showIdin).value = res.id; }

					        			console.log("NickName : ("+_showNamein+") "+res.userName);
					        			if(document.getElementById(_showNamein)){ document.getElementById(_showNamein).value = res.userName; }

						        		if(exists!="")
						        		{ 
						        			
						        			console.log("Exist User go to : "+exists);
						        			var i=0;var clockResponse;
										    clockResponse = setInterval(function ()
										    { 
										      if(i==1)
										      { 
										        clearTimeout(clockResponse);
										        c2_callFunction(exists); 
										      }else{i++;} 
										    },500);
						        			
						        		}
			    					}else
			    					{
						        			console.log("Error Response !!!!");
						        			c2_callFunction(error);

						        		
					        		}
					        	}	
					        	
								

				    		}else
				    		{
				    			if(xmlhttp.status==495)
				    			{
				    				console.log("Error  : Mobile number or email address is in use by another player // "+xmlhttp.responseText);
					    			if(error!=""){ c2_callFunction(error); }
				    			}else
				    			{
					    			console.log("go to : "+error);
					    			if(error!=""){ c2_callFunction(error); }
				    			}
				    		}
				    	}else
				    	{
				    		if (xmlhttp.readyState>3 && xmlhttp.status==400)
				    		{
				    			if(xmlhttp)
			    				{
			    					var res = JSON.parse(xmlhttp.responseText);
			    					console.dir(res.errors);


			    					if(typeof res.errors.emailAddress !== 'undefined') 
			    					{
			    						console.log("Error E-Mail");	
			    						if(_erroremail!=""){ c2_callFunction(_erroremail); }
			    					}
			    					if(typeof res.errors.mobileNumber !== 'undefined') 
			    					{
			    						console.log("Error Mobile Number");
			    						if(_errormobile!=""){ c2_callFunction(_errormobile); }
			    					}
			    					if(typeof res.errors.fullName !== 'undefined') 
			    					{	
			    						console.log("Error FullName");
			    						if(_errorfullname!=""){ c2_callFunction(_errorfullname); }
			    					}
			    					if(typeof res.errors.acceptedTerms !== 'undefined') 
			    					{
			    						console.log("Error Terminos");
			    						if(_errorterms!=""){ c2_callFunction(_errorterms); }
			    					}

			    				}else
			    				{	
				    				console.log("Error  : Mobile number or email address is in use by another player // "+xmlhttp.responseText);
					    			if(error!=""){ c2_callFunction(error); }
				    			}
				    		}else
				    		{
				    			if (xmlhttp.readyState>3 && xmlhttp.status==495)
				    			{
				    				console.log("Error  : Mobile number or email address is in use by another player // "+xmlhttp.responseText);
					    			if(error!=""){ c2_callFunction(error); }
				    			}
				    		}
				    	}
				    };
				    if(this._userName!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._userName + ":" + this._password)); }
			    	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			    	xmlhttp.setRequestHeader("Content-Type", "application/json");

					xmlhttp.send(JSON.stringify({fullName:_fullName,emailAddress:_emailAddress, mobileNumber:_mobileNumber, acceptedTerms:_acceptedTerms, optInMarketing:_optInMarketing}));
					//c2_callFunction("callResponseOk");
				}else
				{
					console.log("Error [mobileNumber] Empty Values");
					if(error!=""){ c2_callFunction(error); }
				}
				
			},
			getPlayers: function (_skip,_take,_orderBy,_orderDirection,_search,_includeDeleted,_object,success,error)
			{ 
				console.log("[YummiCookie] GET : "+_skip+" : "+_take+" : "+_orderBy+" : "+_orderDirection+" : "+_search+" : "+_includeDeleted);

				_skip = _cleanOaVars(_skip);
				_take = _cleanOaVars(_take);
				_orderBy = _cleanOaVars(_orderBy);
				_orderDirection = _cleanOaVars(_orderDirection);
				_search = _cleanOaVars(_search);
				_includeDeleted	= _cleanOaVars(_includeDeleted);
				_object	= _cleanOaVars(_object);

				var uri = "https://takealot-gamealot-api.poweredbytechsys.co.za/player",_flgUri = false;

				if(_skip!="" || _orderBy!="" || _orderDirection!="" || _search!="" || _includeDeleted!="" || _take!="")
				{
					if(_flgUri==false)
					{
						uri += "?";
						_flgUri = true;
					}
					if(_skip!=""){ uri += "Skip="+_skip; }
					if(_take!=""){ uri += "&Take="+_take; }
					if(_orderBy!=""){ uri += "&Orderby="+_orderBy; }
					if(_orderDirection!=""){ uri += "&OrderDirection="+_orderDirection; }
					if(_search!=""){ uri += "&Search="+_search; }
					if(_includeDeleted!=""){ uri += "&IncludeDeleted="+_includeDeleted; }
				}

				var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				xmlhttp.open('GET', uri,true);
				xmlhttp.withCredentials = false;
				xmlhttp.onreadystatechange = function() 
				{
				        if (xmlhttp.readyState>3 && xmlhttp.status==200)
				        { 
				    		console.log(xmlhttp.responseText);
				    		if(xmlhttp)
				    		{
				    			var res = JSON.parse(xmlhttp.responseText);
				    			console.dir(res);
				    			console.log(res.items.length);
				    			console.log("Object : "+_object);
				    			if(res.items.length>0)
				    			{
						    		console.log(res.items[0].id+" : "+res.items[0].userName);

						    		var c = '';

						    		var el = _object.split(",");

						    		var lu = el[0],ls = el[1];

						    		var selU = document.getElementById(lu);
									for (i = selU.length - 1; i >= 0; i--) 
									{
										selU.remove(i);
									}
									selU.length = 0;

									var selS = document.getElementById(ls);
									for (i = selS.length - 1; i >= 0; i--) 
									{
										selS.remove(i);
									}
									selS.length = 0;

						    		for(var i=0;i<res.items.length;i++)
						    		{
						    			c += res.items[i].id+" : "+res.items[i].userName+"<br>";

										var optU = document.createElement('option');
										optU.appendChild( document.createTextNode(res.items[i].id) );
										optU.value = '0'; 
										selU.appendChild(optU);

										var optS = document.createElement('option');
										optS.appendChild( document.createTextNode(res.items[i].userName) );
										optS.value = '0'; 
										selS.appendChild(optS);

						    		}
				    			}
				    		}else
				    		{
				    			console.log("go to : "+error);
				    			c2_callFunction(error);
				    		}
				    	}
				};
				if(this._userName!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._userName + ":" + this._password)); }
				xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				xmlhttp.setRequestHeader("Content-Type", "application/json");
				xmlhttp.send();
				console.log("Finished GET");
				
			    
			},
			getPlayerId: function (_id,_showin,success,error) 
			{
				console.log("[YummiCookie] GET PLAYER ID : "+_id);
				_id = _cleanOaVars(_id);
				if(_id!="")
				{
					var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				    xmlhttp.open('GET', 'https://takealot-gamealot-api.poweredbytechsys.co.za/player/'+_id,true);
				    xmlhttp.withCredentials = false;
				    xmlhttp.onreadystatechange = function() 
				    {
				        if (xmlhttp.readyState>3 && xmlhttp.status==200)
				        { 
				    		console.log(xmlhttp.responseText);
				    		if(xmlhttp)
				    		{
				    			var res = JSON.parse(xmlhttp.responseText);
				    			if(res.userName!="")
				    			{
				    				console.log("NickName ("+_showin+") : "+res.userName);
				    				if(document.getElementById(_showin)){ document.getElementById(_showin).value = res.userName; }
				    			}
				    			if(success!="")
				    			{ 
				    				console.log("go to : "+success);
				    				var i=0;var clockResponse;
								    clockResponse = setInterval(function ()
								    { 
								      if(i==1)
								      { 
								        clearTimeout(clockResponse);
								        c2_callFunction(success); 
								      }else{i++;} 
								    },500);
				    				
				    			}
				    		}else
				    		{
				    			console.log("go to : "+error);
				    			c2_callFunction(error);
				    		}
				    	}
				    };
				    if(this._userName!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._userName + ":" + this._password)); }
				    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				    xmlhttp.setRequestHeader("Content-Type", "application/json");
				    xmlhttp.send();
				    console.log("Finished GET");
				}else
				{
					console.log("Error [mobileNumber] Empty Value");
					c2_callFunction(error);
				}	
			},
			postScore: function (_mobileNumber,_score,escene1,escene2,escene3,success,error) 
			{ 

				console.log("[YummiCookie] POST : "+_score+" : "+_mobileNumber);

				_mobileNumber = _cleanOaVars(_mobileNumber);	
				_score = _cleanOaVars(_score);

				if(_score!="" && _mobileNumber!="")
				{

					var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // new HttpRequest instance 
					xmlhttp.open("POST", "https://takealot-gamealot-api.poweredbytechsys.co.za/leaderboard",true);
					xmlhttp.withCredentials = false;
					xmlhttp.onreadystatechange = function() 
					{
				        if (xmlhttp.readyState>3 && xmlhttp.status==201)
				        { 
				        	if(xmlhttp)
			    			{
			    				var obj = JSON.parse(xmlhttp.responseText);

			    				console.dir(obj);
			    				if(typeof obj.prize === 'undefined') 
			    				{
			    					console.log("EMPTY PRICE");
				    				if(error!=""){ c2_callFunction(error); }

			    				}else
			    				{	
				    				if(obj.prize.type=="TAKEALOT")
				    				{
				    					if(escene1!=""){ c2_callFunction(escene1); }
				    				}else
				    				{
				    					if(obj.prize.type=="TAKEALOT_PHYSICAL")
				    					{
				    						if(escene2!=""){ c2_callFunction(escene2); }
				    					}else
				    					{
				    						if(obj.prize.type=="GRAND_PRIZE_ENTRY")
				    						{
				    							if(escene3!=""){ c2_callFunction(escene3); }	
				    						}else
				    						{
				    							console.log("go to : "+error);
					    						if(error!=""){ c2_callFunction(error); }
				    						}
				    					}
				    				}
				    			}	
				    		}else
				    		{
				    			console.log("go to : "+error);
				    			if(error!=""){ c2_callFunction(error); }
				    		}
				    	}
				    };
				    if(this._userName!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._userName + ":" + this._password)); }
			    	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			    	xmlhttp.setRequestHeader("Content-Type", "application/json");
					xmlhttp.send(JSON.stringify({mobileNumber:_mobileNumber, score:_score}));
					//c2_callFunction("callResponseOk");
				}else
				{
					console.log("Error [mobileNumber] Empty Values");
					c2_callFunction(error);
				}
				
			},
			getScores: function (_mobileNumber,_take,_object,success,error)
			{
				console.log("[YummiCookie] GET SCORE GLOBAL : "+_mobileNumber);

				_mobileNumber = _cleanOaVars(_mobileNumber);	
				_take = _cleanOaVars(_take);
				_object = _cleanOaVars(_object);

				if(_take!="")
				{
					var uri = "https://takealot-gamealot-api.poweredbytechsys.co.za/leaderboard/global/"+_take;
					if(_mobileNumber!="")
					{
						uri += "?mobileNumber="+_mobileNumber;
					}
					var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				    xmlhttp.open('GET',uri,true);
				    xmlhttp.withCredentials = false;
				    xmlhttp.onreadystatechange = function() 
				    {
				        if (xmlhttp.readyState>3 && xmlhttp.status==200)
				        { 
				    		console.log(xmlhttp.responseText);
				    		var obj = JSON.parse(xmlhttp.responseText);
				    		if(obj.length>0)
				    		{

				    		console.dir(obj);
				    		console.log(obj.length);
				    		console.log(obj[0].username+" : "+obj[0].score);
				    		var c = '';

				    		var el = _object.split(",");

				    		var lu = el[0],ls = el[1];

				    		var selU = document.getElementById(lu);
							for (i = selU.length - 1; i >= 0; i--) 
							{
								selU.remove(i);
							}
							selU.length = 0;

							var selS = document.getElementById(ls);
							for (i = selS.length - 1; i >= 0; i--) 
							{
								selS.remove(i);
							}
							selS.length = 0;

				    		for(var i=0;i<obj.length;i++)
				    		{
				    			c += obj[i].username+" : "+obj[i].score+"<br>";

								var optU = document.createElement('option');
								optU.appendChild( document.createTextNode(obj[i].username) );
								optU.value = '0'; 
								selU.appendChild(optU);

								var optS = document.createElement('option');
								optS.appendChild( document.createTextNode(obj[i].score) );
								optS.value = '0'; 
								selS.appendChild(optS);

				    		}


				    		//document.getElementById(_object).value = c;

				    		}
				    	}
				    };
				    if(this._userName!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._userName + ":" + this._password)); }
				    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				    xmlhttp.setRequestHeader("Content-Type", "application/json");
				    xmlhttp.send();
				    console.log("Finished GET");
				}else
				{
					console.log("Error [mobileNumber] Empty Value");
					c2_callFunction(error);
				}
			},
			getScore: function (_mobileNumber,_take,_object,success,error)
			{
				console.log("[YummiCookie] GET SCORE CURRENT : "+_mobileNumber);

				_mobileNumber = _cleanOaVars(_mobileNumber);	
				_take = _cleanOaVars(_take);
				_object = _cleanOaVars(_object);

				if(_take!="")
				{
					var uri = "https://takealot-gamealot-api.poweredbytechsys.co.za/leaderboard/current/"+_take;
					if(_mobileNumber!="")
					{
						uri += "?mobileNumber="+_mobileNumber;
					}
					var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				    xmlhttp.open('GET',uri,true);
				    xmlhttp.withCredentials = false;
				    xmlhttp.onreadystatechange = function() 
				    {
				        if (xmlhttp.readyState>3 && xmlhttp.status==200)
				        { 
				    		console.log(xmlhttp.responseText);
				    		var obj = JSON.parse(xmlhttp.responseText);
				    		if(obj.length>0)
				    		{

				    		console.dir(obj);
				    		console.log(obj.length);
				    		console.log(obj[0].username+" : "+obj[0].score);
				    		var c = '';

				    		var el = _object.split(",");

				    		var lu = el[0],ls = el[1];

				    		var selU = document.getElementById(lu);
							for (i = selU.length - 1; i >= 0; i--) 
							{
								selU.remove(i);
							}
							selU.length = 0;

							var selS = document.getElementById(ls);
							for (i = selS.length - 1; i >= 0; i--) 
							{
								selS.remove(i);
							}
							selS.length = 0;

				    		for(var i=0;i<obj.length;i++)
				    		{
				    			c += obj[i].username+" : "+obj[i].score+"<br>";

								var optU = document.createElement('option');
								optU.appendChild( document.createTextNode(obj[i].username) );
								optU.value = '0'; 
								selU.appendChild(optU);

								var optS = document.createElement('option');
								optS.appendChild( document.createTextNode(obj[i].score) );
								optS.value = '0'; 
								selS.appendChild(optS);

				    		}


				    		//document.getElementById(_object).value = c;

				    		}
				    		
				    	}else
				    	{
				    		console.log("go to : "+error);
				    		if(error!=""){ c2_callFunction(error); }
				    	}
				    };
				    if(this._userName!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._userName + ":" + this._password)); }
				    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				    xmlhttp.setRequestHeader("Content-Type", "application/json");
				    xmlhttp.send();
				    console.log("Finished GET");
				}else
				{
					console.log("Error [mobileNumber] Empty Value");
					c2_callFunction(error);
				}
			},
			apiLoaded: function () { return (this.apiObject ? true : false) }
		};

		this.YummiCookie = YummiCookie;
		this.YummiCookie.init(this.YummiCookie_userName,this.YummiCookie_password);
	};
	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.newPlayer = function (_emailAddress,_fullName,_mobileNumber,_acceptedTerms,_showIdin,_showNamein,_erroremail,_errorfullname,_errormobile,_errorterms,success,exists,error)
	{
		this.YummiCookie.newPlayer(_emailAddress,_fullName,_mobileNumber,_acceptedTerms,_showIdin,_showNamein,_erroremail,_errorfullname,_errormobile,_errorterms,success,exists,error);
	};
	
	Acts.prototype.getPlayers = function (_skip,_take,_orderBy,_orderDirection,_search,_includeDeleted,_showin,success,error)
	{
		this.YummiCookie.getPlayers(_skip,_take,_orderBy,_orderDirection,_search,_includeDeleted,_showin,success,error);
	};
	Acts.prototype.getPlayerId = function (_id,_showin,success,error)
	{
		this.YummiCookie.getPlayerId(_id,_showin,success,error);
	};

	Acts.prototype.postScore = function (_mobileNumber,_score,escene1,escene2,escene3,escene4,success,error)
	{
		this.YummiCookie.postScore(_mobileNumber,_score,escene1,escene2,escene3,escene4,success,error);
	};

	Acts.prototype.getScores = function (_mobileNumber,_take,_object,success,error)
	{
		this.YummiCookie.getScores(_mobileNumber,_take,_object,success,error);
	};
	Acts.prototype.getScore = function (_mobileNumber,_take,_object,success,error)
	{
		this.YummiCookie.getScore(_mobileNumber,_take,_object,success,error);
	};


	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};
	pluginProto.exps = new Exps();

}());