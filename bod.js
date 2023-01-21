


		//offsetX is the distance from the canvas to the edge of the browser
		//mouseX is the distance from the cursor to the edge of the canvas
		//e.clientX is the distance from the cursor to the edge of the browser
		//h.x is the location of the hotspot ... The location you want the popup to appear
		//dx=mouseX-h.x ... it's used to set the area of the hotspot ... when dx=0 you are at the center of the hotspot
		//cw is canvas width & ch is canvas height
		//mouseDownX records the location of mouseX when the down click occurs
		//mouseUpX records the location of the mouseX when the click is released 
		var canvas = document.getElementsByTagName('canvas')[0];
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		var cw=canvas.width;
		var ch=canvas.height;  
		var dragDistanceX = 0;
		var dragDistanceY = 0;
		var mouseDownX =0;
		var mouseUpX=0;
		var mouseDownY=0;
		var mouseUpY = 0;
		var imageXorigin = 0;
		var imageYorigin = 0;

		canvas.style.backgroundColor = '#CADEB0';
		var ctx = canvas.getContext('2d');
		var gkhead = new Image;
		var ball   = new Image;

		function reOffset(){
		  var BB=canvas.getBoundingClientRect();
		  offsetX=BB.left;
		  offsetY=BB.top;     
		}
		
		var offsetX,offsetY;
		reOffset();
		window.onscroll=function(e){ reOffset(); }
		window.onresize=function(e){ reOffset(); }

		var hotspots=[
		  {x:213,y:482,radius:10, txtLen: 225, tip:'Baptist Camp .. drop off.'}, //Baptist Camp
		  {x:400,y:682,radius:10, txtLen: 520, tip:'Usually where the first canoe tip happens, and people wait.'}, //The waiting Place
		  {x:570,y:930,radius:10, txtLen: 250, tip:'Chris got stuck under water.'}, //Chris stuck under water
		  {x:584,y:915,radius:10, txtLen: 365, tip:'Ron got yelled at for giving canoeing tips.'}, //Ron's canoeing tips
		  {x:588,y:900,radius:10, txtLen: 250, tip:'There is a PBR burried here.'}, //PBR corner
		  {x:1805,y:1440,radius:10, txtLen: 485, tip:'Canoeing Tip: do not wear a wedding ring on the river.'}, //Lost wedding band
		  {x:2164,y:1694,radius:10, txtLen: 285, tip:'Take a dunk in very cold water.'}, //Cold water dunk
		  {x:2380,y:2205,radius:10, txtLen: 325, tip:'Mark does not tip often, but WOW!'}, //Mark's Mayhem
		  {x:2844,y:2240,radius:10, txtLen: 194, tip:'Drop off and Pick up.'}, //Acers put in
		  {x:3034,y:2570,radius:10, txtLen: 405, tip:'Ron discovered a new route, will you brave it?'}, //Ron's folley
		  {x:3834,y:2790,radius:10, txtLen: 360, tip:'Swing on out into the river ... if you dare.'}, //Rope swing
		  {x:4149,y:2606,radius:10, txtLen: 310, tip:'The cave is really deep in the back.'}, //Cave spring
		  {x:4403,y:2953,radius:10, txtLen: 330, tip:'What you doin down there little guy.'}, //Crawdad bend
		  {x:4418,y:3063,radius:10, txtLen: 230, tip:'That first step is a doozy.'}, //Collin is fallin
		  {x:4770,y:3130,radius:10, txtLen: 270, tip:'Debbie found her some beads.'}, //Debbie's beads
		  {x:4900,y:3195,radius:10, txtLen: 330, tip:'Hold on Heath, somone will save you.'}, //Heath haning on
		  {x:4690,y:3495,radius:10, txtLen: 408, tip:'Anyone. Anyone. Anyone sell me their drink?'}, //Levi's panhandle
		];

		draw();

		$("#canvas").mouseup(function(e){handleMouseUp(e);});
		function handleMouseUp(e){
			// tell the browser we're handling this event
			e.preventDefault();
			e.stopPropagation();
			
			mouseUpX=parseInt(e.clientX-offsetX);
			mouseUpY=parseInt(e.clientY-offsetY);
			
			dragDistanceX=mouseUpX-mouseDownX;
			dragDistanceY=mouseUpY-mouseDownY;
			
			imageXorigin+=dragDistanceX;
			imageYorigin+=dragDistanceY;

			e.target.releaseCapture();
		}
		
		
		$("#canvas").mousedown(function(e){handleMouseDown(e);});
		function handleMouseDown(e){
			// tell the browser we're handling this event
			e.preventDefault();
			e.stopPropagation();
			
			mouseDownX=parseInt(e.clientX-offsetX);
			mouseDownY=parseInt(e.clientY-offsetY);

			e.target.setCapture();
		}
		
		$("#canvas").mousemove(function(e){handleMouseMove(e);});
		function handleMouseMove(e){
			e.preventDefault();
			e.stopPropagation();
			mouseX=parseInt(e.clientX-offsetX);
			mouseY=parseInt(e.clientY-offsetY);
			//ctx.clearRect(0,0,cw,ch);
			//draw();
			redraw();
			for(var i=0;i<hotspots.length;i++){
				var h=hotspots[i];
				var dx=mouseX-h.x;
				var dy=mouseY-h.y;
				
				if((dx-imageXorigin)*(dx-imageXorigin)+(dy-imageYorigin)*(dy-imageYorigin)<h.radius*h.radius){
					//ctx.fillText(h.tip,h.x,h.y);
					
					ctx.fillStyle = 'white';	  
					ctx.fillRect(h.x,h.y-18, h.txtLen, 22);	
					
					ctx.fillStyle = 'red';	
					ctx.font="20px Georgia";
					ctx.fillText(h.tip,h.x,h.y);
				}
			}		
		}
		
		function draw(){
			for(var i=0;i<hotspots.length;i++){
			var h=hotspots[i];
			ctx.beginPath();
			ctx.strokeStyle = '#06c';
			ctx.drawImage(ball,h.x-(20/2),h.y-(20/2),20,20);
			//ctx.closePath();
			//ctx.stroke();

			}
		}

		function redraw(){
			// Clear the entire canvas
			var p1 = ctx.transformedPoint(0,0);
			var p2 = ctx.transformedPoint(canvas.width,canvas.height);
			ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

			ctx.fillStyle = "red";
			ctx.fill();

			ctx.drawImage(gkhead,200,50);

			ctx.save();
			ctx.stroke();
			ctx.save();
			ctx.translate(438.5,223);
			ctx.strokeStyle = '#06c';
			ctx.beginPath();
			ctx.lineWidth = 0.05;

			ctx.restore();
			draw();
		}
		
		window.onload = function(){		
			trackTransforms(ctx);
			redraw();

			var lastX=canvas.width/2, lastY=canvas.height/2;
			var dragStart,dragged;
			canvas.addEventListener('mousedown',function(evt){
				document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
				lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
				lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
				dragStart = ctx.transformedPoint(lastX,lastY);
				dragged = false;
			},false);
			canvas.addEventListener('mousemove',function(evt){
				lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
				lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
				dragged = true;
				if (dragStart){
					var pt = ctx.transformedPoint(lastX,lastY);
					ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
					redraw();
				}
			},false);
			canvas.addEventListener('mouseup',function(evt){
				dragStart = null;
				if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
			},false);

			var scaleFactor = 1.1;
			// Code to zoom on a double click
			/*
			var zoom = function(clicks){
				var pt = ctx.transformedPoint(lastX,lastY);
				ctx.translate(pt.x,pt.y);
				var factor = Math.pow(scaleFactor,clicks);
				ctx.scale(factor,factor);
				ctx.translate(-pt.x,-pt.y);
				redraw();
			}
			*/

			var handleScroll = function(evt){
				var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
				if (delta) zoom(delta);
				return evt.preventDefault() && false;
			};
			canvas.addEventListener('DOMMouseScroll',handleScroll,false);
			//canvas.addEventListener('mousewheel',handleScroll,false);
		};
		gkhead.src = 'Map.png';
		ball.src   = 'red.png';
		
		function trackTransforms(ctx){
			var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
			var xform = svg.createSVGMatrix();
			ctx.getTransform = function(){ return xform; };
			
			var savedTransforms = [];
			var save = ctx.save;
			ctx.save = function(){
				savedTransforms.push(xform.translate(0,0));
				return save.call(ctx);
			};
			var restore = ctx.restore;
			ctx.restore = function(){
				xform = savedTransforms.pop();
				return restore.call(ctx);
			};

			var scale = ctx.scale;
			ctx.scale = function(sx,sy){
				xform = xform.scaleNonUniform(sx,sy);
				return scale.call(ctx,sx,sy);
			};
			var rotate = ctx.rotate;
			ctx.rotate = function(radians){
				xform = xform.rotate(radians*180/Math.PI);
				return rotate.call(ctx,radians);
			};
			var translate = ctx.translate;
			ctx.translate = function(dx,dy){
				xform = xform.translate(dx,dy);
				return translate.call(ctx,dx,dy);
			};
			var transform = ctx.transform;
			ctx.transform = function(a,b,c,d,e,f){
				var m2 = svg.createSVGMatrix();
				m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
				xform = xform.multiply(m2);
				return transform.call(ctx,a,b,c,d,e,f);
			};
			var setTransform = ctx.setTransform;
			ctx.setTransform = function(a,b,c,d,e,f){
				xform.a = a;
				xform.b = b;
				xform.c = c;
				xform.d = d;
				xform.e = e;
				xform.f = f;
				return setTransform.call(ctx,a,b,c,d,e,f);
			};
			var pt  = svg.createSVGPoint();
			ctx.transformedPoint = function(x,y){
				pt.x=x; pt.y=y;
				return pt.matrixTransform(xform.inverse());
			}
		}
