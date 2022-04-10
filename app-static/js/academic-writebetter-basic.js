//polifills
Array.prototype.clean=function(t){for(var r=0;r<this.length;r++)this[r]==t&&(this.splice(r,1),r--);return this};
"path"in Event.prototype||Object.defineProperty(Event.prototype,"path",{get:function(){for(var t=[],e=this.target;e;)t.push(e),e=e.parentElement;return-1===t.indexOf(window)&&-1===t.indexOf(document)&&t.push(document),-1===t.indexOf(window)&&t.push(window),t}});
Array.prototype.forEach||(Array.prototype.forEach=function(r,t){"use strict";var o,n;if(null==this)throw new TypeError("this is null or not defined");var i,e=Object(this),c=e.length>>>0;if("[object Function]"!=={}.toString.call(r))throw new TypeError(r+" is not a function");for(2<=arguments.length&&(o=t),n=0;n<c;)n in e&&(i=e[n],r.call(o,i,n,e)),n++});
window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(o,t){t=t||window;for(var i=0;i<this.length;i++)o.call(t,this[i],i,this)});
String.prototype.startsWith||(String.prototype.startsWith=function(t,r){return r=r||0,this.indexOf(t,r)===r});
var UID={_current:0,getNew:function(){return this._current++,this._current}};
HTMLElement.prototype.pseudoStyle=function(e,t,n){var d="pseudoStyles",a=document.head||document.getElementsByTagName("head")[0],l=document.getElementById(d)||document.createElement("style");l.id=d;var m="pseudoStyle"+UID.getNew();return this.className+=" "+m,l.innerHTML+=" ."+m+":"+e+"{"+t+":"+n+"}",a.appendChild(l),this};
function eventFire(e,n){if(e.fireEvent)e.fireEvent("on"+n);else{var t=document.createEvent("Events");t.initEvent(n,!0,!1),e.dispatchEvent(t)}}
Element.prototype.remove=function(){this.parentElement.removeChild(this)};
NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var e=this.length-1;0<=e;e--)this[e]&&this[e].parentElement&&this[e].parentElement.removeChild(this[e])};
Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(e,r){if(null==this)throw new TypeError('"this" es null o no est? definido');var t=Object(this),n=t.length>>>0;if(0==n)return!1;var i,o,a=0|r,u=Math.max(0<=a?a:n-Math.abs(a),0);for(;u<n;){if((i=t[u])===(o=e)||"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))return!0;u++}return!1}});


var elementBase;
var extendedContext=true;
var corpusType=[];corpusType[5]="Wikipedia Best",corpusType[500]="Wikipedia",corpusType[25]="Wikipedia Good",corpusType[2500]="Wikipedia",corpusType[30]="Research",corpusType[3e3]="Research",corpusType[40]="Research",corpusType[50]="Wikipedia",corpusType[5e3]="Wikipedia",corpusType[60]="Literature",corpusType[6e3]="Literature";
var WbVersion;
var port;
var logged=false;
var demoLoadingMessage="Please wait...";
var freeLoadingMessage="Please wait...";
var premiumLoadingMessage="Please wait...";
var generatedToken="";
var clearLogin="";
var lastCorrectionsHTML="";
var currentFunction;
var wordVariations=false;
var statisticSuggestions;
var usrEmail="anonymous";
var ruleSuggestions;
var statisticLoaded=false;
var ruleLoaded=false;
var baseUrl=location.href.split("#")[0];
var subscriptionType;
var dictNormal=false;
var dictMore=false;
var allString = ' ';
var problemsTimeout = 0;
var trialExpired=true;
var translateLanguages=['Any language/English','Spanish/English','Portuguese/English','German/English','French/English','Italian/English','Swedish/English','Dutch/English','Finnish/English','Danish/English','English/Spanish','English/Portuguese','English/German','English/French','English/Italian','English/Swedish','English/Dutch','English/Finnish','English/Danish'];
var request;
var request2;
var request3;
var currentTranslate=translateLanguages[0];
var wbAvailable=true;
var remainingSearchesForDay=3;
var timeToResetFreeSearches=3;
var wbAuthToken="";
var wbTmpUsr="";
var liveRes="";
var liveTimeout=0;
var liveActivation=0;
var baseUrlDir="https://"+window.location.hostname+"/";
var baseUrlSite="https://writebetter.io/";
var tmpString;
var viewType="compact";
if (location.href.endsWith("extended/")){
	viewType="extended"
}

window.writebetter = (function () {




	var registerCTAForm = '<div class="ctaForm" id="registerCTAForm">'+
	'			<p><img width="200px" src="app-static/img/logo.png" /></p>'+
	'			<h4 id="titleCTA">Select an option</h4>'+
	'			<div class="ctaBtn" style="display:none;" id="loginGoogle">Continue with Google</div></br >'+		
	'			<p id="separatorExLogin" style="display:none;">&horbar;&horbar; or continue with email &horbar;&horbar;</p>  <div class="ctaBtn" id="registerCTA">Sign up</div> </br > '+	
	'			<div class="ctaBtn" id="loginCTA">Log in</div>'+
	
	'			<p id="termsConditions">By continuing, you agree to the <span>Terms and Conditions</span>.</p>'+
	'		</div>';
	


	var directSearch=false;
	var externalChromeConnected=false;
	var callback = {
		init: function () {
			document.getElementById("loadingMsg").innerHTML=demoLoadingMessage;


			try {
				Office.initialize = function (reason) {
					if (!Office.context.requirements.isSetSupported('WordApi', '1.1')) {
						extendedContext=false;
					}
					Office.context.document.addHandlerAsync("documentSelectionChanged", writebetter.getWordSelection, function(result){} );
					//console.log("setting word");
					WbVersion="Office";
				};
			}
			catch(err) {
				//console.log("Out of Word", err)
			}
			

			window.onresize = function(){
				writebetter.adjustSizeContents();
				writebetter.alignContextsNavigator();
				if (writebetter.getActiveFunction()=="Correction" || writebetter.getActiveFunction()=="Dictionary" || writebetter.getActiveFunction()=="Translate")
					return;
				eval('writebetter.align' + writebetter.getActiveFunction() +'()');
				if (typeof adjustBarContext === "function") { 
					adjustBarContext();
				}
			};
			
			writebetter.adjustSizeContents();
			currentFunction=document.getElementsByClassName("factive")[0].id;
			writebetter.showHelp();
				

			
	
			////console.log(location.pathname.split("/")[2].replaceAll("+"," "));
			//document.getElementById("searchField").value=writebetter.replaceAll(location.pathname.split("/")[2],"+"," ");
			writebetter.performSearch();
			
			
			document.getElementById("loadingProblems").onclick = function(ev){
				location.reload();
			};
			/*
			document.getElementById("logo").onclick = function(ev){
				window.open("https://writebetter.io/");
			};
			*/

			document.getElementById("startAgain").onclick = function(ev){
				location.reload();
			};
			
			document.getElementById("Contexts").onclick = function(ev){
				//writebetter.resetContextExtended();
				writebetter.setActiveFunction(ev.target.id);
			};
			
			document.getElementById("Translate").onclick = function(ev){
				writebetter.setActiveFunction(ev.target.id);
			};
			
			document.getElementById("Dictionary").onclick = function(ev){
				writebetter.setActiveFunction(ev.target.id);
			};

			document.getElementById("Help").onclick = function(ev){
				document.getElementById("searchField").value="";
				writebetter.setActiveFunction(writebetter.getActiveFunction());
			};

			document.getElementById("searchField").onfocus = function(ev){
				document.getElementById("searchSuggestions").style.display="block";
			};
			
			document.getElementById("searchField").onblur = function(ev){
				setTimeout(function(){ document.getElementById("searchSuggestions").style.display="none"; }, 200);
				
			};
			
			document.getElementById("searchField").onclick = function(ev){
				ev.stopPropagation();
			};

			
			document.getElementById("searchField").onkeypress = function(ev){
				if (ev.keyCode == 13) {
					ev.preventDefault();
					////console.log(document.getElementById("searchField").value.trim().replaceAll(" ","+"));
					
					keyword = document.getElementById("searchField").value.trim().replace(/[^a-z0-9]/gi, ' ').replace(/ +(?= )/g,'').toLowerCase().trim();
					
					directSearch=true;
					//deleteText=false;
					document.getElementById("searchField").blur();
					deleteText=true;
					
					writebetter.setActiveFunction(writebetter.getActiveFunction());
					//location.href=writebetter.replaceAll("https://writebetter.io/examples/"+document.getElementById("searchField").value.trim().replace(/[^a-zA-Z1-9\-' ]/g, " ").replace(/ +(?= )/g,'')," ","+")+"/"+viewType+"/";
				}
			};


			


		}, 
		
		
		
		
		getWordSelection: function(eventArgs) {
			function WBGetCotext() {
				Word.run(function (context) {
					var sentences = context.document.getSelection().expandTo(context.document.getSelection().paragraphs.getFirst().getRange("end")).getTextRanges([" "], false);
					context.load(sentences);
					
					var sentences2 = context.document.getSelection().expandTo(context.document.getSelection().paragraphs.getFirst().getRange("start")).getTextRanges([" "], false);
					context.load(sentences2);
					
					return context.sync().then(function () {
						right="";
						left="";
						
						try {
							right+=sentences.items[1].text;
						} catch(e) {}
						
						try {
							right+=" "+sentences.items[2].text;
						} catch(e) {}
							
						try {
							left+=sentences2.items[sentences2.items.length-3].text;
						} catch(e) {}
						
						try {
							left+=" "+sentences2.items[sentences2.items.length-2].text;
						} catch(e) {}
						//console.log(left, "-" , right);
						writebetter.setActiveFunction(writebetter.getActiveFunction(), left.trim().replace(/ +(?= )/g,''), right.trim().replace(/ +(?= )/g,''));
					});
				});
			}

			eventArgs.document.getSelectedDataAsync(Office.CoercionType.Text, function (asyncResult) {
				if (asyncResult.status == Office.AsyncResultStatus.Failed) {
					//console.log('Cannot access the document: ' + asyncResult.error.message);
				} else {
					document.getElementById("correctionNavigator").style.display="none";
					document.getElementById("resultsNavigator").style.display="none";

					if (asyncResult.value) {
						//console.log('Selected data: ' + asyncResult.value);
						document.getElementById("searchField").value=asyncResult.value;
						
						if (extendedContext) {
							WBGetCotext();
						} else {
							writebetter.setActiveFunction(writebetter.getActiveFunction());
						}
					}  else {
						if (extendedContext) {
							Word.run(function (context) {
								var sentences2 = context.document.getSelection().expandTo(context.document.getSelection().paragraphs.getFirst().getRange("start")).getTextRanges([" "], false);
								context.load(sentences2);
								
								var sentences = context.document.getSelection().expandTo(context.document.getSelection().paragraphs.getFirst().getRange("end")).getTextRanges([" "], false);
								context.load(sentences);
								
								return context.sync().then(function () {
									right="";
									left="";
									live="";
									
									for(var i=1; i<24; i++){
										try {
										right+=sentences.items[i].text;
										} catch(e) {}
									}
									
									for(var j=24; j>0; j--){
										try {
										left+=sentences2.items[sentences2.items.length-j].text;
										}catch(e) {}
									}

									try {
										live+=" "+sentences2.items[sentences2.items.length-3].text;
									}catch(e) {}
									try {
										live+=" "+sentences2.items[sentences2.items.length-2].text;
									}catch(e) {}
									
									try {
										live+=" "+sentences2.items[sentences2.items.length-1].text;
									}catch(e) {}
									
									
									//console.log(left);
									liveRes=live.trim();
									liveActivation++;
									clearTimeout(liveTimeout);
									liveString=liveRes.replace(/ +(?= )/g,''), (left+" "+right).replace(/ +(?= )/g,'');
									liveTimeout=setTimeout(function(){ 
										//console.log(liveString)
										writebetter.searchContextsNew(liveString,"WBLiveResults","");
									}, 1500);
								});
							});
						}
					} 
				}
			});

			
		},
		
		
		

		performSearch: function() {
			document.getElementById("searchField").value=document.getElementById("searchField").value.trim();
			directSearch=true;
					//deleteText=false;
			document.getElementById("searchField").blur();
			deleteText=true;
					//writebetter.resetContextExtended();
			writebetter.setActiveFunction(writebetter.getActiveFunction());
			document.getElementById("chromeMessageAddin").style.display="none";
		},

		
		setActiveFunction: function(name, left, right) {
			
			liveActivation=0;
			
			document.getElementById("didYouMean").style.display = "none";
			wbAvailable=false;

			var functions = document.getElementsByClassName("functionButton");
			for (var i = 0; i < functions.length; i++) {
				functions[i].classList.remove("factive");
			}
			document.getElementById(name).classList.add("factive");
			currentFunction=name;
			writebetter.hideContextsBar();
			writebetter.hideContextAlternatives();
			
			writebetter.showHelp();
			//document.getElementById("barCTranslate").style.display = "none";
			
			document.getElementById("searchField").style.visibility = "visible";
			
			if (name=="Translate") {
				
				document.getElementById("searchField").placeholder = "Search in translator";
			} else if (name=="Contexts") {
				document.getElementById("searchField").placeholder = "Search";
			} else {
				document.getElementById("searchField").placeholder = "Search in dictionary";
			}
			
			
			
			if (document.getElementById("searchField").value!="") {
				document.getElementById("suggestionContainer").innerHTML="";

				switch (writebetter.getActiveFunction()) {
				  case "Contexts":
					writebetter.searchContextsNew(document.getElementById("searchField").value.trim(), left, right)
					break;
				  case "Translate":
					writebetter.searchTranslate(document.getElementById("searchField").value.trim())
					break;
				  case "Dictionary":
					writebetter.searchDictionary(document.getElementById("searchField").value.trim())
				  break;

				}
				
				
				
				writebetter.startLoading(false);
			} 
			
			if (document.getElementById("checkNow")) {
				document.getElementById("checkNow").style.display="visible";
			}

			directSearch=false;
		},
		

		
		getActiveFunction: function() {
			return (currentFunction);
		},
		

		


		showHelp: function() {
			if (document.getElementById("checkNow")) {
				document.getElementById("checkNow").style.visibility="hidden";
			}

			var contextHelpW = ''+
				'<div id="helpScreens">'+
					'<p>Search for something and explore examples...</p>'+
				'<!-- <object style="background: rgb(255, 255, 255); margin-top:20px; max-width:500px; width: 100%" class="main-video" type="image/svg+xml" data="/app-static/img/suggtype-sm.svg"></object> --> </div>';
				
			var contextSearchW = ''+
				'<p class="helpMain">Write something and <b>press enter</b>, or try  these examples: <span class="exampleGuide">significant difference</span> <span class="exampleGuide">in this paper we</span> <span class="exampleGuide">we aim to</span></p>';

			
			writebetter.hideContextsBar();
			document.getElementById("suggestionContainer").innerHTML=contextHelpW;
			document.getElementById("searchSuggestions").innerHTML=contextSearchW;
				
		
			
			var examples = document.getElementsByClassName("exampleGuide");
			for (var i = 0; i < examples.length; i++) {
				examples[i].onclick = function(e){
					document.getElementById("searchField").value=e.srcElement.innerHTML;
					writebetter.setActiveFunction(writebetter.getActiveFunction());
					//location.href=writebetter.replaceAll("https://writebetter.io/examples/"+document.getElementById("searchField").value.trim().replace(/[^a-zA-Z1-9\-' ]/g, " ").replace(/ +(?= )/g,'')," ","+")+"/"+viewType+"/";
				}
				
			}

		},
		
		showNoResults: function() {


			var contextHelpW = ''+
				'<div id="helpScreens">'+
					'<p>No results. Try other keywords...</p>'+
				'<!-- <object style="background: rgb(255, 255, 255); margin-top:20px; max-width:500px; width: 100%" class="main-video" type="image/svg+xml" data="/app-static/img/suggtype-sm.svg"></object> --> </div>';
				

			document.getElementById("suggestionContainer").innerHTML=contextHelpW;



		},
		
		tmpMessage: function(msg) {
			document.getElementById("centerMessage").style.display="block";
			document.getElementById("centerMessage").innerHTML = msg;
			setTimeout(function(){ document.getElementById("centerMessage").style.display="none"; }, 2000);
		},
						
		

		
		
		
		showLongResults: function(keyword) {
			
			keyword=keyword.substring(0, 300);
			
			if (writebetter.getActiveFunction()!="Contexts") {
				return;
			}
			
			if (document.getElementById("registerCTAForm") !== null && !logged){
				return;
			}
			

			document.getElementById('suggestions').style.opacity = "1";
			//document.getElementById('barCTranslate').style.display = "none";
			document.getElementById('barAlternativeContexts').style.display = "none";
			
			

			
			document.getElementById("barContexts").style.display = "none";

			
			var functions = document.getElementsByClassName("functionButton");
			for (var i = 0; i < functions.length; i++) {
				functions[i].classList.remove("factive");
			}
			document.getElementById("Contexts").classList.add("factive");
			//document.getElementById("searchField").style.backgroundColor = "";
			//document.getElementById("searchField").placeholder = "Search";
			//document.getElementById("searchField").value="";


			request = new XMLHttpRequest(); 
			request.open("GET", baseUrlDir+"app/search-long-nt.php?usr=Published&q="+encodeURIComponent(keyword)+"&l=en&date="+Date.now(), true);
			request.timeout = 16000;
			request.onreadystatechange = function () {
				if (request.readyState != 4) { return } ; 
				if (request.status != 200) { 
					////console.log("Not found");
					return; 
				}; 
				linesContexts=request.responseText.split("\n");
				resultNumber=linesContexts[0];
				
				activateExactResults=false;



				linesContexts.shift();
				linesContexts.splice(-1,1);
				linesContexts = linesContexts.slice(0, 40);
				allString="";
				allString += ('<div id="dictionaryRes"></div>');
				
				linesContexts.forEach(function (sentence) {
					elSplit=sentence.split(" ");

						
						textEl=sentence.split("|$|")[1].replace(/<\/b> <b>/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&lt;\/b&gt;/g, "</b>").replace(/&lt;b&gt;/g, "<b>");
							
						positionChar=textEl.indexOf("<");
						startStr=(positionChar-150);
						if (startStr<0)
							startStr=0;
								
						endStr=(positionChar+150);
							
						textToSearch=textEl.substr(startStr, endStr).replace(/</g, "&lt;").replace(/>/g, "&gt;");
						
			
						corpusOrder=parseInt(sentence.split("|$|")[0]);
						
						corpusLetter=corpusType[corpusOrder].charAt(0);
						corpusRest=corpusType[corpusOrder].substring(1, corpusType[corpusOrder].length);
						allString += ('<div class="containerSuggestion"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion RResults">' + textEl + ' </p></div>');

				});
				
				allString = allString +' <span class=fuzzyMsg><strong><br>Search up to 4 words to see more results.<br>&nbsp;</strong></span><br><br><br><br><br><br>';
							
				document.getElementById("suggestionContainer").innerHTML = allString;
				
				
				var results = document.getElementsByClassName("contextSuggestion");
				for (var i=0; i < results.length; i++) {

						
					results[i].style.transform = "translateX(0)";
					results[i].style.whiteSpace = "normal";
					results[i].style.textAlign = "left";
					results[i].style.margin = "20px 0px 20px";
					results[i].style.padding = "40px 16px 10px";
					results[i].style.userSelect = "text";
					results[i].style.cursor = "auto";
					results[i].style.background = "transparent";
					results[i].style.borderRadius = "0px";
					results[i].style.border = "0px solid #999";
					
					results[i].parentElement.childNodes[0].style.maxWidth = "300px";
					results[i].parentElement.childNodes[0].style.padding = "0 5px";
					results[i].parentElement.childNodes[0].style.margin = "5px 15px 5px";
					results[i].parentElement.childNodes[0].style.fontSize = "98%";
					results[i].parentElement.childNodes[0].style.borderRadius = "5px";
					results[i].parentElement.childNodes[0].style.border = "0px dotted #777";
					results[i].parentElement.childNodes[0].style.background = "#f2f2f2";
					results[i].parentElement.childNodes[0].childNodes[1].style.visibility = "visible";
					results[i].parentElement.childNodes[0].childNodes[1].style.display = "inline";
					results[i].parentElement.childNodes[0].childNodes[1].style.color = "#222";
					results[i].parentElement.childNodes[0].childNodes[1].childNodes[1].style.opacity = "1";

				}
				

				//writebetter.showContextsBar();
				writebetter.adjustSizeContents();


				writebetter.alignContexts();
				var references = document.getElementsByClassName("gotoreference");
				for (var i=0; i < references.length; i++) {
					references[i].onclick = function(e){
					
						
						link=baseUrlSite+"app/source.php?"+e.target.textContent;
						window.open(link);
						
					};
				}

				writebetter.endLoading();

				var closeContextButtons = document.getElementsByClassName("closeContext");
				for (var i=0; i < closeContextButtons.length; i++) {
					closeContextButtons[i].onclick = function(e){
						elementBase=e;
						e.path[1].children[0].style.maxWidth = "";
						e.path[1].children[0].childNodes[1].style.visibility = "";
						e.path[1].children[0].style.padding = "";
						e.path[1].children[0].style.margin = "";
						e.path[1].children[0].style.fontSize = "";
						e.path[1].children[0].style.borderRadius = "";
						e.path[1].children[0].style.border = "";
						e.path[1].children[0].style.background = "";
						e.path[1].children[0].childNodes[1].style.display = "";
						e.path[1].children[0].childNodes[1].style.color = "";
						e.path[1].children[0].childNodes[1].childNodes[1].style.opacity = "";
						e.path[1].children[1].style.display = "none"; //close
						e.path[1].children[2].style.transform = "";
						e.path[1].children[2].style.whiteSpace = "";
						e.path[1].children[2].style.textAlign = "";
						e.path[1].children[2].style.margin = "";
						e.path[1].children[2].style.padding = "";
						e.path[1].children[2].style.userSelect = "";
						e.path[1].children[2].style.cursor = "";
						e.path[1].children[2].style.background = "";
						e.path[1].children[2].style.borderRadius = "";
						e.path[1].children[2].style.border = "";
						setTimeout(function(){ writebetter.alignContexts(); }, 800);
					};
				}

				
			};
			request.ontimeout = function (e) {
			  writebetter.genericError();
			};
			request.send();
		},
		
		

		searchContextsNew: function(keyword, left, right) {
			
			keyword = keyword.trim().replace(/[^a-z0-9]/gi, ' ').replace(/ +(?= )/g,'').toLowerCase().trim();
					
			
			
			SCwordsCTX=decodeURIComponent(encodeURIComponent(keyword).replace(/%E2%80%8C/g, "")).trim().split(" ");
		
			
			if (SCwordsCTX.length > 4) {
				//writebetter.showLongResults(keyword);
				//return;
				keyword=keyword.split(" ").splice(-4).join(" ");
			}
			//console.log(keyword);
			
			keyword=keyword.substring(0, 180);
			
			const firstCharKW=keyword.charAt(0);
			SCExactBool=false;
			SCRelatedBool=false;
			
			const c1=['-','0','1','2','3','4','5','6','7','8','9','a','b','c'];
			const c2=['d','e','f','g','h','i','j','k'];
			const c3=['l','m','n','o','p','q','r'];
			const c4=['s','t','u','v','w','x','y','z'];

			var cserver="";
			if (c1.includes(firstCharKW)){
				cserver="1";
			}
			if (c2.includes(firstCharKW)){
				cserver="2";
			}
			if (c3.includes(firstCharKW)){
				cserver="3";
			}
			if (c4.includes(firstCharKW)){
				cserver="4";
			}
			
			allString = ' ';
			allString += ('<div id="dictionaryRes"></div>');
			request = new XMLHttpRequest(); 
			request.open("GET", "https://c"+cserver+".writebetter.io/"+firstCharKW+"/"+keyword.split(" ").join("_")+'.dat', true);
			request.timeout = 16000;
			document.getElementById("barContexts").style.display = "none";
			document.getElementById("barContainer").style.display = "none";
			document.getElementById("orderingResults").style.display = "block";
			
			request.onreadystatechange = function () {
				if (request.readyState != 4) { return } ; 
				if (request.status != 200) { 
					//console.log("Not found");
					
					if (left!="WBLiveResults"){
						writebetter.showNoResults();
						writebetter.endLoading();
					}
					
					return;
				
				} ; 
				
				alltxt=request.responseText;
				alltxt=writebetter.replaceAll(alltxt, "{{", "");
				alltxt=writebetter.replaceAll(alltxt, "}}", "");
				
				linesContexts=alltxt.split("\n");
				activateExactResults=activateRelatedResults=activateSubstitutionResults=activateCompletionResults=false;
				resultNumber=linesContexts[0];
				if(typeof resultNumber.split("|")[2] !== 'undefined') {
					freeSearchesData=resultNumber.split("|")[2];
					timeToResetFreeSearches=freeSearchesData.split("$")[1];
					remainingSearchesForDay=freeSearchesData.split("$")[0]-1;
				}

				linesContexts.shift();
				linesContexts.splice(-1,1);
				linesContexts = linesContexts.slice(0, 2200);
				exactScroll=0;
				sentencePointer=0;
				nowTime=Date.now();
				
				EResults=0;
				RResults=0;
				SResults=0;
				CResults=0;
				numResultsVisibles=150;
				
				linesContexts.forEach(function (sentence) {
					
					
					elSplit=sentence.split(" ");
						textEl=sentence.split("|$|")[1].replace(/<\/b> <b>/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&lt;\/b&gt;/g, "</b>").replace(/&lt;b&gt;/g, "<b>");
							
						positionChar=textEl.indexOf("<");
						startStr=(positionChar-150);
						if (startStr<0)
							startStr=0;
								
						endStr=(positionChar+150);
							
						textToSearch=textEl.substr(startStr, endStr).replace(/</g, "&lt;").replace(/>/g, "&gt;");
						
			
							corpusOrder=parseInt(sentence.split("|$|")[0]);
							if (corpusOrder>0){
								corpusLetter=corpusType[corpusOrder].charAt(0);
								corpusRest=corpusType[corpusOrder].substring(1, corpusType[corpusOrder].length);
							} else {
								corpusLetter="X";
								textEl=sentence.split("|$|")[1];
							}

							suggType=sentence.split("|$|")[2]+"Results";
							suggCType=sentence.split("|$|")[2]+"CResults";
							
							if (suggType=="EResults"){
								
								EResults++;
								
								if (EResults==1) {
									//allString += ('<p id="moreExactResults"><i id="suggestionNumber">'+resultNumber.split("|")[0]+'</i> exact example(s)</u><span>+More</span></p>');
							
									var exactResults=parseInt(resultNumber.split("|")[0]);
									var relatedResults=parseInt(resultNumber.split("|")[1]);
									//console.log(exactResults);

									if (exactResults==1){
										allString += ('<p id="moreExactResults"><i id="suggestionNumber">'+exactResults+'</i> exact</u></p>');
									} else if (exactResults==10000){
										allString += ('<p id="moreExactResults"><i id="suggestionNumber">'+exactResults+'+</i> exact</u></p>');
									} else {
										allString += ('<p id="moreExactResults"><i id="suggestionNumber">'+exactResults+'</i> exact</u></p>');
									}
									
									if (relatedResults==1){
										allString += ('<p id="moreRelatedResults"><i id="suggestionNumberRelated">'+resultNumber.split("|")[1]+'</i> similar</u></p>');
									} else if (relatedResults==10000){
										allString += ('<p id="moreRelatedResults"><i id="suggestionNumberRelated">'+resultNumber.split("|")[1]+'+</i> similar</u></p>');
									} else {
										allString += ('<p id="moreRelatedResults"><i id="suggestionNumberRelated">'+resultNumber.split("|")[1]+'</i> similar</u></p>');
									}
									
									//allString += ('<p id="moreExactResults"><i id="suggestionNumber">'+resultNumber.split("|")[0]+'</i> exact example(s)</u></p>');
									//allString += ('<p id="moreRelatedResults"><i id="suggestionNumberRelated">'+resultNumber.split("|")[1]+'</i> related example(s)</u></p>');
									
									activateExactResults=true;
								}
								
								if (EResults<150) {
									allString += ('<div class="containerSuggestion"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
								} else {
									allString += ('<div style="display:none" class="containerSuggestion '+suggCType+'"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
							
								}
								
							} else if (suggType=="RResults"){
								
								if (corpusLetter=="X") {
									allString += ('<div class="containerSuggestion">' + textEl + ' </div>');
									
								} else {
							
								
									RResults++;
									/*
									if (RResults==1) {
										allString += ('<p id="moreRelatedResults"><i id="suggestionNumberRelated">'+resultNumber.split("|")[1]+'</i> related example(s)</u><span>+More</span></p>');
										activateRelatedResults=true;
									}
									*/
									
									if (RResults<numResultsVisibles) {
										allString += ('<div class="containerSuggestion"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
									} else {
										allString += ('<div style="display:none" class="containerSuggestion '+suggCType+'"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
								
									}
									
								}
							}  else if (suggType=="SResults"){
								
								SResults++;
								
								if (SResults==1) {
									allString += ('<p id="moreSubstitutionResults">Possible replacements for <u>'+keyword+'</u><span>+More</span></p>');
									activateSubstitutionResults=true;
								}
								
								if (SResults<numResultsVisibles) {
									allString += ('<div class="containerSuggestion"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
								} else {
									allString += ('<div style="display:none" class="containerSuggestion '+suggCType+'"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
							
								}
								
							} else if (suggType=="CResults"){
								
								CResults++;
								
								if (CResults==1) {
									allString += ('<p id="moreCompletionResults">Possible ways to complete the sentence<span>+More</span></p>');
									activateCompletionResults=true;
								}
								
								if (CResults<numResultsVisibles) {
									allString += ('<div class="containerSuggestion"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
								} else {
									allString += ('<div style="display:none" class="containerSuggestion '+suggCType+'"><span class="indicator corpusOrder'+corpusOrder+'">'+corpusLetter+'<i>'+corpusRest+'<b class="gotoreference"><span style="display:none" >'+corpusOrder+"|$|"+textToSearch+'</span></b></i></span> <span class="closeContext">&#10005;</span> <p class="contextSuggestion '+suggType+'">' + textEl + ' </p></div>');
							
								}
								
							}
				});
				document.getElementById("suggestionContainer").innerHTML = allString;
				writebetter.addDictionaryDefinition(keyword);

				/*
				writebetter.showMoreResults("moreRelatedResults","RCResults", activateRelatedResults);
				writebetter.showMoreResults("moreExactResults","ECResults", activateExactResults);
				writebetter.showMoreResults("moreCompletionResults","CCResults", activateCompletionResults);
				writebetter.showMoreResults("moreSubstitutionResults","SCResults", activateSubstitutionResults);
				*/
				/*
				if (RResults<numResultsVisibles && activateRelatedResults){
					document.getElementById("moreRelatedResults").children[document.getElementById("moreRelatedResults").children.length-1].style.display="none";
				}
				
				if (EResults<15 && activateExactResults){
					document.getElementById("moreExactResults").children[document.getElementById("moreExactResults").children.length-1].style.display="none";
				}
				if (CResults<numResultsVisibles && activateCompletionResults){
					document.getElementById("moreCompletionResults").children[document.getElementById("moreCompletionResults").children.length-1].style.display="none";
				}	
				
				if (SResults<numResultsVisibles && activateSubstitutionResults) {
					document.getElementById("moreSubstitutionResults").children[document.getElementById("moreSubstitutionResults").children.length-1].style.display="none";
				}	
				*/
				
				
				if (location.href.endsWith("extended/")) {
				
					//extended view
					var results = document.getElementsByClassName("contextSuggestion");
					for (var i=0; i < results.length; i++) {

							
						results[i].style.transform = "translateX(0)";
						results[i].style.whiteSpace = "normal";
						results[i].style.textAlign = "left";
						results[i].style.margin = "20px 0px 20px";
						results[i].style.padding = "40px 16px 10px";
						results[i].style.userSelect = "text";
						results[i].style.cursor = "auto";
						results[i].style.background = "transparent";
						results[i].style.borderRadius = "0px";
						results[i].style.border = "0px solid #999";
						
						results[i].parentElement.childNodes[0].style.maxWidth = "300px";
						results[i].parentElement.childNodes[0].style.padding = "0 5px";
						results[i].parentElement.childNodes[0].style.margin = "5px 15px 5px";
						results[i].parentElement.childNodes[0].style.fontSize = "98%";
						results[i].parentElement.childNodes[0].style.borderRadius = "5px";
						results[i].parentElement.childNodes[0].style.border = "0px dotted #777";
						results[i].parentElement.childNodes[0].style.background = "#f2f2f2";
						results[i].parentElement.childNodes[0].childNodes[1].style.visibility = "visible";
						results[i].parentElement.childNodes[0].childNodes[1].style.display = "inline";
						results[i].parentElement.childNodes[0].childNodes[1].style.color = "#222";
						results[i].parentElement.childNodes[0].childNodes[1].childNodes[1].style.opacity = "1";

					}
					

					//writebetter.showContextsBar();
					writebetter.adjustSizeContents();


					writebetter.alignContexts();
					var references = document.getElementsByClassName("gotoreference");
					for (var i=0; i < references.length; i++) {
						references[i].onclick = function(e){
						
							
							link=baseUrlSite+"app/source.php?"+e.target.textContent;
							window.open(link);
							
						};
					}

					writebetter.endLoading();

					var closeContextButtons = document.getElementsByClassName("closeContext");
					for (var i=0; i < closeContextButtons.length; i++) {
						closeContextButtons[i].onclick = function(e){
							elementBase=e;
							e.path[1].children[0].style.maxWidth = "";
							e.path[1].children[0].childNodes[1].style.visibility = "";
							e.path[1].children[0].style.padding = "";
							e.path[1].children[0].style.margin = "";
							e.path[1].children[0].style.fontSize = "";
							e.path[1].children[0].style.borderRadius = "";
							e.path[1].children[0].style.border = "";
							e.path[1].children[0].style.background = "";
							e.path[1].children[0].childNodes[1].style.display = "";
							e.path[1].children[0].childNodes[1].style.color = "";
							e.path[1].children[0].childNodes[1].childNodes[1].style.opacity = "";
							e.path[1].children[1].style.display = "none"; //close
							e.path[1].children[2].style.transform = "";
							e.path[1].children[2].style.whiteSpace = "";
							e.path[1].children[2].style.textAlign = "";
							e.path[1].children[2].style.margin = "";
							e.path[1].children[2].style.padding = "";
							e.path[1].children[2].style.userSelect = "";
							e.path[1].children[2].style.cursor = "";
							e.path[1].children[2].style.background = "";
							e.path[1].children[2].style.borderRadius = "";
							e.path[1].children[2].style.border = "";
							setTimeout(function(){ writebetter.alignContexts(); }, 800);
						};
					}
				} else {
				
				
				
					var results = document.getElementsByClassName("contextSuggestion");
					for (var i=0; i < results.length; i++) {
						results[i].onclick = function(e){
							if (e.path[0].tagName=="B") {
								example=1
							} else {
								example=0;
							}
							e.path[example].style.transform = "translateX(0)";
							e.path[example].style.whiteSpace = "normal";
							e.path[example].style.textAlign = "left";
							e.path[example].style.margin = "20px 0px 20px";
							e.path[example].style.padding = "40px 16px 10px";
							e.path[example].style.userSelect = "text";
							e.path[example].style.cursor = "auto";
							e.path[example].style.background = "transparent";
							e.path[example].style.borderRadius = "0px";
							e.path[example].style.border = "0px solid #999";
							e.path[example+1].children[1].style.display = "block";
							e.path[example+1].childNodes[0].style.maxWidth = "300px";
							e.path[example+1].childNodes[0].style.padding = "0 5px";
							e.path[example+1].childNodes[0].style.margin = "5px 15px 5px";
							e.path[example+1].childNodes[0].style.fontSize = "98%";
							e.path[example+1].childNodes[0].style.borderRadius = "5px";
							e.path[example+1].childNodes[0].style.border = "0px dotted #777";
							e.path[example+1].childNodes[0].style.background = "#f2f2f2";
							e.path[example+1].childNodes[0].childNodes[1].style.visibility = "visible";
							e.path[example+1].childNodes[0].childNodes[1].style.display = "inline";
							e.path[example+1].childNodes[0].childNodes[1].style.color = "#222";
							e.path[example+1].childNodes[0].childNodes[1].childNodes[1].style.opacity = "1";
						};
					}

					
					document.getElementById("alertBox").style.display = "none";
					writebetter.showContextsBar();
					writebetter.adjustSizeContents();
					writebetter.endLoading();

					writebetter.alignContexts();
					var references = document.getElementsByClassName("gotoreference");
					for (var i=0; i < references.length; i++) {
						references[i].onclick = function(e){
							
							link=baseUrlSite+"app/source.php?"+e.target.textContent;
							window.open(link);
						};
					}
					
					var closeContextButtons = document.getElementsByClassName("closeContext");
					for (var i=0; i < closeContextButtons.length; i++) {
						closeContextButtons[i].onclick = function(e){
							elementBase=e;

							e.path[1].children[0].style.maxWidth = "";
							e.path[1].children[0].childNodes[1].style.visibility = "";
							e.path[1].children[0].style.padding = "";
							e.path[1].children[0].style.margin = "";
							e.path[1].children[0].style.fontSize = "";
							e.path[1].children[0].style.borderRadius = "";
							e.path[1].children[0].style.border = "";
							e.path[1].children[0].style.background = "";
							e.path[1].children[0].childNodes[1].style.display = "";
							e.path[1].children[0].childNodes[1].style.color = "";
							e.path[1].children[0].childNodes[1].childNodes[1].style.opacity = "";
							e.path[1].children[1].style.display = "none"; //close
							e.path[1].children[2].style.transform = "";
							e.path[1].children[2].style.whiteSpace = "";
							e.path[1].children[2].style.textAlign = "";
							e.path[1].children[2].style.margin = "";
							e.path[1].children[2].style.padding = "";
							e.path[1].children[2].style.userSelect = "";
							e.path[1].children[2].style.cursor = "";
							e.path[1].children[2].style.background = "";
							e.path[1].children[2].style.borderRadius = "";
							e.path[1].children[2].style.border = "";
							setTimeout(function(){ writebetter.alignContexts(); }, 800);
						};
					}
					
				}

				
			};
			request.ontimeout = function (e) {
				//console.log(e);
			  writebetter.genericError();
			};
			request.send();


		},

		
		


		
		showMoreResults: function(btId, className, activationBool) {
			if (activationBool) {
				document.getElementById(btId).onclick = function(e){
					
					if (document.getElementById(btId).children[document.getElementById(btId).children.length-1].innerHTML=="-Less") {
						
						var results = document.getElementsByClassName(className);
						for (var i=0; i < results.length; i++) {
							results[i].style.display = "none";	

						}
						document.getElementById(btId).children[document.getElementById(btId).children.length-1].innerHTML = "+More";	
						
					} else {

						var results = document.getElementsByClassName(className);
						for (var i=0; i < results.length; i++) {
							results[i].style.display = "block";	
						}
						document.getElementById(btId).children[document.getElementById(btId).children.length-1].innerHTML = "-Less";	
						writebetter.alignContexts();
					}
				};
			}
		},		
						

		

		
		openPremium: function() {
			link=baseUrlSite+"premium/buy/?email="+usrEmail;
			window.open(link);
		},
		
		openProducts: function() {
			link=baseUrlSite+"m/?email="+usrEmail;
			window.open(link);
		},


		
		addDictionaryDefinition: function(keyword) {
			
			keyword = keyword.trim().replace(/[^a-z0-9]/gi, ' ').replace(/ +(?= )/g,'').toLowerCase().trim();
					
			
			//keyword=keyword.substring(0, 180);
			
			
			
			dictNormal=false;
			dictMore=false;
			
			const firstCharKW=keyword.charAt(0);
			
			//document.getElementById("suggestionContainer").innerHTML = '<div id="drelated"></div><div id="dnormal"> </div><div id="dextended"> </div>';

			
			request = new XMLHttpRequest(); 
			request.open("GET", "https://c1.writebetter.io/dict/"+firstCharKW+'/'+keyword.split(" ").join("_")+'.dat', true);
			request.timeout = 16000;
			request.onreadystatechange = function () {
				if (request.readyState != 4) { return } ; 
				if (request.status != 200) { 
					//console.log("Generic error.")
					
					
					return 
				} ;

				try {
					dictionaryList = JSON.parse(request.responseText);
				} catch(e) {
				}
				
				
				if (dictionaryList.length>0) {
					allStringN = ' ';
					allStringN += ('<p id="moreDictResults"><i id="suggestionNumberDict">'+dictionaryList.length+'</i> dictionary definition(s)</u><span>+Show</span></p>');
					
					allStringN += '<div style="display:none;" id="allDefDict">';
					dictionaryList.sort(writebetter.compare);
					var iOrder=0;
					for (iOrder = 0; iOrder < dictionaryList.length; iOrder++) {
						if (dictionaryList[iOrder].relevance[0].startsWith(writebetter.replaceAll(keyword,' ', '_'))) { break; }
					}
					for (var i = 0; i < iOrder; i++) {
						dictionaryList.push(dictionaryList.shift());
					}
					
					dictionaryList.forEach(function (element) {
						var type;
						if (element.pos=="a" || element.pos=="s") {
							type="adj";
						} else if (element.pos=="r") {
							type="adv";
						} else if (element.pos=="n") {
							type="noun";
						} else if(element.pos=="v") {
							type="verb";
						}
						
						allStringN+="<h2 class=\"dictVoice\">("+type+") "+element.synonymsNormal.join(", ")+"</h2> \n";
						if (element.examples.length > 0) {
							allStringN+="<p class=\"dictDefinition\">"+element.definitionNormal+" - <i class=\"dictExamples\">"+element.examples.join("; ")+"</i></p> \n";
						} else {
							allStringN+="<p class=\"dictDefinition\">"+element.definitionNormal+"</p> \n";
						}
						if (element.antonyms.length > 0) {
							allStringN+="<p class=\"dictAntonyms\"><b>antonyms:</b> <i>"+element.antonyms.join(", ")+"</i></p> \n"
						}

					});
					allStringN += '</div>';

					document.getElementById("dictionaryRes").innerHTML = allStringN;

					
					document.getElementById("moreDictResults").onclick = function(e){
					
						if (document.getElementById("moreDictResults").children[document.getElementById("moreDictResults").children.length-1].innerHTML=="+Show") {
							document.getElementById("allDefDict").style.display="block";
							document.getElementById("moreDictResults").children[document.getElementById("moreDictResults").children.length-1].innerHTML = "-Hide";	
							
						} else {
							document.getElementById("allDefDict").style.display="none";
							document.getElementById("moreDictResults").children[document.getElementById("moreDictResults").children.length-1].innerHTML = "+Show";	
							writebetter.alignContexts();
						}
					};

				}
				

			};

			request.send();
			
		},


		toTitleCase: function(str) {
			return str.replace(/\w\S*/g, function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
			
		},
		
		compare: function(a, b) {
			if (a.relevance[0] < b.relevance[0])
				return -1;
			if (a.relevance[0] > b.relevance[0])
				return 1;
			return 0;
			
		},

		makeCtxBtmClickable: function() {
			var ctx = document.getElementsByClassName("structureCtx");

			for (var i=0; i < ctx.length; i++) {
				ctx[i].onclick = function(e){
					document.getElementById("searchField").value = e.path[0].innerHTML;
					writebetter.setActiveFunction("Contexts");
					
				}
			};
			
		},
		

	
		displayContextAlternatives: function() {
			document.getElementById("barAlternativeContexts").style.display="block";
			writebetter.adjustSizeContents();
		},
		
		hideContextAlternatives: function() {
			document.getElementById("barAlternativeContexts").style.display="none";
			document.getElementById("infoBox").style.display="none";
			document.getElementById("alertBox").style.display="none";
			writebetter.adjustSizeContents();
		},
		
		
		alignContextsNavigator: function() {
			document.querySelectorAll("#resultsNavigator b:first-of-type").forEach(function (index) {
				index.parentElement.style.transform="translateX("+parseInt(-index.offsetLeft + (document.getElementById("suggestionContainer").offsetWidth / 2) - (index.offsetWidth / 2)) + "px)"
			});
		},
		
		alignContexts: function() {
			document.querySelectorAll("#suggestionContainer b:first-of-type").forEach(function (index) {
				if (getComputedStyle(index.parentElement).cursor=="pointer")
					index.parentElement.style.transform="translateX("+parseInt(-index.offsetLeft + (document.getElementById("suggestionContainer").offsetWidth / 2) - (index.offsetWidth / 2)) + "px)"
			});
			
			setTimeout(function(){ 
				document.querySelectorAll("#suggestionContainer b:first-of-type").forEach(function (index) {
					if (getComputedStyle(index.parentElement).cursor=="pointer")
						index.parentElement.style.transform="translateX("+parseInt(-index.offsetLeft + (document.getElementById("suggestionContainer").offsetWidth / 2) - (index.offsetWidth / 2)) + "px)"
				});
			
			}, 100);
			
		},
		
		alignStructures: function() {
			document.querySelectorAll("#suggestionContainer b:first-of-type").forEach(function (index) {
				index.parentElement.style.marginLeft="2px"
				index.parentElement.style.marginLeft=parseInt(-index.offsetLeft + (document.getElementById("suggestionContainer").offsetWidth / 3) - (index.offsetWidth / 3)) + "px"
			});
		},
		

		startLoading: function(fullscreen) {
			
			if (fullscreen) {
				document.getElementById("fullScreenLoading").style.left="0";
				document.getElementById("fullScreenLoading").style.width="100%";
			} else {
				document.getElementById("fullScreenLoading").style.left="";
				document.getElementById("fullScreenLoading").style.width="";
			}
			
			clearTimeout(problemsTimeout);
			document.getElementById("fullScreenLoading").style.display="block";
			document.getElementById("loadingProblems").style.display="none";
			problemsTimeout=setTimeout(function(){ document.getElementById("loadingProblems").style.display="block";}, 7000);
			
			if (document.getElementById("userPage")) {
				document.getElementById("userPage").style.width="inherit";
				document.getElementById("userPage").style.padding="0px";
				document.getElementById("userPage").style.left="auto";
			}
			
			if (document.getElementById("registerCTAForm")) {
				document.getElementById("registerCTAForm").style.position="absolute";
			}

			
		},
		
		endLoading: function() {
			clearTimeout(problemsTimeout);
			document.getElementById("loadingProblems").style.display="none";
			document.getElementById("fullScreenLoading").style.display="none";
			
			if (document.getElementById("userPage")) {
				document.getElementById("userPage").style.width="";
				document.getElementById("userPage").style.padding="";
				document.getElementById("userPage").style.left="";
			}
			
			if (document.getElementById("registerCTAForm")) {
				document.getElementById("registerCTAForm").style.position="";
			}

		},
		
		
		escapeHTML: function(html_str) {
			return html_str.replace(/[&<>"]/g, function (tag) {
				var chars_to_replace = {
					'&': '&',
					'<': '<',
					'>': '>',
					'"': '"'
				};

				return chars_to_replace[tag] || tag;
			});
		},
		
		
		showContextsBar: function(results) {
			document.getElementById("barContexts").style.display="none";
		},
		
		hideContextsBar: function(results) {
			document.getElementById("barContexts").style.display="none";
		},
		
		genericError: function() {
			writebetter.endLoading();
			document.getElementById("serverError").style.display="block";
		},

		sentSimilarity: function(a, b) {
			
			if (Math.abs(a.length-b.length) < 5) {
				
				function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

				c = [].concat(_toConsumableArray(a)).filter(function (x) {
				  return b.includes(x);
				});
				return parseFloat((c.length)) / (a.length + b.length - c.length);
				
			}	else {
				return 0.5;
			}
			
			

		},

		
		replaceAll: function(str, find, replace) {
			return str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
		},

		adjustSizeContents: function() {
			//document.body.style.height=window.innerHeight+"px";
		},

	}
	return callback;
}());

writebetter.init();

