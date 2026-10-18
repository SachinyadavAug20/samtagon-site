class yZ{ctx=null;isMuted=!1;masterGain=null;constructor(){let J=()=>{this.initContext(),window.removeEventListener("pointerdown",J),window.removeEventListener("keydown",J),window.removeEventListener("click",J),window.removeEventListener("touchstart",J)};window.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("keydown",J,{passive:!0}),window.addEventListener("click",J,{passive:!0}),window.addEventListener("touchstart",J,{passive:!0})}initContext(){if(!this.ctx){let J=window.AudioContext||window.webkitAudioContext;this.ctx=new J,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.isMuted?0:0.48,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination)}if(this.ctx.state==="suspended")this.ctx.resume()}toggleMute(){if(this.initContext(),this.isMuted=!this.isMuted,this.masterGain&&this.ctx){let J=this.isMuted?0:0.48;this.masterGain.gain.setTargetAtTime(J,this.ctx.currentTime,0.05)}if(!this.isMuted)this.playChime(523.25,0.1),setTimeout(()=>this.playChime(659.25,0.15),100);return!this.isMuted}getStatus(){return!this.isMuted}playChime(J=880,$=0.12){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Z=this.ctx.createOscillator(),Q=this.ctx.createGain();Z.type="sine",Z.frequency.setValueAtTime(J,this.ctx.currentTime),Z.frequency.exponentialRampToValueAtTime(J*1.5,this.ctx.currentTime+$),Q.gain.setValueAtTime(0.25,this.ctx.currentTime),Q.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+$),Z.connect(Q),Q.connect(this.masterGain),Z.start(),Z.stop(this.ctx.currentTime+$)}catch{}}playVVVFWhine(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain();J.type="triangle";let Z=this.ctx.currentTime;J.frequency.setValueAtTime(220,Z),J.frequency.exponentialRampToValueAtTime(880,Z+0.35),$.gain.setValueAtTime(0.2,Z),$.gain.exponentialRampToValueAtTime(0.01,Z+0.4),J.connect($),$.connect(this.masterGain),J.start(Z),J.stop(Z+0.4)}catch{}}playSignalClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Z=this.ctx.currentTime;J.type="square",J.frequency.setValueAtTime(320,Z),J.frequency.setValueAtTime(160,Z+0.03),$.gain.setValueAtTime(0.15,Z),$.gain.exponentialRampToValueAtTime(0.001,Z+0.06),J.connect($),$.connect(this.masterGain),J.start(Z),J.stop(Z+0.06)}catch{}}playButtonPress(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Z=this.ctx.currentTime;J.type="sine",J.frequency.setValueAtTime(440,Z),J.frequency.exponentialRampToValueAtTime(880,Z+0.05),$.gain.setValueAtTime(0.18,Z),$.gain.exponentialRampToValueAtTime(0.001,Z+0.05),J.connect($),$.connect(this.masterGain),J.start(Z),J.stop(Z+0.05)}catch{}}playBoardingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createOscillator(),Z=this.ctx.createGain(),Q=this.ctx.currentTime;J.type="sine",$.type="triangle",J.frequency.setValueAtTime(1046.5,Q),$.frequency.setValueAtTime(1318.51,Q),Z.gain.setValueAtTime(0.2,Q),Z.gain.exponentialRampToValueAtTime(0.001,Q+0.2),J.connect(Z),$.connect(Z),Z.connect(this.masterGain),J.start(Q),$.start(Q),J.stop(Q+0.2),$.stop(Q+0.2)}catch{}}playWhistle(){if(this.initContext(),this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=[587.33,783.99,987.77,1174.66];[{time:J,dur:0.16},{time:J+0.2,dur:0.42}].forEach(({time:Q,dur:K})=>{$.forEach((W,Y)=>{if(!this.ctx||!this.masterGain)return;let X=this.ctx.createOscillator(),H=this.ctx.createGain();X.type=Y===0?"sine":Y===1?"triangle":"sawtooth",X.frequency.setValueAtTime(W*0.985,Q),X.frequency.linearRampToValueAtTime(W,Q+0.04),H.gain.setValueAtTime(0.001,Q),H.gain.linearRampToValueAtTime(0.32/$.length,Q+0.035),H.gain.exponentialRampToValueAtTime(0.001,Q+K),X.connect(H),H.connect(this.masterGain),X.start(Q),X.stop(Q+K+0.06)})})}catch{}}rainSource=null;rainGain=null;setRain(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{if(J){if(this.rainSource)return;let $=this.ctx.sampleRate*2,Z=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Q=Z.getChannelData(0),K=0,W=0,Y=0;for(let U=0;U<$;U++){let F=Math.random()*2-1;K=0.99886*K+F*0.0555179,W=0.99332*W+F*0.0750759,Y=0.969*Y+F*0.153852,Q[U]=(K+W+Y+F*0.5362)*0.04}let X=this.ctx.createBufferSource();X.buffer=Z,X.loop=!0;let H=this.ctx.createBiquadFilter();H.type="lowpass",H.frequency.setValueAtTime(950,this.ctx.currentTime);let q=this.ctx.createGain();q.gain.setValueAtTime(0.001,this.ctx.currentTime),q.gain.linearRampToValueAtTime(0.06,this.ctx.currentTime+1.2),X.connect(H),H.connect(q),q.connect(this.masterGain),X.start(),this.rainSource=X,this.rainGain=q}else if(this.rainSource&&this.rainGain){let $=this.ctx.currentTime;this.rainGain.gain.linearRampToValueAtTime(0.001,$+0.8),setTimeout(()=>{try{this.rainSource?.stop(),this.rainSource?.disconnect(),this.rainSource=null,this.rainGain=null}catch{}},850)}}catch{}}playRustle(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.12),Z.gain.setValueAtTime(0.09,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.12),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.12)}catch{}}playWaterDrop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1200+Math.random()*400,J),$.frequency.exponentialRampToValueAtTime(1800+Math.random()*400,J+0.08),Z.gain.setValueAtTime(0.08,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}playBoatSlosh(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(420,J),$.frequency.exponentialRampToValueAtTime(180,J+0.18),Z.gain.setValueAtTime(0.12,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.18),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.18),setTimeout(()=>this.playWaterDrop(),60)}catch{}}playSheepHop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(659.25,J),$.frequency.linearRampToValueAtTime(880,J+0.08),Z.gain.setValueAtTime(0.15,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playLanternSpark(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1760,J),$.frequency.exponentialRampToValueAtTime(2200,J+0.22),Z.gain.setValueAtTime(0.18,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.22),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.22)}catch{}}playRailClickClack(J=1,$=!1,Z=1,Q=0){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let K=this.ctx.currentTime,Y=Math.max(0.02,Math.min(0.65,($?0.22:0.14)*Z)),X=$?700:1600;this.synthesizeAxleClick(K,1080+Math.random()*80,Y,X,Q),this.synthesizeAxleClick(K+0.045,920+Math.random()*80,Y*0.8,X,Q)}catch{}}synthesizeAxleClick(J,$,Z,Q,K=0){if(!this.ctx||!this.masterGain)return;let W=this.ctx.createOscillator(),Y=this.ctx.createGain(),X=this.ctx.createBiquadFilter();if(X.type="bandpass",X.frequency.setValueAtTime(Q,J),X.Q.setValueAtTime(3.2,J),W.type="triangle",W.frequency.setValueAtTime($,J),W.frequency.exponentialRampToValueAtTime(140,J+0.038),Y.gain.setValueAtTime(Z,J),Y.gain.exponentialRampToValueAtTime(0.001,J+0.038),W.connect(X),X.connect(Y),this.ctx.createStereoPanner){let H=this.ctx.createStereoPanner();H.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,K)),J),Y.connect(H),H.connect(this.masterGain)}else Y.connect(this.masterGain);W.start(J),W.stop(J+0.04)}playSteamChuff(J=!1,$=1,Z=0){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Q=this.ctx.currentTime,K=0.085,W=Math.floor(this.ctx.sampleRate*0.085),Y=this.ctx.createBuffer(1,W,this.ctx.sampleRate),X=Y.getChannelData(0);for(let V=0;V<W;V++)X[V]=(Math.random()*2-1)*Math.exp(-V/(W*0.32));let H=this.ctx.createBufferSource();H.buffer=Y;let q=this.ctx.createBiquadFilter();q.type="lowpass",q.frequency.setValueAtTime(J?380:720,Q);let U=J?0.2:0.12,F=this.ctx.createGain();if(F.gain.setValueAtTime(Math.max(0.02,Math.min(0.55,U*$)),Q),F.gain.exponentialRampToValueAtTime(0.001,Q+0.085),H.connect(q),q.connect(F),this.ctx.createStereoPanner){let V=this.ctx.createStereoPanner();V.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,Z)),Q),F.connect(V),V.connect(this.masterGain)}else F.connect(this.masterGain);H.start(Q)}catch{}}playCrossingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1480,J),$.frequency.exponentialRampToValueAtTime(1470,J+0.16),Z.gain.setValueAtTime(0.08,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.16),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.16)}catch{}}playStationClock(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[440,554.37,659.25].forEach(($,Z)=>{if(!this.ctx||!this.masterGain)return;let Q=this.ctx.createOscillator(),K=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime($,J+Z*0.12),K.gain.setValueAtTime(0.12,J+Z*0.12),K.gain.exponentialRampToValueAtTime(0.001,J+Z*0.12+0.55),Q.connect(K),K.connect(this.masterGain),Q.start(J+Z*0.12),Q.stop(J+Z*0.12+0.6)})}catch{}}playTelegraphPing(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(880,J),$.frequency.exponentialRampToValueAtTime(440,J+0.14),Z.gain.setValueAtTime(0.07,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playSpeedWhoosh(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.currentTime,Z=this.ctx.createOscillator(),Q=this.ctx.createGain();Z.type="sine",Z.frequency.setValueAtTime(220,$),Z.frequency.exponentialRampToValueAtTime(220*J,$+0.28),Q.gain.setValueAtTime(0.11,$),Q.gain.exponentialRampToValueAtTime(0.001,$+0.28),Z.connect(Q),Q.connect(this.masterGain),Z.start($),Z.stop($+0.3)}catch{}}playWindmillSpin(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[180,240,360].forEach(($,Z)=>{if(!this.ctx||!this.masterGain)return;let Q=this.ctx.createOscillator(),K=this.ctx.createGain();Q.type="triangle",Q.frequency.setValueAtTime($,J+Z*0.05),Q.frequency.exponentialRampToValueAtTime($*1.25,J+Z*0.05+0.22),K.gain.setValueAtTime(0.08,J+Z*0.05),K.gain.exponentialRampToValueAtTime(0.001,J+Z*0.05+0.25),Q.connect(K),K.connect(this.masterGain),Q.start(J+Z*0.05),Q.stop(J+Z*0.05+0.28)})}catch{}}playWaterwheel(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.15),Z.gain.setValueAtTime(0.09,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.15),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.16),setTimeout(()=>this.playWaterDrop(),50)}catch{}}playSwitchClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(260,J),$.frequency.setValueAtTime(120,J+0.04),Z.gain.setValueAtTime(0.12,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}cricketTimer=null;setNightAmbience(J){if(this.cricketTimer)clearInterval(this.cricketTimer),this.cricketTimer=null;if(!J||this.isMuted||!this.ctx)return;let $=()=>{if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Z=this.ctx.currentTime,Q=2+Math.floor(Math.random()*2);for(let K=0;K<Q;K++){let W=Z+K*0.06,Y=this.ctx.createOscillator(),X=this.ctx.createGain();Y.type="sine",Y.frequency.setValueAtTime(4600+Math.random()*200,W),X.gain.setValueAtTime(0.018,W),X.gain.exponentialRampToValueAtTime(0.0001,W+0.035),Y.connect(X),X.connect(this.masterGain),Y.start(W),Y.stop(W+0.04)}}catch{}};$(),this.cricketTimer=window.setInterval($,3200)}playCampfirePop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;for(let $=0;$<3;$++){let Z=J+$*0.05+Math.random()*0.03,Q=this.ctx.createOscillator(),K=this.ctx.createGain();Q.type="triangle",Q.frequency.setValueAtTime(1400+Math.random()*800,Z),Q.frequency.exponentialRampToValueAtTime(120,Z+0.03),K.gain.setValueAtTime(0.06,Z),K.gain.exponentialRampToValueAtTime(0.001,Z+0.035),Q.connect(K),K.connect(this.masterGain),Q.start(Z),Q.stop(Z+0.04)}}catch{}}playWaterTowerSpray(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(180,J),$.frequency.exponentialRampToValueAtTime(60,J+0.12),Z.gain.setValueAtTime(0.14,J),Z.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Z),Z.connect(this.masterGain),$.start(J),$.stop(J+0.15);let Q=this.ctx.sampleRate*0.35,K=this.ctx.createBuffer(1,Q,this.ctx.sampleRate),W=K.getChannelData(0);for(let q=0;q<Q;q++)W[q]=Math.random()*2-1;let Y=this.ctx.createBufferSource();Y.buffer=K;let X=this.ctx.createBiquadFilter();X.type="bandpass",X.frequency.setValueAtTime(900,J+0.05),X.Q.value=1.2;let H=this.ctx.createGain();H.gain.setValueAtTime(0.001,J+0.05),H.gain.linearRampToValueAtTime(0.12,J+0.12),H.gain.exponentialRampToValueAtTime(0.001,J+0.4),Y.connect(X),X.connect(H),H.connect(this.masterGain),Y.start(J+0.05),Y.stop(J+0.42)}catch{}}playSheepBleat(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Z=this.ctx.createGain(),Q=this.ctx.createOscillator(),K=this.ctx.createGain();Q.frequency.value=11,K.gain.value=24,Q.connect($.frequency),$.type="sawtooth",$.frequency.setValueAtTime(290,J),$.frequency.exponentialRampToValueAtTime(240,J+0.28);let W=this.ctx.createBiquadFilter();W.type="lowpass",W.frequency.value=850,Z.gain.setValueAtTime(0.001,J),Z.gain.linearRampToValueAtTime(0.09,J+0.04),Z.gain.exponentialRampToValueAtTime(0.001,J+0.32),$.connect(W),W.connect(Z),Z.connect(this.masterGain),Q.start(J),$.start(J),Q.stop(J+0.33),$.stop(J+0.33)}catch{}}playBalloonBurner(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.sampleRate*0.45,Z=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Q=Z.getChannelData(0);for(let X=0;X<$;X++)Q[X]=Math.random()*2-1;let K=this.ctx.createBufferSource();K.buffer=Z;let W=this.ctx.createBiquadFilter();W.type="lowpass",W.frequency.setValueAtTime(320,J),W.frequency.linearRampToValueAtTime(650,J+0.2),W.frequency.exponentialRampToValueAtTime(220,J+0.45);let Y=this.ctx.createGain();Y.gain.setValueAtTime(0.01,J),Y.gain.linearRampToValueAtTime(0.12,J+0.15),Y.gain.exponentialRampToValueAtTime(0.001,J+0.45),K.connect(W),W.connect(Y),Y.connect(this.masterGain),K.start(J),K.stop(J+0.46)}catch{}}playCathedralChime(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[{f:440,a:0.14,d:1.4},{f:523.25,a:0.1,d:1.1},{f:659.25,a:0.08,d:0.8},{f:880,a:0.05,d:0.5}].forEach(({f:Z,a:Q,d:K})=>{if(!this.ctx||!this.masterGain)return;let W=this.ctx.createOscillator(),Y=this.ctx.createGain();W.type="sine",W.frequency.setValueAtTime(Z,J),Y.gain.setValueAtTime(Q,J),Y.gain.exponentialRampToValueAtTime(0.0005,J+K),W.connect(Y),Y.connect(this.masterGain),W.start(J),W.stop(J+K)})}catch{}}playMorningBirdSong(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[2800,3400,4200].forEach((Z,Q)=>{if(!this.ctx||!this.masterGain)return;let K=J+Q*0.11,W=this.ctx.createOscillator(),Y=this.ctx.createGain();W.type="sine",W.frequency.setValueAtTime(Z,K),W.frequency.exponentialRampToValueAtTime(Z*1.3,K+0.08),Y.gain.setValueAtTime(0.04,K),Y.gain.exponentialRampToValueAtTime(0.001,K+0.09),W.connect(Y),Y.connect(this.masterGain),W.start(K),W.stop(K+0.1)})}catch{}}}var IJ={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},LJ={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3};var l6=2;var c6=1,m9=2;var X7=2;var n6=4;var l7=1000;class u9{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Z=this._listeners;if(Z[J]===void 0)Z[J]=[];if(Z[J].indexOf($)===-1)Z[J].push($)}hasEventListener(J,$){if(this._listeners===void 0)return!1;let Z=this._listeners;return Z[J]!==void 0&&Z[J].indexOf($)!==-1}removeEventListener(J,$){if(this._listeners===void 0)return;let Q=this._listeners[J];if(Q!==void 0){let K=Q.indexOf($);if(K!==-1)Q.splice(K,1)}}dispatchEvent(J){if(this._listeners===void 0)return;let Z=this._listeners[J.type];if(Z!==void 0){J.target=this;let Q=Z.slice(0);for(let K=0,W=Q.length;K<W;K++)Q[K].call(this,J);J.target=null}}}var d8=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],p5=1234567,x7=Math.PI/180,K7=180/Math.PI;function P9(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0,Q=Math.random()*4294967295|0;return(d8[J&255]+d8[J>>8&255]+d8[J>>16&255]+d8[J>>24&255]+"-"+d8[$&255]+d8[$>>8&255]+"-"+d8[$>>16&15|64]+d8[$>>24&255]+"-"+d8[Z&63|128]+d8[Z>>8&255]+"-"+d8[Z>>16&255]+d8[Z>>24&255]+d8[Q&255]+d8[Q>>8&255]+d8[Q>>16&255]+d8[Q>>24&255]).toLowerCase()}function h8(J,$,Z){return Math.max($,Math.min(Z,J))}function NQ(J,$){return(J%$+$)%$}function eW(J,$,Z,Q,K){return Q+(J-$)*(K-Q)/(Z-$)}function JX(J,$,Z){if(J!==$)return(Z-J)/($-J);else return 0}function b7(J,$,Z){return(1-Z)*J+Z*$}function $X(J,$,Z,Q){return b7(J,$,1-Math.exp(-Z*Q))}function ZX(J,$=1){return $-Math.abs(NQ(J,$*2)-$)}function QX(J,$,Z){if(J<=$)return 0;if(J>=Z)return 1;return J=(J-$)/(Z-$),J*J*(3-2*J)}function KX(J,$,Z){if(J<=$)return 0;if(J>=Z)return 1;return J=(J-$)/(Z-$),J*J*J*(J*(J*6-15)+10)}function WX(J,$){return J+Math.floor(Math.random()*($-J+1))}function XX(J,$){return J+Math.random()*($-J)}function YX(J){return J*(0.5-Math.random())}function HX(J){if(J!==void 0)p5=J;let $=p5+=1831565813;return $=Math.imul($^$>>>15,$|1),$^=$+Math.imul($^$>>>7,$|61),(($^$>>>14)>>>0)/4294967296}function qX(J){return J*x7}function UX(J){return J*K7}function qQ(J){return(J&J-1)===0&&J!==0}function FX(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function i$(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function VX(J,$,Z,Q,K){let{cos:W,sin:Y}=Math,X=W(Z/2),H=Y(Z/2),q=W(($+Q)/2),U=Y(($+Q)/2),F=W(($-Q)/2),V=Y(($-Q)/2),G=W((Q-$)/2),N=Y((Q-$)/2);switch(K){case"XYX":J.set(X*U,H*F,H*V,X*q);break;case"YZY":J.set(H*V,X*U,H*F,X*q);break;case"ZXZ":J.set(H*F,H*V,X*U,X*q);break;case"XZX":J.set(X*U,H*N,H*G,X*q);break;case"YXY":J.set(H*G,X*U,H*N,X*q);break;case"ZYZ":J.set(H*N,H*G,X*U,X*q);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+K)}}function k9(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function Q8(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var t$={DEG2RAD:x7,RAD2DEG:K7,generateUUID:P9,clamp:h8,euclideanModulo:NQ,mapLinear:eW,inverseLerp:JX,lerp:b7,damp:$X,pingpong:ZX,smoothstep:QX,smootherstep:KX,randInt:WX,randFloat:XX,randFloatSpread:YX,seededRandom:HX,degToRad:qX,radToDeg:UX,isPowerOfTwo:qQ,ceilPowerOfTwo:FX,floorPowerOfTwo:i$,setQuaternionFromProperEuler:VX,normalize:Q8,denormalize:k9};class Y0{constructor(J=0,$=0){Y0.prototype.isVector2=!0,this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Z=this.y,Q=J.elements;return this.x=Q[0]*$+Q[3]*Z+Q[6],this.y=Q[1]*$+Q[4]*Z+Q[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Z=this.dot(J)/$;return Math.acos(h8(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Z=this.y-J.y;return $*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Z=Math.cos($),Q=Math.sin($),K=this.x-J.x,W=this.y-J.y;return this.x=K*Z-W*Q+J.x,this.y=K*Q+W*Z+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class r0{constructor(J,$,Z,Q,K,W,Y,X,H){if(r0.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Z,Q,K,W,Y,X,H)}set(J,$,Z,Q,K,W,Y,X,H){let q=this.elements;return q[0]=J,q[1]=Q,q[2]=Y,q[3]=$,q[4]=K,q[5]=X,q[6]=Z,q[7]=W,q[8]=H,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Z=J.elements;return $[0]=Z[0],$[1]=Z[1],$[2]=Z[2],$[3]=Z[3],$[4]=Z[4],$[5]=Z[5],$[6]=Z[6],$[7]=Z[7],$[8]=Z[8],this}extractBasis(J,$,Z){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Z.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Z=J.elements,Q=$.elements,K=this.elements,W=Z[0],Y=Z[3],X=Z[6],H=Z[1],q=Z[4],U=Z[7],F=Z[2],V=Z[5],G=Z[8],N=Q[0],E=Q[3],O=Q[6],D=Q[1],R=Q[4],B=Q[7],z=Q[2],C=Q[5],L=Q[8];return K[0]=W*N+Y*D+X*z,K[3]=W*E+Y*R+X*C,K[6]=W*O+Y*B+X*L,K[1]=H*N+q*D+U*z,K[4]=H*E+q*R+U*C,K[7]=H*O+q*B+U*L,K[2]=F*N+V*D+G*z,K[5]=F*E+V*R+G*C,K[8]=F*O+V*B+G*L,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],K=J[3],W=J[4],Y=J[5],X=J[6],H=J[7],q=J[8];return $*W*q-$*Y*H-Z*K*q+Z*Y*X+Q*K*H-Q*W*X}invert(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],K=J[3],W=J[4],Y=J[5],X=J[6],H=J[7],q=J[8],U=q*W-Y*H,F=Y*X-q*K,V=H*K-W*X,G=$*U+Z*F+Q*V;if(G===0)return this.set(0,0,0,0,0,0,0,0,0);let N=1/G;return J[0]=U*N,J[1]=(Q*H-q*Z)*N,J[2]=(Y*Z-Q*W)*N,J[3]=F*N,J[4]=(q*$-Q*X)*N,J[5]=(Q*K-Y*$)*N,J[6]=V*N,J[7]=(Z*X-H*$)*N,J[8]=(W*$-Z*K)*N,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Z,Q,K,W,Y){let X=Math.cos(K),H=Math.sin(K);return this.set(Z*X,Z*H,-Z*(X*W+H*Y)+W+J,-Q*H,Q*X,-Q*(-H*W+X*Y)+Y+$,0,0,1),this}scale(J,$){return this.premultiply(xZ.makeScale(J,$)),this}rotate(J){return this.premultiply(xZ.makeRotation(-J)),this}translate(J,$){return this.premultiply(xZ.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,-Z,0,Z,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Z=J.elements;for(let Q=0;Q<9;Q++)if($[Q]!==Z[Q])return!1;return!0}fromArray(J,$=0){for(let Z=0;Z<9;Z++)this.elements[Z]=J[Z+$];return this}toArray(J=[],$=0){let Z=this.elements;return J[$]=Z[0],J[$+1]=Z[1],J[$+2]=Z[2],J[$+3]=Z[3],J[$+4]=Z[4],J[$+5]=Z[5],J[$+6]=Z[6],J[$+7]=Z[7],J[$+8]=Z[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var xZ=new r0;function s6(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function o$(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function GX(){let J=o$("canvas");return J.style.display="block",J}var l5={};function f7(J){if(J in l5)return;l5[J]=!0,console.warn(J)}var c5=new r0().set(0.8224621,0.177538,0,0.0331941,0.9668058,0,0.0170827,0.0723974,0.9105199),n5=new r0().set(1.2249401,-0.2249404,0,-0.0420569,1.0420571,0,-0.0196376,-0.0786361,1.0982735),D$={["srgb-linear"]:{transfer:"linear",primaries:"rec709",toReference:(J)=>J,fromReference:(J)=>J},["srgb"]:{transfer:"srgb",primaries:"rec709",toReference:(J)=>J.convertSRGBToLinear(),fromReference:(J)=>J.convertLinearToSRGB()},["display-p3-linear"]:{transfer:"linear",primaries:"p3",toReference:(J)=>J.applyMatrix3(n5),fromReference:(J)=>J.applyMatrix3(c5)},["display-p3"]:{transfer:"srgb",primaries:"p3",toReference:(J)=>J.convertSRGBToLinear().applyMatrix3(n5),fromReference:(J)=>J.applyMatrix3(c5).convertLinearToSRGB()}},OX=new Set(["srgb-linear","display-p3-linear"]),W8={enabled:!0,_workingColorSpace:"srgb-linear",get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(J){if(!OX.has(J))throw Error(`Unsupported working color space, "${J}".`);this._workingColorSpace=J},convert:function(J,$,Z){if(this.enabled===!1||$===Z||!$||!Z)return J;let Q=D$[$].toReference,K=D$[Z].fromReference;return K(Q(J))},fromWorkingColorSpace:function(J,$){return this.convert(J,this._workingColorSpace,$)},toWorkingColorSpace:function(J,$){return this.convert(J,$,this._workingColorSpace)},getPrimaries:function(J){return D$[J].primaries},getTransfer:function(J){if(J==="")return"linear";return D$[J].transfer}};function Q7(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function bZ(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var bJ;class RQ{static getDataURL(J){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(bJ===void 0)bJ=o$("canvas");bJ.width=J.width,bJ.height=J.height;let Z=bJ.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=bJ}if($.width>2048||$.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",J),$.toDataURL("image/jpeg",0.6);else return $.toDataURL("image/png")}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=o$("canvas");$.width=J.width,$.height=J.height;let Z=$.getContext("2d");Z.drawImage(J,0,0,J.width,J.height);let Q=Z.getImageData(0,0,J.width,J.height),K=Q.data;for(let W=0;W<K.length;W++)K[W]=Q7(K[W]/255)*255;return Z.putImageData(Q,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Z=0;Z<$.length;Z++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Z]=Math.floor(Q7($[Z]/255)*255);else $[Z]=Q7($[Z]);return{data:$,width:J.width,height:J.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var DX=0;class BQ{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:DX++}),this.uuid=P9(),this.data=J,this.version=0}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Z={uuid:this.uuid,url:""},Q=this.data;if(Q!==null){let K;if(Array.isArray(Q)){K=[];for(let W=0,Y=Q.length;W<Y;W++)if(Q[W].isDataTexture)K.push(fZ(Q[W].image));else K.push(fZ(Q[W]))}else K=fZ(Q);Z.url=K}if(!$)J.images[this.uuid]=Z;return Z}}function fZ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return RQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var EX=0;class t8 extends u9{constructor(J=t8.DEFAULT_IMAGE,$=t8.DEFAULT_MAPPING,Z=1001,Q=1001,K=1006,W=1008,Y=1023,X=1009,H=t8.DEFAULT_ANISOTROPY,q=""){super();if(this.isTexture=!0,Object.defineProperty(this,"id",{value:EX++}),this.uuid=P9(),this.name="",this.source=new BQ(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Z,this.wrapT=Q,this.magFilter=K,this.minFilter=W,this.anisotropy=H,this.format=Y,this.internalFormat=null,this.type=X,this.offset=new Y0(0,0),this.repeat=new Y0(1,1),this.center=new Y0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new r0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof q==="string")this.colorSpace=q;else f7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=q===3001?"srgb":"";this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(J=null){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Z={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(!$)J.textures[this.uuid]=Z;return Z}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}get encoding(){return f7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace==="srgb"?3001:3000}set encoding(J){f7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=J===3001?"srgb":""}}t8.DEFAULT_IMAGE=null;t8.DEFAULT_MAPPING=300;t8.DEFAULT_ANISOTROPY=1;class D8{constructor(J=0,$=0,Z=0,Q=1){D8.prototype.isVector4=!0,this.x=J,this.y=$,this.z=Z,this.w=Q}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Z,Q){return this.x=J,this.y=$,this.z=Z,this.w=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Z=this.y,Q=this.z,K=this.w,W=J.elements;return this.x=W[0]*$+W[4]*Z+W[8]*Q+W[12]*K,this.y=W[1]*$+W[5]*Z+W[9]*Q+W[13]*K,this.z=W[2]*$+W[6]*Z+W[10]*Q+W[14]*K,this.w=W[3]*$+W[7]*Z+W[11]*Q+W[15]*K,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Z,Q,K,W=0.01,Y=0.1,X=J.elements,H=X[0],q=X[4],U=X[8],F=X[1],V=X[5],G=X[9],N=X[2],E=X[6],O=X[10];if(Math.abs(q-F)<0.01&&Math.abs(U-N)<0.01&&Math.abs(G-E)<0.01){if(Math.abs(q+F)<0.1&&Math.abs(U+N)<0.1&&Math.abs(G+E)<0.1&&Math.abs(H+V+O-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let R=(H+1)/2,B=(V+1)/2,z=(O+1)/2,C=(q+F)/4,L=(U+N)/4,A=(G+E)/4;if(R>B&&R>z)if(R<0.01)Z=0,Q=0.707106781,K=0.707106781;else Z=Math.sqrt(R),Q=C/Z,K=L/Z;else if(B>z)if(B<0.01)Z=0.707106781,Q=0,K=0.707106781;else Q=Math.sqrt(B),Z=C/Q,K=A/Q;else if(z<0.01)Z=0.707106781,Q=0.707106781,K=0;else K=Math.sqrt(z),Z=L/K,Q=A/K;return this.set(Z,Q,K,$),this}let D=Math.sqrt((E-G)*(E-G)+(U-N)*(U-N)+(F-q)*(F-q));if(Math.abs(D)<0.001)D=1;return this.x=(E-G)/D,this.y=(U-N)/D,this.z=(F-q)/D,this.w=Math.acos((H+V+O-1)/2),this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this.w=Math.max(J.w,Math.min($.w,this.w)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this.w=Math.max(J,Math.min($,this.w)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this.z=J.z+($.z-J.z)*Z,this.w=J.w+($.w-J.w)*Z,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class i6 extends u9{constructor(J=1,$=1,Z={}){super();this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=1,this.scissor=new D8(0,0,J,$),this.scissorTest=!1,this.viewport=new D8(0,0,J,$);let Q={width:J,height:$,depth:1};if(Z.encoding!==void 0)f7("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),Z.colorSpace=Z.encoding===3001?"srgb":"";Z=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},Z),this.texture=new t8(Q,Z.mapping,Z.wrapS,Z.wrapT,Z.magFilter,Z.minFilter,Z.format,Z.type,Z.anisotropy,Z.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=Z.generateMipmaps,this.texture.internalFormat=Z.internalFormat,this.depthBuffer=Z.depthBuffer,this.stencilBuffer=Z.stencilBuffer,this.depthTexture=Z.depthTexture,this.samples=Z.samples}setSize(J,$,Z=1){if(this.width!==J||this.height!==$||this.depth!==Z)this.width=J,this.height=$,this.depth=Z,this.texture.image.width=J,this.texture.image.height=$,this.texture.image.depth=Z,this.dispose();this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.texture=J.texture.clone(),this.texture.isRenderTargetTexture=!0;let $=Object.assign({},J.texture.image);if(this.texture.source=new BQ($),this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $J extends i6{constructor(J=1,$=1,Z={}){super(J,$,Z);this.isWebGLRenderTarget=!0}}class zQ extends t8{constructor(J=null,$=1,Z=1,Q=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Z,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class o6 extends t8{constructor(J=null,$=1,Z=1,Q=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Z,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class S9{constructor(J=0,$=0,Z=0,Q=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Z,this._w=Q}static slerpFlat(J,$,Z,Q,K,W,Y){let X=Z[Q+0],H=Z[Q+1],q=Z[Q+2],U=Z[Q+3],F=K[W+0],V=K[W+1],G=K[W+2],N=K[W+3];if(Y===0){J[$+0]=X,J[$+1]=H,J[$+2]=q,J[$+3]=U;return}if(Y===1){J[$+0]=F,J[$+1]=V,J[$+2]=G,J[$+3]=N;return}if(U!==N||X!==F||H!==V||q!==G){let E=1-Y,O=X*F+H*V+q*G+U*N,D=O>=0?1:-1,R=1-O*O;if(R>Number.EPSILON){let z=Math.sqrt(R),C=Math.atan2(z,O*D);E=Math.sin(E*C)/z,Y=Math.sin(Y*C)/z}let B=Y*D;if(X=X*E+F*B,H=H*E+V*B,q=q*E+G*B,U=U*E+N*B,E===1-Y){let z=1/Math.sqrt(X*X+H*H+q*q+U*U);X*=z,H*=z,q*=z,U*=z}}J[$]=X,J[$+1]=H,J[$+2]=q,J[$+3]=U}static multiplyQuaternionsFlat(J,$,Z,Q,K,W){let Y=Z[Q],X=Z[Q+1],H=Z[Q+2],q=Z[Q+3],U=K[W],F=K[W+1],V=K[W+2],G=K[W+3];return J[$]=Y*G+q*U+X*V-H*F,J[$+1]=X*G+q*F+H*U-Y*V,J[$+2]=H*G+q*V+Y*F-X*U,J[$+3]=q*G-Y*U-X*F-H*V,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Z,Q){return this._x=J,this._y=$,this._z=Z,this._w=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Z,_y:Q,_z:K,_order:W}=J,Y=Math.cos,X=Math.sin,H=Y(Z/2),q=Y(Q/2),U=Y(K/2),F=X(Z/2),V=X(Q/2),G=X(K/2);switch(W){case"XYZ":this._x=F*q*U+H*V*G,this._y=H*V*U-F*q*G,this._z=H*q*G+F*V*U,this._w=H*q*U-F*V*G;break;case"YXZ":this._x=F*q*U+H*V*G,this._y=H*V*U-F*q*G,this._z=H*q*G-F*V*U,this._w=H*q*U+F*V*G;break;case"ZXY":this._x=F*q*U-H*V*G,this._y=H*V*U+F*q*G,this._z=H*q*G+F*V*U,this._w=H*q*U-F*V*G;break;case"ZYX":this._x=F*q*U-H*V*G,this._y=H*V*U+F*q*G,this._z=H*q*G-F*V*U,this._w=H*q*U+F*V*G;break;case"YZX":this._x=F*q*U+H*V*G,this._y=H*V*U+F*q*G,this._z=H*q*G-F*V*U,this._w=H*q*U-F*V*G;break;case"XZY":this._x=F*q*U-H*V*G,this._y=H*V*U-F*q*G,this._z=H*q*G+F*V*U,this._w=H*q*U+F*V*G;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+W)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Z=$/2,Q=Math.sin(Z);return this._x=J.x*Q,this._y=J.y*Q,this._z=J.z*Q,this._w=Math.cos(Z),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Z=$[0],Q=$[4],K=$[8],W=$[1],Y=$[5],X=$[9],H=$[2],q=$[6],U=$[10],F=Z+Y+U;if(F>0){let V=0.5/Math.sqrt(F+1);this._w=0.25/V,this._x=(q-X)*V,this._y=(K-H)*V,this._z=(W-Q)*V}else if(Z>Y&&Z>U){let V=2*Math.sqrt(1+Z-Y-U);this._w=(q-X)/V,this._x=0.25*V,this._y=(Q+W)/V,this._z=(K+H)/V}else if(Y>U){let V=2*Math.sqrt(1+Y-Z-U);this._w=(K-H)/V,this._x=(Q+W)/V,this._y=0.25*V,this._z=(X+q)/V}else{let V=2*Math.sqrt(1+U-Z-Y);this._w=(W-Q)/V,this._x=(K+H)/V,this._y=(X+q)/V,this._z=0.25*V}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Z=J.dot($)+1;if(Z<Number.EPSILON)if(Z=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Z;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Z;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Z;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(h8(this.dot(J),-1,1)))}rotateTowards(J,$){let Z=this.angleTo(J);if(Z===0)return this;let Q=Math.min(1,$/Z);return this.slerp(J,Q),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Z,_y:Q,_z:K,_w:W}=J,Y=$._x,X=$._y,H=$._z,q=$._w;return this._x=Z*q+W*Y+Q*H-K*X,this._y=Q*q+W*X+K*Y-Z*H,this._z=K*q+W*H+Z*X-Q*Y,this._w=W*q-Z*Y-Q*X-K*H,this._onChangeCallback(),this}slerp(J,$){if($===0)return this;if($===1)return this.copy(J);let Z=this._x,Q=this._y,K=this._z,W=this._w,Y=W*J._w+Z*J._x+Q*J._y+K*J._z;if(Y<0)this._w=-J._w,this._x=-J._x,this._y=-J._y,this._z=-J._z,Y=-Y;else this.copy(J);if(Y>=1)return this._w=W,this._x=Z,this._y=Q,this._z=K,this;let X=1-Y*Y;if(X<=Number.EPSILON){let V=1-$;return this._w=V*W+$*this._w,this._x=V*Z+$*this._x,this._y=V*Q+$*this._y,this._z=V*K+$*this._z,this.normalize(),this}let H=Math.sqrt(X),q=Math.atan2(H,Y),U=Math.sin((1-$)*q)/H,F=Math.sin($*q)/H;return this._w=W*U+this._w*F,this._x=Z*U+this._x*F,this._y=Q*U+this._y*F,this._z=K*U+this._z*F,this._onChangeCallback(),this}slerpQuaternions(J,$,Z){return this.copy(J).slerp($,Z)}random(){let J=Math.random(),$=Math.sqrt(1-J),Z=Math.sqrt(J),Q=2*Math.PI*Math.random(),K=2*Math.PI*Math.random();return this.set($*Math.cos(Q),Z*Math.sin(K),Z*Math.cos(K),$*Math.sin(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(J=0,$=0,Z=0){T.prototype.isVector3=!0,this.x=J,this.y=$,this.z=Z}set(J,$,Z){if(Z===void 0)Z=this.z;return this.x=J,this.y=$,this.z=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(s5.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(s5.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Z=this.y,Q=this.z,K=J.elements;return this.x=K[0]*$+K[3]*Z+K[6]*Q,this.y=K[1]*$+K[4]*Z+K[7]*Q,this.z=K[2]*$+K[5]*Z+K[8]*Q,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Z=this.y,Q=this.z,K=J.elements,W=1/(K[3]*$+K[7]*Z+K[11]*Q+K[15]);return this.x=(K[0]*$+K[4]*Z+K[8]*Q+K[12])*W,this.y=(K[1]*$+K[5]*Z+K[9]*Q+K[13])*W,this.z=(K[2]*$+K[6]*Z+K[10]*Q+K[14])*W,this}applyQuaternion(J){let $=this.x,Z=this.y,Q=this.z,K=J.x,W=J.y,Y=J.z,X=J.w,H=2*(W*Q-Y*Z),q=2*(Y*$-K*Q),U=2*(K*Z-W*$);return this.x=$+X*H+W*U-Y*q,this.y=Z+X*q+Y*H-K*U,this.z=Q+X*U+K*q-W*H,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Z=this.y,Q=this.z,K=J.elements;return this.x=K[0]*$+K[4]*Z+K[8]*Q,this.y=K[1]*$+K[5]*Z+K[9]*Q,this.z=K[2]*$+K[6]*Z+K[10]*Q,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this.z=J.z+($.z-J.z)*Z,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Z,y:Q,z:K}=J,W=$.x,Y=$.y,X=$.z;return this.x=Q*X-K*Y,this.y=K*W-Z*X,this.z=Z*Y-Q*W,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Z=J.dot(this)/$;return this.copy(J).multiplyScalar(Z)}projectOnPlane(J){return hZ.copy(this).projectOnVector(J),this.sub(hZ)}reflect(J){return this.sub(hZ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Z=this.dot(J)/$;return Math.acos(h8(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Z=this.y-J.y,Q=this.z-J.z;return $*$+Z*Z+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Z){let Q=Math.sin($)*J;return this.x=Q*Math.sin(Z),this.y=Math.cos($)*J,this.z=Q*Math.cos(Z),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Z){return this.x=J*Math.sin($),this.y=Z,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Z=this.setFromMatrixColumn(J,1).length(),Q=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Z,this.z=Q,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=(Math.random()-0.5)*2,$=Math.random()*Math.PI*2,Z=Math.sqrt(1-J**2);return this.x=Z*Math.cos($),this.y=Z*Math.sin($),this.z=J,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var hZ=new T,s5=new S9;class Y7{constructor(J=new T(1/0,1/0,1/0),$=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Z=J.length;$<Z;$+=3)this.expandByPoint(R9.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Z=J.count;$<Z;$++)this.expandByPoint(R9.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Z=J.length;$<Z;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Z=R9.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Z),this.max.copy(J).add(Z),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Z=J.geometry;if(Z!==void 0){let K=Z.getAttribute("position");if($===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let W=0,Y=K.count;W<Y;W++){if(J.isMesh===!0)J.getVertexPosition(W,R9);else R9.fromBufferAttribute(K,W);R9.applyMatrix4(J.matrixWorld),this.expandByPoint(R9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();E$.copy(J.boundingBox)}else{if(Z.boundingBox===null)Z.computeBoundingBox();E$.copy(Z.boundingBox)}E$.applyMatrix4(J.matrixWorld),this.union(E$)}}let Q=J.children;for(let K=0,W=Q.length;K<W;K++)this.expandByObject(Q[K],$);return this}containsPoint(J){return J.x<this.min.x||J.x>this.max.x||J.y<this.min.y||J.y>this.max.y||J.z<this.min.z||J.z>this.max.z?!1:!0}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x<this.min.x||J.min.x>this.max.x||J.max.y<this.min.y||J.min.y>this.max.y||J.max.z<this.min.z||J.min.z>this.max.z?!1:!0}intersectsSphere(J){return this.clampPoint(J.center,R9),R9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Z;if(J.normal.x>0)$=J.normal.x*this.min.x,Z=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Z=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Z+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Z+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Z+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Z+=J.normal.z*this.min.z;return $<=-J.constant&&Z>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(k7),N$.subVectors(this.max,k7),fJ.subVectors(J.a,k7),hJ.subVectors(J.b,k7),vJ.subVectors(J.c,k7),r9.subVectors(hJ,fJ),a9.subVectors(vJ,hJ),OJ.subVectors(fJ,vJ);let $=[0,-r9.z,r9.y,0,-a9.z,a9.y,0,-OJ.z,OJ.y,r9.z,0,-r9.x,a9.z,0,-a9.x,OJ.z,0,-OJ.x,-r9.y,r9.x,0,-a9.y,a9.x,0,-OJ.y,OJ.x,0];if(!vZ($,fJ,hJ,vJ,N$))return!1;if($=[1,0,0,0,1,0,0,0,1],!vZ($,fJ,hJ,vJ,N$))return!1;return R$.crossVectors(r9,a9),$=[R$.x,R$.y,R$.z],vZ($,fJ,hJ,vJ,N$)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,R9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(R9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return b9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),b9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),b9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),b9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),b9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),b9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),b9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),b9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(b9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}}var b9=[new T,new T,new T,new T,new T,new T,new T,new T],R9=new T,E$=new Y7,fJ=new T,hJ=new T,vJ=new T,r9=new T,a9=new T,OJ=new T,k7=new T,N$=new T,R$=new T,DJ=new T;function vZ(J,$,Z,Q,K){for(let W=0,Y=J.length-3;W<=Y;W+=3){DJ.fromArray(J,W);let X=K.x*Math.abs(DJ.x)+K.y*Math.abs(DJ.y)+K.z*Math.abs(DJ.z),H=$.dot(DJ),q=Z.dot(DJ),U=Q.dot(DJ);if(Math.max(-Math.max(H,q,U),Math.min(H,q,U))>X)return!1}return!0}var NX=new Y7,P7=new T,gZ=new T;class H7{constructor(J=new T,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Z=this.center;if($!==void 0)Z.copy($);else NX.setFromPoints(J).getCenter(Z);let Q=0;for(let K=0,W=J.length;K<W;K++)Q=Math.max(Q,Z.distanceToSquared(J[K]));return this.radius=Math.sqrt(Q),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Z=this.center.distanceToSquared(J);if($.copy(J),Z>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;P7.subVectors(J,this.center);let $=P7.lengthSq();if($>this.radius*this.radius){let Z=Math.sqrt($),Q=(Z-this.radius)*0.5;this.center.addScaledVector(P7,Q/Z),this.radius+=Q}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else gZ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(P7.copy(J.center).add(gZ)),this.expandByPoint(P7.copy(J.center).sub(gZ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}}var f9=new T,mZ=new T,B$=new T,t9=new T,uZ=new T,z$=new T,dZ=new T;class CJ{constructor(J=new T,$=new T(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,f9)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Z=$.dot(this.direction);if(Z<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Z)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=f9.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return f9.copy(this.origin).addScaledVector(this.direction,$),f9.distanceToSquared(J)}distanceSqToSegment(J,$,Z,Q){mZ.copy(J).add($).multiplyScalar(0.5),B$.copy($).sub(J).normalize(),t9.copy(this.origin).sub(mZ);let K=J.distanceTo($)*0.5,W=-this.direction.dot(B$),Y=t9.dot(this.direction),X=-t9.dot(B$),H=t9.lengthSq(),q=Math.abs(1-W*W),U,F,V,G;if(q>0)if(U=W*X-Y,F=W*Y-X,G=K*q,U>=0)if(F>=-G)if(F<=G){let N=1/q;U*=N,F*=N,V=U*(U+W*F+2*Y)+F*(W*U+F+2*X)+H}else F=K,U=Math.max(0,-(W*F+Y)),V=-U*U+F*(F+2*X)+H;else F=-K,U=Math.max(0,-(W*F+Y)),V=-U*U+F*(F+2*X)+H;else if(F<=-G)U=Math.max(0,-(-W*K+Y)),F=U>0?-K:Math.min(Math.max(-K,-X),K),V=-U*U+F*(F+2*X)+H;else if(F<=G)U=0,F=Math.min(Math.max(-K,-X),K),V=F*(F+2*X)+H;else U=Math.max(0,-(W*K+Y)),F=U>0?K:Math.min(Math.max(-K,-X),K),V=-U*U+F*(F+2*X)+H;else F=W>0?-K:K,U=Math.max(0,-(W*F+Y)),V=-U*U+F*(F+2*X)+H;if(Z)Z.copy(this.origin).addScaledVector(this.direction,U);if(Q)Q.copy(mZ).addScaledVector(B$,F);return V}intersectSphere(J,$){f9.subVectors(J.center,this.origin);let Z=f9.dot(this.direction),Q=f9.dot(f9)-Z*Z,K=J.radius*J.radius;if(Q>K)return null;let W=Math.sqrt(K-Q),Y=Z-W,X=Z+W;if(X<0)return null;if(Y<0)return this.at(X,$);return this.at(Y,$)}intersectsSphere(J){return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Z=-(this.origin.dot(J.normal)+J.constant)/$;return Z>=0?Z:null}intersectPlane(J,$){let Z=this.distanceToPlane(J);if(Z===null)return null;return this.at(Z,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Z,Q,K,W,Y,X,H=1/this.direction.x,q=1/this.direction.y,U=1/this.direction.z,F=this.origin;if(H>=0)Z=(J.min.x-F.x)*H,Q=(J.max.x-F.x)*H;else Z=(J.max.x-F.x)*H,Q=(J.min.x-F.x)*H;if(q>=0)K=(J.min.y-F.y)*q,W=(J.max.y-F.y)*q;else K=(J.max.y-F.y)*q,W=(J.min.y-F.y)*q;if(Z>W||K>Q)return null;if(K>Z||isNaN(Z))Z=K;if(W<Q||isNaN(Q))Q=W;if(U>=0)Y=(J.min.z-F.z)*U,X=(J.max.z-F.z)*U;else Y=(J.max.z-F.z)*U,X=(J.min.z-F.z)*U;if(Z>X||Y>Q)return null;if(Y>Z||Z!==Z)Z=Y;if(X<Q||Q!==Q)Q=X;if(Q<0)return null;return this.at(Z>=0?Z:Q,$)}intersectsBox(J){return this.intersectBox(J,f9)!==null}intersectTriangle(J,$,Z,Q,K){uZ.subVectors($,J),z$.subVectors(Z,J),dZ.crossVectors(uZ,z$);let W=this.direction.dot(dZ),Y;if(W>0){if(Q)return null;Y=1}else if(W<0)Y=-1,W=-W;else return null;t9.subVectors(this.origin,J);let X=Y*this.direction.dot(z$.crossVectors(t9,z$));if(X<0)return null;let H=Y*this.direction.dot(uZ.cross(t9));if(H<0)return null;if(X+H>W)return null;let q=-Y*t9.dot(dZ);if(q<0)return null;return this.at(q/W,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class q8{constructor(J,$,Z,Q,K,W,Y,X,H,q,U,F,V,G,N,E){if(q8.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Z,Q,K,W,Y,X,H,q,U,F,V,G,N,E)}set(J,$,Z,Q,K,W,Y,X,H,q,U,F,V,G,N,E){let O=this.elements;return O[0]=J,O[4]=$,O[8]=Z,O[12]=Q,O[1]=K,O[5]=W,O[9]=Y,O[13]=X,O[2]=H,O[6]=q,O[10]=U,O[14]=F,O[3]=V,O[7]=G,O[11]=N,O[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new q8().fromArray(this.elements)}copy(J){let $=this.elements,Z=J.elements;return $[0]=Z[0],$[1]=Z[1],$[2]=Z[2],$[3]=Z[3],$[4]=Z[4],$[5]=Z[5],$[6]=Z[6],$[7]=Z[7],$[8]=Z[8],$[9]=Z[9],$[10]=Z[10],$[11]=Z[11],$[12]=Z[12],$[13]=Z[13],$[14]=Z[14],$[15]=Z[15],this}copyPosition(J){let $=this.elements,Z=J.elements;return $[12]=Z[12],$[13]=Z[13],$[14]=Z[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Z){return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Z.setFromMatrixColumn(this,2),this}makeBasis(J,$,Z){return this.set(J.x,$.x,Z.x,0,J.y,$.y,Z.y,0,J.z,$.z,Z.z,0,0,0,0,1),this}extractRotation(J){let $=this.elements,Z=J.elements,Q=1/gJ.setFromMatrixColumn(J,0).length(),K=1/gJ.setFromMatrixColumn(J,1).length(),W=1/gJ.setFromMatrixColumn(J,2).length();return $[0]=Z[0]*Q,$[1]=Z[1]*Q,$[2]=Z[2]*Q,$[3]=0,$[4]=Z[4]*K,$[5]=Z[5]*K,$[6]=Z[6]*K,$[7]=0,$[8]=Z[8]*W,$[9]=Z[9]*W,$[10]=Z[10]*W,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Z=J.x,Q=J.y,K=J.z,W=Math.cos(Z),Y=Math.sin(Z),X=Math.cos(Q),H=Math.sin(Q),q=Math.cos(K),U=Math.sin(K);if(J.order==="XYZ"){let F=W*q,V=W*U,G=Y*q,N=Y*U;$[0]=X*q,$[4]=-X*U,$[8]=H,$[1]=V+G*H,$[5]=F-N*H,$[9]=-Y*X,$[2]=N-F*H,$[6]=G+V*H,$[10]=W*X}else if(J.order==="YXZ"){let F=X*q,V=X*U,G=H*q,N=H*U;$[0]=F+N*Y,$[4]=G*Y-V,$[8]=W*H,$[1]=W*U,$[5]=W*q,$[9]=-Y,$[2]=V*Y-G,$[6]=N+F*Y,$[10]=W*X}else if(J.order==="ZXY"){let F=X*q,V=X*U,G=H*q,N=H*U;$[0]=F-N*Y,$[4]=-W*U,$[8]=G+V*Y,$[1]=V+G*Y,$[5]=W*q,$[9]=N-F*Y,$[2]=-W*H,$[6]=Y,$[10]=W*X}else if(J.order==="ZYX"){let F=W*q,V=W*U,G=Y*q,N=Y*U;$[0]=X*q,$[4]=G*H-V,$[8]=F*H+N,$[1]=X*U,$[5]=N*H+F,$[9]=V*H-G,$[2]=-H,$[6]=Y*X,$[10]=W*X}else if(J.order==="YZX"){let F=W*X,V=W*H,G=Y*X,N=Y*H;$[0]=X*q,$[4]=N-F*U,$[8]=G*U+V,$[1]=U,$[5]=W*q,$[9]=-Y*q,$[2]=-H*q,$[6]=V*U+G,$[10]=F-N*U}else if(J.order==="XZY"){let F=W*X,V=W*H,G=Y*X,N=Y*H;$[0]=X*q,$[4]=-U,$[8]=H*q,$[1]=F*U+N,$[5]=W*q,$[9]=V*U-G,$[2]=G*U-V,$[6]=Y*q,$[10]=N*U+F}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(RX,J,BX)}lookAt(J,$,Z){let Q=this.elements;if(X9.subVectors(J,$),X9.lengthSq()===0)X9.z=1;if(X9.normalize(),e9.crossVectors(Z,X9),e9.lengthSq()===0){if(Math.abs(Z.z)===1)X9.x+=0.0001;else X9.z+=0.0001;X9.normalize(),e9.crossVectors(Z,X9)}return e9.normalize(),I$.crossVectors(X9,e9),Q[0]=e9.x,Q[4]=I$.x,Q[8]=X9.x,Q[1]=e9.y,Q[5]=I$.y,Q[9]=X9.y,Q[2]=e9.z,Q[6]=I$.z,Q[10]=X9.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Z=J.elements,Q=$.elements,K=this.elements,W=Z[0],Y=Z[4],X=Z[8],H=Z[12],q=Z[1],U=Z[5],F=Z[9],V=Z[13],G=Z[2],N=Z[6],E=Z[10],O=Z[14],D=Z[3],R=Z[7],B=Z[11],z=Z[15],C=Q[0],L=Q[4],A=Q[8],_=Q[12],I=Q[1],k=Q[5],b=Q[9],n=Q[13],r=Q[2],y=Q[6],h=Q[10],m=Q[14],i=Q[3],d=Q[7],g=Q[11],p=Q[15];return K[0]=W*C+Y*I+X*r+H*i,K[4]=W*L+Y*k+X*y+H*d,K[8]=W*A+Y*b+X*h+H*g,K[12]=W*_+Y*n+X*m+H*p,K[1]=q*C+U*I+F*r+V*i,K[5]=q*L+U*k+F*y+V*d,K[9]=q*A+U*b+F*h+V*g,K[13]=q*_+U*n+F*m+V*p,K[2]=G*C+N*I+E*r+O*i,K[6]=G*L+N*k+E*y+O*d,K[10]=G*A+N*b+E*h+O*g,K[14]=G*_+N*n+E*m+O*p,K[3]=D*C+R*I+B*r+z*i,K[7]=D*L+R*k+B*y+z*d,K[11]=D*A+R*b+B*h+z*g,K[15]=D*_+R*n+B*m+z*p,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Z=J[4],Q=J[8],K=J[12],W=J[1],Y=J[5],X=J[9],H=J[13],q=J[2],U=J[6],F=J[10],V=J[14],G=J[3],N=J[7],E=J[11],O=J[15];return G*(+K*X*U-Q*H*U-K*Y*F+Z*H*F+Q*Y*V-Z*X*V)+N*(+$*X*V-$*H*F+K*W*F-Q*W*V+Q*H*q-K*X*q)+E*(+$*H*U-$*Y*V-K*W*U+Z*W*V+K*Y*q-Z*H*q)+O*(-Q*Y*q-$*X*U+$*Y*F+Q*W*U-Z*W*F+Z*X*q)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Z){let Q=this.elements;if(J.isVector3)Q[12]=J.x,Q[13]=J.y,Q[14]=J.z;else Q[12]=J,Q[13]=$,Q[14]=Z;return this}invert(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],K=J[3],W=J[4],Y=J[5],X=J[6],H=J[7],q=J[8],U=J[9],F=J[10],V=J[11],G=J[12],N=J[13],E=J[14],O=J[15],D=U*E*H-N*F*H+N*X*V-Y*E*V-U*X*O+Y*F*O,R=G*F*H-q*E*H-G*X*V+W*E*V+q*X*O-W*F*O,B=q*N*H-G*U*H+G*Y*V-W*N*V-q*Y*O+W*U*O,z=G*U*X-q*N*X-G*Y*F+W*N*F+q*Y*E-W*U*E,C=$*D+Z*R+Q*B+K*z;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/C;return J[0]=D*L,J[1]=(N*F*K-U*E*K-N*Q*V+Z*E*V+U*Q*O-Z*F*O)*L,J[2]=(Y*E*K-N*X*K+N*Q*H-Z*E*H-Y*Q*O+Z*X*O)*L,J[3]=(U*X*K-Y*F*K-U*Q*H+Z*F*H+Y*Q*V-Z*X*V)*L,J[4]=R*L,J[5]=(q*E*K-G*F*K+G*Q*V-$*E*V-q*Q*O+$*F*O)*L,J[6]=(G*X*K-W*E*K-G*Q*H+$*E*H+W*Q*O-$*X*O)*L,J[7]=(W*F*K-q*X*K+q*Q*H-$*F*H-W*Q*V+$*X*V)*L,J[8]=B*L,J[9]=(G*U*K-q*N*K-G*Z*V+$*N*V+q*Z*O-$*U*O)*L,J[10]=(W*N*K-G*Y*K+G*Z*H-$*N*H-W*Z*O+$*Y*O)*L,J[11]=(q*Y*K-W*U*K-q*Z*H+$*U*H+W*Z*V-$*Y*V)*L,J[12]=z*L,J[13]=(q*N*Q-G*U*Q+G*Z*F-$*N*F-q*Z*E+$*U*E)*L,J[14]=(G*Y*Q-W*N*Q-G*Z*X+$*N*X+W*Z*E-$*Y*E)*L,J[15]=(W*U*Q-q*Y*Q+q*Z*X-$*U*X-W*Z*F+$*Y*F)*L,this}scale(J){let $=this.elements,Z=J.x,Q=J.y,K=J.z;return $[0]*=Z,$[4]*=Q,$[8]*=K,$[1]*=Z,$[5]*=Q,$[9]*=K,$[2]*=Z,$[6]*=Q,$[10]*=K,$[3]*=Z,$[7]*=Q,$[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Z=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Q=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Z,Q))}makeTranslation(J,$,Z){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Z,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Z=Math.sin(J);return this.set(1,0,0,0,0,$,-Z,0,0,Z,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,0,Z,0,0,1,0,0,-Z,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,-Z,0,0,Z,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Z=Math.cos($),Q=Math.sin($),K=1-Z,W=J.x,Y=J.y,X=J.z,H=K*W,q=K*Y;return this.set(H*W+Z,H*Y-Q*X,H*X+Q*Y,0,H*Y+Q*X,q*Y+Z,q*X-Q*W,0,H*X-Q*Y,q*X+Q*W,K*X*X+Z,0,0,0,0,1),this}makeScale(J,$,Z){return this.set(J,0,0,0,0,$,0,0,0,0,Z,0,0,0,0,1),this}makeShear(J,$,Z,Q,K,W){return this.set(1,Z,K,0,J,1,W,0,$,Q,1,0,0,0,0,1),this}compose(J,$,Z){let Q=this.elements,K=$._x,W=$._y,Y=$._z,X=$._w,H=K+K,q=W+W,U=Y+Y,F=K*H,V=K*q,G=K*U,N=W*q,E=W*U,O=Y*U,D=X*H,R=X*q,B=X*U,z=Z.x,C=Z.y,L=Z.z;return Q[0]=(1-(N+O))*z,Q[1]=(V+B)*z,Q[2]=(G-R)*z,Q[3]=0,Q[4]=(V-B)*C,Q[5]=(1-(F+O))*C,Q[6]=(E+D)*C,Q[7]=0,Q[8]=(G+R)*L,Q[9]=(E-D)*L,Q[10]=(1-(F+N))*L,Q[11]=0,Q[12]=J.x,Q[13]=J.y,Q[14]=J.z,Q[15]=1,this}decompose(J,$,Z){let Q=this.elements,K=gJ.set(Q[0],Q[1],Q[2]).length(),W=gJ.set(Q[4],Q[5],Q[6]).length(),Y=gJ.set(Q[8],Q[9],Q[10]).length();if(this.determinant()<0)K=-K;J.x=Q[12],J.y=Q[13],J.z=Q[14],B9.copy(this);let H=1/K,q=1/W,U=1/Y;return B9.elements[0]*=H,B9.elements[1]*=H,B9.elements[2]*=H,B9.elements[4]*=q,B9.elements[5]*=q,B9.elements[6]*=q,B9.elements[8]*=U,B9.elements[9]*=U,B9.elements[10]*=U,$.setFromRotationMatrix(B9),Z.x=K,Z.y=W,Z.z=Y,this}makePerspective(J,$,Z,Q,K,W,Y=2000){let X=this.elements,H=2*K/($-J),q=2*K/(Z-Q),U=($+J)/($-J),F=(Z+Q)/(Z-Q),V,G;if(Y===2000)V=-(W+K)/(W-K),G=-2*W*K/(W-K);else if(Y===2001)V=-W/(W-K),G=-W*K/(W-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+Y);return X[0]=H,X[4]=0,X[8]=U,X[12]=0,X[1]=0,X[5]=q,X[9]=F,X[13]=0,X[2]=0,X[6]=0,X[10]=V,X[14]=G,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,$,Z,Q,K,W,Y=2000){let X=this.elements,H=1/($-J),q=1/(Z-Q),U=1/(W-K),F=($+J)*H,V=(Z+Q)*q,G,N;if(Y===2000)G=(W+K)*U,N=-2*U;else if(Y===2001)G=K*U,N=-1*U;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+Y);return X[0]=2*H,X[4]=0,X[8]=0,X[12]=-F,X[1]=0,X[5]=2*q,X[9]=0,X[13]=-V,X[2]=0,X[6]=0,X[10]=N,X[14]=-G,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let $=this.elements,Z=J.elements;for(let Q=0;Q<16;Q++)if($[Q]!==Z[Q])return!1;return!0}fromArray(J,$=0){for(let Z=0;Z<16;Z++)this.elements[Z]=J[Z+$];return this}toArray(J=[],$=0){let Z=this.elements;return J[$]=Z[0],J[$+1]=Z[1],J[$+2]=Z[2],J[$+3]=Z[3],J[$+4]=Z[4],J[$+5]=Z[5],J[$+6]=Z[6],J[$+7]=Z[7],J[$+8]=Z[8],J[$+9]=Z[9],J[$+10]=Z[10],J[$+11]=Z[11],J[$+12]=Z[12],J[$+13]=Z[13],J[$+14]=Z[14],J[$+15]=Z[15],J}}var gJ=new T,B9=new q8,RX=new T(0,0,0),BX=new T(1,1,1),e9=new T,I$=new T,X9=new T,i5=new q8,o5=new S9;class e${constructor(J=0,$=0,Z=0,Q=e$.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Z,this._order=Q}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Z,Q=this._order){return this._x=J,this._y=$,this._z=Z,this._order=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Z=!0){let Q=J.elements,K=Q[0],W=Q[4],Y=Q[8],X=Q[1],H=Q[5],q=Q[9],U=Q[2],F=Q[6],V=Q[10];switch($){case"XYZ":if(this._y=Math.asin(h8(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-q,V),this._z=Math.atan2(-W,K);else this._x=Math.atan2(F,H),this._z=0;break;case"YXZ":if(this._x=Math.asin(-h8(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(Y,V),this._z=Math.atan2(X,H);else this._y=Math.atan2(-U,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(h8(F,-1,1)),Math.abs(F)<0.9999999)this._y=Math.atan2(-U,V),this._z=Math.atan2(-W,H);else this._y=0,this._z=Math.atan2(X,K);break;case"ZYX":if(this._y=Math.asin(-h8(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(F,V),this._z=Math.atan2(X,K);else this._x=0,this._z=Math.atan2(-W,H);break;case"YZX":if(this._z=Math.asin(h8(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-q,H),this._y=Math.atan2(-U,K);else this._x=0,this._y=Math.atan2(Y,V);break;case"XZY":if(this._z=Math.asin(-h8(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(F,H),this._y=Math.atan2(Y,K);else this._x=Math.atan2(-q,V),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Z===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Z){return i5.makeRotationFromQuaternion(J),this.setFromRotationMatrix(i5,$,Z)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return o5.setFromEuler(this),this.setFromQuaternion(o5,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}e$.DEFAULT_ORDER="XYZ";class JZ{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var zX=0,r5=new T,mJ=new S9,h9=new q8,L$=new T,S7=new T,IX=new T,LX=new S9,a5=new T(1,0,0),t5=new T(0,1,0),e5=new T(0,0,1),CX={type:"added"},AX={type:"removed"};class E8 extends u9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:zX++}),this.uuid=P9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=E8.DEFAULT_UP.clone();let J=new T,$=new e$,Z=new S9,Q=new T(1,1,1);function K(){Z.setFromEuler($,!1)}function W(){$.setFromQuaternion(Z,void 0,!1)}$._onChange(K),Z._onChange(W),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Z},scale:{configurable:!0,enumerable:!0,value:Q},modelViewMatrix:{value:new q8},normalMatrix:{value:new r0}}),this.matrix=new q8,this.matrixWorld=new q8,this.matrixAutoUpdate=E8.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=E8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new JZ,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return mJ.setFromAxisAngle(J,$),this.quaternion.multiply(mJ),this}rotateOnWorldAxis(J,$){return mJ.setFromAxisAngle(J,$),this.quaternion.premultiply(mJ),this}rotateX(J){return this.rotateOnAxis(a5,J)}rotateY(J){return this.rotateOnAxis(t5,J)}rotateZ(J){return this.rotateOnAxis(e5,J)}translateOnAxis(J,$){return r5.copy(J).applyQuaternion(this.quaternion),this.position.add(r5.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(a5,J)}translateY(J){return this.translateOnAxis(t5,J)}translateZ(J){return this.translateOnAxis(e5,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(h9.copy(this.matrixWorld).invert())}lookAt(J,$,Z){if(J.isVector3)L$.copy(J);else L$.set(J,$,Z);let Q=this.parent;if(this.updateWorldMatrix(!0,!1),S7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)h9.lookAt(S7,L$,this.up);else h9.lookAt(L$,S7,this.up);if(this.quaternion.setFromRotationMatrix(h9),Q)h9.extractRotation(Q.matrixWorld),mJ.setFromRotationMatrix(h9),this.quaternion.premultiply(mJ.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D){if(J.parent!==null)J.parent.remove(J);J.parent=this,this.children.push(J),J.dispatchEvent(CX)}else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Z=0;Z<arguments.length;Z++)this.remove(arguments[Z]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent(AX);return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),h9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),h9.multiply(J.parent.matrixWorld);return J.applyMatrix4(h9),this.add(J),J.updateWorldMatrix(!1,!0),this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Z=0,Q=this.children.length;Z<Q;Z++){let W=this.children[Z].getObjectByProperty(J,$);if(W!==void 0)return W}return}getObjectsByProperty(J,$,Z=[]){if(this[J]===$)Z.push(this);let Q=this.children;for(let K=0,W=Q.length;K<W;K++)Q[K].getObjectsByProperty(J,$,Z);return Z}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(S7,J,IX),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(S7,LX,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}traverse(J){J(this);let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++)$[Z].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++)$[Z].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++){let K=$[Z];if(K.matrixWorldAutoUpdate===!0||J===!0)K.updateMatrixWorld(J)}}updateWorldMatrix(J,$){let Z=this.parent;if(J===!0&&Z!==null&&Z.matrixWorldAutoUpdate===!0)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if($===!0){let Q=this.children;for(let K=0,W=Q.length;K<W;K++){let Y=Q[K];if(Y.matrixWorldAutoUpdate===!0)Y.updateWorldMatrix(!1,!0)}}}toJSON(J){let $=J===void 0||typeof J==="string",Z={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Z.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let Q={};if(Q.uuid=this.uuid,Q.type=this.type,this.name!=="")Q.name=this.name;if(this.castShadow===!0)Q.castShadow=!0;if(this.receiveShadow===!0)Q.receiveShadow=!0;if(this.visible===!1)Q.visible=!1;if(this.frustumCulled===!1)Q.frustumCulled=!1;if(this.renderOrder!==0)Q.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(Q.layers=this.layers.mask,Q.matrix=this.matrix.toArray(),Q.up=this.up.toArray(),this.matrixAutoUpdate===!1)Q.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(Q.type="InstancedMesh",Q.count=this.count,Q.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Q.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Q.type="BatchedMesh",Q.perObjectFrustumCulled=this.perObjectFrustumCulled,Q.sortObjects=this.sortObjects,Q.drawRanges=this._drawRanges,Q.reservedRanges=this._reservedRanges,Q.visibility=this._visibility,Q.active=this._active,Q.bounds=this._bounds.map((Y)=>({boxInitialized:Y.boxInitialized,boxMin:Y.box.min.toArray(),boxMax:Y.box.max.toArray(),sphereInitialized:Y.sphereInitialized,sphereRadius:Y.sphere.radius,sphereCenter:Y.sphere.center.toArray()})),Q.maxGeometryCount=this._maxGeometryCount,Q.maxVertexCount=this._maxVertexCount,Q.maxIndexCount=this._maxIndexCount,Q.geometryInitialized=this._geometryInitialized,Q.geometryCount=this._geometryCount,Q.matricesTexture=this._matricesTexture.toJSON(J),this.boundingSphere!==null)Q.boundingSphere={center:Q.boundingSphere.center.toArray(),radius:Q.boundingSphere.radius};if(this.boundingBox!==null)Q.boundingBox={min:Q.boundingBox.min.toArray(),max:Q.boundingBox.max.toArray()}}function K(Y,X){if(Y[X.uuid]===void 0)Y[X.uuid]=X.toJSON(J);return X.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Q.background=this.background.toJSON();else if(this.background.isTexture)Q.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Q.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Q.geometry=K(J.geometries,this.geometry);let Y=this.geometry.parameters;if(Y!==void 0&&Y.shapes!==void 0){let X=Y.shapes;if(Array.isArray(X))for(let H=0,q=X.length;H<q;H++){let U=X[H];K(J.shapes,U)}else K(J.shapes,X)}}if(this.isSkinnedMesh){if(Q.bindMode=this.bindMode,Q.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Q.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let Y=[];for(let X=0,H=this.material.length;X<H;X++)Y.push(K(J.materials,this.material[X]));Q.material=Y}else Q.material=K(J.materials,this.material);if(this.children.length>0){Q.children=[];for(let Y=0;Y<this.children.length;Y++)Q.children.push(this.children[Y].toJSON(J).object)}if(this.animations.length>0){Q.animations=[];for(let Y=0;Y<this.animations.length;Y++){let X=this.animations[Y];Q.animations.push(K(J.animations,X))}}if($){let Y=W(J.geometries),X=W(J.materials),H=W(J.textures),q=W(J.images),U=W(J.shapes),F=W(J.skeletons),V=W(J.animations),G=W(J.nodes);if(Y.length>0)Z.geometries=Y;if(X.length>0)Z.materials=X;if(H.length>0)Z.textures=H;if(q.length>0)Z.images=q;if(U.length>0)Z.shapes=U;if(F.length>0)Z.skeletons=F;if(V.length>0)Z.animations=V;if(G.length>0)Z.nodes=G}return Z.object=Q,Z;function W(Y){let X=[];for(let H in Y){let q=Y[H];delete q.metadata,X.push(q)}return X}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Z=0;Z<J.children.length;Z++){let Q=J.children[Z];this.add(Q.clone())}return this}}E8.DEFAULT_UP=new T(0,1,0);E8.DEFAULT_MATRIX_AUTO_UPDATE=!0;E8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var z9=new T,v9=new T,pZ=new T,g9=new T,uJ=new T,dJ=new T,J6=new T,lZ=new T,cZ=new T,nZ=new T,C$=!1;class O9{constructor(J=new T,$=new T,Z=new T){this.a=J,this.b=$,this.c=Z}static getNormal(J,$,Z,Q){Q.subVectors(Z,$),z9.subVectors(J,$),Q.cross(z9);let K=Q.lengthSq();if(K>0)return Q.multiplyScalar(1/Math.sqrt(K));return Q.set(0,0,0)}static getBarycoord(J,$,Z,Q,K){z9.subVectors(Q,$),v9.subVectors(Z,$),pZ.subVectors(J,$);let W=z9.dot(z9),Y=z9.dot(v9),X=z9.dot(pZ),H=v9.dot(v9),q=v9.dot(pZ),U=W*H-Y*Y;if(U===0)return K.set(0,0,0),null;let F=1/U,V=(H*X-Y*q)*F,G=(W*q-Y*X)*F;return K.set(1-V-G,G,V)}static containsPoint(J,$,Z,Q){if(this.getBarycoord(J,$,Z,Q,g9)===null)return!1;return g9.x>=0&&g9.y>=0&&g9.x+g9.y<=1}static getUV(J,$,Z,Q,K,W,Y,X){if(C$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),C$=!0;return this.getInterpolation(J,$,Z,Q,K,W,Y,X)}static getInterpolation(J,$,Z,Q,K,W,Y,X){if(this.getBarycoord(J,$,Z,Q,g9)===null){if(X.x=0,X.y=0,"z"in X)X.z=0;if("w"in X)X.w=0;return null}return X.setScalar(0),X.addScaledVector(K,g9.x),X.addScaledVector(W,g9.y),X.addScaledVector(Y,g9.z),X}static isFrontFacing(J,$,Z,Q){return z9.subVectors(Z,$),v9.subVectors(J,$),z9.cross(v9).dot(Q)<0?!0:!1}set(J,$,Z){return this.a.copy(J),this.b.copy($),this.c.copy(Z),this}setFromPointsAndIndices(J,$,Z,Q){return this.a.copy(J[$]),this.b.copy(J[Z]),this.c.copy(J[Q]),this}setFromAttributeAndIndices(J,$,Z,Q){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Z),this.c.fromBufferAttribute(J,Q),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return z9.subVectors(this.c,this.b),v9.subVectors(this.a,this.b),z9.cross(v9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return O9.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return O9.getBarycoord(J,this.a,this.b,this.c,$)}getUV(J,$,Z,Q,K){if(C$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),C$=!0;return O9.getInterpolation(J,this.a,this.b,this.c,$,Z,Q,K)}getInterpolation(J,$,Z,Q,K){return O9.getInterpolation(J,this.a,this.b,this.c,$,Z,Q,K)}containsPoint(J){return O9.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return O9.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Z=this.a,Q=this.b,K=this.c,W,Y;uJ.subVectors(Q,Z),dJ.subVectors(K,Z),lZ.subVectors(J,Z);let X=uJ.dot(lZ),H=dJ.dot(lZ);if(X<=0&&H<=0)return $.copy(Z);cZ.subVectors(J,Q);let q=uJ.dot(cZ),U=dJ.dot(cZ);if(q>=0&&U<=q)return $.copy(Q);let F=X*U-q*H;if(F<=0&&X>=0&&q<=0)return W=X/(X-q),$.copy(Z).addScaledVector(uJ,W);nZ.subVectors(J,K);let V=uJ.dot(nZ),G=dJ.dot(nZ);if(G>=0&&V<=G)return $.copy(K);let N=V*H-X*G;if(N<=0&&H>=0&&G<=0)return Y=H/(H-G),$.copy(Z).addScaledVector(dJ,Y);let E=q*G-V*U;if(E<=0&&U-q>=0&&V-G>=0)return J6.subVectors(K,Q),Y=(U-q)/(U-q+(V-G)),$.copy(Q).addScaledVector(J6,Y);let O=1/(E+N+F);return W=N*O,Y=F*O,$.copy(Z).addScaledVector(uJ,W).addScaledVector(dJ,Y)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}var r6={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},JJ={h:0,s:0,l:0},A$={h:0,s:0,l:0};function sZ(J,$,Z){if(Z<0)Z+=1;if(Z>1)Z-=1;if(Z<0.16666666666666666)return J+($-J)*6*Z;if(Z<0.5)return $;if(Z<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Z);return J}class e0{constructor(J,$,Z){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Z)}set(J,$,Z){if($===void 0&&Z===void 0){let Q=J;if(Q&&Q.isColor)this.copy(Q);else if(typeof Q==="number")this.setHex(Q);else if(typeof Q==="string")this.setStyle(Q)}else this.setRGB(J,$,Z);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,W8.toWorkingColorSpace(this,$),this}setRGB(J,$,Z,Q=W8.workingColorSpace){return this.r=J,this.g=$,this.b=Z,W8.toWorkingColorSpace(this,Q),this}setHSL(J,$,Z,Q=W8.workingColorSpace){if(J=NQ(J,1),$=h8($,0,1),Z=h8(Z,0,1),$===0)this.r=this.g=this.b=Z;else{let K=Z<=0.5?Z*(1+$):Z+$-Z*$,W=2*Z-K;this.r=sZ(W,K,J+0.3333333333333333),this.g=sZ(W,K,J),this.b=sZ(W,K,J-0.3333333333333333)}return W8.toWorkingColorSpace(this,Q),this}setStyle(J,$="srgb"){function Z(K){if(K===void 0)return;if(parseFloat(K)<1)console.warn("THREE.Color: Alpha component of "+J+" will be ignored.")}let Q;if(Q=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,W=Q[1],Y=Q[2];switch(W){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Z(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,$);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Z(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,$);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Z(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,$);break;default:console.warn("THREE.Color: Unknown color model "+J)}}else if(Q=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Q[1],W=K.length;if(W===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,$);else if(W===6)return this.setHex(parseInt(K,16),$);else console.warn("THREE.Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Z=r6[J.toLowerCase()];if(Z!==void 0)this.setHex(Z,$);else console.warn("THREE.Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=Q7(J.r),this.g=Q7(J.g),this.b=Q7(J.b),this}copyLinearToSRGB(J){return this.r=bZ(J.r),this.g=bZ(J.g),this.b=bZ(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return W8.fromWorkingColorSpace(p8.copy(this),J),Math.round(h8(p8.r*255,0,255))*65536+Math.round(h8(p8.g*255,0,255))*256+Math.round(h8(p8.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=W8.workingColorSpace){W8.fromWorkingColorSpace(p8.copy(this),$);let{r:Z,g:Q,b:K}=p8,W=Math.max(Z,Q,K),Y=Math.min(Z,Q,K),X,H,q=(Y+W)/2;if(Y===W)X=0,H=0;else{let U=W-Y;switch(H=q<=0.5?U/(W+Y):U/(2-W-Y),W){case Z:X=(Q-K)/U+(Q<K?6:0);break;case Q:X=(K-Z)/U+2;break;case K:X=(Z-Q)/U+4;break}X/=6}return J.h=X,J.s=H,J.l=q,J}getRGB(J,$=W8.workingColorSpace){return W8.fromWorkingColorSpace(p8.copy(this),$),J.r=p8.r,J.g=p8.g,J.b=p8.b,J}getStyle(J="srgb"){W8.fromWorkingColorSpace(p8.copy(this),J);let{r:$,g:Z,b:Q}=p8;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Z.toFixed(3)} ${Q.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Z*255)},${Math.round(Q*255)})`}offsetHSL(J,$,Z){return this.getHSL(JJ),this.setHSL(JJ.h+J,JJ.s+$,JJ.l+Z)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Z){return this.r=J.r+($.r-J.r)*Z,this.g=J.g+($.g-J.g)*Z,this.b=J.b+($.b-J.b)*Z,this}lerpHSL(J,$){this.getHSL(JJ),J.getHSL(A$);let Z=b7(JJ.h,A$.h,$),Q=b7(JJ.s,A$.s,$),K=b7(JJ.l,A$.l,$);return this.setHSL(Z,Q,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Z=this.g,Q=this.b,K=J.elements;return this.r=K[0]*$+K[3]*Z+K[6]*Q,this.g=K[1]*$+K[4]*Z+K[7]*Q,this.b=K[2]*$+K[5]*Z+K[8]*Q,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var p8=new e0;e0.NAMES=r6;var MX=0;class d9 extends u9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:MX++}),this.uuid=P9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new e0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Z=J[$];if(Z===void 0){console.warn(`THREE.Material: parameter '${$}' has value of undefined.`);continue}let Q=this[$];if(Q===void 0){console.warn(`THREE.Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(Q&&Q.isColor)Q.set(Z);else if(Q&&Q.isVector3&&(Z&&Z.isVector3))Q.copy(Z);else this[$]=Z}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Z={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.color&&this.color.isColor)Z.color=this.color.getHex();if(this.roughness!==void 0)Z.roughness=this.roughness;if(this.metalness!==void 0)Z.metalness=this.metalness;if(this.sheen!==void 0)Z.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Z.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Z.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Z.emissive=this.emissive.getHex();if(this.emissiveIntensity&&this.emissiveIntensity!==1)Z.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Z.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Z.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Z.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Z.shininess=this.shininess;if(this.clearcoat!==void 0)Z.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Z.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Z.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Z.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Z.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Z.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.iridescence!==void 0)Z.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Z.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Z.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Z.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Z.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Z.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Z.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Z.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Z.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Z.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Z.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Z.lightMap=this.lightMap.toJSON(J).uuid,Z.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Z.aoMap=this.aoMap.toJSON(J).uuid,Z.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Z.bumpMap=this.bumpMap.toJSON(J).uuid,Z.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Z.normalMap=this.normalMap.toJSON(J).uuid,Z.normalMapType=this.normalMapType,Z.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Z.displacementMap=this.displacementMap.toJSON(J).uuid,Z.displacementScale=this.displacementScale,Z.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Z.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Z.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Z.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Z.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Z.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Z.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Z.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Z.combine=this.combine}if(this.envMapIntensity!==void 0)Z.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Z.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Z.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Z.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Z.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Z.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Z.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Z.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)Z.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Z.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Z.size=this.size;if(this.shadowSide!==null)Z.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)Z.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)Z.blending=this.blending;if(this.side!==0)Z.side=this.side;if(this.vertexColors===!0)Z.vertexColors=!0;if(this.opacity<1)Z.opacity=this.opacity;if(this.transparent===!0)Z.transparent=!0;if(this.blendSrc!==204)Z.blendSrc=this.blendSrc;if(this.blendDst!==205)Z.blendDst=this.blendDst;if(this.blendEquation!==100)Z.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)Z.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)Z.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)Z.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)Z.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)Z.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)Z.depthFunc=this.depthFunc;if(this.depthTest===!1)Z.depthTest=this.depthTest;if(this.depthWrite===!1)Z.depthWrite=this.depthWrite;if(this.colorWrite===!1)Z.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)Z.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)Z.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)Z.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)Z.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)Z.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)Z.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)Z.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)Z.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)Z.rotation=this.rotation;if(this.polygonOffset===!0)Z.polygonOffset=!0;if(this.polygonOffsetFactor!==0)Z.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)Z.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)Z.linewidth=this.linewidth;if(this.dashSize!==void 0)Z.dashSize=this.dashSize;if(this.gapSize!==void 0)Z.gapSize=this.gapSize;if(this.scale!==void 0)Z.scale=this.scale;if(this.dithering===!0)Z.dithering=!0;if(this.alphaTest>0)Z.alphaTest=this.alphaTest;if(this.alphaHash===!0)Z.alphaHash=!0;if(this.alphaToCoverage===!0)Z.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)Z.premultipliedAlpha=!0;if(this.forceSinglePass===!0)Z.forceSinglePass=!0;if(this.wireframe===!0)Z.wireframe=!0;if(this.wireframeLinewidth>1)Z.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")Z.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")Z.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)Z.flatShading=!0;if(this.visible===!1)Z.visible=!1;if(this.toneMapped===!1)Z.toneMapped=!1;if(this.fog===!1)Z.fog=!1;if(Object.keys(this.userData).length>0)Z.userData=this.userData;function Q(K){let W=[];for(let Y in K){let X=K[Y];delete X.metadata,W.push(X)}return W}if($){let K=Q(J.textures),W=Q(J.images);if(K.length>0)Z.textures=K;if(W.length>0)Z.images=W}return Z}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Z=null;if($!==null){let Q=$.length;Z=Array(Q);for(let K=0;K!==Q;++K)Z[K]=$[K].clone()}return this.clippingPlanes=Z,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class X8 extends d9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new e0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var w8=new T,M$=new Y0;class v8{constructor(J,$,Z=!1){if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Z,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Z){J*=this.itemSize,Z*=$.itemSize;for(let Q=0,K=this.itemSize;Q<K;Q++)this.array[J+Q]=$.array[Z+Q];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Z=this.count;$<Z;$++)M$.fromBufferAttribute(this,$),M$.applyMatrix3(J),this.setXY($,M$.x,M$.y);else if(this.itemSize===3)for(let $=0,Z=this.count;$<Z;$++)w8.fromBufferAttribute(this,$),w8.applyMatrix3(J),this.setXYZ($,w8.x,w8.y,w8.z);return this}applyMatrix4(J){for(let $=0,Z=this.count;$<Z;$++)w8.fromBufferAttribute(this,$),w8.applyMatrix4(J),this.setXYZ($,w8.x,w8.y,w8.z);return this}applyNormalMatrix(J){for(let $=0,Z=this.count;$<Z;$++)w8.fromBufferAttribute(this,$),w8.applyNormalMatrix(J),this.setXYZ($,w8.x,w8.y,w8.z);return this}transformDirection(J){for(let $=0,Z=this.count;$<Z;$++)w8.fromBufferAttribute(this,$),w8.transformDirection(J),this.setXYZ($,w8.x,w8.y,w8.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Z=this.array[J*this.itemSize+$];if(this.normalized)Z=k9(Z,this.array);return Z}setComponent(J,$,Z){if(this.normalized)Z=Q8(Z,this.array);return this.array[J*this.itemSize+$]=Z,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=k9($,this.array);return $}setX(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=k9($,this.array);return $}setY(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=k9($,this.array);return $}setZ(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=k9($,this.array);return $}setW(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Z){if(J*=this.itemSize,this.normalized)$=Q8($,this.array),Z=Q8(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this}setXYZ(J,$,Z,Q){if(J*=this.itemSize,this.normalized)$=Q8($,this.array),Z=Q8(Z,this.array),Q=Q8(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this.array[J+2]=Q,this}setXYZW(J,$,Z,Q,K){if(J*=this.itemSize,this.normalized)$=Q8($,this.array),Z=Q8(Z,this.array),Q=Q8(Q,this.array),K=Q8(K,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this.array[J+2]=Q,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}}class IQ extends v8{constructor(J,$,Z){super(new Uint16Array(J),$,Z)}}class LQ extends v8{constructor(J,$,Z){super(new Uint32Array(J),$,Z)}}class $8 extends v8{constructor(J,$,Z){super(new Float32Array(J),$,Z)}}var kX=0,G9=new q8,iZ=new E8,pJ=new T,Y9=new Y7,w7=new Y7,f8=new T;class F8 extends u9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kX++}),this.uuid=P9(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((s6(J))?LQ:IQ)(J,1);else this.index=J;return this}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Z=0){this.groups.push({start:J,count:$,materialIndex:Z})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Z=this.attributes.normal;if(Z!==void 0){let K=new r0().getNormalMatrix(J);Z.applyNormalMatrix(K),Z.needsUpdate=!0}let Q=this.attributes.tangent;if(Q!==void 0)Q.transformDirection(J),Q.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return G9.makeRotationFromQuaternion(J),this.applyMatrix4(G9),this}rotateX(J){return G9.makeRotationX(J),this.applyMatrix4(G9),this}rotateY(J){return G9.makeRotationY(J),this.applyMatrix4(G9),this}rotateZ(J){return G9.makeRotationZ(J),this.applyMatrix4(G9),this}translate(J,$,Z){return G9.makeTranslation(J,$,Z),this.applyMatrix4(G9),this}scale(J,$,Z){return G9.makeScale(J,$,Z),this.applyMatrix4(G9),this}lookAt(J){return iZ.lookAt(J),iZ.updateMatrix(),this.applyMatrix4(iZ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pJ).negate(),this.translate(pJ.x,pJ.y,pJ.z),this}setFromPoints(J){let $=[];for(let Z=0,Q=J.length;Z<Q;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}return this.setAttribute("position",new $8($,3)),this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Y7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Z=0,Q=$.length;Z<Q;Z++){let K=$[Z];if(Y9.setFromBufferAttribute(K),this.morphTargetsRelative)f8.addVectors(this.boundingBox.min,Y9.min),this.boundingBox.expandByPoint(f8),f8.addVectors(this.boundingBox.max,Y9.max),this.boundingBox.expandByPoint(f8);else this.boundingBox.expandByPoint(Y9.min),this.boundingBox.expandByPoint(Y9.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new H7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(J){let Z=this.boundingSphere.center;if(Y9.setFromBufferAttribute(J),$)for(let K=0,W=$.length;K<W;K++){let Y=$[K];if(w7.setFromBufferAttribute(Y),this.morphTargetsRelative)f8.addVectors(Y9.min,w7.min),Y9.expandByPoint(f8),f8.addVectors(Y9.max,w7.max),Y9.expandByPoint(f8);else Y9.expandByPoint(w7.min),Y9.expandByPoint(w7.max)}Y9.getCenter(Z);let Q=0;for(let K=0,W=J.count;K<W;K++)f8.fromBufferAttribute(J,K),Q=Math.max(Q,Z.distanceToSquared(f8));if($)for(let K=0,W=$.length;K<W;K++){let Y=$[K],X=this.morphTargetsRelative;for(let H=0,q=Y.count;H<q;H++){if(f8.fromBufferAttribute(Y,H),X)pJ.fromBufferAttribute(J,H),f8.add(pJ);Q=Math.max(Q,Z.distanceToSquared(f8))}}if(this.boundingSphere.radius=Math.sqrt(Q),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let Z=J.array,Q=$.position.array,K=$.normal.array,W=$.uv.array,Y=Q.length/3;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new v8(new Float32Array(4*Y),4));let X=this.getAttribute("tangent").array,H=[],q=[];for(let I=0;I<Y;I++)H[I]=new T,q[I]=new T;let U=new T,F=new T,V=new T,G=new Y0,N=new Y0,E=new Y0,O=new T,D=new T;function R(I,k,b){U.fromArray(Q,I*3),F.fromArray(Q,k*3),V.fromArray(Q,b*3),G.fromArray(W,I*2),N.fromArray(W,k*2),E.fromArray(W,b*2),F.sub(U),V.sub(U),N.sub(G),E.sub(G);let n=1/(N.x*E.y-E.x*N.y);if(!isFinite(n))return;O.copy(F).multiplyScalar(E.y).addScaledVector(V,-N.y).multiplyScalar(n),D.copy(V).multiplyScalar(N.x).addScaledVector(F,-E.x).multiplyScalar(n),H[I].add(O),H[k].add(O),H[b].add(O),q[I].add(D),q[k].add(D),q[b].add(D)}let B=this.groups;if(B.length===0)B=[{start:0,count:Z.length}];for(let I=0,k=B.length;I<k;++I){let b=B[I],n=b.start,r=b.count;for(let y=n,h=n+r;y<h;y+=3)R(Z[y+0],Z[y+1],Z[y+2])}let z=new T,C=new T,L=new T,A=new T;function _(I){L.fromArray(K,I*3),A.copy(L);let k=H[I];z.copy(k),z.sub(L.multiplyScalar(L.dot(k))).normalize(),C.crossVectors(A,k);let n=C.dot(q[I])<0?-1:1;X[I*4]=z.x,X[I*4+1]=z.y,X[I*4+2]=z.z,X[I*4+3]=n}for(let I=0,k=B.length;I<k;++I){let b=B[I],n=b.start,r=b.count;for(let y=n,h=n+r;y<h;y+=3)_(Z[y+0]),_(Z[y+1]),_(Z[y+2])}}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Z=this.getAttribute("normal");if(Z===void 0)Z=new v8(new Float32Array($.count*3),3),this.setAttribute("normal",Z);else for(let F=0,V=Z.count;F<V;F++)Z.setXYZ(F,0,0,0);let Q=new T,K=new T,W=new T,Y=new T,X=new T,H=new T,q=new T,U=new T;if(J)for(let F=0,V=J.count;F<V;F+=3){let G=J.getX(F+0),N=J.getX(F+1),E=J.getX(F+2);Q.fromBufferAttribute($,G),K.fromBufferAttribute($,N),W.fromBufferAttribute($,E),q.subVectors(W,K),U.subVectors(Q,K),q.cross(U),Y.fromBufferAttribute(Z,G),X.fromBufferAttribute(Z,N),H.fromBufferAttribute(Z,E),Y.add(q),X.add(q),H.add(q),Z.setXYZ(G,Y.x,Y.y,Y.z),Z.setXYZ(N,X.x,X.y,X.z),Z.setXYZ(E,H.x,H.y,H.z)}else for(let F=0,V=$.count;F<V;F+=3)Q.fromBufferAttribute($,F+0),K.fromBufferAttribute($,F+1),W.fromBufferAttribute($,F+2),q.subVectors(W,K),U.subVectors(Q,K),q.cross(U),Z.setXYZ(F+0,q.x,q.y,q.z),Z.setXYZ(F+1,q.x,q.y,q.z),Z.setXYZ(F+2,q.x,q.y,q.z);this.normalizeNormals(),Z.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Z=J.count;$<Z;$++)f8.fromBufferAttribute(J,$),f8.normalize(),J.setXYZ($,f8.x,f8.y,f8.z)}toNonIndexed(){function J(Y,X){let{array:H,itemSize:q,normalized:U}=Y,F=new H.constructor(X.length*q),V=0,G=0;for(let N=0,E=X.length;N<E;N++){if(Y.isInterleavedBufferAttribute)V=X[N]*Y.data.stride+Y.offset;else V=X[N]*q;for(let O=0;O<q;O++)F[G++]=H[V++]}return new v8(F,q,U)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new F8,Z=this.index.array,Q=this.attributes;for(let Y in Q){let X=Q[Y],H=J(X,Z);$.setAttribute(Y,H)}let K=this.morphAttributes;for(let Y in K){let X=[],H=K[Y];for(let q=0,U=H.length;q<U;q++){let F=H[q],V=J(F,Z);X.push(V)}$.morphAttributes[Y]=X}$.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;for(let Y=0,X=W.length;Y<X;Y++){let H=W[Y];$.addGroup(H.start,H.count,H.materialIndex)}return $}toJSON(){let J={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let X=this.parameters;for(let H in X)if(X[H]!==void 0)J[H]=X[H];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Z=this.attributes;for(let X in Z){let H=Z[X];J.data.attributes[X]=H.toJSON(J.data)}let Q={},K=!1;for(let X in this.morphAttributes){let H=this.morphAttributes[X],q=[];for(let U=0,F=H.length;U<F;U++){let V=H[U];q.push(V.toJSON(J.data))}if(q.length>0)Q[X]=q,K=!0}if(K)J.data.morphAttributes=Q,J.data.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;if(W.length>0)J.data.groups=JSON.parse(JSON.stringify(W));let Y=this.boundingSphere;if(Y!==null)J.data.boundingSphere={center:Y.center.toArray(),radius:Y.radius};return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Z=J.index;if(Z!==null)this.setIndex(Z.clone($));let Q=J.attributes;for(let H in Q){let q=Q[H];this.setAttribute(H,q.clone($))}let K=J.morphAttributes;for(let H in K){let q=[],U=K[H];for(let F=0,V=U.length;F<V;F++)q.push(U[F].clone($));this.morphAttributes[H]=q}this.morphTargetsRelative=J.morphTargetsRelative;let W=J.groups;for(let H=0,q=W.length;H<q;H++){let U=W[H];this.addGroup(U.start,U.count,U.materialIndex)}let Y=J.boundingBox;if(Y!==null)this.boundingBox=Y.clone();let X=J.boundingSphere;if(X!==null)this.boundingSphere=X.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var $6=new q8,EJ=new CJ,k$=new H7,Z6=new T,lJ=new T,cJ=new T,nJ=new T,oZ=new T,P$=new T,S$=new Y0,w$=new Y0,_$=new Y0,Q6=new T,K6=new T,W6=new T,T$=new T,j$=new T;class w extends E8{constructor(J=new F8,$=new X8){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Q.length;K<W;K++){let Y=Q[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}getVertexPosition(J,$){let Z=this.geometry,Q=Z.attributes.position,K=Z.morphAttributes.position,W=Z.morphTargetsRelative;$.fromBufferAttribute(Q,J);let Y=this.morphTargetInfluences;if(K&&Y){P$.set(0,0,0);for(let X=0,H=K.length;X<H;X++){let q=Y[X],U=K[X];if(q===0)continue;if(oZ.fromBufferAttribute(U,J),W)P$.addScaledVector(oZ,q);else P$.addScaledVector(oZ.sub($),q)}$.add(P$)}return $}raycast(J,$){let Z=this.geometry,Q=this.material,K=this.matrixWorld;if(Q===void 0)return;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(k$.copy(Z.boundingSphere),k$.applyMatrix4(K),EJ.copy(J.ray).recast(J.near),k$.containsPoint(EJ.origin)===!1){if(EJ.intersectSphere(k$,Z6)===null)return;if(EJ.origin.distanceToSquared(Z6)>(J.far-J.near)**2)return}if($6.copy(K).invert(),EJ.copy(J.ray).applyMatrix4($6),Z.boundingBox!==null){if(EJ.intersectsBox(Z.boundingBox)===!1)return}this._computeIntersections(J,$,EJ)}_computeIntersections(J,$,Z){let Q,K=this.geometry,W=this.material,Y=K.index,X=K.attributes.position,H=K.attributes.uv,q=K.attributes.uv1,U=K.attributes.normal,F=K.groups,V=K.drawRange;if(Y!==null)if(Array.isArray(W))for(let G=0,N=F.length;G<N;G++){let E=F[G],O=W[E.materialIndex],D=Math.max(E.start,V.start),R=Math.min(Y.count,Math.min(E.start+E.count,V.start+V.count));for(let B=D,z=R;B<z;B+=3){let C=Y.getX(B),L=Y.getX(B+1),A=Y.getX(B+2);if(Q=y$(this,O,J,Z,H,q,U,C,L,A),Q)Q.faceIndex=Math.floor(B/3),Q.face.materialIndex=E.materialIndex,$.push(Q)}}else{let G=Math.max(0,V.start),N=Math.min(Y.count,V.start+V.count);for(let E=G,O=N;E<O;E+=3){let D=Y.getX(E),R=Y.getX(E+1),B=Y.getX(E+2);if(Q=y$(this,W,J,Z,H,q,U,D,R,B),Q)Q.faceIndex=Math.floor(E/3),$.push(Q)}}else if(X!==void 0)if(Array.isArray(W))for(let G=0,N=F.length;G<N;G++){let E=F[G],O=W[E.materialIndex],D=Math.max(E.start,V.start),R=Math.min(X.count,Math.min(E.start+E.count,V.start+V.count));for(let B=D,z=R;B<z;B+=3){let C=B,L=B+1,A=B+2;if(Q=y$(this,O,J,Z,H,q,U,C,L,A),Q)Q.faceIndex=Math.floor(B/3),Q.face.materialIndex=E.materialIndex,$.push(Q)}}else{let G=Math.max(0,V.start),N=Math.min(X.count,V.start+V.count);for(let E=G,O=N;E<O;E+=3){let D=E,R=E+1,B=E+2;if(Q=y$(this,W,J,Z,H,q,U,D,R,B),Q)Q.faceIndex=Math.floor(E/3),$.push(Q)}}}}function PX(J,$,Z,Q,K,W,Y,X){let H;if($.side===1)H=Q.intersectTriangle(Y,W,K,!0,X);else H=Q.intersectTriangle(K,W,Y,$.side===0,X);if(H===null)return null;j$.copy(X),j$.applyMatrix4(J.matrixWorld);let q=Z.ray.origin.distanceTo(j$);if(q<Z.near||q>Z.far)return null;return{distance:q,point:j$.clone(),object:J}}function y$(J,$,Z,Q,K,W,Y,X,H,q){J.getVertexPosition(X,lJ),J.getVertexPosition(H,cJ),J.getVertexPosition(q,nJ);let U=PX(J,$,Z,Q,lJ,cJ,nJ,T$);if(U){if(K)S$.fromBufferAttribute(K,X),w$.fromBufferAttribute(K,H),_$.fromBufferAttribute(K,q),U.uv=O9.getInterpolation(T$,lJ,cJ,nJ,S$,w$,_$,new Y0);if(W)S$.fromBufferAttribute(W,X),w$.fromBufferAttribute(W,H),_$.fromBufferAttribute(W,q),U.uv1=O9.getInterpolation(T$,lJ,cJ,nJ,S$,w$,_$,new Y0),U.uv2=U.uv1;if(Y){if(Q6.fromBufferAttribute(Y,X),K6.fromBufferAttribute(Y,H),W6.fromBufferAttribute(Y,q),U.normal=O9.getInterpolation(T$,lJ,cJ,nJ,Q6,K6,W6,new T),U.normal.dot(Q.direction)>0)U.normal.multiplyScalar(-1)}let F={a:X,b:H,c:q,normal:new T,materialIndex:0};O9.getNormal(lJ,cJ,nJ,F.normal),U.face=F}return U}class J0 extends F8{constructor(J=1,$=1,Z=1,Q=1,K=1,W=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Z,widthSegments:Q,heightSegments:K,depthSegments:W};let Y=this;Q=Math.floor(Q),K=Math.floor(K),W=Math.floor(W);let X=[],H=[],q=[],U=[],F=0,V=0;G("z","y","x",-1,-1,Z,$,J,W,K,0),G("z","y","x",1,-1,Z,$,-J,W,K,1),G("x","z","y",1,1,J,Z,$,Q,W,2),G("x","z","y",1,-1,J,Z,-$,Q,W,3),G("x","y","z",1,-1,J,$,Z,Q,K,4),G("x","y","z",-1,-1,J,$,-Z,Q,K,5),this.setIndex(X),this.setAttribute("position",new $8(H,3)),this.setAttribute("normal",new $8(q,3)),this.setAttribute("uv",new $8(U,2));function G(N,E,O,D,R,B,z,C,L,A,_){let I=B/L,k=z/A,b=B/2,n=z/2,r=C/2,y=L+1,h=A+1,m=0,i=0,d=new T;for(let g=0;g<h;g++){let p=g*k-n;for(let t=0;t<y;t++){let v=t*I-b;d[N]=v*D,d[E]=p*R,d[O]=r,H.push(d.x,d.y,d.z),d[N]=0,d[E]=0,d[O]=C>0?1:-1,q.push(d.x,d.y,d.z),U.push(t/L),U.push(1-g/A),m+=1}}for(let g=0;g<A;g++)for(let p=0;p<L;p++){let t=F+p+y*g,v=F+p+y*(g+1),e=F+(p+1)+y*(g+1),H0=F+(p+1)+y*g;X.push(t,v,H0),X.push(v,e,H0),i+=6}Y.addGroup(V,i,_),V+=i,F+=m}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new J0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}function W7(J){let $={};for(let Z in J){$[Z]={};for(let Q in J[Z]){let K=J[Z][Q];if(K&&(K.isColor||K.isMatrix3||K.isMatrix4||K.isVector2||K.isVector3||K.isVector4||K.isTexture||K.isQuaternion))if(K.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Z][Q]=null;else $[Z][Q]=K.clone();else if(Array.isArray(K))$[Z][Q]=K.slice();else $[Z][Q]=K}}return $}function o8(J){let $={};for(let Z=0;Z<J.length;Z++){let Q=W7(J[Z]);for(let K in Q)$[K]=Q[K]}return $}function SX(J){let $=[];for(let Z=0;Z<J.length;Z++)$.push(J[Z].clone());return $}function a6(J){if(J.getRenderTarget()===null)return J.outputColorSpace;return W8.workingColorSpace}var wX={clone:W7,merge:o8},_X=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,TX=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ZJ extends d9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_X,this.fragmentShader=TX,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=W7(J.uniforms),this.uniformsGroups=SX(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let Q in this.uniforms){let W=this.uniforms[Q].value;if(W&&W.isTexture)$.uniforms[Q]={type:"t",value:W.toJSON(J).uuid};else if(W&&W.isColor)$.uniforms[Q]={type:"c",value:W.getHex()};else if(W&&W.isVector2)$.uniforms[Q]={type:"v2",value:W.toArray()};else if(W&&W.isVector3)$.uniforms[Q]={type:"v3",value:W.toArray()};else if(W&&W.isVector4)$.uniforms[Q]={type:"v4",value:W.toArray()};else if(W&&W.isMatrix3)$.uniforms[Q]={type:"m3",value:W.toArray()};else if(W&&W.isMatrix4)$.uniforms[Q]={type:"m4",value:W.toArray()};else $.uniforms[Q]={value:W}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Z={};for(let Q in this.extensions)if(this.extensions[Q]===!0)Z[Q]=!0;if(Object.keys(Z).length>0)$.extensions=Z;return $}}class CQ extends E8{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new q8,this.projectionMatrix=new q8,this.projectionMatrixInverse=new q8,this.coordinateSystem=2000}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){super.updateMatrixWorld(J),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(J,$){super.updateWorldMatrix(J,$),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class l8 extends CQ{constructor(J=50,$=1,Z=0.1,Q=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Z,this.far=Q,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=K7*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(x7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return K7*2*Math.atan(Math.tan(x7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(J,$,Z,Q,K,W){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Z,this.view.offsetY=Q,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(x7*0.5*this.fov)/this.zoom,Z=2*$,Q=this.aspect*Z,K=-0.5*Q,W=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:X,fullHeight:H}=W;K+=W.offsetX*Q/X,$-=W.offsetY*Z/H,Q*=W.width/X,Z*=W.height/H}let Y=this.filmOffset;if(Y!==0)K+=J*Y/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Q,$,$-Z,J,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}var sJ=-90,iJ=1;class t6 extends E8{constructor(J,$,Z){super();this.type="CubeCamera",this.renderTarget=Z,this.coordinateSystem=null,this.activeMipmapLevel=0;let Q=new l8(sJ,iJ,J,$);Q.layers=this.layers,this.add(Q);let K=new l8(sJ,iJ,J,$);K.layers=this.layers,this.add(K);let W=new l8(sJ,iJ,J,$);W.layers=this.layers,this.add(W);let Y=new l8(sJ,iJ,J,$);Y.layers=this.layers,this.add(Y);let X=new l8(sJ,iJ,J,$);X.layers=this.layers,this.add(X);let H=new l8(sJ,iJ,J,$);H.layers=this.layers,this.add(H)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Z,Q,K,W,Y,X]=$;for(let H of $)this.remove(H);if(J===2000)Z.up.set(0,1,0),Z.lookAt(1,0,0),Q.up.set(0,1,0),Q.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),W.up.set(0,0,1),W.lookAt(0,-1,0),Y.up.set(0,1,0),Y.lookAt(0,0,1),X.up.set(0,1,0),X.lookAt(0,0,-1);else if(J===2001)Z.up.set(0,-1,0),Z.lookAt(-1,0,0),Q.up.set(0,-1,0),Q.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),W.up.set(0,0,-1),W.lookAt(0,-1,0),Y.up.set(0,-1,0),Y.lookAt(0,0,1),X.up.set(0,-1,0),X.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let H of $)this.add(H),H.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Z,activeMipmapLevel:Q}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,W,Y,X,H,q]=this.children,U=J.getRenderTarget(),F=J.getActiveCubeFace(),V=J.getActiveMipmapLevel(),G=J.xr.enabled;J.xr.enabled=!1;let N=Z.texture.generateMipmaps;Z.texture.generateMipmaps=!1,J.setRenderTarget(Z,0,Q),J.render($,K),J.setRenderTarget(Z,1,Q),J.render($,W),J.setRenderTarget(Z,2,Q),J.render($,Y),J.setRenderTarget(Z,3,Q),J.render($,X),J.setRenderTarget(Z,4,Q),J.render($,H),Z.texture.generateMipmaps=N,J.setRenderTarget(Z,5,Q),J.render($,q),J.setRenderTarget(U,F,V),J.xr.enabled=G,Z.texture.needsPMREMUpdate=!0}}class AQ extends t8{constructor(J,$,Z,Q,K,W,Y,X,H,q){J=J!==void 0?J:[],$=$!==void 0?$:301;super(J,$,Z,Q,K,W,Y,X,H,q);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class e6 extends $J{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Z={width:J,height:J,depth:1},Q=[Z,Z,Z,Z,Z,Z];if($.encoding!==void 0)f7("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),$.colorSpace=$.encoding===3001?"srgb":"";this.texture=new AQ(Q,$.mapping,$.wrapS,$.wrapT,$.magFilter,$.minFilter,$.format,$.type,$.anisotropy,$.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=$.generateMipmaps!==void 0?$.generateMipmaps:!1,this.texture.minFilter=$.minFilter!==void 0?$.minFilter:1006}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Z={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Q=new J0(5,5,5),K=new ZJ({name:"CubemapFromEquirect",uniforms:W7(Z.uniforms),vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,side:1,blending:0});K.uniforms.tEquirect.value=$;let W=new w(Q,K),Y=$.minFilter;if($.minFilter===1008)$.minFilter=1006;return new t6(1,10,this).update(J,W),$.minFilter=Y,W.geometry.dispose(),W.material.dispose(),this}clear(J,$,Z,Q){let K=J.getRenderTarget();for(let W=0;W<6;W++)J.setRenderTarget(this,W),J.clear($,Z,Q);J.setRenderTarget(K)}}var rZ=new T,jX=new T,yX=new r0;class A9{constructor(J=new T(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Z,Q){return this.normal.set(J,$,Z),this.constant=Q,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Z){let Q=rZ.subVectors(Z,$).cross(jX.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(Q,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$){let Z=J.delta(rZ),Q=this.normal.dot(Z);if(Q===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Q;if(K<0||K>1)return null;return $.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let $=this.distanceToPoint(J.start),Z=this.distanceToPoint(J.end);return $<0&&Z>0||Z<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Z=$||yX.getNormalMatrix(J),Q=this.coplanarPoint(rZ).applyMatrix4(J),K=this.normal.applyMatrix3(Z).normalize();return this.constant=-Q.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var NJ=new H7,x$=new T;class $Z{constructor(J=new A9,$=new A9,Z=new A9,Q=new A9,K=new A9,W=new A9){this.planes=[J,$,Z,Q,K,W]}set(J,$,Z,Q,K,W){let Y=this.planes;return Y[0].copy(J),Y[1].copy($),Y[2].copy(Z),Y[3].copy(Q),Y[4].copy(K),Y[5].copy(W),this}copy(J){let $=this.planes;for(let Z=0;Z<6;Z++)$[Z].copy(J.planes[Z]);return this}setFromProjectionMatrix(J,$=2000){let Z=this.planes,Q=J.elements,K=Q[0],W=Q[1],Y=Q[2],X=Q[3],H=Q[4],q=Q[5],U=Q[6],F=Q[7],V=Q[8],G=Q[9],N=Q[10],E=Q[11],O=Q[12],D=Q[13],R=Q[14],B=Q[15];if(Z[0].setComponents(X-K,F-H,E-V,B-O).normalize(),Z[1].setComponents(X+K,F+H,E+V,B+O).normalize(),Z[2].setComponents(X+W,F+q,E+G,B+D).normalize(),Z[3].setComponents(X-W,F-q,E-G,B-D).normalize(),Z[4].setComponents(X-Y,F-U,E-N,B-R).normalize(),$===2000)Z[5].setComponents(X+Y,F+U,E+N,B+R).normalize();else if($===2001)Z[5].setComponents(Y,U,N,R).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();NJ.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();NJ.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(NJ)}intersectsSprite(J){return NJ.center.set(0,0,0),NJ.radius=0.7071067811865476,NJ.applyMatrix4(J.matrixWorld),this.intersectsSphere(NJ)}intersectsSphere(J){let $=this.planes,Z=J.center,Q=-J.radius;for(let K=0;K<6;K++)if($[K].distanceToPoint(Z)<Q)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Z=0;Z<6;Z++){let Q=$[Z];if(x$.x=Q.normal.x>0?J.max.x:J.min.x,x$.y=Q.normal.y>0?J.max.y:J.min.y,x$.z=Q.normal.z>0?J.max.z:J.min.z,Q.distanceToPoint(x$)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Z=0;Z<6;Z++)if($[Z].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function JK(){let J=null,$=!1,Z=null,Q=null;function K(W,Y){Z(W,Y),Q=J.requestAnimationFrame(K)}return{start:function(){if($===!0)return;if(Z===null)return;Q=J.requestAnimationFrame(K),$=!0},stop:function(){J.cancelAnimationFrame(Q),$=!1},setAnimationLoop:function(W){Z=W},setContext:function(W){J=W}}}function xX(J,$){let Z=$.isWebGL2,Q=new WeakMap;function K(q,U){let{array:F,usage:V}=q,G=F.byteLength,N=J.createBuffer();J.bindBuffer(U,N),J.bufferData(U,F,V),q.onUploadCallback();let E;if(F instanceof Float32Array)E=J.FLOAT;else if(F instanceof Uint16Array)if(q.isFloat16BufferAttribute)if(Z)E=J.HALF_FLOAT;else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=J.UNSIGNED_SHORT;else if(F instanceof Int16Array)E=J.SHORT;else if(F instanceof Uint32Array)E=J.UNSIGNED_INT;else if(F instanceof Int32Array)E=J.INT;else if(F instanceof Int8Array)E=J.BYTE;else if(F instanceof Uint8Array)E=J.UNSIGNED_BYTE;else if(F instanceof Uint8ClampedArray)E=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+F);return{buffer:N,type:E,bytesPerElement:F.BYTES_PER_ELEMENT,version:q.version,size:G}}function W(q,U,F){let{array:V,_updateRange:G,updateRanges:N}=U;if(J.bindBuffer(F,q),G.count===-1&&N.length===0)J.bufferSubData(F,0,V);if(N.length!==0){for(let E=0,O=N.length;E<O;E++){let D=N[E];if(Z)J.bufferSubData(F,D.start*V.BYTES_PER_ELEMENT,V,D.start,D.count);else J.bufferSubData(F,D.start*V.BYTES_PER_ELEMENT,V.subarray(D.start,D.start+D.count))}U.clearUpdateRanges()}if(G.count!==-1){if(Z)J.bufferSubData(F,G.offset*V.BYTES_PER_ELEMENT,V,G.offset,G.count);else J.bufferSubData(F,G.offset*V.BYTES_PER_ELEMENT,V.subarray(G.offset,G.offset+G.count));G.count=-1}U.onUploadCallback()}function Y(q){if(q.isInterleavedBufferAttribute)q=q.data;return Q.get(q)}function X(q){if(q.isInterleavedBufferAttribute)q=q.data;let U=Q.get(q);if(U)J.deleteBuffer(U.buffer),Q.delete(q)}function H(q,U){if(q.isGLBufferAttribute){let V=Q.get(q);if(!V||V.version<q.version)Q.set(q,{buffer:q.buffer,type:q.type,bytesPerElement:q.elementSize,version:q.version});return}if(q.isInterleavedBufferAttribute)q=q.data;let F=Q.get(q);if(F===void 0)Q.set(q,K(q,U));else if(F.version<q.version){if(F.size!==q.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(F.buffer,q,U),F.version=q.version}}return{get:Y,remove:X,update:H}}class H9 extends F8{constructor(J=1,$=1,Z=1,Q=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Z,heightSegments:Q};let K=J/2,W=$/2,Y=Math.floor(Z),X=Math.floor(Q),H=Y+1,q=X+1,U=J/Y,F=$/X,V=[],G=[],N=[],E=[];for(let O=0;O<q;O++){let D=O*F-W;for(let R=0;R<H;R++){let B=R*U-K;G.push(B,-D,0),N.push(0,0,1),E.push(R/Y),E.push(1-O/X)}}for(let O=0;O<X;O++)for(let D=0;D<Y;D++){let R=D+H*O,B=D+H*(O+1),z=D+1+H*(O+1),C=D+1+H*O;V.push(R,B,C),V.push(B,z,C)}this.setIndex(V),this.setAttribute("position",new $8(G,3)),this.setAttribute("normal",new $8(N,3)),this.setAttribute("uv",new $8(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new H9(J.width,J.height,J.widthSegments,J.heightSegments)}}var bX=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fX=`#ifdef USE_ALPHAHASH
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
#endif`,hX=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vX=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gX=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,mX=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uX=`#ifdef USE_AOMAP
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
#endif`,dX=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pX=`#ifdef USE_BATCHING
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
#endif`,lX=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,cX=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nX=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sX=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iX=`#ifdef USE_IRIDESCENCE
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
#endif`,oX=`#ifdef USE_BUMPMAP
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
#endif`,rX=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,aX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,JY=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$Y=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ZY=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,QY=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,KY=`#define PI 3.141592653589793
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
} // validated`,WY=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,XY=`vec3 transformedNormal = objectNormal;
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
#endif`,YY=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,HY=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qY=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,UY=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FY="gl_FragColor = linearToOutputTexel( gl_FragColor );",VY=`
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
}`,GY=`#ifdef USE_ENVMAP
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
#endif`,OY=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,DY=`#ifdef USE_ENVMAP
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
#endif`,EY=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,NY=`#ifdef USE_ENVMAP
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
#endif`,RY=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,BY=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zY=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IY=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,LY=`#ifdef USE_GRADIENTMAP
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
}`,CY=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,AY=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,MY=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,PY=`uniform bool receiveShadow;
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
#endif`,SY=`#ifdef USE_ENVMAP
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
#endif`,wY=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_Y=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,TY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yY=`PhysicalMaterial material;
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
#endif`,xY=`struct PhysicalMaterial {
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
}`,bY=`
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
#endif`,fY=`#if defined( RE_IndirectDiffuse )
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
#endif`,hY=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vY=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gY=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mY=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,uY=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,dY=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pY=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lY=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cY=`#if defined( USE_POINTS_UV )
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
#endif`,nY=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sY=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iY=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,oY=`#ifdef USE_MORPHNORMALS
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
#endif`,rY=`#ifdef USE_MORPHTARGETS
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
#endif`,aY=`#ifdef USE_MORPHTARGETS
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
#endif`,tY=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,eY=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,J1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Q1=`#ifdef USE_NORMALMAP
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
#endif`,K1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,W1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,X1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Y1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,U1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,V1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,G1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,D1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,N1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,R1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B1=`float getShadowMask() {
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
}`,z1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,I1=`#ifdef USE_SKINNING
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
#endif`,L1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,C1=`#ifdef USE_SKINNING
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
#endif`,A1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,M1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,k1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,P1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,S1=`#ifdef USE_TRANSMISSION
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
#endif`,w1=`#ifdef USE_TRANSMISSION
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
#endif`,_1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,x1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,b1=`uniform sampler2D t2D;
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
}`,f1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,v1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m1=`#include <common>
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
}`,u1=`#if DEPTH_PACKING == 3200
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
}`,d1=`#define DISTANCE
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
}`,p1=`#define DISTANCE
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
}`,l1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,c1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n1=`uniform float scale;
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
}`,s1=`uniform vec3 diffuse;
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
}`,i1=`#include <common>
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
}`,o1=`uniform vec3 diffuse;
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
}`,r1=`#define LAMBERT
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
}`,a1=`#define LAMBERT
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
}`,t1=`#define MATCAP
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
}`,e1=`#define MATCAP
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
}`,JH=`#define NORMAL
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
}`,$H=`#define NORMAL
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
}`,ZH=`#define PHONG
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
}`,QH=`#define PHONG
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
}`,KH=`#define STANDARD
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
}`,WH=`#define STANDARD
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
}`,XH=`#define TOON
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
}`,YH=`#define TOON
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
}`,HH=`uniform float size;
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
}`,qH=`uniform vec3 diffuse;
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
}`,UH=`#include <common>
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
}`,FH=`uniform vec3 color;
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
}`,VH=`uniform float rotation;
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
}`,GH=`uniform vec3 diffuse;
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
}`,s0={alphahash_fragment:bX,alphahash_pars_fragment:fX,alphamap_fragment:hX,alphamap_pars_fragment:vX,alphatest_fragment:gX,alphatest_pars_fragment:mX,aomap_fragment:uX,aomap_pars_fragment:dX,batching_pars_vertex:pX,batching_vertex:lX,begin_vertex:cX,beginnormal_vertex:nX,bsdfs:sX,iridescence_fragment:iX,bumpmap_pars_fragment:oX,clipping_planes_fragment:rX,clipping_planes_pars_fragment:aX,clipping_planes_pars_vertex:tX,clipping_planes_vertex:eX,color_fragment:JY,color_pars_fragment:$Y,color_pars_vertex:ZY,color_vertex:QY,common:KY,cube_uv_reflection_fragment:WY,defaultnormal_vertex:XY,displacementmap_pars_vertex:YY,displacementmap_vertex:HY,emissivemap_fragment:qY,emissivemap_pars_fragment:UY,colorspace_fragment:FY,colorspace_pars_fragment:VY,envmap_fragment:GY,envmap_common_pars_fragment:OY,envmap_pars_fragment:DY,envmap_pars_vertex:EY,envmap_physical_pars_fragment:SY,envmap_vertex:NY,fog_vertex:RY,fog_pars_vertex:BY,fog_fragment:zY,fog_pars_fragment:IY,gradientmap_pars_fragment:LY,lightmap_fragment:CY,lightmap_pars_fragment:AY,lights_lambert_fragment:MY,lights_lambert_pars_fragment:kY,lights_pars_begin:PY,lights_toon_fragment:wY,lights_toon_pars_fragment:_Y,lights_phong_fragment:TY,lights_phong_pars_fragment:jY,lights_physical_fragment:yY,lights_physical_pars_fragment:xY,lights_fragment_begin:bY,lights_fragment_maps:fY,lights_fragment_end:hY,logdepthbuf_fragment:vY,logdepthbuf_pars_fragment:gY,logdepthbuf_pars_vertex:mY,logdepthbuf_vertex:uY,map_fragment:dY,map_pars_fragment:pY,map_particle_fragment:lY,map_particle_pars_fragment:cY,metalnessmap_fragment:nY,metalnessmap_pars_fragment:sY,morphcolor_vertex:iY,morphnormal_vertex:oY,morphtarget_pars_vertex:rY,morphtarget_vertex:aY,normal_fragment_begin:tY,normal_fragment_maps:eY,normal_pars_fragment:J1,normal_pars_vertex:$1,normal_vertex:Z1,normalmap_pars_fragment:Q1,clearcoat_normal_fragment_begin:K1,clearcoat_normal_fragment_maps:W1,clearcoat_pars_fragment:X1,iridescence_pars_fragment:Y1,opaque_fragment:H1,packing:q1,premultiplied_alpha_fragment:U1,project_vertex:F1,dithering_fragment:V1,dithering_pars_fragment:G1,roughnessmap_fragment:O1,roughnessmap_pars_fragment:D1,shadowmap_pars_fragment:E1,shadowmap_pars_vertex:N1,shadowmap_vertex:R1,shadowmask_pars_fragment:B1,skinbase_vertex:z1,skinning_pars_vertex:I1,skinning_vertex:L1,skinnormal_vertex:C1,specularmap_fragment:A1,specularmap_pars_fragment:M1,tonemapping_fragment:k1,tonemapping_pars_fragment:P1,transmission_fragment:S1,transmission_pars_fragment:w1,uv_pars_fragment:_1,uv_pars_vertex:T1,uv_vertex:j1,worldpos_vertex:y1,background_vert:x1,background_frag:b1,backgroundCube_vert:f1,backgroundCube_frag:h1,cube_vert:v1,cube_frag:g1,depth_vert:m1,depth_frag:u1,distanceRGBA_vert:d1,distanceRGBA_frag:p1,equirect_vert:l1,equirect_frag:c1,linedashed_vert:n1,linedashed_frag:s1,meshbasic_vert:i1,meshbasic_frag:o1,meshlambert_vert:r1,meshlambert_frag:a1,meshmatcap_vert:t1,meshmatcap_frag:e1,meshnormal_vert:JH,meshnormal_frag:$H,meshphong_vert:ZH,meshphong_frag:QH,meshphysical_vert:KH,meshphysical_frag:WH,meshtoon_vert:XH,meshtoon_frag:YH,points_vert:HH,points_frag:qH,shadow_vert:UH,shadow_frag:FH,sprite_vert:VH,sprite_frag:GH},B0={common:{diffuse:{value:new e0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new r0},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new r0}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new r0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new r0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new r0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new r0},normalScale:{value:new Y0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new r0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new r0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new r0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new r0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new e0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new e0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0},uvTransform:{value:new r0}},sprite:{diffuse:{value:new e0(16777215)},opacity:{value:1},center:{value:new Y0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new r0},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0}}},M9={basic:{uniforms:o8([B0.common,B0.specularmap,B0.envmap,B0.aomap,B0.lightmap,B0.fog]),vertexShader:s0.meshbasic_vert,fragmentShader:s0.meshbasic_frag},lambert:{uniforms:o8([B0.common,B0.specularmap,B0.envmap,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.fog,B0.lights,{emissive:{value:new e0(0)}}]),vertexShader:s0.meshlambert_vert,fragmentShader:s0.meshlambert_frag},phong:{uniforms:o8([B0.common,B0.specularmap,B0.envmap,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.fog,B0.lights,{emissive:{value:new e0(0)},specular:{value:new e0(1118481)},shininess:{value:30}}]),vertexShader:s0.meshphong_vert,fragmentShader:s0.meshphong_frag},standard:{uniforms:o8([B0.common,B0.envmap,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.roughnessmap,B0.metalnessmap,B0.fog,B0.lights,{emissive:{value:new e0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:s0.meshphysical_vert,fragmentShader:s0.meshphysical_frag},toon:{uniforms:o8([B0.common,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.gradientmap,B0.fog,B0.lights,{emissive:{value:new e0(0)}}]),vertexShader:s0.meshtoon_vert,fragmentShader:s0.meshtoon_frag},matcap:{uniforms:o8([B0.common,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.fog,{matcap:{value:null}}]),vertexShader:s0.meshmatcap_vert,fragmentShader:s0.meshmatcap_frag},points:{uniforms:o8([B0.points,B0.fog]),vertexShader:s0.points_vert,fragmentShader:s0.points_frag},dashed:{uniforms:o8([B0.common,B0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:s0.linedashed_vert,fragmentShader:s0.linedashed_frag},depth:{uniforms:o8([B0.common,B0.displacementmap]),vertexShader:s0.depth_vert,fragmentShader:s0.depth_frag},normal:{uniforms:o8([B0.common,B0.bumpmap,B0.normalmap,B0.displacementmap,{opacity:{value:1}}]),vertexShader:s0.meshnormal_vert,fragmentShader:s0.meshnormal_frag},sprite:{uniforms:o8([B0.sprite,B0.fog]),vertexShader:s0.sprite_vert,fragmentShader:s0.sprite_frag},background:{uniforms:{uvTransform:{value:new r0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:s0.background_vert,fragmentShader:s0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:s0.backgroundCube_vert,fragmentShader:s0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:s0.cube_vert,fragmentShader:s0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:s0.equirect_vert,fragmentShader:s0.equirect_frag},distanceRGBA:{uniforms:o8([B0.common,B0.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:s0.distanceRGBA_vert,fragmentShader:s0.distanceRGBA_frag},shadow:{uniforms:o8([B0.lights,B0.fog,{color:{value:new e0(0)},opacity:{value:1}}]),vertexShader:s0.shadow_vert,fragmentShader:s0.shadow_frag}};M9.physical={uniforms:o8([M9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new r0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new r0},clearcoatNormalScale:{value:new Y0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new r0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new r0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new r0},sheen:{value:0},sheenColor:{value:new e0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new r0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new r0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new r0},transmissionSamplerSize:{value:new Y0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new r0},attenuationDistance:{value:0},attenuationColor:{value:new e0(0)},specularColor:{value:new e0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new r0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new r0},anisotropyVector:{value:new Y0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new r0}}]),vertexShader:s0.meshphysical_vert,fragmentShader:s0.meshphysical_frag};var b$={r:0,b:0,g:0};function OH(J,$,Z,Q,K,W,Y){let X=new e0(0),H=W===!0?0:1,q,U,F=null,V=0,G=null;function N(O,D){let R=!1,B=D.isScene===!0?D.background:null;if(B&&B.isTexture)B=(D.backgroundBlurriness>0?Z:$).get(B);if(B===null)E(X,H);else if(B&&B.isColor)E(B,1),R=!0;let z=J.xr.getEnvironmentBlendMode();if(z==="additive")Q.buffers.color.setClear(0,0,0,1,Y);else if(z==="alpha-blend")Q.buffers.color.setClear(0,0,0,0,Y);if(J.autoClear||R)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(B&&(B.isCubeTexture||B.mapping===306)){if(U===void 0)U=new w(new J0(1,1,1),new ZJ({name:"BackgroundCubeMaterial",uniforms:W7(M9.backgroundCube.uniforms),vertexShader:M9.backgroundCube.vertexShader,fragmentShader:M9.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(C,L,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),K.update(U);if(U.material.uniforms.envMap.value=B,U.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,U.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,U.material.toneMapped=W8.getTransfer(B.colorSpace)!=="srgb",F!==B||V!==B.version||G!==J.toneMapping)U.material.needsUpdate=!0,F=B,V=B.version,G=J.toneMapping;U.layers.enableAll(),O.unshift(U,U.geometry,U.material,0,0,null)}else if(B&&B.isTexture){if(q===void 0)q=new w(new H9(2,2),new ZJ({name:"BackgroundMaterial",uniforms:W7(M9.background.uniforms),vertexShader:M9.background.vertexShader,fragmentShader:M9.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),q.geometry.deleteAttribute("normal"),Object.defineProperty(q.material,"map",{get:function(){return this.uniforms.t2D.value}}),K.update(q);if(q.material.uniforms.t2D.value=B,q.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,q.material.toneMapped=W8.getTransfer(B.colorSpace)!=="srgb",B.matrixAutoUpdate===!0)B.updateMatrix();if(q.material.uniforms.uvTransform.value.copy(B.matrix),F!==B||V!==B.version||G!==J.toneMapping)q.material.needsUpdate=!0,F=B,V=B.version,G=J.toneMapping;q.layers.enableAll(),O.unshift(q,q.geometry,q.material,0,0,null)}}function E(O,D){O.getRGB(b$,a6(J)),Q.buffers.color.setClear(b$.r,b$.g,b$.b,D,Y)}return{getClearColor:function(){return X},setClearColor:function(O,D=1){X.set(O),H=D,E(X,H)},getClearAlpha:function(){return H},setClearAlpha:function(O){H=O,E(X,H)},render:N}}function DH(J,$,Z,Q){let K=J.getParameter(J.MAX_VERTEX_ATTRIBS),W=Q.isWebGL2?null:$.get("OES_vertex_array_object"),Y=Q.isWebGL2||W!==null,X={},H=O(null),q=H,U=!1;function F(y,h,m,i,d){let g=!1;if(Y){let p=E(i,m,h);if(q!==p)q=p,G(q.object);if(g=D(y,i,m,d),g)R(y,i,m,d)}else{let p=h.wireframe===!0;if(q.geometry!==i.id||q.program!==m.id||q.wireframe!==p)q.geometry=i.id,q.program=m.id,q.wireframe=p,g=!0}if(d!==null)Z.update(d,J.ELEMENT_ARRAY_BUFFER);if(g||U){if(U=!1,_(y,h,m,i),d!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Z.get(d).buffer)}}function V(){if(Q.isWebGL2)return J.createVertexArray();return W.createVertexArrayOES()}function G(y){if(Q.isWebGL2)return J.bindVertexArray(y);return W.bindVertexArrayOES(y)}function N(y){if(Q.isWebGL2)return J.deleteVertexArray(y);return W.deleteVertexArrayOES(y)}function E(y,h,m){let i=m.wireframe===!0,d=X[y.id];if(d===void 0)d={},X[y.id]=d;let g=d[h.id];if(g===void 0)g={},d[h.id]=g;let p=g[i];if(p===void 0)p=O(V()),g[i]=p;return p}function O(y){let h=[],m=[],i=[];for(let d=0;d<K;d++)h[d]=0,m[d]=0,i[d]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:h,enabledAttributes:m,attributeDivisors:i,object:y,attributes:{},index:null}}function D(y,h,m,i){let d=q.attributes,g=h.attributes,p=0,t=m.getAttributes();for(let v in t)if(t[v].location>=0){let H0=d[v],V0=g[v];if(V0===void 0){if(v==="instanceMatrix"&&y.instanceMatrix)V0=y.instanceMatrix;if(v==="instanceColor"&&y.instanceColor)V0=y.instanceColor}if(H0===void 0)return!0;if(H0.attribute!==V0)return!0;if(V0&&H0.data!==V0.data)return!0;p++}if(q.attributesNum!==p)return!0;if(q.index!==i)return!0;return!1}function R(y,h,m,i){let d={},g=h.attributes,p=0,t=m.getAttributes();for(let v in t)if(t[v].location>=0){let H0=g[v];if(H0===void 0){if(v==="instanceMatrix"&&y.instanceMatrix)H0=y.instanceMatrix;if(v==="instanceColor"&&y.instanceColor)H0=y.instanceColor}let V0={};if(V0.attribute=H0,H0&&H0.data)V0.data=H0.data;d[v]=V0,p++}q.attributes=d,q.attributesNum=p,q.index=i}function B(){let y=q.newAttributes;for(let h=0,m=y.length;h<m;h++)y[h]=0}function z(y){C(y,0)}function C(y,h){let{newAttributes:m,enabledAttributes:i,attributeDivisors:d}=q;if(m[y]=1,i[y]===0)J.enableVertexAttribArray(y),i[y]=1;if(d[y]!==h)(Q.isWebGL2?J:$.get("ANGLE_instanced_arrays"))[Q.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](y,h),d[y]=h}function L(){let{newAttributes:y,enabledAttributes:h}=q;for(let m=0,i=h.length;m<i;m++)if(h[m]!==y[m])J.disableVertexAttribArray(m),h[m]=0}function A(y,h,m,i,d,g,p){if(p===!0)J.vertexAttribIPointer(y,h,m,d,g);else J.vertexAttribPointer(y,h,m,i,d,g)}function _(y,h,m,i){if(Q.isWebGL2===!1&&(y.isInstancedMesh||i.isInstancedBufferGeometry)){if($.get("ANGLE_instanced_arrays")===null)return}B();let d=i.attributes,g=m.getAttributes(),p=h.defaultAttributeValues;for(let t in g){let v=g[t];if(v.location>=0){let e=d[t];if(e===void 0){if(t==="instanceMatrix"&&y.instanceMatrix)e=y.instanceMatrix;if(t==="instanceColor"&&y.instanceColor)e=y.instanceColor}if(e!==void 0){let{normalized:H0,itemSize:V0}=e,R0=Z.get(e);if(R0===void 0)continue;let{buffer:x0,type:u0,bytesPerElement:_0}=R0,f0=Q.isWebGL2===!0&&(u0===J.INT||u0===J.UNSIGNED_INT||e.gpuType===1013);if(e.isInterleavedBufferAttribute){let x=e.data,O0=x.stride,W0=e.offset;if(x.isInstancedInterleavedBuffer){for(let K0=0;K0<v.locationSize;K0++)C(v.location+K0,x.meshPerAttribute);if(y.isInstancedMesh!==!0&&i._maxInstanceCount===void 0)i._maxInstanceCount=x.meshPerAttribute*x.count}else for(let K0=0;K0<v.locationSize;K0++)z(v.location+K0);J.bindBuffer(J.ARRAY_BUFFER,x0);for(let K0=0;K0<v.locationSize;K0++)A(v.location+K0,V0/v.locationSize,u0,H0,O0*_0,(W0+V0/v.locationSize*K0)*_0,f0)}else{if(e.isInstancedBufferAttribute){for(let x=0;x<v.locationSize;x++)C(v.location+x,e.meshPerAttribute);if(y.isInstancedMesh!==!0&&i._maxInstanceCount===void 0)i._maxInstanceCount=e.meshPerAttribute*e.count}else for(let x=0;x<v.locationSize;x++)z(v.location+x);J.bindBuffer(J.ARRAY_BUFFER,x0);for(let x=0;x<v.locationSize;x++)A(v.location+x,V0/v.locationSize,u0,H0,V0*_0,V0/v.locationSize*x*_0,f0)}}else if(p!==void 0){let H0=p[t];if(H0!==void 0)switch(H0.length){case 2:J.vertexAttrib2fv(v.location,H0);break;case 3:J.vertexAttrib3fv(v.location,H0);break;case 4:J.vertexAttrib4fv(v.location,H0);break;default:J.vertexAttrib1fv(v.location,H0)}}}}L()}function I(){n();for(let y in X){let h=X[y];for(let m in h){let i=h[m];for(let d in i)N(i[d].object),delete i[d];delete h[m]}delete X[y]}}function k(y){if(X[y.id]===void 0)return;let h=X[y.id];for(let m in h){let i=h[m];for(let d in i)N(i[d].object),delete i[d];delete h[m]}delete X[y.id]}function b(y){for(let h in X){let m=X[h];if(m[y.id]===void 0)continue;let i=m[y.id];for(let d in i)N(i[d].object),delete i[d];delete m[y.id]}}function n(){if(r(),U=!0,q===H)return;q=H,G(q.object)}function r(){H.geometry=null,H.program=null,H.wireframe=!1}return{setup:F,reset:n,resetDefaultState:r,dispose:I,releaseStatesOfGeometry:k,releaseStatesOfProgram:b,initAttributes:B,enableAttribute:z,disableUnusedAttributes:L}}function EH(J,$,Z,Q){let K=Q.isWebGL2,W;function Y(U){W=U}function X(U,F){J.drawArrays(W,U,F),Z.update(F,W,1)}function H(U,F,V){if(V===0)return;let G,N;if(K)G=J,N="drawArraysInstanced";else if(G=$.get("ANGLE_instanced_arrays"),N="drawArraysInstancedANGLE",G===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}G[N](W,U,F,V),Z.update(F,W,V)}function q(U,F,V){if(V===0)return;let G=$.get("WEBGL_multi_draw");if(G===null)for(let N=0;N<V;N++)this.render(U[N],F[N]);else{G.multiDrawArraysWEBGL(W,U,0,F,0,V);let N=0;for(let E=0;E<V;E++)N+=F[E];Z.update(N,W,1)}}this.setMode=Y,this.render=X,this.renderInstances=H,this.renderMultiDraw=q}function NH(J,$,Z){let Q;function K(){if(Q!==void 0)return Q;if($.has("EXT_texture_filter_anisotropic")===!0){let A=$.get("EXT_texture_filter_anisotropic");Q=J.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Q=0;return Q}function W(A){if(A==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let Y=typeof WebGL2RenderingContext<"u"&&J.constructor.name==="WebGL2RenderingContext",X=Z.precision!==void 0?Z.precision:"highp",H=W(X);if(H!==X)console.warn("THREE.WebGLRenderer:",X,"not supported, using",H,"instead."),X=H;let q=Y||$.has("WEBGL_draw_buffers"),U=Z.logarithmicDepthBuffer===!0,F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),G=J.getParameter(J.MAX_TEXTURE_SIZE),N=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),O=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),D=J.getParameter(J.MAX_VARYING_VECTORS),R=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),B=V>0,z=Y||$.has("OES_texture_float"),C=B&&z,L=Y?J.getParameter(J.MAX_SAMPLES):0;return{isWebGL2:Y,drawBuffers:q,getMaxAnisotropy:K,getMaxPrecision:W,precision:X,logarithmicDepthBuffer:U,maxTextures:F,maxVertexTextures:V,maxTextureSize:G,maxCubemapSize:N,maxAttributes:E,maxVertexUniforms:O,maxVaryings:D,maxFragmentUniforms:R,vertexTextures:B,floatFragmentTextures:z,floatVertexTextures:C,maxSamples:L}}function RH(J){let $=this,Z=null,Q=0,K=!1,W=!1,Y=new A9,X=new r0,H={value:null,needsUpdate:!1};this.uniform=H,this.numPlanes=0,this.numIntersection=0,this.init=function(F,V){let G=F.length!==0||V||Q!==0||K;return K=V,Q=F.length,G},this.beginShadows=function(){W=!0,U(null)},this.endShadows=function(){W=!1},this.setGlobalState=function(F,V){Z=U(F,V,0)},this.setState=function(F,V,G){let{clippingPlanes:N,clipIntersection:E,clipShadows:O}=F,D=J.get(F);if(!K||N===null||N.length===0||W&&!O)if(W)U(null);else q();else{let R=W?0:Q,B=R*4,z=D.clippingState||null;H.value=z,z=U(N,V,B,G);for(let C=0;C!==B;++C)z[C]=Z[C];D.clippingState=z,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=R}};function q(){if(H.value!==Z)H.value=Z,H.needsUpdate=Q>0;$.numPlanes=Q,$.numIntersection=0}function U(F,V,G,N){let E=F!==null?F.length:0,O=null;if(E!==0){if(O=H.value,N!==!0||O===null){let D=G+E*4,R=V.matrixWorldInverse;if(X.getNormalMatrix(R),O===null||O.length<D)O=new Float32Array(D);for(let B=0,z=G;B!==E;++B,z+=4)Y.copy(F[B]).applyMatrix4(R,X),Y.normal.toArray(O,z),O[z+3]=Y.constant}H.value=O,H.needsUpdate=!0}return $.numPlanes=E,$.numIntersection=0,O}}function BH(J){let $=new WeakMap;function Z(Y,X){if(X===303)Y.mapping=301;else if(X===304)Y.mapping=302;return Y}function Q(Y){if(Y&&Y.isTexture){let X=Y.mapping;if(X===303||X===304)if($.has(Y)){let H=$.get(Y).texture;return Z(H,Y.mapping)}else{let H=Y.image;if(H&&H.height>0){let q=new e6(H.height/2);return q.fromEquirectangularTexture(J,Y),$.set(Y,q),Y.addEventListener("dispose",K),Z(q.texture,Y.mapping)}else return null}}return Y}function K(Y){let X=Y.target;X.removeEventListener("dispose",K);let H=$.get(X);if(H!==void 0)$.delete(X),H.dispose()}function W(){$=new WeakMap}return{get:Q,dispose:W}}class MQ extends CQ{constructor(J=-1,$=1,Z=1,Q=-1,K=0.1,W=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Z,this.bottom=Q,this.near=K,this.far=W,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Z,Q,K,W){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Z,this.view.offsetY=Q,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Z=(this.right+this.left)/2,Q=(this.top+this.bottom)/2,K=Z-J,W=Z+J,Y=Q+$,X=Q-$;if(this.view!==null&&this.view.enabled){let H=(this.right-this.left)/this.view.fullWidth/this.zoom,q=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=H*this.view.offsetX,W=K+H*this.view.width,Y-=q*this.view.offsetY,X=Y-q*this.view.height}this.projectionMatrix.makeOrthographic(K,W,Y,X,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}var J7=4,X6=[0.125,0.215,0.35,0.446,0.526,0.582],BJ=20,aZ=new MQ,Y6=new e0,tZ=null,eZ=0,JQ=0,RJ=(1+Math.sqrt(5))/2,oJ=1/RJ,H6=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,RJ,oJ),new T(0,RJ,-oJ),new T(oJ,0,RJ),new T(-oJ,0,RJ),new T(RJ,oJ,0),new T(-RJ,oJ,0)];class UQ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(J,$=0,Z=0.1,Q=100){tZ=this._renderer.getRenderTarget(),eZ=this._renderer.getActiveCubeFace(),JQ=this._renderer.getActiveMipmapLevel(),this._setSize(256);let K=this._allocateTargets();if(K.depthBuffer=!0,this._sceneToCubeUV(J,Z,Q,K),$>0)this._blur(K,0,0,$);return this._applyPMREM(K),this._cleanup(K),K}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=F6(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=U6(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodPlanes.length;J++)this._lodPlanes[J].dispose()}_cleanup(J){this._renderer.setRenderTarget(tZ,eZ,JQ),J.scissorTest=!1,f$(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===301||J.mapping===302)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);tZ=this._renderer.getRenderTarget(),eZ=this._renderer.getActiveCubeFace(),JQ=this._renderer.getActiveMipmapLevel();let Z=$||this._allocateTargets();return this._textureToCubeUV(J,Z),this._applyPMREM(Z),this._cleanup(Z),Z}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Z={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:"srgb-linear",depthBuffer:!1},Q=q6(J,$,Z);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=q6(J,$,Z);let{_lodMax:K}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zH(K)),this._blurMaterial=IH(K,J,$)}return Q}_compileMaterial(J){let $=new w(this._lodPlanes[0],J);this._renderer.compile($,aZ)}_sceneToCubeUV(J,$,Z,Q){let Y=new l8(90,1,$,Z),X=[1,-1,1,1,1,1],H=[1,1,1,-1,-1,-1],q=this._renderer,U=q.autoClear,F=q.toneMapping;q.getClearColor(Y6),q.toneMapping=0,q.autoClear=!1;let V=new X8({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),G=new w(new J0,V),N=!1,E=J.background;if(E){if(E.isColor)V.color.copy(E),J.background=null,N=!0}else V.color.copy(Y6),N=!0;for(let O=0;O<6;O++){let D=O%3;if(D===0)Y.up.set(0,X[O],0),Y.lookAt(H[O],0,0);else if(D===1)Y.up.set(0,0,X[O]),Y.lookAt(0,H[O],0);else Y.up.set(0,X[O],0),Y.lookAt(0,0,H[O]);let R=this._cubeSize;if(f$(Q,D*R,O>2?R:0,R,R),q.setRenderTarget(Q),N)q.render(G,Y);q.render(J,Y)}G.geometry.dispose(),G.material.dispose(),q.toneMapping=F,q.autoClear=U,J.background=E}_textureToCubeUV(J,$){let Z=this._renderer,Q=J.mapping===301||J.mapping===302;if(Q){if(this._cubemapMaterial===null)this._cubemapMaterial=F6();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=U6();let K=Q?this._cubemapMaterial:this._equirectMaterial,W=new w(this._lodPlanes[0],K),Y=K.uniforms;Y.envMap.value=J;let X=this._cubeSize;f$($,0,0,3*X,2*X),Z.setRenderTarget($),Z.render(W,aZ)}_applyPMREM(J){let $=this._renderer,Z=$.autoClear;$.autoClear=!1;for(let Q=1;Q<this._lodPlanes.length;Q++){let K=Math.sqrt(this._sigmas[Q]*this._sigmas[Q]-this._sigmas[Q-1]*this._sigmas[Q-1]),W=H6[(Q-1)%H6.length];this._blur(J,Q-1,Q,K,W)}$.autoClear=Z}_blur(J,$,Z,Q,K){let W=this._pingPongRenderTarget;this._halfBlur(J,W,$,Z,Q,"latitudinal",K),this._halfBlur(W,J,Z,Z,Q,"longitudinal",K)}_halfBlur(J,$,Z,Q,K,W,Y){let X=this._renderer,H=this._blurMaterial;if(W!=="latitudinal"&&W!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let q=3,U=new w(this._lodPlanes[Q],H),F=H.uniforms,V=this._sizeLods[Z]-1,G=isFinite(K)?Math.PI/(2*V):2*Math.PI/(2*BJ-1),N=K/G,E=isFinite(K)?1+Math.floor(q*N):BJ;if(E>BJ)console.warn(`sigmaRadians, ${K}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${BJ}`);let O=[],D=0;for(let L=0;L<BJ;++L){let A=L/N,_=Math.exp(-A*A/2);if(O.push(_),L===0)D+=_;else if(L<E)D+=2*_}for(let L=0;L<O.length;L++)O[L]=O[L]/D;if(F.envMap.value=J.texture,F.samples.value=E,F.weights.value=O,F.latitudinal.value=W==="latitudinal",Y)F.poleAxis.value=Y;let{_lodMax:R}=this;F.dTheta.value=G,F.mipInt.value=R-Z;let B=this._sizeLods[Q],z=3*B*(Q>R-J7?Q-R+J7:0),C=4*(this._cubeSize-B);f$($,z,C,3*B,2*B),X.setRenderTarget($),X.render(U,aZ)}}function zH(J){let $=[],Z=[],Q=[],K=J,W=J-J7+1+X6.length;for(let Y=0;Y<W;Y++){let X=Math.pow(2,K);Z.push(X);let H=1/X;if(Y>J-J7)H=X6[Y-J+J7-1];else if(Y===0)H=0;Q.push(H);let q=1/(X-2),U=-q,F=1+q,V=[U,U,F,U,F,F,U,U,F,F,U,F],G=6,N=6,E=3,O=2,D=1,R=new Float32Array(E*N*G),B=new Float32Array(O*N*G),z=new Float32Array(D*N*G);for(let L=0;L<G;L++){let A=L%3*2/3-1,_=L>2?0:-1,I=[A,_,0,A+0.6666666666666666,_,0,A+0.6666666666666666,_+1,0,A,_,0,A+0.6666666666666666,_+1,0,A,_+1,0];R.set(I,E*N*L),B.set(V,O*N*L);let k=[L,L,L,L,L,L];z.set(k,D*N*L)}let C=new F8;if(C.setAttribute("position",new v8(R,E)),C.setAttribute("uv",new v8(B,O)),C.setAttribute("faceIndex",new v8(z,D)),$.push(C),K>J7)K--}return{lodPlanes:$,sizeLods:Z,sigmas:Q}}function q6(J,$,Z){let Q=new $J(J,$,Z);return Q.texture.mapping=306,Q.texture.name="PMREM.cubeUv",Q.scissorTest=!0,Q}function f$(J,$,Z,Q,K){J.viewport.set($,Z,Q,K),J.scissor.set($,Z,Q,K)}function IH(J,$,Z){let Q=new Float32Array(BJ),K=new T(0,1,0);return new ZJ({name:"SphericalGaussianBlur",defines:{n:BJ,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Z,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Q},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:K}},vertexShader:kQ(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function U6(){return new ZJ({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kQ(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function F6(){return new ZJ({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kQ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function kQ(){return`

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
	`}function LH(J){let $=new WeakMap,Z=null;function Q(X){if(X&&X.isTexture){let H=X.mapping,q=H===303||H===304,U=H===301||H===302;if(q||U)if(X.isRenderTargetTexture&&X.needsPMREMUpdate===!0){X.needsPMREMUpdate=!1;let F=$.get(X);if(Z===null)Z=new UQ(J);return F=q?Z.fromEquirectangular(X,F):Z.fromCubemap(X,F),$.set(X,F),F.texture}else if($.has(X))return $.get(X).texture;else{let F=X.image;if(q&&F&&F.height>0||U&&F&&K(F)){if(Z===null)Z=new UQ(J);let V=q?Z.fromEquirectangular(X):Z.fromCubemap(X);return $.set(X,V),X.addEventListener("dispose",W),V.texture}else return null}}return X}function K(X){let H=0,q=6;for(let U=0;U<q;U++)if(X[U]!==void 0)H++;return H===q}function W(X){let H=X.target;H.removeEventListener("dispose",W);let q=$.get(H);if(q!==void 0)$.delete(H),q.dispose()}function Y(){if($=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:Q,dispose:Y}}function CH(J){let $={};function Z(Q){if($[Q]!==void 0)return $[Q];let K;switch(Q){case"WEBGL_depth_texture":K=J.getExtension("WEBGL_depth_texture")||J.getExtension("MOZ_WEBGL_depth_texture")||J.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":K=J.getExtension("EXT_texture_filter_anisotropic")||J.getExtension("MOZ_EXT_texture_filter_anisotropic")||J.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":K=J.getExtension("WEBGL_compressed_texture_s3tc")||J.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":K=J.getExtension("WEBGL_compressed_texture_pvrtc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:K=J.getExtension(Q)}return $[Q]=K,K}return{has:function(Q){return Z(Q)!==null},init:function(Q){if(Q.isWebGL2)Z("EXT_color_buffer_float"),Z("WEBGL_clip_cull_distance");else Z("WEBGL_depth_texture"),Z("OES_texture_float"),Z("OES_texture_half_float"),Z("OES_texture_half_float_linear"),Z("OES_standard_derivatives"),Z("OES_element_index_uint"),Z("OES_vertex_array_object"),Z("ANGLE_instanced_arrays");Z("OES_texture_float_linear"),Z("EXT_color_buffer_half_float"),Z("WEBGL_multisampled_render_to_texture")},get:function(Q){let K=Z(Q);if(K===null)console.warn("THREE.WebGLRenderer: "+Q+" extension not supported.");return K}}}function AH(J,$,Z,Q){let K={},W=new WeakMap;function Y(F){let V=F.target;if(V.index!==null)$.remove(V.index);for(let N in V.attributes)$.remove(V.attributes[N]);for(let N in V.morphAttributes){let E=V.morphAttributes[N];for(let O=0,D=E.length;O<D;O++)$.remove(E[O])}V.removeEventListener("dispose",Y),delete K[V.id];let G=W.get(V);if(G)$.remove(G),W.delete(V);if(Q.releaseStatesOfGeometry(V),V.isInstancedBufferGeometry===!0)delete V._maxInstanceCount;Z.memory.geometries--}function X(F,V){if(K[V.id]===!0)return V;return V.addEventListener("dispose",Y),K[V.id]=!0,Z.memory.geometries++,V}function H(F){let V=F.attributes;for(let N in V)$.update(V[N],J.ARRAY_BUFFER);let G=F.morphAttributes;for(let N in G){let E=G[N];for(let O=0,D=E.length;O<D;O++)$.update(E[O],J.ARRAY_BUFFER)}}function q(F){let V=[],G=F.index,N=F.attributes.position,E=0;if(G!==null){let R=G.array;E=G.version;for(let B=0,z=R.length;B<z;B+=3){let C=R[B+0],L=R[B+1],A=R[B+2];V.push(C,L,L,A,A,C)}}else if(N!==void 0){let R=N.array;E=N.version;for(let B=0,z=R.length/3-1;B<z;B+=3){let C=B+0,L=B+1,A=B+2;V.push(C,L,L,A,A,C)}}else return;let O=new((s6(V))?LQ:IQ)(V,1);O.version=E;let D=W.get(F);if(D)$.remove(D);W.set(F,O)}function U(F){let V=W.get(F);if(V){let G=F.index;if(G!==null){if(V.version<G.version)q(F)}}else q(F);return W.get(F)}return{get:X,update:H,getWireframeAttribute:U}}function MH(J,$,Z,Q){let K=Q.isWebGL2,W;function Y(G){W=G}let X,H;function q(G){X=G.type,H=G.bytesPerElement}function U(G,N){J.drawElements(W,N,X,G*H),Z.update(N,W,1)}function F(G,N,E){if(E===0)return;let O,D;if(K)O=J,D="drawElementsInstanced";else if(O=$.get("ANGLE_instanced_arrays"),D="drawElementsInstancedANGLE",O===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}O[D](W,N,X,G*H,E),Z.update(N,W,E)}function V(G,N,E){if(E===0)return;let O=$.get("WEBGL_multi_draw");if(O===null)for(let D=0;D<E;D++)this.render(G[D]/H,N[D]);else{O.multiDrawElementsWEBGL(W,N,0,X,G,0,E);let D=0;for(let R=0;R<E;R++)D+=N[R];Z.update(D,W,1)}}this.setMode=Y,this.setIndex=q,this.render=U,this.renderInstances=F,this.renderMultiDraw=V}function kH(J){let $={geometries:0,textures:0},Z={frame:0,calls:0,triangles:0,points:0,lines:0};function Q(W,Y,X){switch(Z.calls++,Y){case J.TRIANGLES:Z.triangles+=X*(W/3);break;case J.LINES:Z.lines+=X*(W/2);break;case J.LINE_STRIP:Z.lines+=X*(W-1);break;case J.LINE_LOOP:Z.lines+=X*W;break;case J.POINTS:Z.points+=X*W;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",Y);break}}function K(){Z.calls=0,Z.triangles=0,Z.points=0,Z.lines=0}return{memory:$,render:Z,programs:null,autoReset:!0,reset:K,update:Q}}function PH(J,$){return J[0]-$[0]}function SH(J,$){return Math.abs($[1])-Math.abs(J[1])}function wH(J,$,Z){let Q={},K=new Float32Array(8),W=new WeakMap,Y=new D8,X=[];for(let q=0;q<8;q++)X[q]=[q,0];function H(q,U,F){let V=q.morphTargetInfluences;if($.isWebGL2===!0){let G=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,N=G!==void 0?G.length:0,E=W.get(U);if(E===void 0||E.count!==N){let y=function(){n.dispose(),W.delete(U),U.removeEventListener("dispose",y)};if(E!==void 0)E.texture.dispose();let R=U.morphAttributes.position!==void 0,B=U.morphAttributes.normal!==void 0,z=U.morphAttributes.color!==void 0,C=U.morphAttributes.position||[],L=U.morphAttributes.normal||[],A=U.morphAttributes.color||[],_=0;if(R===!0)_=1;if(B===!0)_=2;if(z===!0)_=3;let I=U.attributes.position.count*_,k=1;if(I>$.maxTextureSize)k=Math.ceil(I/$.maxTextureSize),I=$.maxTextureSize;let b=new Float32Array(I*k*4*N),n=new zQ(b,I,k,N);n.type=1015,n.needsUpdate=!0;let r=_*4;for(let h=0;h<N;h++){let m=C[h],i=L[h],d=A[h],g=I*k*4*h;for(let p=0;p<m.count;p++){let t=p*r;if(R===!0)Y.fromBufferAttribute(m,p),b[g+t+0]=Y.x,b[g+t+1]=Y.y,b[g+t+2]=Y.z,b[g+t+3]=0;if(B===!0)Y.fromBufferAttribute(i,p),b[g+t+4]=Y.x,b[g+t+5]=Y.y,b[g+t+6]=Y.z,b[g+t+7]=0;if(z===!0)Y.fromBufferAttribute(d,p),b[g+t+8]=Y.x,b[g+t+9]=Y.y,b[g+t+10]=Y.z,b[g+t+11]=d.itemSize===4?Y.w:1}}E={count:N,texture:n,size:new Y0(I,k)},W.set(U,E),U.addEventListener("dispose",y)}let O=0;for(let R=0;R<V.length;R++)O+=V[R];let D=U.morphTargetsRelative?1:1-O;F.getUniforms().setValue(J,"morphTargetBaseInfluence",D),F.getUniforms().setValue(J,"morphTargetInfluences",V),F.getUniforms().setValue(J,"morphTargetsTexture",E.texture,Z),F.getUniforms().setValue(J,"morphTargetsTextureSize",E.size)}else{let G=V===void 0?0:V.length,N=Q[U.id];if(N===void 0||N.length!==G){N=[];for(let B=0;B<G;B++)N[B]=[B,0];Q[U.id]=N}for(let B=0;B<G;B++){let z=N[B];z[0]=B,z[1]=V[B]}N.sort(SH);for(let B=0;B<8;B++)if(B<G&&N[B][1])X[B][0]=N[B][0],X[B][1]=N[B][1];else X[B][0]=Number.MAX_SAFE_INTEGER,X[B][1]=0;X.sort(PH);let E=U.morphAttributes.position,O=U.morphAttributes.normal,D=0;for(let B=0;B<8;B++){let z=X[B],C=z[0],L=z[1];if(C!==Number.MAX_SAFE_INTEGER&&L){if(E&&U.getAttribute("morphTarget"+B)!==E[C])U.setAttribute("morphTarget"+B,E[C]);if(O&&U.getAttribute("morphNormal"+B)!==O[C])U.setAttribute("morphNormal"+B,O[C]);K[B]=L,D+=L}else{if(E&&U.hasAttribute("morphTarget"+B)===!0)U.deleteAttribute("morphTarget"+B);if(O&&U.hasAttribute("morphNormal"+B)===!0)U.deleteAttribute("morphNormal"+B);K[B]=0}}let R=U.morphTargetsRelative?1:1-D;F.getUniforms().setValue(J,"morphTargetBaseInfluence",R),F.getUniforms().setValue(J,"morphTargetInfluences",K)}}return{update:H}}function _H(J,$,Z,Q){let K=new WeakMap;function W(H){let q=Q.render.frame,U=H.geometry,F=$.get(H,U);if(K.get(F)!==q)$.update(F),K.set(F,q);if(H.isInstancedMesh){if(H.hasEventListener("dispose",X)===!1)H.addEventListener("dispose",X);if(K.get(H)!==q){if(Z.update(H.instanceMatrix,J.ARRAY_BUFFER),H.instanceColor!==null)Z.update(H.instanceColor,J.ARRAY_BUFFER);K.set(H,q)}}if(H.isSkinnedMesh){let V=H.skeleton;if(K.get(V)!==q)V.update(),K.set(V,q)}return F}function Y(){K=new WeakMap}function X(H){let q=H.target;if(q.removeEventListener("dispose",X),Z.remove(q.instanceMatrix),q.instanceColor!==null)Z.remove(q.instanceColor)}return{update:W,dispose:Y}}class PQ extends t8{constructor(J,$,Z,Q,K,W,Y,X,H,q){if(q=q!==void 0?q:1026,q!==1026&&q!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(Z===void 0&&q===1026)Z=1014;if(Z===void 0&&q===1027)Z=1020;super(null,Q,K,W,Y,X,q,Z,H);this.isDepthTexture=!0,this.image={width:J,height:$},this.magFilter=Y!==void 0?Y:1003,this.minFilter=X!==void 0?X:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);if(this.compareFunction!==null)$.compareFunction=this.compareFunction;return $}}var $K=new t8,ZK=new PQ(1,1);ZK.compareFunction=515;var QK=new zQ,KK=new o6,WK=new AQ,V6=[],G6=[],O6=new Float32Array(16),D6=new Float32Array(9),E6=new Float32Array(4);function q7(J,$,Z){let Q=J[0];if(Q<=0||Q>0)return J;let K=$*Z,W=V6[K];if(W===void 0)W=new Float32Array(K),V6[K]=W;if($!==0){Q.toArray(W,0);for(let Y=1,X=0;Y!==$;++Y)X+=Z,J[Y].toArray(W,X)}return W}function _8(J,$){if(J.length!==$.length)return!1;for(let Z=0,Q=J.length;Z<Q;Z++)if(J[Z]!==$[Z])return!1;return!0}function T8(J,$){for(let Z=0,Q=$.length;Z<Q;Z++)J[Z]=$[Z]}function ZZ(J,$){let Z=G6[$];if(Z===void 0)Z=new Int32Array($),G6[$]=Z;for(let Q=0;Q!==$;++Q)Z[Q]=J.allocateTextureUnit();return Z}function TH(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1f(this.addr,$),Z[0]=$}function jH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(_8(Z,$))return;J.uniform2fv(this.addr,$),T8(Z,$)}}function yH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else if($.r!==void 0){if(Z[0]!==$.r||Z[1]!==$.g||Z[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Z[0]=$.r,Z[1]=$.g,Z[2]=$.b}else{if(_8(Z,$))return;J.uniform3fv(this.addr,$),T8(Z,$)}}function xH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(_8(Z,$))return;J.uniform4fv(this.addr,$),T8(Z,$)}}function bH(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(_8(Z,$))return;J.uniformMatrix2fv(this.addr,!1,$),T8(Z,$)}else{if(_8(Z,Q))return;E6.set(Q),J.uniformMatrix2fv(this.addr,!1,E6),T8(Z,Q)}}function fH(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(_8(Z,$))return;J.uniformMatrix3fv(this.addr,!1,$),T8(Z,$)}else{if(_8(Z,Q))return;D6.set(Q),J.uniformMatrix3fv(this.addr,!1,D6),T8(Z,Q)}}function hH(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(_8(Z,$))return;J.uniformMatrix4fv(this.addr,!1,$),T8(Z,$)}else{if(_8(Z,Q))return;O6.set(Q),J.uniformMatrix4fv(this.addr,!1,O6),T8(Z,Q)}}function vH(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1i(this.addr,$),Z[0]=$}function gH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(_8(Z,$))return;J.uniform2iv(this.addr,$),T8(Z,$)}}function mH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else{if(_8(Z,$))return;J.uniform3iv(this.addr,$),T8(Z,$)}}function uH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(_8(Z,$))return;J.uniform4iv(this.addr,$),T8(Z,$)}}function dH(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1ui(this.addr,$),Z[0]=$}function pH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(_8(Z,$))return;J.uniform2uiv(this.addr,$),T8(Z,$)}}function lH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else{if(_8(Z,$))return;J.uniform3uiv(this.addr,$),T8(Z,$)}}function cH(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(_8(Z,$))return;J.uniform4uiv(this.addr,$),T8(Z,$)}}function nH(J,$,Z){let Q=this.cache,K=Z.allocateTextureUnit();if(Q[0]!==K)J.uniform1i(this.addr,K),Q[0]=K;let W=this.type===J.SAMPLER_2D_SHADOW?ZK:$K;Z.setTexture2D($||W,K)}function sH(J,$,Z){let Q=this.cache,K=Z.allocateTextureUnit();if(Q[0]!==K)J.uniform1i(this.addr,K),Q[0]=K;Z.setTexture3D($||KK,K)}function iH(J,$,Z){let Q=this.cache,K=Z.allocateTextureUnit();if(Q[0]!==K)J.uniform1i(this.addr,K),Q[0]=K;Z.setTextureCube($||WK,K)}function oH(J,$,Z){let Q=this.cache,K=Z.allocateTextureUnit();if(Q[0]!==K)J.uniform1i(this.addr,K),Q[0]=K;Z.setTexture2DArray($||QK,K)}function rH(J){switch(J){case 5126:return TH;case 35664:return jH;case 35665:return yH;case 35666:return xH;case 35674:return bH;case 35675:return fH;case 35676:return hH;case 5124:case 35670:return vH;case 35667:case 35671:return gH;case 35668:case 35672:return mH;case 35669:case 35673:return uH;case 5125:return dH;case 36294:return pH;case 36295:return lH;case 36296:return cH;case 35678:case 36198:case 36298:case 36306:case 35682:return nH;case 35679:case 36299:case 36307:return sH;case 35680:case 36300:case 36308:case 36293:return iH;case 36289:case 36303:case 36311:case 36292:return oH}}function aH(J,$){J.uniform1fv(this.addr,$)}function tH(J,$){let Z=q7($,this.size,2);J.uniform2fv(this.addr,Z)}function eH(J,$){let Z=q7($,this.size,3);J.uniform3fv(this.addr,Z)}function Jq(J,$){let Z=q7($,this.size,4);J.uniform4fv(this.addr,Z)}function $q(J,$){let Z=q7($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Z)}function Zq(J,$){let Z=q7($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Z)}function Qq(J,$){let Z=q7($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Z)}function Kq(J,$){J.uniform1iv(this.addr,$)}function Wq(J,$){J.uniform2iv(this.addr,$)}function Xq(J,$){J.uniform3iv(this.addr,$)}function Yq(J,$){J.uniform4iv(this.addr,$)}function Hq(J,$){J.uniform1uiv(this.addr,$)}function qq(J,$){J.uniform2uiv(this.addr,$)}function Uq(J,$){J.uniform3uiv(this.addr,$)}function Fq(J,$){J.uniform4uiv(this.addr,$)}function Vq(J,$,Z){let Q=this.cache,K=$.length,W=ZZ(Z,K);if(!_8(Q,W))J.uniform1iv(this.addr,W),T8(Q,W);for(let Y=0;Y!==K;++Y)Z.setTexture2D($[Y]||$K,W[Y])}function Gq(J,$,Z){let Q=this.cache,K=$.length,W=ZZ(Z,K);if(!_8(Q,W))J.uniform1iv(this.addr,W),T8(Q,W);for(let Y=0;Y!==K;++Y)Z.setTexture3D($[Y]||KK,W[Y])}function Oq(J,$,Z){let Q=this.cache,K=$.length,W=ZZ(Z,K);if(!_8(Q,W))J.uniform1iv(this.addr,W),T8(Q,W);for(let Y=0;Y!==K;++Y)Z.setTextureCube($[Y]||WK,W[Y])}function Dq(J,$,Z){let Q=this.cache,K=$.length,W=ZZ(Z,K);if(!_8(Q,W))J.uniform1iv(this.addr,W),T8(Q,W);for(let Y=0;Y!==K;++Y)Z.setTexture2DArray($[Y]||QK,W[Y])}function Eq(J){switch(J){case 5126:return aH;case 35664:return tH;case 35665:return eH;case 35666:return Jq;case 35674:return $q;case 35675:return Zq;case 35676:return Qq;case 5124:case 35670:return Kq;case 35667:case 35671:return Wq;case 35668:case 35672:return Xq;case 35669:case 35673:return Yq;case 5125:return Hq;case 36294:return qq;case 36295:return Uq;case 36296:return Fq;case 35678:case 36198:case 36298:case 36306:case 35682:return Vq;case 35679:case 36299:case 36307:return Gq;case 35680:case 36300:case 36308:case 36293:return Oq;case 36289:case 36303:case 36311:case 36292:return Dq}}class XK{constructor(J,$,Z){this.id=J,this.addr=Z,this.cache=[],this.type=$.type,this.setValue=rH($.type)}}class YK{constructor(J,$,Z){this.id=J,this.addr=Z,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=Eq($.type)}}class HK{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Z){let Q=this.seq;for(let K=0,W=Q.length;K!==W;++K){let Y=Q[K];Y.setValue(J,$[Y.id],Z)}}}var $Q=/(\w+)(\])?(\[|\.)?/g;function N6(J,$){J.seq.push($),J.map[$.id]=$}function Nq(J,$,Z){let Q=J.name,K=Q.length;$Q.lastIndex=0;while(!0){let W=$Q.exec(Q),Y=$Q.lastIndex,X=W[1],H=W[2]==="]",q=W[3];if(H)X=X|0;if(q===void 0||q==="["&&Y+2===K){N6(Z,q===void 0?new XK(X,J,$):new YK(X,J,$));break}else{let F=Z.map[X];if(F===void 0)F=new HK(X),N6(Z,F);Z=F}}}class h7{constructor(J,$){this.seq=[],this.map={};let Z=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let Q=0;Q<Z;++Q){let K=J.getActiveUniform($,Q),W=J.getUniformLocation($,K.name);Nq(K,W,this)}}setValue(J,$,Z,Q){let K=this.map[$];if(K!==void 0)K.setValue(J,Z,Q)}setOptional(J,$,Z){let Q=$[Z];if(Q!==void 0)this.setValue(J,Z,Q)}static upload(J,$,Z,Q){for(let K=0,W=$.length;K!==W;++K){let Y=$[K],X=Z[Y.id];if(X.needsUpdate!==!1)Y.setValue(J,X.value,Q)}}static seqWithValue(J,$){let Z=[];for(let Q=0,K=J.length;Q!==K;++Q){let W=J[Q];if(W.id in $)Z.push(W)}return Z}}function R6(J,$,Z){let Q=J.createShader($);return J.shaderSource(Q,Z),J.compileShader(Q),Q}var Rq=37297,Bq=0;function zq(J,$){let Z=J.split(`
`),Q=[],K=Math.max($-6,0),W=Math.min($+6,Z.length);for(let Y=K;Y<W;Y++){let X=Y+1;Q.push(`${X===$?">":" "} ${X}: ${Z[Y]}`)}return Q.join(`
`)}function Iq(J){let $=W8.getPrimaries(W8.workingColorSpace),Z=W8.getPrimaries(J),Q;if($===Z)Q="";else if($==="p3"&&Z==="rec709")Q="LinearDisplayP3ToLinearSRGB";else if($==="rec709"&&Z==="p3")Q="LinearSRGBToLinearDisplayP3";switch(J){case"srgb-linear":case"display-p3-linear":return[Q,"LinearTransferOETF"];case"srgb":case"display-p3":return[Q,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",J),[Q,"LinearTransferOETF"]}}function B6(J,$,Z){let Q=J.getShaderParameter($,J.COMPILE_STATUS),K=J.getShaderInfoLog($).trim();if(Q&&K==="")return"";let W=/ERROR: 0:(\d+)/.exec(K);if(W){let Y=parseInt(W[1]);return Z.toUpperCase()+`

`+K+`

`+zq(J.getShaderSource($),Y)}else return K}function Lq(J,$){let Z=Iq($);return`vec4 ${J}( vec4 value ) { return ${Z[0]}( ${Z[1]}( value ) ); }`}function Cq(J,$){let Z;switch($){case 1:Z="Linear";break;case 2:Z="Reinhard";break;case 3:Z="OptimizedCineon";break;case 4:Z="ACESFilmic";break;case 6:Z="AgX";break;case 5:Z="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",$),Z="Linear"}return"vec3 "+J+"( vec3 color ) { return "+Z+"ToneMapping( color ); }"}function Aq(J){return[J.extensionDerivatives||!!J.envMapCubeUVHeight||J.bumpMap||J.normalMapTangentSpace||J.clearcoatNormalMap||J.flatShading||J.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(J.extensionFragDepth||J.logarithmicDepthBuffer)&&J.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",J.extensionDrawBuffers&&J.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(J.extensionShaderTextureLOD||J.envMap||J.transmission)&&J.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter($7).join(`
`)}function Mq(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter($7).join(`
`)}function kq(J){let $=[];for(let Z in J){let Q=J[Z];if(Q===!1)continue;$.push("#define "+Z+" "+Q)}return $.join(`
`)}function Pq(J,$){let Z={},Q=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Q;K++){let W=J.getActiveAttrib($,K),Y=W.name,X=1;if(W.type===J.FLOAT_MAT2)X=2;if(W.type===J.FLOAT_MAT3)X=3;if(W.type===J.FLOAT_MAT4)X=4;Z[Y]={type:W.type,location:J.getAttribLocation($,Y),locationSize:X}}return Z}function $7(J){return J!==""}function z6(J,$){let Z=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Z).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function I6(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var Sq=/^[ \t]*#include +<([\w\d./]+)>/gm;function FQ(J){return J.replace(Sq,_q)}var wq=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function _q(J,$){let Z=s0[$];if(Z===void 0){let Q=wq.get($);if(Q!==void 0)Z=s0[Q],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,Q);else throw Error("Can not resolve #include <"+$+">")}return FQ(Z)}var Tq=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function L6(J){return J.replace(Tq,jq)}function jq(J,$,Z,Q){let K="";for(let W=parseInt($);W<parseInt(Z);W++)K+=Q.replace(/\[\s*i\s*\]/g,"[ "+W+" ]").replace(/UNROLLED_LOOP_INDEX/g,W);return K}function C6(J){let $="precision "+J.precision+` float;
precision `+J.precision+" int;";if(J.precision==="highp")$+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")$+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")$+=`
#define LOW_PRECISION`;return $}function yq(J){let $="SHADOWMAP_TYPE_BASIC";if(J.shadowMapType===1)$="SHADOWMAP_TYPE_PCF";else if(J.shadowMapType===2)$="SHADOWMAP_TYPE_PCF_SOFT";else if(J.shadowMapType===3)$="SHADOWMAP_TYPE_VSM";return $}function xq(J){let $="ENVMAP_TYPE_CUBE";if(J.envMap)switch(J.envMapMode){case 301:case 302:$="ENVMAP_TYPE_CUBE";break;case 306:$="ENVMAP_TYPE_CUBE_UV";break}return $}function bq(J){let $="ENVMAP_MODE_REFLECTION";if(J.envMap)switch(J.envMapMode){case 302:$="ENVMAP_MODE_REFRACTION";break}return $}function fq(J){let $="ENVMAP_BLENDING_NONE";if(J.envMap)switch(J.combine){case 0:$="ENVMAP_BLENDING_MULTIPLY";break;case 1:$="ENVMAP_BLENDING_MIX";break;case 2:$="ENVMAP_BLENDING_ADD";break}return $}function hq(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Z=Math.log2($)-2,Q=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:Q,maxMip:Z}}function vq(J,$,Z,Q){let K=J.getContext(),W=Z.defines,Y=Z.vertexShader,X=Z.fragmentShader,H=yq(Z),q=xq(Z),U=bq(Z),F=fq(Z),V=hq(Z),G=Z.isWebGL2?"":Aq(Z),N=Mq(Z),E=kq(W),O=K.createProgram(),D,R,B=Z.glslVersion?"#version "+Z.glslVersion+`
`:"";if(Z.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E].filter($7).join(`
`),D.length>0)D+=`
`;if(R=[G,"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E].filter($7).join(`
`),R.length>0)R+=`
`}else D=[C6(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E,Z.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Z.batching?"#define USE_BATCHING":"",Z.instancing?"#define USE_INSTANCING":"",Z.instancingColor?"#define USE_INSTANCING_COLOR":"",Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+U:"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.displacementMap?"#define USE_DISPLACEMENTMAP":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.mapUv?"#define MAP_UV "+Z.mapUv:"",Z.alphaMapUv?"#define ALPHAMAP_UV "+Z.alphaMapUv:"",Z.lightMapUv?"#define LIGHTMAP_UV "+Z.lightMapUv:"",Z.aoMapUv?"#define AOMAP_UV "+Z.aoMapUv:"",Z.emissiveMapUv?"#define EMISSIVEMAP_UV "+Z.emissiveMapUv:"",Z.bumpMapUv?"#define BUMPMAP_UV "+Z.bumpMapUv:"",Z.normalMapUv?"#define NORMALMAP_UV "+Z.normalMapUv:"",Z.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Z.displacementMapUv:"",Z.metalnessMapUv?"#define METALNESSMAP_UV "+Z.metalnessMapUv:"",Z.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Z.roughnessMapUv:"",Z.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Z.anisotropyMapUv:"",Z.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Z.clearcoatMapUv:"",Z.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Z.clearcoatNormalMapUv:"",Z.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Z.clearcoatRoughnessMapUv:"",Z.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Z.iridescenceMapUv:"",Z.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Z.iridescenceThicknessMapUv:"",Z.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Z.sheenColorMapUv:"",Z.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Z.sheenRoughnessMapUv:"",Z.specularMapUv?"#define SPECULARMAP_UV "+Z.specularMapUv:"",Z.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Z.specularColorMapUv:"",Z.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Z.specularIntensityMapUv:"",Z.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Z.transmissionMapUv:"",Z.thicknessMapUv?"#define THICKNESSMAP_UV "+Z.thicknessMapUv:"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.flatShading?"#define FLAT_SHADED":"",Z.skinning?"#define USE_SKINNING":"",Z.morphTargets?"#define USE_MORPHTARGETS":"",Z.morphNormals&&Z.flatShading===!1?"#define USE_MORPHNORMALS":"",Z.morphColors&&Z.isWebGL2?"#define USE_MORPHCOLORS":"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+Z.morphTextureStride:"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_COUNT "+Z.morphTargetsCount:"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+H:"",Z.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.useLegacyLights?"#define LEGACY_LIGHTS":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.logarithmicDepthBuffer&&Z.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter($7).join(`
`),R=[G,C6(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,E,Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.matcap?"#define USE_MATCAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+q:"",Z.envMap?"#define "+U:"",Z.envMap?"#define "+F:"",V?"#define CUBEUV_TEXEL_WIDTH "+V.texelWidth:"",V?"#define CUBEUV_TEXEL_HEIGHT "+V.texelHeight:"",V?"#define CUBEUV_MAX_MIP "+V.maxMip+".0":"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoat?"#define USE_CLEARCOAT":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescence?"#define USE_IRIDESCENCE":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaTest?"#define USE_ALPHATEST":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.sheen?"#define USE_SHEEN":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors||Z.instancingColor?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.gradientMap?"#define USE_GRADIENTMAP":"",Z.flatShading?"#define FLAT_SHADED":"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+H:"",Z.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.useLegacyLights?"#define LEGACY_LIGHTS":"",Z.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.logarithmicDepthBuffer&&Z.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Z.toneMapping!==0?"#define TONE_MAPPING":"",Z.toneMapping!==0?s0.tonemapping_pars_fragment:"",Z.toneMapping!==0?Cq("toneMapping",Z.toneMapping):"",Z.dithering?"#define DITHERING":"",Z.opaque?"#define OPAQUE":"",s0.colorspace_pars_fragment,Lq("linearToOutputTexel",Z.outputColorSpace),Z.useDepthPacking?"#define DEPTH_PACKING "+Z.depthPacking:"",`
`].filter($7).join(`
`);if(Y=FQ(Y),Y=z6(Y,Z),Y=I6(Y,Z),X=FQ(X),X=z6(X,Z),X=I6(X,Z),Y=L6(Y),X=L6(X),Z.isWebGL2&&Z.isRawShaderMaterial!==!0)B=`#version 300 es
`,D=[N,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,R=["precision mediump sampler2DArray;","#define varying in",Z.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",Z.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+R;let z=B+D+Y,C=B+R+X,L=R6(K,K.VERTEX_SHADER,z),A=R6(K,K.FRAGMENT_SHADER,C);if(K.attachShader(O,L),K.attachShader(O,A),Z.index0AttributeName!==void 0)K.bindAttribLocation(O,0,Z.index0AttributeName);else if(Z.morphTargets===!0)K.bindAttribLocation(O,0,"position");K.linkProgram(O);function _(n){if(J.debug.checkShaderErrors){let r=K.getProgramInfoLog(O).trim(),y=K.getShaderInfoLog(L).trim(),h=K.getShaderInfoLog(A).trim(),m=!0,i=!0;if(K.getProgramParameter(O,K.LINK_STATUS)===!1)if(m=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,O,L,A);else{let d=B6(K,L,"vertex"),g=B6(K,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(O,K.VALIDATE_STATUS)+`

Program Info Log: `+r+`
`+d+`
`+g)}else if(r!=="")console.warn("THREE.WebGLProgram: Program Info Log:",r);else if(y===""||h==="")i=!1;if(i)n.diagnostics={runnable:m,programLog:r,vertexShader:{log:y,prefix:D},fragmentShader:{log:h,prefix:R}}}K.deleteShader(L),K.deleteShader(A),I=new h7(K,O),k=Pq(K,O)}let I;this.getUniforms=function(){if(I===void 0)_(this);return I};let k;this.getAttributes=function(){if(k===void 0)_(this);return k};let b=Z.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(b===!1)b=K.getProgramParameter(O,Rq);return b},this.destroy=function(){Q.releaseStatesOfProgram(this),K.deleteProgram(O),this.program=void 0},this.type=Z.shaderType,this.name=Z.shaderName,this.id=Bq++,this.cacheKey=$,this.usedTimes=1,this.program=O,this.vertexShader=L,this.fragmentShader=A,this}var gq=0;class qK{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:$,fragmentShader:Z}=J,Q=this._getShaderStage($),K=this._getShaderStage(Z),W=this._getShaderCacheForMaterial(J);if(W.has(Q)===!1)W.add(Q),Q.usedTimes++;if(W.has(K)===!1)W.add(K),K.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Z of $)if(Z.usedTimes--,Z.usedTimes===0)this.shaderCache.delete(Z.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Z=$.get(J);if(Z===void 0)Z=new Set,$.set(J,Z);return Z}_getShaderStage(J){let $=this.shaderCache,Z=$.get(J);if(Z===void 0)Z=new UK(J),$.set(J,Z);return Z}}class UK{constructor(J){this.id=gq++,this.code=J,this.usedTimes=0}}function mq(J,$,Z,Q,K,W,Y){let X=new JZ,H=new qK,q=[],U=K.isWebGL2,F=K.logarithmicDepthBuffer,V=K.vertexTextures,G=K.precision,N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(I){if(I===0)return"uv";return`uv${I}`}function O(I,k,b,n,r){let y=n.fog,h=r.geometry,m=I.isMeshStandardMaterial?n.environment:null,i=(I.isMeshStandardMaterial?Z:$).get(I.envMap||m),d=!!i&&i.mapping===306?i.image.height:null,g=N[I.type];if(I.precision!==null){if(G=K.getMaxPrecision(I.precision),G!==I.precision)console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",G,"instead.")}let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,t=p!==void 0?p.length:0,v=0;if(h.morphAttributes.position!==void 0)v=1;if(h.morphAttributes.normal!==void 0)v=2;if(h.morphAttributes.color!==void 0)v=3;let e,H0,V0,R0;if(g){let k8=M9[g];e=k8.vertexShader,H0=k8.fragmentShader}else e=I.vertexShader,H0=I.fragmentShader,H.update(I),V0=H.getVertexShaderID(I),R0=H.getFragmentShaderID(I);let x0=J.getRenderTarget(),u0=r.isInstancedMesh===!0,_0=r.isBatchedMesh===!0,f0=!!I.map,x=!!I.matcap,O0=!!i,W0=!!I.aoMap,K0=!!I.lightMap,Q0=!!I.bumpMap,z0=!!I.normalMap,E0=!!I.displacementMap,P0=!!I.emissiveMap,S=!!I.metalnessMap,M=!!I.roughnessMap,l=I.anisotropy>0,q0=I.clearcoat>0,Z0=I.iridescence>0,U0=I.sheen>0,y0=I.transmission>0,F0=l&&!!I.anisotropyMap,A0=q0&&!!I.clearcoatMap,T0=q0&&!!I.clearcoatNormalMap,h0=q0&&!!I.clearcoatRoughnessMap,X0=Z0&&!!I.iridescenceMap,O8=Z0&&!!I.iridescenceThicknessMap,l0=U0&&!!I.sheenColorMap,v0=U0&&!!I.sheenRoughnessMap,M0=!!I.specularMap,j=!!I.specularColorMap,$0=!!I.specularIntensityMap,D0=y0&&!!I.transmissionMap,C0=y0&&!!I.thicknessMap,p0=!!I.gradientMap,G0=!!I.alphaMap,f=I.alphaTest>0,I0=!!I.alphaHash,L0=!!I.extensions,g0=!!h.attributes.uv1,j0=!!h.attributes.uv2,a0=!!h.attributes.uv3,Z8=0;if(I.toneMapped){if(x0===null||x0.isXRRenderTarget===!0)Z8=J.toneMapping}return{isWebGL2:U,shaderID:g,shaderType:I.type,shaderName:I.name,vertexShader:e,fragmentShader:H0,defines:I.defines,customVertexShaderID:V0,customFragmentShaderID:R0,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:G,batching:_0,instancing:u0,instancingColor:u0&&r.instanceColor!==null,supportsVertexTextures:V,outputColorSpace:x0===null?J.outputColorSpace:x0.isXRRenderTarget===!0?x0.texture.colorSpace:"srgb-linear",map:f0,matcap:x,envMap:O0,envMapMode:O0&&i.mapping,envMapCubeUVHeight:d,aoMap:W0,lightMap:K0,bumpMap:Q0,normalMap:z0,displacementMap:V&&E0,emissiveMap:P0,normalMapObjectSpace:z0&&I.normalMapType===1,normalMapTangentSpace:z0&&I.normalMapType===0,metalnessMap:S,roughnessMap:M,anisotropy:l,anisotropyMap:F0,clearcoat:q0,clearcoatMap:A0,clearcoatNormalMap:T0,clearcoatRoughnessMap:h0,iridescence:Z0,iridescenceMap:X0,iridescenceThicknessMap:O8,sheen:U0,sheenColorMap:l0,sheenRoughnessMap:v0,specularMap:M0,specularColorMap:j,specularIntensityMap:$0,transmission:y0,transmissionMap:D0,thicknessMap:C0,gradientMap:p0,opaque:I.transparent===!1&&I.blending===1,alphaMap:G0,alphaTest:f,alphaHash:I0,combine:I.combine,mapUv:f0&&E(I.map.channel),aoMapUv:W0&&E(I.aoMap.channel),lightMapUv:K0&&E(I.lightMap.channel),bumpMapUv:Q0&&E(I.bumpMap.channel),normalMapUv:z0&&E(I.normalMap.channel),displacementMapUv:E0&&E(I.displacementMap.channel),emissiveMapUv:P0&&E(I.emissiveMap.channel),metalnessMapUv:S&&E(I.metalnessMap.channel),roughnessMapUv:M&&E(I.roughnessMap.channel),anisotropyMapUv:F0&&E(I.anisotropyMap.channel),clearcoatMapUv:A0&&E(I.clearcoatMap.channel),clearcoatNormalMapUv:T0&&E(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:h0&&E(I.clearcoatRoughnessMap.channel),iridescenceMapUv:X0&&E(I.iridescenceMap.channel),iridescenceThicknessMapUv:O8&&E(I.iridescenceThicknessMap.channel),sheenColorMapUv:l0&&E(I.sheenColorMap.channel),sheenRoughnessMapUv:v0&&E(I.sheenRoughnessMap.channel),specularMapUv:M0&&E(I.specularMap.channel),specularColorMapUv:j&&E(I.specularColorMap.channel),specularIntensityMapUv:$0&&E(I.specularIntensityMap.channel),transmissionMapUv:D0&&E(I.transmissionMap.channel),thicknessMapUv:C0&&E(I.thicknessMap.channel),alphaMapUv:G0&&E(I.alphaMap.channel),vertexTangents:!!h.attributes.tangent&&(z0||l),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!h.attributes.color&&h.attributes.color.itemSize===4,vertexUv1s:g0,vertexUv2s:j0,vertexUv3s:a0,pointsUvs:r.isPoints===!0&&!!h.attributes.uv&&(f0||G0),fog:!!y,useFog:I.fog===!0,fogExp2:y&&y.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:F,skinning:r.isSkinnedMesh===!0,morphTargets:h.morphAttributes.position!==void 0,morphNormals:h.morphAttributes.normal!==void 0,morphColors:h.morphAttributes.color!==void 0,morphTargetsCount:t,morphTextureStride:v,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numClippingPlanes:Y.numPlanes,numClipIntersection:Y.numIntersection,dithering:I.dithering,shadowMapEnabled:J.shadowMap.enabled&&b.length>0,shadowMapType:J.shadowMap.type,toneMapping:Z8,useLegacyLights:J._useLegacyLights,decodeVideoTexture:f0&&I.map.isVideoTexture===!0&&W8.getTransfer(I.map.colorSpace)==="srgb",premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===2,flipSided:I.side===1,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionDerivatives:L0&&I.extensions.derivatives===!0,extensionFragDepth:L0&&I.extensions.fragDepth===!0,extensionDrawBuffers:L0&&I.extensions.drawBuffers===!0,extensionShaderTextureLOD:L0&&I.extensions.shaderTextureLOD===!0,extensionClipCullDistance:L0&&I.extensions.clipCullDistance&&Q.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:U||Q.has("EXT_frag_depth"),rendererExtensionDrawBuffers:U||Q.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:U||Q.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:Q.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()}}function D(I){let k=[];if(I.shaderID)k.push(I.shaderID);else k.push(I.customVertexShaderID),k.push(I.customFragmentShaderID);if(I.defines!==void 0)for(let b in I.defines)k.push(b),k.push(I.defines[b]);if(I.isRawShaderMaterial===!1)R(k,I),B(k,I),k.push(J.outputColorSpace);return k.push(I.customProgramCacheKey),k.join()}function R(I,k){I.push(k.precision),I.push(k.outputColorSpace),I.push(k.envMapMode),I.push(k.envMapCubeUVHeight),I.push(k.mapUv),I.push(k.alphaMapUv),I.push(k.lightMapUv),I.push(k.aoMapUv),I.push(k.bumpMapUv),I.push(k.normalMapUv),I.push(k.displacementMapUv),I.push(k.emissiveMapUv),I.push(k.metalnessMapUv),I.push(k.roughnessMapUv),I.push(k.anisotropyMapUv),I.push(k.clearcoatMapUv),I.push(k.clearcoatNormalMapUv),I.push(k.clearcoatRoughnessMapUv),I.push(k.iridescenceMapUv),I.push(k.iridescenceThicknessMapUv),I.push(k.sheenColorMapUv),I.push(k.sheenRoughnessMapUv),I.push(k.specularMapUv),I.push(k.specularColorMapUv),I.push(k.specularIntensityMapUv),I.push(k.transmissionMapUv),I.push(k.thicknessMapUv),I.push(k.combine),I.push(k.fogExp2),I.push(k.sizeAttenuation),I.push(k.morphTargetsCount),I.push(k.morphAttributeCount),I.push(k.numDirLights),I.push(k.numPointLights),I.push(k.numSpotLights),I.push(k.numSpotLightMaps),I.push(k.numHemiLights),I.push(k.numRectAreaLights),I.push(k.numDirLightShadows),I.push(k.numPointLightShadows),I.push(k.numSpotLightShadows),I.push(k.numSpotLightShadowsWithMaps),I.push(k.numLightProbes),I.push(k.shadowMapType),I.push(k.toneMapping),I.push(k.numClippingPlanes),I.push(k.numClipIntersection),I.push(k.depthPacking)}function B(I,k){if(X.disableAll(),k.isWebGL2)X.enable(0);if(k.supportsVertexTextures)X.enable(1);if(k.instancing)X.enable(2);if(k.instancingColor)X.enable(3);if(k.matcap)X.enable(4);if(k.envMap)X.enable(5);if(k.normalMapObjectSpace)X.enable(6);if(k.normalMapTangentSpace)X.enable(7);if(k.clearcoat)X.enable(8);if(k.iridescence)X.enable(9);if(k.alphaTest)X.enable(10);if(k.vertexColors)X.enable(11);if(k.vertexAlphas)X.enable(12);if(k.vertexUv1s)X.enable(13);if(k.vertexUv2s)X.enable(14);if(k.vertexUv3s)X.enable(15);if(k.vertexTangents)X.enable(16);if(k.anisotropy)X.enable(17);if(k.alphaHash)X.enable(18);if(k.batching)X.enable(19);if(I.push(X.mask),X.disableAll(),k.fog)X.enable(0);if(k.useFog)X.enable(1);if(k.flatShading)X.enable(2);if(k.logarithmicDepthBuffer)X.enable(3);if(k.skinning)X.enable(4);if(k.morphTargets)X.enable(5);if(k.morphNormals)X.enable(6);if(k.morphColors)X.enable(7);if(k.premultipliedAlpha)X.enable(8);if(k.shadowMapEnabled)X.enable(9);if(k.useLegacyLights)X.enable(10);if(k.doubleSided)X.enable(11);if(k.flipSided)X.enable(12);if(k.useDepthPacking)X.enable(13);if(k.dithering)X.enable(14);if(k.transmission)X.enable(15);if(k.sheen)X.enable(16);if(k.opaque)X.enable(17);if(k.pointsUvs)X.enable(18);if(k.decodeVideoTexture)X.enable(19);I.push(X.mask)}function z(I){let k=N[I.type],b;if(k){let n=M9[k];b=wX.clone(n.uniforms)}else b=I.uniforms;return b}function C(I,k){let b;for(let n=0,r=q.length;n<r;n++){let y=q[n];if(y.cacheKey===k){b=y,++b.usedTimes;break}}if(b===void 0)b=new vq(J,k,I,W),q.push(b);return b}function L(I){if(--I.usedTimes===0){let k=q.indexOf(I);q[k]=q[q.length-1],q.pop(),I.destroy()}}function A(I){H.remove(I)}function _(){H.dispose()}return{getParameters:O,getProgramCacheKey:D,getUniforms:z,acquireProgram:C,releaseProgram:L,releaseShaderCache:A,programs:q,dispose:_}}function uq(){let J=new WeakMap;function $(W){let Y=J.get(W);if(Y===void 0)Y={},J.set(W,Y);return Y}function Z(W){J.delete(W)}function Q(W,Y,X){J.get(W)[Y]=X}function K(){J=new WeakMap}return{get:$,remove:Z,update:Q,dispose:K}}function dq(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function A6(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function M6(){let J=[],$=0,Z=[],Q=[],K=[];function W(){$=0,Z.length=0,Q.length=0,K.length=0}function Y(F,V,G,N,E,O){let D=J[$];if(D===void 0)D={id:F.id,object:F,geometry:V,material:G,groupOrder:N,renderOrder:F.renderOrder,z:E,group:O},J[$]=D;else D.id=F.id,D.object=F,D.geometry=V,D.material=G,D.groupOrder=N,D.renderOrder=F.renderOrder,D.z=E,D.group=O;return $++,D}function X(F,V,G,N,E,O){let D=Y(F,V,G,N,E,O);if(G.transmission>0)Q.push(D);else if(G.transparent===!0)K.push(D);else Z.push(D)}function H(F,V,G,N,E,O){let D=Y(F,V,G,N,E,O);if(G.transmission>0)Q.unshift(D);else if(G.transparent===!0)K.unshift(D);else Z.unshift(D)}function q(F,V){if(Z.length>1)Z.sort(F||dq);if(Q.length>1)Q.sort(V||A6);if(K.length>1)K.sort(V||A6)}function U(){for(let F=$,V=J.length;F<V;F++){let G=J[F];if(G.id===null)break;G.id=null,G.object=null,G.geometry=null,G.material=null,G.group=null}}return{opaque:Z,transmissive:Q,transparent:K,init:W,push:X,unshift:H,finish:U,sort:q}}function pq(){let J=new WeakMap;function $(Q,K){let W=J.get(Q),Y;if(W===void 0)Y=new M6,J.set(Q,[Y]);else if(K>=W.length)Y=new M6,W.push(Y);else Y=W[K];return Y}function Z(){J=new WeakMap}return{get:$,dispose:Z}}function lq(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Z;switch($.type){case"DirectionalLight":Z={direction:new T,color:new e0};break;case"SpotLight":Z={position:new T,direction:new T,color:new e0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Z={position:new T,color:new e0,distance:0,decay:0};break;case"HemisphereLight":Z={direction:new T,skyColor:new e0,groundColor:new e0};break;case"RectAreaLight":Z={color:new e0,position:new T,halfWidth:new T,halfHeight:new T};break}return J[$.id]=Z,Z}}}function cq(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Z;switch($.type){case"DirectionalLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y0};break;case"SpotLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y0};break;case"PointLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Z,Z}}}var nq=0;function sq(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function iq(J,$){let Z=new lq,Q=cq(),K={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)K.probe.push(new T);let W=new T,Y=new q8,X=new q8;function H(U,F){let V=0,G=0,N=0;for(let n=0;n<9;n++)K.probe[n].set(0,0,0);let E=0,O=0,D=0,R=0,B=0,z=0,C=0,L=0,A=0,_=0,I=0;U.sort(sq);let k=F===!0?Math.PI:1;for(let n=0,r=U.length;n<r;n++){let y=U[n],h=y.color,m=y.intensity,i=y.distance,d=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)V+=h.r*m*k,G+=h.g*m*k,N+=h.b*m*k;else if(y.isLightProbe){for(let g=0;g<9;g++)K.probe[g].addScaledVector(y.sh.coefficients[g],m);I++}else if(y.isDirectionalLight){let g=Z.get(y);if(g.color.copy(y.color).multiplyScalar(y.intensity*k),y.castShadow){let p=y.shadow,t=Q.get(y);t.shadowBias=p.bias,t.shadowNormalBias=p.normalBias,t.shadowRadius=p.radius,t.shadowMapSize=p.mapSize,K.directionalShadow[E]=t,K.directionalShadowMap[E]=d,K.directionalShadowMatrix[E]=y.shadow.matrix,z++}K.directional[E]=g,E++}else if(y.isSpotLight){let g=Z.get(y);g.position.setFromMatrixPosition(y.matrixWorld),g.color.copy(h).multiplyScalar(m*k),g.distance=i,g.coneCos=Math.cos(y.angle),g.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),g.decay=y.decay,K.spot[D]=g;let p=y.shadow;if(y.map){if(K.spotLightMap[A]=y.map,A++,p.updateMatrices(y),y.castShadow)_++}if(K.spotLightMatrix[D]=p.matrix,y.castShadow){let t=Q.get(y);t.shadowBias=p.bias,t.shadowNormalBias=p.normalBias,t.shadowRadius=p.radius,t.shadowMapSize=p.mapSize,K.spotShadow[D]=t,K.spotShadowMap[D]=d,L++}D++}else if(y.isRectAreaLight){let g=Z.get(y);g.color.copy(h).multiplyScalar(m),g.halfWidth.set(y.width*0.5,0,0),g.halfHeight.set(0,y.height*0.5,0),K.rectArea[R]=g,R++}else if(y.isPointLight){let g=Z.get(y);if(g.color.copy(y.color).multiplyScalar(y.intensity*k),g.distance=y.distance,g.decay=y.decay,y.castShadow){let p=y.shadow,t=Q.get(y);t.shadowBias=p.bias,t.shadowNormalBias=p.normalBias,t.shadowRadius=p.radius,t.shadowMapSize=p.mapSize,t.shadowCameraNear=p.camera.near,t.shadowCameraFar=p.camera.far,K.pointShadow[O]=t,K.pointShadowMap[O]=d,K.pointShadowMatrix[O]=y.shadow.matrix,C++}K.point[O]=g,O++}else if(y.isHemisphereLight){let g=Z.get(y);g.skyColor.copy(y.color).multiplyScalar(m*k),g.groundColor.copy(y.groundColor).multiplyScalar(m*k),K.hemi[B]=g,B++}}if(R>0)if($.isWebGL2)if(J.has("OES_texture_float_linear")===!0)K.rectAreaLTC1=B0.LTC_FLOAT_1,K.rectAreaLTC2=B0.LTC_FLOAT_2;else K.rectAreaLTC1=B0.LTC_HALF_1,K.rectAreaLTC2=B0.LTC_HALF_2;else if(J.has("OES_texture_float_linear")===!0)K.rectAreaLTC1=B0.LTC_FLOAT_1,K.rectAreaLTC2=B0.LTC_FLOAT_2;else if(J.has("OES_texture_half_float_linear")===!0)K.rectAreaLTC1=B0.LTC_HALF_1,K.rectAreaLTC2=B0.LTC_HALF_2;else console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.");K.ambient[0]=V,K.ambient[1]=G,K.ambient[2]=N;let b=K.hash;if(b.directionalLength!==E||b.pointLength!==O||b.spotLength!==D||b.rectAreaLength!==R||b.hemiLength!==B||b.numDirectionalShadows!==z||b.numPointShadows!==C||b.numSpotShadows!==L||b.numSpotMaps!==A||b.numLightProbes!==I)K.directional.length=E,K.spot.length=D,K.rectArea.length=R,K.point.length=O,K.hemi.length=B,K.directionalShadow.length=z,K.directionalShadowMap.length=z,K.pointShadow.length=C,K.pointShadowMap.length=C,K.spotShadow.length=L,K.spotShadowMap.length=L,K.directionalShadowMatrix.length=z,K.pointShadowMatrix.length=C,K.spotLightMatrix.length=L+A-_,K.spotLightMap.length=A,K.numSpotLightShadowsWithMaps=_,K.numLightProbes=I,b.directionalLength=E,b.pointLength=O,b.spotLength=D,b.rectAreaLength=R,b.hemiLength=B,b.numDirectionalShadows=z,b.numPointShadows=C,b.numSpotShadows=L,b.numSpotMaps=A,b.numLightProbes=I,K.version=nq++}function q(U,F){let V=0,G=0,N=0,E=0,O=0,D=F.matrixWorldInverse;for(let R=0,B=U.length;R<B;R++){let z=U[R];if(z.isDirectionalLight){let C=K.directional[V];C.direction.setFromMatrixPosition(z.matrixWorld),W.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(D),V++}else if(z.isSpotLight){let C=K.spot[N];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),C.direction.setFromMatrixPosition(z.matrixWorld),W.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(D),N++}else if(z.isRectAreaLight){let C=K.rectArea[E];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),X.identity(),Y.copy(z.matrixWorld),Y.premultiply(D),X.extractRotation(Y),C.halfWidth.set(z.width*0.5,0,0),C.halfHeight.set(0,z.height*0.5,0),C.halfWidth.applyMatrix4(X),C.halfHeight.applyMatrix4(X),E++}else if(z.isPointLight){let C=K.point[G];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),G++}else if(z.isHemisphereLight){let C=K.hemi[O];C.direction.setFromMatrixPosition(z.matrixWorld),C.direction.transformDirection(D),O++}}}return{setup:H,setupView:q,state:K}}function k6(J,$){let Z=new iq(J,$),Q=[],K=[];function W(){Q.length=0,K.length=0}function Y(F){Q.push(F)}function X(F){K.push(F)}function H(F){Z.setup(Q,F)}function q(F){Z.setupView(Q,F)}return{init:W,state:{lightsArray:Q,shadowsArray:K,lights:Z},setupLights:H,setupLightsView:q,pushLight:Y,pushShadow:X}}function oq(J,$){let Z=new WeakMap;function Q(W,Y=0){let X=Z.get(W),H;if(X===void 0)H=new k6(J,$),Z.set(W,[H]);else if(Y>=X.length)H=new k6(J,$),X.push(H);else H=X[Y];return H}function K(){Z=new WeakMap}return{get:Q,dispose:K}}class FK extends d9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class VK extends d9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}var rq=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aq=`uniform sampler2D shadow_pass;
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
}`;function tq(J,$,Z){let Q=new $Z,K=new Y0,W=new Y0,Y=new D8,X=new FK({depthPacking:3201}),H=new VK,q={},U=Z.maxTextureSize,F={[0]:1,[1]:0,[2]:2},V=new ZJ({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y0},radius:{value:4}},vertexShader:rq,fragmentShader:aq}),G=V.clone();G.defines.HORIZONTAL_PASS=1;let N=new F8;N.setAttribute("position",new v8(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let E=new w(N,V),O=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let D=this.type;this.render=function(L,A,_){if(O.enabled===!1)return;if(O.autoUpdate===!1&&O.needsUpdate===!1)return;if(L.length===0)return;let I=J.getRenderTarget(),k=J.getActiveCubeFace(),b=J.getActiveMipmapLevel(),n=J.state;n.setBlending(0),n.buffers.color.setClear(1,1,1,1),n.buffers.depth.setTest(!0),n.setScissorTest(!1);let r=D!==3&&this.type===3,y=D===3&&this.type!==3;for(let h=0,m=L.length;h<m;h++){let i=L[h],d=i.shadow;if(d===void 0){console.warn("THREE.WebGLShadowMap:",i,"has no shadow.");continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;K.copy(d.mapSize);let g=d.getFrameExtents();if(K.multiply(g),W.copy(d.mapSize),K.x>U||K.y>U){if(K.x>U)W.x=Math.floor(U/g.x),K.x=W.x*g.x,d.mapSize.x=W.x;if(K.y>U)W.y=Math.floor(U/g.y),K.y=W.y*g.y,d.mapSize.y=W.y}if(d.map===null||r===!0||y===!0){let t=this.type!==3?{minFilter:1003,magFilter:1003}:{};if(d.map!==null)d.map.dispose();d.map=new $J(K.x,K.y,t),d.map.texture.name=i.name+".shadowMap",d.camera.updateProjectionMatrix()}J.setRenderTarget(d.map),J.clear();let p=d.getViewportCount();for(let t=0;t<p;t++){let v=d.getViewport(t);Y.set(W.x*v.x,W.y*v.y,W.x*v.z,W.y*v.w),n.viewport(Y),d.updateMatrices(i,t),Q=d.getFrustum(),z(A,_,d.camera,i,this.type)}if(d.isPointLightShadow!==!0&&this.type===3)R(d,_);d.needsUpdate=!1}D=this.type,O.needsUpdate=!1,J.setRenderTarget(I,k,b)};function R(L,A){let _=$.update(E);if(V.defines.VSM_SAMPLES!==L.blurSamples)V.defines.VSM_SAMPLES=L.blurSamples,G.defines.VSM_SAMPLES=L.blurSamples,V.needsUpdate=!0,G.needsUpdate=!0;if(L.mapPass===null)L.mapPass=new $J(K.x,K.y);V.uniforms.shadow_pass.value=L.map.texture,V.uniforms.resolution.value=L.mapSize,V.uniforms.radius.value=L.radius,J.setRenderTarget(L.mapPass),J.clear(),J.renderBufferDirect(A,null,_,V,E,null),G.uniforms.shadow_pass.value=L.mapPass.texture,G.uniforms.resolution.value=L.mapSize,G.uniforms.radius.value=L.radius,J.setRenderTarget(L.map),J.clear(),J.renderBufferDirect(A,null,_,G,E,null)}function B(L,A,_,I){let k=null,b=_.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(b!==void 0)k=b;else if(k=_.isPointLight===!0?H:X,J.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let n=k.uuid,r=A.uuid,y=q[n];if(y===void 0)y={},q[n]=y;let h=y[r];if(h===void 0)h=k.clone(),y[r]=h,A.addEventListener("dispose",C);k=h}if(k.visible=A.visible,k.wireframe=A.wireframe,I===3)k.side=A.shadowSide!==null?A.shadowSide:A.side;else k.side=A.shadowSide!==null?A.shadowSide:F[A.side];if(k.alphaMap=A.alphaMap,k.alphaTest=A.alphaTest,k.map=A.map,k.clipShadows=A.clipShadows,k.clippingPlanes=A.clippingPlanes,k.clipIntersection=A.clipIntersection,k.displacementMap=A.displacementMap,k.displacementScale=A.displacementScale,k.displacementBias=A.displacementBias,k.wireframeLinewidth=A.wireframeLinewidth,k.linewidth=A.linewidth,_.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let n=J.properties.get(k);n.light=_}return k}function z(L,A,_,I,k){if(L.visible===!1)return;if(L.layers.test(A.layers)&&(L.isMesh||L.isLine||L.isPoints)){if((L.castShadow||L.receiveShadow&&k===3)&&(!L.frustumCulled||Q.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,L.matrixWorld);let r=$.update(L),y=L.material;if(Array.isArray(y)){let h=r.groups;for(let m=0,i=h.length;m<i;m++){let d=h[m],g=y[d.materialIndex];if(g&&g.visible){let p=B(L,g,I,k);L.onBeforeShadow(J,L,A,_,r,p,d),J.renderBufferDirect(_,null,r,p,L,d),L.onAfterShadow(J,L,A,_,r,p,d)}}}else if(y.visible){let h=B(L,y,I,k);L.onBeforeShadow(J,L,A,_,r,h,null),J.renderBufferDirect(_,null,r,h,L,null),L.onAfterShadow(J,L,A,_,r,h,null)}}}let n=L.children;for(let r=0,y=n.length;r<y;r++)z(n[r],A,_,I,k)}function C(L){L.target.removeEventListener("dispose",C);for(let _ in q){let I=q[_],k=L.target.uuid;if(k in I)I[k].dispose(),delete I[k]}}}function eq(J,$,Z){let Q=Z.isWebGL2;function K(){let f=!1,I0=new D8,L0=null,g0=new D8(0,0,0,0);return{setMask:function(j0){if(L0!==j0&&!f)J.colorMask(j0,j0,j0,j0),L0=j0},setLocked:function(j0){f=j0},setClear:function(j0,a0,Z8,U8,k8){if(k8===!0)j0*=U8,a0*=U8,Z8*=U8;if(I0.set(j0,a0,Z8,U8),g0.equals(I0)===!1)J.clearColor(j0,a0,Z8,U8),g0.copy(I0)},reset:function(){f=!1,L0=null,g0.set(-1,0,0,0)}}}function W(){let f=!1,I0=null,L0=null,g0=null;return{setTest:function(j0){if(j0)_0(J.DEPTH_TEST);else f0(J.DEPTH_TEST)},setMask:function(j0){if(I0!==j0&&!f)J.depthMask(j0),I0=j0},setFunc:function(j0){if(L0!==j0){switch(j0){case 0:J.depthFunc(J.NEVER);break;case 1:J.depthFunc(J.ALWAYS);break;case 2:J.depthFunc(J.LESS);break;case 3:J.depthFunc(J.LEQUAL);break;case 4:J.depthFunc(J.EQUAL);break;case 5:J.depthFunc(J.GEQUAL);break;case 6:J.depthFunc(J.GREATER);break;case 7:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}L0=j0}},setLocked:function(j0){f=j0},setClear:function(j0){if(g0!==j0)J.clearDepth(j0),g0=j0},reset:function(){f=!1,I0=null,L0=null,g0=null}}}function Y(){let f=!1,I0=null,L0=null,g0=null,j0=null,a0=null,Z8=null,U8=null,k8=null;return{setTest:function(t0){if(!f)if(t0)_0(J.STENCIL_TEST);else f0(J.STENCIL_TEST)},setMask:function(t0){if(I0!==t0&&!f)J.stencilMask(t0),I0=t0},setFunc:function(t0,L9,C9){if(L0!==t0||g0!==L9||j0!==C9)J.stencilFunc(t0,L9,C9),L0=t0,g0=L9,j0=C9},setOp:function(t0,L9,C9){if(a0!==t0||Z8!==L9||U8!==C9)J.stencilOp(t0,L9,C9),a0=t0,Z8=L9,U8=C9},setLocked:function(t0){f=t0},setClear:function(t0){if(k8!==t0)J.clearStencil(t0),k8=t0},reset:function(){f=!1,I0=null,L0=null,g0=null,j0=null,a0=null,Z8=null,U8=null,k8=null}}}let X=new K,H=new W,q=new Y,U=new WeakMap,F=new WeakMap,V={},G={},N=new WeakMap,E=[],O=null,D=!1,R=null,B=null,z=null,C=null,L=null,A=null,_=null,I=new e0(0,0,0),k=0,b=!1,n=null,r=null,y=null,h=null,m=null,i=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),d=!1,g=0,p=J.getParameter(J.VERSION);if(p.indexOf("WebGL")!==-1)g=parseFloat(/^WebGL (\d)/.exec(p)[1]),d=g>=1;else if(p.indexOf("OpenGL ES")!==-1)g=parseFloat(/^OpenGL ES (\d)/.exec(p)[1]),d=g>=2;let t=null,v={},e=J.getParameter(J.SCISSOR_BOX),H0=J.getParameter(J.VIEWPORT),V0=new D8().fromArray(e),R0=new D8().fromArray(H0);function x0(f,I0,L0,g0){let j0=new Uint8Array(4),a0=J.createTexture();J.bindTexture(f,a0),J.texParameteri(f,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(f,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let Z8=0;Z8<L0;Z8++)if(Q&&(f===J.TEXTURE_3D||f===J.TEXTURE_2D_ARRAY))J.texImage3D(I0,0,J.RGBA,1,1,g0,0,J.RGBA,J.UNSIGNED_BYTE,j0);else J.texImage2D(I0+Z8,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,j0);return a0}let u0={};if(u0[J.TEXTURE_2D]=x0(J.TEXTURE_2D,J.TEXTURE_2D,1),u0[J.TEXTURE_CUBE_MAP]=x0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q)u0[J.TEXTURE_2D_ARRAY]=x0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),u0[J.TEXTURE_3D]=x0(J.TEXTURE_3D,J.TEXTURE_3D,1,1);X.setClear(0,0,0,1),H.setClear(1),q.setClear(0),_0(J.DEPTH_TEST),H.setFunc(3),P0(!1),S(1),_0(J.CULL_FACE),z0(0);function _0(f){if(V[f]!==!0)J.enable(f),V[f]=!0}function f0(f){if(V[f]!==!1)J.disable(f),V[f]=!1}function x(f,I0){if(G[f]!==I0){if(J.bindFramebuffer(f,I0),G[f]=I0,Q){if(f===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=I0;if(f===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=I0}return!0}return!1}function O0(f,I0){let L0=E,g0=!1;if(f){if(L0=N.get(I0),L0===void 0)L0=[],N.set(I0,L0);if(f.isWebGLMultipleRenderTargets){let j0=f.texture;if(L0.length!==j0.length||L0[0]!==J.COLOR_ATTACHMENT0){for(let a0=0,Z8=j0.length;a0<Z8;a0++)L0[a0]=J.COLOR_ATTACHMENT0+a0;L0.length=j0.length,g0=!0}}else if(L0[0]!==J.COLOR_ATTACHMENT0)L0[0]=J.COLOR_ATTACHMENT0,g0=!0}else if(L0[0]!==J.BACK)L0[0]=J.BACK,g0=!0;if(g0)if(Z.isWebGL2)J.drawBuffers(L0);else $.get("WEBGL_draw_buffers").drawBuffersWEBGL(L0)}function W0(f){if(O!==f)return J.useProgram(f),O=f,!0;return!1}let K0={[100]:J.FUNC_ADD,[101]:J.FUNC_SUBTRACT,[102]:J.FUNC_REVERSE_SUBTRACT};if(Q)K0[103]=J.MIN,K0[104]=J.MAX;else{let f=$.get("EXT_blend_minmax");if(f!==null)K0[103]=f.MIN_EXT,K0[104]=f.MAX_EXT}let Q0={[200]:J.ZERO,[201]:J.ONE,[202]:J.SRC_COLOR,[204]:J.SRC_ALPHA,[210]:J.SRC_ALPHA_SATURATE,[208]:J.DST_COLOR,[206]:J.DST_ALPHA,[203]:J.ONE_MINUS_SRC_COLOR,[205]:J.ONE_MINUS_SRC_ALPHA,[209]:J.ONE_MINUS_DST_COLOR,[207]:J.ONE_MINUS_DST_ALPHA,[211]:J.CONSTANT_COLOR,[212]:J.ONE_MINUS_CONSTANT_COLOR,[213]:J.CONSTANT_ALPHA,[214]:J.ONE_MINUS_CONSTANT_ALPHA};function z0(f,I0,L0,g0,j0,a0,Z8,U8,k8,t0){if(f===0){if(D===!0)f0(J.BLEND),D=!1;return}if(D===!1)_0(J.BLEND),D=!0;if(f!==5){if(f!==R||t0!==b){if(B!==100||L!==100)J.blendEquation(J.FUNC_ADD),B=100,L=100;if(t0)switch(f){case 1:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.ONE,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFuncSeparate(J.ZERO,J.SRC_COLOR,J.ZERO,J.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",f);break}else switch(f){case 1:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.SRC_ALPHA,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFunc(J.ZERO,J.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",f);break}z=null,C=null,A=null,_=null,I.set(0,0,0),k=0,R=f,b=t0}return}if(j0=j0||I0,a0=a0||L0,Z8=Z8||g0,I0!==B||j0!==L)J.blendEquationSeparate(K0[I0],K0[j0]),B=I0,L=j0;if(L0!==z||g0!==C||a0!==A||Z8!==_)J.blendFuncSeparate(Q0[L0],Q0[g0],Q0[a0],Q0[Z8]),z=L0,C=g0,A=a0,_=Z8;if(U8.equals(I)===!1||k8!==k)J.blendColor(U8.r,U8.g,U8.b,k8),I.copy(U8),k=k8;R=f,b=!1}function E0(f,I0){f.side===2?f0(J.CULL_FACE):_0(J.CULL_FACE);let L0=f.side===1;if(I0)L0=!L0;P0(L0),f.blending===1&&f.transparent===!1?z0(0):z0(f.blending,f.blendEquation,f.blendSrc,f.blendDst,f.blendEquationAlpha,f.blendSrcAlpha,f.blendDstAlpha,f.blendColor,f.blendAlpha,f.premultipliedAlpha),H.setFunc(f.depthFunc),H.setTest(f.depthTest),H.setMask(f.depthWrite),X.setMask(f.colorWrite);let g0=f.stencilWrite;if(q.setTest(g0),g0)q.setMask(f.stencilWriteMask),q.setFunc(f.stencilFunc,f.stencilRef,f.stencilFuncMask),q.setOp(f.stencilFail,f.stencilZFail,f.stencilZPass);l(f.polygonOffset,f.polygonOffsetFactor,f.polygonOffsetUnits),f.alphaToCoverage===!0?_0(J.SAMPLE_ALPHA_TO_COVERAGE):f0(J.SAMPLE_ALPHA_TO_COVERAGE)}function P0(f){if(n!==f){if(f)J.frontFace(J.CW);else J.frontFace(J.CCW);n=f}}function S(f){if(f!==0){if(_0(J.CULL_FACE),f!==r)if(f===1)J.cullFace(J.BACK);else if(f===2)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else f0(J.CULL_FACE);r=f}function M(f){if(f!==y){if(d)J.lineWidth(f);y=f}}function l(f,I0,L0){if(f){if(_0(J.POLYGON_OFFSET_FILL),h!==I0||m!==L0)J.polygonOffset(I0,L0),h=I0,m=L0}else f0(J.POLYGON_OFFSET_FILL)}function q0(f){if(f)_0(J.SCISSOR_TEST);else f0(J.SCISSOR_TEST)}function Z0(f){if(f===void 0)f=J.TEXTURE0+i-1;if(t!==f)J.activeTexture(f),t=f}function U0(f,I0,L0){if(L0===void 0)if(t===null)L0=J.TEXTURE0+i-1;else L0=t;let g0=v[L0];if(g0===void 0)g0={type:void 0,texture:void 0},v[L0]=g0;if(g0.type!==f||g0.texture!==I0){if(t!==L0)J.activeTexture(L0),t=L0;J.bindTexture(f,I0||u0[f]),g0.type=f,g0.texture=I0}}function y0(){let f=v[t];if(f!==void 0&&f.type!==void 0)J.bindTexture(f.type,null),f.type=void 0,f.texture=void 0}function F0(){try{J.compressedTexImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function A0(){try{J.compressedTexImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function T0(){try{J.texSubImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function h0(){try{J.texSubImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function X0(){try{J.compressedTexSubImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function O8(){try{J.compressedTexSubImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function l0(){try{J.texStorage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function v0(){try{J.texStorage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function M0(){try{J.texImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function j(){try{J.texImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function $0(f){if(V0.equals(f)===!1)J.scissor(f.x,f.y,f.z,f.w),V0.copy(f)}function D0(f){if(R0.equals(f)===!1)J.viewport(f.x,f.y,f.z,f.w),R0.copy(f)}function C0(f,I0){let L0=F.get(I0);if(L0===void 0)L0=new WeakMap,F.set(I0,L0);let g0=L0.get(f);if(g0===void 0)g0=J.getUniformBlockIndex(I0,f.name),L0.set(f,g0)}function p0(f,I0){let g0=F.get(I0).get(f);if(U.get(I0)!==g0)J.uniformBlockBinding(I0,g0,f.__bindingPointIndex),U.set(I0,g0)}function G0(){if(J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),Q===!0)J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null);J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),V={},t=null,v={},G={},N=new WeakMap,E=[],O=null,D=!1,R=null,B=null,z=null,C=null,L=null,A=null,_=null,I=new e0(0,0,0),k=0,b=!1,n=null,r=null,y=null,h=null,m=null,V0.set(0,0,J.canvas.width,J.canvas.height),R0.set(0,0,J.canvas.width,J.canvas.height),X.reset(),H.reset(),q.reset()}return{buffers:{color:X,depth:H,stencil:q},enable:_0,disable:f0,bindFramebuffer:x,drawBuffers:O0,useProgram:W0,setBlending:z0,setMaterial:E0,setFlipSided:P0,setCullFace:S,setLineWidth:M,setPolygonOffset:l,setScissorTest:q0,activeTexture:Z0,bindTexture:U0,unbindTexture:y0,compressedTexImage2D:F0,compressedTexImage3D:A0,texImage2D:M0,texImage3D:j,updateUBOMapping:C0,uniformBlockBinding:p0,texStorage2D:l0,texStorage3D:v0,texSubImage2D:T0,texSubImage3D:h0,compressedTexSubImage2D:X0,compressedTexSubImage3D:O8,scissor:$0,viewport:D0,reset:G0}}function J4(J,$,Z,Q,K,W,Y){let X=K.isWebGL2,H=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,q=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new WeakMap,F,V=new WeakMap,G=!1;try{G=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(S){}function N(S,M){return G?new OffscreenCanvas(S,M):o$("canvas")}function E(S,M,l,q0){let Z0=1;if(S.width>q0||S.height>q0)Z0=q0/Math.max(S.width,S.height);if(Z0<1||M===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){let U0=M?i$:Math.floor,y0=U0(Z0*S.width),F0=U0(Z0*S.height);if(F===void 0)F=N(y0,F0);let A0=l?N(y0,F0):F;return A0.width=y0,A0.height=F0,A0.getContext("2d").drawImage(S,0,0,y0,F0),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+y0+"x"+F0+")."),A0}else{if("data"in S)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+").");return S}return S}function O(S){return qQ(S.width)&&qQ(S.height)}function D(S){if(X)return!1;return S.wrapS!==1001||S.wrapT!==1001||S.minFilter!==1003&&S.minFilter!==1006}function R(S,M){return S.generateMipmaps&&M&&S.minFilter!==1003&&S.minFilter!==1006}function B(S){J.generateMipmap(S)}function z(S,M,l,q0,Z0=!1){if(X===!1)return M;if(S!==null){if(J[S]!==void 0)return J[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let U0=M;if(M===J.RED){if(l===J.FLOAT)U0=J.R32F;if(l===J.HALF_FLOAT)U0=J.R16F;if(l===J.UNSIGNED_BYTE)U0=J.R8}if(M===J.RED_INTEGER){if(l===J.UNSIGNED_BYTE)U0=J.R8UI;if(l===J.UNSIGNED_SHORT)U0=J.R16UI;if(l===J.UNSIGNED_INT)U0=J.R32UI;if(l===J.BYTE)U0=J.R8I;if(l===J.SHORT)U0=J.R16I;if(l===J.INT)U0=J.R32I}if(M===J.RG){if(l===J.FLOAT)U0=J.RG32F;if(l===J.HALF_FLOAT)U0=J.RG16F;if(l===J.UNSIGNED_BYTE)U0=J.RG8}if(M===J.RGBA){let y0=Z0?"linear":W8.getTransfer(q0);if(l===J.FLOAT)U0=J.RGBA32F;if(l===J.HALF_FLOAT)U0=J.RGBA16F;if(l===J.UNSIGNED_BYTE)U0=y0==="srgb"?J.SRGB8_ALPHA8:J.RGBA8;if(l===J.UNSIGNED_SHORT_4_4_4_4)U0=J.RGBA4;if(l===J.UNSIGNED_SHORT_5_5_5_1)U0=J.RGB5_A1}if(U0===J.R16F||U0===J.R32F||U0===J.RG16F||U0===J.RG32F||U0===J.RGBA16F||U0===J.RGBA32F)$.get("EXT_color_buffer_float");return U0}function C(S,M,l){if(R(S,l)===!0||S.isFramebufferTexture&&S.minFilter!==1003&&S.minFilter!==1006)return Math.log2(Math.max(M.width,M.height))+1;else if(S.mipmaps!==void 0&&S.mipmaps.length>0)return S.mipmaps.length;else if(S.isCompressedTexture&&Array.isArray(S.image))return M.mipmaps.length;else return 1}function L(S){if(S===1003||S===1004||S===1005)return J.NEAREST;return J.LINEAR}function A(S){let M=S.target;if(M.removeEventListener("dispose",A),I(M),M.isVideoTexture)U.delete(M)}function _(S){let M=S.target;M.removeEventListener("dispose",_),b(M)}function I(S){let M=Q.get(S);if(M.__webglInit===void 0)return;let l=S.source,q0=V.get(l);if(q0){let Z0=q0[M.__cacheKey];if(Z0.usedTimes--,Z0.usedTimes===0)k(S);if(Object.keys(q0).length===0)V.delete(l)}Q.remove(S)}function k(S){let M=Q.get(S);J.deleteTexture(M.__webglTexture);let l=S.source,q0=V.get(l);delete q0[M.__cacheKey],Y.memory.textures--}function b(S){let M=S.texture,l=Q.get(S),q0=Q.get(M);if(q0.__webglTexture!==void 0)J.deleteTexture(q0.__webglTexture),Y.memory.textures--;if(S.depthTexture)S.depthTexture.dispose();if(S.isWebGLCubeRenderTarget)for(let Z0=0;Z0<6;Z0++){if(Array.isArray(l.__webglFramebuffer[Z0]))for(let U0=0;U0<l.__webglFramebuffer[Z0].length;U0++)J.deleteFramebuffer(l.__webglFramebuffer[Z0][U0]);else J.deleteFramebuffer(l.__webglFramebuffer[Z0]);if(l.__webglDepthbuffer)J.deleteRenderbuffer(l.__webglDepthbuffer[Z0])}else{if(Array.isArray(l.__webglFramebuffer))for(let Z0=0;Z0<l.__webglFramebuffer.length;Z0++)J.deleteFramebuffer(l.__webglFramebuffer[Z0]);else J.deleteFramebuffer(l.__webglFramebuffer);if(l.__webglDepthbuffer)J.deleteRenderbuffer(l.__webglDepthbuffer);if(l.__webglMultisampledFramebuffer)J.deleteFramebuffer(l.__webglMultisampledFramebuffer);if(l.__webglColorRenderbuffer){for(let Z0=0;Z0<l.__webglColorRenderbuffer.length;Z0++)if(l.__webglColorRenderbuffer[Z0])J.deleteRenderbuffer(l.__webglColorRenderbuffer[Z0])}if(l.__webglDepthRenderbuffer)J.deleteRenderbuffer(l.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let Z0=0,U0=M.length;Z0<U0;Z0++){let y0=Q.get(M[Z0]);if(y0.__webglTexture)J.deleteTexture(y0.__webglTexture),Y.memory.textures--;Q.remove(M[Z0])}Q.remove(M),Q.remove(S)}let n=0;function r(){n=0}function y(){let S=n;if(S>=K.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+K.maxTextures);return n+=1,S}function h(S){let M=[];return M.push(S.wrapS),M.push(S.wrapT),M.push(S.wrapR||0),M.push(S.magFilter),M.push(S.minFilter),M.push(S.anisotropy),M.push(S.internalFormat),M.push(S.format),M.push(S.type),M.push(S.generateMipmaps),M.push(S.premultiplyAlpha),M.push(S.flipY),M.push(S.unpackAlignment),M.push(S.colorSpace),M.join()}function m(S,M){let l=Q.get(S);if(S.isVideoTexture)E0(S);if(S.isRenderTargetTexture===!1&&S.version>0&&l.__version!==S.version){let q0=S.image;if(q0===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q0.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V0(l,S,M);return}}Z.bindTexture(J.TEXTURE_2D,l.__webglTexture,J.TEXTURE0+M)}function i(S,M){let l=Q.get(S);if(S.version>0&&l.__version!==S.version){V0(l,S,M);return}Z.bindTexture(J.TEXTURE_2D_ARRAY,l.__webglTexture,J.TEXTURE0+M)}function d(S,M){let l=Q.get(S);if(S.version>0&&l.__version!==S.version){V0(l,S,M);return}Z.bindTexture(J.TEXTURE_3D,l.__webglTexture,J.TEXTURE0+M)}function g(S,M){let l=Q.get(S);if(S.version>0&&l.__version!==S.version){R0(l,S,M);return}Z.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture,J.TEXTURE0+M)}let p={[1000]:J.REPEAT,[1001]:J.CLAMP_TO_EDGE,[1002]:J.MIRRORED_REPEAT},t={[1003]:J.NEAREST,[1004]:J.NEAREST_MIPMAP_NEAREST,[1005]:J.NEAREST_MIPMAP_LINEAR,[1006]:J.LINEAR,[1007]:J.LINEAR_MIPMAP_NEAREST,[1008]:J.LINEAR_MIPMAP_LINEAR},v={[512]:J.NEVER,[519]:J.ALWAYS,[513]:J.LESS,[515]:J.LEQUAL,[514]:J.EQUAL,[518]:J.GEQUAL,[516]:J.GREATER,[517]:J.NOTEQUAL};function e(S,M,l){if(l){if(J.texParameteri(S,J.TEXTURE_WRAP_S,p[M.wrapS]),J.texParameteri(S,J.TEXTURE_WRAP_T,p[M.wrapT]),S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texParameteri(S,J.TEXTURE_WRAP_R,p[M.wrapR]);J.texParameteri(S,J.TEXTURE_MAG_FILTER,t[M.magFilter]),J.texParameteri(S,J.TEXTURE_MIN_FILTER,t[M.minFilter])}else{if(J.texParameteri(S,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(S,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE),S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texParameteri(S,J.TEXTURE_WRAP_R,J.CLAMP_TO_EDGE);if(M.wrapS!==1001||M.wrapT!==1001)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.");if(J.texParameteri(S,J.TEXTURE_MAG_FILTER,L(M.magFilter)),J.texParameteri(S,J.TEXTURE_MIN_FILTER,L(M.minFilter)),M.minFilter!==1003&&M.minFilter!==1006)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")}if(M.compareFunction)J.texParameteri(S,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(S,J.TEXTURE_COMPARE_FUNC,v[M.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){let q0=$.get("EXT_texture_filter_anisotropic");if(M.magFilter===1003)return;if(M.minFilter!==1005&&M.minFilter!==1008)return;if(M.type===1015&&$.has("OES_texture_float_linear")===!1)return;if(X===!1&&(M.type===1016&&$.has("OES_texture_half_float_linear")===!1))return;if(M.anisotropy>1||Q.get(M).__currentAnisotropy)J.texParameterf(S,q0.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,K.getMaxAnisotropy())),Q.get(M).__currentAnisotropy=M.anisotropy}}function H0(S,M){let l=!1;if(S.__webglInit===void 0)S.__webglInit=!0,M.addEventListener("dispose",A);let q0=M.source,Z0=V.get(q0);if(Z0===void 0)Z0={},V.set(q0,Z0);let U0=h(M);if(U0!==S.__cacheKey){if(Z0[U0]===void 0)Z0[U0]={texture:J.createTexture(),usedTimes:0},Y.memory.textures++,l=!0;Z0[U0].usedTimes++;let y0=Z0[S.__cacheKey];if(y0!==void 0){if(Z0[S.__cacheKey].usedTimes--,y0.usedTimes===0)k(M)}S.__cacheKey=U0,S.__webglTexture=Z0[U0].texture}return l}function V0(S,M,l){let q0=J.TEXTURE_2D;if(M.isDataArrayTexture||M.isCompressedArrayTexture)q0=J.TEXTURE_2D_ARRAY;if(M.isData3DTexture)q0=J.TEXTURE_3D;let Z0=H0(S,M),U0=M.source;Z.bindTexture(q0,S.__webglTexture,J.TEXTURE0+l);let y0=Q.get(U0);if(U0.version!==y0.__version||Z0===!0){Z.activeTexture(J.TEXTURE0+l);let F0=W8.getPrimaries(W8.workingColorSpace),A0=M.colorSpace===""?null:W8.getPrimaries(M.colorSpace),T0=M.colorSpace===""||F0===A0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,T0);let h0=D(M)&&O(M.image)===!1,X0=E(M.image,h0,!1,K.maxTextureSize);X0=P0(M,X0);let O8=O(X0)||X,l0=W.convert(M.format,M.colorSpace),v0=W.convert(M.type),M0=z(M.internalFormat,l0,v0,M.colorSpace,M.isVideoTexture);e(q0,M,O8);let j,$0=M.mipmaps,D0=X&&M.isVideoTexture!==!0&&M0!==36196,C0=y0.__version===void 0||Z0===!0,p0=C(M,X0,O8);if(M.isDepthTexture){if(M0=J.DEPTH_COMPONENT,X)if(M.type===1015)M0=J.DEPTH_COMPONENT32F;else if(M.type===1014)M0=J.DEPTH_COMPONENT24;else if(M.type===1020)M0=J.DEPTH24_STENCIL8;else M0=J.DEPTH_COMPONENT16;else if(M.type===1015)console.error("WebGLRenderer: Floating point depth texture requires WebGL2.");if(M.format===1026&&M0===J.DEPTH_COMPONENT){if(M.type!==1012&&M.type!==1014)console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=1014,v0=W.convert(M.type)}if(M.format===1027&&M0===J.DEPTH_COMPONENT){if(M0=J.DEPTH_STENCIL,M.type!==1020)console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=1020,v0=W.convert(M.type)}if(C0)if(D0)Z.texStorage2D(J.TEXTURE_2D,1,M0,X0.width,X0.height);else Z.texImage2D(J.TEXTURE_2D,0,M0,X0.width,X0.height,0,l0,v0,null)}else if(M.isDataTexture)if($0.length>0&&O8){if(D0&&C0)Z.texStorage2D(J.TEXTURE_2D,p0,M0,$0[0].width,$0[0].height);for(let G0=0,f=$0.length;G0<f;G0++)if(j=$0[G0],D0)Z.texSubImage2D(J.TEXTURE_2D,G0,0,0,j.width,j.height,l0,v0,j.data);else Z.texImage2D(J.TEXTURE_2D,G0,M0,j.width,j.height,0,l0,v0,j.data);M.generateMipmaps=!1}else if(D0){if(C0)Z.texStorage2D(J.TEXTURE_2D,p0,M0,X0.width,X0.height);Z.texSubImage2D(J.TEXTURE_2D,0,0,0,X0.width,X0.height,l0,v0,X0.data)}else Z.texImage2D(J.TEXTURE_2D,0,M0,X0.width,X0.height,0,l0,v0,X0.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){if(D0&&C0)Z.texStorage3D(J.TEXTURE_2D_ARRAY,p0,M0,$0[0].width,$0[0].height,X0.depth);for(let G0=0,f=$0.length;G0<f;G0++)if(j=$0[G0],M.format!==1023)if(l0!==null)if(D0)Z.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,G0,0,0,0,j.width,j.height,X0.depth,l0,j.data,0,0);else Z.compressedTexImage3D(J.TEXTURE_2D_ARRAY,G0,M0,j.width,j.height,X0.depth,0,j.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(D0)Z.texSubImage3D(J.TEXTURE_2D_ARRAY,G0,0,0,0,j.width,j.height,X0.depth,l0,v0,j.data);else Z.texImage3D(J.TEXTURE_2D_ARRAY,G0,M0,j.width,j.height,X0.depth,0,l0,v0,j.data)}else{if(D0&&C0)Z.texStorage2D(J.TEXTURE_2D,p0,M0,$0[0].width,$0[0].height);for(let G0=0,f=$0.length;G0<f;G0++)if(j=$0[G0],M.format!==1023)if(l0!==null)if(D0)Z.compressedTexSubImage2D(J.TEXTURE_2D,G0,0,0,j.width,j.height,l0,j.data);else Z.compressedTexImage2D(J.TEXTURE_2D,G0,M0,j.width,j.height,0,j.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(D0)Z.texSubImage2D(J.TEXTURE_2D,G0,0,0,j.width,j.height,l0,v0,j.data);else Z.texImage2D(J.TEXTURE_2D,G0,M0,j.width,j.height,0,l0,v0,j.data)}else if(M.isDataArrayTexture)if(D0){if(C0)Z.texStorage3D(J.TEXTURE_2D_ARRAY,p0,M0,X0.width,X0.height,X0.depth);Z.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,X0.width,X0.height,X0.depth,l0,v0,X0.data)}else Z.texImage3D(J.TEXTURE_2D_ARRAY,0,M0,X0.width,X0.height,X0.depth,0,l0,v0,X0.data);else if(M.isData3DTexture)if(D0){if(C0)Z.texStorage3D(J.TEXTURE_3D,p0,M0,X0.width,X0.height,X0.depth);Z.texSubImage3D(J.TEXTURE_3D,0,0,0,0,X0.width,X0.height,X0.depth,l0,v0,X0.data)}else Z.texImage3D(J.TEXTURE_3D,0,M0,X0.width,X0.height,X0.depth,0,l0,v0,X0.data);else if(M.isFramebufferTexture){if(C0)if(D0)Z.texStorage2D(J.TEXTURE_2D,p0,M0,X0.width,X0.height);else{let{width:G0,height:f}=X0;for(let I0=0;I0<p0;I0++)Z.texImage2D(J.TEXTURE_2D,I0,M0,G0,f,0,l0,v0,null),G0>>=1,f>>=1}}else if($0.length>0&&O8){if(D0&&C0)Z.texStorage2D(J.TEXTURE_2D,p0,M0,$0[0].width,$0[0].height);for(let G0=0,f=$0.length;G0<f;G0++)if(j=$0[G0],D0)Z.texSubImage2D(J.TEXTURE_2D,G0,0,0,l0,v0,j);else Z.texImage2D(J.TEXTURE_2D,G0,M0,l0,v0,j);M.generateMipmaps=!1}else if(D0){if(C0)Z.texStorage2D(J.TEXTURE_2D,p0,M0,X0.width,X0.height);Z.texSubImage2D(J.TEXTURE_2D,0,0,0,l0,v0,X0)}else Z.texImage2D(J.TEXTURE_2D,0,M0,l0,v0,X0);if(R(M,O8))B(q0);if(y0.__version=U0.version,M.onUpdate)M.onUpdate(M)}S.__version=M.version}function R0(S,M,l){if(M.image.length!==6)return;let q0=H0(S,M),Z0=M.source;Z.bindTexture(J.TEXTURE_CUBE_MAP,S.__webglTexture,J.TEXTURE0+l);let U0=Q.get(Z0);if(Z0.version!==U0.__version||q0===!0){Z.activeTexture(J.TEXTURE0+l);let y0=W8.getPrimaries(W8.workingColorSpace),F0=M.colorSpace===""?null:W8.getPrimaries(M.colorSpace),A0=M.colorSpace===""||y0===F0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,A0);let T0=M.isCompressedTexture||M.image[0].isCompressedTexture,h0=M.image[0]&&M.image[0].isDataTexture,X0=[];for(let G0=0;G0<6;G0++){if(!T0&&!h0)X0[G0]=E(M.image[G0],!1,!0,K.maxCubemapSize);else X0[G0]=h0?M.image[G0].image:M.image[G0];X0[G0]=P0(M,X0[G0])}let O8=X0[0],l0=O(O8)||X,v0=W.convert(M.format,M.colorSpace),M0=W.convert(M.type),j=z(M.internalFormat,v0,M0,M.colorSpace),$0=X&&M.isVideoTexture!==!0,D0=U0.__version===void 0||q0===!0,C0=C(M,O8,l0);e(J.TEXTURE_CUBE_MAP,M,l0);let p0;if(T0){if($0&&D0)Z.texStorage2D(J.TEXTURE_CUBE_MAP,C0,j,O8.width,O8.height);for(let G0=0;G0<6;G0++){p0=X0[G0].mipmaps;for(let f=0;f<p0.length;f++){let I0=p0[f];if(M.format!==1023)if(v0!==null)if($0)Z.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f,0,0,I0.width,I0.height,v0,I0.data);else Z.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f,j,I0.width,I0.height,0,I0.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if($0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f,0,0,I0.width,I0.height,v0,M0,I0.data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f,j,I0.width,I0.height,0,v0,M0,I0.data)}}}else{if(p0=M.mipmaps,$0&&D0){if(p0.length>0)C0++;Z.texStorage2D(J.TEXTURE_CUBE_MAP,C0,j,X0[0].width,X0[0].height)}for(let G0=0;G0<6;G0++)if(h0){if($0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,0,0,X0[G0].width,X0[G0].height,v0,M0,X0[G0].data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,j,X0[G0].width,X0[G0].height,0,v0,M0,X0[G0].data);for(let f=0;f<p0.length;f++){let L0=p0[f].image[G0].image;if($0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f+1,0,0,L0.width,L0.height,v0,M0,L0.data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f+1,j,L0.width,L0.height,0,v0,M0,L0.data)}}else{if($0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,0,0,v0,M0,X0[G0]);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,j,v0,M0,X0[G0]);for(let f=0;f<p0.length;f++){let I0=p0[f];if($0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f+1,0,0,v0,M0,I0.image[G0]);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,f+1,j,v0,M0,I0.image[G0])}}}if(R(M,l0))B(J.TEXTURE_CUBE_MAP);if(U0.__version=Z0.version,M.onUpdate)M.onUpdate(M)}S.__version=M.version}function x0(S,M,l,q0,Z0,U0){let y0=W.convert(l.format,l.colorSpace),F0=W.convert(l.type),A0=z(l.internalFormat,y0,F0,l.colorSpace);if(!Q.get(M).__hasExternalTextures){let h0=Math.max(1,M.width>>U0),X0=Math.max(1,M.height>>U0);if(Z0===J.TEXTURE_3D||Z0===J.TEXTURE_2D_ARRAY)Z.texImage3D(Z0,U0,A0,h0,X0,M.depth,0,y0,F0,null);else Z.texImage2D(Z0,U0,A0,h0,X0,0,y0,F0,null)}if(Z.bindFramebuffer(J.FRAMEBUFFER,S),z0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,q0,Z0,Q.get(l).__webglTexture,0,Q0(M));else if(Z0===J.TEXTURE_2D||Z0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&Z0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,q0,Z0,Q.get(l).__webglTexture,U0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function u0(S,M,l){if(J.bindRenderbuffer(J.RENDERBUFFER,S),M.depthBuffer&&!M.stencilBuffer){let q0=X===!0?J.DEPTH_COMPONENT24:J.DEPTH_COMPONENT16;if(l||z0(M)){let Z0=M.depthTexture;if(Z0&&Z0.isDepthTexture){if(Z0.type===1015)q0=J.DEPTH_COMPONENT32F;else if(Z0.type===1014)q0=J.DEPTH_COMPONENT24}let U0=Q0(M);if(z0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,U0,q0,M.width,M.height);else J.renderbufferStorageMultisample(J.RENDERBUFFER,U0,q0,M.width,M.height)}else J.renderbufferStorage(J.RENDERBUFFER,q0,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.RENDERBUFFER,S)}else if(M.depthBuffer&&M.stencilBuffer){let q0=Q0(M);if(l&&z0(M)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,q0,J.DEPTH24_STENCIL8,M.width,M.height);else if(z0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,q0,J.DEPTH24_STENCIL8,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,J.DEPTH_STENCIL,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.RENDERBUFFER,S)}else{let q0=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z0=0;Z0<q0.length;Z0++){let U0=q0[Z0],y0=W.convert(U0.format,U0.colorSpace),F0=W.convert(U0.type),A0=z(U0.internalFormat,y0,F0,U0.colorSpace),T0=Q0(M);if(l&&z0(M)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,T0,A0,M.width,M.height);else if(z0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,T0,A0,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,A0,M.width,M.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function _0(S,M){if(M&&M.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(Z.bindFramebuffer(J.FRAMEBUFFER,S),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");if(!Q.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0;m(M.depthTexture,0);let q0=Q.get(M.depthTexture).__webglTexture,Z0=Q0(M);if(M.depthTexture.format===1026)if(z0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,q0,0,Z0);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,q0,0);else if(M.depthTexture.format===1027)if(z0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,q0,0,Z0);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,q0,0);else throw Error("Unknown depthTexture format")}function f0(S){let M=Q.get(S),l=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!M.__autoAllocateDepthBuffer){if(l)throw Error("target.depthTexture not supported in Cube render targets");_0(M.__webglFramebuffer,S)}else if(l){M.__webglDepthbuffer=[];for(let q0=0;q0<6;q0++)Z.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer[q0]),M.__webglDepthbuffer[q0]=J.createRenderbuffer(),u0(M.__webglDepthbuffer[q0],S,!1)}else Z.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=J.createRenderbuffer(),u0(M.__webglDepthbuffer,S,!1);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function x(S,M,l){let q0=Q.get(S);if(M!==void 0)x0(q0.__webglFramebuffer,S,S.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(l!==void 0)f0(S)}function O0(S){let M=S.texture,l=Q.get(S),q0=Q.get(M);if(S.addEventListener("dispose",_),S.isWebGLMultipleRenderTargets!==!0){if(q0.__webglTexture===void 0)q0.__webglTexture=J.createTexture();q0.__version=M.version,Y.memory.textures++}let Z0=S.isWebGLCubeRenderTarget===!0,U0=S.isWebGLMultipleRenderTargets===!0,y0=O(S)||X;if(Z0){l.__webglFramebuffer=[];for(let F0=0;F0<6;F0++)if(X&&M.mipmaps&&M.mipmaps.length>0){l.__webglFramebuffer[F0]=[];for(let A0=0;A0<M.mipmaps.length;A0++)l.__webglFramebuffer[F0][A0]=J.createFramebuffer()}else l.__webglFramebuffer[F0]=J.createFramebuffer()}else{if(X&&M.mipmaps&&M.mipmaps.length>0){l.__webglFramebuffer=[];for(let F0=0;F0<M.mipmaps.length;F0++)l.__webglFramebuffer[F0]=J.createFramebuffer()}else l.__webglFramebuffer=J.createFramebuffer();if(U0)if(K.drawBuffers){let F0=S.texture;for(let A0=0,T0=F0.length;A0<T0;A0++){let h0=Q.get(F0[A0]);if(h0.__webglTexture===void 0)h0.__webglTexture=J.createTexture(),Y.memory.textures++}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(X&&S.samples>0&&z0(S)===!1){let F0=U0?M:[M];l.__webglMultisampledFramebuffer=J.createFramebuffer(),l.__webglColorRenderbuffer=[],Z.bindFramebuffer(J.FRAMEBUFFER,l.__webglMultisampledFramebuffer);for(let A0=0;A0<F0.length;A0++){let T0=F0[A0];l.__webglColorRenderbuffer[A0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,l.__webglColorRenderbuffer[A0]);let h0=W.convert(T0.format,T0.colorSpace),X0=W.convert(T0.type),O8=z(T0.internalFormat,h0,X0,T0.colorSpace,S.isXRRenderTarget===!0),l0=Q0(S);J.renderbufferStorageMultisample(J.RENDERBUFFER,l0,O8,S.width,S.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+A0,J.RENDERBUFFER,l.__webglColorRenderbuffer[A0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),S.depthBuffer)l.__webglDepthRenderbuffer=J.createRenderbuffer(),u0(l.__webglDepthRenderbuffer,S,!0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}}if(Z0){Z.bindTexture(J.TEXTURE_CUBE_MAP,q0.__webglTexture),e(J.TEXTURE_CUBE_MAP,M,y0);for(let F0=0;F0<6;F0++)if(X&&M.mipmaps&&M.mipmaps.length>0)for(let A0=0;A0<M.mipmaps.length;A0++)x0(l.__webglFramebuffer[F0][A0],S,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,A0);else x0(l.__webglFramebuffer[F0],S,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,0);if(R(M,y0))B(J.TEXTURE_CUBE_MAP);Z.unbindTexture()}else if(U0){let F0=S.texture;for(let A0=0,T0=F0.length;A0<T0;A0++){let h0=F0[A0],X0=Q.get(h0);if(Z.bindTexture(J.TEXTURE_2D,X0.__webglTexture),e(J.TEXTURE_2D,h0,y0),x0(l.__webglFramebuffer,S,h0,J.COLOR_ATTACHMENT0+A0,J.TEXTURE_2D,0),R(h0,y0))B(J.TEXTURE_2D)}Z.unbindTexture()}else{let F0=J.TEXTURE_2D;if(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)if(X)F0=S.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;else console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.");if(Z.bindTexture(F0,q0.__webglTexture),e(F0,M,y0),X&&M.mipmaps&&M.mipmaps.length>0)for(let A0=0;A0<M.mipmaps.length;A0++)x0(l.__webglFramebuffer[A0],S,M,J.COLOR_ATTACHMENT0,F0,A0);else x0(l.__webglFramebuffer,S,M,J.COLOR_ATTACHMENT0,F0,0);if(R(M,y0))B(F0);Z.unbindTexture()}if(S.depthBuffer)f0(S)}function W0(S){let M=O(S)||X,l=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let q0=0,Z0=l.length;q0<Z0;q0++){let U0=l[q0];if(R(U0,M)){let y0=S.isWebGLCubeRenderTarget?J.TEXTURE_CUBE_MAP:J.TEXTURE_2D,F0=Q.get(U0).__webglTexture;Z.bindTexture(y0,F0),B(y0),Z.unbindTexture()}}}function K0(S){if(X&&S.samples>0&&z0(S)===!1){let M=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],l=S.width,q0=S.height,Z0=J.COLOR_BUFFER_BIT,U0=[],y0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,F0=Q.get(S),A0=S.isWebGLMultipleRenderTargets===!0;if(A0)for(let T0=0;T0<M.length;T0++)Z.bindFramebuffer(J.FRAMEBUFFER,F0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.RENDERBUFFER,null),Z.bindFramebuffer(J.FRAMEBUFFER,F0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.TEXTURE_2D,null,0);Z.bindFramebuffer(J.READ_FRAMEBUFFER,F0.__webglMultisampledFramebuffer),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,F0.__webglFramebuffer);for(let T0=0;T0<M.length;T0++){if(U0.push(J.COLOR_ATTACHMENT0+T0),S.depthBuffer)U0.push(y0);let h0=F0.__ignoreDepthValues!==void 0?F0.__ignoreDepthValues:!1;if(h0===!1){if(S.depthBuffer)Z0|=J.DEPTH_BUFFER_BIT;if(S.stencilBuffer)Z0|=J.STENCIL_BUFFER_BIT}if(A0)J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,F0.__webglColorRenderbuffer[T0]);if(h0===!0)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,[y0]),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[y0]);if(A0){let X0=Q.get(M[T0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,X0,0)}if(J.blitFramebuffer(0,0,l,q0,0,0,l,q0,Z0,J.NEAREST),q)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,U0)}if(Z.bindFramebuffer(J.READ_FRAMEBUFFER,null),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),A0)for(let T0=0;T0<M.length;T0++){Z.bindFramebuffer(J.FRAMEBUFFER,F0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.RENDERBUFFER,F0.__webglColorRenderbuffer[T0]);let h0=Q.get(M[T0]).__webglTexture;Z.bindFramebuffer(J.FRAMEBUFFER,F0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.TEXTURE_2D,h0,0)}Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,F0.__webglMultisampledFramebuffer)}}function Q0(S){return Math.min(K.maxSamples,S.samples)}function z0(S){let M=Q.get(S);return X&&S.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function E0(S){let M=Y.render.frame;if(U.get(S)!==M)U.set(S,M),S.update()}function P0(S,M){let{colorSpace:l,format:q0,type:Z0}=S;if(S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===1035)return M;if(l!=="srgb-linear"&&l!=="")if(W8.getTransfer(l)==="srgb"){if(X===!1)if($.has("EXT_sRGB")===!0&&q0===1023)S.format=1035,S.minFilter=1006,S.generateMipmaps=!1;else M=RQ.sRGBToLinear(M);else if(q0!==1023||Z0!==1009)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",l);return M}this.allocateTextureUnit=y,this.resetTextureUnits=r,this.setTexture2D=m,this.setTexture2DArray=i,this.setTexture3D=d,this.setTextureCube=g,this.rebindTextures=x,this.setupRenderTarget=O0,this.updateRenderTargetMipmap=W0,this.updateMultisampleRenderTarget=K0,this.setupDepthRenderbuffer=f0,this.setupFrameBufferTexture=x0,this.useMultisampledRTT=z0}function $4(J,$,Z){let Q=Z.isWebGL2;function K(W,Y=""){let X,H=W8.getTransfer(Y);if(W===1009)return J.UNSIGNED_BYTE;if(W===1017)return J.UNSIGNED_SHORT_4_4_4_4;if(W===1018)return J.UNSIGNED_SHORT_5_5_5_1;if(W===1010)return J.BYTE;if(W===1011)return J.SHORT;if(W===1012)return J.UNSIGNED_SHORT;if(W===1013)return J.INT;if(W===1014)return J.UNSIGNED_INT;if(W===1015)return J.FLOAT;if(W===1016){if(Q)return J.HALF_FLOAT;if(X=$.get("OES_texture_half_float"),X!==null)return X.HALF_FLOAT_OES;else return null}if(W===1021)return J.ALPHA;if(W===1023)return J.RGBA;if(W===1024)return J.LUMINANCE;if(W===1025)return J.LUMINANCE_ALPHA;if(W===1026)return J.DEPTH_COMPONENT;if(W===1027)return J.DEPTH_STENCIL;if(W===1035)if(X=$.get("EXT_sRGB"),X!==null)return X.SRGB_ALPHA_EXT;else return null;if(W===1028)return J.RED;if(W===1029)return J.RED_INTEGER;if(W===1030)return J.RG;if(W===1031)return J.RG_INTEGER;if(W===1033)return J.RGBA_INTEGER;if(W===33776||W===33777||W===33778||W===33779)if(H==="srgb")if(X=$.get("WEBGL_compressed_texture_s3tc_srgb"),X!==null){if(W===33776)return X.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===33777)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===33778)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===33779)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(X=$.get("WEBGL_compressed_texture_s3tc"),X!==null){if(W===33776)return X.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===33777)return X.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===33778)return X.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===33779)return X.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===35840||W===35841||W===35842||W===35843)if(X=$.get("WEBGL_compressed_texture_pvrtc"),X!==null){if(W===35840)return X.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===35841)return X.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===35842)return X.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===35843)return X.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===36196)if(X=$.get("WEBGL_compressed_texture_etc1"),X!==null)return X.COMPRESSED_RGB_ETC1_WEBGL;else return null;if(W===37492||W===37496)if(X=$.get("WEBGL_compressed_texture_etc"),X!==null){if(W===37492)return H==="srgb"?X.COMPRESSED_SRGB8_ETC2:X.COMPRESSED_RGB8_ETC2;if(W===37496)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:X.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(W===37808||W===37809||W===37810||W===37811||W===37812||W===37813||W===37814||W===37815||W===37816||W===37817||W===37818||W===37819||W===37820||W===37821)if(X=$.get("WEBGL_compressed_texture_astc"),X!==null){if(W===37808)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:X.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===37809)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:X.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===37810)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:X.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===37811)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:X.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===37812)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:X.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===37813)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:X.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===37814)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:X.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===37815)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:X.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===37816)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:X.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===37817)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:X.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===37818)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:X.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===37819)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:X.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===37820)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:X.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===37821)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:X.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===36492||W===36494||W===36495)if(X=$.get("EXT_texture_compression_bptc"),X!==null){if(W===36492)return H==="srgb"?X.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:X.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===36494)return X.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===36495)return X.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===36283||W===36284||W===36285||W===36286)if(X=$.get("EXT_texture_compression_rgtc"),X!==null){if(W===36492)return X.COMPRESSED_RED_RGTC1_EXT;if(W===36284)return X.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===36285)return X.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===36286)return X.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===1020){if(Q)return J.UNSIGNED_INT_24_8;if(X=$.get("WEBGL_depth_texture"),X!==null)return X.UNSIGNED_INT_24_8_WEBGL;else return null}return J[W]!==void 0?J[W]:null}return{convert:K}}class GK extends l8{constructor(J=[]){super();this.isArrayCamera=!0,this.cameras=J}}class N0 extends E8{constructor(){super();this.isGroup=!0,this.type="Group"}}var Z4={type:"move"};class s${constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new N0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new N0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new N0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Z of J.hand.values())this._getHandJoint($,Z)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Z){let Q=null,K=null,W=null,Y=this._targetRay,X=this._grip,H=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(H&&J.hand){W=!0;for(let N of J.hand.values()){let E=$.getJointPose(N,Z),O=this._getHandJoint(H,N);if(E!==null)O.matrix.fromArray(E.transform.matrix),O.matrix.decompose(O.position,O.rotation,O.scale),O.matrixWorldNeedsUpdate=!0,O.jointRadius=E.radius;O.visible=E!==null}let q=H.joints["index-finger-tip"],U=H.joints["thumb-tip"],F=q.position.distanceTo(U.position),V=0.02,G=0.005;if(H.inputState.pinching&&F>V+G)H.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!H.inputState.pinching&&F<=V-G)H.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(X!==null&&J.gripSpace){if(K=$.getPose(J.gripSpace,Z),K!==null){if(X.matrix.fromArray(K.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,K.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy(K.linearVelocity);else X.hasLinearVelocity=!1;if(K.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy(K.angularVelocity);else X.hasAngularVelocity=!1}}if(Y!==null){if(Q=$.getPose(J.targetRaySpace,Z),Q===null&&K!==null)Q=K;if(Q!==null){if(Y.matrix.fromArray(Q.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Q.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Q.linearVelocity);else Y.hasLinearVelocity=!1;if(Q.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Q.angularVelocity);else Y.hasAngularVelocity=!1;this.dispatchEvent(Z4)}}}if(Y!==null)Y.visible=Q!==null;if(X!==null)X.visible=K!==null;if(H!==null)H.visible=W!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Z=new N0;Z.matrixAutoUpdate=!1,Z.visible=!1,J.joints[$.jointName]=Z,J.add(Z)}return J.joints[$.jointName]}}class OK extends u9{constructor(J,$){super();let Z=this,Q=null,K=1,W=null,Y="local-floor",X=1,H=null,q=null,U=null,F=null,V=null,G=null,N=$.getContextAttributes(),E=null,O=null,D=[],R=[],B=new Y0,z=null,C=new l8;C.layers.enable(1),C.viewport=new D8;let L=new l8;L.layers.enable(2),L.viewport=new D8;let A=[C,L],_=new GK;_.layers.enable(1),_.layers.enable(2);let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(v){let e=D[v];if(e===void 0)e=new s$,D[v]=e;return e.getTargetRaySpace()},this.getControllerGrip=function(v){let e=D[v];if(e===void 0)e=new s$,D[v]=e;return e.getGripSpace()},this.getHand=function(v){let e=D[v];if(e===void 0)e=new s$,D[v]=e;return e.getHandSpace()};function b(v){let e=R.indexOf(v.inputSource);if(e===-1)return;let H0=D[e];if(H0!==void 0)H0.update(v.inputSource,v.frame,H||W),H0.dispatchEvent({type:v.type,data:v.inputSource})}function n(){Q.removeEventListener("select",b),Q.removeEventListener("selectstart",b),Q.removeEventListener("selectend",b),Q.removeEventListener("squeeze",b),Q.removeEventListener("squeezestart",b),Q.removeEventListener("squeezeend",b),Q.removeEventListener("end",n),Q.removeEventListener("inputsourceschange",r);for(let v=0;v<D.length;v++){let e=R[v];if(e===null)continue;R[v]=null,D[v].disconnect(e)}I=null,k=null,J.setRenderTarget(E),V=null,F=null,U=null,Q=null,O=null,t.stop(),Z.isPresenting=!1,J.setPixelRatio(z),J.setSize(B.width,B.height,!1),Z.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(v){if(K=v,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(v){if(Y=v,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return H||W},this.setReferenceSpace=function(v){H=v},this.getBaseLayer=function(){return F!==null?F:V},this.getBinding=function(){return U},this.getFrame=function(){return G},this.getSession=function(){return Q},this.setSession=async function(v){if(Q=v,Q!==null){if(E=J.getRenderTarget(),Q.addEventListener("select",b),Q.addEventListener("selectstart",b),Q.addEventListener("selectend",b),Q.addEventListener("squeeze",b),Q.addEventListener("squeezestart",b),Q.addEventListener("squeezeend",b),Q.addEventListener("end",n),Q.addEventListener("inputsourceschange",r),N.xrCompatible!==!0)await $.makeXRCompatible();if(z=J.getPixelRatio(),J.getSize(B),Q.renderState.layers===void 0||J.capabilities.isWebGL2===!1){let e={antialias:Q.renderState.layers===void 0?N.antialias:!0,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:K};V=new XRWebGLLayer(Q,$,e),Q.updateRenderState({baseLayer:V}),J.setPixelRatio(1),J.setSize(V.framebufferWidth,V.framebufferHeight,!1),O=new $J(V.framebufferWidth,V.framebufferHeight,{format:1023,type:1009,colorSpace:J.outputColorSpace,stencilBuffer:N.stencil})}else{let e=null,H0=null,V0=null;if(N.depth)V0=N.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,e=N.stencil?1027:1026,H0=N.stencil?1020:1014;let R0={colorFormat:$.RGBA8,depthFormat:V0,scaleFactor:K};U=new XRWebGLBinding(Q,$),F=U.createProjectionLayer(R0),Q.updateRenderState({layers:[F]}),J.setPixelRatio(1),J.setSize(F.textureWidth,F.textureHeight,!1),O=new $J(F.textureWidth,F.textureHeight,{format:1023,type:1009,depthTexture:new PQ(F.textureWidth,F.textureHeight,H0,void 0,void 0,void 0,void 0,void 0,void 0,e),stencilBuffer:N.stencil,colorSpace:J.outputColorSpace,samples:N.antialias?4:0});let x0=J.properties.get(O);x0.__ignoreDepthValues=F.ignoreDepthValues}O.isXRRenderTarget=!0,this.setFoveation(X),H=null,W=await Q.requestReferenceSpace(Y),t.setContext(Q),t.start(),Z.isPresenting=!0,Z.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Q!==null)return Q.environmentBlendMode};function r(v){for(let e=0;e<v.removed.length;e++){let H0=v.removed[e],V0=R.indexOf(H0);if(V0>=0)R[V0]=null,D[V0].disconnect(H0)}for(let e=0;e<v.added.length;e++){let H0=v.added[e],V0=R.indexOf(H0);if(V0===-1){for(let x0=0;x0<D.length;x0++)if(x0>=R.length){R.push(H0),V0=x0;break}else if(R[x0]===null){R[x0]=H0,V0=x0;break}if(V0===-1)break}let R0=D[V0];if(R0)R0.connect(H0)}}let y=new T,h=new T;function m(v,e,H0){y.setFromMatrixPosition(e.matrixWorld),h.setFromMatrixPosition(H0.matrixWorld);let V0=y.distanceTo(h),R0=e.projectionMatrix.elements,x0=H0.projectionMatrix.elements,u0=R0[14]/(R0[10]-1),_0=R0[14]/(R0[10]+1),f0=(R0[9]+1)/R0[5],x=(R0[9]-1)/R0[5],O0=(R0[8]-1)/R0[0],W0=(x0[8]+1)/x0[0],K0=u0*O0,Q0=u0*W0,z0=V0/(-O0+W0),E0=z0*-O0;e.matrixWorld.decompose(v.position,v.quaternion,v.scale),v.translateX(E0),v.translateZ(z0),v.matrixWorld.compose(v.position,v.quaternion,v.scale),v.matrixWorldInverse.copy(v.matrixWorld).invert();let P0=u0+z0,S=_0+z0,M=K0-E0,l=Q0+(V0-E0),q0=f0*_0/S*P0,Z0=x*_0/S*P0;v.projectionMatrix.makePerspective(M,l,q0,Z0,P0,S),v.projectionMatrixInverse.copy(v.projectionMatrix).invert()}function i(v,e){if(e===null)v.matrixWorld.copy(v.matrix);else v.matrixWorld.multiplyMatrices(e.matrixWorld,v.matrix);v.matrixWorldInverse.copy(v.matrixWorld).invert()}this.updateCamera=function(v){if(Q===null)return;if(_.near=L.near=C.near=v.near,_.far=L.far=C.far=v.far,I!==_.near||k!==_.far)Q.updateRenderState({depthNear:_.near,depthFar:_.far}),I=_.near,k=_.far;let e=v.parent,H0=_.cameras;i(_,e);for(let V0=0;V0<H0.length;V0++)i(H0[V0],e);if(H0.length===2)m(_,C,L);else _.projectionMatrix.copy(C.projectionMatrix);d(v,_,e)};function d(v,e,H0){if(H0===null)v.matrix.copy(e.matrixWorld);else v.matrix.copy(H0.matrixWorld),v.matrix.invert(),v.matrix.multiply(e.matrixWorld);if(v.matrix.decompose(v.position,v.quaternion,v.scale),v.updateMatrixWorld(!0),v.projectionMatrix.copy(e.projectionMatrix),v.projectionMatrixInverse.copy(e.projectionMatrixInverse),v.isPerspectiveCamera)v.fov=K7*2*Math.atan(1/v.projectionMatrix.elements[5]),v.zoom=1}this.getCamera=function(){return _},this.getFoveation=function(){if(F===null&&V===null)return;return X},this.setFoveation=function(v){if(X=v,F!==null)F.fixedFoveation=v;if(V!==null&&V.fixedFoveation!==void 0)V.fixedFoveation=v};let g=null;function p(v,e){if(q=e.getViewerPose(H||W),G=e,q!==null){let H0=q.views;if(V!==null)J.setRenderTargetFramebuffer(O,V.framebuffer),J.setRenderTarget(O);let V0=!1;if(H0.length!==_.cameras.length)_.cameras.length=0,V0=!0;for(let R0=0;R0<H0.length;R0++){let x0=H0[R0],u0=null;if(V!==null)u0=V.getViewport(x0);else{let f0=U.getViewSubImage(F,x0);if(u0=f0.viewport,R0===0)J.setRenderTargetTextures(O,f0.colorTexture,F.ignoreDepthValues?void 0:f0.depthStencilTexture),J.setRenderTarget(O)}let _0=A[R0];if(_0===void 0)_0=new l8,_0.layers.enable(R0),_0.viewport=new D8,A[R0]=_0;if(_0.matrix.fromArray(x0.transform.matrix),_0.matrix.decompose(_0.position,_0.quaternion,_0.scale),_0.projectionMatrix.fromArray(x0.projectionMatrix),_0.projectionMatrixInverse.copy(_0.projectionMatrix).invert(),_0.viewport.set(u0.x,u0.y,u0.width,u0.height),R0===0)_.matrix.copy(_0.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale);if(V0===!0)_.cameras.push(_0)}}for(let H0=0;H0<D.length;H0++){let V0=R[H0],R0=D[H0];if(V0!==null&&R0!==void 0)R0.update(V0,e,H||W)}if(g)g(v,e);if(e.detectedPlanes)Z.dispatchEvent({type:"planesdetected",data:e});G=null}let t=new JK;t.setAnimationLoop(p),this.setAnimationLoop=function(v){g=v},this.dispose=function(){}}}function Q4(J,$){function Z(O,D){if(O.matrixAutoUpdate===!0)O.updateMatrix();D.value.copy(O.matrix)}function Q(O,D){if(D.color.getRGB(O.fogColor.value,a6(J)),D.isFog)O.fogNear.value=D.near,O.fogFar.value=D.far;else if(D.isFogExp2)O.fogDensity.value=D.density}function K(O,D,R,B,z){if(D.isMeshBasicMaterial)W(O,D);else if(D.isMeshLambertMaterial)W(O,D);else if(D.isMeshToonMaterial)W(O,D),F(O,D);else if(D.isMeshPhongMaterial)W(O,D),U(O,D);else if(D.isMeshStandardMaterial){if(W(O,D),V(O,D),D.isMeshPhysicalMaterial)G(O,D,z)}else if(D.isMeshMatcapMaterial)W(O,D),N(O,D);else if(D.isMeshDepthMaterial)W(O,D);else if(D.isMeshDistanceMaterial)W(O,D),E(O,D);else if(D.isMeshNormalMaterial)W(O,D);else if(D.isLineBasicMaterial){if(Y(O,D),D.isLineDashedMaterial)X(O,D)}else if(D.isPointsMaterial)H(O,D,R,B);else if(D.isSpriteMaterial)q(O,D);else if(D.isShadowMaterial)O.color.value.copy(D.color),O.opacity.value=D.opacity;else if(D.isShaderMaterial)D.uniformsNeedUpdate=!1}function W(O,D){if(O.opacity.value=D.opacity,D.color)O.diffuse.value.copy(D.color);if(D.emissive)O.emissive.value.copy(D.emissive).multiplyScalar(D.emissiveIntensity);if(D.map)O.map.value=D.map,Z(D.map,O.mapTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Z(D.alphaMap,O.alphaMapTransform);if(D.bumpMap){if(O.bumpMap.value=D.bumpMap,Z(D.bumpMap,O.bumpMapTransform),O.bumpScale.value=D.bumpScale,D.side===1)O.bumpScale.value*=-1}if(D.normalMap){if(O.normalMap.value=D.normalMap,Z(D.normalMap,O.normalMapTransform),O.normalScale.value.copy(D.normalScale),D.side===1)O.normalScale.value.negate()}if(D.displacementMap)O.displacementMap.value=D.displacementMap,Z(D.displacementMap,O.displacementMapTransform),O.displacementScale.value=D.displacementScale,O.displacementBias.value=D.displacementBias;if(D.emissiveMap)O.emissiveMap.value=D.emissiveMap,Z(D.emissiveMap,O.emissiveMapTransform);if(D.specularMap)O.specularMap.value=D.specularMap,Z(D.specularMap,O.specularMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest;let R=$.get(D).envMap;if(R)O.envMap.value=R,O.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,O.reflectivity.value=D.reflectivity,O.ior.value=D.ior,O.refractionRatio.value=D.refractionRatio;if(D.lightMap){O.lightMap.value=D.lightMap;let B=J._useLegacyLights===!0?Math.PI:1;O.lightMapIntensity.value=D.lightMapIntensity*B,Z(D.lightMap,O.lightMapTransform)}if(D.aoMap)O.aoMap.value=D.aoMap,O.aoMapIntensity.value=D.aoMapIntensity,Z(D.aoMap,O.aoMapTransform)}function Y(O,D){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,D.map)O.map.value=D.map,Z(D.map,O.mapTransform)}function X(O,D){O.dashSize.value=D.dashSize,O.totalSize.value=D.dashSize+D.gapSize,O.scale.value=D.scale}function H(O,D,R,B){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,O.size.value=D.size*R,O.scale.value=B*0.5,D.map)O.map.value=D.map,Z(D.map,O.uvTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Z(D.alphaMap,O.alphaMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest}function q(O,D){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,O.rotation.value=D.rotation,D.map)O.map.value=D.map,Z(D.map,O.mapTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Z(D.alphaMap,O.alphaMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest}function U(O,D){O.specular.value.copy(D.specular),O.shininess.value=Math.max(D.shininess,0.0001)}function F(O,D){if(D.gradientMap)O.gradientMap.value=D.gradientMap}function V(O,D){if(O.metalness.value=D.metalness,D.metalnessMap)O.metalnessMap.value=D.metalnessMap,Z(D.metalnessMap,O.metalnessMapTransform);if(O.roughness.value=D.roughness,D.roughnessMap)O.roughnessMap.value=D.roughnessMap,Z(D.roughnessMap,O.roughnessMapTransform);if($.get(D).envMap)O.envMapIntensity.value=D.envMapIntensity}function G(O,D,R){if(O.ior.value=D.ior,D.sheen>0){if(O.sheenColor.value.copy(D.sheenColor).multiplyScalar(D.sheen),O.sheenRoughness.value=D.sheenRoughness,D.sheenColorMap)O.sheenColorMap.value=D.sheenColorMap,Z(D.sheenColorMap,O.sheenColorMapTransform);if(D.sheenRoughnessMap)O.sheenRoughnessMap.value=D.sheenRoughnessMap,Z(D.sheenRoughnessMap,O.sheenRoughnessMapTransform)}if(D.clearcoat>0){if(O.clearcoat.value=D.clearcoat,O.clearcoatRoughness.value=D.clearcoatRoughness,D.clearcoatMap)O.clearcoatMap.value=D.clearcoatMap,Z(D.clearcoatMap,O.clearcoatMapTransform);if(D.clearcoatRoughnessMap)O.clearcoatRoughnessMap.value=D.clearcoatRoughnessMap,Z(D.clearcoatRoughnessMap,O.clearcoatRoughnessMapTransform);if(D.clearcoatNormalMap){if(O.clearcoatNormalMap.value=D.clearcoatNormalMap,Z(D.clearcoatNormalMap,O.clearcoatNormalMapTransform),O.clearcoatNormalScale.value.copy(D.clearcoatNormalScale),D.side===1)O.clearcoatNormalScale.value.negate()}}if(D.iridescence>0){if(O.iridescence.value=D.iridescence,O.iridescenceIOR.value=D.iridescenceIOR,O.iridescenceThicknessMinimum.value=D.iridescenceThicknessRange[0],O.iridescenceThicknessMaximum.value=D.iridescenceThicknessRange[1],D.iridescenceMap)O.iridescenceMap.value=D.iridescenceMap,Z(D.iridescenceMap,O.iridescenceMapTransform);if(D.iridescenceThicknessMap)O.iridescenceThicknessMap.value=D.iridescenceThicknessMap,Z(D.iridescenceThicknessMap,O.iridescenceThicknessMapTransform)}if(D.transmission>0){if(O.transmission.value=D.transmission,O.transmissionSamplerMap.value=R.texture,O.transmissionSamplerSize.value.set(R.width,R.height),D.transmissionMap)O.transmissionMap.value=D.transmissionMap,Z(D.transmissionMap,O.transmissionMapTransform);if(O.thickness.value=D.thickness,D.thicknessMap)O.thicknessMap.value=D.thicknessMap,Z(D.thicknessMap,O.thicknessMapTransform);O.attenuationDistance.value=D.attenuationDistance,O.attenuationColor.value.copy(D.attenuationColor)}if(D.anisotropy>0){if(O.anisotropyVector.value.set(D.anisotropy*Math.cos(D.anisotropyRotation),D.anisotropy*Math.sin(D.anisotropyRotation)),D.anisotropyMap)O.anisotropyMap.value=D.anisotropyMap,Z(D.anisotropyMap,O.anisotropyMapTransform)}if(O.specularIntensity.value=D.specularIntensity,O.specularColor.value.copy(D.specularColor),D.specularColorMap)O.specularColorMap.value=D.specularColorMap,Z(D.specularColorMap,O.specularColorMapTransform);if(D.specularIntensityMap)O.specularIntensityMap.value=D.specularIntensityMap,Z(D.specularIntensityMap,O.specularIntensityMapTransform)}function N(O,D){if(D.matcap)O.matcap.value=D.matcap}function E(O,D){let R=$.get(D).light;O.referencePosition.value.setFromMatrixPosition(R.matrixWorld),O.nearDistance.value=R.shadow.camera.near,O.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:Q,refreshMaterialUniforms:K}}function K4(J,$,Z,Q){let K={},W={},Y=[],X=Z.isWebGL2?J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS):0;function H(R,B){let z=B.program;Q.uniformBlockBinding(R,z)}function q(R,B){let z=K[R.id];if(z===void 0)N(R),z=U(R),K[R.id]=z,R.addEventListener("dispose",O);let C=B.program;Q.updateUBOMapping(R,C);let L=$.render.frame;if(W[R.id]!==L)V(R),W[R.id]=L}function U(R){let B=F();R.__bindingPointIndex=B;let z=J.createBuffer(),C=R.__size,L=R.usage;return J.bindBuffer(J.UNIFORM_BUFFER,z),J.bufferData(J.UNIFORM_BUFFER,C,L),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,B,z),z}function F(){for(let R=0;R<X;R++)if(Y.indexOf(R)===-1)return Y.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function V(R){let B=K[R.id],z=R.uniforms,C=R.__cache;J.bindBuffer(J.UNIFORM_BUFFER,B);for(let L=0,A=z.length;L<A;L++){let _=Array.isArray(z[L])?z[L]:[z[L]];for(let I=0,k=_.length;I<k;I++){let b=_[I];if(G(b,L,I,C)===!0){let n=b.__offset,r=Array.isArray(b.value)?b.value:[b.value],y=0;for(let h=0;h<r.length;h++){let m=r[h],i=E(m);if(typeof m==="number"||typeof m==="boolean")b.__data[0]=m,J.bufferSubData(J.UNIFORM_BUFFER,n+y,b.__data);else if(m.isMatrix3)b.__data[0]=m.elements[0],b.__data[1]=m.elements[1],b.__data[2]=m.elements[2],b.__data[3]=0,b.__data[4]=m.elements[3],b.__data[5]=m.elements[4],b.__data[6]=m.elements[5],b.__data[7]=0,b.__data[8]=m.elements[6],b.__data[9]=m.elements[7],b.__data[10]=m.elements[8],b.__data[11]=0;else m.toArray(b.__data,y),y+=i.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,n,b.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function G(R,B,z,C){let L=R.value,A=B+"_"+z;if(C[A]===void 0){if(typeof L==="number"||typeof L==="boolean")C[A]=L;else C[A]=L.clone();return!0}else{let _=C[A];if(typeof L==="number"||typeof L==="boolean"){if(_!==L)return C[A]=L,!0}else if(_.equals(L)===!1)return _.copy(L),!0}return!1}function N(R){let B=R.uniforms,z=0,C=16;for(let A=0,_=B.length;A<_;A++){let I=Array.isArray(B[A])?B[A]:[B[A]];for(let k=0,b=I.length;k<b;k++){let n=I[k],r=Array.isArray(n.value)?n.value:[n.value];for(let y=0,h=r.length;y<h;y++){let m=r[y],i=E(m),d=z%C;if(d!==0&&C-d<i.boundary)z+=C-d;n.__data=new Float32Array(i.storage/Float32Array.BYTES_PER_ELEMENT),n.__offset=z,z+=i.storage}}}let L=z%C;if(L>0)z+=C-L;return R.__size=z,R.__cache={},this}function E(R){let B={boundary:0,storage:0};if(typeof R==="number"||typeof R==="boolean")B.boundary=4,B.storage=4;else if(R.isVector2)B.boundary=8,B.storage=8;else if(R.isVector3||R.isColor)B.boundary=16,B.storage=12;else if(R.isVector4)B.boundary=16,B.storage=16;else if(R.isMatrix3)B.boundary=48,B.storage=48;else if(R.isMatrix4)B.boundary=64,B.storage=64;else if(R.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R);return B}function O(R){let B=R.target;B.removeEventListener("dispose",O);let z=Y.indexOf(B.__bindingPointIndex);Y.splice(z,1),J.deleteBuffer(K[B.id]),delete K[B.id],delete W[B.id]}function D(){for(let R in K)J.deleteBuffer(K[R]);Y=[],K={},W={}}return{bind:H,update:q,dispose:D}}class QZ{constructor(J={}){let{canvas:$=GX(),context:Z=null,depth:Q=!0,stencil:K=!0,alpha:W=!1,antialias:Y=!1,premultipliedAlpha:X=!0,preserveDrawingBuffer:H=!1,powerPreference:q="default",failIfMajorPerformanceCaveat:U=!1}=J;this.isWebGLRenderer=!0;let F;if(Z!==null)F=Z.getContextAttributes().alpha;else F=W;let V=new Uint32Array(4),G=new Int32Array(4),N=null,E=null,O=[],D=[];this.domElement=$,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace="srgb",this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let R=this,B=!1,z=0,C=0,L=null,A=-1,_=null,I=new D8,k=new D8,b=null,n=new e0(0),r=0,y=$.width,h=$.height,m=1,i=null,d=null,g=new D8(0,0,y,h),p=new D8(0,0,y,h),t=!1,v=new $Z,e=!1,H0=!1,V0=null,R0=new q8,x0=new Y0,u0=new T,_0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function f0(){return L===null?m:1}let x=Z;function O0(P,u){for(let o=0;o<P.length;o++){let a=P[o],s=$.getContext(a,u);if(s!==null)return s}return null}try{let P={alpha:!0,depth:Q,stencil:K,antialias:Y,premultipliedAlpha:X,preserveDrawingBuffer:H,powerPreference:q,failIfMajorPerformanceCaveat:U};if("setAttribute"in $)$.setAttribute("data-engine","three.js r160");if($.addEventListener("webglcontextlost",p0,!1),$.addEventListener("webglcontextrestored",G0,!1),$.addEventListener("webglcontextcreationerror",f,!1),x===null){let u=["webgl2","webgl","experimental-webgl"];if(R.isWebGL1Renderer===!0)u.shift();if(x=O0(u,P),x===null)if(O0(u))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}if(typeof WebGLRenderingContext<"u"&&x instanceof WebGLRenderingContext)console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.");if(x.getShaderPrecisionFormat===void 0)x.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let W0,K0,Q0,z0,E0,P0,S,M,l,q0,Z0,U0,y0,F0,A0,T0,h0,X0,O8,l0,v0,M0,j,$0;function D0(){W0=new CH(x),K0=new NH(x,W0,J),W0.init(K0),M0=new $4(x,W0,K0),Q0=new eq(x,W0,K0),z0=new kH(x),E0=new uq,P0=new J4(x,W0,Q0,E0,K0,M0,z0),S=new BH(R),M=new LH(R),l=new xX(x,K0),j=new DH(x,W0,l,K0),q0=new AH(x,l,z0,j),Z0=new _H(x,q0,l,z0),O8=new wH(x,K0,P0),T0=new RH(E0),U0=new mq(R,S,M,W0,K0,j,T0),y0=new Q4(R,E0),F0=new pq,A0=new oq(W0,K0),X0=new OH(R,S,M,Q0,Z0,F,X),h0=new tq(R,Z0,K0),$0=new K4(x,z0,K0,Q0),l0=new EH(x,W0,z0,K0),v0=new MH(x,W0,z0,K0),z0.programs=U0.programs,R.capabilities=K0,R.extensions=W0,R.properties=E0,R.renderLists=F0,R.shadowMap=h0,R.state=Q0,R.info=z0}D0();let C0=new OK(R,x);this.xr=C0,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){let P=W0.get("WEBGL_lose_context");if(P)P.loseContext()},this.forceContextRestore=function(){let P=W0.get("WEBGL_lose_context");if(P)P.restoreContext()},this.getPixelRatio=function(){return m},this.setPixelRatio=function(P){if(P===void 0)return;m=P,this.setSize(y,h,!1)},this.getSize=function(P){return P.set(y,h)},this.setSize=function(P,u,o=!0){if(C0.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(y=P,h=u,$.width=Math.floor(P*m),$.height=Math.floor(u*m),o===!0)$.style.width=P+"px",$.style.height=u+"px";this.setViewport(0,0,P,u)},this.getDrawingBufferSize=function(P){return P.set(y*m,h*m).floor()},this.setDrawingBufferSize=function(P,u,o){y=P,h=u,m=o,$.width=Math.floor(P*o),$.height=Math.floor(u*o),this.setViewport(0,0,P,u)},this.getCurrentViewport=function(P){return P.copy(I)},this.getViewport=function(P){return P.copy(g)},this.setViewport=function(P,u,o,a){if(P.isVector4)g.set(P.x,P.y,P.z,P.w);else g.set(P,u,o,a);Q0.viewport(I.copy(g).multiplyScalar(m).floor())},this.getScissor=function(P){return P.copy(p)},this.setScissor=function(P,u,o,a){if(P.isVector4)p.set(P.x,P.y,P.z,P.w);else p.set(P,u,o,a);Q0.scissor(k.copy(p).multiplyScalar(m).floor())},this.getScissorTest=function(){return t},this.setScissorTest=function(P){Q0.setScissorTest(t=P)},this.setOpaqueSort=function(P){i=P},this.setTransparentSort=function(P){d=P},this.getClearColor=function(P){return P.copy(X0.getClearColor())},this.setClearColor=function(){X0.setClearColor.apply(X0,arguments)},this.getClearAlpha=function(){return X0.getClearAlpha()},this.setClearAlpha=function(){X0.setClearAlpha.apply(X0,arguments)},this.clear=function(P=!0,u=!0,o=!0){let a=0;if(P){let s=!1;if(L!==null){let k0=L.texture.format;s=k0===1033||k0===1031||k0===1029}if(s){let k0=L.texture.type,b0=k0===1009||k0===1014||k0===1012||k0===1020||k0===1017||k0===1018,m0=X0.getClearColor(),d0=X0.getClearAlpha(),i0=m0.r,c0=m0.g,n0=m0.b;if(b0)V[0]=i0,V[1]=c0,V[2]=n0,V[3]=d0,x.clearBufferuiv(x.COLOR,0,V);else G[0]=i0,G[1]=c0,G[2]=n0,G[3]=d0,x.clearBufferiv(x.COLOR,0,G)}else a|=x.COLOR_BUFFER_BIT}if(u)a|=x.DEPTH_BUFFER_BIT;if(o)a|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);x.clear(a)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){if($.removeEventListener("webglcontextlost",p0,!1),$.removeEventListener("webglcontextrestored",G0,!1),$.removeEventListener("webglcontextcreationerror",f,!1),F0.dispose(),A0.dispose(),E0.dispose(),S.dispose(),M.dispose(),Z0.dispose(),j.dispose(),$0.dispose(),U0.dispose(),C0.dispose(),C0.removeEventListener("sessionstart",U8),C0.removeEventListener("sessionend",k8),V0)V0.dispose(),V0=null;t0.stop()};function p0(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function G0(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;let P=z0.autoReset,u=h0.enabled,o=h0.autoUpdate,a=h0.needsUpdate,s=h0.type;D0(),z0.autoReset=P,h0.enabled=u,h0.autoUpdate=o,h0.needsUpdate=a,h0.type=s}function f(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function I0(P){let u=P.target;u.removeEventListener("dispose",I0),L0(u)}function L0(P){g0(P),E0.remove(P)}function g0(P){let u=E0.get(P).programs;if(u!==void 0){if(u.forEach(function(o){U0.releaseProgram(o)}),P.isShaderMaterial)U0.releaseShaderCache(P)}}this.renderBufferDirect=function(P,u,o,a,s,k0){if(u===null)u=_0;let b0=s.isMesh&&s.matrixWorld.determinant()<0,m0=oW(P,u,o,a,s);Q0.setMaterial(a,b0);let d0=o.index,i0=1;if(a.wireframe===!0){if(d0=q0.getWireframeAttribute(o),d0===void 0)return;i0=2}let c0=o.drawRange,n0=o.attributes.position,P8=c0.start*i0,W9=(c0.start+c0.count)*i0;if(k0!==null)P8=Math.max(P8,k0.start*i0),W9=Math.min(W9,(k0.start+k0.count)*i0);if(d0!==null)P8=Math.max(P8,0),W9=Math.min(W9,d0.count);else if(n0!==void 0&&n0!==null)P8=Math.max(P8,0),W9=Math.min(W9,n0.count);let b8=W9-P8;if(b8<0||b8===1/0)return;j.setup(s,a,m0,o,d0);let x9,R8=l0;if(d0!==null)x9=l.get(d0),R8=v0,R8.setIndex(x9);if(s.isMesh)if(a.wireframe===!0)Q0.setLineWidth(a.wireframeLinewidth*f0()),R8.setMode(x.LINES);else R8.setMode(x.TRIANGLES);else if(s.isLine){let o0=a.linewidth;if(o0===void 0)o0=1;if(Q0.setLineWidth(o0*f0()),s.isLineSegments)R8.setMode(x.LINES);else if(s.isLineLoop)R8.setMode(x.LINE_LOOP);else R8.setMode(x.LINE_STRIP)}else if(s.isPoints)R8.setMode(x.POINTS);else if(s.isSprite)R8.setMode(x.TRIANGLES);if(s.isBatchedMesh)R8.renderMultiDraw(s._multiDrawStarts,s._multiDrawCounts,s._multiDrawCount);else if(s.isInstancedMesh)R8.renderInstances(P8,b8,s.count);else if(o.isInstancedBufferGeometry){let o0=o._maxInstanceCount!==void 0?o._maxInstanceCount:1/0,wZ=Math.min(o.instanceCount,o0);R8.renderInstances(P8,b8,wZ)}else R8.render(P8,b8)};function j0(P,u,o){if(P.transparent===!0&&P.side===2&&P.forceSinglePass===!1)P.side=1,P.needsUpdate=!0,O$(P,u,o),P.side=0,P.needsUpdate=!0,O$(P,u,o),P.side=2;else O$(P,u,o)}this.compile=function(P,u,o=null){if(o===null)o=P;if(E=A0.get(o),E.init(),D.push(E),o.traverseVisible(function(s){if(s.isLight&&s.layers.test(u.layers)){if(E.pushLight(s),s.castShadow)E.pushShadow(s)}}),P!==o)P.traverseVisible(function(s){if(s.isLight&&s.layers.test(u.layers)){if(E.pushLight(s),s.castShadow)E.pushShadow(s)}});E.setupLights(R._useLegacyLights);let a=new Set;return P.traverse(function(s){let k0=s.material;if(k0)if(Array.isArray(k0))for(let b0=0;b0<k0.length;b0++){let m0=k0[b0];j0(m0,o,s),a.add(m0)}else j0(k0,o,s),a.add(k0)}),D.pop(),E=null,a},this.compileAsync=function(P,u,o=null){let a=this.compile(P,u,o);return new Promise((s)=>{function k0(){if(a.forEach(function(b0){if(E0.get(b0).currentProgram.isReady())a.delete(b0)}),a.size===0){s(P);return}setTimeout(k0,10)}if(W0.get("KHR_parallel_shader_compile")!==null)k0();else setTimeout(k0,10)})};let a0=null;function Z8(P){if(a0)a0(P)}function U8(){t0.stop()}function k8(){t0.start()}let t0=new JK;if(t0.setAnimationLoop(Z8),typeof self<"u")t0.setContext(self);this.setAnimationLoop=function(P){a0=P,C0.setAnimationLoop(P),P===null?t0.stop():t0.start()},C0.addEventListener("sessionstart",U8),C0.addEventListener("sessionend",k8),this.render=function(P,u){if(u!==void 0&&u.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(P.matrixWorldAutoUpdate===!0)P.updateMatrixWorld();if(u.parent===null&&u.matrixWorldAutoUpdate===!0)u.updateMatrixWorld();if(C0.enabled===!0&&C0.isPresenting===!0){if(C0.cameraAutoUpdate===!0)C0.updateCamera(u);u=C0.getCamera()}if(P.isScene===!0)P.onBeforeRender(R,P,u,L);if(E=A0.get(P,D.length),E.init(),D.push(E),R0.multiplyMatrices(u.projectionMatrix,u.matrixWorldInverse),v.setFromProjectionMatrix(R0),H0=this.localClippingEnabled,e=T0.init(this.clippingPlanes,H0),N=F0.get(P,O.length),N.init(),O.push(N),L9(P,u,0,R.sortObjects),N.finish(),R.sortObjects===!0)N.sort(i,d);if(this.info.render.frame++,e===!0)T0.beginShadows();let o=E.state.shadowsArray;if(h0.render(o,P,u),e===!0)T0.endShadows();if(this.info.autoReset===!0)this.info.reset();if(X0.render(N,P),E.setupLights(R._useLegacyLights),u.isArrayCamera){let a=u.cameras;for(let s=0,k0=a.length;s<k0;s++){let b0=a[s];C9(N,P,b0,b0.viewport)}}else C9(N,P,u);if(L!==null)P0.updateMultisampleRenderTarget(L),P0.updateRenderTargetMipmap(L);if(P.isScene===!0)P.onAfterRender(R,P,u);if(j.resetDefaultState(),A=-1,_=null,D.pop(),D.length>0)E=D[D.length-1];else E=null;if(O.pop(),O.length>0)N=O[O.length-1];else N=null};function L9(P,u,o,a){if(P.visible===!1)return;if(P.layers.test(u.layers)){if(P.isGroup)o=P.renderOrder;else if(P.isLOD){if(P.autoUpdate===!0)P.update(u)}else if(P.isLight){if(E.pushLight(P),P.castShadow)E.pushShadow(P)}else if(P.isSprite){if(!P.frustumCulled||v.intersectsSprite(P)){if(a)u0.setFromMatrixPosition(P.matrixWorld).applyMatrix4(R0);let b0=Z0.update(P),m0=P.material;if(m0.visible)N.push(P,b0,m0,o,u0.z,null)}}else if(P.isMesh||P.isLine||P.isPoints){if(!P.frustumCulled||v.intersectsObject(P)){let b0=Z0.update(P),m0=P.material;if(a){if(P.boundingSphere!==void 0){if(P.boundingSphere===null)P.computeBoundingSphere();u0.copy(P.boundingSphere.center)}else{if(b0.boundingSphere===null)b0.computeBoundingSphere();u0.copy(b0.boundingSphere.center)}u0.applyMatrix4(P.matrixWorld).applyMatrix4(R0)}if(Array.isArray(m0)){let d0=b0.groups;for(let i0=0,c0=d0.length;i0<c0;i0++){let n0=d0[i0],P8=m0[n0.materialIndex];if(P8&&P8.visible)N.push(P,b0,P8,o,u0.z,n0)}}else if(m0.visible)N.push(P,b0,m0,o,u0.z,null)}}}let k0=P.children;for(let b0=0,m0=k0.length;b0<m0;b0++)L9(k0[b0],u,o,a)}function C9(P,u,o,a){let{opaque:s,transmissive:k0,transparent:b0}=P;if(E.setupLightsView(o),e===!0)T0.setGlobalState(R.clippingPlanes,o);if(k0.length>0)iW(s,k0,u,o);if(a)Q0.viewport(I.copy(a));if(s.length>0)G$(s,u,o);if(k0.length>0)G$(k0,u,o);if(b0.length>0)G$(b0,u,o);Q0.buffers.depth.setTest(!0),Q0.buffers.depth.setMask(!0),Q0.buffers.color.setMask(!0),Q0.setPolygonOffset(!1)}function iW(P,u,o,a){if((o.isScene===!0?o.overrideMaterial:null)!==null)return;let k0=K0.isWebGL2;if(V0===null)V0=new $J(1,1,{generateMipmaps:!0,type:W0.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:k0?4:0});if(R.getDrawingBufferSize(x0),k0)V0.setSize(x0.x,x0.y);else V0.setSize(i$(x0.x),i$(x0.y));let b0=R.getRenderTarget();if(R.setRenderTarget(V0),R.getClearColor(n),r=R.getClearAlpha(),r<1)R.setClearColor(16777215,0.5);R.clear();let m0=R.toneMapping;R.toneMapping=0,G$(P,o,a),P0.updateMultisampleRenderTarget(V0),P0.updateRenderTargetMipmap(V0);let d0=!1;for(let i0=0,c0=u.length;i0<c0;i0++){let n0=u[i0],P8=n0.object,W9=n0.geometry,b8=n0.material,x9=n0.group;if(b8.side===2&&P8.layers.test(a.layers)){let R8=b8.side;b8.side=1,b8.needsUpdate=!0,v5(P8,o,a,W9,b8,x9),b8.side=R8,b8.needsUpdate=!0,d0=!0}}if(d0===!0)P0.updateMultisampleRenderTarget(V0),P0.updateRenderTargetMipmap(V0);R.setRenderTarget(b0),R.setClearColor(n,r),R.toneMapping=m0}function G$(P,u,o){let a=u.isScene===!0?u.overrideMaterial:null;for(let s=0,k0=P.length;s<k0;s++){let b0=P[s],m0=b0.object,d0=b0.geometry,i0=a===null?b0.material:a,c0=b0.group;if(m0.layers.test(o.layers))v5(m0,u,o,d0,i0,c0)}}function v5(P,u,o,a,s,k0){if(P.onBeforeRender(R,u,o,a,s,k0),P.modelViewMatrix.multiplyMatrices(o.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),s.onBeforeRender(R,u,o,a,P,k0),s.transparent===!0&&s.side===2&&s.forceSinglePass===!1)s.side=1,s.needsUpdate=!0,R.renderBufferDirect(o,u,a,s,P,k0),s.side=0,s.needsUpdate=!0,R.renderBufferDirect(o,u,a,s,P,k0),s.side=2;else R.renderBufferDirect(o,u,a,s,P,k0);P.onAfterRender(R,u,o,a,s,k0)}function O$(P,u,o){if(u.isScene!==!0)u=_0;let a=E0.get(P),s=E.state.lights,k0=E.state.shadowsArray,b0=s.state.version,m0=U0.getParameters(P,s.state,k0,u,o),d0=U0.getProgramCacheKey(m0),i0=a.programs;if(a.environment=P.isMeshStandardMaterial?u.environment:null,a.fog=u.fog,a.envMap=(P.isMeshStandardMaterial?M:S).get(P.envMap||a.environment),i0===void 0)P.addEventListener("dispose",I0),i0=new Map,a.programs=i0;let c0=i0.get(d0);if(c0!==void 0){if(a.currentProgram===c0&&a.lightsStateVersion===b0)return m5(P,m0),c0}else m0.uniforms=U0.getUniforms(P),P.onBuild(o,m0,R),P.onBeforeCompile(m0,R),c0=U0.acquireProgram(m0,d0),i0.set(d0,c0),a.uniforms=m0.uniforms;let n0=a.uniforms;if(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)n0.clippingPlanes=T0.uniform;if(m5(P,m0),a.needsLights=aW(P),a.lightsStateVersion=b0,a.needsLights)n0.ambientLightColor.value=s.state.ambient,n0.lightProbe.value=s.state.probe,n0.directionalLights.value=s.state.directional,n0.directionalLightShadows.value=s.state.directionalShadow,n0.spotLights.value=s.state.spot,n0.spotLightShadows.value=s.state.spotShadow,n0.rectAreaLights.value=s.state.rectArea,n0.ltc_1.value=s.state.rectAreaLTC1,n0.ltc_2.value=s.state.rectAreaLTC2,n0.pointLights.value=s.state.point,n0.pointLightShadows.value=s.state.pointShadow,n0.hemisphereLights.value=s.state.hemi,n0.directionalShadowMap.value=s.state.directionalShadowMap,n0.directionalShadowMatrix.value=s.state.directionalShadowMatrix,n0.spotShadowMap.value=s.state.spotShadowMap,n0.spotLightMatrix.value=s.state.spotLightMatrix,n0.spotLightMap.value=s.state.spotLightMap,n0.pointShadowMap.value=s.state.pointShadowMap,n0.pointShadowMatrix.value=s.state.pointShadowMatrix;return a.currentProgram=c0,a.uniformsList=null,c0}function g5(P){if(P.uniformsList===null){let u=P.currentProgram.getUniforms();P.uniformsList=h7.seqWithValue(u.seq,P.uniforms)}return P.uniformsList}function m5(P,u){let o=E0.get(P);o.outputColorSpace=u.outputColorSpace,o.batching=u.batching,o.instancing=u.instancing,o.instancingColor=u.instancingColor,o.skinning=u.skinning,o.morphTargets=u.morphTargets,o.morphNormals=u.morphNormals,o.morphColors=u.morphColors,o.morphTargetsCount=u.morphTargetsCount,o.numClippingPlanes=u.numClippingPlanes,o.numIntersection=u.numClipIntersection,o.vertexAlphas=u.vertexAlphas,o.vertexTangents=u.vertexTangents,o.toneMapping=u.toneMapping}function oW(P,u,o,a,s){if(u.isScene!==!0)u=_0;P0.resetTextureUnits();let k0=u.fog,b0=a.isMeshStandardMaterial?u.environment:null,m0=L===null?R.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:"srgb-linear",d0=(a.isMeshStandardMaterial?M:S).get(a.envMap||b0),i0=a.vertexColors===!0&&!!o.attributes.color&&o.attributes.color.itemSize===4,c0=!!o.attributes.tangent&&(!!a.normalMap||a.anisotropy>0),n0=!!o.morphAttributes.position,P8=!!o.morphAttributes.normal,W9=!!o.morphAttributes.color,b8=0;if(a.toneMapped){if(L===null||L.isXRRenderTarget===!0)b8=R.toneMapping}let x9=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,R8=x9!==void 0?x9.length:0,o0=E0.get(a),wZ=E.state.lights;if(e===!0){if(H0===!0||P!==_){let V9=P===_&&a.id===A;T0.setState(a,P,V9)}}let C8=!1;if(a.version===o0.__version){if(o0.needsLights&&o0.lightsStateVersion!==wZ.state.version)C8=!0;else if(o0.outputColorSpace!==m0)C8=!0;else if(s.isBatchedMesh&&o0.batching===!1)C8=!0;else if(!s.isBatchedMesh&&o0.batching===!0)C8=!0;else if(s.isInstancedMesh&&o0.instancing===!1)C8=!0;else if(!s.isInstancedMesh&&o0.instancing===!0)C8=!0;else if(s.isSkinnedMesh&&o0.skinning===!1)C8=!0;else if(!s.isSkinnedMesh&&o0.skinning===!0)C8=!0;else if(s.isInstancedMesh&&o0.instancingColor===!0&&s.instanceColor===null)C8=!0;else if(s.isInstancedMesh&&o0.instancingColor===!1&&s.instanceColor!==null)C8=!0;else if(o0.envMap!==d0)C8=!0;else if(a.fog===!0&&o0.fog!==k0)C8=!0;else if(o0.numClippingPlanes!==void 0&&(o0.numClippingPlanes!==T0.numPlanes||o0.numIntersection!==T0.numIntersection))C8=!0;else if(o0.vertexAlphas!==i0)C8=!0;else if(o0.vertexTangents!==c0)C8=!0;else if(o0.morphTargets!==n0)C8=!0;else if(o0.morphNormals!==P8)C8=!0;else if(o0.morphColors!==W9)C8=!0;else if(o0.toneMapping!==b8)C8=!0;else if(K0.isWebGL2===!0&&o0.morphTargetsCount!==R8)C8=!0}else C8=!0,o0.__version=a.version;let VJ=o0.currentProgram;if(C8===!0)VJ=O$(a,u,s);let u5=!1,M7=!1,_Z=!1,u8=VJ.getUniforms(),GJ=o0.uniforms;if(Q0.useProgram(VJ.program))u5=!0,M7=!0,_Z=!0;if(a.id!==A)A=a.id,M7=!0;if(u5||_!==P){u8.setValue(x,"projectionMatrix",P.projectionMatrix),u8.setValue(x,"viewMatrix",P.matrixWorldInverse);let V9=u8.map.cameraPosition;if(V9!==void 0)V9.setValue(x,u0.setFromMatrixPosition(P.matrixWorld));if(K0.logarithmicDepthBuffer)u8.setValue(x,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2));if(a.isMeshPhongMaterial||a.isMeshToonMaterial||a.isMeshLambertMaterial||a.isMeshBasicMaterial||a.isMeshStandardMaterial||a.isShaderMaterial)u8.setValue(x,"isOrthographic",P.isOrthographicCamera===!0);if(_!==P)_=P,M7=!0,_Z=!0}if(s.isSkinnedMesh){u8.setOptional(x,s,"bindMatrix"),u8.setOptional(x,s,"bindMatrixInverse");let V9=s.skeleton;if(V9)if(K0.floatVertexTextures){if(V9.boneTexture===null)V9.computeBoneTexture();u8.setValue(x,"boneTexture",V9.boneTexture,P0)}else console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.")}if(s.isBatchedMesh)u8.setOptional(x,s,"batchingTexture"),u8.setValue(x,"batchingTexture",s._matricesTexture,P0);let TZ=o.morphAttributes;if(TZ.position!==void 0||TZ.normal!==void 0||TZ.color!==void 0&&K0.isWebGL2===!0)O8.update(s,o,VJ);if(M7||o0.receiveShadow!==s.receiveShadow)o0.receiveShadow=s.receiveShadow,u8.setValue(x,"receiveShadow",s.receiveShadow);if(a.isMeshGouraudMaterial&&a.envMap!==null)GJ.envMap.value=d0,GJ.flipEnvMap.value=d0.isCubeTexture&&d0.isRenderTargetTexture===!1?-1:1;if(M7){if(u8.setValue(x,"toneMappingExposure",R.toneMappingExposure),o0.needsLights)rW(GJ,_Z);if(k0&&a.fog===!0)y0.refreshFogUniforms(GJ,k0);y0.refreshMaterialUniforms(GJ,a,m,h,V0),h7.upload(x,g5(o0),GJ,P0)}if(a.isShaderMaterial&&a.uniformsNeedUpdate===!0)h7.upload(x,g5(o0),GJ,P0),a.uniformsNeedUpdate=!1;if(a.isSpriteMaterial)u8.setValue(x,"center",s.center);if(u8.setValue(x,"modelViewMatrix",s.modelViewMatrix),u8.setValue(x,"normalMatrix",s.normalMatrix),u8.setValue(x,"modelMatrix",s.matrixWorld),a.isShaderMaterial||a.isRawShaderMaterial){let V9=a.uniformsGroups;for(let jZ=0,tW=V9.length;jZ<tW;jZ++)if(K0.isWebGL2){let d5=V9[jZ];$0.update(d5,VJ),$0.bind(d5,VJ)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return VJ}function rW(P,u){P.ambientLightColor.needsUpdate=u,P.lightProbe.needsUpdate=u,P.directionalLights.needsUpdate=u,P.directionalLightShadows.needsUpdate=u,P.pointLights.needsUpdate=u,P.pointLightShadows.needsUpdate=u,P.spotLights.needsUpdate=u,P.spotLightShadows.needsUpdate=u,P.rectAreaLights.needsUpdate=u,P.hemisphereLights.needsUpdate=u}function aW(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}if(this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(P,u,o){E0.get(P.texture).__webglTexture=u,E0.get(P.depthTexture).__webglTexture=o;let a=E0.get(P);if(a.__hasExternalTextures=!0,a.__hasExternalTextures){if(a.__autoAllocateDepthBuffer=o===void 0,!a.__autoAllocateDepthBuffer){if(W0.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),a.__useRenderToTexture=!1}}},this.setRenderTargetFramebuffer=function(P,u){let o=E0.get(P);o.__webglFramebuffer=u,o.__useDefaultFramebuffer=u===void 0},this.setRenderTarget=function(P,u=0,o=0){L=P,z=u,C=o;let a=!0,s=null,k0=!1,b0=!1;if(P){let d0=E0.get(P);if(d0.__useDefaultFramebuffer!==void 0)Q0.bindFramebuffer(x.FRAMEBUFFER,null),a=!1;else if(d0.__webglFramebuffer===void 0)P0.setupRenderTarget(P);else if(d0.__hasExternalTextures)P0.rebindTextures(P,E0.get(P.texture).__webglTexture,E0.get(P.depthTexture).__webglTexture);let i0=P.texture;if(i0.isData3DTexture||i0.isDataArrayTexture||i0.isCompressedArrayTexture)b0=!0;let c0=E0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget){if(Array.isArray(c0[u]))s=c0[u][o];else s=c0[u];k0=!0}else if(K0.isWebGL2&&P.samples>0&&P0.useMultisampledRTT(P)===!1)s=E0.get(P).__webglMultisampledFramebuffer;else if(Array.isArray(c0))s=c0[o];else s=c0;I.copy(P.viewport),k.copy(P.scissor),b=P.scissorTest}else I.copy(g).multiplyScalar(m).floor(),k.copy(p).multiplyScalar(m).floor(),b=t;if(Q0.bindFramebuffer(x.FRAMEBUFFER,s)&&K0.drawBuffers&&a)Q0.drawBuffers(P,s);if(Q0.viewport(I),Q0.scissor(k),Q0.setScissorTest(b),k0){let d0=E0.get(P.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+u,d0.__webglTexture,o)}else if(b0){let d0=E0.get(P.texture),i0=u||0;x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,d0.__webglTexture,o||0,i0)}A=-1},this.readRenderTargetPixels=function(P,u,o,a,s,k0,b0){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let m0=E0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&b0!==void 0)m0=m0[b0];if(m0){Q0.bindFramebuffer(x.FRAMEBUFFER,m0);try{let d0=P.texture,i0=d0.format,c0=d0.type;if(i0!==1023&&M0.convert(i0)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let n0=c0===1016&&(W0.has("EXT_color_buffer_half_float")||K0.isWebGL2&&W0.has("EXT_color_buffer_float"));if(c0!==1009&&M0.convert(c0)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_TYPE)&&!(c0===1015&&(K0.isWebGL2||W0.has("OES_texture_float")||W0.has("WEBGL_color_buffer_float")))&&!n0){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(u>=0&&u<=P.width-a&&(o>=0&&o<=P.height-s))x.readPixels(u,o,a,s,M0.convert(i0),M0.convert(c0),k0)}finally{let d0=L!==null?E0.get(L).__webglFramebuffer:null;Q0.bindFramebuffer(x.FRAMEBUFFER,d0)}}},this.copyFramebufferToTexture=function(P,u,o=0){let a=Math.pow(2,-o),s=Math.floor(u.image.width*a),k0=Math.floor(u.image.height*a);P0.setTexture2D(u,0),x.copyTexSubImage2D(x.TEXTURE_2D,o,0,0,P.x,P.y,s,k0),Q0.unbindTexture()},this.copyTextureToTexture=function(P,u,o,a=0){let s=u.image.width,k0=u.image.height,b0=M0.convert(o.format),m0=M0.convert(o.type);if(P0.setTexture2D(o,0),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,o.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,o.unpackAlignment),u.isDataTexture)x.texSubImage2D(x.TEXTURE_2D,a,P.x,P.y,s,k0,b0,m0,u.image.data);else if(u.isCompressedTexture)x.compressedTexSubImage2D(x.TEXTURE_2D,a,P.x,P.y,u.mipmaps[0].width,u.mipmaps[0].height,b0,u.mipmaps[0].data);else x.texSubImage2D(x.TEXTURE_2D,a,P.x,P.y,b0,m0,u.image);if(a===0&&o.generateMipmaps)x.generateMipmap(x.TEXTURE_2D);Q0.unbindTexture()},this.copyTextureToTexture3D=function(P,u,o,a,s=0){if(R.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let k0=P.max.x-P.min.x+1,b0=P.max.y-P.min.y+1,m0=P.max.z-P.min.z+1,d0=M0.convert(a.format),i0=M0.convert(a.type),c0;if(a.isData3DTexture)P0.setTexture3D(a,0),c0=x.TEXTURE_3D;else if(a.isDataArrayTexture||a.isCompressedArrayTexture)P0.setTexture2DArray(a,0),c0=x.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,a.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,a.unpackAlignment);let n0=x.getParameter(x.UNPACK_ROW_LENGTH),P8=x.getParameter(x.UNPACK_IMAGE_HEIGHT),W9=x.getParameter(x.UNPACK_SKIP_PIXELS),b8=x.getParameter(x.UNPACK_SKIP_ROWS),x9=x.getParameter(x.UNPACK_SKIP_IMAGES),R8=o.isCompressedTexture?o.mipmaps[s]:o.image;if(x.pixelStorei(x.UNPACK_ROW_LENGTH,R8.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,R8.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,P.min.x),x.pixelStorei(x.UNPACK_SKIP_ROWS,P.min.y),x.pixelStorei(x.UNPACK_SKIP_IMAGES,P.min.z),o.isDataTexture||o.isData3DTexture)x.texSubImage3D(c0,s,u.x,u.y,u.z,k0,b0,m0,d0,i0,R8.data);else if(o.isCompressedArrayTexture)console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),x.compressedTexSubImage3D(c0,s,u.x,u.y,u.z,k0,b0,m0,d0,R8.data);else x.texSubImage3D(c0,s,u.x,u.y,u.z,k0,b0,m0,d0,i0,R8);if(x.pixelStorei(x.UNPACK_ROW_LENGTH,n0),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,P8),x.pixelStorei(x.UNPACK_SKIP_PIXELS,W9),x.pixelStorei(x.UNPACK_SKIP_ROWS,b8),x.pixelStorei(x.UNPACK_SKIP_IMAGES,x9),s===0&&a.generateMipmaps)x.generateMipmap(c0);Q0.unbindTexture()},this.initTexture=function(P){if(P.isCubeTexture)P0.setTextureCube(P,0);else if(P.isData3DTexture)P0.setTexture3D(P,0);else if(P.isDataArrayTexture||P.isCompressedArrayTexture)P0.setTexture2DArray(P,0);else P0.setTexture2D(P,0);Q0.unbindTexture()},this.resetState=function(){z=0,C=0,L=null,Q0.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2000}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=J==="display-p3"?"display-p3":"srgb",$.unpackColorSpace=W8.workingColorSpace==="display-p3-linear"?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace==="srgb"?3001:3000}set outputEncoding(J){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=J===3001?"srgb":"srgb-linear"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(J){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=J}}class DK extends QZ{}DK.prototype.isWebGL1Renderer=!0;class SQ extends E8{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)$.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)$.object.backgroundIntensity=this.backgroundIntensity;return $}}class EK{constructor(J,$){this.isInterleavedBuffer=!0,this.array=J,this.stride=$,this.count=J!==void 0?J.length/$:0,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=P9()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,$,Z){J*=this.stride,Z*=$.stride;for(let Q=0,K=this.stride;Q<K;Q++)this.array[J+Q]=$.array[Z+Q];return this}set(J,$=0){return this.array.set(J,$),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=P9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let $=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Z=new this.constructor($,this.stride);return Z.setUsage(this.usage),Z}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=P9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var i8=new T;class r${constructor(J,$,Z,Q=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=$,this.offset=Z,this.normalized=Q}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let $=0,Z=this.data.count;$<Z;$++)i8.fromBufferAttribute(this,$),i8.applyMatrix4(J),this.setXYZ($,i8.x,i8.y,i8.z);return this}applyNormalMatrix(J){for(let $=0,Z=this.count;$<Z;$++)i8.fromBufferAttribute(this,$),i8.applyNormalMatrix(J),this.setXYZ($,i8.x,i8.y,i8.z);return this}transformDirection(J){for(let $=0,Z=this.count;$<Z;$++)i8.fromBufferAttribute(this,$),i8.transformDirection(J),this.setXYZ($,i8.x,i8.y,i8.z);return this}setX(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset]=$,this}setY(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset+1]=$,this}setZ(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset+2]=$,this}setW(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset+3]=$,this}getX(J){let $=this.data.array[J*this.data.stride+this.offset];if(this.normalized)$=k9($,this.array);return $}getY(J){let $=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)$=k9($,this.array);return $}getZ(J){let $=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)$=k9($,this.array);return $}getW(J){let $=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)$=k9($,this.array);return $}setXY(J,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)$=Q8($,this.array),Z=Q8(Z,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this}setXYZ(J,$,Z,Q){if(J=J*this.data.stride+this.offset,this.normalized)$=Q8($,this.array),Z=Q8(Z,this.array),Q=Q8(Q,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this.data.array[J+2]=Q,this}setXYZW(J,$,Z,Q,K){if(J=J*this.data.stride+this.offset,this.normalized)$=Q8($,this.array),Z=Q8(Z,this.array),Q=Q8(Q,this.array),K=Q8(K,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this.data.array[J+2]=Q,this.data.array[J+3]=K,this}clone(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Z=0;Z<this.count;Z++){let Q=Z*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Q+K])}return new v8(new this.array.constructor($),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new r$(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Z=0;Z<this.count;Z++){let Q=Z*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Q+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:$,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class KZ extends d9{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new e0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var rJ,_7=new T,aJ=new T,tJ=new T,eJ=new Y0,T7=new Y0,NK=new q8,h$=new T,j7=new T,v$=new T,P6=new Y0,ZQ=new Y0,S6=new Y0;class wQ extends E8{constructor(J=new KZ){super();if(this.isSprite=!0,this.type="Sprite",rJ===void 0){rJ=new F8;let $=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Z=new EK($,5);rJ.setIndex([0,1,2,0,2,3]),rJ.setAttribute("position",new r$(Z,3,0,!1)),rJ.setAttribute("uv",new r$(Z,2,3,!1))}this.geometry=rJ,this.material=J,this.center=new Y0(0.5,0.5)}raycast(J,$){if(J.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(aJ.setFromMatrixScale(this.matrixWorld),NK.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),tJ.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)aJ.multiplyScalar(-tJ.z);let Z=this.material.rotation,Q,K;if(Z!==0)K=Math.cos(Z),Q=Math.sin(Z);let W=this.center;g$(h$.set(-0.5,-0.5,0),tJ,W,aJ,Q,K),g$(j7.set(0.5,-0.5,0),tJ,W,aJ,Q,K),g$(v$.set(0.5,0.5,0),tJ,W,aJ,Q,K),P6.set(0,0),ZQ.set(1,0),S6.set(1,1);let Y=J.ray.intersectTriangle(h$,j7,v$,!1,_7);if(Y===null){if(g$(j7.set(-0.5,0.5,0),tJ,W,aJ,Q,K),ZQ.set(0,1),Y=J.ray.intersectTriangle(h$,v$,j7,!1,_7),Y===null)return}let X=J.ray.origin.distanceTo(_7);if(X<J.near||X>J.far)return;$.push({distance:X,point:_7.clone(),uv:O9.getInterpolation(_7,h$,j7,v$,P6,ZQ,S6,new Y0),face:null,object:this})}copy(J,$){if(super.copy(J,$),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function g$(J,$,Z,Q,K,W){if(eJ.subVectors(J,Z).addScalar(0.5).multiply(Q),K!==void 0)T7.x=W*eJ.x-K*eJ.y,T7.y=K*eJ.x+W*eJ.y;else T7.copy(eJ);J.copy($),J.x+=T7.x,J.y+=T7.y,J.applyMatrix4(NK)}class c7 extends d9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new e0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var w6=new T,_6=new T,T6=new q8,QQ=new CJ,m$=new H7;class RK extends E8{constructor(J=new F8,$=new c7){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Z=[0];for(let Q=1,K=$.count;Q<K;Q++)w6.fromBufferAttribute($,Q-1),_6.fromBufferAttribute($,Q),Z[Q]=Z[Q-1],Z[Q]+=w6.distanceTo(_6);J.setAttribute("lineDistance",new $8(Z,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,$){let Z=this.geometry,Q=this.matrixWorld,K=J.params.Line.threshold,W=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(m$.copy(Z.boundingSphere),m$.applyMatrix4(Q),m$.radius+=K,J.ray.intersectsSphere(m$)===!1)return;T6.copy(Q).invert(),QQ.copy(J.ray).applyMatrix4(T6);let Y=K/((this.scale.x+this.scale.y+this.scale.z)/3),X=Y*Y,H=new T,q=new T,U=new T,F=new T,V=this.isLineSegments?2:1,G=Z.index,E=Z.attributes.position;if(G!==null){let O=Math.max(0,W.start),D=Math.min(G.count,W.start+W.count);for(let R=O,B=D-1;R<B;R+=V){let z=G.getX(R),C=G.getX(R+1);if(H.fromBufferAttribute(E,z),q.fromBufferAttribute(E,C),QQ.distanceSqToSegment(H,q,F,U)>X)continue;F.applyMatrix4(this.matrixWorld);let A=J.ray.origin.distanceTo(F);if(A<J.near||A>J.far)continue;$.push({distance:A,point:U.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}else{let O=Math.max(0,W.start),D=Math.min(E.count,W.start+W.count);for(let R=O,B=D-1;R<B;R+=V){if(H.fromBufferAttribute(E,R),q.fromBufferAttribute(E,R+1),QQ.distanceSqToSegment(H,q,F,U)>X)continue;F.applyMatrix4(this.matrixWorld);let C=J.ray.origin.distanceTo(F);if(C<J.near||C>J.far)continue;$.push({distance:C,point:U.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Q.length;K<W;K++){let Y=Q[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}}var j6=new T,y6=new T;class WZ extends RK{constructor(J,$){super(J,$);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Z=[];for(let Q=0,K=$.count;Q<K;Q+=2)j6.fromBufferAttribute($,Q),y6.fromBufferAttribute($,Q+1),Z[Q]=Q===0?0:Z[Q-1],Z[Q+1]=Z[Q]+j6.distanceTo(y6);J.setAttribute("lineDistance",new $8(Z,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class AJ extends d9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new e0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var x6=new q8,VQ=new CJ,u$=new H7,d$=new T;class U7 extends E8{constructor(J=new F8,$=new AJ){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,$){let Z=this.geometry,Q=this.matrixWorld,K=J.params.Points.threshold,W=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(u$.copy(Z.boundingSphere),u$.applyMatrix4(Q),u$.radius+=K,J.ray.intersectsSphere(u$)===!1)return;x6.copy(Q).invert(),VQ.copy(J.ray).applyMatrix4(x6);let Y=K/((this.scale.x+this.scale.y+this.scale.z)/3),X=Y*Y,H=Z.index,U=Z.attributes.position;if(H!==null){let F=Math.max(0,W.start),V=Math.min(H.count,W.start+W.count);for(let G=F,N=V;G<N;G++){let E=H.getX(G);d$.fromBufferAttribute(U,E),b6(d$,E,X,Q,J,$,this)}}else{let F=Math.max(0,W.start),V=Math.min(U.count,W.start+W.count);for(let G=F,N=V;G<N;G++)d$.fromBufferAttribute(U,G),b6(d$,G,X,Q,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Q.length;K<W;K++){let Y=Q[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}}function b6(J,$,Z,Q,K,W,Y){let X=VQ.distanceSqToPoint(J);if(X<Z){let H=new T;VQ.closestPointToPoint(J,H),H.applyMatrix4(Q);let q=K.ray.origin.distanceTo(H);if(q<K.near||q>K.far)return;W.push({distance:q,distanceToRay:Math.sqrt(X),point:H,index:$,face:null,object:Y})}}class p9 extends t8{constructor(J,$,Z,Q,K,W,Y,X,H){super(J,$,Z,Q,K,W,Y,X,H);this.isCanvasTexture=!0,this.needsUpdate=!0}}class I9{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(J,$){let Z=this.getUtoTmapping(J);return this.getPoint(Z,$)}getPoints(J=5){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPoint(Z/J));return $}getSpacedPoints(J=5){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPointAt(Z/J));return $}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let $=[],Z,Q=this.getPoint(0),K=0;$.push(0);for(let W=1;W<=J;W++)Z=this.getPoint(W/J),K+=Z.distanceTo(Q),$.push(K),Q=Z;return this.cacheArcLengths=$,$}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,$){let Z=this.getLengths(),Q=0,K=Z.length,W;if($)W=$;else W=J*Z[K-1];let Y=0,X=K-1,H;while(Y<=X)if(Q=Math.floor(Y+(X-Y)/2),H=Z[Q]-W,H<0)Y=Q+1;else if(H>0)X=Q-1;else{X=Q;break}if(Q=X,Z[Q]===W)return Q/(K-1);let q=Z[Q],F=Z[Q+1]-q,V=(W-q)/F;return(Q+V)/(K-1)}getTangent(J,$){let Q=J-0.0001,K=J+0.0001;if(Q<0)Q=0;if(K>1)K=1;let W=this.getPoint(Q),Y=this.getPoint(K),X=$||(W.isVector2?new Y0:new T);return X.copy(Y).sub(W).normalize(),X}getTangentAt(J,$){let Z=this.getUtoTmapping(J);return this.getTangent(Z,$)}computeFrenetFrames(J,$){let Z=new T,Q=[],K=[],W=[],Y=new T,X=new q8;for(let V=0;V<=J;V++){let G=V/J;Q[V]=this.getTangentAt(G,new T)}K[0]=new T,W[0]=new T;let H=Number.MAX_VALUE,q=Math.abs(Q[0].x),U=Math.abs(Q[0].y),F=Math.abs(Q[0].z);if(q<=H)H=q,Z.set(1,0,0);if(U<=H)H=U,Z.set(0,1,0);if(F<=H)Z.set(0,0,1);Y.crossVectors(Q[0],Z).normalize(),K[0].crossVectors(Q[0],Y),W[0].crossVectors(Q[0],K[0]);for(let V=1;V<=J;V++){if(K[V]=K[V-1].clone(),W[V]=W[V-1].clone(),Y.crossVectors(Q[V-1],Q[V]),Y.length()>Number.EPSILON){Y.normalize();let G=Math.acos(h8(Q[V-1].dot(Q[V]),-1,1));K[V].applyMatrix4(X.makeRotationAxis(Y,G))}W[V].crossVectors(Q[V],K[V])}if($===!0){let V=Math.acos(h8(K[0].dot(K[J]),-1,1));if(V/=J,Q[0].dot(Y.crossVectors(K[0],K[J]))>0)V=-V;for(let G=1;G<=J;G++)K[G].applyMatrix4(X.makeRotationAxis(Q[G],V*G)),W[G].crossVectors(Q[G],K[G])}return{tangents:Q,normals:K,binormals:W}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class XZ extends I9{constructor(J=0,$=0,Z=1,Q=1,K=0,W=Math.PI*2,Y=!1,X=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=$,this.xRadius=Z,this.yRadius=Q,this.aStartAngle=K,this.aEndAngle=W,this.aClockwise=Y,this.aRotation=X}getPoint(J,$){let Z=$||new Y0,Q=Math.PI*2,K=this.aEndAngle-this.aStartAngle,W=Math.abs(K)<Number.EPSILON;while(K<0)K+=Q;while(K>Q)K-=Q;if(K<Number.EPSILON)if(W)K=0;else K=Q;if(this.aClockwise===!0&&!W)if(K===Q)K=-Q;else K=K-Q;let Y=this.aStartAngle+J*K,X=this.aX+this.xRadius*Math.cos(Y),H=this.aY+this.yRadius*Math.sin(Y);if(this.aRotation!==0){let q=Math.cos(this.aRotation),U=Math.sin(this.aRotation),F=X-this.aX,V=H-this.aY;X=F*q-V*U+this.aX,H=F*U+V*q+this.aY}return Z.set(X,H)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class BK extends XZ{constructor(J,$,Z,Q,K,W){super(J,$,Z,Z,Q,K,W);this.isArcCurve=!0,this.type="ArcCurve"}}function _Q(){let J=0,$=0,Z=0,Q=0;function K(W,Y,X,H){J=W,$=X,Z=-3*W+3*Y-2*X-H,Q=2*W-2*Y+X+H}return{initCatmullRom:function(W,Y,X,H,q){K(Y,X,q*(X-W),q*(H-Y))},initNonuniformCatmullRom:function(W,Y,X,H,q,U,F){let V=(Y-W)/q-(X-W)/(q+U)+(X-Y)/U,G=(X-Y)/U-(H-Y)/(U+F)+(H-X)/F;V*=U,G*=U,K(Y,X,V,G)},calc:function(W){let Y=W*W,X=Y*W;return J+$*W+Z*Y+Q*X}}}var p$=new T,KQ=new _Q,WQ=new _Q,XQ=new _Q;class F7 extends I9{constructor(J=[],$=!1,Z="centripetal",Q=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=$,this.curveType=Z,this.tension=Q}getPoint(J,$=new T){let Z=$,Q=this.points,K=Q.length,W=(K-(this.closed?0:1))*J,Y=Math.floor(W),X=W-Y;if(this.closed)Y+=Y>0?0:(Math.floor(Math.abs(Y)/K)+1)*K;else if(X===0&&Y===K-1)Y=K-2,X=1;let H,q;if(this.closed||Y>0)H=Q[(Y-1)%K];else p$.subVectors(Q[0],Q[1]).add(Q[0]),H=p$;let U=Q[Y%K],F=Q[(Y+1)%K];if(this.closed||Y+2<K)q=Q[(Y+2)%K];else p$.subVectors(Q[K-1],Q[K-2]).add(Q[K-1]),q=p$;if(this.curveType==="centripetal"||this.curveType==="chordal"){let V=this.curveType==="chordal"?0.5:0.25,G=Math.pow(H.distanceToSquared(U),V),N=Math.pow(U.distanceToSquared(F),V),E=Math.pow(F.distanceToSquared(q),V);if(N<0.0001)N=1;if(G<0.0001)G=N;if(E<0.0001)E=N;KQ.initNonuniformCatmullRom(H.x,U.x,F.x,q.x,G,N,E),WQ.initNonuniformCatmullRom(H.y,U.y,F.y,q.y,G,N,E),XQ.initNonuniformCatmullRom(H.z,U.z,F.z,q.z,G,N,E)}else if(this.curveType==="catmullrom")KQ.initCatmullRom(H.x,U.x,F.x,q.x,this.tension),WQ.initCatmullRom(H.y,U.y,F.y,q.y,this.tension),XQ.initCatmullRom(H.z,U.z,F.z,q.z,this.tension);return Z.set(KQ.calc(X),WQ.calc(X),XQ.calc(X)),Z}copy(J){super.copy(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(Q.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Z=this.points.length;$<Z;$++){let Q=this.points[$];J.points.push(Q.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(new T().fromArray(Q))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function f6(J,$,Z,Q,K){let W=(Q-$)*0.5,Y=(K-Z)*0.5,X=J*J,H=J*X;return(2*Z-2*Q+W+Y)*H+(-3*Z+3*Q-2*W-Y)*X+W*J+Z}function W4(J,$){let Z=1-J;return Z*Z*$}function X4(J,$){return 2*(1-J)*J*$}function Y4(J,$){return J*J*$}function v7(J,$,Z,Q){return W4(J,$)+X4(J,Z)+Y4(J,Q)}function H4(J,$){let Z=1-J;return Z*Z*Z*$}function q4(J,$){let Z=1-J;return 3*Z*Z*J*$}function U4(J,$){return 3*(1-J)*J*J*$}function F4(J,$){return J*J*J*$}function g7(J,$,Z,Q,K){return H4(J,$)+q4(J,Z)+U4(J,Q)+F4(J,K)}class TQ extends I9{constructor(J=new Y0,$=new Y0,Z=new Y0,Q=new Y0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=$,this.v2=Z,this.v3=Q}getPoint(J,$=new Y0){let Z=$,Q=this.v0,K=this.v1,W=this.v2,Y=this.v3;return Z.set(g7(J,Q.x,K.x,W.x,Y.x),g7(J,Q.y,K.y,W.y,Y.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class zK extends I9{constructor(J=new T,$=new T,Z=new T,Q=new T){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=$,this.v2=Z,this.v3=Q}getPoint(J,$=new T){let Z=$,Q=this.v0,K=this.v1,W=this.v2,Y=this.v3;return Z.set(g7(J,Q.x,K.x,W.x,Y.x),g7(J,Q.y,K.y,W.y,Y.y),g7(J,Q.z,K.z,W.z,Y.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class jQ extends I9{constructor(J=new Y0,$=new Y0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=$}getPoint(J,$=new Y0){let Z=$;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new Y0){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class IK extends I9{constructor(J=new T,$=new T){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=$}getPoint(J,$=new T){let Z=$;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new T){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class yQ extends I9{constructor(J=new Y0,$=new Y0,Z=new Y0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=$,this.v2=Z}getPoint(J,$=new Y0){let Z=$,Q=this.v0,K=this.v1,W=this.v2;return Z.set(v7(J,Q.x,K.x,W.x),v7(J,Q.y,K.y,W.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class xQ extends I9{constructor(J=new T,$=new T,Z=new T){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=$,this.v2=Z}getPoint(J,$=new T){let Z=$,Q=this.v0,K=this.v1,W=this.v2;return Z.set(v7(J,Q.x,K.x,W.x),v7(J,Q.y,K.y,W.y),v7(J,Q.z,K.z,W.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class bQ extends I9{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,$=new Y0){let Z=$,Q=this.points,K=(Q.length-1)*J,W=Math.floor(K),Y=K-W,X=Q[W===0?W:W-1],H=Q[W],q=Q[W>Q.length-2?Q.length-1:W+1],U=Q[W>Q.length-3?Q.length-1:W+2];return Z.set(f6(Y,X.x,H.x,q.x,U.x),f6(Y,X.y,H.y,q.y,U.y)),Z}copy(J){super.copy(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(Q.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Z=this.points.length;$<Z;$++){let Q=this.points[$];J.points.push(Q.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(new Y0().fromArray(Q))}return this}}var a$=Object.freeze({__proto__:null,ArcCurve:BK,CatmullRomCurve3:F7,CubicBezierCurve:TQ,CubicBezierCurve3:zK,EllipseCurve:XZ,LineCurve:jQ,LineCurve3:IK,QuadraticBezierCurve:yQ,QuadraticBezierCurve3:xQ,SplineCurve:bQ});class LK extends I9{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),$=this.curves[this.curves.length-1].getPoint(1);if(!J.equals($)){let Z=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new a$[Z]($,J))}return this}getPoint(J,$){let Z=J*this.getLength(),Q=this.getCurveLengths(),K=0;while(K<Q.length){if(Q[K]>=Z){let W=Q[K]-Z,Y=this.curves[K],X=Y.getLength(),H=X===0?0:1-W/X;return Y.getPointAt(H,$)}K++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],$=0;for(let Z=0,Q=this.curves.length;Z<Q;Z++)$+=this.curves[Z].getLength(),J.push($);return this.cacheLengths=J,J}getSpacedPoints(J=40){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPoint(Z/J));if(this.autoClose)$.push($[0]);return $}getPoints(J=12){let $=[],Z;for(let Q=0,K=this.curves;Q<K.length;Q++){let W=K[Q],Y=W.isEllipseCurve?J*2:W.isLineCurve||W.isLineCurve3?1:W.isSplineCurve?J*W.points.length:J,X=W.getPoints(Y);for(let H=0;H<X.length;H++){let q=X[H];if(Z&&Z.equals(q))continue;$.push(q),Z=q}}if(this.autoClose&&$.length>1&&!$[$.length-1].equals($[0]))$.push($[0]);return $}copy(J){super.copy(J),this.curves=[];for(let $=0,Z=J.curves.length;$<Z;$++){let Q=J.curves[$];this.curves.push(Q.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let $=0,Z=this.curves.length;$<Z;$++){let Q=this.curves[$];J.curves.push(Q.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let $=0,Z=J.curves.length;$<Z;$++){let Q=J.curves[$];this.curves.push(new a$[Q.type]().fromJSON(Q))}return this}}class GQ extends LK{constructor(J){super();if(this.type="Path",this.currentPoint=new Y0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let $=1,Z=J.length;$<Z;$++)this.lineTo(J[$].x,J[$].y);return this}moveTo(J,$){return this.currentPoint.set(J,$),this}lineTo(J,$){let Z=new jQ(this.currentPoint.clone(),new Y0(J,$));return this.curves.push(Z),this.currentPoint.set(J,$),this}quadraticCurveTo(J,$,Z,Q){let K=new yQ(this.currentPoint.clone(),new Y0(J,$),new Y0(Z,Q));return this.curves.push(K),this.currentPoint.set(Z,Q),this}bezierCurveTo(J,$,Z,Q,K,W){let Y=new TQ(this.currentPoint.clone(),new Y0(J,$),new Y0(Z,Q),new Y0(K,W));return this.curves.push(Y),this.currentPoint.set(K,W),this}splineThru(J){let $=[this.currentPoint.clone()].concat(J),Z=new bQ($);return this.curves.push(Z),this.currentPoint.copy(J[J.length-1]),this}arc(J,$,Z,Q,K,W){let Y=this.currentPoint.x,X=this.currentPoint.y;return this.absarc(J+Y,$+X,Z,Q,K,W),this}absarc(J,$,Z,Q,K,W){return this.absellipse(J,$,Z,Z,Q,K,W),this}ellipse(J,$,Z,Q,K,W,Y,X){let H=this.currentPoint.x,q=this.currentPoint.y;return this.absellipse(J+H,$+q,Z,Q,K,W,Y,X),this}absellipse(J,$,Z,Q,K,W,Y,X){let H=new XZ(J,$,Z,Q,K,W,Y,X);if(this.curves.length>0){let U=H.getPoint(0);if(!U.equals(this.currentPoint))this.lineTo(U.x,U.y)}this.curves.push(H);let q=H.getPoint(1);return this.currentPoint.copy(q),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class n7 extends F8{constructor(J=1,$=32,Z=0,Q=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:$,thetaStart:Z,thetaLength:Q},$=Math.max(3,$);let K=[],W=[],Y=[],X=[],H=new T,q=new Y0;W.push(0,0,0),Y.push(0,0,1),X.push(0.5,0.5);for(let U=0,F=3;U<=$;U++,F+=3){let V=Z+U/$*Q;H.x=J*Math.cos(V),H.y=J*Math.sin(V),W.push(H.x,H.y,H.z),Y.push(0,0,1),q.x=(W[F]/J+1)/2,q.y=(W[F+1]/J+1)/2,X.push(q.x,q.y)}for(let U=1;U<=$;U++)K.push(U,U+1,0);this.setIndex(K),this.setAttribute("position",new $8(W,3)),this.setAttribute("normal",new $8(Y,3)),this.setAttribute("uv",new $8(X,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new n7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class S0 extends F8{constructor(J=1,$=1,Z=1,Q=32,K=1,W=!1,Y=0,X=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:$,height:Z,radialSegments:Q,heightSegments:K,openEnded:W,thetaStart:Y,thetaLength:X};let H=this;Q=Math.floor(Q),K=Math.floor(K);let q=[],U=[],F=[],V=[],G=0,N=[],E=Z/2,O=0;if(D(),W===!1){if(J>0)R(!0);if($>0)R(!1)}this.setIndex(q),this.setAttribute("position",new $8(U,3)),this.setAttribute("normal",new $8(F,3)),this.setAttribute("uv",new $8(V,2));function D(){let B=new T,z=new T,C=0,L=($-J)/Z;for(let A=0;A<=K;A++){let _=[],I=A/K,k=I*($-J)+J;for(let b=0;b<=Q;b++){let n=b/Q,r=n*X+Y,y=Math.sin(r),h=Math.cos(r);z.x=k*y,z.y=-I*Z+E,z.z=k*h,U.push(z.x,z.y,z.z),B.set(y,L,h).normalize(),F.push(B.x,B.y,B.z),V.push(n,1-I),_.push(G++)}N.push(_)}for(let A=0;A<Q;A++)for(let _=0;_<K;_++){let I=N[_][A],k=N[_+1][A],b=N[_+1][A+1],n=N[_][A+1];q.push(I,k,n),q.push(k,b,n),C+=6}H.addGroup(O,C,0),O+=C}function R(B){let z=G,C=new Y0,L=new T,A=0,_=B===!0?J:$,I=B===!0?1:-1;for(let b=1;b<=Q;b++)U.push(0,E*I,0),F.push(0,I,0),V.push(0.5,0.5),G++;let k=G;for(let b=0;b<=Q;b++){let r=b/Q*X+Y,y=Math.cos(r),h=Math.sin(r);L.x=_*h,L.y=E*I,L.z=_*y,U.push(L.x,L.y,L.z),F.push(0,I,0),C.x=y*0.5+0.5,C.y=h*0.5*I+0.5,V.push(C.x,C.y),G++}for(let b=0;b<Q;b++){let n=z+b,r=k+b;if(B===!0)q.push(r,r+1,n);else q.push(r+1,r,n);A+=3}H.addGroup(O,A,B===!0?1:2),O+=A}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new S0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class V8 extends S0{constructor(J=1,$=1,Z=32,Q=1,K=!1,W=0,Y=Math.PI*2){super(0,J,$,Z,Q,K,W,Y);this.type="ConeGeometry",this.parameters={radius:J,height:$,radialSegments:Z,heightSegments:Q,openEnded:K,thetaStart:W,thetaLength:Y}}static fromJSON(J){return new V8(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class fQ extends F8{constructor(J=[],$=[],Z=1,Q=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:$,radius:Z,detail:Q};let K=[],W=[];if(Y(Q),H(Z),q(),this.setAttribute("position",new $8(K,3)),this.setAttribute("normal",new $8(K.slice(),3)),this.setAttribute("uv",new $8(W,2)),Q===0)this.computeVertexNormals();else this.normalizeNormals();function Y(D){let R=new T,B=new T,z=new T;for(let C=0;C<$.length;C+=3)V($[C+0],R),V($[C+1],B),V($[C+2],z),X(R,B,z,D)}function X(D,R,B,z){let C=z+1,L=[];for(let A=0;A<=C;A++){L[A]=[];let _=D.clone().lerp(B,A/C),I=R.clone().lerp(B,A/C),k=C-A;for(let b=0;b<=k;b++)if(b===0&&A===C)L[A][b]=_;else L[A][b]=_.clone().lerp(I,b/k)}for(let A=0;A<C;A++)for(let _=0;_<2*(C-A)-1;_++){let I=Math.floor(_/2);if(_%2===0)F(L[A][I+1]),F(L[A+1][I]),F(L[A][I]);else F(L[A][I+1]),F(L[A+1][I+1]),F(L[A+1][I])}}function H(D){let R=new T;for(let B=0;B<K.length;B+=3)R.x=K[B+0],R.y=K[B+1],R.z=K[B+2],R.normalize().multiplyScalar(D),K[B+0]=R.x,K[B+1]=R.y,K[B+2]=R.z}function q(){let D=new T;for(let R=0;R<K.length;R+=3){D.x=K[R+0],D.y=K[R+1],D.z=K[R+2];let B=E(D)/2/Math.PI+0.5,z=O(D)/Math.PI+0.5;W.push(B,1-z)}G(),U()}function U(){for(let D=0;D<W.length;D+=6){let R=W[D+0],B=W[D+2],z=W[D+4],C=Math.max(R,B,z),L=Math.min(R,B,z);if(C>0.9&&L<0.1){if(R<0.2)W[D+0]+=1;if(B<0.2)W[D+2]+=1;if(z<0.2)W[D+4]+=1}}}function F(D){K.push(D.x,D.y,D.z)}function V(D,R){let B=D*3;R.x=J[B+0],R.y=J[B+1],R.z=J[B+2]}function G(){let D=new T,R=new T,B=new T,z=new T,C=new Y0,L=new Y0,A=new Y0;for(let _=0,I=0;_<K.length;_+=9,I+=6){D.set(K[_+0],K[_+1],K[_+2]),R.set(K[_+3],K[_+4],K[_+5]),B.set(K[_+6],K[_+7],K[_+8]),C.set(W[I+0],W[I+1]),L.set(W[I+2],W[I+3]),A.set(W[I+4],W[I+5]),z.copy(D).add(R).add(B).divideScalar(3);let k=E(z);N(C,I+0,D,k),N(L,I+2,R,k),N(A,I+4,B,k)}}function N(D,R,B,z){if(z<0&&D.x===1)W[R]=D.x-1;if(B.x===0&&B.z===0)W[R]=z/2/Math.PI+0.5}function E(D){return Math.atan2(D.z,-D.x)}function O(D){return Math.atan2(-D.y,Math.sqrt(D.x*D.x+D.z*D.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new fQ(J.vertices,J.indices,J.radius,J.details)}}class j8 extends fQ{constructor(J=1,$=0){let Z=(1+Math.sqrt(5))/2,Q=1/Z,K=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-Q,-Z,0,-Q,Z,0,Q,-Z,0,Q,Z,-Q,-Z,0,-Q,Z,0,Q,-Z,0,Q,Z,0,-Z,0,-Q,Z,0,-Q,-Z,0,Q,Z,0,Q],W=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(K,W,J,$);this.type="DodecahedronGeometry",this.parameters={radius:J,detail:$}}static fromJSON(J){return new j8(J.radius,J.detail)}}class YZ extends GQ{constructor(J){super(J);this.uuid=P9(),this.type="Shape",this.holes=[]}getPointsHoles(J){let $=[];for(let Z=0,Q=this.holes.length;Z<Q;Z++)$[Z]=this.holes[Z].getPoints(J);return $}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let $=0,Z=J.holes.length;$<Z;$++){let Q=J.holes[$];this.holes.push(Q.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let $=0,Z=this.holes.length;$<Z;$++){let Q=this.holes[$];J.holes.push(Q.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let $=0,Z=J.holes.length;$<Z;$++){let Q=J.holes[$];this.holes.push(new GQ().fromJSON(Q))}return this}}var V4={triangulate:function(J,$,Z=2){let Q=$&&$.length,K=Q?$[0]*Z:J.length,W=CK(J,0,K,Z,!0),Y=[];if(!W||W.next===W.prev)return Y;let X,H,q,U,F,V,G;if(Q)W=N4(J,$,W,Z);if(J.length>80*Z){X=q=J[0],H=U=J[1];for(let N=Z;N<K;N+=Z){if(F=J[N],V=J[N+1],F<X)X=F;if(V<H)H=V;if(F>q)q=F;if(V>U)U=V}G=Math.max(q-X,U-H),G=G!==0?32767/G:0}return u7(W,Y,Z,X,H,G,0),Y}};function CK(J,$,Z,Q,K){let W,Y;if(K===S4(J,$,Z,Q)>0)for(W=$;W<Z;W+=Q)Y=h6(W,J[W],J[W+1],Y);else for(W=Z-Q;W>=$;W-=Q)Y=h6(W,J[W],J[W+1],Y);if(Y&&HZ(Y,Y.next))p7(Y),Y=Y.next;return Y}function zJ(J,$){if(!J)return J;if(!$)$=J;let Z=J,Q;do if(Q=!1,!Z.steiner&&(HZ(Z,Z.next)||B8(Z.prev,Z,Z.next)===0)){if(p7(Z),Z=$=Z.prev,Z===Z.next)break;Q=!0}else Z=Z.next;while(Q||Z!==$);return $}function u7(J,$,Z,Q,K,W,Y){if(!J)return;if(!Y&&W)L4(J,Q,K,W);let X=J,H,q;while(J.prev!==J.next){if(H=J.prev,q=J.next,W?O4(J,Q,K,W):G4(J)){$.push(H.i/Z|0),$.push(J.i/Z|0),$.push(q.i/Z|0),p7(J),J=q.next,X=q.next;continue}if(J=q,J===X){if(!Y)u7(zJ(J),$,Z,Q,K,W,1);else if(Y===1)J=D4(zJ(J),$,Z),u7(J,$,Z,Q,K,W,2);else if(Y===2)E4(J,$,Z,Q,K,W);break}}}function G4(J){let $=J.prev,Z=J,Q=J.next;if(B8($,Z,Q)>=0)return!1;let K=$.x,W=Z.x,Y=Q.x,X=$.y,H=Z.y,q=Q.y,U=K<W?K<Y?K:Y:W<Y?W:Y,F=X<H?X<q?X:q:H<q?H:q,V=K>W?K>Y?K:Y:W>Y?W:Y,G=X>H?X>q?X:q:H>q?H:q,N=Q.next;while(N!==$){if(N.x>=U&&N.x<=V&&N.y>=F&&N.y<=G&&Z7(K,X,W,H,Y,q,N.x,N.y)&&B8(N.prev,N,N.next)>=0)return!1;N=N.next}return!0}function O4(J,$,Z,Q){let K=J.prev,W=J,Y=J.next;if(B8(K,W,Y)>=0)return!1;let X=K.x,H=W.x,q=Y.x,U=K.y,F=W.y,V=Y.y,G=X<H?X<q?X:q:H<q?H:q,N=U<F?U<V?U:V:F<V?F:V,E=X>H?X>q?X:q:H>q?H:q,O=U>F?U>V?U:V:F>V?F:V,D=OQ(G,N,$,Z,Q),R=OQ(E,O,$,Z,Q),B=J.prevZ,z=J.nextZ;while(B&&B.z>=D&&z&&z.z<=R){if(B.x>=G&&B.x<=E&&B.y>=N&&B.y<=O&&B!==K&&B!==Y&&Z7(X,U,H,F,q,V,B.x,B.y)&&B8(B.prev,B,B.next)>=0)return!1;if(B=B.prevZ,z.x>=G&&z.x<=E&&z.y>=N&&z.y<=O&&z!==K&&z!==Y&&Z7(X,U,H,F,q,V,z.x,z.y)&&B8(z.prev,z,z.next)>=0)return!1;z=z.nextZ}while(B&&B.z>=D){if(B.x>=G&&B.x<=E&&B.y>=N&&B.y<=O&&B!==K&&B!==Y&&Z7(X,U,H,F,q,V,B.x,B.y)&&B8(B.prev,B,B.next)>=0)return!1;B=B.prevZ}while(z&&z.z<=R){if(z.x>=G&&z.x<=E&&z.y>=N&&z.y<=O&&z!==K&&z!==Y&&Z7(X,U,H,F,q,V,z.x,z.y)&&B8(z.prev,z,z.next)>=0)return!1;z=z.nextZ}return!0}function D4(J,$,Z){let Q=J;do{let K=Q.prev,W=Q.next.next;if(!HZ(K,W)&&AK(K,Q,Q.next,W)&&d7(K,W)&&d7(W,K))$.push(K.i/Z|0),$.push(Q.i/Z|0),$.push(W.i/Z|0),p7(Q),p7(Q.next),Q=J=W;Q=Q.next}while(Q!==J);return zJ(Q)}function E4(J,$,Z,Q,K,W){let Y=J;do{let X=Y.next.next;while(X!==Y.prev){if(Y.i!==X.i&&M4(Y,X)){let H=MK(Y,X);Y=zJ(Y,Y.next),H=zJ(H,H.next),u7(Y,$,Z,Q,K,W,0),u7(H,$,Z,Q,K,W,0);return}X=X.next}Y=Y.next}while(Y!==J)}function N4(J,$,Z,Q){let K=[],W,Y,X,H,q;for(W=0,Y=$.length;W<Y;W++){if(X=$[W]*Q,H=W<Y-1?$[W+1]*Q:J.length,q=CK(J,X,H,Q,!1),q===q.next)q.steiner=!0;K.push(A4(q))}K.sort(R4);for(W=0;W<K.length;W++)Z=B4(K[W],Z);return Z}function R4(J,$){return J.x-$.x}function B4(J,$){let Z=z4(J,$);if(!Z)return $;let Q=MK(Z,J);return zJ(Q,Q.next),zJ(Z,Z.next)}function z4(J,$){let Z=$,Q=-1/0,K,W=J.x,Y=J.y;do{if(Y<=Z.y&&Y>=Z.next.y&&Z.next.y!==Z.y){let V=Z.x+(Y-Z.y)*(Z.next.x-Z.x)/(Z.next.y-Z.y);if(V<=W&&V>Q){if(Q=V,K=Z.x<Z.next.x?Z:Z.next,V===W)return K}}Z=Z.next}while(Z!==$);if(!K)return null;let X=K,H=K.x,q=K.y,U=1/0,F;Z=K;do{if(W>=Z.x&&Z.x>=H&&W!==Z.x&&Z7(Y<q?W:Q,Y,H,q,Y<q?Q:W,Y,Z.x,Z.y)){if(F=Math.abs(Y-Z.y)/(W-Z.x),d7(Z,J)&&(F<U||F===U&&(Z.x>K.x||Z.x===K.x&&I4(K,Z))))K=Z,U=F}Z=Z.next}while(Z!==X);return K}function I4(J,$){return B8(J.prev,J,$.prev)<0&&B8($.next,J,J.next)<0}function L4(J,$,Z,Q){let K=J;do{if(K.z===0)K.z=OQ(K.x,K.y,$,Z,Q);K.prevZ=K.prev,K.nextZ=K.next,K=K.next}while(K!==J);K.prevZ.nextZ=null,K.prevZ=null,C4(K)}function C4(J){let $,Z,Q,K,W,Y,X,H,q=1;do{Z=J,J=null,W=null,Y=0;while(Z){Y++,Q=Z,X=0;for($=0;$<q;$++)if(X++,Q=Q.nextZ,!Q)break;H=q;while(X>0||H>0&&Q){if(X!==0&&(H===0||!Q||Z.z<=Q.z))K=Z,Z=Z.nextZ,X--;else K=Q,Q=Q.nextZ,H--;if(W)W.nextZ=K;else J=K;K.prevZ=W,W=K}Z=Q}W.nextZ=null,q*=2}while(Y>1);return J}function OQ(J,$,Z,Q,K){return J=(J-Z)*K|0,$=($-Q)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,$=($|$<<8)&16711935,$=($|$<<4)&252645135,$=($|$<<2)&858993459,$=($|$<<1)&1431655765,J|$<<1}function A4(J){let $=J,Z=J;do{if($.x<Z.x||$.x===Z.x&&$.y<Z.y)Z=$;$=$.next}while($!==J);return Z}function Z7(J,$,Z,Q,K,W,Y,X){return(K-Y)*($-X)>=(J-Y)*(W-X)&&(J-Y)*(Q-X)>=(Z-Y)*($-X)&&(Z-Y)*(W-X)>=(K-Y)*(Q-X)}function M4(J,$){return J.next.i!==$.i&&J.prev.i!==$.i&&!k4(J,$)&&(d7(J,$)&&d7($,J)&&P4(J,$)&&(B8(J.prev,J,$.prev)||B8(J,$.prev,$))||HZ(J,$)&&B8(J.prev,J,J.next)>0&&B8($.prev,$,$.next)>0)}function B8(J,$,Z){return($.y-J.y)*(Z.x-$.x)-($.x-J.x)*(Z.y-$.y)}function HZ(J,$){return J.x===$.x&&J.y===$.y}function AK(J,$,Z,Q){let K=c$(B8(J,$,Z)),W=c$(B8(J,$,Q)),Y=c$(B8(Z,Q,J)),X=c$(B8(Z,Q,$));if(K!==W&&Y!==X)return!0;if(K===0&&l$(J,Z,$))return!0;if(W===0&&l$(J,Q,$))return!0;if(Y===0&&l$(Z,J,Q))return!0;if(X===0&&l$(Z,$,Q))return!0;return!1}function l$(J,$,Z){return $.x<=Math.max(J.x,Z.x)&&$.x>=Math.min(J.x,Z.x)&&$.y<=Math.max(J.y,Z.y)&&$.y>=Math.min(J.y,Z.y)}function c$(J){return J>0?1:J<0?-1:0}function k4(J,$){let Z=J;do{if(Z.i!==J.i&&Z.next.i!==J.i&&Z.i!==$.i&&Z.next.i!==$.i&&AK(Z,Z.next,J,$))return!0;Z=Z.next}while(Z!==J);return!1}function d7(J,$){return B8(J.prev,J,J.next)<0?B8(J,$,J.next)>=0&&B8(J,J.prev,$)>=0:B8(J,$,J.prev)<0||B8(J,J.next,$)<0}function P4(J,$){let Z=J,Q=!1,K=(J.x+$.x)/2,W=(J.y+$.y)/2;do{if(Z.y>W!==Z.next.y>W&&Z.next.y!==Z.y&&K<(Z.next.x-Z.x)*(W-Z.y)/(Z.next.y-Z.y)+Z.x)Q=!Q;Z=Z.next}while(Z!==J);return Q}function MK(J,$){let Z=new DQ(J.i,J.x,J.y),Q=new DQ($.i,$.x,$.y),K=J.next,W=$.prev;return J.next=$,$.prev=J,Z.next=K,K.prev=Z,Q.next=Z,Z.prev=Q,W.next=Q,Q.prev=W,Q}function h6(J,$,Z,Q){let K=new DQ(J,$,Z);if(!Q)K.prev=K,K.next=K;else K.next=Q.next,K.prev=Q,Q.next.prev=K,Q.next=K;return K}function p7(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function DQ(J,$,Z){this.i=J,this.x=$,this.y=Z,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function S4(J,$,Z,Q){let K=0;for(let W=$,Y=Z-Q;W<Z;W+=Q)K+=(J[Y]-J[W])*(J[W+1]+J[Y+1]),Y=W;return K}class m7{static area(J){let $=J.length,Z=0;for(let Q=$-1,K=0;K<$;Q=K++)Z+=J[Q].x*J[K].y-J[K].x*J[Q].y;return Z*0.5}static isClockWise(J){return m7.area(J)<0}static triangulateShape(J,$){let Z=[],Q=[],K=[];v6(J),g6(Z,J);let W=J.length;$.forEach(v6);for(let X=0;X<$.length;X++)Q.push(W),W+=$[X].length,g6(Z,$[X]);let Y=V4.triangulate(Z,Q);for(let X=0;X<Y.length;X+=3)K.push(Y.slice(X,X+3));return K}}function v6(J){let $=J.length;if($>2&&J[$-1].equals(J[0]))J.pop()}function g6(J,$){for(let Z=0;Z<$.length;Z++)J.push($[Z].x),J.push($[Z].y)}class s7 extends F8{constructor(J=new YZ([new Y0(0.5,0.5),new Y0(-0.5,0.5),new Y0(-0.5,-0.5),new Y0(0.5,-0.5)]),$={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:$},J=Array.isArray(J)?J:[J];let Z=this,Q=[],K=[];for(let Y=0,X=J.length;Y<X;Y++){let H=J[Y];W(H)}this.setAttribute("position",new $8(Q,3)),this.setAttribute("uv",new $8(K,2)),this.computeVertexNormals();function W(Y){let X=[],H=$.curveSegments!==void 0?$.curveSegments:12,q=$.steps!==void 0?$.steps:1,U=$.depth!==void 0?$.depth:1,F=$.bevelEnabled!==void 0?$.bevelEnabled:!0,V=$.bevelThickness!==void 0?$.bevelThickness:0.2,G=$.bevelSize!==void 0?$.bevelSize:V-0.1,N=$.bevelOffset!==void 0?$.bevelOffset:0,E=$.bevelSegments!==void 0?$.bevelSegments:3,O=$.extrudePath,D=$.UVGenerator!==void 0?$.UVGenerator:w4,R,B=!1,z,C,L,A;if(O)R=O.getSpacedPoints(q),B=!0,F=!1,z=O.computeFrenetFrames(q,!1),C=new T,L=new T,A=new T;if(!F)E=0,V=0,G=0,N=0;let _=Y.extractPoints(H),I=_.shape,k=_.holes;if(!m7.isClockWise(I)){I=I.reverse();for(let x=0,O0=k.length;x<O0;x++){let W0=k[x];if(m7.isClockWise(W0))k[x]=W0.reverse()}}let n=m7.triangulateShape(I,k),r=I;for(let x=0,O0=k.length;x<O0;x++){let W0=k[x];I=I.concat(W0)}function y(x,O0,W0){if(!O0)console.error("THREE.ExtrudeGeometry: vec does not exist");return x.clone().addScaledVector(O0,W0)}let h=I.length,m=n.length;function i(x,O0,W0){let K0,Q0,z0,E0=x.x-O0.x,P0=x.y-O0.y,S=W0.x-x.x,M=W0.y-x.y,l=E0*E0+P0*P0,q0=E0*M-P0*S;if(Math.abs(q0)>Number.EPSILON){let Z0=Math.sqrt(l),U0=Math.sqrt(S*S+M*M),y0=O0.x-P0/Z0,F0=O0.y+E0/Z0,A0=W0.x-M/U0,T0=W0.y+S/U0,h0=((A0-y0)*M-(T0-F0)*S)/(E0*M-P0*S);K0=y0+E0*h0-x.x,Q0=F0+P0*h0-x.y;let X0=K0*K0+Q0*Q0;if(X0<=2)return new Y0(K0,Q0);else z0=Math.sqrt(X0/2)}else{let Z0=!1;if(E0>Number.EPSILON){if(S>Number.EPSILON)Z0=!0}else if(E0<-Number.EPSILON){if(S<-Number.EPSILON)Z0=!0}else if(Math.sign(P0)===Math.sign(M))Z0=!0;if(Z0)K0=-P0,Q0=E0,z0=Math.sqrt(l);else K0=E0,Q0=P0,z0=Math.sqrt(l/2)}return new Y0(K0/z0,Q0/z0)}let d=[];for(let x=0,O0=r.length,W0=O0-1,K0=x+1;x<O0;x++,W0++,K0++){if(W0===O0)W0=0;if(K0===O0)K0=0;d[x]=i(r[x],r[W0],r[K0])}let g=[],p,t=d.concat();for(let x=0,O0=k.length;x<O0;x++){let W0=k[x];p=[];for(let K0=0,Q0=W0.length,z0=Q0-1,E0=K0+1;K0<Q0;K0++,z0++,E0++){if(z0===Q0)z0=0;if(E0===Q0)E0=0;p[K0]=i(W0[K0],W0[z0],W0[E0])}g.push(p),t=t.concat(p)}for(let x=0;x<E;x++){let O0=x/E,W0=V*Math.cos(O0*Math.PI/2),K0=G*Math.sin(O0*Math.PI/2)+N;for(let Q0=0,z0=r.length;Q0<z0;Q0++){let E0=y(r[Q0],d[Q0],K0);R0(E0.x,E0.y,-W0)}for(let Q0=0,z0=k.length;Q0<z0;Q0++){let E0=k[Q0];p=g[Q0];for(let P0=0,S=E0.length;P0<S;P0++){let M=y(E0[P0],p[P0],K0);R0(M.x,M.y,-W0)}}}let v=G+N;for(let x=0;x<h;x++){let O0=F?y(I[x],t[x],v):I[x];if(!B)R0(O0.x,O0.y,0);else L.copy(z.normals[0]).multiplyScalar(O0.x),C.copy(z.binormals[0]).multiplyScalar(O0.y),A.copy(R[0]).add(L).add(C),R0(A.x,A.y,A.z)}for(let x=1;x<=q;x++)for(let O0=0;O0<h;O0++){let W0=F?y(I[O0],t[O0],v):I[O0];if(!B)R0(W0.x,W0.y,U/q*x);else L.copy(z.normals[x]).multiplyScalar(W0.x),C.copy(z.binormals[x]).multiplyScalar(W0.y),A.copy(R[x]).add(L).add(C),R0(A.x,A.y,A.z)}for(let x=E-1;x>=0;x--){let O0=x/E,W0=V*Math.cos(O0*Math.PI/2),K0=G*Math.sin(O0*Math.PI/2)+N;for(let Q0=0,z0=r.length;Q0<z0;Q0++){let E0=y(r[Q0],d[Q0],K0);R0(E0.x,E0.y,U+W0)}for(let Q0=0,z0=k.length;Q0<z0;Q0++){let E0=k[Q0];p=g[Q0];for(let P0=0,S=E0.length;P0<S;P0++){let M=y(E0[P0],p[P0],K0);if(!B)R0(M.x,M.y,U+W0);else R0(M.x,M.y+R[q-1].y,R[q-1].x+W0)}}}e(),H0();function e(){let x=Q.length/3;if(F){let O0=0,W0=h*O0;for(let K0=0;K0<m;K0++){let Q0=n[K0];x0(Q0[2]+W0,Q0[1]+W0,Q0[0]+W0)}O0=q+E*2,W0=h*O0;for(let K0=0;K0<m;K0++){let Q0=n[K0];x0(Q0[0]+W0,Q0[1]+W0,Q0[2]+W0)}}else{for(let O0=0;O0<m;O0++){let W0=n[O0];x0(W0[2],W0[1],W0[0])}for(let O0=0;O0<m;O0++){let W0=n[O0];x0(W0[0]+h*q,W0[1]+h*q,W0[2]+h*q)}}Z.addGroup(x,Q.length/3-x,0)}function H0(){let x=Q.length/3,O0=0;V0(r,O0),O0+=r.length;for(let W0=0,K0=k.length;W0<K0;W0++){let Q0=k[W0];V0(Q0,O0),O0+=Q0.length}Z.addGroup(x,Q.length/3-x,1)}function V0(x,O0){let W0=x.length;while(--W0>=0){let K0=W0,Q0=W0-1;if(Q0<0)Q0=x.length-1;for(let z0=0,E0=q+E*2;z0<E0;z0++){let P0=h*z0,S=h*(z0+1),M=O0+K0+P0,l=O0+Q0+P0,q0=O0+Q0+S,Z0=O0+K0+S;u0(M,l,q0,Z0)}}}function R0(x,O0,W0){X.push(x),X.push(O0),X.push(W0)}function x0(x,O0,W0){_0(x),_0(O0),_0(W0);let K0=Q.length/3,Q0=D.generateTopUV(Z,Q,K0-3,K0-2,K0-1);f0(Q0[0]),f0(Q0[1]),f0(Q0[2])}function u0(x,O0,W0,K0){_0(x),_0(O0),_0(K0),_0(O0),_0(W0),_0(K0);let Q0=Q.length/3,z0=D.generateSideWallUV(Z,Q,Q0-6,Q0-3,Q0-2,Q0-1);f0(z0[0]),f0(z0[1]),f0(z0[3]),f0(z0[1]),f0(z0[2]),f0(z0[3])}function _0(x){Q.push(X[x*3+0]),Q.push(X[x*3+1]),Q.push(X[x*3+2])}function f0(x){K.push(x.x),K.push(x.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),$=this.parameters.shapes,Z=this.parameters.options;return _4($,Z,J)}static fromJSON(J,$){let Z=[];for(let K=0,W=J.shapes.length;K<W;K++){let Y=$[J.shapes[K]];Z.push(Y)}let Q=J.options.extrudePath;if(Q!==void 0)J.options.extrudePath=new a$[Q.type]().fromJSON(Q);return new s7(Z,J.options)}}var w4={generateTopUV:function(J,$,Z,Q,K){let W=$[Z*3],Y=$[Z*3+1],X=$[Q*3],H=$[Q*3+1],q=$[K*3],U=$[K*3+1];return[new Y0(W,Y),new Y0(X,H),new Y0(q,U)]},generateSideWallUV:function(J,$,Z,Q,K,W){let Y=$[Z*3],X=$[Z*3+1],H=$[Z*3+2],q=$[Q*3],U=$[Q*3+1],F=$[Q*3+2],V=$[K*3],G=$[K*3+1],N=$[K*3+2],E=$[W*3],O=$[W*3+1],D=$[W*3+2];if(Math.abs(X-U)<Math.abs(Y-q))return[new Y0(Y,1-H),new Y0(q,1-F),new Y0(V,1-N),new Y0(E,1-D)];else return[new Y0(X,1-H),new Y0(U,1-F),new Y0(G,1-N),new Y0(O,1-D)]}};function _4(J,$,Z){if(Z.shapes=[],Array.isArray(J))for(let Q=0,K=J.length;Q<K;Q++){let W=J[Q];Z.shapes.push(W.uuid)}else Z.shapes.push(J.uuid);if(Z.options=Object.assign({},$),$.extrudePath!==void 0)Z.options.extrudePath=$.extrudePath.toJSON();return Z}class i7 extends F8{constructor(J=0.5,$=1,Z=32,Q=1,K=0,W=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:$,thetaSegments:Z,phiSegments:Q,thetaStart:K,thetaLength:W},Z=Math.max(3,Z),Q=Math.max(1,Q);let Y=[],X=[],H=[],q=[],U=J,F=($-J)/Q,V=new T,G=new Y0;for(let N=0;N<=Q;N++){for(let E=0;E<=Z;E++){let O=K+E/Z*W;V.x=U*Math.cos(O),V.y=U*Math.sin(O),X.push(V.x,V.y,V.z),H.push(0,0,1),G.x=(V.x/$+1)/2,G.y=(V.y/$+1)/2,q.push(G.x,G.y)}U+=F}for(let N=0;N<Q;N++){let E=N*(Z+1);for(let O=0;O<Z;O++){let D=O+E,R=D,B=D+Z+1,z=D+Z+2,C=D+1;Y.push(R,B,C),Y.push(B,z,C)}}this.setIndex(Y),this.setAttribute("position",new $8(X,3)),this.setAttribute("normal",new $8(H,3)),this.setAttribute("uv",new $8(q,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new i7(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class G8 extends F8{constructor(J=1,$=32,Z=16,Q=0,K=Math.PI*2,W=0,Y=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:$,heightSegments:Z,phiStart:Q,phiLength:K,thetaStart:W,thetaLength:Y},$=Math.max(3,Math.floor($)),Z=Math.max(2,Math.floor(Z));let X=Math.min(W+Y,Math.PI),H=0,q=[],U=new T,F=new T,V=[],G=[],N=[],E=[];for(let O=0;O<=Z;O++){let D=[],R=O/Z,B=0;if(O===0&&W===0)B=0.5/$;else if(O===Z&&X===Math.PI)B=-0.5/$;for(let z=0;z<=$;z++){let C=z/$;U.x=-J*Math.cos(Q+C*K)*Math.sin(W+R*Y),U.y=J*Math.cos(W+R*Y),U.z=J*Math.sin(Q+C*K)*Math.sin(W+R*Y),G.push(U.x,U.y,U.z),F.copy(U).normalize(),N.push(F.x,F.y,F.z),E.push(C+B,1-R),D.push(H++)}q.push(D)}for(let O=0;O<Z;O++)for(let D=0;D<$;D++){let R=q[O][D+1],B=q[O][D],z=q[O+1][D],C=q[O+1][D+1];if(O!==0||W>0)V.push(R,B,C);if(O!==Z-1||X<Math.PI)V.push(B,z,C)}this.setIndex(V),this.setAttribute("position",new $8(G,3)),this.setAttribute("normal",new $8(N,3)),this.setAttribute("uv",new $8(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new G8(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class l9 extends F8{constructor(J=1,$=0.4,Z=12,Q=48,K=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:$,radialSegments:Z,tubularSegments:Q,arc:K},Z=Math.floor(Z),Q=Math.floor(Q);let W=[],Y=[],X=[],H=[],q=new T,U=new T,F=new T;for(let V=0;V<=Z;V++)for(let G=0;G<=Q;G++){let N=G/Q*K,E=V/Z*Math.PI*2;U.x=(J+$*Math.cos(E))*Math.cos(N),U.y=(J+$*Math.cos(E))*Math.sin(N),U.z=$*Math.sin(E),Y.push(U.x,U.y,U.z),q.x=J*Math.cos(N),q.y=J*Math.sin(N),F.subVectors(U,q).normalize(),X.push(F.x,F.y,F.z),H.push(G/Q),H.push(V/Z)}for(let V=1;V<=Z;V++)for(let G=1;G<=Q;G++){let N=(Q+1)*V+G-1,E=(Q+1)*(V-1)+G-1,O=(Q+1)*(V-1)+G,D=(Q+1)*V+G;W.push(N,E,D),W.push(E,O,D)}this.setIndex(W),this.setAttribute("position",new $8(Y,3)),this.setAttribute("normal",new $8(X,3)),this.setAttribute("uv",new $8(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new l9(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc)}}class o7 extends F8{constructor(J=new xQ(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),$=64,Z=1,Q=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:$,radius:Z,radialSegments:Q,closed:K};let W=J.computeFrenetFrames($,K);this.tangents=W.tangents,this.normals=W.normals,this.binormals=W.binormals;let Y=new T,X=new T,H=new Y0,q=new T,U=[],F=[],V=[],G=[];N(),this.setIndex(G),this.setAttribute("position",new $8(U,3)),this.setAttribute("normal",new $8(F,3)),this.setAttribute("uv",new $8(V,2));function N(){for(let R=0;R<$;R++)E(R);E(K===!1?$:0),D(),O()}function E(R){q=J.getPointAt(R/$,q);let B=W.normals[R],z=W.binormals[R];for(let C=0;C<=Q;C++){let L=C/Q*Math.PI*2,A=Math.sin(L),_=-Math.cos(L);X.x=_*B.x+A*z.x,X.y=_*B.y+A*z.y,X.z=_*B.z+A*z.z,X.normalize(),F.push(X.x,X.y,X.z),Y.x=q.x+Z*X.x,Y.y=q.y+Z*X.y,Y.z=q.z+Z*X.z,U.push(Y.x,Y.y,Y.z)}}function O(){for(let R=1;R<=$;R++)for(let B=1;B<=Q;B++){let z=(Q+1)*(R-1)+(B-1),C=(Q+1)*R+(B-1),L=(Q+1)*R+B,A=(Q+1)*(R-1)+B;G.push(z,C,A),G.push(C,L,A)}}function D(){for(let R=0;R<=$;R++)for(let B=0;B<=Q;B++)H.x=R/$,H.y=B/Q,V.push(H.x,H.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new o7(new a$[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class c extends d9{constructor(J){super();this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new e0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new e0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Y0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}function n$(J,$,Z){if(!J||!Z&&J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}function T4(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}class r7{constructor(J,$,Z,Q){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Q!==void 0?Q:new $.constructor(Z),this.sampleValues=$,this.valueSize=Z,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Z=this._cachedIndex,Q=$[Z],K=$[Z-1];Z:{J:{let W;$:{Q:if(!(J<Q)){for(let Y=Z+2;;){if(Q===void 0){if(J<K)break Q;return Z=$.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}if(Z===Y)break;if(K=Q,Q=$[++Z],J<Q)break J}W=$.length;break $}if(!(J>=K)){let Y=$[1];if(J<Y)Z=2,K=Y;for(let X=Z-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===X)break;if(Q=K,K=$[--Z-1],J>=K)break J}W=Z,Z=0;break $}break Z}while(Z<W){let Y=Z+W>>>1;if(J<$[Y])W=Y;else Z=Y+1}if(Q=$[Z],K=$[Z-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===void 0)return Z=$.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}this._cachedIndex=Z,this.intervalChanged_(Z,K,Q)}return this.interpolate_(Z,K,J,Q)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Z=this.sampleValues,Q=this.valueSize,K=J*Q;for(let W=0;W!==Q;++W)$[W]=Z[K+W];return $}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class kK extends r7{constructor(J,$,Z,Q){super(J,$,Z,Q);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Z){let Q=this.parameterPositions,K=J-2,W=J+1,Y=Q[K],X=Q[W];if(Y===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,Y=2*$-Z;break;case 2402:K=Q.length-2,Y=$+Q[K]-Q[K+1];break;default:K=J,Y=Z}if(X===void 0)switch(this.getSettings_().endingEnd){case 2401:W=J,X=2*Z-$;break;case 2402:W=1,X=Z+Q[1]-Q[0];break;default:W=J-1,X=$}let H=(Z-$)*0.5,q=this.valueSize;this._weightPrev=H/($-Y),this._weightNext=H/(X-Z),this._offsetPrev=K*q,this._offsetNext=W*q}interpolate_(J,$,Z,Q){let K=this.resultBuffer,W=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,q=this._offsetPrev,U=this._offsetNext,F=this._weightPrev,V=this._weightNext,G=(Z-$)/(Q-$),N=G*G,E=N*G,O=-F*E+2*F*N-F*G,D=(1+F)*E+(-1.5-2*F)*N+(-0.5+F)*G+1,R=(-1-V)*E+(1.5+V)*N+0.5*G,B=V*E-V*N;for(let z=0;z!==Y;++z)K[z]=O*W[q+z]+D*W[H+z]+R*W[X+z]+B*W[U+z];return K}}class PK extends r7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J,$,Z,Q){let K=this.resultBuffer,W=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,q=(Z-$)/(Q-$),U=1-q;for(let F=0;F!==Y;++F)K[F]=W[H+F]*U+W[X+F]*q;return K}}class SK extends r7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J){return this.copySampleValue_(J-1)}}class w9{constructor(J,$,Z,Q){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=n$($,this.TimeBufferType),this.values=n$(Z,this.ValueBufferType),this.setInterpolation(Q||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Z;if($.toJSON!==this.toJSON)Z=$.toJSON(J);else{Z={name:J.name,times:n$(J.times,Array),values:n$(J.values,Array)};let Q=J.getInterpolation();if(Q!==J.DefaultInterpolation)Z.interpolation=Q}return Z.type=J.ValueTypeName,Z}InterpolantFactoryMethodDiscrete(J){return new SK(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new PK(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new kK(this.times,this.values,this.getValueSize(),J)}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break}if($===void 0){let Z="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Z);return console.warn("THREE.KeyframeTrack:",Z),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Z=0,Q=$.length;Z!==Q;++Z)$[Z]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Z=0,Q=$.length;Z!==Q;++Z)$[Z]*=J}return this}trim(J,$){let Z=this.times,Q=Z.length,K=0,W=Q-1;while(K!==Q&&Z[K]<J)++K;while(W!==-1&&Z[W]>$)--W;if(++W,K!==0||W!==Q){if(K>=W)W=Math.max(W,1),K=W-1;let Y=this.getValueSize();this.times=Z.slice(K,W),this.values=this.values.slice(K*Y,W*Y)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),J=!1;let Z=this.times,Q=this.values,K=Z.length;if(K===0)console.error("THREE.KeyframeTrack: Track is empty.",this),J=!1;let W=null;for(let Y=0;Y!==K;Y++){let X=Z[Y];if(typeof X==="number"&&isNaN(X)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,Y,X),J=!1;break}if(W!==null&&W>X){console.error("THREE.KeyframeTrack: Out of order keys.",this,Y,X,W),J=!1;break}W=X}if(Q!==void 0){if(T4(Q))for(let Y=0,X=Q.length;Y!==X;++Y){let H=Q[Y];if(isNaN(H)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,Y,H),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Z=this.getValueSize(),Q=this.getInterpolation()===2302,K=J.length-1,W=1;for(let Y=1;Y<K;++Y){let X=!1,H=J[Y],q=J[Y+1];if(H!==q&&(Y!==1||H!==J[0]))if(!Q){let U=Y*Z,F=U-Z,V=U+Z;for(let G=0;G!==Z;++G){let N=$[U+G];if(N!==$[F+G]||N!==$[V+G]){X=!0;break}}}else X=!0;if(X){if(Y!==W){J[W]=J[Y];let U=Y*Z,F=W*Z;for(let V=0;V!==Z;++V)$[F+V]=$[U+V]}++W}}if(K>0){J[W]=J[K];for(let Y=K*Z,X=W*Z,H=0;H!==Z;++H)$[X+H]=$[Y+H];++W}if(W!==J.length)this.times=J.slice(0,W),this.values=$.slice(0,W*Z);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),Q=new this.constructor(this.name,J,$);return Q.createInterpolant=this.createInterpolant,Q}}w9.prototype.TimeBufferType=Float32Array;w9.prototype.ValueBufferType=Float32Array;w9.prototype.DefaultInterpolation=2301;class V7 extends w9{}V7.prototype.ValueTypeName="bool";V7.prototype.ValueBufferType=Array;V7.prototype.DefaultInterpolation=2300;V7.prototype.InterpolantFactoryMethodLinear=void 0;V7.prototype.InterpolantFactoryMethodSmooth=void 0;class wK extends w9{}wK.prototype.ValueTypeName="color";class _K extends w9{}_K.prototype.ValueTypeName="number";class TK extends r7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J,$,Z,Q){let K=this.resultBuffer,W=this.sampleValues,Y=this.valueSize,X=(Z-$)/(Q-$),H=J*Y;for(let q=H+Y;H!==q;H+=4)S9.slerpFlat(K,0,W,H-Y,W,H,X);return K}}class qZ extends w9{InterpolantFactoryMethodLinear(J){return new TK(this.times,this.values,this.getValueSize(),J)}}qZ.prototype.ValueTypeName="quaternion";qZ.prototype.DefaultInterpolation=2301;qZ.prototype.InterpolantFactoryMethodSmooth=void 0;class G7 extends w9{}G7.prototype.ValueTypeName="string";G7.prototype.ValueBufferType=Array;G7.prototype.DefaultInterpolation=2300;G7.prototype.InterpolantFactoryMethodLinear=void 0;G7.prototype.InterpolantFactoryMethodSmooth=void 0;class jK extends w9{}jK.prototype.ValueTypeName="vector";class yK{constructor(J,$,Z){let Q=this,K=!1,W=0,Y=0,X=void 0,H=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Z,this.itemStart=function(q){if(Y++,K===!1){if(Q.onStart!==void 0)Q.onStart(q,W,Y)}K=!0},this.itemEnd=function(q){if(W++,Q.onProgress!==void 0)Q.onProgress(q,W,Y);if(W===Y){if(K=!1,Q.onLoad!==void 0)Q.onLoad()}},this.itemError=function(q){if(Q.onError!==void 0)Q.onError(q)},this.resolveURL=function(q){if(X)return X(q);return q},this.setURLModifier=function(q){return X=q,this},this.addHandler=function(q,U){return H.push(q,U),this},this.removeHandler=function(q){let U=H.indexOf(q);if(U!==-1)H.splice(U,2);return this},this.getHandler=function(q){for(let U=0,F=H.length;U<F;U+=2){let V=H[U],G=H[U+1];if(V.global)V.lastIndex=0;if(V.test(q))return G}return null}}}var j4=new yK;class xK{constructor(J){this.manager=J!==void 0?J:j4,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(J,$){let Z=this;return new Promise(function(Q,K){Z.load(J,Q,$,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}}xK.DEFAULT_MATERIAL_NAME="__DEFAULT";class O7 extends E8{constructor(J,$=1){super();this.isLight=!0,this.type="Light",this.color=new e0(J),this.intensity=$}dispose(){}copy(J,$){return super.copy(J,$),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let $=super.toJSON(J);if($.object.color=this.color.getHex(),$.object.intensity=this.intensity,this.groundColor!==void 0)$.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)$.object.distance=this.distance;if(this.angle!==void 0)$.object.angle=this.angle;if(this.decay!==void 0)$.object.decay=this.decay;if(this.penumbra!==void 0)$.object.penumbra=this.penumbra;if(this.shadow!==void 0)$.object.shadow=this.shadow.toJSON();return $}}class hQ extends O7{constructor(J,$,Z){super(J,Z);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(E8.DEFAULT_UP),this.updateMatrix(),this.groundColor=new e0($)}copy(J,$){return super.copy(J,$),this.groundColor.copy(J.groundColor),this}}var YQ=new q8,m6=new T,u6=new T;class UZ{constructor(J){this.camera=J,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Y0(512,512),this.map=null,this.mapPass=null,this.matrix=new q8,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $Z,this._frameExtents=new Y0(1,1),this._viewportCount=1,this._viewports=[new D8(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let $=this.camera,Z=this.matrix;m6.setFromMatrixPosition(J.matrixWorld),$.position.copy(m6),u6.setFromMatrixPosition(J.target.matrixWorld),$.lookAt(u6),$.updateMatrixWorld(),YQ.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),this._frustum.setFromProjectionMatrix(YQ),Z.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),Z.multiply(YQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.bias=J.bias,this.radius=J.radius,this.mapSize.copy(J.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}class bK extends UZ{constructor(){super(new l8(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(J){let $=this.camera,Z=K7*2*J.angle*this.focus,Q=this.mapSize.width/this.mapSize.height,K=J.distance||$.far;if(Z!==$.fov||Q!==$.aspect||K!==$.far)$.fov=Z,$.aspect=Q,$.far=K,$.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this}}class vQ extends O7{constructor(J,$,Z=0,Q=Math.PI/3,K=0,W=2){super(J,$);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(E8.DEFAULT_UP),this.updateMatrix(),this.target=new E8,this.distance=Z,this.angle=Q,this.penumbra=K,this.decay=W,this.map=null,this.shadow=new bK}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}var d6=new q8,y7=new T,HQ=new T;class fK extends UZ{constructor(){super(new l8(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new Y0(4,2),this._viewportCount=6,this._viewports=[new D8(2,1,1,1),new D8(0,1,1,1),new D8(3,1,1,1),new D8(1,1,1,1),new D8(3,0,1,1),new D8(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(J,$=0){let Z=this.camera,Q=this.matrix,K=J.distance||Z.far;if(K!==Z.far)Z.far=K,Z.updateProjectionMatrix();y7.setFromMatrixPosition(J.matrixWorld),Z.position.copy(y7),HQ.copy(Z.position),HQ.add(this._cubeDirections[$]),Z.up.copy(this._cubeUps[$]),Z.lookAt(HQ),Z.updateMatrixWorld(),Q.makeTranslation(-y7.x,-y7.y,-y7.z),d6.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),this._frustum.setFromProjectionMatrix(d6)}}class y8 extends O7{constructor(J,$,Z=0,Q=2){super(J,$);this.isPointLight=!0,this.type="PointLight",this.distance=Z,this.decay=Q,this.shadow=new fK}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}}class hK extends UZ{constructor(){super(new MQ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class a7 extends O7{constructor(J,$){super(J,$);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(E8.DEFAULT_UP),this.updateMatrix(),this.target=new E8,this.shadow=new hK}dispose(){this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}class gQ extends O7{constructor(J,$){super(J,$);this.isAmbientLight=!0,this.type="AmbientLight"}}var mQ="\\[\\]\\.:\\/",y4=new RegExp("["+mQ+"]","g"),uQ="[^"+mQ+"]",x4="[^"+mQ.replace("\\.","")+"]",b4=/((?:WC+[\/:])*)/.source.replace("WC",uQ),f4=/(WCOD+)?/.source.replace("WCOD",x4),h4=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uQ),v4=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uQ),g4=new RegExp("^"+b4+f4+h4+v4+"$"),m4=["material","materials","bones","map"];class vK{constructor(J,$,Z){let Q=Z||K8.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,Q)}getValue(J,$){this.bind();let Z=this._targetGroup.nCachedObjects_,Q=this._bindings[Z];if(Q!==void 0)Q.getValue(J,$)}setValue(J,$){let Z=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,K=Z.length;Q!==K;++Q)Z[Q].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Z=J.length;$!==Z;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Z=J.length;$!==Z;++$)J[$].unbind()}}class K8{constructor(J,$,Z){this.path=$,this.parsedPath=Z||K8.parseTrackName($),this.node=K8.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Z){if(!(J&&J.isAnimationObjectGroup))return new K8(J,$,Z);else return new K8.Composite(J,$,Z)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(y4,"")}static parseTrackName(J){let $=g4.exec(J);if($===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let Z={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},Q=Z.nodeName&&Z.nodeName.lastIndexOf(".");if(Q!==void 0&&Q!==-1){let K=Z.nodeName.substring(Q+1);if(m4.indexOf(K)!==-1)Z.nodeName=Z.nodeName.substring(0,Q),Z.objectName=K}if(Z.propertyName===null||Z.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return Z}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Z=J.skeleton.getBoneByName($);if(Z!==void 0)return Z}if(J.children){let Z=function(K){for(let W=0;W<K.length;W++){let Y=K[W];if(Y.name===$||Y.uuid===$)return Y;let X=Z(Y.children);if(X)return X}return null},Q=Z(J.children);if(Q)return Q}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Z=this.resolvedProperty;for(let Q=0,K=Z.length;Q!==K;++Q)J[$++]=Z[Q]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Z=this.resolvedProperty;for(let Q=0,K=Z.length;Q!==K;++Q)Z[Q]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Z=this.resolvedProperty;for(let Q=0,K=Z.length;Q!==K;++Q)Z[Q]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Z=this.resolvedProperty;for(let Q=0,K=Z.length;Q!==K;++Q)Z[Q]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Z=$.objectName,Q=$.propertyName,K=$.propertyIndex;if(!J)J=K8.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(Z){let H=$.objectIndex;switch(Z){case"materials":if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let q=0;q<J.length;q++)if(J[q].name===H){H=q;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Z]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Z]}if(H!==void 0){if(J[H]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[H]}}let W=J[Q];if(W===void 0){let H=$.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+H+"."+Q+" but it wasn't found.",J);return}let Y=this.Versioning.None;if(this.targetObject=J,J.needsUpdate!==void 0)Y=this.Versioning.NeedsUpdate;else if(J.matrixWorldNeedsUpdate!==void 0)Y=this.Versioning.MatrixWorldNeedsUpdate;let X=this.BindingType.Direct;if(K!==void 0){if(Q==="morphTargetInfluences"){if(!J.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}X=this.BindingType.ArrayElement,this.resolvedProperty=W,this.propertyIndex=K}else if(W.fromArray!==void 0&&W.toArray!==void 0)X=this.BindingType.HasFromToArray,this.resolvedProperty=W;else if(Array.isArray(W))X=this.BindingType.EntireArray,this.resolvedProperty=W;else this.propertyName=Q;this.getValue=this.GetterByBindingType[X],this.setValue=this.SetterByBindingTypeAndVersioning[X][Y]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}K8.Composite=vK;K8.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};K8.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};K8.prototype.GetterByBindingType=[K8.prototype._getValue_direct,K8.prototype._getValue_array,K8.prototype._getValue_arrayElement,K8.prototype._getValue_toArray];K8.prototype.SetterByBindingTypeAndVersioning=[[K8.prototype._setValue_direct,K8.prototype._setValue_direct_setNeedsUpdate,K8.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[K8.prototype._setValue_array,K8.prototype._setValue_array_setNeedsUpdate,K8.prototype._setValue_array_setMatrixWorldNeedsUpdate],[K8.prototype._setValue_arrayElement,K8.prototype._setValue_arrayElement_setNeedsUpdate,K8.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[K8.prototype._setValue_fromArray,K8.prototype._setValue_fromArray_setNeedsUpdate,K8.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _F=new Float32Array(1);class dQ{constructor(J,$,Z=0,Q=1/0){this.ray=new CJ(J,$),this.near=Z,this.far=Q,this.camera=null,this.layers=new JZ,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,$){this.ray.set(J,$)}setFromCamera(J,$){if($.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition($.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject($).sub(this.ray.origin).normalize(),this.camera=$;else if($.isOrthographicCamera)this.ray.origin.set(J.x,J.y,($.near+$.far)/($.near-$.far)).unproject($),this.ray.direction.set(0,0,-1).transformDirection($.matrixWorld),this.camera=$;else console.error("THREE.Raycaster: Unsupported camera type: "+$.type)}intersectObject(J,$=!0,Z=[]){return EQ(J,this,Z,$),Z.sort(p6),Z}intersectObjects(J,$=!0,Z=[]){for(let Q=0,K=J.length;Q<K;Q++)EQ(J[Q],this,Z,$);return Z.sort(p6),Z}}function p6(J,$){return J.distance-$.distance}function EQ(J,$,Z,Q){if(J.layers.test($.layers))J.raycast($,Z);if(Q===!0){let K=J.children;for(let W=0,Y=K.length;W<Y;W++)EQ(K[W],$,Z,!0)}}class FZ{constructor(J=1,$=0,Z=0){return this.radius=J,this.phi=$,this.theta=Z,this}set(J,$,Z){return this.radius=J,this.phi=$,this.theta=Z,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=Math.max(0.000001,Math.min(Math.PI-0.000001,this.phi)),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,$,Z){if(this.radius=Math.sqrt(J*J+$*$+Z*Z),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,Z),this.phi=Math.acos(h8($/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="160";var gK={type:"change"},pQ={type:"start"},mK={type:"end"},VZ=new CJ,uK=new A9,d4=Math.cos(70*t$.DEG2RAD);class lQ extends u9{constructor(J,$){super();this.object=J,this.domElement=$,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:IJ.ROTATE,MIDDLE:IJ.DOLLY,RIGHT:IJ.PAN},this.touches={ONE:LJ.ROTATE,TWO:LJ.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return Y.phi},this.getAzimuthalAngle=function(){return Y.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(j){j.addEventListener("keydown",A0),this._domElementKeyEvents=j},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",A0),this._domElementKeyEvents=null},this.saveState=function(){Z.target0.copy(Z.target),Z.position0.copy(Z.object.position),Z.zoom0=Z.object.zoom},this.reset=function(){Z.target.copy(Z.target0),Z.object.position.copy(Z.position0),Z.object.zoom=Z.zoom0,Z.object.updateProjectionMatrix(),Z.dispatchEvent(gK),Z.update(),K=Q.NONE},this.update=function(){let j=new T,$0=new S9().setFromUnitVectors(J.up,new T(0,1,0)),D0=$0.clone().invert(),C0=new T,p0=new S9,G0=new T,f=2*Math.PI;return function(L0=null){let g0=Z.object.position;if(j.copy(g0).sub(Z.target),j.applyQuaternion($0),Y.setFromVector3(j),Z.autoRotate&&K===Q.NONE)b(I(L0));if(Z.enableDamping)Y.theta+=X.theta*Z.dampingFactor,Y.phi+=X.phi*Z.dampingFactor;else Y.theta+=X.theta,Y.phi+=X.phi;let{minAzimuthAngle:j0,maxAzimuthAngle:a0}=Z;if(isFinite(j0)&&isFinite(a0)){if(j0<-Math.PI)j0+=f;else if(j0>Math.PI)j0-=f;if(a0<-Math.PI)a0+=f;else if(a0>Math.PI)a0-=f;if(j0<=a0)Y.theta=Math.max(j0,Math.min(a0,Y.theta));else Y.theta=Y.theta>(j0+a0)/2?Math.max(j0,Y.theta):Math.min(a0,Y.theta)}if(Y.phi=Math.max(Z.minPolarAngle,Math.min(Z.maxPolarAngle,Y.phi)),Y.makeSafe(),Z.enableDamping===!0)Z.target.addScaledVector(q,Z.dampingFactor);else Z.target.add(q);if(Z.target.sub(Z.cursor),Z.target.clampLength(Z.minTargetRadius,Z.maxTargetRadius),Z.target.add(Z.cursor),Z.zoomToCursor&&C||Z.object.isOrthographicCamera)Y.radius=g(Y.radius);else Y.radius=g(Y.radius*H);if(j.setFromSpherical(Y),j.applyQuaternion(D0),g0.copy(Z.target).add(j),Z.object.lookAt(Z.target),Z.enableDamping===!0)X.theta*=1-Z.dampingFactor,X.phi*=1-Z.dampingFactor,q.multiplyScalar(1-Z.dampingFactor);else X.set(0,0,0),q.set(0,0,0);let Z8=!1;if(Z.zoomToCursor&&C){let U8=null;if(Z.object.isPerspectiveCamera){let k8=j.length();U8=g(k8*H);let t0=k8-U8;Z.object.position.addScaledVector(B,t0),Z.object.updateMatrixWorld()}else if(Z.object.isOrthographicCamera){let k8=new T(z.x,z.y,0);k8.unproject(Z.object),Z.object.zoom=Math.max(Z.minZoom,Math.min(Z.maxZoom,Z.object.zoom/H)),Z.object.updateProjectionMatrix(),Z8=!0;let t0=new T(z.x,z.y,0);t0.unproject(Z.object),Z.object.position.sub(t0).add(k8),Z.object.updateMatrixWorld(),U8=j.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),Z.zoomToCursor=!1;if(U8!==null)if(this.screenSpacePanning)Z.target.set(0,0,-1).transformDirection(Z.object.matrix).multiplyScalar(U8).add(Z.object.position);else if(VZ.origin.copy(Z.object.position),VZ.direction.set(0,0,-1).transformDirection(Z.object.matrix),Math.abs(Z.object.up.dot(VZ.direction))<d4)J.lookAt(Z.target);else uK.setFromNormalAndCoplanarPoint(Z.object.up,Z.target),VZ.intersectPlane(uK,Z.target)}else if(Z.object.isOrthographicCamera)Z.object.zoom=Math.max(Z.minZoom,Math.min(Z.maxZoom,Z.object.zoom/H)),Z.object.updateProjectionMatrix(),Z8=!0;if(H=1,C=!1,Z8||C0.distanceToSquared(Z.object.position)>W||8*(1-p0.dot(Z.object.quaternion))>W||G0.distanceToSquared(Z.target)>0)return Z.dispatchEvent(gK),C0.copy(Z.object.position),p0.copy(Z.object.quaternion),G0.copy(Z.target),!0;return!1}}(),this.dispose=function(){if(Z.domElement.removeEventListener("contextmenu",X0),Z.domElement.removeEventListener("pointerdown",P0),Z.domElement.removeEventListener("pointercancel",M),Z.domElement.removeEventListener("wheel",Z0),Z.domElement.removeEventListener("pointermove",S),Z.domElement.removeEventListener("pointerup",M),Z._domElementKeyEvents!==null)Z._domElementKeyEvents.removeEventListener("keydown",A0),Z._domElementKeyEvents=null};let Z=this,Q={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},K=Q.NONE,W=0.000001,Y=new FZ,X=new FZ,H=1,q=new T,U=new Y0,F=new Y0,V=new Y0,G=new Y0,N=new Y0,E=new Y0,O=new Y0,D=new Y0,R=new Y0,B=new T,z=new Y0,C=!1,L=[],A={},_=!1;function I(j){if(j!==null)return 2*Math.PI/60*Z.autoRotateSpeed*j;else return 2*Math.PI/60/60*Z.autoRotateSpeed}function k(j){let $0=Math.abs(j*0.01);return Math.pow(0.95,Z.zoomSpeed*$0)}function b(j){X.theta-=j}function n(j){X.phi-=j}let r=function(){let j=new T;return function(D0,C0){j.setFromMatrixColumn(C0,0),j.multiplyScalar(-D0),q.add(j)}}(),y=function(){let j=new T;return function(D0,C0){if(Z.screenSpacePanning===!0)j.setFromMatrixColumn(C0,1);else j.setFromMatrixColumn(C0,0),j.crossVectors(Z.object.up,j);j.multiplyScalar(D0),q.add(j)}}(),h=function(){let j=new T;return function(D0,C0){let p0=Z.domElement;if(Z.object.isPerspectiveCamera){let G0=Z.object.position;j.copy(G0).sub(Z.target);let f=j.length();f*=Math.tan(Z.object.fov/2*Math.PI/180),r(2*D0*f/p0.clientHeight,Z.object.matrix),y(2*C0*f/p0.clientHeight,Z.object.matrix)}else if(Z.object.isOrthographicCamera)r(D0*(Z.object.right-Z.object.left)/Z.object.zoom/p0.clientWidth,Z.object.matrix),y(C0*(Z.object.top-Z.object.bottom)/Z.object.zoom/p0.clientHeight,Z.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),Z.enablePan=!1}}();function m(j){if(Z.object.isPerspectiveCamera||Z.object.isOrthographicCamera)H/=j;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Z.enableZoom=!1}function i(j){if(Z.object.isPerspectiveCamera||Z.object.isOrthographicCamera)H*=j;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Z.enableZoom=!1}function d(j,$0){if(!Z.zoomToCursor)return;C=!0;let D0=Z.domElement.getBoundingClientRect(),C0=j-D0.left,p0=$0-D0.top,G0=D0.width,f=D0.height;z.x=C0/G0*2-1,z.y=-(p0/f)*2+1,B.set(z.x,z.y,1).unproject(Z.object).sub(Z.object.position).normalize()}function g(j){return Math.max(Z.minDistance,Math.min(Z.maxDistance,j))}function p(j){U.set(j.clientX,j.clientY)}function t(j){d(j.clientX,j.clientX),O.set(j.clientX,j.clientY)}function v(j){G.set(j.clientX,j.clientY)}function e(j){F.set(j.clientX,j.clientY),V.subVectors(F,U).multiplyScalar(Z.rotateSpeed);let $0=Z.domElement;b(2*Math.PI*V.x/$0.clientHeight),n(2*Math.PI*V.y/$0.clientHeight),U.copy(F),Z.update()}function H0(j){if(D.set(j.clientX,j.clientY),R.subVectors(D,O),R.y>0)m(k(R.y));else if(R.y<0)i(k(R.y));O.copy(D),Z.update()}function V0(j){N.set(j.clientX,j.clientY),E.subVectors(N,G).multiplyScalar(Z.panSpeed),h(E.x,E.y),G.copy(N),Z.update()}function R0(j){if(d(j.clientX,j.clientY),j.deltaY<0)i(k(j.deltaY));else if(j.deltaY>0)m(k(j.deltaY));Z.update()}function x0(j){let $0=!1;switch(j.code){case Z.keys.UP:if(j.ctrlKey||j.metaKey||j.shiftKey)n(2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else h(0,Z.keyPanSpeed);$0=!0;break;case Z.keys.BOTTOM:if(j.ctrlKey||j.metaKey||j.shiftKey)n(-2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else h(0,-Z.keyPanSpeed);$0=!0;break;case Z.keys.LEFT:if(j.ctrlKey||j.metaKey||j.shiftKey)b(2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else h(Z.keyPanSpeed,0);$0=!0;break;case Z.keys.RIGHT:if(j.ctrlKey||j.metaKey||j.shiftKey)b(-2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else h(-Z.keyPanSpeed,0);$0=!0;break}if($0)j.preventDefault(),Z.update()}function u0(j){if(L.length===1)U.set(j.pageX,j.pageY);else{let $0=M0(j),D0=0.5*(j.pageX+$0.x),C0=0.5*(j.pageY+$0.y);U.set(D0,C0)}}function _0(j){if(L.length===1)G.set(j.pageX,j.pageY);else{let $0=M0(j),D0=0.5*(j.pageX+$0.x),C0=0.5*(j.pageY+$0.y);G.set(D0,C0)}}function f0(j){let $0=M0(j),D0=j.pageX-$0.x,C0=j.pageY-$0.y,p0=Math.sqrt(D0*D0+C0*C0);O.set(0,p0)}function x(j){if(Z.enableZoom)f0(j);if(Z.enablePan)_0(j)}function O0(j){if(Z.enableZoom)f0(j);if(Z.enableRotate)u0(j)}function W0(j){if(L.length==1)F.set(j.pageX,j.pageY);else{let D0=M0(j),C0=0.5*(j.pageX+D0.x),p0=0.5*(j.pageY+D0.y);F.set(C0,p0)}V.subVectors(F,U).multiplyScalar(Z.rotateSpeed);let $0=Z.domElement;b(2*Math.PI*V.x/$0.clientHeight),n(2*Math.PI*V.y/$0.clientHeight),U.copy(F)}function K0(j){if(L.length===1)N.set(j.pageX,j.pageY);else{let $0=M0(j),D0=0.5*(j.pageX+$0.x),C0=0.5*(j.pageY+$0.y);N.set(D0,C0)}E.subVectors(N,G).multiplyScalar(Z.panSpeed),h(E.x,E.y),G.copy(N)}function Q0(j){let $0=M0(j),D0=j.pageX-$0.x,C0=j.pageY-$0.y,p0=Math.sqrt(D0*D0+C0*C0);D.set(0,p0),R.set(0,Math.pow(D.y/O.y,Z.zoomSpeed)),m(R.y),O.copy(D);let G0=(j.pageX+$0.x)*0.5,f=(j.pageY+$0.y)*0.5;d(G0,f)}function z0(j){if(Z.enableZoom)Q0(j);if(Z.enablePan)K0(j)}function E0(j){if(Z.enableZoom)Q0(j);if(Z.enableRotate)W0(j)}function P0(j){if(Z.enabled===!1)return;if(L.length===0)Z.domElement.setPointerCapture(j.pointerId),Z.domElement.addEventListener("pointermove",S),Z.domElement.addEventListener("pointerup",M);if(O8(j),j.pointerType==="touch")T0(j);else l(j)}function S(j){if(Z.enabled===!1)return;if(j.pointerType==="touch")h0(j);else q0(j)}function M(j){if(l0(j),L.length===0)Z.domElement.releasePointerCapture(j.pointerId),Z.domElement.removeEventListener("pointermove",S),Z.domElement.removeEventListener("pointerup",M);Z.dispatchEvent(mK),K=Q.NONE}function l(j){let $0;switch(j.button){case 0:$0=Z.mouseButtons.LEFT;break;case 1:$0=Z.mouseButtons.MIDDLE;break;case 2:$0=Z.mouseButtons.RIGHT;break;default:$0=-1}switch($0){case IJ.DOLLY:if(Z.enableZoom===!1)return;t(j),K=Q.DOLLY;break;case IJ.ROTATE:if(j.ctrlKey||j.metaKey||j.shiftKey){if(Z.enablePan===!1)return;v(j),K=Q.PAN}else{if(Z.enableRotate===!1)return;p(j),K=Q.ROTATE}break;case IJ.PAN:if(j.ctrlKey||j.metaKey||j.shiftKey){if(Z.enableRotate===!1)return;p(j),K=Q.ROTATE}else{if(Z.enablePan===!1)return;v(j),K=Q.PAN}break;default:K=Q.NONE}if(K!==Q.NONE)Z.dispatchEvent(pQ)}function q0(j){switch(K){case Q.ROTATE:if(Z.enableRotate===!1)return;e(j);break;case Q.DOLLY:if(Z.enableZoom===!1)return;H0(j);break;case Q.PAN:if(Z.enablePan===!1)return;V0(j);break}}function Z0(j){if(Z.enabled===!1||Z.enableZoom===!1||K!==Q.NONE)return;j.preventDefault(),Z.dispatchEvent(pQ),R0(U0(j)),Z.dispatchEvent(mK)}function U0(j){let $0=j.deltaMode,D0={clientX:j.clientX,clientY:j.clientY,deltaY:j.deltaY};switch($0){case 1:D0.deltaY*=16;break;case 2:D0.deltaY*=100;break}if(j.ctrlKey&&!_)D0.deltaY*=10;return D0}function y0(j){if(j.key==="Control")_=!0,document.addEventListener("keyup",F0,{passive:!0,capture:!0})}function F0(j){if(j.key==="Control")_=!1,document.removeEventListener("keyup",F0,{passive:!0,capture:!0})}function A0(j){if(Z.enabled===!1||Z.enablePan===!1)return;x0(j)}function T0(j){switch(v0(j),L.length){case 1:switch(Z.touches.ONE){case LJ.ROTATE:if(Z.enableRotate===!1)return;u0(j),K=Q.TOUCH_ROTATE;break;case LJ.PAN:if(Z.enablePan===!1)return;_0(j),K=Q.TOUCH_PAN;break;default:K=Q.NONE}break;case 2:switch(Z.touches.TWO){case LJ.DOLLY_PAN:if(Z.enableZoom===!1&&Z.enablePan===!1)return;x(j),K=Q.TOUCH_DOLLY_PAN;break;case LJ.DOLLY_ROTATE:if(Z.enableZoom===!1&&Z.enableRotate===!1)return;O0(j),K=Q.TOUCH_DOLLY_ROTATE;break;default:K=Q.NONE}break;default:K=Q.NONE}if(K!==Q.NONE)Z.dispatchEvent(pQ)}function h0(j){switch(v0(j),K){case Q.TOUCH_ROTATE:if(Z.enableRotate===!1)return;W0(j),Z.update();break;case Q.TOUCH_PAN:if(Z.enablePan===!1)return;K0(j),Z.update();break;case Q.TOUCH_DOLLY_PAN:if(Z.enableZoom===!1&&Z.enablePan===!1)return;z0(j),Z.update();break;case Q.TOUCH_DOLLY_ROTATE:if(Z.enableZoom===!1&&Z.enableRotate===!1)return;E0(j),Z.update();break;default:K=Q.NONE}}function X0(j){if(Z.enabled===!1)return;j.preventDefault()}function O8(j){L.push(j.pointerId)}function l0(j){delete A[j.pointerId];for(let $0=0;$0<L.length;$0++)if(L[$0]==j.pointerId){L.splice($0,1);return}}function v0(j){let $0=A[j.pointerId];if($0===void 0)$0=new Y0,A[j.pointerId]=$0;$0.set(j.pageX,j.pageY)}function M0(j){let $0=j.pointerId===L[0]?L[1]:L[0];return A[$0]}Z.domElement.addEventListener("contextmenu",X0),Z.domElement.addEventListener("pointerdown",P0),Z.domElement.addEventListener("pointercancel",M),Z.domElement.addEventListener("wheel",Z0,{passive:!1}),document.addEventListener("keydown",y0,{passive:!0,capture:!0}),this.update()}}function c9(J){if(J===void 0)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return J}function rK(J,$){J.prototype=Object.create($.prototype),J.prototype.constructor=J,J.__proto__=$}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Z9={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Q$={duration:0.5,overwrite:!1,delay:0},H5,g8,N8,E9=1e8,H8=1/E9,tQ=Math.PI*2,p4=tQ/4,l4=0,aK=Math.sqrt,c4=Math.cos,n4=Math.sin,x8=function($){return typeof $==="string"},A8=function($){return typeof $==="function"},s9=function($){return typeof $==="number"},LZ=function($){return typeof $>"u"},j9=function($){return typeof $==="object"},$9=function($){return $!==!1},q5=function(){return typeof window<"u"},GZ=function($){return A8($)||x8($)},tK=typeof ArrayBuffer==="function"&&ArrayBuffer.isView||function(){},n8=Array.isArray,s4=/random\([^)]+\)/g,i4=/,\s*/g,dK=/(?:-?\.?\d|\.)+/gi,U5=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,SJ=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,cQ=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,F5=/[+-]=-?[.\d]+/,o4=/[^,'"\[\]\s]+/gi,r4=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,I8,_9,eQ,V5,U9={},NZ={},eK,JW=function($){return(NZ=E7($,U9))&&s8},CZ=function($,Z){return console.warn("Invalid property",$,"set to",Z,"Missing plugin? gsap.registerPlugin()")},K$=function($,Z){return!Z&&console.warn($)},$W=function($,Z){return $&&(U9[$]=Z)&&NZ&&(NZ[$]=Z)||U9},W$=function(){return 0},a4={suppressEvents:!0,isStart:!0,kill:!1},OZ={suppressEvents:!0,kill:!1},t4={suppressEvents:!0},G5={},KJ=[],J5={},ZW,e8={},nQ={},pK=30,DZ=[],O5="",D5=function($){var Z=$[0],Q,K;if(j9(Z)||A8(Z)||($=[$]),!(Q=(Z._gsap||{}).harness)){K=DZ.length;while(K--&&!DZ[K].targetTest(Z));Q=DZ[K]}K=$.length;while(K--)$[K]&&($[K]._gsap||($[K]._gsap=new B5($[K],Q)))||$.splice(K,1);return $},WJ=function($){return $._gsap||D5(N9($))[0]._gsap},E5=function($,Z,Q){return(Q=$[Z])&&A8(Q)?$[Z]():LZ(Q)&&$.getAttribute&&$.getAttribute(Z)||Q},r8=function($,Z){return($=$.split(",")).forEach(Z)||$},M8=function($){return Math.round($*1e5)/1e5||0},z8=function($){return Math.round($*1e7)/1e7||0},wJ=function($,Z){var Q=Z.charAt(0),K=parseFloat(Z.substr(2));return $=parseFloat($),Q==="+"?$+K:Q==="-"?$-K:Q==="*"?$*K:$/K},e4=function($,Z){var Q=Z.length,K=0;for(;$.indexOf(Z[K])<0&&++K<Q;);return K<Q},RZ=function(){var $=KJ.length,Z=KJ.slice(0),Q,K;J5={},KJ.length=0;for(Q=0;Q<$;Q++)K=Z[Q],K&&K._lazy&&(K.render(K._lazy[0],K._lazy[1],!0)._lazy=0)},N5=function($){return!!($._initted||$._startAt||$.add)},QW=function($,Z,Q,K){KJ.length&&!g8&&RZ(),$.render(Z,Q,K||!!(g8&&Z<0&&N5($))),KJ.length&&!g8&&RZ()},KW=function($){var Z=parseFloat($);return(Z||Z===0)&&($+"").match(o4).length<2?Z:x8($)?$.trim():$},WW=function($){return $},Q9=function($,Z){for(var Q in Z)Q in $||($[Q]=Z[Q]);return $},JU=function($){return function(Z,Q){for(var K in Q)K in Z||K==="duration"&&$||K==="ease"||(Z[K]=Q[K])}},E7=function($,Z){for(var Q in Z)$[Q]=Z[Q];return $},lK=function J($,Z){for(var Q in Z)Q!=="__proto__"&&Q!=="constructor"&&Q!=="prototype"&&($[Q]=j9(Z[Q])?J($[Q]||($[Q]={}),Z[Q]):Z[Q]);return $},BZ=function($,Z){var Q={},K;for(K in $)K in Z||(Q[K]=$[K]);return Q},J$=function($){var Z=$.parent||I8,Q=$.keyframes?JU(n8($.keyframes)):Q9;if($9($.inherit))while(Z)Q($,Z.vars.defaults),Z=Z.parent||Z._dp;return $},$U=function($,Z){var Q=$.length,K=Q===Z.length;while(K&&Q--&&$[Q]===Z[Q]);return Q<0},XW=function($,Z,Q,K,W){if(Q===void 0)Q="_first";if(K===void 0)K="_last";var Y=$[K],X;if(W){X=Z[W];while(Y&&Y[W]>X)Y=Y._prev}if(Y)Z._next=Y._next,Y._next=Z;else Z._next=$[Q],$[Q]=Z;if(Z._next)Z._next._prev=Z;else $[K]=Z;return Z._prev=Y,Z.parent=Z._dp=$,Z},H$=function($,Z,Q,K){if(Q===void 0)Q="_first";if(K===void 0)K="_last";var{_prev:W,_next:Y}=Z;if(W)W._next=Y;else if($[Q]===Z)$[Q]=Y;if(Y)Y._prev=W;else if($[K]===Z)$[K]=W;Z._next=Z._prev=Z.parent=null},XJ=function($,Z){$.parent&&(!Z||$.parent.autoRemoveChildren)&&$.parent.remove&&$.parent.remove($),$._act=0},MJ=function($,Z){if($&&(!Z||Z._end>$._dur||Z._start<0)){var Q=$;while(Q)Q._dirty=1,Q=Q.parent}return $},ZU=function($){var Z=$.parent;while(Z&&Z.parent)Z._dirty=1,Z.totalDuration(),Z=Z.parent;return $},$5=function($,Z,Q,K){return $._startAt&&(g8?$._startAt.revert(OZ):$.vars.immediateRender&&!$.vars.autoRevert||$._startAt.render(Z,!0,K))},QU=function J($){return!$||$._ts&&J($.parent)},cK=function($){return $._repeat?N7($._tTime,$=$.duration()+$._rDelay)*$:0},N7=function($,Z){var Q=Math.floor($=z8($/Z));return $&&Q===$?Q-1:Q},zZ=function($,Z){return($-Z._start)*Z._ts+(Z._ts>=0?0:Z._dirty?Z.totalDuration():Z._tDur)},AZ=function($){return $._end=z8($._start+($._tDur/Math.abs($._ts||$._rts||H8)||0))},MZ=function($,Z){var Q=$._dp;if(Q&&Q.smoothChildTiming&&$._ts)$._start=z8(Q._time-($._ts>0?Z/$._ts:(($._dirty?$.totalDuration():$._tDur)-Z)/-$._ts)),AZ($),Q._dirty||MJ(Q,$);return $},YW=function($,Z){var Q;if(Z._time||!Z._dur&&Z._initted||Z._start<$._time&&(Z._dur||!Z.add)){if(Q=zZ($.rawTime(),Z),!Z._dur||q$(0,Z.totalDuration(),Q)-Z._tTime>H8)Z.render(Q,!0)}if(MJ($,Z)._dp&&$._initted&&$._time>=$._dur&&$._ts){if($._dur<$.duration()){Q=$;while(Q._dp)Q.rawTime()>=0&&Q.totalTime(Q._tTime),Q=Q._dp}$._zTime=-H8}},T9=function($,Z,Q,K){return Z.parent&&XJ(Z),Z._start=z8((s9(Q)?Q:Q||$!==I8?D9($,Q,Z):$._time)+Z._delay),Z._end=z8(Z._start+(Z.totalDuration()/Math.abs(Z.timeScale())||0)),XW($,Z,"_first","_last",$._sort?"_start":0),Z5(Z)||($._recent=Z),K||YW($,Z),$._ts<0&&MZ($,$._tTime),$},HW=function($,Z){return(U9.ScrollTrigger||CZ("scrollTrigger",Z))&&U9.ScrollTrigger.create(Z,$)},qW=function($,Z,Q,K,W){if(L5($,Z,W),!$._initted)return 1;if(!Q&&$._pt&&!g8&&($._dur&&$.vars.lazy!==!1||!$._dur&&$.vars.lazy)&&ZW!==J9.frame)return KJ.push($),$._lazy=[W,K],1},KU=function J($){var Z=$.parent;return Z&&Z._ts&&Z._initted&&!Z._lock&&(Z.rawTime()<0||J(Z))},Z5=function($){var Z=$.data;return Z==="isFromStart"||Z==="isStart"},WU=function($,Z,Q,K){var W=$.ratio,Y=Z<0||!Z&&(!$._start&&KU($)&&!(!$._initted&&Z5($))||($._ts<0||$._dp._ts<0)&&!Z5($))?0:1,X=$._rDelay,H=0,q,U,F;if(X&&$._repeat){if(H=q$(0,$._tDur,Z),U=N7(H,X),$._yoyo&&U&1&&(Y=1-Y),U!==N7($._tTime,X))W=1-Y,$.vars.repeatRefresh&&$._initted&&$.invalidate()}if(Y!==W||g8||K||$._zTime===H8||!Z&&$._zTime){if(!$._initted&&qW($,Z,K,Q,H))return;F=$._zTime,$._zTime=Z||(Q?H8:0),Q||(Q=Z&&!F),$.ratio=Y,$._from&&(Y=1-Y),$._time=0,$._tTime=H,q=$._pt;while(q)q.r(Y,q.d),q=q._next;if(Z<0&&$5($,Z,Q,!0),$._onUpdate&&!Q&&q9($,"onUpdate"),H&&$._repeat&&!Q&&$.parent&&q9($,"onRepeat"),(Z>=$._tDur||Z<0)&&$.ratio===Y){if(Y&&XJ($,1),!Q&&!g8)q9($,Y?"onComplete":"onReverseComplete",!0),$._prom&&$._prom()}}else if(!$._zTime)$._zTime=Z},XU=function($,Z,Q){var K;if(Q>Z){K=$._first;while(K&&K._start<=Q){if(K.data==="isPause"&&K._start>Z)return K;K=K._next}}else{K=$._last;while(K&&K._start>=Q){if(K.data==="isPause"&&K._start<Z)return K;K=K._prev}}},R7=function($,Z,Q,K){var W=$._repeat,Y=z8(Z)||0,X=$._tTime/$._tDur;return X&&!K&&($._time*=Y/$._dur),$._dur=Y,$._tDur=!W?Y:W<0?10000000000:z8(Y*(W+1)+$._rDelay*W),X>0&&!K&&MZ($,$._tTime=$._tDur*X),$.parent&&AZ($),Q||MJ($.parent,$),$},nK=function($){return $ instanceof c8?MJ($):R7($,$._dur)},YU={_start:0,endTime:W$,totalDuration:W$},D9=function J($,Z,Q){var K=$.labels,W=$._recent||YU,Y=$.duration()>=E9?W.endTime(!1):$._dur,X,H,q;if(x8(Z)&&(isNaN(Z)||(Z in K))){if(H=Z.charAt(0),q=Z.substr(-1)==="%",X=Z.indexOf("="),H==="<"||H===">")return X>=0&&(Z=Z.replace(/=/,"")),(H==="<"?W._start:W.endTime(W._repeat>=0))+(parseFloat(Z.substr(1))||0)*(q?(X<0?W:Q).totalDuration()/100:1);if(X<0)return Z in K||(K[Z]=Y),K[Z];if(H=parseFloat(Z.charAt(X-1)+Z.substr(X+1)),q&&Q)H=H/100*(n8(Q)?Q[0]:Q).totalDuration();return X>1?J($,Z.substr(0,X-1),Q)+H:Y+H}return Z==null?Y:+Z},$$=function($,Z,Q){var K=s9(Z[1]),W=(K?2:1)+($<2?0:1),Y=Z[W],X,H;if(K&&(Y.duration=Z[1]),Y.parent=Q,$){X=Y,H=Q;while(H&&!("immediateRender"in X))X=H.vars.defaults||{},H=$9(H.vars.inherit)&&H.parent;Y.immediateRender=$9(X.immediateRender),$<2?Y.runBackwards=1:Y.startAt=Z[W-1]}return new S8(Z[0],Y,Z[W+1])},YJ=function($,Z){return $||$===0?Z($):Z},q$=function($,Z,Q){return Q<$?$:Q>Z?Z:Q},m8=function($,Z){return!x8($)||!(Z=r4.exec($))?"":Z[1]},HU=function($,Z,Q){return YJ(Q,function(K){return q$($,Z,K)})},Q5=[].slice,UW=function($,Z){return $&&j9($)&&"length"in $&&(!Z&&!$.length||($.length-1 in $)&&j9($[0]))&&!$.nodeType&&$!==_9},qU=function($,Z,Q){if(Q===void 0)Q=[];return $.forEach(function(K){var W;return x8(K)&&!Z||UW(K,1)?(W=Q).push.apply(W,N9(K)):Q.push(K)})||Q},N9=function($,Z,Q){return N8&&!Z&&N8.selector?N8.selector($):x8($)&&!Q&&(eQ||!B7())?Q5.call((Z||V5).querySelectorAll($),0):n8($)?qU($,Q):UW($)?Q5.call($,0):$?[$]:[]},K5=function($){return $=N9($)[0]||K$("Invalid scope")||{},function(Z){var Q=$.current||$.nativeElement||$;return N9(Z,Q.querySelectorAll?Q:Q===$?K$("Invalid scope")||V5.createElement("div"):$)}},FW=function($){return $.sort(function(){return 0.5-Math.random()})},VW=function($){if(A8($))return $;var Z=j9($)?$:{each:$},Q=kJ(Z.ease),K=Z.from||0,W=parseFloat(Z.base)||0,Y={},X=K>0&&K<1,H=isNaN(K)||X,q=Z.axis,U=K,F=K;if(x8(K))U=F={center:0.5,edges:0.5,end:1}[K]||0;else if(!X&&H)U=K[0],F=K[1];return function(V,G,N){var E=(N||Z).length,O=Y[E],D,R,B,z,C,L,A,_,I;if(!O){if(I=Z.grid==="auto"?0:(Z.grid||[1,E9])[1],!I){A=-E9;while(A<(A=N[I++].getBoundingClientRect().left)&&I<E);I<E&&I--}O=Y[E]=[],D=H?Math.min(I,E)*U-0.5:K%I,R=I===E9?0:H?E*F/I-0.5:K/I|0,A=0,_=E9;for(L=0;L<E;L++)B=L%I-D,z=R-(L/I|0),O[L]=C=!q?aK(B*B+z*z):Math.abs(q==="y"?z:B),C>A&&(A=C),C<_&&(_=C);K==="random"&&FW(O),O.max=A-_,O.min=_,O.v=E=(parseFloat(Z.amount)||parseFloat(Z.each)*(I>E?E-1:!q?Math.max(I,E/I):q==="y"?E/I:I)||0)*(K==="edges"?-1:1),O.b=E<0?W-E:W,O.u=m8(Z.amount||Z.each)||0,Q=Q&&E<0?LU(Q):Q}return E=(O[V]-O.min)/O.max||0,z8(O.b+(Q?Q(E):E)*O.v)+O.u}},W5=function($){var Z=Math.pow(10,(($+"").split(".")[1]||"").length);return function(Q){var K=z8(Math.round(parseFloat(Q)/$)*$*Z);return(K-K%1)/Z+(s9(Q)?0:m8(Q))}},GW=function($,Z){var Q=n8($),K,W;if(!Q&&j9($))if(K=Q=$.radius||E9,$.values){if($=N9($.values),W=!s9($[0]))K*=K}else $=W5($.increment);return YJ(Z,!Q?W5($):A8($)?function(Y){return W=$(Y),Math.abs(W-Y)<=K?W:Y}:function(Y){var X=parseFloat(W?Y.x:Y),H=parseFloat(W?Y.y:0),q=E9,U=0,F=$.length,V,G;while(F--){if(W)V=$[F].x-X,G=$[F].y-H,V=V*V+G*G;else V=Math.abs($[F]-X);if(V<q)q=V,U=F}return U=!K||q<=K?$[U]:Y,W||U===Y||s9(Y)?U:U+m8(Y)})},OW=function($,Z,Q,K){return YJ(n8($)?!Z:Q===!0?!!(Q=0):!K,function(){return n8($)?$[~~(Math.random()*$.length)]:(Q=Q||0.00001)&&(K=Q<1?Math.pow(10,(Q+"").length-2):1)&&Math.floor(Math.round(($-Q/2+Math.random()*(Z-$+Q*0.99))/Q)*Q*K)/K})},UU=function(){for(var $=arguments.length,Z=Array($),Q=0;Q<$;Q++)Z[Q]=arguments[Q];return function(K){return Z.reduce(function(W,Y){return Y(W)},K)}},FU=function($,Z){return function(Q){return $(parseFloat(Q))+(Z||m8(Q))}},VU=function($,Z,Q){return EW($,Z,0,1,Q)},DW=function($,Z,Q){return YJ(Q,function(K){return $[~~Z(K)]})},GU=function J($,Z,Q){var K=Z-$;return n8($)?DW($,J(0,$.length),Z):YJ(Q,function(W){return(K+(W-$)%K)%K+$})},OU=function J($,Z,Q){var K=Z-$,W=K*2;return n8($)?DW($,J(0,$.length-1),Z):YJ(Q,function(Y){return Y=(W+(Y-$)%W)%W||0,$+(Y>K?W-Y:Y)})},z7=function($){return $.replace(s4,function(Z){var Q=Z.indexOf("[")+1,K=Z.substring(Q||7,Q?Z.indexOf("]"):Z.length-1).split(i4);return OW(Q?K:+K[0],Q?0:+K[1],+K[2]||0.00001)})},EW=function($,Z,Q,K,W){var Y=Z-$,X=K-Q;return YJ(W,function(H){return Q+((H-$)/Y*X||0)})},DU=function J($,Z,Q,K){var W=isNaN($+Z)?0:function(G){return(1-G)*$+G*Z};if(!W){var Y=x8($),X={},H,q,U,F,V;if(Q===!0&&(K=1)&&(Q=null),Y)$={p:$},Z={p:Z};else if(n8($)&&!n8(Z)){U=[],F=$.length,V=F-2;for(q=1;q<F;q++)U.push(J($[q-1],$[q]));F--,W=function(N){N*=F;var E=Math.min(V,~~N);return U[E](N-E)},Q=Z}else if(!K)$=E7(n8($)?[]:{},$);if(!U){for(H in Z)z5.call(X,$,H,"get",Z[H]);W=function(N){return M5(N,X)||(Y?$.p:$)}}}return YJ(Q,W)},sK=function($,Z,Q){var K=$.labels,W=E9,Y,X,H;for(Y in K)if(X=K[Y]-Z,X<0===!!Q&&X&&W>(X=Math.abs(X)))H=Y,W=X;return H},q9=function($,Z,Q){var K=$.vars,W=K[Z],Y=N8,X=$._ctx,H,q,U;if(!W)return;return H=K[Z+"Params"],q=K.callbackScope||$,Q&&KJ.length&&RZ(),X&&(N8=X),U=H?W.apply(q,H):W.call(q),N8=Y,U},t7=function($){return XJ($),$.scrollTrigger&&$.scrollTrigger.kill(!!g8),$.progress()<1&&q9($,"onInterrupt"),$},D7,NW=[],RW=function($){if(!$)return;if($=!$.name&&$.default||$,q5()||$.headless){var Z=$.name,Q=A8($),K=Z&&!Q&&$.init?function(){this._props=[]}:$,W={init:W$,render:M5,add:z5,kill:jU,modifier:TU,rawVars:0},Y={targetTest:0,get:0,getSetter:kZ,aliases:{},register:0};if(B7(),$!==K){if(e8[Z])return;if(Q9(K,Q9(BZ($,W),Y)),E7(K.prototype,E7(W,BZ($,Y))),e8[K.prop=Z]=K,$.targetTest)DZ.push(K),G5[Z]=1;Z=(Z==="css"?"CSS":Z.charAt(0).toUpperCase()+Z.substr(1))+"Plugin"}$W(Z,K),$.register&&$.register(s8,K,a8)}else NW.push($)},Y8=255,e7={aqua:[0,Y8,Y8],lime:[0,Y8,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Y8],navy:[0,0,128],white:[Y8,Y8,Y8],olive:[128,128,0],yellow:[Y8,Y8,0],orange:[Y8,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Y8,0,0],pink:[Y8,192,203],cyan:[0,Y8,Y8],transparent:[Y8,Y8,Y8,0]},sQ=function($,Z,Q){return $+=$<0?1:$>1?-1:0,($*6<1?Z+(Q-Z)*$*6:$<0.5?Q:$*3<2?Z+(Q-Z)*(0.6666666666666666-$)*6:Z)*Y8+0.5|0},BW=function($,Z,Q){var K=!$?e7.black:s9($)?[$>>16,$>>8&Y8,$&Y8]:0,W,Y,X,H,q,U,F,V,G,N;if(!K){if($.substr(-1)===",")$=$.substr(0,$.length-1);if(e7[$])K=e7[$];else if($.charAt(0)==="#"){if($.length<6)W=$.charAt(1),Y=$.charAt(2),X=$.charAt(3),$="#"+W+W+Y+Y+X+X+($.length===5?$.charAt(4)+$.charAt(4):"");if($.length===9)return K=parseInt($.substr(1,6),16),[K>>16,K>>8&Y8,K&Y8,parseInt($.substr(7),16)/255];$=parseInt($.substr(1),16),K=[$>>16,$>>8&Y8,$&Y8]}else if($.substr(0,3)==="hsl"){if(K=N=$.match(dK),!Z)H=+K[0]%360/360,q=+K[1]/100,U=+K[2]/100,Y=U<=0.5?U*(q+1):U+q-U*q,W=U*2-Y,K.length>3&&(K[3]*=1),K[0]=sQ(H+0.3333333333333333,W,Y),K[1]=sQ(H,W,Y),K[2]=sQ(H-0.3333333333333333,W,Y);else if(~$.indexOf("="))return K=$.match(U5),Q&&K.length<4&&(K[3]=1),K}else K=$.match(dK)||e7.transparent;K=K.map(Number)}if(Z&&!N){if(W=K[0]/Y8,Y=K[1]/Y8,X=K[2]/Y8,F=Math.max(W,Y,X),V=Math.min(W,Y,X),U=(F+V)/2,F===V)H=q=0;else G=F-V,q=U>0.5?G/(2-F-V):G/(F+V),H=F===W?(Y-X)/G+(Y<X?6:0):F===Y?(X-W)/G+2:(W-Y)/G+4,H*=60;K[0]=~~(H+0.5),K[1]=~~(q*100+0.5),K[2]=~~(U*100+0.5)}return Q&&K.length<4&&(K[3]=1),K},zW=function($){var Z=[],Q=[],K=-1;return $.split(n9).forEach(function(W){var Y=W.match(SJ)||[];Z.push.apply(Z,Y),Q.push(K+=Y.length+1)}),Z.c=Q,Z},iK=function($,Z,Q){var K="",W=($+K).match(n9),Y=Z?"hsla(":"rgba(",X=0,H,q,U,F;if(!W)return $;if(W=W.map(function(V){return(V=BW(V,Z,1))&&Y+(Z?V[0]+","+V[1]+"%,"+V[2]+"%,"+V[3]:V.join(","))+")"}),Q){if(U=zW($),H=Q.c,H.join(K)!==U.c.join(K)){q=$.replace(n9,"1").split(SJ),F=q.length-1;for(;X<F;X++)K+=q[X]+(~H.indexOf(X)?W.shift()||Y+"0,0,0,0)":(U.length?U:W.length?W:Q).shift())}}if(!q){q=$.split(n9),F=q.length-1;for(;X<F;X++)K+=q[X]+W[X]}return K+q[F]},n9=function(){var J="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",$;for($ in e7)J+="|"+$+"\\b";return new RegExp(J+")","gi")}(),EU=/hsl[a]?\(/,R5=function($){var Z=$.join(" "),Q;if(n9.lastIndex=0,n9.test(Z))return Q=EU.test(Z),$[1]=iK($[1],Q),$[0]=iK($[0],Q,zW($[1])),!0},X$,J9=function(){var J=Date.now,$=500,Z=33,Q=J(),K=Q,W=4.166666666666667,Y=W,X=[],H,q,U,F,V,G,N=function E(O){var D=J()-K,R=O===!0,B,z,C,L;if((D>$||D<0)&&(Q+=D-Z),K+=D,C=K-Q,B=C-Y,B>0||R)L=++F.frame,V=C-F.time*1000,F.time=C=C/1000,Y+=B+(B>=W?4:W-B),z=1;if(R||(H=q(E)),z)for(G=0;G<X.length;G++)X[G](C,V,L,O)};return F={time:0,frame:0,tick:function(){N(!0)},deltaRatio:function(O){return V/(1000/(O||60))},wake:function(){if(eK){if(!eQ&&q5())_9=eQ=window,V5=_9.document||{},U9.gsap=s8,(_9.gsapVersions||(_9.gsapVersions=[])).push(s8.version),JW(NZ||_9.GreenSockGlobals||!_9.gsap&&_9||{}),NW.forEach(RW);U=typeof requestAnimationFrame<"u"&&requestAnimationFrame,H&&F.sleep(),q=U||function(O){return setTimeout(O,Y-F.time*1000+1|0)},X$=1,N(2)}},sleep:function(){(U?cancelAnimationFrame:clearTimeout)(H),X$=0,q=W$},lagSmoothing:function(O,D){$=O||1/0,Z=Math.min(D||33,$)},fps:function(O){W=1000/(O||240),Y=F.time*1000+W},add:function(O,D,R){var B=D?function(z,C,L,A){O(z,C,L,A),F.remove(B)}:O;return F.remove(O),X[R?"unshift":"push"](B),B7(),B},remove:function(O,D){~(D=X.indexOf(O))&&X.splice(D,1)&&G>=D&&G--},_listeners:X},F}(),B7=function(){return!X$&&J9.wake()},J8={},NU=/^[\d.\-M][\d.\-,\s]/,RU=/["']/g,BU=function($){var Z={},Q=$.substr(1,$.length-3).split(":"),K=Q[0],W=1,Y=Q.length,X,H,q;for(;W<Y;W++)H=Q[W],X=W!==Y-1?H.lastIndexOf(","):H.length,q=H.substr(0,X),Z[K]=isNaN(q)?q.replace(RU,"").trim():+q,K=H.substr(X+1).trim();return Z},zU=function($){var Z=$.indexOf("(")+1,Q=$.indexOf(")"),K=$.indexOf("(",Z);return $.substring(Z,~K&&K<Q?$.indexOf(")",Q+1):Q)},IU=function($){var Z=($+"").split("("),Q=J8[Z[0]];return Q&&Z.length>1&&Q.config?Q.config.apply(null,~$.indexOf("{")?[BU(Z[1])]:zU($).split(",").map(KW)):J8._CE&&NU.test($)?J8._CE("",$):Q},LU=function($){return function(Z){return 1-$(1-Z)}},kJ=function($,Z){return!$?Z:(A8($)?$:J8[$]||IU($))||Z},_J=function($,Z,Q,K){if(Q===void 0)Q=function(H){return 1-Z(1-H)};if(K===void 0)K=function(H){return H<0.5?Z(H*2)/2:1-Z((1-H)*2)/2};var W={easeIn:Z,easeOut:Q,easeInOut:K},Y;return r8($,function(X){J8[X]=U9[X]=W,J8[Y=X.toLowerCase()]=Q;for(var H in W)J8[Y+(H==="easeIn"?".in":H==="easeOut"?".out":".inOut")]=J8[X+"."+H]=W[H]}),W},IW=function($){return function(Z){return Z<0.5?(1-$(1-Z*2))/2:0.5+$((Z-0.5)*2)/2}},iQ=function J($,Z,Q){var K=Z>=1?Z:1,W=(Q||($?0.3:0.45))/(Z<1?Z:1),Y=W/tQ*(Math.asin(1/K)||0),X=function(U){return U===1?1:K*Math.pow(2,-10*U)*n4((U-Y)*W)+1},H=$==="out"?X:$==="in"?function(q){return 1-X(1-q)}:IW(X);return W=tQ/W,H.config=function(q,U){return J($,q,U)},H},oQ=function J($,Z){if(Z===void 0)Z=1.70158;var Q=function(Y){return Y?--Y*Y*((Z+1)*Y+Z)+1:0},K=$==="out"?Q:$==="in"?function(W){return 1-Q(1-W)}:IW(Q);return K.config=function(W){return J($,W)},K};r8("Linear,Quad,Cubic,Quart,Quint,Strong",function(J,$){var Z=$<5?$+1:$;_J(J+",Power"+(Z-1),$?function(Q){return Math.pow(Q,Z)}:function(Q){return Q},function(Q){return 1-Math.pow(1-Q,Z)},function(Q){return Q<0.5?Math.pow(Q*2,Z)/2:1-Math.pow((1-Q)*2,Z)/2})});J8.Linear.easeNone=J8.none=J8.Linear.easeIn;_J("Elastic",iQ("in"),iQ("out"),iQ());(function(J,$){var Z=1/$,Q=2*Z,K=2.5*Z,W=function(X){return X<Z?J*X*X:X<Q?J*Math.pow(X-1.5/$,2)+0.75:X<K?J*(X-=2.25/$)*X+0.9375:J*Math.pow(X-2.625/$,2)+0.984375};_J("Bounce",function(Y){return 1-W(1-Y)},W)})(7.5625,2.75);_J("Expo",function(J){return Math.pow(2,10*(J-1))*J+J*J*J*J*J*J*(1-J)});_J("Circ",function(J){return-(aK(1-J*J)-1)});_J("Sine",function(J){return J===1?1:-c4(J*p4)+1});_J("Back",oQ("in"),oQ("out"),oQ());J8.SteppedEase=J8.steps=U9.SteppedEase={config:function($,Z){if($===void 0)$=1;var Q=1/$,K=$+(Z?0:1),W=Z?1:0,Y=1-H8;return function(X){return((K*q$(0,Y,X)|0)+W)*Q}}};Q$.ease=J8["quad.out"];r8("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(J){return O5+=J+","+J+"Params,"});var B5=function($,Z){this.id=l4++,$._gsap=this,this.target=$,this.harness=Z,this.get=Z?Z.get:E5,this.set=Z?Z.getSetter:kZ},Y$=function(){function J(Z){if(this.vars=Z,this._delay=+Z.delay||0,this._repeat=Z.repeat===1/0?-2:Z.repeat||0)this._rDelay=Z.repeatDelay||0,this._yoyo=!!Z.yoyo||!!Z.yoyoEase;if(this._ts=1,R7(this,+Z.duration,1,1),this.data=Z.data,N8)this._ctx=N8,N8.data.push(this);X$||J9.wake()}var $=J.prototype;return $.delay=function(Q){if(Q||Q===0)return this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+Q-this._delay),this._delay=Q,this;return this._delay},$.duration=function(Q){return arguments.length?this.totalDuration(this._repeat>0?Q+(Q+this._rDelay)*this._repeat:Q):this.totalDuration()&&this._dur},$.totalDuration=function(Q){if(!arguments.length)return this._tDur;return this._dirty=0,R7(this,this._repeat<0?Q:(Q-this._repeat*this._rDelay)/(this._repeat+1))},$.totalTime=function(Q,K){if(B7(),!arguments.length)return this._tTime;var W=this._dp;if(W&&W.smoothChildTiming&&this._ts){MZ(this,Q),!W._dp||W.parent||YW(W,this);while(W&&W.parent){if(W.parent._time!==W._start+(W._ts>=0?W._tTime/W._ts:(W.totalDuration()-W._tTime)/-W._ts))W.totalTime(W._tTime,!0);W=W.parent}if(!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&Q<this._tDur||this._ts<0&&Q>0||!this._tDur&&!Q))T9(this._dp,this,this._start-this._delay)}if(this._tTime!==Q||!this._dur&&!K||this._initted&&Math.abs(this._zTime)===H8||!this._initted&&this._dur&&Q||!Q&&!this._initted&&(this.add||this._ptLookup))this._ts||(this._pTime=Q),QW(this,Q,K);return this},$.time=function(Q,K){return arguments.length?this.totalTime(Math.min(this.totalDuration(),Q+cK(this))%(this._dur+this._rDelay)||(Q?this._dur:0),K):this._time},$.totalProgress=function(Q,K){return arguments.length?this.totalTime(this.totalDuration()*Q,K):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},$.progress=function(Q,K){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-Q:Q)+cK(this),K):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},$.iteration=function(Q,K){var W=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(Q-1)*W,K):this._repeat?N7(this._tTime,W)+1:1},$.timeScale=function(Q,K){if(!arguments.length)return this._rts===-H8?0:this._rts;if(this._rts===Q)return this;var W=this.parent&&this._ts?zZ(this.parent._time,this):this._tTime;return this._rts=+Q||0,this._ts=this._ps||Q===-H8?0:this._rts,this.totalTime(q$(-Math.abs(this._delay),this.totalDuration(),W),K!==!1),AZ(this),ZU(this)},$.paused=function(Q){if(!arguments.length)return this._ps;if(this._ps!==Q)if(this._ps=Q,Q)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else B7(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==H8&&(this._tTime-=H8));return this},$.startTime=function(Q){if(arguments.length){this._start=z8(Q);var K=this.parent||this._dp;return K&&(K._sort||!this.parent)&&T9(K,this,this._start-this._delay),this}return this._start},$.endTime=function(Q){return this._start+($9(Q)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},$.rawTime=function(Q){var K=this.parent||this._dp;return!K?this._tTime:Q&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):!this._ts?this._tTime:zZ(K.rawTime(Q),this)},$.revert=function(Q){if(Q===void 0)Q=t4;var K=g8;if(g8=Q,N5(this))this.timeline&&this.timeline.revert(Q),this.totalTime(-0.01,Q.suppressEvents);return this.data!=="nested"&&Q.kill!==!1&&this.kill(),g8=K,this},$.globalTime=function(Q){var K=this,W=arguments.length?Q:K.rawTime();while(K)W=K._start+W/(Math.abs(K._ts)||1),K=K._dp;return!this.parent&&this._sat?this._sat.globalTime(Q):W},$.repeat=function(Q){if(arguments.length)return this._repeat=Q===1/0?-2:Q,nK(this);return this._repeat===-2?1/0:this._repeat},$.repeatDelay=function(Q){if(arguments.length){var K=this._time;return this._rDelay=Q,nK(this),K?this.time(K):this}return this._rDelay},$.yoyo=function(Q){if(arguments.length)return this._yoyo=Q,this;return this._yoyo},$.seek=function(Q,K){return this.totalTime(D9(this,Q),$9(K))},$.restart=function(Q,K){return this.play().totalTime(Q?-this._delay:0,$9(K)),this._dur||(this._zTime=-H8),this},$.play=function(Q,K){return Q!=null&&this.seek(Q,K),this.reversed(!1).paused(!1)},$.reverse=function(Q,K){return Q!=null&&this.seek(Q||this.totalDuration(),K),this.reversed(!0).paused(!1)},$.pause=function(Q,K){return Q!=null&&this.seek(Q,K),this.paused(!0)},$.resume=function(){return this.paused(!1)},$.reversed=function(Q){if(arguments.length)return!!Q!==this.reversed()&&this.timeScale(-this._rts||(Q?-H8:0)),this;return this._rts<0},$.invalidate=function(){return this._initted=this._act=0,this._zTime=-H8,this},$.isActive=function(){var Q=this.parent||this._dp,K=this._start,W;return!!(!Q||this._ts&&this._initted&&Q.isActive()&&(W=Q.rawTime(!0))>=K&&W<this.endTime(!0)-H8)},$.eventCallback=function(Q,K,W){var Y=this.vars;if(arguments.length>1){if(!K)delete Y[Q];else Y[Q]=K,W&&(Y[Q+"Params"]=W),Q==="onUpdate"&&(this._onUpdate=K);return this}return Y[Q]},$.then=function(Q){var K=this,W=K._prom;return new Promise(function(Y){var X=A8(Q)?Q:WW,H=function(){var U=K.then;K.then=null,W&&W(),A8(X)&&(X=X(K))&&(X.then||X===K)&&(K.then=U),Y(X),K.then=U};if(K._initted&&K.totalProgress()===1&&K._ts>=0||!K._tTime&&K._ts<0)H();else K._prom=H})},$.kill=function(){t7(this)},J}();Q9(Y$.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-H8,_prom:0,_ps:!1,_rts:1});var c8=function(J){rK($,J);function $(Q,K){var W;if(Q===void 0)Q={};return W=J.call(this,Q)||this,W.labels={},W.smoothChildTiming=!!Q.smoothChildTiming,W.autoRemoveChildren=!!Q.autoRemoveChildren,W._sort=$9(Q.sortChildren),I8&&T9(Q.parent||I8,c9(W),K),Q.reversed&&W.reverse(),Q.paused&&W.paused(!0),Q.scrollTrigger&&HW(c9(W),Q.scrollTrigger),W}var Z=$.prototype;return Z.to=function(K,W,Y){return $$(0,arguments,this),this},Z.from=function(K,W,Y){return $$(1,arguments,this),this},Z.fromTo=function(K,W,Y,X){return $$(2,arguments,this),this},Z.set=function(K,W,Y){return W.duration=0,W.parent=this,J$(W).repeatDelay||(W.repeat=0),W.immediateRender=!!W.immediateRender,new S8(K,W,D9(this,Y),1),this},Z.call=function(K,W,Y){return T9(this,S8.delayedCall(0,K,W),Y)},Z.staggerTo=function(K,W,Y,X,H,q,U){return Y.duration=W,Y.stagger=Y.stagger||X,Y.onComplete=q,Y.onCompleteParams=U,Y.parent=this,new S8(K,Y,D9(this,H)),this},Z.staggerFrom=function(K,W,Y,X,H,q,U){return Y.runBackwards=1,J$(Y).immediateRender=$9(Y.immediateRender),this.staggerTo(K,W,Y,X,H,q,U)},Z.staggerFromTo=function(K,W,Y,X,H,q,U,F){return X.startAt=Y,J$(X).immediateRender=$9(X.immediateRender),this.staggerTo(K,W,X,H,q,U,F)},Z.render=function(K,W,Y){var X=this._time,H=this._dirty?this.totalDuration():this._tDur,q=this._dur,U=K<=0?0:z8(K),F=this._zTime<0!==K<0&&(this._initted||!q),V,G,N,E,O,D,R,B,z,C,L,A;if(this!==I8&&U>H&&K>=0&&(U=H),U!==this._tTime||Y||F){if(X!==this._time&&q)U+=this._time-X,K+=this._time-X;if(V=U,z=this._start,B=this._ts,D=!B,F)q||(X=this._zTime),(K||!W)&&(this._zTime=K);if(this._repeat){if(L=this._yoyo,O=q+this._rDelay,this._repeat<-1&&K<0)return this.totalTime(O*100+K,W,Y);if(V=z8(U%O),U===H)E=this._repeat,V=q;else{if(C=z8(U/O),E=~~C,E&&E===C)V=q,E--;V>q&&(V=q)}if(C=N7(this._tTime,O),!X&&this._tTime&&C!==E&&this._tTime-C*O-this._dur<=0&&(C=E),L&&E&1)V=q-V,A=1;if(E!==C&&!this._lock){var _=L&&C&1,I=_===(L&&E&1);if(E<C&&(_=!_),X=_?0:U%q?q:U,this._lock=1,this.render(X||(A?0:z8(E*O)),W,!q)._lock=0,this._tTime=U,!W&&this.parent&&q9(this,"onRepeat"),this.vars.repeatRefresh&&!A)this.invalidate()._lock=1,C=E;if(X&&X!==this._time||D!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(q=this._dur,H=this._tDur,I)this._lock=2,X=_?q:-0.0001,this.render(X,!0),this.vars.repeatRefresh&&!A&&this.invalidate();if(this._lock=0,!this._ts&&!D)return this}}if(this._hasPause&&!this._forcing&&this._lock<2){if(R=XU(this,z8(X),z8(V)),R)U-=V-(V=R._start)}if(this._tTime=U,this._time=V,this._act=!!B,!this._initted)this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=K,X=0;if(!X&&U&&q&&!W&&!C){if(q9(this,"onStart"),this._tTime!==U)return this}if(V>=X&&K>=0){G=this._first;while(G){if(N=G._next,(G._act||V>=G._start)&&G._ts&&R!==G){if(G.parent!==this)return this.render(K,W,Y);if(G.render(G._ts>0?(V-G._start)*G._ts:(G._dirty?G.totalDuration():G._tDur)+(V-G._start)*G._ts,W,Y),V!==this._time||!this._ts&&!D){R=0,N&&(U+=this._zTime=-H8);break}}G=N}}else{G=this._last;var k=K<0?K:V;while(G){if(N=G._prev,(G._act||k<=G._end)&&G._ts&&R!==G){if(G.parent!==this)return this.render(K,W,Y);if(G.render(G._ts>0?(k-G._start)*G._ts:(G._dirty?G.totalDuration():G._tDur)+(k-G._start)*G._ts,W,Y||g8&&N5(G)),V!==this._time||!this._ts&&!D){R=0,N&&(U+=this._zTime=k?-H8:H8);break}}G=N}}if(R&&!W){if(this.pause(),R.render(V>=X?0:-H8)._zTime=V>=X?1:-1,this._ts)return this._start=z,AZ(this),this.render(K,W,Y)}if(this._onUpdate&&!W&&q9(this,"onUpdate",!0),U===H&&this._tTime>=this.totalDuration()||!U&&X){if(z===this._start||Math.abs(B)!==Math.abs(this._ts)){if(!this._lock){if((K||!q)&&(U===H&&this._ts>0||!U&&this._ts<0)&&XJ(this,1),!W&&!(K<0&&!X)&&(U||X||!H))q9(this,U===H&&K>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(U<H&&this.timeScale()>0)&&this._prom()}}}}return this},Z.add=function(K,W){var Y=this;if(s9(W)||(W=D9(this,W,K)),!(K instanceof Y$)){if(n8(K))return K.forEach(function(X){return Y.add(X,W)}),this;if(x8(K))return this.addLabel(K,W);if(A8(K))K=S8.delayedCall(0,K);else return this}return this!==K?T9(this,K,W):this},Z.getChildren=function(K,W,Y,X){if(K===void 0)K=!0;if(W===void 0)W=!0;if(Y===void 0)Y=!0;if(X===void 0)X=-E9;var H=[],q=this._first;while(q){if(q._start>=X)if(q instanceof S8)W&&H.push(q);else Y&&H.push(q),K&&H.push.apply(H,q.getChildren(!0,W,Y));q=q._next}return H},Z.getById=function(K){var W=this.getChildren(1,1,1),Y=W.length;while(Y--)if(W[Y].vars.id===K)return W[Y]},Z.remove=function(K){if(x8(K))return this.removeLabel(K);if(A8(K))return this.killTweensOf(K);if(K.parent===this&&H$(this,K),K===this._recent)this._recent=this._last;return MJ(this)},Z.totalTime=function(K,W){if(!arguments.length)return this._tTime;if(this._forcing=1,!this._dp&&this._ts)this._start=z8(J9.time-(this._ts>0?K/this._ts:(this.totalDuration()-K)/-this._ts));return J.prototype.totalTime.call(this,K,W),this._forcing=0,this},Z.addLabel=function(K,W){return this.labels[K]=D9(this,W),this},Z.removeLabel=function(K){return delete this.labels[K],this},Z.addPause=function(K,W,Y){var X=S8.delayedCall(0,W||W$,Y);return X.data="isPause",this._hasPause=1,T9(this,X,D9(this,K))},Z.removePause=function(K){var W=this._first;K=D9(this,K);while(W){if(W._start===K&&W.data==="isPause")XJ(W);W=W._next}},Z.killTweensOf=function(K,W,Y){var X=this.getTweensOf(K,Y),H=X.length;while(H--)QJ!==X[H]&&X[H].kill(K,W);return this},Z.getTweensOf=function(K,W){var Y=[],X=N9(K),H=this._first,q=s9(W),U;while(H){if(H instanceof S8){if(e4(H._targets,X)&&(q?(!QJ||H._initted&&H._ts)&&H.globalTime(0)<=W&&H.globalTime(H.totalDuration())>W:!W||H.isActive()))Y.push(H)}else if((U=H.getTweensOf(X,W)).length)Y.push.apply(Y,U);H=H._next}return Y},Z.tweenTo=function(K,W){W=W||{};var Y=this,X=D9(Y,K),H=W,q=H.startAt,U=H.onStart,F=H.onStartParams,V=H.immediateRender,G,N=S8.to(Y,Q9({ease:W.ease||"none",lazy:!1,immediateRender:!1,time:X,overwrite:"auto",duration:W.duration||Math.abs((X-(q&&"time"in q?q.time:Y._time))/Y.timeScale())||H8,onStart:function(){if(Y.pause(),!G){var O=W.duration||Math.abs((X-(q&&"time"in q?q.time:Y._time))/Y.timeScale());N._dur!==O&&R7(N,O,0,1).render(N._time,!0,!0),G=1}U&&U.apply(N,F||[])}},W));return V?N.render(0):N},Z.tweenFromTo=function(K,W,Y){return this.tweenTo(W,Q9({startAt:{time:D9(this,K)}},Y))},Z.recent=function(){return this._recent},Z.nextLabel=function(K){if(K===void 0)K=this._time;return sK(this,D9(this,K))},Z.previousLabel=function(K){if(K===void 0)K=this._time;return sK(this,D9(this,K),1)},Z.currentLabel=function(K){return arguments.length?this.seek(K,!0):this.previousLabel(this._time+H8)},Z.shiftChildren=function(K,W,Y){if(Y===void 0)Y=0;var X=this._first,H=this.labels,q;K=z8(K);while(X){if(X._start>=Y)X._start+=K,X._end+=K;X=X._next}if(W){for(q in H)if(H[q]>=Y)H[q]+=K}return MJ(this)},Z.invalidate=function(K){var W=this._first;this._lock=0;while(W)W.invalidate(K),W=W._next;return J.prototype.invalidate.call(this,K)},Z.clear=function(K){if(K===void 0)K=!0;var W=this._first,Y;while(W)Y=W._next,this.remove(W),W=Y;return this._dp&&(this._time=this._tTime=this._pTime=0),K&&(this.labels={}),MJ(this)},Z.totalDuration=function(K){var W=0,Y=this,X=Y._last,H=E9,q,U,F;if(arguments.length)return Y.timeScale((Y._repeat<0?Y.duration():Y.totalDuration())/(Y.reversed()?-K:K));if(Y._dirty){F=Y.parent;while(X){if(q=X._prev,X._dirty&&X.totalDuration(),U=X._start,U>H&&Y._sort&&X._ts&&!Y._lock)Y._lock=1,T9(Y,X,U-X._delay,1)._lock=0;else H=U;if(U<0&&X._ts){if(W-=U,!F&&!Y._dp||F&&F.smoothChildTiming)Y._start+=z8(U/Y._ts),Y._time-=U,Y._tTime-=U;Y.shiftChildren(-U,!1,-1/0),H=0}X._end>W&&X._ts&&(W=X._end),X=q}R7(Y,Y===I8&&Y._time>W?Y._time:W,1,1),Y._dirty=0}return Y._tDur},$.updateRoot=function(K){if(I8._ts)QW(I8,zZ(K,I8)),ZW=J9.frame;if(J9.frame>=pK){pK+=Z9.autoSleep||120;var W=I8._first;if(!W||!W._ts){if(Z9.autoSleep&&J9._listeners.length<2){while(W&&!W._ts)W=W._next;W||J9.sleep()}}}},$}(Y$);Q9(c8.prototype,{_lock:0,_hasPause:0,_forcing:0});var CU=function($,Z,Q,K,W,Y,X){var H=new a8(this._pt,$,Z,0,1,A5,null,W),q=0,U=0,F,V,G,N,E,O,D,R;if(H.b=Q,H.e=K,Q+="",K+="",D=~K.indexOf("random("))K=z7(K);if(Y)R=[Q,K],Y(R,$,Z),Q=R[0],K=R[1];V=Q.match(cQ)||[];while(F=cQ.exec(K)){if(N=F[0],E=K.substring(q,F.index),G)G=(G+1)%5;else if(E.substr(-5)==="rgba(")G=1;if(N!==V[U++])O=parseFloat(V[U-1])||0,H._pt={_next:H._pt,p:E||U===1?E:",",s:O,c:N.charAt(1)==="="?wJ(O,N)-O:parseFloat(N)-O,m:G&&G<4?Math.round:0},q=cQ.lastIndex}if(H.c=q<K.length?K.substring(q,K.length):"",H.fp=X,F5.test(K)||D)H.e=0;return this._pt=H,H},z5=function($,Z,Q,K,W,Y,X,H,q,U){A8(K)&&(K=K(W||0,$,Y));var F=$[Z],V=Q!=="get"?Q:!A8(F)?F:q?$[Z.indexOf("set")||!A8($["get"+Z.substr(3)])?Z:"get"+Z.substr(3)](q):$[Z](),G=!A8(F)?C5:q?SU:AW,N;if(x8(K)){if(~K.indexOf("random("))K=z7(K);if(K.charAt(1)==="="){if(N=wJ(V,K)+(m8(V)||0),N||N===0)K=N}}if(!U||V!==K||X5){if(!isNaN(V*K)&&K!=="")return N=new a8(this._pt,$,Z,+V||0,K-(V||0),typeof F==="boolean"?_U:MW,0,G),q&&(N.fp=q),X&&N.modifier(X,this,$),this._pt=N;return!F&&!(Z in $)&&CZ(Z,K),CU.call(this,$,Z,V,K,G,H||Z9.stringFilter,q)}},AU=function($,Z,Q,K,W){if(A8($)&&($=Z$($,W,Z,Q,K)),!j9($)||$.style&&$.nodeType||n8($)||tK($))return x8($)?Z$($,W,Z,Q,K):$;var Y={},X;for(X in $)Y[X]=Z$($[X],W,Z,Q,K);return Y},I5=function($,Z,Q,K,W,Y){var X,H,q,U;if(e8[$]&&(X=new e8[$]).init(W,X.rawVars?Z[$]:AU(Z[$],K,W,Y,Q),Q,K,Y)!==!1){if(Q._pt=H=new a8(Q._pt,W,$,0,1,X.render,X,0,X.priority),Q!==D7){q=Q._ptLookup[Q._targets.indexOf(W)],U=X._props.length;while(U--)q[X._props[U]]=H}}return X},QJ,X5,L5=function J($,Z,Q){var K=$.vars,W=K.ease,Y=K.startAt,X=K.immediateRender,H=K.lazy,q=K.onUpdate,U=K.runBackwards,F=K.yoyoEase,V=K.keyframes,G=K.autoRevert,N=$._dur,E=$._startAt,O=$._targets,D=$.parent,R=D&&D.data==="nested"?D.vars.targets:O,B=$._overwrite==="auto"&&!H5,z=$.timeline,C=K.easeReverse||F,L,A,_,I,k,b,n,r,y,h,m,i,d;if(z&&(!V||!W)&&(W="none"),$._ease=kJ(W,Q$.ease),$._rEase=C&&(kJ(C)||$._ease),$._from=!z&&!!K.runBackwards,$._from)$.ratio=1;if(!z||V&&!K.stagger){if(r=O[0]?WJ(O[0]).harness:0,i=r&&K[r.prop],L=BZ(K,G5),E)E._zTime<0&&E.progress(1),Z<0&&U&&X&&!G?E.render(-1,!0):E.revert(U&&N?OZ:a4),E._lazy=0;if(Y){if(XJ($._startAt=S8.set(O,Q9({data:"isStart",overwrite:!1,parent:D,immediateRender:!0,lazy:!E&&$9(H),startAt:null,delay:0,onUpdate:q&&function(){return q9($,"onUpdate")},stagger:0},Y))),$._startAt._dp=0,$._startAt._sat=$,Z<0&&(g8||!X&&!G)&&$._startAt.revert(OZ),X){if(N&&Z<=0&&Q<=0){Z&&($._zTime=Z);return}}}else if(U&&N){if(!E){if(Z&&(X=!1),_=Q9({overwrite:!1,data:"isFromStart",lazy:X&&!E&&$9(H),immediateRender:X,stagger:0,parent:D},L),i&&(_[r.prop]=i),XJ($._startAt=S8.set(O,_)),$._startAt._dp=0,$._startAt._sat=$,Z<0&&(g8?$._startAt.revert(OZ):$._startAt.render(-1,!0)),$._zTime=Z,!X)J($._startAt,H8,H8);else if(!Z)return}}$._pt=$._ptCache=0,H=N&&$9(H)||H&&!N;for(A=0;A<O.length;A++){if(k=O[A],n=k._gsap||D5(O)[A]._gsap,$._ptLookup[A]=h={},J5[n.id]&&KJ.length&&RZ(),m=R===O?A:R.indexOf(k),r&&(y=new r).init(k,i||L,$,m,R)!==!1)$._pt=I=new a8($._pt,k,y.name,0,1,y.render,y,0,y.priority),y._props.forEach(function(g){h[g]=I}),y.priority&&(b=1);if(!r||i)for(_ in L)if(e8[_]&&(y=I5(_,L,$,m,k,R)))y.priority&&(b=1);else h[_]=I=z5.call($,k,_,"get",L[_],m,R,0,K.stringFilter);if($._op&&$._op[A]&&$.kill(k,$._op[A]),B&&$._pt)QJ=$,I8.killTweensOf(k,h,$.globalTime(Z)),d=!$.parent,QJ=0;$._pt&&H&&(J5[n.id]=1)}b&&k5($),$._onInit&&$._onInit($)}$._onUpdate=q,$._initted=(!$._op||$._pt)&&!d,V&&Z<=0&&z.render(E9,!0,!0)},MU=function($,Z,Q,K,W,Y,X,H){var q=($._pt&&$._ptCache||($._ptCache={}))[Z],U,F,V,G;if(!q){q=$._ptCache[Z]=[],V=$._ptLookup,G=$._targets.length;while(G--){if(U=V[G][Z],U&&U.d&&U.d._pt){U=U.d._pt;while(U&&U.p!==Z&&U.fp!==Z)U=U._next}if(!U)return X5=1,$.vars[Z]="+=0",L5($,X),X5=0,H?K$(Z+" not eligible for reset. Try splitting into individual properties"):1;q.push(U)}}G=q.length;while(G--)F=q[G],U=F._pt||F,U.s=(K||K===0)&&!W?K:U.s+(K||0)+Y*U.c,U.c=Q-U.s,F.e&&(F.e=M8(Q)+m8(F.e)),F.b&&(F.b=U.s+m8(F.b))},kU=function($,Z){var Q=$[0]?WJ($[0]).harness:0,K=Q&&Q.aliases,W,Y,X,H;if(!K)return Z;W=E7({},Z);for(Y in K)if(Y in W){H=K[Y].split(","),X=H.length;while(X--)W[H[X]]=W[Y]}return W},PU=function($,Z,Q,K){var W=Z.ease||K||"power1.inOut",Y,X;if(n8(Z))X=Q[$]||(Q[$]=[]),Z.forEach(function(H,q){return X.push({t:q/(Z.length-1)*100,v:H,e:W})});else for(Y in Z)X=Q[Y]||(Q[Y]=[]),Y==="ease"||X.push({t:parseFloat($),v:Z[Y],e:W})},Z$=function($,Z,Q,K,W){return A8($)?$.call(Z,Q,K,W):x8($)&&~$.indexOf("random(")?z7($):$},LW=O5+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",CW={};r8(LW+",id,stagger,delay,duration,paused,scrollTrigger",function(J){return CW[J]=1});var S8=function(J){rK($,J);function $(Q,K,W,Y){var X;if(typeof K==="number")W.duration=K,K=W,W=null;X=J.call(this,Y?K:J$(K))||this;var H=X.vars,q=H.duration,U=H.delay,F=H.immediateRender,V=H.stagger,G=H.overwrite,N=H.keyframes,E=H.defaults,O=H.scrollTrigger,D=K.parent||I8,R=(n8(Q)||tK(Q)?s9(Q[0]):("length"in K))?[Q]:N9(Q),B,z,C,L,A,_,I,k;if(X._targets=R.length?D5(R):K$("GSAP target "+Q+" not found. https://gsap.com",!Z9.nullTargetWarn)||[],X._ptLookup=[],X._overwrite=G,N||V||GZ(q)||GZ(U)){K=X.vars;var b=K.easeReverse||K.yoyoEase;if(B=X.timeline=new c8({data:"nested",defaults:E||{},targets:D&&D.data==="nested"?D.vars.targets:R}),B.kill(),B.parent=B._dp=c9(X),B._start=0,V||GZ(q)||GZ(U)){if(L=R.length,I=V&&VW(V),j9(V)){for(A in V)if(~LW.indexOf(A))k||(k={}),k[A]=V[A]}for(z=0;z<L;z++){if(C=BZ(K,CW),C.stagger=0,b&&(C.easeReverse=b),k&&E7(C,k),_=R[z],C.duration=+Z$(q,c9(X),z,_,R),C.delay=(+Z$(U,c9(X),z,_,R)||0)-X._delay,!V&&L===1&&C.delay)X._delay=U=C.delay,X._start+=U,C.delay=0;B.to(_,C,I?I(z,_,R):0),B._ease=J8.none}B.duration()?q=U=0:X.timeline=0}else if(N){J$(Q9(B.vars.defaults,{ease:"none"})),B._ease=kJ(N.ease||K.ease||"none");var n=0,r,y,h;if(n8(N))N.forEach(function(m){return B.to(R,m,">")}),B.duration();else{C={};for(A in N)A==="ease"||A==="easeEach"||PU(A,N[A],C,N.easeEach);for(A in C){r=C[A].sort(function(m,i){return m.t-i.t}),n=0;for(z=0;z<r.length;z++)y=r[z],h={ease:y.e,duration:(y.t-(z?r[z-1].t:0))/100*q},h[A]=y.v,B.to(R,h,n),n+=h.duration}B.duration()<q&&B.to({},{duration:q-B.duration()})}}q||X.duration(q=B.duration())}else X.timeline=0;if(G===!0&&!H5)QJ=c9(X),I8.killTweensOf(R),QJ=0;if(T9(D,c9(X),W),K.reversed&&X.reverse(),K.paused&&X.paused(!0),F||!q&&!N&&X._start===z8(D._time)&&$9(F)&&QU(c9(X))&&D.data!=="nested")X._tTime=-H8,X.render(Math.max(0,-U)||0);return O&&HW(c9(X),O),X}var Z=$.prototype;return Z.render=function(K,W,Y){var X=this._time,H=this._tDur,q=this._dur,U=K<0,F=K>H-H8&&!U?H:K<H8?0:K,V,G,N,E,O,D,R,B;if(!q)WU(this,K,W,Y);else if(F!==this._tTime||!K||Y||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==U||this._lazy){if(V=F,B=this.timeline,this._repeat){if(E=q+this._rDelay,this._repeat<-1&&U)return this.totalTime(E*100+K,W,Y);if(V=z8(F%E),F===H)N=this._repeat,V=q;else if(O=z8(F/E),N=~~O,N&&N===O)V=q,N--;else if(V>q)V=q;if(D=this._yoyo&&N&1,D)V=q-V;if(O=N7(this._tTime,E),V===X&&!Y&&this._initted&&N===O)return this._tTime=F,this;if(N!==O){if(this.vars.repeatRefresh&&!D&&!this._lock&&V!==E&&this._initted)this._lock=Y=1,this.render(z8(E*N),!0).invalidate()._lock=0}}if(!this._initted){if(qW(this,U?K:V,Y,W,F))return this._tTime=0,this;if(X!==this._time&&!(Y&&this.vars.repeatRefresh&&N!==O))return this;if(q!==this._dur)return this.render(K,W,Y)}if(this._rEase){var z=V<X;if(z!==this._inv){var C=z?X:q-X;if(this._inv=z,this._from)this.ratio=1-this.ratio;this._invRatio=this.ratio,this._invTime=X,this._invRecip=C?(z?-1:1)/C:0,this._invScale=z?-this.ratio:1-this.ratio,this._invEase=z?this._rEase:this._ease}this.ratio=R=this._invRatio+this._invScale*this._invEase((V-this._invTime)*this._invRecip)}else this.ratio=R=this._ease(V/q);if(this._from)this.ratio=R=1-R;if(this._tTime=F,this._time=V,!this._act&&this._ts)this._act=1,this._lazy=0;if(!X&&F&&!W&&!O){if(q9(this,"onStart"),this._tTime!==F)return this}G=this._pt;while(G)G.r(R,G.d),G=G._next;if(B&&B.render(K<0?K:B._dur*B._ease(V/this._dur),W,Y)||this._startAt&&(this._zTime=K),this._onUpdate&&!W)U&&$5(this,K,W,Y),q9(this,"onUpdate");if(this._repeat&&N!==O&&this.vars.onRepeat&&!W&&this.parent&&q9(this,"onRepeat"),(F===this._tDur||!F)&&this._tTime===F){if(U&&!this._onUpdate&&$5(this,K,!0,!0),(K||!q)&&(F===this._tDur&&this._ts>0||!F&&this._ts<0)&&XJ(this,1),!W&&!(U&&!X)&&(F||X||D))q9(this,F===H?"onComplete":"onReverseComplete",!0),this._prom&&!(F<H&&this.timeScale()>0)&&this._prom()}}return this},Z.targets=function(){return this._targets},Z.invalidate=function(K){return(!K||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(K),J.prototype.invalidate.call(this,K)},Z.resetTo=function(K,W,Y,X,H){X$||J9.wake(),this._ts||this.play();var q=Math.min(this._dur,(this._dp._time-this._start)*this._ts),U;if(this._initted||L5(this,q),U=this._ease(q/this._dur),MU(this,K,W,Y,X,U,q,H))return this.resetTo(K,W,Y,X,1);return MZ(this,0),this.parent||XW(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0)},Z.kill=function(K,W){if(W===void 0)W="all";if(!K&&(!W||W==="all"))return this._lazy=this._pt=0,this.parent?t7(this):this.scrollTrigger&&this.scrollTrigger.kill(!!g8),this;if(this.timeline){var Y=this.timeline.totalDuration();return this.timeline.killTweensOf(K,W,QJ&&QJ.vars.overwrite!==!0)._first||t7(this),this.parent&&Y!==this.timeline.totalDuration()&&R7(this,this._dur*this.timeline._tDur/Y,0,1),this}var X=this._targets,H=K?N9(K):X,q=this._ptLookup,U=this._pt,F,V,G,N,E,O,D;if((!W||W==="all")&&$U(X,H))return W==="all"&&(this._pt=0),t7(this);if(F=this._op=this._op||[],W!=="all"){if(x8(W))E={},r8(W,function(R){return E[R]=1}),W=E;W=kU(X,W)}D=X.length;while(D--)if(~H.indexOf(X[D])){if(V=q[D],W==="all")F[D]=W,N=V,G={};else G=F[D]=F[D]||{},N=W;for(E in N){if(O=V&&V[E],O){if(!("kill"in O.d)||O.d.kill(E)===!0)H$(this,O,"_pt");delete V[E]}if(G!=="all")G[E]=1}}return this._initted&&!this._pt&&U&&t7(this),this},$.to=function(K,W){return new $(K,W,arguments[2])},$.from=function(K,W){return $$(1,arguments)},$.delayedCall=function(K,W,Y,X){return new $(W,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:K,onComplete:W,onReverseComplete:W,onCompleteParams:Y,onReverseCompleteParams:Y,callbackScope:X})},$.fromTo=function(K,W,Y){return $$(2,arguments)},$.set=function(K,W){return W.duration=0,W.repeatDelay||(W.repeat=0),new $(K,W)},$.killTweensOf=function(K,W,Y){return I8.killTweensOf(K,W,Y)},$}(Y$);Q9(S8.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});r8("staggerTo,staggerFrom,staggerFromTo",function(J){S8[J]=function(){var $=new c8,Z=Q5.call(arguments,0);return Z.splice(J==="staggerFromTo"?5:4,0,0),$[J].apply($,Z)}});var C5=function($,Z,Q){return $[Z]=Q},AW=function($,Z,Q){return $[Z](Q)},SU=function($,Z,Q,K){return $[Z](K.fp,Q)},wU=function($,Z,Q){return $.setAttribute(Z,Q)},kZ=function($,Z){return A8($[Z])?AW:LZ($[Z])&&$.setAttribute?wU:C5},MW=function($,Z){return Z.set(Z.t,Z.p,Math.round((Z.s+Z.c*$)*1e6)/1e6,Z)},_U=function($,Z){return Z.set(Z.t,Z.p,!!(Z.s+Z.c*$),Z)},A5=function($,Z){var Q=Z._pt,K="";if(!$&&Z.b)K=Z.b;else if($===1&&Z.e)K=Z.e;else{while(Q)K=Q.p+(Q.m?Q.m(Q.s+Q.c*$):Math.round((Q.s+Q.c*$)*1e4)/1e4)+K,Q=Q._next;K+=Z.c}Z.set(Z.t,Z.p,K,Z)},M5=function($,Z){var Q=Z._pt;while(Q)Q.r($,Q.d),Q=Q._next},TU=function($,Z,Q,K){var W=this._pt,Y;while(W)Y=W._next,W.p===K&&W.modifier($,Z,Q),W=Y},jU=function($){var Z=this._pt,Q,K;while(Z){if(K=Z._next,Z.p===$&&!Z.op||Z.op===$)H$(this,Z,"_pt");else if(!Z.dep)Q=1;Z=K}return!Q},yU=function($,Z,Q,K){K.mSet($,Z,K.m.call(K.tween,Q,K.mt),K)},k5=function($){var Z=$._pt,Q,K,W,Y;while(Z){Q=Z._next,K=W;while(K&&K.pr>Z.pr)K=K._next;if(Z._prev=K?K._prev:Y)Z._prev._next=Z;else W=Z;if(Z._next=K)K._prev=Z;else Y=Z;Z=Q}$._pt=W},a8=function(){function J(Z,Q,K,W,Y,X,H,q,U){if(this.t=Q,this.s=W,this.c=Y,this.p=K,this.r=X||MW,this.d=H||this,this.set=q||C5,this.pr=U||0,this._next=Z,Z)Z._prev=this}var $=J.prototype;return $.modifier=function(Q,K,W){this.mSet=this.mSet||this.set,this.set=yU,this.m=Q,this.mt=W,this.tween=K},J}();r8(O5+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(J){return G5[J]=1});U9.TweenMax=U9.TweenLite=S8;U9.TimelineLite=U9.TimelineMax=c8;I8=new c8({sortChildren:!1,defaults:Q$,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Z9.stringFilter=R5;var PJ=[],EZ={},xU=[],oK=0,bU=0,rQ=function($){return(EZ[$]||xU).map(function(Z){return Z()})},Y5=function(){var $=Date.now(),Z=[];if($-oK>2)rQ("matchMediaInit"),PJ.forEach(function(Q){var{queries:K,conditions:W}=Q,Y,X,H,q;for(X in K)if(Y=_9.matchMedia(K[X]).matches,Y&&(H=1),Y!==W[X])W[X]=Y,q=1;if(q)Q.revert(),H&&Z.push(Q)}),rQ("matchMediaRevert"),Z.forEach(function(Q){return Q.onMatch(Q,function(K){return Q.add(null,K)})}),oK=$,rQ("matchMedia")},kW=function(){function J(Z,Q){this.selector=Q&&K5(Q),this.data=[],this._r=[],this.isReverted=!1,this.id=bU++,Z&&this.add(Z)}var $=J.prototype;return $.add=function(Q,K,W){if(A8(Q))W=K,K=Q,Q=A8;var Y=this,X=function(){var q=N8,U=Y.selector,F;return q&&q!==Y&&q.data.push(Y),W&&(Y.selector=K5(W)),N8=Y,F=K.apply(Y,arguments),A8(F)&&Y._r.push(F),N8=q,Y.selector=U,Y.isReverted=!1,F};return Y.last=X,Q===A8?X(Y,function(H){return Y.add(null,H)}):Q?Y[Q]=X:X},$.ignore=function(Q){var K=N8;N8=null,Q(this),N8=K},$.getTweens=function(){var Q=[];return this.data.forEach(function(K){return K instanceof J?Q.push.apply(Q,K.getTweens()):K instanceof S8&&!(K.parent&&K.parent.data==="nested")&&Q.push(K)}),Q},$.clear=function(){this._r.length=this.data.length=0},$.kill=function(Q,K){var W=this;if(Q)(function(){var X=W.getTweens(),H=W.data.length,q;while(H--)if(q=W.data[H],q.data==="isFlip")q.revert(),q.getChildren(!0,!0,!1).forEach(function(U){return X.splice(X.indexOf(U),1)});X.map(function(U){return{g:U._dur||U._delay||U._sat&&!U._sat.vars.immediateRender?U.globalTime(0):-1/0,t:U}}).sort(function(U,F){return F.g-U.g||-1/0}).forEach(function(U){return U.t.revert(Q)}),H=W.data.length;while(H--)if(q=W.data[H],q instanceof c8){if(q.data!=="nested")q.scrollTrigger&&q.scrollTrigger.revert(),q.kill()}else!(q instanceof S8)&&q.revert&&q.revert(Q);W._r.forEach(function(U){return U(Q,W)}),W.isReverted=!0})();else this.data.forEach(function(X){return X.kill&&X.kill()});if(this.clear(),K){var Y=PJ.length;while(Y--)PJ[Y].id===this.id&&PJ.splice(Y,1)}},$.revert=function(Q){this.kill(Q||{})},J}(),fU=function(){function J(Z){this.contexts=[],this.scope=Z,N8&&N8.data.push(this)}var $=J.prototype;return $.add=function(Q,K,W){j9(Q)||(Q={matches:Q});var Y=new kW(0,W||this.scope),X=Y.conditions={},H,q,U;N8&&!Y.selector&&(Y.selector=N8.selector),this.contexts.push(Y),K=Y.add("onMatch",K),Y.queries=Q;for(q in Q)if(q==="all")U=1;else if(H=_9.matchMedia(Q[q]),H)PJ.indexOf(Y)<0&&PJ.push(Y),(X[q]=H.matches)&&(U=1),H.addListener?H.addListener(Y5):H.addEventListener("change",Y5);return U&&K(Y,function(F){return Y.add(null,F)}),this},$.revert=function(Q){this.kill(Q||{})},$.kill=function(Q){this.contexts.forEach(function(K){return K.kill(Q,!0)})},J}(),IZ={registerPlugin:function(){for(var $=arguments.length,Z=Array($),Q=0;Q<$;Q++)Z[Q]=arguments[Q];Z.forEach(function(K){return RW(K)})},timeline:function($){return new c8($)},getTweensOf:function($,Z){return I8.getTweensOf($,Z)},getProperty:function($,Z,Q,K){x8($)&&($=N9($)[0]);var W=WJ($||{}).get,Y=Q?WW:KW;return Q==="native"&&(Q=""),!$?$:!Z?function(X,H,q){return Y((e8[X]&&e8[X].get||W)($,X,H,q))}:Y((e8[Z]&&e8[Z].get||W)($,Z,Q,K))},quickSetter:function($,Z,Q){if($=N9($),$.length>1){var K=$.map(function(U){return s8.quickSetter(U,Z,Q)}),W=K.length;return function(U){var F=W;while(F--)K[F](U)}}$=$[0]||{};var Y=e8[Z],X=WJ($),H=X.harness&&(X.harness.aliases||{})[Z]||Z,q=Y?function(U){var F=new Y;D7._pt=0,F.init($,Q?U+Q:U,D7,0,[$]),F.render(1,F),D7._pt&&M5(1,D7)}:X.set($,H);return Y?q:function(U){return q($,H,Q?U+Q:U,X,1)}},quickTo:function($,Z,Q){var K,W=s8.to($,Q9((K={},K[Z]="+=0.1",K.paused=!0,K.stagger=0,K),Q||{})),Y=function(H,q,U){return W.resetTo(Z,H,q,U)};return Y.tween=W,Y},isTweening:function($){return I8.getTweensOf($,!0).length>0},defaults:function($){return $&&$.ease&&($.ease=kJ($.ease,Q$.ease)),lK(Q$,$||{})},config:function($){return lK(Z9,$||{})},registerEffect:function($){var{name:Z,effect:Q,plugins:K,defaults:W,extendTimeline:Y}=$;if((K||"").split(",").forEach(function(X){return X&&!e8[X]&&!U9[X]&&K$(Z+" effect requires "+X+" plugin.")}),nQ[Z]=function(X,H,q){return Q(N9(X),Q9(H||{},W),q)},Y)c8.prototype[Z]=function(X,H,q){return this.add(nQ[Z](X,j9(H)?H:(q=H)&&{},this),q)}},registerEase:function($,Z){J8[$]=kJ(Z)},parseEase:function($,Z){return arguments.length?kJ($,Z):J8},getById:function($){return I8.getById($)},exportRoot:function($,Z){if($===void 0)$={};var Q=new c8($),K,W;Q.smoothChildTiming=$9($.smoothChildTiming),I8.remove(Q),Q._dp=0,Q._time=Q._tTime=I8._time,K=I8._first;while(K){if(W=K._next,Z||!(!K._dur&&K instanceof S8&&K.vars.onComplete===K._targets[0]))T9(Q,K,K._start-K._delay);K=W}return T9(I8,Q,0),Q},context:function($,Z){return $?new kW($,Z):N8},matchMedia:function($){return new fU($)},matchMediaRefresh:function(){return PJ.forEach(function($){var Z=$.conditions,Q,K;for(K in Z)if(Z[K])Z[K]=!1,Q=1;Q&&$.revert()})||Y5()},addEventListener:function($,Z){var Q=EZ[$]||(EZ[$]=[]);~Q.indexOf(Z)||Q.push(Z)},removeEventListener:function($,Z){var Q=EZ[$],K=Q&&Q.indexOf(Z);K>=0&&Q.splice(K,1)},utils:{wrap:GU,wrapYoyo:OU,distribute:VW,random:OW,snap:GW,normalize:VU,getUnit:m8,clamp:HU,splitColor:BW,toArray:N9,selector:K5,mapRange:EW,pipe:UU,unitize:FU,interpolate:DU,shuffle:FW},install:JW,effects:nQ,ticker:J9,updateRoot:c8.updateRoot,plugins:e8,globalTimeline:I8,core:{PropTween:a8,globals:$W,Tween:S8,Timeline:c8,Animation:Y$,getCache:WJ,_removeLinkedListItem:H$,reverting:function(){return g8},context:function($){if($&&N8)N8.data.push($),$._ctx=N8;return N8},suppressOverwrites:function($){return H5=$}}};r8("to,from,fromTo,delayedCall,set,killTweensOf",function(J){return IZ[J]=S8[J]});J9.add(c8.updateRoot);D7=IZ.to({},{duration:0});var hU=function($,Z){var Q=$._pt;while(Q&&Q.p!==Z&&Q.op!==Z&&Q.fp!==Z)Q=Q._next;return Q},vU=function($,Z){var Q=$._targets,K,W,Y;for(K in Z){W=Q.length;while(W--)if(Y=$._ptLookup[W][K],Y&&(Y=Y.d)){if(Y._pt)Y=hU(Y,K);Y&&Y.modifier&&Y.modifier(Z[K],$,Q[W],K)}}},aQ=function($,Z){return{name:$,headless:1,rawVars:1,init:function(K,W,Y){Y._onInit=function(X){var H,q;if(x8(W))H={},r8(W,function(U){return H[U]=1}),W=H;if(Z){H={};for(q in W)H[q]=Z(W[q]);W=H}vU(X,W)}}}},s8=IZ.registerPlugin({name:"attr",init:function($,Z,Q,K,W){var Y,X,H;this.tween=Q;for(Y in Z)H=$.getAttribute(Y)||"",X=this.add($,"setAttribute",(H||0)+"",Z[Y],K,W,0,0,Y),X.op=Y,X.b=H,this._props.push(Y)},render:function($,Z){var Q=Z._pt;while(Q)g8?Q.set(Q.t,Q.p,Q.b,Q):Q.r($,Q.d),Q=Q._next}},{name:"endArray",headless:1,init:function($,Z){var Q=Z.length;while(Q--)this.add($,Q,$[Q]||0,Z[Q],0,0,0,0,0,1)}},aQ("roundProps",W5),aQ("modifiers"),aQ("snap",GW))||IZ;S8.version=c8.version=s8.version="3.15.0";eK=1;q5()&&B7();var{Power0:gU,Power1:mU,Power2:uU,Power3:dU,Power4:pU,Linear:lU,Quad:cU,Cubic:nU,Quart:sU,Quint:iU,Strong:oU,Elastic:rU,Back:aU,SteppedEase:tU,Bounce:eU,Sine:JF,Expo:$F,Circ:ZF}=J8;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var PW,HJ,L7,j5,xJ,QF,SW,y5,KF=function(){return typeof window<"u"},o9={},yJ=180/Math.PI,C7=Math.PI/180,I7=Math.atan2,wW=1e8,x5=/([A-Z])/g,WF=/(left|right|width|margin|padding|x)/i,XF=/[\s,\(]\S/,y9={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},S5=function($,Z){return Z.set(Z.t,Z.p,Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u,Z)},YF=function($,Z){return Z.set(Z.t,Z.p,$===1?Z.e:Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u,Z)},HF=function($,Z){return Z.set(Z.t,Z.p,$?Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u:Z.b,Z)},qF=function($,Z){return Z.set(Z.t,Z.p,$===1?Z.e:$?Math.round((Z.s+Z.c*$)*1e4)/1e4+Z.u:Z.b,Z)},UF=function($,Z){var Q=Z.s+Z.c*$;Z.set(Z.t,Z.p,~~(Q+(Q<0?-0.5:0.5))+Z.u,Z)},hW=function($,Z){return Z.set(Z.t,Z.p,$?Z.e:Z.b,Z)},vW=function($,Z){return Z.set(Z.t,Z.p,$!==1?Z.b:Z.e,Z)},FF=function($,Z,Q){return $.style[Z]=Q},VF=function($,Z,Q){return $.style.setProperty(Z,Q)},GF=function($,Z,Q){return $._gsap[Z]=Q},OF=function($,Z,Q){return $._gsap.scaleX=$._gsap.scaleY=Q},DF=function($,Z,Q,K,W){var Y=$._gsap;Y.scaleX=Y.scaleY=Q,Y.renderTransform(W,Y)},EF=function($,Z,Q,K,W){var Y=$._gsap;Y[Z]=Q,Y.renderTransform(W,Y)},L8="transform",K9=L8+"Origin",NF=function J($,Z){var Q=this,K=this.target,W=K.style,Y=K._gsap;if($ in o9&&W){if(this.tfm=this.tfm||{},$!=="transform")$=y9[$]||$,~$.indexOf(",")?$.split(",").forEach(function(X){return Q.tfm[X]=i9(K,X)}):this.tfm[$]=Y.x?Y[$]:i9(K,$),$===K9&&(this.tfm.zOrigin=Y.zOrigin);else return y9.transform.split(",").forEach(function(X){return J.call(Q,X,Z)});if(this.props.indexOf(L8)>=0)return;if(Y.svg)this.svgo=K.getAttribute("data-svg-origin"),this.props.push(K9,Z,"");$=L8}(W||Z)&&this.props.push($,Z,W[$])},gW=function($){if($.translate)$.removeProperty("translate"),$.removeProperty("scale"),$.removeProperty("rotate")},RF=function(){var $=this.props,Z=this.target,Q=Z.style,K=Z._gsap,W,Y;for(W=0;W<$.length;W+=3)if(!$[W+1])$[W+2]?Q[$[W]]=$[W+2]:Q.removeProperty($[W].substr(0,2)==="--"?$[W]:$[W].replace(x5,"-$1").toLowerCase());else if($[W+1]===2)Z[$[W]]($[W+2]);else Z[$[W]]=$[W+2];if(this.tfm){for(Y in this.tfm)K[Y]=this.tfm[Y];if(K.svg)K.renderTransform(),Z.setAttribute("data-svg-origin",this.svgo||"");if(W=y5(),(!W||!W.isStart)&&!Q[L8]){if(gW(Q),K.zOrigin&&Q[K9])Q[K9]+=" "+K.zOrigin+"px",K.zOrigin=0,K.renderTransform();K.uncache=1}}},mW=function($,Z){var Q={target:$,props:[],revert:RF,save:NF};return $._gsap||s8.core.getCache($),Z&&$.style&&$.nodeType&&Z.split(",").forEach(function(K){return Q.save(K)}),Q},uW,w5=function($,Z){var Q=HJ.createElementNS?HJ.createElementNS((Z||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),$):HJ.createElement($);return Q&&Q.style?Q:HJ.createElement($)},F9=function J($,Z,Q){var K=getComputedStyle($);return K[Z]||K.getPropertyValue(Z.replace(x5,"-$1").toLowerCase())||K.getPropertyValue(Z)||!Q&&J($,A7(Z)||Z,1)||""},_W="O,Moz,ms,Ms,Webkit".split(","),A7=function($,Z,Q){var K=Z||xJ,W=K.style,Y=5;if($ in W&&!Q)return $;$=$.charAt(0).toUpperCase()+$.substr(1);while(Y--&&!(_W[Y]+$ in W));return Y<0?null:(Y===3?"ms":Y>=0?_W[Y]:"")+$},_5=function(){if(KF()&&window.document)PW=window,HJ=PW.document,L7=HJ.documentElement,xJ=w5("div")||{style:{}},QF=w5("div"),L8=A7(L8),K9=L8+"Origin",xJ.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",uW=!!A7("perspective"),y5=s8.core.reverting,j5=1},TW=function($){var Z=$.ownerSVGElement,Q=w5("svg",Z&&Z.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),K=$.cloneNode(!0),W;K.style.display="block",Q.appendChild(K),L7.appendChild(Q);try{W=K.getBBox()}catch(Y){}return Q.removeChild(K),L7.removeChild(Q),W},jW=function($,Z){var Q=Z.length;while(Q--)if($.hasAttribute(Z[Q]))return $.getAttribute(Z[Q])},dW=function($){var Z,Q;try{Z=$.getBBox()}catch(K){Z=TW($),Q=1}return Z&&(Z.width||Z.height)||Q||(Z=TW($)),Z&&!Z.width&&!Z.x&&!Z.y?{x:+jW($,["x","cx","x1"])||0,y:+jW($,["y","cy","y1"])||0,width:0,height:0}:Z},pW=function($){return!!($.getCTM&&(!$.parentNode||$.ownerSVGElement)&&dW($))},UJ=function($,Z){if(Z){var Q=$.style,K;if(Z in o9&&Z!==K9)Z=L8;if(Q.removeProperty){if(K=Z.substr(0,2),K==="ms"||Z.substr(0,6)==="webkit")Z="-"+Z;Q.removeProperty(K==="--"?Z:Z.replace(x5,"-$1").toLowerCase())}else Q.removeAttribute(Z)}},qJ=function($,Z,Q,K,W,Y){var X=new a8($._pt,Z,Q,0,1,Y?vW:hW);return $._pt=X,X.b=K,X.e=W,$._props.push(Q),X},yW={deg:1,rad:1,turn:1},BF={grid:1,flex:1},FJ=function J($,Z,Q,K){var W=parseFloat(Q)||0,Y=(Q+"").trim().substr((W+"").length)||"px",X=xJ.style,H=WF.test(Z),q=$.tagName.toLowerCase()==="svg",U=(q?"client":"offset")+(H?"Width":"Height"),F=100,V=K==="px",G=K==="%",N,E,O,D;if(K===Y||!W||yW[K]||yW[Y])return W;if(Y!=="px"&&!V&&(W=J($,Z,Q,"px")),D=$.getCTM&&pW($),(G||Y==="%")&&(o9[Z]||~Z.indexOf("adius")))return N=D?$.getBBox()[H?"width":"height"]:$[U],M8(G?W/N*F:W/100*N);if(X[H?"width":"height"]=F+(V?Y:K),E=K!=="rem"&&~Z.indexOf("adius")||K==="em"&&$.appendChild&&!q?$:$.parentNode,D)E=($.ownerSVGElement||{}).parentNode;if(!E||E===HJ||!E.appendChild)E=HJ.body;if(O=E._gsap,O&&G&&O.width&&H&&O.time===J9.time&&!O.uncache)return M8(W/O.width*F);else{if(G&&(Z==="height"||Z==="width")){var R=$.style[Z];$.style[Z]=F+K,N=$[U],R?$.style[Z]=R:UJ($,Z)}else(G||Y==="%")&&!BF[F9(E,"display")]&&(X.position=F9($,"position")),E===$&&(X.position="static"),E.appendChild(xJ),N=xJ[U],E.removeChild(xJ),X.position="absolute";if(H&&G)O=WJ(E),O.time=J9.time,O.width=E[U]}return M8(V?N*W/F:N&&W?F/N*W:0)},i9=function($,Z,Q,K){var W;if(j5||_5(),Z in y9&&Z!=="transform"){if(Z=y9[Z],~Z.indexOf(","))Z=Z.split(",")[0]}if(o9[Z]&&Z!=="transform")W=V$($,K),W=Z!=="transformOrigin"?W[Z]:W.svg?W.origin:SZ(F9($,K9))+" "+W.zOrigin+"px";else if(W=$.style[Z],!W||W==="auto"||K||~(W+"").indexOf("calc("))W=PZ[Z]&&PZ[Z]($,Z,Q)||F9($,Z)||E5($,Z)||(Z==="opacity"?1:0);return Q&&!~(W+"").trim().indexOf(" ")?FJ($,Z,W,Q)+Q:W},zF=function($,Z,Q,K){if(!Q||Q==="none"){var W=A7(Z,$,1),Y=W&&F9($,W,1);if(Y&&Y!==Q)Z=W,Q=Y;else if(Z==="borderColor")Q=F9($,"borderTopColor")}var X=new a8(this._pt,$.style,Z,0,1,A5),H=0,q=0,U,F,V,G,N,E,O,D,R,B,z,C;if(X.b=Q,X.e=K,Q+="",K+="",K.substring(0,6)==="var(--")K=F9($,K.substring(4,K.indexOf(")")));if(K==="auto")E=$.style[Z],$.style[Z]=K,K=F9($,Z)||K,E?$.style[Z]=E:UJ($,Z);if(U=[Q,K],R5(U),Q=U[0],K=U[1],V=Q.match(SJ)||[],C=K.match(SJ)||[],C.length){while(F=SJ.exec(K)){if(O=F[0],R=K.substring(H,F.index),N)N=(N+1)%5;else if(R.substr(-5)==="rgba("||R.substr(-5)==="hsla(")N=1;if(O!==(E=V[q++]||"")){if(G=parseFloat(E)||0,z=E.substr((G+"").length),O.charAt(1)==="="&&(O=wJ(G,O)+z),D=parseFloat(O),B=O.substr((D+"").length),H=SJ.lastIndex-B.length,!B){if(B=B||Z9.units[Z]||z,H===K.length)K+=B,X.e+=B}if(z!==B)G=FJ($,Z,E,B)||0;X._pt={_next:X._pt,p:R||q===1?R:",",s:G,c:D-G,m:N&&N<4||Z==="zIndex"?Math.round:0}}}X.c=H<K.length?K.substring(H,K.length):""}else X.r=Z==="display"&&K==="none"?vW:hW;return F5.test(K)&&(X.e=0),this._pt=X,X},xW={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},IF=function($){var Z=$.split(" "),Q=Z[0],K=Z[1]||"50%";if(Q==="top"||Q==="bottom"||K==="left"||K==="right")$=Q,Q=K,K=$;return Z[0]=xW[Q]||Q,Z[1]=xW[K]||K,Z.join(" ")},LF=function($,Z){if(Z.tween&&Z.tween._time===Z.tween._dur){var Q=Z.t,K=Q.style,W=Z.u,Y=Q._gsap,X,H,q;if(W==="all"||W===!0)K.cssText="",H=1;else{W=W.split(","),q=W.length;while(--q>-1){if(X=W[q],o9[X])H=1,X=X==="transformOrigin"?K9:L8;UJ(Q,X)}}if(H){if(UJ(Q,L8),Y)Y.svg&&Q.removeAttribute("transform"),K.scale=K.rotate=K.translate="none",V$(Q,1),Y.uncache=1,gW(K)}}},PZ={clearProps:function($,Z,Q,K,W){if(W.data!=="isFromStart"){var Y=$._pt=new a8($._pt,Z,Q,0,0,LF);return Y.u=K,Y.pr=-10,Y.tween=W,$._props.push(Q),1}}},F$=[1,0,0,1,0,0],lW={},cW=function($){return $==="matrix(1, 0, 0, 1, 0, 0)"||$==="none"||!$},bW=function($){var Z=F9($,L8);return cW(Z)?F$:Z.substr(7).match(U5).map(M8)},b5=function($,Z){var Q=$._gsap||WJ($),K=$.style,W=bW($),Y,X,H,q;if(Q.svg&&$.getAttribute("transform"))return H=$.transform.baseVal.consolidate().matrix,W=[H.a,H.b,H.c,H.d,H.e,H.f],W.join(",")==="1,0,0,1,0,0"?F$:W;else if(W===F$&&!$.offsetParent&&$!==L7&&!Q.svg){if(H=K.display,K.display="block",Y=$.parentNode,!Y||!$.offsetParent&&!$.getBoundingClientRect().width)q=1,X=$.nextElementSibling,L7.appendChild($);if(W=bW($),H?K.display=H:UJ($,"display"),q)X?Y.insertBefore($,X):Y?Y.appendChild($):L7.removeChild($)}return Z&&W.length>6?[W[0],W[1],W[4],W[5],W[12],W[13]]:W},T5=function($,Z,Q,K,W,Y){var X=$._gsap,H=W||b5($,!0),q=X.xOrigin||0,U=X.yOrigin||0,F=X.xOffset||0,V=X.yOffset||0,G=H[0],N=H[1],E=H[2],O=H[3],D=H[4],R=H[5],B=Z.split(" "),z=parseFloat(B[0])||0,C=parseFloat(B[1])||0,L,A,_,I;if(!Q)L=dW($),z=L.x+(~B[0].indexOf("%")?z/100*L.width:z),C=L.y+(~(B[1]||B[0]).indexOf("%")?C/100*L.height:C);else if(H!==F$&&(A=G*O-N*E))_=z*(O/A)+C*(-E/A)+(E*R-O*D)/A,I=z*(-N/A)+C*(G/A)-(G*R-N*D)/A,z=_,C=I;if(K||K!==!1&&X.smooth)D=z-q,R=C-U,X.xOffset=F+(D*G+R*E)-D,X.yOffset=V+(D*N+R*O)-R;else X.xOffset=X.yOffset=0;if(X.xOrigin=z,X.yOrigin=C,X.smooth=!!K,X.origin=Z,X.originIsAbsolute=!!Q,$.style[K9]="0px 0px",Y)qJ(Y,X,"xOrigin",q,z),qJ(Y,X,"yOrigin",U,C),qJ(Y,X,"xOffset",F,X.xOffset),qJ(Y,X,"yOffset",V,X.yOffset);$.setAttribute("data-svg-origin",z+" "+C)},V$=function($,Z){var Q=$._gsap||new B5($);if("x"in Q&&!Z&&!Q.uncache)return Q;var K=$.style,W=Q.scaleX<0,Y="px",X="deg",H=getComputedStyle($),q=F9($,K9)||"0",U,F,V,G,N,E,O,D,R,B,z,C,L,A,_,I,k,b,n,r,y,h,m,i,d,g,p,t,v,e,H0,V0;if(U=F=V=E=O=D=R=B=z=0,G=N=1,Q.svg=!!($.getCTM&&pW($)),H.translate){if(H.translate!=="none"||H.scale!=="none"||H.rotate!=="none")K[L8]=(H.translate!=="none"?"translate3d("+(H.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(H.rotate!=="none"?"rotate("+H.rotate+") ":"")+(H.scale!=="none"?"scale("+H.scale.split(" ").join(",")+") ":"")+(H[L8]!=="none"?H[L8]:"");K.scale=K.rotate=K.translate="none"}if(A=b5($,Q.svg),Q.svg){if(Q.uncache)d=$.getBBox(),q=Q.xOrigin-d.x+"px "+(Q.yOrigin-d.y)+"px",i="";else i=!Z&&$.getAttribute("data-svg-origin");T5($,i||q,!!i||Q.originIsAbsolute,Q.smooth!==!1,A)}if(C=Q.xOrigin||0,L=Q.yOrigin||0,A!==F$){if(b=A[0],n=A[1],r=A[2],y=A[3],U=h=A[4],F=m=A[5],A.length===6){if(G=Math.sqrt(b*b+n*n),N=Math.sqrt(y*y+r*r),E=b||n?I7(n,b)*yJ:0,R=r||y?I7(r,y)*yJ+E:0,R&&(N*=Math.abs(Math.cos(R*C7))),Q.svg)U-=C-(C*b+L*r),F-=L-(C*n+L*y)}else{if(V0=A[6],e=A[7],p=A[8],t=A[9],v=A[10],H0=A[11],U=A[12],F=A[13],V=A[14],_=I7(V0,v),O=_*yJ,_)I=Math.cos(-_),k=Math.sin(-_),i=h*I+p*k,d=m*I+t*k,g=V0*I+v*k,p=h*-k+p*I,t=m*-k+t*I,v=V0*-k+v*I,H0=e*-k+H0*I,h=i,m=d,V0=g;if(_=I7(-r,v),D=_*yJ,_)I=Math.cos(-_),k=Math.sin(-_),i=b*I-p*k,d=n*I-t*k,g=r*I-v*k,H0=y*k+H0*I,b=i,n=d,r=g;if(_=I7(n,b),E=_*yJ,_)I=Math.cos(_),k=Math.sin(_),i=b*I+n*k,d=h*I+m*k,n=n*I-b*k,m=m*I-h*k,b=i,h=d;if(O&&Math.abs(O)+Math.abs(E)>359.9)O=E=0,D=180-D;G=M8(Math.sqrt(b*b+n*n+r*r)),N=M8(Math.sqrt(m*m+V0*V0)),_=I7(h,m),R=Math.abs(_)>0.0002?_*yJ:0,z=H0?1/(H0<0?-H0:H0):0}if(Q.svg)i=$.getAttribute("transform"),Q.forceCSS=$.setAttribute("transform","")||!cW(F9($,L8)),i&&$.setAttribute("transform",i)}if(Math.abs(R)>90&&Math.abs(R)<270)if(W)G*=-1,R+=E<=0?180:-180,E+=E<=0?180:-180;else N*=-1,R+=R<=0?180:-180;if(Z=Z||Q.uncache,Q.x=U-((Q.xPercent=U&&(!Z&&Q.xPercent||(Math.round($.offsetWidth/2)===Math.round(-U)?-50:0)))?$.offsetWidth*Q.xPercent/100:0)+Y,Q.y=F-((Q.yPercent=F&&(!Z&&Q.yPercent||(Math.round($.offsetHeight/2)===Math.round(-F)?-50:0)))?$.offsetHeight*Q.yPercent/100:0)+Y,Q.z=V+Y,Q.scaleX=M8(G),Q.scaleY=M8(N),Q.rotation=M8(E)+X,Q.rotationX=M8(O)+X,Q.rotationY=M8(D)+X,Q.skewX=R+X,Q.skewY=B+X,Q.transformPerspective=z+Y,Q.zOrigin=parseFloat(q.split(" ")[2])||!Z&&Q.zOrigin||0)K[K9]=SZ(q);return Q.xOffset=Q.yOffset=0,Q.force3D=Z9.force3D,Q.renderTransform=Q.svg?AF:uW?nW:CF,Q.uncache=0,Q},SZ=function($){return($=$.split(" "))[0]+" "+$[1]},P5=function($,Z,Q){var K=m8(Z);return M8(parseFloat(Z)+parseFloat(FJ($,"x",Q+"px",K)))+K},CF=function($,Z){Z.z="0px",Z.rotationY=Z.rotationX="0deg",Z.force3D=0,nW($,Z)},TJ="0deg",U$="0px",jJ=") ",nW=function($,Z){var Q=Z||this,K=Q.xPercent,W=Q.yPercent,Y=Q.x,X=Q.y,H=Q.z,q=Q.rotation,U=Q.rotationY,F=Q.rotationX,V=Q.skewX,G=Q.skewY,N=Q.scaleX,E=Q.scaleY,O=Q.transformPerspective,D=Q.force3D,R=Q.target,B=Q.zOrigin,z="",C=D==="auto"&&$&&$!==1||D===!0;if(B&&(F!==TJ||U!==TJ)){var L=parseFloat(U)*C7,A=Math.sin(L),_=Math.cos(L),I;L=parseFloat(F)*C7,I=Math.cos(L),Y=P5(R,Y,A*I*-B),X=P5(R,X,-Math.sin(L)*-B),H=P5(R,H,_*I*-B+B)}if(O!==U$)z+="perspective("+O+jJ;if(K||W)z+="translate("+K+"%, "+W+"%) ";if(C||Y!==U$||X!==U$||H!==U$)z+=H!==U$||C?"translate3d("+Y+", "+X+", "+H+") ":"translate("+Y+", "+X+jJ;if(q!==TJ)z+="rotate("+q+jJ;if(U!==TJ)z+="rotateY("+U+jJ;if(F!==TJ)z+="rotateX("+F+jJ;if(V!==TJ||G!==TJ)z+="skew("+V+", "+G+jJ;if(N!==1||E!==1)z+="scale("+N+", "+E+jJ;R.style[L8]=z||"translate(0, 0)"},AF=function($,Z){var Q=Z||this,K=Q.xPercent,W=Q.yPercent,Y=Q.x,X=Q.y,H=Q.rotation,q=Q.skewX,U=Q.skewY,F=Q.scaleX,V=Q.scaleY,G=Q.target,N=Q.xOrigin,E=Q.yOrigin,O=Q.xOffset,D=Q.yOffset,R=Q.forceCSS,B=parseFloat(Y),z=parseFloat(X),C,L,A,_,I;if(H=parseFloat(H),q=parseFloat(q),U=parseFloat(U),U)U=parseFloat(U),q+=U,H+=U;if(H||q){if(H*=C7,q*=C7,C=Math.cos(H)*F,L=Math.sin(H)*F,A=Math.sin(H-q)*-V,_=Math.cos(H-q)*V,q){if(U*=C7,I=Math.tan(q-U),I=Math.sqrt(1+I*I),A*=I,_*=I,U)I=Math.tan(U),I=Math.sqrt(1+I*I),C*=I,L*=I}C=M8(C),L=M8(L),A=M8(A),_=M8(_)}else C=F,_=V,L=A=0;if(B&&!~(Y+"").indexOf("px")||z&&!~(X+"").indexOf("px"))B=FJ(G,"x",Y,"px"),z=FJ(G,"y",X,"px");if(N||E||O||D)B=M8(B+N-(N*C+E*A)+O),z=M8(z+E-(N*L+E*_)+D);if(K||W)I=G.getBBox(),B=M8(B+K/100*I.width),z=M8(z+W/100*I.height);I="matrix("+C+","+L+","+A+","+_+","+B+","+z+")",G.setAttribute("transform",I),R&&(G.style[L8]=I)},MF=function($,Z,Q,K,W){var Y=360,X=x8(W),H=parseFloat(W)*(X&&~W.indexOf("rad")?yJ:1),q=H-K,U=K+q+"deg",F,V;if(X){if(F=W.split("_")[1],F==="short"){if(q%=Y,q!==q%(Y/2))q+=q<0?Y:-Y}if(F==="cw"&&q<0)q=(q+Y*wW)%Y-~~(q/Y)*Y;else if(F==="ccw"&&q>0)q=(q-Y*wW)%Y-~~(q/Y)*Y}return $._pt=V=new a8($._pt,Z,Q,K,q,YF),V.e=U,V.u="deg",$._props.push(Q),V},fW=function($,Z){for(var Q in Z)$[Q]=Z[Q];return $},kF=function($,Z,Q){var K=fW({},Q._gsap),W="perspective,force3D,transformOrigin,svgOrigin",Y=Q.style,X,H,q,U,F,V,G,N;if(K.svg)q=Q.getAttribute("transform"),Q.setAttribute("transform",""),Y[L8]=Z,X=V$(Q,1),UJ(Q,L8),Q.setAttribute("transform",q);else q=getComputedStyle(Q)[L8],Y[L8]=Z,X=V$(Q,1),Y[L8]=q;for(H in o9)if(q=K[H],U=X[H],q!==U&&W.indexOf(H)<0)G=m8(q),N=m8(U),F=G!==N?FJ(Q,H,q,N):parseFloat(q),V=parseFloat(U),$._pt=new a8($._pt,X,H,F,V-F,S5),$._pt.u=N||0,$._props.push(H);fW(X,K)};r8("padding,margin,Width,Radius",function(J,$){var Z="Top",Q="Right",K="Bottom",W="Left",Y=($<3?[Z,Q,K,W]:[Z+W,Z+Q,K+Q,K+W]).map(function(X){return $<2?J+X:"border"+X+J});PZ[$>1?"border"+J:J]=function(X,H,q,U,F){var V,G;if(arguments.length<4)return V=Y.map(function(N){return i9(X,N,q)}),G=V.join(" "),G.split(V[0]).length===5?V[0]:G;V=(U+"").split(" "),G={},Y.forEach(function(N,E){return G[N]=V[E]=V[E]||V[(E-1)/2|0]}),X.init(H,G,F)}});var f5={name:"css",register:_5,targetTest:function($){return $.style&&$.nodeType},init:function($,Z,Q,K,W){var Y=this._props,X=$.style,H=Q.vars.startAt,q,U,F,V,G,N,E,O,D,R,B,z,C,L,A,_,I;j5||_5(),this.styles=this.styles||mW($),_=this.styles.props,this.tween=Q;for(E in Z){if(E==="autoRound")continue;if(U=Z[E],e8[E]&&I5(E,Z,Q,K,$,W))continue;if(G=typeof U,N=PZ[E],G==="function")U=U.call(Q,K,$,W),G=typeof U;if(G==="string"&&~U.indexOf("random("))U=z7(U);if(N)N(this,$,E,U,Q)&&(A=1);else if(E.substr(0,2)==="--"){if(q=(getComputedStyle($).getPropertyValue(E)+"").trim(),U+="",n9.lastIndex=0,!n9.test(q))O=m8(q),D=m8(U),D?O!==D&&(q=FJ($,E,q,D)+D):O&&(U+=O);this.add(X,"setProperty",q,U,K,W,0,0,E),Y.push(E),_.push(E,0,X[E])}else if(G!=="undefined"){if(H&&E in H)q=typeof H[E]==="function"?H[E].call(Q,K,$,W):H[E],x8(q)&&~q.indexOf("random(")&&(q=z7(q)),m8(q+"")||q==="auto"||(q+=Z9.units[E]||m8(i9($,E))||""),(q+"").charAt(1)==="="&&(q=i9($,E));else q=i9($,E);if(V=parseFloat(q),R=G==="string"&&U.charAt(1)==="="&&U.substr(0,2),R&&(U=U.substr(2)),F=parseFloat(U),E in y9){if(E==="autoAlpha"){if(V===1&&i9($,"visibility")==="hidden"&&F)V=0;_.push("visibility",0,X.visibility),qJ(this,X,"visibility",V?"inherit":"hidden",F?"inherit":"hidden",!F)}if(E!=="scale"&&E!=="transform")E=y9[E],~E.indexOf(",")&&(E=E.split(",")[0])}if(B=E in o9,B){if(this.styles.save(E),I=U,G==="string"&&U.substring(0,6)==="var(--"){if(U=F9($,U.substring(4,U.indexOf(")"))),U.substring(0,5)==="calc("){var k=$.style.perspective;$.style.perspective=U,U=F9($,"perspective"),k?$.style.perspective=k:UJ($,"perspective")}F=parseFloat(U)}if(!z)C=$._gsap,C.renderTransform&&!Z.parseTransform||V$($,Z.parseTransform),L=Z.smoothOrigin!==!1&&C.smooth,z=this._pt=new a8(this._pt,X,L8,0,1,C.renderTransform,C,0,-1),z.dep=1;if(E==="scale")this._pt=new a8(this._pt,C,"scaleY",C.scaleY,(R?wJ(C.scaleY,R+F):F)-C.scaleY||0,S5),this._pt.u=0,Y.push("scaleY",E),E+="X";else if(E==="transformOrigin"){if(_.push(K9,0,X[K9]),U=IF(U),C.svg)T5($,U,0,L,0,this);else D=parseFloat(U.split(" ")[2])||0,D!==C.zOrigin&&qJ(this,C,"zOrigin",C.zOrigin,D),qJ(this,X,E,SZ(q),SZ(U));continue}else if(E==="svgOrigin"){T5($,U,1,L,0,this);continue}else if(E in lW){MF(this,C,E,V,R?wJ(V,R+U):U);continue}else if(E==="smoothOrigin"){qJ(this,C,"smooth",C.smooth,U);continue}else if(E==="force3D"){C[E]=U;continue}else if(E==="transform"){kF(this,U,$);continue}}else if(!(E in X))E=A7(E)||E;if(B||(F||F===0)&&(V||V===0)&&!XF.test(U)&&E in X){if(O=(q+"").substr((V+"").length),F||(F=0),D=m8(U)||(E in Z9.units?Z9.units[E]:O),O!==D&&(V=FJ($,E,q,D)),this._pt=new a8(this._pt,B?C:X,E,V,(R?wJ(V,R+F):F)-V,!B&&(D==="px"||E==="zIndex")&&Z.autoRound!==!1?UF:S5),this._pt.u=D||0,B&&I!==U)this._pt.b=q,this._pt.e=I,this._pt.r=qF;else if(O!==D&&D!=="%")this._pt.b=q,this._pt.r=HF}else if(!(E in X)){if(E in $)this.add($,E,q||$[E],R?R+U:U,K,W);else if(E!=="parseTransform"){CZ(E,U);continue}}else zF.call(this,$,E,q,R?R+U:U);B||(E in X?_.push(E,0,X[E]):typeof $[E]==="function"?_.push(E,2,$[E]()):_.push(E,1,q||$[E])),Y.push(E)}}A&&k5(this)},render:function($,Z){if(Z.tween._time||!y5()){var Q=Z._pt;while(Q)Q.r($,Q.d),Q=Q._next}else Z.styles.revert()},get:i9,aliases:y9,getSetter:function($,Z,Q){var K=y9[Z];return K&&K.indexOf(",")<0&&(Z=K),Z in o9&&Z!==K9&&($._gsap.x||i9($,"x"))?Q&&SW===Q?Z==="scale"?OF:GF:(SW=Q||{})&&(Z==="scale"?DF:EF):$.style&&!LZ($.style[Z])?FF:~Z.indexOf("-")?VF:kZ($,Z)},core:{_removeProperty:UJ,_getMatrix:b5}};s8.utils.checkPrefix=A7;s8.core.getStyleSaver=mW;(function(J,$,Z,Q){var K=r8(J+","+$+","+Z,function(W){o9[W]=1});r8($,function(W){Z9.units[W]="deg",lW[W]=1}),y9[K[13]]=J+","+$,r8(Q,function(W){var Y=W.split(":");y9[Y[1]]=K[Y[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");r8("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(J){Z9.units[J]="px"});s8.registerPlugin(f5);var w0=s8.registerPlugin(f5)||s8,vF=w0.core.Tween;class h5{container;scene;camera;renderer;controls;audio;raycaster=new dQ;mousePos=new Y0;rootGroup=new N0;sceneryGroup=new N0;trackGroup=new N0;viaductGroup=new N0;trainGroup=new N0;weatherGroup=new N0;celestialGroup=new N0;locoCar=new N0;tenderCar=new N0;coachCar=new N0;cabooseCar=new N0;rotatingWheels=[];coachWindowMat;headlampBeam=null;headlampCoreBeam=null;headlampLight=null;headlampSpotLight=null;headlampTrackPool=null;coachInteriorLight1=null;coachInteriorLight2=null;tailLight=null;lanternLight=null;crossingLight1=null;crossingLight2=null;crossingLamp1=null;crossingLamp2=null;mooredBoat=null;viaductLanterns=[];viaductLanternLights=[];interactiveSheep=[];interactivePoles=[];tunnelLight=null;railClickAccumulator=0;lastBlinkCycle=!1;lastHoverRippleTime=0;windmillGroup=null;windmillSails=null;windmillLight=null;windmillBaseSpeed=0.009;windmillCurrentSpeed=0.009;watermillGroup=null;waterwheel=null;watermillLight=null;cottageGroup=null;cottageLight=null;semaphoreGroup=null;semaphoreArm=null;semaphoreLight=null;semaphoreIsRaised=!1;firefliesGroup=null;fireflies=[];alpineRidgeGroup=new N0;campsiteGroup=new N0;campfireLight=null;campfireFlame=null;campfireParticles=null;campfireParticlePos;waterTowerGroup=new N0;waterTowerSpout=null;waterSprayPoints=null;isWaterTowerSpraying=!1;hotAirBalloonGroup=new N0;balloonBurnerLight=null;balloonBurnerFlame=null;villageWellGroup=new N0;villageWellBucket=null;townFountainGroup=new N0;townFountainJet=null;farmBarnGroup=new N0;depotShedGroup=new N0;butterflies=[];leftSideRod=null;rightSideRod=null;wheelAngle=0;currentViewMode="isometric";directorShotIndex=0;directorTimer=0;directorShotDuration=6.8;directorNeedsCut=!0;engineBankRoll=0;lastAnimTime=0;ambientLight;hemiLight;sunLight;fillLight;sunMesh;sunCorona;moonMesh;moonLight;starsPoints;isNightMode=!1;isRaining=!1;rainStreaks=null;rainCount=360;rainGeo=null;rainPositions=null;splashRipples=[];steamParticles=[];steamTimer=0;trackCurve;progress=0.62;trainSpeed=0.0016;speedMultiplier=1;clockHand=null;clockTowerGroup=null;interactiveTrees=[];waterMesh=null;animFrameId=0;isDestroyed=!1;constructor(J,$){let Z=document.getElementById(J);if(!Z)throw Error(`ThreeStage container #${J} not found`);this.container=Z,this.audio=$,this.scene=new SQ;let Q=this.container.clientWidth||920,K=this.container.clientHeight||520;this.camera=new l8(38,Q/K,0.02,100),this.camera.position.set(5.8,5.4,6),this.camera.lookAt(0,0.4,-0.75),this.renderer=new QZ({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(Q,K),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=l6,this.renderer.toneMapping=n6,this.renderer.toneMappingExposure=1.15,this.container.appendChild(this.renderer.domElement),this.controls=new lQ(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=0.06,this.controls.autoRotate=!1,this.controls.autoRotateSpeed=0,this.controls.minPolarAngle=Math.PI*0.18,this.controls.maxPolarAngle=Math.PI*0.42,this.controls.minDistance=1.6,this.controls.maxDistance=12.5,this.controls.target.set(0,0.4,-0.75),this.scene.add(this.rootGroup),this.scene.add(this.celestialGroup),this.scene.add(this.weatherGroup),this.rootGroup.add(this.sceneryGroup),this.rootGroup.add(this.viaductGroup),this.rootGroup.add(this.trackGroup),this.rootGroup.add(this.trainGroup),this.rootGroup.scale.setScalar(0.96),this.setupLighting(),this.buildCelestialElements(),this.buildSculptedIsland(),this.buildScenicCanalAndBridge(),this.buildInfiniteTrackCurve(),this.buildPhysicalRailsAndTies(),this.buildStoneViaductAndTunnel(),this.buildMiniatureStationAndTown(),this.buildDutchWindmill(),this.buildWestFarmlandAndBarn(),this.buildCanalWatermill(),this.buildVillageCottageAndSignals(),this.buildEastVillageAndPlaza(),this.buildBioluminescentFireflies(),this.buildLevelCrossingAndTelegraph(),this.buildLushNatureAndFlock(),this.buildArticulatedTrain(),this.buildAlpineMountainRidge(),this.buildCampsiteAndCampfire(),this.buildRailwayWaterTower(),this.buildRailwayServiceDepot(),this.buildHotAirBalloon(),this.buildMiniatureVillageLife(),this.setupWeatherSystem(),this.bindEvents(),this.setNightMode(!1,!0),this.animate()}createStoneBrickTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#dfd7c9",$.fillRect(0,0,512,512);let Z=32,Q=64;for(let W=0;W<512;W+=Z){let X=W/Z%2===1?Q/2:0;for(let H=-Q;H<512+Q;H+=Q){let q=H+X,U=Math.floor(Math.random()*20-10);$.fillStyle=`rgb(${218+U}, ${210+U}, ${196+U})`,$.fillRect(q+1,W+1,Q-2,Z-2),$.fillStyle="rgba(255,255,255,0.22)",$.fillRect(q+1,W+1,Q-2,2),$.fillStyle="rgba(0,0,0,0.12)",$.fillRect(q+1,W+Z-3,Q-2,2)}}let K=new p9(J);return K.wrapS=l7,K.wrapT=l7,K.repeat.set(2,2),K}createWoodSleeperTexture(){let J=document.createElement("canvas");J.width=256,J.height=64;let $=J.getContext("2d");$.fillStyle="#5c3d2e",$.fillRect(0,0,256,64),$.strokeStyle="#43281c",$.lineWidth=1;for(let Q=0;Q<18;Q++){let K=Math.random()*64;$.beginPath(),$.moveTo(0,K),$.bezierCurveTo(80,K+Math.random()*4-2,180,K+Math.random()*4-2,256,K),$.stroke()}return $.fillStyle="#262626",$.fillRect(48,8,28,48),$.fillRect(180,8,28,48),$.fillStyle="#d4d4d8",$.beginPath(),$.arc(62,32,3,0,Math.PI*2),$.arc(194,32,3,0,Math.PI*2),$.fill(),new p9(J)}createMeadowTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#4fa65b",$.fillRect(0,0,512,512);for(let Q=0;Q<1600;Q++){let K=Math.random()*512,W=Math.random()*512,Y=1.5+Math.random()*2.5,X=0.08+Math.random()*0.15;$.fillStyle=Math.random()>0.5?`rgba(90, 180, 100, ${X})`:`rgba(60, 140, 70, ${X})`,$.beginPath(),$.arc(K,W,Y,0,Math.PI*2),$.fill()}let Z=new p9(J);return Z.wrapS=l7,Z.wrapT=l7,Z.repeat.set(6,6),Z}createVolumetricBeamTexture(){let J=document.createElement("canvas");J.width=128,J.height=512;let $=J.getContext("2d"),Z=$.createLinearGradient(0,0,0,512);return Z.addColorStop(0,"rgba(255, 252, 235, 0.85)"),Z.addColorStop(0.12,"rgba(254, 240, 138, 0.45)"),Z.addColorStop(0.35,"rgba(253, 224, 71, 0.20)"),Z.addColorStop(0.65,"rgba(250, 204, 21, 0.05)"),Z.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Z,$.fillRect(0,0,128,512),new p9(J)}createHeadlampPoolTexture(){let J=document.createElement("canvas");J.width=256,J.height=256;let $=J.getContext("2d"),Z=$.createRadialGradient(128,128,16,128,128,124);return Z.addColorStop(0,"rgba(254, 240, 138, 0.75)"),Z.addColorStop(0.35,"rgba(253, 224, 71, 0.40)"),Z.addColorStop(0.7,"rgba(234, 179, 8, 0.12)"),Z.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Z,$.fillRect(0,0,256,256),new p9(J)}setupLighting(){this.ambientLight=new gQ(16777215,2.1),this.scene.add(this.ambientLight),this.hemiLight=new hQ(16776171,14870768,1.2),this.hemiLight.position.set(0,10,0),this.scene.add(this.hemiLight),this.sunLight=new a7(16776171,2.6),this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=18,this.sunLight.shadow.camera.left=-4.5,this.sunLight.shadow.camera.right=4.5,this.sunLight.shadow.camera.top=4.5,this.sunLight.shadow.camera.bottom=-4.5,this.sunLight.shadow.bias=-0.0006,this.sunLight.shadow.normalBias=0.02,this.scene.add(this.sunLight),this.fillLight=new a7(15857145,1.1),this.fillLight.position.set(-4.5,4,-3.5),this.scene.add(this.fillLight),this.moonLight=new a7(16317180,0),this.moonLight.position.set(-3.5,5.5,-3.5),this.moonLight.castShadow=!0,this.moonLight.shadow.mapSize.width=1024,this.moonLight.shadow.mapSize.height=1024,this.moonLight.shadow.camera.near=1,this.moonLight.shadow.camera.far=18,this.moonLight.shadow.bias=-0.0008,this.moonLight.shadow.normalBias=0.04,this.scene.add(this.moonLight)}buildCelestialElements(){let J=new G8(0.22,24,24),$=new c({color:16710083,emissive:16707722,emissiveIntensity:0.9,roughness:0.4});this.moonMesh=new w(J,$),this.moonMesh.position.set(-2.4,2.8,-2.4),this.moonMesh.scale.setScalar(0.001),this.celestialGroup.add(this.moonMesh);let Z=document.createElement("canvas");Z.width=128,Z.height=128;let Q=Z.getContext("2d"),K=Q.createRadialGradient(64,64,12,64,64,64);K.addColorStop(0,"rgba(254, 240, 138, 0.7)"),K.addColorStop(0.4,"rgba(147, 197, 253, 0.35)"),K.addColorStop(1,"rgba(0, 0, 0, 0)"),Q.fillStyle=K,Q.fillRect(0,0,128,128);let W=new p9(Z),Y=new KZ({map:W,transparent:!0,blending:X7,opacity:0}),X=new wQ(Y);X.scale.set(1.5,1.5,1),this.moonMesh.add(X);let H=200,q=new F8,U=new Float32Array(H*3);for(let R=0;R<H;R++){let B=Math.PI*1.25+(Math.random()-0.5)*0.95,z=0.6+Math.random()*1.5,C=3+Math.random()*1.8;U[R*3]=Math.cos(B)*C,U[R*3+1]=z,U[R*3+2]=Math.sin(B)*C}q.setAttribute("position",new v8(U,3));let F=new AJ({color:16777215,size:0.04,transparent:!0,opacity:0});this.starsPoints=new U7(q,F),this.celestialGroup.add(this.starsPoints);let V=new N0,G=new G8(0.24,24,24),N=new c({color:16776171,emissive:16498468,emissiveIntensity:1.6,roughness:0.2,metalness:0.1}),E=new w(G,N);V.add(E);let O=new X8({color:16707722,transparent:!0,opacity:0.22,side:c6,depthWrite:!1}),D=new w(new G8(0.36,16,16),O);V.add(D),this.sunCorona=D,V.position.set(1.3,2.1,-1.8),this.sunMesh=V,this.celestialGroup.add(this.sunMesh)}createIslandShape(){let J={x:0,z:-0.3},$=[{x:-1.75,z:0,r:2.3},{x:1.75,z:0,r:2.3},{x:-2.35,z:1.55,r:1.65},{x:-2.35,z:-1.55,r:1.65},{x:2.35,z:1.55,r:1.65},{x:2.35,z:-1.55,r:1.65},{x:-1.25,z:1.55,r:1.45},{x:1.25,z:1.55,r:1.45},{x:-3.4,z:0,r:1.45},{x:3.4,z:0,r:1.45},{x:-1.2,z:-2.6,r:2.45},{x:-1.35,z:-3,r:1.95},{x:1.6,z:-2.15,r:2.05},{x:0,z:1.55,r:1.45},{x:0,z:-0.3,r:2}],Z=(Y,X)=>{for(let H=0;H<$.length;H++){let q=$[H],U=Y-q.x,F=X-q.z;if(U*U+F*F<=q.r*q.r)return!0}return!1},Q=140,K=[];for(let Y=0;Y<140;Y++){let X=Y/140*Math.PI*2,H=Math.cos(X),q=Math.sin(X),U=0;for(let F=0.1;F<=7;F+=0.01){let V=J.x+H*F,G=J.z+q*F;if(Z(V,G))U=F}K.push(U)}for(let Y=0;Y<3;Y++){let X=[];for(let H=0;H<140;H++){let q=K[(H-1+140)%140],U=K[H],F=K[(H+1)%140];X.push(0.25*q+0.5*U+0.25*F)}K=X}let W=new YZ;for(let Y=0;Y<140;Y++){let X=Y/140*Math.PI*2,H=J.x+Math.cos(X)*K[Y],q=J.z+Math.sin(X)*K[Y];if(Y===0)W.moveTo(H,q);else W.lineTo(H,q)}return W.closePath(),W}buildSculptedIsland(){let J=new n7(7.2,64),$=document.createElement("canvas");$.width=256,$.height=256;let Z=$.getContext("2d"),Q=Z.createRadialGradient(128,128,20,128,128,112);Q.addColorStop(0,"rgba(0, 0, 0, 0.12)"),Q.addColorStop(0.4,"rgba(0, 0, 0, 0.03)"),Q.addColorStop(0.72,"rgba(0, 0, 0, 0)"),Q.addColorStop(1,"rgba(0, 0, 0, 0)"),Z.fillStyle=Q,Z.fillRect(0,0,256,256);let K=new p9($),W=new X8({map:K,transparent:!0,depthWrite:!1}),Y=new w(J,W);Y.rotation.x=-Math.PI*0.5,Y.position.y=-0.27,this.sceneryGroup.add(Y);let X=new c({color:15986146,roughness:0.45,metalness:0.02}),H=this.createMeadowTexture(),q=new c({color:5219931,map:H,roughness:0.65,metalness:0.02}),U=this.createIslandShape(),V=new s7(U,{depth:0.22,bevelEnabled:!0,bevelThickness:0.02,bevelSize:0.04,bevelSegments:3}),G=new w(V,X);G.rotation.x=Math.PI*0.5,G.position.y=-0.02,G.receiveShadow=!0,this.sceneryGroup.add(G);let N=new s7(U,{depth:0.035,bevelEnabled:!1}),E=new w(N,q);E.rotation.x=Math.PI*0.5,E.position.y=0.035,E.receiveShadow=!0,this.sceneryGroup.add(E);let O=q;[{x:-2.65,y:0.038,z:0.7,r:0.65,h:0.04},{x:2.85,y:0.038,z:-0.65,r:0.65,h:0.035},{x:-2.5,y:0.038,z:-2.2,r:0.75,h:0.04}].forEach((L)=>{let A=new w(new S0(L.r*0.45,L.r,L.h,18),O);A.position.set(L.x,L.y,L.z),A.receiveShadow=!0,this.sceneryGroup.add(A)});let R=new c({color:13154456,roughness:0.9});[[-0.18,0.82],[-0.36,0.76],[-0.55,0.68],[-0.74,0.58],[-0.95,0.46],[-1.15,0.35],[0.18,0.82],[0.36,0.76],[0.55,0.68],[0.74,0.58],[0.95,0.46],[1.15,0.32],[1.32,0.18],[-0.14,0.16],[-0.08,0.1],[0,0],[0.08,-0.1],[0.14,-0.16]].forEach(([L,A],_)=>{let I=new w(new S0(0.045,0.052,0.01,7),R);I.position.set(L,0.038,A),I.rotation.y=_*0.7,I.receiveShadow=!0,this.sceneryGroup.add(I)});let z=new c({color:7162945,roughness:0.75});[{start:[-1.55,-0.4],end:[-1.2,-0.4]},{start:[-1.2,-0.4],end:[-1.2,-0.22]},{start:[-1.55,-0.22],end:[-1.55,-0.4]}].forEach(({start:L,end:A})=>{let[_,I]=L,[k,b]=A,n=k-_,r=b-I,y=Math.sqrt(n*n+r*r),h=Math.atan2(r,n),m=(_+k)*0.5,i=(I+b)*0.5;[-y*0.48,y*0.48].forEach((d)=>{let g=new w(new J0(0.018,0.1,0.018),z),p=m+Math.cos(h)*d,t=i+Math.sin(h)*d;g.position.set(p,0.08,t),g.castShadow=!0,this.sceneryGroup.add(g)}),[0.065,0.105].forEach((d)=>{let g=new w(new J0(y,0.012,0.012),z);g.position.set(m,d,i),g.rotation.y=-h,g.castShadow=!0,this.sceneryGroup.add(g)})})}buildScenicCanalAndBridge(){let J=new N0,$=new S0(0.46,0.5,0.022,36),Z=new c({color:481669,roughness:0.75}),Q=new w($,Z);Q.scale.set(1.45,1,1.95),Q.rotation.y=0.7854,Q.position.set(0,0.015,-0.04),Q.receiveShadow=!0,J.add(Q);let K=new c({color:13621468,map:this.createStoneBrickTexture(),roughness:0.55,metalness:0.05}),W=36;for(let g=0;g<W;g++){let p=g/W*Math.PI*2,t=Math.cos(p)*0.44*1.45,v=Math.sin(p)*0.44*1.95,e=t*Math.cos(0.7854)-v*Math.sin(0.7854),H0=t*Math.sin(0.7854)+v*Math.cos(0.7854);if(Math.abs(H0-e)/Math.SQRT2<0.22)continue;if(Math.hypot(e- -0.247,H0-0.247)<0.2||Math.hypot(e-0.247,H0- -0.247)<0.2)continue;let R0=new w(new J0(0.1,0.04,0.052),K);R0.position.set(e,0.038,H0),R0.rotation.y=0.7854-p,R0.castShadow=!0,R0.receiveShadow=!0,J.add(R0)}let Y=new c({color:165063,emissive:223649,emissiveIntensity:0.18,roughness:0.04,metalness:0.15,transparent:!0,opacity:0.88}),X=new S0(0.43,0.45,0.016,36),H=new w(X,Y);H.scale.set(1.42,1,1.9),H.rotation.y=0.7854,H.position.set(0,0.034,-0.04),H.receiveShadow=!0,this.waterMesh=H,J.add(H);let q=[6583435,4674921,9741240,5395035];[[-0.42,-0.26],[-0.38,-0.34],[-0.22,-0.48],[0.15,-0.46],[0.38,-0.32],[0.44,-0.18],[0.46,0.1],[0.38,0.28],[0.24,0.44],[-0.18,0.45],[-0.36,0.32],[-0.45,0.12]].filter(([g,p])=>Math.abs(p-g)/Math.SQRT2>=0.22).forEach(([g,p],t)=>{let v=new c({color:q[t%q.length],roughness:0.6}),e=new w(new j8(0.026+t%3*0.012,1),v);e.position.set(g,0.038,p),e.rotation.set(t*0.5,t*0.8,t*0.3),e.castShadow=!0,J.add(e)});let F=new N0;F.position.set(-0.3,0.04,-0.32),F.rotation.y=0.65;let V=new c({color:7877903,roughness:0.7});[-0.07,0.07].forEach((g)=>{let p=new w(new S0(0.012,0.014,0.09,6),V);p.position.set(g,-0.01,0.09),p.castShadow=!0,F.add(p)});for(let g=0;g<4;g++){let p=new w(new J0(0.18,0.01,0.042),V);p.position.set(0,0.028,-0.06+g*0.045),p.castShadow=!0,F.add(p)}let G=new c({color:1976635,metalness:0.8,roughness:0.3}),N=new w(new S0(0.007,0.01,0.02,8),G);N.position.set(0.06,0.042,0.075),F.add(N),J.add(F);let E=new N0;E.position.set(-0.4,0.038,-0.24),E.rotation.y=0.45;let O=new c({color:9584654,roughness:0.5}),D=new c({color:4528643,roughness:0.6}),R=new w(new J0(0.2,0.042,0.09),O);R.position.y=0.018,R.castShadow=!0,E.add(R);let B=new w(new J0(0.208,0.008,0.098),D);B.position.y=0.04,E.add(B);let z=new c({color:11817737,roughness:0.4}),C=new w(new J0(0.038,0.014,0.082),z);C.position.set(0,0.028,0),E.add(C);let L=new w(new J0(0.042,0.014,0.082),z);L.position.set(-0.075,0.028,0),E.add(L);let A=new c({color:14251782,roughness:0.4});[-1,1].forEach((g)=>{let p=new N0,t=new w(new S0(0.004,0.004,0.16,6),A);t.rotation.z=Math.PI*0.5,p.add(t);let v=new w(new J0(0.038,0.003,0.018),A);v.position.x=0.08,p.add(v),p.position.set(0.01,0.044,g*0.052),p.rotation.y=g*0.25,p.rotation.z=g*0.1,E.add(p)});let _=new c({color:13935475,roughness:0.9}),I=new w(new S0(0.003,0.003,0.12,4),_);I.position.set(0.12,0.035,-0.04),I.rotation.z=-Math.PI*0.35,I.rotation.y=0.4,E.add(I),this.mooredBoat=E,J.add(E);let k=new c({color:1467700,roughness:0.6}),b=new c({color:4528643,roughness:0.8});[[-0.2,-0.42],[0.22,-0.38],[-0.38,0.15],[0.38,-0.18]].filter(([g,p])=>Math.abs(p-g)/Math.SQRT2>=0.22).forEach(([g,p])=>{for(let t=0;t<3;t++){let v=new N0,e=(Math.random()-0.5)*0.05,H0=(Math.random()-0.5)*0.05;v.position.set(g+e,0.035,p+H0);let V0=new w(new S0(0.003,0.004,0.1+t*0.02,4),k);V0.position.y=0.05+t*0.01,v.add(V0);let R0=new w(new S0(0.008,0.008,0.032,6),b);R0.position.y=0.085+t*0.01,v.add(R0),J.add(v)}});let r=new c({color:1409085,roughness:0.35}),y=new c({color:16020150,roughness:0.25}),h=new c({color:16638023,roughness:0.25});[[-0.3,0.038,0.06],[0.3,0.038,-0.06],[-0.38,0.038,-0.15],[0.38,0.038,0.15]].filter(([g,,p])=>Math.abs(p-g)/Math.SQRT2>=0.22).forEach(([g,p,t],v)=>{let e=new w(new S0(0.04,0.04,0.004,12,1,!1,0,Math.PI*1.85),r);e.position.set(g,p,t),e.rotation.y=v*1.4,J.add(e);let H0=new w(new j8(0.016,0),v%2===0?y:h);H0.position.set(g,p+0.012,t),J.add(H0)});let i=new c({color:4528643,roughness:0.85});[-0.28,-0.14,0,0.14,0.28].forEach((g)=>{let p=g*0.7071,t=g*0.7071,v=new w(new J0(0.24,0.024,0.055),i);v.position.set(p,0.044,t),v.rotation.y=-Math.PI*0.25,v.castShadow=!0,J.add(v),[-0.075,0.075].forEach((e)=>{let H0=p-e*0.7071,V0=t+e*0.7071,R0=new w(new S0(0.014,0.016,0.065,8),i);R0.position.set(H0,0.02,V0),R0.castShadow=!0,J.add(R0)})}),[-0.045,0.045].forEach((g)=>{let p=new w(new J0(0.64,0.018,0.035),i),t=-g*0.7071,v=g*0.7071;p.position.set(t,0.048,v),p.rotation.y=Math.PI*0.25,p.castShadow=!0,J.add(p)}),this.sceneryGroup.add(J)}buildInfiniteTrackCurve(){let J=[],$=260,Z=0.95,Q=0.055,K=0.38;for(let W=0;W<260;W++){let Y=W/260*Math.PI*2,X=Math.sin(Y)*3.3,H=Math.sin(2*Y)*1.6,q=Math.abs(Y-Math.PI),U=0.055;if(q<0.95){let F=Math.cos(q/0.95*(Math.PI*0.5));U=0.055+0.38*Math.pow(F,2)}J.push(new T(X,U,H))}this.trackCurve=new F7(J,!0,"centripetal")}buildPhysicalRailsAndTies(){let J=new J0(0.24,0.022,0.06),$=this.createWoodSleeperTexture(),Z=new c({color:6044974,map:$,roughness:0.7,metalness:0.1}),Q=160,K=new T(0,1,0);for(let O=0;O<160;O++){let D=O/160,R=this.trackCurve.getPointAt(D),B=this.trackCurve.getTangentAt(D).normalize(),z=new T().crossVectors(B,K).normalize();if(z.lengthSq()<0.001)z.set(1,0,0);let C=new w(J,Z);C.position.set(R.x,R.y-0.012,R.z),C.lookAt(R.clone().add(z)),C.castShadow=!0,C.receiveShadow=!0,this.trackGroup.add(C)}let W=280,Y=0.066,X=[],H=[];for(let O=0;O<=W;O++){let D=O/W,R=this.trackCurve.getPointAt(D),B=this.trackCurve.getTangentAt(D).normalize(),z=new T().crossVectors(B,K).normalize();if(z.lengthSq()<0.001)z.set(1,0,0);X.push(R.clone().addScaledVector(z,Y)),H.push(R.clone().addScaledVector(z,-Y))}let q=new F7(X,!0),U=new F7(H,!0),F=new o7(q,280,0.013,8,!0),V=new o7(U,280,0.013,8,!0),G=new c({color:13948120,metalness:0.92,roughness:0.18}),N=new w(F,G),E=new w(V,G);N.castShadow=!0,N.receiveShadow=!0,E.castShadow=!0,E.receiveShadow=!0,this.trackGroup.add(N),this.trackGroup.add(E)}buildStoneViaductAndTunnel(){this.viaductGroup.rotation.y=0.7702;let J=this.createStoneBrickTexture(),$=new c({color:14603717,map:J,roughness:0.52,metalness:0.04}),Z=new c({color:9074529,roughness:0.45}),Q=new c({color:6583435,map:J,roughness:0.65}),K=new c({color:3033643,roughness:0.85}),W=new J0(0.24,0.4,0.48);[-0.35,0.35].forEach((R)=>{let B=new w(W,$);B.position.set(R,0.2,0),B.castShadow=!0,B.receiveShadow=!0,this.viaductGroup.add(B);let z=new w(new J0(0.28,0.07,0.54),Q);z.position.set(R,0.035,0),z.castShadow=!0,z.receiveShadow=!0,this.viaductGroup.add(z),[-0.29,0.29].forEach((C)=>{let L=new w(new S0(0.001,0.12,0.22,3),Q);L.position.set(R,0.09,C),L.rotation.y=C>0?0:Math.PI,L.castShadow=!0,this.viaductGroup.add(L)}),[-0.14,0.14].forEach((C)=>{let L=new w(new j8(0.024,0),K);L.position.set(R+(R>0?-0.12:0.12),0.06+Math.random()*0.04,C),this.viaductGroup.add(L)})});let Y=new J0(1.12,0.045,0.44),X=new w(Y,$);X.position.set(0,0.4,0),X.castShadow=!0,X.receiveShadow=!0,this.viaductGroup.add(X);for(let R=0;R<9;R++){let B=-0.44+R*0.11;[-0.21,0.21].forEach((z)=>{let C=new w(new J0(0.032,0.028,0.038),Z);C.position.set(B,0.375,z),C.castShadow=!0,this.viaductGroup.add(C)})}let H=new c({color:13156008,map:J,roughness:0.58,metalness:0.04,side:m9}),q=new S0(0.23,0.23,0.48,28,1,!0,-Math.PI*0.5,Math.PI),U=new w(q,H);U.rotation.x=-Math.PI*0.5,U.position.set(0,0.17,0),U.castShadow=!0,U.receiveShadow=!0,this.viaductGroup.add(U),this.tunnelLight=new y8(16498468,0.9,1.4),this.tunnelLight.position.set(0,0.32,0),this.viaductGroup.add(this.tunnelLight),[-0.242,0.242].forEach((R)=>{for(let z=0;z<=9;z++){let C=z/9*Math.PI,L=z===Math.floor(4.5),A=Math.cos(C)*0.235,_=0.17+Math.sin(C)*0.235,I=L?new J0(0.048,0.064,0.042):new J0(0.038,0.042,0.03),k=new w(I,L?Z:$);k.position.set(A,_,R),k.rotation.z=C-Math.PI*0.5,k.castShadow=!0,this.viaductGroup.add(k)}[-0.18,0.18].forEach((z)=>{let C=new w(new J0(0.09,0.07,0.024),$);C.position.set(z,0.365,R),C.castShadow=!0,this.viaductGroup.add(C)})});let F=new J0(1.12,0.085,0.04),V=new w(F,Z);V.position.set(0,0.46,0.2),V.castShadow=!0,this.viaductGroup.add(V);let G=new w(F,Z);G.position.set(0,0.46,-0.2),G.castShadow=!0,this.viaductGroup.add(G);let N=new V8(0.035,0.075,4);[[-0.54,0.525,0.2],[0.54,0.525,0.2],[-0.54,0.525,-0.2],[0.54,0.525,-0.2]].forEach(([R,B,z])=>{let C=new w(N,Z);C.position.set(R,B,z),C.rotation.y=Math.PI*0.25,C.castShadow=!0,this.viaductGroup.add(C)}),this.viaductLanterns=[],this.viaductLanternLights=[];let E=new c({color:1976635,metalness:0.85,roughness:0.3}),O=new c({color:14251782,metalness:0.8,roughness:0.2}),D=new c({color:16707722,emissive:16498468,emissiveIntensity:1.8,roughness:0.1,transparent:!0,opacity:0.9});[{x:-0.38,z:0.25},{x:0.38,z:0.25},{x:-0.38,z:-0.25},{x:0.38,z:-0.25}].forEach(({x:R,z:B})=>{let z=new N0;z.position.set(R,0.29,B);let C=new w(new J0(0.012,0.045,0.045),E);C.position.set(R>0?-0.02:0.02,0,0),z.add(C);let L=new w(new S0(0.022,0.016,0.04,6),O);L.position.set(0,0.01,0),L.castShadow=!0,z.add(L);let A=new w(new S0(0.016,0.012,0.028,6),D);A.position.set(0,0.01,0),z.add(A);let _=new y8(16498468,this.isNightMode?1.4:0,1.6);_.position.set(0,0.01,0),z.add(_),this.viaductLanternLights.push(_),this.viaductLanterns.push(z),this.viaductGroup.add(z)})}buildMiniatureStationAndTown(){let J=new N0;J.position.set(0,0.04,1.25),J.rotation.y=0;let $=new c({color:14870768,roughness:0.4}),Z=new c({color:8736014,roughness:0.5}),Q=new c({color:14510880,roughness:0.35}),K=new w(new J0(0.62,0.05,0.22),$);K.position.y=0.025,K.castShadow=!0,K.receiveShadow=!0,J.add(K);let W=new J0(0.024,0.28,0.024),Y=new w(W,Z);Y.position.set(-0.16,0.16,-0.06),J.add(Y);let X=new w(W,Z);X.position.set(0.08,0.16,-0.06),J.add(X);let H=new w(new J0(0.38,0.024,0.2),Q);H.position.set(-0.04,0.3,-0.02),H.rotation.x=0.12,H.castShadow=!0,J.add(H),this.clockTowerGroup=new N0,this.clockTowerGroup.position.set(0.2,0,-0.04);let q=new w(new J0(0.12,0.42,0.12),$);q.position.y=0.235,q.castShadow=!0,this.clockTowerGroup.add(q);let U=new w(new V8(0.1,0.18,4),Q);U.position.y=0.53,U.rotation.y=Math.PI*0.25,U.castShadow=!0,this.clockTowerGroup.add(U);let F=new w(new S0(0.038,0.038,0.01,16),new c({color:16777215,roughness:0.1}));F.rotation.x=Math.PI*0.5,F.position.set(0,0.36,0.065),this.clockTowerGroup.add(F);let V=new J0(0.005,0.028,0.005);this.clockHand=new w(V,new X8({color:988970})),this.clockHand.position.set(0,0.36,0.072),this.clockTowerGroup.add(this.clockHand),J.add(this.clockTowerGroup);let G=new w(new J0(0.18,0.038,0.05),Z);G.position.set(-0.06,0.065,-0.04),J.add(G);let N=new w(new J0(0.04,0.03,0.022),new c({color:9584654}));N.position.set(-0.16,0.065,-0.04),J.add(N);let E=new c({color:9741240,metalness:0.85,roughness:0.3});[-0.19,-0.21].forEach((R,B)=>{let z=new w(new S0(0.016,0.018,0.036,8),E);z.position.set(R,0.065,0.04+B*0.03),z.castShadow=!0,J.add(z)}),[2450411,14251782].forEach((R,B)=>{let z=new N0,C=new w(new S0(0.02,0.026,0.07,8),new c({color:R,roughness:0.4}));C.position.y=0.085;let L=new w(new G8(0.02,8,8),new c({color:16772565}));L.position.y=0.135,z.add(C),z.add(L),z.position.set(-0.02+B*0.06,0,0.01),z.castShadow=!0,J.add(z)}),this.lanternLight=new y8(16708551,0.8,1.6),this.lanternLight.position.set(-0.04,0.26,-0.02),J.add(this.lanternLight);let D=new w(new G8(0.022,8,8),new X8({color:16707722}));D.position.copy(this.lanternLight.position),J.add(D),this.sceneryGroup.add(J)}buildDutchWindmill(){this.windmillGroup=new N0,this.windmillGroup.position.set(-2.25,0.035,-0.45);let J=this.createStoneBrickTexture(),$=new c({color:14076856,map:J,roughness:0.65,metalness:0.05}),Z=new c({color:7877903,roughness:0.7}),Q=new c({color:14604492,roughness:0.6,metalness:0.02}),K=new c({color:3359061,roughness:0.45,metalness:0.2}),W=new c({color:16710083,roughness:0.8,side:m9}),Y=new w(new S0(0.18,0.21,0.08,8),$);Y.position.y=0.04,Y.castShadow=!0,Y.receiveShadow=!0,this.windmillGroup.add(Y);let X=new w(new S0(0.11,0.17,0.36,8),Q);X.position.y=0.26,X.castShadow=!0,X.receiveShadow=!0,this.windmillGroup.add(X);let H=new w(new V8(0.13,0.1,8),K);H.position.y=0.49,H.castShadow=!0,this.windmillGroup.add(H),this.windmillSails=new N0,this.windmillSails.position.set(0,0.44,0.13);let q=new w(new S0(0.024,0.024,0.024,8),Z);q.rotation.x=Math.PI*0.5,this.windmillSails.add(q);for(let V=0;V<4;V++){let G=new N0;G.rotation.z=V*Math.PI/2;let N=new w(new J0(0.012,0.28,0.01),Z);N.position.y=0.14,G.add(N);let E=new w(new H9(0.055,0.22),W);E.position.set(0.032,0.15,0.005),E.rotation.y=0.15,G.add(E),this.windmillSails.add(G)}this.windmillGroup.add(this.windmillSails);let U=new c({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.6:0.1,roughness:0.1}),F=new w(new J0(0.012,0.03,0.024),U);F.position.set(0.125,0.27,0.04),this.windmillGroup.add(F),this.windmillLight=new y8(16498468,this.isNightMode?0.85:0,1.4),this.windmillLight.position.set(0.08,0.28,0),this.windmillGroup.add(this.windmillLight),this.sceneryGroup.add(this.windmillGroup)}buildWestFarmlandAndBarn(){let J=new N0;J.position.set(-2.05,0.04,0.15);let $=new c({color:10033947,roughness:0.65}),Z=new c({color:16317180,roughness:0.45}),Q=new c({color:3359061,roughness:0.6}),K=new c({color:9741240,roughness:0.8}),W=new c({color:16436245,roughness:0.85}),Y=new c({color:9741240,metalness:0.75,roughness:0.25}),X=new c({color:4528643,roughness:0.9}),H=new c({color:15381256,roughness:0.8}),q=new c({color:1483594,roughness:0.6}),U=new N0,F=new w(new J0(0.34,0.04,0.24),K);F.position.y=0.02,F.castShadow=!0,U.add(F);let V=new w(new J0(0.32,0.16,0.22),$);V.position.y=0.12,V.castShadow=!0,U.add(V);let G=new w(new J0(0.06,0.1,0.01),Z);G.position.set(-0.035,0.09,0.112),U.add(G);let N=new w(new J0(0.06,0.1,0.01),Z);N.position.set(0.035,0.09,0.112),U.add(N);let E=new w(new J0(0.36,0.06,0.25),Q);E.position.y=0.23,E.castShadow=!0,U.add(E);let O=new w(new V8(0.14,0.08,4),Q);O.rotation.y=Math.PI*0.25,O.position.y=0.29,O.scale.set(1.1,1,1.8),O.castShadow=!0,U.add(O);let D=new w(new J0(0.05,0.05,0.01),Z);D.position.set(0,0.23,0.128),U.add(D);let R=new y8(16707722,0.6,0.8);R.position.set(0,0.26,0.14),U.add(R),J.add(U),this.farmBarnGroup=J;let B=new N0;B.position.set(-0.22,0,0.1);let z=new w(new S0(0.065,0.065,0.32,16),Y);z.position.y=0.16,z.castShadow=!0,B.add(z);let C=new w(new G8(0.066,12,12,0,Math.PI*2,0,Math.PI*0.5),Y);C.position.y=0.32,C.castShadow=!0,B.add(C);for(let m=0;m<6;m++){let i=new w(new J0(0.02,0.005,0.005),Z);i.position.set(0,0.08+m*0.045,0.068),B.add(i)}J.add(B);let L=new N0;L.position.set(-0.25,0,-0.08);let A=new w(new S0(0.038,0.038,0.06,12),W);A.rotation.z=Math.PI*0.5,A.position.set(0,0.038,0),A.castShadow=!0,L.add(A);let _=new w(new J0(0.07,0.035,0.045),W);_.position.set(0.08,0.018,0.02),_.castShadow=!0,L.add(_);let I=new w(new J0(0.07,0.035,0.045),W);I.position.set(0.08,0.053,0.02),I.rotation.y=0.2,I.castShadow=!0,L.add(I),J.add(L);let k=new N0;k.position.set(-0.45,0,-0.22);let b=new w(new J0(0.28,0.015,0.22),X);b.position.y=0.008,k.add(b),[-0.08,0,0.08].forEach((m,i)=>{for(let d=-0.1;d<=0.1;d+=0.04)if(i%2===0){let g=new w(new S0(0.006,0.008,0.045,5),H);g.position.set(d,0.035,m),k.add(g)}else{let g=new w(new j8(0.014,0),q);g.position.set(d,0.025,m),k.add(g)}}),J.add(k);let n=new N0;n.position.set(-0.35,0,-0.4);let r=new w(new S0(0.02,0.026,0.14,6),$);r.position.y=0.07,n.add(r);let y=new w(new j8(0.11,1),q);y.position.y=0.18,n.add(y);let h=new X8({color:15680580});[[-0.06,0.16,0.05],[0.06,0.19,-0.04],[0,0.22,0.07],[0.04,0.15,0.06]].forEach(([m,i,d])=>{let g=new w(new G8(0.012,6,6),h);g.position.set(m,i,d),n.add(g)}),J.add(n)}buildCanalWatermill(){this.watermillGroup=new N0,this.watermillGroup.position.set(0,0.035,-0.88);let J=this.createStoneBrickTexture(),$=new c({color:13621468,map:J,roughness:0.65,metalness:0.05}),Z=new c({color:7877903,roughness:0.7}),Q=new c({color:15857145,roughness:0.85}),K=new c({color:10105874,roughness:0.5}),W=new w(new J0(0.32,0.1,0.26),$);W.position.y=0.05,W.castShadow=!0,W.receiveShadow=!0,this.watermillGroup.add(W);let Y=new w(new J0(0.3,0.13,0.24),Q);Y.position.y=0.165,Y.castShadow=!0,Y.receiveShadow=!0,this.watermillGroup.add(Y),[-0.145,0.145].forEach((N)=>{let E=new w(new J0(0.015,0.13,0.245),Z);E.position.set(N,0.165,0),this.watermillGroup.add(E)});let X=new w(new J0(0.34,0.024,0.17),K);X.position.set(0,0.275,-0.06),X.rotation.x=0.68,X.castShadow=!0,this.watermillGroup.add(X);let H=new w(new J0(0.34,0.024,0.17),K);H.position.set(0,0.275,0.06),H.rotation.x=-0.68,H.castShadow=!0,this.watermillGroup.add(H),[-0.148,0.148].forEach((N)=>{let E=new w(new V8(0.12,0.09,3),Z);E.position.set(N,0.275,0),E.rotation.y=N>0?Math.PI*0.5:-Math.PI*0.5,this.watermillGroup.add(E)});let q=new w(new J0(0.045,0.16,0.045),$);q.position.set(0.09,0.3,-0.07),q.castShadow=!0,this.watermillGroup.add(q);let U=new w(new J0(0.08,0.022,0.16),Z);U.position.set(0,0.18,0.17),U.rotation.x=0.15,U.castShadow=!0,this.watermillGroup.add(U),this.waterwheel=new N0,this.waterwheel.position.set(0,0.065,0.18);let F=new w(new S0(0.014,0.014,0.08,8),Z);F.rotation.z=Math.PI*0.5,this.waterwheel.add(F),[-0.03,0.03].forEach((N)=>{let E=new w(new i7(0.105,0.125,16),Z);E.rotation.y=Math.PI*0.5,E.position.x=N,this.waterwheel.add(E)});for(let N=0;N<12;N++){let E=N/12*Math.PI*2,O=new N0;if(O.rotation.x=E,N%2===0){let R=new w(new J0(0.012,0.11,0.01),Z);R.position.y=0.055,O.add(R)}let D=new w(new J0(0.068,0.008,0.036),Z);D.position.set(0,0.115,0),D.castShadow=!0,O.add(D),this.waterwheel.add(O)}this.watermillGroup.add(this.waterwheel);let V=new w(new J0(0.012,0.012,0.045),Z);V.position.set(0.09,0.18,0.14),this.watermillGroup.add(V),this.watermillLight=new y8(16498468,this.isNightMode?0.85:0,1.4),this.watermillLight.position.set(0.09,0.16,0.16),this.watermillGroup.add(this.watermillLight);let G=new w(new G8(0.016,8,8),new X8({color:16707722}));G.position.copy(this.watermillLight.position),this.watermillGroup.add(G),this.sceneryGroup.add(this.watermillGroup)}buildVillageCottageAndSignals(){this.cottageGroup=new N0,this.cottageGroup.position.set(2.4,0.035,-0.35),this.cottageGroup.rotation.y=-0.35;let J=new c({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),$=new c({color:16448249,roughness:0.85}),Z=new c({color:4528643,roughness:0.7}),Q=new c({color:8736014,roughness:0.9}),K=new c({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.8:0.1,roughness:0.1}),W=new w(new J0(0.36,0.05,0.26),J);W.position.y=0.025,W.castShadow=!0,W.receiveShadow=!0,this.cottageGroup.add(W);let Y=new w(new J0(0.34,0.14,0.24),$);Y.position.y=0.12,Y.castShadow=!0,Y.receiveShadow=!0,this.cottageGroup.add(Y),[-0.165,0.165].forEach((_)=>{let I=new w(new J0(0.016,0.14,0.244),Z);I.position.set(_,0.12,0),this.cottageGroup.add(I)});let X=new w(new J0(0.344,0.016,0.244),Z);X.position.set(0,0.12,0),this.cottageGroup.add(X);let H=new w(new J0(0.38,0.026,0.17),Q);H.position.set(0,0.225,-0.06),H.rotation.x=0.72,H.castShadow=!0,this.cottageGroup.add(H);let q=new w(new J0(0.38,0.026,0.17),Q);q.position.set(0,0.225,0.06),q.rotation.x=-0.72,q.castShadow=!0,this.cottageGroup.add(q);let U=new w(new J0(0.07,0.06,0.06),$);U.position.set(-0.06,0.22,0.08),U.castShadow=!0,this.cottageGroup.add(U);let F=new w(new V8(0.05,0.04,3),Q);F.position.set(-0.06,0.265,0.08),F.rotation.y=Math.PI*0.5,this.cottageGroup.add(F);let V=new w(new J0(0.042,0.18,0.042),J);V.position.set(0.12,0.26,-0.06),V.castShadow=!0,this.cottageGroup.add(V);let G=new w(new J0(0.012,0.038,0.032),K);G.position.set(0.07,0.12,0.122),this.cottageGroup.add(G);let N=new w(new J0(0.012,0.038,0.032),K);N.position.set(-0.07,0.12,0.122),this.cottageGroup.add(N);let E=new w(new J0(0.042,0.07,0.012),Z);E.position.set(0,0.085,0.122),this.cottageGroup.add(E),this.cottageLight=new y8(16498468,this.isNightMode?1.1:0,1.6),this.cottageLight.position.set(0,0.14,0),this.cottageGroup.add(this.cottageLight),this.sceneryGroup.add(this.cottageGroup),this.semaphoreGroup=new N0,this.semaphoreGroup.position.set(-0.35,0.035,1.25);let O=new c({color:1976635,metalness:0.8,roughness:0.3}),D=new c({color:14427686,roughness:0.4}),R=new c({color:16777215,roughness:0.4}),B=new w(new S0(0.01,0.014,0.38,8),O);B.position.y=0.19,B.castShadow=!0,this.semaphoreGroup.add(B);for(let _=0;_<6;_++){let I=new w(new J0(0.028,0.004,0.004),O);I.position.set(0,0.08+_*0.045,0.014),this.semaphoreGroup.add(I)}let z=new w(new G8(0.014,6,6),O);z.position.y=0.385,this.semaphoreGroup.add(z),this.semaphoreArm=new N0,this.semaphoreArm.position.set(0,0.32,0.01);let C=new w(new J0(0.12,0.022,0.005),D);C.position.x=0.06,C.castShadow=!0,this.semaphoreArm.add(C);let L=new w(new J0(0.022,0.024,0.006),R);L.position.x=0.09,this.semaphoreArm.add(L);let A=new w(new J0(0.03,0.018,0.01),O);A.position.x=-0.02,this.semaphoreArm.add(A),this.semaphoreGroup.add(this.semaphoreArm),this.semaphoreLight=new y8(14427686,0.6,0.8),this.semaphoreLight.position.set(0.01,0.32,0.02),this.semaphoreGroup.add(this.semaphoreLight),this.sceneryGroup.add(this.semaphoreGroup)}buildEastVillageAndPlaza(){let J=new N0;J.position.set(2.05,0.04,0);let $=new c({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),Z=new c({color:4528643,roughness:0.7}),Q=new c({color:16448249,roughness:0.85}),K=new c({color:12730636,roughness:0.5}),W=new c({color:165063,roughness:0.1,metalness:0.2}),Y=new c({color:1976635,roughness:0.5,metalness:0.8}),X=new c({color:16707722,emissive:16498468,emissiveIntensity:1.2}),H=new w(new S0(0.38,0.4,0.012,24),$);H.position.y=0.006,H.receiveShadow=!0,J.add(H);let q=new N0,U=new w(new S0(0.18,0.2,0.07,16),$);U.position.y=0.035,U.castShadow=!0,q.add(U);let F=new w(new S0(0.165,0.165,0.01,16),W);F.position.y=0.065,q.add(F);let V=new w(new S0(0.045,0.06,0.14,12),$);V.position.y=0.13,q.add(V);let G=new w(new S0(0.09,0.1,0.04,12),$);G.position.y=0.19,G.castShadow=!0,q.add(G);let N=new w(new S0(0.08,0.08,0.01,12),W);N.position.y=0.205,q.add(N);let E=new w(new V8(0.02,0.05,8),$);E.position.y=0.24,q.add(E);let O=28,D=new F8,R=new Float32Array(O*3);for(let y=0;y<O;y++){let h=y/O*Math.PI*2,m=0.02+Math.random()*0.05;R[y*3]=Math.cos(h)*m,R[y*3+1]=0.24+Math.random()*0.08,R[y*3+2]=Math.sin(h)*m}D.setAttribute("position",new v8(R,3));let B=new AJ({color:3718648,size:0.022,transparent:!0,opacity:0.85});this.townFountainJet=new U7(D,B),q.add(this.townFountainJet),J.add(q),this.townFountainGroup=J;let z=new N0;z.position.set(0.25,0,0.28),z.rotation.y=-0.55;let C=new w(new J0(0.3,0.04,0.22),$);C.position.y=0.02,z.add(C);let L=new w(new J0(0.28,0.14,0.2),Q);L.position.y=0.11,L.castShadow=!0,z.add(L);let A=new w(new J0(0.32,0.022,0.14),K);A.position.set(0,0.21,-0.05),A.rotation.x=0.65,A.castShadow=!0,z.add(A);let _=new w(new J0(0.32,0.022,0.14),K);_.position.set(0,0.21,0.05),_.rotation.x=-0.65,_.castShadow=!0,z.add(_);let I=new c({color:14251782,roughness:0.6}),k=new w(new J0(0.12,0.015,0.06),I);k.position.set(0,0.13,0.125),k.rotation.x=0.35,z.add(k);let b=new X8({color:16707722}),n=new w(new H9(0.08,0.05),b);n.position.set(0,0.09,0.102),z.add(n),J.add(z),[[-0.18,0.14],[-0.18,-0.14]].forEach(([y,h])=>{let m=new N0;m.position.set(y,0,h);let i=new w(new S0(0.008,0.012,0.24,8),Y);i.position.y=0.12,i.castShadow=!0,m.add(i);let d=new w(new j8(0.022,0),X);d.position.y=0.25,m.add(d),J.add(m)});let r=new w(new J0(0.14,0.035,0.045),Z);r.position.set(0.08,0.025,-0.22),r.rotation.y=-0.3,r.castShadow=!0,J.add(r),this.sceneryGroup.add(J)}buildBioluminescentFireflies(){this.firefliesGroup=new N0,this.fireflies=[];let J=new G8(0.007,6,6),$=new X8({color:13434624,transparent:!0,opacity:this.isNightMode?0.85:0});[[-0.15,0.08,-0.45],[0.12,0.12,-0.35],[-0.05,0.1,-0.2],[0.22,0.09,-0.15],[-0.25,0.14,0.1],[0.08,0.11,0.25],[-0.18,0.09,0.38],[0.15,0.13,0.42],[-1.5,0.12,0.2],[-1.3,0.16,-0.15],[-1.65,0.18,-0.1],[-1.2,0.11,0.3],[-1.45,0.14,-0.35],[-1.1,0.1,-0.1],[-1.55,0.2,0.1],[-1.35,0.15,0.12],[1.35,0.12,0.35],[1.5,0.15,0.1],[1.25,0.14,-0.2],[1.4,0.11,-0.3],[1.1,0.1,0.25],[1.2,0.16,0.5],[0.95,0.12,0.15],[1.45,0.13,0.05]].forEach(([Q,K,W],Y)=>{let X=new w(J,$.clone());X.position.set(Q,K,W),this.firefliesGroup.add(X),this.fireflies.push({mesh:X,baseX:Q,baseY:K,baseZ:W,speed:0.6+Y%5*0.25,phase:Y*0.75,radius:0.035+Y%3*0.02})}),this.sceneryGroup.add(this.firefliesGroup)}triggerWindmillSpin(){if(!this.windmillSails)return;if(this.windmillCurrentSpeed=0.075,this.audio.playWindmillSpin(),this.windmillGroup)w0.to(this.windmillGroup.scale,{y:1.08,duration:0.15,yoyo:!0,repeat:1,ease:"power1.out"})}triggerWaterwheelSpin(){if(!this.waterwheel)return;if(this.audio.playWaterwheel(),this.triggerSplash(0,0.035,-0.73),this.watermillGroup)w0.to(this.watermillGroup.scale,{y:1.06,duration:0.12,yoyo:!0,repeat:1,ease:"power1.out"})}triggerSemaphoreToggle(){if(!this.semaphoreArm)return;this.semaphoreIsRaised=!this.semaphoreIsRaised;let J=this.semaphoreIsRaised?Math.PI*0.25:0;if(w0.to(this.semaphoreArm.rotation,{z:J,duration:0.35,ease:"back.out(1.8)"}),this.semaphoreLight)this.semaphoreLight.color.set(this.semaphoreIsRaised?1096065:14427686);this.audio.playSwitchClick()}triggerCottageChimney(){if(!this.cottageGroup)return;this.audio.playSteamChuff(!1),this.triggerTelegraphPing(this.cottageGroup)}buildLevelCrossingAndTelegraph(){let J=new N0;J.position.set(-0.45,0,0.82);let $=new w(new S0(0.016,0.018,0.38,8),new c({color:3359061,metalness:0.6}));$.position.y=0.19,$.castShadow=!0,J.add($);let Z=new c({color:16777215}),Q=new w(new J0(0.16,0.026,0.008),Z);Q.position.set(0,0.34,0.015),Q.rotation.z=Math.PI*0.25,J.add(Q);let K=new w(new J0(0.16,0.026,0.008),Z);K.position.set(0,0.34,0.015),K.rotation.z=-Math.PI*0.25,J.add(K);let W=new X8({color:15680580});this.crossingLamp1=new w(new G8(0.022,8,8),W),this.crossingLamp1.position.set(-0.05,0.27,0.022),J.add(this.crossingLamp1),this.crossingLight1=new y8(15680580,0.8,0.8),this.crossingLight1.position.copy(this.crossingLamp1.position),J.add(this.crossingLight1),this.crossingLamp2=new w(new G8(0.022,8,8),W),this.crossingLamp2.position.set(0.05,0.27,0.022),J.add(this.crossingLamp2),this.crossingLight2=new y8(15680580,0.2,0.8),this.crossingLight2.position.copy(this.crossingLamp2.position),J.add(this.crossingLight2),this.sceneryGroup.add(J);let Y=[[-1.2,1.45],[-0.45,1.35],[0.45,-1.35],[1.2,-1.45]],X=new c({color:7877903,roughness:0.8});Y.forEach(([H,q])=>{let U=new N0;U.position.set(H,0,q);let F=new w(new S0(0.018,0.024,0.44,6),X);F.position.y=0.22,F.castShadow=!0,U.add(F);let V=new w(new J0(0.16,0.016,0.016),X);V.position.y=0.4,U.add(V);let G=new c({color:16777215,roughness:0.2});[-0.06,0.06].forEach((N)=>{let E=new w(new S0(0.008,0.008,0.02,6),G);E.position.set(N,0.415,0),U.add(E)}),this.sceneryGroup.add(U),this.interactivePoles.push(U)})}getApproxDistanceToTrack(J,$){let Z=1/0,Q=140;for(let K=0;K<Q;K++){let W=K/Q*Math.PI*2,Y=Math.sin(W)*3.3,X=Math.sin(2*W)*1.6,H=Math.hypot(Y-J,X-$);if(H<Z)Z=H}return Z}buildLushNatureAndFlock(){let J=[{x:-2.75,z:0.1,type:"deciduous",col:1409085,scale:1.1},{x:-2.6,z:-0.35,type:"pine",col:1467700,scale:1.2},{x:-2.8,z:-0.1,type:"deciduous",col:2278750,scale:1},{x:-1.75,z:-0.55,type:"pine",col:1332013,scale:1.15},{x:-1.45,z:0.45,type:"deciduous",col:6660877,scale:1.05},{x:-1.15,z:-0.3,type:"pine",col:1409085,scale:0.95},{x:2.75,z:0.1,type:"deciduous",col:1409085,scale:1.1},{x:2.6,z:-0.45,type:"pine",col:1467700,scale:1.2},{x:2.8,z:-0.1,type:"deciduous",col:2278750,scale:1},{x:1.75,z:0.5,type:"pine",col:1332013,scale:1.15},{x:1.45,z:-0.45,type:"deciduous",col:6660877,scale:1.05},{x:1.15,z:0.3,type:"pine",col:1409085,scale:0.95}],$=new c({color:7877903,roughness:0.7});J.forEach(({x:G,z:N,type:E,col:O,scale:D})=>{let R=new N0;R.position.set(G,0,N),R.scale.setScalar(D);let B=new w(new S0(0.026,0.034,0.16,6),$);B.position.y=0.08,B.castShadow=!0,R.add(B);let z=new c({color:O,roughness:0.5});if(E==="pine"){let C=new w(new V8(0.18,0.22,6),z);C.position.y=0.22,C.castShadow=!0,R.add(C);let L=new w(new V8(0.13,0.18,6),z);L.position.y=0.32,L.castShadow=!0,R.add(L);let A=new w(new V8(0.08,0.13,6),z);A.position.y=0.41,A.castShadow=!0,R.add(A)}else{let C=new w(new j8(0.18,1),z);C.position.set(0,0.25,0),C.castShadow=!0,R.add(C);let L=new w(new j8(0.13,1),z);L.position.set(0.04,0.35,0.02),L.castShadow=!0,R.add(L)}this.interactiveTrees.push(R),this.sceneryGroup.add(R)});let Z=new c({color:16317180,roughness:0.9}),Q=new c({color:1976635,roughness:0.5});[[-1.85,0.04,0.35],[-2.2,0.04,0.38],[-2.35,0.04,-0.15],[1.75,0.04,-0.15],[2.15,0.04,-0.4]].forEach(([G,N,E])=>{let O=new N0;O.position.set(G,N,E);let D=new w(new j8(0.045,1),Z);D.position.y=0.045,D.scale.set(1.2,0.9,0.9),O.add(D);let R=new w(new G8(0.022,6,6),Q);R.position.set(0.05,0.05,0),O.add(R),this.interactiveSheep.push(O),this.sceneryGroup.add(O)});let W=new N0;W.position.set(-1.62,0.04,-0.22);let Y=new c({color:11817737,roughness:0.85}),X=new c({color:16710083,roughness:0.35}),H=new w(new J0(0.12,0.08,0.07),Y);H.position.y=0.055,W.add(H);let q=new w(new J0(0.06,0.06,0.06),Y);q.position.set(0.08,0.075,0),W.add(q);let U=new w(new V8(0.012,0.05,5),X);U.rotation.z=-Math.PI*0.35,U.position.set(0.08,0.11,0.035),W.add(U);let F=new w(new V8(0.012,0.05,5),X);F.rotation.z=-Math.PI*0.35,F.position.set(0.08,0.11,-0.035),W.add(F),this.interactiveSheep.push(W),this.sceneryGroup.add(W);let V=[15680580,16436245,16777215,11032055];for(let G=0;G<48;G++){let N=G%2===0?-1.15:1.15,E=0.22+G%5*0.14,O=G*1.35,D=N+Math.cos(O)*E,R=Math.sin(O)*E;if(this.getApproxDistanceToTrack(D,R)<0.35)continue;let B=V[G%V.length],z=new X8({color:B}),C=new w(new G8(0.016,6,6),z);C.position.set(D,0.04,R),this.sceneryGroup.add(C)}}buildArticulatedTrain(){let J=new N0,$=new c({color:10033947,roughness:0.35}),Z=new w(new J0(0.38,0.04,0.18),$);Z.position.y=0.05,Z.castShadow=!0,J.add(Z);let Q=new w(new V8(0.1,0.08,4),new c({color:12131356}));Q.rotation.y=Math.PI*0.25,Q.rotation.x=-Math.PI*0.5,Q.position.set(0.2,0.045,0),Q.castShadow=!0,J.add(Q);let K=new c({color:292951,roughness:0.25,metalness:0.12}),W=new w(new S0(0.075,0.075,0.22,16),K);W.rotation.z=Math.PI*0.5,W.position.set(0.07,0.125,0),W.castShadow=!0,J.add(W);let Y=new w(new G8(0.074,12,12),K);Y.position.set(0.18,0.125,0),Y.castShadow=!0,J.add(Y);let X=new c({color:16096779,metalness:0.8,roughness:0.25});[-0.01,0.06,0.14].forEach(($0)=>{let D0=new w(new l9(0.076,0.006,8,16),X);D0.rotation.y=Math.PI*0.5,D0.position.set($0,0.125,0),J.add(D0)});let H=new c({color:1976635,roughness:0.4}),q=new w(new S0(0.024,0.018,0.08,8),H);q.position.set(0.13,0.22,0),q.castShadow=!0,J.add(q);let U=new w(new l9(0.024,0.005,6,12),X);U.rotation.x=Math.PI*0.5,U.position.set(0.13,0.26,0),J.add(U);let F=new w(new G8(0.032,10,10),X);F.position.set(0.02,0.21,0),F.castShadow=!0,J.add(F);let V=new c({color:417606,roughness:0.3}),G=new w(new J0(0.16,0.16,0.176),V);G.position.set(-0.1,0.15,0),G.castShadow=!0,J.add(G);let N=new w(new J0(0.18,0.025,0.19),X);N.position.set(-0.1,0.24,0),N.castShadow=!0,J.add(N);let E=new X8({color:16707722}),O=new w(new H9(0.06,0.06),E);O.position.set(-0.1,0.16,0.089),J.add(O);let D=new w(new H9(0.06,0.06),E);D.rotation.y=Math.PI,D.position.set(-0.1,0.16,-0.089),J.add(D);let R=new w(new S0(0.034,0.028,0.044,16),X);R.rotation.z=Math.PI*0.5,R.position.set(0.2,0.14,0),R.castShadow=!0,J.add(R);let B=new w(new l9(0.034,0.005,8,16),X);B.rotation.y=Math.PI*0.5,B.position.set(0.222,0.14,0),J.add(B);let z=new c({color:16777215,metalness:0.95,roughness:0.08}),C=new w(new V8(0.028,0.022,16,1,!0),z);C.rotation.z=-Math.PI*0.5,C.position.set(0.21,0.14,0),J.add(C);let L=new c({color:16776171,emissive:16707722,emissiveIntensity:3.2,roughness:0.1}),A=new w(new G8(0.013,8,8),L);A.position.set(0.218,0.14,0),J.add(A);let _=new c({color:16772565,emissive:16707722,emissiveIntensity:1.5,roughness:0.1,metalness:0.2,transparent:!0,opacity:0.85}),I=new w(new G8(0.031,12,12,0,Math.PI*2,0,Math.PI*0.5),_);I.rotation.z=-Math.PI*0.5,I.position.set(0.222,0.14,0),J.add(I),this.headlampLight=new y8(16707722,1.8,1.2),this.headlampLight.position.set(0.26,0.14,0),J.add(this.headlampLight),this.headlampSpotLight=new vQ(16775149,2.2,2,Math.PI*0.16,0.85,1.4),this.headlampSpotLight.position.set(0.23,0.14,0);let k=new E8;k.position.set(0.85,0.04,0),J.add(k),this.headlampSpotLight.target=k,J.add(this.headlampSpotLight);let b=new S0(0.024,0.09,0.46,24,1,!0);b.translate(0,-0.23,0),b.rotateZ(Math.PI*0.5),b.rotateY(-0.06);let n=new X8({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.32,blending:X7,side:m9,depthWrite:!1});this.headlampBeam=new w(b,n),this.headlampBeam.position.set(0.22,0.14,0),this.headlampBeam.visible=!1,J.add(this.headlampBeam);let r=new S0(0.012,0.042,0.28,16,1,!0);r.translate(0,-0.14,0),r.rotateZ(Math.PI*0.5),r.rotateY(-0.06);let y=new X8({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.38,blending:X7,side:m9,depthWrite:!1});this.headlampCoreBeam=new w(r,y),this.headlampCoreBeam.position.set(0.22,0.14,0),this.headlampCoreBeam.visible=!1,J.add(this.headlampCoreBeam);let h=new X8({map:this.createHeadlampPoolTexture(),transparent:!0,opacity:0.45,blending:X7,depthWrite:!1});this.headlampTrackPool=new w(new H9(0.24,0.44),h),this.headlampTrackPool.rotation.x=-Math.PI*0.5,this.headlampTrackPool.rotation.z=-Math.PI*0.5,this.headlampTrackPool.position.set(0.4,0.058,0),this.headlampTrackPool.visible=!1,J.add(this.headlampTrackPool);let m=new c({color:16096779,metalness:0.85,roughness:0.2}),i=new w(new S0(0.032,0.038,0.045,12),m);i.position.set(0.04,0.175,0),i.castShadow=!0,J.add(i);let d=new w(new S0(0.006,0.006,0.035,6),m);d.position.set(-0.03,0.19,0.03),J.add(d);let g=new c({color:988970,roughness:0.45,metalness:0.4}),p=new w(new S0(0.072,0.072,0.012,16),g);p.rotation.z=Math.PI*0.5,p.position.set(0.186,0.125,0),p.castShadow=!0,J.add(p);let t=new w(new S0(0.024,0.024,0.006,12),m);t.rotation.z=Math.PI*0.5,t.position.set(0.193,0.125,0),J.add(t);let v=new c({color:1976635,roughness:0.35,metalness:0.7});[-0.102,0.102].forEach(($0)=>{let D0=new w(new S0(0.026,0.026,0.088,12),v);D0.rotation.z=Math.PI*0.5,D0.position.set(0.09,0.045,$0),D0.castShadow=!0,J.add(D0);let C0=new w(new S0(0.01,0.01,0.05,8),m);C0.rotation.z=Math.PI*0.5,C0.position.set(0.035,0.045,$0),J.add(C0)});let e=new X8({color:16347926}),H0=new w(new J0(0.045,0.05,0.01),e);H0.position.set(-0.02,0.1,0),J.add(H0);let V0=new y8(16347926,0.8,0.6);V0.position.set(-0.04,0.12,0),J.add(V0);let R0=new c({color:1976635,metalness:0.8,roughness:0.4}),x0=new w(new J0(0.04,0.016,0.024),R0);x0.position.set(-0.19,0.048,0),J.add(x0),this.attachWheels(J,[[0.08,0.045,0.09],[-0.08,0.045,0.09],[0.08,0.045,-0.09],[-0.08,0.045,-0.09]],0.045);let u0=new c({color:13948120,metalness:0.85,roughness:0.2}),_0=new J0(0.18,0.01,0.006);this.leftSideRod=new w(_0,u0),this.leftSideRod.position.set(0,0.045,0.104),this.leftSideRod.castShadow=!0,J.add(this.leftSideRod),this.rightSideRod=new w(_0,u0),this.rightSideRod.position.set(0,0.045,-0.104),this.rightSideRod.castShadow=!0,J.add(this.rightSideRod),this.locoCar=J,this.trainGroup.add(this.locoCar);let f0=new N0,x=new c({color:3359061,roughness:0.5}),O0=new w(new J0(0.24,0.11,0.17),x);O0.position.y=0.095,O0.castShadow=!0,f0.add(O0);let W0=new c({color:988970,roughness:0.9}),K0=new w(new j8(0.08,1),W0);K0.position.set(0,0.14,0),K0.scale.set(1.2,0.6,0.85),K0.castShadow=!0,f0.add(K0);let Q0=new w(new J0(0.04,0.016,0.024),R0);Q0.position.set(0.13,0.048,0),f0.add(Q0);let z0=new w(new J0(0.04,0.016,0.024),R0);z0.position.set(-0.13,0.048,0),f0.add(z0),this.attachWheels(f0,[[0.065,0.038,0.088],[-0.065,0.038,0.088],[0.065,0.038,-0.088],[-0.065,0.038,-0.088]],0.038),this.tenderCar=f0,this.trainGroup.add(this.tenderCar);let E0=new N0,P0=new c({color:14251782,roughness:0.3}),S=new w(new J0(0.36,0.14,0.176),P0);S.position.y=0.11,S.castShadow=!0,E0.add(S);let M=new c({color:16777215,roughness:0.3}),l=new w(new J0(0.38,0.028,0.19),M);l.position.y=0.19,l.castShadow=!0,E0.add(l);let q0=new w(new J0(0.3,0.022,0.11),M);q0.position.y=0.21,q0.castShadow=!0,E0.add(q0);let Z0=new c({color:1976635,metalness:0.8,roughness:0.4});[-0.19,0.19].forEach(($0)=>{let D0=new w(new J0(0.04,0.012,0.15),Z0);D0.position.set($0,0.046,0),E0.add(D0);let C0=new w(new J0(0.01,0.045,0.15),Z0);C0.position.set($0,0.072,0),E0.add(C0)}),this.coachWindowMat=new c({color:16707722,emissive:0,emissiveIntensity:0,roughness:0.1}),[-0.1,0,0.1].forEach(($0)=>{let D0=new w(new H9(0.055,0.055),this.coachWindowMat);D0.position.set($0,0.125,0.089),E0.add(D0);let C0=new w(new H9(0.055,0.055),this.coachWindowMat);C0.rotation.y=Math.PI,C0.position.set($0,0.125,-0.089),E0.add(C0)}),this.coachInteriorLight1=new y8(16707722,0,1.2),this.coachInteriorLight1.position.set(-0.06,0.125,0),E0.add(this.coachInteriorLight1),this.coachInteriorLight2=new y8(16707722,0,1.2),this.coachInteriorLight2.position.set(0.06,0.125,0),E0.add(this.coachInteriorLight2);let U0=new w(new J0(0.04,0.016,0.024),R0);U0.position.set(0.19,0.048,0),E0.add(U0);let y0=new w(new J0(0.04,0.016,0.024),R0);y0.position.set(-0.19,0.048,0),E0.add(y0),this.attachWheels(E0,[[0.1,0.038,0.088],[-0.1,0.038,0.088],[0.1,0.038,-0.088],[-0.1,0.038,-0.088]],0.038),this.coachCar=E0,this.trainGroup.add(this.coachCar);let F0=new N0,A0=new c({color:12456508,roughness:0.35}),T0=new w(new J0(0.3,0.13,0.176),A0);T0.position.y=0.105,T0.castShadow=!0,F0.add(T0);let h0=new w(new J0(0.12,0.07,0.14),A0);h0.position.set(-0.02,0.2,0),h0.castShadow=!0,F0.add(h0);let X0=new w(new J0(0.14,0.018,0.16),M);X0.position.set(-0.02,0.245,0),F0.add(X0);let O8=new X8({color:16707722});[-0.072,0.072].forEach(($0)=>{let D0=new w(new H9(0.06,0.035),O8);if(D0.position.set(-0.02,0.2,$0),$0<0)D0.rotation.y=Math.PI;F0.add(D0)});let l0=new w(new J0(0.05,0.012,0.15),R0);l0.position.set(-0.175,0.046,0),F0.add(l0);let v0=new w(new J0(0.01,0.045,0.15),m);v0.position.set(-0.195,0.072,0),F0.add(v0);let M0=new w(new J0(0.04,0.016,0.024),R0);M0.position.set(0.16,0.048,0),F0.add(M0);let j=new w(new G8(0.024,8,8),new X8({color:15680580}));j.position.set(-0.16,0.12,0),F0.add(j),this.tailLight=new y8(15680580,0.8,1.2),this.tailLight.position.set(-0.2,0.12,0),F0.add(this.tailLight),this.attachWheels(F0,[[0.08,0.038,0.088],[-0.08,0.038,0.088],[0.08,0.038,-0.088],[-0.08,0.038,-0.088]],0.038),this.cabooseCar=F0,this.trainGroup.add(this.cabooseCar);for(let $0=0;$0<16;$0++){let D0=new w(new j8(0.036+$0%3*0.014,1),new c({color:16777215,roughness:0.1,transparent:!0,opacity:0,depthWrite:!1}));D0.visible=!1,D0.position.set(0,-100,0),this.rootGroup.add(D0),this.steamParticles.push({mesh:D0,life:0,vx:0,vy:0,vz:0})}}attachWheels(J,$,Z){let Q=new c({color:1976635,metalness:0.75,roughness:0.25}),K=new c({color:14251782,metalness:0.85,roughness:0.25}),W=new c({color:14251782,metalness:0.55,roughness:0.35}),Y=new S0(Z,Z,0.018,20);Y.rotateX(Math.PI*0.5);let X=new S0(Z*0.36,Z*0.36,0.024,12);X.rotateX(Math.PI*0.5);let H=new J0(Z*1.6,Z*0.2,0.02),q=new J0(Z*0.2,Z*1.6,0.02);$.forEach(([U,F,V])=>{let G=new w(Y,Q);G.position.set(U,F,V),G.castShadow=!0;let N=new w(X,K);G.add(N);let E=new w(H,W);G.add(E);let O=new w(q,W);G.add(O),J.add(G),this.rotatingWheels.push(G)})}buildAlpineMountainRidge(){let J=new N0,$=new c({color:4674921,roughness:0.88,flatShading:!0}),Z=new c({color:16317180,roughness:0.35,emissive:16777215,emissiveIntensity:0.08,flatShading:!0}),Q=new c({color:1332013,roughness:0.65}),K=new c({color:4528643,roughness:0.8}),W=new c({color:3359061,roughness:0.9,flatShading:!0}),Y=new c({color:6583435,roughness:0.82,flatShading:!0}),X=-1.35,H=-2.95,q=1.6,U=2.75,F=0.96,V=8;Z.polygonOffset=!0,Z.polygonOffsetFactor=-1,Z.polygonOffsetUnits=-1;let G=new w(new V8(1.6,2.75,8,1),$);G.position.set(-1.35,1.155,-2.95),G.rotation.y=0.4,G.receiveShadow=!0,G.castShadow=!0,J.add(G);let N=new w(new V8(0.5864727272727274,0.96,8,1),Z);N.position.set(-1.35,2.06,-2.95),N.rotation.y=G.rotation.y,N.receiveShadow=!0,J.add(N),[{x:-2.8,z:-2.3,s:0.18},{x:-2.3,z:-2,s:0.22},{x:-1.1,z:-2.1,s:0.16},{x:0.4,z:-2.4,s:0.2},{x:-0.1,z:-2.5,s:0.15}].forEach((D)=>{let R=new w(new j8(D.s,0),Y);R.position.set(D.x,0.08,D.z),R.rotation.set(0.4,0.7,0.2),R.castShadow=!0,R.receiveShadow=!0,J.add(R)}),[[-2.9,-2.4],[-2.5,-2.2],[-2.1,-2.1],[-1.4,-2.3],[-0.8,-2.2],[-0.2,-2.4],[0.3,-2.6],[-3.1,-3],[-2.6,-3.4],[-1,-3.3],[0.6,-3.2]].forEach(([D,R],B)=>{let z=new N0;z.position.set(D,0,R);let C=0.75+B%3*0.18;z.scale.setScalar(C);let L=new w(new S0(0.02,0.03,0.14,5),K);L.position.y=0.07,z.add(L);let A=new w(new V8(0.14,0.24,6),Q);A.position.y=0.22,A.castShadow=!0,z.add(A);let _=new w(new V8(0.1,0.18,6),Q);_.position.y=0.33,z.add(_),J.add(z)}),this.alpineRidgeGroup=J,this.sceneryGroup.add(this.alpineRidgeGroup)}buildCampsiteAndCampfire(){let J=new N0;J.position.set(-1.3,0.04,-2.1);let $=new N0;$.position.set(-0.16,0,0.08),$.rotation.y=0.42;let Z=new c({color:16096779,roughness:0.6,side:m9}),Q=new S0(0.11,0.11,0.24,3,1,!1),K=new w(Q,Z);K.rotation.z=Math.PI*0.5,K.rotation.y=Math.PI*0.5,K.position.y=0.08,K.castShadow=!0,$.add(K);let W=new X8({color:4528643}),Y=new w(new n7(0.05,3),W);Y.position.set(0,0.055,0.121),$.add(Y),J.add($);let X=new N0;X.position.set(0.15,0,0.1),X.rotation.y=-0.65;let H=new c({color:1981066,roughness:0.6,side:m9}),q=new w(Q,H);q.rotation.z=Math.PI*0.5,q.rotation.y=Math.PI*0.5,q.position.y=0.08,q.castShadow=!0,X.add(q),J.add(X);let U=new N0;U.position.set(0,0,-0.1);let F=new c({color:7893356,roughness:0.8});for(let z=0;z<8;z++){let C=z/8*Math.PI*2,L=new w(new j8(0.035,1),F);L.position.set(Math.cos(C)*0.14,0.02,Math.sin(C)*0.14),U.add(L)}let V=new c({color:7877903,roughness:0.85});for(let z=0;z<3;z++){let C=new w(new S0(0.02,0.022,0.2,6),V);C.rotation.z=Math.PI*0.5,C.rotation.y=z*Math.PI/3,C.position.y=0.025,U.add(C)}let G=new X8({color:16347926}),N=new w(new V8(0.07,0.18,7),G);N.position.y=0.1,U.add(N),this.campfireFlame=N;let E=new X8({color:16707722}),O=new w(new V8(0.035,0.11,7),E);O.position.y=0.08,U.add(O),this.campfireLight=new y8(16347926,1.4,1.8),this.campfireLight.position.set(0,0.18,0),U.add(this.campfireLight);let D=20,R=new F8;this.campfireParticlePos=new Float32Array(D*3);for(let z=0;z<D;z++)this.campfireParticlePos[z*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[z*3+1]=0.06+Math.random()*0.22,this.campfireParticlePos[z*3+2]=(Math.random()-0.5)*0.12;R.setAttribute("position",new v8(this.campfireParticlePos,3));let B=new AJ({color:16498468,size:0.03,transparent:!0,blending:X7,opacity:0.85});this.campfireParticles=new U7(R,B),U.add(this.campfireParticles),J.add(U),this.campsiteGroup=J,this.sceneryGroup.add(this.campsiteGroup)}buildRailwayWaterTower(){let J=new N0;J.position.set(1.65,0.04,-2.35);let $=new c({color:7877903,roughness:0.75}),Z=new c({color:9584654,roughness:0.65}),Q=new c({color:1976635,roughness:0.4,metalness:0.7}),K=new c({color:11817737,roughness:0.6}),W=0.48,Y=0.04,X=0.22;[[-X,-X],[X,-X],[-X,X],[X,X]].forEach(([L,A])=>{let _=new w(new J0(Y,W,Y),$);_.position.set(L,W*0.5,A),_.castShadow=!0,J.add(_)});let H=new w(new J0(X*2+0.12,0.04,X*2+0.12),$);H.position.y=W,H.castShadow=!0,J.add(H);let q=0.42,U=0.28,F=new w(new S0(U,U,q,16),Z);F.position.y=W+q*0.5+0.02,F.castShadow=!0,J.add(F),[-0.14,0,0.14].forEach((L)=>{let A=new w(new l9(U+0.006,0.009,6,20),Q);A.rotation.x=Math.PI*0.5,A.position.y=F.position.y+L,J.add(A)});let V=new w(new V8(U+0.06,0.22,16),K);V.position.y=F.position.y+q*0.5+0.11,V.castShadow=!0,J.add(V);let G=new w(new G8(0.03,8,8),Q);G.position.y=V.position.y+0.13,J.add(G);let N=new N0;N.position.set(-0.28,W+0.24,0),N.rotation.y=-Math.PI*0.5,N.rotation.x=0.25;let E=new c({color:3359061,roughness:0.5,metalness:0.4}),O=new w(new S0(0.035,0.055,0.32,12),E);O.rotation.x=Math.PI*0.5,O.position.z=0.16,N.add(O);let D=new w(new G8(0.04,8,8),Q);D.position.set(0,0.12,0.05),N.add(D),J.add(N),this.waterTowerSpout=N;let R=35,B=new F8,z=new Float32Array(R*3);for(let L=0;L<R;L++)z[L*3]=(Math.random()-0.5)*0.06,z[L*3+1]=-Math.random()*0.35,z[L*3+2]=0.3+(Math.random()-0.5)*0.06;B.setAttribute("position",new v8(z,3));let C=new AJ({color:3718648,size:0.035,transparent:!0,opacity:0.75});this.waterSprayPoints=new U7(B,C),this.waterSprayPoints.position.copy(N.position),this.waterSprayPoints.visible=!1,J.add(this.waterSprayPoints),this.waterTowerGroup=J,this.sceneryGroup.add(this.waterTowerGroup)}buildRailwayServiceDepot(){let J=new N0;J.position.set(1.7,0.04,-2.1);let $=new c({color:6583435,roughness:0.8}),Z=new c({color:4528643,roughness:0.7}),Q=new c({color:4674921,metalness:0.8,roughness:0.35}),K=new c({color:1976635,metalness:0.9,roughness:0.25}),W=new c({color:592399,roughness:0.95}),Y=new c({color:165063,metalness:0.7,roughness:0.3}),X=new N0,H=new w(new J0(0.38,0.03,0.28),$);H.position.y=0.015,X.add(H),[-0.16,0.16].forEach((D)=>{[-0.12,0.12].forEach((R)=>{let B=new w(new J0(0.02,0.18,0.02),Z);B.position.set(D,0.1,R),B.castShadow=!0,X.add(B)})});let q=new w(new J0(0.42,0.016,0.16),Q);q.position.set(0,0.23,-0.06),q.rotation.x=0.45,q.castShadow=!0,X.add(q);let U=new w(new J0(0.42,0.016,0.16),Q);U.position.set(0,0.23,0.06),U.rotation.x=-0.45,U.castShadow=!0,X.add(U);let F=new w(new J0(0.34,0.16,0.015),Z);F.position.set(0,0.1,-0.12),X.add(F);let V=new w(new J0(0.18,0.07,0.06),Z);V.position.set(0,0.045,-0.08),V.castShadow=!0,X.add(V);let G=new w(new J0(0.05,0.025,0.03),K);G.position.set(0.04,0.09,-0.08),X.add(G),J.add(X);let N=new N0;N.position.set(-0.28,0,0.05);let E=new w(new J0(0.18,0.09,0.16),Z);E.position.y=0.045,E.castShadow=!0,N.add(E);let O=new w(new j8(0.07,1),W);O.position.set(0,0.08,0),O.scale.set(1.1,0.6,0.9),O.castShadow=!0,N.add(O),J.add(N),[[-0.24,0,-0.1],[-0.29,0,-0.08]].forEach(([D,R,B])=>{let z=new w(new S0(0.026,0.026,0.08,10),Y);z.position.set(D,0.04,B),z.castShadow=!0,J.add(z)}),this.depotShedGroup=J,this.sceneryGroup.add(this.depotShedGroup)}buildHotAirBalloon(){let J=new N0;J.position.set(1.6,2.7,0.6);let $=new c({color:14753096,roughness:0.45}),Z=new c({color:16498468,roughness:0.45}),Q=new c({color:889992,roughness:0.45}),K=new G8(0.42,24,16,0,Math.PI*2,0,Math.PI*0.65),W=new w(K,$);J.add(W);let Y=new l9(0.4,0.03,8,24),X=new w(Y,Z);X.rotation.x=Math.PI*0.5,X.position.y=-0.05,J.add(X);let H=new S0(0.39,0.16,0.34,24,1,!0),q=new w(H,Q);q.position.y=-0.22,J.add(q);let U=new c({color:4674921,metalness:0.8,roughness:0.3}),F=new w(new l9(0.08,0.015,6,16),U);F.rotation.x=Math.PI*0.5,F.position.y=-0.42,J.add(F);let V=new X8({color:16347926}),G=new w(new V8(0.06,0.14,8),V);G.position.y=-0.4,J.add(G),this.balloonBurnerFlame=G,this.balloonBurnerLight=new y8(16347926,0.5,2.2),this.balloonBurnerLight.position.y=-0.4,J.add(this.balloonBurnerLight);let N=new c7({color:7877903}),E=[new T(-0.15,-0.38,-0.15),new T(-0.08,-0.62,-0.08),new T(0.15,-0.38,-0.15),new T(0.08,-0.62,-0.08),new T(-0.15,-0.38,0.15),new T(-0.08,-0.62,0.08),new T(0.15,-0.38,0.15),new T(0.08,-0.62,0.08)],O=new F8().setFromPoints(E),D=new WZ(O,N);J.add(D);let R=new c({color:14251782,roughness:0.85}),B=new w(new J0(0.18,0.14,0.18),R);B.position.y=-0.69,B.castShadow=!0,J.add(B),this.hotAirBalloonGroup=J,this.celestialGroup.add(this.hotAirBalloonGroup)}buildMiniatureVillageLife(){let J=new N0,$=new c({color:7877903,roughness:0.75}),Z=new c({color:9741240,roughness:0.85}),Q=new N0;Q.position.set(0.1,0.04,1.38),Q.rotation.y=0.35;let K=new w(new J0(0.14,0.012,0.045),$);K.position.y=0.038,K.castShadow=!0,Q.add(K);let W=new w(new J0(0.14,0.045,0.01),$);W.position.set(0,0.065,-0.02),W.castShadow=!0,Q.add(W),[-0.055,0.055].forEach((L)=>{let A=new w(new J0(0.012,0.038,0.04),Z);A.position.set(L,0.019,0),Q.add(A)}),J.add(Q);let Y=new c({color:1976635,roughness:0.6,metalness:0.8}),X=new c({color:16707722,emissive:16498468,emissiveIntensity:0.85,roughness:0.2});[[-0.26,0.04,1.38],[0.26,0.04,1.38]].forEach(([L,A,_])=>{let I=new N0;I.position.set(L,A,_);let k=new w(new S0(0.01,0.014,0.26,8),Y);k.position.y=0.13,k.castShadow=!0,I.add(k);let b=new w(new j8(0.024,0),X);b.position.y=0.27,I.add(b),J.add(I)});let q=new c({color:15680580,roughness:0.5}),U=new c({color:16436245,roughness:0.5}),F=new c({color:6333946,roughness:0.5}),V=new c({color:12616956,roughness:0.5}),G=new c({color:1409085,roughness:0.8}),N=[[-0.75,0.3],[-0.82,0.35],[-0.7,0.25],[-0.62,0.32],[0.68,0.25],[0.74,0.32],[0.62,0.2],[0.8,0.22],[-0.45,-0.45],[-0.5,-0.4],[-0.38,-0.48]],E=[q,U,F,V];N.forEach(([L,A],_)=>{if(this.getApproxDistanceToTrack(L,A)<0.45)return;let I=new w(new S0(0.003,0.004,0.04,4),G);I.position.set(L,0.06,A),J.add(I);let k=E[_%E.length],b=new w(new j8(0.014,0),k);b.position.set(L,0.082,A),J.add(b)});let O=[16638023,3718648,16486972,12616956];[new T(-0.72,0.14,0.3),new T(0.7,0.15,0.26),new T(-0.45,0.12,-0.42),new T(-1.1,0.16,0.25)].forEach((L,A)=>{let _=new N0;_.position.copy(L);let I=new X8({color:O[A%O.length],side:m9}),k=new H9(0.016,0.024),b=new w(k,I);b.position.x=-0.009,b.rotation.y=Math.PI*0.5,_.add(b);let n=new w(k,I);n.position.x=0.009,n.rotation.y=-Math.PI*0.5,_.add(n),J.add(_),this.butterflies.push({mesh:_,basePos:L.clone(),phase:A*1.5,speed:0.8+A*0.2})});let R=new N0;R.position.set(-0.16,0.09,1.25);let B=new w(new J0(0.065,0.038,0.04),$);B.position.set(0,0.019,0),B.castShadow=!0,R.add(B);let z=new w(new J0(0.05,0.032,0.032),new c({color:10105874,roughness:0.7}));z.position.set(0.005,0.052,0),z.rotation.y=0.15,z.castShadow=!0,R.add(z);let C=new c({color:9741240,roughness:0.35,metalness:0.6});[-0.05,0.06].forEach((L)=>{let A=new w(new S0(0.014,0.016,0.045,8),C);A.position.set(L,0.022,0.03),A.castShadow=!0,R.add(A)}),J.add(R),this.sceneryGroup.add(J)}setupWeatherSystem(){this.rainPositions=new Float32Array(this.rainCount*6),this.rainGeo=new F8;let J=0.18;for(let K=0;K<this.rainCount;K++){let W=(Math.random()-0.5)*5.5,Y=Math.random()*3.5,X=(Math.random()-0.5)*4.5;this.rainPositions[K*6]=W,this.rainPositions[K*6+1]=Y,this.rainPositions[K*6+2]=X,this.rainPositions[K*6+3]=W-0.02,this.rainPositions[K*6+4]=Y-J,this.rainPositions[K*6+5]=X-0.01}this.rainGeo.setAttribute("position",new v8(this.rainPositions,3));let $=new c7({color:9684477,transparent:!0,opacity:0});this.rainStreaks=new WZ(this.rainGeo,$),this.weatherGroup.add(this.rainStreaks);let Z=new X8({color:12248829,transparent:!0,opacity:0,side:m9}),Q=new i7(0.01,0.02,12);Q.rotateX(-Math.PI*0.5);for(let K=0;K<20;K++){let W=new w(Q,Z.clone());W.position.set(0,-10,0),this.weatherGroup.add(W),this.splashRipples.push({mesh:W,life:0,maxRadius:0.12})}}setWeather(J){if(this.isRaining=J==="rain",this.rainStreaks){let $=this.isRaining?0.65:0;w0.to(this.rainStreaks.material,{opacity:$,duration:0.8})}this.audio.setRain(this.isRaining)}triggerSplash(J,$,Z){let Q=this.splashRipples.find((K)=>K.life<=0);if(!Q)return;Q.mesh.position.set(J,$+0.005,Z),Q.mesh.scale.setScalar(0.2),Q.mesh.material.opacity=0.6,Q.life=1}bindEvents(){window.addEventListener("resize",()=>{let J=this.container.clientWidth,$=this.container.clientHeight;if(J===0||$===0)return;this.camera.aspect=J/$,this.camera.updateProjectionMatrix(),this.renderer.setSize(J,$)}),this.container.addEventListener("pointerdown",(J)=>{let $=this.container.getBoundingClientRect();if(this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera),this.raycaster.intersectObjects([this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],!0).length>0){this.triggerWhistleHop();return}if(this.clockTowerGroup){if(this.raycaster.intersectObject(this.clockTowerGroup,!0).length>0){this.triggerClockBell();return}}let Q=this.raycaster.intersectObjects(this.interactiveTrees,!0);if(Q.length>0){let X=Q[0].object;while(X&&!this.interactiveTrees.includes(X))X=X.parent;if(X){this.triggerTreeWobble(X);return}}if(this.mooredBoat){if(this.raycaster.intersectObject(this.mooredBoat,!0).length>0){this.triggerBoatRock();return}}let K=this.raycaster.intersectObjects(this.interactiveSheep,!0);if(K.length>0){let X=K[0].object;while(X&&!this.interactiveSheep.includes(X))X=X.parent;if(X){this.triggerSheepHop(X);return}}if(this.raycaster.intersectObjects(this.viaductLanterns,!0).length>0){this.triggerLanternSpark();return}let Y=this.raycaster.intersectObjects(this.interactivePoles,!0);if(Y.length>0){let X=Y[0].object;while(X&&!this.interactivePoles.includes(X))X=X.parent;if(X){this.triggerTelegraphPing(X);return}}if(this.windmillGroup){if(this.raycaster.intersectObject(this.windmillGroup,!0).length>0){this.triggerWindmillSpin();return}}if(this.watermillGroup){if(this.raycaster.intersectObject(this.watermillGroup,!0).length>0){this.triggerWaterwheelSpin();return}}if(this.semaphoreGroup){if(this.raycaster.intersectObject(this.semaphoreGroup,!0).length>0){this.triggerSemaphoreToggle();return}}if(this.cottageGroup){if(this.raycaster.intersectObject(this.cottageGroup,!0).length>0){this.triggerCottageChimney();return}}if(this.campsiteGroup){if(this.raycaster.intersectObject(this.campsiteGroup,!0).length>0){this.triggerCampfirePop();return}}if(this.waterTowerGroup){if(this.raycaster.intersectObject(this.waterTowerGroup,!0).length>0){this.triggerWaterTowerSpray();return}}if(this.hotAirBalloonGroup){if(this.raycaster.intersectObject(this.hotAirBalloonGroup,!0).length>0){this.triggerBalloonBurner();return}}if(this.townFountainGroup){if(this.raycaster.intersectObject(this.townFountainGroup,!0).length>0){this.triggerFountainSurge();return}}if(this.farmBarnGroup){if(this.raycaster.intersectObject(this.farmBarnGroup,!0).length>0){this.triggerBarnBoop();return}}if(this.waterMesh){let X=this.raycaster.intersectObject(this.waterMesh,!0);if(X.length>0){let H=X[0].point;this.triggerSplash(H.x,H.y,H.z),this.audio.playWaterDrop()}}}),this.controls.addEventListener("start",()=>{if(this.currentViewMode!=="isometric"&&this.currentViewMode!=="top")this.currentViewMode="isometric",this.updateActiveViewPill("isometric")}),this.container.addEventListener("pointermove",(J)=>{let $=this.container.getBoundingClientRect();this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera);let Z=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar,...this.clockTowerGroup?[this.clockTowerGroup]:[],...this.interactiveTrees,...this.mooredBoat?[this.mooredBoat]:[],...this.interactiveSheep,...this.viaductLanterns,...this.windmillGroup?[this.windmillGroup]:[],...this.watermillGroup?[this.watermillGroup]:[],...this.cottageGroup?[this.cottageGroup]:[],...this.semaphoreGroup?[this.semaphoreGroup]:[],...this.campsiteGroup?[this.campsiteGroup]:[],...this.waterTowerGroup?[this.waterTowerGroup]:[],...this.hotAirBalloonGroup?[this.hotAirBalloonGroup]:[],...this.townFountainGroup?[this.townFountainGroup]:[],...this.farmBarnGroup?[this.farmBarnGroup]:[]];if(this.raycaster.intersectObjects(Z,!0).length>0)this.container.style.cursor="pointer";else{if(this.waterMesh){let K=this.raycaster.intersectObject(this.waterMesh,!0);if(K.length>0){this.container.style.cursor="cell";let W=performance.now();if(W-this.lastHoverRippleTime>160){this.lastHoverRippleTime=W;let Y=K[0].point;this.triggerSplash(Y.x,0.034,Y.z)}return}}this.container.style.cursor="grab"}}),window.addEventListener("keydown",(J)=>{if(J.target instanceof HTMLInputElement||J.target instanceof HTMLTextAreaElement)return;if(J.code==="Space")J.preventDefault(),this.triggerWhistleHop();else if(J.code==="KeyR"){let $=!this.isRaining;this.setWeather($?"rain":"fair"),document.querySelectorAll("[data-weather]").forEach((Z)=>{Z.classList.toggle("active",Z.getAttribute("data-weather")===($?"rain":"fair"))})}else if(J.code==="KeyT")if(document.documentElement.getAttribute("data-theme")!=="dark")document.documentElement.setAttribute("data-theme","dark"),this.audio.playChime(523.25,0.08),this.setNightMode(!0);else document.documentElement.removeAttribute("data-theme"),this.audio.playMorningBirdSong(),this.setNightMode(!1);else if(J.code==="Digit1")this.setViewMode("isometric"),this.updateActiveViewPill("isometric");else if(J.code==="Digit2")this.setViewMode("top"),this.updateActiveViewPill("top");else if(J.code==="Digit3")this.setViewMode("engine"),this.updateActiveViewPill("engine");else if(J.code==="Digit4")this.setViewMode("director"),this.updateActiveViewPill("director");else if(J.code==="Digit5")this.setViewMode("trackside"),this.updateActiveViewPill("trackside");else if(J.code==="ArrowUp")this.setSpeed(Math.min(3.6,this.speedMultiplier+0.5));else if(J.code==="ArrowDown")this.setSpeed(Math.max(0.5,this.speedMultiplier-0.5))})}updateActiveViewPill(J){document.querySelectorAll("[data-view]").forEach(($)=>{let Z=$.getAttribute("data-view"),Q=Z===J||J==="engine"&&Z==="cinematic"||J==="cinematic"&&Z==="engine";$.classList.toggle("active",Q)})}triggerBoatRock(){if(!this.mooredBoat)return;this.audio.playBoatSlosh(),w0.killTweensOf(this.mooredBoat.rotation),w0.to(this.mooredBoat.rotation,{z:0.18,duration:0.22,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{if(this.mooredBoat)w0.to(this.mooredBoat.rotation,{z:0,duration:0.3})}});let J=this.mooredBoat.position;this.triggerSplash(J.x,0.034,J.z)}triggerSheepHop(J){this.audio.playSheepBleat(),w0.to(J.position,{y:0.14,duration:0.18,yoyo:!0,repeat:1,ease:"power2.out",onComplete:()=>{J.position.y=0.04}}),w0.to(J.rotation,{y:"+=0.6",duration:0.18,yoyo:!0,repeat:1,ease:"sine.inOut"})}triggerCampfirePop(){if(this.audio.playCampfirePop(),this.campfireLight){let J=this.campfireLight.intensity;w0.to(this.campfireLight,{intensity:3.6,duration:0.12,yoyo:!0,repeat:3,ease:"power1.inOut",onComplete:()=>{if(this.campfireLight)this.campfireLight.intensity=J}})}if(this.campfireFlame)w0.to(this.campfireFlame.scale,{x:1.5,y:1.8,z:1.5,duration:0.2,yoyo:!0,repeat:1,ease:"power2.out"})}triggerWaterTowerSpray(){if(this.isWaterTowerSpraying||!this.waterTowerSpout)return;this.isWaterTowerSpraying=!0,this.audio.playWaterTowerSpray(),w0.to(this.waterTowerSpout.rotation,{x:0.82,duration:0.35,ease:"back.out(1.4)",onComplete:()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!0;setTimeout(()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!1;if(this.waterTowerSpout)w0.to(this.waterTowerSpout.rotation,{x:0.25,duration:0.45,ease:"bounce.out",onComplete:()=>{this.isWaterTowerSpraying=!1}})},500)}})}triggerBalloonBurner(){if(this.audio.playBalloonBurner(),this.balloonBurnerLight)w0.to(this.balloonBurnerLight,{intensity:3.2,duration:0.2,yoyo:!0,repeat:1});if(this.balloonBurnerFlame)w0.to(this.balloonBurnerFlame.scale,{x:2.2,y:2.5,z:2.2,duration:0.2,yoyo:!0,repeat:1});if(this.hotAirBalloonGroup)w0.to(this.hotAirBalloonGroup.position,{y:"+=0.28",duration:0.45,yoyo:!0,repeat:1,ease:"power1.out"})}triggerFountainSurge(){if(!this.townFountainJet)return;this.audio.playChime(659.25,0.08),this.audio.playWaterDrop(),w0.killTweensOf(this.townFountainJet.scale),w0.to(this.townFountainJet.scale,{x:1.8,y:2.2,z:1.8,duration:0.35,yoyo:!0,repeat:1,ease:"power2.out"})}triggerBarnBoop(){if(!this.farmBarnGroup)return;this.audio.playChime(523.25,0.08),w0.killTweensOf(this.farmBarnGroup.scale),w0.to(this.farmBarnGroup.scale,{x:1.08,y:1.12,z:1.08,duration:0.25,yoyo:!0,repeat:1,ease:"back.out(2)"})}triggerLanternSpark(){this.audio.playLanternSpark(),this.viaductLanternLights.forEach((J)=>{let $=J.intensity;w0.to(J,{intensity:3.5,duration:0.1,yoyo:!0,repeat:1,onComplete:()=>{J.intensity=$}})})}triggerWhistleHop(){this.audio.playWhistle(),[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar].forEach(($,Z)=>{w0.to($.position,{y:"+=0.16",duration:0.16,delay:Z*0.04,yoyo:!0,repeat:1,ease:"power2.out"}),w0.to($.scale,{y:1.18,x:0.92,z:0.92,duration:0.16,delay:Z*0.04,yoyo:!0,repeat:1,ease:"power2.out"})});for(let $=0;$<5;$++)setTimeout(()=>this.spawnSteamPuff(1.4),$*50)}triggerClockBell(){if(this.audio.playBoardingBell(),setTimeout(()=>this.audio.playStationClock(),200),this.clockTowerGroup)w0.to(this.clockTowerGroup.scale,{y:1.15,x:0.92,z:0.92,duration:0.15,yoyo:!0,repeat:1,ease:"power2.out"});if(this.clockHand)w0.to(this.clockHand.rotation,{z:"-="+Math.PI*4,duration:0.8,ease:"power2.out"})}triggerTelegraphPing(J){this.audio.playTelegraphPing(),w0.to(J.rotation,{z:0.12,duration:0.1,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{w0.to(J.rotation,{z:0,duration:0.15})}})}triggerTreeWobble(J){this.audio.playRustle(),w0.to(J.rotation,{z:0.16,duration:0.12,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{w0.to(J.rotation,{z:0,duration:0.2})}})}spawnSteamPuff(J=1){let $=this.steamParticles.find((W)=>W.life<=0);if(!$)return;let Z=new T(0.13,0.26,0);this.locoCar.localToWorld(Z),this.rootGroup.worldToLocal(Z),$.mesh.position.copy(Z),$.mesh.scale.setScalar(0.7*J),$.mesh.visible=!0,$.life=1;let Q=this.trackCurve.getTangentAt(this.progress).normalize();$.vx=-Q.x*0.012*this.speedMultiplier+(Math.random()-0.5)*0.004,$.vy=0.014+Math.random()*0.007,$.vz=-Q.z*0.012*this.speedMultiplier+(Math.random()-0.5)*0.004;let K=this.isTrainInTunnel();this.audio.playSteamChuff(K)}isTrainInTunnel(){let J=(this.progress+1)%1;return J<0.045||J>0.955}setSpeed(J){if(this.speedMultiplier=J,this.audio.playSpeedWhoosh(J),J>=3)this.triggerWhistleHop();if(this.currentViewMode==="engine"||this.currentViewMode==="cinematic"){let $=J>=3?64:J>=2?54:48;w0.to(this.camera,{fov:$,duration:0.45,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()})}}setViewMode(J){if(this.currentViewMode=J,this.controls.enabled=J==="isometric"||J==="top",this.controls.autoRotate=!1,J==="engine"||J==="cinematic"){this.camera.near=0.02,this.camera.updateProjectionMatrix();let $=this.speedMultiplier>=3?64:this.speedMultiplier>=2?54:48;w0.to(this.camera,{fov:$,duration:0.8,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()});let Z=new T(-0.88,0.46,0.22),Q=this.locoCar.localToWorld(Z.clone()),K=new T(0.68,0.16,0),W=this.locoCar.localToWorld(K.clone());if(w0.killTweensOf(this.camera.position),w0.killTweensOf(this.controls.target),this.camera.position.copy(Q),this.camera.lookAt(W),this.controls.target.copy(W),this.isNightMode){if(this.headlampBeam)this.headlampBeam.visible=!0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0}if(this.headlampTrackPool)this.headlampTrackPool.visible=!0;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.4;this.audio.playWhistle()}else{if(this.camera.near=0.1,this.camera.updateProjectionMatrix(),this.engineBankRoll=0,this.camera.up.set(0,1,0),this.camera.fov!==38)w0.to(this.camera,{fov:38,duration:0.8,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()});if(this.isNightMode){if(this.headlampBeam)this.headlampBeam.visible=!0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0}else{if(this.headlampBeam)this.headlampBeam.visible=!1;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}}if(J==="top")this.controls.enabled=!1,w0.to(this.controls.target,{x:0,y:0,z:0,duration:0.85,ease:"power2.inOut"}),w0.to(this.camera.position,{x:0.01,y:7.2,z:0.01,duration:0.85,ease:"power2.inOut",onComplete:()=>{this.controls.enabled=!0,this.controls.update()}});else if(J==="isometric")this.controls.enabled=!1,w0.to(this.controls.target,{x:0,y:0.4,z:-0.75,duration:0.85,ease:"power2.inOut"}),w0.to(this.camera.position,{x:5.8,y:5.4,z:6,duration:0.85,ease:"power2.inOut",onComplete:()=>{this.controls.enabled=!0,this.controls.update()}});else if(J==="director")this.directorShotIndex=0,this.directorTimer=0,this.directorNeedsCut=!0}setNightMode(J,$=!1){if(this.isNightMode=J,$){if(J){if(this.ambientLight)this.ambientLight.color.set(1579035),this.ambientLight.intensity=0.65;if(this.hemiLight)this.hemiLight.color.set(2565930),this.hemiLight.groundColor.set(592396),this.hemiLight.intensity=0.35;if(this.sunLight)this.sunLight.position.set(6.5,0.25,1.8),this.sunLight.color.set(16317180),this.sunLight.intensity=0.15;if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),this.sunMesh.scale.setScalar(0.001),this.sunCorona)this.sunCorona.material.opacity=0}if(this.moonLight)this.moonLight.intensity=1.45;if(this.moonMesh){if(this.moonMesh.position.set(-2.4,2.8,-2.4),this.moonMesh.scale.set(1,1,1),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0.85}if(this.starsPoints)this.starsPoints.material.opacity=0.85;if(this.headlampLight)this.headlampLight.intensity=1.8;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.2;if(this.headlampBeam)this.headlampBeam.visible=!0,this.headlampBeam.material.opacity=0.32;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,this.headlampCoreBeam.material.opacity=0.38;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,this.headlampTrackPool.material.opacity=0.45;if(this.coachWindowMat)this.coachWindowMat.emissive.set(16498468),this.coachWindowMat.emissiveIntensity=1.8;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=1.2;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=1.2;if(this.tailLight)this.tailLight.intensity=1.8;if(this.lanternLight)this.lanternLight.intensity=2.2;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Q)=>Q.intensity=1.4);if(this.tunnelLight)this.tunnelLight.intensity=0.9;if(this.windmillLight)this.windmillLight.intensity=0.85;if(this.watermillLight)this.watermillLight.intensity=0.85;if(this.cottageLight)this.cottageLight.intensity=1.1;this.fireflies.forEach((Q)=>{Q.mesh.visible=!0,Q.mesh.material.opacity=0.85}),this.audio.setNightAmbience(!0)}else{if(this.ambientLight)this.ambientLight.color.set(16777215),this.ambientLight.intensity=2.1;if(this.hemiLight)this.hemiLight.color.set(16776171),this.hemiLight.groundColor.set(14870768),this.hemiLight.intensity=1.2;if(this.sunLight)this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.color.set(16776171),this.sunLight.intensity=2.6;if(this.sunMesh){if(this.sunMesh.position.set(1.3,2.1,-1.8),this.sunMesh.scale.set(1,1,1),this.sunCorona)this.sunCorona.material.opacity=0.22}if(this.moonLight)this.moonLight.intensity=0;if(this.moonMesh){if(this.moonMesh.position.set(-2.4,-0.7,-2.4),this.moonMesh.scale.setScalar(0.001),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0}if(this.starsPoints)this.starsPoints.material.opacity=0;if(this.headlampLight)this.headlampLight.intensity=0.6;if(this.headlampSpotLight)this.headlampSpotLight.intensity=0;if(this.headlampBeam)this.headlampBeam.visible=!1,this.headlampBeam.material.opacity=0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1,this.headlampCoreBeam.material.opacity=0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1,this.headlampTrackPool.material.opacity=0;if(this.coachWindowMat)this.coachWindowMat.emissive.set(0),this.coachWindowMat.emissiveIntensity=0;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=0;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=0;if(this.tailLight)this.tailLight.intensity=0.8;if(this.lanternLight)this.lanternLight.intensity=0.8;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Q)=>Q.intensity=0);if(this.tunnelLight)this.tunnelLight.intensity=0.2;if(this.windmillLight)this.windmillLight.intensity=0;if(this.watermillLight)this.watermillLight.intensity=0;if(this.cottageLight)this.cottageLight.intensity=0;this.fireflies.forEach((Q)=>{Q.mesh.visible=!1,Q.mesh.material.opacity=0}),this.audio.setNightAmbience(!1)}return}let Z=1.6;if(J){let Q=w0.timeline();if(this.sunLight){Q.to(this.sunLight.position,{x:6.5,y:0.25,z:1.8,duration:Z,ease:"power2.inOut"},0);let K={r:1,g:0.98,b:0.92};Q.to(K,{r:0.92,g:0.35,b:0.05,duration:Z*0.5,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},0),Q.to(K,{r:0.97,g:0.98,b:0.98,duration:Z*0.5,ease:"power1.in",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},Z*0.5),Q.to(this.sunLight,{intensity:0.15,duration:Z,ease:"power2.inOut"},0)}if(this.sunMesh){if(Q.to(this.sunMesh.position,{x:4.5,y:-0.8,z:2,duration:Z,ease:"power2.in"},0),Q.to(this.sunMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Z*0.8},Z*0.2),this.sunCorona)Q.to(this.sunCorona.material,{opacity:0,duration:Z*0.7},Z*0.2)}if(this.ambientLight){let K={r:1,g:1,b:1};Q.to(K,{r:0.98,g:0.57,b:0.24,duration:Z*0.45,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},0),Q.to(K,{r:0.1,g:0.1,b:0.11,duration:Z*0.55,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Z*0.45),Q.to(this.ambientLight,{intensity:0.65,duration:Z},0)}if(this.hemiLight)Q.to(this.hemiLight,{intensity:0.35,duration:Z},0);if(this.moonMesh){if(this.moonMesh.position.set(-2.4,-0.7,-2.4),Q.to(this.moonMesh.position,{y:2.8,duration:Z,ease:"power2.out"},Z*0.2),Q.to(this.moonMesh.scale,{x:1,y:1,z:1,duration:Z,ease:"back.out(1.2)"},Z*0.2),this.moonMesh.children[0])Q.to(this.moonMesh.children[0].material,{opacity:0.85,duration:Z*0.8},Z*0.3)}if(this.moonLight)Q.to(this.moonLight,{intensity:1.45,duration:Z},Z*0.3);if(this.starsPoints)Q.to(this.starsPoints.material,{opacity:0.85,duration:Z*0.8},Z*0.3);if(this.headlampLight)Q.to(this.headlampLight,{intensity:1.8,duration:Z*0.7},Z*0.3);if(this.headlampSpotLight)Q.to(this.headlampSpotLight,{intensity:2.2,duration:Z*0.7},Z*0.3);if(this.headlampBeam)this.headlampBeam.visible=!0,Q.to(this.headlampBeam.material,{opacity:0.32,duration:Z*0.7},Z*0.3);if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,Q.to(this.headlampCoreBeam.material,{opacity:0.38,duration:Z*0.7},Z*0.3);if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,Q.to(this.headlampTrackPool.material,{opacity:0.45,duration:Z*0.7},Z*0.3);if(this.coachWindowMat)Q.to(this.coachWindowMat.emissive,{r:0.98,g:0.75,b:0.14,duration:Z*0.7},Z*0.3),Q.to(this.coachWindowMat,{emissiveIntensity:1.8,duration:Z*0.7},Z*0.3);if(this.coachInteriorLight1)Q.to(this.coachInteriorLight1,{intensity:1.2,duration:Z*0.7},Z*0.3);if(this.coachInteriorLight2)Q.to(this.coachInteriorLight2,{intensity:1.2,duration:Z*0.7},Z*0.3);if(this.tailLight)Q.to(this.tailLight,{intensity:1.8,duration:Z*0.7},Z*0.3);if(this.lanternLight)Q.to(this.lanternLight,{intensity:2.2,duration:Z*0.7},Z*0.3);if(this.viaductLanternLights.forEach((K)=>{Q.to(K,{intensity:1.4,duration:Z*0.7},Z*0.3)}),this.tunnelLight)Q.to(this.tunnelLight,{intensity:0.9,duration:Z*0.7},Z*0.3);if(this.windmillLight)Q.to(this.windmillLight,{intensity:0.85,duration:Z*0.7},Z*0.3);if(this.watermillLight)Q.to(this.watermillLight,{intensity:0.85,duration:Z*0.7},Z*0.3);if(this.cottageLight)Q.to(this.cottageLight,{intensity:1.1,duration:Z*0.7},Z*0.3);this.fireflies.forEach((K)=>{K.mesh.visible=!0,Q.to(K.mesh.material,{opacity:0.85,duration:Z*0.7},Z*0.3)}),this.audio.setNightAmbience(!0)}else{let Q=w0.timeline();if(this.moonMesh){if(Q.to(this.moonMesh.position,{y:-0.7,duration:Z*0.7,ease:"power2.in"},0),Q.to(this.moonMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Z*0.7},0),this.moonMesh.children[0])Q.to(this.moonMesh.children[0].material,{opacity:0,duration:Z*0.5},0)}if(this.moonLight)Q.to(this.moonLight,{intensity:0,duration:Z*0.6},0);if(this.starsPoints)Q.to(this.starsPoints.material,{opacity:0,duration:Z*0.6},0);if(this.headlampLight)Q.to(this.headlampLight,{intensity:0.6,duration:Z*0.6},0);if(this.headlampSpotLight)Q.to(this.headlampSpotLight,{intensity:0,duration:Z*0.6},0);if(this.headlampBeam)Q.to(this.headlampBeam.material,{opacity:0,duration:Z*0.5,onComplete:()=>{if(this.headlampBeam)this.headlampBeam.visible=!1}},0);if(this.headlampCoreBeam)Q.to(this.headlampCoreBeam.material,{opacity:0,duration:Z*0.5,onComplete:()=>{if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1}},0);if(this.headlampTrackPool)Q.to(this.headlampTrackPool.material,{opacity:0,duration:Z*0.5,onComplete:()=>{if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}},0);if(this.coachWindowMat)Q.to(this.coachWindowMat.emissive,{r:0,g:0,b:0,duration:Z*0.6},0),Q.to(this.coachWindowMat,{emissiveIntensity:0,duration:Z*0.6},0);if(this.coachInteriorLight1)Q.to(this.coachInteriorLight1,{intensity:0,duration:Z*0.6},0);if(this.coachInteriorLight2)Q.to(this.coachInteriorLight2,{intensity:0,duration:Z*0.6},0);if(this.tailLight)Q.to(this.tailLight,{intensity:0.8,duration:Z*0.6},0);if(this.lanternLight)Q.to(this.lanternLight,{intensity:0.8,duration:Z*0.6},0);if(this.viaductLanternLights.forEach((K)=>{Q.to(K,{intensity:0,duration:Z*0.5},0)}),this.tunnelLight)Q.to(this.tunnelLight,{intensity:0.2,duration:Z*0.5},0);if(this.windmillLight)Q.to(this.windmillLight,{intensity:0,duration:Z*0.5},0);if(this.watermillLight)Q.to(this.watermillLight,{intensity:0,duration:Z*0.5},0);if(this.cottageLight)Q.to(this.cottageLight,{intensity:0,duration:Z*0.5},0);if(this.fireflies.forEach((K)=>{Q.to(K.mesh.material,{opacity:0,duration:Z*0.5,onComplete:()=>{K.mesh.visible=!1}},0)}),this.audio.setNightAmbience(!1),this.sunLight){this.sunLight.position.set(6.5,0.25,1.8),Q.to(this.sunLight.position,{x:5.5,y:7.5,z:4.2,duration:Z,ease:"power2.out"},Z*0.15);let K={r:0.96,g:0.45,b:0.15};this.sunLight.color.setRGB(K.r,K.g,K.b),Q.to(K,{r:1,g:0.98,b:0.92,duration:Z*0.85,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},Z*0.15),Q.to(this.sunLight,{intensity:2.6,duration:Z},Z*0.1)}if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),Q.to(this.sunMesh.position,{x:1.3,y:2.1,z:-1.8,duration:Z,ease:"power2.out"},Z*0.15),Q.to(this.sunMesh.scale,{x:1,y:1,z:1,duration:Z,ease:"back.out(1.2)"},Z*0.2),this.sunCorona)Q.to(this.sunCorona.material,{opacity:0.22,duration:Z*0.8},Z*0.25)}if(this.ambientLight){let K={r:0.12,g:0.16,b:0.23};Q.to(K,{r:0.99,g:0.9,b:0.65,duration:Z*0.4,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Z*0.1),Q.to(K,{r:1,g:1,b:1,duration:Z*0.5,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Z*0.5),Q.to(this.ambientLight,{intensity:2.1,duration:Z},Z*0.1)}if(this.hemiLight)Q.to(this.hemiLight,{intensity:1.2,duration:Z},Z*0.1)}}animate=()=>{if(this.isDestroyed)return;this.progress=(this.progress+this.trainSpeed*this.speedMultiplier)%1;let J=[0,-0.022,-0.044,-0.066],$=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],Z=new T(0,1,0);$.forEach((V,G)=>{let N=(this.progress+J[G]+1)%1,E=this.trackCurve.getPointAt(N),O=this.trackCurve.getTangentAt(N).normalize(),D=new T().crossVectors(O,Z).normalize(),R=new T().crossVectors(D,O).normalize(),B=new q8().makeBasis(O,R,D);V.quaternion.setFromRotationMatrix(B),V.position.copy(E)});let Q=0.08*this.speedMultiplier;if(this.wheelAngle=(this.wheelAngle-Q)%(Math.PI*2),this.rotatingWheels.forEach((V)=>{V.rotation.z-=Q}),this.leftSideRod&&this.rightSideRod){let G=Math.cos(this.wheelAngle)*0.022,N=Math.sin(this.wheelAngle)*0.022;this.leftSideRod.position.set(G,0.045+N,0.104),this.rightSideRod.position.set(G,0.045+N,-0.104)}let K=this.locoCar.position.clone().project(this.camera),W=Math.max(-0.85,Math.min(0.85,K.x)),Y=this.camera.position.distanceTo(this.locoCar.position),X=this.currentViewMode==="engine"||this.currentViewMode==="cinematic",H=X?1.6:Math.max(0.35,Math.min(1.7,5.2/Math.max(1,Y))),q=X?0:W;if(this.railClickAccumulator+=this.trainSpeed*this.speedMultiplier,this.railClickAccumulator>=0.034){this.railClickAccumulator=0;let V=this.isTrainInTunnel();this.audio.playRailClickClack(this.speedMultiplier,V,H,q)}let U=X?16:28;if(this.steamTimer+=this.speedMultiplier,this.steamTimer>=U)this.steamTimer=0,this.spawnSteamPuff(1),this.audio.playSteamChuff(this.isTrainInTunnel(),H,q);if(this.steamParticles.forEach((V)=>{if(V.life>0)V.life-=0.024,V.mesh.position.x+=V.vx,V.mesh.position.y+=V.vy,V.mesh.position.z+=V.vz,V.mesh.scale.multiplyScalar(1.035),V.mesh.visible=!0,V.mesh.material.opacity=Math.max(0,V.life*0.75);else V.mesh.visible=!1,V.mesh.position.set(0,-100,0),V.mesh.material.opacity=0}),this.isRaining&&this.rainPositions&&this.rainGeo){for(let G=0;G<this.rainCount;G++)if(this.rainPositions[G*6+1]-=0.11,this.rainPositions[G*6+4]-=0.11,this.rainPositions[G*6+1]<0.02){let N=(Math.random()-0.5)*5.2,E=3.2+Math.random()*0.5,O=(Math.random()-0.5)*4.2;this.triggerSplash(this.rainPositions[G*6],0.025,this.rainPositions[G*6+2]),this.rainPositions[G*6]=N,this.rainPositions[G*6+1]=E,this.rainPositions[G*6+2]=O,this.rainPositions[G*6+3]=N-0.02,this.rainPositions[G*6+4]=E-0.18,this.rainPositions[G*6+5]=O-0.01}this.rainGeo.attributes.position.needsUpdate=!0}this.splashRipples.forEach((V)=>{if(V.life>0){V.life-=0.045;let G=1-V.life;V.mesh.scale.setScalar(0.2+G*V.maxRadius*8),V.mesh.material.opacity=Math.max(0,V.life*0.5)}else V.mesh.material.opacity=0});let F=Date.now()%800<400;if(this.crossingLamp1&&this.crossingLamp2&&this.crossingLight1&&this.crossingLight2){if(this.crossingLamp1.visible=F,this.crossingLight1.intensity=F?0.9:0,this.crossingLight2.visible=!F,this.crossingLight2.intensity=!F?0.9:0,this.lastBlinkCycle!==F){if(this.lastBlinkCycle=F,F){let V=this.locoCar.position;if(Math.hypot(V.x- -0.45,V.z-0.82)<0.95)this.audio.playCrossingBell()}}}if(this.clockHand)this.clockHand.rotation.z=-Date.now()*0.001;if(this.waterMesh)this.waterMesh.material.opacity=0.86+Math.sin(Date.now()*0.0018)*0.04;if(this.mooredBoat)this.mooredBoat.rotation.z=Math.sin(Date.now()*0.0015)*0.025,this.mooredBoat.position.y=0.038+Math.sin(Date.now()*0.0015)*0.0012;if(this.windmillSails){if(this.windmillSails.rotation.x-=this.windmillCurrentSpeed,this.windmillCurrentSpeed>this.windmillBaseSpeed)this.windmillCurrentSpeed=t$.lerp(this.windmillCurrentSpeed,this.windmillBaseSpeed,0.015)}if(this.waterwheel)this.waterwheel.rotation.x+=0.016*this.speedMultiplier;if(this.townFountainJet)this.townFountainJet.rotation.y+=0.02;if(this.fireflies.length>0){let V=Date.now()*0.001;this.fireflies.forEach((G)=>{if(G.mesh.position.x=G.baseX+Math.sin(V*G.speed+G.phase)*G.radius,G.mesh.position.y=G.baseY+Math.sin(V*G.speed*1.6+G.phase)*0.035,G.mesh.position.z=G.baseZ+Math.cos(V*G.speed*1.1+G.phase)*G.radius,this.isNightMode){G.mesh.visible=!0;let N=0.5+Math.sin(V*3.2+G.phase)*0.45;G.mesh.material.opacity=N}else G.mesh.visible=!1,G.mesh.material.opacity=0})}if(this.campfireParticles&&this.campfireParticlePos){for(let V=0;V<20;V++)if(this.campfireParticlePos[V*3+1]+=0.0025,this.campfireParticlePos[V*3+1]>0.32)this.campfireParticlePos[V*3+1]=0.06,this.campfireParticlePos[V*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[V*3+2]=(Math.random()-0.5)*0.12;this.campfireParticles.geometry.attributes.position.needsUpdate=!0}if(this.hotAirBalloonGroup){let V=Date.now()*0.001;this.hotAirBalloonGroup.position.y=2.7+Math.sin(V*1.2)*0.08,this.hotAirBalloonGroup.rotation.z=Math.sin(V*0.8)*0.04}if(this.butterflies.length>0){let V=Date.now()*0.003;this.butterflies.forEach((G)=>{let N=G.mesh.children[0],E=G.mesh.children[1];if(N&&E){let O=Math.sin(V*9+G.phase)*0.75;N.rotation.z=0.3+O,E.rotation.z=-0.3-O}G.mesh.position.x=G.basePos.x+Math.sin(V*G.speed+G.phase)*0.12,G.mesh.position.y=G.basePos.y+Math.abs(Math.cos(V*G.speed*1.5+G.phase))*0.08,G.mesh.position.z=G.basePos.z+Math.cos(V*G.speed+G.phase)*0.12,G.mesh.rotation.y=Math.sin(V*G.speed+G.phase)*0.8})}if(this.interactiveSheep.length>0){let V=Date.now()*0.002;this.interactiveSheep.forEach((G,N)=>{let E=G.children.find((O)=>O.isMesh&&O.position.y>0.06);if(E)E.rotation.x=Math.sin(V*1.2+N*1.5)*0.12})}if(this.currentViewMode==="director"){let V=performance.now(),G=this.lastAnimTime?(V-this.lastAnimTime)*0.001:0.016;if(this.directorTimer+=G,this.directorTimer>=this.directorShotDuration)this.directorTimer=0,this.directorShotIndex=(this.directorShotIndex+1)%4,this.directorNeedsCut=!0;let N=this.locoCar.position,E=this.trackCurve.getTangentAt(this.progress).normalize(),O,D;if(this.directorShotIndex===0)O=new T(1.15,0.4,1.15),D=N.clone().add(new T(0,0.08,0));else if(this.directorShotIndex===1){if(O=N.clone().sub(E.clone().multiplyScalar(0.72)).add(new T(0,0.38,0)),this.isTrainInTunnel())O.y=Math.max(0.48,O.y);D=N.clone().add(E.clone().multiplyScalar(0.75)).add(new T(0,0.12,0))}else if(this.directorShotIndex===2)O=new T(-0.45,0.28,1.55),D=N.clone().add(new T(0,0.08,0));else{let R=Date.now()*0.00028;O=new T(Math.cos(R)*3.4,2.95,Math.sin(R)*3.4),D=new T(0,0.25,0)}if(this.directorNeedsCut)this.camera.position.copy(O),this.camera.lookAt(D),this.controls.target.copy(D),this.directorNeedsCut=!1;else this.camera.position.lerp(O,0.08),this.camera.lookAt(D),this.controls.target.copy(D)}else if(this.currentViewMode==="cinematic"||this.currentViewMode==="engine"){let V=this.progress,G=(this.progress+0.024)%1,N=this.trackCurve.getTangentAt(V).normalize(),E=this.trackCurve.getTangentAt(G).normalize(),O=N.x*E.z-N.z*E.x,D=2*Math.min(this.speedMultiplier,2.5),R=Math.max(-0.09,Math.min(0.09,-O*D));this.engineBankRoll+=(R-this.engineBankRoll)*0.12;let B=Date.now()*0.028*this.speedMultiplier,z=Math.sin(B)*0.0016+Math.cos(B*0.5)*0.0008,C=Math.sin(B*0.8)*0.0015,L=this.isTrainInTunnel(),A=L?-0.5:-0.88,_=(L?0.28:0.46)+z,k=new T(A,_,L?0.08:0.22),b=this.locoCar.localToWorld(k);b.y=Math.max(b.y,0.18);let n=L?0.85:0.68,r=0.16+N.y*0.35,y=new T(n,r,0),h=this.locoCar.localToWorld(y);this.camera.position.lerp(b,0.18),this.camera.up.set(0,1,0),this.camera.lookAt(h);let m=this.engineBankRoll+C;if(Math.abs(m)>0.0005)this.camera.rotateZ(m);this.controls.target.copy(h)}else if(this.currentViewMode==="trackside"){let V=new T(0.55,0.32,1.65);this.camera.position.lerp(V,0.08);let G=this.locoCar.position.clone().add(new T(0,0.1,0));this.camera.lookAt(G),this.controls.target.copy(G)}else if(this.controls.update(),this.currentViewMode==="isometric"){let V=(this.mousePos.x||0)*0.015,G=-(this.mousePos.y||0)*0.015;this.rootGroup.rotation.z+=(V-this.rootGroup.rotation.z)*0.05,this.rootGroup.rotation.x+=(G-this.rootGroup.rotation.x)*0.05}this.lastAnimTime=performance.now(),this.rootGroup.position.y=Math.sin(Date.now()*0.0012)*0.025,this.renderer.render(this.scene,this.camera),this.animFrameId=requestAnimationFrame(this.animate)};destroy(){this.isDestroyed=!0,cancelAnimationFrame(this.animFrameId),this.controls.dispose(),this.renderer.dispose()}}function sW(){let J=new yZ;window.samtagonAudio=J;let $=null;try{$=new h5("three-viewport",J),window.samtagonStage=$}catch(Z){console.warn("Three.js stage init fallback:",Z)}PF($,J),console.log("Samtagon Studios online. Zen mode active.")}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",sW);else sW();function PF(J,$){let Z=localStorage.getItem("samtagon_theme"),Q=new URLSearchParams(window.location.search),K=Q.get("theme"),W=K?K==="dark":Z?Z==="dark":!0,Y=(B,z=!1)=>{if(B)document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("samtagon_theme","dark"),J?.setNightMode(!0,z);else document.documentElement.removeAttribute("data-theme"),localStorage.setItem("samtagon_theme","light"),J?.setNightMode(!1,z)};Y(W,!0),window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change",(B)=>{if(W=B.matches,Y(W,!1),W)$.playChime(523.25,0.08);else $.playMorningBirdSong()}),document.getElementById("theme-toggle-btn")?.addEventListener("click",()=>{if(W=!W,Y(W,!1),W)$.playChime(523.25,0.08);else $.playMorningBirdSong()});let H=document.getElementById("audio-toggle-btn"),q=H?.querySelector(".audio-on-icon"),U=H?.querySelector(".audio-off-icon"),F=(B)=>{if(q&&U)q.style.display=B?"block":"none",U.style.display=B?"none":"block"};H?.addEventListener("click",()=>{let B=$.toggleMute();F(B)}),window.addEventListener("keydown",(B)=>{if(B.code==="KeyM"){let z=$.toggleMute();F(z)}});let V=document.querySelectorAll("[data-view]");V.forEach((B)=>{B.addEventListener("click",()=>{V.forEach((C)=>C.classList.remove("active")),B.classList.add("active");let z=B.dataset.view;J?.setViewMode(z),$.playButtonPress()})});let G=document.querySelectorAll("[data-speed]");G.forEach((B)=>{B.addEventListener("click",()=>{G.forEach((C)=>C.classList.remove("active")),B.classList.add("active");let z=parseFloat(B.dataset.speed||"1");J?.setSpeed(z),$.playButtonPress()})});let N=document.querySelectorAll("[data-weather]");N.forEach((B)=>{B.addEventListener("click",()=>{N.forEach((C)=>C.classList.remove("active")),B.classList.add("active");let z=B.dataset.weather==="rain";J?.setWeather(z?"rain":"fair"),$.playButtonPress()})}),document.getElementById("whistle-btn")?.addEventListener("click",()=>{J?.triggerWhistleHop()}),document.getElementById("play-flagship-btn")?.addEventListener("click",()=>{$.playChime(660,0.1)}),document.querySelectorAll(".game-pill").forEach((B,z)=>{let C=[523.25,587.33,659.25,783.99,880,1046.5],L=C[z%C.length];B.addEventListener("mouseenter",()=>{$.playChime(L,0.04)}),B.addEventListener("click",()=>{$.playChime(L*1.5,0.08),J?.triggerWhistleHop()})}),document.querySelector(".zen-brand")?.addEventListener("click",()=>{$.playChime(880,0.12),J?.triggerWhistleHop()});let R=Q.get("view");if(R)V.forEach((B)=>B.classList.toggle("active",B.dataset.view===R)),J?.setViewMode(R);SF()}function SF(){document.querySelectorAll(".zen-btn").forEach((W)=>{let Y=W.querySelector(".btn-arrow-icon"),X=W.querySelector("svg:not(.btn-arrow-icon)");W.addEventListener("mouseenter",()=>{if(w0.to(W,{y:-3,scale:1.025,duration:0.16,ease:"power2.out",overwrite:"auto"}),Y)w0.to(Y,{x:3,y:-3,duration:0.16,ease:"power2.out",overwrite:"auto"});if(X)w0.to(X,{scale:1.15,duration:0.18,ease:"back.out(2)",overwrite:"auto"})}),W.addEventListener("mouseleave",()=>{if(w0.to(W,{y:0,scale:1,duration:0.2,ease:"power2.out",overwrite:"auto"}),Y)w0.to(Y,{x:0,y:0,duration:0.2,ease:"power2.out",overwrite:"auto"});if(X)w0.to(X,{scale:1,rotation:0,duration:0.2,ease:"power2.out",overwrite:"auto"})}),W.addEventListener("mousedown",()=>{w0.to(W,{y:1,scale:0.96,duration:0.08,ease:"power1.in",overwrite:"auto"})}),W.addEventListener("mouseup",()=>{w0.to(W,{y:-3,scale:1.025,duration:0.24,ease:"back.out(2.5)",overwrite:"auto"})})}),document.querySelectorAll(".stage-icon-btn, .stage-speed-btn, .zen-theme-toggle").forEach((W)=>{let Y=W.querySelector("svg");W.addEventListener("mouseenter",()=>{if(w0.to(W,{y:-2,duration:0.14,ease:"power2.out",overwrite:"auto"}),Y)w0.to(Y,{scale:1.15,duration:0.16,ease:"back.out(2)",overwrite:"auto"})}),W.addEventListener("mouseleave",()=>{if(w0.to(W,{y:0,scale:1,duration:0.2,ease:"power2.out",overwrite:"auto"}),Y)w0.to(Y,{scale:1,rotation:0,x:0,y:0,duration:0.2,ease:"power2.out",overwrite:"auto"})}),W.addEventListener("mousedown",()=>{w0.to(W,{scale:0.92,duration:0.08,ease:"power1.in",overwrite:"auto"})}),W.addEventListener("mouseup",()=>{w0.to(W,{scale:1,duration:0.2,ease:"back.out(3)",overwrite:"auto"})})});let Z=document.getElementById("whistle-btn");Z?.addEventListener("click",()=>{let W=Z.querySelector("svg");if(W)w0.fromTo(W,{rotation:-16,scale:1.25},{rotation:16,scale:1.1,duration:0.045,repeat:7,yoyo:!0,ease:"sine.inOut",onComplete:()=>{w0.to(W,{rotation:0,scale:1,duration:0.12})}})});let Q=document.querySelector('[data-view="engine"]');Q?.addEventListener("click",()=>{let W=Q.querySelector("svg");if(W)w0.fromTo(W,{x:-5,scale:1.2},{x:4,duration:0.09,repeat:3,yoyo:!0,ease:"power2.inOut",onComplete:()=>{w0.to(W,{x:0,scale:1,duration:0.12})}})});let K=document.getElementById("theme-toggle-btn");K?.addEventListener("click",()=>{let W=K.querySelector('svg:not([style*="none"])')||K.querySelector("svg");if(W)w0.fromTo(W,{rotation:-180,scale:0.6},{rotation:0,scale:1,duration:0.45,ease:"back.out(2)"})})}
