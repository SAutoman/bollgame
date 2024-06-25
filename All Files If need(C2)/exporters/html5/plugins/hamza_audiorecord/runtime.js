
// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.Hamza_AudioEx = function(runtime)
{
	this.runtime = runtime;
    
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.Hamza_AudioEx.prototype;
		
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
    var base64;
    var mediaRecorder;
    var micRec = {
    
    ogg64: '',
    oldogg: '',
    isRec:false,
    ErrorText:'',
    UserAccess:false,
    interval : 2000
    
    
    }
    
   function stopRec() {
       
       mediaRecorder.stop();
        micRec.isRec = false;
       
   }

        
            function onMediaSuccess(stream) {
                
                

                micRec.isRec = true;
    var mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/ogg';
    mediaRecorder.audioChannels = 1;
    mediaRecorder.ondataavailable = function (blob) {
       
        micRec.ogg64 = URL.createObjectURL(blob);
        
        var reader = new window.FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
                base64 = reader.result;                
               
  }
        
  
    };
    var interval = micRec.interval
    mediaRecorder.start(interval);
                micRec.UserAccess = true;   // when user allowed access Condition OnPermisstion
                micRec.ErrorText = "";
               ;
            }

            function onMediaError() {
               micRec.UserAccess = false;  // when user denied access or other error Condition.OnError
                micRec.ErrorText = "User Denied Acess";
            }


	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
                // Record Intervale here.

	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.IsAccessing = function ()
	{
    
        if(micRec.UserAccess == true){
	return true;}
        else
        { return false; }
        
			// for ef_return_string
	
	};
    
    Cnds.prototype.OnUserDeny = function ()
	{
	return true;
        
			// for ef_return_string
	
	};
    
    Cnds.prototype.IsDataAvalaible = function ()
	{
        
    if (micRec.ogg64 != '' && micRec.ogg64 != micRec.oldogg){
	return true;
    micRec.oldogg = mcRec.ogg64;
    }
        else { return false;}
        
			// for ef_return_string
	
	};
    
     Cnds.prototype.IsRecording = function ()
	{
         if (micRec.isRec == true)
         {
	return true;}
         else{
             return false;
         }
        
			// for ef_return_string
	
	};
    
     Cnds.prototype.OnRecorded = function ()
	{
	return true;
        
			// for ef_return_string
	
	};
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.startRecord = function (source)
	{
        		// alert the message --------------------------------------------------------------------------
            if (source!=''){
            var audio = document.createElement('audio');
                audio = mergeProps(audio, {
                    controls: true,
                    src: source
                     });
                audio.play();
                
        // record action -------------------------------------------------------------------------------
            }
	};
    
    Acts.prototype.stopRecord = function ()
	{
		// alert the message
		
        
        
	};
    
    Acts.prototype.userRequest = function (interval)
	{
		// alert the message
        if (interval < 500){
            micRec.interval = 1000}
        else {
        micRec.interval = interval;
        }
      navigator.getUserMedia({ audio: true }, onMediaSuccess, onMediaError);         
            
        
        
	};
	
	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// the example expression
	Exps.prototype.WavBlob = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		//ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
        ret.set_string(micRec.ogg64);		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
    
    Exps.prototype.ErrorText = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		
        ret.set_string(micRec.ErrorText);		// for ef_return_string
	};
    
    
    Exps.prototype.WavBase64 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
        
        //var base64 = window.btoa(micRec.ogg64);
        
        ret.set_string(base64);		// for ef_return_string
	};
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());
