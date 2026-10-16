class mZ{ctx=null;isMuted=!0;masterGain=null;constructor(){let J=()=>{this.initContext(),this.isMuted=!1,window.removeEventListener("pointerdown",J),window.removeEventListener("keydown",J)};window.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("keydown",J,{passive:!0})}initContext(){if(!this.ctx){let J=window.AudioContext||window.webkitAudioContext;this.ctx=new J,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(0.18,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination)}if(this.ctx.state==="suspended")this.ctx.resume()}toggleMute(){if(this.initContext(),this.isMuted=!this.isMuted,this.masterGain&&this.ctx){let J=this.isMuted?0:0.18;this.masterGain.gain.setTargetAtTime(J,this.ctx.currentTime,0.05)}if(!this.isMuted)this.playChime(523.25,0.1),setTimeout(()=>this.playChime(659.25,0.15),100);return!this.isMuted}getStatus(){return!this.isMuted}playChime(J=880,Q=0.12){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(J,this.ctx.currentTime),$.frequency.exponentialRampToValueAtTime(J*1.5,this.ctx.currentTime+Q),Z.gain.setValueAtTime(0.25,this.ctx.currentTime),Z.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+Q),$.connect(Z),Z.connect(this.masterGain),$.start(),$.stop(this.ctx.currentTime+Q)}catch{}}playVVVFWhine(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),Q=this.ctx.createGain();J.type="triangle";let $=this.ctx.currentTime;J.frequency.setValueAtTime(220,$),J.frequency.exponentialRampToValueAtTime(880,$+0.35),Q.gain.setValueAtTime(0.2,$),Q.gain.exponentialRampToValueAtTime(0.01,$+0.4),J.connect(Q),Q.connect(this.masterGain),J.start($),J.stop($+0.4)}catch{}}playSignalClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),Q=this.ctx.createGain(),$=this.ctx.currentTime;J.type="square",J.frequency.setValueAtTime(320,$),J.frequency.setValueAtTime(160,$+0.03),Q.gain.setValueAtTime(0.15,$),Q.gain.exponentialRampToValueAtTime(0.001,$+0.06),J.connect(Q),Q.connect(this.masterGain),J.start($),J.stop($+0.06)}catch{}}playButtonPress(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),Q=this.ctx.createGain(),$=this.ctx.currentTime;J.type="sine",J.frequency.setValueAtTime(440,$),J.frequency.exponentialRampToValueAtTime(880,$+0.05),Q.gain.setValueAtTime(0.18,$),Q.gain.exponentialRampToValueAtTime(0.001,$+0.05),J.connect(Q),Q.connect(this.masterGain),J.start($),J.stop($+0.05)}catch{}}playBoardingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),Q=this.ctx.createOscillator(),$=this.ctx.createGain(),Z=this.ctx.currentTime;J.type="sine",Q.type="triangle",J.frequency.setValueAtTime(1046.5,Z),Q.frequency.setValueAtTime(1318.51,Z),$.gain.setValueAtTime(0.2,Z),$.gain.exponentialRampToValueAtTime(0.001,Z+0.2),J.connect($),Q.connect($),$.connect(this.masterGain),J.start(Z),Q.start(Z),J.stop(Z+0.2),Q.stop(Z+0.2)}catch{}}playWhistle(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=[587.33,783.99,987.77];[{time:J,dur:0.14},{time:J+0.18,dur:0.36}].forEach(({time:Z,dur:K})=>{Q.forEach((W,H)=>{if(!this.ctx||!this.masterGain)return;let Y=this.ctx.createOscillator(),X=this.ctx.createGain();Y.type=H===0?"sine":"triangle",Y.frequency.setValueAtTime(W*0.98,Z),Y.frequency.linearRampToValueAtTime(W,Z+0.04),X.gain.setValueAtTime(0.001,Z),X.gain.linearRampToValueAtTime(0.08/Q.length,Z+0.03),X.gain.exponentialRampToValueAtTime(0.001,Z+K),Y.connect(X),X.connect(this.masterGain),Y.start(Z),Y.stop(Z+K+0.05)})})}catch{}}rainSource=null;rainGain=null;setRain(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{if(J){if(this.rainSource)return;let Q=this.ctx.sampleRate*2,$=this.ctx.createBuffer(1,Q,this.ctx.sampleRate),Z=$.getChannelData(0),K=0,W=0,H=0;for(let G=0;G<Q;G++){let N=Math.random()*2-1;K=0.99886*K+N*0.0555179,W=0.99332*W+N*0.0750759,H=0.969*H+N*0.153852,Z[G]=(K+W+H+N*0.5362)*0.04}let Y=this.ctx.createBufferSource();Y.buffer=$,Y.loop=!0;let X=this.ctx.createBiquadFilter();X.type="lowpass",X.frequency.setValueAtTime(950,this.ctx.currentTime);let U=this.ctx.createGain();U.gain.setValueAtTime(0.001,this.ctx.currentTime),U.gain.linearRampToValueAtTime(0.06,this.ctx.currentTime+1.2),Y.connect(X),X.connect(U),U.connect(this.masterGain),Y.start(),this.rainSource=Y,this.rainGain=U}else if(this.rainSource&&this.rainGain){let Q=this.ctx.currentTime;this.rainGain.gain.linearRampToValueAtTime(0.001,Q+0.8),setTimeout(()=>{try{this.rainSource?.stop(),this.rainSource?.disconnect(),this.rainSource=null,this.rainGain=null}catch{}},850)}}catch{}}playRustle(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="triangle",Q.frequency.setValueAtTime(320,J),Q.frequency.exponentialRampToValueAtTime(140,J+0.12),$.gain.setValueAtTime(0.09,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.12),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.12)}catch{}}playWaterDrop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(1200+Math.random()*400,J),Q.frequency.exponentialRampToValueAtTime(1800+Math.random()*400,J+0.08),$.gain.setValueAtTime(0.08,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.08),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.08)}catch{}}playBoatSlosh(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(420,J),Q.frequency.exponentialRampToValueAtTime(180,J+0.18),$.gain.setValueAtTime(0.12,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.18),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.18),setTimeout(()=>this.playWaterDrop(),60)}catch{}}playSheepHop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="triangle",Q.frequency.setValueAtTime(659.25,J),Q.frequency.linearRampToValueAtTime(880,J+0.08),$.gain.setValueAtTime(0.15,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.14),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.14)}catch{}}playLanternSpark(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(1760,J),Q.frequency.exponentialRampToValueAtTime(2200,J+0.22),$.gain.setValueAtTime(0.18,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.22),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.22)}catch{}}playRailClickClack(J=1,Q=!1){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.currentTime,Z=Q?0.14:0.075,K=Q?700:1500;this.synthesizeAxleClick($,1080+Math.random()*80,Z,K),this.synthesizeAxleClick($+0.045,920+Math.random()*80,Z*0.8,K)}catch{}}synthesizeAxleClick(J,Q,$,Z){if(!this.ctx||!this.masterGain)return;let K=this.ctx.createOscillator(),W=this.ctx.createGain(),H=this.ctx.createBiquadFilter();H.type="bandpass",H.frequency.setValueAtTime(Z,J),H.Q.setValueAtTime(3.2,J),K.type="triangle",K.frequency.setValueAtTime(Q,J),K.frequency.exponentialRampToValueAtTime(140,J+0.038),W.gain.setValueAtTime($,J),W.gain.exponentialRampToValueAtTime(0.001,J+0.038),K.connect(H),H.connect(W),W.connect(this.masterGain),K.start(J),K.stop(J+0.04)}playSteamChuff(J=!1){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Q=this.ctx.currentTime,$=0.085,Z=Math.floor(this.ctx.sampleRate*0.085),K=this.ctx.createBuffer(1,Z,this.ctx.sampleRate),W=K.getChannelData(0);for(let U=0;U<Z;U++)W[U]=(Math.random()*2-1)*Math.exp(-U/(Z*0.32));let H=this.ctx.createBufferSource();H.buffer=K;let Y=this.ctx.createBiquadFilter();Y.type="lowpass",Y.frequency.setValueAtTime(J?380:680,Q);let X=this.ctx.createGain();X.gain.setValueAtTime(J?0.11:0.065,Q),X.gain.exponentialRampToValueAtTime(0.001,Q+0.085),H.connect(Y),Y.connect(X),X.connect(this.masterGain),H.start(Q)}catch{}}playCrossingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(1480,J),Q.frequency.exponentialRampToValueAtTime(1470,J+0.16),$.gain.setValueAtTime(0.08,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.16),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.16)}catch{}}playStationClock(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[440,554.37,659.25].forEach((Q,$)=>{if(!this.ctx||!this.masterGain)return;let Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="sine",Z.frequency.setValueAtTime(Q,J+$*0.12),K.gain.setValueAtTime(0.12,J+$*0.12),K.gain.exponentialRampToValueAtTime(0.001,J+$*0.12+0.55),Z.connect(K),K.connect(this.masterGain),Z.start(J+$*0.12),Z.stop(J+$*0.12+0.6)})}catch{}}playTelegraphPing(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="triangle",Q.frequency.setValueAtTime(880,J),Q.frequency.exponentialRampToValueAtTime(440,J+0.14),$.gain.setValueAtTime(0.07,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.14),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.14)}catch{}}playSpeedWhoosh(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Q=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(220,Q),$.frequency.exponentialRampToValueAtTime(220*J,Q+0.28),Z.gain.setValueAtTime(0.11,Q),Z.gain.exponentialRampToValueAtTime(0.001,Q+0.28),$.connect(Z),Z.connect(this.masterGain),$.start(Q),$.stop(Q+0.3)}catch{}}playWindmillSpin(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[180,240,360].forEach((Q,$)=>{if(!this.ctx||!this.masterGain)return;let Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="triangle",Z.frequency.setValueAtTime(Q,J+$*0.05),Z.frequency.exponentialRampToValueAtTime(Q*1.25,J+$*0.05+0.22),K.gain.setValueAtTime(0.08,J+$*0.05),K.gain.exponentialRampToValueAtTime(0.001,J+$*0.05+0.25),Z.connect(K),K.connect(this.masterGain),Z.start(J+$*0.05),Z.stop(J+$*0.05+0.28)})}catch{}}playWaterwheel(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(320,J),Q.frequency.exponentialRampToValueAtTime(140,J+0.15),$.gain.setValueAtTime(0.09,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.15),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.16),setTimeout(()=>this.playWaterDrop(),50)}catch{}}playSwitchClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,Q=this.ctx.createOscillator(),$=this.ctx.createGain();Q.type="square",Q.frequency.setValueAtTime(260,J),Q.frequency.setValueAtTime(120,J+0.04),$.gain.setValueAtTime(0.12,J),$.gain.exponentialRampToValueAtTime(0.001,J+0.08),Q.connect($),$.connect(this.masterGain),Q.start(J),Q.stop(J+0.08)}catch{}}cricketTimer=null;setNightAmbience(J){if(this.cricketTimer)clearInterval(this.cricketTimer),this.cricketTimer=null;if(!J||this.isMuted||!this.ctx)return;let Q=()=>{if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.currentTime,Z=2+Math.floor(Math.random()*2);for(let K=0;K<Z;K++){let W=$+K*0.06,H=this.ctx.createOscillator(),Y=this.ctx.createGain();H.type="sine",H.frequency.setValueAtTime(4600+Math.random()*200,W),Y.gain.setValueAtTime(0.018,W),Y.gain.exponentialRampToValueAtTime(0.0001,W+0.035),H.connect(Y),Y.connect(this.masterGain),H.start(W),H.stop(W+0.04)}}catch{}};Q(),this.cricketTimer=window.setInterval(Q,3200)}}var sH="186",S8={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},w8={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nH=0,EK=1,iH=2;var PQ=1,g$=2,c7=3,s7=0,U9=1,tJ=2,n9=0,SQ=1,T8=2,OK=3,RK=4,oH=5;var n7=100,aH=101,rH=102,tH=103,eH=104,JY=200,QY=201,$Y=202,ZY=203,KY=204,WY=205,HY=206,YY=207,XY=208,UY=209,GY=210,qY=211,NY=212,FY=213,DY=214,EY=0,OY=1,RY=2,LK=3,LY=4,BY=5,MY=6,VY=7,kY=0,zY=1,IY=2,p9=0,BK=1,MK=2,VK=3,wQ=4,kK=5,zK=6,IK=7;var i7=301,a8=302,m$=303,p$=304,TQ=306,r8=1000,d$=1001,CY=1002,_8=1003,AY=1004;var _Q=1005;var G9=1006,u$=1007;var t8=1008;var d9=1009,PY=1010,SY=1011,jQ=1012,CK=1013,j8=1014,D8=1015,i9=1016,AK=1017,PK=1018,o7=1020,wY=35902,TY=35899,_Y=1021,jY=1022,o9=1023,e8=1026,J7=1027,bY=1028,SK=1029,Q7=1030,wK=1031;var TK=1033,l$=33776,c$=33777,s$=33778,n$=33779,_K=35840,jK=35841,bK=35842,yK=35843,fK=36196,xK=37492,hK=37496,vK=37488,gK=37489,i$=37490,mK=37491,pK=37808,dK=37809,uK=37810,lK=37811,cK=37812,sK=37813,nK=37814,iK=37815,oK=37816,aK=37817,rK=37818,tK=37819,eK=37820,J6=37821,Q6=36492,$6=36494,Z6=36495,K6=36283,W6=36284,o$=36285,H6=36286;var Y6=0,yY=1,$7="",fY="srgb",X6="srgb-linear",U6="linear",qJ="srgb";var xY=512,hY=513,vY=514,a$=515,gY=516,mY=517,r$=518,pY=519;var G6="300 es",q6=2000;function aU(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function rU(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function IQ(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function dY(){let J=IQ("canvas");return J.style.display="block",J}var qH={},l7=null;function CQ(...J){let Q="THREE."+J.shift();if(l7)l7("log",Q,...J);else console.log(Q,...J)}function uY(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function b0(...J){J=uY(J);let Q="THREE."+J.shift();if(l7)l7("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function x0(...J){J=uY(J);let Q="THREE."+J.shift();if(l7)l7("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function i8(...J){let Q=J.join(" ");if(Q in qH)return;qH[Q]=!0,b0(...J)}function lY(J,Q,$){return new Promise(function(Z,K){function W(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:K();break;case J.TIMEOUT_EXPIRED:setTimeout(W,$);break;default:Z()}}setTimeout(W,$)})}var cY={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class a9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let K=Z.indexOf(Q);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let K=0,W=Z.length;K<W;K++)Z[K].call(this,J);J.target=null}}}var aJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],NH=1234567,MQ=Math.PI/180,o8=180/Math.PI;function q8(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(aJ[J&255]+aJ[J>>8&255]+aJ[J>>16&255]+aJ[J>>24&255]+"-"+aJ[Q&255]+aJ[Q>>8&255]+"-"+aJ[Q>>16&15|64]+aJ[Q>>24&255]+"-"+aJ[$&63|128]+aJ[$>>8&255]+"-"+aJ[$>>16&255]+aJ[$>>24&255]+aJ[Z&255]+aJ[Z>>8&255]+aJ[Z>>16&255]+aJ[Z>>24&255]).toLowerCase()}function d0(J,Q,$){return Math.max(Q,Math.min($,J))}function N6(J,Q){return(J%Q+Q)%Q}function tU(J,Q,$,Z,K){return Z+(J-Q)*(K-Z)/($-Q)}function eU(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function VQ(J,Q,$){return(1-$)*J+$*Q}function J5(J,Q,$,Z){return VQ(J,Q,1-Math.exp(-$*Z))}function Q5(J,Q=1){return Q-Math.abs(N6(J,Q*2)-Q)}function $5(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function Z5(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function K5(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function W5(J,Q){return J+Math.random()*(Q-J)}function H5(J){return J*(0.5-Math.random())}function Y5(J){if(J!==void 0)NH=J;let Q=NH+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function X5(J){return J*MQ}function U5(J){return J*o8}function G5(J){return J>0&&Number.isInteger(J)&&2**Math.round(Math.log2(J))===J}function q5(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function N5(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function F5(J,Q,$,Z,K){let{cos:W,sin:H}=Math,Y=W($/2),X=H($/2),U=W((Q+Z)/2),G=H((Q+Z)/2),N=W((Q-Z)/2),q=H((Q-Z)/2),F=W((Z-Q)/2),R=H((Z-Q)/2);switch(K){case"XYX":J.set(Y*G,X*N,X*q,Y*U);break;case"YZY":J.set(X*q,Y*G,X*N,Y*U);break;case"ZXZ":J.set(X*N,X*q,Y*G,Y*U);break;case"XZX":J.set(Y*G,X*R,X*F,Y*U);break;case"YXY":J.set(X*F,Y*G,X*R,Y*U);break;case"ZYZ":J.set(X*R,X*F,Y*G,Y*U);break;default:b0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+K)}}function m9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function HJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var bQ={DEG2RAD:MQ,RAD2DEG:o8,generateUUID:q8,clamp:d0,euclideanModulo:N6,mapLinear:tU,inverseLerp:eU,lerp:VQ,damp:J5,pingpong:Q5,smoothstep:$5,smootherstep:Z5,randInt:K5,randFloat:W5,randFloatSpread:H5,seededRandom:Y5,degToRad:X5,radToDeg:U5,isPowerOfTwo:G5,ceilPowerOfTwo:q5,floorPowerOfTwo:N5,setQuaternionFromProperEuler:F5,normalize:HJ,denormalize:m9};class G0{static{G0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=d0(this.x,J.x,Q.x),this.y=d0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=d0(this.x,J,Q),this.y=d0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(d0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(d0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=this.x-J.x,W=this.y-J.y;return this.x=K*$-W*Z+J.x,this.y=K*Z+W*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class w9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,K,W,H){let Y=$[Z+0],X=$[Z+1],U=$[Z+2],G=$[Z+3],N=K[W+0],q=K[W+1],F=K[W+2],R=K[W+3];if(G!==R||Y!==N||X!==q||U!==F){let O=Y*N+X*q+U*F+G*R;if(O<0)N=-N,q=-q,F=-F,R=-R,O=-O;let D=1-H;if(O<0.9995){let E=Math.acos(O),V=Math.sin(E);D=Math.sin(D*E)/V,H=Math.sin(H*E)/V,Y=Y*D+N*H,X=X*D+q*H,U=U*D+F*H,G=G*D+R*H}else{Y=Y*D+N*H,X=X*D+q*H,U=U*D+F*H,G=G*D+R*H;let E=1/Math.sqrt(Y*Y+X*X+U*U+G*G);Y*=E,X*=E,U*=E,G*=E}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=G}static multiplyQuaternionsFlat(J,Q,$,Z,K,W){let H=$[Z],Y=$[Z+1],X=$[Z+2],U=$[Z+3],G=K[W],N=K[W+1],q=K[W+2],F=K[W+3];return J[Q]=H*F+U*G+Y*q-X*N,J[Q+1]=Y*F+U*N+X*G-H*q,J[Q+2]=X*F+U*q+H*N-Y*G,J[Q+3]=U*F-H*G-Y*N-X*q,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:K,_order:W}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(Z/2),G=H(K/2),N=Y($/2),q=Y(Z/2),F=Y(K/2);switch(W){case"XYZ":this._x=N*U*G+X*q*F,this._y=X*q*G-N*U*F,this._z=X*U*F+N*q*G,this._w=X*U*G-N*q*F;break;case"YXZ":this._x=N*U*G+X*q*F,this._y=X*q*G-N*U*F,this._z=X*U*F-N*q*G,this._w=X*U*G+N*q*F;break;case"ZXY":this._x=N*U*G-X*q*F,this._y=X*q*G+N*U*F,this._z=X*U*F+N*q*G,this._w=X*U*G-N*q*F;break;case"ZYX":this._x=N*U*G-X*q*F,this._y=X*q*G+N*U*F,this._z=X*U*F-N*q*G,this._w=X*U*G+N*q*F;break;case"YZX":this._x=N*U*G+X*q*F,this._y=X*q*G+N*U*F,this._z=X*U*F-N*q*G,this._w=X*U*G-N*q*F;break;case"XZY":this._x=N*U*G-X*q*F,this._y=X*q*G-N*U*F,this._z=X*U*F+N*q*G,this._w=X*U*G+N*q*F;break;default:b0("Quaternion: .setFromEuler() encountered an unknown order: "+W)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],K=Q[8],W=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],G=Q[10],N=$+H+G;if(N>0){let q=0.5/Math.sqrt(N+1);this._w=0.25/q,this._x=(U-Y)*q,this._y=(K-X)*q,this._z=(W-Z)*q}else if($>H&&$>G){let q=2*Math.sqrt(1+$-H-G);this._w=(U-Y)/q,this._x=0.25*q,this._y=(Z+W)/q,this._z=(K+X)/q}else if(H>G){let q=2*Math.sqrt(1+H-$-G);this._w=(K-X)/q,this._x=(Z+W)/q,this._y=0.25*q,this._z=(Y+U)/q}else{let q=2*Math.sqrt(1+G-$-H);this._w=(W-Z)/q,this._x=(K+X)/q,this._y=(Y+U)/q,this._z=0.25*q}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(d0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:K,_w:W}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+W*H+Z*X-K*Y,this._y=Z*U+W*Y+K*H-$*X,this._z=K*U+W*X+$*Y-Z*H,this._w=W*U-$*H-Z*Y-K*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:K,_w:W}=J,H=this.dot(J);if(H<0)$=-$,Z=-Z,K=-K,W=-W,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+K*Q,this._w=this._w*Y+W*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+K*Q,this._w=this._w*Y+W*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),K=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),K*Math.sin(Q),K*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{static{w.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(FH.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(FH.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[3]*$+K[6]*Z,this.y=K[1]*Q+K[4]*$+K[7]*Z,this.z=K[2]*Q+K[5]*$+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements,W=1/(K[3]*Q+K[7]*$+K[11]*Z+K[15]);return this.x=(K[0]*Q+K[4]*$+K[8]*Z+K[12])*W,this.y=(K[1]*Q+K[5]*$+K[9]*Z+K[13])*W,this.z=(K[2]*Q+K[6]*$+K[10]*Z+K[14])*W,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,K=J.x,W=J.y,H=J.z,Y=J.w,X=2*(W*Z-H*$),U=2*(H*Q-K*Z),G=2*(K*$-W*Q);return this.x=Q+Y*X+W*G-H*U,this.y=$+Y*U+H*X-K*G,this.z=Z+Y*G+K*U-W*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z,this.y=K[1]*Q+K[5]*$+K[9]*Z,this.z=K[2]*Q+K[6]*$+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=d0(this.x,J.x,Q.x),this.y=d0(this.y,J.y,Q.y),this.z=d0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=d0(this.x,J,Q),this.y=d0(this.y,J,Q),this.z=d0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(d0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:K}=J,W=Q.x,H=Q.y,Y=Q.z;return this.x=Z*Y-K*H,this.y=K*W-$*Y,this.z=$*H-Z*W,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return pZ.copy(this).projectOnVector(J),this.sub(pZ)}reflect(J){return this.sub(pZ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(d0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var pZ=new w,FH=new w9;class g0{static{g0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,K,W,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,W,H,Y,X)}set(J,Q,$,Z,K,W,H,Y,X){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=H,U[3]=Q,U[4]=K,U[5]=Y,U[6]=$,U[7]=W,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,W=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],G=$[7],N=$[2],q=$[5],F=$[8],R=Z[0],O=Z[3],D=Z[6],E=Z[1],V=Z[4],I=Z[7],L=Z[2],M=Z[5],P=Z[8];return K[0]=W*R+H*E+Y*L,K[3]=W*O+H*V+Y*M,K[6]=W*D+H*I+Y*P,K[1]=X*R+U*E+G*L,K[4]=X*O+U*V+G*M,K[7]=X*D+U*I+G*P,K[2]=N*R+q*E+F*L,K[5]=N*O+q*V+F*M,K[8]=N*D+q*I+F*P,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],W=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*W*U-Q*H*X-$*K*U+$*H*Y+Z*K*X-Z*W*Y}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],W=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],G=U*W-H*X,N=H*Y-U*K,q=X*K-W*Y,F=Q*G+$*N+Z*q;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/F;return J[0]=G*R,J[1]=(Z*X-U*$)*R,J[2]=(H*$-Z*W)*R,J[3]=N*R,J[4]=(U*Q-Z*Y)*R,J[5]=(Z*K-H*Q)*R,J[6]=q*R,J[7]=($*Y-X*Q)*R,J[8]=(W*Q-$*K)*R,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,K,W,H){let Y=Math.cos(K),X=Math.sin(K);return this.set($*Y,$*X,-$*(Y*W+X*H)+W+J,-Z*X,Z*Y,-Z*(-X*W+Y*H)+H+Q,0,0,1),this}scale(J,Q){return i8("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dZ.makeScale(J,Q)),this}rotate(J){return i8("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dZ.makeRotation(-J)),this}translate(J,Q){return i8("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dZ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var dZ=new g0,DH=new g0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),EH=new g0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function D5(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(K,W,H){if(this.enabled===!1||W===H||!W||!H)return K;if(this.spaces[W].transfer==="srgb")K.r=N8(K.r),K.g=N8(K.g),K.b=N8(K.b);if(this.spaces[W].primaries!==this.spaces[H].primaries)K.applyMatrix3(this.spaces[W].toXYZ),K.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")K.r=u7(K.r),K.g=u7(K.g),K.b=u7(K.b);return K},workingToColorSpace:function(K,W){return this.convert(K,this.workingColorSpace,W)},colorSpaceToWorking:function(K,W){return this.convert(K,W,this.workingColorSpace)},getPrimaries:function(K){return this.spaces[K].primaries},getTransfer:function(K){if(K==="")return"linear";return this.spaces[K].transfer},getToneMappingMode:function(K){return this.spaces[K].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(K,W=this.workingColorSpace){return K.fromArray(this.spaces[W].luminanceCoefficients)},define:function(K){Object.assign(this.spaces,K)},_getMatrix:function(K,W,H){return K.copy(this.spaces[W].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(K){return this.spaces[K].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(K=this.workingColorSpace){return this.spaces[K].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(K,W){return i8("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(K,W)},toWorkingColorSpace:function(K,W){return i8("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(K,W)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:DH,fromXYZ:EH,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:DH,fromXYZ:EH,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var a0=D5();function N8(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function u7(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var A7;class F6{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(A7===void 0)A7=IQ("canvas");A7.width=J.width,A7.height=J.height;let Z=A7.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=A7}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=IQ("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),K=Z.data;for(let W=0;W<K.length;W++)K[W]=N8(K[W]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(N8(Q[$]/255)*255);else Q[$]=N8(Q[$]);return{data:Q,width:J.width,height:J.height}}else return b0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var E5=0;class yQ{constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:E5++}),this.uuid=q8(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let W=0,H=Z.length;W<H;W++)if(Z[W].isDataTexture)K.push(uZ(Z[W].image));else K.push(uZ(Z[W]))}else K=uZ(Z);$.url=K}if(!Q)J.images[this.uuid]=$;return $}}function uZ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return F6.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return b0("Texture: Unable to serialize Texture."),{}}var O5=0,lZ=new w;class sJ extends a9{constructor(J=sJ.DEFAULT_IMAGE,Q=sJ.DEFAULT_MAPPING,$=1001,Z=1001,K=1006,W=1008,H=1023,Y=1009,X=sJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:O5++}),this.uuid=q8(),this.name="",this.source=new yQ(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=K,this.minFilter=W,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new G0(0,0),this.repeat=new G0(1,1),this.center=new G0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new g0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(lZ).x}get height(){return this.source.getSize(lZ).y}get depth(){return this.source.getSize(lZ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){b0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){b0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}sJ.DEFAULT_IMAGE=null;sJ.DEFAULT_MAPPING=300;sJ.DEFAULT_ANISOTROPY=1;class BJ{static{BJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=this.w,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z+W[12]*K,this.y=W[1]*Q+W[5]*$+W[9]*Z+W[13]*K,this.z=W[2]*Q+W[6]*$+W[10]*Z+W[14]*K,this.w=W[3]*Q+W[7]*$+W[11]*Z+W[15]*K,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,K,W=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],G=Y[8],N=Y[1],q=Y[5],F=Y[9],R=Y[2],O=Y[6],D=Y[10];if(Math.abs(U-N)<0.01&&Math.abs(G-R)<0.01&&Math.abs(F-O)<0.01){if(Math.abs(U+N)<0.1&&Math.abs(G+R)<0.1&&Math.abs(F+O)<0.1&&Math.abs(X+q+D-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let V=(X+1)/2,I=(q+1)/2,L=(D+1)/2,M=(U+N)/4,P=(G+R)/4,A=(F+O)/4;if(V>I&&V>L)if(V<0.01)$=0,Z=0.707106781,K=0.707106781;else $=Math.sqrt(V),Z=M/$,K=P/$;else if(I>L)if(I<0.01)$=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(I),$=M/Z,K=A/Z;else if(L<0.01)$=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(L),$=P/K,Z=A/K;return this.set($,Z,K,Q),this}let E=Math.sqrt((O-F)*(O-F)+(G-R)*(G-R)+(N-U)*(N-U));if(Math.abs(E)<0.001)E=1;return this.x=(O-F)/E,this.y=(G-R)/E,this.z=(N-U)/E,this.w=Math.acos((X+q+D-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=d0(this.x,J.x,Q.x),this.y=d0(this.y,J.y,Q.y),this.z=d0(this.z,J.z,Q.z),this.w=d0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=d0(this.x,J,Q),this.y=d0(this.y,J,Q),this.z=d0(this.z,J,Q),this.w=d0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(d0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class D6 extends a9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new BJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new BJ(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},K=new sJ(Z),W=$.count;for(let H=0;H<W;H++)this.textures[H]=K.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveColorBuffer=$.resolveColorBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this.storeMultisampledColorBuffer=$.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=$.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=$.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,K=this.textures.length;Z<K;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new yQ(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let Q=J.depthTexture.clone();Q.renderTarget=null,this.depthTexture=Q}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class k9 extends D6{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class t$ extends sJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class E6 extends sJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class QJ{static{QJ.prototype.isMatrix4=!0}constructor(J,Q,$,Z,K,W,H,Y,X,U,G,N,q,F,R,O){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,W,H,Y,X,U,G,N,q,F,R,O)}set(J,Q,$,Z,K,W,H,Y,X,U,G,N,q,F,R,O){let D=this.elements;return D[0]=J,D[4]=Q,D[8]=$,D[12]=Z,D[1]=K,D[5]=W,D[9]=H,D[13]=Y,D[2]=X,D[6]=U,D[10]=G,D[14]=N,D[3]=q,D[7]=F,D[11]=R,D[15]=O,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new QJ().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/P7.setFromMatrixColumn(J,0).length(),K=1/P7.setFromMatrixColumn(J,1).length(),W=1/P7.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*K,Q[5]=$[5]*K,Q[6]=$[6]*K,Q[7]=0,Q[8]=$[8]*W,Q[9]=$[9]*W,Q[10]=$[10]*W,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z,W=Math.cos($),H=Math.sin($),Y=Math.cos(Z),X=Math.sin(Z),U=Math.cos(K),G=Math.sin(K);if(J.order==="XYZ"){let N=W*U,q=W*G,F=H*U,R=H*G;Q[0]=Y*U,Q[4]=-Y*G,Q[8]=X,Q[1]=q+F*X,Q[5]=N-R*X,Q[9]=-H*Y,Q[2]=R-N*X,Q[6]=F+q*X,Q[10]=W*Y}else if(J.order==="YXZ"){let N=Y*U,q=Y*G,F=X*U,R=X*G;Q[0]=N+R*H,Q[4]=F*H-q,Q[8]=W*X,Q[1]=W*G,Q[5]=W*U,Q[9]=-H,Q[2]=q*H-F,Q[6]=R+N*H,Q[10]=W*Y}else if(J.order==="ZXY"){let N=Y*U,q=Y*G,F=X*U,R=X*G;Q[0]=N-R*H,Q[4]=-W*G,Q[8]=F+q*H,Q[1]=q+F*H,Q[5]=W*U,Q[9]=R-N*H,Q[2]=-W*X,Q[6]=H,Q[10]=W*Y}else if(J.order==="ZYX"){let N=W*U,q=W*G,F=H*U,R=H*G;Q[0]=Y*U,Q[4]=F*X-q,Q[8]=N*X+R,Q[1]=Y*G,Q[5]=R*X+N,Q[9]=q*X-F,Q[2]=-X,Q[6]=H*Y,Q[10]=W*Y}else if(J.order==="YZX"){let N=W*Y,q=W*X,F=H*Y,R=H*X;Q[0]=Y*U,Q[4]=R-N*G,Q[8]=F*G+q,Q[1]=G,Q[5]=W*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=q*G+F,Q[10]=N-R*G}else if(J.order==="XZY"){let N=W*Y,q=W*X,F=H*Y,R=H*X;Q[0]=Y*U,Q[4]=-G,Q[8]=X*U,Q[1]=N*G+R,Q[5]=W*U,Q[9]=q*G-F,Q[2]=F*G-q,Q[6]=H*U,Q[10]=R*G+N}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(R5,J,L5)}lookAt(J,Q,$){let Z=this.elements;if(B9.subVectors(J,Q),B9.lengthSq()===0)B9.z=1;if(B9.normalize(),z8.crossVectors($,B9),z8.lengthSq()===0){if(Math.abs($.z)===1)B9.x+=0.0001;else B9.z+=0.0001;B9.normalize(),z8.crossVectors($,B9)}return z8.normalize(),q$.crossVectors(B9,z8),Z[0]=z8.x,Z[4]=q$.x,Z[8]=B9.x,Z[1]=z8.y,Z[5]=q$.y,Z[9]=B9.y,Z[2]=z8.z,Z[6]=q$.z,Z[10]=B9.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,W=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],G=$[5],N=$[9],q=$[13],F=$[2],R=$[6],O=$[10],D=$[14],E=$[3],V=$[7],I=$[11],L=$[15],M=Z[0],P=Z[4],A=Z[8],B=Z[12],k=Z[1],b=Z[5],T=Z[9],y=Z[13],c=Z[2],_=Z[6],p=Z[10],o=Z[14],g=Z[3],J0=Z[7],m=Z[11],l=Z[15];return K[0]=W*M+H*k+Y*c+X*g,K[4]=W*P+H*b+Y*_+X*J0,K[8]=W*A+H*T+Y*p+X*m,K[12]=W*B+H*y+Y*o+X*l,K[1]=U*M+G*k+N*c+q*g,K[5]=U*P+G*b+N*_+q*J0,K[9]=U*A+G*T+N*p+q*m,K[13]=U*B+G*y+N*o+q*l,K[2]=F*M+R*k+O*c+D*g,K[6]=F*P+R*b+O*_+D*J0,K[10]=F*A+R*T+O*p+D*m,K[14]=F*B+R*y+O*o+D*l,K[3]=E*M+V*k+I*c+L*g,K[7]=E*P+V*b+I*_+L*J0,K[11]=E*A+V*T+I*p+L*m,K[15]=E*B+V*y+I*o+L*l,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[12],W=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],G=J[6],N=J[10],q=J[14],F=J[3],R=J[7],O=J[11],D=J[15],E=Y*q-X*N,V=H*q-X*G,I=H*N-Y*G,L=W*q-X*U,M=W*N-Y*U,P=W*G-H*U;return Q*(R*E-O*V+D*I)-$*(F*E-O*L+D*M)+Z*(F*V-R*L+D*P)-K*(F*I-R*M+O*P)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[1],W=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(W*U-H*X)-$*(K*U-H*Y)+Z*(K*X-W*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],W=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],G=J[9],N=J[10],q=J[11],F=J[12],R=J[13],O=J[14],D=J[15],E=Q*H-$*W,V=Q*Y-Z*W,I=Q*X-K*W,L=$*Y-Z*H,M=$*X-K*H,P=Z*X-K*Y,A=U*R-G*F,B=U*O-N*F,k=U*D-q*F,b=G*O-N*R,T=G*D-q*R,y=N*D-q*O,c=E*y-V*T+I*b+L*k-M*B+P*A;if(c===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let _=1/c;return J[0]=(H*y-Y*T+X*b)*_,J[1]=(Z*T-$*y-K*b)*_,J[2]=(R*P-O*M+D*L)*_,J[3]=(N*M-G*P-q*L)*_,J[4]=(Y*k-W*y-X*B)*_,J[5]=(Q*y-Z*k+K*B)*_,J[6]=(O*I-F*P-D*V)*_,J[7]=(U*P-N*I+q*V)*_,J[8]=(W*T-H*k+X*A)*_,J[9]=($*k-Q*T-K*A)*_,J[10]=(F*M-R*I+D*E)*_,J[11]=(G*I-U*M-q*E)*_,J[12]=(H*B-W*b-Y*A)*_,J[13]=(Q*b-$*B+Z*A)*_,J[14]=(R*V-F*L-O*E)*_,J[15]=(U*L-G*V+N*E)*_,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=K,Q[1]*=$,Q[5]*=Z,Q[9]*=K,Q[2]*=$,Q[6]*=Z,Q[10]*=K,Q[3]*=$,Q[7]*=Z,Q[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=1-$,W=J.x,H=J.y,Y=J.z,X=K*W,U=K*H;return this.set(X*W+$,X*H-Z*Y,X*Y+Z*H,0,X*H+Z*Y,U*H+$,U*Y-Z*W,0,X*Y-Z*H,U*Y+Z*W,K*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,K,W){return this.set(1,$,K,0,J,1,W,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,K=Q._x,W=Q._y,H=Q._z,Y=Q._w,X=K+K,U=W+W,G=H+H,N=K*X,q=K*U,F=K*G,R=W*U,O=W*G,D=H*G,E=Y*X,V=Y*U,I=Y*G,L=$.x,M=$.y,P=$.z;return Z[0]=(1-(R+D))*L,Z[1]=(q+I)*L,Z[2]=(F-V)*L,Z[3]=0,Z[4]=(q-I)*M,Z[5]=(1-(N+D))*M,Z[6]=(O+E)*M,Z[7]=0,Z[8]=(F+V)*P,Z[9]=(O-E)*P,Z[10]=(1-(N+R))*P,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let K=this.determinantAffine();if(K===0)return $.set(1,1,1),Q.identity(),this;let W=P7.set(Z[0],Z[1],Z[2]).length(),H=P7.set(Z[4],Z[5],Z[6]).length(),Y=P7.set(Z[8],Z[9],Z[10]).length();if(K<0)W=-W;h9.copy(this);let X=1/W,U=1/H,G=1/Y;return h9.elements[0]*=X,h9.elements[1]*=X,h9.elements[2]*=X,h9.elements[4]*=U,h9.elements[5]*=U,h9.elements[6]*=U,h9.elements[8]*=G,h9.elements[9]*=G,h9.elements[10]*=G,Q.setFromRotationMatrix(h9),$.x=W,$.y=H,$.z=Y,this}makePerspective(J,Q,$,Z,K,W,H=2000,Y=!1){let X=this.elements,U=2*K/(Q-J),G=2*K/($-Z),N=(Q+J)/(Q-J),q=($+Z)/($-Z),F,R;if(Y)F=K/(W-K),R=W*K/(W-K);else if(H===2000)F=-(W+K)/(W-K),R=-2*W*K/(W-K);else if(H===2001)F=-W/(W-K),R=-W*K/(W-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=N,X[12]=0,X[1]=0,X[5]=G,X[9]=q,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=R,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,Z,K,W,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),G=2/($-Z),N=-(Q+J)/(Q-J),q=-($+Z)/($-Z),F,R;if(Y)F=1/(W-K),R=W/(W-K);else if(H===2000)F=-2/(W-K),R=-(W+K)/(W-K);else if(H===2001)F=-1/(W-K),R=-K/(W-K);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=N,X[1]=0,X[5]=G,X[9]=0,X[13]=q,X[2]=0,X[6]=0,X[10]=F,X[14]=R,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var P7=new w,h9=new QJ,R5=new w(0,0,0),L5=new w(1,1,1),z8=new w,q$=new w,B9=new w,OH=new QJ,RH=new w9;class F8{constructor(J=0,Q=0,$=0,Z=F8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,K=Z[0],W=Z[4],H=Z[8],Y=Z[1],X=Z[5],U=Z[9],G=Z[2],N=Z[6],q=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(d0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,q),this._z=Math.atan2(-W,K);else this._x=Math.atan2(N,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-d0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,q),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-G,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(d0(N,-1,1)),Math.abs(N)<0.9999999)this._y=Math.atan2(-G,q),this._z=Math.atan2(-W,X);else this._y=0,this._z=Math.atan2(Y,K);break;case"ZYX":if(this._y=Math.asin(-d0(G,-1,1)),Math.abs(G)<0.9999999)this._x=Math.atan2(N,q),this._z=Math.atan2(Y,K);else this._x=0,this._z=Math.atan2(-W,X);break;case"YZX":if(this._z=Math.asin(d0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-G,K);else this._x=0,this._y=Math.atan2(H,q);break;case"XZY":if(this._z=Math.asin(-d0(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(N,X),this._y=Math.atan2(H,K);else this._x=Math.atan2(-U,q),this._y=0;break;default:b0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return OH.makeRotationFromQuaternion(J),this.setFromRotationMatrix(OH,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return RH.setFromEuler(this),this.setFromQuaternion(RH,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}F8.DEFAULT_ORDER="XYZ";class fQ{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var B5=0,LH=new w,S7=new w9,H8=new QJ,N$=new w,NQ=new w,M5=new w,V5=new w9,BH=new w(1,0,0),MH=new w(0,1,0),VH=new w(0,0,1),kH={type:"added"},k5={type:"removed"},w7={type:"childadded",child:null},cZ={type:"childremoved",child:null};class LJ extends a9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:B5++}),this.uuid=q8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=LJ.DEFAULT_UP.clone();let J=new w,Q=new F8,$=new w9,Z=new w(1,1,1);function K(){$.setFromEuler(Q,!1)}function W(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(K),$._onChange(W),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new QJ},normalMatrix:{value:new g0}}),this.matrix=new QJ,this.matrixWorld=new QJ,this.matrixAutoUpdate=LJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=LJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fQ,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return S7.setFromAxisAngle(J,Q),this.quaternion.multiply(S7),this}rotateOnWorldAxis(J,Q){return S7.setFromAxisAngle(J,Q),this.quaternion.premultiply(S7),this}rotateX(J){return this.rotateOnAxis(BH,J)}rotateY(J){return this.rotateOnAxis(MH,J)}rotateZ(J){return this.rotateOnAxis(VH,J)}translateOnAxis(J,Q){return LH.copy(J).applyQuaternion(this.quaternion),this.position.add(LH.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(BH,J)}translateY(J){return this.translateOnAxis(MH,J)}translateZ(J){return this.translateOnAxis(VH,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(H8.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)N$.copy(J);else N$.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),NQ.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)H8.lookAt(NQ,N$,this.up);else H8.lookAt(N$,NQ,this.up);if(this.quaternion.setFromRotationMatrix(H8),Z)H8.extractRotation(Z.matrixWorld),S7.setFromRotationMatrix(H8),this.quaternion.premultiply(S7.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return x0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(kH),w7.child=J,this.dispatchEvent(w7),w7.child=null;else x0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(k5),cZ.child=J,this.dispatchEvent(cZ),cZ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),H8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),H8.multiply(J.parent.matrixWorld);return J.applyMatrix4(H8),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(kH),w7.child=J,this.dispatchEvent(w7),w7.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let W=this.children[$].getObjectByProperty(J,Q);if(W!==void 0)return W}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let K=0,W=Z.length;K<W;K++)Z[K].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(NQ,J,M5),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(NQ,V5,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,K=this.matrix.elements;K[12]+=Q-K[0]*Q-K[4]*$-K[8]*Z,K[13]+=$-K[1]*Q-K[5]*$-K[9]*Z,K[14]+=Z-K[2]*Q-K[6]*$-K[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let K=this.children;for(let W=0,H=K.length;W<H;W++)K[W].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,Z.name=this.name,Z.castShadow=this.castShadow,Z.receiveShadow=this.receiveShadow,Z.visible=this.visible,Z.frustumCulled=this.frustumCulled,Z.renderOrder=this.renderOrder,Z.static=this.static,Z.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function K(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let G=Y[X];K(J.shapes,G)}else K(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(K(J.materials,this.material[Y]));Z.material=H}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];Z.animations.push(K(J.animations,Y))}}if(Q){let H=W(J.geometries),Y=W(J.materials),X=W(J.textures),U=W(J.images),G=W(J.shapes),N=W(J.skeletons),q=W(J.animations),F=W(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(G.length>0)$.shapes=G;if(N.length>0)$.skeletons=N;if(q.length>0)$.animations=q;if(F.length>0)$.nodes=F}return $.object=Z,$;function W(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}LJ.DEFAULT_UP=new w(0,1,0);LJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;LJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class v0 extends LJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var z5={type:"move"};class xQ{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new v0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new v0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new v0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,K=null,W=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){W=!0;for(let R of J.hand.values()){let O=Q.getJointPose(R,$),D=this._getHandJoint(X,R);if(O!==null)D.matrix.fromArray(O.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=O.radius;D.visible=O!==null}let U=X.joints["index-finger-tip"],G=X.joints["thumb-tip"],N=U.position.distanceTo(G.position),q=0.02,F=0.005;if(X.inputState.pinching&&N>q+F)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&N<=q-F)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(K=Q.getPose(J.gripSpace,$),K!==null){if(Y.matrix.fromArray(K.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,K.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(K.linearVelocity);else Y.hasLinearVelocity=!1;if(K.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(K.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&K!==null)Z=K;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(z5)}}}if(H!==null)H.visible=Z!==null;if(Y!==null)Y.visible=K!==null;if(X!==null)X.visible=W!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new v0;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var sY={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},I8={h:0,s:0,l:0},F$={h:0,s:0,l:0};function sZ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class c0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,a0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=a0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,a0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=a0.workingColorSpace){if(J=N6(J,1),Q=d0(Q,0,1),$=d0($,0,1),Q===0)this.r=this.g=this.b=$;else{let K=$<=0.5?$*(1+Q):$+Q-$*Q,W=2*$-K;this.r=sZ(W,K,J+0.3333333333333333),this.g=sZ(W,K,J),this.b=sZ(W,K,J-0.3333333333333333)}return a0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(K){if(K===void 0)return;if(parseFloat(K)<1)b0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,W=Z[1],H=Z[2];switch(W){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,Q);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,Q);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,Q);break;default:b0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],W=K.length;if(W===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,Q);else if(W===6)return this.setHex(parseInt(K,16),Q);else b0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=sY[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else b0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=N8(J.r),this.g=N8(J.g),this.b=N8(J.b),this}copyLinearToSRGB(J){return this.r=u7(J.r),this.g=u7(J.g),this.b=u7(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return a0.workingToColorSpace(rJ.copy(this),J),Math.round(d0(rJ.r*255,0,255))*65536+Math.round(d0(rJ.g*255,0,255))*256+Math.round(d0(rJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=a0.workingColorSpace){a0.workingToColorSpace(rJ.copy(this),Q);let{r:$,g:Z,b:K}=rJ,W=Math.max($,Z,K),H=Math.min($,Z,K),Y,X,U=(H+W)/2;if(H===W)Y=0,X=0;else{let G=W-H;switch(X=U<=0.5?G/(W+H):G/(2-W-H),W){case $:Y=(Z-K)/G+(Z<K?6:0);break;case Z:Y=(K-$)/G+2;break;case K:Y=($-Z)/G+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=a0.workingColorSpace){return a0.workingToColorSpace(rJ.copy(this),Q),J.r=rJ.r,J.g=rJ.g,J.b=rJ.b,J}getStyle(J="srgb"){a0.workingToColorSpace(rJ.copy(this),J);let{r:Q,g:$,b:Z}=rJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(I8),this.setHSL(I8.h+J,I8.s+Q,I8.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(I8),J.getHSL(F$);let $=VQ(I8.h,F$.h,Q),Z=VQ(I8.s,F$.s,Q),K=VQ(I8.l,F$.l,Q);return this.setHSL($,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,K=J.elements;return this.r=K[0]*Q+K[3]*$+K[6]*Z,this.g=K[1]*Q+K[4]*$+K[7]*Z,this.b=K[2]*Q+K[5]*$+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var rJ=new c0;c0.NAMES=sY;class e$ extends LJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new F8,this.environmentIntensity=1,this.environmentRotation=new F8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();return Q.object.backgroundBlurriness=this.backgroundBlurriness,Q.object.backgroundIntensity=this.backgroundIntensity,Q.object.backgroundRotation=this.backgroundRotation.toArray(),Q.object.environmentIntensity=this.environmentIntensity,Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var v9=new w,Y8=new w,nZ=new w,X8=new w,T7=new w,_7=new w,zH=new w,iZ=new w,oZ=new w,aZ=new w,rZ=new BJ,tZ=new BJ,eZ=new BJ;class V9{constructor(J=new w,Q=new w,$=new w){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),v9.subVectors(J,Q),Z.cross(v9);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,K){v9.subVectors(Z,Q),Y8.subVectors($,Q),nZ.subVectors(J,Q);let W=v9.dot(v9),H=v9.dot(Y8),Y=v9.dot(nZ),X=Y8.dot(Y8),U=Y8.dot(nZ),G=W*X-H*H;if(G===0)return K.set(0,0,0),null;let N=1/G,q=(X*Y-H*U)*N,F=(W*U-H*Y)*N;return K.set(1-q-F,F,q)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,X8)===null)return!1;return X8.x>=0&&X8.y>=0&&X8.x+X8.y<=1}static getInterpolation(J,Q,$,Z,K,W,H,Y){if(this.getBarycoord(J,Q,$,Z,X8)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(K,X8.x),Y.addScaledVector(W,X8.y),Y.addScaledVector(H,X8.z),Y}static getInterpolatedAttribute(J,Q,$,Z,K,W){return rZ.setScalar(0),tZ.setScalar(0),eZ.setScalar(0),rZ.fromBufferAttribute(J,Q),tZ.fromBufferAttribute(J,$),eZ.fromBufferAttribute(J,Z),W.setScalar(0),W.addScaledVector(rZ,K.x),W.addScaledVector(tZ,K.y),W.addScaledVector(eZ,K.z),W}static isFrontFacing(J,Q,$,Z){return v9.subVectors($,Q),Y8.subVectors(J,Q),v9.cross(Y8).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return v9.subVectors(this.c,this.b),Y8.subVectors(this.a,this.b),v9.cross(Y8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return V9.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return V9.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,K){return V9.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,K)}containsPoint(J){return V9.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return V9.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,K=this.c,W,H;T7.subVectors(Z,$),_7.subVectors(K,$),iZ.subVectors(J,$);let Y=T7.dot(iZ),X=_7.dot(iZ);if(Y<=0&&X<=0)return Q.copy($);oZ.subVectors(J,Z);let U=T7.dot(oZ),G=_7.dot(oZ);if(U>=0&&G<=U)return Q.copy(Z);let N=Y*G-U*X;if(N<=0&&Y>=0&&U<=0)return W=Y/(Y-U),Q.copy($).addScaledVector(T7,W);aZ.subVectors(J,K);let q=T7.dot(aZ),F=_7.dot(aZ);if(F>=0&&q<=F)return Q.copy(K);let R=q*X-Y*F;if(R<=0&&X>=0&&F<=0)return H=X/(X-F),Q.copy($).addScaledVector(_7,H);let O=U*F-q*G;if(O<=0&&G-U>=0&&q-F>=0)return zH.subVectors(K,Z),H=(G-U)/(G-U+(q-F)),Q.copy(Z).addScaledVector(zH,H);let D=1/(O+R+N);return W=R*D,H=N*D,Q.copy($).addScaledVector(T7,W).addScaledVector(_7,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class Z7{constructor(J=new w(1/0,1/0,1/0),Q=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(g9.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(g9.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=g9.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let K=$.getAttribute("position");if(Q===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let W=0,H=K.count;W<H;W++){if(J.isMesh===!0)J.getVertexPosition(W,g9);else g9.fromBufferAttribute(K,W);g9.applyMatrix4(J.matrixWorld),this.expandByPoint(g9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();D$.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();D$.copy($.boundingBox)}D$.applyMatrix4(J.matrixWorld),this.union(D$)}}let Z=J.children;for(let K=0,W=Z.length;K<W;K++)this.expandByObject(Z[K],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,g9),g9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(FQ),E$.subVectors(this.max,FQ),j7.subVectors(J.a,FQ),b7.subVectors(J.b,FQ),y7.subVectors(J.c,FQ),C8.subVectors(b7,j7),A8.subVectors(y7,b7),l8.subVectors(j7,y7);let Q=[0,-C8.z,C8.y,0,-A8.z,A8.y,0,-l8.z,l8.y,C8.z,0,-C8.x,A8.z,0,-A8.x,l8.z,0,-l8.x,-C8.y,C8.x,0,-A8.y,A8.x,0,-l8.y,l8.x,0];if(!JK(Q,j7,b7,y7,E$))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!JK(Q,j7,b7,y7,E$))return!1;return O$.crossVectors(C8,A8),Q=[O$.x,O$.y,O$.z],JK(Q,j7,b7,y7,E$)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,g9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(g9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return U8[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),U8[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),U8[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),U8[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),U8[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),U8[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),U8[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),U8[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(U8),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var U8=[new w,new w,new w,new w,new w,new w,new w,new w],g9=new w,D$=new Z7,j7=new w,b7=new w,y7=new w,C8=new w,A8=new w,l8=new w,FQ=new w,E$=new w,O$=new w,c8=new w;function JK(J,Q,$,Z,K){for(let W=0,H=J.length-3;W<=H;W+=3){c8.fromArray(J,W);let Y=K.x*Math.abs(c8.x)+K.y*Math.abs(c8.y)+K.z*Math.abs(c8.z),X=Q.dot(c8),U=$.dot(c8),G=Z.dot(c8);if(Math.max(-Math.max(X,U,G),Math.min(X,U,G))>Y)return!1}return!0}var xJ=new w,R$=new G0,I5=0;class H9 extends a9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:I5++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)R$.fromBufferAttribute(this,Q),R$.applyMatrix3(J),this.setXY(Q,R$.x,R$.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)xJ.fromBufferAttribute(this,Q),xJ.applyMatrix3(J),this.setXYZ(Q,xJ.x,xJ.y,xJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)xJ.fromBufferAttribute(this,Q),xJ.applyMatrix4(J),this.setXYZ(Q,xJ.x,xJ.y,xJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)xJ.fromBufferAttribute(this,Q),xJ.applyNormalMatrix(J),this.setXYZ(Q,xJ.x,xJ.y,xJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)xJ.fromBufferAttribute(this,Q),xJ.transformDirection(J),this.setXYZ(Q,xJ.x,xJ.y,xJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=m9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=HJ($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=m9(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=m9(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=m9(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=m9(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),Z=HJ(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J*=this.itemSize,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),Z=HJ(Z,this.array),K=HJ(K,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class JZ extends H9{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class QZ extends H9{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class $J extends H9{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var C5=new Z7,DQ=new w,QK=new w;class K7{constructor(J=new w,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else C5.setFromPoints(J).getCenter($);let Z=0;for(let K=0,W=J.length;K<W;K++)Z=Math.max(Z,$.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;DQ.subVectors(J,this.center);let Q=DQ.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(DQ,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else QK.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(DQ.copy(J.center).add(QK)),this.expandByPoint(DQ.copy(J.center).sub(QK));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var A5=0,P9=new QJ,$K=new LJ,f7=new w,M9=new Z7,EQ=new Z7,dJ=new w;class wJ extends a9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:A5++}),this.uuid=q8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((aU(J))?QZ:JZ)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let K=new g0().getNormalMatrix(J);$.applyNormalMatrix(K),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return P9.makeRotationFromQuaternion(J),this.applyMatrix4(P9),this}rotateX(J){return P9.makeRotationX(J),this.applyMatrix4(P9),this}rotateY(J){return P9.makeRotationY(J),this.applyMatrix4(P9),this}rotateZ(J){return P9.makeRotationZ(J),this.applyMatrix4(P9),this}translate(J,Q,$){return P9.makeTranslation(J,Q,$),this.applyMatrix4(P9),this}scale(J,Q,$){return P9.makeScale(J,Q,$),this.applyMatrix4(P9),this}lookAt(J){return $K.lookAt(J),$K.updateMatrix(),this.applyMatrix4($K.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(f7).negate(),this.translate(f7.x,f7.y,f7.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,K=J.length;Z<K;Z++){let W=J[Z];$.push(W.x,W.y,W.z||0)}this.setAttribute("position",new $J($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let K=J[Z];Q.setXYZ(Z,K.x,K.y,K.z||0)}if(J.length>Q.count)b0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Z7;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){x0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let K=Q[$];if(M9.setFromBufferAttribute(K),this.morphTargetsRelative)dJ.addVectors(this.boundingBox.min,M9.min),this.boundingBox.expandByPoint(dJ),dJ.addVectors(this.boundingBox.max,M9.max),this.boundingBox.expandByPoint(dJ);else this.boundingBox.expandByPoint(M9.min),this.boundingBox.expandByPoint(M9.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))x0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new K7;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){x0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(J){let $=this.boundingSphere.center;if(M9.setFromBufferAttribute(J),Q)for(let K=0,W=Q.length;K<W;K++){let H=Q[K];if(EQ.setFromBufferAttribute(H),this.morphTargetsRelative)dJ.addVectors(M9.min,EQ.min),M9.expandByPoint(dJ),dJ.addVectors(M9.max,EQ.max),M9.expandByPoint(dJ);else M9.expandByPoint(EQ.min),M9.expandByPoint(EQ.max)}M9.getCenter($);let Z=0;for(let K=0,W=J.count;K<W;K++)dJ.fromBufferAttribute(J,K),Z=Math.max(Z,$.distanceToSquared(dJ));if(Q)for(let K=0,W=Q.length;K<W;K++){let H=Q[K],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(dJ.fromBufferAttribute(H,X),Y)f7.fromBufferAttribute(J,X),dJ.add(f7);Z=Math.max(Z,$.distanceToSquared(dJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))x0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){x0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:K}=Q,W=this.getAttribute("tangent");if(W===void 0||W.count!==$.count)W=new H9(new Float32Array(4*$.count),4),this.setAttribute("tangent",W);let H=[],Y=[];for(let A=0;A<$.count;A++)H[A]=new w,Y[A]=new w;let X=new w,U=new w,G=new w,N=new G0,q=new G0,F=new G0,R=new w,O=new w;function D(A,B,k){X.fromBufferAttribute($,A),U.fromBufferAttribute($,B),G.fromBufferAttribute($,k),N.fromBufferAttribute(K,A),q.fromBufferAttribute(K,B),F.fromBufferAttribute(K,k),U.sub(X),G.sub(X),q.sub(N),F.sub(N);let b=1/(q.x*F.y-F.x*q.y);if(!isFinite(b))return;R.copy(U).multiplyScalar(F.y).addScaledVector(G,-q.y).multiplyScalar(b),O.copy(G).multiplyScalar(q.x).addScaledVector(U,-F.x).multiplyScalar(b),H[A].add(R),H[B].add(R),H[k].add(R),Y[A].add(O),Y[B].add(O),Y[k].add(O)}let E=this.groups;if(E.length===0)E=[{start:0,count:J.count}];for(let A=0,B=E.length;A<B;++A){let k=E[A],b=k.start,T=k.count;for(let y=b,c=b+T;y<c;y+=3)D(J.getX(y+0),J.getX(y+1),J.getX(y+2))}let V=new w,I=new w,L=new w,M=new w;function P(A){L.fromBufferAttribute(Z,A),M.copy(L);let B=H[A];V.copy(B),V.sub(L.multiplyScalar(L.dot(B))).normalize(),I.crossVectors(M,B);let b=I.dot(Y[A])<0?-1:1;W.setXYZW(A,V.x,V.y,V.z,b)}for(let A=0,B=E.length;A<B;++A){let k=E[A],b=k.start,T=k.count;for(let y=b,c=b+T;y<c;y+=3)P(J.getX(y+0)),P(J.getX(y+1)),P(J.getX(y+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new H9(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let N=0,q=$.count;N<q;N++)$.setXYZ(N,0,0,0);let Z=new w,K=new w,W=new w,H=new w,Y=new w,X=new w,U=new w,G=new w;if(J)for(let N=0,q=J.count;N<q;N+=3){let F=J.getX(N+0),R=J.getX(N+1),O=J.getX(N+2);Z.fromBufferAttribute(Q,F),K.fromBufferAttribute(Q,R),W.fromBufferAttribute(Q,O),U.subVectors(W,K),G.subVectors(Z,K),U.cross(G),H.fromBufferAttribute($,F),Y.fromBufferAttribute($,R),X.fromBufferAttribute($,O),H.add(U),Y.add(U),X.add(U),$.setXYZ(F,H.x,H.y,H.z),$.setXYZ(R,Y.x,Y.y,Y.z),$.setXYZ(O,X.x,X.y,X.z)}else for(let N=0,q=Q.count;N<q;N+=3)Z.fromBufferAttribute(Q,N+0),K.fromBufferAttribute(Q,N+1),W.fromBufferAttribute(Q,N+2),U.subVectors(W,K),G.subVectors(Z,K),U.cross(G),$.setXYZ(N+0,U.x,U.y,U.z),$.setXYZ(N+1,U.x,U.y,U.z),$.setXYZ(N+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)dJ.fromBufferAttribute(J,Q),dJ.normalize(),J.setXYZ(Q,dJ.x,dJ.y,dJ.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:G}=H,N=new X.constructor(Y.length*U),q=0,F=0;for(let R=0,O=Y.length;R<O;R++){if(H.isInterleavedBufferAttribute)q=Y[R]*H.data.stride+H.offset;else q=Y[R]*U;for(let D=0;D<U;D++)N[F++]=X[q++]}return new H9(N,U,G)}if(this.index===null)return b0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new wJ,$=this.index.array,Z=this.attributes;for(let H in Z){let Y=Z[H],X=J(Y,$);Q.setAttribute(H,X)}let K=this.morphAttributes;for(let H in K){let Y=[],X=K[H];for(let U=0,G=X.length;U<G;U++){let N=X[U],q=J(N,$);Y.push(q)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;for(let H=0,Y=W.length;H<Y;H++){let X=W[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let Z={},K=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let G=0,N=X.length;G<N;G++){let q=X[G];U.push(q.toJSON(J.data))}if(U.length>0)Z[Y]=U,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;if(W.length>0)J.data.groups=JSON.parse(JSON.stringify(W));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let X in Z){let U=Z[X];this.setAttribute(X,U.clone(Q))}let K=J.morphAttributes;for(let X in K){let U=[],G=K[X];for(let N=0,q=G.length;N<q;N++)U.push(G[N].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let W=J.groups;for(let X=0,U=W.length;X<U;X++){let G=W[X];this.addGroup(G.start,G.count,G.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class O6{constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=q8()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=q8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=q8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let Q={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return Q.usage=this.usage,Q}}var W9=new w;class AQ{constructor(J,Q,$,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)W9.fromBufferAttribute(this,Q),W9.applyMatrix4(J),this.setXYZ(Q,W9.x,W9.y,W9.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)W9.fromBufferAttribute(this,Q),W9.applyNormalMatrix(J),this.setXYZ(Q,W9.x,W9.y,W9.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)W9.fromBufferAttribute(this,Q),W9.transformDirection(J),this.setXYZ(Q,W9.x,W9.y,W9.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=m9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=HJ($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=m9(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=m9(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=m9(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=m9(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),Z=HJ(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),Z=HJ(Z,this.array),K=HJ(K,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){CQ("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return new H9(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new AQ(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){CQ("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var ZK=new w,P5=new w,S5=new g0;class S9{constructor(J=new w(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=ZK.subVectors($,Q).cross(P5.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(ZK),K=this.normal.dot(Z);if(K===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let W=-(J.start.dot(this.normal)+this.constant)/K;if($===!0&&(W<0||W>1))return null;return Q.copy(J.start).addScaledVector(Z,W)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||S5.getNormalMatrix(J),Z=this.coplanarPoint(ZK).applyMatrix4(J),K=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var w5=0;class r9 extends a9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:w5++}),this.uuid=q8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new c0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){b0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){b0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,$.blending=this.blending,$.side=this.side,$.shadowSide=this.shadowSide,$.vertexColors=this.vertexColors,$.opacity=this.opacity,$.transparent=this.transparent,$.blendSrc=this.blendSrc,$.blendDst=this.blendDst,$.blendEquation=this.blendEquation,$.blendSrcAlpha=this.blendSrcAlpha,$.blendDstAlpha=this.blendDstAlpha,$.blendEquationAlpha=this.blendEquationAlpha,$.blendColor=this.blendColor.getHex(),$.blendAlpha=this.blendAlpha,$.depthFunc=this.depthFunc,$.depthTest=this.depthTest,$.depthWrite=this.depthWrite,$.colorWrite=this.colorWrite,$.clipIntersection=this.clipIntersection,$.clipShadows=this.clipShadows,$.stencilWriteMask=this.stencilWriteMask,$.stencilFunc=this.stencilFunc,$.stencilRef=this.stencilRef,$.stencilFuncMask=this.stencilFuncMask,$.stencilFail=this.stencilFail,$.stencilZFail=this.stencilZFail,$.stencilZPass=this.stencilZPass,$.stencilWrite=this.stencilWrite,$.polygonOffset=this.polygonOffset,$.polygonOffsetFactor=this.polygonOffsetFactor,$.polygonOffsetUnits=this.polygonOffsetUnits,$.dithering=this.dithering,$.alphaTest=this.alphaTest,$.alphaHash=this.alphaHash,$.alphaToCoverage=this.alphaToCoverage,$.premultipliedAlpha=this.premultipliedAlpha,$.forceSinglePass=this.forceSinglePass,$.allowOverride=this.allowOverride,$.visible=this.visible,$.toneMapped=this.toneMapped,$.name=this.name,this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)$.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)$.clippingPlanes=this.clippingPlanes.map((K)=>K.toJSON());if(this.rotation!==void 0)$.rotation=this.rotation;if(this.depthPacking!==void 0)$.depthPacking=this.depthPacking;if(this.linewidth!==void 0)$.linewidth=this.linewidth;if(this.linecap!==void 0)$.linecap=this.linecap;if(this.linejoin!==void 0)$.linejoin=this.linejoin;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.wireframe!==void 0)$.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)$.flatShading=this.flatShading;if(this.fog!==void 0)$.fog=this.fog;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(K){let W=[];for(let H in K){let Y=K[H];delete Y.metadata,W.push(Y)}return W}if(Q){let K=Z(J.textures),W=Z(J.images);if(K.length>0)$.textures=K;if(W.length>0)$.images=W}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new c0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map(($)=>new S9().fromJSON($));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new G0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new G0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let K=0;K!==Z;++K)$[K]=Q[K].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class hQ extends r9{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new c0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var x7,OQ=new w,h7=new w,v7=new w,g7=new G0,RQ=new G0,nY=new QJ,L$=new w,LQ=new w,B$=new w,IH=new G0,KK=new G0,CH=new G0;class $Z extends LJ{constructor(J=new hQ){super();if(this.isSprite=!0,this.type="Sprite",x7===void 0){x7=new wJ;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),$=new O6(Q,5);x7.setIndex([0,1,2,0,2,3]),x7.setAttribute("position",new AQ($,3,0,!1)),x7.setAttribute("uv",new AQ($,2,3,!1))}this.geometry=x7,this.material=J,this.center=new G0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,Q){if(J.camera===null)x0('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(h7.setFromMatrixScale(this.matrixWorld),nY.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),v7.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)h7.multiplyScalar(-v7.z);let $=this.material.rotation,Z,K;if($!==0)K=Math.cos($),Z=Math.sin($);let W=this.center;M$(L$.set(-0.5,-0.5,0),v7,W,h7,Z,K),M$(LQ.set(0.5,-0.5,0),v7,W,h7,Z,K),M$(B$.set(0.5,0.5,0),v7,W,h7,Z,K),IH.set(0,0),KK.set(1,0),CH.set(1,1);let H=J.ray.intersectTriangle(L$,LQ,B$,!1,OQ);if(H===null){if(M$(LQ.set(-0.5,0.5,0),v7,W,h7,Z,K),KK.set(0,1),H=J.ray.intersectTriangle(L$,B$,LQ,!1,OQ),H===null)return}let Y=J.ray.origin.distanceTo(OQ);if(Y<J.near||Y>J.far)return;Q.push({distance:Y,point:OQ.clone(),uv:V9.getInterpolation(OQ,L$,LQ,B$,IH,KK,CH,new G0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function M$(J,Q,$,Z,K,W){if(g7.subVectors(J,$).addScalar(0.5).multiply(Z),K!==void 0)RQ.x=W*g7.x-K*g7.y,RQ.y=K*g7.x+W*g7.y;else RQ.copy(g7);J.copy(Q),J.x+=RQ.x,J.y+=RQ.y,J.applyMatrix4(nY)}var G8=new w,WK=new w,V$=new w,k$=new w;class b8{constructor(J=new w,Q=new w(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,G8)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=G8.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return G8.copy(this.origin).addScaledVector(this.direction,Q),G8.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){WK.copy(J).add(Q).multiplyScalar(0.5),V$.copy(Q).sub(J).normalize(),k$.copy(this.origin).sub(WK);let K=J.distanceTo(Q)*0.5,W=-this.direction.dot(V$),H=k$.dot(this.direction),Y=-k$.dot(V$),X=k$.lengthSq(),U=Math.abs(1-W*W),G,N,q,F;if(U>0)if(G=W*Y-H,N=W*H-Y,F=K*U,G>=0)if(N>=-F)if(N<=F){let R=1/U;G*=R,N*=R,q=G*(G+W*N+2*H)+N*(W*G+N+2*Y)+X}else N=K,G=Math.max(0,-(W*N+H)),q=-G*G+N*(N+2*Y)+X;else N=-K,G=Math.max(0,-(W*N+H)),q=-G*G+N*(N+2*Y)+X;else if(N<=-F)G=Math.max(0,-(-W*K+H)),N=G>0?-K:Math.min(Math.max(-K,-Y),K),q=-G*G+N*(N+2*Y)+X;else if(N<=F)G=0,N=Math.min(Math.max(-K,-Y),K),q=N*(N+2*Y)+X;else G=Math.max(0,-(W*K+H)),N=G>0?K:Math.min(Math.max(-K,-Y),K),q=-G*G+N*(N+2*Y)+X;else N=W>0?-K:K,G=Math.max(0,-(W*N+H)),q=-G*G+N*(N+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,G);if(Z)Z.copy(WK).addScaledVector(V$,N);return q}intersectSphere(J,Q){if(J.radius<0)return null;G8.subVectors(J.center,this.origin);let $=G8.dot(this.direction),Z=G8.dot(G8)-$*$,K=J.radius*J.radius;if(Z>K)return null;let W=Math.sqrt(K-Z),H=$-W,Y=$+W;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,K,W,H,Y,X=1/this.direction.x,U=1/this.direction.y,G=1/this.direction.z,N=this.origin;if(X>=0)$=(J.min.x-N.x)*X,Z=(J.max.x-N.x)*X;else $=(J.max.x-N.x)*X,Z=(J.min.x-N.x)*X;if(U>=0)K=(J.min.y-N.y)*U,W=(J.max.y-N.y)*U;else K=(J.max.y-N.y)*U,W=(J.min.y-N.y)*U;if($>W||K>Z)return null;if(K>$||isNaN($))$=K;if(W<Z||isNaN(Z))Z=W;if(G>=0)H=(J.min.z-N.z)*G,Y=(J.max.z-N.z)*G;else H=(J.max.z-N.z)*G,Y=(J.min.z-N.z)*G;if($>Y||H>Z)return null;if(H>$||$!==$)$=H;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,G8)!==null}intersectTriangle(J,Q,$,Z,K){let W=this.origin,H=this.direction,Y=H.x,X=H.y,U=H.z,G=J.x-W.x,N=J.y-W.y,q=J.z-W.z,F=Q.x-W.x,R=Q.y-W.y,O=Q.z-W.z,D=$.x-W.x,E=$.y-W.y,V=$.z-W.z,I=Math.abs(Y),L=Math.abs(X),M=Math.abs(U),P,A,B,k,b,T,y,c,_,p,o,g;if(I>=L&&I>=M)if(B=Y,T=G,_=F,g=D,Y>=0)P=X,A=U,k=N,b=q,y=R,c=O,p=E,o=V;else P=U,A=X,k=q,b=N,y=O,c=R,p=V,o=E;else if(L>=M)if(B=X,T=N,_=R,g=E,X>=0)P=U,A=Y,k=q,b=G,y=O,c=F,p=V,o=D;else P=Y,A=U,k=G,b=q,y=F,c=O,p=D,o=V;else if(B=U,T=q,_=O,g=V,U>=0)P=Y,A=X,k=G,b=N,y=F,c=R,p=D,o=E;else P=X,A=Y,k=N,b=G,y=R,c=F,p=E,o=D;if(B===0)return null;let J0=P/B,m=A/B,l=1/B,a=k-J0*T,U0=b-m*T,q0=y-J0*_,f0=c-m*_,S0=p-J0*g,i=o-m*g,K0=S0*f0-i*q0,Z0=a*i-U0*S0,T0=q0*U0-f0*a;if(Z){if(K0<0||Z0<0||T0<0)return null}else if((K0<0||Z0<0||T0<0)&&(K0>0||Z0>0||T0>0))return null;let j0=K0+Z0+T0;if(j0===0)return null;let w0=l*(K0*T+Z0*_+T0*g);if(j0>0?w0<0:w0>0)return null;return this.at(w0/j0,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class uJ extends r9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new c0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new F8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var AH=new QJ,s8=new b8,z$=new K7,PH=new w,I$=new w,C$=new w,A$=new w,HK=new w,P$=new w,SH=new w,S$=new w;class v extends LJ{constructor(J=new wJ,Q=new uJ){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,K=$.morphAttributes.position,W=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(K&&H){P$.set(0,0,0);for(let Y=0,X=K.length;Y<X;Y++){let U=H[Y],G=K[Y];if(U===0)continue;if(HK.fromBufferAttribute(G,J),W)P$.addScaledVector(HK,U);else P$.addScaledVector(HK.sub(Q),U)}Q.add(P$)}return Q}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(z$.copy($.boundingSphere),z$.applyMatrix4(K),s8.copy(J.ray).recast(J.near),z$.containsPoint(s8.origin)===!1){if(s8.intersectSphere(z$,PH)===null)return;if(s8.origin.distanceToSquared(PH)>(J.far-J.near)**2)return}if(AH.copy(K).invert(),s8.copy(J.ray).applyMatrix4(AH),$.boundingBox!==null){if(s8.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,s8)}_computeIntersections(J,Q,$){let Z,K=this.geometry,W=this.material,H=K.index,Y=K.attributes.position,X=K.attributes.uv,U=K.attributes.uv1,G=K.attributes.normal,N=K.groups,q=K.drawRange;if(H!==null)if(Array.isArray(W))for(let F=0,R=N.length;F<R;F++){let O=N[F],D=W[O.materialIndex],E=Math.max(O.start,q.start),V=Math.min(H.count,Math.min(O.start+O.count,q.start+q.count));for(let I=E,L=V;I<L;I+=3){let M=H.getX(I),P=H.getX(I+1),A=H.getX(I+2);if(Z=w$(this,D,J,$,X,U,G,M,P,A),Z)Z.faceIndex=Math.floor(I/3),Z.face.materialIndex=O.materialIndex,Q.push(Z)}}else{let F=Math.max(0,q.start),R=Math.min(H.count,q.start+q.count);for(let O=F,D=R;O<D;O+=3){let E=H.getX(O),V=H.getX(O+1),I=H.getX(O+2);if(Z=w$(this,W,J,$,X,U,G,E,V,I),Z)Z.faceIndex=Math.floor(O/3),Q.push(Z)}}else if(Y!==void 0)if(Array.isArray(W))for(let F=0,R=N.length;F<R;F++){let O=N[F],D=W[O.materialIndex],E=Math.max(O.start,q.start),V=Math.min(Y.count,Math.min(O.start+O.count,q.start+q.count));for(let I=E,L=V;I<L;I+=3){let M=I,P=I+1,A=I+2;if(Z=w$(this,D,J,$,X,U,G,M,P,A),Z)Z.faceIndex=Math.floor(I/3),Z.face.materialIndex=O.materialIndex,Q.push(Z)}}else{let F=Math.max(0,q.start),R=Math.min(Y.count,q.start+q.count);for(let O=F,D=R;O<D;O+=3){let E=O,V=O+1,I=O+2;if(Z=w$(this,W,J,$,X,U,G,E,V,I),Z)Z.faceIndex=Math.floor(O/3),Q.push(Z)}}}}function T5(J,Q,$,Z,K,W,H,Y){let X;if(Q.side===1)X=Z.intersectTriangle(H,W,K,!0,Y);else X=Z.intersectTriangle(K,W,H,Q.side===0,Y);if(X===null)return null;S$.copy(Y),S$.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(S$);if(U<$.near||U>$.far)return null;return{distance:U,point:S$.clone(),object:J}}function w$(J,Q,$,Z,K,W,H,Y,X,U){J.getVertexPosition(Y,I$),J.getVertexPosition(X,C$),J.getVertexPosition(U,A$);let G=T5(J,Q,$,Z,I$,C$,A$,SH);if(G){let N=new w;if(V9.getBarycoord(SH,I$,C$,A$,N),K)G.uv=V9.getInterpolatedAttribute(K,Y,X,U,N,new G0);if(W)G.uv1=V9.getInterpolatedAttribute(W,Y,X,U,N,new G0);if(H){if(G.normal=V9.getInterpolatedAttribute(H,Y,X,U,N,new w),G.normal.dot(Z.direction)>0)G.normal.multiplyScalar(-1)}let q={a:Y,b:X,c:U,normal:new w,materialIndex:0};V9.getNormal(I$,C$,A$,q.normal),G.face=q,G.barycoord=N}return G}class R6 extends sJ{constructor(J=null,Q=1,$=1,Z,K,W,H,Y,X=1003,U=1003,G,N){super(null,W,H,Y,X,U,Z,K,G,N);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var n8=new K7,_5=new G0(0.5,0.5),T$=new w;class vQ{constructor(J=new S9,Q=new S9,$=new S9,Z=new S9,K=new S9,W=new S9){this.planes=[J,Q,$,Z,K,W]}set(J,Q,$,Z,K,W){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(Z),H[4].copy(K),H[5].copy(W),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,K=J.elements,W=K[0],H=K[1],Y=K[2],X=K[3],U=K[4],G=K[5],N=K[6],q=K[7],F=K[8],R=K[9],O=K[10],D=K[11],E=K[12],V=K[13],I=K[14],L=K[15];if(Z[0].setComponents(X-W,q-U,D-F,L-E).normalize(),Z[1].setComponents(X+W,q+U,D+F,L+E).normalize(),Z[2].setComponents(X+H,q+G,D+R,L+V).normalize(),Z[3].setComponents(X-H,q-G,D-R,L-V).normalize(),$)Z[4].setComponents(Y,N,O,I).normalize(),Z[5].setComponents(X-Y,q-N,D-O,L-I).normalize();else if(Z[4].setComponents(X-Y,q-N,D-O,L-I).normalize(),Q===2000)Z[5].setComponents(X+Y,q+N,D+O,L+I).normalize();else if(Q===2001)Z[5].setComponents(Y,N,O,I).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();n8.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();n8.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(n8)}intersectsSprite(J){n8.center.set(0,0,0);let Q=_5.distanceTo(J.center);return n8.radius=0.7071067811865476+Q,n8.applyMatrix4(J.matrixWorld),this.intersectsSphere(n8)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let K=0;K<6;K++)if(Q[K].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(T$.x=Z.normal.x>0?J.max.x:J.min.x,T$.y=Z.normal.y>0?J.max.y:J.min.y,T$.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(T$)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gQ extends r9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new c0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var h$=new w,v$=new w,wH=new QJ,BQ=new b8,_$=new K7,YK=new w,TH=new w;class L6 extends LJ{constructor(J=new wJ,Q=new gQ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,K=Q.count;Z<K;Z++)h$.fromBufferAttribute(Q,Z-1),v$.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=h$.distanceTo(v$);J.setAttribute("lineDistance",new $J($,1))}else b0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,W=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(_$.copy($.boundingSphere),_$.applyMatrix4(Z),_$.radius+=K,J.ray.intersectsSphere(_$)===!1)return;wH.copy(Z).invert(),BQ.copy(J.ray).applyMatrix4(wH);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,N=$.attributes.position;if(U!==null){let q=Math.max(0,W.start),F=Math.min(U.count,W.start+W.count);for(let R=q,O=F-1;R<O;R+=X){let D=U.getX(R),E=U.getX(R+1),V=j$(this,J,BQ,Y,D,E,R);if(V)Q.push(V)}if(this.isLineLoop){let R=U.getX(F-1),O=U.getX(q),D=j$(this,J,BQ,Y,R,O,F-1);if(D)Q.push(D)}}else{let q=Math.max(0,W.start),F=Math.min(N.count,W.start+W.count);for(let R=q,O=F-1;R<O;R+=X){let D=j$(this,J,BQ,Y,R,R+1,R);if(D)Q.push(D)}if(this.isLineLoop){let R=j$(this,J,BQ,Y,F-1,q,F-1);if(R)Q.push(R)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function j$(J,Q,$,Z,K,W,H){let Y=J.geometry.attributes.position;if(h$.fromBufferAttribute(Y,K),v$.fromBufferAttribute(Y,W),$.distanceSqToSegment(h$,v$,YK,TH)>Z)return;YK.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(YK);if(U<Q.near||U>Q.far)return;return{distance:U,point:TH.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var _H=new w,jH=new w;class ZZ extends L6{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,K=Q.count;Z<K;Z+=2)_H.fromBufferAttribute(Q,Z),jH.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+_H.distanceTo(jH);J.setAttribute("lineDistance",new $J($,1))}else b0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class mQ extends r9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new c0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var bH=new QJ,FK=new b8,b$=new K7,y$=new w;class KZ extends LJ{constructor(J=new wJ,Q=new mQ){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,K=J.params.Points.threshold,W=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(b$.copy($.boundingSphere),b$.applyMatrix4(Z),b$.radius+=K,J.ray.intersectsSphere(b$)===!1)return;bH.copy(Z).invert(),FK.copy(J.ray).applyMatrix4(bH);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=$.index,G=$.attributes.position;if(X!==null){let N=Math.max(0,W.start),q=Math.min(X.count,W.start+W.count);for(let F=N,R=q;F<R;F++){let O=X.getX(F);y$.fromBufferAttribute(G,O),yH(y$,O,Y,Z,J,Q,this)}}else{let N=Math.max(0,W.start),q=Math.min(G.count,W.start+W.count);for(let F=N,R=q;F<R;F++)y$.fromBufferAttribute(G,F),yH(y$,F,Y,Z,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function yH(J,Q,$,Z,K,W,H){let Y=FK.distanceSqToPoint(J);if(Y<$){let X=new w;FK.closestPointToPoint(J,X),X.applyMatrix4(Z);let U=K.ray.origin.distanceTo(X);if(U<K.near||U>K.far)return;W.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:Q,face:null,faceIndex:null,barycoord:null,object:H})}}class WZ extends sJ{constructor(J=[],Q=301,$,Z,K,W,H,Y,X,U){super(J,Q,$,Z,K,W,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class t9 extends sJ{constructor(J,Q,$,Z,K,W,H,Y,X){super(J,Q,$,Z,K,W,H,Y,X);this.isCanvasTexture=!0,this.needsUpdate=!0}}class W7 extends sJ{constructor(J,Q,$=1014,Z,K,W,H=1003,Y=1003,X,U=1026,G=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let N={width:J,height:Q,depth:G};super(N,Z,K,W,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new yQ(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);return Q.compareFunction=this.compareFunction,Q}}class B6 extends W7{constructor(J,Q=1014,$=301,Z,K,W=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},G=[U,U,U,U,U,U];super(J,J,Q,$,Z,K,W,H,Y,X);this.image=G,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class HZ extends sJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class Y0 extends wJ{constructor(J=1,Q=1,$=1,Z=1,K=1,W=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:K,depthSegments:W};let H=this;Z=Math.floor(Z),K=Math.floor(K),W=Math.floor(W);let Y=[],X=[],U=[],G=[],N=0,q=0;F("z","y","x",-1,-1,$,Q,J,W,K,0),F("z","y","x",1,-1,$,Q,-J,W,K,1),F("x","z","y",1,1,J,$,Q,Z,W,2),F("x","z","y",1,-1,J,$,-Q,Z,W,3),F("x","y","z",1,-1,J,Q,$,Z,K,4),F("x","y","z",-1,-1,J,Q,-$,Z,K,5),this.setIndex(Y),this.setAttribute("position",new $J(X,3)),this.setAttribute("normal",new $J(U,3)),this.setAttribute("uv",new $J(G,2));function F(R,O,D,E,V,I,L,M,P,A,B){let k=I/P,b=L/A,T=I/2,y=L/2,c=M/2,_=P+1,p=A+1,o=0,g=0,J0=new w;for(let m=0;m<p;m++){let l=m*b-y;for(let a=0;a<_;a++){let U0=a*k-T;J0[R]=U0*E,J0[O]=l*V,J0[D]=c,X.push(J0.x,J0.y,J0.z),J0[R]=0,J0[O]=0,J0[D]=M>0?1:-1,U.push(J0.x,J0.y,J0.z),G.push(a/P),G.push(1-m/A),o+=1}}for(let m=0;m<A;m++)for(let l=0;l<P;l++){let a=N+l+_*m,U0=N+l+_*(m+1),q0=N+(l+1)+_*(m+1),f0=N+(l+1)+_*m;Y.push(a,U0,f0),Y.push(U0,q0,f0),g+=6}H.addGroup(q,g,B),q+=g,N+=o}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Y0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class h0 extends wJ{constructor(J=1,Q=1,$=1,Z=32,K=1,W=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:K,openEnded:W,thetaStart:H,thetaLength:Y};let X=this;Z=Math.floor(Z),K=Math.floor(K);let U=[],G=[],N=[],q=[],F=0,R=[],O=$/2,D=0;if(E(),W===!1){if(J>0)V(!0);if(Q>0)V(!1)}this.setIndex(U),this.setAttribute("position",new $J(G,3)),this.setAttribute("normal",new $J(N,3)),this.setAttribute("uv",new $J(q,2));function E(){let I=new w,L=new w,M=0,P=(Q-J)/$;for(let A=0;A<=K;A++){let B=[],k=A/K,b=k*(Q-J)+J;for(let T=0;T<=Z;T++){let y=T/Z,c=y*Y+H,_=Math.sin(c),p=Math.cos(c);L.x=b*_,L.y=-k*$+O,L.z=b*p,G.push(L.x,L.y,L.z),I.set(_,P,p).normalize(),N.push(I.x,I.y,I.z),q.push(y,1-k),B.push(F++)}R.push(B)}for(let A=0;A<Z;A++)for(let B=0;B<K;B++){let k=R[B][A],b=R[B+1][A],T=R[B+1][A+1],y=R[B][A+1];if(J>0||B!==0)U.push(k,b,y),M+=3;if(Q>0||B!==K-1)U.push(b,T,y),M+=3}X.addGroup(D,M,0),D+=M}function V(I){let L=F,M=new G0,P=new w,A=0,B=I===!0?J:Q,k=I===!0?1:-1;for(let T=1;T<=Z;T++)G.push(0,O*k,0),N.push(0,k,0),q.push(0.5,0.5),F++;let b=F;for(let T=0;T<=Z;T++){let c=T/Z*Y+H,_=Math.cos(c),p=Math.sin(c);P.x=B*p,P.y=O*k,P.z=B*_,G.push(P.x,P.y,P.z),N.push(0,k,0),M.x=_*0.5+0.5,M.y=p*0.5*k+0.5,q.push(M.x,M.y),F++}for(let T=0;T<Z;T++){let y=L+T,c=b+T;if(I===!0)U.push(c,c+1,y);else U.push(c+1,c,y);A+=3}X.addGroup(D,A,I===!0?1:2),D+=A}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new h0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class q9 extends h0{constructor(J=1,Q=1,$=32,Z=1,K=!1,W=0,H=Math.PI*2){super(0,J,Q,$,Z,K,W,H);this.type="ConeGeometry",this.parameters={radius:J,height:Q,radialSegments:$,heightSegments:Z,openEnded:K,thetaStart:W,thetaLength:H}}static fromJSON(J){return new q9(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class YZ extends wJ{constructor(J=[],Q=[],$=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:Q,radius:$,detail:Z};let K=[],W=[];if(H(Z),X($),U(),this.setAttribute("position",new $J(K,3)),this.setAttribute("normal",new $J(K.slice(),3)),this.setAttribute("uv",new $J(W,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function H(E){let V=new w,I=new w,L=new w;for(let M=0;M<Q.length;M+=3)q(Q[M+0],V),q(Q[M+1],I),q(Q[M+2],L),Y(V,I,L,E)}function Y(E,V,I,L){let M=L+1,P=[];for(let A=0;A<=M;A++){P[A]=[];let B=E.clone().lerp(I,A/M),k=V.clone().lerp(I,A/M),b=M-A;for(let T=0;T<=b;T++)if(T===0&&A===M)P[A][T]=B;else P[A][T]=B.clone().lerp(k,T/b)}for(let A=0;A<M;A++)for(let B=0;B<2*(M-A)-1;B++){let k=Math.floor(B/2);if(B%2===0)N(P[A][k+1]),N(P[A+1][k]),N(P[A][k]);else N(P[A][k+1]),N(P[A+1][k+1]),N(P[A+1][k])}}function X(E){let V=new w;for(let I=0;I<K.length;I+=3)V.x=K[I+0],V.y=K[I+1],V.z=K[I+2],V.normalize().multiplyScalar(E),K[I+0]=V.x,K[I+1]=V.y,K[I+2]=V.z}function U(){let E=new w;for(let V=0;V<K.length;V+=3){E.x=K[V+0],E.y=K[V+1],E.z=K[V+2];let I=O(E)/2/Math.PI+0.5,L=D(E)/Math.PI+0.5;W.push(I,1-L)}F(),G()}function G(){for(let E=0;E<W.length;E+=6){let V=W[E+0],I=W[E+2],L=W[E+4],M=Math.max(V,I,L),P=Math.min(V,I,L);if(M>0.9&&P<0.1){if(V<0.2)W[E+0]+=1;if(I<0.2)W[E+2]+=1;if(L<0.2)W[E+4]+=1}}}function N(E){K.push(E.x,E.y,E.z)}function q(E,V){let I=E*3;V.x=J[I+0],V.y=J[I+1],V.z=J[I+2]}function F(){let E=new w,V=new w,I=new w,L=new w,M=new G0,P=new G0,A=new G0;for(let B=0,k=0;B<K.length;B+=9,k+=6){E.set(K[B+0],K[B+1],K[B+2]),V.set(K[B+3],K[B+4],K[B+5]),I.set(K[B+6],K[B+7],K[B+8]),M.set(W[k+0],W[k+1]),P.set(W[k+2],W[k+3]),A.set(W[k+4],W[k+5]),L.copy(E).add(V).add(I).divideScalar(3);let b=O(L);R(M,k+0,E,b),R(P,k+2,V,b),R(A,k+4,I,b)}}function R(E,V,I,L){if(L<0&&E.x===1)W[V]=E.x-1;if(I.x===0&&I.z===0)W[V]=L/2/Math.PI+0.5}function O(E){return Math.atan2(E.z,-E.x)}function D(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new YZ(J.vertices,J.indices,J.radius,J.detail)}}class T9 extends YZ{constructor(J=1,Q=0){let $=(1+Math.sqrt(5))/2,Z=1/$,K=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-Z,-$,0,-Z,$,0,Z,-$,0,Z,$,-Z,-$,0,-Z,$,0,Z,-$,0,Z,$,0,-$,0,-Z,$,0,-Z,-$,0,Z,$,0,Z],W=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(K,W,J,Q);this.type="DodecahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new T9(J.radius,J.detail)}}class u9{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){b0("Curve: .getPoint() not implemented.")}getPointAt(J,Q){let $=this.getUtoTmapping(J);return this.getPoint($,Q)}getPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPoint($/J));return Q}getSpacedPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPointAt($/J));return Q}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let Q=[],$,Z=this.getPoint(0),K=0;Q.push(0);for(let W=1;W<=J;W++)$=this.getPoint(W/J),K+=$.distanceTo(Z),Q.push(K),Z=$;return this.cacheArcLengths=Q,Q}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,Q=null){let $=this.getLengths(),Z=0,K=$.length,W;if(Q)W=Q;else W=J*$[K-1];let H=0,Y=K-1,X;while(H<=Y)if(Z=Math.floor(H+(Y-H)/2),X=$[Z]-W,X<0)H=Z+1;else if(X>0)Y=Z-1;else{Y=Z;break}if(Z=Y,$[Z]===W)return Z/(K-1);let U=$[Z],N=$[Z+1]-U,q=(W-U)/N;return(Z+q)/(K-1)}getTangent(J,Q){let Z=J-0.0001,K=J+0.0001;if(Z<0)Z=0;if(K>1)K=1;let W=this.getPoint(Z),H=this.getPoint(K),Y=Q||(W.isVector2?new G0:new w);return Y.copy(H).sub(W).normalize(),Y}getTangentAt(J,Q){let $=this.getUtoTmapping(J);return this.getTangent($,Q)}computeFrenetFrames(J,Q=!1){let $=new w,Z=[],K=[],W=[],H=new w,Y=new QJ;for(let q=0;q<=J;q++){let F=q/J;Z[q]=this.getTangentAt(F,new w)}K[0]=new w,W[0]=new w;let X=Number.MAX_VALUE,U=Math.abs(Z[0].x),G=Math.abs(Z[0].y),N=Math.abs(Z[0].z);if(U<=X)X=U,$.set(1,0,0);if(G<=X)X=G,$.set(0,1,0);if(N<=X)$.set(0,0,1);H.crossVectors(Z[0],$).normalize(),K[0].crossVectors(Z[0],H),W[0].crossVectors(Z[0],K[0]);for(let q=1;q<=J;q++){if(K[q]=K[q-1].clone(),W[q]=W[q-1].clone(),H.crossVectors(Z[q-1],Z[q]),H.length()>Number.EPSILON){H.normalize();let F=Math.acos(d0(Z[q-1].dot(Z[q]),-1,1));K[q].applyMatrix4(Y.makeRotationAxis(H,F))}W[q].crossVectors(Z[q],K[q])}if(Q===!0){let q=Math.acos(d0(K[0].dot(K[J]),-1,1));if(q/=J,Z[0].dot(H.crossVectors(K[0],K[J]))>0)q=-q;for(let F=1;F<=J;F++)K[F].applyMatrix4(Y.makeRotationAxis(Z[F],q*F)),W[F].crossVectors(Z[F],K[F])}return{tangents:Z,normals:K,binormals:W}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class XZ extends u9{constructor(J=0,Q=0,$=1,Z=1,K=0,W=Math.PI*2,H=!1,Y=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=Q,this.xRadius=$,this.yRadius=Z,this.aStartAngle=K,this.aEndAngle=W,this.aClockwise=H,this.aRotation=Y}getPoint(J,Q=new G0){let $=Q,Z=Math.PI*2,K=this.aEndAngle-this.aStartAngle,W=Math.abs(K)<Number.EPSILON;while(K<0)K+=Z;while(K>Z)K-=Z;if(K<Number.EPSILON)if(W)K=0;else K=Z;if(this.aClockwise===!0&&!W)if(K===Z)K=-Z;else K=K-Z;let H=this.aStartAngle+J*K,Y=this.aX+this.xRadius*Math.cos(H),X=this.aY+this.yRadius*Math.sin(H);if(this.aRotation!==0){let U=Math.cos(this.aRotation),G=Math.sin(this.aRotation),N=Y-this.aX,q=X-this.aY;Y=N*U-q*G+this.aX,X=N*G+q*U+this.aY}return $.set(Y,X)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class M6 extends XZ{constructor(J,Q,$,Z,K,W){super(J,Q,$,$,Z,K,W);this.isArcCurve=!0,this.type="ArcCurve"}}function V6(){let J=0,Q=0,$=0,Z=0;function K(W,H,Y,X){J=W,Q=Y,$=-3*W+3*H-2*Y-X,Z=2*W-2*H+Y+X}return{initCatmullRom:function(W,H,Y,X,U){K(H,Y,U*(Y-W),U*(X-H))},initNonuniformCatmullRom:function(W,H,Y,X,U,G,N){let q=(H-W)/U-(Y-W)/(U+G)+(Y-H)/G,F=(Y-H)/G-(X-H)/(G+N)+(X-Y)/N;q*=G,F*=G,K(H,Y,q,F)},calc:function(W){let H=W*W,Y=H*W;return J+Q*W+$*H+Z*Y}}}var fH=new w,xH=new w,XK=new V6,UK=new V6,GK=new V6;class H7 extends u9{constructor(J=[],Q=!1,$="centripetal",Z=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=Q,this.curveType=$,this.tension=Z}getPoint(J,Q=new w){let $=Q,Z=this.points,K=Z.length,W=(K-(this.closed?0:1))*J,H=Math.floor(W),Y=W-H;if(this.closed)H+=H>0?0:(Math.floor(Math.abs(H)/K)+1)*K;else if(Y===0&&H===K-1)H=K-2,Y=1;let X,U;if(this.closed||H>0)X=Z[(H-1)%K];else xH.subVectors(Z[0],Z[1]).add(Z[0]),X=xH;let G=Z[H%K],N=Z[(H+1)%K];if(this.closed||H+2<K)U=Z[(H+2)%K];else fH.subVectors(Z[K-1],Z[K-2]).add(Z[K-1]),U=fH;if(this.curveType==="centripetal"||this.curveType==="chordal"){let q=this.curveType==="chordal"?0.5:0.25,F=Math.pow(X.distanceToSquared(G),q),R=Math.pow(G.distanceToSquared(N),q),O=Math.pow(N.distanceToSquared(U),q);if(R<0.0001)R=1;if(F<0.0001)F=R;if(O<0.0001)O=R;XK.initNonuniformCatmullRom(X.x,G.x,N.x,U.x,F,R,O),UK.initNonuniformCatmullRom(X.y,G.y,N.y,U.y,F,R,O),GK.initNonuniformCatmullRom(X.z,G.z,N.z,U.z,F,R,O)}else if(this.curveType==="catmullrom")XK.initCatmullRom(X.x,G.x,N.x,U.x,this.tension),UK.initCatmullRom(X.y,G.y,N.y,U.y,this.tension),GK.initCatmullRom(X.z,G.z,N.z,U.z,this.tension);return $.set(XK.calc(Y),UK.calc(Y),GK.calc(Y)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(Z.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let Z=this.points[Q];J.points.push(Z.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(new w().fromArray(Z))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function hH(J,Q,$,Z,K){let W=(Z-Q)*0.5,H=(K-$)*0.5,Y=J*J,X=J*Y;return(2*$-2*Z+W+H)*X+(-3*$+3*Z-2*W-H)*Y+W*J+$}function j5(J,Q){let $=1-J;return $*$*Q}function b5(J,Q){return 2*(1-J)*J*Q}function y5(J,Q){return J*J*Q}function kQ(J,Q,$,Z){return j5(J,Q)+b5(J,$)+y5(J,Z)}function f5(J,Q){let $=1-J;return $*$*$*Q}function x5(J,Q){let $=1-J;return 3*$*$*J*Q}function h5(J,Q){return 3*(1-J)*J*J*Q}function v5(J,Q){return J*J*J*Q}function zQ(J,Q,$,Z,K){return f5(J,Q)+x5(J,$)+h5(J,Z)+v5(J,K)}class k6 extends u9{constructor(J=new G0,Q=new G0,$=new G0,Z=new G0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=Q,this.v2=$,this.v3=Z}getPoint(J,Q=new G0){let $=Q,Z=this.v0,K=this.v1,W=this.v2,H=this.v3;return $.set(zQ(J,Z.x,K.x,W.x,H.x),zQ(J,Z.y,K.y,W.y,H.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class z6 extends u9{constructor(J=new w,Q=new w,$=new w,Z=new w){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=Q,this.v2=$,this.v3=Z}getPoint(J,Q=new w){let $=Q,Z=this.v0,K=this.v1,W=this.v2,H=this.v3;return $.set(zQ(J,Z.x,K.x,W.x,H.x),zQ(J,Z.y,K.y,W.y,H.y),zQ(J,Z.z,K.z,W.z,H.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class I6 extends u9{constructor(J=new G0,Q=new G0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=Q}getPoint(J,Q=new G0){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new G0){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class C6 extends u9{constructor(J=new w,Q=new w){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=Q}getPoint(J,Q=new w){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new w){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class A6 extends u9{constructor(J=new G0,Q=new G0,$=new G0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new G0){let $=Q,Z=this.v0,K=this.v1,W=this.v2;return $.set(kQ(J,Z.x,K.x,W.x),kQ(J,Z.y,K.y,W.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class UZ extends u9{constructor(J=new w,Q=new w,$=new w){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new w){let $=Q,Z=this.v0,K=this.v1,W=this.v2;return $.set(kQ(J,Z.x,K.x,W.x),kQ(J,Z.y,K.y,W.y),kQ(J,Z.z,K.z,W.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class P6 extends u9{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,Q=new G0){let $=Q,Z=this.points,K=(Z.length-1)*J,W=Math.floor(K),H=K-W,Y=Z[W===0?W:W-1],X=Z[W],U=Z[W>Z.length-2?Z.length-1:W+1],G=Z[W>Z.length-3?Z.length-1:W+2];return $.set(hH(H,Y.x,X.x,U.x,G.x),hH(H,Y.y,X.y,U.y,G.y)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let Z=this.points[Q];J.points.push(Z.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(new G0().fromArray(Z))}return this}}var g5=Object.freeze({__proto__:null,ArcCurve:M6,CatmullRomCurve3:H7,CubicBezierCurve:k6,CubicBezierCurve3:z6,EllipseCurve:XZ,LineCurve:I6,LineCurve3:C6,QuadraticBezierCurve:A6,QuadraticBezierCurve3:UZ,SplineCurve:P6});class _9 extends wJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let K=J/2,W=Q/2,H=Math.floor($),Y=Math.floor(Z),X=H+1,U=Y+1,G=J/H,N=Q/Y,q=[],F=[],R=[],O=[];for(let D=0;D<U;D++){let E=D*N-W;for(let V=0;V<X;V++){let I=V*G-K;F.push(I,-E,0),R.push(0,0,1),O.push(V/H),O.push(1-D/Y)}}for(let D=0;D<Y;D++)for(let E=0;E<H;E++){let V=E+X*D,I=E+X*(D+1),L=E+1+X*(D+1),M=E+1+X*D;q.push(V,I,M),q.push(I,L,M)}this.setIndex(q),this.setAttribute("position",new $J(F,3)),this.setAttribute("normal",new $J(R,3)),this.setAttribute("uv",new $J(O,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new _9(J.width,J.height,J.widthSegments,J.heightSegments)}}class a7 extends wJ{constructor(J=0.5,Q=1,$=32,Z=1,K=0,W=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:$,phiSegments:Z,thetaStart:K,thetaLength:W},$=Math.max(3,$),Z=Math.max(1,Z);let H=[],Y=[],X=[],U=[],G=J,N=(Q-J)/Z,q=new w,F=new G0;for(let R=0;R<=Z;R++){for(let O=0;O<=$;O++){let D=K+O/$*W;q.x=G*Math.cos(D),q.y=G*Math.sin(D),Y.push(q.x,q.y,q.z),X.push(0,0,1),F.x=(q.x/Q+1)/2,F.y=(q.y/Q+1)/2,U.push(F.x,F.y)}G+=N}for(let R=0;R<Z;R++){let O=R*($+1);for(let D=0;D<$;D++){let E=D+O,V=E,I=E+$+1,L=E+$+2,M=E+1;H.push(V,I,M),H.push(I,L,M)}}this.setIndex(H),this.setAttribute("position",new $J(Y,3)),this.setAttribute("normal",new $J(X,3)),this.setAttribute("uv",new $J(U,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new a7(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class hJ extends wJ{constructor(J=1,Q=32,$=16,Z=0,K=Math.PI*2,W=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:$,phiStart:Z,phiLength:K,thetaStart:W,thetaLength:H},Q=Math.max(3,Math.floor(Q)),$=Math.max(2,Math.floor($));let Y=Math.min(W+H,Math.PI),X=0,U=[],G=new w,N=new w,q=[],F=[],R=[],O=[];for(let D=0;D<=$;D++){let E=[],V=D/$,I=W+V*H,L=J*Math.cos(I),M=Math.sqrt(J*J-L*L),P=0;if(D===0&&W===0)P=0.5/Q;else if(D===$&&Y===Math.PI)P=-0.5/Q;for(let A=0;A<=Q;A++){let B=A/Q,k=Z+B*K;G.x=-M*Math.cos(k),G.y=L,G.z=M*Math.sin(k),F.push(G.x,G.y,G.z),N.copy(G).normalize(),R.push(N.x,N.y,N.z),O.push(B+P,1-V),E.push(X++)}U.push(E)}for(let D=0;D<$;D++)for(let E=0;E<Q;E++){let V=U[D][E+1],I=U[D][E],L=U[D+1][E],M=U[D+1][E+1];if(D!==0||W>0)q.push(V,I,M);if(D!==$-1||Y<Math.PI)q.push(I,L,M)}this.setIndex(q),this.setAttribute("position",new $J(F,3)),this.setAttribute("normal",new $J(R,3)),this.setAttribute("uv",new $J(O,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new hJ(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class Y7 extends wJ{constructor(J=1,Q=0.4,$=12,Z=48,K=Math.PI*2,W=0,H=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:Q,radialSegments:$,tubularSegments:Z,arc:K,thetaStart:W,thetaLength:H},$=Math.floor($),Z=Math.floor(Z);let Y=[],X=[],U=[],G=[],N=new w,q=new w,F=new w;for(let R=0;R<=$;R++){let O=W+R/$*H;for(let D=0;D<=Z;D++){let E=D/Z*K;q.x=(J+Q*Math.cos(O))*Math.cos(E),q.y=(J+Q*Math.cos(O))*Math.sin(E),q.z=Q*Math.sin(O),X.push(q.x,q.y,q.z),N.x=J*Math.cos(E),N.y=J*Math.sin(E),F.subVectors(q,N).normalize(),U.push(F.x,F.y,F.z),G.push(D/Z),G.push(R/$)}}for(let R=1;R<=$;R++)for(let O=1;O<=Z;O++){let D=(Z+1)*R+O-1,E=(Z+1)*(R-1)+O-1,V=(Z+1)*(R-1)+O,I=(Z+1)*R+O;Y.push(D,E,I),Y.push(E,V,I)}this.setIndex(Y),this.setAttribute("position",new $J(X,3)),this.setAttribute("normal",new $J(U,3)),this.setAttribute("uv",new $J(G,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Y7(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}class r7 extends wJ{constructor(J=new UZ(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),Q=64,$=1,Z=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:Q,radius:$,radialSegments:Z,closed:K};let W=J.computeFrenetFrames(Q,K);this.tangents=W.tangents,this.normals=W.normals,this.binormals=W.binormals;let H=new w,Y=new w,X=new G0,U=new w,G=[],N=[],q=[],F=[];R(),this.setIndex(F),this.setAttribute("position",new $J(G,3)),this.setAttribute("normal",new $J(N,3)),this.setAttribute("uv",new $J(q,2));function R(){for(let V=0;V<Q;V++)O(V);O(K===!1?Q:0),E(),D()}function O(V){U=J.getPointAt(V/Q,U);let I=W.normals[V],L=W.binormals[V];for(let M=0;M<=Z;M++){let P=M/Z*Math.PI*2,A=Math.sin(P),B=-Math.cos(P);Y.x=B*I.x+A*L.x,Y.y=B*I.y+A*L.y,Y.z=B*I.z+A*L.z,Y.normalize(),N.push(Y.x,Y.y,Y.z),H.x=U.x+$*Y.x,H.y=U.y+$*Y.y,H.z=U.z+$*Y.z,G.push(H.x,H.y,H.z)}}function D(){for(let V=1;V<=Q;V++)for(let I=1;I<=Z;I++){let L=(Z+1)*(V-1)+(I-1),M=(Z+1)*V+(I-1),P=(Z+1)*V+I,A=(Z+1)*(V-1)+I;F.push(L,M,A),F.push(M,P,A)}}function E(){for(let V=0;V<=Q;V++)for(let I=0;I<=Z;I++)X.x=V/Q,X.y=I/Z,q.push(X.x,X.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new r7(new g5[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}function X7(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let K=J[$][Z];if(vH(K))if(K.isRenderTargetTexture)b0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=K.clone();else if(Array.isArray(K))if(vH(K[0])){let W=[];for(let H=0,Y=K.length;H<Y;H++)W[H]=K[H].clone();Q[$][Z]=W}else Q[$][Z]=K.slice();else Q[$][Z]=K}}return Q}function eJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=X7(J[$]);for(let K in Z)Q[K]=Z[K]}return Q}function vH(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function m5(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function S6(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return a0.workingColorSpace}var iY={clone:X7,merge:eJ},p5=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,d5=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class j9 extends r9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p5,this.fragmentShader=d5,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=X7(J.uniforms),this.uniformsGroups=m5(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let W=this.uniforms[Z].value;if(W&&W.isTexture)Q.uniforms[Z]={type:"t",value:W.toJSON(J).uuid};else if(W&&W.isColor)Q.uniforms[Z]={type:"c",value:W.getHex()};else if(W&&W.isVector2)Q.uniforms[Z]={type:"v2",value:W.toArray()};else if(W&&W.isVector3)Q.uniforms[Z]={type:"v3",value:W.toArray()};else if(W&&W.isVector4)Q.uniforms[Z]={type:"v4",value:W.toArray()};else if(W&&W.isMatrix3)Q.uniforms[Z]={type:"m3",value:W.toArray()};else if(W&&W.isMatrix4)Q.uniforms[Z]={type:"m4",value:W.toArray()};else Q.uniforms[Z]={value:W}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new c0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new G0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new w().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new BJ().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new g0().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new QJ().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class w6 extends j9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class H0 extends r9{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new c0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new c0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new F8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class T6 extends r9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class _6 extends r9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function m7(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function qK(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class U7{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],K=Q[$-1];$:{J:{let W;Q:{Z:if(!(J<Z)){for(let H=$+2;;){if(Z===void 0){if(J<K)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(K=Z,Z=Q[++$],J<Z)break J}W=Q.length;break Q}if(!(J>=K)){let H=Q[1];if(J<H)$=2,K=H;for(let Y=$-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(Z=K,K=Q[--$-1],J>=K)break J}W=$,$=0;break Q}break $}while($<W){let H=$+W>>>1;if(J<Q[H])W=H;else $=H+1}if(Z=Q[$],K=Q[$-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,K,Z)}return this.interpolate_($,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,K=J*Z;for(let W=0;W!==Z;++W)Q[W]=$[K+W];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class j6 extends U7{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,K=J-2,W=J+1,H=Z[K],Y=Z[W];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,H=2*Q-$;break;case 2402:K=Z.length-2,H=Q+Z[K]-Z[K+1];break;default:K=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:W=J,Y=2*$-Q;break;case 2402:W=1,Y=$+Z[1]-Z[0];break;default:W=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=K*U,this._offsetNext=W*U}interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,G=this._offsetNext,N=this._weightPrev,q=this._weightNext,F=($-Q)/(Z-Q),R=F*F,O=R*F,D=-N*O+2*N*R-N*F,E=(1+N)*O+(-1.5-2*N)*R+(-0.5+N)*F+1,V=(-1-q)*O+(1.5+q)*R+0.5*F,I=q*O-q*R;for(let L=0;L!==H;++L)K[L]=D*W[U+L]+E*W[X+L]+V*W[Y+L]+I*W[G+L];return K}}class b6 extends U7{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(Z-Q),G=1-U;for(let N=0;N!==H;++N)K[N]=W[X+N]*G+W[Y+N]*U;return K}}class y6 extends U7{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class f6 extends U7{interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,G=this.outTangents;if(!U||!G){let F=($-Q)/(Z-Q),R=1-F;for(let O=0;O!==H;++O)K[O]=W[X+O]*R+W[Y+O]*F;return K}let N=H*2,q=J-1;for(let F=0;F!==H;++F){let R=W[X+F],O=W[Y+F],D=q*N+F*2,E=G[D],V=G[D+1],I=J*N+F*2,L=U[I],M=U[I+1],P=l5($,Q,E,L,Z);K[F]=oY(P,R,V,M,O)}return K}}function oY(J,Q,$,Z,K){let W=1-J;return W*W*W*Q+3*W*W*J*$+3*W*J*J*Z+J*J*J*K}function u5(J,Q,$,Z,K){let W=1-J;return 3*W*W*($-Q)+6*W*J*(Z-$)+3*J*J*(K-Z)}function l5(J,Q,$,Z,K){let W=(J-Q)/(K-Q);for(let H=0;H<8;H++){let Y=oY(W,Q,$,Z,K)-J;if(Math.abs(Y)<0.0000000001)break;let X=u5(W,Q,$,Z,K);if(Math.abs(X)<0.0000000001)break;W=Math.max(0,Math.min(1,W-Y/X))}return W}class b9{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=m7(Q,this.TimeBufferType),this.values=m7($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:m7(J.times,Array),values:m7(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z;if(qK(J.settings))$.settings={inTangents:m7(J.settings.inTangents,Array),outTangents:m7(J.settings.outTangents,Array)}}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new y6(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new b6(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new j6(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new f6(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return b0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J;if(qK(this.settings))gH(this.settings.inTangents,J),gH(this.settings.outTangents,J)}return this}trim(J,Q){let $=this.times,Z=$.length,K=0,W=Z-1;while(K!==Z&&$[K]<J)++K;while(W!==-1&&$[W]>Q)--W;if(++W,K!==0||W!==Z){if(K>=W)W=Math.max(W,1),K=W-1;let H=this.getValueSize();this.times=$.slice(K,W),this.values=this.values.slice(K*H,W*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)x0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,K=$.length;if(K===0)x0("KeyframeTrack: Track is empty.",this),J=!1;let W=null;for(let H=0;H!==K;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){x0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(W!==null&&W>Y){x0("KeyframeTrack: Out of order keys.",this,H,Y,W),J=!1;break}W=Y}if(Z!==void 0){if(rU(Z))for(let H=0,Y=Z.length;H!==Y;++H){let X=Z[H];if(isNaN(X)){x0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,W=1;for(let H=1;H<K;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!Z){let G=H*$,N=G-$,q=G+$;for(let F=0;F!==$;++F){let R=Q[G+F];if(R!==Q[N+F]||R!==Q[q+F]){Y=!0;break}}}else Y=!0;if(Y){if(H!==W){J[W]=J[H];let G=H*$,N=W*$;for(let q=0;q!==$;++q)Q[N+q]=Q[G+q]}++W}}if(K>0){J[W]=J[K];for(let H=K*$,Y=W*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++W}if(W!==J.length)this.times=J.slice(0,W),this.values=Q.slice(0,W*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);if(Z.createInterpolant=this.createInterpolant,qK(this.settings))Z.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return Z}}function gH(J,Q){for(let $=0,Z=J.length;$!==Z;$+=2)J[$]*=Q}b9.prototype.ValueTypeName="";b9.prototype.TimeBufferType=Float32Array;b9.prototype.ValueBufferType=Float32Array;b9.prototype.DefaultInterpolation=2301;class G7 extends b9{constructor(J,Q,$){super(J,Q,$)}}G7.prototype.ValueTypeName="bool";G7.prototype.ValueBufferType=Array;G7.prototype.DefaultInterpolation=2300;G7.prototype.InterpolantFactoryMethodLinear=void 0;G7.prototype.InterpolantFactoryMethodSmooth=void 0;class x6 extends b9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}x6.prototype.ValueTypeName="color";class h6 extends b9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}h6.prototype.ValueTypeName="number";class v6 extends U7{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=($-Q)/(Z-Q),X=J*H;for(let U=X+H;X!==U;X+=4)w9.slerpFlat(K,0,W,X-H,W,X,Y);return K}}class GZ extends b9{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new v6(this.times,this.values,this.getValueSize(),J)}}GZ.prototype.ValueTypeName="quaternion";GZ.prototype.InterpolantFactoryMethodSmooth=void 0;class q7 extends b9{constructor(J,Q,$){super(J,Q,$)}}q7.prototype.ValueTypeName="string";q7.prototype.ValueBufferType=Array;q7.prototype.DefaultInterpolation=2300;q7.prototype.InterpolantFactoryMethodLinear=void 0;q7.prototype.InterpolantFactoryMethodSmooth=void 0;class g6 extends b9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}g6.prototype.ValueTypeName="vector";class m6{constructor(J,Q,$){let Z=this,K=!1,W=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,K===!1){if(Z.onStart!==void 0)Z.onStart(U,W,H)}K=!0},this.itemEnd=function(U){if(W++,Z.onProgress!==void 0)Z.onProgress(U,W,H);if(W===H){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,G){return X.push(U,G),this},this.removeHandler=function(U){let G=X.indexOf(U);if(G!==-1)X.splice(G,2);return this},this.getHandler=function(U){for(let G=0,N=X.length;G<N;G+=2){let q=X[G],F=X[G+1];if(q.global)q.lastIndex=0;if(q.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var aY=new m6;class p6{constructor(J){if(this.manager=J!==void 0?J:aY,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,K){$.load(J,Z,Q,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}p6.DEFAULT_MATERIAL_NAME="__DEFAULT";class N7 extends LJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new c0(J),this.intensity=Q}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class qZ extends N7{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(LJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new c0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var NK=new QJ,mH=new w,pH=new w;class pQ{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new QJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vQ,this._frameExtents=new G0(1,1),this._viewportCount=1,this._viewports=[new BJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera;mH.setFromMatrixPosition(J.matrixWorld),Q.position.copy(mH),pH.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(pH),Q.updateMatrixWorld(),this._updateMatrix(Q,this.matrix,this._frustum)}_updateMatrix(J,Q,$,Z){NK.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),$.setFromProjectionMatrix(NK,J.coordinateSystem,J.reversedDepth);let K=this._frameExtents,W=Z?Z.z/K.x:1,H=Z?Z.w/K.y:1,Y=Z?Z.x/K.x:0,X=Z?Z.y/K.y:0;if(J.coordinateSystem===2001||J.reversedDepth)Q.set(0.5*W,0,0,0.5*W+Y,0,0.5*H,0,0.5*H+X,0,0,1,0,0,0,0,1);else Q.set(0.5*W,0,0,0.5*W+Y,0,0.5*H,0,0.5*H+X,0,0,0.5,0.5,0,0,0,1);Q.multiply(NK)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var f$=new w,x$=new w9,s9=new w;class NZ extends LJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new QJ,this.projectionMatrix=new QJ,this.projectionMatrixInverse=new QJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(f$,x$,s9),s9.x===1&&s9.y===1&&s9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(f$,x$,s9.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(f$,x$,s9),s9.x===1&&s9.y===1&&s9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(f$,x$,s9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var P8=new w,dH=new G0,uH=new G0;class cJ extends NZ{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=o8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(MQ*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return o8*2*Math.atan(Math.tan(MQ*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){P8.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(P8.x,P8.y).multiplyScalar(-J/P8.z),P8.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(P8.x,P8.y).multiplyScalar(-J/P8.z)}getViewSize(J,Q){return this.getViewBounds(J,dH,uH),Q.subVectors(uH,dH)}setViewOffset(J,Q,$,Z,K,W){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(MQ*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,K=-0.5*Z,W=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=W;K+=W.offsetX*Z/Y,Q-=W.offsetY*$/X,Z*=W.width/Y,$*=W.height/X}let H=this.filmOffset;if(H!==0)K+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class rY extends pQ{constructor(){super(new cJ(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(J){let Q=this.camera,$=o8*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height*this.aspect,K=J.distance||Q.far;if($!==Q.fov||Z!==Q.aspect||K!==Q.far)Q.fov=$,Q.aspect=Z,Q.far=K,Q.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this.aspect=J.aspect,this}toJSON(){let J=super.toJSON();return J.focus=this.focus,J.aspect=this.aspect,J}}class FZ extends N7{constructor(J,Q,$=0,Z=Math.PI/3,K=0,W=2){super(J,Q);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(LJ.DEFAULT_UP),this.updateMatrix(),this.target=new LJ,this.distance=$,this.angle=Z,this.penumbra=K,this.decay=W,this.map=null,this.shadow=new rY}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.map=J.map,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);if(Q.object.distance=this.distance,Q.object.angle=this.angle,Q.object.decay=this.decay,Q.object.penumbra=this.penumbra,Q.object.target=this.target.uuid,this.map&&this.map.isTexture)Q.object.map=this.map.toJSON(J).uuid;return Q.object.shadow=this.shadow.toJSON(),Q}}class tY extends pQ{constructor(){super(new cJ(90,1,0.5,500));this.isPointLightShadow=!0}}class J9 extends N7{constructor(J,Q,$=0,Z=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=$,this.decay=Z,this.shadow=new tY}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.distance=this.distance,Q.object.decay=this.decay,Q.object.shadow=this.shadow.toJSON(),Q}}class dQ extends NZ{constructor(J=-1,Q=1,$=1,Z=-1,K=0.1,W=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=K,this.far=W,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,K,W){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=$-J,W=$+J,H=Z+Q,Y=Z-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=X*this.view.offsetX,W=K+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(K,W,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class eY extends pQ{constructor(){super(new dQ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class t7 extends N7{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(LJ.DEFAULT_UP),this.updateMatrix(),this.target=new LJ,this.shadow=new eY}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class DZ extends N7{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}var p7=-90,d7=1;class d6 extends LJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new cJ(p7,d7,J,Q);Z.layers=this.layers,this.add(Z);let K=new cJ(p7,d7,J,Q);K.layers=this.layers,this.add(K);let W=new cJ(p7,d7,J,Q);W.layers=this.layers,this.add(W);let H=new cJ(p7,d7,J,Q);H.layers=this.layers,this.add(H);let Y=new cJ(p7,d7,J,Q);Y.layers=this.layers,this.add(Y);let X=new cJ(p7,d7,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,K,W,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),W.up.set(0,0,1),W.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),W.up.set(0,0,-1),W.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,W,H,Y,X,U]=this.children,G=J.getRenderTarget(),N=J.getActiveCubeFace(),q=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let R=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let O=!1;if(J.isWebGLRenderer===!0)O=J.state.buffers.depth.getReversed();else O=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),O&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,1,Z),O&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,2,Z),O&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,Z),O&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,Z),O&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=R,J.setRenderTarget($,5,Z),O&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(G,N,q),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class u6 extends cJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var l6="\\[\\]\\.:\\/",c5=new RegExp("["+l6+"]","g"),c6="[^"+l6+"]",s5="[^"+l6.replace("\\.","")+"]",n5=/((?:WC+[\/:])*)/.source.replace("WC",c6),i5=/(WCOD+)?/.source.replace("WCOD",s5),o5=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",c6),a5=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",c6),r5=new RegExp("^"+n5+i5+o5+a5+"$"),t5=["material","materials","bones","map"];class JX{constructor(J,Q,$){let Z=$||YJ.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=$.length;Z!==K;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class YJ{constructor(J,Q,$){this.path=Q,this.parsedPath=$||YJ.parseTrackName(Q),this.node=YJ.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new YJ(J,Q,$);else return new YJ.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(c5,"")}static parseTrackName(J){let Q=r5.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=$.nodeName.substring(Z+1);if(t5.indexOf(K)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=K}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(K){for(let W=0;W<K.length;W++){let H=K[W];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,K=Q.propertyIndex;if(!J)J=YJ.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){b0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){x0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){x0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){x0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){x0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){x0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){x0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){x0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let W=J[Z];if(W===void 0){let X=Q.nodeName;x0("PropertyBinding: Trying to update property for track: "+X+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){x0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){x0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}Y=this.BindingType.ArrayElement,this.resolvedProperty=W,this.propertyIndex=K}else if(W.fromArray!==void 0&&W.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=W;else if(Array.isArray(W))Y=this.BindingType.EntireArray,this.resolvedProperty=W;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}YJ.Composite=JX;YJ.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};YJ.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};YJ.prototype.GetterByBindingType=[YJ.prototype._getValue_direct,YJ.prototype._getValue_array,YJ.prototype._getValue_arrayElement,YJ.prototype._getValue_toArray];YJ.prototype.SetterByBindingTypeAndVersioning=[[YJ.prototype._setValue_direct,YJ.prototype._setValue_direct_setNeedsUpdate,YJ.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[YJ.prototype._setValue_array,YJ.prototype._setValue_array_setNeedsUpdate,YJ.prototype._setValue_array_setMatrixWorldNeedsUpdate],[YJ.prototype._setValue_arrayElement,YJ.prototype._setValue_arrayElement_setNeedsUpdate,YJ.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[YJ.prototype._setValue_fromArray,YJ.prototype._setValue_fromArray_setNeedsUpdate,YJ.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uE=new Float32Array(1);var lH=new QJ;class EZ{constructor(J,Q,$=0,Z=1/0){this.ray=new b8(J,Q),this.near=$,this.far=Z,this.camera=null,this.layers=new fQ,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,Q){this.ray.set(J,Q)}setFromCamera(J,Q){if(Q.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(Q.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject(Q).sub(this.ray.origin).normalize(),this.camera=Q;else if(Q.isOrthographicCamera)this.ray.origin.set(J.x,J.y,Q.projectionMatrix.elements[14]).unproject(Q),this.ray.direction.set(0,0,-1).transformDirection(Q.matrixWorld),this.camera=Q;else x0("Raycaster: Unsupported camera type: "+Q.type)}setFromXRController(J){return lH.identity().extractRotation(J.matrixWorld),this.ray.origin.setFromMatrixPosition(J.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(lH),this}intersectObject(J,Q=!0,$=[]){return DK(J,this,$,Q),$.sort(cH),$}intersectObjects(J,Q=!0,$=[]){for(let Z=0,K=J.length;Z<K;Z++)DK(J[Z],this,$,Q);return $.sort(cH),$}}function cH(J,Q){return J.distance-Q.distance}function DK(J,Q,$,Z){let K=!0;if(J.layers.test(Q.layers)){if(J.raycast(Q,$)===!1)K=!1}if(K===!0&&Z===!0){let W=J.children;for(let H=0,Y=W.length;H<Y;H++)DK(W[H],Q,$,!0)}}class uQ{constructor(J=1,Q=0,$=0){this.radius=J,this.phi=Q,this.theta=$}set(J,Q,$){return this.radius=J,this.phi=Q,this.theta=$,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=d0(this.phi,0.000001,Math.PI-0.000001),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,Q,$){if(this.radius=Math.sqrt(J*J+Q*Q+$*$),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,$),this.phi=Math.acos(d0(Q/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}class s6{static{s6.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let K=this.elements;return K[0]=J,K[2]=Q,K[1]=$,K[3]=Z,this}}class OZ extends a9{constructor(J,Q=null){super();this.object=J,this.domElement=Q,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(J){if(this.domElement!==null)this.disconnect();this.domElement=J}disconnect(){}dispose(){}update(){}}function n6(J,Q,$,Z){let K=e5(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/K.components*K.byteLength;case 1029:return J*Q/K.components*K.byteLength;case 1030:return J*Q*2/K.components*K.byteLength;case 1031:return J*Q*2/K.components*K.byteLength;case 1022:return J*Q*3/K.components*K.byteLength;case 1023:return J*Q*4/K.components*K.byteLength;case 1033:return J*Q*4/K.components*K.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function e5(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)b0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function kX(){let J=null,Q=!1,$=null,Z=null;function K(W,H){Z=J.requestAnimationFrame(K),$(W,H)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(K),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(W){$=W},setContext:function(W){J=W}}}function JG(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:G}=Y,N=U.byteLength,q=J.createBuffer();J.bindBuffer(X,q),J.bufferData(X,U,G),Y.onUploadCallback();let F;if(U instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)F=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)F=J.SHORT;else if(U instanceof Uint32Array)F=J.UNSIGNED_INT;else if(U instanceof Int32Array)F=J.INT;else if(U instanceof Int8Array)F=J.BYTE;else if(U instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:q,type:F,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:N}}function Z(Y,X,U){let{array:G,updateRanges:N}=X;if(J.bindBuffer(U,Y),N.length===0)J.bufferSubData(U,0,G);else{N.sort((F,R)=>F.start-R.start);let q=0;for(let F=1;F<N.length;F++){let R=N[q],O=N[F];if(O.start<=R.start+R.count+1)R.count=Math.max(R.count,O.start+O.count-R.start);else++q,N[q]=O}N.length=q+1;for(let F=0,R=N.length;F<R;F++){let O=N[F];J.bufferSubData(U,O.start*G.BYTES_PER_ELEMENT,G,O.start,O.count)}X.clearUpdateRanges()}X.onUploadCallback()}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function W(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let G=Q.get(Y);if(!G||G.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,Y,X),U.version=Y.version}}return{get:K,remove:W,update:H}}var QG=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$G=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ZG=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,KG=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,WG=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,HG=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,YG=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,XG=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,UG=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,GG=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qG=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,NG=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,FG=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,DG=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,EG=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,OG=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,RG=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,LG=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,BG=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,MG=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,VG=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kG=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zG=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,IG=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,CG=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,AG=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,PG=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,SG=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wG=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,TG=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_G="gl_FragColor = linearToOutputTexel( gl_FragColor );",jG=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bG=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,yG=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fG=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xG=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hG=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vG=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gG=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mG=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pG=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dG=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uG=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lG=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cG=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sG=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,nG=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,iG=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oG=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aG=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rG=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tG=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,eG=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Jq=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qq=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$q=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zq=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Kq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xq=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uq=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gq=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qq=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nq=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fq=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dq=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Eq=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Oq=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rq=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lq=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bq=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mq=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vq=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kq=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zq=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Iq=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cq=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Aq=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pq=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sq=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wq=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tq=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_q=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jq=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bq=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yq=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fq=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xq=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hq=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,vq=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gq=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mq=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pq=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dq=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uq=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lq=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cq=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sq=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nq=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iq=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,oq=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,aq=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rq=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tq=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eq=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,J1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Q1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,X1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,U1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,G1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,q1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,N1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,D1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,O1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,L1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,M1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,k1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,z1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,A1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,T1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,u0={alphahash_fragment:QG,alphahash_pars_fragment:$G,alphamap_fragment:ZG,alphamap_pars_fragment:KG,alphatest_fragment:WG,alphatest_pars_fragment:HG,aomap_fragment:YG,aomap_pars_fragment:XG,batching_pars_vertex:UG,batching_vertex:GG,begin_vertex:qG,beginnormal_vertex:NG,bsdfs:FG,iridescence_fragment:DG,bumpmap_pars_fragment:EG,clipping_planes_fragment:OG,clipping_planes_pars_fragment:RG,clipping_planes_pars_vertex:LG,clipping_planes_vertex:BG,color_fragment:MG,color_pars_fragment:VG,color_pars_vertex:kG,color_vertex:zG,common:IG,cube_uv_reflection_fragment:CG,defaultnormal_vertex:AG,displacementmap_pars_vertex:PG,displacementmap_vertex:SG,emissivemap_fragment:wG,emissivemap_pars_fragment:TG,colorspace_fragment:_G,colorspace_pars_fragment:jG,envmap_fragment:bG,envmap_common_pars_fragment:yG,envmap_pars_fragment:fG,envmap_pars_vertex:xG,envmap_physical_pars_fragment:nG,envmap_vertex:hG,fog_vertex:vG,fog_pars_vertex:gG,fog_fragment:mG,fog_pars_fragment:pG,gradientmap_pars_fragment:dG,lightmap_pars_fragment:uG,lights_lambert_fragment:lG,lights_lambert_pars_fragment:cG,lights_pars_begin:sG,lights_toon_fragment:iG,lights_toon_pars_fragment:oG,lights_phong_fragment:aG,lights_phong_pars_fragment:rG,lights_physical_fragment:tG,lights_physical_pars_fragment:eG,lights_fragment_begin:Jq,lights_fragment_maps:Qq,lights_fragment_end:$q,lightprobes_pars_fragment:Zq,logdepthbuf_fragment:Kq,logdepthbuf_pars_fragment:Wq,logdepthbuf_pars_vertex:Hq,logdepthbuf_vertex:Yq,map_fragment:Xq,map_pars_fragment:Uq,map_particle_fragment:Gq,map_particle_pars_fragment:qq,metalnessmap_fragment:Nq,metalnessmap_pars_fragment:Fq,morphinstance_vertex:Dq,morphcolor_vertex:Eq,morphnormal_vertex:Oq,morphtarget_pars_vertex:Rq,morphtarget_vertex:Lq,normal_fragment_begin:Bq,normal_fragment_maps:Mq,normal_pars_fragment:Vq,normal_pars_vertex:kq,normal_vertex:zq,normalmap_pars_fragment:Iq,clearcoat_normal_fragment_begin:Cq,clearcoat_normal_fragment_maps:Aq,clearcoat_pars_fragment:Pq,iridescence_pars_fragment:Sq,opaque_fragment:wq,packing:Tq,premultiplied_alpha_fragment:_q,project_vertex:jq,dithering_fragment:bq,dithering_pars_fragment:yq,roughnessmap_fragment:fq,roughnessmap_pars_fragment:xq,shadowmap_pars_fragment:hq,shadowmap_pars_vertex:vq,shadowmap_vertex:gq,shadowmask_pars_fragment:mq,skinbase_vertex:pq,skinning_pars_vertex:dq,skinning_vertex:uq,skinnormal_vertex:lq,specularmap_fragment:cq,specularmap_pars_fragment:sq,tonemapping_fragment:nq,tonemapping_pars_fragment:iq,transmission_fragment:oq,transmission_pars_fragment:aq,uv_pars_fragment:rq,uv_pars_vertex:tq,uv_vertex:eq,worldpos_vertex:J1,background_vert:Q1,background_frag:$1,backgroundCube_vert:Z1,backgroundCube_frag:K1,cube_vert:W1,cube_frag:H1,depth_vert:Y1,depth_frag:X1,distance_vert:U1,distance_frag:G1,equirect_vert:q1,equirect_frag:N1,linedashed_vert:F1,linedashed_frag:D1,meshbasic_vert:E1,meshbasic_frag:O1,meshlambert_vert:R1,meshlambert_frag:L1,meshmatcap_vert:B1,meshmatcap_frag:M1,meshnormal_vert:V1,meshnormal_frag:k1,meshphong_vert:z1,meshphong_frag:I1,meshphysical_vert:C1,meshphysical_frag:A1,meshtoon_vert:P1,meshtoon_frag:S1,points_vert:w1,points_frag:T1,shadow_vert:_1,shadow_frag:j1,sprite_vert:b1,sprite_frag:y1},O0={common:{diffuse:{value:new c0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new g0},alphaMap:{value:null},alphaMapTransform:{value:new g0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new g0}},envmap:{envMap:{value:null},envMapRotation:{value:new g0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new g0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new g0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new g0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new g0},normalScale:{value:new G0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new g0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new g0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new g0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new g0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new c0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new w},probesMax:{value:new w},probesResolution:{value:new w}},points:{diffuse:{value:new c0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new g0},alphaTest:{value:0},uvTransform:{value:new g0}},sprite:{diffuse:{value:new c0(16777215)},opacity:{value:1},center:{value:new G0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new g0},alphaMap:{value:null},alphaMapTransform:{value:new g0},alphaTest:{value:0}}},J8={basic:{uniforms:eJ([O0.common,O0.specularmap,O0.envmap,O0.aomap,O0.lightmap,O0.fog]),vertexShader:u0.meshbasic_vert,fragmentShader:u0.meshbasic_frag},lambert:{uniforms:eJ([O0.common,O0.specularmap,O0.envmap,O0.aomap,O0.lightmap,O0.emissivemap,O0.bumpmap,O0.normalmap,O0.displacementmap,O0.fog,O0.lights,{emissive:{value:new c0(0)},envMapIntensity:{value:1}}]),vertexShader:u0.meshlambert_vert,fragmentShader:u0.meshlambert_frag},phong:{uniforms:eJ([O0.common,O0.specularmap,O0.envmap,O0.aomap,O0.lightmap,O0.emissivemap,O0.bumpmap,O0.normalmap,O0.displacementmap,O0.fog,O0.lights,{emissive:{value:new c0(0)},specular:{value:new c0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:u0.meshphong_vert,fragmentShader:u0.meshphong_frag},standard:{uniforms:eJ([O0.common,O0.envmap,O0.aomap,O0.lightmap,O0.emissivemap,O0.bumpmap,O0.normalmap,O0.displacementmap,O0.roughnessmap,O0.metalnessmap,O0.fog,O0.lights,{emissive:{value:new c0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:u0.meshphysical_vert,fragmentShader:u0.meshphysical_frag},toon:{uniforms:eJ([O0.common,O0.aomap,O0.lightmap,O0.emissivemap,O0.bumpmap,O0.normalmap,O0.displacementmap,O0.gradientmap,O0.fog,O0.lights,{emissive:{value:new c0(0)}}]),vertexShader:u0.meshtoon_vert,fragmentShader:u0.meshtoon_frag},matcap:{uniforms:eJ([O0.common,O0.bumpmap,O0.normalmap,O0.displacementmap,O0.fog,{matcap:{value:null}}]),vertexShader:u0.meshmatcap_vert,fragmentShader:u0.meshmatcap_frag},points:{uniforms:eJ([O0.points,O0.fog]),vertexShader:u0.points_vert,fragmentShader:u0.points_frag},dashed:{uniforms:eJ([O0.common,O0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:u0.linedashed_vert,fragmentShader:u0.linedashed_frag},depth:{uniforms:eJ([O0.common,O0.displacementmap]),vertexShader:u0.depth_vert,fragmentShader:u0.depth_frag},normal:{uniforms:eJ([O0.common,O0.bumpmap,O0.normalmap,O0.displacementmap,{opacity:{value:1}}]),vertexShader:u0.meshnormal_vert,fragmentShader:u0.meshnormal_frag},sprite:{uniforms:eJ([O0.sprite,O0.fog]),vertexShader:u0.sprite_vert,fragmentShader:u0.sprite_frag},background:{uniforms:{uvTransform:{value:new g0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:u0.background_vert,fragmentShader:u0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new g0}},vertexShader:u0.backgroundCube_vert,fragmentShader:u0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:u0.cube_vert,fragmentShader:u0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:u0.equirect_vert,fragmentShader:u0.equirect_frag},distance:{uniforms:eJ([O0.common,O0.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:u0.distance_vert,fragmentShader:u0.distance_frag},shadow:{uniforms:eJ([O0.lights,O0.fog,{color:{value:new c0(0)},opacity:{value:1}}]),vertexShader:u0.shadow_vert,fragmentShader:u0.shadow_frag}};J8.physical={uniforms:eJ([J8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new g0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new g0},clearcoatNormalScale:{value:new G0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new g0},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new g0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new g0},sheen:{value:0},sheenColor:{value:new c0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new g0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new g0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new g0},transmissionSamplerSize:{value:new G0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new g0},attenuationDistance:{value:0},attenuationColor:{value:new c0(0)},specularColor:{value:new c0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new g0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new g0},anisotropyVector:{value:new G0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new g0}}]),vertexShader:u0.meshphysical_vert,fragmentShader:u0.meshphysical_frag};var RZ={r:0,b:0,g:0},f1=new QJ,zX=new g0;zX.set(-1,0,0,0,1,0,0,0,1);function x1(J,Q,$,Z,K,W){let H=new c0(0),Y=K===!0?0:1,X,U,G=null,N=0,q=null;function F(V){let I=V.isScene===!0?V.background:null;if(I&&I.isTexture){let L=V.backgroundBlurriness>0;I=Q.get(I,L)}return I}function R(V){let I=!1,L=F(V);if(L===null)D(H,Y);else if(L&&L.isColor)D(L,1),I=!0;let M=J.xr.getEnvironmentBlendMode();if(M==="additive")$.buffers.color.setClear(0,0,0,1,W);else if(M==="alpha-blend")$.buffers.color.setClear(0,0,0,0,W);if(J.autoClear||I)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function O(V,I){let L=F(I);if(L&&(L.isCubeTexture||L.mapping===TQ)){if(U===void 0)U=new v(new Y0(1,1,1),new j9({name:"BackgroundCubeMaterial",uniforms:X7(J8.backgroundCube.uniforms),vertexShader:J8.backgroundCube.vertexShader,fragmentShader:J8.backgroundCube.fragmentShader,side:U9,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(M,P,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=L,U.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(f1.makeRotationFromEuler(I.backgroundRotation)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(zX);if(U.material.toneMapped=a0.getTransfer(L.colorSpace)!==qJ,G!==L||N!==L.version||q!==J.toneMapping)U.material.needsUpdate=!0,G=L,N=L.version,q=J.toneMapping;U.layers.enableAll(),V.unshift(U,U.geometry,U.material,0,0,null)}else if(L&&L.isTexture){if(X===void 0)X=new v(new _9(2,2),new j9({name:"BackgroundMaterial",uniforms:X7(J8.background.uniforms),vertexShader:J8.background.vertexShader,fragmentShader:J8.background.fragmentShader,side:s7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(X);if(X.material.uniforms.t2D.value=L,X.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,X.material.toneMapped=a0.getTransfer(L.colorSpace)!==qJ,L.matrixAutoUpdate===!0)L.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(L.matrix),G!==L||N!==L.version||q!==J.toneMapping)X.material.needsUpdate=!0,G=L,N=L.version,q=J.toneMapping;X.layers.enableAll(),V.unshift(X,X.geometry,X.material,0,0,null)}}function D(V,I){V.getRGB(RZ,S6(J)),$.buffers.color.setClear(RZ.r,RZ.g,RZ.b,I,W)}function E(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(V,I=1){H.set(V),Y=I,D(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(V){Y=V,D(H,Y)},render:R,addToRenderList:O,dispose:E}}function h1(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},K=q(null),W=K,H=!1;function Y(T,y,c,_,p){let o=!1,g=N(T,_,c,y);if(W!==g)W=g,U(W.object);if(o=F(T,_,c,p),o)R(T,_,c,p);if(p!==null)Q.update(p,J.ELEMENT_ARRAY_BUFFER);if(o||H){if(H=!1,L(T,y,c,_),p!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(p).buffer)}}function X(){return J.createVertexArray()}function U(T){return J.bindVertexArray(T)}function G(T){return J.deleteVertexArray(T)}function N(T,y,c,_){let p=_.wireframe===!0,o=Z[y.id];if(o===void 0)o={},Z[y.id]=o;let g=T.isInstancedMesh===!0?T.id:0,J0=o[g];if(J0===void 0)J0={},o[g]=J0;let m=J0[c.id];if(m===void 0)m={},J0[c.id]=m;let l=m[p];if(l===void 0)l=q(X()),m[p]=l;return l}function q(T){let y=[],c=[],_=[];for(let p=0;p<$;p++)y[p]=0,c[p]=0,_[p]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:c,attributeDivisors:_,object:T,attributes:{},index:null}}function F(T,y,c,_){let p=W.attributes,o=y.attributes,g=0,J0=c.getAttributes();for(let m in J0)if(J0[m].location>=0){let a=p[m],U0=o[m];if(U0===void 0){if(m==="instanceMatrix"&&T.instanceMatrix)U0=T.instanceMatrix;if(m==="instanceColor"&&T.instanceColor)U0=T.instanceColor}if(a===void 0)return!0;if(a.attribute!==U0)return!0;if(U0&&a.data!==U0.data)return!0;g++}if(W.attributesNum!==g)return!0;if(W.index!==_)return!0;return!1}function R(T,y,c,_){let p={},o=y.attributes,g=0,J0=c.getAttributes();for(let m in J0)if(J0[m].location>=0){let a=o[m];if(a===void 0){if(m==="instanceMatrix"&&T.instanceMatrix)a=T.instanceMatrix;if(m==="instanceColor"&&T.instanceColor)a=T.instanceColor}let U0={};if(U0.attribute=a,a&&a.data)U0.data=a.data;p[m]=U0,g++}W.attributes=p,W.attributesNum=g,W.index=_}function O(){let T=W.newAttributes;for(let y=0,c=T.length;y<c;y++)T[y]=0}function D(T){E(T,0)}function E(T,y){let{newAttributes:c,enabledAttributes:_,attributeDivisors:p}=W;if(c[T]=1,_[T]===0)J.enableVertexAttribArray(T),_[T]=1;if(p[T]!==y)J.vertexAttribDivisor(T,y),p[T]=y}function V(){let{newAttributes:T,enabledAttributes:y}=W;for(let c=0,_=y.length;c<_;c++)if(y[c]!==T[c])J.disableVertexAttribArray(c),y[c]=0}function I(T,y,c,_,p,o,g){if(g===!0)J.vertexAttribIPointer(T,y,c,p,o);else J.vertexAttribPointer(T,y,c,_,p,o)}function L(T,y,c,_){O();let p=_.attributes,o=c.getAttributes(),g=y.defaultAttributeValues;for(let J0 in o){let m=o[J0];if(m.location>=0){let l=p[J0];if(l===void 0){if(J0==="instanceMatrix"&&T.instanceMatrix)l=T.instanceMatrix;if(J0==="instanceColor"&&T.instanceColor)l=T.instanceColor}if(l!==void 0){let{normalized:a,itemSize:U0}=l,q0=Q.get(l);if(q0===void 0)continue;let{buffer:f0,type:S0,bytesPerElement:i}=q0,K0=S0===J.INT||S0===J.UNSIGNED_INT||l.gpuType===CK;if(l.isInterleavedBufferAttribute){let Z0=l.data,T0=Z0.stride,j0=l.offset;if(Z0.isInstancedInterleavedBuffer){for(let w0=0;w0<m.locationSize;w0++)E(m.location+w0,Z0.meshPerAttribute);if(T.isInstancedMesh!==!0&&_._maxInstanceCount===void 0)_._maxInstanceCount=Z0.meshPerAttribute*Z0.count}else for(let w0=0;w0<m.locationSize;w0++)D(m.location+w0);J.bindBuffer(J.ARRAY_BUFFER,f0);for(let w0=0;w0<m.locationSize;w0++)I(m.location+w0,U0/m.locationSize,S0,a,T0*i,(j0+U0/m.locationSize*w0)*i,K0)}else{if(l.isInstancedBufferAttribute){for(let Z0=0;Z0<m.locationSize;Z0++)E(m.location+Z0,l.meshPerAttribute);if(T.isInstancedMesh!==!0&&_._maxInstanceCount===void 0)_._maxInstanceCount=l.meshPerAttribute*l.count}else for(let Z0=0;Z0<m.locationSize;Z0++)D(m.location+Z0);J.bindBuffer(J.ARRAY_BUFFER,f0);for(let Z0=0;Z0<m.locationSize;Z0++)I(m.location+Z0,U0/m.locationSize,S0,a,U0*i,U0/m.locationSize*Z0*i,K0)}}else if(g!==void 0){let a=g[J0];if(a!==void 0)switch(a.length){case 2:J.vertexAttrib2fv(m.location,a);break;case 3:J.vertexAttrib3fv(m.location,a);break;case 4:J.vertexAttrib4fv(m.location,a);break;default:J.vertexAttrib1fv(m.location,a)}}}}V()}function M(){k();for(let T in Z){let y=Z[T];for(let c in y){let _=y[c];for(let p in _){let o=_[p];for(let g in o)G(o[g].object),delete o[g];delete _[p]}}delete Z[T]}}function P(T){if(Z[T.id]===void 0)return;let y=Z[T.id];for(let c in y){let _=y[c];for(let p in _){let o=_[p];for(let g in o)G(o[g].object),delete o[g];delete _[p]}}delete Z[T.id]}function A(T){for(let y in Z){let c=Z[y];for(let _ in c){let p=c[_];if(p[T.id]===void 0)continue;let o=p[T.id];for(let g in o)G(o[g].object),delete o[g];delete p[T.id]}}}function B(T){for(let y in Z){let c=Z[y],_=T.isInstancedMesh===!0?T.id:0,p=c[_];if(p===void 0)continue;for(let o in p){let g=p[o];for(let J0 in g)G(g[J0].object),delete g[J0];delete p[o]}if(delete c[_],Object.keys(c).length===0)delete Z[y]}}function k(){if(b(),H=!0,W===K)return;W=K,U(W.object)}function b(){K.geometry=null,K.program=null,K.wireframe=!1}return{setup:Y,reset:k,resetDefaultState:b,dispose:M,releaseStatesOfGeometry:P,releaseStatesOfObject:B,releaseStatesOfProgram:A,initAttributes:O,enableAttribute:D,disableUnusedAttributes:V}}function v1(J,Q,$){let Z;function K(X){Z=X}function W(X,U){J.drawArrays(Z,X,U),$.update(U,Z,1)}function H(X,U,G){if(G===0)return;J.drawArraysInstanced(Z,X,U,G),$.update(U,Z,G)}function Y(X,U,G){if(G===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,X,0,U,0,G);let q=0;for(let F=0;F<G;F++)q+=U[F];$.update(q,Z,1)}this.setMode=K,this.render=W,this.renderInstances=H,this.renderMultiDraw=Y}function g1(J,Q,$,Z){let K;function W(){if(K!==void 0)return K;if(Q.has("EXT_texture_filter_anisotropic")===!0){let A=Q.get("EXT_texture_filter_anisotropic");K=J.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else K=0;return K}function H(A){if(A!==o9&&Z.convert(A)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(A){let B=A===i9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(A!==d9&&A!==D8&&!B&&Z.convert(A)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function X(A){if(A==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",G=X(U);if(G!==U)b0("WebGLRenderer:",U,"not supported, using",G,"instead."),U=G;let N=$.logarithmicDepthBuffer===!0,q=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&q===!1)b0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),O=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),V=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),I=J.getParameter(J.MAX_VARYING_VECTORS),L=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),M=J.getParameter(J.MAX_SAMPLES),P=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:W,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:N,reversedDepthBuffer:q,maxTextures:F,maxVertexTextures:R,maxTextureSize:O,maxCubemapSize:D,maxAttributes:E,maxVertexUniforms:V,maxVaryings:I,maxFragmentUniforms:L,maxSamples:M,samples:P}}function m1(J){let Q=this,$=null,Z=0,K=!1,W=!1,H=new S9,Y=new g0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(N,q){let F=N.length!==0||q||Z!==0||K;return K=q,Z=N.length,F},this.beginShadows=function(){W=!0,G(null)},this.endShadows=function(){W=!1},this.setGlobalState=function(N,q){$=G(N,q,0)},this.setState=function(N,q,F){let{clippingPlanes:R,clipIntersection:O,clipShadows:D}=N,E=J.get(N);if(!K||R===null||R.length===0||W&&!D)if(W)G(null);else U();else{let V=W?0:Z,I=V*4,L=E.clippingState||null;X.value=L,L=G(R,q,I,F);for(let M=0;M!==I;++M)L[M]=$[M];E.clippingState=L,this.numIntersection=O?this.numPlanes:0,this.numPlanes+=V}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function G(N,q,F,R){let O=N!==null?N.length:0,D=null;if(O!==0){if(D=X.value,R!==!0||D===null){let E=F+O*4,V=q.matrixWorldInverse;if(Y.getNormalMatrix(V),D===null||D.length<E)D=new Float32Array(E);for(let I=0,L=F;I!==O;++I,L+=4)H.copy(N[I]).applyMatrix4(V,Y),H.normal.toArray(D,L),D[L+3]=H.constant}X.value=D,X.needsUpdate=!0}return Q.numPlanes=O,Q.numIntersection=0,D}}var JQ=4,p1=6,d1=20,u1=256,lQ=new dQ,QX=new c0,i6=null,o6=0,a6=0,r6=!1,l1=new w,F7=new w;class JW{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,K={}){let{size:W=256,position:H=l1}=K;i6=this._renderer.getRenderTarget(),o6=this._renderer.getActiveCubeFace(),a6=this._renderer.getActiveMipmapLevel(),r6=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(W);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=KX(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=ZX(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(i6,o6,a6),this._renderer.xr.enabled=r6,J.scissorTest=!1,e7(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===i7||J.mapping===a8)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);i6=this._renderer.getRenderTarget(),o6=this._renderer.getActiveCubeFace(),a6=this._renderer.getActiveMipmapLevel(),r6=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:G9,minFilter:G9,generateMipmaps:!1,type:i9,format:o9,colorSpace:X6,depthBuffer:!1},Z=$X(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=$X(J,Q,$);let{_lodMax:K}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=c1(K)),this._blurMaterial=n1(K,J,Q),this._ggxMaterial=s1(K,J,Q)}return Z}_compileMaterial(J){let Q=new v(new wJ,J);this._renderer.compile(Q,lQ)}_sceneToCubeUV(J,Q,$,Z,K){let Y=new cJ(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],G=this._renderer,N=G.autoClear,q=G.toneMapping;if(G.getClearColor(QX),G.toneMapping=p9,G.autoClear=!1,G.state.buffers.depth.getReversed())G.setRenderTarget(Z),G.clearDepth(),G.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new v(new Y0,new uJ({name:"PMREM.Background",side:U9,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,O=R.material,D=!1,E=J.background;if(E){if(E.isColor)O.color.copy(E),J.background=null,D=!0}else O.color.copy(QX),D=!0;for(let V=0;V<6;V++){let I=V%3;if(I===0)Y.up.set(0,X[V],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x+U[V],K.y,K.z);else if(I===1)Y.up.set(0,0,X[V]),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y+U[V],K.z);else Y.up.set(0,X[V],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y,K.z+U[V]);let L=this._cubeSize;if(e7(Z,I*L,V>2?L:0,L,L),G.setRenderTarget(Z),D)G.render(R,Y);G.render(J,Y)}G.toneMapping=q,G.autoClear=N,J.background=E}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===i7||J.mapping===a8;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=KX();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=ZX();let K=Z?this._cubemapMaterial:this._equirectMaterial,W=this._lodMeshes[0];W.material=K;let H=K.uniforms;H.envMap.value=J;let Y=this._cubeSize;e7(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(W,lQ)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let K=1;K<Z;K++)this._applyGGXFilter(J,K-1,K);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,K=this._pingPongRenderTarget,W=this._ggxMaterial,H=this._lodMeshes[$];H.material=W;let Y=W.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),G=Math.sqrt(X*X-U*U),N=X*1.25,q=G*N,{_lodMax:F}=this,R=this._sizeLods[$],O=3*R*($>F-JQ?$-F+JQ:0),D=4*(this._cubeSize-R);Y.envMap.value=J.texture,Y.roughness.value=q,Y.mipInt.value=F-Q,e7(K,O,D,3*R,2*R),Z.setRenderTarget(K),Z.render(H,lQ),Y.envMap.value=K.texture,Y.roughness.value=0,Y.mipInt.value=F-$,e7(J,O,D,3*R,2*R),Z.setRenderTarget(J),Z.render(H,lQ)}_blur(J,Q,$,Z){let K=this._pingPongRenderTarget,W=Math.min(Z,Math.PI)/Math.SQRT2;this._blurPass(J,K,Q,$,W),this._blurPass(K,J,$,$,W)}_blurPass(J,Q,$,Z,K){let W=this._renderer,H=this._blurMaterial,Y=this._lodMeshes[Z];Y.material=H;let X=H.uniforms;X.envMap.value=J.texture,X.sigma.value=K,X.mipInt.value=this._lodMax-$;let U=this._sizeLods[Z],G=3*U*(Z>this._lodMax-JQ?Z-this._lodMax+JQ:0),N=4*(this._cubeSize-U);e7(Q,G,N,3*U,2*U),W.setRenderTarget(Q),W.render(Y,lQ)}}function c1(J){let Q=[],$=[],Z=J,K=J-JQ+1+p1;for(let W=0;W<K;W++){let H=Math.pow(2,Z);Q.push(H);let Y=1/(H-2),X=-Y,U=1+Y,G=[X,X,U,X,U,U,X,X,U,U,X,U],N=6,q=6,F=3,R=new Float32Array(F*q*N),O=new Float32Array(F*q*N);for(let E=0;E<N;E++){let V=E%3*2/3-1,I=E>2?0:-1,L=[V,I,0,V+0.6666666666666666,I,0,V+0.6666666666666666,I+1,0,V,I,0,V+0.6666666666666666,I+1,0,V,I+1,0];R.set(L,F*q*E);for(let M=0;M<q;M++){let P=G[M*2]*2-1,A=G[M*2+1]*2-1;if(E===0)F7.set(1,A,P);else if(E===1)F7.set(-P,1,-A);else if(E===2)F7.set(-P,A,1);else if(E===3)F7.set(-1,A,-P);else if(E===4)F7.set(-P,-1,A);else F7.set(P,A,-1);F7.toArray(O,(E*q+M)*F)}}let D=new wJ;if(D.setAttribute("position",new H9(R,F)),D.setAttribute("outputDirection",new H9(O,F)),$.push(new v(D,null)),Z>JQ)Z--}return{lodMeshes:$,sizeLods:Q}}function $X(J,Q,$){let Z=new k9(J,Q,$);return Z.texture.mapping=TQ,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function e7(J,Q,$,Z,K){J.viewport.set(Q,$,Z,K),J.scissor.set(Q,$,Z,K)}function s1(J,Q,$){return new j9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:u1,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:BZ(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:n9,depthTest:!1,depthWrite:!1})}function n1(J,Q,$){return new j9({name:"SphericalGaussianBlur",defines:{SAMPLES:d1,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:BZ(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:n9,depthTest:!1,depthWrite:!1})}function ZX(){return new j9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:BZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:n9,depthTest:!1,depthWrite:!1})}function KX(){return new j9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:BZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:n9,depthTest:!1,depthWrite:!1})}function BZ(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class ZW extends k9{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new WZ(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},Z=new Y0(5,5,5),K=new j9({name:"CubemapFromEquirect",uniforms:X7($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:U9,blending:n9});K.uniforms.tEquirect.value=Q;let W=new v(Z,K),H=Q.minFilter;if(Q.minFilter===t8)Q.minFilter=G9;return new d6(1,10,this).update(J,W),Q.minFilter=H,W.geometry.dispose(),W.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let K=J.getRenderTarget();for(let W=0;W<6;W++)J.setRenderTarget(this,W),J.clear(Q,$,Z);J.setRenderTarget(K)}}function i1(J){let Q=new WeakMap,$=new WeakMap,Z=null;function K(q,F=!1){if(q===null||q===void 0)return null;if(F)return H(q);return W(q)}function W(q){if(q&&q.isTexture){let F=q.mapping;if(F===m$||F===p$)if(Q.has(q)){let R=Q.get(q).texture;return Y(R,q.mapping)}else{let R=q.image;if(R&&R.height>0){let O=new ZW(R.height);return O.fromEquirectangularTexture(J,q),Q.set(q,O),q.addEventListener("dispose",U),Y(O.texture,q.mapping)}else return null}}return q}function H(q){if(q&&q.isTexture){let F=q.mapping,R=F===m$||F===p$,O=F===i7||F===a8;if(R||O){let D=$.get(q),E=D!==void 0?D.texture.pmremVersion:0;if(q.isRenderTargetTexture&&q.pmremVersion!==E){if(Z===null)Z=new JW(J);return D=R?Z.fromEquirectangular(q,D):Z.fromCubemap(q,D),D.texture.pmremVersion=q.pmremVersion,$.set(q,D),D.texture}else if(D!==void 0)return D.texture;else{let V=q.image;if(R&&V&&V.height>0||O&&V&&X(V)){if(Z===null)Z=new JW(J);return D=R?Z.fromEquirectangular(q):Z.fromCubemap(q),D.texture.pmremVersion=q.pmremVersion,$.set(q,D),q.addEventListener("dispose",G),D.texture}else return null}}}return q}function Y(q,F){if(F===m$)q.mapping=i7;else if(F===p$)q.mapping=a8;return q}function X(q){let F=0,R=6;for(let O=0;O<R;O++)if(q[O]!==void 0)F++;return F===R}function U(q){let F=q.target;F.removeEventListener("dispose",U);let R=Q.get(F);if(R!==void 0)Q.delete(F),R.dispose()}function G(q){let F=q.target;F.removeEventListener("dispose",G);let R=$.get(F);if(R!==void 0)$.delete(F),R.dispose()}function N(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:K,dispose:N}}function o1(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let K=J.getExtension(Z);return Q[Z]=K,K}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let K=$(Z);if(K===null)i8("WebGLRenderer: "+Z+" extension not supported.");return K}}}function a1(J,Q,$,Z){let K={},W=new WeakMap;function H(N){let q=N.target;if(q.index!==null)Q.remove(q.index);for(let R in q.attributes)Q.remove(q.attributes[R]);q.removeEventListener("dispose",H),delete K[q.id];let F=W.get(q);if(F)Q.remove(F),W.delete(q);if(Z.releaseStatesOfGeometry(q),q.isInstancedBufferGeometry===!0)delete q._maxInstanceCount;$.memory.geometries--}function Y(N,q){if(K[q.id]===!0)return q;return q.addEventListener("dispose",H),K[q.id]=!0,$.memory.geometries++,q}function X(N){let q=N.attributes;for(let F in q)Q.update(q[F],J.ARRAY_BUFFER)}function U(N){let q=[],F=N.index,R=N.attributes.position,O=0;if(R===void 0)return;if(F!==null){let V=F.array;O=F.version;for(let I=0,L=V.length;I<L;I+=3){let M=V[I+0],P=V[I+1],A=V[I+2];q.push(M,P,P,A,A,M)}}else{let V=R.array;O=R.version;for(let I=0,L=V.length/3-1;I<L;I+=3){let M=I+0,P=I+1,A=I+2;q.push(M,P,P,A,A,M)}}let D=new(R.count>=65535?QZ:JZ)(q,1);D.version=O;let E=W.get(N);if(E)Q.remove(E);W.set(N,D)}function G(N){let q=W.get(N);if(q){let F=N.index;if(F!==null){if(q.version<F.version)U(N)}}else U(N);return W.get(N)}return{get:Y,update:X,getWireframeAttribute:G}}function r1(J,Q,$){let Z;function K(N){Z=N}let W,H;function Y(N){W=N.type,H=N.bytesPerElement}function X(N,q){J.drawElements(Z,q,W,N*H),$.update(q,Z,1)}function U(N,q,F){if(F===0)return;J.drawElementsInstanced(Z,q,W,N*H,F),$.update(q,Z,F)}function G(N,q,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,q,0,W,N,0,F);let O=0;for(let D=0;D<F;D++)O+=q[D];$.update(O,Z,1)}this.setMode=K,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=G}function t1(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(W,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(W/3);break;case J.LINES:$.lines+=Y*(W/2);break;case J.LINE_STRIP:$.lines+=Y*(W-1);break;case J.LINE_LOOP:$.lines+=Y*W;break;case J.POINTS:$.points+=Y*W;break;default:x0("WebGLInfo: Unknown draw mode:",H);break}}function K(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:K,update:Z}}function e1(J,Q,$){let Z=new WeakMap,K=new BJ;function W(H,Y,X){let U=H.morphTargetInfluences,G=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,N=G!==void 0?G.length:0,q=Z.get(Y);if(q===void 0||q.count!==N){let k=function(){A.dispose(),Z.delete(Y),Y.removeEventListener("dispose",k)};if(q!==void 0)q.texture.dispose();let F=Y.morphAttributes.position!==void 0,R=Y.morphAttributes.normal!==void 0,O=Y.morphAttributes.color!==void 0,D=Y.morphAttributes.position||[],E=Y.morphAttributes.normal||[],V=Y.morphAttributes.color||[],I=0;if(F===!0)I=1;if(R===!0)I=2;if(O===!0)I=3;let L=Y.attributes.position.count*I,M=1;if(L>Q.maxTextureSize)M=Math.ceil(L/Q.maxTextureSize),L=Q.maxTextureSize;let P=new Float32Array(L*M*4*N),A=new t$(P,L,M,N);A.type=D8,A.needsUpdate=!0;let B=I*4;for(let b=0;b<N;b++){let T=D[b],y=E[b],c=V[b],_=L*M*4*b;for(let p=0;p<T.count;p++){let o=p*B;if(F===!0)K.fromBufferAttribute(T,p),P[_+o+0]=K.x,P[_+o+1]=K.y,P[_+o+2]=K.z,P[_+o+3]=0;if(R===!0)K.fromBufferAttribute(y,p),P[_+o+4]=K.x,P[_+o+5]=K.y,P[_+o+6]=K.z,P[_+o+7]=0;if(O===!0)K.fromBufferAttribute(c,p),P[_+o+8]=K.x,P[_+o+9]=K.y,P[_+o+10]=K.z,P[_+o+11]=c.itemSize===4?K.w:1}}q={count:N,texture:A,size:new G0(L,M)},Z.set(Y,q),Y.addEventListener("dispose",k)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let F=0;for(let O=0;O<U.length;O++)F+=U[O];let R=Y.morphTargetsRelative?1:1-F;X.getUniforms().setValue(J,"morphTargetBaseInfluence",R),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",q.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",q.size)}return{update:W}}function JN(J,Q,$,Z,K){let W=new WeakMap;function H(U){let G=K.render.frame,N=U.geometry,q=Q.get(U,N);if(W.get(q)!==G)Q.update(q),W.set(q,G);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(W.get(U)!==G){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);W.set(U,G)}}if(U.isSkinnedMesh){let F=U.skeleton;if(W.get(F)!==G)F.update(),W.set(F,G)}return q}function Y(){W=new WeakMap}function X(U){let G=U.target;if(G.removeEventListener("dispose",X),Z.releaseStatesOfObject(G),$.remove(G.instanceMatrix),G.instanceColor!==null)$.remove(G.instanceColor)}return{update:H,dispose:Y}}var QN={[BK]:"LINEAR_TONE_MAPPING",[MK]:"REINHARD_TONE_MAPPING",[VK]:"CINEON_TONE_MAPPING",[wQ]:"ACES_FILMIC_TONE_MAPPING",[zK]:"AGX_TONE_MAPPING",[IK]:"NEUTRAL_TONE_MAPPING",[kK]:"CUSTOM_TONE_MAPPING"};function $N(J,Q,$,Z,K,W){let H=new k9(Q,$,{type:J,depthBuffer:K,stencilBuffer:W,samples:Z?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),Y=null,X=null,U=new wJ;U.setAttribute("position",new $J([-1,3,0,-1,-1,0,3,-1,0],3)),U.setAttribute("uv",new $J([0,2,0,0,2,0],2));let G=new w6({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),N=new v(U,G),q=new dQ(-1,1,1,-1,0,1),F=null,R=null,O=!1,D,E=null,V=[],I=!1;this.setSize=function(L,M){if(H.setSize(L,M),Y!==null)Y.setSize(L,M);if(X!==null)X.setSize(L,M);for(let P=0;P<V.length;P++){let A=V[P];if(A.setSize)A.setSize(L,M)}},this.setEffects=function(L){V=L,I=V.length>0&&V[0].isRenderPass===!0;let{width:M,height:P}=H;if(V.length>0&&Y===null)Y=new k9(M,P,{type:i9,depthBuffer:!1,stencilBuffer:!1}),X=new k9(M,P,{type:i9,depthBuffer:!1,stencilBuffer:!1});for(let A=0;A<V.length;A++){let B=V[A];if(B.setSize)B.setSize(M,P)}},this.begin=function(L,M){if(O)return!1;if(L.toneMapping===p9&&V.length===0)return!1;if(E=M,M!==null){let{width:P,height:A}=M;if(H.width!==P||H.height!==A)this.setSize(P,A)}if(I===!1)L.setRenderTarget(H);return D=L.toneMapping,L.toneMapping=p9,!0},this.hasRenderPass=function(){return I},this.end=function(L,M){L.toneMapping=D,O=!0;let P=H,A=Y;for(let B=0;B<V.length;B++){let k=V[B];if(k.enabled===!1)continue;if(k.render(L,A,P,M),k.needsSwap!==!1)P=A,A=A===Y?X:Y}if(F!==L.outputColorSpace||R!==L.toneMapping){if(F=L.outputColorSpace,R=L.toneMapping,G.defines={},a0.getTransfer(F)===qJ)G.defines.SRGB_TRANSFER="";let B=QN[R];if(B)G.defines[B]="";G.needsUpdate=!0}G.uniforms.tDiffuse.value=P.texture,L.setRenderTarget(E),L.render(N,q),E=null,O=!1},this.isCompositing=function(){return O},this.dispose=function(){if(H.dispose(),Y!==null)Y.dispose();if(X!==null)X.dispose();U.dispose(),G.dispose()}}var IX=new sJ,QW=new W7(1,1),CX=new t$,AX=new E6,PX=new WZ,WX=[],HX=[],YX=new Float32Array(16),XX=new Float32Array(9),UX=new Float32Array(4);function QQ(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let K=Q*$,W=WX[K];if(W===void 0)W=new Float32Array(K),WX[K]=W;if(Q!==0){Z.toArray(W,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(W,Y)}return W}function vJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function gJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function MZ(J,Q){let $=HX[Q];if($===void 0)$=new Int32Array(Q),HX[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function ZN(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function KN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(vJ($,Q))return;J.uniform2fv(this.addr,Q),gJ($,Q)}}function WN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(vJ($,Q))return;J.uniform3fv(this.addr,Q),gJ($,Q)}}function HN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(vJ($,Q))return;J.uniform4fv(this.addr,Q),gJ($,Q)}}function YN(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(vJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),gJ($,Q)}else{if(vJ($,Z))return;UX.set(Z),J.uniformMatrix2fv(this.addr,!1,UX),gJ($,Z)}}function XN(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(vJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),gJ($,Q)}else{if(vJ($,Z))return;XX.set(Z),J.uniformMatrix3fv(this.addr,!1,XX),gJ($,Z)}}function UN(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(vJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),gJ($,Q)}else{if(vJ($,Z))return;YX.set(Z),J.uniformMatrix4fv(this.addr,!1,YX),gJ($,Z)}}function GN(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function qN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(vJ($,Q))return;J.uniform2iv(this.addr,Q),gJ($,Q)}}function NN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(vJ($,Q))return;J.uniform3iv(this.addr,Q),gJ($,Q)}}function FN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(vJ($,Q))return;J.uniform4iv(this.addr,Q),gJ($,Q)}}function DN(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function EN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(vJ($,Q))return;J.uniform2uiv(this.addr,Q),gJ($,Q)}}function ON(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(vJ($,Q))return;J.uniform3uiv(this.addr,Q),gJ($,Q)}}function RN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(vJ($,Q))return;J.uniform4uiv(this.addr,Q),gJ($,Q)}}function LN(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let W;if(this.type===J.SAMPLER_2D_SHADOW)QW.compareFunction=$.isReversedDepthBuffer()?r$:a$,W=QW;else W=IX;$.setTexture2D(Q||W,K)}function BN(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture3D(Q||AX,K)}function MN(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTextureCube(Q||PX,K)}function VN(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture2DArray(Q||CX,K)}function kN(J){switch(J){case 5126:return ZN;case 35664:return KN;case 35665:return WN;case 35666:return HN;case 35674:return YN;case 35675:return XN;case 35676:return UN;case 5124:case 35670:return GN;case 35667:case 35671:return qN;case 35668:case 35672:return NN;case 35669:case 35673:return FN;case 5125:return DN;case 36294:return EN;case 36295:return ON;case 36296:return RN;case 35678:case 36198:case 36298:case 36306:case 35682:return LN;case 35679:case 36299:case 36307:return BN;case 35680:case 36300:case 36308:case 36293:return MN;case 36289:case 36303:case 36311:case 36292:return VN}}function zN(J,Q){J.uniform1fv(this.addr,Q)}function IN(J,Q){let $=QQ(Q,this.size,2);J.uniform2fv(this.addr,$)}function CN(J,Q){let $=QQ(Q,this.size,3);J.uniform3fv(this.addr,$)}function AN(J,Q){let $=QQ(Q,this.size,4);J.uniform4fv(this.addr,$)}function PN(J,Q){let $=QQ(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function SN(J,Q){let $=QQ(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function wN(J,Q){let $=QQ(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function TN(J,Q){J.uniform1iv(this.addr,Q)}function _N(J,Q){J.uniform2iv(this.addr,Q)}function jN(J,Q){J.uniform3iv(this.addr,Q)}function bN(J,Q){J.uniform4iv(this.addr,Q)}function yN(J,Q){J.uniform1uiv(this.addr,Q)}function fN(J,Q){J.uniform2uiv(this.addr,Q)}function xN(J,Q){J.uniform3uiv(this.addr,Q)}function hN(J,Q){J.uniform4uiv(this.addr,Q)}function vN(J,Q,$){let Z=this.cache,K=Q.length,W=MZ($,K);if(!vJ(Z,W))J.uniform1iv(this.addr,W),gJ(Z,W);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=QW;else H=IX;for(let Y=0;Y!==K;++Y)$.setTexture2D(Q[Y]||H,W[Y])}function gN(J,Q,$){let Z=this.cache,K=Q.length,W=MZ($,K);if(!vJ(Z,W))J.uniform1iv(this.addr,W),gJ(Z,W);for(let H=0;H!==K;++H)$.setTexture3D(Q[H]||AX,W[H])}function mN(J,Q,$){let Z=this.cache,K=Q.length,W=MZ($,K);if(!vJ(Z,W))J.uniform1iv(this.addr,W),gJ(Z,W);for(let H=0;H!==K;++H)$.setTextureCube(Q[H]||PX,W[H])}function pN(J,Q,$){let Z=this.cache,K=Q.length,W=MZ($,K);if(!vJ(Z,W))J.uniform1iv(this.addr,W),gJ(Z,W);for(let H=0;H!==K;++H)$.setTexture2DArray(Q[H]||CX,W[H])}function dN(J){switch(J){case 5126:return zN;case 35664:return IN;case 35665:return CN;case 35666:return AN;case 35674:return PN;case 35675:return SN;case 35676:return wN;case 5124:case 35670:return TN;case 35667:case 35671:return _N;case 35668:case 35672:return jN;case 35669:case 35673:return bN;case 5125:return yN;case 36294:return fN;case 36295:return xN;case 36296:return hN;case 35678:case 36198:case 36298:case 36306:case 35682:return vN;case 35679:case 36299:case 36307:return gN;case 35680:case 36300:case 36308:case 36293:return mN;case 36289:case 36303:case 36311:case 36292:return pN}}class SX{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=kN(Q.type)}}class wX{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=dN(Q.type)}}class TX{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let K=0,W=Z.length;K!==W;++K){let H=Z[K];H.setValue(J,Q[H.id],$)}}}var t6=/(\w+)(\])?(\[|\.)?/g;function GX(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function uN(J,Q,$){let Z=J.name,K=Z.length;t6.lastIndex=0;while(!0){let W=t6.exec(Z),H=t6.lastIndex,Y=W[1],X=W[2]==="]",U=W[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===K){GX($,U===void 0?new SX(Y,J,Q):new wX(Y,J,Q));break}else{let N=$.map[Y];if(N===void 0)N=new TX(Y),GX($,N);$=N}}}class nQ{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let W=0;W<$;++W){let H=J.getActiveUniform(Q,W),Y=J.getUniformLocation(Q,H.name);uN(H,Y,this)}let Z=[],K=[];for(let W of this.seq)if(W.type===J.SAMPLER_2D_SHADOW||W.type===J.SAMPLER_CUBE_SHADOW||W.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(W);else K.push(W);if(Z.length>0)this.seq=Z.concat(K)}setValue(J,Q,$,Z){let K=this.map[Q];if(K!==void 0)K.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let K=0,W=Q.length;K!==W;++K){let H=Q[K],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,K=J.length;Z!==K;++Z){let W=J[Z];if(W.id in Q)$.push(W)}return $}}function qX(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var lN=37297,cN=0;function sN(J,Q){let $=J.split(`
`),Z=[],K=Math.max(Q-6,0),W=Math.min(Q+6,$.length);for(let H=K;H<W;H++){let Y=H+1;Z.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return Z.join(`
`)}var NX=new g0;function nN(J){a0._getMatrix(NX,a0.workingColorSpace,J);let Q=`mat3( ${NX.elements.map(($)=>$.toFixed(4))} )`;switch(a0.getTransfer(J)){case U6:return[Q,"LinearTransferOETF"];case qJ:return[Q,"sRGBTransferOETF"];default:return b0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function FX(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),W=(J.getShaderInfoLog(Q)||"").trim();if(Z&&W==="")return"";let H=/ERROR: 0:(\d+)/.exec(W);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+W+`

`+sN(J.getShaderSource(Q),Y)}else return W}function iN(J,Q){let $=nN(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var oN={[BK]:"Linear",[MK]:"Reinhard",[VK]:"Cineon",[wQ]:"ACESFilmic",[zK]:"AgX",[IK]:"Neutral",[kK]:"Custom"};function aN(J,Q){let $=oN[Q];if($===void 0)return b0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var LZ=new w;function rN(){a0.getLuminanceCoefficients(LZ);let J=LZ.x.toFixed(4),Q=LZ.y.toFixed(4),$=LZ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function tN(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sQ).join(`
`)}function eN(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function JF(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let W=J.getActiveAttrib(Q,K),H=W.name,Y=1;if(W.type===J.FLOAT_MAT2)Y=2;if(W.type===J.FLOAT_MAT3)Y=3;if(W.type===J.FLOAT_MAT4)Y=4;$[H]={type:W.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function sQ(J){return J!==""}function DX(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,Q.numSunLights).replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,Q.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function EX(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var QF=/^[ \t]*#include +<([\w\d./]+)>/gm;function $W(J){return J.replace(QF,ZF)}var $F=new Map;function ZF(J,Q){let $=u0[Q];if($===void 0){let Z=$F.get(Q);if(Z!==void 0)$=u0[Z],b0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return $W($)}var KF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function OX(J){return J.replace(KF,WF)}function WF(J,Q,$,Z){let K="";for(let W=parseInt(Q);W<parseInt($);W++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+W+" ]").replace(/UNROLLED_LOOP_INDEX/g,W);return K}function RX(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var HF={[PQ]:"SHADOWMAP_TYPE_PCF",[c7]:"SHADOWMAP_TYPE_VSM"};function YF(J){return HF[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var XF={[i7]:"ENVMAP_TYPE_CUBE",[a8]:"ENVMAP_TYPE_CUBE",[TQ]:"ENVMAP_TYPE_CUBE_UV"};function UF(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return XF[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var GF={[a8]:"ENVMAP_MODE_REFRACTION"};function qF(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return GF[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var NF={[kY]:"ENVMAP_BLENDING_MULTIPLY",[zY]:"ENVMAP_BLENDING_MIX",[IY]:"ENVMAP_BLENDING_ADD"};function FF(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return NF[J.combine]||"ENVMAP_BLENDING_NONE"}function DF(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function EF(J,Q,$,Z){let K=J.getContext(),W=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=YF($),U=UF($),G=qF($),N=FF($),q=DF($),F=tN($),R=eN(W),O=K.createProgram(),D,E,V=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(sQ).join(`
`),D.length>0)D+=`
`;if(E=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(sQ).join(`
`),E.length>0)E+=`
`}else D=[RX($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+G:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(sQ).join(`
`),E=[RX($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+G:"",$.envMap?"#define "+N:"",q?"#define CUBEUV_TEXEL_WIDTH "+q.texelWidth:"",q?"#define CUBEUV_TEXEL_HEIGHT "+q.texelHeight:"",q?"#define CUBEUV_MAX_MIP "+q.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.retroreflection?"#define USE_RETROREFLECTION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==p9?"#define TONE_MAPPING":"",$.toneMapping!==p9?u0.tonemapping_pars_fragment:"",$.toneMapping!==p9?aN("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",u0.colorspace_pars_fragment,iN("linearToOutputTexel",$.outputColorSpace),rN(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(sQ).join(`
`);if(H=$W(H),H=DX(H,$),H=EX(H,$),Y=$W(Y),Y=DX(Y,$),Y=EX(Y,$),H=OX(H),Y=OX(Y),$.isRawShaderMaterial!==!0)V=`#version 300 es
`,D=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,E=["#define varying in",$.glslVersion===G6?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===G6?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E;let I=V+D+H,L=V+E+Y,M=qX(K,K.VERTEX_SHADER,I),P=qX(K,K.FRAGMENT_SHADER,L);if(K.attachShader(O,M),K.attachShader(O,P),$.index0AttributeName!==void 0)K.bindAttribLocation(O,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)K.bindAttribLocation(O,0,"position");K.linkProgram(O);function A(T){if(J.debug.checkShaderErrors){let y=K.getProgramInfoLog(O)||"",c=K.getShaderInfoLog(M)||"",_=K.getShaderInfoLog(P)||"",p=y.trim(),o=c.trim(),g=_.trim(),J0=!0,m=!0;if(K.getProgramParameter(O,K.LINK_STATUS)===!1)if(J0=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,O,M,P);else{let l=FX(K,M,"vertex"),a=FX(K,P,"fragment");x0("WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(O,K.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+p+`
`+l+`
`+a)}else if(p!=="")b0("WebGLProgram: Program Info Log:",p);else if(o===""||g==="")m=!1;if(m)T.diagnostics={runnable:J0,programLog:p,vertexShader:{log:o,prefix:D},fragmentShader:{log:g,prefix:E}}}K.deleteShader(M),K.deleteShader(P),B=new nQ(K,O),k=JF(K,O)}let B;this.getUniforms=function(){if(B===void 0)A(this);return B};let k;this.getAttributes=function(){if(k===void 0)A(this);return k};let b=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(b===!1)b=K.getProgramParameter(O,lN);return b},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(O),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=cN++,this.cacheKey=Q,this.usedTimes=1,this.program=O,this.vertexShader=M,this.fragmentShader=P,this}var OF=0;class _X{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new jX(J),Q.set(J,$);return $}}class jX{constructor(J){this.id=OF++,this.code=J,this.usedTimes=0}}function RF(J){return J===Q7||J===i$||J===o$}function LF(J,Q,$,Z,K,W){let H=new fQ,Y=new _X,X=new Set,U=[],G=new Map,N=Z.logarithmicDepthBuffer,q=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(B){if(X.add(B),B===0)return"uv";return`uv${B}`}function O(B,k,b,T,y,c){let _=T.fog,p=y.geometry,o=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?T.environment:null,g=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,J0=Q.get(B.envMap||o,g),m=!!J0&&J0.mapping===TQ?J0.image.height:null,l=F[B.type];if(B.precision!==null){if(q=Z.getMaxPrecision(B.precision),q!==B.precision)b0("WebGLProgram.getParameters:",B.precision,"not supported, using",q,"instead.")}let a=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,U0=a!==void 0?a.length:0,q0=0;if(p.morphAttributes.position!==void 0)q0=1;if(p.morphAttributes.normal!==void 0)q0=2;if(p.morphAttributes.color!==void 0)q0=3;let f0,S0,i,K0;if(l){let EJ=J8[l];f0=EJ.vertexShader,S0=EJ.fragmentShader}else{f0=B.vertexShader,S0=B.fragmentShader;let EJ=Y.getVertexShaderStage(B),ZJ=Y.getFragmentShaderStage(B);Y.update(B,EJ,ZJ),i=EJ.id,K0=ZJ.id}let Z0=J.getRenderTarget(),T0=J.state.buffers.depth.getReversed(),j0=y.isInstancedMesh===!0,w0=y.isBatchedMesh===!0,kJ=!!B.map,l0=!!B.matcap,n0=!!J0,s0=!!B.aoMap,i0=!!B.lightMap,jJ=!!B.bumpMap&&B.wireframe===!1,WJ=!!B.normalMap,lJ=!!B.displacementMap,PJ=!!B.emissiveMap,SJ=!!B.metalnessMap,j=!!B.roughnessMap,DJ=B.anisotropy>0,t0=B.clearcoat>0,zJ=B.dispersion>0,S=B.retroreflectivity>0,z=B.iridescence>0,f=B.sheen>0,s=B.transmission>0,$0=DJ&&!!B.anisotropyMap,X0=t0&&!!B.clearcoatMap,D0=t0&&!!B.clearcoatNormalMap,r=t0&&!!B.clearcoatRoughnessMap,e=z&&!!B.iridescenceMap,M0=z&&!!B.iridescenceThicknessMap,P0=f&&!!B.sheenColorMap,E0=f&&!!B.sheenRoughnessMap,W0=!!B.specularMap,_0=!!B.specularColorMap,y0=!!B.specularIntensityMap,JJ=s&&!!B.transmissionMap,h=s&&!!B.thicknessMap,N0=!!B.gradientMap,t=!!B.alphaMap,F0=B.alphaTest>0,V0=!!B.alphaHash,Q0=!!B.extensions,R0=p9;if(B.toneMapped){if(Z0===null||Z0.isXRRenderTarget===!0)R0=J.toneMapping}let m0={shaderID:l,shaderType:B.type,shaderName:B.name,vertexShader:f0,fragmentShader:S0,defines:B.defines,customVertexShaderID:i,customFragmentShaderID:K0,isRawShaderMaterial:B.isRawShaderMaterial===!0,glslVersion:B.glslVersion,precision:q,batching:w0,batchingColor:w0&&y._colorsTexture!==null,instancing:j0,instancingColor:j0&&y.instanceColor!==null,instancingMorph:j0&&y.morphTexture!==null,outputColorSpace:Z0===null?J.outputColorSpace:Z0.isXRRenderTarget===!0?Z0.texture.colorSpace:a0.workingColorSpace,alphaToCoverage:!!B.alphaToCoverage,map:kJ,matcap:l0,envMap:n0,envMapMode:n0&&J0.mapping,envMapCubeUVHeight:m,aoMap:s0,lightMap:i0,bumpMap:jJ,normalMap:WJ,displacementMap:lJ,emissiveMap:PJ,normalMapObjectSpace:WJ&&B.normalMapType===yY,normalMapTangentSpace:WJ&&B.normalMapType===Y6,packedNormalMap:WJ&&B.normalMapType===Y6&&RF(B.normalMap.format),metalnessMap:SJ,roughnessMap:j,anisotropy:DJ,anisotropyMap:$0,clearcoat:t0,clearcoatMap:X0,clearcoatNormalMap:D0,clearcoatRoughnessMap:r,dispersion:zJ,retroreflection:S,iridescence:z,iridescenceMap:e,iridescenceThicknessMap:M0,sheen:f,sheenColorMap:P0,sheenRoughnessMap:E0,specularMap:W0,specularColorMap:_0,specularIntensityMap:y0,transmission:s,transmissionMap:JJ,thicknessMap:h,gradientMap:N0,opaque:B.transparent===!1&&B.blending===SQ&&B.alphaToCoverage===!1,alphaMap:t,alphaTest:F0,alphaHash:V0,combine:B.combine,mapUv:kJ&&R(B.map.channel),aoMapUv:s0&&R(B.aoMap.channel),lightMapUv:i0&&R(B.lightMap.channel),bumpMapUv:jJ&&R(B.bumpMap.channel),normalMapUv:WJ&&R(B.normalMap.channel),displacementMapUv:lJ&&R(B.displacementMap.channel),emissiveMapUv:PJ&&R(B.emissiveMap.channel),metalnessMapUv:SJ&&R(B.metalnessMap.channel),roughnessMapUv:j&&R(B.roughnessMap.channel),anisotropyMapUv:$0&&R(B.anisotropyMap.channel),clearcoatMapUv:X0&&R(B.clearcoatMap.channel),clearcoatNormalMapUv:D0&&R(B.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:r&&R(B.clearcoatRoughnessMap.channel),iridescenceMapUv:e&&R(B.iridescenceMap.channel),iridescenceThicknessMapUv:M0&&R(B.iridescenceThicknessMap.channel),sheenColorMapUv:P0&&R(B.sheenColorMap.channel),sheenRoughnessMapUv:E0&&R(B.sheenRoughnessMap.channel),specularMapUv:W0&&R(B.specularMap.channel),specularColorMapUv:_0&&R(B.specularColorMap.channel),specularIntensityMapUv:y0&&R(B.specularIntensityMap.channel),transmissionMapUv:JJ&&R(B.transmissionMap.channel),thicknessMapUv:h&&R(B.thicknessMap.channel),alphaMapUv:t&&R(B.alphaMap.channel),vertexTangents:!!p.attributes.tangent&&(WJ||DJ),vertexNormals:!!p.attributes.normal,vertexColors:B.vertexColors,vertexAlphas:B.vertexColors===!0&&!!p.attributes.color&&p.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!p.attributes.uv&&(kJ||t),fog:!!_,useFog:B.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:B.wireframe===!1&&(B.flatShading===!0||p.attributes.normal===void 0&&WJ===!1&&(B.isMeshLambertMaterial||B.isMeshPhongMaterial||B.isMeshStandardMaterial||B.isMeshPhysicalMaterial)),sizeAttenuation:B.sizeAttenuation===!0,logarithmicDepthBuffer:N,reversedDepthBuffer:T0,skinning:y.isSkinnedMesh===!0,hasPositionAttribute:p.attributes.position!==void 0,morphTargets:p.morphAttributes.position!==void 0,morphNormals:p.morphAttributes.normal!==void 0,morphColors:p.morphAttributes.color!==void 0,morphTargetsCount:U0,morphTextureStride:q0,numSunLights:k.sun.length,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numSunLightShadows:k.sunShadowMap.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numLightProbeGrids:c.length,numClippingPlanes:W.numPlanes,numClipIntersection:W.numIntersection,dithering:B.dithering,shadowMapEnabled:J.shadowMap.enabled&&b.length>0,shadowMapType:J.shadowMap.type,toneMapping:R0,decodeVideoTexture:kJ&&B.map.isVideoTexture===!0&&a0.getTransfer(B.map.colorSpace)===qJ,decodeVideoTextureEmissive:PJ&&B.emissiveMap.isVideoTexture===!0&&a0.getTransfer(B.emissiveMap.colorSpace)===qJ,premultipliedAlpha:B.premultipliedAlpha,doubleSided:B.side===tJ,flipSided:B.side===U9,useDepthPacking:B.depthPacking>=0,depthPacking:B.depthPacking||0,index0AttributeName:B.index0AttributeName,extensionClipCullDistance:Q0&&B.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Q0&&B.extensions.multiDraw===!0||w0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:B.customProgramCacheKey()};return m0.vertexUv1s=X.has(1),m0.vertexUv2s=X.has(2),m0.vertexUv3s=X.has(3),X.clear(),m0}function D(B){let k=[];if(B.shaderID)k.push(B.shaderID);else k.push(B.customVertexShaderID),k.push(B.customFragmentShaderID);if(B.defines!==void 0)for(let b in B.defines)k.push(b),k.push(B.defines[b]);if(B.isRawShaderMaterial===!1)E(k,B),V(k,B),k.push(J.outputColorSpace);return k.push(B.customProgramCacheKey),k.join()}function E(B,k){B.push(k.precision),B.push(k.outputColorSpace),B.push(k.envMapMode),B.push(k.envMapCubeUVHeight),B.push(k.mapUv),B.push(k.alphaMapUv),B.push(k.lightMapUv),B.push(k.aoMapUv),B.push(k.bumpMapUv),B.push(k.normalMapUv),B.push(k.displacementMapUv),B.push(k.emissiveMapUv),B.push(k.metalnessMapUv),B.push(k.roughnessMapUv),B.push(k.anisotropyMapUv),B.push(k.clearcoatMapUv),B.push(k.clearcoatNormalMapUv),B.push(k.clearcoatRoughnessMapUv),B.push(k.iridescenceMapUv),B.push(k.iridescenceThicknessMapUv),B.push(k.sheenColorMapUv),B.push(k.sheenRoughnessMapUv),B.push(k.specularMapUv),B.push(k.specularColorMapUv),B.push(k.specularIntensityMapUv),B.push(k.transmissionMapUv),B.push(k.thicknessMapUv),B.push(k.combine),B.push(k.fogExp2),B.push(k.sizeAttenuation),B.push(k.morphTargetsCount),B.push(k.morphAttributeCount),B.push(k.numSunLights),B.push(k.numDirLights),B.push(k.numPointLights),B.push(k.numSpotLights),B.push(k.numSpotLightMaps),B.push(k.numHemiLights),B.push(k.numRectAreaLights),B.push(k.numSunLightShadows),B.push(k.numDirLightShadows),B.push(k.numPointLightShadows),B.push(k.numSpotLightShadows),B.push(k.numSpotLightShadowsWithMaps),B.push(k.numLightProbes),B.push(k.shadowMapType),B.push(k.toneMapping),B.push(k.numClippingPlanes),B.push(k.numClipIntersection),B.push(k.depthPacking)}function V(B,k){if(H.disableAll(),k.instancing)H.enable(0);if(k.instancingColor)H.enable(1);if(k.instancingMorph)H.enable(2);if(k.matcap)H.enable(3);if(k.envMap)H.enable(4);if(k.normalMapObjectSpace)H.enable(5);if(k.normalMapTangentSpace)H.enable(6);if(k.clearcoat)H.enable(7);if(k.iridescence)H.enable(8);if(k.alphaTest)H.enable(9);if(k.vertexColors)H.enable(10);if(k.vertexAlphas)H.enable(11);if(k.vertexUv1s)H.enable(12);if(k.vertexUv2s)H.enable(13);if(k.vertexUv3s)H.enable(14);if(k.vertexTangents)H.enable(15);if(k.anisotropy)H.enable(16);if(k.alphaHash)H.enable(17);if(k.batching)H.enable(18);if(k.dispersion)H.enable(19);if(k.retroreflection)H.enable(24);if(k.batchingColor)H.enable(20);if(k.gradientMap)H.enable(21);if(k.packedNormalMap)H.enable(22);if(k.vertexNormals)H.enable(23);if(B.push(H.mask),H.disableAll(),k.fog)H.enable(0);if(k.useFog)H.enable(1);if(k.flatShading)H.enable(2);if(k.logarithmicDepthBuffer)H.enable(3);if(k.reversedDepthBuffer)H.enable(4);if(k.skinning)H.enable(5);if(k.morphTargets)H.enable(6);if(k.morphNormals)H.enable(7);if(k.morphColors)H.enable(8);if(k.premultipliedAlpha)H.enable(9);if(k.shadowMapEnabled)H.enable(10);if(k.doubleSided)H.enable(11);if(k.flipSided)H.enable(12);if(k.useDepthPacking)H.enable(13);if(k.dithering)H.enable(14);if(k.transmission)H.enable(15);if(k.sheen)H.enable(16);if(k.opaque)H.enable(17);if(k.pointsUvs)H.enable(18);if(k.decodeVideoTexture)H.enable(19);if(k.decodeVideoTextureEmissive)H.enable(20);if(k.alphaToCoverage)H.enable(21);if(k.numLightProbeGrids>0)H.enable(22);if(k.hasPositionAttribute)H.enable(23);B.push(H.mask)}function I(B){let k=F[B.type],b;if(k){let T=J8[k];b=iY.clone(T.uniforms)}else b=B.uniforms;return b}function L(B,k){let b=G.get(k);if(b!==void 0)++b.usedTimes;else b=new EF(J,k,B,K),U.push(b),G.set(k,b);return b}function M(B){if(--B.usedTimes===0){let k=U.indexOf(B);U[k]=U[U.length-1],U.pop(),G.delete(B.cacheKey),B.destroy()}}function P(B){Y.remove(B)}function A(){Y.dispose()}return{getParameters:O,getProgramCacheKey:D,getUniforms:I,acquireProgram:L,releaseProgram:M,releaseShaderCache:P,programs:U,dispose:A}}function BF(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function Z(H){J.delete(H)}function K(H,Y,X){J.get(H)[Y]=X}function W(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:K,dispose:W}}function MF(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function LX(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function BX(){let J=[],Q=0,$=[],Z=[],K=[];function W(){Q=0,$.length=0,Z.length=0,K.length=0}function H(q){let F=0;if(q.isInstancedMesh)F+=2;if(q.isSkinnedMesh)F+=1;return F}function Y(q,F,R,O,D,E){let V=J[Q];if(V===void 0)V={id:q.id,object:q,geometry:F,material:R,materialVariant:H(q),groupOrder:O,renderOrder:q.renderOrder,z:D,group:E},J[Q]=V;else V.id=q.id,V.object=q,V.geometry=F,V.material=R,V.materialVariant=H(q),V.groupOrder=O,V.renderOrder=q.renderOrder,V.z=D,V.group=E;return Q++,V}function X(q,F,R,O,D,E,V){if(V.reversedDepth===!0)D=-D;let I=Y(q,F,R,O,D,E);if(R.transmission>0)Z.push(I);else if(R.transparent===!0)K.push(I);else $.push(I)}function U(q,F,R,O,D,E){let V=Y(q,F,R,O,D,E);if(R.transmission>0)Z.unshift(V);else if(R.transparent===!0)K.unshift(V);else $.unshift(V)}function G(q,F){if($.length>1)$.sort(q||MF);if(Z.length>1)Z.sort(F||LX);if(K.length>1)K.sort(F||LX)}function N(){for(let q=Q,F=J.length;q<F;q++){let R=J[q];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:$,transmissive:Z,transparent:K,init:W,push:X,unshift:U,finish:N,sort:G}}function VF(){let J=new WeakMap;function Q(Z,K){let W=J.get(Z),H;if(W===void 0)H=new BX,J.set(Z,[H]);else if(K>=W.length)H=new BX,W.push(H);else H=W[K];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function kF(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={direction:new w,color:new c0};break;case"SpotLight":$={position:new w,direction:new w,color:new c0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new w,color:new c0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new w,skyColor:new c0,groundColor:new c0};break;case"RectAreaLight":$={color:new c0,position:new w,halfWidth:new w,halfHeight:new w};break}return J[Q.id]=$,$}}}function zF(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var IF=0;function CF(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function AF(J){let Q=new kF,$=zF(),Z={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new w);let K=new w,W=new QJ,H=new QJ;function Y(U){let G=0,N=0,q=0;for(let y=0;y<9;y++)Z.probe[y].set(0,0,0);let F=0,R=0,O=0,D=0,E=0,V=0,I=0,L=0,M=0,P=0,A=0,B=0,k=0,b=0;U.sort(CF);for(let y=0,c=U.length;y<c;y++){let _=U[y],p=_.color,o=_.intensity,g=_.distance,J0=null;if(_.shadow&&_.shadow.map)if(_.shadow.map.texture.format===Q7)J0=_.shadow.map.texture;else J0=_.shadow.map.depthTexture||_.shadow.map.texture;if(_.isAmbientLight)G+=p.r*o,N+=p.g*o,q+=p.b*o;else if(_.isLightProbe){for(let m=0;m<9;m++)Z.probe[m].addScaledVector(_.sh.coefficients[m],o);b++}else if(_.isSunLight){let m=Q.get(_);if(m.color.copy(_.color).multiplyScalar(_.intensity),_.castShadow){let l=_.shadow,a=$.get(_);a.shadowIntensity=l.intensity,a.shadowBias=l.bias,a.shadowNormalBias=l.normalBias,a.shadowRadius=l.radius,a.shadowMapSize.copy(l.mapSize).multiply(l.getFrameExtents()),Z.sunShadow[R]=a,Z.sunShadowMap[R]=J0;let U0=l.getViewportCount();for(let q0=0;q0<U0;q0++)Z.sunShadowMatrix[O+q0]=l.getMatrix(q0),Z.sunShadowCascade[O+q0]=l._cascadeData[q0];O+=U0,R++}Z.sun[F]=m,F++}else if(_.isDirectionalLight){let m=Q.get(_);if(m.color.copy(_.color).multiplyScalar(_.intensity),_.castShadow){let l=_.shadow,a=$.get(_);a.shadowIntensity=l.intensity,a.shadowBias=l.bias,a.shadowNormalBias=l.normalBias,a.shadowRadius=l.radius,a.shadowMapSize=l.mapSize,Z.directionalShadow[D]=a,Z.directionalShadowMap[D]=J0,Z.directionalShadowMatrix[D]=_.shadow.matrix,M++}Z.directional[D]=m,D++}else if(_.isSpotLight){let m=Q.get(_);m.position.setFromMatrixPosition(_.matrixWorld),m.color.copy(p).multiplyScalar(o),m.distance=g,m.coneCos=Math.cos(_.angle),m.penumbraCos=Math.cos(_.angle*(1-_.penumbra)),m.decay=_.decay,Z.spot[V]=m;let l=_.shadow;if(_.map){if(Z.spotLightMap[B]=_.map,B++,l.updateMatrices(_),_.castShadow)k++}if(Z.spotLightMatrix[V]=l.matrix,_.castShadow){let a=$.get(_);a.shadowIntensity=l.intensity,a.shadowBias=l.bias,a.shadowNormalBias=l.normalBias,a.shadowRadius=l.radius,a.shadowMapSize=l.mapSize,Z.spotShadow[V]=a,Z.spotShadowMap[V]=J0,A++}V++}else if(_.isRectAreaLight){let m=Q.get(_);m.color.copy(p).multiplyScalar(o),m.halfWidth.set(_.width*0.5,0,0),m.halfHeight.set(0,_.height*0.5,0),Z.rectArea[I]=m,I++}else if(_.isPointLight){let m=Q.get(_);if(m.color.copy(_.color).multiplyScalar(_.intensity),m.distance=_.distance,m.decay=_.decay,_.castShadow){let l=_.shadow,a=$.get(_);a.shadowIntensity=l.intensity,a.shadowBias=l.bias,a.shadowNormalBias=l.normalBias,a.shadowRadius=l.radius,a.shadowMapSize=l.mapSize,a.shadowCameraNear=l.camera.near,a.shadowCameraFar=l.camera.far,Z.pointShadow[E]=a,Z.pointShadowMap[E]=J0,Z.pointShadowMatrix[E]=_.shadow.matrix,P++}Z.point[E]=m,E++}else if(_.isHemisphereLight){let m=Q.get(_);m.skyColor.copy(_.color).multiplyScalar(o),m.groundColor.copy(_.groundColor).multiplyScalar(o),Z.hemi[L]=m,L++}}if(I>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=O0.LTC_FLOAT_1,Z.rectAreaLTC2=O0.LTC_FLOAT_2;else Z.rectAreaLTC1=O0.LTC_HALF_1,Z.rectAreaLTC2=O0.LTC_HALF_2;Z.ambient[0]=G,Z.ambient[1]=N,Z.ambient[2]=q;let T=Z.hash;if(T.sunLength!==F||T.directionalLength!==D||T.pointLength!==E||T.spotLength!==V||T.rectAreaLength!==I||T.hemiLength!==L||T.numSunShadows!==R||T.numDirectionalShadows!==M||T.numPointShadows!==P||T.numSpotShadows!==A||T.numSpotMaps!==B||T.numLightProbes!==b)Z.sun.length=F,Z.directional.length=D,Z.spot.length=V,Z.rectArea.length=I,Z.point.length=E,Z.hemi.length=L,Z.sunShadow.length=R,Z.sunShadowMap.length=R,Z.sunShadowMatrix.length=O,Z.sunShadowCascade.length=O,Z.directionalShadow.length=M,Z.directionalShadowMap.length=M,Z.directionalShadowMatrix.length=M,Z.pointShadow.length=P,Z.pointShadowMap.length=P,Z.pointShadowMatrix.length=P,Z.spotShadow.length=A,Z.spotShadowMap.length=A,Z.spotLightMatrix.length=A+B-k,Z.spotLightMap.length=B,Z.numSpotLightShadowsWithMaps=k,Z.numLightProbes=b,T.sunLength=F,T.directionalLength=D,T.pointLength=E,T.spotLength=V,T.rectAreaLength=I,T.hemiLength=L,T.numSunShadows=R,T.numDirectionalShadows=M,T.numPointShadows=P,T.numSpotShadows=A,T.numSpotMaps=B,T.numLightProbes=b,Z.version=IF++}function X(U,G){let N=0,q=0,F=0,R=0,O=0,D=0,E=G.matrixWorldInverse;for(let V=0,I=U.length;V<I;V++){let L=U[V];if(L.isSunLight){let M=Z.sun[N];M.direction.setFromMatrixPosition(L.matrixWorld),M.direction.transformDirection(E),N++}else if(L.isDirectionalLight){let M=Z.directional[q];M.direction.setFromMatrixPosition(L.matrixWorld),K.setFromMatrixPosition(L.target.matrixWorld),M.direction.sub(K),M.direction.transformDirection(E),q++}else if(L.isSpotLight){let M=Z.spot[R];M.position.setFromMatrixPosition(L.matrixWorld),M.position.applyMatrix4(E),M.direction.setFromMatrixPosition(L.matrixWorld),K.setFromMatrixPosition(L.target.matrixWorld),M.direction.sub(K),M.direction.transformDirection(E),R++}else if(L.isRectAreaLight){let M=Z.rectArea[O];M.position.setFromMatrixPosition(L.matrixWorld),M.position.applyMatrix4(E),H.identity(),W.copy(L.matrixWorld),W.premultiply(E),H.extractRotation(W),M.halfWidth.set(L.width*0.5,0,0),M.halfHeight.set(0,L.height*0.5,0),M.halfWidth.applyMatrix4(H),M.halfHeight.applyMatrix4(H),O++}else if(L.isPointLight){let M=Z.point[F];M.position.setFromMatrixPosition(L.matrixWorld),M.position.applyMatrix4(E),F++}else if(L.isHemisphereLight){let M=Z.hemi[D];M.direction.setFromMatrixPosition(L.matrixWorld),M.direction.transformDirection(E),D++}}}return{setup:Y,setupView:X,state:Z}}function MX(J){let Q=new AF(J),$=[],Z=[],K=[];function W(q){N.camera=q,$.length=0,Z.length=0,K.length=0}function H(q){$.push(q)}function Y(q){Z.push(q)}function X(q){K.push(q)}function U(){Q.setup($)}function G(q){Q.setupView($,q)}let N={lightsArray:$,shadowsArray:Z,lightProbeGridArray:K,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:W,state:N,setupLights:U,setupLightsView:G,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function PF(J){let Q=new WeakMap;function $(K,W=0){let H=Q.get(K),Y;if(H===void 0)Y=new MX(J),Q.set(K,[Y]);else if(W>=H.length)Y=new MX(J),H.push(Y);else Y=H[W];return Y}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var SF=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wF=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,TF=[new w(1,0,0),new w(-1,0,0),new w(0,1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1)],_F=[new w(0,-1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1),new w(0,-1,0),new w(0,-1,0)],VX=new QJ,cQ=new w,e6=new w;function jF(J,Q,$){let Z=new vQ,K=new G0,W=new G0,H=new BJ,Y=new T6,X=new _6,U={},G=$.maxTextureSize,N={[s7]:U9,[U9]:s7,[tJ]:tJ},q=new j9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G0},radius:{value:4}},vertexShader:SF,fragmentShader:wF}),F=q.clone();F.defines.HORIZONTAL_PASS=1;let R=new wJ;R.setAttribute("position",new H9(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let O=new v(R,q),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=PQ;let E=this.type;this.render=function(P,A,B){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(P.length===0)return;if(this.type===g$)b0("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=PQ;let k=J.getRenderTarget(),b=J.getActiveCubeFace(),T=J.getActiveMipmapLevel(),y=J.state;if(y.setBlending(n9),y.buffers.depth.getReversed()===!0)y.buffers.color.setClear(0,0,0,0);else y.buffers.color.setClear(1,1,1,1);y.buffers.depth.setTest(!0),y.setScissorTest(!1);let c=E!==this.type;if(c)A.traverse(function(_){if(_.material)if(Array.isArray(_.material))_.material.forEach((p)=>p.needsUpdate=!0);else _.material.needsUpdate=!0});for(let _=0,p=P.length;_<p;_++){let o=P[_],g=o.shadow;if(g===void 0){b0("WebGLShadowMap:",o,"has no shadow.");continue}if(g.autoUpdate===!1&&g.needsUpdate===!1)continue;K.copy(g.mapSize);let J0=g.getFrameExtents();if(K.multiply(J0),W.copy(g.mapSize),K.x>G||K.y>G){if(K.x>G)W.x=Math.floor(G/J0.x),K.x=W.x*J0.x,g.mapSize.x=W.x;if(K.y>G)W.y=Math.floor(G/J0.y),K.y=W.y*J0.y,g.mapSize.y=W.y}let m=J.state.buffers.depth.getReversed();if(g.camera._reversedDepth=m,g.map===null||c===!0){if(g.map!==null){if(g.map.depthTexture!==null)g.map.depthTexture.dispose(),g.map.depthTexture=null;g.map.dispose()}if(this.type===c7){if(o.isPointLight){b0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}g.map=new k9(K.x,K.y,{format:Q7,type:i9,minFilter:G9,magFilter:G9,generateMipmaps:!1}),g.map.texture.name=o.name+".shadowMap",g.map.depthTexture=new W7(K.x,K.y,D8),g.map.depthTexture.name=o.name+".shadowMapDepth",g.map.depthTexture.format=e8,g.map.depthTexture.compareFunction=null,g.map.depthTexture.minFilter=_8,g.map.depthTexture.magFilter=_8}else{if(o.isPointLight)g.map=new ZW(K.x),g.map.depthTexture=new B6(K.x,j8);else g.map=new k9(K.x,K.y),g.map.depthTexture=new W7(K.x,K.y,j8);if(g.map.depthTexture.name=o.name+".shadowMap",g.map.depthTexture.format=e8,this.type===PQ)g.map.depthTexture.compareFunction=m?r$:a$,g.map.depthTexture.minFilter=G9,g.map.depthTexture.magFilter=G9;else g.map.depthTexture.compareFunction=null,g.map.depthTexture.minFilter=_8,g.map.depthTexture.magFilter=_8}g.camera.updateProjectionMatrix()}if(g.map.isWebGLCubeRenderTarget!==!0&&(g.map.width!==K.x||g.map.height!==K.y))g.map.setSize(K.x,K.y);let l=g.map.isWebGLCubeRenderTarget?6:g.getViewportCount();if(o.isPointLight!==!0)g.updateMatrices(o,B);for(let a=0;a<l;a++){let U0=g.getCamera(a);if(o.isPointLight){let{camera:q0,matrix:f0}=g,S0=o.distance||q0.far;if(S0!==q0.far)q0.far=S0,q0.updateProjectionMatrix();cQ.setFromMatrixPosition(o.matrixWorld),q0.position.copy(cQ),e6.copy(q0.position),e6.add(TF[a]),q0.up.copy(_F[a]),q0.lookAt(e6),q0.updateMatrixWorld(),f0.makeTranslation(-cQ.x,-cQ.y,-cQ.z),VX.multiplyMatrices(q0.projectionMatrix,q0.matrixWorldInverse),g._frustum.setFromProjectionMatrix(VX,q0.coordinateSystem,q0.reversedDepth)}if(g.map.isWebGLCubeRenderTarget)J.setRenderTarget(g.map,a),J.clear();else{if(a===0)J.setRenderTarget(g.map),J.clear();let q0=g.getViewport(a);H.set(W.x*q0.x,W.y*q0.y,W.x*q0.z,W.y*q0.w),y.viewport(H)}Z=g.getFrustum(a),L(A,B,U0,o,this.type)}if(g.isPointLightShadow!==!0&&this.type===c7)V(g,B);g.needsUpdate=!1}E=this.type,D.needsUpdate=!1,J.setRenderTarget(k,b,T)};function V(P,A){let B=Q.update(O);if(q.defines.VSM_SAMPLES!==P.blurSamples)q.defines.VSM_SAMPLES=P.blurSamples,F.defines.VSM_SAMPLES=P.blurSamples,q.needsUpdate=!0,F.needsUpdate=!0;if(P.mapPass===null)P.mapPass=new k9(K.x,K.y,{format:Q7,type:i9});else if(P.mapPass.width!==P.map.width||P.mapPass.height!==P.map.height)P.mapPass.setSize(P.map.width,P.map.height);q.uniforms.shadow_pass.value=P.map.depthTexture,q.uniforms.resolution.value.set(P.map.width,P.map.height),q.uniforms.radius.value=P.radius,J.setRenderTarget(P.mapPass),J.clear(),J.renderBufferDirect(A,null,B,q,O,null),F.uniforms.shadow_pass.value=P.mapPass.texture,F.uniforms.resolution.value.set(P.map.width,P.map.height),F.uniforms.radius.value=P.radius,J.setRenderTarget(P.map),J.clear(),J.renderBufferDirect(A,null,B,F,O,null)}function I(P,A,B,k){let b=null,T=B.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(T!==void 0)b=T;else if(b=B.isPointLight===!0?X:Y,J.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let y=b.uuid,c=A.uuid,_=U[y];if(_===void 0)_={},U[y]=_;let p=_[c];if(p===void 0)p=b.clone(),_[c]=p,A.addEventListener("dispose",M);b=p}if(b.visible=A.visible,b.wireframe=A.wireframe,k===c7)b.side=A.shadowSide!==null?A.shadowSide:A.side;else b.side=A.shadowSide!==null?A.shadowSide:N[A.side];if(b.alphaMap=A.alphaMap,b.alphaTest=A.alphaToCoverage===!0?0.5:A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,B.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let y=J.properties.get(b);y.light=B}return b}function L(P,A,B,k,b){if(P.visible===!1)return;if(P.layers.test(A.layers)&&(P.isMesh||P.isLine||P.isPoints)){if((P.castShadow||P.receiveShadow&&b===c7)&&(!P.frustumCulled||P.intersectsFrustum(Z))){P.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,P.matrixWorld);let c=Q.update(P),_=P.material;if(Array.isArray(_)){let p=c.groups;for(let o=0,g=p.length;o<g;o++){let J0=p[o],m=_[J0.materialIndex];if(m&&m.visible){let l=I(P,m,k,b);P.onBeforeShadow(J,P,A,B,c,l,J0),J.renderBufferDirect(B,null,c,l,P,J0),P.onAfterShadow(J,P,A,B,c,l,J0)}}}else if(_.visible){let p=I(P,_,k,b);P.onBeforeShadow(J,P,A,B,c,p,null),J.renderBufferDirect(B,null,c,p,P,null),P.onAfterShadow(J,P,A,B,c,p,null)}}}let y=P.children;for(let c=0,_=y.length;c<_;c++)L(y[c],A,B,k,b)}function M(P){P.target.removeEventListener("dispose",M);for(let B in U){let k=U[B],b=P.target.uuid;if(b in k)k[b].dispose(),delete k[b]}}}function bF(J,Q){function $(){let h=!1,N0=new BJ,t=null,F0=new BJ(0,0,0,0);return{setMask:function(V0){if(t!==V0&&!h)J.colorMask(V0,V0,V0,V0),t=V0},setLocked:function(V0){h=V0},setClear:function(V0,Q0,R0,m0,EJ){if(EJ===!0)V0*=m0,Q0*=m0,R0*=m0;if(N0.set(V0,Q0,R0,m0),F0.equals(N0)===!1)J.clearColor(V0,Q0,R0,m0),F0.copy(N0)},reset:function(){h=!1,t=null,F0.set(-1,0,0,0)}}}function Z(){let h=!1,N0=!1,t=null,F0=null,V0=null;return{setReversed:function(Q0){if(N0!==Q0){let R0=Q.get("EXT_clip_control");if(Q0)R0.clipControlEXT(R0.LOWER_LEFT_EXT,R0.ZERO_TO_ONE_EXT);else R0.clipControlEXT(R0.LOWER_LEFT_EXT,R0.NEGATIVE_ONE_TO_ONE_EXT);N0=Q0;let m0=V0;V0=null,this.setClear(m0)}},getReversed:function(){return N0},setTest:function(Q0){if(Q0)Z0(J.DEPTH_TEST);else T0(J.DEPTH_TEST)},setMask:function(Q0){if(t!==Q0&&!h)J.depthMask(Q0),t=Q0},setFunc:function(Q0){if(N0)Q0=cY[Q0];if(F0!==Q0){switch(Q0){case EY:J.depthFunc(J.NEVER);break;case OY:J.depthFunc(J.ALWAYS);break;case RY:J.depthFunc(J.LESS);break;case LK:J.depthFunc(J.LEQUAL);break;case LY:J.depthFunc(J.EQUAL);break;case BY:J.depthFunc(J.GEQUAL);break;case MY:J.depthFunc(J.GREATER);break;case VY:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}F0=Q0}},setLocked:function(Q0){h=Q0},setClear:function(Q0){if(V0!==Q0){if(V0=Q0,N0)Q0=1-Q0;J.clearDepth(Q0)}},reset:function(){h=!1,t=null,F0=null,V0=null,N0=!1}}}function K(){let h=!1,N0=null,t=null,F0=null,V0=null,Q0=null,R0=null,m0=null,EJ=null;return{setTest:function(ZJ){if(!h)if(ZJ)Z0(J.STENCIL_TEST);else T0(J.STENCIL_TEST)},setMask:function(ZJ){if(N0!==ZJ&&!h)J.stencilMask(ZJ),N0=ZJ},setFunc:function(ZJ,l9,W8){if(t!==ZJ||F0!==l9||V0!==W8)J.stencilFunc(ZJ,l9,W8),t=ZJ,F0=l9,V0=W8},setOp:function(ZJ,l9,W8){if(Q0!==ZJ||R0!==l9||m0!==W8)J.stencilOp(ZJ,l9,W8),Q0=ZJ,R0=l9,m0=W8},setLocked:function(ZJ){h=ZJ},setClear:function(ZJ){if(EJ!==ZJ)J.clearStencil(ZJ),EJ=ZJ},reset:function(){h=!1,N0=null,t=null,F0=null,V0=null,Q0=null,R0=null,m0=null,EJ=null}}}let W=new $,H=new Z,Y=new K,X=new WeakMap,U=new WeakMap,G={},N={},q={},F=new WeakMap,R=[],O=null,D=!1,E=null,V=null,I=null,L=null,M=null,P=null,A=null,B=new c0(0,0,0),k=0,b=!1,T=null,y=null,c=null,_=null,p=null,o=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),g=!1,J0=0,m=J.getParameter(J.VERSION);if(m.indexOf("WebGL")!==-1)J0=parseFloat(/^WebGL (\d)/.exec(m)[1]),g=J0>=1;else if(m.indexOf("OpenGL ES")!==-1)J0=parseFloat(/^OpenGL ES (\d)/.exec(m)[1]),g=J0>=2;let l=null,a={},U0=J.getParameter(J.SCISSOR_BOX),q0=J.getParameter(J.VIEWPORT),f0=new BJ().fromArray(U0),S0=new BJ().fromArray(q0);function i(h,N0,t,F0){let V0=new Uint8Array(4),Q0=J.createTexture();J.bindTexture(h,Q0),J.texParameteri(h,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(h,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let R0=0;R0<t;R0++)if(h===J.TEXTURE_3D||h===J.TEXTURE_2D_ARRAY)J.texImage3D(N0,0,J.RGBA,1,1,F0,0,J.RGBA,J.UNSIGNED_BYTE,V0);else J.texImage2D(N0+R0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,V0);return Q0}let K0={};K0[J.TEXTURE_2D]=i(J.TEXTURE_2D,J.TEXTURE_2D,1),K0[J.TEXTURE_CUBE_MAP]=i(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),K0[J.TEXTURE_2D_ARRAY]=i(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),K0[J.TEXTURE_3D]=i(J.TEXTURE_3D,J.TEXTURE_3D,1,1),W.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),Z0(J.DEPTH_TEST),H.setFunc(LK),jJ(!1),WJ(EK),Z0(J.CULL_FACE),s0(n9);function Z0(h){if(G[h]!==!0)J.enable(h),G[h]=!0}function T0(h){if(G[h]!==!1)J.disable(h),G[h]=!1}function j0(h,N0){if(q[h]!==N0){if(J.bindFramebuffer(h,N0),q[h]=N0,h===J.DRAW_FRAMEBUFFER)q[J.FRAMEBUFFER]=N0;if(h===J.FRAMEBUFFER)q[J.DRAW_FRAMEBUFFER]=N0;return!0}return!1}function w0(h,N0){let t=R,F0=!1;if(h){if(t=F.get(N0),t===void 0)t=[],F.set(N0,t);let V0=h.textures;if(t.length!==V0.length||t[0]!==J.COLOR_ATTACHMENT0){for(let Q0=0,R0=V0.length;Q0<R0;Q0++)t[Q0]=J.COLOR_ATTACHMENT0+Q0;t.length=V0.length,F0=!0}}else if(t[0]!==J.BACK)t[0]=J.BACK,F0=!0;if(F0)J.drawBuffers(t)}function kJ(h){if(O!==h)return J.useProgram(h),O=h,!0;return!1}let l0={[n7]:J.FUNC_ADD,[aH]:J.FUNC_SUBTRACT,[rH]:J.FUNC_REVERSE_SUBTRACT};l0[tH]=J.MIN,l0[eH]=J.MAX;let n0={[JY]:J.ZERO,[QY]:J.ONE,[$Y]:J.SRC_COLOR,[KY]:J.SRC_ALPHA,[GY]:J.SRC_ALPHA_SATURATE,[XY]:J.DST_COLOR,[HY]:J.DST_ALPHA,[ZY]:J.ONE_MINUS_SRC_COLOR,[WY]:J.ONE_MINUS_SRC_ALPHA,[UY]:J.ONE_MINUS_DST_COLOR,[YY]:J.ONE_MINUS_DST_ALPHA,[qY]:J.CONSTANT_COLOR,[NY]:J.ONE_MINUS_CONSTANT_COLOR,[FY]:J.CONSTANT_ALPHA,[DY]:J.ONE_MINUS_CONSTANT_ALPHA};function s0(h,N0,t,F0,V0,Q0,R0,m0,EJ,ZJ){if(h===n9){if(D===!0)T0(J.BLEND),D=!1;return}if(D===!1)Z0(J.BLEND),D=!0;if(h!==oH){if(h!==E||ZJ!==b){if(V!==n7||M!==n7)J.blendEquation(J.FUNC_ADD),V=n7,M=n7;if(ZJ)switch(h){case SQ:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case T8:J.blendFunc(J.ONE,J.ONE);break;case OK:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case RK:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:x0("WebGLState: Invalid blending: ",h);break}else switch(h){case SQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case T8:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case OK:x0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case RK:x0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:x0("WebGLState: Invalid blending: ",h);break}I=null,L=null,P=null,A=null,B.set(0,0,0),k=0,E=h,b=ZJ}return}if(V0=V0||N0,Q0=Q0||t,R0=R0||F0,N0!==V||V0!==M)J.blendEquationSeparate(l0[N0],l0[V0]),V=N0,M=V0;if(t!==I||F0!==L||Q0!==P||R0!==A)J.blendFuncSeparate(n0[t],n0[F0],n0[Q0],n0[R0]),I=t,L=F0,P=Q0,A=R0;if(m0.equals(B)===!1||EJ!==k)J.blendColor(m0.r,m0.g,m0.b,EJ),B.copy(m0),k=EJ;E=h,b=!1}function i0(h,N0){h.side===tJ?T0(J.CULL_FACE):Z0(J.CULL_FACE);let t=h.side===U9;if(N0)t=!t;jJ(t),h.blending===SQ&&h.transparent===!1?s0(n9):s0(h.blending,h.blendEquation,h.blendSrc,h.blendDst,h.blendEquationAlpha,h.blendSrcAlpha,h.blendDstAlpha,h.blendColor,h.blendAlpha,h.premultipliedAlpha),H.setFunc(h.depthFunc),H.setTest(h.depthTest),H.setMask(h.depthWrite),W.setMask(h.colorWrite);let F0=h.stencilWrite;if(Y.setTest(F0),F0)Y.setMask(h.stencilWriteMask),Y.setFunc(h.stencilFunc,h.stencilRef,h.stencilFuncMask),Y.setOp(h.stencilFail,h.stencilZFail,h.stencilZPass);PJ(h.polygonOffset,h.polygonOffsetFactor,h.polygonOffsetUnits),h.alphaToCoverage===!0?Z0(J.SAMPLE_ALPHA_TO_COVERAGE):T0(J.SAMPLE_ALPHA_TO_COVERAGE)}function jJ(h){if(T!==h){if(h)J.frontFace(J.CW);else J.frontFace(J.CCW);T=h}}function WJ(h){if(h!==nH){if(Z0(J.CULL_FACE),h!==y)if(h===EK)J.cullFace(J.BACK);else if(h===iH)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else T0(J.CULL_FACE);y=h}function lJ(h){if(h!==c){if(g)J.lineWidth(h);c=h}}function PJ(h,N0,t){if(h){if(Z0(J.POLYGON_OFFSET_FILL),_!==N0||p!==t){if(_=N0,p=t,H.getReversed())N0=-N0;J.polygonOffset(N0,t)}}else T0(J.POLYGON_OFFSET_FILL)}function SJ(h){if(h)Z0(J.SCISSOR_TEST);else T0(J.SCISSOR_TEST)}function j(h){if(h===void 0)h=J.TEXTURE0+o-1;if(l!==h)J.activeTexture(h),l=h}function DJ(h,N0,t){if(t===void 0)if(l===null)t=J.TEXTURE0+o-1;else t=l;let F0=a[t];if(F0===void 0)F0={type:void 0,texture:void 0},a[t]=F0;if(F0.type!==h||F0.texture!==N0){if(l!==t)J.activeTexture(t),l=t;J.bindTexture(h,N0||K0[h]),F0.type=h,F0.texture=N0}}function t0(){let h=a[l];if(h!==void 0&&h.type!==void 0)J.bindTexture(h.type,null),h.type=void 0,h.texture=void 0}function zJ(){try{J.compressedTexImage2D(...arguments)}catch(h){x0("WebGLState:",h)}}function S(){try{J.compressedTexImage3D(...arguments)}catch(h){x0("WebGLState:",h)}}function z(){try{J.texSubImage2D(...arguments)}catch(h){x0("WebGLState:",h)}}function f(){try{J.texSubImage3D(...arguments)}catch(h){x0("WebGLState:",h)}}function s(){try{J.compressedTexSubImage2D(...arguments)}catch(h){x0("WebGLState:",h)}}function $0(){try{J.compressedTexSubImage3D(...arguments)}catch(h){x0("WebGLState:",h)}}function X0(){try{J.texStorage2D(...arguments)}catch(h){x0("WebGLState:",h)}}function D0(){try{J.texStorage3D(...arguments)}catch(h){x0("WebGLState:",h)}}function r(){try{J.texImage2D(...arguments)}catch(h){x0("WebGLState:",h)}}function e(){try{J.texImage3D(...arguments)}catch(h){x0("WebGLState:",h)}}function M0(h){if(N[h]!==void 0)return N[h];else return J.getParameter(h)}function P0(h,N0){if(N[h]!==N0)J.pixelStorei(h,N0),N[h]=N0}function E0(h){if(f0.equals(h)===!1)J.scissor(h.x,h.y,h.z,h.w),f0.copy(h)}function W0(h){if(S0.equals(h)===!1)J.viewport(h.x,h.y,h.z,h.w),S0.copy(h)}function _0(h,N0){let t=U.get(N0);if(t===void 0)t=new WeakMap,U.set(N0,t);let F0=t.get(h);if(F0===void 0)F0=J.getUniformBlockIndex(N0,h.name),t.set(h,F0)}function y0(h,N0){let F0=U.get(N0).get(h);if(X.get(N0)!==F0)J.uniformBlockBinding(N0,F0,h.__bindingPointIndex),X.set(N0,F0)}function JJ(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),G={},N={},l=null,a={},q={},F=new WeakMap,R=[],O=null,D=!1,E=null,V=null,I=null,L=null,M=null,P=null,A=null,B=new c0(0,0,0),k=0,b=!1,T=null,y=null,c=null,_=null,p=null,f0.set(0,0,J.canvas.width,J.canvas.height),S0.set(0,0,J.canvas.width,J.canvas.height),W.reset(),H.reset(),Y.reset()}return{buffers:{color:W,depth:H,stencil:Y},enable:Z0,disable:T0,bindFramebuffer:j0,drawBuffers:w0,useProgram:kJ,setBlending:s0,setMaterial:i0,setFlipSided:jJ,setCullFace:WJ,setLineWidth:lJ,setPolygonOffset:PJ,setScissorTest:SJ,activeTexture:j,bindTexture:DJ,unbindTexture:t0,compressedTexImage2D:zJ,compressedTexImage3D:S,texImage2D:r,texImage3D:e,pixelStorei:P0,getParameter:M0,updateUBOMapping:_0,uniformBlockBinding:y0,texStorage2D:X0,texStorage3D:D0,texSubImage2D:z,texSubImage3D:f,compressedTexSubImage2D:s,compressedTexSubImage3D:$0,scissor:E0,viewport:W0,reset:JJ}}function yF(J,Q,$,Z,K,W,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new G0,G=new WeakMap,N=new Set,q,F=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(S){}function O(S,z){return R?new OffscreenCanvas(S,z):IQ("canvas")}function D(S,z,f){let s=1,$0=zJ(S);if($0.width>f||$0.height>f)s=f/Math.max($0.width,$0.height);if(s<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let X0=Math.floor(s*$0.width),D0=Math.floor(s*$0.height);if(q===void 0)q=O(X0,D0);let r=z?O(X0,D0):q;return r.width=X0,r.height=D0,r.getContext("2d").drawImage(S,0,0,X0,D0),b0("WebGLRenderer: Texture has been resized from ("+$0.width+"x"+$0.height+") to ("+X0+"x"+D0+")."),r}else{if("data"in S)b0("WebGLRenderer: Image in DataTexture is too big ("+$0.width+"x"+$0.height+").");return S}return S}function E(S){return S.generateMipmaps}function V(S){J.generateMipmap(S)}function I(S){if(S.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(S.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function L(S,z,f,s,$0,X0=!1){if(S!==null){if(J[S]!==void 0)return J[S];b0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let D0;if(s){if(D0=Q.get("EXT_texture_norm16"),!D0)b0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let r=z;if(z===J.RED){if(f===J.FLOAT)r=J.R32F;if(f===J.HALF_FLOAT)r=J.R16F;if(f===J.UNSIGNED_BYTE)r=J.R8;if(f===J.UNSIGNED_SHORT&&D0)r=D0.R16_EXT;if(f===J.SHORT&&D0)r=D0.R16_SNORM_EXT}if(z===J.RED_INTEGER){if(f===J.UNSIGNED_BYTE)r=J.R8UI;if(f===J.UNSIGNED_SHORT)r=J.R16UI;if(f===J.UNSIGNED_INT)r=J.R32UI;if(f===J.BYTE)r=J.R8I;if(f===J.SHORT)r=J.R16I;if(f===J.INT)r=J.R32I}if(z===J.RG){if(f===J.FLOAT)r=J.RG32F;if(f===J.HALF_FLOAT)r=J.RG16F;if(f===J.UNSIGNED_BYTE)r=J.RG8;if(f===J.UNSIGNED_SHORT&&D0)r=D0.RG16_EXT;if(f===J.SHORT&&D0)r=D0.RG16_SNORM_EXT}if(z===J.RG_INTEGER){if(f===J.UNSIGNED_BYTE)r=J.RG8UI;if(f===J.UNSIGNED_SHORT)r=J.RG16UI;if(f===J.UNSIGNED_INT)r=J.RG32UI;if(f===J.BYTE)r=J.RG8I;if(f===J.SHORT)r=J.RG16I;if(f===J.INT)r=J.RG32I}if(z===J.RGB_INTEGER){if(f===J.UNSIGNED_BYTE)r=J.RGB8UI;if(f===J.UNSIGNED_SHORT)r=J.RGB16UI;if(f===J.UNSIGNED_INT)r=J.RGB32UI;if(f===J.BYTE)r=J.RGB8I;if(f===J.SHORT)r=J.RGB16I;if(f===J.INT)r=J.RGB32I}if(z===J.RGBA_INTEGER){if(f===J.UNSIGNED_BYTE)r=J.RGBA8UI;if(f===J.UNSIGNED_SHORT)r=J.RGBA16UI;if(f===J.UNSIGNED_INT)r=J.RGBA32UI;if(f===J.BYTE)r=J.RGBA8I;if(f===J.SHORT)r=J.RGBA16I;if(f===J.INT)r=J.RGBA32I}if(z===J.RGB){if(f===J.UNSIGNED_SHORT&&D0)r=D0.RGB16_EXT;if(f===J.SHORT&&D0)r=D0.RGB16_SNORM_EXT;if(f===J.UNSIGNED_INT_5_9_9_9_REV)r=J.RGB9_E5;if(f===J.UNSIGNED_INT_10F_11F_11F_REV)r=J.R11F_G11F_B10F}if(z===J.RGBA){let e=X0?U6:a0.getTransfer($0);if(f===J.FLOAT)r=J.RGBA32F;if(f===J.HALF_FLOAT)r=J.RGBA16F;if(f===J.UNSIGNED_BYTE)r=e===qJ?J.SRGB8_ALPHA8:J.RGBA8;if(f===J.UNSIGNED_SHORT&&D0)r=D0.RGBA16_EXT;if(f===J.SHORT&&D0)r=D0.RGBA16_SNORM_EXT;if(f===J.UNSIGNED_SHORT_4_4_4_4)r=J.RGBA4;if(f===J.UNSIGNED_SHORT_5_5_5_1)r=J.RGB5_A1}if(r===J.R16F||r===J.R32F||r===J.RG16F||r===J.RG32F||r===J.RGBA16F||r===J.RGBA32F)Q.get("EXT_color_buffer_float");return r}function M(S,z){let f;if(S){if(z===null||z===j8||z===o7)f=J.DEPTH24_STENCIL8;else if(z===D8)f=J.DEPTH32F_STENCIL8;else if(z===jQ)f=J.DEPTH24_STENCIL8,b0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(z===null||z===j8||z===o7)f=J.DEPTH_COMPONENT24;else if(z===D8)f=J.DEPTH_COMPONENT32F;else if(z===jQ)f=J.DEPTH_COMPONENT16;return f}function P(S,z){if(E(S)===!0||S.isFramebufferTexture&&S.minFilter!==_8&&S.minFilter!==G9)return Math.log2(Math.max(z.width,z.height))+1;else if(S.mipmaps!==void 0&&S.mipmaps.length>0)return S.mipmaps.length;else if(S.isCompressedTexture&&Array.isArray(S.image))return z.mipmaps.length;else return 1}function A(S){let z=S.target;if(z.removeEventListener("dispose",A),k(z),z.isVideoTexture)G.delete(z);if(z.isHTMLTexture)N.delete(z)}function B(S){let z=S.target;z.removeEventListener("dispose",B),T(z)}function k(S){let z=Z.get(S);if(z.__webglInit===void 0)return;let f=S.source,s=F.get(f);if(s){let $0=s[z.__cacheKey];if($0.usedTimes--,$0.usedTimes===0)b(S);if(Object.keys(s).length===0)F.delete(f)}Z.remove(S)}function b(S){let z=Z.get(S);J.deleteTexture(z.__webglTexture);let f=S.source,s=F.get(f);delete s[z.__cacheKey],H.memory.textures--}function T(S){let z=Z.get(S);if(S.depthTexture)S.depthTexture.dispose(),Z.remove(S.depthTexture);if(S.isWebGLCubeRenderTarget)for(let s=0;s<6;s++){if(Array.isArray(z.__webglFramebuffer[s]))for(let $0=0;$0<z.__webglFramebuffer[s].length;$0++)J.deleteFramebuffer(z.__webglFramebuffer[s][$0]);else J.deleteFramebuffer(z.__webglFramebuffer[s]);if(z.__webglDepthbuffer)J.deleteRenderbuffer(z.__webglDepthbuffer[s])}else{if(Array.isArray(z.__webglFramebuffer))for(let s=0;s<z.__webglFramebuffer.length;s++)J.deleteFramebuffer(z.__webglFramebuffer[s]);else J.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer)J.deleteRenderbuffer(z.__webglDepthbuffer);if(z.__webglMultisampledFramebuffer)J.deleteFramebuffer(z.__webglMultisampledFramebuffer);if(z.__webglColorRenderbuffer){for(let s=0;s<z.__webglColorRenderbuffer.length;s++)if(z.__webglColorRenderbuffer[s])J.deleteRenderbuffer(z.__webglColorRenderbuffer[s])}if(z.__webglDepthRenderbuffer)J.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let f=S.textures;for(let s=0,$0=f.length;s<$0;s++){let X0=Z.get(f[s]);if(X0.__webglTexture)J.deleteTexture(X0.__webglTexture),H.memory.textures--;Z.remove(f[s])}Z.remove(S)}let y=0;function c(){y=0}function _(){return y}function p(S){y=S}function o(){let S=y;if(S>=K.maxTextures)b0("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+K.maxTextures);return y+=1,S}function g(S){let z=[];return z.push(S.wrapS),z.push(S.wrapT),z.push(S.wrapR||0),z.push(S.magFilter),z.push(S.minFilter),z.push(S.anisotropy),z.push(S.internalFormat),z.push(S.format),z.push(S.type),z.push(S.generateMipmaps),z.push(S.premultiplyAlpha),z.push(S.flipY),z.push(S.unpackAlignment),z.push(S.colorSpace),z.join()}function J0(S,z){let f=Z.get(S);if(S.isVideoTexture)DJ(S);if(S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&f.__version!==S.version){let s=S.image;if(s===null)b0("WebGLRenderer: Texture marked for update but no image data found.");else if(s.complete===!1)b0("WebGLRenderer: Texture marked for update but image is incomplete");else{T0(f,S,z);return}}else if(S.isExternalTexture)f.__webglTexture=S.sourceTexture?S.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,f.__webglTexture,J.TEXTURE0+z)}function m(S,z){let f=Z.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&f.__version!==S.version){T0(f,S,z);return}else if(S.isExternalTexture)f.__webglTexture=S.sourceTexture?S.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,f.__webglTexture,J.TEXTURE0+z)}function l(S,z){let f=Z.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&f.__version!==S.version){T0(f,S,z);return}$.bindTexture(J.TEXTURE_3D,f.__webglTexture,J.TEXTURE0+z)}function a(S,z){let f=Z.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&f.__version!==S.version){j0(f,S,z);return}$.bindTexture(J.TEXTURE_CUBE_MAP,f.__webglTexture,J.TEXTURE0+z)}let U0={[r8]:J.REPEAT,[d$]:J.CLAMP_TO_EDGE,[CY]:J.MIRRORED_REPEAT},q0={[_8]:J.NEAREST,[AY]:J.NEAREST_MIPMAP_NEAREST,[_Q]:J.NEAREST_MIPMAP_LINEAR,[G9]:J.LINEAR,[u$]:J.LINEAR_MIPMAP_NEAREST,[t8]:J.LINEAR_MIPMAP_LINEAR},f0={[xY]:J.NEVER,[pY]:J.ALWAYS,[hY]:J.LESS,[a$]:J.LEQUAL,[vY]:J.EQUAL,[r$]:J.GEQUAL,[gY]:J.GREATER,[mY]:J.NOTEQUAL};function S0(S,z){if(z.type===D8&&Q.has("OES_texture_float_linear")===!1&&(z.magFilter===G9||z.magFilter===u$||z.magFilter===_Q||z.magFilter===t8||z.minFilter===G9||z.minFilter===u$||z.minFilter===_Q||z.minFilter===t8))b0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(S,J.TEXTURE_WRAP_S,U0[z.wrapS]),J.texParameteri(S,J.TEXTURE_WRAP_T,U0[z.wrapT]),S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texParameteri(S,J.TEXTURE_WRAP_R,U0[z.wrapR]);if(J.texParameteri(S,J.TEXTURE_MAG_FILTER,q0[z.magFilter]),J.texParameteri(S,J.TEXTURE_MIN_FILTER,q0[z.minFilter]),z.compareFunction)J.texParameteri(S,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(S,J.TEXTURE_COMPARE_FUNC,f0[z.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(z.magFilter===_8)return;if(z.minFilter!==_Q&&z.minFilter!==t8)return;if(z.type===D8&&Q.has("OES_texture_float_linear")===!1)return;if(z.anisotropy>1||Z.get(z).__currentAnisotropy){let f=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(S,f.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(z.anisotropy,K.getMaxAnisotropy())),Z.get(z).__currentAnisotropy=z.anisotropy}}}function i(S,z){let f=!1;if(S.__webglInit===void 0)S.__webglInit=!0,z.addEventListener("dispose",A);let s=z.source,$0=F.get(s);if($0===void 0)$0={},F.set(s,$0);let X0=g(z);if(X0!==S.__cacheKey){if($0[X0]===void 0)$0[X0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,f=!0;$0[X0].usedTimes++;let D0=$0[S.__cacheKey];if(D0!==void 0){if($0[S.__cacheKey].usedTimes--,D0.usedTimes===0)b(z)}S.__cacheKey=X0,S.__webglTexture=$0[X0].texture}return f}function K0(S,z,f){return Math.floor(Math.floor(S/f)/z)}function Z0(S,z,f,s){let X0=S.updateRanges;if(X0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,z.width,z.height,f,s,z.data);else{X0.sort((P0,E0)=>P0.start-E0.start);let D0=0;for(let P0=1;P0<X0.length;P0++){let E0=X0[D0],W0=X0[P0],_0=E0.start+E0.count,y0=K0(W0.start,z.width,4),JJ=K0(E0.start,z.width,4);if(W0.start<=_0+1&&y0===JJ&&K0(W0.start+W0.count-1,z.width,4)===y0)E0.count=Math.max(E0.count,W0.start+W0.count-E0.start);else++D0,X0[D0]=W0}X0.length=D0+1;let r=$.getParameter(J.UNPACK_ROW_LENGTH),e=$.getParameter(J.UNPACK_SKIP_PIXELS),M0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,z.width);for(let P0=0,E0=X0.length;P0<E0;P0++){let W0=X0[P0],_0=Math.floor(W0.start/4),y0=Math.ceil(W0.count/4),JJ=_0%z.width,h=Math.floor(_0/z.width),N0=y0,t=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,JJ),$.pixelStorei(J.UNPACK_SKIP_ROWS,h),$.texSubImage2D(J.TEXTURE_2D,0,JJ,h,N0,1,f,s,z.data)}S.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,r),$.pixelStorei(J.UNPACK_SKIP_PIXELS,e),$.pixelStorei(J.UNPACK_SKIP_ROWS,M0)}}function T0(S,z,f){let s=J.TEXTURE_2D;if(z.isDataArrayTexture||z.isCompressedArrayTexture)s=J.TEXTURE_2D_ARRAY;if(z.isData3DTexture)s=J.TEXTURE_3D;let $0=i(S,z),X0=z.source;$.bindTexture(s,S.__webglTexture,J.TEXTURE0+f);let D0=Z.get(X0);if(X0.version!==D0.__version||$0===!0){if($.activeTexture(J.TEXTURE0+f),(typeof ImageBitmap<"u"&&z.image instanceof ImageBitmap)===!1){let t=a0.getPrimaries(a0.workingColorSpace),F0=z.colorSpace===$7?null:a0.getPrimaries(z.colorSpace),V0=z.colorSpace===$7||t===F0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,z.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,V0)}$.pixelStorei(J.UNPACK_ALIGNMENT,z.unpackAlignment);let e=D(z.image,!1,K.maxTextureSize);e=t0(z,e);let M0=W.convert(z.format,z.colorSpace),P0=W.convert(z.type),E0=L(z.internalFormat,M0,P0,z.normalized,z.colorSpace,z.isVideoTexture);S0(s,z);let W0,_0=z.mipmaps,y0=z.isVideoTexture!==!0,JJ=D0.__version===void 0||$0===!0,h=X0.dataReady,N0=P(z,e);if(z.isDepthTexture){if(E0=M(z.format===J7,z.type),JJ)if(y0)$.texStorage2D(J.TEXTURE_2D,1,E0,e.width,e.height);else $.texImage2D(J.TEXTURE_2D,0,E0,e.width,e.height,0,M0,P0,null)}else if(z.isDataTexture)if(_0.length>0){if(y0&&JJ)$.texStorage2D(J.TEXTURE_2D,N0,E0,_0[0].width,_0[0].height);for(let t=0,F0=_0.length;t<F0;t++)if(W0=_0[t],y0){if(h)$.texSubImage2D(J.TEXTURE_2D,t,0,0,W0.width,W0.height,M0,P0,W0.data)}else $.texImage2D(J.TEXTURE_2D,t,E0,W0.width,W0.height,0,M0,P0,W0.data);z.generateMipmaps=!1}else if(y0){if(JJ)$.texStorage2D(J.TEXTURE_2D,N0,E0,e.width,e.height);if(h)Z0(z,e,M0,P0)}else $.texImage2D(J.TEXTURE_2D,0,E0,e.width,e.height,0,M0,P0,e.data);else if(z.isCompressedTexture)if(z.isCompressedArrayTexture){if(y0&&JJ)$.texStorage3D(J.TEXTURE_2D_ARRAY,N0,E0,_0[0].width,_0[0].height,e.depth);for(let t=0,F0=_0.length;t<F0;t++)if(W0=_0[t],z.format!==o9)if(M0!==null)if(y0){if(h)if(z.layerUpdates.size>0){let V0=n6(W0.width,W0.height,z.format,z.type);for(let Q0 of z.layerUpdates){let R0=W0.data.subarray(Q0*V0/W0.data.BYTES_PER_ELEMENT,(Q0+1)*V0/W0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,t,0,0,Q0,W0.width,W0.height,1,M0,R0)}}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,t,0,0,0,W0.width,W0.height,e.depth,M0,W0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,t,E0,W0.width,W0.height,e.depth,0,W0.data,0,0);else b0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(y0){if(h)$.texSubImage3D(J.TEXTURE_2D_ARRAY,t,0,0,0,W0.width,W0.height,e.depth,M0,P0,W0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,t,E0,W0.width,W0.height,e.depth,0,M0,P0,W0.data);if(z.layerUpdates.size>0)z.clearLayerUpdates()}else{if(y0&&JJ)$.texStorage2D(J.TEXTURE_2D,N0,E0,_0[0].width,_0[0].height);for(let t=0,F0=_0.length;t<F0;t++)if(W0=_0[t],z.format!==o9)if(M0!==null)if(y0){if(h)$.compressedTexSubImage2D(J.TEXTURE_2D,t,0,0,W0.width,W0.height,M0,W0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,t,E0,W0.width,W0.height,0,W0.data);else b0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(y0){if(h)$.texSubImage2D(J.TEXTURE_2D,t,0,0,W0.width,W0.height,M0,P0,W0.data)}else $.texImage2D(J.TEXTURE_2D,t,E0,W0.width,W0.height,0,M0,P0,W0.data)}else if(z.isDataArrayTexture)if(y0){if(JJ)$.texStorage3D(J.TEXTURE_2D_ARRAY,N0,E0,e.width,e.height,e.depth);if(h)if(z.layerUpdates.size>0){let t=n6(e.width,e.height,z.format,z.type);for(let F0 of z.layerUpdates){let V0=e.data.subarray(F0*t/e.data.BYTES_PER_ELEMENT,(F0+1)*t/e.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,F0,e.width,e.height,1,M0,P0,V0)}z.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,M0,P0,e.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,E0,e.width,e.height,e.depth,0,M0,P0,e.data);else if(z.isData3DTexture)if(y0){if(JJ)$.texStorage3D(J.TEXTURE_3D,N0,E0,e.width,e.height,e.depth);if(h)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,M0,P0,e.data)}else $.texImage3D(J.TEXTURE_3D,0,E0,e.width,e.height,e.depth,0,M0,P0,e.data);else if(z.isFramebufferTexture){if(JJ)if(y0)$.texStorage2D(J.TEXTURE_2D,N0,E0,e.width,e.height);else{let{width:t,height:F0}=e;for(let V0=0;V0<N0;V0++)$.texImage2D(J.TEXTURE_2D,V0,E0,t,F0,0,M0,P0,null),t>>=1,F0>>=1}}else if(z.isHTMLTexture){if("texElementImage2D"in J){let t=J.canvas;if(!t.hasAttribute("layoutsubtree"))t.setAttribute("layoutsubtree","true");if(e.parentNode!==t){t.appendChild(e),N.add(z),t.onpaint=(F0)=>{let V0=F0.changedElements;for(let Q0 of N)if(V0.includes(Q0.image))Q0.needsUpdate=!0},t.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,e);else{let{RGBA:V0,RGBA:Q0,UNSIGNED_BYTE:R0}=J;J.texElementImage2D(J.TEXTURE_2D,0,V0,Q0,R0,e)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(_0.length>0){if(y0&&JJ){let t=zJ(_0[0]);$.texStorage2D(J.TEXTURE_2D,N0,E0,t.width,t.height)}for(let t=0,F0=_0.length;t<F0;t++)if(W0=_0[t],y0){if(h)$.texSubImage2D(J.TEXTURE_2D,t,0,0,M0,P0,W0)}else $.texImage2D(J.TEXTURE_2D,t,E0,M0,P0,W0);z.generateMipmaps=!1}else if(y0){if(JJ){let t=zJ(e);$.texStorage2D(J.TEXTURE_2D,N0,E0,t.width,t.height)}if(h)$.texSubImage2D(J.TEXTURE_2D,0,0,0,M0,P0,e)}else $.texImage2D(J.TEXTURE_2D,0,E0,M0,P0,e);if(E(z))V(s);if(D0.__version=X0.version,z.onUpdate)z.onUpdate(z)}S.__version=z.version}function j0(S,z,f){if(z.image.length!==6)return;let s=i(S,z),$0=z.source;$.bindTexture(J.TEXTURE_CUBE_MAP,S.__webglTexture,J.TEXTURE0+f);let X0=Z.get($0);if($0.version!==X0.__version||s===!0){$.activeTexture(J.TEXTURE0+f);let D0=a0.getPrimaries(a0.workingColorSpace),r=z.colorSpace===$7?null:a0.getPrimaries(z.colorSpace),e=z.colorSpace===$7||D0===r?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,z.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,z.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,e);let M0=z.isCompressedTexture||z.image[0].isCompressedTexture,P0=z.image[0]&&z.image[0].isDataTexture,E0=[];for(let Q0=0;Q0<6;Q0++){if(!M0&&!P0)E0[Q0]=D(z.image[Q0],!0,K.maxCubemapSize);else E0[Q0]=P0?z.image[Q0].image:z.image[Q0];E0[Q0]=t0(z,E0[Q0])}let W0=E0[0],_0=W.convert(z.format,z.colorSpace),y0=W.convert(z.type),JJ=L(z.internalFormat,_0,y0,z.normalized,z.colorSpace),h=z.isVideoTexture!==!0,N0=X0.__version===void 0||s===!0,t=$0.dataReady,F0=P(z,W0);S0(J.TEXTURE_CUBE_MAP,z);let V0;if(M0){if(h&&N0)$.texStorage2D(J.TEXTURE_CUBE_MAP,F0,JJ,W0.width,W0.height);for(let Q0=0;Q0<6;Q0++){V0=E0[Q0].mipmaps;for(let R0=0;R0<V0.length;R0++){let m0=V0[R0];if(z.format!==o9)if(_0!==null)if(h){if(t)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0,0,0,m0.width,m0.height,_0,m0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0,JJ,m0.width,m0.height,0,m0.data);else b0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(h){if(t)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0,0,0,m0.width,m0.height,_0,y0,m0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0,JJ,m0.width,m0.height,0,_0,y0,m0.data)}}}else{if(V0=z.mipmaps,h&&N0){if(V0.length>0)F0++;let Q0=zJ(E0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,F0,JJ,Q0.width,Q0.height)}for(let Q0=0;Q0<6;Q0++)if(P0){if(h){if(t)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,0,0,E0[Q0].width,E0[Q0].height,_0,y0,E0[Q0].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,JJ,E0[Q0].width,E0[Q0].height,0,_0,y0,E0[Q0].data);for(let R0=0;R0<V0.length;R0++){let EJ=V0[R0].image[Q0].image;if(h){if(t)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0+1,0,0,EJ.width,EJ.height,_0,y0,EJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0+1,JJ,EJ.width,EJ.height,0,_0,y0,EJ.data)}}else{if(h){if(t)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,0,0,_0,y0,E0[Q0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,JJ,_0,y0,E0[Q0]);for(let R0=0;R0<V0.length;R0++){let m0=V0[R0];if(h){if(t)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0+1,0,0,_0,y0,m0.image[Q0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,R0+1,JJ,_0,y0,m0.image[Q0])}}}if(E(z))V(J.TEXTURE_CUBE_MAP);if(X0.__version=$0.version,z.onUpdate)z.onUpdate(z)}S.__version=z.version}function w0(S,z,f,s,$0,X0){let D0=W.convert(f.format,f.colorSpace),r=W.convert(f.type),e=L(f.internalFormat,D0,r,f.normalized,f.colorSpace),M0=Z.get(z),P0=Z.get(f);if(P0.__renderTarget=z,!M0.__hasExternalTextures){let E0=Math.max(1,z.width>>X0),W0=Math.max(1,z.height>>X0);if($0===J.TEXTURE_3D||$0===J.TEXTURE_2D_ARRAY)$.texImage3D($0,X0,e,E0,W0,z.depth,0,D0,r,null);else $.texImage2D($0,X0,e,E0,W0,0,D0,r,null)}if($.bindFramebuffer(J.FRAMEBUFFER,S),j(z))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,s,$0,P0.__webglTexture,0,SJ(z));else if($0===J.TEXTURE_2D||$0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&$0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,s,$0,P0.__webglTexture,X0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function kJ(S,z,f){if(J.bindRenderbuffer(J.RENDERBUFFER,S),z.depthBuffer){let s=z.depthTexture,$0=s&&s.isDepthTexture?s.type:null,X0=M(z.stencilBuffer,$0),D0=z.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(z))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,SJ(z),X0,z.width,z.height);else if(f)J.renderbufferStorageMultisample(J.RENDERBUFFER,SJ(z),X0,z.width,z.height);else J.renderbufferStorage(J.RENDERBUFFER,X0,z.width,z.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,D0,J.RENDERBUFFER,S)}else{let s=z.textures;for(let $0=0;$0<s.length;$0++){let X0=s[$0],D0=W.convert(X0.format,X0.colorSpace),r=W.convert(X0.type),e=L(X0.internalFormat,D0,r,X0.normalized,X0.colorSpace);if(j(z))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,SJ(z),e,z.width,z.height);else if(f)J.renderbufferStorageMultisample(J.RENDERBUFFER,SJ(z),e,z.width,z.height);else J.renderbufferStorage(J.RENDERBUFFER,e,z.width,z.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function l0(S,z,f){let s=z.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,S),!(z.depthTexture&&z.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $0=Z.get(z.depthTexture);if($0.__renderTarget=z,!$0.__webglTexture||z.depthTexture.image.width!==z.width||z.depthTexture.image.height!==z.height)z.depthTexture.image.width=z.width,z.depthTexture.image.height=z.height,z.depthTexture.needsUpdate=!0;if(s){if($0.__webglInit===void 0)$0.__webglInit=!0,z.depthTexture.addEventListener("dispose",A);if($0.__webglTexture===void 0){$0.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,$0.__webglTexture),S0(J.TEXTURE_CUBE_MAP,z.depthTexture);let M0=W.convert(z.depthTexture.format),P0=W.convert(z.depthTexture.type),E0;if(z.depthTexture.format===e8)E0=J.DEPTH_COMPONENT24;else if(z.depthTexture.format===J7)E0=J.DEPTH24_STENCIL8;for(let W0=0;W0<6;W0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+W0,0,E0,z.width,z.height,0,M0,P0,null)}}else J0(z.depthTexture,0);let X0=$0.__webglTexture,D0=SJ(z),r=s?J.TEXTURE_CUBE_MAP_POSITIVE_X+f:J.TEXTURE_2D,e=z.depthTexture.format===J7?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(z.depthTexture.format===e8)if(j(z))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,e,r,X0,0,D0);else J.framebufferTexture2D(J.FRAMEBUFFER,e,r,X0,0);else if(z.depthTexture.format===J7)if(j(z))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,e,r,X0,0,D0);else J.framebufferTexture2D(J.FRAMEBUFFER,e,r,X0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function n0(S){let z=Z.get(S),f=S.isWebGLCubeRenderTarget===!0;if(z.__boundDepthTexture!==S.depthTexture){let s=S.depthTexture;if(z.__depthDisposeCallback)z.__depthDisposeCallback();if(s){let $0=()=>{delete z.__boundDepthTexture,delete z.__depthDisposeCallback,s.removeEventListener("dispose",$0)};s.addEventListener("dispose",$0),z.__depthDisposeCallback=$0}z.__boundDepthTexture=s}if(S.depthTexture&&!z.__autoAllocateDepthBuffer)if(f)for(let s=0;s<6;s++)l0(z.__webglFramebuffer[s],S,s);else{let s=S.texture.mipmaps;if(s&&s.length>0)l0(z.__webglFramebuffer[0],S,0);else l0(z.__webglFramebuffer,S,0)}else if(f){z.__webglDepthbuffer=[];for(let s=0;s<6;s++)if($.bindFramebuffer(J.FRAMEBUFFER,z.__webglFramebuffer[s]),z.__webglDepthbuffer[s]===void 0)z.__webglDepthbuffer[s]=J.createRenderbuffer(),kJ(z.__webglDepthbuffer[s],S,!1);else{let $0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,X0=z.__webglDepthbuffer[s];J.bindRenderbuffer(J.RENDERBUFFER,X0),J.framebufferRenderbuffer(J.FRAMEBUFFER,$0,J.RENDERBUFFER,X0)}}else{let s=S.texture.mipmaps;if(s&&s.length>0)$.bindFramebuffer(J.FRAMEBUFFER,z.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,z.__webglFramebuffer);if(z.__webglDepthbuffer===void 0)z.__webglDepthbuffer=J.createRenderbuffer(),kJ(z.__webglDepthbuffer,S,!1);else{let $0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,X0=z.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,X0),J.framebufferRenderbuffer(J.FRAMEBUFFER,$0,J.RENDERBUFFER,X0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function s0(S,z,f){let s=Z.get(S);if(z!==void 0)w0(s.__webglFramebuffer,S,S.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(f!==void 0)n0(S)}function i0(S){let z=S.texture,f=Z.get(S),s=Z.get(z);S.addEventListener("dispose",B);let $0=S.textures,X0=S.isWebGLCubeRenderTarget===!0,D0=$0.length>1;if(!D0){if(s.__webglTexture===void 0)s.__webglTexture=J.createTexture();s.__version=z.version,H.memory.textures++}if(X0){f.__webglFramebuffer=[];for(let r=0;r<6;r++)if(z.mipmaps&&z.mipmaps.length>0){f.__webglFramebuffer[r]=[];for(let e=0;e<z.mipmaps.length;e++)f.__webglFramebuffer[r][e]=J.createFramebuffer()}else f.__webglFramebuffer[r]=J.createFramebuffer()}else{if(z.mipmaps&&z.mipmaps.length>0){f.__webglFramebuffer=[];for(let r=0;r<z.mipmaps.length;r++)f.__webglFramebuffer[r]=J.createFramebuffer()}else f.__webglFramebuffer=J.createFramebuffer();if(D0)for(let r=0,e=$0.length;r<e;r++){let M0=Z.get($0[r]);if(M0.__webglTexture===void 0)M0.__webglTexture=J.createTexture(),H.memory.textures++}if(S.samples>0&&j(S)===!1){f.__webglMultisampledFramebuffer=J.createFramebuffer(),f.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,f.__webglMultisampledFramebuffer);for(let r=0;r<$0.length;r++){let e=$0[r];f.__webglColorRenderbuffer[r]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,f.__webglColorRenderbuffer[r]);let M0=W.convert(e.format,e.colorSpace),P0=W.convert(e.type),E0=L(e.internalFormat,M0,P0,e.normalized,e.colorSpace,S.isXRRenderTarget===!0),W0=SJ(S);J.renderbufferStorageMultisample(J.RENDERBUFFER,W0,E0,S.width,S.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+r,J.RENDERBUFFER,f.__webglColorRenderbuffer[r])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),S.depthBuffer)f.__webglDepthRenderbuffer=J.createRenderbuffer(),kJ(f.__webglDepthRenderbuffer,S,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(X0){$.bindTexture(J.TEXTURE_CUBE_MAP,s.__webglTexture),S0(J.TEXTURE_CUBE_MAP,z);for(let r=0;r<6;r++)if(z.mipmaps&&z.mipmaps.length>0)for(let e=0;e<z.mipmaps.length;e++)w0(f.__webglFramebuffer[r][e],S,z,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+r,e);else w0(f.__webglFramebuffer[r],S,z,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);if(E(z))V(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(D0){for(let r=0,e=$0.length;r<e;r++){let M0=$0[r],P0=Z.get(M0),E0=J.TEXTURE_2D;if(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)E0=S.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(E0,P0.__webglTexture),S0(E0,M0),w0(f.__webglFramebuffer,S,M0,J.COLOR_ATTACHMENT0+r,E0,0),E(M0))V(E0)}$.unbindTexture()}else{let r=J.TEXTURE_2D;if(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)r=S.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(r,s.__webglTexture),S0(r,z),z.mipmaps&&z.mipmaps.length>0)for(let e=0;e<z.mipmaps.length;e++)w0(f.__webglFramebuffer[e],S,z,J.COLOR_ATTACHMENT0,r,e);else w0(f.__webglFramebuffer,S,z,J.COLOR_ATTACHMENT0,r,0);if(E(z))V(r);$.unbindTexture()}if(S.depthBuffer)n0(S)}function jJ(S){let z=S.textures;for(let f=0,s=z.length;f<s;f++){let $0=z[f];if(E($0)){let X0=I(S),D0=Z.get($0).__webglTexture;$.bindTexture(X0,D0),V(X0),$.unbindTexture()}}}let WJ=[],lJ=[];function PJ(S){if(S.samples>0){if(j(S)===!1){let{textures:z,width:f,height:s}=S,$0=J.COLOR_BUFFER_BIT,X0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,D0=Z.get(S),r=z.length>1;if(r)for(let M0=0;M0<z.length;M0++)$.bindFramebuffer(J.FRAMEBUFFER,D0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,D0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,D0.__webglMultisampledFramebuffer);let e=S.texture.mipmaps;if(e&&e.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,D0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,D0.__webglFramebuffer);for(let M0=0;M0<z.length;M0++){if(S.resolveDepthBuffer){if(S.depthBuffer)$0|=J.DEPTH_BUFFER_BIT;if(S.stencilBuffer&&S.resolveStencilBuffer)$0|=J.STENCIL_BUFFER_BIT}if(r){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,D0.__webglColorRenderbuffer[M0]);let P0=Z.get(z[M0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,P0,0)}if(J.blitFramebuffer(0,0,f,s,0,0,f,s,$0,J.NEAREST),X===!0){if(WJ.length=0,lJ.length=0,WJ.push(J.COLOR_ATTACHMENT0+M0),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1)WJ.push(X0),lJ.push(X0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,lJ);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,WJ)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),r)for(let M0=0;M0<z.length;M0++){$.bindFramebuffer(J.FRAMEBUFFER,D0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.RENDERBUFFER,D0.__webglColorRenderbuffer[M0]);let P0=Z.get(z[M0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,D0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.TEXTURE_2D,P0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,D0.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&X){let z=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[z])}}}function SJ(S){return Math.min(K.maxSamples,S.samples)}function j(S){let z=Z.get(S);return S.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&z.__useRenderToTexture!==!1}function DJ(S){let z=H.render.frame;if(G.get(S)!==z)G.set(S,z),S.update()}function t0(S,z){let{colorSpace:f,format:s,type:$0}=S;if(S.isCompressedTexture===!0||S.isVideoTexture===!0)return z;if(f!==X6&&f!==$7)if(a0.getTransfer(f)===qJ){if(s!==o9||$0!==d9)b0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else x0("WebGLTextures: Unsupported texture color space:",f);return z}function zJ(S){if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement)U.width=S.naturalWidth||S.width,U.height=S.naturalHeight||S.height;else if(typeof VideoFrame<"u"&&S instanceof VideoFrame)U.width=S.displayWidth,U.height=S.displayHeight;else U.width=S.width,U.height=S.height;return U}this.allocateTextureUnit=o,this.resetTextureUnits=c,this.getTextureUnits=_,this.setTextureUnits=p,this.setTexture2D=J0,this.setTexture2DArray=m,this.setTexture3D=l,this.setTextureCube=a,this.rebindTextures=s0,this.setupRenderTarget=i0,this.updateRenderTargetMipmap=jJ,this.updateMultisampleRenderTarget=PJ,this.setupDepthRenderbuffer=n0,this.setupFrameBufferTexture=w0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function fF(J,Q){function $(Z,K=$7){let W,H=a0.getTransfer(K);if(Z===d9)return J.UNSIGNED_BYTE;if(Z===AK)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===PK)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===wY)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===TY)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===PY)return J.BYTE;if(Z===SY)return J.SHORT;if(Z===jQ)return J.UNSIGNED_SHORT;if(Z===CK)return J.INT;if(Z===j8)return J.UNSIGNED_INT;if(Z===D8)return J.FLOAT;if(Z===i9)return J.HALF_FLOAT;if(Z===_Y)return J.ALPHA;if(Z===jY)return J.RGB;if(Z===o9)return J.RGBA;if(Z===e8)return J.DEPTH_COMPONENT;if(Z===J7)return J.DEPTH_STENCIL;if(Z===bY)return J.RED;if(Z===SK)return J.RED_INTEGER;if(Z===Q7)return J.RG;if(Z===wK)return J.RG_INTEGER;if(Z===TK)return J.RGBA_INTEGER;if(Z===l$||Z===c$||Z===s$||Z===n$)if(H===qJ)if(W=Q.get("WEBGL_compressed_texture_s3tc_srgb"),W!==null){if(Z===l$)return W.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===c$)return W.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===s$)return W.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===n$)return W.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(W=Q.get("WEBGL_compressed_texture_s3tc"),W!==null){if(Z===l$)return W.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===c$)return W.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===s$)return W.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===n$)return W.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===_K||Z===jK||Z===bK||Z===yK)if(W=Q.get("WEBGL_compressed_texture_pvrtc"),W!==null){if(Z===_K)return W.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===jK)return W.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===bK)return W.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===yK)return W.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===fK||Z===xK||Z===hK||Z===vK||Z===gK||Z===i$||Z===mK)if(W=Q.get("WEBGL_compressed_texture_etc"),W!==null){if(Z===fK||Z===xK)return H===qJ?W.COMPRESSED_SRGB8_ETC2:W.COMPRESSED_RGB8_ETC2;if(Z===hK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:W.COMPRESSED_RGBA8_ETC2_EAC;if(Z===vK)return W.COMPRESSED_R11_EAC;if(Z===gK)return W.COMPRESSED_SIGNED_R11_EAC;if(Z===i$)return W.COMPRESSED_RG11_EAC;if(Z===mK)return W.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===pK||Z===dK||Z===uK||Z===lK||Z===cK||Z===sK||Z===nK||Z===iK||Z===oK||Z===aK||Z===rK||Z===tK||Z===eK||Z===J6)if(W=Q.get("WEBGL_compressed_texture_astc"),W!==null){if(Z===pK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:W.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===dK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:W.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===uK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:W.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===lK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:W.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===cK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:W.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===sK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:W.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===nK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:W.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===iK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:W.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===oK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:W.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===aK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:W.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===rK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:W.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===tK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:W.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===eK)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:W.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===J6)return H===qJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:W.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===Q6||Z===$6||Z===Z6)if(W=Q.get("EXT_texture_compression_bptc"),W!==null){if(Z===Q6)return H===qJ?W.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:W.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===$6)return W.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===Z6)return W.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===K6||Z===W6||Z===o$||Z===H6)if(W=Q.get("EXT_texture_compression_rgtc"),W!==null){if(Z===K6)return W.COMPRESSED_RED_RGTC1_EXT;if(Z===W6)return W.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===o$)return W.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===H6)return W.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===o7)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var xF=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hF=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class bX{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new HZ(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new j9({vertexShader:xF,fragmentShader:hF,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new v(new _9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yX extends a9{constructor(J,Q){super();let $=this,Z=null,K=1,W=null,H="local-floor",Y=1,X=null,U=null,G=null,N=null,q=null,F=null,R=typeof XRWebGLBinding<"u",O=new bX,D={},E=Q.getContextAttributes(),V=null,I=null,L=[],M=[],P=new G0,A=null,B=null,k=new cJ;k.viewport=new BJ;let b=new cJ;b.viewport=new BJ;let T=[k,b],y=new u6,c=null,_=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let K0=L[i];if(K0===void 0)K0=new xQ,L[i]=K0;return K0.getTargetRaySpace()},this.getControllerGrip=function(i){let K0=L[i];if(K0===void 0)K0=new xQ,L[i]=K0;return K0.getGripSpace()},this.getHand=function(i){let K0=L[i];if(K0===void 0)K0=new xQ,L[i]=K0;return K0.getHandSpace()};function p(i){let K0=M.indexOf(i.inputSource);if(K0===-1)return;let Z0=L[K0];if(Z0!==void 0)Z0.update(i.inputSource,i.frame,X||W),Z0.dispatchEvent({type:i.type,data:i.inputSource})}function o(){Z.removeEventListener("select",p),Z.removeEventListener("selectstart",p),Z.removeEventListener("selectend",p),Z.removeEventListener("squeeze",p),Z.removeEventListener("squeezestart",p),Z.removeEventListener("squeezeend",p),Z.removeEventListener("end",o),Z.removeEventListener("inputsourceschange",g);for(let i=0;i<L.length;i++){let K0=M[i];if(K0===null)continue;M[i]=null,L[i].disconnect(K0)}c=null,_=null,O.reset();for(let i in D)delete D[i];if(J.setRenderTarget(V),q=null,N=null,G=null,Z=null,I=null,S0.stop(),$.isPresenting=!1,J.setPixelRatio(A),J.setSize(P.width,P.height,!1),B!==null){let i=B.camera;i.fov=B.fov,i.zoom=B.zoom,i.updateProjectionMatrix(),B=null}$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(K=i,$.isPresenting===!0)b0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if(H=i,$.isPresenting===!0)b0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||W},this.setReferenceSpace=function(i){X=i},this.getBaseLayer=function(){return N!==null?N:q},this.getBinding=function(){if(G===null&&R)G=new XRWebGLBinding(Z,Q);return G},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(i){if(Z=i,Z!==null){if(V=J.getRenderTarget(),Z.addEventListener("select",p),Z.addEventListener("selectstart",p),Z.addEventListener("selectend",p),Z.addEventListener("squeeze",p),Z.addEventListener("squeezestart",p),Z.addEventListener("squeezeend",p),Z.addEventListener("end",o),Z.addEventListener("inputsourceschange",g),E.xrCompatible!==!0)await Q.makeXRCompatible();if(A=J.getPixelRatio(),J.getSize(P),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let Z0={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:K};q=new XRWebGLLayer(Z,Q,Z0),Z.updateRenderState({baseLayer:q}),J.setPixelRatio(1),J.setSize(q.framebufferWidth,q.framebufferHeight,!1),I=new k9(q.framebufferWidth,q.framebufferHeight,{format:o9,type:d9,colorSpace:J.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1,storeMultisampledDepthBuffer:q.ignoreDepthValues===!1,storeMultisampledStencilBuffer:q.ignoreDepthValues===!1})}else{let Z0=null,T0=null,j0=null;if(E.depth)j0=E.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,Z0=E.stencil?J7:e8,T0=E.stencil?o7:j8;let w0={colorFormat:Q.RGBA8,depthFormat:j0,scaleFactor:K};G=this.getBinding(),N=G.createProjectionLayer(w0),Z.updateRenderState({layers:[N]}),J.setPixelRatio(1),J.setSize(N.textureWidth,N.textureHeight,!1),I=new k9(N.textureWidth,N.textureHeight,{format:o9,type:d9,depthTexture:new W7(N.textureWidth,N.textureHeight,T0,void 0,void 0,void 0,void 0,void 0,void 0,Z0),stencilBuffer:E.stencil,colorSpace:J.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1,storeMultisampledDepthBuffer:N.ignoreDepthValues===!1,storeMultisampledStencilBuffer:N.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(Y),X=null,W=await Z.requestReferenceSpace(H),S0.setContext(Z),S0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return O.getDepthTexture()};function g(i){for(let K0=0;K0<i.removed.length;K0++){let Z0=i.removed[K0],T0=M.indexOf(Z0);if(T0>=0)M[T0]=null,L[T0].disconnect(Z0)}for(let K0=0;K0<i.added.length;K0++){let Z0=i.added[K0],T0=M.indexOf(Z0);if(T0===-1){for(let w0=0;w0<L.length;w0++)if(w0>=M.length){M.push(Z0),T0=w0;break}else if(M[w0]===null){M[w0]=Z0,T0=w0;break}if(T0===-1)break}let j0=L[T0];if(j0)j0.connect(Z0)}}let J0=new w,m=new w;function l(i,K0,Z0){J0.setFromMatrixPosition(K0.matrixWorld),m.setFromMatrixPosition(Z0.matrixWorld);let T0=J0.distanceTo(m),j0=K0.projectionMatrix.elements,w0=Z0.projectionMatrix.elements,kJ=j0[14]/(j0[10]-1),l0=j0[14]/(j0[10]+1),n0=(j0[9]+1)/j0[5],s0=(j0[9]-1)/j0[5],i0=(j0[8]-1)/j0[0],jJ=(w0[8]+1)/w0[0],WJ=kJ*i0,lJ=kJ*jJ,PJ=T0/(-i0+jJ),SJ=PJ*-i0;if(K0.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(SJ),i.translateZ(PJ),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),j0[10]===-1)i.projectionMatrix.copy(K0.projectionMatrix),i.projectionMatrixInverse.copy(K0.projectionMatrixInverse);else{let j=kJ+PJ,DJ=l0+PJ,t0=WJ-SJ,zJ=lJ+(T0-SJ),S=n0*l0/DJ*j,z=s0*l0/DJ*j;i.projectionMatrix.makePerspective(t0,zJ,S,z,j,DJ),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function a(i,K0){if(K0===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices(K0.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(Z===null)return;let{near:K0,far:Z0}=i;if(O.texture!==null){if(O.depthNear>0)K0=O.depthNear;if(O.depthFar>0)Z0=O.depthFar}if(y.near=b.near=k.near=K0,y.far=b.far=k.far=Z0,c!==y.near||_!==y.far)Z.updateRenderState({depthNear:y.near,depthFar:y.far}),c=y.near,_=y.far;y.layers.mask=i.layers.mask|6,k.layers.mask=y.layers.mask&-5,b.layers.mask=y.layers.mask&-3;let T0=i.parent,j0=y.cameras;a(y,T0);for(let w0=0;w0<j0.length;w0++)a(j0[w0],T0);if(j0.length===2)l(y,k,b);else y.projectionMatrix.copy(k.projectionMatrix);if(B===null&&i.isPerspectiveCamera)B={camera:i,fov:i.fov,zoom:i.zoom};U0(i,y,T0)};function U0(i,K0,Z0){if(Z0===null)i.matrix.copy(K0.matrixWorld);else i.matrix.copy(Z0.matrixWorld),i.matrix.invert(),i.matrix.multiply(K0.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy(K0.projectionMatrix),i.projectionMatrixInverse.copy(K0.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=o8*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return y},this.getFoveation=function(){if(N===null&&q===null)return;return Y},this.setFoveation=function(i){if(Y=i,N!==null)N.fixedFoveation=i;if(q!==null&&q.fixedFoveation!==void 0)q.fixedFoveation=i},this.hasDepthSensing=function(){return O.texture!==null},this.getDepthSensingMesh=function(){return O.getMesh(y)},this.getCameraTexture=function(i){return D[i]};let q0=null;function f0(i,K0){if(U=K0.getViewerPose(X||W),F=K0,U!==null){let Z0=U.views;if(q!==null)J.setRenderTargetFramebuffer(I,q.framebuffer),J.setRenderTarget(I);let T0=!1;if(Z0.length!==y.cameras.length)y.cameras.length=0,T0=!0;for(let l0=0;l0<Z0.length;l0++){let n0=Z0[l0],s0=null;if(q!==null)s0=q.getViewport(n0);else{let jJ=G.getViewSubImage(N,n0);if(s0=jJ.viewport,l0===0)J.setRenderTargetTextures(I,jJ.colorTexture,jJ.depthStencilTexture),J.setRenderTarget(I)}let i0=T[l0];if(i0===void 0)i0=new cJ,i0.layers.enable(l0),i0.viewport=new BJ,T[l0]=i0;if(i0.matrix.fromArray(n0.transform.matrix),i0.matrix.decompose(i0.position,i0.quaternion,i0.scale),i0.projectionMatrix.fromArray(n0.projectionMatrix),i0.projectionMatrixInverse.copy(i0.projectionMatrix).invert(),i0.viewport.set(s0.x,s0.y,s0.width,s0.height),l0===0)y.matrix.copy(i0.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale);if(T0===!0)y.cameras.push(i0)}let j0=Z.enabledFeatures;if(j0&&j0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&R){G=$.getBinding();let l0=G.getDepthInformation(Z0[0]);if(l0&&l0.isValid&&l0.texture)O.init(l0,Z.renderState)}if(j0&&j0.includes("camera-access")&&R){J.state.unbindTexture(),G=$.getBinding();for(let l0=0;l0<Z0.length;l0++){let n0=Z0[l0].camera;if(n0){let s0=D[n0];if(!s0)s0=new HZ,D[n0]=s0;let i0=G.getCameraImage(n0);s0.sourceTexture=i0}}}}for(let Z0=0;Z0<L.length;Z0++){let T0=M[Z0],j0=L[Z0];if(T0!==null&&j0!==void 0)j0.update(T0,K0,X||W)}if(q0)q0(i,K0);if(K0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:K0});F=null}let S0=new kX;S0.setAnimationLoop(f0),this.setAnimationLoop=function(i){q0=i},this.dispose=function(){}}}var vF=new QJ,fX=new g0;fX.set(-1,0,0,0,1,0,0,0,1);function gF(J,Q){function $(D,E){if(D.matrixAutoUpdate===!0)D.updateMatrix();E.value.copy(D.matrix)}function Z(D,E){if(E.color.getRGB(D.fogColor.value,S6(J)),E.isFog)D.fogNear.value=E.near,D.fogFar.value=E.far;else if(E.isFogExp2)D.fogDensity.value=E.density}function K(D,E,V,I,L){if(E.isNodeMaterial)E.uniformsNeedUpdate=!1;else if(E.isMeshBasicMaterial)W(D,E);else if(E.isMeshLambertMaterial){if(W(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshToonMaterial)W(D,E),N(D,E);else if(E.isMeshPhongMaterial){if(W(D,E),G(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshStandardMaterial){if(W(D,E),q(D,E),E.isMeshPhysicalMaterial)F(D,E,L)}else if(E.isMeshMatcapMaterial)W(D,E),R(D,E);else if(E.isMeshDepthMaterial)W(D,E);else if(E.isMeshDistanceMaterial)W(D,E),O(D,E);else if(E.isMeshNormalMaterial)W(D,E);else if(E.isLineBasicMaterial){if(H(D,E),E.isLineDashedMaterial)Y(D,E)}else if(E.isPointsMaterial)X(D,E,V,I);else if(E.isSpriteMaterial)U(D,E);else if(E.isShadowMaterial)D.color.value.copy(E.color),D.opacity.value=E.opacity;else if(E.isShaderMaterial)E.uniformsNeedUpdate=!1}function W(D,E){if(D.opacity.value=E.opacity,E.color)D.diffuse.value.copy(E.color);if(E.emissive)D.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity);if(E.map)D.map.value=E.map,$(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.bumpMap){if(D.bumpMap.value=E.bumpMap,$(E.bumpMap,D.bumpMapTransform),D.bumpScale.value=E.bumpScale,E.side===U9)D.bumpScale.value*=-1}if(E.normalMap){if(D.normalMap.value=E.normalMap,$(E.normalMap,D.normalMapTransform),D.normalScale.value.copy(E.normalScale),E.side===U9)D.normalScale.value.negate()}if(E.displacementMap)D.displacementMap.value=E.displacementMap,$(E.displacementMap,D.displacementMapTransform),D.displacementScale.value=E.displacementScale,D.displacementBias.value=E.displacementBias;if(E.emissiveMap)D.emissiveMap.value=E.emissiveMap,$(E.emissiveMap,D.emissiveMapTransform);if(E.specularMap)D.specularMap.value=E.specularMap,$(E.specularMap,D.specularMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest;let V=Q.get(E),I=V.envMap,L=V.envMapRotation;if(I){if(D.envMap.value=I,D.envMapRotation.value.setFromMatrix4(vF.makeRotationFromEuler(L)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(fX);D.reflectivity.value=E.reflectivity,D.ior.value=E.ior,D.refractionRatio.value=E.refractionRatio}if(E.lightMap)D.lightMap.value=E.lightMap,D.lightMapIntensity.value=E.lightMapIntensity,$(E.lightMap,D.lightMapTransform);if(E.aoMap)D.aoMap.value=E.aoMap,D.aoMapIntensity.value=E.aoMapIntensity,$(E.aoMap,D.aoMapTransform)}function H(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,E.map)D.map.value=E.map,$(E.map,D.mapTransform)}function Y(D,E){D.dashSize.value=E.dashSize,D.totalSize.value=E.dashSize+E.gapSize,D.scale.value=E.scale}function X(D,E,V,I){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.size.value=E.size*V,D.scale.value=I*0.5,E.map)D.map.value=E.map,$(E.map,D.uvTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function U(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.rotation.value=E.rotation,E.map)D.map.value=E.map,$(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function G(D,E){D.specular.value.copy(E.specular),D.shininess.value=Math.max(E.shininess,0.0001)}function N(D,E){if(E.gradientMap)D.gradientMap.value=E.gradientMap}function q(D,E){if(D.metalness.value=E.metalness,E.metalnessMap)D.metalnessMap.value=E.metalnessMap,$(E.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=E.roughness,E.roughnessMap)D.roughnessMap.value=E.roughnessMap,$(E.roughnessMap,D.roughnessMapTransform);if(E.envMap)D.envMapIntensity.value=E.envMapIntensity}function F(D,E,V){if(D.ior.value=E.ior,E.sheen>0){if(D.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),D.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap)D.sheenColorMap.value=E.sheenColorMap,$(E.sheenColorMap,D.sheenColorMapTransform);if(E.sheenRoughnessMap)D.sheenRoughnessMap.value=E.sheenRoughnessMap,$(E.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(E.clearcoat>0){if(D.clearcoat.value=E.clearcoat,D.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap)D.clearcoatMap.value=E.clearcoatMap,$(E.clearcoatMap,D.clearcoatMapTransform);if(E.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,$(E.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(E.clearcoatNormalMap){if(D.clearcoatNormalMap.value=E.clearcoatNormalMap,$(E.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===U9)D.clearcoatNormalScale.value.negate()}}if(E.dispersion>0)D.dispersion.value=E.dispersion;if(E.retroreflectivity>0)D.retroreflectivity.value=E.retroreflectivity;if(E.iridescence>0){if(D.iridescence.value=E.iridescence,D.iridescenceIOR.value=E.iridescenceIOR,D.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap)D.iridescenceMap.value=E.iridescenceMap,$(E.iridescenceMap,D.iridescenceMapTransform);if(E.iridescenceThicknessMap)D.iridescenceThicknessMap.value=E.iridescenceThicknessMap,$(E.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(E.transmission>0){if(D.transmission.value=E.transmission,D.transmissionSamplerMap.value=V.texture,D.transmissionSamplerSize.value.set(V.width,V.height),E.transmissionMap)D.transmissionMap.value=E.transmissionMap,$(E.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=E.thickness,E.thicknessMap)D.thicknessMap.value=E.thicknessMap,$(E.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=E.attenuationDistance,D.attenuationColor.value.copy(E.attenuationColor)}if(E.anisotropy>0){if(D.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap)D.anisotropyMap.value=E.anisotropyMap,$(E.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=E.specularIntensity,D.specularColor.value.copy(E.specularColor),E.specularColorMap)D.specularColorMap.value=E.specularColorMap,$(E.specularColorMap,D.specularColorMapTransform);if(E.specularIntensityMap)D.specularIntensityMap.value=E.specularIntensityMap,$(E.specularIntensityMap,D.specularIntensityMapTransform)}function R(D,E){if(E.matcap)D.matcap.value=E.matcap}function O(D,E){let V=Q.get(E).light;D.referencePosition.value.setFromMatrixPosition(V.matrixWorld),D.nearDistance.value=V.shadow.camera.near,D.farDistance.value=V.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function mF(J,Q,$,Z){let K={},W={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(L,M){let P=M.program;Z.uniformBlockBinding(L,P)}function U(L,M){let P=K[L.id];if(P===void 0)D(L),P=G(L),K[L.id]=P,L.addEventListener("dispose",V);let A=M.program;Z.updateUBOMapping(L,A);let B=Q.render.frame;if(W[L.id]!==B)q(L),W[L.id]=B}function G(L){let M=N();L.__bindingPointIndex=M;let P=J.createBuffer(),A=L.__size,B=L.usage;return J.bindBuffer(J.UNIFORM_BUFFER,P),J.bufferData(J.UNIFORM_BUFFER,A,B),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,M,P),P}function N(){for(let L=0;L<Y;L++)if(H.indexOf(L)===-1)return H.push(L),L;return x0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function q(L){let M=K[L.id],P=L.uniforms,A=L.__cache;J.bindBuffer(J.UNIFORM_BUFFER,M);for(let B=0,k=P.length;B<k;B++){let b=P[B];if(Array.isArray(b))for(let T=0,y=b.length;T<y;T++)F(b[T],B,T,A);else F(b,B,0,A)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(L,M,P,A){if(O(L,M,P,A)===!0){let{__offset:B,value:k}=L;if(Array.isArray(k)){let b=0;for(let T=0;T<k.length;T++){let y=k[T],c=E(y);if(R(y,L.__data,b),typeof y!=="number"&&typeof y!=="boolean"&&!y.isMatrix3&&!ArrayBuffer.isView(y))b+=c.storage/Float32Array.BYTES_PER_ELEMENT}}else R(k,L.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,B,L.__data)}}function R(L,M,P){if(typeof L==="number"||typeof L==="boolean")M[0]=L;else if(L.isMatrix3)M[0]=L.elements[0],M[1]=L.elements[1],M[2]=L.elements[2],M[3]=0,M[4]=L.elements[3],M[5]=L.elements[4],M[6]=L.elements[5],M[7]=0,M[8]=L.elements[6],M[9]=L.elements[7],M[10]=L.elements[8],M[11]=0;else if(ArrayBuffer.isView(L))M.set(new L.constructor(L.buffer,L.byteOffset,M.length));else L.toArray(M,P)}function O(L,M,P,A){let B=L.value,k=M+"_"+P;if(A[k]===void 0){if(typeof B==="number"||typeof B==="boolean")A[k]=B;else if(ArrayBuffer.isView(B))A[k]=B.slice();else A[k]=B.clone();return!0}else{let b=A[k];if(typeof B==="number"||typeof B==="boolean"){if(b!==B)return A[k]=B,!0}else if(ArrayBuffer.isView(B))return!0;else if(b.equals(B)===!1)return b.copy(B),!0}return!1}function D(L){let M=L.uniforms,P=0,A=16;for(let k=0,b=M.length;k<b;k++){let T=Array.isArray(M[k])?M[k]:[M[k]];for(let y=0,c=T.length;y<c;y++){let _=T[y],p=Array.isArray(_.value)?_.value:[_.value];for(let o=0,g=p.length;o<g;o++){let J0=p[o],m=E(J0),l=P%A,a=l%m.boundary,U0=l+a;if(P+=a,U0!==0&&A-U0<m.storage)P+=A-U0;_.__data=new Float32Array(m.storage/Float32Array.BYTES_PER_ELEMENT),_.__offset=P,P+=m.storage}}}let B=P%A;if(B>0)P+=A-B;return L.__size=P,L.__cache={},this}function E(L){let M={boundary:0,storage:0};if(typeof L==="number"||typeof L==="boolean")M.boundary=4,M.storage=4;else if(L.isVector2)M.boundary=8,M.storage=8;else if(L.isVector3||L.isColor)M.boundary=16,M.storage=12;else if(L.isVector4)M.boundary=16,M.storage=16;else if(L.isMatrix3)M.boundary=48,M.storage=48;else if(L.isMatrix4)M.boundary=64,M.storage=64;else if(L.isTexture)b0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(L))M.boundary=16,M.storage=L.byteLength;else b0("WebGLRenderer: Unsupported uniform value type.",L);return M}function V(L){let M=L.target;M.removeEventListener("dispose",V);let P=H.indexOf(M.__bindingPointIndex);H.splice(P,1),J.deleteBuffer(K[M.id]),delete K[M.id],delete W[M.id]}function I(){for(let L in K)J.deleteBuffer(K[L]);H=[],K={},W={}}return{bind:X,update:U,dispose:I}}var pF=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),e9=null;function dF(){if(e9===null)e9=new R6(pF,16,16,Q7,i9),e9.name="DFG_LUT",e9.minFilter=G9,e9.magFilter=G9,e9.wrapS=d$,e9.wrapT=d$,e9.generateMipmaps=!1,e9.needsUpdate=!0;return e9}class KW{constructor(J={}){let{canvas:Q=dY(),context:$=null,depth:Z=!0,stencil:K=!1,alpha:W=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:G=!1,reversedDepthBuffer:N=!1,outputBufferType:q=d9}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=W;let R=q,O=new Set([TK,wK,SK]),D=new Set([d9,j8,jQ,o7,AK,PK]),E=new Uint32Array(4),V=new Int32Array(4),I=new w,L=null,M=null,P=[],A=[],B=null;this.domElement=Q,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=p9,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,b=!1,T=null,y=null,c=null,_=null;this._outputColorSpace=fY;let p=0,o=0,g=null,J0=-1,m=null,l=new BJ,a=new BJ,U0=null,q0=new c0(0),f0=0,S0=Q.width,i=Q.height,K0=1,Z0=null,T0=null,j0=new BJ(0,0,S0,i),w0=new BJ(0,0,S0,i),kJ=!1,l0=new vQ,n0=!1,s0=!1,i0=new QJ,jJ=new w,WJ=new BJ,lJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},PJ=!1;function SJ(){return g===null?K0:1}let j=$;function DJ(C,x){return Q.getContext(C,x)}let t0,zJ,S,z,f,s,$0,X0,D0,r,e,M0,P0,E0,W0,_0,y0,JJ,h,N0,t,F0,V0;try{let C={alpha:!0,depth:Z,stencil:K,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:G};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${sH}`);if(Q.addEventListener("webglcontextlost",m0,!1),Q.addEventListener("webglcontextrestored",EJ,!1),Q.addEventListener("webglcontextcreationerror",ZJ,!1),j===null){if(j=DJ("webgl2",C),j===null)if(DJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}Q0()}catch(C){throw Q.removeEventListener("webglcontextlost",m0,!1),Q.removeEventListener("webglcontextrestored",EJ,!1),Q.removeEventListener("webglcontextcreationerror",ZJ,!1),x0("WebGLRenderer: "+C.message),C}function Q0(){if(t0=new o1(j),t0.init(),t=new fF(j,t0),zJ=new g1(j,t0,J,t),S=new bF(j,t0),zJ.reversedDepthBuffer&&N)S.buffers.depth.setReversed(!0);y=j.createFramebuffer(),c=j.createFramebuffer(),_=j.createFramebuffer(),z=new t1(j),f=new BF,s=new yF(j,t0,S,f,zJ,t,z),$0=new i1(k),X0=new JG(j),F0=new h1(j,X0),D0=new a1(j,X0,z,F0),r=new JN(j,D0,X0,F0,z),JJ=new e1(j,zJ,s),W0=new m1(f),e=new LF(k,$0,t0,zJ,F0,W0),M0=new gF(k,f),P0=new VF,E0=new PF(t0),y0=new x1(k,$0,S,r,F,Y),_0=new jF(k,r,zJ),V0=new mF(j,z,zJ,S),h=new v1(j,t0,z),N0=new r1(j,t0,z),z.programs=e.programs,k.capabilities=zJ,k.extensions=t0,k.properties=f,k.renderLists=P0,k.shadowMap=_0,k.state=S,k.info=z}if(R!==d9)B=new $N(R,Q.width,Q.height,H,Z,K);let R0=new yX(k,j);this.xr=R0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let C=t0.get("WEBGL_lose_context");if(C)C.loseContext()},this.forceContextRestore=function(){let C=t0.get("WEBGL_lose_context");if(C)C.restoreContext()},this.getPixelRatio=function(){return K0},this.setPixelRatio=function(C){if(C===void 0)return;K0=C,this.setSize(S0,i,!1)},this.getSize=function(C){return C.set(S0,i)},this.setSize=function(C,x,n=!0){if(R0.isPresenting){b0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(S0=C,i=x,Q.width=Math.floor(C*K0),Q.height=Math.floor(x*K0),n===!0)Q.style.width=C+"px",Q.style.height=x+"px";if(B!==null)B.setSize(Q.width,Q.height);this.setViewport(0,0,C,x)},this.getDrawingBufferSize=function(C){return C.set(S0*K0,i*K0).floor()},this.setDrawingBufferSize=function(C,x,n){S0=C,i=x,K0=n,Q.width=Math.floor(C*n),Q.height=Math.floor(x*n),this.setViewport(0,0,C,x)},this.setEffects=function(C){if(R===d9){x0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let x=0;x<C.length;x++)if(C[x].isOutputPass===!0){b0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(l)},this.getViewport=function(C){return C.copy(j0)},this.setViewport=function(C,x,n,d){if(C.isVector4)j0.set(C.x,C.y,C.z,C.w);else j0.set(C,x,n,d);S.viewport(l.copy(j0).multiplyScalar(K0).round())},this.getScissor=function(C){return C.copy(w0)},this.setScissor=function(C,x,n,d){if(C.isVector4)w0.set(C.x,C.y,C.z,C.w);else w0.set(C,x,n,d);S.scissor(a.copy(w0).multiplyScalar(K0).round())},this.getScissorTest=function(){return kJ},this.setScissorTest=function(C){S.setScissorTest(kJ=C)},this.setOpaqueSort=function(C){Z0=C},this.setTransparentSort=function(C){T0=C},this.getClearColor=function(C){return C.copy(y0.getClearColor())},this.setClearColor=function(){y0.setClearColor(...arguments)},this.getClearAlpha=function(){return y0.getClearAlpha()},this.setClearAlpha=function(){y0.setClearAlpha(...arguments)},this.clear=function(C=!0,x=!0,n=!0){let d=0;if(C){let u=!1;if(g!==null){let B0=g.texture.format;u=O.has(B0)}if(u){let B0=g.texture.type,z0=D.has(B0),L0=y0.getClearColor(),I0=y0.getClearAlpha(),A0=L0.r,p0=L0.g,o0=L0.b;if(z0)E[0]=A0,E[1]=p0,E[2]=o0,E[3]=I0,j.clearBufferuiv(j.COLOR,0,E);else V[0]=A0,V[1]=p0,V[2]=o0,V[3]=I0,j.clearBufferiv(j.COLOR,0,V)}else d|=j.COLOR_BUFFER_BIT}if(x)d|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(n)d|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(d!==0)j.clear(d)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),T=C},this.dispose=function(){Q.removeEventListener("webglcontextlost",m0,!1),Q.removeEventListener("webglcontextrestored",EJ,!1),Q.removeEventListener("webglcontextcreationerror",ZJ,!1),y0.dispose(),P0.dispose(),E0.dispose(),f.dispose(),$0.dispose(),r.dispose(),F0.dispose(),V0.dispose(),e.dispose(),R0.dispose(),R0.removeEventListener("sessionstart",$H),R0.removeEventListener("sessionend",ZH),u8.stop()};function m0(C){C.preventDefault(),CQ("WebGLRenderer: Context Lost."),b=!0}function EJ(){CQ("WebGLRenderer: Context Restored."),b=!1;let C=z.autoReset,x=_0.enabled,n=_0.autoUpdate,d=_0.needsUpdate,u=_0.type;Q0(),z.autoReset=C,_0.enabled=x,_0.autoUpdate=n,_0.needsUpdate=d,_0.type=u}function ZJ(C){x0("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function l9(C){let x=C.target;x.removeEventListener("dispose",l9),W8(x)}function W8(C){lU(C),f.remove(C)}function lU(C){let x=f.get(C).programs;if(x!==void 0){if(x.forEach(function(n){e.releaseProgram(n)}),C.isShaderMaterial)e.releaseShaderCache(C)}}this.renderBufferDirect=function(C,x,n,d,u,B0){if(x===null)x=lJ;let z0=u.isMesh&&u.matrixWorld.determinantAffine()<0,L0=nU(C,x,n,d,u);S.setMaterial(d,z0);let I0=n.index,A0=1;if(d.wireframe===!0){if(I0=D0.getWireframeAttribute(n),I0===void 0)return;A0=2}let p0=n.drawRange,o0=n.attributes.position,C0=p0.start*A0,KJ=(p0.start+p0.count)*A0;if(B0!==null)C0=Math.max(C0,B0.start*A0),KJ=Math.min(KJ,(B0.start+B0.count)*A0);if(I0!==null)C0=Math.max(C0,0),KJ=Math.min(KJ,I0.count);else if(o0!==void 0&&o0!==null)C0=Math.max(C0,0),KJ=Math.min(KJ,o0.count);let fJ=KJ-C0;if(fJ<0||fJ===1/0)return;F0.setup(u,d,L0,n,I0);let RJ,GJ=h;if(I0!==null)RJ=X0.get(I0),GJ=N0,GJ.setIndex(RJ);if(u.isMesh)if(d.wireframe===!0)S.setLineWidth(d.wireframeLinewidth*SJ()),GJ.setMode(j.LINES);else GJ.setMode(j.TRIANGLES);else if(u.isLine){let oJ=d.linewidth;if(oJ===void 0)oJ=1;if(S.setLineWidth(oJ*SJ()),u.isLineSegments)GJ.setMode(j.LINES);else if(u.isLineLoop)GJ.setMode(j.LINE_LOOP);else GJ.setMode(j.LINE_STRIP)}else if(u.isPoints)GJ.setMode(j.POINTS);else if(u.isSprite)GJ.setMode(j.TRIANGLES);if(u.isBatchedMesh)if(!t0.get("WEBGL_multi_draw")){let{_multiDrawStarts:oJ,_multiDrawCounts:k0,_multiDrawCount:K9}=u,e0=I0?X0.get(I0).bytesPerElement:1,A9=f.get(d).currentProgram.getUniforms();for(let c9=0;c9<K9;c9++)A9.setValue(j,"_gl_DrawID",c9),GJ.render(oJ[c9]/e0,k0[c9])}else GJ.renderMultiDraw(u._multiDrawStarts,u._multiDrawCounts,u._multiDrawCount);else if(u.isInstancedMesh)GJ.renderInstances(C0,fJ,u.count);else if(n.isInstancedBufferGeometry){let oJ=n._maxInstanceCount!==void 0?n._maxInstanceCount:1/0,k0=Math.min(n.instanceCount,oJ);GJ.renderInstances(C0,fJ,k0)}else GJ.render(C0,fJ)};function QH(C,x,n,d){if(T!==null&&C.isNodeMaterial)T.setObject(d,C);if(n0===!0)W0.setState(C,n,!1);if(C.transparent===!0&&C.side===tJ&&C.forceSinglePass===!1)C.side=U9,C.needsUpdate=!0,G$(C,x,d),C.side=s7,C.needsUpdate=!0,G$(C,x,d),C.side=tJ;else G$(C,x,d)}this.compile=function(C,x,n=null){if(n===null)n=C;if(T!==null)T.renderStart(C,x,n);if(M=E0.get(n),M.init(x),A.push(M),n.traverseVisible(function(u){if(u.isLight&&u.layers.test(x.layers)){if(M.pushLight(u),u.castShadow)M.pushShadow(u)}}),C!==n)C.traverseVisible(function(u){if(u.isLight&&u.layers.test(x.layers)){if(M.pushLight(u),u.castShadow)M.pushShadow(u)}});if(M.setupLights(),T!==null)T.updateLights(M.state.lightsArray);if(s0=this.localClippingEnabled,n0=W0.init(this.clippingPlanes,s0),n0===!0)W0.setGlobalState(this.clippingPlanes,x);if(T!==null)_0.render(M.state.shadowsArray,n,x);let d=new Set;if(C.traverse(function(u){if(!(u.isMesh||u.isPoints||u.isLine||u.isSprite))return;let B0=u.material;if(B0)if(Array.isArray(B0))for(let z0=0;z0<B0.length;z0++){let L0=B0[z0];QH(L0,n,x,u),d.add(L0)}else QH(B0,n,x,u),d.add(B0)}),M=A.pop(),T!==null)T.renderEnd();return d},this.compileAsync=function(C,x,n=null){let d=this.compile(C,x,n);return new Promise((u)=>{function B0(){if(d.forEach(function(z0){let I0=f.get(z0).currentProgram;if(I0===void 0||I0.isReady())d.delete(z0)}),d.size===0){u(C);return}setTimeout(B0,10)}if(t0.get("KHR_parallel_shader_compile")!==null)B0();else setTimeout(B0,10)})};let vZ=null;function cU(C){if(vZ)vZ(C)}function $H(){u8.stop()}function ZH(){u8.start()}let u8=new kX;if(u8.setAnimationLoop(cU),typeof self<"u")u8.setContext(self);this.setAnimationLoop=function(C){vZ=C,R0.setAnimationLoop(C),C===null?u8.stop():u8.start()},R0.addEventListener("sessionstart",$H),R0.addEventListener("sessionend",ZH),this.render=function(C,x){if(x!==void 0&&x.isCamera!==!0){x0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(T!==null)T.renderStart(C,x);let n=R0.enabled===!0&&R0.isPresenting===!0,d=B!==null&&(g===null||n)&&B.begin(k,g);if(C.matrixWorldAutoUpdate===!0)C.updateMatrixWorld();if(x.parent===null&&x.matrixWorldAutoUpdate===!0)x.updateMatrixWorld();if(R0.enabled===!0&&R0.isPresenting===!0&&(B===null||B.isCompositing()===!1)){if(R0.cameraAutoUpdate===!0)R0.updateCamera(x);x=R0.getCamera()}if(C.isScene===!0)C.onBeforeRender(k,C,x,g);if(M=E0.get(C,A.length),M.init(x),M.state.textureUnits=s.getTextureUnits(),A.push(M),i0.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),l0.setFromProjectionMatrix(i0,q6,x.reversedDepth),s0=this.localClippingEnabled,n0=W0.init(this.clippingPlanes,s0),L=P0.get(C,P.length),L.init(),P.push(L),R0.enabled===!0&&R0.isPresenting===!0){let z0=k.xr.getDepthSensingMesh();if(z0!==null)gZ(z0,x,-1/0,k.sortObjects)}if(gZ(C,x,0,k.sortObjects),L.finish(),T!==null)T.updateLights(M.state.lightsArray);if(k.sortObjects===!0)L.sort(Z0,T0);if(PJ=R0.enabled===!1||R0.isPresenting===!1||R0.hasDepthSensing()===!1,PJ)y0.addToRenderList(L,C);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(n0===!0)W0.beginShadows();let u=M.state.shadowsArray;if(_0.render(u,C,x),n0===!0)W0.endShadows();if((d&&B.hasRenderPass())===!1){let{opaque:z0,transmissive:L0}=L;if(M.setupLights(),x.isArrayCamera){let I0=x.cameras;if(L0.length>0)for(let A0=0,p0=I0.length;A0<p0;A0++){let o0=I0[A0];WH(z0,L0,C,o0)}if(PJ)y0.render(C);for(let A0=0,p0=I0.length;A0<p0;A0++){let o0=I0[A0];KH(L,C,o0,o0.viewport)}}else{if(L0.length>0)WH(z0,L0,C,x);if(PJ)y0.render(C);KH(L,C,x)}}if(g!==null&&o===0)s.updateMultisampleRenderTarget(g),s.updateRenderTargetMipmap(g);if(d)B.end(k);if(C.isScene===!0)C.onAfterRender(k,C,x);if(F0.resetDefaultState(),J0=-1,m=null,A.pop(),A.length>0){if(M=A[A.length-1],s.setTextureUnits(M.state.textureUnits),n0===!0)W0.setGlobalState(k.clippingPlanes,M.state.camera)}else M=null;if(P.pop(),P.length>0)L=P[P.length-1];else L=null;if(T!==null)T.renderEnd()};function gZ(C,x,n,d){if(C.visible===!1)return;if(C.layers.test(x.layers)){if(C.isGroup)n=C.renderOrder;else if(C.isLOD){if(C.autoUpdate===!0)C.update(x)}else if(C.isLightProbeGrid)M.pushLightProbeGrid(C);else if(C.isLight){if(M.pushLight(C),C.castShadow)M.pushShadow(C)}else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(l0)){if(d)WJ.setFromMatrixPosition(C.matrixWorld).applyMatrix4(i0);let z0=r.update(C),L0=C.material;if(L0.visible)L.push(C,z0,L0,n,WJ.z,null,x)}}else if(C.isMesh||C.isLine||C.isPoints){if(!C.frustumCulled||C.intersectsFrustum(l0)){let z0=r.update(C),L0=C.material;if(d){if(C.boundingSphere!==void 0){if(C.boundingSphere===null)C.computeBoundingSphere();WJ.copy(C.boundingSphere.center)}else{if(z0.boundingSphere===null)z0.computeBoundingSphere();WJ.copy(z0.boundingSphere.center)}WJ.applyMatrix4(C.matrixWorld).applyMatrix4(i0)}if(Array.isArray(L0)){let I0=z0.groups;for(let A0=0,p0=I0.length;A0<p0;A0++){let o0=I0[A0],C0=L0[o0.materialIndex];if(C0&&C0.visible)L.push(C,z0,C0,n,WJ.z,o0,x)}}else if(L0.visible)L.push(C,z0,L0,n,WJ.z,null,x)}}}let B0=C.children;for(let z0=0,L0=B0.length;z0<L0;z0++)gZ(B0[z0],x,n,d)}function KH(C,x,n,d){let{opaque:u,transmissive:B0,transparent:z0}=C;if(M.setupLightsView(n),n0===!0)W0.setGlobalState(k.clippingPlanes,n);if(d)S.viewport(l.copy(d));if(u.length>0)U$(u,x,n);if(B0.length>0)U$(B0,x,n);if(z0.length>0)U$(z0,x,n);S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function WH(C,x,n,d){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[d.id]===void 0){let C0=t0.has("EXT_color_buffer_half_float")||t0.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[d.id]=new k9(1,1,{generateMipmaps:!0,type:C0?i9:d9,minFilter:t8,samples:Math.max(4,zJ.samples),stencilBuffer:K,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:a0.workingColorSpace})}let B0=M.state.transmissionRenderTarget[d.id],z0=d.viewport||l;B0.setSize(z0.z*k.transmissionResolutionScale,z0.w*k.transmissionResolutionScale);let L0=k.getRenderTarget(),I0=k.getActiveCubeFace(),A0=k.getActiveMipmapLevel();if(k.setRenderTarget(B0),k.getClearColor(q0),f0=k.getClearAlpha(),f0<1)k.setClearColor(16777215,0.5);if(k.clear(),PJ)y0.render(n);let p0=k.toneMapping;k.toneMapping=p9;let o0=d.viewport;if(d.viewport!==void 0)d.viewport=void 0;if(M.setupLightsView(d),n0===!0)W0.setGlobalState(k.clippingPlanes,d);if(U$(C,n,d),s.updateMultisampleRenderTarget(B0),s.updateRenderTargetMipmap(B0),t0.has("WEBGL_multisampled_render_to_texture")===!1){let C0=!1;for(let KJ=0,fJ=x.length;KJ<fJ;KJ++){let RJ=x[KJ],{object:GJ,geometry:oJ,material:k0,group:K9}=RJ;if(k0.side===tJ&&GJ.layers.test(d.layers)){let e0=k0.side;k0.side=U9,k0.needsUpdate=!0,HH(GJ,n,d,oJ,k0,K9),k0.side=e0,k0.needsUpdate=!0,C0=!0}}if(C0===!0)s.updateMultisampleRenderTarget(B0),s.updateRenderTargetMipmap(B0)}if(k.setRenderTarget(L0,I0,A0),k.setClearColor(q0,f0),o0!==void 0)d.viewport=o0;k.toneMapping=p0}function U$(C,x,n){let d=x.isScene===!0?x.overrideMaterial:null;for(let u=0,B0=C.length;u<B0;u++){let z0=C[u],{object:L0,geometry:I0,group:A0}=z0,p0=z0.material;if(p0.allowOverride===!0&&d!==null)p0=d;if(L0.layers.test(n.layers))HH(L0,x,n,I0,p0,A0)}}function HH(C,x,n,d,u,B0){if(T!==null&&u.isNodeMaterial)T.setObject(C,u);if(C.onBeforeRender(k,x,n,d,u,B0),C.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),u.onBeforeRender(k,x,n,d,C,B0),u.transparent===!0&&u.side===tJ&&u.forceSinglePass===!1)u.side=U9,u.needsUpdate=!0,k.renderBufferDirect(n,x,d,u,C,B0),u.side=s7,u.needsUpdate=!0,k.renderBufferDirect(n,x,d,u,C,B0),u.side=tJ;else k.renderBufferDirect(n,x,d,u,C,B0);C.onAfterRender(k,x,n,d,u,B0)}function G$(C,x,n){if(x.isScene!==!0)x=lJ;let d=f.get(C),u=M.state.lights,B0=M.state.shadowsArray,z0=u.state.version,L0=e.getParameters(C,u.state,B0,x,n,M.state.lightProbeGridArray),I0=e.getProgramCacheKey(L0),A0=d.programs;d.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?x.environment:null,d.fog=x.fog;let p0=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;if(d.envMap=$0.get(C.envMap||d.environment,p0),d.envMapRotation=d.environment!==null&&C.envMap===null?x.environmentRotation:C.envMapRotation,A0===void 0)C.addEventListener("dispose",l9),A0=new Map,d.programs=A0;let o0=A0.get(I0);if(o0!==void 0){if(d.currentProgram===o0&&d.lightsStateVersion===z0)return XH(C,L0),o0}else{if(L0.uniforms=e.getUniforms(C),T!==null&&C.isNodeMaterial)T.build(C,n,L0);C.onBeforeCompile(L0,k),o0=e.acquireProgram(L0,I0),A0.set(I0,o0),d.uniforms=L0.uniforms}let C0=d.uniforms;if(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)C0.clippingPlanes=W0.uniform;if(XH(C,L0),d.needsLights=oU(C),d.lightsStateVersion=z0,d.needsLights)C0.ambientLightColor.value=u.state.ambient,C0.lightProbe.value=u.state.probe,C0.sunLights.value=u.state.sun,C0.sunLightShadows.value=u.state.sunShadow,C0.directionalLights.value=u.state.directional,C0.directionalLightShadows.value=u.state.directionalShadow,C0.spotLights.value=u.state.spot,C0.spotLightShadows.value=u.state.spotShadow,C0.rectAreaLights.value=u.state.rectArea,C0.ltc_1.value=u.state.rectAreaLTC1,C0.ltc_2.value=u.state.rectAreaLTC2,C0.pointLights.value=u.state.point,C0.pointLightShadows.value=u.state.pointShadow,C0.hemisphereLights.value=u.state.hemi,C0.sunShadowMatrix.value=u.state.sunShadowMatrix,C0.sunShadowCascade.value=u.state.sunShadowCascade,C0.directionalShadowMatrix.value=u.state.directionalShadowMatrix,C0.spotLightMatrix.value=u.state.spotLightMatrix,C0.spotLightMap.value=u.state.spotLightMap,C0.pointShadowMatrix.value=u.state.pointShadowMatrix;return d.lightProbeGrid=M.state.lightProbeGridArray.length>0,d.currentProgram=o0,d.uniformsList=null,o0}function YH(C){if(C.uniformsList===null){let x=C.currentProgram.getUniforms();C.uniformsList=nQ.seqWithValue(x.seq,C.uniforms)}return C.uniformsList}function XH(C,x){let n=f.get(C);n.outputColorSpace=x.outputColorSpace,n.batching=x.batching,n.batchingColor=x.batchingColor,n.instancing=x.instancing,n.instancingColor=x.instancingColor,n.instancingMorph=x.instancingMorph,n.skinning=x.skinning,n.morphTargets=x.morphTargets,n.morphNormals=x.morphNormals,n.morphColors=x.morphColors,n.morphTargetsCount=x.morphTargetsCount,n.numClippingPlanes=x.numClippingPlanes,n.numIntersection=x.numClipIntersection,n.vertexAlphas=x.vertexAlphas,n.vertexTangents=x.vertexTangents,n.toneMapping=x.toneMapping}function sU(C,x){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;I.setFromMatrixPosition(x.matrixWorld);for(let n=0,d=C.length;n<d;n++){let u=C[n];if(u.texture!==null&&u.boundingBox.containsPoint(I))return u}return null}function nU(C,x,n,d,u){if(x.isScene!==!0)x=lJ;s.resetTextureUnits();let B0=x.fog,z0=d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial?x.environment:null,L0=g===null?k.outputColorSpace:g.isXRRenderTarget===!0?g.texture.colorSpace:a0.workingColorSpace,I0=d.isMeshStandardMaterial||d.isMeshLambertMaterial&&!d.envMap||d.isMeshPhongMaterial&&!d.envMap,A0=$0.get(d.envMap||z0,I0),p0=d.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,o0=!!n.attributes.tangent&&(!!d.normalMap||d.anisotropy>0),C0=!!n.morphAttributes.position,KJ=!!n.morphAttributes.normal,fJ=!!n.morphAttributes.color,RJ=p9;if(d.toneMapped){if(g===null||g.isXRRenderTarget===!0)RJ=k.toneMapping}let GJ=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,oJ=GJ!==void 0?GJ.length:0,k0=f.get(d),K9=M.state.lights;if(n0===!0){if(s0===!0||C!==m){let OJ=C===m&&d.id===J0;W0.setState(d,C,OJ)}}let e0=!1;if(d.version===k0.__version){if(k0.needsLights&&k0.lightsStateVersion!==K9.state.version)e0=!0;else if(k0.outputColorSpace!==L0)e0=!0;else if(u.isBatchedMesh&&k0.batching===!1)e0=!0;else if(!u.isBatchedMesh&&k0.batching===!0)e0=!0;else if(u.isBatchedMesh&&k0.batchingColor===!0&&u._colorsTexture===null)e0=!0;else if(u.isBatchedMesh&&k0.batchingColor===!1&&u._colorsTexture!==null)e0=!0;else if(u.isInstancedMesh&&k0.instancing===!1)e0=!0;else if(!u.isInstancedMesh&&k0.instancing===!0)e0=!0;else if(u.isSkinnedMesh&&k0.skinning===!1)e0=!0;else if(!u.isSkinnedMesh&&k0.skinning===!0)e0=!0;else if(u.isInstancedMesh&&k0.instancingColor===!0&&u.instanceColor===null)e0=!0;else if(u.isInstancedMesh&&k0.instancingColor===!1&&u.instanceColor!==null)e0=!0;else if(u.isInstancedMesh&&k0.instancingMorph===!0&&u.morphTexture===null)e0=!0;else if(u.isInstancedMesh&&k0.instancingMorph===!1&&u.morphTexture!==null)e0=!0;else if(k0.envMap!==A0)e0=!0;else if(d.fog===!0&&k0.fog!==B0)e0=!0;else if(k0.numClippingPlanes!==void 0&&(k0.numClippingPlanes!==W0.numPlanes||k0.numIntersection!==W0.numIntersection))e0=!0;else if(k0.vertexAlphas!==p0)e0=!0;else if(k0.vertexTangents!==o0)e0=!0;else if(k0.morphTargets!==C0)e0=!0;else if(k0.morphNormals!==KJ)e0=!0;else if(k0.morphColors!==fJ)e0=!0;else if(k0.toneMapping!==RJ)e0=!0;else if(k0.morphTargetsCount!==oJ)e0=!0;else if(!!k0.lightProbeGrid!==M.state.lightProbeGridArray.length>0)e0=!0}else e0=!0,k0.__version=d.version;let A9=k0.currentProgram;if(e0===!0){if(A9=G$(d,x,u),T&&d.isNodeMaterial)T.onUpdateProgram(d,A9,k0)}let c9=!1,M8=!1,I7=!1,UJ=A9.getUniforms(),bJ=k0.uniforms;if(S.useProgram(A9.program))c9=!0,M8=!0,I7=!0;if(d.id!==J0)J0=d.id,M8=!0;if(k0.needsLights){let OJ=sU(M.state.lightProbeGridArray,u);if(k0.lightProbeGrid!==OJ)k0.lightProbeGrid=OJ,M8=!0}if(c9||m!==C){if(S.buffers.depth.getReversed()&&C.reversedDepth!==!0)C._reversedDepth=!0,C.updateProjectionMatrix();UJ.setValue(j,"projectionMatrix",C.projectionMatrix),UJ.setValue(j,"viewMatrix",C.matrixWorldInverse);let k8=UJ.map.cameraPosition;if(k8!==void 0)k8.setValue(j,jJ.setFromMatrixPosition(C.matrixWorld));if(zJ.logarithmicDepthBuffer)UJ.setValue(j,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2));if(d.isMeshPhongMaterial||d.isMeshToonMaterial||d.isMeshLambertMaterial||d.isMeshBasicMaterial||d.isMeshStandardMaterial||d.isShaderMaterial)UJ.setValue(j,"isOrthographic",C.isOrthographicCamera===!0);if(m!==C)m=C,M8=!0,I7=!0}if(k0.needsLights){if(K9.state.sunShadowMap.length>0)UJ.setValue(j,"sunShadowMap",K9.state.sunShadowMap,s);if(K9.state.directionalShadowMap.length>0)UJ.setValue(j,"directionalShadowMap",K9.state.directionalShadowMap,s);if(K9.state.spotShadowMap.length>0)UJ.setValue(j,"spotShadowMap",K9.state.spotShadowMap,s);if(K9.state.pointShadowMap.length>0)UJ.setValue(j,"pointShadowMap",K9.state.pointShadowMap,s)}if(u.isSkinnedMesh){UJ.setOptional(j,u,"bindMatrix"),UJ.setOptional(j,u,"bindMatrixInverse");let OJ=u.skeleton;if(OJ){if(OJ.boneTexture===null)OJ.computeBoneTexture();UJ.setValue(j,"boneTexture",OJ.boneTexture,s)}}if(u.isBatchedMesh){if(UJ.setOptional(j,u,"batchingTexture"),UJ.setValue(j,"batchingTexture",u._matricesTexture,s),UJ.setOptional(j,u,"batchingIdTexture"),UJ.setValue(j,"batchingIdTexture",u._indirectTexture,s),UJ.setOptional(j,u,"batchingColorTexture"),u._colorsTexture!==null)UJ.setValue(j,"batchingColorTexture",u._colorsTexture,s)}let V8=n.morphAttributes;if(V8.position!==void 0||V8.normal!==void 0||V8.color!==void 0)JJ.update(u,n,A9);if(M8||k0.receiveShadow!==u.receiveShadow)k0.receiveShadow=u.receiveShadow,UJ.setValue(j,"receiveShadow",u.receiveShadow);if((d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial)&&d.envMap===null&&x.environment!==null)bJ.envMapIntensity.value=x.environmentIntensity;if(bJ.dfgLUT!==void 0)bJ.dfgLUT.value=dF();if(M8){if(UJ.setValue(j,"toneMappingExposure",k.toneMappingExposure),k0.needsLights)iU(bJ,I7);if(B0&&d.fog===!0)M0.refreshFogUniforms(bJ,B0);if(M0.refreshMaterialUniforms(bJ,d,K0,i,M.state.transmissionRenderTarget[C.id]),k0.needsLights&&k0.lightProbeGrid){let OJ=k0.lightProbeGrid;bJ.probesSH.value=OJ.texture,bJ.probesMin.value.copy(OJ.boundingBox.min),bJ.probesMax.value.copy(OJ.boundingBox.max),bJ.probesResolution.value.copy(OJ.resolution)}nQ.upload(j,YH(k0),bJ,s)}if(d.isShaderMaterial&&d.uniformsNeedUpdate===!0)nQ.upload(j,YH(k0),bJ,s),d.uniformsNeedUpdate=!1;if(d.isSpriteMaterial)UJ.setValue(j,"center",u.center);if(UJ.setValue(j,"modelViewMatrix",u.modelViewMatrix),UJ.setValue(j,"normalMatrix",u.normalMatrix),UJ.setValue(j,"modelMatrix",u.matrixWorld),d.uniformsGroups!==void 0){let OJ=d.uniformsGroups;for(let k8=0,C7=OJ.length;k8<C7;k8++){let GH=OJ[k8];V0.update(GH,A9),V0.bind(GH,A9)}}return A9}function iU(C,x){C.ambientLightColor.needsUpdate=x,C.lightProbe.needsUpdate=x,C.sunLights.needsUpdate=x,C.sunLightShadows.needsUpdate=x,C.directionalLights.needsUpdate=x,C.directionalLightShadows.needsUpdate=x,C.pointLights.needsUpdate=x,C.pointLightShadows.needsUpdate=x,C.spotLights.needsUpdate=x,C.spotLightShadows.needsUpdate=x,C.rectAreaLights.needsUpdate=x,C.hemisphereLights.needsUpdate=x}function oU(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return p},this.getActiveMipmapLevel=function(){return o},this.getRenderTarget=function(){return g},this.setRenderTargetTextures=function(C,x,n){let d=f.get(C);if(d.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,d.__autoAllocateDepthBuffer===!1)d.__useRenderToTexture=!1;f.get(C.texture).__webglTexture=x,f.get(C.depthTexture).__webglTexture=d.__autoAllocateDepthBuffer?void 0:n,d.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,x){let n=f.get(C);n.__webglFramebuffer=x,n.__useDefaultFramebuffer=x===void 0},this.setRenderTarget=function(C,x=0,n=0){g=C,p=x,o=n;let d=null,u=!1,B0=!1;if(C){let L0=f.get(C);if(L0.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(j.FRAMEBUFFER,L0.__webglFramebuffer),l.copy(C.viewport),a.copy(C.scissor),U0=C.scissorTest,S.viewport(l),S.scissor(a),S.setScissorTest(U0),J0=-1;return}else if(L0.__webglFramebuffer===void 0)s.setupRenderTarget(C);else if(L0.__hasExternalTextures)s.rebindTextures(C,f.get(C.texture).__webglTexture,f.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let p0=C.depthTexture;if(L0.__boundDepthTexture!==p0){if(p0!==null&&f.has(p0)&&(C.width!==p0.image.width||C.height!==p0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");s.setupDepthRenderbuffer(C)}}let I0=C.texture;if(I0.isData3DTexture||I0.isDataArrayTexture||I0.isCompressedArrayTexture)B0=!0;let A0=f.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget){if(Array.isArray(A0[x]))d=A0[x][n];else d=A0[x];u=!0}else if(C.samples>0&&s.useMultisampledRTT(C)===!1)d=f.get(C).__webglMultisampledFramebuffer;else if(Array.isArray(A0))d=A0[n];else d=A0;l.copy(C.viewport),a.copy(C.scissor),U0=C.scissorTest}else l.copy(j0).multiplyScalar(K0).floor(),a.copy(w0).multiplyScalar(K0).floor(),U0=kJ;if(n!==0)d=y;if(S.bindFramebuffer(j.FRAMEBUFFER,d))S.drawBuffers(C,d);if(S.viewport(l),S.scissor(a),S.setScissorTest(U0),u){let L0=f.get(C.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+x,L0.__webglTexture,n)}else if(B0){let L0=x;for(let I0=0;I0<C.textures.length;I0++){let A0=f.get(C.textures[I0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+I0,A0.__webglTexture,n,L0)}}else if(C!==null&&n!==0){let L0=f.get(C.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,L0.__webglTexture,n)}J0=-1};function UH(C){let x=f.get(C);if(x.__readFormat!==C.format||x.__readType!==C.type)x.__readFormat=C.format,x.__readType=C.type,x.__formatReadable=zJ.textureFormatReadable(C.format),x.__typeReadable=zJ.textureTypeReadable(C.type);return x}if(this.readRenderTargetPixels=function(C,x,n,d,u,B0,z0,L0=0){if(!(C&&C.isWebGLRenderTarget)){x0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let I0=f.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&z0!==void 0)I0=I0[z0];if(I0){S.bindFramebuffer(j.FRAMEBUFFER,I0);try{let A0=C.textures[L0],p0=A0.format,o0=A0.type;if(C.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+L0);let C0=UH(A0);if(C0.__formatReadable===!1){x0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(C0.__typeReadable===!1){x0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(x>=0&&x<=C.width-d&&(n>=0&&n<=C.height-u))j.readPixels(x,n,d,u,t.convert(p0),t.convert(o0),B0)}finally{let A0=g!==null?f.get(g).__webglFramebuffer:null;S.bindFramebuffer(j.FRAMEBUFFER,A0)}}},this.readRenderTargetPixelsAsync=async function(C,x,n,d,u,B0,z0,L0=0){if(!(C&&C.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let I0=f.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&z0!==void 0)I0=I0[z0];if(I0)if(x>=0&&x<=C.width-d&&(n>=0&&n<=C.height-u)){S.bindFramebuffer(j.FRAMEBUFFER,I0);let A0=C.textures[L0],p0=A0.format,o0=A0.type;if(C.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+L0);let C0=UH(A0);if(C0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(C0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let KJ=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,KJ),j.bufferData(j.PIXEL_PACK_BUFFER,B0.byteLength,j.STREAM_READ),j.readPixels(x,n,d,u,t.convert(p0),t.convert(o0),0),j.bindBuffer(j.PIXEL_PACK_BUFFER,null);let fJ=g!==null?f.get(g).__webglFramebuffer:null;S.bindFramebuffer(j.FRAMEBUFFER,fJ);let RJ=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await lY(j,RJ,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,KJ),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,B0),j.bindBuffer(j.PIXEL_PACK_BUFFER,null),j.deleteBuffer(KJ),j.deleteSync(RJ),B0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,x=null,n=0){let d=Math.pow(2,-n),u=Math.floor(C.image.width*d),B0=Math.floor(C.image.height*d),z0=x!==null?x.x:0,L0=x!==null?x.y:0;s.setTexture2D(C,0),j.copyTexSubImage2D(j.TEXTURE_2D,n,0,0,z0,L0,u,B0),S.unbindTexture()},this.copyTextureToTexture=function(C,x,n=null,d=null,u=0,B0=0){let z0,L0,I0,A0,p0,o0,C0,KJ,fJ,RJ=C.isCompressedTexture?C.mipmaps[B0]:C.image;if(n!==null)z0=n.max.x-n.min.x,L0=n.max.y-n.min.y,I0=n.isBox3?n.max.z-n.min.z:1,A0=n.min.x,p0=n.min.y,o0=n.isBox3?n.min.z:0;else{let bJ=Math.pow(2,-u);if(z0=Math.floor(RJ.width*bJ),L0=Math.floor(RJ.height*bJ),C.isDataArrayTexture)I0=RJ.depth;else if(C.isData3DTexture)I0=Math.floor(RJ.depth*bJ);else I0=1;A0=0,p0=0,o0=0}if(d!==null)C0=d.x,KJ=d.y,fJ=d.z;else C0=0,KJ=0,fJ=0;let GJ=t.convert(x.format),oJ=t.convert(x.type),k0;if(x.isData3DTexture)s.setTexture3D(x,0),k0=j.TEXTURE_3D;else if(x.isDataArrayTexture||x.isCompressedArrayTexture)s.setTexture2DArray(x,0),k0=j.TEXTURE_2D_ARRAY;else s.setTexture2D(x,0),k0=j.TEXTURE_2D;S.activeTexture(j.TEXTURE0),S.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,x.flipY),S.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),S.pixelStorei(j.UNPACK_ALIGNMENT,x.unpackAlignment);let K9=S.getParameter(j.UNPACK_ROW_LENGTH),e0=S.getParameter(j.UNPACK_IMAGE_HEIGHT),A9=S.getParameter(j.UNPACK_SKIP_PIXELS),c9=S.getParameter(j.UNPACK_SKIP_ROWS),M8=S.getParameter(j.UNPACK_SKIP_IMAGES);S.pixelStorei(j.UNPACK_ROW_LENGTH,RJ.width),S.pixelStorei(j.UNPACK_IMAGE_HEIGHT,RJ.height),S.pixelStorei(j.UNPACK_SKIP_PIXELS,A0),S.pixelStorei(j.UNPACK_SKIP_ROWS,p0),S.pixelStorei(j.UNPACK_SKIP_IMAGES,o0);let I7=C.isDataArrayTexture||C.isData3DTexture,UJ=x.isDataArrayTexture||x.isData3DTexture;if(C.isDepthTexture){let bJ=f.get(C),V8=f.get(x),OJ=f.get(bJ.__renderTarget),k8=f.get(V8.__renderTarget);S.bindFramebuffer(j.READ_FRAMEBUFFER,OJ.__webglFramebuffer),S.bindFramebuffer(j.DRAW_FRAMEBUFFER,k8.__webglFramebuffer);for(let C7=0;C7<I0;C7++){if(I7)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,f.get(C).__webglTexture,u,o0+C7),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,f.get(x).__webglTexture,B0,fJ+C7);j.blitFramebuffer(A0,p0,z0,L0,C0,KJ,z0,L0,j.DEPTH_BUFFER_BIT,j.NEAREST)}S.bindFramebuffer(j.READ_FRAMEBUFFER,null),S.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(u!==0||C.isRenderTargetTexture||f.has(C)){let bJ=f.get(C),V8=f.get(x);S.bindFramebuffer(j.READ_FRAMEBUFFER,c),S.bindFramebuffer(j.DRAW_FRAMEBUFFER,_);for(let OJ=0;OJ<I0;OJ++){if(I7)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,bJ.__webglTexture,u,o0+OJ);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,bJ.__webglTexture,u);if(UJ)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,V8.__webglTexture,B0,fJ+OJ);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,V8.__webglTexture,B0);if(u!==0)j.blitFramebuffer(A0,p0,z0,L0,C0,KJ,z0,L0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(UJ)j.copyTexSubImage3D(k0,B0,C0,KJ,fJ+OJ,A0,p0,z0,L0);else j.copyTexSubImage2D(k0,B0,C0,KJ,A0,p0,z0,L0)}S.bindFramebuffer(j.READ_FRAMEBUFFER,null),S.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(UJ)if(C.isDataTexture||C.isData3DTexture)j.texSubImage3D(k0,B0,C0,KJ,fJ,z0,L0,I0,GJ,oJ,RJ.data);else if(x.isCompressedArrayTexture)j.compressedTexSubImage3D(k0,B0,C0,KJ,fJ,z0,L0,I0,GJ,RJ.data);else j.texSubImage3D(k0,B0,C0,KJ,fJ,z0,L0,I0,GJ,oJ,RJ);else if(C.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,B0,C0,KJ,z0,L0,GJ,oJ,RJ.data);else if(C.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,B0,C0,KJ,RJ.width,RJ.height,GJ,RJ.data);else j.texSubImage2D(j.TEXTURE_2D,B0,C0,KJ,z0,L0,GJ,oJ,RJ);if(S.pixelStorei(j.UNPACK_ROW_LENGTH,K9),S.pixelStorei(j.UNPACK_IMAGE_HEIGHT,e0),S.pixelStorei(j.UNPACK_SKIP_PIXELS,A9),S.pixelStorei(j.UNPACK_SKIP_ROWS,c9),S.pixelStorei(j.UNPACK_SKIP_IMAGES,M8),B0===0&&x.generateMipmaps)j.generateMipmap(k0);S.unbindTexture()},this.initRenderTarget=function(C){if(f.get(C).__webglFramebuffer===void 0)s.setupRenderTarget(C)},this.initTexture=function(C){if(C.isCubeTexture)s.setTextureCube(C,0);else if(C.isData3DTexture)s.setTexture3D(C,0);else if(C.isDataArrayTexture||C.isCompressedArrayTexture)s.setTexture2DArray(C,0);else s.setTexture2D(C,0);S.unbindTexture()},this.resetState=function(){p=0,o=0,g=null,S.reset(),F0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return q6}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=a0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=a0._getUnpackColorSpace()}}var xX={type:"change"},HW={type:"start"},vX={type:"end"},VZ=new b8,hX=new S9,lF=Math.cos(70*bQ.DEG2RAD),mJ=new w,N9=2*Math.PI,XJ={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},WW=0.000001;class YW extends OZ{constructor(J,Q=null){super(J,Q);if(this.state=XJ.NONE,this.target=new w,this.cursor=new w,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:S8.ROTATE,MIDDLE:S8.DOLLY,RIGHT:S8.PAN},this.touches={ONE:w8.ROTATE,TWO:w8.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new w,this._lastQuaternion=new w9,this._lastTargetPosition=new w,this._quat=new w9().setFromUnitVectors(J.up,new w(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new uQ,this._sphericalDelta=new uQ,this._scale=1,this._panOffset=new w,this._rotateStart=new G0,this._rotateEnd=new G0,this._rotateDelta=new G0,this._panStart=new G0,this._panEnd=new G0,this._panDelta=new G0,this._dollyStart=new G0,this._dollyEnd=new G0,this._dollyDelta=new G0,this._dollyDirection=new w,this._mouse=new G0,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=sF.bind(this),this._onPointerDown=cF.bind(this),this._onPointerUp=nF.bind(this),this._onContextMenu=JD.bind(this),this._onMouseWheel=aF.bind(this),this._onKeyDown=rF.bind(this),this._onTouchStart=tF.bind(this),this._onTouchMove=eF.bind(this),this._onMouseDown=iF.bind(this),this._onMouseMove=oF.bind(this),this._interceptControlDown=QD.bind(this),this._interceptControlUp=$D.bind(this),this.domElement!==null)this.connect(this.domElement);this.update()}set cursorStyle(J){if(this._cursorStyle=J,J==="grab")this.domElement.style.cursor="grab";else this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(J){super.connect(J),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=XJ.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let J=this.domElement.getRootNode();J.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),J.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(J){J.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=J}stopListenToKeyEvents(){if(this._domElementKeyEvents!==null)this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(xX),this.update(),this.state=XJ.NONE}pan(J,Q){this._pan(J,Q),this.update()}dollyIn(J){this._dollyIn(J),this.update()}dollyOut(J){this._dollyOut(J),this.update()}rotateLeft(J){this._rotateLeft(J),this.update()}rotateUp(J){this._rotateUp(J),this.update()}update(J=null){let Q=this.object.position;if(mJ.copy(Q).sub(this.target),mJ.applyQuaternion(this._quat),this._spherical.setFromVector3(mJ),this.autoRotate&&this.state===XJ.NONE)this._rotateLeft(this._getAutoRotationAngle(J));if(this.enableDamping)this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor;else this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi;let $=this.minAzimuthAngle,Z=this.maxAzimuthAngle;if(isFinite($)&&isFinite(Z)){if($<-Math.PI)$+=N9;else if($>Math.PI)$-=N9;if(Z<-Math.PI)Z+=N9;else if(Z>Math.PI)Z-=N9;if($<=Z)this._spherical.theta=Math.max($,Math.min(Z,this._spherical.theta));else this._spherical.theta=this._spherical.theta>($+Z)/2?Math.max($,this._spherical.theta):Math.min(Z,this._spherical.theta)}if(this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0)this.target.addScaledVector(this._panOffset,this.dampingFactor);else this.target.add(this._panOffset);this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let K=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let W=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),K=W!=this._spherical.radius}if(mJ.setFromSpherical(this._spherical),mJ.applyQuaternion(this._quatInverse),Q.copy(this.target).add(mJ),this.object.lookAt(this.target),this.enableDamping===!0)this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor);else this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0);if(this.zoomToCursor&&this._performCursorZoom){let W=null;if(this.object.isPerspectiveCamera){let H=mJ.length();W=this._clampDistance(H*this._scale);let Y=H-W;this.object.position.addScaledVector(this._dollyDirection,Y),this.object.updateMatrixWorld(),K=!!Y}else if(this.object.isOrthographicCamera){let H=new w(this._mouse.x,this._mouse.y,0);H.unproject(this.object);let Y=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),K=Y!==this.object.zoom;let X=new w(this._mouse.x,this._mouse.y,0);X.unproject(this.object),this.object.position.sub(X).add(H),this.object.updateMatrixWorld(),W=mJ.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;if(W!==null)if(this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(W).add(this.object.position);else if(VZ.origin.copy(this.object.position),VZ.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(VZ.direction))<lF)this.object.lookAt(this.target);else hX.setFromNormalAndCoplanarPoint(this.object.up,this.target),VZ.intersectPlane(hX,this.target)}else if(this.object.isOrthographicCamera){let W=this.object.zoom;if(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),W!==this.object.zoom)this.object.updateProjectionMatrix(),K=!0}if(this._scale=1,this._performCursorZoom=!1,K||this._lastPosition.distanceToSquared(this.object.position)>WW||8*(1-this._lastQuaternion.dot(this.object.quaternion))>WW||this._lastTargetPosition.distanceToSquared(this.target)>WW)return this.dispatchEvent(xX),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0;return!1}_getAutoRotationAngle(J){if(J!==null)return N9/60*this.autoRotateSpeed*J;else return N9/60/60*this.autoRotateSpeed}_getZoomScale(J){let Q=Math.abs(J*0.01);return Math.pow(0.95,this.zoomSpeed*Q)}_rotateLeft(J){this._sphericalDelta.theta-=J}_rotateUp(J){this._sphericalDelta.phi-=J}_panLeft(J,Q){mJ.setFromMatrixColumn(Q,0),mJ.multiplyScalar(-J),this._panOffset.add(mJ)}_panUp(J,Q){if(this.screenSpacePanning===!0)mJ.setFromMatrixColumn(Q,1);else mJ.setFromMatrixColumn(Q,0),mJ.crossVectors(this.object.up,mJ);mJ.multiplyScalar(J),this._panOffset.add(mJ)}_pan(J,Q){let $=this.domElement;if(this.object.isPerspectiveCamera){let Z=this.object.position;mJ.copy(Z).sub(this.target);let K=mJ.length();K*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*J*K/$.clientHeight,this.object.matrix),this._panUp(2*Q*K/$.clientHeight,this.object.matrix)}else if(this.object.isOrthographicCamera)this._panLeft(J*(this.object.right-this.object.left)/this.object.zoom/$.clientWidth,this.object.matrix),this._panUp(Q*(this.object.top-this.object.bottom)/this.object.zoom/$.clientHeight,this.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1}_dollyOut(J){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale/=J;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_dollyIn(J){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale*=J;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_updateZoomParameters(J,Q){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let $=this.domElement.getBoundingClientRect(),Z=J-$.left,K=Q-$.top,W=$.width,H=$.height;this._mouse.x=Z/W*2-1,this._mouse.y=-(K/H)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(J){return Math.max(this.minDistance,Math.min(this.maxDistance,J))}_handleMouseDownRotate(J){this._rotateStart.set(J.clientX,J.clientY)}_handleMouseDownDolly(J){this._updateZoomParameters(J.clientX,J.clientX),this._dollyStart.set(J.clientX,J.clientY)}_handleMouseDownPan(J){this._panStart.set(J.clientX,J.clientY)}_handleMouseMoveRotate(J){this._rotateEnd.set(J.clientX,J.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let Q=this.domElement;this._rotateLeft(N9*this._rotateDelta.x/Q.clientHeight),this._rotateUp(N9*this._rotateDelta.y/Q.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(J){if(this._dollyEnd.set(J.clientX,J.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0)this._dollyOut(this._getZoomScale(this._dollyDelta.y));else if(this._dollyDelta.y<0)this._dollyIn(this._getZoomScale(this._dollyDelta.y));this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(J){this._panEnd.set(J.clientX,J.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(J){if(this._updateZoomParameters(J.clientX,J.clientY),J.deltaY<0)this._dollyIn(this._getZoomScale(J.deltaY));else if(J.deltaY>0)this._dollyOut(this._getZoomScale(J.deltaY));this.update()}_handleKeyDown(J){let Q=!1;switch(J.code){case this.keys.UP:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateUp(N9*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,this.keyPanSpeed);Q=!0;break;case this.keys.BOTTOM:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateUp(-N9*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,-this.keyPanSpeed);Q=!0;break;case this.keys.LEFT:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateLeft(N9*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(this.keyPanSpeed,0);Q=!0;break;case this.keys.RIGHT:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateLeft(-N9*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(-this.keyPanSpeed,0);Q=!0;break}if(Q)J.preventDefault(),this.update()}_handleTouchStartRotate(J){if(this._pointers.length===1)this._rotateStart.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._rotateStart.set($,Z)}}_handleTouchStartPan(J){if(this._pointers.length===1)this._panStart.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._panStart.set($,Z)}}_handleTouchStartDolly(J){let Q=this._getSecondPointerPosition(J),$=J.pageX-Q.x,Z=J.pageY-Q.y,K=Math.sqrt($*$+Z*Z);this._dollyStart.set(0,K)}_handleTouchStartDollyPan(J){if(this.enableZoom)this._handleTouchStartDolly(J);if(this.enablePan)this._handleTouchStartPan(J)}_handleTouchStartDollyRotate(J){if(this.enableZoom)this._handleTouchStartDolly(J);if(this.enableRotate)this._handleTouchStartRotate(J)}_handleTouchMoveRotate(J){if(this._pointers.length==1)this._rotateEnd.set(J.pageX,J.pageY);else{let $=this._getSecondPointerPosition(J),Z=0.5*(J.pageX+$.x),K=0.5*(J.pageY+$.y);this._rotateEnd.set(Z,K)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let Q=this.domElement;this._rotateLeft(N9*this._rotateDelta.x/Q.clientHeight),this._rotateUp(N9*this._rotateDelta.y/Q.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(J){if(this._pointers.length===1)this._panEnd.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._panEnd.set($,Z)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(J){let Q=this._getSecondPointerPosition(J),$=J.pageX-Q.x,Z=J.pageY-Q.y,K=Math.sqrt($*$+Z*Z);this._dollyEnd.set(0,K),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let W=(J.pageX+Q.x)*0.5,H=(J.pageY+Q.y)*0.5;this._updateZoomParameters(W,H)}_handleTouchMoveDollyPan(J){if(this.enableZoom)this._handleTouchMoveDolly(J);if(this.enablePan)this._handleTouchMovePan(J)}_handleTouchMoveDollyRotate(J){if(this.enableZoom)this._handleTouchMoveDolly(J);if(this.enableRotate)this._handleTouchMoveRotate(J)}_addPointer(J){this._pointers.push(J.pointerId)}_removePointer(J){delete this._pointerPositions[J.pointerId];for(let Q=0;Q<this._pointers.length;Q++)if(this._pointers[Q]==J.pointerId){this._pointers.splice(Q,1);return}}_isTrackingPointer(J){for(let Q=0;Q<this._pointers.length;Q++)if(this._pointers[Q]==J.pointerId)return!0;return!1}_trackPointer(J){let Q=this._pointerPositions[J.pointerId];if(Q===void 0)Q=new G0,this._pointerPositions[J.pointerId]=Q;Q.set(J.pageX,J.pageY)}_getSecondPointerPosition(J){let Q=J.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[Q]}_customWheelEvent(J){let Q=J.deltaMode,$={clientX:J.clientX,clientY:J.clientY,deltaY:J.deltaY};switch(Q){case 1:$.deltaY*=16;break;case 2:$.deltaY*=100;break}if(J.ctrlKey&&!this._controlActive)$.deltaY*=10;return $}}function cF(J){if(this.enabled===!1)return;if(this._pointers.length===0)this.domElement.setPointerCapture(J.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp);if(this._isTrackingPointer(J))return;if(this._addPointer(J),J.pointerType==="touch")this._onTouchStart(J);else this._onMouseDown(J);if(this._cursorStyle==="grab")this.domElement.style.cursor="grabbing"}function sF(J){if(this.enabled===!1)return;if(J.pointerType==="touch")this._onTouchMove(J);else this._onMouseMove(J)}function nF(J){switch(this._removePointer(J),this._pointers.length){case 0:if(this.domElement.releasePointerCapture(J.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(vX),this.state=XJ.NONE,this._cursorStyle==="grab")this.domElement.style.cursor="grab";break;case 1:let Q=this._pointers[0],$=this._pointerPositions[Q];this._onTouchStart({pointerId:Q,pageX:$.x,pageY:$.y});break}}function iF(J){let Q;switch(J.button){case 0:Q=this.mouseButtons.LEFT;break;case 1:Q=this.mouseButtons.MIDDLE;break;case 2:Q=this.mouseButtons.RIGHT;break;default:Q=-1}switch(Q){case S8.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(J),this.state=XJ.DOLLY;break;case S8.ROTATE:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(J),this.state=XJ.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(J),this.state=XJ.ROTATE}break;case S8.PAN:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(J),this.state=XJ.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(J),this.state=XJ.PAN}break;default:this.state=XJ.NONE}if(this.state!==XJ.NONE)this.dispatchEvent(HW)}function oF(J){switch(this.state){case XJ.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(J);break;case XJ.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(J);break;case XJ.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(J);break}}function aF(J){if(this.enabled===!1||this.enableZoom===!1||this.state!==XJ.NONE)return;J.preventDefault(),this.dispatchEvent(HW),this._handleMouseWheel(this._customWheelEvent(J)),this.dispatchEvent(vX)}function rF(J){if(this.enabled===!1)return;this._handleKeyDown(J)}function tF(J){switch(this._trackPointer(J),this._pointers.length){case 1:switch(this.touches.ONE){case w8.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(J),this.state=XJ.TOUCH_ROTATE;break;case w8.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(J),this.state=XJ.TOUCH_PAN;break;default:this.state=XJ.NONE}break;case 2:switch(this.touches.TWO){case w8.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(J),this.state=XJ.TOUCH_DOLLY_PAN;break;case w8.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(J),this.state=XJ.TOUCH_DOLLY_ROTATE;break;default:this.state=XJ.NONE}break;default:this.state=XJ.NONE}if(this.state!==XJ.NONE)this.dispatchEvent(HW)}function eF(J){switch(this._trackPointer(J),this.state){case XJ.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(J),this.update();break;case XJ.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(J),this.update();break;case XJ.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(J),this.update();break;case XJ.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(J),this.update();break;default:this.state=XJ.NONE}}function JD(J){if(this.enabled===!1)return;J.preventDefault()}function QD(J){if(J.key==="Control")this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}function $D(J){if(J.key==="Control")this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}function E8(J){if(J===void 0)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return J}function nX(J,Q){J.prototype=Object.create(Q.prototype),J.prototype.constructor=J,J.__proto__=Q}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var O9={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},eQ={duration:0.5,overwrite:!1,delay:0},CW,nJ,MJ,f9=1e8,FJ=1/f9,EW=Math.PI*2,ZD=EW/4,KD=0,iX=Math.sqrt,WD=Math.cos,HD=Math.sin,pJ=function(Q){return typeof Q==="string"},TJ=function(Q){return typeof Q==="function"},R8=function(Q){return typeof Q==="number"},_Z=function(Q){return typeof Q>"u"},Z8=function(Q){return typeof Q==="object"},E9=function(Q){return Q!==!1},AW=function(){return typeof window<"u"},kZ=function(Q){return TJ(Q)||pJ(Q)},oX=typeof ArrayBuffer==="function"&&ArrayBuffer.isView||function(){},$9=Array.isArray,YD=/random\([^)]+\)/g,XD=/,\s*/g,gX=/(?:-?\.?\d|\.)+/gi,PW=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,R7=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,XW=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,SW=/[+-]=-?[.\d]+/,UD=/[^,'"\[\]\s]+/gi,GD=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,CJ,Q8,OW,wW,I9={},AZ={},aX,rX=function(Q){return(AZ=ZQ(Q,I9))&&Z9},jZ=function(Q,$){return console.warn("Invalid property",Q,"set to",$,"Missing plugin? gsap.registerPlugin()")},J$=function(Q,$){return!$&&console.warn(Q)},tX=function(Q,$){return Q&&(I9[Q]=$)&&AZ&&(AZ[Q]=$)||I9},Q$=function(){return 0},qD={suppressEvents:!0,isStart:!0,kill:!1},zZ={suppressEvents:!0,kill:!1},ND={suppressEvents:!0},TW={},f8=[],RW={},eX,F9={},UW={},mX=30,IZ=[],_W="",jW=function(Q){var $=Q[0],Z,K;if(Z8($)||TJ($)||(Q=[Q]),!(Z=($._gsap||{}).harness)){K=IZ.length;while(K--&&!IZ[K].targetTest($));Z=IZ[K]}K=Q.length;while(K--)Q[K]&&(Q[K]._gsap||(Q[K]._gsap=new xW(Q[K],Z)))||Q.splice(K,1);return Q},x8=function(Q){return Q._gsap||jW(x9(Q))[0]._gsap},bW=function(Q,$,Z){return(Z=Q[$])&&TJ(Z)?Q[$]():_Z(Z)&&Q.getAttribute&&Q.getAttribute($)||Z},Y9=function(Q,$){return(Q=Q.split(",")).forEach($)||Q},_J=function(Q){return Math.round(Q*1e5)/1e5||0},IJ=function(Q){return Math.round(Q*1e7)/1e7||0},L7=function(Q,$){var Z=$.charAt(0),K=parseFloat($.substr(2));return Q=parseFloat(Q),Z==="+"?Q+K:Z==="-"?Q-K:Z==="*"?Q*K:Q/K},FD=function(Q,$){var Z=$.length,K=0;for(;Q.indexOf($[K])<0&&++K<Z;);return K<Z},PZ=function(){var Q=f8.length,$=f8.slice(0),Z,K;RW={},f8.length=0;for(Z=0;Z<Q;Z++)K=$[Z],K&&K._lazy&&(K.render(K._lazy[0],K._lazy[1],!0)._lazy=0)},yW=function(Q){return!!(Q._initted||Q._startAt||Q.add)},JU=function(Q,$,Z,K){f8.length&&!nJ&&PZ(),Q.render($,Z,K||!!(nJ&&$<0&&yW(Q))),f8.length&&!nJ&&PZ()},QU=function(Q){var $=parseFloat(Q);return($||$===0)&&(Q+"").match(UD).length<2?$:pJ(Q)?Q.trim():Q},$U=function(Q){return Q},R9=function(Q,$){for(var Z in $)Z in Q||(Q[Z]=$[Z]);return Q},DD=function(Q){return function($,Z){for(var K in Z)K in $||K==="duration"&&Q||K==="ease"||($[K]=Z[K])}},ZQ=function(Q,$){for(var Z in $)Q[Z]=$[Z];return Q},pX=function J(Q,$){for(var Z in $)Z!=="__proto__"&&Z!=="constructor"&&Z!=="prototype"&&(Q[Z]=Z8($[Z])?J(Q[Z]||(Q[Z]={}),$[Z]):$[Z]);return Q},SZ=function(Q,$){var Z={},K;for(K in Q)K in $||(Z[K]=Q[K]);return Z},aQ=function(Q){var $=Q.parent||CJ,Z=Q.keyframes?DD($9(Q.keyframes)):R9;if(E9(Q.inherit))while($)Z(Q,$.vars.defaults),$=$.parent||$._dp;return Q},ED=function(Q,$){var Z=Q.length,K=Z===$.length;while(K&&Z--&&Q[Z]===$[Z]);return Z<0},ZU=function(Q,$,Z,K,W){if(Z===void 0)Z="_first";if(K===void 0)K="_last";var H=Q[K],Y;if(W){Y=$[W];while(H&&H[W]>Y)H=H._prev}if(H)$._next=H._next,H._next=$;else $._next=Q[Z],Q[Z]=$;if($._next)$._next._prev=$;else Q[K]=$;return $._prev=H,$.parent=$._dp=Q,$},K$=function(Q,$,Z,K){if(Z===void 0)Z="_first";if(K===void 0)K="_last";var{_prev:W,_next:H}=$;if(W)W._next=H;else if(Q[Z]===$)Q[Z]=H;if(H)H._prev=W;else if(Q[K]===$)Q[K]=W;$._next=$._prev=$.parent=null},h8=function(Q,$){Q.parent&&(!$||Q.parent.autoRemoveChildren)&&Q.parent.remove&&Q.parent.remove(Q),Q._act=0},D7=function(Q,$){if(Q&&(!$||$._end>Q._dur||$._start<0)){var Z=Q;while(Z)Z._dirty=1,Z=Z.parent}return Q},OD=function(Q){var $=Q.parent;while($&&$.parent)$._dirty=1,$.totalDuration(),$=$.parent;return Q},LW=function(Q,$,Z,K){return Q._startAt&&(nJ?Q._startAt.revert(zZ):Q.vars.immediateRender&&!Q.vars.autoRevert||Q._startAt.render($,!0,K))},RD=function J(Q){return!Q||Q._ts&&J(Q.parent)},dX=function(Q){return Q._repeat?KQ(Q._tTime,Q=Q.duration()+Q._rDelay)*Q:0},KQ=function(Q,$){var Z=Math.floor(Q=IJ(Q/$));return Q&&Z===Q?Z-1:Z},wZ=function(Q,$){return(Q-$._start)*$._ts+($._ts>=0?0:$._dirty?$.totalDuration():$._tDur)},bZ=function(Q){return Q._end=IJ(Q._start+(Q._tDur/Math.abs(Q._ts||Q._rts||FJ)||0))},yZ=function(Q,$){var Z=Q._dp;if(Z&&Z.smoothChildTiming&&Q._ts)Q._start=IJ(Z._time-(Q._ts>0?$/Q._ts:((Q._dirty?Q.totalDuration():Q._tDur)-$)/-Q._ts)),bZ(Q),Z._dirty||D7(Z,Q);return Q},KU=function(Q,$){var Z;if($._time||!$._dur&&$._initted||$._start<Q._time&&($._dur||!$.add)){if(Z=wZ(Q.rawTime(),$),!$._dur||W$(0,$.totalDuration(),Z)-$._tTime>FJ)$.render(Z,!0)}if(D7(Q,$)._dp&&Q._initted&&Q._time>=Q._dur&&Q._ts){if(Q._dur<Q.duration()){Z=Q;while(Z._dp)Z.rawTime()>=0&&Z.totalTime(Z._tTime),Z=Z._dp}Q._zTime=-FJ}},$8=function(Q,$,Z,K){return $.parent&&h8($),$._start=IJ((R8(Z)?Z:Z||Q!==CJ?y9(Q,Z,$):Q._time)+$._delay),$._end=IJ($._start+($.totalDuration()/Math.abs($.timeScale())||0)),ZU(Q,$,"_first","_last",Q._sort?"_start":0),BW($)||(Q._recent=$),K||KU(Q,$),Q._ts<0&&yZ(Q,Q._tTime),Q},WU=function(Q,$){return(I9.ScrollTrigger||jZ("scrollTrigger",$))&&I9.ScrollTrigger.create($,Q)},HU=function(Q,$,Z,K,W){if(gW(Q,$,W),!Q._initted)return 1;if(!Z&&Q._pt&&!nJ&&(Q._dur&&Q.vars.lazy!==!1||!Q._dur&&Q.vars.lazy)&&eX!==D9.frame)return f8.push(Q),Q._lazy=[W,K],1},LD=function J(Q){var $=Q.parent;return $&&$._ts&&$._initted&&!$._lock&&($.rawTime()<0||J($))},BW=function(Q){var $=Q.data;return $==="isFromStart"||$==="isStart"},BD=function(Q,$,Z,K){var W=Q.ratio,H=$<0||!$&&(!Q._start&&LD(Q)&&!(!Q._initted&&BW(Q))||(Q._ts<0||Q._dp._ts<0)&&!BW(Q))?0:1,Y=Q._rDelay,X=0,U,G,N;if(Y&&Q._repeat){if(X=W$(0,Q._tDur,$),G=KQ(X,Y),Q._yoyo&&G&1&&(H=1-H),G!==KQ(Q._tTime,Y))W=1-H,Q.vars.repeatRefresh&&Q._initted&&Q.invalidate()}if(H!==W||nJ||K||Q._zTime===FJ||!$&&Q._zTime){if(!Q._initted&&HU(Q,$,K,Z,X))return;N=Q._zTime,Q._zTime=$||(Z?FJ:0),Z||(Z=$&&!N),Q.ratio=H,Q._from&&(H=1-H),Q._time=0,Q._tTime=X,U=Q._pt;while(U)U.r(H,U.d),U=U._next;if($<0&&LW(Q,$,Z,!0),Q._onUpdate&&!Z&&z9(Q,"onUpdate"),X&&Q._repeat&&!Z&&Q.parent&&z9(Q,"onRepeat"),($>=Q._tDur||$<0)&&Q.ratio===H){if(H&&h8(Q,1),!Z&&!nJ)z9(Q,H?"onComplete":"onReverseComplete",!0),Q._prom&&Q._prom()}}else if(!Q._zTime)Q._zTime=$},MD=function(Q,$,Z){var K;if(Z>$){K=Q._first;while(K&&K._start<=Z){if(K.data==="isPause"&&K._start>$)return K;K=K._next}}else{K=Q._last;while(K&&K._start>=Z){if(K.data==="isPause"&&K._start<$)return K;K=K._prev}}},WQ=function(Q,$,Z,K){var W=Q._repeat,H=IJ($)||0,Y=Q._tTime/Q._tDur;return Y&&!K&&(Q._time*=H/Q._dur),Q._dur=H,Q._tDur=!W?H:W<0?10000000000:IJ(H*(W+1)+Q._rDelay*W),Y>0&&!K&&yZ(Q,Q._tTime=Q._tDur*Y),Q.parent&&bZ(Q),Z||D7(Q.parent,Q),Q},uX=function(Q){return Q instanceof Q9?D7(Q):WQ(Q,Q._dur)},VD={_start:0,endTime:Q$,totalDuration:Q$},y9=function J(Q,$,Z){var K=Q.labels,W=Q._recent||VD,H=Q.duration()>=f9?W.endTime(!1):Q._dur,Y,X,U;if(pJ($)&&(isNaN($)||($ in K))){if(X=$.charAt(0),U=$.substr(-1)==="%",Y=$.indexOf("="),X==="<"||X===">")return Y>=0&&($=$.replace(/=/,"")),(X==="<"?W._start:W.endTime(W._repeat>=0))+(parseFloat($.substr(1))||0)*(U?(Y<0?W:Z).totalDuration()/100:1);if(Y<0)return $ in K||(K[$]=H),K[$];if(X=parseFloat($.charAt(Y-1)+$.substr(Y+1)),U&&Z)X=X/100*($9(Z)?Z[0]:Z).totalDuration();return Y>1?J(Q,$.substr(0,Y-1),Z)+X:H+X}return $==null?H:+$},rQ=function(Q,$,Z){var K=R8($[1]),W=(K?2:1)+(Q<2?0:1),H=$[W],Y,X;if(K&&(H.duration=$[1]),H.parent=Z,Q){Y=H,X=Z;while(X&&!("immediateRender"in Y))Y=X.vars.defaults||{},X=E9(X.vars.inherit)&&X.parent;H.immediateRender=E9(Y.immediateRender),Q<2?H.runBackwards=1:H.startAt=$[W-1]}return new yJ($[0],H,$[W+1])},v8=function(Q,$){return Q||Q===0?$(Q):$},W$=function(Q,$,Z){return Z<Q?Q:Z>$?$:Z},iJ=function(Q,$){return!pJ(Q)||!($=GD.exec(Q))?"":$[1]},kD=function(Q,$,Z){return v8(Z,function(K){return W$(Q,$,K)})},MW=[].slice,YU=function(Q,$){return Q&&Z8(Q)&&"length"in Q&&(!$&&!Q.length||(Q.length-1 in Q)&&Z8(Q[0]))&&!Q.nodeType&&Q!==Q8},zD=function(Q,$,Z){if(Z===void 0)Z=[];return Q.forEach(function(K){var W;return pJ(K)&&!$||YU(K,1)?(W=Z).push.apply(W,x9(K)):Z.push(K)})||Z},x9=function(Q,$,Z){return MJ&&!$&&MJ.selector?MJ.selector(Q):pJ(Q)&&!Z&&(OW||!HQ())?MW.call(($||wW).querySelectorAll(Q),0):$9(Q)?zD(Q,Z):YU(Q)?MW.call(Q,0):Q?[Q]:[]},VW=function(Q){return Q=x9(Q)[0]||J$("Invalid scope")||{},function($){var Z=Q.current||Q.nativeElement||Q;return x9($,Z.querySelectorAll?Z:Z===Q?J$("Invalid scope")||wW.createElement("div"):Q)}},XU=function(Q){return Q.sort(function(){return 0.5-Math.random()})},UU=function(Q){if(TJ(Q))return Q;var $=Z8(Q)?Q:{each:Q},Z=E7($.ease),K=$.from||0,W=parseFloat($.base)||0,H={},Y=K>0&&K<1,X=isNaN(K)||Y,U=$.axis,G=K,N=K;if(pJ(K))G=N={center:0.5,edges:0.5,end:1}[K]||0;else if(!Y&&X)G=K[0],N=K[1];return function(q,F,R){var O=(R||$).length,D=H[O],E,V,I,L,M,P,A,B,k;if(!D){if(k=$.grid==="auto"?0:($.grid||[1,f9])[1],!k){A=-f9;while(A<(A=R[k++].getBoundingClientRect().left)&&k<O);k<O&&k--}D=H[O]=[],E=X?Math.min(k,O)*G-0.5:K%k,V=k===f9?0:X?O*N/k-0.5:K/k|0,A=0,B=f9;for(P=0;P<O;P++)I=P%k-E,L=V-(P/k|0),D[P]=M=!U?iX(I*I+L*L):Math.abs(U==="y"?L:I),M>A&&(A=M),M<B&&(B=M);K==="random"&&XU(D),D.max=A-B,D.min=B,D.v=O=(parseFloat($.amount)||parseFloat($.each)*(k>O?O-1:!U?Math.max(k,O/k):U==="y"?O/k:k)||0)*(K==="edges"?-1:1),D.b=O<0?W-O:W,D.u=iJ($.amount||$.each)||0,Z=Z&&O<0?xD(Z):Z}return O=(D[q]-D.min)/D.max||0,IJ(D.b+(Z?Z(O):O)*D.v)+D.u}},kW=function(Q){var $=Math.pow(10,((Q+"").split(".")[1]||"").length);return function(Z){var K=IJ(Math.round(parseFloat(Z)/Q)*Q*$);return(K-K%1)/$+(R8(Z)?0:iJ(Z))}},GU=function(Q,$){var Z=$9(Q),K,W;if(!Z&&Z8(Q))if(K=Z=Q.radius||f9,Q.values){if(Q=x9(Q.values),W=!R8(Q[0]))K*=K}else Q=kW(Q.increment);return v8($,!Z?kW(Q):TJ(Q)?function(H){return W=Q(H),Math.abs(W-H)<=K?W:H}:function(H){var Y=parseFloat(W?H.x:H),X=parseFloat(W?H.y:0),U=f9,G=0,N=Q.length,q,F;while(N--){if(W)q=Q[N].x-Y,F=Q[N].y-X,q=q*q+F*F;else q=Math.abs(Q[N]-Y);if(q<U)U=q,G=N}return G=!K||U<=K?Q[G]:H,W||G===H||R8(H)?G:G+iJ(H)})},qU=function(Q,$,Z,K){return v8($9(Q)?!$:Z===!0?!!(Z=0):!K,function(){return $9(Q)?Q[~~(Math.random()*Q.length)]:(Z=Z||0.00001)&&(K=Z<1?Math.pow(10,(Z+"").length-2):1)&&Math.floor(Math.round((Q-Z/2+Math.random()*($-Q+Z*0.99))/Z)*Z*K)/K})},ID=function(){for(var Q=arguments.length,$=Array(Q),Z=0;Z<Q;Z++)$[Z]=arguments[Z];return function(K){return $.reduce(function(W,H){return H(W)},K)}},CD=function(Q,$){return function(Z){return Q(parseFloat(Z))+($||iJ(Z))}},AD=function(Q,$,Z){return FU(Q,$,0,1,Z)},NU=function(Q,$,Z){return v8(Z,function(K){return Q[~~$(K)]})},PD=function J(Q,$,Z){var K=$-Q;return $9(Q)?NU(Q,J(0,Q.length),$):v8(Z,function(W){return(K+(W-Q)%K)%K+Q})},SD=function J(Q,$,Z){var K=$-Q,W=K*2;return $9(Q)?NU(Q,J(0,Q.length-1),$):v8(Z,function(H){return H=(W+(H-Q)%W)%W||0,Q+(H>K?W-H:H)})},YQ=function(Q){return Q.replace(YD,function($){var Z=$.indexOf("[")+1,K=$.substring(Z||7,Z?$.indexOf("]"):$.length-1).split(XD);return qU(Z?K:+K[0],Z?0:+K[1],+K[2]||0.00001)})},FU=function(Q,$,Z,K,W){var H=$-Q,Y=K-Z;return v8(W,function(X){return Z+((X-Q)/H*Y||0)})},wD=function J(Q,$,Z,K){var W=isNaN(Q+$)?0:function(F){return(1-F)*Q+F*$};if(!W){var H=pJ(Q),Y={},X,U,G,N,q;if(Z===!0&&(K=1)&&(Z=null),H)Q={p:Q},$={p:$};else if($9(Q)&&!$9($)){G=[],N=Q.length,q=N-2;for(U=1;U<N;U++)G.push(J(Q[U-1],Q[U]));N--,W=function(R){R*=N;var O=Math.min(q,~~R);return G[O](R-O)},Z=$}else if(!K)Q=ZQ($9(Q)?[]:{},Q);if(!G){for(X in $)hW.call(Y,Q,X,"get",$[X]);W=function(R){return dW(R,Y)||(H?Q.p:Q)}}}return v8(Z,W)},lX=function(Q,$,Z){var K=Q.labels,W=f9,H,Y,X;for(H in K)if(Y=K[H]-$,Y<0===!!Z&&Y&&W>(Y=Math.abs(Y)))X=H,W=Y;return X},z9=function(Q,$,Z){var K=Q.vars,W=K[$],H=MJ,Y=Q._ctx,X,U,G;if(!W)return;return X=K[$+"Params"],U=K.callbackScope||Q,Z&&f8.length&&PZ(),Y&&(MJ=Y),G=X?W.apply(U,X):W.call(U),MJ=H,G},iQ=function(Q){return h8(Q),Q.scrollTrigger&&Q.scrollTrigger.kill(!!nJ),Q.progress()<1&&z9(Q,"onInterrupt"),Q},$Q,DU=[],EU=function(Q){if(!Q)return;if(Q=!Q.name&&Q.default||Q,AW()||Q.headless){var $=Q.name,Z=TJ(Q),K=$&&!Z&&Q.init?function(){this._props=[]}:Q,W={init:Q$,render:dW,add:hW,kill:sD,modifier:cD,rawVars:0},H={targetTest:0,get:0,getSetter:fZ,aliases:{},register:0};if(HQ(),Q!==K){if(F9[$])return;if(R9(K,R9(SZ(Q,W),H)),ZQ(K.prototype,ZQ(W,SZ(Q,H))),F9[K.prop=$]=K,Q.targetTest)IZ.push(K),TW[$]=1;$=($==="css"?"CSS":$.charAt(0).toUpperCase()+$.substr(1))+"Plugin"}tX($,K),Q.register&&Q.register(Z9,K,X9)}else DU.push(Q)},NJ=255,oQ={aqua:[0,NJ,NJ],lime:[0,NJ,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,NJ],navy:[0,0,128],white:[NJ,NJ,NJ],olive:[128,128,0],yellow:[NJ,NJ,0],orange:[NJ,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[NJ,0,0],pink:[NJ,192,203],cyan:[0,NJ,NJ],transparent:[NJ,NJ,NJ,0]},GW=function(Q,$,Z){return Q+=Q<0?1:Q>1?-1:0,(Q*6<1?$+(Z-$)*Q*6:Q<0.5?Z:Q*3<2?$+(Z-$)*(0.6666666666666666-Q)*6:$)*NJ+0.5|0},OU=function(Q,$,Z){var K=!Q?oQ.black:R8(Q)?[Q>>16,Q>>8&NJ,Q&NJ]:0,W,H,Y,X,U,G,N,q,F,R;if(!K){if(Q.substr(-1)===",")Q=Q.substr(0,Q.length-1);if(oQ[Q])K=oQ[Q];else if(Q.charAt(0)==="#"){if(Q.length<6)W=Q.charAt(1),H=Q.charAt(2),Y=Q.charAt(3),Q="#"+W+W+H+H+Y+Y+(Q.length===5?Q.charAt(4)+Q.charAt(4):"");if(Q.length===9)return K=parseInt(Q.substr(1,6),16),[K>>16,K>>8&NJ,K&NJ,parseInt(Q.substr(7),16)/255];Q=parseInt(Q.substr(1),16),K=[Q>>16,Q>>8&NJ,Q&NJ]}else if(Q.substr(0,3)==="hsl"){if(K=R=Q.match(gX),!$)X=+K[0]%360/360,U=+K[1]/100,G=+K[2]/100,H=G<=0.5?G*(U+1):G+U-G*U,W=G*2-H,K.length>3&&(K[3]*=1),K[0]=GW(X+0.3333333333333333,W,H),K[1]=GW(X,W,H),K[2]=GW(X-0.3333333333333333,W,H);else if(~Q.indexOf("="))return K=Q.match(PW),Z&&K.length<4&&(K[3]=1),K}else K=Q.match(gX)||oQ.transparent;K=K.map(Number)}if($&&!R){if(W=K[0]/NJ,H=K[1]/NJ,Y=K[2]/NJ,N=Math.max(W,H,Y),q=Math.min(W,H,Y),G=(N+q)/2,N===q)X=U=0;else F=N-q,U=G>0.5?F/(2-N-q):F/(N+q),X=N===W?(H-Y)/F+(H<Y?6:0):N===H?(Y-W)/F+2:(W-H)/F+4,X*=60;K[0]=~~(X+0.5),K[1]=~~(U*100+0.5),K[2]=~~(G*100+0.5)}return Z&&K.length<4&&(K[3]=1),K},RU=function(Q){var $=[],Z=[],K=-1;return Q.split(O8).forEach(function(W){var H=W.match(R7)||[];$.push.apply($,H),Z.push(K+=H.length+1)}),$.c=Z,$},cX=function(Q,$,Z){var K="",W=(Q+K).match(O8),H=$?"hsla(":"rgba(",Y=0,X,U,G,N;if(!W)return Q;if(W=W.map(function(q){return(q=OU(q,$,1))&&H+($?q[0]+","+q[1]+"%,"+q[2]+"%,"+q[3]:q.join(","))+")"}),Z){if(G=RU(Q),X=Z.c,X.join(K)!==G.c.join(K)){U=Q.replace(O8,"1").split(R7),N=U.length-1;for(;Y<N;Y++)K+=U[Y]+(~X.indexOf(Y)?W.shift()||H+"0,0,0,0)":(G.length?G:W.length?W:Z).shift())}}if(!U){U=Q.split(O8),N=U.length-1;for(;Y<N;Y++)K+=U[Y]+W[Y]}return K+U[N]},O8=function(){var J="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",Q;for(Q in oQ)J+="|"+Q+"\\b";return new RegExp(J+")","gi")}(),TD=/hsl[a]?\(/,fW=function(Q){var $=Q.join(" "),Z;if(O8.lastIndex=0,O8.test($))return Z=TD.test($),Q[1]=cX(Q[1],Z),Q[0]=cX(Q[0],Z,RU(Q[1])),!0},$$,D9=function(){var J=Date.now,Q=500,$=33,Z=J(),K=Z,W=4.166666666666667,H=W,Y=[],X,U,G,N,q,F,R=function O(D){var E=J()-K,V=D===!0,I,L,M,P;if((E>Q||E<0)&&(Z+=E-$),K+=E,M=K-Z,I=M-H,I>0||V)P=++N.frame,q=M-N.time*1000,N.time=M=M/1000,H+=I+(I>=W?4:W-I),L=1;if(V||(X=U(O)),L)for(F=0;F<Y.length;F++)Y[F](M,q,P,D)};return N={time:0,frame:0,tick:function(){R(!0)},deltaRatio:function(D){return q/(1000/(D||60))},wake:function(){if(aX){if(!OW&&AW())Q8=OW=window,wW=Q8.document||{},I9.gsap=Z9,(Q8.gsapVersions||(Q8.gsapVersions=[])).push(Z9.version),rX(AZ||Q8.GreenSockGlobals||!Q8.gsap&&Q8||{}),DU.forEach(EU);G=typeof requestAnimationFrame<"u"&&requestAnimationFrame,X&&N.sleep(),U=G||function(D){return setTimeout(D,H-N.time*1000+1|0)},$$=1,R(2)}},sleep:function(){(G?cancelAnimationFrame:clearTimeout)(X),$$=0,U=Q$},lagSmoothing:function(D,E){Q=D||1/0,$=Math.min(E||33,Q)},fps:function(D){W=1000/(D||240),H=N.time*1000+W},add:function(D,E,V){var I=E?function(L,M,P,A){D(L,M,P,A),N.remove(I)}:D;return N.remove(D),Y[V?"unshift":"push"](I),HQ(),I},remove:function(D,E){~(E=Y.indexOf(D))&&Y.splice(E,1)&&F>=E&&F--},_listeners:Y},N}(),HQ=function(){return!$$&&D9.wake()},r0={},_D=/^[\d.\-M][\d.\-,\s]/,jD=/["']/g,bD=function(Q){var $={},Z=Q.substr(1,Q.length-3).split(":"),K=Z[0],W=1,H=Z.length,Y,X,U;for(;W<H;W++)X=Z[W],Y=W!==H-1?X.lastIndexOf(","):X.length,U=X.substr(0,Y),$[K]=isNaN(U)?U.replace(jD,"").trim():+U,K=X.substr(Y+1).trim();return $},yD=function(Q){var $=Q.indexOf("(")+1,Z=Q.indexOf(")"),K=Q.indexOf("(",$);return Q.substring($,~K&&K<Z?Q.indexOf(")",Z+1):Z)},fD=function(Q){var $=(Q+"").split("("),Z=r0[$[0]];return Z&&$.length>1&&Z.config?Z.config.apply(null,~Q.indexOf("{")?[bD($[1])]:yD(Q).split(",").map(QU)):r0._CE&&_D.test(Q)?r0._CE("",Q):Z},xD=function(Q){return function($){return 1-Q(1-$)}},E7=function(Q,$){return!Q?$:(TJ(Q)?Q:r0[Q]||fD(Q))||$},B7=function(Q,$,Z,K){if(Z===void 0)Z=function(X){return 1-$(1-X)};if(K===void 0)K=function(X){return X<0.5?$(X*2)/2:1-$((1-X)*2)/2};var W={easeIn:$,easeOut:Z,easeInOut:K},H;return Y9(Q,function(Y){r0[Y]=I9[Y]=W,r0[H=Y.toLowerCase()]=Z;for(var X in W)r0[H+(X==="easeIn"?".in":X==="easeOut"?".out":".inOut")]=r0[Y+"."+X]=W[X]}),W},LU=function(Q){return function($){return $<0.5?(1-Q(1-$*2))/2:0.5+Q(($-0.5)*2)/2}},qW=function J(Q,$,Z){var K=$>=1?$:1,W=(Z||(Q?0.3:0.45))/($<1?$:1),H=W/EW*(Math.asin(1/K)||0),Y=function(G){return G===1?1:K*Math.pow(2,-10*G)*HD((G-H)*W)+1},X=Q==="out"?Y:Q==="in"?function(U){return 1-Y(1-U)}:LU(Y);return W=EW/W,X.config=function(U,G){return J(Q,U,G)},X},NW=function J(Q,$){if($===void 0)$=1.70158;var Z=function(H){return H?--H*H*(($+1)*H+$)+1:0},K=Q==="out"?Z:Q==="in"?function(W){return 1-Z(1-W)}:LU(Z);return K.config=function(W){return J(Q,W)},K};Y9("Linear,Quad,Cubic,Quart,Quint,Strong",function(J,Q){var $=Q<5?Q+1:Q;B7(J+",Power"+($-1),Q?function(Z){return Math.pow(Z,$)}:function(Z){return Z},function(Z){return 1-Math.pow(1-Z,$)},function(Z){return Z<0.5?Math.pow(Z*2,$)/2:1-Math.pow((1-Z)*2,$)/2})});r0.Linear.easeNone=r0.none=r0.Linear.easeIn;B7("Elastic",qW("in"),qW("out"),qW());(function(J,Q){var $=1/Q,Z=2*$,K=2.5*$,W=function(Y){return Y<$?J*Y*Y:Y<Z?J*Math.pow(Y-1.5/Q,2)+0.75:Y<K?J*(Y-=2.25/Q)*Y+0.9375:J*Math.pow(Y-2.625/Q,2)+0.984375};B7("Bounce",function(H){return 1-W(1-H)},W)})(7.5625,2.75);B7("Expo",function(J){return Math.pow(2,10*(J-1))*J+J*J*J*J*J*J*(1-J)});B7("Circ",function(J){return-(iX(1-J*J)-1)});B7("Sine",function(J){return J===1?1:-WD(J*ZD)+1});B7("Back",NW("in"),NW("out"),NW());r0.SteppedEase=r0.steps=I9.SteppedEase={config:function(Q,$){if(Q===void 0)Q=1;var Z=1/Q,K=Q+($?0:1),W=$?1:0,H=1-FJ;return function(Y){return((K*W$(0,H,Y)|0)+W)*Z}}};eQ.ease=r0["quad.out"];Y9("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(J){return _W+=J+","+J+"Params,"});var xW=function(Q,$){this.id=KD++,Q._gsap=this,this.target=Q,this.harness=$,this.get=$?$.get:bW,this.set=$?$.getSetter:fZ},Z$=function(){function J($){if(this.vars=$,this._delay=+$.delay||0,this._repeat=$.repeat===1/0?-2:$.repeat||0)this._rDelay=$.repeatDelay||0,this._yoyo=!!$.yoyo||!!$.yoyoEase;if(this._ts=1,WQ(this,+$.duration,1,1),this.data=$.data,MJ)this._ctx=MJ,MJ.data.push(this);$$||D9.wake()}var Q=J.prototype;return Q.delay=function(Z){if(Z||Z===0)return this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+Z-this._delay),this._delay=Z,this;return this._delay},Q.duration=function(Z){return arguments.length?this.totalDuration(this._repeat>0?Z+(Z+this._rDelay)*this._repeat:Z):this.totalDuration()&&this._dur},Q.totalDuration=function(Z){if(!arguments.length)return this._tDur;return this._dirty=0,WQ(this,this._repeat<0?Z:(Z-this._repeat*this._rDelay)/(this._repeat+1))},Q.totalTime=function(Z,K){if(HQ(),!arguments.length)return this._tTime;var W=this._dp;if(W&&W.smoothChildTiming&&this._ts){yZ(this,Z),!W._dp||W.parent||KU(W,this);while(W&&W.parent){if(W.parent._time!==W._start+(W._ts>=0?W._tTime/W._ts:(W.totalDuration()-W._tTime)/-W._ts))W.totalTime(W._tTime,!0);W=W.parent}if(!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&Z<this._tDur||this._ts<0&&Z>0||!this._tDur&&!Z))$8(this._dp,this,this._start-this._delay)}if(this._tTime!==Z||!this._dur&&!K||this._initted&&Math.abs(this._zTime)===FJ||!this._initted&&this._dur&&Z||!Z&&!this._initted&&(this.add||this._ptLookup))this._ts||(this._pTime=Z),JU(this,Z,K);return this},Q.time=function(Z,K){return arguments.length?this.totalTime(Math.min(this.totalDuration(),Z+dX(this))%(this._dur+this._rDelay)||(Z?this._dur:0),K):this._time},Q.totalProgress=function(Z,K){return arguments.length?this.totalTime(this.totalDuration()*Z,K):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},Q.progress=function(Z,K){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-Z:Z)+dX(this),K):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},Q.iteration=function(Z,K){var W=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(Z-1)*W,K):this._repeat?KQ(this._tTime,W)+1:1},Q.timeScale=function(Z,K){if(!arguments.length)return this._rts===-FJ?0:this._rts;if(this._rts===Z)return this;var W=this.parent&&this._ts?wZ(this.parent._time,this):this._tTime;return this._rts=+Z||0,this._ts=this._ps||Z===-FJ?0:this._rts,this.totalTime(W$(-Math.abs(this._delay),this.totalDuration(),W),K!==!1),bZ(this),OD(this)},Q.paused=function(Z){if(!arguments.length)return this._ps;if(this._ps!==Z)if(this._ps=Z,Z)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else HQ(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==FJ&&(this._tTime-=FJ));return this},Q.startTime=function(Z){if(arguments.length){this._start=IJ(Z);var K=this.parent||this._dp;return K&&(K._sort||!this.parent)&&$8(K,this,this._start-this._delay),this}return this._start},Q.endTime=function(Z){return this._start+(E9(Z)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},Q.rawTime=function(Z){var K=this.parent||this._dp;return!K?this._tTime:Z&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):!this._ts?this._tTime:wZ(K.rawTime(Z),this)},Q.revert=function(Z){if(Z===void 0)Z=ND;var K=nJ;if(nJ=Z,yW(this))this.timeline&&this.timeline.revert(Z),this.totalTime(-0.01,Z.suppressEvents);return this.data!=="nested"&&Z.kill!==!1&&this.kill(),nJ=K,this},Q.globalTime=function(Z){var K=this,W=arguments.length?Z:K.rawTime();while(K)W=K._start+W/(Math.abs(K._ts)||1),K=K._dp;return!this.parent&&this._sat?this._sat.globalTime(Z):W},Q.repeat=function(Z){if(arguments.length)return this._repeat=Z===1/0?-2:Z,uX(this);return this._repeat===-2?1/0:this._repeat},Q.repeatDelay=function(Z){if(arguments.length){var K=this._time;return this._rDelay=Z,uX(this),K?this.time(K):this}return this._rDelay},Q.yoyo=function(Z){if(arguments.length)return this._yoyo=Z,this;return this._yoyo},Q.seek=function(Z,K){return this.totalTime(y9(this,Z),E9(K))},Q.restart=function(Z,K){return this.play().totalTime(Z?-this._delay:0,E9(K)),this._dur||(this._zTime=-FJ),this},Q.play=function(Z,K){return Z!=null&&this.seek(Z,K),this.reversed(!1).paused(!1)},Q.reverse=function(Z,K){return Z!=null&&this.seek(Z||this.totalDuration(),K),this.reversed(!0).paused(!1)},Q.pause=function(Z,K){return Z!=null&&this.seek(Z,K),this.paused(!0)},Q.resume=function(){return this.paused(!1)},Q.reversed=function(Z){if(arguments.length)return!!Z!==this.reversed()&&this.timeScale(-this._rts||(Z?-FJ:0)),this;return this._rts<0},Q.invalidate=function(){return this._initted=this._act=0,this._zTime=-FJ,this},Q.isActive=function(){var Z=this.parent||this._dp,K=this._start,W;return!!(!Z||this._ts&&this._initted&&Z.isActive()&&(W=Z.rawTime(!0))>=K&&W<this.endTime(!0)-FJ)},Q.eventCallback=function(Z,K,W){var H=this.vars;if(arguments.length>1){if(!K)delete H[Z];else H[Z]=K,W&&(H[Z+"Params"]=W),Z==="onUpdate"&&(this._onUpdate=K);return this}return H[Z]},Q.then=function(Z){var K=this,W=K._prom;return new Promise(function(H){var Y=TJ(Z)?Z:$U,X=function(){var G=K.then;K.then=null,W&&W(),TJ(Y)&&(Y=Y(K))&&(Y.then||Y===K)&&(K.then=G),H(Y),K.then=G};if(K._initted&&K.totalProgress()===1&&K._ts>=0||!K._tTime&&K._ts<0)X();else K._prom=X})},Q.kill=function(){iQ(this)},J}();R9(Z$.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-FJ,_prom:0,_ps:!1,_rts:1});var Q9=function(J){nX(Q,J);function Q(Z,K){var W;if(Z===void 0)Z={};return W=J.call(this,Z)||this,W.labels={},W.smoothChildTiming=!!Z.smoothChildTiming,W.autoRemoveChildren=!!Z.autoRemoveChildren,W._sort=E9(Z.sortChildren),CJ&&$8(Z.parent||CJ,E8(W),K),Z.reversed&&W.reverse(),Z.paused&&W.paused(!0),Z.scrollTrigger&&WU(E8(W),Z.scrollTrigger),W}var $=Q.prototype;return $.to=function(K,W,H){return rQ(0,arguments,this),this},$.from=function(K,W,H){return rQ(1,arguments,this),this},$.fromTo=function(K,W,H,Y){return rQ(2,arguments,this),this},$.set=function(K,W,H){return W.duration=0,W.parent=this,aQ(W).repeatDelay||(W.repeat=0),W.immediateRender=!!W.immediateRender,new yJ(K,W,y9(this,H),1),this},$.call=function(K,W,H){return $8(this,yJ.delayedCall(0,K,W),H)},$.staggerTo=function(K,W,H,Y,X,U,G){return H.duration=W,H.stagger=H.stagger||Y,H.onComplete=U,H.onCompleteParams=G,H.parent=this,new yJ(K,H,y9(this,X)),this},$.staggerFrom=function(K,W,H,Y,X,U,G){return H.runBackwards=1,aQ(H).immediateRender=E9(H.immediateRender),this.staggerTo(K,W,H,Y,X,U,G)},$.staggerFromTo=function(K,W,H,Y,X,U,G,N){return Y.startAt=H,aQ(Y).immediateRender=E9(Y.immediateRender),this.staggerTo(K,W,Y,X,U,G,N)},$.render=function(K,W,H){var Y=this._time,X=this._dirty?this.totalDuration():this._tDur,U=this._dur,G=K<=0?0:IJ(K),N=this._zTime<0!==K<0&&(this._initted||!U),q,F,R,O,D,E,V,I,L,M,P,A;if(this!==CJ&&G>X&&K>=0&&(G=X),G!==this._tTime||H||N){if(Y!==this._time&&U)G+=this._time-Y,K+=this._time-Y;if(q=G,L=this._start,I=this._ts,E=!I,N)U||(Y=this._zTime),(K||!W)&&(this._zTime=K);if(this._repeat){if(P=this._yoyo,D=U+this._rDelay,this._repeat<-1&&K<0)return this.totalTime(D*100+K,W,H);if(q=IJ(G%D),G===X)O=this._repeat,q=U;else{if(M=IJ(G/D),O=~~M,O&&O===M)q=U,O--;q>U&&(q=U)}if(M=KQ(this._tTime,D),!Y&&this._tTime&&M!==O&&this._tTime-M*D-this._dur<=0&&(M=O),P&&O&1)q=U-q,A=1;if(O!==M&&!this._lock){var B=P&&M&1,k=B===(P&&O&1);if(O<M&&(B=!B),Y=B?0:G%U?U:G,this._lock=1,this.render(Y||(A?0:IJ(O*D)),W,!U)._lock=0,this._tTime=G,!W&&this.parent&&z9(this,"onRepeat"),this.vars.repeatRefresh&&!A)this.invalidate()._lock=1,M=O;if(Y&&Y!==this._time||E!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(U=this._dur,X=this._tDur,k)this._lock=2,Y=B?U:-0.0001,this.render(Y,!0),this.vars.repeatRefresh&&!A&&this.invalidate();if(this._lock=0,!this._ts&&!E)return this}}if(this._hasPause&&!this._forcing&&this._lock<2){if(V=MD(this,IJ(Y),IJ(q)),V)G-=q-(q=V._start)}if(this._tTime=G,this._time=q,this._act=!!I,!this._initted)this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=K,Y=0;if(!Y&&G&&U&&!W&&!M){if(z9(this,"onStart"),this._tTime!==G)return this}if(q>=Y&&K>=0){F=this._first;while(F){if(R=F._next,(F._act||q>=F._start)&&F._ts&&V!==F){if(F.parent!==this)return this.render(K,W,H);if(F.render(F._ts>0?(q-F._start)*F._ts:(F._dirty?F.totalDuration():F._tDur)+(q-F._start)*F._ts,W,H),q!==this._time||!this._ts&&!E){V=0,R&&(G+=this._zTime=-FJ);break}}F=R}}else{F=this._last;var b=K<0?K:q;while(F){if(R=F._prev,(F._act||b<=F._end)&&F._ts&&V!==F){if(F.parent!==this)return this.render(K,W,H);if(F.render(F._ts>0?(b-F._start)*F._ts:(F._dirty?F.totalDuration():F._tDur)+(b-F._start)*F._ts,W,H||nJ&&yW(F)),q!==this._time||!this._ts&&!E){V=0,R&&(G+=this._zTime=b?-FJ:FJ);break}}F=R}}if(V&&!W){if(this.pause(),V.render(q>=Y?0:-FJ)._zTime=q>=Y?1:-1,this._ts)return this._start=L,bZ(this),this.render(K,W,H)}if(this._onUpdate&&!W&&z9(this,"onUpdate",!0),G===X&&this._tTime>=this.totalDuration()||!G&&Y){if(L===this._start||Math.abs(I)!==Math.abs(this._ts)){if(!this._lock){if((K||!U)&&(G===X&&this._ts>0||!G&&this._ts<0)&&h8(this,1),!W&&!(K<0&&!Y)&&(G||Y||!X))z9(this,G===X&&K>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(G<X&&this.timeScale()>0)&&this._prom()}}}}return this},$.add=function(K,W){var H=this;if(R8(W)||(W=y9(this,W,K)),!(K instanceof Z$)){if($9(K))return K.forEach(function(Y){return H.add(Y,W)}),this;if(pJ(K))return this.addLabel(K,W);if(TJ(K))K=yJ.delayedCall(0,K);else return this}return this!==K?$8(this,K,W):this},$.getChildren=function(K,W,H,Y){if(K===void 0)K=!0;if(W===void 0)W=!0;if(H===void 0)H=!0;if(Y===void 0)Y=-f9;var X=[],U=this._first;while(U){if(U._start>=Y)if(U instanceof yJ)W&&X.push(U);else H&&X.push(U),K&&X.push.apply(X,U.getChildren(!0,W,H));U=U._next}return X},$.getById=function(K){var W=this.getChildren(1,1,1),H=W.length;while(H--)if(W[H].vars.id===K)return W[H]},$.remove=function(K){if(pJ(K))return this.removeLabel(K);if(TJ(K))return this.killTweensOf(K);if(K.parent===this&&K$(this,K),K===this._recent)this._recent=this._last;return D7(this)},$.totalTime=function(K,W){if(!arguments.length)return this._tTime;if(this._forcing=1,!this._dp&&this._ts)this._start=IJ(D9.time-(this._ts>0?K/this._ts:(this.totalDuration()-K)/-this._ts));return J.prototype.totalTime.call(this,K,W),this._forcing=0,this},$.addLabel=function(K,W){return this.labels[K]=y9(this,W),this},$.removeLabel=function(K){return delete this.labels[K],this},$.addPause=function(K,W,H){var Y=yJ.delayedCall(0,W||Q$,H);return Y.data="isPause",this._hasPause=1,$8(this,Y,y9(this,K))},$.removePause=function(K){var W=this._first;K=y9(this,K);while(W){if(W._start===K&&W.data==="isPause")h8(W);W=W._next}},$.killTweensOf=function(K,W,H){var Y=this.getTweensOf(K,H),X=Y.length;while(X--)y8!==Y[X]&&Y[X].kill(K,W);return this},$.getTweensOf=function(K,W){var H=[],Y=x9(K),X=this._first,U=R8(W),G;while(X){if(X instanceof yJ){if(FD(X._targets,Y)&&(U?(!y8||X._initted&&X._ts)&&X.globalTime(0)<=W&&X.globalTime(X.totalDuration())>W:!W||X.isActive()))H.push(X)}else if((G=X.getTweensOf(Y,W)).length)H.push.apply(H,G);X=X._next}return H},$.tweenTo=function(K,W){W=W||{};var H=this,Y=y9(H,K),X=W,U=X.startAt,G=X.onStart,N=X.onStartParams,q=X.immediateRender,F,R=yJ.to(H,R9({ease:W.ease||"none",lazy:!1,immediateRender:!1,time:Y,overwrite:"auto",duration:W.duration||Math.abs((Y-(U&&"time"in U?U.time:H._time))/H.timeScale())||FJ,onStart:function(){if(H.pause(),!F){var D=W.duration||Math.abs((Y-(U&&"time"in U?U.time:H._time))/H.timeScale());R._dur!==D&&WQ(R,D,0,1).render(R._time,!0,!0),F=1}G&&G.apply(R,N||[])}},W));return q?R.render(0):R},$.tweenFromTo=function(K,W,H){return this.tweenTo(W,R9({startAt:{time:y9(this,K)}},H))},$.recent=function(){return this._recent},$.nextLabel=function(K){if(K===void 0)K=this._time;return lX(this,y9(this,K))},$.previousLabel=function(K){if(K===void 0)K=this._time;return lX(this,y9(this,K),1)},$.currentLabel=function(K){return arguments.length?this.seek(K,!0):this.previousLabel(this._time+FJ)},$.shiftChildren=function(K,W,H){if(H===void 0)H=0;var Y=this._first,X=this.labels,U;K=IJ(K);while(Y){if(Y._start>=H)Y._start+=K,Y._end+=K;Y=Y._next}if(W){for(U in X)if(X[U]>=H)X[U]+=K}return D7(this)},$.invalidate=function(K){var W=this._first;this._lock=0;while(W)W.invalidate(K),W=W._next;return J.prototype.invalidate.call(this,K)},$.clear=function(K){if(K===void 0)K=!0;var W=this._first,H;while(W)H=W._next,this.remove(W),W=H;return this._dp&&(this._time=this._tTime=this._pTime=0),K&&(this.labels={}),D7(this)},$.totalDuration=function(K){var W=0,H=this,Y=H._last,X=f9,U,G,N;if(arguments.length)return H.timeScale((H._repeat<0?H.duration():H.totalDuration())/(H.reversed()?-K:K));if(H._dirty){N=H.parent;while(Y){if(U=Y._prev,Y._dirty&&Y.totalDuration(),G=Y._start,G>X&&H._sort&&Y._ts&&!H._lock)H._lock=1,$8(H,Y,G-Y._delay,1)._lock=0;else X=G;if(G<0&&Y._ts){if(W-=G,!N&&!H._dp||N&&N.smoothChildTiming)H._start+=IJ(G/H._ts),H._time-=G,H._tTime-=G;H.shiftChildren(-G,!1,-1/0),X=0}Y._end>W&&Y._ts&&(W=Y._end),Y=U}WQ(H,H===CJ&&H._time>W?H._time:W,1,1),H._dirty=0}return H._tDur},Q.updateRoot=function(K){if(CJ._ts)JU(CJ,wZ(K,CJ)),eX=D9.frame;if(D9.frame>=mX){mX+=O9.autoSleep||120;var W=CJ._first;if(!W||!W._ts){if(O9.autoSleep&&D9._listeners.length<2){while(W&&!W._ts)W=W._next;W||D9.sleep()}}}},Q}(Z$);R9(Q9.prototype,{_lock:0,_hasPause:0,_forcing:0});var hD=function(Q,$,Z,K,W,H,Y){var X=new X9(this._pt,Q,$,0,1,pW,null,W),U=0,G=0,N,q,F,R,O,D,E,V;if(X.b=Z,X.e=K,Z+="",K+="",E=~K.indexOf("random("))K=YQ(K);if(H)V=[Z,K],H(V,Q,$),Z=V[0],K=V[1];q=Z.match(XW)||[];while(N=XW.exec(K)){if(R=N[0],O=K.substring(U,N.index),F)F=(F+1)%5;else if(O.substr(-5)==="rgba(")F=1;if(R!==q[G++])D=parseFloat(q[G-1])||0,X._pt={_next:X._pt,p:O||G===1?O:",",s:D,c:R.charAt(1)==="="?L7(D,R)-D:parseFloat(R)-D,m:F&&F<4?Math.round:0},U=XW.lastIndex}if(X.c=U<K.length?K.substring(U,K.length):"",X.fp=Y,SW.test(K)||E)X.e=0;return this._pt=X,X},hW=function(Q,$,Z,K,W,H,Y,X,U,G){TJ(K)&&(K=K(W||0,Q,H));var N=Q[$],q=Z!=="get"?Z:!TJ(N)?N:U?Q[$.indexOf("set")||!TJ(Q["get"+$.substr(3)])?$:"get"+$.substr(3)](U):Q[$](),F=!TJ(N)?mW:U?dD:VU,R;if(pJ(K)){if(~K.indexOf("random("))K=YQ(K);if(K.charAt(1)==="="){if(R=L7(q,K)+(iJ(q)||0),R||R===0)K=R}}if(!G||q!==K||zW){if(!isNaN(q*K)&&K!=="")return R=new X9(this._pt,Q,$,+q||0,K-(q||0),typeof N==="boolean"?lD:kU,0,F),U&&(R.fp=U),Y&&R.modifier(Y,this,Q),this._pt=R;return!N&&!($ in Q)&&jZ($,K),hD.call(this,Q,$,q,K,F,X||O9.stringFilter,U)}},vD=function(Q,$,Z,K,W){if(TJ(Q)&&(Q=tQ(Q,W,$,Z,K)),!Z8(Q)||Q.style&&Q.nodeType||$9(Q)||oX(Q))return pJ(Q)?tQ(Q,W,$,Z,K):Q;var H={},Y;for(Y in Q)H[Y]=tQ(Q[Y],W,$,Z,K);return H},vW=function(Q,$,Z,K,W,H){var Y,X,U,G;if(F9[Q]&&(Y=new F9[Q]).init(W,Y.rawVars?$[Q]:vD($[Q],K,W,H,Z),Z,K,H)!==!1){if(Z._pt=X=new X9(Z._pt,W,Q,0,1,Y.render,Y,0,Y.priority),Z!==$Q){U=Z._ptLookup[Z._targets.indexOf(W)],G=Y._props.length;while(G--)U[Y._props[G]]=X}}return Y},y8,zW,gW=function J(Q,$,Z){var K=Q.vars,W=K.ease,H=K.startAt,Y=K.immediateRender,X=K.lazy,U=K.onUpdate,G=K.runBackwards,N=K.yoyoEase,q=K.keyframes,F=K.autoRevert,R=Q._dur,O=Q._startAt,D=Q._targets,E=Q.parent,V=E&&E.data==="nested"?E.vars.targets:D,I=Q._overwrite==="auto"&&!CW,L=Q.timeline,M=K.easeReverse||N,P,A,B,k,b,T,y,c,_,p,o,g,J0;if(L&&(!q||!W)&&(W="none"),Q._ease=E7(W,eQ.ease),Q._rEase=M&&(E7(M)||Q._ease),Q._from=!L&&!!K.runBackwards,Q._from)Q.ratio=1;if(!L||q&&!K.stagger){if(c=D[0]?x8(D[0]).harness:0,g=c&&K[c.prop],P=SZ(K,TW),O)O._zTime<0&&O.progress(1),$<0&&G&&Y&&!F?O.render(-1,!0):O.revert(G&&R?zZ:qD),O._lazy=0;if(H){if(h8(Q._startAt=yJ.set(D,R9({data:"isStart",overwrite:!1,parent:E,immediateRender:!0,lazy:!O&&E9(X),startAt:null,delay:0,onUpdate:U&&function(){return z9(Q,"onUpdate")},stagger:0},H))),Q._startAt._dp=0,Q._startAt._sat=Q,$<0&&(nJ||!Y&&!F)&&Q._startAt.revert(zZ),Y){if(R&&$<=0&&Z<=0){$&&(Q._zTime=$);return}}}else if(G&&R){if(!O){if($&&(Y=!1),B=R9({overwrite:!1,data:"isFromStart",lazy:Y&&!O&&E9(X),immediateRender:Y,stagger:0,parent:E},P),g&&(B[c.prop]=g),h8(Q._startAt=yJ.set(D,B)),Q._startAt._dp=0,Q._startAt._sat=Q,$<0&&(nJ?Q._startAt.revert(zZ):Q._startAt.render(-1,!0)),Q._zTime=$,!Y)J(Q._startAt,FJ,FJ);else if(!$)return}}Q._pt=Q._ptCache=0,X=R&&E9(X)||X&&!R;for(A=0;A<D.length;A++){if(b=D[A],y=b._gsap||jW(D)[A]._gsap,Q._ptLookup[A]=p={},RW[y.id]&&f8.length&&PZ(),o=V===D?A:V.indexOf(b),c&&(_=new c).init(b,g||P,Q,o,V)!==!1)Q._pt=k=new X9(Q._pt,b,_.name,0,1,_.render,_,0,_.priority),_._props.forEach(function(m){p[m]=k}),_.priority&&(T=1);if(!c||g)for(B in P)if(F9[B]&&(_=vW(B,P,Q,o,b,V)))_.priority&&(T=1);else p[B]=k=hW.call(Q,b,B,"get",P[B],o,V,0,K.stringFilter);if(Q._op&&Q._op[A]&&Q.kill(b,Q._op[A]),I&&Q._pt)y8=Q,CJ.killTweensOf(b,p,Q.globalTime($)),J0=!Q.parent,y8=0;Q._pt&&X&&(RW[y.id]=1)}T&&uW(Q),Q._onInit&&Q._onInit(Q)}Q._onUpdate=U,Q._initted=(!Q._op||Q._pt)&&!J0,q&&$<=0&&L.render(f9,!0,!0)},gD=function(Q,$,Z,K,W,H,Y,X){var U=(Q._pt&&Q._ptCache||(Q._ptCache={}))[$],G,N,q,F;if(!U){U=Q._ptCache[$]=[],q=Q._ptLookup,F=Q._targets.length;while(F--){if(G=q[F][$],G&&G.d&&G.d._pt){G=G.d._pt;while(G&&G.p!==$&&G.fp!==$)G=G._next}if(!G)return zW=1,Q.vars[$]="+=0",gW(Q,Y),zW=0,X?J$($+" not eligible for reset. Try splitting into individual properties"):1;U.push(G)}}F=U.length;while(F--)N=U[F],G=N._pt||N,G.s=(K||K===0)&&!W?K:G.s+(K||0)+H*G.c,G.c=Z-G.s,N.e&&(N.e=_J(Z)+iJ(N.e)),N.b&&(N.b=G.s+iJ(N.b))},mD=function(Q,$){var Z=Q[0]?x8(Q[0]).harness:0,K=Z&&Z.aliases,W,H,Y,X;if(!K)return $;W=ZQ({},$);for(H in K)if(H in W){X=K[H].split(","),Y=X.length;while(Y--)W[X[Y]]=W[H]}return W},pD=function(Q,$,Z,K){var W=$.ease||K||"power1.inOut",H,Y;if($9($))Y=Z[Q]||(Z[Q]=[]),$.forEach(function(X,U){return Y.push({t:U/($.length-1)*100,v:X,e:W})});else for(H in $)Y=Z[H]||(Z[H]=[]),H==="ease"||Y.push({t:parseFloat(Q),v:$[H],e:W})},tQ=function(Q,$,Z,K,W){return TJ(Q)?Q.call($,Z,K,W):pJ(Q)&&~Q.indexOf("random(")?YQ(Q):Q},BU=_W+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",MU={};Y9(BU+",id,stagger,delay,duration,paused,scrollTrigger",function(J){return MU[J]=1});var yJ=function(J){nX(Q,J);function Q(Z,K,W,H){var Y;if(typeof K==="number")W.duration=K,K=W,W=null;Y=J.call(this,H?K:aQ(K))||this;var X=Y.vars,U=X.duration,G=X.delay,N=X.immediateRender,q=X.stagger,F=X.overwrite,R=X.keyframes,O=X.defaults,D=X.scrollTrigger,E=K.parent||CJ,V=($9(Z)||oX(Z)?R8(Z[0]):("length"in K))?[Z]:x9(Z),I,L,M,P,A,B,k,b;if(Y._targets=V.length?jW(V):J$("GSAP target "+Z+" not found. https://gsap.com",!O9.nullTargetWarn)||[],Y._ptLookup=[],Y._overwrite=F,R||q||kZ(U)||kZ(G)){K=Y.vars;var T=K.easeReverse||K.yoyoEase;if(I=Y.timeline=new Q9({data:"nested",defaults:O||{},targets:E&&E.data==="nested"?E.vars.targets:V}),I.kill(),I.parent=I._dp=E8(Y),I._start=0,q||kZ(U)||kZ(G)){if(P=V.length,k=q&&UU(q),Z8(q)){for(A in q)if(~BU.indexOf(A))b||(b={}),b[A]=q[A]}for(L=0;L<P;L++){if(M=SZ(K,MU),M.stagger=0,T&&(M.easeReverse=T),b&&ZQ(M,b),B=V[L],M.duration=+tQ(U,E8(Y),L,B,V),M.delay=(+tQ(G,E8(Y),L,B,V)||0)-Y._delay,!q&&P===1&&M.delay)Y._delay=G=M.delay,Y._start+=G,M.delay=0;I.to(B,M,k?k(L,B,V):0),I._ease=r0.none}I.duration()?U=G=0:Y.timeline=0}else if(R){aQ(R9(I.vars.defaults,{ease:"none"})),I._ease=E7(R.ease||K.ease||"none");var y=0,c,_,p;if($9(R))R.forEach(function(o){return I.to(V,o,">")}),I.duration();else{M={};for(A in R)A==="ease"||A==="easeEach"||pD(A,R[A],M,R.easeEach);for(A in M){c=M[A].sort(function(o,g){return o.t-g.t}),y=0;for(L=0;L<c.length;L++)_=c[L],p={ease:_.e,duration:(_.t-(L?c[L-1].t:0))/100*U},p[A]=_.v,I.to(V,p,y),y+=p.duration}I.duration()<U&&I.to({},{duration:U-I.duration()})}}U||Y.duration(U=I.duration())}else Y.timeline=0;if(F===!0&&!CW)y8=E8(Y),CJ.killTweensOf(V),y8=0;if($8(E,E8(Y),W),K.reversed&&Y.reverse(),K.paused&&Y.paused(!0),N||!U&&!R&&Y._start===IJ(E._time)&&E9(N)&&RD(E8(Y))&&E.data!=="nested")Y._tTime=-FJ,Y.render(Math.max(0,-G)||0);return D&&WU(E8(Y),D),Y}var $=Q.prototype;return $.render=function(K,W,H){var Y=this._time,X=this._tDur,U=this._dur,G=K<0,N=K>X-FJ&&!G?X:K<FJ?0:K,q,F,R,O,D,E,V,I;if(!U)BD(this,K,W,H);else if(N!==this._tTime||!K||H||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==G||this._lazy){if(q=N,I=this.timeline,this._repeat){if(O=U+this._rDelay,this._repeat<-1&&G)return this.totalTime(O*100+K,W,H);if(q=IJ(N%O),N===X)R=this._repeat,q=U;else if(D=IJ(N/O),R=~~D,R&&R===D)q=U,R--;else if(q>U)q=U;if(E=this._yoyo&&R&1,E)q=U-q;if(D=KQ(this._tTime,O),q===Y&&!H&&this._initted&&R===D)return this._tTime=N,this;if(R!==D){if(this.vars.repeatRefresh&&!E&&!this._lock&&q!==O&&this._initted)this._lock=H=1,this.render(IJ(O*R),!0).invalidate()._lock=0}}if(!this._initted){if(HU(this,G?K:q,H,W,N))return this._tTime=0,this;if(Y!==this._time&&!(H&&this.vars.repeatRefresh&&R!==D))return this;if(U!==this._dur)return this.render(K,W,H)}if(this._rEase){var L=q<Y;if(L!==this._inv){var M=L?Y:U-Y;if(this._inv=L,this._from)this.ratio=1-this.ratio;this._invRatio=this.ratio,this._invTime=Y,this._invRecip=M?(L?-1:1)/M:0,this._invScale=L?-this.ratio:1-this.ratio,this._invEase=L?this._rEase:this._ease}this.ratio=V=this._invRatio+this._invScale*this._invEase((q-this._invTime)*this._invRecip)}else this.ratio=V=this._ease(q/U);if(this._from)this.ratio=V=1-V;if(this._tTime=N,this._time=q,!this._act&&this._ts)this._act=1,this._lazy=0;if(!Y&&N&&!W&&!D){if(z9(this,"onStart"),this._tTime!==N)return this}F=this._pt;while(F)F.r(V,F.d),F=F._next;if(I&&I.render(K<0?K:I._dur*I._ease(q/this._dur),W,H)||this._startAt&&(this._zTime=K),this._onUpdate&&!W)G&&LW(this,K,W,H),z9(this,"onUpdate");if(this._repeat&&R!==D&&this.vars.onRepeat&&!W&&this.parent&&z9(this,"onRepeat"),(N===this._tDur||!N)&&this._tTime===N){if(G&&!this._onUpdate&&LW(this,K,!0,!0),(K||!U)&&(N===this._tDur&&this._ts>0||!N&&this._ts<0)&&h8(this,1),!W&&!(G&&!Y)&&(N||Y||E))z9(this,N===X?"onComplete":"onReverseComplete",!0),this._prom&&!(N<X&&this.timeScale()>0)&&this._prom()}}return this},$.targets=function(){return this._targets},$.invalidate=function(K){return(!K||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(K),J.prototype.invalidate.call(this,K)},$.resetTo=function(K,W,H,Y,X){$$||D9.wake(),this._ts||this.play();var U=Math.min(this._dur,(this._dp._time-this._start)*this._ts),G;if(this._initted||gW(this,U),G=this._ease(U/this._dur),gD(this,K,W,H,Y,G,U,X))return this.resetTo(K,W,H,Y,1);return yZ(this,0),this.parent||ZU(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0)},$.kill=function(K,W){if(W===void 0)W="all";if(!K&&(!W||W==="all"))return this._lazy=this._pt=0,this.parent?iQ(this):this.scrollTrigger&&this.scrollTrigger.kill(!!nJ),this;if(this.timeline){var H=this.timeline.totalDuration();return this.timeline.killTweensOf(K,W,y8&&y8.vars.overwrite!==!0)._first||iQ(this),this.parent&&H!==this.timeline.totalDuration()&&WQ(this,this._dur*this.timeline._tDur/H,0,1),this}var Y=this._targets,X=K?x9(K):Y,U=this._ptLookup,G=this._pt,N,q,F,R,O,D,E;if((!W||W==="all")&&ED(Y,X))return W==="all"&&(this._pt=0),iQ(this);if(N=this._op=this._op||[],W!=="all"){if(pJ(W))O={},Y9(W,function(V){return O[V]=1}),W=O;W=mD(Y,W)}E=Y.length;while(E--)if(~X.indexOf(Y[E])){if(q=U[E],W==="all")N[E]=W,R=q,F={};else F=N[E]=N[E]||{},R=W;for(O in R){if(D=q&&q[O],D){if(!("kill"in D.d)||D.d.kill(O)===!0)K$(this,D,"_pt");delete q[O]}if(F!=="all")F[O]=1}}return this._initted&&!this._pt&&G&&iQ(this),this},Q.to=function(K,W){return new Q(K,W,arguments[2])},Q.from=function(K,W){return rQ(1,arguments)},Q.delayedCall=function(K,W,H,Y){return new Q(W,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:K,onComplete:W,onReverseComplete:W,onCompleteParams:H,onReverseCompleteParams:H,callbackScope:Y})},Q.fromTo=function(K,W,H){return rQ(2,arguments)},Q.set=function(K,W){return W.duration=0,W.repeatDelay||(W.repeat=0),new Q(K,W)},Q.killTweensOf=function(K,W,H){return CJ.killTweensOf(K,W,H)},Q}(Z$);R9(yJ.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Y9("staggerTo,staggerFrom,staggerFromTo",function(J){yJ[J]=function(){var Q=new Q9,$=MW.call(arguments,0);return $.splice(J==="staggerFromTo"?5:4,0,0),Q[J].apply(Q,$)}});var mW=function(Q,$,Z){return Q[$]=Z},VU=function(Q,$,Z){return Q[$](Z)},dD=function(Q,$,Z,K){return Q[$](K.fp,Z)},uD=function(Q,$,Z){return Q.setAttribute($,Z)},fZ=function(Q,$){return TJ(Q[$])?VU:_Z(Q[$])&&Q.setAttribute?uD:mW},kU=function(Q,$){return $.set($.t,$.p,Math.round(($.s+$.c*Q)*1e6)/1e6,$)},lD=function(Q,$){return $.set($.t,$.p,!!($.s+$.c*Q),$)},pW=function(Q,$){var Z=$._pt,K="";if(!Q&&$.b)K=$.b;else if(Q===1&&$.e)K=$.e;else{while(Z)K=Z.p+(Z.m?Z.m(Z.s+Z.c*Q):Math.round((Z.s+Z.c*Q)*1e4)/1e4)+K,Z=Z._next;K+=$.c}$.set($.t,$.p,K,$)},dW=function(Q,$){var Z=$._pt;while(Z)Z.r(Q,Z.d),Z=Z._next},cD=function(Q,$,Z,K){var W=this._pt,H;while(W)H=W._next,W.p===K&&W.modifier(Q,$,Z),W=H},sD=function(Q){var $=this._pt,Z,K;while($){if(K=$._next,$.p===Q&&!$.op||$.op===Q)K$(this,$,"_pt");else if(!$.dep)Z=1;$=K}return!Z},nD=function(Q,$,Z,K){K.mSet(Q,$,K.m.call(K.tween,Z,K.mt),K)},uW=function(Q){var $=Q._pt,Z,K,W,H;while($){Z=$._next,K=W;while(K&&K.pr>$.pr)K=K._next;if($._prev=K?K._prev:H)$._prev._next=$;else W=$;if($._next=K)K._prev=$;else H=$;$=Z}Q._pt=W},X9=function(){function J($,Z,K,W,H,Y,X,U,G){if(this.t=Z,this.s=W,this.c=H,this.p=K,this.r=Y||kU,this.d=X||this,this.set=U||mW,this.pr=G||0,this._next=$,$)$._prev=this}var Q=J.prototype;return Q.modifier=function(Z,K,W){this.mSet=this.mSet||this.set,this.set=nD,this.m=Z,this.mt=W,this.tween=K},J}();Y9(_W+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(J){return TW[J]=1});I9.TweenMax=I9.TweenLite=yJ;I9.TimelineLite=I9.TimelineMax=Q9;CJ=new Q9({sortChildren:!1,defaults:eQ,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});O9.stringFilter=fW;var O7=[],CZ={},iD=[],sX=0,oD=0,FW=function(Q){return(CZ[Q]||iD).map(function($){return $()})},IW=function(){var Q=Date.now(),$=[];if(Q-sX>2)FW("matchMediaInit"),O7.forEach(function(Z){var{queries:K,conditions:W}=Z,H,Y,X,U;for(Y in K)if(H=Q8.matchMedia(K[Y]).matches,H&&(X=1),H!==W[Y])W[Y]=H,U=1;if(U)Z.revert(),X&&$.push(Z)}),FW("matchMediaRevert"),$.forEach(function(Z){return Z.onMatch(Z,function(K){return Z.add(null,K)})}),sX=Q,FW("matchMedia")},zU=function(){function J($,Z){this.selector=Z&&VW(Z),this.data=[],this._r=[],this.isReverted=!1,this.id=oD++,$&&this.add($)}var Q=J.prototype;return Q.add=function(Z,K,W){if(TJ(Z))W=K,K=Z,Z=TJ;var H=this,Y=function(){var U=MJ,G=H.selector,N;return U&&U!==H&&U.data.push(H),W&&(H.selector=VW(W)),MJ=H,N=K.apply(H,arguments),TJ(N)&&H._r.push(N),MJ=U,H.selector=G,H.isReverted=!1,N};return H.last=Y,Z===TJ?Y(H,function(X){return H.add(null,X)}):Z?H[Z]=Y:Y},Q.ignore=function(Z){var K=MJ;MJ=null,Z(this),MJ=K},Q.getTweens=function(){var Z=[];return this.data.forEach(function(K){return K instanceof J?Z.push.apply(Z,K.getTweens()):K instanceof yJ&&!(K.parent&&K.parent.data==="nested")&&Z.push(K)}),Z},Q.clear=function(){this._r.length=this.data.length=0},Q.kill=function(Z,K){var W=this;if(Z)(function(){var Y=W.getTweens(),X=W.data.length,U;while(X--)if(U=W.data[X],U.data==="isFlip")U.revert(),U.getChildren(!0,!0,!1).forEach(function(G){return Y.splice(Y.indexOf(G),1)});Y.map(function(G){return{g:G._dur||G._delay||G._sat&&!G._sat.vars.immediateRender?G.globalTime(0):-1/0,t:G}}).sort(function(G,N){return N.g-G.g||-1/0}).forEach(function(G){return G.t.revert(Z)}),X=W.data.length;while(X--)if(U=W.data[X],U instanceof Q9){if(U.data!=="nested")U.scrollTrigger&&U.scrollTrigger.revert(),U.kill()}else!(U instanceof yJ)&&U.revert&&U.revert(Z);W._r.forEach(function(G){return G(Z,W)}),W.isReverted=!0})();else this.data.forEach(function(Y){return Y.kill&&Y.kill()});if(this.clear(),K){var H=O7.length;while(H--)O7[H].id===this.id&&O7.splice(H,1)}},Q.revert=function(Z){this.kill(Z||{})},J}(),aD=function(){function J($){this.contexts=[],this.scope=$,MJ&&MJ.data.push(this)}var Q=J.prototype;return Q.add=function(Z,K,W){Z8(Z)||(Z={matches:Z});var H=new zU(0,W||this.scope),Y=H.conditions={},X,U,G;MJ&&!H.selector&&(H.selector=MJ.selector),this.contexts.push(H),K=H.add("onMatch",K),H.queries=Z;for(U in Z)if(U==="all")G=1;else if(X=Q8.matchMedia(Z[U]),X)O7.indexOf(H)<0&&O7.push(H),(Y[U]=X.matches)&&(G=1),X.addListener?X.addListener(IW):X.addEventListener("change",IW);return G&&K(H,function(N){return H.add(null,N)}),this},Q.revert=function(Z){this.kill(Z||{})},Q.kill=function(Z){this.contexts.forEach(function(K){return K.kill(Z,!0)})},J}(),TZ={registerPlugin:function(){for(var Q=arguments.length,$=Array(Q),Z=0;Z<Q;Z++)$[Z]=arguments[Z];$.forEach(function(K){return EU(K)})},timeline:function(Q){return new Q9(Q)},getTweensOf:function(Q,$){return CJ.getTweensOf(Q,$)},getProperty:function(Q,$,Z,K){pJ(Q)&&(Q=x9(Q)[0]);var W=x8(Q||{}).get,H=Z?$U:QU;return Z==="native"&&(Z=""),!Q?Q:!$?function(Y,X,U){return H((F9[Y]&&F9[Y].get||W)(Q,Y,X,U))}:H((F9[$]&&F9[$].get||W)(Q,$,Z,K))},quickSetter:function(Q,$,Z){if(Q=x9(Q),Q.length>1){var K=Q.map(function(G){return Z9.quickSetter(G,$,Z)}),W=K.length;return function(G){var N=W;while(N--)K[N](G)}}Q=Q[0]||{};var H=F9[$],Y=x8(Q),X=Y.harness&&(Y.harness.aliases||{})[$]||$,U=H?function(G){var N=new H;$Q._pt=0,N.init(Q,Z?G+Z:G,$Q,0,[Q]),N.render(1,N),$Q._pt&&dW(1,$Q)}:Y.set(Q,X);return H?U:function(G){return U(Q,X,Z?G+Z:G,Y,1)}},quickTo:function(Q,$,Z){var K,W=Z9.to(Q,R9((K={},K[$]="+=0.1",K.paused=!0,K.stagger=0,K),Z||{})),H=function(X,U,G){return W.resetTo($,X,U,G)};return H.tween=W,H},isTweening:function(Q){return CJ.getTweensOf(Q,!0).length>0},defaults:function(Q){return Q&&Q.ease&&(Q.ease=E7(Q.ease,eQ.ease)),pX(eQ,Q||{})},config:function(Q){return pX(O9,Q||{})},registerEffect:function(Q){var{name:$,effect:Z,plugins:K,defaults:W,extendTimeline:H}=Q;if((K||"").split(",").forEach(function(Y){return Y&&!F9[Y]&&!I9[Y]&&J$($+" effect requires "+Y+" plugin.")}),UW[$]=function(Y,X,U){return Z(x9(Y),R9(X||{},W),U)},H)Q9.prototype[$]=function(Y,X,U){return this.add(UW[$](Y,Z8(X)?X:(U=X)&&{},this),U)}},registerEase:function(Q,$){r0[Q]=E7($)},parseEase:function(Q,$){return arguments.length?E7(Q,$):r0},getById:function(Q){return CJ.getById(Q)},exportRoot:function(Q,$){if(Q===void 0)Q={};var Z=new Q9(Q),K,W;Z.smoothChildTiming=E9(Q.smoothChildTiming),CJ.remove(Z),Z._dp=0,Z._time=Z._tTime=CJ._time,K=CJ._first;while(K){if(W=K._next,$||!(!K._dur&&K instanceof yJ&&K.vars.onComplete===K._targets[0]))$8(Z,K,K._start-K._delay);K=W}return $8(CJ,Z,0),Z},context:function(Q,$){return Q?new zU(Q,$):MJ},matchMedia:function(Q){return new aD(Q)},matchMediaRefresh:function(){return O7.forEach(function(Q){var $=Q.conditions,Z,K;for(K in $)if($[K])$[K]=!1,Z=1;Z&&Q.revert()})||IW()},addEventListener:function(Q,$){var Z=CZ[Q]||(CZ[Q]=[]);~Z.indexOf($)||Z.push($)},removeEventListener:function(Q,$){var Z=CZ[Q],K=Z&&Z.indexOf($);K>=0&&Z.splice(K,1)},utils:{wrap:PD,wrapYoyo:SD,distribute:UU,random:qU,snap:GU,normalize:AD,getUnit:iJ,clamp:kD,splitColor:OU,toArray:x9,selector:VW,mapRange:FU,pipe:ID,unitize:CD,interpolate:wD,shuffle:XU},install:rX,effects:UW,ticker:D9,updateRoot:Q9.updateRoot,plugins:F9,globalTimeline:CJ,core:{PropTween:X9,globals:tX,Tween:yJ,Timeline:Q9,Animation:Z$,getCache:x8,_removeLinkedListItem:K$,reverting:function(){return nJ},context:function(Q){if(Q&&MJ)MJ.data.push(Q),Q._ctx=MJ;return MJ},suppressOverwrites:function(Q){return CW=Q}}};Y9("to,from,fromTo,delayedCall,set,killTweensOf",function(J){return TZ[J]=yJ[J]});D9.add(Q9.updateRoot);$Q=TZ.to({},{duration:0});var rD=function(Q,$){var Z=Q._pt;while(Z&&Z.p!==$&&Z.op!==$&&Z.fp!==$)Z=Z._next;return Z},tD=function(Q,$){var Z=Q._targets,K,W,H;for(K in $){W=Z.length;while(W--)if(H=Q._ptLookup[W][K],H&&(H=H.d)){if(H._pt)H=rD(H,K);H&&H.modifier&&H.modifier($[K],Q,Z[W],K)}}},DW=function(Q,$){return{name:Q,headless:1,rawVars:1,init:function(K,W,H){H._onInit=function(Y){var X,U;if(pJ(W))X={},Y9(W,function(G){return X[G]=1}),W=X;if($){X={};for(U in W)X[U]=$(W[U]);W=X}tD(Y,W)}}}},Z9=TZ.registerPlugin({name:"attr",init:function(Q,$,Z,K,W){var H,Y,X;this.tween=Z;for(H in $)X=Q.getAttribute(H)||"",Y=this.add(Q,"setAttribute",(X||0)+"",$[H],K,W,0,0,H),Y.op=H,Y.b=X,this._props.push(H)},render:function(Q,$){var Z=$._pt;while(Z)nJ?Z.set(Z.t,Z.p,Z.b,Z):Z.r(Q,Z.d),Z=Z._next}},{name:"endArray",headless:1,init:function(Q,$){var Z=$.length;while(Z--)this.add(Q,Z,Q[Z]||0,$[Z],0,0,0,0,0,1)}},DW("roundProps",kW),DW("modifiers"),DW("snap",GU))||TZ;yJ.version=Q9.version=Z9.version="3.15.0";aX=1;AW()&&HQ();var{Power0:eD,Power1:JE,Power2:QE,Power3:$E,Power4:ZE,Linear:KE,Quad:WE,Cubic:HE,Quart:YE,Quint:XE,Strong:UE,Elastic:GE,Back:qE,SteppedEase:NE,Bounce:FE,Sine:DE,Expo:EE,Circ:OE}=r0;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var IU,g8,UQ,oW,z7,RE,CU,aW,LE=function(){return typeof window<"u"},B8={},k7=180/Math.PI,GQ=Math.PI/180,XQ=Math.atan2,AU=1e8,rW=/([A-Z])/g,BE=/(left|right|width|margin|padding|x)/i,ME=/[\s,\(]\S/,K8={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},cW=function(Q,$){return $.set($.t,$.p,Math.round(($.s+$.c*Q)*1e4)/1e4+$.u,$)},VE=function(Q,$){return $.set($.t,$.p,Q===1?$.e:Math.round(($.s+$.c*Q)*1e4)/1e4+$.u,$)},kE=function(Q,$){return $.set($.t,$.p,Q?Math.round(($.s+$.c*Q)*1e4)/1e4+$.u:$.b,$)},zE=function(Q,$){return $.set($.t,$.p,Q===1?$.e:Q?Math.round(($.s+$.c*Q)*1e4)/1e4+$.u:$.b,$)},IE=function(Q,$){var Z=$.s+$.c*Q;$.set($.t,$.p,~~(Z+(Z<0?-0.5:0.5))+$.u,$)},yU=function(Q,$){return $.set($.t,$.p,Q?$.e:$.b,$)},fU=function(Q,$){return $.set($.t,$.p,Q!==1?$.b:$.e,$)},CE=function(Q,$,Z){return Q.style[$]=Z},AE=function(Q,$,Z){return Q.style.setProperty($,Z)},PE=function(Q,$,Z){return Q._gsap[$]=Z},SE=function(Q,$,Z){return Q._gsap.scaleX=Q._gsap.scaleY=Z},wE=function(Q,$,Z,K,W){var H=Q._gsap;H.scaleX=H.scaleY=Z,H.renderTransform(W,H)},TE=function(Q,$,Z,K,W){var H=Q._gsap;H[$]=Z,H.renderTransform(W,H)},AJ="transform",L9=AJ+"Origin",_E=function J(Q,$){var Z=this,K=this.target,W=K.style,H=K._gsap;if(Q in B8&&W){if(this.tfm=this.tfm||{},Q!=="transform")Q=K8[Q]||Q,~Q.indexOf(",")?Q.split(",").forEach(function(Y){return Z.tfm[Y]=L8(K,Y)}):this.tfm[Q]=H.x?H[Q]:L8(K,Q),Q===L9&&(this.tfm.zOrigin=H.zOrigin);else return K8.transform.split(",").forEach(function(Y){return J.call(Z,Y,$)});if(this.props.indexOf(AJ)>=0)return;if(H.svg)this.svgo=K.getAttribute("data-svg-origin"),this.props.push(L9,$,"");Q=AJ}(W||$)&&this.props.push(Q,$,W[Q])},xU=function(Q){if(Q.translate)Q.removeProperty("translate"),Q.removeProperty("scale"),Q.removeProperty("rotate")},jE=function(){var Q=this.props,$=this.target,Z=$.style,K=$._gsap,W,H;for(W=0;W<Q.length;W+=3)if(!Q[W+1])Q[W+2]?Z[Q[W]]=Q[W+2]:Z.removeProperty(Q[W].substr(0,2)==="--"?Q[W]:Q[W].replace(rW,"-$1").toLowerCase());else if(Q[W+1]===2)$[Q[W]](Q[W+2]);else $[Q[W]]=Q[W+2];if(this.tfm){for(H in this.tfm)K[H]=this.tfm[H];if(K.svg)K.renderTransform(),$.setAttribute("data-svg-origin",this.svgo||"");if(W=aW(),(!W||!W.isStart)&&!Z[AJ]){if(xU(Z),K.zOrigin&&Z[L9])Z[L9]+=" "+K.zOrigin+"px",K.zOrigin=0,K.renderTransform();K.uncache=1}}},hU=function(Q,$){var Z={target:Q,props:[],revert:jE,save:_E};return Q._gsap||Z9.core.getCache(Q),$&&Q.style&&Q.nodeType&&$.split(",").forEach(function(K){return Z.save(K)}),Z},vU,sW=function(Q,$){var Z=g8.createElementNS?g8.createElementNS(($||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),Q):g8.createElement(Q);return Z&&Z.style?Z:g8.createElement(Q)},C9=function J(Q,$,Z){var K=getComputedStyle(Q);return K[$]||K.getPropertyValue($.replace(rW,"-$1").toLowerCase())||K.getPropertyValue($)||!Z&&J(Q,qQ($)||$,1)||""},PU="O,Moz,ms,Ms,Webkit".split(","),qQ=function(Q,$,Z){var K=$||z7,W=K.style,H=5;if(Q in W&&!Z)return Q;Q=Q.charAt(0).toUpperCase()+Q.substr(1);while(H--&&!(PU[H]+Q in W));return H<0?null:(H===3?"ms":H>=0?PU[H]:"")+Q},nW=function(){if(LE()&&window.document)IU=window,g8=IU.document,UQ=g8.documentElement,z7=sW("div")||{style:{}},RE=sW("div"),AJ=qQ(AJ),L9=AJ+"Origin",z7.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",vU=!!qQ("perspective"),aW=Z9.core.reverting,oW=1},SU=function(Q){var $=Q.ownerSVGElement,Z=sW("svg",$&&$.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),K=Q.cloneNode(!0),W;K.style.display="block",Z.appendChild(K),UQ.appendChild(Z);try{W=K.getBBox()}catch(H){}return Z.removeChild(K),UQ.removeChild(Z),W},wU=function(Q,$){var Z=$.length;while(Z--)if(Q.hasAttribute($[Z]))return Q.getAttribute($[Z])},gU=function(Q){var $,Z;try{$=Q.getBBox()}catch(K){$=SU(Q),Z=1}return $&&($.width||$.height)||Z||($=SU(Q)),$&&!$.width&&!$.x&&!$.y?{x:+wU(Q,["x","cx","x1"])||0,y:+wU(Q,["y","cy","y1"])||0,width:0,height:0}:$},mU=function(Q){return!!(Q.getCTM&&(!Q.parentNode||Q.ownerSVGElement)&&gU(Q))},p8=function(Q,$){if($){var Z=Q.style,K;if($ in B8&&$!==L9)$=AJ;if(Z.removeProperty){if(K=$.substr(0,2),K==="ms"||$.substr(0,6)==="webkit")$="-"+$;Z.removeProperty(K==="--"?$:$.replace(rW,"-$1").toLowerCase())}else Z.removeAttribute($)}},m8=function(Q,$,Z,K,W,H){var Y=new X9(Q._pt,$,Z,0,1,H?fU:yU);return Q._pt=Y,Y.b=K,Y.e=W,Q._props.push(Z),Y},TU={deg:1,rad:1,turn:1},bE={grid:1,flex:1},d8=function J(Q,$,Z,K){var W=parseFloat(Z)||0,H=(Z+"").trim().substr((W+"").length)||"px",Y=z7.style,X=BE.test($),U=Q.tagName.toLowerCase()==="svg",G=(U?"client":"offset")+(X?"Width":"Height"),N=100,q=K==="px",F=K==="%",R,O,D,E;if(K===H||!W||TU[K]||TU[H])return W;if(H!=="px"&&!q&&(W=J(Q,$,Z,"px")),E=Q.getCTM&&mU(Q),(F||H==="%")&&(B8[$]||~$.indexOf("adius")))return R=E?Q.getBBox()[X?"width":"height"]:Q[G],_J(F?W/R*N:W/100*R);if(Y[X?"width":"height"]=N+(q?H:K),O=K!=="rem"&&~$.indexOf("adius")||K==="em"&&Q.appendChild&&!U?Q:Q.parentNode,E)O=(Q.ownerSVGElement||{}).parentNode;if(!O||O===g8||!O.appendChild)O=g8.body;if(D=O._gsap,D&&F&&D.width&&X&&D.time===D9.time&&!D.uncache)return _J(W/D.width*N);else{if(F&&($==="height"||$==="width")){var V=Q.style[$];Q.style[$]=N+K,R=Q[G],V?Q.style[$]=V:p8(Q,$)}else(F||H==="%")&&!bE[C9(O,"display")]&&(Y.position=C9(Q,"position")),O===Q&&(Y.position="static"),O.appendChild(z7),R=z7[G],O.removeChild(z7),Y.position="absolute";if(X&&F)D=x8(O),D.time=D9.time,D.width=O[G]}return _J(q?R*W/N:R&&W?N/R*W:0)},L8=function(Q,$,Z,K){var W;if(oW||nW(),$ in K8&&$!=="transform"){if($=K8[$],~$.indexOf(","))$=$.split(",")[0]}if(B8[$]&&$!=="transform")W=X$(Q,K),W=$!=="transformOrigin"?W[$]:W.svg?W.origin:hZ(C9(Q,L9))+" "+W.zOrigin+"px";else if(W=Q.style[$],!W||W==="auto"||K||~(W+"").indexOf("calc("))W=xZ[$]&&xZ[$](Q,$,Z)||C9(Q,$)||bW(Q,$)||($==="opacity"?1:0);return Z&&!~(W+"").trim().indexOf(" ")?d8(Q,$,W,Z)+Z:W},yE=function(Q,$,Z,K){if(!Z||Z==="none"){var W=qQ($,Q,1),H=W&&C9(Q,W,1);if(H&&H!==Z)$=W,Z=H;else if($==="borderColor")Z=C9(Q,"borderTopColor")}var Y=new X9(this._pt,Q.style,$,0,1,pW),X=0,U=0,G,N,q,F,R,O,D,E,V,I,L,M;if(Y.b=Z,Y.e=K,Z+="",K+="",K.substring(0,6)==="var(--")K=C9(Q,K.substring(4,K.indexOf(")")));if(K==="auto")O=Q.style[$],Q.style[$]=K,K=C9(Q,$)||K,O?Q.style[$]=O:p8(Q,$);if(G=[Z,K],fW(G),Z=G[0],K=G[1],q=Z.match(R7)||[],M=K.match(R7)||[],M.length){while(N=R7.exec(K)){if(D=N[0],V=K.substring(X,N.index),R)R=(R+1)%5;else if(V.substr(-5)==="rgba("||V.substr(-5)==="hsla(")R=1;if(D!==(O=q[U++]||"")){if(F=parseFloat(O)||0,L=O.substr((F+"").length),D.charAt(1)==="="&&(D=L7(F,D)+L),E=parseFloat(D),I=D.substr((E+"").length),X=R7.lastIndex-I.length,!I){if(I=I||O9.units[$]||L,X===K.length)K+=I,Y.e+=I}if(L!==I)F=d8(Q,$,O,I)||0;Y._pt={_next:Y._pt,p:V||U===1?V:",",s:F,c:E-F,m:R&&R<4||$==="zIndex"?Math.round:0}}}Y.c=X<K.length?K.substring(X,K.length):""}else Y.r=$==="display"&&K==="none"?fU:yU;return SW.test(K)&&(Y.e=0),this._pt=Y,Y},_U={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},fE=function(Q){var $=Q.split(" "),Z=$[0],K=$[1]||"50%";if(Z==="top"||Z==="bottom"||K==="left"||K==="right")Q=Z,Z=K,K=Q;return $[0]=_U[Z]||Z,$[1]=_U[K]||K,$.join(" ")},xE=function(Q,$){if($.tween&&$.tween._time===$.tween._dur){var Z=$.t,K=Z.style,W=$.u,H=Z._gsap,Y,X,U;if(W==="all"||W===!0)K.cssText="",X=1;else{W=W.split(","),U=W.length;while(--U>-1){if(Y=W[U],B8[Y])X=1,Y=Y==="transformOrigin"?L9:AJ;p8(Z,Y)}}if(X){if(p8(Z,AJ),H)H.svg&&Z.removeAttribute("transform"),K.scale=K.rotate=K.translate="none",X$(Z,1),H.uncache=1,xU(K)}}},xZ={clearProps:function(Q,$,Z,K,W){if(W.data!=="isFromStart"){var H=Q._pt=new X9(Q._pt,$,Z,0,0,xE);return H.u=K,H.pr=-10,H.tween=W,Q._props.push(Z),1}}},Y$=[1,0,0,1,0,0],pU={},dU=function(Q){return Q==="matrix(1, 0, 0, 1, 0, 0)"||Q==="none"||!Q},jU=function(Q){var $=C9(Q,AJ);return dU($)?Y$:$.substr(7).match(PW).map(_J)},tW=function(Q,$){var Z=Q._gsap||x8(Q),K=Q.style,W=jU(Q),H,Y,X,U;if(Z.svg&&Q.getAttribute("transform"))return X=Q.transform.baseVal.consolidate().matrix,W=[X.a,X.b,X.c,X.d,X.e,X.f],W.join(",")==="1,0,0,1,0,0"?Y$:W;else if(W===Y$&&!Q.offsetParent&&Q!==UQ&&!Z.svg){if(X=K.display,K.display="block",H=Q.parentNode,!H||!Q.offsetParent&&!Q.getBoundingClientRect().width)U=1,Y=Q.nextElementSibling,UQ.appendChild(Q);if(W=jU(Q),X?K.display=X:p8(Q,"display"),U)Y?H.insertBefore(Q,Y):H?H.appendChild(Q):UQ.removeChild(Q)}return $&&W.length>6?[W[0],W[1],W[4],W[5],W[12],W[13]]:W},iW=function(Q,$,Z,K,W,H){var Y=Q._gsap,X=W||tW(Q,!0),U=Y.xOrigin||0,G=Y.yOrigin||0,N=Y.xOffset||0,q=Y.yOffset||0,F=X[0],R=X[1],O=X[2],D=X[3],E=X[4],V=X[5],I=$.split(" "),L=parseFloat(I[0])||0,M=parseFloat(I[1])||0,P,A,B,k;if(!Z)P=gU(Q),L=P.x+(~I[0].indexOf("%")?L/100*P.width:L),M=P.y+(~(I[1]||I[0]).indexOf("%")?M/100*P.height:M);else if(X!==Y$&&(A=F*D-R*O))B=L*(D/A)+M*(-O/A)+(O*V-D*E)/A,k=L*(-R/A)+M*(F/A)-(F*V-R*E)/A,L=B,M=k;if(K||K!==!1&&Y.smooth)E=L-U,V=M-G,Y.xOffset=N+(E*F+V*O)-E,Y.yOffset=q+(E*R+V*D)-V;else Y.xOffset=Y.yOffset=0;if(Y.xOrigin=L,Y.yOrigin=M,Y.smooth=!!K,Y.origin=$,Y.originIsAbsolute=!!Z,Q.style[L9]="0px 0px",H)m8(H,Y,"xOrigin",U,L),m8(H,Y,"yOrigin",G,M),m8(H,Y,"xOffset",N,Y.xOffset),m8(H,Y,"yOffset",q,Y.yOffset);Q.setAttribute("data-svg-origin",L+" "+M)},X$=function(Q,$){var Z=Q._gsap||new xW(Q);if("x"in Z&&!$&&!Z.uncache)return Z;var K=Q.style,W=Z.scaleX<0,H="px",Y="deg",X=getComputedStyle(Q),U=C9(Q,L9)||"0",G,N,q,F,R,O,D,E,V,I,L,M,P,A,B,k,b,T,y,c,_,p,o,g,J0,m,l,a,U0,q0,f0,S0;if(G=N=q=O=D=E=V=I=L=0,F=R=1,Z.svg=!!(Q.getCTM&&mU(Q)),X.translate){if(X.translate!=="none"||X.scale!=="none"||X.rotate!=="none")K[AJ]=(X.translate!=="none"?"translate3d("+(X.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(X.rotate!=="none"?"rotate("+X.rotate+") ":"")+(X.scale!=="none"?"scale("+X.scale.split(" ").join(",")+") ":"")+(X[AJ]!=="none"?X[AJ]:"");K.scale=K.rotate=K.translate="none"}if(A=tW(Q,Z.svg),Z.svg){if(Z.uncache)J0=Q.getBBox(),U=Z.xOrigin-J0.x+"px "+(Z.yOrigin-J0.y)+"px",g="";else g=!$&&Q.getAttribute("data-svg-origin");iW(Q,g||U,!!g||Z.originIsAbsolute,Z.smooth!==!1,A)}if(M=Z.xOrigin||0,P=Z.yOrigin||0,A!==Y$){if(T=A[0],y=A[1],c=A[2],_=A[3],G=p=A[4],N=o=A[5],A.length===6){if(F=Math.sqrt(T*T+y*y),R=Math.sqrt(_*_+c*c),O=T||y?XQ(y,T)*k7:0,V=c||_?XQ(c,_)*k7+O:0,V&&(R*=Math.abs(Math.cos(V*GQ))),Z.svg)G-=M-(M*T+P*c),N-=P-(M*y+P*_)}else{if(S0=A[6],q0=A[7],l=A[8],a=A[9],U0=A[10],f0=A[11],G=A[12],N=A[13],q=A[14],B=XQ(S0,U0),D=B*k7,B)k=Math.cos(-B),b=Math.sin(-B),g=p*k+l*b,J0=o*k+a*b,m=S0*k+U0*b,l=p*-b+l*k,a=o*-b+a*k,U0=S0*-b+U0*k,f0=q0*-b+f0*k,p=g,o=J0,S0=m;if(B=XQ(-c,U0),E=B*k7,B)k=Math.cos(-B),b=Math.sin(-B),g=T*k-l*b,J0=y*k-a*b,m=c*k-U0*b,f0=_*b+f0*k,T=g,y=J0,c=m;if(B=XQ(y,T),O=B*k7,B)k=Math.cos(B),b=Math.sin(B),g=T*k+y*b,J0=p*k+o*b,y=y*k-T*b,o=o*k-p*b,T=g,p=J0;if(D&&Math.abs(D)+Math.abs(O)>359.9)D=O=0,E=180-E;F=_J(Math.sqrt(T*T+y*y+c*c)),R=_J(Math.sqrt(o*o+S0*S0)),B=XQ(p,o),V=Math.abs(B)>0.0002?B*k7:0,L=f0?1/(f0<0?-f0:f0):0}if(Z.svg)g=Q.getAttribute("transform"),Z.forceCSS=Q.setAttribute("transform","")||!dU(C9(Q,AJ)),g&&Q.setAttribute("transform",g)}if(Math.abs(V)>90&&Math.abs(V)<270)if(W)F*=-1,V+=O<=0?180:-180,O+=O<=0?180:-180;else R*=-1,V+=V<=0?180:-180;if($=$||Z.uncache,Z.x=G-((Z.xPercent=G&&(!$&&Z.xPercent||(Math.round(Q.offsetWidth/2)===Math.round(-G)?-50:0)))?Q.offsetWidth*Z.xPercent/100:0)+H,Z.y=N-((Z.yPercent=N&&(!$&&Z.yPercent||(Math.round(Q.offsetHeight/2)===Math.round(-N)?-50:0)))?Q.offsetHeight*Z.yPercent/100:0)+H,Z.z=q+H,Z.scaleX=_J(F),Z.scaleY=_J(R),Z.rotation=_J(O)+Y,Z.rotationX=_J(D)+Y,Z.rotationY=_J(E)+Y,Z.skewX=V+Y,Z.skewY=I+Y,Z.transformPerspective=L+H,Z.zOrigin=parseFloat(U.split(" ")[2])||!$&&Z.zOrigin||0)K[L9]=hZ(U);return Z.xOffset=Z.yOffset=0,Z.force3D=O9.force3D,Z.renderTransform=Z.svg?vE:vU?uU:hE,Z.uncache=0,Z},hZ=function(Q){return(Q=Q.split(" "))[0]+" "+Q[1]},lW=function(Q,$,Z){var K=iJ($);return _J(parseFloat($)+parseFloat(d8(Q,"x",Z+"px",K)))+K},hE=function(Q,$){$.z="0px",$.rotationY=$.rotationX="0deg",$.force3D=0,uU(Q,$)},M7="0deg",H$="0px",V7=") ",uU=function(Q,$){var Z=$||this,K=Z.xPercent,W=Z.yPercent,H=Z.x,Y=Z.y,X=Z.z,U=Z.rotation,G=Z.rotationY,N=Z.rotationX,q=Z.skewX,F=Z.skewY,R=Z.scaleX,O=Z.scaleY,D=Z.transformPerspective,E=Z.force3D,V=Z.target,I=Z.zOrigin,L="",M=E==="auto"&&Q&&Q!==1||E===!0;if(I&&(N!==M7||G!==M7)){var P=parseFloat(G)*GQ,A=Math.sin(P),B=Math.cos(P),k;P=parseFloat(N)*GQ,k=Math.cos(P),H=lW(V,H,A*k*-I),Y=lW(V,Y,-Math.sin(P)*-I),X=lW(V,X,B*k*-I+I)}if(D!==H$)L+="perspective("+D+V7;if(K||W)L+="translate("+K+"%, "+W+"%) ";if(M||H!==H$||Y!==H$||X!==H$)L+=X!==H$||M?"translate3d("+H+", "+Y+", "+X+") ":"translate("+H+", "+Y+V7;if(U!==M7)L+="rotate("+U+V7;if(G!==M7)L+="rotateY("+G+V7;if(N!==M7)L+="rotateX("+N+V7;if(q!==M7||F!==M7)L+="skew("+q+", "+F+V7;if(R!==1||O!==1)L+="scale("+R+", "+O+V7;V.style[AJ]=L||"translate(0, 0)"},vE=function(Q,$){var Z=$||this,K=Z.xPercent,W=Z.yPercent,H=Z.x,Y=Z.y,X=Z.rotation,U=Z.skewX,G=Z.skewY,N=Z.scaleX,q=Z.scaleY,F=Z.target,R=Z.xOrigin,O=Z.yOrigin,D=Z.xOffset,E=Z.yOffset,V=Z.forceCSS,I=parseFloat(H),L=parseFloat(Y),M,P,A,B,k;if(X=parseFloat(X),U=parseFloat(U),G=parseFloat(G),G)G=parseFloat(G),U+=G,X+=G;if(X||U){if(X*=GQ,U*=GQ,M=Math.cos(X)*N,P=Math.sin(X)*N,A=Math.sin(X-U)*-q,B=Math.cos(X-U)*q,U){if(G*=GQ,k=Math.tan(U-G),k=Math.sqrt(1+k*k),A*=k,B*=k,G)k=Math.tan(G),k=Math.sqrt(1+k*k),M*=k,P*=k}M=_J(M),P=_J(P),A=_J(A),B=_J(B)}else M=N,B=q,P=A=0;if(I&&!~(H+"").indexOf("px")||L&&!~(Y+"").indexOf("px"))I=d8(F,"x",H,"px"),L=d8(F,"y",Y,"px");if(R||O||D||E)I=_J(I+R-(R*M+O*A)+D),L=_J(L+O-(R*P+O*B)+E);if(K||W)k=F.getBBox(),I=_J(I+K/100*k.width),L=_J(L+W/100*k.height);k="matrix("+M+","+P+","+A+","+B+","+I+","+L+")",F.setAttribute("transform",k),V&&(F.style[AJ]=k)},gE=function(Q,$,Z,K,W){var H=360,Y=pJ(W),X=parseFloat(W)*(Y&&~W.indexOf("rad")?k7:1),U=X-K,G=K+U+"deg",N,q;if(Y){if(N=W.split("_")[1],N==="short"){if(U%=H,U!==U%(H/2))U+=U<0?H:-H}if(N==="cw"&&U<0)U=(U+H*AU)%H-~~(U/H)*H;else if(N==="ccw"&&U>0)U=(U-H*AU)%H-~~(U/H)*H}return Q._pt=q=new X9(Q._pt,$,Z,K,U,VE),q.e=G,q.u="deg",Q._props.push(Z),q},bU=function(Q,$){for(var Z in $)Q[Z]=$[Z];return Q},mE=function(Q,$,Z){var K=bU({},Z._gsap),W="perspective,force3D,transformOrigin,svgOrigin",H=Z.style,Y,X,U,G,N,q,F,R;if(K.svg)U=Z.getAttribute("transform"),Z.setAttribute("transform",""),H[AJ]=$,Y=X$(Z,1),p8(Z,AJ),Z.setAttribute("transform",U);else U=getComputedStyle(Z)[AJ],H[AJ]=$,Y=X$(Z,1),H[AJ]=U;for(X in B8)if(U=K[X],G=Y[X],U!==G&&W.indexOf(X)<0)F=iJ(U),R=iJ(G),N=F!==R?d8(Z,X,U,R):parseFloat(U),q=parseFloat(G),Q._pt=new X9(Q._pt,Y,X,N,q-N,cW),Q._pt.u=R||0,Q._props.push(X);bU(Y,K)};Y9("padding,margin,Width,Radius",function(J,Q){var $="Top",Z="Right",K="Bottom",W="Left",H=(Q<3?[$,Z,K,W]:[$+W,$+Z,K+Z,K+W]).map(function(Y){return Q<2?J+Y:"border"+Y+J});xZ[Q>1?"border"+J:J]=function(Y,X,U,G,N){var q,F;if(arguments.length<4)return q=H.map(function(R){return L8(Y,R,U)}),F=q.join(" "),F.split(q[0]).length===5?q[0]:F;q=(G+"").split(" "),F={},H.forEach(function(R,O){return F[R]=q[O]=q[O]||q[(O-1)/2|0]}),Y.init(X,F,N)}});var eW={name:"css",register:nW,targetTest:function(Q){return Q.style&&Q.nodeType},init:function(Q,$,Z,K,W){var H=this._props,Y=Q.style,X=Z.vars.startAt,U,G,N,q,F,R,O,D,E,V,I,L,M,P,A,B,k;oW||nW(),this.styles=this.styles||hU(Q),B=this.styles.props,this.tween=Z;for(O in $){if(O==="autoRound")continue;if(G=$[O],F9[O]&&vW(O,$,Z,K,Q,W))continue;if(F=typeof G,R=xZ[O],F==="function")G=G.call(Z,K,Q,W),F=typeof G;if(F==="string"&&~G.indexOf("random("))G=YQ(G);if(R)R(this,Q,O,G,Z)&&(A=1);else if(O.substr(0,2)==="--"){if(U=(getComputedStyle(Q).getPropertyValue(O)+"").trim(),G+="",O8.lastIndex=0,!O8.test(U))D=iJ(U),E=iJ(G),E?D!==E&&(U=d8(Q,O,U,E)+E):D&&(G+=D);this.add(Y,"setProperty",U,G,K,W,0,0,O),H.push(O),B.push(O,0,Y[O])}else if(F!=="undefined"){if(X&&O in X)U=typeof X[O]==="function"?X[O].call(Z,K,Q,W):X[O],pJ(U)&&~U.indexOf("random(")&&(U=YQ(U)),iJ(U+"")||U==="auto"||(U+=O9.units[O]||iJ(L8(Q,O))||""),(U+"").charAt(1)==="="&&(U=L8(Q,O));else U=L8(Q,O);if(q=parseFloat(U),V=F==="string"&&G.charAt(1)==="="&&G.substr(0,2),V&&(G=G.substr(2)),N=parseFloat(G),O in K8){if(O==="autoAlpha"){if(q===1&&L8(Q,"visibility")==="hidden"&&N)q=0;B.push("visibility",0,Y.visibility),m8(this,Y,"visibility",q?"inherit":"hidden",N?"inherit":"hidden",!N)}if(O!=="scale"&&O!=="transform")O=K8[O],~O.indexOf(",")&&(O=O.split(",")[0])}if(I=O in B8,I){if(this.styles.save(O),k=G,F==="string"&&G.substring(0,6)==="var(--"){if(G=C9(Q,G.substring(4,G.indexOf(")"))),G.substring(0,5)==="calc("){var b=Q.style.perspective;Q.style.perspective=G,G=C9(Q,"perspective"),b?Q.style.perspective=b:p8(Q,"perspective")}N=parseFloat(G)}if(!L)M=Q._gsap,M.renderTransform&&!$.parseTransform||X$(Q,$.parseTransform),P=$.smoothOrigin!==!1&&M.smooth,L=this._pt=new X9(this._pt,Y,AJ,0,1,M.renderTransform,M,0,-1),L.dep=1;if(O==="scale")this._pt=new X9(this._pt,M,"scaleY",M.scaleY,(V?L7(M.scaleY,V+N):N)-M.scaleY||0,cW),this._pt.u=0,H.push("scaleY",O),O+="X";else if(O==="transformOrigin"){if(B.push(L9,0,Y[L9]),G=fE(G),M.svg)iW(Q,G,0,P,0,this);else E=parseFloat(G.split(" ")[2])||0,E!==M.zOrigin&&m8(this,M,"zOrigin",M.zOrigin,E),m8(this,Y,O,hZ(U),hZ(G));continue}else if(O==="svgOrigin"){iW(Q,G,1,P,0,this);continue}else if(O in pU){gE(this,M,O,q,V?L7(q,V+G):G);continue}else if(O==="smoothOrigin"){m8(this,M,"smooth",M.smooth,G);continue}else if(O==="force3D"){M[O]=G;continue}else if(O==="transform"){mE(this,G,Q);continue}}else if(!(O in Y))O=qQ(O)||O;if(I||(N||N===0)&&(q||q===0)&&!ME.test(G)&&O in Y){if(D=(U+"").substr((q+"").length),N||(N=0),E=iJ(G)||(O in O9.units?O9.units[O]:D),D!==E&&(q=d8(Q,O,U,E)),this._pt=new X9(this._pt,I?M:Y,O,q,(V?L7(q,V+N):N)-q,!I&&(E==="px"||O==="zIndex")&&$.autoRound!==!1?IE:cW),this._pt.u=E||0,I&&k!==G)this._pt.b=U,this._pt.e=k,this._pt.r=zE;else if(D!==E&&E!=="%")this._pt.b=U,this._pt.r=kE}else if(!(O in Y)){if(O in Q)this.add(Q,O,U||Q[O],V?V+G:G,K,W);else if(O!=="parseTransform"){jZ(O,G);continue}}else yE.call(this,Q,O,U,V?V+G:G);I||(O in Y?B.push(O,0,Y[O]):typeof Q[O]==="function"?B.push(O,2,Q[O]()):B.push(O,1,U||Q[O])),H.push(O)}}A&&uW(this)},render:function(Q,$){if($.tween._time||!aW()){var Z=$._pt;while(Z)Z.r(Q,Z.d),Z=Z._next}else $.styles.revert()},get:L8,aliases:K8,getSetter:function(Q,$,Z){var K=K8[$];return K&&K.indexOf(",")<0&&($=K),$ in B8&&$!==L9&&(Q._gsap.x||L8(Q,"x"))?Z&&CU===Z?$==="scale"?SE:PE:(CU=Z||{})&&($==="scale"?wE:TE):Q.style&&!_Z(Q.style[$])?CE:~$.indexOf("-")?AE:fZ(Q,$)},core:{_removeProperty:p8,_getMatrix:tW}};Z9.utils.checkPrefix=qQ;Z9.core.getStyleSaver=hU;(function(J,Q,$,Z){var K=Y9(J+","+Q+","+$,function(W){B8[W]=1});Y9(Q,function(W){O9.units[W]="deg",pU[W]=1}),K8[K[13]]=J+","+Q,Y9(Z,function(W){var H=W.split(":");K8[H[1]]=K[H[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Y9("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(J){O9.units[J]="px"});Z9.registerPlugin(eW);var VJ=Z9.registerPlugin(eW)||Z9,qB=VJ.core.Tween;class JH{container;scene;camera;renderer;controls;audio;raycaster=new EZ;mousePos=new G0;rootGroup=new v0;sceneryGroup=new v0;trackGroup=new v0;viaductGroup=new v0;trainGroup=new v0;weatherGroup=new v0;celestialGroup=new v0;locoCar=new v0;tenderCar=new v0;coachCar=new v0;cabooseCar=new v0;rotatingWheels=[];coachWindowMat;headlampBeam=null;headlampCoreBeam=null;headlampLight=null;headlampSpotLight=null;headlampTrackPool=null;coachInteriorLight1=null;coachInteriorLight2=null;tailLight=null;lanternLight=null;crossingLight1=null;crossingLight2=null;crossingLamp1=null;crossingLamp2=null;mooredBoat=null;viaductLanterns=[];viaductLanternLights=[];interactiveSheep=[];interactivePoles=[];tunnelLight=null;railClickAccumulator=0;lastBlinkCycle=!1;lastHoverRippleTime=0;windmillGroup=null;windmillSails=null;windmillLight=null;windmillBaseSpeed=0.009;windmillCurrentSpeed=0.009;watermillGroup=null;waterwheel=null;watermillLight=null;cottageGroup=null;cottageLight=null;semaphoreGroup=null;semaphoreArm=null;semaphoreLight=null;semaphoreIsRaised=!1;firefliesGroup=null;fireflies=[];currentViewMode="isometric";ambientLight;hemiLight;sunLight;fillLight;moonMesh;moonLight;starsPoints;isNightMode=!1;isRaining=!1;rainStreaks=null;rainCount=360;rainGeo=null;rainPositions=null;splashRipples=[];steamParticles=[];steamTimer=0;trackCurve;progress=0;trainSpeed=0.0016;speedMultiplier=1;clockHand=null;clockTowerGroup=null;interactiveTrees=[];waterMesh=null;animFrameId=0;isDestroyed=!1;constructor(J,Q){let $=document.getElementById(J);if(!$)throw Error(`ThreeStage container #${J} not found`);this.container=$,this.audio=Q,this.scene=new e$;let Z=this.container.clientWidth||920,K=this.container.clientHeight||520;this.camera=new cJ(36,Z/K,0.1,100),this.camera.position.set(3.8,2.85,3.8),this.camera.lookAt(0,0.15,0),this.renderer=new KW({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(Z,K),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=g$,this.renderer.toneMapping=wQ,this.renderer.toneMappingExposure=1.15,this.container.appendChild(this.renderer.domElement),this.controls=new YW(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=0.06,this.controls.autoRotate=!1,this.controls.autoRotateSpeed=0,this.controls.minPolarAngle=Math.PI*0.18,this.controls.maxPolarAngle=Math.PI*0.44,this.controls.minDistance=2.4,this.controls.maxDistance=7,this.controls.target.set(0,0.15,0),this.scene.add(this.rootGroup),this.scene.add(this.celestialGroup),this.scene.add(this.weatherGroup),this.rootGroup.add(this.sceneryGroup),this.rootGroup.add(this.viaductGroup),this.rootGroup.add(this.trackGroup),this.rootGroup.add(this.trainGroup),this.rootGroup.scale.setScalar(1.06),this.setupLighting(),this.buildCelestialElements(),this.buildSculptedIsland(),this.buildScenicCanalAndBridge(),this.buildInfiniteTrackCurve(),this.buildPhysicalRailsAndTies(),this.buildStoneViaductAndTunnel(),this.buildMiniatureStationAndTown(),this.buildDutchWindmill(),this.buildCanalWatermill(),this.buildVillageCottageAndSignals(),this.buildBioluminescentFireflies(),this.buildLevelCrossingAndTelegraph(),this.buildLushNatureAndFlock(),this.buildArticulatedTrain(),this.setupWeatherSystem(),this.bindEvents(),this.setNightMode(!0,!0),this.animate()}createStoneBrickTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let Q=J.getContext("2d");Q.fillStyle="#dfd7c9",Q.fillRect(0,0,512,512);let $=32,Z=64;for(let W=0;W<512;W+=$){let Y=W/$%2===1?Z/2:0;for(let X=-Z;X<512+Z;X+=Z){let U=X+Y,G=Math.floor(Math.random()*20-10);Q.fillStyle=`rgb(${218+G}, ${210+G}, ${196+G})`,Q.fillRect(U+1,W+1,Z-2,$-2),Q.fillStyle="rgba(255,255,255,0.22)",Q.fillRect(U+1,W+1,Z-2,2),Q.fillStyle="rgba(0,0,0,0.12)",Q.fillRect(U+1,W+$-3,Z-2,2)}}let K=new t9(J);return K.wrapS=r8,K.wrapT=r8,K.repeat.set(2,2),K}createWoodSleeperTexture(){let J=document.createElement("canvas");J.width=256,J.height=64;let Q=J.getContext("2d");Q.fillStyle="#5c3d2e",Q.fillRect(0,0,256,64),Q.strokeStyle="#43281c",Q.lineWidth=1;for(let Z=0;Z<18;Z++){let K=Math.random()*64;Q.beginPath(),Q.moveTo(0,K),Q.bezierCurveTo(80,K+Math.random()*4-2,180,K+Math.random()*4-2,256,K),Q.stroke()}return Q.fillStyle="#262626",Q.fillRect(48,8,28,48),Q.fillRect(180,8,28,48),Q.fillStyle="#d4d4d8",Q.beginPath(),Q.arc(62,32,3,0,Math.PI*2),Q.arc(194,32,3,0,Math.PI*2),Q.fill(),new t9(J)}createMeadowTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let Q=J.getContext("2d");Q.fillStyle="#4fa65b",Q.fillRect(0,0,512,512);for(let Z=0;Z<1600;Z++){let K=Math.random()*512,W=Math.random()*512,H=1.5+Math.random()*2.5,Y=0.08+Math.random()*0.15;Q.fillStyle=Math.random()>0.5?`rgba(90, 180, 100, ${Y})`:`rgba(60, 140, 70, ${Y})`,Q.beginPath(),Q.arc(K,W,H,0,Math.PI*2),Q.fill()}let $=new t9(J);return $.wrapS=r8,$.wrapT=r8,$.repeat.set(3,3),$}createVolumetricBeamTexture(){let J=document.createElement("canvas");J.width=128,J.height=512;let Q=J.getContext("2d"),$=Q.createLinearGradient(0,0,0,512);return $.addColorStop(0,"rgba(255, 252, 235, 0.85)"),$.addColorStop(0.12,"rgba(254, 240, 138, 0.45)"),$.addColorStop(0.35,"rgba(253, 224, 71, 0.20)"),$.addColorStop(0.65,"rgba(250, 204, 21, 0.05)"),$.addColorStop(1,"rgba(0, 0, 0, 0.0)"),Q.fillStyle=$,Q.fillRect(0,0,128,512),new t9(J)}createHeadlampPoolTexture(){let J=document.createElement("canvas");J.width=256,J.height=256;let Q=J.getContext("2d"),$=Q.createRadialGradient(128,128,16,128,128,124);return $.addColorStop(0,"rgba(254, 240, 138, 0.75)"),$.addColorStop(0.35,"rgba(253, 224, 71, 0.40)"),$.addColorStop(0.7,"rgba(234, 179, 8, 0.12)"),$.addColorStop(1,"rgba(0, 0, 0, 0.0)"),Q.fillStyle=$,Q.fillRect(0,0,256,256),new t9(J)}setupLighting(){this.ambientLight=new DZ(16777215,2.1),this.scene.add(this.ambientLight),this.hemiLight=new qZ(16776171,14870768,1.2),this.hemiLight.position.set(0,10,0),this.scene.add(this.hemiLight),this.sunLight=new t7(16776171,2.6),this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=18,this.sunLight.shadow.camera.left=-4.5,this.sunLight.shadow.camera.right=4.5,this.sunLight.shadow.camera.top=4.5,this.sunLight.shadow.camera.bottom=-4.5,this.sunLight.shadow.bias=-0.0006,this.scene.add(this.sunLight),this.fillLight=new t7(14412542,1.1),this.fillLight.position.set(-4.5,4,-3.5),this.scene.add(this.fillLight),this.moonLight=new t7(9684477,0),this.moonLight.position.set(-3.5,5.5,-3.5),this.moonLight.castShadow=!0,this.moonLight.shadow.mapSize.width=1024,this.moonLight.shadow.mapSize.height=1024,this.moonLight.shadow.camera.near=1,this.moonLight.shadow.camera.far=18,this.scene.add(this.moonLight)}buildCelestialElements(){let J=new hJ(0.22,24,24),Q=new H0({color:16710083,emissive:16707722,emissiveIntensity:0.9,roughness:0.4});this.moonMesh=new v(J,Q),this.moonMesh.position.set(-2,1.45,-0.8),this.moonMesh.scale.setScalar(0.001),this.celestialGroup.add(this.moonMesh);let $=document.createElement("canvas");$.width=128,$.height=128;let Z=$.getContext("2d"),K=Z.createRadialGradient(64,64,12,64,64,64);K.addColorStop(0,"rgba(254, 240, 138, 0.7)"),K.addColorStop(0.4,"rgba(147, 197, 253, 0.35)"),K.addColorStop(1,"rgba(0, 0, 0, 0)"),Z.fillStyle=K,Z.fillRect(0,0,128,128);let W=new t9($),H=new hQ({map:W,transparent:!0,blending:T8,opacity:0}),Y=new $Z(H);Y.scale.set(1.5,1.5,1),this.moonMesh.add(Y);let X=200,U=new wJ,G=new Float32Array(X*3);for(let q=0;q<X;q++){let F=Math.PI*1.25+(Math.random()-0.5)*0.95,R=0.6+Math.random()*1.5,O=3+Math.random()*1.8;G[q*3]=Math.cos(F)*O,G[q*3+1]=R,G[q*3+2]=Math.sin(F)*O}U.setAttribute("position",new H9(G,3));let N=new mQ({color:16777215,size:0.04,transparent:!0,opacity:0});this.starsPoints=new KZ(U,N),this.celestialGroup.add(this.starsPoints)}buildSculptedIsland(){let J=new _9(6.4,4.4),Q=document.createElement("canvas");Q.width=256,Q.height=256;let $=Q.getContext("2d"),Z=$.createRadialGradient(128,128,40,128,128,120);Z.addColorStop(0,"rgba(15, 23, 42, 0.28)"),Z.addColorStop(0.6,"rgba(15, 23, 42, 0.12)"),Z.addColorStop(1,"rgba(15, 23, 42, 0)"),$.fillStyle=Z,$.fillRect(0,0,256,256);let K=new t9(Q),W=new uJ({map:K,transparent:!0,depthWrite:!1}),H=new v(J,W);H.rotation.x=-Math.PI*0.5,H.position.y=-0.22,this.sceneryGroup.add(H);let Y=new H0({color:15986146,roughness:0.45,metalness:0.02}),X=this.createMeadowTexture(),U=new H0({color:5219931,map:X,roughness:0.65,metalness:0.02}),G=0.22,N=1.62,q=1.12,F=new v(new h0(N,N+0.06,G,48),Y);F.position.set(-q,-G*0.5,0),F.receiveShadow=!0,this.sceneryGroup.add(F);let R=new v(new h0(N-0.02,N,0.035,48),U);R.position.set(-q,0.015,0),R.receiveShadow=!0,this.sceneryGroup.add(R);let O=new v(new h0(N,N+0.06,G,48),Y);O.position.set(q,-G*0.5,0),O.receiveShadow=!0,this.sceneryGroup.add(O);let D=new v(new h0(N-0.02,N,0.035,48),U);D.position.set(q,0.015,0),D.receiveShadow=!0,this.sceneryGroup.add(D);let E=new v(new Y0(q*2,G,1.95),Y);E.position.set(0,-G*0.5,0),E.receiveShadow=!0,this.sceneryGroup.add(E);let V=new v(new Y0(q*2,0.035,1.92),U);V.position.set(0,0.015,0),V.receiveShadow=!0,this.sceneryGroup.add(V)}buildScenicCanalAndBridge(){let J=new v0,Q=new h0(0.46,0.5,0.022,36),$=new H0({color:481669,roughness:0.75}),Z=new v(Q,$);Z.scale.set(1.45,1,1.95),Z.rotation.y=0.7854,Z.position.set(0,0.015,-0.04),Z.receiveShadow=!0,J.add(Z);let K=new H0({color:13621468,map:this.createStoneBrickTexture(),roughness:0.55,metalness:0.05}),W=36;for(let m=0;m<W;m++){let l=m/W*Math.PI*2,a=Math.cos(l)*0.44*1.45,U0=Math.sin(l)*0.44*1.95,q0=a*Math.cos(0.7854)-U0*Math.sin(0.7854),f0=a*Math.sin(0.7854)+U0*Math.cos(0.7854);if(Math.abs(f0-q0)/Math.SQRT2<0.22)continue;if(Math.hypot(q0- -0.247,f0-0.247)<0.2||Math.hypot(q0-0.247,f0- -0.247)<0.2)continue;let i=new v(new Y0(0.1,0.04,0.052),K);i.position.set(q0,0.038,f0),i.rotation.y=0.7854-l,i.castShadow=!0,i.receiveShadow=!0,J.add(i)}let H=new H0({color:165063,emissive:223649,emissiveIntensity:0.18,roughness:0.04,metalness:0.15,transparent:!0,opacity:0.88}),Y=new h0(0.43,0.45,0.016,36),X=new v(Y,H);X.scale.set(1.42,1,1.9),X.rotation.y=0.7854,X.position.set(0,0.034,-0.04),X.receiveShadow=!0,this.waterMesh=X,J.add(X);let U=[6583435,4674921,9741240,5395035];[[-0.42,-0.26],[-0.38,-0.34],[-0.22,-0.48],[0.15,-0.46],[0.38,-0.32],[0.44,-0.18],[0.46,0.1],[0.38,0.28],[0.24,0.44],[-0.18,0.45],[-0.36,0.32],[-0.45,0.12]].filter(([m,l])=>Math.abs(l-m)/Math.SQRT2>=0.22).forEach(([m,l],a)=>{let U0=new H0({color:U[a%U.length],roughness:0.6}),q0=new v(new T9(0.026+a%3*0.012,1),U0);q0.position.set(m,0.038,l),q0.rotation.set(a*0.5,a*0.8,a*0.3),q0.castShadow=!0,J.add(q0)});let N=new v0;N.position.set(-0.3,0.04,-0.32),N.rotation.y=0.65;let q=new H0({color:7877903,roughness:0.7});[-0.07,0.07].forEach((m)=>{let l=new v(new h0(0.012,0.014,0.09,6),q);l.position.set(m,-0.01,0.09),l.castShadow=!0,N.add(l)});for(let m=0;m<4;m++){let l=new v(new Y0(0.18,0.01,0.042),q);l.position.set(0,0.028,-0.06+m*0.045),l.castShadow=!0,N.add(l)}let F=new H0({color:1976635,metalness:0.8,roughness:0.3}),R=new v(new h0(0.007,0.01,0.02,8),F);R.position.set(0.06,0.042,0.075),N.add(R),J.add(N);let O=new v0;O.position.set(-0.4,0.038,-0.24),O.rotation.y=0.45;let D=new H0({color:9584654,roughness:0.5}),E=new H0({color:4528643,roughness:0.6}),V=new v(new Y0(0.2,0.042,0.09),D);V.position.y=0.018,V.castShadow=!0,O.add(V);let I=new v(new Y0(0.208,0.008,0.098),E);I.position.y=0.04,O.add(I);let L=new H0({color:11817737,roughness:0.4}),M=new v(new Y0(0.038,0.014,0.082),L);M.position.set(0,0.028,0),O.add(M);let P=new v(new Y0(0.042,0.014,0.082),L);P.position.set(-0.075,0.028,0),O.add(P);let A=new H0({color:14251782,roughness:0.4});[-1,1].forEach((m)=>{let l=new v0,a=new v(new h0(0.004,0.004,0.16,6),A);a.rotation.z=Math.PI*0.5,l.add(a);let U0=new v(new Y0(0.038,0.003,0.018),A);U0.position.x=0.08,l.add(U0),l.position.set(0.01,0.044,m*0.052),l.rotation.y=m*0.25,l.rotation.z=m*0.1,O.add(l)});let B=new H0({color:13935475,roughness:0.9}),k=new v(new h0(0.003,0.003,0.12,4),B);k.position.set(0.12,0.035,-0.04),k.rotation.z=-Math.PI*0.35,k.rotation.y=0.4,O.add(k),this.mooredBoat=O,J.add(O);let b=new H0({color:1467700,roughness:0.6}),T=new H0({color:4528643,roughness:0.8});[[-0.2,-0.42],[0.22,-0.38],[-0.38,0.15],[0.38,-0.18]].filter(([m,l])=>Math.abs(l-m)/Math.SQRT2>=0.22).forEach(([m,l])=>{for(let a=0;a<3;a++){let U0=new v0,q0=(Math.random()-0.5)*0.05,f0=(Math.random()-0.5)*0.05;U0.position.set(m+q0,0.035,l+f0);let S0=new v(new h0(0.003,0.004,0.1+a*0.02,4),b);S0.position.y=0.05+a*0.01,U0.add(S0);let i=new v(new h0(0.008,0.008,0.032,6),T);i.position.y=0.085+a*0.01,U0.add(i),J.add(U0)}});let c=new H0({color:1409085,roughness:0.35}),_=new H0({color:16020150,roughness:0.25}),p=new H0({color:16638023,roughness:0.25});[[-0.3,0.038,0.06],[0.3,0.038,-0.06],[-0.38,0.038,-0.15],[0.38,0.038,0.15]].filter(([m,,l])=>Math.abs(l-m)/Math.SQRT2>=0.22).forEach(([m,l,a],U0)=>{let q0=new v(new h0(0.04,0.04,0.004,12,1,!1,0,Math.PI*1.85),c);q0.position.set(m,l,a),q0.rotation.y=U0*1.4,J.add(q0);let f0=new v(new T9(0.016,0),U0%2===0?_:p);f0.position.set(m,l+0.012,a),J.add(f0)});let g=new H0({color:4528643,roughness:0.85});[-0.28,-0.14,0,0.14,0.28].forEach((m)=>{let l=m*0.7071,a=m*0.7071,U0=new v(new Y0(0.24,0.024,0.055),g);U0.position.set(l,0.044,a),U0.rotation.y=-Math.PI*0.25,U0.castShadow=!0,J.add(U0),[-0.075,0.075].forEach((q0)=>{let f0=l-q0*0.7071,S0=a+q0*0.7071,i=new v(new h0(0.014,0.016,0.065,8),g);i.position.set(f0,0.02,S0),i.castShadow=!0,J.add(i)})}),[-0.045,0.045].forEach((m)=>{let l=new v(new Y0(0.64,0.018,0.035),g),a=-m*0.7071,U0=m*0.7071;l.position.set(a,0.048,U0),l.rotation.y=Math.PI*0.25,l.castShadow=!0,J.add(l)}),this.sceneryGroup.add(J)}buildInfiniteTrackCurve(){let J=[],Q=180,$=0.92,Z=0.055,K=0.38;for(let W=0;W<180;W++){let H=W/180*Math.PI*2,Y=Math.sin(H)*2.22,X=Math.sin(2*H)*1.1,U=Math.abs(H-Math.PI),G=0.055;if(U<0.92){let N=Math.cos(U/0.92*(Math.PI*0.5));G=0.055+0.38*Math.pow(N,2)}J.push(new w(Y,G,X))}this.trackCurve=new H7(J,!0,"centripetal")}buildPhysicalRailsAndTies(){let J=new Y0(0.24,0.022,0.06),Q=this.createWoodSleeperTexture(),$=new H0({color:6044974,map:Q,roughness:0.7,metalness:0.1}),Z=110,K=new w(0,1,0);for(let D=0;D<110;D++){let E=D/110,V=this.trackCurve.getPointAt(E),I=this.trackCurve.getTangentAt(E).normalize(),L=new w().crossVectors(I,K).normalize();if(L.lengthSq()<0.001)L.set(1,0,0);let M=new v(J,$);M.position.set(V.x,V.y-0.012,V.z),M.lookAt(V.clone().add(L)),M.castShadow=!0,M.receiveShadow=!0,this.trackGroup.add(M)}let W=220,H=0.066,Y=[],X=[];for(let D=0;D<=W;D++){let E=D/W,V=this.trackCurve.getPointAt(E),I=this.trackCurve.getTangentAt(E).normalize(),L=new w().crossVectors(I,K).normalize();if(L.lengthSq()<0.001)L.set(1,0,0);Y.push(V.clone().addScaledVector(L,H)),X.push(V.clone().addScaledVector(L,-H))}let U=new H7(Y,!0),G=new H7(X,!0),N=new r7(U,220,0.013,8,!0),q=new r7(G,220,0.013,8,!0),F=new H0({color:13948120,metalness:0.92,roughness:0.18}),R=new v(N,F),O=new v(q,F);R.castShadow=!0,R.receiveShadow=!0,O.castShadow=!0,O.receiveShadow=!0,this.trackGroup.add(R),this.trackGroup.add(O)}buildStoneViaductAndTunnel(){this.viaductGroup.rotation.y=0.7809;let J=this.createStoneBrickTexture(),Q=new H0({color:14603717,map:J,roughness:0.52,metalness:0.04}),$=new H0({color:9074529,roughness:0.45}),Z=new H0({color:6583435,map:J,roughness:0.65}),K=new H0({color:3033643,roughness:0.85}),W=new Y0(0.24,0.4,0.48);[-0.35,0.35].forEach((V)=>{let I=new v(W,Q);I.position.set(V,0.2,0),I.castShadow=!0,I.receiveShadow=!0,this.viaductGroup.add(I);let L=new v(new Y0(0.28,0.07,0.54),Z);L.position.set(V,0.035,0),L.castShadow=!0,L.receiveShadow=!0,this.viaductGroup.add(L),[-0.29,0.29].forEach((M)=>{let P=new v(new h0(0.001,0.12,0.22,3),Z);P.position.set(V,0.09,M),P.rotation.y=M>0?0:Math.PI,P.castShadow=!0,this.viaductGroup.add(P)}),[-0.14,0.14].forEach((M)=>{let P=new v(new T9(0.024,0),K);P.position.set(V+(V>0?-0.12:0.12),0.06+Math.random()*0.04,M),this.viaductGroup.add(P)})});let H=new Y0(1.12,0.045,0.44),Y=new v(H,Q);Y.position.set(0,0.4,0),Y.castShadow=!0,Y.receiveShadow=!0,this.viaductGroup.add(Y);for(let V=0;V<9;V++){let I=-0.44+V*0.11;[-0.21,0.21].forEach((L)=>{let M=new v(new Y0(0.032,0.028,0.038),$);M.position.set(I,0.375,L),M.castShadow=!0,this.viaductGroup.add(M)})}let X=new H0({color:13156008,map:J,roughness:0.58,metalness:0.04,side:tJ}),U=new h0(0.23,0.23,0.48,28,1,!0,-Math.PI*0.5,Math.PI),G=new v(U,X);G.rotation.x=-Math.PI*0.5,G.position.set(0,0.17,0),G.castShadow=!0,G.receiveShadow=!0,this.viaductGroup.add(G),this.tunnelLight=new J9(16498468,0.9,1.4),this.tunnelLight.position.set(0,0.32,0),this.viaductGroup.add(this.tunnelLight),[-0.242,0.242].forEach((V)=>{for(let L=0;L<=9;L++){let M=L/9*Math.PI,P=L===Math.floor(4.5),A=Math.cos(M)*0.235,B=0.17+Math.sin(M)*0.235,k=P?new Y0(0.048,0.064,0.042):new Y0(0.038,0.042,0.03),b=new v(k,P?$:Q);b.position.set(A,B,V),b.rotation.z=M-Math.PI*0.5,b.castShadow=!0,this.viaductGroup.add(b)}[-0.18,0.18].forEach((L)=>{let M=new v(new Y0(0.09,0.07,0.024),Q);M.position.set(L,0.365,V),M.castShadow=!0,this.viaductGroup.add(M)})});let N=new Y0(1.12,0.085,0.04),q=new v(N,$);q.position.set(0,0.46,0.2),q.castShadow=!0,this.viaductGroup.add(q);let F=new v(N,$);F.position.set(0,0.46,-0.2),F.castShadow=!0,this.viaductGroup.add(F);let R=new q9(0.035,0.075,4);[[-0.54,0.525,0.2],[0.54,0.525,0.2],[-0.54,0.525,-0.2],[0.54,0.525,-0.2]].forEach(([V,I,L])=>{let M=new v(R,$);M.position.set(V,I,L),M.rotation.y=Math.PI*0.25,M.castShadow=!0,this.viaductGroup.add(M)}),this.viaductLanterns=[],this.viaductLanternLights=[];let O=new H0({color:1976635,metalness:0.85,roughness:0.3}),D=new H0({color:14251782,metalness:0.8,roughness:0.2}),E=new H0({color:16707722,emissive:16498468,emissiveIntensity:1.8,roughness:0.1,transparent:!0,opacity:0.9});[{x:-0.38,z:0.25},{x:0.38,z:0.25},{x:-0.38,z:-0.25},{x:0.38,z:-0.25}].forEach(({x:V,z:I})=>{let L=new v0;L.position.set(V,0.29,I);let M=new v(new Y0(0.012,0.045,0.045),O);M.position.set(V>0?-0.02:0.02,0,0),L.add(M);let P=new v(new h0(0.022,0.016,0.04,6),D);P.position.set(0,0.01,0),P.castShadow=!0,L.add(P);let A=new v(new h0(0.016,0.012,0.028,6),E);A.position.set(0,0.01,0),L.add(A);let B=new J9(16498468,this.isNightMode?1.4:0,1.6);B.position.set(0,0.01,0),L.add(B),this.viaductLanternLights.push(B),this.viaductLanterns.push(L),this.viaductGroup.add(L)})}buildMiniatureStationAndTown(){let J=new v0;J.position.set(1.1,0,0.48),J.rotation.y=0.25;let Q=new H0({color:14870768,roughness:0.4}),$=new H0({color:8736014,roughness:0.5}),Z=new H0({color:14510880,roughness:0.35}),K=new v(new Y0(0.58,0.05,0.2),Q);K.position.y=0.025,K.castShadow=!0,K.receiveShadow=!0,J.add(K);let W=new Y0(0.024,0.28,0.024),H=new v(W,$);H.position.set(-0.16,0.16,-0.06),J.add(H);let Y=new v(W,$);Y.position.set(0.08,0.16,-0.06),J.add(Y);let X=new v(new Y0(0.38,0.024,0.2),Z);X.position.set(-0.04,0.3,-0.02),X.rotation.x=0.12,X.castShadow=!0,J.add(X),this.clockTowerGroup=new v0,this.clockTowerGroup.position.set(0.2,0,-0.04);let U=new v(new Y0(0.12,0.42,0.12),Q);U.position.y=0.235,U.castShadow=!0,this.clockTowerGroup.add(U);let G=new v(new q9(0.1,0.18,4),Z);G.position.y=0.53,G.rotation.y=Math.PI*0.25,G.castShadow=!0,this.clockTowerGroup.add(G);let N=new v(new h0(0.038,0.038,0.01,16),new H0({color:16777215,roughness:0.1}));N.rotation.x=Math.PI*0.5,N.position.set(0,0.36,0.065),this.clockTowerGroup.add(N);let q=new Y0(0.005,0.028,0.005);this.clockHand=new v(q,new uJ({color:988970})),this.clockHand.position.set(0,0.36,0.072),this.clockTowerGroup.add(this.clockHand),J.add(this.clockTowerGroup);let F=new v(new Y0(0.18,0.038,0.05),$);F.position.set(-0.06,0.065,-0.04),J.add(F);let R=new v(new Y0(0.04,0.03,0.022),new H0({color:9584654}));R.position.set(-0.16,0.065,-0.04),J.add(R),[2450411,14251782].forEach((E,V)=>{let I=new v0,L=new v(new h0(0.02,0.026,0.07,8),new H0({color:E,roughness:0.4}));L.position.y=0.085;let M=new v(new hJ(0.02,8,8),new H0({color:16772565}));M.position.y=0.135,I.add(L),I.add(M),I.position.set(-0.02+V*0.06,0,0.01),I.castShadow=!0,J.add(I)}),this.lanternLight=new J9(16708551,0.8,1.6),this.lanternLight.position.set(-0.04,0.26,-0.02),J.add(this.lanternLight);let D=new v(new hJ(0.022,8,8),new uJ({color:16707722}));D.position.copy(this.lanternLight.position),J.add(D),this.sceneryGroup.add(J)}buildDutchWindmill(){this.windmillGroup=new v0,this.windmillGroup.position.set(-1.62,0.035,0.05);let J=this.createStoneBrickTexture(),Q=new H0({color:14076856,map:J,roughness:0.65,metalness:0.05}),$=new H0({color:7877903,roughness:0.7}),Z=new H0({color:14604492,roughness:0.6,metalness:0.02}),K=new H0({color:3359061,roughness:0.45,metalness:0.2}),W=new H0({color:16710083,roughness:0.8,side:tJ}),H=new v(new h0(0.18,0.21,0.08,8),Q);H.position.y=0.04,H.castShadow=!0,H.receiveShadow=!0,this.windmillGroup.add(H);let Y=new v(new h0(0.11,0.17,0.36,8),Z);Y.position.y=0.26,Y.castShadow=!0,Y.receiveShadow=!0,this.windmillGroup.add(Y);let X=new v(new h0(0.2,0.2,0.014,8),$);X.position.y=0.22,X.castShadow=!0,this.windmillGroup.add(X);for(let D=0;D<8;D++){let E=D/8*Math.PI*2,V=Math.cos(E)*0.19,I=Math.sin(E)*0.19,L=new v(new Y0(0.012,0.045,0.012),$);L.position.set(V,0.245,I),this.windmillGroup.add(L)}let U=new v(new h0(0.09,0.12,0.07,8),K);U.position.y=0.46,U.castShadow=!0,this.windmillGroup.add(U);let G=new v(new q9(0.1,0.08,8),K);G.position.y=0.52,G.castShadow=!0,this.windmillGroup.add(G);let N=new v(new h0(0.006,0.008,0.18,6),$);N.position.set(-0.09,0.47,0),N.rotation.z=Math.PI*0.35,this.windmillGroup.add(N),this.windmillSails=new v0,this.windmillSails.position.set(0.11,0.46,0);let q=new v(new h0(0.022,0.022,0.024,8),$);q.rotation.z=Math.PI*0.5,this.windmillSails.add(q);for(let D=0;D<4;D++){let E=D*Math.PI/2,V=new v0;V.rotation.x=E;let I=new v(new Y0(0.012,0.24,0.012),$);I.position.y=0.12,I.castShadow=!0,V.add(I);let L=new v(new Y0(0.004,0.18,0.055),W);L.position.set(0.006,0.14,0.03),L.rotation.y=0.18,L.castShadow=!0,V.add(L);for(let M=0;M<4;M++){let P=new v(new Y0(0.008,0.005,0.058),$);P.position.set(0.007,0.07+M*0.045,0.03),V.add(P)}this.windmillSails.add(V)}this.windmillGroup.add(this.windmillSails);let F=new v(new Y0(0.012,0.055,0.035),$);F.position.set(0.165,0.065,0),this.windmillGroup.add(F);let R=new H0({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.6:0.1,roughness:0.1}),O=new v(new Y0(0.012,0.03,0.024),R);O.position.set(0.125,0.27,0.04),this.windmillGroup.add(O),this.windmillLight=new J9(16498468,this.isNightMode?0.85:0,1.4),this.windmillLight.position.set(0.08,0.28,0),this.windmillGroup.add(this.windmillLight),this.sceneryGroup.add(this.windmillGroup)}buildCanalWatermill(){this.watermillGroup=new v0,this.watermillGroup.position.set(0,0.035,-0.88);let J=this.createStoneBrickTexture(),Q=new H0({color:13621468,map:J,roughness:0.65,metalness:0.05}),$=new H0({color:7877903,roughness:0.7}),Z=new H0({color:15857145,roughness:0.85}),K=new H0({color:10105874,roughness:0.5}),W=new v(new Y0(0.32,0.1,0.26),Q);W.position.y=0.05,W.castShadow=!0,W.receiveShadow=!0,this.watermillGroup.add(W);let H=new v(new Y0(0.3,0.13,0.24),Z);H.position.y=0.165,H.castShadow=!0,H.receiveShadow=!0,this.watermillGroup.add(H),[-0.145,0.145].forEach((R)=>{let O=new v(new Y0(0.015,0.13,0.245),$);O.position.set(R,0.165,0),this.watermillGroup.add(O)});let Y=new v(new Y0(0.34,0.024,0.17),K);Y.position.set(0,0.275,-0.06),Y.rotation.x=0.68,Y.castShadow=!0,this.watermillGroup.add(Y);let X=new v(new Y0(0.34,0.024,0.17),K);X.position.set(0,0.275,0.06),X.rotation.x=-0.68,X.castShadow=!0,this.watermillGroup.add(X),[-0.148,0.148].forEach((R)=>{let O=new v(new q9(0.12,0.09,3),$);O.position.set(R,0.275,0),O.rotation.y=R>0?Math.PI*0.5:-Math.PI*0.5,this.watermillGroup.add(O)});let U=new v(new Y0(0.045,0.16,0.045),Q);U.position.set(0.09,0.3,-0.07),U.castShadow=!0,this.watermillGroup.add(U);let G=new v(new Y0(0.08,0.022,0.16),$);G.position.set(0,0.18,0.17),G.rotation.x=0.15,G.castShadow=!0,this.watermillGroup.add(G),this.waterwheel=new v0,this.waterwheel.position.set(0,0.065,0.18);let N=new v(new h0(0.014,0.014,0.08,8),$);N.rotation.z=Math.PI*0.5,this.waterwheel.add(N),[-0.03,0.03].forEach((R)=>{let O=new v(new a7(0.105,0.125,16),$);O.rotation.y=Math.PI*0.5,O.position.x=R,this.waterwheel.add(O)});for(let R=0;R<12;R++){let O=R/12*Math.PI*2,D=new v0;if(D.rotation.x=O,R%2===0){let V=new v(new Y0(0.012,0.11,0.01),$);V.position.y=0.055,D.add(V)}let E=new v(new Y0(0.068,0.008,0.036),$);E.position.set(0,0.115,0),E.castShadow=!0,D.add(E),this.waterwheel.add(D)}this.watermillGroup.add(this.waterwheel);let q=new v(new Y0(0.012,0.012,0.045),$);q.position.set(0.09,0.18,0.14),this.watermillGroup.add(q),this.watermillLight=new J9(16498468,this.isNightMode?0.85:0,1.4),this.watermillLight.position.set(0.09,0.16,0.16),this.watermillGroup.add(this.watermillLight);let F=new v(new hJ(0.016,8,8),new uJ({color:16707722}));F.position.copy(this.watermillLight.position),this.watermillGroup.add(F),this.sceneryGroup.add(this.watermillGroup)}buildVillageCottageAndSignals(){this.cottageGroup=new v0,this.cottageGroup.position.set(1.42,0.035,0.22),this.cottageGroup.rotation.y=-0.35;let J=new H0({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),Q=new H0({color:16448249,roughness:0.85}),$=new H0({color:4528643,roughness:0.7}),Z=new H0({color:8736014,roughness:0.9}),K=new H0({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.8:0.1,roughness:0.1}),W=new v(new Y0(0.36,0.05,0.26),J);W.position.y=0.025,W.castShadow=!0,W.receiveShadow=!0,this.cottageGroup.add(W);let H=new v(new Y0(0.34,0.14,0.24),Q);H.position.y=0.12,H.castShadow=!0,H.receiveShadow=!0,this.cottageGroup.add(H),[-0.165,0.165].forEach((B)=>{let k=new v(new Y0(0.016,0.14,0.244),$);k.position.set(B,0.12,0),this.cottageGroup.add(k)});let Y=new v(new Y0(0.344,0.016,0.244),$);Y.position.set(0,0.12,0),this.cottageGroup.add(Y);let X=new v(new Y0(0.38,0.026,0.17),Z);X.position.set(0,0.225,-0.06),X.rotation.x=0.72,X.castShadow=!0,this.cottageGroup.add(X);let U=new v(new Y0(0.38,0.026,0.17),Z);U.position.set(0,0.225,0.06),U.rotation.x=-0.72,U.castShadow=!0,this.cottageGroup.add(U);let G=new v(new Y0(0.07,0.06,0.06),Q);G.position.set(-0.06,0.22,0.08),G.castShadow=!0,this.cottageGroup.add(G);let N=new v(new q9(0.05,0.04,3),Z);N.position.set(-0.06,0.265,0.08),N.rotation.y=Math.PI*0.5,this.cottageGroup.add(N);let q=new v(new Y0(0.042,0.18,0.042),J);q.position.set(0.12,0.26,-0.06),q.castShadow=!0,this.cottageGroup.add(q);let F=new v(new Y0(0.012,0.038,0.032),K);F.position.set(0.07,0.12,0.122),this.cottageGroup.add(F);let R=new v(new Y0(0.012,0.038,0.032),K);R.position.set(-0.07,0.12,0.122),this.cottageGroup.add(R);let O=new v(new Y0(0.042,0.07,0.012),$);O.position.set(0,0.085,0.122),this.cottageGroup.add(O),this.cottageLight=new J9(16498468,this.isNightMode?1.1:0,1.6),this.cottageLight.position.set(0,0.14,0),this.cottageGroup.add(this.cottageLight),this.sceneryGroup.add(this.cottageGroup),this.semaphoreGroup=new v0,this.semaphoreGroup.position.set(-0.62,0.035,0.96);let D=new H0({color:1976635,metalness:0.8,roughness:0.3}),E=new H0({color:14427686,roughness:0.4}),V=new H0({color:16777215,roughness:0.4}),I=new v(new h0(0.01,0.014,0.38,8),D);I.position.y=0.19,I.castShadow=!0,this.semaphoreGroup.add(I);for(let B=0;B<6;B++){let k=new v(new Y0(0.028,0.004,0.004),D);k.position.set(0,0.08+B*0.045,0.014),this.semaphoreGroup.add(k)}let L=new v(new hJ(0.014,6,6),D);L.position.y=0.385,this.semaphoreGroup.add(L),this.semaphoreArm=new v0,this.semaphoreArm.position.set(0,0.32,0.01);let M=new v(new Y0(0.12,0.022,0.005),E);M.position.x=0.06,M.castShadow=!0,this.semaphoreArm.add(M);let P=new v(new Y0(0.022,0.024,0.006),V);P.position.x=0.09,this.semaphoreArm.add(P);let A=new v(new Y0(0.03,0.018,0.01),D);A.position.x=-0.02,this.semaphoreArm.add(A),this.semaphoreGroup.add(this.semaphoreArm),this.semaphoreLight=new J9(14427686,0.6,0.8),this.semaphoreLight.position.set(0.01,0.32,0.02),this.semaphoreGroup.add(this.semaphoreLight),this.sceneryGroup.add(this.semaphoreGroup)}buildBioluminescentFireflies(){this.firefliesGroup=new v0,this.fireflies=[];let J=new hJ(0.007,6,6),Q=new uJ({color:13434624,transparent:!0,opacity:this.isNightMode?0.85:0});[[-0.15,0.08,-0.45],[0.12,0.12,-0.35],[-0.05,0.1,-0.2],[0.22,0.09,-0.15],[-0.25,0.14,0.1],[0.08,0.11,0.25],[-0.18,0.09,0.38],[0.15,0.13,0.42],[-1.5,0.12,0.2],[-1.3,0.16,-0.15],[-1.65,0.18,-0.1],[-1.2,0.11,0.3],[-1.45,0.14,-0.35],[-1.1,0.1,-0.1],[-1.55,0.2,0.1],[-1.35,0.15,0.12],[1.35,0.12,0.35],[1.5,0.15,0.1],[1.25,0.14,-0.2],[1.4,0.11,-0.3],[1.1,0.1,0.25],[1.2,0.16,0.5],[0.95,0.12,0.15],[1.45,0.13,0.05]].forEach(([Z,K,W],H)=>{let Y=new v(J,Q.clone());Y.position.set(Z,K,W),this.firefliesGroup.add(Y),this.fireflies.push({mesh:Y,baseX:Z,baseY:K,baseZ:W,speed:0.6+H%5*0.25,phase:H*0.75,radius:0.035+H%3*0.02})}),this.sceneryGroup.add(this.firefliesGroup)}triggerWindmillSpin(){if(!this.windmillSails)return;if(this.windmillCurrentSpeed=0.075,this.audio.playWindmillSpin(),this.windmillGroup)VJ.to(this.windmillGroup.scale,{y:1.08,duration:0.15,yoyo:!0,repeat:1,ease:"power1.out"})}triggerWaterwheelSpin(){if(!this.waterwheel)return;if(this.audio.playWaterwheel(),this.triggerSplash(0,0.035,-0.73),this.watermillGroup)VJ.to(this.watermillGroup.scale,{y:1.06,duration:0.12,yoyo:!0,repeat:1,ease:"power1.out"})}triggerSemaphoreToggle(){if(!this.semaphoreArm)return;this.semaphoreIsRaised=!this.semaphoreIsRaised;let J=this.semaphoreIsRaised?Math.PI*0.25:0;if(VJ.to(this.semaphoreArm.rotation,{z:J,duration:0.35,ease:"back.out(1.8)"}),this.semaphoreLight)this.semaphoreLight.color.set(this.semaphoreIsRaised?1096065:14427686);this.audio.playSwitchClick()}triggerCottageChimney(){if(!this.cottageGroup)return;this.audio.playSteamChuff(!1),this.triggerTelegraphPing(this.cottageGroup)}buildLevelCrossingAndTelegraph(){let J=new v0;J.position.set(-0.45,0,0.82);let Q=new v(new h0(0.016,0.018,0.38,8),new H0({color:3359061,metalness:0.6}));Q.position.y=0.19,Q.castShadow=!0,J.add(Q);let $=new H0({color:16777215}),Z=new v(new Y0(0.16,0.026,0.008),$);Z.position.set(0,0.34,0.015),Z.rotation.z=Math.PI*0.25,J.add(Z);let K=new v(new Y0(0.16,0.026,0.008),$);K.position.set(0,0.34,0.015),K.rotation.z=-Math.PI*0.25,J.add(K);let W=new uJ({color:15680580});this.crossingLamp1=new v(new hJ(0.022,8,8),W),this.crossingLamp1.position.set(-0.05,0.27,0.022),J.add(this.crossingLamp1),this.crossingLight1=new J9(15680580,0.8,0.8),this.crossingLight1.position.copy(this.crossingLamp1.position),J.add(this.crossingLight1),this.crossingLamp2=new v(new hJ(0.022,8,8),W),this.crossingLamp2.position.set(0.05,0.27,0.022),J.add(this.crossingLamp2),this.crossingLight2=new J9(15680580,0.2,0.8),this.crossingLight2.position.copy(this.crossingLamp2.position),J.add(this.crossingLight2),this.sceneryGroup.add(J);let H=[[-1.2,1.45],[-0.45,1.35],[0.45,-1.35],[1.2,-1.45]],Y=new H0({color:7877903,roughness:0.8});H.forEach(([X,U])=>{let G=new v0;G.position.set(X,0,U);let N=new v(new h0(0.018,0.024,0.44,6),Y);N.position.y=0.22,N.castShadow=!0,G.add(N);let q=new v(new Y0(0.16,0.016,0.016),Y);q.position.y=0.4,G.add(q);let F=new H0({color:16777215,roughness:0.2});[-0.06,0.06].forEach((R)=>{let O=new v(new h0(0.008,0.008,0.02,6),F);O.position.set(R,0.415,0),G.add(O)}),this.sceneryGroup.add(G),this.interactivePoles.push(G)})}getApproxDistanceToTrack(J,Q){let $=1/0,Z=72;for(let K=0;K<Z;K++){let W=K/Z*Math.PI*2,H=Math.sin(W)*2.22,Y=Math.sin(2*W)*1.1,X=Math.hypot(H-J,Y-Q);if(X<$)$=X}return $}buildLushNatureAndFlock(){let J=[{x:-1.15,z:0,type:"pine",col:1467700,scale:1.2},{x:-1.35,z:0.25,type:"deciduous",col:2278750,scale:1.1},{x:-0.9,z:-0.22,type:"pine",col:1409085,scale:1.05},{x:-1.45,z:-0.2,type:"deciduous",col:6660877,scale:1},{x:-0.85,z:0.2,type:"deciduous",col:4906624,scale:0.9},{x:1.15,z:0,type:"pine",col:1467700,scale:1.2},{x:1.35,z:-0.25,type:"deciduous",col:2278750,scale:1.1},{x:0.9,z:-0.22,type:"pine",col:1409085,scale:1.05},{x:1.45,z:-0.15,type:"deciduous",col:6660877,scale:1},{x:0.75,z:0.1,type:"deciduous",col:4906624,scale:0.9}],Q=new H0({color:7877903,roughness:0.7});J.forEach(({x:H,z:Y,type:X,col:U,scale:G})=>{let N=new v0;N.position.set(H,0,Y),N.scale.setScalar(G);let q=new v(new h0(0.026,0.034,0.16,6),Q);q.position.y=0.08,q.castShadow=!0,N.add(q);let F=new H0({color:U,roughness:0.5});if(X==="pine"){let R=new v(new q9(0.18,0.22,6),F);R.position.y=0.22,R.castShadow=!0,N.add(R);let O=new v(new q9(0.13,0.18,6),F);O.position.y=0.32,O.castShadow=!0,N.add(O);let D=new v(new q9(0.08,0.13,6),F);D.position.y=0.41,D.castShadow=!0,N.add(D)}else{let R=new v(new T9(0.18,1),F);R.position.set(0,0.25,0),R.castShadow=!0,N.add(R);let O=new v(new T9(0.13,1),F);O.position.set(0.04,0.35,0.02),O.castShadow=!0,N.add(O)}this.interactiveTrees.push(N),this.sceneryGroup.add(N)});let $=new H0({color:16317180,roughness:0.9}),Z=new H0({color:1976635,roughness:0.5});[[-1.4,0.04,0.15],[-1.55,0.04,-0.15],[1.35,0.04,-0.1]].forEach(([H,Y,X])=>{let U=new v0;U.position.set(H,Y,X);let G=new v(new T9(0.045,1),$);G.position.y=0.045,G.scale.set(1.2,0.9,0.9),U.add(G);let N=new v(new hJ(0.022,6,6),Z);N.position.set(0.05,0.05,0),U.add(N),this.interactiveSheep.push(U),this.sceneryGroup.add(U)});let W=[15680580,16436245,16777215,11032055];for(let H=0;H<48;H++){let Y=H%2===0?-1.15:1.15,X=0.22+H%5*0.14,U=H*1.35,G=Y+Math.cos(U)*X,N=Math.sin(U)*X;if(this.getApproxDistanceToTrack(G,N)<0.35)continue;let q=W[H%W.length],F=new uJ({color:q}),R=new v(new hJ(0.016,6,6),F);R.position.set(G,0.04,N),this.sceneryGroup.add(R)}}buildArticulatedTrain(){let J=new v0,Q=new H0({color:10033947,roughness:0.35}),$=new v(new Y0(0.38,0.04,0.18),Q);$.position.y=0.05,$.castShadow=!0,J.add($);let Z=new v(new q9(0.1,0.08,4),new H0({color:12131356}));Z.rotation.y=Math.PI*0.25,Z.rotation.x=-Math.PI*0.5,Z.position.set(0.2,0.045,0),Z.castShadow=!0,J.add(Z);let K=new H0({color:292951,roughness:0.25,metalness:0.12}),W=new v(new h0(0.075,0.075,0.22,16),K);W.rotation.z=Math.PI*0.5,W.position.set(0.07,0.125,0),W.castShadow=!0,J.add(W);let H=new v(new hJ(0.074,12,12),K);H.position.set(0.18,0.125,0),H.castShadow=!0,J.add(H);let Y=new H0({color:16096779,metalness:0.8,roughness:0.25});[-0.01,0.06,0.14].forEach((j)=>{let DJ=new v(new Y7(0.076,0.006,8,16),Y);DJ.rotation.y=Math.PI*0.5,DJ.position.set(j,0.125,0),J.add(DJ)});let X=new H0({color:1976635,roughness:0.4}),U=new v(new h0(0.024,0.018,0.08,8),X);U.position.set(0.13,0.22,0),U.castShadow=!0,J.add(U);let G=new v(new Y7(0.024,0.005,6,12),Y);G.rotation.x=Math.PI*0.5,G.position.set(0.13,0.26,0),J.add(G);let N=new v(new hJ(0.032,10,10),Y);N.position.set(0.02,0.21,0),N.castShadow=!0,J.add(N);let q=new H0({color:417606,roughness:0.3}),F=new v(new Y0(0.16,0.16,0.176),q);F.position.set(-0.1,0.15,0),F.castShadow=!0,J.add(F);let R=new v(new Y0(0.18,0.025,0.19),Y);R.position.set(-0.1,0.24,0),R.castShadow=!0,J.add(R);let O=new uJ({color:16707722}),D=new v(new _9(0.06,0.06),O);D.position.set(-0.1,0.16,0.089),J.add(D);let E=new v(new _9(0.06,0.06),O);E.rotation.y=Math.PI,E.position.set(-0.1,0.16,-0.089),J.add(E);let V=new v(new h0(0.034,0.028,0.044,16),Y);V.rotation.z=Math.PI*0.5,V.position.set(0.2,0.14,0),V.castShadow=!0,J.add(V);let I=new v(new Y7(0.034,0.005,8,16),Y);I.rotation.y=Math.PI*0.5,I.position.set(0.222,0.14,0),J.add(I);let L=new H0({color:16777215,metalness:0.95,roughness:0.08}),M=new v(new q9(0.028,0.022,16,1,!0),L);M.rotation.z=-Math.PI*0.5,M.position.set(0.21,0.14,0),J.add(M);let P=new H0({color:16776171,emissive:16707722,emissiveIntensity:3.2,roughness:0.1}),A=new v(new hJ(0.013,8,8),P);A.position.set(0.218,0.14,0),J.add(A);let B=new H0({color:16772565,emissive:16707722,emissiveIntensity:1.5,roughness:0.1,metalness:0.2,transparent:!0,opacity:0.85}),k=new v(new hJ(0.031,12,12,0,Math.PI*2,0,Math.PI*0.5),B);k.rotation.z=-Math.PI*0.5,k.position.set(0.222,0.14,0),J.add(k),this.headlampLight=new J9(16707722,1.8,1.2),this.headlampLight.position.set(0.26,0.14,0),J.add(this.headlampLight),this.headlampSpotLight=new FZ(16775149,2.2,2,Math.PI*0.16,0.85,1.4),this.headlampSpotLight.position.set(0.23,0.14,0);let b=new LJ;b.position.set(0.85,0.04,0),J.add(b),this.headlampSpotLight.target=b,J.add(this.headlampSpotLight);let T=new h0(0.024,0.09,0.46,24,1,!0);T.translate(0,-0.23,0),T.rotateZ(Math.PI*0.5),T.rotateY(-0.06);let y=new uJ({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.32,blending:T8,side:tJ,depthWrite:!1});this.headlampBeam=new v(T,y),this.headlampBeam.position.set(0.22,0.14,0),this.headlampBeam.visible=!1,J.add(this.headlampBeam);let c=new h0(0.012,0.042,0.28,16,1,!0);c.translate(0,-0.14,0),c.rotateZ(Math.PI*0.5),c.rotateY(-0.06);let _=new uJ({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.38,blending:T8,side:tJ,depthWrite:!1});this.headlampCoreBeam=new v(c,_),this.headlampCoreBeam.position.set(0.22,0.14,0),this.headlampCoreBeam.visible=!1,J.add(this.headlampCoreBeam);let p=new uJ({map:this.createHeadlampPoolTexture(),transparent:!0,opacity:0.45,blending:T8,depthWrite:!1});this.headlampTrackPool=new v(new _9(0.24,0.44),p),this.headlampTrackPool.rotation.x=-Math.PI*0.5,this.headlampTrackPool.rotation.z=-Math.PI*0.5,this.headlampTrackPool.position.set(0.4,0.058,0),this.headlampTrackPool.visible=!1,J.add(this.headlampTrackPool);let o=new H0({color:16096779,metalness:0.85,roughness:0.2}),g=new v(new h0(0.032,0.038,0.045,12),o);g.position.set(0.04,0.175,0),g.castShadow=!0,J.add(g);let J0=new v(new h0(0.006,0.006,0.035,6),o);J0.position.set(-0.03,0.19,0.03),J.add(J0);let m=new H0({color:1976635,metalness:0.8,roughness:0.4}),l=new v(new Y0(0.04,0.016,0.024),m);l.position.set(-0.19,0.048,0),J.add(l),this.attachWheels(J,[[0.08,0.045,0.09],[-0.08,0.045,0.09],[0.08,0.045,-0.09],[-0.08,0.045,-0.09]],0.045),this.locoCar=J,this.trainGroup.add(this.locoCar);let a=new v0,U0=new H0({color:3359061,roughness:0.5}),q0=new v(new Y0(0.24,0.11,0.17),U0);q0.position.y=0.095,q0.castShadow=!0,a.add(q0);let f0=new H0({color:988970,roughness:0.9}),S0=new v(new T9(0.08,1),f0);S0.position.set(0,0.14,0),S0.scale.set(1.2,0.6,0.85),S0.castShadow=!0,a.add(S0);let i=new v(new Y0(0.04,0.016,0.024),m);i.position.set(0.13,0.048,0),a.add(i);let K0=new v(new Y0(0.04,0.016,0.024),m);K0.position.set(-0.13,0.048,0),a.add(K0),this.attachWheels(a,[[0.065,0.038,0.088],[-0.065,0.038,0.088],[0.065,0.038,-0.088],[-0.065,0.038,-0.088]],0.038),this.tenderCar=a,this.trainGroup.add(this.tenderCar);let Z0=new v0,T0=new H0({color:14251782,roughness:0.3}),j0=new v(new Y0(0.36,0.14,0.176),T0);j0.position.y=0.11,j0.castShadow=!0,Z0.add(j0);let w0=new H0({color:16777215,roughness:0.3}),kJ=new v(new Y0(0.38,0.028,0.19),w0);kJ.position.y=0.19,kJ.castShadow=!0,Z0.add(kJ),this.coachWindowMat=new H0({color:16707722,emissive:0,emissiveIntensity:0,roughness:0.1}),[-0.1,0,0.1].forEach((j)=>{let DJ=new v(new _9(0.055,0.055),this.coachWindowMat);DJ.position.set(j,0.125,0.089),Z0.add(DJ);let t0=new v(new _9(0.055,0.055),this.coachWindowMat);t0.rotation.y=Math.PI,t0.position.set(j,0.125,-0.089),Z0.add(t0)}),this.coachInteriorLight1=new J9(16707722,0,1.2),this.coachInteriorLight1.position.set(-0.06,0.125,0),Z0.add(this.coachInteriorLight1),this.coachInteriorLight2=new J9(16707722,0,1.2),this.coachInteriorLight2.position.set(0.06,0.125,0),Z0.add(this.coachInteriorLight2);let l0=new v(new Y0(0.04,0.016,0.024),m);l0.position.set(0.19,0.048,0),Z0.add(l0);let n0=new v(new Y0(0.04,0.016,0.024),m);n0.position.set(-0.19,0.048,0),Z0.add(n0),this.attachWheels(Z0,[[0.1,0.038,0.088],[-0.1,0.038,0.088],[0.1,0.038,-0.088],[-0.1,0.038,-0.088]],0.038),this.coachCar=Z0,this.trainGroup.add(this.coachCar);let s0=new v0,i0=new H0({color:12456508,roughness:0.35}),jJ=new v(new Y0(0.3,0.13,0.176),i0);jJ.position.y=0.105,jJ.castShadow=!0,s0.add(jJ);let WJ=new v(new Y0(0.12,0.07,0.14),i0);WJ.position.set(-0.02,0.2,0),WJ.castShadow=!0,s0.add(WJ);let lJ=new v(new Y0(0.14,0.018,0.16),w0);lJ.position.set(-0.02,0.245,0),s0.add(lJ);let PJ=new v(new Y0(0.04,0.016,0.024),m);PJ.position.set(0.16,0.048,0),s0.add(PJ);let SJ=new v(new hJ(0.024,8,8),new uJ({color:15680580}));SJ.position.set(-0.16,0.12,0),s0.add(SJ),this.tailLight=new J9(15680580,0.8,1.2),this.tailLight.position.set(-0.2,0.12,0),s0.add(this.tailLight),this.attachWheels(s0,[[0.08,0.038,0.088],[-0.08,0.038,0.088],[0.08,0.038,-0.088],[-0.08,0.038,-0.088]],0.038),this.cabooseCar=s0,this.trainGroup.add(this.cabooseCar);for(let j=0;j<16;j++){let DJ=new v(new T9(0.036+j%3*0.014,1),new H0({color:16777215,roughness:0.1,transparent:!0,opacity:0,depthWrite:!1}));DJ.visible=!1,DJ.position.set(0,-100,0),this.rootGroup.add(DJ),this.steamParticles.push({mesh:DJ,life:0,vx:0,vy:0,vz:0})}}attachWheels(J,Q,$){let Z=new H0({color:1976635,metalness:0.75,roughness:0.25}),K=new H0({color:14251782,metalness:0.85,roughness:0.25}),W=new H0({color:14251782,metalness:0.55,roughness:0.35}),H=new h0($,$,0.018,20);H.rotateX(Math.PI*0.5);let Y=new h0($*0.36,$*0.36,0.024,12);Y.rotateX(Math.PI*0.5);let X=new Y0($*1.6,$*0.2,0.02),U=new Y0($*0.2,$*1.6,0.02);Q.forEach(([G,N,q])=>{let F=new v(H,Z);F.position.set(G,N,q),F.castShadow=!0;let R=new v(Y,K);F.add(R);let O=new v(X,W);F.add(O);let D=new v(U,W);F.add(D),J.add(F),this.rotatingWheels.push(F)})}setupWeatherSystem(){this.rainPositions=new Float32Array(this.rainCount*6),this.rainGeo=new wJ;let J=0.18;for(let K=0;K<this.rainCount;K++){let W=(Math.random()-0.5)*5.5,H=Math.random()*3.5,Y=(Math.random()-0.5)*4.5;this.rainPositions[K*6]=W,this.rainPositions[K*6+1]=H,this.rainPositions[K*6+2]=Y,this.rainPositions[K*6+3]=W-0.02,this.rainPositions[K*6+4]=H-J,this.rainPositions[K*6+5]=Y-0.01}this.rainGeo.setAttribute("position",new H9(this.rainPositions,3));let Q=new gQ({color:9684477,transparent:!0,opacity:0});this.rainStreaks=new ZZ(this.rainGeo,Q),this.weatherGroup.add(this.rainStreaks);let $=new uJ({color:12248829,transparent:!0,opacity:0,side:tJ}),Z=new a7(0.01,0.02,12);Z.rotateX(-Math.PI*0.5);for(let K=0;K<20;K++){let W=new v(Z,$.clone());W.position.set(0,-10,0),this.weatherGroup.add(W),this.splashRipples.push({mesh:W,life:0,maxRadius:0.12})}}setWeather(J){if(this.isRaining=J==="rain",this.rainStreaks){let Q=this.isRaining?0.65:0;VJ.to(this.rainStreaks.material,{opacity:Q,duration:0.8})}this.audio.setRain(this.isRaining)}triggerSplash(J,Q,$){let Z=this.splashRipples.find((K)=>K.life<=0);if(!Z)return;Z.mesh.position.set(J,Q+0.005,$),Z.mesh.scale.setScalar(0.2),Z.mesh.material.opacity=0.6,Z.life=1}bindEvents(){window.addEventListener("resize",()=>{let J=this.container.clientWidth,Q=this.container.clientHeight;if(J===0||Q===0)return;this.camera.aspect=J/Q,this.camera.updateProjectionMatrix(),this.renderer.setSize(J,Q)}),this.container.addEventListener("pointerdown",(J)=>{let Q=this.container.getBoundingClientRect();if(this.mousePos.x=(J.clientX-Q.left)/Q.width*2-1,this.mousePos.y=-((J.clientY-Q.top)/Q.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera),this.raycaster.intersectObjects([this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],!0).length>0){this.triggerWhistleHop();return}if(this.clockTowerGroup){if(this.raycaster.intersectObject(this.clockTowerGroup,!0).length>0){this.triggerClockBell();return}}let Z=this.raycaster.intersectObjects(this.interactiveTrees,!0);if(Z.length>0){let Y=Z[0].object;while(Y&&!this.interactiveTrees.includes(Y))Y=Y.parent;if(Y){this.triggerTreeWobble(Y);return}}if(this.mooredBoat){if(this.raycaster.intersectObject(this.mooredBoat,!0).length>0){this.triggerBoatRock();return}}let K=this.raycaster.intersectObjects(this.interactiveSheep,!0);if(K.length>0){let Y=K[0].object;while(Y&&!this.interactiveSheep.includes(Y))Y=Y.parent;if(Y){this.triggerSheepHop(Y);return}}if(this.raycaster.intersectObjects(this.viaductLanterns,!0).length>0){this.triggerLanternSpark();return}let H=this.raycaster.intersectObjects(this.interactivePoles,!0);if(H.length>0){let Y=H[0].object;while(Y&&!this.interactivePoles.includes(Y))Y=Y.parent;if(Y){this.triggerTelegraphPing(Y);return}}if(this.windmillGroup){if(this.raycaster.intersectObject(this.windmillGroup,!0).length>0){this.triggerWindmillSpin();return}}if(this.watermillGroup){if(this.raycaster.intersectObject(this.watermillGroup,!0).length>0){this.triggerWaterwheelSpin();return}}if(this.semaphoreGroup){if(this.raycaster.intersectObject(this.semaphoreGroup,!0).length>0){this.triggerSemaphoreToggle();return}}if(this.cottageGroup){if(this.raycaster.intersectObject(this.cottageGroup,!0).length>0){this.triggerCottageChimney();return}}if(this.waterMesh){let Y=this.raycaster.intersectObject(this.waterMesh,!0);if(Y.length>0){let X=Y[0].point;this.triggerSplash(X.x,X.y,X.z),this.audio.playWaterDrop()}}}),this.controls.addEventListener("start",()=>{if(this.currentViewMode==="cinematic")this.currentViewMode="orbit",this.updateActiveViewPill("orbit")}),this.container.addEventListener("pointermove",(J)=>{let Q=this.container.getBoundingClientRect();this.mousePos.x=(J.clientX-Q.left)/Q.width*2-1,this.mousePos.y=-((J.clientY-Q.top)/Q.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera);let $=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar,...this.clockTowerGroup?[this.clockTowerGroup]:[],...this.interactiveTrees,...this.mooredBoat?[this.mooredBoat]:[],...this.interactiveSheep,...this.viaductLanterns,...this.windmillGroup?[this.windmillGroup]:[],...this.watermillGroup?[this.watermillGroup]:[],...this.cottageGroup?[this.cottageGroup]:[],...this.semaphoreGroup?[this.semaphoreGroup]:[]];if(this.raycaster.intersectObjects($,!0).length>0)this.container.style.cursor="pointer";else{if(this.waterMesh){let K=this.raycaster.intersectObject(this.waterMesh,!0);if(K.length>0){this.container.style.cursor="cell";let W=performance.now();if(W-this.lastHoverRippleTime>160){this.lastHoverRippleTime=W;let H=K[0].point;this.triggerSplash(H.x,0.034,H.z)}return}}this.container.style.cursor="grab"}}),window.addEventListener("keydown",(J)=>{if(J.target instanceof HTMLInputElement||J.target instanceof HTMLTextAreaElement)return;if(J.code==="Space")J.preventDefault(),this.triggerWhistleHop();else if(J.code==="KeyR"){let Q=!this.isRaining;this.setWeather(Q?"rain":"fair"),document.querySelectorAll("[data-weather]").forEach(($)=>{$.classList.toggle("active",$.getAttribute("data-weather")===(Q?"rain":"fair"))})}else if(J.code==="KeyT")if(document.documentElement.getAttribute("data-theme")!=="dark")document.documentElement.setAttribute("data-theme","dark"),this.audio.playChime(523.25,0.08),this.setNightMode(!0);else document.documentElement.removeAttribute("data-theme"),this.audio.playChime(783.99,0.08),this.setNightMode(!1);else if(J.code==="Digit1")this.setViewMode("isometric"),this.updateActiveViewPill("isometric");else if(J.code==="Digit2")this.setViewMode("top"),this.updateActiveViewPill("top");else if(J.code==="Digit3")this.setViewMode("orbit"),this.updateActiveViewPill("orbit");else if(J.code==="Digit4")this.setViewMode("cinematic"),this.updateActiveViewPill("cinematic");else if(J.code==="ArrowUp")this.setSpeed(Math.min(3.6,this.speedMultiplier+0.5));else if(J.code==="ArrowDown")this.setSpeed(Math.max(0.5,this.speedMultiplier-0.5))})}updateActiveViewPill(J){document.querySelectorAll("[data-view]").forEach((Q)=>{Q.classList.toggle("active",Q.getAttribute("data-view")===J)})}triggerBoatRock(){if(!this.mooredBoat)return;this.audio.playBoatSlosh(),VJ.killTweensOf(this.mooredBoat.rotation),VJ.to(this.mooredBoat.rotation,{z:0.18,duration:0.22,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{if(this.mooredBoat)VJ.to(this.mooredBoat.rotation,{z:0,duration:0.3})}});let J=this.mooredBoat.position;this.triggerSplash(J.x,0.034,J.z)}triggerSheepHop(J){this.audio.playSheepHop(),VJ.to(J.position,{y:0.12,duration:0.18,yoyo:!0,repeat:1,ease:"power2.out",onComplete:()=>{J.position.y=0.04}}),VJ.to(J.rotation,{y:"+=0.6",duration:0.18,yoyo:!0,repeat:1,ease:"sine.inOut"})}triggerLanternSpark(){this.audio.playLanternSpark(),this.viaductLanternLights.forEach((J)=>{let Q=J.intensity;VJ.to(J,{intensity:3.5,duration:0.1,yoyo:!0,repeat:1,onComplete:()=>{J.intensity=Q}})})}triggerWhistleHop(){this.audio.playWhistle(),[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar].forEach((Q,$)=>{VJ.to(Q.position,{y:"+=0.16",duration:0.16,delay:$*0.04,yoyo:!0,repeat:1,ease:"power2.out"}),VJ.to(Q.scale,{y:1.18,x:0.92,z:0.92,duration:0.16,delay:$*0.04,yoyo:!0,repeat:1,ease:"power2.out"})});for(let Q=0;Q<5;Q++)setTimeout(()=>this.spawnSteamPuff(1.4),Q*50)}triggerClockBell(){if(this.audio.playBoardingBell(),setTimeout(()=>this.audio.playStationClock(),200),this.clockTowerGroup)VJ.to(this.clockTowerGroup.scale,{y:1.15,x:0.92,z:0.92,duration:0.15,yoyo:!0,repeat:1,ease:"power2.out"});if(this.clockHand)VJ.to(this.clockHand.rotation,{z:"-="+Math.PI*4,duration:0.8,ease:"power2.out"})}triggerTelegraphPing(J){this.audio.playTelegraphPing(),VJ.to(J.rotation,{z:0.12,duration:0.1,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{VJ.to(J.rotation,{z:0,duration:0.15})}})}triggerTreeWobble(J){this.audio.playRustle(),VJ.to(J.rotation,{z:0.16,duration:0.12,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{VJ.to(J.rotation,{z:0,duration:0.2})}})}spawnSteamPuff(J=1){let Q=this.steamParticles.find((K)=>K.life<=0);if(!Q)return;let $=new w(0.13,0.26,0);this.locoCar.localToWorld($),this.rootGroup.worldToLocal($),Q.mesh.position.copy($),Q.mesh.scale.setScalar(0.7*J),Q.mesh.visible=!0,Q.life=1,Q.vx=(Math.random()-0.5)*0.005,Q.vy=0.012+Math.random()*0.008,Q.vz=(Math.random()-0.5)*0.005;let Z=this.isTrainInTunnel();this.audio.playSteamChuff(Z)}isTrainInTunnel(){let J=(this.progress+1)%1;return J<0.045||J>0.955}setSpeed(J){if(this.speedMultiplier=J,this.audio.playSpeedWhoosh(J),J>=3)this.triggerWhistleHop()}setViewMode(J){if(this.currentViewMode=J,this.controls.enabled=J!=="cinematic",J==="top")this.controls.autoRotate=!1,VJ.to(this.camera.position,{x:0.01,y:6.2,z:0.01,duration:0.85,ease:"power2.inOut",onUpdate:()=>{this.controls.target.set(0,0,0),this.controls.update()}});else if(J==="isometric")this.controls.autoRotate=!1,VJ.to(this.camera.position,{x:3.8,y:2.85,z:3.8,duration:0.85,ease:"power2.inOut",onUpdate:()=>{this.controls.target.set(0,0.15,0),this.controls.update()}});else if(J==="orbit")this.controls.autoRotate=!0,this.controls.autoRotateSpeed=1.2;else if(J==="cinematic")this.controls.autoRotate=!1}setNightMode(J,Q=!1){if(this.isNightMode=J,Q){if(J){if(this.ambientLight)this.ambientLight.color.set(1976635),this.ambientLight.intensity=0.65;if(this.hemiLight)this.hemiLight.color.set(988970),this.hemiLight.groundColor.set(132631),this.hemiLight.intensity=0.35;if(this.sunLight)this.sunLight.position.set(6.5,0.25,1.8),this.sunLight.color.set(3718648),this.sunLight.intensity=0.15;if(this.moonLight)this.moonLight.intensity=1.45;if(this.moonMesh){if(this.moonMesh.position.set(-2,1.45,-0.8),this.moonMesh.scale.set(1,1,1),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0.85}if(this.starsPoints)this.starsPoints.material.opacity=0.85;if(this.headlampLight)this.headlampLight.intensity=1.8;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.2;if(this.headlampBeam)this.headlampBeam.visible=!0,this.headlampBeam.material.opacity=0.32;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,this.headlampCoreBeam.material.opacity=0.38;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,this.headlampTrackPool.material.opacity=0.45;if(this.coachWindowMat)this.coachWindowMat.emissive.set(16498468),this.coachWindowMat.emissiveIntensity=1.8;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=1.2;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=1.2;if(this.tailLight)this.tailLight.intensity=1.8;if(this.lanternLight)this.lanternLight.intensity=2.2;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Z)=>Z.intensity=1.4);if(this.tunnelLight)this.tunnelLight.intensity=0.9;if(this.windmillLight)this.windmillLight.intensity=0.85;if(this.watermillLight)this.watermillLight.intensity=0.85;if(this.cottageLight)this.cottageLight.intensity=1.1;this.fireflies.forEach((Z)=>{Z.mesh.visible=!0,Z.mesh.material.opacity=0.85}),this.audio.setNightAmbience(!0)}else{if(this.ambientLight)this.ambientLight.color.set(16777215),this.ambientLight.intensity=2.1;if(this.hemiLight)this.hemiLight.color.set(16776171),this.hemiLight.groundColor.set(14870768),this.hemiLight.intensity=1.2;if(this.sunLight)this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.color.set(16776171),this.sunLight.intensity=2.6;if(this.moonLight)this.moonLight.intensity=0;if(this.moonMesh){if(this.moonMesh.position.set(-2,-0.7,-0.8),this.moonMesh.scale.setScalar(0.001),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0}if(this.starsPoints)this.starsPoints.material.opacity=0;if(this.headlampLight)this.headlampLight.intensity=0.6;if(this.headlampSpotLight)this.headlampSpotLight.intensity=0;if(this.headlampBeam)this.headlampBeam.visible=!1,this.headlampBeam.material.opacity=0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1,this.headlampCoreBeam.material.opacity=0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1,this.headlampTrackPool.material.opacity=0;if(this.coachWindowMat)this.coachWindowMat.emissive.set(0),this.coachWindowMat.emissiveIntensity=0;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=0;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=0;if(this.tailLight)this.tailLight.intensity=0.8;if(this.lanternLight)this.lanternLight.intensity=0.8;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Z)=>Z.intensity=0);if(this.tunnelLight)this.tunnelLight.intensity=0.2;if(this.windmillLight)this.windmillLight.intensity=0;if(this.watermillLight)this.watermillLight.intensity=0;if(this.cottageLight)this.cottageLight.intensity=0;this.fireflies.forEach((Z)=>{Z.mesh.visible=!1,Z.mesh.material.opacity=0}),this.audio.setNightAmbience(!1)}return}let $=1.6;if(J){let Z=VJ.timeline();if(this.sunLight){Z.to(this.sunLight.position,{x:6.5,y:0.25,z:1.8,duration:$,ease:"power2.inOut"},0);let K={r:1,g:0.98,b:0.92};Z.to(K,{r:0.92,g:0.35,b:0.05,duration:$*0.5,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},0),Z.to(K,{r:0.22,g:0.74,b:0.97,duration:$*0.5,ease:"power1.in",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},$*0.5),Z.to(this.sunLight,{intensity:0.15,duration:$,ease:"power2.inOut"},0)}if(this.ambientLight){let K={r:1,g:1,b:1};Z.to(K,{r:0.98,g:0.57,b:0.24,duration:$*0.45,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},0),Z.to(K,{r:0.12,g:0.16,b:0.23,duration:$*0.55,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},$*0.45),Z.to(this.ambientLight,{intensity:0.65,duration:$},0)}if(this.hemiLight)Z.to(this.hemiLight,{intensity:0.35,duration:$},0);if(this.moonMesh){if(this.moonMesh.position.set(-2,-0.7,-0.8),Z.to(this.moonMesh.position,{y:1.45,duration:$,ease:"power2.out"},$*0.2),Z.to(this.moonMesh.scale,{x:1,y:1,z:1,duration:$,ease:"back.out(1.2)"},$*0.2),this.moonMesh.children[0])Z.to(this.moonMesh.children[0].material,{opacity:0.85,duration:$*0.8},$*0.3)}if(this.moonLight)Z.to(this.moonLight,{intensity:1.45,duration:$},$*0.3);if(this.starsPoints)Z.to(this.starsPoints.material,{opacity:0.85,duration:$*0.8},$*0.3);if(this.headlampLight)Z.to(this.headlampLight,{intensity:1.8,duration:$*0.7},$*0.3);if(this.headlampSpotLight)Z.to(this.headlampSpotLight,{intensity:2.2,duration:$*0.7},$*0.3);if(this.headlampBeam)this.headlampBeam.visible=!0,Z.to(this.headlampBeam.material,{opacity:0.32,duration:$*0.7},$*0.3);if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,Z.to(this.headlampCoreBeam.material,{opacity:0.38,duration:$*0.7},$*0.3);if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,Z.to(this.headlampTrackPool.material,{opacity:0.45,duration:$*0.7},$*0.3);if(this.coachWindowMat)Z.to(this.coachWindowMat.emissive,{r:0.98,g:0.75,b:0.14,duration:$*0.7},$*0.3),Z.to(this.coachWindowMat,{emissiveIntensity:1.8,duration:$*0.7},$*0.3);if(this.coachInteriorLight1)Z.to(this.coachInteriorLight1,{intensity:1.2,duration:$*0.7},$*0.3);if(this.coachInteriorLight2)Z.to(this.coachInteriorLight2,{intensity:1.2,duration:$*0.7},$*0.3);if(this.tailLight)Z.to(this.tailLight,{intensity:1.8,duration:$*0.7},$*0.3);if(this.lanternLight)Z.to(this.lanternLight,{intensity:2.2,duration:$*0.7},$*0.3);if(this.viaductLanternLights.forEach((K)=>{Z.to(K,{intensity:1.4,duration:$*0.7},$*0.3)}),this.tunnelLight)Z.to(this.tunnelLight,{intensity:0.9,duration:$*0.7},$*0.3);if(this.windmillLight)Z.to(this.windmillLight,{intensity:0.85,duration:$*0.7},$*0.3);if(this.watermillLight)Z.to(this.watermillLight,{intensity:0.85,duration:$*0.7},$*0.3);if(this.cottageLight)Z.to(this.cottageLight,{intensity:1.1,duration:$*0.7},$*0.3);this.fireflies.forEach((K)=>{K.mesh.visible=!0,Z.to(K.mesh.material,{opacity:0.85,duration:$*0.7},$*0.3)}),this.audio.setNightAmbience(!0)}else{let Z=VJ.timeline();if(this.moonMesh){if(Z.to(this.moonMesh.position,{y:-0.7,duration:$*0.7,ease:"power2.in"},0),Z.to(this.moonMesh.scale,{x:0.001,y:0.001,z:0.001,duration:$*0.7},0),this.moonMesh.children[0])Z.to(this.moonMesh.children[0].material,{opacity:0,duration:$*0.5},0)}if(this.moonLight)Z.to(this.moonLight,{intensity:0,duration:$*0.6},0);if(this.starsPoints)Z.to(this.starsPoints.material,{opacity:0,duration:$*0.6},0);if(this.headlampLight)Z.to(this.headlampLight,{intensity:0.6,duration:$*0.6},0);if(this.headlampSpotLight)Z.to(this.headlampSpotLight,{intensity:0,duration:$*0.6},0);if(this.headlampBeam)Z.to(this.headlampBeam.material,{opacity:0,duration:$*0.5,onComplete:()=>{if(this.headlampBeam)this.headlampBeam.visible=!1}},0);if(this.headlampCoreBeam)Z.to(this.headlampCoreBeam.material,{opacity:0,duration:$*0.5,onComplete:()=>{if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1}},0);if(this.headlampTrackPool)Z.to(this.headlampTrackPool.material,{opacity:0,duration:$*0.5,onComplete:()=>{if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}},0);if(this.coachWindowMat)Z.to(this.coachWindowMat.emissive,{r:0,g:0,b:0,duration:$*0.6},0),Z.to(this.coachWindowMat,{emissiveIntensity:0,duration:$*0.6},0);if(this.coachInteriorLight1)Z.to(this.coachInteriorLight1,{intensity:0,duration:$*0.6},0);if(this.coachInteriorLight2)Z.to(this.coachInteriorLight2,{intensity:0,duration:$*0.6},0);if(this.tailLight)Z.to(this.tailLight,{intensity:0.8,duration:$*0.6},0);if(this.lanternLight)Z.to(this.lanternLight,{intensity:0.8,duration:$*0.6},0);if(this.viaductLanternLights.forEach((K)=>{Z.to(K,{intensity:0,duration:$*0.5},0)}),this.tunnelLight)Z.to(this.tunnelLight,{intensity:0.2,duration:$*0.5},0);if(this.windmillLight)Z.to(this.windmillLight,{intensity:0,duration:$*0.5},0);if(this.watermillLight)Z.to(this.watermillLight,{intensity:0,duration:$*0.5},0);if(this.cottageLight)Z.to(this.cottageLight,{intensity:0,duration:$*0.5},0);if(this.fireflies.forEach((K)=>{Z.to(K.mesh.material,{opacity:0,duration:$*0.5,onComplete:()=>{K.mesh.visible=!1}},0)}),this.audio.setNightAmbience(!1),this.sunLight){this.sunLight.position.set(6.5,0.25,1.8),Z.to(this.sunLight.position,{x:5.5,y:7.5,z:4.2,duration:$,ease:"power2.out"},$*0.15);let K={r:0.96,g:0.45,b:0.15};this.sunLight.color.setRGB(K.r,K.g,K.b),Z.to(K,{r:1,g:0.98,b:0.92,duration:$*0.85,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},$*0.15),Z.to(this.sunLight,{intensity:2.6,duration:$},$*0.1)}if(this.ambientLight){let K={r:0.12,g:0.16,b:0.23};Z.to(K,{r:0.99,g:0.9,b:0.65,duration:$*0.4,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},$*0.1),Z.to(K,{r:1,g:1,b:1,duration:$*0.5,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},$*0.5),Z.to(this.ambientLight,{intensity:2.1,duration:$},$*0.1)}if(this.hemiLight)Z.to(this.hemiLight,{intensity:1.2,duration:$},$*0.1)}}animate=()=>{if(this.isDestroyed)return;this.progress=(this.progress+this.trainSpeed*this.speedMultiplier)%1;let J=[0,-0.028,-0.056,-0.084],Q=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],$=new w(0,1,0);if(Q.forEach((K,W)=>{let H=(this.progress+J[W]+1)%1,Y=this.trackCurve.getPointAt(H),X=this.trackCurve.getTangentAt(H).normalize(),U=new w().crossVectors(X,$).normalize(),G=new w().crossVectors(U,X).normalize(),N=new QJ().makeBasis(X,G,U);K.quaternion.setFromRotationMatrix(N),K.position.copy(Y)}),this.rotatingWheels.forEach((K)=>{K.rotation.z-=0.08*this.speedMultiplier}),this.railClickAccumulator+=this.trainSpeed*this.speedMultiplier,this.railClickAccumulator>=0.034){this.railClickAccumulator=0;let K=this.isTrainInTunnel();this.audio.playRailClickClack(this.speedMultiplier,K)}if(this.steamTimer+=this.speedMultiplier,this.steamTimer>=28)this.steamTimer=0,this.spawnSteamPuff(1);if(this.steamParticles.forEach((K)=>{if(K.life>0)K.life-=0.024,K.mesh.position.x+=K.vx,K.mesh.position.y+=K.vy,K.mesh.position.z+=K.vz,K.mesh.scale.multiplyScalar(1.035),K.mesh.visible=!0,K.mesh.material.opacity=Math.max(0,K.life*0.75);else K.mesh.visible=!1,K.mesh.position.set(0,-100,0),K.mesh.material.opacity=0}),this.isRaining&&this.rainPositions&&this.rainGeo){for(let W=0;W<this.rainCount;W++)if(this.rainPositions[W*6+1]-=0.11,this.rainPositions[W*6+4]-=0.11,this.rainPositions[W*6+1]<0.02){let H=(Math.random()-0.5)*5.2,Y=3.2+Math.random()*0.5,X=(Math.random()-0.5)*4.2;this.triggerSplash(this.rainPositions[W*6],0.025,this.rainPositions[W*6+2]),this.rainPositions[W*6]=H,this.rainPositions[W*6+1]=Y,this.rainPositions[W*6+2]=X,this.rainPositions[W*6+3]=H-0.02,this.rainPositions[W*6+4]=Y-0.18,this.rainPositions[W*6+5]=X-0.01}this.rainGeo.attributes.position.needsUpdate=!0}this.splashRipples.forEach((K)=>{if(K.life>0){K.life-=0.045;let W=1-K.life;K.mesh.scale.setScalar(0.2+W*K.maxRadius*8),K.mesh.material.opacity=Math.max(0,K.life*0.5)}else K.mesh.material.opacity=0});let Z=Date.now()%800<400;if(this.crossingLamp1&&this.crossingLamp2&&this.crossingLight1&&this.crossingLight2){if(this.crossingLamp1.visible=Z,this.crossingLight1.intensity=Z?0.9:0,this.crossingLight2.visible=!Z,this.crossingLight2.intensity=!Z?0.9:0,this.lastBlinkCycle!==Z){if(this.lastBlinkCycle=Z,Z){let K=this.locoCar.position;if(Math.hypot(K.x- -0.45,K.z-0.82)<0.95)this.audio.playCrossingBell()}}}if(this.clockHand)this.clockHand.rotation.z=-Date.now()*0.001;if(this.waterMesh)this.waterMesh.material.opacity=0.86+Math.sin(Date.now()*0.0018)*0.04;if(this.mooredBoat)this.mooredBoat.rotation.z=Math.sin(Date.now()*0.0015)*0.025,this.mooredBoat.position.y=0.038+Math.sin(Date.now()*0.0015)*0.0012;if(this.windmillSails){if(this.windmillSails.rotation.x-=this.windmillCurrentSpeed,this.windmillCurrentSpeed>this.windmillBaseSpeed)this.windmillCurrentSpeed=bQ.lerp(this.windmillCurrentSpeed,this.windmillBaseSpeed,0.015)}if(this.waterwheel)this.waterwheel.rotation.x+=0.016*this.speedMultiplier;if(this.fireflies.length>0){let K=Date.now()*0.001;this.fireflies.forEach((W)=>{if(W.mesh.position.x=W.baseX+Math.sin(K*W.speed+W.phase)*W.radius,W.mesh.position.y=W.baseY+Math.sin(K*W.speed*1.6+W.phase)*0.035,W.mesh.position.z=W.baseZ+Math.cos(K*W.speed*1.1+W.phase)*W.radius,this.isNightMode){W.mesh.visible=!0;let H=0.5+Math.sin(K*3.2+W.phase)*0.45;W.mesh.material.opacity=H}else W.mesh.visible=!1,W.mesh.material.opacity=0})}if(this.currentViewMode==="cinematic"){let K=this.locoCar.position,W=this.trackCurve.getTangentAt(this.progress).normalize(),H=K.clone().sub(W.clone().multiplyScalar(0.72)).add(new w(0,0.38,0)),Y=K.clone().add(W.clone().multiplyScalar(0.75)).add(new w(0,0.12,0));this.camera.position.lerp(H,0.08),this.camera.lookAt(Y),this.controls.target.copy(Y)}else this.controls.update();this.rootGroup.position.y=Math.sin(Date.now()*0.0012)*0.025,this.renderer.render(this.scene,this.camera),this.animFrameId=requestAnimationFrame(this.animate)};destroy(){this.isDestroyed=!0,cancelAnimationFrame(this.animFrameId),this.controls.dispose(),this.renderer.dispose()}}document.addEventListener("DOMContentLoaded",()=>{let J=new mZ;window.samtagonAudio=J;let Q=null;try{Q=new JH("three-viewport",J),window.samtagonStage=Q}catch($){console.warn("Three.js stage init fallback:",$)}pE(Q,J),console.log("Samtagon Studios online. Zen mode active.")});function pE(J,Q){document.documentElement.setAttribute("data-theme","dark");let $=!0;J?.setNightMode(!0,!0),document.getElementById("theme-toggle-btn")?.addEventListener("click",()=>{if($=!$,$)document.documentElement.setAttribute("data-theme","dark"),Q.playChime(523.25,0.08),J?.setNightMode(!0);else document.documentElement.removeAttribute("data-theme"),Q.playChime(783.99,0.08),J?.setNightMode(!1)});let K=document.getElementById("audio-toggle-btn"),W=K?.querySelector(".audio-on-icon"),H=K?.querySelector(".audio-off-icon"),Y=(R)=>{if(W&&H)W.style.display=R?"block":"none",H.style.display=R?"none":"block"};K?.addEventListener("click",()=>{let R=Q.toggleMute();Y(R)}),window.addEventListener("keydown",(R)=>{if(R.code==="KeyM"){let O=Q.toggleMute();Y(O)}});let X=document.querySelectorAll("[data-view]");X.forEach((R)=>{R.addEventListener("click",()=>{X.forEach((D)=>D.classList.remove("active")),R.classList.add("active");let O=R.dataset.view;J?.setViewMode(O),Q.playButtonPress()})});let U=document.querySelectorAll("[data-speed]");U.forEach((R)=>{R.addEventListener("click",()=>{U.forEach((D)=>D.classList.remove("active")),R.classList.add("active");let O=parseFloat(R.dataset.speed||"1");J?.setSpeed(O),Q.playButtonPress()})});let G=document.querySelectorAll("[data-weather]");G.forEach((R)=>{R.addEventListener("click",()=>{G.forEach((D)=>D.classList.remove("active")),R.classList.add("active");let O=R.dataset.weather==="rain";J?.setWeather(O?"rain":"fair"),Q.playButtonPress()})}),document.getElementById("whistle-btn")?.addEventListener("click",()=>{J?.triggerWhistleHop()}),document.getElementById("play-flagship-btn")?.addEventListener("click",()=>{Q.playChime(660,0.1)}),document.querySelectorAll(".game-pill").forEach((R,O)=>{let D=[523.25,587.33,659.25,783.99,880,1046.5],E=D[O%D.length];R.addEventListener("mouseenter",()=>{Q.playChime(E,0.04)}),R.addEventListener("click",()=>{Q.playChime(E*1.5,0.08),J?.triggerWhistleHop()})}),document.querySelector(".zen-brand")?.addEventListener("click",()=>{Q.playChime(880,0.12),J?.triggerWhistleHop()})}
