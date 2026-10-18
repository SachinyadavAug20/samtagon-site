class yQ{ctx=null;isMuted=!1;masterGain=null;constructor(){let J=()=>{this.initContext(),window.removeEventListener("pointerdown",J),window.removeEventListener("keydown",J),window.removeEventListener("click",J),window.removeEventListener("touchstart",J)};window.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("keydown",J,{passive:!0}),window.addEventListener("click",J,{passive:!0}),window.addEventListener("touchstart",J,{passive:!0})}initContext(){if(!this.ctx){let J=window.AudioContext||window.webkitAudioContext;this.ctx=new J,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.isMuted?0:0.48,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination)}if(this.ctx.state==="suspended")this.ctx.resume()}toggleMute(){if(this.initContext(),this.isMuted=!this.isMuted,this.masterGain&&this.ctx){let J=this.isMuted?0:0.48;this.masterGain.gain.setTargetAtTime(J,this.ctx.currentTime,0.05)}if(!this.isMuted)this.playChime(523.25,0.1),setTimeout(()=>this.playChime(659.25,0.15),100);return!this.isMuted}getStatus(){return!this.isMuted}playChime(J=880,$=0.12){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Q=this.ctx.createOscillator(),Z=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(J,this.ctx.currentTime),Q.frequency.exponentialRampToValueAtTime(J*1.5,this.ctx.currentTime+$),Z.gain.setValueAtTime(0.25,this.ctx.currentTime),Z.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+$),Q.connect(Z),Z.connect(this.masterGain),Q.start(),Q.stop(this.ctx.currentTime+$)}catch{}}playVVVFWhine(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain();J.type="triangle";let Q=this.ctx.currentTime;J.frequency.setValueAtTime(220,Q),J.frequency.exponentialRampToValueAtTime(880,Q+0.35),$.gain.setValueAtTime(0.2,Q),$.gain.exponentialRampToValueAtTime(0.01,Q+0.4),J.connect($),$.connect(this.masterGain),J.start(Q),J.stop(Q+0.4)}catch{}}playSignalClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Q=this.ctx.currentTime;J.type="square",J.frequency.setValueAtTime(320,Q),J.frequency.setValueAtTime(160,Q+0.03),$.gain.setValueAtTime(0.15,Q),$.gain.exponentialRampToValueAtTime(0.001,Q+0.06),J.connect($),$.connect(this.masterGain),J.start(Q),J.stop(Q+0.06)}catch{}}playButtonPress(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Q=this.ctx.currentTime;J.type="sine",J.frequency.setValueAtTime(440,Q),J.frequency.exponentialRampToValueAtTime(880,Q+0.05),$.gain.setValueAtTime(0.18,Q),$.gain.exponentialRampToValueAtTime(0.001,Q+0.05),J.connect($),$.connect(this.masterGain),J.start(Q),J.stop(Q+0.05)}catch{}}playBoardingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createOscillator(),Q=this.ctx.createGain(),Z=this.ctx.currentTime;J.type="sine",$.type="triangle",J.frequency.setValueAtTime(1046.5,Z),$.frequency.setValueAtTime(1318.51,Z),Q.gain.setValueAtTime(0.2,Z),Q.gain.exponentialRampToValueAtTime(0.001,Z+0.2),J.connect(Q),$.connect(Q),Q.connect(this.masterGain),J.start(Z),$.start(Z),J.stop(Z+0.2),$.stop(Z+0.2)}catch{}}playWhistle(){if(this.initContext(),this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=[587.33,783.99,987.77,1174.66];[{time:J,dur:0.16},{time:J+0.2,dur:0.42}].forEach(({time:Z,dur:K})=>{$.forEach((W,Y)=>{if(!this.ctx||!this.masterGain)return;let X=this.ctx.createOscillator(),H=this.ctx.createGain();X.type=Y===0?"sine":Y===1?"triangle":"sawtooth",X.frequency.setValueAtTime(W*0.985,Z),X.frequency.linearRampToValueAtTime(W,Z+0.04),H.gain.setValueAtTime(0.001,Z),H.gain.linearRampToValueAtTime(0.32/$.length,Z+0.035),H.gain.exponentialRampToValueAtTime(0.001,Z+K),X.connect(H),H.connect(this.masterGain),X.start(Z),X.stop(Z+K+0.06)})})}catch{}}rainSource=null;rainGain=null;setRain(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{if(J){if(this.rainSource)return;let $=this.ctx.sampleRate*2,Q=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Z=Q.getChannelData(0),K=0,W=0,Y=0;for(let U=0;U<$;U++){let V=Math.random()*2-1;K=0.99886*K+V*0.0555179,W=0.99332*W+V*0.0750759,Y=0.969*Y+V*0.153852,Z[U]=(K+W+Y+V*0.5362)*0.04}let X=this.ctx.createBufferSource();X.buffer=Q,X.loop=!0;let H=this.ctx.createBiquadFilter();H.type="lowpass",H.frequency.setValueAtTime(950,this.ctx.currentTime);let q=this.ctx.createGain();q.gain.setValueAtTime(0.001,this.ctx.currentTime),q.gain.linearRampToValueAtTime(0.06,this.ctx.currentTime+1.2),X.connect(H),H.connect(q),q.connect(this.masterGain),X.start(),this.rainSource=X,this.rainGain=q}else if(this.rainSource&&this.rainGain){let $=this.ctx.currentTime;this.rainGain.gain.linearRampToValueAtTime(0.001,$+0.8),setTimeout(()=>{try{this.rainSource?.stop(),this.rainSource?.disconnect(),this.rainSource=null,this.rainGain=null}catch{}},850)}}catch{}}playRustle(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.12),Q.gain.setValueAtTime(0.09,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.12),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.12)}catch{}}playWaterDrop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1200+Math.random()*400,J),$.frequency.exponentialRampToValueAtTime(1800+Math.random()*400,J+0.08),Q.gain.setValueAtTime(0.08,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}playBoatSlosh(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(420,J),$.frequency.exponentialRampToValueAtTime(180,J+0.18),Q.gain.setValueAtTime(0.12,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.18),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.18),setTimeout(()=>this.playWaterDrop(),60)}catch{}}playSheepHop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(659.25,J),$.frequency.linearRampToValueAtTime(880,J+0.08),Q.gain.setValueAtTime(0.15,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playLanternSpark(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1760,J),$.frequency.exponentialRampToValueAtTime(2200,J+0.22),Q.gain.setValueAtTime(0.18,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.22),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.22)}catch{}}playRailClickClack(J=1,$=!1,Q=1,Z=0){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let K=this.ctx.currentTime,Y=Math.max(0.02,Math.min(0.65,($?0.22:0.14)*Q)),X=$?700:1600;this.synthesizeAxleClick(K,1080+Math.random()*80,Y,X,Z),this.synthesizeAxleClick(K+0.045,920+Math.random()*80,Y*0.8,X,Z)}catch{}}synthesizeAxleClick(J,$,Q,Z,K=0){if(!this.ctx||!this.masterGain)return;let W=this.ctx.createOscillator(),Y=this.ctx.createGain(),X=this.ctx.createBiquadFilter();if(X.type="bandpass",X.frequency.setValueAtTime(Z,J),X.Q.setValueAtTime(3.2,J),W.type="triangle",W.frequency.setValueAtTime($,J),W.frequency.exponentialRampToValueAtTime(140,J+0.038),Y.gain.setValueAtTime(Q,J),Y.gain.exponentialRampToValueAtTime(0.001,J+0.038),W.connect(X),X.connect(Y),this.ctx.createStereoPanner){let H=this.ctx.createStereoPanner();H.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,K)),J),Y.connect(H),H.connect(this.masterGain)}else Y.connect(this.masterGain);W.start(J),W.stop(J+0.04)}playSteamChuff(J=!1,$=1,Q=0){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Z=this.ctx.currentTime,K=0.085,W=Math.floor(this.ctx.sampleRate*0.085),Y=this.ctx.createBuffer(1,W,this.ctx.sampleRate),X=Y.getChannelData(0);for(let F=0;F<W;F++)X[F]=(Math.random()*2-1)*Math.exp(-F/(W*0.32));let H=this.ctx.createBufferSource();H.buffer=Y;let q=this.ctx.createBiquadFilter();q.type="lowpass",q.frequency.setValueAtTime(J?380:720,Z);let U=J?0.2:0.12,V=this.ctx.createGain();if(V.gain.setValueAtTime(Math.max(0.02,Math.min(0.55,U*$)),Z),V.gain.exponentialRampToValueAtTime(0.001,Z+0.085),H.connect(q),q.connect(V),this.ctx.createStereoPanner){let F=this.ctx.createStereoPanner();F.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,Q)),Z),V.connect(F),F.connect(this.masterGain)}else V.connect(this.masterGain);H.start(Z)}catch{}}playCrossingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1480,J),$.frequency.exponentialRampToValueAtTime(1470,J+0.16),Q.gain.setValueAtTime(0.08,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.16),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.16)}catch{}}playStationClock(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[440,554.37,659.25].forEach(($,Q)=>{if(!this.ctx||!this.masterGain)return;let Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="sine",Z.frequency.setValueAtTime($,J+Q*0.12),K.gain.setValueAtTime(0.12,J+Q*0.12),K.gain.exponentialRampToValueAtTime(0.001,J+Q*0.12+0.55),Z.connect(K),K.connect(this.masterGain),Z.start(J+Q*0.12),Z.stop(J+Q*0.12+0.6)})}catch{}}playTelegraphPing(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(880,J),$.frequency.exponentialRampToValueAtTime(440,J+0.14),Q.gain.setValueAtTime(0.07,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playSpeedWhoosh(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.currentTime,Q=this.ctx.createOscillator(),Z=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(220,$),Q.frequency.exponentialRampToValueAtTime(220*J,$+0.28),Z.gain.setValueAtTime(0.11,$),Z.gain.exponentialRampToValueAtTime(0.001,$+0.28),Q.connect(Z),Z.connect(this.masterGain),Q.start($),Q.stop($+0.3)}catch{}}playWindmillSpin(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[180,240,360].forEach(($,Q)=>{if(!this.ctx||!this.masterGain)return;let Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="triangle",Z.frequency.setValueAtTime($,J+Q*0.05),Z.frequency.exponentialRampToValueAtTime($*1.25,J+Q*0.05+0.22),K.gain.setValueAtTime(0.08,J+Q*0.05),K.gain.exponentialRampToValueAtTime(0.001,J+Q*0.05+0.25),Z.connect(K),K.connect(this.masterGain),Z.start(J+Q*0.05),Z.stop(J+Q*0.05+0.28)})}catch{}}playWaterwheel(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.15),Q.gain.setValueAtTime(0.09,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.15),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.16),setTimeout(()=>this.playWaterDrop(),50)}catch{}}playSwitchClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(260,J),$.frequency.setValueAtTime(120,J+0.04),Q.gain.setValueAtTime(0.12,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}cricketTimer=null;setNightAmbience(J){if(this.cricketTimer)clearInterval(this.cricketTimer),this.cricketTimer=null;if(!J||this.isMuted||!this.ctx)return;let $=()=>{if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Q=this.ctx.currentTime,Z=2+Math.floor(Math.random()*2);for(let K=0;K<Z;K++){let W=Q+K*0.06,Y=this.ctx.createOscillator(),X=this.ctx.createGain();Y.type="sine",Y.frequency.setValueAtTime(4600+Math.random()*200,W),X.gain.setValueAtTime(0.018,W),X.gain.exponentialRampToValueAtTime(0.0001,W+0.035),Y.connect(X),X.connect(this.masterGain),Y.start(W),Y.stop(W+0.04)}}catch{}};$(),this.cricketTimer=window.setInterval($,3200)}playCampfirePop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;for(let $=0;$<3;$++){let Q=J+$*0.05+Math.random()*0.03,Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="triangle",Z.frequency.setValueAtTime(1400+Math.random()*800,Q),Z.frequency.exponentialRampToValueAtTime(120,Q+0.03),K.gain.setValueAtTime(0.06,Q),K.gain.exponentialRampToValueAtTime(0.001,Q+0.035),Z.connect(K),K.connect(this.masterGain),Z.start(Q),Z.stop(Q+0.04)}}catch{}}playWaterTowerSpray(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(180,J),$.frequency.exponentialRampToValueAtTime(60,J+0.12),Q.gain.setValueAtTime(0.14,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.15);let Z=this.ctx.sampleRate*0.35,K=this.ctx.createBuffer(1,Z,this.ctx.sampleRate),W=K.getChannelData(0);for(let q=0;q<Z;q++)W[q]=Math.random()*2-1;let Y=this.ctx.createBufferSource();Y.buffer=K;let X=this.ctx.createBiquadFilter();X.type="bandpass",X.frequency.setValueAtTime(900,J+0.05),X.Q.value=1.2;let H=this.ctx.createGain();H.gain.setValueAtTime(0.001,J+0.05),H.gain.linearRampToValueAtTime(0.12,J+0.12),H.gain.exponentialRampToValueAtTime(0.001,J+0.4),Y.connect(X),X.connect(H),H.connect(this.masterGain),Y.start(J+0.05),Y.stop(J+0.42)}catch{}}playSheepBleat(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain(),Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.frequency.value=11,K.gain.value=24,Z.connect($.frequency),$.type="sawtooth",$.frequency.setValueAtTime(290,J),$.frequency.exponentialRampToValueAtTime(240,J+0.28);let W=this.ctx.createBiquadFilter();W.type="lowpass",W.frequency.value=850,Q.gain.setValueAtTime(0.001,J),Q.gain.linearRampToValueAtTime(0.09,J+0.04),Q.gain.exponentialRampToValueAtTime(0.001,J+0.32),$.connect(W),W.connect(Q),Q.connect(this.masterGain),Z.start(J),$.start(J),Z.stop(J+0.33),$.stop(J+0.33)}catch{}}playBalloonBurner(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.sampleRate*0.45,Q=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Z=Q.getChannelData(0);for(let X=0;X<$;X++)Z[X]=Math.random()*2-1;let K=this.ctx.createBufferSource();K.buffer=Q;let W=this.ctx.createBiquadFilter();W.type="lowpass",W.frequency.setValueAtTime(320,J),W.frequency.linearRampToValueAtTime(650,J+0.2),W.frequency.exponentialRampToValueAtTime(220,J+0.45);let Y=this.ctx.createGain();Y.gain.setValueAtTime(0.01,J),Y.gain.linearRampToValueAtTime(0.12,J+0.15),Y.gain.exponentialRampToValueAtTime(0.001,J+0.45),K.connect(W),W.connect(Y),Y.connect(this.masterGain),K.start(J),K.stop(J+0.46)}catch{}}playCathedralChime(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[{f:440,a:0.14,d:1.4},{f:523.25,a:0.1,d:1.1},{f:659.25,a:0.08,d:0.8},{f:880,a:0.05,d:0.5}].forEach(({f:Q,a:Z,d:K})=>{if(!this.ctx||!this.masterGain)return;let W=this.ctx.createOscillator(),Y=this.ctx.createGain();W.type="sine",W.frequency.setValueAtTime(Q,J),Y.gain.setValueAtTime(Z,J),Y.gain.exponentialRampToValueAtTime(0.0005,J+K),W.connect(Y),Y.connect(this.masterGain),W.start(J),W.stop(J+K)})}catch{}}playMorningBirdSong(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[2800,3400,4200].forEach((Q,Z)=>{if(!this.ctx||!this.masterGain)return;let K=J+Z*0.11,W=this.ctx.createOscillator(),Y=this.ctx.createGain();W.type="sine",W.frequency.setValueAtTime(Q,K),W.frequency.exponentialRampToValueAtTime(Q*1.3,K+0.08),Y.gain.setValueAtTime(0.04,K),Y.gain.exponentialRampToValueAtTime(0.001,K+0.09),W.connect(Y),Y.connect(this.masterGain),W.start(K),W.stop(K+0.1)})}catch{}}playQuizSelection(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(587.33,J),$.frequency.exponentialRampToValueAtTime(880,J+0.06),Q.gain.setValueAtTime(0.14,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.09)}catch{}}playArchetypeFanfare(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((Q,Z)=>{if(!this.ctx||!this.masterGain)return;let K=J+Z*0.09,W=this.ctx.createOscillator(),Y=this.ctx.createGain();W.type=Z===3?"sine":"triangle",W.frequency.setValueAtTime(Q,K);let X=Z===3?0.65:0.32;Y.gain.setValueAtTime(0.001,K),Y.gain.linearRampToValueAtTime(0.18,K+0.03),Y.gain.exponentialRampToValueAtTime(0.0005,K+X),W.connect(Y),Y.connect(this.masterGain),W.start(K),W.stop(K+X+0.05)})}catch{}}}var I9={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},L9={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3};var l6=2;var c6=1,S8=2;var C9=2;var n6=4;var l7=1000;class u8{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Q=this._listeners;if(Q[J]===void 0)Q[J]=[];if(Q[J].indexOf($)===-1)Q[J].push($)}hasEventListener(J,$){if(this._listeners===void 0)return!1;let Q=this._listeners;return Q[J]!==void 0&&Q[J].indexOf($)!==-1}removeEventListener(J,$){if(this._listeners===void 0)return;let Z=this._listeners[J];if(Z!==void 0){let K=Z.indexOf($);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){if(this._listeners===void 0)return;let Q=this._listeners[J.type];if(Q!==void 0){J.target=this;let Z=Q.slice(0);for(let K=0,W=Z.length;K<W;K++)Z[K].call(this,J);J.target=null}}}var dJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],p5=1234567,x7=Math.PI/180,W7=180/Math.PI;function P8(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(dJ[J&255]+dJ[J>>8&255]+dJ[J>>16&255]+dJ[J>>24&255]+"-"+dJ[$&255]+dJ[$>>8&255]+"-"+dJ[$>>16&15|64]+dJ[$>>24&255]+"-"+dJ[Q&63|128]+dJ[Q>>8&255]+"-"+dJ[Q>>16&255]+dJ[Q>>24&255]+dJ[Z&255]+dJ[Z>>8&255]+dJ[Z>>16&255]+dJ[Z>>24&255]).toLowerCase()}function hJ(J,$,Q){return Math.max($,Math.min(Q,J))}function NZ(J,$){return(J%$+$)%$}function eW(J,$,Q,Z,K){return Z+(J-$)*(K-Z)/(Q-$)}function JX(J,$,Q){if(J!==$)return(Q-J)/($-J);else return 0}function b7(J,$,Q){return(1-Q)*J+Q*$}function $X(J,$,Q,Z){return b7(J,$,1-Math.exp(-Q*Z))}function QX(J,$=1){return $-Math.abs(NZ(J,$*2)-$)}function ZX(J,$,Q){if(J<=$)return 0;if(J>=Q)return 1;return J=(J-$)/(Q-$),J*J*(3-2*J)}function KX(J,$,Q){if(J<=$)return 0;if(J>=Q)return 1;return J=(J-$)/(Q-$),J*J*J*(J*(J*6-15)+10)}function WX(J,$){return J+Math.floor(Math.random()*($-J+1))}function XX(J,$){return J+Math.random()*($-J)}function YX(J){return J*(0.5-Math.random())}function HX(J){if(J!==void 0)p5=J;let $=p5+=1831565813;return $=Math.imul($^$>>>15,$|1),$^=$+Math.imul($^$>>>7,$|61),(($^$>>>14)>>>0)/4294967296}function qX(J){return J*x7}function UX(J){return J*W7}function qZ(J){return(J&J-1)===0&&J!==0}function FX(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function i$(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function VX(J,$,Q,Z,K){let{cos:W,sin:Y}=Math,X=W(Q/2),H=Y(Q/2),q=W(($+Z)/2),U=Y(($+Z)/2),V=W(($-Z)/2),F=Y(($-Z)/2),G=W((Z-$)/2),N=Y((Z-$)/2);switch(K){case"XYX":J.set(X*U,H*V,H*F,X*q);break;case"YZY":J.set(H*F,X*U,H*V,X*q);break;case"ZXZ":J.set(H*V,H*F,X*U,X*q);break;case"XZX":J.set(X*U,H*N,H*G,X*q);break;case"YXY":J.set(H*G,X*U,H*N,X*q);break;case"ZYZ":J.set(H*N,H*G,X*U,X*q);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+K)}}function k8(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function KJ(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var t$={DEG2RAD:x7,RAD2DEG:W7,generateUUID:P8,clamp:hJ,euclideanModulo:NZ,mapLinear:eW,inverseLerp:JX,lerp:b7,damp:$X,pingpong:QX,smoothstep:ZX,smootherstep:KX,randInt:WX,randFloat:XX,randFloatSpread:YX,seededRandom:HX,degToRad:qX,radToDeg:UX,isPowerOfTwo:qZ,ceilPowerOfTwo:FX,floorPowerOfTwo:i$,setQuaternionFromProperEuler:VX,normalize:KJ,denormalize:k8};class H0{constructor(J=0,$=0){H0.prototype.isVector2=!0,this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Q=this.y,Z=J.elements;return this.x=Z[0]*$+Z[3]*Q+Z[6],this.y=Z[1]*$+Z[4]*Q+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(Math.max(J,Math.min($,Q)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(hJ(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y;return $*$+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Q=Math.cos($),Z=Math.sin($),K=this.x-J.x,W=this.y-J.y;return this.x=K*Q-W*Z+J.x,this.y=K*Z+W*Q+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class r0{constructor(J,$,Q,Z,K,W,Y,X,H){if(r0.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,W,Y,X,H)}set(J,$,Q,Z,K,W,Y,X,H){let q=this.elements;return q[0]=J,q[1]=Z,q[2]=Y,q[3]=$,q[4]=K,q[5]=X,q[6]=Q,q[7]=W,q[8]=H,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],this}extractBasis(J,$,Q){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Q.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,W=Q[0],Y=Q[3],X=Q[6],H=Q[1],q=Q[4],U=Q[7],V=Q[2],F=Q[5],G=Q[8],N=Z[0],E=Z[3],O=Z[6],D=Z[1],R=Z[4],B=Z[7],z=Z[2],C=Z[5],L=Z[8];return K[0]=W*N+Y*D+X*z,K[3]=W*E+Y*R+X*C,K[6]=W*O+Y*B+X*L,K[1]=H*N+q*D+U*z,K[4]=H*E+q*R+U*C,K[7]=H*O+q*B+U*L,K[2]=V*N+F*D+G*z,K[5]=V*E+F*R+G*C,K[8]=V*O+F*B+G*L,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],W=J[4],Y=J[5],X=J[6],H=J[7],q=J[8];return $*W*q-$*Y*H-Q*K*q+Q*Y*X+Z*K*H-Z*W*X}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],W=J[4],Y=J[5],X=J[6],H=J[7],q=J[8],U=q*W-Y*H,V=Y*X-q*K,F=H*K-W*X,G=$*U+Q*V+Z*F;if(G===0)return this.set(0,0,0,0,0,0,0,0,0);let N=1/G;return J[0]=U*N,J[1]=(Z*H-q*Q)*N,J[2]=(Y*Q-Z*W)*N,J[3]=V*N,J[4]=(q*$-Z*X)*N,J[5]=(Z*K-Y*$)*N,J[6]=F*N,J[7]=(Q*X-H*$)*N,J[8]=(W*$-Q*K)*N,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Q,Z,K,W,Y){let X=Math.cos(K),H=Math.sin(K);return this.set(Q*X,Q*H,-Q*(X*W+H*Y)+W+J,-Z*H,Z*X,-Z*(-H*W+X*Y)+Y+$,0,0,1),this}scale(J,$){return this.premultiply(xQ.makeScale(J,$)),this}rotate(J){return this.premultiply(xQ.makeRotation(-J)),this}translate(J,$){return this.premultiply(xQ.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,Q,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<9;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<9;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var xQ=new r0;function s6(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function o$(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function GX(){let J=o$("canvas");return J.style.display="block",J}var l5={};function f7(J){if(J in l5)return;l5[J]=!0,console.warn(J)}var c5=new r0().set(0.8224621,0.177538,0,0.0331941,0.9668058,0,0.0170827,0.0723974,0.9105199),n5=new r0().set(1.2249401,-0.2249404,0,-0.0420569,1.0420571,0,-0.0196376,-0.0786361,1.0982735),D$={["srgb-linear"]:{transfer:"linear",primaries:"rec709",toReference:(J)=>J,fromReference:(J)=>J},["srgb"]:{transfer:"srgb",primaries:"rec709",toReference:(J)=>J.convertSRGBToLinear(),fromReference:(J)=>J.convertLinearToSRGB()},["display-p3-linear"]:{transfer:"linear",primaries:"p3",toReference:(J)=>J.applyMatrix3(n5),fromReference:(J)=>J.applyMatrix3(c5)},["display-p3"]:{transfer:"srgb",primaries:"p3",toReference:(J)=>J.convertSRGBToLinear().applyMatrix3(n5),fromReference:(J)=>J.applyMatrix3(c5).convertLinearToSRGB()}},OX=new Set(["srgb-linear","display-p3-linear"]),XJ={enabled:!0,_workingColorSpace:"srgb-linear",get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(J){if(!OX.has(J))throw Error(`Unsupported working color space, "${J}".`);this._workingColorSpace=J},convert:function(J,$,Q){if(this.enabled===!1||$===Q||!$||!Q)return J;let Z=D$[$].toReference,K=D$[Q].fromReference;return K(Z(J))},fromWorkingColorSpace:function(J,$){return this.convert(J,this._workingColorSpace,$)},toWorkingColorSpace:function(J,$){return this.convert(J,$,this._workingColorSpace)},getPrimaries:function(J){return D$[J].primaries},getTransfer:function(J){if(J==="")return"linear";return D$[J].transfer}};function K7(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function bQ(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var f9;class RZ{static getDataURL(J){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(f9===void 0)f9=o$("canvas");f9.width=J.width,f9.height=J.height;let Q=f9.getContext("2d");if(J instanceof ImageData)Q.putImageData(J,0,0);else Q.drawImage(J,0,0,J.width,J.height);$=f9}if($.width>2048||$.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",J),$.toDataURL("image/jpeg",0.6);else return $.toDataURL("image/png")}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=o$("canvas");$.width=J.width,$.height=J.height;let Q=$.getContext("2d");Q.drawImage(J,0,0,J.width,J.height);let Z=Q.getImageData(0,0,J.width,J.height),K=Z.data;for(let W=0;W<K.length;W++)K[W]=K7(K[W]/255)*255;return Q.putImageData(Z,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Q=0;Q<$.length;Q++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Q]=Math.floor(K7($[Q]/255)*255);else $[Q]=K7($[Q]);return{data:$,width:J.width,height:J.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var DX=0;class BZ{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:DX++}),this.uuid=P8(),this.data=J,this.version=0}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Q={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let W=0,Y=Z.length;W<Y;W++)if(Z[W].isDataTexture)K.push(fQ(Z[W].image));else K.push(fQ(Z[W]))}else K=fQ(Z);Q.url=K}if(!$)J.images[this.uuid]=Q;return Q}}function fQ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return RZ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var EX=0;class tJ extends u8{constructor(J=tJ.DEFAULT_IMAGE,$=tJ.DEFAULT_MAPPING,Q=1001,Z=1001,K=1006,W=1008,Y=1023,X=1009,H=tJ.DEFAULT_ANISOTROPY,q=""){super();if(this.isTexture=!0,Object.defineProperty(this,"id",{value:EX++}),this.uuid=P8(),this.name="",this.source=new BZ(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Q,this.wrapT=Z,this.magFilter=K,this.minFilter=W,this.anisotropy=H,this.format=Y,this.internalFormat=null,this.type=X,this.offset=new H0(0,0),this.repeat=new H0(1,1),this.center=new H0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new r0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof q==="string")this.colorSpace=q;else f7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=q===3001?"srgb":"";this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(J=null){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Q={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(!$)J.textures[this.uuid]=Q;return Q}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}get encoding(){return f7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace==="srgb"?3001:3000}set encoding(J){f7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=J===3001?"srgb":""}}tJ.DEFAULT_IMAGE=null;tJ.DEFAULT_MAPPING=300;tJ.DEFAULT_ANISOTROPY=1;class DJ{constructor(J=0,$=0,Q=0,Z=1){DJ.prototype.isVector4=!0,this.x=J,this.y=$,this.z=Q,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Q,Z){return this.x=J,this.y=$,this.z=Q,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=this.w,W=J.elements;return this.x=W[0]*$+W[4]*Q+W[8]*Z+W[12]*K,this.y=W[1]*$+W[5]*Q+W[9]*Z+W[13]*K,this.z=W[2]*$+W[6]*Q+W[10]*Z+W[14]*K,this.w=W[3]*$+W[7]*Q+W[11]*Z+W[15]*K,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Q,Z,K,W=0.01,Y=0.1,X=J.elements,H=X[0],q=X[4],U=X[8],V=X[1],F=X[5],G=X[9],N=X[2],E=X[6],O=X[10];if(Math.abs(q-V)<0.01&&Math.abs(U-N)<0.01&&Math.abs(G-E)<0.01){if(Math.abs(q+V)<0.1&&Math.abs(U+N)<0.1&&Math.abs(G+E)<0.1&&Math.abs(H+F+O-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let R=(H+1)/2,B=(F+1)/2,z=(O+1)/2,C=(q+V)/4,L=(U+N)/4,A=(G+E)/4;if(R>B&&R>z)if(R<0.01)Q=0,Z=0.707106781,K=0.707106781;else Q=Math.sqrt(R),Z=C/Q,K=L/Q;else if(B>z)if(B<0.01)Q=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(B),Q=C/Z,K=A/Z;else if(z<0.01)Q=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(z),Q=L/K,Z=A/K;return this.set(Q,Z,K,$),this}let D=Math.sqrt((E-G)*(E-G)+(U-N)*(U-N)+(V-q)*(V-q));if(Math.abs(D)<0.001)D=1;return this.x=(E-G)/D,this.y=(U-N)/D,this.z=(V-q)/D,this.w=Math.acos((H+F+O-1)/2),this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this.w=Math.max(J.w,Math.min($.w,this.w)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this.w=Math.max(J,Math.min($,this.w)),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(Math.max(J,Math.min($,Q)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this.w=J.w+($.w-J.w)*Q,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class i6 extends u8{constructor(J=1,$=1,Q={}){super();this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=1,this.scissor=new DJ(0,0,J,$),this.scissorTest=!1,this.viewport=new DJ(0,0,J,$);let Z={width:J,height:$,depth:1};if(Q.encoding!==void 0)f7("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),Q.colorSpace=Q.encoding===3001?"srgb":"";Q=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},Q),this.texture=new tJ(Z,Q.mapping,Q.wrapS,Q.wrapT,Q.magFilter,Q.minFilter,Q.format,Q.type,Q.anisotropy,Q.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.internalFormat=Q.internalFormat,this.depthBuffer=Q.depthBuffer,this.stencilBuffer=Q.stencilBuffer,this.depthTexture=Q.depthTexture,this.samples=Q.samples}setSize(J,$,Q=1){if(this.width!==J||this.height!==$||this.depth!==Q)this.width=J,this.height=$,this.depth=Q,this.texture.image.width=J,this.texture.image.height=$,this.texture.image.depth=Q,this.dispose();this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.texture=J.texture.clone(),this.texture.isRenderTargetTexture=!0;let $=Object.assign({},J.texture.image);if(this.texture.source=new BZ($),this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $9 extends i6{constructor(J=1,$=1,Q={}){super(J,$,Q);this.isWebGLRenderTarget=!0}}class zZ extends tJ{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class o6 extends tJ{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _8{constructor(J=0,$=0,Q=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Q,this._w=Z}static slerpFlat(J,$,Q,Z,K,W,Y){let X=Q[Z+0],H=Q[Z+1],q=Q[Z+2],U=Q[Z+3],V=K[W+0],F=K[W+1],G=K[W+2],N=K[W+3];if(Y===0){J[$+0]=X,J[$+1]=H,J[$+2]=q,J[$+3]=U;return}if(Y===1){J[$+0]=V,J[$+1]=F,J[$+2]=G,J[$+3]=N;return}if(U!==N||X!==V||H!==F||q!==G){let E=1-Y,O=X*V+H*F+q*G+U*N,D=O>=0?1:-1,R=1-O*O;if(R>Number.EPSILON){let z=Math.sqrt(R),C=Math.atan2(z,O*D);E=Math.sin(E*C)/z,Y=Math.sin(Y*C)/z}let B=Y*D;if(X=X*E+V*B,H=H*E+F*B,q=q*E+G*B,U=U*E+N*B,E===1-Y){let z=1/Math.sqrt(X*X+H*H+q*q+U*U);X*=z,H*=z,q*=z,U*=z}}J[$]=X,J[$+1]=H,J[$+2]=q,J[$+3]=U}static multiplyQuaternionsFlat(J,$,Q,Z,K,W){let Y=Q[Z],X=Q[Z+1],H=Q[Z+2],q=Q[Z+3],U=K[W],V=K[W+1],F=K[W+2],G=K[W+3];return J[$]=Y*G+q*U+X*F-H*V,J[$+1]=X*G+q*V+H*U-Y*F,J[$+2]=H*G+q*F+Y*V-X*U,J[$+3]=q*G-Y*U-X*V-H*F,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Q,Z){return this._x=J,this._y=$,this._z=Q,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Q,_y:Z,_z:K,_order:W}=J,Y=Math.cos,X=Math.sin,H=Y(Q/2),q=Y(Z/2),U=Y(K/2),V=X(Q/2),F=X(Z/2),G=X(K/2);switch(W){case"XYZ":this._x=V*q*U+H*F*G,this._y=H*F*U-V*q*G,this._z=H*q*G+V*F*U,this._w=H*q*U-V*F*G;break;case"YXZ":this._x=V*q*U+H*F*G,this._y=H*F*U-V*q*G,this._z=H*q*G-V*F*U,this._w=H*q*U+V*F*G;break;case"ZXY":this._x=V*q*U-H*F*G,this._y=H*F*U+V*q*G,this._z=H*q*G+V*F*U,this._w=H*q*U-V*F*G;break;case"ZYX":this._x=V*q*U-H*F*G,this._y=H*F*U+V*q*G,this._z=H*q*G-V*F*U,this._w=H*q*U+V*F*G;break;case"YZX":this._x=V*q*U+H*F*G,this._y=H*F*U+V*q*G,this._z=H*q*G-V*F*U,this._w=H*q*U-V*F*G;break;case"XZY":this._x=V*q*U-H*F*G,this._y=H*F*U-V*q*G,this._z=H*q*G+V*F*U,this._w=H*q*U+V*F*G;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+W)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Q=$/2,Z=Math.sin(Q);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos(Q),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Q=$[0],Z=$[4],K=$[8],W=$[1],Y=$[5],X=$[9],H=$[2],q=$[6],U=$[10],V=Q+Y+U;if(V>0){let F=0.5/Math.sqrt(V+1);this._w=0.25/F,this._x=(q-X)*F,this._y=(K-H)*F,this._z=(W-Z)*F}else if(Q>Y&&Q>U){let F=2*Math.sqrt(1+Q-Y-U);this._w=(q-X)/F,this._x=0.25*F,this._y=(Z+W)/F,this._z=(K+H)/F}else if(Y>U){let F=2*Math.sqrt(1+Y-Q-U);this._w=(K-H)/F,this._x=(Z+W)/F,this._y=0.25*F,this._z=(X+q)/F}else{let F=2*Math.sqrt(1+U-Q-Y);this._w=(W-Z)/F,this._x=(K+H)/F,this._y=(X+q)/F,this._z=0.25*F}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Q=J.dot($)+1;if(Q<Number.EPSILON)if(Q=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Q;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Q;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Q;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(hJ(this.dot(J),-1,1)))}rotateTowards(J,$){let Q=this.angleTo(J);if(Q===0)return this;let Z=Math.min(1,$/Q);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Q,_y:Z,_z:K,_w:W}=J,Y=$._x,X=$._y,H=$._z,q=$._w;return this._x=Q*q+W*Y+Z*H-K*X,this._y=Z*q+W*X+K*Y-Q*H,this._z=K*q+W*H+Q*X-Z*Y,this._w=W*q-Q*Y-Z*X-K*H,this._onChangeCallback(),this}slerp(J,$){if($===0)return this;if($===1)return this.copy(J);let Q=this._x,Z=this._y,K=this._z,W=this._w,Y=W*J._w+Q*J._x+Z*J._y+K*J._z;if(Y<0)this._w=-J._w,this._x=-J._x,this._y=-J._y,this._z=-J._z,Y=-Y;else this.copy(J);if(Y>=1)return this._w=W,this._x=Q,this._y=Z,this._z=K,this;let X=1-Y*Y;if(X<=Number.EPSILON){let F=1-$;return this._w=F*W+$*this._w,this._x=F*Q+$*this._x,this._y=F*Z+$*this._y,this._z=F*K+$*this._z,this.normalize(),this}let H=Math.sqrt(X),q=Math.atan2(H,Y),U=Math.sin((1-$)*q)/H,V=Math.sin($*q)/H;return this._w=W*U+this._w*V,this._x=Q*U+this._x*V,this._y=Z*U+this._y*V,this._z=K*U+this._z*V,this._onChangeCallback(),this}slerpQuaternions(J,$,Q){return this.copy(J).slerp($,Q)}random(){let J=Math.random(),$=Math.sqrt(1-J),Q=Math.sqrt(J),Z=2*Math.PI*Math.random(),K=2*Math.PI*Math.random();return this.set($*Math.cos(Z),Q*Math.sin(K),Q*Math.cos(K),$*Math.sin(Z))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(J=0,$=0,Q=0){T.prototype.isVector3=!0,this.x=J,this.y=$,this.z=Q}set(J,$,Q){if(Q===void 0)Q=this.z;return this.x=J,this.y=$,this.z=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(s5.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(s5.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[3]*Q+K[6]*Z,this.y=K[1]*$+K[4]*Q+K[7]*Z,this.z=K[2]*$+K[5]*Q+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements,W=1/(K[3]*$+K[7]*Q+K[11]*Z+K[15]);return this.x=(K[0]*$+K[4]*Q+K[8]*Z+K[12])*W,this.y=(K[1]*$+K[5]*Q+K[9]*Z+K[13])*W,this.z=(K[2]*$+K[6]*Q+K[10]*Z+K[14])*W,this}applyQuaternion(J){let $=this.x,Q=this.y,Z=this.z,K=J.x,W=J.y,Y=J.z,X=J.w,H=2*(W*Z-Y*Q),q=2*(Y*$-K*Z),U=2*(K*Q-W*$);return this.x=$+X*H+W*U-Y*q,this.y=Q+X*q+Y*H-K*U,this.z=Z+X*U+K*q-W*H,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[4]*Q+K[8]*Z,this.y=K[1]*$+K[5]*Q+K[9]*Z,this.z=K[2]*$+K[6]*Q+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(Math.max(J,Math.min($,Q)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Q,y:Z,z:K}=J,W=$.x,Y=$.y,X=$.z;return this.x=Z*X-K*Y,this.y=K*W-Q*X,this.z=Q*Y-Z*W,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Q=J.dot(this)/$;return this.copy(J).multiplyScalar(Q)}projectOnPlane(J){return hQ.copy(this).projectOnVector(J),this.sub(hQ)}reflect(J){return this.sub(hQ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(hJ(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y,Z=this.z-J.z;return $*$+Q*Q+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Q){let Z=Math.sin($)*J;return this.x=Z*Math.sin(Q),this.y=Math.cos($)*J,this.z=Z*Math.cos(Q),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Q){return this.x=J*Math.sin($),this.y=Q,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Q=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Q,this.z=Z,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=(Math.random()-0.5)*2,$=Math.random()*Math.PI*2,Q=Math.sqrt(1-J**2);return this.x=Q*Math.cos($),this.y=Q*Math.sin($),this.z=J,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var hQ=new T,s5=new _8;class Y7{constructor(J=new T(1/0,1/0,1/0),$=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$+=3)this.expandByPoint(R8.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Q=J.count;$<Q;$++)this.expandByPoint(R8.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Q=R8.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Q),this.max.copy(J).add(Q),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Q=J.geometry;if(Q!==void 0){let K=Q.getAttribute("position");if($===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let W=0,Y=K.count;W<Y;W++){if(J.isMesh===!0)J.getVertexPosition(W,R8);else R8.fromBufferAttribute(K,W);R8.applyMatrix4(J.matrixWorld),this.expandByPoint(R8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();E$.copy(J.boundingBox)}else{if(Q.boundingBox===null)Q.computeBoundingBox();E$.copy(Q.boundingBox)}E$.applyMatrix4(J.matrixWorld),this.union(E$)}}let Z=J.children;for(let K=0,W=Z.length;K<W;K++)this.expandByObject(Z[K],$);return this}containsPoint(J){return J.x<this.min.x||J.x>this.max.x||J.y<this.min.y||J.y>this.max.y||J.z<this.min.z||J.z>this.max.z?!1:!0}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x<this.min.x||J.min.x>this.max.x||J.max.y<this.min.y||J.min.y>this.max.y||J.max.z<this.min.z||J.min.z>this.max.z?!1:!0}intersectsSphere(J){return this.clampPoint(J.center,R8),R8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Q;if(J.normal.x>0)$=J.normal.x*this.min.x,Q=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Q=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Q+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Q+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Q+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Q+=J.normal.z*this.min.z;return $<=-J.constant&&Q>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(k7),N$.subVectors(this.max,k7),h9.subVectors(J.a,k7),v9.subVectors(J.b,k7),g9.subVectors(J.c,k7),r8.subVectors(v9,h9),a8.subVectors(g9,v9),O9.subVectors(h9,g9);let $=[0,-r8.z,r8.y,0,-a8.z,a8.y,0,-O9.z,O9.y,r8.z,0,-r8.x,a8.z,0,-a8.x,O9.z,0,-O9.x,-r8.y,r8.x,0,-a8.y,a8.x,0,-O9.y,O9.x,0];if(!vQ($,h9,v9,g9,N$))return!1;if($=[1,0,0,0,1,0,0,0,1],!vQ($,h9,v9,g9,N$))return!1;return R$.crossVectors(r8,a8),$=[R$.x,R$.y,R$.z],vQ($,h9,v9,g9,N$)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,R8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(R8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return f8[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),f8[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),f8[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),f8[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),f8[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),f8[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),f8[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),f8[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(f8),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}}var f8=[new T,new T,new T,new T,new T,new T,new T,new T],R8=new T,E$=new Y7,h9=new T,v9=new T,g9=new T,r8=new T,a8=new T,O9=new T,k7=new T,N$=new T,R$=new T,D9=new T;function vQ(J,$,Q,Z,K){for(let W=0,Y=J.length-3;W<=Y;W+=3){D9.fromArray(J,W);let X=K.x*Math.abs(D9.x)+K.y*Math.abs(D9.y)+K.z*Math.abs(D9.z),H=$.dot(D9),q=Q.dot(D9),U=Z.dot(D9);if(Math.max(-Math.max(H,q,U),Math.min(H,q,U))>X)return!1}return!0}var NX=new Y7,P7=new T,gQ=new T;class H7{constructor(J=new T,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Q=this.center;if($!==void 0)Q.copy($);else NX.setFromPoints(J).getCenter(Q);let Z=0;for(let K=0,W=J.length;K<W;K++)Z=Math.max(Z,Q.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Q=this.center.distanceToSquared(J);if($.copy(J),Q>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;P7.subVectors(J,this.center);let $=P7.lengthSq();if($>this.radius*this.radius){let Q=Math.sqrt($),Z=(Q-this.radius)*0.5;this.center.addScaledVector(P7,Z/Q),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else gQ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(P7.copy(J.center).add(gQ)),this.expandByPoint(P7.copy(J.center).sub(gQ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}}var h8=new T,mQ=new T,B$=new T,t8=new T,uQ=new T,z$=new T,dQ=new T;class A9{constructor(J=new T,$=new T(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,h8)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Q=$.dot(this.direction);if(Q<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Q)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=h8.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return h8.copy(this.origin).addScaledVector(this.direction,$),h8.distanceToSquared(J)}distanceSqToSegment(J,$,Q,Z){mQ.copy(J).add($).multiplyScalar(0.5),B$.copy($).sub(J).normalize(),t8.copy(this.origin).sub(mQ);let K=J.distanceTo($)*0.5,W=-this.direction.dot(B$),Y=t8.dot(this.direction),X=-t8.dot(B$),H=t8.lengthSq(),q=Math.abs(1-W*W),U,V,F,G;if(q>0)if(U=W*X-Y,V=W*Y-X,G=K*q,U>=0)if(V>=-G)if(V<=G){let N=1/q;U*=N,V*=N,F=U*(U+W*V+2*Y)+V*(W*U+V+2*X)+H}else V=K,U=Math.max(0,-(W*V+Y)),F=-U*U+V*(V+2*X)+H;else V=-K,U=Math.max(0,-(W*V+Y)),F=-U*U+V*(V+2*X)+H;else if(V<=-G)U=Math.max(0,-(-W*K+Y)),V=U>0?-K:Math.min(Math.max(-K,-X),K),F=-U*U+V*(V+2*X)+H;else if(V<=G)U=0,V=Math.min(Math.max(-K,-X),K),F=V*(V+2*X)+H;else U=Math.max(0,-(W*K+Y)),V=U>0?K:Math.min(Math.max(-K,-X),K),F=-U*U+V*(V+2*X)+H;else V=W>0?-K:K,U=Math.max(0,-(W*V+Y)),F=-U*U+V*(V+2*X)+H;if(Q)Q.copy(this.origin).addScaledVector(this.direction,U);if(Z)Z.copy(mQ).addScaledVector(B$,V);return F}intersectSphere(J,$){h8.subVectors(J.center,this.origin);let Q=h8.dot(this.direction),Z=h8.dot(h8)-Q*Q,K=J.radius*J.radius;if(Z>K)return null;let W=Math.sqrt(K-Z),Y=Q-W,X=Q+W;if(X<0)return null;if(Y<0)return this.at(X,$);return this.at(Y,$)}intersectsSphere(J){return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Q=-(this.origin.dot(J.normal)+J.constant)/$;return Q>=0?Q:null}intersectPlane(J,$){let Q=this.distanceToPlane(J);if(Q===null)return null;return this.at(Q,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Q,Z,K,W,Y,X,H=1/this.direction.x,q=1/this.direction.y,U=1/this.direction.z,V=this.origin;if(H>=0)Q=(J.min.x-V.x)*H,Z=(J.max.x-V.x)*H;else Q=(J.max.x-V.x)*H,Z=(J.min.x-V.x)*H;if(q>=0)K=(J.min.y-V.y)*q,W=(J.max.y-V.y)*q;else K=(J.max.y-V.y)*q,W=(J.min.y-V.y)*q;if(Q>W||K>Z)return null;if(K>Q||isNaN(Q))Q=K;if(W<Z||isNaN(Z))Z=W;if(U>=0)Y=(J.min.z-V.z)*U,X=(J.max.z-V.z)*U;else Y=(J.max.z-V.z)*U,X=(J.min.z-V.z)*U;if(Q>X||Y>Z)return null;if(Y>Q||Q!==Q)Q=Y;if(X<Z||Z!==Z)Z=X;if(Z<0)return null;return this.at(Q>=0?Q:Z,$)}intersectsBox(J){return this.intersectBox(J,h8)!==null}intersectTriangle(J,$,Q,Z,K){uQ.subVectors($,J),z$.subVectors(Q,J),dQ.crossVectors(uQ,z$);let W=this.direction.dot(dQ),Y;if(W>0){if(Z)return null;Y=1}else if(W<0)Y=-1,W=-W;else return null;t8.subVectors(this.origin,J);let X=Y*this.direction.dot(z$.crossVectors(t8,z$));if(X<0)return null;let H=Y*this.direction.dot(uQ.cross(t8));if(H<0)return null;if(X+H>W)return null;let q=-Y*t8.dot(dQ);if(q<0)return null;return this.at(q/W,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class UJ{constructor(J,$,Q,Z,K,W,Y,X,H,q,U,V,F,G,N,E){if(UJ.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,W,Y,X,H,q,U,V,F,G,N,E)}set(J,$,Q,Z,K,W,Y,X,H,q,U,V,F,G,N,E){let O=this.elements;return O[0]=J,O[4]=$,O[8]=Q,O[12]=Z,O[1]=K,O[5]=W,O[9]=Y,O[13]=X,O[2]=H,O[6]=q,O[10]=U,O[14]=V,O[3]=F,O[7]=G,O[11]=N,O[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new UJ().fromArray(this.elements)}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],$[9]=Q[9],$[10]=Q[10],$[11]=Q[11],$[12]=Q[12],$[13]=Q[13],$[14]=Q[14],$[15]=Q[15],this}copyPosition(J){let $=this.elements,Q=J.elements;return $[12]=Q[12],$[13]=Q[13],$[14]=Q[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Q){return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Q.setFromMatrixColumn(this,2),this}makeBasis(J,$,Q){return this.set(J.x,$.x,Q.x,0,J.y,$.y,Q.y,0,J.z,$.z,Q.z,0,0,0,0,1),this}extractRotation(J){let $=this.elements,Q=J.elements,Z=1/m9.setFromMatrixColumn(J,0).length(),K=1/m9.setFromMatrixColumn(J,1).length(),W=1/m9.setFromMatrixColumn(J,2).length();return $[0]=Q[0]*Z,$[1]=Q[1]*Z,$[2]=Q[2]*Z,$[3]=0,$[4]=Q[4]*K,$[5]=Q[5]*K,$[6]=Q[6]*K,$[7]=0,$[8]=Q[8]*W,$[9]=Q[9]*W,$[10]=Q[10]*W,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z,W=Math.cos(Q),Y=Math.sin(Q),X=Math.cos(Z),H=Math.sin(Z),q=Math.cos(K),U=Math.sin(K);if(J.order==="XYZ"){let V=W*q,F=W*U,G=Y*q,N=Y*U;$[0]=X*q,$[4]=-X*U,$[8]=H,$[1]=F+G*H,$[5]=V-N*H,$[9]=-Y*X,$[2]=N-V*H,$[6]=G+F*H,$[10]=W*X}else if(J.order==="YXZ"){let V=X*q,F=X*U,G=H*q,N=H*U;$[0]=V+N*Y,$[4]=G*Y-F,$[8]=W*H,$[1]=W*U,$[5]=W*q,$[9]=-Y,$[2]=F*Y-G,$[6]=N+V*Y,$[10]=W*X}else if(J.order==="ZXY"){let V=X*q,F=X*U,G=H*q,N=H*U;$[0]=V-N*Y,$[4]=-W*U,$[8]=G+F*Y,$[1]=F+G*Y,$[5]=W*q,$[9]=N-V*Y,$[2]=-W*H,$[6]=Y,$[10]=W*X}else if(J.order==="ZYX"){let V=W*q,F=W*U,G=Y*q,N=Y*U;$[0]=X*q,$[4]=G*H-F,$[8]=V*H+N,$[1]=X*U,$[5]=N*H+V,$[9]=F*H-G,$[2]=-H,$[6]=Y*X,$[10]=W*X}else if(J.order==="YZX"){let V=W*X,F=W*H,G=Y*X,N=Y*H;$[0]=X*q,$[4]=N-V*U,$[8]=G*U+F,$[1]=U,$[5]=W*q,$[9]=-Y*q,$[2]=-H*q,$[6]=F*U+G,$[10]=V-N*U}else if(J.order==="XZY"){let V=W*X,F=W*H,G=Y*X,N=Y*H;$[0]=X*q,$[4]=-U,$[8]=H*q,$[1]=V*U+N,$[5]=W*q,$[9]=F*U-G,$[2]=G*U-F,$[6]=Y*q,$[10]=N*U+V}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(RX,J,BX)}lookAt(J,$,Q){let Z=this.elements;if(Y8.subVectors(J,$),Y8.lengthSq()===0)Y8.z=1;if(Y8.normalize(),e8.crossVectors(Q,Y8),e8.lengthSq()===0){if(Math.abs(Q.z)===1)Y8.x+=0.0001;else Y8.z+=0.0001;Y8.normalize(),e8.crossVectors(Q,Y8)}return e8.normalize(),I$.crossVectors(Y8,e8),Z[0]=e8.x,Z[4]=I$.x,Z[8]=Y8.x,Z[1]=e8.y,Z[5]=I$.y,Z[9]=Y8.y,Z[2]=e8.z,Z[6]=I$.z,Z[10]=Y8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,W=Q[0],Y=Q[4],X=Q[8],H=Q[12],q=Q[1],U=Q[5],V=Q[9],F=Q[13],G=Q[2],N=Q[6],E=Q[10],O=Q[14],D=Q[3],R=Q[7],B=Q[11],z=Q[15],C=Z[0],L=Z[4],A=Z[8],w=Z[12],I=Z[1],k=Z[5],b=Z[9],n=Z[13],i=Z[2],y=Z[6],h=Z[10],m=Z[14],l=Z[3],d=Z[7],v=Z[11],u=Z[15];return K[0]=W*C+Y*I+X*i+H*l,K[4]=W*L+Y*k+X*y+H*d,K[8]=W*A+Y*b+X*h+H*v,K[12]=W*w+Y*n+X*m+H*u,K[1]=q*C+U*I+V*i+F*l,K[5]=q*L+U*k+V*y+F*d,K[9]=q*A+U*b+V*h+F*v,K[13]=q*w+U*n+V*m+F*u,K[2]=G*C+N*I+E*i+O*l,K[6]=G*L+N*k+E*y+O*d,K[10]=G*A+N*b+E*h+O*v,K[14]=G*w+N*n+E*m+O*u,K[3]=D*C+R*I+B*i+z*l,K[7]=D*L+R*k+B*y+z*d,K[11]=D*A+R*b+B*h+z*v,K[15]=D*w+R*n+B*m+z*u,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[4],Z=J[8],K=J[12],W=J[1],Y=J[5],X=J[9],H=J[13],q=J[2],U=J[6],V=J[10],F=J[14],G=J[3],N=J[7],E=J[11],O=J[15];return G*(+K*X*U-Z*H*U-K*Y*V+Q*H*V+Z*Y*F-Q*X*F)+N*(+$*X*F-$*H*V+K*W*V-Z*W*F+Z*H*q-K*X*q)+E*(+$*H*U-$*Y*F-K*W*U+Q*W*F+K*Y*q-Q*H*q)+O*(-Z*Y*q-$*X*U+$*Y*V+Z*W*U-Q*W*V+Q*X*q)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Q){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=$,Z[14]=Q;return this}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],W=J[4],Y=J[5],X=J[6],H=J[7],q=J[8],U=J[9],V=J[10],F=J[11],G=J[12],N=J[13],E=J[14],O=J[15],D=U*E*H-N*V*H+N*X*F-Y*E*F-U*X*O+Y*V*O,R=G*V*H-q*E*H-G*X*F+W*E*F+q*X*O-W*V*O,B=q*N*H-G*U*H+G*Y*F-W*N*F-q*Y*O+W*U*O,z=G*U*X-q*N*X-G*Y*V+W*N*V+q*Y*E-W*U*E,C=$*D+Q*R+Z*B+K*z;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/C;return J[0]=D*L,J[1]=(N*V*K-U*E*K-N*Z*F+Q*E*F+U*Z*O-Q*V*O)*L,J[2]=(Y*E*K-N*X*K+N*Z*H-Q*E*H-Y*Z*O+Q*X*O)*L,J[3]=(U*X*K-Y*V*K-U*Z*H+Q*V*H+Y*Z*F-Q*X*F)*L,J[4]=R*L,J[5]=(q*E*K-G*V*K+G*Z*F-$*E*F-q*Z*O+$*V*O)*L,J[6]=(G*X*K-W*E*K-G*Z*H+$*E*H+W*Z*O-$*X*O)*L,J[7]=(W*V*K-q*X*K+q*Z*H-$*V*H-W*Z*F+$*X*F)*L,J[8]=B*L,J[9]=(G*U*K-q*N*K-G*Q*F+$*N*F+q*Q*O-$*U*O)*L,J[10]=(W*N*K-G*Y*K+G*Q*H-$*N*H-W*Q*O+$*Y*O)*L,J[11]=(q*Y*K-W*U*K-q*Q*H+$*U*H+W*Q*F-$*Y*F)*L,J[12]=z*L,J[13]=(q*N*Z-G*U*Z+G*Q*V-$*N*V-q*Q*E+$*U*E)*L,J[14]=(G*Y*Z-W*N*Z-G*Q*X+$*N*X+W*Q*E-$*Y*E)*L,J[15]=(W*U*Z-q*Y*Z+q*Q*X-$*U*X-W*Q*V+$*Y*V)*L,this}scale(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z;return $[0]*=Q,$[4]*=Z,$[8]*=K,$[1]*=Q,$[5]*=Z,$[9]*=K,$[2]*=Q,$[6]*=Z,$[10]*=K,$[3]*=Q,$[7]*=Z,$[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Q=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Q,Z))}makeTranslation(J,$,Q){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Q,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Q=Math.sin(J);return this.set(1,0,0,0,0,$,-Q,0,0,Q,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,0,Q,0,0,1,0,0,-Q,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,0,Q,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Q=Math.cos($),Z=Math.sin($),K=1-Q,W=J.x,Y=J.y,X=J.z,H=K*W,q=K*Y;return this.set(H*W+Q,H*Y-Z*X,H*X+Z*Y,0,H*Y+Z*X,q*Y+Q,q*X-Z*W,0,H*X-Z*Y,q*X+Z*W,K*X*X+Q,0,0,0,0,1),this}makeScale(J,$,Q){return this.set(J,0,0,0,0,$,0,0,0,0,Q,0,0,0,0,1),this}makeShear(J,$,Q,Z,K,W){return this.set(1,Q,K,0,J,1,W,0,$,Z,1,0,0,0,0,1),this}compose(J,$,Q){let Z=this.elements,K=$._x,W=$._y,Y=$._z,X=$._w,H=K+K,q=W+W,U=Y+Y,V=K*H,F=K*q,G=K*U,N=W*q,E=W*U,O=Y*U,D=X*H,R=X*q,B=X*U,z=Q.x,C=Q.y,L=Q.z;return Z[0]=(1-(N+O))*z,Z[1]=(F+B)*z,Z[2]=(G-R)*z,Z[3]=0,Z[4]=(F-B)*C,Z[5]=(1-(V+O))*C,Z[6]=(E+D)*C,Z[7]=0,Z[8]=(G+R)*L,Z[9]=(E-D)*L,Z[10]=(1-(V+N))*L,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,$,Q){let Z=this.elements,K=m9.set(Z[0],Z[1],Z[2]).length(),W=m9.set(Z[4],Z[5],Z[6]).length(),Y=m9.set(Z[8],Z[9],Z[10]).length();if(this.determinant()<0)K=-K;J.x=Z[12],J.y=Z[13],J.z=Z[14],B8.copy(this);let H=1/K,q=1/W,U=1/Y;return B8.elements[0]*=H,B8.elements[1]*=H,B8.elements[2]*=H,B8.elements[4]*=q,B8.elements[5]*=q,B8.elements[6]*=q,B8.elements[8]*=U,B8.elements[9]*=U,B8.elements[10]*=U,$.setFromRotationMatrix(B8),Q.x=K,Q.y=W,Q.z=Y,this}makePerspective(J,$,Q,Z,K,W,Y=2000){let X=this.elements,H=2*K/($-J),q=2*K/(Q-Z),U=($+J)/($-J),V=(Q+Z)/(Q-Z),F,G;if(Y===2000)F=-(W+K)/(W-K),G=-2*W*K/(W-K);else if(Y===2001)F=-W/(W-K),G=-W*K/(W-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+Y);return X[0]=H,X[4]=0,X[8]=U,X[12]=0,X[1]=0,X[5]=q,X[9]=V,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=G,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,$,Q,Z,K,W,Y=2000){let X=this.elements,H=1/($-J),q=1/(Q-Z),U=1/(W-K),V=($+J)*H,F=(Q+Z)*q,G,N;if(Y===2000)G=(W+K)*U,N=-2*U;else if(Y===2001)G=K*U,N=-1*U;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+Y);return X[0]=2*H,X[4]=0,X[8]=0,X[12]=-V,X[1]=0,X[5]=2*q,X[9]=0,X[13]=-F,X[2]=0,X[6]=0,X[10]=N,X[14]=-G,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<16;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<16;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J[$+9]=Q[9],J[$+10]=Q[10],J[$+11]=Q[11],J[$+12]=Q[12],J[$+13]=Q[13],J[$+14]=Q[14],J[$+15]=Q[15],J}}var m9=new T,B8=new UJ,RX=new T(0,0,0),BX=new T(1,1,1),e8=new T,I$=new T,Y8=new T,i5=new UJ,o5=new _8;class e${constructor(J=0,$=0,Q=0,Z=e$.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Q,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Q,Z=this._order){return this._x=J,this._y=$,this._z=Q,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Q=!0){let Z=J.elements,K=Z[0],W=Z[4],Y=Z[8],X=Z[1],H=Z[5],q=Z[9],U=Z[2],V=Z[6],F=Z[10];switch($){case"XYZ":if(this._y=Math.asin(hJ(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-q,F),this._z=Math.atan2(-W,K);else this._x=Math.atan2(V,H),this._z=0;break;case"YXZ":if(this._x=Math.asin(-hJ(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(Y,F),this._z=Math.atan2(X,H);else this._y=Math.atan2(-U,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(hJ(V,-1,1)),Math.abs(V)<0.9999999)this._y=Math.atan2(-U,F),this._z=Math.atan2(-W,H);else this._y=0,this._z=Math.atan2(X,K);break;case"ZYX":if(this._y=Math.asin(-hJ(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(V,F),this._z=Math.atan2(X,K);else this._x=0,this._z=Math.atan2(-W,H);break;case"YZX":if(this._z=Math.asin(hJ(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-q,H),this._y=Math.atan2(-U,K);else this._x=0,this._y=Math.atan2(Y,F);break;case"XZY":if(this._z=Math.asin(-hJ(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(V,H),this._y=Math.atan2(Y,K);else this._x=Math.atan2(-q,F),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Q===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Q){return i5.makeRotationFromQuaternion(J),this.setFromRotationMatrix(i5,$,Q)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return o5.setFromEuler(this),this.setFromQuaternion(o5,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}e$.DEFAULT_ORDER="XYZ";class JQ{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var zX=0,r5=new T,u9=new _8,v8=new UJ,L$=new T,S7=new T,IX=new T,LX=new _8,a5=new T(1,0,0),t5=new T(0,1,0),e5=new T(0,0,1),CX={type:"added"},AX={type:"removed"};class EJ extends u8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:zX++}),this.uuid=P8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=EJ.DEFAULT_UP.clone();let J=new T,$=new e$,Q=new _8,Z=new T(1,1,1);function K(){Q.setFromEuler($,!1)}function W(){$.setFromQuaternion(Q,void 0,!1)}$._onChange(K),Q._onChange(W),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Q},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new UJ},normalMatrix:{value:new r0}}),this.matrix=new UJ,this.matrixWorld=new UJ,this.matrixAutoUpdate=EJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=EJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new JQ,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return u9.setFromAxisAngle(J,$),this.quaternion.multiply(u9),this}rotateOnWorldAxis(J,$){return u9.setFromAxisAngle(J,$),this.quaternion.premultiply(u9),this}rotateX(J){return this.rotateOnAxis(a5,J)}rotateY(J){return this.rotateOnAxis(t5,J)}rotateZ(J){return this.rotateOnAxis(e5,J)}translateOnAxis(J,$){return r5.copy(J).applyQuaternion(this.quaternion),this.position.add(r5.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(a5,J)}translateY(J){return this.translateOnAxis(t5,J)}translateZ(J){return this.translateOnAxis(e5,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(v8.copy(this.matrixWorld).invert())}lookAt(J,$,Q){if(J.isVector3)L$.copy(J);else L$.set(J,$,Q);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),S7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)v8.lookAt(S7,L$,this.up);else v8.lookAt(L$,S7,this.up);if(this.quaternion.setFromRotationMatrix(v8),Z)v8.extractRotation(Z.matrixWorld),u9.setFromRotationMatrix(v8),this.quaternion.premultiply(u9.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D){if(J.parent!==null)J.parent.remove(J);J.parent=this,this.children.push(J),J.dispatchEvent(CX)}else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.remove(arguments[Q]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent(AX);return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),v8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),v8.multiply(J.parent.matrixWorld);return J.applyMatrix4(v8),this.add(J),J.updateWorldMatrix(!1,!0),this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Q=0,Z=this.children.length;Q<Z;Q++){let W=this.children[Q].getObjectByProperty(J,$);if(W!==void 0)return W}return}getObjectsByProperty(J,$,Q=[]){if(this[J]===$)Q.push(this);let Z=this.children;for(let K=0,W=Z.length;K<W;K++)Z[K].getObjectsByProperty(J,$,Q);return Q}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(S7,J,IX),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(S7,LX,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}traverse(J){J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++){let K=$[Q];if(K.matrixWorldAutoUpdate===!0||J===!0)K.updateMatrixWorld(J)}}updateWorldMatrix(J,$){let Q=this.parent;if(J===!0&&Q!==null&&Q.matrixWorldAutoUpdate===!0)Q.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if($===!0){let Z=this.children;for(let K=0,W=Z.length;K<W;K++){let Y=Z[K];if(Y.matrixWorldAutoUpdate===!0)Y.updateWorldMatrix(!1,!0)}}}toJSON(J){let $=J===void 0||typeof J==="string",Q={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Q.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.visibility=this._visibility,Z.active=this._active,Z.bounds=this._bounds.map((Y)=>({boxInitialized:Y.boxInitialized,boxMin:Y.box.min.toArray(),boxMax:Y.box.max.toArray(),sphereInitialized:Y.sphereInitialized,sphereRadius:Y.sphere.radius,sphereCenter:Y.sphere.center.toArray()})),Z.maxGeometryCount=this._maxGeometryCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.geometryCount=this._geometryCount,Z.matricesTexture=this._matricesTexture.toJSON(J),this.boundingSphere!==null)Z.boundingSphere={center:Z.boundingSphere.center.toArray(),radius:Z.boundingSphere.radius};if(this.boundingBox!==null)Z.boundingBox={min:Z.boundingBox.min.toArray(),max:Z.boundingBox.max.toArray()}}function K(Y,X){if(Y[X.uuid]===void 0)Y[X.uuid]=X.toJSON(J);return X.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let Y=this.geometry.parameters;if(Y!==void 0&&Y.shapes!==void 0){let X=Y.shapes;if(Array.isArray(X))for(let H=0,q=X.length;H<q;H++){let U=X[H];K(J.shapes,U)}else K(J.shapes,X)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let Y=[];for(let X=0,H=this.material.length;X<H;X++)Y.push(K(J.materials,this.material[X]));Z.material=Y}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let Y=0;Y<this.children.length;Y++)Z.children.push(this.children[Y].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let Y=0;Y<this.animations.length;Y++){let X=this.animations[Y];Z.animations.push(K(J.animations,X))}}if($){let Y=W(J.geometries),X=W(J.materials),H=W(J.textures),q=W(J.images),U=W(J.shapes),V=W(J.skeletons),F=W(J.animations),G=W(J.nodes);if(Y.length>0)Q.geometries=Y;if(X.length>0)Q.materials=X;if(H.length>0)Q.textures=H;if(q.length>0)Q.images=q;if(U.length>0)Q.shapes=U;if(V.length>0)Q.skeletons=V;if(F.length>0)Q.animations=F;if(G.length>0)Q.nodes=G}return Q.object=Z,Q;function W(Y){let X=[];for(let H in Y){let q=Y[H];delete q.metadata,X.push(q)}return X}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Q=0;Q<J.children.length;Q++){let Z=J.children[Q];this.add(Z.clone())}return this}}EJ.DEFAULT_UP=new T(0,1,0);EJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;EJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var z8=new T,g8=new T,pQ=new T,m8=new T,d9=new T,p9=new T,J6=new T,lQ=new T,cQ=new T,nQ=new T,C$=!1;class O8{constructor(J=new T,$=new T,Q=new T){this.a=J,this.b=$,this.c=Q}static getNormal(J,$,Q,Z){Z.subVectors(Q,$),z8.subVectors(J,$),Z.cross(z8);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,$,Q,Z,K){z8.subVectors(Z,$),g8.subVectors(Q,$),pQ.subVectors(J,$);let W=z8.dot(z8),Y=z8.dot(g8),X=z8.dot(pQ),H=g8.dot(g8),q=g8.dot(pQ),U=W*H-Y*Y;if(U===0)return K.set(0,0,0),null;let V=1/U,F=(H*X-Y*q)*V,G=(W*q-Y*X)*V;return K.set(1-F-G,G,F)}static containsPoint(J,$,Q,Z){if(this.getBarycoord(J,$,Q,Z,m8)===null)return!1;return m8.x>=0&&m8.y>=0&&m8.x+m8.y<=1}static getUV(J,$,Q,Z,K,W,Y,X){if(C$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),C$=!0;return this.getInterpolation(J,$,Q,Z,K,W,Y,X)}static getInterpolation(J,$,Q,Z,K,W,Y,X){if(this.getBarycoord(J,$,Q,Z,m8)===null){if(X.x=0,X.y=0,"z"in X)X.z=0;if("w"in X)X.w=0;return null}return X.setScalar(0),X.addScaledVector(K,m8.x),X.addScaledVector(W,m8.y),X.addScaledVector(Y,m8.z),X}static isFrontFacing(J,$,Q,Z){return z8.subVectors(Q,$),g8.subVectors(J,$),z8.cross(g8).dot(Z)<0?!0:!1}set(J,$,Q){return this.a.copy(J),this.b.copy($),this.c.copy(Q),this}setFromPointsAndIndices(J,$,Q,Z){return this.a.copy(J[$]),this.b.copy(J[Q]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,$,Q,Z){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Q),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return z8.subVectors(this.c,this.b),g8.subVectors(this.a,this.b),z8.cross(g8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return O8.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return O8.getBarycoord(J,this.a,this.b,this.c,$)}getUV(J,$,Q,Z,K){if(C$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),C$=!0;return O8.getInterpolation(J,this.a,this.b,this.c,$,Q,Z,K)}getInterpolation(J,$,Q,Z,K){return O8.getInterpolation(J,this.a,this.b,this.c,$,Q,Z,K)}containsPoint(J){return O8.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return O8.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Q=this.a,Z=this.b,K=this.c,W,Y;d9.subVectors(Z,Q),p9.subVectors(K,Q),lQ.subVectors(J,Q);let X=d9.dot(lQ),H=p9.dot(lQ);if(X<=0&&H<=0)return $.copy(Q);cQ.subVectors(J,Z);let q=d9.dot(cQ),U=p9.dot(cQ);if(q>=0&&U<=q)return $.copy(Z);let V=X*U-q*H;if(V<=0&&X>=0&&q<=0)return W=X/(X-q),$.copy(Q).addScaledVector(d9,W);nQ.subVectors(J,K);let F=d9.dot(nQ),G=p9.dot(nQ);if(G>=0&&F<=G)return $.copy(K);let N=F*H-X*G;if(N<=0&&H>=0&&G<=0)return Y=H/(H-G),$.copy(Q).addScaledVector(p9,Y);let E=q*G-F*U;if(E<=0&&U-q>=0&&F-G>=0)return J6.subVectors(K,Z),Y=(U-q)/(U-q+(F-G)),$.copy(Z).addScaledVector(J6,Y);let O=1/(E+N+V);return W=N*O,Y=V*O,$.copy(Q).addScaledVector(d9,W).addScaledVector(p9,Y)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}var r6={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},J9={h:0,s:0,l:0},A$={h:0,s:0,l:0};function sQ(J,$,Q){if(Q<0)Q+=1;if(Q>1)Q-=1;if(Q<0.16666666666666666)return J+($-J)*6*Q;if(Q<0.5)return $;if(Q<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Q);return J}class e0{constructor(J,$,Q){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Q)}set(J,$,Q){if($===void 0&&Q===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,$,Q);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,XJ.toWorkingColorSpace(this,$),this}setRGB(J,$,Q,Z=XJ.workingColorSpace){return this.r=J,this.g=$,this.b=Q,XJ.toWorkingColorSpace(this,Z),this}setHSL(J,$,Q,Z=XJ.workingColorSpace){if(J=NZ(J,1),$=hJ($,0,1),Q=hJ(Q,0,1),$===0)this.r=this.g=this.b=Q;else{let K=Q<=0.5?Q*(1+$):Q+$-Q*$,W=2*Q-K;this.r=sQ(W,K,J+0.3333333333333333),this.g=sQ(W,K,J),this.b=sQ(W,K,J-0.3333333333333333)}return XJ.toWorkingColorSpace(this,Z),this}setStyle(J,$="srgb"){function Q(K){if(K===void 0)return;if(parseFloat(K)<1)console.warn("THREE.Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,W=Z[1],Y=Z[2];switch(W){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Q(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,$);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Q(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,$);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return Q(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,$);break;default:console.warn("THREE.Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],W=K.length;if(W===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,$);else if(W===6)return this.setHex(parseInt(K,16),$);else console.warn("THREE.Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Q=r6[J.toLowerCase()];if(Q!==void 0)this.setHex(Q,$);else console.warn("THREE.Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=K7(J.r),this.g=K7(J.g),this.b=K7(J.b),this}copyLinearToSRGB(J){return this.r=bQ(J.r),this.g=bQ(J.g),this.b=bQ(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return XJ.fromWorkingColorSpace(pJ.copy(this),J),Math.round(hJ(pJ.r*255,0,255))*65536+Math.round(hJ(pJ.g*255,0,255))*256+Math.round(hJ(pJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=XJ.workingColorSpace){XJ.fromWorkingColorSpace(pJ.copy(this),$);let{r:Q,g:Z,b:K}=pJ,W=Math.max(Q,Z,K),Y=Math.min(Q,Z,K),X,H,q=(Y+W)/2;if(Y===W)X=0,H=0;else{let U=W-Y;switch(H=q<=0.5?U/(W+Y):U/(2-W-Y),W){case Q:X=(Z-K)/U+(Z<K?6:0);break;case Z:X=(K-Q)/U+2;break;case K:X=(Q-Z)/U+4;break}X/=6}return J.h=X,J.s=H,J.l=q,J}getRGB(J,$=XJ.workingColorSpace){return XJ.fromWorkingColorSpace(pJ.copy(this),$),J.r=pJ.r,J.g=pJ.g,J.b=pJ.b,J}getStyle(J="srgb"){XJ.fromWorkingColorSpace(pJ.copy(this),J);let{r:$,g:Q,b:Z}=pJ;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Q.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Q*255)},${Math.round(Z*255)})`}offsetHSL(J,$,Q){return this.getHSL(J9),this.setHSL(J9.h+J,J9.s+$,J9.l+Q)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Q){return this.r=J.r+($.r-J.r)*Q,this.g=J.g+($.g-J.g)*Q,this.b=J.b+($.b-J.b)*Q,this}lerpHSL(J,$){this.getHSL(J9),J.getHSL(A$);let Q=b7(J9.h,A$.h,$),Z=b7(J9.s,A$.s,$),K=b7(J9.l,A$.l,$);return this.setHSL(Q,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Q=this.g,Z=this.b,K=J.elements;return this.r=K[0]*$+K[3]*Q+K[6]*Z,this.g=K[1]*$+K[4]*Q+K[7]*Z,this.b=K[2]*$+K[5]*Q+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var pJ=new e0;e0.NAMES=r6;var MX=0;class d8 extends u8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:MX++}),this.uuid=P8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new e0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Q=J[$];if(Q===void 0){console.warn(`THREE.Material: parameter '${$}' has value of undefined.`);continue}let Z=this[$];if(Z===void 0){console.warn(`THREE.Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set(Q);else if(Z&&Z.isVector3&&(Q&&Q.isVector3))Z.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Q={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(Q.uuid=this.uuid,Q.type=this.type,this.name!=="")Q.name=this.name;if(this.color&&this.color.isColor)Q.color=this.color.getHex();if(this.roughness!==void 0)Q.roughness=this.roughness;if(this.metalness!==void 0)Q.metalness=this.metalness;if(this.sheen!==void 0)Q.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Q.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Q.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Q.emissive=this.emissive.getHex();if(this.emissiveIntensity&&this.emissiveIntensity!==1)Q.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Q.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Q.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Q.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Q.shininess=this.shininess;if(this.clearcoat!==void 0)Q.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Q.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Q.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Q.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Q.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Q.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.iridescence!==void 0)Q.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Q.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Q.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Q.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Q.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Q.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Q.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Q.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Q.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Q.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Q.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Q.lightMap=this.lightMap.toJSON(J).uuid,Q.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Q.aoMap=this.aoMap.toJSON(J).uuid,Q.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Q.bumpMap=this.bumpMap.toJSON(J).uuid,Q.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Q.normalMap=this.normalMap.toJSON(J).uuid,Q.normalMapType=this.normalMapType,Q.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Q.displacementMap=this.displacementMap.toJSON(J).uuid,Q.displacementScale=this.displacementScale,Q.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Q.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Q.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Q.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Q.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Q.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Q.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Q.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Q.combine=this.combine}if(this.envMapIntensity!==void 0)Q.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Q.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Q.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Q.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Q.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Q.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Q.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Q.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)Q.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Q.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Q.size=this.size;if(this.shadowSide!==null)Q.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)Q.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)Q.blending=this.blending;if(this.side!==0)Q.side=this.side;if(this.vertexColors===!0)Q.vertexColors=!0;if(this.opacity<1)Q.opacity=this.opacity;if(this.transparent===!0)Q.transparent=!0;if(this.blendSrc!==204)Q.blendSrc=this.blendSrc;if(this.blendDst!==205)Q.blendDst=this.blendDst;if(this.blendEquation!==100)Q.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)Q.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)Q.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)Q.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)Q.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)Q.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)Q.depthFunc=this.depthFunc;if(this.depthTest===!1)Q.depthTest=this.depthTest;if(this.depthWrite===!1)Q.depthWrite=this.depthWrite;if(this.colorWrite===!1)Q.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)Q.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)Q.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)Q.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)Q.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)Q.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)Q.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)Q.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)Q.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)Q.rotation=this.rotation;if(this.polygonOffset===!0)Q.polygonOffset=!0;if(this.polygonOffsetFactor!==0)Q.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)Q.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)Q.linewidth=this.linewidth;if(this.dashSize!==void 0)Q.dashSize=this.dashSize;if(this.gapSize!==void 0)Q.gapSize=this.gapSize;if(this.scale!==void 0)Q.scale=this.scale;if(this.dithering===!0)Q.dithering=!0;if(this.alphaTest>0)Q.alphaTest=this.alphaTest;if(this.alphaHash===!0)Q.alphaHash=!0;if(this.alphaToCoverage===!0)Q.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)Q.premultipliedAlpha=!0;if(this.forceSinglePass===!0)Q.forceSinglePass=!0;if(this.wireframe===!0)Q.wireframe=!0;if(this.wireframeLinewidth>1)Q.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")Q.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")Q.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)Q.flatShading=!0;if(this.visible===!1)Q.visible=!1;if(this.toneMapped===!1)Q.toneMapped=!1;if(this.fog===!1)Q.fog=!1;if(Object.keys(this.userData).length>0)Q.userData=this.userData;function Z(K){let W=[];for(let Y in K){let X=K[Y];delete X.metadata,W.push(X)}return W}if($){let K=Z(J.textures),W=Z(J.images);if(K.length>0)Q.textures=K;if(W.length>0)Q.images=W}return Q}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Q=null;if($!==null){let Z=$.length;Q=Array(Z);for(let K=0;K!==Z;++K)Q[K]=$[K].clone()}return this.clippingPlanes=Q,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class QJ extends d8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new e0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var _J=new T,M$=new H0;class vJ{constructor(J,$,Q=!1){if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Q,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Q){J*=this.itemSize,Q*=$.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Q=this.count;$<Q;$++)M$.fromBufferAttribute(this,$),M$.applyMatrix3(J),this.setXY($,M$.x,M$.y);else if(this.itemSize===3)for(let $=0,Q=this.count;$<Q;$++)_J.fromBufferAttribute(this,$),_J.applyMatrix3(J),this.setXYZ($,_J.x,_J.y,_J.z);return this}applyMatrix4(J){for(let $=0,Q=this.count;$<Q;$++)_J.fromBufferAttribute(this,$),_J.applyMatrix4(J),this.setXYZ($,_J.x,_J.y,_J.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)_J.fromBufferAttribute(this,$),_J.applyNormalMatrix(J),this.setXYZ($,_J.x,_J.y,_J.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)_J.fromBufferAttribute(this,$),_J.transformDirection(J),this.setXYZ($,_J.x,_J.y,_J.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Q=this.array[J*this.itemSize+$];if(this.normalized)Q=k8(Q,this.array);return Q}setComponent(J,$,Q){if(this.normalized)Q=KJ(Q,this.array);return this.array[J*this.itemSize+$]=Q,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=k8($,this.array);return $}setX(J,$){if(this.normalized)$=KJ($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=k8($,this.array);return $}setY(J,$){if(this.normalized)$=KJ($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=k8($,this.array);return $}setZ(J,$){if(this.normalized)$=KJ($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=k8($,this.array);return $}setW(J,$){if(this.normalized)$=KJ($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Q){if(J*=this.itemSize,this.normalized)$=KJ($,this.array),Q=KJ(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J*=this.itemSize,this.normalized)$=KJ($,this.array),Q=KJ(Q,this.array),Z=KJ(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J*=this.itemSize,this.normalized)$=KJ($,this.array),Q=KJ(Q,this.array),Z=KJ(Z,this.array),K=KJ(K,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}}class IZ extends vJ{constructor(J,$,Q){super(new Uint16Array(J),$,Q)}}class LZ extends vJ{constructor(J,$,Q){super(new Uint32Array(J),$,Q)}}class $J extends vJ{constructor(J,$,Q){super(new Float32Array(J),$,Q)}}var kX=0,G8=new UJ,iQ=new EJ,l9=new T,H8=new Y7,_7=new Y7,fJ=new T;class GJ extends u8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kX++}),this.uuid=P8(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((s6(J))?LZ:IZ)(J,1);else this.index=J;return this}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Q=0){this.groups.push({start:J,count:$,materialIndex:Q})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Q=this.attributes.normal;if(Q!==void 0){let K=new r0().getNormalMatrix(J);Q.applyNormalMatrix(K),Q.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return G8.makeRotationFromQuaternion(J),this.applyMatrix4(G8),this}rotateX(J){return G8.makeRotationX(J),this.applyMatrix4(G8),this}rotateY(J){return G8.makeRotationY(J),this.applyMatrix4(G8),this}rotateZ(J){return G8.makeRotationZ(J),this.applyMatrix4(G8),this}translate(J,$,Q){return G8.makeTranslation(J,$,Q),this.applyMatrix4(G8),this}scale(J,$,Q){return G8.makeScale(J,$,Q),this.applyMatrix4(G8),this}lookAt(J){return iQ.lookAt(J),iQ.updateMatrix(),this.applyMatrix4(iQ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(l9).negate(),this.translate(l9.x,l9.y,l9.z),this}setFromPoints(J){let $=[];for(let Q=0,Z=J.length;Q<Z;Q++){let K=J[Q];$.push(K.x,K.y,K.z||0)}return this.setAttribute("position",new $J($,3)),this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Y7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Q=0,Z=$.length;Q<Z;Q++){let K=$[Q];if(H8.setFromBufferAttribute(K),this.morphTargetsRelative)fJ.addVectors(this.boundingBox.min,H8.min),this.boundingBox.expandByPoint(fJ),fJ.addVectors(this.boundingBox.max,H8.max),this.boundingBox.expandByPoint(fJ);else this.boundingBox.expandByPoint(H8.min),this.boundingBox.expandByPoint(H8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new H7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(J){let Q=this.boundingSphere.center;if(H8.setFromBufferAttribute(J),$)for(let K=0,W=$.length;K<W;K++){let Y=$[K];if(_7.setFromBufferAttribute(Y),this.morphTargetsRelative)fJ.addVectors(H8.min,_7.min),H8.expandByPoint(fJ),fJ.addVectors(H8.max,_7.max),H8.expandByPoint(fJ);else H8.expandByPoint(_7.min),H8.expandByPoint(_7.max)}H8.getCenter(Q);let Z=0;for(let K=0,W=J.count;K<W;K++)fJ.fromBufferAttribute(J,K),Z=Math.max(Z,Q.distanceToSquared(fJ));if($)for(let K=0,W=$.length;K<W;K++){let Y=$[K],X=this.morphTargetsRelative;for(let H=0,q=Y.count;H<q;H++){if(fJ.fromBufferAttribute(Y,H),X)l9.fromBufferAttribute(J,H),fJ.add(l9);Z=Math.max(Z,Q.distanceToSquared(fJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let Q=J.array,Z=$.position.array,K=$.normal.array,W=$.uv.array,Y=Z.length/3;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new vJ(new Float32Array(4*Y),4));let X=this.getAttribute("tangent").array,H=[],q=[];for(let I=0;I<Y;I++)H[I]=new T,q[I]=new T;let U=new T,V=new T,F=new T,G=new H0,N=new H0,E=new H0,O=new T,D=new T;function R(I,k,b){U.fromArray(Z,I*3),V.fromArray(Z,k*3),F.fromArray(Z,b*3),G.fromArray(W,I*2),N.fromArray(W,k*2),E.fromArray(W,b*2),V.sub(U),F.sub(U),N.sub(G),E.sub(G);let n=1/(N.x*E.y-E.x*N.y);if(!isFinite(n))return;O.copy(V).multiplyScalar(E.y).addScaledVector(F,-N.y).multiplyScalar(n),D.copy(F).multiplyScalar(N.x).addScaledVector(V,-E.x).multiplyScalar(n),H[I].add(O),H[k].add(O),H[b].add(O),q[I].add(D),q[k].add(D),q[b].add(D)}let B=this.groups;if(B.length===0)B=[{start:0,count:Q.length}];for(let I=0,k=B.length;I<k;++I){let b=B[I],n=b.start,i=b.count;for(let y=n,h=n+i;y<h;y+=3)R(Q[y+0],Q[y+1],Q[y+2])}let z=new T,C=new T,L=new T,A=new T;function w(I){L.fromArray(K,I*3),A.copy(L);let k=H[I];z.copy(k),z.sub(L.multiplyScalar(L.dot(k))).normalize(),C.crossVectors(A,k);let n=C.dot(q[I])<0?-1:1;X[I*4]=z.x,X[I*4+1]=z.y,X[I*4+2]=z.z,X[I*4+3]=n}for(let I=0,k=B.length;I<k;++I){let b=B[I],n=b.start,i=b.count;for(let y=n,h=n+i;y<h;y+=3)w(Q[y+0]),w(Q[y+1]),w(Q[y+2])}}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Q=this.getAttribute("normal");if(Q===void 0)Q=new vJ(new Float32Array($.count*3),3),this.setAttribute("normal",Q);else for(let V=0,F=Q.count;V<F;V++)Q.setXYZ(V,0,0,0);let Z=new T,K=new T,W=new T,Y=new T,X=new T,H=new T,q=new T,U=new T;if(J)for(let V=0,F=J.count;V<F;V+=3){let G=J.getX(V+0),N=J.getX(V+1),E=J.getX(V+2);Z.fromBufferAttribute($,G),K.fromBufferAttribute($,N),W.fromBufferAttribute($,E),q.subVectors(W,K),U.subVectors(Z,K),q.cross(U),Y.fromBufferAttribute(Q,G),X.fromBufferAttribute(Q,N),H.fromBufferAttribute(Q,E),Y.add(q),X.add(q),H.add(q),Q.setXYZ(G,Y.x,Y.y,Y.z),Q.setXYZ(N,X.x,X.y,X.z),Q.setXYZ(E,H.x,H.y,H.z)}else for(let V=0,F=$.count;V<F;V+=3)Z.fromBufferAttribute($,V+0),K.fromBufferAttribute($,V+1),W.fromBufferAttribute($,V+2),q.subVectors(W,K),U.subVectors(Z,K),q.cross(U),Q.setXYZ(V+0,q.x,q.y,q.z),Q.setXYZ(V+1,q.x,q.y,q.z),Q.setXYZ(V+2,q.x,q.y,q.z);this.normalizeNormals(),Q.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Q=J.count;$<Q;$++)fJ.fromBufferAttribute(J,$),fJ.normalize(),J.setXYZ($,fJ.x,fJ.y,fJ.z)}toNonIndexed(){function J(Y,X){let{array:H,itemSize:q,normalized:U}=Y,V=new H.constructor(X.length*q),F=0,G=0;for(let N=0,E=X.length;N<E;N++){if(Y.isInterleavedBufferAttribute)F=X[N]*Y.data.stride+Y.offset;else F=X[N]*q;for(let O=0;O<q;O++)V[G++]=H[F++]}return new vJ(V,q,U)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new GJ,Q=this.index.array,Z=this.attributes;for(let Y in Z){let X=Z[Y],H=J(X,Q);$.setAttribute(Y,H)}let K=this.morphAttributes;for(let Y in K){let X=[],H=K[Y];for(let q=0,U=H.length;q<U;q++){let V=H[q],F=J(V,Q);X.push(F)}$.morphAttributes[Y]=X}$.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;for(let Y=0,X=W.length;Y<X;Y++){let H=W[Y];$.addGroup(H.start,H.count,H.materialIndex)}return $}toJSON(){let J={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let X=this.parameters;for(let H in X)if(X[H]!==void 0)J[H]=X[H];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Q=this.attributes;for(let X in Q){let H=Q[X];J.data.attributes[X]=H.toJSON(J.data)}let Z={},K=!1;for(let X in this.morphAttributes){let H=this.morphAttributes[X],q=[];for(let U=0,V=H.length;U<V;U++){let F=H[U];q.push(F.toJSON(J.data))}if(q.length>0)Z[X]=q,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;if(W.length>0)J.data.groups=JSON.parse(JSON.stringify(W));let Y=this.boundingSphere;if(Y!==null)J.data.boundingSphere={center:Y.center.toArray(),radius:Y.radius};return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Q=J.index;if(Q!==null)this.setIndex(Q.clone($));let Z=J.attributes;for(let H in Z){let q=Z[H];this.setAttribute(H,q.clone($))}let K=J.morphAttributes;for(let H in K){let q=[],U=K[H];for(let V=0,F=U.length;V<F;V++)q.push(U[V].clone($));this.morphAttributes[H]=q}this.morphTargetsRelative=J.morphTargetsRelative;let W=J.groups;for(let H=0,q=W.length;H<q;H++){let U=W[H];this.addGroup(U.start,U.count,U.materialIndex)}let Y=J.boundingBox;if(Y!==null)this.boundingBox=Y.clone();let X=J.boundingSphere;if(X!==null)this.boundingSphere=X.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var $6=new UJ,E9=new A9,k$=new H7,Q6=new T,c9=new T,n9=new T,s9=new T,oQ=new T,P$=new T,S$=new H0,_$=new H0,w$=new H0,Z6=new T,K6=new T,W6=new T,T$=new T,j$=new T;class S extends EJ{constructor(J=new GJ,$=new QJ){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let Y=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}getVertexPosition(J,$){let Q=this.geometry,Z=Q.attributes.position,K=Q.morphAttributes.position,W=Q.morphTargetsRelative;$.fromBufferAttribute(Z,J);let Y=this.morphTargetInfluences;if(K&&Y){P$.set(0,0,0);for(let X=0,H=K.length;X<H;X++){let q=Y[X],U=K[X];if(q===0)continue;if(oQ.fromBufferAttribute(U,J),W)P$.addScaledVector(oQ,q);else P$.addScaledVector(oQ.sub($),q)}$.add(P$)}return $}raycast(J,$){let Q=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(k$.copy(Q.boundingSphere),k$.applyMatrix4(K),E9.copy(J.ray).recast(J.near),k$.containsPoint(E9.origin)===!1){if(E9.intersectSphere(k$,Q6)===null)return;if(E9.origin.distanceToSquared(Q6)>(J.far-J.near)**2)return}if($6.copy(K).invert(),E9.copy(J.ray).applyMatrix4($6),Q.boundingBox!==null){if(E9.intersectsBox(Q.boundingBox)===!1)return}this._computeIntersections(J,$,E9)}_computeIntersections(J,$,Q){let Z,K=this.geometry,W=this.material,Y=K.index,X=K.attributes.position,H=K.attributes.uv,q=K.attributes.uv1,U=K.attributes.normal,V=K.groups,F=K.drawRange;if(Y!==null)if(Array.isArray(W))for(let G=0,N=V.length;G<N;G++){let E=V[G],O=W[E.materialIndex],D=Math.max(E.start,F.start),R=Math.min(Y.count,Math.min(E.start+E.count,F.start+F.count));for(let B=D,z=R;B<z;B+=3){let C=Y.getX(B),L=Y.getX(B+1),A=Y.getX(B+2);if(Z=y$(this,O,J,Q,H,q,U,C,L,A),Z)Z.faceIndex=Math.floor(B/3),Z.face.materialIndex=E.materialIndex,$.push(Z)}}else{let G=Math.max(0,F.start),N=Math.min(Y.count,F.start+F.count);for(let E=G,O=N;E<O;E+=3){let D=Y.getX(E),R=Y.getX(E+1),B=Y.getX(E+2);if(Z=y$(this,W,J,Q,H,q,U,D,R,B),Z)Z.faceIndex=Math.floor(E/3),$.push(Z)}}else if(X!==void 0)if(Array.isArray(W))for(let G=0,N=V.length;G<N;G++){let E=V[G],O=W[E.materialIndex],D=Math.max(E.start,F.start),R=Math.min(X.count,Math.min(E.start+E.count,F.start+F.count));for(let B=D,z=R;B<z;B+=3){let C=B,L=B+1,A=B+2;if(Z=y$(this,O,J,Q,H,q,U,C,L,A),Z)Z.faceIndex=Math.floor(B/3),Z.face.materialIndex=E.materialIndex,$.push(Z)}}else{let G=Math.max(0,F.start),N=Math.min(X.count,F.start+F.count);for(let E=G,O=N;E<O;E+=3){let D=E,R=E+1,B=E+2;if(Z=y$(this,W,J,Q,H,q,U,D,R,B),Z)Z.faceIndex=Math.floor(E/3),$.push(Z)}}}}function PX(J,$,Q,Z,K,W,Y,X){let H;if($.side===1)H=Z.intersectTriangle(Y,W,K,!0,X);else H=Z.intersectTriangle(K,W,Y,$.side===0,X);if(H===null)return null;j$.copy(X),j$.applyMatrix4(J.matrixWorld);let q=Q.ray.origin.distanceTo(j$);if(q<Q.near||q>Q.far)return null;return{distance:q,point:j$.clone(),object:J}}function y$(J,$,Q,Z,K,W,Y,X,H,q){J.getVertexPosition(X,c9),J.getVertexPosition(H,n9),J.getVertexPosition(q,s9);let U=PX(J,$,Q,Z,c9,n9,s9,T$);if(U){if(K)S$.fromBufferAttribute(K,X),_$.fromBufferAttribute(K,H),w$.fromBufferAttribute(K,q),U.uv=O8.getInterpolation(T$,c9,n9,s9,S$,_$,w$,new H0);if(W)S$.fromBufferAttribute(W,X),_$.fromBufferAttribute(W,H),w$.fromBufferAttribute(W,q),U.uv1=O8.getInterpolation(T$,c9,n9,s9,S$,_$,w$,new H0),U.uv2=U.uv1;if(Y){if(Z6.fromBufferAttribute(Y,X),K6.fromBufferAttribute(Y,H),W6.fromBufferAttribute(Y,q),U.normal=O8.getInterpolation(T$,c9,n9,s9,Z6,K6,W6,new T),U.normal.dot(Z.direction)>0)U.normal.multiplyScalar(-1)}let V={a:X,b:H,c:q,normal:new T,materialIndex:0};O8.getNormal(c9,n9,s9,V.normal),U.face=V}return U}class J0 extends GJ{constructor(J=1,$=1,Q=1,Z=1,K=1,W=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Q,widthSegments:Z,heightSegments:K,depthSegments:W};let Y=this;Z=Math.floor(Z),K=Math.floor(K),W=Math.floor(W);let X=[],H=[],q=[],U=[],V=0,F=0;G("z","y","x",-1,-1,Q,$,J,W,K,0),G("z","y","x",1,-1,Q,$,-J,W,K,1),G("x","z","y",1,1,J,Q,$,Z,W,2),G("x","z","y",1,-1,J,Q,-$,Z,W,3),G("x","y","z",1,-1,J,$,Q,Z,K,4),G("x","y","z",-1,-1,J,$,-Q,Z,K,5),this.setIndex(X),this.setAttribute("position",new $J(H,3)),this.setAttribute("normal",new $J(q,3)),this.setAttribute("uv",new $J(U,2));function G(N,E,O,D,R,B,z,C,L,A,w){let I=B/L,k=z/A,b=B/2,n=z/2,i=C/2,y=L+1,h=A+1,m=0,l=0,d=new T;for(let v=0;v<h;v++){let u=v*k-n;for(let r=0;r<y;r++){let g=r*I-b;d[N]=g*D,d[E]=u*R,d[O]=i,H.push(d.x,d.y,d.z),d[N]=0,d[E]=0,d[O]=C>0?1:-1,q.push(d.x,d.y,d.z),U.push(r/L),U.push(1-v/A),m+=1}}for(let v=0;v<A;v++)for(let u=0;u<L;u++){let r=V+u+y*v,g=V+u+y*(v+1),t=V+(u+1)+y*(v+1),Q0=V+(u+1)+y*v;X.push(r,g,Q0),X.push(g,t,Q0),l+=6}Y.addGroup(F,l,w),F+=l,V+=m}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new J0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}function X7(J){let $={};for(let Q in J){$[Q]={};for(let Z in J[Q]){let K=J[Q][Z];if(K&&(K.isColor||K.isMatrix3||K.isMatrix4||K.isVector2||K.isVector3||K.isVector4||K.isTexture||K.isQuaternion))if(K.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Q][Z]=null;else $[Q][Z]=K.clone();else if(Array.isArray(K))$[Q][Z]=K.slice();else $[Q][Z]=K}}return $}function oJ(J){let $={};for(let Q=0;Q<J.length;Q++){let Z=X7(J[Q]);for(let K in Z)$[K]=Z[K]}return $}function SX(J){let $=[];for(let Q=0;Q<J.length;Q++)$.push(J[Q].clone());return $}function a6(J){if(J.getRenderTarget()===null)return J.outputColorSpace;return XJ.workingColorSpace}var _X={clone:X7,merge:oJ},wX=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,TX=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Q9 extends d8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wX,this.fragmentShader=TX,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=X7(J.uniforms),this.uniformsGroups=SX(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let Z in this.uniforms){let W=this.uniforms[Z].value;if(W&&W.isTexture)$.uniforms[Z]={type:"t",value:W.toJSON(J).uuid};else if(W&&W.isColor)$.uniforms[Z]={type:"c",value:W.getHex()};else if(W&&W.isVector2)$.uniforms[Z]={type:"v2",value:W.toArray()};else if(W&&W.isVector3)$.uniforms[Z]={type:"v3",value:W.toArray()};else if(W&&W.isVector4)$.uniforms[Z]={type:"v4",value:W.toArray()};else if(W&&W.isMatrix3)$.uniforms[Z]={type:"m3",value:W.toArray()};else if(W&&W.isMatrix4)$.uniforms[Z]={type:"m4",value:W.toArray()};else $.uniforms[Z]={value:W}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Q={};for(let Z in this.extensions)if(this.extensions[Z]===!0)Q[Z]=!0;if(Object.keys(Q).length>0)$.extensions=Q;return $}}class CZ extends EJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new UJ,this.projectionMatrix=new UJ,this.projectionMatrixInverse=new UJ,this.coordinateSystem=2000}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){super.updateMatrixWorld(J),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(J,$){super.updateWorldMatrix(J,$),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class lJ extends CZ{constructor(J=50,$=1,Q=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Q,this.far=Z,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=W7*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(x7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return W7*2*Math.atan(Math.tan(x7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(J,$,Q,Z,K,W){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(x7*0.5*this.fov)/this.zoom,Q=2*$,Z=this.aspect*Q,K=-0.5*Z,W=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:X,fullHeight:H}=W;K+=W.offsetX*Z/X,$-=W.offsetY*Q/H,Z*=W.width/X,Q*=W.height/H}let Y=this.filmOffset;if(Y!==0)K+=J*Y/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,$,$-Q,J,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}var i9=-90,o9=1;class t6 extends EJ{constructor(J,$,Q){super();this.type="CubeCamera",this.renderTarget=Q,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new lJ(i9,o9,J,$);Z.layers=this.layers,this.add(Z);let K=new lJ(i9,o9,J,$);K.layers=this.layers,this.add(K);let W=new lJ(i9,o9,J,$);W.layers=this.layers,this.add(W);let Y=new lJ(i9,o9,J,$);Y.layers=this.layers,this.add(Y);let X=new lJ(i9,o9,J,$);X.layers=this.layers,this.add(X);let H=new lJ(i9,o9,J,$);H.layers=this.layers,this.add(H)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Q,Z,K,W,Y,X]=$;for(let H of $)this.remove(H);if(J===2000)Q.up.set(0,1,0),Q.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),W.up.set(0,0,1),W.lookAt(0,-1,0),Y.up.set(0,1,0),Y.lookAt(0,0,1),X.up.set(0,1,0),X.lookAt(0,0,-1);else if(J===2001)Q.up.set(0,-1,0),Q.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),W.up.set(0,0,-1),W.lookAt(0,-1,0),Y.up.set(0,-1,0),Y.lookAt(0,0,1),X.up.set(0,-1,0),X.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let H of $)this.add(H),H.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Q,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,W,Y,X,H,q]=this.children,U=J.getRenderTarget(),V=J.getActiveCubeFace(),F=J.getActiveMipmapLevel(),G=J.xr.enabled;J.xr.enabled=!1;let N=Q.texture.generateMipmaps;Q.texture.generateMipmaps=!1,J.setRenderTarget(Q,0,Z),J.render($,K),J.setRenderTarget(Q,1,Z),J.render($,W),J.setRenderTarget(Q,2,Z),J.render($,Y),J.setRenderTarget(Q,3,Z),J.render($,X),J.setRenderTarget(Q,4,Z),J.render($,H),Q.texture.generateMipmaps=N,J.setRenderTarget(Q,5,Z),J.render($,q),J.setRenderTarget(U,V,F),J.xr.enabled=G,Q.texture.needsPMREMUpdate=!0}}class AZ extends tJ{constructor(J,$,Q,Z,K,W,Y,X,H,q){J=J!==void 0?J:[],$=$!==void 0?$:301;super(J,$,Q,Z,K,W,Y,X,H,q);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class e6 extends $9{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Q={width:J,height:J,depth:1},Z=[Q,Q,Q,Q,Q,Q];if($.encoding!==void 0)f7("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),$.colorSpace=$.encoding===3001?"srgb":"";this.texture=new AZ(Z,$.mapping,$.wrapS,$.wrapT,$.magFilter,$.minFilter,$.format,$.type,$.anisotropy,$.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=$.generateMipmaps!==void 0?$.generateMipmaps:!1,this.texture.minFilter=$.minFilter!==void 0?$.minFilter:1006}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Q={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new J0(5,5,5),K=new Q9({name:"CubemapFromEquirect",uniforms:X7(Q.uniforms),vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader,side:1,blending:0});K.uniforms.tEquirect.value=$;let W=new S(Z,K),Y=$.minFilter;if($.minFilter===1008)$.minFilter=1006;return new t6(1,10,this).update(J,W),$.minFilter=Y,W.geometry.dispose(),W.material.dispose(),this}clear(J,$,Q,Z){let K=J.getRenderTarget();for(let W=0;W<6;W++)J.setRenderTarget(this,W),J.clear($,Q,Z);J.setRenderTarget(K)}}var rQ=new T,jX=new T,yX=new r0;class A8{constructor(J=new T(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Q,Z){return this.normal.set(J,$,Q),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Q){let Z=rQ.subVectors(Q,$).cross(jX.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$){let Q=J.delta(rQ),Z=this.normal.dot(Q);if(Z===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Z;if(K<0||K>1)return null;return $.copy(J.start).addScaledVector(Q,K)}intersectsLine(J){let $=this.distanceToPoint(J.start),Q=this.distanceToPoint(J.end);return $<0&&Q>0||Q<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Q=$||yX.getNormalMatrix(J),Z=this.coplanarPoint(rQ).applyMatrix4(J),K=this.normal.applyMatrix3(Q).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var N9=new H7,x$=new T;class $Q{constructor(J=new A8,$=new A8,Q=new A8,Z=new A8,K=new A8,W=new A8){this.planes=[J,$,Q,Z,K,W]}set(J,$,Q,Z,K,W){let Y=this.planes;return Y[0].copy(J),Y[1].copy($),Y[2].copy(Q),Y[3].copy(Z),Y[4].copy(K),Y[5].copy(W),this}copy(J){let $=this.planes;for(let Q=0;Q<6;Q++)$[Q].copy(J.planes[Q]);return this}setFromProjectionMatrix(J,$=2000){let Q=this.planes,Z=J.elements,K=Z[0],W=Z[1],Y=Z[2],X=Z[3],H=Z[4],q=Z[5],U=Z[6],V=Z[7],F=Z[8],G=Z[9],N=Z[10],E=Z[11],O=Z[12],D=Z[13],R=Z[14],B=Z[15];if(Q[0].setComponents(X-K,V-H,E-F,B-O).normalize(),Q[1].setComponents(X+K,V+H,E+F,B+O).normalize(),Q[2].setComponents(X+W,V+q,E+G,B+D).normalize(),Q[3].setComponents(X-W,V-q,E-G,B-D).normalize(),Q[4].setComponents(X-Y,V-U,E-N,B-R).normalize(),$===2000)Q[5].setComponents(X+Y,V+U,E+N,B+R).normalize();else if($===2001)Q[5].setComponents(Y,U,N,R).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();N9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();N9.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(N9)}intersectsSprite(J){return N9.center.set(0,0,0),N9.radius=0.7071067811865476,N9.applyMatrix4(J.matrixWorld),this.intersectsSphere(N9)}intersectsSphere(J){let $=this.planes,Q=J.center,Z=-J.radius;for(let K=0;K<6;K++)if($[K].distanceToPoint(Q)<Z)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Q=0;Q<6;Q++){let Z=$[Q];if(x$.x=Z.normal.x>0?J.max.x:J.min.x,x$.y=Z.normal.y>0?J.max.y:J.min.y,x$.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(x$)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Q=0;Q<6;Q++)if($[Q].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function JK(){let J=null,$=!1,Q=null,Z=null;function K(W,Y){Q(W,Y),Z=J.requestAnimationFrame(K)}return{start:function(){if($===!0)return;if(Q===null)return;Z=J.requestAnimationFrame(K),$=!0},stop:function(){J.cancelAnimationFrame(Z),$=!1},setAnimationLoop:function(W){Q=W},setContext:function(W){J=W}}}function xX(J,$){let Q=$.isWebGL2,Z=new WeakMap;function K(q,U){let{array:V,usage:F}=q,G=V.byteLength,N=J.createBuffer();J.bindBuffer(U,N),J.bufferData(U,V,F),q.onUploadCallback();let E;if(V instanceof Float32Array)E=J.FLOAT;else if(V instanceof Uint16Array)if(q.isFloat16BufferAttribute)if(Q)E=J.HALF_FLOAT;else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=J.UNSIGNED_SHORT;else if(V instanceof Int16Array)E=J.SHORT;else if(V instanceof Uint32Array)E=J.UNSIGNED_INT;else if(V instanceof Int32Array)E=J.INT;else if(V instanceof Int8Array)E=J.BYTE;else if(V instanceof Uint8Array)E=J.UNSIGNED_BYTE;else if(V instanceof Uint8ClampedArray)E=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+V);return{buffer:N,type:E,bytesPerElement:V.BYTES_PER_ELEMENT,version:q.version,size:G}}function W(q,U,V){let{array:F,_updateRange:G,updateRanges:N}=U;if(J.bindBuffer(V,q),G.count===-1&&N.length===0)J.bufferSubData(V,0,F);if(N.length!==0){for(let E=0,O=N.length;E<O;E++){let D=N[E];if(Q)J.bufferSubData(V,D.start*F.BYTES_PER_ELEMENT,F,D.start,D.count);else J.bufferSubData(V,D.start*F.BYTES_PER_ELEMENT,F.subarray(D.start,D.start+D.count))}U.clearUpdateRanges()}if(G.count!==-1){if(Q)J.bufferSubData(V,G.offset*F.BYTES_PER_ELEMENT,F,G.offset,G.count);else J.bufferSubData(V,G.offset*F.BYTES_PER_ELEMENT,F.subarray(G.offset,G.offset+G.count));G.count=-1}U.onUploadCallback()}function Y(q){if(q.isInterleavedBufferAttribute)q=q.data;return Z.get(q)}function X(q){if(q.isInterleavedBufferAttribute)q=q.data;let U=Z.get(q);if(U)J.deleteBuffer(U.buffer),Z.delete(q)}function H(q,U){if(q.isGLBufferAttribute){let F=Z.get(q);if(!F||F.version<q.version)Z.set(q,{buffer:q.buffer,type:q.type,bytesPerElement:q.elementSize,version:q.version});return}if(q.isInterleavedBufferAttribute)q=q.data;let V=Z.get(q);if(V===void 0)Z.set(q,K(q,U));else if(V.version<q.version){if(V.size!==q.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(V.buffer,q,U),V.version=q.version}}return{get:Y,remove:X,update:H}}class eJ extends GJ{constructor(J=1,$=1,Q=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Q,heightSegments:Z};let K=J/2,W=$/2,Y=Math.floor(Q),X=Math.floor(Z),H=Y+1,q=X+1,U=J/Y,V=$/X,F=[],G=[],N=[],E=[];for(let O=0;O<q;O++){let D=O*V-W;for(let R=0;R<H;R++){let B=R*U-K;G.push(B,-D,0),N.push(0,0,1),E.push(R/Y),E.push(1-O/X)}}for(let O=0;O<X;O++)for(let D=0;D<Y;D++){let R=D+H*O,B=D+H*(O+1),z=D+1+H*(O+1),C=D+1+H*O;F.push(R,B,C),F.push(B,z,C)}this.setIndex(F),this.setAttribute("position",new $J(G,3)),this.setAttribute("normal",new $J(N,3)),this.setAttribute("uv",new $J(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new eJ(J.width,J.height,J.widthSegments,J.heightSegments)}}var bX=`#ifdef USE_ALPHAHASH
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
#endif`,QY=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ZY=`#if defined( USE_COLOR_ALPHA )
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
#endif`,_Y=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wY=`varying vec3 vViewPosition;
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
#endif`,Q1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Z1=`#ifdef USE_NORMALMAP
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
#endif`,_1=`#ifdef USE_TRANSMISSION
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
#endif`,w1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
}`,QH=`#define PHONG
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
}`,ZH=`#define PHONG
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
}`,s0={alphahash_fragment:bX,alphahash_pars_fragment:fX,alphamap_fragment:hX,alphamap_pars_fragment:vX,alphatest_fragment:gX,alphatest_pars_fragment:mX,aomap_fragment:uX,aomap_pars_fragment:dX,batching_pars_vertex:pX,batching_vertex:lX,begin_vertex:cX,beginnormal_vertex:nX,bsdfs:sX,iridescence_fragment:iX,bumpmap_pars_fragment:oX,clipping_planes_fragment:rX,clipping_planes_pars_fragment:aX,clipping_planes_pars_vertex:tX,clipping_planes_vertex:eX,color_fragment:JY,color_pars_fragment:$Y,color_pars_vertex:QY,color_vertex:ZY,common:KY,cube_uv_reflection_fragment:WY,defaultnormal_vertex:XY,displacementmap_pars_vertex:YY,displacementmap_vertex:HY,emissivemap_fragment:qY,emissivemap_pars_fragment:UY,colorspace_fragment:FY,colorspace_pars_fragment:VY,envmap_fragment:GY,envmap_common_pars_fragment:OY,envmap_pars_fragment:DY,envmap_pars_vertex:EY,envmap_physical_pars_fragment:SY,envmap_vertex:NY,fog_vertex:RY,fog_pars_vertex:BY,fog_fragment:zY,fog_pars_fragment:IY,gradientmap_pars_fragment:LY,lightmap_fragment:CY,lightmap_pars_fragment:AY,lights_lambert_fragment:MY,lights_lambert_pars_fragment:kY,lights_pars_begin:PY,lights_toon_fragment:_Y,lights_toon_pars_fragment:wY,lights_phong_fragment:TY,lights_phong_pars_fragment:jY,lights_physical_fragment:yY,lights_physical_pars_fragment:xY,lights_fragment_begin:bY,lights_fragment_maps:fY,lights_fragment_end:hY,logdepthbuf_fragment:vY,logdepthbuf_pars_fragment:gY,logdepthbuf_pars_vertex:mY,logdepthbuf_vertex:uY,map_fragment:dY,map_pars_fragment:pY,map_particle_fragment:lY,map_particle_pars_fragment:cY,metalnessmap_fragment:nY,metalnessmap_pars_fragment:sY,morphcolor_vertex:iY,morphnormal_vertex:oY,morphtarget_pars_vertex:rY,morphtarget_vertex:aY,normal_fragment_begin:tY,normal_fragment_maps:eY,normal_pars_fragment:J1,normal_pars_vertex:$1,normal_vertex:Q1,normalmap_pars_fragment:Z1,clearcoat_normal_fragment_begin:K1,clearcoat_normal_fragment_maps:W1,clearcoat_pars_fragment:X1,iridescence_pars_fragment:Y1,opaque_fragment:H1,packing:q1,premultiplied_alpha_fragment:U1,project_vertex:F1,dithering_fragment:V1,dithering_pars_fragment:G1,roughnessmap_fragment:O1,roughnessmap_pars_fragment:D1,shadowmap_pars_fragment:E1,shadowmap_pars_vertex:N1,shadowmap_vertex:R1,shadowmask_pars_fragment:B1,skinbase_vertex:z1,skinning_pars_vertex:I1,skinning_vertex:L1,skinnormal_vertex:C1,specularmap_fragment:A1,specularmap_pars_fragment:M1,tonemapping_fragment:k1,tonemapping_pars_fragment:P1,transmission_fragment:S1,transmission_pars_fragment:_1,uv_pars_fragment:w1,uv_pars_vertex:T1,uv_vertex:j1,worldpos_vertex:y1,background_vert:x1,background_frag:b1,backgroundCube_vert:f1,backgroundCube_frag:h1,cube_vert:v1,cube_frag:g1,depth_vert:m1,depth_frag:u1,distanceRGBA_vert:d1,distanceRGBA_frag:p1,equirect_vert:l1,equirect_frag:c1,linedashed_vert:n1,linedashed_frag:s1,meshbasic_vert:i1,meshbasic_frag:o1,meshlambert_vert:r1,meshlambert_frag:a1,meshmatcap_vert:t1,meshmatcap_frag:e1,meshnormal_vert:JH,meshnormal_frag:$H,meshphong_vert:QH,meshphong_frag:ZH,meshphysical_vert:KH,meshphysical_frag:WH,meshtoon_vert:XH,meshtoon_frag:YH,points_vert:HH,points_frag:qH,shadow_vert:UH,shadow_frag:FH,sprite_vert:VH,sprite_frag:GH},B0={common:{diffuse:{value:new e0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new r0},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new r0}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new r0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new r0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new r0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new r0},normalScale:{value:new H0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new r0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new r0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new r0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new r0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new e0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new e0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0},uvTransform:{value:new r0}},sprite:{diffuse:{value:new e0(16777215)},opacity:{value:1},center:{value:new H0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new r0},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0}}},M8={basic:{uniforms:oJ([B0.common,B0.specularmap,B0.envmap,B0.aomap,B0.lightmap,B0.fog]),vertexShader:s0.meshbasic_vert,fragmentShader:s0.meshbasic_frag},lambert:{uniforms:oJ([B0.common,B0.specularmap,B0.envmap,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.fog,B0.lights,{emissive:{value:new e0(0)}}]),vertexShader:s0.meshlambert_vert,fragmentShader:s0.meshlambert_frag},phong:{uniforms:oJ([B0.common,B0.specularmap,B0.envmap,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.fog,B0.lights,{emissive:{value:new e0(0)},specular:{value:new e0(1118481)},shininess:{value:30}}]),vertexShader:s0.meshphong_vert,fragmentShader:s0.meshphong_frag},standard:{uniforms:oJ([B0.common,B0.envmap,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.roughnessmap,B0.metalnessmap,B0.fog,B0.lights,{emissive:{value:new e0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:s0.meshphysical_vert,fragmentShader:s0.meshphysical_frag},toon:{uniforms:oJ([B0.common,B0.aomap,B0.lightmap,B0.emissivemap,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.gradientmap,B0.fog,B0.lights,{emissive:{value:new e0(0)}}]),vertexShader:s0.meshtoon_vert,fragmentShader:s0.meshtoon_frag},matcap:{uniforms:oJ([B0.common,B0.bumpmap,B0.normalmap,B0.displacementmap,B0.fog,{matcap:{value:null}}]),vertexShader:s0.meshmatcap_vert,fragmentShader:s0.meshmatcap_frag},points:{uniforms:oJ([B0.points,B0.fog]),vertexShader:s0.points_vert,fragmentShader:s0.points_frag},dashed:{uniforms:oJ([B0.common,B0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:s0.linedashed_vert,fragmentShader:s0.linedashed_frag},depth:{uniforms:oJ([B0.common,B0.displacementmap]),vertexShader:s0.depth_vert,fragmentShader:s0.depth_frag},normal:{uniforms:oJ([B0.common,B0.bumpmap,B0.normalmap,B0.displacementmap,{opacity:{value:1}}]),vertexShader:s0.meshnormal_vert,fragmentShader:s0.meshnormal_frag},sprite:{uniforms:oJ([B0.sprite,B0.fog]),vertexShader:s0.sprite_vert,fragmentShader:s0.sprite_frag},background:{uniforms:{uvTransform:{value:new r0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:s0.background_vert,fragmentShader:s0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:s0.backgroundCube_vert,fragmentShader:s0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:s0.cube_vert,fragmentShader:s0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:s0.equirect_vert,fragmentShader:s0.equirect_frag},distanceRGBA:{uniforms:oJ([B0.common,B0.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:s0.distanceRGBA_vert,fragmentShader:s0.distanceRGBA_frag},shadow:{uniforms:oJ([B0.lights,B0.fog,{color:{value:new e0(0)},opacity:{value:1}}]),vertexShader:s0.shadow_vert,fragmentShader:s0.shadow_frag}};M8.physical={uniforms:oJ([M8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new r0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new r0},clearcoatNormalScale:{value:new H0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new r0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new r0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new r0},sheen:{value:0},sheenColor:{value:new e0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new r0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new r0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new r0},transmissionSamplerSize:{value:new H0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new r0},attenuationDistance:{value:0},attenuationColor:{value:new e0(0)},specularColor:{value:new e0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new r0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new r0},anisotropyVector:{value:new H0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new r0}}]),vertexShader:s0.meshphysical_vert,fragmentShader:s0.meshphysical_frag};var b$={r:0,b:0,g:0};function OH(J,$,Q,Z,K,W,Y){let X=new e0(0),H=W===!0?0:1,q,U,V=null,F=0,G=null;function N(O,D){let R=!1,B=D.isScene===!0?D.background:null;if(B&&B.isTexture)B=(D.backgroundBlurriness>0?Q:$).get(B);if(B===null)E(X,H);else if(B&&B.isColor)E(B,1),R=!0;let z=J.xr.getEnvironmentBlendMode();if(z==="additive")Z.buffers.color.setClear(0,0,0,1,Y);else if(z==="alpha-blend")Z.buffers.color.setClear(0,0,0,0,Y);if(J.autoClear||R)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(B&&(B.isCubeTexture||B.mapping===306)){if(U===void 0)U=new S(new J0(1,1,1),new Q9({name:"BackgroundCubeMaterial",uniforms:X7(M8.backgroundCube.uniforms),vertexShader:M8.backgroundCube.vertexShader,fragmentShader:M8.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(C,L,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),K.update(U);if(U.material.uniforms.envMap.value=B,U.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,U.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,U.material.toneMapped=XJ.getTransfer(B.colorSpace)!=="srgb",V!==B||F!==B.version||G!==J.toneMapping)U.material.needsUpdate=!0,V=B,F=B.version,G=J.toneMapping;U.layers.enableAll(),O.unshift(U,U.geometry,U.material,0,0,null)}else if(B&&B.isTexture){if(q===void 0)q=new S(new eJ(2,2),new Q9({name:"BackgroundMaterial",uniforms:X7(M8.background.uniforms),vertexShader:M8.background.vertexShader,fragmentShader:M8.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),q.geometry.deleteAttribute("normal"),Object.defineProperty(q.material,"map",{get:function(){return this.uniforms.t2D.value}}),K.update(q);if(q.material.uniforms.t2D.value=B,q.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,q.material.toneMapped=XJ.getTransfer(B.colorSpace)!=="srgb",B.matrixAutoUpdate===!0)B.updateMatrix();if(q.material.uniforms.uvTransform.value.copy(B.matrix),V!==B||F!==B.version||G!==J.toneMapping)q.material.needsUpdate=!0,V=B,F=B.version,G=J.toneMapping;q.layers.enableAll(),O.unshift(q,q.geometry,q.material,0,0,null)}}function E(O,D){O.getRGB(b$,a6(J)),Z.buffers.color.setClear(b$.r,b$.g,b$.b,D,Y)}return{getClearColor:function(){return X},setClearColor:function(O,D=1){X.set(O),H=D,E(X,H)},getClearAlpha:function(){return H},setClearAlpha:function(O){H=O,E(X,H)},render:N}}function DH(J,$,Q,Z){let K=J.getParameter(J.MAX_VERTEX_ATTRIBS),W=Z.isWebGL2?null:$.get("OES_vertex_array_object"),Y=Z.isWebGL2||W!==null,X={},H=O(null),q=H,U=!1;function V(y,h,m,l,d){let v=!1;if(Y){let u=E(l,m,h);if(q!==u)q=u,G(q.object);if(v=D(y,l,m,d),v)R(y,l,m,d)}else{let u=h.wireframe===!0;if(q.geometry!==l.id||q.program!==m.id||q.wireframe!==u)q.geometry=l.id,q.program=m.id,q.wireframe=u,v=!0}if(d!==null)Q.update(d,J.ELEMENT_ARRAY_BUFFER);if(v||U){if(U=!1,w(y,h,m,l),d!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(d).buffer)}}function F(){if(Z.isWebGL2)return J.createVertexArray();return W.createVertexArrayOES()}function G(y){if(Z.isWebGL2)return J.bindVertexArray(y);return W.bindVertexArrayOES(y)}function N(y){if(Z.isWebGL2)return J.deleteVertexArray(y);return W.deleteVertexArrayOES(y)}function E(y,h,m){let l=m.wireframe===!0,d=X[y.id];if(d===void 0)d={},X[y.id]=d;let v=d[h.id];if(v===void 0)v={},d[h.id]=v;let u=v[l];if(u===void 0)u=O(F()),v[l]=u;return u}function O(y){let h=[],m=[],l=[];for(let d=0;d<K;d++)h[d]=0,m[d]=0,l[d]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:h,enabledAttributes:m,attributeDivisors:l,object:y,attributes:{},index:null}}function D(y,h,m,l){let d=q.attributes,v=h.attributes,u=0,r=m.getAttributes();for(let g in r)if(r[g].location>=0){let Q0=d[g],F0=v[g];if(F0===void 0){if(g==="instanceMatrix"&&y.instanceMatrix)F0=y.instanceMatrix;if(g==="instanceColor"&&y.instanceColor)F0=y.instanceColor}if(Q0===void 0)return!0;if(Q0.attribute!==F0)return!0;if(F0&&Q0.data!==F0.data)return!0;u++}if(q.attributesNum!==u)return!0;if(q.index!==l)return!0;return!1}function R(y,h,m,l){let d={},v=h.attributes,u=0,r=m.getAttributes();for(let g in r)if(r[g].location>=0){let Q0=v[g];if(Q0===void 0){if(g==="instanceMatrix"&&y.instanceMatrix)Q0=y.instanceMatrix;if(g==="instanceColor"&&y.instanceColor)Q0=y.instanceColor}let F0={};if(F0.attribute=Q0,Q0&&Q0.data)F0.data=Q0.data;d[g]=F0,u++}q.attributes=d,q.attributesNum=u,q.index=l}function B(){let y=q.newAttributes;for(let h=0,m=y.length;h<m;h++)y[h]=0}function z(y){C(y,0)}function C(y,h){let{newAttributes:m,enabledAttributes:l,attributeDivisors:d}=q;if(m[y]=1,l[y]===0)J.enableVertexAttribArray(y),l[y]=1;if(d[y]!==h)(Z.isWebGL2?J:$.get("ANGLE_instanced_arrays"))[Z.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](y,h),d[y]=h}function L(){let{newAttributes:y,enabledAttributes:h}=q;for(let m=0,l=h.length;m<l;m++)if(h[m]!==y[m])J.disableVertexAttribArray(m),h[m]=0}function A(y,h,m,l,d,v,u){if(u===!0)J.vertexAttribIPointer(y,h,m,d,v);else J.vertexAttribPointer(y,h,m,l,d,v)}function w(y,h,m,l){if(Z.isWebGL2===!1&&(y.isInstancedMesh||l.isInstancedBufferGeometry)){if($.get("ANGLE_instanced_arrays")===null)return}B();let d=l.attributes,v=m.getAttributes(),u=h.defaultAttributeValues;for(let r in v){let g=v[r];if(g.location>=0){let t=d[r];if(t===void 0){if(r==="instanceMatrix"&&y.instanceMatrix)t=y.instanceMatrix;if(r==="instanceColor"&&y.instanceColor)t=y.instanceColor}if(t!==void 0){let{normalized:Q0,itemSize:F0}=t,R0=Q.get(t);if(R0===void 0)continue;let{buffer:x0,type:u0,bytesPerElement:w0}=R0,f0=Z.isWebGL2===!0&&(u0===J.INT||u0===J.UNSIGNED_INT||t.gpuType===1013);if(t.isInterleavedBufferAttribute){let x=t.data,D0=x.stride,X0=t.offset;if(x.isInstancedInterleavedBuffer){for(let W0=0;W0<g.locationSize;W0++)C(g.location+W0,x.meshPerAttribute);if(y.isInstancedMesh!==!0&&l._maxInstanceCount===void 0)l._maxInstanceCount=x.meshPerAttribute*x.count}else for(let W0=0;W0<g.locationSize;W0++)z(g.location+W0);J.bindBuffer(J.ARRAY_BUFFER,x0);for(let W0=0;W0<g.locationSize;W0++)A(g.location+W0,F0/g.locationSize,u0,Q0,D0*w0,(X0+F0/g.locationSize*W0)*w0,f0)}else{if(t.isInstancedBufferAttribute){for(let x=0;x<g.locationSize;x++)C(g.location+x,t.meshPerAttribute);if(y.isInstancedMesh!==!0&&l._maxInstanceCount===void 0)l._maxInstanceCount=t.meshPerAttribute*t.count}else for(let x=0;x<g.locationSize;x++)z(g.location+x);J.bindBuffer(J.ARRAY_BUFFER,x0);for(let x=0;x<g.locationSize;x++)A(g.location+x,F0/g.locationSize,u0,Q0,F0*w0,F0/g.locationSize*x*w0,f0)}}else if(u!==void 0){let Q0=u[r];if(Q0!==void 0)switch(Q0.length){case 2:J.vertexAttrib2fv(g.location,Q0);break;case 3:J.vertexAttrib3fv(g.location,Q0);break;case 4:J.vertexAttrib4fv(g.location,Q0);break;default:J.vertexAttrib1fv(g.location,Q0)}}}}L()}function I(){n();for(let y in X){let h=X[y];for(let m in h){let l=h[m];for(let d in l)N(l[d].object),delete l[d];delete h[m]}delete X[y]}}function k(y){if(X[y.id]===void 0)return;let h=X[y.id];for(let m in h){let l=h[m];for(let d in l)N(l[d].object),delete l[d];delete h[m]}delete X[y.id]}function b(y){for(let h in X){let m=X[h];if(m[y.id]===void 0)continue;let l=m[y.id];for(let d in l)N(l[d].object),delete l[d];delete m[y.id]}}function n(){if(i(),U=!0,q===H)return;q=H,G(q.object)}function i(){H.geometry=null,H.program=null,H.wireframe=!1}return{setup:V,reset:n,resetDefaultState:i,dispose:I,releaseStatesOfGeometry:k,releaseStatesOfProgram:b,initAttributes:B,enableAttribute:z,disableUnusedAttributes:L}}function EH(J,$,Q,Z){let K=Z.isWebGL2,W;function Y(U){W=U}function X(U,V){J.drawArrays(W,U,V),Q.update(V,W,1)}function H(U,V,F){if(F===0)return;let G,N;if(K)G=J,N="drawArraysInstanced";else if(G=$.get("ANGLE_instanced_arrays"),N="drawArraysInstancedANGLE",G===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}G[N](W,U,V,F),Q.update(V,W,F)}function q(U,V,F){if(F===0)return;let G=$.get("WEBGL_multi_draw");if(G===null)for(let N=0;N<F;N++)this.render(U[N],V[N]);else{G.multiDrawArraysWEBGL(W,U,0,V,0,F);let N=0;for(let E=0;E<F;E++)N+=V[E];Q.update(N,W,1)}}this.setMode=Y,this.render=X,this.renderInstances=H,this.renderMultiDraw=q}function NH(J,$,Q){let Z;function K(){if(Z!==void 0)return Z;if($.has("EXT_texture_filter_anisotropic")===!0){let A=$.get("EXT_texture_filter_anisotropic");Z=J.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Z=0;return Z}function W(A){if(A==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let Y=typeof WebGL2RenderingContext<"u"&&J.constructor.name==="WebGL2RenderingContext",X=Q.precision!==void 0?Q.precision:"highp",H=W(X);if(H!==X)console.warn("THREE.WebGLRenderer:",X,"not supported, using",H,"instead."),X=H;let q=Y||$.has("WEBGL_draw_buffers"),U=Q.logarithmicDepthBuffer===!0,V=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),F=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),G=J.getParameter(J.MAX_TEXTURE_SIZE),N=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),O=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),D=J.getParameter(J.MAX_VARYING_VECTORS),R=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),B=F>0,z=Y||$.has("OES_texture_float"),C=B&&z,L=Y?J.getParameter(J.MAX_SAMPLES):0;return{isWebGL2:Y,drawBuffers:q,getMaxAnisotropy:K,getMaxPrecision:W,precision:X,logarithmicDepthBuffer:U,maxTextures:V,maxVertexTextures:F,maxTextureSize:G,maxCubemapSize:N,maxAttributes:E,maxVertexUniforms:O,maxVaryings:D,maxFragmentUniforms:R,vertexTextures:B,floatFragmentTextures:z,floatVertexTextures:C,maxSamples:L}}function RH(J){let $=this,Q=null,Z=0,K=!1,W=!1,Y=new A8,X=new r0,H={value:null,needsUpdate:!1};this.uniform=H,this.numPlanes=0,this.numIntersection=0,this.init=function(V,F){let G=V.length!==0||F||Z!==0||K;return K=F,Z=V.length,G},this.beginShadows=function(){W=!0,U(null)},this.endShadows=function(){W=!1},this.setGlobalState=function(V,F){Q=U(V,F,0)},this.setState=function(V,F,G){let{clippingPlanes:N,clipIntersection:E,clipShadows:O}=V,D=J.get(V);if(!K||N===null||N.length===0||W&&!O)if(W)U(null);else q();else{let R=W?0:Z,B=R*4,z=D.clippingState||null;H.value=z,z=U(N,F,B,G);for(let C=0;C!==B;++C)z[C]=Q[C];D.clippingState=z,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=R}};function q(){if(H.value!==Q)H.value=Q,H.needsUpdate=Z>0;$.numPlanes=Z,$.numIntersection=0}function U(V,F,G,N){let E=V!==null?V.length:0,O=null;if(E!==0){if(O=H.value,N!==!0||O===null){let D=G+E*4,R=F.matrixWorldInverse;if(X.getNormalMatrix(R),O===null||O.length<D)O=new Float32Array(D);for(let B=0,z=G;B!==E;++B,z+=4)Y.copy(V[B]).applyMatrix4(R,X),Y.normal.toArray(O,z),O[z+3]=Y.constant}H.value=O,H.needsUpdate=!0}return $.numPlanes=E,$.numIntersection=0,O}}function BH(J){let $=new WeakMap;function Q(Y,X){if(X===303)Y.mapping=301;else if(X===304)Y.mapping=302;return Y}function Z(Y){if(Y&&Y.isTexture){let X=Y.mapping;if(X===303||X===304)if($.has(Y)){let H=$.get(Y).texture;return Q(H,Y.mapping)}else{let H=Y.image;if(H&&H.height>0){let q=new e6(H.height/2);return q.fromEquirectangularTexture(J,Y),$.set(Y,q),Y.addEventListener("dispose",K),Q(q.texture,Y.mapping)}else return null}}return Y}function K(Y){let X=Y.target;X.removeEventListener("dispose",K);let H=$.get(X);if(H!==void 0)$.delete(X),H.dispose()}function W(){$=new WeakMap}return{get:Z,dispose:W}}class MZ extends CZ{constructor(J=-1,$=1,Q=1,Z=-1,K=0.1,W=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Q,this.bottom=Z,this.near=K,this.far=W,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Q,Z,K,W){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Q=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=Q-J,W=Q+J,Y=Z+$,X=Z-$;if(this.view!==null&&this.view.enabled){let H=(this.right-this.left)/this.view.fullWidth/this.zoom,q=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=H*this.view.offsetX,W=K+H*this.view.width,Y-=q*this.view.offsetY,X=Y-q*this.view.height}this.projectionMatrix.makeOrthographic(K,W,Y,X,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}var $7=4,X6=[0.125,0.215,0.35,0.446,0.526,0.582],B9=20,aQ=new MZ,Y6=new e0,tQ=null,eQ=0,JZ=0,R9=(1+Math.sqrt(5))/2,r9=1/R9,H6=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,R9,r9),new T(0,R9,-r9),new T(r9,0,R9),new T(-r9,0,R9),new T(R9,r9,0),new T(-R9,r9,0)];class UZ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(J,$=0,Q=0.1,Z=100){tQ=this._renderer.getRenderTarget(),eQ=this._renderer.getActiveCubeFace(),JZ=this._renderer.getActiveMipmapLevel(),this._setSize(256);let K=this._allocateTargets();if(K.depthBuffer=!0,this._sceneToCubeUV(J,Q,Z,K),$>0)this._blur(K,0,0,$);return this._applyPMREM(K),this._cleanup(K),K}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=F6(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=U6(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodPlanes.length;J++)this._lodPlanes[J].dispose()}_cleanup(J){this._renderer.setRenderTarget(tQ,eQ,JZ),J.scissorTest=!1,f$(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===301||J.mapping===302)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);tQ=this._renderer.getRenderTarget(),eQ=this._renderer.getActiveCubeFace(),JZ=this._renderer.getActiveMipmapLevel();let Q=$||this._allocateTargets();return this._textureToCubeUV(J,Q),this._applyPMREM(Q),this._cleanup(Q),Q}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Q={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:"srgb-linear",depthBuffer:!1},Z=q6(J,$,Q);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=q6(J,$,Q);let{_lodMax:K}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zH(K)),this._blurMaterial=IH(K,J,$)}return Z}_compileMaterial(J){let $=new S(this._lodPlanes[0],J);this._renderer.compile($,aQ)}_sceneToCubeUV(J,$,Q,Z){let Y=new lJ(90,1,$,Q),X=[1,-1,1,1,1,1],H=[1,1,1,-1,-1,-1],q=this._renderer,U=q.autoClear,V=q.toneMapping;q.getClearColor(Y6),q.toneMapping=0,q.autoClear=!1;let F=new QJ({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),G=new S(new J0,F),N=!1,E=J.background;if(E){if(E.isColor)F.color.copy(E),J.background=null,N=!0}else F.color.copy(Y6),N=!0;for(let O=0;O<6;O++){let D=O%3;if(D===0)Y.up.set(0,X[O],0),Y.lookAt(H[O],0,0);else if(D===1)Y.up.set(0,0,X[O]),Y.lookAt(0,H[O],0);else Y.up.set(0,X[O],0),Y.lookAt(0,0,H[O]);let R=this._cubeSize;if(f$(Z,D*R,O>2?R:0,R,R),q.setRenderTarget(Z),N)q.render(G,Y);q.render(J,Y)}G.geometry.dispose(),G.material.dispose(),q.toneMapping=V,q.autoClear=U,J.background=E}_textureToCubeUV(J,$){let Q=this._renderer,Z=J.mapping===301||J.mapping===302;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=F6();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=U6();let K=Z?this._cubemapMaterial:this._equirectMaterial,W=new S(this._lodPlanes[0],K),Y=K.uniforms;Y.envMap.value=J;let X=this._cubeSize;f$($,0,0,3*X,2*X),Q.setRenderTarget($),Q.render(W,aQ)}_applyPMREM(J){let $=this._renderer,Q=$.autoClear;$.autoClear=!1;for(let Z=1;Z<this._lodPlanes.length;Z++){let K=Math.sqrt(this._sigmas[Z]*this._sigmas[Z]-this._sigmas[Z-1]*this._sigmas[Z-1]),W=H6[(Z-1)%H6.length];this._blur(J,Z-1,Z,K,W)}$.autoClear=Q}_blur(J,$,Q,Z,K){let W=this._pingPongRenderTarget;this._halfBlur(J,W,$,Q,Z,"latitudinal",K),this._halfBlur(W,J,Q,Q,Z,"longitudinal",K)}_halfBlur(J,$,Q,Z,K,W,Y){let X=this._renderer,H=this._blurMaterial;if(W!=="latitudinal"&&W!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let q=3,U=new S(this._lodPlanes[Z],H),V=H.uniforms,F=this._sizeLods[Q]-1,G=isFinite(K)?Math.PI/(2*F):2*Math.PI/(2*B9-1),N=K/G,E=isFinite(K)?1+Math.floor(q*N):B9;if(E>B9)console.warn(`sigmaRadians, ${K}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${B9}`);let O=[],D=0;for(let L=0;L<B9;++L){let A=L/N,w=Math.exp(-A*A/2);if(O.push(w),L===0)D+=w;else if(L<E)D+=2*w}for(let L=0;L<O.length;L++)O[L]=O[L]/D;if(V.envMap.value=J.texture,V.samples.value=E,V.weights.value=O,V.latitudinal.value=W==="latitudinal",Y)V.poleAxis.value=Y;let{_lodMax:R}=this;V.dTheta.value=G,V.mipInt.value=R-Q;let B=this._sizeLods[Z],z=3*B*(Z>R-$7?Z-R+$7:0),C=4*(this._cubeSize-B);f$($,z,C,3*B,2*B),X.setRenderTarget($),X.render(U,aQ)}}function zH(J){let $=[],Q=[],Z=[],K=J,W=J-$7+1+X6.length;for(let Y=0;Y<W;Y++){let X=Math.pow(2,K);Q.push(X);let H=1/X;if(Y>J-$7)H=X6[Y-J+$7-1];else if(Y===0)H=0;Z.push(H);let q=1/(X-2),U=-q,V=1+q,F=[U,U,V,U,V,V,U,U,V,V,U,V],G=6,N=6,E=3,O=2,D=1,R=new Float32Array(E*N*G),B=new Float32Array(O*N*G),z=new Float32Array(D*N*G);for(let L=0;L<G;L++){let A=L%3*2/3-1,w=L>2?0:-1,I=[A,w,0,A+0.6666666666666666,w,0,A+0.6666666666666666,w+1,0,A,w,0,A+0.6666666666666666,w+1,0,A,w+1,0];R.set(I,E*N*L),B.set(F,O*N*L);let k=[L,L,L,L,L,L];z.set(k,D*N*L)}let C=new GJ;if(C.setAttribute("position",new vJ(R,E)),C.setAttribute("uv",new vJ(B,O)),C.setAttribute("faceIndex",new vJ(z,D)),$.push(C),K>$7)K--}return{lodPlanes:$,sizeLods:Q,sigmas:Z}}function q6(J,$,Q){let Z=new $9(J,$,Q);return Z.texture.mapping=306,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function f$(J,$,Q,Z,K){J.viewport.set($,Q,Z,K),J.scissor.set($,Q,Z,K)}function IH(J,$,Q){let Z=new Float32Array(B9),K=new T(0,1,0);return new Q9({name:"SphericalGaussianBlur",defines:{n:B9,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:K}},vertexShader:kZ(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function U6(){return new Q9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kZ(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function F6(){return new Q9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function kZ(){return`

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
	`}function LH(J){let $=new WeakMap,Q=null;function Z(X){if(X&&X.isTexture){let H=X.mapping,q=H===303||H===304,U=H===301||H===302;if(q||U)if(X.isRenderTargetTexture&&X.needsPMREMUpdate===!0){X.needsPMREMUpdate=!1;let V=$.get(X);if(Q===null)Q=new UZ(J);return V=q?Q.fromEquirectangular(X,V):Q.fromCubemap(X,V),$.set(X,V),V.texture}else if($.has(X))return $.get(X).texture;else{let V=X.image;if(q&&V&&V.height>0||U&&V&&K(V)){if(Q===null)Q=new UZ(J);let F=q?Q.fromEquirectangular(X):Q.fromCubemap(X);return $.set(X,F),X.addEventListener("dispose",W),F.texture}else return null}}return X}function K(X){let H=0,q=6;for(let U=0;U<q;U++)if(X[U]!==void 0)H++;return H===q}function W(X){let H=X.target;H.removeEventListener("dispose",W);let q=$.get(H);if(q!==void 0)$.delete(H),q.dispose()}function Y(){if($=new WeakMap,Q!==null)Q.dispose(),Q=null}return{get:Z,dispose:Y}}function CH(J){let $={};function Q(Z){if($[Z]!==void 0)return $[Z];let K;switch(Z){case"WEBGL_depth_texture":K=J.getExtension("WEBGL_depth_texture")||J.getExtension("MOZ_WEBGL_depth_texture")||J.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":K=J.getExtension("EXT_texture_filter_anisotropic")||J.getExtension("MOZ_EXT_texture_filter_anisotropic")||J.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":K=J.getExtension("WEBGL_compressed_texture_s3tc")||J.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":K=J.getExtension("WEBGL_compressed_texture_pvrtc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:K=J.getExtension(Z)}return $[Z]=K,K}return{has:function(Z){return Q(Z)!==null},init:function(Z){if(Z.isWebGL2)Q("EXT_color_buffer_float"),Q("WEBGL_clip_cull_distance");else Q("WEBGL_depth_texture"),Q("OES_texture_float"),Q("OES_texture_half_float"),Q("OES_texture_half_float_linear"),Q("OES_standard_derivatives"),Q("OES_element_index_uint"),Q("OES_vertex_array_object"),Q("ANGLE_instanced_arrays");Q("OES_texture_float_linear"),Q("EXT_color_buffer_half_float"),Q("WEBGL_multisampled_render_to_texture")},get:function(Z){let K=Q(Z);if(K===null)console.warn("THREE.WebGLRenderer: "+Z+" extension not supported.");return K}}}function AH(J,$,Q,Z){let K={},W=new WeakMap;function Y(V){let F=V.target;if(F.index!==null)$.remove(F.index);for(let N in F.attributes)$.remove(F.attributes[N]);for(let N in F.morphAttributes){let E=F.morphAttributes[N];for(let O=0,D=E.length;O<D;O++)$.remove(E[O])}F.removeEventListener("dispose",Y),delete K[F.id];let G=W.get(F);if(G)$.remove(G),W.delete(F);if(Z.releaseStatesOfGeometry(F),F.isInstancedBufferGeometry===!0)delete F._maxInstanceCount;Q.memory.geometries--}function X(V,F){if(K[F.id]===!0)return F;return F.addEventListener("dispose",Y),K[F.id]=!0,Q.memory.geometries++,F}function H(V){let F=V.attributes;for(let N in F)$.update(F[N],J.ARRAY_BUFFER);let G=V.morphAttributes;for(let N in G){let E=G[N];for(let O=0,D=E.length;O<D;O++)$.update(E[O],J.ARRAY_BUFFER)}}function q(V){let F=[],G=V.index,N=V.attributes.position,E=0;if(G!==null){let R=G.array;E=G.version;for(let B=0,z=R.length;B<z;B+=3){let C=R[B+0],L=R[B+1],A=R[B+2];F.push(C,L,L,A,A,C)}}else if(N!==void 0){let R=N.array;E=N.version;for(let B=0,z=R.length/3-1;B<z;B+=3){let C=B+0,L=B+1,A=B+2;F.push(C,L,L,A,A,C)}}else return;let O=new((s6(F))?LZ:IZ)(F,1);O.version=E;let D=W.get(V);if(D)$.remove(D);W.set(V,O)}function U(V){let F=W.get(V);if(F){let G=V.index;if(G!==null){if(F.version<G.version)q(V)}}else q(V);return W.get(V)}return{get:X,update:H,getWireframeAttribute:U}}function MH(J,$,Q,Z){let K=Z.isWebGL2,W;function Y(G){W=G}let X,H;function q(G){X=G.type,H=G.bytesPerElement}function U(G,N){J.drawElements(W,N,X,G*H),Q.update(N,W,1)}function V(G,N,E){if(E===0)return;let O,D;if(K)O=J,D="drawElementsInstanced";else if(O=$.get("ANGLE_instanced_arrays"),D="drawElementsInstancedANGLE",O===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}O[D](W,N,X,G*H,E),Q.update(N,W,E)}function F(G,N,E){if(E===0)return;let O=$.get("WEBGL_multi_draw");if(O===null)for(let D=0;D<E;D++)this.render(G[D]/H,N[D]);else{O.multiDrawElementsWEBGL(W,N,0,X,G,0,E);let D=0;for(let R=0;R<E;R++)D+=N[R];Q.update(D,W,1)}}this.setMode=Y,this.setIndex=q,this.render=U,this.renderInstances=V,this.renderMultiDraw=F}function kH(J){let $={geometries:0,textures:0},Q={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(W,Y,X){switch(Q.calls++,Y){case J.TRIANGLES:Q.triangles+=X*(W/3);break;case J.LINES:Q.lines+=X*(W/2);break;case J.LINE_STRIP:Q.lines+=X*(W-1);break;case J.LINE_LOOP:Q.lines+=X*W;break;case J.POINTS:Q.points+=X*W;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",Y);break}}function K(){Q.calls=0,Q.triangles=0,Q.points=0,Q.lines=0}return{memory:$,render:Q,programs:null,autoReset:!0,reset:K,update:Z}}function PH(J,$){return J[0]-$[0]}function SH(J,$){return Math.abs($[1])-Math.abs(J[1])}function _H(J,$,Q){let Z={},K=new Float32Array(8),W=new WeakMap,Y=new DJ,X=[];for(let q=0;q<8;q++)X[q]=[q,0];function H(q,U,V){let F=q.morphTargetInfluences;if($.isWebGL2===!0){let G=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,N=G!==void 0?G.length:0,E=W.get(U);if(E===void 0||E.count!==N){let y=function(){n.dispose(),W.delete(U),U.removeEventListener("dispose",y)};if(E!==void 0)E.texture.dispose();let R=U.morphAttributes.position!==void 0,B=U.morphAttributes.normal!==void 0,z=U.morphAttributes.color!==void 0,C=U.morphAttributes.position||[],L=U.morphAttributes.normal||[],A=U.morphAttributes.color||[],w=0;if(R===!0)w=1;if(B===!0)w=2;if(z===!0)w=3;let I=U.attributes.position.count*w,k=1;if(I>$.maxTextureSize)k=Math.ceil(I/$.maxTextureSize),I=$.maxTextureSize;let b=new Float32Array(I*k*4*N),n=new zZ(b,I,k,N);n.type=1015,n.needsUpdate=!0;let i=w*4;for(let h=0;h<N;h++){let m=C[h],l=L[h],d=A[h],v=I*k*4*h;for(let u=0;u<m.count;u++){let r=u*i;if(R===!0)Y.fromBufferAttribute(m,u),b[v+r+0]=Y.x,b[v+r+1]=Y.y,b[v+r+2]=Y.z,b[v+r+3]=0;if(B===!0)Y.fromBufferAttribute(l,u),b[v+r+4]=Y.x,b[v+r+5]=Y.y,b[v+r+6]=Y.z,b[v+r+7]=0;if(z===!0)Y.fromBufferAttribute(d,u),b[v+r+8]=Y.x,b[v+r+9]=Y.y,b[v+r+10]=Y.z,b[v+r+11]=d.itemSize===4?Y.w:1}}E={count:N,texture:n,size:new H0(I,k)},W.set(U,E),U.addEventListener("dispose",y)}let O=0;for(let R=0;R<F.length;R++)O+=F[R];let D=U.morphTargetsRelative?1:1-O;V.getUniforms().setValue(J,"morphTargetBaseInfluence",D),V.getUniforms().setValue(J,"morphTargetInfluences",F),V.getUniforms().setValue(J,"morphTargetsTexture",E.texture,Q),V.getUniforms().setValue(J,"morphTargetsTextureSize",E.size)}else{let G=F===void 0?0:F.length,N=Z[U.id];if(N===void 0||N.length!==G){N=[];for(let B=0;B<G;B++)N[B]=[B,0];Z[U.id]=N}for(let B=0;B<G;B++){let z=N[B];z[0]=B,z[1]=F[B]}N.sort(SH);for(let B=0;B<8;B++)if(B<G&&N[B][1])X[B][0]=N[B][0],X[B][1]=N[B][1];else X[B][0]=Number.MAX_SAFE_INTEGER,X[B][1]=0;X.sort(PH);let E=U.morphAttributes.position,O=U.morphAttributes.normal,D=0;for(let B=0;B<8;B++){let z=X[B],C=z[0],L=z[1];if(C!==Number.MAX_SAFE_INTEGER&&L){if(E&&U.getAttribute("morphTarget"+B)!==E[C])U.setAttribute("morphTarget"+B,E[C]);if(O&&U.getAttribute("morphNormal"+B)!==O[C])U.setAttribute("morphNormal"+B,O[C]);K[B]=L,D+=L}else{if(E&&U.hasAttribute("morphTarget"+B)===!0)U.deleteAttribute("morphTarget"+B);if(O&&U.hasAttribute("morphNormal"+B)===!0)U.deleteAttribute("morphNormal"+B);K[B]=0}}let R=U.morphTargetsRelative?1:1-D;V.getUniforms().setValue(J,"morphTargetBaseInfluence",R),V.getUniforms().setValue(J,"morphTargetInfluences",K)}}return{update:H}}function wH(J,$,Q,Z){let K=new WeakMap;function W(H){let q=Z.render.frame,U=H.geometry,V=$.get(H,U);if(K.get(V)!==q)$.update(V),K.set(V,q);if(H.isInstancedMesh){if(H.hasEventListener("dispose",X)===!1)H.addEventListener("dispose",X);if(K.get(H)!==q){if(Q.update(H.instanceMatrix,J.ARRAY_BUFFER),H.instanceColor!==null)Q.update(H.instanceColor,J.ARRAY_BUFFER);K.set(H,q)}}if(H.isSkinnedMesh){let F=H.skeleton;if(K.get(F)!==q)F.update(),K.set(F,q)}return V}function Y(){K=new WeakMap}function X(H){let q=H.target;if(q.removeEventListener("dispose",X),Q.remove(q.instanceMatrix),q.instanceColor!==null)Q.remove(q.instanceColor)}return{update:W,dispose:Y}}class PZ extends tJ{constructor(J,$,Q,Z,K,W,Y,X,H,q){if(q=q!==void 0?q:1026,q!==1026&&q!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(Q===void 0&&q===1026)Q=1014;if(Q===void 0&&q===1027)Q=1020;super(null,Z,K,W,Y,X,q,Q,H);this.isDepthTexture=!0,this.image={width:J,height:$},this.magFilter=Y!==void 0?Y:1003,this.minFilter=X!==void 0?X:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);if(this.compareFunction!==null)$.compareFunction=this.compareFunction;return $}}var $K=new tJ,QK=new PZ(1,1);QK.compareFunction=515;var ZK=new zZ,KK=new o6,WK=new AZ,V6=[],G6=[],O6=new Float32Array(16),D6=new Float32Array(9),E6=new Float32Array(4);function q7(J,$,Q){let Z=J[0];if(Z<=0||Z>0)return J;let K=$*Q,W=V6[K];if(W===void 0)W=new Float32Array(K),V6[K]=W;if($!==0){Z.toArray(W,0);for(let Y=1,X=0;Y!==$;++Y)X+=Q,J[Y].toArray(W,X)}return W}function TJ(J,$){if(J.length!==$.length)return!1;for(let Q=0,Z=J.length;Q<Z;Q++)if(J[Q]!==$[Q])return!1;return!0}function jJ(J,$){for(let Q=0,Z=$.length;Q<Z;Q++)J[Q]=$[Q]}function QQ(J,$){let Q=G6[$];if(Q===void 0)Q=new Int32Array($),G6[$]=Q;for(let Z=0;Z!==$;++Z)Q[Z]=J.allocateTextureUnit();return Q}function TH(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1f(this.addr,$),Q[0]=$}function jH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(TJ(Q,$))return;J.uniform2fv(this.addr,$),jJ(Q,$)}}function yH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else if($.r!==void 0){if(Q[0]!==$.r||Q[1]!==$.g||Q[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Q[0]=$.r,Q[1]=$.g,Q[2]=$.b}else{if(TJ(Q,$))return;J.uniform3fv(this.addr,$),jJ(Q,$)}}function xH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(TJ(Q,$))return;J.uniform4fv(this.addr,$),jJ(Q,$)}}function bH(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(TJ(Q,$))return;J.uniformMatrix2fv(this.addr,!1,$),jJ(Q,$)}else{if(TJ(Q,Z))return;E6.set(Z),J.uniformMatrix2fv(this.addr,!1,E6),jJ(Q,Z)}}function fH(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(TJ(Q,$))return;J.uniformMatrix3fv(this.addr,!1,$),jJ(Q,$)}else{if(TJ(Q,Z))return;D6.set(Z),J.uniformMatrix3fv(this.addr,!1,D6),jJ(Q,Z)}}function hH(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(TJ(Q,$))return;J.uniformMatrix4fv(this.addr,!1,$),jJ(Q,$)}else{if(TJ(Q,Z))return;O6.set(Z),J.uniformMatrix4fv(this.addr,!1,O6),jJ(Q,Z)}}function vH(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1i(this.addr,$),Q[0]=$}function gH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(TJ(Q,$))return;J.uniform2iv(this.addr,$),jJ(Q,$)}}function mH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(TJ(Q,$))return;J.uniform3iv(this.addr,$),jJ(Q,$)}}function uH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(TJ(Q,$))return;J.uniform4iv(this.addr,$),jJ(Q,$)}}function dH(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1ui(this.addr,$),Q[0]=$}function pH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(TJ(Q,$))return;J.uniform2uiv(this.addr,$),jJ(Q,$)}}function lH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(TJ(Q,$))return;J.uniform3uiv(this.addr,$),jJ(Q,$)}}function cH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(TJ(Q,$))return;J.uniform4uiv(this.addr,$),jJ(Q,$)}}function nH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let W=this.type===J.SAMPLER_2D_SHADOW?QK:$K;Q.setTexture2D($||W,K)}function sH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture3D($||KK,K)}function iH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTextureCube($||WK,K)}function oH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture2DArray($||ZK,K)}function rH(J){switch(J){case 5126:return TH;case 35664:return jH;case 35665:return yH;case 35666:return xH;case 35674:return bH;case 35675:return fH;case 35676:return hH;case 5124:case 35670:return vH;case 35667:case 35671:return gH;case 35668:case 35672:return mH;case 35669:case 35673:return uH;case 5125:return dH;case 36294:return pH;case 36295:return lH;case 36296:return cH;case 35678:case 36198:case 36298:case 36306:case 35682:return nH;case 35679:case 36299:case 36307:return sH;case 35680:case 36300:case 36308:case 36293:return iH;case 36289:case 36303:case 36311:case 36292:return oH}}function aH(J,$){J.uniform1fv(this.addr,$)}function tH(J,$){let Q=q7($,this.size,2);J.uniform2fv(this.addr,Q)}function eH(J,$){let Q=q7($,this.size,3);J.uniform3fv(this.addr,Q)}function Jq(J,$){let Q=q7($,this.size,4);J.uniform4fv(this.addr,Q)}function $q(J,$){let Q=q7($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Q)}function Qq(J,$){let Q=q7($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Q)}function Zq(J,$){let Q=q7($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Q)}function Kq(J,$){J.uniform1iv(this.addr,$)}function Wq(J,$){J.uniform2iv(this.addr,$)}function Xq(J,$){J.uniform3iv(this.addr,$)}function Yq(J,$){J.uniform4iv(this.addr,$)}function Hq(J,$){J.uniform1uiv(this.addr,$)}function qq(J,$){J.uniform2uiv(this.addr,$)}function Uq(J,$){J.uniform3uiv(this.addr,$)}function Fq(J,$){J.uniform4uiv(this.addr,$)}function Vq(J,$,Q){let Z=this.cache,K=$.length,W=QQ(Q,K);if(!TJ(Z,W))J.uniform1iv(this.addr,W),jJ(Z,W);for(let Y=0;Y!==K;++Y)Q.setTexture2D($[Y]||$K,W[Y])}function Gq(J,$,Q){let Z=this.cache,K=$.length,W=QQ(Q,K);if(!TJ(Z,W))J.uniform1iv(this.addr,W),jJ(Z,W);for(let Y=0;Y!==K;++Y)Q.setTexture3D($[Y]||KK,W[Y])}function Oq(J,$,Q){let Z=this.cache,K=$.length,W=QQ(Q,K);if(!TJ(Z,W))J.uniform1iv(this.addr,W),jJ(Z,W);for(let Y=0;Y!==K;++Y)Q.setTextureCube($[Y]||WK,W[Y])}function Dq(J,$,Q){let Z=this.cache,K=$.length,W=QQ(Q,K);if(!TJ(Z,W))J.uniform1iv(this.addr,W),jJ(Z,W);for(let Y=0;Y!==K;++Y)Q.setTexture2DArray($[Y]||ZK,W[Y])}function Eq(J){switch(J){case 5126:return aH;case 35664:return tH;case 35665:return eH;case 35666:return Jq;case 35674:return $q;case 35675:return Qq;case 35676:return Zq;case 5124:case 35670:return Kq;case 35667:case 35671:return Wq;case 35668:case 35672:return Xq;case 35669:case 35673:return Yq;case 5125:return Hq;case 36294:return qq;case 36295:return Uq;case 36296:return Fq;case 35678:case 36198:case 36298:case 36306:case 35682:return Vq;case 35679:case 36299:case 36307:return Gq;case 35680:case 36300:case 36308:case 36293:return Oq;case 36289:case 36303:case 36311:case 36292:return Dq}}class XK{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.setValue=rH($.type)}}class YK{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=Eq($.type)}}class HK{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Q){let Z=this.seq;for(let K=0,W=Z.length;K!==W;++K){let Y=Z[K];Y.setValue(J,$[Y.id],Q)}}}var $Z=/(\w+)(\])?(\[|\.)?/g;function N6(J,$){J.seq.push($),J.map[$.id]=$}function Nq(J,$,Q){let Z=J.name,K=Z.length;$Z.lastIndex=0;while(!0){let W=$Z.exec(Z),Y=$Z.lastIndex,X=W[1],H=W[2]==="]",q=W[3];if(H)X=X|0;if(q===void 0||q==="["&&Y+2===K){N6(Q,q===void 0?new XK(X,J,$):new YK(X,J,$));break}else{let V=Q.map[X];if(V===void 0)V=new HK(X),N6(Q,V);Q=V}}}class h7{constructor(J,$){this.seq=[],this.map={};let Q=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let Z=0;Z<Q;++Z){let K=J.getActiveUniform($,Z),W=J.getUniformLocation($,K.name);Nq(K,W,this)}}setValue(J,$,Q,Z){let K=this.map[$];if(K!==void 0)K.setValue(J,Q,Z)}setOptional(J,$,Q){let Z=$[Q];if(Z!==void 0)this.setValue(J,Q,Z)}static upload(J,$,Q,Z){for(let K=0,W=$.length;K!==W;++K){let Y=$[K],X=Q[Y.id];if(X.needsUpdate!==!1)Y.setValue(J,X.value,Z)}}static seqWithValue(J,$){let Q=[];for(let Z=0,K=J.length;Z!==K;++Z){let W=J[Z];if(W.id in $)Q.push(W)}return Q}}function R6(J,$,Q){let Z=J.createShader($);return J.shaderSource(Z,Q),J.compileShader(Z),Z}var Rq=37297,Bq=0;function zq(J,$){let Q=J.split(`
`),Z=[],K=Math.max($-6,0),W=Math.min($+6,Q.length);for(let Y=K;Y<W;Y++){let X=Y+1;Z.push(`${X===$?">":" "} ${X}: ${Q[Y]}`)}return Z.join(`
`)}function Iq(J){let $=XJ.getPrimaries(XJ.workingColorSpace),Q=XJ.getPrimaries(J),Z;if($===Q)Z="";else if($==="p3"&&Q==="rec709")Z="LinearDisplayP3ToLinearSRGB";else if($==="rec709"&&Q==="p3")Z="LinearSRGBToLinearDisplayP3";switch(J){case"srgb-linear":case"display-p3-linear":return[Z,"LinearTransferOETF"];case"srgb":case"display-p3":return[Z,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",J),[Z,"LinearTransferOETF"]}}function B6(J,$,Q){let Z=J.getShaderParameter($,J.COMPILE_STATUS),K=J.getShaderInfoLog($).trim();if(Z&&K==="")return"";let W=/ERROR: 0:(\d+)/.exec(K);if(W){let Y=parseInt(W[1]);return Q.toUpperCase()+`

`+K+`

`+zq(J.getShaderSource($),Y)}else return K}function Lq(J,$){let Q=Iq($);return`vec4 ${J}( vec4 value ) { return ${Q[0]}( ${Q[1]}( value ) ); }`}function Cq(J,$){let Q;switch($){case 1:Q="Linear";break;case 2:Q="Reinhard";break;case 3:Q="OptimizedCineon";break;case 4:Q="ACESFilmic";break;case 6:Q="AgX";break;case 5:Q="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",$),Q="Linear"}return"vec3 "+J+"( vec3 color ) { return "+Q+"ToneMapping( color ); }"}function Aq(J){return[J.extensionDerivatives||!!J.envMapCubeUVHeight||J.bumpMap||J.normalMapTangentSpace||J.clearcoatNormalMap||J.flatShading||J.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(J.extensionFragDepth||J.logarithmicDepthBuffer)&&J.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",J.extensionDrawBuffers&&J.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(J.extensionShaderTextureLOD||J.envMap||J.transmission)&&J.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Q7).join(`
`)}function Mq(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Q7).join(`
`)}function kq(J){let $=[];for(let Q in J){let Z=J[Q];if(Z===!1)continue;$.push("#define "+Q+" "+Z)}return $.join(`
`)}function Pq(J,$){let Q={},Z=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let W=J.getActiveAttrib($,K),Y=W.name,X=1;if(W.type===J.FLOAT_MAT2)X=2;if(W.type===J.FLOAT_MAT3)X=3;if(W.type===J.FLOAT_MAT4)X=4;Q[Y]={type:W.type,location:J.getAttribLocation($,Y),locationSize:X}}return Q}function Q7(J){return J!==""}function z6(J,$){let Q=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Q).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function I6(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var Sq=/^[ \t]*#include +<([\w\d./]+)>/gm;function FZ(J){return J.replace(Sq,wq)}var _q=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wq(J,$){let Q=s0[$];if(Q===void 0){let Z=_q.get($);if(Z!==void 0)Q=s0[Z],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,Z);else throw Error("Can not resolve #include <"+$+">")}return FZ(Q)}var Tq=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function L6(J){return J.replace(Tq,jq)}function jq(J,$,Q,Z){let K="";for(let W=parseInt($);W<parseInt(Q);W++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+W+" ]").replace(/UNROLLED_LOOP_INDEX/g,W);return K}function C6(J){let $="precision "+J.precision+` float;
precision `+J.precision+" int;";if(J.precision==="highp")$+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")$+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")$+=`
#define LOW_PRECISION`;return $}function yq(J){let $="SHADOWMAP_TYPE_BASIC";if(J.shadowMapType===1)$="SHADOWMAP_TYPE_PCF";else if(J.shadowMapType===2)$="SHADOWMAP_TYPE_PCF_SOFT";else if(J.shadowMapType===3)$="SHADOWMAP_TYPE_VSM";return $}function xq(J){let $="ENVMAP_TYPE_CUBE";if(J.envMap)switch(J.envMapMode){case 301:case 302:$="ENVMAP_TYPE_CUBE";break;case 306:$="ENVMAP_TYPE_CUBE_UV";break}return $}function bq(J){let $="ENVMAP_MODE_REFLECTION";if(J.envMap)switch(J.envMapMode){case 302:$="ENVMAP_MODE_REFRACTION";break}return $}function fq(J){let $="ENVMAP_BLENDING_NONE";if(J.envMap)switch(J.combine){case 0:$="ENVMAP_BLENDING_MULTIPLY";break;case 1:$="ENVMAP_BLENDING_MIX";break;case 2:$="ENVMAP_BLENDING_ADD";break}return $}function hq(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Q=Math.log2($)-2,Z=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Q),112)),texelHeight:Z,maxMip:Q}}function vq(J,$,Q,Z){let K=J.getContext(),W=Q.defines,Y=Q.vertexShader,X=Q.fragmentShader,H=yq(Q),q=xq(Q),U=bq(Q),V=fq(Q),F=hq(Q),G=Q.isWebGL2?"":Aq(Q),N=Mq(Q),E=kq(W),O=K.createProgram(),D,R,B=Q.glslVersion?"#version "+Q.glslVersion+`
`:"";if(Q.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E].filter(Q7).join(`
`),D.length>0)D+=`
`;if(R=[G,"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E].filter(Q7).join(`
`),R.length>0)R+=`
`}else D=[C6(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E,Q.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Q.batching?"#define USE_BATCHING":"",Q.instancing?"#define USE_INSTANCING":"",Q.instancingColor?"#define USE_INSTANCING_COLOR":"",Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.map?"#define USE_MAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+U:"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.displacementMap?"#define USE_DISPLACEMENTMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.mapUv?"#define MAP_UV "+Q.mapUv:"",Q.alphaMapUv?"#define ALPHAMAP_UV "+Q.alphaMapUv:"",Q.lightMapUv?"#define LIGHTMAP_UV "+Q.lightMapUv:"",Q.aoMapUv?"#define AOMAP_UV "+Q.aoMapUv:"",Q.emissiveMapUv?"#define EMISSIVEMAP_UV "+Q.emissiveMapUv:"",Q.bumpMapUv?"#define BUMPMAP_UV "+Q.bumpMapUv:"",Q.normalMapUv?"#define NORMALMAP_UV "+Q.normalMapUv:"",Q.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Q.displacementMapUv:"",Q.metalnessMapUv?"#define METALNESSMAP_UV "+Q.metalnessMapUv:"",Q.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Q.roughnessMapUv:"",Q.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Q.anisotropyMapUv:"",Q.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Q.clearcoatMapUv:"",Q.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Q.clearcoatNormalMapUv:"",Q.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Q.clearcoatRoughnessMapUv:"",Q.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Q.iridescenceMapUv:"",Q.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Q.iridescenceThicknessMapUv:"",Q.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Q.sheenColorMapUv:"",Q.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Q.sheenRoughnessMapUv:"",Q.specularMapUv?"#define SPECULARMAP_UV "+Q.specularMapUv:"",Q.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Q.specularColorMapUv:"",Q.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Q.specularIntensityMapUv:"",Q.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Q.transmissionMapUv:"",Q.thicknessMapUv?"#define THICKNESSMAP_UV "+Q.thicknessMapUv:"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexColors?"#define USE_COLOR":"",Q.vertexAlphas?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.flatShading?"#define FLAT_SHADED":"",Q.skinning?"#define USE_SKINNING":"",Q.morphTargets?"#define USE_MORPHTARGETS":"",Q.morphNormals&&Q.flatShading===!1?"#define USE_MORPHNORMALS":"",Q.morphColors&&Q.isWebGL2?"#define USE_MORPHCOLORS":"",Q.morphTargetsCount>0&&Q.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",Q.morphTargetsCount>0&&Q.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+Q.morphTextureStride:"",Q.morphTargetsCount>0&&Q.isWebGL2?"#define MORPHTARGETS_COUNT "+Q.morphTargetsCount:"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+H:"",Q.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.useLegacyLights?"#define LEGACY_LIGHTS":"",Q.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Q.logarithmicDepthBuffer&&Q.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(Q7).join(`
`),R=[G,C6(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E,Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.map?"#define USE_MAP":"",Q.matcap?"#define USE_MATCAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+q:"",Q.envMap?"#define "+U:"",Q.envMap?"#define "+V:"",F?"#define CUBEUV_TEXEL_WIDTH "+F.texelWidth:"",F?"#define CUBEUV_TEXEL_HEIGHT "+F.texelHeight:"",F?"#define CUBEUV_MAX_MIP "+F.maxMip+".0":"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoat?"#define USE_CLEARCOAT":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.iridescence?"#define USE_IRIDESCENCE":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaTest?"#define USE_ALPHATEST":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.sheen?"#define USE_SHEEN":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexColors||Q.instancingColor?"#define USE_COLOR":"",Q.vertexAlphas?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.gradientMap?"#define USE_GRADIENTMAP":"",Q.flatShading?"#define FLAT_SHADED":"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+H:"",Q.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.useLegacyLights?"#define LEGACY_LIGHTS":"",Q.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Q.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Q.logarithmicDepthBuffer&&Q.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Q.toneMapping!==0?"#define TONE_MAPPING":"",Q.toneMapping!==0?s0.tonemapping_pars_fragment:"",Q.toneMapping!==0?Cq("toneMapping",Q.toneMapping):"",Q.dithering?"#define DITHERING":"",Q.opaque?"#define OPAQUE":"",s0.colorspace_pars_fragment,Lq("linearToOutputTexel",Q.outputColorSpace),Q.useDepthPacking?"#define DEPTH_PACKING "+Q.depthPacking:"",`
`].filter(Q7).join(`
`);if(Y=FZ(Y),Y=z6(Y,Q),Y=I6(Y,Q),X=FZ(X),X=z6(X,Q),X=I6(X,Q),Y=L6(Y),X=L6(X),Q.isWebGL2&&Q.isRawShaderMaterial!==!0)B=`#version 300 es
`,D=[N,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,R=["precision mediump sampler2DArray;","#define varying in",Q.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",Q.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+R;let z=B+D+Y,C=B+R+X,L=R6(K,K.VERTEX_SHADER,z),A=R6(K,K.FRAGMENT_SHADER,C);if(K.attachShader(O,L),K.attachShader(O,A),Q.index0AttributeName!==void 0)K.bindAttribLocation(O,0,Q.index0AttributeName);else if(Q.morphTargets===!0)K.bindAttribLocation(O,0,"position");K.linkProgram(O);function w(n){if(J.debug.checkShaderErrors){let i=K.getProgramInfoLog(O).trim(),y=K.getShaderInfoLog(L).trim(),h=K.getShaderInfoLog(A).trim(),m=!0,l=!0;if(K.getProgramParameter(O,K.LINK_STATUS)===!1)if(m=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,O,L,A);else{let d=B6(K,L,"vertex"),v=B6(K,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(O,K.VALIDATE_STATUS)+`

Program Info Log: `+i+`
`+d+`
`+v)}else if(i!=="")console.warn("THREE.WebGLProgram: Program Info Log:",i);else if(y===""||h==="")l=!1;if(l)n.diagnostics={runnable:m,programLog:i,vertexShader:{log:y,prefix:D},fragmentShader:{log:h,prefix:R}}}K.deleteShader(L),K.deleteShader(A),I=new h7(K,O),k=Pq(K,O)}let I;this.getUniforms=function(){if(I===void 0)w(this);return I};let k;this.getAttributes=function(){if(k===void 0)w(this);return k};let b=Q.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(b===!1)b=K.getProgramParameter(O,Rq);return b},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(O),this.program=void 0},this.type=Q.shaderType,this.name=Q.shaderName,this.id=Bq++,this.cacheKey=$,this.usedTimes=1,this.program=O,this.vertexShader=L,this.fragmentShader=A,this}var gq=0;class qK{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:$,fragmentShader:Q}=J,Z=this._getShaderStage($),K=this._getShaderStage(Q),W=this._getShaderCacheForMaterial(J);if(W.has(Z)===!1)W.add(Z),Z.usedTimes++;if(W.has(K)===!1)W.add(K),K.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Q of $)if(Q.usedTimes--,Q.usedTimes===0)this.shaderCache.delete(Q.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Q=$.get(J);if(Q===void 0)Q=new Set,$.set(J,Q);return Q}_getShaderStage(J){let $=this.shaderCache,Q=$.get(J);if(Q===void 0)Q=new UK(J),$.set(J,Q);return Q}}class UK{constructor(J){this.id=gq++,this.code=J,this.usedTimes=0}}function mq(J,$,Q,Z,K,W,Y){let X=new JQ,H=new qK,q=[],U=K.isWebGL2,V=K.logarithmicDepthBuffer,F=K.vertexTextures,G=K.precision,N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(I){if(I===0)return"uv";return`uv${I}`}function O(I,k,b,n,i){let y=n.fog,h=i.geometry,m=I.isMeshStandardMaterial?n.environment:null,l=(I.isMeshStandardMaterial?Q:$).get(I.envMap||m),d=!!l&&l.mapping===306?l.image.height:null,v=N[I.type];if(I.precision!==null){if(G=K.getMaxPrecision(I.precision),G!==I.precision)console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",G,"instead.")}let u=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,r=u!==void 0?u.length:0,g=0;if(h.morphAttributes.position!==void 0)g=1;if(h.morphAttributes.normal!==void 0)g=2;if(h.morphAttributes.color!==void 0)g=3;let t,Q0,F0,R0;if(v){let kJ=M8[v];t=kJ.vertexShader,Q0=kJ.fragmentShader}else t=I.vertexShader,Q0=I.fragmentShader,H.update(I),F0=H.getVertexShaderID(I),R0=H.getFragmentShaderID(I);let x0=J.getRenderTarget(),u0=i.isInstancedMesh===!0,w0=i.isBatchedMesh===!0,f0=!!I.map,x=!!I.matcap,D0=!!l,X0=!!I.aoMap,W0=!!I.lightMap,K0=!!I.bumpMap,z0=!!I.normalMap,N0=!!I.displacementMap,S0=!!I.emissiveMap,_=!!I.metalnessMap,M=!!I.roughnessMap,s=I.anisotropy>0,q0=I.clearcoat>0,Z0=I.iridescence>0,U0=I.sheen>0,y0=I.transmission>0,V0=s&&!!I.anisotropyMap,A0=q0&&!!I.clearcoatMap,T0=q0&&!!I.clearcoatNormalMap,h0=q0&&!!I.clearcoatRoughnessMap,Y0=Z0&&!!I.iridescenceMap,OJ=Z0&&!!I.iridescenceThicknessMap,l0=U0&&!!I.sheenColorMap,v0=U0&&!!I.sheenRoughnessMap,M0=!!I.specularMap,j=!!I.specularColorMap,$0=!!I.specularIntensityMap,E0=y0&&!!I.transmissionMap,C0=y0&&!!I.thicknessMap,p0=!!I.gradientMap,O0=!!I.alphaMap,f=I.alphaTest>0,I0=!!I.alphaHash,L0=!!I.extensions,g0=!!h.attributes.uv1,j0=!!h.attributes.uv2,a0=!!h.attributes.uv3,ZJ=0;if(I.toneMapped){if(x0===null||x0.isXRRenderTarget===!0)ZJ=J.toneMapping}return{isWebGL2:U,shaderID:v,shaderType:I.type,shaderName:I.name,vertexShader:t,fragmentShader:Q0,defines:I.defines,customVertexShaderID:F0,customFragmentShaderID:R0,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:G,batching:w0,instancing:u0,instancingColor:u0&&i.instanceColor!==null,supportsVertexTextures:F,outputColorSpace:x0===null?J.outputColorSpace:x0.isXRRenderTarget===!0?x0.texture.colorSpace:"srgb-linear",map:f0,matcap:x,envMap:D0,envMapMode:D0&&l.mapping,envMapCubeUVHeight:d,aoMap:X0,lightMap:W0,bumpMap:K0,normalMap:z0,displacementMap:F&&N0,emissiveMap:S0,normalMapObjectSpace:z0&&I.normalMapType===1,normalMapTangentSpace:z0&&I.normalMapType===0,metalnessMap:_,roughnessMap:M,anisotropy:s,anisotropyMap:V0,clearcoat:q0,clearcoatMap:A0,clearcoatNormalMap:T0,clearcoatRoughnessMap:h0,iridescence:Z0,iridescenceMap:Y0,iridescenceThicknessMap:OJ,sheen:U0,sheenColorMap:l0,sheenRoughnessMap:v0,specularMap:M0,specularColorMap:j,specularIntensityMap:$0,transmission:y0,transmissionMap:E0,thicknessMap:C0,gradientMap:p0,opaque:I.transparent===!1&&I.blending===1,alphaMap:O0,alphaTest:f,alphaHash:I0,combine:I.combine,mapUv:f0&&E(I.map.channel),aoMapUv:X0&&E(I.aoMap.channel),lightMapUv:W0&&E(I.lightMap.channel),bumpMapUv:K0&&E(I.bumpMap.channel),normalMapUv:z0&&E(I.normalMap.channel),displacementMapUv:N0&&E(I.displacementMap.channel),emissiveMapUv:S0&&E(I.emissiveMap.channel),metalnessMapUv:_&&E(I.metalnessMap.channel),roughnessMapUv:M&&E(I.roughnessMap.channel),anisotropyMapUv:V0&&E(I.anisotropyMap.channel),clearcoatMapUv:A0&&E(I.clearcoatMap.channel),clearcoatNormalMapUv:T0&&E(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:h0&&E(I.clearcoatRoughnessMap.channel),iridescenceMapUv:Y0&&E(I.iridescenceMap.channel),iridescenceThicknessMapUv:OJ&&E(I.iridescenceThicknessMap.channel),sheenColorMapUv:l0&&E(I.sheenColorMap.channel),sheenRoughnessMapUv:v0&&E(I.sheenRoughnessMap.channel),specularMapUv:M0&&E(I.specularMap.channel),specularColorMapUv:j&&E(I.specularColorMap.channel),specularIntensityMapUv:$0&&E(I.specularIntensityMap.channel),transmissionMapUv:E0&&E(I.transmissionMap.channel),thicknessMapUv:C0&&E(I.thicknessMap.channel),alphaMapUv:O0&&E(I.alphaMap.channel),vertexTangents:!!h.attributes.tangent&&(z0||s),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!h.attributes.color&&h.attributes.color.itemSize===4,vertexUv1s:g0,vertexUv2s:j0,vertexUv3s:a0,pointsUvs:i.isPoints===!0&&!!h.attributes.uv&&(f0||O0),fog:!!y,useFog:I.fog===!0,fogExp2:y&&y.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:V,skinning:i.isSkinnedMesh===!0,morphTargets:h.morphAttributes.position!==void 0,morphNormals:h.morphAttributes.normal!==void 0,morphColors:h.morphAttributes.color!==void 0,morphTargetsCount:r,morphTextureStride:g,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numClippingPlanes:Y.numPlanes,numClipIntersection:Y.numIntersection,dithering:I.dithering,shadowMapEnabled:J.shadowMap.enabled&&b.length>0,shadowMapType:J.shadowMap.type,toneMapping:ZJ,useLegacyLights:J._useLegacyLights,decodeVideoTexture:f0&&I.map.isVideoTexture===!0&&XJ.getTransfer(I.map.colorSpace)==="srgb",premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===2,flipSided:I.side===1,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionDerivatives:L0&&I.extensions.derivatives===!0,extensionFragDepth:L0&&I.extensions.fragDepth===!0,extensionDrawBuffers:L0&&I.extensions.drawBuffers===!0,extensionShaderTextureLOD:L0&&I.extensions.shaderTextureLOD===!0,extensionClipCullDistance:L0&&I.extensions.clipCullDistance&&Z.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:U||Z.has("EXT_frag_depth"),rendererExtensionDrawBuffers:U||Z.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:U||Z.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:Z.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()}}function D(I){let k=[];if(I.shaderID)k.push(I.shaderID);else k.push(I.customVertexShaderID),k.push(I.customFragmentShaderID);if(I.defines!==void 0)for(let b in I.defines)k.push(b),k.push(I.defines[b]);if(I.isRawShaderMaterial===!1)R(k,I),B(k,I),k.push(J.outputColorSpace);return k.push(I.customProgramCacheKey),k.join()}function R(I,k){I.push(k.precision),I.push(k.outputColorSpace),I.push(k.envMapMode),I.push(k.envMapCubeUVHeight),I.push(k.mapUv),I.push(k.alphaMapUv),I.push(k.lightMapUv),I.push(k.aoMapUv),I.push(k.bumpMapUv),I.push(k.normalMapUv),I.push(k.displacementMapUv),I.push(k.emissiveMapUv),I.push(k.metalnessMapUv),I.push(k.roughnessMapUv),I.push(k.anisotropyMapUv),I.push(k.clearcoatMapUv),I.push(k.clearcoatNormalMapUv),I.push(k.clearcoatRoughnessMapUv),I.push(k.iridescenceMapUv),I.push(k.iridescenceThicknessMapUv),I.push(k.sheenColorMapUv),I.push(k.sheenRoughnessMapUv),I.push(k.specularMapUv),I.push(k.specularColorMapUv),I.push(k.specularIntensityMapUv),I.push(k.transmissionMapUv),I.push(k.thicknessMapUv),I.push(k.combine),I.push(k.fogExp2),I.push(k.sizeAttenuation),I.push(k.morphTargetsCount),I.push(k.morphAttributeCount),I.push(k.numDirLights),I.push(k.numPointLights),I.push(k.numSpotLights),I.push(k.numSpotLightMaps),I.push(k.numHemiLights),I.push(k.numRectAreaLights),I.push(k.numDirLightShadows),I.push(k.numPointLightShadows),I.push(k.numSpotLightShadows),I.push(k.numSpotLightShadowsWithMaps),I.push(k.numLightProbes),I.push(k.shadowMapType),I.push(k.toneMapping),I.push(k.numClippingPlanes),I.push(k.numClipIntersection),I.push(k.depthPacking)}function B(I,k){if(X.disableAll(),k.isWebGL2)X.enable(0);if(k.supportsVertexTextures)X.enable(1);if(k.instancing)X.enable(2);if(k.instancingColor)X.enable(3);if(k.matcap)X.enable(4);if(k.envMap)X.enable(5);if(k.normalMapObjectSpace)X.enable(6);if(k.normalMapTangentSpace)X.enable(7);if(k.clearcoat)X.enable(8);if(k.iridescence)X.enable(9);if(k.alphaTest)X.enable(10);if(k.vertexColors)X.enable(11);if(k.vertexAlphas)X.enable(12);if(k.vertexUv1s)X.enable(13);if(k.vertexUv2s)X.enable(14);if(k.vertexUv3s)X.enable(15);if(k.vertexTangents)X.enable(16);if(k.anisotropy)X.enable(17);if(k.alphaHash)X.enable(18);if(k.batching)X.enable(19);if(I.push(X.mask),X.disableAll(),k.fog)X.enable(0);if(k.useFog)X.enable(1);if(k.flatShading)X.enable(2);if(k.logarithmicDepthBuffer)X.enable(3);if(k.skinning)X.enable(4);if(k.morphTargets)X.enable(5);if(k.morphNormals)X.enable(6);if(k.morphColors)X.enable(7);if(k.premultipliedAlpha)X.enable(8);if(k.shadowMapEnabled)X.enable(9);if(k.useLegacyLights)X.enable(10);if(k.doubleSided)X.enable(11);if(k.flipSided)X.enable(12);if(k.useDepthPacking)X.enable(13);if(k.dithering)X.enable(14);if(k.transmission)X.enable(15);if(k.sheen)X.enable(16);if(k.opaque)X.enable(17);if(k.pointsUvs)X.enable(18);if(k.decodeVideoTexture)X.enable(19);I.push(X.mask)}function z(I){let k=N[I.type],b;if(k){let n=M8[k];b=_X.clone(n.uniforms)}else b=I.uniforms;return b}function C(I,k){let b;for(let n=0,i=q.length;n<i;n++){let y=q[n];if(y.cacheKey===k){b=y,++b.usedTimes;break}}if(b===void 0)b=new vq(J,k,I,W),q.push(b);return b}function L(I){if(--I.usedTimes===0){let k=q.indexOf(I);q[k]=q[q.length-1],q.pop(),I.destroy()}}function A(I){H.remove(I)}function w(){H.dispose()}return{getParameters:O,getProgramCacheKey:D,getUniforms:z,acquireProgram:C,releaseProgram:L,releaseShaderCache:A,programs:q,dispose:w}}function uq(){let J=new WeakMap;function $(W){let Y=J.get(W);if(Y===void 0)Y={},J.set(W,Y);return Y}function Q(W){J.delete(W)}function Z(W,Y,X){J.get(W)[Y]=X}function K(){J=new WeakMap}return{get:$,remove:Q,update:Z,dispose:K}}function dq(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function A6(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function M6(){let J=[],$=0,Q=[],Z=[],K=[];function W(){$=0,Q.length=0,Z.length=0,K.length=0}function Y(V,F,G,N,E,O){let D=J[$];if(D===void 0)D={id:V.id,object:V,geometry:F,material:G,groupOrder:N,renderOrder:V.renderOrder,z:E,group:O},J[$]=D;else D.id=V.id,D.object=V,D.geometry=F,D.material=G,D.groupOrder=N,D.renderOrder=V.renderOrder,D.z=E,D.group=O;return $++,D}function X(V,F,G,N,E,O){let D=Y(V,F,G,N,E,O);if(G.transmission>0)Z.push(D);else if(G.transparent===!0)K.push(D);else Q.push(D)}function H(V,F,G,N,E,O){let D=Y(V,F,G,N,E,O);if(G.transmission>0)Z.unshift(D);else if(G.transparent===!0)K.unshift(D);else Q.unshift(D)}function q(V,F){if(Q.length>1)Q.sort(V||dq);if(Z.length>1)Z.sort(F||A6);if(K.length>1)K.sort(F||A6)}function U(){for(let V=$,F=J.length;V<F;V++){let G=J[V];if(G.id===null)break;G.id=null,G.object=null,G.geometry=null,G.material=null,G.group=null}}return{opaque:Q,transmissive:Z,transparent:K,init:W,push:X,unshift:H,finish:U,sort:q}}function pq(){let J=new WeakMap;function $(Z,K){let W=J.get(Z),Y;if(W===void 0)Y=new M6,J.set(Z,[Y]);else if(K>=W.length)Y=new M6,W.push(Y);else Y=W[K];return Y}function Q(){J=new WeakMap}return{get:$,dispose:Q}}function lq(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"DirectionalLight":Q={direction:new T,color:new e0};break;case"SpotLight":Q={position:new T,direction:new T,color:new e0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Q={position:new T,color:new e0,distance:0,decay:0};break;case"HemisphereLight":Q={direction:new T,skyColor:new e0,groundColor:new e0};break;case"RectAreaLight":Q={color:new e0,position:new T,halfWidth:new T,halfHeight:new T};break}return J[$.id]=Q,Q}}}function cq(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"DirectionalLight":Q={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H0};break;case"SpotLight":Q={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H0};break;case"PointLight":Q={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Q,Q}}}var nq=0;function sq(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function iq(J,$){let Q=new lq,Z=cq(),K={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)K.probe.push(new T);let W=new T,Y=new UJ,X=new UJ;function H(U,V){let F=0,G=0,N=0;for(let n=0;n<9;n++)K.probe[n].set(0,0,0);let E=0,O=0,D=0,R=0,B=0,z=0,C=0,L=0,A=0,w=0,I=0;U.sort(sq);let k=V===!0?Math.PI:1;for(let n=0,i=U.length;n<i;n++){let y=U[n],h=y.color,m=y.intensity,l=y.distance,d=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)F+=h.r*m*k,G+=h.g*m*k,N+=h.b*m*k;else if(y.isLightProbe){for(let v=0;v<9;v++)K.probe[v].addScaledVector(y.sh.coefficients[v],m);I++}else if(y.isDirectionalLight){let v=Q.get(y);if(v.color.copy(y.color).multiplyScalar(y.intensity*k),y.castShadow){let u=y.shadow,r=Z.get(y);r.shadowBias=u.bias,r.shadowNormalBias=u.normalBias,r.shadowRadius=u.radius,r.shadowMapSize=u.mapSize,K.directionalShadow[E]=r,K.directionalShadowMap[E]=d,K.directionalShadowMatrix[E]=y.shadow.matrix,z++}K.directional[E]=v,E++}else if(y.isSpotLight){let v=Q.get(y);v.position.setFromMatrixPosition(y.matrixWorld),v.color.copy(h).multiplyScalar(m*k),v.distance=l,v.coneCos=Math.cos(y.angle),v.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),v.decay=y.decay,K.spot[D]=v;let u=y.shadow;if(y.map){if(K.spotLightMap[A]=y.map,A++,u.updateMatrices(y),y.castShadow)w++}if(K.spotLightMatrix[D]=u.matrix,y.castShadow){let r=Z.get(y);r.shadowBias=u.bias,r.shadowNormalBias=u.normalBias,r.shadowRadius=u.radius,r.shadowMapSize=u.mapSize,K.spotShadow[D]=r,K.spotShadowMap[D]=d,L++}D++}else if(y.isRectAreaLight){let v=Q.get(y);v.color.copy(h).multiplyScalar(m),v.halfWidth.set(y.width*0.5,0,0),v.halfHeight.set(0,y.height*0.5,0),K.rectArea[R]=v,R++}else if(y.isPointLight){let v=Q.get(y);if(v.color.copy(y.color).multiplyScalar(y.intensity*k),v.distance=y.distance,v.decay=y.decay,y.castShadow){let u=y.shadow,r=Z.get(y);r.shadowBias=u.bias,r.shadowNormalBias=u.normalBias,r.shadowRadius=u.radius,r.shadowMapSize=u.mapSize,r.shadowCameraNear=u.camera.near,r.shadowCameraFar=u.camera.far,K.pointShadow[O]=r,K.pointShadowMap[O]=d,K.pointShadowMatrix[O]=y.shadow.matrix,C++}K.point[O]=v,O++}else if(y.isHemisphereLight){let v=Q.get(y);v.skyColor.copy(y.color).multiplyScalar(m*k),v.groundColor.copy(y.groundColor).multiplyScalar(m*k),K.hemi[B]=v,B++}}if(R>0)if($.isWebGL2)if(J.has("OES_texture_float_linear")===!0)K.rectAreaLTC1=B0.LTC_FLOAT_1,K.rectAreaLTC2=B0.LTC_FLOAT_2;else K.rectAreaLTC1=B0.LTC_HALF_1,K.rectAreaLTC2=B0.LTC_HALF_2;else if(J.has("OES_texture_float_linear")===!0)K.rectAreaLTC1=B0.LTC_FLOAT_1,K.rectAreaLTC2=B0.LTC_FLOAT_2;else if(J.has("OES_texture_half_float_linear")===!0)K.rectAreaLTC1=B0.LTC_HALF_1,K.rectAreaLTC2=B0.LTC_HALF_2;else console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.");K.ambient[0]=F,K.ambient[1]=G,K.ambient[2]=N;let b=K.hash;if(b.directionalLength!==E||b.pointLength!==O||b.spotLength!==D||b.rectAreaLength!==R||b.hemiLength!==B||b.numDirectionalShadows!==z||b.numPointShadows!==C||b.numSpotShadows!==L||b.numSpotMaps!==A||b.numLightProbes!==I)K.directional.length=E,K.spot.length=D,K.rectArea.length=R,K.point.length=O,K.hemi.length=B,K.directionalShadow.length=z,K.directionalShadowMap.length=z,K.pointShadow.length=C,K.pointShadowMap.length=C,K.spotShadow.length=L,K.spotShadowMap.length=L,K.directionalShadowMatrix.length=z,K.pointShadowMatrix.length=C,K.spotLightMatrix.length=L+A-w,K.spotLightMap.length=A,K.numSpotLightShadowsWithMaps=w,K.numLightProbes=I,b.directionalLength=E,b.pointLength=O,b.spotLength=D,b.rectAreaLength=R,b.hemiLength=B,b.numDirectionalShadows=z,b.numPointShadows=C,b.numSpotShadows=L,b.numSpotMaps=A,b.numLightProbes=I,K.version=nq++}function q(U,V){let F=0,G=0,N=0,E=0,O=0,D=V.matrixWorldInverse;for(let R=0,B=U.length;R<B;R++){let z=U[R];if(z.isDirectionalLight){let C=K.directional[F];C.direction.setFromMatrixPosition(z.matrixWorld),W.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(D),F++}else if(z.isSpotLight){let C=K.spot[N];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),C.direction.setFromMatrixPosition(z.matrixWorld),W.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(D),N++}else if(z.isRectAreaLight){let C=K.rectArea[E];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),X.identity(),Y.copy(z.matrixWorld),Y.premultiply(D),X.extractRotation(Y),C.halfWidth.set(z.width*0.5,0,0),C.halfHeight.set(0,z.height*0.5,0),C.halfWidth.applyMatrix4(X),C.halfHeight.applyMatrix4(X),E++}else if(z.isPointLight){let C=K.point[G];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),G++}else if(z.isHemisphereLight){let C=K.hemi[O];C.direction.setFromMatrixPosition(z.matrixWorld),C.direction.transformDirection(D),O++}}}return{setup:H,setupView:q,state:K}}function k6(J,$){let Q=new iq(J,$),Z=[],K=[];function W(){Z.length=0,K.length=0}function Y(V){Z.push(V)}function X(V){K.push(V)}function H(V){Q.setup(Z,V)}function q(V){Q.setupView(Z,V)}return{init:W,state:{lightsArray:Z,shadowsArray:K,lights:Q},setupLights:H,setupLightsView:q,pushLight:Y,pushShadow:X}}function oq(J,$){let Q=new WeakMap;function Z(W,Y=0){let X=Q.get(W),H;if(X===void 0)H=new k6(J,$),Q.set(W,[H]);else if(Y>=X.length)H=new k6(J,$),X.push(H);else H=X[Y];return H}function K(){Q=new WeakMap}return{get:Z,dispose:K}}class FK extends d8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class VK extends d8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}var rq=`void main() {
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
}`;function tq(J,$,Q){let Z=new $Q,K=new H0,W=new H0,Y=new DJ,X=new FK({depthPacking:3201}),H=new VK,q={},U=Q.maxTextureSize,V={[0]:1,[1]:0,[2]:2},F=new Q9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H0},radius:{value:4}},vertexShader:rq,fragmentShader:aq}),G=F.clone();G.defines.HORIZONTAL_PASS=1;let N=new GJ;N.setAttribute("position",new vJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let E=new S(N,F),O=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let D=this.type;this.render=function(L,A,w){if(O.enabled===!1)return;if(O.autoUpdate===!1&&O.needsUpdate===!1)return;if(L.length===0)return;let I=J.getRenderTarget(),k=J.getActiveCubeFace(),b=J.getActiveMipmapLevel(),n=J.state;n.setBlending(0),n.buffers.color.setClear(1,1,1,1),n.buffers.depth.setTest(!0),n.setScissorTest(!1);let i=D!==3&&this.type===3,y=D===3&&this.type!==3;for(let h=0,m=L.length;h<m;h++){let l=L[h],d=l.shadow;if(d===void 0){console.warn("THREE.WebGLShadowMap:",l,"has no shadow.");continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;K.copy(d.mapSize);let v=d.getFrameExtents();if(K.multiply(v),W.copy(d.mapSize),K.x>U||K.y>U){if(K.x>U)W.x=Math.floor(U/v.x),K.x=W.x*v.x,d.mapSize.x=W.x;if(K.y>U)W.y=Math.floor(U/v.y),K.y=W.y*v.y,d.mapSize.y=W.y}if(d.map===null||i===!0||y===!0){let r=this.type!==3?{minFilter:1003,magFilter:1003}:{};if(d.map!==null)d.map.dispose();d.map=new $9(K.x,K.y,r),d.map.texture.name=l.name+".shadowMap",d.camera.updateProjectionMatrix()}J.setRenderTarget(d.map),J.clear();let u=d.getViewportCount();for(let r=0;r<u;r++){let g=d.getViewport(r);Y.set(W.x*g.x,W.y*g.y,W.x*g.z,W.y*g.w),n.viewport(Y),d.updateMatrices(l,r),Z=d.getFrustum(),z(A,w,d.camera,l,this.type)}if(d.isPointLightShadow!==!0&&this.type===3)R(d,w);d.needsUpdate=!1}D=this.type,O.needsUpdate=!1,J.setRenderTarget(I,k,b)};function R(L,A){let w=$.update(E);if(F.defines.VSM_SAMPLES!==L.blurSamples)F.defines.VSM_SAMPLES=L.blurSamples,G.defines.VSM_SAMPLES=L.blurSamples,F.needsUpdate=!0,G.needsUpdate=!0;if(L.mapPass===null)L.mapPass=new $9(K.x,K.y);F.uniforms.shadow_pass.value=L.map.texture,F.uniforms.resolution.value=L.mapSize,F.uniforms.radius.value=L.radius,J.setRenderTarget(L.mapPass),J.clear(),J.renderBufferDirect(A,null,w,F,E,null),G.uniforms.shadow_pass.value=L.mapPass.texture,G.uniforms.resolution.value=L.mapSize,G.uniforms.radius.value=L.radius,J.setRenderTarget(L.map),J.clear(),J.renderBufferDirect(A,null,w,G,E,null)}function B(L,A,w,I){let k=null,b=w.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(b!==void 0)k=b;else if(k=w.isPointLight===!0?H:X,J.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let n=k.uuid,i=A.uuid,y=q[n];if(y===void 0)y={},q[n]=y;let h=y[i];if(h===void 0)h=k.clone(),y[i]=h,A.addEventListener("dispose",C);k=h}if(k.visible=A.visible,k.wireframe=A.wireframe,I===3)k.side=A.shadowSide!==null?A.shadowSide:A.side;else k.side=A.shadowSide!==null?A.shadowSide:V[A.side];if(k.alphaMap=A.alphaMap,k.alphaTest=A.alphaTest,k.map=A.map,k.clipShadows=A.clipShadows,k.clippingPlanes=A.clippingPlanes,k.clipIntersection=A.clipIntersection,k.displacementMap=A.displacementMap,k.displacementScale=A.displacementScale,k.displacementBias=A.displacementBias,k.wireframeLinewidth=A.wireframeLinewidth,k.linewidth=A.linewidth,w.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let n=J.properties.get(k);n.light=w}return k}function z(L,A,w,I,k){if(L.visible===!1)return;if(L.layers.test(A.layers)&&(L.isMesh||L.isLine||L.isPoints)){if((L.castShadow||L.receiveShadow&&k===3)&&(!L.frustumCulled||Z.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,L.matrixWorld);let i=$.update(L),y=L.material;if(Array.isArray(y)){let h=i.groups;for(let m=0,l=h.length;m<l;m++){let d=h[m],v=y[d.materialIndex];if(v&&v.visible){let u=B(L,v,I,k);L.onBeforeShadow(J,L,A,w,i,u,d),J.renderBufferDirect(w,null,i,u,L,d),L.onAfterShadow(J,L,A,w,i,u,d)}}}else if(y.visible){let h=B(L,y,I,k);L.onBeforeShadow(J,L,A,w,i,h,null),J.renderBufferDirect(w,null,i,h,L,null),L.onAfterShadow(J,L,A,w,i,h,null)}}}let n=L.children;for(let i=0,y=n.length;i<y;i++)z(n[i],A,w,I,k)}function C(L){L.target.removeEventListener("dispose",C);for(let w in q){let I=q[w],k=L.target.uuid;if(k in I)I[k].dispose(),delete I[k]}}}function eq(J,$,Q){let Z=Q.isWebGL2;function K(){let f=!1,I0=new DJ,L0=null,g0=new DJ(0,0,0,0);return{setMask:function(j0){if(L0!==j0&&!f)J.colorMask(j0,j0,j0,j0),L0=j0},setLocked:function(j0){f=j0},setClear:function(j0,a0,ZJ,VJ,kJ){if(kJ===!0)j0*=VJ,a0*=VJ,ZJ*=VJ;if(I0.set(j0,a0,ZJ,VJ),g0.equals(I0)===!1)J.clearColor(j0,a0,ZJ,VJ),g0.copy(I0)},reset:function(){f=!1,L0=null,g0.set(-1,0,0,0)}}}function W(){let f=!1,I0=null,L0=null,g0=null;return{setTest:function(j0){if(j0)w0(J.DEPTH_TEST);else f0(J.DEPTH_TEST)},setMask:function(j0){if(I0!==j0&&!f)J.depthMask(j0),I0=j0},setFunc:function(j0){if(L0!==j0){switch(j0){case 0:J.depthFunc(J.NEVER);break;case 1:J.depthFunc(J.ALWAYS);break;case 2:J.depthFunc(J.LESS);break;case 3:J.depthFunc(J.LEQUAL);break;case 4:J.depthFunc(J.EQUAL);break;case 5:J.depthFunc(J.GEQUAL);break;case 6:J.depthFunc(J.GREATER);break;case 7:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}L0=j0}},setLocked:function(j0){f=j0},setClear:function(j0){if(g0!==j0)J.clearDepth(j0),g0=j0},reset:function(){f=!1,I0=null,L0=null,g0=null}}}function Y(){let f=!1,I0=null,L0=null,g0=null,j0=null,a0=null,ZJ=null,VJ=null,kJ=null;return{setTest:function(t0){if(!f)if(t0)w0(J.STENCIL_TEST);else f0(J.STENCIL_TEST)},setMask:function(t0){if(I0!==t0&&!f)J.stencilMask(t0),I0=t0},setFunc:function(t0,L8,C8){if(L0!==t0||g0!==L8||j0!==C8)J.stencilFunc(t0,L8,C8),L0=t0,g0=L8,j0=C8},setOp:function(t0,L8,C8){if(a0!==t0||ZJ!==L8||VJ!==C8)J.stencilOp(t0,L8,C8),a0=t0,ZJ=L8,VJ=C8},setLocked:function(t0){f=t0},setClear:function(t0){if(kJ!==t0)J.clearStencil(t0),kJ=t0},reset:function(){f=!1,I0=null,L0=null,g0=null,j0=null,a0=null,ZJ=null,VJ=null,kJ=null}}}let X=new K,H=new W,q=new Y,U=new WeakMap,V=new WeakMap,F={},G={},N=new WeakMap,E=[],O=null,D=!1,R=null,B=null,z=null,C=null,L=null,A=null,w=null,I=new e0(0,0,0),k=0,b=!1,n=null,i=null,y=null,h=null,m=null,l=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),d=!1,v=0,u=J.getParameter(J.VERSION);if(u.indexOf("WebGL")!==-1)v=parseFloat(/^WebGL (\d)/.exec(u)[1]),d=v>=1;else if(u.indexOf("OpenGL ES")!==-1)v=parseFloat(/^OpenGL ES (\d)/.exec(u)[1]),d=v>=2;let r=null,g={},t=J.getParameter(J.SCISSOR_BOX),Q0=J.getParameter(J.VIEWPORT),F0=new DJ().fromArray(t),R0=new DJ().fromArray(Q0);function x0(f,I0,L0,g0){let j0=new Uint8Array(4),a0=J.createTexture();J.bindTexture(f,a0),J.texParameteri(f,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(f,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let ZJ=0;ZJ<L0;ZJ++)if(Z&&(f===J.TEXTURE_3D||f===J.TEXTURE_2D_ARRAY))J.texImage3D(I0,0,J.RGBA,1,1,g0,0,J.RGBA,J.UNSIGNED_BYTE,j0);else J.texImage2D(I0+ZJ,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,j0);return a0}let u0={};if(u0[J.TEXTURE_2D]=x0(J.TEXTURE_2D,J.TEXTURE_2D,1),u0[J.TEXTURE_CUBE_MAP]=x0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z)u0[J.TEXTURE_2D_ARRAY]=x0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),u0[J.TEXTURE_3D]=x0(J.TEXTURE_3D,J.TEXTURE_3D,1,1);X.setClear(0,0,0,1),H.setClear(1),q.setClear(0),w0(J.DEPTH_TEST),H.setFunc(3),S0(!1),_(1),w0(J.CULL_FACE),z0(0);function w0(f){if(F[f]!==!0)J.enable(f),F[f]=!0}function f0(f){if(F[f]!==!1)J.disable(f),F[f]=!1}function x(f,I0){if(G[f]!==I0){if(J.bindFramebuffer(f,I0),G[f]=I0,Z){if(f===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=I0;if(f===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=I0}return!0}return!1}function D0(f,I0){let L0=E,g0=!1;if(f){if(L0=N.get(I0),L0===void 0)L0=[],N.set(I0,L0);if(f.isWebGLMultipleRenderTargets){let j0=f.texture;if(L0.length!==j0.length||L0[0]!==J.COLOR_ATTACHMENT0){for(let a0=0,ZJ=j0.length;a0<ZJ;a0++)L0[a0]=J.COLOR_ATTACHMENT0+a0;L0.length=j0.length,g0=!0}}else if(L0[0]!==J.COLOR_ATTACHMENT0)L0[0]=J.COLOR_ATTACHMENT0,g0=!0}else if(L0[0]!==J.BACK)L0[0]=J.BACK,g0=!0;if(g0)if(Q.isWebGL2)J.drawBuffers(L0);else $.get("WEBGL_draw_buffers").drawBuffersWEBGL(L0)}function X0(f){if(O!==f)return J.useProgram(f),O=f,!0;return!1}let W0={[100]:J.FUNC_ADD,[101]:J.FUNC_SUBTRACT,[102]:J.FUNC_REVERSE_SUBTRACT};if(Z)W0[103]=J.MIN,W0[104]=J.MAX;else{let f=$.get("EXT_blend_minmax");if(f!==null)W0[103]=f.MIN_EXT,W0[104]=f.MAX_EXT}let K0={[200]:J.ZERO,[201]:J.ONE,[202]:J.SRC_COLOR,[204]:J.SRC_ALPHA,[210]:J.SRC_ALPHA_SATURATE,[208]:J.DST_COLOR,[206]:J.DST_ALPHA,[203]:J.ONE_MINUS_SRC_COLOR,[205]:J.ONE_MINUS_SRC_ALPHA,[209]:J.ONE_MINUS_DST_COLOR,[207]:J.ONE_MINUS_DST_ALPHA,[211]:J.CONSTANT_COLOR,[212]:J.ONE_MINUS_CONSTANT_COLOR,[213]:J.CONSTANT_ALPHA,[214]:J.ONE_MINUS_CONSTANT_ALPHA};function z0(f,I0,L0,g0,j0,a0,ZJ,VJ,kJ,t0){if(f===0){if(D===!0)f0(J.BLEND),D=!1;return}if(D===!1)w0(J.BLEND),D=!0;if(f!==5){if(f!==R||t0!==b){if(B!==100||L!==100)J.blendEquation(J.FUNC_ADD),B=100,L=100;if(t0)switch(f){case 1:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.ONE,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFuncSeparate(J.ZERO,J.SRC_COLOR,J.ZERO,J.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",f);break}else switch(f){case 1:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.SRC_ALPHA,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFunc(J.ZERO,J.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",f);break}z=null,C=null,A=null,w=null,I.set(0,0,0),k=0,R=f,b=t0}return}if(j0=j0||I0,a0=a0||L0,ZJ=ZJ||g0,I0!==B||j0!==L)J.blendEquationSeparate(W0[I0],W0[j0]),B=I0,L=j0;if(L0!==z||g0!==C||a0!==A||ZJ!==w)J.blendFuncSeparate(K0[L0],K0[g0],K0[a0],K0[ZJ]),z=L0,C=g0,A=a0,w=ZJ;if(VJ.equals(I)===!1||kJ!==k)J.blendColor(VJ.r,VJ.g,VJ.b,kJ),I.copy(VJ),k=kJ;R=f,b=!1}function N0(f,I0){f.side===2?f0(J.CULL_FACE):w0(J.CULL_FACE);let L0=f.side===1;if(I0)L0=!L0;S0(L0),f.blending===1&&f.transparent===!1?z0(0):z0(f.blending,f.blendEquation,f.blendSrc,f.blendDst,f.blendEquationAlpha,f.blendSrcAlpha,f.blendDstAlpha,f.blendColor,f.blendAlpha,f.premultipliedAlpha),H.setFunc(f.depthFunc),H.setTest(f.depthTest),H.setMask(f.depthWrite),X.setMask(f.colorWrite);let g0=f.stencilWrite;if(q.setTest(g0),g0)q.setMask(f.stencilWriteMask),q.setFunc(f.stencilFunc,f.stencilRef,f.stencilFuncMask),q.setOp(f.stencilFail,f.stencilZFail,f.stencilZPass);s(f.polygonOffset,f.polygonOffsetFactor,f.polygonOffsetUnits),f.alphaToCoverage===!0?w0(J.SAMPLE_ALPHA_TO_COVERAGE):f0(J.SAMPLE_ALPHA_TO_COVERAGE)}function S0(f){if(n!==f){if(f)J.frontFace(J.CW);else J.frontFace(J.CCW);n=f}}function _(f){if(f!==0){if(w0(J.CULL_FACE),f!==i)if(f===1)J.cullFace(J.BACK);else if(f===2)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else f0(J.CULL_FACE);i=f}function M(f){if(f!==y){if(d)J.lineWidth(f);y=f}}function s(f,I0,L0){if(f){if(w0(J.POLYGON_OFFSET_FILL),h!==I0||m!==L0)J.polygonOffset(I0,L0),h=I0,m=L0}else f0(J.POLYGON_OFFSET_FILL)}function q0(f){if(f)w0(J.SCISSOR_TEST);else f0(J.SCISSOR_TEST)}function Z0(f){if(f===void 0)f=J.TEXTURE0+l-1;if(r!==f)J.activeTexture(f),r=f}function U0(f,I0,L0){if(L0===void 0)if(r===null)L0=J.TEXTURE0+l-1;else L0=r;let g0=g[L0];if(g0===void 0)g0={type:void 0,texture:void 0},g[L0]=g0;if(g0.type!==f||g0.texture!==I0){if(r!==L0)J.activeTexture(L0),r=L0;J.bindTexture(f,I0||u0[f]),g0.type=f,g0.texture=I0}}function y0(){let f=g[r];if(f!==void 0&&f.type!==void 0)J.bindTexture(f.type,null),f.type=void 0,f.texture=void 0}function V0(){try{J.compressedTexImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function A0(){try{J.compressedTexImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function T0(){try{J.texSubImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function h0(){try{J.texSubImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function Y0(){try{J.compressedTexSubImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function OJ(){try{J.compressedTexSubImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function l0(){try{J.texStorage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function v0(){try{J.texStorage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function M0(){try{J.texImage2D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function j(){try{J.texImage3D.apply(J,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function $0(f){if(F0.equals(f)===!1)J.scissor(f.x,f.y,f.z,f.w),F0.copy(f)}function E0(f){if(R0.equals(f)===!1)J.viewport(f.x,f.y,f.z,f.w),R0.copy(f)}function C0(f,I0){let L0=V.get(I0);if(L0===void 0)L0=new WeakMap,V.set(I0,L0);let g0=L0.get(f);if(g0===void 0)g0=J.getUniformBlockIndex(I0,f.name),L0.set(f,g0)}function p0(f,I0){let g0=V.get(I0).get(f);if(U.get(I0)!==g0)J.uniformBlockBinding(I0,g0,f.__bindingPointIndex),U.set(I0,g0)}function O0(){if(J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),Z===!0)J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null);J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),F={},r=null,g={},G={},N=new WeakMap,E=[],O=null,D=!1,R=null,B=null,z=null,C=null,L=null,A=null,w=null,I=new e0(0,0,0),k=0,b=!1,n=null,i=null,y=null,h=null,m=null,F0.set(0,0,J.canvas.width,J.canvas.height),R0.set(0,0,J.canvas.width,J.canvas.height),X.reset(),H.reset(),q.reset()}return{buffers:{color:X,depth:H,stencil:q},enable:w0,disable:f0,bindFramebuffer:x,drawBuffers:D0,useProgram:X0,setBlending:z0,setMaterial:N0,setFlipSided:S0,setCullFace:_,setLineWidth:M,setPolygonOffset:s,setScissorTest:q0,activeTexture:Z0,bindTexture:U0,unbindTexture:y0,compressedTexImage2D:V0,compressedTexImage3D:A0,texImage2D:M0,texImage3D:j,updateUBOMapping:C0,uniformBlockBinding:p0,texStorage2D:l0,texStorage3D:v0,texSubImage2D:T0,texSubImage3D:h0,compressedTexSubImage2D:Y0,compressedTexSubImage3D:OJ,scissor:$0,viewport:E0,reset:O0}}function J4(J,$,Q,Z,K,W,Y){let X=K.isWebGL2,H=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,q=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new WeakMap,V,F=new WeakMap,G=!1;try{G=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(_){}function N(_,M){return G?new OffscreenCanvas(_,M):o$("canvas")}function E(_,M,s,q0){let Z0=1;if(_.width>q0||_.height>q0)Z0=q0/Math.max(_.width,_.height);if(Z0<1||M===!0)if(typeof HTMLImageElement<"u"&&_ instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&_ instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&_ instanceof ImageBitmap){let U0=M?i$:Math.floor,y0=U0(Z0*_.width),V0=U0(Z0*_.height);if(V===void 0)V=N(y0,V0);let A0=s?N(y0,V0):V;return A0.width=y0,A0.height=V0,A0.getContext("2d").drawImage(_,0,0,y0,V0),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_.width+"x"+_.height+") to ("+y0+"x"+V0+")."),A0}else{if("data"in _)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_.width+"x"+_.height+").");return _}return _}function O(_){return qZ(_.width)&&qZ(_.height)}function D(_){if(X)return!1;return _.wrapS!==1001||_.wrapT!==1001||_.minFilter!==1003&&_.minFilter!==1006}function R(_,M){return _.generateMipmaps&&M&&_.minFilter!==1003&&_.minFilter!==1006}function B(_){J.generateMipmap(_)}function z(_,M,s,q0,Z0=!1){if(X===!1)return M;if(_!==null){if(J[_]!==void 0)return J[_];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+_+"'")}let U0=M;if(M===J.RED){if(s===J.FLOAT)U0=J.R32F;if(s===J.HALF_FLOAT)U0=J.R16F;if(s===J.UNSIGNED_BYTE)U0=J.R8}if(M===J.RED_INTEGER){if(s===J.UNSIGNED_BYTE)U0=J.R8UI;if(s===J.UNSIGNED_SHORT)U0=J.R16UI;if(s===J.UNSIGNED_INT)U0=J.R32UI;if(s===J.BYTE)U0=J.R8I;if(s===J.SHORT)U0=J.R16I;if(s===J.INT)U0=J.R32I}if(M===J.RG){if(s===J.FLOAT)U0=J.RG32F;if(s===J.HALF_FLOAT)U0=J.RG16F;if(s===J.UNSIGNED_BYTE)U0=J.RG8}if(M===J.RGBA){let y0=Z0?"linear":XJ.getTransfer(q0);if(s===J.FLOAT)U0=J.RGBA32F;if(s===J.HALF_FLOAT)U0=J.RGBA16F;if(s===J.UNSIGNED_BYTE)U0=y0==="srgb"?J.SRGB8_ALPHA8:J.RGBA8;if(s===J.UNSIGNED_SHORT_4_4_4_4)U0=J.RGBA4;if(s===J.UNSIGNED_SHORT_5_5_5_1)U0=J.RGB5_A1}if(U0===J.R16F||U0===J.R32F||U0===J.RG16F||U0===J.RG32F||U0===J.RGBA16F||U0===J.RGBA32F)$.get("EXT_color_buffer_float");return U0}function C(_,M,s){if(R(_,s)===!0||_.isFramebufferTexture&&_.minFilter!==1003&&_.minFilter!==1006)return Math.log2(Math.max(M.width,M.height))+1;else if(_.mipmaps!==void 0&&_.mipmaps.length>0)return _.mipmaps.length;else if(_.isCompressedTexture&&Array.isArray(_.image))return M.mipmaps.length;else return 1}function L(_){if(_===1003||_===1004||_===1005)return J.NEAREST;return J.LINEAR}function A(_){let M=_.target;if(M.removeEventListener("dispose",A),I(M),M.isVideoTexture)U.delete(M)}function w(_){let M=_.target;M.removeEventListener("dispose",w),b(M)}function I(_){let M=Z.get(_);if(M.__webglInit===void 0)return;let s=_.source,q0=F.get(s);if(q0){let Z0=q0[M.__cacheKey];if(Z0.usedTimes--,Z0.usedTimes===0)k(_);if(Object.keys(q0).length===0)F.delete(s)}Z.remove(_)}function k(_){let M=Z.get(_);J.deleteTexture(M.__webglTexture);let s=_.source,q0=F.get(s);delete q0[M.__cacheKey],Y.memory.textures--}function b(_){let M=_.texture,s=Z.get(_),q0=Z.get(M);if(q0.__webglTexture!==void 0)J.deleteTexture(q0.__webglTexture),Y.memory.textures--;if(_.depthTexture)_.depthTexture.dispose();if(_.isWebGLCubeRenderTarget)for(let Z0=0;Z0<6;Z0++){if(Array.isArray(s.__webglFramebuffer[Z0]))for(let U0=0;U0<s.__webglFramebuffer[Z0].length;U0++)J.deleteFramebuffer(s.__webglFramebuffer[Z0][U0]);else J.deleteFramebuffer(s.__webglFramebuffer[Z0]);if(s.__webglDepthbuffer)J.deleteRenderbuffer(s.__webglDepthbuffer[Z0])}else{if(Array.isArray(s.__webglFramebuffer))for(let Z0=0;Z0<s.__webglFramebuffer.length;Z0++)J.deleteFramebuffer(s.__webglFramebuffer[Z0]);else J.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer)J.deleteRenderbuffer(s.__webglDepthbuffer);if(s.__webglMultisampledFramebuffer)J.deleteFramebuffer(s.__webglMultisampledFramebuffer);if(s.__webglColorRenderbuffer){for(let Z0=0;Z0<s.__webglColorRenderbuffer.length;Z0++)if(s.__webglColorRenderbuffer[Z0])J.deleteRenderbuffer(s.__webglColorRenderbuffer[Z0])}if(s.__webglDepthRenderbuffer)J.deleteRenderbuffer(s.__webglDepthRenderbuffer)}if(_.isWebGLMultipleRenderTargets)for(let Z0=0,U0=M.length;Z0<U0;Z0++){let y0=Z.get(M[Z0]);if(y0.__webglTexture)J.deleteTexture(y0.__webglTexture),Y.memory.textures--;Z.remove(M[Z0])}Z.remove(M),Z.remove(_)}let n=0;function i(){n=0}function y(){let _=n;if(_>=K.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+_+" texture units while this GPU supports only "+K.maxTextures);return n+=1,_}function h(_){let M=[];return M.push(_.wrapS),M.push(_.wrapT),M.push(_.wrapR||0),M.push(_.magFilter),M.push(_.minFilter),M.push(_.anisotropy),M.push(_.internalFormat),M.push(_.format),M.push(_.type),M.push(_.generateMipmaps),M.push(_.premultiplyAlpha),M.push(_.flipY),M.push(_.unpackAlignment),M.push(_.colorSpace),M.join()}function m(_,M){let s=Z.get(_);if(_.isVideoTexture)N0(_);if(_.isRenderTargetTexture===!1&&_.version>0&&s.__version!==_.version){let q0=_.image;if(q0===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q0.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{F0(s,_,M);return}}Q.bindTexture(J.TEXTURE_2D,s.__webglTexture,J.TEXTURE0+M)}function l(_,M){let s=Z.get(_);if(_.version>0&&s.__version!==_.version){F0(s,_,M);return}Q.bindTexture(J.TEXTURE_2D_ARRAY,s.__webglTexture,J.TEXTURE0+M)}function d(_,M){let s=Z.get(_);if(_.version>0&&s.__version!==_.version){F0(s,_,M);return}Q.bindTexture(J.TEXTURE_3D,s.__webglTexture,J.TEXTURE0+M)}function v(_,M){let s=Z.get(_);if(_.version>0&&s.__version!==_.version){R0(s,_,M);return}Q.bindTexture(J.TEXTURE_CUBE_MAP,s.__webglTexture,J.TEXTURE0+M)}let u={[1000]:J.REPEAT,[1001]:J.CLAMP_TO_EDGE,[1002]:J.MIRRORED_REPEAT},r={[1003]:J.NEAREST,[1004]:J.NEAREST_MIPMAP_NEAREST,[1005]:J.NEAREST_MIPMAP_LINEAR,[1006]:J.LINEAR,[1007]:J.LINEAR_MIPMAP_NEAREST,[1008]:J.LINEAR_MIPMAP_LINEAR},g={[512]:J.NEVER,[519]:J.ALWAYS,[513]:J.LESS,[515]:J.LEQUAL,[514]:J.EQUAL,[518]:J.GEQUAL,[516]:J.GREATER,[517]:J.NOTEQUAL};function t(_,M,s){if(s){if(J.texParameteri(_,J.TEXTURE_WRAP_S,u[M.wrapS]),J.texParameteri(_,J.TEXTURE_WRAP_T,u[M.wrapT]),_===J.TEXTURE_3D||_===J.TEXTURE_2D_ARRAY)J.texParameteri(_,J.TEXTURE_WRAP_R,u[M.wrapR]);J.texParameteri(_,J.TEXTURE_MAG_FILTER,r[M.magFilter]),J.texParameteri(_,J.TEXTURE_MIN_FILTER,r[M.minFilter])}else{if(J.texParameteri(_,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(_,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE),_===J.TEXTURE_3D||_===J.TEXTURE_2D_ARRAY)J.texParameteri(_,J.TEXTURE_WRAP_R,J.CLAMP_TO_EDGE);if(M.wrapS!==1001||M.wrapT!==1001)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.");if(J.texParameteri(_,J.TEXTURE_MAG_FILTER,L(M.magFilter)),J.texParameteri(_,J.TEXTURE_MIN_FILTER,L(M.minFilter)),M.minFilter!==1003&&M.minFilter!==1006)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")}if(M.compareFunction)J.texParameteri(_,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(_,J.TEXTURE_COMPARE_FUNC,g[M.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){let q0=$.get("EXT_texture_filter_anisotropic");if(M.magFilter===1003)return;if(M.minFilter!==1005&&M.minFilter!==1008)return;if(M.type===1015&&$.has("OES_texture_float_linear")===!1)return;if(X===!1&&(M.type===1016&&$.has("OES_texture_half_float_linear")===!1))return;if(M.anisotropy>1||Z.get(M).__currentAnisotropy)J.texParameterf(_,q0.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,K.getMaxAnisotropy())),Z.get(M).__currentAnisotropy=M.anisotropy}}function Q0(_,M){let s=!1;if(_.__webglInit===void 0)_.__webglInit=!0,M.addEventListener("dispose",A);let q0=M.source,Z0=F.get(q0);if(Z0===void 0)Z0={},F.set(q0,Z0);let U0=h(M);if(U0!==_.__cacheKey){if(Z0[U0]===void 0)Z0[U0]={texture:J.createTexture(),usedTimes:0},Y.memory.textures++,s=!0;Z0[U0].usedTimes++;let y0=Z0[_.__cacheKey];if(y0!==void 0){if(Z0[_.__cacheKey].usedTimes--,y0.usedTimes===0)k(M)}_.__cacheKey=U0,_.__webglTexture=Z0[U0].texture}return s}function F0(_,M,s){let q0=J.TEXTURE_2D;if(M.isDataArrayTexture||M.isCompressedArrayTexture)q0=J.TEXTURE_2D_ARRAY;if(M.isData3DTexture)q0=J.TEXTURE_3D;let Z0=Q0(_,M),U0=M.source;Q.bindTexture(q0,_.__webglTexture,J.TEXTURE0+s);let y0=Z.get(U0);if(U0.version!==y0.__version||Z0===!0){Q.activeTexture(J.TEXTURE0+s);let V0=XJ.getPrimaries(XJ.workingColorSpace),A0=M.colorSpace===""?null:XJ.getPrimaries(M.colorSpace),T0=M.colorSpace===""||V0===A0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,T0);let h0=D(M)&&O(M.image)===!1,Y0=E(M.image,h0,!1,K.maxTextureSize);Y0=S0(M,Y0);let OJ=O(Y0)||X,l0=W.convert(M.format,M.colorSpace),v0=W.convert(M.type),M0=z(M.internalFormat,l0,v0,M.colorSpace,M.isVideoTexture);t(q0,M,OJ);let j,$0=M.mipmaps,E0=X&&M.isVideoTexture!==!0&&M0!==36196,C0=y0.__version===void 0||Z0===!0,p0=C(M,Y0,OJ);if(M.isDepthTexture){if(M0=J.DEPTH_COMPONENT,X)if(M.type===1015)M0=J.DEPTH_COMPONENT32F;else if(M.type===1014)M0=J.DEPTH_COMPONENT24;else if(M.type===1020)M0=J.DEPTH24_STENCIL8;else M0=J.DEPTH_COMPONENT16;else if(M.type===1015)console.error("WebGLRenderer: Floating point depth texture requires WebGL2.");if(M.format===1026&&M0===J.DEPTH_COMPONENT){if(M.type!==1012&&M.type!==1014)console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=1014,v0=W.convert(M.type)}if(M.format===1027&&M0===J.DEPTH_COMPONENT){if(M0=J.DEPTH_STENCIL,M.type!==1020)console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=1020,v0=W.convert(M.type)}if(C0)if(E0)Q.texStorage2D(J.TEXTURE_2D,1,M0,Y0.width,Y0.height);else Q.texImage2D(J.TEXTURE_2D,0,M0,Y0.width,Y0.height,0,l0,v0,null)}else if(M.isDataTexture)if($0.length>0&&OJ){if(E0&&C0)Q.texStorage2D(J.TEXTURE_2D,p0,M0,$0[0].width,$0[0].height);for(let O0=0,f=$0.length;O0<f;O0++)if(j=$0[O0],E0)Q.texSubImage2D(J.TEXTURE_2D,O0,0,0,j.width,j.height,l0,v0,j.data);else Q.texImage2D(J.TEXTURE_2D,O0,M0,j.width,j.height,0,l0,v0,j.data);M.generateMipmaps=!1}else if(E0){if(C0)Q.texStorage2D(J.TEXTURE_2D,p0,M0,Y0.width,Y0.height);Q.texSubImage2D(J.TEXTURE_2D,0,0,0,Y0.width,Y0.height,l0,v0,Y0.data)}else Q.texImage2D(J.TEXTURE_2D,0,M0,Y0.width,Y0.height,0,l0,v0,Y0.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){if(E0&&C0)Q.texStorage3D(J.TEXTURE_2D_ARRAY,p0,M0,$0[0].width,$0[0].height,Y0.depth);for(let O0=0,f=$0.length;O0<f;O0++)if(j=$0[O0],M.format!==1023)if(l0!==null)if(E0)Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,O0,0,0,0,j.width,j.height,Y0.depth,l0,j.data,0,0);else Q.compressedTexImage3D(J.TEXTURE_2D_ARRAY,O0,M0,j.width,j.height,Y0.depth,0,j.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(E0)Q.texSubImage3D(J.TEXTURE_2D_ARRAY,O0,0,0,0,j.width,j.height,Y0.depth,l0,v0,j.data);else Q.texImage3D(J.TEXTURE_2D_ARRAY,O0,M0,j.width,j.height,Y0.depth,0,l0,v0,j.data)}else{if(E0&&C0)Q.texStorage2D(J.TEXTURE_2D,p0,M0,$0[0].width,$0[0].height);for(let O0=0,f=$0.length;O0<f;O0++)if(j=$0[O0],M.format!==1023)if(l0!==null)if(E0)Q.compressedTexSubImage2D(J.TEXTURE_2D,O0,0,0,j.width,j.height,l0,j.data);else Q.compressedTexImage2D(J.TEXTURE_2D,O0,M0,j.width,j.height,0,j.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(E0)Q.texSubImage2D(J.TEXTURE_2D,O0,0,0,j.width,j.height,l0,v0,j.data);else Q.texImage2D(J.TEXTURE_2D,O0,M0,j.width,j.height,0,l0,v0,j.data)}else if(M.isDataArrayTexture)if(E0){if(C0)Q.texStorage3D(J.TEXTURE_2D_ARRAY,p0,M0,Y0.width,Y0.height,Y0.depth);Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,Y0.width,Y0.height,Y0.depth,l0,v0,Y0.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,0,M0,Y0.width,Y0.height,Y0.depth,0,l0,v0,Y0.data);else if(M.isData3DTexture)if(E0){if(C0)Q.texStorage3D(J.TEXTURE_3D,p0,M0,Y0.width,Y0.height,Y0.depth);Q.texSubImage3D(J.TEXTURE_3D,0,0,0,0,Y0.width,Y0.height,Y0.depth,l0,v0,Y0.data)}else Q.texImage3D(J.TEXTURE_3D,0,M0,Y0.width,Y0.height,Y0.depth,0,l0,v0,Y0.data);else if(M.isFramebufferTexture){if(C0)if(E0)Q.texStorage2D(J.TEXTURE_2D,p0,M0,Y0.width,Y0.height);else{let{width:O0,height:f}=Y0;for(let I0=0;I0<p0;I0++)Q.texImage2D(J.TEXTURE_2D,I0,M0,O0,f,0,l0,v0,null),O0>>=1,f>>=1}}else if($0.length>0&&OJ){if(E0&&C0)Q.texStorage2D(J.TEXTURE_2D,p0,M0,$0[0].width,$0[0].height);for(let O0=0,f=$0.length;O0<f;O0++)if(j=$0[O0],E0)Q.texSubImage2D(J.TEXTURE_2D,O0,0,0,l0,v0,j);else Q.texImage2D(J.TEXTURE_2D,O0,M0,l0,v0,j);M.generateMipmaps=!1}else if(E0){if(C0)Q.texStorage2D(J.TEXTURE_2D,p0,M0,Y0.width,Y0.height);Q.texSubImage2D(J.TEXTURE_2D,0,0,0,l0,v0,Y0)}else Q.texImage2D(J.TEXTURE_2D,0,M0,l0,v0,Y0);if(R(M,OJ))B(q0);if(y0.__version=U0.version,M.onUpdate)M.onUpdate(M)}_.__version=M.version}function R0(_,M,s){if(M.image.length!==6)return;let q0=Q0(_,M),Z0=M.source;Q.bindTexture(J.TEXTURE_CUBE_MAP,_.__webglTexture,J.TEXTURE0+s);let U0=Z.get(Z0);if(Z0.version!==U0.__version||q0===!0){Q.activeTexture(J.TEXTURE0+s);let y0=XJ.getPrimaries(XJ.workingColorSpace),V0=M.colorSpace===""?null:XJ.getPrimaries(M.colorSpace),A0=M.colorSpace===""||y0===V0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,A0);let T0=M.isCompressedTexture||M.image[0].isCompressedTexture,h0=M.image[0]&&M.image[0].isDataTexture,Y0=[];for(let O0=0;O0<6;O0++){if(!T0&&!h0)Y0[O0]=E(M.image[O0],!1,!0,K.maxCubemapSize);else Y0[O0]=h0?M.image[O0].image:M.image[O0];Y0[O0]=S0(M,Y0[O0])}let OJ=Y0[0],l0=O(OJ)||X,v0=W.convert(M.format,M.colorSpace),M0=W.convert(M.type),j=z(M.internalFormat,v0,M0,M.colorSpace),$0=X&&M.isVideoTexture!==!0,E0=U0.__version===void 0||q0===!0,C0=C(M,OJ,l0);t(J.TEXTURE_CUBE_MAP,M,l0);let p0;if(T0){if($0&&E0)Q.texStorage2D(J.TEXTURE_CUBE_MAP,C0,j,OJ.width,OJ.height);for(let O0=0;O0<6;O0++){p0=Y0[O0].mipmaps;for(let f=0;f<p0.length;f++){let I0=p0[f];if(M.format!==1023)if(v0!==null)if($0)Q.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f,0,0,I0.width,I0.height,v0,I0.data);else Q.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f,j,I0.width,I0.height,0,I0.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f,0,0,I0.width,I0.height,v0,M0,I0.data);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f,j,I0.width,I0.height,0,v0,M0,I0.data)}}}else{if(p0=M.mipmaps,$0&&E0){if(p0.length>0)C0++;Q.texStorage2D(J.TEXTURE_CUBE_MAP,C0,j,Y0[0].width,Y0[0].height)}for(let O0=0;O0<6;O0++)if(h0){if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,0,0,0,Y0[O0].width,Y0[O0].height,v0,M0,Y0[O0].data);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,0,j,Y0[O0].width,Y0[O0].height,0,v0,M0,Y0[O0].data);for(let f=0;f<p0.length;f++){let L0=p0[f].image[O0].image;if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f+1,0,0,L0.width,L0.height,v0,M0,L0.data);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f+1,j,L0.width,L0.height,0,v0,M0,L0.data)}}else{if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,0,0,0,v0,M0,Y0[O0]);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,0,j,v0,M0,Y0[O0]);for(let f=0;f<p0.length;f++){let I0=p0[f];if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f+1,0,0,v0,M0,I0.image[O0]);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,f+1,j,v0,M0,I0.image[O0])}}}if(R(M,l0))B(J.TEXTURE_CUBE_MAP);if(U0.__version=Z0.version,M.onUpdate)M.onUpdate(M)}_.__version=M.version}function x0(_,M,s,q0,Z0,U0){let y0=W.convert(s.format,s.colorSpace),V0=W.convert(s.type),A0=z(s.internalFormat,y0,V0,s.colorSpace);if(!Z.get(M).__hasExternalTextures){let h0=Math.max(1,M.width>>U0),Y0=Math.max(1,M.height>>U0);if(Z0===J.TEXTURE_3D||Z0===J.TEXTURE_2D_ARRAY)Q.texImage3D(Z0,U0,A0,h0,Y0,M.depth,0,y0,V0,null);else Q.texImage2D(Z0,U0,A0,h0,Y0,0,y0,V0,null)}if(Q.bindFramebuffer(J.FRAMEBUFFER,_),z0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,q0,Z0,Z.get(s).__webglTexture,0,K0(M));else if(Z0===J.TEXTURE_2D||Z0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&Z0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,q0,Z0,Z.get(s).__webglTexture,U0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}function u0(_,M,s){if(J.bindRenderbuffer(J.RENDERBUFFER,_),M.depthBuffer&&!M.stencilBuffer){let q0=X===!0?J.DEPTH_COMPONENT24:J.DEPTH_COMPONENT16;if(s||z0(M)){let Z0=M.depthTexture;if(Z0&&Z0.isDepthTexture){if(Z0.type===1015)q0=J.DEPTH_COMPONENT32F;else if(Z0.type===1014)q0=J.DEPTH_COMPONENT24}let U0=K0(M);if(z0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,U0,q0,M.width,M.height);else J.renderbufferStorageMultisample(J.RENDERBUFFER,U0,q0,M.width,M.height)}else J.renderbufferStorage(J.RENDERBUFFER,q0,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.RENDERBUFFER,_)}else if(M.depthBuffer&&M.stencilBuffer){let q0=K0(M);if(s&&z0(M)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,q0,J.DEPTH24_STENCIL8,M.width,M.height);else if(z0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,q0,J.DEPTH24_STENCIL8,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,J.DEPTH_STENCIL,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.RENDERBUFFER,_)}else{let q0=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z0=0;Z0<q0.length;Z0++){let U0=q0[Z0],y0=W.convert(U0.format,U0.colorSpace),V0=W.convert(U0.type),A0=z(U0.internalFormat,y0,V0,U0.colorSpace),T0=K0(M);if(s&&z0(M)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,T0,A0,M.width,M.height);else if(z0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,T0,A0,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,A0,M.width,M.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function w0(_,M){if(M&&M.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(Q.bindFramebuffer(J.FRAMEBUFFER,_),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");if(!Z.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0;m(M.depthTexture,0);let q0=Z.get(M.depthTexture).__webglTexture,Z0=K0(M);if(M.depthTexture.format===1026)if(z0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,q0,0,Z0);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,q0,0);else if(M.depthTexture.format===1027)if(z0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,q0,0,Z0);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,q0,0);else throw Error("Unknown depthTexture format")}function f0(_){let M=Z.get(_),s=_.isWebGLCubeRenderTarget===!0;if(_.depthTexture&&!M.__autoAllocateDepthBuffer){if(s)throw Error("target.depthTexture not supported in Cube render targets");w0(M.__webglFramebuffer,_)}else if(s){M.__webglDepthbuffer=[];for(let q0=0;q0<6;q0++)Q.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer[q0]),M.__webglDepthbuffer[q0]=J.createRenderbuffer(),u0(M.__webglDepthbuffer[q0],_,!1)}else Q.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=J.createRenderbuffer(),u0(M.__webglDepthbuffer,_,!1);Q.bindFramebuffer(J.FRAMEBUFFER,null)}function x(_,M,s){let q0=Z.get(_);if(M!==void 0)x0(q0.__webglFramebuffer,_,_.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(s!==void 0)f0(_)}function D0(_){let M=_.texture,s=Z.get(_),q0=Z.get(M);if(_.addEventListener("dispose",w),_.isWebGLMultipleRenderTargets!==!0){if(q0.__webglTexture===void 0)q0.__webglTexture=J.createTexture();q0.__version=M.version,Y.memory.textures++}let Z0=_.isWebGLCubeRenderTarget===!0,U0=_.isWebGLMultipleRenderTargets===!0,y0=O(_)||X;if(Z0){s.__webglFramebuffer=[];for(let V0=0;V0<6;V0++)if(X&&M.mipmaps&&M.mipmaps.length>0){s.__webglFramebuffer[V0]=[];for(let A0=0;A0<M.mipmaps.length;A0++)s.__webglFramebuffer[V0][A0]=J.createFramebuffer()}else s.__webglFramebuffer[V0]=J.createFramebuffer()}else{if(X&&M.mipmaps&&M.mipmaps.length>0){s.__webglFramebuffer=[];for(let V0=0;V0<M.mipmaps.length;V0++)s.__webglFramebuffer[V0]=J.createFramebuffer()}else s.__webglFramebuffer=J.createFramebuffer();if(U0)if(K.drawBuffers){let V0=_.texture;for(let A0=0,T0=V0.length;A0<T0;A0++){let h0=Z.get(V0[A0]);if(h0.__webglTexture===void 0)h0.__webglTexture=J.createTexture(),Y.memory.textures++}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(X&&_.samples>0&&z0(_)===!1){let V0=U0?M:[M];s.__webglMultisampledFramebuffer=J.createFramebuffer(),s.__webglColorRenderbuffer=[],Q.bindFramebuffer(J.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let A0=0;A0<V0.length;A0++){let T0=V0[A0];s.__webglColorRenderbuffer[A0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,s.__webglColorRenderbuffer[A0]);let h0=W.convert(T0.format,T0.colorSpace),Y0=W.convert(T0.type),OJ=z(T0.internalFormat,h0,Y0,T0.colorSpace,_.isXRRenderTarget===!0),l0=K0(_);J.renderbufferStorageMultisample(J.RENDERBUFFER,l0,OJ,_.width,_.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+A0,J.RENDERBUFFER,s.__webglColorRenderbuffer[A0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),_.depthBuffer)s.__webglDepthRenderbuffer=J.createRenderbuffer(),u0(s.__webglDepthRenderbuffer,_,!0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}}if(Z0){Q.bindTexture(J.TEXTURE_CUBE_MAP,q0.__webglTexture),t(J.TEXTURE_CUBE_MAP,M,y0);for(let V0=0;V0<6;V0++)if(X&&M.mipmaps&&M.mipmaps.length>0)for(let A0=0;A0<M.mipmaps.length;A0++)x0(s.__webglFramebuffer[V0][A0],_,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,A0);else x0(s.__webglFramebuffer[V0],_,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,0);if(R(M,y0))B(J.TEXTURE_CUBE_MAP);Q.unbindTexture()}else if(U0){let V0=_.texture;for(let A0=0,T0=V0.length;A0<T0;A0++){let h0=V0[A0],Y0=Z.get(h0);if(Q.bindTexture(J.TEXTURE_2D,Y0.__webglTexture),t(J.TEXTURE_2D,h0,y0),x0(s.__webglFramebuffer,_,h0,J.COLOR_ATTACHMENT0+A0,J.TEXTURE_2D,0),R(h0,y0))B(J.TEXTURE_2D)}Q.unbindTexture()}else{let V0=J.TEXTURE_2D;if(_.isWebGL3DRenderTarget||_.isWebGLArrayRenderTarget)if(X)V0=_.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;else console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.");if(Q.bindTexture(V0,q0.__webglTexture),t(V0,M,y0),X&&M.mipmaps&&M.mipmaps.length>0)for(let A0=0;A0<M.mipmaps.length;A0++)x0(s.__webglFramebuffer[A0],_,M,J.COLOR_ATTACHMENT0,V0,A0);else x0(s.__webglFramebuffer,_,M,J.COLOR_ATTACHMENT0,V0,0);if(R(M,y0))B(V0);Q.unbindTexture()}if(_.depthBuffer)f0(_)}function X0(_){let M=O(_)||X,s=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let q0=0,Z0=s.length;q0<Z0;q0++){let U0=s[q0];if(R(U0,M)){let y0=_.isWebGLCubeRenderTarget?J.TEXTURE_CUBE_MAP:J.TEXTURE_2D,V0=Z.get(U0).__webglTexture;Q.bindTexture(y0,V0),B(y0),Q.unbindTexture()}}}function W0(_){if(X&&_.samples>0&&z0(_)===!1){let M=_.isWebGLMultipleRenderTargets?_.texture:[_.texture],s=_.width,q0=_.height,Z0=J.COLOR_BUFFER_BIT,U0=[],y0=_.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,V0=Z.get(_),A0=_.isWebGLMultipleRenderTargets===!0;if(A0)for(let T0=0;T0<M.length;T0++)Q.bindFramebuffer(J.FRAMEBUFFER,V0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.RENDERBUFFER,null),Q.bindFramebuffer(J.FRAMEBUFFER,V0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.TEXTURE_2D,null,0);Q.bindFramebuffer(J.READ_FRAMEBUFFER,V0.__webglMultisampledFramebuffer),Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,V0.__webglFramebuffer);for(let T0=0;T0<M.length;T0++){if(U0.push(J.COLOR_ATTACHMENT0+T0),_.depthBuffer)U0.push(y0);let h0=V0.__ignoreDepthValues!==void 0?V0.__ignoreDepthValues:!1;if(h0===!1){if(_.depthBuffer)Z0|=J.DEPTH_BUFFER_BIT;if(_.stencilBuffer)Z0|=J.STENCIL_BUFFER_BIT}if(A0)J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,V0.__webglColorRenderbuffer[T0]);if(h0===!0)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,[y0]),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[y0]);if(A0){let Y0=Z.get(M[T0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,Y0,0)}if(J.blitFramebuffer(0,0,s,q0,0,0,s,q0,Z0,J.NEAREST),q)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,U0)}if(Q.bindFramebuffer(J.READ_FRAMEBUFFER,null),Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),A0)for(let T0=0;T0<M.length;T0++){Q.bindFramebuffer(J.FRAMEBUFFER,V0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.RENDERBUFFER,V0.__webglColorRenderbuffer[T0]);let h0=Z.get(M[T0]).__webglTexture;Q.bindFramebuffer(J.FRAMEBUFFER,V0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.TEXTURE_2D,h0,0)}Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,V0.__webglMultisampledFramebuffer)}}function K0(_){return Math.min(K.maxSamples,_.samples)}function z0(_){let M=Z.get(_);return X&&_.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function N0(_){let M=Y.render.frame;if(U.get(_)!==M)U.set(_,M),_.update()}function S0(_,M){let{colorSpace:s,format:q0,type:Z0}=_;if(_.isCompressedTexture===!0||_.isVideoTexture===!0||_.format===1035)return M;if(s!=="srgb-linear"&&s!=="")if(XJ.getTransfer(s)==="srgb"){if(X===!1)if($.has("EXT_sRGB")===!0&&q0===1023)_.format=1035,_.minFilter=1006,_.generateMipmaps=!1;else M=RZ.sRGBToLinear(M);else if(q0!==1023||Z0!==1009)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",s);return M}this.allocateTextureUnit=y,this.resetTextureUnits=i,this.setTexture2D=m,this.setTexture2DArray=l,this.setTexture3D=d,this.setTextureCube=v,this.rebindTextures=x,this.setupRenderTarget=D0,this.updateRenderTargetMipmap=X0,this.updateMultisampleRenderTarget=W0,this.setupDepthRenderbuffer=f0,this.setupFrameBufferTexture=x0,this.useMultisampledRTT=z0}function $4(J,$,Q){let Z=Q.isWebGL2;function K(W,Y=""){let X,H=XJ.getTransfer(Y);if(W===1009)return J.UNSIGNED_BYTE;if(W===1017)return J.UNSIGNED_SHORT_4_4_4_4;if(W===1018)return J.UNSIGNED_SHORT_5_5_5_1;if(W===1010)return J.BYTE;if(W===1011)return J.SHORT;if(W===1012)return J.UNSIGNED_SHORT;if(W===1013)return J.INT;if(W===1014)return J.UNSIGNED_INT;if(W===1015)return J.FLOAT;if(W===1016){if(Z)return J.HALF_FLOAT;if(X=$.get("OES_texture_half_float"),X!==null)return X.HALF_FLOAT_OES;else return null}if(W===1021)return J.ALPHA;if(W===1023)return J.RGBA;if(W===1024)return J.LUMINANCE;if(W===1025)return J.LUMINANCE_ALPHA;if(W===1026)return J.DEPTH_COMPONENT;if(W===1027)return J.DEPTH_STENCIL;if(W===1035)if(X=$.get("EXT_sRGB"),X!==null)return X.SRGB_ALPHA_EXT;else return null;if(W===1028)return J.RED;if(W===1029)return J.RED_INTEGER;if(W===1030)return J.RG;if(W===1031)return J.RG_INTEGER;if(W===1033)return J.RGBA_INTEGER;if(W===33776||W===33777||W===33778||W===33779)if(H==="srgb")if(X=$.get("WEBGL_compressed_texture_s3tc_srgb"),X!==null){if(W===33776)return X.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===33777)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===33778)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===33779)return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(X=$.get("WEBGL_compressed_texture_s3tc"),X!==null){if(W===33776)return X.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===33777)return X.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===33778)return X.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===33779)return X.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===35840||W===35841||W===35842||W===35843)if(X=$.get("WEBGL_compressed_texture_pvrtc"),X!==null){if(W===35840)return X.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===35841)return X.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===35842)return X.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===35843)return X.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===36196)if(X=$.get("WEBGL_compressed_texture_etc1"),X!==null)return X.COMPRESSED_RGB_ETC1_WEBGL;else return null;if(W===37492||W===37496)if(X=$.get("WEBGL_compressed_texture_etc"),X!==null){if(W===37492)return H==="srgb"?X.COMPRESSED_SRGB8_ETC2:X.COMPRESSED_RGB8_ETC2;if(W===37496)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:X.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(W===37808||W===37809||W===37810||W===37811||W===37812||W===37813||W===37814||W===37815||W===37816||W===37817||W===37818||W===37819||W===37820||W===37821)if(X=$.get("WEBGL_compressed_texture_astc"),X!==null){if(W===37808)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:X.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===37809)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:X.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===37810)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:X.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===37811)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:X.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===37812)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:X.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===37813)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:X.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===37814)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:X.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===37815)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:X.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===37816)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:X.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===37817)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:X.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===37818)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:X.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===37819)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:X.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===37820)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:X.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===37821)return H==="srgb"?X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:X.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===36492||W===36494||W===36495)if(X=$.get("EXT_texture_compression_bptc"),X!==null){if(W===36492)return H==="srgb"?X.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:X.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===36494)return X.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===36495)return X.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===36283||W===36284||W===36285||W===36286)if(X=$.get("EXT_texture_compression_rgtc"),X!==null){if(W===36492)return X.COMPRESSED_RED_RGTC1_EXT;if(W===36284)return X.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===36285)return X.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===36286)return X.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===1020){if(Z)return J.UNSIGNED_INT_24_8;if(X=$.get("WEBGL_depth_texture"),X!==null)return X.UNSIGNED_INT_24_8_WEBGL;else return null}return J[W]!==void 0?J[W]:null}return{convert:K}}class GK extends lJ{constructor(J=[]){super();this.isArrayCamera=!0,this.cameras=J}}class G0 extends EJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var Q4={type:"move"};class s${constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new G0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new G0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new G0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Q of J.hand.values())this._getHandJoint($,Q)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Q){let Z=null,K=null,W=null,Y=this._targetRay,X=this._grip,H=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(H&&J.hand){W=!0;for(let N of J.hand.values()){let E=$.getJointPose(N,Q),O=this._getHandJoint(H,N);if(E!==null)O.matrix.fromArray(E.transform.matrix),O.matrix.decompose(O.position,O.rotation,O.scale),O.matrixWorldNeedsUpdate=!0,O.jointRadius=E.radius;O.visible=E!==null}let q=H.joints["index-finger-tip"],U=H.joints["thumb-tip"],V=q.position.distanceTo(U.position),F=0.02,G=0.005;if(H.inputState.pinching&&V>F+G)H.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!H.inputState.pinching&&V<=F-G)H.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(X!==null&&J.gripSpace){if(K=$.getPose(J.gripSpace,Q),K!==null){if(X.matrix.fromArray(K.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,K.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy(K.linearVelocity);else X.hasLinearVelocity=!1;if(K.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy(K.angularVelocity);else X.hasAngularVelocity=!1}}if(Y!==null){if(Z=$.getPose(J.targetRaySpace,Q),Z===null&&K!==null)Z=K;if(Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;this.dispatchEvent(Q4)}}}if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=K!==null;if(H!==null)H.visible=W!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Q=new G0;Q.matrixAutoUpdate=!1,Q.visible=!1,J.joints[$.jointName]=Q,J.add(Q)}return J.joints[$.jointName]}}class OK extends u8{constructor(J,$){super();let Q=this,Z=null,K=1,W=null,Y="local-floor",X=1,H=null,q=null,U=null,V=null,F=null,G=null,N=$.getContextAttributes(),E=null,O=null,D=[],R=[],B=new H0,z=null,C=new lJ;C.layers.enable(1),C.viewport=new DJ;let L=new lJ;L.layers.enable(2),L.viewport=new DJ;let A=[C,L],w=new GK;w.layers.enable(1),w.layers.enable(2);let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(g){let t=D[g];if(t===void 0)t=new s$,D[g]=t;return t.getTargetRaySpace()},this.getControllerGrip=function(g){let t=D[g];if(t===void 0)t=new s$,D[g]=t;return t.getGripSpace()},this.getHand=function(g){let t=D[g];if(t===void 0)t=new s$,D[g]=t;return t.getHandSpace()};function b(g){let t=R.indexOf(g.inputSource);if(t===-1)return;let Q0=D[t];if(Q0!==void 0)Q0.update(g.inputSource,g.frame,H||W),Q0.dispatchEvent({type:g.type,data:g.inputSource})}function n(){Z.removeEventListener("select",b),Z.removeEventListener("selectstart",b),Z.removeEventListener("selectend",b),Z.removeEventListener("squeeze",b),Z.removeEventListener("squeezestart",b),Z.removeEventListener("squeezeend",b),Z.removeEventListener("end",n),Z.removeEventListener("inputsourceschange",i);for(let g=0;g<D.length;g++){let t=R[g];if(t===null)continue;R[g]=null,D[g].disconnect(t)}I=null,k=null,J.setRenderTarget(E),F=null,V=null,U=null,Z=null,O=null,r.stop(),Q.isPresenting=!1,J.setPixelRatio(z),J.setSize(B.width,B.height,!1),Q.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(g){if(K=g,Q.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(g){if(Y=g,Q.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return H||W},this.setReferenceSpace=function(g){H=g},this.getBaseLayer=function(){return V!==null?V:F},this.getBinding=function(){return U},this.getFrame=function(){return G},this.getSession=function(){return Z},this.setSession=async function(g){if(Z=g,Z!==null){if(E=J.getRenderTarget(),Z.addEventListener("select",b),Z.addEventListener("selectstart",b),Z.addEventListener("selectend",b),Z.addEventListener("squeeze",b),Z.addEventListener("squeezestart",b),Z.addEventListener("squeezeend",b),Z.addEventListener("end",n),Z.addEventListener("inputsourceschange",i),N.xrCompatible!==!0)await $.makeXRCompatible();if(z=J.getPixelRatio(),J.getSize(B),Z.renderState.layers===void 0||J.capabilities.isWebGL2===!1){let t={antialias:Z.renderState.layers===void 0?N.antialias:!0,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:K};F=new XRWebGLLayer(Z,$,t),Z.updateRenderState({baseLayer:F}),J.setPixelRatio(1),J.setSize(F.framebufferWidth,F.framebufferHeight,!1),O=new $9(F.framebufferWidth,F.framebufferHeight,{format:1023,type:1009,colorSpace:J.outputColorSpace,stencilBuffer:N.stencil})}else{let t=null,Q0=null,F0=null;if(N.depth)F0=N.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,t=N.stencil?1027:1026,Q0=N.stencil?1020:1014;let R0={colorFormat:$.RGBA8,depthFormat:F0,scaleFactor:K};U=new XRWebGLBinding(Z,$),V=U.createProjectionLayer(R0),Z.updateRenderState({layers:[V]}),J.setPixelRatio(1),J.setSize(V.textureWidth,V.textureHeight,!1),O=new $9(V.textureWidth,V.textureHeight,{format:1023,type:1009,depthTexture:new PZ(V.textureWidth,V.textureHeight,Q0,void 0,void 0,void 0,void 0,void 0,void 0,t),stencilBuffer:N.stencil,colorSpace:J.outputColorSpace,samples:N.antialias?4:0});let x0=J.properties.get(O);x0.__ignoreDepthValues=V.ignoreDepthValues}O.isXRRenderTarget=!0,this.setFoveation(X),H=null,W=await Z.requestReferenceSpace(Y),r.setContext(Z),r.start(),Q.isPresenting=!0,Q.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode};function i(g){for(let t=0;t<g.removed.length;t++){let Q0=g.removed[t],F0=R.indexOf(Q0);if(F0>=0)R[F0]=null,D[F0].disconnect(Q0)}for(let t=0;t<g.added.length;t++){let Q0=g.added[t],F0=R.indexOf(Q0);if(F0===-1){for(let x0=0;x0<D.length;x0++)if(x0>=R.length){R.push(Q0),F0=x0;break}else if(R[x0]===null){R[x0]=Q0,F0=x0;break}if(F0===-1)break}let R0=D[F0];if(R0)R0.connect(Q0)}}let y=new T,h=new T;function m(g,t,Q0){y.setFromMatrixPosition(t.matrixWorld),h.setFromMatrixPosition(Q0.matrixWorld);let F0=y.distanceTo(h),R0=t.projectionMatrix.elements,x0=Q0.projectionMatrix.elements,u0=R0[14]/(R0[10]-1),w0=R0[14]/(R0[10]+1),f0=(R0[9]+1)/R0[5],x=(R0[9]-1)/R0[5],D0=(R0[8]-1)/R0[0],X0=(x0[8]+1)/x0[0],W0=u0*D0,K0=u0*X0,z0=F0/(-D0+X0),N0=z0*-D0;t.matrixWorld.decompose(g.position,g.quaternion,g.scale),g.translateX(N0),g.translateZ(z0),g.matrixWorld.compose(g.position,g.quaternion,g.scale),g.matrixWorldInverse.copy(g.matrixWorld).invert();let S0=u0+z0,_=w0+z0,M=W0-N0,s=K0+(F0-N0),q0=f0*w0/_*S0,Z0=x*w0/_*S0;g.projectionMatrix.makePerspective(M,s,q0,Z0,S0,_),g.projectionMatrixInverse.copy(g.projectionMatrix).invert()}function l(g,t){if(t===null)g.matrixWorld.copy(g.matrix);else g.matrixWorld.multiplyMatrices(t.matrixWorld,g.matrix);g.matrixWorldInverse.copy(g.matrixWorld).invert()}this.updateCamera=function(g){if(Z===null)return;if(w.near=L.near=C.near=g.near,w.far=L.far=C.far=g.far,I!==w.near||k!==w.far)Z.updateRenderState({depthNear:w.near,depthFar:w.far}),I=w.near,k=w.far;let t=g.parent,Q0=w.cameras;l(w,t);for(let F0=0;F0<Q0.length;F0++)l(Q0[F0],t);if(Q0.length===2)m(w,C,L);else w.projectionMatrix.copy(C.projectionMatrix);d(g,w,t)};function d(g,t,Q0){if(Q0===null)g.matrix.copy(t.matrixWorld);else g.matrix.copy(Q0.matrixWorld),g.matrix.invert(),g.matrix.multiply(t.matrixWorld);if(g.matrix.decompose(g.position,g.quaternion,g.scale),g.updateMatrixWorld(!0),g.projectionMatrix.copy(t.projectionMatrix),g.projectionMatrixInverse.copy(t.projectionMatrixInverse),g.isPerspectiveCamera)g.fov=W7*2*Math.atan(1/g.projectionMatrix.elements[5]),g.zoom=1}this.getCamera=function(){return w},this.getFoveation=function(){if(V===null&&F===null)return;return X},this.setFoveation=function(g){if(X=g,V!==null)V.fixedFoveation=g;if(F!==null&&F.fixedFoveation!==void 0)F.fixedFoveation=g};let v=null;function u(g,t){if(q=t.getViewerPose(H||W),G=t,q!==null){let Q0=q.views;if(F!==null)J.setRenderTargetFramebuffer(O,F.framebuffer),J.setRenderTarget(O);let F0=!1;if(Q0.length!==w.cameras.length)w.cameras.length=0,F0=!0;for(let R0=0;R0<Q0.length;R0++){let x0=Q0[R0],u0=null;if(F!==null)u0=F.getViewport(x0);else{let f0=U.getViewSubImage(V,x0);if(u0=f0.viewport,R0===0)J.setRenderTargetTextures(O,f0.colorTexture,V.ignoreDepthValues?void 0:f0.depthStencilTexture),J.setRenderTarget(O)}let w0=A[R0];if(w0===void 0)w0=new lJ,w0.layers.enable(R0),w0.viewport=new DJ,A[R0]=w0;if(w0.matrix.fromArray(x0.transform.matrix),w0.matrix.decompose(w0.position,w0.quaternion,w0.scale),w0.projectionMatrix.fromArray(x0.projectionMatrix),w0.projectionMatrixInverse.copy(w0.projectionMatrix).invert(),w0.viewport.set(u0.x,u0.y,u0.width,u0.height),R0===0)w.matrix.copy(w0.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale);if(F0===!0)w.cameras.push(w0)}}for(let Q0=0;Q0<D.length;Q0++){let F0=R[Q0],R0=D[Q0];if(F0!==null&&R0!==void 0)R0.update(F0,t,H||W)}if(v)v(g,t);if(t.detectedPlanes)Q.dispatchEvent({type:"planesdetected",data:t});G=null}let r=new JK;r.setAnimationLoop(u),this.setAnimationLoop=function(g){v=g},this.dispose=function(){}}}function Z4(J,$){function Q(O,D){if(O.matrixAutoUpdate===!0)O.updateMatrix();D.value.copy(O.matrix)}function Z(O,D){if(D.color.getRGB(O.fogColor.value,a6(J)),D.isFog)O.fogNear.value=D.near,O.fogFar.value=D.far;else if(D.isFogExp2)O.fogDensity.value=D.density}function K(O,D,R,B,z){if(D.isMeshBasicMaterial)W(O,D);else if(D.isMeshLambertMaterial)W(O,D);else if(D.isMeshToonMaterial)W(O,D),V(O,D);else if(D.isMeshPhongMaterial)W(O,D),U(O,D);else if(D.isMeshStandardMaterial){if(W(O,D),F(O,D),D.isMeshPhysicalMaterial)G(O,D,z)}else if(D.isMeshMatcapMaterial)W(O,D),N(O,D);else if(D.isMeshDepthMaterial)W(O,D);else if(D.isMeshDistanceMaterial)W(O,D),E(O,D);else if(D.isMeshNormalMaterial)W(O,D);else if(D.isLineBasicMaterial){if(Y(O,D),D.isLineDashedMaterial)X(O,D)}else if(D.isPointsMaterial)H(O,D,R,B);else if(D.isSpriteMaterial)q(O,D);else if(D.isShadowMaterial)O.color.value.copy(D.color),O.opacity.value=D.opacity;else if(D.isShaderMaterial)D.uniformsNeedUpdate=!1}function W(O,D){if(O.opacity.value=D.opacity,D.color)O.diffuse.value.copy(D.color);if(D.emissive)O.emissive.value.copy(D.emissive).multiplyScalar(D.emissiveIntensity);if(D.map)O.map.value=D.map,Q(D.map,O.mapTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Q(D.alphaMap,O.alphaMapTransform);if(D.bumpMap){if(O.bumpMap.value=D.bumpMap,Q(D.bumpMap,O.bumpMapTransform),O.bumpScale.value=D.bumpScale,D.side===1)O.bumpScale.value*=-1}if(D.normalMap){if(O.normalMap.value=D.normalMap,Q(D.normalMap,O.normalMapTransform),O.normalScale.value.copy(D.normalScale),D.side===1)O.normalScale.value.negate()}if(D.displacementMap)O.displacementMap.value=D.displacementMap,Q(D.displacementMap,O.displacementMapTransform),O.displacementScale.value=D.displacementScale,O.displacementBias.value=D.displacementBias;if(D.emissiveMap)O.emissiveMap.value=D.emissiveMap,Q(D.emissiveMap,O.emissiveMapTransform);if(D.specularMap)O.specularMap.value=D.specularMap,Q(D.specularMap,O.specularMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest;let R=$.get(D).envMap;if(R)O.envMap.value=R,O.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,O.reflectivity.value=D.reflectivity,O.ior.value=D.ior,O.refractionRatio.value=D.refractionRatio;if(D.lightMap){O.lightMap.value=D.lightMap;let B=J._useLegacyLights===!0?Math.PI:1;O.lightMapIntensity.value=D.lightMapIntensity*B,Q(D.lightMap,O.lightMapTransform)}if(D.aoMap)O.aoMap.value=D.aoMap,O.aoMapIntensity.value=D.aoMapIntensity,Q(D.aoMap,O.aoMapTransform)}function Y(O,D){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,D.map)O.map.value=D.map,Q(D.map,O.mapTransform)}function X(O,D){O.dashSize.value=D.dashSize,O.totalSize.value=D.dashSize+D.gapSize,O.scale.value=D.scale}function H(O,D,R,B){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,O.size.value=D.size*R,O.scale.value=B*0.5,D.map)O.map.value=D.map,Q(D.map,O.uvTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Q(D.alphaMap,O.alphaMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest}function q(O,D){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,O.rotation.value=D.rotation,D.map)O.map.value=D.map,Q(D.map,O.mapTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Q(D.alphaMap,O.alphaMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest}function U(O,D){O.specular.value.copy(D.specular),O.shininess.value=Math.max(D.shininess,0.0001)}function V(O,D){if(D.gradientMap)O.gradientMap.value=D.gradientMap}function F(O,D){if(O.metalness.value=D.metalness,D.metalnessMap)O.metalnessMap.value=D.metalnessMap,Q(D.metalnessMap,O.metalnessMapTransform);if(O.roughness.value=D.roughness,D.roughnessMap)O.roughnessMap.value=D.roughnessMap,Q(D.roughnessMap,O.roughnessMapTransform);if($.get(D).envMap)O.envMapIntensity.value=D.envMapIntensity}function G(O,D,R){if(O.ior.value=D.ior,D.sheen>0){if(O.sheenColor.value.copy(D.sheenColor).multiplyScalar(D.sheen),O.sheenRoughness.value=D.sheenRoughness,D.sheenColorMap)O.sheenColorMap.value=D.sheenColorMap,Q(D.sheenColorMap,O.sheenColorMapTransform);if(D.sheenRoughnessMap)O.sheenRoughnessMap.value=D.sheenRoughnessMap,Q(D.sheenRoughnessMap,O.sheenRoughnessMapTransform)}if(D.clearcoat>0){if(O.clearcoat.value=D.clearcoat,O.clearcoatRoughness.value=D.clearcoatRoughness,D.clearcoatMap)O.clearcoatMap.value=D.clearcoatMap,Q(D.clearcoatMap,O.clearcoatMapTransform);if(D.clearcoatRoughnessMap)O.clearcoatRoughnessMap.value=D.clearcoatRoughnessMap,Q(D.clearcoatRoughnessMap,O.clearcoatRoughnessMapTransform);if(D.clearcoatNormalMap){if(O.clearcoatNormalMap.value=D.clearcoatNormalMap,Q(D.clearcoatNormalMap,O.clearcoatNormalMapTransform),O.clearcoatNormalScale.value.copy(D.clearcoatNormalScale),D.side===1)O.clearcoatNormalScale.value.negate()}}if(D.iridescence>0){if(O.iridescence.value=D.iridescence,O.iridescenceIOR.value=D.iridescenceIOR,O.iridescenceThicknessMinimum.value=D.iridescenceThicknessRange[0],O.iridescenceThicknessMaximum.value=D.iridescenceThicknessRange[1],D.iridescenceMap)O.iridescenceMap.value=D.iridescenceMap,Q(D.iridescenceMap,O.iridescenceMapTransform);if(D.iridescenceThicknessMap)O.iridescenceThicknessMap.value=D.iridescenceThicknessMap,Q(D.iridescenceThicknessMap,O.iridescenceThicknessMapTransform)}if(D.transmission>0){if(O.transmission.value=D.transmission,O.transmissionSamplerMap.value=R.texture,O.transmissionSamplerSize.value.set(R.width,R.height),D.transmissionMap)O.transmissionMap.value=D.transmissionMap,Q(D.transmissionMap,O.transmissionMapTransform);if(O.thickness.value=D.thickness,D.thicknessMap)O.thicknessMap.value=D.thicknessMap,Q(D.thicknessMap,O.thicknessMapTransform);O.attenuationDistance.value=D.attenuationDistance,O.attenuationColor.value.copy(D.attenuationColor)}if(D.anisotropy>0){if(O.anisotropyVector.value.set(D.anisotropy*Math.cos(D.anisotropyRotation),D.anisotropy*Math.sin(D.anisotropyRotation)),D.anisotropyMap)O.anisotropyMap.value=D.anisotropyMap,Q(D.anisotropyMap,O.anisotropyMapTransform)}if(O.specularIntensity.value=D.specularIntensity,O.specularColor.value.copy(D.specularColor),D.specularColorMap)O.specularColorMap.value=D.specularColorMap,Q(D.specularColorMap,O.specularColorMapTransform);if(D.specularIntensityMap)O.specularIntensityMap.value=D.specularIntensityMap,Q(D.specularIntensityMap,O.specularIntensityMapTransform)}function N(O,D){if(D.matcap)O.matcap.value=D.matcap}function E(O,D){let R=$.get(D).light;O.referencePosition.value.setFromMatrixPosition(R.matrixWorld),O.nearDistance.value=R.shadow.camera.near,O.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function K4(J,$,Q,Z){let K={},W={},Y=[],X=Q.isWebGL2?J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS):0;function H(R,B){let z=B.program;Z.uniformBlockBinding(R,z)}function q(R,B){let z=K[R.id];if(z===void 0)N(R),z=U(R),K[R.id]=z,R.addEventListener("dispose",O);let C=B.program;Z.updateUBOMapping(R,C);let L=$.render.frame;if(W[R.id]!==L)F(R),W[R.id]=L}function U(R){let B=V();R.__bindingPointIndex=B;let z=J.createBuffer(),C=R.__size,L=R.usage;return J.bindBuffer(J.UNIFORM_BUFFER,z),J.bufferData(J.UNIFORM_BUFFER,C,L),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,B,z),z}function V(){for(let R=0;R<X;R++)if(Y.indexOf(R)===-1)return Y.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function F(R){let B=K[R.id],z=R.uniforms,C=R.__cache;J.bindBuffer(J.UNIFORM_BUFFER,B);for(let L=0,A=z.length;L<A;L++){let w=Array.isArray(z[L])?z[L]:[z[L]];for(let I=0,k=w.length;I<k;I++){let b=w[I];if(G(b,L,I,C)===!0){let n=b.__offset,i=Array.isArray(b.value)?b.value:[b.value],y=0;for(let h=0;h<i.length;h++){let m=i[h],l=E(m);if(typeof m==="number"||typeof m==="boolean")b.__data[0]=m,J.bufferSubData(J.UNIFORM_BUFFER,n+y,b.__data);else if(m.isMatrix3)b.__data[0]=m.elements[0],b.__data[1]=m.elements[1],b.__data[2]=m.elements[2],b.__data[3]=0,b.__data[4]=m.elements[3],b.__data[5]=m.elements[4],b.__data[6]=m.elements[5],b.__data[7]=0,b.__data[8]=m.elements[6],b.__data[9]=m.elements[7],b.__data[10]=m.elements[8],b.__data[11]=0;else m.toArray(b.__data,y),y+=l.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,n,b.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function G(R,B,z,C){let L=R.value,A=B+"_"+z;if(C[A]===void 0){if(typeof L==="number"||typeof L==="boolean")C[A]=L;else C[A]=L.clone();return!0}else{let w=C[A];if(typeof L==="number"||typeof L==="boolean"){if(w!==L)return C[A]=L,!0}else if(w.equals(L)===!1)return w.copy(L),!0}return!1}function N(R){let B=R.uniforms,z=0,C=16;for(let A=0,w=B.length;A<w;A++){let I=Array.isArray(B[A])?B[A]:[B[A]];for(let k=0,b=I.length;k<b;k++){let n=I[k],i=Array.isArray(n.value)?n.value:[n.value];for(let y=0,h=i.length;y<h;y++){let m=i[y],l=E(m),d=z%C;if(d!==0&&C-d<l.boundary)z+=C-d;n.__data=new Float32Array(l.storage/Float32Array.BYTES_PER_ELEMENT),n.__offset=z,z+=l.storage}}}let L=z%C;if(L>0)z+=C-L;return R.__size=z,R.__cache={},this}function E(R){let B={boundary:0,storage:0};if(typeof R==="number"||typeof R==="boolean")B.boundary=4,B.storage=4;else if(R.isVector2)B.boundary=8,B.storage=8;else if(R.isVector3||R.isColor)B.boundary=16,B.storage=12;else if(R.isVector4)B.boundary=16,B.storage=16;else if(R.isMatrix3)B.boundary=48,B.storage=48;else if(R.isMatrix4)B.boundary=64,B.storage=64;else if(R.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R);return B}function O(R){let B=R.target;B.removeEventListener("dispose",O);let z=Y.indexOf(B.__bindingPointIndex);Y.splice(z,1),J.deleteBuffer(K[B.id]),delete K[B.id],delete W[B.id]}function D(){for(let R in K)J.deleteBuffer(K[R]);Y=[],K={},W={}}return{bind:H,update:q,dispose:D}}class ZQ{constructor(J={}){let{canvas:$=GX(),context:Q=null,depth:Z=!0,stencil:K=!0,alpha:W=!1,antialias:Y=!1,premultipliedAlpha:X=!0,preserveDrawingBuffer:H=!1,powerPreference:q="default",failIfMajorPerformanceCaveat:U=!1}=J;this.isWebGLRenderer=!0;let V;if(Q!==null)V=Q.getContextAttributes().alpha;else V=W;let F=new Uint32Array(4),G=new Int32Array(4),N=null,E=null,O=[],D=[];this.domElement=$,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace="srgb",this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let R=this,B=!1,z=0,C=0,L=null,A=-1,w=null,I=new DJ,k=new DJ,b=null,n=new e0(0),i=0,y=$.width,h=$.height,m=1,l=null,d=null,v=new DJ(0,0,y,h),u=new DJ(0,0,y,h),r=!1,g=new $Q,t=!1,Q0=!1,F0=null,R0=new UJ,x0=new H0,u0=new T,w0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function f0(){return L===null?m:1}let x=Q;function D0(P,p){for(let a=0;a<P.length;a++){let e=P[a],o=$.getContext(e,p);if(o!==null)return o}return null}try{let P={alpha:!0,depth:Z,stencil:K,antialias:Y,premultipliedAlpha:X,preserveDrawingBuffer:H,powerPreference:q,failIfMajorPerformanceCaveat:U};if("setAttribute"in $)$.setAttribute("data-engine","three.js r160");if($.addEventListener("webglcontextlost",p0,!1),$.addEventListener("webglcontextrestored",O0,!1),$.addEventListener("webglcontextcreationerror",f,!1),x===null){let p=["webgl2","webgl","experimental-webgl"];if(R.isWebGL1Renderer===!0)p.shift();if(x=D0(p,P),x===null)if(D0(p))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}if(typeof WebGLRenderingContext<"u"&&x instanceof WebGLRenderingContext)console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.");if(x.getShaderPrecisionFormat===void 0)x.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let X0,W0,K0,z0,N0,S0,_,M,s,q0,Z0,U0,y0,V0,A0,T0,h0,Y0,OJ,l0,v0,M0,j,$0;function E0(){X0=new CH(x),W0=new NH(x,X0,J),X0.init(W0),M0=new $4(x,X0,W0),K0=new eq(x,X0,W0),z0=new kH(x),N0=new uq,S0=new J4(x,X0,K0,N0,W0,M0,z0),_=new BH(R),M=new LH(R),s=new xX(x,W0),j=new DH(x,X0,s,W0),q0=new AH(x,s,z0,j),Z0=new wH(x,q0,s,z0),OJ=new _H(x,W0,S0),T0=new RH(N0),U0=new mq(R,_,M,X0,W0,j,T0),y0=new Z4(R,N0),V0=new pq,A0=new oq(X0,W0),Y0=new OH(R,_,M,K0,Z0,V,X),h0=new tq(R,Z0,W0),$0=new K4(x,z0,W0,K0),l0=new EH(x,X0,z0,W0),v0=new MH(x,X0,z0,W0),z0.programs=U0.programs,R.capabilities=W0,R.extensions=X0,R.properties=N0,R.renderLists=V0,R.shadowMap=h0,R.state=K0,R.info=z0}E0();let C0=new OK(R,x);this.xr=C0,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){let P=X0.get("WEBGL_lose_context");if(P)P.loseContext()},this.forceContextRestore=function(){let P=X0.get("WEBGL_lose_context");if(P)P.restoreContext()},this.getPixelRatio=function(){return m},this.setPixelRatio=function(P){if(P===void 0)return;m=P,this.setSize(y,h,!1)},this.getSize=function(P){return P.set(y,h)},this.setSize=function(P,p,a=!0){if(C0.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(y=P,h=p,$.width=Math.floor(P*m),$.height=Math.floor(p*m),a===!0)$.style.width=P+"px",$.style.height=p+"px";this.setViewport(0,0,P,p)},this.getDrawingBufferSize=function(P){return P.set(y*m,h*m).floor()},this.setDrawingBufferSize=function(P,p,a){y=P,h=p,m=a,$.width=Math.floor(P*a),$.height=Math.floor(p*a),this.setViewport(0,0,P,p)},this.getCurrentViewport=function(P){return P.copy(I)},this.getViewport=function(P){return P.copy(v)},this.setViewport=function(P,p,a,e){if(P.isVector4)v.set(P.x,P.y,P.z,P.w);else v.set(P,p,a,e);K0.viewport(I.copy(v).multiplyScalar(m).floor())},this.getScissor=function(P){return P.copy(u)},this.setScissor=function(P,p,a,e){if(P.isVector4)u.set(P.x,P.y,P.z,P.w);else u.set(P,p,a,e);K0.scissor(k.copy(u).multiplyScalar(m).floor())},this.getScissorTest=function(){return r},this.setScissorTest=function(P){K0.setScissorTest(r=P)},this.setOpaqueSort=function(P){l=P},this.setTransparentSort=function(P){d=P},this.getClearColor=function(P){return P.copy(Y0.getClearColor())},this.setClearColor=function(){Y0.setClearColor.apply(Y0,arguments)},this.getClearAlpha=function(){return Y0.getClearAlpha()},this.setClearAlpha=function(){Y0.setClearAlpha.apply(Y0,arguments)},this.clear=function(P=!0,p=!0,a=!0){let e=0;if(P){let o=!1;if(L!==null){let P0=L.texture.format;o=P0===1033||P0===1031||P0===1029}if(o){let P0=L.texture.type,b0=P0===1009||P0===1014||P0===1012||P0===1020||P0===1017||P0===1018,m0=Y0.getClearColor(),d0=Y0.getClearAlpha(),i0=m0.r,c0=m0.g,n0=m0.b;if(b0)F[0]=i0,F[1]=c0,F[2]=n0,F[3]=d0,x.clearBufferuiv(x.COLOR,0,F);else G[0]=i0,G[1]=c0,G[2]=n0,G[3]=d0,x.clearBufferiv(x.COLOR,0,G)}else e|=x.COLOR_BUFFER_BIT}if(p)e|=x.DEPTH_BUFFER_BIT;if(a)e|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);x.clear(e)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){if($.removeEventListener("webglcontextlost",p0,!1),$.removeEventListener("webglcontextrestored",O0,!1),$.removeEventListener("webglcontextcreationerror",f,!1),V0.dispose(),A0.dispose(),N0.dispose(),_.dispose(),M.dispose(),Z0.dispose(),j.dispose(),$0.dispose(),U0.dispose(),C0.dispose(),C0.removeEventListener("sessionstart",VJ),C0.removeEventListener("sessionend",kJ),F0)F0.dispose(),F0=null;t0.stop()};function p0(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function O0(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;let P=z0.autoReset,p=h0.enabled,a=h0.autoUpdate,e=h0.needsUpdate,o=h0.type;E0(),z0.autoReset=P,h0.enabled=p,h0.autoUpdate=a,h0.needsUpdate=e,h0.type=o}function f(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function I0(P){let p=P.target;p.removeEventListener("dispose",I0),L0(p)}function L0(P){g0(P),N0.remove(P)}function g0(P){let p=N0.get(P).programs;if(p!==void 0){if(p.forEach(function(a){U0.releaseProgram(a)}),P.isShaderMaterial)U0.releaseShaderCache(P)}}this.renderBufferDirect=function(P,p,a,e,o,P0){if(p===null)p=w0;let b0=o.isMesh&&o.matrixWorld.determinant()<0,m0=oW(P,p,a,e,o);K0.setMaterial(e,b0);let d0=a.index,i0=1;if(e.wireframe===!0){if(d0=q0.getWireframeAttribute(a),d0===void 0)return;i0=2}let c0=a.drawRange,n0=a.attributes.position,PJ=c0.start*i0,X8=(c0.start+c0.count)*i0;if(P0!==null)PJ=Math.max(PJ,P0.start*i0),X8=Math.min(X8,(P0.start+P0.count)*i0);if(d0!==null)PJ=Math.max(PJ,0),X8=Math.min(X8,d0.count);else if(n0!==void 0&&n0!==null)PJ=Math.max(PJ,0),X8=Math.min(X8,n0.count);let bJ=X8-PJ;if(bJ<0||bJ===1/0)return;j.setup(o,e,m0,a,d0);let b8,RJ=l0;if(d0!==null)b8=s.get(d0),RJ=v0,RJ.setIndex(b8);if(o.isMesh)if(e.wireframe===!0)K0.setLineWidth(e.wireframeLinewidth*f0()),RJ.setMode(x.LINES);else RJ.setMode(x.TRIANGLES);else if(o.isLine){let o0=e.linewidth;if(o0===void 0)o0=1;if(K0.setLineWidth(o0*f0()),o.isLineSegments)RJ.setMode(x.LINES);else if(o.isLineLoop)RJ.setMode(x.LINE_LOOP);else RJ.setMode(x.LINE_STRIP)}else if(o.isPoints)RJ.setMode(x.POINTS);else if(o.isSprite)RJ.setMode(x.TRIANGLES);if(o.isBatchedMesh)RJ.renderMultiDraw(o._multiDrawStarts,o._multiDrawCounts,o._multiDrawCount);else if(o.isInstancedMesh)RJ.renderInstances(PJ,bJ,o.count);else if(a.isInstancedBufferGeometry){let o0=a._maxInstanceCount!==void 0?a._maxInstanceCount:1/0,_Q=Math.min(a.instanceCount,o0);RJ.renderInstances(PJ,bJ,_Q)}else RJ.render(PJ,bJ)};function j0(P,p,a){if(P.transparent===!0&&P.side===2&&P.forceSinglePass===!1)P.side=1,P.needsUpdate=!0,O$(P,p,a),P.side=0,P.needsUpdate=!0,O$(P,p,a),P.side=2;else O$(P,p,a)}this.compile=function(P,p,a=null){if(a===null)a=P;if(E=A0.get(a),E.init(),D.push(E),a.traverseVisible(function(o){if(o.isLight&&o.layers.test(p.layers)){if(E.pushLight(o),o.castShadow)E.pushShadow(o)}}),P!==a)P.traverseVisible(function(o){if(o.isLight&&o.layers.test(p.layers)){if(E.pushLight(o),o.castShadow)E.pushShadow(o)}});E.setupLights(R._useLegacyLights);let e=new Set;return P.traverse(function(o){let P0=o.material;if(P0)if(Array.isArray(P0))for(let b0=0;b0<P0.length;b0++){let m0=P0[b0];j0(m0,a,o),e.add(m0)}else j0(P0,a,o),e.add(P0)}),D.pop(),E=null,e},this.compileAsync=function(P,p,a=null){let e=this.compile(P,p,a);return new Promise((o)=>{function P0(){if(e.forEach(function(b0){if(N0.get(b0).currentProgram.isReady())e.delete(b0)}),e.size===0){o(P);return}setTimeout(P0,10)}if(X0.get("KHR_parallel_shader_compile")!==null)P0();else setTimeout(P0,10)})};let a0=null;function ZJ(P){if(a0)a0(P)}function VJ(){t0.stop()}function kJ(){t0.start()}let t0=new JK;if(t0.setAnimationLoop(ZJ),typeof self<"u")t0.setContext(self);this.setAnimationLoop=function(P){a0=P,C0.setAnimationLoop(P),P===null?t0.stop():t0.start()},C0.addEventListener("sessionstart",VJ),C0.addEventListener("sessionend",kJ),this.render=function(P,p){if(p!==void 0&&p.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(P.matrixWorldAutoUpdate===!0)P.updateMatrixWorld();if(p.parent===null&&p.matrixWorldAutoUpdate===!0)p.updateMatrixWorld();if(C0.enabled===!0&&C0.isPresenting===!0){if(C0.cameraAutoUpdate===!0)C0.updateCamera(p);p=C0.getCamera()}if(P.isScene===!0)P.onBeforeRender(R,P,p,L);if(E=A0.get(P,D.length),E.init(),D.push(E),R0.multiplyMatrices(p.projectionMatrix,p.matrixWorldInverse),g.setFromProjectionMatrix(R0),Q0=this.localClippingEnabled,t=T0.init(this.clippingPlanes,Q0),N=V0.get(P,O.length),N.init(),O.push(N),L8(P,p,0,R.sortObjects),N.finish(),R.sortObjects===!0)N.sort(l,d);if(this.info.render.frame++,t===!0)T0.beginShadows();let a=E.state.shadowsArray;if(h0.render(a,P,p),t===!0)T0.endShadows();if(this.info.autoReset===!0)this.info.reset();if(Y0.render(N,P),E.setupLights(R._useLegacyLights),p.isArrayCamera){let e=p.cameras;for(let o=0,P0=e.length;o<P0;o++){let b0=e[o];C8(N,P,b0,b0.viewport)}}else C8(N,P,p);if(L!==null)S0.updateMultisampleRenderTarget(L),S0.updateRenderTargetMipmap(L);if(P.isScene===!0)P.onAfterRender(R,P,p);if(j.resetDefaultState(),A=-1,w=null,D.pop(),D.length>0)E=D[D.length-1];else E=null;if(O.pop(),O.length>0)N=O[O.length-1];else N=null};function L8(P,p,a,e){if(P.visible===!1)return;if(P.layers.test(p.layers)){if(P.isGroup)a=P.renderOrder;else if(P.isLOD){if(P.autoUpdate===!0)P.update(p)}else if(P.isLight){if(E.pushLight(P),P.castShadow)E.pushShadow(P)}else if(P.isSprite){if(!P.frustumCulled||g.intersectsSprite(P)){if(e)u0.setFromMatrixPosition(P.matrixWorld).applyMatrix4(R0);let b0=Z0.update(P),m0=P.material;if(m0.visible)N.push(P,b0,m0,a,u0.z,null)}}else if(P.isMesh||P.isLine||P.isPoints){if(!P.frustumCulled||g.intersectsObject(P)){let b0=Z0.update(P),m0=P.material;if(e){if(P.boundingSphere!==void 0){if(P.boundingSphere===null)P.computeBoundingSphere();u0.copy(P.boundingSphere.center)}else{if(b0.boundingSphere===null)b0.computeBoundingSphere();u0.copy(b0.boundingSphere.center)}u0.applyMatrix4(P.matrixWorld).applyMatrix4(R0)}if(Array.isArray(m0)){let d0=b0.groups;for(let i0=0,c0=d0.length;i0<c0;i0++){let n0=d0[i0],PJ=m0[n0.materialIndex];if(PJ&&PJ.visible)N.push(P,b0,PJ,a,u0.z,n0)}}else if(m0.visible)N.push(P,b0,m0,a,u0.z,null)}}}let P0=P.children;for(let b0=0,m0=P0.length;b0<m0;b0++)L8(P0[b0],p,a,e)}function C8(P,p,a,e){let{opaque:o,transmissive:P0,transparent:b0}=P;if(E.setupLightsView(a),t===!0)T0.setGlobalState(R.clippingPlanes,a);if(P0.length>0)iW(o,P0,p,a);if(e)K0.viewport(I.copy(e));if(o.length>0)G$(o,p,a);if(P0.length>0)G$(P0,p,a);if(b0.length>0)G$(b0,p,a);K0.buffers.depth.setTest(!0),K0.buffers.depth.setMask(!0),K0.buffers.color.setMask(!0),K0.setPolygonOffset(!1)}function iW(P,p,a,e){if((a.isScene===!0?a.overrideMaterial:null)!==null)return;let P0=W0.isWebGL2;if(F0===null)F0=new $9(1,1,{generateMipmaps:!0,type:X0.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:P0?4:0});if(R.getDrawingBufferSize(x0),P0)F0.setSize(x0.x,x0.y);else F0.setSize(i$(x0.x),i$(x0.y));let b0=R.getRenderTarget();if(R.setRenderTarget(F0),R.getClearColor(n),i=R.getClearAlpha(),i<1)R.setClearColor(16777215,0.5);R.clear();let m0=R.toneMapping;R.toneMapping=0,G$(P,a,e),S0.updateMultisampleRenderTarget(F0),S0.updateRenderTargetMipmap(F0);let d0=!1;for(let i0=0,c0=p.length;i0<c0;i0++){let n0=p[i0],PJ=n0.object,X8=n0.geometry,bJ=n0.material,b8=n0.group;if(bJ.side===2&&PJ.layers.test(e.layers)){let RJ=bJ.side;bJ.side=1,bJ.needsUpdate=!0,v5(PJ,a,e,X8,bJ,b8),bJ.side=RJ,bJ.needsUpdate=!0,d0=!0}}if(d0===!0)S0.updateMultisampleRenderTarget(F0),S0.updateRenderTargetMipmap(F0);R.setRenderTarget(b0),R.setClearColor(n,i),R.toneMapping=m0}function G$(P,p,a){let e=p.isScene===!0?p.overrideMaterial:null;for(let o=0,P0=P.length;o<P0;o++){let b0=P[o],m0=b0.object,d0=b0.geometry,i0=e===null?b0.material:e,c0=b0.group;if(m0.layers.test(a.layers))v5(m0,p,a,d0,i0,c0)}}function v5(P,p,a,e,o,P0){if(P.onBeforeRender(R,p,a,e,o,P0),P.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),o.onBeforeRender(R,p,a,e,P,P0),o.transparent===!0&&o.side===2&&o.forceSinglePass===!1)o.side=1,o.needsUpdate=!0,R.renderBufferDirect(a,p,e,o,P,P0),o.side=0,o.needsUpdate=!0,R.renderBufferDirect(a,p,e,o,P,P0),o.side=2;else R.renderBufferDirect(a,p,e,o,P,P0);P.onAfterRender(R,p,a,e,o,P0)}function O$(P,p,a){if(p.isScene!==!0)p=w0;let e=N0.get(P),o=E.state.lights,P0=E.state.shadowsArray,b0=o.state.version,m0=U0.getParameters(P,o.state,P0,p,a),d0=U0.getProgramCacheKey(m0),i0=e.programs;if(e.environment=P.isMeshStandardMaterial?p.environment:null,e.fog=p.fog,e.envMap=(P.isMeshStandardMaterial?M:_).get(P.envMap||e.environment),i0===void 0)P.addEventListener("dispose",I0),i0=new Map,e.programs=i0;let c0=i0.get(d0);if(c0!==void 0){if(e.currentProgram===c0&&e.lightsStateVersion===b0)return m5(P,m0),c0}else m0.uniforms=U0.getUniforms(P),P.onBuild(a,m0,R),P.onBeforeCompile(m0,R),c0=U0.acquireProgram(m0,d0),i0.set(d0,c0),e.uniforms=m0.uniforms;let n0=e.uniforms;if(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)n0.clippingPlanes=T0.uniform;if(m5(P,m0),e.needsLights=aW(P),e.lightsStateVersion=b0,e.needsLights)n0.ambientLightColor.value=o.state.ambient,n0.lightProbe.value=o.state.probe,n0.directionalLights.value=o.state.directional,n0.directionalLightShadows.value=o.state.directionalShadow,n0.spotLights.value=o.state.spot,n0.spotLightShadows.value=o.state.spotShadow,n0.rectAreaLights.value=o.state.rectArea,n0.ltc_1.value=o.state.rectAreaLTC1,n0.ltc_2.value=o.state.rectAreaLTC2,n0.pointLights.value=o.state.point,n0.pointLightShadows.value=o.state.pointShadow,n0.hemisphereLights.value=o.state.hemi,n0.directionalShadowMap.value=o.state.directionalShadowMap,n0.directionalShadowMatrix.value=o.state.directionalShadowMatrix,n0.spotShadowMap.value=o.state.spotShadowMap,n0.spotLightMatrix.value=o.state.spotLightMatrix,n0.spotLightMap.value=o.state.spotLightMap,n0.pointShadowMap.value=o.state.pointShadowMap,n0.pointShadowMatrix.value=o.state.pointShadowMatrix;return e.currentProgram=c0,e.uniformsList=null,c0}function g5(P){if(P.uniformsList===null){let p=P.currentProgram.getUniforms();P.uniformsList=h7.seqWithValue(p.seq,P.uniforms)}return P.uniformsList}function m5(P,p){let a=N0.get(P);a.outputColorSpace=p.outputColorSpace,a.batching=p.batching,a.instancing=p.instancing,a.instancingColor=p.instancingColor,a.skinning=p.skinning,a.morphTargets=p.morphTargets,a.morphNormals=p.morphNormals,a.morphColors=p.morphColors,a.morphTargetsCount=p.morphTargetsCount,a.numClippingPlanes=p.numClippingPlanes,a.numIntersection=p.numClipIntersection,a.vertexAlphas=p.vertexAlphas,a.vertexTangents=p.vertexTangents,a.toneMapping=p.toneMapping}function oW(P,p,a,e,o){if(p.isScene!==!0)p=w0;S0.resetTextureUnits();let P0=p.fog,b0=e.isMeshStandardMaterial?p.environment:null,m0=L===null?R.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:"srgb-linear",d0=(e.isMeshStandardMaterial?M:_).get(e.envMap||b0),i0=e.vertexColors===!0&&!!a.attributes.color&&a.attributes.color.itemSize===4,c0=!!a.attributes.tangent&&(!!e.normalMap||e.anisotropy>0),n0=!!a.morphAttributes.position,PJ=!!a.morphAttributes.normal,X8=!!a.morphAttributes.color,bJ=0;if(e.toneMapped){if(L===null||L.isXRRenderTarget===!0)bJ=R.toneMapping}let b8=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,RJ=b8!==void 0?b8.length:0,o0=N0.get(e),_Q=E.state.lights;if(t===!0){if(Q0===!0||P!==w){let V8=P===w&&e.id===A;T0.setState(e,P,V8)}}let CJ=!1;if(e.version===o0.__version){if(o0.needsLights&&o0.lightsStateVersion!==_Q.state.version)CJ=!0;else if(o0.outputColorSpace!==m0)CJ=!0;else if(o.isBatchedMesh&&o0.batching===!1)CJ=!0;else if(!o.isBatchedMesh&&o0.batching===!0)CJ=!0;else if(o.isInstancedMesh&&o0.instancing===!1)CJ=!0;else if(!o.isInstancedMesh&&o0.instancing===!0)CJ=!0;else if(o.isSkinnedMesh&&o0.skinning===!1)CJ=!0;else if(!o.isSkinnedMesh&&o0.skinning===!0)CJ=!0;else if(o.isInstancedMesh&&o0.instancingColor===!0&&o.instanceColor===null)CJ=!0;else if(o.isInstancedMesh&&o0.instancingColor===!1&&o.instanceColor!==null)CJ=!0;else if(o0.envMap!==d0)CJ=!0;else if(e.fog===!0&&o0.fog!==P0)CJ=!0;else if(o0.numClippingPlanes!==void 0&&(o0.numClippingPlanes!==T0.numPlanes||o0.numIntersection!==T0.numIntersection))CJ=!0;else if(o0.vertexAlphas!==i0)CJ=!0;else if(o0.vertexTangents!==c0)CJ=!0;else if(o0.morphTargets!==n0)CJ=!0;else if(o0.morphNormals!==PJ)CJ=!0;else if(o0.morphColors!==X8)CJ=!0;else if(o0.toneMapping!==bJ)CJ=!0;else if(W0.isWebGL2===!0&&o0.morphTargetsCount!==RJ)CJ=!0}else CJ=!0,o0.__version=e.version;let V9=o0.currentProgram;if(CJ===!0)V9=O$(e,p,o);let u5=!1,M7=!1,wQ=!1,uJ=V9.getUniforms(),G9=o0.uniforms;if(K0.useProgram(V9.program))u5=!0,M7=!0,wQ=!0;if(e.id!==A)A=e.id,M7=!0;if(u5||w!==P){uJ.setValue(x,"projectionMatrix",P.projectionMatrix),uJ.setValue(x,"viewMatrix",P.matrixWorldInverse);let V8=uJ.map.cameraPosition;if(V8!==void 0)V8.setValue(x,u0.setFromMatrixPosition(P.matrixWorld));if(W0.logarithmicDepthBuffer)uJ.setValue(x,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2));if(e.isMeshPhongMaterial||e.isMeshToonMaterial||e.isMeshLambertMaterial||e.isMeshBasicMaterial||e.isMeshStandardMaterial||e.isShaderMaterial)uJ.setValue(x,"isOrthographic",P.isOrthographicCamera===!0);if(w!==P)w=P,M7=!0,wQ=!0}if(o.isSkinnedMesh){uJ.setOptional(x,o,"bindMatrix"),uJ.setOptional(x,o,"bindMatrixInverse");let V8=o.skeleton;if(V8)if(W0.floatVertexTextures){if(V8.boneTexture===null)V8.computeBoneTexture();uJ.setValue(x,"boneTexture",V8.boneTexture,S0)}else console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.")}if(o.isBatchedMesh)uJ.setOptional(x,o,"batchingTexture"),uJ.setValue(x,"batchingTexture",o._matricesTexture,S0);let TQ=a.morphAttributes;if(TQ.position!==void 0||TQ.normal!==void 0||TQ.color!==void 0&&W0.isWebGL2===!0)OJ.update(o,a,V9);if(M7||o0.receiveShadow!==o.receiveShadow)o0.receiveShadow=o.receiveShadow,uJ.setValue(x,"receiveShadow",o.receiveShadow);if(e.isMeshGouraudMaterial&&e.envMap!==null)G9.envMap.value=d0,G9.flipEnvMap.value=d0.isCubeTexture&&d0.isRenderTargetTexture===!1?-1:1;if(M7){if(uJ.setValue(x,"toneMappingExposure",R.toneMappingExposure),o0.needsLights)rW(G9,wQ);if(P0&&e.fog===!0)y0.refreshFogUniforms(G9,P0);y0.refreshMaterialUniforms(G9,e,m,h,F0),h7.upload(x,g5(o0),G9,S0)}if(e.isShaderMaterial&&e.uniformsNeedUpdate===!0)h7.upload(x,g5(o0),G9,S0),e.uniformsNeedUpdate=!1;if(e.isSpriteMaterial)uJ.setValue(x,"center",o.center);if(uJ.setValue(x,"modelViewMatrix",o.modelViewMatrix),uJ.setValue(x,"normalMatrix",o.normalMatrix),uJ.setValue(x,"modelMatrix",o.matrixWorld),e.isShaderMaterial||e.isRawShaderMaterial){let V8=e.uniformsGroups;for(let jQ=0,tW=V8.length;jQ<tW;jQ++)if(W0.isWebGL2){let d5=V8[jQ];$0.update(d5,V9),$0.bind(d5,V9)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return V9}function rW(P,p){P.ambientLightColor.needsUpdate=p,P.lightProbe.needsUpdate=p,P.directionalLights.needsUpdate=p,P.directionalLightShadows.needsUpdate=p,P.pointLights.needsUpdate=p,P.pointLightShadows.needsUpdate=p,P.spotLights.needsUpdate=p,P.spotLightShadows.needsUpdate=p,P.rectAreaLights.needsUpdate=p,P.hemisphereLights.needsUpdate=p}function aW(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}if(this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(P,p,a){N0.get(P.texture).__webglTexture=p,N0.get(P.depthTexture).__webglTexture=a;let e=N0.get(P);if(e.__hasExternalTextures=!0,e.__hasExternalTextures){if(e.__autoAllocateDepthBuffer=a===void 0,!e.__autoAllocateDepthBuffer){if(X0.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),e.__useRenderToTexture=!1}}},this.setRenderTargetFramebuffer=function(P,p){let a=N0.get(P);a.__webglFramebuffer=p,a.__useDefaultFramebuffer=p===void 0},this.setRenderTarget=function(P,p=0,a=0){L=P,z=p,C=a;let e=!0,o=null,P0=!1,b0=!1;if(P){let d0=N0.get(P);if(d0.__useDefaultFramebuffer!==void 0)K0.bindFramebuffer(x.FRAMEBUFFER,null),e=!1;else if(d0.__webglFramebuffer===void 0)S0.setupRenderTarget(P);else if(d0.__hasExternalTextures)S0.rebindTextures(P,N0.get(P.texture).__webglTexture,N0.get(P.depthTexture).__webglTexture);let i0=P.texture;if(i0.isData3DTexture||i0.isDataArrayTexture||i0.isCompressedArrayTexture)b0=!0;let c0=N0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget){if(Array.isArray(c0[p]))o=c0[p][a];else o=c0[p];P0=!0}else if(W0.isWebGL2&&P.samples>0&&S0.useMultisampledRTT(P)===!1)o=N0.get(P).__webglMultisampledFramebuffer;else if(Array.isArray(c0))o=c0[a];else o=c0;I.copy(P.viewport),k.copy(P.scissor),b=P.scissorTest}else I.copy(v).multiplyScalar(m).floor(),k.copy(u).multiplyScalar(m).floor(),b=r;if(K0.bindFramebuffer(x.FRAMEBUFFER,o)&&W0.drawBuffers&&e)K0.drawBuffers(P,o);if(K0.viewport(I),K0.scissor(k),K0.setScissorTest(b),P0){let d0=N0.get(P.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+p,d0.__webglTexture,a)}else if(b0){let d0=N0.get(P.texture),i0=p||0;x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,d0.__webglTexture,a||0,i0)}A=-1},this.readRenderTargetPixels=function(P,p,a,e,o,P0,b0){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let m0=N0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&b0!==void 0)m0=m0[b0];if(m0){K0.bindFramebuffer(x.FRAMEBUFFER,m0);try{let d0=P.texture,i0=d0.format,c0=d0.type;if(i0!==1023&&M0.convert(i0)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let n0=c0===1016&&(X0.has("EXT_color_buffer_half_float")||W0.isWebGL2&&X0.has("EXT_color_buffer_float"));if(c0!==1009&&M0.convert(c0)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_TYPE)&&!(c0===1015&&(W0.isWebGL2||X0.has("OES_texture_float")||X0.has("WEBGL_color_buffer_float")))&&!n0){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(p>=0&&p<=P.width-e&&(a>=0&&a<=P.height-o))x.readPixels(p,a,e,o,M0.convert(i0),M0.convert(c0),P0)}finally{let d0=L!==null?N0.get(L).__webglFramebuffer:null;K0.bindFramebuffer(x.FRAMEBUFFER,d0)}}},this.copyFramebufferToTexture=function(P,p,a=0){let e=Math.pow(2,-a),o=Math.floor(p.image.width*e),P0=Math.floor(p.image.height*e);S0.setTexture2D(p,0),x.copyTexSubImage2D(x.TEXTURE_2D,a,0,0,P.x,P.y,o,P0),K0.unbindTexture()},this.copyTextureToTexture=function(P,p,a,e=0){let o=p.image.width,P0=p.image.height,b0=M0.convert(a.format),m0=M0.convert(a.type);if(S0.setTexture2D(a,0),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,a.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,a.unpackAlignment),p.isDataTexture)x.texSubImage2D(x.TEXTURE_2D,e,P.x,P.y,o,P0,b0,m0,p.image.data);else if(p.isCompressedTexture)x.compressedTexSubImage2D(x.TEXTURE_2D,e,P.x,P.y,p.mipmaps[0].width,p.mipmaps[0].height,b0,p.mipmaps[0].data);else x.texSubImage2D(x.TEXTURE_2D,e,P.x,P.y,b0,m0,p.image);if(e===0&&a.generateMipmaps)x.generateMipmap(x.TEXTURE_2D);K0.unbindTexture()},this.copyTextureToTexture3D=function(P,p,a,e,o=0){if(R.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let P0=P.max.x-P.min.x+1,b0=P.max.y-P.min.y+1,m0=P.max.z-P.min.z+1,d0=M0.convert(e.format),i0=M0.convert(e.type),c0;if(e.isData3DTexture)S0.setTexture3D(e,0),c0=x.TEXTURE_3D;else if(e.isDataArrayTexture||e.isCompressedArrayTexture)S0.setTexture2DArray(e,0),c0=x.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,e.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,e.unpackAlignment);let n0=x.getParameter(x.UNPACK_ROW_LENGTH),PJ=x.getParameter(x.UNPACK_IMAGE_HEIGHT),X8=x.getParameter(x.UNPACK_SKIP_PIXELS),bJ=x.getParameter(x.UNPACK_SKIP_ROWS),b8=x.getParameter(x.UNPACK_SKIP_IMAGES),RJ=a.isCompressedTexture?a.mipmaps[o]:a.image;if(x.pixelStorei(x.UNPACK_ROW_LENGTH,RJ.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,RJ.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,P.min.x),x.pixelStorei(x.UNPACK_SKIP_ROWS,P.min.y),x.pixelStorei(x.UNPACK_SKIP_IMAGES,P.min.z),a.isDataTexture||a.isData3DTexture)x.texSubImage3D(c0,o,p.x,p.y,p.z,P0,b0,m0,d0,i0,RJ.data);else if(a.isCompressedArrayTexture)console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),x.compressedTexSubImage3D(c0,o,p.x,p.y,p.z,P0,b0,m0,d0,RJ.data);else x.texSubImage3D(c0,o,p.x,p.y,p.z,P0,b0,m0,d0,i0,RJ);if(x.pixelStorei(x.UNPACK_ROW_LENGTH,n0),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,PJ),x.pixelStorei(x.UNPACK_SKIP_PIXELS,X8),x.pixelStorei(x.UNPACK_SKIP_ROWS,bJ),x.pixelStorei(x.UNPACK_SKIP_IMAGES,b8),o===0&&e.generateMipmaps)x.generateMipmap(c0);K0.unbindTexture()},this.initTexture=function(P){if(P.isCubeTexture)S0.setTextureCube(P,0);else if(P.isData3DTexture)S0.setTexture3D(P,0);else if(P.isDataArrayTexture||P.isCompressedArrayTexture)S0.setTexture2DArray(P,0);else S0.setTexture2D(P,0);K0.unbindTexture()},this.resetState=function(){z=0,C=0,L=null,K0.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2000}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=J==="display-p3"?"display-p3":"srgb",$.unpackColorSpace=XJ.workingColorSpace==="display-p3-linear"?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace==="srgb"?3001:3000}set outputEncoding(J){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=J===3001?"srgb":"srgb-linear"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(J){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=J}}class DK extends ZQ{}DK.prototype.isWebGL1Renderer=!0;class SZ extends EJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)$.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)$.object.backgroundIntensity=this.backgroundIntensity;return $}}class EK{constructor(J,$){this.isInterleavedBuffer=!0,this.array=J,this.stride=$,this.count=J!==void 0?J.length/$:0,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=P8()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,$,Q){J*=this.stride,Q*=$.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}set(J,$=0){return this.array.set(J,$),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=P8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let $=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Q=new this.constructor($,this.stride);return Q.setUsage(this.usage),Q}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=P8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var iJ=new T;class r${constructor(J,$,Q,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=$,this.offset=Q,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let $=0,Q=this.data.count;$<Q;$++)iJ.fromBufferAttribute(this,$),iJ.applyMatrix4(J),this.setXYZ($,iJ.x,iJ.y,iJ.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)iJ.fromBufferAttribute(this,$),iJ.applyNormalMatrix(J),this.setXYZ($,iJ.x,iJ.y,iJ.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)iJ.fromBufferAttribute(this,$),iJ.transformDirection(J),this.setXYZ($,iJ.x,iJ.y,iJ.z);return this}setX(J,$){if(this.normalized)$=KJ($,this.array);return this.data.array[J*this.data.stride+this.offset]=$,this}setY(J,$){if(this.normalized)$=KJ($,this.array);return this.data.array[J*this.data.stride+this.offset+1]=$,this}setZ(J,$){if(this.normalized)$=KJ($,this.array);return this.data.array[J*this.data.stride+this.offset+2]=$,this}setW(J,$){if(this.normalized)$=KJ($,this.array);return this.data.array[J*this.data.stride+this.offset+3]=$,this}getX(J){let $=this.data.array[J*this.data.stride+this.offset];if(this.normalized)$=k8($,this.array);return $}getY(J){let $=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)$=k8($,this.array);return $}getZ(J){let $=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)$=k8($,this.array);return $}getW(J){let $=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)$=k8($,this.array);return $}setXY(J,$,Q){if(J=J*this.data.stride+this.offset,this.normalized)$=KJ($,this.array),Q=KJ(Q,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J=J*this.data.stride+this.offset,this.normalized)$=KJ($,this.array),Q=KJ(Q,this.array),Z=KJ(Z,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)$=KJ($,this.array),Q=KJ(Q,this.array),Z=KJ(Z,this.array),K=KJ(K,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return new vJ(new this.array.constructor($),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new r$(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:$,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class KQ extends d8{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new e0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var a9,w7=new T,t9=new T,e9=new T,J7=new H0,T7=new H0,NK=new UJ,h$=new T,j7=new T,v$=new T,P6=new H0,QZ=new H0,S6=new H0;class _Z extends EJ{constructor(J=new KQ){super();if(this.isSprite=!0,this.type="Sprite",a9===void 0){a9=new GJ;let $=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Q=new EK($,5);a9.setIndex([0,1,2,0,2,3]),a9.setAttribute("position",new r$(Q,3,0,!1)),a9.setAttribute("uv",new r$(Q,2,3,!1))}this.geometry=a9,this.material=J,this.center=new H0(0.5,0.5)}raycast(J,$){if(J.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(t9.setFromMatrixScale(this.matrixWorld),NK.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),e9.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)t9.multiplyScalar(-e9.z);let Q=this.material.rotation,Z,K;if(Q!==0)K=Math.cos(Q),Z=Math.sin(Q);let W=this.center;g$(h$.set(-0.5,-0.5,0),e9,W,t9,Z,K),g$(j7.set(0.5,-0.5,0),e9,W,t9,Z,K),g$(v$.set(0.5,0.5,0),e9,W,t9,Z,K),P6.set(0,0),QZ.set(1,0),S6.set(1,1);let Y=J.ray.intersectTriangle(h$,j7,v$,!1,w7);if(Y===null){if(g$(j7.set(-0.5,0.5,0),e9,W,t9,Z,K),QZ.set(0,1),Y=J.ray.intersectTriangle(h$,v$,j7,!1,w7),Y===null)return}let X=J.ray.origin.distanceTo(w7);if(X<J.near||X>J.far)return;$.push({distance:X,point:w7.clone(),uv:O8.getInterpolation(w7,h$,j7,v$,P6,QZ,S6,new H0),face:null,object:this})}copy(J,$){if(super.copy(J,$),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function g$(J,$,Q,Z,K,W){if(J7.subVectors(J,Q).addScalar(0.5).multiply(Z),K!==void 0)T7.x=W*J7.x-K*J7.y,T7.y=K*J7.x+W*J7.y;else T7.copy(J7);J.copy($),J.x+=T7.x,J.y+=T7.y,J.applyMatrix4(NK)}class c7 extends d8{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new e0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var _6=new T,w6=new T,T6=new UJ,ZZ=new A9,m$=new H7;class RK extends EJ{constructor(J=new GJ,$=new c7){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[0];for(let Z=1,K=$.count;Z<K;Z++)_6.fromBufferAttribute($,Z-1),w6.fromBufferAttribute($,Z),Q[Z]=Q[Z-1],Q[Z]+=_6.distanceTo(w6);J.setAttribute("lineDistance",new $J(Q,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,W=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(m$.copy(Q.boundingSphere),m$.applyMatrix4(Z),m$.radius+=K,J.ray.intersectsSphere(m$)===!1)return;T6.copy(Z).invert(),ZZ.copy(J.ray).applyMatrix4(T6);let Y=K/((this.scale.x+this.scale.y+this.scale.z)/3),X=Y*Y,H=new T,q=new T,U=new T,V=new T,F=this.isLineSegments?2:1,G=Q.index,E=Q.attributes.position;if(G!==null){let O=Math.max(0,W.start),D=Math.min(G.count,W.start+W.count);for(let R=O,B=D-1;R<B;R+=F){let z=G.getX(R),C=G.getX(R+1);if(H.fromBufferAttribute(E,z),q.fromBufferAttribute(E,C),ZZ.distanceSqToSegment(H,q,V,U)>X)continue;V.applyMatrix4(this.matrixWorld);let A=J.ray.origin.distanceTo(V);if(A<J.near||A>J.far)continue;$.push({distance:A,point:U.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}else{let O=Math.max(0,W.start),D=Math.min(E.count,W.start+W.count);for(let R=O,B=D-1;R<B;R+=F){if(H.fromBufferAttribute(E,R),q.fromBufferAttribute(E,R+1),ZZ.distanceSqToSegment(H,q,V,U)>X)continue;V.applyMatrix4(this.matrixWorld);let C=J.ray.origin.distanceTo(V);if(C<J.near||C>J.far)continue;$.push({distance:C,point:U.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let Y=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}}var j6=new T,y6=new T;class WQ extends RK{constructor(J,$){super(J,$);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[];for(let Z=0,K=$.count;Z<K;Z+=2)j6.fromBufferAttribute($,Z),y6.fromBufferAttribute($,Z+1),Q[Z]=Z===0?0:Q[Z-1],Q[Z+1]=Q[Z]+j6.distanceTo(y6);J.setAttribute("lineDistance",new $J(Q,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class M9 extends d8{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new e0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var x6=new UJ,VZ=new A9,u$=new H7,d$=new T;class U7 extends EJ{constructor(J=new GJ,$=new M9){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Points.threshold,W=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(u$.copy(Q.boundingSphere),u$.applyMatrix4(Z),u$.radius+=K,J.ray.intersectsSphere(u$)===!1)return;x6.copy(Z).invert(),VZ.copy(J.ray).applyMatrix4(x6);let Y=K/((this.scale.x+this.scale.y+this.scale.z)/3),X=Y*Y,H=Q.index,U=Q.attributes.position;if(H!==null){let V=Math.max(0,W.start),F=Math.min(H.count,W.start+W.count);for(let G=V,N=F;G<N;G++){let E=H.getX(G);d$.fromBufferAttribute(U,E),b6(d$,E,X,Z,J,$,this)}}else{let V=Math.max(0,W.start),F=Math.min(U.count,W.start+W.count);for(let G=V,N=F;G<N;G++)d$.fromBufferAttribute(U,G),b6(d$,G,X,Z,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let Y=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}}function b6(J,$,Q,Z,K,W,Y){let X=VZ.distanceSqToPoint(J);if(X<Q){let H=new T;VZ.closestPointToPoint(J,H),H.applyMatrix4(Z);let q=K.ray.origin.distanceTo(H);if(q<K.near||q>K.far)return;W.push({distance:q,distanceToRay:Math.sqrt(X),point:H,index:$,face:null,object:Y})}}class p8 extends tJ{constructor(J,$,Q,Z,K,W,Y,X,H){super(J,$,Q,Z,K,W,Y,X,H);this.isCanvasTexture=!0,this.needsUpdate=!0}}class I8{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(J,$){let Q=this.getUtoTmapping(J);return this.getPoint(Q,$)}getPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPoint(Q/J));return $}getSpacedPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPointAt(Q/J));return $}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let $=[],Q,Z=this.getPoint(0),K=0;$.push(0);for(let W=1;W<=J;W++)Q=this.getPoint(W/J),K+=Q.distanceTo(Z),$.push(K),Z=Q;return this.cacheArcLengths=$,$}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,$){let Q=this.getLengths(),Z=0,K=Q.length,W;if($)W=$;else W=J*Q[K-1];let Y=0,X=K-1,H;while(Y<=X)if(Z=Math.floor(Y+(X-Y)/2),H=Q[Z]-W,H<0)Y=Z+1;else if(H>0)X=Z-1;else{X=Z;break}if(Z=X,Q[Z]===W)return Z/(K-1);let q=Q[Z],V=Q[Z+1]-q,F=(W-q)/V;return(Z+F)/(K-1)}getTangent(J,$){let Z=J-0.0001,K=J+0.0001;if(Z<0)Z=0;if(K>1)K=1;let W=this.getPoint(Z),Y=this.getPoint(K),X=$||(W.isVector2?new H0:new T);return X.copy(Y).sub(W).normalize(),X}getTangentAt(J,$){let Q=this.getUtoTmapping(J);return this.getTangent(Q,$)}computeFrenetFrames(J,$){let Q=new T,Z=[],K=[],W=[],Y=new T,X=new UJ;for(let F=0;F<=J;F++){let G=F/J;Z[F]=this.getTangentAt(G,new T)}K[0]=new T,W[0]=new T;let H=Number.MAX_VALUE,q=Math.abs(Z[0].x),U=Math.abs(Z[0].y),V=Math.abs(Z[0].z);if(q<=H)H=q,Q.set(1,0,0);if(U<=H)H=U,Q.set(0,1,0);if(V<=H)Q.set(0,0,1);Y.crossVectors(Z[0],Q).normalize(),K[0].crossVectors(Z[0],Y),W[0].crossVectors(Z[0],K[0]);for(let F=1;F<=J;F++){if(K[F]=K[F-1].clone(),W[F]=W[F-1].clone(),Y.crossVectors(Z[F-1],Z[F]),Y.length()>Number.EPSILON){Y.normalize();let G=Math.acos(hJ(Z[F-1].dot(Z[F]),-1,1));K[F].applyMatrix4(X.makeRotationAxis(Y,G))}W[F].crossVectors(Z[F],K[F])}if($===!0){let F=Math.acos(hJ(K[0].dot(K[J]),-1,1));if(F/=J,Z[0].dot(Y.crossVectors(K[0],K[J]))>0)F=-F;for(let G=1;G<=J;G++)K[G].applyMatrix4(X.makeRotationAxis(Z[G],F*G)),W[G].crossVectors(Z[G],K[G])}return{tangents:Z,normals:K,binormals:W}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class XQ extends I8{constructor(J=0,$=0,Q=1,Z=1,K=0,W=Math.PI*2,Y=!1,X=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=$,this.xRadius=Q,this.yRadius=Z,this.aStartAngle=K,this.aEndAngle=W,this.aClockwise=Y,this.aRotation=X}getPoint(J,$){let Q=$||new H0,Z=Math.PI*2,K=this.aEndAngle-this.aStartAngle,W=Math.abs(K)<Number.EPSILON;while(K<0)K+=Z;while(K>Z)K-=Z;if(K<Number.EPSILON)if(W)K=0;else K=Z;if(this.aClockwise===!0&&!W)if(K===Z)K=-Z;else K=K-Z;let Y=this.aStartAngle+J*K,X=this.aX+this.xRadius*Math.cos(Y),H=this.aY+this.yRadius*Math.sin(Y);if(this.aRotation!==0){let q=Math.cos(this.aRotation),U=Math.sin(this.aRotation),V=X-this.aX,F=H-this.aY;X=V*q-F*U+this.aX,H=V*U+F*q+this.aY}return Q.set(X,H)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class BK extends XQ{constructor(J,$,Q,Z,K,W){super(J,$,Q,Q,Z,K,W);this.isArcCurve=!0,this.type="ArcCurve"}}function wZ(){let J=0,$=0,Q=0,Z=0;function K(W,Y,X,H){J=W,$=X,Q=-3*W+3*Y-2*X-H,Z=2*W-2*Y+X+H}return{initCatmullRom:function(W,Y,X,H,q){K(Y,X,q*(X-W),q*(H-Y))},initNonuniformCatmullRom:function(W,Y,X,H,q,U,V){let F=(Y-W)/q-(X-W)/(q+U)+(X-Y)/U,G=(X-Y)/U-(H-Y)/(U+V)+(H-X)/V;F*=U,G*=U,K(Y,X,F,G)},calc:function(W){let Y=W*W,X=Y*W;return J+$*W+Q*Y+Z*X}}}var p$=new T,KZ=new wZ,WZ=new wZ,XZ=new wZ;class F7 extends I8{constructor(J=[],$=!1,Q="centripetal",Z=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=$,this.curveType=Q,this.tension=Z}getPoint(J,$=new T){let Q=$,Z=this.points,K=Z.length,W=(K-(this.closed?0:1))*J,Y=Math.floor(W),X=W-Y;if(this.closed)Y+=Y>0?0:(Math.floor(Math.abs(Y)/K)+1)*K;else if(X===0&&Y===K-1)Y=K-2,X=1;let H,q;if(this.closed||Y>0)H=Z[(Y-1)%K];else p$.subVectors(Z[0],Z[1]).add(Z[0]),H=p$;let U=Z[Y%K],V=Z[(Y+1)%K];if(this.closed||Y+2<K)q=Z[(Y+2)%K];else p$.subVectors(Z[K-1],Z[K-2]).add(Z[K-1]),q=p$;if(this.curveType==="centripetal"||this.curveType==="chordal"){let F=this.curveType==="chordal"?0.5:0.25,G=Math.pow(H.distanceToSquared(U),F),N=Math.pow(U.distanceToSquared(V),F),E=Math.pow(V.distanceToSquared(q),F);if(N<0.0001)N=1;if(G<0.0001)G=N;if(E<0.0001)E=N;KZ.initNonuniformCatmullRom(H.x,U.x,V.x,q.x,G,N,E),WZ.initNonuniformCatmullRom(H.y,U.y,V.y,q.y,G,N,E),XZ.initNonuniformCatmullRom(H.z,U.z,V.z,q.z,G,N,E)}else if(this.curveType==="catmullrom")KZ.initCatmullRom(H.x,U.x,V.x,q.x,this.tension),WZ.initCatmullRom(H.y,U.y,V.y,q.y,this.tension),XZ.initCatmullRom(H.z,U.z,V.z,q.z,this.tension);return Q.set(KZ.calc(X),WZ.calc(X),XZ.calc(X)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new T().fromArray(Z))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function f6(J,$,Q,Z,K){let W=(Z-$)*0.5,Y=(K-Q)*0.5,X=J*J,H=J*X;return(2*Q-2*Z+W+Y)*H+(-3*Q+3*Z-2*W-Y)*X+W*J+Q}function W4(J,$){let Q=1-J;return Q*Q*$}function X4(J,$){return 2*(1-J)*J*$}function Y4(J,$){return J*J*$}function v7(J,$,Q,Z){return W4(J,$)+X4(J,Q)+Y4(J,Z)}function H4(J,$){let Q=1-J;return Q*Q*Q*$}function q4(J,$){let Q=1-J;return 3*Q*Q*J*$}function U4(J,$){return 3*(1-J)*J*J*$}function F4(J,$){return J*J*J*$}function g7(J,$,Q,Z,K){return H4(J,$)+q4(J,Q)+U4(J,Z)+F4(J,K)}class TZ extends I8{constructor(J=new H0,$=new H0,Q=new H0,Z=new H0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new H0){let Q=$,Z=this.v0,K=this.v1,W=this.v2,Y=this.v3;return Q.set(g7(J,Z.x,K.x,W.x,Y.x),g7(J,Z.y,K.y,W.y,Y.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class zK extends I8{constructor(J=new T,$=new T,Q=new T,Z=new T){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new T){let Q=$,Z=this.v0,K=this.v1,W=this.v2,Y=this.v3;return Q.set(g7(J,Z.x,K.x,W.x,Y.x),g7(J,Z.y,K.y,W.y,Y.y),g7(J,Z.z,K.z,W.z,Y.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class jZ extends I8{constructor(J=new H0,$=new H0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=$}getPoint(J,$=new H0){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new H0){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class IK extends I8{constructor(J=new T,$=new T){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=$}getPoint(J,$=new T){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new T){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class yZ extends I8{constructor(J=new H0,$=new H0,Q=new H0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new H0){let Q=$,Z=this.v0,K=this.v1,W=this.v2;return Q.set(v7(J,Z.x,K.x,W.x),v7(J,Z.y,K.y,W.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class xZ extends I8{constructor(J=new T,$=new T,Q=new T){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new T){let Q=$,Z=this.v0,K=this.v1,W=this.v2;return Q.set(v7(J,Z.x,K.x,W.x),v7(J,Z.y,K.y,W.y),v7(J,Z.z,K.z,W.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class bZ extends I8{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,$=new H0){let Q=$,Z=this.points,K=(Z.length-1)*J,W=Math.floor(K),Y=K-W,X=Z[W===0?W:W-1],H=Z[W],q=Z[W>Z.length-2?Z.length-1:W+1],U=Z[W>Z.length-3?Z.length-1:W+2];return Q.set(f6(Y,X.x,H.x,q.x,U.x),f6(Y,X.y,H.y,q.y,U.y)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new H0().fromArray(Z))}return this}}var a$=Object.freeze({__proto__:null,ArcCurve:BK,CatmullRomCurve3:F7,CubicBezierCurve:TZ,CubicBezierCurve3:zK,EllipseCurve:XQ,LineCurve:jZ,LineCurve3:IK,QuadraticBezierCurve:yZ,QuadraticBezierCurve3:xZ,SplineCurve:bZ});class LK extends I8{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),$=this.curves[this.curves.length-1].getPoint(1);if(!J.equals($)){let Q=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new a$[Q]($,J))}return this}getPoint(J,$){let Q=J*this.getLength(),Z=this.getCurveLengths(),K=0;while(K<Z.length){if(Z[K]>=Q){let W=Z[K]-Q,Y=this.curves[K],X=Y.getLength(),H=X===0?0:1-W/X;return Y.getPointAt(H,$)}K++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],$=0;for(let Q=0,Z=this.curves.length;Q<Z;Q++)$+=this.curves[Q].getLength(),J.push($);return this.cacheLengths=J,J}getSpacedPoints(J=40){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPoint(Q/J));if(this.autoClose)$.push($[0]);return $}getPoints(J=12){let $=[],Q;for(let Z=0,K=this.curves;Z<K.length;Z++){let W=K[Z],Y=W.isEllipseCurve?J*2:W.isLineCurve||W.isLineCurve3?1:W.isSplineCurve?J*W.points.length:J,X=W.getPoints(Y);for(let H=0;H<X.length;H++){let q=X[H];if(Q&&Q.equals(q))continue;$.push(q),Q=q}}if(this.autoClose&&$.length>1&&!$[$.length-1].equals($[0]))$.push($[0]);return $}copy(J){super.copy(J),this.curves=[];for(let $=0,Q=J.curves.length;$<Q;$++){let Z=J.curves[$];this.curves.push(Z.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let $=0,Q=this.curves.length;$<Q;$++){let Z=this.curves[$];J.curves.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let $=0,Q=J.curves.length;$<Q;$++){let Z=J.curves[$];this.curves.push(new a$[Z.type]().fromJSON(Z))}return this}}class GZ extends LK{constructor(J){super();if(this.type="Path",this.currentPoint=new H0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let $=1,Q=J.length;$<Q;$++)this.lineTo(J[$].x,J[$].y);return this}moveTo(J,$){return this.currentPoint.set(J,$),this}lineTo(J,$){let Q=new jZ(this.currentPoint.clone(),new H0(J,$));return this.curves.push(Q),this.currentPoint.set(J,$),this}quadraticCurveTo(J,$,Q,Z){let K=new yZ(this.currentPoint.clone(),new H0(J,$),new H0(Q,Z));return this.curves.push(K),this.currentPoint.set(Q,Z),this}bezierCurveTo(J,$,Q,Z,K,W){let Y=new TZ(this.currentPoint.clone(),new H0(J,$),new H0(Q,Z),new H0(K,W));return this.curves.push(Y),this.currentPoint.set(K,W),this}splineThru(J){let $=[this.currentPoint.clone()].concat(J),Q=new bZ($);return this.curves.push(Q),this.currentPoint.copy(J[J.length-1]),this}arc(J,$,Q,Z,K,W){let Y=this.currentPoint.x,X=this.currentPoint.y;return this.absarc(J+Y,$+X,Q,Z,K,W),this}absarc(J,$,Q,Z,K,W){return this.absellipse(J,$,Q,Q,Z,K,W),this}ellipse(J,$,Q,Z,K,W,Y,X){let H=this.currentPoint.x,q=this.currentPoint.y;return this.absellipse(J+H,$+q,Q,Z,K,W,Y,X),this}absellipse(J,$,Q,Z,K,W,Y,X){let H=new XQ(J,$,Q,Z,K,W,Y,X);if(this.curves.length>0){let U=H.getPoint(0);if(!U.equals(this.currentPoint))this.lineTo(U.x,U.y)}this.curves.push(H);let q=H.getPoint(1);return this.currentPoint.copy(q),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class n7 extends GJ{constructor(J=1,$=32,Q=0,Z=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:$,thetaStart:Q,thetaLength:Z},$=Math.max(3,$);let K=[],W=[],Y=[],X=[],H=new T,q=new H0;W.push(0,0,0),Y.push(0,0,1),X.push(0.5,0.5);for(let U=0,V=3;U<=$;U++,V+=3){let F=Q+U/$*Z;H.x=J*Math.cos(F),H.y=J*Math.sin(F),W.push(H.x,H.y,H.z),Y.push(0,0,1),q.x=(W[V]/J+1)/2,q.y=(W[V+1]/J+1)/2,X.push(q.x,q.y)}for(let U=1;U<=$;U++)K.push(U,U+1,0);this.setIndex(K),this.setAttribute("position",new $J(W,3)),this.setAttribute("normal",new $J(Y,3)),this.setAttribute("uv",new $J(X,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new n7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class k0 extends GJ{constructor(J=1,$=1,Q=1,Z=32,K=1,W=!1,Y=0,X=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:$,height:Q,radialSegments:Z,heightSegments:K,openEnded:W,thetaStart:Y,thetaLength:X};let H=this;Z=Math.floor(Z),K=Math.floor(K);let q=[],U=[],V=[],F=[],G=0,N=[],E=Q/2,O=0;if(D(),W===!1){if(J>0)R(!0);if($>0)R(!1)}this.setIndex(q),this.setAttribute("position",new $J(U,3)),this.setAttribute("normal",new $J(V,3)),this.setAttribute("uv",new $J(F,2));function D(){let B=new T,z=new T,C=0,L=($-J)/Q;for(let A=0;A<=K;A++){let w=[],I=A/K,k=I*($-J)+J;for(let b=0;b<=Z;b++){let n=b/Z,i=n*X+Y,y=Math.sin(i),h=Math.cos(i);z.x=k*y,z.y=-I*Q+E,z.z=k*h,U.push(z.x,z.y,z.z),B.set(y,L,h).normalize(),V.push(B.x,B.y,B.z),F.push(n,1-I),w.push(G++)}N.push(w)}for(let A=0;A<Z;A++)for(let w=0;w<K;w++){let I=N[w][A],k=N[w+1][A],b=N[w+1][A+1],n=N[w][A+1];q.push(I,k,n),q.push(k,b,n),C+=6}H.addGroup(O,C,0),O+=C}function R(B){let z=G,C=new H0,L=new T,A=0,w=B===!0?J:$,I=B===!0?1:-1;for(let b=1;b<=Z;b++)U.push(0,E*I,0),V.push(0,I,0),F.push(0.5,0.5),G++;let k=G;for(let b=0;b<=Z;b++){let i=b/Z*X+Y,y=Math.cos(i),h=Math.sin(i);L.x=w*h,L.y=E*I,L.z=w*y,U.push(L.x,L.y,L.z),V.push(0,I,0),C.x=y*0.5+0.5,C.y=h*0.5*I+0.5,F.push(C.x,C.y),G++}for(let b=0;b<Z;b++){let n=z+b,i=k+b;if(B===!0)q.push(i,i+1,n);else q.push(i+1,i,n);A+=3}H.addGroup(O,A,B===!0?1:2),O+=A}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new k0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class FJ extends k0{constructor(J=1,$=1,Q=32,Z=1,K=!1,W=0,Y=Math.PI*2){super(0,J,$,Q,Z,K,W,Y);this.type="ConeGeometry",this.parameters={radius:J,height:$,radialSegments:Q,heightSegments:Z,openEnded:K,thetaStart:W,thetaLength:Y}}static fromJSON(J){return new FJ(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class fZ extends GJ{constructor(J=[],$=[],Q=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:$,radius:Q,detail:Z};let K=[],W=[];if(Y(Z),H(Q),q(),this.setAttribute("position",new $J(K,3)),this.setAttribute("normal",new $J(K.slice(),3)),this.setAttribute("uv",new $J(W,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function Y(D){let R=new T,B=new T,z=new T;for(let C=0;C<$.length;C+=3)F($[C+0],R),F($[C+1],B),F($[C+2],z),X(R,B,z,D)}function X(D,R,B,z){let C=z+1,L=[];for(let A=0;A<=C;A++){L[A]=[];let w=D.clone().lerp(B,A/C),I=R.clone().lerp(B,A/C),k=C-A;for(let b=0;b<=k;b++)if(b===0&&A===C)L[A][b]=w;else L[A][b]=w.clone().lerp(I,b/k)}for(let A=0;A<C;A++)for(let w=0;w<2*(C-A)-1;w++){let I=Math.floor(w/2);if(w%2===0)V(L[A][I+1]),V(L[A+1][I]),V(L[A][I]);else V(L[A][I+1]),V(L[A+1][I+1]),V(L[A+1][I])}}function H(D){let R=new T;for(let B=0;B<K.length;B+=3)R.x=K[B+0],R.y=K[B+1],R.z=K[B+2],R.normalize().multiplyScalar(D),K[B+0]=R.x,K[B+1]=R.y,K[B+2]=R.z}function q(){let D=new T;for(let R=0;R<K.length;R+=3){D.x=K[R+0],D.y=K[R+1],D.z=K[R+2];let B=E(D)/2/Math.PI+0.5,z=O(D)/Math.PI+0.5;W.push(B,1-z)}G(),U()}function U(){for(let D=0;D<W.length;D+=6){let R=W[D+0],B=W[D+2],z=W[D+4],C=Math.max(R,B,z),L=Math.min(R,B,z);if(C>0.9&&L<0.1){if(R<0.2)W[D+0]+=1;if(B<0.2)W[D+2]+=1;if(z<0.2)W[D+4]+=1}}}function V(D){K.push(D.x,D.y,D.z)}function F(D,R){let B=D*3;R.x=J[B+0],R.y=J[B+1],R.z=J[B+2]}function G(){let D=new T,R=new T,B=new T,z=new T,C=new H0,L=new H0,A=new H0;for(let w=0,I=0;w<K.length;w+=9,I+=6){D.set(K[w+0],K[w+1],K[w+2]),R.set(K[w+3],K[w+4],K[w+5]),B.set(K[w+6],K[w+7],K[w+8]),C.set(W[I+0],W[I+1]),L.set(W[I+2],W[I+3]),A.set(W[I+4],W[I+5]),z.copy(D).add(R).add(B).divideScalar(3);let k=E(z);N(C,I+0,D,k),N(L,I+2,R,k),N(A,I+4,B,k)}}function N(D,R,B,z){if(z<0&&D.x===1)W[R]=D.x-1;if(B.x===0&&B.z===0)W[R]=z/2/Math.PI+0.5}function E(D){return Math.atan2(D.z,-D.x)}function O(D){return Math.atan2(-D.y,Math.sqrt(D.x*D.x+D.z*D.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new fZ(J.vertices,J.indices,J.radius,J.details)}}class wJ extends fZ{constructor(J=1,$=0){let Q=(1+Math.sqrt(5))/2,Z=1/Q,K=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-Z,-Q,0,-Z,Q,0,Z,-Q,0,Z,Q,-Z,-Q,0,-Z,Q,0,Z,-Q,0,Z,Q,0,-Q,0,-Z,Q,0,-Z,-Q,0,Z,Q,0,Z],W=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(K,W,J,$);this.type="DodecahedronGeometry",this.parameters={radius:J,detail:$}}static fromJSON(J){return new wJ(J.radius,J.detail)}}class YQ extends GZ{constructor(J){super(J);this.uuid=P8(),this.type="Shape",this.holes=[]}getPointsHoles(J){let $=[];for(let Q=0,Z=this.holes.length;Q<Z;Q++)$[Q]=this.holes[Q].getPoints(J);return $}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let $=0,Q=J.holes.length;$<Q;$++){let Z=J.holes[$];this.holes.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let $=0,Q=this.holes.length;$<Q;$++){let Z=this.holes[$];J.holes.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let $=0,Q=J.holes.length;$<Q;$++){let Z=J.holes[$];this.holes.push(new GZ().fromJSON(Z))}return this}}var V4={triangulate:function(J,$,Q=2){let Z=$&&$.length,K=Z?$[0]*Q:J.length,W=CK(J,0,K,Q,!0),Y=[];if(!W||W.next===W.prev)return Y;let X,H,q,U,V,F,G;if(Z)W=N4(J,$,W,Q);if(J.length>80*Q){X=q=J[0],H=U=J[1];for(let N=Q;N<K;N+=Q){if(V=J[N],F=J[N+1],V<X)X=V;if(F<H)H=F;if(V>q)q=V;if(F>U)U=F}G=Math.max(q-X,U-H),G=G!==0?32767/G:0}return u7(W,Y,Q,X,H,G,0),Y}};function CK(J,$,Q,Z,K){let W,Y;if(K===S4(J,$,Q,Z)>0)for(W=$;W<Q;W+=Z)Y=h6(W,J[W],J[W+1],Y);else for(W=Q-Z;W>=$;W-=Z)Y=h6(W,J[W],J[W+1],Y);if(Y&&HQ(Y,Y.next))p7(Y),Y=Y.next;return Y}function z9(J,$){if(!J)return J;if(!$)$=J;let Q=J,Z;do if(Z=!1,!Q.steiner&&(HQ(Q,Q.next)||BJ(Q.prev,Q,Q.next)===0)){if(p7(Q),Q=$=Q.prev,Q===Q.next)break;Z=!0}else Q=Q.next;while(Z||Q!==$);return $}function u7(J,$,Q,Z,K,W,Y){if(!J)return;if(!Y&&W)L4(J,Z,K,W);let X=J,H,q;while(J.prev!==J.next){if(H=J.prev,q=J.next,W?O4(J,Z,K,W):G4(J)){$.push(H.i/Q|0),$.push(J.i/Q|0),$.push(q.i/Q|0),p7(J),J=q.next,X=q.next;continue}if(J=q,J===X){if(!Y)u7(z9(J),$,Q,Z,K,W,1);else if(Y===1)J=D4(z9(J),$,Q),u7(J,$,Q,Z,K,W,2);else if(Y===2)E4(J,$,Q,Z,K,W);break}}}function G4(J){let $=J.prev,Q=J,Z=J.next;if(BJ($,Q,Z)>=0)return!1;let K=$.x,W=Q.x,Y=Z.x,X=$.y,H=Q.y,q=Z.y,U=K<W?K<Y?K:Y:W<Y?W:Y,V=X<H?X<q?X:q:H<q?H:q,F=K>W?K>Y?K:Y:W>Y?W:Y,G=X>H?X>q?X:q:H>q?H:q,N=Z.next;while(N!==$){if(N.x>=U&&N.x<=F&&N.y>=V&&N.y<=G&&Z7(K,X,W,H,Y,q,N.x,N.y)&&BJ(N.prev,N,N.next)>=0)return!1;N=N.next}return!0}function O4(J,$,Q,Z){let K=J.prev,W=J,Y=J.next;if(BJ(K,W,Y)>=0)return!1;let X=K.x,H=W.x,q=Y.x,U=K.y,V=W.y,F=Y.y,G=X<H?X<q?X:q:H<q?H:q,N=U<V?U<F?U:F:V<F?V:F,E=X>H?X>q?X:q:H>q?H:q,O=U>V?U>F?U:F:V>F?V:F,D=OZ(G,N,$,Q,Z),R=OZ(E,O,$,Q,Z),B=J.prevZ,z=J.nextZ;while(B&&B.z>=D&&z&&z.z<=R){if(B.x>=G&&B.x<=E&&B.y>=N&&B.y<=O&&B!==K&&B!==Y&&Z7(X,U,H,V,q,F,B.x,B.y)&&BJ(B.prev,B,B.next)>=0)return!1;if(B=B.prevZ,z.x>=G&&z.x<=E&&z.y>=N&&z.y<=O&&z!==K&&z!==Y&&Z7(X,U,H,V,q,F,z.x,z.y)&&BJ(z.prev,z,z.next)>=0)return!1;z=z.nextZ}while(B&&B.z>=D){if(B.x>=G&&B.x<=E&&B.y>=N&&B.y<=O&&B!==K&&B!==Y&&Z7(X,U,H,V,q,F,B.x,B.y)&&BJ(B.prev,B,B.next)>=0)return!1;B=B.prevZ}while(z&&z.z<=R){if(z.x>=G&&z.x<=E&&z.y>=N&&z.y<=O&&z!==K&&z!==Y&&Z7(X,U,H,V,q,F,z.x,z.y)&&BJ(z.prev,z,z.next)>=0)return!1;z=z.nextZ}return!0}function D4(J,$,Q){let Z=J;do{let K=Z.prev,W=Z.next.next;if(!HQ(K,W)&&AK(K,Z,Z.next,W)&&d7(K,W)&&d7(W,K))$.push(K.i/Q|0),$.push(Z.i/Q|0),$.push(W.i/Q|0),p7(Z),p7(Z.next),Z=J=W;Z=Z.next}while(Z!==J);return z9(Z)}function E4(J,$,Q,Z,K,W){let Y=J;do{let X=Y.next.next;while(X!==Y.prev){if(Y.i!==X.i&&M4(Y,X)){let H=MK(Y,X);Y=z9(Y,Y.next),H=z9(H,H.next),u7(Y,$,Q,Z,K,W,0),u7(H,$,Q,Z,K,W,0);return}X=X.next}Y=Y.next}while(Y!==J)}function N4(J,$,Q,Z){let K=[],W,Y,X,H,q;for(W=0,Y=$.length;W<Y;W++){if(X=$[W]*Z,H=W<Y-1?$[W+1]*Z:J.length,q=CK(J,X,H,Z,!1),q===q.next)q.steiner=!0;K.push(A4(q))}K.sort(R4);for(W=0;W<K.length;W++)Q=B4(K[W],Q);return Q}function R4(J,$){return J.x-$.x}function B4(J,$){let Q=z4(J,$);if(!Q)return $;let Z=MK(Q,J);return z9(Z,Z.next),z9(Q,Q.next)}function z4(J,$){let Q=$,Z=-1/0,K,W=J.x,Y=J.y;do{if(Y<=Q.y&&Y>=Q.next.y&&Q.next.y!==Q.y){let F=Q.x+(Y-Q.y)*(Q.next.x-Q.x)/(Q.next.y-Q.y);if(F<=W&&F>Z){if(Z=F,K=Q.x<Q.next.x?Q:Q.next,F===W)return K}}Q=Q.next}while(Q!==$);if(!K)return null;let X=K,H=K.x,q=K.y,U=1/0,V;Q=K;do{if(W>=Q.x&&Q.x>=H&&W!==Q.x&&Z7(Y<q?W:Z,Y,H,q,Y<q?Z:W,Y,Q.x,Q.y)){if(V=Math.abs(Y-Q.y)/(W-Q.x),d7(Q,J)&&(V<U||V===U&&(Q.x>K.x||Q.x===K.x&&I4(K,Q))))K=Q,U=V}Q=Q.next}while(Q!==X);return K}function I4(J,$){return BJ(J.prev,J,$.prev)<0&&BJ($.next,J,J.next)<0}function L4(J,$,Q,Z){let K=J;do{if(K.z===0)K.z=OZ(K.x,K.y,$,Q,Z);K.prevZ=K.prev,K.nextZ=K.next,K=K.next}while(K!==J);K.prevZ.nextZ=null,K.prevZ=null,C4(K)}function C4(J){let $,Q,Z,K,W,Y,X,H,q=1;do{Q=J,J=null,W=null,Y=0;while(Q){Y++,Z=Q,X=0;for($=0;$<q;$++)if(X++,Z=Z.nextZ,!Z)break;H=q;while(X>0||H>0&&Z){if(X!==0&&(H===0||!Z||Q.z<=Z.z))K=Q,Q=Q.nextZ,X--;else K=Z,Z=Z.nextZ,H--;if(W)W.nextZ=K;else J=K;K.prevZ=W,W=K}Q=Z}W.nextZ=null,q*=2}while(Y>1);return J}function OZ(J,$,Q,Z,K){return J=(J-Q)*K|0,$=($-Z)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,$=($|$<<8)&16711935,$=($|$<<4)&252645135,$=($|$<<2)&858993459,$=($|$<<1)&1431655765,J|$<<1}function A4(J){let $=J,Q=J;do{if($.x<Q.x||$.x===Q.x&&$.y<Q.y)Q=$;$=$.next}while($!==J);return Q}function Z7(J,$,Q,Z,K,W,Y,X){return(K-Y)*($-X)>=(J-Y)*(W-X)&&(J-Y)*(Z-X)>=(Q-Y)*($-X)&&(Q-Y)*(W-X)>=(K-Y)*(Z-X)}function M4(J,$){return J.next.i!==$.i&&J.prev.i!==$.i&&!k4(J,$)&&(d7(J,$)&&d7($,J)&&P4(J,$)&&(BJ(J.prev,J,$.prev)||BJ(J,$.prev,$))||HQ(J,$)&&BJ(J.prev,J,J.next)>0&&BJ($.prev,$,$.next)>0)}function BJ(J,$,Q){return($.y-J.y)*(Q.x-$.x)-($.x-J.x)*(Q.y-$.y)}function HQ(J,$){return J.x===$.x&&J.y===$.y}function AK(J,$,Q,Z){let K=c$(BJ(J,$,Q)),W=c$(BJ(J,$,Z)),Y=c$(BJ(Q,Z,J)),X=c$(BJ(Q,Z,$));if(K!==W&&Y!==X)return!0;if(K===0&&l$(J,Q,$))return!0;if(W===0&&l$(J,Z,$))return!0;if(Y===0&&l$(Q,J,Z))return!0;if(X===0&&l$(Q,$,Z))return!0;return!1}function l$(J,$,Q){return $.x<=Math.max(J.x,Q.x)&&$.x>=Math.min(J.x,Q.x)&&$.y<=Math.max(J.y,Q.y)&&$.y>=Math.min(J.y,Q.y)}function c$(J){return J>0?1:J<0?-1:0}function k4(J,$){let Q=J;do{if(Q.i!==J.i&&Q.next.i!==J.i&&Q.i!==$.i&&Q.next.i!==$.i&&AK(Q,Q.next,J,$))return!0;Q=Q.next}while(Q!==J);return!1}function d7(J,$){return BJ(J.prev,J,J.next)<0?BJ(J,$,J.next)>=0&&BJ(J,J.prev,$)>=0:BJ(J,$,J.prev)<0||BJ(J,J.next,$)<0}function P4(J,$){let Q=J,Z=!1,K=(J.x+$.x)/2,W=(J.y+$.y)/2;do{if(Q.y>W!==Q.next.y>W&&Q.next.y!==Q.y&&K<(Q.next.x-Q.x)*(W-Q.y)/(Q.next.y-Q.y)+Q.x)Z=!Z;Q=Q.next}while(Q!==J);return Z}function MK(J,$){let Q=new DZ(J.i,J.x,J.y),Z=new DZ($.i,$.x,$.y),K=J.next,W=$.prev;return J.next=$,$.prev=J,Q.next=K,K.prev=Q,Z.next=Q,Q.prev=Z,W.next=Z,Z.prev=W,Z}function h6(J,$,Q,Z){let K=new DZ(J,$,Q);if(!Z)K.prev=K,K.next=K;else K.next=Z.next,K.prev=Z,Z.next.prev=K,Z.next=K;return K}function p7(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function DZ(J,$,Q){this.i=J,this.x=$,this.y=Q,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function S4(J,$,Q,Z){let K=0;for(let W=$,Y=Q-Z;W<Q;W+=Z)K+=(J[Y]-J[W])*(J[W+1]+J[Y+1]),Y=W;return K}class m7{static area(J){let $=J.length,Q=0;for(let Z=$-1,K=0;K<$;Z=K++)Q+=J[Z].x*J[K].y-J[K].x*J[Z].y;return Q*0.5}static isClockWise(J){return m7.area(J)<0}static triangulateShape(J,$){let Q=[],Z=[],K=[];v6(J),g6(Q,J);let W=J.length;$.forEach(v6);for(let X=0;X<$.length;X++)Z.push(W),W+=$[X].length,g6(Q,$[X]);let Y=V4.triangulate(Q,Z);for(let X=0;X<Y.length;X+=3)K.push(Y.slice(X,X+3));return K}}function v6(J){let $=J.length;if($>2&&J[$-1].equals(J[0]))J.pop()}function g6(J,$){for(let Q=0;Q<$.length;Q++)J.push($[Q].x),J.push($[Q].y)}class s7 extends GJ{constructor(J=new YQ([new H0(0.5,0.5),new H0(-0.5,0.5),new H0(-0.5,-0.5),new H0(0.5,-0.5)]),$={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:$},J=Array.isArray(J)?J:[J];let Q=this,Z=[],K=[];for(let Y=0,X=J.length;Y<X;Y++){let H=J[Y];W(H)}this.setAttribute("position",new $J(Z,3)),this.setAttribute("uv",new $J(K,2)),this.computeVertexNormals();function W(Y){let X=[],H=$.curveSegments!==void 0?$.curveSegments:12,q=$.steps!==void 0?$.steps:1,U=$.depth!==void 0?$.depth:1,V=$.bevelEnabled!==void 0?$.bevelEnabled:!0,F=$.bevelThickness!==void 0?$.bevelThickness:0.2,G=$.bevelSize!==void 0?$.bevelSize:F-0.1,N=$.bevelOffset!==void 0?$.bevelOffset:0,E=$.bevelSegments!==void 0?$.bevelSegments:3,O=$.extrudePath,D=$.UVGenerator!==void 0?$.UVGenerator:_4,R,B=!1,z,C,L,A;if(O)R=O.getSpacedPoints(q),B=!0,V=!1,z=O.computeFrenetFrames(q,!1),C=new T,L=new T,A=new T;if(!V)E=0,F=0,G=0,N=0;let w=Y.extractPoints(H),I=w.shape,k=w.holes;if(!m7.isClockWise(I)){I=I.reverse();for(let x=0,D0=k.length;x<D0;x++){let X0=k[x];if(m7.isClockWise(X0))k[x]=X0.reverse()}}let n=m7.triangulateShape(I,k),i=I;for(let x=0,D0=k.length;x<D0;x++){let X0=k[x];I=I.concat(X0)}function y(x,D0,X0){if(!D0)console.error("THREE.ExtrudeGeometry: vec does not exist");return x.clone().addScaledVector(D0,X0)}let h=I.length,m=n.length;function l(x,D0,X0){let W0,K0,z0,N0=x.x-D0.x,S0=x.y-D0.y,_=X0.x-x.x,M=X0.y-x.y,s=N0*N0+S0*S0,q0=N0*M-S0*_;if(Math.abs(q0)>Number.EPSILON){let Z0=Math.sqrt(s),U0=Math.sqrt(_*_+M*M),y0=D0.x-S0/Z0,V0=D0.y+N0/Z0,A0=X0.x-M/U0,T0=X0.y+_/U0,h0=((A0-y0)*M-(T0-V0)*_)/(N0*M-S0*_);W0=y0+N0*h0-x.x,K0=V0+S0*h0-x.y;let Y0=W0*W0+K0*K0;if(Y0<=2)return new H0(W0,K0);else z0=Math.sqrt(Y0/2)}else{let Z0=!1;if(N0>Number.EPSILON){if(_>Number.EPSILON)Z0=!0}else if(N0<-Number.EPSILON){if(_<-Number.EPSILON)Z0=!0}else if(Math.sign(S0)===Math.sign(M))Z0=!0;if(Z0)W0=-S0,K0=N0,z0=Math.sqrt(s);else W0=N0,K0=S0,z0=Math.sqrt(s/2)}return new H0(W0/z0,K0/z0)}let d=[];for(let x=0,D0=i.length,X0=D0-1,W0=x+1;x<D0;x++,X0++,W0++){if(X0===D0)X0=0;if(W0===D0)W0=0;d[x]=l(i[x],i[X0],i[W0])}let v=[],u,r=d.concat();for(let x=0,D0=k.length;x<D0;x++){let X0=k[x];u=[];for(let W0=0,K0=X0.length,z0=K0-1,N0=W0+1;W0<K0;W0++,z0++,N0++){if(z0===K0)z0=0;if(N0===K0)N0=0;u[W0]=l(X0[W0],X0[z0],X0[N0])}v.push(u),r=r.concat(u)}for(let x=0;x<E;x++){let D0=x/E,X0=F*Math.cos(D0*Math.PI/2),W0=G*Math.sin(D0*Math.PI/2)+N;for(let K0=0,z0=i.length;K0<z0;K0++){let N0=y(i[K0],d[K0],W0);R0(N0.x,N0.y,-X0)}for(let K0=0,z0=k.length;K0<z0;K0++){let N0=k[K0];u=v[K0];for(let S0=0,_=N0.length;S0<_;S0++){let M=y(N0[S0],u[S0],W0);R0(M.x,M.y,-X0)}}}let g=G+N;for(let x=0;x<h;x++){let D0=V?y(I[x],r[x],g):I[x];if(!B)R0(D0.x,D0.y,0);else L.copy(z.normals[0]).multiplyScalar(D0.x),C.copy(z.binormals[0]).multiplyScalar(D0.y),A.copy(R[0]).add(L).add(C),R0(A.x,A.y,A.z)}for(let x=1;x<=q;x++)for(let D0=0;D0<h;D0++){let X0=V?y(I[D0],r[D0],g):I[D0];if(!B)R0(X0.x,X0.y,U/q*x);else L.copy(z.normals[x]).multiplyScalar(X0.x),C.copy(z.binormals[x]).multiplyScalar(X0.y),A.copy(R[x]).add(L).add(C),R0(A.x,A.y,A.z)}for(let x=E-1;x>=0;x--){let D0=x/E,X0=F*Math.cos(D0*Math.PI/2),W0=G*Math.sin(D0*Math.PI/2)+N;for(let K0=0,z0=i.length;K0<z0;K0++){let N0=y(i[K0],d[K0],W0);R0(N0.x,N0.y,U+X0)}for(let K0=0,z0=k.length;K0<z0;K0++){let N0=k[K0];u=v[K0];for(let S0=0,_=N0.length;S0<_;S0++){let M=y(N0[S0],u[S0],W0);if(!B)R0(M.x,M.y,U+X0);else R0(M.x,M.y+R[q-1].y,R[q-1].x+X0)}}}t(),Q0();function t(){let x=Z.length/3;if(V){let D0=0,X0=h*D0;for(let W0=0;W0<m;W0++){let K0=n[W0];x0(K0[2]+X0,K0[1]+X0,K0[0]+X0)}D0=q+E*2,X0=h*D0;for(let W0=0;W0<m;W0++){let K0=n[W0];x0(K0[0]+X0,K0[1]+X0,K0[2]+X0)}}else{for(let D0=0;D0<m;D0++){let X0=n[D0];x0(X0[2],X0[1],X0[0])}for(let D0=0;D0<m;D0++){let X0=n[D0];x0(X0[0]+h*q,X0[1]+h*q,X0[2]+h*q)}}Q.addGroup(x,Z.length/3-x,0)}function Q0(){let x=Z.length/3,D0=0;F0(i,D0),D0+=i.length;for(let X0=0,W0=k.length;X0<W0;X0++){let K0=k[X0];F0(K0,D0),D0+=K0.length}Q.addGroup(x,Z.length/3-x,1)}function F0(x,D0){let X0=x.length;while(--X0>=0){let W0=X0,K0=X0-1;if(K0<0)K0=x.length-1;for(let z0=0,N0=q+E*2;z0<N0;z0++){let S0=h*z0,_=h*(z0+1),M=D0+W0+S0,s=D0+K0+S0,q0=D0+K0+_,Z0=D0+W0+_;u0(M,s,q0,Z0)}}}function R0(x,D0,X0){X.push(x),X.push(D0),X.push(X0)}function x0(x,D0,X0){w0(x),w0(D0),w0(X0);let W0=Z.length/3,K0=D.generateTopUV(Q,Z,W0-3,W0-2,W0-1);f0(K0[0]),f0(K0[1]),f0(K0[2])}function u0(x,D0,X0,W0){w0(x),w0(D0),w0(W0),w0(D0),w0(X0),w0(W0);let K0=Z.length/3,z0=D.generateSideWallUV(Q,Z,K0-6,K0-3,K0-2,K0-1);f0(z0[0]),f0(z0[1]),f0(z0[3]),f0(z0[1]),f0(z0[2]),f0(z0[3])}function w0(x){Z.push(X[x*3+0]),Z.push(X[x*3+1]),Z.push(X[x*3+2])}function f0(x){K.push(x.x),K.push(x.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),$=this.parameters.shapes,Q=this.parameters.options;return w4($,Q,J)}static fromJSON(J,$){let Q=[];for(let K=0,W=J.shapes.length;K<W;K++){let Y=$[J.shapes[K]];Q.push(Y)}let Z=J.options.extrudePath;if(Z!==void 0)J.options.extrudePath=new a$[Z.type]().fromJSON(Z);return new s7(Q,J.options)}}var _4={generateTopUV:function(J,$,Q,Z,K){let W=$[Q*3],Y=$[Q*3+1],X=$[Z*3],H=$[Z*3+1],q=$[K*3],U=$[K*3+1];return[new H0(W,Y),new H0(X,H),new H0(q,U)]},generateSideWallUV:function(J,$,Q,Z,K,W){let Y=$[Q*3],X=$[Q*3+1],H=$[Q*3+2],q=$[Z*3],U=$[Z*3+1],V=$[Z*3+2],F=$[K*3],G=$[K*3+1],N=$[K*3+2],E=$[W*3],O=$[W*3+1],D=$[W*3+2];if(Math.abs(X-U)<Math.abs(Y-q))return[new H0(Y,1-H),new H0(q,1-V),new H0(F,1-N),new H0(E,1-D)];else return[new H0(X,1-H),new H0(U,1-V),new H0(G,1-N),new H0(O,1-D)]}};function w4(J,$,Q){if(Q.shapes=[],Array.isArray(J))for(let Z=0,K=J.length;Z<K;Z++){let W=J[Z];Q.shapes.push(W.uuid)}else Q.shapes.push(J.uuid);if(Q.options=Object.assign({},$),$.extrudePath!==void 0)Q.options.extrudePath=$.extrudePath.toJSON();return Q}class i7 extends GJ{constructor(J=0.5,$=1,Q=32,Z=1,K=0,W=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:$,thetaSegments:Q,phiSegments:Z,thetaStart:K,thetaLength:W},Q=Math.max(3,Q),Z=Math.max(1,Z);let Y=[],X=[],H=[],q=[],U=J,V=($-J)/Z,F=new T,G=new H0;for(let N=0;N<=Z;N++){for(let E=0;E<=Q;E++){let O=K+E/Q*W;F.x=U*Math.cos(O),F.y=U*Math.sin(O),X.push(F.x,F.y,F.z),H.push(0,0,1),G.x=(F.x/$+1)/2,G.y=(F.y/$+1)/2,q.push(G.x,G.y)}U+=V}for(let N=0;N<Z;N++){let E=N*(Q+1);for(let O=0;O<Q;O++){let D=O+E,R=D,B=D+Q+1,z=D+Q+2,C=D+1;Y.push(R,B,C),Y.push(B,z,C)}}this.setIndex(Y),this.setAttribute("position",new $J(X,3)),this.setAttribute("normal",new $J(H,3)),this.setAttribute("uv",new $J(q,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new i7(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class YJ extends GJ{constructor(J=1,$=32,Q=16,Z=0,K=Math.PI*2,W=0,Y=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:$,heightSegments:Q,phiStart:Z,phiLength:K,thetaStart:W,thetaLength:Y},$=Math.max(3,Math.floor($)),Q=Math.max(2,Math.floor(Q));let X=Math.min(W+Y,Math.PI),H=0,q=[],U=new T,V=new T,F=[],G=[],N=[],E=[];for(let O=0;O<=Q;O++){let D=[],R=O/Q,B=0;if(O===0&&W===0)B=0.5/$;else if(O===Q&&X===Math.PI)B=-0.5/$;for(let z=0;z<=$;z++){let C=z/$;U.x=-J*Math.cos(Z+C*K)*Math.sin(W+R*Y),U.y=J*Math.cos(W+R*Y),U.z=J*Math.sin(Z+C*K)*Math.sin(W+R*Y),G.push(U.x,U.y,U.z),V.copy(U).normalize(),N.push(V.x,V.y,V.z),E.push(C+B,1-R),D.push(H++)}q.push(D)}for(let O=0;O<Q;O++)for(let D=0;D<$;D++){let R=q[O][D+1],B=q[O][D],z=q[O+1][D],C=q[O+1][D+1];if(O!==0||W>0)F.push(R,B,C);if(O!==Q-1||X<Math.PI)F.push(B,z,C)}this.setIndex(F),this.setAttribute("position",new $J(G,3)),this.setAttribute("normal",new $J(N,3)),this.setAttribute("uv",new $J(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new YJ(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class l8 extends GJ{constructor(J=1,$=0.4,Q=12,Z=48,K=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:$,radialSegments:Q,tubularSegments:Z,arc:K},Q=Math.floor(Q),Z=Math.floor(Z);let W=[],Y=[],X=[],H=[],q=new T,U=new T,V=new T;for(let F=0;F<=Q;F++)for(let G=0;G<=Z;G++){let N=G/Z*K,E=F/Q*Math.PI*2;U.x=(J+$*Math.cos(E))*Math.cos(N),U.y=(J+$*Math.cos(E))*Math.sin(N),U.z=$*Math.sin(E),Y.push(U.x,U.y,U.z),q.x=J*Math.cos(N),q.y=J*Math.sin(N),V.subVectors(U,q).normalize(),X.push(V.x,V.y,V.z),H.push(G/Z),H.push(F/Q)}for(let F=1;F<=Q;F++)for(let G=1;G<=Z;G++){let N=(Z+1)*F+G-1,E=(Z+1)*(F-1)+G-1,O=(Z+1)*(F-1)+G,D=(Z+1)*F+G;W.push(N,E,D),W.push(E,O,D)}this.setIndex(W),this.setAttribute("position",new $J(Y,3)),this.setAttribute("normal",new $J(X,3)),this.setAttribute("uv",new $J(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new l8(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc)}}class o7 extends GJ{constructor(J=new xZ(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),$=64,Q=1,Z=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:$,radius:Q,radialSegments:Z,closed:K};let W=J.computeFrenetFrames($,K);this.tangents=W.tangents,this.normals=W.normals,this.binormals=W.binormals;let Y=new T,X=new T,H=new H0,q=new T,U=[],V=[],F=[],G=[];N(),this.setIndex(G),this.setAttribute("position",new $J(U,3)),this.setAttribute("normal",new $J(V,3)),this.setAttribute("uv",new $J(F,2));function N(){for(let R=0;R<$;R++)E(R);E(K===!1?$:0),D(),O()}function E(R){q=J.getPointAt(R/$,q);let B=W.normals[R],z=W.binormals[R];for(let C=0;C<=Z;C++){let L=C/Z*Math.PI*2,A=Math.sin(L),w=-Math.cos(L);X.x=w*B.x+A*z.x,X.y=w*B.y+A*z.y,X.z=w*B.z+A*z.z,X.normalize(),V.push(X.x,X.y,X.z),Y.x=q.x+Q*X.x,Y.y=q.y+Q*X.y,Y.z=q.z+Q*X.z,U.push(Y.x,Y.y,Y.z)}}function O(){for(let R=1;R<=$;R++)for(let B=1;B<=Z;B++){let z=(Z+1)*(R-1)+(B-1),C=(Z+1)*R+(B-1),L=(Z+1)*R+B,A=(Z+1)*(R-1)+B;G.push(z,C,A),G.push(C,L,A)}}function D(){for(let R=0;R<=$;R++)for(let B=0;B<=Z;B++)H.x=R/$,H.y=B/Z,F.push(H.x,H.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new o7(new a$[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class c extends d8{constructor(J){super();this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new e0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new e0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}function n$(J,$,Q){if(!J||!Q&&J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}function T4(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}class r7{constructor(J,$,Q,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new $.constructor(Q),this.sampleValues=$,this.valueSize=Q,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Q=this._cachedIndex,Z=$[Q],K=$[Q-1];Q:{J:{let W;$:{Z:if(!(J<Z)){for(let Y=Q+2;;){if(Z===void 0){if(J<K)break Z;return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}if(Q===Y)break;if(K=Z,Z=$[++Q],J<Z)break J}W=$.length;break $}if(!(J>=K)){let Y=$[1];if(J<Y)Q=2,K=Y;for(let X=Q-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===X)break;if(Z=K,K=$[--Q-1],J>=K)break J}W=Q,Q=0;break $}break Q}while(Q<W){let Y=Q+W>>>1;if(J<$[Y])W=Y;else Q=Y+1}if(Z=$[Q],K=$[Q-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}this._cachedIndex=Q,this.intervalChanged_(Q,K,Z)}return this.interpolate_(Q,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Q=this.sampleValues,Z=this.valueSize,K=J*Z;for(let W=0;W!==Z;++W)$[W]=Q[K+W];return $}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class kK extends r7{constructor(J,$,Q,Z){super(J,$,Q,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Q){let Z=this.parameterPositions,K=J-2,W=J+1,Y=Z[K],X=Z[W];if(Y===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,Y=2*$-Q;break;case 2402:K=Z.length-2,Y=$+Z[K]-Z[K+1];break;default:K=J,Y=Q}if(X===void 0)switch(this.getSettings_().endingEnd){case 2401:W=J,X=2*Q-$;break;case 2402:W=1,X=Q+Z[1]-Z[0];break;default:W=J-1,X=$}let H=(Q-$)*0.5,q=this.valueSize;this._weightPrev=H/($-Y),this._weightNext=H/(X-Q),this._offsetPrev=K*q,this._offsetNext=W*q}interpolate_(J,$,Q,Z){let K=this.resultBuffer,W=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,q=this._offsetPrev,U=this._offsetNext,V=this._weightPrev,F=this._weightNext,G=(Q-$)/(Z-$),N=G*G,E=N*G,O=-V*E+2*V*N-V*G,D=(1+V)*E+(-1.5-2*V)*N+(-0.5+V)*G+1,R=(-1-F)*E+(1.5+F)*N+0.5*G,B=F*E-F*N;for(let z=0;z!==Y;++z)K[z]=O*W[q+z]+D*W[H+z]+R*W[X+z]+B*W[U+z];return K}}class PK extends r7{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,W=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,q=(Q-$)/(Z-$),U=1-q;for(let V=0;V!==Y;++V)K[V]=W[H+V]*U+W[X+V]*q;return K}}class SK extends r7{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class w8{constructor(J,$,Q,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=n$($,this.TimeBufferType),this.values=n$(Q,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Q;if($.toJSON!==this.toJSON)Q=$.toJSON(J);else{Q={name:J.name,times:n$(J.times,Array),values:n$(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)Q.interpolation=Z}return Q.type=J.ValueTypeName,Q}InterpolantFactoryMethodDiscrete(J){return new SK(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new PK(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new kK(this.times,this.values,this.getValueSize(),J)}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break}if($===void 0){let Q="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Q);return console.warn("THREE.KeyframeTrack:",Q),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]*=J}return this}trim(J,$){let Q=this.times,Z=Q.length,K=0,W=Z-1;while(K!==Z&&Q[K]<J)++K;while(W!==-1&&Q[W]>$)--W;if(++W,K!==0||W!==Z){if(K>=W)W=Math.max(W,1),K=W-1;let Y=this.getValueSize();this.times=Q.slice(K,W),this.values=this.values.slice(K*Y,W*Y)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),J=!1;let Q=this.times,Z=this.values,K=Q.length;if(K===0)console.error("THREE.KeyframeTrack: Track is empty.",this),J=!1;let W=null;for(let Y=0;Y!==K;Y++){let X=Q[Y];if(typeof X==="number"&&isNaN(X)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,Y,X),J=!1;break}if(W!==null&&W>X){console.error("THREE.KeyframeTrack: Out of order keys.",this,Y,X,W),J=!1;break}W=X}if(Z!==void 0){if(T4(Z))for(let Y=0,X=Z.length;Y!==X;++Y){let H=Z[Y];if(isNaN(H)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,Y,H),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Q=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,W=1;for(let Y=1;Y<K;++Y){let X=!1,H=J[Y],q=J[Y+1];if(H!==q&&(Y!==1||H!==J[0]))if(!Z){let U=Y*Q,V=U-Q,F=U+Q;for(let G=0;G!==Q;++G){let N=$[U+G];if(N!==$[V+G]||N!==$[F+G]){X=!0;break}}}else X=!0;if(X){if(Y!==W){J[W]=J[Y];let U=Y*Q,V=W*Q;for(let F=0;F!==Q;++F)$[V+F]=$[U+F]}++W}}if(K>0){J[W]=J[K];for(let Y=K*Q,X=W*Q,H=0;H!==Q;++H)$[X+H]=$[Y+H];++W}if(W!==J.length)this.times=J.slice(0,W),this.values=$.slice(0,W*Q);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),Z=new this.constructor(this.name,J,$);return Z.createInterpolant=this.createInterpolant,Z}}w8.prototype.TimeBufferType=Float32Array;w8.prototype.ValueBufferType=Float32Array;w8.prototype.DefaultInterpolation=2301;class V7 extends w8{}V7.prototype.ValueTypeName="bool";V7.prototype.ValueBufferType=Array;V7.prototype.DefaultInterpolation=2300;V7.prototype.InterpolantFactoryMethodLinear=void 0;V7.prototype.InterpolantFactoryMethodSmooth=void 0;class _K extends w8{}_K.prototype.ValueTypeName="color";class wK extends w8{}wK.prototype.ValueTypeName="number";class TK extends r7{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,W=this.sampleValues,Y=this.valueSize,X=(Q-$)/(Z-$),H=J*Y;for(let q=H+Y;H!==q;H+=4)_8.slerpFlat(K,0,W,H-Y,W,H,X);return K}}class qQ extends w8{InterpolantFactoryMethodLinear(J){return new TK(this.times,this.values,this.getValueSize(),J)}}qQ.prototype.ValueTypeName="quaternion";qQ.prototype.DefaultInterpolation=2301;qQ.prototype.InterpolantFactoryMethodSmooth=void 0;class G7 extends w8{}G7.prototype.ValueTypeName="string";G7.prototype.ValueBufferType=Array;G7.prototype.DefaultInterpolation=2300;G7.prototype.InterpolantFactoryMethodLinear=void 0;G7.prototype.InterpolantFactoryMethodSmooth=void 0;class jK extends w8{}jK.prototype.ValueTypeName="vector";class yK{constructor(J,$,Q){let Z=this,K=!1,W=0,Y=0,X=void 0,H=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Q,this.itemStart=function(q){if(Y++,K===!1){if(Z.onStart!==void 0)Z.onStart(q,W,Y)}K=!0},this.itemEnd=function(q){if(W++,Z.onProgress!==void 0)Z.onProgress(q,W,Y);if(W===Y){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(q){if(Z.onError!==void 0)Z.onError(q)},this.resolveURL=function(q){if(X)return X(q);return q},this.setURLModifier=function(q){return X=q,this},this.addHandler=function(q,U){return H.push(q,U),this},this.removeHandler=function(q){let U=H.indexOf(q);if(U!==-1)H.splice(U,2);return this},this.getHandler=function(q){for(let U=0,V=H.length;U<V;U+=2){let F=H[U],G=H[U+1];if(F.global)F.lastIndex=0;if(F.test(q))return G}return null}}}var j4=new yK;class xK{constructor(J){this.manager=J!==void 0?J:j4,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(J,$){let Q=this;return new Promise(function(Z,K){Q.load(J,Z,$,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}}xK.DEFAULT_MATERIAL_NAME="__DEFAULT";class O7 extends EJ{constructor(J,$=1){super();this.isLight=!0,this.type="Light",this.color=new e0(J),this.intensity=$}dispose(){}copy(J,$){return super.copy(J,$),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let $=super.toJSON(J);if($.object.color=this.color.getHex(),$.object.intensity=this.intensity,this.groundColor!==void 0)$.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)$.object.distance=this.distance;if(this.angle!==void 0)$.object.angle=this.angle;if(this.decay!==void 0)$.object.decay=this.decay;if(this.penumbra!==void 0)$.object.penumbra=this.penumbra;if(this.shadow!==void 0)$.object.shadow=this.shadow.toJSON();return $}}class hZ extends O7{constructor(J,$,Q){super(J,Q);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(EJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new e0($)}copy(J,$){return super.copy(J,$),this.groundColor.copy(J.groundColor),this}}var YZ=new UJ,m6=new T,u6=new T;class UQ{constructor(J){this.camera=J,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H0(512,512),this.map=null,this.mapPass=null,this.matrix=new UJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $Q,this._frameExtents=new H0(1,1),this._viewportCount=1,this._viewports=[new DJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let $=this.camera,Q=this.matrix;m6.setFromMatrixPosition(J.matrixWorld),$.position.copy(m6),u6.setFromMatrixPosition(J.target.matrixWorld),$.lookAt(u6),$.updateMatrixWorld(),YZ.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),this._frustum.setFromProjectionMatrix(YZ),Q.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),Q.multiply(YZ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.bias=J.bias,this.radius=J.radius,this.mapSize.copy(J.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}class bK extends UQ{constructor(){super(new lJ(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(J){let $=this.camera,Q=W7*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height,K=J.distance||$.far;if(Q!==$.fov||Z!==$.aspect||K!==$.far)$.fov=Q,$.aspect=Z,$.far=K,$.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this}}class vZ extends O7{constructor(J,$,Q=0,Z=Math.PI/3,K=0,W=2){super(J,$);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(EJ.DEFAULT_UP),this.updateMatrix(),this.target=new EJ,this.distance=Q,this.angle=Z,this.penumbra=K,this.decay=W,this.map=null,this.shadow=new bK}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}var d6=new UJ,y7=new T,HZ=new T;class fK extends UQ{constructor(){super(new lJ(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new H0(4,2),this._viewportCount=6,this._viewports=[new DJ(2,1,1,1),new DJ(0,1,1,1),new DJ(3,1,1,1),new DJ(1,1,1,1),new DJ(3,0,1,1),new DJ(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(J,$=0){let Q=this.camera,Z=this.matrix,K=J.distance||Q.far;if(K!==Q.far)Q.far=K,Q.updateProjectionMatrix();y7.setFromMatrixPosition(J.matrixWorld),Q.position.copy(y7),HZ.copy(Q.position),HZ.add(this._cubeDirections[$]),Q.up.copy(this._cubeUps[$]),Q.lookAt(HZ),Q.updateMatrixWorld(),Z.makeTranslation(-y7.x,-y7.y,-y7.z),d6.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(d6)}}class yJ extends O7{constructor(J,$,Q=0,Z=2){super(J,$);this.isPointLight=!0,this.type="PointLight",this.distance=Q,this.decay=Z,this.shadow=new fK}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}}class hK extends UQ{constructor(){super(new MZ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class a7 extends O7{constructor(J,$){super(J,$);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(EJ.DEFAULT_UP),this.updateMatrix(),this.target=new EJ,this.shadow=new hK}dispose(){this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}class gZ extends O7{constructor(J,$){super(J,$);this.isAmbientLight=!0,this.type="AmbientLight"}}var mZ="\\[\\]\\.:\\/",y4=new RegExp("["+mZ+"]","g"),uZ="[^"+mZ+"]",x4="[^"+mZ.replace("\\.","")+"]",b4=/((?:WC+[\/:])*)/.source.replace("WC",uZ),f4=/(WCOD+)?/.source.replace("WCOD",x4),h4=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uZ),v4=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uZ),g4=new RegExp("^"+b4+f4+h4+v4+"$"),m4=["material","materials","bones","map"];class vK{constructor(J,$,Q){let Z=Q||WJ.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,Z)}getValue(J,$){this.bind();let Q=this._targetGroup.nCachedObjects_,Z=this._bindings[Q];if(Z!==void 0)Z.getValue(J,$)}setValue(J,$){let Q=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=Q.length;Z!==K;++Z)Q[Z].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].unbind()}}class WJ{constructor(J,$,Q){this.path=$,this.parsedPath=Q||WJ.parseTrackName($),this.node=WJ.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Q){if(!(J&&J.isAnimationObjectGroup))return new WJ(J,$,Q);else return new WJ.Composite(J,$,Q)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(y4,"")}static parseTrackName(J){let $=g4.exec(J);if($===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let Q={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},Z=Q.nodeName&&Q.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=Q.nodeName.substring(Z+1);if(m4.indexOf(K)!==-1)Q.nodeName=Q.nodeName.substring(0,Z),Q.objectName=K}if(Q.propertyName===null||Q.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return Q}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Q=J.skeleton.getBoneByName($);if(Q!==void 0)return Q}if(J.children){let Q=function(K){for(let W=0;W<K.length;W++){let Y=K[W];if(Y.name===$||Y.uuid===$)return Y;let X=Q(Y.children);if(X)return X}return null},Z=Q(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)J[$++]=Q[Z]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Q=$.objectName,Z=$.propertyName,K=$.propertyIndex;if(!J)J=WJ.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(Q){let H=$.objectIndex;switch(Q){case"materials":if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let q=0;q<J.length;q++)if(J[q].name===H){H=q;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Q]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Q]}if(H!==void 0){if(J[H]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[H]}}let W=J[Z];if(W===void 0){let H=$.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+H+"."+Z+" but it wasn't found.",J);return}let Y=this.Versioning.None;if(this.targetObject=J,J.needsUpdate!==void 0)Y=this.Versioning.NeedsUpdate;else if(J.matrixWorldNeedsUpdate!==void 0)Y=this.Versioning.MatrixWorldNeedsUpdate;let X=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}X=this.BindingType.ArrayElement,this.resolvedProperty=W,this.propertyIndex=K}else if(W.fromArray!==void 0&&W.toArray!==void 0)X=this.BindingType.HasFromToArray,this.resolvedProperty=W;else if(Array.isArray(W))X=this.BindingType.EntireArray,this.resolvedProperty=W;else this.propertyName=Z;this.getValue=this.GetterByBindingType[X],this.setValue=this.SetterByBindingTypeAndVersioning[X][Y]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}WJ.Composite=vK;WJ.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};WJ.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};WJ.prototype.GetterByBindingType=[WJ.prototype._getValue_direct,WJ.prototype._getValue_array,WJ.prototype._getValue_arrayElement,WJ.prototype._getValue_toArray];WJ.prototype.SetterByBindingTypeAndVersioning=[[WJ.prototype._setValue_direct,WJ.prototype._setValue_direct_setNeedsUpdate,WJ.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[WJ.prototype._setValue_array,WJ.prototype._setValue_array_setNeedsUpdate,WJ.prototype._setValue_array_setMatrixWorldNeedsUpdate],[WJ.prototype._setValue_arrayElement,WJ.prototype._setValue_arrayElement_setNeedsUpdate,WJ.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[WJ.prototype._setValue_fromArray,WJ.prototype._setValue_fromArray_setNeedsUpdate,WJ.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wF=new Float32Array(1);class dZ{constructor(J,$,Q=0,Z=1/0){this.ray=new A9(J,$),this.near=Q,this.far=Z,this.camera=null,this.layers=new JQ,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,$){this.ray.set(J,$)}setFromCamera(J,$){if($.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition($.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject($).sub(this.ray.origin).normalize(),this.camera=$;else if($.isOrthographicCamera)this.ray.origin.set(J.x,J.y,($.near+$.far)/($.near-$.far)).unproject($),this.ray.direction.set(0,0,-1).transformDirection($.matrixWorld),this.camera=$;else console.error("THREE.Raycaster: Unsupported camera type: "+$.type)}intersectObject(J,$=!0,Q=[]){return EZ(J,this,Q,$),Q.sort(p6),Q}intersectObjects(J,$=!0,Q=[]){for(let Z=0,K=J.length;Z<K;Z++)EZ(J[Z],this,Q,$);return Q.sort(p6),Q}}function p6(J,$){return J.distance-$.distance}function EZ(J,$,Q,Z){if(J.layers.test($.layers))J.raycast($,Q);if(Z===!0){let K=J.children;for(let W=0,Y=K.length;W<Y;W++)EZ(K[W],$,Q,!0)}}class FQ{constructor(J=1,$=0,Q=0){return this.radius=J,this.phi=$,this.theta=Q,this}set(J,$,Q){return this.radius=J,this.phi=$,this.theta=Q,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=Math.max(0.000001,Math.min(Math.PI-0.000001,this.phi)),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,$,Q){if(this.radius=Math.sqrt(J*J+$*$+Q*Q),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,Q),this.phi=Math.acos(hJ($/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="160";var gK={type:"change"},pZ={type:"start"},mK={type:"end"},VQ=new A9,uK=new A8,d4=Math.cos(70*t$.DEG2RAD);class lZ extends u8{constructor(J,$){super();this.object=J,this.domElement=$,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:I9.ROTATE,MIDDLE:I9.DOLLY,RIGHT:I9.PAN},this.touches={ONE:L9.ROTATE,TWO:L9.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return Y.phi},this.getAzimuthalAngle=function(){return Y.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(j){j.addEventListener("keydown",A0),this._domElementKeyEvents=j},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",A0),this._domElementKeyEvents=null},this.saveState=function(){Q.target0.copy(Q.target),Q.position0.copy(Q.object.position),Q.zoom0=Q.object.zoom},this.reset=function(){Q.target.copy(Q.target0),Q.object.position.copy(Q.position0),Q.object.zoom=Q.zoom0,Q.object.updateProjectionMatrix(),Q.dispatchEvent(gK),Q.update(),K=Z.NONE},this.update=function(){let j=new T,$0=new _8().setFromUnitVectors(J.up,new T(0,1,0)),E0=$0.clone().invert(),C0=new T,p0=new _8,O0=new T,f=2*Math.PI;return function(L0=null){let g0=Q.object.position;if(j.copy(g0).sub(Q.target),j.applyQuaternion($0),Y.setFromVector3(j),Q.autoRotate&&K===Z.NONE)b(I(L0));if(Q.enableDamping)Y.theta+=X.theta*Q.dampingFactor,Y.phi+=X.phi*Q.dampingFactor;else Y.theta+=X.theta,Y.phi+=X.phi;let{minAzimuthAngle:j0,maxAzimuthAngle:a0}=Q;if(isFinite(j0)&&isFinite(a0)){if(j0<-Math.PI)j0+=f;else if(j0>Math.PI)j0-=f;if(a0<-Math.PI)a0+=f;else if(a0>Math.PI)a0-=f;if(j0<=a0)Y.theta=Math.max(j0,Math.min(a0,Y.theta));else Y.theta=Y.theta>(j0+a0)/2?Math.max(j0,Y.theta):Math.min(a0,Y.theta)}if(Y.phi=Math.max(Q.minPolarAngle,Math.min(Q.maxPolarAngle,Y.phi)),Y.makeSafe(),Q.enableDamping===!0)Q.target.addScaledVector(q,Q.dampingFactor);else Q.target.add(q);if(Q.target.sub(Q.cursor),Q.target.clampLength(Q.minTargetRadius,Q.maxTargetRadius),Q.target.add(Q.cursor),Q.zoomToCursor&&C||Q.object.isOrthographicCamera)Y.radius=v(Y.radius);else Y.radius=v(Y.radius*H);if(j.setFromSpherical(Y),j.applyQuaternion(E0),g0.copy(Q.target).add(j),Q.object.lookAt(Q.target),Q.enableDamping===!0)X.theta*=1-Q.dampingFactor,X.phi*=1-Q.dampingFactor,q.multiplyScalar(1-Q.dampingFactor);else X.set(0,0,0),q.set(0,0,0);let ZJ=!1;if(Q.zoomToCursor&&C){let VJ=null;if(Q.object.isPerspectiveCamera){let kJ=j.length();VJ=v(kJ*H);let t0=kJ-VJ;Q.object.position.addScaledVector(B,t0),Q.object.updateMatrixWorld()}else if(Q.object.isOrthographicCamera){let kJ=new T(z.x,z.y,0);kJ.unproject(Q.object),Q.object.zoom=Math.max(Q.minZoom,Math.min(Q.maxZoom,Q.object.zoom/H)),Q.object.updateProjectionMatrix(),ZJ=!0;let t0=new T(z.x,z.y,0);t0.unproject(Q.object),Q.object.position.sub(t0).add(kJ),Q.object.updateMatrixWorld(),VJ=j.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),Q.zoomToCursor=!1;if(VJ!==null)if(this.screenSpacePanning)Q.target.set(0,0,-1).transformDirection(Q.object.matrix).multiplyScalar(VJ).add(Q.object.position);else if(VQ.origin.copy(Q.object.position),VQ.direction.set(0,0,-1).transformDirection(Q.object.matrix),Math.abs(Q.object.up.dot(VQ.direction))<d4)J.lookAt(Q.target);else uK.setFromNormalAndCoplanarPoint(Q.object.up,Q.target),VQ.intersectPlane(uK,Q.target)}else if(Q.object.isOrthographicCamera)Q.object.zoom=Math.max(Q.minZoom,Math.min(Q.maxZoom,Q.object.zoom/H)),Q.object.updateProjectionMatrix(),ZJ=!0;if(H=1,C=!1,ZJ||C0.distanceToSquared(Q.object.position)>W||8*(1-p0.dot(Q.object.quaternion))>W||O0.distanceToSquared(Q.target)>0)return Q.dispatchEvent(gK),C0.copy(Q.object.position),p0.copy(Q.object.quaternion),O0.copy(Q.target),!0;return!1}}(),this.dispose=function(){if(Q.domElement.removeEventListener("contextmenu",Y0),Q.domElement.removeEventListener("pointerdown",S0),Q.domElement.removeEventListener("pointercancel",M),Q.domElement.removeEventListener("wheel",Z0),Q.domElement.removeEventListener("pointermove",_),Q.domElement.removeEventListener("pointerup",M),Q._domElementKeyEvents!==null)Q._domElementKeyEvents.removeEventListener("keydown",A0),Q._domElementKeyEvents=null};let Q=this,Z={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},K=Z.NONE,W=0.000001,Y=new FQ,X=new FQ,H=1,q=new T,U=new H0,V=new H0,F=new H0,G=new H0,N=new H0,E=new H0,O=new H0,D=new H0,R=new H0,B=new T,z=new H0,C=!1,L=[],A={},w=!1;function I(j){if(j!==null)return 2*Math.PI/60*Q.autoRotateSpeed*j;else return 2*Math.PI/60/60*Q.autoRotateSpeed}function k(j){let $0=Math.abs(j*0.01);return Math.pow(0.95,Q.zoomSpeed*$0)}function b(j){X.theta-=j}function n(j){X.phi-=j}let i=function(){let j=new T;return function(E0,C0){j.setFromMatrixColumn(C0,0),j.multiplyScalar(-E0),q.add(j)}}(),y=function(){let j=new T;return function(E0,C0){if(Q.screenSpacePanning===!0)j.setFromMatrixColumn(C0,1);else j.setFromMatrixColumn(C0,0),j.crossVectors(Q.object.up,j);j.multiplyScalar(E0),q.add(j)}}(),h=function(){let j=new T;return function(E0,C0){let p0=Q.domElement;if(Q.object.isPerspectiveCamera){let O0=Q.object.position;j.copy(O0).sub(Q.target);let f=j.length();f*=Math.tan(Q.object.fov/2*Math.PI/180),i(2*E0*f/p0.clientHeight,Q.object.matrix),y(2*C0*f/p0.clientHeight,Q.object.matrix)}else if(Q.object.isOrthographicCamera)i(E0*(Q.object.right-Q.object.left)/Q.object.zoom/p0.clientWidth,Q.object.matrix),y(C0*(Q.object.top-Q.object.bottom)/Q.object.zoom/p0.clientHeight,Q.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),Q.enablePan=!1}}();function m(j){if(Q.object.isPerspectiveCamera||Q.object.isOrthographicCamera)H/=j;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Q.enableZoom=!1}function l(j){if(Q.object.isPerspectiveCamera||Q.object.isOrthographicCamera)H*=j;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Q.enableZoom=!1}function d(j,$0){if(!Q.zoomToCursor)return;C=!0;let E0=Q.domElement.getBoundingClientRect(),C0=j-E0.left,p0=$0-E0.top,O0=E0.width,f=E0.height;z.x=C0/O0*2-1,z.y=-(p0/f)*2+1,B.set(z.x,z.y,1).unproject(Q.object).sub(Q.object.position).normalize()}function v(j){return Math.max(Q.minDistance,Math.min(Q.maxDistance,j))}function u(j){U.set(j.clientX,j.clientY)}function r(j){d(j.clientX,j.clientX),O.set(j.clientX,j.clientY)}function g(j){G.set(j.clientX,j.clientY)}function t(j){V.set(j.clientX,j.clientY),F.subVectors(V,U).multiplyScalar(Q.rotateSpeed);let $0=Q.domElement;b(2*Math.PI*F.x/$0.clientHeight),n(2*Math.PI*F.y/$0.clientHeight),U.copy(V),Q.update()}function Q0(j){if(D.set(j.clientX,j.clientY),R.subVectors(D,O),R.y>0)m(k(R.y));else if(R.y<0)l(k(R.y));O.copy(D),Q.update()}function F0(j){N.set(j.clientX,j.clientY),E.subVectors(N,G).multiplyScalar(Q.panSpeed),h(E.x,E.y),G.copy(N),Q.update()}function R0(j){if(d(j.clientX,j.clientY),j.deltaY<0)l(k(j.deltaY));else if(j.deltaY>0)m(k(j.deltaY));Q.update()}function x0(j){let $0=!1;switch(j.code){case Q.keys.UP:if(j.ctrlKey||j.metaKey||j.shiftKey)n(2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else h(0,Q.keyPanSpeed);$0=!0;break;case Q.keys.BOTTOM:if(j.ctrlKey||j.metaKey||j.shiftKey)n(-2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else h(0,-Q.keyPanSpeed);$0=!0;break;case Q.keys.LEFT:if(j.ctrlKey||j.metaKey||j.shiftKey)b(2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else h(Q.keyPanSpeed,0);$0=!0;break;case Q.keys.RIGHT:if(j.ctrlKey||j.metaKey||j.shiftKey)b(-2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else h(-Q.keyPanSpeed,0);$0=!0;break}if($0)j.preventDefault(),Q.update()}function u0(j){if(L.length===1)U.set(j.pageX,j.pageY);else{let $0=M0(j),E0=0.5*(j.pageX+$0.x),C0=0.5*(j.pageY+$0.y);U.set(E0,C0)}}function w0(j){if(L.length===1)G.set(j.pageX,j.pageY);else{let $0=M0(j),E0=0.5*(j.pageX+$0.x),C0=0.5*(j.pageY+$0.y);G.set(E0,C0)}}function f0(j){let $0=M0(j),E0=j.pageX-$0.x,C0=j.pageY-$0.y,p0=Math.sqrt(E0*E0+C0*C0);O.set(0,p0)}function x(j){if(Q.enableZoom)f0(j);if(Q.enablePan)w0(j)}function D0(j){if(Q.enableZoom)f0(j);if(Q.enableRotate)u0(j)}function X0(j){if(L.length==1)V.set(j.pageX,j.pageY);else{let E0=M0(j),C0=0.5*(j.pageX+E0.x),p0=0.5*(j.pageY+E0.y);V.set(C0,p0)}F.subVectors(V,U).multiplyScalar(Q.rotateSpeed);let $0=Q.domElement;b(2*Math.PI*F.x/$0.clientHeight),n(2*Math.PI*F.y/$0.clientHeight),U.copy(V)}function W0(j){if(L.length===1)N.set(j.pageX,j.pageY);else{let $0=M0(j),E0=0.5*(j.pageX+$0.x),C0=0.5*(j.pageY+$0.y);N.set(E0,C0)}E.subVectors(N,G).multiplyScalar(Q.panSpeed),h(E.x,E.y),G.copy(N)}function K0(j){let $0=M0(j),E0=j.pageX-$0.x,C0=j.pageY-$0.y,p0=Math.sqrt(E0*E0+C0*C0);D.set(0,p0),R.set(0,Math.pow(D.y/O.y,Q.zoomSpeed)),m(R.y),O.copy(D);let O0=(j.pageX+$0.x)*0.5,f=(j.pageY+$0.y)*0.5;d(O0,f)}function z0(j){if(Q.enableZoom)K0(j);if(Q.enablePan)W0(j)}function N0(j){if(Q.enableZoom)K0(j);if(Q.enableRotate)X0(j)}function S0(j){if(Q.enabled===!1)return;if(L.length===0)Q.domElement.setPointerCapture(j.pointerId),Q.domElement.addEventListener("pointermove",_),Q.domElement.addEventListener("pointerup",M);if(OJ(j),j.pointerType==="touch")T0(j);else s(j)}function _(j){if(Q.enabled===!1)return;if(j.pointerType==="touch")h0(j);else q0(j)}function M(j){if(l0(j),L.length===0)Q.domElement.releasePointerCapture(j.pointerId),Q.domElement.removeEventListener("pointermove",_),Q.domElement.removeEventListener("pointerup",M);Q.dispatchEvent(mK),K=Z.NONE}function s(j){let $0;switch(j.button){case 0:$0=Q.mouseButtons.LEFT;break;case 1:$0=Q.mouseButtons.MIDDLE;break;case 2:$0=Q.mouseButtons.RIGHT;break;default:$0=-1}switch($0){case I9.DOLLY:if(Q.enableZoom===!1)return;r(j),K=Z.DOLLY;break;case I9.ROTATE:if(j.ctrlKey||j.metaKey||j.shiftKey){if(Q.enablePan===!1)return;g(j),K=Z.PAN}else{if(Q.enableRotate===!1)return;u(j),K=Z.ROTATE}break;case I9.PAN:if(j.ctrlKey||j.metaKey||j.shiftKey){if(Q.enableRotate===!1)return;u(j),K=Z.ROTATE}else{if(Q.enablePan===!1)return;g(j),K=Z.PAN}break;default:K=Z.NONE}if(K!==Z.NONE)Q.dispatchEvent(pZ)}function q0(j){switch(K){case Z.ROTATE:if(Q.enableRotate===!1)return;t(j);break;case Z.DOLLY:if(Q.enableZoom===!1)return;Q0(j);break;case Z.PAN:if(Q.enablePan===!1)return;F0(j);break}}function Z0(j){if(Q.enabled===!1||Q.enableZoom===!1||K!==Z.NONE)return;j.preventDefault(),Q.dispatchEvent(pZ),R0(U0(j)),Q.dispatchEvent(mK)}function U0(j){let $0=j.deltaMode,E0={clientX:j.clientX,clientY:j.clientY,deltaY:j.deltaY};switch($0){case 1:E0.deltaY*=16;break;case 2:E0.deltaY*=100;break}if(j.ctrlKey&&!w)E0.deltaY*=10;return E0}function y0(j){if(j.key==="Control")w=!0,document.addEventListener("keyup",V0,{passive:!0,capture:!0})}function V0(j){if(j.key==="Control")w=!1,document.removeEventListener("keyup",V0,{passive:!0,capture:!0})}function A0(j){if(Q.enabled===!1||Q.enablePan===!1)return;x0(j)}function T0(j){switch(v0(j),L.length){case 1:switch(Q.touches.ONE){case L9.ROTATE:if(Q.enableRotate===!1)return;u0(j),K=Z.TOUCH_ROTATE;break;case L9.PAN:if(Q.enablePan===!1)return;w0(j),K=Z.TOUCH_PAN;break;default:K=Z.NONE}break;case 2:switch(Q.touches.TWO){case L9.DOLLY_PAN:if(Q.enableZoom===!1&&Q.enablePan===!1)return;x(j),K=Z.TOUCH_DOLLY_PAN;break;case L9.DOLLY_ROTATE:if(Q.enableZoom===!1&&Q.enableRotate===!1)return;D0(j),K=Z.TOUCH_DOLLY_ROTATE;break;default:K=Z.NONE}break;default:K=Z.NONE}if(K!==Z.NONE)Q.dispatchEvent(pZ)}function h0(j){switch(v0(j),K){case Z.TOUCH_ROTATE:if(Q.enableRotate===!1)return;X0(j),Q.update();break;case Z.TOUCH_PAN:if(Q.enablePan===!1)return;W0(j),Q.update();break;case Z.TOUCH_DOLLY_PAN:if(Q.enableZoom===!1&&Q.enablePan===!1)return;z0(j),Q.update();break;case Z.TOUCH_DOLLY_ROTATE:if(Q.enableZoom===!1&&Q.enableRotate===!1)return;N0(j),Q.update();break;default:K=Z.NONE}}function Y0(j){if(Q.enabled===!1)return;j.preventDefault()}function OJ(j){L.push(j.pointerId)}function l0(j){delete A[j.pointerId];for(let $0=0;$0<L.length;$0++)if(L[$0]==j.pointerId){L.splice($0,1);return}}function v0(j){let $0=A[j.pointerId];if($0===void 0)$0=new H0,A[j.pointerId]=$0;$0.set(j.pageX,j.pageY)}function M0(j){let $0=j.pointerId===L[0]?L[1]:L[0];return A[$0]}Q.domElement.addEventListener("contextmenu",Y0),Q.domElement.addEventListener("pointerdown",S0),Q.domElement.addEventListener("pointercancel",M),Q.domElement.addEventListener("wheel",Z0,{passive:!1}),document.addEventListener("keydown",y0,{passive:!0,capture:!0}),this.update()}}function c8(J){if(J===void 0)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return J}function rK(J,$){J.prototype=Object.create($.prototype),J.prototype.constructor=J,J.__proto__=$}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Z8={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Z$={duration:0.5,overwrite:!1,delay:0},H5,gJ,NJ,E8=1e8,qJ=1/E8,tZ=Math.PI*2,p4=tZ/4,l4=0,aK=Math.sqrt,c4=Math.cos,n4=Math.sin,xJ=function($){return typeof $==="string"},AJ=function($){return typeof $==="function"},s8=function($){return typeof $==="number"},LQ=function($){return typeof $>"u"},y8=function($){return typeof $==="object"},Q8=function($){return $!==!1},q5=function(){return typeof window<"u"},GQ=function($){return AJ($)||xJ($)},tK=typeof ArrayBuffer==="function"&&ArrayBuffer.isView||function(){},nJ=Array.isArray,s4=/random\([^)]+\)/g,i4=/,\s*/g,dK=/(?:-?\.?\d|\.)+/gi,U5=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,_9=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,cZ=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,F5=/[+-]=-?[.\d]+/,o4=/[^,'"\[\]\s]+/gi,r4=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,IJ,T8,eZ,V5,U8={},NQ={},eK,JW=function($){return(NQ=E7($,U8))&&sJ},CQ=function($,Q){return console.warn("Invalid property",$,"set to",Q,"Missing plugin? gsap.registerPlugin()")},K$=function($,Q){return!Q&&console.warn($)},$W=function($,Q){return $&&(U8[$]=Q)&&NQ&&(NQ[$]=Q)||U8},W$=function(){return 0},a4={suppressEvents:!0,isStart:!0,kill:!1},OQ={suppressEvents:!0,kill:!1},t4={suppressEvents:!0},G5={},K9=[],J5={},QW,J8={},nZ={},pK=30,DQ=[],O5="",D5=function($){var Q=$[0],Z,K;if(y8(Q)||AJ(Q)||($=[$]),!(Z=(Q._gsap||{}).harness)){K=DQ.length;while(K--&&!DQ[K].targetTest(Q));Z=DQ[K]}K=$.length;while(K--)$[K]&&($[K]._gsap||($[K]._gsap=new B5($[K],Z)))||$.splice(K,1);return $},W9=function($){return $._gsap||D5(N8($))[0]._gsap},E5=function($,Q,Z){return(Z=$[Q])&&AJ(Z)?$[Q]():LQ(Z)&&$.getAttribute&&$.getAttribute(Q)||Z},rJ=function($,Q){return($=$.split(",")).forEach(Q)||$},MJ=function($){return Math.round($*1e5)/1e5||0},zJ=function($){return Math.round($*1e7)/1e7||0},w9=function($,Q){var Z=Q.charAt(0),K=parseFloat(Q.substr(2));return $=parseFloat($),Z==="+"?$+K:Z==="-"?$-K:Z==="*"?$*K:$/K},e4=function($,Q){var Z=Q.length,K=0;for(;$.indexOf(Q[K])<0&&++K<Z;);return K<Z},RQ=function(){var $=K9.length,Q=K9.slice(0),Z,K;J5={},K9.length=0;for(Z=0;Z<$;Z++)K=Q[Z],K&&K._lazy&&(K.render(K._lazy[0],K._lazy[1],!0)._lazy=0)},N5=function($){return!!($._initted||$._startAt||$.add)},ZW=function($,Q,Z,K){K9.length&&!gJ&&RQ(),$.render(Q,Z,K||!!(gJ&&Q<0&&N5($))),K9.length&&!gJ&&RQ()},KW=function($){var Q=parseFloat($);return(Q||Q===0)&&($+"").match(o4).length<2?Q:xJ($)?$.trim():$},WW=function($){return $},K8=function($,Q){for(var Z in Q)Z in $||($[Z]=Q[Z]);return $},JU=function($){return function(Q,Z){for(var K in Z)K in Q||K==="duration"&&$||K==="ease"||(Q[K]=Z[K])}},E7=function($,Q){for(var Z in Q)$[Z]=Q[Z];return $},lK=function J($,Q){for(var Z in Q)Z!=="__proto__"&&Z!=="constructor"&&Z!=="prototype"&&($[Z]=y8(Q[Z])?J($[Z]||($[Z]={}),Q[Z]):Q[Z]);return $},BQ=function($,Q){var Z={},K;for(K in $)K in Q||(Z[K]=$[K]);return Z},J$=function($){var Q=$.parent||IJ,Z=$.keyframes?JU(nJ($.keyframes)):K8;if(Q8($.inherit))while(Q)Z($,Q.vars.defaults),Q=Q.parent||Q._dp;return $},$U=function($,Q){var Z=$.length,K=Z===Q.length;while(K&&Z--&&$[Z]===Q[Z]);return Z<0},XW=function($,Q,Z,K,W){if(Z===void 0)Z="_first";if(K===void 0)K="_last";var Y=$[K],X;if(W){X=Q[W];while(Y&&Y[W]>X)Y=Y._prev}if(Y)Q._next=Y._next,Y._next=Q;else Q._next=$[Z],$[Z]=Q;if(Q._next)Q._next._prev=Q;else $[K]=Q;return Q._prev=Y,Q.parent=Q._dp=$,Q},H$=function($,Q,Z,K){if(Z===void 0)Z="_first";if(K===void 0)K="_last";var{_prev:W,_next:Y}=Q;if(W)W._next=Y;else if($[Z]===Q)$[Z]=Y;if(Y)Y._prev=W;else if($[K]===Q)$[K]=W;Q._next=Q._prev=Q.parent=null},X9=function($,Q){$.parent&&(!Q||$.parent.autoRemoveChildren)&&$.parent.remove&&$.parent.remove($),$._act=0},k9=function($,Q){if($&&(!Q||Q._end>$._dur||Q._start<0)){var Z=$;while(Z)Z._dirty=1,Z=Z.parent}return $},QU=function($){var Q=$.parent;while(Q&&Q.parent)Q._dirty=1,Q.totalDuration(),Q=Q.parent;return $},$5=function($,Q,Z,K){return $._startAt&&(gJ?$._startAt.revert(OQ):$.vars.immediateRender&&!$.vars.autoRevert||$._startAt.render(Q,!0,K))},ZU=function J($){return!$||$._ts&&J($.parent)},cK=function($){return $._repeat?N7($._tTime,$=$.duration()+$._rDelay)*$:0},N7=function($,Q){var Z=Math.floor($=zJ($/Q));return $&&Z===$?Z-1:Z},zQ=function($,Q){return($-Q._start)*Q._ts+(Q._ts>=0?0:Q._dirty?Q.totalDuration():Q._tDur)},AQ=function($){return $._end=zJ($._start+($._tDur/Math.abs($._ts||$._rts||qJ)||0))},MQ=function($,Q){var Z=$._dp;if(Z&&Z.smoothChildTiming&&$._ts)$._start=zJ(Z._time-($._ts>0?Q/$._ts:(($._dirty?$.totalDuration():$._tDur)-Q)/-$._ts)),AQ($),Z._dirty||k9(Z,$);return $},YW=function($,Q){var Z;if(Q._time||!Q._dur&&Q._initted||Q._start<$._time&&(Q._dur||!Q.add)){if(Z=zQ($.rawTime(),Q),!Q._dur||q$(0,Q.totalDuration(),Z)-Q._tTime>qJ)Q.render(Z,!0)}if(k9($,Q)._dp&&$._initted&&$._time>=$._dur&&$._ts){if($._dur<$.duration()){Z=$;while(Z._dp)Z.rawTime()>=0&&Z.totalTime(Z._tTime),Z=Z._dp}$._zTime=-qJ}},j8=function($,Q,Z,K){return Q.parent&&X9(Q),Q._start=zJ((s8(Z)?Z:Z||$!==IJ?D8($,Z,Q):$._time)+Q._delay),Q._end=zJ(Q._start+(Q.totalDuration()/Math.abs(Q.timeScale())||0)),XW($,Q,"_first","_last",$._sort?"_start":0),Q5(Q)||($._recent=Q),K||YW($,Q),$._ts<0&&MQ($,$._tTime),$},HW=function($,Q){return(U8.ScrollTrigger||CQ("scrollTrigger",Q))&&U8.ScrollTrigger.create(Q,$)},qW=function($,Q,Z,K,W){if(L5($,Q,W),!$._initted)return 1;if(!Z&&$._pt&&!gJ&&($._dur&&$.vars.lazy!==!1||!$._dur&&$.vars.lazy)&&QW!==$8.frame)return K9.push($),$._lazy=[W,K],1},KU=function J($){var Q=$.parent;return Q&&Q._ts&&Q._initted&&!Q._lock&&(Q.rawTime()<0||J(Q))},Q5=function($){var Q=$.data;return Q==="isFromStart"||Q==="isStart"},WU=function($,Q,Z,K){var W=$.ratio,Y=Q<0||!Q&&(!$._start&&KU($)&&!(!$._initted&&Q5($))||($._ts<0||$._dp._ts<0)&&!Q5($))?0:1,X=$._rDelay,H=0,q,U,V;if(X&&$._repeat){if(H=q$(0,$._tDur,Q),U=N7(H,X),$._yoyo&&U&1&&(Y=1-Y),U!==N7($._tTime,X))W=1-Y,$.vars.repeatRefresh&&$._initted&&$.invalidate()}if(Y!==W||gJ||K||$._zTime===qJ||!Q&&$._zTime){if(!$._initted&&qW($,Q,K,Z,H))return;V=$._zTime,$._zTime=Q||(Z?qJ:0),Z||(Z=Q&&!V),$.ratio=Y,$._from&&(Y=1-Y),$._time=0,$._tTime=H,q=$._pt;while(q)q.r(Y,q.d),q=q._next;if(Q<0&&$5($,Q,Z,!0),$._onUpdate&&!Z&&q8($,"onUpdate"),H&&$._repeat&&!Z&&$.parent&&q8($,"onRepeat"),(Q>=$._tDur||Q<0)&&$.ratio===Y){if(Y&&X9($,1),!Z&&!gJ)q8($,Y?"onComplete":"onReverseComplete",!0),$._prom&&$._prom()}}else if(!$._zTime)$._zTime=Q},XU=function($,Q,Z){var K;if(Z>Q){K=$._first;while(K&&K._start<=Z){if(K.data==="isPause"&&K._start>Q)return K;K=K._next}}else{K=$._last;while(K&&K._start>=Z){if(K.data==="isPause"&&K._start<Q)return K;K=K._prev}}},R7=function($,Q,Z,K){var W=$._repeat,Y=zJ(Q)||0,X=$._tTime/$._tDur;return X&&!K&&($._time*=Y/$._dur),$._dur=Y,$._tDur=!W?Y:W<0?10000000000:zJ(Y*(W+1)+$._rDelay*W),X>0&&!K&&MQ($,$._tTime=$._tDur*X),$.parent&&AQ($),Z||k9($.parent,$),$},nK=function($){return $ instanceof cJ?k9($):R7($,$._dur)},YU={_start:0,endTime:W$,totalDuration:W$},D8=function J($,Q,Z){var K=$.labels,W=$._recent||YU,Y=$.duration()>=E8?W.endTime(!1):$._dur,X,H,q;if(xJ(Q)&&(isNaN(Q)||(Q in K))){if(H=Q.charAt(0),q=Q.substr(-1)==="%",X=Q.indexOf("="),H==="<"||H===">")return X>=0&&(Q=Q.replace(/=/,"")),(H==="<"?W._start:W.endTime(W._repeat>=0))+(parseFloat(Q.substr(1))||0)*(q?(X<0?W:Z).totalDuration()/100:1);if(X<0)return Q in K||(K[Q]=Y),K[Q];if(H=parseFloat(Q.charAt(X-1)+Q.substr(X+1)),q&&Z)H=H/100*(nJ(Z)?Z[0]:Z).totalDuration();return X>1?J($,Q.substr(0,X-1),Z)+H:Y+H}return Q==null?Y:+Q},$$=function($,Q,Z){var K=s8(Q[1]),W=(K?2:1)+($<2?0:1),Y=Q[W],X,H;if(K&&(Y.duration=Q[1]),Y.parent=Z,$){X=Y,H=Z;while(H&&!("immediateRender"in X))X=H.vars.defaults||{},H=Q8(H.vars.inherit)&&H.parent;Y.immediateRender=Q8(X.immediateRender),$<2?Y.runBackwards=1:Y.startAt=Q[W-1]}return new SJ(Q[0],Y,Q[W+1])},Y9=function($,Q){return $||$===0?Q($):Q},q$=function($,Q,Z){return Z<$?$:Z>Q?Q:Z},mJ=function($,Q){return!xJ($)||!(Q=r4.exec($))?"":Q[1]},HU=function($,Q,Z){return Y9(Z,function(K){return q$($,Q,K)})},Z5=[].slice,UW=function($,Q){return $&&y8($)&&"length"in $&&(!Q&&!$.length||($.length-1 in $)&&y8($[0]))&&!$.nodeType&&$!==T8},qU=function($,Q,Z){if(Z===void 0)Z=[];return $.forEach(function(K){var W;return xJ(K)&&!Q||UW(K,1)?(W=Z).push.apply(W,N8(K)):Z.push(K)})||Z},N8=function($,Q,Z){return NJ&&!Q&&NJ.selector?NJ.selector($):xJ($)&&!Z&&(eZ||!B7())?Z5.call((Q||V5).querySelectorAll($),0):nJ($)?qU($,Z):UW($)?Z5.call($,0):$?[$]:[]},K5=function($){return $=N8($)[0]||K$("Invalid scope")||{},function(Q){var Z=$.current||$.nativeElement||$;return N8(Q,Z.querySelectorAll?Z:Z===$?K$("Invalid scope")||V5.createElement("div"):$)}},FW=function($){return $.sort(function(){return 0.5-Math.random()})},VW=function($){if(AJ($))return $;var Q=y8($)?$:{each:$},Z=P9(Q.ease),K=Q.from||0,W=parseFloat(Q.base)||0,Y={},X=K>0&&K<1,H=isNaN(K)||X,q=Q.axis,U=K,V=K;if(xJ(K))U=V={center:0.5,edges:0.5,end:1}[K]||0;else if(!X&&H)U=K[0],V=K[1];return function(F,G,N){var E=(N||Q).length,O=Y[E],D,R,B,z,C,L,A,w,I;if(!O){if(I=Q.grid==="auto"?0:(Q.grid||[1,E8])[1],!I){A=-E8;while(A<(A=N[I++].getBoundingClientRect().left)&&I<E);I<E&&I--}O=Y[E]=[],D=H?Math.min(I,E)*U-0.5:K%I,R=I===E8?0:H?E*V/I-0.5:K/I|0,A=0,w=E8;for(L=0;L<E;L++)B=L%I-D,z=R-(L/I|0),O[L]=C=!q?aK(B*B+z*z):Math.abs(q==="y"?z:B),C>A&&(A=C),C<w&&(w=C);K==="random"&&FW(O),O.max=A-w,O.min=w,O.v=E=(parseFloat(Q.amount)||parseFloat(Q.each)*(I>E?E-1:!q?Math.max(I,E/I):q==="y"?E/I:I)||0)*(K==="edges"?-1:1),O.b=E<0?W-E:W,O.u=mJ(Q.amount||Q.each)||0,Z=Z&&E<0?LU(Z):Z}return E=(O[F]-O.min)/O.max||0,zJ(O.b+(Z?Z(E):E)*O.v)+O.u}},W5=function($){var Q=Math.pow(10,(($+"").split(".")[1]||"").length);return function(Z){var K=zJ(Math.round(parseFloat(Z)/$)*$*Q);return(K-K%1)/Q+(s8(Z)?0:mJ(Z))}},GW=function($,Q){var Z=nJ($),K,W;if(!Z&&y8($))if(K=Z=$.radius||E8,$.values){if($=N8($.values),W=!s8($[0]))K*=K}else $=W5($.increment);return Y9(Q,!Z?W5($):AJ($)?function(Y){return W=$(Y),Math.abs(W-Y)<=K?W:Y}:function(Y){var X=parseFloat(W?Y.x:Y),H=parseFloat(W?Y.y:0),q=E8,U=0,V=$.length,F,G;while(V--){if(W)F=$[V].x-X,G=$[V].y-H,F=F*F+G*G;else F=Math.abs($[V]-X);if(F<q)q=F,U=V}return U=!K||q<=K?$[U]:Y,W||U===Y||s8(Y)?U:U+mJ(Y)})},OW=function($,Q,Z,K){return Y9(nJ($)?!Q:Z===!0?!!(Z=0):!K,function(){return nJ($)?$[~~(Math.random()*$.length)]:(Z=Z||0.00001)&&(K=Z<1?Math.pow(10,(Z+"").length-2):1)&&Math.floor(Math.round(($-Z/2+Math.random()*(Q-$+Z*0.99))/Z)*Z*K)/K})},UU=function(){for(var $=arguments.length,Q=Array($),Z=0;Z<$;Z++)Q[Z]=arguments[Z];return function(K){return Q.reduce(function(W,Y){return Y(W)},K)}},FU=function($,Q){return function(Z){return $(parseFloat(Z))+(Q||mJ(Z))}},VU=function($,Q,Z){return EW($,Q,0,1,Z)},DW=function($,Q,Z){return Y9(Z,function(K){return $[~~Q(K)]})},GU=function J($,Q,Z){var K=Q-$;return nJ($)?DW($,J(0,$.length),Q):Y9(Z,function(W){return(K+(W-$)%K)%K+$})},OU=function J($,Q,Z){var K=Q-$,W=K*2;return nJ($)?DW($,J(0,$.length-1),Q):Y9(Z,function(Y){return Y=(W+(Y-$)%W)%W||0,$+(Y>K?W-Y:Y)})},z7=function($){return $.replace(s4,function(Q){var Z=Q.indexOf("[")+1,K=Q.substring(Z||7,Z?Q.indexOf("]"):Q.length-1).split(i4);return OW(Z?K:+K[0],Z?0:+K[1],+K[2]||0.00001)})},EW=function($,Q,Z,K,W){var Y=Q-$,X=K-Z;return Y9(W,function(H){return Z+((H-$)/Y*X||0)})},DU=function J($,Q,Z,K){var W=isNaN($+Q)?0:function(G){return(1-G)*$+G*Q};if(!W){var Y=xJ($),X={},H,q,U,V,F;if(Z===!0&&(K=1)&&(Z=null),Y)$={p:$},Q={p:Q};else if(nJ($)&&!nJ(Q)){U=[],V=$.length,F=V-2;for(q=1;q<V;q++)U.push(J($[q-1],$[q]));V--,W=function(N){N*=V;var E=Math.min(F,~~N);return U[E](N-E)},Z=Q}else if(!K)$=E7(nJ($)?[]:{},$);if(!U){for(H in Q)z5.call(X,$,H,"get",Q[H]);W=function(N){return M5(N,X)||(Y?$.p:$)}}}return Y9(Z,W)},sK=function($,Q,Z){var K=$.labels,W=E8,Y,X,H;for(Y in K)if(X=K[Y]-Q,X<0===!!Z&&X&&W>(X=Math.abs(X)))H=Y,W=X;return H},q8=function($,Q,Z){var K=$.vars,W=K[Q],Y=NJ,X=$._ctx,H,q,U;if(!W)return;return H=K[Q+"Params"],q=K.callbackScope||$,Z&&K9.length&&RQ(),X&&(NJ=X),U=H?W.apply(q,H):W.call(q),NJ=Y,U},t7=function($){return X9($),$.scrollTrigger&&$.scrollTrigger.kill(!!gJ),$.progress()<1&&q8($,"onInterrupt"),$},D7,NW=[],RW=function($){if(!$)return;if($=!$.name&&$.default||$,q5()||$.headless){var Q=$.name,Z=AJ($),K=Q&&!Z&&$.init?function(){this._props=[]}:$,W={init:W$,render:M5,add:z5,kill:jU,modifier:TU,rawVars:0},Y={targetTest:0,get:0,getSetter:kQ,aliases:{},register:0};if(B7(),$!==K){if(J8[Q])return;if(K8(K,K8(BQ($,W),Y)),E7(K.prototype,E7(W,BQ($,Y))),J8[K.prop=Q]=K,$.targetTest)DQ.push(K),G5[Q]=1;Q=(Q==="css"?"CSS":Q.charAt(0).toUpperCase()+Q.substr(1))+"Plugin"}$W(Q,K),$.register&&$.register(sJ,K,aJ)}else NW.push($)},HJ=255,e7={aqua:[0,HJ,HJ],lime:[0,HJ,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,HJ],navy:[0,0,128],white:[HJ,HJ,HJ],olive:[128,128,0],yellow:[HJ,HJ,0],orange:[HJ,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[HJ,0,0],pink:[HJ,192,203],cyan:[0,HJ,HJ],transparent:[HJ,HJ,HJ,0]},sZ=function($,Q,Z){return $+=$<0?1:$>1?-1:0,($*6<1?Q+(Z-Q)*$*6:$<0.5?Z:$*3<2?Q+(Z-Q)*(0.6666666666666666-$)*6:Q)*HJ+0.5|0},BW=function($,Q,Z){var K=!$?e7.black:s8($)?[$>>16,$>>8&HJ,$&HJ]:0,W,Y,X,H,q,U,V,F,G,N;if(!K){if($.substr(-1)===",")$=$.substr(0,$.length-1);if(e7[$])K=e7[$];else if($.charAt(0)==="#"){if($.length<6)W=$.charAt(1),Y=$.charAt(2),X=$.charAt(3),$="#"+W+W+Y+Y+X+X+($.length===5?$.charAt(4)+$.charAt(4):"");if($.length===9)return K=parseInt($.substr(1,6),16),[K>>16,K>>8&HJ,K&HJ,parseInt($.substr(7),16)/255];$=parseInt($.substr(1),16),K=[$>>16,$>>8&HJ,$&HJ]}else if($.substr(0,3)==="hsl"){if(K=N=$.match(dK),!Q)H=+K[0]%360/360,q=+K[1]/100,U=+K[2]/100,Y=U<=0.5?U*(q+1):U+q-U*q,W=U*2-Y,K.length>3&&(K[3]*=1),K[0]=sZ(H+0.3333333333333333,W,Y),K[1]=sZ(H,W,Y),K[2]=sZ(H-0.3333333333333333,W,Y);else if(~$.indexOf("="))return K=$.match(U5),Z&&K.length<4&&(K[3]=1),K}else K=$.match(dK)||e7.transparent;K=K.map(Number)}if(Q&&!N){if(W=K[0]/HJ,Y=K[1]/HJ,X=K[2]/HJ,V=Math.max(W,Y,X),F=Math.min(W,Y,X),U=(V+F)/2,V===F)H=q=0;else G=V-F,q=U>0.5?G/(2-V-F):G/(V+F),H=V===W?(Y-X)/G+(Y<X?6:0):V===Y?(X-W)/G+2:(W-Y)/G+4,H*=60;K[0]=~~(H+0.5),K[1]=~~(q*100+0.5),K[2]=~~(U*100+0.5)}return Z&&K.length<4&&(K[3]=1),K},zW=function($){var Q=[],Z=[],K=-1;return $.split(n8).forEach(function(W){var Y=W.match(_9)||[];Q.push.apply(Q,Y),Z.push(K+=Y.length+1)}),Q.c=Z,Q},iK=function($,Q,Z){var K="",W=($+K).match(n8),Y=Q?"hsla(":"rgba(",X=0,H,q,U,V;if(!W)return $;if(W=W.map(function(F){return(F=BW(F,Q,1))&&Y+(Q?F[0]+","+F[1]+"%,"+F[2]+"%,"+F[3]:F.join(","))+")"}),Z){if(U=zW($),H=Z.c,H.join(K)!==U.c.join(K)){q=$.replace(n8,"1").split(_9),V=q.length-1;for(;X<V;X++)K+=q[X]+(~H.indexOf(X)?W.shift()||Y+"0,0,0,0)":(U.length?U:W.length?W:Z).shift())}}if(!q){q=$.split(n8),V=q.length-1;for(;X<V;X++)K+=q[X]+W[X]}return K+q[V]},n8=function(){var J="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",$;for($ in e7)J+="|"+$+"\\b";return new RegExp(J+")","gi")}(),EU=/hsl[a]?\(/,R5=function($){var Q=$.join(" "),Z;if(n8.lastIndex=0,n8.test(Q))return Z=EU.test(Q),$[1]=iK($[1],Z),$[0]=iK($[0],Z,zW($[1])),!0},X$,$8=function(){var J=Date.now,$=500,Q=33,Z=J(),K=Z,W=4.166666666666667,Y=W,X=[],H,q,U,V,F,G,N=function E(O){var D=J()-K,R=O===!0,B,z,C,L;if((D>$||D<0)&&(Z+=D-Q),K+=D,C=K-Z,B=C-Y,B>0||R)L=++V.frame,F=C-V.time*1000,V.time=C=C/1000,Y+=B+(B>=W?4:W-B),z=1;if(R||(H=q(E)),z)for(G=0;G<X.length;G++)X[G](C,F,L,O)};return V={time:0,frame:0,tick:function(){N(!0)},deltaRatio:function(O){return F/(1000/(O||60))},wake:function(){if(eK){if(!eZ&&q5())T8=eZ=window,V5=T8.document||{},U8.gsap=sJ,(T8.gsapVersions||(T8.gsapVersions=[])).push(sJ.version),JW(NQ||T8.GreenSockGlobals||!T8.gsap&&T8||{}),NW.forEach(RW);U=typeof requestAnimationFrame<"u"&&requestAnimationFrame,H&&V.sleep(),q=U||function(O){return setTimeout(O,Y-V.time*1000+1|0)},X$=1,N(2)}},sleep:function(){(U?cancelAnimationFrame:clearTimeout)(H),X$=0,q=W$},lagSmoothing:function(O,D){$=O||1/0,Q=Math.min(D||33,$)},fps:function(O){W=1000/(O||240),Y=V.time*1000+W},add:function(O,D,R){var B=D?function(z,C,L,A){O(z,C,L,A),V.remove(B)}:O;return V.remove(O),X[R?"unshift":"push"](B),B7(),B},remove:function(O,D){~(D=X.indexOf(O))&&X.splice(D,1)&&G>=D&&G--},_listeners:X},V}(),B7=function(){return!X$&&$8.wake()},JJ={},NU=/^[\d.\-M][\d.\-,\s]/,RU=/["']/g,BU=function($){var Q={},Z=$.substr(1,$.length-3).split(":"),K=Z[0],W=1,Y=Z.length,X,H,q;for(;W<Y;W++)H=Z[W],X=W!==Y-1?H.lastIndexOf(","):H.length,q=H.substr(0,X),Q[K]=isNaN(q)?q.replace(RU,"").trim():+q,K=H.substr(X+1).trim();return Q},zU=function($){var Q=$.indexOf("(")+1,Z=$.indexOf(")"),K=$.indexOf("(",Q);return $.substring(Q,~K&&K<Z?$.indexOf(")",Z+1):Z)},IU=function($){var Q=($+"").split("("),Z=JJ[Q[0]];return Z&&Q.length>1&&Z.config?Z.config.apply(null,~$.indexOf("{")?[BU(Q[1])]:zU($).split(",").map(KW)):JJ._CE&&NU.test($)?JJ._CE("",$):Z},LU=function($){return function(Q){return 1-$(1-Q)}},P9=function($,Q){return!$?Q:(AJ($)?$:JJ[$]||IU($))||Q},T9=function($,Q,Z,K){if(Z===void 0)Z=function(H){return 1-Q(1-H)};if(K===void 0)K=function(H){return H<0.5?Q(H*2)/2:1-Q((1-H)*2)/2};var W={easeIn:Q,easeOut:Z,easeInOut:K},Y;return rJ($,function(X){JJ[X]=U8[X]=W,JJ[Y=X.toLowerCase()]=Z;for(var H in W)JJ[Y+(H==="easeIn"?".in":H==="easeOut"?".out":".inOut")]=JJ[X+"."+H]=W[H]}),W},IW=function($){return function(Q){return Q<0.5?(1-$(1-Q*2))/2:0.5+$((Q-0.5)*2)/2}},iZ=function J($,Q,Z){var K=Q>=1?Q:1,W=(Z||($?0.3:0.45))/(Q<1?Q:1),Y=W/tZ*(Math.asin(1/K)||0),X=function(U){return U===1?1:K*Math.pow(2,-10*U)*n4((U-Y)*W)+1},H=$==="out"?X:$==="in"?function(q){return 1-X(1-q)}:IW(X);return W=tZ/W,H.config=function(q,U){return J($,q,U)},H},oZ=function J($,Q){if(Q===void 0)Q=1.70158;var Z=function(Y){return Y?--Y*Y*((Q+1)*Y+Q)+1:0},K=$==="out"?Z:$==="in"?function(W){return 1-Z(1-W)}:IW(Z);return K.config=function(W){return J($,W)},K};rJ("Linear,Quad,Cubic,Quart,Quint,Strong",function(J,$){var Q=$<5?$+1:$;T9(J+",Power"+(Q-1),$?function(Z){return Math.pow(Z,Q)}:function(Z){return Z},function(Z){return 1-Math.pow(1-Z,Q)},function(Z){return Z<0.5?Math.pow(Z*2,Q)/2:1-Math.pow((1-Z)*2,Q)/2})});JJ.Linear.easeNone=JJ.none=JJ.Linear.easeIn;T9("Elastic",iZ("in"),iZ("out"),iZ());(function(J,$){var Q=1/$,Z=2*Q,K=2.5*Q,W=function(X){return X<Q?J*X*X:X<Z?J*Math.pow(X-1.5/$,2)+0.75:X<K?J*(X-=2.25/$)*X+0.9375:J*Math.pow(X-2.625/$,2)+0.984375};T9("Bounce",function(Y){return 1-W(1-Y)},W)})(7.5625,2.75);T9("Expo",function(J){return Math.pow(2,10*(J-1))*J+J*J*J*J*J*J*(1-J)});T9("Circ",function(J){return-(aK(1-J*J)-1)});T9("Sine",function(J){return J===1?1:-c4(J*p4)+1});T9("Back",oZ("in"),oZ("out"),oZ());JJ.SteppedEase=JJ.steps=U8.SteppedEase={config:function($,Q){if($===void 0)$=1;var Z=1/$,K=$+(Q?0:1),W=Q?1:0,Y=1-qJ;return function(X){return((K*q$(0,Y,X)|0)+W)*Z}}};Z$.ease=JJ["quad.out"];rJ("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(J){return O5+=J+","+J+"Params,"});var B5=function($,Q){this.id=l4++,$._gsap=this,this.target=$,this.harness=Q,this.get=Q?Q.get:E5,this.set=Q?Q.getSetter:kQ},Y$=function(){function J(Q){if(this.vars=Q,this._delay=+Q.delay||0,this._repeat=Q.repeat===1/0?-2:Q.repeat||0)this._rDelay=Q.repeatDelay||0,this._yoyo=!!Q.yoyo||!!Q.yoyoEase;if(this._ts=1,R7(this,+Q.duration,1,1),this.data=Q.data,NJ)this._ctx=NJ,NJ.data.push(this);X$||$8.wake()}var $=J.prototype;return $.delay=function(Z){if(Z||Z===0)return this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+Z-this._delay),this._delay=Z,this;return this._delay},$.duration=function(Z){return arguments.length?this.totalDuration(this._repeat>0?Z+(Z+this._rDelay)*this._repeat:Z):this.totalDuration()&&this._dur},$.totalDuration=function(Z){if(!arguments.length)return this._tDur;return this._dirty=0,R7(this,this._repeat<0?Z:(Z-this._repeat*this._rDelay)/(this._repeat+1))},$.totalTime=function(Z,K){if(B7(),!arguments.length)return this._tTime;var W=this._dp;if(W&&W.smoothChildTiming&&this._ts){MQ(this,Z),!W._dp||W.parent||YW(W,this);while(W&&W.parent){if(W.parent._time!==W._start+(W._ts>=0?W._tTime/W._ts:(W.totalDuration()-W._tTime)/-W._ts))W.totalTime(W._tTime,!0);W=W.parent}if(!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&Z<this._tDur||this._ts<0&&Z>0||!this._tDur&&!Z))j8(this._dp,this,this._start-this._delay)}if(this._tTime!==Z||!this._dur&&!K||this._initted&&Math.abs(this._zTime)===qJ||!this._initted&&this._dur&&Z||!Z&&!this._initted&&(this.add||this._ptLookup))this._ts||(this._pTime=Z),ZW(this,Z,K);return this},$.time=function(Z,K){return arguments.length?this.totalTime(Math.min(this.totalDuration(),Z+cK(this))%(this._dur+this._rDelay)||(Z?this._dur:0),K):this._time},$.totalProgress=function(Z,K){return arguments.length?this.totalTime(this.totalDuration()*Z,K):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},$.progress=function(Z,K){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-Z:Z)+cK(this),K):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},$.iteration=function(Z,K){var W=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(Z-1)*W,K):this._repeat?N7(this._tTime,W)+1:1},$.timeScale=function(Z,K){if(!arguments.length)return this._rts===-qJ?0:this._rts;if(this._rts===Z)return this;var W=this.parent&&this._ts?zQ(this.parent._time,this):this._tTime;return this._rts=+Z||0,this._ts=this._ps||Z===-qJ?0:this._rts,this.totalTime(q$(-Math.abs(this._delay),this.totalDuration(),W),K!==!1),AQ(this),QU(this)},$.paused=function(Z){if(!arguments.length)return this._ps;if(this._ps!==Z)if(this._ps=Z,Z)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else B7(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==qJ&&(this._tTime-=qJ));return this},$.startTime=function(Z){if(arguments.length){this._start=zJ(Z);var K=this.parent||this._dp;return K&&(K._sort||!this.parent)&&j8(K,this,this._start-this._delay),this}return this._start},$.endTime=function(Z){return this._start+(Q8(Z)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},$.rawTime=function(Z){var K=this.parent||this._dp;return!K?this._tTime:Z&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):!this._ts?this._tTime:zQ(K.rawTime(Z),this)},$.revert=function(Z){if(Z===void 0)Z=t4;var K=gJ;if(gJ=Z,N5(this))this.timeline&&this.timeline.revert(Z),this.totalTime(-0.01,Z.suppressEvents);return this.data!=="nested"&&Z.kill!==!1&&this.kill(),gJ=K,this},$.globalTime=function(Z){var K=this,W=arguments.length?Z:K.rawTime();while(K)W=K._start+W/(Math.abs(K._ts)||1),K=K._dp;return!this.parent&&this._sat?this._sat.globalTime(Z):W},$.repeat=function(Z){if(arguments.length)return this._repeat=Z===1/0?-2:Z,nK(this);return this._repeat===-2?1/0:this._repeat},$.repeatDelay=function(Z){if(arguments.length){var K=this._time;return this._rDelay=Z,nK(this),K?this.time(K):this}return this._rDelay},$.yoyo=function(Z){if(arguments.length)return this._yoyo=Z,this;return this._yoyo},$.seek=function(Z,K){return this.totalTime(D8(this,Z),Q8(K))},$.restart=function(Z,K){return this.play().totalTime(Z?-this._delay:0,Q8(K)),this._dur||(this._zTime=-qJ),this},$.play=function(Z,K){return Z!=null&&this.seek(Z,K),this.reversed(!1).paused(!1)},$.reverse=function(Z,K){return Z!=null&&this.seek(Z||this.totalDuration(),K),this.reversed(!0).paused(!1)},$.pause=function(Z,K){return Z!=null&&this.seek(Z,K),this.paused(!0)},$.resume=function(){return this.paused(!1)},$.reversed=function(Z){if(arguments.length)return!!Z!==this.reversed()&&this.timeScale(-this._rts||(Z?-qJ:0)),this;return this._rts<0},$.invalidate=function(){return this._initted=this._act=0,this._zTime=-qJ,this},$.isActive=function(){var Z=this.parent||this._dp,K=this._start,W;return!!(!Z||this._ts&&this._initted&&Z.isActive()&&(W=Z.rawTime(!0))>=K&&W<this.endTime(!0)-qJ)},$.eventCallback=function(Z,K,W){var Y=this.vars;if(arguments.length>1){if(!K)delete Y[Z];else Y[Z]=K,W&&(Y[Z+"Params"]=W),Z==="onUpdate"&&(this._onUpdate=K);return this}return Y[Z]},$.then=function(Z){var K=this,W=K._prom;return new Promise(function(Y){var X=AJ(Z)?Z:WW,H=function(){var U=K.then;K.then=null,W&&W(),AJ(X)&&(X=X(K))&&(X.then||X===K)&&(K.then=U),Y(X),K.then=U};if(K._initted&&K.totalProgress()===1&&K._ts>=0||!K._tTime&&K._ts<0)H();else K._prom=H})},$.kill=function(){t7(this)},J}();K8(Y$.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-qJ,_prom:0,_ps:!1,_rts:1});var cJ=function(J){rK($,J);function $(Z,K){var W;if(Z===void 0)Z={};return W=J.call(this,Z)||this,W.labels={},W.smoothChildTiming=!!Z.smoothChildTiming,W.autoRemoveChildren=!!Z.autoRemoveChildren,W._sort=Q8(Z.sortChildren),IJ&&j8(Z.parent||IJ,c8(W),K),Z.reversed&&W.reverse(),Z.paused&&W.paused(!0),Z.scrollTrigger&&HW(c8(W),Z.scrollTrigger),W}var Q=$.prototype;return Q.to=function(K,W,Y){return $$(0,arguments,this),this},Q.from=function(K,W,Y){return $$(1,arguments,this),this},Q.fromTo=function(K,W,Y,X){return $$(2,arguments,this),this},Q.set=function(K,W,Y){return W.duration=0,W.parent=this,J$(W).repeatDelay||(W.repeat=0),W.immediateRender=!!W.immediateRender,new SJ(K,W,D8(this,Y),1),this},Q.call=function(K,W,Y){return j8(this,SJ.delayedCall(0,K,W),Y)},Q.staggerTo=function(K,W,Y,X,H,q,U){return Y.duration=W,Y.stagger=Y.stagger||X,Y.onComplete=q,Y.onCompleteParams=U,Y.parent=this,new SJ(K,Y,D8(this,H)),this},Q.staggerFrom=function(K,W,Y,X,H,q,U){return Y.runBackwards=1,J$(Y).immediateRender=Q8(Y.immediateRender),this.staggerTo(K,W,Y,X,H,q,U)},Q.staggerFromTo=function(K,W,Y,X,H,q,U,V){return X.startAt=Y,J$(X).immediateRender=Q8(X.immediateRender),this.staggerTo(K,W,X,H,q,U,V)},Q.render=function(K,W,Y){var X=this._time,H=this._dirty?this.totalDuration():this._tDur,q=this._dur,U=K<=0?0:zJ(K),V=this._zTime<0!==K<0&&(this._initted||!q),F,G,N,E,O,D,R,B,z,C,L,A;if(this!==IJ&&U>H&&K>=0&&(U=H),U!==this._tTime||Y||V){if(X!==this._time&&q)U+=this._time-X,K+=this._time-X;if(F=U,z=this._start,B=this._ts,D=!B,V)q||(X=this._zTime),(K||!W)&&(this._zTime=K);if(this._repeat){if(L=this._yoyo,O=q+this._rDelay,this._repeat<-1&&K<0)return this.totalTime(O*100+K,W,Y);if(F=zJ(U%O),U===H)E=this._repeat,F=q;else{if(C=zJ(U/O),E=~~C,E&&E===C)F=q,E--;F>q&&(F=q)}if(C=N7(this._tTime,O),!X&&this._tTime&&C!==E&&this._tTime-C*O-this._dur<=0&&(C=E),L&&E&1)F=q-F,A=1;if(E!==C&&!this._lock){var w=L&&C&1,I=w===(L&&E&1);if(E<C&&(w=!w),X=w?0:U%q?q:U,this._lock=1,this.render(X||(A?0:zJ(E*O)),W,!q)._lock=0,this._tTime=U,!W&&this.parent&&q8(this,"onRepeat"),this.vars.repeatRefresh&&!A)this.invalidate()._lock=1,C=E;if(X&&X!==this._time||D!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(q=this._dur,H=this._tDur,I)this._lock=2,X=w?q:-0.0001,this.render(X,!0),this.vars.repeatRefresh&&!A&&this.invalidate();if(this._lock=0,!this._ts&&!D)return this}}if(this._hasPause&&!this._forcing&&this._lock<2){if(R=XU(this,zJ(X),zJ(F)),R)U-=F-(F=R._start)}if(this._tTime=U,this._time=F,this._act=!!B,!this._initted)this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=K,X=0;if(!X&&U&&q&&!W&&!C){if(q8(this,"onStart"),this._tTime!==U)return this}if(F>=X&&K>=0){G=this._first;while(G){if(N=G._next,(G._act||F>=G._start)&&G._ts&&R!==G){if(G.parent!==this)return this.render(K,W,Y);if(G.render(G._ts>0?(F-G._start)*G._ts:(G._dirty?G.totalDuration():G._tDur)+(F-G._start)*G._ts,W,Y),F!==this._time||!this._ts&&!D){R=0,N&&(U+=this._zTime=-qJ);break}}G=N}}else{G=this._last;var k=K<0?K:F;while(G){if(N=G._prev,(G._act||k<=G._end)&&G._ts&&R!==G){if(G.parent!==this)return this.render(K,W,Y);if(G.render(G._ts>0?(k-G._start)*G._ts:(G._dirty?G.totalDuration():G._tDur)+(k-G._start)*G._ts,W,Y||gJ&&N5(G)),F!==this._time||!this._ts&&!D){R=0,N&&(U+=this._zTime=k?-qJ:qJ);break}}G=N}}if(R&&!W){if(this.pause(),R.render(F>=X?0:-qJ)._zTime=F>=X?1:-1,this._ts)return this._start=z,AQ(this),this.render(K,W,Y)}if(this._onUpdate&&!W&&q8(this,"onUpdate",!0),U===H&&this._tTime>=this.totalDuration()||!U&&X){if(z===this._start||Math.abs(B)!==Math.abs(this._ts)){if(!this._lock){if((K||!q)&&(U===H&&this._ts>0||!U&&this._ts<0)&&X9(this,1),!W&&!(K<0&&!X)&&(U||X||!H))q8(this,U===H&&K>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(U<H&&this.timeScale()>0)&&this._prom()}}}}return this},Q.add=function(K,W){var Y=this;if(s8(W)||(W=D8(this,W,K)),!(K instanceof Y$)){if(nJ(K))return K.forEach(function(X){return Y.add(X,W)}),this;if(xJ(K))return this.addLabel(K,W);if(AJ(K))K=SJ.delayedCall(0,K);else return this}return this!==K?j8(this,K,W):this},Q.getChildren=function(K,W,Y,X){if(K===void 0)K=!0;if(W===void 0)W=!0;if(Y===void 0)Y=!0;if(X===void 0)X=-E8;var H=[],q=this._first;while(q){if(q._start>=X)if(q instanceof SJ)W&&H.push(q);else Y&&H.push(q),K&&H.push.apply(H,q.getChildren(!0,W,Y));q=q._next}return H},Q.getById=function(K){var W=this.getChildren(1,1,1),Y=W.length;while(Y--)if(W[Y].vars.id===K)return W[Y]},Q.remove=function(K){if(xJ(K))return this.removeLabel(K);if(AJ(K))return this.killTweensOf(K);if(K.parent===this&&H$(this,K),K===this._recent)this._recent=this._last;return k9(this)},Q.totalTime=function(K,W){if(!arguments.length)return this._tTime;if(this._forcing=1,!this._dp&&this._ts)this._start=zJ($8.time-(this._ts>0?K/this._ts:(this.totalDuration()-K)/-this._ts));return J.prototype.totalTime.call(this,K,W),this._forcing=0,this},Q.addLabel=function(K,W){return this.labels[K]=D8(this,W),this},Q.removeLabel=function(K){return delete this.labels[K],this},Q.addPause=function(K,W,Y){var X=SJ.delayedCall(0,W||W$,Y);return X.data="isPause",this._hasPause=1,j8(this,X,D8(this,K))},Q.removePause=function(K){var W=this._first;K=D8(this,K);while(W){if(W._start===K&&W.data==="isPause")X9(W);W=W._next}},Q.killTweensOf=function(K,W,Y){var X=this.getTweensOf(K,Y),H=X.length;while(H--)Z9!==X[H]&&X[H].kill(K,W);return this},Q.getTweensOf=function(K,W){var Y=[],X=N8(K),H=this._first,q=s8(W),U;while(H){if(H instanceof SJ){if(e4(H._targets,X)&&(q?(!Z9||H._initted&&H._ts)&&H.globalTime(0)<=W&&H.globalTime(H.totalDuration())>W:!W||H.isActive()))Y.push(H)}else if((U=H.getTweensOf(X,W)).length)Y.push.apply(Y,U);H=H._next}return Y},Q.tweenTo=function(K,W){W=W||{};var Y=this,X=D8(Y,K),H=W,q=H.startAt,U=H.onStart,V=H.onStartParams,F=H.immediateRender,G,N=SJ.to(Y,K8({ease:W.ease||"none",lazy:!1,immediateRender:!1,time:X,overwrite:"auto",duration:W.duration||Math.abs((X-(q&&"time"in q?q.time:Y._time))/Y.timeScale())||qJ,onStart:function(){if(Y.pause(),!G){var O=W.duration||Math.abs((X-(q&&"time"in q?q.time:Y._time))/Y.timeScale());N._dur!==O&&R7(N,O,0,1).render(N._time,!0,!0),G=1}U&&U.apply(N,V||[])}},W));return F?N.render(0):N},Q.tweenFromTo=function(K,W,Y){return this.tweenTo(W,K8({startAt:{time:D8(this,K)}},Y))},Q.recent=function(){return this._recent},Q.nextLabel=function(K){if(K===void 0)K=this._time;return sK(this,D8(this,K))},Q.previousLabel=function(K){if(K===void 0)K=this._time;return sK(this,D8(this,K),1)},Q.currentLabel=function(K){return arguments.length?this.seek(K,!0):this.previousLabel(this._time+qJ)},Q.shiftChildren=function(K,W,Y){if(Y===void 0)Y=0;var X=this._first,H=this.labels,q;K=zJ(K);while(X){if(X._start>=Y)X._start+=K,X._end+=K;X=X._next}if(W){for(q in H)if(H[q]>=Y)H[q]+=K}return k9(this)},Q.invalidate=function(K){var W=this._first;this._lock=0;while(W)W.invalidate(K),W=W._next;return J.prototype.invalidate.call(this,K)},Q.clear=function(K){if(K===void 0)K=!0;var W=this._first,Y;while(W)Y=W._next,this.remove(W),W=Y;return this._dp&&(this._time=this._tTime=this._pTime=0),K&&(this.labels={}),k9(this)},Q.totalDuration=function(K){var W=0,Y=this,X=Y._last,H=E8,q,U,V;if(arguments.length)return Y.timeScale((Y._repeat<0?Y.duration():Y.totalDuration())/(Y.reversed()?-K:K));if(Y._dirty){V=Y.parent;while(X){if(q=X._prev,X._dirty&&X.totalDuration(),U=X._start,U>H&&Y._sort&&X._ts&&!Y._lock)Y._lock=1,j8(Y,X,U-X._delay,1)._lock=0;else H=U;if(U<0&&X._ts){if(W-=U,!V&&!Y._dp||V&&V.smoothChildTiming)Y._start+=zJ(U/Y._ts),Y._time-=U,Y._tTime-=U;Y.shiftChildren(-U,!1,-1/0),H=0}X._end>W&&X._ts&&(W=X._end),X=q}R7(Y,Y===IJ&&Y._time>W?Y._time:W,1,1),Y._dirty=0}return Y._tDur},$.updateRoot=function(K){if(IJ._ts)ZW(IJ,zQ(K,IJ)),QW=$8.frame;if($8.frame>=pK){pK+=Z8.autoSleep||120;var W=IJ._first;if(!W||!W._ts){if(Z8.autoSleep&&$8._listeners.length<2){while(W&&!W._ts)W=W._next;W||$8.sleep()}}}},$}(Y$);K8(cJ.prototype,{_lock:0,_hasPause:0,_forcing:0});var CU=function($,Q,Z,K,W,Y,X){var H=new aJ(this._pt,$,Q,0,1,A5,null,W),q=0,U=0,V,F,G,N,E,O,D,R;if(H.b=Z,H.e=K,Z+="",K+="",D=~K.indexOf("random("))K=z7(K);if(Y)R=[Z,K],Y(R,$,Q),Z=R[0],K=R[1];F=Z.match(cZ)||[];while(V=cZ.exec(K)){if(N=V[0],E=K.substring(q,V.index),G)G=(G+1)%5;else if(E.substr(-5)==="rgba(")G=1;if(N!==F[U++])O=parseFloat(F[U-1])||0,H._pt={_next:H._pt,p:E||U===1?E:",",s:O,c:N.charAt(1)==="="?w9(O,N)-O:parseFloat(N)-O,m:G&&G<4?Math.round:0},q=cZ.lastIndex}if(H.c=q<K.length?K.substring(q,K.length):"",H.fp=X,F5.test(K)||D)H.e=0;return this._pt=H,H},z5=function($,Q,Z,K,W,Y,X,H,q,U){AJ(K)&&(K=K(W||0,$,Y));var V=$[Q],F=Z!=="get"?Z:!AJ(V)?V:q?$[Q.indexOf("set")||!AJ($["get"+Q.substr(3)])?Q:"get"+Q.substr(3)](q):$[Q](),G=!AJ(V)?C5:q?SU:AW,N;if(xJ(K)){if(~K.indexOf("random("))K=z7(K);if(K.charAt(1)==="="){if(N=w9(F,K)+(mJ(F)||0),N||N===0)K=N}}if(!U||F!==K||X5){if(!isNaN(F*K)&&K!=="")return N=new aJ(this._pt,$,Q,+F||0,K-(F||0),typeof V==="boolean"?wU:MW,0,G),q&&(N.fp=q),X&&N.modifier(X,this,$),this._pt=N;return!V&&!(Q in $)&&CQ(Q,K),CU.call(this,$,Q,F,K,G,H||Z8.stringFilter,q)}},AU=function($,Q,Z,K,W){if(AJ($)&&($=Q$($,W,Q,Z,K)),!y8($)||$.style&&$.nodeType||nJ($)||tK($))return xJ($)?Q$($,W,Q,Z,K):$;var Y={},X;for(X in $)Y[X]=Q$($[X],W,Q,Z,K);return Y},I5=function($,Q,Z,K,W,Y){var X,H,q,U;if(J8[$]&&(X=new J8[$]).init(W,X.rawVars?Q[$]:AU(Q[$],K,W,Y,Z),Z,K,Y)!==!1){if(Z._pt=H=new aJ(Z._pt,W,$,0,1,X.render,X,0,X.priority),Z!==D7){q=Z._ptLookup[Z._targets.indexOf(W)],U=X._props.length;while(U--)q[X._props[U]]=H}}return X},Z9,X5,L5=function J($,Q,Z){var K=$.vars,W=K.ease,Y=K.startAt,X=K.immediateRender,H=K.lazy,q=K.onUpdate,U=K.runBackwards,V=K.yoyoEase,F=K.keyframes,G=K.autoRevert,N=$._dur,E=$._startAt,O=$._targets,D=$.parent,R=D&&D.data==="nested"?D.vars.targets:O,B=$._overwrite==="auto"&&!H5,z=$.timeline,C=K.easeReverse||V,L,A,w,I,k,b,n,i,y,h,m,l,d;if(z&&(!F||!W)&&(W="none"),$._ease=P9(W,Z$.ease),$._rEase=C&&(P9(C)||$._ease),$._from=!z&&!!K.runBackwards,$._from)$.ratio=1;if(!z||F&&!K.stagger){if(i=O[0]?W9(O[0]).harness:0,l=i&&K[i.prop],L=BQ(K,G5),E)E._zTime<0&&E.progress(1),Q<0&&U&&X&&!G?E.render(-1,!0):E.revert(U&&N?OQ:a4),E._lazy=0;if(Y){if(X9($._startAt=SJ.set(O,K8({data:"isStart",overwrite:!1,parent:D,immediateRender:!0,lazy:!E&&Q8(H),startAt:null,delay:0,onUpdate:q&&function(){return q8($,"onUpdate")},stagger:0},Y))),$._startAt._dp=0,$._startAt._sat=$,Q<0&&(gJ||!X&&!G)&&$._startAt.revert(OQ),X){if(N&&Q<=0&&Z<=0){Q&&($._zTime=Q);return}}}else if(U&&N){if(!E){if(Q&&(X=!1),w=K8({overwrite:!1,data:"isFromStart",lazy:X&&!E&&Q8(H),immediateRender:X,stagger:0,parent:D},L),l&&(w[i.prop]=l),X9($._startAt=SJ.set(O,w)),$._startAt._dp=0,$._startAt._sat=$,Q<0&&(gJ?$._startAt.revert(OQ):$._startAt.render(-1,!0)),$._zTime=Q,!X)J($._startAt,qJ,qJ);else if(!Q)return}}$._pt=$._ptCache=0,H=N&&Q8(H)||H&&!N;for(A=0;A<O.length;A++){if(k=O[A],n=k._gsap||D5(O)[A]._gsap,$._ptLookup[A]=h={},J5[n.id]&&K9.length&&RQ(),m=R===O?A:R.indexOf(k),i&&(y=new i).init(k,l||L,$,m,R)!==!1)$._pt=I=new aJ($._pt,k,y.name,0,1,y.render,y,0,y.priority),y._props.forEach(function(v){h[v]=I}),y.priority&&(b=1);if(!i||l)for(w in L)if(J8[w]&&(y=I5(w,L,$,m,k,R)))y.priority&&(b=1);else h[w]=I=z5.call($,k,w,"get",L[w],m,R,0,K.stringFilter);if($._op&&$._op[A]&&$.kill(k,$._op[A]),B&&$._pt)Z9=$,IJ.killTweensOf(k,h,$.globalTime(Q)),d=!$.parent,Z9=0;$._pt&&H&&(J5[n.id]=1)}b&&k5($),$._onInit&&$._onInit($)}$._onUpdate=q,$._initted=(!$._op||$._pt)&&!d,F&&Q<=0&&z.render(E8,!0,!0)},MU=function($,Q,Z,K,W,Y,X,H){var q=($._pt&&$._ptCache||($._ptCache={}))[Q],U,V,F,G;if(!q){q=$._ptCache[Q]=[],F=$._ptLookup,G=$._targets.length;while(G--){if(U=F[G][Q],U&&U.d&&U.d._pt){U=U.d._pt;while(U&&U.p!==Q&&U.fp!==Q)U=U._next}if(!U)return X5=1,$.vars[Q]="+=0",L5($,X),X5=0,H?K$(Q+" not eligible for reset. Try splitting into individual properties"):1;q.push(U)}}G=q.length;while(G--)V=q[G],U=V._pt||V,U.s=(K||K===0)&&!W?K:U.s+(K||0)+Y*U.c,U.c=Z-U.s,V.e&&(V.e=MJ(Z)+mJ(V.e)),V.b&&(V.b=U.s+mJ(V.b))},kU=function($,Q){var Z=$[0]?W9($[0]).harness:0,K=Z&&Z.aliases,W,Y,X,H;if(!K)return Q;W=E7({},Q);for(Y in K)if(Y in W){H=K[Y].split(","),X=H.length;while(X--)W[H[X]]=W[Y]}return W},PU=function($,Q,Z,K){var W=Q.ease||K||"power1.inOut",Y,X;if(nJ(Q))X=Z[$]||(Z[$]=[]),Q.forEach(function(H,q){return X.push({t:q/(Q.length-1)*100,v:H,e:W})});else for(Y in Q)X=Z[Y]||(Z[Y]=[]),Y==="ease"||X.push({t:parseFloat($),v:Q[Y],e:W})},Q$=function($,Q,Z,K,W){return AJ($)?$.call(Q,Z,K,W):xJ($)&&~$.indexOf("random(")?z7($):$},LW=O5+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",CW={};rJ(LW+",id,stagger,delay,duration,paused,scrollTrigger",function(J){return CW[J]=1});var SJ=function(J){rK($,J);function $(Z,K,W,Y){var X;if(typeof K==="number")W.duration=K,K=W,W=null;X=J.call(this,Y?K:J$(K))||this;var H=X.vars,q=H.duration,U=H.delay,V=H.immediateRender,F=H.stagger,G=H.overwrite,N=H.keyframes,E=H.defaults,O=H.scrollTrigger,D=K.parent||IJ,R=(nJ(Z)||tK(Z)?s8(Z[0]):("length"in K))?[Z]:N8(Z),B,z,C,L,A,w,I,k;if(X._targets=R.length?D5(R):K$("GSAP target "+Z+" not found. https://gsap.com",!Z8.nullTargetWarn)||[],X._ptLookup=[],X._overwrite=G,N||F||GQ(q)||GQ(U)){K=X.vars;var b=K.easeReverse||K.yoyoEase;if(B=X.timeline=new cJ({data:"nested",defaults:E||{},targets:D&&D.data==="nested"?D.vars.targets:R}),B.kill(),B.parent=B._dp=c8(X),B._start=0,F||GQ(q)||GQ(U)){if(L=R.length,I=F&&VW(F),y8(F)){for(A in F)if(~LW.indexOf(A))k||(k={}),k[A]=F[A]}for(z=0;z<L;z++){if(C=BQ(K,CW),C.stagger=0,b&&(C.easeReverse=b),k&&E7(C,k),w=R[z],C.duration=+Q$(q,c8(X),z,w,R),C.delay=(+Q$(U,c8(X),z,w,R)||0)-X._delay,!F&&L===1&&C.delay)X._delay=U=C.delay,X._start+=U,C.delay=0;B.to(w,C,I?I(z,w,R):0),B._ease=JJ.none}B.duration()?q=U=0:X.timeline=0}else if(N){J$(K8(B.vars.defaults,{ease:"none"})),B._ease=P9(N.ease||K.ease||"none");var n=0,i,y,h;if(nJ(N))N.forEach(function(m){return B.to(R,m,">")}),B.duration();else{C={};for(A in N)A==="ease"||A==="easeEach"||PU(A,N[A],C,N.easeEach);for(A in C){i=C[A].sort(function(m,l){return m.t-l.t}),n=0;for(z=0;z<i.length;z++)y=i[z],h={ease:y.e,duration:(y.t-(z?i[z-1].t:0))/100*q},h[A]=y.v,B.to(R,h,n),n+=h.duration}B.duration()<q&&B.to({},{duration:q-B.duration()})}}q||X.duration(q=B.duration())}else X.timeline=0;if(G===!0&&!H5)Z9=c8(X),IJ.killTweensOf(R),Z9=0;if(j8(D,c8(X),W),K.reversed&&X.reverse(),K.paused&&X.paused(!0),V||!q&&!N&&X._start===zJ(D._time)&&Q8(V)&&ZU(c8(X))&&D.data!=="nested")X._tTime=-qJ,X.render(Math.max(0,-U)||0);return O&&HW(c8(X),O),X}var Q=$.prototype;return Q.render=function(K,W,Y){var X=this._time,H=this._tDur,q=this._dur,U=K<0,V=K>H-qJ&&!U?H:K<qJ?0:K,F,G,N,E,O,D,R,B;if(!q)WU(this,K,W,Y);else if(V!==this._tTime||!K||Y||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==U||this._lazy){if(F=V,B=this.timeline,this._repeat){if(E=q+this._rDelay,this._repeat<-1&&U)return this.totalTime(E*100+K,W,Y);if(F=zJ(V%E),V===H)N=this._repeat,F=q;else if(O=zJ(V/E),N=~~O,N&&N===O)F=q,N--;else if(F>q)F=q;if(D=this._yoyo&&N&1,D)F=q-F;if(O=N7(this._tTime,E),F===X&&!Y&&this._initted&&N===O)return this._tTime=V,this;if(N!==O){if(this.vars.repeatRefresh&&!D&&!this._lock&&F!==E&&this._initted)this._lock=Y=1,this.render(zJ(E*N),!0).invalidate()._lock=0}}if(!this._initted){if(qW(this,U?K:F,Y,W,V))return this._tTime=0,this;if(X!==this._time&&!(Y&&this.vars.repeatRefresh&&N!==O))return this;if(q!==this._dur)return this.render(K,W,Y)}if(this._rEase){var z=F<X;if(z!==this._inv){var C=z?X:q-X;if(this._inv=z,this._from)this.ratio=1-this.ratio;this._invRatio=this.ratio,this._invTime=X,this._invRecip=C?(z?-1:1)/C:0,this._invScale=z?-this.ratio:1-this.ratio,this._invEase=z?this._rEase:this._ease}this.ratio=R=this._invRatio+this._invScale*this._invEase((F-this._invTime)*this._invRecip)}else this.ratio=R=this._ease(F/q);if(this._from)this.ratio=R=1-R;if(this._tTime=V,this._time=F,!this._act&&this._ts)this._act=1,this._lazy=0;if(!X&&V&&!W&&!O){if(q8(this,"onStart"),this._tTime!==V)return this}G=this._pt;while(G)G.r(R,G.d),G=G._next;if(B&&B.render(K<0?K:B._dur*B._ease(F/this._dur),W,Y)||this._startAt&&(this._zTime=K),this._onUpdate&&!W)U&&$5(this,K,W,Y),q8(this,"onUpdate");if(this._repeat&&N!==O&&this.vars.onRepeat&&!W&&this.parent&&q8(this,"onRepeat"),(V===this._tDur||!V)&&this._tTime===V){if(U&&!this._onUpdate&&$5(this,K,!0,!0),(K||!q)&&(V===this._tDur&&this._ts>0||!V&&this._ts<0)&&X9(this,1),!W&&!(U&&!X)&&(V||X||D))q8(this,V===H?"onComplete":"onReverseComplete",!0),this._prom&&!(V<H&&this.timeScale()>0)&&this._prom()}}return this},Q.targets=function(){return this._targets},Q.invalidate=function(K){return(!K||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(K),J.prototype.invalidate.call(this,K)},Q.resetTo=function(K,W,Y,X,H){X$||$8.wake(),this._ts||this.play();var q=Math.min(this._dur,(this._dp._time-this._start)*this._ts),U;if(this._initted||L5(this,q),U=this._ease(q/this._dur),MU(this,K,W,Y,X,U,q,H))return this.resetTo(K,W,Y,X,1);return MQ(this,0),this.parent||XW(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0)},Q.kill=function(K,W){if(W===void 0)W="all";if(!K&&(!W||W==="all"))return this._lazy=this._pt=0,this.parent?t7(this):this.scrollTrigger&&this.scrollTrigger.kill(!!gJ),this;if(this.timeline){var Y=this.timeline.totalDuration();return this.timeline.killTweensOf(K,W,Z9&&Z9.vars.overwrite!==!0)._first||t7(this),this.parent&&Y!==this.timeline.totalDuration()&&R7(this,this._dur*this.timeline._tDur/Y,0,1),this}var X=this._targets,H=K?N8(K):X,q=this._ptLookup,U=this._pt,V,F,G,N,E,O,D;if((!W||W==="all")&&$U(X,H))return W==="all"&&(this._pt=0),t7(this);if(V=this._op=this._op||[],W!=="all"){if(xJ(W))E={},rJ(W,function(R){return E[R]=1}),W=E;W=kU(X,W)}D=X.length;while(D--)if(~H.indexOf(X[D])){if(F=q[D],W==="all")V[D]=W,N=F,G={};else G=V[D]=V[D]||{},N=W;for(E in N){if(O=F&&F[E],O){if(!("kill"in O.d)||O.d.kill(E)===!0)H$(this,O,"_pt");delete F[E]}if(G!=="all")G[E]=1}}return this._initted&&!this._pt&&U&&t7(this),this},$.to=function(K,W){return new $(K,W,arguments[2])},$.from=function(K,W){return $$(1,arguments)},$.delayedCall=function(K,W,Y,X){return new $(W,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:K,onComplete:W,onReverseComplete:W,onCompleteParams:Y,onReverseCompleteParams:Y,callbackScope:X})},$.fromTo=function(K,W,Y){return $$(2,arguments)},$.set=function(K,W){return W.duration=0,W.repeatDelay||(W.repeat=0),new $(K,W)},$.killTweensOf=function(K,W,Y){return IJ.killTweensOf(K,W,Y)},$}(Y$);K8(SJ.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});rJ("staggerTo,staggerFrom,staggerFromTo",function(J){SJ[J]=function(){var $=new cJ,Q=Z5.call(arguments,0);return Q.splice(J==="staggerFromTo"?5:4,0,0),$[J].apply($,Q)}});var C5=function($,Q,Z){return $[Q]=Z},AW=function($,Q,Z){return $[Q](Z)},SU=function($,Q,Z,K){return $[Q](K.fp,Z)},_U=function($,Q,Z){return $.setAttribute(Q,Z)},kQ=function($,Q){return AJ($[Q])?AW:LQ($[Q])&&$.setAttribute?_U:C5},MW=function($,Q){return Q.set(Q.t,Q.p,Math.round((Q.s+Q.c*$)*1e6)/1e6,Q)},wU=function($,Q){return Q.set(Q.t,Q.p,!!(Q.s+Q.c*$),Q)},A5=function($,Q){var Z=Q._pt,K="";if(!$&&Q.b)K=Q.b;else if($===1&&Q.e)K=Q.e;else{while(Z)K=Z.p+(Z.m?Z.m(Z.s+Z.c*$):Math.round((Z.s+Z.c*$)*1e4)/1e4)+K,Z=Z._next;K+=Q.c}Q.set(Q.t,Q.p,K,Q)},M5=function($,Q){var Z=Q._pt;while(Z)Z.r($,Z.d),Z=Z._next},TU=function($,Q,Z,K){var W=this._pt,Y;while(W)Y=W._next,W.p===K&&W.modifier($,Q,Z),W=Y},jU=function($){var Q=this._pt,Z,K;while(Q){if(K=Q._next,Q.p===$&&!Q.op||Q.op===$)H$(this,Q,"_pt");else if(!Q.dep)Z=1;Q=K}return!Z},yU=function($,Q,Z,K){K.mSet($,Q,K.m.call(K.tween,Z,K.mt),K)},k5=function($){var Q=$._pt,Z,K,W,Y;while(Q){Z=Q._next,K=W;while(K&&K.pr>Q.pr)K=K._next;if(Q._prev=K?K._prev:Y)Q._prev._next=Q;else W=Q;if(Q._next=K)K._prev=Q;else Y=Q;Q=Z}$._pt=W},aJ=function(){function J(Q,Z,K,W,Y,X,H,q,U){if(this.t=Z,this.s=W,this.c=Y,this.p=K,this.r=X||MW,this.d=H||this,this.set=q||C5,this.pr=U||0,this._next=Q,Q)Q._prev=this}var $=J.prototype;return $.modifier=function(Z,K,W){this.mSet=this.mSet||this.set,this.set=yU,this.m=Z,this.mt=W,this.tween=K},J}();rJ(O5+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(J){return G5[J]=1});U8.TweenMax=U8.TweenLite=SJ;U8.TimelineLite=U8.TimelineMax=cJ;IJ=new cJ({sortChildren:!1,defaults:Z$,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Z8.stringFilter=R5;var S9=[],EQ={},xU=[],oK=0,bU=0,rZ=function($){return(EQ[$]||xU).map(function(Q){return Q()})},Y5=function(){var $=Date.now(),Q=[];if($-oK>2)rZ("matchMediaInit"),S9.forEach(function(Z){var{queries:K,conditions:W}=Z,Y,X,H,q;for(X in K)if(Y=T8.matchMedia(K[X]).matches,Y&&(H=1),Y!==W[X])W[X]=Y,q=1;if(q)Z.revert(),H&&Q.push(Z)}),rZ("matchMediaRevert"),Q.forEach(function(Z){return Z.onMatch(Z,function(K){return Z.add(null,K)})}),oK=$,rZ("matchMedia")},kW=function(){function J(Q,Z){this.selector=Z&&K5(Z),this.data=[],this._r=[],this.isReverted=!1,this.id=bU++,Q&&this.add(Q)}var $=J.prototype;return $.add=function(Z,K,W){if(AJ(Z))W=K,K=Z,Z=AJ;var Y=this,X=function(){var q=NJ,U=Y.selector,V;return q&&q!==Y&&q.data.push(Y),W&&(Y.selector=K5(W)),NJ=Y,V=K.apply(Y,arguments),AJ(V)&&Y._r.push(V),NJ=q,Y.selector=U,Y.isReverted=!1,V};return Y.last=X,Z===AJ?X(Y,function(H){return Y.add(null,H)}):Z?Y[Z]=X:X},$.ignore=function(Z){var K=NJ;NJ=null,Z(this),NJ=K},$.getTweens=function(){var Z=[];return this.data.forEach(function(K){return K instanceof J?Z.push.apply(Z,K.getTweens()):K instanceof SJ&&!(K.parent&&K.parent.data==="nested")&&Z.push(K)}),Z},$.clear=function(){this._r.length=this.data.length=0},$.kill=function(Z,K){var W=this;if(Z)(function(){var X=W.getTweens(),H=W.data.length,q;while(H--)if(q=W.data[H],q.data==="isFlip")q.revert(),q.getChildren(!0,!0,!1).forEach(function(U){return X.splice(X.indexOf(U),1)});X.map(function(U){return{g:U._dur||U._delay||U._sat&&!U._sat.vars.immediateRender?U.globalTime(0):-1/0,t:U}}).sort(function(U,V){return V.g-U.g||-1/0}).forEach(function(U){return U.t.revert(Z)}),H=W.data.length;while(H--)if(q=W.data[H],q instanceof cJ){if(q.data!=="nested")q.scrollTrigger&&q.scrollTrigger.revert(),q.kill()}else!(q instanceof SJ)&&q.revert&&q.revert(Z);W._r.forEach(function(U){return U(Z,W)}),W.isReverted=!0})();else this.data.forEach(function(X){return X.kill&&X.kill()});if(this.clear(),K){var Y=S9.length;while(Y--)S9[Y].id===this.id&&S9.splice(Y,1)}},$.revert=function(Z){this.kill(Z||{})},J}(),fU=function(){function J(Q){this.contexts=[],this.scope=Q,NJ&&NJ.data.push(this)}var $=J.prototype;return $.add=function(Z,K,W){y8(Z)||(Z={matches:Z});var Y=new kW(0,W||this.scope),X=Y.conditions={},H,q,U;NJ&&!Y.selector&&(Y.selector=NJ.selector),this.contexts.push(Y),K=Y.add("onMatch",K),Y.queries=Z;for(q in Z)if(q==="all")U=1;else if(H=T8.matchMedia(Z[q]),H)S9.indexOf(Y)<0&&S9.push(Y),(X[q]=H.matches)&&(U=1),H.addListener?H.addListener(Y5):H.addEventListener("change",Y5);return U&&K(Y,function(V){return Y.add(null,V)}),this},$.revert=function(Z){this.kill(Z||{})},$.kill=function(Z){this.contexts.forEach(function(K){return K.kill(Z,!0)})},J}(),IQ={registerPlugin:function(){for(var $=arguments.length,Q=Array($),Z=0;Z<$;Z++)Q[Z]=arguments[Z];Q.forEach(function(K){return RW(K)})},timeline:function($){return new cJ($)},getTweensOf:function($,Q){return IJ.getTweensOf($,Q)},getProperty:function($,Q,Z,K){xJ($)&&($=N8($)[0]);var W=W9($||{}).get,Y=Z?WW:KW;return Z==="native"&&(Z=""),!$?$:!Q?function(X,H,q){return Y((J8[X]&&J8[X].get||W)($,X,H,q))}:Y((J8[Q]&&J8[Q].get||W)($,Q,Z,K))},quickSetter:function($,Q,Z){if($=N8($),$.length>1){var K=$.map(function(U){return sJ.quickSetter(U,Q,Z)}),W=K.length;return function(U){var V=W;while(V--)K[V](U)}}$=$[0]||{};var Y=J8[Q],X=W9($),H=X.harness&&(X.harness.aliases||{})[Q]||Q,q=Y?function(U){var V=new Y;D7._pt=0,V.init($,Z?U+Z:U,D7,0,[$]),V.render(1,V),D7._pt&&M5(1,D7)}:X.set($,H);return Y?q:function(U){return q($,H,Z?U+Z:U,X,1)}},quickTo:function($,Q,Z){var K,W=sJ.to($,K8((K={},K[Q]="+=0.1",K.paused=!0,K.stagger=0,K),Z||{})),Y=function(H,q,U){return W.resetTo(Q,H,q,U)};return Y.tween=W,Y},isTweening:function($){return IJ.getTweensOf($,!0).length>0},defaults:function($){return $&&$.ease&&($.ease=P9($.ease,Z$.ease)),lK(Z$,$||{})},config:function($){return lK(Z8,$||{})},registerEffect:function($){var{name:Q,effect:Z,plugins:K,defaults:W,extendTimeline:Y}=$;if((K||"").split(",").forEach(function(X){return X&&!J8[X]&&!U8[X]&&K$(Q+" effect requires "+X+" plugin.")}),nZ[Q]=function(X,H,q){return Z(N8(X),K8(H||{},W),q)},Y)cJ.prototype[Q]=function(X,H,q){return this.add(nZ[Q](X,y8(H)?H:(q=H)&&{},this),q)}},registerEase:function($,Q){JJ[$]=P9(Q)},parseEase:function($,Q){return arguments.length?P9($,Q):JJ},getById:function($){return IJ.getById($)},exportRoot:function($,Q){if($===void 0)$={};var Z=new cJ($),K,W;Z.smoothChildTiming=Q8($.smoothChildTiming),IJ.remove(Z),Z._dp=0,Z._time=Z._tTime=IJ._time,K=IJ._first;while(K){if(W=K._next,Q||!(!K._dur&&K instanceof SJ&&K.vars.onComplete===K._targets[0]))j8(Z,K,K._start-K._delay);K=W}return j8(IJ,Z,0),Z},context:function($,Q){return $?new kW($,Q):NJ},matchMedia:function($){return new fU($)},matchMediaRefresh:function(){return S9.forEach(function($){var Q=$.conditions,Z,K;for(K in Q)if(Q[K])Q[K]=!1,Z=1;Z&&$.revert()})||Y5()},addEventListener:function($,Q){var Z=EQ[$]||(EQ[$]=[]);~Z.indexOf(Q)||Z.push(Q)},removeEventListener:function($,Q){var Z=EQ[$],K=Z&&Z.indexOf(Q);K>=0&&Z.splice(K,1)},utils:{wrap:GU,wrapYoyo:OU,distribute:VW,random:OW,snap:GW,normalize:VU,getUnit:mJ,clamp:HU,splitColor:BW,toArray:N8,selector:K5,mapRange:EW,pipe:UU,unitize:FU,interpolate:DU,shuffle:FW},install:JW,effects:nZ,ticker:$8,updateRoot:cJ.updateRoot,plugins:J8,globalTimeline:IJ,core:{PropTween:aJ,globals:$W,Tween:SJ,Timeline:cJ,Animation:Y$,getCache:W9,_removeLinkedListItem:H$,reverting:function(){return gJ},context:function($){if($&&NJ)NJ.data.push($),$._ctx=NJ;return NJ},suppressOverwrites:function($){return H5=$}}};rJ("to,from,fromTo,delayedCall,set,killTweensOf",function(J){return IQ[J]=SJ[J]});$8.add(cJ.updateRoot);D7=IQ.to({},{duration:0});var hU=function($,Q){var Z=$._pt;while(Z&&Z.p!==Q&&Z.op!==Q&&Z.fp!==Q)Z=Z._next;return Z},vU=function($,Q){var Z=$._targets,K,W,Y;for(K in Q){W=Z.length;while(W--)if(Y=$._ptLookup[W][K],Y&&(Y=Y.d)){if(Y._pt)Y=hU(Y,K);Y&&Y.modifier&&Y.modifier(Q[K],$,Z[W],K)}}},aZ=function($,Q){return{name:$,headless:1,rawVars:1,init:function(K,W,Y){Y._onInit=function(X){var H,q;if(xJ(W))H={},rJ(W,function(U){return H[U]=1}),W=H;if(Q){H={};for(q in W)H[q]=Q(W[q]);W=H}vU(X,W)}}}},sJ=IQ.registerPlugin({name:"attr",init:function($,Q,Z,K,W){var Y,X,H;this.tween=Z;for(Y in Q)H=$.getAttribute(Y)||"",X=this.add($,"setAttribute",(H||0)+"",Q[Y],K,W,0,0,Y),X.op=Y,X.b=H,this._props.push(Y)},render:function($,Q){var Z=Q._pt;while(Z)gJ?Z.set(Z.t,Z.p,Z.b,Z):Z.r($,Z.d),Z=Z._next}},{name:"endArray",headless:1,init:function($,Q){var Z=Q.length;while(Z--)this.add($,Z,$[Z]||0,Q[Z],0,0,0,0,0,1)}},aZ("roundProps",W5),aZ("modifiers"),aZ("snap",GW))||IQ;SJ.version=cJ.version=sJ.version="3.15.0";eK=1;q5()&&B7();var{Power0:gU,Power1:mU,Power2:uU,Power3:dU,Power4:pU,Linear:lU,Quad:cU,Cubic:nU,Quart:sU,Quint:iU,Strong:oU,Elastic:rU,Back:aU,SteppedEase:tU,Bounce:eU,Sine:JF,Expo:$F,Circ:QF}=JJ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var PW,H9,L7,j5,b9,ZF,SW,y5,KF=function(){return typeof window<"u"},o8={},x9=180/Math.PI,C7=Math.PI/180,I7=Math.atan2,_W=1e8,x5=/([A-Z])/g,WF=/(left|right|width|margin|padding|x)/i,XF=/[\s,\(]\S/,x8={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},S5=function($,Q){return Q.set(Q.t,Q.p,Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u,Q)},YF=function($,Q){return Q.set(Q.t,Q.p,$===1?Q.e:Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u,Q)},HF=function($,Q){return Q.set(Q.t,Q.p,$?Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u:Q.b,Q)},qF=function($,Q){return Q.set(Q.t,Q.p,$===1?Q.e:$?Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u:Q.b,Q)},UF=function($,Q){var Z=Q.s+Q.c*$;Q.set(Q.t,Q.p,~~(Z+(Z<0?-0.5:0.5))+Q.u,Q)},hW=function($,Q){return Q.set(Q.t,Q.p,$?Q.e:Q.b,Q)},vW=function($,Q){return Q.set(Q.t,Q.p,$!==1?Q.b:Q.e,Q)},FF=function($,Q,Z){return $.style[Q]=Z},VF=function($,Q,Z){return $.style.setProperty(Q,Z)},GF=function($,Q,Z){return $._gsap[Q]=Z},OF=function($,Q,Z){return $._gsap.scaleX=$._gsap.scaleY=Z},DF=function($,Q,Z,K,W){var Y=$._gsap;Y.scaleX=Y.scaleY=Z,Y.renderTransform(W,Y)},EF=function($,Q,Z,K,W){var Y=$._gsap;Y[Q]=Z,Y.renderTransform(W,Y)},LJ="transform",W8=LJ+"Origin",NF=function J($,Q){var Z=this,K=this.target,W=K.style,Y=K._gsap;if($ in o8&&W){if(this.tfm=this.tfm||{},$!=="transform")$=x8[$]||$,~$.indexOf(",")?$.split(",").forEach(function(X){return Z.tfm[X]=i8(K,X)}):this.tfm[$]=Y.x?Y[$]:i8(K,$),$===W8&&(this.tfm.zOrigin=Y.zOrigin);else return x8.transform.split(",").forEach(function(X){return J.call(Z,X,Q)});if(this.props.indexOf(LJ)>=0)return;if(Y.svg)this.svgo=K.getAttribute("data-svg-origin"),this.props.push(W8,Q,"");$=LJ}(W||Q)&&this.props.push($,Q,W[$])},gW=function($){if($.translate)$.removeProperty("translate"),$.removeProperty("scale"),$.removeProperty("rotate")},RF=function(){var $=this.props,Q=this.target,Z=Q.style,K=Q._gsap,W,Y;for(W=0;W<$.length;W+=3)if(!$[W+1])$[W+2]?Z[$[W]]=$[W+2]:Z.removeProperty($[W].substr(0,2)==="--"?$[W]:$[W].replace(x5,"-$1").toLowerCase());else if($[W+1]===2)Q[$[W]]($[W+2]);else Q[$[W]]=$[W+2];if(this.tfm){for(Y in this.tfm)K[Y]=this.tfm[Y];if(K.svg)K.renderTransform(),Q.setAttribute("data-svg-origin",this.svgo||"");if(W=y5(),(!W||!W.isStart)&&!Z[LJ]){if(gW(Z),K.zOrigin&&Z[W8])Z[W8]+=" "+K.zOrigin+"px",K.zOrigin=0,K.renderTransform();K.uncache=1}}},mW=function($,Q){var Z={target:$,props:[],revert:RF,save:NF};return $._gsap||sJ.core.getCache($),Q&&$.style&&$.nodeType&&Q.split(",").forEach(function(K){return Z.save(K)}),Z},uW,_5=function($,Q){var Z=H9.createElementNS?H9.createElementNS((Q||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),$):H9.createElement($);return Z&&Z.style?Z:H9.createElement($)},F8=function J($,Q,Z){var K=getComputedStyle($);return K[Q]||K.getPropertyValue(Q.replace(x5,"-$1").toLowerCase())||K.getPropertyValue(Q)||!Z&&J($,A7(Q)||Q,1)||""},wW="O,Moz,ms,Ms,Webkit".split(","),A7=function($,Q,Z){var K=Q||b9,W=K.style,Y=5;if($ in W&&!Z)return $;$=$.charAt(0).toUpperCase()+$.substr(1);while(Y--&&!(wW[Y]+$ in W));return Y<0?null:(Y===3?"ms":Y>=0?wW[Y]:"")+$},w5=function(){if(KF()&&window.document)PW=window,H9=PW.document,L7=H9.documentElement,b9=_5("div")||{style:{}},ZF=_5("div"),LJ=A7(LJ),W8=LJ+"Origin",b9.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",uW=!!A7("perspective"),y5=sJ.core.reverting,j5=1},TW=function($){var Q=$.ownerSVGElement,Z=_5("svg",Q&&Q.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),K=$.cloneNode(!0),W;K.style.display="block",Z.appendChild(K),L7.appendChild(Z);try{W=K.getBBox()}catch(Y){}return Z.removeChild(K),L7.removeChild(Z),W},jW=function($,Q){var Z=Q.length;while(Z--)if($.hasAttribute(Q[Z]))return $.getAttribute(Q[Z])},dW=function($){var Q,Z;try{Q=$.getBBox()}catch(K){Q=TW($),Z=1}return Q&&(Q.width||Q.height)||Z||(Q=TW($)),Q&&!Q.width&&!Q.x&&!Q.y?{x:+jW($,["x","cx","x1"])||0,y:+jW($,["y","cy","y1"])||0,width:0,height:0}:Q},pW=function($){return!!($.getCTM&&(!$.parentNode||$.ownerSVGElement)&&dW($))},U9=function($,Q){if(Q){var Z=$.style,K;if(Q in o8&&Q!==W8)Q=LJ;if(Z.removeProperty){if(K=Q.substr(0,2),K==="ms"||Q.substr(0,6)==="webkit")Q="-"+Q;Z.removeProperty(K==="--"?Q:Q.replace(x5,"-$1").toLowerCase())}else Z.removeAttribute(Q)}},q9=function($,Q,Z,K,W,Y){var X=new aJ($._pt,Q,Z,0,1,Y?vW:hW);return $._pt=X,X.b=K,X.e=W,$._props.push(Z),X},yW={deg:1,rad:1,turn:1},BF={grid:1,flex:1},F9=function J($,Q,Z,K){var W=parseFloat(Z)||0,Y=(Z+"").trim().substr((W+"").length)||"px",X=b9.style,H=WF.test(Q),q=$.tagName.toLowerCase()==="svg",U=(q?"client":"offset")+(H?"Width":"Height"),V=100,F=K==="px",G=K==="%",N,E,O,D;if(K===Y||!W||yW[K]||yW[Y])return W;if(Y!=="px"&&!F&&(W=J($,Q,Z,"px")),D=$.getCTM&&pW($),(G||Y==="%")&&(o8[Q]||~Q.indexOf("adius")))return N=D?$.getBBox()[H?"width":"height"]:$[U],MJ(G?W/N*V:W/100*N);if(X[H?"width":"height"]=V+(F?Y:K),E=K!=="rem"&&~Q.indexOf("adius")||K==="em"&&$.appendChild&&!q?$:$.parentNode,D)E=($.ownerSVGElement||{}).parentNode;if(!E||E===H9||!E.appendChild)E=H9.body;if(O=E._gsap,O&&G&&O.width&&H&&O.time===$8.time&&!O.uncache)return MJ(W/O.width*V);else{if(G&&(Q==="height"||Q==="width")){var R=$.style[Q];$.style[Q]=V+K,N=$[U],R?$.style[Q]=R:U9($,Q)}else(G||Y==="%")&&!BF[F8(E,"display")]&&(X.position=F8($,"position")),E===$&&(X.position="static"),E.appendChild(b9),N=b9[U],E.removeChild(b9),X.position="absolute";if(H&&G)O=W9(E),O.time=$8.time,O.width=E[U]}return MJ(F?N*W/V:N&&W?V/N*W:0)},i8=function($,Q,Z,K){var W;if(j5||w5(),Q in x8&&Q!=="transform"){if(Q=x8[Q],~Q.indexOf(","))Q=Q.split(",")[0]}if(o8[Q]&&Q!=="transform")W=V$($,K),W=Q!=="transformOrigin"?W[Q]:W.svg?W.origin:SQ(F8($,W8))+" "+W.zOrigin+"px";else if(W=$.style[Q],!W||W==="auto"||K||~(W+"").indexOf("calc("))W=PQ[Q]&&PQ[Q]($,Q,Z)||F8($,Q)||E5($,Q)||(Q==="opacity"?1:0);return Z&&!~(W+"").trim().indexOf(" ")?F9($,Q,W,Z)+Z:W},zF=function($,Q,Z,K){if(!Z||Z==="none"){var W=A7(Q,$,1),Y=W&&F8($,W,1);if(Y&&Y!==Z)Q=W,Z=Y;else if(Q==="borderColor")Z=F8($,"borderTopColor")}var X=new aJ(this._pt,$.style,Q,0,1,A5),H=0,q=0,U,V,F,G,N,E,O,D,R,B,z,C;if(X.b=Z,X.e=K,Z+="",K+="",K.substring(0,6)==="var(--")K=F8($,K.substring(4,K.indexOf(")")));if(K==="auto")E=$.style[Q],$.style[Q]=K,K=F8($,Q)||K,E?$.style[Q]=E:U9($,Q);if(U=[Z,K],R5(U),Z=U[0],K=U[1],F=Z.match(_9)||[],C=K.match(_9)||[],C.length){while(V=_9.exec(K)){if(O=V[0],R=K.substring(H,V.index),N)N=(N+1)%5;else if(R.substr(-5)==="rgba("||R.substr(-5)==="hsla(")N=1;if(O!==(E=F[q++]||"")){if(G=parseFloat(E)||0,z=E.substr((G+"").length),O.charAt(1)==="="&&(O=w9(G,O)+z),D=parseFloat(O),B=O.substr((D+"").length),H=_9.lastIndex-B.length,!B){if(B=B||Z8.units[Q]||z,H===K.length)K+=B,X.e+=B}if(z!==B)G=F9($,Q,E,B)||0;X._pt={_next:X._pt,p:R||q===1?R:",",s:G,c:D-G,m:N&&N<4||Q==="zIndex"?Math.round:0}}}X.c=H<K.length?K.substring(H,K.length):""}else X.r=Q==="display"&&K==="none"?vW:hW;return F5.test(K)&&(X.e=0),this._pt=X,X},xW={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},IF=function($){var Q=$.split(" "),Z=Q[0],K=Q[1]||"50%";if(Z==="top"||Z==="bottom"||K==="left"||K==="right")$=Z,Z=K,K=$;return Q[0]=xW[Z]||Z,Q[1]=xW[K]||K,Q.join(" ")},LF=function($,Q){if(Q.tween&&Q.tween._time===Q.tween._dur){var Z=Q.t,K=Z.style,W=Q.u,Y=Z._gsap,X,H,q;if(W==="all"||W===!0)K.cssText="",H=1;else{W=W.split(","),q=W.length;while(--q>-1){if(X=W[q],o8[X])H=1,X=X==="transformOrigin"?W8:LJ;U9(Z,X)}}if(H){if(U9(Z,LJ),Y)Y.svg&&Z.removeAttribute("transform"),K.scale=K.rotate=K.translate="none",V$(Z,1),Y.uncache=1,gW(K)}}},PQ={clearProps:function($,Q,Z,K,W){if(W.data!=="isFromStart"){var Y=$._pt=new aJ($._pt,Q,Z,0,0,LF);return Y.u=K,Y.pr=-10,Y.tween=W,$._props.push(Z),1}}},F$=[1,0,0,1,0,0],lW={},cW=function($){return $==="matrix(1, 0, 0, 1, 0, 0)"||$==="none"||!$},bW=function($){var Q=F8($,LJ);return cW(Q)?F$:Q.substr(7).match(U5).map(MJ)},b5=function($,Q){var Z=$._gsap||W9($),K=$.style,W=bW($),Y,X,H,q;if(Z.svg&&$.getAttribute("transform"))return H=$.transform.baseVal.consolidate().matrix,W=[H.a,H.b,H.c,H.d,H.e,H.f],W.join(",")==="1,0,0,1,0,0"?F$:W;else if(W===F$&&!$.offsetParent&&$!==L7&&!Z.svg){if(H=K.display,K.display="block",Y=$.parentNode,!Y||!$.offsetParent&&!$.getBoundingClientRect().width)q=1,X=$.nextElementSibling,L7.appendChild($);if(W=bW($),H?K.display=H:U9($,"display"),q)X?Y.insertBefore($,X):Y?Y.appendChild($):L7.removeChild($)}return Q&&W.length>6?[W[0],W[1],W[4],W[5],W[12],W[13]]:W},T5=function($,Q,Z,K,W,Y){var X=$._gsap,H=W||b5($,!0),q=X.xOrigin||0,U=X.yOrigin||0,V=X.xOffset||0,F=X.yOffset||0,G=H[0],N=H[1],E=H[2],O=H[3],D=H[4],R=H[5],B=Q.split(" "),z=parseFloat(B[0])||0,C=parseFloat(B[1])||0,L,A,w,I;if(!Z)L=dW($),z=L.x+(~B[0].indexOf("%")?z/100*L.width:z),C=L.y+(~(B[1]||B[0]).indexOf("%")?C/100*L.height:C);else if(H!==F$&&(A=G*O-N*E))w=z*(O/A)+C*(-E/A)+(E*R-O*D)/A,I=z*(-N/A)+C*(G/A)-(G*R-N*D)/A,z=w,C=I;if(K||K!==!1&&X.smooth)D=z-q,R=C-U,X.xOffset=V+(D*G+R*E)-D,X.yOffset=F+(D*N+R*O)-R;else X.xOffset=X.yOffset=0;if(X.xOrigin=z,X.yOrigin=C,X.smooth=!!K,X.origin=Q,X.originIsAbsolute=!!Z,$.style[W8]="0px 0px",Y)q9(Y,X,"xOrigin",q,z),q9(Y,X,"yOrigin",U,C),q9(Y,X,"xOffset",V,X.xOffset),q9(Y,X,"yOffset",F,X.yOffset);$.setAttribute("data-svg-origin",z+" "+C)},V$=function($,Q){var Z=$._gsap||new B5($);if("x"in Z&&!Q&&!Z.uncache)return Z;var K=$.style,W=Z.scaleX<0,Y="px",X="deg",H=getComputedStyle($),q=F8($,W8)||"0",U,V,F,G,N,E,O,D,R,B,z,C,L,A,w,I,k,b,n,i,y,h,m,l,d,v,u,r,g,t,Q0,F0;if(U=V=F=E=O=D=R=B=z=0,G=N=1,Z.svg=!!($.getCTM&&pW($)),H.translate){if(H.translate!=="none"||H.scale!=="none"||H.rotate!=="none")K[LJ]=(H.translate!=="none"?"translate3d("+(H.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(H.rotate!=="none"?"rotate("+H.rotate+") ":"")+(H.scale!=="none"?"scale("+H.scale.split(" ").join(",")+") ":"")+(H[LJ]!=="none"?H[LJ]:"");K.scale=K.rotate=K.translate="none"}if(A=b5($,Z.svg),Z.svg){if(Z.uncache)d=$.getBBox(),q=Z.xOrigin-d.x+"px "+(Z.yOrigin-d.y)+"px",l="";else l=!Q&&$.getAttribute("data-svg-origin");T5($,l||q,!!l||Z.originIsAbsolute,Z.smooth!==!1,A)}if(C=Z.xOrigin||0,L=Z.yOrigin||0,A!==F$){if(b=A[0],n=A[1],i=A[2],y=A[3],U=h=A[4],V=m=A[5],A.length===6){if(G=Math.sqrt(b*b+n*n),N=Math.sqrt(y*y+i*i),E=b||n?I7(n,b)*x9:0,R=i||y?I7(i,y)*x9+E:0,R&&(N*=Math.abs(Math.cos(R*C7))),Z.svg)U-=C-(C*b+L*i),V-=L-(C*n+L*y)}else{if(F0=A[6],t=A[7],u=A[8],r=A[9],g=A[10],Q0=A[11],U=A[12],V=A[13],F=A[14],w=I7(F0,g),O=w*x9,w)I=Math.cos(-w),k=Math.sin(-w),l=h*I+u*k,d=m*I+r*k,v=F0*I+g*k,u=h*-k+u*I,r=m*-k+r*I,g=F0*-k+g*I,Q0=t*-k+Q0*I,h=l,m=d,F0=v;if(w=I7(-i,g),D=w*x9,w)I=Math.cos(-w),k=Math.sin(-w),l=b*I-u*k,d=n*I-r*k,v=i*I-g*k,Q0=y*k+Q0*I,b=l,n=d,i=v;if(w=I7(n,b),E=w*x9,w)I=Math.cos(w),k=Math.sin(w),l=b*I+n*k,d=h*I+m*k,n=n*I-b*k,m=m*I-h*k,b=l,h=d;if(O&&Math.abs(O)+Math.abs(E)>359.9)O=E=0,D=180-D;G=MJ(Math.sqrt(b*b+n*n+i*i)),N=MJ(Math.sqrt(m*m+F0*F0)),w=I7(h,m),R=Math.abs(w)>0.0002?w*x9:0,z=Q0?1/(Q0<0?-Q0:Q0):0}if(Z.svg)l=$.getAttribute("transform"),Z.forceCSS=$.setAttribute("transform","")||!cW(F8($,LJ)),l&&$.setAttribute("transform",l)}if(Math.abs(R)>90&&Math.abs(R)<270)if(W)G*=-1,R+=E<=0?180:-180,E+=E<=0?180:-180;else N*=-1,R+=R<=0?180:-180;if(Q=Q||Z.uncache,Z.x=U-((Z.xPercent=U&&(!Q&&Z.xPercent||(Math.round($.offsetWidth/2)===Math.round(-U)?-50:0)))?$.offsetWidth*Z.xPercent/100:0)+Y,Z.y=V-((Z.yPercent=V&&(!Q&&Z.yPercent||(Math.round($.offsetHeight/2)===Math.round(-V)?-50:0)))?$.offsetHeight*Z.yPercent/100:0)+Y,Z.z=F+Y,Z.scaleX=MJ(G),Z.scaleY=MJ(N),Z.rotation=MJ(E)+X,Z.rotationX=MJ(O)+X,Z.rotationY=MJ(D)+X,Z.skewX=R+X,Z.skewY=B+X,Z.transformPerspective=z+Y,Z.zOrigin=parseFloat(q.split(" ")[2])||!Q&&Z.zOrigin||0)K[W8]=SQ(q);return Z.xOffset=Z.yOffset=0,Z.force3D=Z8.force3D,Z.renderTransform=Z.svg?AF:uW?nW:CF,Z.uncache=0,Z},SQ=function($){return($=$.split(" "))[0]+" "+$[1]},P5=function($,Q,Z){var K=mJ(Q);return MJ(parseFloat(Q)+parseFloat(F9($,"x",Z+"px",K)))+K},CF=function($,Q){Q.z="0px",Q.rotationY=Q.rotationX="0deg",Q.force3D=0,nW($,Q)},j9="0deg",U$="0px",y9=") ",nW=function($,Q){var Z=Q||this,K=Z.xPercent,W=Z.yPercent,Y=Z.x,X=Z.y,H=Z.z,q=Z.rotation,U=Z.rotationY,V=Z.rotationX,F=Z.skewX,G=Z.skewY,N=Z.scaleX,E=Z.scaleY,O=Z.transformPerspective,D=Z.force3D,R=Z.target,B=Z.zOrigin,z="",C=D==="auto"&&$&&$!==1||D===!0;if(B&&(V!==j9||U!==j9)){var L=parseFloat(U)*C7,A=Math.sin(L),w=Math.cos(L),I;L=parseFloat(V)*C7,I=Math.cos(L),Y=P5(R,Y,A*I*-B),X=P5(R,X,-Math.sin(L)*-B),H=P5(R,H,w*I*-B+B)}if(O!==U$)z+="perspective("+O+y9;if(K||W)z+="translate("+K+"%, "+W+"%) ";if(C||Y!==U$||X!==U$||H!==U$)z+=H!==U$||C?"translate3d("+Y+", "+X+", "+H+") ":"translate("+Y+", "+X+y9;if(q!==j9)z+="rotate("+q+y9;if(U!==j9)z+="rotateY("+U+y9;if(V!==j9)z+="rotateX("+V+y9;if(F!==j9||G!==j9)z+="skew("+F+", "+G+y9;if(N!==1||E!==1)z+="scale("+N+", "+E+y9;R.style[LJ]=z||"translate(0, 0)"},AF=function($,Q){var Z=Q||this,K=Z.xPercent,W=Z.yPercent,Y=Z.x,X=Z.y,H=Z.rotation,q=Z.skewX,U=Z.skewY,V=Z.scaleX,F=Z.scaleY,G=Z.target,N=Z.xOrigin,E=Z.yOrigin,O=Z.xOffset,D=Z.yOffset,R=Z.forceCSS,B=parseFloat(Y),z=parseFloat(X),C,L,A,w,I;if(H=parseFloat(H),q=parseFloat(q),U=parseFloat(U),U)U=parseFloat(U),q+=U,H+=U;if(H||q){if(H*=C7,q*=C7,C=Math.cos(H)*V,L=Math.sin(H)*V,A=Math.sin(H-q)*-F,w=Math.cos(H-q)*F,q){if(U*=C7,I=Math.tan(q-U),I=Math.sqrt(1+I*I),A*=I,w*=I,U)I=Math.tan(U),I=Math.sqrt(1+I*I),C*=I,L*=I}C=MJ(C),L=MJ(L),A=MJ(A),w=MJ(w)}else C=V,w=F,L=A=0;if(B&&!~(Y+"").indexOf("px")||z&&!~(X+"").indexOf("px"))B=F9(G,"x",Y,"px"),z=F9(G,"y",X,"px");if(N||E||O||D)B=MJ(B+N-(N*C+E*A)+O),z=MJ(z+E-(N*L+E*w)+D);if(K||W)I=G.getBBox(),B=MJ(B+K/100*I.width),z=MJ(z+W/100*I.height);I="matrix("+C+","+L+","+A+","+w+","+B+","+z+")",G.setAttribute("transform",I),R&&(G.style[LJ]=I)},MF=function($,Q,Z,K,W){var Y=360,X=xJ(W),H=parseFloat(W)*(X&&~W.indexOf("rad")?x9:1),q=H-K,U=K+q+"deg",V,F;if(X){if(V=W.split("_")[1],V==="short"){if(q%=Y,q!==q%(Y/2))q+=q<0?Y:-Y}if(V==="cw"&&q<0)q=(q+Y*_W)%Y-~~(q/Y)*Y;else if(V==="ccw"&&q>0)q=(q-Y*_W)%Y-~~(q/Y)*Y}return $._pt=F=new aJ($._pt,Q,Z,K,q,YF),F.e=U,F.u="deg",$._props.push(Z),F},fW=function($,Q){for(var Z in Q)$[Z]=Q[Z];return $},kF=function($,Q,Z){var K=fW({},Z._gsap),W="perspective,force3D,transformOrigin,svgOrigin",Y=Z.style,X,H,q,U,V,F,G,N;if(K.svg)q=Z.getAttribute("transform"),Z.setAttribute("transform",""),Y[LJ]=Q,X=V$(Z,1),U9(Z,LJ),Z.setAttribute("transform",q);else q=getComputedStyle(Z)[LJ],Y[LJ]=Q,X=V$(Z,1),Y[LJ]=q;for(H in o8)if(q=K[H],U=X[H],q!==U&&W.indexOf(H)<0)G=mJ(q),N=mJ(U),V=G!==N?F9(Z,H,q,N):parseFloat(q),F=parseFloat(U),$._pt=new aJ($._pt,X,H,V,F-V,S5),$._pt.u=N||0,$._props.push(H);fW(X,K)};rJ("padding,margin,Width,Radius",function(J,$){var Q="Top",Z="Right",K="Bottom",W="Left",Y=($<3?[Q,Z,K,W]:[Q+W,Q+Z,K+Z,K+W]).map(function(X){return $<2?J+X:"border"+X+J});PQ[$>1?"border"+J:J]=function(X,H,q,U,V){var F,G;if(arguments.length<4)return F=Y.map(function(N){return i8(X,N,q)}),G=F.join(" "),G.split(F[0]).length===5?F[0]:G;F=(U+"").split(" "),G={},Y.forEach(function(N,E){return G[N]=F[E]=F[E]||F[(E-1)/2|0]}),X.init(H,G,V)}});var f5={name:"css",register:w5,targetTest:function($){return $.style&&$.nodeType},init:function($,Q,Z,K,W){var Y=this._props,X=$.style,H=Z.vars.startAt,q,U,V,F,G,N,E,O,D,R,B,z,C,L,A,w,I;j5||w5(),this.styles=this.styles||mW($),w=this.styles.props,this.tween=Z;for(E in Q){if(E==="autoRound")continue;if(U=Q[E],J8[E]&&I5(E,Q,Z,K,$,W))continue;if(G=typeof U,N=PQ[E],G==="function")U=U.call(Z,K,$,W),G=typeof U;if(G==="string"&&~U.indexOf("random("))U=z7(U);if(N)N(this,$,E,U,Z)&&(A=1);else if(E.substr(0,2)==="--"){if(q=(getComputedStyle($).getPropertyValue(E)+"").trim(),U+="",n8.lastIndex=0,!n8.test(q))O=mJ(q),D=mJ(U),D?O!==D&&(q=F9($,E,q,D)+D):O&&(U+=O);this.add(X,"setProperty",q,U,K,W,0,0,E),Y.push(E),w.push(E,0,X[E])}else if(G!=="undefined"){if(H&&E in H)q=typeof H[E]==="function"?H[E].call(Z,K,$,W):H[E],xJ(q)&&~q.indexOf("random(")&&(q=z7(q)),mJ(q+"")||q==="auto"||(q+=Z8.units[E]||mJ(i8($,E))||""),(q+"").charAt(1)==="="&&(q=i8($,E));else q=i8($,E);if(F=parseFloat(q),R=G==="string"&&U.charAt(1)==="="&&U.substr(0,2),R&&(U=U.substr(2)),V=parseFloat(U),E in x8){if(E==="autoAlpha"){if(F===1&&i8($,"visibility")==="hidden"&&V)F=0;w.push("visibility",0,X.visibility),q9(this,X,"visibility",F?"inherit":"hidden",V?"inherit":"hidden",!V)}if(E!=="scale"&&E!=="transform")E=x8[E],~E.indexOf(",")&&(E=E.split(",")[0])}if(B=E in o8,B){if(this.styles.save(E),I=U,G==="string"&&U.substring(0,6)==="var(--"){if(U=F8($,U.substring(4,U.indexOf(")"))),U.substring(0,5)==="calc("){var k=$.style.perspective;$.style.perspective=U,U=F8($,"perspective"),k?$.style.perspective=k:U9($,"perspective")}V=parseFloat(U)}if(!z)C=$._gsap,C.renderTransform&&!Q.parseTransform||V$($,Q.parseTransform),L=Q.smoothOrigin!==!1&&C.smooth,z=this._pt=new aJ(this._pt,X,LJ,0,1,C.renderTransform,C,0,-1),z.dep=1;if(E==="scale")this._pt=new aJ(this._pt,C,"scaleY",C.scaleY,(R?w9(C.scaleY,R+V):V)-C.scaleY||0,S5),this._pt.u=0,Y.push("scaleY",E),E+="X";else if(E==="transformOrigin"){if(w.push(W8,0,X[W8]),U=IF(U),C.svg)T5($,U,0,L,0,this);else D=parseFloat(U.split(" ")[2])||0,D!==C.zOrigin&&q9(this,C,"zOrigin",C.zOrigin,D),q9(this,X,E,SQ(q),SQ(U));continue}else if(E==="svgOrigin"){T5($,U,1,L,0,this);continue}else if(E in lW){MF(this,C,E,F,R?w9(F,R+U):U);continue}else if(E==="smoothOrigin"){q9(this,C,"smooth",C.smooth,U);continue}else if(E==="force3D"){C[E]=U;continue}else if(E==="transform"){kF(this,U,$);continue}}else if(!(E in X))E=A7(E)||E;if(B||(V||V===0)&&(F||F===0)&&!XF.test(U)&&E in X){if(O=(q+"").substr((F+"").length),V||(V=0),D=mJ(U)||(E in Z8.units?Z8.units[E]:O),O!==D&&(F=F9($,E,q,D)),this._pt=new aJ(this._pt,B?C:X,E,F,(R?w9(F,R+V):V)-F,!B&&(D==="px"||E==="zIndex")&&Q.autoRound!==!1?UF:S5),this._pt.u=D||0,B&&I!==U)this._pt.b=q,this._pt.e=I,this._pt.r=qF;else if(O!==D&&D!=="%")this._pt.b=q,this._pt.r=HF}else if(!(E in X)){if(E in $)this.add($,E,q||$[E],R?R+U:U,K,W);else if(E!=="parseTransform"){CQ(E,U);continue}}else zF.call(this,$,E,q,R?R+U:U);B||(E in X?w.push(E,0,X[E]):typeof $[E]==="function"?w.push(E,2,$[E]()):w.push(E,1,q||$[E])),Y.push(E)}}A&&k5(this)},render:function($,Q){if(Q.tween._time||!y5()){var Z=Q._pt;while(Z)Z.r($,Z.d),Z=Z._next}else Q.styles.revert()},get:i8,aliases:x8,getSetter:function($,Q,Z){var K=x8[Q];return K&&K.indexOf(",")<0&&(Q=K),Q in o8&&Q!==W8&&($._gsap.x||i8($,"x"))?Z&&SW===Z?Q==="scale"?OF:GF:(SW=Z||{})&&(Q==="scale"?DF:EF):$.style&&!LQ($.style[Q])?FF:~Q.indexOf("-")?VF:kQ($,Q)},core:{_removeProperty:U9,_getMatrix:b5}};sJ.utils.checkPrefix=A7;sJ.core.getStyleSaver=mW;(function(J,$,Q,Z){var K=rJ(J+","+$+","+Q,function(W){o8[W]=1});rJ($,function(W){Z8.units[W]="deg",lW[W]=1}),x8[K[13]]=J+","+$,rJ(Z,function(W){var Y=W.split(":");x8[Y[1]]=K[Y[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");rJ("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(J){Z8.units[J]="px"});sJ.registerPlugin(f5);var _0=sJ.registerPlugin(f5)||sJ,vF=_0.core.Tween;class h5{container;scene;camera;renderer;controls;audio;raycaster=new dZ;mousePos=new H0;rootGroup=new G0;sceneryGroup=new G0;trackGroup=new G0;viaductGroup=new G0;trainGroup=new G0;weatherGroup=new G0;celestialGroup=new G0;locoCar=new G0;tenderCar=new G0;coachCar=new G0;cabooseCar=new G0;rotatingWheels=[];coachWindowMat;headlampBeam=null;headlampCoreBeam=null;headlampLight=null;headlampSpotLight=null;headlampTrackPool=null;coachInteriorLight1=null;coachInteriorLight2=null;tailLight=null;lanternLight=null;crossingLight1=null;crossingLight2=null;crossingLamp1=null;crossingLamp2=null;mooredBoat=null;viaductLanterns=[];viaductLanternLights=[];interactiveSheep=[];interactivePoles=[];tunnelLight=null;railClickAccumulator=0;lastBlinkCycle=!1;lastHoverRippleTime=0;windmillGroup=null;windmillSails=null;windmillLight=null;windmillBaseSpeed=0.009;windmillCurrentSpeed=0.009;watermillGroup=null;waterwheel=null;watermillLight=null;cottageGroup=null;cottageLight=null;semaphoreGroup=null;semaphoreArm=null;semaphoreLight=null;semaphoreIsRaised=!1;firefliesGroup=null;fireflies=[];alpineRidgeGroup=new G0;campsiteGroup=new G0;campfireLight=null;campfireFlame=null;campfireParticles=null;campfireParticlePos;waterTowerGroup=new G0;waterTowerSpout=null;waterSprayPoints=null;isWaterTowerSpraying=!1;hotAirBalloonGroup=new G0;balloonBurnerLight=null;balloonBurnerFlame=null;villageWellGroup=new G0;villageWellBucket=null;townFountainGroup=new G0;townFountainJet=null;farmBarnGroup=new G0;depotShedGroup=new G0;butterflies=[];leftSideRod=null;rightSideRod=null;wheelAngle=0;currentViewMode="isometric";directorShotIndex=0;directorTimer=0;directorShotDuration=6.8;directorNeedsCut=!0;engineBankRoll=0;lastAnimTime=0;ambientLight;hemiLight;sunLight;fillLight;sunMesh;sunCorona;godRaysGroup=new G0;beehiveGroup=new G0;orchardGroup=new G0;bees=[];moonMesh;moonLight;starsPoints;isNightMode=!1;isRaining=!1;rainStreaks=null;rainCount=360;rainGeo=null;rainPositions=null;splashRipples=[];steamParticles=[];steamTimer=0;trackCurve;progress=0.62;trainSpeed=0.0016;speedMultiplier=1;clockHand=null;clockTowerGroup=null;interactiveTrees=[];waterMesh=null;animFrameId=0;isDestroyed=!1;constructor(J,$){let Q=document.getElementById(J);if(!Q)throw Error(`ThreeStage container #${J} not found`);this.container=Q,this.audio=$,this.scene=new SZ;let Z=this.container.clientWidth||920,K=this.container.clientHeight||520;this.camera=new lJ(38,Z/K,0.02,100),this.camera.position.set(5.8,5.4,6),this.camera.lookAt(0,0.4,-0.75),this.renderer=new ZQ({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(Z,K),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=l6,this.renderer.toneMapping=n6,this.renderer.toneMappingExposure=1.15,this.container.appendChild(this.renderer.domElement),this.controls=new lZ(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=0.06,this.controls.autoRotate=!1,this.controls.autoRotateSpeed=0,this.controls.minPolarAngle=Math.PI*0.18,this.controls.maxPolarAngle=Math.PI*0.42,this.controls.minDistance=1.6,this.controls.maxDistance=12.5,this.controls.target.set(0,0.4,-0.75),this.scene.add(this.rootGroup),this.scene.add(this.celestialGroup),this.scene.add(this.weatherGroup),this.rootGroup.add(this.sceneryGroup),this.rootGroup.add(this.viaductGroup),this.rootGroup.add(this.trackGroup),this.rootGroup.add(this.trainGroup),this.rootGroup.scale.setScalar(0.96),this.setupLighting(),this.buildCelestialElements(),this.buildSculptedIsland(),this.buildScenicCanalAndBridge(),this.buildInfiniteTrackCurve(),this.buildPhysicalRailsAndTies(),this.buildStoneViaductAndTunnel(),this.buildMiniatureStationAndTown(),this.buildDutchWindmill(),this.buildWestFarmlandAndBarn(),this.buildCanalWatermill(),this.buildVillageCottageAndSignals(),this.buildEastVillageAndPlaza(),this.buildBioluminescentFireflies(),this.buildLevelCrossingAndTelegraph(),this.buildLushNatureAndFlock(),this.buildArticulatedTrain(),this.buildAlpineMountainRidge(),this.buildCampsiteAndCampfire(),this.buildRailwayWaterTower(),this.buildRailwayServiceDepot(),this.buildHotAirBalloon(),this.buildMiniatureVillageLife(),this.setupWeatherSystem(),this.bindEvents(),this.setNightMode(!1,!0),this.animate()}createStoneBrickTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#dfd7c9",$.fillRect(0,0,512,512);let Q=32,Z=64;for(let W=0;W<512;W+=Q){let X=W/Q%2===1?Z/2:0;for(let H=-Z;H<512+Z;H+=Z){let q=H+X,U=Math.floor(Math.random()*20-10);$.fillStyle=`rgb(${218+U}, ${210+U}, ${196+U})`,$.fillRect(q+1,W+1,Z-2,Q-2),$.fillStyle="rgba(255,255,255,0.22)",$.fillRect(q+1,W+1,Z-2,2),$.fillStyle="rgba(0,0,0,0.12)",$.fillRect(q+1,W+Q-3,Z-2,2)}}let K=new p8(J);return K.wrapS=l7,K.wrapT=l7,K.repeat.set(2,2),K}createWoodSleeperTexture(){let J=document.createElement("canvas");J.width=256,J.height=64;let $=J.getContext("2d");$.fillStyle="#5c3d2e",$.fillRect(0,0,256,64),$.strokeStyle="#43281c",$.lineWidth=1;for(let Z=0;Z<18;Z++){let K=Math.random()*64;$.beginPath(),$.moveTo(0,K),$.bezierCurveTo(80,K+Math.random()*4-2,180,K+Math.random()*4-2,256,K),$.stroke()}return $.fillStyle="#262626",$.fillRect(48,8,28,48),$.fillRect(180,8,28,48),$.fillStyle="#d4d4d8",$.beginPath(),$.arc(62,32,3,0,Math.PI*2),$.arc(194,32,3,0,Math.PI*2),$.fill(),new p8(J)}createMeadowTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#4fa65b",$.fillRect(0,0,512,512);for(let Z=0;Z<1600;Z++){let K=Math.random()*512,W=Math.random()*512,Y=1.5+Math.random()*2.5,X=0.08+Math.random()*0.15;$.fillStyle=Math.random()>0.5?`rgba(90, 180, 100, ${X})`:`rgba(60, 140, 70, ${X})`,$.beginPath(),$.arc(K,W,Y,0,Math.PI*2),$.fill()}let Q=new p8(J);return Q.wrapS=l7,Q.wrapT=l7,Q.repeat.set(6,6),Q}createVolumetricBeamTexture(){let J=document.createElement("canvas");J.width=128,J.height=512;let $=J.getContext("2d"),Q=$.createLinearGradient(0,0,0,512);return Q.addColorStop(0,"rgba(255, 252, 235, 0.85)"),Q.addColorStop(0.12,"rgba(254, 240, 138, 0.45)"),Q.addColorStop(0.35,"rgba(253, 224, 71, 0.20)"),Q.addColorStop(0.65,"rgba(250, 204, 21, 0.05)"),Q.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Q,$.fillRect(0,0,128,512),new p8(J)}createHeadlampPoolTexture(){let J=document.createElement("canvas");J.width=256,J.height=256;let $=J.getContext("2d"),Q=$.createRadialGradient(128,128,16,128,128,124);return Q.addColorStop(0,"rgba(254, 240, 138, 0.75)"),Q.addColorStop(0.35,"rgba(253, 224, 71, 0.40)"),Q.addColorStop(0.7,"rgba(234, 179, 8, 0.12)"),Q.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Q,$.fillRect(0,0,256,256),new p8(J)}setupLighting(){this.ambientLight=new gZ(16777215,2.1),this.scene.add(this.ambientLight),this.hemiLight=new hZ(16776171,14870768,1.2),this.hemiLight.position.set(0,10,0),this.scene.add(this.hemiLight),this.sunLight=new a7(16776171,2.6),this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=18,this.sunLight.shadow.camera.left=-4.5,this.sunLight.shadow.camera.right=4.5,this.sunLight.shadow.camera.top=4.5,this.sunLight.shadow.camera.bottom=-4.5,this.sunLight.shadow.bias=-0.0006,this.sunLight.shadow.normalBias=0.02,this.scene.add(this.sunLight),this.fillLight=new a7(15857145,1.1),this.fillLight.position.set(-4.5,4,-3.5),this.scene.add(this.fillLight),this.moonLight=new a7(16317180,0),this.moonLight.position.set(-3.5,5.5,-3.5),this.moonLight.castShadow=!0,this.moonLight.shadow.mapSize.width=1024,this.moonLight.shadow.mapSize.height=1024,this.moonLight.shadow.camera.near=1,this.moonLight.shadow.camera.far=18,this.moonLight.shadow.bias=-0.0008,this.moonLight.shadow.normalBias=0.04,this.scene.add(this.moonLight)}buildCelestialElements(){let J=new YJ(0.22,24,24),$=new c({color:16710083,emissive:16707722,emissiveIntensity:0.9,roughness:0.4});this.moonMesh=new S(J,$),this.moonMesh.position.set(-2.4,2.8,-2.4),this.moonMesh.scale.setScalar(0.001),this.celestialGroup.add(this.moonMesh);let Q=document.createElement("canvas");Q.width=128,Q.height=128;let Z=Q.getContext("2d"),K=Z.createRadialGradient(64,64,12,64,64,64);K.addColorStop(0,"rgba(254, 240, 138, 0.7)"),K.addColorStop(0.4,"rgba(147, 197, 253, 0.35)"),K.addColorStop(1,"rgba(0, 0, 0, 0)"),Z.fillStyle=K,Z.fillRect(0,0,128,128);let W=new p8(Q),Y=new KQ({map:W,transparent:!0,blending:C9,opacity:0}),X=new _Z(Y);X.scale.set(1.5,1.5,1),this.moonMesh.add(X);let H=200,q=new GJ,U=new Float32Array(H*3);for(let z=0;z<H;z++){let C=Math.PI*1.25+(Math.random()-0.5)*0.95,L=0.6+Math.random()*1.5,A=3+Math.random()*1.8;U[z*3]=Math.cos(C)*A,U[z*3+1]=L,U[z*3+2]=Math.sin(C)*A}q.setAttribute("position",new vJ(U,3));let V=new M9({color:16777215,size:0.04,transparent:!0,opacity:0});this.starsPoints=new U7(q,V),this.celestialGroup.add(this.starsPoints);let F=new G0,G=new YJ(0.24,24,24),N=new c({color:16776171,emissive:16498468,emissiveIntensity:1.6,roughness:0.2,metalness:0.1}),E=new S(G,N);F.add(E);let O=new QJ({color:16707722,transparent:!0,opacity:0.22,side:c6,depthWrite:!1}),D=new S(new YJ(0.36,16,16),O);F.add(D),this.sunCorona=D,F.position.set(1.3,2.1,-1.8),this.sunMesh=F,this.celestialGroup.add(this.sunMesh),this.godRaysGroup=new G0;let R=new QJ({color:16707722,transparent:!0,opacity:0.16,side:S8,blending:C9,depthWrite:!1});[{x:0.35,y:-0.2,rotY:-0.15,scaleX:0.7,len:4.8},{x:-0.1,y:0,rotY:0.05,scaleX:0.9,len:5.2},{x:-0.55,y:0.15,rotY:0.22,scaleX:1.1,len:5.5},{x:0.8,y:-0.3,rotY:-0.32,scaleX:0.6,len:4.5}].forEach(({x:z,y:C,rotY:L,scaleX:A,len:w})=>{let I=new eJ(A,w),k=new S(I,R.clone());k.position.set(1.3+z,1.2+C,-1.8+z*0.4),k.rotation.x=Math.PI*0.26,k.rotation.y=L,k.rotation.z=-0.35,this.godRaysGroup.add(k)}),this.celestialGroup.add(this.godRaysGroup)}createIslandShape(){let J={x:0,z:-0.3},$=[{x:-1.75,z:0,r:2.3},{x:1.75,z:0,r:2.3},{x:-2.35,z:1.55,r:1.65},{x:-2.35,z:-1.55,r:1.65},{x:2.35,z:1.55,r:1.65},{x:2.35,z:-1.55,r:1.65},{x:-1.25,z:1.55,r:1.45},{x:1.25,z:1.55,r:1.45},{x:-3.4,z:0,r:1.45},{x:3.4,z:0,r:1.45},{x:-1.2,z:-2.6,r:2.45},{x:-1.35,z:-3,r:1.95},{x:1.6,z:-2.15,r:2.05},{x:0,z:1.55,r:1.45},{x:0,z:-0.3,r:2}],Q=(Y,X)=>{for(let H=0;H<$.length;H++){let q=$[H],U=Y-q.x,V=X-q.z;if(U*U+V*V<=q.r*q.r)return!0}return!1},Z=140,K=[];for(let Y=0;Y<140;Y++){let X=Y/140*Math.PI*2,H=Math.cos(X),q=Math.sin(X),U=0;for(let V=0.1;V<=7;V+=0.01){let F=J.x+H*V,G=J.z+q*V;if(Q(F,G))U=V}K.push(U)}for(let Y=0;Y<3;Y++){let X=[];for(let H=0;H<140;H++){let q=K[(H-1+140)%140],U=K[H],V=K[(H+1)%140];X.push(0.25*q+0.5*U+0.25*V)}K=X}let W=new YQ;for(let Y=0;Y<140;Y++){let X=Y/140*Math.PI*2,H=J.x+Math.cos(X)*K[Y],q=J.z+Math.sin(X)*K[Y];if(Y===0)W.moveTo(H,q);else W.lineTo(H,q)}return W.closePath(),W}buildSculptedIsland(){let J=new n7(7.2,64),$=document.createElement("canvas");$.width=256,$.height=256;let Q=$.getContext("2d"),Z=Q.createRadialGradient(128,128,20,128,128,112);Z.addColorStop(0,"rgba(0, 0, 0, 0.12)"),Z.addColorStop(0.4,"rgba(0, 0, 0, 0.03)"),Z.addColorStop(0.72,"rgba(0, 0, 0, 0)"),Z.addColorStop(1,"rgba(0, 0, 0, 0)"),Q.fillStyle=Z,Q.fillRect(0,0,256,256);let K=new p8($),W=new QJ({map:K,transparent:!0,depthWrite:!1}),Y=new S(J,W);Y.rotation.x=-Math.PI*0.5,Y.position.y=-0.27,this.sceneryGroup.add(Y);let X=new c({color:15986146,roughness:0.45,metalness:0.02}),H=this.createMeadowTexture(),q=new c({color:5219931,map:H,roughness:0.65,metalness:0.02}),U=this.createIslandShape(),F=new s7(U,{depth:0.22,bevelEnabled:!0,bevelThickness:0.02,bevelSize:0.04,bevelSegments:3}),G=new S(F,X);G.rotation.x=Math.PI*0.5,G.position.y=-0.02,G.receiveShadow=!0,this.sceneryGroup.add(G);let N=new s7(U,{depth:0.035,bevelEnabled:!1}),E=new S(N,q);E.rotation.x=Math.PI*0.5,E.position.y=0.035,E.receiveShadow=!0,this.sceneryGroup.add(E);let O=q;[{x:-2.65,y:0.038,z:0.7,r:0.65,h:0.04},{x:2.85,y:0.038,z:-0.65,r:0.65,h:0.035},{x:-2.5,y:0.038,z:-2.2,r:0.75,h:0.04}].forEach((L)=>{let A=new S(new k0(L.r*0.45,L.r,L.h,18),O);A.position.set(L.x,L.y,L.z),A.receiveShadow=!0,this.sceneryGroup.add(A)});let R=new c({color:13154456,roughness:0.9});[[-0.18,0.82],[-0.36,0.76],[-0.55,0.68],[-0.74,0.58],[-0.95,0.46],[-1.15,0.35],[0.18,0.82],[0.36,0.76],[0.55,0.68],[0.74,0.58],[0.95,0.46],[1.15,0.32],[1.32,0.18],[-0.14,0.16],[-0.08,0.1],[0,0],[0.08,-0.1],[0.14,-0.16]].forEach(([L,A],w)=>{let I=new S(new k0(0.045,0.052,0.01,7),R);I.position.set(L,0.038,A),I.rotation.y=w*0.7,I.receiveShadow=!0,this.sceneryGroup.add(I)});let z=new c({color:7162945,roughness:0.75});[{start:[-1.55,-0.4],end:[-1.2,-0.4]},{start:[-1.2,-0.4],end:[-1.2,-0.22]},{start:[-1.55,-0.22],end:[-1.55,-0.4]}].forEach(({start:L,end:A})=>{let[w,I]=L,[k,b]=A,n=k-w,i=b-I,y=Math.sqrt(n*n+i*i),h=Math.atan2(i,n),m=(w+k)*0.5,l=(I+b)*0.5;[-y*0.48,y*0.48].forEach((d)=>{let v=new S(new J0(0.018,0.1,0.018),z),u=m+Math.cos(h)*d,r=l+Math.sin(h)*d;v.position.set(u,0.08,r),v.castShadow=!0,this.sceneryGroup.add(v)}),[0.065,0.105].forEach((d)=>{let v=new S(new J0(y,0.012,0.012),z);v.position.set(m,d,l),v.rotation.y=-h,v.castShadow=!0,this.sceneryGroup.add(v)})})}buildScenicCanalAndBridge(){let J=new G0,$=new k0(0.46,0.5,0.022,36),Q=new c({color:481669,roughness:0.75}),Z=new S($,Q);Z.scale.set(1.45,1,1.95),Z.rotation.y=0.7854,Z.position.set(0,0.015,-0.04),Z.receiveShadow=!0,J.add(Z);let K=new c({color:13621468,map:this.createStoneBrickTexture(),roughness:0.55,metalness:0.05}),W=36;for(let v=0;v<W;v++){let u=v/W*Math.PI*2,r=Math.cos(u)*0.44*1.45,g=Math.sin(u)*0.44*1.95,t=r*Math.cos(0.7854)-g*Math.sin(0.7854),Q0=r*Math.sin(0.7854)+g*Math.cos(0.7854);if(Math.abs(Q0-t)/Math.SQRT2<0.22)continue;if(Math.hypot(t- -0.247,Q0-0.247)<0.2||Math.hypot(t-0.247,Q0- -0.247)<0.2)continue;let R0=new S(new J0(0.1,0.04,0.052),K);R0.position.set(t,0.038,Q0),R0.rotation.y=0.7854-u,R0.castShadow=!0,R0.receiveShadow=!0,J.add(R0)}let Y=new c({color:165063,emissive:223649,emissiveIntensity:0.18,roughness:0.04,metalness:0.15,transparent:!0,opacity:0.88}),X=new k0(0.43,0.45,0.016,36),H=new S(X,Y);H.scale.set(1.42,1,1.9),H.rotation.y=0.7854,H.position.set(0,0.034,-0.04),H.receiveShadow=!0,this.waterMesh=H,J.add(H);let q=[6583435,4674921,9741240,5395035];[[-0.42,-0.26],[-0.38,-0.34],[-0.22,-0.48],[0.15,-0.46],[0.38,-0.32],[0.44,-0.18],[0.46,0.1],[0.38,0.28],[0.24,0.44],[-0.18,0.45],[-0.36,0.32],[-0.45,0.12]].filter(([v,u])=>Math.abs(u-v)/Math.SQRT2>=0.22).forEach(([v,u],r)=>{let g=new c({color:q[r%q.length],roughness:0.6}),t=new S(new wJ(0.026+r%3*0.012,1),g);t.position.set(v,0.038,u),t.rotation.set(r*0.5,r*0.8,r*0.3),t.castShadow=!0,J.add(t)});let V=new G0;V.position.set(-0.3,0.04,-0.32),V.rotation.y=0.65;let F=new c({color:7877903,roughness:0.7});[-0.07,0.07].forEach((v)=>{let u=new S(new k0(0.012,0.014,0.09,6),F);u.position.set(v,-0.01,0.09),u.castShadow=!0,V.add(u)});for(let v=0;v<4;v++){let u=new S(new J0(0.18,0.01,0.042),F);u.position.set(0,0.028,-0.06+v*0.045),u.castShadow=!0,V.add(u)}let G=new c({color:1976635,metalness:0.8,roughness:0.3}),N=new S(new k0(0.007,0.01,0.02,8),G);N.position.set(0.06,0.042,0.075),V.add(N),J.add(V);let E=new G0;E.position.set(-0.4,0.038,-0.24),E.rotation.y=0.45;let O=new c({color:9584654,roughness:0.5}),D=new c({color:4528643,roughness:0.6}),R=new S(new J0(0.2,0.042,0.09),O);R.position.y=0.018,R.castShadow=!0,E.add(R);let B=new S(new J0(0.208,0.008,0.098),D);B.position.y=0.04,E.add(B);let z=new c({color:11817737,roughness:0.4}),C=new S(new J0(0.038,0.014,0.082),z);C.position.set(0,0.028,0),E.add(C);let L=new S(new J0(0.042,0.014,0.082),z);L.position.set(-0.075,0.028,0),E.add(L);let A=new c({color:14251782,roughness:0.4});[-1,1].forEach((v)=>{let u=new G0,r=new S(new k0(0.004,0.004,0.16,6),A);r.rotation.z=Math.PI*0.5,u.add(r);let g=new S(new J0(0.038,0.003,0.018),A);g.position.x=0.08,u.add(g),u.position.set(0.01,0.044,v*0.052),u.rotation.y=v*0.25,u.rotation.z=v*0.1,E.add(u)});let w=new c({color:13935475,roughness:0.9}),I=new S(new k0(0.003,0.003,0.12,4),w);I.position.set(0.12,0.035,-0.04),I.rotation.z=-Math.PI*0.35,I.rotation.y=0.4,E.add(I),this.mooredBoat=E,J.add(E);let k=new c({color:1467700,roughness:0.6}),b=new c({color:4528643,roughness:0.8});[[-0.2,-0.42],[0.22,-0.38],[-0.38,0.15],[0.38,-0.18]].filter(([v,u])=>Math.abs(u-v)/Math.SQRT2>=0.22).forEach(([v,u])=>{for(let r=0;r<3;r++){let g=new G0,t=(Math.random()-0.5)*0.05,Q0=(Math.random()-0.5)*0.05;g.position.set(v+t,0.035,u+Q0);let F0=new S(new k0(0.003,0.004,0.1+r*0.02,4),k);F0.position.y=0.05+r*0.01,g.add(F0);let R0=new S(new k0(0.008,0.008,0.032,6),b);R0.position.y=0.085+r*0.01,g.add(R0),J.add(g)}});let i=new c({color:1409085,roughness:0.35}),y=new c({color:16020150,roughness:0.25}),h=new c({color:16638023,roughness:0.25});[[-0.3,0.038,0.06],[0.3,0.038,-0.06],[-0.38,0.038,-0.15],[0.38,0.038,0.15]].filter(([v,,u])=>Math.abs(u-v)/Math.SQRT2>=0.22).forEach(([v,u,r],g)=>{let t=new S(new k0(0.04,0.04,0.004,12,1,!1,0,Math.PI*1.85),i);t.position.set(v,u,r),t.rotation.y=g*1.4,J.add(t);let Q0=new S(new wJ(0.016,0),g%2===0?y:h);Q0.position.set(v,u+0.012,r),J.add(Q0)});let l=new c({color:4528643,roughness:0.85});[-0.28,-0.14,0,0.14,0.28].forEach((v)=>{let u=v*0.7071,r=v*0.7071,g=new S(new J0(0.24,0.024,0.055),l);g.position.set(u,0.044,r),g.rotation.y=-Math.PI*0.25,g.castShadow=!0,J.add(g),[-0.075,0.075].forEach((t)=>{let Q0=u-t*0.7071,F0=r+t*0.7071,R0=new S(new k0(0.014,0.016,0.065,8),l);R0.position.set(Q0,0.02,F0),R0.castShadow=!0,J.add(R0)})}),[-0.045,0.045].forEach((v)=>{let u=new S(new J0(0.64,0.018,0.035),l),r=-v*0.7071,g=v*0.7071;u.position.set(r,0.048,g),u.rotation.y=Math.PI*0.25,u.castShadow=!0,J.add(u)}),this.sceneryGroup.add(J)}buildInfiniteTrackCurve(){let J=[],$=260,Q=0.95,Z=0.055,K=0.38;for(let W=0;W<260;W++){let Y=W/260*Math.PI*2,X=Math.sin(Y)*3.3,H=Math.sin(2*Y)*1.6,q=Math.abs(Y-Math.PI),U=0.055;if(q<0.95){let V=Math.cos(q/0.95*(Math.PI*0.5));U=0.055+0.38*Math.pow(V,2)}J.push(new T(X,U,H))}this.trackCurve=new F7(J,!0,"centripetal")}buildPhysicalRailsAndTies(){let J=new J0(0.24,0.022,0.06),$=this.createWoodSleeperTexture(),Q=new c({color:6044974,map:$,roughness:0.7,metalness:0.1}),Z=160,K=new T(0,1,0);for(let O=0;O<160;O++){let D=O/160,R=this.trackCurve.getPointAt(D),B=this.trackCurve.getTangentAt(D).normalize(),z=new T().crossVectors(B,K).normalize();if(z.lengthSq()<0.001)z.set(1,0,0);let C=new S(J,Q);C.position.set(R.x,R.y-0.012,R.z),C.lookAt(R.clone().add(z)),C.castShadow=!0,C.receiveShadow=!0,this.trackGroup.add(C)}let W=280,Y=0.066,X=[],H=[];for(let O=0;O<=W;O++){let D=O/W,R=this.trackCurve.getPointAt(D),B=this.trackCurve.getTangentAt(D).normalize(),z=new T().crossVectors(B,K).normalize();if(z.lengthSq()<0.001)z.set(1,0,0);X.push(R.clone().addScaledVector(z,Y)),H.push(R.clone().addScaledVector(z,-Y))}let q=new F7(X,!0),U=new F7(H,!0),V=new o7(q,280,0.013,8,!0),F=new o7(U,280,0.013,8,!0),G=new c({color:13948120,metalness:0.92,roughness:0.18}),N=new S(V,G),E=new S(F,G);N.castShadow=!0,N.receiveShadow=!0,E.castShadow=!0,E.receiveShadow=!0,this.trackGroup.add(N),this.trackGroup.add(E)}buildStoneViaductAndTunnel(){this.viaductGroup.rotation.y=0.7702;let J=this.createStoneBrickTexture(),$=new c({color:14603717,map:J,roughness:0.52,metalness:0.04}),Q=new c({color:9074529,roughness:0.45}),Z=new c({color:6583435,map:J,roughness:0.65}),K=new c({color:3033643,roughness:0.85}),W=new J0(0.24,0.4,0.48);[-0.35,0.35].forEach((R)=>{let B=new S(W,$);B.position.set(R,0.2,0),B.castShadow=!0,B.receiveShadow=!0,this.viaductGroup.add(B);let z=new S(new J0(0.28,0.07,0.54),Z);z.position.set(R,0.035,0),z.castShadow=!0,z.receiveShadow=!0,this.viaductGroup.add(z),[-0.29,0.29].forEach((C)=>{let L=new S(new k0(0.001,0.12,0.22,3),Z);L.position.set(R,0.09,C),L.rotation.y=C>0?0:Math.PI,L.castShadow=!0,this.viaductGroup.add(L)}),[-0.14,0.14].forEach((C)=>{let L=new S(new wJ(0.024,0),K);L.position.set(R+(R>0?-0.12:0.12),0.06+Math.random()*0.04,C),this.viaductGroup.add(L)})});let Y=new J0(1.12,0.045,0.44),X=new S(Y,$);X.position.set(0,0.4,0),X.castShadow=!0,X.receiveShadow=!0,this.viaductGroup.add(X);for(let R=0;R<9;R++){let B=-0.44+R*0.11;[-0.21,0.21].forEach((z)=>{let C=new S(new J0(0.032,0.028,0.038),Q);C.position.set(B,0.375,z),C.castShadow=!0,this.viaductGroup.add(C)})}let H=new c({color:13156008,map:J,roughness:0.58,metalness:0.04,side:S8}),q=new k0(0.23,0.23,0.48,28,1,!0,-Math.PI*0.5,Math.PI),U=new S(q,H);U.rotation.x=-Math.PI*0.5,U.position.set(0,0.17,0),U.castShadow=!0,U.receiveShadow=!0,this.viaductGroup.add(U),this.tunnelLight=new yJ(16498468,0.9,1.4),this.tunnelLight.position.set(0,0.32,0),this.viaductGroup.add(this.tunnelLight),[-0.242,0.242].forEach((R)=>{for(let z=0;z<=9;z++){let C=z/9*Math.PI,L=z===Math.floor(4.5),A=Math.cos(C)*0.235,w=0.17+Math.sin(C)*0.235,I=L?new J0(0.048,0.064,0.042):new J0(0.038,0.042,0.03),k=new S(I,L?Q:$);k.position.set(A,w,R),k.rotation.z=C-Math.PI*0.5,k.castShadow=!0,this.viaductGroup.add(k)}[-0.18,0.18].forEach((z)=>{let C=new S(new J0(0.09,0.07,0.024),$);C.position.set(z,0.365,R),C.castShadow=!0,this.viaductGroup.add(C)})});let V=new J0(1.12,0.085,0.04),F=new S(V,Q);F.position.set(0,0.46,0.2),F.castShadow=!0,this.viaductGroup.add(F);let G=new S(V,Q);G.position.set(0,0.46,-0.2),G.castShadow=!0,this.viaductGroup.add(G);let N=new FJ(0.035,0.075,4);[[-0.54,0.525,0.2],[0.54,0.525,0.2],[-0.54,0.525,-0.2],[0.54,0.525,-0.2]].forEach(([R,B,z])=>{let C=new S(N,Q);C.position.set(R,B,z),C.rotation.y=Math.PI*0.25,C.castShadow=!0,this.viaductGroup.add(C)}),this.viaductLanterns=[],this.viaductLanternLights=[];let E=new c({color:1976635,metalness:0.85,roughness:0.3}),O=new c({color:14251782,metalness:0.8,roughness:0.2}),D=new c({color:16707722,emissive:16498468,emissiveIntensity:1.8,roughness:0.1,transparent:!0,opacity:0.9});[{x:-0.38,z:0.25},{x:0.38,z:0.25},{x:-0.38,z:-0.25},{x:0.38,z:-0.25}].forEach(({x:R,z:B})=>{let z=new G0;z.position.set(R,0.29,B);let C=new S(new J0(0.012,0.045,0.045),E);C.position.set(R>0?-0.02:0.02,0,0),z.add(C);let L=new S(new k0(0.022,0.016,0.04,6),O);L.position.set(0,0.01,0),L.castShadow=!0,z.add(L);let A=new S(new k0(0.016,0.012,0.028,6),D);A.position.set(0,0.01,0),z.add(A);let w=new yJ(16498468,this.isNightMode?1.4:0,1.6);w.position.set(0,0.01,0),z.add(w),this.viaductLanternLights.push(w),this.viaductLanterns.push(z),this.viaductGroup.add(z)})}buildMiniatureStationAndTown(){let J=new G0;J.position.set(0,0.04,1.25),J.rotation.y=0;let $=new c({color:14870768,roughness:0.4}),Q=new c({color:8736014,roughness:0.5}),Z=new c({color:14510880,roughness:0.35}),K=new S(new J0(0.62,0.05,0.22),$);K.position.y=0.025,K.castShadow=!0,K.receiveShadow=!0,J.add(K);let W=new J0(0.024,0.28,0.024),Y=new S(W,Q);Y.position.set(-0.16,0.16,-0.06),J.add(Y);let X=new S(W,Q);X.position.set(0.08,0.16,-0.06),J.add(X);let H=new S(new J0(0.38,0.024,0.2),Z);H.position.set(-0.04,0.3,-0.02),H.rotation.x=0.12,H.castShadow=!0,J.add(H),this.clockTowerGroup=new G0,this.clockTowerGroup.position.set(0.2,0,-0.04);let q=new S(new J0(0.12,0.42,0.12),$);q.position.y=0.235,q.castShadow=!0,this.clockTowerGroup.add(q);let U=new S(new FJ(0.1,0.18,4),Z);U.position.y=0.53,U.rotation.y=Math.PI*0.25,U.castShadow=!0,this.clockTowerGroup.add(U);let V=new S(new k0(0.038,0.038,0.01,16),new c({color:16777215,roughness:0.1}));V.rotation.x=Math.PI*0.5,V.position.set(0,0.36,0.065),this.clockTowerGroup.add(V);let F=new J0(0.005,0.028,0.005);this.clockHand=new S(F,new QJ({color:988970})),this.clockHand.position.set(0,0.36,0.072),this.clockTowerGroup.add(this.clockHand),J.add(this.clockTowerGroup);let G=new S(new J0(0.18,0.038,0.05),Q);G.position.set(-0.06,0.065,-0.04),J.add(G);let N=new S(new J0(0.04,0.03,0.022),new c({color:9584654}));N.position.set(-0.16,0.065,-0.04),J.add(N);let E=new c({color:9741240,metalness:0.85,roughness:0.3});[-0.19,-0.21].forEach((R,B)=>{let z=new S(new k0(0.016,0.018,0.036,8),E);z.position.set(R,0.065,0.04+B*0.03),z.castShadow=!0,J.add(z)}),[2450411,14251782].forEach((R,B)=>{let z=new G0,C=new S(new k0(0.02,0.026,0.07,8),new c({color:R,roughness:0.4}));C.position.y=0.085;let L=new S(new YJ(0.02,8,8),new c({color:16772565}));L.position.y=0.135,z.add(C),z.add(L),z.position.set(-0.02+B*0.06,0,0.01),z.castShadow=!0,J.add(z)}),this.lanternLight=new yJ(16708551,0.8,1.6),this.lanternLight.position.set(-0.04,0.26,-0.02),J.add(this.lanternLight);let D=new S(new YJ(0.022,8,8),new QJ({color:16707722}));D.position.copy(this.lanternLight.position),J.add(D),this.sceneryGroup.add(J)}buildDutchWindmill(){this.windmillGroup=new G0,this.windmillGroup.position.set(-2.25,0.035,-0.45);let J=this.createStoneBrickTexture(),$=new c({color:14076856,map:J,roughness:0.65,metalness:0.05}),Q=new c({color:7877903,roughness:0.7}),Z=new c({color:14604492,roughness:0.6,metalness:0.02}),K=new c({color:3359061,roughness:0.45,metalness:0.2}),W=new c({color:16710083,roughness:0.8,side:S8}),Y=new S(new k0(0.18,0.21,0.08,8),$);Y.position.y=0.04,Y.castShadow=!0,Y.receiveShadow=!0,this.windmillGroup.add(Y);let X=new S(new k0(0.11,0.17,0.36,8),Z);X.position.y=0.26,X.castShadow=!0,X.receiveShadow=!0,this.windmillGroup.add(X);let H=new S(new FJ(0.13,0.1,8),K);H.position.y=0.49,H.castShadow=!0,this.windmillGroup.add(H),this.windmillSails=new G0,this.windmillSails.position.set(0,0.44,0.13);let q=new S(new k0(0.024,0.024,0.024,8),Q);q.rotation.x=Math.PI*0.5,this.windmillSails.add(q);for(let F=0;F<4;F++){let G=new G0;G.rotation.z=F*Math.PI/2;let N=new S(new J0(0.012,0.28,0.01),Q);N.position.y=0.14,G.add(N);let E=new S(new eJ(0.055,0.22),W);E.position.set(0.032,0.15,0.005),E.rotation.y=0.15,G.add(E),this.windmillSails.add(G)}this.windmillGroup.add(this.windmillSails);let U=new c({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.6:0.1,roughness:0.1}),V=new S(new J0(0.012,0.03,0.024),U);V.position.set(0.125,0.27,0.04),this.windmillGroup.add(V),this.windmillLight=new yJ(16498468,this.isNightMode?0.85:0,1.4),this.windmillLight.position.set(0.08,0.28,0),this.windmillGroup.add(this.windmillLight),this.sceneryGroup.add(this.windmillGroup)}buildWestFarmlandAndBarn(){let J=new G0;J.position.set(-2.05,0.04,0.15);let $=new c({color:10033947,roughness:0.65}),Q=new c({color:16317180,roughness:0.45}),Z=new c({color:3359061,roughness:0.6}),K=new c({color:9741240,roughness:0.8}),W=new c({color:16436245,roughness:0.85}),Y=new c({color:9741240,metalness:0.75,roughness:0.25}),X=new c({color:4528643,roughness:0.9}),H=new c({color:15381256,roughness:0.8}),q=new c({color:1483594,roughness:0.6}),U=new G0,V=new S(new J0(0.34,0.04,0.24),K);V.position.y=0.02,V.castShadow=!0,U.add(V);let F=new S(new J0(0.32,0.16,0.22),$);F.position.y=0.12,F.castShadow=!0,U.add(F);let G=new S(new J0(0.06,0.1,0.01),Q);G.position.set(-0.035,0.09,0.112),U.add(G);let N=new S(new J0(0.06,0.1,0.01),Q);N.position.set(0.035,0.09,0.112),U.add(N);let E=new S(new J0(0.36,0.06,0.25),Z);E.position.y=0.23,E.castShadow=!0,U.add(E);let O=new S(new FJ(0.14,0.08,4),Z);O.rotation.y=Math.PI*0.25,O.position.y=0.29,O.scale.set(1.1,1,1.8),O.castShadow=!0,U.add(O);let D=new S(new J0(0.05,0.05,0.01),Q);D.position.set(0,0.23,0.128),U.add(D);let R=new yJ(16707722,0.6,0.8);R.position.set(0,0.26,0.14),U.add(R),J.add(U),this.farmBarnGroup=J;let B=new G0;B.position.set(-0.22,0,0.1);let z=new S(new k0(0.065,0.065,0.32,16),Y);z.position.y=0.16,z.castShadow=!0,B.add(z);let C=new S(new YJ(0.066,12,12,0,Math.PI*2,0,Math.PI*0.5),Y);C.position.y=0.32,C.castShadow=!0,B.add(C);for(let m=0;m<6;m++){let l=new S(new J0(0.02,0.005,0.005),Q);l.position.set(0,0.08+m*0.045,0.068),B.add(l)}J.add(B);let L=new G0;L.position.set(-0.25,0,-0.08);let A=new S(new k0(0.038,0.038,0.06,12),W);A.rotation.z=Math.PI*0.5,A.position.set(0,0.038,0),A.castShadow=!0,L.add(A);let w=new S(new J0(0.07,0.035,0.045),W);w.position.set(0.08,0.018,0.02),w.castShadow=!0,L.add(w);let I=new S(new J0(0.07,0.035,0.045),W);I.position.set(0.08,0.053,0.02),I.rotation.y=0.2,I.castShadow=!0,L.add(I),J.add(L);let k=new G0;k.position.set(-0.45,0,-0.22);let b=new S(new J0(0.28,0.015,0.22),X);b.position.y=0.008,k.add(b),[-0.08,0,0.08].forEach((m,l)=>{for(let d=-0.1;d<=0.1;d+=0.04)if(l%2===0){let v=new S(new k0(0.006,0.008,0.045,5),H);v.position.set(d,0.035,m),k.add(v)}else{let v=new S(new wJ(0.014,0),q);v.position.set(d,0.025,m),k.add(v)}}),J.add(k);let n=new G0;n.position.set(-0.35,0,-0.4);let i=new S(new k0(0.02,0.026,0.14,6),$);i.position.y=0.07,n.add(i);let y=new S(new wJ(0.11,1),q);y.position.y=0.18,n.add(y);let h=new QJ({color:15680580});[[-0.06,0.16,0.05],[0.06,0.19,-0.04],[0,0.22,0.07],[0.04,0.15,0.06]].forEach(([m,l,d])=>{let v=new S(new YJ(0.012,6,6),h);v.position.set(m,l,d),n.add(v)}),J.add(n)}buildCanalWatermill(){this.watermillGroup=new G0,this.watermillGroup.position.set(0,0.035,-0.88);let J=this.createStoneBrickTexture(),$=new c({color:13621468,map:J,roughness:0.65,metalness:0.05}),Q=new c({color:7877903,roughness:0.7}),Z=new c({color:15857145,roughness:0.85}),K=new c({color:10105874,roughness:0.5}),W=new S(new J0(0.32,0.1,0.26),$);W.position.y=0.05,W.castShadow=!0,W.receiveShadow=!0,this.watermillGroup.add(W);let Y=new S(new J0(0.3,0.13,0.24),Z);Y.position.y=0.165,Y.castShadow=!0,Y.receiveShadow=!0,this.watermillGroup.add(Y),[-0.145,0.145].forEach((N)=>{let E=new S(new J0(0.015,0.13,0.245),Q);E.position.set(N,0.165,0),this.watermillGroup.add(E)});let X=new S(new J0(0.34,0.024,0.17),K);X.position.set(0,0.275,-0.06),X.rotation.x=0.68,X.castShadow=!0,this.watermillGroup.add(X);let H=new S(new J0(0.34,0.024,0.17),K);H.position.set(0,0.275,0.06),H.rotation.x=-0.68,H.castShadow=!0,this.watermillGroup.add(H),[-0.148,0.148].forEach((N)=>{let E=new S(new FJ(0.12,0.09,3),Q);E.position.set(N,0.275,0),E.rotation.y=N>0?Math.PI*0.5:-Math.PI*0.5,this.watermillGroup.add(E)});let q=new S(new J0(0.045,0.16,0.045),$);q.position.set(0.09,0.3,-0.07),q.castShadow=!0,this.watermillGroup.add(q);let U=new S(new J0(0.08,0.022,0.16),Q);U.position.set(0,0.18,0.17),U.rotation.x=0.15,U.castShadow=!0,this.watermillGroup.add(U),this.waterwheel=new G0,this.waterwheel.position.set(0,0.065,0.18);let V=new S(new k0(0.014,0.014,0.08,8),Q);V.rotation.z=Math.PI*0.5,this.waterwheel.add(V),[-0.03,0.03].forEach((N)=>{let E=new S(new i7(0.105,0.125,16),Q);E.rotation.y=Math.PI*0.5,E.position.x=N,this.waterwheel.add(E)});for(let N=0;N<12;N++){let E=N/12*Math.PI*2,O=new G0;if(O.rotation.x=E,N%2===0){let R=new S(new J0(0.012,0.11,0.01),Q);R.position.y=0.055,O.add(R)}let D=new S(new J0(0.068,0.008,0.036),Q);D.position.set(0,0.115,0),D.castShadow=!0,O.add(D),this.waterwheel.add(O)}this.watermillGroup.add(this.waterwheel);let F=new S(new J0(0.012,0.012,0.045),Q);F.position.set(0.09,0.18,0.14),this.watermillGroup.add(F),this.watermillLight=new yJ(16498468,this.isNightMode?0.85:0,1.4),this.watermillLight.position.set(0.09,0.16,0.16),this.watermillGroup.add(this.watermillLight);let G=new S(new YJ(0.016,8,8),new QJ({color:16707722}));G.position.copy(this.watermillLight.position),this.watermillGroup.add(G),this.sceneryGroup.add(this.watermillGroup)}buildVillageCottageAndSignals(){this.cottageGroup=new G0,this.cottageGroup.position.set(2.4,0.035,-0.35),this.cottageGroup.rotation.y=-0.35;let J=new c({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),$=new c({color:16448249,roughness:0.85}),Q=new c({color:4528643,roughness:0.7}),Z=new c({color:8736014,roughness:0.9}),K=new c({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.8:0.1,roughness:0.1}),W=new S(new J0(0.36,0.05,0.26),J);W.position.y=0.025,W.castShadow=!0,W.receiveShadow=!0,this.cottageGroup.add(W);let Y=new S(new J0(0.34,0.14,0.24),$);Y.position.y=0.12,Y.castShadow=!0,Y.receiveShadow=!0,this.cottageGroup.add(Y),[-0.165,0.165].forEach((w)=>{let I=new S(new J0(0.016,0.14,0.244),Q);I.position.set(w,0.12,0),this.cottageGroup.add(I)});let X=new S(new J0(0.344,0.016,0.244),Q);X.position.set(0,0.12,0),this.cottageGroup.add(X);let H=new S(new J0(0.38,0.026,0.17),Z);H.position.set(0,0.225,-0.06),H.rotation.x=0.72,H.castShadow=!0,this.cottageGroup.add(H);let q=new S(new J0(0.38,0.026,0.17),Z);q.position.set(0,0.225,0.06),q.rotation.x=-0.72,q.castShadow=!0,this.cottageGroup.add(q);let U=new S(new J0(0.07,0.06,0.06),$);U.position.set(-0.06,0.22,0.08),U.castShadow=!0,this.cottageGroup.add(U);let V=new S(new FJ(0.05,0.04,3),Z);V.position.set(-0.06,0.265,0.08),V.rotation.y=Math.PI*0.5,this.cottageGroup.add(V);let F=new S(new J0(0.042,0.18,0.042),J);F.position.set(0.12,0.26,-0.06),F.castShadow=!0,this.cottageGroup.add(F);let G=new S(new J0(0.012,0.038,0.032),K);G.position.set(0.07,0.12,0.122),this.cottageGroup.add(G);let N=new S(new J0(0.012,0.038,0.032),K);N.position.set(-0.07,0.12,0.122),this.cottageGroup.add(N);let E=new S(new J0(0.042,0.07,0.012),Q);E.position.set(0,0.085,0.122),this.cottageGroup.add(E),this.cottageLight=new yJ(16498468,this.isNightMode?1.1:0,1.6),this.cottageLight.position.set(0,0.14,0),this.cottageGroup.add(this.cottageLight),this.sceneryGroup.add(this.cottageGroup),this.semaphoreGroup=new G0,this.semaphoreGroup.position.set(-0.35,0.035,1.25);let O=new c({color:1976635,metalness:0.8,roughness:0.3}),D=new c({color:14427686,roughness:0.4}),R=new c({color:16777215,roughness:0.4}),B=new S(new k0(0.01,0.014,0.38,8),O);B.position.y=0.19,B.castShadow=!0,this.semaphoreGroup.add(B);for(let w=0;w<6;w++){let I=new S(new J0(0.028,0.004,0.004),O);I.position.set(0,0.08+w*0.045,0.014),this.semaphoreGroup.add(I)}let z=new S(new YJ(0.014,6,6),O);z.position.y=0.385,this.semaphoreGroup.add(z),this.semaphoreArm=new G0,this.semaphoreArm.position.set(0,0.32,0.01);let C=new S(new J0(0.12,0.022,0.005),D);C.position.x=0.06,C.castShadow=!0,this.semaphoreArm.add(C);let L=new S(new J0(0.022,0.024,0.006),R);L.position.x=0.09,this.semaphoreArm.add(L);let A=new S(new J0(0.03,0.018,0.01),O);A.position.x=-0.02,this.semaphoreArm.add(A),this.semaphoreGroup.add(this.semaphoreArm),this.semaphoreLight=new yJ(14427686,0.6,0.8),this.semaphoreLight.position.set(0.01,0.32,0.02),this.semaphoreGroup.add(this.semaphoreLight),this.sceneryGroup.add(this.semaphoreGroup)}buildEastVillageAndPlaza(){let J=new G0;J.position.set(2.05,0.04,0);let $=new c({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),Q=new c({color:4528643,roughness:0.7}),Z=new c({color:16448249,roughness:0.85}),K=new c({color:12730636,roughness:0.5}),W=new c({color:165063,roughness:0.1,metalness:0.2}),Y=new c({color:1976635,roughness:0.5,metalness:0.8}),X=new c({color:16707722,emissive:16498468,emissiveIntensity:1.2}),H=new S(new k0(0.38,0.4,0.012,24),$);H.position.y=0.006,H.receiveShadow=!0,J.add(H);let q=new G0,U=new S(new k0(0.18,0.2,0.07,16),$);U.position.y=0.035,U.castShadow=!0,q.add(U);let V=new S(new k0(0.165,0.165,0.01,16),W);V.position.y=0.065,q.add(V);let F=new S(new k0(0.045,0.06,0.14,12),$);F.position.y=0.13,q.add(F);let G=new S(new k0(0.09,0.1,0.04,12),$);G.position.y=0.19,G.castShadow=!0,q.add(G);let N=new S(new k0(0.08,0.08,0.01,12),W);N.position.y=0.205,q.add(N);let E=new S(new FJ(0.02,0.05,8),$);E.position.y=0.24,q.add(E);let O=28,D=new GJ,R=new Float32Array(O*3);for(let y=0;y<O;y++){let h=y/O*Math.PI*2,m=0.02+Math.random()*0.05;R[y*3]=Math.cos(h)*m,R[y*3+1]=0.24+Math.random()*0.08,R[y*3+2]=Math.sin(h)*m}D.setAttribute("position",new vJ(R,3));let B=new M9({color:3718648,size:0.022,transparent:!0,opacity:0.85});this.townFountainJet=new U7(D,B),q.add(this.townFountainJet),J.add(q),this.townFountainGroup=J;let z=new G0;z.position.set(0.25,0,0.28),z.rotation.y=-0.55;let C=new S(new J0(0.3,0.04,0.22),$);C.position.y=0.02,z.add(C);let L=new S(new J0(0.28,0.14,0.2),Z);L.position.y=0.11,L.castShadow=!0,z.add(L);let A=new S(new J0(0.32,0.022,0.14),K);A.position.set(0,0.21,-0.05),A.rotation.x=0.65,A.castShadow=!0,z.add(A);let w=new S(new J0(0.32,0.022,0.14),K);w.position.set(0,0.21,0.05),w.rotation.x=-0.65,w.castShadow=!0,z.add(w);let I=new c({color:14251782,roughness:0.6}),k=new S(new J0(0.12,0.015,0.06),I);k.position.set(0,0.13,0.125),k.rotation.x=0.35,z.add(k);let b=new QJ({color:16707722}),n=new S(new eJ(0.08,0.05),b);n.position.set(0,0.09,0.102),z.add(n),J.add(z),[[-0.18,0.14],[-0.18,-0.14]].forEach(([y,h])=>{let m=new G0;m.position.set(y,0,h);let l=new S(new k0(0.008,0.012,0.24,8),Y);l.position.y=0.12,l.castShadow=!0,m.add(l);let d=new S(new wJ(0.022,0),X);d.position.y=0.25,m.add(d),J.add(m)});let i=new S(new J0(0.14,0.035,0.045),Q);i.position.set(0.08,0.025,-0.22),i.rotation.y=-0.3,i.castShadow=!0,J.add(i),this.sceneryGroup.add(J)}buildBioluminescentFireflies(){this.firefliesGroup=new G0,this.fireflies=[];let J=new YJ(0.007,6,6),$=new QJ({color:13434624,transparent:!0,opacity:this.isNightMode?0.85:0});[[-0.15,0.08,-0.45],[0.12,0.12,-0.35],[-0.05,0.1,-0.2],[0.22,0.09,-0.15],[-0.25,0.14,0.1],[0.08,0.11,0.25],[-0.18,0.09,0.38],[0.15,0.13,0.42],[-1.5,0.12,0.2],[-1.3,0.16,-0.15],[-1.65,0.18,-0.1],[-1.2,0.11,0.3],[-1.45,0.14,-0.35],[-1.1,0.1,-0.1],[-1.55,0.2,0.1],[-1.35,0.15,0.12],[1.35,0.12,0.35],[1.5,0.15,0.1],[1.25,0.14,-0.2],[1.4,0.11,-0.3],[1.1,0.1,0.25],[1.2,0.16,0.5],[0.95,0.12,0.15],[1.45,0.13,0.05]].forEach(([Z,K,W],Y)=>{let X=new S(J,$.clone());X.position.set(Z,K,W),this.firefliesGroup.add(X),this.fireflies.push({mesh:X,baseX:Z,baseY:K,baseZ:W,speed:0.6+Y%5*0.25,phase:Y*0.75,radius:0.035+Y%3*0.02})}),this.sceneryGroup.add(this.firefliesGroup)}triggerWindmillSpin(){if(!this.windmillSails)return;if(this.windmillCurrentSpeed=0.075,this.audio.playWindmillSpin(),this.windmillGroup)_0.to(this.windmillGroup.scale,{y:1.08,duration:0.15,yoyo:!0,repeat:1,ease:"power1.out"})}triggerWaterwheelSpin(){if(!this.waterwheel)return;if(this.audio.playWaterwheel(),this.triggerSplash(0,0.035,-0.73),this.watermillGroup)_0.to(this.watermillGroup.scale,{y:1.06,duration:0.12,yoyo:!0,repeat:1,ease:"power1.out"})}triggerSemaphoreToggle(){if(!this.semaphoreArm)return;this.semaphoreIsRaised=!this.semaphoreIsRaised;let J=this.semaphoreIsRaised?Math.PI*0.25:0;if(_0.to(this.semaphoreArm.rotation,{z:J,duration:0.35,ease:"back.out(1.8)"}),this.semaphoreLight)this.semaphoreLight.color.set(this.semaphoreIsRaised?1096065:14427686);this.audio.playSwitchClick()}triggerCottageChimney(){if(!this.cottageGroup)return;this.audio.playSteamChuff(!1),this.triggerTelegraphPing(this.cottageGroup)}buildLevelCrossingAndTelegraph(){let J=new G0;J.position.set(-0.45,0,0.82);let $=new S(new k0(0.016,0.018,0.38,8),new c({color:3359061,metalness:0.6}));$.position.y=0.19,$.castShadow=!0,J.add($);let Q=new c({color:16777215}),Z=new S(new J0(0.16,0.026,0.008),Q);Z.position.set(0,0.34,0.015),Z.rotation.z=Math.PI*0.25,J.add(Z);let K=new S(new J0(0.16,0.026,0.008),Q);K.position.set(0,0.34,0.015),K.rotation.z=-Math.PI*0.25,J.add(K);let W=new QJ({color:15680580});this.crossingLamp1=new S(new YJ(0.022,8,8),W),this.crossingLamp1.position.set(-0.05,0.27,0.022),J.add(this.crossingLamp1),this.crossingLight1=new yJ(15680580,0.8,0.8),this.crossingLight1.position.copy(this.crossingLamp1.position),J.add(this.crossingLight1),this.crossingLamp2=new S(new YJ(0.022,8,8),W),this.crossingLamp2.position.set(0.05,0.27,0.022),J.add(this.crossingLamp2),this.crossingLight2=new yJ(15680580,0.2,0.8),this.crossingLight2.position.copy(this.crossingLamp2.position),J.add(this.crossingLight2),this.sceneryGroup.add(J);let Y=[[-1.2,1.45],[-0.45,1.35],[0.45,-1.35],[1.2,-1.45]],X=new c({color:7877903,roughness:0.8});Y.forEach(([H,q])=>{let U=new G0;U.position.set(H,0,q);let V=new S(new k0(0.018,0.024,0.44,6),X);V.position.y=0.22,V.castShadow=!0,U.add(V);let F=new S(new J0(0.16,0.016,0.016),X);F.position.y=0.4,U.add(F);let G=new c({color:16777215,roughness:0.2});[-0.06,0.06].forEach((N)=>{let E=new S(new k0(0.008,0.008,0.02,6),G);E.position.set(N,0.415,0),U.add(E)}),this.sceneryGroup.add(U),this.interactivePoles.push(U)})}getApproxDistanceToTrack(J,$){let Q=1/0,Z=140;for(let K=0;K<Z;K++){let W=K/Z*Math.PI*2,Y=Math.sin(W)*3.3,X=Math.sin(2*W)*1.6,H=Math.hypot(Y-J,X-$);if(H<Q)Q=H}return Q}buildLushNatureAndFlock(){let J=[{x:-2.75,z:0.1,type:"deciduous",col:1409085,scale:1.1},{x:-2.6,z:-0.35,type:"pine",col:1467700,scale:1.2},{x:-2.8,z:-0.1,type:"deciduous",col:2278750,scale:1},{x:-1.75,z:-0.55,type:"pine",col:1332013,scale:1.15},{x:-1.45,z:0.45,type:"deciduous",col:6660877,scale:1.05},{x:-1.15,z:-0.3,type:"pine",col:1409085,scale:0.95},{x:2.75,z:0.1,type:"deciduous",col:1409085,scale:1.1},{x:2.6,z:-0.45,type:"pine",col:1467700,scale:1.2},{x:2.8,z:-0.1,type:"deciduous",col:2278750,scale:1},{x:1.75,z:0.5,type:"pine",col:1332013,scale:1.15},{x:1.45,z:-0.45,type:"deciduous",col:6660877,scale:1.05},{x:1.15,z:0.3,type:"pine",col:1409085,scale:0.95}],$=new c({color:7877903,roughness:0.7});J.forEach(({x:h,z:m,type:l,col:d,scale:v})=>{let u=new G0;u.position.set(h,0,m),u.scale.setScalar(v);let r=new S(new k0(0.026,0.034,0.16,6),$);r.position.y=0.08,r.castShadow=!0,u.add(r);let g=new c({color:d,roughness:0.5});if(l==="pine"){let t=new S(new FJ(0.18,0.22,6),g);t.position.y=0.22,t.castShadow=!0,u.add(t);let Q0=new S(new FJ(0.13,0.18,6),g);Q0.position.y=0.32,Q0.castShadow=!0,u.add(Q0);let F0=new S(new FJ(0.08,0.13,6),g);F0.position.y=0.41,F0.castShadow=!0,u.add(F0)}else{let t=new S(new wJ(0.18,1),g);t.position.set(0,0.25,0),t.castShadow=!0,u.add(t);let Q0=new S(new wJ(0.13,1),g);Q0.position.set(0.04,0.35,0.02),Q0.castShadow=!0,u.add(Q0)}this.interactiveTrees.push(u),this.sceneryGroup.add(u)});let Q=new c({color:16317180,roughness:0.9}),Z=new c({color:1976635,roughness:0.5});[{pos:[-1.85,0.04,0.35],scale:1},{pos:[-2.2,0.04,0.4],scale:1},{pos:[-2.45,0.04,0.2],scale:1},{pos:[-2.6,0.04,0.65],scale:0.95},{pos:[-2.35,0.04,-0.15],scale:1},{pos:[-2.05,0.04,0.55],scale:0.65},{pos:[-2.5,0.04,0.42],scale:0.65},{pos:[1.75,0.04,-0.15],scale:1},{pos:[2.15,0.04,-0.4],scale:1},{pos:[2.45,0.04,0.45],scale:0.9}].forEach(({pos:[h,m,l],scale:d})=>{let v=new G0;v.position.set(h,m,l),v.scale.setScalar(d);let u=new S(new wJ(0.045,1),Q);u.position.y=0.045,u.scale.set(1.2,0.9,0.9),u.castShadow=!0,v.add(u);let r=new S(new YJ(0.022,6,6),Z);r.position.set(0.05,0.05,0),v.add(r),this.interactiveSheep.push(v),this.sceneryGroup.add(v)});let W=new G0;W.position.set(-1.62,0.04,-0.22);let Y=new c({color:11817737,roughness:0.85}),X=new c({color:16710083,roughness:0.35}),H=new S(new J0(0.12,0.08,0.07),Y);H.position.y=0.055,H.castShadow=!0,W.add(H);let q=new S(new J0(0.06,0.06,0.06),Y);q.position.set(0.08,0.075,0),W.add(q);let U=new S(new FJ(0.012,0.05,5),X);U.rotation.z=-Math.PI*0.35,U.position.set(0.08,0.11,0.035),W.add(U);let V=new S(new FJ(0.012,0.05,5),X);V.rotation.z=-Math.PI*0.35,V.position.set(0.08,0.11,-0.035),W.add(V),this.interactiveSheep.push(W),this.sceneryGroup.add(W);let F=new c({color:7877903,roughness:0.8}),G=[[-1.75,0.15],[-2.05,0.15],[-2.35,0.15],[-2.65,0.15],[-2.8,0.35],[-2.8,0.65],[-2.65,0.85],[-2.35,0.85]];G.forEach(([h,m],l)=>{let d=new S(new k0(0.012,0.014,0.08,5),F);if(d.position.set(h,0.04,m),d.castShadow=!0,this.sceneryGroup.add(d),l<G.length-1){let v=G[l+1],u=(h+v[0])*0.5,r=(m+v[1])*0.5,g=Math.hypot(v[0]-h,v[1]-m),t=Math.atan2(v[1]-m,v[0]-h);[0.055,0.032].forEach((Q0)=>{let F0=new S(new J0(g,0.008,0.008),F);F0.position.set(u,Q0,r),F0.rotation.y=-t,this.sceneryGroup.add(F0)})}});let N=new G0;N.position.set(-1.68,0.04,0.62);let E=new S(new k0(0.012,0.014,0.14,6),F);E.position.y=0.07,N.add(E);let O=new S(new J0(0.07,0.018,0.006),F);O.position.set(0.02,0.12,0),O.rotation.y=0.25,N.add(O);let D=new S(new J0(0.065,0.016,0.006),F);D.position.set(-0.02,0.09,0),D.rotation.y=-0.35,N.add(D),this.sceneryGroup.add(N),this.orchardGroup=new G0,this.orchardGroup.position.set(2.35,0,0.15);let R=new c({color:1409085,roughness:0.55}),B=new c({color:14427686,roughness:0.3}),z=new c({color:7877903,roughness:0.7});[{x:0,z:0},{x:0.35,z:-0.25}].forEach(({x:h,z:m})=>{let l=new G0;l.position.set(h,0,m);let d=new S(new k0(0.022,0.028,0.14,6),z);d.position.y=0.07,d.castShadow=!0,l.add(d);let v=new S(new wJ(0.14,1),R);v.position.set(0,0.18,0),v.castShadow=!0,l.add(v),[[0.08,0.16,0.06],[-0.07,0.19,0.05],[0.03,0.22,-0.08],[-0.05,0.15,-0.06],[0.06,0.2,0.08]].forEach(([r,g,t])=>{let Q0=new S(new YJ(0.012,6,6),B);Q0.position.set(r,g,t),l.add(Q0)}),this.interactiveTrees.push(l),this.orchardGroup.add(l)}),this.beehiveGroup=new G0,this.beehiveGroup.position.set(0.15,0.04,0.32);let L=new c({color:16707722,roughness:0.6}),A=new c({color:9584654,roughness:0.5}),w=new S(new J0(0.065,0.07,0.065),L);w.position.y=0.035,w.castShadow=!0,this.beehiveGroup.add(w);let I=new S(new FJ(0.055,0.035,4),A);I.position.y=0.085,I.rotation.y=Math.PI*0.25,I.castShadow=!0,this.beehiveGroup.add(I),this.orchardGroup.add(this.beehiveGroup);let k=new QJ({color:16436245});for(let h=0;h<4;h++){let m=new S(new YJ(0.005,4,4),k);m.position.set(2.5,0.12+h*0.02,0.45),this.sceneryGroup.add(m),this.bees.push({mesh:m,baseX:2.5,baseY:0.12+h*0.02,baseZ:0.47,speed:2.2+h*0.6,phase:h*1.57,radius:0.06+h%2*0.03})}let b=new G0;b.position.set(-0.25,0.04,-0.2),b.rotation.y=-Math.PI*0.4;let n=new S(new J0(0.09,0.008,0.035),F);n.position.y=0.024,b.add(n);let i=new S(new J0(0.09,0.032,0.006),F);i.position.set(0,0.042,-0.015),b.add(i),this.orchardGroup.add(b),this.sceneryGroup.add(this.orchardGroup);let y=[15680580,16436245,16777215,11032055,3718648];for(let h=0;h<96;h++){let m=h%2===0?-1.85:1.85,l=0.35+h%6*0.18,d=h*1.35,v=m+Math.cos(d)*l,u=Math.sin(d)*l;if(this.getApproxDistanceToTrack(v,u)<0.42)continue;let r=y[h%y.length],g=new QJ({color:r}),t=new S(new YJ(0.016,6,6),g);t.position.set(v,0.04,u),this.sceneryGroup.add(t)}}buildArticulatedTrain(){let J=new G0,$=new c({color:10033947,roughness:0.35}),Q=new S(new J0(0.38,0.04,0.18),$);Q.position.y=0.05,Q.castShadow=!0,J.add(Q);let Z=new S(new FJ(0.1,0.08,4),new c({color:12131356}));Z.rotation.y=Math.PI*0.25,Z.rotation.x=-Math.PI*0.5,Z.position.set(0.2,0.045,0),Z.castShadow=!0,J.add(Z);let K=new c({color:292951,roughness:0.25,metalness:0.12}),W=new S(new k0(0.075,0.075,0.22,16),K);W.rotation.z=Math.PI*0.5,W.position.set(0.07,0.125,0),W.castShadow=!0,J.add(W);let Y=new S(new YJ(0.074,12,12),K);Y.position.set(0.18,0.125,0),Y.castShadow=!0,J.add(Y);let X=new c({color:16096779,metalness:0.8,roughness:0.25});[-0.01,0.06,0.14].forEach(($0)=>{let E0=new S(new l8(0.076,0.006,8,16),X);E0.rotation.y=Math.PI*0.5,E0.position.set($0,0.125,0),J.add(E0)});let H=new c({color:1976635,roughness:0.4}),q=new S(new k0(0.024,0.018,0.08,8),H);q.position.set(0.13,0.22,0),q.castShadow=!0,J.add(q);let U=new S(new l8(0.024,0.005,6,12),X);U.rotation.x=Math.PI*0.5,U.position.set(0.13,0.26,0),J.add(U);let V=new S(new YJ(0.032,10,10),X);V.position.set(0.02,0.21,0),V.castShadow=!0,J.add(V);let F=new c({color:417606,roughness:0.3}),G=new S(new J0(0.16,0.16,0.176),F);G.position.set(-0.1,0.15,0),G.castShadow=!0,J.add(G);let N=new S(new J0(0.18,0.025,0.19),X);N.position.set(-0.1,0.24,0),N.castShadow=!0,J.add(N);let E=new QJ({color:16707722}),O=new S(new eJ(0.06,0.06),E);O.position.set(-0.1,0.16,0.089),J.add(O);let D=new S(new eJ(0.06,0.06),E);D.rotation.y=Math.PI,D.position.set(-0.1,0.16,-0.089),J.add(D);let R=new S(new k0(0.034,0.028,0.044,16),X);R.rotation.z=Math.PI*0.5,R.position.set(0.2,0.14,0),R.castShadow=!0,J.add(R);let B=new S(new l8(0.034,0.005,8,16),X);B.rotation.y=Math.PI*0.5,B.position.set(0.222,0.14,0),J.add(B);let z=new c({color:16777215,metalness:0.95,roughness:0.08}),C=new S(new FJ(0.028,0.022,16,1,!0),z);C.rotation.z=-Math.PI*0.5,C.position.set(0.21,0.14,0),J.add(C);let L=new c({color:16776171,emissive:16707722,emissiveIntensity:3.2,roughness:0.1}),A=new S(new YJ(0.013,8,8),L);A.position.set(0.218,0.14,0),J.add(A);let w=new c({color:16772565,emissive:16707722,emissiveIntensity:1.5,roughness:0.1,metalness:0.2,transparent:!0,opacity:0.85}),I=new S(new YJ(0.031,12,12,0,Math.PI*2,0,Math.PI*0.5),w);I.rotation.z=-Math.PI*0.5,I.position.set(0.222,0.14,0),J.add(I),this.headlampLight=new yJ(16707722,1.8,1.2),this.headlampLight.position.set(0.26,0.14,0),J.add(this.headlampLight),this.headlampSpotLight=new vZ(16775149,2.2,2,Math.PI*0.16,0.85,1.4),this.headlampSpotLight.position.set(0.23,0.14,0);let k=new EJ;k.position.set(0.85,0.04,0),J.add(k),this.headlampSpotLight.target=k,J.add(this.headlampSpotLight);let b=new k0(0.024,0.09,0.46,24,1,!0);b.translate(0,-0.23,0),b.rotateZ(Math.PI*0.5),b.rotateY(-0.06);let n=new QJ({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.32,blending:C9,side:S8,depthWrite:!1});this.headlampBeam=new S(b,n),this.headlampBeam.position.set(0.22,0.14,0),this.headlampBeam.visible=!1,J.add(this.headlampBeam);let i=new k0(0.012,0.042,0.28,16,1,!0);i.translate(0,-0.14,0),i.rotateZ(Math.PI*0.5),i.rotateY(-0.06);let y=new QJ({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.38,blending:C9,side:S8,depthWrite:!1});this.headlampCoreBeam=new S(i,y),this.headlampCoreBeam.position.set(0.22,0.14,0),this.headlampCoreBeam.visible=!1,J.add(this.headlampCoreBeam);let h=new QJ({map:this.createHeadlampPoolTexture(),transparent:!0,opacity:0.45,blending:C9,depthWrite:!1});this.headlampTrackPool=new S(new eJ(0.24,0.44),h),this.headlampTrackPool.rotation.x=-Math.PI*0.5,this.headlampTrackPool.rotation.z=-Math.PI*0.5,this.headlampTrackPool.position.set(0.4,0.058,0),this.headlampTrackPool.visible=!1,J.add(this.headlampTrackPool);let m=new c({color:16096779,metalness:0.85,roughness:0.2}),l=new S(new k0(0.032,0.038,0.045,12),m);l.position.set(0.04,0.175,0),l.castShadow=!0,J.add(l);let d=new S(new k0(0.006,0.006,0.035,6),m);d.position.set(-0.03,0.19,0.03),J.add(d);let v=new c({color:988970,roughness:0.45,metalness:0.4}),u=new S(new k0(0.072,0.072,0.012,16),v);u.rotation.z=Math.PI*0.5,u.position.set(0.186,0.125,0),u.castShadow=!0,J.add(u);let r=new S(new k0(0.024,0.024,0.006,12),m);r.rotation.z=Math.PI*0.5,r.position.set(0.193,0.125,0),J.add(r);let g=new c({color:1976635,roughness:0.35,metalness:0.7});[-0.102,0.102].forEach(($0)=>{let E0=new S(new k0(0.026,0.026,0.088,12),g);E0.rotation.z=Math.PI*0.5,E0.position.set(0.09,0.045,$0),E0.castShadow=!0,J.add(E0);let C0=new S(new k0(0.01,0.01,0.05,8),m);C0.rotation.z=Math.PI*0.5,C0.position.set(0.035,0.045,$0),J.add(C0)});let t=new QJ({color:16347926}),Q0=new S(new J0(0.045,0.05,0.01),t);Q0.position.set(-0.02,0.1,0),J.add(Q0);let F0=new yJ(16347926,0.8,0.6);F0.position.set(-0.04,0.12,0),J.add(F0);let R0=new c({color:1976635,metalness:0.8,roughness:0.4}),x0=new S(new J0(0.04,0.016,0.024),R0);x0.position.set(-0.19,0.048,0),J.add(x0),this.attachWheels(J,[[0.08,0.045,0.09],[-0.08,0.045,0.09],[0.08,0.045,-0.09],[-0.08,0.045,-0.09]],0.045);let u0=new c({color:13948120,metalness:0.85,roughness:0.2}),w0=new J0(0.18,0.01,0.006);this.leftSideRod=new S(w0,u0),this.leftSideRod.position.set(0,0.045,0.104),this.leftSideRod.castShadow=!0,J.add(this.leftSideRod),this.rightSideRod=new S(w0,u0),this.rightSideRod.position.set(0,0.045,-0.104),this.rightSideRod.castShadow=!0,J.add(this.rightSideRod),this.locoCar=J,this.trainGroup.add(this.locoCar);let f0=new G0,x=new c({color:3359061,roughness:0.5}),D0=new S(new J0(0.24,0.11,0.17),x);D0.position.y=0.095,D0.castShadow=!0,f0.add(D0);let X0=new c({color:988970,roughness:0.9}),W0=new S(new wJ(0.08,1),X0);W0.position.set(0,0.14,0),W0.scale.set(1.2,0.6,0.85),W0.castShadow=!0,f0.add(W0);let K0=new S(new J0(0.04,0.016,0.024),R0);K0.position.set(0.13,0.048,0),f0.add(K0);let z0=new S(new J0(0.04,0.016,0.024),R0);z0.position.set(-0.13,0.048,0),f0.add(z0),this.attachWheels(f0,[[0.065,0.038,0.088],[-0.065,0.038,0.088],[0.065,0.038,-0.088],[-0.065,0.038,-0.088]],0.038),this.tenderCar=f0,this.trainGroup.add(this.tenderCar);let N0=new G0,S0=new c({color:14251782,roughness:0.3}),_=new S(new J0(0.36,0.14,0.176),S0);_.position.y=0.11,_.castShadow=!0,N0.add(_);let M=new c({color:16777215,roughness:0.3}),s=new S(new J0(0.38,0.028,0.19),M);s.position.y=0.19,s.castShadow=!0,N0.add(s);let q0=new S(new J0(0.3,0.022,0.11),M);q0.position.y=0.21,q0.castShadow=!0,N0.add(q0);let Z0=new c({color:1976635,metalness:0.8,roughness:0.4});[-0.19,0.19].forEach(($0)=>{let E0=new S(new J0(0.04,0.012,0.15),Z0);E0.position.set($0,0.046,0),N0.add(E0);let C0=new S(new J0(0.01,0.045,0.15),Z0);C0.position.set($0,0.072,0),N0.add(C0)}),this.coachWindowMat=new c({color:16707722,emissive:0,emissiveIntensity:0,roughness:0.1}),[-0.1,0,0.1].forEach(($0)=>{let E0=new S(new eJ(0.055,0.055),this.coachWindowMat);E0.position.set($0,0.125,0.089),N0.add(E0);let C0=new S(new eJ(0.055,0.055),this.coachWindowMat);C0.rotation.y=Math.PI,C0.position.set($0,0.125,-0.089),N0.add(C0)}),this.coachInteriorLight1=new yJ(16707722,0,1.2),this.coachInteriorLight1.position.set(-0.06,0.125,0),N0.add(this.coachInteriorLight1),this.coachInteriorLight2=new yJ(16707722,0,1.2),this.coachInteriorLight2.position.set(0.06,0.125,0),N0.add(this.coachInteriorLight2);let U0=new S(new J0(0.04,0.016,0.024),R0);U0.position.set(0.19,0.048,0),N0.add(U0);let y0=new S(new J0(0.04,0.016,0.024),R0);y0.position.set(-0.19,0.048,0),N0.add(y0),this.attachWheels(N0,[[0.1,0.038,0.088],[-0.1,0.038,0.088],[0.1,0.038,-0.088],[-0.1,0.038,-0.088]],0.038),this.coachCar=N0,this.trainGroup.add(this.coachCar);let V0=new G0,A0=new c({color:12456508,roughness:0.35}),T0=new S(new J0(0.3,0.13,0.176),A0);T0.position.y=0.105,T0.castShadow=!0,V0.add(T0);let h0=new S(new J0(0.12,0.07,0.14),A0);h0.position.set(-0.02,0.2,0),h0.castShadow=!0,V0.add(h0);let Y0=new S(new J0(0.14,0.018,0.16),M);Y0.position.set(-0.02,0.245,0),V0.add(Y0);let OJ=new QJ({color:16707722});[-0.072,0.072].forEach(($0)=>{let E0=new S(new eJ(0.06,0.035),OJ);if(E0.position.set(-0.02,0.2,$0),$0<0)E0.rotation.y=Math.PI;V0.add(E0)});let l0=new S(new J0(0.05,0.012,0.15),R0);l0.position.set(-0.175,0.046,0),V0.add(l0);let v0=new S(new J0(0.01,0.045,0.15),m);v0.position.set(-0.195,0.072,0),V0.add(v0);let M0=new S(new J0(0.04,0.016,0.024),R0);M0.position.set(0.16,0.048,0),V0.add(M0);let j=new S(new YJ(0.024,8,8),new QJ({color:15680580}));j.position.set(-0.16,0.12,0),V0.add(j),this.tailLight=new yJ(15680580,0.8,1.2),this.tailLight.position.set(-0.2,0.12,0),V0.add(this.tailLight),this.attachWheels(V0,[[0.08,0.038,0.088],[-0.08,0.038,0.088],[0.08,0.038,-0.088],[-0.08,0.038,-0.088]],0.038),this.cabooseCar=V0,this.trainGroup.add(this.cabooseCar);for(let $0=0;$0<16;$0++){let E0=new S(new wJ(0.036+$0%3*0.014,1),new c({color:16777215,roughness:0.1,transparent:!0,opacity:0,depthWrite:!1}));E0.visible=!1,E0.position.set(0,-100,0),this.rootGroup.add(E0),this.steamParticles.push({mesh:E0,life:0,vx:0,vy:0,vz:0})}}attachWheels(J,$,Q){let Z=new c({color:1976635,metalness:0.75,roughness:0.25}),K=new c({color:14251782,metalness:0.85,roughness:0.25}),W=new c({color:14251782,metalness:0.55,roughness:0.35}),Y=new k0(Q,Q,0.018,20);Y.rotateX(Math.PI*0.5);let X=new k0(Q*0.36,Q*0.36,0.024,12);X.rotateX(Math.PI*0.5);let H=new J0(Q*1.6,Q*0.2,0.02),q=new J0(Q*0.2,Q*1.6,0.02);$.forEach(([U,V,F])=>{let G=new S(Y,Z);G.position.set(U,V,F),G.castShadow=!0;let N=new S(X,K);G.add(N);let E=new S(H,W);G.add(E);let O=new S(q,W);G.add(O),J.add(G),this.rotatingWheels.push(G)})}buildAlpineMountainRidge(){let J=new G0,$=new c({color:4674921,roughness:0.88,flatShading:!0}),Q=new c({color:16317180,roughness:0.35,emissive:16777215,emissiveIntensity:0.08,flatShading:!0}),Z=new c({color:1332013,roughness:0.65}),K=new c({color:4528643,roughness:0.8}),W=new c({color:3359061,roughness:0.9,flatShading:!0}),Y=new c({color:6583435,roughness:0.82,flatShading:!0}),X=-1.35,H=-2.95,q=1.6,U=2.75,V=0.96,F=8;Q.polygonOffset=!0,Q.polygonOffsetFactor=-1,Q.polygonOffsetUnits=-1;let G=new S(new FJ(1.6,2.75,8,1),$);G.position.set(-1.35,1.155,-2.95),G.rotation.y=0.4,G.receiveShadow=!0,G.castShadow=!0,J.add(G);let N=new S(new FJ(0.5864727272727274,0.96,8,1),Q);N.position.set(-1.35,2.06,-2.95),N.rotation.y=G.rotation.y,N.receiveShadow=!0,J.add(N),[{x:-2.8,z:-2.3,s:0.18},{x:-2.3,z:-2,s:0.22},{x:-1.1,z:-2.1,s:0.16},{x:0.4,z:-2.4,s:0.2},{x:-0.1,z:-2.5,s:0.15}].forEach((D)=>{let R=new S(new wJ(D.s,0),Y);R.position.set(D.x,0.08,D.z),R.rotation.set(0.4,0.7,0.2),R.castShadow=!0,R.receiveShadow=!0,J.add(R)}),[[-2.9,-2.4],[-2.5,-2.2],[-2.1,-2.1],[-1.4,-2.3],[-0.8,-2.2],[-0.2,-2.4],[0.3,-2.6],[-3.1,-3],[-2.6,-3.4],[-1,-3.3],[0.6,-3.2]].forEach(([D,R],B)=>{let z=new G0;z.position.set(D,0,R);let C=0.75+B%3*0.18;z.scale.setScalar(C);let L=new S(new k0(0.02,0.03,0.14,5),K);L.position.y=0.07,z.add(L);let A=new S(new FJ(0.14,0.24,6),Z);A.position.y=0.22,A.castShadow=!0,z.add(A);let w=new S(new FJ(0.1,0.18,6),Z);w.position.y=0.33,z.add(w),J.add(z)}),this.alpineRidgeGroup=J,this.sceneryGroup.add(this.alpineRidgeGroup)}buildCampsiteAndCampfire(){let J=new G0;J.position.set(-1.3,0.04,-2.1);let $=new G0;$.position.set(-0.16,0,0.08),$.rotation.y=0.42;let Q=new c({color:16096779,roughness:0.6,side:S8}),Z=new k0(0.11,0.11,0.24,3,1,!1),K=new S(Z,Q);K.rotation.z=Math.PI*0.5,K.rotation.y=Math.PI*0.5,K.position.y=0.08,K.castShadow=!0,$.add(K);let W=new QJ({color:4528643}),Y=new S(new n7(0.05,3),W);Y.position.set(0,0.055,0.121),$.add(Y),J.add($);let X=new G0;X.position.set(0.15,0,0.1),X.rotation.y=-0.65;let H=new c({color:1981066,roughness:0.6,side:S8}),q=new S(Z,H);q.rotation.z=Math.PI*0.5,q.rotation.y=Math.PI*0.5,q.position.y=0.08,q.castShadow=!0,X.add(q),J.add(X);let U=new G0;U.position.set(0,0,-0.1);let V=new c({color:7893356,roughness:0.8});for(let z=0;z<8;z++){let C=z/8*Math.PI*2,L=new S(new wJ(0.035,1),V);L.position.set(Math.cos(C)*0.14,0.02,Math.sin(C)*0.14),U.add(L)}let F=new c({color:7877903,roughness:0.85});for(let z=0;z<3;z++){let C=new S(new k0(0.02,0.022,0.2,6),F);C.rotation.z=Math.PI*0.5,C.rotation.y=z*Math.PI/3,C.position.y=0.025,U.add(C)}let G=new QJ({color:16347926}),N=new S(new FJ(0.07,0.18,7),G);N.position.y=0.1,U.add(N),this.campfireFlame=N;let E=new QJ({color:16707722}),O=new S(new FJ(0.035,0.11,7),E);O.position.y=0.08,U.add(O),this.campfireLight=new yJ(16347926,1.4,1.8),this.campfireLight.position.set(0,0.18,0),U.add(this.campfireLight);let D=20,R=new GJ;this.campfireParticlePos=new Float32Array(D*3);for(let z=0;z<D;z++)this.campfireParticlePos[z*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[z*3+1]=0.06+Math.random()*0.22,this.campfireParticlePos[z*3+2]=(Math.random()-0.5)*0.12;R.setAttribute("position",new vJ(this.campfireParticlePos,3));let B=new M9({color:16498468,size:0.03,transparent:!0,blending:C9,opacity:0.85});this.campfireParticles=new U7(R,B),U.add(this.campfireParticles),J.add(U),this.campsiteGroup=J,this.sceneryGroup.add(this.campsiteGroup)}buildRailwayWaterTower(){let J=new G0;J.position.set(1.65,0.04,-2.35);let $=new c({color:7877903,roughness:0.75}),Q=new c({color:9584654,roughness:0.65}),Z=new c({color:1976635,roughness:0.4,metalness:0.7}),K=new c({color:11817737,roughness:0.6}),W=0.48,Y=0.04,X=0.22;[[-X,-X],[X,-X],[-X,X],[X,X]].forEach(([L,A])=>{let w=new S(new J0(Y,W,Y),$);w.position.set(L,W*0.5,A),w.castShadow=!0,J.add(w)});let H=new S(new J0(X*2+0.12,0.04,X*2+0.12),$);H.position.y=W,H.castShadow=!0,J.add(H);let q=0.42,U=0.28,V=new S(new k0(U,U,q,16),Q);V.position.y=W+q*0.5+0.02,V.castShadow=!0,J.add(V),[-0.14,0,0.14].forEach((L)=>{let A=new S(new l8(U+0.006,0.009,6,20),Z);A.rotation.x=Math.PI*0.5,A.position.y=V.position.y+L,J.add(A)});let F=new S(new FJ(U+0.06,0.22,16),K);F.position.y=V.position.y+q*0.5+0.11,F.castShadow=!0,J.add(F);let G=new S(new YJ(0.03,8,8),Z);G.position.y=F.position.y+0.13,J.add(G);let N=new G0;N.position.set(-0.28,W+0.24,0),N.rotation.y=-Math.PI*0.5,N.rotation.x=0.25;let E=new c({color:3359061,roughness:0.5,metalness:0.4}),O=new S(new k0(0.035,0.055,0.32,12),E);O.rotation.x=Math.PI*0.5,O.position.z=0.16,N.add(O);let D=new S(new YJ(0.04,8,8),Z);D.position.set(0,0.12,0.05),N.add(D),J.add(N),this.waterTowerSpout=N;let R=35,B=new GJ,z=new Float32Array(R*3);for(let L=0;L<R;L++)z[L*3]=(Math.random()-0.5)*0.06,z[L*3+1]=-Math.random()*0.35,z[L*3+2]=0.3+(Math.random()-0.5)*0.06;B.setAttribute("position",new vJ(z,3));let C=new M9({color:3718648,size:0.035,transparent:!0,opacity:0.75});this.waterSprayPoints=new U7(B,C),this.waterSprayPoints.position.copy(N.position),this.waterSprayPoints.visible=!1,J.add(this.waterSprayPoints),this.waterTowerGroup=J,this.sceneryGroup.add(this.waterTowerGroup)}buildRailwayServiceDepot(){let J=new G0;J.position.set(1.7,0.04,-2.1);let $=new c({color:6583435,roughness:0.8}),Q=new c({color:4528643,roughness:0.7}),Z=new c({color:4674921,metalness:0.8,roughness:0.35}),K=new c({color:1976635,metalness:0.9,roughness:0.25}),W=new c({color:592399,roughness:0.95}),Y=new c({color:165063,metalness:0.7,roughness:0.3}),X=new G0,H=new S(new J0(0.38,0.03,0.28),$);H.position.y=0.015,X.add(H),[-0.16,0.16].forEach((D)=>{[-0.12,0.12].forEach((R)=>{let B=new S(new J0(0.02,0.18,0.02),Q);B.position.set(D,0.1,R),B.castShadow=!0,X.add(B)})});let q=new S(new J0(0.42,0.016,0.16),Z);q.position.set(0,0.23,-0.06),q.rotation.x=0.45,q.castShadow=!0,X.add(q);let U=new S(new J0(0.42,0.016,0.16),Z);U.position.set(0,0.23,0.06),U.rotation.x=-0.45,U.castShadow=!0,X.add(U);let V=new S(new J0(0.34,0.16,0.015),Q);V.position.set(0,0.1,-0.12),X.add(V);let F=new S(new J0(0.18,0.07,0.06),Q);F.position.set(0,0.045,-0.08),F.castShadow=!0,X.add(F);let G=new S(new J0(0.05,0.025,0.03),K);G.position.set(0.04,0.09,-0.08),X.add(G),J.add(X);let N=new G0;N.position.set(-0.28,0,0.05);let E=new S(new J0(0.18,0.09,0.16),Q);E.position.y=0.045,E.castShadow=!0,N.add(E);let O=new S(new wJ(0.07,1),W);O.position.set(0,0.08,0),O.scale.set(1.1,0.6,0.9),O.castShadow=!0,N.add(O),J.add(N),[[-0.24,0,-0.1],[-0.29,0,-0.08]].forEach(([D,R,B])=>{let z=new S(new k0(0.026,0.026,0.08,10),Y);z.position.set(D,0.04,B),z.castShadow=!0,J.add(z)}),this.depotShedGroup=J,this.sceneryGroup.add(this.depotShedGroup)}buildHotAirBalloon(){let J=new G0;J.position.set(1.6,2.7,0.6);let $=new c({color:14753096,roughness:0.45}),Q=new c({color:16498468,roughness:0.45}),Z=new c({color:889992,roughness:0.45}),K=new YJ(0.42,24,16,0,Math.PI*2,0,Math.PI*0.65),W=new S(K,$);J.add(W);let Y=new l8(0.4,0.03,8,24),X=new S(Y,Q);X.rotation.x=Math.PI*0.5,X.position.y=-0.05,J.add(X);let H=new k0(0.39,0.16,0.34,24,1,!0),q=new S(H,Z);q.position.y=-0.22,J.add(q);let U=new c({color:4674921,metalness:0.8,roughness:0.3}),V=new S(new l8(0.08,0.015,6,16),U);V.rotation.x=Math.PI*0.5,V.position.y=-0.42,J.add(V);let F=new QJ({color:16347926}),G=new S(new FJ(0.06,0.14,8),F);G.position.y=-0.4,J.add(G),this.balloonBurnerFlame=G,this.balloonBurnerLight=new yJ(16347926,0.5,2.2),this.balloonBurnerLight.position.y=-0.4,J.add(this.balloonBurnerLight);let N=new c7({color:7877903}),E=[new T(-0.15,-0.38,-0.15),new T(-0.08,-0.62,-0.08),new T(0.15,-0.38,-0.15),new T(0.08,-0.62,-0.08),new T(-0.15,-0.38,0.15),new T(-0.08,-0.62,0.08),new T(0.15,-0.38,0.15),new T(0.08,-0.62,0.08)],O=new GJ().setFromPoints(E),D=new WQ(O,N);J.add(D);let R=new c({color:14251782,roughness:0.85}),B=new S(new J0(0.18,0.14,0.18),R);B.position.y=-0.69,B.castShadow=!0,J.add(B),this.hotAirBalloonGroup=J,this.celestialGroup.add(this.hotAirBalloonGroup)}buildMiniatureVillageLife(){let J=new G0,$=new c({color:7877903,roughness:0.75}),Q=new c({color:9741240,roughness:0.85}),Z=new G0;Z.position.set(0.1,0.04,1.38),Z.rotation.y=0.35;let K=new S(new J0(0.14,0.012,0.045),$);K.position.y=0.038,K.castShadow=!0,Z.add(K);let W=new S(new J0(0.14,0.045,0.01),$);W.position.set(0,0.065,-0.02),W.castShadow=!0,Z.add(W),[-0.055,0.055].forEach((L)=>{let A=new S(new J0(0.012,0.038,0.04),Q);A.position.set(L,0.019,0),Z.add(A)}),J.add(Z);let Y=new c({color:1976635,roughness:0.6,metalness:0.8}),X=new c({color:16707722,emissive:16498468,emissiveIntensity:0.85,roughness:0.2});[[-0.26,0.04,1.38],[0.26,0.04,1.38]].forEach(([L,A,w])=>{let I=new G0;I.position.set(L,A,w);let k=new S(new k0(0.01,0.014,0.26,8),Y);k.position.y=0.13,k.castShadow=!0,I.add(k);let b=new S(new wJ(0.024,0),X);b.position.y=0.27,I.add(b),J.add(I)});let q=new c({color:15680580,roughness:0.5}),U=new c({color:16436245,roughness:0.5}),V=new c({color:6333946,roughness:0.5}),F=new c({color:12616956,roughness:0.5}),G=new c({color:1409085,roughness:0.8}),N=[[-0.75,0.3],[-0.82,0.35],[-0.7,0.25],[-0.62,0.32],[0.68,0.25],[0.74,0.32],[0.62,0.2],[0.8,0.22],[-0.45,-0.45],[-0.5,-0.4],[-0.38,-0.48]],E=[q,U,V,F];N.forEach(([L,A],w)=>{if(this.getApproxDistanceToTrack(L,A)<0.45)return;let I=new S(new k0(0.003,0.004,0.04,4),G);I.position.set(L,0.06,A),J.add(I);let k=E[w%E.length],b=new S(new wJ(0.014,0),k);b.position.set(L,0.082,A),J.add(b)});let O=[16638023,3718648,16486972,12616956];[new T(-0.72,0.14,0.3),new T(0.7,0.15,0.26),new T(-0.45,0.12,-0.42),new T(-1.1,0.16,0.25)].forEach((L,A)=>{let w=new G0;w.position.copy(L);let I=new QJ({color:O[A%O.length],side:S8}),k=new eJ(0.016,0.024),b=new S(k,I);b.position.x=-0.009,b.rotation.y=Math.PI*0.5,w.add(b);let n=new S(k,I);n.position.x=0.009,n.rotation.y=-Math.PI*0.5,w.add(n),J.add(w),this.butterflies.push({mesh:w,basePos:L.clone(),phase:A*1.5,speed:0.8+A*0.2})});let R=new G0;R.position.set(-0.16,0.09,1.25);let B=new S(new J0(0.065,0.038,0.04),$);B.position.set(0,0.019,0),B.castShadow=!0,R.add(B);let z=new S(new J0(0.05,0.032,0.032),new c({color:10105874,roughness:0.7}));z.position.set(0.005,0.052,0),z.rotation.y=0.15,z.castShadow=!0,R.add(z);let C=new c({color:9741240,roughness:0.35,metalness:0.6});[-0.05,0.06].forEach((L)=>{let A=new S(new k0(0.014,0.016,0.045,8),C);A.position.set(L,0.022,0.03),A.castShadow=!0,R.add(A)}),J.add(R),this.sceneryGroup.add(J)}setupWeatherSystem(){this.rainPositions=new Float32Array(this.rainCount*6),this.rainGeo=new GJ;let J=0.18;for(let K=0;K<this.rainCount;K++){let W=(Math.random()-0.5)*5.5,Y=Math.random()*3.5,X=(Math.random()-0.5)*4.5;this.rainPositions[K*6]=W,this.rainPositions[K*6+1]=Y,this.rainPositions[K*6+2]=X,this.rainPositions[K*6+3]=W-0.02,this.rainPositions[K*6+4]=Y-J,this.rainPositions[K*6+5]=X-0.01}this.rainGeo.setAttribute("position",new vJ(this.rainPositions,3));let $=new c7({color:9684477,transparent:!0,opacity:0});this.rainStreaks=new WQ(this.rainGeo,$),this.weatherGroup.add(this.rainStreaks);let Q=new QJ({color:12248829,transparent:!0,opacity:0,side:S8}),Z=new i7(0.01,0.02,12);Z.rotateX(-Math.PI*0.5);for(let K=0;K<20;K++){let W=new S(Z,Q.clone());W.position.set(0,-10,0),this.weatherGroup.add(W),this.splashRipples.push({mesh:W,life:0,maxRadius:0.12})}}setWeather(J){if(this.isRaining=J==="rain",this.rainStreaks){let $=this.isRaining?0.65:0;_0.to(this.rainStreaks.material,{opacity:$,duration:0.8})}this.audio.setRain(this.isRaining)}triggerSplash(J,$,Q){let Z=this.splashRipples.find((K)=>K.life<=0);if(!Z)return;Z.mesh.position.set(J,$+0.005,Q),Z.mesh.scale.setScalar(0.2),Z.mesh.material.opacity=0.6,Z.life=1}bindEvents(){window.addEventListener("resize",()=>{let J=this.container.clientWidth,$=this.container.clientHeight;if(J===0||$===0)return;this.camera.aspect=J/$,this.camera.updateProjectionMatrix(),this.renderer.setSize(J,$)}),this.container.addEventListener("pointerdown",(J)=>{let $=this.container.getBoundingClientRect();if(this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera),this.raycaster.intersectObjects([this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],!0).length>0){this.triggerWhistleHop();return}if(this.clockTowerGroup){if(this.raycaster.intersectObject(this.clockTowerGroup,!0).length>0){this.triggerClockBell();return}}let Z=this.raycaster.intersectObjects(this.interactiveTrees,!0);if(Z.length>0){let X=Z[0].object;while(X&&!this.interactiveTrees.includes(X))X=X.parent;if(X){this.triggerTreeWobble(X);return}}if(this.mooredBoat){if(this.raycaster.intersectObject(this.mooredBoat,!0).length>0){this.triggerBoatRock();return}}let K=this.raycaster.intersectObjects(this.interactiveSheep,!0);if(K.length>0){let X=K[0].object;while(X&&!this.interactiveSheep.includes(X))X=X.parent;if(X){this.triggerSheepHop(X);return}}if(this.raycaster.intersectObjects(this.viaductLanterns,!0).length>0){this.triggerLanternSpark();return}let Y=this.raycaster.intersectObjects(this.interactivePoles,!0);if(Y.length>0){let X=Y[0].object;while(X&&!this.interactivePoles.includes(X))X=X.parent;if(X){this.triggerTelegraphPing(X);return}}if(this.windmillGroup){if(this.raycaster.intersectObject(this.windmillGroup,!0).length>0){this.triggerWindmillSpin();return}}if(this.watermillGroup){if(this.raycaster.intersectObject(this.watermillGroup,!0).length>0){this.triggerWaterwheelSpin();return}}if(this.semaphoreGroup){if(this.raycaster.intersectObject(this.semaphoreGroup,!0).length>0){this.triggerSemaphoreToggle();return}}if(this.cottageGroup){if(this.raycaster.intersectObject(this.cottageGroup,!0).length>0){this.triggerCottageChimney();return}}if(this.campsiteGroup){if(this.raycaster.intersectObject(this.campsiteGroup,!0).length>0){this.triggerCampfirePop();return}}if(this.waterTowerGroup){if(this.raycaster.intersectObject(this.waterTowerGroup,!0).length>0){this.triggerWaterTowerSpray();return}}if(this.hotAirBalloonGroup){if(this.raycaster.intersectObject(this.hotAirBalloonGroup,!0).length>0){this.triggerBalloonBurner();return}}if(this.townFountainGroup){if(this.raycaster.intersectObject(this.townFountainGroup,!0).length>0){this.triggerFountainSurge();return}}if(this.farmBarnGroup){if(this.raycaster.intersectObject(this.farmBarnGroup,!0).length>0){this.triggerBarnBoop();return}}if(this.beehiveGroup){if(this.raycaster.intersectObject(this.beehiveGroup,!0).length>0){this.triggerBeehiveBoop();return}}if(this.waterMesh){let X=this.raycaster.intersectObject(this.waterMesh,!0);if(X.length>0){let H=X[0].point;this.triggerSplash(H.x,H.y,H.z),this.audio.playWaterDrop()}}}),this.controls.addEventListener("start",()=>{if(this.currentViewMode!=="isometric"&&this.currentViewMode!=="top")this.currentViewMode="isometric",this.updateActiveViewPill("isometric")}),this.container.addEventListener("pointermove",(J)=>{let $=this.container.getBoundingClientRect();this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera);let Q=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar,...this.clockTowerGroup?[this.clockTowerGroup]:[],...this.interactiveTrees,...this.mooredBoat?[this.mooredBoat]:[],...this.interactiveSheep,...this.viaductLanterns,...this.windmillGroup?[this.windmillGroup]:[],...this.watermillGroup?[this.watermillGroup]:[],...this.cottageGroup?[this.cottageGroup]:[],...this.semaphoreGroup?[this.semaphoreGroup]:[],...this.campsiteGroup?[this.campsiteGroup]:[],...this.waterTowerGroup?[this.waterTowerGroup]:[],...this.hotAirBalloonGroup?[this.hotAirBalloonGroup]:[],...this.townFountainGroup?[this.townFountainGroup]:[],...this.farmBarnGroup?[this.farmBarnGroup]:[],...this.beehiveGroup?[this.beehiveGroup]:[]];if(this.raycaster.intersectObjects(Q,!0).length>0)this.container.style.cursor="pointer";else{if(this.waterMesh){let K=this.raycaster.intersectObject(this.waterMesh,!0);if(K.length>0){this.container.style.cursor="cell";let W=performance.now();if(W-this.lastHoverRippleTime>160){this.lastHoverRippleTime=W;let Y=K[0].point;this.triggerSplash(Y.x,0.034,Y.z)}return}}this.container.style.cursor="grab"}}),window.addEventListener("keydown",(J)=>{if(J.target instanceof HTMLInputElement||J.target instanceof HTMLTextAreaElement)return;if(J.code==="Space")J.preventDefault(),this.triggerWhistleHop();else if(J.code==="KeyR"){let $=!this.isRaining;this.setWeather($?"rain":"fair"),document.querySelectorAll("[data-weather]").forEach((Q)=>{Q.classList.toggle("active",Q.getAttribute("data-weather")===($?"rain":"fair"))})}else if(J.code==="KeyT")if(document.documentElement.getAttribute("data-theme")!=="dark")document.documentElement.setAttribute("data-theme","dark"),this.audio.playChime(523.25,0.08),this.setNightMode(!0);else document.documentElement.removeAttribute("data-theme"),this.audio.playMorningBirdSong(),this.setNightMode(!1);else if(J.code==="Digit1")this.setViewMode("isometric"),this.updateActiveViewPill("isometric");else if(J.code==="Digit2")this.setViewMode("top"),this.updateActiveViewPill("top");else if(J.code==="Digit3")this.setViewMode("engine"),this.updateActiveViewPill("engine");else if(J.code==="Digit4")this.setViewMode("director"),this.updateActiveViewPill("director");else if(J.code==="Digit5")this.setViewMode("trackside"),this.updateActiveViewPill("trackside");else if(J.code==="ArrowUp")this.setSpeed(Math.min(3.6,this.speedMultiplier+0.5));else if(J.code==="ArrowDown")this.setSpeed(Math.max(0.5,this.speedMultiplier-0.5))})}updateActiveViewPill(J){document.querySelectorAll("[data-view]").forEach(($)=>{let Q=$.getAttribute("data-view"),Z=Q===J||J==="engine"&&Q==="cinematic"||J==="cinematic"&&Q==="engine";$.classList.toggle("active",Z)})}triggerBoatRock(){if(!this.mooredBoat)return;this.audio.playBoatSlosh(),_0.killTweensOf(this.mooredBoat.rotation),_0.to(this.mooredBoat.rotation,{z:0.18,duration:0.22,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{if(this.mooredBoat)_0.to(this.mooredBoat.rotation,{z:0,duration:0.3})}});let J=this.mooredBoat.position;this.triggerSplash(J.x,0.034,J.z)}triggerSheepHop(J){this.audio.playSheepBleat();let $=J.position.y;_0.to(J.position,{y:$+0.18,duration:0.22,yoyo:!0,repeat:1,ease:"power2.out",onComplete:()=>{J.position.y=$}}),_0.to(J.rotation,{y:"+="+Math.PI*2,duration:0.44,ease:"back.out(1.5)"}),_0.to(J.scale,{x:1.25,y:0.82,z:1.25,duration:0.12,yoyo:!0,repeat:1})}triggerBeehiveBoop(){if(!this.beehiveGroup)return;this.audio.playChime(783.99,0.08),_0.killTweensOf(this.beehiveGroup.scale),_0.to(this.beehiveGroup.scale,{x:1.25,y:0.85,z:1.25,duration:0.12,yoyo:!0,repeat:3,ease:"power1.inOut",onComplete:()=>{if(this.beehiveGroup)this.beehiveGroup.scale.set(1,1,1)}})}triggerCampfirePop(){if(this.audio.playCampfirePop(),this.campfireLight){let J=this.campfireLight.intensity;_0.to(this.campfireLight,{intensity:3.6,duration:0.12,yoyo:!0,repeat:3,ease:"power1.inOut",onComplete:()=>{if(this.campfireLight)this.campfireLight.intensity=J}})}if(this.campfireFlame)_0.to(this.campfireFlame.scale,{x:1.5,y:1.8,z:1.5,duration:0.2,yoyo:!0,repeat:1,ease:"power2.out"})}triggerWaterTowerSpray(){if(this.isWaterTowerSpraying||!this.waterTowerSpout)return;this.isWaterTowerSpraying=!0,this.audio.playWaterTowerSpray(),_0.to(this.waterTowerSpout.rotation,{x:0.82,duration:0.35,ease:"back.out(1.4)",onComplete:()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!0;setTimeout(()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!1;if(this.waterTowerSpout)_0.to(this.waterTowerSpout.rotation,{x:0.25,duration:0.45,ease:"bounce.out",onComplete:()=>{this.isWaterTowerSpraying=!1}})},500)}})}triggerBalloonBurner(){if(this.audio.playBalloonBurner(),this.balloonBurnerLight)_0.to(this.balloonBurnerLight,{intensity:3.2,duration:0.2,yoyo:!0,repeat:1});if(this.balloonBurnerFlame)_0.to(this.balloonBurnerFlame.scale,{x:2.2,y:2.5,z:2.2,duration:0.2,yoyo:!0,repeat:1});if(this.hotAirBalloonGroup)_0.to(this.hotAirBalloonGroup.position,{y:"+=0.28",duration:0.45,yoyo:!0,repeat:1,ease:"power1.out"})}triggerFountainSurge(){if(!this.townFountainJet)return;this.audio.playChime(659.25,0.08),this.audio.playWaterDrop(),_0.killTweensOf(this.townFountainJet.scale),_0.to(this.townFountainJet.scale,{x:1.8,y:2.2,z:1.8,duration:0.35,yoyo:!0,repeat:1,ease:"power2.out"})}triggerBarnBoop(){if(!this.farmBarnGroup)return;this.audio.playChime(523.25,0.08),_0.killTweensOf(this.farmBarnGroup.scale),_0.to(this.farmBarnGroup.scale,{x:1.08,y:1.12,z:1.08,duration:0.25,yoyo:!0,repeat:1,ease:"back.out(2)"})}triggerLanternSpark(){this.audio.playLanternSpark(),this.viaductLanternLights.forEach((J)=>{let $=J.intensity;_0.to(J,{intensity:3.5,duration:0.1,yoyo:!0,repeat:1,onComplete:()=>{J.intensity=$}})})}triggerWhistleHop(){this.audio.playWhistle(),[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar].forEach(($,Q)=>{_0.to($.position,{y:"+=0.16",duration:0.16,delay:Q*0.04,yoyo:!0,repeat:1,ease:"power2.out"}),_0.to($.scale,{y:1.18,x:0.92,z:0.92,duration:0.16,delay:Q*0.04,yoyo:!0,repeat:1,ease:"power2.out"})});for(let $=0;$<5;$++)setTimeout(()=>this.spawnSteamPuff(1.4),$*50)}triggerClockBell(){if(this.audio.playBoardingBell(),setTimeout(()=>this.audio.playStationClock(),200),this.clockTowerGroup)_0.to(this.clockTowerGroup.scale,{y:1.15,x:0.92,z:0.92,duration:0.15,yoyo:!0,repeat:1,ease:"power2.out"});if(this.clockHand)_0.to(this.clockHand.rotation,{z:"-="+Math.PI*4,duration:0.8,ease:"power2.out"})}triggerTelegraphPing(J){this.audio.playTelegraphPing(),_0.to(J.rotation,{z:0.12,duration:0.1,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{_0.to(J.rotation,{z:0,duration:0.15})}})}triggerTreeWobble(J){this.audio.playRustle(),_0.to(J.rotation,{z:0.16,duration:0.12,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{_0.to(J.rotation,{z:0,duration:0.2})}})}spawnSteamPuff(J=1){let $=this.steamParticles.find((K)=>K.life<=0);if(!$)return;let Q=new T(0.13,0.26,0);this.locoCar.localToWorld(Q),this.rootGroup.worldToLocal(Q),$.mesh.position.copy(Q),$.mesh.scale.setScalar(0.7*J),$.mesh.visible=!0,$.life=1;let Z=this.trackCurve.getTangentAt(this.progress).normalize();$.vx=-Z.x*0.012*this.speedMultiplier+(Math.random()-0.5)*0.004,$.vy=0.014+Math.random()*0.007,$.vz=-Z.z*0.012*this.speedMultiplier+(Math.random()-0.5)*0.004}isTrainInTunnel(){let J=(this.progress+1)%1;return J<0.045||J>0.955}setSpeed(J){if(this.speedMultiplier=J,this.audio.playSpeedWhoosh(J),J>=3)this.triggerWhistleHop();if(this.currentViewMode==="engine"||this.currentViewMode==="cinematic"){let $=J>=3?64:J>=2?54:48;_0.to(this.camera,{fov:$,duration:0.45,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()})}}setViewMode(J){if(this.currentViewMode=J,this.controls.enabled=J==="isometric"||J==="top",this.controls.autoRotate=!1,J==="engine"||J==="cinematic"){this.camera.near=0.02,this.camera.updateProjectionMatrix();let $=this.speedMultiplier>=3?64:this.speedMultiplier>=2?54:48;_0.to(this.camera,{fov:$,duration:0.8,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()});let Q=new T(-0.88,0.46,0.22),Z=this.locoCar.localToWorld(Q.clone()),K=new T(0.68,0.16,0),W=this.locoCar.localToWorld(K.clone());if(_0.killTweensOf(this.camera.position),_0.killTweensOf(this.controls.target),this.camera.position.copy(Z),this.camera.lookAt(W),this.controls.target.copy(W),this.isNightMode){if(this.headlampBeam)this.headlampBeam.visible=!0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0}if(this.headlampTrackPool)this.headlampTrackPool.visible=!0;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.4;this.audio.playWhistle()}else{if(this.camera.near=0.1,this.camera.updateProjectionMatrix(),this.engineBankRoll=0,this.camera.up.set(0,1,0),this.camera.fov!==38)_0.to(this.camera,{fov:38,duration:0.8,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()});if(this.isNightMode){if(this.headlampBeam)this.headlampBeam.visible=!0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0}else{if(this.headlampBeam)this.headlampBeam.visible=!1;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}}if(J==="top")this.controls.enabled=!1,_0.to(this.controls.target,{x:0,y:0,z:0,duration:0.85,ease:"power2.inOut"}),_0.to(this.camera.position,{x:0.01,y:7.2,z:0.01,duration:0.85,ease:"power2.inOut",onComplete:()=>{this.controls.enabled=!0,this.controls.update()}});else if(J==="isometric")this.controls.enabled=!1,_0.to(this.controls.target,{x:0,y:0.4,z:-0.75,duration:0.85,ease:"power2.inOut"}),_0.to(this.camera.position,{x:5.8,y:5.4,z:6,duration:0.85,ease:"power2.inOut",onComplete:()=>{this.controls.enabled=!0,this.controls.update()}});else if(J==="director")this.directorShotIndex=0,this.directorTimer=0,this.directorNeedsCut=!0}setNightMode(J,$=!1){if(this.isNightMode=J,$){if(J){if(this.ambientLight)this.ambientLight.color.set(1579035),this.ambientLight.intensity=0.65;if(this.hemiLight)this.hemiLight.color.set(2565930),this.hemiLight.groundColor.set(592396),this.hemiLight.intensity=0.35;if(this.sunLight)this.sunLight.position.set(6.5,0.25,1.8),this.sunLight.color.set(16317180),this.sunLight.intensity=0.15;if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),this.sunMesh.scale.setScalar(0.001),this.sunCorona)this.sunCorona.material.opacity=0}if(this.moonLight)this.moonLight.intensity=1.45;if(this.moonMesh){if(this.moonMesh.position.set(-2.4,2.8,-2.4),this.moonMesh.scale.set(1,1,1),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0.85}if(this.starsPoints)this.starsPoints.material.opacity=0.85;if(this.headlampLight)this.headlampLight.intensity=1.8;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.2;if(this.headlampBeam)this.headlampBeam.visible=!0,this.headlampBeam.material.opacity=0.32;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,this.headlampCoreBeam.material.opacity=0.38;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,this.headlampTrackPool.material.opacity=0.45;if(this.coachWindowMat)this.coachWindowMat.emissive.set(16498468),this.coachWindowMat.emissiveIntensity=1.8;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=1.2;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=1.2;if(this.tailLight)this.tailLight.intensity=1.8;if(this.lanternLight)this.lanternLight.intensity=2.2;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Z)=>Z.intensity=1.4);if(this.tunnelLight)this.tunnelLight.intensity=0.9;if(this.windmillLight)this.windmillLight.intensity=0.85;if(this.watermillLight)this.watermillLight.intensity=0.85;if(this.cottageLight)this.cottageLight.intensity=1.1;this.fireflies.forEach((Z)=>{Z.mesh.visible=!0,Z.mesh.material.opacity=0.85}),this.audio.setNightAmbience(!0)}else{if(this.ambientLight)this.ambientLight.color.set(16777215),this.ambientLight.intensity=2.1;if(this.hemiLight)this.hemiLight.color.set(16776171),this.hemiLight.groundColor.set(14870768),this.hemiLight.intensity=1.2;if(this.sunLight)this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.color.set(16776171),this.sunLight.intensity=2.6;if(this.sunMesh){if(this.sunMesh.position.set(1.3,2.1,-1.8),this.sunMesh.scale.set(1,1,1),this.sunCorona)this.sunCorona.material.opacity=0.22}if(this.moonLight)this.moonLight.intensity=0;if(this.moonMesh){if(this.moonMesh.position.set(-2.4,-0.7,-2.4),this.moonMesh.scale.setScalar(0.001),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0}if(this.starsPoints)this.starsPoints.material.opacity=0;if(this.headlampLight)this.headlampLight.intensity=0.6;if(this.headlampSpotLight)this.headlampSpotLight.intensity=0;if(this.headlampBeam)this.headlampBeam.visible=!1,this.headlampBeam.material.opacity=0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1,this.headlampCoreBeam.material.opacity=0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1,this.headlampTrackPool.material.opacity=0;if(this.coachWindowMat)this.coachWindowMat.emissive.set(0),this.coachWindowMat.emissiveIntensity=0;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=0;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=0;if(this.tailLight)this.tailLight.intensity=0.8;if(this.lanternLight)this.lanternLight.intensity=0.8;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Z)=>Z.intensity=0);if(this.tunnelLight)this.tunnelLight.intensity=0.2;if(this.windmillLight)this.windmillLight.intensity=0;if(this.watermillLight)this.watermillLight.intensity=0;if(this.cottageLight)this.cottageLight.intensity=0;this.fireflies.forEach((Z)=>{Z.mesh.visible=!1,Z.mesh.material.opacity=0}),this.audio.setNightAmbience(!1)}return}let Q=1.6;if(J){let Z=_0.timeline();if(this.sunLight){Z.to(this.sunLight.position,{x:6.5,y:0.25,z:1.8,duration:Q,ease:"power2.inOut"},0);let K={r:1,g:0.98,b:0.92};Z.to(K,{r:0.92,g:0.35,b:0.05,duration:Q*0.5,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},0),Z.to(K,{r:0.97,g:0.98,b:0.98,duration:Q*0.5,ease:"power1.in",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},Q*0.5),Z.to(this.sunLight,{intensity:0.15,duration:Q,ease:"power2.inOut"},0)}if(this.sunMesh){if(Z.to(this.sunMesh.position,{x:4.5,y:-0.8,z:2,duration:Q,ease:"power2.in"},0),Z.to(this.sunMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Q*0.8},Q*0.2),this.sunCorona)Z.to(this.sunCorona.material,{opacity:0,duration:Q*0.7},Q*0.2)}if(this.ambientLight){let K={r:1,g:1,b:1};Z.to(K,{r:0.98,g:0.57,b:0.24,duration:Q*0.45,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},0),Z.to(K,{r:0.1,g:0.1,b:0.11,duration:Q*0.55,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Q*0.45),Z.to(this.ambientLight,{intensity:0.65,duration:Q},0)}if(this.hemiLight)Z.to(this.hemiLight,{intensity:0.35,duration:Q},0);if(this.moonMesh){if(this.moonMesh.position.set(-2.4,-0.7,-2.4),Z.to(this.moonMesh.position,{y:2.8,duration:Q,ease:"power2.out"},Q*0.2),Z.to(this.moonMesh.scale,{x:1,y:1,z:1,duration:Q,ease:"back.out(1.2)"},Q*0.2),this.moonMesh.children[0])Z.to(this.moonMesh.children[0].material,{opacity:0.85,duration:Q*0.8},Q*0.3)}if(this.moonLight)Z.to(this.moonLight,{intensity:1.45,duration:Q},Q*0.3);if(this.starsPoints)Z.to(this.starsPoints.material,{opacity:0.85,duration:Q*0.8},Q*0.3);if(this.headlampLight)Z.to(this.headlampLight,{intensity:1.8,duration:Q*0.7},Q*0.3);if(this.headlampSpotLight)Z.to(this.headlampSpotLight,{intensity:2.2,duration:Q*0.7},Q*0.3);if(this.headlampBeam)this.headlampBeam.visible=!0,Z.to(this.headlampBeam.material,{opacity:0.32,duration:Q*0.7},Q*0.3);if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,Z.to(this.headlampCoreBeam.material,{opacity:0.38,duration:Q*0.7},Q*0.3);if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,Z.to(this.headlampTrackPool.material,{opacity:0.45,duration:Q*0.7},Q*0.3);if(this.coachWindowMat)Z.to(this.coachWindowMat.emissive,{r:0.98,g:0.75,b:0.14,duration:Q*0.7},Q*0.3),Z.to(this.coachWindowMat,{emissiveIntensity:1.8,duration:Q*0.7},Q*0.3);if(this.coachInteriorLight1)Z.to(this.coachInteriorLight1,{intensity:1.2,duration:Q*0.7},Q*0.3);if(this.coachInteriorLight2)Z.to(this.coachInteriorLight2,{intensity:1.2,duration:Q*0.7},Q*0.3);if(this.tailLight)Z.to(this.tailLight,{intensity:1.8,duration:Q*0.7},Q*0.3);if(this.lanternLight)Z.to(this.lanternLight,{intensity:2.2,duration:Q*0.7},Q*0.3);if(this.viaductLanternLights.forEach((K)=>{Z.to(K,{intensity:1.4,duration:Q*0.7},Q*0.3)}),this.tunnelLight)Z.to(this.tunnelLight,{intensity:0.9,duration:Q*0.7},Q*0.3);if(this.windmillLight)Z.to(this.windmillLight,{intensity:0.85,duration:Q*0.7},Q*0.3);if(this.watermillLight)Z.to(this.watermillLight,{intensity:0.85,duration:Q*0.7},Q*0.3);if(this.cottageLight)Z.to(this.cottageLight,{intensity:1.1,duration:Q*0.7},Q*0.3);this.fireflies.forEach((K)=>{K.mesh.visible=!0,Z.to(K.mesh.material,{opacity:0.85,duration:Q*0.7},Q*0.3)}),this.audio.setNightAmbience(!0)}else{let Z=_0.timeline();if(this.moonMesh){if(Z.to(this.moonMesh.position,{y:-0.7,duration:Q*0.7,ease:"power2.in"},0),Z.to(this.moonMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Q*0.7},0),this.moonMesh.children[0])Z.to(this.moonMesh.children[0].material,{opacity:0,duration:Q*0.5},0)}if(this.moonLight)Z.to(this.moonLight,{intensity:0,duration:Q*0.6},0);if(this.starsPoints)Z.to(this.starsPoints.material,{opacity:0,duration:Q*0.6},0);if(this.headlampLight)Z.to(this.headlampLight,{intensity:0.6,duration:Q*0.6},0);if(this.headlampSpotLight)Z.to(this.headlampSpotLight,{intensity:0,duration:Q*0.6},0);if(this.headlampBeam)Z.to(this.headlampBeam.material,{opacity:0,duration:Q*0.5,onComplete:()=>{if(this.headlampBeam)this.headlampBeam.visible=!1}},0);if(this.headlampCoreBeam)Z.to(this.headlampCoreBeam.material,{opacity:0,duration:Q*0.5,onComplete:()=>{if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1}},0);if(this.headlampTrackPool)Z.to(this.headlampTrackPool.material,{opacity:0,duration:Q*0.5,onComplete:()=>{if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}},0);if(this.coachWindowMat)Z.to(this.coachWindowMat.emissive,{r:0,g:0,b:0,duration:Q*0.6},0),Z.to(this.coachWindowMat,{emissiveIntensity:0,duration:Q*0.6},0);if(this.coachInteriorLight1)Z.to(this.coachInteriorLight1,{intensity:0,duration:Q*0.6},0);if(this.coachInteriorLight2)Z.to(this.coachInteriorLight2,{intensity:0,duration:Q*0.6},0);if(this.tailLight)Z.to(this.tailLight,{intensity:0.8,duration:Q*0.6},0);if(this.lanternLight)Z.to(this.lanternLight,{intensity:0.8,duration:Q*0.6},0);if(this.viaductLanternLights.forEach((K)=>{Z.to(K,{intensity:0,duration:Q*0.5},0)}),this.tunnelLight)Z.to(this.tunnelLight,{intensity:0.2,duration:Q*0.5},0);if(this.windmillLight)Z.to(this.windmillLight,{intensity:0,duration:Q*0.5},0);if(this.watermillLight)Z.to(this.watermillLight,{intensity:0,duration:Q*0.5},0);if(this.cottageLight)Z.to(this.cottageLight,{intensity:0,duration:Q*0.5},0);if(this.fireflies.forEach((K)=>{Z.to(K.mesh.material,{opacity:0,duration:Q*0.5,onComplete:()=>{K.mesh.visible=!1}},0)}),this.audio.setNightAmbience(!1),this.sunLight){this.sunLight.position.set(6.5,0.25,1.8),Z.to(this.sunLight.position,{x:5.5,y:7.5,z:4.2,duration:Q,ease:"power2.out"},Q*0.15);let K={r:0.96,g:0.45,b:0.15};this.sunLight.color.setRGB(K.r,K.g,K.b),Z.to(K,{r:1,g:0.98,b:0.92,duration:Q*0.85,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},Q*0.15),Z.to(this.sunLight,{intensity:2.6,duration:Q},Q*0.1)}if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),Z.to(this.sunMesh.position,{x:1.3,y:2.1,z:-1.8,duration:Q,ease:"power2.out"},Q*0.15),Z.to(this.sunMesh.scale,{x:1,y:1,z:1,duration:Q,ease:"back.out(1.2)"},Q*0.2),this.sunCorona)Z.to(this.sunCorona.material,{opacity:0.22,duration:Q*0.8},Q*0.25)}if(this.ambientLight){let K={r:0.12,g:0.16,b:0.23};Z.to(K,{r:0.99,g:0.9,b:0.65,duration:Q*0.4,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Q*0.1),Z.to(K,{r:1,g:1,b:1,duration:Q*0.5,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Q*0.5),Z.to(this.ambientLight,{intensity:2.1,duration:Q},Q*0.1)}if(this.hemiLight)Z.to(this.hemiLight,{intensity:1.2,duration:Q},Q*0.1)}}animate=()=>{if(this.isDestroyed)return;this.progress=(this.progress+this.trainSpeed*this.speedMultiplier)%1;let J=[0,-0.022,-0.044,-0.066],$=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],Q=new T(0,1,0);$.forEach((F,G)=>{let N=(this.progress+J[G]+1)%1,E=this.trackCurve.getPointAt(N),O=this.trackCurve.getTangentAt(N).normalize(),D=new T().crossVectors(O,Q).normalize(),R=new T().crossVectors(D,O).normalize(),B=new UJ().makeBasis(O,R,D);F.quaternion.setFromRotationMatrix(B),F.position.copy(E)});let Z=0.08*this.speedMultiplier;if(this.wheelAngle=(this.wheelAngle-Z)%(Math.PI*2),this.rotatingWheels.forEach((F)=>{F.rotation.z-=Z}),this.leftSideRod&&this.rightSideRod){let G=Math.cos(this.wheelAngle)*0.022,N=Math.sin(this.wheelAngle)*0.022;this.leftSideRod.position.set(G,0.045+N,0.104),this.rightSideRod.position.set(G,0.045+N,-0.104)}let K=this.locoCar.position.clone().project(this.camera),W=Math.max(-0.85,Math.min(0.85,K.x)),Y=this.camera.position.distanceTo(this.locoCar.position),X=this.currentViewMode==="engine"||this.currentViewMode==="cinematic",H=X?1.6:Math.max(0.35,Math.min(1.7,5.2/Math.max(1,Y))),q=X?0:W;if(this.railClickAccumulator+=this.trainSpeed*this.speedMultiplier,this.railClickAccumulator>=0.034){this.railClickAccumulator=0;let F=this.isTrainInTunnel();this.audio.playRailClickClack(this.speedMultiplier,F,H,q)}let U=X?16:28;if(this.steamTimer+=this.speedMultiplier,this.steamTimer>=U)this.steamTimer=0,this.spawnSteamPuff(1),this.audio.playSteamChuff(this.isTrainInTunnel(),H,q);if(this.steamParticles.forEach((F)=>{if(F.life>0)F.life-=0.024,F.mesh.position.x+=F.vx,F.mesh.position.y+=F.vy,F.mesh.position.z+=F.vz,F.mesh.scale.multiplyScalar(1.035),F.mesh.visible=!0,F.mesh.material.opacity=Math.max(0,F.life*0.75);else F.mesh.visible=!1,F.mesh.position.set(0,-100,0),F.mesh.material.opacity=0}),this.isRaining&&this.rainPositions&&this.rainGeo){for(let G=0;G<this.rainCount;G++)if(this.rainPositions[G*6+1]-=0.11,this.rainPositions[G*6+4]-=0.11,this.rainPositions[G*6+1]<0.02){let N=(Math.random()-0.5)*5.2,E=3.2+Math.random()*0.5,O=(Math.random()-0.5)*4.2;this.triggerSplash(this.rainPositions[G*6],0.025,this.rainPositions[G*6+2]),this.rainPositions[G*6]=N,this.rainPositions[G*6+1]=E,this.rainPositions[G*6+2]=O,this.rainPositions[G*6+3]=N-0.02,this.rainPositions[G*6+4]=E-0.18,this.rainPositions[G*6+5]=O-0.01}this.rainGeo.attributes.position.needsUpdate=!0}this.splashRipples.forEach((F)=>{if(F.life>0){F.life-=0.045;let G=1-F.life;F.mesh.scale.setScalar(0.2+G*F.maxRadius*8),F.mesh.material.opacity=Math.max(0,F.life*0.5)}else F.mesh.material.opacity=0});let V=Date.now()%800<400;if(this.crossingLamp1&&this.crossingLamp2&&this.crossingLight1&&this.crossingLight2){if(this.crossingLamp1.visible=V,this.crossingLight1.intensity=V?0.9:0,this.crossingLight2.visible=!V,this.crossingLight2.intensity=!V?0.9:0,this.lastBlinkCycle!==V){if(this.lastBlinkCycle=V,V){let F=this.locoCar.position;if(Math.hypot(F.x- -0.45,F.z-0.82)<0.95)this.audio.playCrossingBell()}}}if(this.clockHand)this.clockHand.rotation.z=-Date.now()*0.001;if(this.waterMesh)this.waterMesh.material.opacity=0.86+Math.sin(Date.now()*0.0018)*0.04;if(this.mooredBoat)this.mooredBoat.rotation.z=Math.sin(Date.now()*0.0015)*0.025,this.mooredBoat.position.y=0.038+Math.sin(Date.now()*0.0015)*0.0012;if(this.windmillSails){if(this.windmillSails.rotation.x-=this.windmillCurrentSpeed,this.windmillCurrentSpeed>this.windmillBaseSpeed)this.windmillCurrentSpeed=t$.lerp(this.windmillCurrentSpeed,this.windmillBaseSpeed,0.015)}if(this.waterwheel)this.waterwheel.rotation.x+=0.016*this.speedMultiplier;if(this.townFountainJet)this.townFountainJet.rotation.y+=0.02;if(this.fireflies.length>0){let F=Date.now()*0.001;this.fireflies.forEach((G)=>{if(G.mesh.position.x=G.baseX+Math.sin(F*G.speed+G.phase)*G.radius,G.mesh.position.y=G.baseY+Math.sin(F*G.speed*1.6+G.phase)*0.035,G.mesh.position.z=G.baseZ+Math.cos(F*G.speed*1.1+G.phase)*G.radius,this.isNightMode){G.mesh.visible=!0;let N=0.5+Math.sin(F*3.2+G.phase)*0.45;G.mesh.material.opacity=N}else G.mesh.visible=!1,G.mesh.material.opacity=0})}if(this.campfireParticles&&this.campfireParticlePos){for(let F=0;F<20;F++)if(this.campfireParticlePos[F*3+1]+=0.0025,this.campfireParticlePos[F*3+1]>0.32)this.campfireParticlePos[F*3+1]=0.06,this.campfireParticlePos[F*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[F*3+2]=(Math.random()-0.5)*0.12;this.campfireParticles.geometry.attributes.position.needsUpdate=!0}if(this.hotAirBalloonGroup){let F=Date.now()*0.001;this.hotAirBalloonGroup.position.y=2.7+Math.sin(F*1.2)*0.08,this.hotAirBalloonGroup.rotation.z=Math.sin(F*0.8)*0.04}if(this.butterflies.length>0){let F=Date.now()*0.003;this.butterflies.forEach((G)=>{let N=G.mesh.children[0],E=G.mesh.children[1];if(N&&E){let O=Math.sin(F*9+G.phase)*0.75;N.rotation.z=0.3+O,E.rotation.z=-0.3-O}G.mesh.position.x=G.basePos.x+Math.sin(F*G.speed+G.phase)*0.12,G.mesh.position.y=G.basePos.y+Math.abs(Math.cos(F*G.speed*1.5+G.phase))*0.08,G.mesh.position.z=G.basePos.z+Math.cos(F*G.speed+G.phase)*0.12,G.mesh.rotation.y=Math.sin(F*G.speed+G.phase)*0.8})}if(this.interactiveSheep.length>0){let F=Date.now()*0.002;this.interactiveSheep.forEach((G,N)=>{let E=G.children.find((O)=>O.isMesh&&O.position.y>0.06);if(E)E.rotation.x=Math.sin(F*1.2+N*1.5)*0.12})}if(this.godRaysGroup&&this.godRaysGroup.children.length>0){let F=Date.now()*0.001,G=this.isNightMode?0:0.16;this.godRaysGroup.children.forEach((N,E)=>{let O=N.material;if(O){let D=Math.sin(F*1.1+E*1.3)*0.04;O.opacity=Math.max(0,G+D)}})}if(this.bees.length>0){let F=Date.now()*0.003;this.bees.forEach((G)=>{G.mesh.position.x=G.baseX+Math.sin(F*G.speed+G.phase)*G.radius,G.mesh.position.z=G.baseZ+Math.cos(F*G.speed+G.phase)*G.radius,G.mesh.position.y=G.baseY+Math.sin(F*4+G.phase)*0.02})}if(this.currentViewMode==="director"){let F=performance.now(),G=this.lastAnimTime?(F-this.lastAnimTime)*0.001:0.016;if(this.directorTimer+=G,this.directorTimer>=this.directorShotDuration)this.directorTimer=0,this.directorShotIndex=(this.directorShotIndex+1)%4,this.directorNeedsCut=!0;let N=this.locoCar.position,E=this.trackCurve.getTangentAt(this.progress).normalize(),O,D;if(this.directorShotIndex===0)O=new T(1.15,0.4,1.15),D=N.clone().add(new T(0,0.08,0));else if(this.directorShotIndex===1){if(O=N.clone().sub(E.clone().multiplyScalar(0.72)).add(new T(0,0.38,0)),this.isTrainInTunnel())O.y=Math.max(0.48,O.y);D=N.clone().add(E.clone().multiplyScalar(0.75)).add(new T(0,0.12,0))}else if(this.directorShotIndex===2)O=new T(-0.45,0.28,1.55),D=N.clone().add(new T(0,0.08,0));else{let R=Date.now()*0.00028;O=new T(Math.cos(R)*3.4,2.95,Math.sin(R)*3.4),D=new T(0,0.25,0)}if(this.directorNeedsCut)this.camera.position.copy(O),this.camera.lookAt(D),this.controls.target.copy(D),this.directorNeedsCut=!1;else this.camera.position.lerp(O,0.08),this.camera.lookAt(D),this.controls.target.copy(D)}else if(this.currentViewMode==="cinematic"||this.currentViewMode==="engine"){let F=this.progress,G=(this.progress+0.024)%1,N=this.trackCurve.getTangentAt(F).normalize(),E=this.trackCurve.getTangentAt(G).normalize(),O=N.x*E.z-N.z*E.x,D=2*Math.min(this.speedMultiplier,2.5),R=Math.max(-0.09,Math.min(0.09,-O*D));this.engineBankRoll+=(R-this.engineBankRoll)*0.12;let B=Date.now()*0.028*this.speedMultiplier,z=Math.sin(B)*0.0016+Math.cos(B*0.5)*0.0008,C=Math.sin(B*0.8)*0.0015,L=this.isTrainInTunnel(),A=this.progress>=0.38&&this.progress<=0.62,w=L?-0.16:-0.28,I=(L?0.22:A?0.36:0.32)+z,b=new T(w,I,L?0.04:0.1),n=this.locoCar.localToWorld(b);n.y=Math.max(n.y,0.22);let i=L?0.9:1.05,y=0.12+N.y*0.35,h=new T(i,y,0),m=this.locoCar.localToWorld(h);this.camera.position.lerp(n,0.18),this.camera.up.set(0,1,0),this.camera.lookAt(m);let l=this.engineBankRoll+C;if(Math.abs(l)>0.0005)this.camera.rotateZ(l);this.controls.target.copy(m)}else if(this.currentViewMode==="trackside"){let F=new T(0.55,0.32,1.65);this.camera.position.lerp(F,0.08);let G=this.locoCar.position.clone().add(new T(0,0.1,0));this.camera.lookAt(G),this.controls.target.copy(G)}else if(this.controls.update(),this.currentViewMode==="isometric"){let F=(this.mousePos.x||0)*0.015,G=-(this.mousePos.y||0)*0.015;this.rootGroup.rotation.z+=(F-this.rootGroup.rotation.z)*0.05,this.rootGroup.rotation.x+=(G-this.rootGroup.rotation.x)*0.05}this.lastAnimTime=performance.now(),this.rootGroup.position.y=Math.sin(Date.now()*0.0012)*0.025,this.renderer.render(this.scene,this.camera),this.animFrameId=requestAnimationFrame(this.animate)};destroy(){this.isDestroyed=!0,cancelAnimationFrame(this.animFrameId),this.controls.dispose(),this.renderer.dispose()}}function sW(){let J=new yQ;window.samtagonAudio=J;let $=null;try{$=new h5("three-viewport",J),window.samtagonStage=$}catch(Q){console.warn("Three.js stage init fallback:",Q)}PF($,J),console.log("Samtagon Studios online. Zen mode active.")}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",sW);else sW();function PF(J,$){let Q=localStorage.getItem("samtagon_theme"),Z=new URLSearchParams(window.location.search),K=Z.get("theme"),W=K?K==="dark":Q?Q==="dark":!0,Y=(z,C=!1)=>{if(z)document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("samtagon_theme","dark"),J?.setNightMode(!0,C);else document.documentElement.removeAttribute("data-theme"),localStorage.setItem("samtagon_theme","light"),J?.setNightMode(!1,C)};Y(W,!0),window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change",(z)=>{if(W=z.matches,Y(W,!1),W)$.playChime(523.25,0.08);else $.playMorningBirdSong()}),document.getElementById("theme-toggle-btn")?.addEventListener("click",()=>{if(W=!W,Y(W,!1),W)$.playChime(523.25,0.08);else $.playMorningBirdSong()});let H=document.getElementById("audio-toggle-btn"),q=H?.querySelector(".audio-on-icon"),U=H?.querySelector(".audio-off-icon"),V=(z)=>{if(q&&U)q.style.display=z?"block":"none",U.style.display=z?"none":"block"};H?.addEventListener("click",()=>{let z=$.toggleMute();V(z)}),window.addEventListener("keydown",(z)=>{if(z.code==="KeyM"){let C=$.toggleMute();V(C)}});let F=document.querySelectorAll("[data-view]");F.forEach((z)=>{z.addEventListener("click",()=>{F.forEach((L)=>L.classList.remove("active")),z.classList.add("active");let C=z.dataset.view;J?.setViewMode(C),$.playButtonPress()})});let G=document.querySelectorAll("[data-speed]");G.forEach((z)=>{z.addEventListener("click",()=>{G.forEach((L)=>L.classList.remove("active")),z.classList.add("active");let C=parseFloat(z.dataset.speed||"1");J?.setSpeed(C),$.playButtonPress()})});let N=document.querySelectorAll("[data-weather]");N.forEach((z)=>{z.addEventListener("click",()=>{N.forEach((L)=>L.classList.remove("active")),z.classList.add("active");let C=z.dataset.weather==="rain";J?.setWeather(C?"rain":"fair"),$.playButtonPress()})}),document.getElementById("whistle-btn")?.addEventListener("click",()=>{J?.triggerWhistleHop()}),document.getElementById("play-flagship-btn")?.addEventListener("click",()=>{$.playChime(660,0.1)}),(document.getElementById("game-rec-engine-btn")||document.querySelector('a[href="recommendations.html"]'))?.addEventListener("click",(z)=>{z.preventDefault(),$.playChime(523.25,0.08),setTimeout(()=>$.playChime(659.25,0.12),90);let C=document.querySelector(".zen-page");if(C)_0.to(C,{opacity:0,y:-14,scale:0.985,duration:0.28,ease:"power2.inOut",onComplete:()=>{window.location.href="recommendations.html"}});else window.location.href="recommendations.html"}),document.querySelectorAll(".game-pill").forEach((z,C)=>{let L=[523.25,587.33,659.25,783.99,880,1046.5],A=L[C%L.length];z.addEventListener("mouseenter",()=>{$.playChime(A,0.04)}),z.addEventListener("click",()=>{$.playChime(A*1.5,0.08),J?.triggerWhistleHop()})}),document.querySelector(".zen-brand")?.addEventListener("click",()=>{$.playChime(880,0.12),J?.triggerWhistleHop()});let B=Z.get("view");if(B)F.forEach((z)=>z.classList.toggle("active",z.dataset.view===B)),J?.setViewMode(B);SF()}function SF(){document.querySelectorAll(".zen-btn").forEach((W)=>{let Y=W.querySelector(".btn-arrow-icon"),X=W.querySelector("svg:not(.btn-arrow-icon)");W.addEventListener("mouseenter",()=>{if(_0.to(W,{y:-3,scale:1.025,duration:0.16,ease:"power2.out",overwrite:"auto"}),Y)_0.to(Y,{x:3,y:-3,duration:0.16,ease:"power2.out",overwrite:"auto"});if(X)_0.to(X,{scale:1.15,duration:0.18,ease:"back.out(2)",overwrite:"auto"})}),W.addEventListener("mouseleave",()=>{if(_0.to(W,{y:0,scale:1,duration:0.2,ease:"power2.out",overwrite:"auto"}),Y)_0.to(Y,{x:0,y:0,duration:0.2,ease:"power2.out",overwrite:"auto"});if(X)_0.to(X,{scale:1,rotation:0,duration:0.2,ease:"power2.out",overwrite:"auto"})}),W.addEventListener("mousedown",()=>{_0.to(W,{y:1,scale:0.96,duration:0.08,ease:"power1.in",overwrite:"auto"})}),W.addEventListener("mouseup",()=>{_0.to(W,{y:-3,scale:1.025,duration:0.24,ease:"back.out(2.5)",overwrite:"auto"})})}),document.querySelectorAll(".stage-icon-btn, .stage-speed-btn, .zen-theme-toggle").forEach((W)=>{let Y=W.querySelector("svg");W.addEventListener("mouseenter",()=>{if(_0.to(W,{y:-2,duration:0.14,ease:"power2.out",overwrite:"auto"}),Y)_0.to(Y,{scale:1.15,duration:0.16,ease:"back.out(2)",overwrite:"auto"})}),W.addEventListener("mouseleave",()=>{if(_0.to(W,{y:0,scale:1,duration:0.2,ease:"power2.out",overwrite:"auto"}),Y)_0.to(Y,{scale:1,rotation:0,x:0,y:0,duration:0.2,ease:"power2.out",overwrite:"auto"})}),W.addEventListener("mousedown",()=>{_0.to(W,{scale:0.92,duration:0.08,ease:"power1.in",overwrite:"auto"})}),W.addEventListener("mouseup",()=>{_0.to(W,{scale:1,duration:0.2,ease:"back.out(3)",overwrite:"auto"})})});let Q=document.getElementById("whistle-btn");Q?.addEventListener("click",()=>{let W=Q.querySelector("svg");if(W)_0.fromTo(W,{rotation:-16,scale:1.25},{rotation:16,scale:1.1,duration:0.045,repeat:7,yoyo:!0,ease:"sine.inOut",onComplete:()=>{_0.to(W,{rotation:0,scale:1,duration:0.12})}})});let Z=document.querySelector('[data-view="engine"]');Z?.addEventListener("click",()=>{let W=Z.querySelector("svg");if(W)_0.fromTo(W,{x:-5,scale:1.2},{x:4,duration:0.09,repeat:3,yoyo:!0,ease:"power2.inOut",onComplete:()=>{_0.to(W,{x:0,scale:1,duration:0.12})}})});let K=document.getElementById("theme-toggle-btn");K?.addEventListener("click",()=>{let W=K.querySelector('svg:not([style*="none"])')||K.querySelector("svg");if(W)_0.fromTo(W,{rotation:-180,scale:0.6},{rotation:0,scale:1,duration:0.45,ease:"back.out(2)"})})}
