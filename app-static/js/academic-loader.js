

	var mainCss = document.createElement( "link" );
	mainCss.href = "app-static/css/academic-basic-style.css?fs";//+Date.now();
	mainCss.type = "text/css";
	mainCss.rel = "stylesheet";
	mainCss.media = "screen,print";
	document.getElementsByTagName( "head" )[0].appendChild(mainCss);
	
	var getstartedCss = document.createElement( "link" );
	getstartedCss.href = "app-static/css/academic-examples.css?fs";//+Date.now();
	getstartedCss.type = "text/css";
	getstartedCss.rel = "stylesheet";
	getstartedCss.media = "screen,print";
	document.getElementsByTagName( "head" )[0].appendChild(getstartedCss);


		
	var script1= document.createElement('script');
	script1.type= 'text/javascript';
	script1.src= 'app-static/js/academic-writebetter-basic.js?x';//+Date.now();
	document.getElementsByTagName( "head" )[0].appendChild(script1);

