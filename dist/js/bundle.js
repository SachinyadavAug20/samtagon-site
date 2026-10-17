class zZ{ctx=null;isMuted=!0;masterGain=null;constructor(){let J=()=>{this.initContext(),this.isMuted=!1,window.removeEventListener("pointerdown",J),window.removeEventListener("keydown",J)};window.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("keydown",J,{passive:!0})}initContext(){if(!this.ctx){let J=window.AudioContext||window.webkitAudioContext;this.ctx=new J,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(0.18,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination)}if(this.ctx.state==="suspended")this.ctx.resume()}toggleMute(){if(this.initContext(),this.isMuted=!this.isMuted,this.masterGain&&this.ctx){let J=this.isMuted?0:0.18;this.masterGain.gain.setTargetAtTime(J,this.ctx.currentTime,0.05)}if(!this.isMuted)this.playChime(523.25,0.1),setTimeout(()=>this.playChime(659.25,0.15),100);return!this.isMuted}getStatus(){return!this.isMuted}playChime(J=880,$=0.12){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Z=this.ctx.createOscillator(),Q=this.ctx.createGain();Z.type="sine",Z.frequency.setValueAtTime(J,this.ctx.currentTime),Z.frequency.exponentialRampToValueAtTime(J*1.5,this.ctx.currentTime+$),Q.gain.setValueAtTime(0.25,this.ctx.currentTime),Q.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+$),Z.connect(Q),Q.connect(this.masterGain),Z.start(),Z.stop(this.ctx.currentTime+$)}catch{}}playVVVFWhine(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain();J.type="triangle";let Z=this.ctx.currentTime;J.frequency.setValueAtTime(220,Z),J.frequency.exponentialRampToValueAtTime(880,Z+0.35),$.gain.setValueAtTime(0.2,Z),$.gain.exponentialRampToValueAtTime(0.01,Z+0.4),J.connect($),$.connect(this.masterGain),J.start(Z),J.stop(Z+0.4)}catch{}}playSignalClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Z=this.ctx.currentTime;J.type="square",J.frequency.setValueAtTime(320,Z),J.frequency.setValueAtTime(160,Z+0.03),$.gain.setValueAtTime(0.15,Z),$.gain.exponentialRampToValueAtTime(0.001,Z+0.06),J.connect($),$.connect(this.masterGain),J.start(Z),J.stop(Z+0.06)}catch{}}playButtonPress(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Z=this.ctx.currentTime;J.type="sine",J.frequency.setValueAtTime(440,Z),J.frequency.exponentialRampToValueAtTime(880,Z+0.05),$.gain.setValueAtTime(0.18,Z),$.gain.exponentialRampToValueAtTime(0.001,Z+0.05),J.connect($),$.connect(this.masterGain),J.start(Z),J.stop(Z+0.05)}catch{}}playBoardingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createOscillator(),Z=this.ctx.createGain(),Q=this.ctx.currentTime;J.type="sine",$.type="triangle",J.frequency.setValueAtTime(1046.5,Q),$.frequency.setValueAtTime(1318.51,Q),Z.gain.setValueAtTime(0.2,Q),Z.gain.exponentialRampToValueAtTime(0.001,Q+0.2),J.connect(Z),$.connect(Z),Z.connect(this.masterGain),J.start(Q),$.start(Q),J.stop(Q+0.2),$.stop(Q+0.2)}catch{}}playWhistle(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=[587.33,783.99,987.77];[{time:J,dur:0.14},{time:J+0.18,dur:0.36}].forEach(({time:Q,dur:W})=>{$.forEach((K,Y)=>{if(!this.ctx||!this.masterGain)return;let X=this.ctx.createOscillator(),q=this.ctx.createGain();X.type=Y===0?"sine":"triangle",X.frequency.setValueAtTime(K*0.98,Q),X.frequency.linearRampToValueAtTime(K,Q+0.04),q.gain.setValueAtTime(0.001,Q),q.gain.linearRampToValueAtTime(0.08/$.length,Q+0.03),q.gain.exponentialRampToValueAtTime(0.001,Q+W),X.connect(q),q.connect(this.masterGain),X.start(Q),X.stop(Q+W+0.05)})})}catch{}}rainSource=null;rainGain=null;setRain(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{if(J){if(this.rainSource)return;let $=this.ctx.sampleRate*2,Z=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Q=Z.getChannelData(0),W=0,K=0,Y=0;for(let U=0;U<$;U++){let G=Math.random()*2-1;W=0.99886*W+G*0.0555179,K=0.99332*K+G*0.0750759,Y=0.969*Y+G*0.153852,Q[U]=(W+K+Y+G*0.5362)*0.04}let X=this.ctx.createBufferSource();X.buffer=Z,X.loop=!0;let q=this.ctx.createBiquadFilter();q.type="lowpass",q.frequency.setValueAtTime(950,this.ctx.currentTime);let H=this.ctx.createGain();H.gain.setValueAtTime(0.001,this.ctx.currentTime),H.gain.linearRampToValueAtTime(0.06,this.ctx.currentTime+1.2),X.connect(q),q.connect(H),H.connect(this.masterGain),X.start(),this.rainSource=X,this.rainGain=H}else if(this.rainSource&&this.rainGain){let $=this.ctx.currentTime;this.rainGain.gain.linearRampToValueAtTime(0.001,$+0.8),setTimeout(()=>{try{this.rainSource?.stop(),this.rainSource?.disconnect(),this.rainSource=null,this.rainGain=null}catch{}},850)}}catch{}}playRustle(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.12),Z.gain.setValueAtTime(0.09,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.12),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.12)}catch{}}playWaterDrop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1200+Math.random()*400,J),$.frequency.exponentialRampToValueAtTime(1800+Math.random()*400,J+0.08),Z.gain.setValueAtTime(0.08,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}playBoatSlosh(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(420,J),$.frequency.exponentialRampToValueAtTime(180,J+0.18),Z.gain.setValueAtTime(0.12,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.18),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.18),setTimeout(()=>this.playWaterDrop(),60)}catch{}}playSheepHop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(659.25,J),$.frequency.linearRampToValueAtTime(880,J+0.08),Z.gain.setValueAtTime(0.15,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playLanternSpark(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1760,J),$.frequency.exponentialRampToValueAtTime(2200,J+0.22),Z.gain.setValueAtTime(0.18,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.22),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.22)}catch{}}playRailClickClack(J=1,$=!1){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Z=this.ctx.currentTime,Q=$?0.14:0.075,W=$?700:1500;this.synthesizeAxleClick(Z,1080+Math.random()*80,Q,W),this.synthesizeAxleClick(Z+0.045,920+Math.random()*80,Q*0.8,W)}catch{}}synthesizeAxleClick(J,$,Z,Q){if(!this.ctx||!this.masterGain)return;let W=this.ctx.createOscillator(),K=this.ctx.createGain(),Y=this.ctx.createBiquadFilter();Y.type="bandpass",Y.frequency.setValueAtTime(Q,J),Y.Q.setValueAtTime(3.2,J),W.type="triangle",W.frequency.setValueAtTime($,J),W.frequency.exponentialRampToValueAtTime(140,J+0.038),K.gain.setValueAtTime(Z,J),K.gain.exponentialRampToValueAtTime(0.001,J+0.038),W.connect(Y),Y.connect(K),K.connect(this.masterGain),W.start(J),W.stop(J+0.04)}playSteamChuff(J=!1){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.currentTime,Z=0.085,Q=Math.floor(this.ctx.sampleRate*0.085),W=this.ctx.createBuffer(1,Q,this.ctx.sampleRate),K=W.getChannelData(0);for(let H=0;H<Q;H++)K[H]=(Math.random()*2-1)*Math.exp(-H/(Q*0.32));let Y=this.ctx.createBufferSource();Y.buffer=W;let X=this.ctx.createBiquadFilter();X.type="lowpass",X.frequency.setValueAtTime(J?380:680,$);let q=this.ctx.createGain();q.gain.setValueAtTime(J?0.11:0.065,$),q.gain.exponentialRampToValueAtTime(0.001,$+0.085),Y.connect(X),X.connect(q),q.connect(this.masterGain),Y.start($)}catch{}}playCrossingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1480,J),$.frequency.exponentialRampToValueAtTime(1470,J+0.16),Z.gain.setValueAtTime(0.08,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.16),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.16)}catch{}}playStationClock(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[440,554.37,659.25].forEach(($,Z)=>{if(!this.ctx||!this.masterGain)return;let Q=this.ctx.createOscillator(),W=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime($,J+Z*0.12),W.gain.setValueAtTime(0.12,J+Z*0.12),W.gain.exponentialRampToValueAtTime(0.001,J+Z*0.12+0.55),Q.connect(W),W.connect(this.masterGain),Q.start(J+Z*0.12),Q.stop(J+Z*0.12+0.6)})}catch{}}playTelegraphPing(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(880,J),$.frequency.exponentialRampToValueAtTime(440,J+0.14),Z.gain.setValueAtTime(0.07,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playSpeedWhoosh(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.currentTime,Z=this.ctx.createOscillator(),Q=this.ctx.createGain();Z.type="sine",Z.frequency.setValueAtTime(220,$),Z.frequency.exponentialRampToValueAtTime(220*J,$+0.28),Q.gain.setValueAtTime(0.11,$),Q.gain.exponentialRampToValueAtTime(0.001,$+0.28),Z.connect(Q),Q.connect(this.masterGain),Z.start($),Z.stop($+0.3)}catch{}}playWindmillSpin(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[180,240,360].forEach(($,Z)=>{if(!this.ctx||!this.masterGain)return;let Q=this.ctx.createOscillator(),W=this.ctx.createGain();Q.type="triangle",Q.frequency.setValueAtTime($,J+Z*0.05),Q.frequency.exponentialRampToValueAtTime($*1.25,J+Z*0.05+0.22),W.gain.setValueAtTime(0.08,J+Z*0.05),W.gain.exponentialRampToValueAtTime(0.001,J+Z*0.05+0.25),Q.connect(W),W.connect(this.masterGain),Q.start(J+Z*0.05),Q.stop(J+Z*0.05+0.28)})}catch{}}playWaterwheel(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.15),Z.gain.setValueAtTime(0.09,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.15),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.16),setTimeout(()=>this.playWaterDrop(),50)}catch{}}playSwitchClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(260,J),$.frequency.setValueAtTime(120,J+0.04),Z.gain.setValueAtTime(0.12,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}cricketTimer=null;setNightAmbience(J){if(this.cricketTimer)clearInterval(this.cricketTimer),this.cricketTimer=null;if(!J||this.isMuted||!this.ctx)return;let $=()=>{if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Z=this.ctx.currentTime,Q=2+Math.floor(Math.random()*2);for(let W=0;W<Q;W++){let K=Z+W*0.06,Y=this.ctx.createOscillator(),X=this.ctx.createGain();Y.type="sine",Y.frequency.setValueAtTime(4600+Math.random()*200,K),X.gain.setValueAtTime(0.018,K),X.gain.exponentialRampToValueAtTime(0.0001,K+0.035),Y.connect(X),X.connect(this.masterGain),Y.start(K),Y.stop(K+0.04)}}catch{}};$(),this.cricketTimer=window.setInterval($,3200)}playCampfirePop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;for(let $=0;$<3;$++){let Z=J+$*0.05+Math.random()*0.03,Q=this.ctx.createOscillator(),W=this.ctx.createGain();Q.type="triangle",Q.frequency.setValueAtTime(1400+Math.random()*800,Z),Q.frequency.exponentialRampToValueAtTime(120,Z+0.03),W.gain.setValueAtTime(0.06,Z),W.gain.exponentialRampToValueAtTime(0.001,Z+0.035),Q.connect(W),W.connect(this.masterGain),Q.start(Z),Q.stop(Z+0.04)}}catch{}}playWaterTowerSpray(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(180,J),$.frequency.exponentialRampToValueAtTime(60,J+0.12),Z.gain.setValueAtTime(0.14,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.15);let Q=this.ctx.sampleRate*0.35,W=this.ctx.createBuffer(1,Q,this.ctx.sampleRate),K=W.getChannelData(0);for(let H=0;H<Q;H++)K[H]=Math.random()*2-1;let Y=this.ctx.createBufferSource();Y.buffer=W;let X=this.ctx.createBiquadFilter();X.type="bandpass",X.frequency.setValueAtTime(900,J+0.05),X.Q.value=1.2;let q=this.ctx.createGain();q.gain.setValueAtTime(0.001,J+0.05),q.gain.linearRampToValueAtTime(0.12,J+0.12),q.gain.exponentialRampToValueAtTime(0.001,J+0.4),Y.connect(X),X.connect(q),q.connect(this.masterGain),Y.start(J+0.05),Y.stop(J+0.42)}catch{}}playSheepBleat(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain(),Q=this.ctx.createOscillator(),W=this.ctx.createGain();Q.frequency.value=11,W.gain.value=24,Q.connect($.frequency),$.type="sawtooth",$.frequency.setValueAtTime(290,J),$.frequency.exponentialRampToValueAtTime(240,J+0.28);let K=this.ctx.createBiquadFilter();K.type="lowpass",K.frequency.value=850,Z.gain.setValueAtTime(0.001,J),Z.gain.linearRampToValueAtTime(0.09,J+0.04),Z.gain.exponentialRampToValueAtTime(0.001,J+0.32),$.connect(K),K.connect(Z),Z.connect(this.masterGain),Q.start(J),$.start(J),Q.stop(J+0.33),$.stop(J+0.33)}catch{}}playBalloonBurner(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.sampleRate*0.45,Z=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Q=Z.getChannelData(0);for(let X=0;X<$;X++)Q[X]=Math.random()*2-1;let W=this.ctx.createBufferSource();W.buffer=Z;let K=this.ctx.createBiquadFilter();K.type="lowpass",K.frequency.setValueAtTime(320,J),K.frequency.linearRampToValueAtTime(650,J+0.2),K.frequency.exponentialRampToValueAtTime(220,J+0.45);let Y=this.ctx.createGain();Y.gain.setValueAtTime(0.01,J),Y.gain.linearRampToValueAtTime(0.12,J+0.15),Y.gain.exponentialRampToValueAtTime(0.001,J+0.45),W.connect(K),K.connect(Y),Y.connect(this.masterGain),W.start(J),W.stop(J+0.46)}catch{}}playCathedralChime(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[{f:440,a:0.14,d:1.4},{f:523.25,a:0.1,d:1.1},{f:659.25,a:0.08,d:0.8},{f:880,a:0.05,d:0.5}].forEach(({f:Z,a:Q,d:W})=>{if(!this.ctx||!this.masterGain)return;let K=this.ctx.createOscillator(),Y=this.ctx.createGain();K.type="sine",K.frequency.setValueAtTime(Z,J),Y.gain.setValueAtTime(Q,J),Y.gain.exponentialRampToValueAtTime(0.0005,J+W),K.connect(Y),Y.connect(this.masterGain),K.start(J),K.stop(J+W)})}catch{}}playMorningBirdSong(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[2800,3400,4200].forEach((Z,Q)=>{if(!this.ctx||!this.masterGain)return;let W=J+Q*0.11,K=this.ctx.createOscillator(),Y=this.ctx.createGain();K.type="sine",K.frequency.setValueAtTime(Z,W),K.frequency.exponentialRampToValueAtTime(Z*1.3,W+0.08),Y.gain.setValueAtTime(0.04,W),Y.gain.exponentialRampToValueAtTime(0.001,W+0.09),K.connect(Y),Y.connect(this.masterGain),K.start(W),K.stop(W+0.1)})}catch{}}}var B8={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},z8={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3};var I6=2;var $8=2;var I8=2;var L6=4;var f7=1000;class mJ{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Z=this._listeners;if(Z[J]===void 0)Z[J]=[];if(Z[J].indexOf($)===-1)Z[J].push($)}hasEventListener(J,$){if(this._listeners===void 0)return!1;let Z=this._listeners;return Z[J]!==void 0&&Z[J].indexOf($)!==-1}removeEventListener(J,$){if(this._listeners===void 0)return;let Q=this._listeners[J];if(Q!==void 0){let W=Q.indexOf($);if(W!==-1)Q.splice(W,1)}}dispatchEvent(J){if(this._listeners===void 0)return;let Z=this._listeners[J.type];if(Z!==void 0){J.target=this;let Q=Z.slice(0);for(let W=0,K=Q.length;W<K;W++)Q[W].call(this,J);J.target=null}}}var m9=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],M5=1234567,T7=Math.PI/180,$7=180/Math.PI;function gJ(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0,Q=Math.random()*4294967295|0;return(m9[J&255]+m9[J>>8&255]+m9[J>>16&255]+m9[J>>24&255]+"-"+m9[$&255]+m9[$>>8&255]+"-"+m9[$>>16&15|64]+m9[$>>24&255]+"-"+m9[Z&63|128]+m9[Z>>8&255]+"-"+m9[Z>>16&255]+m9[Z>>24&255]+m9[Q&255]+m9[Q>>8&255]+m9[Q>>16&255]+m9[Q>>24&255]).toLowerCase()}function x9(J,$,Z){return Math.max($,Math.min(Z,J))}function $Q(J,$){return(J%$+$)%$}function SK(J,$,Z,Q,W){return Q+(J-$)*(W-Q)/(Z-$)}function wK(J,$,Z){if(J!==$)return(Z-J)/($-J);else return 0}function _7(J,$,Z){return(1-Z)*J+Z*$}function TK(J,$,Z,Q){return _7(J,$,1-Math.exp(-Z*Q))}function _K(J,$=1){return $-Math.abs($Q(J,$*2)-$)}function jK(J,$,Z){if(J<=$)return 0;if(J>=Z)return 1;return J=(J-$)/(Z-$),J*J*(3-2*J)}function bK(J,$,Z){if(J<=$)return 0;if(J>=Z)return 1;return J=(J-$)/(Z-$),J*J*J*(J*(J*6-15)+10)}function xK(J,$){return J+Math.floor(Math.random()*($-J+1))}function yK(J,$){return J+Math.random()*($-J)}function fK(J){return J*(0.5-Math.random())}function hK(J){if(J!==void 0)M5=J;let $=M5+=1831565813;return $=Math.imul($^$>>>15,$|1),$^=$+Math.imul($^$>>>7,$|61),(($^$>>>14)>>>0)/4294967296}function vK(J){return J*T7}function gK(J){return J*$7}function rZ(J){return(J&J-1)===0&&J!==0}function mK(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function v$(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function uK(J,$,Z,Q,W){let{cos:K,sin:Y}=Math,X=K(Z/2),q=Y(Z/2),H=K(($+Q)/2),U=Y(($+Q)/2),G=K(($-Q)/2),F=Y(($-Q)/2),D=K((Q-$)/2),O=Y((Q-$)/2);switch(W){case"XYX":J.set(X*U,q*G,q*F,X*H);break;case"YZY":J.set(q*F,X*U,q*G,X*H);break;case"ZXZ":J.set(q*G,q*F,X*U,X*H);break;case"XZX":J.set(X*U,q*O,q*D,X*H);break;case"YXY":J.set(q*D,X*U,q*O,X*H);break;case"ZYZ":J.set(q*O,q*D,X*U,X*H);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function MJ(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function Z9(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var u$={DEG2RAD:T7,RAD2DEG:$7,generateUUID:gJ,clamp:x9,euclideanModulo:$Q,mapLinear:SK,inverseLerp:wK,lerp:_7,damp:TK,pingpong:_K,smoothstep:jK,smootherstep:bK,randInt:xK,randFloat:yK,randFloatSpread:fK,seededRandom:hK,degToRad:vK,radToDeg:gK,isPowerOfTwo:rZ,ceilPowerOfTwo:mK,floorPowerOfTwo:v$,setQuaternionFromProperEuler:uK,normalize:Z9,denormalize:MJ};class U0{constructor(J=0,$=0){U0.prototype.isVector2=!0,this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Z=this.y,Q=J.elements;return this.x=Q[0]*$+Q[3]*Z+Q[6],this.y=Q[1]*$+Q[4]*Z+Q[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Z=this.dot(J)/$;return Math.acos(x9(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Z=this.y-J.y;return $*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Z=Math.cos($),Q=Math.sin($),W=this.x-J.x,K=this.y-J.y;return this.x=W*Z-K*Q+J.x,this.y=W*Q+K*Z+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class s0{constructor(J,$,Z,Q,W,K,Y,X,q){if(s0.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Z,Q,W,K,Y,X,q)}set(J,$,Z,Q,W,K,Y,X,q){let H=this.elements;return H[0]=J,H[1]=Q,H[2]=Y,H[3]=$,H[4]=W,H[5]=X,H[6]=Z,H[7]=K,H[8]=q,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Z=J.elements;return $[0]=Z[0],$[1]=Z[1],$[2]=Z[2],$[3]=Z[3],$[4]=Z[4],$[5]=Z[5],$[6]=Z[6],$[7]=Z[7],$[8]=Z[8],this}extractBasis(J,$,Z){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Z.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Z=J.elements,Q=$.elements,W=this.elements,K=Z[0],Y=Z[3],X=Z[6],q=Z[1],H=Z[4],U=Z[7],G=Z[2],F=Z[5],D=Z[8],O=Q[0],E=Q[3],V=Q[6],R=Q[1],N=Q[4],B=Q[7],I=Q[2],L=Q[5],M=Q[8];return W[0]=K*O+Y*R+X*I,W[3]=K*E+Y*N+X*L,W[6]=K*V+Y*B+X*M,W[1]=q*O+H*R+U*I,W[4]=q*E+H*N+U*L,W[7]=q*V+H*B+U*M,W[2]=G*O+F*R+D*I,W[5]=G*E+F*N+D*L,W[8]=G*V+F*B+D*M,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],q=J[7],H=J[8];return $*K*H-$*Y*q-Z*W*H+Z*Y*X+Q*W*q-Q*K*X}invert(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],q=J[7],H=J[8],U=H*K-Y*q,G=Y*X-H*W,F=q*W-K*X,D=$*U+Z*G+Q*F;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let O=1/D;return J[0]=U*O,J[1]=(Q*q-H*Z)*O,J[2]=(Y*Z-Q*K)*O,J[3]=G*O,J[4]=(H*$-Q*X)*O,J[5]=(Q*W-Y*$)*O,J[6]=F*O,J[7]=(Z*X-q*$)*O,J[8]=(K*$-Z*W)*O,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Z,Q,W,K,Y){let X=Math.cos(W),q=Math.sin(W);return this.set(Z*X,Z*q,-Z*(X*K+q*Y)+K+J,-Q*q,Q*X,-Q*(-q*K+X*Y)+Y+$,0,0,1),this}scale(J,$){return this.premultiply(IZ.makeScale(J,$)),this}rotate(J){return this.premultiply(IZ.makeRotation(-J)),this}translate(J,$){return this.premultiply(IZ.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,-Z,0,Z,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Z=J.elements;for(let Q=0;Q<9;Q++)if($[Q]!==Z[Q])return!1;return!0}fromArray(J,$=0){for(let Z=0;Z<9;Z++)this.elements[Z]=J[Z+$];return this}toArray(J=[],$=0){let Z=this.elements;return J[$]=Z[0],J[$+1]=Z[1],J[$+2]=Z[2],J[$+3]=Z[3],J[$+4]=Z[4],J[$+5]=Z[5],J[$+6]=Z[6],J[$+7]=Z[7],J[$+8]=Z[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var IZ=new s0;function M6(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function g$(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function dK(){let J=g$("canvas");return J.style.display="block",J}var C5={};function j7(J){if(J in C5)return;C5[J]=!0,console.warn(J)}var A5=new s0().set(0.8224621,0.177538,0,0.0331941,0.9668058,0,0.0170827,0.0723974,0.9105199),k5=new s0().set(1.2249401,-0.2249404,0,-0.0420569,1.0420571,0,-0.0196376,-0.0786361,1.0982735),Y$={["srgb-linear"]:{transfer:"linear",primaries:"rec709",toReference:(J)=>J,fromReference:(J)=>J},["srgb"]:{transfer:"srgb",primaries:"rec709",toReference:(J)=>J.convertSRGBToLinear(),fromReference:(J)=>J.convertLinearToSRGB()},["display-p3-linear"]:{transfer:"linear",primaries:"p3",toReference:(J)=>J.applyMatrix3(k5),fromReference:(J)=>J.applyMatrix3(A5)},["display-p3"]:{transfer:"srgb",primaries:"p3",toReference:(J)=>J.convertSRGBToLinear().applyMatrix3(k5),fromReference:(J)=>J.applyMatrix3(A5).convertLinearToSRGB()}},pK=new Set(["srgb-linear","display-p3-linear"]),W9={enabled:!0,_workingColorSpace:"srgb-linear",get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(J){if(!pK.has(J))throw Error(`Unsupported working color space, "${J}".`);this._workingColorSpace=J},convert:function(J,$,Z){if(this.enabled===!1||$===Z||!$||!Z)return J;let Q=Y$[$].toReference,W=Y$[Z].fromReference;return W(Q(J))},fromWorkingColorSpace:function(J,$){return this.convert(J,this._workingColorSpace,$)},toWorkingColorSpace:function(J,$){return this.convert(J,$,this._workingColorSpace)},getPrimaries:function(J){return Y$[J].primaries},getTransfer:function(J){if(J==="")return"linear";return Y$[J].transfer}};function J7(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function LZ(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var b8;class ZQ{static getDataURL(J){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(b8===void 0)b8=g$("canvas");b8.width=J.width,b8.height=J.height;let Z=b8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=b8}if($.width>2048||$.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",J),$.toDataURL("image/jpeg",0.6);else return $.toDataURL("image/png")}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=g$("canvas");$.width=J.width,$.height=J.height;let Z=$.getContext("2d");Z.drawImage(J,0,0,J.width,J.height);let Q=Z.getImageData(0,0,J.width,J.height),W=Q.data;for(let K=0;K<W.length;K++)W[K]=J7(W[K]/255)*255;return Z.putImageData(Q,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Z=0;Z<$.length;Z++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Z]=Math.floor(J7($[Z]/255)*255);else $[Z]=J7($[Z]);return{data:$,width:J.width,height:J.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var lK=0;class QQ{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lK++}),this.uuid=gJ(),this.data=J,this.version=0}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Z={uuid:this.uuid,url:""},Q=this.data;if(Q!==null){let W;if(Array.isArray(Q)){W=[];for(let K=0,Y=Q.length;K<Y;K++)if(Q[K].isDataTexture)W.push(MZ(Q[K].image));else W.push(MZ(Q[K]))}else W=MZ(Q);Z.url=W}if(!$)J.images[this.uuid]=Z;return Z}}function MZ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return ZQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var cK=0;class r9 extends mJ{constructor(J=r9.DEFAULT_IMAGE,$=r9.DEFAULT_MAPPING,Z=1001,Q=1001,W=1006,K=1008,Y=1023,X=1009,q=r9.DEFAULT_ANISOTROPY,H=""){super();if(this.isTexture=!0,Object.defineProperty(this,"id",{value:cK++}),this.uuid=gJ(),this.name="",this.source=new QQ(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Z,this.wrapT=Q,this.magFilter=W,this.minFilter=K,this.anisotropy=q,this.format=Y,this.internalFormat=null,this.type=X,this.offset=new U0(0,0),this.repeat=new U0(1,1),this.center=new U0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new s0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof H==="string")this.colorSpace=H;else j7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=H===3001?"srgb":"";this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(J=null){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Z={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(!$)J.textures[this.uuid]=Z;return Z}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}get encoding(){return j7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace==="srgb"?3001:3000}set encoding(J){j7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=J===3001?"srgb":""}}r9.DEFAULT_IMAGE=null;r9.DEFAULT_MAPPING=300;r9.DEFAULT_ANISOTROPY=1;class H9{constructor(J=0,$=0,Z=0,Q=1){H9.prototype.isVector4=!0,this.x=J,this.y=$,this.z=Z,this.w=Q}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Z,Q){return this.x=J,this.y=$,this.z=Z,this.w=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Z=this.y,Q=this.z,W=this.w,K=J.elements;return this.x=K[0]*$+K[4]*Z+K[8]*Q+K[12]*W,this.y=K[1]*$+K[5]*Z+K[9]*Q+K[13]*W,this.z=K[2]*$+K[6]*Z+K[10]*Q+K[14]*W,this.w=K[3]*$+K[7]*Z+K[11]*Q+K[15]*W,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Z,Q,W,K=0.01,Y=0.1,X=J.elements,q=X[0],H=X[4],U=X[8],G=X[1],F=X[5],D=X[9],O=X[2],E=X[6],V=X[10];if(Math.abs(H-G)<0.01&&Math.abs(U-O)<0.01&&Math.abs(D-E)<0.01){if(Math.abs(H+G)<0.1&&Math.abs(U+O)<0.1&&Math.abs(D+E)<0.1&&Math.abs(q+F+V-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let N=(q+1)/2,B=(F+1)/2,I=(V+1)/2,L=(H+G)/4,M=(U+O)/4,A=(D+E)/4;if(N>B&&N>I)if(N<0.01)Z=0,Q=0.707106781,W=0.707106781;else Z=Math.sqrt(N),Q=L/Z,W=M/Z;else if(B>I)if(B<0.01)Z=0.707106781,Q=0,W=0.707106781;else Q=Math.sqrt(B),Z=L/Q,W=A/Q;else if(I<0.01)Z=0.707106781,Q=0.707106781,W=0;else W=Math.sqrt(I),Z=M/W,Q=A/W;return this.set(Z,Q,W,$),this}let R=Math.sqrt((E-D)*(E-D)+(U-O)*(U-O)+(G-H)*(G-H));if(Math.abs(R)<0.001)R=1;return this.x=(E-D)/R,this.y=(U-O)/R,this.z=(G-H)/R,this.w=Math.acos((q+F+V-1)/2),this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this.w=Math.max(J.w,Math.min($.w,this.w)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this.w=Math.max(J,Math.min($,this.w)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this.z=J.z+($.z-J.z)*Z,this.w=J.w+($.w-J.w)*Z,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class C6 extends mJ{constructor(J=1,$=1,Z={}){super();this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=1,this.scissor=new H9(0,0,J,$),this.scissorTest=!1,this.viewport=new H9(0,0,J,$);let Q={width:J,height:$,depth:1};if(Z.encoding!==void 0)j7("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),Z.colorSpace=Z.encoding===3001?"srgb":"";Z=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},Z),this.texture=new r9(Q,Z.mapping,Z.wrapS,Z.wrapT,Z.magFilter,Z.minFilter,Z.format,Z.type,Z.anisotropy,Z.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=Z.generateMipmaps,this.texture.internalFormat=Z.internalFormat,this.depthBuffer=Z.depthBuffer,this.stencilBuffer=Z.stencilBuffer,this.depthTexture=Z.depthTexture,this.samples=Z.samples}setSize(J,$,Z=1){if(this.width!==J||this.height!==$||this.depth!==Z)this.width=J,this.height=$,this.depth=Z,this.texture.image.width=J,this.texture.image.height=$,this.texture.image.depth=Z,this.dispose();this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.texture=J.texture.clone(),this.texture.isRenderTargetTexture=!0;let $=Object.assign({},J.texture.image);if(this.texture.source=new QQ($),this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class eJ extends C6{constructor(J=1,$=1,Z={}){super(J,$,Z);this.isWebGLRenderTarget=!0}}class WQ extends r9{constructor(J=null,$=1,Z=1,Q=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Z,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class A6 extends r9{constructor(J=null,$=1,Z=1,Q=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Z,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class CJ{constructor(J=0,$=0,Z=0,Q=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Z,this._w=Q}static slerpFlat(J,$,Z,Q,W,K,Y){let X=Z[Q+0],q=Z[Q+1],H=Z[Q+2],U=Z[Q+3],G=W[K+0],F=W[K+1],D=W[K+2],O=W[K+3];if(Y===0){J[$+0]=X,J[$+1]=q,J[$+2]=H,J[$+3]=U;return}if(Y===1){J[$+0]=G,J[$+1]=F,J[$+2]=D,J[$+3]=O;return}if(U!==O||X!==G||q!==F||H!==D){let E=1-Y,V=X*G+q*F+H*D+U*O,R=V>=0?1:-1,N=1-V*V;if(N>Number.EPSILON){let I=Math.sqrt(N),L=Math.atan2(I,V*R);E=Math.sin(E*L)/I,Y=Math.sin(Y*L)/I}let B=Y*R;if(X=X*E+G*B,q=q*E+F*B,H=H*E+D*B,U=U*E+O*B,E===1-Y){let I=1/Math.sqrt(X*X+q*q+H*H+U*U);X*=I,q*=I,H*=I,U*=I}}J[$]=X,J[$+1]=q,J[$+2]=H,J[$+3]=U}static multiplyQuaternionsFlat(J,$,Z,Q,W,K){let Y=Z[Q],X=Z[Q+1],q=Z[Q+2],H=Z[Q+3],U=W[K],G=W[K+1],F=W[K+2],D=W[K+3];return J[$]=Y*D+H*U+X*F-q*G,J[$+1]=X*D+H*G+q*U-Y*F,J[$+2]=q*D+H*F+Y*G-X*U,J[$+3]=H*D-Y*U-X*G-q*F,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Z,Q){return this._x=J,this._y=$,this._z=Z,this._w=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Z,_y:Q,_z:W,_order:K}=J,Y=Math.cos,X=Math.sin,q=Y(Z/2),H=Y(Q/2),U=Y(W/2),G=X(Z/2),F=X(Q/2),D=X(W/2);switch(K){case"XYZ":this._x=G*H*U+q*F*D,this._y=q*F*U-G*H*D,this._z=q*H*D+G*F*U,this._w=q*H*U-G*F*D;break;case"YXZ":this._x=G*H*U+q*F*D,this._y=q*F*U-G*H*D,this._z=q*H*D-G*F*U,this._w=q*H*U+G*F*D;break;case"ZXY":this._x=G*H*U-q*F*D,this._y=q*F*U+G*H*D,this._z=q*H*D+G*F*U,this._w=q*H*U-G*F*D;break;case"ZYX":this._x=G*H*U-q*F*D,this._y=q*F*U+G*H*D,this._z=q*H*D-G*F*U,this._w=q*H*U+G*F*D;break;case"YZX":this._x=G*H*U+q*F*D,this._y=q*F*U+G*H*D,this._z=q*H*D-G*F*U,this._w=q*H*U-G*F*D;break;case"XZY":this._x=G*H*U-q*F*D,this._y=q*F*U-G*H*D,this._z=q*H*D+G*F*U,this._w=q*H*U+G*F*D;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+K)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Z=$/2,Q=Math.sin(Z);return this._x=J.x*Q,this._y=J.y*Q,this._z=J.z*Q,this._w=Math.cos(Z),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Z=$[0],Q=$[4],W=$[8],K=$[1],Y=$[5],X=$[9],q=$[2],H=$[6],U=$[10],G=Z+Y+U;if(G>0){let F=0.5/Math.sqrt(G+1);this._w=0.25/F,this._x=(H-X)*F,this._y=(W-q)*F,this._z=(K-Q)*F}else if(Z>Y&&Z>U){let F=2*Math.sqrt(1+Z-Y-U);this._w=(H-X)/F,this._x=0.25*F,this._y=(Q+K)/F,this._z=(W+q)/F}else if(Y>U){let F=2*Math.sqrt(1+Y-Z-U);this._w=(W-q)/F,this._x=(Q+K)/F,this._y=0.25*F,this._z=(X+H)/F}else{let F=2*Math.sqrt(1+U-Z-Y);this._w=(K-Q)/F,this._x=(W+q)/F,this._y=(X+H)/F,this._z=0.25*F}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Z=J.dot($)+1;if(Z<Number.EPSILON)if(Z=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Z;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Z;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Z;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(x9(this.dot(J),-1,1)))}rotateTowards(J,$){let Z=this.angleTo(J);if(Z===0)return this;let Q=Math.min(1,$/Z);return this.slerp(J,Q),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Z,_y:Q,_z:W,_w:K}=J,Y=$._x,X=$._y,q=$._z,H=$._w;return this._x=Z*H+K*Y+Q*q-W*X,this._y=Q*H+K*X+W*Y-Z*q,this._z=W*H+K*q+Z*X-Q*Y,this._w=K*H-Z*Y-Q*X-W*q,this._onChangeCallback(),this}slerp(J,$){if($===0)return this;if($===1)return this.copy(J);let Z=this._x,Q=this._y,W=this._z,K=this._w,Y=K*J._w+Z*J._x+Q*J._y+W*J._z;if(Y<0)this._w=-J._w,this._x=-J._x,this._y=-J._y,this._z=-J._z,Y=-Y;else this.copy(J);if(Y>=1)return this._w=K,this._x=Z,this._y=Q,this._z=W,this;let X=1-Y*Y;if(X<=Number.EPSILON){let F=1-$;return this._w=F*K+$*this._w,this._x=F*Z+$*this._x,this._y=F*Q+$*this._y,this._z=F*W+$*this._z,this.normalize(),this}let q=Math.sqrt(X),H=Math.atan2(q,Y),U=Math.sin((1-$)*H)/q,G=Math.sin($*H)/q;return this._w=K*U+this._w*G,this._x=Z*U+this._x*G,this._y=Q*U+this._y*G,this._z=W*U+this._z*G,this._onChangeCallback(),this}slerpQuaternions(J,$,Z){return this.copy(J).slerp($,Z)}random(){let J=Math.random(),$=Math.sqrt(1-J),Z=Math.sqrt(J),Q=2*Math.PI*Math.random(),W=2*Math.PI*Math.random();return this.set($*Math.cos(Q),Z*Math.sin(W),Z*Math.cos(W),$*Math.sin(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(J=0,$=0,Z=0){T.prototype.isVector3=!0,this.x=J,this.y=$,this.z=Z}set(J,$,Z){if(Z===void 0)Z=this.z;return this.x=J,this.y=$,this.z=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(P5.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(P5.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Z=this.y,Q=this.z,W=J.elements;return this.x=W[0]*$+W[3]*Z+W[6]*Q,this.y=W[1]*$+W[4]*Z+W[7]*Q,this.z=W[2]*$+W[5]*Z+W[8]*Q,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Z=this.y,Q=this.z,W=J.elements,K=1/(W[3]*$+W[7]*Z+W[11]*Q+W[15]);return this.x=(W[0]*$+W[4]*Z+W[8]*Q+W[12])*K,this.y=(W[1]*$+W[5]*Z+W[9]*Q+W[13])*K,this.z=(W[2]*$+W[6]*Z+W[10]*Q+W[14])*K,this}applyQuaternion(J){let $=this.x,Z=this.y,Q=this.z,W=J.x,K=J.y,Y=J.z,X=J.w,q=2*(K*Q-Y*Z),H=2*(Y*$-W*Q),U=2*(W*Z-K*$);return this.x=$+X*q+K*U-Y*H,this.y=Z+X*H+Y*q-W*U,this.z=Q+X*U+W*H-K*q,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Z=this.y,Q=this.z,W=J.elements;return this.x=W[0]*$+W[4]*Z+W[8]*Q,this.y=W[1]*$+W[5]*Z+W[9]*Q,this.z=W[2]*$+W[6]*Z+W[10]*Q,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this.z=J.z+($.z-J.z)*Z,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Z,y:Q,z:W}=J,K=$.x,Y=$.y,X=$.z;return this.x=Q*X-W*Y,this.y=W*K-Z*X,this.z=Z*Y-Q*K,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Z=J.dot(this)/$;return this.copy(J).multiplyScalar(Z)}projectOnPlane(J){return CZ.copy(this).projectOnVector(J),this.sub(CZ)}reflect(J){return this.sub(CZ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Z=this.dot(J)/$;return Math.acos(x9(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Z=this.y-J.y,Q=this.z-J.z;return $*$+Z*Z+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Z){let Q=Math.sin($)*J;return this.x=Q*Math.sin(Z),this.y=Math.cos($)*J,this.z=Q*Math.cos(Z),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Z){return this.x=J*Math.sin($),this.y=Z,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Z=this.setFromMatrixColumn(J,1).length(),Q=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Z,this.z=Q,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=(Math.random()-0.5)*2,$=Math.random()*Math.PI*2,Z=Math.sqrt(1-J**2);return this.x=Z*Math.cos($),this.y=Z*Math.sin($),this.z=J,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var CZ=new T,P5=new CJ;class Q7{constructor(J=new T(1/0,1/0,1/0),$=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Z=J.length;$<Z;$+=3)this.expandByPoint(EJ.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Z=J.count;$<Z;$++)this.expandByPoint(EJ.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Z=J.length;$<Z;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Z=EJ.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Z),this.max.copy(J).add(Z),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Z=J.geometry;if(Z!==void 0){let W=Z.getAttribute("position");if($===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,Y=W.count;K<Y;K++){if(J.isMesh===!0)J.getVertexPosition(K,EJ);else EJ.fromBufferAttribute(W,K);EJ.applyMatrix4(J.matrixWorld),this.expandByPoint(EJ)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();q$.copy(J.boundingBox)}else{if(Z.boundingBox===null)Z.computeBoundingBox();q$.copy(Z.boundingBox)}q$.applyMatrix4(J.matrixWorld),this.union(q$)}}let Q=J.children;for(let W=0,K=Q.length;W<K;W++)this.expandByObject(Q[W],$);return this}containsPoint(J){return J.x<this.min.x||J.x>this.max.x||J.y<this.min.y||J.y>this.max.y||J.z<this.min.z||J.z>this.max.z?!1:!0}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x<this.min.x||J.min.x>this.max.x||J.max.y<this.min.y||J.min.y>this.max.y||J.max.z<this.min.z||J.min.z>this.max.z?!1:!0}intersectsSphere(J){return this.clampPoint(J.center,EJ),EJ.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Z;if(J.normal.x>0)$=J.normal.x*this.min.x,Z=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Z=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Z+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Z+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Z+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Z+=J.normal.z*this.min.z;return $<=-J.constant&&Z>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(L7),H$.subVectors(this.max,L7),x8.subVectors(J.a,L7),y8.subVectors(J.b,L7),f8.subVectors(J.c,L7),oJ.subVectors(y8,x8),iJ.subVectors(f8,y8),V8.subVectors(x8,f8);let $=[0,-oJ.z,oJ.y,0,-iJ.z,iJ.y,0,-V8.z,V8.y,oJ.z,0,-oJ.x,iJ.z,0,-iJ.x,V8.z,0,-V8.x,-oJ.y,oJ.x,0,-iJ.y,iJ.x,0,-V8.y,V8.x,0];if(!AZ($,x8,y8,f8,H$))return!1;if($=[1,0,0,0,1,0,0,0,1],!AZ($,x8,y8,f8,H$))return!1;return U$.crossVectors(oJ,iJ),$=[U$.x,U$.y,U$.z],AZ($,x8,y8,f8,H$)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,EJ).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(EJ).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return xJ[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),xJ[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),xJ[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),xJ[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),xJ[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),xJ[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),xJ[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),xJ[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(xJ),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}}var xJ=[new T,new T,new T,new T,new T,new T,new T,new T],EJ=new T,q$=new Q7,x8=new T,y8=new T,f8=new T,oJ=new T,iJ=new T,V8=new T,L7=new T,H$=new T,U$=new T,R8=new T;function AZ(J,$,Z,Q,W){for(let K=0,Y=J.length-3;K<=Y;K+=3){R8.fromArray(J,K);let X=W.x*Math.abs(R8.x)+W.y*Math.abs(R8.y)+W.z*Math.abs(R8.z),q=$.dot(R8),H=Z.dot(R8),U=Q.dot(R8);if(Math.max(-Math.max(q,H,U),Math.min(q,H,U))>X)return!1}return!0}var nK=new Q7,M7=new T,kZ=new T;class W7{constructor(J=new T,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Z=this.center;if($!==void 0)Z.copy($);else nK.setFromPoints(J).getCenter(Z);let Q=0;for(let W=0,K=J.length;W<K;W++)Q=Math.max(Q,Z.distanceToSquared(J[W]));return this.radius=Math.sqrt(Q),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Z=this.center.distanceToSquared(J);if($.copy(J),Z>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;M7.subVectors(J,this.center);let $=M7.lengthSq();if($>this.radius*this.radius){let Z=Math.sqrt($),Q=(Z-this.radius)*0.5;this.center.addScaledVector(M7,Q/Z),this.radius+=Q}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else kZ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(M7.copy(J.center).add(kZ)),this.expandByPoint(M7.copy(J.center).sub(kZ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}}var yJ=new T,PZ=new T,G$=new T,rJ=new T,SZ=new T,F$=new T,wZ=new T;class L8{constructor(J=new T,$=new T(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,yJ)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Z=$.dot(this.direction);if(Z<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Z)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=yJ.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return yJ.copy(this.origin).addScaledVector(this.direction,$),yJ.distanceToSquared(J)}distanceSqToSegment(J,$,Z,Q){PZ.copy(J).add($).multiplyScalar(0.5),G$.copy($).sub(J).normalize(),rJ.copy(this.origin).sub(PZ);let W=J.distanceTo($)*0.5,K=-this.direction.dot(G$),Y=rJ.dot(this.direction),X=-rJ.dot(G$),q=rJ.lengthSq(),H=Math.abs(1-K*K),U,G,F,D;if(H>0)if(U=K*X-Y,G=K*Y-X,D=W*H,U>=0)if(G>=-D)if(G<=D){let O=1/H;U*=O,G*=O,F=U*(U+K*G+2*Y)+G*(K*U+G+2*X)+q}else G=W,U=Math.max(0,-(K*G+Y)),F=-U*U+G*(G+2*X)+q;else G=-W,U=Math.max(0,-(K*G+Y)),F=-U*U+G*(G+2*X)+q;else if(G<=-D)U=Math.max(0,-(-K*W+Y)),G=U>0?-W:Math.min(Math.max(-W,-X),W),F=-U*U+G*(G+2*X)+q;else if(G<=D)U=0,G=Math.min(Math.max(-W,-X),W),F=G*(G+2*X)+q;else U=Math.max(0,-(K*W+Y)),G=U>0?W:Math.min(Math.max(-W,-X),W),F=-U*U+G*(G+2*X)+q;else G=K>0?-W:W,U=Math.max(0,-(K*G+Y)),F=-U*U+G*(G+2*X)+q;if(Z)Z.copy(this.origin).addScaledVector(this.direction,U);if(Q)Q.copy(PZ).addScaledVector(G$,G);return F}intersectSphere(J,$){yJ.subVectors(J.center,this.origin);let Z=yJ.dot(this.direction),Q=yJ.dot(yJ)-Z*Z,W=J.radius*J.radius;if(Q>W)return null;let K=Math.sqrt(W-Q),Y=Z-K,X=Z+K;if(X<0)return null;if(Y<0)return this.at(X,$);return this.at(Y,$)}intersectsSphere(J){return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Z=-(this.origin.dot(J.normal)+J.constant)/$;return Z>=0?Z:null}intersectPlane(J,$){let Z=this.distanceToPlane(J);if(Z===null)return null;return this.at(Z,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Z,Q,W,K,Y,X,q=1/this.direction.x,H=1/this.direction.y,U=1/this.direction.z,G=this.origin;if(q>=0)Z=(J.min.x-G.x)*q,Q=(J.max.x-G.x)*q;else Z=(J.max.x-G.x)*q,Q=(J.min.x-G.x)*q;if(H>=0)W=(J.min.y-G.y)*H,K=(J.max.y-G.y)*H;else W=(J.max.y-G.y)*H,K=(J.min.y-G.y)*H;if(Z>K||W>Q)return null;if(W>Z||isNaN(Z))Z=W;if(K<Q||isNaN(Q))Q=K;if(U>=0)Y=(J.min.z-G.z)*U,X=(J.max.z-G.z)*U;else Y=(J.max.z-G.z)*U,X=(J.min.z-G.z)*U;if(Z>X||Y>Q)return null;if(Y>Z||Z!==Z)Z=Y;if(X<Q||Q!==Q)Q=X;if(Q<0)return null;return this.at(Z>=0?Z:Q,$)}intersectsBox(J){return this.intersectBox(J,yJ)!==null}intersectTriangle(J,$,Z,Q,W){SZ.subVectors($,J),F$.subVectors(Z,J),wZ.crossVectors(SZ,F$);let K=this.direction.dot(wZ),Y;if(K>0){if(Q)return null;Y=1}else if(K<0)Y=-1,K=-K;else return null;rJ.subVectors(this.origin,J);let X=Y*this.direction.dot(F$.crossVectors(rJ,F$));if(X<0)return null;let q=Y*this.direction.dot(SZ.cross(rJ));if(q<0)return null;if(X+q>K)return null;let H=-Y*rJ.dot(wZ);if(H<0)return null;return this.at(H/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Y9{constructor(J,$,Z,Q,W,K,Y,X,q,H,U,G,F,D,O,E){if(Y9.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Z,Q,W,K,Y,X,q,H,U,G,F,D,O,E)}set(J,$,Z,Q,W,K,Y,X,q,H,U,G,F,D,O,E){let V=this.elements;return V[0]=J,V[4]=$,V[8]=Z,V[12]=Q,V[1]=W,V[5]=K,V[9]=Y,V[13]=X,V[2]=q,V[6]=H,V[10]=U,V[14]=G,V[3]=F,V[7]=D,V[11]=O,V[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Y9().fromArray(this.elements)}copy(J){let $=this.elements,Z=J.elements;return $[0]=Z[0],$[1]=Z[1],$[2]=Z[2],$[3]=Z[3],$[4]=Z[4],$[5]=Z[5],$[6]=Z[6],$[7]=Z[7],$[8]=Z[8],$[9]=Z[9],$[10]=Z[10],$[11]=Z[11],$[12]=Z[12],$[13]=Z[13],$[14]=Z[14],$[15]=Z[15],this}copyPosition(J){let $=this.elements,Z=J.elements;return $[12]=Z[12],$[13]=Z[13],$[14]=Z[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Z){return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Z.setFromMatrixColumn(this,2),this}makeBasis(J,$,Z){return this.set(J.x,$.x,Z.x,0,J.y,$.y,Z.y,0,J.z,$.z,Z.z,0,0,0,0,1),this}extractRotation(J){let $=this.elements,Z=J.elements,Q=1/h8.setFromMatrixColumn(J,0).length(),W=1/h8.setFromMatrixColumn(J,1).length(),K=1/h8.setFromMatrixColumn(J,2).length();return $[0]=Z[0]*Q,$[1]=Z[1]*Q,$[2]=Z[2]*Q,$[3]=0,$[4]=Z[4]*W,$[5]=Z[5]*W,$[6]=Z[6]*W,$[7]=0,$[8]=Z[8]*K,$[9]=Z[9]*K,$[10]=Z[10]*K,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Z=J.x,Q=J.y,W=J.z,K=Math.cos(Z),Y=Math.sin(Z),X=Math.cos(Q),q=Math.sin(Q),H=Math.cos(W),U=Math.sin(W);if(J.order==="XYZ"){let G=K*H,F=K*U,D=Y*H,O=Y*U;$[0]=X*H,$[4]=-X*U,$[8]=q,$[1]=F+D*q,$[5]=G-O*q,$[9]=-Y*X,$[2]=O-G*q,$[6]=D+F*q,$[10]=K*X}else if(J.order==="YXZ"){let G=X*H,F=X*U,D=q*H,O=q*U;$[0]=G+O*Y,$[4]=D*Y-F,$[8]=K*q,$[1]=K*U,$[5]=K*H,$[9]=-Y,$[2]=F*Y-D,$[6]=O+G*Y,$[10]=K*X}else if(J.order==="ZXY"){let G=X*H,F=X*U,D=q*H,O=q*U;$[0]=G-O*Y,$[4]=-K*U,$[8]=D+F*Y,$[1]=F+D*Y,$[5]=K*H,$[9]=O-G*Y,$[2]=-K*q,$[6]=Y,$[10]=K*X}else if(J.order==="ZYX"){let G=K*H,F=K*U,D=Y*H,O=Y*U;$[0]=X*H,$[4]=D*q-F,$[8]=G*q+O,$[1]=X*U,$[5]=O*q+G,$[9]=F*q-D,$[2]=-q,$[6]=Y*X,$[10]=K*X}else if(J.order==="YZX"){let G=K*X,F=K*q,D=Y*X,O=Y*q;$[0]=X*H,$[4]=O-G*U,$[8]=D*U+F,$[1]=U,$[5]=K*H,$[9]=-Y*H,$[2]=-q*H,$[6]=F*U+D,$[10]=G-O*U}else if(J.order==="XZY"){let G=K*X,F=K*q,D=Y*X,O=Y*q;$[0]=X*H,$[4]=-U,$[8]=q*H,$[1]=G*U+O,$[5]=K*H,$[9]=F*U-D,$[2]=D*U-F,$[6]=Y*H,$[10]=O*U+G}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(sK,J,oK)}lookAt(J,$,Z){let Q=this.elements;if(WJ.subVectors(J,$),WJ.lengthSq()===0)WJ.z=1;if(WJ.normalize(),aJ.crossVectors(Z,WJ),aJ.lengthSq()===0){if(Math.abs(Z.z)===1)WJ.x+=0.0001;else WJ.z+=0.0001;WJ.normalize(),aJ.crossVectors(Z,WJ)}return aJ.normalize(),V$.crossVectors(WJ,aJ),Q[0]=aJ.x,Q[4]=V$.x,Q[8]=WJ.x,Q[1]=aJ.y,Q[5]=V$.y,Q[9]=WJ.y,Q[2]=aJ.z,Q[6]=V$.z,Q[10]=WJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Z=J.elements,Q=$.elements,W=this.elements,K=Z[0],Y=Z[4],X=Z[8],q=Z[12],H=Z[1],U=Z[5],G=Z[9],F=Z[13],D=Z[2],O=Z[6],E=Z[10],V=Z[14],R=Z[3],N=Z[7],B=Z[11],I=Z[15],L=Q[0],M=Q[4],A=Q[8],_=Q[12],z=Q[1],k=Q[5],y=Q[9],o=Q[13],t=Q[2],j=Q[6],m=Q[10],d=Q[14],i=Q[3],n=Q[7],h=Q[11],l=Q[15];return W[0]=K*L+Y*z+X*t+q*i,W[4]=K*M+Y*k+X*j+q*n,W[8]=K*A+Y*y+X*m+q*h,W[12]=K*_+Y*o+X*d+q*l,W[1]=H*L+U*z+G*t+F*i,W[5]=H*M+U*k+G*j+F*n,W[9]=H*A+U*y+G*m+F*h,W[13]=H*_+U*o+G*d+F*l,W[2]=D*L+O*z+E*t+V*i,W[6]=D*M+O*k+E*j+V*n,W[10]=D*A+O*y+E*m+V*h,W[14]=D*_+O*o+E*d+V*l,W[3]=R*L+N*z+B*t+I*i,W[7]=R*M+N*k+B*j+I*n,W[11]=R*A+N*y+B*m+I*h,W[15]=R*_+N*o+B*d+I*l,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Z=J[4],Q=J[8],W=J[12],K=J[1],Y=J[5],X=J[9],q=J[13],H=J[2],U=J[6],G=J[10],F=J[14],D=J[3],O=J[7],E=J[11],V=J[15];return D*(+W*X*U-Q*q*U-W*Y*G+Z*q*G+Q*Y*F-Z*X*F)+O*(+$*X*F-$*q*G+W*K*G-Q*K*F+Q*q*H-W*X*H)+E*(+$*q*U-$*Y*F-W*K*U+Z*K*F+W*Y*H-Z*q*H)+V*(-Q*Y*H-$*X*U+$*Y*G+Q*K*U-Z*K*G+Z*X*H)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Z){let Q=this.elements;if(J.isVector3)Q[12]=J.x,Q[13]=J.y,Q[14]=J.z;else Q[12]=J,Q[13]=$,Q[14]=Z;return this}invert(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],q=J[7],H=J[8],U=J[9],G=J[10],F=J[11],D=J[12],O=J[13],E=J[14],V=J[15],R=U*E*q-O*G*q+O*X*F-Y*E*F-U*X*V+Y*G*V,N=D*G*q-H*E*q-D*X*F+K*E*F+H*X*V-K*G*V,B=H*O*q-D*U*q+D*Y*F-K*O*F-H*Y*V+K*U*V,I=D*U*X-H*O*X-D*Y*G+K*O*G+H*Y*E-K*U*E,L=$*R+Z*N+Q*B+W*I;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let M=1/L;return J[0]=R*M,J[1]=(O*G*W-U*E*W-O*Q*F+Z*E*F+U*Q*V-Z*G*V)*M,J[2]=(Y*E*W-O*X*W+O*Q*q-Z*E*q-Y*Q*V+Z*X*V)*M,J[3]=(U*X*W-Y*G*W-U*Q*q+Z*G*q+Y*Q*F-Z*X*F)*M,J[4]=N*M,J[5]=(H*E*W-D*G*W+D*Q*F-$*E*F-H*Q*V+$*G*V)*M,J[6]=(D*X*W-K*E*W-D*Q*q+$*E*q+K*Q*V-$*X*V)*M,J[7]=(K*G*W-H*X*W+H*Q*q-$*G*q-K*Q*F+$*X*F)*M,J[8]=B*M,J[9]=(D*U*W-H*O*W-D*Z*F+$*O*F+H*Z*V-$*U*V)*M,J[10]=(K*O*W-D*Y*W+D*Z*q-$*O*q-K*Z*V+$*Y*V)*M,J[11]=(H*Y*W-K*U*W-H*Z*q+$*U*q+K*Z*F-$*Y*F)*M,J[12]=I*M,J[13]=(H*O*Q-D*U*Q+D*Z*G-$*O*G-H*Z*E+$*U*E)*M,J[14]=(D*Y*Q-K*O*Q-D*Z*X+$*O*X+K*Z*E-$*Y*E)*M,J[15]=(K*U*Q-H*Y*Q+H*Z*X-$*U*X-K*Z*G+$*Y*G)*M,this}scale(J){let $=this.elements,Z=J.x,Q=J.y,W=J.z;return $[0]*=Z,$[4]*=Q,$[8]*=W,$[1]*=Z,$[5]*=Q,$[9]*=W,$[2]*=Z,$[6]*=Q,$[10]*=W,$[3]*=Z,$[7]*=Q,$[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Z=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Q=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Z,Q))}makeTranslation(J,$,Z){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Z,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Z=Math.sin(J);return this.set(1,0,0,0,0,$,-Z,0,0,Z,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,0,Z,0,0,1,0,0,-Z,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,-Z,0,0,Z,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Z=Math.cos($),Q=Math.sin($),W=1-Z,K=J.x,Y=J.y,X=J.z,q=W*K,H=W*Y;return this.set(q*K+Z,q*Y-Q*X,q*X+Q*Y,0,q*Y+Q*X,H*Y+Z,H*X-Q*K,0,q*X-Q*Y,H*X+Q*K,W*X*X+Z,0,0,0,0,1),this}makeScale(J,$,Z){return this.set(J,0,0,0,0,$,0,0,0,0,Z,0,0,0,0,1),this}makeShear(J,$,Z,Q,W,K){return this.set(1,Z,W,0,J,1,K,0,$,Q,1,0,0,0,0,1),this}compose(J,$,Z){let Q=this.elements,W=$._x,K=$._y,Y=$._z,X=$._w,q=W+W,H=K+K,U=Y+Y,G=W*q,F=W*H,D=W*U,O=K*H,E=K*U,V=Y*U,R=X*q,N=X*H,B=X*U,I=Z.x,L=Z.y,M=Z.z;return Q[0]=(1-(O+V))*I,Q[1]=(F+B)*I,Q[2]=(D-N)*I,Q[3]=0,Q[4]=(F-B)*L,Q[5]=(1-(G+V))*L,Q[6]=(E+R)*L,Q[7]=0,Q[8]=(D+N)*M,Q[9]=(E-R)*M,Q[10]=(1-(G+O))*M,Q[11]=0,Q[12]=J.x,Q[13]=J.y,Q[14]=J.z,Q[15]=1,this}decompose(J,$,Z){let Q=this.elements,W=h8.set(Q[0],Q[1],Q[2]).length(),K=h8.set(Q[4],Q[5],Q[6]).length(),Y=h8.set(Q[8],Q[9],Q[10]).length();if(this.determinant()<0)W=-W;J.x=Q[12],J.y=Q[13],J.z=Q[14],OJ.copy(this);let q=1/W,H=1/K,U=1/Y;return OJ.elements[0]*=q,OJ.elements[1]*=q,OJ.elements[2]*=q,OJ.elements[4]*=H,OJ.elements[5]*=H,OJ.elements[6]*=H,OJ.elements[8]*=U,OJ.elements[9]*=U,OJ.elements[10]*=U,$.setFromRotationMatrix(OJ),Z.x=W,Z.y=K,Z.z=Y,this}makePerspective(J,$,Z,Q,W,K,Y=2000){let X=this.elements,q=2*W/($-J),H=2*W/(Z-Q),U=($+J)/($-J),G=(Z+Q)/(Z-Q),F,D;if(Y===2000)F=-(K+W)/(K-W),D=-2*K*W/(K-W);else if(Y===2001)F=-K/(K-W),D=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+Y);return X[0]=q,X[4]=0,X[8]=U,X[12]=0,X[1]=0,X[5]=H,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=D,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,$,Z,Q,W,K,Y=2000){let X=this.elements,q=1/($-J),H=1/(Z-Q),U=1/(K-W),G=($+J)*q,F=(Z+Q)*H,D,O;if(Y===2000)D=(K+W)*U,O=-2*U;else if(Y===2001)D=W*U,O=-1*U;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+Y);return X[0]=2*q,X[4]=0,X[8]=0,X[12]=-G,X[1]=0,X[5]=2*H,X[9]=0,X[13]=-F,X[2]=0,X[6]=0,X[10]=O,X[14]=-D,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let $=this.elements,Z=J.elements;for(let Q=0;Q<16;Q++)if($[Q]!==Z[Q])return!1;return!0}fromArray(J,$=0){for(let Z=0;Z<16;Z++)this.elements[Z]=J[Z+$];return this}toArray(J=[],$=0){let Z=this.elements;return J[$]=Z[0],J[$+1]=Z[1],J[$+2]=Z[2],J[$+3]=Z[3],J[$+4]=Z[4],J[$+5]=Z[5],J[$+6]=Z[6],J[$+7]=Z[7],J[$+8]=Z[8],J[$+9]=Z[9],J[$+10]=Z[10],J[$+11]=Z[11],J[$+12]=Z[12],J[$+13]=Z[13],J[$+14]=Z[14],J[$+15]=Z[15],J}}var h8=new T,OJ=new Y9,sK=new T(0,0,0),oK=new T(1,1,1),aJ=new T,V$=new T,WJ=new T,S5=new Y9,w5=new CJ;class d${constructor(J=0,$=0,Z=0,Q=d$.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Z,this._order=Q}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Z,Q=this._order){return this._x=J,this._y=$,this._z=Z,this._order=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Z=!0){let Q=J.elements,W=Q[0],K=Q[4],Y=Q[8],X=Q[1],q=Q[5],H=Q[9],U=Q[2],G=Q[6],F=Q[10];switch($){case"XYZ":if(this._y=Math.asin(x9(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-H,F),this._z=Math.atan2(-K,W);else this._x=Math.atan2(G,q),this._z=0;break;case"YXZ":if(this._x=Math.asin(-x9(H,-1,1)),Math.abs(H)<0.9999999)this._y=Math.atan2(Y,F),this._z=Math.atan2(X,q);else this._y=Math.atan2(-U,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(x9(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(-U,F),this._z=Math.atan2(-K,q);else this._y=0,this._z=Math.atan2(X,W);break;case"ZYX":if(this._y=Math.asin(-x9(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(G,F),this._z=Math.atan2(X,W);else this._x=0,this._z=Math.atan2(-K,q);break;case"YZX":if(this._z=Math.asin(x9(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-H,q),this._y=Math.atan2(-U,W);else this._x=0,this._y=Math.atan2(Y,F);break;case"XZY":if(this._z=Math.asin(-x9(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(G,q),this._y=Math.atan2(Y,W);else this._x=Math.atan2(-H,F),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Z===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Z){return S5.makeRotationFromQuaternion(J),this.setFromRotationMatrix(S5,$,Z)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return w5.setFromEuler(this),this.setFromQuaternion(w5,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}d$.DEFAULT_ORDER="XYZ";class p${constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var iK=0,T5=new T,v8=new CJ,fJ=new Y9,R$=new T,C7=new T,rK=new T,aK=new CJ,_5=new T(1,0,0),j5=new T(0,1,0),b5=new T(0,0,1),tK={type:"added"},eK={type:"removed"};class U9 extends mJ{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:iK++}),this.uuid=gJ(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=U9.DEFAULT_UP.clone();let J=new T,$=new d$,Z=new CJ,Q=new T(1,1,1);function W(){Z.setFromEuler($,!1)}function K(){$.setFromQuaternion(Z,void 0,!1)}$._onChange(W),Z._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Z},scale:{configurable:!0,enumerable:!0,value:Q},modelViewMatrix:{value:new Y9},normalMatrix:{value:new s0}}),this.matrix=new Y9,this.matrixWorld=new Y9,this.matrixAutoUpdate=U9.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=U9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new p$,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return v8.setFromAxisAngle(J,$),this.quaternion.multiply(v8),this}rotateOnWorldAxis(J,$){return v8.setFromAxisAngle(J,$),this.quaternion.premultiply(v8),this}rotateX(J){return this.rotateOnAxis(_5,J)}rotateY(J){return this.rotateOnAxis(j5,J)}rotateZ(J){return this.rotateOnAxis(b5,J)}translateOnAxis(J,$){return T5.copy(J).applyQuaternion(this.quaternion),this.position.add(T5.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(_5,J)}translateY(J){return this.translateOnAxis(j5,J)}translateZ(J){return this.translateOnAxis(b5,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(fJ.copy(this.matrixWorld).invert())}lookAt(J,$,Z){if(J.isVector3)R$.copy(J);else R$.set(J,$,Z);let Q=this.parent;if(this.updateWorldMatrix(!0,!1),C7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)fJ.lookAt(C7,R$,this.up);else fJ.lookAt(R$,C7,this.up);if(this.quaternion.setFromRotationMatrix(fJ),Q)fJ.extractRotation(Q.matrixWorld),v8.setFromRotationMatrix(fJ),this.quaternion.premultiply(v8.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D){if(J.parent!==null)J.parent.remove(J);J.parent=this,this.children.push(J),J.dispatchEvent(tK)}else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Z=0;Z<arguments.length;Z++)this.remove(arguments[Z]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent(eK);return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),fJ.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),fJ.multiply(J.parent.matrixWorld);return J.applyMatrix4(fJ),this.add(J),J.updateWorldMatrix(!1,!0),this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Z=0,Q=this.children.length;Z<Q;Z++){let K=this.children[Z].getObjectByProperty(J,$);if(K!==void 0)return K}return}getObjectsByProperty(J,$,Z=[]){if(this[J]===$)Z.push(this);let Q=this.children;for(let W=0,K=Q.length;W<K;W++)Q[W].getObjectsByProperty(J,$,Z);return Z}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(C7,J,rK),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(C7,aK,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}traverse(J){J(this);let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++)$[Z].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++)$[Z].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++){let W=$[Z];if(W.matrixWorldAutoUpdate===!0||J===!0)W.updateMatrixWorld(J)}}updateWorldMatrix(J,$){let Z=this.parent;if(J===!0&&Z!==null&&Z.matrixWorldAutoUpdate===!0)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if($===!0){let Q=this.children;for(let W=0,K=Q.length;W<K;W++){let Y=Q[W];if(Y.matrixWorldAutoUpdate===!0)Y.updateWorldMatrix(!1,!0)}}}toJSON(J){let $=J===void 0||typeof J==="string",Z={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Z.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let Q={};if(Q.uuid=this.uuid,Q.type=this.type,this.name!=="")Q.name=this.name;if(this.castShadow===!0)Q.castShadow=!0;if(this.receiveShadow===!0)Q.receiveShadow=!0;if(this.visible===!1)Q.visible=!1;if(this.frustumCulled===!1)Q.frustumCulled=!1;if(this.renderOrder!==0)Q.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(Q.layers=this.layers.mask,Q.matrix=this.matrix.toArray(),Q.up=this.up.toArray(),this.matrixAutoUpdate===!1)Q.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(Q.type="InstancedMesh",Q.count=this.count,Q.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Q.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Q.type="BatchedMesh",Q.perObjectFrustumCulled=this.perObjectFrustumCulled,Q.sortObjects=this.sortObjects,Q.drawRanges=this._drawRanges,Q.reservedRanges=this._reservedRanges,Q.visibility=this._visibility,Q.active=this._active,Q.bounds=this._bounds.map((Y)=>({boxInitialized:Y.boxInitialized,boxMin:Y.box.min.toArray(),boxMax:Y.box.max.toArray(),sphereInitialized:Y.sphereInitialized,sphereRadius:Y.sphere.radius,sphereCenter:Y.sphere.center.toArray()})),Q.maxGeometryCount=this._maxGeometryCount,Q.maxVertexCount=this._maxVertexCount,Q.maxIndexCount=this._maxIndexCount,Q.geometryInitialized=this._geometryInitialized,Q.geometryCount=this._geometryCount,Q.matricesTexture=this._matricesTexture.toJSON(J),this.boundingSphere!==null)Q.boundingSphere={center:Q.boundingSphere.center.toArray(),radius:Q.boundingSphere.radius};if(this.boundingBox!==null)Q.boundingBox={min:Q.boundingBox.min.toArray(),max:Q.boundingBox.max.toArray()}}function W(Y,X){if(Y[X.uuid]===void 0)Y[X.uuid]=X.toJSON(J);return X.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Q.background=this.background.toJSON();else if(this.background.isTexture)Q.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Q.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Q.geometry=W(J.geometries,this.geometry);let Y=this.geometry.parameters;if(Y!==void 0&&Y.shapes!==void 0){let X=Y.shapes;if(Array.isArray(X))for(let q=0,H=X.length;q<H;q++){let U=X[q];W(J.shapes,U)}else W(J.shapes,X)}}if(this.isSkinnedMesh){if(Q.bindMode=this.bindMode,Q.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Q.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let Y=[];for(let X=0,q=this.material.length;X<q;X++)Y.push(W(J.materials,this.material[X]));Q.material=Y}else Q.material=W(J.materials,this.material);if(this.children.length>0){Q.children=[];for(let Y=0;Y<this.children.length;Y++)Q.children.push(this.children[Y].toJSON(J).object)}if(this.animations.length>0){Q.animations=[];for(let Y=0;Y<this.animations.length;Y++){let X=this.animations[Y];Q.animations.push(W(J.animations,X))}}if($){let Y=K(J.geometries),X=K(J.materials),q=K(J.textures),H=K(J.images),U=K(J.shapes),G=K(J.skeletons),F=K(J.animations),D=K(J.nodes);if(Y.length>0)Z.geometries=Y;if(X.length>0)Z.materials=X;if(q.length>0)Z.textures=q;if(H.length>0)Z.images=H;if(U.length>0)Z.shapes=U;if(G.length>0)Z.skeletons=G;if(F.length>0)Z.animations=F;if(D.length>0)Z.nodes=D}return Z.object=Q,Z;function K(Y){let X=[];for(let q in Y){let H=Y[q];delete H.metadata,X.push(H)}return X}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Z=0;Z<J.children.length;Z++){let Q=J.children[Z];this.add(Q.clone())}return this}}U9.DEFAULT_UP=new T(0,1,0);U9.DEFAULT_MATRIX_AUTO_UPDATE=!0;U9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var NJ=new T,hJ=new T,TZ=new T,vJ=new T,g8=new T,m8=new T,x5=new T,_Z=new T,jZ=new T,bZ=new T,D$=!1;class GJ{constructor(J=new T,$=new T,Z=new T){this.a=J,this.b=$,this.c=Z}static getNormal(J,$,Z,Q){Q.subVectors(Z,$),NJ.subVectors(J,$),Q.cross(NJ);let W=Q.lengthSq();if(W>0)return Q.multiplyScalar(1/Math.sqrt(W));return Q.set(0,0,0)}static getBarycoord(J,$,Z,Q,W){NJ.subVectors(Q,$),hJ.subVectors(Z,$),TZ.subVectors(J,$);let K=NJ.dot(NJ),Y=NJ.dot(hJ),X=NJ.dot(TZ),q=hJ.dot(hJ),H=hJ.dot(TZ),U=K*q-Y*Y;if(U===0)return W.set(0,0,0),null;let G=1/U,F=(q*X-Y*H)*G,D=(K*H-Y*X)*G;return W.set(1-F-D,D,F)}static containsPoint(J,$,Z,Q){if(this.getBarycoord(J,$,Z,Q,vJ)===null)return!1;return vJ.x>=0&&vJ.y>=0&&vJ.x+vJ.y<=1}static getUV(J,$,Z,Q,W,K,Y,X){if(D$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),D$=!0;return this.getInterpolation(J,$,Z,Q,W,K,Y,X)}static getInterpolation(J,$,Z,Q,W,K,Y,X){if(this.getBarycoord(J,$,Z,Q,vJ)===null){if(X.x=0,X.y=0,"z"in X)X.z=0;if("w"in X)X.w=0;return null}return X.setScalar(0),X.addScaledVector(W,vJ.x),X.addScaledVector(K,vJ.y),X.addScaledVector(Y,vJ.z),X}static isFrontFacing(J,$,Z,Q){return NJ.subVectors(Z,$),hJ.subVectors(J,$),NJ.cross(hJ).dot(Q)<0?!0:!1}set(J,$,Z){return this.a.copy(J),this.b.copy($),this.c.copy(Z),this}setFromPointsAndIndices(J,$,Z,Q){return this.a.copy(J[$]),this.b.copy(J[Z]),this.c.copy(J[Q]),this}setFromAttributeAndIndices(J,$,Z,Q){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Z),this.c.fromBufferAttribute(J,Q),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return NJ.subVectors(this.c,this.b),hJ.subVectors(this.a,this.b),NJ.cross(hJ).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return GJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return GJ.getBarycoord(J,this.a,this.b,this.c,$)}getUV(J,$,Z,Q,W){if(D$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),D$=!0;return GJ.getInterpolation(J,this.a,this.b,this.c,$,Z,Q,W)}getInterpolation(J,$,Z,Q,W){return GJ.getInterpolation(J,this.a,this.b,this.c,$,Z,Q,W)}containsPoint(J){return GJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return GJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Z=this.a,Q=this.b,W=this.c,K,Y;g8.subVectors(Q,Z),m8.subVectors(W,Z),_Z.subVectors(J,Z);let X=g8.dot(_Z),q=m8.dot(_Z);if(X<=0&&q<=0)return $.copy(Z);jZ.subVectors(J,Q);let H=g8.dot(jZ),U=m8.dot(jZ);if(H>=0&&U<=H)return $.copy(Q);let G=X*U-H*q;if(G<=0&&X>=0&&H<=0)return K=X/(X-H),$.copy(Z).addScaledVector(g8,K);bZ.subVectors(J,W);let F=g8.dot(bZ),D=m8.dot(bZ);if(D>=0&&F<=D)return $.copy(W);let O=F*q-X*D;if(O<=0&&q>=0&&D<=0)return Y=q/(q-D),$.copy(Z).addScaledVector(m8,Y);let E=H*D-F*U;if(E<=0&&U-H>=0&&F-D>=0)return x5.subVectors(W,Q),Y=(U-H)/(U-H+(F-D)),$.copy(Q).addScaledVector(x5,Y);let V=1/(E+O+G);return K=O*V,Y=G*V,$.copy(Z).addScaledVector(g8,K).addScaledVector(m8,Y)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}var k6={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tJ={h:0,s:0,l:0},E$={h:0,s:0,l:0};function xZ(J,$,Z){if(Z<0)Z+=1;if(Z>1)Z-=1;if(Z<0.16666666666666666)return J+($-J)*6*Z;if(Z<0.5)return $;if(Z<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Z);return J}class a0{constructor(J,$,Z){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Z)}set(J,$,Z){if($===void 0&&Z===void 0){let Q=J;if(Q&&Q.isColor)this.copy(Q);else if(typeof Q==="number")this.setHex(Q);else if(typeof Q==="string")this.setStyle(Q)}else this.setRGB(J,$,Z);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,W9.toWorkingColorSpace(this,$),this}setRGB(J,$,Z,Q=W9.workingColorSpace){return this.r=J,this.g=$,this.b=Z,W9.toWorkingColorSpace(this,Q),this}setHSL(J,$,Z,Q=W9.workingColorSpace){if(J=$Q(J,1),$=x9($,0,1),Z=x9(Z,0,1),$===0)this.r=this.g=this.b=Z;else{let W=Z<=0.5?Z*(1+$):Z+$-Z*$,K=2*Z-W;this.r=xZ(K,W,J+0.3333333333333333),this.g=xZ(K,W,J),this.b=xZ(K,W,J-0.3333333333333333)}return W9.toWorkingColorSpace(this,Q),this}setStyle(J,$="srgb"){function Z(W){if(W===void 0)return;if(parseFloat(W)<1)console.warn("THREE.Color: Alpha component of "+J+" will be ignored.")}let Q;if(Q=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Q[1],Y=Q[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Z(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,$);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Z(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,$);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Z(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,$);break;default:console.warn("THREE.Color: Unknown color model "+J)}}else if(Q=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Q[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,$);else if(K===6)return this.setHex(parseInt(W,16),$);else console.warn("THREE.Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Z=k6[J.toLowerCase()];if(Z!==void 0)this.setHex(Z,$);else console.warn("THREE.Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=J7(J.r),this.g=J7(J.g),this.b=J7(J.b),this}copyLinearToSRGB(J){return this.r=LZ(J.r),this.g=LZ(J.g),this.b=LZ(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return W9.fromWorkingColorSpace(u9.copy(this),J),Math.round(x9(u9.r*255,0,255))*65536+Math.round(x9(u9.g*255,0,255))*256+Math.round(x9(u9.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=W9.workingColorSpace){W9.fromWorkingColorSpace(u9.copy(this),$);let{r:Z,g:Q,b:W}=u9,K=Math.max(Z,Q,W),Y=Math.min(Z,Q,W),X,q,H=(Y+K)/2;if(Y===K)X=0,q=0;else{let U=K-Y;switch(q=H<=0.5?U/(K+Y):U/(2-K-Y),K){case Z:X=(Q-W)/U+(Q<W?6:0);break;case Q:X=(W-Z)/U+2;break;case W:X=(Z-Q)/U+4;break}X/=6}return J.h=X,J.s=q,J.l=H,J}getRGB(J,$=W9.workingColorSpace){return W9.fromWorkingColorSpace(u9.copy(this),$),J.r=u9.r,J.g=u9.g,J.b=u9.b,J}getStyle(J="srgb"){W9.fromWorkingColorSpace(u9.copy(this),J);let{r:$,g:Z,b:Q}=u9;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Z.toFixed(3)} ${Q.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Z*255)},${Math.round(Q*255)})`}offsetHSL(J,$,Z){return this.getHSL(tJ),this.setHSL(tJ.h+J,tJ.s+$,tJ.l+Z)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Z){return this.r=J.r+($.r-J.r)*Z,this.g=J.g+($.g-J.g)*Z,this.b=J.b+($.b-J.b)*Z,this}lerpHSL(J,$){this.getHSL(tJ),J.getHSL(E$);let Z=_7(tJ.h,E$.h,$),Q=_7(tJ.s,E$.s,$),W=_7(tJ.l,E$.l,$);return this.setHSL(Z,Q,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Z=this.g,Q=this.b,W=J.elements;return this.r=W[0]*$+W[3]*Z+W[6]*Q,this.g=W[1]*$+W[4]*Z+W[7]*Q,this.b=W[2]*$+W[5]*Z+W[8]*Q,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var u9=new a0;a0.NAMES=k6;var JX=0;class uJ extends mJ{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:JX++}),this.uuid=gJ(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new a0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Z=J[$];if(Z===void 0){console.warn(`THREE.Material: parameter '${$}' has value of undefined.`);continue}let Q=this[$];if(Q===void 0){console.warn(`THREE.Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(Q&&Q.isColor)Q.set(Z);else if(Q&&Q.isVector3&&(Z&&Z.isVector3))Q.copy(Z);else this[$]=Z}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Z={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.color&&this.color.isColor)Z.color=this.color.getHex();if(this.roughness!==void 0)Z.roughness=this.roughness;if(this.metalness!==void 0)Z.metalness=this.metalness;if(this.sheen!==void 0)Z.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Z.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Z.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Z.emissive=this.emissive.getHex();if(this.emissiveIntensity&&this.emissiveIntensity!==1)Z.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Z.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Z.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Z.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Z.shininess=this.shininess;if(this.clearcoat!==void 0)Z.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Z.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Z.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Z.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Z.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Z.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.iridescence!==void 0)Z.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Z.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Z.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Z.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Z.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Z.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Z.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Z.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Z.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Z.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Z.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Z.lightMap=this.lightMap.toJSON(J).uuid,Z.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Z.aoMap=this.aoMap.toJSON(J).uuid,Z.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Z.bumpMap=this.bumpMap.toJSON(J).uuid,Z.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Z.normalMap=this.normalMap.toJSON(J).uuid,Z.normalMapType=this.normalMapType,Z.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Z.displacementMap=this.displacementMap.toJSON(J).uuid,Z.displacementScale=this.displacementScale,Z.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Z.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Z.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Z.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Z.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Z.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Z.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Z.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Z.combine=this.combine}if(this.envMapIntensity!==void 0)Z.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Z.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Z.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Z.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Z.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Z.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Z.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Z.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)Z.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Z.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Z.size=this.size;if(this.shadowSide!==null)Z.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)Z.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)Z.blending=this.blending;if(this.side!==0)Z.side=this.side;if(this.vertexColors===!0)Z.vertexColors=!0;if(this.opacity<1)Z.opacity=this.opacity;if(this.transparent===!0)Z.transparent=!0;if(this.blendSrc!==204)Z.blendSrc=this.blendSrc;if(this.blendDst!==205)Z.blendDst=this.blendDst;if(this.blendEquation!==100)Z.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)Z.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)Z.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)Z.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)Z.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)Z.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)Z.depthFunc=this.depthFunc;if(this.depthTest===!1)Z.depthTest=this.depthTest;if(this.depthWrite===!1)Z.depthWrite=this.depthWrite;if(this.colorWrite===!1)Z.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)Z.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)Z.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)Z.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)Z.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)Z.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)Z.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)Z.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)Z.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)Z.rotation=this.rotation;if(this.polygonOffset===!0)Z.polygonOffset=!0;if(this.polygonOffsetFactor!==0)Z.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)Z.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)Z.linewidth=this.linewidth;if(this.dashSize!==void 0)Z.dashSize=this.dashSize;if(this.gapSize!==void 0)Z.gapSize=this.gapSize;if(this.scale!==void 0)Z.scale=this.scale;if(this.dithering===!0)Z.dithering=!0;if(this.alphaTest>0)Z.alphaTest=this.alphaTest;if(this.alphaHash===!0)Z.alphaHash=!0;if(this.alphaToCoverage===!0)Z.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)Z.premultipliedAlpha=!0;if(this.forceSinglePass===!0)Z.forceSinglePass=!0;if(this.wireframe===!0)Z.wireframe=!0;if(this.wireframeLinewidth>1)Z.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")Z.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")Z.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)Z.flatShading=!0;if(this.visible===!1)Z.visible=!1;if(this.toneMapped===!1)Z.toneMapped=!1;if(this.fog===!1)Z.fog=!1;if(Object.keys(this.userData).length>0)Z.userData=this.userData;function Q(W){let K=[];for(let Y in W){let X=W[Y];delete X.metadata,K.push(X)}return K}if($){let W=Q(J.textures),K=Q(J.images);if(W.length>0)Z.textures=W;if(K.length>0)Z.images=K}return Z}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Z=null;if($!==null){let Q=$.length;Z=Array(Q);for(let W=0;W!==Q;++W)Z[W]=$[W].clone()}return this.clippingPlanes=Z,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class k9 extends uJ{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new a0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var S9=new T,O$=new U0;class y9{constructor(J,$,Z=!1){if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Z,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Z){J*=this.itemSize,Z*=$.itemSize;for(let Q=0,W=this.itemSize;Q<W;Q++)this.array[J+Q]=$.array[Z+Q];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Z=this.count;$<Z;$++)O$.fromBufferAttribute(this,$),O$.applyMatrix3(J),this.setXY($,O$.x,O$.y);else if(this.itemSize===3)for(let $=0,Z=this.count;$<Z;$++)S9.fromBufferAttribute(this,$),S9.applyMatrix3(J),this.setXYZ($,S9.x,S9.y,S9.z);return this}applyMatrix4(J){for(let $=0,Z=this.count;$<Z;$++)S9.fromBufferAttribute(this,$),S9.applyMatrix4(J),this.setXYZ($,S9.x,S9.y,S9.z);return this}applyNormalMatrix(J){for(let $=0,Z=this.count;$<Z;$++)S9.fromBufferAttribute(this,$),S9.applyNormalMatrix(J),this.setXYZ($,S9.x,S9.y,S9.z);return this}transformDirection(J){for(let $=0,Z=this.count;$<Z;$++)S9.fromBufferAttribute(this,$),S9.transformDirection(J),this.setXYZ($,S9.x,S9.y,S9.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Z=this.array[J*this.itemSize+$];if(this.normalized)Z=MJ(Z,this.array);return Z}setComponent(J,$,Z){if(this.normalized)Z=Z9(Z,this.array);return this.array[J*this.itemSize+$]=Z,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=MJ($,this.array);return $}setX(J,$){if(this.normalized)$=Z9($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=MJ($,this.array);return $}setY(J,$){if(this.normalized)$=Z9($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=MJ($,this.array);return $}setZ(J,$){if(this.normalized)$=Z9($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=MJ($,this.array);return $}setW(J,$){if(this.normalized)$=Z9($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Z){if(J*=this.itemSize,this.normalized)$=Z9($,this.array),Z=Z9(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this}setXYZ(J,$,Z,Q){if(J*=this.itemSize,this.normalized)$=Z9($,this.array),Z=Z9(Z,this.array),Q=Z9(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this.array[J+2]=Q,this}setXYZW(J,$,Z,Q,W){if(J*=this.itemSize,this.normalized)$=Z9($,this.array),Z=Z9(Z,this.array),Q=Z9(Q,this.array),W=Z9(W,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this.array[J+2]=Q,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}}class KQ extends y9{constructor(J,$,Z){super(new Uint16Array(J),$,Z)}}class XQ extends y9{constructor(J,$,Z){super(new Uint32Array(J),$,Z)}}class J9 extends y9{constructor(J,$,Z){super(new Float32Array(J),$,Z)}}var $X=0,UJ=new Y9,yZ=new U9,u8=new T,KJ=new Q7,A7=new Q7,b9=new T;class R9 extends mJ{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$X++}),this.uuid=gJ(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((M6(J))?XQ:KQ)(J,1);else this.index=J;return this}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Z=0){this.groups.push({start:J,count:$,materialIndex:Z})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Z=this.attributes.normal;if(Z!==void 0){let W=new s0().getNormalMatrix(J);Z.applyNormalMatrix(W),Z.needsUpdate=!0}let Q=this.attributes.tangent;if(Q!==void 0)Q.transformDirection(J),Q.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return UJ.makeRotationFromQuaternion(J),this.applyMatrix4(UJ),this}rotateX(J){return UJ.makeRotationX(J),this.applyMatrix4(UJ),this}rotateY(J){return UJ.makeRotationY(J),this.applyMatrix4(UJ),this}rotateZ(J){return UJ.makeRotationZ(J),this.applyMatrix4(UJ),this}translate(J,$,Z){return UJ.makeTranslation(J,$,Z),this.applyMatrix4(UJ),this}scale(J,$,Z){return UJ.makeScale(J,$,Z),this.applyMatrix4(UJ),this}lookAt(J){return yZ.lookAt(J),yZ.updateMatrix(),this.applyMatrix4(yZ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(u8).negate(),this.translate(u8.x,u8.y,u8.z),this}setFromPoints(J){let $=[];for(let Z=0,Q=J.length;Z<Q;Z++){let W=J[Z];$.push(W.x,W.y,W.z||0)}return this.setAttribute("position",new J9($,3)),this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Q7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Z=0,Q=$.length;Z<Q;Z++){let W=$[Z];if(KJ.setFromBufferAttribute(W),this.morphTargetsRelative)b9.addVectors(this.boundingBox.min,KJ.min),this.boundingBox.expandByPoint(b9),b9.addVectors(this.boundingBox.max,KJ.max),this.boundingBox.expandByPoint(b9);else this.boundingBox.expandByPoint(KJ.min),this.boundingBox.expandByPoint(KJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new W7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(J){let Z=this.boundingSphere.center;if(KJ.setFromBufferAttribute(J),$)for(let W=0,K=$.length;W<K;W++){let Y=$[W];if(A7.setFromBufferAttribute(Y),this.morphTargetsRelative)b9.addVectors(KJ.min,A7.min),KJ.expandByPoint(b9),b9.addVectors(KJ.max,A7.max),KJ.expandByPoint(b9);else KJ.expandByPoint(A7.min),KJ.expandByPoint(A7.max)}KJ.getCenter(Z);let Q=0;for(let W=0,K=J.count;W<K;W++)b9.fromBufferAttribute(J,W),Q=Math.max(Q,Z.distanceToSquared(b9));if($)for(let W=0,K=$.length;W<K;W++){let Y=$[W],X=this.morphTargetsRelative;for(let q=0,H=Y.count;q<H;q++){if(b9.fromBufferAttribute(Y,q),X)u8.fromBufferAttribute(J,q),b9.add(u8);Q=Math.max(Q,Z.distanceToSquared(b9))}}if(this.boundingSphere.radius=Math.sqrt(Q),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let Z=J.array,Q=$.position.array,W=$.normal.array,K=$.uv.array,Y=Q.length/3;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new y9(new Float32Array(4*Y),4));let X=this.getAttribute("tangent").array,q=[],H=[];for(let z=0;z<Y;z++)q[z]=new T,H[z]=new T;let U=new T,G=new T,F=new T,D=new U0,O=new U0,E=new U0,V=new T,R=new T;function N(z,k,y){U.fromArray(Q,z*3),G.fromArray(Q,k*3),F.fromArray(Q,y*3),D.fromArray(K,z*2),O.fromArray(K,k*2),E.fromArray(K,y*2),G.sub(U),F.sub(U),O.sub(D),E.sub(D);let o=1/(O.x*E.y-E.x*O.y);if(!isFinite(o))return;V.copy(G).multiplyScalar(E.y).addScaledVector(F,-O.y).multiplyScalar(o),R.copy(F).multiplyScalar(O.x).addScaledVector(G,-E.x).multiplyScalar(o),q[z].add(V),q[k].add(V),q[y].add(V),H[z].add(R),H[k].add(R),H[y].add(R)}let B=this.groups;if(B.length===0)B=[{start:0,count:Z.length}];for(let z=0,k=B.length;z<k;++z){let y=B[z],o=y.start,t=y.count;for(let j=o,m=o+t;j<m;j+=3)N(Z[j+0],Z[j+1],Z[j+2])}let I=new T,L=new T,M=new T,A=new T;function _(z){M.fromArray(W,z*3),A.copy(M);let k=q[z];I.copy(k),I.sub(M.multiplyScalar(M.dot(k))).normalize(),L.crossVectors(A,k);let o=L.dot(H[z])<0?-1:1;X[z*4]=I.x,X[z*4+1]=I.y,X[z*4+2]=I.z,X[z*4+3]=o}for(let z=0,k=B.length;z<k;++z){let y=B[z],o=y.start,t=y.count;for(let j=o,m=o+t;j<m;j+=3)_(Z[j+0]),_(Z[j+1]),_(Z[j+2])}}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Z=this.getAttribute("normal");if(Z===void 0)Z=new y9(new Float32Array($.count*3),3),this.setAttribute("normal",Z);else for(let G=0,F=Z.count;G<F;G++)Z.setXYZ(G,0,0,0);let Q=new T,W=new T,K=new T,Y=new T,X=new T,q=new T,H=new T,U=new T;if(J)for(let G=0,F=J.count;G<F;G+=3){let D=J.getX(G+0),O=J.getX(G+1),E=J.getX(G+2);Q.fromBufferAttribute($,D),W.fromBufferAttribute($,O),K.fromBufferAttribute($,E),H.subVectors(K,W),U.subVectors(Q,W),H.cross(U),Y.fromBufferAttribute(Z,D),X.fromBufferAttribute(Z,O),q.fromBufferAttribute(Z,E),Y.add(H),X.add(H),q.add(H),Z.setXYZ(D,Y.x,Y.y,Y.z),Z.setXYZ(O,X.x,X.y,X.z),Z.setXYZ(E,q.x,q.y,q.z)}else for(let G=0,F=$.count;G<F;G+=3)Q.fromBufferAttribute($,G+0),W.fromBufferAttribute($,G+1),K.fromBufferAttribute($,G+2),H.subVectors(K,W),U.subVectors(Q,W),H.cross(U),Z.setXYZ(G+0,H.x,H.y,H.z),Z.setXYZ(G+1,H.x,H.y,H.z),Z.setXYZ(G+2,H.x,H.y,H.z);this.normalizeNormals(),Z.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Z=J.count;$<Z;$++)b9.fromBufferAttribute(J,$),b9.normalize(),J.setXYZ($,b9.x,b9.y,b9.z)}toNonIndexed(){function J(Y,X){let{array:q,itemSize:H,normalized:U}=Y,G=new q.constructor(X.length*H),F=0,D=0;for(let O=0,E=X.length;O<E;O++){if(Y.isInterleavedBufferAttribute)F=X[O]*Y.data.stride+Y.offset;else F=X[O]*H;for(let V=0;V<H;V++)G[D++]=q[F++]}return new y9(G,H,U)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new R9,Z=this.index.array,Q=this.attributes;for(let Y in Q){let X=Q[Y],q=J(X,Z);$.setAttribute(Y,q)}let W=this.morphAttributes;for(let Y in W){let X=[],q=W[Y];for(let H=0,U=q.length;H<U;H++){let G=q[H],F=J(G,Z);X.push(F)}$.morphAttributes[Y]=X}$.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let Y=0,X=K.length;Y<X;Y++){let q=K[Y];$.addGroup(q.start,q.count,q.materialIndex)}return $}toJSON(){let J={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let X=this.parameters;for(let q in X)if(X[q]!==void 0)J[q]=X[q];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Z=this.attributes;for(let X in Z){let q=Z[X];J.data.attributes[X]=q.toJSON(J.data)}let Q={},W=!1;for(let X in this.morphAttributes){let q=this.morphAttributes[X],H=[];for(let U=0,G=q.length;U<G;U++){let F=q[U];H.push(F.toJSON(J.data))}if(H.length>0)Q[X]=H,W=!0}if(W)J.data.morphAttributes=Q,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let Y=this.boundingSphere;if(Y!==null)J.data.boundingSphere={center:Y.center.toArray(),radius:Y.radius};return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Z=J.index;if(Z!==null)this.setIndex(Z.clone($));let Q=J.attributes;for(let q in Q){let H=Q[q];this.setAttribute(q,H.clone($))}let W=J.morphAttributes;for(let q in W){let H=[],U=W[q];for(let G=0,F=U.length;G<F;G++)H.push(U[G].clone($));this.morphAttributes[q]=H}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let q=0,H=K.length;q<H;q++){let U=K[q];this.addGroup(U.start,U.count,U.materialIndex)}let Y=J.boundingBox;if(Y!==null)this.boundingBox=Y.clone();let X=J.boundingSphere;if(X!==null)this.boundingSphere=X.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var y5=new Y9,D8=new L8,N$=new W7,f5=new T,d8=new T,p8=new T,l8=new T,fZ=new T,B$=new T,z$=new U0,I$=new U0,L$=new U0,h5=new T,v5=new T,g5=new T,M$=new T,C$=new T;class b extends U9{constructor(J=new R9,$=new k9){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Q.length;W<K;W++){let Y=Q[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=W}}}}getVertexPosition(J,$){let Z=this.geometry,Q=Z.attributes.position,W=Z.morphAttributes.position,K=Z.morphTargetsRelative;$.fromBufferAttribute(Q,J);let Y=this.morphTargetInfluences;if(W&&Y){B$.set(0,0,0);for(let X=0,q=W.length;X<q;X++){let H=Y[X],U=W[X];if(H===0)continue;if(fZ.fromBufferAttribute(U,J),K)B$.addScaledVector(fZ,H);else B$.addScaledVector(fZ.sub($),H)}$.add(B$)}return $}raycast(J,$){let Z=this.geometry,Q=this.material,W=this.matrixWorld;if(Q===void 0)return;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(N$.copy(Z.boundingSphere),N$.applyMatrix4(W),D8.copy(J.ray).recast(J.near),N$.containsPoint(D8.origin)===!1){if(D8.intersectSphere(N$,f5)===null)return;if(D8.origin.distanceToSquared(f5)>(J.far-J.near)**2)return}if(y5.copy(W).invert(),D8.copy(J.ray).applyMatrix4(y5),Z.boundingBox!==null){if(D8.intersectsBox(Z.boundingBox)===!1)return}this._computeIntersections(J,$,D8)}_computeIntersections(J,$,Z){let Q,W=this.geometry,K=this.material,Y=W.index,X=W.attributes.position,q=W.attributes.uv,H=W.attributes.uv1,U=W.attributes.normal,G=W.groups,F=W.drawRange;if(Y!==null)if(Array.isArray(K))for(let D=0,O=G.length;D<O;D++){let E=G[D],V=K[E.materialIndex],R=Math.max(E.start,F.start),N=Math.min(Y.count,Math.min(E.start+E.count,F.start+F.count));for(let B=R,I=N;B<I;B+=3){let L=Y.getX(B),M=Y.getX(B+1),A=Y.getX(B+2);if(Q=A$(this,V,J,Z,q,H,U,L,M,A),Q)Q.faceIndex=Math.floor(B/3),Q.face.materialIndex=E.materialIndex,$.push(Q)}}else{let D=Math.max(0,F.start),O=Math.min(Y.count,F.start+F.count);for(let E=D,V=O;E<V;E+=3){let R=Y.getX(E),N=Y.getX(E+1),B=Y.getX(E+2);if(Q=A$(this,K,J,Z,q,H,U,R,N,B),Q)Q.faceIndex=Math.floor(E/3),$.push(Q)}}else if(X!==void 0)if(Array.isArray(K))for(let D=0,O=G.length;D<O;D++){let E=G[D],V=K[E.materialIndex],R=Math.max(E.start,F.start),N=Math.min(X.count,Math.min(E.start+E.count,F.start+F.count));for(let B=R,I=N;B<I;B+=3){let L=B,M=B+1,A=B+2;if(Q=A$(this,V,J,Z,q,H,U,L,M,A),Q)Q.faceIndex=Math.floor(B/3),Q.face.materialIndex=E.materialIndex,$.push(Q)}}else{let D=Math.max(0,F.start),O=Math.min(X.count,F.start+F.count);for(let E=D,V=O;E<V;E+=3){let R=E,N=E+1,B=E+2;if(Q=A$(this,K,J,Z,q,H,U,R,N,B),Q)Q.faceIndex=Math.floor(E/3),$.push(Q)}}}}function ZX(J,$,Z,Q,W,K,Y,X){let q;if($.side===1)q=Q.intersectTriangle(Y,K,W,!0,X);else q=Q.intersectTriangle(W,K,Y,$.side===0,X);if(q===null)return null;C$.copy(X),C$.applyMatrix4(J.matrixWorld);let H=Z.ray.origin.distanceTo(C$);if(H<Z.near||H>Z.far)return null;return{distance:H,point:C$.clone(),object:J}}function A$(J,$,Z,Q,W,K,Y,X,q,H){J.getVertexPosition(X,d8),J.getVertexPosition(q,p8),J.getVertexPosition(H,l8);let U=ZX(J,$,Z,Q,d8,p8,l8,M$);if(U){if(W)z$.fromBufferAttribute(W,X),I$.fromBufferAttribute(W,q),L$.fromBufferAttribute(W,H),U.uv=GJ.getInterpolation(M$,d8,p8,l8,z$,I$,L$,new U0);if(K)z$.fromBufferAttribute(K,X),I$.fromBufferAttribute(K,q),L$.fromBufferAttribute(K,H),U.uv1=GJ.getInterpolation(M$,d8,p8,l8,z$,I$,L$,new U0),U.uv2=U.uv1;if(Y){if(h5.fromBufferAttribute(Y,X),v5.fromBufferAttribute(Y,q),g5.fromBufferAttribute(Y,H),U.normal=GJ.getInterpolation(M$,d8,p8,l8,h5,v5,g5,new T),U.normal.dot(Q.direction)>0)U.normal.multiplyScalar(-1)}let G={a:X,b:q,c:H,normal:new T,materialIndex:0};GJ.getNormal(d8,p8,l8,G.normal),U.face=G}return U}class X0 extends R9{constructor(J=1,$=1,Z=1,Q=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Z,widthSegments:Q,heightSegments:W,depthSegments:K};let Y=this;Q=Math.floor(Q),W=Math.floor(W),K=Math.floor(K);let X=[],q=[],H=[],U=[],G=0,F=0;D("z","y","x",-1,-1,Z,$,J,K,W,0),D("z","y","x",1,-1,Z,$,-J,K,W,1),D("x","z","y",1,1,J,Z,$,Q,K,2),D("x","z","y",1,-1,J,Z,-$,Q,K,3),D("x","y","z",1,-1,J,$,Z,Q,W,4),D("x","y","z",-1,-1,J,$,-Z,Q,W,5),this.setIndex(X),this.setAttribute("position",new J9(q,3)),this.setAttribute("normal",new J9(H,3)),this.setAttribute("uv",new J9(U,2));function D(O,E,V,R,N,B,I,L,M,A,_){let z=B/M,k=I/A,y=B/2,o=I/2,t=L/2,j=M+1,m=A+1,d=0,i=0,n=new T;for(let h=0;h<m;h++){let l=h*k-o;for(let r=0;r<j;r++){let f=r*z-y;n[O]=f*R,n[E]=l*N,n[V]=t,q.push(n.x,n.y,n.z),n[O]=0,n[E]=0,n[V]=L>0?1:-1,H.push(n.x,n.y,n.z),U.push(r/M),U.push(1-h/A),d+=1}}for(let h=0;h<A;h++)for(let l=0;l<M;l++){let r=G+l+j*h,f=G+l+j*(h+1),a=G+(l+1)+j*(h+1),Z0=G+(l+1)+j*h;X.push(r,f,Z0),X.push(f,a,Z0),i+=6}Y.addGroup(F,i,_),F+=i,G+=d}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new X0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}function Z7(J){let $={};for(let Z in J){$[Z]={};for(let Q in J[Z]){let W=J[Z][Q];if(W&&(W.isColor||W.isMatrix3||W.isMatrix4||W.isVector2||W.isVector3||W.isVector4||W.isTexture||W.isQuaternion))if(W.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Z][Q]=null;else $[Z][Q]=W.clone();else if(Array.isArray(W))$[Z][Q]=W.slice();else $[Z][Q]=W}}return $}function s9(J){let $={};for(let Z=0;Z<J.length;Z++){let Q=Z7(J[Z]);for(let W in Q)$[W]=Q[W]}return $}function QX(J){let $=[];for(let Z=0;Z<J.length;Z++)$.push(J[Z].clone());return $}function P6(J){if(J.getRenderTarget()===null)return J.outputColorSpace;return W9.workingColorSpace}var WX={clone:Z7,merge:s9},KX=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,XX=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class J8 extends uJ{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=KX,this.fragmentShader=XX,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=Z7(J.uniforms),this.uniformsGroups=QX(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let Q in this.uniforms){let K=this.uniforms[Q].value;if(K&&K.isTexture)$.uniforms[Q]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)$.uniforms[Q]={type:"c",value:K.getHex()};else if(K&&K.isVector2)$.uniforms[Q]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)$.uniforms[Q]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)$.uniforms[Q]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)$.uniforms[Q]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)$.uniforms[Q]={type:"m4",value:K.toArray()};else $.uniforms[Q]={value:K}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Z={};for(let Q in this.extensions)if(this.extensions[Q]===!0)Z[Q]=!0;if(Object.keys(Z).length>0)$.extensions=Z;return $}}class YQ extends U9{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Y9,this.projectionMatrix=new Y9,this.projectionMatrixInverse=new Y9,this.coordinateSystem=2000}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){super.updateMatrixWorld(J),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(J,$){super.updateWorldMatrix(J,$),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class d9 extends YQ{constructor(J=50,$=1,Z=0.1,Q=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Z,this.far=Q,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=$7*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(T7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return $7*2*Math.atan(Math.tan(T7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(J,$,Z,Q,W,K){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Z,this.view.offsetY=Q,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(T7*0.5*this.fov)/this.zoom,Z=2*$,Q=this.aspect*Z,W=-0.5*Q,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:X,fullHeight:q}=K;W+=K.offsetX*Q/X,$-=K.offsetY*Z/q,Q*=K.width/X,Z*=K.height/q}let Y=this.filmOffset;if(Y!==0)W+=J*Y/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Q,$,$-Z,J,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}var c8=-90,n8=1;class S6 extends U9{constructor(J,$,Z){super();this.type="CubeCamera",this.renderTarget=Z,this.coordinateSystem=null,this.activeMipmapLevel=0;let Q=new d9(c8,n8,J,$);Q.layers=this.layers,this.add(Q);let W=new d9(c8,n8,J,$);W.layers=this.layers,this.add(W);let K=new d9(c8,n8,J,$);K.layers=this.layers,this.add(K);let Y=new d9(c8,n8,J,$);Y.layers=this.layers,this.add(Y);let X=new d9(c8,n8,J,$);X.layers=this.layers,this.add(X);let q=new d9(c8,n8,J,$);q.layers=this.layers,this.add(q)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Z,Q,W,K,Y,X]=$;for(let q of $)this.remove(q);if(J===2000)Z.up.set(0,1,0),Z.lookAt(1,0,0),Q.up.set(0,1,0),Q.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),Y.up.set(0,1,0),Y.lookAt(0,0,1),X.up.set(0,1,0),X.lookAt(0,0,-1);else if(J===2001)Z.up.set(0,-1,0),Z.lookAt(-1,0,0),Q.up.set(0,-1,0),Q.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),Y.up.set(0,-1,0),Y.lookAt(0,0,1),X.up.set(0,-1,0),X.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let q of $)this.add(q),q.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Z,activeMipmapLevel:Q}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,Y,X,q,H]=this.children,U=J.getRenderTarget(),G=J.getActiveCubeFace(),F=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let O=Z.texture.generateMipmaps;Z.texture.generateMipmaps=!1,J.setRenderTarget(Z,0,Q),J.render($,W),J.setRenderTarget(Z,1,Q),J.render($,K),J.setRenderTarget(Z,2,Q),J.render($,Y),J.setRenderTarget(Z,3,Q),J.render($,X),J.setRenderTarget(Z,4,Q),J.render($,q),Z.texture.generateMipmaps=O,J.setRenderTarget(Z,5,Q),J.render($,H),J.setRenderTarget(U,G,F),J.xr.enabled=D,Z.texture.needsPMREMUpdate=!0}}class qQ extends r9{constructor(J,$,Z,Q,W,K,Y,X,q,H){J=J!==void 0?J:[],$=$!==void 0?$:301;super(J,$,Z,Q,W,K,Y,X,q,H);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class w6 extends eJ{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Z={width:J,height:J,depth:1},Q=[Z,Z,Z,Z,Z,Z];if($.encoding!==void 0)j7("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),$.colorSpace=$.encoding===3001?"srgb":"";this.texture=new qQ(Q,$.mapping,$.wrapS,$.wrapT,$.magFilter,$.minFilter,$.format,$.type,$.anisotropy,$.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=$.generateMipmaps!==void 0?$.generateMipmaps:!1,this.texture.minFilter=$.minFilter!==void 0?$.minFilter:1006}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Z={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Q=new X0(5,5,5),W=new J8({name:"CubemapFromEquirect",uniforms:Z7(Z.uniforms),vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,side:1,blending:0});W.uniforms.tEquirect.value=$;let K=new b(Q,W),Y=$.minFilter;if($.minFilter===1008)$.minFilter=1006;return new S6(1,10,this).update(J,K),$.minFilter=Y,K.geometry.dispose(),K.material.dispose(),this}clear(J,$,Z,Q){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear($,Z,Q);J.setRenderTarget(W)}}var hZ=new T,YX=new T,qX=new s0;class IJ{constructor(J=new T(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Z,Q){return this.normal.set(J,$,Z),this.constant=Q,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Z){let Q=hZ.subVectors(Z,$).cross(YX.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(Q,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$){let Z=J.delta(hZ),Q=this.normal.dot(Z);if(Q===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let W=-(J.start.dot(this.normal)+this.constant)/Q;if(W<0||W>1)return null;return $.copy(J.start).addScaledVector(Z,W)}intersectsLine(J){let $=this.distanceToPoint(J.start),Z=this.distanceToPoint(J.end);return $<0&&Z>0||Z<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Z=$||qX.getNormalMatrix(J),Q=this.coplanarPoint(hZ).applyMatrix4(J),W=this.normal.applyMatrix3(Z).normalize();return this.constant=-Q.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var E8=new W7,k$=new T;class l${constructor(J=new IJ,$=new IJ,Z=new IJ,Q=new IJ,W=new IJ,K=new IJ){this.planes=[J,$,Z,Q,W,K]}set(J,$,Z,Q,W,K){let Y=this.planes;return Y[0].copy(J),Y[1].copy($),Y[2].copy(Z),Y[3].copy(Q),Y[4].copy(W),Y[5].copy(K),this}copy(J){let $=this.planes;for(let Z=0;Z<6;Z++)$[Z].copy(J.planes[Z]);return this}setFromProjectionMatrix(J,$=2000){let Z=this.planes,Q=J.elements,W=Q[0],K=Q[1],Y=Q[2],X=Q[3],q=Q[4],H=Q[5],U=Q[6],G=Q[7],F=Q[8],D=Q[9],O=Q[10],E=Q[11],V=Q[12],R=Q[13],N=Q[14],B=Q[15];if(Z[0].setComponents(X-W,G-q,E-F,B-V).normalize(),Z[1].setComponents(X+W,G+q,E+F,B+V).normalize(),Z[2].setComponents(X+K,G+H,E+D,B+R).normalize(),Z[3].setComponents(X-K,G-H,E-D,B-R).normalize(),Z[4].setComponents(X-Y,G-U,E-O,B-N).normalize(),$===2000)Z[5].setComponents(X+Y,G+U,E+O,B+N).normalize();else if($===2001)Z[5].setComponents(Y,U,O,N).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();E8.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();E8.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(E8)}intersectsSprite(J){return E8.center.set(0,0,0),E8.radius=0.7071067811865476,E8.applyMatrix4(J.matrixWorld),this.intersectsSphere(E8)}intersectsSphere(J){let $=this.planes,Z=J.center,Q=-J.radius;for(let W=0;W<6;W++)if($[W].distanceToPoint(Z)<Q)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Z=0;Z<6;Z++){let Q=$[Z];if(k$.x=Q.normal.x>0?J.max.x:J.min.x,k$.y=Q.normal.y>0?J.max.y:J.min.y,k$.z=Q.normal.z>0?J.max.z:J.min.z,Q.distanceToPoint(k$)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Z=0;Z<6;Z++)if($[Z].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function T6(){let J=null,$=!1,Z=null,Q=null;function W(K,Y){Z(K,Y),Q=J.requestAnimationFrame(W)}return{start:function(){if($===!0)return;if(Z===null)return;Q=J.requestAnimationFrame(W),$=!0},stop:function(){J.cancelAnimationFrame(Q),$=!1},setAnimationLoop:function(K){Z=K},setContext:function(K){J=K}}}function HX(J,$){let Z=$.isWebGL2,Q=new WeakMap;function W(H,U){let{array:G,usage:F}=H,D=G.byteLength,O=J.createBuffer();J.bindBuffer(U,O),J.bufferData(U,G,F),H.onUploadCallback();let E;if(G instanceof Float32Array)E=J.FLOAT;else if(G instanceof Uint16Array)if(H.isFloat16BufferAttribute)if(Z)E=J.HALF_FLOAT;else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=J.UNSIGNED_SHORT;else if(G instanceof Int16Array)E=J.SHORT;else if(G instanceof Uint32Array)E=J.UNSIGNED_INT;else if(G instanceof Int32Array)E=J.INT;else if(G instanceof Int8Array)E=J.BYTE;else if(G instanceof Uint8Array)E=J.UNSIGNED_BYTE;else if(G instanceof Uint8ClampedArray)E=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+G);return{buffer:O,type:E,bytesPerElement:G.BYTES_PER_ELEMENT,version:H.version,size:D}}function K(H,U,G){let{array:F,_updateRange:D,updateRanges:O}=U;if(J.bindBuffer(G,H),D.count===-1&&O.length===0)J.bufferSubData(G,0,F);if(O.length!==0){for(let E=0,V=O.length;E<V;E++){let R=O[E];if(Z)J.bufferSubData(G,R.start*F.BYTES_PER_ELEMENT,F,R.start,R.count);else J.bufferSubData(G,R.start*F.BYTES_PER_ELEMENT,F.subarray(R.start,R.start+R.count))}U.clearUpdateRanges()}if(D.count!==-1){if(Z)J.bufferSubData(G,D.offset*F.BYTES_PER_ELEMENT,F,D.offset,D.count);else J.bufferSubData(G,D.offset*F.BYTES_PER_ELEMENT,F.subarray(D.offset,D.offset+D.count));D.count=-1}U.onUploadCallback()}function Y(H){if(H.isInterleavedBufferAttribute)H=H.data;return Q.get(H)}function X(H){if(H.isInterleavedBufferAttribute)H=H.data;let U=Q.get(H);if(U)J.deleteBuffer(U.buffer),Q.delete(H)}function q(H,U){if(H.isGLBufferAttribute){let F=Q.get(H);if(!F||F.version<H.version)Q.set(H,{buffer:H.buffer,type:H.type,bytesPerElement:H.elementSize,version:H.version});return}if(H.isInterleavedBufferAttribute)H=H.data;let G=Q.get(H);if(G===void 0)Q.set(H,W(H,U));else if(G.version<H.version){if(G.size!==H.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");K(G.buffer,H,U),G.version=H.version}}return{get:Y,remove:X,update:q}}class AJ extends R9{constructor(J=1,$=1,Z=1,Q=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Z,heightSegments:Q};let W=J/2,K=$/2,Y=Math.floor(Z),X=Math.floor(Q),q=Y+1,H=X+1,U=J/Y,G=$/X,F=[],D=[],O=[],E=[];for(let V=0;V<H;V++){let R=V*G-K;for(let N=0;N<q;N++){let B=N*U-W;D.push(B,-R,0),O.push(0,0,1),E.push(N/Y),E.push(1-V/X)}}for(let V=0;V<X;V++)for(let R=0;R<Y;R++){let N=R+q*V,B=R+q*(V+1),I=R+1+q*(V+1),L=R+1+q*V;F.push(N,B,L),F.push(B,I,L)}this.setIndex(F),this.setAttribute("position",new J9(D,3)),this.setAttribute("normal",new J9(O,3)),this.setAttribute("uv",new J9(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new AJ(J.width,J.height,J.widthSegments,J.heightSegments)}}var UX=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GX=`#ifdef USE_ALPHAHASH
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
#endif`,FX=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,VX=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RX=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,DX=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,EX=`#ifdef USE_AOMAP
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
#endif`,OX=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,NX=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,BX=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,zX=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,IX=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,LX=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,MX=`#ifdef USE_IRIDESCENCE
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
#endif`,CX=`#ifdef USE_BUMPMAP
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
#endif`,AX=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,kX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,PX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,SX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wX=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,TX=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_X=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,jX=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,bX=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,xX=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yX=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fX=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hX=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gX=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mX="gl_FragColor = linearToOutputTexel( gl_FragColor );",uX=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,dX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lX=`#ifdef USE_ENVMAP
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
#endif`,cX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sX=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,iX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,aX=`#ifdef USE_GRADIENTMAP
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
}`,tX=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,eX=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,JY=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$Y=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ZY=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
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
#endif`,QY=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,WY=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,XY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,YY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qY=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,HY=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,UY=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,GY=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,FY=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,VY=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,RY=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DY=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,EY=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,OY=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,NY=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,BY=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zY=`#if defined( USE_POINTS_UV )
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
#endif`,IY=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,LY=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,MY=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,CY=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,AY=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,kY=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,PY=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,SY=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_Y=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jY=`#ifdef USE_NORMALMAP
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
#endif`,bY=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xY=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yY=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fY=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hY=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vY=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,gY=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mY=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uY=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dY=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pY=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lY=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cY=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,nY=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sY=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,oY=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,iY=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rY=`#ifdef USE_SKINNING
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
#endif`,aY=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tY=`#ifdef USE_SKINNING
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
#endif`,eY=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Z1=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Q1=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,W1=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,K1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,H1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U1=`uniform sampler2D t2D;
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
}`,G1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,R1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D1=`#include <common>
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
}`,E1=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,O1=`#define DISTANCE
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
}`,N1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,B1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,z1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I1=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,L1=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,M1=`#include <common>
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
}`,C1=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,A1=`#define LAMBERT
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
}`,k1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,P1=`#define MATCAP
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
}`,S1=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,w1=`#define NORMAL
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
}`,T1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_1=`#define PHONG
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
}`,j1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,b1=`#define STANDARD
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
}`,x1=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,y1=`#define TOON
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
}`,f1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,h1=`uniform float size;
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
}`,v1=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,g1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,m1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,u1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,d1=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,d0={alphahash_fragment:UX,alphahash_pars_fragment:GX,alphamap_fragment:FX,alphamap_pars_fragment:VX,alphatest_fragment:RX,alphatest_pars_fragment:DX,aomap_fragment:EX,aomap_pars_fragment:OX,batching_pars_vertex:NX,batching_vertex:BX,begin_vertex:zX,beginnormal_vertex:IX,bsdfs:LX,iridescence_fragment:MX,bumpmap_pars_fragment:CX,clipping_planes_fragment:AX,clipping_planes_pars_fragment:kX,clipping_planes_pars_vertex:PX,clipping_planes_vertex:SX,color_fragment:wX,color_pars_fragment:TX,color_pars_vertex:_X,color_vertex:jX,common:bX,cube_uv_reflection_fragment:xX,defaultnormal_vertex:yX,displacementmap_pars_vertex:fX,displacementmap_vertex:hX,emissivemap_fragment:vX,emissivemap_pars_fragment:gX,colorspace_fragment:mX,colorspace_pars_fragment:uX,envmap_fragment:dX,envmap_common_pars_fragment:pX,envmap_pars_fragment:lX,envmap_pars_vertex:cX,envmap_physical_pars_fragment:QY,envmap_vertex:nX,fog_vertex:sX,fog_pars_vertex:oX,fog_fragment:iX,fog_pars_fragment:rX,gradientmap_pars_fragment:aX,lightmap_fragment:tX,lightmap_pars_fragment:eX,lights_lambert_fragment:JY,lights_lambert_pars_fragment:$Y,lights_pars_begin:ZY,lights_toon_fragment:WY,lights_toon_pars_fragment:KY,lights_phong_fragment:XY,lights_phong_pars_fragment:YY,lights_physical_fragment:qY,lights_physical_pars_fragment:HY,lights_fragment_begin:UY,lights_fragment_maps:GY,lights_fragment_end:FY,logdepthbuf_fragment:VY,logdepthbuf_pars_fragment:RY,logdepthbuf_pars_vertex:DY,logdepthbuf_vertex:EY,map_fragment:OY,map_pars_fragment:NY,map_particle_fragment:BY,map_particle_pars_fragment:zY,metalnessmap_fragment:IY,metalnessmap_pars_fragment:LY,morphcolor_vertex:MY,morphnormal_vertex:CY,morphtarget_pars_vertex:AY,morphtarget_vertex:kY,normal_fragment_begin:PY,normal_fragment_maps:SY,normal_pars_fragment:wY,normal_pars_vertex:TY,normal_vertex:_Y,normalmap_pars_fragment:jY,clearcoat_normal_fragment_begin:bY,clearcoat_normal_fragment_maps:xY,clearcoat_pars_fragment:yY,iridescence_pars_fragment:fY,opaque_fragment:hY,packing:vY,premultiplied_alpha_fragment:gY,project_vertex:mY,dithering_fragment:uY,dithering_pars_fragment:dY,roughnessmap_fragment:pY,roughnessmap_pars_fragment:lY,shadowmap_pars_fragment:cY,shadowmap_pars_vertex:nY,shadowmap_vertex:sY,shadowmask_pars_fragment:oY,skinbase_vertex:iY,skinning_pars_vertex:rY,skinning_vertex:aY,skinnormal_vertex:tY,specularmap_fragment:eY,specularmap_pars_fragment:J1,tonemapping_fragment:$1,tonemapping_pars_fragment:Z1,transmission_fragment:Q1,transmission_pars_fragment:W1,uv_pars_fragment:K1,uv_pars_vertex:X1,uv_vertex:Y1,worldpos_vertex:q1,background_vert:H1,background_frag:U1,backgroundCube_vert:G1,backgroundCube_frag:F1,cube_vert:V1,cube_frag:R1,depth_vert:D1,depth_frag:E1,distanceRGBA_vert:O1,distanceRGBA_frag:N1,equirect_vert:B1,equirect_frag:z1,linedashed_vert:I1,linedashed_frag:L1,meshbasic_vert:M1,meshbasic_frag:C1,meshlambert_vert:A1,meshlambert_frag:k1,meshmatcap_vert:P1,meshmatcap_frag:S1,meshnormal_vert:w1,meshnormal_frag:T1,meshphong_vert:_1,meshphong_frag:j1,meshphysical_vert:b1,meshphysical_frag:x1,meshtoon_vert:y1,meshtoon_frag:f1,points_vert:h1,points_frag:v1,shadow_vert:g1,shadow_frag:m1,sprite_vert:u1,sprite_frag:d1},H0={common:{diffuse:{value:new a0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new s0},alphaMap:{value:null},alphaMapTransform:{value:new s0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new s0}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new s0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new s0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new s0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new s0},normalScale:{value:new U0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new s0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new s0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new s0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new s0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new a0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new a0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new s0},alphaTest:{value:0},uvTransform:{value:new s0}},sprite:{diffuse:{value:new a0(16777215)},opacity:{value:1},center:{value:new U0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new s0},alphaMap:{value:null},alphaMapTransform:{value:new s0},alphaTest:{value:0}}},LJ={basic:{uniforms:s9([H0.common,H0.specularmap,H0.envmap,H0.aomap,H0.lightmap,H0.fog]),vertexShader:d0.meshbasic_vert,fragmentShader:d0.meshbasic_frag},lambert:{uniforms:s9([H0.common,H0.specularmap,H0.envmap,H0.aomap,H0.lightmap,H0.emissivemap,H0.bumpmap,H0.normalmap,H0.displacementmap,H0.fog,H0.lights,{emissive:{value:new a0(0)}}]),vertexShader:d0.meshlambert_vert,fragmentShader:d0.meshlambert_frag},phong:{uniforms:s9([H0.common,H0.specularmap,H0.envmap,H0.aomap,H0.lightmap,H0.emissivemap,H0.bumpmap,H0.normalmap,H0.displacementmap,H0.fog,H0.lights,{emissive:{value:new a0(0)},specular:{value:new a0(1118481)},shininess:{value:30}}]),vertexShader:d0.meshphong_vert,fragmentShader:d0.meshphong_frag},standard:{uniforms:s9([H0.common,H0.envmap,H0.aomap,H0.lightmap,H0.emissivemap,H0.bumpmap,H0.normalmap,H0.displacementmap,H0.roughnessmap,H0.metalnessmap,H0.fog,H0.lights,{emissive:{value:new a0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:d0.meshphysical_vert,fragmentShader:d0.meshphysical_frag},toon:{uniforms:s9([H0.common,H0.aomap,H0.lightmap,H0.emissivemap,H0.bumpmap,H0.normalmap,H0.displacementmap,H0.gradientmap,H0.fog,H0.lights,{emissive:{value:new a0(0)}}]),vertexShader:d0.meshtoon_vert,fragmentShader:d0.meshtoon_frag},matcap:{uniforms:s9([H0.common,H0.bumpmap,H0.normalmap,H0.displacementmap,H0.fog,{matcap:{value:null}}]),vertexShader:d0.meshmatcap_vert,fragmentShader:d0.meshmatcap_frag},points:{uniforms:s9([H0.points,H0.fog]),vertexShader:d0.points_vert,fragmentShader:d0.points_frag},dashed:{uniforms:s9([H0.common,H0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:d0.linedashed_vert,fragmentShader:d0.linedashed_frag},depth:{uniforms:s9([H0.common,H0.displacementmap]),vertexShader:d0.depth_vert,fragmentShader:d0.depth_frag},normal:{uniforms:s9([H0.common,H0.bumpmap,H0.normalmap,H0.displacementmap,{opacity:{value:1}}]),vertexShader:d0.meshnormal_vert,fragmentShader:d0.meshnormal_frag},sprite:{uniforms:s9([H0.sprite,H0.fog]),vertexShader:d0.sprite_vert,fragmentShader:d0.sprite_frag},background:{uniforms:{uvTransform:{value:new s0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:d0.background_vert,fragmentShader:d0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:d0.backgroundCube_vert,fragmentShader:d0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:d0.cube_vert,fragmentShader:d0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:d0.equirect_vert,fragmentShader:d0.equirect_frag},distanceRGBA:{uniforms:s9([H0.common,H0.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:d0.distanceRGBA_vert,fragmentShader:d0.distanceRGBA_frag},shadow:{uniforms:s9([H0.lights,H0.fog,{color:{value:new a0(0)},opacity:{value:1}}]),vertexShader:d0.shadow_vert,fragmentShader:d0.shadow_frag}};LJ.physical={uniforms:s9([LJ.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new s0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new s0},clearcoatNormalScale:{value:new U0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new s0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new s0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new s0},sheen:{value:0},sheenColor:{value:new a0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new s0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new s0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new s0},transmissionSamplerSize:{value:new U0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new s0},attenuationDistance:{value:0},attenuationColor:{value:new a0(0)},specularColor:{value:new a0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new s0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new s0},anisotropyVector:{value:new U0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new s0}}]),vertexShader:d0.meshphysical_vert,fragmentShader:d0.meshphysical_frag};var P$={r:0,b:0,g:0};function p1(J,$,Z,Q,W,K,Y){let X=new a0(0),q=K===!0?0:1,H,U,G=null,F=0,D=null;function O(V,R){let N=!1,B=R.isScene===!0?R.background:null;if(B&&B.isTexture)B=(R.backgroundBlurriness>0?Z:$).get(B);if(B===null)E(X,q);else if(B&&B.isColor)E(B,1),N=!0;let I=J.xr.getEnvironmentBlendMode();if(I==="additive")Q.buffers.color.setClear(0,0,0,1,Y);else if(I==="alpha-blend")Q.buffers.color.setClear(0,0,0,0,Y);if(J.autoClear||N)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(B&&(B.isCubeTexture||B.mapping===306)){if(U===void 0)U=new b(new X0(1,1,1),new J8({name:"BackgroundCubeMaterial",uniforms:Z7(LJ.backgroundCube.uniforms),vertexShader:LJ.backgroundCube.vertexShader,fragmentShader:LJ.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(L,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(U);if(U.material.uniforms.envMap.value=B,U.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,U.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,U.material.toneMapped=W9.getTransfer(B.colorSpace)!=="srgb",G!==B||F!==B.version||D!==J.toneMapping)U.material.needsUpdate=!0,G=B,F=B.version,D=J.toneMapping;U.layers.enableAll(),V.unshift(U,U.geometry,U.material,0,0,null)}else if(B&&B.isTexture){if(H===void 0)H=new b(new AJ(2,2),new J8({name:"BackgroundMaterial",uniforms:Z7(LJ.background.uniforms),vertexShader:LJ.background.vertexShader,fragmentShader:LJ.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),H.geometry.deleteAttribute("normal"),Object.defineProperty(H.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(H);if(H.material.uniforms.t2D.value=B,H.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,H.material.toneMapped=W9.getTransfer(B.colorSpace)!=="srgb",B.matrixAutoUpdate===!0)B.updateMatrix();if(H.material.uniforms.uvTransform.value.copy(B.matrix),G!==B||F!==B.version||D!==J.toneMapping)H.material.needsUpdate=!0,G=B,F=B.version,D=J.toneMapping;H.layers.enableAll(),V.unshift(H,H.geometry,H.material,0,0,null)}}function E(V,R){V.getRGB(P$,P6(J)),Q.buffers.color.setClear(P$.r,P$.g,P$.b,R,Y)}return{getClearColor:function(){return X},setClearColor:function(V,R=1){X.set(V),q=R,E(X,q)},getClearAlpha:function(){return q},setClearAlpha:function(V){q=V,E(X,q)},render:O}}function l1(J,$,Z,Q){let W=J.getParameter(J.MAX_VERTEX_ATTRIBS),K=Q.isWebGL2?null:$.get("OES_vertex_array_object"),Y=Q.isWebGL2||K!==null,X={},q=V(null),H=q,U=!1;function G(j,m,d,i,n){let h=!1;if(Y){let l=E(i,d,m);if(H!==l)H=l,D(H.object);if(h=R(j,i,d,n),h)N(j,i,d,n)}else{let l=m.wireframe===!0;if(H.geometry!==i.id||H.program!==d.id||H.wireframe!==l)H.geometry=i.id,H.program=d.id,H.wireframe=l,h=!0}if(n!==null)Z.update(n,J.ELEMENT_ARRAY_BUFFER);if(h||U){if(U=!1,_(j,m,d,i),n!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Z.get(n).buffer)}}function F(){if(Q.isWebGL2)return J.createVertexArray();return K.createVertexArrayOES()}function D(j){if(Q.isWebGL2)return J.bindVertexArray(j);return K.bindVertexArrayOES(j)}function O(j){if(Q.isWebGL2)return J.deleteVertexArray(j);return K.deleteVertexArrayOES(j)}function E(j,m,d){let i=d.wireframe===!0,n=X[j.id];if(n===void 0)n={},X[j.id]=n;let h=n[m.id];if(h===void 0)h={},n[m.id]=h;let l=h[i];if(l===void 0)l=V(F()),h[i]=l;return l}function V(j){let m=[],d=[],i=[];for(let n=0;n<W;n++)m[n]=0,d[n]=0,i[n]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:d,attributeDivisors:i,object:j,attributes:{},index:null}}function R(j,m,d,i){let n=H.attributes,h=m.attributes,l=0,r=d.getAttributes();for(let f in r)if(r[f].location>=0){let Z0=n[f],Y0=h[f];if(Y0===void 0){if(f==="instanceMatrix"&&j.instanceMatrix)Y0=j.instanceMatrix;if(f==="instanceColor"&&j.instanceColor)Y0=j.instanceColor}if(Z0===void 0)return!0;if(Z0.attribute!==Y0)return!0;if(Y0&&Z0.data!==Y0.data)return!0;l++}if(H.attributesNum!==l)return!0;if(H.index!==i)return!0;return!1}function N(j,m,d,i){let n={},h=m.attributes,l=0,r=d.getAttributes();for(let f in r)if(r[f].location>=0){let Z0=h[f];if(Z0===void 0){if(f==="instanceMatrix"&&j.instanceMatrix)Z0=j.instanceMatrix;if(f==="instanceColor"&&j.instanceColor)Z0=j.instanceColor}let Y0={};if(Y0.attribute=Z0,Z0&&Z0.data)Y0.data=Z0.data;n[f]=Y0,l++}H.attributes=n,H.attributesNum=l,H.index=i}function B(){let j=H.newAttributes;for(let m=0,d=j.length;m<d;m++)j[m]=0}function I(j){L(j,0)}function L(j,m){let{newAttributes:d,enabledAttributes:i,attributeDivisors:n}=H;if(d[j]=1,i[j]===0)J.enableVertexAttribArray(j),i[j]=1;if(n[j]!==m)(Q.isWebGL2?J:$.get("ANGLE_instanced_arrays"))[Q.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](j,m),n[j]=m}function M(){let{newAttributes:j,enabledAttributes:m}=H;for(let d=0,i=m.length;d<i;d++)if(m[d]!==j[d])J.disableVertexAttribArray(d),m[d]=0}function A(j,m,d,i,n,h,l){if(l===!0)J.vertexAttribIPointer(j,m,d,n,h);else J.vertexAttribPointer(j,m,d,i,n,h)}function _(j,m,d,i){if(Q.isWebGL2===!1&&(j.isInstancedMesh||i.isInstancedBufferGeometry)){if($.get("ANGLE_instanced_arrays")===null)return}B();let n=i.attributes,h=d.getAttributes(),l=m.defaultAttributeValues;for(let r in h){let f=h[r];if(f.location>=0){let a=n[r];if(a===void 0){if(r==="instanceMatrix"&&j.instanceMatrix)a=j.instanceMatrix;if(r==="instanceColor"&&j.instanceColor)a=j.instanceColor}if(a!==void 0){let{normalized:Z0,itemSize:Y0}=a,O0=Z.get(a);if(O0===void 0)continue;let{buffer:w0,type:P0,bytesPerElement:T0}=O0,o0=Q.isWebGL2===!0&&(P0===J.INT||P0===J.UNSIGNED_INT||a.gpuType===1013);if(a.isInterleavedBufferAttribute){let v=a.data,M9=v.stride,p0=a.offset;if(v.isInstancedInterleavedBuffer){for(let M0=0;M0<f.locationSize;M0++)L(f.location+M0,v.meshPerAttribute);if(j.isInstancedMesh!==!0&&i._maxInstanceCount===void 0)i._maxInstanceCount=v.meshPerAttribute*v.count}else for(let M0=0;M0<f.locationSize;M0++)I(f.location+M0);J.bindBuffer(J.ARRAY_BUFFER,w0);for(let M0=0;M0<f.locationSize;M0++)A(f.location+M0,Y0/f.locationSize,P0,Z0,M9*T0,(p0+Y0/f.locationSize*M0)*T0,o0)}else{if(a.isInstancedBufferAttribute){for(let v=0;v<f.locationSize;v++)L(f.location+v,a.meshPerAttribute);if(j.isInstancedMesh!==!0&&i._maxInstanceCount===void 0)i._maxInstanceCount=a.meshPerAttribute*a.count}else for(let v=0;v<f.locationSize;v++)I(f.location+v);J.bindBuffer(J.ARRAY_BUFFER,w0);for(let v=0;v<f.locationSize;v++)A(f.location+v,Y0/f.locationSize,P0,Z0,Y0*T0,Y0/f.locationSize*v*T0,o0)}}else if(l!==void 0){let Z0=l[r];if(Z0!==void 0)switch(Z0.length){case 2:J.vertexAttrib2fv(f.location,Z0);break;case 3:J.vertexAttrib3fv(f.location,Z0);break;case 4:J.vertexAttrib4fv(f.location,Z0);break;default:J.vertexAttrib1fv(f.location,Z0)}}}}M()}function z(){o();for(let j in X){let m=X[j];for(let d in m){let i=m[d];for(let n in i)O(i[n].object),delete i[n];delete m[d]}delete X[j]}}function k(j){if(X[j.id]===void 0)return;let m=X[j.id];for(let d in m){let i=m[d];for(let n in i)O(i[n].object),delete i[n];delete m[d]}delete X[j.id]}function y(j){for(let m in X){let d=X[m];if(d[j.id]===void 0)continue;let i=d[j.id];for(let n in i)O(i[n].object),delete i[n];delete d[j.id]}}function o(){if(t(),U=!0,H===q)return;H=q,D(H.object)}function t(){q.geometry=null,q.program=null,q.wireframe=!1}return{setup:G,reset:o,resetDefaultState:t,dispose:z,releaseStatesOfGeometry:k,releaseStatesOfProgram:y,initAttributes:B,enableAttribute:I,disableUnusedAttributes:M}}function c1(J,$,Z,Q){let W=Q.isWebGL2,K;function Y(U){K=U}function X(U,G){J.drawArrays(K,U,G),Z.update(G,K,1)}function q(U,G,F){if(F===0)return;let D,O;if(W)D=J,O="drawArraysInstanced";else if(D=$.get("ANGLE_instanced_arrays"),O="drawArraysInstancedANGLE",D===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}D[O](K,U,G,F),Z.update(G,K,F)}function H(U,G,F){if(F===0)return;let D=$.get("WEBGL_multi_draw");if(D===null)for(let O=0;O<F;O++)this.render(U[O],G[O]);else{D.multiDrawArraysWEBGL(K,U,0,G,0,F);let O=0;for(let E=0;E<F;E++)O+=G[E];Z.update(O,K,1)}}this.setMode=Y,this.render=X,this.renderInstances=q,this.renderMultiDraw=H}function n1(J,$,Z){let Q;function W(){if(Q!==void 0)return Q;if($.has("EXT_texture_filter_anisotropic")===!0){let A=$.get("EXT_texture_filter_anisotropic");Q=J.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Q=0;return Q}function K(A){if(A==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let Y=typeof WebGL2RenderingContext<"u"&&J.constructor.name==="WebGL2RenderingContext",X=Z.precision!==void 0?Z.precision:"highp",q=K(X);if(q!==X)console.warn("THREE.WebGLRenderer:",X,"not supported, using",q,"instead."),X=q;let H=Y||$.has("WEBGL_draw_buffers"),U=Z.logarithmicDepthBuffer===!0,G=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),F=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=J.getParameter(J.MAX_TEXTURE_SIZE),O=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),V=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),R=J.getParameter(J.MAX_VARYING_VECTORS),N=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),B=F>0,I=Y||$.has("OES_texture_float"),L=B&&I,M=Y?J.getParameter(J.MAX_SAMPLES):0;return{isWebGL2:Y,drawBuffers:H,getMaxAnisotropy:W,getMaxPrecision:K,precision:X,logarithmicDepthBuffer:U,maxTextures:G,maxVertexTextures:F,maxTextureSize:D,maxCubemapSize:O,maxAttributes:E,maxVertexUniforms:V,maxVaryings:R,maxFragmentUniforms:N,vertexTextures:B,floatFragmentTextures:I,floatVertexTextures:L,maxSamples:M}}function s1(J){let $=this,Z=null,Q=0,W=!1,K=!1,Y=new IJ,X=new s0,q={value:null,needsUpdate:!1};this.uniform=q,this.numPlanes=0,this.numIntersection=0,this.init=function(G,F){let D=G.length!==0||F||Q!==0||W;return W=F,Q=G.length,D},this.beginShadows=function(){K=!0,U(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(G,F){Z=U(G,F,0)},this.setState=function(G,F,D){let{clippingPlanes:O,clipIntersection:E,clipShadows:V}=G,R=J.get(G);if(!W||O===null||O.length===0||K&&!V)if(K)U(null);else H();else{let N=K?0:Q,B=N*4,I=R.clippingState||null;q.value=I,I=U(O,F,B,D);for(let L=0;L!==B;++L)I[L]=Z[L];R.clippingState=I,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=N}};function H(){if(q.value!==Z)q.value=Z,q.needsUpdate=Q>0;$.numPlanes=Q,$.numIntersection=0}function U(G,F,D,O){let E=G!==null?G.length:0,V=null;if(E!==0){if(V=q.value,O!==!0||V===null){let R=D+E*4,N=F.matrixWorldInverse;if(X.getNormalMatrix(N),V===null||V.length<R)V=new Float32Array(R);for(let B=0,I=D;B!==E;++B,I+=4)Y.copy(G[B]).applyMatrix4(N,X),Y.normal.toArray(V,I),V[I+3]=Y.constant}q.value=V,q.needsUpdate=!0}return $.numPlanes=E,$.numIntersection=0,V}}function o1(J){let $=new WeakMap;function Z(Y,X){if(X===303)Y.mapping=301;else if(X===304)Y.mapping=302;return Y}function Q(Y){if(Y&&Y.isTexture){let X=Y.mapping;if(X===303||X===304)if($.has(Y)){let q=$.get(Y).texture;return Z(q,Y.mapping)}else{let q=Y.image;if(q&&q.height>0){let H=new w6(q.height/2);return H.fromEquirectangularTexture(J,Y),$.set(Y,H),Y.addEventListener("dispose",W),Z(H.texture,Y.mapping)}else return null}}return Y}function W(Y){let X=Y.target;X.removeEventListener("dispose",W);let q=$.get(X);if(q!==void 0)$.delete(X),q.dispose()}function K(){$=new WeakMap}return{get:Q,dispose:K}}class HQ extends YQ{constructor(J=-1,$=1,Z=1,Q=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Z,this.bottom=Q,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Z,Q,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Z,this.view.offsetY=Q,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Z=(this.right+this.left)/2,Q=(this.top+this.bottom)/2,W=Z-J,K=Z+J,Y=Q+$,X=Q-$;if(this.view!==null&&this.view.enabled){let q=(this.right-this.left)/this.view.fullWidth/this.zoom,H=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=q*this.view.offsetX,K=W+q*this.view.width,Y-=H*this.view.offsetY,X=Y-H*this.view.height}this.projectionMatrix.makeOrthographic(W,K,Y,X,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}var t8=4,m5=[0.125,0.215,0.35,0.446,0.526,0.582],N8=20,vZ=new HQ,u5=new a0,gZ=null,mZ=0,uZ=0,O8=(1+Math.sqrt(5))/2,s8=1/O8,d5=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,O8,s8),new T(0,O8,-s8),new T(s8,0,O8),new T(-s8,0,O8),new T(O8,s8,0),new T(-O8,s8,0)];class aZ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(J,$=0,Z=0.1,Q=100){gZ=this._renderer.getRenderTarget(),mZ=this._renderer.getActiveCubeFace(),uZ=this._renderer.getActiveMipmapLevel(),this._setSize(256);let W=this._allocateTargets();if(W.depthBuffer=!0,this._sceneToCubeUV(J,Z,Q,W),$>0)this._blur(W,0,0,$);return this._applyPMREM(W),this._cleanup(W),W}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=c5(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=l5(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodPlanes.length;J++)this._lodPlanes[J].dispose()}_cleanup(J){this._renderer.setRenderTarget(gZ,mZ,uZ),J.scissorTest=!1,S$(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===301||J.mapping===302)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);gZ=this._renderer.getRenderTarget(),mZ=this._renderer.getActiveCubeFace(),uZ=this._renderer.getActiveMipmapLevel();let Z=$||this._allocateTargets();return this._textureToCubeUV(J,Z),this._applyPMREM(Z),this._cleanup(Z),Z}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Z={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:"srgb-linear",depthBuffer:!1},Q=p5(J,$,Z);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=p5(J,$,Z);let{_lodMax:W}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=i1(W)),this._blurMaterial=r1(W,J,$)}return Q}_compileMaterial(J){let $=new b(this._lodPlanes[0],J);this._renderer.compile($,vZ)}_sceneToCubeUV(J,$,Z,Q){let Y=new d9(90,1,$,Z),X=[1,-1,1,1,1,1],q=[1,1,1,-1,-1,-1],H=this._renderer,U=H.autoClear,G=H.toneMapping;H.getClearColor(u5),H.toneMapping=0,H.autoClear=!1;let F=new k9({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),D=new b(new X0,F),O=!1,E=J.background;if(E){if(E.isColor)F.color.copy(E),J.background=null,O=!0}else F.color.copy(u5),O=!0;for(let V=0;V<6;V++){let R=V%3;if(R===0)Y.up.set(0,X[V],0),Y.lookAt(q[V],0,0);else if(R===1)Y.up.set(0,0,X[V]),Y.lookAt(0,q[V],0);else Y.up.set(0,X[V],0),Y.lookAt(0,0,q[V]);let N=this._cubeSize;if(S$(Q,R*N,V>2?N:0,N,N),H.setRenderTarget(Q),O)H.render(D,Y);H.render(J,Y)}D.geometry.dispose(),D.material.dispose(),H.toneMapping=G,H.autoClear=U,J.background=E}_textureToCubeUV(J,$){let Z=this._renderer,Q=J.mapping===301||J.mapping===302;if(Q){if(this._cubemapMaterial===null)this._cubemapMaterial=c5();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=l5();let W=Q?this._cubemapMaterial:this._equirectMaterial,K=new b(this._lodPlanes[0],W),Y=W.uniforms;Y.envMap.value=J;let X=this._cubeSize;S$($,0,0,3*X,2*X),Z.setRenderTarget($),Z.render(K,vZ)}_applyPMREM(J){let $=this._renderer,Z=$.autoClear;$.autoClear=!1;for(let Q=1;Q<this._lodPlanes.length;Q++){let W=Math.sqrt(this._sigmas[Q]*this._sigmas[Q]-this._sigmas[Q-1]*this._sigmas[Q-1]),K=d5[(Q-1)%d5.length];this._blur(J,Q-1,Q,W,K)}$.autoClear=Z}_blur(J,$,Z,Q,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,$,Z,Q,"latitudinal",W),this._halfBlur(K,J,Z,Z,Q,"longitudinal",W)}_halfBlur(J,$,Z,Q,W,K,Y){let X=this._renderer,q=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let H=3,U=new b(this._lodPlanes[Q],q),G=q.uniforms,F=this._sizeLods[Z]-1,D=isFinite(W)?Math.PI/(2*F):2*Math.PI/(2*N8-1),O=W/D,E=isFinite(W)?1+Math.floor(H*O):N8;if(E>N8)console.warn(`sigmaRadians, ${W}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${N8}`);let V=[],R=0;for(let M=0;M<N8;++M){let A=M/O,_=Math.exp(-A*A/2);if(V.push(_),M===0)R+=_;else if(M<E)R+=2*_}for(let M=0;M<V.length;M++)V[M]=V[M]/R;if(G.envMap.value=J.texture,G.samples.value=E,G.weights.value=V,G.latitudinal.value=K==="latitudinal",Y)G.poleAxis.value=Y;let{_lodMax:N}=this;G.dTheta.value=D,G.mipInt.value=N-Z;let B=this._sizeLods[Q],I=3*B*(Q>N-t8?Q-N+t8:0),L=4*(this._cubeSize-B);S$($,I,L,3*B,2*B),X.setRenderTarget($),X.render(U,vZ)}}function i1(J){let $=[],Z=[],Q=[],W=J,K=J-t8+1+m5.length;for(let Y=0;Y<K;Y++){let X=Math.pow(2,W);Z.push(X);let q=1/X;if(Y>J-t8)q=m5[Y-J+t8-1];else if(Y===0)q=0;Q.push(q);let H=1/(X-2),U=-H,G=1+H,F=[U,U,G,U,G,G,U,U,G,G,U,G],D=6,O=6,E=3,V=2,R=1,N=new Float32Array(E*O*D),B=new Float32Array(V*O*D),I=new Float32Array(R*O*D);for(let M=0;M<D;M++){let A=M%3*2/3-1,_=M>2?0:-1,z=[A,_,0,A+0.6666666666666666,_,0,A+0.6666666666666666,_+1,0,A,_,0,A+0.6666666666666666,_+1,0,A,_+1,0];N.set(z,E*O*M),B.set(F,V*O*M);let k=[M,M,M,M,M,M];I.set(k,R*O*M)}let L=new R9;if(L.setAttribute("position",new y9(N,E)),L.setAttribute("uv",new y9(B,V)),L.setAttribute("faceIndex",new y9(I,R)),$.push(L),W>t8)W--}return{lodPlanes:$,sizeLods:Z,sigmas:Q}}function p5(J,$,Z){let Q=new eJ(J,$,Z);return Q.texture.mapping=306,Q.texture.name="PMREM.cubeUv",Q.scissorTest=!0,Q}function S$(J,$,Z,Q,W){J.viewport.set($,Z,Q,W),J.scissor.set($,Z,Q,W)}function r1(J,$,Z){let Q=new Float32Array(N8),W=new T(0,1,0);return new J8({name:"SphericalGaussianBlur",defines:{n:N8,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Z,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Q},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:UQ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function l5(){return new J8({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:UQ(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function c5(){return new J8({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:UQ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function UQ(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function a1(J){let $=new WeakMap,Z=null;function Q(X){if(X&&X.isTexture){let q=X.mapping,H=q===303||q===304,U=q===301||q===302;if(H||U)if(X.isRenderTargetTexture&&X.needsPMREMUpdate===!0){X.needsPMREMUpdate=!1;let G=$.get(X);if(Z===null)Z=new aZ(J);return G=H?Z.fromEquirectangular(X,G):Z.fromCubemap(X,G),$.set(X,G),G.texture}else if($.has(X))return $.get(X).texture;else{let G=X.image;if(H&&G&&G.height>0||U&&G&&W(G)){if(Z===null)Z=new aZ(J);let F=H?Z.fromEquirectangular(X):Z.fromCubemap(X);return $.set(X,F),X.addEventListener("dispose",K),F.texture}else return null}}return X}function W(X){let q=0,H=6;for(let U=0;U<H;U++)if(X[U]!==void 0)q++;return q===H}function K(X){let q=X.target;q.removeEventListener("dispose",K);let H=$.get(q);if(H!==void 0)$.delete(q),H.dispose()}function Y(){if($=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:Q,dispose:Y}}function t1(J){let $={};function Z(Q){if($[Q]!==void 0)return $[Q];let W;switch(Q){case"WEBGL_depth_texture":W=J.getExtension("WEBGL_depth_texture")||J.getExtension("MOZ_WEBGL_depth_texture")||J.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":W=J.getExtension("EXT_texture_filter_anisotropic")||J.getExtension("MOZ_EXT_texture_filter_anisotropic")||J.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":W=J.getExtension("WEBGL_compressed_texture_s3tc")||J.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":W=J.getExtension("WEBGL_compressed_texture_pvrtc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:W=J.getExtension(Q)}return $[Q]=W,W}return{has:function(Q){return Z(Q)!==null},init:function(Q){if(Q.isWebGL2)Z("EXT_color_buffer_float"),Z("WEBGL_clip_cull_distance");else Z("WEBGL_depth_texture"),Z("OES_texture_float"),Z("OES_texture_half_float"),Z("OES_texture_half_float_linear"),Z("OES_standard_derivatives"),Z("OES_element_index_uint"),Z("OES_vertex_array_object"),Z("ANGLE_instanced_arrays");Z("OES_texture_float_linear"),Z("EXT_color_buffer_half_float"),Z("WEBGL_multisampled_render_to_texture")},get:function(Q){let W=Z(Q);if(W===null)console.warn("THREE.WebGLRenderer: "+Q+" extension not supported.");return W}}}function e1(J,$,Z,Q){let W={},K=new WeakMap;function Y(G){let F=G.target;if(F.index!==null)$.remove(F.index);for(let O in F.attributes)$.remove(F.attributes[O]);for(let O in F.morphAttributes){let E=F.morphAttributes[O];for(let V=0,R=E.length;V<R;V++)$.remove(E[V])}F.removeEventListener("dispose",Y),delete W[F.id];let D=K.get(F);if(D)$.remove(D),K.delete(F);if(Q.releaseStatesOfGeometry(F),F.isInstancedBufferGeometry===!0)delete F._maxInstanceCount;Z.memory.geometries--}function X(G,F){if(W[F.id]===!0)return F;return F.addEventListener("dispose",Y),W[F.id]=!0,Z.memory.geometries++,F}function q(G){let F=G.attributes;for(let O in F)$.update(F[O],J.ARRAY_BUFFER);let D=G.morphAttributes;for(let O in D){let E=D[O];for(let V=0,R=E.length;V<R;V++)$.update(E[V],J.ARRAY_BUFFER)}}function H(G){let F=[],D=G.index,O=G.attributes.position,E=0;if(D!==null){let N=D.array;E=D.version;for(let B=0,I=N.length;B<I;B+=3){let L=N[B+0],M=N[B+1],A=N[B+2];F.push(L,M,M,A,A,L)}}else if(O!==void 0){let N=O.array;E=O.version;for(let B=0,I=N.length/3-1;B<I;B+=3){let L=B+0,M=B+1,A=B+2;F.push(L,M,M,A,A,L)}}else return;let V=new((M6(F))?XQ:KQ)(F,1);V.version=E;let R=K.get(G);if(R)$.remove(R);K.set(G,V)}function U(G){let F=K.get(G);if(F){let D=G.index;if(D!==null){if(F.version<D.version)H(G)}}else H(G);return K.get(G)}return{get:X,update:q,getWireframeAttribute:U}}function Jq(J,$,Z,Q){let W=Q.isWebGL2,K;function Y(D){K=D}let X,q;function H(D){X=D.type,q=D.bytesPerElement}function U(D,O){J.drawElements(K,O,X,D*q),Z.update(O,K,1)}function G(D,O,E){if(E===0)return;let V,R;if(W)V=J,R="drawElementsInstanced";else if(V=$.get("ANGLE_instanced_arrays"),R="drawElementsInstancedANGLE",V===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}V[R](K,O,X,D*q,E),Z.update(O,K,E)}function F(D,O,E){if(E===0)return;let V=$.get("WEBGL_multi_draw");if(V===null)for(let R=0;R<E;R++)this.render(D[R]/q,O[R]);else{V.multiDrawElementsWEBGL(K,O,0,X,D,0,E);let R=0;for(let N=0;N<E;N++)R+=O[N];Z.update(R,K,1)}}this.setMode=Y,this.setIndex=H,this.render=U,this.renderInstances=G,this.renderMultiDraw=F}function $q(J){let $={geometries:0,textures:0},Z={frame:0,calls:0,triangles:0,points:0,lines:0};function Q(K,Y,X){switch(Z.calls++,Y){case J.TRIANGLES:Z.triangles+=X*(K/3);break;case J.LINES:Z.lines+=X*(K/2);break;case J.LINE_STRIP:Z.lines+=X*(K-1);break;case J.LINE_LOOP:Z.lines+=X*K;break;case J.POINTS:Z.points+=X*K;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",Y);break}}function W(){Z.calls=0,Z.triangles=0,Z.points=0,Z.lines=0}return{memory:$,render:Z,programs:null,autoReset:!0,reset:W,update:Q}}function Zq(J,$){return J[0]-$[0]}function Qq(J,$){return Math.abs($[1])-Math.abs(J[1])}function Wq(J,$,Z){let Q={},W=new Float32Array(8),K=new WeakMap,Y=new H9,X=[];for(let H=0;H<8;H++)X[H]=[H,0];function q(H,U,G){let F=H.morphTargetInfluences;if($.isWebGL2===!0){let D=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,O=D!==void 0?D.length:0,E=K.get(U);if(E===void 0||E.count!==O){let j=function(){o.dispose(),K.delete(U),U.removeEventListener("dispose",j)};if(E!==void 0)E.texture.dispose();let N=U.morphAttributes.position!==void 0,B=U.morphAttributes.normal!==void 0,I=U.morphAttributes.color!==void 0,L=U.morphAttributes.position||[],M=U.morphAttributes.normal||[],A=U.morphAttributes.color||[],_=0;if(N===!0)_=1;if(B===!0)_=2;if(I===!0)_=3;let z=U.attributes.position.count*_,k=1;if(z>$.maxTextureSize)k=Math.ceil(z/$.maxTextureSize),z=$.maxTextureSize;let y=new Float32Array(z*k*4*O),o=new WQ(y,z,k,O);o.type=1015,o.needsUpdate=!0;let t=_*4;for(let m=0;m<O;m++){let d=L[m],i=M[m],n=A[m],h=z*k*4*m;for(let l=0;l<d.count;l++){let r=l*t;if(N===!0)Y.fromBufferAttribute(d,l),y[h+r+0]=Y.x,y[h+r+1]=Y.y,y[h+r+2]=Y.z,y[h+r+3]=0;if(B===!0)Y.fromBufferAttribute(i,l),y[h+r+4]=Y.x,y[h+r+5]=Y.y,y[h+r+6]=Y.z,y[h+r+7]=0;if(I===!0)Y.fromBufferAttribute(n,l),y[h+r+8]=Y.x,y[h+r+9]=Y.y,y[h+r+10]=Y.z,y[h+r+11]=n.itemSize===4?Y.w:1}}E={count:O,texture:o,size:new U0(z,k)},K.set(U,E),U.addEventListener("dispose",j)}let V=0;for(let N=0;N<F.length;N++)V+=F[N];let R=U.morphTargetsRelative?1:1-V;G.getUniforms().setValue(J,"morphTargetBaseInfluence",R),G.getUniforms().setValue(J,"morphTargetInfluences",F),G.getUniforms().setValue(J,"morphTargetsTexture",E.texture,Z),G.getUniforms().setValue(J,"morphTargetsTextureSize",E.size)}else{let D=F===void 0?0:F.length,O=Q[U.id];if(O===void 0||O.length!==D){O=[];for(let B=0;B<D;B++)O[B]=[B,0];Q[U.id]=O}for(let B=0;B<D;B++){let I=O[B];I[0]=B,I[1]=F[B]}O.sort(Qq);for(let B=0;B<8;B++)if(B<D&&O[B][1])X[B][0]=O[B][0],X[B][1]=O[B][1];else X[B][0]=Number.MAX_SAFE_INTEGER,X[B][1]=0;X.sort(Zq);let E=U.morphAttributes.position,V=U.morphAttributes.normal,R=0;for(let B=0;B<8;B++){let I=X[B],L=I[0],M=I[1];if(L!==Number.MAX_SAFE_INTEGER&&M){if(E&&U.getAttribute("morphTarget"+B)!==E[L])U.setAttribute("morphTarget"+B,E[L]);if(V&&U.getAttribute("morphNormal"+B)!==V[L])U.setAttribute("morphNormal"+B,V[L]);W[B]=M,R+=M}else{if(E&&U.hasAttribute("morphTarget"+B)===!0)U.deleteAttribute("morphTarget"+B);if(V&&U.hasAttribute("morphNormal"+B)===!0)U.deleteAttribute("morphNormal"+B);W[B]=0}}let N=U.morphTargetsRelative?1:1-R;G.getUniforms().setValue(J,"morphTargetBaseInfluence",N),G.getUniforms().setValue(J,"morphTargetInfluences",W)}}return{update:q}}function Kq(J,$,Z,Q){let W=new WeakMap;function K(q){let H=Q.render.frame,U=q.geometry,G=$.get(q,U);if(W.get(G)!==H)$.update(G),W.set(G,H);if(q.isInstancedMesh){if(q.hasEventListener("dispose",X)===!1)q.addEventListener("dispose",X);if(W.get(q)!==H){if(Z.update(q.instanceMatrix,J.ARRAY_BUFFER),q.instanceColor!==null)Z.update(q.instanceColor,J.ARRAY_BUFFER);W.set(q,H)}}if(q.isSkinnedMesh){let F=q.skeleton;if(W.get(F)!==H)F.update(),W.set(F,H)}return G}function Y(){W=new WeakMap}function X(q){let H=q.target;if(H.removeEventListener("dispose",X),Z.remove(H.instanceMatrix),H.instanceColor!==null)Z.remove(H.instanceColor)}return{update:K,dispose:Y}}class GQ extends r9{constructor(J,$,Z,Q,W,K,Y,X,q,H){if(H=H!==void 0?H:1026,H!==1026&&H!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(Z===void 0&&H===1026)Z=1014;if(Z===void 0&&H===1027)Z=1020;super(null,Q,W,K,Y,X,H,Z,q);this.isDepthTexture=!0,this.image={width:J,height:$},this.magFilter=Y!==void 0?Y:1003,this.minFilter=X!==void 0?X:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);if(this.compareFunction!==null)$.compareFunction=this.compareFunction;return $}}var _6=new r9,j6=new GQ(1,1);j6.compareFunction=515;var b6=new WQ,x6=new A6,y6=new qQ,n5=[],s5=[],o5=new Float32Array(16),i5=new Float32Array(9),r5=new Float32Array(4);function K7(J,$,Z){let Q=J[0];if(Q<=0||Q>0)return J;let W=$*Z,K=n5[W];if(K===void 0)K=new Float32Array(W),n5[W]=K;if($!==0){Q.toArray(K,0);for(let Y=1,X=0;Y!==$;++Y)X+=Z,J[Y].toArray(K,X)}return K}function w9(J,$){if(J.length!==$.length)return!1;for(let Z=0,Q=J.length;Z<Q;Z++)if(J[Z]!==$[Z])return!1;return!0}function T9(J,$){for(let Z=0,Q=$.length;Z<Q;Z++)J[Z]=$[Z]}function c$(J,$){let Z=s5[$];if(Z===void 0)Z=new Int32Array($),s5[$]=Z;for(let Q=0;Q!==$;++Q)Z[Q]=J.allocateTextureUnit();return Z}function Xq(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1f(this.addr,$),Z[0]=$}function Yq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(w9(Z,$))return;J.uniform2fv(this.addr,$),T9(Z,$)}}function qq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else if($.r!==void 0){if(Z[0]!==$.r||Z[1]!==$.g||Z[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Z[0]=$.r,Z[1]=$.g,Z[2]=$.b}else{if(w9(Z,$))return;J.uniform3fv(this.addr,$),T9(Z,$)}}function Hq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(w9(Z,$))return;J.uniform4fv(this.addr,$),T9(Z,$)}}function Uq(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(w9(Z,$))return;J.uniformMatrix2fv(this.addr,!1,$),T9(Z,$)}else{if(w9(Z,Q))return;r5.set(Q),J.uniformMatrix2fv(this.addr,!1,r5),T9(Z,Q)}}function Gq(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(w9(Z,$))return;J.uniformMatrix3fv(this.addr,!1,$),T9(Z,$)}else{if(w9(Z,Q))return;i5.set(Q),J.uniformMatrix3fv(this.addr,!1,i5),T9(Z,Q)}}function Fq(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(w9(Z,$))return;J.uniformMatrix4fv(this.addr,!1,$),T9(Z,$)}else{if(w9(Z,Q))return;o5.set(Q),J.uniformMatrix4fv(this.addr,!1,o5),T9(Z,Q)}}function Vq(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1i(this.addr,$),Z[0]=$}function Rq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(w9(Z,$))return;J.uniform2iv(this.addr,$),T9(Z,$)}}function Dq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else{if(w9(Z,$))return;J.uniform3iv(this.addr,$),T9(Z,$)}}function Eq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(w9(Z,$))return;J.uniform4iv(this.addr,$),T9(Z,$)}}function Oq(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1ui(this.addr,$),Z[0]=$}function Nq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(w9(Z,$))return;J.uniform2uiv(this.addr,$),T9(Z,$)}}function Bq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else{if(w9(Z,$))return;J.uniform3uiv(this.addr,$),T9(Z,$)}}function zq(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(w9(Z,$))return;J.uniform4uiv(this.addr,$),T9(Z,$)}}function Iq(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;let K=this.type===J.SAMPLER_2D_SHADOW?j6:_6;Z.setTexture2D($||K,W)}function Lq(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;Z.setTexture3D($||x6,W)}function Mq(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;Z.setTextureCube($||y6,W)}function Cq(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;Z.setTexture2DArray($||b6,W)}function Aq(J){switch(J){case 5126:return Xq;case 35664:return Yq;case 35665:return qq;case 35666:return Hq;case 35674:return Uq;case 35675:return Gq;case 35676:return Fq;case 5124:case 35670:return Vq;case 35667:case 35671:return Rq;case 35668:case 35672:return Dq;case 35669:case 35673:return Eq;case 5125:return Oq;case 36294:return Nq;case 36295:return Bq;case 36296:return zq;case 35678:case 36198:case 36298:case 36306:case 35682:return Iq;case 35679:case 36299:case 36307:return Lq;case 35680:case 36300:case 36308:case 36293:return Mq;case 36289:case 36303:case 36311:case 36292:return Cq}}function kq(J,$){J.uniform1fv(this.addr,$)}function Pq(J,$){let Z=K7($,this.size,2);J.uniform2fv(this.addr,Z)}function Sq(J,$){let Z=K7($,this.size,3);J.uniform3fv(this.addr,Z)}function wq(J,$){let Z=K7($,this.size,4);J.uniform4fv(this.addr,Z)}function Tq(J,$){let Z=K7($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Z)}function _q(J,$){let Z=K7($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Z)}function jq(J,$){let Z=K7($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Z)}function bq(J,$){J.uniform1iv(this.addr,$)}function xq(J,$){J.uniform2iv(this.addr,$)}function yq(J,$){J.uniform3iv(this.addr,$)}function fq(J,$){J.uniform4iv(this.addr,$)}function hq(J,$){J.uniform1uiv(this.addr,$)}function vq(J,$){J.uniform2uiv(this.addr,$)}function gq(J,$){J.uniform3uiv(this.addr,$)}function mq(J,$){J.uniform4uiv(this.addr,$)}function uq(J,$,Z){let Q=this.cache,W=$.length,K=c$(Z,W);if(!w9(Q,K))J.uniform1iv(this.addr,K),T9(Q,K);for(let Y=0;Y!==W;++Y)Z.setTexture2D($[Y]||_6,K[Y])}function dq(J,$,Z){let Q=this.cache,W=$.length,K=c$(Z,W);if(!w9(Q,K))J.uniform1iv(this.addr,K),T9(Q,K);for(let Y=0;Y!==W;++Y)Z.setTexture3D($[Y]||x6,K[Y])}function pq(J,$,Z){let Q=this.cache,W=$.length,K=c$(Z,W);if(!w9(Q,K))J.uniform1iv(this.addr,K),T9(Q,K);for(let Y=0;Y!==W;++Y)Z.setTextureCube($[Y]||y6,K[Y])}function lq(J,$,Z){let Q=this.cache,W=$.length,K=c$(Z,W);if(!w9(Q,K))J.uniform1iv(this.addr,K),T9(Q,K);for(let Y=0;Y!==W;++Y)Z.setTexture2DArray($[Y]||b6,K[Y])}function cq(J){switch(J){case 5126:return kq;case 35664:return Pq;case 35665:return Sq;case 35666:return wq;case 35674:return Tq;case 35675:return _q;case 35676:return jq;case 5124:case 35670:return bq;case 35667:case 35671:return xq;case 35668:case 35672:return yq;case 35669:case 35673:return fq;case 5125:return hq;case 36294:return vq;case 36295:return gq;case 36296:return mq;case 35678:case 36198:case 36298:case 36306:case 35682:return uq;case 35679:case 36299:case 36307:return dq;case 35680:case 36300:case 36308:case 36293:return pq;case 36289:case 36303:case 36311:case 36292:return lq}}class f6{constructor(J,$,Z){this.id=J,this.addr=Z,this.cache=[],this.type=$.type,this.setValue=Aq($.type)}}class h6{constructor(J,$,Z){this.id=J,this.addr=Z,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=cq($.type)}}class v6{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Z){let Q=this.seq;for(let W=0,K=Q.length;W!==K;++W){let Y=Q[W];Y.setValue(J,$[Y.id],Z)}}}var dZ=/(\w+)(\])?(\[|\.)?/g;function a5(J,$){J.seq.push($),J.map[$.id]=$}function nq(J,$,Z){let Q=J.name,W=Q.length;dZ.lastIndex=0;while(!0){let K=dZ.exec(Q),Y=dZ.lastIndex,X=K[1],q=K[2]==="]",H=K[3];if(q)X=X|0;if(H===void 0||H==="["&&Y+2===W){a5(Z,H===void 0?new f6(X,J,$):new h6(X,J,$));break}else{let G=Z.map[X];if(G===void 0)G=new v6(X),a5(Z,G);Z=G}}}class b7{constructor(J,$){this.seq=[],this.map={};let Z=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let Q=0;Q<Z;++Q){let W=J.getActiveUniform($,Q),K=J.getUniformLocation($,W.name);nq(W,K,this)}}setValue(J,$,Z,Q){let W=this.map[$];if(W!==void 0)W.setValue(J,Z,Q)}setOptional(J,$,Z){let Q=$[Z];if(Q!==void 0)this.setValue(J,Z,Q)}static upload(J,$,Z,Q){for(let W=0,K=$.length;W!==K;++W){let Y=$[W],X=Z[Y.id];if(X.needsUpdate!==!1)Y.setValue(J,X.value,Q)}}static seqWithValue(J,$){let Z=[];for(let Q=0,W=J.length;Q!==W;++Q){let K=J[Q];if(K.id in $)Z.push(K)}return Z}}function t5(J,$,Z){let Q=J.createShader($);return J.shaderSource(Q,Z),J.compileShader(Q),Q}var sq=37297,oq=0;function iq(J,$){let Z=J.split(`
`),Q=[],W=Math.max($-6,0),K=Math.min($+6,Z.length);for(let Y=W;Y<K;Y++){let X=Y+1;Q.push(`${X===$?">":" "} ${X}: ${Z[Y]}`)}return Q.join(`
`)}function rq(J){let $=W9.getPrimaries(W9.workingColorSpace),Z=W9.getPrimaries(J),Q;if($===Z)Q="";else if($==="p3"&&Z==="rec709")Q="LinearDisplayP3ToLinearSRGB";else if($==="rec709"&&Z==="p3")Q="LinearSRGBToLinearDisplayP3";switch(J){case"srgb-linear":case"display-p3-linear":return[Q,"LinearTransferOETF"];case"srgb":case"display-p3":return[Q,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",J),[Q,"LinearTransferOETF"]}}function e5(J,$,Z){let Q=J.getShaderParameter($,J.COMPILE_STATUS),W=J.getShaderInfoLog($).trim();if(Q&&W==="")return"";let K=/ERROR: 0:(\d+)/.exec(W);if(K){let Y=parseInt(K[1]);return Z.toUpperCase()+`

`+W+`

`+iq(J.getShaderSource($),Y)}else return W}function aq(J,$){let Z=rq($);return`vec4 ${J}( vec4 value ) { return ${Z[0]}( ${Z[1]}( value ) ); }`}function tq(J,$){let Z;switch($){case 1:Z="Linear";break;case 2:Z="Reinhard";break;case 3:Z="OptimizedCineon";break;case 4:Z="ACESFilmic";break;case 6:Z="AgX";break;case 5:Z="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",$),Z="Linear"}return"vec3 "+J+"( vec3 color ) { return "+Z+"ToneMapping( color ); }"}function eq(J){return[J.extensionDerivatives||!!J.envMapCubeUVHeight||J.bumpMap||J.normalMapTangentSpace||J.clearcoatNormalMap||J.flatShading||J.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(J.extensionFragDepth||J.logarithmicDepthBuffer)&&J.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",J.extensionDrawBuffers&&J.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(J.extensionShaderTextureLOD||J.envMap||J.transmission)&&J.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(e8).join(`
`)}function JH(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(e8).join(`
`)}function $H(J){let $=[];for(let Z in J){let Q=J[Z];if(Q===!1)continue;$.push("#define "+Z+" "+Q)}return $.join(`
`)}function ZH(J,$){let Z={},Q=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Q;W++){let K=J.getActiveAttrib($,W),Y=K.name,X=1;if(K.type===J.FLOAT_MAT2)X=2;if(K.type===J.FLOAT_MAT3)X=3;if(K.type===J.FLOAT_MAT4)X=4;Z[Y]={type:K.type,location:J.getAttribLocation($,Y),locationSize:X}}return Z}function e8(J){return J!==""}function J6(J,$){let Z=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Z).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function $6(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var QH=/^[ \t]*#include +<([\w\d./]+)>/gm;function tZ(J){return J.replace(QH,KH)}var WH=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function KH(J,$){let Z=d0[$];if(Z===void 0){let Q=WH.get($);if(Q!==void 0)Z=d0[Q],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,Q);else throw Error("Can not resolve #include <"+$+">")}return tZ(Z)}var XH=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Z6(J){return J.replace(XH,YH)}function YH(J,$,Z,Q){let W="";for(let K=parseInt($);K<parseInt(Z);K++)W+=Q.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function Q6(J){let $="precision "+J.precision+` float;
precision `+J.precision+" int;";if(J.precision==="highp")$+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")$+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")$+=`
#define LOW_PRECISION`;return $}function qH(J){let $="SHADOWMAP_TYPE_BASIC";if(J.shadowMapType===1)$="SHADOWMAP_TYPE_PCF";else if(J.shadowMapType===2)$="SHADOWMAP_TYPE_PCF_SOFT";else if(J.shadowMapType===3)$="SHADOWMAP_TYPE_VSM";return $}function HH(J){let $="ENVMAP_TYPE_CUBE";if(J.envMap)switch(J.envMapMode){case 301:case 302:$="ENVMAP_TYPE_CUBE";break;case 306:$="ENVMAP_TYPE_CUBE_UV";break}return $}function UH(J){let $="ENVMAP_MODE_REFLECTION";if(J.envMap)switch(J.envMapMode){case 302:$="ENVMAP_MODE_REFRACTION";break}return $}function GH(J){let $="ENVMAP_BLENDING_NONE";if(J.envMap)switch(J.combine){case 0:$="ENVMAP_BLENDING_MULTIPLY";break;case 1:$="ENVMAP_BLENDING_MIX";break;case 2:$="ENVMAP_BLENDING_ADD";break}return $}function FH(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Z=Math.log2($)-2,Q=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:Q,maxMip:Z}}function VH(J,$,Z,Q){let W=J.getContext(),K=Z.defines,Y=Z.vertexShader,X=Z.fragmentShader,q=qH(Z),H=HH(Z),U=UH(Z),G=GH(Z),F=FH(Z),D=Z.isWebGL2?"":eq(Z),O=JH(Z),E=$H(K),V=W.createProgram(),R,N,B=Z.glslVersion?"#version "+Z.glslVersion+`
`:"";if(Z.isRawShaderMaterial){if(R=["#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E].filter(e8).join(`
`),R.length>0)R+=`
`;if(N=[D,"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E].filter(e8).join(`
`),N.length>0)N+=`
`}else R=[Q6(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E,Z.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Z.batching?"#define USE_BATCHING":"",Z.instancing?"#define USE_INSTANCING":"",Z.instancingColor?"#define USE_INSTANCING_COLOR":"",Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+U:"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.displacementMap?"#define USE_DISPLACEMENTMAP":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.mapUv?"#define MAP_UV "+Z.mapUv:"",Z.alphaMapUv?"#define ALPHAMAP_UV "+Z.alphaMapUv:"",Z.lightMapUv?"#define LIGHTMAP_UV "+Z.lightMapUv:"",Z.aoMapUv?"#define AOMAP_UV "+Z.aoMapUv:"",Z.emissiveMapUv?"#define EMISSIVEMAP_UV "+Z.emissiveMapUv:"",Z.bumpMapUv?"#define BUMPMAP_UV "+Z.bumpMapUv:"",Z.normalMapUv?"#define NORMALMAP_UV "+Z.normalMapUv:"",Z.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Z.displacementMapUv:"",Z.metalnessMapUv?"#define METALNESSMAP_UV "+Z.metalnessMapUv:"",Z.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Z.roughnessMapUv:"",Z.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Z.anisotropyMapUv:"",Z.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Z.clearcoatMapUv:"",Z.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Z.clearcoatNormalMapUv:"",Z.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Z.clearcoatRoughnessMapUv:"",Z.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Z.iridescenceMapUv:"",Z.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Z.iridescenceThicknessMapUv:"",Z.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Z.sheenColorMapUv:"",Z.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Z.sheenRoughnessMapUv:"",Z.specularMapUv?"#define SPECULARMAP_UV "+Z.specularMapUv:"",Z.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Z.specularColorMapUv:"",Z.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Z.specularIntensityMapUv:"",Z.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Z.transmissionMapUv:"",Z.thicknessMapUv?"#define THICKNESSMAP_UV "+Z.thicknessMapUv:"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.flatShading?"#define FLAT_SHADED":"",Z.skinning?"#define USE_SKINNING":"",Z.morphTargets?"#define USE_MORPHTARGETS":"",Z.morphNormals&&Z.flatShading===!1?"#define USE_MORPHNORMALS":"",Z.morphColors&&Z.isWebGL2?"#define USE_MORPHCOLORS":"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+Z.morphTextureStride:"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_COUNT "+Z.morphTargetsCount:"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+q:"",Z.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.useLegacyLights?"#define LEGACY_LIGHTS":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.logarithmicDepthBuffer&&Z.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(e8).join(`
`),N=[D,Q6(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E,Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.matcap?"#define USE_MATCAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+H:"",Z.envMap?"#define "+U:"",Z.envMap?"#define "+G:"",F?"#define CUBEUV_TEXEL_WIDTH "+F.texelWidth:"",F?"#define CUBEUV_TEXEL_HEIGHT "+F.texelHeight:"",F?"#define CUBEUV_MAX_MIP "+F.maxMip+".0":"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoat?"#define USE_CLEARCOAT":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescence?"#define USE_IRIDESCENCE":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaTest?"#define USE_ALPHATEST":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.sheen?"#define USE_SHEEN":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors||Z.instancingColor?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.gradientMap?"#define USE_GRADIENTMAP":"",Z.flatShading?"#define FLAT_SHADED":"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+q:"",Z.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.useLegacyLights?"#define LEGACY_LIGHTS":"",Z.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.logarithmicDepthBuffer&&Z.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Z.toneMapping!==0?"#define TONE_MAPPING":"",Z.toneMapping!==0?d0.tonemapping_pars_fragment:"",Z.toneMapping!==0?tq("toneMapping",Z.toneMapping):"",Z.dithering?"#define DITHERING":"",Z.opaque?"#define OPAQUE":"",d0.colorspace_pars_fragment,aq("linearToOutputTexel",Z.outputColorSpace),Z.useDepthPacking?"#define DEPTH_PACKING "+Z.depthPacking:"",`
`].filter(e8).join(`
`);if(Y=tZ(Y),Y=J6(Y,Z),Y=$6(Y,Z),X=tZ(X),X=J6(X,Z),X=$6(X,Z),Y=Z6(Y),X=Z6(X),Z.isWebGL2&&Z.isRawShaderMaterial!==!0)B=`#version 300 es
`,R=[O,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+R,N=["precision mediump sampler2DArray;","#define varying in",Z.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",Z.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+N;let I=B+R+Y,L=B+N+X,M=t5(W,W.VERTEX_SHADER,I),A=t5(W,W.FRAGMENT_SHADER,L);if(W.attachShader(V,M),W.attachShader(V,A),Z.index0AttributeName!==void 0)W.bindAttribLocation(V,0,Z.index0AttributeName);else if(Z.morphTargets===!0)W.bindAttribLocation(V,0,"position");W.linkProgram(V);function _(o){if(J.debug.checkShaderErrors){let t=W.getProgramInfoLog(V).trim(),j=W.getShaderInfoLog(M).trim(),m=W.getShaderInfoLog(A).trim(),d=!0,i=!0;if(W.getProgramParameter(V,W.LINK_STATUS)===!1)if(d=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,V,M,A);else{let n=e5(W,M,"vertex"),h=e5(W,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(V,W.VALIDATE_STATUS)+`

Program Info Log: `+t+`
`+n+`
`+h)}else if(t!=="")console.warn("THREE.WebGLProgram: Program Info Log:",t);else if(j===""||m==="")i=!1;if(i)o.diagnostics={runnable:d,programLog:t,vertexShader:{log:j,prefix:R},fragmentShader:{log:m,prefix:N}}}W.deleteShader(M),W.deleteShader(A),z=new b7(W,V),k=ZH(W,V)}let z;this.getUniforms=function(){if(z===void 0)_(this);return z};let k;this.getAttributes=function(){if(k===void 0)_(this);return k};let y=Z.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(y===!1)y=W.getProgramParameter(V,sq);return y},this.destroy=function(){Q.releaseStatesOfProgram(this),W.deleteProgram(V),this.program=void 0},this.type=Z.shaderType,this.name=Z.shaderName,this.id=oq++,this.cacheKey=$,this.usedTimes=1,this.program=V,this.vertexShader=M,this.fragmentShader=A,this}var RH=0;class g6{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:$,fragmentShader:Z}=J,Q=this._getShaderStage($),W=this._getShaderStage(Z),K=this._getShaderCacheForMaterial(J);if(K.has(Q)===!1)K.add(Q),Q.usedTimes++;if(K.has(W)===!1)K.add(W),W.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Z of $)if(Z.usedTimes--,Z.usedTimes===0)this.shaderCache.delete(Z.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Z=$.get(J);if(Z===void 0)Z=new Set,$.set(J,Z);return Z}_getShaderStage(J){let $=this.shaderCache,Z=$.get(J);if(Z===void 0)Z=new m6(J),$.set(J,Z);return Z}}class m6{constructor(J){this.id=RH++,this.code=J,this.usedTimes=0}}function DH(J,$,Z,Q,W,K,Y){let X=new p$,q=new g6,H=[],U=W.isWebGL2,G=W.logarithmicDepthBuffer,F=W.vertexTextures,D=W.precision,O={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(z){if(z===0)return"uv";return`uv${z}`}function V(z,k,y,o,t){let j=o.fog,m=t.geometry,d=z.isMeshStandardMaterial?o.environment:null,i=(z.isMeshStandardMaterial?Z:$).get(z.envMap||d),n=!!i&&i.mapping===306?i.image.height:null,h=O[z.type];if(z.precision!==null){if(D=W.getMaxPrecision(z.precision),D!==z.precision)console.warn("THREE.WebGLProgram.getParameters:",z.precision,"not supported, using",D,"instead.")}let l=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,r=l!==void 0?l.length:0,f=0;if(m.morphAttributes.position!==void 0)f=1;if(m.morphAttributes.normal!==void 0)f=2;if(m.morphAttributes.color!==void 0)f=3;let a,Z0,Y0,O0;if(h){let C9=LJ[h];a=C9.vertexShader,Z0=C9.fragmentShader}else a=z.vertexShader,Z0=z.fragmentShader,q.update(z),Y0=q.getVertexShaderID(z),O0=q.getFragmentShaderID(z);let w0=J.getRenderTarget(),P0=t.isInstancedMesh===!0,T0=t.isBatchedMesh===!0,o0=!!z.map,v=!!z.matcap,M9=!!i,p0=!!z.aoMap,M0=!!z.lightMap,L0=!!z.bumpMap,x0=!!z.normalMap,v0=!!z.displacementMap,y0=!!z.emissiveMap,S=!!z.metalnessMap,C=!!z.roughnessMap,u=z.anisotropy>0,$0=z.clearcoat>0,e=z.iridescence>0,Q0=z.sheen>0,S0=z.transmission>0,G0=u&&!!z.anisotropyMap,E0=$0&&!!z.clearcoatMap,C0=$0&&!!z.clearcoatNormalMap,g0=$0&&!!z.clearcoatRoughnessMap,W0=e&&!!z.iridescenceMap,B9=e&&!!z.iridescenceThicknessMap,l0=Q0&&!!z.sheenColorMap,b0=Q0&&!!z.sheenRoughnessMap,D0=!!z.specularMap,w=!!z.specularColorMap,K0=!!z.specularIntensityMap,B0=S0&&!!z.transmissionMap,z0=S0&&!!z.thicknessMap,h0=!!z.gradientMap,q0=!!z.alphaMap,x=z.alphaTest>0,F0=!!z.alphaHash,V0=!!z.extensions,_0=!!m.attributes.uv1,I0=!!m.attributes.uv2,i0=!!m.attributes.uv3,$9=0;if(z.toneMapped){if(w0===null||w0.isXRRenderTarget===!0)$9=J.toneMapping}return{isWebGL2:U,shaderID:h,shaderType:z.type,shaderName:z.name,vertexShader:a,fragmentShader:Z0,defines:z.defines,customVertexShaderID:Y0,customFragmentShaderID:O0,isRawShaderMaterial:z.isRawShaderMaterial===!0,glslVersion:z.glslVersion,precision:D,batching:T0,instancing:P0,instancingColor:P0&&t.instanceColor!==null,supportsVertexTextures:F,outputColorSpace:w0===null?J.outputColorSpace:w0.isXRRenderTarget===!0?w0.texture.colorSpace:"srgb-linear",map:o0,matcap:v,envMap:M9,envMapMode:M9&&i.mapping,envMapCubeUVHeight:n,aoMap:p0,lightMap:M0,bumpMap:L0,normalMap:x0,displacementMap:F&&v0,emissiveMap:y0,normalMapObjectSpace:x0&&z.normalMapType===1,normalMapTangentSpace:x0&&z.normalMapType===0,metalnessMap:S,roughnessMap:C,anisotropy:u,anisotropyMap:G0,clearcoat:$0,clearcoatMap:E0,clearcoatNormalMap:C0,clearcoatRoughnessMap:g0,iridescence:e,iridescenceMap:W0,iridescenceThicknessMap:B9,sheen:Q0,sheenColorMap:l0,sheenRoughnessMap:b0,specularMap:D0,specularColorMap:w,specularIntensityMap:K0,transmission:S0,transmissionMap:B0,thicknessMap:z0,gradientMap:h0,opaque:z.transparent===!1&&z.blending===1,alphaMap:q0,alphaTest:x,alphaHash:F0,combine:z.combine,mapUv:o0&&E(z.map.channel),aoMapUv:p0&&E(z.aoMap.channel),lightMapUv:M0&&E(z.lightMap.channel),bumpMapUv:L0&&E(z.bumpMap.channel),normalMapUv:x0&&E(z.normalMap.channel),displacementMapUv:v0&&E(z.displacementMap.channel),emissiveMapUv:y0&&E(z.emissiveMap.channel),metalnessMapUv:S&&E(z.metalnessMap.channel),roughnessMapUv:C&&E(z.roughnessMap.channel),anisotropyMapUv:G0&&E(z.anisotropyMap.channel),clearcoatMapUv:E0&&E(z.clearcoatMap.channel),clearcoatNormalMapUv:C0&&E(z.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:g0&&E(z.clearcoatRoughnessMap.channel),iridescenceMapUv:W0&&E(z.iridescenceMap.channel),iridescenceThicknessMapUv:B9&&E(z.iridescenceThicknessMap.channel),sheenColorMapUv:l0&&E(z.sheenColorMap.channel),sheenRoughnessMapUv:b0&&E(z.sheenRoughnessMap.channel),specularMapUv:D0&&E(z.specularMap.channel),specularColorMapUv:w&&E(z.specularColorMap.channel),specularIntensityMapUv:K0&&E(z.specularIntensityMap.channel),transmissionMapUv:B0&&E(z.transmissionMap.channel),thicknessMapUv:z0&&E(z.thicknessMap.channel),alphaMapUv:q0&&E(z.alphaMap.channel),vertexTangents:!!m.attributes.tangent&&(x0||u),vertexColors:z.vertexColors,vertexAlphas:z.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,vertexUv1s:_0,vertexUv2s:I0,vertexUv3s:i0,pointsUvs:t.isPoints===!0&&!!m.attributes.uv&&(o0||q0),fog:!!j,useFog:z.fog===!0,fogExp2:j&&j.isFogExp2,flatShading:z.flatShading===!0,sizeAttenuation:z.sizeAttenuation===!0,logarithmicDepthBuffer:G,skinning:t.isSkinnedMesh===!0,morphTargets:m.morphAttributes.position!==void 0,morphNormals:m.morphAttributes.normal!==void 0,morphColors:m.morphAttributes.color!==void 0,morphTargetsCount:r,morphTextureStride:f,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numClippingPlanes:Y.numPlanes,numClipIntersection:Y.numIntersection,dithering:z.dithering,shadowMapEnabled:J.shadowMap.enabled&&y.length>0,shadowMapType:J.shadowMap.type,toneMapping:$9,useLegacyLights:J._useLegacyLights,decodeVideoTexture:o0&&z.map.isVideoTexture===!0&&W9.getTransfer(z.map.colorSpace)==="srgb",premultipliedAlpha:z.premultipliedAlpha,doubleSided:z.side===2,flipSided:z.side===1,useDepthPacking:z.depthPacking>=0,depthPacking:z.depthPacking||0,index0AttributeName:z.index0AttributeName,extensionDerivatives:V0&&z.extensions.derivatives===!0,extensionFragDepth:V0&&z.extensions.fragDepth===!0,extensionDrawBuffers:V0&&z.extensions.drawBuffers===!0,extensionShaderTextureLOD:V0&&z.extensions.shaderTextureLOD===!0,extensionClipCullDistance:V0&&z.extensions.clipCullDistance&&Q.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:U||Q.has("EXT_frag_depth"),rendererExtensionDrawBuffers:U||Q.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:U||Q.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:Q.has("KHR_parallel_shader_compile"),customProgramCacheKey:z.customProgramCacheKey()}}function R(z){let k=[];if(z.shaderID)k.push(z.shaderID);else k.push(z.customVertexShaderID),k.push(z.customFragmentShaderID);if(z.defines!==void 0)for(let y in z.defines)k.push(y),k.push(z.defines[y]);if(z.isRawShaderMaterial===!1)N(k,z),B(k,z),k.push(J.outputColorSpace);return k.push(z.customProgramCacheKey),k.join()}function N(z,k){z.push(k.precision),z.push(k.outputColorSpace),z.push(k.envMapMode),z.push(k.envMapCubeUVHeight),z.push(k.mapUv),z.push(k.alphaMapUv),z.push(k.lightMapUv),z.push(k.aoMapUv),z.push(k.bumpMapUv),z.push(k.normalMapUv),z.push(k.displacementMapUv),z.push(k.emissiveMapUv),z.push(k.metalnessMapUv),z.push(k.roughnessMapUv),z.push(k.anisotropyMapUv),z.push(k.clearcoatMapUv),z.push(k.clearcoatNormalMapUv),z.push(k.clearcoatRoughnessMapUv),z.push(k.iridescenceMapUv),z.push(k.iridescenceThicknessMapUv),z.push(k.sheenColorMapUv),z.push(k.sheenRoughnessMapUv),z.push(k.specularMapUv),z.push(k.specularColorMapUv),z.push(k.specularIntensityMapUv),z.push(k.transmissionMapUv),z.push(k.thicknessMapUv),z.push(k.combine),z.push(k.fogExp2),z.push(k.sizeAttenuation),z.push(k.morphTargetsCount),z.push(k.morphAttributeCount),z.push(k.numDirLights),z.push(k.numPointLights),z.push(k.numSpotLights),z.push(k.numSpotLightMaps),z.push(k.numHemiLights),z.push(k.numRectAreaLights),z.push(k.numDirLightShadows),z.push(k.numPointLightShadows),z.push(k.numSpotLightShadows),z.push(k.numSpotLightShadowsWithMaps),z.push(k.numLightProbes),z.push(k.shadowMapType),z.push(k.toneMapping),z.push(k.numClippingPlanes),z.push(k.numClipIntersection),z.push(k.depthPacking)}function B(z,k){if(X.disableAll(),k.isWebGL2)X.enable(0);if(k.supportsVertexTextures)X.enable(1);if(k.instancing)X.enable(2);if(k.instancingColor)X.enable(3);if(k.matcap)X.enable(4);if(k.envMap)X.enable(5);if(k.normalMapObjectSpace)X.enable(6);if(k.normalMapTangentSpace)X.enable(7);if(k.clearcoat)X.enable(8);if(k.iridescence)X.enable(9);if(k.alphaTest)X.enable(10);if(k.vertexColors)X.enable(11);if(k.vertexAlphas)X.enable(12);if(k.vertexUv1s)X.enable(13);if(k.vertexUv2s)X.enable(14);if(k.vertexUv3s)X.enable(15);if(k.vertexTangents)X.enable(16);if(k.anisotropy)X.enable(17);if(k.alphaHash)X.enable(18);if(k.batching)X.enable(19);if(z.push(X.mask),X.disableAll(),k.fog)X.enable(0);if(k.useFog)X.enable(1);if(k.flatShading)X.enable(2);if(k.logarithmicDepthBuffer)X.enable(3);if(k.skinning)X.enable(4);if(k.morphTargets)X.enable(5);if(k.morphNormals)X.enable(6);if(k.morphColors)X.enable(7);if(k.premultipliedAlpha)X.enable(8);if(k.shadowMapEnabled)X.enable(9);if(k.useLegacyLights)X.enable(10);if(k.doubleSided)X.enable(11);if(k.flipSided)X.enable(12);if(k.useDepthPacking)X.enable(13);if(k.dithering)X.enable(14);if(k.transmission)X.enable(15);if(k.sheen)X.enable(16);if(k.opaque)X.enable(17);if(k.pointsUvs)X.enable(18);if(k.decodeVideoTexture)X.enable(19);z.push(X.mask)}function I(z){let k=O[z.type],y;if(k){let o=LJ[k];y=WX.clone(o.uniforms)}else y=z.uniforms;return y}function L(z,k){let y;for(let o=0,t=H.length;o<t;o++){let j=H[o];if(j.cacheKey===k){y=j,++y.usedTimes;break}}if(y===void 0)y=new VH(J,k,z,K),H.push(y);return y}function M(z){if(--z.usedTimes===0){let k=H.indexOf(z);H[k]=H[H.length-1],H.pop(),z.destroy()}}function A(z){q.remove(z)}function _(){q.dispose()}return{getParameters:V,getProgramCacheKey:R,getUniforms:I,acquireProgram:L,releaseProgram:M,releaseShaderCache:A,programs:H,dispose:_}}function EH(){let J=new WeakMap;function $(K){let Y=J.get(K);if(Y===void 0)Y={},J.set(K,Y);return Y}function Z(K){J.delete(K)}function Q(K,Y,X){J.get(K)[Y]=X}function W(){J=new WeakMap}return{get:$,remove:Z,update:Q,dispose:W}}function OH(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function W6(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function K6(){let J=[],$=0,Z=[],Q=[],W=[];function K(){$=0,Z.length=0,Q.length=0,W.length=0}function Y(G,F,D,O,E,V){let R=J[$];if(R===void 0)R={id:G.id,object:G,geometry:F,material:D,groupOrder:O,renderOrder:G.renderOrder,z:E,group:V},J[$]=R;else R.id=G.id,R.object=G,R.geometry=F,R.material=D,R.groupOrder=O,R.renderOrder=G.renderOrder,R.z=E,R.group=V;return $++,R}function X(G,F,D,O,E,V){let R=Y(G,F,D,O,E,V);if(D.transmission>0)Q.push(R);else if(D.transparent===!0)W.push(R);else Z.push(R)}function q(G,F,D,O,E,V){let R=Y(G,F,D,O,E,V);if(D.transmission>0)Q.unshift(R);else if(D.transparent===!0)W.unshift(R);else Z.unshift(R)}function H(G,F){if(Z.length>1)Z.sort(G||OH);if(Q.length>1)Q.sort(F||W6);if(W.length>1)W.sort(F||W6)}function U(){for(let G=$,F=J.length;G<F;G++){let D=J[G];if(D.id===null)break;D.id=null,D.object=null,D.geometry=null,D.material=null,D.group=null}}return{opaque:Z,transmissive:Q,transparent:W,init:K,push:X,unshift:q,finish:U,sort:H}}function NH(){let J=new WeakMap;function $(Q,W){let K=J.get(Q),Y;if(K===void 0)Y=new K6,J.set(Q,[Y]);else if(W>=K.length)Y=new K6,K.push(Y);else Y=K[W];return Y}function Z(){J=new WeakMap}return{get:$,dispose:Z}}function BH(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Z;switch($.type){case"DirectionalLight":Z={direction:new T,color:new a0};break;case"SpotLight":Z={position:new T,direction:new T,color:new a0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Z={position:new T,color:new a0,distance:0,decay:0};break;case"HemisphereLight":Z={direction:new T,skyColor:new a0,groundColor:new a0};break;case"RectAreaLight":Z={color:new a0,position:new T,halfWidth:new T,halfHeight:new T};break}return J[$.id]=Z,Z}}}function zH(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Z;switch($.type){case"DirectionalLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U0};break;case"SpotLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U0};break;case"PointLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Z,Z}}}var IH=0;function LH(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function MH(J,$){let Z=new BH,Q=zH(),W={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)W.probe.push(new T);let K=new T,Y=new Y9,X=new Y9;function q(U,G){let F=0,D=0,O=0;for(let o=0;o<9;o++)W.probe[o].set(0,0,0);let E=0,V=0,R=0,N=0,B=0,I=0,L=0,M=0,A=0,_=0,z=0;U.sort(LH);let k=G===!0?Math.PI:1;for(let o=0,t=U.length;o<t;o++){let j=U[o],m=j.color,d=j.intensity,i=j.distance,n=j.shadow&&j.shadow.map?j.shadow.map.texture:null;if(j.isAmbientLight)F+=m.r*d*k,D+=m.g*d*k,O+=m.b*d*k;else if(j.isLightProbe){for(let h=0;h<9;h++)W.probe[h].addScaledVector(j.sh.coefficients[h],d);z++}else if(j.isDirectionalLight){let h=Z.get(j);if(h.color.copy(j.color).multiplyScalar(j.intensity*k),j.castShadow){let l=j.shadow,r=Q.get(j);r.shadowBias=l.bias,r.shadowNormalBias=l.normalBias,r.shadowRadius=l.radius,r.shadowMapSize=l.mapSize,W.directionalShadow[E]=r,W.directionalShadowMap[E]=n,W.directionalShadowMatrix[E]=j.shadow.matrix,I++}W.directional[E]=h,E++}else if(j.isSpotLight){let h=Z.get(j);h.position.setFromMatrixPosition(j.matrixWorld),h.color.copy(m).multiplyScalar(d*k),h.distance=i,h.coneCos=Math.cos(j.angle),h.penumbraCos=Math.cos(j.angle*(1-j.penumbra)),h.decay=j.decay,W.spot[R]=h;let l=j.shadow;if(j.map){if(W.spotLightMap[A]=j.map,A++,l.updateMatrices(j),j.castShadow)_++}if(W.spotLightMatrix[R]=l.matrix,j.castShadow){let r=Q.get(j);r.shadowBias=l.bias,r.shadowNormalBias=l.normalBias,r.shadowRadius=l.radius,r.shadowMapSize=l.mapSize,W.spotShadow[R]=r,W.spotShadowMap[R]=n,M++}R++}else if(j.isRectAreaLight){let h=Z.get(j);h.color.copy(m).multiplyScalar(d),h.halfWidth.set(j.width*0.5,0,0),h.halfHeight.set(0,j.height*0.5,0),W.rectArea[N]=h,N++}else if(j.isPointLight){let h=Z.get(j);if(h.color.copy(j.color).multiplyScalar(j.intensity*k),h.distance=j.distance,h.decay=j.decay,j.castShadow){let l=j.shadow,r=Q.get(j);r.shadowBias=l.bias,r.shadowNormalBias=l.normalBias,r.shadowRadius=l.radius,r.shadowMapSize=l.mapSize,r.shadowCameraNear=l.camera.near,r.shadowCameraFar=l.camera.far,W.pointShadow[V]=r,W.pointShadowMap[V]=n,W.pointShadowMatrix[V]=j.shadow.matrix,L++}W.point[V]=h,V++}else if(j.isHemisphereLight){let h=Z.get(j);h.skyColor.copy(j.color).multiplyScalar(d*k),h.groundColor.copy(j.groundColor).multiplyScalar(d*k),W.hemi[B]=h,B++}}if(N>0)if($.isWebGL2)if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=H0.LTC_FLOAT_1,W.rectAreaLTC2=H0.LTC_FLOAT_2;else W.rectAreaLTC1=H0.LTC_HALF_1,W.rectAreaLTC2=H0.LTC_HALF_2;else if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=H0.LTC_FLOAT_1,W.rectAreaLTC2=H0.LTC_FLOAT_2;else if(J.has("OES_texture_half_float_linear")===!0)W.rectAreaLTC1=H0.LTC_HALF_1,W.rectAreaLTC2=H0.LTC_HALF_2;else console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.");W.ambient[0]=F,W.ambient[1]=D,W.ambient[2]=O;let y=W.hash;if(y.directionalLength!==E||y.pointLength!==V||y.spotLength!==R||y.rectAreaLength!==N||y.hemiLength!==B||y.numDirectionalShadows!==I||y.numPointShadows!==L||y.numSpotShadows!==M||y.numSpotMaps!==A||y.numLightProbes!==z)W.directional.length=E,W.spot.length=R,W.rectArea.length=N,W.point.length=V,W.hemi.length=B,W.directionalShadow.length=I,W.directionalShadowMap.length=I,W.pointShadow.length=L,W.pointShadowMap.length=L,W.spotShadow.length=M,W.spotShadowMap.length=M,W.directionalShadowMatrix.length=I,W.pointShadowMatrix.length=L,W.spotLightMatrix.length=M+A-_,W.spotLightMap.length=A,W.numSpotLightShadowsWithMaps=_,W.numLightProbes=z,y.directionalLength=E,y.pointLength=V,y.spotLength=R,y.rectAreaLength=N,y.hemiLength=B,y.numDirectionalShadows=I,y.numPointShadows=L,y.numSpotShadows=M,y.numSpotMaps=A,y.numLightProbes=z,W.version=IH++}function H(U,G){let F=0,D=0,O=0,E=0,V=0,R=G.matrixWorldInverse;for(let N=0,B=U.length;N<B;N++){let I=U[N];if(I.isDirectionalLight){let L=W.directional[F];L.direction.setFromMatrixPosition(I.matrixWorld),K.setFromMatrixPosition(I.target.matrixWorld),L.direction.sub(K),L.direction.transformDirection(R),F++}else if(I.isSpotLight){let L=W.spot[O];L.position.setFromMatrixPosition(I.matrixWorld),L.position.applyMatrix4(R),L.direction.setFromMatrixPosition(I.matrixWorld),K.setFromMatrixPosition(I.target.matrixWorld),L.direction.sub(K),L.direction.transformDirection(R),O++}else if(I.isRectAreaLight){let L=W.rectArea[E];L.position.setFromMatrixPosition(I.matrixWorld),L.position.applyMatrix4(R),X.identity(),Y.copy(I.matrixWorld),Y.premultiply(R),X.extractRotation(Y),L.halfWidth.set(I.width*0.5,0,0),L.halfHeight.set(0,I.height*0.5,0),L.halfWidth.applyMatrix4(X),L.halfHeight.applyMatrix4(X),E++}else if(I.isPointLight){let L=W.point[D];L.position.setFromMatrixPosition(I.matrixWorld),L.position.applyMatrix4(R),D++}else if(I.isHemisphereLight){let L=W.hemi[V];L.direction.setFromMatrixPosition(I.matrixWorld),L.direction.transformDirection(R),V++}}}return{setup:q,setupView:H,state:W}}function X6(J,$){let Z=new MH(J,$),Q=[],W=[];function K(){Q.length=0,W.length=0}function Y(G){Q.push(G)}function X(G){W.push(G)}function q(G){Z.setup(Q,G)}function H(G){Z.setupView(Q,G)}return{init:K,state:{lightsArray:Q,shadowsArray:W,lights:Z},setupLights:q,setupLightsView:H,pushLight:Y,pushShadow:X}}function CH(J,$){let Z=new WeakMap;function Q(K,Y=0){let X=Z.get(K),q;if(X===void 0)q=new X6(J,$),Z.set(K,[q]);else if(Y>=X.length)q=new X6(J,$),X.push(q);else q=X[Y];return q}function W(){Z=new WeakMap}return{get:Q,dispose:W}}class u6 extends uJ{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class d6 extends uJ{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}var AH=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kH=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function PH(J,$,Z){let Q=new l$,W=new U0,K=new U0,Y=new H9,X=new u6({depthPacking:3201}),q=new d6,H={},U=Z.maxTextureSize,G={[0]:1,[1]:0,[2]:2},F=new J8({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U0},radius:{value:4}},vertexShader:AH,fragmentShader:kH}),D=F.clone();D.defines.HORIZONTAL_PASS=1;let O=new R9;O.setAttribute("position",new y9(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let E=new b(O,F),V=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let R=this.type;this.render=function(M,A,_){if(V.enabled===!1)return;if(V.autoUpdate===!1&&V.needsUpdate===!1)return;if(M.length===0)return;let z=J.getRenderTarget(),k=J.getActiveCubeFace(),y=J.getActiveMipmapLevel(),o=J.state;o.setBlending(0),o.buffers.color.setClear(1,1,1,1),o.buffers.depth.setTest(!0),o.setScissorTest(!1);let t=R!==3&&this.type===3,j=R===3&&this.type!==3;for(let m=0,d=M.length;m<d;m++){let i=M[m],n=i.shadow;if(n===void 0){console.warn("THREE.WebGLShadowMap:",i,"has no shadow.");continue}if(n.autoUpdate===!1&&n.needsUpdate===!1)continue;W.copy(n.mapSize);let h=n.getFrameExtents();if(W.multiply(h),K.copy(n.mapSize),W.x>U||W.y>U){if(W.x>U)K.x=Math.floor(U/h.x),W.x=K.x*h.x,n.mapSize.x=K.x;if(W.y>U)K.y=Math.floor(U/h.y),W.y=K.y*h.y,n.mapSize.y=K.y}if(n.map===null||t===!0||j===!0){let r=this.type!==3?{minFilter:1003,magFilter:1003}:{};if(n.map!==null)n.map.dispose();n.map=new eJ(W.x,W.y,r),n.map.texture.name=i.name+".shadowMap",n.camera.updateProjectionMatrix()}J.setRenderTarget(n.map),J.clear();let l=n.getViewportCount();for(let r=0;r<l;r++){let f=n.getViewport(r);Y.set(K.x*f.x,K.y*f.y,K.x*f.z,K.y*f.w),o.viewport(Y),n.updateMatrices(i,r),Q=n.getFrustum(),I(A,_,n.camera,i,this.type)}if(n.isPointLightShadow!==!0&&this.type===3)N(n,_);n.needsUpdate=!1}R=this.type,V.needsUpdate=!1,J.setRenderTarget(z,k,y)};function N(M,A){let _=$.update(E);if(F.defines.VSM_SAMPLES!==M.blurSamples)F.defines.VSM_SAMPLES=M.blurSamples,D.defines.VSM_SAMPLES=M.blurSamples,F.needsUpdate=!0,D.needsUpdate=!0;if(M.mapPass===null)M.mapPass=new eJ(W.x,W.y);F.uniforms.shadow_pass.value=M.map.texture,F.uniforms.resolution.value=M.mapSize,F.uniforms.radius.value=M.radius,J.setRenderTarget(M.mapPass),J.clear(),J.renderBufferDirect(A,null,_,F,E,null),D.uniforms.shadow_pass.value=M.mapPass.texture,D.uniforms.resolution.value=M.mapSize,D.uniforms.radius.value=M.radius,J.setRenderTarget(M.map),J.clear(),J.renderBufferDirect(A,null,_,D,E,null)}function B(M,A,_,z){let k=null,y=_.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(y!==void 0)k=y;else if(k=_.isPointLight===!0?q:X,J.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let o=k.uuid,t=A.uuid,j=H[o];if(j===void 0)j={},H[o]=j;let m=j[t];if(m===void 0)m=k.clone(),j[t]=m,A.addEventListener("dispose",L);k=m}if(k.visible=A.visible,k.wireframe=A.wireframe,z===3)k.side=A.shadowSide!==null?A.shadowSide:A.side;else k.side=A.shadowSide!==null?A.shadowSide:G[A.side];if(k.alphaMap=A.alphaMap,k.alphaTest=A.alphaTest,k.map=A.map,k.clipShadows=A.clipShadows,k.clippingPlanes=A.clippingPlanes,k.clipIntersection=A.clipIntersection,k.displacementMap=A.displacementMap,k.displacementScale=A.displacementScale,k.displacementBias=A.displacementBias,k.wireframeLinewidth=A.wireframeLinewidth,k.linewidth=A.linewidth,_.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let o=J.properties.get(k);o.light=_}return k}function I(M,A,_,z,k){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)){if((M.castShadow||M.receiveShadow&&k===3)&&(!M.frustumCulled||Q.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,M.matrixWorld);let t=$.update(M),j=M.material;if(Array.isArray(j)){let m=t.groups;for(let d=0,i=m.length;d<i;d++){let n=m[d],h=j[n.materialIndex];if(h&&h.visible){let l=B(M,h,z,k);M.onBeforeShadow(J,M,A,_,t,l,n),J.renderBufferDirect(_,null,t,l,M,n),M.onAfterShadow(J,M,A,_,t,l,n)}}}else if(j.visible){let m=B(M,j,z,k);M.onBeforeShadow(J,M,A,_,t,m,null),J.renderBufferDirect(_,null,t,m,M,null),M.onAfterShadow(J,M,A,_,t,m,null)}}}let o=M.children;for(let t=0,j=o.length;t<j;t++)I(o[t],A,_,z,k)}function L(M){M.target.removeEventListener("dispose",L);for(let _ in H){let z=H[_],k=M.target.uuid;if(k in z)z[k].dispose(),delete z[k]}}}function SH(J,$,Z){let Q=Z.isWebGL2;function W(){let x=!1,F0=new H9,V0=null,_0=new H9(0,0,0,0);return{setMask:function(I0){if(V0!==I0&&!x)J.colorMask(I0,I0,I0,I0),V0=I0},setLocked:function(I0){x=I0},setClear:function(I0,i0,$9,q9,C9){if(C9===!0)I0*=q9,i0*=q9,$9*=q9;if(F0.set(I0,i0,$9,q9),_0.equals(F0)===!1)J.clearColor(I0,i0,$9,q9),_0.copy(F0)},reset:function(){x=!1,V0=null,_0.set(-1,0,0,0)}}}function K(){let x=!1,F0=null,V0=null,_0=null;return{setTest:function(I0){if(I0)T0(J.DEPTH_TEST);else o0(J.DEPTH_TEST)},setMask:function(I0){if(F0!==I0&&!x)J.depthMask(I0),F0=I0},setFunc:function(I0){if(V0!==I0){switch(I0){case 0:J.depthFunc(J.NEVER);break;case 1:J.depthFunc(J.ALWAYS);break;case 2:J.depthFunc(J.LESS);break;case 3:J.depthFunc(J.LEQUAL);break;case 4:J.depthFunc(J.EQUAL);break;case 5:J.depthFunc(J.GEQUAL);break;case 6:J.depthFunc(J.GREATER);break;case 7:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}V0=I0}},setLocked:function(I0){x=I0},setClear:function(I0){if(_0!==I0)J.clearDepth(I0),_0=I0},reset:function(){x=!1,F0=null,V0=null,_0=null}}}function Y(){let x=!1,F0=null,V0=null,_0=null,I0=null,i0=null,$9=null,q9=null,C9=null;return{setTest:function(r0){if(!x)if(r0)T0(J.STENCIL_TEST);else o0(J.STENCIL_TEST)},setMask:function(r0){if(F0!==r0&&!x)J.stencilMask(r0),F0=r0},setFunc:function(r0,BJ,zJ){if(V0!==r0||_0!==BJ||I0!==zJ)J.stencilFunc(r0,BJ,zJ),V0=r0,_0=BJ,I0=zJ},setOp:function(r0,BJ,zJ){if(i0!==r0||$9!==BJ||q9!==zJ)J.stencilOp(r0,BJ,zJ),i0=r0,$9=BJ,q9=zJ},setLocked:function(r0){x=r0},setClear:function(r0){if(C9!==r0)J.clearStencil(r0),C9=r0},reset:function(){x=!1,F0=null,V0=null,_0=null,I0=null,i0=null,$9=null,q9=null,C9=null}}}let X=new W,q=new K,H=new Y,U=new WeakMap,G=new WeakMap,F={},D={},O=new WeakMap,E=[],V=null,R=!1,N=null,B=null,I=null,L=null,M=null,A=null,_=null,z=new a0(0,0,0),k=0,y=!1,o=null,t=null,j=null,m=null,d=null,i=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),n=!1,h=0,l=J.getParameter(J.VERSION);if(l.indexOf("WebGL")!==-1)h=parseFloat(/^WebGL (\d)/.exec(l)[1]),n=h>=1;else if(l.indexOf("OpenGL ES")!==-1)h=parseFloat(/^OpenGL ES (\d)/.exec(l)[1]),n=h>=2;let r=null,f={},a=J.getParameter(J.SCISSOR_BOX),Z0=J.getParameter(J.VIEWPORT),Y0=new H9().fromArray(a),O0=new H9().fromArray(Z0);function w0(x,F0,V0,_0){let I0=new Uint8Array(4),i0=J.createTexture();J.bindTexture(x,i0),J.texParameteri(x,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(x,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let $9=0;$9<V0;$9++)if(Q&&(x===J.TEXTURE_3D||x===J.TEXTURE_2D_ARRAY))J.texImage3D(F0,0,J.RGBA,1,1,_0,0,J.RGBA,J.UNSIGNED_BYTE,I0);else J.texImage2D(F0+$9,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,I0);return i0}let P0={};if(P0[J.TEXTURE_2D]=w0(J.TEXTURE_2D,J.TEXTURE_2D,1),P0[J.TEXTURE_CUBE_MAP]=w0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q)P0[J.TEXTURE_2D_ARRAY]=w0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),P0[J.TEXTURE_3D]=w0(J.TEXTURE_3D,J.TEXTURE_3D,1,1);X.setClear(0,0,0,1),q.setClear(1),H.setClear(0),T0(J.DEPTH_TEST),q.setFunc(3),y0(!1),S(1),T0(J.CULL_FACE),x0(0);function T0(x){if(F[x]!==!0)J.enable(x),F[x]=!0}function o0(x){if(F[x]!==!1)J.disable(x),F[x]=!1}function v(x,F0){if(D[x]!==F0){if(J.bindFramebuffer(x,F0),D[x]=F0,Q){if(x===J.DRAW_FRAMEBUFFER)D[J.FRAMEBUFFER]=F0;if(x===J.FRAMEBUFFER)D[J.DRAW_FRAMEBUFFER]=F0}return!0}return!1}function M9(x,F0){let V0=E,_0=!1;if(x){if(V0=O.get(F0),V0===void 0)V0=[],O.set(F0,V0);if(x.isWebGLMultipleRenderTargets){let I0=x.texture;if(V0.length!==I0.length||V0[0]!==J.COLOR_ATTACHMENT0){for(let i0=0,$9=I0.length;i0<$9;i0++)V0[i0]=J.COLOR_ATTACHMENT0+i0;V0.length=I0.length,_0=!0}}else if(V0[0]!==J.COLOR_ATTACHMENT0)V0[0]=J.COLOR_ATTACHMENT0,_0=!0}else if(V0[0]!==J.BACK)V0[0]=J.BACK,_0=!0;if(_0)if(Z.isWebGL2)J.drawBuffers(V0);else $.get("WEBGL_draw_buffers").drawBuffersWEBGL(V0)}function p0(x){if(V!==x)return J.useProgram(x),V=x,!0;return!1}let M0={[100]:J.FUNC_ADD,[101]:J.FUNC_SUBTRACT,[102]:J.FUNC_REVERSE_SUBTRACT};if(Q)M0[103]=J.MIN,M0[104]=J.MAX;else{let x=$.get("EXT_blend_minmax");if(x!==null)M0[103]=x.MIN_EXT,M0[104]=x.MAX_EXT}let L0={[200]:J.ZERO,[201]:J.ONE,[202]:J.SRC_COLOR,[204]:J.SRC_ALPHA,[210]:J.SRC_ALPHA_SATURATE,[208]:J.DST_COLOR,[206]:J.DST_ALPHA,[203]:J.ONE_MINUS_SRC_COLOR,[205]:J.ONE_MINUS_SRC_ALPHA,[209]:J.ONE_MINUS_DST_COLOR,[207]:J.ONE_MINUS_DST_ALPHA,[211]:J.CONSTANT_COLOR,[212]:J.ONE_MINUS_CONSTANT_COLOR,[213]:J.CONSTANT_ALPHA,[214]:J.ONE_MINUS_CONSTANT_ALPHA};function x0(x,F0,V0,_0,I0,i0,$9,q9,C9,r0){if(x===0){if(R===!0)o0(J.BLEND),R=!1;return}if(R===!1)T0(J.BLEND),R=!0;if(x!==5){if(x!==N||r0!==y){if(B!==100||M!==100)J.blendEquation(J.FUNC_ADD),B=100,M=100;if(r0)switch(x){case 1:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.ONE,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFuncSeparate(J.ZERO,J.SRC_COLOR,J.ZERO,J.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",x);break}else switch(x){case 1:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.SRC_ALPHA,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFunc(J.ZERO,J.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",x);break}I=null,L=null,A=null,_=null,z.set(0,0,0),k=0,N=x,y=r0}return}if(I0=I0||F0,i0=i0||V0,$9=$9||_0,F0!==B||I0!==M)J.blendEquationSeparate(M0[F0],M0[I0]),B=F0,M=I0;if(V0!==I||_0!==L||i0!==A||$9!==_)J.blendFuncSeparate(L0[V0],L0[_0],L0[i0],L0[$9]),I=V0,L=_0,A=i0,_=$9;if(q9.equals(z)===!1||C9!==k)J.blendColor(q9.r,q9.g,q9.b,C9),z.copy(q9),k=C9;N=x,y=!1}function v0(x,F0){x.side===2?o0(J.CULL_FACE):T0(J.CULL_FACE);let V0=x.side===1;if(F0)V0=!V0;y0(V0),x.blending===1&&x.transparent===!1?x0(0):x0(x.blending,x.blendEquation,x.blendSrc,x.blendDst,x.blendEquationAlpha,x.blendSrcAlpha,x.blendDstAlpha,x.blendColor,x.blendAlpha,x.premultipliedAlpha),q.setFunc(x.depthFunc),q.setTest(x.depthTest),q.setMask(x.depthWrite),X.setMask(x.colorWrite);let _0=x.stencilWrite;if(H.setTest(_0),_0)H.setMask(x.stencilWriteMask),H.setFunc(x.stencilFunc,x.stencilRef,x.stencilFuncMask),H.setOp(x.stencilFail,x.stencilZFail,x.stencilZPass);u(x.polygonOffset,x.polygonOffsetFactor,x.polygonOffsetUnits),x.alphaToCoverage===!0?T0(J.SAMPLE_ALPHA_TO_COVERAGE):o0(J.SAMPLE_ALPHA_TO_COVERAGE)}function y0(x){if(o!==x){if(x)J.frontFace(J.CW);else J.frontFace(J.CCW);o=x}}function S(x){if(x!==0){if(T0(J.CULL_FACE),x!==t)if(x===1)J.cullFace(J.BACK);else if(x===2)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else o0(J.CULL_FACE);t=x}function C(x){if(x!==j){if(n)J.lineWidth(x);j=x}}function u(x,F0,V0){if(x){if(T0(J.POLYGON_OFFSET_FILL),m!==F0||d!==V0)J.polygonOffset(F0,V0),m=F0,d=V0}else o0(J.POLYGON_OFFSET_FILL)}function $0(x){if(x)T0(J.SCISSOR_TEST);else o0(J.SCISSOR_TEST)}function e(x){if(x===void 0)x=J.TEXTURE0+i-1;if(r!==x)J.activeTexture(x),r=x}function Q0(x,F0,V0){if(V0===void 0)if(r===null)V0=J.TEXTURE0+i-1;else V0=r;let _0=f[V0];if(_0===void 0)_0={type:void 0,texture:void 0},f[V0]=_0;if(_0.type!==x||_0.texture!==F0){if(r!==V0)J.activeTexture(V0),r=V0;J.bindTexture(x,F0||P0[x]),_0.type=x,_0.texture=F0}}function S0(){let x=f[r];if(x!==void 0&&x.type!==void 0)J.bindTexture(x.type,null),x.type=void 0,x.texture=void 0}function G0(){try{J.compressedTexImage2D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function E0(){try{J.compressedTexImage3D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function C0(){try{J.texSubImage2D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function g0(){try{J.texSubImage3D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function W0(){try{J.compressedTexSubImage2D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function B9(){try{J.compressedTexSubImage3D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function l0(){try{J.texStorage2D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function b0(){try{J.texStorage3D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function D0(){try{J.texImage2D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function w(){try{J.texImage3D.apply(J,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function K0(x){if(Y0.equals(x)===!1)J.scissor(x.x,x.y,x.z,x.w),Y0.copy(x)}function B0(x){if(O0.equals(x)===!1)J.viewport(x.x,x.y,x.z,x.w),O0.copy(x)}function z0(x,F0){let V0=G.get(F0);if(V0===void 0)V0=new WeakMap,G.set(F0,V0);let _0=V0.get(x);if(_0===void 0)_0=J.getUniformBlockIndex(F0,x.name),V0.set(x,_0)}function h0(x,F0){let _0=G.get(F0).get(x);if(U.get(F0)!==_0)J.uniformBlockBinding(F0,_0,x.__bindingPointIndex),U.set(F0,_0)}function q0(){if(J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),Q===!0)J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null);J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),F={},r=null,f={},D={},O=new WeakMap,E=[],V=null,R=!1,N=null,B=null,I=null,L=null,M=null,A=null,_=null,z=new a0(0,0,0),k=0,y=!1,o=null,t=null,j=null,m=null,d=null,Y0.set(0,0,J.canvas.width,J.canvas.height),O0.set(0,0,J.canvas.width,J.canvas.height),X.reset(),q.reset(),H.reset()}return{buffers:{color:X,depth:q,stencil:H},enable:T0,disable:o0,bindFramebuffer:v,drawBuffers:M9,useProgram:p0,setBlending:x0,setMaterial:v0,setFlipSided:y0,setCullFace:S,setLineWidth:C,setPolygonOffset:u,setScissorTest:$0,activeTexture:e,bindTexture:Q0,unbindTexture:S0,compressedTexImage2D:G0,compressedTexImage3D:E0,texImage2D:D0,texImage3D:w,updateUBOMapping:z0,uniformBlockBinding:h0,texStorage2D:l0,texStorage3D:b0,texSubImage2D:C0,texSubImage3D:g0,compressedTexSubImage2D:W0,compressedTexSubImage3D:B9,scissor:K0,viewport:B0,reset:q0}}function wH(J,$,Z,Q,W,K,Y){let X=W.isWebGL2,q=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,H=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new WeakMap,G,F=new WeakMap,D=!1;try{D=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(S){}function O(S,C){return D?new OffscreenCanvas(S,C):g$("canvas")}function E(S,C,u,$0){let e=1;if(S.width>$0||S.height>$0)e=$0/Math.max(S.width,S.height);if(e<1||C===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){let Q0=C?v$:Math.floor,S0=Q0(e*S.width),G0=Q0(e*S.height);if(G===void 0)G=O(S0,G0);let E0=u?O(S0,G0):G;return E0.width=S0,E0.height=G0,E0.getContext("2d").drawImage(S,0,0,S0,G0),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+S0+"x"+G0+")."),E0}else{if("data"in S)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+").");return S}return S}function V(S){return rZ(S.width)&&rZ(S.height)}function R(S){if(X)return!1;return S.wrapS!==1001||S.wrapT!==1001||S.minFilter!==1003&&S.minFilter!==1006}function N(S,C){return S.generateMipmaps&&C&&S.minFilter!==1003&&S.minFilter!==1006}function B(S){J.generateMipmap(S)}function I(S,C,u,$0,e=!1){if(X===!1)return C;if(S!==null){if(J[S]!==void 0)return J[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let Q0=C;if(C===J.RED){if(u===J.FLOAT)Q0=J.R32F;if(u===J.HALF_FLOAT)Q0=J.R16F;if(u===J.UNSIGNED_BYTE)Q0=J.R8}if(C===J.RED_INTEGER){if(u===J.UNSIGNED_BYTE)Q0=J.R8UI;if(u===J.UNSIGNED_SHORT)Q0=J.R16UI;if(u===J.UNSIGNED_INT)Q0=J.R32UI;if(u===J.BYTE)Q0=J.R8I;if(u===J.SHORT)Q0=J.R16I;if(u===J.INT)Q0=J.R32I}if(C===J.RG){if(u===J.FLOAT)Q0=J.RG32F;if(u===J.HALF_FLOAT)Q0=J.RG16F;if(u===J.UNSIGNED_BYTE)Q0=J.RG8}if(C===J.RGBA){let S0=e?"linear":W9.getTransfer($0);if(u===J.FLOAT)Q0=J.RGBA32F;if(u===J.HALF_FLOAT)Q0=J.RGBA16F;if(u===J.UNSIGNED_BYTE)Q0=S0==="srgb"?J.SRGB8_ALPHA8:J.RGBA8;if(u===J.UNSIGNED_SHORT_4_4_4_4)Q0=J.RGBA4;if(u===J.UNSIGNED_SHORT_5_5_5_1)Q0=J.RGB5_A1}if(Q0===J.R16F||Q0===J.R32F||Q0===J.RG16F||Q0===J.RG32F||Q0===J.RGBA16F||Q0===J.RGBA32F)$.get("EXT_color_buffer_float");return Q0}function L(S,C,u){if(N(S,u)===!0||S.isFramebufferTexture&&S.minFilter!==1003&&S.minFilter!==1006)return Math.log2(Math.max(C.width,C.height))+1;else if(S.mipmaps!==void 0&&S.mipmaps.length>0)return S.mipmaps.length;else if(S.isCompressedTexture&&Array.isArray(S.image))return C.mipmaps.length;else return 1}function M(S){if(S===1003||S===1004||S===1005)return J.NEAREST;return J.LINEAR}function A(S){let C=S.target;if(C.removeEventListener("dispose",A),z(C),C.isVideoTexture)U.delete(C)}function _(S){let C=S.target;C.removeEventListener("dispose",_),y(C)}function z(S){let C=Q.get(S);if(C.__webglInit===void 0)return;let u=S.source,$0=F.get(u);if($0){let e=$0[C.__cacheKey];if(e.usedTimes--,e.usedTimes===0)k(S);if(Object.keys($0).length===0)F.delete(u)}Q.remove(S)}function k(S){let C=Q.get(S);J.deleteTexture(C.__webglTexture);let u=S.source,$0=F.get(u);delete $0[C.__cacheKey],Y.memory.textures--}function y(S){let C=S.texture,u=Q.get(S),$0=Q.get(C);if($0.__webglTexture!==void 0)J.deleteTexture($0.__webglTexture),Y.memory.textures--;if(S.depthTexture)S.depthTexture.dispose();if(S.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(u.__webglFramebuffer[e]))for(let Q0=0;Q0<u.__webglFramebuffer[e].length;Q0++)J.deleteFramebuffer(u.__webglFramebuffer[e][Q0]);else J.deleteFramebuffer(u.__webglFramebuffer[e]);if(u.__webglDepthbuffer)J.deleteRenderbuffer(u.__webglDepthbuffer[e])}else{if(Array.isArray(u.__webglFramebuffer))for(let e=0;e<u.__webglFramebuffer.length;e++)J.deleteFramebuffer(u.__webglFramebuffer[e]);else J.deleteFramebuffer(u.__webglFramebuffer);if(u.__webglDepthbuffer)J.deleteRenderbuffer(u.__webglDepthbuffer);if(u.__webglMultisampledFramebuffer)J.deleteFramebuffer(u.__webglMultisampledFramebuffer);if(u.__webglColorRenderbuffer){for(let e=0;e<u.__webglColorRenderbuffer.length;e++)if(u.__webglColorRenderbuffer[e])J.deleteRenderbuffer(u.__webglColorRenderbuffer[e])}if(u.__webglDepthRenderbuffer)J.deleteRenderbuffer(u.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let e=0,Q0=C.length;e<Q0;e++){let S0=Q.get(C[e]);if(S0.__webglTexture)J.deleteTexture(S0.__webglTexture),Y.memory.textures--;Q.remove(C[e])}Q.remove(C),Q.remove(S)}let o=0;function t(){o=0}function j(){let S=o;if(S>=W.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+W.maxTextures);return o+=1,S}function m(S){let C=[];return C.push(S.wrapS),C.push(S.wrapT),C.push(S.wrapR||0),C.push(S.magFilter),C.push(S.minFilter),C.push(S.anisotropy),C.push(S.internalFormat),C.push(S.format),C.push(S.type),C.push(S.generateMipmaps),C.push(S.premultiplyAlpha),C.push(S.flipY),C.push(S.unpackAlignment),C.push(S.colorSpace),C.join()}function d(S,C){let u=Q.get(S);if(S.isVideoTexture)v0(S);if(S.isRenderTargetTexture===!1&&S.version>0&&u.__version!==S.version){let $0=S.image;if($0===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($0.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y0(u,S,C);return}}Z.bindTexture(J.TEXTURE_2D,u.__webglTexture,J.TEXTURE0+C)}function i(S,C){let u=Q.get(S);if(S.version>0&&u.__version!==S.version){Y0(u,S,C);return}Z.bindTexture(J.TEXTURE_2D_ARRAY,u.__webglTexture,J.TEXTURE0+C)}function n(S,C){let u=Q.get(S);if(S.version>0&&u.__version!==S.version){Y0(u,S,C);return}Z.bindTexture(J.TEXTURE_3D,u.__webglTexture,J.TEXTURE0+C)}function h(S,C){let u=Q.get(S);if(S.version>0&&u.__version!==S.version){O0(u,S,C);return}Z.bindTexture(J.TEXTURE_CUBE_MAP,u.__webglTexture,J.TEXTURE0+C)}let l={[1000]:J.REPEAT,[1001]:J.CLAMP_TO_EDGE,[1002]:J.MIRRORED_REPEAT},r={[1003]:J.NEAREST,[1004]:J.NEAREST_MIPMAP_NEAREST,[1005]:J.NEAREST_MIPMAP_LINEAR,[1006]:J.LINEAR,[1007]:J.LINEAR_MIPMAP_NEAREST,[1008]:J.LINEAR_MIPMAP_LINEAR},f={[512]:J.NEVER,[519]:J.ALWAYS,[513]:J.LESS,[515]:J.LEQUAL,[514]:J.EQUAL,[518]:J.GEQUAL,[516]:J.GREATER,[517]:J.NOTEQUAL};function a(S,C,u){if(u){if(J.texParameteri(S,J.TEXTURE_WRAP_S,l[C.wrapS]),J.texParameteri(S,J.TEXTURE_WRAP_T,l[C.wrapT]),S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texParameteri(S,J.TEXTURE_WRAP_R,l[C.wrapR]);J.texParameteri(S,J.TEXTURE_MAG_FILTER,r[C.magFilter]),J.texParameteri(S,J.TEXTURE_MIN_FILTER,r[C.minFilter])}else{if(J.texParameteri(S,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(S,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE),S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texParameteri(S,J.TEXTURE_WRAP_R,J.CLAMP_TO_EDGE);if(C.wrapS!==1001||C.wrapT!==1001)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.");if(J.texParameteri(S,J.TEXTURE_MAG_FILTER,M(C.magFilter)),J.texParameteri(S,J.TEXTURE_MIN_FILTER,M(C.minFilter)),C.minFilter!==1003&&C.minFilter!==1006)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")}if(C.compareFunction)J.texParameteri(S,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(S,J.TEXTURE_COMPARE_FUNC,f[C.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){let $0=$.get("EXT_texture_filter_anisotropic");if(C.magFilter===1003)return;if(C.minFilter!==1005&&C.minFilter!==1008)return;if(C.type===1015&&$.has("OES_texture_float_linear")===!1)return;if(X===!1&&(C.type===1016&&$.has("OES_texture_half_float_linear")===!1))return;if(C.anisotropy>1||Q.get(C).__currentAnisotropy)J.texParameterf(S,$0.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,W.getMaxAnisotropy())),Q.get(C).__currentAnisotropy=C.anisotropy}}function Z0(S,C){let u=!1;if(S.__webglInit===void 0)S.__webglInit=!0,C.addEventListener("dispose",A);let $0=C.source,e=F.get($0);if(e===void 0)e={},F.set($0,e);let Q0=m(C);if(Q0!==S.__cacheKey){if(e[Q0]===void 0)e[Q0]={texture:J.createTexture(),usedTimes:0},Y.memory.textures++,u=!0;e[Q0].usedTimes++;let S0=e[S.__cacheKey];if(S0!==void 0){if(e[S.__cacheKey].usedTimes--,S0.usedTimes===0)k(C)}S.__cacheKey=Q0,S.__webglTexture=e[Q0].texture}return u}function Y0(S,C,u){let $0=J.TEXTURE_2D;if(C.isDataArrayTexture||C.isCompressedArrayTexture)$0=J.TEXTURE_2D_ARRAY;if(C.isData3DTexture)$0=J.TEXTURE_3D;let e=Z0(S,C),Q0=C.source;Z.bindTexture($0,S.__webglTexture,J.TEXTURE0+u);let S0=Q.get(Q0);if(Q0.version!==S0.__version||e===!0){Z.activeTexture(J.TEXTURE0+u);let G0=W9.getPrimaries(W9.workingColorSpace),E0=C.colorSpace===""?null:W9.getPrimaries(C.colorSpace),C0=C.colorSpace===""||G0===E0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,C.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,C.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,C0);let g0=R(C)&&V(C.image)===!1,W0=E(C.image,g0,!1,W.maxTextureSize);W0=y0(C,W0);let B9=V(W0)||X,l0=K.convert(C.format,C.colorSpace),b0=K.convert(C.type),D0=I(C.internalFormat,l0,b0,C.colorSpace,C.isVideoTexture);a($0,C,B9);let w,K0=C.mipmaps,B0=X&&C.isVideoTexture!==!0&&D0!==36196,z0=S0.__version===void 0||e===!0,h0=L(C,W0,B9);if(C.isDepthTexture){if(D0=J.DEPTH_COMPONENT,X)if(C.type===1015)D0=J.DEPTH_COMPONENT32F;else if(C.type===1014)D0=J.DEPTH_COMPONENT24;else if(C.type===1020)D0=J.DEPTH24_STENCIL8;else D0=J.DEPTH_COMPONENT16;else if(C.type===1015)console.error("WebGLRenderer: Floating point depth texture requires WebGL2.");if(C.format===1026&&D0===J.DEPTH_COMPONENT){if(C.type!==1012&&C.type!==1014)console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=1014,b0=K.convert(C.type)}if(C.format===1027&&D0===J.DEPTH_COMPONENT){if(D0=J.DEPTH_STENCIL,C.type!==1020)console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=1020,b0=K.convert(C.type)}if(z0)if(B0)Z.texStorage2D(J.TEXTURE_2D,1,D0,W0.width,W0.height);else Z.texImage2D(J.TEXTURE_2D,0,D0,W0.width,W0.height,0,l0,b0,null)}else if(C.isDataTexture)if(K0.length>0&&B9){if(B0&&z0)Z.texStorage2D(J.TEXTURE_2D,h0,D0,K0[0].width,K0[0].height);for(let q0=0,x=K0.length;q0<x;q0++)if(w=K0[q0],B0)Z.texSubImage2D(J.TEXTURE_2D,q0,0,0,w.width,w.height,l0,b0,w.data);else Z.texImage2D(J.TEXTURE_2D,q0,D0,w.width,w.height,0,l0,b0,w.data);C.generateMipmaps=!1}else if(B0){if(z0)Z.texStorage2D(J.TEXTURE_2D,h0,D0,W0.width,W0.height);Z.texSubImage2D(J.TEXTURE_2D,0,0,0,W0.width,W0.height,l0,b0,W0.data)}else Z.texImage2D(J.TEXTURE_2D,0,D0,W0.width,W0.height,0,l0,b0,W0.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){if(B0&&z0)Z.texStorage3D(J.TEXTURE_2D_ARRAY,h0,D0,K0[0].width,K0[0].height,W0.depth);for(let q0=0,x=K0.length;q0<x;q0++)if(w=K0[q0],C.format!==1023)if(l0!==null)if(B0)Z.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,q0,0,0,0,w.width,w.height,W0.depth,l0,w.data,0,0);else Z.compressedTexImage3D(J.TEXTURE_2D_ARRAY,q0,D0,w.width,w.height,W0.depth,0,w.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(B0)Z.texSubImage3D(J.TEXTURE_2D_ARRAY,q0,0,0,0,w.width,w.height,W0.depth,l0,b0,w.data);else Z.texImage3D(J.TEXTURE_2D_ARRAY,q0,D0,w.width,w.height,W0.depth,0,l0,b0,w.data)}else{if(B0&&z0)Z.texStorage2D(J.TEXTURE_2D,h0,D0,K0[0].width,K0[0].height);for(let q0=0,x=K0.length;q0<x;q0++)if(w=K0[q0],C.format!==1023)if(l0!==null)if(B0)Z.compressedTexSubImage2D(J.TEXTURE_2D,q0,0,0,w.width,w.height,l0,w.data);else Z.compressedTexImage2D(J.TEXTURE_2D,q0,D0,w.width,w.height,0,w.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(B0)Z.texSubImage2D(J.TEXTURE_2D,q0,0,0,w.width,w.height,l0,b0,w.data);else Z.texImage2D(J.TEXTURE_2D,q0,D0,w.width,w.height,0,l0,b0,w.data)}else if(C.isDataArrayTexture)if(B0){if(z0)Z.texStorage3D(J.TEXTURE_2D_ARRAY,h0,D0,W0.width,W0.height,W0.depth);Z.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,W0.width,W0.height,W0.depth,l0,b0,W0.data)}else Z.texImage3D(J.TEXTURE_2D_ARRAY,0,D0,W0.width,W0.height,W0.depth,0,l0,b0,W0.data);else if(C.isData3DTexture)if(B0){if(z0)Z.texStorage3D(J.TEXTURE_3D,h0,D0,W0.width,W0.height,W0.depth);Z.texSubImage3D(J.TEXTURE_3D,0,0,0,0,W0.width,W0.height,W0.depth,l0,b0,W0.data)}else Z.texImage3D(J.TEXTURE_3D,0,D0,W0.width,W0.height,W0.depth,0,l0,b0,W0.data);else if(C.isFramebufferTexture){if(z0)if(B0)Z.texStorage2D(J.TEXTURE_2D,h0,D0,W0.width,W0.height);else{let{width:q0,height:x}=W0;for(let F0=0;F0<h0;F0++)Z.texImage2D(J.TEXTURE_2D,F0,D0,q0,x,0,l0,b0,null),q0>>=1,x>>=1}}else if(K0.length>0&&B9){if(B0&&z0)Z.texStorage2D(J.TEXTURE_2D,h0,D0,K0[0].width,K0[0].height);for(let q0=0,x=K0.length;q0<x;q0++)if(w=K0[q0],B0)Z.texSubImage2D(J.TEXTURE_2D,q0,0,0,l0,b0,w);else Z.texImage2D(J.TEXTURE_2D,q0,D0,l0,b0,w);C.generateMipmaps=!1}else if(B0){if(z0)Z.texStorage2D(J.TEXTURE_2D,h0,D0,W0.width,W0.height);Z.texSubImage2D(J.TEXTURE_2D,0,0,0,l0,b0,W0)}else Z.texImage2D(J.TEXTURE_2D,0,D0,l0,b0,W0);if(N(C,B9))B($0);if(S0.__version=Q0.version,C.onUpdate)C.onUpdate(C)}S.__version=C.version}function O0(S,C,u){if(C.image.length!==6)return;let $0=Z0(S,C),e=C.source;Z.bindTexture(J.TEXTURE_CUBE_MAP,S.__webglTexture,J.TEXTURE0+u);let Q0=Q.get(e);if(e.version!==Q0.__version||$0===!0){Z.activeTexture(J.TEXTURE0+u);let S0=W9.getPrimaries(W9.workingColorSpace),G0=C.colorSpace===""?null:W9.getPrimaries(C.colorSpace),E0=C.colorSpace===""||S0===G0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,C.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,C.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,E0);let C0=C.isCompressedTexture||C.image[0].isCompressedTexture,g0=C.image[0]&&C.image[0].isDataTexture,W0=[];for(let q0=0;q0<6;q0++){if(!C0&&!g0)W0[q0]=E(C.image[q0],!1,!0,W.maxCubemapSize);else W0[q0]=g0?C.image[q0].image:C.image[q0];W0[q0]=y0(C,W0[q0])}let B9=W0[0],l0=V(B9)||X,b0=K.convert(C.format,C.colorSpace),D0=K.convert(C.type),w=I(C.internalFormat,b0,D0,C.colorSpace),K0=X&&C.isVideoTexture!==!0,B0=Q0.__version===void 0||$0===!0,z0=L(C,B9,l0);a(J.TEXTURE_CUBE_MAP,C,l0);let h0;if(C0){if(K0&&B0)Z.texStorage2D(J.TEXTURE_CUBE_MAP,z0,w,B9.width,B9.height);for(let q0=0;q0<6;q0++){h0=W0[q0].mipmaps;for(let x=0;x<h0.length;x++){let F0=h0[x];if(C.format!==1023)if(b0!==null)if(K0)Z.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x,0,0,F0.width,F0.height,b0,F0.data);else Z.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x,w,F0.width,F0.height,0,F0.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(K0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x,0,0,F0.width,F0.height,b0,D0,F0.data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x,w,F0.width,F0.height,0,b0,D0,F0.data)}}}else{if(h0=C.mipmaps,K0&&B0){if(h0.length>0)z0++;Z.texStorage2D(J.TEXTURE_CUBE_MAP,z0,w,W0[0].width,W0[0].height)}for(let q0=0;q0<6;q0++)if(g0){if(K0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,0,0,0,W0[q0].width,W0[q0].height,b0,D0,W0[q0].data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,0,w,W0[q0].width,W0[q0].height,0,b0,D0,W0[q0].data);for(let x=0;x<h0.length;x++){let V0=h0[x].image[q0].image;if(K0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x+1,0,0,V0.width,V0.height,b0,D0,V0.data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x+1,w,V0.width,V0.height,0,b0,D0,V0.data)}}else{if(K0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,0,0,0,b0,D0,W0[q0]);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,0,w,b0,D0,W0[q0]);for(let x=0;x<h0.length;x++){let F0=h0[x];if(K0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x+1,0,0,b0,D0,F0.image[q0]);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,x+1,w,b0,D0,F0.image[q0])}}}if(N(C,l0))B(J.TEXTURE_CUBE_MAP);if(Q0.__version=e.version,C.onUpdate)C.onUpdate(C)}S.__version=C.version}function w0(S,C,u,$0,e,Q0){let S0=K.convert(u.format,u.colorSpace),G0=K.convert(u.type),E0=I(u.internalFormat,S0,G0,u.colorSpace);if(!Q.get(C).__hasExternalTextures){let g0=Math.max(1,C.width>>Q0),W0=Math.max(1,C.height>>Q0);if(e===J.TEXTURE_3D||e===J.TEXTURE_2D_ARRAY)Z.texImage3D(e,Q0,E0,g0,W0,C.depth,0,S0,G0,null);else Z.texImage2D(e,Q0,E0,g0,W0,0,S0,G0,null)}if(Z.bindFramebuffer(J.FRAMEBUFFER,S),x0(C))q.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,$0,e,Q.get(u).__webglTexture,0,L0(C));else if(e===J.TEXTURE_2D||e>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&e<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,$0,e,Q.get(u).__webglTexture,Q0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function P0(S,C,u){if(J.bindRenderbuffer(J.RENDERBUFFER,S),C.depthBuffer&&!C.stencilBuffer){let $0=X===!0?J.DEPTH_COMPONENT24:J.DEPTH_COMPONENT16;if(u||x0(C)){let e=C.depthTexture;if(e&&e.isDepthTexture){if(e.type===1015)$0=J.DEPTH_COMPONENT32F;else if(e.type===1014)$0=J.DEPTH_COMPONENT24}let Q0=L0(C);if(x0(C))q.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,Q0,$0,C.width,C.height);else J.renderbufferStorageMultisample(J.RENDERBUFFER,Q0,$0,C.width,C.height)}else J.renderbufferStorage(J.RENDERBUFFER,$0,C.width,C.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.RENDERBUFFER,S)}else if(C.depthBuffer&&C.stencilBuffer){let $0=L0(C);if(u&&x0(C)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,$0,J.DEPTH24_STENCIL8,C.width,C.height);else if(x0(C))q.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,$0,J.DEPTH24_STENCIL8,C.width,C.height);else J.renderbufferStorage(J.RENDERBUFFER,J.DEPTH_STENCIL,C.width,C.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.RENDERBUFFER,S)}else{let $0=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let e=0;e<$0.length;e++){let Q0=$0[e],S0=K.convert(Q0.format,Q0.colorSpace),G0=K.convert(Q0.type),E0=I(Q0.internalFormat,S0,G0,Q0.colorSpace),C0=L0(C);if(u&&x0(C)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,C0,E0,C.width,C.height);else if(x0(C))q.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,C0,E0,C.width,C.height);else J.renderbufferStorage(J.RENDERBUFFER,E0,C.width,C.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function T0(S,C){if(C&&C.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(Z.bindFramebuffer(J.FRAMEBUFFER,S),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");if(!Q.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0;d(C.depthTexture,0);let $0=Q.get(C.depthTexture).__webglTexture,e=L0(C);if(C.depthTexture.format===1026)if(x0(C))q.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,$0,0,e);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,$0,0);else if(C.depthTexture.format===1027)if(x0(C))q.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,$0,0,e);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,$0,0);else throw Error("Unknown depthTexture format")}function o0(S){let C=Q.get(S),u=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!C.__autoAllocateDepthBuffer){if(u)throw Error("target.depthTexture not supported in Cube render targets");T0(C.__webglFramebuffer,S)}else if(u){C.__webglDepthbuffer=[];for(let $0=0;$0<6;$0++)Z.bindFramebuffer(J.FRAMEBUFFER,C.__webglFramebuffer[$0]),C.__webglDepthbuffer[$0]=J.createRenderbuffer(),P0(C.__webglDepthbuffer[$0],S,!1)}else Z.bindFramebuffer(J.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=J.createRenderbuffer(),P0(C.__webglDepthbuffer,S,!1);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function v(S,C,u){let $0=Q.get(S);if(C!==void 0)w0($0.__webglFramebuffer,S,S.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(u!==void 0)o0(S)}function M9(S){let C=S.texture,u=Q.get(S),$0=Q.get(C);if(S.addEventListener("dispose",_),S.isWebGLMultipleRenderTargets!==!0){if($0.__webglTexture===void 0)$0.__webglTexture=J.createTexture();$0.__version=C.version,Y.memory.textures++}let e=S.isWebGLCubeRenderTarget===!0,Q0=S.isWebGLMultipleRenderTargets===!0,S0=V(S)||X;if(e){u.__webglFramebuffer=[];for(let G0=0;G0<6;G0++)if(X&&C.mipmaps&&C.mipmaps.length>0){u.__webglFramebuffer[G0]=[];for(let E0=0;E0<C.mipmaps.length;E0++)u.__webglFramebuffer[G0][E0]=J.createFramebuffer()}else u.__webglFramebuffer[G0]=J.createFramebuffer()}else{if(X&&C.mipmaps&&C.mipmaps.length>0){u.__webglFramebuffer=[];for(let G0=0;G0<C.mipmaps.length;G0++)u.__webglFramebuffer[G0]=J.createFramebuffer()}else u.__webglFramebuffer=J.createFramebuffer();if(Q0)if(W.drawBuffers){let G0=S.texture;for(let E0=0,C0=G0.length;E0<C0;E0++){let g0=Q.get(G0[E0]);if(g0.__webglTexture===void 0)g0.__webglTexture=J.createTexture(),Y.memory.textures++}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(X&&S.samples>0&&x0(S)===!1){let G0=Q0?C:[C];u.__webglMultisampledFramebuffer=J.createFramebuffer(),u.__webglColorRenderbuffer=[],Z.bindFramebuffer(J.FRAMEBUFFER,u.__webglMultisampledFramebuffer);for(let E0=0;E0<G0.length;E0++){let C0=G0[E0];u.__webglColorRenderbuffer[E0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,u.__webglColorRenderbuffer[E0]);let g0=K.convert(C0.format,C0.colorSpace),W0=K.convert(C0.type),B9=I(C0.internalFormat,g0,W0,C0.colorSpace,S.isXRRenderTarget===!0),l0=L0(S);J.renderbufferStorageMultisample(J.RENDERBUFFER,l0,B9,S.width,S.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.RENDERBUFFER,u.__webglColorRenderbuffer[E0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),S.depthBuffer)u.__webglDepthRenderbuffer=J.createRenderbuffer(),P0(u.__webglDepthRenderbuffer,S,!0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}}if(e){Z.bindTexture(J.TEXTURE_CUBE_MAP,$0.__webglTexture),a(J.TEXTURE_CUBE_MAP,C,S0);for(let G0=0;G0<6;G0++)if(X&&C.mipmaps&&C.mipmaps.length>0)for(let E0=0;E0<C.mipmaps.length;E0++)w0(u.__webglFramebuffer[G0][E0],S,C,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,E0);else w0(u.__webglFramebuffer[G0],S,C,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0);if(N(C,S0))B(J.TEXTURE_CUBE_MAP);Z.unbindTexture()}else if(Q0){let G0=S.texture;for(let E0=0,C0=G0.length;E0<C0;E0++){let g0=G0[E0],W0=Q.get(g0);if(Z.bindTexture(J.TEXTURE_2D,W0.__webglTexture),a(J.TEXTURE_2D,g0,S0),w0(u.__webglFramebuffer,S,g0,J.COLOR_ATTACHMENT0+E0,J.TEXTURE_2D,0),N(g0,S0))B(J.TEXTURE_2D)}Z.unbindTexture()}else{let G0=J.TEXTURE_2D;if(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)if(X)G0=S.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;else console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.");if(Z.bindTexture(G0,$0.__webglTexture),a(G0,C,S0),X&&C.mipmaps&&C.mipmaps.length>0)for(let E0=0;E0<C.mipmaps.length;E0++)w0(u.__webglFramebuffer[E0],S,C,J.COLOR_ATTACHMENT0,G0,E0);else w0(u.__webglFramebuffer,S,C,J.COLOR_ATTACHMENT0,G0,0);if(N(C,S0))B(G0);Z.unbindTexture()}if(S.depthBuffer)o0(S)}function p0(S){let C=V(S)||X,u=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let $0=0,e=u.length;$0<e;$0++){let Q0=u[$0];if(N(Q0,C)){let S0=S.isWebGLCubeRenderTarget?J.TEXTURE_CUBE_MAP:J.TEXTURE_2D,G0=Q.get(Q0).__webglTexture;Z.bindTexture(S0,G0),B(S0),Z.unbindTexture()}}}function M0(S){if(X&&S.samples>0&&x0(S)===!1){let C=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],u=S.width,$0=S.height,e=J.COLOR_BUFFER_BIT,Q0=[],S0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,G0=Q.get(S),E0=S.isWebGLMultipleRenderTargets===!0;if(E0)for(let C0=0;C0<C.length;C0++)Z.bindFramebuffer(J.FRAMEBUFFER,G0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+C0,J.RENDERBUFFER,null),Z.bindFramebuffer(J.FRAMEBUFFER,G0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+C0,J.TEXTURE_2D,null,0);Z.bindFramebuffer(J.READ_FRAMEBUFFER,G0.__webglMultisampledFramebuffer),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,G0.__webglFramebuffer);for(let C0=0;C0<C.length;C0++){if(Q0.push(J.COLOR_ATTACHMENT0+C0),S.depthBuffer)Q0.push(S0);let g0=G0.__ignoreDepthValues!==void 0?G0.__ignoreDepthValues:!1;if(g0===!1){if(S.depthBuffer)e|=J.DEPTH_BUFFER_BIT;if(S.stencilBuffer)e|=J.STENCIL_BUFFER_BIT}if(E0)J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,G0.__webglColorRenderbuffer[C0]);if(g0===!0)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,[S0]),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[S0]);if(E0){let W0=Q.get(C[C0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,W0,0)}if(J.blitFramebuffer(0,0,u,$0,0,0,u,$0,e,J.NEAREST),H)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,Q0)}if(Z.bindFramebuffer(J.READ_FRAMEBUFFER,null),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),E0)for(let C0=0;C0<C.length;C0++){Z.bindFramebuffer(J.FRAMEBUFFER,G0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+C0,J.RENDERBUFFER,G0.__webglColorRenderbuffer[C0]);let g0=Q.get(C[C0]).__webglTexture;Z.bindFramebuffer(J.FRAMEBUFFER,G0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+C0,J.TEXTURE_2D,g0,0)}Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,G0.__webglMultisampledFramebuffer)}}function L0(S){return Math.min(W.maxSamples,S.samples)}function x0(S){let C=Q.get(S);return X&&S.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function v0(S){let C=Y.render.frame;if(U.get(S)!==C)U.set(S,C),S.update()}function y0(S,C){let{colorSpace:u,format:$0,type:e}=S;if(S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===1035)return C;if(u!=="srgb-linear"&&u!=="")if(W9.getTransfer(u)==="srgb"){if(X===!1)if($.has("EXT_sRGB")===!0&&$0===1023)S.format=1035,S.minFilter=1006,S.generateMipmaps=!1;else C=ZQ.sRGBToLinear(C);else if($0!==1023||e!==1009)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",u);return C}this.allocateTextureUnit=j,this.resetTextureUnits=t,this.setTexture2D=d,this.setTexture2DArray=i,this.setTexture3D=n,this.setTextureCube=h,this.rebindTextures=v,this.setupRenderTarget=M9,this.updateRenderTargetMipmap=p0,this.updateMultisampleRenderTarget=M0,this.setupDepthRenderbuffer=o0,this.setupFrameBufferTexture=w0,this.useMultisampledRTT=x0}function TH(J,$,Z){let Q=Z.isWebGL2;function W(K,Y=""){let X,q=W9.getTransfer(Y);if(K===1009)return J.UNSIGNED_BYTE;if(K===1017)return J.UNSIGNED_SHORT_4_4_4_4;if(K===1018)return J.UNSIGNED_SHORT_5_5_5_1;if(K===1010)return J.BYTE;if(K===1011)return J.SHORT;if(K===1012)return J.UNSIGNED_SHORT;if(K===1013)return J.INT;if(K===1014)return J.UNSIGNED_INT;if(K===1015)return J.FLOAT;if(K===1016){if(Q)return J.HALF_FLOAT;if(X=$.get("OES_texture_half_float"),X!==null)return X.HALF_FLOAT_OES;else return null}if(K===1021)return J.ALPHA;if(K===1023)return J.RGBA;if(K===1024)return J.LUMINANCE;if(K===1025)return J.LUMINANCE_ALPHA;if(K===1026)return J.DEPTH_COMPONENT;if(K===1027)return J.DEPTH_STENCIL;if(K===1035)if(X=$.get("EXT_sRGB"),X!==null)return X.SRGB_ALPHA_EXT;else return null;if(K===1028)return J.RED;if(K===1029)return J.RED_INTEGER;if(K===1030)return J.RG;if(K===1031)return J.RG_INTEGER;if(K===1033)return J.RGBA_INTEGER;if(K===33776||K===33777||K===33778||K===33779)if(q==="srgb")if(X=$.get("WEBGL_compressed_texture_s3tc_srgb"),X!==null){if(K===33776)return X.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(K===33777)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(K===33778)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(K===33779)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(X=$.get("WEBGL_compressed_texture_s3tc"),X!==null){if(K===33776)return X.COMPRESSED_RGB_S3TC_DXT1_EXT;if(K===33777)return X.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(K===33778)return X.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(K===33779)return X.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(K===35840||K===35841||K===35842||K===35843)if(X=$.get("WEBGL_compressed_texture_pvrtc"),X!==null){if(K===35840)return X.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(K===35841)return X.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(K===35842)return X.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(K===35843)return X.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(K===36196)if(X=$.get("WEBGL_compressed_texture_etc1"),X!==null)return X.COMPRESSED_RGB_ETC1_WEBGL;else return null;if(K===37492||K===37496)if(X=$.get("WEBGL_compressed_texture_etc"),X!==null){if(K===37492)return q==="srgb"?X.COMPRESSED_SRGB8_ETC2:X.COMPRESSED_RGB8_ETC2;if(K===37496)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:X.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(K===37808||K===37809||K===37810||K===37811||K===37812||K===37813||K===37814||K===37815||K===37816||K===37817||K===37818||K===37819||K===37820||K===37821)if(X=$.get("WEBGL_compressed_texture_astc"),X!==null){if(K===37808)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:X.COMPRESSED_RGBA_ASTC_4x4_KHR;if(K===37809)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:X.COMPRESSED_RGBA_ASTC_5x4_KHR;if(K===37810)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:X.COMPRESSED_RGBA_ASTC_5x5_KHR;if(K===37811)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:X.COMPRESSED_RGBA_ASTC_6x5_KHR;if(K===37812)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:X.COMPRESSED_RGBA_ASTC_6x6_KHR;if(K===37813)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:X.COMPRESSED_RGBA_ASTC_8x5_KHR;if(K===37814)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:X.COMPRESSED_RGBA_ASTC_8x6_KHR;if(K===37815)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:X.COMPRESSED_RGBA_ASTC_8x8_KHR;if(K===37816)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:X.COMPRESSED_RGBA_ASTC_10x5_KHR;if(K===37817)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:X.COMPRESSED_RGBA_ASTC_10x6_KHR;if(K===37818)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:X.COMPRESSED_RGBA_ASTC_10x8_KHR;if(K===37819)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:X.COMPRESSED_RGBA_ASTC_10x10_KHR;if(K===37820)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:X.COMPRESSED_RGBA_ASTC_12x10_KHR;if(K===37821)return q==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:X.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(K===36492||K===36494||K===36495)if(X=$.get("EXT_texture_compression_bptc"),X!==null){if(K===36492)return q==="srgb"?X.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:X.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(K===36494)return X.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(K===36495)return X.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(K===36283||K===36284||K===36285||K===36286)if(X=$.get("EXT_texture_compression_rgtc"),X!==null){if(K===36492)return X.COMPRESSED_RED_RGTC1_EXT;if(K===36284)return X.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(K===36285)return X.COMPRESSED_RED_GREEN_RGTC2_EXT;if(K===36286)return X.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(K===1020){if(Q)return J.UNSIGNED_INT_24_8;if(X=$.get("WEBGL_depth_texture"),X!==null)return X.UNSIGNED_INT_24_8_WEBGL;else return null}return J[K]!==void 0?J[K]:null}return{convert:W}}class p6 extends d9{constructor(J=[]){super();this.isArrayCamera=!0,this.cameras=J}}class N0 extends U9{constructor(){super();this.isGroup=!0,this.type="Group"}}var _H={type:"move"};class h${constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new N0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new N0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new N0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Z of J.hand.values())this._getHandJoint($,Z)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Z){let Q=null,W=null,K=null,Y=this._targetRay,X=this._grip,q=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(q&&J.hand){K=!0;for(let O of J.hand.values()){let E=$.getJointPose(O,Z),V=this._getHandJoint(q,O);if(E!==null)V.matrix.fromArray(E.transform.matrix),V.matrix.decompose(V.position,V.rotation,V.scale),V.matrixWorldNeedsUpdate=!0,V.jointRadius=E.radius;V.visible=E!==null}let H=q.joints["index-finger-tip"],U=q.joints["thumb-tip"],G=H.position.distanceTo(U.position),F=0.02,D=0.005;if(q.inputState.pinching&&G>F+D)q.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!q.inputState.pinching&&G<=F-D)q.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(X!==null&&J.gripSpace){if(W=$.getPose(J.gripSpace,Z),W!==null){if(X.matrix.fromArray(W.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,W.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy(W.linearVelocity);else X.hasLinearVelocity=!1;if(W.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy(W.angularVelocity);else X.hasAngularVelocity=!1}}if(Y!==null){if(Q=$.getPose(J.targetRaySpace,Z),Q===null&&W!==null)Q=W;if(Q!==null){if(Y.matrix.fromArray(Q.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Q.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Q.linearVelocity);else Y.hasLinearVelocity=!1;if(Q.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Q.angularVelocity);else Y.hasAngularVelocity=!1;this.dispatchEvent(_H)}}}if(Y!==null)Y.visible=Q!==null;if(X!==null)X.visible=W!==null;if(q!==null)q.visible=K!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Z=new N0;Z.matrixAutoUpdate=!1,Z.visible=!1,J.joints[$.jointName]=Z,J.add(Z)}return J.joints[$.jointName]}}class l6 extends mJ{constructor(J,$){super();let Z=this,Q=null,W=1,K=null,Y="local-floor",X=1,q=null,H=null,U=null,G=null,F=null,D=null,O=$.getContextAttributes(),E=null,V=null,R=[],N=[],B=new U0,I=null,L=new d9;L.layers.enable(1),L.viewport=new H9;let M=new d9;M.layers.enable(2),M.viewport=new H9;let A=[L,M],_=new p6;_.layers.enable(1),_.layers.enable(2);let z=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(f){let a=R[f];if(a===void 0)a=new h$,R[f]=a;return a.getTargetRaySpace()},this.getControllerGrip=function(f){let a=R[f];if(a===void 0)a=new h$,R[f]=a;return a.getGripSpace()},this.getHand=function(f){let a=R[f];if(a===void 0)a=new h$,R[f]=a;return a.getHandSpace()};function y(f){let a=N.indexOf(f.inputSource);if(a===-1)return;let Z0=R[a];if(Z0!==void 0)Z0.update(f.inputSource,f.frame,q||K),Z0.dispatchEvent({type:f.type,data:f.inputSource})}function o(){Q.removeEventListener("select",y),Q.removeEventListener("selectstart",y),Q.removeEventListener("selectend",y),Q.removeEventListener("squeeze",y),Q.removeEventListener("squeezestart",y),Q.removeEventListener("squeezeend",y),Q.removeEventListener("end",o),Q.removeEventListener("inputsourceschange",t);for(let f=0;f<R.length;f++){let a=N[f];if(a===null)continue;N[f]=null,R[f].disconnect(a)}z=null,k=null,J.setRenderTarget(E),F=null,G=null,U=null,Q=null,V=null,r.stop(),Z.isPresenting=!1,J.setPixelRatio(I),J.setSize(B.width,B.height,!1),Z.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(f){if(W=f,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(f){if(Y=f,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return q||K},this.setReferenceSpace=function(f){q=f},this.getBaseLayer=function(){return G!==null?G:F},this.getBinding=function(){return U},this.getFrame=function(){return D},this.getSession=function(){return Q},this.setSession=async function(f){if(Q=f,Q!==null){if(E=J.getRenderTarget(),Q.addEventListener("select",y),Q.addEventListener("selectstart",y),Q.addEventListener("selectend",y),Q.addEventListener("squeeze",y),Q.addEventListener("squeezestart",y),Q.addEventListener("squeezeend",y),Q.addEventListener("end",o),Q.addEventListener("inputsourceschange",t),O.xrCompatible!==!0)await $.makeXRCompatible();if(I=J.getPixelRatio(),J.getSize(B),Q.renderState.layers===void 0||J.capabilities.isWebGL2===!1){let a={antialias:Q.renderState.layers===void 0?O.antialias:!0,alpha:!0,depth:O.depth,stencil:O.stencil,framebufferScaleFactor:W};F=new XRWebGLLayer(Q,$,a),Q.updateRenderState({baseLayer:F}),J.setPixelRatio(1),J.setSize(F.framebufferWidth,F.framebufferHeight,!1),V=new eJ(F.framebufferWidth,F.framebufferHeight,{format:1023,type:1009,colorSpace:J.outputColorSpace,stencilBuffer:O.stencil})}else{let a=null,Z0=null,Y0=null;if(O.depth)Y0=O.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,a=O.stencil?1027:1026,Z0=O.stencil?1020:1014;let O0={colorFormat:$.RGBA8,depthFormat:Y0,scaleFactor:W};U=new XRWebGLBinding(Q,$),G=U.createProjectionLayer(O0),Q.updateRenderState({layers:[G]}),J.setPixelRatio(1),J.setSize(G.textureWidth,G.textureHeight,!1),V=new eJ(G.textureWidth,G.textureHeight,{format:1023,type:1009,depthTexture:new GQ(G.textureWidth,G.textureHeight,Z0,void 0,void 0,void 0,void 0,void 0,void 0,a),stencilBuffer:O.stencil,colorSpace:J.outputColorSpace,samples:O.antialias?4:0});let w0=J.properties.get(V);w0.__ignoreDepthValues=G.ignoreDepthValues}V.isXRRenderTarget=!0,this.setFoveation(X),q=null,K=await Q.requestReferenceSpace(Y),r.setContext(Q),r.start(),Z.isPresenting=!0,Z.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Q!==null)return Q.environmentBlendMode};function t(f){for(let a=0;a<f.removed.length;a++){let Z0=f.removed[a],Y0=N.indexOf(Z0);if(Y0>=0)N[Y0]=null,R[Y0].disconnect(Z0)}for(let a=0;a<f.added.length;a++){let Z0=f.added[a],Y0=N.indexOf(Z0);if(Y0===-1){for(let w0=0;w0<R.length;w0++)if(w0>=N.length){N.push(Z0),Y0=w0;break}else if(N[w0]===null){N[w0]=Z0,Y0=w0;break}if(Y0===-1)break}let O0=R[Y0];if(O0)O0.connect(Z0)}}let j=new T,m=new T;function d(f,a,Z0){j.setFromMatrixPosition(a.matrixWorld),m.setFromMatrixPosition(Z0.matrixWorld);let Y0=j.distanceTo(m),O0=a.projectionMatrix.elements,w0=Z0.projectionMatrix.elements,P0=O0[14]/(O0[10]-1),T0=O0[14]/(O0[10]+1),o0=(O0[9]+1)/O0[5],v=(O0[9]-1)/O0[5],M9=(O0[8]-1)/O0[0],p0=(w0[8]+1)/w0[0],M0=P0*M9,L0=P0*p0,x0=Y0/(-M9+p0),v0=x0*-M9;a.matrixWorld.decompose(f.position,f.quaternion,f.scale),f.translateX(v0),f.translateZ(x0),f.matrixWorld.compose(f.position,f.quaternion,f.scale),f.matrixWorldInverse.copy(f.matrixWorld).invert();let y0=P0+x0,S=T0+x0,C=M0-v0,u=L0+(Y0-v0),$0=o0*T0/S*y0,e=v*T0/S*y0;f.projectionMatrix.makePerspective(C,u,$0,e,y0,S),f.projectionMatrixInverse.copy(f.projectionMatrix).invert()}function i(f,a){if(a===null)f.matrixWorld.copy(f.matrix);else f.matrixWorld.multiplyMatrices(a.matrixWorld,f.matrix);f.matrixWorldInverse.copy(f.matrixWorld).invert()}this.updateCamera=function(f){if(Q===null)return;if(_.near=M.near=L.near=f.near,_.far=M.far=L.far=f.far,z!==_.near||k!==_.far)Q.updateRenderState({depthNear:_.near,depthFar:_.far}),z=_.near,k=_.far;let a=f.parent,Z0=_.cameras;i(_,a);for(let Y0=0;Y0<Z0.length;Y0++)i(Z0[Y0],a);if(Z0.length===2)d(_,L,M);else _.projectionMatrix.copy(L.projectionMatrix);n(f,_,a)};function n(f,a,Z0){if(Z0===null)f.matrix.copy(a.matrixWorld);else f.matrix.copy(Z0.matrixWorld),f.matrix.invert(),f.matrix.multiply(a.matrixWorld);if(f.matrix.decompose(f.position,f.quaternion,f.scale),f.updateMatrixWorld(!0),f.projectionMatrix.copy(a.projectionMatrix),f.projectionMatrixInverse.copy(a.projectionMatrixInverse),f.isPerspectiveCamera)f.fov=$7*2*Math.atan(1/f.projectionMatrix.elements[5]),f.zoom=1}this.getCamera=function(){return _},this.getFoveation=function(){if(G===null&&F===null)return;return X},this.setFoveation=function(f){if(X=f,G!==null)G.fixedFoveation=f;if(F!==null&&F.fixedFoveation!==void 0)F.fixedFoveation=f};let h=null;function l(f,a){if(H=a.getViewerPose(q||K),D=a,H!==null){let Z0=H.views;if(F!==null)J.setRenderTargetFramebuffer(V,F.framebuffer),J.setRenderTarget(V);let Y0=!1;if(Z0.length!==_.cameras.length)_.cameras.length=0,Y0=!0;for(let O0=0;O0<Z0.length;O0++){let w0=Z0[O0],P0=null;if(F!==null)P0=F.getViewport(w0);else{let o0=U.getViewSubImage(G,w0);if(P0=o0.viewport,O0===0)J.setRenderTargetTextures(V,o0.colorTexture,G.ignoreDepthValues?void 0:o0.depthStencilTexture),J.setRenderTarget(V)}let T0=A[O0];if(T0===void 0)T0=new d9,T0.layers.enable(O0),T0.viewport=new H9,A[O0]=T0;if(T0.matrix.fromArray(w0.transform.matrix),T0.matrix.decompose(T0.position,T0.quaternion,T0.scale),T0.projectionMatrix.fromArray(w0.projectionMatrix),T0.projectionMatrixInverse.copy(T0.projectionMatrix).invert(),T0.viewport.set(P0.x,P0.y,P0.width,P0.height),O0===0)_.matrix.copy(T0.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale);if(Y0===!0)_.cameras.push(T0)}}for(let Z0=0;Z0<R.length;Z0++){let Y0=N[Z0],O0=R[Z0];if(Y0!==null&&O0!==void 0)O0.update(Y0,a,q||K)}if(h)h(f,a);if(a.detectedPlanes)Z.dispatchEvent({type:"planesdetected",data:a});D=null}let r=new T6;r.setAnimationLoop(l),this.setAnimationLoop=function(f){h=f},this.dispose=function(){}}}function jH(J,$){function Z(V,R){if(V.matrixAutoUpdate===!0)V.updateMatrix();R.value.copy(V.matrix)}function Q(V,R){if(R.color.getRGB(V.fogColor.value,P6(J)),R.isFog)V.fogNear.value=R.near,V.fogFar.value=R.far;else if(R.isFogExp2)V.fogDensity.value=R.density}function W(V,R,N,B,I){if(R.isMeshBasicMaterial)K(V,R);else if(R.isMeshLambertMaterial)K(V,R);else if(R.isMeshToonMaterial)K(V,R),G(V,R);else if(R.isMeshPhongMaterial)K(V,R),U(V,R);else if(R.isMeshStandardMaterial){if(K(V,R),F(V,R),R.isMeshPhysicalMaterial)D(V,R,I)}else if(R.isMeshMatcapMaterial)K(V,R),O(V,R);else if(R.isMeshDepthMaterial)K(V,R);else if(R.isMeshDistanceMaterial)K(V,R),E(V,R);else if(R.isMeshNormalMaterial)K(V,R);else if(R.isLineBasicMaterial){if(Y(V,R),R.isLineDashedMaterial)X(V,R)}else if(R.isPointsMaterial)q(V,R,N,B);else if(R.isSpriteMaterial)H(V,R);else if(R.isShadowMaterial)V.color.value.copy(R.color),V.opacity.value=R.opacity;else if(R.isShaderMaterial)R.uniformsNeedUpdate=!1}function K(V,R){if(V.opacity.value=R.opacity,R.color)V.diffuse.value.copy(R.color);if(R.emissive)V.emissive.value.copy(R.emissive).multiplyScalar(R.emissiveIntensity);if(R.map)V.map.value=R.map,Z(R.map,V.mapTransform);if(R.alphaMap)V.alphaMap.value=R.alphaMap,Z(R.alphaMap,V.alphaMapTransform);if(R.bumpMap){if(V.bumpMap.value=R.bumpMap,Z(R.bumpMap,V.bumpMapTransform),V.bumpScale.value=R.bumpScale,R.side===1)V.bumpScale.value*=-1}if(R.normalMap){if(V.normalMap.value=R.normalMap,Z(R.normalMap,V.normalMapTransform),V.normalScale.value.copy(R.normalScale),R.side===1)V.normalScale.value.negate()}if(R.displacementMap)V.displacementMap.value=R.displacementMap,Z(R.displacementMap,V.displacementMapTransform),V.displacementScale.value=R.displacementScale,V.displacementBias.value=R.displacementBias;if(R.emissiveMap)V.emissiveMap.value=R.emissiveMap,Z(R.emissiveMap,V.emissiveMapTransform);if(R.specularMap)V.specularMap.value=R.specularMap,Z(R.specularMap,V.specularMapTransform);if(R.alphaTest>0)V.alphaTest.value=R.alphaTest;let N=$.get(R).envMap;if(N)V.envMap.value=N,V.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,V.reflectivity.value=R.reflectivity,V.ior.value=R.ior,V.refractionRatio.value=R.refractionRatio;if(R.lightMap){V.lightMap.value=R.lightMap;let B=J._useLegacyLights===!0?Math.PI:1;V.lightMapIntensity.value=R.lightMapIntensity*B,Z(R.lightMap,V.lightMapTransform)}if(R.aoMap)V.aoMap.value=R.aoMap,V.aoMapIntensity.value=R.aoMapIntensity,Z(R.aoMap,V.aoMapTransform)}function Y(V,R){if(V.diffuse.value.copy(R.color),V.opacity.value=R.opacity,R.map)V.map.value=R.map,Z(R.map,V.mapTransform)}function X(V,R){V.dashSize.value=R.dashSize,V.totalSize.value=R.dashSize+R.gapSize,V.scale.value=R.scale}function q(V,R,N,B){if(V.diffuse.value.copy(R.color),V.opacity.value=R.opacity,V.size.value=R.size*N,V.scale.value=B*0.5,R.map)V.map.value=R.map,Z(R.map,V.uvTransform);if(R.alphaMap)V.alphaMap.value=R.alphaMap,Z(R.alphaMap,V.alphaMapTransform);if(R.alphaTest>0)V.alphaTest.value=R.alphaTest}function H(V,R){if(V.diffuse.value.copy(R.color),V.opacity.value=R.opacity,V.rotation.value=R.rotation,R.map)V.map.value=R.map,Z(R.map,V.mapTransform);if(R.alphaMap)V.alphaMap.value=R.alphaMap,Z(R.alphaMap,V.alphaMapTransform);if(R.alphaTest>0)V.alphaTest.value=R.alphaTest}function U(V,R){V.specular.value.copy(R.specular),V.shininess.value=Math.max(R.shininess,0.0001)}function G(V,R){if(R.gradientMap)V.gradientMap.value=R.gradientMap}function F(V,R){if(V.metalness.value=R.metalness,R.metalnessMap)V.metalnessMap.value=R.metalnessMap,Z(R.metalnessMap,V.metalnessMapTransform);if(V.roughness.value=R.roughness,R.roughnessMap)V.roughnessMap.value=R.roughnessMap,Z(R.roughnessMap,V.roughnessMapTransform);if($.get(R).envMap)V.envMapIntensity.value=R.envMapIntensity}function D(V,R,N){if(V.ior.value=R.ior,R.sheen>0){if(V.sheenColor.value.copy(R.sheenColor).multiplyScalar(R.sheen),V.sheenRoughness.value=R.sheenRoughness,R.sheenColorMap)V.sheenColorMap.value=R.sheenColorMap,Z(R.sheenColorMap,V.sheenColorMapTransform);if(R.sheenRoughnessMap)V.sheenRoughnessMap.value=R.sheenRoughnessMap,Z(R.sheenRoughnessMap,V.sheenRoughnessMapTransform)}if(R.clearcoat>0){if(V.clearcoat.value=R.clearcoat,V.clearcoatRoughness.value=R.clearcoatRoughness,R.clearcoatMap)V.clearcoatMap.value=R.clearcoatMap,Z(R.clearcoatMap,V.clearcoatMapTransform);if(R.clearcoatRoughnessMap)V.clearcoatRoughnessMap.value=R.clearcoatRoughnessMap,Z(R.clearcoatRoughnessMap,V.clearcoatRoughnessMapTransform);if(R.clearcoatNormalMap){if(V.clearcoatNormalMap.value=R.clearcoatNormalMap,Z(R.clearcoatNormalMap,V.clearcoatNormalMapTransform),V.clearcoatNormalScale.value.copy(R.clearcoatNormalScale),R.side===1)V.clearcoatNormalScale.value.negate()}}if(R.iridescence>0){if(V.iridescence.value=R.iridescence,V.iridescenceIOR.value=R.iridescenceIOR,V.iridescenceThicknessMinimum.value=R.iridescenceThicknessRange[0],V.iridescenceThicknessMaximum.value=R.iridescenceThicknessRange[1],R.iridescenceMap)V.iridescenceMap.value=R.iridescenceMap,Z(R.iridescenceMap,V.iridescenceMapTransform);if(R.iridescenceThicknessMap)V.iridescenceThicknessMap.value=R.iridescenceThicknessMap,Z(R.iridescenceThicknessMap,V.iridescenceThicknessMapTransform)}if(R.transmission>0){if(V.transmission.value=R.transmission,V.transmissionSamplerMap.value=N.texture,V.transmissionSamplerSize.value.set(N.width,N.height),R.transmissionMap)V.transmissionMap.value=R.transmissionMap,Z(R.transmissionMap,V.transmissionMapTransform);if(V.thickness.value=R.thickness,R.thicknessMap)V.thicknessMap.value=R.thicknessMap,Z(R.thicknessMap,V.thicknessMapTransform);V.attenuationDistance.value=R.attenuationDistance,V.attenuationColor.value.copy(R.attenuationColor)}if(R.anisotropy>0){if(V.anisotropyVector.value.set(R.anisotropy*Math.cos(R.anisotropyRotation),R.anisotropy*Math.sin(R.anisotropyRotation)),R.anisotropyMap)V.anisotropyMap.value=R.anisotropyMap,Z(R.anisotropyMap,V.anisotropyMapTransform)}if(V.specularIntensity.value=R.specularIntensity,V.specularColor.value.copy(R.specularColor),R.specularColorMap)V.specularColorMap.value=R.specularColorMap,Z(R.specularColorMap,V.specularColorMapTransform);if(R.specularIntensityMap)V.specularIntensityMap.value=R.specularIntensityMap,Z(R.specularIntensityMap,V.specularIntensityMapTransform)}function O(V,R){if(R.matcap)V.matcap.value=R.matcap}function E(V,R){let N=$.get(R).light;V.referencePosition.value.setFromMatrixPosition(N.matrixWorld),V.nearDistance.value=N.shadow.camera.near,V.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:Q,refreshMaterialUniforms:W}}function bH(J,$,Z,Q){let W={},K={},Y=[],X=Z.isWebGL2?J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS):0;function q(N,B){let I=B.program;Q.uniformBlockBinding(N,I)}function H(N,B){let I=W[N.id];if(I===void 0)O(N),I=U(N),W[N.id]=I,N.addEventListener("dispose",V);let L=B.program;Q.updateUBOMapping(N,L);let M=$.render.frame;if(K[N.id]!==M)F(N),K[N.id]=M}function U(N){let B=G();N.__bindingPointIndex=B;let I=J.createBuffer(),L=N.__size,M=N.usage;return J.bindBuffer(J.UNIFORM_BUFFER,I),J.bufferData(J.UNIFORM_BUFFER,L,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,B,I),I}function G(){for(let N=0;N<X;N++)if(Y.indexOf(N)===-1)return Y.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function F(N){let B=W[N.id],I=N.uniforms,L=N.__cache;J.bindBuffer(J.UNIFORM_BUFFER,B);for(let M=0,A=I.length;M<A;M++){let _=Array.isArray(I[M])?I[M]:[I[M]];for(let z=0,k=_.length;z<k;z++){let y=_[z];if(D(y,M,z,L)===!0){let o=y.__offset,t=Array.isArray(y.value)?y.value:[y.value],j=0;for(let m=0;m<t.length;m++){let d=t[m],i=E(d);if(typeof d==="number"||typeof d==="boolean")y.__data[0]=d,J.bufferSubData(J.UNIFORM_BUFFER,o+j,y.__data);else if(d.isMatrix3)y.__data[0]=d.elements[0],y.__data[1]=d.elements[1],y.__data[2]=d.elements[2],y.__data[3]=0,y.__data[4]=d.elements[3],y.__data[5]=d.elements[4],y.__data[6]=d.elements[5],y.__data[7]=0,y.__data[8]=d.elements[6],y.__data[9]=d.elements[7],y.__data[10]=d.elements[8],y.__data[11]=0;else d.toArray(y.__data,j),j+=i.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,o,y.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(N,B,I,L){let M=N.value,A=B+"_"+I;if(L[A]===void 0){if(typeof M==="number"||typeof M==="boolean")L[A]=M;else L[A]=M.clone();return!0}else{let _=L[A];if(typeof M==="number"||typeof M==="boolean"){if(_!==M)return L[A]=M,!0}else if(_.equals(M)===!1)return _.copy(M),!0}return!1}function O(N){let B=N.uniforms,I=0,L=16;for(let A=0,_=B.length;A<_;A++){let z=Array.isArray(B[A])?B[A]:[B[A]];for(let k=0,y=z.length;k<y;k++){let o=z[k],t=Array.isArray(o.value)?o.value:[o.value];for(let j=0,m=t.length;j<m;j++){let d=t[j],i=E(d),n=I%L;if(n!==0&&L-n<i.boundary)I+=L-n;o.__data=new Float32Array(i.storage/Float32Array.BYTES_PER_ELEMENT),o.__offset=I,I+=i.storage}}}let M=I%L;if(M>0)I+=L-M;return N.__size=I,N.__cache={},this}function E(N){let B={boundary:0,storage:0};if(typeof N==="number"||typeof N==="boolean")B.boundary=4,B.storage=4;else if(N.isVector2)B.boundary=8,B.storage=8;else if(N.isVector3||N.isColor)B.boundary=16,B.storage=12;else if(N.isVector4)B.boundary=16,B.storage=16;else if(N.isMatrix3)B.boundary=48,B.storage=48;else if(N.isMatrix4)B.boundary=64,B.storage=64;else if(N.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N);return B}function V(N){let B=N.target;B.removeEventListener("dispose",V);let I=Y.indexOf(B.__bindingPointIndex);Y.splice(I,1),J.deleteBuffer(W[B.id]),delete W[B.id],delete K[B.id]}function R(){for(let N in W)J.deleteBuffer(W[N]);Y=[],W={},K={}}return{bind:q,update:H,dispose:R}}class n${constructor(J={}){let{canvas:$=dK(),context:Z=null,depth:Q=!0,stencil:W=!0,alpha:K=!1,antialias:Y=!1,premultipliedAlpha:X=!0,preserveDrawingBuffer:q=!1,powerPreference:H="default",failIfMajorPerformanceCaveat:U=!1}=J;this.isWebGLRenderer=!0;let G;if(Z!==null)G=Z.getContextAttributes().alpha;else G=K;let F=new Uint32Array(4),D=new Int32Array(4),O=null,E=null,V=[],R=[];this.domElement=$,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace="srgb",this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let N=this,B=!1,I=0,L=0,M=null,A=-1,_=null,z=new H9,k=new H9,y=null,o=new a0(0),t=0,j=$.width,m=$.height,d=1,i=null,n=null,h=new H9(0,0,j,m),l=new H9(0,0,j,m),r=!1,f=new l$,a=!1,Z0=!1,Y0=null,O0=new Y9,w0=new U0,P0=new T,T0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function o0(){return M===null?d:1}let v=Z;function M9(P,g){for(let c=0;c<P.length;c++){let s=P[c],p=$.getContext(s,g);if(p!==null)return p}return null}try{let P={alpha:!0,depth:Q,stencil:W,antialias:Y,premultipliedAlpha:X,preserveDrawingBuffer:q,powerPreference:H,failIfMajorPerformanceCaveat:U};if("setAttribute"in $)$.setAttribute("data-engine","three.js r160");if($.addEventListener("webglcontextlost",h0,!1),$.addEventListener("webglcontextrestored",q0,!1),$.addEventListener("webglcontextcreationerror",x,!1),v===null){let g=["webgl2","webgl","experimental-webgl"];if(N.isWebGL1Renderer===!0)g.shift();if(v=M9(g,P),v===null)if(M9(g))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}if(typeof WebGLRenderingContext<"u"&&v instanceof WebGLRenderingContext)console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.");if(v.getShaderPrecisionFormat===void 0)v.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let p0,M0,L0,x0,v0,y0,S,C,u,$0,e,Q0,S0,G0,E0,C0,g0,W0,B9,l0,b0,D0,w,K0;function B0(){p0=new t1(v),M0=new n1(v,p0,J),p0.init(M0),D0=new TH(v,p0,M0),L0=new SH(v,p0,M0),x0=new $q(v),v0=new EH,y0=new wH(v,p0,L0,v0,M0,D0,x0),S=new o1(N),C=new a1(N),u=new HX(v,M0),w=new l1(v,p0,u,M0),$0=new e1(v,u,x0,w),e=new Kq(v,$0,u,x0),B9=new Wq(v,M0,y0),C0=new s1(v0),Q0=new DH(N,S,C,p0,M0,w,C0),S0=new jH(N,v0),G0=new NH,E0=new CH(p0,M0),W0=new p1(N,S,C,L0,e,G,X),g0=new PH(N,e,M0),K0=new bH(v,x0,M0,L0),l0=new c1(v,p0,x0,M0),b0=new Jq(v,p0,x0,M0),x0.programs=Q0.programs,N.capabilities=M0,N.extensions=p0,N.properties=v0,N.renderLists=G0,N.shadowMap=g0,N.state=L0,N.info=x0}B0();let z0=new l6(N,v);this.xr=z0,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){let P=p0.get("WEBGL_lose_context");if(P)P.loseContext()},this.forceContextRestore=function(){let P=p0.get("WEBGL_lose_context");if(P)P.restoreContext()},this.getPixelRatio=function(){return d},this.setPixelRatio=function(P){if(P===void 0)return;d=P,this.setSize(j,m,!1)},this.getSize=function(P){return P.set(j,m)},this.setSize=function(P,g,c=!0){if(z0.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(j=P,m=g,$.width=Math.floor(P*d),$.height=Math.floor(g*d),c===!0)$.style.width=P+"px",$.style.height=g+"px";this.setViewport(0,0,P,g)},this.getDrawingBufferSize=function(P){return P.set(j*d,m*d).floor()},this.setDrawingBufferSize=function(P,g,c){j=P,m=g,d=c,$.width=Math.floor(P*c),$.height=Math.floor(g*c),this.setViewport(0,0,P,g)},this.getCurrentViewport=function(P){return P.copy(z)},this.getViewport=function(P){return P.copy(h)},this.setViewport=function(P,g,c,s){if(P.isVector4)h.set(P.x,P.y,P.z,P.w);else h.set(P,g,c,s);L0.viewport(z.copy(h).multiplyScalar(d).floor())},this.getScissor=function(P){return P.copy(l)},this.setScissor=function(P,g,c,s){if(P.isVector4)l.set(P.x,P.y,P.z,P.w);else l.set(P,g,c,s);L0.scissor(k.copy(l).multiplyScalar(d).floor())},this.getScissorTest=function(){return r},this.setScissorTest=function(P){L0.setScissorTest(r=P)},this.setOpaqueSort=function(P){i=P},this.setTransparentSort=function(P){n=P},this.getClearColor=function(P){return P.copy(W0.getClearColor())},this.setClearColor=function(){W0.setClearColor.apply(W0,arguments)},this.getClearAlpha=function(){return W0.getClearAlpha()},this.setClearAlpha=function(){W0.setClearAlpha.apply(W0,arguments)},this.clear=function(P=!0,g=!0,c=!0){let s=0;if(P){let p=!1;if(M!==null){let R0=M.texture.format;p=R0===1033||R0===1031||R0===1029}if(p){let R0=M.texture.type,A0=R0===1009||R0===1014||R0===1012||R0===1020||R0===1017||R0===1018,j0=W0.getClearColor(),f0=W0.getClearAlpha(),c0=j0.r,m0=j0.g,u0=j0.b;if(A0)F[0]=c0,F[1]=m0,F[2]=u0,F[3]=f0,v.clearBufferuiv(v.COLOR,0,F);else D[0]=c0,D[1]=m0,D[2]=u0,D[3]=f0,v.clearBufferiv(v.COLOR,0,D)}else s|=v.COLOR_BUFFER_BIT}if(g)s|=v.DEPTH_BUFFER_BIT;if(c)s|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);v.clear(s)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){if($.removeEventListener("webglcontextlost",h0,!1),$.removeEventListener("webglcontextrestored",q0,!1),$.removeEventListener("webglcontextcreationerror",x,!1),G0.dispose(),E0.dispose(),v0.dispose(),S.dispose(),C.dispose(),e.dispose(),w.dispose(),K0.dispose(),Q0.dispose(),z0.dispose(),z0.removeEventListener("sessionstart",q9),z0.removeEventListener("sessionend",C9),Y0)Y0.dispose(),Y0=null;r0.stop()};function h0(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function q0(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;let P=x0.autoReset,g=g0.enabled,c=g0.autoUpdate,s=g0.needsUpdate,p=g0.type;B0(),x0.autoReset=P,g0.enabled=g,g0.autoUpdate=c,g0.needsUpdate=s,g0.type=p}function x(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function F0(P){let g=P.target;g.removeEventListener("dispose",F0),V0(g)}function V0(P){_0(P),v0.remove(P)}function _0(P){let g=v0.get(P).programs;if(g!==void 0){if(g.forEach(function(c){Q0.releaseProgram(c)}),P.isShaderMaterial)Q0.releaseShaderCache(P)}}this.renderBufferDirect=function(P,g,c,s,p,R0){if(g===null)g=T0;let A0=p.isMesh&&p.matrixWorld.determinant()<0,j0=CK(P,g,c,s,p);L0.setMaterial(s,A0);let f0=c.index,c0=1;if(s.wireframe===!0){if(f0=$0.getWireframeAttribute(c),f0===void 0)return;c0=2}let m0=c.drawRange,u0=c.attributes.position,A9=m0.start*c0,QJ=(m0.start+m0.count)*c0;if(R0!==null)A9=Math.max(A9,R0.start*c0),QJ=Math.min(QJ,(R0.start+R0.count)*c0);if(f0!==null)A9=Math.max(A9,0),QJ=Math.min(QJ,f0.count);else if(u0!==void 0&&u0!==null)A9=Math.max(A9,0),QJ=Math.min(QJ,u0.count);let j9=QJ-A9;if(j9<0||j9===1/0)return;w.setup(p,s,j0,c,f0);let bJ,V9=l0;if(f0!==null)bJ=u.get(f0),V9=b0,V9.setIndex(bJ);if(p.isMesh)if(s.wireframe===!0)L0.setLineWidth(s.wireframeLinewidth*o0()),V9.setMode(v.LINES);else V9.setMode(v.TRIANGLES);else if(p.isLine){let n0=s.linewidth;if(n0===void 0)n0=1;if(L0.setLineWidth(n0*o0()),p.isLineSegments)V9.setMode(v.LINES);else if(p.isLineLoop)V9.setMode(v.LINE_LOOP);else V9.setMode(v.LINE_STRIP)}else if(p.isPoints)V9.setMode(v.POINTS);else if(p.isSprite)V9.setMode(v.TRIANGLES);if(p.isBatchedMesh)V9.renderMultiDraw(p._multiDrawStarts,p._multiDrawCounts,p._multiDrawCount);else if(p.isInstancedMesh)V9.renderInstances(A9,j9,p.count);else if(c.isInstancedBufferGeometry){let n0=c._maxInstanceCount!==void 0?c._maxInstanceCount:1/0,EZ=Math.min(c.instanceCount,n0);V9.renderInstances(A9,j9,EZ)}else V9.render(A9,j9)};function I0(P,g,c){if(P.transparent===!0&&P.side===2&&P.forceSinglePass===!1)P.side=1,P.needsUpdate=!0,X$(P,g,c),P.side=0,P.needsUpdate=!0,X$(P,g,c),P.side=2;else X$(P,g,c)}this.compile=function(P,g,c=null){if(c===null)c=P;if(E=E0.get(c),E.init(),R.push(E),c.traverseVisible(function(p){if(p.isLight&&p.layers.test(g.layers)){if(E.pushLight(p),p.castShadow)E.pushShadow(p)}}),P!==c)P.traverseVisible(function(p){if(p.isLight&&p.layers.test(g.layers)){if(E.pushLight(p),p.castShadow)E.pushShadow(p)}});E.setupLights(N._useLegacyLights);let s=new Set;return P.traverse(function(p){let R0=p.material;if(R0)if(Array.isArray(R0))for(let A0=0;A0<R0.length;A0++){let j0=R0[A0];I0(j0,c,p),s.add(j0)}else I0(R0,c,p),s.add(R0)}),R.pop(),E=null,s},this.compileAsync=function(P,g,c=null){let s=this.compile(P,g,c);return new Promise((p)=>{function R0(){if(s.forEach(function(A0){if(v0.get(A0).currentProgram.isReady())s.delete(A0)}),s.size===0){p(P);return}setTimeout(R0,10)}if(p0.get("KHR_parallel_shader_compile")!==null)R0();else setTimeout(R0,10)})};let i0=null;function $9(P){if(i0)i0(P)}function q9(){r0.stop()}function C9(){r0.start()}let r0=new T6;if(r0.setAnimationLoop($9),typeof self<"u")r0.setContext(self);this.setAnimationLoop=function(P){i0=P,z0.setAnimationLoop(P),P===null?r0.stop():r0.start()},z0.addEventListener("sessionstart",q9),z0.addEventListener("sessionend",C9),this.render=function(P,g){if(g!==void 0&&g.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(P.matrixWorldAutoUpdate===!0)P.updateMatrixWorld();if(g.parent===null&&g.matrixWorldAutoUpdate===!0)g.updateMatrixWorld();if(z0.enabled===!0&&z0.isPresenting===!0){if(z0.cameraAutoUpdate===!0)z0.updateCamera(g);g=z0.getCamera()}if(P.isScene===!0)P.onBeforeRender(N,P,g,M);if(E=E0.get(P,R.length),E.init(),R.push(E),O0.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse),f.setFromProjectionMatrix(O0),Z0=this.localClippingEnabled,a=C0.init(this.clippingPlanes,Z0),O=G0.get(P,V.length),O.init(),V.push(O),BJ(P,g,0,N.sortObjects),O.finish(),N.sortObjects===!0)O.sort(i,n);if(this.info.render.frame++,a===!0)C0.beginShadows();let c=E.state.shadowsArray;if(g0.render(c,P,g),a===!0)C0.endShadows();if(this.info.autoReset===!0)this.info.reset();if(W0.render(O,P),E.setupLights(N._useLegacyLights),g.isArrayCamera){let s=g.cameras;for(let p=0,R0=s.length;p<R0;p++){let A0=s[p];zJ(O,P,A0,A0.viewport)}}else zJ(O,P,g);if(M!==null)y0.updateMultisampleRenderTarget(M),y0.updateRenderTargetMipmap(M);if(P.isScene===!0)P.onAfterRender(N,P,g);if(w.resetDefaultState(),A=-1,_=null,R.pop(),R.length>0)E=R[R.length-1];else E=null;if(V.pop(),V.length>0)O=V[V.length-1];else O=null};function BJ(P,g,c,s){if(P.visible===!1)return;if(P.layers.test(g.layers)){if(P.isGroup)c=P.renderOrder;else if(P.isLOD){if(P.autoUpdate===!0)P.update(g)}else if(P.isLight){if(E.pushLight(P),P.castShadow)E.pushShadow(P)}else if(P.isSprite){if(!P.frustumCulled||f.intersectsSprite(P)){if(s)P0.setFromMatrixPosition(P.matrixWorld).applyMatrix4(O0);let A0=e.update(P),j0=P.material;if(j0.visible)O.push(P,A0,j0,c,P0.z,null)}}else if(P.isMesh||P.isLine||P.isPoints){if(!P.frustumCulled||f.intersectsObject(P)){let A0=e.update(P),j0=P.material;if(s){if(P.boundingSphere!==void 0){if(P.boundingSphere===null)P.computeBoundingSphere();P0.copy(P.boundingSphere.center)}else{if(A0.boundingSphere===null)A0.computeBoundingSphere();P0.copy(A0.boundingSphere.center)}P0.applyMatrix4(P.matrixWorld).applyMatrix4(O0)}if(Array.isArray(j0)){let f0=A0.groups;for(let c0=0,m0=f0.length;c0<m0;c0++){let u0=f0[c0],A9=j0[u0.materialIndex];if(A9&&A9.visible)O.push(P,A0,A9,c,P0.z,u0)}}else if(j0.visible)O.push(P,A0,j0,c,P0.z,null)}}}let R0=P.children;for(let A0=0,j0=R0.length;A0<j0;A0++)BJ(R0[A0],g,c,s)}function zJ(P,g,c,s){let{opaque:p,transmissive:R0,transparent:A0}=P;if(E.setupLightsView(c),a===!0)C0.setGlobalState(N.clippingPlanes,c);if(R0.length>0)MK(p,R0,g,c);if(s)L0.viewport(z.copy(s));if(p.length>0)K$(p,g,c);if(R0.length>0)K$(R0,g,c);if(A0.length>0)K$(A0,g,c);L0.buffers.depth.setTest(!0),L0.buffers.depth.setMask(!0),L0.buffers.color.setMask(!0),L0.setPolygonOffset(!1)}function MK(P,g,c,s){if((c.isScene===!0?c.overrideMaterial:null)!==null)return;let R0=M0.isWebGL2;if(Y0===null)Y0=new eJ(1,1,{generateMipmaps:!0,type:p0.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:R0?4:0});if(N.getDrawingBufferSize(w0),R0)Y0.setSize(w0.x,w0.y);else Y0.setSize(v$(w0.x),v$(w0.y));let A0=N.getRenderTarget();if(N.setRenderTarget(Y0),N.getClearColor(o),t=N.getClearAlpha(),t<1)N.setClearColor(16777215,0.5);N.clear();let j0=N.toneMapping;N.toneMapping=0,K$(P,c,s),y0.updateMultisampleRenderTarget(Y0),y0.updateRenderTargetMipmap(Y0);let f0=!1;for(let c0=0,m0=g.length;c0<m0;c0++){let u0=g[c0],A9=u0.object,QJ=u0.geometry,j9=u0.material,bJ=u0.group;if(j9.side===2&&A9.layers.test(s.layers)){let V9=j9.side;j9.side=1,j9.needsUpdate=!0,N5(A9,c,s,QJ,j9,bJ),j9.side=V9,j9.needsUpdate=!0,f0=!0}}if(f0===!0)y0.updateMultisampleRenderTarget(Y0),y0.updateRenderTargetMipmap(Y0);N.setRenderTarget(A0),N.setClearColor(o,t),N.toneMapping=j0}function K$(P,g,c){let s=g.isScene===!0?g.overrideMaterial:null;for(let p=0,R0=P.length;p<R0;p++){let A0=P[p],j0=A0.object,f0=A0.geometry,c0=s===null?A0.material:s,m0=A0.group;if(j0.layers.test(c.layers))N5(j0,g,c,f0,c0,m0)}}function N5(P,g,c,s,p,R0){if(P.onBeforeRender(N,g,c,s,p,R0),P.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),p.onBeforeRender(N,g,c,s,P,R0),p.transparent===!0&&p.side===2&&p.forceSinglePass===!1)p.side=1,p.needsUpdate=!0,N.renderBufferDirect(c,g,s,p,P,R0),p.side=0,p.needsUpdate=!0,N.renderBufferDirect(c,g,s,p,P,R0),p.side=2;else N.renderBufferDirect(c,g,s,p,P,R0);P.onAfterRender(N,g,c,s,p,R0)}function X$(P,g,c){if(g.isScene!==!0)g=T0;let s=v0.get(P),p=E.state.lights,R0=E.state.shadowsArray,A0=p.state.version,j0=Q0.getParameters(P,p.state,R0,g,c),f0=Q0.getProgramCacheKey(j0),c0=s.programs;if(s.environment=P.isMeshStandardMaterial?g.environment:null,s.fog=g.fog,s.envMap=(P.isMeshStandardMaterial?C:S).get(P.envMap||s.environment),c0===void 0)P.addEventListener("dispose",F0),c0=new Map,s.programs=c0;let m0=c0.get(f0);if(m0!==void 0){if(s.currentProgram===m0&&s.lightsStateVersion===A0)return z5(P,j0),m0}else j0.uniforms=Q0.getUniforms(P),P.onBuild(c,j0,N),P.onBeforeCompile(j0,N),m0=Q0.acquireProgram(j0,f0),c0.set(f0,m0),s.uniforms=j0.uniforms;let u0=s.uniforms;if(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)u0.clippingPlanes=C0.uniform;if(z5(P,j0),s.needsLights=kK(P),s.lightsStateVersion=A0,s.needsLights)u0.ambientLightColor.value=p.state.ambient,u0.lightProbe.value=p.state.probe,u0.directionalLights.value=p.state.directional,u0.directionalLightShadows.value=p.state.directionalShadow,u0.spotLights.value=p.state.spot,u0.spotLightShadows.value=p.state.spotShadow,u0.rectAreaLights.value=p.state.rectArea,u0.ltc_1.value=p.state.rectAreaLTC1,u0.ltc_2.value=p.state.rectAreaLTC2,u0.pointLights.value=p.state.point,u0.pointLightShadows.value=p.state.pointShadow,u0.hemisphereLights.value=p.state.hemi,u0.directionalShadowMap.value=p.state.directionalShadowMap,u0.directionalShadowMatrix.value=p.state.directionalShadowMatrix,u0.spotShadowMap.value=p.state.spotShadowMap,u0.spotLightMatrix.value=p.state.spotLightMatrix,u0.spotLightMap.value=p.state.spotLightMap,u0.pointShadowMap.value=p.state.pointShadowMap,u0.pointShadowMatrix.value=p.state.pointShadowMatrix;return s.currentProgram=m0,s.uniformsList=null,m0}function B5(P){if(P.uniformsList===null){let g=P.currentProgram.getUniforms();P.uniformsList=b7.seqWithValue(g.seq,P.uniforms)}return P.uniformsList}function z5(P,g){let c=v0.get(P);c.outputColorSpace=g.outputColorSpace,c.batching=g.batching,c.instancing=g.instancing,c.instancingColor=g.instancingColor,c.skinning=g.skinning,c.morphTargets=g.morphTargets,c.morphNormals=g.morphNormals,c.morphColors=g.morphColors,c.morphTargetsCount=g.morphTargetsCount,c.numClippingPlanes=g.numClippingPlanes,c.numIntersection=g.numClipIntersection,c.vertexAlphas=g.vertexAlphas,c.vertexTangents=g.vertexTangents,c.toneMapping=g.toneMapping}function CK(P,g,c,s,p){if(g.isScene!==!0)g=T0;y0.resetTextureUnits();let R0=g.fog,A0=s.isMeshStandardMaterial?g.environment:null,j0=M===null?N.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:"srgb-linear",f0=(s.isMeshStandardMaterial?C:S).get(s.envMap||A0),c0=s.vertexColors===!0&&!!c.attributes.color&&c.attributes.color.itemSize===4,m0=!!c.attributes.tangent&&(!!s.normalMap||s.anisotropy>0),u0=!!c.morphAttributes.position,A9=!!c.morphAttributes.normal,QJ=!!c.morphAttributes.color,j9=0;if(s.toneMapped){if(M===null||M.isXRRenderTarget===!0)j9=N.toneMapping}let bJ=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,V9=bJ!==void 0?bJ.length:0,n0=v0.get(s),EZ=E.state.lights;if(a===!0){if(Z0===!0||P!==_){let HJ=P===_&&s.id===A;C0.setState(s,P,HJ)}}let z9=!1;if(s.version===n0.__version){if(n0.needsLights&&n0.lightsStateVersion!==EZ.state.version)z9=!0;else if(n0.outputColorSpace!==j0)z9=!0;else if(p.isBatchedMesh&&n0.batching===!1)z9=!0;else if(!p.isBatchedMesh&&n0.batching===!0)z9=!0;else if(p.isInstancedMesh&&n0.instancing===!1)z9=!0;else if(!p.isInstancedMesh&&n0.instancing===!0)z9=!0;else if(p.isSkinnedMesh&&n0.skinning===!1)z9=!0;else if(!p.isSkinnedMesh&&n0.skinning===!0)z9=!0;else if(p.isInstancedMesh&&n0.instancingColor===!0&&p.instanceColor===null)z9=!0;else if(p.isInstancedMesh&&n0.instancingColor===!1&&p.instanceColor!==null)z9=!0;else if(n0.envMap!==f0)z9=!0;else if(s.fog===!0&&n0.fog!==R0)z9=!0;else if(n0.numClippingPlanes!==void 0&&(n0.numClippingPlanes!==C0.numPlanes||n0.numIntersection!==C0.numIntersection))z9=!0;else if(n0.vertexAlphas!==c0)z9=!0;else if(n0.vertexTangents!==m0)z9=!0;else if(n0.morphTargets!==u0)z9=!0;else if(n0.morphNormals!==A9)z9=!0;else if(n0.morphColors!==QJ)z9=!0;else if(n0.toneMapping!==j9)z9=!0;else if(M0.isWebGL2===!0&&n0.morphTargetsCount!==V9)z9=!0}else z9=!0,n0.__version=s.version;let G8=n0.currentProgram;if(z9===!0)G8=X$(s,g,p);let I5=!1,I7=!1,OZ=!1,g9=G8.getUniforms(),F8=n0.uniforms;if(L0.useProgram(G8.program))I5=!0,I7=!0,OZ=!0;if(s.id!==A)A=s.id,I7=!0;if(I5||_!==P){g9.setValue(v,"projectionMatrix",P.projectionMatrix),g9.setValue(v,"viewMatrix",P.matrixWorldInverse);let HJ=g9.map.cameraPosition;if(HJ!==void 0)HJ.setValue(v,P0.setFromMatrixPosition(P.matrixWorld));if(M0.logarithmicDepthBuffer)g9.setValue(v,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2));if(s.isMeshPhongMaterial||s.isMeshToonMaterial||s.isMeshLambertMaterial||s.isMeshBasicMaterial||s.isMeshStandardMaterial||s.isShaderMaterial)g9.setValue(v,"isOrthographic",P.isOrthographicCamera===!0);if(_!==P)_=P,I7=!0,OZ=!0}if(p.isSkinnedMesh){g9.setOptional(v,p,"bindMatrix"),g9.setOptional(v,p,"bindMatrixInverse");let HJ=p.skeleton;if(HJ)if(M0.floatVertexTextures){if(HJ.boneTexture===null)HJ.computeBoneTexture();g9.setValue(v,"boneTexture",HJ.boneTexture,y0)}else console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.")}if(p.isBatchedMesh)g9.setOptional(v,p,"batchingTexture"),g9.setValue(v,"batchingTexture",p._matricesTexture,y0);let NZ=c.morphAttributes;if(NZ.position!==void 0||NZ.normal!==void 0||NZ.color!==void 0&&M0.isWebGL2===!0)B9.update(p,c,G8);if(I7||n0.receiveShadow!==p.receiveShadow)n0.receiveShadow=p.receiveShadow,g9.setValue(v,"receiveShadow",p.receiveShadow);if(s.isMeshGouraudMaterial&&s.envMap!==null)F8.envMap.value=f0,F8.flipEnvMap.value=f0.isCubeTexture&&f0.isRenderTargetTexture===!1?-1:1;if(I7){if(g9.setValue(v,"toneMappingExposure",N.toneMappingExposure),n0.needsLights)AK(F8,OZ);if(R0&&s.fog===!0)S0.refreshFogUniforms(F8,R0);S0.refreshMaterialUniforms(F8,s,d,m,Y0),b7.upload(v,B5(n0),F8,y0)}if(s.isShaderMaterial&&s.uniformsNeedUpdate===!0)b7.upload(v,B5(n0),F8,y0),s.uniformsNeedUpdate=!1;if(s.isSpriteMaterial)g9.setValue(v,"center",p.center);if(g9.setValue(v,"modelViewMatrix",p.modelViewMatrix),g9.setValue(v,"normalMatrix",p.normalMatrix),g9.setValue(v,"modelMatrix",p.matrixWorld),s.isShaderMaterial||s.isRawShaderMaterial){let HJ=s.uniformsGroups;for(let BZ=0,PK=HJ.length;BZ<PK;BZ++)if(M0.isWebGL2){let L5=HJ[BZ];K0.update(L5,G8),K0.bind(L5,G8)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return G8}function AK(P,g){P.ambientLightColor.needsUpdate=g,P.lightProbe.needsUpdate=g,P.directionalLights.needsUpdate=g,P.directionalLightShadows.needsUpdate=g,P.pointLights.needsUpdate=g,P.pointLightShadows.needsUpdate=g,P.spotLights.needsUpdate=g,P.spotLightShadows.needsUpdate=g,P.rectAreaLights.needsUpdate=g,P.hemisphereLights.needsUpdate=g}function kK(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}if(this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(P,g,c){v0.get(P.texture).__webglTexture=g,v0.get(P.depthTexture).__webglTexture=c;let s=v0.get(P);if(s.__hasExternalTextures=!0,s.__hasExternalTextures){if(s.__autoAllocateDepthBuffer=c===void 0,!s.__autoAllocateDepthBuffer){if(p0.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),s.__useRenderToTexture=!1}}},this.setRenderTargetFramebuffer=function(P,g){let c=v0.get(P);c.__webglFramebuffer=g,c.__useDefaultFramebuffer=g===void 0},this.setRenderTarget=function(P,g=0,c=0){M=P,I=g,L=c;let s=!0,p=null,R0=!1,A0=!1;if(P){let f0=v0.get(P);if(f0.__useDefaultFramebuffer!==void 0)L0.bindFramebuffer(v.FRAMEBUFFER,null),s=!1;else if(f0.__webglFramebuffer===void 0)y0.setupRenderTarget(P);else if(f0.__hasExternalTextures)y0.rebindTextures(P,v0.get(P.texture).__webglTexture,v0.get(P.depthTexture).__webglTexture);let c0=P.texture;if(c0.isData3DTexture||c0.isDataArrayTexture||c0.isCompressedArrayTexture)A0=!0;let m0=v0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget){if(Array.isArray(m0[g]))p=m0[g][c];else p=m0[g];R0=!0}else if(M0.isWebGL2&&P.samples>0&&y0.useMultisampledRTT(P)===!1)p=v0.get(P).__webglMultisampledFramebuffer;else if(Array.isArray(m0))p=m0[c];else p=m0;z.copy(P.viewport),k.copy(P.scissor),y=P.scissorTest}else z.copy(h).multiplyScalar(d).floor(),k.copy(l).multiplyScalar(d).floor(),y=r;if(L0.bindFramebuffer(v.FRAMEBUFFER,p)&&M0.drawBuffers&&s)L0.drawBuffers(P,p);if(L0.viewport(z),L0.scissor(k),L0.setScissorTest(y),R0){let f0=v0.get(P.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+g,f0.__webglTexture,c)}else if(A0){let f0=v0.get(P.texture),c0=g||0;v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,f0.__webglTexture,c||0,c0)}A=-1},this.readRenderTargetPixels=function(P,g,c,s,p,R0,A0){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let j0=v0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&A0!==void 0)j0=j0[A0];if(j0){L0.bindFramebuffer(v.FRAMEBUFFER,j0);try{let f0=P.texture,c0=f0.format,m0=f0.type;if(c0!==1023&&D0.convert(c0)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let u0=m0===1016&&(p0.has("EXT_color_buffer_half_float")||M0.isWebGL2&&p0.has("EXT_color_buffer_float"));if(m0!==1009&&D0.convert(m0)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_TYPE)&&!(m0===1015&&(M0.isWebGL2||p0.has("OES_texture_float")||p0.has("WEBGL_color_buffer_float")))&&!u0){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(g>=0&&g<=P.width-s&&(c>=0&&c<=P.height-p))v.readPixels(g,c,s,p,D0.convert(c0),D0.convert(m0),R0)}finally{let f0=M!==null?v0.get(M).__webglFramebuffer:null;L0.bindFramebuffer(v.FRAMEBUFFER,f0)}}},this.copyFramebufferToTexture=function(P,g,c=0){let s=Math.pow(2,-c),p=Math.floor(g.image.width*s),R0=Math.floor(g.image.height*s);y0.setTexture2D(g,0),v.copyTexSubImage2D(v.TEXTURE_2D,c,0,0,P.x,P.y,p,R0),L0.unbindTexture()},this.copyTextureToTexture=function(P,g,c,s=0){let p=g.image.width,R0=g.image.height,A0=D0.convert(c.format),j0=D0.convert(c.type);if(y0.setTexture2D(c,0),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,c.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,c.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,c.unpackAlignment),g.isDataTexture)v.texSubImage2D(v.TEXTURE_2D,s,P.x,P.y,p,R0,A0,j0,g.image.data);else if(g.isCompressedTexture)v.compressedTexSubImage2D(v.TEXTURE_2D,s,P.x,P.y,g.mipmaps[0].width,g.mipmaps[0].height,A0,g.mipmaps[0].data);else v.texSubImage2D(v.TEXTURE_2D,s,P.x,P.y,A0,j0,g.image);if(s===0&&c.generateMipmaps)v.generateMipmap(v.TEXTURE_2D);L0.unbindTexture()},this.copyTextureToTexture3D=function(P,g,c,s,p=0){if(N.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let R0=P.max.x-P.min.x+1,A0=P.max.y-P.min.y+1,j0=P.max.z-P.min.z+1,f0=D0.convert(s.format),c0=D0.convert(s.type),m0;if(s.isData3DTexture)y0.setTexture3D(s,0),m0=v.TEXTURE_3D;else if(s.isDataArrayTexture||s.isCompressedArrayTexture)y0.setTexture2DArray(s,0),m0=v.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,s.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,s.unpackAlignment);let u0=v.getParameter(v.UNPACK_ROW_LENGTH),A9=v.getParameter(v.UNPACK_IMAGE_HEIGHT),QJ=v.getParameter(v.UNPACK_SKIP_PIXELS),j9=v.getParameter(v.UNPACK_SKIP_ROWS),bJ=v.getParameter(v.UNPACK_SKIP_IMAGES),V9=c.isCompressedTexture?c.mipmaps[p]:c.image;if(v.pixelStorei(v.UNPACK_ROW_LENGTH,V9.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,V9.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,P.min.x),v.pixelStorei(v.UNPACK_SKIP_ROWS,P.min.y),v.pixelStorei(v.UNPACK_SKIP_IMAGES,P.min.z),c.isDataTexture||c.isData3DTexture)v.texSubImage3D(m0,p,g.x,g.y,g.z,R0,A0,j0,f0,c0,V9.data);else if(c.isCompressedArrayTexture)console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),v.compressedTexSubImage3D(m0,p,g.x,g.y,g.z,R0,A0,j0,f0,V9.data);else v.texSubImage3D(m0,p,g.x,g.y,g.z,R0,A0,j0,f0,c0,V9);if(v.pixelStorei(v.UNPACK_ROW_LENGTH,u0),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,A9),v.pixelStorei(v.UNPACK_SKIP_PIXELS,QJ),v.pixelStorei(v.UNPACK_SKIP_ROWS,j9),v.pixelStorei(v.UNPACK_SKIP_IMAGES,bJ),p===0&&s.generateMipmaps)v.generateMipmap(m0);L0.unbindTexture()},this.initTexture=function(P){if(P.isCubeTexture)y0.setTextureCube(P,0);else if(P.isData3DTexture)y0.setTexture3D(P,0);else if(P.isDataArrayTexture||P.isCompressedArrayTexture)y0.setTexture2DArray(P,0);else y0.setTexture2D(P,0);L0.unbindTexture()},this.resetState=function(){I=0,L=0,M=null,L0.reset(),w.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2000}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=J==="display-p3"?"display-p3":"srgb",$.unpackColorSpace=W9.workingColorSpace==="display-p3-linear"?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace==="srgb"?3001:3000}set outputEncoding(J){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=J===3001?"srgb":"srgb-linear"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(J){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=J}}class c6 extends n${}c6.prototype.isWebGL1Renderer=!0;class FQ extends U9{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)$.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)$.object.backgroundIntensity=this.backgroundIntensity;return $}}class n6{constructor(J,$){this.isInterleavedBuffer=!0,this.array=J,this.stride=$,this.count=J!==void 0?J.length/$:0,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=gJ()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,$,Z){J*=this.stride,Z*=$.stride;for(let Q=0,W=this.stride;Q<W;Q++)this.array[J+Q]=$.array[Z+Q];return this}set(J,$=0){return this.array.set(J,$),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=gJ();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let $=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Z=new this.constructor($,this.stride);return Z.setUsage(this.usage),Z}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=gJ();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var n9=new T;class m${constructor(J,$,Z,Q=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=$,this.offset=Z,this.normalized=Q}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let $=0,Z=this.data.count;$<Z;$++)n9.fromBufferAttribute(this,$),n9.applyMatrix4(J),this.setXYZ($,n9.x,n9.y,n9.z);return this}applyNormalMatrix(J){for(let $=0,Z=this.count;$<Z;$++)n9.fromBufferAttribute(this,$),n9.applyNormalMatrix(J),this.setXYZ($,n9.x,n9.y,n9.z);return this}transformDirection(J){for(let $=0,Z=this.count;$<Z;$++)n9.fromBufferAttribute(this,$),n9.transformDirection(J),this.setXYZ($,n9.x,n9.y,n9.z);return this}setX(J,$){if(this.normalized)$=Z9($,this.array);return this.data.array[J*this.data.stride+this.offset]=$,this}setY(J,$){if(this.normalized)$=Z9($,this.array);return this.data.array[J*this.data.stride+this.offset+1]=$,this}setZ(J,$){if(this.normalized)$=Z9($,this.array);return this.data.array[J*this.data.stride+this.offset+2]=$,this}setW(J,$){if(this.normalized)$=Z9($,this.array);return this.data.array[J*this.data.stride+this.offset+3]=$,this}getX(J){let $=this.data.array[J*this.data.stride+this.offset];if(this.normalized)$=MJ($,this.array);return $}getY(J){let $=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)$=MJ($,this.array);return $}getZ(J){let $=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)$=MJ($,this.array);return $}getW(J){let $=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)$=MJ($,this.array);return $}setXY(J,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)$=Z9($,this.array),Z=Z9(Z,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this}setXYZ(J,$,Z,Q){if(J=J*this.data.stride+this.offset,this.normalized)$=Z9($,this.array),Z=Z9(Z,this.array),Q=Z9(Q,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this.data.array[J+2]=Q,this}setXYZW(J,$,Z,Q,W){if(J=J*this.data.stride+this.offset,this.normalized)$=Z9($,this.array),Z=Z9(Z,this.array),Q=Z9(Q,this.array),W=Z9(W,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this.data.array[J+2]=Q,this.data.array[J+3]=W,this}clone(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Z=0;Z<this.count;Z++){let Q=Z*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)$.push(this.data.array[Q+W])}return new y9(new this.array.constructor($),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new m$(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Z=0;Z<this.count;Z++){let Q=Z*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)$.push(this.data.array[Q+W])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:$,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class h7 extends uJ{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new a0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var o8,k7=new T,i8=new T,r8=new T,a8=new U0,P7=new U0,s6=new Y9,w$=new T,S7=new T,T$=new T,Y6=new U0,pZ=new U0,q6=new U0;class s$ extends U9{constructor(J=new h7){super();if(this.isSprite=!0,this.type="Sprite",o8===void 0){o8=new R9;let $=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Z=new n6($,5);o8.setIndex([0,1,2,0,2,3]),o8.setAttribute("position",new m$(Z,3,0,!1)),o8.setAttribute("uv",new m$(Z,2,3,!1))}this.geometry=o8,this.material=J,this.center=new U0(0.5,0.5)}raycast(J,$){if(J.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(i8.setFromMatrixScale(this.matrixWorld),s6.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),r8.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)i8.multiplyScalar(-r8.z);let Z=this.material.rotation,Q,W;if(Z!==0)W=Math.cos(Z),Q=Math.sin(Z);let K=this.center;_$(w$.set(-0.5,-0.5,0),r8,K,i8,Q,W),_$(S7.set(0.5,-0.5,0),r8,K,i8,Q,W),_$(T$.set(0.5,0.5,0),r8,K,i8,Q,W),Y6.set(0,0),pZ.set(1,0),q6.set(1,1);let Y=J.ray.intersectTriangle(w$,S7,T$,!1,k7);if(Y===null){if(_$(S7.set(-0.5,0.5,0),r8,K,i8,Q,W),pZ.set(0,1),Y=J.ray.intersectTriangle(w$,T$,S7,!1,k7),Y===null)return}let X=J.ray.origin.distanceTo(k7);if(X<J.near||X>J.far)return;$.push({distance:X,point:k7.clone(),uv:GJ.getInterpolation(k7,w$,S7,T$,Y6,pZ,q6,new U0),face:null,object:this})}copy(J,$){if(super.copy(J,$),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function _$(J,$,Z,Q,W,K){if(a8.subVectors(J,Z).addScalar(0.5).multiply(Q),W!==void 0)P7.x=K*a8.x-W*a8.y,P7.y=W*a8.x+K*a8.y;else P7.copy(a8);J.copy($),J.x+=P7.x,J.y+=P7.y,J.applyMatrix4(s6)}class v7 extends uJ{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new a0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var H6=new T,U6=new T,G6=new Y9,lZ=new L8,j$=new W7;class o6 extends U9{constructor(J=new R9,$=new v7){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Z=[0];for(let Q=1,W=$.count;Q<W;Q++)H6.fromBufferAttribute($,Q-1),U6.fromBufferAttribute($,Q),Z[Q]=Z[Q-1],Z[Q]+=H6.distanceTo(U6);J.setAttribute("lineDistance",new J9(Z,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,$){let Z=this.geometry,Q=this.matrixWorld,W=J.params.Line.threshold,K=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(j$.copy(Z.boundingSphere),j$.applyMatrix4(Q),j$.radius+=W,J.ray.intersectsSphere(j$)===!1)return;G6.copy(Q).invert(),lZ.copy(J.ray).applyMatrix4(G6);let Y=W/((this.scale.x+this.scale.y+this.scale.z)/3),X=Y*Y,q=new T,H=new T,U=new T,G=new T,F=this.isLineSegments?2:1,D=Z.index,E=Z.attributes.position;if(D!==null){let V=Math.max(0,K.start),R=Math.min(D.count,K.start+K.count);for(let N=V,B=R-1;N<B;N+=F){let I=D.getX(N),L=D.getX(N+1);if(q.fromBufferAttribute(E,I),H.fromBufferAttribute(E,L),lZ.distanceSqToSegment(q,H,G,U)>X)continue;G.applyMatrix4(this.matrixWorld);let A=J.ray.origin.distanceTo(G);if(A<J.near||A>J.far)continue;$.push({distance:A,point:U.clone().applyMatrix4(this.matrixWorld),index:N,face:null,faceIndex:null,object:this})}}else{let V=Math.max(0,K.start),R=Math.min(E.count,K.start+K.count);for(let N=V,B=R-1;N<B;N+=F){if(q.fromBufferAttribute(E,N),H.fromBufferAttribute(E,N+1),lZ.distanceSqToSegment(q,H,G,U)>X)continue;G.applyMatrix4(this.matrixWorld);let L=J.ray.origin.distanceTo(G);if(L<J.near||L>J.far)continue;$.push({distance:L,point:U.clone().applyMatrix4(this.matrixWorld),index:N,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Q.length;W<K;W++){let Y=Q[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=W}}}}}var F6=new T,V6=new T;class o$ extends o6{constructor(J,$){super(J,$);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Z=[];for(let Q=0,W=$.count;Q<W;Q+=2)F6.fromBufferAttribute($,Q),V6.fromBufferAttribute($,Q+1),Z[Q]=Q===0?0:Z[Q-1],Z[Q+1]=Z[Q]+F6.distanceTo(V6);J.setAttribute("lineDistance",new J9(Z,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class X7 extends uJ{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new a0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var R6=new Y9,eZ=new L8,b$=new W7,x$=new T;class g7 extends U9{constructor(J=new R9,$=new X7){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,$){let Z=this.geometry,Q=this.matrixWorld,W=J.params.Points.threshold,K=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(b$.copy(Z.boundingSphere),b$.applyMatrix4(Q),b$.radius+=W,J.ray.intersectsSphere(b$)===!1)return;R6.copy(Q).invert(),eZ.copy(J.ray).applyMatrix4(R6);let Y=W/((this.scale.x+this.scale.y+this.scale.z)/3),X=Y*Y,q=Z.index,U=Z.attributes.position;if(q!==null){let G=Math.max(0,K.start),F=Math.min(q.count,K.start+K.count);for(let D=G,O=F;D<O;D++){let E=q.getX(D);x$.fromBufferAttribute(U,E),D6(x$,E,X,Q,J,$,this)}}else{let G=Math.max(0,K.start),F=Math.min(U.count,K.start+K.count);for(let D=G,O=F;D<O;D++)x$.fromBufferAttribute(U,D),D6(x$,D,X,Q,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Q.length;W<K;W++){let Y=Q[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=W}}}}}function D6(J,$,Z,Q,W,K,Y){let X=eZ.distanceSqToPoint(J);if(X<Z){let q=new T;eZ.closestPointToPoint(J,q),q.applyMatrix4(Q);let H=W.ray.origin.distanceTo(q);if(H<W.near||H>W.far)return;K.push({distance:H,distanceToRay:Math.sqrt(X),point:q,index:$,face:null,object:Y})}}class kJ extends r9{constructor(J,$,Z,Q,W,K,Y,X,q){super(J,$,Z,Q,W,K,Y,X,q);this.isCanvasTexture=!0,this.needsUpdate=!0}}class PJ{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(J,$){let Z=this.getUtoTmapping(J);return this.getPoint(Z,$)}getPoints(J=5){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPoint(Z/J));return $}getSpacedPoints(J=5){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPointAt(Z/J));return $}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let $=[],Z,Q=this.getPoint(0),W=0;$.push(0);for(let K=1;K<=J;K++)Z=this.getPoint(K/J),W+=Z.distanceTo(Q),$.push(W),Q=Z;return this.cacheArcLengths=$,$}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,$){let Z=this.getLengths(),Q=0,W=Z.length,K;if($)K=$;else K=J*Z[W-1];let Y=0,X=W-1,q;while(Y<=X)if(Q=Math.floor(Y+(X-Y)/2),q=Z[Q]-K,q<0)Y=Q+1;else if(q>0)X=Q-1;else{X=Q;break}if(Q=X,Z[Q]===K)return Q/(W-1);let H=Z[Q],G=Z[Q+1]-H,F=(K-H)/G;return(Q+F)/(W-1)}getTangent(J,$){let Q=J-0.0001,W=J+0.0001;if(Q<0)Q=0;if(W>1)W=1;let K=this.getPoint(Q),Y=this.getPoint(W),X=$||(K.isVector2?new U0:new T);return X.copy(Y).sub(K).normalize(),X}getTangentAt(J,$){let Z=this.getUtoTmapping(J);return this.getTangent(Z,$)}computeFrenetFrames(J,$){let Z=new T,Q=[],W=[],K=[],Y=new T,X=new Y9;for(let F=0;F<=J;F++){let D=F/J;Q[F]=this.getTangentAt(D,new T)}W[0]=new T,K[0]=new T;let q=Number.MAX_VALUE,H=Math.abs(Q[0].x),U=Math.abs(Q[0].y),G=Math.abs(Q[0].z);if(H<=q)q=H,Z.set(1,0,0);if(U<=q)q=U,Z.set(0,1,0);if(G<=q)Z.set(0,0,1);Y.crossVectors(Q[0],Z).normalize(),W[0].crossVectors(Q[0],Y),K[0].crossVectors(Q[0],W[0]);for(let F=1;F<=J;F++){if(W[F]=W[F-1].clone(),K[F]=K[F-1].clone(),Y.crossVectors(Q[F-1],Q[F]),Y.length()>Number.EPSILON){Y.normalize();let D=Math.acos(x9(Q[F-1].dot(Q[F]),-1,1));W[F].applyMatrix4(X.makeRotationAxis(Y,D))}K[F].crossVectors(Q[F],W[F])}if($===!0){let F=Math.acos(x9(W[0].dot(W[J]),-1,1));if(F/=J,Q[0].dot(Y.crossVectors(W[0],W[J]))>0)F=-F;for(let D=1;D<=J;D++)W[D].applyMatrix4(X.makeRotationAxis(Q[D],F*D)),K[D].crossVectors(Q[D],W[D])}return{tangents:Q,normals:W,binormals:K}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class VQ extends PJ{constructor(J=0,$=0,Z=1,Q=1,W=0,K=Math.PI*2,Y=!1,X=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=$,this.xRadius=Z,this.yRadius=Q,this.aStartAngle=W,this.aEndAngle=K,this.aClockwise=Y,this.aRotation=X}getPoint(J,$){let Z=$||new U0,Q=Math.PI*2,W=this.aEndAngle-this.aStartAngle,K=Math.abs(W)<Number.EPSILON;while(W<0)W+=Q;while(W>Q)W-=Q;if(W<Number.EPSILON)if(K)W=0;else W=Q;if(this.aClockwise===!0&&!K)if(W===Q)W=-Q;else W=W-Q;let Y=this.aStartAngle+J*W,X=this.aX+this.xRadius*Math.cos(Y),q=this.aY+this.yRadius*Math.sin(Y);if(this.aRotation!==0){let H=Math.cos(this.aRotation),U=Math.sin(this.aRotation),G=X-this.aX,F=q-this.aY;X=G*H-F*U+this.aX,q=G*U+F*H+this.aY}return Z.set(X,q)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class i6 extends VQ{constructor(J,$,Z,Q,W,K){super(J,$,Z,Z,Q,W,K);this.isArcCurve=!0,this.type="ArcCurve"}}function RQ(){let J=0,$=0,Z=0,Q=0;function W(K,Y,X,q){J=K,$=X,Z=-3*K+3*Y-2*X-q,Q=2*K-2*Y+X+q}return{initCatmullRom:function(K,Y,X,q,H){W(Y,X,H*(X-K),H*(q-Y))},initNonuniformCatmullRom:function(K,Y,X,q,H,U,G){let F=(Y-K)/H-(X-K)/(H+U)+(X-Y)/U,D=(X-Y)/U-(q-Y)/(U+G)+(q-X)/G;F*=U,D*=U,W(Y,X,F,D)},calc:function(K){let Y=K*K,X=Y*K;return J+$*K+Z*Y+Q*X}}}var y$=new T,cZ=new RQ,nZ=new RQ,sZ=new RQ;class Y7 extends PJ{constructor(J=[],$=!1,Z="centripetal",Q=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=$,this.curveType=Z,this.tension=Q}getPoint(J,$=new T){let Z=$,Q=this.points,W=Q.length,K=(W-(this.closed?0:1))*J,Y=Math.floor(K),X=K-Y;if(this.closed)Y+=Y>0?0:(Math.floor(Math.abs(Y)/W)+1)*W;else if(X===0&&Y===W-1)Y=W-2,X=1;let q,H;if(this.closed||Y>0)q=Q[(Y-1)%W];else y$.subVectors(Q[0],Q[1]).add(Q[0]),q=y$;let U=Q[Y%W],G=Q[(Y+1)%W];if(this.closed||Y+2<W)H=Q[(Y+2)%W];else y$.subVectors(Q[W-1],Q[W-2]).add(Q[W-1]),H=y$;if(this.curveType==="centripetal"||this.curveType==="chordal"){let F=this.curveType==="chordal"?0.5:0.25,D=Math.pow(q.distanceToSquared(U),F),O=Math.pow(U.distanceToSquared(G),F),E=Math.pow(G.distanceToSquared(H),F);if(O<0.0001)O=1;if(D<0.0001)D=O;if(E<0.0001)E=O;cZ.initNonuniformCatmullRom(q.x,U.x,G.x,H.x,D,O,E),nZ.initNonuniformCatmullRom(q.y,U.y,G.y,H.y,D,O,E),sZ.initNonuniformCatmullRom(q.z,U.z,G.z,H.z,D,O,E)}else if(this.curveType==="catmullrom")cZ.initCatmullRom(q.x,U.x,G.x,H.x,this.tension),nZ.initCatmullRom(q.y,U.y,G.y,H.y,this.tension),sZ.initCatmullRom(q.z,U.z,G.z,H.z,this.tension);return Z.set(cZ.calc(X),nZ.calc(X),sZ.calc(X)),Z}copy(J){super.copy(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(Q.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Z=this.points.length;$<Z;$++){let Q=this.points[$];J.points.push(Q.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(new T().fromArray(Q))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function E6(J,$,Z,Q,W){let K=(Q-$)*0.5,Y=(W-Z)*0.5,X=J*J,q=J*X;return(2*Z-2*Q+K+Y)*q+(-3*Z+3*Q-2*K-Y)*X+K*J+Z}function xH(J,$){let Z=1-J;return Z*Z*$}function yH(J,$){return 2*(1-J)*J*$}function fH(J,$){return J*J*$}function x7(J,$,Z,Q){return xH(J,$)+yH(J,Z)+fH(J,Q)}function hH(J,$){let Z=1-J;return Z*Z*Z*$}function vH(J,$){let Z=1-J;return 3*Z*Z*J*$}function gH(J,$){return 3*(1-J)*J*J*$}function mH(J,$){return J*J*J*$}function y7(J,$,Z,Q,W){return hH(J,$)+vH(J,Z)+gH(J,Q)+mH(J,W)}class r6 extends PJ{constructor(J=new U0,$=new U0,Z=new U0,Q=new U0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=$,this.v2=Z,this.v3=Q}getPoint(J,$=new U0){let Z=$,Q=this.v0,W=this.v1,K=this.v2,Y=this.v3;return Z.set(y7(J,Q.x,W.x,K.x,Y.x),y7(J,Q.y,W.y,K.y,Y.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class a6 extends PJ{constructor(J=new T,$=new T,Z=new T,Q=new T){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=$,this.v2=Z,this.v3=Q}getPoint(J,$=new T){let Z=$,Q=this.v0,W=this.v1,K=this.v2,Y=this.v3;return Z.set(y7(J,Q.x,W.x,K.x,Y.x),y7(J,Q.y,W.y,K.y,Y.y),y7(J,Q.z,W.z,K.z,Y.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class t6 extends PJ{constructor(J=new U0,$=new U0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=$}getPoint(J,$=new U0){let Z=$;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new U0){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class e6 extends PJ{constructor(J=new T,$=new T){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=$}getPoint(J,$=new T){let Z=$;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new T){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class JW extends PJ{constructor(J=new U0,$=new U0,Z=new U0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=$,this.v2=Z}getPoint(J,$=new U0){let Z=$,Q=this.v0,W=this.v1,K=this.v2;return Z.set(x7(J,Q.x,W.x,K.x),x7(J,Q.y,W.y,K.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class DQ extends PJ{constructor(J=new T,$=new T,Z=new T){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=$,this.v2=Z}getPoint(J,$=new T){let Z=$,Q=this.v0,W=this.v1,K=this.v2;return Z.set(x7(J,Q.x,W.x,K.x),x7(J,Q.y,W.y,K.y),x7(J,Q.z,W.z,K.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class $W extends PJ{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,$=new U0){let Z=$,Q=this.points,W=(Q.length-1)*J,K=Math.floor(W),Y=W-K,X=Q[K===0?K:K-1],q=Q[K],H=Q[K>Q.length-2?Q.length-1:K+1],U=Q[K>Q.length-3?Q.length-1:K+2];return Z.set(E6(Y,X.x,q.x,H.x,U.x),E6(Y,X.y,q.y,H.y,U.y)),Z}copy(J){super.copy(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(Q.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Z=this.points.length;$<Z;$++){let Q=this.points[$];J.points.push(Q.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(new U0().fromArray(Q))}return this}}var uH=Object.freeze({__proto__:null,ArcCurve:i6,CatmullRomCurve3:Y7,CubicBezierCurve:r6,CubicBezierCurve3:a6,EllipseCurve:VQ,LineCurve:t6,LineCurve3:e6,QuadraticBezierCurve:JW,QuadraticBezierCurve3:DQ,SplineCurve:$W});class i$ extends R9{constructor(J=1,$=32,Z=0,Q=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:$,thetaStart:Z,thetaLength:Q},$=Math.max(3,$);let W=[],K=[],Y=[],X=[],q=new T,H=new U0;K.push(0,0,0),Y.push(0,0,1),X.push(0.5,0.5);for(let U=0,G=3;U<=$;U++,G+=3){let F=Z+U/$*Q;q.x=J*Math.cos(F),q.y=J*Math.sin(F),K.push(q.x,q.y,q.z),Y.push(0,0,1),H.x=(K[G]/J+1)/2,H.y=(K[G+1]/J+1)/2,X.push(H.x,H.y)}for(let U=1;U<=$;U++)W.push(U,U+1,0);this.setIndex(W),this.setAttribute("position",new J9(K,3)),this.setAttribute("normal",new J9(Y,3)),this.setAttribute("uv",new J9(X,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new i$(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class k0 extends R9{constructor(J=1,$=1,Z=1,Q=32,W=1,K=!1,Y=0,X=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:$,height:Z,radialSegments:Q,heightSegments:W,openEnded:K,thetaStart:Y,thetaLength:X};let q=this;Q=Math.floor(Q),W=Math.floor(W);let H=[],U=[],G=[],F=[],D=0,O=[],E=Z/2,V=0;if(R(),K===!1){if(J>0)N(!0);if($>0)N(!1)}this.setIndex(H),this.setAttribute("position",new J9(U,3)),this.setAttribute("normal",new J9(G,3)),this.setAttribute("uv",new J9(F,2));function R(){let B=new T,I=new T,L=0,M=($-J)/Z;for(let A=0;A<=W;A++){let _=[],z=A/W,k=z*($-J)+J;for(let y=0;y<=Q;y++){let o=y/Q,t=o*X+Y,j=Math.sin(t),m=Math.cos(t);I.x=k*j,I.y=-z*Z+E,I.z=k*m,U.push(I.x,I.y,I.z),B.set(j,M,m).normalize(),G.push(B.x,B.y,B.z),F.push(o,1-z),_.push(D++)}O.push(_)}for(let A=0;A<Q;A++)for(let _=0;_<W;_++){let z=O[_][A],k=O[_+1][A],y=O[_+1][A+1],o=O[_][A+1];H.push(z,k,o),H.push(k,y,o),L+=6}q.addGroup(V,L,0),V+=L}function N(B){let I=D,L=new U0,M=new T,A=0,_=B===!0?J:$,z=B===!0?1:-1;for(let y=1;y<=Q;y++)U.push(0,E*z,0),G.push(0,z,0),F.push(0.5,0.5),D++;let k=D;for(let y=0;y<=Q;y++){let t=y/Q*X+Y,j=Math.cos(t),m=Math.sin(t);M.x=_*m,M.y=E*z,M.z=_*j,U.push(M.x,M.y,M.z),G.push(0,z,0),L.x=j*0.5+0.5,L.y=m*0.5*z+0.5,F.push(L.x,L.y),D++}for(let y=0;y<Q;y++){let o=I+y,t=k+y;if(B===!0)H.push(t,t+1,o);else H.push(t+1,t,o);A+=3}q.addGroup(V,A,B===!0?1:2),V+=A}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new k0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class G9 extends k0{constructor(J=1,$=1,Z=32,Q=1,W=!1,K=0,Y=Math.PI*2){super(0,J,$,Z,Q,W,K,Y);this.type="ConeGeometry",this.parameters={radius:J,height:$,radialSegments:Z,heightSegments:Q,openEnded:W,thetaStart:K,thetaLength:Y}}static fromJSON(J){return new G9(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class EQ extends R9{constructor(J=[],$=[],Z=1,Q=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:$,radius:Z,detail:Q};let W=[],K=[];if(Y(Q),q(Z),H(),this.setAttribute("position",new J9(W,3)),this.setAttribute("normal",new J9(W.slice(),3)),this.setAttribute("uv",new J9(K,2)),Q===0)this.computeVertexNormals();else this.normalizeNormals();function Y(R){let N=new T,B=new T,I=new T;for(let L=0;L<$.length;L+=3)F($[L+0],N),F($[L+1],B),F($[L+2],I),X(N,B,I,R)}function X(R,N,B,I){let L=I+1,M=[];for(let A=0;A<=L;A++){M[A]=[];let _=R.clone().lerp(B,A/L),z=N.clone().lerp(B,A/L),k=L-A;for(let y=0;y<=k;y++)if(y===0&&A===L)M[A][y]=_;else M[A][y]=_.clone().lerp(z,y/k)}for(let A=0;A<L;A++)for(let _=0;_<2*(L-A)-1;_++){let z=Math.floor(_/2);if(_%2===0)G(M[A][z+1]),G(M[A+1][z]),G(M[A][z]);else G(M[A][z+1]),G(M[A+1][z+1]),G(M[A+1][z])}}function q(R){let N=new T;for(let B=0;B<W.length;B+=3)N.x=W[B+0],N.y=W[B+1],N.z=W[B+2],N.normalize().multiplyScalar(R),W[B+0]=N.x,W[B+1]=N.y,W[B+2]=N.z}function H(){let R=new T;for(let N=0;N<W.length;N+=3){R.x=W[N+0],R.y=W[N+1],R.z=W[N+2];let B=E(R)/2/Math.PI+0.5,I=V(R)/Math.PI+0.5;K.push(B,1-I)}D(),U()}function U(){for(let R=0;R<K.length;R+=6){let N=K[R+0],B=K[R+2],I=K[R+4],L=Math.max(N,B,I),M=Math.min(N,B,I);if(L>0.9&&M<0.1){if(N<0.2)K[R+0]+=1;if(B<0.2)K[R+2]+=1;if(I<0.2)K[R+4]+=1}}}function G(R){W.push(R.x,R.y,R.z)}function F(R,N){let B=R*3;N.x=J[B+0],N.y=J[B+1],N.z=J[B+2]}function D(){let R=new T,N=new T,B=new T,I=new T,L=new U0,M=new U0,A=new U0;for(let _=0,z=0;_<W.length;_+=9,z+=6){R.set(W[_+0],W[_+1],W[_+2]),N.set(W[_+3],W[_+4],W[_+5]),B.set(W[_+6],W[_+7],W[_+8]),L.set(K[z+0],K[z+1]),M.set(K[z+2],K[z+3]),A.set(K[z+4],K[z+5]),I.copy(R).add(N).add(B).divideScalar(3);let k=E(I);O(L,z+0,R,k),O(M,z+2,N,k),O(A,z+4,B,k)}}function O(R,N,B,I){if(I<0&&R.x===1)K[N]=R.x-1;if(B.x===0&&B.z===0)K[N]=I/2/Math.PI+0.5}function E(R){return Math.atan2(R.z,-R.x)}function V(R){return Math.atan2(-R.y,Math.sqrt(R.x*R.x+R.z*R.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new EQ(J.vertices,J.indices,J.radius,J.details)}}class FJ extends EQ{constructor(J=1,$=0){let Z=(1+Math.sqrt(5))/2,Q=1/Z,W=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-Q,-Z,0,-Q,Z,0,Q,-Z,0,Q,Z,-Q,-Z,0,-Q,Z,0,Q,-Z,0,Q,Z,0,-Z,0,-Q,Z,0,-Q,-Z,0,Q,Z,0,Q],K=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(W,K,J,$);this.type="DodecahedronGeometry",this.parameters={radius:J,detail:$}}static fromJSON(J){return new FJ(J.radius,J.detail)}}class m7 extends R9{constructor(J=0.5,$=1,Z=32,Q=1,W=0,K=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:$,thetaSegments:Z,phiSegments:Q,thetaStart:W,thetaLength:K},Z=Math.max(3,Z),Q=Math.max(1,Q);let Y=[],X=[],q=[],H=[],U=J,G=($-J)/Q,F=new T,D=new U0;for(let O=0;O<=Q;O++){for(let E=0;E<=Z;E++){let V=W+E/Z*K;F.x=U*Math.cos(V),F.y=U*Math.sin(V),X.push(F.x,F.y,F.z),q.push(0,0,1),D.x=(F.x/$+1)/2,D.y=(F.y/$+1)/2,H.push(D.x,D.y)}U+=G}for(let O=0;O<Q;O++){let E=O*(Z+1);for(let V=0;V<Z;V++){let R=V+E,N=R,B=R+Z+1,I=R+Z+2,L=R+1;Y.push(N,B,L),Y.push(B,I,L)}}this.setIndex(Y),this.setAttribute("position",new J9(X,3)),this.setAttribute("normal",new J9(q,3)),this.setAttribute("uv",new J9(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new m7(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class D9 extends R9{constructor(J=1,$=32,Z=16,Q=0,W=Math.PI*2,K=0,Y=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:$,heightSegments:Z,phiStart:Q,phiLength:W,thetaStart:K,thetaLength:Y},$=Math.max(3,Math.floor($)),Z=Math.max(2,Math.floor(Z));let X=Math.min(K+Y,Math.PI),q=0,H=[],U=new T,G=new T,F=[],D=[],O=[],E=[];for(let V=0;V<=Z;V++){let R=[],N=V/Z,B=0;if(V===0&&K===0)B=0.5/$;else if(V===Z&&X===Math.PI)B=-0.5/$;for(let I=0;I<=$;I++){let L=I/$;U.x=-J*Math.cos(Q+L*W)*Math.sin(K+N*Y),U.y=J*Math.cos(K+N*Y),U.z=J*Math.sin(Q+L*W)*Math.sin(K+N*Y),D.push(U.x,U.y,U.z),G.copy(U).normalize(),O.push(G.x,G.y,G.z),E.push(L+B,1-N),R.push(q++)}H.push(R)}for(let V=0;V<Z;V++)for(let R=0;R<$;R++){let N=H[V][R+1],B=H[V][R],I=H[V+1][R],L=H[V+1][R+1];if(V!==0||K>0)F.push(N,B,L);if(V!==Z-1||X<Math.PI)F.push(B,I,L)}this.setIndex(F),this.setAttribute("position",new J9(D,3)),this.setAttribute("normal",new J9(O,3)),this.setAttribute("uv",new J9(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new D9(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class dJ extends R9{constructor(J=1,$=0.4,Z=12,Q=48,W=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:$,radialSegments:Z,tubularSegments:Q,arc:W},Z=Math.floor(Z),Q=Math.floor(Q);let K=[],Y=[],X=[],q=[],H=new T,U=new T,G=new T;for(let F=0;F<=Z;F++)for(let D=0;D<=Q;D++){let O=D/Q*W,E=F/Z*Math.PI*2;U.x=(J+$*Math.cos(E))*Math.cos(O),U.y=(J+$*Math.cos(E))*Math.sin(O),U.z=$*Math.sin(E),Y.push(U.x,U.y,U.z),H.x=J*Math.cos(O),H.y=J*Math.sin(O),G.subVectors(U,H).normalize(),X.push(G.x,G.y,G.z),q.push(D/Q),q.push(F/Z)}for(let F=1;F<=Z;F++)for(let D=1;D<=Q;D++){let O=(Q+1)*F+D-1,E=(Q+1)*(F-1)+D-1,V=(Q+1)*(F-1)+D,R=(Q+1)*F+D;K.push(O,E,R),K.push(E,V,R)}this.setIndex(K),this.setAttribute("position",new J9(Y,3)),this.setAttribute("normal",new J9(X,3)),this.setAttribute("uv",new J9(q,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new dJ(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc)}}class u7 extends R9{constructor(J=new DQ(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),$=64,Z=1,Q=8,W=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:$,radius:Z,radialSegments:Q,closed:W};let K=J.computeFrenetFrames($,W);this.tangents=K.tangents,this.normals=K.normals,this.binormals=K.binormals;let Y=new T,X=new T,q=new U0,H=new T,U=[],G=[],F=[],D=[];O(),this.setIndex(D),this.setAttribute("position",new J9(U,3)),this.setAttribute("normal",new J9(G,3)),this.setAttribute("uv",new J9(F,2));function O(){for(let N=0;N<$;N++)E(N);E(W===!1?$:0),R(),V()}function E(N){H=J.getPointAt(N/$,H);let B=K.normals[N],I=K.binormals[N];for(let L=0;L<=Q;L++){let M=L/Q*Math.PI*2,A=Math.sin(M),_=-Math.cos(M);X.x=_*B.x+A*I.x,X.y=_*B.y+A*I.y,X.z=_*B.z+A*I.z,X.normalize(),G.push(X.x,X.y,X.z),Y.x=H.x+Z*X.x,Y.y=H.y+Z*X.y,Y.z=H.z+Z*X.z,U.push(Y.x,Y.y,Y.z)}}function V(){for(let N=1;N<=$;N++)for(let B=1;B<=Q;B++){let I=(Q+1)*(N-1)+(B-1),L=(Q+1)*N+(B-1),M=(Q+1)*N+B,A=(Q+1)*(N-1)+B;D.push(I,L,A),D.push(L,M,A)}}function R(){for(let N=0;N<=$;N++)for(let B=0;B<=Q;B++)q.x=N/$,q.y=B/Q,F.push(q.x,q.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new u7(new uH[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class J0 extends uJ{constructor(J){super();this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new a0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new a0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}function f$(J,$,Z){if(!J||!Z&&J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}function dH(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}class d7{constructor(J,$,Z,Q){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Q!==void 0?Q:new $.constructor(Z),this.sampleValues=$,this.valueSize=Z,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Z=this._cachedIndex,Q=$[Z],W=$[Z-1];Z:{J:{let K;$:{Q:if(!(J<Q)){for(let Y=Z+2;;){if(Q===void 0){if(J<W)break Q;return Z=$.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}if(Z===Y)break;if(W=Q,Q=$[++Z],J<Q)break J}K=$.length;break $}if(!(J>=W)){let Y=$[1];if(J<Y)Z=2,W=Y;for(let X=Z-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===X)break;if(Q=W,W=$[--Z-1],J>=W)break J}K=Z,Z=0;break $}break Z}while(Z<K){let Y=Z+K>>>1;if(J<$[Y])K=Y;else Z=Y+1}if(Q=$[Z],W=$[Z-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===void 0)return Z=$.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}this._cachedIndex=Z,this.intervalChanged_(Z,W,Q)}return this.interpolate_(Z,W,J,Q)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Z=this.sampleValues,Q=this.valueSize,W=J*Q;for(let K=0;K!==Q;++K)$[K]=Z[W+K];return $}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class ZW extends d7{constructor(J,$,Z,Q){super(J,$,Z,Q);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Z){let Q=this.parameterPositions,W=J-2,K=J+1,Y=Q[W],X=Q[K];if(Y===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,Y=2*$-Z;break;case 2402:W=Q.length-2,Y=$+Q[W]-Q[W+1];break;default:W=J,Y=Z}if(X===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,X=2*Z-$;break;case 2402:K=1,X=Z+Q[1]-Q[0];break;default:K=J-1,X=$}let q=(Z-$)*0.5,H=this.valueSize;this._weightPrev=q/($-Y),this._weightNext=q/(X-Z),this._offsetPrev=W*H,this._offsetNext=K*H}interpolate_(J,$,Z,Q){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,q=X-Y,H=this._offsetPrev,U=this._offsetNext,G=this._weightPrev,F=this._weightNext,D=(Z-$)/(Q-$),O=D*D,E=O*D,V=-G*E+2*G*O-G*D,R=(1+G)*E+(-1.5-2*G)*O+(-0.5+G)*D+1,N=(-1-F)*E+(1.5+F)*O+0.5*D,B=F*E-F*O;for(let I=0;I!==Y;++I)W[I]=V*K[H+I]+R*K[q+I]+N*K[X+I]+B*K[U+I];return W}}class QW extends d7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J,$,Z,Q){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,q=X-Y,H=(Z-$)/(Q-$),U=1-H;for(let G=0;G!==Y;++G)W[G]=K[q+G]*U+K[X+G]*H;return W}}class WW extends d7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J){return this.copySampleValue_(J-1)}}class SJ{constructor(J,$,Z,Q){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=f$($,this.TimeBufferType),this.values=f$(Z,this.ValueBufferType),this.setInterpolation(Q||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Z;if($.toJSON!==this.toJSON)Z=$.toJSON(J);else{Z={name:J.name,times:f$(J.times,Array),values:f$(J.values,Array)};let Q=J.getInterpolation();if(Q!==J.DefaultInterpolation)Z.interpolation=Q}return Z.type=J.ValueTypeName,Z}InterpolantFactoryMethodDiscrete(J){return new WW(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new QW(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new ZW(this.times,this.values,this.getValueSize(),J)}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break}if($===void 0){let Z="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Z);return console.warn("THREE.KeyframeTrack:",Z),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Z=0,Q=$.length;Z!==Q;++Z)$[Z]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Z=0,Q=$.length;Z!==Q;++Z)$[Z]*=J}return this}trim(J,$){let Z=this.times,Q=Z.length,W=0,K=Q-1;while(W!==Q&&Z[W]<J)++W;while(K!==-1&&Z[K]>$)--K;if(++K,W!==0||K!==Q){if(W>=K)K=Math.max(K,1),W=K-1;let Y=this.getValueSize();this.times=Z.slice(W,K),this.values=this.values.slice(W*Y,K*Y)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),J=!1;let Z=this.times,Q=this.values,W=Z.length;if(W===0)console.error("THREE.KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let Y=0;Y!==W;Y++){let X=Z[Y];if(typeof X==="number"&&isNaN(X)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,Y,X),J=!1;break}if(K!==null&&K>X){console.error("THREE.KeyframeTrack: Out of order keys.",this,Y,X,K),J=!1;break}K=X}if(Q!==void 0){if(dH(Q))for(let Y=0,X=Q.length;Y!==X;++Y){let q=Q[Y];if(isNaN(q)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,Y,q),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Z=this.getValueSize(),Q=this.getInterpolation()===2302,W=J.length-1,K=1;for(let Y=1;Y<W;++Y){let X=!1,q=J[Y],H=J[Y+1];if(q!==H&&(Y!==1||q!==J[0]))if(!Q){let U=Y*Z,G=U-Z,F=U+Z;for(let D=0;D!==Z;++D){let O=$[U+D];if(O!==$[G+D]||O!==$[F+D]){X=!0;break}}}else X=!0;if(X){if(Y!==K){J[K]=J[Y];let U=Y*Z,G=K*Z;for(let F=0;F!==Z;++F)$[G+F]=$[U+F]}++K}}if(W>0){J[K]=J[W];for(let Y=W*Z,X=K*Z,q=0;q!==Z;++q)$[X+q]=$[Y+q];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=$.slice(0,K*Z);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),Q=new this.constructor(this.name,J,$);return Q.createInterpolant=this.createInterpolant,Q}}SJ.prototype.TimeBufferType=Float32Array;SJ.prototype.ValueBufferType=Float32Array;SJ.prototype.DefaultInterpolation=2301;class q7 extends SJ{}q7.prototype.ValueTypeName="bool";q7.prototype.ValueBufferType=Array;q7.prototype.DefaultInterpolation=2300;q7.prototype.InterpolantFactoryMethodLinear=void 0;q7.prototype.InterpolantFactoryMethodSmooth=void 0;class KW extends SJ{}KW.prototype.ValueTypeName="color";class XW extends SJ{}XW.prototype.ValueTypeName="number";class YW extends d7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J,$,Z,Q){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=(Z-$)/(Q-$),q=J*Y;for(let H=q+Y;q!==H;q+=4)CJ.slerpFlat(W,0,K,q-Y,K,q,X);return W}}class r$ extends SJ{InterpolantFactoryMethodLinear(J){return new YW(this.times,this.values,this.getValueSize(),J)}}r$.prototype.ValueTypeName="quaternion";r$.prototype.DefaultInterpolation=2301;r$.prototype.InterpolantFactoryMethodSmooth=void 0;class H7 extends SJ{}H7.prototype.ValueTypeName="string";H7.prototype.ValueBufferType=Array;H7.prototype.DefaultInterpolation=2300;H7.prototype.InterpolantFactoryMethodLinear=void 0;H7.prototype.InterpolantFactoryMethodSmooth=void 0;class qW extends SJ{}qW.prototype.ValueTypeName="vector";class HW{constructor(J,$,Z){let Q=this,W=!1,K=0,Y=0,X=void 0,q=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Z,this.itemStart=function(H){if(Y++,W===!1){if(Q.onStart!==void 0)Q.onStart(H,K,Y)}W=!0},this.itemEnd=function(H){if(K++,Q.onProgress!==void 0)Q.onProgress(H,K,Y);if(K===Y){if(W=!1,Q.onLoad!==void 0)Q.onLoad()}},this.itemError=function(H){if(Q.onError!==void 0)Q.onError(H)},this.resolveURL=function(H){if(X)return X(H);return H},this.setURLModifier=function(H){return X=H,this},this.addHandler=function(H,U){return q.push(H,U),this},this.removeHandler=function(H){let U=q.indexOf(H);if(U!==-1)q.splice(U,2);return this},this.getHandler=function(H){for(let U=0,G=q.length;U<G;U+=2){let F=q[U],D=q[U+1];if(F.global)F.lastIndex=0;if(F.test(H))return D}return null}}}var pH=new HW;class UW{constructor(J){this.manager=J!==void 0?J:pH,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(J,$){let Z=this;return new Promise(function(Q,W){Z.load(J,Q,$,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}}UW.DEFAULT_MATERIAL_NAME="__DEFAULT";class U7 extends U9{constructor(J,$=1){super();this.isLight=!0,this.type="Light",this.color=new a0(J),this.intensity=$}dispose(){}copy(J,$){return super.copy(J,$),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let $=super.toJSON(J);if($.object.color=this.color.getHex(),$.object.intensity=this.intensity,this.groundColor!==void 0)$.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)$.object.distance=this.distance;if(this.angle!==void 0)$.object.angle=this.angle;if(this.decay!==void 0)$.object.decay=this.decay;if(this.penumbra!==void 0)$.object.penumbra=this.penumbra;if(this.shadow!==void 0)$.object.shadow=this.shadow.toJSON();return $}}class OQ extends U7{constructor(J,$,Z){super(J,Z);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(U9.DEFAULT_UP),this.updateMatrix(),this.groundColor=new a0($)}copy(J,$){return super.copy(J,$),this.groundColor.copy(J.groundColor),this}}var oZ=new Y9,O6=new T,N6=new T;class a${constructor(J){this.camera=J,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U0(512,512),this.map=null,this.mapPass=null,this.matrix=new Y9,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new l$,this._frameExtents=new U0(1,1),this._viewportCount=1,this._viewports=[new H9(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let $=this.camera,Z=this.matrix;O6.setFromMatrixPosition(J.matrixWorld),$.position.copy(O6),N6.setFromMatrixPosition(J.target.matrixWorld),$.lookAt(N6),$.updateMatrixWorld(),oZ.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oZ),Z.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),Z.multiply(oZ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.bias=J.bias,this.radius=J.radius,this.mapSize.copy(J.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}class GW extends a${constructor(){super(new d9(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(J){let $=this.camera,Z=$7*2*J.angle*this.focus,Q=this.mapSize.width/this.mapSize.height,W=J.distance||$.far;if(Z!==$.fov||Q!==$.aspect||W!==$.far)$.fov=Z,$.aspect=Q,$.far=W,$.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this}}class NQ extends U7{constructor(J,$,Z=0,Q=Math.PI/3,W=0,K=2){super(J,$);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(U9.DEFAULT_UP),this.updateMatrix(),this.target=new U9,this.distance=Z,this.angle=Q,this.penumbra=W,this.decay=K,this.map=null,this.shadow=new GW}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}var B6=new Y9,w7=new T,iZ=new T;class FW extends a${constructor(){super(new d9(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new U0(4,2),this._viewportCount=6,this._viewports=[new H9(2,1,1,1),new H9(0,1,1,1),new H9(3,1,1,1),new H9(1,1,1,1),new H9(3,0,1,1),new H9(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(J,$=0){let Z=this.camera,Q=this.matrix,W=J.distance||Z.far;if(W!==Z.far)Z.far=W,Z.updateProjectionMatrix();w7.setFromMatrixPosition(J.matrixWorld),Z.position.copy(w7),iZ.copy(Z.position),iZ.add(this._cubeDirections[$]),Z.up.copy(this._cubeUps[$]),Z.lookAt(iZ),Z.updateMatrixWorld(),Q.makeTranslation(-w7.x,-w7.y,-w7.z),B6.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),this._frustum.setFromProjectionMatrix(B6)}}class f9 extends U7{constructor(J,$,Z=0,Q=2){super(J,$);this.isPointLight=!0,this.type="PointLight",this.distance=Z,this.decay=Q,this.shadow=new FW}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}}class VW extends a${constructor(){super(new HQ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class p7 extends U7{constructor(J,$){super(J,$);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(U9.DEFAULT_UP),this.updateMatrix(),this.target=new U9,this.shadow=new VW}dispose(){this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}class BQ extends U7{constructor(J,$){super(J,$);this.isAmbientLight=!0,this.type="AmbientLight"}}var zQ="\\[\\]\\.:\\/",lH=new RegExp("["+zQ+"]","g"),IQ="[^"+zQ+"]",cH="[^"+zQ.replace("\\.","")+"]",nH=/((?:WC+[\/:])*)/.source.replace("WC",IQ),sH=/(WCOD+)?/.source.replace("WCOD",cH),oH=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",IQ),iH=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",IQ),rH=new RegExp("^"+nH+sH+oH+iH+"$"),aH=["material","materials","bones","map"];class RW{constructor(J,$,Z){let Q=Z||Q9.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,Q)}getValue(J,$){this.bind();let Z=this._targetGroup.nCachedObjects_,Q=this._bindings[Z];if(Q!==void 0)Q.getValue(J,$)}setValue(J,$){let Z=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,W=Z.length;Q!==W;++Q)Z[Q].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Z=J.length;$!==Z;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Z=J.length;$!==Z;++$)J[$].unbind()}}class Q9{constructor(J,$,Z){this.path=$,this.parsedPath=Z||Q9.parseTrackName($),this.node=Q9.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Z){if(!(J&&J.isAnimationObjectGroup))return new Q9(J,$,Z);else return new Q9.Composite(J,$,Z)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(lH,"")}static parseTrackName(J){let $=rH.exec(J);if($===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let Z={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},Q=Z.nodeName&&Z.nodeName.lastIndexOf(".");if(Q!==void 0&&Q!==-1){let W=Z.nodeName.substring(Q+1);if(aH.indexOf(W)!==-1)Z.nodeName=Z.nodeName.substring(0,Q),Z.objectName=W}if(Z.propertyName===null||Z.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return Z}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Z=J.skeleton.getBoneByName($);if(Z!==void 0)return Z}if(J.children){let Z=function(W){for(let K=0;K<W.length;K++){let Y=W[K];if(Y.name===$||Y.uuid===$)return Y;let X=Z(Y.children);if(X)return X}return null},Q=Z(J.children);if(Q)return Q}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)J[$++]=Z[Q]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)Z[Q]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)Z[Q]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)Z[Q]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Z=$.objectName,Q=$.propertyName,W=$.propertyIndex;if(!J)J=Q9.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(Z){let q=$.objectIndex;switch(Z){case"materials":if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let H=0;H<J.length;H++)if(J[H].name===q){q=H;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Z]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Z]}if(q!==void 0){if(J[q]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[q]}}let K=J[Q];if(K===void 0){let q=$.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+q+"."+Q+" but it wasn't found.",J);return}let Y=this.Versioning.None;if(this.targetObject=J,J.needsUpdate!==void 0)Y=this.Versioning.NeedsUpdate;else if(J.matrixWorldNeedsUpdate!==void 0)Y=this.Versioning.MatrixWorldNeedsUpdate;let X=this.BindingType.Direct;if(W!==void 0){if(Q==="morphTargetInfluences"){if(!J.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}X=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)X=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))X=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Q;this.getValue=this.GetterByBindingType[X],this.setValue=this.SetterByBindingTypeAndVersioning[X][Y]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Q9.Composite=RW;Q9.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Q9.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Q9.prototype.GetterByBindingType=[Q9.prototype._getValue_direct,Q9.prototype._getValue_array,Q9.prototype._getValue_arrayElement,Q9.prototype._getValue_toArray];Q9.prototype.SetterByBindingTypeAndVersioning=[[Q9.prototype._setValue_direct,Q9.prototype._setValue_direct_setNeedsUpdate,Q9.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Q9.prototype._setValue_array,Q9.prototype._setValue_array_setNeedsUpdate,Q9.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Q9.prototype._setValue_arrayElement,Q9.prototype._setValue_arrayElement_setNeedsUpdate,Q9.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Q9.prototype._setValue_fromArray,Q9.prototype._setValue_fromArray_setNeedsUpdate,Q9.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var mU=new Float32Array(1);class LQ{constructor(J,$,Z=0,Q=1/0){this.ray=new L8(J,$),this.near=Z,this.far=Q,this.camera=null,this.layers=new p$,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,$){this.ray.set(J,$)}setFromCamera(J,$){if($.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition($.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject($).sub(this.ray.origin).normalize(),this.camera=$;else if($.isOrthographicCamera)this.ray.origin.set(J.x,J.y,($.near+$.far)/($.near-$.far)).unproject($),this.ray.direction.set(0,0,-1).transformDirection($.matrixWorld),this.camera=$;else console.error("THREE.Raycaster: Unsupported camera type: "+$.type)}intersectObject(J,$=!0,Z=[]){return JQ(J,this,Z,$),Z.sort(z6),Z}intersectObjects(J,$=!0,Z=[]){for(let Q=0,W=J.length;Q<W;Q++)JQ(J[Q],this,Z,$);return Z.sort(z6),Z}}function z6(J,$){return J.distance-$.distance}function JQ(J,$,Z,Q){if(J.layers.test($.layers))J.raycast($,Z);if(Q===!0){let W=J.children;for(let K=0,Y=W.length;K<Y;K++)JQ(W[K],$,Z,!0)}}class t${constructor(J=1,$=0,Z=0){return this.radius=J,this.phi=$,this.theta=Z,this}set(J,$,Z){return this.radius=J,this.phi=$,this.theta=Z,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=Math.max(0.000001,Math.min(Math.PI-0.000001,this.phi)),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,$,Z){if(this.radius=Math.sqrt(J*J+$*$+Z*Z),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,Z),this.phi=Math.acos(x9($/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="160";var DW={type:"change"},MQ={type:"start"},EW={type:"end"},e$=new L8,OW=new IJ,eH=Math.cos(70*u$.DEG2RAD);class CQ extends mJ{constructor(J,$){super();this.object=J,this.domElement=$,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:B8.ROTATE,MIDDLE:B8.DOLLY,RIGHT:B8.PAN},this.touches={ONE:z8.ROTATE,TWO:z8.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return Y.phi},this.getAzimuthalAngle=function(){return Y.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(w){w.addEventListener("keydown",E0),this._domElementKeyEvents=w},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",E0),this._domElementKeyEvents=null},this.saveState=function(){Z.target0.copy(Z.target),Z.position0.copy(Z.object.position),Z.zoom0=Z.object.zoom},this.reset=function(){Z.target.copy(Z.target0),Z.object.position.copy(Z.position0),Z.object.zoom=Z.zoom0,Z.object.updateProjectionMatrix(),Z.dispatchEvent(DW),Z.update(),W=Q.NONE},this.update=function(){let w=new T,K0=new CJ().setFromUnitVectors(J.up,new T(0,1,0)),B0=K0.clone().invert(),z0=new T,h0=new CJ,q0=new T,x=2*Math.PI;return function(V0=null){let _0=Z.object.position;if(w.copy(_0).sub(Z.target),w.applyQuaternion(K0),Y.setFromVector3(w),Z.autoRotate&&W===Q.NONE)y(z(V0));if(Z.enableDamping)Y.theta+=X.theta*Z.dampingFactor,Y.phi+=X.phi*Z.dampingFactor;else Y.theta+=X.theta,Y.phi+=X.phi;let{minAzimuthAngle:I0,maxAzimuthAngle:i0}=Z;if(isFinite(I0)&&isFinite(i0)){if(I0<-Math.PI)I0+=x;else if(I0>Math.PI)I0-=x;if(i0<-Math.PI)i0+=x;else if(i0>Math.PI)i0-=x;if(I0<=i0)Y.theta=Math.max(I0,Math.min(i0,Y.theta));else Y.theta=Y.theta>(I0+i0)/2?Math.max(I0,Y.theta):Math.min(i0,Y.theta)}if(Y.phi=Math.max(Z.minPolarAngle,Math.min(Z.maxPolarAngle,Y.phi)),Y.makeSafe(),Z.enableDamping===!0)Z.target.addScaledVector(H,Z.dampingFactor);else Z.target.add(H);if(Z.target.sub(Z.cursor),Z.target.clampLength(Z.minTargetRadius,Z.maxTargetRadius),Z.target.add(Z.cursor),Z.zoomToCursor&&L||Z.object.isOrthographicCamera)Y.radius=h(Y.radius);else Y.radius=h(Y.radius*q);if(w.setFromSpherical(Y),w.applyQuaternion(B0),_0.copy(Z.target).add(w),Z.object.lookAt(Z.target),Z.enableDamping===!0)X.theta*=1-Z.dampingFactor,X.phi*=1-Z.dampingFactor,H.multiplyScalar(1-Z.dampingFactor);else X.set(0,0,0),H.set(0,0,0);let $9=!1;if(Z.zoomToCursor&&L){let q9=null;if(Z.object.isPerspectiveCamera){let C9=w.length();q9=h(C9*q);let r0=C9-q9;Z.object.position.addScaledVector(B,r0),Z.object.updateMatrixWorld()}else if(Z.object.isOrthographicCamera){let C9=new T(I.x,I.y,0);C9.unproject(Z.object),Z.object.zoom=Math.max(Z.minZoom,Math.min(Z.maxZoom,Z.object.zoom/q)),Z.object.updateProjectionMatrix(),$9=!0;let r0=new T(I.x,I.y,0);r0.unproject(Z.object),Z.object.position.sub(r0).add(C9),Z.object.updateMatrixWorld(),q9=w.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),Z.zoomToCursor=!1;if(q9!==null)if(this.screenSpacePanning)Z.target.set(0,0,-1).transformDirection(Z.object.matrix).multiplyScalar(q9).add(Z.object.position);else if(e$.origin.copy(Z.object.position),e$.direction.set(0,0,-1).transformDirection(Z.object.matrix),Math.abs(Z.object.up.dot(e$.direction))<eH)J.lookAt(Z.target);else OW.setFromNormalAndCoplanarPoint(Z.object.up,Z.target),e$.intersectPlane(OW,Z.target)}else if(Z.object.isOrthographicCamera)Z.object.zoom=Math.max(Z.minZoom,Math.min(Z.maxZoom,Z.object.zoom/q)),Z.object.updateProjectionMatrix(),$9=!0;if(q=1,L=!1,$9||z0.distanceToSquared(Z.object.position)>K||8*(1-h0.dot(Z.object.quaternion))>K||q0.distanceToSquared(Z.target)>0)return Z.dispatchEvent(DW),z0.copy(Z.object.position),h0.copy(Z.object.quaternion),q0.copy(Z.target),!0;return!1}}(),this.dispose=function(){if(Z.domElement.removeEventListener("contextmenu",W0),Z.domElement.removeEventListener("pointerdown",y0),Z.domElement.removeEventListener("pointercancel",C),Z.domElement.removeEventListener("wheel",e),Z.domElement.removeEventListener("pointermove",S),Z.domElement.removeEventListener("pointerup",C),Z._domElementKeyEvents!==null)Z._domElementKeyEvents.removeEventListener("keydown",E0),Z._domElementKeyEvents=null};let Z=this,Q={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},W=Q.NONE,K=0.000001,Y=new t$,X=new t$,q=1,H=new T,U=new U0,G=new U0,F=new U0,D=new U0,O=new U0,E=new U0,V=new U0,R=new U0,N=new U0,B=new T,I=new U0,L=!1,M=[],A={},_=!1;function z(w){if(w!==null)return 2*Math.PI/60*Z.autoRotateSpeed*w;else return 2*Math.PI/60/60*Z.autoRotateSpeed}function k(w){let K0=Math.abs(w*0.01);return Math.pow(0.95,Z.zoomSpeed*K0)}function y(w){X.theta-=w}function o(w){X.phi-=w}let t=function(){let w=new T;return function(B0,z0){w.setFromMatrixColumn(z0,0),w.multiplyScalar(-B0),H.add(w)}}(),j=function(){let w=new T;return function(B0,z0){if(Z.screenSpacePanning===!0)w.setFromMatrixColumn(z0,1);else w.setFromMatrixColumn(z0,0),w.crossVectors(Z.object.up,w);w.multiplyScalar(B0),H.add(w)}}(),m=function(){let w=new T;return function(B0,z0){let h0=Z.domElement;if(Z.object.isPerspectiveCamera){let q0=Z.object.position;w.copy(q0).sub(Z.target);let x=w.length();x*=Math.tan(Z.object.fov/2*Math.PI/180),t(2*B0*x/h0.clientHeight,Z.object.matrix),j(2*z0*x/h0.clientHeight,Z.object.matrix)}else if(Z.object.isOrthographicCamera)t(B0*(Z.object.right-Z.object.left)/Z.object.zoom/h0.clientWidth,Z.object.matrix),j(z0*(Z.object.top-Z.object.bottom)/Z.object.zoom/h0.clientHeight,Z.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),Z.enablePan=!1}}();function d(w){if(Z.object.isPerspectiveCamera||Z.object.isOrthographicCamera)q/=w;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Z.enableZoom=!1}function i(w){if(Z.object.isPerspectiveCamera||Z.object.isOrthographicCamera)q*=w;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Z.enableZoom=!1}function n(w,K0){if(!Z.zoomToCursor)return;L=!0;let B0=Z.domElement.getBoundingClientRect(),z0=w-B0.left,h0=K0-B0.top,q0=B0.width,x=B0.height;I.x=z0/q0*2-1,I.y=-(h0/x)*2+1,B.set(I.x,I.y,1).unproject(Z.object).sub(Z.object.position).normalize()}function h(w){return Math.max(Z.minDistance,Math.min(Z.maxDistance,w))}function l(w){U.set(w.clientX,w.clientY)}function r(w){n(w.clientX,w.clientX),V.set(w.clientX,w.clientY)}function f(w){D.set(w.clientX,w.clientY)}function a(w){G.set(w.clientX,w.clientY),F.subVectors(G,U).multiplyScalar(Z.rotateSpeed);let K0=Z.domElement;y(2*Math.PI*F.x/K0.clientHeight),o(2*Math.PI*F.y/K0.clientHeight),U.copy(G),Z.update()}function Z0(w){if(R.set(w.clientX,w.clientY),N.subVectors(R,V),N.y>0)d(k(N.y));else if(N.y<0)i(k(N.y));V.copy(R),Z.update()}function Y0(w){O.set(w.clientX,w.clientY),E.subVectors(O,D).multiplyScalar(Z.panSpeed),m(E.x,E.y),D.copy(O),Z.update()}function O0(w){if(n(w.clientX,w.clientY),w.deltaY<0)i(k(w.deltaY));else if(w.deltaY>0)d(k(w.deltaY));Z.update()}function w0(w){let K0=!1;switch(w.code){case Z.keys.UP:if(w.ctrlKey||w.metaKey||w.shiftKey)o(2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else m(0,Z.keyPanSpeed);K0=!0;break;case Z.keys.BOTTOM:if(w.ctrlKey||w.metaKey||w.shiftKey)o(-2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else m(0,-Z.keyPanSpeed);K0=!0;break;case Z.keys.LEFT:if(w.ctrlKey||w.metaKey||w.shiftKey)y(2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else m(Z.keyPanSpeed,0);K0=!0;break;case Z.keys.RIGHT:if(w.ctrlKey||w.metaKey||w.shiftKey)y(-2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else m(-Z.keyPanSpeed,0);K0=!0;break}if(K0)w.preventDefault(),Z.update()}function P0(w){if(M.length===1)U.set(w.pageX,w.pageY);else{let K0=D0(w),B0=0.5*(w.pageX+K0.x),z0=0.5*(w.pageY+K0.y);U.set(B0,z0)}}function T0(w){if(M.length===1)D.set(w.pageX,w.pageY);else{let K0=D0(w),B0=0.5*(w.pageX+K0.x),z0=0.5*(w.pageY+K0.y);D.set(B0,z0)}}function o0(w){let K0=D0(w),B0=w.pageX-K0.x,z0=w.pageY-K0.y,h0=Math.sqrt(B0*B0+z0*z0);V.set(0,h0)}function v(w){if(Z.enableZoom)o0(w);if(Z.enablePan)T0(w)}function M9(w){if(Z.enableZoom)o0(w);if(Z.enableRotate)P0(w)}function p0(w){if(M.length==1)G.set(w.pageX,w.pageY);else{let B0=D0(w),z0=0.5*(w.pageX+B0.x),h0=0.5*(w.pageY+B0.y);G.set(z0,h0)}F.subVectors(G,U).multiplyScalar(Z.rotateSpeed);let K0=Z.domElement;y(2*Math.PI*F.x/K0.clientHeight),o(2*Math.PI*F.y/K0.clientHeight),U.copy(G)}function M0(w){if(M.length===1)O.set(w.pageX,w.pageY);else{let K0=D0(w),B0=0.5*(w.pageX+K0.x),z0=0.5*(w.pageY+K0.y);O.set(B0,z0)}E.subVectors(O,D).multiplyScalar(Z.panSpeed),m(E.x,E.y),D.copy(O)}function L0(w){let K0=D0(w),B0=w.pageX-K0.x,z0=w.pageY-K0.y,h0=Math.sqrt(B0*B0+z0*z0);R.set(0,h0),N.set(0,Math.pow(R.y/V.y,Z.zoomSpeed)),d(N.y),V.copy(R);let q0=(w.pageX+K0.x)*0.5,x=(w.pageY+K0.y)*0.5;n(q0,x)}function x0(w){if(Z.enableZoom)L0(w);if(Z.enablePan)M0(w)}function v0(w){if(Z.enableZoom)L0(w);if(Z.enableRotate)p0(w)}function y0(w){if(Z.enabled===!1)return;if(M.length===0)Z.domElement.setPointerCapture(w.pointerId),Z.domElement.addEventListener("pointermove",S),Z.domElement.addEventListener("pointerup",C);if(B9(w),w.pointerType==="touch")C0(w);else u(w)}function S(w){if(Z.enabled===!1)return;if(w.pointerType==="touch")g0(w);else $0(w)}function C(w){if(l0(w),M.length===0)Z.domElement.releasePointerCapture(w.pointerId),Z.domElement.removeEventListener("pointermove",S),Z.domElement.removeEventListener("pointerup",C);Z.dispatchEvent(EW),W=Q.NONE}function u(w){let K0;switch(w.button){case 0:K0=Z.mouseButtons.LEFT;break;case 1:K0=Z.mouseButtons.MIDDLE;break;case 2:K0=Z.mouseButtons.RIGHT;break;default:K0=-1}switch(K0){case B8.DOLLY:if(Z.enableZoom===!1)return;r(w),W=Q.DOLLY;break;case B8.ROTATE:if(w.ctrlKey||w.metaKey||w.shiftKey){if(Z.enablePan===!1)return;f(w),W=Q.PAN}else{if(Z.enableRotate===!1)return;l(w),W=Q.ROTATE}break;case B8.PAN:if(w.ctrlKey||w.metaKey||w.shiftKey){if(Z.enableRotate===!1)return;l(w),W=Q.ROTATE}else{if(Z.enablePan===!1)return;f(w),W=Q.PAN}break;default:W=Q.NONE}if(W!==Q.NONE)Z.dispatchEvent(MQ)}function $0(w){switch(W){case Q.ROTATE:if(Z.enableRotate===!1)return;a(w);break;case Q.DOLLY:if(Z.enableZoom===!1)return;Z0(w);break;case Q.PAN:if(Z.enablePan===!1)return;Y0(w);break}}function e(w){if(Z.enabled===!1||Z.enableZoom===!1||W!==Q.NONE)return;w.preventDefault(),Z.dispatchEvent(MQ),O0(Q0(w)),Z.dispatchEvent(EW)}function Q0(w){let K0=w.deltaMode,B0={clientX:w.clientX,clientY:w.clientY,deltaY:w.deltaY};switch(K0){case 1:B0.deltaY*=16;break;case 2:B0.deltaY*=100;break}if(w.ctrlKey&&!_)B0.deltaY*=10;return B0}function S0(w){if(w.key==="Control")_=!0,document.addEventListener("keyup",G0,{passive:!0,capture:!0})}function G0(w){if(w.key==="Control")_=!1,document.removeEventListener("keyup",G0,{passive:!0,capture:!0})}function E0(w){if(Z.enabled===!1||Z.enablePan===!1)return;w0(w)}function C0(w){switch(b0(w),M.length){case 1:switch(Z.touches.ONE){case z8.ROTATE:if(Z.enableRotate===!1)return;P0(w),W=Q.TOUCH_ROTATE;break;case z8.PAN:if(Z.enablePan===!1)return;T0(w),W=Q.TOUCH_PAN;break;default:W=Q.NONE}break;case 2:switch(Z.touches.TWO){case z8.DOLLY_PAN:if(Z.enableZoom===!1&&Z.enablePan===!1)return;v(w),W=Q.TOUCH_DOLLY_PAN;break;case z8.DOLLY_ROTATE:if(Z.enableZoom===!1&&Z.enableRotate===!1)return;M9(w),W=Q.TOUCH_DOLLY_ROTATE;break;default:W=Q.NONE}break;default:W=Q.NONE}if(W!==Q.NONE)Z.dispatchEvent(MQ)}function g0(w){switch(b0(w),W){case Q.TOUCH_ROTATE:if(Z.enableRotate===!1)return;p0(w),Z.update();break;case Q.TOUCH_PAN:if(Z.enablePan===!1)return;M0(w),Z.update();break;case Q.TOUCH_DOLLY_PAN:if(Z.enableZoom===!1&&Z.enablePan===!1)return;x0(w),Z.update();break;case Q.TOUCH_DOLLY_ROTATE:if(Z.enableZoom===!1&&Z.enableRotate===!1)return;v0(w),Z.update();break;default:W=Q.NONE}}function W0(w){if(Z.enabled===!1)return;w.preventDefault()}function B9(w){M.push(w.pointerId)}function l0(w){delete A[w.pointerId];for(let K0=0;K0<M.length;K0++)if(M[K0]==w.pointerId){M.splice(K0,1);return}}function b0(w){let K0=A[w.pointerId];if(K0===void 0)K0=new U0,A[w.pointerId]=K0;K0.set(w.pageX,w.pageY)}function D0(w){let K0=w.pointerId===M[0]?M[1]:M[0];return A[K0]}Z.domElement.addEventListener("contextmenu",W0),Z.domElement.addEventListener("pointerdown",y0),Z.domElement.addEventListener("pointercancel",C),Z.domElement.addEventListener("wheel",e,{passive:!1}),document.addEventListener("keydown",S0,{passive:!0,capture:!0}),this.update()}}function pJ(J){if(J===void 0)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return J}function kW(J,$){J.prototype=Object.create($.prototype),J.prototype.constructor=J,J.__proto__=$}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var JJ={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},i7={duration:0.5,overwrite:!1,delay:0},dQ,h9,F9,RJ=1e8,X9=1/RJ,jQ=Math.PI*2,J4=jQ/4,$4=0,PW=Math.sqrt,Z4=Math.cos,Q4=Math.sin,_9=function($){return typeof $==="string"},I9=function($){return typeof $==="function"},cJ=function($){return typeof $==="number"},HZ=function($){return typeof $>"u"},_J=function($){return typeof $==="object"},e9=function($){return $!==!1},pQ=function(){return typeof window<"u"},JZ=function($){return I9($)||_9($)},SW=typeof ArrayBuffer==="function"&&ArrayBuffer.isView||function(){},l9=Array.isArray,W4=/random\([^)]+\)/g,K4=/,\s*/g,NW=/(?:-?\.?\d|\.)+/gi,lQ=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,k8=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,AQ=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,cQ=/[+-]=-?[.\d]+/,X4=/[^,'"\[\]\s]+/gi,Y4=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,O9,wJ,bQ,nQ,YJ={},WZ={},wW,TW=function($){return(WZ=F7($,YJ))&&c9},UZ=function($,Z){return console.warn("Invalid property",$,"set to",Z,"Missing plugin? gsap.registerPlugin()")},r7=function($,Z){return!Z&&console.warn($)},_W=function($,Z){return $&&(YJ[$]=Z)&&WZ&&(WZ[$]=Z)||YJ},a7=function(){return 0},q4={suppressEvents:!0,isStart:!0,kill:!1},$Z={suppressEvents:!0,kill:!1},H4={suppressEvents:!0},sQ={},Q8=[],xQ={},jW,a9={},kQ={},BW=30,ZZ=[],oQ="",iQ=function($){var Z=$[0],Q,W;if(_J(Z)||I9(Z)||($=[$]),!(Q=(Z._gsap||{}).harness)){W=ZZ.length;while(W--&&!ZZ[W].targetTest(Z));Q=ZZ[W]}W=$.length;while(W--)$[W]&&($[W]._gsap||($[W]._gsap=new eQ($[W],Q)))||$.splice(W,1);return $},W8=function($){return $._gsap||iQ(DJ($))[0]._gsap},rQ=function($,Z,Q){return(Q=$[Z])&&I9(Q)?$[Z]():HZ(Q)&&$.getAttribute&&$.getAttribute(Z)||Q},o9=function($,Z){return($=$.split(",")).forEach(Z)||$},L9=function($){return Math.round($*1e5)/1e5||0},E9=function($){return Math.round($*1e7)/1e7||0},P8=function($,Z){var Q=Z.charAt(0),W=parseFloat(Z.substr(2));return $=parseFloat($),Q==="+"?$+W:Q==="-"?$-W:Q==="*"?$*W:$/W},U4=function($,Z){var Q=Z.length,W=0;for(;$.indexOf(Z[W])<0&&++W<Q;);return W<Q},KZ=function(){var $=Q8.length,Z=Q8.slice(0),Q,W;xQ={},Q8.length=0;for(Q=0;Q<$;Q++)W=Z[Q],W&&W._lazy&&(W.render(W._lazy[0],W._lazy[1],!0)._lazy=0)},aQ=function($){return!!($._initted||$._startAt||$.add)},bW=function($,Z,Q,W){Q8.length&&!h9&&KZ(),$.render(Z,Q,W||!!(h9&&Z<0&&aQ($))),Q8.length&&!h9&&KZ()},xW=function($){var Z=parseFloat($);return(Z||Z===0)&&($+"").match(X4).length<2?Z:_9($)?$.trim():$},yW=function($){return $},$J=function($,Z){for(var Q in Z)Q in $||($[Q]=Z[Q]);return $},G4=function($){return function(Z,Q){for(var W in Q)W in Z||W==="duration"&&$||W==="ease"||(Z[W]=Q[W])}},F7=function($,Z){for(var Q in Z)$[Q]=Z[Q];return $},zW=function J($,Z){for(var Q in Z)Q!=="__proto__"&&Q!=="constructor"&&Q!=="prototype"&&($[Q]=_J(Z[Q])?J($[Q]||($[Q]={}),Z[Q]):Z[Q]);return $},XZ=function($,Z){var Q={},W;for(W in $)W in Z||(Q[W]=$[W]);return Q},n7=function($){var Z=$.parent||O9,Q=$.keyframes?G4(l9($.keyframes)):$J;if(e9($.inherit))while(Z)Q($,Z.vars.defaults),Z=Z.parent||Z._dp;return $},F4=function($,Z){var Q=$.length,W=Q===Z.length;while(W&&Q--&&$[Q]===Z[Q]);return Q<0},fW=function($,Z,Q,W,K){if(Q===void 0)Q="_first";if(W===void 0)W="_last";var Y=$[W],X;if(K){X=Z[K];while(Y&&Y[K]>X)Y=Y._prev}if(Y)Z._next=Y._next,Y._next=Z;else Z._next=$[Q],$[Q]=Z;if(Z._next)Z._next._prev=Z;else $[W]=Z;return Z._prev=Y,Z.parent=Z._dp=$,Z},J$=function($,Z,Q,W){if(Q===void 0)Q="_first";if(W===void 0)W="_last";var{_prev:K,_next:Y}=Z;if(K)K._next=Y;else if($[Q]===Z)$[Q]=Y;if(Y)Y._prev=K;else if($[W]===Z)$[W]=K;Z._next=Z._prev=Z.parent=null},K8=function($,Z){$.parent&&(!Z||$.parent.autoRemoveChildren)&&$.parent.remove&&$.parent.remove($),$._act=0},M8=function($,Z){if($&&(!Z||Z._end>$._dur||Z._start<0)){var Q=$;while(Q)Q._dirty=1,Q=Q.parent}return $},V4=function($){var Z=$.parent;while(Z&&Z.parent)Z._dirty=1,Z.totalDuration(),Z=Z.parent;return $},yQ=function($,Z,Q,W){return $._startAt&&(h9?$._startAt.revert($Z):$.vars.immediateRender&&!$.vars.autoRevert||$._startAt.render(Z,!0,W))},R4=function J($){return!$||$._ts&&J($.parent)},IW=function($){return $._repeat?V7($._tTime,$=$.duration()+$._rDelay)*$:0},V7=function($,Z){var Q=Math.floor($=E9($/Z));return $&&Q===$?Q-1:Q},YZ=function($,Z){return($-Z._start)*Z._ts+(Z._ts>=0?0:Z._dirty?Z.totalDuration():Z._tDur)},GZ=function($){return $._end=E9($._start+($._tDur/Math.abs($._ts||$._rts||X9)||0))},FZ=function($,Z){var Q=$._dp;if(Q&&Q.smoothChildTiming&&$._ts)$._start=E9(Q._time-($._ts>0?Z/$._ts:(($._dirty?$.totalDuration():$._tDur)-Z)/-$._ts)),GZ($),Q._dirty||M8(Q,$);return $},hW=function($,Z){var Q;if(Z._time||!Z._dur&&Z._initted||Z._start<$._time&&(Z._dur||!Z.add)){if(Q=YZ($.rawTime(),Z),!Z._dur||$$(0,Z.totalDuration(),Q)-Z._tTime>X9)Z.render(Q,!0)}if(M8($,Z)._dp&&$._initted&&$._time>=$._dur&&$._ts){if($._dur<$.duration()){Q=$;while(Q._dp)Q.rawTime()>=0&&Q.totalTime(Q._tTime),Q=Q._dp}$._zTime=-X9}},TJ=function($,Z,Q,W){return Z.parent&&K8(Z),Z._start=E9((cJ(Q)?Q:Q||$!==O9?VJ($,Q,Z):$._time)+Z._delay),Z._end=E9(Z._start+(Z.totalDuration()/Math.abs(Z.timeScale())||0)),fW($,Z,"_first","_last",$._sort?"_start":0),fQ(Z)||($._recent=Z),W||hW($,Z),$._ts<0&&FZ($,$._tTime),$},vW=function($,Z){return(YJ.ScrollTrigger||UZ("scrollTrigger",Z))&&YJ.ScrollTrigger.create(Z,$)},gW=function($,Z,Q,W,K){if(Z5($,Z,K),!$._initted)return 1;if(!Q&&$._pt&&!h9&&($._dur&&$.vars.lazy!==!1||!$._dur&&$.vars.lazy)&&jW!==t9.frame)return Q8.push($),$._lazy=[K,W],1},D4=function J($){var Z=$.parent;return Z&&Z._ts&&Z._initted&&!Z._lock&&(Z.rawTime()<0||J(Z))},fQ=function($){var Z=$.data;return Z==="isFromStart"||Z==="isStart"},E4=function($,Z,Q,W){var K=$.ratio,Y=Z<0||!Z&&(!$._start&&D4($)&&!(!$._initted&&fQ($))||($._ts<0||$._dp._ts<0)&&!fQ($))?0:1,X=$._rDelay,q=0,H,U,G;if(X&&$._repeat){if(q=$$(0,$._tDur,Z),U=V7(q,X),$._yoyo&&U&1&&(Y=1-Y),U!==V7($._tTime,X))K=1-Y,$.vars.repeatRefresh&&$._initted&&$.invalidate()}if(Y!==K||h9||W||$._zTime===X9||!Z&&$._zTime){if(!$._initted&&gW($,Z,W,Q,q))return;G=$._zTime,$._zTime=Z||(Q?X9:0),Q||(Q=Z&&!G),$.ratio=Y,$._from&&(Y=1-Y),$._time=0,$._tTime=q,H=$._pt;while(H)H.r(Y,H.d),H=H._next;if(Z<0&&yQ($,Z,Q,!0),$._onUpdate&&!Q&&XJ($,"onUpdate"),q&&$._repeat&&!Q&&$.parent&&XJ($,"onRepeat"),(Z>=$._tDur||Z<0)&&$.ratio===Y){if(Y&&K8($,1),!Q&&!h9)XJ($,Y?"onComplete":"onReverseComplete",!0),$._prom&&$._prom()}}else if(!$._zTime)$._zTime=Z},O4=function($,Z,Q){var W;if(Q>Z){W=$._first;while(W&&W._start<=Q){if(W.data==="isPause"&&W._start>Z)return W;W=W._next}}else{W=$._last;while(W&&W._start>=Q){if(W.data==="isPause"&&W._start<Z)return W;W=W._prev}}},R7=function($,Z,Q,W){var K=$._repeat,Y=E9(Z)||0,X=$._tTime/$._tDur;return X&&!W&&($._time*=Y/$._dur),$._dur=Y,$._tDur=!K?Y:K<0?10000000000:E9(Y*(K+1)+$._rDelay*K),X>0&&!W&&FZ($,$._tTime=$._tDur*X),$.parent&&GZ($),Q||M8($.parent,$),$},LW=function($){return $ instanceof p9?M8($):R7($,$._dur)},N4={_start:0,endTime:a7,totalDuration:a7},VJ=function J($,Z,Q){var W=$.labels,K=$._recent||N4,Y=$.duration()>=RJ?K.endTime(!1):$._dur,X,q,H;if(_9(Z)&&(isNaN(Z)||(Z in W))){if(q=Z.charAt(0),H=Z.substr(-1)==="%",X=Z.indexOf("="),q==="<"||q===">")return X>=0&&(Z=Z.replace(/=/,"")),(q==="<"?K._start:K.endTime(K._repeat>=0))+(parseFloat(Z.substr(1))||0)*(H?(X<0?K:Q).totalDuration()/100:1);if(X<0)return Z in W||(W[Z]=Y),W[Z];if(q=parseFloat(Z.charAt(X-1)+Z.substr(X+1)),H&&Q)q=q/100*(l9(Q)?Q[0]:Q).totalDuration();return X>1?J($,Z.substr(0,X-1),Q)+q:Y+q}return Z==null?Y:+Z},s7=function($,Z,Q){var W=cJ(Z[1]),K=(W?2:1)+($<2?0:1),Y=Z[K],X,q;if(W&&(Y.duration=Z[1]),Y.parent=Q,$){X=Y,q=Q;while(q&&!("immediateRender"in X))X=q.vars.defaults||{},q=e9(q.vars.inherit)&&q.parent;Y.immediateRender=e9(X.immediateRender),$<2?Y.runBackwards=1:Y.startAt=Z[K-1]}return new P9(Z[0],Y,Z[K+1])},X8=function($,Z){return $||$===0?Z($):Z},$$=function($,Z,Q){return Q<$?$:Q>Z?Z:Q},v9=function($,Z){return!_9($)||!(Z=Y4.exec($))?"":Z[1]},B4=function($,Z,Q){return X8(Q,function(W){return $$($,Z,W)})},hQ=[].slice,mW=function($,Z){return $&&_J($)&&"length"in $&&(!Z&&!$.length||($.length-1 in $)&&_J($[0]))&&!$.nodeType&&$!==wJ},z4=function($,Z,Q){if(Q===void 0)Q=[];return $.forEach(function(W){var K;return _9(W)&&!Z||mW(W,1)?(K=Q).push.apply(K,DJ(W)):Q.push(W)})||Q},DJ=function($,Z,Q){return F9&&!Z&&F9.selector?F9.selector($):_9($)&&!Q&&(bQ||!D7())?hQ.call((Z||nQ).querySelectorAll($),0):l9($)?z4($,Q):mW($)?hQ.call($,0):$?[$]:[]},vQ=function($){return $=DJ($)[0]||r7("Invalid scope")||{},function(Z){var Q=$.current||$.nativeElement||$;return DJ(Z,Q.querySelectorAll?Q:Q===$?r7("Invalid scope")||nQ.createElement("div"):$)}},uW=function($){return $.sort(function(){return 0.5-Math.random()})},dW=function($){if(I9($))return $;var Z=_J($)?$:{each:$},Q=C8(Z.ease),W=Z.from||0,K=parseFloat(Z.base)||0,Y={},X=W>0&&W<1,q=isNaN(W)||X,H=Z.axis,U=W,G=W;if(_9(W))U=G={center:0.5,edges:0.5,end:1}[W]||0;else if(!X&&q)U=W[0],G=W[1];return function(F,D,O){var E=(O||Z).length,V=Y[E],R,N,B,I,L,M,A,_,z;if(!V){if(z=Z.grid==="auto"?0:(Z.grid||[1,RJ])[1],!z){A=-RJ;while(A<(A=O[z++].getBoundingClientRect().left)&&z<E);z<E&&z--}V=Y[E]=[],R=q?Math.min(z,E)*U-0.5:W%z,N=z===RJ?0:q?E*G/z-0.5:W/z|0,A=0,_=RJ;for(M=0;M<E;M++)B=M%z-R,I=N-(M/z|0),V[M]=L=!H?PW(B*B+I*I):Math.abs(H==="y"?I:B),L>A&&(A=L),L<_&&(_=L);W==="random"&&uW(V),V.max=A-_,V.min=_,V.v=E=(parseFloat(Z.amount)||parseFloat(Z.each)*(z>E?E-1:!H?Math.max(z,E/z):H==="y"?E/z:z)||0)*(W==="edges"?-1:1),V.b=E<0?K-E:K,V.u=v9(Z.amount||Z.each)||0,Q=Q&&E<0?b4(Q):Q}return E=(V[F]-V.min)/V.max||0,E9(V.b+(Q?Q(E):E)*V.v)+V.u}},gQ=function($){var Z=Math.pow(10,(($+"").split(".")[1]||"").length);return function(Q){var W=E9(Math.round(parseFloat(Q)/$)*$*Z);return(W-W%1)/Z+(cJ(Q)?0:v9(Q))}},pW=function($,Z){var Q=l9($),W,K;if(!Q&&_J($))if(W=Q=$.radius||RJ,$.values){if($=DJ($.values),K=!cJ($[0]))W*=W}else $=gQ($.increment);return X8(Z,!Q?gQ($):I9($)?function(Y){return K=$(Y),Math.abs(K-Y)<=W?K:Y}:function(Y){var X=parseFloat(K?Y.x:Y),q=parseFloat(K?Y.y:0),H=RJ,U=0,G=$.length,F,D;while(G--){if(K)F=$[G].x-X,D=$[G].y-q,F=F*F+D*D;else F=Math.abs($[G]-X);if(F<H)H=F,U=G}return U=!W||H<=W?$[U]:Y,K||U===Y||cJ(Y)?U:U+v9(Y)})},lW=function($,Z,Q,W){return X8(l9($)?!Z:Q===!0?!!(Q=0):!W,function(){return l9($)?$[~~(Math.random()*$.length)]:(Q=Q||0.00001)&&(W=Q<1?Math.pow(10,(Q+"").length-2):1)&&Math.floor(Math.round(($-Q/2+Math.random()*(Z-$+Q*0.99))/Q)*Q*W)/W})},I4=function(){for(var $=arguments.length,Z=Array($),Q=0;Q<$;Q++)Z[Q]=arguments[Q];return function(W){return Z.reduce(function(K,Y){return Y(K)},W)}},L4=function($,Z){return function(Q){return $(parseFloat(Q))+(Z||v9(Q))}},M4=function($,Z,Q){return nW($,Z,0,1,Q)},cW=function($,Z,Q){return X8(Q,function(W){return $[~~Z(W)]})},C4=function J($,Z,Q){var W=Z-$;return l9($)?cW($,J(0,$.length),Z):X8(Q,function(K){return(W+(K-$)%W)%W+$})},A4=function J($,Z,Q){var W=Z-$,K=W*2;return l9($)?cW($,J(0,$.length-1),Z):X8(Q,function(Y){return Y=(K+(Y-$)%K)%K||0,$+(Y>W?K-Y:Y)})},E7=function($){return $.replace(W4,function(Z){var Q=Z.indexOf("[")+1,W=Z.substring(Q||7,Q?Z.indexOf("]"):Z.length-1).split(K4);return lW(Q?W:+W[0],Q?0:+W[1],+W[2]||0.00001)})},nW=function($,Z,Q,W,K){var Y=Z-$,X=W-Q;return X8(K,function(q){return Q+((q-$)/Y*X||0)})},k4=function J($,Z,Q,W){var K=isNaN($+Z)?0:function(D){return(1-D)*$+D*Z};if(!K){var Y=_9($),X={},q,H,U,G,F;if(Q===!0&&(W=1)&&(Q=null),Y)$={p:$},Z={p:Z};else if(l9($)&&!l9(Z)){U=[],G=$.length,F=G-2;for(H=1;H<G;H++)U.push(J($[H-1],$[H]));G--,K=function(O){O*=G;var E=Math.min(F,~~O);return U[E](O-E)},Q=Z}else if(!W)$=F7(l9($)?[]:{},$);if(!U){for(q in Z)J5.call(X,$,q,"get",Z[q]);K=function(O){return K5(O,X)||(Y?$.p:$)}}}return X8(Q,K)},MW=function($,Z,Q){var W=$.labels,K=RJ,Y,X,q;for(Y in W)if(X=W[Y]-Z,X<0===!!Q&&X&&K>(X=Math.abs(X)))q=Y,K=X;return q},XJ=function($,Z,Q){var W=$.vars,K=W[Z],Y=F9,X=$._ctx,q,H,U;if(!K)return;return q=W[Z+"Params"],H=W.callbackScope||$,Q&&Q8.length&&KZ(),X&&(F9=X),U=q?K.apply(H,q):K.call(H),F9=Y,U},l7=function($){return K8($),$.scrollTrigger&&$.scrollTrigger.kill(!!h9),$.progress()<1&&XJ($,"onInterrupt"),$},G7,sW=[],oW=function($){if(!$)return;if($=!$.name&&$.default||$,pQ()||$.headless){var Z=$.name,Q=I9($),W=Z&&!Q&&$.init?function(){this._props=[]}:$,K={init:a7,render:K5,add:J5,kill:p4,modifier:d4,rawVars:0},Y={targetTest:0,get:0,getSetter:VZ,aliases:{},register:0};if(D7(),$!==W){if(a9[Z])return;if($J(W,$J(XZ($,K),Y)),F7(W.prototype,F7(K,XZ($,Y))),a9[W.prop=Z]=W,$.targetTest)ZZ.push(W),sQ[Z]=1;Z=(Z==="css"?"CSS":Z.charAt(0).toUpperCase()+Z.substr(1))+"Plugin"}_W(Z,W),$.register&&$.register(c9,W,i9)}else sW.push($)},K9=255,c7={aqua:[0,K9,K9],lime:[0,K9,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,K9],navy:[0,0,128],white:[K9,K9,K9],olive:[128,128,0],yellow:[K9,K9,0],orange:[K9,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[K9,0,0],pink:[K9,192,203],cyan:[0,K9,K9],transparent:[K9,K9,K9,0]},PQ=function($,Z,Q){return $+=$<0?1:$>1?-1:0,($*6<1?Z+(Q-Z)*$*6:$<0.5?Q:$*3<2?Z+(Q-Z)*(0.6666666666666666-$)*6:Z)*K9+0.5|0},iW=function($,Z,Q){var W=!$?c7.black:cJ($)?[$>>16,$>>8&K9,$&K9]:0,K,Y,X,q,H,U,G,F,D,O;if(!W){if($.substr(-1)===",")$=$.substr(0,$.length-1);if(c7[$])W=c7[$];else if($.charAt(0)==="#"){if($.length<6)K=$.charAt(1),Y=$.charAt(2),X=$.charAt(3),$="#"+K+K+Y+Y+X+X+($.length===5?$.charAt(4)+$.charAt(4):"");if($.length===9)return W=parseInt($.substr(1,6),16),[W>>16,W>>8&K9,W&K9,parseInt($.substr(7),16)/255];$=parseInt($.substr(1),16),W=[$>>16,$>>8&K9,$&K9]}else if($.substr(0,3)==="hsl"){if(W=O=$.match(NW),!Z)q=+W[0]%360/360,H=+W[1]/100,U=+W[2]/100,Y=U<=0.5?U*(H+1):U+H-U*H,K=U*2-Y,W.length>3&&(W[3]*=1),W[0]=PQ(q+0.3333333333333333,K,Y),W[1]=PQ(q,K,Y),W[2]=PQ(q-0.3333333333333333,K,Y);else if(~$.indexOf("="))return W=$.match(lQ),Q&&W.length<4&&(W[3]=1),W}else W=$.match(NW)||c7.transparent;W=W.map(Number)}if(Z&&!O){if(K=W[0]/K9,Y=W[1]/K9,X=W[2]/K9,G=Math.max(K,Y,X),F=Math.min(K,Y,X),U=(G+F)/2,G===F)q=H=0;else D=G-F,H=U>0.5?D/(2-G-F):D/(G+F),q=G===K?(Y-X)/D+(Y<X?6:0):G===Y?(X-K)/D+2:(K-Y)/D+4,q*=60;W[0]=~~(q+0.5),W[1]=~~(H*100+0.5),W[2]=~~(U*100+0.5)}return Q&&W.length<4&&(W[3]=1),W},rW=function($){var Z=[],Q=[],W=-1;return $.split(lJ).forEach(function(K){var Y=K.match(k8)||[];Z.push.apply(Z,Y),Q.push(W+=Y.length+1)}),Z.c=Q,Z},CW=function($,Z,Q){var W="",K=($+W).match(lJ),Y=Z?"hsla(":"rgba(",X=0,q,H,U,G;if(!K)return $;if(K=K.map(function(F){return(F=iW(F,Z,1))&&Y+(Z?F[0]+","+F[1]+"%,"+F[2]+"%,"+F[3]:F.join(","))+")"}),Q){if(U=rW($),q=Q.c,q.join(W)!==U.c.join(W)){H=$.replace(lJ,"1").split(k8),G=H.length-1;for(;X<G;X++)W+=H[X]+(~q.indexOf(X)?K.shift()||Y+"0,0,0,0)":(U.length?U:K.length?K:Q).shift())}}if(!H){H=$.split(lJ),G=H.length-1;for(;X<G;X++)W+=H[X]+K[X]}return W+H[G]},lJ=function(){var J="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",$;for($ in c7)J+="|"+$+"\\b";return new RegExp(J+")","gi")}(),P4=/hsl[a]?\(/,tQ=function($){var Z=$.join(" "),Q;if(lJ.lastIndex=0,lJ.test(Z))return Q=P4.test(Z),$[1]=CW($[1],Q),$[0]=CW($[0],Q,rW($[1])),!0},t7,t9=function(){var J=Date.now,$=500,Z=33,Q=J(),W=Q,K=4.166666666666667,Y=K,X=[],q,H,U,G,F,D,O=function E(V){var R=J()-W,N=V===!0,B,I,L,M;if((R>$||R<0)&&(Q+=R-Z),W+=R,L=W-Q,B=L-Y,B>0||N)M=++G.frame,F=L-G.time*1000,G.time=L=L/1000,Y+=B+(B>=K?4:K-B),I=1;if(N||(q=H(E)),I)for(D=0;D<X.length;D++)X[D](L,F,M,V)};return G={time:0,frame:0,tick:function(){O(!0)},deltaRatio:function(V){return F/(1000/(V||60))},wake:function(){if(wW){if(!bQ&&pQ())wJ=bQ=window,nQ=wJ.document||{},YJ.gsap=c9,(wJ.gsapVersions||(wJ.gsapVersions=[])).push(c9.version),TW(WZ||wJ.GreenSockGlobals||!wJ.gsap&&wJ||{}),sW.forEach(oW);U=typeof requestAnimationFrame<"u"&&requestAnimationFrame,q&&G.sleep(),H=U||function(V){return setTimeout(V,Y-G.time*1000+1|0)},t7=1,O(2)}},sleep:function(){(U?cancelAnimationFrame:clearTimeout)(q),t7=0,H=a7},lagSmoothing:function(V,R){$=V||1/0,Z=Math.min(R||33,$)},fps:function(V){K=1000/(V||240),Y=G.time*1000+K},add:function(V,R,N){var B=R?function(I,L,M,A){V(I,L,M,A),G.remove(B)}:V;return G.remove(V),X[N?"unshift":"push"](B),D7(),B},remove:function(V,R){~(R=X.indexOf(V))&&X.splice(R,1)&&D>=R&&D--},_listeners:X},G}(),D7=function(){return!t7&&t9.wake()},e0={},S4=/^[\d.\-M][\d.\-,\s]/,w4=/["']/g,T4=function($){var Z={},Q=$.substr(1,$.length-3).split(":"),W=Q[0],K=1,Y=Q.length,X,q,H;for(;K<Y;K++)q=Q[K],X=K!==Y-1?q.lastIndexOf(","):q.length,H=q.substr(0,X),Z[W]=isNaN(H)?H.replace(w4,"").trim():+H,W=q.substr(X+1).trim();return Z},_4=function($){var Z=$.indexOf("(")+1,Q=$.indexOf(")"),W=$.indexOf("(",Z);return $.substring(Z,~W&&W<Q?$.indexOf(")",Q+1):Q)},j4=function($){var Z=($+"").split("("),Q=e0[Z[0]];return Q&&Z.length>1&&Q.config?Q.config.apply(null,~$.indexOf("{")?[T4(Z[1])]:_4($).split(",").map(xW)):e0._CE&&S4.test($)?e0._CE("",$):Q},b4=function($){return function(Z){return 1-$(1-Z)}},C8=function($,Z){return!$?Z:(I9($)?$:e0[$]||j4($))||Z},S8=function($,Z,Q,W){if(Q===void 0)Q=function(q){return 1-Z(1-q)};if(W===void 0)W=function(q){return q<0.5?Z(q*2)/2:1-Z((1-q)*2)/2};var K={easeIn:Z,easeOut:Q,easeInOut:W},Y;return o9($,function(X){e0[X]=YJ[X]=K,e0[Y=X.toLowerCase()]=Q;for(var q in K)e0[Y+(q==="easeIn"?".in":q==="easeOut"?".out":".inOut")]=e0[X+"."+q]=K[q]}),K},aW=function($){return function(Z){return Z<0.5?(1-$(1-Z*2))/2:0.5+$((Z-0.5)*2)/2}},SQ=function J($,Z,Q){var W=Z>=1?Z:1,K=(Q||($?0.3:0.45))/(Z<1?Z:1),Y=K/jQ*(Math.asin(1/W)||0),X=function(U){return U===1?1:W*Math.pow(2,-10*U)*Q4((U-Y)*K)+1},q=$==="out"?X:$==="in"?function(H){return 1-X(1-H)}:aW(X);return K=jQ/K,q.config=function(H,U){return J($,H,U)},q},wQ=function J($,Z){if(Z===void 0)Z=1.70158;var Q=function(Y){return Y?--Y*Y*((Z+1)*Y+Z)+1:0},W=$==="out"?Q:$==="in"?function(K){return 1-Q(1-K)}:aW(Q);return W.config=function(K){return J($,K)},W};o9("Linear,Quad,Cubic,Quart,Quint,Strong",function(J,$){var Z=$<5?$+1:$;S8(J+",Power"+(Z-1),$?function(Q){return Math.pow(Q,Z)}:function(Q){return Q},function(Q){return 1-Math.pow(1-Q,Z)},function(Q){return Q<0.5?Math.pow(Q*2,Z)/2:1-Math.pow((1-Q)*2,Z)/2})});e0.Linear.easeNone=e0.none=e0.Linear.easeIn;S8("Elastic",SQ("in"),SQ("out"),SQ());(function(J,$){var Z=1/$,Q=2*Z,W=2.5*Z,K=function(X){return X<Z?J*X*X:X<Q?J*Math.pow(X-1.5/$,2)+0.75:X<W?J*(X-=2.25/$)*X+0.9375:J*Math.pow(X-2.625/$,2)+0.984375};S8("Bounce",function(Y){return 1-K(1-Y)},K)})(7.5625,2.75);S8("Expo",function(J){return Math.pow(2,10*(J-1))*J+J*J*J*J*J*J*(1-J)});S8("Circ",function(J){return-(PW(1-J*J)-1)});S8("Sine",function(J){return J===1?1:-Z4(J*J4)+1});S8("Back",wQ("in"),wQ("out"),wQ());e0.SteppedEase=e0.steps=YJ.SteppedEase={config:function($,Z){if($===void 0)$=1;var Q=1/$,W=$+(Z?0:1),K=Z?1:0,Y=1-X9;return function(X){return((W*$$(0,Y,X)|0)+K)*Q}}};i7.ease=e0["quad.out"];o9("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(J){return oQ+=J+","+J+"Params,"});var eQ=function($,Z){this.id=$4++,$._gsap=this,this.target=$,this.harness=Z,this.get=Z?Z.get:rQ,this.set=Z?Z.getSetter:VZ},e7=function(){function J(Z){if(this.vars=Z,this._delay=+Z.delay||0,this._repeat=Z.repeat===1/0?-2:Z.repeat||0)this._rDelay=Z.repeatDelay||0,this._yoyo=!!Z.yoyo||!!Z.yoyoEase;if(this._ts=1,R7(this,+Z.duration,1,1),this.data=Z.data,F9)this._ctx=F9,F9.data.push(this);t7||t9.wake()}var $=J.prototype;return $.delay=function(Q){if(Q||Q===0)return this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+Q-this._delay),this._delay=Q,this;return this._delay},$.duration=function(Q){return arguments.length?this.totalDuration(this._repeat>0?Q+(Q+this._rDelay)*this._repeat:Q):this.totalDuration()&&this._dur},$.totalDuration=function(Q){if(!arguments.length)return this._tDur;return this._dirty=0,R7(this,this._repeat<0?Q:(Q-this._repeat*this._rDelay)/(this._repeat+1))},$.totalTime=function(Q,W){if(D7(),!arguments.length)return this._tTime;var K=this._dp;if(K&&K.smoothChildTiming&&this._ts){FZ(this,Q),!K._dp||K.parent||hW(K,this);while(K&&K.parent){if(K.parent._time!==K._start+(K._ts>=0?K._tTime/K._ts:(K.totalDuration()-K._tTime)/-K._ts))K.totalTime(K._tTime,!0);K=K.parent}if(!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&Q<this._tDur||this._ts<0&&Q>0||!this._tDur&&!Q))TJ(this._dp,this,this._start-this._delay)}if(this._tTime!==Q||!this._dur&&!W||this._initted&&Math.abs(this._zTime)===X9||!this._initted&&this._dur&&Q||!Q&&!this._initted&&(this.add||this._ptLookup))this._ts||(this._pTime=Q),bW(this,Q,W);return this},$.time=function(Q,W){return arguments.length?this.totalTime(Math.min(this.totalDuration(),Q+IW(this))%(this._dur+this._rDelay)||(Q?this._dur:0),W):this._time},$.totalProgress=function(Q,W){return arguments.length?this.totalTime(this.totalDuration()*Q,W):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},$.progress=function(Q,W){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-Q:Q)+IW(this),W):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},$.iteration=function(Q,W){var K=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(Q-1)*K,W):this._repeat?V7(this._tTime,K)+1:1},$.timeScale=function(Q,W){if(!arguments.length)return this._rts===-X9?0:this._rts;if(this._rts===Q)return this;var K=this.parent&&this._ts?YZ(this.parent._time,this):this._tTime;return this._rts=+Q||0,this._ts=this._ps||Q===-X9?0:this._rts,this.totalTime($$(-Math.abs(this._delay),this.totalDuration(),K),W!==!1),GZ(this),V4(this)},$.paused=function(Q){if(!arguments.length)return this._ps;if(this._ps!==Q)if(this._ps=Q,Q)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else D7(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==X9&&(this._tTime-=X9));return this},$.startTime=function(Q){if(arguments.length){this._start=E9(Q);var W=this.parent||this._dp;return W&&(W._sort||!this.parent)&&TJ(W,this,this._start-this._delay),this}return this._start},$.endTime=function(Q){return this._start+(e9(Q)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},$.rawTime=function(Q){var W=this.parent||this._dp;return!W?this._tTime:Q&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):!this._ts?this._tTime:YZ(W.rawTime(Q),this)},$.revert=function(Q){if(Q===void 0)Q=H4;var W=h9;if(h9=Q,aQ(this))this.timeline&&this.timeline.revert(Q),this.totalTime(-0.01,Q.suppressEvents);return this.data!=="nested"&&Q.kill!==!1&&this.kill(),h9=W,this},$.globalTime=function(Q){var W=this,K=arguments.length?Q:W.rawTime();while(W)K=W._start+K/(Math.abs(W._ts)||1),W=W._dp;return!this.parent&&this._sat?this._sat.globalTime(Q):K},$.repeat=function(Q){if(arguments.length)return this._repeat=Q===1/0?-2:Q,LW(this);return this._repeat===-2?1/0:this._repeat},$.repeatDelay=function(Q){if(arguments.length){var W=this._time;return this._rDelay=Q,LW(this),W?this.time(W):this}return this._rDelay},$.yoyo=function(Q){if(arguments.length)return this._yoyo=Q,this;return this._yoyo},$.seek=function(Q,W){return this.totalTime(VJ(this,Q),e9(W))},$.restart=function(Q,W){return this.play().totalTime(Q?-this._delay:0,e9(W)),this._dur||(this._zTime=-X9),this},$.play=function(Q,W){return Q!=null&&this.seek(Q,W),this.reversed(!1).paused(!1)},$.reverse=function(Q,W){return Q!=null&&this.seek(Q||this.totalDuration(),W),this.reversed(!0).paused(!1)},$.pause=function(Q,W){return Q!=null&&this.seek(Q,W),this.paused(!0)},$.resume=function(){return this.paused(!1)},$.reversed=function(Q){if(arguments.length)return!!Q!==this.reversed()&&this.timeScale(-this._rts||(Q?-X9:0)),this;return this._rts<0},$.invalidate=function(){return this._initted=this._act=0,this._zTime=-X9,this},$.isActive=function(){var Q=this.parent||this._dp,W=this._start,K;return!!(!Q||this._ts&&this._initted&&Q.isActive()&&(K=Q.rawTime(!0))>=W&&K<this.endTime(!0)-X9)},$.eventCallback=function(Q,W,K){var Y=this.vars;if(arguments.length>1){if(!W)delete Y[Q];else Y[Q]=W,K&&(Y[Q+"Params"]=K),Q==="onUpdate"&&(this._onUpdate=W);return this}return Y[Q]},$.then=function(Q){var W=this,K=W._prom;return new Promise(function(Y){var X=I9(Q)?Q:yW,q=function(){var U=W.then;W.then=null,K&&K(),I9(X)&&(X=X(W))&&(X.then||X===W)&&(W.then=U),Y(X),W.then=U};if(W._initted&&W.totalProgress()===1&&W._ts>=0||!W._tTime&&W._ts<0)q();else W._prom=q})},$.kill=function(){l7(this)},J}();$J(e7.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-X9,_prom:0,_ps:!1,_rts:1});var p9=function(J){kW($,J);function $(Q,W){var K;if(Q===void 0)Q={};return K=J.call(this,Q)||this,K.labels={},K.smoothChildTiming=!!Q.smoothChildTiming,K.autoRemoveChildren=!!Q.autoRemoveChildren,K._sort=e9(Q.sortChildren),O9&&TJ(Q.parent||O9,pJ(K),W),Q.reversed&&K.reverse(),Q.paused&&K.paused(!0),Q.scrollTrigger&&vW(pJ(K),Q.scrollTrigger),K}var Z=$.prototype;return Z.to=function(W,K,Y){return s7(0,arguments,this),this},Z.from=function(W,K,Y){return s7(1,arguments,this),this},Z.fromTo=function(W,K,Y,X){return s7(2,arguments,this),this},Z.set=function(W,K,Y){return K.duration=0,K.parent=this,n7(K).repeatDelay||(K.repeat=0),K.immediateRender=!!K.immediateRender,new P9(W,K,VJ(this,Y),1),this},Z.call=function(W,K,Y){return TJ(this,P9.delayedCall(0,W,K),Y)},Z.staggerTo=function(W,K,Y,X,q,H,U){return Y.duration=K,Y.stagger=Y.stagger||X,Y.onComplete=H,Y.onCompleteParams=U,Y.parent=this,new P9(W,Y,VJ(this,q)),this},Z.staggerFrom=function(W,K,Y,X,q,H,U){return Y.runBackwards=1,n7(Y).immediateRender=e9(Y.immediateRender),this.staggerTo(W,K,Y,X,q,H,U)},Z.staggerFromTo=function(W,K,Y,X,q,H,U,G){return X.startAt=Y,n7(X).immediateRender=e9(X.immediateRender),this.staggerTo(W,K,X,q,H,U,G)},Z.render=function(W,K,Y){var X=this._time,q=this._dirty?this.totalDuration():this._tDur,H=this._dur,U=W<=0?0:E9(W),G=this._zTime<0!==W<0&&(this._initted||!H),F,D,O,E,V,R,N,B,I,L,M,A;if(this!==O9&&U>q&&W>=0&&(U=q),U!==this._tTime||Y||G){if(X!==this._time&&H)U+=this._time-X,W+=this._time-X;if(F=U,I=this._start,B=this._ts,R=!B,G)H||(X=this._zTime),(W||!K)&&(this._zTime=W);if(this._repeat){if(M=this._yoyo,V=H+this._rDelay,this._repeat<-1&&W<0)return this.totalTime(V*100+W,K,Y);if(F=E9(U%V),U===q)E=this._repeat,F=H;else{if(L=E9(U/V),E=~~L,E&&E===L)F=H,E--;F>H&&(F=H)}if(L=V7(this._tTime,V),!X&&this._tTime&&L!==E&&this._tTime-L*V-this._dur<=0&&(L=E),M&&E&1)F=H-F,A=1;if(E!==L&&!this._lock){var _=M&&L&1,z=_===(M&&E&1);if(E<L&&(_=!_),X=_?0:U%H?H:U,this._lock=1,this.render(X||(A?0:E9(E*V)),K,!H)._lock=0,this._tTime=U,!K&&this.parent&&XJ(this,"onRepeat"),this.vars.repeatRefresh&&!A)this.invalidate()._lock=1,L=E;if(X&&X!==this._time||R!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(H=this._dur,q=this._tDur,z)this._lock=2,X=_?H:-0.0001,this.render(X,!0),this.vars.repeatRefresh&&!A&&this.invalidate();if(this._lock=0,!this._ts&&!R)return this}}if(this._hasPause&&!this._forcing&&this._lock<2){if(N=O4(this,E9(X),E9(F)),N)U-=F-(F=N._start)}if(this._tTime=U,this._time=F,this._act=!!B,!this._initted)this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=W,X=0;if(!X&&U&&H&&!K&&!L){if(XJ(this,"onStart"),this._tTime!==U)return this}if(F>=X&&W>=0){D=this._first;while(D){if(O=D._next,(D._act||F>=D._start)&&D._ts&&N!==D){if(D.parent!==this)return this.render(W,K,Y);if(D.render(D._ts>0?(F-D._start)*D._ts:(D._dirty?D.totalDuration():D._tDur)+(F-D._start)*D._ts,K,Y),F!==this._time||!this._ts&&!R){N=0,O&&(U+=this._zTime=-X9);break}}D=O}}else{D=this._last;var k=W<0?W:F;while(D){if(O=D._prev,(D._act||k<=D._end)&&D._ts&&N!==D){if(D.parent!==this)return this.render(W,K,Y);if(D.render(D._ts>0?(k-D._start)*D._ts:(D._dirty?D.totalDuration():D._tDur)+(k-D._start)*D._ts,K,Y||h9&&aQ(D)),F!==this._time||!this._ts&&!R){N=0,O&&(U+=this._zTime=k?-X9:X9);break}}D=O}}if(N&&!K){if(this.pause(),N.render(F>=X?0:-X9)._zTime=F>=X?1:-1,this._ts)return this._start=I,GZ(this),this.render(W,K,Y)}if(this._onUpdate&&!K&&XJ(this,"onUpdate",!0),U===q&&this._tTime>=this.totalDuration()||!U&&X){if(I===this._start||Math.abs(B)!==Math.abs(this._ts)){if(!this._lock){if((W||!H)&&(U===q&&this._ts>0||!U&&this._ts<0)&&K8(this,1),!K&&!(W<0&&!X)&&(U||X||!q))XJ(this,U===q&&W>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(U<q&&this.timeScale()>0)&&this._prom()}}}}return this},Z.add=function(W,K){var Y=this;if(cJ(K)||(K=VJ(this,K,W)),!(W instanceof e7)){if(l9(W))return W.forEach(function(X){return Y.add(X,K)}),this;if(_9(W))return this.addLabel(W,K);if(I9(W))W=P9.delayedCall(0,W);else return this}return this!==W?TJ(this,W,K):this},Z.getChildren=function(W,K,Y,X){if(W===void 0)W=!0;if(K===void 0)K=!0;if(Y===void 0)Y=!0;if(X===void 0)X=-RJ;var q=[],H=this._first;while(H){if(H._start>=X)if(H instanceof P9)K&&q.push(H);else Y&&q.push(H),W&&q.push.apply(q,H.getChildren(!0,K,Y));H=H._next}return q},Z.getById=function(W){var K=this.getChildren(1,1,1),Y=K.length;while(Y--)if(K[Y].vars.id===W)return K[Y]},Z.remove=function(W){if(_9(W))return this.removeLabel(W);if(I9(W))return this.killTweensOf(W);if(W.parent===this&&J$(this,W),W===this._recent)this._recent=this._last;return M8(this)},Z.totalTime=function(W,K){if(!arguments.length)return this._tTime;if(this._forcing=1,!this._dp&&this._ts)this._start=E9(t9.time-(this._ts>0?W/this._ts:(this.totalDuration()-W)/-this._ts));return J.prototype.totalTime.call(this,W,K),this._forcing=0,this},Z.addLabel=function(W,K){return this.labels[W]=VJ(this,K),this},Z.removeLabel=function(W){return delete this.labels[W],this},Z.addPause=function(W,K,Y){var X=P9.delayedCall(0,K||a7,Y);return X.data="isPause",this._hasPause=1,TJ(this,X,VJ(this,W))},Z.removePause=function(W){var K=this._first;W=VJ(this,W);while(K){if(K._start===W&&K.data==="isPause")K8(K);K=K._next}},Z.killTweensOf=function(W,K,Y){var X=this.getTweensOf(W,Y),q=X.length;while(q--)Z8!==X[q]&&X[q].kill(W,K);return this},Z.getTweensOf=function(W,K){var Y=[],X=DJ(W),q=this._first,H=cJ(K),U;while(q){if(q instanceof P9){if(U4(q._targets,X)&&(H?(!Z8||q._initted&&q._ts)&&q.globalTime(0)<=K&&q.globalTime(q.totalDuration())>K:!K||q.isActive()))Y.push(q)}else if((U=q.getTweensOf(X,K)).length)Y.push.apply(Y,U);q=q._next}return Y},Z.tweenTo=function(W,K){K=K||{};var Y=this,X=VJ(Y,W),q=K,H=q.startAt,U=q.onStart,G=q.onStartParams,F=q.immediateRender,D,O=P9.to(Y,$J({ease:K.ease||"none",lazy:!1,immediateRender:!1,time:X,overwrite:"auto",duration:K.duration||Math.abs((X-(H&&"time"in H?H.time:Y._time))/Y.timeScale())||X9,onStart:function(){if(Y.pause(),!D){var V=K.duration||Math.abs((X-(H&&"time"in H?H.time:Y._time))/Y.timeScale());O._dur!==V&&R7(O,V,0,1).render(O._time,!0,!0),D=1}U&&U.apply(O,G||[])}},K));return F?O.render(0):O},Z.tweenFromTo=function(W,K,Y){return this.tweenTo(K,$J({startAt:{time:VJ(this,W)}},Y))},Z.recent=function(){return this._recent},Z.nextLabel=function(W){if(W===void 0)W=this._time;return MW(this,VJ(this,W))},Z.previousLabel=function(W){if(W===void 0)W=this._time;return MW(this,VJ(this,W),1)},Z.currentLabel=function(W){return arguments.length?this.seek(W,!0):this.previousLabel(this._time+X9)},Z.shiftChildren=function(W,K,Y){if(Y===void 0)Y=0;var X=this._first,q=this.labels,H;W=E9(W);while(X){if(X._start>=Y)X._start+=W,X._end+=W;X=X._next}if(K){for(H in q)if(q[H]>=Y)q[H]+=W}return M8(this)},Z.invalidate=function(W){var K=this._first;this._lock=0;while(K)K.invalidate(W),K=K._next;return J.prototype.invalidate.call(this,W)},Z.clear=function(W){if(W===void 0)W=!0;var K=this._first,Y;while(K)Y=K._next,this.remove(K),K=Y;return this._dp&&(this._time=this._tTime=this._pTime=0),W&&(this.labels={}),M8(this)},Z.totalDuration=function(W){var K=0,Y=this,X=Y._last,q=RJ,H,U,G;if(arguments.length)return Y.timeScale((Y._repeat<0?Y.duration():Y.totalDuration())/(Y.reversed()?-W:W));if(Y._dirty){G=Y.parent;while(X){if(H=X._prev,X._dirty&&X.totalDuration(),U=X._start,U>q&&Y._sort&&X._ts&&!Y._lock)Y._lock=1,TJ(Y,X,U-X._delay,1)._lock=0;else q=U;if(U<0&&X._ts){if(K-=U,!G&&!Y._dp||G&&G.smoothChildTiming)Y._start+=E9(U/Y._ts),Y._time-=U,Y._tTime-=U;Y.shiftChildren(-U,!1,-1/0),q=0}X._end>K&&X._ts&&(K=X._end),X=H}R7(Y,Y===O9&&Y._time>K?Y._time:K,1,1),Y._dirty=0}return Y._tDur},$.updateRoot=function(W){if(O9._ts)bW(O9,YZ(W,O9)),jW=t9.frame;if(t9.frame>=BW){BW+=JJ.autoSleep||120;var K=O9._first;if(!K||!K._ts){if(JJ.autoSleep&&t9._listeners.length<2){while(K&&!K._ts)K=K._next;K||t9.sleep()}}}},$}(e7);$J(p9.prototype,{_lock:0,_hasPause:0,_forcing:0});var x4=function($,Z,Q,W,K,Y,X){var q=new i9(this._pt,$,Z,0,1,W5,null,K),H=0,U=0,G,F,D,O,E,V,R,N;if(q.b=Q,q.e=W,Q+="",W+="",R=~W.indexOf("random("))W=E7(W);if(Y)N=[Q,W],Y(N,$,Z),Q=N[0],W=N[1];F=Q.match(AQ)||[];while(G=AQ.exec(W)){if(O=G[0],E=W.substring(H,G.index),D)D=(D+1)%5;else if(E.substr(-5)==="rgba(")D=1;if(O!==F[U++])V=parseFloat(F[U-1])||0,q._pt={_next:q._pt,p:E||U===1?E:",",s:V,c:O.charAt(1)==="="?P8(V,O)-V:parseFloat(O)-V,m:D&&D<4?Math.round:0},H=AQ.lastIndex}if(q.c=H<W.length?W.substring(H,W.length):"",q.fp=X,cQ.test(W)||R)q.e=0;return this._pt=q,q},J5=function($,Z,Q,W,K,Y,X,q,H,U){I9(W)&&(W=W(K||0,$,Y));var G=$[Z],F=Q!=="get"?Q:!I9(G)?G:H?$[Z.indexOf("set")||!I9($["get"+Z.substr(3)])?Z:"get"+Z.substr(3)](H):$[Z](),D=!I9(G)?Q5:H?g4:JK,O;if(_9(W)){if(~W.indexOf("random("))W=E7(W);if(W.charAt(1)==="="){if(O=P8(F,W)+(v9(F)||0),O||O===0)W=O}}if(!U||F!==W||mQ){if(!isNaN(F*W)&&W!=="")return O=new i9(this._pt,$,Z,+F||0,W-(F||0),typeof G==="boolean"?u4:$K,0,D),H&&(O.fp=H),X&&O.modifier(X,this,$),this._pt=O;return!G&&!(Z in $)&&UZ(Z,W),x4.call(this,$,Z,F,W,D,q||JJ.stringFilter,H)}},y4=function($,Z,Q,W,K){if(I9($)&&($=o7($,K,Z,Q,W)),!_J($)||$.style&&$.nodeType||l9($)||SW($))return _9($)?o7($,K,Z,Q,W):$;var Y={},X;for(X in $)Y[X]=o7($[X],K,Z,Q,W);return Y},$5=function($,Z,Q,W,K,Y){var X,q,H,U;if(a9[$]&&(X=new a9[$]).init(K,X.rawVars?Z[$]:y4(Z[$],W,K,Y,Q),Q,W,Y)!==!1){if(Q._pt=q=new i9(Q._pt,K,$,0,1,X.render,X,0,X.priority),Q!==G7){H=Q._ptLookup[Q._targets.indexOf(K)],U=X._props.length;while(U--)H[X._props[U]]=q}}return X},Z8,mQ,Z5=function J($,Z,Q){var W=$.vars,K=W.ease,Y=W.startAt,X=W.immediateRender,q=W.lazy,H=W.onUpdate,U=W.runBackwards,G=W.yoyoEase,F=W.keyframes,D=W.autoRevert,O=$._dur,E=$._startAt,V=$._targets,R=$.parent,N=R&&R.data==="nested"?R.vars.targets:V,B=$._overwrite==="auto"&&!dQ,I=$.timeline,L=W.easeReverse||G,M,A,_,z,k,y,o,t,j,m,d,i,n;if(I&&(!F||!K)&&(K="none"),$._ease=C8(K,i7.ease),$._rEase=L&&(C8(L)||$._ease),$._from=!I&&!!W.runBackwards,$._from)$.ratio=1;if(!I||F&&!W.stagger){if(t=V[0]?W8(V[0]).harness:0,i=t&&W[t.prop],M=XZ(W,sQ),E)E._zTime<0&&E.progress(1),Z<0&&U&&X&&!D?E.render(-1,!0):E.revert(U&&O?$Z:q4),E._lazy=0;if(Y){if(K8($._startAt=P9.set(V,$J({data:"isStart",overwrite:!1,parent:R,immediateRender:!0,lazy:!E&&e9(q),startAt:null,delay:0,onUpdate:H&&function(){return XJ($,"onUpdate")},stagger:0},Y))),$._startAt._dp=0,$._startAt._sat=$,Z<0&&(h9||!X&&!D)&&$._startAt.revert($Z),X){if(O&&Z<=0&&Q<=0){Z&&($._zTime=Z);return}}}else if(U&&O){if(!E){if(Z&&(X=!1),_=$J({overwrite:!1,data:"isFromStart",lazy:X&&!E&&e9(q),immediateRender:X,stagger:0,parent:R},M),i&&(_[t.prop]=i),K8($._startAt=P9.set(V,_)),$._startAt._dp=0,$._startAt._sat=$,Z<0&&(h9?$._startAt.revert($Z):$._startAt.render(-1,!0)),$._zTime=Z,!X)J($._startAt,X9,X9);else if(!Z)return}}$._pt=$._ptCache=0,q=O&&e9(q)||q&&!O;for(A=0;A<V.length;A++){if(k=V[A],o=k._gsap||iQ(V)[A]._gsap,$._ptLookup[A]=m={},xQ[o.id]&&Q8.length&&KZ(),d=N===V?A:N.indexOf(k),t&&(j=new t).init(k,i||M,$,d,N)!==!1)$._pt=z=new i9($._pt,k,j.name,0,1,j.render,j,0,j.priority),j._props.forEach(function(h){m[h]=z}),j.priority&&(y=1);if(!t||i)for(_ in M)if(a9[_]&&(j=$5(_,M,$,d,k,N)))j.priority&&(y=1);else m[_]=z=J5.call($,k,_,"get",M[_],d,N,0,W.stringFilter);if($._op&&$._op[A]&&$.kill(k,$._op[A]),B&&$._pt)Z8=$,O9.killTweensOf(k,m,$.globalTime(Z)),n=!$.parent,Z8=0;$._pt&&q&&(xQ[o.id]=1)}y&&X5($),$._onInit&&$._onInit($)}$._onUpdate=H,$._initted=(!$._op||$._pt)&&!n,F&&Z<=0&&I.render(RJ,!0,!0)},f4=function($,Z,Q,W,K,Y,X,q){var H=($._pt&&$._ptCache||($._ptCache={}))[Z],U,G,F,D;if(!H){H=$._ptCache[Z]=[],F=$._ptLookup,D=$._targets.length;while(D--){if(U=F[D][Z],U&&U.d&&U.d._pt){U=U.d._pt;while(U&&U.p!==Z&&U.fp!==Z)U=U._next}if(!U)return mQ=1,$.vars[Z]="+=0",Z5($,X),mQ=0,q?r7(Z+" not eligible for reset. Try splitting into individual properties"):1;H.push(U)}}D=H.length;while(D--)G=H[D],U=G._pt||G,U.s=(W||W===0)&&!K?W:U.s+(W||0)+Y*U.c,U.c=Q-U.s,G.e&&(G.e=L9(Q)+v9(G.e)),G.b&&(G.b=U.s+v9(G.b))},h4=function($,Z){var Q=$[0]?W8($[0]).harness:0,W=Q&&Q.aliases,K,Y,X,q;if(!W)return Z;K=F7({},Z);for(Y in W)if(Y in K){q=W[Y].split(","),X=q.length;while(X--)K[q[X]]=K[Y]}return K},v4=function($,Z,Q,W){var K=Z.ease||W||"power1.inOut",Y,X;if(l9(Z))X=Q[$]||(Q[$]=[]),Z.forEach(function(q,H){return X.push({t:H/(Z.length-1)*100,v:q,e:K})});else for(Y in Z)X=Q[Y]||(Q[Y]=[]),Y==="ease"||X.push({t:parseFloat($),v:Z[Y],e:K})},o7=function($,Z,Q,W,K){return I9($)?$.call(Z,Q,W,K):_9($)&&~$.indexOf("random(")?E7($):$},tW=oQ+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",eW={};o9(tW+",id,stagger,delay,duration,paused,scrollTrigger",function(J){return eW[J]=1});var P9=function(J){kW($,J);function $(Q,W,K,Y){var X;if(typeof W==="number")K.duration=W,W=K,K=null;X=J.call(this,Y?W:n7(W))||this;var q=X.vars,H=q.duration,U=q.delay,G=q.immediateRender,F=q.stagger,D=q.overwrite,O=q.keyframes,E=q.defaults,V=q.scrollTrigger,R=W.parent||O9,N=(l9(Q)||SW(Q)?cJ(Q[0]):("length"in W))?[Q]:DJ(Q),B,I,L,M,A,_,z,k;if(X._targets=N.length?iQ(N):r7("GSAP target "+Q+" not found. https://gsap.com",!JJ.nullTargetWarn)||[],X._ptLookup=[],X._overwrite=D,O||F||JZ(H)||JZ(U)){W=X.vars;var y=W.easeReverse||W.yoyoEase;if(B=X.timeline=new p9({data:"nested",defaults:E||{},targets:R&&R.data==="nested"?R.vars.targets:N}),B.kill(),B.parent=B._dp=pJ(X),B._start=0,F||JZ(H)||JZ(U)){if(M=N.length,z=F&&dW(F),_J(F)){for(A in F)if(~tW.indexOf(A))k||(k={}),k[A]=F[A]}for(I=0;I<M;I++){if(L=XZ(W,eW),L.stagger=0,y&&(L.easeReverse=y),k&&F7(L,k),_=N[I],L.duration=+o7(H,pJ(X),I,_,N),L.delay=(+o7(U,pJ(X),I,_,N)||0)-X._delay,!F&&M===1&&L.delay)X._delay=U=L.delay,X._start+=U,L.delay=0;B.to(_,L,z?z(I,_,N):0),B._ease=e0.none}B.duration()?H=U=0:X.timeline=0}else if(O){n7($J(B.vars.defaults,{ease:"none"})),B._ease=C8(O.ease||W.ease||"none");var o=0,t,j,m;if(l9(O))O.forEach(function(d){return B.to(N,d,">")}),B.duration();else{L={};for(A in O)A==="ease"||A==="easeEach"||v4(A,O[A],L,O.easeEach);for(A in L){t=L[A].sort(function(d,i){return d.t-i.t}),o=0;for(I=0;I<t.length;I++)j=t[I],m={ease:j.e,duration:(j.t-(I?t[I-1].t:0))/100*H},m[A]=j.v,B.to(N,m,o),o+=m.duration}B.duration()<H&&B.to({},{duration:H-B.duration()})}}H||X.duration(H=B.duration())}else X.timeline=0;if(D===!0&&!dQ)Z8=pJ(X),O9.killTweensOf(N),Z8=0;if(TJ(R,pJ(X),K),W.reversed&&X.reverse(),W.paused&&X.paused(!0),G||!H&&!O&&X._start===E9(R._time)&&e9(G)&&R4(pJ(X))&&R.data!=="nested")X._tTime=-X9,X.render(Math.max(0,-U)||0);return V&&vW(pJ(X),V),X}var Z=$.prototype;return Z.render=function(W,K,Y){var X=this._time,q=this._tDur,H=this._dur,U=W<0,G=W>q-X9&&!U?q:W<X9?0:W,F,D,O,E,V,R,N,B;if(!H)E4(this,W,K,Y);else if(G!==this._tTime||!W||Y||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==U||this._lazy){if(F=G,B=this.timeline,this._repeat){if(E=H+this._rDelay,this._repeat<-1&&U)return this.totalTime(E*100+W,K,Y);if(F=E9(G%E),G===q)O=this._repeat,F=H;else if(V=E9(G/E),O=~~V,O&&O===V)F=H,O--;else if(F>H)F=H;if(R=this._yoyo&&O&1,R)F=H-F;if(V=V7(this._tTime,E),F===X&&!Y&&this._initted&&O===V)return this._tTime=G,this;if(O!==V){if(this.vars.repeatRefresh&&!R&&!this._lock&&F!==E&&this._initted)this._lock=Y=1,this.render(E9(E*O),!0).invalidate()._lock=0}}if(!this._initted){if(gW(this,U?W:F,Y,K,G))return this._tTime=0,this;if(X!==this._time&&!(Y&&this.vars.repeatRefresh&&O!==V))return this;if(H!==this._dur)return this.render(W,K,Y)}if(this._rEase){var I=F<X;if(I!==this._inv){var L=I?X:H-X;if(this._inv=I,this._from)this.ratio=1-this.ratio;this._invRatio=this.ratio,this._invTime=X,this._invRecip=L?(I?-1:1)/L:0,this._invScale=I?-this.ratio:1-this.ratio,this._invEase=I?this._rEase:this._ease}this.ratio=N=this._invRatio+this._invScale*this._invEase((F-this._invTime)*this._invRecip)}else this.ratio=N=this._ease(F/H);if(this._from)this.ratio=N=1-N;if(this._tTime=G,this._time=F,!this._act&&this._ts)this._act=1,this._lazy=0;if(!X&&G&&!K&&!V){if(XJ(this,"onStart"),this._tTime!==G)return this}D=this._pt;while(D)D.r(N,D.d),D=D._next;if(B&&B.render(W<0?W:B._dur*B._ease(F/this._dur),K,Y)||this._startAt&&(this._zTime=W),this._onUpdate&&!K)U&&yQ(this,W,K,Y),XJ(this,"onUpdate");if(this._repeat&&O!==V&&this.vars.onRepeat&&!K&&this.parent&&XJ(this,"onRepeat"),(G===this._tDur||!G)&&this._tTime===G){if(U&&!this._onUpdate&&yQ(this,W,!0,!0),(W||!H)&&(G===this._tDur&&this._ts>0||!G&&this._ts<0)&&K8(this,1),!K&&!(U&&!X)&&(G||X||R))XJ(this,G===q?"onComplete":"onReverseComplete",!0),this._prom&&!(G<q&&this.timeScale()>0)&&this._prom()}}return this},Z.targets=function(){return this._targets},Z.invalidate=function(W){return(!W||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(W),J.prototype.invalidate.call(this,W)},Z.resetTo=function(W,K,Y,X,q){t7||t9.wake(),this._ts||this.play();var H=Math.min(this._dur,(this._dp._time-this._start)*this._ts),U;if(this._initted||Z5(this,H),U=this._ease(H/this._dur),f4(this,W,K,Y,X,U,H,q))return this.resetTo(W,K,Y,X,1);return FZ(this,0),this.parent||fW(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0)},Z.kill=function(W,K){if(K===void 0)K="all";if(!W&&(!K||K==="all"))return this._lazy=this._pt=0,this.parent?l7(this):this.scrollTrigger&&this.scrollTrigger.kill(!!h9),this;if(this.timeline){var Y=this.timeline.totalDuration();return this.timeline.killTweensOf(W,K,Z8&&Z8.vars.overwrite!==!0)._first||l7(this),this.parent&&Y!==this.timeline.totalDuration()&&R7(this,this._dur*this.timeline._tDur/Y,0,1),this}var X=this._targets,q=W?DJ(W):X,H=this._ptLookup,U=this._pt,G,F,D,O,E,V,R;if((!K||K==="all")&&F4(X,q))return K==="all"&&(this._pt=0),l7(this);if(G=this._op=this._op||[],K!=="all"){if(_9(K))E={},o9(K,function(N){return E[N]=1}),K=E;K=h4(X,K)}R=X.length;while(R--)if(~q.indexOf(X[R])){if(F=H[R],K==="all")G[R]=K,O=F,D={};else D=G[R]=G[R]||{},O=K;for(E in O){if(V=F&&F[E],V){if(!("kill"in V.d)||V.d.kill(E)===!0)J$(this,V,"_pt");delete F[E]}if(D!=="all")D[E]=1}}return this._initted&&!this._pt&&U&&l7(this),this},$.to=function(W,K){return new $(W,K,arguments[2])},$.from=function(W,K){return s7(1,arguments)},$.delayedCall=function(W,K,Y,X){return new $(K,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:W,onComplete:K,onReverseComplete:K,onCompleteParams:Y,onReverseCompleteParams:Y,callbackScope:X})},$.fromTo=function(W,K,Y){return s7(2,arguments)},$.set=function(W,K){return K.duration=0,K.repeatDelay||(K.repeat=0),new $(W,K)},$.killTweensOf=function(W,K,Y){return O9.killTweensOf(W,K,Y)},$}(e7);$J(P9.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});o9("staggerTo,staggerFrom,staggerFromTo",function(J){P9[J]=function(){var $=new p9,Z=hQ.call(arguments,0);return Z.splice(J==="staggerFromTo"?5:4,0,0),$[J].apply($,Z)}});var Q5=function($,Z,Q){return $[Z]=Q},JK=function($,Z,Q){return $[Z](Q)},g4=function($,Z,Q,W){return $[Z](W.fp,Q)},m4=function($,Z,Q){return $.setAttribute(Z,Q)},VZ=function($,Z){return I9($[Z])?JK:HZ($[Z])&&$.setAttribute?m4:Q5},$K=function($,Z){return Z.set(Z.t,Z.p,Math.round((Z.s+Z.c*$)*1e6)/1e6,Z)},u4=function($,Z){return Z.set(Z.t,Z.p,!!(Z.s+Z.c*$),Z)},W5=function($,Z){var Q=Z._pt,W="";if(!$&&Z.b)W=Z.b;else if($===1&&Z.e)W=Z.e;else{while(Q)W=Q.p+(Q.m?Q.m(Q.s+Q.c*$):Math.round((Q.s+Q.c*$)*1e4)/1e4)+W,Q=Q._next;W+=Z.c}Z.set(Z.t,Z.p,W,Z)},K5=function($,Z){var Q=Z._pt;while(Q)Q.r($,Q.d),Q=Q._next},d4=function($,Z,Q,W){var K=this._pt,Y;while(K)Y=K._next,K.p===W&&K.modifier($,Z,Q),K=Y},p4=function($){var Z=this._pt,Q,W;while(Z){if(W=Z._next,Z.p===$&&!Z.op||Z.op===$)J$(this,Z,"_pt");else if(!Z.dep)Q=1;Z=W}return!Q},l4=function($,Z,Q,W){W.mSet($,Z,W.m.call(W.tween,Q,W.mt),W)},X5=function($){var Z=$._pt,Q,W,K,Y;while(Z){Q=Z._next,W=K;while(W&&W.pr>Z.pr)W=W._next;if(Z._prev=W?W._prev:Y)Z._prev._next=Z;else K=Z;if(Z._next=W)W._prev=Z;else Y=Z;Z=Q}$._pt=K},i9=function(){function J(Z,Q,W,K,Y,X,q,H,U){if(this.t=Q,this.s=K,this.c=Y,this.p=W,this.r=X||$K,this.d=q||this,this.set=H||Q5,this.pr=U||0,this._next=Z,Z)Z._prev=this}var $=J.prototype;return $.modifier=function(Q,W,K){this.mSet=this.mSet||this.set,this.set=l4,this.m=Q,this.mt=K,this.tween=W},J}();o9(oQ+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(J){return sQ[J]=1});YJ.TweenMax=YJ.TweenLite=P9;YJ.TimelineLite=YJ.TimelineMax=p9;O9=new p9({sortChildren:!1,defaults:i7,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});JJ.stringFilter=tQ;var A8=[],QZ={},c4=[],AW=0,n4=0,TQ=function($){return(QZ[$]||c4).map(function(Z){return Z()})},uQ=function(){var $=Date.now(),Z=[];if($-AW>2)TQ("matchMediaInit"),A8.forEach(function(Q){var{queries:W,conditions:K}=Q,Y,X,q,H;for(X in W)if(Y=wJ.matchMedia(W[X]).matches,Y&&(q=1),Y!==K[X])K[X]=Y,H=1;if(H)Q.revert(),q&&Z.push(Q)}),TQ("matchMediaRevert"),Z.forEach(function(Q){return Q.onMatch(Q,function(W){return Q.add(null,W)})}),AW=$,TQ("matchMedia")},ZK=function(){function J(Z,Q){this.selector=Q&&vQ(Q),this.data=[],this._r=[],this.isReverted=!1,this.id=n4++,Z&&this.add(Z)}var $=J.prototype;return $.add=function(Q,W,K){if(I9(Q))K=W,W=Q,Q=I9;var Y=this,X=function(){var H=F9,U=Y.selector,G;return H&&H!==Y&&H.data.push(Y),K&&(Y.selector=vQ(K)),F9=Y,G=W.apply(Y,arguments),I9(G)&&Y._r.push(G),F9=H,Y.selector=U,Y.isReverted=!1,G};return Y.last=X,Q===I9?X(Y,function(q){return Y.add(null,q)}):Q?Y[Q]=X:X},$.ignore=function(Q){var W=F9;F9=null,Q(this),F9=W},$.getTweens=function(){var Q=[];return this.data.forEach(function(W){return W instanceof J?Q.push.apply(Q,W.getTweens()):W instanceof P9&&!(W.parent&&W.parent.data==="nested")&&Q.push(W)}),Q},$.clear=function(){this._r.length=this.data.length=0},$.kill=function(Q,W){var K=this;if(Q)(function(){var X=K.getTweens(),q=K.data.length,H;while(q--)if(H=K.data[q],H.data==="isFlip")H.revert(),H.getChildren(!0,!0,!1).forEach(function(U){return X.splice(X.indexOf(U),1)});X.map(function(U){return{g:U._dur||U._delay||U._sat&&!U._sat.vars.immediateRender?U.globalTime(0):-1/0,t:U}}).sort(function(U,G){return G.g-U.g||-1/0}).forEach(function(U){return U.t.revert(Q)}),q=K.data.length;while(q--)if(H=K.data[q],H instanceof p9){if(H.data!=="nested")H.scrollTrigger&&H.scrollTrigger.revert(),H.kill()}else!(H instanceof P9)&&H.revert&&H.revert(Q);K._r.forEach(function(U){return U(Q,K)}),K.isReverted=!0})();else this.data.forEach(function(X){return X.kill&&X.kill()});if(this.clear(),W){var Y=A8.length;while(Y--)A8[Y].id===this.id&&A8.splice(Y,1)}},$.revert=function(Q){this.kill(Q||{})},J}(),s4=function(){function J(Z){this.contexts=[],this.scope=Z,F9&&F9.data.push(this)}var $=J.prototype;return $.add=function(Q,W,K){_J(Q)||(Q={matches:Q});var Y=new ZK(0,K||this.scope),X=Y.conditions={},q,H,U;F9&&!Y.selector&&(Y.selector=F9.selector),this.contexts.push(Y),W=Y.add("onMatch",W),Y.queries=Q;for(H in Q)if(H==="all")U=1;else if(q=wJ.matchMedia(Q[H]),q)A8.indexOf(Y)<0&&A8.push(Y),(X[H]=q.matches)&&(U=1),q.addListener?q.addListener(uQ):q.addEventListener("change",uQ);return U&&W(Y,function(G){return Y.add(null,G)}),this},$.revert=function(Q){this.kill(Q||{})},$.kill=function(Q){this.contexts.forEach(function(W){return W.kill(Q,!0)})},J}(),qZ={registerPlugin:function(){for(var $=arguments.length,Z=Array($),Q=0;Q<$;Q++)Z[Q]=arguments[Q];Z.forEach(function(W){return oW(W)})},timeline:function($){return new p9($)},getTweensOf:function($,Z){return O9.getTweensOf($,Z)},getProperty:function($,Z,Q,W){_9($)&&($=DJ($)[0]);var K=W8($||{}).get,Y=Q?yW:xW;return Q==="native"&&(Q=""),!$?$:!Z?function(X,q,H){return Y((a9[X]&&a9[X].get||K)($,X,q,H))}:Y((a9[Z]&&a9[Z].get||K)($,Z,Q,W))},quickSetter:function($,Z,Q){if($=DJ($),$.length>1){var W=$.map(function(U){return c9.quickSetter(U,Z,Q)}),K=W.length;return function(U){var G=K;while(G--)W[G](U)}}$=$[0]||{};var Y=a9[Z],X=W8($),q=X.harness&&(X.harness.aliases||{})[Z]||Z,H=Y?function(U){var G=new Y;G7._pt=0,G.init($,Q?U+Q:U,G7,0,[$]),G.render(1,G),G7._pt&&K5(1,G7)}:X.set($,q);return Y?H:function(U){return H($,q,Q?U+Q:U,X,1)}},quickTo:function($,Z,Q){var W,K=c9.to($,$J((W={},W[Z]="+=0.1",W.paused=!0,W.stagger=0,W),Q||{})),Y=function(q,H,U){return K.resetTo(Z,q,H,U)};return Y.tween=K,Y},isTweening:function($){return O9.getTweensOf($,!0).length>0},defaults:function($){return $&&$.ease&&($.ease=C8($.ease,i7.ease)),zW(i7,$||{})},config:function($){return zW(JJ,$||{})},registerEffect:function($){var{name:Z,effect:Q,plugins:W,defaults:K,extendTimeline:Y}=$;if((W||"").split(",").forEach(function(X){return X&&!a9[X]&&!YJ[X]&&r7(Z+" effect requires "+X+" plugin.")}),kQ[Z]=function(X,q,H){return Q(DJ(X),$J(q||{},K),H)},Y)p9.prototype[Z]=function(X,q,H){return this.add(kQ[Z](X,_J(q)?q:(H=q)&&{},this),H)}},registerEase:function($,Z){e0[$]=C8(Z)},parseEase:function($,Z){return arguments.length?C8($,Z):e0},getById:function($){return O9.getById($)},exportRoot:function($,Z){if($===void 0)$={};var Q=new p9($),W,K;Q.smoothChildTiming=e9($.smoothChildTiming),O9.remove(Q),Q._dp=0,Q._time=Q._tTime=O9._time,W=O9._first;while(W){if(K=W._next,Z||!(!W._dur&&W instanceof P9&&W.vars.onComplete===W._targets[0]))TJ(Q,W,W._start-W._delay);W=K}return TJ(O9,Q,0),Q},context:function($,Z){return $?new ZK($,Z):F9},matchMedia:function($){return new s4($)},matchMediaRefresh:function(){return A8.forEach(function($){var Z=$.conditions,Q,W;for(W in Z)if(Z[W])Z[W]=!1,Q=1;Q&&$.revert()})||uQ()},addEventListener:function($,Z){var Q=QZ[$]||(QZ[$]=[]);~Q.indexOf(Z)||Q.push(Z)},removeEventListener:function($,Z){var Q=QZ[$],W=Q&&Q.indexOf(Z);W>=0&&Q.splice(W,1)},utils:{wrap:C4,wrapYoyo:A4,distribute:dW,random:lW,snap:pW,normalize:M4,getUnit:v9,clamp:B4,splitColor:iW,toArray:DJ,selector:vQ,mapRange:nW,pipe:I4,unitize:L4,interpolate:k4,shuffle:uW},install:TW,effects:kQ,ticker:t9,updateRoot:p9.updateRoot,plugins:a9,globalTimeline:O9,core:{PropTween:i9,globals:_W,Tween:P9,Timeline:p9,Animation:e7,getCache:W8,_removeLinkedListItem:J$,reverting:function(){return h9},context:function($){if($&&F9)F9.data.push($),$._ctx=F9;return F9},suppressOverwrites:function($){return dQ=$}}};o9("to,from,fromTo,delayedCall,set,killTweensOf",function(J){return qZ[J]=P9[J]});t9.add(p9.updateRoot);G7=qZ.to({},{duration:0});var o4=function($,Z){var Q=$._pt;while(Q&&Q.p!==Z&&Q.op!==Z&&Q.fp!==Z)Q=Q._next;return Q},i4=function($,Z){var Q=$._targets,W,K,Y;for(W in Z){K=Q.length;while(K--)if(Y=$._ptLookup[K][W],Y&&(Y=Y.d)){if(Y._pt)Y=o4(Y,W);Y&&Y.modifier&&Y.modifier(Z[W],$,Q[K],W)}}},_Q=function($,Z){return{name:$,headless:1,rawVars:1,init:function(W,K,Y){Y._onInit=function(X){var q,H;if(_9(K))q={},o9(K,function(U){return q[U]=1}),K=q;if(Z){q={};for(H in K)q[H]=Z(K[H]);K=q}i4(X,K)}}}},c9=qZ.registerPlugin({name:"attr",init:function($,Z,Q,W,K){var Y,X,q;this.tween=Q;for(Y in Z)q=$.getAttribute(Y)||"",X=this.add($,"setAttribute",(q||0)+"",Z[Y],W,K,0,0,Y),X.op=Y,X.b=q,this._props.push(Y)},render:function($,Z){var Q=Z._pt;while(Q)h9?Q.set(Q.t,Q.p,Q.b,Q):Q.r($,Q.d),Q=Q._next}},{name:"endArray",headless:1,init:function($,Z){var Q=Z.length;while(Q--)this.add($,Q,$[Q]||0,Z[Q],0,0,0,0,0,1)}},_Q("roundProps",gQ),_Q("modifiers"),_Q("snap",pW))||qZ;P9.version=p9.version=c9.version="3.15.0";wW=1;pQ()&&D7();var{Power0:r4,Power1:a4,Power2:t4,Power3:e4,Power4:JU,Linear:$U,Quad:ZU,Cubic:QU,Quart:WU,Quint:KU,Strong:XU,Elastic:YU,Back:qU,SteppedEase:HU,Bounce:UU,Sine:GU,Expo:FU,Circ:VU}=e0;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var QK,Y8,N7,F5,j8,RU,WK,V5,DU=function(){return typeof window<"u"},sJ={},_8=180/Math.PI,B7=Math.PI/180,O7=Math.atan2,KK=1e8,R5=/([A-Z])/g,EU=/(left|right|width|margin|padding|x)/i,OU=/[\s,\(]\S/,jJ={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},q5=function($,Z){return Z.set(Z.t,Z.p,Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u,Z)},NU=function($,Z){return Z.set(Z.t,Z.p,$===1?Z.e:Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u,Z)},BU=function($,Z){return Z.set(Z.t,Z.p,$?Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u:Z.b,Z)},zU=function($,Z){return Z.set(Z.t,Z.p,$===1?Z.e:$?Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u:Z.b,Z)},IU=function($,Z){var Q=Z.s+Z.c*$;Z.set(Z.t,Z.p,~~(Q+(Q<0?-0.5:0.5))+Z.u,Z)},VK=function($,Z){return Z.set(Z.t,Z.p,$?Z.e:Z.b,Z)},RK=function($,Z){return Z.set(Z.t,Z.p,$!==1?Z.b:Z.e,Z)},LU=function($,Z,Q){return $.style[Z]=Q},MU=function($,Z,Q){return $.style.setProperty(Z,Q)},CU=function($,Z,Q){return $._gsap[Z]=Q},AU=function($,Z,Q){return $._gsap.scaleX=$._gsap.scaleY=Q},kU=function($,Z,Q,W,K){var Y=$._gsap;Y.scaleX=Y.scaleY=Q,Y.renderTransform(K,Y)},PU=function($,Z,Q,W,K){var Y=$._gsap;Y[Z]=Q,Y.renderTransform(K,Y)},N9="transform",ZJ=N9+"Origin",SU=function J($,Z){var Q=this,W=this.target,K=W.style,Y=W._gsap;if($ in sJ&&K){if(this.tfm=this.tfm||{},$!=="transform")$=jJ[$]||$,~$.indexOf(",")?$.split(",").forEach(function(X){return Q.tfm[X]=nJ(W,X)}):this.tfm[$]=Y.x?Y[$]:nJ(W,$),$===ZJ&&(this.tfm.zOrigin=Y.zOrigin);else return jJ.transform.split(",").forEach(function(X){return J.call(Q,X,Z)});if(this.props.indexOf(N9)>=0)return;if(Y.svg)this.svgo=W.getAttribute("data-svg-origin"),this.props.push(ZJ,Z,"");$=N9}(K||Z)&&this.props.push($,Z,K[$])},DK=function($){if($.translate)$.removeProperty("translate"),$.removeProperty("scale"),$.removeProperty("rotate")},wU=function(){var $=this.props,Z=this.target,Q=Z.style,W=Z._gsap,K,Y;for(K=0;K<$.length;K+=3)if(!$[K+1])$[K+2]?Q[$[K]]=$[K+2]:Q.removeProperty($[K].substr(0,2)==="--"?$[K]:$[K].replace(R5,"-$1").toLowerCase());else if($[K+1]===2)Z[$[K]]($[K+2]);else Z[$[K]]=$[K+2];if(this.tfm){for(Y in this.tfm)W[Y]=this.tfm[Y];if(W.svg)W.renderTransform(),Z.setAttribute("data-svg-origin",this.svgo||"");if(K=V5(),(!K||!K.isStart)&&!Q[N9]){if(DK(Q),W.zOrigin&&Q[ZJ])Q[ZJ]+=" "+W.zOrigin+"px",W.zOrigin=0,W.renderTransform();W.uncache=1}}},EK=function($,Z){var Q={target:$,props:[],revert:wU,save:SU};return $._gsap||c9.core.getCache($),Z&&$.style&&$.nodeType&&Z.split(",").forEach(function(W){return Q.save(W)}),Q},OK,H5=function($,Z){var Q=Y8.createElementNS?Y8.createElementNS((Z||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),$):Y8.createElement($);return Q&&Q.style?Q:Y8.createElement($)},qJ=function J($,Z,Q){var W=getComputedStyle($);return W[Z]||W.getPropertyValue(Z.replace(R5,"-$1").toLowerCase())||W.getPropertyValue(Z)||!Q&&J($,z7(Z)||Z,1)||""},XK="O,Moz,ms,Ms,Webkit".split(","),z7=function($,Z,Q){var W=Z||j8,K=W.style,Y=5;if($ in K&&!Q)return $;$=$.charAt(0).toUpperCase()+$.substr(1);while(Y--&&!(XK[Y]+$ in K));return Y<0?null:(Y===3?"ms":Y>=0?XK[Y]:"")+$},U5=function(){if(DU()&&window.document)QK=window,Y8=QK.document,N7=Y8.documentElement,j8=H5("div")||{style:{}},RU=H5("div"),N9=z7(N9),ZJ=N9+"Origin",j8.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",OK=!!z7("perspective"),V5=c9.core.reverting,F5=1},YK=function($){var Z=$.ownerSVGElement,Q=H5("svg",Z&&Z.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),W=$.cloneNode(!0),K;W.style.display="block",Q.appendChild(W),N7.appendChild(Q);try{K=W.getBBox()}catch(Y){}return Q.removeChild(W),N7.removeChild(Q),K},qK=function($,Z){var Q=Z.length;while(Q--)if($.hasAttribute(Z[Q]))return $.getAttribute(Z[Q])},NK=function($){var Z,Q;try{Z=$.getBBox()}catch(W){Z=YK($),Q=1}return Z&&(Z.width||Z.height)||Q||(Z=YK($)),Z&&!Z.width&&!Z.x&&!Z.y?{x:+qK($,["x","cx","x1"])||0,y:+qK($,["y","cy","y1"])||0,width:0,height:0}:Z},BK=function($){return!!($.getCTM&&(!$.parentNode||$.ownerSVGElement)&&NK($))},H8=function($,Z){if(Z){var Q=$.style,W;if(Z in sJ&&Z!==ZJ)Z=N9;if(Q.removeProperty){if(W=Z.substr(0,2),W==="ms"||Z.substr(0,6)==="webkit")Z="-"+Z;Q.removeProperty(W==="--"?Z:Z.replace(R5,"-$1").toLowerCase())}else Q.removeAttribute(Z)}},q8=function($,Z,Q,W,K,Y){var X=new i9($._pt,Z,Q,0,1,Y?RK:VK);return $._pt=X,X.b=W,X.e=K,$._props.push(Q),X},HK={deg:1,rad:1,turn:1},TU={grid:1,flex:1},U8=function J($,Z,Q,W){var K=parseFloat(Q)||0,Y=(Q+"").trim().substr((K+"").length)||"px",X=j8.style,q=EU.test(Z),H=$.tagName.toLowerCase()==="svg",U=(H?"client":"offset")+(q?"Width":"Height"),G=100,F=W==="px",D=W==="%",O,E,V,R;if(W===Y||!K||HK[W]||HK[Y])return K;if(Y!=="px"&&!F&&(K=J($,Z,Q,"px")),R=$.getCTM&&BK($),(D||Y==="%")&&(sJ[Z]||~Z.indexOf("adius")))return O=R?$.getBBox()[q?"width":"height"]:$[U],L9(D?K/O*G:K/100*O);if(X[q?"width":"height"]=G+(F?Y:W),E=W!=="rem"&&~Z.indexOf("adius")||W==="em"&&$.appendChild&&!H?$:$.parentNode,R)E=($.ownerSVGElement||{}).parentNode;if(!E||E===Y8||!E.appendChild)E=Y8.body;if(V=E._gsap,V&&D&&V.width&&q&&V.time===t9.time&&!V.uncache)return L9(K/V.width*G);else{if(D&&(Z==="height"||Z==="width")){var N=$.style[Z];$.style[Z]=G+W,O=$[U],N?$.style[Z]=N:H8($,Z)}else(D||Y==="%")&&!TU[qJ(E,"display")]&&(X.position=qJ($,"position")),E===$&&(X.position="static"),E.appendChild(j8),O=j8[U],E.removeChild(j8),X.position="absolute";if(q&&D)V=W8(E),V.time=t9.time,V.width=E[U]}return L9(F?O*K/G:O&&K?G/O*K:0)},nJ=function($,Z,Q,W){var K;if(F5||U5(),Z in jJ&&Z!=="transform"){if(Z=jJ[Z],~Z.indexOf(","))Z=Z.split(",")[0]}if(sJ[Z]&&Z!=="transform")K=W$($,W),K=Z!=="transformOrigin"?K[Z]:K.svg?K.origin:DZ(qJ($,ZJ))+" "+K.zOrigin+"px";else if(K=$.style[Z],!K||K==="auto"||W||~(K+"").indexOf("calc("))K=RZ[Z]&&RZ[Z]($,Z,Q)||qJ($,Z)||rQ($,Z)||(Z==="opacity"?1:0);return Q&&!~(K+"").trim().indexOf(" ")?U8($,Z,K,Q)+Q:K},_U=function($,Z,Q,W){if(!Q||Q==="none"){var K=z7(Z,$,1),Y=K&&qJ($,K,1);if(Y&&Y!==Q)Z=K,Q=Y;else if(Z==="borderColor")Q=qJ($,"borderTopColor")}var X=new i9(this._pt,$.style,Z,0,1,W5),q=0,H=0,U,G,F,D,O,E,V,R,N,B,I,L;if(X.b=Q,X.e=W,Q+="",W+="",W.substring(0,6)==="var(--")W=qJ($,W.substring(4,W.indexOf(")")));if(W==="auto")E=$.style[Z],$.style[Z]=W,W=qJ($,Z)||W,E?$.style[Z]=E:H8($,Z);if(U=[Q,W],tQ(U),Q=U[0],W=U[1],F=Q.match(k8)||[],L=W.match(k8)||[],L.length){while(G=k8.exec(W)){if(V=G[0],N=W.substring(q,G.index),O)O=(O+1)%5;else if(N.substr(-5)==="rgba("||N.substr(-5)==="hsla(")O=1;if(V!==(E=F[H++]||"")){if(D=parseFloat(E)||0,I=E.substr((D+"").length),V.charAt(1)==="="&&(V=P8(D,V)+I),R=parseFloat(V),B=V.substr((R+"").length),q=k8.lastIndex-B.length,!B){if(B=B||JJ.units[Z]||I,q===W.length)W+=B,X.e+=B}if(I!==B)D=U8($,Z,E,B)||0;X._pt={_next:X._pt,p:N||H===1?N:",",s:D,c:R-D,m:O&&O<4||Z==="zIndex"?Math.round:0}}}X.c=q<W.length?W.substring(q,W.length):""}else X.r=Z==="display"&&W==="none"?RK:VK;return cQ.test(W)&&(X.e=0),this._pt=X,X},UK={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},jU=function($){var Z=$.split(" "),Q=Z[0],W=Z[1]||"50%";if(Q==="top"||Q==="bottom"||W==="left"||W==="right")$=Q,Q=W,W=$;return Z[0]=UK[Q]||Q,Z[1]=UK[W]||W,Z.join(" ")},bU=function($,Z){if(Z.tween&&Z.tween._time===Z.tween._dur){var Q=Z.t,W=Q.style,K=Z.u,Y=Q._gsap,X,q,H;if(K==="all"||K===!0)W.cssText="",q=1;else{K=K.split(","),H=K.length;while(--H>-1){if(X=K[H],sJ[X])q=1,X=X==="transformOrigin"?ZJ:N9;H8(Q,X)}}if(q){if(H8(Q,N9),Y)Y.svg&&Q.removeAttribute("transform"),W.scale=W.rotate=W.translate="none",W$(Q,1),Y.uncache=1,DK(W)}}},RZ={clearProps:function($,Z,Q,W,K){if(K.data!=="isFromStart"){var Y=$._pt=new i9($._pt,Z,Q,0,0,bU);return Y.u=W,Y.pr=-10,Y.tween=K,$._props.push(Q),1}}},Q$=[1,0,0,1,0,0],zK={},IK=function($){return $==="matrix(1, 0, 0, 1, 0, 0)"||$==="none"||!$},GK=function($){var Z=qJ($,N9);return IK(Z)?Q$:Z.substr(7).match(lQ).map(L9)},D5=function($,Z){var Q=$._gsap||W8($),W=$.style,K=GK($),Y,X,q,H;if(Q.svg&&$.getAttribute("transform"))return q=$.transform.baseVal.consolidate().matrix,K=[q.a,q.b,q.c,q.d,q.e,q.f],K.join(",")==="1,0,0,1,0,0"?Q$:K;else if(K===Q$&&!$.offsetParent&&$!==N7&&!Q.svg){if(q=W.display,W.display="block",Y=$.parentNode,!Y||!$.offsetParent&&!$.getBoundingClientRect().width)H=1,X=$.nextElementSibling,N7.appendChild($);if(K=GK($),q?W.display=q:H8($,"display"),H)X?Y.insertBefore($,X):Y?Y.appendChild($):N7.removeChild($)}return Z&&K.length>6?[K[0],K[1],K[4],K[5],K[12],K[13]]:K},G5=function($,Z,Q,W,K,Y){var X=$._gsap,q=K||D5($,!0),H=X.xOrigin||0,U=X.yOrigin||0,G=X.xOffset||0,F=X.yOffset||0,D=q[0],O=q[1],E=q[2],V=q[3],R=q[4],N=q[5],B=Z.split(" "),I=parseFloat(B[0])||0,L=parseFloat(B[1])||0,M,A,_,z;if(!Q)M=NK($),I=M.x+(~B[0].indexOf("%")?I/100*M.width:I),L=M.y+(~(B[1]||B[0]).indexOf("%")?L/100*M.height:L);else if(q!==Q$&&(A=D*V-O*E))_=I*(V/A)+L*(-E/A)+(E*N-V*R)/A,z=I*(-O/A)+L*(D/A)-(D*N-O*R)/A,I=_,L=z;if(W||W!==!1&&X.smooth)R=I-H,N=L-U,X.xOffset=G+(R*D+N*E)-R,X.yOffset=F+(R*O+N*V)-N;else X.xOffset=X.yOffset=0;if(X.xOrigin=I,X.yOrigin=L,X.smooth=!!W,X.origin=Z,X.originIsAbsolute=!!Q,$.style[ZJ]="0px 0px",Y)q8(Y,X,"xOrigin",H,I),q8(Y,X,"yOrigin",U,L),q8(Y,X,"xOffset",G,X.xOffset),q8(Y,X,"yOffset",F,X.yOffset);$.setAttribute("data-svg-origin",I+" "+L)},W$=function($,Z){var Q=$._gsap||new eQ($);if("x"in Q&&!Z&&!Q.uncache)return Q;var W=$.style,K=Q.scaleX<0,Y="px",X="deg",q=getComputedStyle($),H=qJ($,ZJ)||"0",U,G,F,D,O,E,V,R,N,B,I,L,M,A,_,z,k,y,o,t,j,m,d,i,n,h,l,r,f,a,Z0,Y0;if(U=G=F=E=V=R=N=B=I=0,D=O=1,Q.svg=!!($.getCTM&&BK($)),q.translate){if(q.translate!=="none"||q.scale!=="none"||q.rotate!=="none")W[N9]=(q.translate!=="none"?"translate3d("+(q.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(q.rotate!=="none"?"rotate("+q.rotate+") ":"")+(q.scale!=="none"?"scale("+q.scale.split(" ").join(",")+") ":"")+(q[N9]!=="none"?q[N9]:"");W.scale=W.rotate=W.translate="none"}if(A=D5($,Q.svg),Q.svg){if(Q.uncache)n=$.getBBox(),H=Q.xOrigin-n.x+"px "+(Q.yOrigin-n.y)+"px",i="";else i=!Z&&$.getAttribute("data-svg-origin");G5($,i||H,!!i||Q.originIsAbsolute,Q.smooth!==!1,A)}if(L=Q.xOrigin||0,M=Q.yOrigin||0,A!==Q$){if(y=A[0],o=A[1],t=A[2],j=A[3],U=m=A[4],G=d=A[5],A.length===6){if(D=Math.sqrt(y*y+o*o),O=Math.sqrt(j*j+t*t),E=y||o?O7(o,y)*_8:0,N=t||j?O7(t,j)*_8+E:0,N&&(O*=Math.abs(Math.cos(N*B7))),Q.svg)U-=L-(L*y+M*t),G-=M-(L*o+M*j)}else{if(Y0=A[6],a=A[7],l=A[8],r=A[9],f=A[10],Z0=A[11],U=A[12],G=A[13],F=A[14],_=O7(Y0,f),V=_*_8,_)z=Math.cos(-_),k=Math.sin(-_),i=m*z+l*k,n=d*z+r*k,h=Y0*z+f*k,l=m*-k+l*z,r=d*-k+r*z,f=Y0*-k+f*z,Z0=a*-k+Z0*z,m=i,d=n,Y0=h;if(_=O7(-t,f),R=_*_8,_)z=Math.cos(-_),k=Math.sin(-_),i=y*z-l*k,n=o*z-r*k,h=t*z-f*k,Z0=j*k+Z0*z,y=i,o=n,t=h;if(_=O7(o,y),E=_*_8,_)z=Math.cos(_),k=Math.sin(_),i=y*z+o*k,n=m*z+d*k,o=o*z-y*k,d=d*z-m*k,y=i,m=n;if(V&&Math.abs(V)+Math.abs(E)>359.9)V=E=0,R=180-R;D=L9(Math.sqrt(y*y+o*o+t*t)),O=L9(Math.sqrt(d*d+Y0*Y0)),_=O7(m,d),N=Math.abs(_)>0.0002?_*_8:0,I=Z0?1/(Z0<0?-Z0:Z0):0}if(Q.svg)i=$.getAttribute("transform"),Q.forceCSS=$.setAttribute("transform","")||!IK(qJ($,N9)),i&&$.setAttribute("transform",i)}if(Math.abs(N)>90&&Math.abs(N)<270)if(K)D*=-1,N+=E<=0?180:-180,E+=E<=0?180:-180;else O*=-1,N+=N<=0?180:-180;if(Z=Z||Q.uncache,Q.x=U-((Q.xPercent=U&&(!Z&&Q.xPercent||(Math.round($.offsetWidth/2)===Math.round(-U)?-50:0)))?$.offsetWidth*Q.xPercent/100:0)+Y,Q.y=G-((Q.yPercent=G&&(!Z&&Q.yPercent||(Math.round($.offsetHeight/2)===Math.round(-G)?-50:0)))?$.offsetHeight*Q.yPercent/100:0)+Y,Q.z=F+Y,Q.scaleX=L9(D),Q.scaleY=L9(O),Q.rotation=L9(E)+X,Q.rotationX=L9(V)+X,Q.rotationY=L9(R)+X,Q.skewX=N+X,Q.skewY=B+X,Q.transformPerspective=I+Y,Q.zOrigin=parseFloat(H.split(" ")[2])||!Z&&Q.zOrigin||0)W[ZJ]=DZ(H);return Q.xOffset=Q.yOffset=0,Q.force3D=JJ.force3D,Q.renderTransform=Q.svg?yU:OK?LK:xU,Q.uncache=0,Q},DZ=function($){return($=$.split(" "))[0]+" "+$[1]},Y5=function($,Z,Q){var W=v9(Z);return L9(parseFloat(Z)+parseFloat(U8($,"x",Q+"px",W)))+W},xU=function($,Z){Z.z="0px",Z.rotationY=Z.rotationX="0deg",Z.force3D=0,LK($,Z)},w8="0deg",Z$="0px",T8=") ",LK=function($,Z){var Q=Z||this,W=Q.xPercent,K=Q.yPercent,Y=Q.x,X=Q.y,q=Q.z,H=Q.rotation,U=Q.rotationY,G=Q.rotationX,F=Q.skewX,D=Q.skewY,O=Q.scaleX,E=Q.scaleY,V=Q.transformPerspective,R=Q.force3D,N=Q.target,B=Q.zOrigin,I="",L=R==="auto"&&$&&$!==1||R===!0;if(B&&(G!==w8||U!==w8)){var M=parseFloat(U)*B7,A=Math.sin(M),_=Math.cos(M),z;M=parseFloat(G)*B7,z=Math.cos(M),Y=Y5(N,Y,A*z*-B),X=Y5(N,X,-Math.sin(M)*-B),q=Y5(N,q,_*z*-B+B)}if(V!==Z$)I+="perspective("+V+T8;if(W||K)I+="translate("+W+"%, "+K+"%) ";if(L||Y!==Z$||X!==Z$||q!==Z$)I+=q!==Z$||L?"translate3d("+Y+", "+X+", "+q+") ":"translate("+Y+", "+X+T8;if(H!==w8)I+="rotate("+H+T8;if(U!==w8)I+="rotateY("+U+T8;if(G!==w8)I+="rotateX("+G+T8;if(F!==w8||D!==w8)I+="skew("+F+", "+D+T8;if(O!==1||E!==1)I+="scale("+O+", "+E+T8;N.style[N9]=I||"translate(0, 0)"},yU=function($,Z){var Q=Z||this,W=Q.xPercent,K=Q.yPercent,Y=Q.x,X=Q.y,q=Q.rotation,H=Q.skewX,U=Q.skewY,G=Q.scaleX,F=Q.scaleY,D=Q.target,O=Q.xOrigin,E=Q.yOrigin,V=Q.xOffset,R=Q.yOffset,N=Q.forceCSS,B=parseFloat(Y),I=parseFloat(X),L,M,A,_,z;if(q=parseFloat(q),H=parseFloat(H),U=parseFloat(U),U)U=parseFloat(U),H+=U,q+=U;if(q||H){if(q*=B7,H*=B7,L=Math.cos(q)*G,M=Math.sin(q)*G,A=Math.sin(q-H)*-F,_=Math.cos(q-H)*F,H){if(U*=B7,z=Math.tan(H-U),z=Math.sqrt(1+z*z),A*=z,_*=z,U)z=Math.tan(U),z=Math.sqrt(1+z*z),L*=z,M*=z}L=L9(L),M=L9(M),A=L9(A),_=L9(_)}else L=G,_=F,M=A=0;if(B&&!~(Y+"").indexOf("px")||I&&!~(X+"").indexOf("px"))B=U8(D,"x",Y,"px"),I=U8(D,"y",X,"px");if(O||E||V||R)B=L9(B+O-(O*L+E*A)+V),I=L9(I+E-(O*M+E*_)+R);if(W||K)z=D.getBBox(),B=L9(B+W/100*z.width),I=L9(I+K/100*z.height);z="matrix("+L+","+M+","+A+","+_+","+B+","+I+")",D.setAttribute("transform",z),N&&(D.style[N9]=z)},fU=function($,Z,Q,W,K){var Y=360,X=_9(K),q=parseFloat(K)*(X&&~K.indexOf("rad")?_8:1),H=q-W,U=W+H+"deg",G,F;if(X){if(G=K.split("_")[1],G==="short"){if(H%=Y,H!==H%(Y/2))H+=H<0?Y:-Y}if(G==="cw"&&H<0)H=(H+Y*KK)%Y-~~(H/Y)*Y;else if(G==="ccw"&&H>0)H=(H-Y*KK)%Y-~~(H/Y)*Y}return $._pt=F=new i9($._pt,Z,Q,W,H,NU),F.e=U,F.u="deg",$._props.push(Q),F},FK=function($,Z){for(var Q in Z)$[Q]=Z[Q];return $},hU=function($,Z,Q){var W=FK({},Q._gsap),K="perspective,force3D,transformOrigin,svgOrigin",Y=Q.style,X,q,H,U,G,F,D,O;if(W.svg)H=Q.getAttribute("transform"),Q.setAttribute("transform",""),Y[N9]=Z,X=W$(Q,1),H8(Q,N9),Q.setAttribute("transform",H);else H=getComputedStyle(Q)[N9],Y[N9]=Z,X=W$(Q,1),Y[N9]=H;for(q in sJ)if(H=W[q],U=X[q],H!==U&&K.indexOf(q)<0)D=v9(H),O=v9(U),G=D!==O?U8(Q,q,H,O):parseFloat(H),F=parseFloat(U),$._pt=new i9($._pt,X,q,G,F-G,q5),$._pt.u=O||0,$._props.push(q);FK(X,W)};o9("padding,margin,Width,Radius",function(J,$){var Z="Top",Q="Right",W="Bottom",K="Left",Y=($<3?[Z,Q,W,K]:[Z+K,Z+Q,W+Q,W+K]).map(function(X){return $<2?J+X:"border"+X+J});RZ[$>1?"border"+J:J]=function(X,q,H,U,G){var F,D;if(arguments.length<4)return F=Y.map(function(O){return nJ(X,O,H)}),D=F.join(" "),D.split(F[0]).length===5?F[0]:D;F=(U+"").split(" "),D={},Y.forEach(function(O,E){return D[O]=F[E]=F[E]||F[(E-1)/2|0]}),X.init(q,D,G)}});var E5={name:"css",register:U5,targetTest:function($){return $.style&&$.nodeType},init:function($,Z,Q,W,K){var Y=this._props,X=$.style,q=Q.vars.startAt,H,U,G,F,D,O,E,V,R,N,B,I,L,M,A,_,z;F5||U5(),this.styles=this.styles||EK($),_=this.styles.props,this.tween=Q;for(E in Z){if(E==="autoRound")continue;if(U=Z[E],a9[E]&&$5(E,Z,Q,W,$,K))continue;if(D=typeof U,O=RZ[E],D==="function")U=U.call(Q,W,$,K),D=typeof U;if(D==="string"&&~U.indexOf("random("))U=E7(U);if(O)O(this,$,E,U,Q)&&(A=1);else if(E.substr(0,2)==="--"){if(H=(getComputedStyle($).getPropertyValue(E)+"").trim(),U+="",lJ.lastIndex=0,!lJ.test(H))V=v9(H),R=v9(U),R?V!==R&&(H=U8($,E,H,R)+R):V&&(U+=V);this.add(X,"setProperty",H,U,W,K,0,0,E),Y.push(E),_.push(E,0,X[E])}else if(D!=="undefined"){if(q&&E in q)H=typeof q[E]==="function"?q[E].call(Q,W,$,K):q[E],_9(H)&&~H.indexOf("random(")&&(H=E7(H)),v9(H+"")||H==="auto"||(H+=JJ.units[E]||v9(nJ($,E))||""),(H+"").charAt(1)==="="&&(H=nJ($,E));else H=nJ($,E);if(F=parseFloat(H),N=D==="string"&&U.charAt(1)==="="&&U.substr(0,2),N&&(U=U.substr(2)),G=parseFloat(U),E in jJ){if(E==="autoAlpha"){if(F===1&&nJ($,"visibility")==="hidden"&&G)F=0;_.push("visibility",0,X.visibility),q8(this,X,"visibility",F?"inherit":"hidden",G?"inherit":"hidden",!G)}if(E!=="scale"&&E!=="transform")E=jJ[E],~E.indexOf(",")&&(E=E.split(",")[0])}if(B=E in sJ,B){if(this.styles.save(E),z=U,D==="string"&&U.substring(0,6)==="var(--"){if(U=qJ($,U.substring(4,U.indexOf(")"))),U.substring(0,5)==="calc("){var k=$.style.perspective;$.style.perspective=U,U=qJ($,"perspective"),k?$.style.perspective=k:H8($,"perspective")}G=parseFloat(U)}if(!I)L=$._gsap,L.renderTransform&&!Z.parseTransform||W$($,Z.parseTransform),M=Z.smoothOrigin!==!1&&L.smooth,I=this._pt=new i9(this._pt,X,N9,0,1,L.renderTransform,L,0,-1),I.dep=1;if(E==="scale")this._pt=new i9(this._pt,L,"scaleY",L.scaleY,(N?P8(L.scaleY,N+G):G)-L.scaleY||0,q5),this._pt.u=0,Y.push("scaleY",E),E+="X";else if(E==="transformOrigin"){if(_.push(ZJ,0,X[ZJ]),U=jU(U),L.svg)G5($,U,0,M,0,this);else R=parseFloat(U.split(" ")[2])||0,R!==L.zOrigin&&q8(this,L,"zOrigin",L.zOrigin,R),q8(this,X,E,DZ(H),DZ(U));continue}else if(E==="svgOrigin"){G5($,U,1,M,0,this);continue}else if(E in zK){fU(this,L,E,F,N?P8(F,N+U):U);continue}else if(E==="smoothOrigin"){q8(this,L,"smooth",L.smooth,U);continue}else if(E==="force3D"){L[E]=U;continue}else if(E==="transform"){hU(this,U,$);continue}}else if(!(E in X))E=z7(E)||E;if(B||(G||G===0)&&(F||F===0)&&!OU.test(U)&&E in X){if(V=(H+"").substr((F+"").length),G||(G=0),R=v9(U)||(E in JJ.units?JJ.units[E]:V),V!==R&&(F=U8($,E,H,R)),this._pt=new i9(this._pt,B?L:X,E,F,(N?P8(F,N+G):G)-F,!B&&(R==="px"||E==="zIndex")&&Z.autoRound!==!1?IU:q5),this._pt.u=R||0,B&&z!==U)this._pt.b=H,this._pt.e=z,this._pt.r=zU;else if(V!==R&&R!=="%")this._pt.b=H,this._pt.r=BU}else if(!(E in X)){if(E in $)this.add($,E,H||$[E],N?N+U:U,W,K);else if(E!=="parseTransform"){UZ(E,U);continue}}else _U.call(this,$,E,H,N?N+U:U);B||(E in X?_.push(E,0,X[E]):typeof $[E]==="function"?_.push(E,2,$[E]()):_.push(E,1,H||$[E])),Y.push(E)}}A&&X5(this)},render:function($,Z){if(Z.tween._time||!V5()){var Q=Z._pt;while(Q)Q.r($,Q.d),Q=Q._next}else Z.styles.revert()},get:nJ,aliases:jJ,getSetter:function($,Z,Q){var W=jJ[Z];return W&&W.indexOf(",")<0&&(Z=W),Z in sJ&&Z!==ZJ&&($._gsap.x||nJ($,"x"))?Q&&WK===Q?Z==="scale"?AU:CU:(WK=Q||{})&&(Z==="scale"?kU:PU):$.style&&!HZ($.style[Z])?LU:~Z.indexOf("-")?MU:VZ($,Z)},core:{_removeProperty:H8,_getMatrix:D5}};c9.utils.checkPrefix=z7;c9.core.getStyleSaver=EK;(function(J,$,Z,Q){var W=o9(J+","+$+","+Z,function(K){sJ[K]=1});o9($,function(K){JJ.units[K]="deg",zK[K]=1}),jJ[W[13]]=J+","+$,o9(Q,function(K){var Y=K.split(":");jJ[Y[1]]=W[Y[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");o9("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(J){JJ.units[J]="px"});c9.registerPlugin(E5);var t0=c9.registerPlugin(E5)||c9,oU=t0.core.Tween;class O5{container;scene;camera;renderer;controls;audio;raycaster=new LQ;mousePos=new U0;rootGroup=new N0;sceneryGroup=new N0;trackGroup=new N0;viaductGroup=new N0;trainGroup=new N0;weatherGroup=new N0;celestialGroup=new N0;locoCar=new N0;tenderCar=new N0;coachCar=new N0;cabooseCar=new N0;rotatingWheels=[];coachWindowMat;headlampBeam=null;headlampCoreBeam=null;headlampLight=null;headlampSpotLight=null;headlampTrackPool=null;coachInteriorLight1=null;coachInteriorLight2=null;tailLight=null;lanternLight=null;crossingLight1=null;crossingLight2=null;crossingLamp1=null;crossingLamp2=null;mooredBoat=null;viaductLanterns=[];viaductLanternLights=[];interactiveSheep=[];interactivePoles=[];tunnelLight=null;railClickAccumulator=0;lastBlinkCycle=!1;lastHoverRippleTime=0;windmillGroup=null;windmillSails=null;windmillLight=null;windmillBaseSpeed=0.009;windmillCurrentSpeed=0.009;watermillGroup=null;waterwheel=null;watermillLight=null;cottageGroup=null;cottageLight=null;semaphoreGroup=null;semaphoreArm=null;semaphoreLight=null;semaphoreIsRaised=!1;firefliesGroup=null;fireflies=[];alpineRidgeGroup=new N0;campsiteGroup=new N0;campfireLight=null;campfireFlame=null;campfireParticles=null;campfireParticlePos;waterTowerGroup=new N0;waterTowerSpout=null;waterSprayPoints=null;isWaterTowerSpraying=!1;hotAirBalloonGroup=new N0;balloonBurnerLight=null;balloonBurnerFlame=null;belfryGroup=new N0;belfryBell=null;currentViewMode="isometric";directorShotIndex=0;directorTimer=0;directorShotDuration=6.8;directorNeedsCut=!0;lastAnimTime=0;ambientLight;hemiLight;sunLight;fillLight;sunMesh;sunCorona;moonMesh;moonLight;starsPoints;isNightMode=!1;isRaining=!1;rainStreaks=null;rainCount=360;rainGeo=null;rainPositions=null;splashRipples=[];steamParticles=[];steamTimer=0;trackCurve;progress=0;trainSpeed=0.0016;speedMultiplier=1;clockHand=null;clockTowerGroup=null;interactiveTrees=[];waterMesh=null;animFrameId=0;isDestroyed=!1;constructor(J,$){let Z=document.getElementById(J);if(!Z)throw Error(`ThreeStage container #${J} not found`);this.container=Z,this.audio=$,this.scene=new FQ;let Q=this.container.clientWidth||920,W=this.container.clientHeight||520;this.camera=new d9(36,Q/W,0.1,100),this.camera.position.set(3.8,2.85,3.8),this.camera.lookAt(0,0.15,0),this.renderer=new n$({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(Q,W),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=I6,this.renderer.toneMapping=L6,this.renderer.toneMappingExposure=1.15,this.container.appendChild(this.renderer.domElement),this.controls=new CQ(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=0.06,this.controls.autoRotate=!1,this.controls.autoRotateSpeed=0,this.controls.minPolarAngle=Math.PI*0.18,this.controls.maxPolarAngle=Math.PI*0.44,this.controls.minDistance=2.4,this.controls.maxDistance=7,this.controls.target.set(0,0.15,0),this.scene.add(this.rootGroup),this.scene.add(this.celestialGroup),this.scene.add(this.weatherGroup),this.rootGroup.add(this.sceneryGroup),this.rootGroup.add(this.viaductGroup),this.rootGroup.add(this.trackGroup),this.rootGroup.add(this.trainGroup),this.rootGroup.scale.setScalar(1.06),this.setupLighting(),this.buildCelestialElements(),this.buildSculptedIsland(),this.buildScenicCanalAndBridge(),this.buildInfiniteTrackCurve(),this.buildPhysicalRailsAndTies(),this.buildStoneViaductAndTunnel(),this.buildMiniatureStationAndTown(),this.buildDutchWindmill(),this.buildCanalWatermill(),this.buildVillageCottageAndSignals(),this.buildBioluminescentFireflies(),this.buildLevelCrossingAndTelegraph(),this.buildLushNatureAndFlock(),this.buildArticulatedTrain(),this.buildAlpineMountainRidge(),this.buildCampsiteAndCampfire(),this.buildRailwayWaterTower(),this.buildHotAirBalloon(),this.buildVillageBelfry(),this.setupWeatherSystem(),this.bindEvents(),this.setNightMode(!1,!0),this.animate()}createStoneBrickTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#dfd7c9",$.fillRect(0,0,512,512);let Z=32,Q=64;for(let K=0;K<512;K+=Z){let X=K/Z%2===1?Q/2:0;for(let q=-Q;q<512+Q;q+=Q){let H=q+X,U=Math.floor(Math.random()*20-10);$.fillStyle=`rgb(${218+U}, ${210+U}, ${196+U})`,$.fillRect(H+1,K+1,Q-2,Z-2),$.fillStyle="rgba(255,255,255,0.22)",$.fillRect(H+1,K+1,Q-2,2),$.fillStyle="rgba(0,0,0,0.12)",$.fillRect(H+1,K+Z-3,Q-2,2)}}let W=new kJ(J);return W.wrapS=f7,W.wrapT=f7,W.repeat.set(2,2),W}createWoodSleeperTexture(){let J=document.createElement("canvas");J.width=256,J.height=64;let $=J.getContext("2d");$.fillStyle="#5c3d2e",$.fillRect(0,0,256,64),$.strokeStyle="#43281c",$.lineWidth=1;for(let Q=0;Q<18;Q++){let W=Math.random()*64;$.beginPath(),$.moveTo(0,W),$.bezierCurveTo(80,W+Math.random()*4-2,180,W+Math.random()*4-2,256,W),$.stroke()}return $.fillStyle="#262626",$.fillRect(48,8,28,48),$.fillRect(180,8,28,48),$.fillStyle="#d4d4d8",$.beginPath(),$.arc(62,32,3,0,Math.PI*2),$.arc(194,32,3,0,Math.PI*2),$.fill(),new kJ(J)}createMeadowTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#4fa65b",$.fillRect(0,0,512,512);for(let Q=0;Q<1600;Q++){let W=Math.random()*512,K=Math.random()*512,Y=1.5+Math.random()*2.5,X=0.08+Math.random()*0.15;$.fillStyle=Math.random()>0.5?`rgba(90, 180, 100, ${X})`:`rgba(60, 140, 70, ${X})`,$.beginPath(),$.arc(W,K,Y,0,Math.PI*2),$.fill()}let Z=new kJ(J);return Z.wrapS=f7,Z.wrapT=f7,Z.repeat.set(3,3),Z}createVolumetricBeamTexture(){let J=document.createElement("canvas");J.width=128,J.height=512;let $=J.getContext("2d"),Z=$.createLinearGradient(0,0,0,512);return Z.addColorStop(0,"rgba(255, 252, 235, 0.85)"),Z.addColorStop(0.12,"rgba(254, 240, 138, 0.45)"),Z.addColorStop(0.35,"rgba(253, 224, 71, 0.20)"),Z.addColorStop(0.65,"rgba(250, 204, 21, 0.05)"),Z.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Z,$.fillRect(0,0,128,512),new kJ(J)}createHeadlampPoolTexture(){let J=document.createElement("canvas");J.width=256,J.height=256;let $=J.getContext("2d"),Z=$.createRadialGradient(128,128,16,128,128,124);return Z.addColorStop(0,"rgba(254, 240, 138, 0.75)"),Z.addColorStop(0.35,"rgba(253, 224, 71, 0.40)"),Z.addColorStop(0.7,"rgba(234, 179, 8, 0.12)"),Z.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Z,$.fillRect(0,0,256,256),new kJ(J)}setupLighting(){this.ambientLight=new BQ(16777215,2.1),this.scene.add(this.ambientLight),this.hemiLight=new OQ(16776171,14870768,1.2),this.hemiLight.position.set(0,10,0),this.scene.add(this.hemiLight),this.sunLight=new p7(16776171,2.6),this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=18,this.sunLight.shadow.camera.left=-4.5,this.sunLight.shadow.camera.right=4.5,this.sunLight.shadow.camera.top=4.5,this.sunLight.shadow.camera.bottom=-4.5,this.sunLight.shadow.bias=-0.0006,this.scene.add(this.sunLight),this.fillLight=new p7(14412542,1.1),this.fillLight.position.set(-4.5,4,-3.5),this.scene.add(this.fillLight),this.moonLight=new p7(9684477,0),this.moonLight.position.set(-3.5,5.5,-3.5),this.moonLight.castShadow=!0,this.moonLight.shadow.mapSize.width=1024,this.moonLight.shadow.mapSize.height=1024,this.moonLight.shadow.camera.near=1,this.moonLight.shadow.camera.far=18,this.scene.add(this.moonLight)}buildCelestialElements(){let J=new D9(0.22,24,24),$=new J0({color:16710083,emissive:16707722,emissiveIntensity:0.9,roughness:0.4});this.moonMesh=new b(J,$),this.moonMesh.position.set(-2,1.45,-0.8),this.moonMesh.scale.setScalar(0.001),this.celestialGroup.add(this.moonMesh);let Z=document.createElement("canvas");Z.width=128,Z.height=128;let Q=Z.getContext("2d"),W=Q.createRadialGradient(64,64,12,64,64,64);W.addColorStop(0,"rgba(254, 240, 138, 0.7)"),W.addColorStop(0.4,"rgba(147, 197, 253, 0.35)"),W.addColorStop(1,"rgba(0, 0, 0, 0)"),Q.fillStyle=W,Q.fillRect(0,0,128,128);let K=new kJ(Z),Y=new h7({map:K,transparent:!0,blending:I8,opacity:0}),X=new s$(Y);X.scale.set(1.5,1.5,1),this.moonMesh.add(X);let q=200,H=new R9,U=new Float32Array(q*3);for(let L=0;L<q;L++){let M=Math.PI*1.25+(Math.random()-0.5)*0.95,A=0.6+Math.random()*1.5,_=3+Math.random()*1.8;U[L*3]=Math.cos(M)*_,U[L*3+1]=A,U[L*3+2]=Math.sin(M)*_}H.setAttribute("position",new y9(U,3));let G=new X7({color:16777215,size:0.04,transparent:!0,opacity:0});this.starsPoints=new g7(H,G),this.celestialGroup.add(this.starsPoints);let F=new N0,D=new D9(0.24,24,24),O=new J0({color:16776171,emissive:16498468,emissiveIntensity:1.4,roughness:0.2,metalness:0.1}),E=new b(D,O);F.add(E);let V=document.createElement("canvas");V.width=128,V.height=128;let R=V.getContext("2d"),N=R.createRadialGradient(64,64,10,64,64,64);N.addColorStop(0,"rgba(255, 255, 255, 0.95)"),N.addColorStop(0.25,"rgba(251, 191, 36, 0.7)"),N.addColorStop(0.55,"rgba(245, 158, 11, 0.3)"),N.addColorStop(1,"rgba(0, 0, 0, 0)"),R.fillStyle=N,R.fillRect(0,0,128,128);let B=new kJ(V),I=new h7({map:B,transparent:!0,blending:I8,opacity:0.85});this.sunCorona=new s$(I),this.sunCorona.scale.set(1.9,1.9,1),F.add(this.sunCorona),F.position.set(2.8,2.3,-1.6),this.sunMesh=F,this.celestialGroup.add(this.sunMesh)}buildSculptedIsland(){let J=new AJ(6.4,4.4),$=document.createElement("canvas");$.width=256,$.height=256;let Z=$.getContext("2d"),Q=Z.createRadialGradient(128,128,40,128,128,120);Q.addColorStop(0,"rgba(15, 23, 42, 0.28)"),Q.addColorStop(0.6,"rgba(15, 23, 42, 0.12)"),Q.addColorStop(1,"rgba(15, 23, 42, 0)"),Z.fillStyle=Q,Z.fillRect(0,0,256,256);let W=new kJ($),K=new k9({map:W,transparent:!0,depthWrite:!1}),Y=new b(J,K);Y.rotation.x=-Math.PI*0.5,Y.position.y=-0.22,this.sceneryGroup.add(Y);let X=new J0({color:15986146,roughness:0.45,metalness:0.02}),q=this.createMeadowTexture(),H=new J0({color:5219931,map:q,roughness:0.65,metalness:0.02}),U=0.22,G=1.62,F=1.12,D=new b(new k0(G,G+0.06,U,48),X);D.position.set(-F,-U*0.5,0),D.receiveShadow=!0,this.sceneryGroup.add(D);let O=new b(new k0(G-0.02,G,0.035,48),H);O.position.set(-F,0.015,0),O.receiveShadow=!0,this.sceneryGroup.add(O);let E=new b(new k0(G,G+0.06,U,48),X);E.position.set(F,-U*0.5,0),E.receiveShadow=!0,this.sceneryGroup.add(E);let V=new b(new k0(G-0.02,G,0.035,48),H);V.position.set(F,0.015,0),V.receiveShadow=!0,this.sceneryGroup.add(V);let R=new b(new X0(F*2,U,1.95),X);R.position.set(0,-U*0.5,0),R.receiveShadow=!0,this.sceneryGroup.add(R);let N=new b(new X0(F*2,0.035,1.92),H);N.position.set(0,0.015,0),N.receiveShadow=!0,this.sceneryGroup.add(N)}buildScenicCanalAndBridge(){let J=new N0,$=new k0(0.46,0.5,0.022,36),Z=new J0({color:481669,roughness:0.75}),Q=new b($,Z);Q.scale.set(1.45,1,1.95),Q.rotation.y=0.7854,Q.position.set(0,0.015,-0.04),Q.receiveShadow=!0,J.add(Q);let W=new J0({color:13621468,map:this.createStoneBrickTexture(),roughness:0.55,metalness:0.05}),K=36;for(let h=0;h<K;h++){let l=h/K*Math.PI*2,r=Math.cos(l)*0.44*1.45,f=Math.sin(l)*0.44*1.95,a=r*Math.cos(0.7854)-f*Math.sin(0.7854),Z0=r*Math.sin(0.7854)+f*Math.cos(0.7854);if(Math.abs(Z0-a)/Math.SQRT2<0.22)continue;if(Math.hypot(a- -0.247,Z0-0.247)<0.2||Math.hypot(a-0.247,Z0- -0.247)<0.2)continue;let O0=new b(new X0(0.1,0.04,0.052),W);O0.position.set(a,0.038,Z0),O0.rotation.y=0.7854-l,O0.castShadow=!0,O0.receiveShadow=!0,J.add(O0)}let Y=new J0({color:165063,emissive:223649,emissiveIntensity:0.18,roughness:0.04,metalness:0.15,transparent:!0,opacity:0.88}),X=new k0(0.43,0.45,0.016,36),q=new b(X,Y);q.scale.set(1.42,1,1.9),q.rotation.y=0.7854,q.position.set(0,0.034,-0.04),q.receiveShadow=!0,this.waterMesh=q,J.add(q);let H=[6583435,4674921,9741240,5395035];[[-0.42,-0.26],[-0.38,-0.34],[-0.22,-0.48],[0.15,-0.46],[0.38,-0.32],[0.44,-0.18],[0.46,0.1],[0.38,0.28],[0.24,0.44],[-0.18,0.45],[-0.36,0.32],[-0.45,0.12]].filter(([h,l])=>Math.abs(l-h)/Math.SQRT2>=0.22).forEach(([h,l],r)=>{let f=new J0({color:H[r%H.length],roughness:0.6}),a=new b(new FJ(0.026+r%3*0.012,1),f);a.position.set(h,0.038,l),a.rotation.set(r*0.5,r*0.8,r*0.3),a.castShadow=!0,J.add(a)});let G=new N0;G.position.set(-0.3,0.04,-0.32),G.rotation.y=0.65;let F=new J0({color:7877903,roughness:0.7});[-0.07,0.07].forEach((h)=>{let l=new b(new k0(0.012,0.014,0.09,6),F);l.position.set(h,-0.01,0.09),l.castShadow=!0,G.add(l)});for(let h=0;h<4;h++){let l=new b(new X0(0.18,0.01,0.042),F);l.position.set(0,0.028,-0.06+h*0.045),l.castShadow=!0,G.add(l)}let D=new J0({color:1976635,metalness:0.8,roughness:0.3}),O=new b(new k0(0.007,0.01,0.02,8),D);O.position.set(0.06,0.042,0.075),G.add(O),J.add(G);let E=new N0;E.position.set(-0.4,0.038,-0.24),E.rotation.y=0.45;let V=new J0({color:9584654,roughness:0.5}),R=new J0({color:4528643,roughness:0.6}),N=new b(new X0(0.2,0.042,0.09),V);N.position.y=0.018,N.castShadow=!0,E.add(N);let B=new b(new X0(0.208,0.008,0.098),R);B.position.y=0.04,E.add(B);let I=new J0({color:11817737,roughness:0.4}),L=new b(new X0(0.038,0.014,0.082),I);L.position.set(0,0.028,0),E.add(L);let M=new b(new X0(0.042,0.014,0.082),I);M.position.set(-0.075,0.028,0),E.add(M);let A=new J0({color:14251782,roughness:0.4});[-1,1].forEach((h)=>{let l=new N0,r=new b(new k0(0.004,0.004,0.16,6),A);r.rotation.z=Math.PI*0.5,l.add(r);let f=new b(new X0(0.038,0.003,0.018),A);f.position.x=0.08,l.add(f),l.position.set(0.01,0.044,h*0.052),l.rotation.y=h*0.25,l.rotation.z=h*0.1,E.add(l)});let _=new J0({color:13935475,roughness:0.9}),z=new b(new k0(0.003,0.003,0.12,4),_);z.position.set(0.12,0.035,-0.04),z.rotation.z=-Math.PI*0.35,z.rotation.y=0.4,E.add(z),this.mooredBoat=E,J.add(E);let k=new J0({color:1467700,roughness:0.6}),y=new J0({color:4528643,roughness:0.8});[[-0.2,-0.42],[0.22,-0.38],[-0.38,0.15],[0.38,-0.18]].filter(([h,l])=>Math.abs(l-h)/Math.SQRT2>=0.22).forEach(([h,l])=>{for(let r=0;r<3;r++){let f=new N0,a=(Math.random()-0.5)*0.05,Z0=(Math.random()-0.5)*0.05;f.position.set(h+a,0.035,l+Z0);let Y0=new b(new k0(0.003,0.004,0.1+r*0.02,4),k);Y0.position.y=0.05+r*0.01,f.add(Y0);let O0=new b(new k0(0.008,0.008,0.032,6),y);O0.position.y=0.085+r*0.01,f.add(O0),J.add(f)}});let t=new J0({color:1409085,roughness:0.35}),j=new J0({color:16020150,roughness:0.25}),m=new J0({color:16638023,roughness:0.25});[[-0.3,0.038,0.06],[0.3,0.038,-0.06],[-0.38,0.038,-0.15],[0.38,0.038,0.15]].filter(([h,,l])=>Math.abs(l-h)/Math.SQRT2>=0.22).forEach(([h,l,r],f)=>{let a=new b(new k0(0.04,0.04,0.004,12,1,!1,0,Math.PI*1.85),t);a.position.set(h,l,r),a.rotation.y=f*1.4,J.add(a);let Z0=new b(new FJ(0.016,0),f%2===0?j:m);Z0.position.set(h,l+0.012,r),J.add(Z0)});let i=new J0({color:4528643,roughness:0.85});[-0.28,-0.14,0,0.14,0.28].forEach((h)=>{let l=h*0.7071,r=h*0.7071,f=new b(new X0(0.24,0.024,0.055),i);f.position.set(l,0.044,r),f.rotation.y=-Math.PI*0.25,f.castShadow=!0,J.add(f),[-0.075,0.075].forEach((a)=>{let Z0=l-a*0.7071,Y0=r+a*0.7071,O0=new b(new k0(0.014,0.016,0.065,8),i);O0.position.set(Z0,0.02,Y0),O0.castShadow=!0,J.add(O0)})}),[-0.045,0.045].forEach((h)=>{let l=new b(new X0(0.64,0.018,0.035),i),r=-h*0.7071,f=h*0.7071;l.position.set(r,0.048,f),l.rotation.y=Math.PI*0.25,l.castShadow=!0,J.add(l)}),this.sceneryGroup.add(J)}buildInfiniteTrackCurve(){let J=[],$=180,Z=0.92,Q=0.055,W=0.38;for(let K=0;K<180;K++){let Y=K/180*Math.PI*2,X=Math.sin(Y)*2.22,q=Math.sin(2*Y)*1.1,H=Math.abs(Y-Math.PI),U=0.055;if(H<0.92){let G=Math.cos(H/0.92*(Math.PI*0.5));U=0.055+0.38*Math.pow(G,2)}J.push(new T(X,U,q))}this.trackCurve=new Y7(J,!0,"centripetal")}buildPhysicalRailsAndTies(){let J=new X0(0.24,0.022,0.06),$=this.createWoodSleeperTexture(),Z=new J0({color:6044974,map:$,roughness:0.7,metalness:0.1}),Q=110,W=new T(0,1,0);for(let V=0;V<110;V++){let R=V/110,N=this.trackCurve.getPointAt(R),B=this.trackCurve.getTangentAt(R).normalize(),I=new T().crossVectors(B,W).normalize();if(I.lengthSq()<0.001)I.set(1,0,0);let L=new b(J,Z);L.position.set(N.x,N.y-0.012,N.z),L.lookAt(N.clone().add(I)),L.castShadow=!0,L.receiveShadow=!0,this.trackGroup.add(L)}let K=220,Y=0.066,X=[],q=[];for(let V=0;V<=K;V++){let R=V/K,N=this.trackCurve.getPointAt(R),B=this.trackCurve.getTangentAt(R).normalize(),I=new T().crossVectors(B,W).normalize();if(I.lengthSq()<0.001)I.set(1,0,0);X.push(N.clone().addScaledVector(I,Y)),q.push(N.clone().addScaledVector(I,-Y))}let H=new Y7(X,!0),U=new Y7(q,!0),G=new u7(H,220,0.013,8,!0),F=new u7(U,220,0.013,8,!0),D=new J0({color:13948120,metalness:0.92,roughness:0.18}),O=new b(G,D),E=new b(F,D);O.castShadow=!0,O.receiveShadow=!0,E.castShadow=!0,E.receiveShadow=!0,this.trackGroup.add(O),this.trackGroup.add(E)}buildStoneViaductAndTunnel(){this.viaductGroup.rotation.y=0.7809;let J=this.createStoneBrickTexture(),$=new J0({color:14603717,map:J,roughness:0.52,metalness:0.04}),Z=new J0({color:9074529,roughness:0.45}),Q=new J0({color:6583435,map:J,roughness:0.65}),W=new J0({color:3033643,roughness:0.85}),K=new X0(0.24,0.4,0.48);[-0.35,0.35].forEach((N)=>{let B=new b(K,$);B.position.set(N,0.2,0),B.castShadow=!0,B.receiveShadow=!0,this.viaductGroup.add(B);let I=new b(new X0(0.28,0.07,0.54),Q);I.position.set(N,0.035,0),I.castShadow=!0,I.receiveShadow=!0,this.viaductGroup.add(I),[-0.29,0.29].forEach((L)=>{let M=new b(new k0(0.001,0.12,0.22,3),Q);M.position.set(N,0.09,L),M.rotation.y=L>0?0:Math.PI,M.castShadow=!0,this.viaductGroup.add(M)}),[-0.14,0.14].forEach((L)=>{let M=new b(new FJ(0.024,0),W);M.position.set(N+(N>0?-0.12:0.12),0.06+Math.random()*0.04,L),this.viaductGroup.add(M)})});let Y=new X0(1.12,0.045,0.44),X=new b(Y,$);X.position.set(0,0.4,0),X.castShadow=!0,X.receiveShadow=!0,this.viaductGroup.add(X);for(let N=0;N<9;N++){let B=-0.44+N*0.11;[-0.21,0.21].forEach((I)=>{let L=new b(new X0(0.032,0.028,0.038),Z);L.position.set(B,0.375,I),L.castShadow=!0,this.viaductGroup.add(L)})}let q=new J0({color:13156008,map:J,roughness:0.58,metalness:0.04,side:$8}),H=new k0(0.23,0.23,0.48,28,1,!0,-Math.PI*0.5,Math.PI),U=new b(H,q);U.rotation.x=-Math.PI*0.5,U.position.set(0,0.17,0),U.castShadow=!0,U.receiveShadow=!0,this.viaductGroup.add(U),this.tunnelLight=new f9(16498468,0.9,1.4),this.tunnelLight.position.set(0,0.32,0),this.viaductGroup.add(this.tunnelLight),[-0.242,0.242].forEach((N)=>{for(let I=0;I<=9;I++){let L=I/9*Math.PI,M=I===Math.floor(4.5),A=Math.cos(L)*0.235,_=0.17+Math.sin(L)*0.235,z=M?new X0(0.048,0.064,0.042):new X0(0.038,0.042,0.03),k=new b(z,M?Z:$);k.position.set(A,_,N),k.rotation.z=L-Math.PI*0.5,k.castShadow=!0,this.viaductGroup.add(k)}[-0.18,0.18].forEach((I)=>{let L=new b(new X0(0.09,0.07,0.024),$);L.position.set(I,0.365,N),L.castShadow=!0,this.viaductGroup.add(L)})});let G=new X0(1.12,0.085,0.04),F=new b(G,Z);F.position.set(0,0.46,0.2),F.castShadow=!0,this.viaductGroup.add(F);let D=new b(G,Z);D.position.set(0,0.46,-0.2),D.castShadow=!0,this.viaductGroup.add(D);let O=new G9(0.035,0.075,4);[[-0.54,0.525,0.2],[0.54,0.525,0.2],[-0.54,0.525,-0.2],[0.54,0.525,-0.2]].forEach(([N,B,I])=>{let L=new b(O,Z);L.position.set(N,B,I),L.rotation.y=Math.PI*0.25,L.castShadow=!0,this.viaductGroup.add(L)}),this.viaductLanterns=[],this.viaductLanternLights=[];let E=new J0({color:1976635,metalness:0.85,roughness:0.3}),V=new J0({color:14251782,metalness:0.8,roughness:0.2}),R=new J0({color:16707722,emissive:16498468,emissiveIntensity:1.8,roughness:0.1,transparent:!0,opacity:0.9});[{x:-0.38,z:0.25},{x:0.38,z:0.25},{x:-0.38,z:-0.25},{x:0.38,z:-0.25}].forEach(({x:N,z:B})=>{let I=new N0;I.position.set(N,0.29,B);let L=new b(new X0(0.012,0.045,0.045),E);L.position.set(N>0?-0.02:0.02,0,0),I.add(L);let M=new b(new k0(0.022,0.016,0.04,6),V);M.position.set(0,0.01,0),M.castShadow=!0,I.add(M);let A=new b(new k0(0.016,0.012,0.028,6),R);A.position.set(0,0.01,0),I.add(A);let _=new f9(16498468,this.isNightMode?1.4:0,1.6);_.position.set(0,0.01,0),I.add(_),this.viaductLanternLights.push(_),this.viaductLanterns.push(I),this.viaductGroup.add(I)})}buildMiniatureStationAndTown(){let J=new N0;J.position.set(1.1,0,0.48),J.rotation.y=0.25;let $=new J0({color:14870768,roughness:0.4}),Z=new J0({color:8736014,roughness:0.5}),Q=new J0({color:14510880,roughness:0.35}),W=new b(new X0(0.58,0.05,0.2),$);W.position.y=0.025,W.castShadow=!0,W.receiveShadow=!0,J.add(W);let K=new X0(0.024,0.28,0.024),Y=new b(K,Z);Y.position.set(-0.16,0.16,-0.06),J.add(Y);let X=new b(K,Z);X.position.set(0.08,0.16,-0.06),J.add(X);let q=new b(new X0(0.38,0.024,0.2),Q);q.position.set(-0.04,0.3,-0.02),q.rotation.x=0.12,q.castShadow=!0,J.add(q),this.clockTowerGroup=new N0,this.clockTowerGroup.position.set(0.2,0,-0.04);let H=new b(new X0(0.12,0.42,0.12),$);H.position.y=0.235,H.castShadow=!0,this.clockTowerGroup.add(H);let U=new b(new G9(0.1,0.18,4),Q);U.position.y=0.53,U.rotation.y=Math.PI*0.25,U.castShadow=!0,this.clockTowerGroup.add(U);let G=new b(new k0(0.038,0.038,0.01,16),new J0({color:16777215,roughness:0.1}));G.rotation.x=Math.PI*0.5,G.position.set(0,0.36,0.065),this.clockTowerGroup.add(G);let F=new X0(0.005,0.028,0.005);this.clockHand=new b(F,new k9({color:988970})),this.clockHand.position.set(0,0.36,0.072),this.clockTowerGroup.add(this.clockHand),J.add(this.clockTowerGroup);let D=new b(new X0(0.18,0.038,0.05),Z);D.position.set(-0.06,0.065,-0.04),J.add(D);let O=new b(new X0(0.04,0.03,0.022),new J0({color:9584654}));O.position.set(-0.16,0.065,-0.04),J.add(O),[2450411,14251782].forEach((R,N)=>{let B=new N0,I=new b(new k0(0.02,0.026,0.07,8),new J0({color:R,roughness:0.4}));I.position.y=0.085;let L=new b(new D9(0.02,8,8),new J0({color:16772565}));L.position.y=0.135,B.add(I),B.add(L),B.position.set(-0.02+N*0.06,0,0.01),B.castShadow=!0,J.add(B)}),this.lanternLight=new f9(16708551,0.8,1.6),this.lanternLight.position.set(-0.04,0.26,-0.02),J.add(this.lanternLight);let V=new b(new D9(0.022,8,8),new k9({color:16707722}));V.position.copy(this.lanternLight.position),J.add(V),this.sceneryGroup.add(J)}buildDutchWindmill(){this.windmillGroup=new N0,this.windmillGroup.position.set(-1.62,0.035,0.05);let J=this.createStoneBrickTexture(),$=new J0({color:14076856,map:J,roughness:0.65,metalness:0.05}),Z=new J0({color:7877903,roughness:0.7}),Q=new J0({color:14604492,roughness:0.6,metalness:0.02}),W=new J0({color:3359061,roughness:0.45,metalness:0.2}),K=new J0({color:16710083,roughness:0.8,side:$8}),Y=new b(new k0(0.18,0.21,0.08,8),$);Y.position.y=0.04,Y.castShadow=!0,Y.receiveShadow=!0,this.windmillGroup.add(Y);let X=new b(new k0(0.11,0.17,0.36,8),Q);X.position.y=0.26,X.castShadow=!0,X.receiveShadow=!0,this.windmillGroup.add(X);let q=new b(new k0(0.2,0.2,0.014,8),Z);q.position.y=0.22,q.castShadow=!0,this.windmillGroup.add(q);for(let V=0;V<8;V++){let R=V/8*Math.PI*2,N=Math.cos(R)*0.19,B=Math.sin(R)*0.19,I=new b(new X0(0.012,0.045,0.012),Z);I.position.set(N,0.245,B),this.windmillGroup.add(I)}let H=new b(new k0(0.09,0.12,0.07,8),W);H.position.y=0.46,H.castShadow=!0,this.windmillGroup.add(H);let U=new b(new G9(0.1,0.08,8),W);U.position.y=0.52,U.castShadow=!0,this.windmillGroup.add(U);let G=new b(new k0(0.006,0.008,0.18,6),Z);G.position.set(-0.09,0.47,0),G.rotation.z=Math.PI*0.35,this.windmillGroup.add(G),this.windmillSails=new N0,this.windmillSails.position.set(0.11,0.46,0);let F=new b(new k0(0.022,0.022,0.024,8),Z);F.rotation.z=Math.PI*0.5,this.windmillSails.add(F);for(let V=0;V<4;V++){let R=V*Math.PI/2,N=new N0;N.rotation.x=R;let B=new b(new X0(0.012,0.24,0.012),Z);B.position.y=0.12,B.castShadow=!0,N.add(B);let I=new b(new X0(0.004,0.18,0.055),K);I.position.set(0.006,0.14,0.03),I.rotation.y=0.18,I.castShadow=!0,N.add(I);for(let L=0;L<4;L++){let M=new b(new X0(0.008,0.005,0.058),Z);M.position.set(0.007,0.07+L*0.045,0.03),N.add(M)}this.windmillSails.add(N)}this.windmillGroup.add(this.windmillSails);let D=new b(new X0(0.012,0.055,0.035),Z);D.position.set(0.165,0.065,0),this.windmillGroup.add(D);let O=new J0({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.6:0.1,roughness:0.1}),E=new b(new X0(0.012,0.03,0.024),O);E.position.set(0.125,0.27,0.04),this.windmillGroup.add(E),this.windmillLight=new f9(16498468,this.isNightMode?0.85:0,1.4),this.windmillLight.position.set(0.08,0.28,0),this.windmillGroup.add(this.windmillLight),this.sceneryGroup.add(this.windmillGroup)}buildCanalWatermill(){this.watermillGroup=new N0,this.watermillGroup.position.set(0,0.035,-0.88);let J=this.createStoneBrickTexture(),$=new J0({color:13621468,map:J,roughness:0.65,metalness:0.05}),Z=new J0({color:7877903,roughness:0.7}),Q=new J0({color:15857145,roughness:0.85}),W=new J0({color:10105874,roughness:0.5}),K=new b(new X0(0.32,0.1,0.26),$);K.position.y=0.05,K.castShadow=!0,K.receiveShadow=!0,this.watermillGroup.add(K);let Y=new b(new X0(0.3,0.13,0.24),Q);Y.position.y=0.165,Y.castShadow=!0,Y.receiveShadow=!0,this.watermillGroup.add(Y),[-0.145,0.145].forEach((O)=>{let E=new b(new X0(0.015,0.13,0.245),Z);E.position.set(O,0.165,0),this.watermillGroup.add(E)});let X=new b(new X0(0.34,0.024,0.17),W);X.position.set(0,0.275,-0.06),X.rotation.x=0.68,X.castShadow=!0,this.watermillGroup.add(X);let q=new b(new X0(0.34,0.024,0.17),W);q.position.set(0,0.275,0.06),q.rotation.x=-0.68,q.castShadow=!0,this.watermillGroup.add(q),[-0.148,0.148].forEach((O)=>{let E=new b(new G9(0.12,0.09,3),Z);E.position.set(O,0.275,0),E.rotation.y=O>0?Math.PI*0.5:-Math.PI*0.5,this.watermillGroup.add(E)});let H=new b(new X0(0.045,0.16,0.045),$);H.position.set(0.09,0.3,-0.07),H.castShadow=!0,this.watermillGroup.add(H);let U=new b(new X0(0.08,0.022,0.16),Z);U.position.set(0,0.18,0.17),U.rotation.x=0.15,U.castShadow=!0,this.watermillGroup.add(U),this.waterwheel=new N0,this.waterwheel.position.set(0,0.065,0.18);let G=new b(new k0(0.014,0.014,0.08,8),Z);G.rotation.z=Math.PI*0.5,this.waterwheel.add(G),[-0.03,0.03].forEach((O)=>{let E=new b(new m7(0.105,0.125,16),Z);E.rotation.y=Math.PI*0.5,E.position.x=O,this.waterwheel.add(E)});for(let O=0;O<12;O++){let E=O/12*Math.PI*2,V=new N0;if(V.rotation.x=E,O%2===0){let N=new b(new X0(0.012,0.11,0.01),Z);N.position.y=0.055,V.add(N)}let R=new b(new X0(0.068,0.008,0.036),Z);R.position.set(0,0.115,0),R.castShadow=!0,V.add(R),this.waterwheel.add(V)}this.watermillGroup.add(this.waterwheel);let F=new b(new X0(0.012,0.012,0.045),Z);F.position.set(0.09,0.18,0.14),this.watermillGroup.add(F),this.watermillLight=new f9(16498468,this.isNightMode?0.85:0,1.4),this.watermillLight.position.set(0.09,0.16,0.16),this.watermillGroup.add(this.watermillLight);let D=new b(new D9(0.016,8,8),new k9({color:16707722}));D.position.copy(this.watermillLight.position),this.watermillGroup.add(D),this.sceneryGroup.add(this.watermillGroup)}buildVillageCottageAndSignals(){this.cottageGroup=new N0,this.cottageGroup.position.set(1.42,0.035,0.22),this.cottageGroup.rotation.y=-0.35;let J=new J0({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),$=new J0({color:16448249,roughness:0.85}),Z=new J0({color:4528643,roughness:0.7}),Q=new J0({color:8736014,roughness:0.9}),W=new J0({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.8:0.1,roughness:0.1}),K=new b(new X0(0.36,0.05,0.26),J);K.position.y=0.025,K.castShadow=!0,K.receiveShadow=!0,this.cottageGroup.add(K);let Y=new b(new X0(0.34,0.14,0.24),$);Y.position.y=0.12,Y.castShadow=!0,Y.receiveShadow=!0,this.cottageGroup.add(Y),[-0.165,0.165].forEach((_)=>{let z=new b(new X0(0.016,0.14,0.244),Z);z.position.set(_,0.12,0),this.cottageGroup.add(z)});let X=new b(new X0(0.344,0.016,0.244),Z);X.position.set(0,0.12,0),this.cottageGroup.add(X);let q=new b(new X0(0.38,0.026,0.17),Q);q.position.set(0,0.225,-0.06),q.rotation.x=0.72,q.castShadow=!0,this.cottageGroup.add(q);let H=new b(new X0(0.38,0.026,0.17),Q);H.position.set(0,0.225,0.06),H.rotation.x=-0.72,H.castShadow=!0,this.cottageGroup.add(H);let U=new b(new X0(0.07,0.06,0.06),$);U.position.set(-0.06,0.22,0.08),U.castShadow=!0,this.cottageGroup.add(U);let G=new b(new G9(0.05,0.04,3),Q);G.position.set(-0.06,0.265,0.08),G.rotation.y=Math.PI*0.5,this.cottageGroup.add(G);let F=new b(new X0(0.042,0.18,0.042),J);F.position.set(0.12,0.26,-0.06),F.castShadow=!0,this.cottageGroup.add(F);let D=new b(new X0(0.012,0.038,0.032),W);D.position.set(0.07,0.12,0.122),this.cottageGroup.add(D);let O=new b(new X0(0.012,0.038,0.032),W);O.position.set(-0.07,0.12,0.122),this.cottageGroup.add(O);let E=new b(new X0(0.042,0.07,0.012),Z);E.position.set(0,0.085,0.122),this.cottageGroup.add(E),this.cottageLight=new f9(16498468,this.isNightMode?1.1:0,1.6),this.cottageLight.position.set(0,0.14,0),this.cottageGroup.add(this.cottageLight),this.sceneryGroup.add(this.cottageGroup),this.semaphoreGroup=new N0,this.semaphoreGroup.position.set(-0.62,0.035,0.96);let V=new J0({color:1976635,metalness:0.8,roughness:0.3}),R=new J0({color:14427686,roughness:0.4}),N=new J0({color:16777215,roughness:0.4}),B=new b(new k0(0.01,0.014,0.38,8),V);B.position.y=0.19,B.castShadow=!0,this.semaphoreGroup.add(B);for(let _=0;_<6;_++){let z=new b(new X0(0.028,0.004,0.004),V);z.position.set(0,0.08+_*0.045,0.014),this.semaphoreGroup.add(z)}let I=new b(new D9(0.014,6,6),V);I.position.y=0.385,this.semaphoreGroup.add(I),this.semaphoreArm=new N0,this.semaphoreArm.position.set(0,0.32,0.01);let L=new b(new X0(0.12,0.022,0.005),R);L.position.x=0.06,L.castShadow=!0,this.semaphoreArm.add(L);let M=new b(new X0(0.022,0.024,0.006),N);M.position.x=0.09,this.semaphoreArm.add(M);let A=new b(new X0(0.03,0.018,0.01),V);A.position.x=-0.02,this.semaphoreArm.add(A),this.semaphoreGroup.add(this.semaphoreArm),this.semaphoreLight=new f9(14427686,0.6,0.8),this.semaphoreLight.position.set(0.01,0.32,0.02),this.semaphoreGroup.add(this.semaphoreLight),this.sceneryGroup.add(this.semaphoreGroup)}buildBioluminescentFireflies(){this.firefliesGroup=new N0,this.fireflies=[];let J=new D9(0.007,6,6),$=new k9({color:13434624,transparent:!0,opacity:this.isNightMode?0.85:0});[[-0.15,0.08,-0.45],[0.12,0.12,-0.35],[-0.05,0.1,-0.2],[0.22,0.09,-0.15],[-0.25,0.14,0.1],[0.08,0.11,0.25],[-0.18,0.09,0.38],[0.15,0.13,0.42],[-1.5,0.12,0.2],[-1.3,0.16,-0.15],[-1.65,0.18,-0.1],[-1.2,0.11,0.3],[-1.45,0.14,-0.35],[-1.1,0.1,-0.1],[-1.55,0.2,0.1],[-1.35,0.15,0.12],[1.35,0.12,0.35],[1.5,0.15,0.1],[1.25,0.14,-0.2],[1.4,0.11,-0.3],[1.1,0.1,0.25],[1.2,0.16,0.5],[0.95,0.12,0.15],[1.45,0.13,0.05]].forEach(([Q,W,K],Y)=>{let X=new b(J,$.clone());X.position.set(Q,W,K),this.firefliesGroup.add(X),this.fireflies.push({mesh:X,baseX:Q,baseY:W,baseZ:K,speed:0.6+Y%5*0.25,phase:Y*0.75,radius:0.035+Y%3*0.02})}),this.sceneryGroup.add(this.firefliesGroup)}triggerWindmillSpin(){if(!this.windmillSails)return;if(this.windmillCurrentSpeed=0.075,this.audio.playWindmillSpin(),this.windmillGroup)t0.to(this.windmillGroup.scale,{y:1.08,duration:0.15,yoyo:!0,repeat:1,ease:"power1.out"})}triggerWaterwheelSpin(){if(!this.waterwheel)return;if(this.audio.playWaterwheel(),this.triggerSplash(0,0.035,-0.73),this.watermillGroup)t0.to(this.watermillGroup.scale,{y:1.06,duration:0.12,yoyo:!0,repeat:1,ease:"power1.out"})}triggerSemaphoreToggle(){if(!this.semaphoreArm)return;this.semaphoreIsRaised=!this.semaphoreIsRaised;let J=this.semaphoreIsRaised?Math.PI*0.25:0;if(t0.to(this.semaphoreArm.rotation,{z:J,duration:0.35,ease:"back.out(1.8)"}),this.semaphoreLight)this.semaphoreLight.color.set(this.semaphoreIsRaised?1096065:14427686);this.audio.playSwitchClick()}triggerCottageChimney(){if(!this.cottageGroup)return;this.audio.playSteamChuff(!1),this.triggerTelegraphPing(this.cottageGroup)}buildLevelCrossingAndTelegraph(){let J=new N0;J.position.set(-0.45,0,0.82);let $=new b(new k0(0.016,0.018,0.38,8),new J0({color:3359061,metalness:0.6}));$.position.y=0.19,$.castShadow=!0,J.add($);let Z=new J0({color:16777215}),Q=new b(new X0(0.16,0.026,0.008),Z);Q.position.set(0,0.34,0.015),Q.rotation.z=Math.PI*0.25,J.add(Q);let W=new b(new X0(0.16,0.026,0.008),Z);W.position.set(0,0.34,0.015),W.rotation.z=-Math.PI*0.25,J.add(W);let K=new k9({color:15680580});this.crossingLamp1=new b(new D9(0.022,8,8),K),this.crossingLamp1.position.set(-0.05,0.27,0.022),J.add(this.crossingLamp1),this.crossingLight1=new f9(15680580,0.8,0.8),this.crossingLight1.position.copy(this.crossingLamp1.position),J.add(this.crossingLight1),this.crossingLamp2=new b(new D9(0.022,8,8),K),this.crossingLamp2.position.set(0.05,0.27,0.022),J.add(this.crossingLamp2),this.crossingLight2=new f9(15680580,0.2,0.8),this.crossingLight2.position.copy(this.crossingLamp2.position),J.add(this.crossingLight2),this.sceneryGroup.add(J);let Y=[[-1.2,1.45],[-0.45,1.35],[0.45,-1.35],[1.2,-1.45]],X=new J0({color:7877903,roughness:0.8});Y.forEach(([q,H])=>{let U=new N0;U.position.set(q,0,H);let G=new b(new k0(0.018,0.024,0.44,6),X);G.position.y=0.22,G.castShadow=!0,U.add(G);let F=new b(new X0(0.16,0.016,0.016),X);F.position.y=0.4,U.add(F);let D=new J0({color:16777215,roughness:0.2});[-0.06,0.06].forEach((O)=>{let E=new b(new k0(0.008,0.008,0.02,6),D);E.position.set(O,0.415,0),U.add(E)}),this.sceneryGroup.add(U),this.interactivePoles.push(U)})}getApproxDistanceToTrack(J,$){let Z=1/0,Q=72;for(let W=0;W<Q;W++){let K=W/Q*Math.PI*2,Y=Math.sin(K)*2.22,X=Math.sin(2*K)*1.1,q=Math.hypot(Y-J,X-$);if(q<Z)Z=q}return Z}buildLushNatureAndFlock(){let J=[{x:-1.15,z:0,type:"pine",col:1467700,scale:1.2},{x:-1.35,z:0.25,type:"deciduous",col:2278750,scale:1.1},{x:-0.9,z:-0.22,type:"pine",col:1409085,scale:1.05},{x:-1.45,z:-0.2,type:"deciduous",col:6660877,scale:1},{x:-0.85,z:0.2,type:"deciduous",col:4906624,scale:0.9},{x:1.15,z:0,type:"pine",col:1467700,scale:1.2},{x:1.35,z:-0.25,type:"deciduous",col:2278750,scale:1.1},{x:0.9,z:-0.22,type:"pine",col:1409085,scale:1.05},{x:1.45,z:-0.15,type:"deciduous",col:6660877,scale:1},{x:0.75,z:0.1,type:"deciduous",col:4906624,scale:0.9}],$=new J0({color:7877903,roughness:0.7});J.forEach(({x:D,z:O,type:E,col:V,scale:R})=>{let N=new N0;N.position.set(D,0,O),N.scale.setScalar(R);let B=new b(new k0(0.026,0.034,0.16,6),$);B.position.y=0.08,B.castShadow=!0,N.add(B);let I=new J0({color:V,roughness:0.5});if(E==="pine"){let L=new b(new G9(0.18,0.22,6),I);L.position.y=0.22,L.castShadow=!0,N.add(L);let M=new b(new G9(0.13,0.18,6),I);M.position.y=0.32,M.castShadow=!0,N.add(M);let A=new b(new G9(0.08,0.13,6),I);A.position.y=0.41,A.castShadow=!0,N.add(A)}else{let L=new b(new FJ(0.18,1),I);L.position.set(0,0.25,0),L.castShadow=!0,N.add(L);let M=new b(new FJ(0.13,1),I);M.position.set(0.04,0.35,0.02),M.castShadow=!0,N.add(M)}this.interactiveTrees.push(N),this.sceneryGroup.add(N)});let Z=new J0({color:16317180,roughness:0.9}),Q=new J0({color:1976635,roughness:0.5});[[-1.4,0.04,0.15],[-1.55,0.04,-0.15],[1.35,0.04,-0.1]].forEach(([D,O,E])=>{let V=new N0;V.position.set(D,O,E);let R=new b(new FJ(0.045,1),Z);R.position.y=0.045,R.scale.set(1.2,0.9,0.9),V.add(R);let N=new b(new D9(0.022,6,6),Q);N.position.set(0.05,0.05,0),V.add(N),this.interactiveSheep.push(V),this.sceneryGroup.add(V)});let K=new N0;K.position.set(-1.62,0.04,-0.22);let Y=new J0({color:11817737,roughness:0.85}),X=new J0({color:16710083,roughness:0.35}),q=new b(new X0(0.12,0.08,0.07),Y);q.position.y=0.055,K.add(q);let H=new b(new X0(0.06,0.06,0.06),Y);H.position.set(0.08,0.075,0),K.add(H);let U=new b(new G9(0.012,0.05,5),X);U.rotation.z=-Math.PI*0.35,U.position.set(0.08,0.11,0.035),K.add(U);let G=new b(new G9(0.012,0.05,5),X);G.rotation.z=-Math.PI*0.35,G.position.set(0.08,0.11,-0.035),K.add(G),this.interactiveSheep.push(K),this.sceneryGroup.add(K);let F=[15680580,16436245,16777215,11032055];for(let D=0;D<48;D++){let O=D%2===0?-1.15:1.15,E=0.22+D%5*0.14,V=D*1.35,R=O+Math.cos(V)*E,N=Math.sin(V)*E;if(this.getApproxDistanceToTrack(R,N)<0.35)continue;let B=F[D%F.length],I=new k9({color:B}),L=new b(new D9(0.016,6,6),I);L.position.set(R,0.04,N),this.sceneryGroup.add(L)}}buildArticulatedTrain(){let J=new N0,$=new J0({color:10033947,roughness:0.35}),Z=new b(new X0(0.38,0.04,0.18),$);Z.position.y=0.05,Z.castShadow=!0,J.add(Z);let Q=new b(new G9(0.1,0.08,4),new J0({color:12131356}));Q.rotation.y=Math.PI*0.25,Q.rotation.x=-Math.PI*0.5,Q.position.set(0.2,0.045,0),Q.castShadow=!0,J.add(Q);let W=new J0({color:292951,roughness:0.25,metalness:0.12}),K=new b(new k0(0.075,0.075,0.22,16),W);K.rotation.z=Math.PI*0.5,K.position.set(0.07,0.125,0),K.castShadow=!0,J.add(K);let Y=new b(new D9(0.074,12,12),W);Y.position.set(0.18,0.125,0),Y.castShadow=!0,J.add(Y);let X=new J0({color:16096779,metalness:0.8,roughness:0.25});[-0.01,0.06,0.14].forEach(($0)=>{let e=new b(new dJ(0.076,0.006,8,16),X);e.rotation.y=Math.PI*0.5,e.position.set($0,0.125,0),J.add(e)});let q=new J0({color:1976635,roughness:0.4}),H=new b(new k0(0.024,0.018,0.08,8),q);H.position.set(0.13,0.22,0),H.castShadow=!0,J.add(H);let U=new b(new dJ(0.024,0.005,6,12),X);U.rotation.x=Math.PI*0.5,U.position.set(0.13,0.26,0),J.add(U);let G=new b(new D9(0.032,10,10),X);G.position.set(0.02,0.21,0),G.castShadow=!0,J.add(G);let F=new J0({color:417606,roughness:0.3}),D=new b(new X0(0.16,0.16,0.176),F);D.position.set(-0.1,0.15,0),D.castShadow=!0,J.add(D);let O=new b(new X0(0.18,0.025,0.19),X);O.position.set(-0.1,0.24,0),O.castShadow=!0,J.add(O);let E=new k9({color:16707722}),V=new b(new AJ(0.06,0.06),E);V.position.set(-0.1,0.16,0.089),J.add(V);let R=new b(new AJ(0.06,0.06),E);R.rotation.y=Math.PI,R.position.set(-0.1,0.16,-0.089),J.add(R);let N=new b(new k0(0.034,0.028,0.044,16),X);N.rotation.z=Math.PI*0.5,N.position.set(0.2,0.14,0),N.castShadow=!0,J.add(N);let B=new b(new dJ(0.034,0.005,8,16),X);B.rotation.y=Math.PI*0.5,B.position.set(0.222,0.14,0),J.add(B);let I=new J0({color:16777215,metalness:0.95,roughness:0.08}),L=new b(new G9(0.028,0.022,16,1,!0),I);L.rotation.z=-Math.PI*0.5,L.position.set(0.21,0.14,0),J.add(L);let M=new J0({color:16776171,emissive:16707722,emissiveIntensity:3.2,roughness:0.1}),A=new b(new D9(0.013,8,8),M);A.position.set(0.218,0.14,0),J.add(A);let _=new J0({color:16772565,emissive:16707722,emissiveIntensity:1.5,roughness:0.1,metalness:0.2,transparent:!0,opacity:0.85}),z=new b(new D9(0.031,12,12,0,Math.PI*2,0,Math.PI*0.5),_);z.rotation.z=-Math.PI*0.5,z.position.set(0.222,0.14,0),J.add(z),this.headlampLight=new f9(16707722,1.8,1.2),this.headlampLight.position.set(0.26,0.14,0),J.add(this.headlampLight),this.headlampSpotLight=new NQ(16775149,2.2,2,Math.PI*0.16,0.85,1.4),this.headlampSpotLight.position.set(0.23,0.14,0);let k=new U9;k.position.set(0.85,0.04,0),J.add(k),this.headlampSpotLight.target=k,J.add(this.headlampSpotLight);let y=new k0(0.024,0.09,0.46,24,1,!0);y.translate(0,-0.23,0),y.rotateZ(Math.PI*0.5),y.rotateY(-0.06);let o=new k9({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.32,blending:I8,side:$8,depthWrite:!1});this.headlampBeam=new b(y,o),this.headlampBeam.position.set(0.22,0.14,0),this.headlampBeam.visible=!1,J.add(this.headlampBeam);let t=new k0(0.012,0.042,0.28,16,1,!0);t.translate(0,-0.14,0),t.rotateZ(Math.PI*0.5),t.rotateY(-0.06);let j=new k9({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.38,blending:I8,side:$8,depthWrite:!1});this.headlampCoreBeam=new b(t,j),this.headlampCoreBeam.position.set(0.22,0.14,0),this.headlampCoreBeam.visible=!1,J.add(this.headlampCoreBeam);let m=new k9({map:this.createHeadlampPoolTexture(),transparent:!0,opacity:0.45,blending:I8,depthWrite:!1});this.headlampTrackPool=new b(new AJ(0.24,0.44),m),this.headlampTrackPool.rotation.x=-Math.PI*0.5,this.headlampTrackPool.rotation.z=-Math.PI*0.5,this.headlampTrackPool.position.set(0.4,0.058,0),this.headlampTrackPool.visible=!1,J.add(this.headlampTrackPool);let d=new J0({color:16096779,metalness:0.85,roughness:0.2}),i=new b(new k0(0.032,0.038,0.045,12),d);i.position.set(0.04,0.175,0),i.castShadow=!0,J.add(i);let n=new b(new k0(0.006,0.006,0.035,6),d);n.position.set(-0.03,0.19,0.03),J.add(n);let h=new J0({color:1976635,metalness:0.8,roughness:0.4}),l=new b(new X0(0.04,0.016,0.024),h);l.position.set(-0.19,0.048,0),J.add(l),this.attachWheels(J,[[0.08,0.045,0.09],[-0.08,0.045,0.09],[0.08,0.045,-0.09],[-0.08,0.045,-0.09]],0.045),this.locoCar=J,this.trainGroup.add(this.locoCar);let r=new N0,f=new J0({color:3359061,roughness:0.5}),a=new b(new X0(0.24,0.11,0.17),f);a.position.y=0.095,a.castShadow=!0,r.add(a);let Z0=new J0({color:988970,roughness:0.9}),Y0=new b(new FJ(0.08,1),Z0);Y0.position.set(0,0.14,0),Y0.scale.set(1.2,0.6,0.85),Y0.castShadow=!0,r.add(Y0);let O0=new b(new X0(0.04,0.016,0.024),h);O0.position.set(0.13,0.048,0),r.add(O0);let w0=new b(new X0(0.04,0.016,0.024),h);w0.position.set(-0.13,0.048,0),r.add(w0),this.attachWheels(r,[[0.065,0.038,0.088],[-0.065,0.038,0.088],[0.065,0.038,-0.088],[-0.065,0.038,-0.088]],0.038),this.tenderCar=r,this.trainGroup.add(this.tenderCar);let P0=new N0,T0=new J0({color:14251782,roughness:0.3}),o0=new b(new X0(0.36,0.14,0.176),T0);o0.position.y=0.11,o0.castShadow=!0,P0.add(o0);let v=new J0({color:16777215,roughness:0.3}),M9=new b(new X0(0.38,0.028,0.19),v);M9.position.y=0.19,M9.castShadow=!0,P0.add(M9),this.coachWindowMat=new J0({color:16707722,emissive:0,emissiveIntensity:0,roughness:0.1}),[-0.1,0,0.1].forEach(($0)=>{let e=new b(new AJ(0.055,0.055),this.coachWindowMat);e.position.set($0,0.125,0.089),P0.add(e);let Q0=new b(new AJ(0.055,0.055),this.coachWindowMat);Q0.rotation.y=Math.PI,Q0.position.set($0,0.125,-0.089),P0.add(Q0)}),this.coachInteriorLight1=new f9(16707722,0,1.2),this.coachInteriorLight1.position.set(-0.06,0.125,0),P0.add(this.coachInteriorLight1),this.coachInteriorLight2=new f9(16707722,0,1.2),this.coachInteriorLight2.position.set(0.06,0.125,0),P0.add(this.coachInteriorLight2);let p0=new b(new X0(0.04,0.016,0.024),h);p0.position.set(0.19,0.048,0),P0.add(p0);let M0=new b(new X0(0.04,0.016,0.024),h);M0.position.set(-0.19,0.048,0),P0.add(M0),this.attachWheels(P0,[[0.1,0.038,0.088],[-0.1,0.038,0.088],[0.1,0.038,-0.088],[-0.1,0.038,-0.088]],0.038),this.coachCar=P0,this.trainGroup.add(this.coachCar);let L0=new N0,x0=new J0({color:12456508,roughness:0.35}),v0=new b(new X0(0.3,0.13,0.176),x0);v0.position.y=0.105,v0.castShadow=!0,L0.add(v0);let y0=new b(new X0(0.12,0.07,0.14),x0);y0.position.set(-0.02,0.2,0),y0.castShadow=!0,L0.add(y0);let S=new b(new X0(0.14,0.018,0.16),v);S.position.set(-0.02,0.245,0),L0.add(S);let C=new b(new X0(0.04,0.016,0.024),h);C.position.set(0.16,0.048,0),L0.add(C);let u=new b(new D9(0.024,8,8),new k9({color:15680580}));u.position.set(-0.16,0.12,0),L0.add(u),this.tailLight=new f9(15680580,0.8,1.2),this.tailLight.position.set(-0.2,0.12,0),L0.add(this.tailLight),this.attachWheels(L0,[[0.08,0.038,0.088],[-0.08,0.038,0.088],[0.08,0.038,-0.088],[-0.08,0.038,-0.088]],0.038),this.cabooseCar=L0,this.trainGroup.add(this.cabooseCar);for(let $0=0;$0<16;$0++){let e=new b(new FJ(0.036+$0%3*0.014,1),new J0({color:16777215,roughness:0.1,transparent:!0,opacity:0,depthWrite:!1}));e.visible=!1,e.position.set(0,-100,0),this.rootGroup.add(e),this.steamParticles.push({mesh:e,life:0,vx:0,vy:0,vz:0})}}attachWheels(J,$,Z){let Q=new J0({color:1976635,metalness:0.75,roughness:0.25}),W=new J0({color:14251782,metalness:0.85,roughness:0.25}),K=new J0({color:14251782,metalness:0.55,roughness:0.35}),Y=new k0(Z,Z,0.018,20);Y.rotateX(Math.PI*0.5);let X=new k0(Z*0.36,Z*0.36,0.024,12);X.rotateX(Math.PI*0.5);let q=new X0(Z*1.6,Z*0.2,0.02),H=new X0(Z*0.2,Z*1.6,0.02);$.forEach(([U,G,F])=>{let D=new b(Y,Q);D.position.set(U,G,F),D.castShadow=!0;let O=new b(X,W);D.add(O);let E=new b(q,K);D.add(E);let V=new b(H,K);D.add(V),J.add(D),this.rotatingWheels.push(D)})}buildAlpineMountainRidge(){let J=new N0,$=new J0({color:4674921,roughness:0.88,flatShading:!0}),Z=new J0({color:16317180,roughness:0.35,emissive:16777215,emissiveIntensity:0.08,flatShading:!0}),Q=new J0({color:1332013,roughness:0.65}),W=new J0({color:4528643,roughness:0.8});[{x:0.15,z:-2.85,r:1.45,h:1.85,snowH:0.65,segments:7},{x:-1.95,z:-2.55,r:1.25,h:1.5,snowH:0.52,segments:6},{x:2.15,z:-2.65,r:1.35,h:1.65,snowH:0.58,segments:6}].forEach(({x:X,z:q,r:H,h:U,snowH:G,segments:F})=>{let D=new b(new G9(H,U,F,1),$);D.position.set(X,U*0.5-0.22,q),D.rotation.y=X*1.5%Math.PI,D.receiveShadow=!0,D.castShadow=!0,J.add(D);let O=new b(new G9(H*(G/U)*1.05,G,F,1),Z);O.position.set(X,U-G*0.5-0.21,q),O.rotation.y=D.rotation.y,O.receiveShadow=!0,J.add(O)}),[[-2.3,-2.1],[-1.8,-2.15],[-1.4,-2.3],[-0.8,-2.4],[-0.3,-2.5],[0.5,-2.5],[1.1,-2.4],[1.6,-2.25],[2.2,-2.15]].forEach(([X,q],H)=>{let U=new N0;U.position.set(X,0,q);let G=0.75+H%3*0.18;U.scale.setScalar(G);let F=new b(new k0(0.02,0.03,0.14,5),W);F.position.y=0.07,U.add(F);let D=new b(new G9(0.14,0.24,6),Q);D.position.y=0.22,D.castShadow=!0,U.add(D);let O=new b(new G9(0.1,0.18,6),Q);O.position.y=0.33,U.add(O),J.add(U)}),this.alpineRidgeGroup=J,this.sceneryGroup.add(this.alpineRidgeGroup)}buildCampsiteAndCampfire(){let J=new N0;J.position.set(-1.82,0.04,0.95);let $=new N0;$.position.set(-0.25,0,0.15),$.rotation.y=0.42;let Z=new J0({color:16096779,roughness:0.6,side:$8}),Q=new k0(0.18,0.18,0.38,3,1,!1),W=new b(Q,Z);W.rotation.z=Math.PI*0.5,W.rotation.y=Math.PI*0.5,W.position.y=0.11,W.castShadow=!0,$.add(W);let K=new k9({color:4528643}),Y=new b(new i$(0.08,3),K);Y.position.set(0,0.08,0.191),$.add(Y),J.add($);let X=new N0;X.position.set(0.24,0,0.22),X.rotation.y=-0.65;let q=new J0({color:1981066,roughness:0.6,side:$8}),H=new b(Q,q);H.rotation.z=Math.PI*0.5,H.rotation.y=Math.PI*0.5,H.position.y=0.11,H.castShadow=!0,X.add(H),J.add(X);let U=new N0;U.position.set(0,0,-0.15);let G=new J0({color:7893356,roughness:0.8});for(let I=0;I<8;I++){let L=I/8*Math.PI*2,M=new b(new FJ(0.035,1),G);M.position.set(Math.cos(L)*0.14,0.02,Math.sin(L)*0.14),U.add(M)}let F=new J0({color:7877903,roughness:0.85});for(let I=0;I<3;I++){let L=new b(new k0(0.02,0.022,0.2,6),F);L.rotation.z=Math.PI*0.5,L.rotation.y=I*Math.PI/3,L.position.y=0.025,U.add(L)}let D=new k9({color:16347926}),O=new b(new G9(0.07,0.18,7),D);O.position.y=0.1,U.add(O),this.campfireFlame=O;let E=new k9({color:16707722}),V=new b(new G9(0.035,0.11,7),E);V.position.y=0.08,U.add(V),this.campfireLight=new f9(16347926,1.4,1.8),this.campfireLight.position.set(0,0.18,0),U.add(this.campfireLight);let R=20,N=new R9;this.campfireParticlePos=new Float32Array(R*3);for(let I=0;I<R;I++)this.campfireParticlePos[I*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[I*3+1]=0.06+Math.random()*0.22,this.campfireParticlePos[I*3+2]=(Math.random()-0.5)*0.12;N.setAttribute("position",new y9(this.campfireParticlePos,3));let B=new X7({color:16498468,size:0.03,transparent:!0,blending:I8,opacity:0.85});this.campfireParticles=new g7(N,B),U.add(this.campfireParticles),J.add(U),this.campsiteGroup=J,this.sceneryGroup.add(this.campsiteGroup)}buildRailwayWaterTower(){let J=new N0;J.position.set(0.85,0.04,-1.35);let $=new J0({color:7877903,roughness:0.75}),Z=new J0({color:9584654,roughness:0.65}),Q=new J0({color:1976635,roughness:0.4,metalness:0.7}),W=new J0({color:11817737,roughness:0.6}),K=0.48,Y=0.04,X=0.22;[[-X,-X],[X,-X],[-X,X],[X,X]].forEach(([M,A])=>{let _=new b(new X0(Y,K,Y),$);_.position.set(M,K*0.5,A),_.castShadow=!0,J.add(_)});let q=new b(new X0(X*2+0.12,0.04,X*2+0.12),$);q.position.y=K,q.castShadow=!0,J.add(q);let H=0.42,U=0.28,G=new b(new k0(U,U,H,16),Z);G.position.y=K+H*0.5+0.02,G.castShadow=!0,J.add(G),[-0.14,0,0.14].forEach((M)=>{let A=new b(new dJ(U+0.006,0.009,6,20),Q);A.rotation.x=Math.PI*0.5,A.position.y=G.position.y+M,J.add(A)});let F=new b(new G9(U+0.06,0.22,16),W);F.position.y=G.position.y+H*0.5+0.11,F.castShadow=!0,J.add(F);let D=new b(new D9(0.03,8,8),Q);D.position.y=F.position.y+0.13,J.add(D);let O=new N0;O.position.set(0,K+0.24,U+0.02),O.rotation.y=Math.PI*0.5,O.rotation.x=0.25;let E=new J0({color:3359061,roughness:0.5,metalness:0.4}),V=new b(new k0(0.035,0.055,0.32,12),E);V.rotation.x=Math.PI*0.5,V.position.z=0.16,O.add(V);let R=new b(new D9(0.04,8,8),Q);R.position.set(0,0.12,0.05),O.add(R),J.add(O),this.waterTowerSpout=O;let N=35,B=new R9,I=new Float32Array(N*3);for(let M=0;M<N;M++)I[M*3]=(Math.random()-0.5)*0.06,I[M*3+1]=-Math.random()*0.35,I[M*3+2]=0.3+(Math.random()-0.5)*0.06;B.setAttribute("position",new y9(I,3));let L=new X7({color:3718648,size:0.035,transparent:!0,opacity:0.75});this.waterSprayPoints=new g7(B,L),this.waterSprayPoints.position.copy(O.position),this.waterSprayPoints.visible=!1,J.add(this.waterSprayPoints),this.waterTowerGroup=J,this.sceneryGroup.add(this.waterTowerGroup)}buildHotAirBalloon(){let J=new N0;J.position.set(1.9,2.45,-1.1);let $=new J0({color:14753096,roughness:0.45}),Z=new J0({color:16498468,roughness:0.45}),Q=new J0({color:889992,roughness:0.45}),W=new D9(0.42,24,16,0,Math.PI*2,0,Math.PI*0.65),K=new b(W,$);J.add(K);let Y=new dJ(0.4,0.03,8,24),X=new b(Y,Z);X.rotation.x=Math.PI*0.5,X.position.y=-0.05,J.add(X);let q=new k0(0.39,0.16,0.34,24,1,!0),H=new b(q,Q);H.position.y=-0.22,J.add(H);let U=new J0({color:4674921,metalness:0.8,roughness:0.3}),G=new b(new dJ(0.08,0.015,6,16),U);G.rotation.x=Math.PI*0.5,G.position.y=-0.42,J.add(G);let F=new k9({color:16347926}),D=new b(new G9(0.06,0.14,8),F);D.position.y=-0.4,J.add(D),this.balloonBurnerFlame=D,this.balloonBurnerLight=new f9(16347926,0.5,2.2),this.balloonBurnerLight.position.y=-0.4,J.add(this.balloonBurnerLight);let O=new v7({color:7877903}),E=[new T(-0.15,-0.38,-0.15),new T(-0.08,-0.62,-0.08),new T(0.15,-0.38,-0.15),new T(0.08,-0.62,-0.08),new T(-0.15,-0.38,0.15),new T(-0.08,-0.62,0.08),new T(0.15,-0.38,0.15),new T(0.08,-0.62,0.08)],V=new R9().setFromPoints(E),R=new o$(V,O);J.add(R);let N=new J0({color:14251782,roughness:0.85}),B=new b(new X0(0.18,0.14,0.18),N);B.position.y=-0.69,B.castShadow=!0,J.add(B),this.hotAirBalloonGroup=J,this.celestialGroup.add(this.hotAirBalloonGroup)}buildVillageBelfry(){let J=new N0;J.position.set(1.95,0.04,-0.65);let $=this.createStoneBrickTexture(),Z=new J0({color:14870768,map:$,roughness:0.7}),Q=new J0({color:7877903,roughness:0.8}),W=new J0({color:1013358,roughness:0.45,metalness:0.25}),K=new J0({color:14251782,roughness:0.25,metalness:0.85}),Y=0.46,X=0.26,q=new b(new X0(X,Y,X),Z);q.position.y=Y*0.5,q.castShadow=!0,q.receiveShadow=!0,J.add(q);let H=0.22,U=0.05,G=X*0.5-U*0.5;[[-G,-G],[G,-G],[-G,G],[G,G]].forEach(([I,L])=>{let M=new b(new X0(U,H,U),Z);M.position.set(I,Y+H*0.5,L),M.castShadow=!0,J.add(M)});let F=new N0;F.position.set(0,Y+H*0.75,0);let D=new b(new X0(X-0.04,0.025,0.025),Q);F.add(D);let O=new b(new k0(0.028,0.07,0.09,14),K);O.position.y=-0.05,F.add(O);let E=new b(new D9(0.016,8,8),K);E.position.y=-0.1,F.add(E),J.add(F),this.belfryBell=F;let V=0.36,R=new b(new G9(X*0.75,V,4),W);R.rotation.y=Math.PI*0.25,R.position.y=Y+H+V*0.5,R.castShadow=!0,J.add(R);let N=new b(new X0(0.016,0.09,0.016),K);N.position.y=R.position.y+V*0.5+0.045,J.add(N);let B=new b(new X0(0.05,0.016,0.016),K);B.position.y=N.position.y+0.01,J.add(B),this.belfryGroup=J,this.sceneryGroup.add(this.belfryGroup)}setupWeatherSystem(){this.rainPositions=new Float32Array(this.rainCount*6),this.rainGeo=new R9;let J=0.18;for(let W=0;W<this.rainCount;W++){let K=(Math.random()-0.5)*5.5,Y=Math.random()*3.5,X=(Math.random()-0.5)*4.5;this.rainPositions[W*6]=K,this.rainPositions[W*6+1]=Y,this.rainPositions[W*6+2]=X,this.rainPositions[W*6+3]=K-0.02,this.rainPositions[W*6+4]=Y-J,this.rainPositions[W*6+5]=X-0.01}this.rainGeo.setAttribute("position",new y9(this.rainPositions,3));let $=new v7({color:9684477,transparent:!0,opacity:0});this.rainStreaks=new o$(this.rainGeo,$),this.weatherGroup.add(this.rainStreaks);let Z=new k9({color:12248829,transparent:!0,opacity:0,side:$8}),Q=new m7(0.01,0.02,12);Q.rotateX(-Math.PI*0.5);for(let W=0;W<20;W++){let K=new b(Q,Z.clone());K.position.set(0,-10,0),this.weatherGroup.add(K),this.splashRipples.push({mesh:K,life:0,maxRadius:0.12})}}setWeather(J){if(this.isRaining=J==="rain",this.rainStreaks){let $=this.isRaining?0.65:0;t0.to(this.rainStreaks.material,{opacity:$,duration:0.8})}this.audio.setRain(this.isRaining)}triggerSplash(J,$,Z){let Q=this.splashRipples.find((W)=>W.life<=0);if(!Q)return;Q.mesh.position.set(J,$+0.005,Z),Q.mesh.scale.setScalar(0.2),Q.mesh.material.opacity=0.6,Q.life=1}bindEvents(){window.addEventListener("resize",()=>{let J=this.container.clientWidth,$=this.container.clientHeight;if(J===0||$===0)return;this.camera.aspect=J/$,this.camera.updateProjectionMatrix(),this.renderer.setSize(J,$)}),this.container.addEventListener("pointerdown",(J)=>{let $=this.container.getBoundingClientRect();if(this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera),this.raycaster.intersectObjects([this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],!0).length>0){this.triggerWhistleHop();return}if(this.clockTowerGroup){if(this.raycaster.intersectObject(this.clockTowerGroup,!0).length>0){this.triggerClockBell();return}}let Q=this.raycaster.intersectObjects(this.interactiveTrees,!0);if(Q.length>0){let X=Q[0].object;while(X&&!this.interactiveTrees.includes(X))X=X.parent;if(X){this.triggerTreeWobble(X);return}}if(this.mooredBoat){if(this.raycaster.intersectObject(this.mooredBoat,!0).length>0){this.triggerBoatRock();return}}let W=this.raycaster.intersectObjects(this.interactiveSheep,!0);if(W.length>0){let X=W[0].object;while(X&&!this.interactiveSheep.includes(X))X=X.parent;if(X){this.triggerSheepHop(X);return}}if(this.raycaster.intersectObjects(this.viaductLanterns,!0).length>0){this.triggerLanternSpark();return}let Y=this.raycaster.intersectObjects(this.interactivePoles,!0);if(Y.length>0){let X=Y[0].object;while(X&&!this.interactivePoles.includes(X))X=X.parent;if(X){this.triggerTelegraphPing(X);return}}if(this.windmillGroup){if(this.raycaster.intersectObject(this.windmillGroup,!0).length>0){this.triggerWindmillSpin();return}}if(this.watermillGroup){if(this.raycaster.intersectObject(this.watermillGroup,!0).length>0){this.triggerWaterwheelSpin();return}}if(this.semaphoreGroup){if(this.raycaster.intersectObject(this.semaphoreGroup,!0).length>0){this.triggerSemaphoreToggle();return}}if(this.cottageGroup){if(this.raycaster.intersectObject(this.cottageGroup,!0).length>0){this.triggerCottageChimney();return}}if(this.campsiteGroup){if(this.raycaster.intersectObject(this.campsiteGroup,!0).length>0){this.triggerCampfirePop();return}}if(this.waterTowerGroup){if(this.raycaster.intersectObject(this.waterTowerGroup,!0).length>0){this.triggerWaterTowerSpray();return}}if(this.hotAirBalloonGroup){if(this.raycaster.intersectObject(this.hotAirBalloonGroup,!0).length>0){this.triggerBalloonBurner();return}}if(this.belfryGroup){if(this.raycaster.intersectObject(this.belfryGroup,!0).length>0){this.triggerBelfryChime();return}}if(this.waterMesh){let X=this.raycaster.intersectObject(this.waterMesh,!0);if(X.length>0){let q=X[0].point;this.triggerSplash(q.x,q.y,q.z),this.audio.playWaterDrop()}}}),this.controls.addEventListener("start",()=>{if(this.currentViewMode==="cinematic"||this.currentViewMode==="director")this.currentViewMode="orbit",this.updateActiveViewPill("orbit")}),this.container.addEventListener("pointermove",(J)=>{let $=this.container.getBoundingClientRect();this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera);let Z=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar,...this.clockTowerGroup?[this.clockTowerGroup]:[],...this.interactiveTrees,...this.mooredBoat?[this.mooredBoat]:[],...this.interactiveSheep,...this.viaductLanterns,...this.windmillGroup?[this.windmillGroup]:[],...this.watermillGroup?[this.watermillGroup]:[],...this.cottageGroup?[this.cottageGroup]:[],...this.semaphoreGroup?[this.semaphoreGroup]:[],...this.campsiteGroup?[this.campsiteGroup]:[],...this.waterTowerGroup?[this.waterTowerGroup]:[],...this.hotAirBalloonGroup?[this.hotAirBalloonGroup]:[],...this.belfryGroup?[this.belfryGroup]:[]];if(this.raycaster.intersectObjects(Z,!0).length>0)this.container.style.cursor="pointer";else{if(this.waterMesh){let W=this.raycaster.intersectObject(this.waterMesh,!0);if(W.length>0){this.container.style.cursor="cell";let K=performance.now();if(K-this.lastHoverRippleTime>160){this.lastHoverRippleTime=K;let Y=W[0].point;this.triggerSplash(Y.x,0.034,Y.z)}return}}this.container.style.cursor="grab"}}),window.addEventListener("keydown",(J)=>{if(J.target instanceof HTMLInputElement||J.target instanceof HTMLTextAreaElement)return;if(J.code==="Space")J.preventDefault(),this.triggerWhistleHop();else if(J.code==="KeyR"){let $=!this.isRaining;this.setWeather($?"rain":"fair"),document.querySelectorAll("[data-weather]").forEach((Z)=>{Z.classList.toggle("active",Z.getAttribute("data-weather")===($?"rain":"fair"))})}else if(J.code==="KeyT")if(document.documentElement.getAttribute("data-theme")!=="dark")document.documentElement.setAttribute("data-theme","dark"),this.audio.playChime(523.25,0.08),this.setNightMode(!0);else document.documentElement.removeAttribute("data-theme"),this.audio.playMorningBirdSong(),this.setNightMode(!1);else if(J.code==="Digit1")this.setViewMode("isometric"),this.updateActiveViewPill("isometric");else if(J.code==="Digit2")this.setViewMode("top"),this.updateActiveViewPill("top");else if(J.code==="Digit3")this.setViewMode("orbit"),this.updateActiveViewPill("orbit");else if(J.code==="Digit4")this.setViewMode("cinematic"),this.updateActiveViewPill("cinematic");else if(J.code==="Digit5")this.setViewMode("director"),this.updateActiveViewPill("director");else if(J.code==="ArrowUp")this.setSpeed(Math.min(3.6,this.speedMultiplier+0.5));else if(J.code==="ArrowDown")this.setSpeed(Math.max(0.5,this.speedMultiplier-0.5))})}updateActiveViewPill(J){document.querySelectorAll("[data-view]").forEach(($)=>{$.classList.toggle("active",$.getAttribute("data-view")===J)})}triggerBoatRock(){if(!this.mooredBoat)return;this.audio.playBoatSlosh(),t0.killTweensOf(this.mooredBoat.rotation),t0.to(this.mooredBoat.rotation,{z:0.18,duration:0.22,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{if(this.mooredBoat)t0.to(this.mooredBoat.rotation,{z:0,duration:0.3})}});let J=this.mooredBoat.position;this.triggerSplash(J.x,0.034,J.z)}triggerSheepHop(J){this.audio.playSheepBleat(),t0.to(J.position,{y:0.14,duration:0.18,yoyo:!0,repeat:1,ease:"power2.out",onComplete:()=>{J.position.y=0.04}}),t0.to(J.rotation,{y:"+=0.6",duration:0.18,yoyo:!0,repeat:1,ease:"sine.inOut"})}triggerCampfirePop(){if(this.audio.playCampfirePop(),this.campfireLight){let J=this.campfireLight.intensity;t0.to(this.campfireLight,{intensity:3.6,duration:0.12,yoyo:!0,repeat:3,ease:"power1.inOut",onComplete:()=>{if(this.campfireLight)this.campfireLight.intensity=J}})}if(this.campfireFlame)t0.to(this.campfireFlame.scale,{x:1.5,y:1.8,z:1.5,duration:0.2,yoyo:!0,repeat:1,ease:"power2.out"})}triggerWaterTowerSpray(){if(this.isWaterTowerSpraying||!this.waterTowerSpout)return;this.isWaterTowerSpraying=!0,this.audio.playWaterTowerSpray(),t0.to(this.waterTowerSpout.rotation,{x:0.82,duration:0.35,ease:"back.out(1.4)",onComplete:()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!0;setTimeout(()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!1;if(this.waterTowerSpout)t0.to(this.waterTowerSpout.rotation,{x:0.25,duration:0.45,ease:"bounce.out",onComplete:()=>{this.isWaterTowerSpraying=!1}})},500)}})}triggerBalloonBurner(){if(this.audio.playBalloonBurner(),this.balloonBurnerLight)t0.to(this.balloonBurnerLight,{intensity:3.2,duration:0.2,yoyo:!0,repeat:1});if(this.balloonBurnerFlame)t0.to(this.balloonBurnerFlame.scale,{x:2.2,y:2.5,z:2.2,duration:0.2,yoyo:!0,repeat:1});if(this.hotAirBalloonGroup)t0.to(this.hotAirBalloonGroup.position,{y:"+=0.28",duration:0.45,yoyo:!0,repeat:1,ease:"power1.out"})}triggerBelfryChime(){if(this.audio.playCathedralChime(),this.belfryBell)t0.killTweensOf(this.belfryBell.rotation),this.belfryBell.rotation.z=0,t0.to(this.belfryBell.rotation,{z:0.48,duration:0.22,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>{if(this.belfryBell)this.belfryBell.rotation.z=0}})}triggerLanternSpark(){this.audio.playLanternSpark(),this.viaductLanternLights.forEach((J)=>{let $=J.intensity;t0.to(J,{intensity:3.5,duration:0.1,yoyo:!0,repeat:1,onComplete:()=>{J.intensity=$}})})}triggerWhistleHop(){this.audio.playWhistle(),[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar].forEach(($,Z)=>{t0.to($.position,{y:"+=0.16",duration:0.16,delay:Z*0.04,yoyo:!0,repeat:1,ease:"power2.out"}),t0.to($.scale,{y:1.18,x:0.92,z:0.92,duration:0.16,delay:Z*0.04,yoyo:!0,repeat:1,ease:"power2.out"})});for(let $=0;$<5;$++)setTimeout(()=>this.spawnSteamPuff(1.4),$*50)}triggerClockBell(){if(this.audio.playBoardingBell(),setTimeout(()=>this.audio.playStationClock(),200),this.clockTowerGroup)t0.to(this.clockTowerGroup.scale,{y:1.15,x:0.92,z:0.92,duration:0.15,yoyo:!0,repeat:1,ease:"power2.out"});if(this.clockHand)t0.to(this.clockHand.rotation,{z:"-="+Math.PI*4,duration:0.8,ease:"power2.out"})}triggerTelegraphPing(J){this.audio.playTelegraphPing(),t0.to(J.rotation,{z:0.12,duration:0.1,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{t0.to(J.rotation,{z:0,duration:0.15})}})}triggerTreeWobble(J){this.audio.playRustle(),t0.to(J.rotation,{z:0.16,duration:0.12,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{t0.to(J.rotation,{z:0,duration:0.2})}})}spawnSteamPuff(J=1){let $=this.steamParticles.find((W)=>W.life<=0);if(!$)return;let Z=new T(0.13,0.26,0);this.locoCar.localToWorld(Z),this.rootGroup.worldToLocal(Z),$.mesh.position.copy(Z),$.mesh.scale.setScalar(0.7*J),$.mesh.visible=!0,$.life=1,$.vx=(Math.random()-0.5)*0.005,$.vy=0.012+Math.random()*0.008,$.vz=(Math.random()-0.5)*0.005;let Q=this.isTrainInTunnel();this.audio.playSteamChuff(Q)}isTrainInTunnel(){let J=(this.progress+1)%1;return J<0.045||J>0.955}setSpeed(J){if(this.speedMultiplier=J,this.audio.playSpeedWhoosh(J),J>=3)this.triggerWhistleHop()}setViewMode(J){if(this.currentViewMode=J,this.controls.enabled=J!=="cinematic"&&J!=="director",J==="top")this.controls.autoRotate=!1,t0.to(this.controls.target,{x:0,y:0,z:0,duration:0.85,ease:"power2.inOut"}),t0.to(this.camera.position,{x:0.01,y:6.2,z:0.01,duration:0.85,ease:"power2.inOut",onUpdate:()=>{this.controls.update()}});else if(J==="isometric")this.controls.autoRotate=!1,t0.to(this.controls.target,{x:0,y:0.15,z:0,duration:0.85,ease:"power2.inOut"}),t0.to(this.camera.position,{x:3.8,y:2.85,z:3.8,duration:0.85,ease:"power2.inOut",onUpdate:()=>{this.controls.update()}});else if(J==="orbit")this.controls.autoRotate=!0,this.controls.autoRotateSpeed=1.2,t0.to(this.controls.target,{x:0,y:0.15,z:0,duration:0.6});else if(J==="cinematic")this.controls.autoRotate=!1;else if(J==="director")this.controls.autoRotate=!1,this.directorShotIndex=0,this.directorTimer=0,this.directorNeedsCut=!0}setNightMode(J,$=!1){if(this.isNightMode=J,$){if(J){if(this.ambientLight)this.ambientLight.color.set(1976635),this.ambientLight.intensity=0.65;if(this.hemiLight)this.hemiLight.color.set(988970),this.hemiLight.groundColor.set(132631),this.hemiLight.intensity=0.35;if(this.sunLight)this.sunLight.position.set(6.5,0.25,1.8),this.sunLight.color.set(3718648),this.sunLight.intensity=0.15;if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),this.sunMesh.scale.setScalar(0.001),this.sunCorona)this.sunCorona.material.opacity=0}if(this.moonLight)this.moonLight.intensity=1.45;if(this.moonMesh){if(this.moonMesh.position.set(-2,1.45,-0.8),this.moonMesh.scale.set(1,1,1),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0.85}if(this.starsPoints)this.starsPoints.material.opacity=0.85;if(this.headlampLight)this.headlampLight.intensity=1.8;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.2;if(this.headlampBeam)this.headlampBeam.visible=!0,this.headlampBeam.material.opacity=0.32;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,this.headlampCoreBeam.material.opacity=0.38;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,this.headlampTrackPool.material.opacity=0.45;if(this.coachWindowMat)this.coachWindowMat.emissive.set(16498468),this.coachWindowMat.emissiveIntensity=1.8;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=1.2;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=1.2;if(this.tailLight)this.tailLight.intensity=1.8;if(this.lanternLight)this.lanternLight.intensity=2.2;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Q)=>Q.intensity=1.4);if(this.tunnelLight)this.tunnelLight.intensity=0.9;if(this.windmillLight)this.windmillLight.intensity=0.85;if(this.watermillLight)this.watermillLight.intensity=0.85;if(this.cottageLight)this.cottageLight.intensity=1.1;this.fireflies.forEach((Q)=>{Q.mesh.visible=!0,Q.mesh.material.opacity=0.85}),this.audio.setNightAmbience(!0)}else{if(this.ambientLight)this.ambientLight.color.set(16777215),this.ambientLight.intensity=2.1;if(this.hemiLight)this.hemiLight.color.set(16776171),this.hemiLight.groundColor.set(14870768),this.hemiLight.intensity=1.2;if(this.sunLight)this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.color.set(16776171),this.sunLight.intensity=2.6;if(this.sunMesh){if(this.sunMesh.position.set(2.8,2.3,-1.6),this.sunMesh.scale.set(1,1,1),this.sunCorona)this.sunCorona.material.opacity=0.85}if(this.moonLight)this.moonLight.intensity=0;if(this.moonMesh){if(this.moonMesh.position.set(-2,-0.7,-0.8),this.moonMesh.scale.setScalar(0.001),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0}if(this.starsPoints)this.starsPoints.material.opacity=0;if(this.headlampLight)this.headlampLight.intensity=0.6;if(this.headlampSpotLight)this.headlampSpotLight.intensity=0;if(this.headlampBeam)this.headlampBeam.visible=!1,this.headlampBeam.material.opacity=0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1,this.headlampCoreBeam.material.opacity=0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1,this.headlampTrackPool.material.opacity=0;if(this.coachWindowMat)this.coachWindowMat.emissive.set(0),this.coachWindowMat.emissiveIntensity=0;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=0;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=0;if(this.tailLight)this.tailLight.intensity=0.8;if(this.lanternLight)this.lanternLight.intensity=0.8;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Q)=>Q.intensity=0);if(this.tunnelLight)this.tunnelLight.intensity=0.2;if(this.windmillLight)this.windmillLight.intensity=0;if(this.watermillLight)this.watermillLight.intensity=0;if(this.cottageLight)this.cottageLight.intensity=0;this.fireflies.forEach((Q)=>{Q.mesh.visible=!1,Q.mesh.material.opacity=0}),this.audio.setNightAmbience(!1)}return}let Z=1.6;if(J){let Q=t0.timeline();if(this.sunLight){Q.to(this.sunLight.position,{x:6.5,y:0.25,z:1.8,duration:Z,ease:"power2.inOut"},0);let W={r:1,g:0.98,b:0.92};Q.to(W,{r:0.92,g:0.35,b:0.05,duration:Z*0.5,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(W.r,W.g,W.b)}},0),Q.to(W,{r:0.22,g:0.74,b:0.97,duration:Z*0.5,ease:"power1.in",onUpdate:()=>{this.sunLight.color.setRGB(W.r,W.g,W.b)}},Z*0.5),Q.to(this.sunLight,{intensity:0.15,duration:Z,ease:"power2.inOut"},0)}if(this.sunMesh){if(Q.to(this.sunMesh.position,{x:4.5,y:-0.8,z:2,duration:Z,ease:"power2.in"},0),Q.to(this.sunMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Z*0.8},Z*0.2),this.sunCorona)Q.to(this.sunCorona.material,{opacity:0,duration:Z*0.7},Z*0.2)}if(this.ambientLight){let W={r:1,g:1,b:1};Q.to(W,{r:0.98,g:0.57,b:0.24,duration:Z*0.45,onUpdate:()=>{this.ambientLight.color.setRGB(W.r,W.g,W.b)}},0),Q.to(W,{r:0.12,g:0.16,b:0.23,duration:Z*0.55,onUpdate:()=>{this.ambientLight.color.setRGB(W.r,W.g,W.b)}},Z*0.45),Q.to(this.ambientLight,{intensity:0.65,duration:Z},0)}if(this.hemiLight)Q.to(this.hemiLight,{intensity:0.35,duration:Z},0);if(this.moonMesh){if(this.moonMesh.position.set(-2,-0.7,-0.8),Q.to(this.moonMesh.position,{y:1.45,duration:Z,ease:"power2.out"},Z*0.2),Q.to(this.moonMesh.scale,{x:1,y:1,z:1,duration:Z,ease:"back.out(1.2)"},Z*0.2),this.moonMesh.children[0])Q.to(this.moonMesh.children[0].material,{opacity:0.85,duration:Z*0.8},Z*0.3)}if(this.moonLight)Q.to(this.moonLight,{intensity:1.45,duration:Z},Z*0.3);if(this.starsPoints)Q.to(this.starsPoints.material,{opacity:0.85,duration:Z*0.8},Z*0.3);if(this.headlampLight)Q.to(this.headlampLight,{intensity:1.8,duration:Z*0.7},Z*0.3);if(this.headlampSpotLight)Q.to(this.headlampSpotLight,{intensity:2.2,duration:Z*0.7},Z*0.3);if(this.headlampBeam)this.headlampBeam.visible=!0,Q.to(this.headlampBeam.material,{opacity:0.32,duration:Z*0.7},Z*0.3);if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,Q.to(this.headlampCoreBeam.material,{opacity:0.38,duration:Z*0.7},Z*0.3);if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,Q.to(this.headlampTrackPool.material,{opacity:0.45,duration:Z*0.7},Z*0.3);if(this.coachWindowMat)Q.to(this.coachWindowMat.emissive,{r:0.98,g:0.75,b:0.14,duration:Z*0.7},Z*0.3),Q.to(this.coachWindowMat,{emissiveIntensity:1.8,duration:Z*0.7},Z*0.3);if(this.coachInteriorLight1)Q.to(this.coachInteriorLight1,{intensity:1.2,duration:Z*0.7},Z*0.3);if(this.coachInteriorLight2)Q.to(this.coachInteriorLight2,{intensity:1.2,duration:Z*0.7},Z*0.3);if(this.tailLight)Q.to(this.tailLight,{intensity:1.8,duration:Z*0.7},Z*0.3);if(this.lanternLight)Q.to(this.lanternLight,{intensity:2.2,duration:Z*0.7},Z*0.3);if(this.viaductLanternLights.forEach((W)=>{Q.to(W,{intensity:1.4,duration:Z*0.7},Z*0.3)}),this.tunnelLight)Q.to(this.tunnelLight,{intensity:0.9,duration:Z*0.7},Z*0.3);if(this.windmillLight)Q.to(this.windmillLight,{intensity:0.85,duration:Z*0.7},Z*0.3);if(this.watermillLight)Q.to(this.watermillLight,{intensity:0.85,duration:Z*0.7},Z*0.3);if(this.cottageLight)Q.to(this.cottageLight,{intensity:1.1,duration:Z*0.7},Z*0.3);this.fireflies.forEach((W)=>{W.mesh.visible=!0,Q.to(W.mesh.material,{opacity:0.85,duration:Z*0.7},Z*0.3)}),this.audio.setNightAmbience(!0)}else{let Q=t0.timeline();if(this.moonMesh){if(Q.to(this.moonMesh.position,{y:-0.7,duration:Z*0.7,ease:"power2.in"},0),Q.to(this.moonMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Z*0.7},0),this.moonMesh.children[0])Q.to(this.moonMesh.children[0].material,{opacity:0,duration:Z*0.5},0)}if(this.moonLight)Q.to(this.moonLight,{intensity:0,duration:Z*0.6},0);if(this.starsPoints)Q.to(this.starsPoints.material,{opacity:0,duration:Z*0.6},0);if(this.headlampLight)Q.to(this.headlampLight,{intensity:0.6,duration:Z*0.6},0);if(this.headlampSpotLight)Q.to(this.headlampSpotLight,{intensity:0,duration:Z*0.6},0);if(this.headlampBeam)Q.to(this.headlampBeam.material,{opacity:0,duration:Z*0.5,onComplete:()=>{if(this.headlampBeam)this.headlampBeam.visible=!1}},0);if(this.headlampCoreBeam)Q.to(this.headlampCoreBeam.material,{opacity:0,duration:Z*0.5,onComplete:()=>{if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1}},0);if(this.headlampTrackPool)Q.to(this.headlampTrackPool.material,{opacity:0,duration:Z*0.5,onComplete:()=>{if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}},0);if(this.coachWindowMat)Q.to(this.coachWindowMat.emissive,{r:0,g:0,b:0,duration:Z*0.6},0),Q.to(this.coachWindowMat,{emissiveIntensity:0,duration:Z*0.6},0);if(this.coachInteriorLight1)Q.to(this.coachInteriorLight1,{intensity:0,duration:Z*0.6},0);if(this.coachInteriorLight2)Q.to(this.coachInteriorLight2,{intensity:0,duration:Z*0.6},0);if(this.tailLight)Q.to(this.tailLight,{intensity:0.8,duration:Z*0.6},0);if(this.lanternLight)Q.to(this.lanternLight,{intensity:0.8,duration:Z*0.6},0);if(this.viaductLanternLights.forEach((W)=>{Q.to(W,{intensity:0,duration:Z*0.5},0)}),this.tunnelLight)Q.to(this.tunnelLight,{intensity:0.2,duration:Z*0.5},0);if(this.windmillLight)Q.to(this.windmillLight,{intensity:0,duration:Z*0.5},0);if(this.watermillLight)Q.to(this.watermillLight,{intensity:0,duration:Z*0.5},0);if(this.cottageLight)Q.to(this.cottageLight,{intensity:0,duration:Z*0.5},0);if(this.fireflies.forEach((W)=>{Q.to(W.mesh.material,{opacity:0,duration:Z*0.5,onComplete:()=>{W.mesh.visible=!1}},0)}),this.audio.setNightAmbience(!1),this.sunLight){this.sunLight.position.set(6.5,0.25,1.8),Q.to(this.sunLight.position,{x:5.5,y:7.5,z:4.2,duration:Z,ease:"power2.out"},Z*0.15);let W={r:0.96,g:0.45,b:0.15};this.sunLight.color.setRGB(W.r,W.g,W.b),Q.to(W,{r:1,g:0.98,b:0.92,duration:Z*0.85,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(W.r,W.g,W.b)}},Z*0.15),Q.to(this.sunLight,{intensity:2.6,duration:Z},Z*0.1)}if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),Q.to(this.sunMesh.position,{x:2.8,y:2.3,z:-1.6,duration:Z,ease:"power2.out"},Z*0.15),Q.to(this.sunMesh.scale,{x:1,y:1,z:1,duration:Z,ease:"back.out(1.2)"},Z*0.2),this.sunCorona)Q.to(this.sunCorona.material,{opacity:0.85,duration:Z*0.8},Z*0.25)}if(this.ambientLight){let W={r:0.12,g:0.16,b:0.23};Q.to(W,{r:0.99,g:0.9,b:0.65,duration:Z*0.4,onUpdate:()=>{this.ambientLight.color.setRGB(W.r,W.g,W.b)}},Z*0.1),Q.to(W,{r:1,g:1,b:1,duration:Z*0.5,onUpdate:()=>{this.ambientLight.color.setRGB(W.r,W.g,W.b)}},Z*0.5),Q.to(this.ambientLight,{intensity:2.1,duration:Z},Z*0.1)}if(this.hemiLight)Q.to(this.hemiLight,{intensity:1.2,duration:Z},Z*0.1)}}animate=()=>{if(this.isDestroyed)return;this.progress=(this.progress+this.trainSpeed*this.speedMultiplier)%1;let J=[0,-0.028,-0.056,-0.084],$=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],Z=new T(0,1,0);if($.forEach((W,K)=>{let Y=(this.progress+J[K]+1)%1,X=this.trackCurve.getPointAt(Y),q=this.trackCurve.getTangentAt(Y).normalize(),H=new T().crossVectors(q,Z).normalize(),U=new T().crossVectors(H,q).normalize(),G=new Y9().makeBasis(q,U,H);W.quaternion.setFromRotationMatrix(G),W.position.copy(X)}),this.rotatingWheels.forEach((W)=>{W.rotation.z-=0.08*this.speedMultiplier}),this.railClickAccumulator+=this.trainSpeed*this.speedMultiplier,this.railClickAccumulator>=0.034){this.railClickAccumulator=0;let W=this.isTrainInTunnel();this.audio.playRailClickClack(this.speedMultiplier,W)}if(this.steamTimer+=this.speedMultiplier,this.steamTimer>=28)this.steamTimer=0,this.spawnSteamPuff(1);if(this.steamParticles.forEach((W)=>{if(W.life>0)W.life-=0.024,W.mesh.position.x+=W.vx,W.mesh.position.y+=W.vy,W.mesh.position.z+=W.vz,W.mesh.scale.multiplyScalar(1.035),W.mesh.visible=!0,W.mesh.material.opacity=Math.max(0,W.life*0.75);else W.mesh.visible=!1,W.mesh.position.set(0,-100,0),W.mesh.material.opacity=0}),this.isRaining&&this.rainPositions&&this.rainGeo){for(let K=0;K<this.rainCount;K++)if(this.rainPositions[K*6+1]-=0.11,this.rainPositions[K*6+4]-=0.11,this.rainPositions[K*6+1]<0.02){let Y=(Math.random()-0.5)*5.2,X=3.2+Math.random()*0.5,q=(Math.random()-0.5)*4.2;this.triggerSplash(this.rainPositions[K*6],0.025,this.rainPositions[K*6+2]),this.rainPositions[K*6]=Y,this.rainPositions[K*6+1]=X,this.rainPositions[K*6+2]=q,this.rainPositions[K*6+3]=Y-0.02,this.rainPositions[K*6+4]=X-0.18,this.rainPositions[K*6+5]=q-0.01}this.rainGeo.attributes.position.needsUpdate=!0}this.splashRipples.forEach((W)=>{if(W.life>0){W.life-=0.045;let K=1-W.life;W.mesh.scale.setScalar(0.2+K*W.maxRadius*8),W.mesh.material.opacity=Math.max(0,W.life*0.5)}else W.mesh.material.opacity=0});let Q=Date.now()%800<400;if(this.crossingLamp1&&this.crossingLamp2&&this.crossingLight1&&this.crossingLight2){if(this.crossingLamp1.visible=Q,this.crossingLight1.intensity=Q?0.9:0,this.crossingLight2.visible=!Q,this.crossingLight2.intensity=!Q?0.9:0,this.lastBlinkCycle!==Q){if(this.lastBlinkCycle=Q,Q){let W=this.locoCar.position;if(Math.hypot(W.x- -0.45,W.z-0.82)<0.95)this.audio.playCrossingBell()}}}if(this.clockHand)this.clockHand.rotation.z=-Date.now()*0.001;if(this.waterMesh)this.waterMesh.material.opacity=0.86+Math.sin(Date.now()*0.0018)*0.04;if(this.mooredBoat)this.mooredBoat.rotation.z=Math.sin(Date.now()*0.0015)*0.025,this.mooredBoat.position.y=0.038+Math.sin(Date.now()*0.0015)*0.0012;if(this.windmillSails){if(this.windmillSails.rotation.x-=this.windmillCurrentSpeed,this.windmillCurrentSpeed>this.windmillBaseSpeed)this.windmillCurrentSpeed=u$.lerp(this.windmillCurrentSpeed,this.windmillBaseSpeed,0.015)}if(this.waterwheel)this.waterwheel.rotation.x+=0.016*this.speedMultiplier;if(this.fireflies.length>0){let W=Date.now()*0.001;this.fireflies.forEach((K)=>{if(K.mesh.position.x=K.baseX+Math.sin(W*K.speed+K.phase)*K.radius,K.mesh.position.y=K.baseY+Math.sin(W*K.speed*1.6+K.phase)*0.035,K.mesh.position.z=K.baseZ+Math.cos(W*K.speed*1.1+K.phase)*K.radius,this.isNightMode){K.mesh.visible=!0;let Y=0.5+Math.sin(W*3.2+K.phase)*0.45;K.mesh.material.opacity=Y}else K.mesh.visible=!1,K.mesh.material.opacity=0})}if(this.campfireParticles&&this.campfireParticlePos){for(let W=0;W<20;W++)if(this.campfireParticlePos[W*3+1]+=0.0025,this.campfireParticlePos[W*3+1]>0.32)this.campfireParticlePos[W*3+1]=0.06,this.campfireParticlePos[W*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[W*3+2]=(Math.random()-0.5)*0.12;this.campfireParticles.geometry.attributes.position.needsUpdate=!0}if(this.hotAirBalloonGroup){let W=Date.now()*0.001;this.hotAirBalloonGroup.position.y=2.45+Math.sin(W*1.2)*0.08,this.hotAirBalloonGroup.rotation.z=Math.sin(W*0.8)*0.04}if(this.currentViewMode==="director"){let W=performance.now(),K=this.lastAnimTime?(W-this.lastAnimTime)*0.001:0.016;if(this.directorTimer+=K,this.directorTimer>=this.directorShotDuration)this.directorTimer=0,this.directorShotIndex=(this.directorShotIndex+1)%4,this.directorNeedsCut=!0;let Y=this.locoCar.position,X=this.trackCurve.getTangentAt(this.progress).normalize(),q,H;if(this.directorShotIndex===0)q=new T(1.15,0.4,1.15),H=Y.clone().add(new T(0,0.08,0));else if(this.directorShotIndex===1)q=Y.clone().sub(X.clone().multiplyScalar(0.72)).add(new T(0,0.38,0)),H=Y.clone().add(X.clone().multiplyScalar(0.75)).add(new T(0,0.12,0));else if(this.directorShotIndex===2)q=new T(-1.42,0.46,1.25),H=Y.clone().add(new T(0,0.08,0));else{let U=Date.now()*0.00028;q=new T(Math.cos(U)*3.4,2.95,Math.sin(U)*3.4),H=new T(0,0.25,0)}if(this.directorNeedsCut)this.camera.position.copy(q),this.camera.lookAt(H),this.controls.target.copy(H),this.directorNeedsCut=!1;else this.camera.position.lerp(q,0.08),this.camera.lookAt(H),this.controls.target.copy(H)}else if(this.currentViewMode==="cinematic"){let W=this.locoCar.position,K=this.trackCurve.getTangentAt(this.progress).normalize(),Y=W.clone().sub(K.clone().multiplyScalar(0.72)).add(new T(0,0.38,0)),X=W.clone().add(K.clone().multiplyScalar(0.75)).add(new T(0,0.12,0));this.camera.position.lerp(Y,0.08),this.camera.lookAt(X),this.controls.target.copy(X)}else this.controls.update();this.lastAnimTime=performance.now(),this.rootGroup.position.y=Math.sin(Date.now()*0.0012)*0.025,this.renderer.render(this.scene,this.camera),this.animFrameId=requestAnimationFrame(this.animate)};destroy(){this.isDestroyed=!0,cancelAnimationFrame(this.animFrameId),this.controls.dispose(),this.renderer.dispose()}}document.addEventListener("DOMContentLoaded",()=>{let J=new zZ;window.samtagonAudio=J;let $=null;try{$=new O5("three-viewport",J),window.samtagonStage=$}catch(Z){console.warn("Three.js stage init fallback:",Z)}vU($,J),console.log("Samtagon Studios online. Zen mode active.")});function vU(J,$){document.documentElement.removeAttribute("data-theme");let Z=!1;J?.setNightMode(!1,!0),document.getElementById("theme-toggle-btn")?.addEventListener("click",()=>{if(Z=!Z,Z)document.documentElement.setAttribute("data-theme","dark"),$.playChime(523.25,0.08),J?.setNightMode(!0);else document.documentElement.removeAttribute("data-theme"),$.playMorningBirdSong(),J?.setNightMode(!1)});let W=document.getElementById("audio-toggle-btn"),K=W?.querySelector(".audio-on-icon"),Y=W?.querySelector(".audio-off-icon"),X=(O)=>{if(K&&Y)K.style.display=O?"block":"none",Y.style.display=O?"none":"block"};W?.addEventListener("click",()=>{let O=$.toggleMute();X(O)}),window.addEventListener("keydown",(O)=>{if(O.code==="KeyM"){let E=$.toggleMute();X(E)}});let q=document.querySelectorAll("[data-view]");q.forEach((O)=>{O.addEventListener("click",()=>{q.forEach((V)=>V.classList.remove("active")),O.classList.add("active");let E=O.dataset.view;J?.setViewMode(E),$.playButtonPress()})});let H=document.querySelectorAll("[data-speed]");H.forEach((O)=>{O.addEventListener("click",()=>{H.forEach((V)=>V.classList.remove("active")),O.classList.add("active");let E=parseFloat(O.dataset.speed||"1");J?.setSpeed(E),$.playButtonPress()})});let U=document.querySelectorAll("[data-weather]");U.forEach((O)=>{O.addEventListener("click",()=>{U.forEach((V)=>V.classList.remove("active")),O.classList.add("active");let E=O.dataset.weather==="rain";J?.setWeather(E?"rain":"fair"),$.playButtonPress()})}),document.getElementById("whistle-btn")?.addEventListener("click",()=>{J?.triggerWhistleHop()}),document.getElementById("play-flagship-btn")?.addEventListener("click",()=>{$.playChime(660,0.1)}),document.querySelectorAll(".game-pill").forEach((O,E)=>{let V=[523.25,587.33,659.25,783.99,880,1046.5],R=V[E%V.length];O.addEventListener("mouseenter",()=>{$.playChime(R,0.04)}),O.addEventListener("click",()=>{$.playChime(R*1.5,0.08),J?.triggerWhistleHop()})}),document.querySelector(".zen-brand")?.addEventListener("click",()=>{$.playChime(880,0.12),J?.triggerWhistleHop()})}
