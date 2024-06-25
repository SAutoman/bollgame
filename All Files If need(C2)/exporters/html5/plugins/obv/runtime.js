// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Obv = function(runtime)
{
	this.runtime = runtime;
};
function onlyNumbers(s)
{
	if (/^([0-9])*$/.test(s))
	{
		console.log("Ok");
		return true;
	}else
	{
		console.log("Error : only Letters");
		return false;
	}
}
function onlyLetters(s)
{
	var letters = /^[A-Za-z]+$/;
	if(s.match(letters))
	{
	    console.log('Your name have accepted : you can try another');
	    return true;
	}
	else
	{
	    console.log('Error: Please input alphabet characters only');
	    return false;
	}
}
function _cleanOaVars(s)
{
	if(s!="")
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
	}else
	{
		v = 0;
	}
    return v;
}

(function ()
{
	/////////////////////////////////////
	var pluginProto = cr.plugins_.Obv.prototype;

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
		this.lastData = "";
		this.curTag = "";
		this.progress = 0;
		this.timeout = -1;
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		this.Obv_username   = this.properties[0];
		this.Obv_password   = this.properties[1];
		this.Obv_gamekey   = this.properties[2];

		var self = this;

		var Obv = 
		{
			_username: 0,
			_password: 0,
			_gamekey:0,
			init: function (username,password,gamekey) 
			{
				console.log("[Obv] init");
				this._username = _cleanOaVars(username);
				this._password = _cleanOaVars(password);
				this._gamekey = _cleanOaVars(gamekey);

			},
			postScore: function (_nickname,_score,success,error,self) 
			{ 

				console.log("[Obv] POST : "+_score+" : "+_nickname);

				_nickname = _cleanOaVars(_nickname);	
				_score = _cleanOaVars(_score);

				var _action = "scores";

				if( this._gamekey!="" && typeof this._gamekey !== 'undefined' && typeof _score !== 'undefined' && _score!="" && typeof _nickname !== 'undefined' && _nickname!="" && onlyNumbers(_score) && onlyLetters(_nickname))
				{

					var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // new HttpRequest instance 
					xmlhttp.open("POST", "//kiz10.games/apigames/setscores",true);
					xmlhttp.withCredentials = false;
					xmlhttp.onreadystatechange = function() 
					{
				        if (xmlhttp.readyState>3 && xmlhttp.status==201)
				        { 
				        	if(xmlhttp)
			    			{
			    				console.log("go to : "+success);
				        		if(success!=""){ c2_callFunction(success); }
				    		}else
				    		{
				    			console.log("go to : "+error);
				    			if(error!=""){ c2_callFunction(error); }
				    		}
				    	}
				    };
				    if(this._username!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._username + ":" + this._password)); }
			    	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			    	xmlhttp.setRequestHeader("Content-Type", "application/json");
					xmlhttp.send(JSON.stringify({action:_action,key:this._gamekey,nickname:_nickname, score:_score}));
				
				}else
				{
					console.log("Error [nickname] Empty Values");
					c2_callFunction(error);
				}
				
			},
			getScores: function (_take,_nickname,success,error,self)
			{
				console.log("[Obv] GET SCORE GLOBAL : "+_nickname);

				_nickname = _cleanOaVars(_nickname);	
				_take = _cleanOaVars(_take);

				if( typeof _score !== 'undefined' && _score!="" && typeof _nickname !== 'undefined' && _nickname!="" && onlyNumbers(_score) && onlyLetters(_nickname))
				{

					if(this._gamekey!="" && typeof this._gamekey !== 'undefined' && typeof _take !== 'undefined' && _take!="" && onlyNumbers(_take) && parseInt(_take)>0)
					{
						var uri = "//kiz10.games/apigames/getscores/scores/"+this._gamekey+"/"+_take+"/";

						if(_nickname!="")
						{
							uri += "?nickname="+_nickname;
						}
						var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
					    xmlhttp.open('GET',uri,true);
					    xmlhttp.withCredentials = true;
					    xmlhttp.onreadystatechange = function() 
					    {
					        if (xmlhttp.readyState>3 && xmlhttp.status==200)
					        { 
					    		var obj = JSON.parse(xmlhttp.responseText);
					    		if(obj.success)
					    		{

						    		var c = '';

						    		var id = 1;
									var returnString = "",returnAvatars = "",returnScores = "";
						    		for(var i=0;i<obj.items;i++)
						    		{
						    			if(obj.games[i].avatar!="" && typeof obj.games[i].avatar !== 'undefined' && obj.games[i].score!="" && typeof obj.games[i].score !== 'undefined')
						    			{
											returnString += id+" - "+obj.games[i].avatar+" [ "+obj.games[i].score+" Kills ];";
											if(i==0)
											{
												returnAvatars += obj.games[i].avatar;
												returnScores += obj.games[i].score;
											}else
											{	
												returnAvatars += "-"+obj.games[i].avatar;
												returnScores += "-"+obj.games[i].score;
											}
											id++;
										}
						    		}

						    		returnString = returnAvatars+";"+returnScores+";";

						    		console.log("ITEMS : "+returnString);

						    		self.lastData = returnString;
						    		self.runtime.trigger(cr.plugins_.Obv.prototype.cnds.OnAnyComplete, self);


					    		}
					    	}
					    };
					    if(this._username!="" && this._password!=""){ xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa(this._username + ":" + this._password)); }
					    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					    xmlhttp.setRequestHeader("Content-Type", "application/json");
					    xmlhttp.send();
					    console.log("Finished GET");
					}else
					{
						console.log("Error [nickname] Empty Value");
						c2_callFunction(error);
					}
				}
			},
			apiLoaded: function () { return (this.apiObject ? true : false) }
		};

		this.Obv = Obv;
		this.Obv.init(this.Obv_username,this.Obv_password,this.Obv_gamekey);
	};
	
	instanceProto.saveToJSON = function ()
	{
		return { "lastData": this.lastData };
	};
	instanceProto.loadFromJSON = function (o)
	{
		this.lastData = o["lastData"];
		this.curTag = "";
		this.progress = 0;
	};
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.OnComplete = function (tag)
	{
		console.log("Returning : "+this.curTag);
		return cr.equals_nocase(tag, this.curTag);
	};

	Cnds.prototype.OnAnyComplete = function (tag)
	{
		return true;
	};
	
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	

	Acts.prototype.postScore = function (_nickname,_score,success,error)
	{
		this.self = this;
		this.Obv.postScore(_nickname,_score,success,error,this.self);
	};

	Acts.prototype.getScores = function (_take,_nickname,success,error)
	{
		this.self = this;
		this.Obv.getScores(_take,_nickname,success,error,this.self);
	};

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.LastData = function (ret)
	{
		ret.set_string(this.lastData);
	};

	pluginProto.exps = new Exps();

}());