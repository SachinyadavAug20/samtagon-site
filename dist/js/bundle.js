class BQ{ctx=null;isMuted=!1;masterGain=null;constructor(){let J=()=>{this.initContext(),window.removeEventListener("pointerdown",J),window.removeEventListener("keydown",J),window.removeEventListener("click",J),window.removeEventListener("touchstart",J)};window.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("keydown",J,{passive:!0}),window.addEventListener("click",J,{passive:!0}),window.addEventListener("touchstart",J,{passive:!0})}initContext(){if(!this.ctx){let J=window.AudioContext||window.webkitAudioContext;this.ctx=new J,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.isMuted?0:0.48,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination)}if(this.ctx.state==="suspended")this.ctx.resume()}toggleMute(){if(this.initContext(),this.isMuted=!this.isMuted,this.masterGain&&this.ctx){let J=this.isMuted?0:0.48;this.masterGain.gain.setTargetAtTime(J,this.ctx.currentTime,0.05)}if(!this.isMuted)this.playChime(523.25,0.1),setTimeout(()=>this.playChime(659.25,0.15),100);return!this.isMuted}getStatus(){return!this.isMuted}playChime(J=880,$=0.12){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Q=this.ctx.createOscillator(),Z=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(J,this.ctx.currentTime),Q.frequency.exponentialRampToValueAtTime(J*1.5,this.ctx.currentTime+$),Z.gain.setValueAtTime(0.25,this.ctx.currentTime),Z.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+$),Q.connect(Z),Z.connect(this.masterGain),Q.start(),Q.stop(this.ctx.currentTime+$)}catch{}}playVVVFWhine(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain();J.type="triangle";let Q=this.ctx.currentTime;J.frequency.setValueAtTime(220,Q),J.frequency.exponentialRampToValueAtTime(880,Q+0.35),$.gain.setValueAtTime(0.2,Q),$.gain.exponentialRampToValueAtTime(0.01,Q+0.4),J.connect($),$.connect(this.masterGain),J.start(Q),J.stop(Q+0.4)}catch{}}playSignalClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Q=this.ctx.currentTime;J.type="square",J.frequency.setValueAtTime(320,Q),J.frequency.setValueAtTime(160,Q+0.03),$.gain.setValueAtTime(0.15,Q),$.gain.exponentialRampToValueAtTime(0.001,Q+0.06),J.connect($),$.connect(this.masterGain),J.start(Q),J.stop(Q+0.06)}catch{}}playButtonPress(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createGain(),Q=this.ctx.currentTime;J.type="sine",J.frequency.setValueAtTime(440,Q),J.frequency.exponentialRampToValueAtTime(880,Q+0.05),$.gain.setValueAtTime(0.18,Q),$.gain.exponentialRampToValueAtTime(0.001,Q+0.05),J.connect($),$.connect(this.masterGain),J.start(Q),J.stop(Q+0.05)}catch{}}playBoardingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.createOscillator(),$=this.ctx.createOscillator(),Q=this.ctx.createGain(),Z=this.ctx.currentTime;J.type="sine",$.type="triangle",J.frequency.setValueAtTime(1046.5,Z),$.frequency.setValueAtTime(1318.51,Z),Q.gain.setValueAtTime(0.2,Z),Q.gain.exponentialRampToValueAtTime(0.001,Z+0.2),J.connect(Q),$.connect(Q),Q.connect(this.masterGain),J.start(Z),$.start(Z),J.stop(Z+0.2),$.stop(Z+0.2)}catch{}}playWhistle(){if(this.initContext(),this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=[587.33,783.99,987.77,1174.66];[{time:J,dur:0.16},{time:J+0.2,dur:0.42}].forEach(({time:Z,dur:K})=>{$.forEach((W,X)=>{if(!this.ctx||!this.masterGain)return;let Y=this.ctx.createOscillator(),H=this.ctx.createGain();Y.type=X===0?"sine":X===1?"triangle":"sawtooth",Y.frequency.setValueAtTime(W*0.985,Z),Y.frequency.linearRampToValueAtTime(W,Z+0.04),H.gain.setValueAtTime(0.001,Z),H.gain.linearRampToValueAtTime(0.32/$.length,Z+0.035),H.gain.exponentialRampToValueAtTime(0.001,Z+K),Y.connect(H),H.connect(this.masterGain),Y.start(Z),Y.stop(Z+K+0.06)})})}catch{}}rainSource=null;rainGain=null;setRain(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{if(J){if(this.rainSource)return;let $=this.ctx.sampleRate*2,Q=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Z=Q.getChannelData(0),K=0,W=0,X=0;for(let U=0;U<$;U++){let F=Math.random()*2-1;K=0.99886*K+F*0.0555179,W=0.99332*W+F*0.0750759,X=0.969*X+F*0.153852,Z[U]=(K+W+X+F*0.5362)*0.04}let Y=this.ctx.createBufferSource();Y.buffer=Q,Y.loop=!0;let H=this.ctx.createBiquadFilter();H.type="lowpass",H.frequency.setValueAtTime(950,this.ctx.currentTime);let q=this.ctx.createGain();q.gain.setValueAtTime(0.001,this.ctx.currentTime),q.gain.linearRampToValueAtTime(0.06,this.ctx.currentTime+1.2),Y.connect(H),H.connect(q),q.connect(this.masterGain),Y.start(),this.rainSource=Y,this.rainGain=q}else if(this.rainSource&&this.rainGain){let $=this.ctx.currentTime;this.rainGain.gain.linearRampToValueAtTime(0.001,$+0.8),setTimeout(()=>{try{this.rainSource?.stop(),this.rainSource?.disconnect(),this.rainSource=null,this.rainGain=null}catch{}},850)}}catch{}}playRustle(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.12),Q.gain.setValueAtTime(0.09,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.12),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.12)}catch{}}playWaterDrop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1200+Math.random()*400,J),$.frequency.exponentialRampToValueAtTime(1800+Math.random()*400,J+0.08),Q.gain.setValueAtTime(0.08,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}playBoatSlosh(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(420,J),$.frequency.exponentialRampToValueAtTime(180,J+0.18),Q.gain.setValueAtTime(0.12,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.18),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.18),setTimeout(()=>this.playWaterDrop(),60)}catch{}}playSheepHop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(659.25,J),$.frequency.linearRampToValueAtTime(880,J+0.08),Q.gain.setValueAtTime(0.15,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playLanternSpark(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1760,J),$.frequency.exponentialRampToValueAtTime(2200,J+0.22),Q.gain.setValueAtTime(0.18,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.22),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.22)}catch{}}playRailClickClack(J=1,$=!1,Q=1,Z=0){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let K=this.ctx.currentTime,X=Math.max(0.02,Math.min(0.65,($?0.22:0.14)*Q)),Y=$?700:1600;this.synthesizeAxleClick(K,1080+Math.random()*80,X,Y,Z),this.synthesizeAxleClick(K+0.045,920+Math.random()*80,X*0.8,Y,Z)}catch{}}synthesizeAxleClick(J,$,Q,Z,K=0){if(!this.ctx||!this.masterGain)return;let W=this.ctx.createOscillator(),X=this.ctx.createGain(),Y=this.ctx.createBiquadFilter();if(Y.type="bandpass",Y.frequency.setValueAtTime(Z,J),Y.Q.setValueAtTime(3.2,J),W.type="triangle",W.frequency.setValueAtTime($,J),W.frequency.exponentialRampToValueAtTime(140,J+0.038),X.gain.setValueAtTime(Q,J),X.gain.exponentialRampToValueAtTime(0.001,J+0.038),W.connect(Y),Y.connect(X),this.ctx.createStereoPanner){let H=this.ctx.createStereoPanner();H.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,K)),J),X.connect(H),H.connect(this.masterGain)}else X.connect(this.masterGain);W.start(J),W.stop(J+0.04)}playSteamChuff(J=!1,$=1,Q=0){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Z=this.ctx.currentTime,K=0.085,W=Math.floor(this.ctx.sampleRate*0.085),X=this.ctx.createBuffer(1,W,this.ctx.sampleRate),Y=X.getChannelData(0);for(let V=0;V<W;V++)Y[V]=(Math.random()*2-1)*Math.exp(-V/(W*0.32));let H=this.ctx.createBufferSource();H.buffer=X;let q=this.ctx.createBiquadFilter();q.type="lowpass",q.frequency.setValueAtTime(J?380:720,Z);let U=J?0.2:0.12,F=this.ctx.createGain();if(F.gain.setValueAtTime(Math.max(0.02,Math.min(0.55,U*$)),Z),F.gain.exponentialRampToValueAtTime(0.001,Z+0.085),H.connect(q),q.connect(F),this.ctx.createStereoPanner){let V=this.ctx.createStereoPanner();V.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,Q)),Z),F.connect(V),V.connect(this.masterGain)}else F.connect(this.masterGain);H.start(Z)}catch{}}playCrossingBell(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(1480,J),$.frequency.exponentialRampToValueAtTime(1470,J+0.16),Q.gain.setValueAtTime(0.08,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.16),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.16)}catch{}}playStationClock(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[440,554.37,659.25].forEach(($,Q)=>{if(!this.ctx||!this.masterGain)return;let Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="sine",Z.frequency.setValueAtTime($,J+Q*0.12),K.gain.setValueAtTime(0.12,J+Q*0.12),K.gain.exponentialRampToValueAtTime(0.001,J+Q*0.12+0.55),Z.connect(K),K.connect(this.masterGain),Z.start(J+Q*0.12),Z.stop(J+Q*0.12+0.6)})}catch{}}playTelegraphPing(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="triangle",$.frequency.setValueAtTime(880,J),$.frequency.exponentialRampToValueAtTime(440,J+0.14),Q.gain.setValueAtTime(0.07,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.14)}catch{}}playSpeedWhoosh(J){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let $=this.ctx.currentTime,Q=this.ctx.createOscillator(),Z=this.ctx.createGain();Q.type="sine",Q.frequency.setValueAtTime(220,$),Q.frequency.exponentialRampToValueAtTime(220*J,$+0.28),Z.gain.setValueAtTime(0.11,$),Z.gain.exponentialRampToValueAtTime(0.001,$+0.28),Q.connect(Z),Z.connect(this.masterGain),Q.start($),Q.stop($+0.3)}catch{}}playWindmillSpin(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[180,240,360].forEach(($,Q)=>{if(!this.ctx||!this.masterGain)return;let Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="triangle",Z.frequency.setValueAtTime($,J+Q*0.05),Z.frequency.exponentialRampToValueAtTime($*1.25,J+Q*0.05+0.22),K.gain.setValueAtTime(0.08,J+Q*0.05),K.gain.exponentialRampToValueAtTime(0.001,J+Q*0.05+0.25),Z.connect(K),K.connect(this.masterGain),Z.start(J+Q*0.05),Z.stop(J+Q*0.05+0.28)})}catch{}}playWaterwheel(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="sine",$.frequency.setValueAtTime(320,J),$.frequency.exponentialRampToValueAtTime(140,J+0.15),Q.gain.setValueAtTime(0.09,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.15),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.16),setTimeout(()=>this.playWaterDrop(),50)}catch{}}playSwitchClick(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(260,J),$.frequency.setValueAtTime(120,J+0.04),Q.gain.setValueAtTime(0.12,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.08),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.08)}catch{}}cricketTimer=null;setNightAmbience(J){if(this.cricketTimer)clearInterval(this.cricketTimer),this.cricketTimer=null;if(!J||this.isMuted||!this.ctx)return;let $=()=>{if(this.isMuted||!this.ctx||!this.masterGain)return;try{let Q=this.ctx.currentTime,Z=2+Math.floor(Math.random()*2);for(let K=0;K<Z;K++){let W=Q+K*0.06,X=this.ctx.createOscillator(),Y=this.ctx.createGain();X.type="sine",X.frequency.setValueAtTime(4600+Math.random()*200,W),Y.gain.setValueAtTime(0.018,W),Y.gain.exponentialRampToValueAtTime(0.0001,W+0.035),X.connect(Y),Y.connect(this.masterGain),X.start(W),X.stop(W+0.04)}}catch{}};$(),this.cricketTimer=window.setInterval($,3200)}playCampfirePop(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;for(let $=0;$<3;$++){let Q=J+$*0.05+Math.random()*0.03,Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.type="triangle",Z.frequency.setValueAtTime(1400+Math.random()*800,Q),Z.frequency.exponentialRampToValueAtTime(120,Q+0.03),K.gain.setValueAtTime(0.06,Q),K.gain.exponentialRampToValueAtTime(0.001,Q+0.035),Z.connect(K),K.connect(this.masterGain),Z.start(Q),Z.stop(Q+0.04)}}catch{}}playWaterTowerSpray(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain();$.type="square",$.frequency.setValueAtTime(180,J),$.frequency.exponentialRampToValueAtTime(60,J+0.12),Q.gain.setValueAtTime(0.14,J),Q.gain.exponentialRampToValueAtTime(0.001,J+0.14),$.connect(Q),Q.connect(this.masterGain),$.start(J),$.stop(J+0.15);let Z=this.ctx.sampleRate*0.35,K=this.ctx.createBuffer(1,Z,this.ctx.sampleRate),W=K.getChannelData(0);for(let q=0;q<Z;q++)W[q]=Math.random()*2-1;let X=this.ctx.createBufferSource();X.buffer=K;let Y=this.ctx.createBiquadFilter();Y.type="bandpass",Y.frequency.setValueAtTime(900,J+0.05),Y.Q.value=1.2;let H=this.ctx.createGain();H.gain.setValueAtTime(0.001,J+0.05),H.gain.linearRampToValueAtTime(0.12,J+0.12),H.gain.exponentialRampToValueAtTime(0.001,J+0.4),X.connect(Y),Y.connect(H),H.connect(this.masterGain),X.start(J+0.05),X.stop(J+0.42)}catch{}}playSheepBleat(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.createOscillator(),Q=this.ctx.createGain(),Z=this.ctx.createOscillator(),K=this.ctx.createGain();Z.frequency.value=11,K.gain.value=24,Z.connect($.frequency),$.type="sawtooth",$.frequency.setValueAtTime(290,J),$.frequency.exponentialRampToValueAtTime(240,J+0.28);let W=this.ctx.createBiquadFilter();W.type="lowpass",W.frequency.value=850,Q.gain.setValueAtTime(0.001,J),Q.gain.linearRampToValueAtTime(0.09,J+0.04),Q.gain.exponentialRampToValueAtTime(0.001,J+0.32),$.connect(W),W.connect(Q),Q.connect(this.masterGain),Z.start(J),$.start(J),Z.stop(J+0.33),$.stop(J+0.33)}catch{}}playBalloonBurner(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime,$=this.ctx.sampleRate*0.45,Q=this.ctx.createBuffer(1,$,this.ctx.sampleRate),Z=Q.getChannelData(0);for(let Y=0;Y<$;Y++)Z[Y]=Math.random()*2-1;let K=this.ctx.createBufferSource();K.buffer=Q;let W=this.ctx.createBiquadFilter();W.type="lowpass",W.frequency.setValueAtTime(320,J),W.frequency.linearRampToValueAtTime(650,J+0.2),W.frequency.exponentialRampToValueAtTime(220,J+0.45);let X=this.ctx.createGain();X.gain.setValueAtTime(0.01,J),X.gain.linearRampToValueAtTime(0.12,J+0.15),X.gain.exponentialRampToValueAtTime(0.001,J+0.45),K.connect(W),W.connect(X),X.connect(this.masterGain),K.start(J),K.stop(J+0.46)}catch{}}playCathedralChime(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[{f:440,a:0.14,d:1.4},{f:523.25,a:0.1,d:1.1},{f:659.25,a:0.08,d:0.8},{f:880,a:0.05,d:0.5}].forEach(({f:Q,a:Z,d:K})=>{if(!this.ctx||!this.masterGain)return;let W=this.ctx.createOscillator(),X=this.ctx.createGain();W.type="sine",W.frequency.setValueAtTime(Q,J),X.gain.setValueAtTime(Z,J),X.gain.exponentialRampToValueAtTime(0.0005,J+K),W.connect(X),X.connect(this.masterGain),W.start(J),W.stop(J+K)})}catch{}}playMorningBirdSong(){if(this.isMuted||!this.ctx||!this.masterGain)return;try{let J=this.ctx.currentTime;[2800,3400,4200].forEach((Q,Z)=>{if(!this.ctx||!this.masterGain)return;let K=J+Z*0.11,W=this.ctx.createOscillator(),X=this.ctx.createGain();W.type="sine",W.frequency.setValueAtTime(Q,K),W.frequency.exponentialRampToValueAtTime(Q*1.3,K+0.08),X.gain.setValueAtTime(0.04,K),X.gain.exponentialRampToValueAtTime(0.001,K+0.09),W.connect(X),X.connect(this.masterGain),W.start(K),W.stop(K+0.1)})}catch{}}}var BJ={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},zJ={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3};var I6=2;var L6=1,g9=2;var Z7=2;var C6=4;var h7=1000;class m9{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Q=this._listeners;if(Q[J]===void 0)Q[J]=[];if(Q[J].indexOf($)===-1)Q[J].push($)}hasEventListener(J,$){if(this._listeners===void 0)return!1;let Q=this._listeners;return Q[J]!==void 0&&Q[J].indexOf($)!==-1}removeEventListener(J,$){if(this._listeners===void 0)return;let Z=this._listeners[J];if(Z!==void 0){let K=Z.indexOf($);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){if(this._listeners===void 0)return;let Q=this._listeners[J.type];if(Q!==void 0){J.target=this;let Z=Q.slice(0);for(let K=0,W=Z.length;K<W;K++)Z[K].call(this,J);J.target=null}}}var u8=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],C5=1234567,T7=Math.PI/180,$7=180/Math.PI;function v9(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(u8[J&255]+u8[J>>8&255]+u8[J>>16&255]+u8[J>>24&255]+"-"+u8[$&255]+u8[$>>8&255]+"-"+u8[$>>16&15|64]+u8[$>>24&255]+"-"+u8[Q&63|128]+u8[Q>>8&255]+"-"+u8[Q>>16&255]+u8[Q>>24&255]+u8[Z&255]+u8[Z>>8&255]+u8[Z>>16&255]+u8[Z>>24&255]).toLowerCase()}function f8(J,$,Q){return Math.max($,Math.min(Q,J))}function JZ(J,$){return(J%$+$)%$}function _W(J,$,Q,Z,K){return Z+(J-$)*(K-Z)/(Q-$)}function TW(J,$,Q){if(J!==$)return(Q-J)/($-J);else return 0}function j7(J,$,Q){return(1-Q)*J+Q*$}function jW(J,$,Q,Z){return j7(J,$,1-Math.exp(-Q*Z))}function xW(J,$=1){return $-Math.abs(JZ(J,$*2)-$)}function yW(J,$,Q){if(J<=$)return 0;if(J>=Q)return 1;return J=(J-$)/(Q-$),J*J*(3-2*J)}function bW(J,$,Q){if(J<=$)return 0;if(J>=Q)return 1;return J=(J-$)/(Q-$),J*J*J*(J*(J*6-15)+10)}function fW(J,$){return J+Math.floor(Math.random()*($-J+1))}function hW(J,$){return J+Math.random()*($-J)}function vW(J){return J*(0.5-Math.random())}function gW(J){if(J!==void 0)C5=J;let $=C5+=1831565813;return $=Math.imul($^$>>>15,$|1),$^=$+Math.imul($^$>>>7,$|61),(($^$>>>14)>>>0)/4294967296}function mW(J){return J*T7}function uW(J){return J*$7}function oQ(J){return(J&J-1)===0&&J!==0}function dW(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function v$(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function pW(J,$,Q,Z,K){let{cos:W,sin:X}=Math,Y=W(Q/2),H=X(Q/2),q=W(($+Z)/2),U=X(($+Z)/2),F=W(($-Z)/2),V=X(($-Z)/2),G=W((Z-$)/2),N=X((Z-$)/2);switch(K){case"XYX":J.set(Y*U,H*F,H*V,Y*q);break;case"YZY":J.set(H*V,Y*U,H*F,Y*q);break;case"ZXZ":J.set(H*F,H*V,Y*U,Y*q);break;case"XZX":J.set(Y*U,H*N,H*G,Y*q);break;case"YXY":J.set(H*G,Y*U,H*N,Y*q);break;case"ZYZ":J.set(H*N,H*G,Y*U,Y*q);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+K)}}function A9(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function Q8(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var u$={DEG2RAD:T7,RAD2DEG:$7,generateUUID:v9,clamp:f8,euclideanModulo:JZ,mapLinear:_W,inverseLerp:TW,lerp:j7,damp:jW,pingpong:xW,smoothstep:yW,smootherstep:bW,randInt:fW,randFloat:hW,randFloatSpread:vW,seededRandom:gW,degToRad:mW,radToDeg:uW,isPowerOfTwo:oQ,ceilPowerOfTwo:dW,floorPowerOfTwo:v$,setQuaternionFromProperEuler:pW,normalize:Q8,denormalize:A9};class O0{constructor(J=0,$=0){O0.prototype.isVector2=!0,this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Q=this.y,Z=J.elements;return this.x=Z[0]*$+Z[3]*Q+Z[6],this.y=Z[1]*$+Z[4]*Q+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(Math.max(J,Math.min($,Q)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(f8(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y;return $*$+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Q=Math.cos($),Z=Math.sin($),K=this.x-J.x,W=this.y-J.y;return this.x=K*Q-W*Z+J.x,this.y=K*Z+W*Q+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class o0{constructor(J,$,Q,Z,K,W,X,Y,H){if(o0.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,W,X,Y,H)}set(J,$,Q,Z,K,W,X,Y,H){let q=this.elements;return q[0]=J,q[1]=Z,q[2]=X,q[3]=$,q[4]=K,q[5]=Y,q[6]=Q,q[7]=W,q[8]=H,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],this}extractBasis(J,$,Q){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Q.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,W=Q[0],X=Q[3],Y=Q[6],H=Q[1],q=Q[4],U=Q[7],F=Q[2],V=Q[5],G=Q[8],N=Z[0],E=Z[3],O=Z[6],D=Z[1],R=Z[4],B=Z[7],z=Z[2],C=Z[5],L=Z[8];return K[0]=W*N+X*D+Y*z,K[3]=W*E+X*R+Y*C,K[6]=W*O+X*B+Y*L,K[1]=H*N+q*D+U*z,K[4]=H*E+q*R+U*C,K[7]=H*O+q*B+U*L,K[2]=F*N+V*D+G*z,K[5]=F*E+V*R+G*C,K[8]=F*O+V*B+G*L,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],W=J[4],X=J[5],Y=J[6],H=J[7],q=J[8];return $*W*q-$*X*H-Q*K*q+Q*X*Y+Z*K*H-Z*W*Y}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],W=J[4],X=J[5],Y=J[6],H=J[7],q=J[8],U=q*W-X*H,F=X*Y-q*K,V=H*K-W*Y,G=$*U+Q*F+Z*V;if(G===0)return this.set(0,0,0,0,0,0,0,0,0);let N=1/G;return J[0]=U*N,J[1]=(Z*H-q*Q)*N,J[2]=(X*Q-Z*W)*N,J[3]=F*N,J[4]=(q*$-Z*Y)*N,J[5]=(Z*K-X*$)*N,J[6]=V*N,J[7]=(Q*Y-H*$)*N,J[8]=(W*$-Q*K)*N,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Q,Z,K,W,X){let Y=Math.cos(K),H=Math.sin(K);return this.set(Q*Y,Q*H,-Q*(Y*W+H*X)+W+J,-Z*H,Z*Y,-Z*(-H*W+Y*X)+X+$,0,0,1),this}scale(J,$){return this.premultiply(zQ.makeScale(J,$)),this}rotate(J){return this.premultiply(zQ.makeRotation(-J)),this}translate(J,$){return this.premultiply(zQ.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,Q,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<9;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<9;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var zQ=new o0;function A6(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function g$(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function lW(){let J=g$("canvas");return J.style.display="block",J}var A5={};function x7(J){if(J in A5)return;A5[J]=!0,console.warn(J)}var M5=new o0().set(0.8224621,0.177538,0,0.0331941,0.9668058,0,0.0170827,0.0723974,0.9105199),k5=new o0().set(1.2249401,-0.2249404,0,-0.0420569,1.0420571,0,-0.0196376,-0.0786361,1.0982735),X$={["srgb-linear"]:{transfer:"linear",primaries:"rec709",toReference:(J)=>J,fromReference:(J)=>J},["srgb"]:{transfer:"srgb",primaries:"rec709",toReference:(J)=>J.convertSRGBToLinear(),fromReference:(J)=>J.convertLinearToSRGB()},["display-p3-linear"]:{transfer:"linear",primaries:"p3",toReference:(J)=>J.applyMatrix3(k5),fromReference:(J)=>J.applyMatrix3(M5)},["display-p3"]:{transfer:"srgb",primaries:"p3",toReference:(J)=>J.convertSRGBToLinear().applyMatrix3(k5),fromReference:(J)=>J.applyMatrix3(M5).convertLinearToSRGB()}},cW=new Set(["srgb-linear","display-p3-linear"]),K8={enabled:!0,_workingColorSpace:"srgb-linear",get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(J){if(!cW.has(J))throw Error(`Unsupported working color space, "${J}".`);this._workingColorSpace=J},convert:function(J,$,Q){if(this.enabled===!1||$===Q||!$||!Q)return J;let Z=X$[$].toReference,K=X$[Q].fromReference;return K(Z(J))},fromWorkingColorSpace:function(J,$){return this.convert(J,this._workingColorSpace,$)},toWorkingColorSpace:function(J,$){return this.convert(J,$,this._workingColorSpace)},getPrimaries:function(J){return X$[J].primaries},getTransfer:function(J){if(J==="")return"linear";return X$[J].transfer}};function J7(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function IQ(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var xJ;class $Z{static getDataURL(J){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(xJ===void 0)xJ=g$("canvas");xJ.width=J.width,xJ.height=J.height;let Q=xJ.getContext("2d");if(J instanceof ImageData)Q.putImageData(J,0,0);else Q.drawImage(J,0,0,J.width,J.height);$=xJ}if($.width>2048||$.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",J),$.toDataURL("image/jpeg",0.6);else return $.toDataURL("image/png")}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=g$("canvas");$.width=J.width,$.height=J.height;let Q=$.getContext("2d");Q.drawImage(J,0,0,J.width,J.height);let Z=Q.getImageData(0,0,J.width,J.height),K=Z.data;for(let W=0;W<K.length;W++)K[W]=J7(K[W]/255)*255;return Q.putImageData(Z,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Q=0;Q<$.length;Q++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Q]=Math.floor(J7($[Q]/255)*255);else $[Q]=J7($[Q]);return{data:$,width:J.width,height:J.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var nW=0;class QZ{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nW++}),this.uuid=v9(),this.data=J,this.version=0}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Q={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let W=0,X=Z.length;W<X;W++)if(Z[W].isDataTexture)K.push(LQ(Z[W].image));else K.push(LQ(Z[W]))}else K=LQ(Z);Q.url=K}if(!$)J.images[this.uuid]=Q;return Q}}function LQ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return $Z.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var sW=0;class a8 extends m9{constructor(J=a8.DEFAULT_IMAGE,$=a8.DEFAULT_MAPPING,Q=1001,Z=1001,K=1006,W=1008,X=1023,Y=1009,H=a8.DEFAULT_ANISOTROPY,q=""){super();if(this.isTexture=!0,Object.defineProperty(this,"id",{value:sW++}),this.uuid=v9(),this.name="",this.source=new QZ(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Q,this.wrapT=Z,this.magFilter=K,this.minFilter=W,this.anisotropy=H,this.format=X,this.internalFormat=null,this.type=Y,this.offset=new O0(0,0),this.repeat=new O0(1,1),this.center=new O0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new o0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof q==="string")this.colorSpace=q;else x7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=q===3001?"srgb":"";this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(J=null){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Q={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(!$)J.textures[this.uuid]=Q;return Q}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}get encoding(){return x7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace==="srgb"?3001:3000}set encoding(J){x7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=J===3001?"srgb":""}}a8.DEFAULT_IMAGE=null;a8.DEFAULT_MAPPING=300;a8.DEFAULT_ANISOTROPY=1;class O8{constructor(J=0,$=0,Q=0,Z=1){O8.prototype.isVector4=!0,this.x=J,this.y=$,this.z=Q,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Q,Z){return this.x=J,this.y=$,this.z=Q,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=this.w,W=J.elements;return this.x=W[0]*$+W[4]*Q+W[8]*Z+W[12]*K,this.y=W[1]*$+W[5]*Q+W[9]*Z+W[13]*K,this.z=W[2]*$+W[6]*Q+W[10]*Z+W[14]*K,this.w=W[3]*$+W[7]*Q+W[11]*Z+W[15]*K,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Q,Z,K,W=0.01,X=0.1,Y=J.elements,H=Y[0],q=Y[4],U=Y[8],F=Y[1],V=Y[5],G=Y[9],N=Y[2],E=Y[6],O=Y[10];if(Math.abs(q-F)<0.01&&Math.abs(U-N)<0.01&&Math.abs(G-E)<0.01){if(Math.abs(q+F)<0.1&&Math.abs(U+N)<0.1&&Math.abs(G+E)<0.1&&Math.abs(H+V+O-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let R=(H+1)/2,B=(V+1)/2,z=(O+1)/2,C=(q+F)/4,L=(U+N)/4,A=(G+E)/4;if(R>B&&R>z)if(R<0.01)Q=0,Z=0.707106781,K=0.707106781;else Q=Math.sqrt(R),Z=C/Q,K=L/Q;else if(B>z)if(B<0.01)Q=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(B),Q=C/Z,K=A/Z;else if(z<0.01)Q=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(z),Q=L/K,Z=A/K;return this.set(Q,Z,K,$),this}let D=Math.sqrt((E-G)*(E-G)+(U-N)*(U-N)+(F-q)*(F-q));if(Math.abs(D)<0.001)D=1;return this.x=(E-G)/D,this.y=(U-N)/D,this.z=(F-q)/D,this.w=Math.acos((H+V+O-1)/2),this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this.w=Math.max(J.w,Math.min($.w,this.w)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this.w=Math.max(J,Math.min($,this.w)),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(Math.max(J,Math.min($,Q)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this.w=J.w+($.w-J.w)*Q,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class M6 extends m9{constructor(J=1,$=1,Q={}){super();this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=1,this.scissor=new O8(0,0,J,$),this.scissorTest=!1,this.viewport=new O8(0,0,J,$);let Z={width:J,height:$,depth:1};if(Q.encoding!==void 0)x7("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),Q.colorSpace=Q.encoding===3001?"srgb":"";Q=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},Q),this.texture=new a8(Z,Q.mapping,Q.wrapS,Q.wrapT,Q.magFilter,Q.minFilter,Q.format,Q.type,Q.anisotropy,Q.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.internalFormat=Q.internalFormat,this.depthBuffer=Q.depthBuffer,this.stencilBuffer=Q.stencilBuffer,this.depthTexture=Q.depthTexture,this.samples=Q.samples}setSize(J,$,Q=1){if(this.width!==J||this.height!==$||this.depth!==Q)this.width=J,this.height=$,this.depth=Q,this.texture.image.width=J,this.texture.image.height=$,this.texture.image.depth=Q,this.dispose();this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.texture=J.texture.clone(),this.texture.isRenderTargetTexture=!0;let $=Object.assign({},J.texture.image);if(this.texture.source=new QZ($),this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class JJ extends M6{constructor(J=1,$=1,Q={}){super(J,$,Q);this.isWebGLRenderTarget=!0}}class ZZ extends a8{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class k6 extends a8{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class M9{constructor(J=0,$=0,Q=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Q,this._w=Z}static slerpFlat(J,$,Q,Z,K,W,X){let Y=Q[Z+0],H=Q[Z+1],q=Q[Z+2],U=Q[Z+3],F=K[W+0],V=K[W+1],G=K[W+2],N=K[W+3];if(X===0){J[$+0]=Y,J[$+1]=H,J[$+2]=q,J[$+3]=U;return}if(X===1){J[$+0]=F,J[$+1]=V,J[$+2]=G,J[$+3]=N;return}if(U!==N||Y!==F||H!==V||q!==G){let E=1-X,O=Y*F+H*V+q*G+U*N,D=O>=0?1:-1,R=1-O*O;if(R>Number.EPSILON){let z=Math.sqrt(R),C=Math.atan2(z,O*D);E=Math.sin(E*C)/z,X=Math.sin(X*C)/z}let B=X*D;if(Y=Y*E+F*B,H=H*E+V*B,q=q*E+G*B,U=U*E+N*B,E===1-X){let z=1/Math.sqrt(Y*Y+H*H+q*q+U*U);Y*=z,H*=z,q*=z,U*=z}}J[$]=Y,J[$+1]=H,J[$+2]=q,J[$+3]=U}static multiplyQuaternionsFlat(J,$,Q,Z,K,W){let X=Q[Z],Y=Q[Z+1],H=Q[Z+2],q=Q[Z+3],U=K[W],F=K[W+1],V=K[W+2],G=K[W+3];return J[$]=X*G+q*U+Y*V-H*F,J[$+1]=Y*G+q*F+H*U-X*V,J[$+2]=H*G+q*V+X*F-Y*U,J[$+3]=q*G-X*U-Y*F-H*V,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Q,Z){return this._x=J,this._y=$,this._z=Q,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Q,_y:Z,_z:K,_order:W}=J,X=Math.cos,Y=Math.sin,H=X(Q/2),q=X(Z/2),U=X(K/2),F=Y(Q/2),V=Y(Z/2),G=Y(K/2);switch(W){case"XYZ":this._x=F*q*U+H*V*G,this._y=H*V*U-F*q*G,this._z=H*q*G+F*V*U,this._w=H*q*U-F*V*G;break;case"YXZ":this._x=F*q*U+H*V*G,this._y=H*V*U-F*q*G,this._z=H*q*G-F*V*U,this._w=H*q*U+F*V*G;break;case"ZXY":this._x=F*q*U-H*V*G,this._y=H*V*U+F*q*G,this._z=H*q*G+F*V*U,this._w=H*q*U-F*V*G;break;case"ZYX":this._x=F*q*U-H*V*G,this._y=H*V*U+F*q*G,this._z=H*q*G-F*V*U,this._w=H*q*U+F*V*G;break;case"YZX":this._x=F*q*U+H*V*G,this._y=H*V*U+F*q*G,this._z=H*q*G-F*V*U,this._w=H*q*U-F*V*G;break;case"XZY":this._x=F*q*U-H*V*G,this._y=H*V*U-F*q*G,this._z=H*q*G+F*V*U,this._w=H*q*U+F*V*G;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+W)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Q=$/2,Z=Math.sin(Q);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos(Q),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Q=$[0],Z=$[4],K=$[8],W=$[1],X=$[5],Y=$[9],H=$[2],q=$[6],U=$[10],F=Q+X+U;if(F>0){let V=0.5/Math.sqrt(F+1);this._w=0.25/V,this._x=(q-Y)*V,this._y=(K-H)*V,this._z=(W-Z)*V}else if(Q>X&&Q>U){let V=2*Math.sqrt(1+Q-X-U);this._w=(q-Y)/V,this._x=0.25*V,this._y=(Z+W)/V,this._z=(K+H)/V}else if(X>U){let V=2*Math.sqrt(1+X-Q-U);this._w=(K-H)/V,this._x=(Z+W)/V,this._y=0.25*V,this._z=(Y+q)/V}else{let V=2*Math.sqrt(1+U-Q-X);this._w=(W-Z)/V,this._x=(K+H)/V,this._y=(Y+q)/V,this._z=0.25*V}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Q=J.dot($)+1;if(Q<Number.EPSILON)if(Q=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Q;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Q;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Q;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(f8(this.dot(J),-1,1)))}rotateTowards(J,$){let Q=this.angleTo(J);if(Q===0)return this;let Z=Math.min(1,$/Q);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Q,_y:Z,_z:K,_w:W}=J,X=$._x,Y=$._y,H=$._z,q=$._w;return this._x=Q*q+W*X+Z*H-K*Y,this._y=Z*q+W*Y+K*X-Q*H,this._z=K*q+W*H+Q*Y-Z*X,this._w=W*q-Q*X-Z*Y-K*H,this._onChangeCallback(),this}slerp(J,$){if($===0)return this;if($===1)return this.copy(J);let Q=this._x,Z=this._y,K=this._z,W=this._w,X=W*J._w+Q*J._x+Z*J._y+K*J._z;if(X<0)this._w=-J._w,this._x=-J._x,this._y=-J._y,this._z=-J._z,X=-X;else this.copy(J);if(X>=1)return this._w=W,this._x=Q,this._y=Z,this._z=K,this;let Y=1-X*X;if(Y<=Number.EPSILON){let V=1-$;return this._w=V*W+$*this._w,this._x=V*Q+$*this._x,this._y=V*Z+$*this._y,this._z=V*K+$*this._z,this.normalize(),this}let H=Math.sqrt(Y),q=Math.atan2(H,X),U=Math.sin((1-$)*q)/H,F=Math.sin($*q)/H;return this._w=W*U+this._w*F,this._x=Q*U+this._x*F,this._y=Z*U+this._y*F,this._z=K*U+this._z*F,this._onChangeCallback(),this}slerpQuaternions(J,$,Q){return this.copy(J).slerp($,Q)}random(){let J=Math.random(),$=Math.sqrt(1-J),Q=Math.sqrt(J),Z=2*Math.PI*Math.random(),K=2*Math.PI*Math.random();return this.set($*Math.cos(Z),Q*Math.sin(K),Q*Math.cos(K),$*Math.sin(Z))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(J=0,$=0,Q=0){w.prototype.isVector3=!0,this.x=J,this.y=$,this.z=Q}set(J,$,Q){if(Q===void 0)Q=this.z;return this.x=J,this.y=$,this.z=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(P5.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(P5.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[3]*Q+K[6]*Z,this.y=K[1]*$+K[4]*Q+K[7]*Z,this.z=K[2]*$+K[5]*Q+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements,W=1/(K[3]*$+K[7]*Q+K[11]*Z+K[15]);return this.x=(K[0]*$+K[4]*Q+K[8]*Z+K[12])*W,this.y=(K[1]*$+K[5]*Q+K[9]*Z+K[13])*W,this.z=(K[2]*$+K[6]*Q+K[10]*Z+K[14])*W,this}applyQuaternion(J){let $=this.x,Q=this.y,Z=this.z,K=J.x,W=J.y,X=J.z,Y=J.w,H=2*(W*Z-X*Q),q=2*(X*$-K*Z),U=2*(K*Q-W*$);return this.x=$+Y*H+W*U-X*q,this.y=Q+Y*q+X*H-K*U,this.z=Z+Y*U+K*q-W*H,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[4]*Q+K[8]*Z,this.y=K[1]*$+K[5]*Q+K[9]*Z,this.z=K[2]*$+K[6]*Q+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(Math.max(J,Math.min($,Q)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Q,y:Z,z:K}=J,W=$.x,X=$.y,Y=$.z;return this.x=Z*Y-K*X,this.y=K*W-Q*Y,this.z=Q*X-Z*W,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Q=J.dot(this)/$;return this.copy(J).multiplyScalar(Q)}projectOnPlane(J){return CQ.copy(this).projectOnVector(J),this.sub(CQ)}reflect(J){return this.sub(CQ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(f8(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y,Z=this.z-J.z;return $*$+Q*Q+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Q){let Z=Math.sin($)*J;return this.x=Z*Math.sin(Q),this.y=Math.cos($)*J,this.z=Z*Math.cos(Q),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Q){return this.x=J*Math.sin($),this.y=Q,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Q=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Q,this.z=Z,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=(Math.random()-0.5)*2,$=Math.random()*Math.PI*2,Q=Math.sqrt(1-J**2);return this.x=Q*Math.cos($),this.y=Q*Math.sin($),this.z=J,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var CQ=new w,P5=new M9;class K7{constructor(J=new w(1/0,1/0,1/0),$=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$+=3)this.expandByPoint(N9.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Q=J.count;$<Q;$++)this.expandByPoint(N9.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Q=N9.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Q),this.max.copy(J).add(Q),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Q=J.geometry;if(Q!==void 0){let K=Q.getAttribute("position");if($===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let W=0,X=K.count;W<X;W++){if(J.isMesh===!0)J.getVertexPosition(W,N9);else N9.fromBufferAttribute(K,W);N9.applyMatrix4(J.matrixWorld),this.expandByPoint(N9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();H$.copy(J.boundingBox)}else{if(Q.boundingBox===null)Q.computeBoundingBox();H$.copy(Q.boundingBox)}H$.applyMatrix4(J.matrixWorld),this.union(H$)}}let Z=J.children;for(let K=0,W=Z.length;K<W;K++)this.expandByObject(Z[K],$);return this}containsPoint(J){return J.x<this.min.x||J.x>this.max.x||J.y<this.min.y||J.y>this.max.y||J.z<this.min.z||J.z>this.max.z?!1:!0}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x<this.min.x||J.min.x>this.max.x||J.max.y<this.min.y||J.min.y>this.max.y||J.max.z<this.min.z||J.min.z>this.max.z?!1:!0}intersectsSphere(J){return this.clampPoint(J.center,N9),N9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Q;if(J.normal.x>0)$=J.normal.x*this.min.x,Q=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Q=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Q+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Q+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Q+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Q+=J.normal.z*this.min.z;return $<=-J.constant&&Q>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(C7),q$.subVectors(this.max,C7),yJ.subVectors(J.a,C7),bJ.subVectors(J.b,C7),fJ.subVectors(J.c,C7),o9.subVectors(bJ,yJ),r9.subVectors(fJ,bJ),GJ.subVectors(yJ,fJ);let $=[0,-o9.z,o9.y,0,-r9.z,r9.y,0,-GJ.z,GJ.y,o9.z,0,-o9.x,r9.z,0,-r9.x,GJ.z,0,-GJ.x,-o9.y,o9.x,0,-r9.y,r9.x,0,-GJ.y,GJ.x,0];if(!AQ($,yJ,bJ,fJ,q$))return!1;if($=[1,0,0,0,1,0,0,0,1],!AQ($,yJ,bJ,fJ,q$))return!1;return U$.crossVectors(o9,r9),$=[U$.x,U$.y,U$.z],AQ($,yJ,bJ,fJ,q$)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,N9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(N9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return x9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),x9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),x9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),x9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),x9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),x9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),x9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),x9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(x9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}}var x9=[new w,new w,new w,new w,new w,new w,new w,new w],N9=new w,H$=new K7,yJ=new w,bJ=new w,fJ=new w,o9=new w,r9=new w,GJ=new w,C7=new w,q$=new w,U$=new w,OJ=new w;function AQ(J,$,Q,Z,K){for(let W=0,X=J.length-3;W<=X;W+=3){OJ.fromArray(J,W);let Y=K.x*Math.abs(OJ.x)+K.y*Math.abs(OJ.y)+K.z*Math.abs(OJ.z),H=$.dot(OJ),q=Q.dot(OJ),U=Z.dot(OJ);if(Math.max(-Math.max(H,q,U),Math.min(H,q,U))>Y)return!1}return!0}var iW=new K7,A7=new w,MQ=new w;class W7{constructor(J=new w,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Q=this.center;if($!==void 0)Q.copy($);else iW.setFromPoints(J).getCenter(Q);let Z=0;for(let K=0,W=J.length;K<W;K++)Z=Math.max(Z,Q.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Q=this.center.distanceToSquared(J);if($.copy(J),Q>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;A7.subVectors(J,this.center);let $=A7.lengthSq();if($>this.radius*this.radius){let Q=Math.sqrt($),Z=(Q-this.radius)*0.5;this.center.addScaledVector(A7,Z/Q),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else MQ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(A7.copy(J.center).add(MQ)),this.expandByPoint(A7.copy(J.center).sub(MQ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}}var y9=new w,kQ=new w,F$=new w,a9=new w,PQ=new w,V$=new w,SQ=new w;class IJ{constructor(J=new w,$=new w(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,y9)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Q=$.dot(this.direction);if(Q<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Q)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=y9.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return y9.copy(this.origin).addScaledVector(this.direction,$),y9.distanceToSquared(J)}distanceSqToSegment(J,$,Q,Z){kQ.copy(J).add($).multiplyScalar(0.5),F$.copy($).sub(J).normalize(),a9.copy(this.origin).sub(kQ);let K=J.distanceTo($)*0.5,W=-this.direction.dot(F$),X=a9.dot(this.direction),Y=-a9.dot(F$),H=a9.lengthSq(),q=Math.abs(1-W*W),U,F,V,G;if(q>0)if(U=W*Y-X,F=W*X-Y,G=K*q,U>=0)if(F>=-G)if(F<=G){let N=1/q;U*=N,F*=N,V=U*(U+W*F+2*X)+F*(W*U+F+2*Y)+H}else F=K,U=Math.max(0,-(W*F+X)),V=-U*U+F*(F+2*Y)+H;else F=-K,U=Math.max(0,-(W*F+X)),V=-U*U+F*(F+2*Y)+H;else if(F<=-G)U=Math.max(0,-(-W*K+X)),F=U>0?-K:Math.min(Math.max(-K,-Y),K),V=-U*U+F*(F+2*Y)+H;else if(F<=G)U=0,F=Math.min(Math.max(-K,-Y),K),V=F*(F+2*Y)+H;else U=Math.max(0,-(W*K+X)),F=U>0?K:Math.min(Math.max(-K,-Y),K),V=-U*U+F*(F+2*Y)+H;else F=W>0?-K:K,U=Math.max(0,-(W*F+X)),V=-U*U+F*(F+2*Y)+H;if(Q)Q.copy(this.origin).addScaledVector(this.direction,U);if(Z)Z.copy(kQ).addScaledVector(F$,F);return V}intersectSphere(J,$){y9.subVectors(J.center,this.origin);let Q=y9.dot(this.direction),Z=y9.dot(y9)-Q*Q,K=J.radius*J.radius;if(Z>K)return null;let W=Math.sqrt(K-Z),X=Q-W,Y=Q+W;if(Y<0)return null;if(X<0)return this.at(Y,$);return this.at(X,$)}intersectsSphere(J){return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Q=-(this.origin.dot(J.normal)+J.constant)/$;return Q>=0?Q:null}intersectPlane(J,$){let Q=this.distanceToPlane(J);if(Q===null)return null;return this.at(Q,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Q,Z,K,W,X,Y,H=1/this.direction.x,q=1/this.direction.y,U=1/this.direction.z,F=this.origin;if(H>=0)Q=(J.min.x-F.x)*H,Z=(J.max.x-F.x)*H;else Q=(J.max.x-F.x)*H,Z=(J.min.x-F.x)*H;if(q>=0)K=(J.min.y-F.y)*q,W=(J.max.y-F.y)*q;else K=(J.max.y-F.y)*q,W=(J.min.y-F.y)*q;if(Q>W||K>Z)return null;if(K>Q||isNaN(Q))Q=K;if(W<Z||isNaN(Z))Z=W;if(U>=0)X=(J.min.z-F.z)*U,Y=(J.max.z-F.z)*U;else X=(J.max.z-F.z)*U,Y=(J.min.z-F.z)*U;if(Q>Y||X>Z)return null;if(X>Q||Q!==Q)Q=X;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at(Q>=0?Q:Z,$)}intersectsBox(J){return this.intersectBox(J,y9)!==null}intersectTriangle(J,$,Q,Z,K){PQ.subVectors($,J),V$.subVectors(Q,J),SQ.crossVectors(PQ,V$);let W=this.direction.dot(SQ),X;if(W>0){if(Z)return null;X=1}else if(W<0)X=-1,W=-W;else return null;a9.subVectors(this.origin,J);let Y=X*this.direction.dot(V$.crossVectors(a9,V$));if(Y<0)return null;let H=X*this.direction.dot(PQ.cross(a9));if(H<0)return null;if(Y+H>W)return null;let q=-X*a9.dot(SQ);if(q<0)return null;return this.at(q/W,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class H8{constructor(J,$,Q,Z,K,W,X,Y,H,q,U,F,V,G,N,E){if(H8.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,W,X,Y,H,q,U,F,V,G,N,E)}set(J,$,Q,Z,K,W,X,Y,H,q,U,F,V,G,N,E){let O=this.elements;return O[0]=J,O[4]=$,O[8]=Q,O[12]=Z,O[1]=K,O[5]=W,O[9]=X,O[13]=Y,O[2]=H,O[6]=q,O[10]=U,O[14]=F,O[3]=V,O[7]=G,O[11]=N,O[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new H8().fromArray(this.elements)}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],$[9]=Q[9],$[10]=Q[10],$[11]=Q[11],$[12]=Q[12],$[13]=Q[13],$[14]=Q[14],$[15]=Q[15],this}copyPosition(J){let $=this.elements,Q=J.elements;return $[12]=Q[12],$[13]=Q[13],$[14]=Q[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Q){return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Q.setFromMatrixColumn(this,2),this}makeBasis(J,$,Q){return this.set(J.x,$.x,Q.x,0,J.y,$.y,Q.y,0,J.z,$.z,Q.z,0,0,0,0,1),this}extractRotation(J){let $=this.elements,Q=J.elements,Z=1/hJ.setFromMatrixColumn(J,0).length(),K=1/hJ.setFromMatrixColumn(J,1).length(),W=1/hJ.setFromMatrixColumn(J,2).length();return $[0]=Q[0]*Z,$[1]=Q[1]*Z,$[2]=Q[2]*Z,$[3]=0,$[4]=Q[4]*K,$[5]=Q[5]*K,$[6]=Q[6]*K,$[7]=0,$[8]=Q[8]*W,$[9]=Q[9]*W,$[10]=Q[10]*W,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z,W=Math.cos(Q),X=Math.sin(Q),Y=Math.cos(Z),H=Math.sin(Z),q=Math.cos(K),U=Math.sin(K);if(J.order==="XYZ"){let F=W*q,V=W*U,G=X*q,N=X*U;$[0]=Y*q,$[4]=-Y*U,$[8]=H,$[1]=V+G*H,$[5]=F-N*H,$[9]=-X*Y,$[2]=N-F*H,$[6]=G+V*H,$[10]=W*Y}else if(J.order==="YXZ"){let F=Y*q,V=Y*U,G=H*q,N=H*U;$[0]=F+N*X,$[4]=G*X-V,$[8]=W*H,$[1]=W*U,$[5]=W*q,$[9]=-X,$[2]=V*X-G,$[6]=N+F*X,$[10]=W*Y}else if(J.order==="ZXY"){let F=Y*q,V=Y*U,G=H*q,N=H*U;$[0]=F-N*X,$[4]=-W*U,$[8]=G+V*X,$[1]=V+G*X,$[5]=W*q,$[9]=N-F*X,$[2]=-W*H,$[6]=X,$[10]=W*Y}else if(J.order==="ZYX"){let F=W*q,V=W*U,G=X*q,N=X*U;$[0]=Y*q,$[4]=G*H-V,$[8]=F*H+N,$[1]=Y*U,$[5]=N*H+F,$[9]=V*H-G,$[2]=-H,$[6]=X*Y,$[10]=W*Y}else if(J.order==="YZX"){let F=W*Y,V=W*H,G=X*Y,N=X*H;$[0]=Y*q,$[4]=N-F*U,$[8]=G*U+V,$[1]=U,$[5]=W*q,$[9]=-X*q,$[2]=-H*q,$[6]=V*U+G,$[10]=F-N*U}else if(J.order==="XZY"){let F=W*Y,V=W*H,G=X*Y,N=X*H;$[0]=Y*q,$[4]=-U,$[8]=H*q,$[1]=F*U+N,$[5]=W*q,$[9]=V*U-G,$[2]=G*U-V,$[6]=X*q,$[10]=N*U+F}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(oW,J,rW)}lookAt(J,$,Q){let Z=this.elements;if(W9.subVectors(J,$),W9.lengthSq()===0)W9.z=1;if(W9.normalize(),t9.crossVectors(Q,W9),t9.lengthSq()===0){if(Math.abs(Q.z)===1)W9.x+=0.0001;else W9.z+=0.0001;W9.normalize(),t9.crossVectors(Q,W9)}return t9.normalize(),G$.crossVectors(W9,t9),Z[0]=t9.x,Z[4]=G$.x,Z[8]=W9.x,Z[1]=t9.y,Z[5]=G$.y,Z[9]=W9.y,Z[2]=t9.z,Z[6]=G$.z,Z[10]=W9.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,W=Q[0],X=Q[4],Y=Q[8],H=Q[12],q=Q[1],U=Q[5],F=Q[9],V=Q[13],G=Q[2],N=Q[6],E=Q[10],O=Q[14],D=Q[3],R=Q[7],B=Q[11],z=Q[15],C=Z[0],L=Z[4],A=Z[8],_=Z[12],I=Z[1],k=Z[5],b=Z[9],s=Z[13],a=Z[2],x=Z[6],v=Z[10],m=Z[14],o=Z[3],p=Z[7],h=Z[11],c=Z[15];return K[0]=W*C+X*I+Y*a+H*o,K[4]=W*L+X*k+Y*x+H*p,K[8]=W*A+X*b+Y*v+H*h,K[12]=W*_+X*s+Y*m+H*c,K[1]=q*C+U*I+F*a+V*o,K[5]=q*L+U*k+F*x+V*p,K[9]=q*A+U*b+F*v+V*h,K[13]=q*_+U*s+F*m+V*c,K[2]=G*C+N*I+E*a+O*o,K[6]=G*L+N*k+E*x+O*p,K[10]=G*A+N*b+E*v+O*h,K[14]=G*_+N*s+E*m+O*c,K[3]=D*C+R*I+B*a+z*o,K[7]=D*L+R*k+B*x+z*p,K[11]=D*A+R*b+B*v+z*h,K[15]=D*_+R*s+B*m+z*c,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[4],Z=J[8],K=J[12],W=J[1],X=J[5],Y=J[9],H=J[13],q=J[2],U=J[6],F=J[10],V=J[14],G=J[3],N=J[7],E=J[11],O=J[15];return G*(+K*Y*U-Z*H*U-K*X*F+Q*H*F+Z*X*V-Q*Y*V)+N*(+$*Y*V-$*H*F+K*W*F-Z*W*V+Z*H*q-K*Y*q)+E*(+$*H*U-$*X*V-K*W*U+Q*W*V+K*X*q-Q*H*q)+O*(-Z*X*q-$*Y*U+$*X*F+Z*W*U-Q*W*F+Q*Y*q)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Q){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=$,Z[14]=Q;return this}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],W=J[4],X=J[5],Y=J[6],H=J[7],q=J[8],U=J[9],F=J[10],V=J[11],G=J[12],N=J[13],E=J[14],O=J[15],D=U*E*H-N*F*H+N*Y*V-X*E*V-U*Y*O+X*F*O,R=G*F*H-q*E*H-G*Y*V+W*E*V+q*Y*O-W*F*O,B=q*N*H-G*U*H+G*X*V-W*N*V-q*X*O+W*U*O,z=G*U*Y-q*N*Y-G*X*F+W*N*F+q*X*E-W*U*E,C=$*D+Q*R+Z*B+K*z;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/C;return J[0]=D*L,J[1]=(N*F*K-U*E*K-N*Z*V+Q*E*V+U*Z*O-Q*F*O)*L,J[2]=(X*E*K-N*Y*K+N*Z*H-Q*E*H-X*Z*O+Q*Y*O)*L,J[3]=(U*Y*K-X*F*K-U*Z*H+Q*F*H+X*Z*V-Q*Y*V)*L,J[4]=R*L,J[5]=(q*E*K-G*F*K+G*Z*V-$*E*V-q*Z*O+$*F*O)*L,J[6]=(G*Y*K-W*E*K-G*Z*H+$*E*H+W*Z*O-$*Y*O)*L,J[7]=(W*F*K-q*Y*K+q*Z*H-$*F*H-W*Z*V+$*Y*V)*L,J[8]=B*L,J[9]=(G*U*K-q*N*K-G*Q*V+$*N*V+q*Q*O-$*U*O)*L,J[10]=(W*N*K-G*X*K+G*Q*H-$*N*H-W*Q*O+$*X*O)*L,J[11]=(q*X*K-W*U*K-q*Q*H+$*U*H+W*Q*V-$*X*V)*L,J[12]=z*L,J[13]=(q*N*Z-G*U*Z+G*Q*F-$*N*F-q*Q*E+$*U*E)*L,J[14]=(G*X*Z-W*N*Z-G*Q*Y+$*N*Y+W*Q*E-$*X*E)*L,J[15]=(W*U*Z-q*X*Z+q*Q*Y-$*U*Y-W*Q*F+$*X*F)*L,this}scale(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z;return $[0]*=Q,$[4]*=Z,$[8]*=K,$[1]*=Q,$[5]*=Z,$[9]*=K,$[2]*=Q,$[6]*=Z,$[10]*=K,$[3]*=Q,$[7]*=Z,$[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Q=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Q,Z))}makeTranslation(J,$,Q){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Q,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Q=Math.sin(J);return this.set(1,0,0,0,0,$,-Q,0,0,Q,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,0,Q,0,0,1,0,0,-Q,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,0,Q,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Q=Math.cos($),Z=Math.sin($),K=1-Q,W=J.x,X=J.y,Y=J.z,H=K*W,q=K*X;return this.set(H*W+Q,H*X-Z*Y,H*Y+Z*X,0,H*X+Z*Y,q*X+Q,q*Y-Z*W,0,H*Y-Z*X,q*Y+Z*W,K*Y*Y+Q,0,0,0,0,1),this}makeScale(J,$,Q){return this.set(J,0,0,0,0,$,0,0,0,0,Q,0,0,0,0,1),this}makeShear(J,$,Q,Z,K,W){return this.set(1,Q,K,0,J,1,W,0,$,Z,1,0,0,0,0,1),this}compose(J,$,Q){let Z=this.elements,K=$._x,W=$._y,X=$._z,Y=$._w,H=K+K,q=W+W,U=X+X,F=K*H,V=K*q,G=K*U,N=W*q,E=W*U,O=X*U,D=Y*H,R=Y*q,B=Y*U,z=Q.x,C=Q.y,L=Q.z;return Z[0]=(1-(N+O))*z,Z[1]=(V+B)*z,Z[2]=(G-R)*z,Z[3]=0,Z[4]=(V-B)*C,Z[5]=(1-(F+O))*C,Z[6]=(E+D)*C,Z[7]=0,Z[8]=(G+R)*L,Z[9]=(E-D)*L,Z[10]=(1-(F+N))*L,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,$,Q){let Z=this.elements,K=hJ.set(Z[0],Z[1],Z[2]).length(),W=hJ.set(Z[4],Z[5],Z[6]).length(),X=hJ.set(Z[8],Z[9],Z[10]).length();if(this.determinant()<0)K=-K;J.x=Z[12],J.y=Z[13],J.z=Z[14],R9.copy(this);let H=1/K,q=1/W,U=1/X;return R9.elements[0]*=H,R9.elements[1]*=H,R9.elements[2]*=H,R9.elements[4]*=q,R9.elements[5]*=q,R9.elements[6]*=q,R9.elements[8]*=U,R9.elements[9]*=U,R9.elements[10]*=U,$.setFromRotationMatrix(R9),Q.x=K,Q.y=W,Q.z=X,this}makePerspective(J,$,Q,Z,K,W,X=2000){let Y=this.elements,H=2*K/($-J),q=2*K/(Q-Z),U=($+J)/($-J),F=(Q+Z)/(Q-Z),V,G;if(X===2000)V=-(W+K)/(W-K),G=-2*W*K/(W-K);else if(X===2001)V=-W/(W-K),G=-W*K/(W-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+X);return Y[0]=H,Y[4]=0,Y[8]=U,Y[12]=0,Y[1]=0,Y[5]=q,Y[9]=F,Y[13]=0,Y[2]=0,Y[6]=0,Y[10]=V,Y[14]=G,Y[3]=0,Y[7]=0,Y[11]=-1,Y[15]=0,this}makeOrthographic(J,$,Q,Z,K,W,X=2000){let Y=this.elements,H=1/($-J),q=1/(Q-Z),U=1/(W-K),F=($+J)*H,V=(Q+Z)*q,G,N;if(X===2000)G=(W+K)*U,N=-2*U;else if(X===2001)G=K*U,N=-1*U;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+X);return Y[0]=2*H,Y[4]=0,Y[8]=0,Y[12]=-F,Y[1]=0,Y[5]=2*q,Y[9]=0,Y[13]=-V,Y[2]=0,Y[6]=0,Y[10]=N,Y[14]=-G,Y[3]=0,Y[7]=0,Y[11]=0,Y[15]=1,this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<16;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<16;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J[$+9]=Q[9],J[$+10]=Q[10],J[$+11]=Q[11],J[$+12]=Q[12],J[$+13]=Q[13],J[$+14]=Q[14],J[$+15]=Q[15],J}}var hJ=new w,R9=new H8,oW=new w(0,0,0),rW=new w(1,1,1),t9=new w,G$=new w,W9=new w,S5=new H8,w5=new M9;class d${constructor(J=0,$=0,Q=0,Z=d$.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Q,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Q,Z=this._order){return this._x=J,this._y=$,this._z=Q,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Q=!0){let Z=J.elements,K=Z[0],W=Z[4],X=Z[8],Y=Z[1],H=Z[5],q=Z[9],U=Z[2],F=Z[6],V=Z[10];switch($){case"XYZ":if(this._y=Math.asin(f8(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-q,V),this._z=Math.atan2(-W,K);else this._x=Math.atan2(F,H),this._z=0;break;case"YXZ":if(this._x=Math.asin(-f8(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(X,V),this._z=Math.atan2(Y,H);else this._y=Math.atan2(-U,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(f8(F,-1,1)),Math.abs(F)<0.9999999)this._y=Math.atan2(-U,V),this._z=Math.atan2(-W,H);else this._y=0,this._z=Math.atan2(Y,K);break;case"ZYX":if(this._y=Math.asin(-f8(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(F,V),this._z=Math.atan2(Y,K);else this._x=0,this._z=Math.atan2(-W,H);break;case"YZX":if(this._z=Math.asin(f8(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-q,H),this._y=Math.atan2(-U,K);else this._x=0,this._y=Math.atan2(X,V);break;case"XZY":if(this._z=Math.asin(-f8(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(F,H),this._y=Math.atan2(X,K);else this._x=Math.atan2(-q,V),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Q===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Q){return S5.makeRotationFromQuaternion(J),this.setFromRotationMatrix(S5,$,Q)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return w5.setFromEuler(this),this.setFromQuaternion(w5,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}d$.DEFAULT_ORDER="XYZ";class p${constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var aW=0,_5=new w,vJ=new M9,b9=new H8,O$=new w,M7=new w,tW=new w,eW=new M9,T5=new w(1,0,0),j5=new w(0,1,0),x5=new w(0,0,1),JY={type:"added"},$Y={type:"removed"};class D8 extends m9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:aW++}),this.uuid=v9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=D8.DEFAULT_UP.clone();let J=new w,$=new d$,Q=new M9,Z=new w(1,1,1);function K(){Q.setFromEuler($,!1)}function W(){$.setFromQuaternion(Q,void 0,!1)}$._onChange(K),Q._onChange(W),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Q},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new H8},normalMatrix:{value:new o0}}),this.matrix=new H8,this.matrixWorld=new H8,this.matrixAutoUpdate=D8.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=D8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new p$,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return vJ.setFromAxisAngle(J,$),this.quaternion.multiply(vJ),this}rotateOnWorldAxis(J,$){return vJ.setFromAxisAngle(J,$),this.quaternion.premultiply(vJ),this}rotateX(J){return this.rotateOnAxis(T5,J)}rotateY(J){return this.rotateOnAxis(j5,J)}rotateZ(J){return this.rotateOnAxis(x5,J)}translateOnAxis(J,$){return _5.copy(J).applyQuaternion(this.quaternion),this.position.add(_5.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(T5,J)}translateY(J){return this.translateOnAxis(j5,J)}translateZ(J){return this.translateOnAxis(x5,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(b9.copy(this.matrixWorld).invert())}lookAt(J,$,Q){if(J.isVector3)O$.copy(J);else O$.set(J,$,Q);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),M7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)b9.lookAt(M7,O$,this.up);else b9.lookAt(O$,M7,this.up);if(this.quaternion.setFromRotationMatrix(b9),Z)b9.extractRotation(Z.matrixWorld),vJ.setFromRotationMatrix(b9),this.quaternion.premultiply(vJ.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D){if(J.parent!==null)J.parent.remove(J);J.parent=this,this.children.push(J),J.dispatchEvent(JY)}else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.remove(arguments[Q]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent($Y);return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),b9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),b9.multiply(J.parent.matrixWorld);return J.applyMatrix4(b9),this.add(J),J.updateWorldMatrix(!1,!0),this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Q=0,Z=this.children.length;Q<Z;Q++){let W=this.children[Q].getObjectByProperty(J,$);if(W!==void 0)return W}return}getObjectsByProperty(J,$,Q=[]){if(this[J]===$)Q.push(this);let Z=this.children;for(let K=0,W=Z.length;K<W;K++)Z[K].getObjectsByProperty(J,$,Q);return Q}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(M7,J,tW),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(M7,eW,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}traverse(J){J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++){let K=$[Q];if(K.matrixWorldAutoUpdate===!0||J===!0)K.updateMatrixWorld(J)}}updateWorldMatrix(J,$){let Q=this.parent;if(J===!0&&Q!==null&&Q.matrixWorldAutoUpdate===!0)Q.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if($===!0){let Z=this.children;for(let K=0,W=Z.length;K<W;K++){let X=Z[K];if(X.matrixWorldAutoUpdate===!0)X.updateWorldMatrix(!1,!0)}}}toJSON(J){let $=J===void 0||typeof J==="string",Q={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Q.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.visibility=this._visibility,Z.active=this._active,Z.bounds=this._bounds.map((X)=>({boxInitialized:X.boxInitialized,boxMin:X.box.min.toArray(),boxMax:X.box.max.toArray(),sphereInitialized:X.sphereInitialized,sphereRadius:X.sphere.radius,sphereCenter:X.sphere.center.toArray()})),Z.maxGeometryCount=this._maxGeometryCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.geometryCount=this._geometryCount,Z.matricesTexture=this._matricesTexture.toJSON(J),this.boundingSphere!==null)Z.boundingSphere={center:Z.boundingSphere.center.toArray(),radius:Z.boundingSphere.radius};if(this.boundingBox!==null)Z.boundingBox={min:Z.boundingBox.min.toArray(),max:Z.boundingBox.max.toArray()}}function K(X,Y){if(X[Y.uuid]===void 0)X[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let X=this.geometry.parameters;if(X!==void 0&&X.shapes!==void 0){let Y=X.shapes;if(Array.isArray(Y))for(let H=0,q=Y.length;H<q;H++){let U=Y[H];K(J.shapes,U)}else K(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let X=[];for(let Y=0,H=this.material.length;Y<H;Y++)X.push(K(J.materials,this.material[Y]));Z.material=X}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let X=0;X<this.children.length;X++)Z.children.push(this.children[X].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let X=0;X<this.animations.length;X++){let Y=this.animations[X];Z.animations.push(K(J.animations,Y))}}if($){let X=W(J.geometries),Y=W(J.materials),H=W(J.textures),q=W(J.images),U=W(J.shapes),F=W(J.skeletons),V=W(J.animations),G=W(J.nodes);if(X.length>0)Q.geometries=X;if(Y.length>0)Q.materials=Y;if(H.length>0)Q.textures=H;if(q.length>0)Q.images=q;if(U.length>0)Q.shapes=U;if(F.length>0)Q.skeletons=F;if(V.length>0)Q.animations=V;if(G.length>0)Q.nodes=G}return Q.object=Z,Q;function W(X){let Y=[];for(let H in X){let q=X[H];delete q.metadata,Y.push(q)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Q=0;Q<J.children.length;Q++){let Z=J.children[Q];this.add(Z.clone())}return this}}D8.DEFAULT_UP=new w(0,1,0);D8.DEFAULT_MATRIX_AUTO_UPDATE=!0;D8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var B9=new w,f9=new w,wQ=new w,h9=new w,gJ=new w,mJ=new w,y5=new w,_Q=new w,TQ=new w,jQ=new w,D$=!1;class G9{constructor(J=new w,$=new w,Q=new w){this.a=J,this.b=$,this.c=Q}static getNormal(J,$,Q,Z){Z.subVectors(Q,$),B9.subVectors(J,$),Z.cross(B9);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,$,Q,Z,K){B9.subVectors(Z,$),f9.subVectors(Q,$),wQ.subVectors(J,$);let W=B9.dot(B9),X=B9.dot(f9),Y=B9.dot(wQ),H=f9.dot(f9),q=f9.dot(wQ),U=W*H-X*X;if(U===0)return K.set(0,0,0),null;let F=1/U,V=(H*Y-X*q)*F,G=(W*q-X*Y)*F;return K.set(1-V-G,G,V)}static containsPoint(J,$,Q,Z){if(this.getBarycoord(J,$,Q,Z,h9)===null)return!1;return h9.x>=0&&h9.y>=0&&h9.x+h9.y<=1}static getUV(J,$,Q,Z,K,W,X,Y){if(D$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),D$=!0;return this.getInterpolation(J,$,Q,Z,K,W,X,Y)}static getInterpolation(J,$,Q,Z,K,W,X,Y){if(this.getBarycoord(J,$,Q,Z,h9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(K,h9.x),Y.addScaledVector(W,h9.y),Y.addScaledVector(X,h9.z),Y}static isFrontFacing(J,$,Q,Z){return B9.subVectors(Q,$),f9.subVectors(J,$),B9.cross(f9).dot(Z)<0?!0:!1}set(J,$,Q){return this.a.copy(J),this.b.copy($),this.c.copy(Q),this}setFromPointsAndIndices(J,$,Q,Z){return this.a.copy(J[$]),this.b.copy(J[Q]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,$,Q,Z){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Q),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return B9.subVectors(this.c,this.b),f9.subVectors(this.a,this.b),B9.cross(f9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return G9.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return G9.getBarycoord(J,this.a,this.b,this.c,$)}getUV(J,$,Q,Z,K){if(D$===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),D$=!0;return G9.getInterpolation(J,this.a,this.b,this.c,$,Q,Z,K)}getInterpolation(J,$,Q,Z,K){return G9.getInterpolation(J,this.a,this.b,this.c,$,Q,Z,K)}containsPoint(J){return G9.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return G9.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Q=this.a,Z=this.b,K=this.c,W,X;gJ.subVectors(Z,Q),mJ.subVectors(K,Q),_Q.subVectors(J,Q);let Y=gJ.dot(_Q),H=mJ.dot(_Q);if(Y<=0&&H<=0)return $.copy(Q);TQ.subVectors(J,Z);let q=gJ.dot(TQ),U=mJ.dot(TQ);if(q>=0&&U<=q)return $.copy(Z);let F=Y*U-q*H;if(F<=0&&Y>=0&&q<=0)return W=Y/(Y-q),$.copy(Q).addScaledVector(gJ,W);jQ.subVectors(J,K);let V=gJ.dot(jQ),G=mJ.dot(jQ);if(G>=0&&V<=G)return $.copy(K);let N=V*H-Y*G;if(N<=0&&H>=0&&G<=0)return X=H/(H-G),$.copy(Q).addScaledVector(mJ,X);let E=q*G-V*U;if(E<=0&&U-q>=0&&V-G>=0)return y5.subVectors(K,Z),X=(U-q)/(U-q+(V-G)),$.copy(Z).addScaledVector(y5,X);let O=1/(E+N+F);return W=N*O,X=F*O,$.copy(Q).addScaledVector(gJ,W).addScaledVector(mJ,X)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}var P6={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},e9={h:0,s:0,l:0},E$={h:0,s:0,l:0};function xQ(J,$,Q){if(Q<0)Q+=1;if(Q>1)Q-=1;if(Q<0.16666666666666666)return J+($-J)*6*Q;if(Q<0.5)return $;if(Q<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Q);return J}class t0{constructor(J,$,Q){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Q)}set(J,$,Q){if($===void 0&&Q===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,$,Q);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,K8.toWorkingColorSpace(this,$),this}setRGB(J,$,Q,Z=K8.workingColorSpace){return this.r=J,this.g=$,this.b=Q,K8.toWorkingColorSpace(this,Z),this}setHSL(J,$,Q,Z=K8.workingColorSpace){if(J=JZ(J,1),$=f8($,0,1),Q=f8(Q,0,1),$===0)this.r=this.g=this.b=Q;else{let K=Q<=0.5?Q*(1+$):Q+$-Q*$,W=2*Q-K;this.r=xQ(W,K,J+0.3333333333333333),this.g=xQ(W,K,J),this.b=xQ(W,K,J-0.3333333333333333)}return K8.toWorkingColorSpace(this,Z),this}setStyle(J,$="srgb"){function Q(K){if(K===void 0)return;if(parseFloat(K)<1)console.warn("THREE.Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,W=Z[1],X=Z[2];switch(W){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(X))return Q(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,$);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(X))return Q(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,$);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(X))return Q(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,$);break;default:console.warn("THREE.Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],W=K.length;if(W===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,$);else if(W===6)return this.setHex(parseInt(K,16),$);else console.warn("THREE.Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Q=P6[J.toLowerCase()];if(Q!==void 0)this.setHex(Q,$);else console.warn("THREE.Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=J7(J.r),this.g=J7(J.g),this.b=J7(J.b),this}copyLinearToSRGB(J){return this.r=IQ(J.r),this.g=IQ(J.g),this.b=IQ(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return K8.fromWorkingColorSpace(d8.copy(this),J),Math.round(f8(d8.r*255,0,255))*65536+Math.round(f8(d8.g*255,0,255))*256+Math.round(f8(d8.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=K8.workingColorSpace){K8.fromWorkingColorSpace(d8.copy(this),$);let{r:Q,g:Z,b:K}=d8,W=Math.max(Q,Z,K),X=Math.min(Q,Z,K),Y,H,q=(X+W)/2;if(X===W)Y=0,H=0;else{let U=W-X;switch(H=q<=0.5?U/(W+X):U/(2-W-X),W){case Q:Y=(Z-K)/U+(Z<K?6:0);break;case Z:Y=(K-Q)/U+2;break;case K:Y=(Q-Z)/U+4;break}Y/=6}return J.h=Y,J.s=H,J.l=q,J}getRGB(J,$=K8.workingColorSpace){return K8.fromWorkingColorSpace(d8.copy(this),$),J.r=d8.r,J.g=d8.g,J.b=d8.b,J}getStyle(J="srgb"){K8.fromWorkingColorSpace(d8.copy(this),J);let{r:$,g:Q,b:Z}=d8;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Q.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Q*255)},${Math.round(Z*255)})`}offsetHSL(J,$,Q){return this.getHSL(e9),this.setHSL(e9.h+J,e9.s+$,e9.l+Q)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Q){return this.r=J.r+($.r-J.r)*Q,this.g=J.g+($.g-J.g)*Q,this.b=J.b+($.b-J.b)*Q,this}lerpHSL(J,$){this.getHSL(e9),J.getHSL(E$);let Q=j7(e9.h,E$.h,$),Z=j7(e9.s,E$.s,$),K=j7(e9.l,E$.l,$);return this.setHSL(Q,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Q=this.g,Z=this.b,K=J.elements;return this.r=K[0]*$+K[3]*Q+K[6]*Z,this.g=K[1]*$+K[4]*Q+K[7]*Z,this.b=K[2]*$+K[5]*Q+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var d8=new t0;t0.NAMES=P6;var QY=0;class u9 extends m9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:QY++}),this.uuid=v9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new t0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Q=J[$];if(Q===void 0){console.warn(`THREE.Material: parameter '${$}' has value of undefined.`);continue}let Z=this[$];if(Z===void 0){console.warn(`THREE.Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set(Q);else if(Z&&Z.isVector3&&(Q&&Q.isVector3))Z.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Q={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(Q.uuid=this.uuid,Q.type=this.type,this.name!=="")Q.name=this.name;if(this.color&&this.color.isColor)Q.color=this.color.getHex();if(this.roughness!==void 0)Q.roughness=this.roughness;if(this.metalness!==void 0)Q.metalness=this.metalness;if(this.sheen!==void 0)Q.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Q.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Q.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Q.emissive=this.emissive.getHex();if(this.emissiveIntensity&&this.emissiveIntensity!==1)Q.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Q.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Q.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Q.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Q.shininess=this.shininess;if(this.clearcoat!==void 0)Q.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Q.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Q.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Q.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Q.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Q.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.iridescence!==void 0)Q.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Q.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Q.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Q.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Q.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Q.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Q.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Q.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Q.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Q.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Q.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Q.lightMap=this.lightMap.toJSON(J).uuid,Q.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Q.aoMap=this.aoMap.toJSON(J).uuid,Q.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Q.bumpMap=this.bumpMap.toJSON(J).uuid,Q.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Q.normalMap=this.normalMap.toJSON(J).uuid,Q.normalMapType=this.normalMapType,Q.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Q.displacementMap=this.displacementMap.toJSON(J).uuid,Q.displacementScale=this.displacementScale,Q.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Q.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Q.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Q.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Q.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Q.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Q.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Q.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Q.combine=this.combine}if(this.envMapIntensity!==void 0)Q.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Q.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Q.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Q.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Q.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Q.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Q.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Q.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)Q.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Q.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Q.size=this.size;if(this.shadowSide!==null)Q.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)Q.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)Q.blending=this.blending;if(this.side!==0)Q.side=this.side;if(this.vertexColors===!0)Q.vertexColors=!0;if(this.opacity<1)Q.opacity=this.opacity;if(this.transparent===!0)Q.transparent=!0;if(this.blendSrc!==204)Q.blendSrc=this.blendSrc;if(this.blendDst!==205)Q.blendDst=this.blendDst;if(this.blendEquation!==100)Q.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)Q.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)Q.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)Q.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)Q.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)Q.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)Q.depthFunc=this.depthFunc;if(this.depthTest===!1)Q.depthTest=this.depthTest;if(this.depthWrite===!1)Q.depthWrite=this.depthWrite;if(this.colorWrite===!1)Q.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)Q.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)Q.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)Q.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)Q.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)Q.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)Q.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)Q.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)Q.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)Q.rotation=this.rotation;if(this.polygonOffset===!0)Q.polygonOffset=!0;if(this.polygonOffsetFactor!==0)Q.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)Q.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)Q.linewidth=this.linewidth;if(this.dashSize!==void 0)Q.dashSize=this.dashSize;if(this.gapSize!==void 0)Q.gapSize=this.gapSize;if(this.scale!==void 0)Q.scale=this.scale;if(this.dithering===!0)Q.dithering=!0;if(this.alphaTest>0)Q.alphaTest=this.alphaTest;if(this.alphaHash===!0)Q.alphaHash=!0;if(this.alphaToCoverage===!0)Q.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)Q.premultipliedAlpha=!0;if(this.forceSinglePass===!0)Q.forceSinglePass=!0;if(this.wireframe===!0)Q.wireframe=!0;if(this.wireframeLinewidth>1)Q.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")Q.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")Q.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)Q.flatShading=!0;if(this.visible===!1)Q.visible=!1;if(this.toneMapped===!1)Q.toneMapped=!1;if(this.fog===!1)Q.fog=!1;if(Object.keys(this.userData).length>0)Q.userData=this.userData;function Z(K){let W=[];for(let X in K){let Y=K[X];delete Y.metadata,W.push(Y)}return W}if($){let K=Z(J.textures),W=Z(J.images);if(K.length>0)Q.textures=K;if(W.length>0)Q.images=W}return Q}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Q=null;if($!==null){let Z=$.length;Q=Array(Z);for(let K=0;K!==Z;++K)Q[K]=$[K].clone()}return this.clippingPlanes=Q,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class W8 extends u9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new t0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var S8=new w,N$=new O0;class h8{constructor(J,$,Q=!1){if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Q,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Q){J*=this.itemSize,Q*=$.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Q=this.count;$<Q;$++)N$.fromBufferAttribute(this,$),N$.applyMatrix3(J),this.setXY($,N$.x,N$.y);else if(this.itemSize===3)for(let $=0,Q=this.count;$<Q;$++)S8.fromBufferAttribute(this,$),S8.applyMatrix3(J),this.setXYZ($,S8.x,S8.y,S8.z);return this}applyMatrix4(J){for(let $=0,Q=this.count;$<Q;$++)S8.fromBufferAttribute(this,$),S8.applyMatrix4(J),this.setXYZ($,S8.x,S8.y,S8.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)S8.fromBufferAttribute(this,$),S8.applyNormalMatrix(J),this.setXYZ($,S8.x,S8.y,S8.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)S8.fromBufferAttribute(this,$),S8.transformDirection(J),this.setXYZ($,S8.x,S8.y,S8.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Q=this.array[J*this.itemSize+$];if(this.normalized)Q=A9(Q,this.array);return Q}setComponent(J,$,Q){if(this.normalized)Q=Q8(Q,this.array);return this.array[J*this.itemSize+$]=Q,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=A9($,this.array);return $}setX(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=A9($,this.array);return $}setY(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=A9($,this.array);return $}setZ(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=A9($,this.array);return $}setW(J,$){if(this.normalized)$=Q8($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Q){if(J*=this.itemSize,this.normalized)$=Q8($,this.array),Q=Q8(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J*=this.itemSize,this.normalized)$=Q8($,this.array),Q=Q8(Q,this.array),Z=Q8(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J*=this.itemSize,this.normalized)$=Q8($,this.array),Q=Q8(Q,this.array),Z=Q8(Z,this.array),K=Q8(K,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}}class KZ extends h8{constructor(J,$,Q){super(new Uint16Array(J),$,Q)}}class WZ extends h8{constructor(J,$,Q){super(new Uint32Array(J),$,Q)}}class J8 extends h8{constructor(J,$,Q){super(new Float32Array(J),$,Q)}}var ZY=0,V9=new H8,yQ=new D8,uJ=new w,Y9=new K7,k7=new K7,b8=new w;class E8 extends m9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ZY++}),this.uuid=v9(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((A6(J))?WZ:KZ)(J,1);else this.index=J;return this}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Q=0){this.groups.push({start:J,count:$,materialIndex:Q})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Q=this.attributes.normal;if(Q!==void 0){let K=new o0().getNormalMatrix(J);Q.applyNormalMatrix(K),Q.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return V9.makeRotationFromQuaternion(J),this.applyMatrix4(V9),this}rotateX(J){return V9.makeRotationX(J),this.applyMatrix4(V9),this}rotateY(J){return V9.makeRotationY(J),this.applyMatrix4(V9),this}rotateZ(J){return V9.makeRotationZ(J),this.applyMatrix4(V9),this}translate(J,$,Q){return V9.makeTranslation(J,$,Q),this.applyMatrix4(V9),this}scale(J,$,Q){return V9.makeScale(J,$,Q),this.applyMatrix4(V9),this}lookAt(J){return yQ.lookAt(J),yQ.updateMatrix(),this.applyMatrix4(yQ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(uJ).negate(),this.translate(uJ.x,uJ.y,uJ.z),this}setFromPoints(J){let $=[];for(let Q=0,Z=J.length;Q<Z;Q++){let K=J[Q];$.push(K.x,K.y,K.z||0)}return this.setAttribute("position",new J8($,3)),this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new K7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Q=0,Z=$.length;Q<Z;Q++){let K=$[Q];if(Y9.setFromBufferAttribute(K),this.morphTargetsRelative)b8.addVectors(this.boundingBox.min,Y9.min),this.boundingBox.expandByPoint(b8),b8.addVectors(this.boundingBox.max,Y9.max),this.boundingBox.expandByPoint(b8);else this.boundingBox.expandByPoint(Y9.min),this.boundingBox.expandByPoint(Y9.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new W7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(J){let Q=this.boundingSphere.center;if(Y9.setFromBufferAttribute(J),$)for(let K=0,W=$.length;K<W;K++){let X=$[K];if(k7.setFromBufferAttribute(X),this.morphTargetsRelative)b8.addVectors(Y9.min,k7.min),Y9.expandByPoint(b8),b8.addVectors(Y9.max,k7.max),Y9.expandByPoint(b8);else Y9.expandByPoint(k7.min),Y9.expandByPoint(k7.max)}Y9.getCenter(Q);let Z=0;for(let K=0,W=J.count;K<W;K++)b8.fromBufferAttribute(J,K),Z=Math.max(Z,Q.distanceToSquared(b8));if($)for(let K=0,W=$.length;K<W;K++){let X=$[K],Y=this.morphTargetsRelative;for(let H=0,q=X.count;H<q;H++){if(b8.fromBufferAttribute(X,H),Y)uJ.fromBufferAttribute(J,H),b8.add(uJ);Z=Math.max(Z,Q.distanceToSquared(b8))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let Q=J.array,Z=$.position.array,K=$.normal.array,W=$.uv.array,X=Z.length/3;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new h8(new Float32Array(4*X),4));let Y=this.getAttribute("tangent").array,H=[],q=[];for(let I=0;I<X;I++)H[I]=new w,q[I]=new w;let U=new w,F=new w,V=new w,G=new O0,N=new O0,E=new O0,O=new w,D=new w;function R(I,k,b){U.fromArray(Z,I*3),F.fromArray(Z,k*3),V.fromArray(Z,b*3),G.fromArray(W,I*2),N.fromArray(W,k*2),E.fromArray(W,b*2),F.sub(U),V.sub(U),N.sub(G),E.sub(G);let s=1/(N.x*E.y-E.x*N.y);if(!isFinite(s))return;O.copy(F).multiplyScalar(E.y).addScaledVector(V,-N.y).multiplyScalar(s),D.copy(V).multiplyScalar(N.x).addScaledVector(F,-E.x).multiplyScalar(s),H[I].add(O),H[k].add(O),H[b].add(O),q[I].add(D),q[k].add(D),q[b].add(D)}let B=this.groups;if(B.length===0)B=[{start:0,count:Q.length}];for(let I=0,k=B.length;I<k;++I){let b=B[I],s=b.start,a=b.count;for(let x=s,v=s+a;x<v;x+=3)R(Q[x+0],Q[x+1],Q[x+2])}let z=new w,C=new w,L=new w,A=new w;function _(I){L.fromArray(K,I*3),A.copy(L);let k=H[I];z.copy(k),z.sub(L.multiplyScalar(L.dot(k))).normalize(),C.crossVectors(A,k);let s=C.dot(q[I])<0?-1:1;Y[I*4]=z.x,Y[I*4+1]=z.y,Y[I*4+2]=z.z,Y[I*4+3]=s}for(let I=0,k=B.length;I<k;++I){let b=B[I],s=b.start,a=b.count;for(let x=s,v=s+a;x<v;x+=3)_(Q[x+0]),_(Q[x+1]),_(Q[x+2])}}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Q=this.getAttribute("normal");if(Q===void 0)Q=new h8(new Float32Array($.count*3),3),this.setAttribute("normal",Q);else for(let F=0,V=Q.count;F<V;F++)Q.setXYZ(F,0,0,0);let Z=new w,K=new w,W=new w,X=new w,Y=new w,H=new w,q=new w,U=new w;if(J)for(let F=0,V=J.count;F<V;F+=3){let G=J.getX(F+0),N=J.getX(F+1),E=J.getX(F+2);Z.fromBufferAttribute($,G),K.fromBufferAttribute($,N),W.fromBufferAttribute($,E),q.subVectors(W,K),U.subVectors(Z,K),q.cross(U),X.fromBufferAttribute(Q,G),Y.fromBufferAttribute(Q,N),H.fromBufferAttribute(Q,E),X.add(q),Y.add(q),H.add(q),Q.setXYZ(G,X.x,X.y,X.z),Q.setXYZ(N,Y.x,Y.y,Y.z),Q.setXYZ(E,H.x,H.y,H.z)}else for(let F=0,V=$.count;F<V;F+=3)Z.fromBufferAttribute($,F+0),K.fromBufferAttribute($,F+1),W.fromBufferAttribute($,F+2),q.subVectors(W,K),U.subVectors(Z,K),q.cross(U),Q.setXYZ(F+0,q.x,q.y,q.z),Q.setXYZ(F+1,q.x,q.y,q.z),Q.setXYZ(F+2,q.x,q.y,q.z);this.normalizeNormals(),Q.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Q=J.count;$<Q;$++)b8.fromBufferAttribute(J,$),b8.normalize(),J.setXYZ($,b8.x,b8.y,b8.z)}toNonIndexed(){function J(X,Y){let{array:H,itemSize:q,normalized:U}=X,F=new H.constructor(Y.length*q),V=0,G=0;for(let N=0,E=Y.length;N<E;N++){if(X.isInterleavedBufferAttribute)V=Y[N]*X.data.stride+X.offset;else V=Y[N]*q;for(let O=0;O<q;O++)F[G++]=H[V++]}return new h8(F,q,U)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new E8,Q=this.index.array,Z=this.attributes;for(let X in Z){let Y=Z[X],H=J(Y,Q);$.setAttribute(X,H)}let K=this.morphAttributes;for(let X in K){let Y=[],H=K[X];for(let q=0,U=H.length;q<U;q++){let F=H[q],V=J(F,Q);Y.push(V)}$.morphAttributes[X]=Y}$.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;for(let X=0,Y=W.length;X<Y;X++){let H=W[X];$.addGroup(H.start,H.count,H.materialIndex)}return $}toJSON(){let J={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let Y=this.parameters;for(let H in Y)if(Y[H]!==void 0)J[H]=Y[H];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Q=this.attributes;for(let Y in Q){let H=Q[Y];J.data.attributes[Y]=H.toJSON(J.data)}let Z={},K=!1;for(let Y in this.morphAttributes){let H=this.morphAttributes[Y],q=[];for(let U=0,F=H.length;U<F;U++){let V=H[U];q.push(V.toJSON(J.data))}if(q.length>0)Z[Y]=q,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;if(W.length>0)J.data.groups=JSON.parse(JSON.stringify(W));let X=this.boundingSphere;if(X!==null)J.data.boundingSphere={center:X.center.toArray(),radius:X.radius};return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Q=J.index;if(Q!==null)this.setIndex(Q.clone($));let Z=J.attributes;for(let H in Z){let q=Z[H];this.setAttribute(H,q.clone($))}let K=J.morphAttributes;for(let H in K){let q=[],U=K[H];for(let F=0,V=U.length;F<V;F++)q.push(U[F].clone($));this.morphAttributes[H]=q}this.morphTargetsRelative=J.morphTargetsRelative;let W=J.groups;for(let H=0,q=W.length;H<q;H++){let U=W[H];this.addGroup(U.start,U.count,U.materialIndex)}let X=J.boundingBox;if(X!==null)this.boundingBox=X.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var b5=new H8,DJ=new IJ,R$=new W7,f5=new w,dJ=new w,pJ=new w,lJ=new w,bQ=new w,B$=new w,z$=new O0,I$=new O0,L$=new O0,h5=new w,v5=new w,g5=new w,C$=new w,A$=new w;class S extends D8{constructor(J=new E8,$=new W8){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let X=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[X]=K}}}}getVertexPosition(J,$){let Q=this.geometry,Z=Q.attributes.position,K=Q.morphAttributes.position,W=Q.morphTargetsRelative;$.fromBufferAttribute(Z,J);let X=this.morphTargetInfluences;if(K&&X){B$.set(0,0,0);for(let Y=0,H=K.length;Y<H;Y++){let q=X[Y],U=K[Y];if(q===0)continue;if(bQ.fromBufferAttribute(U,J),W)B$.addScaledVector(bQ,q);else B$.addScaledVector(bQ.sub($),q)}$.add(B$)}return $}raycast(J,$){let Q=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(R$.copy(Q.boundingSphere),R$.applyMatrix4(K),DJ.copy(J.ray).recast(J.near),R$.containsPoint(DJ.origin)===!1){if(DJ.intersectSphere(R$,f5)===null)return;if(DJ.origin.distanceToSquared(f5)>(J.far-J.near)**2)return}if(b5.copy(K).invert(),DJ.copy(J.ray).applyMatrix4(b5),Q.boundingBox!==null){if(DJ.intersectsBox(Q.boundingBox)===!1)return}this._computeIntersections(J,$,DJ)}_computeIntersections(J,$,Q){let Z,K=this.geometry,W=this.material,X=K.index,Y=K.attributes.position,H=K.attributes.uv,q=K.attributes.uv1,U=K.attributes.normal,F=K.groups,V=K.drawRange;if(X!==null)if(Array.isArray(W))for(let G=0,N=F.length;G<N;G++){let E=F[G],O=W[E.materialIndex],D=Math.max(E.start,V.start),R=Math.min(X.count,Math.min(E.start+E.count,V.start+V.count));for(let B=D,z=R;B<z;B+=3){let C=X.getX(B),L=X.getX(B+1),A=X.getX(B+2);if(Z=M$(this,O,J,Q,H,q,U,C,L,A),Z)Z.faceIndex=Math.floor(B/3),Z.face.materialIndex=E.materialIndex,$.push(Z)}}else{let G=Math.max(0,V.start),N=Math.min(X.count,V.start+V.count);for(let E=G,O=N;E<O;E+=3){let D=X.getX(E),R=X.getX(E+1),B=X.getX(E+2);if(Z=M$(this,W,J,Q,H,q,U,D,R,B),Z)Z.faceIndex=Math.floor(E/3),$.push(Z)}}else if(Y!==void 0)if(Array.isArray(W))for(let G=0,N=F.length;G<N;G++){let E=F[G],O=W[E.materialIndex],D=Math.max(E.start,V.start),R=Math.min(Y.count,Math.min(E.start+E.count,V.start+V.count));for(let B=D,z=R;B<z;B+=3){let C=B,L=B+1,A=B+2;if(Z=M$(this,O,J,Q,H,q,U,C,L,A),Z)Z.faceIndex=Math.floor(B/3),Z.face.materialIndex=E.materialIndex,$.push(Z)}}else{let G=Math.max(0,V.start),N=Math.min(Y.count,V.start+V.count);for(let E=G,O=N;E<O;E+=3){let D=E,R=E+1,B=E+2;if(Z=M$(this,W,J,Q,H,q,U,D,R,B),Z)Z.faceIndex=Math.floor(E/3),$.push(Z)}}}}function KY(J,$,Q,Z,K,W,X,Y){let H;if($.side===1)H=Z.intersectTriangle(X,W,K,!0,Y);else H=Z.intersectTriangle(K,W,X,$.side===0,Y);if(H===null)return null;A$.copy(Y),A$.applyMatrix4(J.matrixWorld);let q=Q.ray.origin.distanceTo(A$);if(q<Q.near||q>Q.far)return null;return{distance:q,point:A$.clone(),object:J}}function M$(J,$,Q,Z,K,W,X,Y,H,q){J.getVertexPosition(Y,dJ),J.getVertexPosition(H,pJ),J.getVertexPosition(q,lJ);let U=KY(J,$,Q,Z,dJ,pJ,lJ,C$);if(U){if(K)z$.fromBufferAttribute(K,Y),I$.fromBufferAttribute(K,H),L$.fromBufferAttribute(K,q),U.uv=G9.getInterpolation(C$,dJ,pJ,lJ,z$,I$,L$,new O0);if(W)z$.fromBufferAttribute(W,Y),I$.fromBufferAttribute(W,H),L$.fromBufferAttribute(W,q),U.uv1=G9.getInterpolation(C$,dJ,pJ,lJ,z$,I$,L$,new O0),U.uv2=U.uv1;if(X){if(h5.fromBufferAttribute(X,Y),v5.fromBufferAttribute(X,H),g5.fromBufferAttribute(X,q),U.normal=G9.getInterpolation(C$,dJ,pJ,lJ,h5,v5,g5,new w),U.normal.dot(Z.direction)>0)U.normal.multiplyScalar(-1)}let F={a:Y,b:H,c:q,normal:new w,materialIndex:0};G9.getNormal(dJ,pJ,lJ,F.normal),U.face=F}return U}class t extends E8{constructor(J=1,$=1,Q=1,Z=1,K=1,W=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Q,widthSegments:Z,heightSegments:K,depthSegments:W};let X=this;Z=Math.floor(Z),K=Math.floor(K),W=Math.floor(W);let Y=[],H=[],q=[],U=[],F=0,V=0;G("z","y","x",-1,-1,Q,$,J,W,K,0),G("z","y","x",1,-1,Q,$,-J,W,K,1),G("x","z","y",1,1,J,Q,$,Z,W,2),G("x","z","y",1,-1,J,Q,-$,Z,W,3),G("x","y","z",1,-1,J,$,Q,Z,K,4),G("x","y","z",-1,-1,J,$,-Q,Z,K,5),this.setIndex(Y),this.setAttribute("position",new J8(H,3)),this.setAttribute("normal",new J8(q,3)),this.setAttribute("uv",new J8(U,2));function G(N,E,O,D,R,B,z,C,L,A,_){let I=B/L,k=z/A,b=B/2,s=z/2,a=C/2,x=L+1,v=A+1,m=0,o=0,p=new w;for(let h=0;h<v;h++){let c=h*k-s;for(let J0=0;J0<x;J0++){let f=J0*I-b;p[N]=f*D,p[E]=c*R,p[O]=a,H.push(p.x,p.y,p.z),p[N]=0,p[E]=0,p[O]=C>0?1:-1,q.push(p.x,p.y,p.z),U.push(J0/L),U.push(1-h/A),m+=1}}for(let h=0;h<A;h++)for(let c=0;c<L;c++){let J0=F+c+x*h,f=F+c+x*(h+1),e=F+(c+1)+x*(h+1),Z0=F+(c+1)+x*h;Y.push(J0,f,Z0),Y.push(f,e,Z0),o+=6}X.addGroup(V,o,_),V+=o,F+=m}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new t(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}function Q7(J){let $={};for(let Q in J){$[Q]={};for(let Z in J[Q]){let K=J[Q][Z];if(K&&(K.isColor||K.isMatrix3||K.isMatrix4||K.isVector2||K.isVector3||K.isVector4||K.isTexture||K.isQuaternion))if(K.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Q][Z]=null;else $[Q][Z]=K.clone();else if(Array.isArray(K))$[Q][Z]=K.slice();else $[Q][Z]=K}}return $}function i8(J){let $={};for(let Q=0;Q<J.length;Q++){let Z=Q7(J[Q]);for(let K in Z)$[K]=Z[K]}return $}function WY(J){let $=[];for(let Q=0;Q<J.length;Q++)$.push(J[Q].clone());return $}function S6(J){if(J.getRenderTarget()===null)return J.outputColorSpace;return K8.workingColorSpace}var YY={clone:Q7,merge:i8},XY=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,HY=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $J extends u9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=XY,this.fragmentShader=HY,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=Q7(J.uniforms),this.uniformsGroups=WY(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let Z in this.uniforms){let W=this.uniforms[Z].value;if(W&&W.isTexture)$.uniforms[Z]={type:"t",value:W.toJSON(J).uuid};else if(W&&W.isColor)$.uniforms[Z]={type:"c",value:W.getHex()};else if(W&&W.isVector2)$.uniforms[Z]={type:"v2",value:W.toArray()};else if(W&&W.isVector3)$.uniforms[Z]={type:"v3",value:W.toArray()};else if(W&&W.isVector4)$.uniforms[Z]={type:"v4",value:W.toArray()};else if(W&&W.isMatrix3)$.uniforms[Z]={type:"m3",value:W.toArray()};else if(W&&W.isMatrix4)$.uniforms[Z]={type:"m4",value:W.toArray()};else $.uniforms[Z]={value:W}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Q={};for(let Z in this.extensions)if(this.extensions[Z]===!0)Q[Z]=!0;if(Object.keys(Q).length>0)$.extensions=Q;return $}}class YZ extends D8{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new H8,this.projectionMatrix=new H8,this.projectionMatrixInverse=new H8,this.coordinateSystem=2000}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){super.updateMatrixWorld(J),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(J,$){super.updateWorldMatrix(J,$),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class p8 extends YZ{constructor(J=50,$=1,Q=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Q,this.far=Z,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=$7*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(T7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return $7*2*Math.atan(Math.tan(T7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(J,$,Q,Z,K,W){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(T7*0.5*this.fov)/this.zoom,Q=2*$,Z=this.aspect*Q,K=-0.5*Z,W=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:H}=W;K+=W.offsetX*Z/Y,$-=W.offsetY*Q/H,Z*=W.width/Y,Q*=W.height/H}let X=this.filmOffset;if(X!==0)K+=J*X/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,$,$-Q,J,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}var cJ=-90,nJ=1;class w6 extends D8{constructor(J,$,Q){super();this.type="CubeCamera",this.renderTarget=Q,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new p8(cJ,nJ,J,$);Z.layers=this.layers,this.add(Z);let K=new p8(cJ,nJ,J,$);K.layers=this.layers,this.add(K);let W=new p8(cJ,nJ,J,$);W.layers=this.layers,this.add(W);let X=new p8(cJ,nJ,J,$);X.layers=this.layers,this.add(X);let Y=new p8(cJ,nJ,J,$);Y.layers=this.layers,this.add(Y);let H=new p8(cJ,nJ,J,$);H.layers=this.layers,this.add(H)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Q,Z,K,W,X,Y]=$;for(let H of $)this.remove(H);if(J===2000)Q.up.set(0,1,0),Q.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),W.up.set(0,0,1),W.lookAt(0,-1,0),X.up.set(0,1,0),X.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)Q.up.set(0,-1,0),Q.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),W.up.set(0,0,-1),W.lookAt(0,-1,0),X.up.set(0,-1,0),X.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let H of $)this.add(H),H.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Q,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,W,X,Y,H,q]=this.children,U=J.getRenderTarget(),F=J.getActiveCubeFace(),V=J.getActiveMipmapLevel(),G=J.xr.enabled;J.xr.enabled=!1;let N=Q.texture.generateMipmaps;Q.texture.generateMipmaps=!1,J.setRenderTarget(Q,0,Z),J.render($,K),J.setRenderTarget(Q,1,Z),J.render($,W),J.setRenderTarget(Q,2,Z),J.render($,X),J.setRenderTarget(Q,3,Z),J.render($,Y),J.setRenderTarget(Q,4,Z),J.render($,H),Q.texture.generateMipmaps=N,J.setRenderTarget(Q,5,Z),J.render($,q),J.setRenderTarget(U,F,V),J.xr.enabled=G,Q.texture.needsPMREMUpdate=!0}}class XZ extends a8{constructor(J,$,Q,Z,K,W,X,Y,H,q){J=J!==void 0?J:[],$=$!==void 0?$:301;super(J,$,Q,Z,K,W,X,Y,H,q);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class _6 extends JJ{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Q={width:J,height:J,depth:1},Z=[Q,Q,Q,Q,Q,Q];if($.encoding!==void 0)x7("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),$.colorSpace=$.encoding===3001?"srgb":"";this.texture=new XZ(Z,$.mapping,$.wrapS,$.wrapT,$.magFilter,$.minFilter,$.format,$.type,$.anisotropy,$.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=$.generateMipmaps!==void 0?$.generateMipmaps:!1,this.texture.minFilter=$.minFilter!==void 0?$.minFilter:1006}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Q={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new t(5,5,5),K=new $J({name:"CubemapFromEquirect",uniforms:Q7(Q.uniforms),vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader,side:1,blending:0});K.uniforms.tEquirect.value=$;let W=new S(Z,K),X=$.minFilter;if($.minFilter===1008)$.minFilter=1006;return new w6(1,10,this).update(J,W),$.minFilter=X,W.geometry.dispose(),W.material.dispose(),this}clear(J,$,Q,Z){let K=J.getRenderTarget();for(let W=0;W<6;W++)J.setRenderTarget(this,W),J.clear($,Q,Z);J.setRenderTarget(K)}}var fQ=new w,qY=new w,UY=new o0;class L9{constructor(J=new w(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Q,Z){return this.normal.set(J,$,Q),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Q){let Z=fQ.subVectors(Q,$).cross(qY.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$){let Q=J.delta(fQ),Z=this.normal.dot(Q);if(Z===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Z;if(K<0||K>1)return null;return $.copy(J.start).addScaledVector(Q,K)}intersectsLine(J){let $=this.distanceToPoint(J.start),Q=this.distanceToPoint(J.end);return $<0&&Q>0||Q<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Q=$||UY.getNormalMatrix(J),Z=this.coplanarPoint(fQ).applyMatrix4(J),K=this.normal.applyMatrix3(Q).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var EJ=new W7,k$=new w;class l${constructor(J=new L9,$=new L9,Q=new L9,Z=new L9,K=new L9,W=new L9){this.planes=[J,$,Q,Z,K,W]}set(J,$,Q,Z,K,W){let X=this.planes;return X[0].copy(J),X[1].copy($),X[2].copy(Q),X[3].copy(Z),X[4].copy(K),X[5].copy(W),this}copy(J){let $=this.planes;for(let Q=0;Q<6;Q++)$[Q].copy(J.planes[Q]);return this}setFromProjectionMatrix(J,$=2000){let Q=this.planes,Z=J.elements,K=Z[0],W=Z[1],X=Z[2],Y=Z[3],H=Z[4],q=Z[5],U=Z[6],F=Z[7],V=Z[8],G=Z[9],N=Z[10],E=Z[11],O=Z[12],D=Z[13],R=Z[14],B=Z[15];if(Q[0].setComponents(Y-K,F-H,E-V,B-O).normalize(),Q[1].setComponents(Y+K,F+H,E+V,B+O).normalize(),Q[2].setComponents(Y+W,F+q,E+G,B+D).normalize(),Q[3].setComponents(Y-W,F-q,E-G,B-D).normalize(),Q[4].setComponents(Y-X,F-U,E-N,B-R).normalize(),$===2000)Q[5].setComponents(Y+X,F+U,E+N,B+R).normalize();else if($===2001)Q[5].setComponents(X,U,N,R).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();EJ.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();EJ.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(EJ)}intersectsSprite(J){return EJ.center.set(0,0,0),EJ.radius=0.7071067811865476,EJ.applyMatrix4(J.matrixWorld),this.intersectsSphere(EJ)}intersectsSphere(J){let $=this.planes,Q=J.center,Z=-J.radius;for(let K=0;K<6;K++)if($[K].distanceToPoint(Q)<Z)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Q=0;Q<6;Q++){let Z=$[Q];if(k$.x=Z.normal.x>0?J.max.x:J.min.x,k$.y=Z.normal.y>0?J.max.y:J.min.y,k$.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(k$)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Q=0;Q<6;Q++)if($[Q].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function T6(){let J=null,$=!1,Q=null,Z=null;function K(W,X){Q(W,X),Z=J.requestAnimationFrame(K)}return{start:function(){if($===!0)return;if(Q===null)return;Z=J.requestAnimationFrame(K),$=!0},stop:function(){J.cancelAnimationFrame(Z),$=!1},setAnimationLoop:function(W){Q=W},setContext:function(W){J=W}}}function FY(J,$){let Q=$.isWebGL2,Z=new WeakMap;function K(q,U){let{array:F,usage:V}=q,G=F.byteLength,N=J.createBuffer();J.bindBuffer(U,N),J.bufferData(U,F,V),q.onUploadCallback();let E;if(F instanceof Float32Array)E=J.FLOAT;else if(F instanceof Uint16Array)if(q.isFloat16BufferAttribute)if(Q)E=J.HALF_FLOAT;else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=J.UNSIGNED_SHORT;else if(F instanceof Int16Array)E=J.SHORT;else if(F instanceof Uint32Array)E=J.UNSIGNED_INT;else if(F instanceof Int32Array)E=J.INT;else if(F instanceof Int8Array)E=J.BYTE;else if(F instanceof Uint8Array)E=J.UNSIGNED_BYTE;else if(F instanceof Uint8ClampedArray)E=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+F);return{buffer:N,type:E,bytesPerElement:F.BYTES_PER_ELEMENT,version:q.version,size:G}}function W(q,U,F){let{array:V,_updateRange:G,updateRanges:N}=U;if(J.bindBuffer(F,q),G.count===-1&&N.length===0)J.bufferSubData(F,0,V);if(N.length!==0){for(let E=0,O=N.length;E<O;E++){let D=N[E];if(Q)J.bufferSubData(F,D.start*V.BYTES_PER_ELEMENT,V,D.start,D.count);else J.bufferSubData(F,D.start*V.BYTES_PER_ELEMENT,V.subarray(D.start,D.start+D.count))}U.clearUpdateRanges()}if(G.count!==-1){if(Q)J.bufferSubData(F,G.offset*V.BYTES_PER_ELEMENT,V,G.offset,G.count);else J.bufferSubData(F,G.offset*V.BYTES_PER_ELEMENT,V.subarray(G.offset,G.offset+G.count));G.count=-1}U.onUploadCallback()}function X(q){if(q.isInterleavedBufferAttribute)q=q.data;return Z.get(q)}function Y(q){if(q.isInterleavedBufferAttribute)q=q.data;let U=Z.get(q);if(U)J.deleteBuffer(U.buffer),Z.delete(q)}function H(q,U){if(q.isGLBufferAttribute){let V=Z.get(q);if(!V||V.version<q.version)Z.set(q,{buffer:q.buffer,type:q.type,bytesPerElement:q.elementSize,version:q.version});return}if(q.isInterleavedBufferAttribute)q=q.data;let F=Z.get(q);if(F===void 0)Z.set(q,K(q,U));else if(F.version<q.version){if(F.size!==q.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(F.buffer,q,U),F.version=q.version}}return{get:X,remove:Y,update:H}}class X9 extends E8{constructor(J=1,$=1,Q=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Q,heightSegments:Z};let K=J/2,W=$/2,X=Math.floor(Q),Y=Math.floor(Z),H=X+1,q=Y+1,U=J/X,F=$/Y,V=[],G=[],N=[],E=[];for(let O=0;O<q;O++){let D=O*F-W;for(let R=0;R<H;R++){let B=R*U-K;G.push(B,-D,0),N.push(0,0,1),E.push(R/X),E.push(1-O/Y)}}for(let O=0;O<Y;O++)for(let D=0;D<X;D++){let R=D+H*O,B=D+H*(O+1),z=D+1+H*(O+1),C=D+1+H*O;V.push(R,B,C),V.push(B,z,C)}this.setIndex(V),this.setAttribute("position",new J8(G,3)),this.setAttribute("normal",new J8(N,3)),this.setAttribute("uv",new J8(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new X9(J.width,J.height,J.widthSegments,J.heightSegments)}}var VY=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GY=`#ifdef USE_ALPHAHASH
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
#endif`,OY=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,DY=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,EY=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,NY=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,RY=`#ifdef USE_AOMAP
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
#endif`,BY=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zY=`#ifdef USE_BATCHING
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
#endif`,IY=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,LY=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,CY=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,AY=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,MY=`#ifdef USE_IRIDESCENCE
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
#endif`,kY=`#ifdef USE_BUMPMAP
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
#endif`,PY=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,SY=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wY=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_Y=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,TY=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jY=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xY=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,yY=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,bY=`#define PI 3.141592653589793
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
} // validated`,fY=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hY=`vec3 transformedNormal = objectNormal;
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
#endif`,vY=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gY=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mY=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uY=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dY="gl_FragColor = linearToOutputTexel( gl_FragColor );",pY=`
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
}`,lY=`#ifdef USE_ENVMAP
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
#endif`,cY=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nY=`#ifdef USE_ENVMAP
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
#endif`,sY=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iY=`#ifdef USE_ENVMAP
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
#endif`,oY=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rY=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,aY=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tY=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eY=`#ifdef USE_GRADIENTMAP
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
}`,JX=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,$X=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ZX=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,KX=`uniform bool receiveShadow;
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
#endif`,WX=`#ifdef USE_ENVMAP
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
#endif`,YX=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,XX=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,HX=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qX=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,UX=`PhysicalMaterial material;
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
#endif`,FX=`struct PhysicalMaterial {
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
}`,VX=`
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
#endif`,GX=`#if defined( RE_IndirectDiffuse )
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
#endif`,OX=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,DX=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,EX=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NX=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,RX=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,BX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,IX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,LX=`#if defined( USE_POINTS_UV )
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
#endif`,CX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,AX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,MX=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kX=`#ifdef USE_MORPHNORMALS
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
#endif`,PX=`#ifdef USE_MORPHTARGETS
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
#endif`,SX=`#ifdef USE_MORPHTARGETS
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
#endif`,wX=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_X=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,TX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yX=`#ifdef USE_NORMALMAP
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
#endif`,bX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hX=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vX=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mX=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,uX=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dX=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pX=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lX=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cX=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nX=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,oX=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rX=`float getShadowMask() {
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
}`,aX=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tX=`#ifdef USE_SKINNING
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
#endif`,eX=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,J1=`#ifdef USE_SKINNING
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
#endif`,$1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Q1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Z1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,W1=`#ifdef USE_TRANSMISSION
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
#endif`,Y1=`#ifdef USE_TRANSMISSION
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
#endif`,X1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,F1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,V1=`uniform sampler2D t2D;
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
}`,O1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,D1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,E1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N1=`#include <common>
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
}`,R1=`#if DEPTH_PACKING == 3200
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
}`,B1=`#define DISTANCE
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
}`,z1=`#define DISTANCE
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
}`,I1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,L1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C1=`uniform float scale;
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
}`,A1=`uniform vec3 diffuse;
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
}`,k1=`uniform vec3 diffuse;
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
}`,P1=`#define LAMBERT
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
}`,S1=`#define LAMBERT
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
}`,w1=`#define MATCAP
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
}`,_1=`#define MATCAP
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
}`,T1=`#define NORMAL
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
}`,j1=`#define NORMAL
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
}`,x1=`#define PHONG
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
}`,y1=`#define PHONG
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
}`,f1=`#define STANDARD
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
}`,h1=`#define TOON
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
}`,v1=`#define TOON
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
}`,g1=`uniform float size;
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
}`,m1=`uniform vec3 diffuse;
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
}`,u1=`#include <common>
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
}`,d1=`uniform vec3 color;
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
}`,p1=`uniform float rotation;
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
}`,l1=`uniform vec3 diffuse;
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
}`,n0={alphahash_fragment:VY,alphahash_pars_fragment:GY,alphamap_fragment:OY,alphamap_pars_fragment:DY,alphatest_fragment:EY,alphatest_pars_fragment:NY,aomap_fragment:RY,aomap_pars_fragment:BY,batching_pars_vertex:zY,batching_vertex:IY,begin_vertex:LY,beginnormal_vertex:CY,bsdfs:AY,iridescence_fragment:MY,bumpmap_pars_fragment:kY,clipping_planes_fragment:PY,clipping_planes_pars_fragment:SY,clipping_planes_pars_vertex:wY,clipping_planes_vertex:_Y,color_fragment:TY,color_pars_fragment:jY,color_pars_vertex:xY,color_vertex:yY,common:bY,cube_uv_reflection_fragment:fY,defaultnormal_vertex:hY,displacementmap_pars_vertex:vY,displacementmap_vertex:gY,emissivemap_fragment:mY,emissivemap_pars_fragment:uY,colorspace_fragment:dY,colorspace_pars_fragment:pY,envmap_fragment:lY,envmap_common_pars_fragment:cY,envmap_pars_fragment:nY,envmap_pars_vertex:sY,envmap_physical_pars_fragment:WX,envmap_vertex:iY,fog_vertex:oY,fog_pars_vertex:rY,fog_fragment:aY,fog_pars_fragment:tY,gradientmap_pars_fragment:eY,lightmap_fragment:JX,lightmap_pars_fragment:$X,lights_lambert_fragment:QX,lights_lambert_pars_fragment:ZX,lights_pars_begin:KX,lights_toon_fragment:YX,lights_toon_pars_fragment:XX,lights_phong_fragment:HX,lights_phong_pars_fragment:qX,lights_physical_fragment:UX,lights_physical_pars_fragment:FX,lights_fragment_begin:VX,lights_fragment_maps:GX,lights_fragment_end:OX,logdepthbuf_fragment:DX,logdepthbuf_pars_fragment:EX,logdepthbuf_pars_vertex:NX,logdepthbuf_vertex:RX,map_fragment:BX,map_pars_fragment:zX,map_particle_fragment:IX,map_particle_pars_fragment:LX,metalnessmap_fragment:CX,metalnessmap_pars_fragment:AX,morphcolor_vertex:MX,morphnormal_vertex:kX,morphtarget_pars_vertex:PX,morphtarget_vertex:SX,normal_fragment_begin:wX,normal_fragment_maps:_X,normal_pars_fragment:TX,normal_pars_vertex:jX,normal_vertex:xX,normalmap_pars_fragment:yX,clearcoat_normal_fragment_begin:bX,clearcoat_normal_fragment_maps:fX,clearcoat_pars_fragment:hX,iridescence_pars_fragment:vX,opaque_fragment:gX,packing:mX,premultiplied_alpha_fragment:uX,project_vertex:dX,dithering_fragment:pX,dithering_pars_fragment:lX,roughnessmap_fragment:cX,roughnessmap_pars_fragment:nX,shadowmap_pars_fragment:sX,shadowmap_pars_vertex:iX,shadowmap_vertex:oX,shadowmask_pars_fragment:rX,skinbase_vertex:aX,skinning_pars_vertex:tX,skinning_vertex:eX,skinnormal_vertex:J1,specularmap_fragment:$1,specularmap_pars_fragment:Q1,tonemapping_fragment:Z1,tonemapping_pars_fragment:K1,transmission_fragment:W1,transmission_pars_fragment:Y1,uv_pars_fragment:X1,uv_pars_vertex:H1,uv_vertex:q1,worldpos_vertex:U1,background_vert:F1,background_frag:V1,backgroundCube_vert:G1,backgroundCube_frag:O1,cube_vert:D1,cube_frag:E1,depth_vert:N1,depth_frag:R1,distanceRGBA_vert:B1,distanceRGBA_frag:z1,equirect_vert:I1,equirect_frag:L1,linedashed_vert:C1,linedashed_frag:A1,meshbasic_vert:M1,meshbasic_frag:k1,meshlambert_vert:P1,meshlambert_frag:S1,meshmatcap_vert:w1,meshmatcap_frag:_1,meshnormal_vert:T1,meshnormal_frag:j1,meshphong_vert:x1,meshphong_frag:y1,meshphysical_vert:b1,meshphysical_frag:f1,meshtoon_vert:h1,meshtoon_frag:v1,points_vert:g1,points_frag:m1,shadow_vert:u1,shadow_frag:d1,sprite_vert:p1,sprite_frag:l1},V0={common:{diffuse:{value:new t0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new o0},alphaMap:{value:null},alphaMapTransform:{value:new o0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new o0}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new o0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new o0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new o0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new o0},normalScale:{value:new O0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new o0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new o0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new o0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new o0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new t0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new t0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new o0},alphaTest:{value:0},uvTransform:{value:new o0}},sprite:{diffuse:{value:new t0(16777215)},opacity:{value:1},center:{value:new O0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new o0},alphaMap:{value:null},alphaMapTransform:{value:new o0},alphaTest:{value:0}}},C9={basic:{uniforms:i8([V0.common,V0.specularmap,V0.envmap,V0.aomap,V0.lightmap,V0.fog]),vertexShader:n0.meshbasic_vert,fragmentShader:n0.meshbasic_frag},lambert:{uniforms:i8([V0.common,V0.specularmap,V0.envmap,V0.aomap,V0.lightmap,V0.emissivemap,V0.bumpmap,V0.normalmap,V0.displacementmap,V0.fog,V0.lights,{emissive:{value:new t0(0)}}]),vertexShader:n0.meshlambert_vert,fragmentShader:n0.meshlambert_frag},phong:{uniforms:i8([V0.common,V0.specularmap,V0.envmap,V0.aomap,V0.lightmap,V0.emissivemap,V0.bumpmap,V0.normalmap,V0.displacementmap,V0.fog,V0.lights,{emissive:{value:new t0(0)},specular:{value:new t0(1118481)},shininess:{value:30}}]),vertexShader:n0.meshphong_vert,fragmentShader:n0.meshphong_frag},standard:{uniforms:i8([V0.common,V0.envmap,V0.aomap,V0.lightmap,V0.emissivemap,V0.bumpmap,V0.normalmap,V0.displacementmap,V0.roughnessmap,V0.metalnessmap,V0.fog,V0.lights,{emissive:{value:new t0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:n0.meshphysical_vert,fragmentShader:n0.meshphysical_frag},toon:{uniforms:i8([V0.common,V0.aomap,V0.lightmap,V0.emissivemap,V0.bumpmap,V0.normalmap,V0.displacementmap,V0.gradientmap,V0.fog,V0.lights,{emissive:{value:new t0(0)}}]),vertexShader:n0.meshtoon_vert,fragmentShader:n0.meshtoon_frag},matcap:{uniforms:i8([V0.common,V0.bumpmap,V0.normalmap,V0.displacementmap,V0.fog,{matcap:{value:null}}]),vertexShader:n0.meshmatcap_vert,fragmentShader:n0.meshmatcap_frag},points:{uniforms:i8([V0.points,V0.fog]),vertexShader:n0.points_vert,fragmentShader:n0.points_frag},dashed:{uniforms:i8([V0.common,V0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:n0.linedashed_vert,fragmentShader:n0.linedashed_frag},depth:{uniforms:i8([V0.common,V0.displacementmap]),vertexShader:n0.depth_vert,fragmentShader:n0.depth_frag},normal:{uniforms:i8([V0.common,V0.bumpmap,V0.normalmap,V0.displacementmap,{opacity:{value:1}}]),vertexShader:n0.meshnormal_vert,fragmentShader:n0.meshnormal_frag},sprite:{uniforms:i8([V0.sprite,V0.fog]),vertexShader:n0.sprite_vert,fragmentShader:n0.sprite_frag},background:{uniforms:{uvTransform:{value:new o0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:n0.background_vert,fragmentShader:n0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:n0.backgroundCube_vert,fragmentShader:n0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:n0.cube_vert,fragmentShader:n0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:n0.equirect_vert,fragmentShader:n0.equirect_frag},distanceRGBA:{uniforms:i8([V0.common,V0.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:n0.distanceRGBA_vert,fragmentShader:n0.distanceRGBA_frag},shadow:{uniforms:i8([V0.lights,V0.fog,{color:{value:new t0(0)},opacity:{value:1}}]),vertexShader:n0.shadow_vert,fragmentShader:n0.shadow_frag}};C9.physical={uniforms:i8([C9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new o0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new o0},clearcoatNormalScale:{value:new O0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new o0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new o0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new o0},sheen:{value:0},sheenColor:{value:new t0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new o0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new o0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new o0},transmissionSamplerSize:{value:new O0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new o0},attenuationDistance:{value:0},attenuationColor:{value:new t0(0)},specularColor:{value:new t0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new o0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new o0},anisotropyVector:{value:new O0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new o0}}]),vertexShader:n0.meshphysical_vert,fragmentShader:n0.meshphysical_frag};var P$={r:0,b:0,g:0};function c1(J,$,Q,Z,K,W,X){let Y=new t0(0),H=W===!0?0:1,q,U,F=null,V=0,G=null;function N(O,D){let R=!1,B=D.isScene===!0?D.background:null;if(B&&B.isTexture)B=(D.backgroundBlurriness>0?Q:$).get(B);if(B===null)E(Y,H);else if(B&&B.isColor)E(B,1),R=!0;let z=J.xr.getEnvironmentBlendMode();if(z==="additive")Z.buffers.color.setClear(0,0,0,1,X);else if(z==="alpha-blend")Z.buffers.color.setClear(0,0,0,0,X);if(J.autoClear||R)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(B&&(B.isCubeTexture||B.mapping===306)){if(U===void 0)U=new S(new t(1,1,1),new $J({name:"BackgroundCubeMaterial",uniforms:Q7(C9.backgroundCube.uniforms),vertexShader:C9.backgroundCube.vertexShader,fragmentShader:C9.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(C,L,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),K.update(U);if(U.material.uniforms.envMap.value=B,U.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,U.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,U.material.toneMapped=K8.getTransfer(B.colorSpace)!=="srgb",F!==B||V!==B.version||G!==J.toneMapping)U.material.needsUpdate=!0,F=B,V=B.version,G=J.toneMapping;U.layers.enableAll(),O.unshift(U,U.geometry,U.material,0,0,null)}else if(B&&B.isTexture){if(q===void 0)q=new S(new X9(2,2),new $J({name:"BackgroundMaterial",uniforms:Q7(C9.background.uniforms),vertexShader:C9.background.vertexShader,fragmentShader:C9.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),q.geometry.deleteAttribute("normal"),Object.defineProperty(q.material,"map",{get:function(){return this.uniforms.t2D.value}}),K.update(q);if(q.material.uniforms.t2D.value=B,q.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,q.material.toneMapped=K8.getTransfer(B.colorSpace)!=="srgb",B.matrixAutoUpdate===!0)B.updateMatrix();if(q.material.uniforms.uvTransform.value.copy(B.matrix),F!==B||V!==B.version||G!==J.toneMapping)q.material.needsUpdate=!0,F=B,V=B.version,G=J.toneMapping;q.layers.enableAll(),O.unshift(q,q.geometry,q.material,0,0,null)}}function E(O,D){O.getRGB(P$,S6(J)),Z.buffers.color.setClear(P$.r,P$.g,P$.b,D,X)}return{getClearColor:function(){return Y},setClearColor:function(O,D=1){Y.set(O),H=D,E(Y,H)},getClearAlpha:function(){return H},setClearAlpha:function(O){H=O,E(Y,H)},render:N}}function n1(J,$,Q,Z){let K=J.getParameter(J.MAX_VERTEX_ATTRIBS),W=Z.isWebGL2?null:$.get("OES_vertex_array_object"),X=Z.isWebGL2||W!==null,Y={},H=O(null),q=H,U=!1;function F(x,v,m,o,p){let h=!1;if(X){let c=E(o,m,v);if(q!==c)q=c,G(q.object);if(h=D(x,o,m,p),h)R(x,o,m,p)}else{let c=v.wireframe===!0;if(q.geometry!==o.id||q.program!==m.id||q.wireframe!==c)q.geometry=o.id,q.program=m.id,q.wireframe=c,h=!0}if(p!==null)Q.update(p,J.ELEMENT_ARRAY_BUFFER);if(h||U){if(U=!1,_(x,v,m,o),p!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(p).buffer)}}function V(){if(Z.isWebGL2)return J.createVertexArray();return W.createVertexArrayOES()}function G(x){if(Z.isWebGL2)return J.bindVertexArray(x);return W.bindVertexArrayOES(x)}function N(x){if(Z.isWebGL2)return J.deleteVertexArray(x);return W.deleteVertexArrayOES(x)}function E(x,v,m){let o=m.wireframe===!0,p=Y[x.id];if(p===void 0)p={},Y[x.id]=p;let h=p[v.id];if(h===void 0)h={},p[v.id]=h;let c=h[o];if(c===void 0)c=O(V()),h[o]=c;return c}function O(x){let v=[],m=[],o=[];for(let p=0;p<K;p++)v[p]=0,m[p]=0,o[p]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:m,attributeDivisors:o,object:x,attributes:{},index:null}}function D(x,v,m,o){let p=q.attributes,h=v.attributes,c=0,J0=m.getAttributes();for(let f in J0)if(J0[f].location>=0){let Z0=p[f],W0=h[f];if(W0===void 0){if(f==="instanceMatrix"&&x.instanceMatrix)W0=x.instanceMatrix;if(f==="instanceColor"&&x.instanceColor)W0=x.instanceColor}if(Z0===void 0)return!0;if(Z0.attribute!==W0)return!0;if(W0&&Z0.data!==W0.data)return!0;c++}if(q.attributesNum!==c)return!0;if(q.index!==o)return!0;return!1}function R(x,v,m,o){let p={},h=v.attributes,c=0,J0=m.getAttributes();for(let f in J0)if(J0[f].location>=0){let Z0=h[f];if(Z0===void 0){if(f==="instanceMatrix"&&x.instanceMatrix)Z0=x.instanceMatrix;if(f==="instanceColor"&&x.instanceColor)Z0=x.instanceColor}let W0={};if(W0.attribute=Z0,Z0&&Z0.data)W0.data=Z0.data;p[f]=W0,c++}q.attributes=p,q.attributesNum=c,q.index=o}function B(){let x=q.newAttributes;for(let v=0,m=x.length;v<m;v++)x[v]=0}function z(x){C(x,0)}function C(x,v){let{newAttributes:m,enabledAttributes:o,attributeDivisors:p}=q;if(m[x]=1,o[x]===0)J.enableVertexAttribArray(x),o[x]=1;if(p[x]!==v)(Z.isWebGL2?J:$.get("ANGLE_instanced_arrays"))[Z.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](x,v),p[x]=v}function L(){let{newAttributes:x,enabledAttributes:v}=q;for(let m=0,o=v.length;m<o;m++)if(v[m]!==x[m])J.disableVertexAttribArray(m),v[m]=0}function A(x,v,m,o,p,h,c){if(c===!0)J.vertexAttribIPointer(x,v,m,p,h);else J.vertexAttribPointer(x,v,m,o,p,h)}function _(x,v,m,o){if(Z.isWebGL2===!1&&(x.isInstancedMesh||o.isInstancedBufferGeometry)){if($.get("ANGLE_instanced_arrays")===null)return}B();let p=o.attributes,h=m.getAttributes(),c=v.defaultAttributeValues;for(let J0 in h){let f=h[J0];if(f.location>=0){let e=p[J0];if(e===void 0){if(J0==="instanceMatrix"&&x.instanceMatrix)e=x.instanceMatrix;if(J0==="instanceColor"&&x.instanceColor)e=x.instanceColor}if(e!==void 0){let{normalized:Z0,itemSize:W0}=e,G0=Q.get(e);if(G0===void 0)continue;let{buffer:S0,type:x0,bytesPerElement:_0}=G0,m0=Z.isWebGL2===!0&&(x0===J.INT||x0===J.UNSIGNED_INT||e.gpuType===1013);if(e.isInterleavedBufferAttribute){let g=e.data,q8=g.stride,d0=e.offset;if(g.isInstancedInterleavedBuffer){for(let L0=0;L0<f.locationSize;L0++)C(f.location+L0,g.meshPerAttribute);if(x.isInstancedMesh!==!0&&o._maxInstanceCount===void 0)o._maxInstanceCount=g.meshPerAttribute*g.count}else for(let L0=0;L0<f.locationSize;L0++)z(f.location+L0);J.bindBuffer(J.ARRAY_BUFFER,S0);for(let L0=0;L0<f.locationSize;L0++)A(f.location+L0,W0/f.locationSize,x0,Z0,q8*_0,(d0+W0/f.locationSize*L0)*_0,m0)}else{if(e.isInstancedBufferAttribute){for(let g=0;g<f.locationSize;g++)C(f.location+g,e.meshPerAttribute);if(x.isInstancedMesh!==!0&&o._maxInstanceCount===void 0)o._maxInstanceCount=e.meshPerAttribute*e.count}else for(let g=0;g<f.locationSize;g++)z(f.location+g);J.bindBuffer(J.ARRAY_BUFFER,S0);for(let g=0;g<f.locationSize;g++)A(f.location+g,W0/f.locationSize,x0,Z0,W0*_0,W0/f.locationSize*g*_0,m0)}}else if(c!==void 0){let Z0=c[J0];if(Z0!==void 0)switch(Z0.length){case 2:J.vertexAttrib2fv(f.location,Z0);break;case 3:J.vertexAttrib3fv(f.location,Z0);break;case 4:J.vertexAttrib4fv(f.location,Z0);break;default:J.vertexAttrib1fv(f.location,Z0)}}}}L()}function I(){s();for(let x in Y){let v=Y[x];for(let m in v){let o=v[m];for(let p in o)N(o[p].object),delete o[p];delete v[m]}delete Y[x]}}function k(x){if(Y[x.id]===void 0)return;let v=Y[x.id];for(let m in v){let o=v[m];for(let p in o)N(o[p].object),delete o[p];delete v[m]}delete Y[x.id]}function b(x){for(let v in Y){let m=Y[v];if(m[x.id]===void 0)continue;let o=m[x.id];for(let p in o)N(o[p].object),delete o[p];delete m[x.id]}}function s(){if(a(),U=!0,q===H)return;q=H,G(q.object)}function a(){H.geometry=null,H.program=null,H.wireframe=!1}return{setup:F,reset:s,resetDefaultState:a,dispose:I,releaseStatesOfGeometry:k,releaseStatesOfProgram:b,initAttributes:B,enableAttribute:z,disableUnusedAttributes:L}}function s1(J,$,Q,Z){let K=Z.isWebGL2,W;function X(U){W=U}function Y(U,F){J.drawArrays(W,U,F),Q.update(F,W,1)}function H(U,F,V){if(V===0)return;let G,N;if(K)G=J,N="drawArraysInstanced";else if(G=$.get("ANGLE_instanced_arrays"),N="drawArraysInstancedANGLE",G===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}G[N](W,U,F,V),Q.update(F,W,V)}function q(U,F,V){if(V===0)return;let G=$.get("WEBGL_multi_draw");if(G===null)for(let N=0;N<V;N++)this.render(U[N],F[N]);else{G.multiDrawArraysWEBGL(W,U,0,F,0,V);let N=0;for(let E=0;E<V;E++)N+=F[E];Q.update(N,W,1)}}this.setMode=X,this.render=Y,this.renderInstances=H,this.renderMultiDraw=q}function i1(J,$,Q){let Z;function K(){if(Z!==void 0)return Z;if($.has("EXT_texture_filter_anisotropic")===!0){let A=$.get("EXT_texture_filter_anisotropic");Z=J.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Z=0;return Z}function W(A){if(A==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let X=typeof WebGL2RenderingContext<"u"&&J.constructor.name==="WebGL2RenderingContext",Y=Q.precision!==void 0?Q.precision:"highp",H=W(Y);if(H!==Y)console.warn("THREE.WebGLRenderer:",Y,"not supported, using",H,"instead."),Y=H;let q=X||$.has("WEBGL_draw_buffers"),U=Q.logarithmicDepthBuffer===!0,F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),G=J.getParameter(J.MAX_TEXTURE_SIZE),N=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),O=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),D=J.getParameter(J.MAX_VARYING_VECTORS),R=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),B=V>0,z=X||$.has("OES_texture_float"),C=B&&z,L=X?J.getParameter(J.MAX_SAMPLES):0;return{isWebGL2:X,drawBuffers:q,getMaxAnisotropy:K,getMaxPrecision:W,precision:Y,logarithmicDepthBuffer:U,maxTextures:F,maxVertexTextures:V,maxTextureSize:G,maxCubemapSize:N,maxAttributes:E,maxVertexUniforms:O,maxVaryings:D,maxFragmentUniforms:R,vertexTextures:B,floatFragmentTextures:z,floatVertexTextures:C,maxSamples:L}}function o1(J){let $=this,Q=null,Z=0,K=!1,W=!1,X=new L9,Y=new o0,H={value:null,needsUpdate:!1};this.uniform=H,this.numPlanes=0,this.numIntersection=0,this.init=function(F,V){let G=F.length!==0||V||Z!==0||K;return K=V,Z=F.length,G},this.beginShadows=function(){W=!0,U(null)},this.endShadows=function(){W=!1},this.setGlobalState=function(F,V){Q=U(F,V,0)},this.setState=function(F,V,G){let{clippingPlanes:N,clipIntersection:E,clipShadows:O}=F,D=J.get(F);if(!K||N===null||N.length===0||W&&!O)if(W)U(null);else q();else{let R=W?0:Z,B=R*4,z=D.clippingState||null;H.value=z,z=U(N,V,B,G);for(let C=0;C!==B;++C)z[C]=Q[C];D.clippingState=z,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=R}};function q(){if(H.value!==Q)H.value=Q,H.needsUpdate=Z>0;$.numPlanes=Z,$.numIntersection=0}function U(F,V,G,N){let E=F!==null?F.length:0,O=null;if(E!==0){if(O=H.value,N!==!0||O===null){let D=G+E*4,R=V.matrixWorldInverse;if(Y.getNormalMatrix(R),O===null||O.length<D)O=new Float32Array(D);for(let B=0,z=G;B!==E;++B,z+=4)X.copy(F[B]).applyMatrix4(R,Y),X.normal.toArray(O,z),O[z+3]=X.constant}H.value=O,H.needsUpdate=!0}return $.numPlanes=E,$.numIntersection=0,O}}function r1(J){let $=new WeakMap;function Q(X,Y){if(Y===303)X.mapping=301;else if(Y===304)X.mapping=302;return X}function Z(X){if(X&&X.isTexture){let Y=X.mapping;if(Y===303||Y===304)if($.has(X)){let H=$.get(X).texture;return Q(H,X.mapping)}else{let H=X.image;if(H&&H.height>0){let q=new _6(H.height/2);return q.fromEquirectangularTexture(J,X),$.set(X,q),X.addEventListener("dispose",K),Q(q.texture,X.mapping)}else return null}}return X}function K(X){let Y=X.target;Y.removeEventListener("dispose",K);let H=$.get(Y);if(H!==void 0)$.delete(Y),H.dispose()}function W(){$=new WeakMap}return{get:Z,dispose:W}}class HZ extends YZ{constructor(J=-1,$=1,Q=1,Z=-1,K=0.1,W=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Q,this.bottom=Z,this.near=K,this.far=W,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Q,Z,K,W){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Q=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=Q-J,W=Q+J,X=Z+$,Y=Z-$;if(this.view!==null&&this.view.enabled){let H=(this.right-this.left)/this.view.fullWidth/this.zoom,q=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=H*this.view.offsetX,W=K+H*this.view.width,X-=q*this.view.offsetY,Y=X-q*this.view.height}this.projectionMatrix.makeOrthographic(K,W,X,Y,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}var tJ=4,m5=[0.125,0.215,0.35,0.446,0.526,0.582],RJ=20,hQ=new HZ,u5=new t0,vQ=null,gQ=0,mQ=0,NJ=(1+Math.sqrt(5))/2,sJ=1/NJ,d5=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,NJ,sJ),new w(0,NJ,-sJ),new w(sJ,0,NJ),new w(-sJ,0,NJ),new w(NJ,sJ,0),new w(-NJ,sJ,0)];class rQ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(J,$=0,Q=0.1,Z=100){vQ=this._renderer.getRenderTarget(),gQ=this._renderer.getActiveCubeFace(),mQ=this._renderer.getActiveMipmapLevel(),this._setSize(256);let K=this._allocateTargets();if(K.depthBuffer=!0,this._sceneToCubeUV(J,Q,Z,K),$>0)this._blur(K,0,0,$);return this._applyPMREM(K),this._cleanup(K),K}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=c5(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=l5(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodPlanes.length;J++)this._lodPlanes[J].dispose()}_cleanup(J){this._renderer.setRenderTarget(vQ,gQ,mQ),J.scissorTest=!1,S$(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===301||J.mapping===302)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);vQ=this._renderer.getRenderTarget(),gQ=this._renderer.getActiveCubeFace(),mQ=this._renderer.getActiveMipmapLevel();let Q=$||this._allocateTargets();return this._textureToCubeUV(J,Q),this._applyPMREM(Q),this._cleanup(Q),Q}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Q={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:"srgb-linear",depthBuffer:!1},Z=p5(J,$,Q);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=p5(J,$,Q);let{_lodMax:K}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=a1(K)),this._blurMaterial=t1(K,J,$)}return Z}_compileMaterial(J){let $=new S(this._lodPlanes[0],J);this._renderer.compile($,hQ)}_sceneToCubeUV(J,$,Q,Z){let X=new p8(90,1,$,Q),Y=[1,-1,1,1,1,1],H=[1,1,1,-1,-1,-1],q=this._renderer,U=q.autoClear,F=q.toneMapping;q.getClearColor(u5),q.toneMapping=0,q.autoClear=!1;let V=new W8({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),G=new S(new t,V),N=!1,E=J.background;if(E){if(E.isColor)V.color.copy(E),J.background=null,N=!0}else V.color.copy(u5),N=!0;for(let O=0;O<6;O++){let D=O%3;if(D===0)X.up.set(0,Y[O],0),X.lookAt(H[O],0,0);else if(D===1)X.up.set(0,0,Y[O]),X.lookAt(0,H[O],0);else X.up.set(0,Y[O],0),X.lookAt(0,0,H[O]);let R=this._cubeSize;if(S$(Z,D*R,O>2?R:0,R,R),q.setRenderTarget(Z),N)q.render(G,X);q.render(J,X)}G.geometry.dispose(),G.material.dispose(),q.toneMapping=F,q.autoClear=U,J.background=E}_textureToCubeUV(J,$){let Q=this._renderer,Z=J.mapping===301||J.mapping===302;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=c5();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=l5();let K=Z?this._cubemapMaterial:this._equirectMaterial,W=new S(this._lodPlanes[0],K),X=K.uniforms;X.envMap.value=J;let Y=this._cubeSize;S$($,0,0,3*Y,2*Y),Q.setRenderTarget($),Q.render(W,hQ)}_applyPMREM(J){let $=this._renderer,Q=$.autoClear;$.autoClear=!1;for(let Z=1;Z<this._lodPlanes.length;Z++){let K=Math.sqrt(this._sigmas[Z]*this._sigmas[Z]-this._sigmas[Z-1]*this._sigmas[Z-1]),W=d5[(Z-1)%d5.length];this._blur(J,Z-1,Z,K,W)}$.autoClear=Q}_blur(J,$,Q,Z,K){let W=this._pingPongRenderTarget;this._halfBlur(J,W,$,Q,Z,"latitudinal",K),this._halfBlur(W,J,Q,Q,Z,"longitudinal",K)}_halfBlur(J,$,Q,Z,K,W,X){let Y=this._renderer,H=this._blurMaterial;if(W!=="latitudinal"&&W!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let q=3,U=new S(this._lodPlanes[Z],H),F=H.uniforms,V=this._sizeLods[Q]-1,G=isFinite(K)?Math.PI/(2*V):2*Math.PI/(2*RJ-1),N=K/G,E=isFinite(K)?1+Math.floor(q*N):RJ;if(E>RJ)console.warn(`sigmaRadians, ${K}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${RJ}`);let O=[],D=0;for(let L=0;L<RJ;++L){let A=L/N,_=Math.exp(-A*A/2);if(O.push(_),L===0)D+=_;else if(L<E)D+=2*_}for(let L=0;L<O.length;L++)O[L]=O[L]/D;if(F.envMap.value=J.texture,F.samples.value=E,F.weights.value=O,F.latitudinal.value=W==="latitudinal",X)F.poleAxis.value=X;let{_lodMax:R}=this;F.dTheta.value=G,F.mipInt.value=R-Q;let B=this._sizeLods[Z],z=3*B*(Z>R-tJ?Z-R+tJ:0),C=4*(this._cubeSize-B);S$($,z,C,3*B,2*B),Y.setRenderTarget($),Y.render(U,hQ)}}function a1(J){let $=[],Q=[],Z=[],K=J,W=J-tJ+1+m5.length;for(let X=0;X<W;X++){let Y=Math.pow(2,K);Q.push(Y);let H=1/Y;if(X>J-tJ)H=m5[X-J+tJ-1];else if(X===0)H=0;Z.push(H);let q=1/(Y-2),U=-q,F=1+q,V=[U,U,F,U,F,F,U,U,F,F,U,F],G=6,N=6,E=3,O=2,D=1,R=new Float32Array(E*N*G),B=new Float32Array(O*N*G),z=new Float32Array(D*N*G);for(let L=0;L<G;L++){let A=L%3*2/3-1,_=L>2?0:-1,I=[A,_,0,A+0.6666666666666666,_,0,A+0.6666666666666666,_+1,0,A,_,0,A+0.6666666666666666,_+1,0,A,_+1,0];R.set(I,E*N*L),B.set(V,O*N*L);let k=[L,L,L,L,L,L];z.set(k,D*N*L)}let C=new E8;if(C.setAttribute("position",new h8(R,E)),C.setAttribute("uv",new h8(B,O)),C.setAttribute("faceIndex",new h8(z,D)),$.push(C),K>tJ)K--}return{lodPlanes:$,sizeLods:Q,sigmas:Z}}function p5(J,$,Q){let Z=new JJ(J,$,Q);return Z.texture.mapping=306,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function S$(J,$,Q,Z,K){J.viewport.set($,Q,Z,K),J.scissor.set($,Q,Z,K)}function t1(J,$,Q){let Z=new Float32Array(RJ),K=new w(0,1,0);return new $J({name:"SphericalGaussianBlur",defines:{n:RJ,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:K}},vertexShader:qZ(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function l5(){return new $J({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qZ(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function c5(){return new $J({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qZ(){return`

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
	`}function e1(J){let $=new WeakMap,Q=null;function Z(Y){if(Y&&Y.isTexture){let H=Y.mapping,q=H===303||H===304,U=H===301||H===302;if(q||U)if(Y.isRenderTargetTexture&&Y.needsPMREMUpdate===!0){Y.needsPMREMUpdate=!1;let F=$.get(Y);if(Q===null)Q=new rQ(J);return F=q?Q.fromEquirectangular(Y,F):Q.fromCubemap(Y,F),$.set(Y,F),F.texture}else if($.has(Y))return $.get(Y).texture;else{let F=Y.image;if(q&&F&&F.height>0||U&&F&&K(F)){if(Q===null)Q=new rQ(J);let V=q?Q.fromEquirectangular(Y):Q.fromCubemap(Y);return $.set(Y,V),Y.addEventListener("dispose",W),V.texture}else return null}}return Y}function K(Y){let H=0,q=6;for(let U=0;U<q;U++)if(Y[U]!==void 0)H++;return H===q}function W(Y){let H=Y.target;H.removeEventListener("dispose",W);let q=$.get(H);if(q!==void 0)$.delete(H),q.dispose()}function X(){if($=new WeakMap,Q!==null)Q.dispose(),Q=null}return{get:Z,dispose:X}}function JH(J){let $={};function Q(Z){if($[Z]!==void 0)return $[Z];let K;switch(Z){case"WEBGL_depth_texture":K=J.getExtension("WEBGL_depth_texture")||J.getExtension("MOZ_WEBGL_depth_texture")||J.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":K=J.getExtension("EXT_texture_filter_anisotropic")||J.getExtension("MOZ_EXT_texture_filter_anisotropic")||J.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":K=J.getExtension("WEBGL_compressed_texture_s3tc")||J.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":K=J.getExtension("WEBGL_compressed_texture_pvrtc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:K=J.getExtension(Z)}return $[Z]=K,K}return{has:function(Z){return Q(Z)!==null},init:function(Z){if(Z.isWebGL2)Q("EXT_color_buffer_float"),Q("WEBGL_clip_cull_distance");else Q("WEBGL_depth_texture"),Q("OES_texture_float"),Q("OES_texture_half_float"),Q("OES_texture_half_float_linear"),Q("OES_standard_derivatives"),Q("OES_element_index_uint"),Q("OES_vertex_array_object"),Q("ANGLE_instanced_arrays");Q("OES_texture_float_linear"),Q("EXT_color_buffer_half_float"),Q("WEBGL_multisampled_render_to_texture")},get:function(Z){let K=Q(Z);if(K===null)console.warn("THREE.WebGLRenderer: "+Z+" extension not supported.");return K}}}function $H(J,$,Q,Z){let K={},W=new WeakMap;function X(F){let V=F.target;if(V.index!==null)$.remove(V.index);for(let N in V.attributes)$.remove(V.attributes[N]);for(let N in V.morphAttributes){let E=V.morphAttributes[N];for(let O=0,D=E.length;O<D;O++)$.remove(E[O])}V.removeEventListener("dispose",X),delete K[V.id];let G=W.get(V);if(G)$.remove(G),W.delete(V);if(Z.releaseStatesOfGeometry(V),V.isInstancedBufferGeometry===!0)delete V._maxInstanceCount;Q.memory.geometries--}function Y(F,V){if(K[V.id]===!0)return V;return V.addEventListener("dispose",X),K[V.id]=!0,Q.memory.geometries++,V}function H(F){let V=F.attributes;for(let N in V)$.update(V[N],J.ARRAY_BUFFER);let G=F.morphAttributes;for(let N in G){let E=G[N];for(let O=0,D=E.length;O<D;O++)$.update(E[O],J.ARRAY_BUFFER)}}function q(F){let V=[],G=F.index,N=F.attributes.position,E=0;if(G!==null){let R=G.array;E=G.version;for(let B=0,z=R.length;B<z;B+=3){let C=R[B+0],L=R[B+1],A=R[B+2];V.push(C,L,L,A,A,C)}}else if(N!==void 0){let R=N.array;E=N.version;for(let B=0,z=R.length/3-1;B<z;B+=3){let C=B+0,L=B+1,A=B+2;V.push(C,L,L,A,A,C)}}else return;let O=new((A6(V))?WZ:KZ)(V,1);O.version=E;let D=W.get(F);if(D)$.remove(D);W.set(F,O)}function U(F){let V=W.get(F);if(V){let G=F.index;if(G!==null){if(V.version<G.version)q(F)}}else q(F);return W.get(F)}return{get:Y,update:H,getWireframeAttribute:U}}function QH(J,$,Q,Z){let K=Z.isWebGL2,W;function X(G){W=G}let Y,H;function q(G){Y=G.type,H=G.bytesPerElement}function U(G,N){J.drawElements(W,N,Y,G*H),Q.update(N,W,1)}function F(G,N,E){if(E===0)return;let O,D;if(K)O=J,D="drawElementsInstanced";else if(O=$.get("ANGLE_instanced_arrays"),D="drawElementsInstancedANGLE",O===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}O[D](W,N,Y,G*H,E),Q.update(N,W,E)}function V(G,N,E){if(E===0)return;let O=$.get("WEBGL_multi_draw");if(O===null)for(let D=0;D<E;D++)this.render(G[D]/H,N[D]);else{O.multiDrawElementsWEBGL(W,N,0,Y,G,0,E);let D=0;for(let R=0;R<E;R++)D+=N[R];Q.update(D,W,1)}}this.setMode=X,this.setIndex=q,this.render=U,this.renderInstances=F,this.renderMultiDraw=V}function ZH(J){let $={geometries:0,textures:0},Q={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(W,X,Y){switch(Q.calls++,X){case J.TRIANGLES:Q.triangles+=Y*(W/3);break;case J.LINES:Q.lines+=Y*(W/2);break;case J.LINE_STRIP:Q.lines+=Y*(W-1);break;case J.LINE_LOOP:Q.lines+=Y*W;break;case J.POINTS:Q.points+=Y*W;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",X);break}}function K(){Q.calls=0,Q.triangles=0,Q.points=0,Q.lines=0}return{memory:$,render:Q,programs:null,autoReset:!0,reset:K,update:Z}}function KH(J,$){return J[0]-$[0]}function WH(J,$){return Math.abs($[1])-Math.abs(J[1])}function YH(J,$,Q){let Z={},K=new Float32Array(8),W=new WeakMap,X=new O8,Y=[];for(let q=0;q<8;q++)Y[q]=[q,0];function H(q,U,F){let V=q.morphTargetInfluences;if($.isWebGL2===!0){let G=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,N=G!==void 0?G.length:0,E=W.get(U);if(E===void 0||E.count!==N){let x=function(){s.dispose(),W.delete(U),U.removeEventListener("dispose",x)};if(E!==void 0)E.texture.dispose();let R=U.morphAttributes.position!==void 0,B=U.morphAttributes.normal!==void 0,z=U.morphAttributes.color!==void 0,C=U.morphAttributes.position||[],L=U.morphAttributes.normal||[],A=U.morphAttributes.color||[],_=0;if(R===!0)_=1;if(B===!0)_=2;if(z===!0)_=3;let I=U.attributes.position.count*_,k=1;if(I>$.maxTextureSize)k=Math.ceil(I/$.maxTextureSize),I=$.maxTextureSize;let b=new Float32Array(I*k*4*N),s=new ZZ(b,I,k,N);s.type=1015,s.needsUpdate=!0;let a=_*4;for(let v=0;v<N;v++){let m=C[v],o=L[v],p=A[v],h=I*k*4*v;for(let c=0;c<m.count;c++){let J0=c*a;if(R===!0)X.fromBufferAttribute(m,c),b[h+J0+0]=X.x,b[h+J0+1]=X.y,b[h+J0+2]=X.z,b[h+J0+3]=0;if(B===!0)X.fromBufferAttribute(o,c),b[h+J0+4]=X.x,b[h+J0+5]=X.y,b[h+J0+6]=X.z,b[h+J0+7]=0;if(z===!0)X.fromBufferAttribute(p,c),b[h+J0+8]=X.x,b[h+J0+9]=X.y,b[h+J0+10]=X.z,b[h+J0+11]=p.itemSize===4?X.w:1}}E={count:N,texture:s,size:new O0(I,k)},W.set(U,E),U.addEventListener("dispose",x)}let O=0;for(let R=0;R<V.length;R++)O+=V[R];let D=U.morphTargetsRelative?1:1-O;F.getUniforms().setValue(J,"morphTargetBaseInfluence",D),F.getUniforms().setValue(J,"morphTargetInfluences",V),F.getUniforms().setValue(J,"morphTargetsTexture",E.texture,Q),F.getUniforms().setValue(J,"morphTargetsTextureSize",E.size)}else{let G=V===void 0?0:V.length,N=Z[U.id];if(N===void 0||N.length!==G){N=[];for(let B=0;B<G;B++)N[B]=[B,0];Z[U.id]=N}for(let B=0;B<G;B++){let z=N[B];z[0]=B,z[1]=V[B]}N.sort(WH);for(let B=0;B<8;B++)if(B<G&&N[B][1])Y[B][0]=N[B][0],Y[B][1]=N[B][1];else Y[B][0]=Number.MAX_SAFE_INTEGER,Y[B][1]=0;Y.sort(KH);let E=U.morphAttributes.position,O=U.morphAttributes.normal,D=0;for(let B=0;B<8;B++){let z=Y[B],C=z[0],L=z[1];if(C!==Number.MAX_SAFE_INTEGER&&L){if(E&&U.getAttribute("morphTarget"+B)!==E[C])U.setAttribute("morphTarget"+B,E[C]);if(O&&U.getAttribute("morphNormal"+B)!==O[C])U.setAttribute("morphNormal"+B,O[C]);K[B]=L,D+=L}else{if(E&&U.hasAttribute("morphTarget"+B)===!0)U.deleteAttribute("morphTarget"+B);if(O&&U.hasAttribute("morphNormal"+B)===!0)U.deleteAttribute("morphNormal"+B);K[B]=0}}let R=U.morphTargetsRelative?1:1-D;F.getUniforms().setValue(J,"morphTargetBaseInfluence",R),F.getUniforms().setValue(J,"morphTargetInfluences",K)}}return{update:H}}function XH(J,$,Q,Z){let K=new WeakMap;function W(H){let q=Z.render.frame,U=H.geometry,F=$.get(H,U);if(K.get(F)!==q)$.update(F),K.set(F,q);if(H.isInstancedMesh){if(H.hasEventListener("dispose",Y)===!1)H.addEventListener("dispose",Y);if(K.get(H)!==q){if(Q.update(H.instanceMatrix,J.ARRAY_BUFFER),H.instanceColor!==null)Q.update(H.instanceColor,J.ARRAY_BUFFER);K.set(H,q)}}if(H.isSkinnedMesh){let V=H.skeleton;if(K.get(V)!==q)V.update(),K.set(V,q)}return F}function X(){K=new WeakMap}function Y(H){let q=H.target;if(q.removeEventListener("dispose",Y),Q.remove(q.instanceMatrix),q.instanceColor!==null)Q.remove(q.instanceColor)}return{update:W,dispose:X}}class UZ extends a8{constructor(J,$,Q,Z,K,W,X,Y,H,q){if(q=q!==void 0?q:1026,q!==1026&&q!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(Q===void 0&&q===1026)Q=1014;if(Q===void 0&&q===1027)Q=1020;super(null,Z,K,W,X,Y,q,Q,H);this.isDepthTexture=!0,this.image={width:J,height:$},this.magFilter=X!==void 0?X:1003,this.minFilter=Y!==void 0?Y:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);if(this.compareFunction!==null)$.compareFunction=this.compareFunction;return $}}var j6=new a8,x6=new UZ(1,1);x6.compareFunction=515;var y6=new ZZ,b6=new k6,f6=new XZ,n5=[],s5=[],i5=new Float32Array(16),o5=new Float32Array(9),r5=new Float32Array(4);function Y7(J,$,Q){let Z=J[0];if(Z<=0||Z>0)return J;let K=$*Q,W=n5[K];if(W===void 0)W=new Float32Array(K),n5[K]=W;if($!==0){Z.toArray(W,0);for(let X=1,Y=0;X!==$;++X)Y+=Q,J[X].toArray(W,Y)}return W}function w8(J,$){if(J.length!==$.length)return!1;for(let Q=0,Z=J.length;Q<Z;Q++)if(J[Q]!==$[Q])return!1;return!0}function _8(J,$){for(let Q=0,Z=$.length;Q<Z;Q++)J[Q]=$[Q]}function c$(J,$){let Q=s5[$];if(Q===void 0)Q=new Int32Array($),s5[$]=Q;for(let Z=0;Z!==$;++Z)Q[Z]=J.allocateTextureUnit();return Q}function HH(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1f(this.addr,$),Q[0]=$}function qH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(w8(Q,$))return;J.uniform2fv(this.addr,$),_8(Q,$)}}function UH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else if($.r!==void 0){if(Q[0]!==$.r||Q[1]!==$.g||Q[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Q[0]=$.r,Q[1]=$.g,Q[2]=$.b}else{if(w8(Q,$))return;J.uniform3fv(this.addr,$),_8(Q,$)}}function FH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(w8(Q,$))return;J.uniform4fv(this.addr,$),_8(Q,$)}}function VH(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(w8(Q,$))return;J.uniformMatrix2fv(this.addr,!1,$),_8(Q,$)}else{if(w8(Q,Z))return;r5.set(Z),J.uniformMatrix2fv(this.addr,!1,r5),_8(Q,Z)}}function GH(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(w8(Q,$))return;J.uniformMatrix3fv(this.addr,!1,$),_8(Q,$)}else{if(w8(Q,Z))return;o5.set(Z),J.uniformMatrix3fv(this.addr,!1,o5),_8(Q,Z)}}function OH(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(w8(Q,$))return;J.uniformMatrix4fv(this.addr,!1,$),_8(Q,$)}else{if(w8(Q,Z))return;i5.set(Z),J.uniformMatrix4fv(this.addr,!1,i5),_8(Q,Z)}}function DH(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1i(this.addr,$),Q[0]=$}function EH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(w8(Q,$))return;J.uniform2iv(this.addr,$),_8(Q,$)}}function NH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(w8(Q,$))return;J.uniform3iv(this.addr,$),_8(Q,$)}}function RH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(w8(Q,$))return;J.uniform4iv(this.addr,$),_8(Q,$)}}function BH(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1ui(this.addr,$),Q[0]=$}function zH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(w8(Q,$))return;J.uniform2uiv(this.addr,$),_8(Q,$)}}function IH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(w8(Q,$))return;J.uniform3uiv(this.addr,$),_8(Q,$)}}function LH(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(w8(Q,$))return;J.uniform4uiv(this.addr,$),_8(Q,$)}}function CH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let W=this.type===J.SAMPLER_2D_SHADOW?x6:j6;Q.setTexture2D($||W,K)}function AH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture3D($||b6,K)}function MH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTextureCube($||f6,K)}function kH(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture2DArray($||y6,K)}function PH(J){switch(J){case 5126:return HH;case 35664:return qH;case 35665:return UH;case 35666:return FH;case 35674:return VH;case 35675:return GH;case 35676:return OH;case 5124:case 35670:return DH;case 35667:case 35671:return EH;case 35668:case 35672:return NH;case 35669:case 35673:return RH;case 5125:return BH;case 36294:return zH;case 36295:return IH;case 36296:return LH;case 35678:case 36198:case 36298:case 36306:case 35682:return CH;case 35679:case 36299:case 36307:return AH;case 35680:case 36300:case 36308:case 36293:return MH;case 36289:case 36303:case 36311:case 36292:return kH}}function SH(J,$){J.uniform1fv(this.addr,$)}function wH(J,$){let Q=Y7($,this.size,2);J.uniform2fv(this.addr,Q)}function _H(J,$){let Q=Y7($,this.size,3);J.uniform3fv(this.addr,Q)}function TH(J,$){let Q=Y7($,this.size,4);J.uniform4fv(this.addr,Q)}function jH(J,$){let Q=Y7($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Q)}function xH(J,$){let Q=Y7($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Q)}function yH(J,$){let Q=Y7($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Q)}function bH(J,$){J.uniform1iv(this.addr,$)}function fH(J,$){J.uniform2iv(this.addr,$)}function hH(J,$){J.uniform3iv(this.addr,$)}function vH(J,$){J.uniform4iv(this.addr,$)}function gH(J,$){J.uniform1uiv(this.addr,$)}function mH(J,$){J.uniform2uiv(this.addr,$)}function uH(J,$){J.uniform3uiv(this.addr,$)}function dH(J,$){J.uniform4uiv(this.addr,$)}function pH(J,$,Q){let Z=this.cache,K=$.length,W=c$(Q,K);if(!w8(Z,W))J.uniform1iv(this.addr,W),_8(Z,W);for(let X=0;X!==K;++X)Q.setTexture2D($[X]||j6,W[X])}function lH(J,$,Q){let Z=this.cache,K=$.length,W=c$(Q,K);if(!w8(Z,W))J.uniform1iv(this.addr,W),_8(Z,W);for(let X=0;X!==K;++X)Q.setTexture3D($[X]||b6,W[X])}function cH(J,$,Q){let Z=this.cache,K=$.length,W=c$(Q,K);if(!w8(Z,W))J.uniform1iv(this.addr,W),_8(Z,W);for(let X=0;X!==K;++X)Q.setTextureCube($[X]||f6,W[X])}function nH(J,$,Q){let Z=this.cache,K=$.length,W=c$(Q,K);if(!w8(Z,W))J.uniform1iv(this.addr,W),_8(Z,W);for(let X=0;X!==K;++X)Q.setTexture2DArray($[X]||y6,W[X])}function sH(J){switch(J){case 5126:return SH;case 35664:return wH;case 35665:return _H;case 35666:return TH;case 35674:return jH;case 35675:return xH;case 35676:return yH;case 5124:case 35670:return bH;case 35667:case 35671:return fH;case 35668:case 35672:return hH;case 35669:case 35673:return vH;case 5125:return gH;case 36294:return mH;case 36295:return uH;case 36296:return dH;case 35678:case 36198:case 36298:case 36306:case 35682:return pH;case 35679:case 36299:case 36307:return lH;case 35680:case 36300:case 36308:case 36293:return cH;case 36289:case 36303:case 36311:case 36292:return nH}}class h6{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.setValue=PH($.type)}}class v6{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=sH($.type)}}class g6{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Q){let Z=this.seq;for(let K=0,W=Z.length;K!==W;++K){let X=Z[K];X.setValue(J,$[X.id],Q)}}}var uQ=/(\w+)(\])?(\[|\.)?/g;function a5(J,$){J.seq.push($),J.map[$.id]=$}function iH(J,$,Q){let Z=J.name,K=Z.length;uQ.lastIndex=0;while(!0){let W=uQ.exec(Z),X=uQ.lastIndex,Y=W[1],H=W[2]==="]",q=W[3];if(H)Y=Y|0;if(q===void 0||q==="["&&X+2===K){a5(Q,q===void 0?new h6(Y,J,$):new v6(Y,J,$));break}else{let F=Q.map[Y];if(F===void 0)F=new g6(Y),a5(Q,F);Q=F}}}class y7{constructor(J,$){this.seq=[],this.map={};let Q=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let Z=0;Z<Q;++Z){let K=J.getActiveUniform($,Z),W=J.getUniformLocation($,K.name);iH(K,W,this)}}setValue(J,$,Q,Z){let K=this.map[$];if(K!==void 0)K.setValue(J,Q,Z)}setOptional(J,$,Q){let Z=$[Q];if(Z!==void 0)this.setValue(J,Q,Z)}static upload(J,$,Q,Z){for(let K=0,W=$.length;K!==W;++K){let X=$[K],Y=Q[X.id];if(Y.needsUpdate!==!1)X.setValue(J,Y.value,Z)}}static seqWithValue(J,$){let Q=[];for(let Z=0,K=J.length;Z!==K;++Z){let W=J[Z];if(W.id in $)Q.push(W)}return Q}}function t5(J,$,Q){let Z=J.createShader($);return J.shaderSource(Z,Q),J.compileShader(Z),Z}var oH=37297,rH=0;function aH(J,$){let Q=J.split(`
`),Z=[],K=Math.max($-6,0),W=Math.min($+6,Q.length);for(let X=K;X<W;X++){let Y=X+1;Z.push(`${Y===$?">":" "} ${Y}: ${Q[X]}`)}return Z.join(`
`)}function tH(J){let $=K8.getPrimaries(K8.workingColorSpace),Q=K8.getPrimaries(J),Z;if($===Q)Z="";else if($==="p3"&&Q==="rec709")Z="LinearDisplayP3ToLinearSRGB";else if($==="rec709"&&Q==="p3")Z="LinearSRGBToLinearDisplayP3";switch(J){case"srgb-linear":case"display-p3-linear":return[Z,"LinearTransferOETF"];case"srgb":case"display-p3":return[Z,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",J),[Z,"LinearTransferOETF"]}}function e5(J,$,Q){let Z=J.getShaderParameter($,J.COMPILE_STATUS),K=J.getShaderInfoLog($).trim();if(Z&&K==="")return"";let W=/ERROR: 0:(\d+)/.exec(K);if(W){let X=parseInt(W[1]);return Q.toUpperCase()+`

`+K+`

`+aH(J.getShaderSource($),X)}else return K}function eH(J,$){let Q=tH($);return`vec4 ${J}( vec4 value ) { return ${Q[0]}( ${Q[1]}( value ) ); }`}function Jq(J,$){let Q;switch($){case 1:Q="Linear";break;case 2:Q="Reinhard";break;case 3:Q="OptimizedCineon";break;case 4:Q="ACESFilmic";break;case 6:Q="AgX";break;case 5:Q="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",$),Q="Linear"}return"vec3 "+J+"( vec3 color ) { return "+Q+"ToneMapping( color ); }"}function $q(J){return[J.extensionDerivatives||!!J.envMapCubeUVHeight||J.bumpMap||J.normalMapTangentSpace||J.clearcoatNormalMap||J.flatShading||J.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(J.extensionFragDepth||J.logarithmicDepthBuffer)&&J.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",J.extensionDrawBuffers&&J.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(J.extensionShaderTextureLOD||J.envMap||J.transmission)&&J.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(eJ).join(`
`)}function Qq(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(eJ).join(`
`)}function Zq(J){let $=[];for(let Q in J){let Z=J[Q];if(Z===!1)continue;$.push("#define "+Q+" "+Z)}return $.join(`
`)}function Kq(J,$){let Q={},Z=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let W=J.getActiveAttrib($,K),X=W.name,Y=1;if(W.type===J.FLOAT_MAT2)Y=2;if(W.type===J.FLOAT_MAT3)Y=3;if(W.type===J.FLOAT_MAT4)Y=4;Q[X]={type:W.type,location:J.getAttribLocation($,X),locationSize:Y}}return Q}function eJ(J){return J!==""}function J6(J,$){let Q=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Q).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function $6(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var Wq=/^[ \t]*#include +<([\w\d./]+)>/gm;function aQ(J){return J.replace(Wq,Xq)}var Yq=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Xq(J,$){let Q=n0[$];if(Q===void 0){let Z=Yq.get($);if(Z!==void 0)Q=n0[Z],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,Z);else throw Error("Can not resolve #include <"+$+">")}return aQ(Q)}var Hq=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Q6(J){return J.replace(Hq,qq)}function qq(J,$,Q,Z){let K="";for(let W=parseInt($);W<parseInt(Q);W++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+W+" ]").replace(/UNROLLED_LOOP_INDEX/g,W);return K}function Z6(J){let $="precision "+J.precision+` float;
precision `+J.precision+" int;";if(J.precision==="highp")$+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")$+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")$+=`
#define LOW_PRECISION`;return $}function Uq(J){let $="SHADOWMAP_TYPE_BASIC";if(J.shadowMapType===1)$="SHADOWMAP_TYPE_PCF";else if(J.shadowMapType===2)$="SHADOWMAP_TYPE_PCF_SOFT";else if(J.shadowMapType===3)$="SHADOWMAP_TYPE_VSM";return $}function Fq(J){let $="ENVMAP_TYPE_CUBE";if(J.envMap)switch(J.envMapMode){case 301:case 302:$="ENVMAP_TYPE_CUBE";break;case 306:$="ENVMAP_TYPE_CUBE_UV";break}return $}function Vq(J){let $="ENVMAP_MODE_REFLECTION";if(J.envMap)switch(J.envMapMode){case 302:$="ENVMAP_MODE_REFRACTION";break}return $}function Gq(J){let $="ENVMAP_BLENDING_NONE";if(J.envMap)switch(J.combine){case 0:$="ENVMAP_BLENDING_MULTIPLY";break;case 1:$="ENVMAP_BLENDING_MIX";break;case 2:$="ENVMAP_BLENDING_ADD";break}return $}function Oq(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Q=Math.log2($)-2,Z=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Q),112)),texelHeight:Z,maxMip:Q}}function Dq(J,$,Q,Z){let K=J.getContext(),W=Q.defines,X=Q.vertexShader,Y=Q.fragmentShader,H=Uq(Q),q=Fq(Q),U=Vq(Q),F=Gq(Q),V=Oq(Q),G=Q.isWebGL2?"":$q(Q),N=Qq(Q),E=Zq(W),O=K.createProgram(),D,R,B=Q.glslVersion?"#version "+Q.glslVersion+`
`:"";if(Q.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E].filter(eJ).join(`
`),D.length>0)D+=`
`;if(R=[G,"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E].filter(eJ).join(`
`),R.length>0)R+=`
`}else D=[Z6(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E,Q.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Q.batching?"#define USE_BATCHING":"",Q.instancing?"#define USE_INSTANCING":"",Q.instancingColor?"#define USE_INSTANCING_COLOR":"",Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.map?"#define USE_MAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+U:"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.displacementMap?"#define USE_DISPLACEMENTMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.mapUv?"#define MAP_UV "+Q.mapUv:"",Q.alphaMapUv?"#define ALPHAMAP_UV "+Q.alphaMapUv:"",Q.lightMapUv?"#define LIGHTMAP_UV "+Q.lightMapUv:"",Q.aoMapUv?"#define AOMAP_UV "+Q.aoMapUv:"",Q.emissiveMapUv?"#define EMISSIVEMAP_UV "+Q.emissiveMapUv:"",Q.bumpMapUv?"#define BUMPMAP_UV "+Q.bumpMapUv:"",Q.normalMapUv?"#define NORMALMAP_UV "+Q.normalMapUv:"",Q.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Q.displacementMapUv:"",Q.metalnessMapUv?"#define METALNESSMAP_UV "+Q.metalnessMapUv:"",Q.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Q.roughnessMapUv:"",Q.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Q.anisotropyMapUv:"",Q.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Q.clearcoatMapUv:"",Q.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Q.clearcoatNormalMapUv:"",Q.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Q.clearcoatRoughnessMapUv:"",Q.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Q.iridescenceMapUv:"",Q.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Q.iridescenceThicknessMapUv:"",Q.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Q.sheenColorMapUv:"",Q.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Q.sheenRoughnessMapUv:"",Q.specularMapUv?"#define SPECULARMAP_UV "+Q.specularMapUv:"",Q.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Q.specularColorMapUv:"",Q.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Q.specularIntensityMapUv:"",Q.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Q.transmissionMapUv:"",Q.thicknessMapUv?"#define THICKNESSMAP_UV "+Q.thicknessMapUv:"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexColors?"#define USE_COLOR":"",Q.vertexAlphas?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.flatShading?"#define FLAT_SHADED":"",Q.skinning?"#define USE_SKINNING":"",Q.morphTargets?"#define USE_MORPHTARGETS":"",Q.morphNormals&&Q.flatShading===!1?"#define USE_MORPHNORMALS":"",Q.morphColors&&Q.isWebGL2?"#define USE_MORPHCOLORS":"",Q.morphTargetsCount>0&&Q.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",Q.morphTargetsCount>0&&Q.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+Q.morphTextureStride:"",Q.morphTargetsCount>0&&Q.isWebGL2?"#define MORPHTARGETS_COUNT "+Q.morphTargetsCount:"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+H:"",Q.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.useLegacyLights?"#define LEGACY_LIGHTS":"",Q.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Q.logarithmicDepthBuffer&&Q.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(eJ).join(`
`),R=[G,Z6(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,E,Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.map?"#define USE_MAP":"",Q.matcap?"#define USE_MATCAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+q:"",Q.envMap?"#define "+U:"",Q.envMap?"#define "+F:"",V?"#define CUBEUV_TEXEL_WIDTH "+V.texelWidth:"",V?"#define CUBEUV_TEXEL_HEIGHT "+V.texelHeight:"",V?"#define CUBEUV_MAX_MIP "+V.maxMip+".0":"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoat?"#define USE_CLEARCOAT":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.iridescence?"#define USE_IRIDESCENCE":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaTest?"#define USE_ALPHATEST":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.sheen?"#define USE_SHEEN":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexColors||Q.instancingColor?"#define USE_COLOR":"",Q.vertexAlphas?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.gradientMap?"#define USE_GRADIENTMAP":"",Q.flatShading?"#define FLAT_SHADED":"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+H:"",Q.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.useLegacyLights?"#define LEGACY_LIGHTS":"",Q.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Q.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Q.logarithmicDepthBuffer&&Q.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Q.toneMapping!==0?"#define TONE_MAPPING":"",Q.toneMapping!==0?n0.tonemapping_pars_fragment:"",Q.toneMapping!==0?Jq("toneMapping",Q.toneMapping):"",Q.dithering?"#define DITHERING":"",Q.opaque?"#define OPAQUE":"",n0.colorspace_pars_fragment,eH("linearToOutputTexel",Q.outputColorSpace),Q.useDepthPacking?"#define DEPTH_PACKING "+Q.depthPacking:"",`
`].filter(eJ).join(`
`);if(X=aQ(X),X=J6(X,Q),X=$6(X,Q),Y=aQ(Y),Y=J6(Y,Q),Y=$6(Y,Q),X=Q6(X),Y=Q6(Y),Q.isWebGL2&&Q.isRawShaderMaterial!==!0)B=`#version 300 es
`,D=[N,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,R=["precision mediump sampler2DArray;","#define varying in",Q.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",Q.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+R;let z=B+D+X,C=B+R+Y,L=t5(K,K.VERTEX_SHADER,z),A=t5(K,K.FRAGMENT_SHADER,C);if(K.attachShader(O,L),K.attachShader(O,A),Q.index0AttributeName!==void 0)K.bindAttribLocation(O,0,Q.index0AttributeName);else if(Q.morphTargets===!0)K.bindAttribLocation(O,0,"position");K.linkProgram(O);function _(s){if(J.debug.checkShaderErrors){let a=K.getProgramInfoLog(O).trim(),x=K.getShaderInfoLog(L).trim(),v=K.getShaderInfoLog(A).trim(),m=!0,o=!0;if(K.getProgramParameter(O,K.LINK_STATUS)===!1)if(m=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,O,L,A);else{let p=e5(K,L,"vertex"),h=e5(K,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(O,K.VALIDATE_STATUS)+`

Program Info Log: `+a+`
`+p+`
`+h)}else if(a!=="")console.warn("THREE.WebGLProgram: Program Info Log:",a);else if(x===""||v==="")o=!1;if(o)s.diagnostics={runnable:m,programLog:a,vertexShader:{log:x,prefix:D},fragmentShader:{log:v,prefix:R}}}K.deleteShader(L),K.deleteShader(A),I=new y7(K,O),k=Kq(K,O)}let I;this.getUniforms=function(){if(I===void 0)_(this);return I};let k;this.getAttributes=function(){if(k===void 0)_(this);return k};let b=Q.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(b===!1)b=K.getProgramParameter(O,oH);return b},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(O),this.program=void 0},this.type=Q.shaderType,this.name=Q.shaderName,this.id=rH++,this.cacheKey=$,this.usedTimes=1,this.program=O,this.vertexShader=L,this.fragmentShader=A,this}var Eq=0;class m6{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:$,fragmentShader:Q}=J,Z=this._getShaderStage($),K=this._getShaderStage(Q),W=this._getShaderCacheForMaterial(J);if(W.has(Z)===!1)W.add(Z),Z.usedTimes++;if(W.has(K)===!1)W.add(K),K.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Q of $)if(Q.usedTimes--,Q.usedTimes===0)this.shaderCache.delete(Q.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Q=$.get(J);if(Q===void 0)Q=new Set,$.set(J,Q);return Q}_getShaderStage(J){let $=this.shaderCache,Q=$.get(J);if(Q===void 0)Q=new u6(J),$.set(J,Q);return Q}}class u6{constructor(J){this.id=Eq++,this.code=J,this.usedTimes=0}}function Nq(J,$,Q,Z,K,W,X){let Y=new p$,H=new m6,q=[],U=K.isWebGL2,F=K.logarithmicDepthBuffer,V=K.vertexTextures,G=K.precision,N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(I){if(I===0)return"uv";return`uv${I}`}function O(I,k,b,s,a){let x=s.fog,v=a.geometry,m=I.isMeshStandardMaterial?s.environment:null,o=(I.isMeshStandardMaterial?Q:$).get(I.envMap||m),p=!!o&&o.mapping===306?o.image.height:null,h=N[I.type];if(I.precision!==null){if(G=K.getMaxPrecision(I.precision),G!==I.precision)console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",G,"instead.")}let c=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,J0=c!==void 0?c.length:0,f=0;if(v.morphAttributes.position!==void 0)f=1;if(v.morphAttributes.normal!==void 0)f=2;if(v.morphAttributes.color!==void 0)f=3;let e,Z0,W0,G0;if(h){let M8=C9[h];e=M8.vertexShader,Z0=M8.fragmentShader}else e=I.vertexShader,Z0=I.fragmentShader,H.update(I),W0=H.getVertexShaderID(I),G0=H.getFragmentShaderID(I);let S0=J.getRenderTarget(),x0=a.isInstancedMesh===!0,_0=a.isBatchedMesh===!0,m0=!!I.map,g=!!I.matcap,q8=!!o,d0=!!I.aoMap,L0=!!I.lightMap,P0=!!I.bumpMap,f0=!!I.normalMap,k0=!!I.displacementMap,j0=!!I.emissiveMap,T=!!I.metalnessMap,M=!!I.roughnessMap,l=I.anisotropy>0,X0=I.clearcoat>0,Q0=I.iridescence>0,Y0=I.sheen>0,T0=I.transmission>0,q0=l&&!!I.anisotropyMap,z0=X0&&!!I.clearcoatMap,M0=X0&&!!I.clearcoatNormalMap,v0=X0&&!!I.clearcoatRoughnessMap,K0=Q0&&!!I.iridescenceMap,G8=Q0&&!!I.iridescenceThicknessMap,p0=Y0&&!!I.sheenColorMap,y0=Y0&&!!I.sheenRoughnessMap,B0=!!I.specularMap,j=!!I.specularColorMap,$0=!!I.specularIntensityMap,U0=T0&&!!I.transmissionMap,R0=T0&&!!I.thicknessMap,u0=!!I.gradientMap,H0=!!I.alphaMap,y=I.alphaTest>0,E0=!!I.alphaHash,N0=!!I.extensions,b0=!!v.attributes.uv1,A0=!!v.attributes.uv2,r0=!!v.attributes.uv3,$8=0;if(I.toneMapped){if(S0===null||S0.isXRRenderTarget===!0)$8=J.toneMapping}return{isWebGL2:U,shaderID:h,shaderType:I.type,shaderName:I.name,vertexShader:e,fragmentShader:Z0,defines:I.defines,customVertexShaderID:W0,customFragmentShaderID:G0,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:G,batching:_0,instancing:x0,instancingColor:x0&&a.instanceColor!==null,supportsVertexTextures:V,outputColorSpace:S0===null?J.outputColorSpace:S0.isXRRenderTarget===!0?S0.texture.colorSpace:"srgb-linear",map:m0,matcap:g,envMap:q8,envMapMode:q8&&o.mapping,envMapCubeUVHeight:p,aoMap:d0,lightMap:L0,bumpMap:P0,normalMap:f0,displacementMap:V&&k0,emissiveMap:j0,normalMapObjectSpace:f0&&I.normalMapType===1,normalMapTangentSpace:f0&&I.normalMapType===0,metalnessMap:T,roughnessMap:M,anisotropy:l,anisotropyMap:q0,clearcoat:X0,clearcoatMap:z0,clearcoatNormalMap:M0,clearcoatRoughnessMap:v0,iridescence:Q0,iridescenceMap:K0,iridescenceThicknessMap:G8,sheen:Y0,sheenColorMap:p0,sheenRoughnessMap:y0,specularMap:B0,specularColorMap:j,specularIntensityMap:$0,transmission:T0,transmissionMap:U0,thicknessMap:R0,gradientMap:u0,opaque:I.transparent===!1&&I.blending===1,alphaMap:H0,alphaTest:y,alphaHash:E0,combine:I.combine,mapUv:m0&&E(I.map.channel),aoMapUv:d0&&E(I.aoMap.channel),lightMapUv:L0&&E(I.lightMap.channel),bumpMapUv:P0&&E(I.bumpMap.channel),normalMapUv:f0&&E(I.normalMap.channel),displacementMapUv:k0&&E(I.displacementMap.channel),emissiveMapUv:j0&&E(I.emissiveMap.channel),metalnessMapUv:T&&E(I.metalnessMap.channel),roughnessMapUv:M&&E(I.roughnessMap.channel),anisotropyMapUv:q0&&E(I.anisotropyMap.channel),clearcoatMapUv:z0&&E(I.clearcoatMap.channel),clearcoatNormalMapUv:M0&&E(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:v0&&E(I.clearcoatRoughnessMap.channel),iridescenceMapUv:K0&&E(I.iridescenceMap.channel),iridescenceThicknessMapUv:G8&&E(I.iridescenceThicknessMap.channel),sheenColorMapUv:p0&&E(I.sheenColorMap.channel),sheenRoughnessMapUv:y0&&E(I.sheenRoughnessMap.channel),specularMapUv:B0&&E(I.specularMap.channel),specularColorMapUv:j&&E(I.specularColorMap.channel),specularIntensityMapUv:$0&&E(I.specularIntensityMap.channel),transmissionMapUv:U0&&E(I.transmissionMap.channel),thicknessMapUv:R0&&E(I.thicknessMap.channel),alphaMapUv:H0&&E(I.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(f0||l),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,vertexUv1s:b0,vertexUv2s:A0,vertexUv3s:r0,pointsUvs:a.isPoints===!0&&!!v.attributes.uv&&(m0||H0),fog:!!x,useFog:I.fog===!0,fogExp2:x&&x.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:F,skinning:a.isSkinnedMesh===!0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:J0,morphTextureStride:f,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numClippingPlanes:X.numPlanes,numClipIntersection:X.numIntersection,dithering:I.dithering,shadowMapEnabled:J.shadowMap.enabled&&b.length>0,shadowMapType:J.shadowMap.type,toneMapping:$8,useLegacyLights:J._useLegacyLights,decodeVideoTexture:m0&&I.map.isVideoTexture===!0&&K8.getTransfer(I.map.colorSpace)==="srgb",premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===2,flipSided:I.side===1,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionDerivatives:N0&&I.extensions.derivatives===!0,extensionFragDepth:N0&&I.extensions.fragDepth===!0,extensionDrawBuffers:N0&&I.extensions.drawBuffers===!0,extensionShaderTextureLOD:N0&&I.extensions.shaderTextureLOD===!0,extensionClipCullDistance:N0&&I.extensions.clipCullDistance&&Z.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:U||Z.has("EXT_frag_depth"),rendererExtensionDrawBuffers:U||Z.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:U||Z.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:Z.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()}}function D(I){let k=[];if(I.shaderID)k.push(I.shaderID);else k.push(I.customVertexShaderID),k.push(I.customFragmentShaderID);if(I.defines!==void 0)for(let b in I.defines)k.push(b),k.push(I.defines[b]);if(I.isRawShaderMaterial===!1)R(k,I),B(k,I),k.push(J.outputColorSpace);return k.push(I.customProgramCacheKey),k.join()}function R(I,k){I.push(k.precision),I.push(k.outputColorSpace),I.push(k.envMapMode),I.push(k.envMapCubeUVHeight),I.push(k.mapUv),I.push(k.alphaMapUv),I.push(k.lightMapUv),I.push(k.aoMapUv),I.push(k.bumpMapUv),I.push(k.normalMapUv),I.push(k.displacementMapUv),I.push(k.emissiveMapUv),I.push(k.metalnessMapUv),I.push(k.roughnessMapUv),I.push(k.anisotropyMapUv),I.push(k.clearcoatMapUv),I.push(k.clearcoatNormalMapUv),I.push(k.clearcoatRoughnessMapUv),I.push(k.iridescenceMapUv),I.push(k.iridescenceThicknessMapUv),I.push(k.sheenColorMapUv),I.push(k.sheenRoughnessMapUv),I.push(k.specularMapUv),I.push(k.specularColorMapUv),I.push(k.specularIntensityMapUv),I.push(k.transmissionMapUv),I.push(k.thicknessMapUv),I.push(k.combine),I.push(k.fogExp2),I.push(k.sizeAttenuation),I.push(k.morphTargetsCount),I.push(k.morphAttributeCount),I.push(k.numDirLights),I.push(k.numPointLights),I.push(k.numSpotLights),I.push(k.numSpotLightMaps),I.push(k.numHemiLights),I.push(k.numRectAreaLights),I.push(k.numDirLightShadows),I.push(k.numPointLightShadows),I.push(k.numSpotLightShadows),I.push(k.numSpotLightShadowsWithMaps),I.push(k.numLightProbes),I.push(k.shadowMapType),I.push(k.toneMapping),I.push(k.numClippingPlanes),I.push(k.numClipIntersection),I.push(k.depthPacking)}function B(I,k){if(Y.disableAll(),k.isWebGL2)Y.enable(0);if(k.supportsVertexTextures)Y.enable(1);if(k.instancing)Y.enable(2);if(k.instancingColor)Y.enable(3);if(k.matcap)Y.enable(4);if(k.envMap)Y.enable(5);if(k.normalMapObjectSpace)Y.enable(6);if(k.normalMapTangentSpace)Y.enable(7);if(k.clearcoat)Y.enable(8);if(k.iridescence)Y.enable(9);if(k.alphaTest)Y.enable(10);if(k.vertexColors)Y.enable(11);if(k.vertexAlphas)Y.enable(12);if(k.vertexUv1s)Y.enable(13);if(k.vertexUv2s)Y.enable(14);if(k.vertexUv3s)Y.enable(15);if(k.vertexTangents)Y.enable(16);if(k.anisotropy)Y.enable(17);if(k.alphaHash)Y.enable(18);if(k.batching)Y.enable(19);if(I.push(Y.mask),Y.disableAll(),k.fog)Y.enable(0);if(k.useFog)Y.enable(1);if(k.flatShading)Y.enable(2);if(k.logarithmicDepthBuffer)Y.enable(3);if(k.skinning)Y.enable(4);if(k.morphTargets)Y.enable(5);if(k.morphNormals)Y.enable(6);if(k.morphColors)Y.enable(7);if(k.premultipliedAlpha)Y.enable(8);if(k.shadowMapEnabled)Y.enable(9);if(k.useLegacyLights)Y.enable(10);if(k.doubleSided)Y.enable(11);if(k.flipSided)Y.enable(12);if(k.useDepthPacking)Y.enable(13);if(k.dithering)Y.enable(14);if(k.transmission)Y.enable(15);if(k.sheen)Y.enable(16);if(k.opaque)Y.enable(17);if(k.pointsUvs)Y.enable(18);if(k.decodeVideoTexture)Y.enable(19);I.push(Y.mask)}function z(I){let k=N[I.type],b;if(k){let s=C9[k];b=YY.clone(s.uniforms)}else b=I.uniforms;return b}function C(I,k){let b;for(let s=0,a=q.length;s<a;s++){let x=q[s];if(x.cacheKey===k){b=x,++b.usedTimes;break}}if(b===void 0)b=new Dq(J,k,I,W),q.push(b);return b}function L(I){if(--I.usedTimes===0){let k=q.indexOf(I);q[k]=q[q.length-1],q.pop(),I.destroy()}}function A(I){H.remove(I)}function _(){H.dispose()}return{getParameters:O,getProgramCacheKey:D,getUniforms:z,acquireProgram:C,releaseProgram:L,releaseShaderCache:A,programs:q,dispose:_}}function Rq(){let J=new WeakMap;function $(W){let X=J.get(W);if(X===void 0)X={},J.set(W,X);return X}function Q(W){J.delete(W)}function Z(W,X,Y){J.get(W)[X]=Y}function K(){J=new WeakMap}return{get:$,remove:Q,update:Z,dispose:K}}function Bq(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function K6(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function W6(){let J=[],$=0,Q=[],Z=[],K=[];function W(){$=0,Q.length=0,Z.length=0,K.length=0}function X(F,V,G,N,E,O){let D=J[$];if(D===void 0)D={id:F.id,object:F,geometry:V,material:G,groupOrder:N,renderOrder:F.renderOrder,z:E,group:O},J[$]=D;else D.id=F.id,D.object=F,D.geometry=V,D.material=G,D.groupOrder=N,D.renderOrder=F.renderOrder,D.z=E,D.group=O;return $++,D}function Y(F,V,G,N,E,O){let D=X(F,V,G,N,E,O);if(G.transmission>0)Z.push(D);else if(G.transparent===!0)K.push(D);else Q.push(D)}function H(F,V,G,N,E,O){let D=X(F,V,G,N,E,O);if(G.transmission>0)Z.unshift(D);else if(G.transparent===!0)K.unshift(D);else Q.unshift(D)}function q(F,V){if(Q.length>1)Q.sort(F||Bq);if(Z.length>1)Z.sort(V||K6);if(K.length>1)K.sort(V||K6)}function U(){for(let F=$,V=J.length;F<V;F++){let G=J[F];if(G.id===null)break;G.id=null,G.object=null,G.geometry=null,G.material=null,G.group=null}}return{opaque:Q,transmissive:Z,transparent:K,init:W,push:Y,unshift:H,finish:U,sort:q}}function zq(){let J=new WeakMap;function $(Z,K){let W=J.get(Z),X;if(W===void 0)X=new W6,J.set(Z,[X]);else if(K>=W.length)X=new W6,W.push(X);else X=W[K];return X}function Q(){J=new WeakMap}return{get:$,dispose:Q}}function Iq(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"DirectionalLight":Q={direction:new w,color:new t0};break;case"SpotLight":Q={position:new w,direction:new w,color:new t0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Q={position:new w,color:new t0,distance:0,decay:0};break;case"HemisphereLight":Q={direction:new w,skyColor:new t0,groundColor:new t0};break;case"RectAreaLight":Q={color:new t0,position:new w,halfWidth:new w,halfHeight:new w};break}return J[$.id]=Q,Q}}}function Lq(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"DirectionalLight":Q={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new O0};break;case"SpotLight":Q={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new O0};break;case"PointLight":Q={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new O0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Q,Q}}}var Cq=0;function Aq(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function Mq(J,$){let Q=new Iq,Z=Lq(),K={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)K.probe.push(new w);let W=new w,X=new H8,Y=new H8;function H(U,F){let V=0,G=0,N=0;for(let s=0;s<9;s++)K.probe[s].set(0,0,0);let E=0,O=0,D=0,R=0,B=0,z=0,C=0,L=0,A=0,_=0,I=0;U.sort(Aq);let k=F===!0?Math.PI:1;for(let s=0,a=U.length;s<a;s++){let x=U[s],v=x.color,m=x.intensity,o=x.distance,p=x.shadow&&x.shadow.map?x.shadow.map.texture:null;if(x.isAmbientLight)V+=v.r*m*k,G+=v.g*m*k,N+=v.b*m*k;else if(x.isLightProbe){for(let h=0;h<9;h++)K.probe[h].addScaledVector(x.sh.coefficients[h],m);I++}else if(x.isDirectionalLight){let h=Q.get(x);if(h.color.copy(x.color).multiplyScalar(x.intensity*k),x.castShadow){let c=x.shadow,J0=Z.get(x);J0.shadowBias=c.bias,J0.shadowNormalBias=c.normalBias,J0.shadowRadius=c.radius,J0.shadowMapSize=c.mapSize,K.directionalShadow[E]=J0,K.directionalShadowMap[E]=p,K.directionalShadowMatrix[E]=x.shadow.matrix,z++}K.directional[E]=h,E++}else if(x.isSpotLight){let h=Q.get(x);h.position.setFromMatrixPosition(x.matrixWorld),h.color.copy(v).multiplyScalar(m*k),h.distance=o,h.coneCos=Math.cos(x.angle),h.penumbraCos=Math.cos(x.angle*(1-x.penumbra)),h.decay=x.decay,K.spot[D]=h;let c=x.shadow;if(x.map){if(K.spotLightMap[A]=x.map,A++,c.updateMatrices(x),x.castShadow)_++}if(K.spotLightMatrix[D]=c.matrix,x.castShadow){let J0=Z.get(x);J0.shadowBias=c.bias,J0.shadowNormalBias=c.normalBias,J0.shadowRadius=c.radius,J0.shadowMapSize=c.mapSize,K.spotShadow[D]=J0,K.spotShadowMap[D]=p,L++}D++}else if(x.isRectAreaLight){let h=Q.get(x);h.color.copy(v).multiplyScalar(m),h.halfWidth.set(x.width*0.5,0,0),h.halfHeight.set(0,x.height*0.5,0),K.rectArea[R]=h,R++}else if(x.isPointLight){let h=Q.get(x);if(h.color.copy(x.color).multiplyScalar(x.intensity*k),h.distance=x.distance,h.decay=x.decay,x.castShadow){let c=x.shadow,J0=Z.get(x);J0.shadowBias=c.bias,J0.shadowNormalBias=c.normalBias,J0.shadowRadius=c.radius,J0.shadowMapSize=c.mapSize,J0.shadowCameraNear=c.camera.near,J0.shadowCameraFar=c.camera.far,K.pointShadow[O]=J0,K.pointShadowMap[O]=p,K.pointShadowMatrix[O]=x.shadow.matrix,C++}K.point[O]=h,O++}else if(x.isHemisphereLight){let h=Q.get(x);h.skyColor.copy(x.color).multiplyScalar(m*k),h.groundColor.copy(x.groundColor).multiplyScalar(m*k),K.hemi[B]=h,B++}}if(R>0)if($.isWebGL2)if(J.has("OES_texture_float_linear")===!0)K.rectAreaLTC1=V0.LTC_FLOAT_1,K.rectAreaLTC2=V0.LTC_FLOAT_2;else K.rectAreaLTC1=V0.LTC_HALF_1,K.rectAreaLTC2=V0.LTC_HALF_2;else if(J.has("OES_texture_float_linear")===!0)K.rectAreaLTC1=V0.LTC_FLOAT_1,K.rectAreaLTC2=V0.LTC_FLOAT_2;else if(J.has("OES_texture_half_float_linear")===!0)K.rectAreaLTC1=V0.LTC_HALF_1,K.rectAreaLTC2=V0.LTC_HALF_2;else console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.");K.ambient[0]=V,K.ambient[1]=G,K.ambient[2]=N;let b=K.hash;if(b.directionalLength!==E||b.pointLength!==O||b.spotLength!==D||b.rectAreaLength!==R||b.hemiLength!==B||b.numDirectionalShadows!==z||b.numPointShadows!==C||b.numSpotShadows!==L||b.numSpotMaps!==A||b.numLightProbes!==I)K.directional.length=E,K.spot.length=D,K.rectArea.length=R,K.point.length=O,K.hemi.length=B,K.directionalShadow.length=z,K.directionalShadowMap.length=z,K.pointShadow.length=C,K.pointShadowMap.length=C,K.spotShadow.length=L,K.spotShadowMap.length=L,K.directionalShadowMatrix.length=z,K.pointShadowMatrix.length=C,K.spotLightMatrix.length=L+A-_,K.spotLightMap.length=A,K.numSpotLightShadowsWithMaps=_,K.numLightProbes=I,b.directionalLength=E,b.pointLength=O,b.spotLength=D,b.rectAreaLength=R,b.hemiLength=B,b.numDirectionalShadows=z,b.numPointShadows=C,b.numSpotShadows=L,b.numSpotMaps=A,b.numLightProbes=I,K.version=Cq++}function q(U,F){let V=0,G=0,N=0,E=0,O=0,D=F.matrixWorldInverse;for(let R=0,B=U.length;R<B;R++){let z=U[R];if(z.isDirectionalLight){let C=K.directional[V];C.direction.setFromMatrixPosition(z.matrixWorld),W.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(D),V++}else if(z.isSpotLight){let C=K.spot[N];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),C.direction.setFromMatrixPosition(z.matrixWorld),W.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(D),N++}else if(z.isRectAreaLight){let C=K.rectArea[E];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),Y.identity(),X.copy(z.matrixWorld),X.premultiply(D),Y.extractRotation(X),C.halfWidth.set(z.width*0.5,0,0),C.halfHeight.set(0,z.height*0.5,0),C.halfWidth.applyMatrix4(Y),C.halfHeight.applyMatrix4(Y),E++}else if(z.isPointLight){let C=K.point[G];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(D),G++}else if(z.isHemisphereLight){let C=K.hemi[O];C.direction.setFromMatrixPosition(z.matrixWorld),C.direction.transformDirection(D),O++}}}return{setup:H,setupView:q,state:K}}function Y6(J,$){let Q=new Mq(J,$),Z=[],K=[];function W(){Z.length=0,K.length=0}function X(F){Z.push(F)}function Y(F){K.push(F)}function H(F){Q.setup(Z,F)}function q(F){Q.setupView(Z,F)}return{init:W,state:{lightsArray:Z,shadowsArray:K,lights:Q},setupLights:H,setupLightsView:q,pushLight:X,pushShadow:Y}}function kq(J,$){let Q=new WeakMap;function Z(W,X=0){let Y=Q.get(W),H;if(Y===void 0)H=new Y6(J,$),Q.set(W,[H]);else if(X>=Y.length)H=new Y6(J,$),Y.push(H);else H=Y[X];return H}function K(){Q=new WeakMap}return{get:Z,dispose:K}}class d6 extends u9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class p6 extends u9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}var Pq=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sq=`uniform sampler2D shadow_pass;
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
}`;function wq(J,$,Q){let Z=new l$,K=new O0,W=new O0,X=new O8,Y=new d6({depthPacking:3201}),H=new p6,q={},U=Q.maxTextureSize,F={[0]:1,[1]:0,[2]:2},V=new $J({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new O0},radius:{value:4}},vertexShader:Pq,fragmentShader:Sq}),G=V.clone();G.defines.HORIZONTAL_PASS=1;let N=new E8;N.setAttribute("position",new h8(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let E=new S(N,V),O=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let D=this.type;this.render=function(L,A,_){if(O.enabled===!1)return;if(O.autoUpdate===!1&&O.needsUpdate===!1)return;if(L.length===0)return;let I=J.getRenderTarget(),k=J.getActiveCubeFace(),b=J.getActiveMipmapLevel(),s=J.state;s.setBlending(0),s.buffers.color.setClear(1,1,1,1),s.buffers.depth.setTest(!0),s.setScissorTest(!1);let a=D!==3&&this.type===3,x=D===3&&this.type!==3;for(let v=0,m=L.length;v<m;v++){let o=L[v],p=o.shadow;if(p===void 0){console.warn("THREE.WebGLShadowMap:",o,"has no shadow.");continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;K.copy(p.mapSize);let h=p.getFrameExtents();if(K.multiply(h),W.copy(p.mapSize),K.x>U||K.y>U){if(K.x>U)W.x=Math.floor(U/h.x),K.x=W.x*h.x,p.mapSize.x=W.x;if(K.y>U)W.y=Math.floor(U/h.y),K.y=W.y*h.y,p.mapSize.y=W.y}if(p.map===null||a===!0||x===!0){let J0=this.type!==3?{minFilter:1003,magFilter:1003}:{};if(p.map!==null)p.map.dispose();p.map=new JJ(K.x,K.y,J0),p.map.texture.name=o.name+".shadowMap",p.camera.updateProjectionMatrix()}J.setRenderTarget(p.map),J.clear();let c=p.getViewportCount();for(let J0=0;J0<c;J0++){let f=p.getViewport(J0);X.set(W.x*f.x,W.y*f.y,W.x*f.z,W.y*f.w),s.viewport(X),p.updateMatrices(o,J0),Z=p.getFrustum(),z(A,_,p.camera,o,this.type)}if(p.isPointLightShadow!==!0&&this.type===3)R(p,_);p.needsUpdate=!1}D=this.type,O.needsUpdate=!1,J.setRenderTarget(I,k,b)};function R(L,A){let _=$.update(E);if(V.defines.VSM_SAMPLES!==L.blurSamples)V.defines.VSM_SAMPLES=L.blurSamples,G.defines.VSM_SAMPLES=L.blurSamples,V.needsUpdate=!0,G.needsUpdate=!0;if(L.mapPass===null)L.mapPass=new JJ(K.x,K.y);V.uniforms.shadow_pass.value=L.map.texture,V.uniforms.resolution.value=L.mapSize,V.uniforms.radius.value=L.radius,J.setRenderTarget(L.mapPass),J.clear(),J.renderBufferDirect(A,null,_,V,E,null),G.uniforms.shadow_pass.value=L.mapPass.texture,G.uniforms.resolution.value=L.mapSize,G.uniforms.radius.value=L.radius,J.setRenderTarget(L.map),J.clear(),J.renderBufferDirect(A,null,_,G,E,null)}function B(L,A,_,I){let k=null,b=_.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(b!==void 0)k=b;else if(k=_.isPointLight===!0?H:Y,J.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let s=k.uuid,a=A.uuid,x=q[s];if(x===void 0)x={},q[s]=x;let v=x[a];if(v===void 0)v=k.clone(),x[a]=v,A.addEventListener("dispose",C);k=v}if(k.visible=A.visible,k.wireframe=A.wireframe,I===3)k.side=A.shadowSide!==null?A.shadowSide:A.side;else k.side=A.shadowSide!==null?A.shadowSide:F[A.side];if(k.alphaMap=A.alphaMap,k.alphaTest=A.alphaTest,k.map=A.map,k.clipShadows=A.clipShadows,k.clippingPlanes=A.clippingPlanes,k.clipIntersection=A.clipIntersection,k.displacementMap=A.displacementMap,k.displacementScale=A.displacementScale,k.displacementBias=A.displacementBias,k.wireframeLinewidth=A.wireframeLinewidth,k.linewidth=A.linewidth,_.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let s=J.properties.get(k);s.light=_}return k}function z(L,A,_,I,k){if(L.visible===!1)return;if(L.layers.test(A.layers)&&(L.isMesh||L.isLine||L.isPoints)){if((L.castShadow||L.receiveShadow&&k===3)&&(!L.frustumCulled||Z.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,L.matrixWorld);let a=$.update(L),x=L.material;if(Array.isArray(x)){let v=a.groups;for(let m=0,o=v.length;m<o;m++){let p=v[m],h=x[p.materialIndex];if(h&&h.visible){let c=B(L,h,I,k);L.onBeforeShadow(J,L,A,_,a,c,p),J.renderBufferDirect(_,null,a,c,L,p),L.onAfterShadow(J,L,A,_,a,c,p)}}}else if(x.visible){let v=B(L,x,I,k);L.onBeforeShadow(J,L,A,_,a,v,null),J.renderBufferDirect(_,null,a,v,L,null),L.onAfterShadow(J,L,A,_,a,v,null)}}}let s=L.children;for(let a=0,x=s.length;a<x;a++)z(s[a],A,_,I,k)}function C(L){L.target.removeEventListener("dispose",C);for(let _ in q){let I=q[_],k=L.target.uuid;if(k in I)I[k].dispose(),delete I[k]}}}function _q(J,$,Q){let Z=Q.isWebGL2;function K(){let y=!1,E0=new O8,N0=null,b0=new O8(0,0,0,0);return{setMask:function(A0){if(N0!==A0&&!y)J.colorMask(A0,A0,A0,A0),N0=A0},setLocked:function(A0){y=A0},setClear:function(A0,r0,$8,U8,M8){if(M8===!0)A0*=U8,r0*=U8,$8*=U8;if(E0.set(A0,r0,$8,U8),b0.equals(E0)===!1)J.clearColor(A0,r0,$8,U8),b0.copy(E0)},reset:function(){y=!1,N0=null,b0.set(-1,0,0,0)}}}function W(){let y=!1,E0=null,N0=null,b0=null;return{setTest:function(A0){if(A0)_0(J.DEPTH_TEST);else m0(J.DEPTH_TEST)},setMask:function(A0){if(E0!==A0&&!y)J.depthMask(A0),E0=A0},setFunc:function(A0){if(N0!==A0){switch(A0){case 0:J.depthFunc(J.NEVER);break;case 1:J.depthFunc(J.ALWAYS);break;case 2:J.depthFunc(J.LESS);break;case 3:J.depthFunc(J.LEQUAL);break;case 4:J.depthFunc(J.EQUAL);break;case 5:J.depthFunc(J.GEQUAL);break;case 6:J.depthFunc(J.GREATER);break;case 7:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}N0=A0}},setLocked:function(A0){y=A0},setClear:function(A0){if(b0!==A0)J.clearDepth(A0),b0=A0},reset:function(){y=!1,E0=null,N0=null,b0=null}}}function X(){let y=!1,E0=null,N0=null,b0=null,A0=null,r0=null,$8=null,U8=null,M8=null;return{setTest:function(a0){if(!y)if(a0)_0(J.STENCIL_TEST);else m0(J.STENCIL_TEST)},setMask:function(a0){if(E0!==a0&&!y)J.stencilMask(a0),E0=a0},setFunc:function(a0,z9,I9){if(N0!==a0||b0!==z9||A0!==I9)J.stencilFunc(a0,z9,I9),N0=a0,b0=z9,A0=I9},setOp:function(a0,z9,I9){if(r0!==a0||$8!==z9||U8!==I9)J.stencilOp(a0,z9,I9),r0=a0,$8=z9,U8=I9},setLocked:function(a0){y=a0},setClear:function(a0){if(M8!==a0)J.clearStencil(a0),M8=a0},reset:function(){y=!1,E0=null,N0=null,b0=null,A0=null,r0=null,$8=null,U8=null,M8=null}}}let Y=new K,H=new W,q=new X,U=new WeakMap,F=new WeakMap,V={},G={},N=new WeakMap,E=[],O=null,D=!1,R=null,B=null,z=null,C=null,L=null,A=null,_=null,I=new t0(0,0,0),k=0,b=!1,s=null,a=null,x=null,v=null,m=null,o=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),p=!1,h=0,c=J.getParameter(J.VERSION);if(c.indexOf("WebGL")!==-1)h=parseFloat(/^WebGL (\d)/.exec(c)[1]),p=h>=1;else if(c.indexOf("OpenGL ES")!==-1)h=parseFloat(/^OpenGL ES (\d)/.exec(c)[1]),p=h>=2;let J0=null,f={},e=J.getParameter(J.SCISSOR_BOX),Z0=J.getParameter(J.VIEWPORT),W0=new O8().fromArray(e),G0=new O8().fromArray(Z0);function S0(y,E0,N0,b0){let A0=new Uint8Array(4),r0=J.createTexture();J.bindTexture(y,r0),J.texParameteri(y,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(y,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let $8=0;$8<N0;$8++)if(Z&&(y===J.TEXTURE_3D||y===J.TEXTURE_2D_ARRAY))J.texImage3D(E0,0,J.RGBA,1,1,b0,0,J.RGBA,J.UNSIGNED_BYTE,A0);else J.texImage2D(E0+$8,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,A0);return r0}let x0={};if(x0[J.TEXTURE_2D]=S0(J.TEXTURE_2D,J.TEXTURE_2D,1),x0[J.TEXTURE_CUBE_MAP]=S0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z)x0[J.TEXTURE_2D_ARRAY]=S0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),x0[J.TEXTURE_3D]=S0(J.TEXTURE_3D,J.TEXTURE_3D,1,1);Y.setClear(0,0,0,1),H.setClear(1),q.setClear(0),_0(J.DEPTH_TEST),H.setFunc(3),j0(!1),T(1),_0(J.CULL_FACE),f0(0);function _0(y){if(V[y]!==!0)J.enable(y),V[y]=!0}function m0(y){if(V[y]!==!1)J.disable(y),V[y]=!1}function g(y,E0){if(G[y]!==E0){if(J.bindFramebuffer(y,E0),G[y]=E0,Z){if(y===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=E0;if(y===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=E0}return!0}return!1}function q8(y,E0){let N0=E,b0=!1;if(y){if(N0=N.get(E0),N0===void 0)N0=[],N.set(E0,N0);if(y.isWebGLMultipleRenderTargets){let A0=y.texture;if(N0.length!==A0.length||N0[0]!==J.COLOR_ATTACHMENT0){for(let r0=0,$8=A0.length;r0<$8;r0++)N0[r0]=J.COLOR_ATTACHMENT0+r0;N0.length=A0.length,b0=!0}}else if(N0[0]!==J.COLOR_ATTACHMENT0)N0[0]=J.COLOR_ATTACHMENT0,b0=!0}else if(N0[0]!==J.BACK)N0[0]=J.BACK,b0=!0;if(b0)if(Q.isWebGL2)J.drawBuffers(N0);else $.get("WEBGL_draw_buffers").drawBuffersWEBGL(N0)}function d0(y){if(O!==y)return J.useProgram(y),O=y,!0;return!1}let L0={[100]:J.FUNC_ADD,[101]:J.FUNC_SUBTRACT,[102]:J.FUNC_REVERSE_SUBTRACT};if(Z)L0[103]=J.MIN,L0[104]=J.MAX;else{let y=$.get("EXT_blend_minmax");if(y!==null)L0[103]=y.MIN_EXT,L0[104]=y.MAX_EXT}let P0={[200]:J.ZERO,[201]:J.ONE,[202]:J.SRC_COLOR,[204]:J.SRC_ALPHA,[210]:J.SRC_ALPHA_SATURATE,[208]:J.DST_COLOR,[206]:J.DST_ALPHA,[203]:J.ONE_MINUS_SRC_COLOR,[205]:J.ONE_MINUS_SRC_ALPHA,[209]:J.ONE_MINUS_DST_COLOR,[207]:J.ONE_MINUS_DST_ALPHA,[211]:J.CONSTANT_COLOR,[212]:J.ONE_MINUS_CONSTANT_COLOR,[213]:J.CONSTANT_ALPHA,[214]:J.ONE_MINUS_CONSTANT_ALPHA};function f0(y,E0,N0,b0,A0,r0,$8,U8,M8,a0){if(y===0){if(D===!0)m0(J.BLEND),D=!1;return}if(D===!1)_0(J.BLEND),D=!0;if(y!==5){if(y!==R||a0!==b){if(B!==100||L!==100)J.blendEquation(J.FUNC_ADD),B=100,L=100;if(a0)switch(y){case 1:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.ONE,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFuncSeparate(J.ZERO,J.SRC_COLOR,J.ZERO,J.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}else switch(y){case 1:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.SRC_ALPHA,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFunc(J.ZERO,J.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}z=null,C=null,A=null,_=null,I.set(0,0,0),k=0,R=y,b=a0}return}if(A0=A0||E0,r0=r0||N0,$8=$8||b0,E0!==B||A0!==L)J.blendEquationSeparate(L0[E0],L0[A0]),B=E0,L=A0;if(N0!==z||b0!==C||r0!==A||$8!==_)J.blendFuncSeparate(P0[N0],P0[b0],P0[r0],P0[$8]),z=N0,C=b0,A=r0,_=$8;if(U8.equals(I)===!1||M8!==k)J.blendColor(U8.r,U8.g,U8.b,M8),I.copy(U8),k=M8;R=y,b=!1}function k0(y,E0){y.side===2?m0(J.CULL_FACE):_0(J.CULL_FACE);let N0=y.side===1;if(E0)N0=!N0;j0(N0),y.blending===1&&y.transparent===!1?f0(0):f0(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),H.setFunc(y.depthFunc),H.setTest(y.depthTest),H.setMask(y.depthWrite),Y.setMask(y.colorWrite);let b0=y.stencilWrite;if(q.setTest(b0),b0)q.setMask(y.stencilWriteMask),q.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),q.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass);l(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?_0(J.SAMPLE_ALPHA_TO_COVERAGE):m0(J.SAMPLE_ALPHA_TO_COVERAGE)}function j0(y){if(s!==y){if(y)J.frontFace(J.CW);else J.frontFace(J.CCW);s=y}}function T(y){if(y!==0){if(_0(J.CULL_FACE),y!==a)if(y===1)J.cullFace(J.BACK);else if(y===2)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else m0(J.CULL_FACE);a=y}function M(y){if(y!==x){if(p)J.lineWidth(y);x=y}}function l(y,E0,N0){if(y){if(_0(J.POLYGON_OFFSET_FILL),v!==E0||m!==N0)J.polygonOffset(E0,N0),v=E0,m=N0}else m0(J.POLYGON_OFFSET_FILL)}function X0(y){if(y)_0(J.SCISSOR_TEST);else m0(J.SCISSOR_TEST)}function Q0(y){if(y===void 0)y=J.TEXTURE0+o-1;if(J0!==y)J.activeTexture(y),J0=y}function Y0(y,E0,N0){if(N0===void 0)if(J0===null)N0=J.TEXTURE0+o-1;else N0=J0;let b0=f[N0];if(b0===void 0)b0={type:void 0,texture:void 0},f[N0]=b0;if(b0.type!==y||b0.texture!==E0){if(J0!==N0)J.activeTexture(N0),J0=N0;J.bindTexture(y,E0||x0[y]),b0.type=y,b0.texture=E0}}function T0(){let y=f[J0];if(y!==void 0&&y.type!==void 0)J.bindTexture(y.type,null),y.type=void 0,y.texture=void 0}function q0(){try{J.compressedTexImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function z0(){try{J.compressedTexImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function M0(){try{J.texSubImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function v0(){try{J.texSubImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function K0(){try{J.compressedTexSubImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function G8(){try{J.compressedTexSubImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function p0(){try{J.texStorage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function y0(){try{J.texStorage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function B0(){try{J.texImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function j(){try{J.texImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function $0(y){if(W0.equals(y)===!1)J.scissor(y.x,y.y,y.z,y.w),W0.copy(y)}function U0(y){if(G0.equals(y)===!1)J.viewport(y.x,y.y,y.z,y.w),G0.copy(y)}function R0(y,E0){let N0=F.get(E0);if(N0===void 0)N0=new WeakMap,F.set(E0,N0);let b0=N0.get(y);if(b0===void 0)b0=J.getUniformBlockIndex(E0,y.name),N0.set(y,b0)}function u0(y,E0){let b0=F.get(E0).get(y);if(U.get(E0)!==b0)J.uniformBlockBinding(E0,b0,y.__bindingPointIndex),U.set(E0,b0)}function H0(){if(J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),Z===!0)J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null);J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),V={},J0=null,f={},G={},N=new WeakMap,E=[],O=null,D=!1,R=null,B=null,z=null,C=null,L=null,A=null,_=null,I=new t0(0,0,0),k=0,b=!1,s=null,a=null,x=null,v=null,m=null,W0.set(0,0,J.canvas.width,J.canvas.height),G0.set(0,0,J.canvas.width,J.canvas.height),Y.reset(),H.reset(),q.reset()}return{buffers:{color:Y,depth:H,stencil:q},enable:_0,disable:m0,bindFramebuffer:g,drawBuffers:q8,useProgram:d0,setBlending:f0,setMaterial:k0,setFlipSided:j0,setCullFace:T,setLineWidth:M,setPolygonOffset:l,setScissorTest:X0,activeTexture:Q0,bindTexture:Y0,unbindTexture:T0,compressedTexImage2D:q0,compressedTexImage3D:z0,texImage2D:B0,texImage3D:j,updateUBOMapping:R0,uniformBlockBinding:u0,texStorage2D:p0,texStorage3D:y0,texSubImage2D:M0,texSubImage3D:v0,compressedTexSubImage2D:K0,compressedTexSubImage3D:G8,scissor:$0,viewport:U0,reset:H0}}function Tq(J,$,Q,Z,K,W,X){let Y=K.isWebGL2,H=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,q=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new WeakMap,F,V=new WeakMap,G=!1;try{G=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(T){}function N(T,M){return G?new OffscreenCanvas(T,M):g$("canvas")}function E(T,M,l,X0){let Q0=1;if(T.width>X0||T.height>X0)Q0=X0/Math.max(T.width,T.height);if(Q0<1||M===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){let Y0=M?v$:Math.floor,T0=Y0(Q0*T.width),q0=Y0(Q0*T.height);if(F===void 0)F=N(T0,q0);let z0=l?N(T0,q0):F;return z0.width=T0,z0.height=q0,z0.getContext("2d").drawImage(T,0,0,T0,q0),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+T0+"x"+q0+")."),z0}else{if("data"in T)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+").");return T}return T}function O(T){return oQ(T.width)&&oQ(T.height)}function D(T){if(Y)return!1;return T.wrapS!==1001||T.wrapT!==1001||T.minFilter!==1003&&T.minFilter!==1006}function R(T,M){return T.generateMipmaps&&M&&T.minFilter!==1003&&T.minFilter!==1006}function B(T){J.generateMipmap(T)}function z(T,M,l,X0,Q0=!1){if(Y===!1)return M;if(T!==null){if(J[T]!==void 0)return J[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Y0=M;if(M===J.RED){if(l===J.FLOAT)Y0=J.R32F;if(l===J.HALF_FLOAT)Y0=J.R16F;if(l===J.UNSIGNED_BYTE)Y0=J.R8}if(M===J.RED_INTEGER){if(l===J.UNSIGNED_BYTE)Y0=J.R8UI;if(l===J.UNSIGNED_SHORT)Y0=J.R16UI;if(l===J.UNSIGNED_INT)Y0=J.R32UI;if(l===J.BYTE)Y0=J.R8I;if(l===J.SHORT)Y0=J.R16I;if(l===J.INT)Y0=J.R32I}if(M===J.RG){if(l===J.FLOAT)Y0=J.RG32F;if(l===J.HALF_FLOAT)Y0=J.RG16F;if(l===J.UNSIGNED_BYTE)Y0=J.RG8}if(M===J.RGBA){let T0=Q0?"linear":K8.getTransfer(X0);if(l===J.FLOAT)Y0=J.RGBA32F;if(l===J.HALF_FLOAT)Y0=J.RGBA16F;if(l===J.UNSIGNED_BYTE)Y0=T0==="srgb"?J.SRGB8_ALPHA8:J.RGBA8;if(l===J.UNSIGNED_SHORT_4_4_4_4)Y0=J.RGBA4;if(l===J.UNSIGNED_SHORT_5_5_5_1)Y0=J.RGB5_A1}if(Y0===J.R16F||Y0===J.R32F||Y0===J.RG16F||Y0===J.RG32F||Y0===J.RGBA16F||Y0===J.RGBA32F)$.get("EXT_color_buffer_float");return Y0}function C(T,M,l){if(R(T,l)===!0||T.isFramebufferTexture&&T.minFilter!==1003&&T.minFilter!==1006)return Math.log2(Math.max(M.width,M.height))+1;else if(T.mipmaps!==void 0&&T.mipmaps.length>0)return T.mipmaps.length;else if(T.isCompressedTexture&&Array.isArray(T.image))return M.mipmaps.length;else return 1}function L(T){if(T===1003||T===1004||T===1005)return J.NEAREST;return J.LINEAR}function A(T){let M=T.target;if(M.removeEventListener("dispose",A),I(M),M.isVideoTexture)U.delete(M)}function _(T){let M=T.target;M.removeEventListener("dispose",_),b(M)}function I(T){let M=Z.get(T);if(M.__webglInit===void 0)return;let l=T.source,X0=V.get(l);if(X0){let Q0=X0[M.__cacheKey];if(Q0.usedTimes--,Q0.usedTimes===0)k(T);if(Object.keys(X0).length===0)V.delete(l)}Z.remove(T)}function k(T){let M=Z.get(T);J.deleteTexture(M.__webglTexture);let l=T.source,X0=V.get(l);delete X0[M.__cacheKey],X.memory.textures--}function b(T){let M=T.texture,l=Z.get(T),X0=Z.get(M);if(X0.__webglTexture!==void 0)J.deleteTexture(X0.__webglTexture),X.memory.textures--;if(T.depthTexture)T.depthTexture.dispose();if(T.isWebGLCubeRenderTarget)for(let Q0=0;Q0<6;Q0++){if(Array.isArray(l.__webglFramebuffer[Q0]))for(let Y0=0;Y0<l.__webglFramebuffer[Q0].length;Y0++)J.deleteFramebuffer(l.__webglFramebuffer[Q0][Y0]);else J.deleteFramebuffer(l.__webglFramebuffer[Q0]);if(l.__webglDepthbuffer)J.deleteRenderbuffer(l.__webglDepthbuffer[Q0])}else{if(Array.isArray(l.__webglFramebuffer))for(let Q0=0;Q0<l.__webglFramebuffer.length;Q0++)J.deleteFramebuffer(l.__webglFramebuffer[Q0]);else J.deleteFramebuffer(l.__webglFramebuffer);if(l.__webglDepthbuffer)J.deleteRenderbuffer(l.__webglDepthbuffer);if(l.__webglMultisampledFramebuffer)J.deleteFramebuffer(l.__webglMultisampledFramebuffer);if(l.__webglColorRenderbuffer){for(let Q0=0;Q0<l.__webglColorRenderbuffer.length;Q0++)if(l.__webglColorRenderbuffer[Q0])J.deleteRenderbuffer(l.__webglColorRenderbuffer[Q0])}if(l.__webglDepthRenderbuffer)J.deleteRenderbuffer(l.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let Q0=0,Y0=M.length;Q0<Y0;Q0++){let T0=Z.get(M[Q0]);if(T0.__webglTexture)J.deleteTexture(T0.__webglTexture),X.memory.textures--;Z.remove(M[Q0])}Z.remove(M),Z.remove(T)}let s=0;function a(){s=0}function x(){let T=s;if(T>=K.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+K.maxTextures);return s+=1,T}function v(T){let M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function m(T,M){let l=Z.get(T);if(T.isVideoTexture)k0(T);if(T.isRenderTargetTexture===!1&&T.version>0&&l.__version!==T.version){let X0=T.image;if(X0===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X0.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W0(l,T,M);return}}Q.bindTexture(J.TEXTURE_2D,l.__webglTexture,J.TEXTURE0+M)}function o(T,M){let l=Z.get(T);if(T.version>0&&l.__version!==T.version){W0(l,T,M);return}Q.bindTexture(J.TEXTURE_2D_ARRAY,l.__webglTexture,J.TEXTURE0+M)}function p(T,M){let l=Z.get(T);if(T.version>0&&l.__version!==T.version){W0(l,T,M);return}Q.bindTexture(J.TEXTURE_3D,l.__webglTexture,J.TEXTURE0+M)}function h(T,M){let l=Z.get(T);if(T.version>0&&l.__version!==T.version){G0(l,T,M);return}Q.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture,J.TEXTURE0+M)}let c={[1000]:J.REPEAT,[1001]:J.CLAMP_TO_EDGE,[1002]:J.MIRRORED_REPEAT},J0={[1003]:J.NEAREST,[1004]:J.NEAREST_MIPMAP_NEAREST,[1005]:J.NEAREST_MIPMAP_LINEAR,[1006]:J.LINEAR,[1007]:J.LINEAR_MIPMAP_NEAREST,[1008]:J.LINEAR_MIPMAP_LINEAR},f={[512]:J.NEVER,[519]:J.ALWAYS,[513]:J.LESS,[515]:J.LEQUAL,[514]:J.EQUAL,[518]:J.GEQUAL,[516]:J.GREATER,[517]:J.NOTEQUAL};function e(T,M,l){if(l){if(J.texParameteri(T,J.TEXTURE_WRAP_S,c[M.wrapS]),J.texParameteri(T,J.TEXTURE_WRAP_T,c[M.wrapT]),T===J.TEXTURE_3D||T===J.TEXTURE_2D_ARRAY)J.texParameteri(T,J.TEXTURE_WRAP_R,c[M.wrapR]);J.texParameteri(T,J.TEXTURE_MAG_FILTER,J0[M.magFilter]),J.texParameteri(T,J.TEXTURE_MIN_FILTER,J0[M.minFilter])}else{if(J.texParameteri(T,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(T,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE),T===J.TEXTURE_3D||T===J.TEXTURE_2D_ARRAY)J.texParameteri(T,J.TEXTURE_WRAP_R,J.CLAMP_TO_EDGE);if(M.wrapS!==1001||M.wrapT!==1001)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.");if(J.texParameteri(T,J.TEXTURE_MAG_FILTER,L(M.magFilter)),J.texParameteri(T,J.TEXTURE_MIN_FILTER,L(M.minFilter)),M.minFilter!==1003&&M.minFilter!==1006)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")}if(M.compareFunction)J.texParameteri(T,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(T,J.TEXTURE_COMPARE_FUNC,f[M.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){let X0=$.get("EXT_texture_filter_anisotropic");if(M.magFilter===1003)return;if(M.minFilter!==1005&&M.minFilter!==1008)return;if(M.type===1015&&$.has("OES_texture_float_linear")===!1)return;if(Y===!1&&(M.type===1016&&$.has("OES_texture_half_float_linear")===!1))return;if(M.anisotropy>1||Z.get(M).__currentAnisotropy)J.texParameterf(T,X0.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,K.getMaxAnisotropy())),Z.get(M).__currentAnisotropy=M.anisotropy}}function Z0(T,M){let l=!1;if(T.__webglInit===void 0)T.__webglInit=!0,M.addEventListener("dispose",A);let X0=M.source,Q0=V.get(X0);if(Q0===void 0)Q0={},V.set(X0,Q0);let Y0=v(M);if(Y0!==T.__cacheKey){if(Q0[Y0]===void 0)Q0[Y0]={texture:J.createTexture(),usedTimes:0},X.memory.textures++,l=!0;Q0[Y0].usedTimes++;let T0=Q0[T.__cacheKey];if(T0!==void 0){if(Q0[T.__cacheKey].usedTimes--,T0.usedTimes===0)k(M)}T.__cacheKey=Y0,T.__webglTexture=Q0[Y0].texture}return l}function W0(T,M,l){let X0=J.TEXTURE_2D;if(M.isDataArrayTexture||M.isCompressedArrayTexture)X0=J.TEXTURE_2D_ARRAY;if(M.isData3DTexture)X0=J.TEXTURE_3D;let Q0=Z0(T,M),Y0=M.source;Q.bindTexture(X0,T.__webglTexture,J.TEXTURE0+l);let T0=Z.get(Y0);if(Y0.version!==T0.__version||Q0===!0){Q.activeTexture(J.TEXTURE0+l);let q0=K8.getPrimaries(K8.workingColorSpace),z0=M.colorSpace===""?null:K8.getPrimaries(M.colorSpace),M0=M.colorSpace===""||q0===z0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,M0);let v0=D(M)&&O(M.image)===!1,K0=E(M.image,v0,!1,K.maxTextureSize);K0=j0(M,K0);let G8=O(K0)||Y,p0=W.convert(M.format,M.colorSpace),y0=W.convert(M.type),B0=z(M.internalFormat,p0,y0,M.colorSpace,M.isVideoTexture);e(X0,M,G8);let j,$0=M.mipmaps,U0=Y&&M.isVideoTexture!==!0&&B0!==36196,R0=T0.__version===void 0||Q0===!0,u0=C(M,K0,G8);if(M.isDepthTexture){if(B0=J.DEPTH_COMPONENT,Y)if(M.type===1015)B0=J.DEPTH_COMPONENT32F;else if(M.type===1014)B0=J.DEPTH_COMPONENT24;else if(M.type===1020)B0=J.DEPTH24_STENCIL8;else B0=J.DEPTH_COMPONENT16;else if(M.type===1015)console.error("WebGLRenderer: Floating point depth texture requires WebGL2.");if(M.format===1026&&B0===J.DEPTH_COMPONENT){if(M.type!==1012&&M.type!==1014)console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=1014,y0=W.convert(M.type)}if(M.format===1027&&B0===J.DEPTH_COMPONENT){if(B0=J.DEPTH_STENCIL,M.type!==1020)console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=1020,y0=W.convert(M.type)}if(R0)if(U0)Q.texStorage2D(J.TEXTURE_2D,1,B0,K0.width,K0.height);else Q.texImage2D(J.TEXTURE_2D,0,B0,K0.width,K0.height,0,p0,y0,null)}else if(M.isDataTexture)if($0.length>0&&G8){if(U0&&R0)Q.texStorage2D(J.TEXTURE_2D,u0,B0,$0[0].width,$0[0].height);for(let H0=0,y=$0.length;H0<y;H0++)if(j=$0[H0],U0)Q.texSubImage2D(J.TEXTURE_2D,H0,0,0,j.width,j.height,p0,y0,j.data);else Q.texImage2D(J.TEXTURE_2D,H0,B0,j.width,j.height,0,p0,y0,j.data);M.generateMipmaps=!1}else if(U0){if(R0)Q.texStorage2D(J.TEXTURE_2D,u0,B0,K0.width,K0.height);Q.texSubImage2D(J.TEXTURE_2D,0,0,0,K0.width,K0.height,p0,y0,K0.data)}else Q.texImage2D(J.TEXTURE_2D,0,B0,K0.width,K0.height,0,p0,y0,K0.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){if(U0&&R0)Q.texStorage3D(J.TEXTURE_2D_ARRAY,u0,B0,$0[0].width,$0[0].height,K0.depth);for(let H0=0,y=$0.length;H0<y;H0++)if(j=$0[H0],M.format!==1023)if(p0!==null)if(U0)Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,H0,0,0,0,j.width,j.height,K0.depth,p0,j.data,0,0);else Q.compressedTexImage3D(J.TEXTURE_2D_ARRAY,H0,B0,j.width,j.height,K0.depth,0,j.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(U0)Q.texSubImage3D(J.TEXTURE_2D_ARRAY,H0,0,0,0,j.width,j.height,K0.depth,p0,y0,j.data);else Q.texImage3D(J.TEXTURE_2D_ARRAY,H0,B0,j.width,j.height,K0.depth,0,p0,y0,j.data)}else{if(U0&&R0)Q.texStorage2D(J.TEXTURE_2D,u0,B0,$0[0].width,$0[0].height);for(let H0=0,y=$0.length;H0<y;H0++)if(j=$0[H0],M.format!==1023)if(p0!==null)if(U0)Q.compressedTexSubImage2D(J.TEXTURE_2D,H0,0,0,j.width,j.height,p0,j.data);else Q.compressedTexImage2D(J.TEXTURE_2D,H0,B0,j.width,j.height,0,j.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(U0)Q.texSubImage2D(J.TEXTURE_2D,H0,0,0,j.width,j.height,p0,y0,j.data);else Q.texImage2D(J.TEXTURE_2D,H0,B0,j.width,j.height,0,p0,y0,j.data)}else if(M.isDataArrayTexture)if(U0){if(R0)Q.texStorage3D(J.TEXTURE_2D_ARRAY,u0,B0,K0.width,K0.height,K0.depth);Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,K0.width,K0.height,K0.depth,p0,y0,K0.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,0,B0,K0.width,K0.height,K0.depth,0,p0,y0,K0.data);else if(M.isData3DTexture)if(U0){if(R0)Q.texStorage3D(J.TEXTURE_3D,u0,B0,K0.width,K0.height,K0.depth);Q.texSubImage3D(J.TEXTURE_3D,0,0,0,0,K0.width,K0.height,K0.depth,p0,y0,K0.data)}else Q.texImage3D(J.TEXTURE_3D,0,B0,K0.width,K0.height,K0.depth,0,p0,y0,K0.data);else if(M.isFramebufferTexture){if(R0)if(U0)Q.texStorage2D(J.TEXTURE_2D,u0,B0,K0.width,K0.height);else{let{width:H0,height:y}=K0;for(let E0=0;E0<u0;E0++)Q.texImage2D(J.TEXTURE_2D,E0,B0,H0,y,0,p0,y0,null),H0>>=1,y>>=1}}else if($0.length>0&&G8){if(U0&&R0)Q.texStorage2D(J.TEXTURE_2D,u0,B0,$0[0].width,$0[0].height);for(let H0=0,y=$0.length;H0<y;H0++)if(j=$0[H0],U0)Q.texSubImage2D(J.TEXTURE_2D,H0,0,0,p0,y0,j);else Q.texImage2D(J.TEXTURE_2D,H0,B0,p0,y0,j);M.generateMipmaps=!1}else if(U0){if(R0)Q.texStorage2D(J.TEXTURE_2D,u0,B0,K0.width,K0.height);Q.texSubImage2D(J.TEXTURE_2D,0,0,0,p0,y0,K0)}else Q.texImage2D(J.TEXTURE_2D,0,B0,p0,y0,K0);if(R(M,G8))B(X0);if(T0.__version=Y0.version,M.onUpdate)M.onUpdate(M)}T.__version=M.version}function G0(T,M,l){if(M.image.length!==6)return;let X0=Z0(T,M),Q0=M.source;Q.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+l);let Y0=Z.get(Q0);if(Q0.version!==Y0.__version||X0===!0){Q.activeTexture(J.TEXTURE0+l);let T0=K8.getPrimaries(K8.workingColorSpace),q0=M.colorSpace===""?null:K8.getPrimaries(M.colorSpace),z0=M.colorSpace===""||T0===q0?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,z0);let M0=M.isCompressedTexture||M.image[0].isCompressedTexture,v0=M.image[0]&&M.image[0].isDataTexture,K0=[];for(let H0=0;H0<6;H0++){if(!M0&&!v0)K0[H0]=E(M.image[H0],!1,!0,K.maxCubemapSize);else K0[H0]=v0?M.image[H0].image:M.image[H0];K0[H0]=j0(M,K0[H0])}let G8=K0[0],p0=O(G8)||Y,y0=W.convert(M.format,M.colorSpace),B0=W.convert(M.type),j=z(M.internalFormat,y0,B0,M.colorSpace),$0=Y&&M.isVideoTexture!==!0,U0=Y0.__version===void 0||X0===!0,R0=C(M,G8,p0);e(J.TEXTURE_CUBE_MAP,M,p0);let u0;if(M0){if($0&&U0)Q.texStorage2D(J.TEXTURE_CUBE_MAP,R0,j,G8.width,G8.height);for(let H0=0;H0<6;H0++){u0=K0[H0].mipmaps;for(let y=0;y<u0.length;y++){let E0=u0[y];if(M.format!==1023)if(y0!==null)if($0)Q.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y,0,0,E0.width,E0.height,y0,E0.data);else Q.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y,j,E0.width,E0.height,0,E0.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y,0,0,E0.width,E0.height,y0,B0,E0.data);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y,j,E0.width,E0.height,0,y0,B0,E0.data)}}}else{if(u0=M.mipmaps,$0&&U0){if(u0.length>0)R0++;Q.texStorage2D(J.TEXTURE_CUBE_MAP,R0,j,K0[0].width,K0[0].height)}for(let H0=0;H0<6;H0++)if(v0){if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,0,0,0,K0[H0].width,K0[H0].height,y0,B0,K0[H0].data);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,0,j,K0[H0].width,K0[H0].height,0,y0,B0,K0[H0].data);for(let y=0;y<u0.length;y++){let N0=u0[y].image[H0].image;if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y+1,0,0,N0.width,N0.height,y0,B0,N0.data);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y+1,j,N0.width,N0.height,0,y0,B0,N0.data)}}else{if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,0,0,0,y0,B0,K0[H0]);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,0,j,y0,B0,K0[H0]);for(let y=0;y<u0.length;y++){let E0=u0[y];if($0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y+1,0,0,y0,B0,E0.image[H0]);else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+H0,y+1,j,y0,B0,E0.image[H0])}}}if(R(M,p0))B(J.TEXTURE_CUBE_MAP);if(Y0.__version=Q0.version,M.onUpdate)M.onUpdate(M)}T.__version=M.version}function S0(T,M,l,X0,Q0,Y0){let T0=W.convert(l.format,l.colorSpace),q0=W.convert(l.type),z0=z(l.internalFormat,T0,q0,l.colorSpace);if(!Z.get(M).__hasExternalTextures){let v0=Math.max(1,M.width>>Y0),K0=Math.max(1,M.height>>Y0);if(Q0===J.TEXTURE_3D||Q0===J.TEXTURE_2D_ARRAY)Q.texImage3D(Q0,Y0,z0,v0,K0,M.depth,0,T0,q0,null);else Q.texImage2D(Q0,Y0,z0,v0,K0,0,T0,q0,null)}if(Q.bindFramebuffer(J.FRAMEBUFFER,T),f0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,X0,Q0,Z.get(l).__webglTexture,0,P0(M));else if(Q0===J.TEXTURE_2D||Q0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&Q0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,X0,Q0,Z.get(l).__webglTexture,Y0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}function x0(T,M,l){if(J.bindRenderbuffer(J.RENDERBUFFER,T),M.depthBuffer&&!M.stencilBuffer){let X0=Y===!0?J.DEPTH_COMPONENT24:J.DEPTH_COMPONENT16;if(l||f0(M)){let Q0=M.depthTexture;if(Q0&&Q0.isDepthTexture){if(Q0.type===1015)X0=J.DEPTH_COMPONENT32F;else if(Q0.type===1014)X0=J.DEPTH_COMPONENT24}let Y0=P0(M);if(f0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,Y0,X0,M.width,M.height);else J.renderbufferStorageMultisample(J.RENDERBUFFER,Y0,X0,M.width,M.height)}else J.renderbufferStorage(J.RENDERBUFFER,X0,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.RENDERBUFFER,T)}else if(M.depthBuffer&&M.stencilBuffer){let X0=P0(M);if(l&&f0(M)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,X0,J.DEPTH24_STENCIL8,M.width,M.height);else if(f0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,X0,J.DEPTH24_STENCIL8,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,J.DEPTH_STENCIL,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.RENDERBUFFER,T)}else{let X0=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Q0=0;Q0<X0.length;Q0++){let Y0=X0[Q0],T0=W.convert(Y0.format,Y0.colorSpace),q0=W.convert(Y0.type),z0=z(Y0.internalFormat,T0,q0,Y0.colorSpace),M0=P0(M);if(l&&f0(M)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,M0,z0,M.width,M.height);else if(f0(M))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,M0,z0,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,z0,M.width,M.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function _0(T,M){if(M&&M.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(Q.bindFramebuffer(J.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");if(!Z.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0;m(M.depthTexture,0);let X0=Z.get(M.depthTexture).__webglTexture,Q0=P0(M);if(M.depthTexture.format===1026)if(f0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,X0,0,Q0);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,X0,0);else if(M.depthTexture.format===1027)if(f0(M))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,X0,0,Q0);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,X0,0);else throw Error("Unknown depthTexture format")}function m0(T){let M=Z.get(T),l=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(l)throw Error("target.depthTexture not supported in Cube render targets");_0(M.__webglFramebuffer,T)}else if(l){M.__webglDepthbuffer=[];for(let X0=0;X0<6;X0++)Q.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer[X0]),M.__webglDepthbuffer[X0]=J.createRenderbuffer(),x0(M.__webglDepthbuffer[X0],T,!1)}else Q.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=J.createRenderbuffer(),x0(M.__webglDepthbuffer,T,!1);Q.bindFramebuffer(J.FRAMEBUFFER,null)}function g(T,M,l){let X0=Z.get(T);if(M!==void 0)S0(X0.__webglFramebuffer,T,T.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(l!==void 0)m0(T)}function q8(T){let M=T.texture,l=Z.get(T),X0=Z.get(M);if(T.addEventListener("dispose",_),T.isWebGLMultipleRenderTargets!==!0){if(X0.__webglTexture===void 0)X0.__webglTexture=J.createTexture();X0.__version=M.version,X.memory.textures++}let Q0=T.isWebGLCubeRenderTarget===!0,Y0=T.isWebGLMultipleRenderTargets===!0,T0=O(T)||Y;if(Q0){l.__webglFramebuffer=[];for(let q0=0;q0<6;q0++)if(Y&&M.mipmaps&&M.mipmaps.length>0){l.__webglFramebuffer[q0]=[];for(let z0=0;z0<M.mipmaps.length;z0++)l.__webglFramebuffer[q0][z0]=J.createFramebuffer()}else l.__webglFramebuffer[q0]=J.createFramebuffer()}else{if(Y&&M.mipmaps&&M.mipmaps.length>0){l.__webglFramebuffer=[];for(let q0=0;q0<M.mipmaps.length;q0++)l.__webglFramebuffer[q0]=J.createFramebuffer()}else l.__webglFramebuffer=J.createFramebuffer();if(Y0)if(K.drawBuffers){let q0=T.texture;for(let z0=0,M0=q0.length;z0<M0;z0++){let v0=Z.get(q0[z0]);if(v0.__webglTexture===void 0)v0.__webglTexture=J.createTexture(),X.memory.textures++}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(Y&&T.samples>0&&f0(T)===!1){let q0=Y0?M:[M];l.__webglMultisampledFramebuffer=J.createFramebuffer(),l.__webglColorRenderbuffer=[],Q.bindFramebuffer(J.FRAMEBUFFER,l.__webglMultisampledFramebuffer);for(let z0=0;z0<q0.length;z0++){let M0=q0[z0];l.__webglColorRenderbuffer[z0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,l.__webglColorRenderbuffer[z0]);let v0=W.convert(M0.format,M0.colorSpace),K0=W.convert(M0.type),G8=z(M0.internalFormat,v0,K0,M0.colorSpace,T.isXRRenderTarget===!0),p0=P0(T);J.renderbufferStorageMultisample(J.RENDERBUFFER,p0,G8,T.width,T.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+z0,J.RENDERBUFFER,l.__webglColorRenderbuffer[z0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),T.depthBuffer)l.__webglDepthRenderbuffer=J.createRenderbuffer(),x0(l.__webglDepthRenderbuffer,T,!0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}}if(Q0){Q.bindTexture(J.TEXTURE_CUBE_MAP,X0.__webglTexture),e(J.TEXTURE_CUBE_MAP,M,T0);for(let q0=0;q0<6;q0++)if(Y&&M.mipmaps&&M.mipmaps.length>0)for(let z0=0;z0<M.mipmaps.length;z0++)S0(l.__webglFramebuffer[q0][z0],T,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,z0);else S0(l.__webglFramebuffer[q0],T,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+q0,0);if(R(M,T0))B(J.TEXTURE_CUBE_MAP);Q.unbindTexture()}else if(Y0){let q0=T.texture;for(let z0=0,M0=q0.length;z0<M0;z0++){let v0=q0[z0],K0=Z.get(v0);if(Q.bindTexture(J.TEXTURE_2D,K0.__webglTexture),e(J.TEXTURE_2D,v0,T0),S0(l.__webglFramebuffer,T,v0,J.COLOR_ATTACHMENT0+z0,J.TEXTURE_2D,0),R(v0,T0))B(J.TEXTURE_2D)}Q.unbindTexture()}else{let q0=J.TEXTURE_2D;if(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)if(Y)q0=T.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;else console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.");if(Q.bindTexture(q0,X0.__webglTexture),e(q0,M,T0),Y&&M.mipmaps&&M.mipmaps.length>0)for(let z0=0;z0<M.mipmaps.length;z0++)S0(l.__webglFramebuffer[z0],T,M,J.COLOR_ATTACHMENT0,q0,z0);else S0(l.__webglFramebuffer,T,M,J.COLOR_ATTACHMENT0,q0,0);if(R(M,T0))B(q0);Q.unbindTexture()}if(T.depthBuffer)m0(T)}function d0(T){let M=O(T)||Y,l=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let X0=0,Q0=l.length;X0<Q0;X0++){let Y0=l[X0];if(R(Y0,M)){let T0=T.isWebGLCubeRenderTarget?J.TEXTURE_CUBE_MAP:J.TEXTURE_2D,q0=Z.get(Y0).__webglTexture;Q.bindTexture(T0,q0),B(T0),Q.unbindTexture()}}}function L0(T){if(Y&&T.samples>0&&f0(T)===!1){let M=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],l=T.width,X0=T.height,Q0=J.COLOR_BUFFER_BIT,Y0=[],T0=T.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,q0=Z.get(T),z0=T.isWebGLMultipleRenderTargets===!0;if(z0)for(let M0=0;M0<M.length;M0++)Q.bindFramebuffer(J.FRAMEBUFFER,q0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.RENDERBUFFER,null),Q.bindFramebuffer(J.FRAMEBUFFER,q0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.TEXTURE_2D,null,0);Q.bindFramebuffer(J.READ_FRAMEBUFFER,q0.__webglMultisampledFramebuffer),Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,q0.__webglFramebuffer);for(let M0=0;M0<M.length;M0++){if(Y0.push(J.COLOR_ATTACHMENT0+M0),T.depthBuffer)Y0.push(T0);let v0=q0.__ignoreDepthValues!==void 0?q0.__ignoreDepthValues:!1;if(v0===!1){if(T.depthBuffer)Q0|=J.DEPTH_BUFFER_BIT;if(T.stencilBuffer)Q0|=J.STENCIL_BUFFER_BIT}if(z0)J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,q0.__webglColorRenderbuffer[M0]);if(v0===!0)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,[T0]),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[T0]);if(z0){let K0=Z.get(M[M0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,K0,0)}if(J.blitFramebuffer(0,0,l,X0,0,0,l,X0,Q0,J.NEAREST),q)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,Y0)}if(Q.bindFramebuffer(J.READ_FRAMEBUFFER,null),Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),z0)for(let M0=0;M0<M.length;M0++){Q.bindFramebuffer(J.FRAMEBUFFER,q0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.RENDERBUFFER,q0.__webglColorRenderbuffer[M0]);let v0=Z.get(M[M0]).__webglTexture;Q.bindFramebuffer(J.FRAMEBUFFER,q0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+M0,J.TEXTURE_2D,v0,0)}Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,q0.__webglMultisampledFramebuffer)}}function P0(T){return Math.min(K.maxSamples,T.samples)}function f0(T){let M=Z.get(T);return Y&&T.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function k0(T){let M=X.render.frame;if(U.get(T)!==M)U.set(T,M),T.update()}function j0(T,M){let{colorSpace:l,format:X0,type:Q0}=T;if(T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===1035)return M;if(l!=="srgb-linear"&&l!=="")if(K8.getTransfer(l)==="srgb"){if(Y===!1)if($.has("EXT_sRGB")===!0&&X0===1023)T.format=1035,T.minFilter=1006,T.generateMipmaps=!1;else M=$Z.sRGBToLinear(M);else if(X0!==1023||Q0!==1009)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",l);return M}this.allocateTextureUnit=x,this.resetTextureUnits=a,this.setTexture2D=m,this.setTexture2DArray=o,this.setTexture3D=p,this.setTextureCube=h,this.rebindTextures=g,this.setupRenderTarget=q8,this.updateRenderTargetMipmap=d0,this.updateMultisampleRenderTarget=L0,this.setupDepthRenderbuffer=m0,this.setupFrameBufferTexture=S0,this.useMultisampledRTT=f0}function jq(J,$,Q){let Z=Q.isWebGL2;function K(W,X=""){let Y,H=K8.getTransfer(X);if(W===1009)return J.UNSIGNED_BYTE;if(W===1017)return J.UNSIGNED_SHORT_4_4_4_4;if(W===1018)return J.UNSIGNED_SHORT_5_5_5_1;if(W===1010)return J.BYTE;if(W===1011)return J.SHORT;if(W===1012)return J.UNSIGNED_SHORT;if(W===1013)return J.INT;if(W===1014)return J.UNSIGNED_INT;if(W===1015)return J.FLOAT;if(W===1016){if(Z)return J.HALF_FLOAT;if(Y=$.get("OES_texture_half_float"),Y!==null)return Y.HALF_FLOAT_OES;else return null}if(W===1021)return J.ALPHA;if(W===1023)return J.RGBA;if(W===1024)return J.LUMINANCE;if(W===1025)return J.LUMINANCE_ALPHA;if(W===1026)return J.DEPTH_COMPONENT;if(W===1027)return J.DEPTH_STENCIL;if(W===1035)if(Y=$.get("EXT_sRGB"),Y!==null)return Y.SRGB_ALPHA_EXT;else return null;if(W===1028)return J.RED;if(W===1029)return J.RED_INTEGER;if(W===1030)return J.RG;if(W===1031)return J.RG_INTEGER;if(W===1033)return J.RGBA_INTEGER;if(W===33776||W===33777||W===33778||W===33779)if(H==="srgb")if(Y=$.get("WEBGL_compressed_texture_s3tc_srgb"),Y!==null){if(W===33776)return Y.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===33777)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===33778)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===33779)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(Y=$.get("WEBGL_compressed_texture_s3tc"),Y!==null){if(W===33776)return Y.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===33777)return Y.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===33778)return Y.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===33779)return Y.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===35840||W===35841||W===35842||W===35843)if(Y=$.get("WEBGL_compressed_texture_pvrtc"),Y!==null){if(W===35840)return Y.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===35841)return Y.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===35842)return Y.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===35843)return Y.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===36196)if(Y=$.get("WEBGL_compressed_texture_etc1"),Y!==null)return Y.COMPRESSED_RGB_ETC1_WEBGL;else return null;if(W===37492||W===37496)if(Y=$.get("WEBGL_compressed_texture_etc"),Y!==null){if(W===37492)return H==="srgb"?Y.COMPRESSED_SRGB8_ETC2:Y.COMPRESSED_RGB8_ETC2;if(W===37496)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:Y.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(W===37808||W===37809||W===37810||W===37811||W===37812||W===37813||W===37814||W===37815||W===37816||W===37817||W===37818||W===37819||W===37820||W===37821)if(Y=$.get("WEBGL_compressed_texture_astc"),Y!==null){if(W===37808)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:Y.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===37809)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:Y.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===37810)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:Y.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===37811)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:Y.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===37812)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:Y.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===37813)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:Y.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===37814)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:Y.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===37815)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:Y.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===37816)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:Y.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===37817)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:Y.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===37818)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:Y.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===37819)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:Y.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===37820)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:Y.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===37821)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:Y.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===36492||W===36494||W===36495)if(Y=$.get("EXT_texture_compression_bptc"),Y!==null){if(W===36492)return H==="srgb"?Y.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:Y.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===36494)return Y.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===36495)return Y.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===36283||W===36284||W===36285||W===36286)if(Y=$.get("EXT_texture_compression_rgtc"),Y!==null){if(W===36492)return Y.COMPRESSED_RED_RGTC1_EXT;if(W===36284)return Y.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===36285)return Y.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===36286)return Y.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===1020){if(Z)return J.UNSIGNED_INT_24_8;if(Y=$.get("WEBGL_depth_texture"),Y!==null)return Y.UNSIGNED_INT_24_8_WEBGL;else return null}return J[W]!==void 0?J[W]:null}return{convert:K}}class l6 extends p8{constructor(J=[]){super();this.isArrayCamera=!0,this.cameras=J}}class F0 extends D8{constructor(){super();this.isGroup=!0,this.type="Group"}}var xq={type:"move"};class h${constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new F0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new F0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new F0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Q of J.hand.values())this._getHandJoint($,Q)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Q){let Z=null,K=null,W=null,X=this._targetRay,Y=this._grip,H=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(H&&J.hand){W=!0;for(let N of J.hand.values()){let E=$.getJointPose(N,Q),O=this._getHandJoint(H,N);if(E!==null)O.matrix.fromArray(E.transform.matrix),O.matrix.decompose(O.position,O.rotation,O.scale),O.matrixWorldNeedsUpdate=!0,O.jointRadius=E.radius;O.visible=E!==null}let q=H.joints["index-finger-tip"],U=H.joints["thumb-tip"],F=q.position.distanceTo(U.position),V=0.02,G=0.005;if(H.inputState.pinching&&F>V+G)H.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!H.inputState.pinching&&F<=V-G)H.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(K=$.getPose(J.gripSpace,Q),K!==null){if(Y.matrix.fromArray(K.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,K.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(K.linearVelocity);else Y.hasLinearVelocity=!1;if(K.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(K.angularVelocity);else Y.hasAngularVelocity=!1}}if(X!==null){if(Z=$.getPose(J.targetRaySpace,Q),Z===null&&K!==null)Z=K;if(Z!==null){if(X.matrix.fromArray(Z.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,Z.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy(Z.linearVelocity);else X.hasLinearVelocity=!1;if(Z.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy(Z.angularVelocity);else X.hasAngularVelocity=!1;this.dispatchEvent(xq)}}}if(X!==null)X.visible=Z!==null;if(Y!==null)Y.visible=K!==null;if(H!==null)H.visible=W!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Q=new F0;Q.matrixAutoUpdate=!1,Q.visible=!1,J.joints[$.jointName]=Q,J.add(Q)}return J.joints[$.jointName]}}class c6 extends m9{constructor(J,$){super();let Q=this,Z=null,K=1,W=null,X="local-floor",Y=1,H=null,q=null,U=null,F=null,V=null,G=null,N=$.getContextAttributes(),E=null,O=null,D=[],R=[],B=new O0,z=null,C=new p8;C.layers.enable(1),C.viewport=new O8;let L=new p8;L.layers.enable(2),L.viewport=new O8;let A=[C,L],_=new l6;_.layers.enable(1),_.layers.enable(2);let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(f){let e=D[f];if(e===void 0)e=new h$,D[f]=e;return e.getTargetRaySpace()},this.getControllerGrip=function(f){let e=D[f];if(e===void 0)e=new h$,D[f]=e;return e.getGripSpace()},this.getHand=function(f){let e=D[f];if(e===void 0)e=new h$,D[f]=e;return e.getHandSpace()};function b(f){let e=R.indexOf(f.inputSource);if(e===-1)return;let Z0=D[e];if(Z0!==void 0)Z0.update(f.inputSource,f.frame,H||W),Z0.dispatchEvent({type:f.type,data:f.inputSource})}function s(){Z.removeEventListener("select",b),Z.removeEventListener("selectstart",b),Z.removeEventListener("selectend",b),Z.removeEventListener("squeeze",b),Z.removeEventListener("squeezestart",b),Z.removeEventListener("squeezeend",b),Z.removeEventListener("end",s),Z.removeEventListener("inputsourceschange",a);for(let f=0;f<D.length;f++){let e=R[f];if(e===null)continue;R[f]=null,D[f].disconnect(e)}I=null,k=null,J.setRenderTarget(E),V=null,F=null,U=null,Z=null,O=null,J0.stop(),Q.isPresenting=!1,J.setPixelRatio(z),J.setSize(B.width,B.height,!1),Q.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(f){if(K=f,Q.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(f){if(X=f,Q.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return H||W},this.setReferenceSpace=function(f){H=f},this.getBaseLayer=function(){return F!==null?F:V},this.getBinding=function(){return U},this.getFrame=function(){return G},this.getSession=function(){return Z},this.setSession=async function(f){if(Z=f,Z!==null){if(E=J.getRenderTarget(),Z.addEventListener("select",b),Z.addEventListener("selectstart",b),Z.addEventListener("selectend",b),Z.addEventListener("squeeze",b),Z.addEventListener("squeezestart",b),Z.addEventListener("squeezeend",b),Z.addEventListener("end",s),Z.addEventListener("inputsourceschange",a),N.xrCompatible!==!0)await $.makeXRCompatible();if(z=J.getPixelRatio(),J.getSize(B),Z.renderState.layers===void 0||J.capabilities.isWebGL2===!1){let e={antialias:Z.renderState.layers===void 0?N.antialias:!0,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:K};V=new XRWebGLLayer(Z,$,e),Z.updateRenderState({baseLayer:V}),J.setPixelRatio(1),J.setSize(V.framebufferWidth,V.framebufferHeight,!1),O=new JJ(V.framebufferWidth,V.framebufferHeight,{format:1023,type:1009,colorSpace:J.outputColorSpace,stencilBuffer:N.stencil})}else{let e=null,Z0=null,W0=null;if(N.depth)W0=N.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,e=N.stencil?1027:1026,Z0=N.stencil?1020:1014;let G0={colorFormat:$.RGBA8,depthFormat:W0,scaleFactor:K};U=new XRWebGLBinding(Z,$),F=U.createProjectionLayer(G0),Z.updateRenderState({layers:[F]}),J.setPixelRatio(1),J.setSize(F.textureWidth,F.textureHeight,!1),O=new JJ(F.textureWidth,F.textureHeight,{format:1023,type:1009,depthTexture:new UZ(F.textureWidth,F.textureHeight,Z0,void 0,void 0,void 0,void 0,void 0,void 0,e),stencilBuffer:N.stencil,colorSpace:J.outputColorSpace,samples:N.antialias?4:0});let S0=J.properties.get(O);S0.__ignoreDepthValues=F.ignoreDepthValues}O.isXRRenderTarget=!0,this.setFoveation(Y),H=null,W=await Z.requestReferenceSpace(X),J0.setContext(Z),J0.start(),Q.isPresenting=!0,Q.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode};function a(f){for(let e=0;e<f.removed.length;e++){let Z0=f.removed[e],W0=R.indexOf(Z0);if(W0>=0)R[W0]=null,D[W0].disconnect(Z0)}for(let e=0;e<f.added.length;e++){let Z0=f.added[e],W0=R.indexOf(Z0);if(W0===-1){for(let S0=0;S0<D.length;S0++)if(S0>=R.length){R.push(Z0),W0=S0;break}else if(R[S0]===null){R[S0]=Z0,W0=S0;break}if(W0===-1)break}let G0=D[W0];if(G0)G0.connect(Z0)}}let x=new w,v=new w;function m(f,e,Z0){x.setFromMatrixPosition(e.matrixWorld),v.setFromMatrixPosition(Z0.matrixWorld);let W0=x.distanceTo(v),G0=e.projectionMatrix.elements,S0=Z0.projectionMatrix.elements,x0=G0[14]/(G0[10]-1),_0=G0[14]/(G0[10]+1),m0=(G0[9]+1)/G0[5],g=(G0[9]-1)/G0[5],q8=(G0[8]-1)/G0[0],d0=(S0[8]+1)/S0[0],L0=x0*q8,P0=x0*d0,f0=W0/(-q8+d0),k0=f0*-q8;e.matrixWorld.decompose(f.position,f.quaternion,f.scale),f.translateX(k0),f.translateZ(f0),f.matrixWorld.compose(f.position,f.quaternion,f.scale),f.matrixWorldInverse.copy(f.matrixWorld).invert();let j0=x0+f0,T=_0+f0,M=L0-k0,l=P0+(W0-k0),X0=m0*_0/T*j0,Q0=g*_0/T*j0;f.projectionMatrix.makePerspective(M,l,X0,Q0,j0,T),f.projectionMatrixInverse.copy(f.projectionMatrix).invert()}function o(f,e){if(e===null)f.matrixWorld.copy(f.matrix);else f.matrixWorld.multiplyMatrices(e.matrixWorld,f.matrix);f.matrixWorldInverse.copy(f.matrixWorld).invert()}this.updateCamera=function(f){if(Z===null)return;if(_.near=L.near=C.near=f.near,_.far=L.far=C.far=f.far,I!==_.near||k!==_.far)Z.updateRenderState({depthNear:_.near,depthFar:_.far}),I=_.near,k=_.far;let e=f.parent,Z0=_.cameras;o(_,e);for(let W0=0;W0<Z0.length;W0++)o(Z0[W0],e);if(Z0.length===2)m(_,C,L);else _.projectionMatrix.copy(C.projectionMatrix);p(f,_,e)};function p(f,e,Z0){if(Z0===null)f.matrix.copy(e.matrixWorld);else f.matrix.copy(Z0.matrixWorld),f.matrix.invert(),f.matrix.multiply(e.matrixWorld);if(f.matrix.decompose(f.position,f.quaternion,f.scale),f.updateMatrixWorld(!0),f.projectionMatrix.copy(e.projectionMatrix),f.projectionMatrixInverse.copy(e.projectionMatrixInverse),f.isPerspectiveCamera)f.fov=$7*2*Math.atan(1/f.projectionMatrix.elements[5]),f.zoom=1}this.getCamera=function(){return _},this.getFoveation=function(){if(F===null&&V===null)return;return Y},this.setFoveation=function(f){if(Y=f,F!==null)F.fixedFoveation=f;if(V!==null&&V.fixedFoveation!==void 0)V.fixedFoveation=f};let h=null;function c(f,e){if(q=e.getViewerPose(H||W),G=e,q!==null){let Z0=q.views;if(V!==null)J.setRenderTargetFramebuffer(O,V.framebuffer),J.setRenderTarget(O);let W0=!1;if(Z0.length!==_.cameras.length)_.cameras.length=0,W0=!0;for(let G0=0;G0<Z0.length;G0++){let S0=Z0[G0],x0=null;if(V!==null)x0=V.getViewport(S0);else{let m0=U.getViewSubImage(F,S0);if(x0=m0.viewport,G0===0)J.setRenderTargetTextures(O,m0.colorTexture,F.ignoreDepthValues?void 0:m0.depthStencilTexture),J.setRenderTarget(O)}let _0=A[G0];if(_0===void 0)_0=new p8,_0.layers.enable(G0),_0.viewport=new O8,A[G0]=_0;if(_0.matrix.fromArray(S0.transform.matrix),_0.matrix.decompose(_0.position,_0.quaternion,_0.scale),_0.projectionMatrix.fromArray(S0.projectionMatrix),_0.projectionMatrixInverse.copy(_0.projectionMatrix).invert(),_0.viewport.set(x0.x,x0.y,x0.width,x0.height),G0===0)_.matrix.copy(_0.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale);if(W0===!0)_.cameras.push(_0)}}for(let Z0=0;Z0<D.length;Z0++){let W0=R[Z0],G0=D[Z0];if(W0!==null&&G0!==void 0)G0.update(W0,e,H||W)}if(h)h(f,e);if(e.detectedPlanes)Q.dispatchEvent({type:"planesdetected",data:e});G=null}let J0=new T6;J0.setAnimationLoop(c),this.setAnimationLoop=function(f){h=f},this.dispose=function(){}}}function yq(J,$){function Q(O,D){if(O.matrixAutoUpdate===!0)O.updateMatrix();D.value.copy(O.matrix)}function Z(O,D){if(D.color.getRGB(O.fogColor.value,S6(J)),D.isFog)O.fogNear.value=D.near,O.fogFar.value=D.far;else if(D.isFogExp2)O.fogDensity.value=D.density}function K(O,D,R,B,z){if(D.isMeshBasicMaterial)W(O,D);else if(D.isMeshLambertMaterial)W(O,D);else if(D.isMeshToonMaterial)W(O,D),F(O,D);else if(D.isMeshPhongMaterial)W(O,D),U(O,D);else if(D.isMeshStandardMaterial){if(W(O,D),V(O,D),D.isMeshPhysicalMaterial)G(O,D,z)}else if(D.isMeshMatcapMaterial)W(O,D),N(O,D);else if(D.isMeshDepthMaterial)W(O,D);else if(D.isMeshDistanceMaterial)W(O,D),E(O,D);else if(D.isMeshNormalMaterial)W(O,D);else if(D.isLineBasicMaterial){if(X(O,D),D.isLineDashedMaterial)Y(O,D)}else if(D.isPointsMaterial)H(O,D,R,B);else if(D.isSpriteMaterial)q(O,D);else if(D.isShadowMaterial)O.color.value.copy(D.color),O.opacity.value=D.opacity;else if(D.isShaderMaterial)D.uniformsNeedUpdate=!1}function W(O,D){if(O.opacity.value=D.opacity,D.color)O.diffuse.value.copy(D.color);if(D.emissive)O.emissive.value.copy(D.emissive).multiplyScalar(D.emissiveIntensity);if(D.map)O.map.value=D.map,Q(D.map,O.mapTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Q(D.alphaMap,O.alphaMapTransform);if(D.bumpMap){if(O.bumpMap.value=D.bumpMap,Q(D.bumpMap,O.bumpMapTransform),O.bumpScale.value=D.bumpScale,D.side===1)O.bumpScale.value*=-1}if(D.normalMap){if(O.normalMap.value=D.normalMap,Q(D.normalMap,O.normalMapTransform),O.normalScale.value.copy(D.normalScale),D.side===1)O.normalScale.value.negate()}if(D.displacementMap)O.displacementMap.value=D.displacementMap,Q(D.displacementMap,O.displacementMapTransform),O.displacementScale.value=D.displacementScale,O.displacementBias.value=D.displacementBias;if(D.emissiveMap)O.emissiveMap.value=D.emissiveMap,Q(D.emissiveMap,O.emissiveMapTransform);if(D.specularMap)O.specularMap.value=D.specularMap,Q(D.specularMap,O.specularMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest;let R=$.get(D).envMap;if(R)O.envMap.value=R,O.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,O.reflectivity.value=D.reflectivity,O.ior.value=D.ior,O.refractionRatio.value=D.refractionRatio;if(D.lightMap){O.lightMap.value=D.lightMap;let B=J._useLegacyLights===!0?Math.PI:1;O.lightMapIntensity.value=D.lightMapIntensity*B,Q(D.lightMap,O.lightMapTransform)}if(D.aoMap)O.aoMap.value=D.aoMap,O.aoMapIntensity.value=D.aoMapIntensity,Q(D.aoMap,O.aoMapTransform)}function X(O,D){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,D.map)O.map.value=D.map,Q(D.map,O.mapTransform)}function Y(O,D){O.dashSize.value=D.dashSize,O.totalSize.value=D.dashSize+D.gapSize,O.scale.value=D.scale}function H(O,D,R,B){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,O.size.value=D.size*R,O.scale.value=B*0.5,D.map)O.map.value=D.map,Q(D.map,O.uvTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Q(D.alphaMap,O.alphaMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest}function q(O,D){if(O.diffuse.value.copy(D.color),O.opacity.value=D.opacity,O.rotation.value=D.rotation,D.map)O.map.value=D.map,Q(D.map,O.mapTransform);if(D.alphaMap)O.alphaMap.value=D.alphaMap,Q(D.alphaMap,O.alphaMapTransform);if(D.alphaTest>0)O.alphaTest.value=D.alphaTest}function U(O,D){O.specular.value.copy(D.specular),O.shininess.value=Math.max(D.shininess,0.0001)}function F(O,D){if(D.gradientMap)O.gradientMap.value=D.gradientMap}function V(O,D){if(O.metalness.value=D.metalness,D.metalnessMap)O.metalnessMap.value=D.metalnessMap,Q(D.metalnessMap,O.metalnessMapTransform);if(O.roughness.value=D.roughness,D.roughnessMap)O.roughnessMap.value=D.roughnessMap,Q(D.roughnessMap,O.roughnessMapTransform);if($.get(D).envMap)O.envMapIntensity.value=D.envMapIntensity}function G(O,D,R){if(O.ior.value=D.ior,D.sheen>0){if(O.sheenColor.value.copy(D.sheenColor).multiplyScalar(D.sheen),O.sheenRoughness.value=D.sheenRoughness,D.sheenColorMap)O.sheenColorMap.value=D.sheenColorMap,Q(D.sheenColorMap,O.sheenColorMapTransform);if(D.sheenRoughnessMap)O.sheenRoughnessMap.value=D.sheenRoughnessMap,Q(D.sheenRoughnessMap,O.sheenRoughnessMapTransform)}if(D.clearcoat>0){if(O.clearcoat.value=D.clearcoat,O.clearcoatRoughness.value=D.clearcoatRoughness,D.clearcoatMap)O.clearcoatMap.value=D.clearcoatMap,Q(D.clearcoatMap,O.clearcoatMapTransform);if(D.clearcoatRoughnessMap)O.clearcoatRoughnessMap.value=D.clearcoatRoughnessMap,Q(D.clearcoatRoughnessMap,O.clearcoatRoughnessMapTransform);if(D.clearcoatNormalMap){if(O.clearcoatNormalMap.value=D.clearcoatNormalMap,Q(D.clearcoatNormalMap,O.clearcoatNormalMapTransform),O.clearcoatNormalScale.value.copy(D.clearcoatNormalScale),D.side===1)O.clearcoatNormalScale.value.negate()}}if(D.iridescence>0){if(O.iridescence.value=D.iridescence,O.iridescenceIOR.value=D.iridescenceIOR,O.iridescenceThicknessMinimum.value=D.iridescenceThicknessRange[0],O.iridescenceThicknessMaximum.value=D.iridescenceThicknessRange[1],D.iridescenceMap)O.iridescenceMap.value=D.iridescenceMap,Q(D.iridescenceMap,O.iridescenceMapTransform);if(D.iridescenceThicknessMap)O.iridescenceThicknessMap.value=D.iridescenceThicknessMap,Q(D.iridescenceThicknessMap,O.iridescenceThicknessMapTransform)}if(D.transmission>0){if(O.transmission.value=D.transmission,O.transmissionSamplerMap.value=R.texture,O.transmissionSamplerSize.value.set(R.width,R.height),D.transmissionMap)O.transmissionMap.value=D.transmissionMap,Q(D.transmissionMap,O.transmissionMapTransform);if(O.thickness.value=D.thickness,D.thicknessMap)O.thicknessMap.value=D.thicknessMap,Q(D.thicknessMap,O.thicknessMapTransform);O.attenuationDistance.value=D.attenuationDistance,O.attenuationColor.value.copy(D.attenuationColor)}if(D.anisotropy>0){if(O.anisotropyVector.value.set(D.anisotropy*Math.cos(D.anisotropyRotation),D.anisotropy*Math.sin(D.anisotropyRotation)),D.anisotropyMap)O.anisotropyMap.value=D.anisotropyMap,Q(D.anisotropyMap,O.anisotropyMapTransform)}if(O.specularIntensity.value=D.specularIntensity,O.specularColor.value.copy(D.specularColor),D.specularColorMap)O.specularColorMap.value=D.specularColorMap,Q(D.specularColorMap,O.specularColorMapTransform);if(D.specularIntensityMap)O.specularIntensityMap.value=D.specularIntensityMap,Q(D.specularIntensityMap,O.specularIntensityMapTransform)}function N(O,D){if(D.matcap)O.matcap.value=D.matcap}function E(O,D){let R=$.get(D).light;O.referencePosition.value.setFromMatrixPosition(R.matrixWorld),O.nearDistance.value=R.shadow.camera.near,O.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function bq(J,$,Q,Z){let K={},W={},X=[],Y=Q.isWebGL2?J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS):0;function H(R,B){let z=B.program;Z.uniformBlockBinding(R,z)}function q(R,B){let z=K[R.id];if(z===void 0)N(R),z=U(R),K[R.id]=z,R.addEventListener("dispose",O);let C=B.program;Z.updateUBOMapping(R,C);let L=$.render.frame;if(W[R.id]!==L)V(R),W[R.id]=L}function U(R){let B=F();R.__bindingPointIndex=B;let z=J.createBuffer(),C=R.__size,L=R.usage;return J.bindBuffer(J.UNIFORM_BUFFER,z),J.bufferData(J.UNIFORM_BUFFER,C,L),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,B,z),z}function F(){for(let R=0;R<Y;R++)if(X.indexOf(R)===-1)return X.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function V(R){let B=K[R.id],z=R.uniforms,C=R.__cache;J.bindBuffer(J.UNIFORM_BUFFER,B);for(let L=0,A=z.length;L<A;L++){let _=Array.isArray(z[L])?z[L]:[z[L]];for(let I=0,k=_.length;I<k;I++){let b=_[I];if(G(b,L,I,C)===!0){let s=b.__offset,a=Array.isArray(b.value)?b.value:[b.value],x=0;for(let v=0;v<a.length;v++){let m=a[v],o=E(m);if(typeof m==="number"||typeof m==="boolean")b.__data[0]=m,J.bufferSubData(J.UNIFORM_BUFFER,s+x,b.__data);else if(m.isMatrix3)b.__data[0]=m.elements[0],b.__data[1]=m.elements[1],b.__data[2]=m.elements[2],b.__data[3]=0,b.__data[4]=m.elements[3],b.__data[5]=m.elements[4],b.__data[6]=m.elements[5],b.__data[7]=0,b.__data[8]=m.elements[6],b.__data[9]=m.elements[7],b.__data[10]=m.elements[8],b.__data[11]=0;else m.toArray(b.__data,x),x+=o.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,s,b.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function G(R,B,z,C){let L=R.value,A=B+"_"+z;if(C[A]===void 0){if(typeof L==="number"||typeof L==="boolean")C[A]=L;else C[A]=L.clone();return!0}else{let _=C[A];if(typeof L==="number"||typeof L==="boolean"){if(_!==L)return C[A]=L,!0}else if(_.equals(L)===!1)return _.copy(L),!0}return!1}function N(R){let B=R.uniforms,z=0,C=16;for(let A=0,_=B.length;A<_;A++){let I=Array.isArray(B[A])?B[A]:[B[A]];for(let k=0,b=I.length;k<b;k++){let s=I[k],a=Array.isArray(s.value)?s.value:[s.value];for(let x=0,v=a.length;x<v;x++){let m=a[x],o=E(m),p=z%C;if(p!==0&&C-p<o.boundary)z+=C-p;s.__data=new Float32Array(o.storage/Float32Array.BYTES_PER_ELEMENT),s.__offset=z,z+=o.storage}}}let L=z%C;if(L>0)z+=C-L;return R.__size=z,R.__cache={},this}function E(R){let B={boundary:0,storage:0};if(typeof R==="number"||typeof R==="boolean")B.boundary=4,B.storage=4;else if(R.isVector2)B.boundary=8,B.storage=8;else if(R.isVector3||R.isColor)B.boundary=16,B.storage=12;else if(R.isVector4)B.boundary=16,B.storage=16;else if(R.isMatrix3)B.boundary=48,B.storage=48;else if(R.isMatrix4)B.boundary=64,B.storage=64;else if(R.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R);return B}function O(R){let B=R.target;B.removeEventListener("dispose",O);let z=X.indexOf(B.__bindingPointIndex);X.splice(z,1),J.deleteBuffer(K[B.id]),delete K[B.id],delete W[B.id]}function D(){for(let R in K)J.deleteBuffer(K[R]);X=[],K={},W={}}return{bind:H,update:q,dispose:D}}class n${constructor(J={}){let{canvas:$=lW(),context:Q=null,depth:Z=!0,stencil:K=!0,alpha:W=!1,antialias:X=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:H=!1,powerPreference:q="default",failIfMajorPerformanceCaveat:U=!1}=J;this.isWebGLRenderer=!0;let F;if(Q!==null)F=Q.getContextAttributes().alpha;else F=W;let V=new Uint32Array(4),G=new Int32Array(4),N=null,E=null,O=[],D=[];this.domElement=$,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace="srgb",this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let R=this,B=!1,z=0,C=0,L=null,A=-1,_=null,I=new O8,k=new O8,b=null,s=new t0(0),a=0,x=$.width,v=$.height,m=1,o=null,p=null,h=new O8(0,0,x,v),c=new O8(0,0,x,v),J0=!1,f=new l$,e=!1,Z0=!1,W0=null,G0=new H8,S0=new O0,x0=new w,_0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function m0(){return L===null?m:1}let g=Q;function q8(P,u){for(let i=0;i<P.length;i++){let r=P[i],n=$.getContext(r,u);if(n!==null)return n}return null}try{let P={alpha:!0,depth:Z,stencil:K,antialias:X,premultipliedAlpha:Y,preserveDrawingBuffer:H,powerPreference:q,failIfMajorPerformanceCaveat:U};if("setAttribute"in $)$.setAttribute("data-engine","three.js r160");if($.addEventListener("webglcontextlost",u0,!1),$.addEventListener("webglcontextrestored",H0,!1),$.addEventListener("webglcontextcreationerror",y,!1),g===null){let u=["webgl2","webgl","experimental-webgl"];if(R.isWebGL1Renderer===!0)u.shift();if(g=q8(u,P),g===null)if(q8(u))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}if(typeof WebGLRenderingContext<"u"&&g instanceof WebGLRenderingContext)console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.");if(g.getShaderPrecisionFormat===void 0)g.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let d0,L0,P0,f0,k0,j0,T,M,l,X0,Q0,Y0,T0,q0,z0,M0,v0,K0,G8,p0,y0,B0,j,$0;function U0(){d0=new JH(g),L0=new i1(g,d0,J),d0.init(L0),B0=new jq(g,d0,L0),P0=new _q(g,d0,L0),f0=new ZH(g),k0=new Rq,j0=new Tq(g,d0,P0,k0,L0,B0,f0),T=new r1(R),M=new e1(R),l=new FY(g,L0),j=new n1(g,d0,l,L0),X0=new $H(g,l,f0,j),Q0=new XH(g,X0,l,f0),G8=new YH(g,L0,j0),M0=new o1(k0),Y0=new Nq(R,T,M,d0,L0,j,M0),T0=new yq(R,k0),q0=new zq,z0=new kq(d0,L0),K0=new c1(R,T,M,P0,Q0,F,Y),v0=new wq(R,Q0,L0),$0=new bq(g,f0,L0,P0),p0=new s1(g,d0,f0,L0),y0=new QH(g,d0,f0,L0),f0.programs=Y0.programs,R.capabilities=L0,R.extensions=d0,R.properties=k0,R.renderLists=q0,R.shadowMap=v0,R.state=P0,R.info=f0}U0();let R0=new c6(R,g);this.xr=R0,this.getContext=function(){return g},this.getContextAttributes=function(){return g.getContextAttributes()},this.forceContextLoss=function(){let P=d0.get("WEBGL_lose_context");if(P)P.loseContext()},this.forceContextRestore=function(){let P=d0.get("WEBGL_lose_context");if(P)P.restoreContext()},this.getPixelRatio=function(){return m},this.setPixelRatio=function(P){if(P===void 0)return;m=P,this.setSize(x,v,!1)},this.getSize=function(P){return P.set(x,v)},this.setSize=function(P,u,i=!0){if(R0.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(x=P,v=u,$.width=Math.floor(P*m),$.height=Math.floor(u*m),i===!0)$.style.width=P+"px",$.style.height=u+"px";this.setViewport(0,0,P,u)},this.getDrawingBufferSize=function(P){return P.set(x*m,v*m).floor()},this.setDrawingBufferSize=function(P,u,i){x=P,v=u,m=i,$.width=Math.floor(P*i),$.height=Math.floor(u*i),this.setViewport(0,0,P,u)},this.getCurrentViewport=function(P){return P.copy(I)},this.getViewport=function(P){return P.copy(h)},this.setViewport=function(P,u,i,r){if(P.isVector4)h.set(P.x,P.y,P.z,P.w);else h.set(P,u,i,r);P0.viewport(I.copy(h).multiplyScalar(m).floor())},this.getScissor=function(P){return P.copy(c)},this.setScissor=function(P,u,i,r){if(P.isVector4)c.set(P.x,P.y,P.z,P.w);else c.set(P,u,i,r);P0.scissor(k.copy(c).multiplyScalar(m).floor())},this.getScissorTest=function(){return J0},this.setScissorTest=function(P){P0.setScissorTest(J0=P)},this.setOpaqueSort=function(P){o=P},this.setTransparentSort=function(P){p=P},this.getClearColor=function(P){return P.copy(K0.getClearColor())},this.setClearColor=function(){K0.setClearColor.apply(K0,arguments)},this.getClearAlpha=function(){return K0.getClearAlpha()},this.setClearAlpha=function(){K0.setClearAlpha.apply(K0,arguments)},this.clear=function(P=!0,u=!0,i=!0){let r=0;if(P){let n=!1;if(L!==null){let I0=L.texture.format;n=I0===1033||I0===1031||I0===1029}if(n){let I0=L.texture.type,w0=I0===1009||I0===1014||I0===1012||I0===1020||I0===1017||I0===1018,h0=K0.getClearColor(),g0=K0.getClearAlpha(),s0=h0.r,l0=h0.g,c0=h0.b;if(w0)V[0]=s0,V[1]=l0,V[2]=c0,V[3]=g0,g.clearBufferuiv(g.COLOR,0,V);else G[0]=s0,G[1]=l0,G[2]=c0,G[3]=g0,g.clearBufferiv(g.COLOR,0,G)}else r|=g.COLOR_BUFFER_BIT}if(u)r|=g.DEPTH_BUFFER_BIT;if(i)r|=g.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);g.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){if($.removeEventListener("webglcontextlost",u0,!1),$.removeEventListener("webglcontextrestored",H0,!1),$.removeEventListener("webglcontextcreationerror",y,!1),q0.dispose(),z0.dispose(),k0.dispose(),T.dispose(),M.dispose(),Q0.dispose(),j.dispose(),$0.dispose(),Y0.dispose(),R0.dispose(),R0.removeEventListener("sessionstart",U8),R0.removeEventListener("sessionend",M8),W0)W0.dispose(),W0=null;a0.stop()};function u0(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function H0(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;let P=f0.autoReset,u=v0.enabled,i=v0.autoUpdate,r=v0.needsUpdate,n=v0.type;U0(),f0.autoReset=P,v0.enabled=u,v0.autoUpdate=i,v0.needsUpdate=r,v0.type=n}function y(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function E0(P){let u=P.target;u.removeEventListener("dispose",E0),N0(u)}function N0(P){b0(P),k0.remove(P)}function b0(P){let u=k0.get(P).programs;if(u!==void 0){if(u.forEach(function(i){Y0.releaseProgram(i)}),P.isShaderMaterial)Y0.releaseShaderCache(P)}}this.renderBufferDirect=function(P,u,i,r,n,I0){if(u===null)u=_0;let w0=n.isMesh&&n.matrixWorld.determinant()<0,h0=kW(P,u,i,r,n);P0.setMaterial(r,w0);let g0=i.index,s0=1;if(r.wireframe===!0){if(g0=X0.getWireframeAttribute(i),g0===void 0)return;s0=2}let l0=i.drawRange,c0=i.attributes.position,k8=l0.start*s0,K9=(l0.start+l0.count)*s0;if(I0!==null)k8=Math.max(k8,I0.start*s0),K9=Math.min(K9,(I0.start+I0.count)*s0);if(g0!==null)k8=Math.max(k8,0),K9=Math.min(K9,g0.count);else if(c0!==void 0&&c0!==null)k8=Math.max(k8,0),K9=Math.min(K9,c0.count);let y8=K9-k8;if(y8<0||y8===1/0)return;j.setup(n,r,h0,i,g0);let j9,R8=p0;if(g0!==null)j9=l.get(g0),R8=y0,R8.setIndex(j9);if(n.isMesh)if(r.wireframe===!0)P0.setLineWidth(r.wireframeLinewidth*m0()),R8.setMode(g.LINES);else R8.setMode(g.TRIANGLES);else if(n.isLine){let i0=r.linewidth;if(i0===void 0)i0=1;if(P0.setLineWidth(i0*m0()),n.isLineSegments)R8.setMode(g.LINES);else if(n.isLineLoop)R8.setMode(g.LINE_LOOP);else R8.setMode(g.LINE_STRIP)}else if(n.isPoints)R8.setMode(g.POINTS);else if(n.isSprite)R8.setMode(g.TRIANGLES);if(n.isBatchedMesh)R8.renderMultiDraw(n._multiDrawStarts,n._multiDrawCounts,n._multiDrawCount);else if(n.isInstancedMesh)R8.renderInstances(k8,y8,n.count);else if(i.isInstancedBufferGeometry){let i0=i._maxInstanceCount!==void 0?i._maxInstanceCount:1/0,DQ=Math.min(i.instanceCount,i0);R8.renderInstances(k8,y8,DQ)}else R8.render(k8,y8)};function A0(P,u,i){if(P.transparent===!0&&P.side===2&&P.forceSinglePass===!1)P.side=1,P.needsUpdate=!0,Y$(P,u,i),P.side=0,P.needsUpdate=!0,Y$(P,u,i),P.side=2;else Y$(P,u,i)}this.compile=function(P,u,i=null){if(i===null)i=P;if(E=z0.get(i),E.init(),D.push(E),i.traverseVisible(function(n){if(n.isLight&&n.layers.test(u.layers)){if(E.pushLight(n),n.castShadow)E.pushShadow(n)}}),P!==i)P.traverseVisible(function(n){if(n.isLight&&n.layers.test(u.layers)){if(E.pushLight(n),n.castShadow)E.pushShadow(n)}});E.setupLights(R._useLegacyLights);let r=new Set;return P.traverse(function(n){let I0=n.material;if(I0)if(Array.isArray(I0))for(let w0=0;w0<I0.length;w0++){let h0=I0[w0];A0(h0,i,n),r.add(h0)}else A0(I0,i,n),r.add(I0)}),D.pop(),E=null,r},this.compileAsync=function(P,u,i=null){let r=this.compile(P,u,i);return new Promise((n)=>{function I0(){if(r.forEach(function(w0){if(k0.get(w0).currentProgram.isReady())r.delete(w0)}),r.size===0){n(P);return}setTimeout(I0,10)}if(d0.get("KHR_parallel_shader_compile")!==null)I0();else setTimeout(I0,10)})};let r0=null;function $8(P){if(r0)r0(P)}function U8(){a0.stop()}function M8(){a0.start()}let a0=new T6;if(a0.setAnimationLoop($8),typeof self<"u")a0.setContext(self);this.setAnimationLoop=function(P){r0=P,R0.setAnimationLoop(P),P===null?a0.stop():a0.start()},R0.addEventListener("sessionstart",U8),R0.addEventListener("sessionend",M8),this.render=function(P,u){if(u!==void 0&&u.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(P.matrixWorldAutoUpdate===!0)P.updateMatrixWorld();if(u.parent===null&&u.matrixWorldAutoUpdate===!0)u.updateMatrixWorld();if(R0.enabled===!0&&R0.isPresenting===!0){if(R0.cameraAutoUpdate===!0)R0.updateCamera(u);u=R0.getCamera()}if(P.isScene===!0)P.onBeforeRender(R,P,u,L);if(E=z0.get(P,D.length),E.init(),D.push(E),G0.multiplyMatrices(u.projectionMatrix,u.matrixWorldInverse),f.setFromProjectionMatrix(G0),Z0=this.localClippingEnabled,e=M0.init(this.clippingPlanes,Z0),N=q0.get(P,O.length),N.init(),O.push(N),z9(P,u,0,R.sortObjects),N.finish(),R.sortObjects===!0)N.sort(o,p);if(this.info.render.frame++,e===!0)M0.beginShadows();let i=E.state.shadowsArray;if(v0.render(i,P,u),e===!0)M0.endShadows();if(this.info.autoReset===!0)this.info.reset();if(K0.render(N,P),E.setupLights(R._useLegacyLights),u.isArrayCamera){let r=u.cameras;for(let n=0,I0=r.length;n<I0;n++){let w0=r[n];I9(N,P,w0,w0.viewport)}}else I9(N,P,u);if(L!==null)j0.updateMultisampleRenderTarget(L),j0.updateRenderTargetMipmap(L);if(P.isScene===!0)P.onAfterRender(R,P,u);if(j.resetDefaultState(),A=-1,_=null,D.pop(),D.length>0)E=D[D.length-1];else E=null;if(O.pop(),O.length>0)N=O[O.length-1];else N=null};function z9(P,u,i,r){if(P.visible===!1)return;if(P.layers.test(u.layers)){if(P.isGroup)i=P.renderOrder;else if(P.isLOD){if(P.autoUpdate===!0)P.update(u)}else if(P.isLight){if(E.pushLight(P),P.castShadow)E.pushShadow(P)}else if(P.isSprite){if(!P.frustumCulled||f.intersectsSprite(P)){if(r)x0.setFromMatrixPosition(P.matrixWorld).applyMatrix4(G0);let w0=Q0.update(P),h0=P.material;if(h0.visible)N.push(P,w0,h0,i,x0.z,null)}}else if(P.isMesh||P.isLine||P.isPoints){if(!P.frustumCulled||f.intersectsObject(P)){let w0=Q0.update(P),h0=P.material;if(r){if(P.boundingSphere!==void 0){if(P.boundingSphere===null)P.computeBoundingSphere();x0.copy(P.boundingSphere.center)}else{if(w0.boundingSphere===null)w0.computeBoundingSphere();x0.copy(w0.boundingSphere.center)}x0.applyMatrix4(P.matrixWorld).applyMatrix4(G0)}if(Array.isArray(h0)){let g0=w0.groups;for(let s0=0,l0=g0.length;s0<l0;s0++){let c0=g0[s0],k8=h0[c0.materialIndex];if(k8&&k8.visible)N.push(P,w0,k8,i,x0.z,c0)}}else if(h0.visible)N.push(P,w0,h0,i,x0.z,null)}}}let I0=P.children;for(let w0=0,h0=I0.length;w0<h0;w0++)z9(I0[w0],u,i,r)}function I9(P,u,i,r){let{opaque:n,transmissive:I0,transparent:w0}=P;if(E.setupLightsView(i),e===!0)M0.setGlobalState(R.clippingPlanes,i);if(I0.length>0)MW(n,I0,u,i);if(r)P0.viewport(I.copy(r));if(n.length>0)W$(n,u,i);if(I0.length>0)W$(I0,u,i);if(w0.length>0)W$(w0,u,i);P0.buffers.depth.setTest(!0),P0.buffers.depth.setMask(!0),P0.buffers.color.setMask(!0),P0.setPolygonOffset(!1)}function MW(P,u,i,r){if((i.isScene===!0?i.overrideMaterial:null)!==null)return;let I0=L0.isWebGL2;if(W0===null)W0=new JJ(1,1,{generateMipmaps:!0,type:d0.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:I0?4:0});if(R.getDrawingBufferSize(S0),I0)W0.setSize(S0.x,S0.y);else W0.setSize(v$(S0.x),v$(S0.y));let w0=R.getRenderTarget();if(R.setRenderTarget(W0),R.getClearColor(s),a=R.getClearAlpha(),a<1)R.setClearColor(16777215,0.5);R.clear();let h0=R.toneMapping;R.toneMapping=0,W$(P,i,r),j0.updateMultisampleRenderTarget(W0),j0.updateRenderTargetMipmap(W0);let g0=!1;for(let s0=0,l0=u.length;s0<l0;s0++){let c0=u[s0],k8=c0.object,K9=c0.geometry,y8=c0.material,j9=c0.group;if(y8.side===2&&k8.layers.test(r.layers)){let R8=y8.side;y8.side=1,y8.needsUpdate=!0,R5(k8,i,r,K9,y8,j9),y8.side=R8,y8.needsUpdate=!0,g0=!0}}if(g0===!0)j0.updateMultisampleRenderTarget(W0),j0.updateRenderTargetMipmap(W0);R.setRenderTarget(w0),R.setClearColor(s,a),R.toneMapping=h0}function W$(P,u,i){let r=u.isScene===!0?u.overrideMaterial:null;for(let n=0,I0=P.length;n<I0;n++){let w0=P[n],h0=w0.object,g0=w0.geometry,s0=r===null?w0.material:r,l0=w0.group;if(h0.layers.test(i.layers))R5(h0,u,i,g0,s0,l0)}}function R5(P,u,i,r,n,I0){if(P.onBeforeRender(R,u,i,r,n,I0),P.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),n.onBeforeRender(R,u,i,r,P,I0),n.transparent===!0&&n.side===2&&n.forceSinglePass===!1)n.side=1,n.needsUpdate=!0,R.renderBufferDirect(i,u,r,n,P,I0),n.side=0,n.needsUpdate=!0,R.renderBufferDirect(i,u,r,n,P,I0),n.side=2;else R.renderBufferDirect(i,u,r,n,P,I0);P.onAfterRender(R,u,i,r,n,I0)}function Y$(P,u,i){if(u.isScene!==!0)u=_0;let r=k0.get(P),n=E.state.lights,I0=E.state.shadowsArray,w0=n.state.version,h0=Y0.getParameters(P,n.state,I0,u,i),g0=Y0.getProgramCacheKey(h0),s0=r.programs;if(r.environment=P.isMeshStandardMaterial?u.environment:null,r.fog=u.fog,r.envMap=(P.isMeshStandardMaterial?M:T).get(P.envMap||r.environment),s0===void 0)P.addEventListener("dispose",E0),s0=new Map,r.programs=s0;let l0=s0.get(g0);if(l0!==void 0){if(r.currentProgram===l0&&r.lightsStateVersion===w0)return z5(P,h0),l0}else h0.uniforms=Y0.getUniforms(P),P.onBuild(i,h0,R),P.onBeforeCompile(h0,R),l0=Y0.acquireProgram(h0,g0),s0.set(g0,l0),r.uniforms=h0.uniforms;let c0=r.uniforms;if(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)c0.clippingPlanes=M0.uniform;if(z5(P,h0),r.needsLights=SW(P),r.lightsStateVersion=w0,r.needsLights)c0.ambientLightColor.value=n.state.ambient,c0.lightProbe.value=n.state.probe,c0.directionalLights.value=n.state.directional,c0.directionalLightShadows.value=n.state.directionalShadow,c0.spotLights.value=n.state.spot,c0.spotLightShadows.value=n.state.spotShadow,c0.rectAreaLights.value=n.state.rectArea,c0.ltc_1.value=n.state.rectAreaLTC1,c0.ltc_2.value=n.state.rectAreaLTC2,c0.pointLights.value=n.state.point,c0.pointLightShadows.value=n.state.pointShadow,c0.hemisphereLights.value=n.state.hemi,c0.directionalShadowMap.value=n.state.directionalShadowMap,c0.directionalShadowMatrix.value=n.state.directionalShadowMatrix,c0.spotShadowMap.value=n.state.spotShadowMap,c0.spotLightMatrix.value=n.state.spotLightMatrix,c0.spotLightMap.value=n.state.spotLightMap,c0.pointShadowMap.value=n.state.pointShadowMap,c0.pointShadowMatrix.value=n.state.pointShadowMatrix;return r.currentProgram=l0,r.uniformsList=null,l0}function B5(P){if(P.uniformsList===null){let u=P.currentProgram.getUniforms();P.uniformsList=y7.seqWithValue(u.seq,P.uniforms)}return P.uniformsList}function z5(P,u){let i=k0.get(P);i.outputColorSpace=u.outputColorSpace,i.batching=u.batching,i.instancing=u.instancing,i.instancingColor=u.instancingColor,i.skinning=u.skinning,i.morphTargets=u.morphTargets,i.morphNormals=u.morphNormals,i.morphColors=u.morphColors,i.morphTargetsCount=u.morphTargetsCount,i.numClippingPlanes=u.numClippingPlanes,i.numIntersection=u.numClipIntersection,i.vertexAlphas=u.vertexAlphas,i.vertexTangents=u.vertexTangents,i.toneMapping=u.toneMapping}function kW(P,u,i,r,n){if(u.isScene!==!0)u=_0;j0.resetTextureUnits();let I0=u.fog,w0=r.isMeshStandardMaterial?u.environment:null,h0=L===null?R.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:"srgb-linear",g0=(r.isMeshStandardMaterial?M:T).get(r.envMap||w0),s0=r.vertexColors===!0&&!!i.attributes.color&&i.attributes.color.itemSize===4,l0=!!i.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),c0=!!i.morphAttributes.position,k8=!!i.morphAttributes.normal,K9=!!i.morphAttributes.color,y8=0;if(r.toneMapped){if(L===null||L.isXRRenderTarget===!0)y8=R.toneMapping}let j9=i.morphAttributes.position||i.morphAttributes.normal||i.morphAttributes.color,R8=j9!==void 0?j9.length:0,i0=k0.get(r),DQ=E.state.lights;if(e===!0){if(Z0===!0||P!==_){let F9=P===_&&r.id===A;M0.setState(r,P,F9)}}let L8=!1;if(r.version===i0.__version){if(i0.needsLights&&i0.lightsStateVersion!==DQ.state.version)L8=!0;else if(i0.outputColorSpace!==h0)L8=!0;else if(n.isBatchedMesh&&i0.batching===!1)L8=!0;else if(!n.isBatchedMesh&&i0.batching===!0)L8=!0;else if(n.isInstancedMesh&&i0.instancing===!1)L8=!0;else if(!n.isInstancedMesh&&i0.instancing===!0)L8=!0;else if(n.isSkinnedMesh&&i0.skinning===!1)L8=!0;else if(!n.isSkinnedMesh&&i0.skinning===!0)L8=!0;else if(n.isInstancedMesh&&i0.instancingColor===!0&&n.instanceColor===null)L8=!0;else if(n.isInstancedMesh&&i0.instancingColor===!1&&n.instanceColor!==null)L8=!0;else if(i0.envMap!==g0)L8=!0;else if(r.fog===!0&&i0.fog!==I0)L8=!0;else if(i0.numClippingPlanes!==void 0&&(i0.numClippingPlanes!==M0.numPlanes||i0.numIntersection!==M0.numIntersection))L8=!0;else if(i0.vertexAlphas!==s0)L8=!0;else if(i0.vertexTangents!==l0)L8=!0;else if(i0.morphTargets!==c0)L8=!0;else if(i0.morphNormals!==k8)L8=!0;else if(i0.morphColors!==K9)L8=!0;else if(i0.toneMapping!==y8)L8=!0;else if(L0.isWebGL2===!0&&i0.morphTargetsCount!==R8)L8=!0}else L8=!0,i0.__version=r.version;let FJ=i0.currentProgram;if(L8===!0)FJ=Y$(r,u,n);let I5=!1,L7=!1,EQ=!1,m8=FJ.getUniforms(),VJ=i0.uniforms;if(P0.useProgram(FJ.program))I5=!0,L7=!0,EQ=!0;if(r.id!==A)A=r.id,L7=!0;if(I5||_!==P){m8.setValue(g,"projectionMatrix",P.projectionMatrix),m8.setValue(g,"viewMatrix",P.matrixWorldInverse);let F9=m8.map.cameraPosition;if(F9!==void 0)F9.setValue(g,x0.setFromMatrixPosition(P.matrixWorld));if(L0.logarithmicDepthBuffer)m8.setValue(g,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2));if(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)m8.setValue(g,"isOrthographic",P.isOrthographicCamera===!0);if(_!==P)_=P,L7=!0,EQ=!0}if(n.isSkinnedMesh){m8.setOptional(g,n,"bindMatrix"),m8.setOptional(g,n,"bindMatrixInverse");let F9=n.skeleton;if(F9)if(L0.floatVertexTextures){if(F9.boneTexture===null)F9.computeBoneTexture();m8.setValue(g,"boneTexture",F9.boneTexture,j0)}else console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.")}if(n.isBatchedMesh)m8.setOptional(g,n,"batchingTexture"),m8.setValue(g,"batchingTexture",n._matricesTexture,j0);let NQ=i.morphAttributes;if(NQ.position!==void 0||NQ.normal!==void 0||NQ.color!==void 0&&L0.isWebGL2===!0)G8.update(n,i,FJ);if(L7||i0.receiveShadow!==n.receiveShadow)i0.receiveShadow=n.receiveShadow,m8.setValue(g,"receiveShadow",n.receiveShadow);if(r.isMeshGouraudMaterial&&r.envMap!==null)VJ.envMap.value=g0,VJ.flipEnvMap.value=g0.isCubeTexture&&g0.isRenderTargetTexture===!1?-1:1;if(L7){if(m8.setValue(g,"toneMappingExposure",R.toneMappingExposure),i0.needsLights)PW(VJ,EQ);if(I0&&r.fog===!0)T0.refreshFogUniforms(VJ,I0);T0.refreshMaterialUniforms(VJ,r,m,v,W0),y7.upload(g,B5(i0),VJ,j0)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0)y7.upload(g,B5(i0),VJ,j0),r.uniformsNeedUpdate=!1;if(r.isSpriteMaterial)m8.setValue(g,"center",n.center);if(m8.setValue(g,"modelViewMatrix",n.modelViewMatrix),m8.setValue(g,"normalMatrix",n.normalMatrix),m8.setValue(g,"modelMatrix",n.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let F9=r.uniformsGroups;for(let RQ=0,wW=F9.length;RQ<wW;RQ++)if(L0.isWebGL2){let L5=F9[RQ];$0.update(L5,FJ),$0.bind(L5,FJ)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return FJ}function PW(P,u){P.ambientLightColor.needsUpdate=u,P.lightProbe.needsUpdate=u,P.directionalLights.needsUpdate=u,P.directionalLightShadows.needsUpdate=u,P.pointLights.needsUpdate=u,P.pointLightShadows.needsUpdate=u,P.spotLights.needsUpdate=u,P.spotLightShadows.needsUpdate=u,P.rectAreaLights.needsUpdate=u,P.hemisphereLights.needsUpdate=u}function SW(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}if(this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(P,u,i){k0.get(P.texture).__webglTexture=u,k0.get(P.depthTexture).__webglTexture=i;let r=k0.get(P);if(r.__hasExternalTextures=!0,r.__hasExternalTextures){if(r.__autoAllocateDepthBuffer=i===void 0,!r.__autoAllocateDepthBuffer){if(d0.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),r.__useRenderToTexture=!1}}},this.setRenderTargetFramebuffer=function(P,u){let i=k0.get(P);i.__webglFramebuffer=u,i.__useDefaultFramebuffer=u===void 0},this.setRenderTarget=function(P,u=0,i=0){L=P,z=u,C=i;let r=!0,n=null,I0=!1,w0=!1;if(P){let g0=k0.get(P);if(g0.__useDefaultFramebuffer!==void 0)P0.bindFramebuffer(g.FRAMEBUFFER,null),r=!1;else if(g0.__webglFramebuffer===void 0)j0.setupRenderTarget(P);else if(g0.__hasExternalTextures)j0.rebindTextures(P,k0.get(P.texture).__webglTexture,k0.get(P.depthTexture).__webglTexture);let s0=P.texture;if(s0.isData3DTexture||s0.isDataArrayTexture||s0.isCompressedArrayTexture)w0=!0;let l0=k0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget){if(Array.isArray(l0[u]))n=l0[u][i];else n=l0[u];I0=!0}else if(L0.isWebGL2&&P.samples>0&&j0.useMultisampledRTT(P)===!1)n=k0.get(P).__webglMultisampledFramebuffer;else if(Array.isArray(l0))n=l0[i];else n=l0;I.copy(P.viewport),k.copy(P.scissor),b=P.scissorTest}else I.copy(h).multiplyScalar(m).floor(),k.copy(c).multiplyScalar(m).floor(),b=J0;if(P0.bindFramebuffer(g.FRAMEBUFFER,n)&&L0.drawBuffers&&r)P0.drawBuffers(P,n);if(P0.viewport(I),P0.scissor(k),P0.setScissorTest(b),I0){let g0=k0.get(P.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_CUBE_MAP_POSITIVE_X+u,g0.__webglTexture,i)}else if(w0){let g0=k0.get(P.texture),s0=u||0;g.framebufferTextureLayer(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g0.__webglTexture,i||0,s0)}A=-1},this.readRenderTargetPixels=function(P,u,i,r,n,I0,w0){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let h0=k0.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&w0!==void 0)h0=h0[w0];if(h0){P0.bindFramebuffer(g.FRAMEBUFFER,h0);try{let g0=P.texture,s0=g0.format,l0=g0.type;if(s0!==1023&&B0.convert(s0)!==g.getParameter(g.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let c0=l0===1016&&(d0.has("EXT_color_buffer_half_float")||L0.isWebGL2&&d0.has("EXT_color_buffer_float"));if(l0!==1009&&B0.convert(l0)!==g.getParameter(g.IMPLEMENTATION_COLOR_READ_TYPE)&&!(l0===1015&&(L0.isWebGL2||d0.has("OES_texture_float")||d0.has("WEBGL_color_buffer_float")))&&!c0){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(u>=0&&u<=P.width-r&&(i>=0&&i<=P.height-n))g.readPixels(u,i,r,n,B0.convert(s0),B0.convert(l0),I0)}finally{let g0=L!==null?k0.get(L).__webglFramebuffer:null;P0.bindFramebuffer(g.FRAMEBUFFER,g0)}}},this.copyFramebufferToTexture=function(P,u,i=0){let r=Math.pow(2,-i),n=Math.floor(u.image.width*r),I0=Math.floor(u.image.height*r);j0.setTexture2D(u,0),g.copyTexSubImage2D(g.TEXTURE_2D,i,0,0,P.x,P.y,n,I0),P0.unbindTexture()},this.copyTextureToTexture=function(P,u,i,r=0){let n=u.image.width,I0=u.image.height,w0=B0.convert(i.format),h0=B0.convert(i.type);if(j0.setTexture2D(i,0),g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,i.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,i.unpackAlignment),u.isDataTexture)g.texSubImage2D(g.TEXTURE_2D,r,P.x,P.y,n,I0,w0,h0,u.image.data);else if(u.isCompressedTexture)g.compressedTexSubImage2D(g.TEXTURE_2D,r,P.x,P.y,u.mipmaps[0].width,u.mipmaps[0].height,w0,u.mipmaps[0].data);else g.texSubImage2D(g.TEXTURE_2D,r,P.x,P.y,w0,h0,u.image);if(r===0&&i.generateMipmaps)g.generateMipmap(g.TEXTURE_2D);P0.unbindTexture()},this.copyTextureToTexture3D=function(P,u,i,r,n=0){if(R.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let I0=P.max.x-P.min.x+1,w0=P.max.y-P.min.y+1,h0=P.max.z-P.min.z+1,g0=B0.convert(r.format),s0=B0.convert(r.type),l0;if(r.isData3DTexture)j0.setTexture3D(r,0),l0=g.TEXTURE_3D;else if(r.isDataArrayTexture||r.isCompressedArrayTexture)j0.setTexture2DArray(r,0),l0=g.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,r.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,r.unpackAlignment);let c0=g.getParameter(g.UNPACK_ROW_LENGTH),k8=g.getParameter(g.UNPACK_IMAGE_HEIGHT),K9=g.getParameter(g.UNPACK_SKIP_PIXELS),y8=g.getParameter(g.UNPACK_SKIP_ROWS),j9=g.getParameter(g.UNPACK_SKIP_IMAGES),R8=i.isCompressedTexture?i.mipmaps[n]:i.image;if(g.pixelStorei(g.UNPACK_ROW_LENGTH,R8.width),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,R8.height),g.pixelStorei(g.UNPACK_SKIP_PIXELS,P.min.x),g.pixelStorei(g.UNPACK_SKIP_ROWS,P.min.y),g.pixelStorei(g.UNPACK_SKIP_IMAGES,P.min.z),i.isDataTexture||i.isData3DTexture)g.texSubImage3D(l0,n,u.x,u.y,u.z,I0,w0,h0,g0,s0,R8.data);else if(i.isCompressedArrayTexture)console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),g.compressedTexSubImage3D(l0,n,u.x,u.y,u.z,I0,w0,h0,g0,R8.data);else g.texSubImage3D(l0,n,u.x,u.y,u.z,I0,w0,h0,g0,s0,R8);if(g.pixelStorei(g.UNPACK_ROW_LENGTH,c0),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,k8),g.pixelStorei(g.UNPACK_SKIP_PIXELS,K9),g.pixelStorei(g.UNPACK_SKIP_ROWS,y8),g.pixelStorei(g.UNPACK_SKIP_IMAGES,j9),n===0&&r.generateMipmaps)g.generateMipmap(l0);P0.unbindTexture()},this.initTexture=function(P){if(P.isCubeTexture)j0.setTextureCube(P,0);else if(P.isData3DTexture)j0.setTexture3D(P,0);else if(P.isDataArrayTexture||P.isCompressedArrayTexture)j0.setTexture2DArray(P,0);else j0.setTexture2D(P,0);P0.unbindTexture()},this.resetState=function(){z=0,C=0,L=null,P0.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2000}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=J==="display-p3"?"display-p3":"srgb",$.unpackColorSpace=K8.workingColorSpace==="display-p3-linear"?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace==="srgb"?3001:3000}set outputEncoding(J){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=J===3001?"srgb":"srgb-linear"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(J){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=J}}class n6 extends n${}n6.prototype.isWebGL1Renderer=!0;class FZ extends D8{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)$.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)$.object.backgroundIntensity=this.backgroundIntensity;return $}}class s6{constructor(J,$){this.isInterleavedBuffer=!0,this.array=J,this.stride=$,this.count=J!==void 0?J.length/$:0,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=v9()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,$,Q){J*=this.stride,Q*=$.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}set(J,$=0){return this.array.set(J,$),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=v9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let $=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Q=new this.constructor($,this.stride);return Q.setUsage(this.usage),Q}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=v9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var s8=new w;class m${constructor(J,$,Q,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=$,this.offset=Q,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let $=0,Q=this.data.count;$<Q;$++)s8.fromBufferAttribute(this,$),s8.applyMatrix4(J),this.setXYZ($,s8.x,s8.y,s8.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)s8.fromBufferAttribute(this,$),s8.applyNormalMatrix(J),this.setXYZ($,s8.x,s8.y,s8.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)s8.fromBufferAttribute(this,$),s8.transformDirection(J),this.setXYZ($,s8.x,s8.y,s8.z);return this}setX(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset]=$,this}setY(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset+1]=$,this}setZ(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset+2]=$,this}setW(J,$){if(this.normalized)$=Q8($,this.array);return this.data.array[J*this.data.stride+this.offset+3]=$,this}getX(J){let $=this.data.array[J*this.data.stride+this.offset];if(this.normalized)$=A9($,this.array);return $}getY(J){let $=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)$=A9($,this.array);return $}getZ(J){let $=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)$=A9($,this.array);return $}getW(J){let $=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)$=A9($,this.array);return $}setXY(J,$,Q){if(J=J*this.data.stride+this.offset,this.normalized)$=Q8($,this.array),Q=Q8(Q,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J=J*this.data.stride+this.offset,this.normalized)$=Q8($,this.array),Q=Q8(Q,this.array),Z=Q8(Z,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)$=Q8($,this.array),Q=Q8(Q,this.array),Z=Q8(Z,this.array),K=Q8(K,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return new h8(new this.array.constructor($),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new m$(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:$,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class s$ extends u9{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new t0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var iJ,P7=new w,oJ=new w,rJ=new w,aJ=new O0,S7=new O0,i6=new H8,w$=new w,w7=new w,_$=new w,X6=new O0,dQ=new O0,H6=new O0;class VZ extends D8{constructor(J=new s$){super();if(this.isSprite=!0,this.type="Sprite",iJ===void 0){iJ=new E8;let $=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Q=new s6($,5);iJ.setIndex([0,1,2,0,2,3]),iJ.setAttribute("position",new m$(Q,3,0,!1)),iJ.setAttribute("uv",new m$(Q,2,3,!1))}this.geometry=iJ,this.material=J,this.center=new O0(0.5,0.5)}raycast(J,$){if(J.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(oJ.setFromMatrixScale(this.matrixWorld),i6.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),rJ.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)oJ.multiplyScalar(-rJ.z);let Q=this.material.rotation,Z,K;if(Q!==0)K=Math.cos(Q),Z=Math.sin(Q);let W=this.center;T$(w$.set(-0.5,-0.5,0),rJ,W,oJ,Z,K),T$(w7.set(0.5,-0.5,0),rJ,W,oJ,Z,K),T$(_$.set(0.5,0.5,0),rJ,W,oJ,Z,K),X6.set(0,0),dQ.set(1,0),H6.set(1,1);let X=J.ray.intersectTriangle(w$,w7,_$,!1,P7);if(X===null){if(T$(w7.set(-0.5,0.5,0),rJ,W,oJ,Z,K),dQ.set(0,1),X=J.ray.intersectTriangle(w$,_$,w7,!1,P7),X===null)return}let Y=J.ray.origin.distanceTo(P7);if(Y<J.near||Y>J.far)return;$.push({distance:Y,point:P7.clone(),uv:G9.getInterpolation(P7,w$,w7,_$,X6,dQ,H6,new O0),face:null,object:this})}copy(J,$){if(super.copy(J,$),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function T$(J,$,Q,Z,K,W){if(aJ.subVectors(J,Q).addScalar(0.5).multiply(Z),K!==void 0)S7.x=W*aJ.x-K*aJ.y,S7.y=K*aJ.x+W*aJ.y;else S7.copy(aJ);J.copy($),J.x+=S7.x,J.y+=S7.y,J.applyMatrix4(i6)}class v7 extends u9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new t0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var q6=new w,U6=new w,F6=new H8,pQ=new IJ,j$=new W7;class o6 extends D8{constructor(J=new E8,$=new v7){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[0];for(let Z=1,K=$.count;Z<K;Z++)q6.fromBufferAttribute($,Z-1),U6.fromBufferAttribute($,Z),Q[Z]=Q[Z-1],Q[Z]+=q6.distanceTo(U6);J.setAttribute("lineDistance",new J8(Q,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,W=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(j$.copy(Q.boundingSphere),j$.applyMatrix4(Z),j$.radius+=K,J.ray.intersectsSphere(j$)===!1)return;F6.copy(Z).invert(),pQ.copy(J.ray).applyMatrix4(F6);let X=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=X*X,H=new w,q=new w,U=new w,F=new w,V=this.isLineSegments?2:1,G=Q.index,E=Q.attributes.position;if(G!==null){let O=Math.max(0,W.start),D=Math.min(G.count,W.start+W.count);for(let R=O,B=D-1;R<B;R+=V){let z=G.getX(R),C=G.getX(R+1);if(H.fromBufferAttribute(E,z),q.fromBufferAttribute(E,C),pQ.distanceSqToSegment(H,q,F,U)>Y)continue;F.applyMatrix4(this.matrixWorld);let A=J.ray.origin.distanceTo(F);if(A<J.near||A>J.far)continue;$.push({distance:A,point:U.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}else{let O=Math.max(0,W.start),D=Math.min(E.count,W.start+W.count);for(let R=O,B=D-1;R<B;R+=V){if(H.fromBufferAttribute(E,R),q.fromBufferAttribute(E,R+1),pQ.distanceSqToSegment(H,q,F,U)>Y)continue;F.applyMatrix4(this.matrixWorld);let C=J.ray.origin.distanceTo(F);if(C<J.near||C>J.far)continue;$.push({distance:C,point:U.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let X=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[X]=K}}}}}var V6=new w,G6=new w;class i$ extends o6{constructor(J,$){super(J,$);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[];for(let Z=0,K=$.count;Z<K;Z+=2)V6.fromBufferAttribute($,Z),G6.fromBufferAttribute($,Z+1),Q[Z]=Z===0?0:Q[Z-1],Q[Z+1]=Q[Z]+V6.distanceTo(G6);J.setAttribute("lineDistance",new J8(Q,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class LJ extends u9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new t0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var O6=new H8,tQ=new IJ,x$=new W7,y$=new w;class X7 extends D8{constructor(J=new E8,$=new LJ){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Points.threshold,W=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(x$.copy(Q.boundingSphere),x$.applyMatrix4(Z),x$.radius+=K,J.ray.intersectsSphere(x$)===!1)return;O6.copy(Z).invert(),tQ.copy(J.ray).applyMatrix4(O6);let X=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=X*X,H=Q.index,U=Q.attributes.position;if(H!==null){let F=Math.max(0,W.start),V=Math.min(H.count,W.start+W.count);for(let G=F,N=V;G<N;G++){let E=H.getX(G);y$.fromBufferAttribute(U,E),D6(y$,E,Y,Z,J,$,this)}}else{let F=Math.max(0,W.start),V=Math.min(U.count,W.start+W.count);for(let G=F,N=V;G<N;G++)y$.fromBufferAttribute(U,G),D6(y$,G,Y,Z,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let X=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[X]=K}}}}}function D6(J,$,Q,Z,K,W,X){let Y=tQ.distanceSqToPoint(J);if(Y<Q){let H=new w;tQ.closestPointToPoint(J,H),H.applyMatrix4(Z);let q=K.ray.origin.distanceTo(H);if(q<K.near||q>K.far)return;W.push({distance:q,distanceToRay:Math.sqrt(Y),point:H,index:$,face:null,object:X})}}class d9 extends a8{constructor(J,$,Q,Z,K,W,X,Y,H){super(J,$,Q,Z,K,W,X,Y,H);this.isCanvasTexture=!0,this.needsUpdate=!0}}class k9{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(J,$){let Q=this.getUtoTmapping(J);return this.getPoint(Q,$)}getPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPoint(Q/J));return $}getSpacedPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPointAt(Q/J));return $}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let $=[],Q,Z=this.getPoint(0),K=0;$.push(0);for(let W=1;W<=J;W++)Q=this.getPoint(W/J),K+=Q.distanceTo(Z),$.push(K),Z=Q;return this.cacheArcLengths=$,$}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,$){let Q=this.getLengths(),Z=0,K=Q.length,W;if($)W=$;else W=J*Q[K-1];let X=0,Y=K-1,H;while(X<=Y)if(Z=Math.floor(X+(Y-X)/2),H=Q[Z]-W,H<0)X=Z+1;else if(H>0)Y=Z-1;else{Y=Z;break}if(Z=Y,Q[Z]===W)return Z/(K-1);let q=Q[Z],F=Q[Z+1]-q,V=(W-q)/F;return(Z+V)/(K-1)}getTangent(J,$){let Z=J-0.0001,K=J+0.0001;if(Z<0)Z=0;if(K>1)K=1;let W=this.getPoint(Z),X=this.getPoint(K),Y=$||(W.isVector2?new O0:new w);return Y.copy(X).sub(W).normalize(),Y}getTangentAt(J,$){let Q=this.getUtoTmapping(J);return this.getTangent(Q,$)}computeFrenetFrames(J,$){let Q=new w,Z=[],K=[],W=[],X=new w,Y=new H8;for(let V=0;V<=J;V++){let G=V/J;Z[V]=this.getTangentAt(G,new w)}K[0]=new w,W[0]=new w;let H=Number.MAX_VALUE,q=Math.abs(Z[0].x),U=Math.abs(Z[0].y),F=Math.abs(Z[0].z);if(q<=H)H=q,Q.set(1,0,0);if(U<=H)H=U,Q.set(0,1,0);if(F<=H)Q.set(0,0,1);X.crossVectors(Z[0],Q).normalize(),K[0].crossVectors(Z[0],X),W[0].crossVectors(Z[0],K[0]);for(let V=1;V<=J;V++){if(K[V]=K[V-1].clone(),W[V]=W[V-1].clone(),X.crossVectors(Z[V-1],Z[V]),X.length()>Number.EPSILON){X.normalize();let G=Math.acos(f8(Z[V-1].dot(Z[V]),-1,1));K[V].applyMatrix4(Y.makeRotationAxis(X,G))}W[V].crossVectors(Z[V],K[V])}if($===!0){let V=Math.acos(f8(K[0].dot(K[J]),-1,1));if(V/=J,Z[0].dot(X.crossVectors(K[0],K[J]))>0)V=-V;for(let G=1;G<=J;G++)K[G].applyMatrix4(Y.makeRotationAxis(Z[G],V*G)),W[G].crossVectors(Z[G],K[G])}return{tangents:Z,normals:K,binormals:W}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class GZ extends k9{constructor(J=0,$=0,Q=1,Z=1,K=0,W=Math.PI*2,X=!1,Y=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=$,this.xRadius=Q,this.yRadius=Z,this.aStartAngle=K,this.aEndAngle=W,this.aClockwise=X,this.aRotation=Y}getPoint(J,$){let Q=$||new O0,Z=Math.PI*2,K=this.aEndAngle-this.aStartAngle,W=Math.abs(K)<Number.EPSILON;while(K<0)K+=Z;while(K>Z)K-=Z;if(K<Number.EPSILON)if(W)K=0;else K=Z;if(this.aClockwise===!0&&!W)if(K===Z)K=-Z;else K=K-Z;let X=this.aStartAngle+J*K,Y=this.aX+this.xRadius*Math.cos(X),H=this.aY+this.yRadius*Math.sin(X);if(this.aRotation!==0){let q=Math.cos(this.aRotation),U=Math.sin(this.aRotation),F=Y-this.aX,V=H-this.aY;Y=F*q-V*U+this.aX,H=F*U+V*q+this.aY}return Q.set(Y,H)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class r6 extends GZ{constructor(J,$,Q,Z,K,W){super(J,$,Q,Q,Z,K,W);this.isArcCurve=!0,this.type="ArcCurve"}}function OZ(){let J=0,$=0,Q=0,Z=0;function K(W,X,Y,H){J=W,$=Y,Q=-3*W+3*X-2*Y-H,Z=2*W-2*X+Y+H}return{initCatmullRom:function(W,X,Y,H,q){K(X,Y,q*(Y-W),q*(H-X))},initNonuniformCatmullRom:function(W,X,Y,H,q,U,F){let V=(X-W)/q-(Y-W)/(q+U)+(Y-X)/U,G=(Y-X)/U-(H-X)/(U+F)+(H-Y)/F;V*=U,G*=U,K(X,Y,V,G)},calc:function(W){let X=W*W,Y=X*W;return J+$*W+Q*X+Z*Y}}}var b$=new w,lQ=new OZ,cQ=new OZ,nQ=new OZ;class H7 extends k9{constructor(J=[],$=!1,Q="centripetal",Z=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=$,this.curveType=Q,this.tension=Z}getPoint(J,$=new w){let Q=$,Z=this.points,K=Z.length,W=(K-(this.closed?0:1))*J,X=Math.floor(W),Y=W-X;if(this.closed)X+=X>0?0:(Math.floor(Math.abs(X)/K)+1)*K;else if(Y===0&&X===K-1)X=K-2,Y=1;let H,q;if(this.closed||X>0)H=Z[(X-1)%K];else b$.subVectors(Z[0],Z[1]).add(Z[0]),H=b$;let U=Z[X%K],F=Z[(X+1)%K];if(this.closed||X+2<K)q=Z[(X+2)%K];else b$.subVectors(Z[K-1],Z[K-2]).add(Z[K-1]),q=b$;if(this.curveType==="centripetal"||this.curveType==="chordal"){let V=this.curveType==="chordal"?0.5:0.25,G=Math.pow(H.distanceToSquared(U),V),N=Math.pow(U.distanceToSquared(F),V),E=Math.pow(F.distanceToSquared(q),V);if(N<0.0001)N=1;if(G<0.0001)G=N;if(E<0.0001)E=N;lQ.initNonuniformCatmullRom(H.x,U.x,F.x,q.x,G,N,E),cQ.initNonuniformCatmullRom(H.y,U.y,F.y,q.y,G,N,E),nQ.initNonuniformCatmullRom(H.z,U.z,F.z,q.z,G,N,E)}else if(this.curveType==="catmullrom")lQ.initCatmullRom(H.x,U.x,F.x,q.x,this.tension),cQ.initCatmullRom(H.y,U.y,F.y,q.y,this.tension),nQ.initCatmullRom(H.z,U.z,F.z,q.z,this.tension);return Q.set(lQ.calc(Y),cQ.calc(Y),nQ.calc(Y)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new w().fromArray(Z))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function E6(J,$,Q,Z,K){let W=(Z-$)*0.5,X=(K-Q)*0.5,Y=J*J,H=J*Y;return(2*Q-2*Z+W+X)*H+(-3*Q+3*Z-2*W-X)*Y+W*J+Q}function fq(J,$){let Q=1-J;return Q*Q*$}function hq(J,$){return 2*(1-J)*J*$}function vq(J,$){return J*J*$}function b7(J,$,Q,Z){return fq(J,$)+hq(J,Q)+vq(J,Z)}function gq(J,$){let Q=1-J;return Q*Q*Q*$}function mq(J,$){let Q=1-J;return 3*Q*Q*J*$}function uq(J,$){return 3*(1-J)*J*J*$}function dq(J,$){return J*J*J*$}function f7(J,$,Q,Z,K){return gq(J,$)+mq(J,Q)+uq(J,Z)+dq(J,K)}class a6 extends k9{constructor(J=new O0,$=new O0,Q=new O0,Z=new O0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new O0){let Q=$,Z=this.v0,K=this.v1,W=this.v2,X=this.v3;return Q.set(f7(J,Z.x,K.x,W.x,X.x),f7(J,Z.y,K.y,W.y,X.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class t6 extends k9{constructor(J=new w,$=new w,Q=new w,Z=new w){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new w){let Q=$,Z=this.v0,K=this.v1,W=this.v2,X=this.v3;return Q.set(f7(J,Z.x,K.x,W.x,X.x),f7(J,Z.y,K.y,W.y,X.y),f7(J,Z.z,K.z,W.z,X.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class e6 extends k9{constructor(J=new O0,$=new O0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=$}getPoint(J,$=new O0){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new O0){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class JK extends k9{constructor(J=new w,$=new w){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=$}getPoint(J,$=new w){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new w){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class $K extends k9{constructor(J=new O0,$=new O0,Q=new O0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new O0){let Q=$,Z=this.v0,K=this.v1,W=this.v2;return Q.set(b7(J,Z.x,K.x,W.x),b7(J,Z.y,K.y,W.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class DZ extends k9{constructor(J=new w,$=new w,Q=new w){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new w){let Q=$,Z=this.v0,K=this.v1,W=this.v2;return Q.set(b7(J,Z.x,K.x,W.x),b7(J,Z.y,K.y,W.y),b7(J,Z.z,K.z,W.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class QK extends k9{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,$=new O0){let Q=$,Z=this.points,K=(Z.length-1)*J,W=Math.floor(K),X=K-W,Y=Z[W===0?W:W-1],H=Z[W],q=Z[W>Z.length-2?Z.length-1:W+1],U=Z[W>Z.length-3?Z.length-1:W+2];return Q.set(E6(X,Y.x,H.x,q.x,U.x),E6(X,Y.y,H.y,q.y,U.y)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new O0().fromArray(Z))}return this}}var pq=Object.freeze({__proto__:null,ArcCurve:r6,CatmullRomCurve3:H7,CubicBezierCurve:a6,CubicBezierCurve3:t6,EllipseCurve:GZ,LineCurve:e6,LineCurve3:JK,QuadraticBezierCurve:$K,QuadraticBezierCurve3:DZ,SplineCurve:QK});class g7 extends E8{constructor(J=1,$=32,Q=0,Z=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:$,thetaStart:Q,thetaLength:Z},$=Math.max(3,$);let K=[],W=[],X=[],Y=[],H=new w,q=new O0;W.push(0,0,0),X.push(0,0,1),Y.push(0.5,0.5);for(let U=0,F=3;U<=$;U++,F+=3){let V=Q+U/$*Z;H.x=J*Math.cos(V),H.y=J*Math.sin(V),W.push(H.x,H.y,H.z),X.push(0,0,1),q.x=(W[F]/J+1)/2,q.y=(W[F+1]/J+1)/2,Y.push(q.x,q.y)}for(let U=1;U<=$;U++)K.push(U,U+1,0);this.setIndex(K),this.setAttribute("position",new J8(W,3)),this.setAttribute("normal",new J8(X,3)),this.setAttribute("uv",new J8(Y,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new g7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class D0 extends E8{constructor(J=1,$=1,Q=1,Z=32,K=1,W=!1,X=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:$,height:Q,radialSegments:Z,heightSegments:K,openEnded:W,thetaStart:X,thetaLength:Y};let H=this;Z=Math.floor(Z),K=Math.floor(K);let q=[],U=[],F=[],V=[],G=0,N=[],E=Q/2,O=0;if(D(),W===!1){if(J>0)R(!0);if($>0)R(!1)}this.setIndex(q),this.setAttribute("position",new J8(U,3)),this.setAttribute("normal",new J8(F,3)),this.setAttribute("uv",new J8(V,2));function D(){let B=new w,z=new w,C=0,L=($-J)/Q;for(let A=0;A<=K;A++){let _=[],I=A/K,k=I*($-J)+J;for(let b=0;b<=Z;b++){let s=b/Z,a=s*Y+X,x=Math.sin(a),v=Math.cos(a);z.x=k*x,z.y=-I*Q+E,z.z=k*v,U.push(z.x,z.y,z.z),B.set(x,L,v).normalize(),F.push(B.x,B.y,B.z),V.push(s,1-I),_.push(G++)}N.push(_)}for(let A=0;A<Z;A++)for(let _=0;_<K;_++){let I=N[_][A],k=N[_+1][A],b=N[_+1][A+1],s=N[_][A+1];q.push(I,k,s),q.push(k,b,s),C+=6}H.addGroup(O,C,0),O+=C}function R(B){let z=G,C=new O0,L=new w,A=0,_=B===!0?J:$,I=B===!0?1:-1;for(let b=1;b<=Z;b++)U.push(0,E*I,0),F.push(0,I,0),V.push(0.5,0.5),G++;let k=G;for(let b=0;b<=Z;b++){let a=b/Z*Y+X,x=Math.cos(a),v=Math.sin(a);L.x=_*v,L.y=E*I,L.z=_*x,U.push(L.x,L.y,L.z),F.push(0,I,0),C.x=x*0.5+0.5,C.y=v*0.5*I+0.5,V.push(C.x,C.y),G++}for(let b=0;b<Z;b++){let s=z+b,a=k+b;if(B===!0)q.push(a,a+1,s);else q.push(a+1,a,s);A+=3}H.addGroup(O,A,B===!0?1:2),O+=A}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new D0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class F8 extends D0{constructor(J=1,$=1,Q=32,Z=1,K=!1,W=0,X=Math.PI*2){super(0,J,$,Q,Z,K,W,X);this.type="ConeGeometry",this.parameters={radius:J,height:$,radialSegments:Q,heightSegments:Z,openEnded:K,thetaStart:W,thetaLength:X}}static fromJSON(J){return new F8(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class EZ extends E8{constructor(J=[],$=[],Q=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:$,radius:Q,detail:Z};let K=[],W=[];if(X(Z),H(Q),q(),this.setAttribute("position",new J8(K,3)),this.setAttribute("normal",new J8(K.slice(),3)),this.setAttribute("uv",new J8(W,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function X(D){let R=new w,B=new w,z=new w;for(let C=0;C<$.length;C+=3)V($[C+0],R),V($[C+1],B),V($[C+2],z),Y(R,B,z,D)}function Y(D,R,B,z){let C=z+1,L=[];for(let A=0;A<=C;A++){L[A]=[];let _=D.clone().lerp(B,A/C),I=R.clone().lerp(B,A/C),k=C-A;for(let b=0;b<=k;b++)if(b===0&&A===C)L[A][b]=_;else L[A][b]=_.clone().lerp(I,b/k)}for(let A=0;A<C;A++)for(let _=0;_<2*(C-A)-1;_++){let I=Math.floor(_/2);if(_%2===0)F(L[A][I+1]),F(L[A+1][I]),F(L[A][I]);else F(L[A][I+1]),F(L[A+1][I+1]),F(L[A+1][I])}}function H(D){let R=new w;for(let B=0;B<K.length;B+=3)R.x=K[B+0],R.y=K[B+1],R.z=K[B+2],R.normalize().multiplyScalar(D),K[B+0]=R.x,K[B+1]=R.y,K[B+2]=R.z}function q(){let D=new w;for(let R=0;R<K.length;R+=3){D.x=K[R+0],D.y=K[R+1],D.z=K[R+2];let B=E(D)/2/Math.PI+0.5,z=O(D)/Math.PI+0.5;W.push(B,1-z)}G(),U()}function U(){for(let D=0;D<W.length;D+=6){let R=W[D+0],B=W[D+2],z=W[D+4],C=Math.max(R,B,z),L=Math.min(R,B,z);if(C>0.9&&L<0.1){if(R<0.2)W[D+0]+=1;if(B<0.2)W[D+2]+=1;if(z<0.2)W[D+4]+=1}}}function F(D){K.push(D.x,D.y,D.z)}function V(D,R){let B=D*3;R.x=J[B+0],R.y=J[B+1],R.z=J[B+2]}function G(){let D=new w,R=new w,B=new w,z=new w,C=new O0,L=new O0,A=new O0;for(let _=0,I=0;_<K.length;_+=9,I+=6){D.set(K[_+0],K[_+1],K[_+2]),R.set(K[_+3],K[_+4],K[_+5]),B.set(K[_+6],K[_+7],K[_+8]),C.set(W[I+0],W[I+1]),L.set(W[I+2],W[I+3]),A.set(W[I+4],W[I+5]),z.copy(D).add(R).add(B).divideScalar(3);let k=E(z);N(C,I+0,D,k),N(L,I+2,R,k),N(A,I+4,B,k)}}function N(D,R,B,z){if(z<0&&D.x===1)W[R]=D.x-1;if(B.x===0&&B.z===0)W[R]=z/2/Math.PI+0.5}function E(D){return Math.atan2(D.z,-D.x)}function O(D){return Math.atan2(-D.y,Math.sqrt(D.x*D.x+D.z*D.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new EZ(J.vertices,J.indices,J.radius,J.details)}}class T8 extends EZ{constructor(J=1,$=0){let Q=(1+Math.sqrt(5))/2,Z=1/Q,K=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-Z,-Q,0,-Z,Q,0,Z,-Q,0,Z,Q,-Z,-Q,0,-Z,Q,0,Z,-Q,0,Z,Q,0,-Q,0,-Z,Q,0,-Z,-Q,0,Z,Q,0,Z],W=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(K,W,J,$);this.type="DodecahedronGeometry",this.parameters={radius:J,detail:$}}static fromJSON(J){return new T8(J.radius,J.detail)}}class m7 extends E8{constructor(J=0.5,$=1,Q=32,Z=1,K=0,W=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:$,thetaSegments:Q,phiSegments:Z,thetaStart:K,thetaLength:W},Q=Math.max(3,Q),Z=Math.max(1,Z);let X=[],Y=[],H=[],q=[],U=J,F=($-J)/Z,V=new w,G=new O0;for(let N=0;N<=Z;N++){for(let E=0;E<=Q;E++){let O=K+E/Q*W;V.x=U*Math.cos(O),V.y=U*Math.sin(O),Y.push(V.x,V.y,V.z),H.push(0,0,1),G.x=(V.x/$+1)/2,G.y=(V.y/$+1)/2,q.push(G.x,G.y)}U+=F}for(let N=0;N<Z;N++){let E=N*(Q+1);for(let O=0;O<Q;O++){let D=O+E,R=D,B=D+Q+1,z=D+Q+2,C=D+1;X.push(R,B,C),X.push(B,z,C)}}this.setIndex(X),this.setAttribute("position",new J8(Y,3)),this.setAttribute("normal",new J8(H,3)),this.setAttribute("uv",new J8(q,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new m7(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class V8 extends E8{constructor(J=1,$=32,Q=16,Z=0,K=Math.PI*2,W=0,X=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:$,heightSegments:Q,phiStart:Z,phiLength:K,thetaStart:W,thetaLength:X},$=Math.max(3,Math.floor($)),Q=Math.max(2,Math.floor(Q));let Y=Math.min(W+X,Math.PI),H=0,q=[],U=new w,F=new w,V=[],G=[],N=[],E=[];for(let O=0;O<=Q;O++){let D=[],R=O/Q,B=0;if(O===0&&W===0)B=0.5/$;else if(O===Q&&Y===Math.PI)B=-0.5/$;for(let z=0;z<=$;z++){let C=z/$;U.x=-J*Math.cos(Z+C*K)*Math.sin(W+R*X),U.y=J*Math.cos(W+R*X),U.z=J*Math.sin(Z+C*K)*Math.sin(W+R*X),G.push(U.x,U.y,U.z),F.copy(U).normalize(),N.push(F.x,F.y,F.z),E.push(C+B,1-R),D.push(H++)}q.push(D)}for(let O=0;O<Q;O++)for(let D=0;D<$;D++){let R=q[O][D+1],B=q[O][D],z=q[O+1][D],C=q[O+1][D+1];if(O!==0||W>0)V.push(R,B,C);if(O!==Q-1||Y<Math.PI)V.push(B,z,C)}this.setIndex(V),this.setAttribute("position",new J8(G,3)),this.setAttribute("normal",new J8(N,3)),this.setAttribute("uv",new J8(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new V8(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class p9 extends E8{constructor(J=1,$=0.4,Q=12,Z=48,K=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:$,radialSegments:Q,tubularSegments:Z,arc:K},Q=Math.floor(Q),Z=Math.floor(Z);let W=[],X=[],Y=[],H=[],q=new w,U=new w,F=new w;for(let V=0;V<=Q;V++)for(let G=0;G<=Z;G++){let N=G/Z*K,E=V/Q*Math.PI*2;U.x=(J+$*Math.cos(E))*Math.cos(N),U.y=(J+$*Math.cos(E))*Math.sin(N),U.z=$*Math.sin(E),X.push(U.x,U.y,U.z),q.x=J*Math.cos(N),q.y=J*Math.sin(N),F.subVectors(U,q).normalize(),Y.push(F.x,F.y,F.z),H.push(G/Z),H.push(V/Q)}for(let V=1;V<=Q;V++)for(let G=1;G<=Z;G++){let N=(Z+1)*V+G-1,E=(Z+1)*(V-1)+G-1,O=(Z+1)*(V-1)+G,D=(Z+1)*V+G;W.push(N,E,D),W.push(E,O,D)}this.setIndex(W),this.setAttribute("position",new J8(X,3)),this.setAttribute("normal",new J8(Y,3)),this.setAttribute("uv",new J8(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new p9(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc)}}class u7 extends E8{constructor(J=new DZ(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),$=64,Q=1,Z=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:$,radius:Q,radialSegments:Z,closed:K};let W=J.computeFrenetFrames($,K);this.tangents=W.tangents,this.normals=W.normals,this.binormals=W.binormals;let X=new w,Y=new w,H=new O0,q=new w,U=[],F=[],V=[],G=[];N(),this.setIndex(G),this.setAttribute("position",new J8(U,3)),this.setAttribute("normal",new J8(F,3)),this.setAttribute("uv",new J8(V,2));function N(){for(let R=0;R<$;R++)E(R);E(K===!1?$:0),D(),O()}function E(R){q=J.getPointAt(R/$,q);let B=W.normals[R],z=W.binormals[R];for(let C=0;C<=Z;C++){let L=C/Z*Math.PI*2,A=Math.sin(L),_=-Math.cos(L);Y.x=_*B.x+A*z.x,Y.y=_*B.y+A*z.y,Y.z=_*B.z+A*z.z,Y.normalize(),F.push(Y.x,Y.y,Y.z),X.x=q.x+Q*Y.x,X.y=q.y+Q*Y.y,X.z=q.z+Q*Y.z,U.push(X.x,X.y,X.z)}}function O(){for(let R=1;R<=$;R++)for(let B=1;B<=Z;B++){let z=(Z+1)*(R-1)+(B-1),C=(Z+1)*R+(B-1),L=(Z+1)*R+B,A=(Z+1)*(R-1)+B;G.push(z,C,A),G.push(C,L,A)}}function D(){for(let R=0;R<=$;R++)for(let B=0;B<=Z;B++)H.x=R/$,H.y=B/Z,V.push(H.x,H.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new u7(new pq[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class d extends u9{constructor(J){super();this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new t0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new t0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new O0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}function f$(J,$,Q){if(!J||!Q&&J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}function lq(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}class d7{constructor(J,$,Q,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new $.constructor(Q),this.sampleValues=$,this.valueSize=Q,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Q=this._cachedIndex,Z=$[Q],K=$[Q-1];Q:{J:{let W;$:{Z:if(!(J<Z)){for(let X=Q+2;;){if(Z===void 0){if(J<K)break Z;return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}if(Q===X)break;if(K=Z,Z=$[++Q],J<Z)break J}W=$.length;break $}if(!(J>=K)){let X=$[1];if(J<X)Q=2,K=X;for(let Y=Q-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===Y)break;if(Z=K,K=$[--Q-1],J>=K)break J}W=Q,Q=0;break $}break Q}while(Q<W){let X=Q+W>>>1;if(J<$[X])W=X;else Q=X+1}if(Z=$[Q],K=$[Q-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}this._cachedIndex=Q,this.intervalChanged_(Q,K,Z)}return this.interpolate_(Q,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Q=this.sampleValues,Z=this.valueSize,K=J*Z;for(let W=0;W!==Z;++W)$[W]=Q[K+W];return $}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class ZK extends d7{constructor(J,$,Q,Z){super(J,$,Q,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Q){let Z=this.parameterPositions,K=J-2,W=J+1,X=Z[K],Y=Z[W];if(X===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,X=2*$-Q;break;case 2402:K=Z.length-2,X=$+Z[K]-Z[K+1];break;default:K=J,X=Q}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:W=J,Y=2*Q-$;break;case 2402:W=1,Y=Q+Z[1]-Z[0];break;default:W=J-1,Y=$}let H=(Q-$)*0.5,q=this.valueSize;this._weightPrev=H/($-X),this._weightNext=H/(Y-Q),this._offsetPrev=K*q,this._offsetNext=W*q}interpolate_(J,$,Q,Z){let K=this.resultBuffer,W=this.sampleValues,X=this.valueSize,Y=J*X,H=Y-X,q=this._offsetPrev,U=this._offsetNext,F=this._weightPrev,V=this._weightNext,G=(Q-$)/(Z-$),N=G*G,E=N*G,O=-F*E+2*F*N-F*G,D=(1+F)*E+(-1.5-2*F)*N+(-0.5+F)*G+1,R=(-1-V)*E+(1.5+V)*N+0.5*G,B=V*E-V*N;for(let z=0;z!==X;++z)K[z]=O*W[q+z]+D*W[H+z]+R*W[Y+z]+B*W[U+z];return K}}class KK extends d7{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,W=this.sampleValues,X=this.valueSize,Y=J*X,H=Y-X,q=(Q-$)/(Z-$),U=1-q;for(let F=0;F!==X;++F)K[F]=W[H+F]*U+W[Y+F]*q;return K}}class WK extends d7{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class P9{constructor(J,$,Q,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=f$($,this.TimeBufferType),this.values=f$(Q,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Q;if($.toJSON!==this.toJSON)Q=$.toJSON(J);else{Q={name:J.name,times:f$(J.times,Array),values:f$(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)Q.interpolation=Z}return Q.type=J.ValueTypeName,Q}InterpolantFactoryMethodDiscrete(J){return new WK(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new KK(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new ZK(this.times,this.values,this.getValueSize(),J)}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break}if($===void 0){let Q="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Q);return console.warn("THREE.KeyframeTrack:",Q),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]*=J}return this}trim(J,$){let Q=this.times,Z=Q.length,K=0,W=Z-1;while(K!==Z&&Q[K]<J)++K;while(W!==-1&&Q[W]>$)--W;if(++W,K!==0||W!==Z){if(K>=W)W=Math.max(W,1),K=W-1;let X=this.getValueSize();this.times=Q.slice(K,W),this.values=this.values.slice(K*X,W*X)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),J=!1;let Q=this.times,Z=this.values,K=Q.length;if(K===0)console.error("THREE.KeyframeTrack: Track is empty.",this),J=!1;let W=null;for(let X=0;X!==K;X++){let Y=Q[X];if(typeof Y==="number"&&isNaN(Y)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,X,Y),J=!1;break}if(W!==null&&W>Y){console.error("THREE.KeyframeTrack: Out of order keys.",this,X,Y,W),J=!1;break}W=Y}if(Z!==void 0){if(lq(Z))for(let X=0,Y=Z.length;X!==Y;++X){let H=Z[X];if(isNaN(H)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,X,H),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Q=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,W=1;for(let X=1;X<K;++X){let Y=!1,H=J[X],q=J[X+1];if(H!==q&&(X!==1||H!==J[0]))if(!Z){let U=X*Q,F=U-Q,V=U+Q;for(let G=0;G!==Q;++G){let N=$[U+G];if(N!==$[F+G]||N!==$[V+G]){Y=!0;break}}}else Y=!0;if(Y){if(X!==W){J[W]=J[X];let U=X*Q,F=W*Q;for(let V=0;V!==Q;++V)$[F+V]=$[U+V]}++W}}if(K>0){J[W]=J[K];for(let X=K*Q,Y=W*Q,H=0;H!==Q;++H)$[Y+H]=$[X+H];++W}if(W!==J.length)this.times=J.slice(0,W),this.values=$.slice(0,W*Q);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),Z=new this.constructor(this.name,J,$);return Z.createInterpolant=this.createInterpolant,Z}}P9.prototype.TimeBufferType=Float32Array;P9.prototype.ValueBufferType=Float32Array;P9.prototype.DefaultInterpolation=2301;class q7 extends P9{}q7.prototype.ValueTypeName="bool";q7.prototype.ValueBufferType=Array;q7.prototype.DefaultInterpolation=2300;q7.prototype.InterpolantFactoryMethodLinear=void 0;q7.prototype.InterpolantFactoryMethodSmooth=void 0;class YK extends P9{}YK.prototype.ValueTypeName="color";class XK extends P9{}XK.prototype.ValueTypeName="number";class HK extends d7{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,W=this.sampleValues,X=this.valueSize,Y=(Q-$)/(Z-$),H=J*X;for(let q=H+X;H!==q;H+=4)M9.slerpFlat(K,0,W,H-X,W,H,Y);return K}}class o$ extends P9{InterpolantFactoryMethodLinear(J){return new HK(this.times,this.values,this.getValueSize(),J)}}o$.prototype.ValueTypeName="quaternion";o$.prototype.DefaultInterpolation=2301;o$.prototype.InterpolantFactoryMethodSmooth=void 0;class U7 extends P9{}U7.prototype.ValueTypeName="string";U7.prototype.ValueBufferType=Array;U7.prototype.DefaultInterpolation=2300;U7.prototype.InterpolantFactoryMethodLinear=void 0;U7.prototype.InterpolantFactoryMethodSmooth=void 0;class qK extends P9{}qK.prototype.ValueTypeName="vector";class UK{constructor(J,$,Q){let Z=this,K=!1,W=0,X=0,Y=void 0,H=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Q,this.itemStart=function(q){if(X++,K===!1){if(Z.onStart!==void 0)Z.onStart(q,W,X)}K=!0},this.itemEnd=function(q){if(W++,Z.onProgress!==void 0)Z.onProgress(q,W,X);if(W===X){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(q){if(Z.onError!==void 0)Z.onError(q)},this.resolveURL=function(q){if(Y)return Y(q);return q},this.setURLModifier=function(q){return Y=q,this},this.addHandler=function(q,U){return H.push(q,U),this},this.removeHandler=function(q){let U=H.indexOf(q);if(U!==-1)H.splice(U,2);return this},this.getHandler=function(q){for(let U=0,F=H.length;U<F;U+=2){let V=H[U],G=H[U+1];if(V.global)V.lastIndex=0;if(V.test(q))return G}return null}}}var cq=new UK;class FK{constructor(J){this.manager=J!==void 0?J:cq,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(J,$){let Q=this;return new Promise(function(Z,K){Q.load(J,Z,$,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}}FK.DEFAULT_MATERIAL_NAME="__DEFAULT";class F7 extends D8{constructor(J,$=1){super();this.isLight=!0,this.type="Light",this.color=new t0(J),this.intensity=$}dispose(){}copy(J,$){return super.copy(J,$),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let $=super.toJSON(J);if($.object.color=this.color.getHex(),$.object.intensity=this.intensity,this.groundColor!==void 0)$.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)$.object.distance=this.distance;if(this.angle!==void 0)$.object.angle=this.angle;if(this.decay!==void 0)$.object.decay=this.decay;if(this.penumbra!==void 0)$.object.penumbra=this.penumbra;if(this.shadow!==void 0)$.object.shadow=this.shadow.toJSON();return $}}class NZ extends F7{constructor(J,$,Q){super(J,Q);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(D8.DEFAULT_UP),this.updateMatrix(),this.groundColor=new t0($)}copy(J,$){return super.copy(J,$),this.groundColor.copy(J.groundColor),this}}var sQ=new H8,N6=new w,R6=new w;class r${constructor(J){this.camera=J,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new O0(512,512),this.map=null,this.mapPass=null,this.matrix=new H8,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new l$,this._frameExtents=new O0(1,1),this._viewportCount=1,this._viewports=[new O8(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let $=this.camera,Q=this.matrix;N6.setFromMatrixPosition(J.matrixWorld),$.position.copy(N6),R6.setFromMatrixPosition(J.target.matrixWorld),$.lookAt(R6),$.updateMatrixWorld(),sQ.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sQ),Q.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),Q.multiply(sQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.bias=J.bias,this.radius=J.radius,this.mapSize.copy(J.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}class VK extends r${constructor(){super(new p8(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(J){let $=this.camera,Q=$7*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height,K=J.distance||$.far;if(Q!==$.fov||Z!==$.aspect||K!==$.far)$.fov=Q,$.aspect=Z,$.far=K,$.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this}}class RZ extends F7{constructor(J,$,Q=0,Z=Math.PI/3,K=0,W=2){super(J,$);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(D8.DEFAULT_UP),this.updateMatrix(),this.target=new D8,this.distance=Q,this.angle=Z,this.penumbra=K,this.decay=W,this.map=null,this.shadow=new VK}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}var B6=new H8,_7=new w,iQ=new w;class GK extends r${constructor(){super(new p8(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new O0(4,2),this._viewportCount=6,this._viewports=[new O8(2,1,1,1),new O8(0,1,1,1),new O8(3,1,1,1),new O8(1,1,1,1),new O8(3,0,1,1),new O8(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(J,$=0){let Q=this.camera,Z=this.matrix,K=J.distance||Q.far;if(K!==Q.far)Q.far=K,Q.updateProjectionMatrix();_7.setFromMatrixPosition(J.matrixWorld),Q.position.copy(_7),iQ.copy(Q.position),iQ.add(this._cubeDirections[$]),Q.up.copy(this._cubeUps[$]),Q.lookAt(iQ),Q.updateMatrixWorld(),Z.makeTranslation(-_7.x,-_7.y,-_7.z),B6.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(B6)}}class j8 extends F7{constructor(J,$,Q=0,Z=2){super(J,$);this.isPointLight=!0,this.type="PointLight",this.distance=Q,this.decay=Z,this.shadow=new GK}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}}class OK extends r${constructor(){super(new HZ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class p7 extends F7{constructor(J,$){super(J,$);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(D8.DEFAULT_UP),this.updateMatrix(),this.target=new D8,this.shadow=new OK}dispose(){this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}class BZ extends F7{constructor(J,$){super(J,$);this.isAmbientLight=!0,this.type="AmbientLight"}}var zZ="\\[\\]\\.:\\/",nq=new RegExp("["+zZ+"]","g"),IZ="[^"+zZ+"]",sq="[^"+zZ.replace("\\.","")+"]",iq=/((?:WC+[\/:])*)/.source.replace("WC",IZ),oq=/(WCOD+)?/.source.replace("WCOD",sq),rq=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",IZ),aq=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",IZ),tq=new RegExp("^"+iq+oq+rq+aq+"$"),eq=["material","materials","bones","map"];class DK{constructor(J,$,Q){let Z=Q||Z8.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,Z)}getValue(J,$){this.bind();let Q=this._targetGroup.nCachedObjects_,Z=this._bindings[Q];if(Z!==void 0)Z.getValue(J,$)}setValue(J,$){let Q=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=Q.length;Z!==K;++Z)Q[Z].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].unbind()}}class Z8{constructor(J,$,Q){this.path=$,this.parsedPath=Q||Z8.parseTrackName($),this.node=Z8.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Q){if(!(J&&J.isAnimationObjectGroup))return new Z8(J,$,Q);else return new Z8.Composite(J,$,Q)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(nq,"")}static parseTrackName(J){let $=tq.exec(J);if($===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let Q={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},Z=Q.nodeName&&Q.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=Q.nodeName.substring(Z+1);if(eq.indexOf(K)!==-1)Q.nodeName=Q.nodeName.substring(0,Z),Q.objectName=K}if(Q.propertyName===null||Q.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return Q}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Q=J.skeleton.getBoneByName($);if(Q!==void 0)return Q}if(J.children){let Q=function(K){for(let W=0;W<K.length;W++){let X=K[W];if(X.name===$||X.uuid===$)return X;let Y=Q(X.children);if(Y)return Y}return null},Z=Q(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)J[$++]=Q[Z]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Q=$.objectName,Z=$.propertyName,K=$.propertyIndex;if(!J)J=Z8.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(Q){let H=$.objectIndex;switch(Q){case"materials":if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let q=0;q<J.length;q++)if(J[q].name===H){H=q;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Q]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Q]}if(H!==void 0){if(J[H]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[H]}}let W=J[Z];if(W===void 0){let H=$.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+H+"."+Z+" but it wasn't found.",J);return}let X=this.Versioning.None;if(this.targetObject=J,J.needsUpdate!==void 0)X=this.Versioning.NeedsUpdate;else if(J.matrixWorldNeedsUpdate!==void 0)X=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}Y=this.BindingType.ArrayElement,this.resolvedProperty=W,this.propertyIndex=K}else if(W.fromArray!==void 0&&W.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=W;else if(Array.isArray(W))Y=this.BindingType.EntireArray,this.resolvedProperty=W;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][X]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Z8.Composite=DK;Z8.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Z8.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Z8.prototype.GetterByBindingType=[Z8.prototype._getValue_direct,Z8.prototype._getValue_array,Z8.prototype._getValue_arrayElement,Z8.prototype._getValue_toArray];Z8.prototype.SetterByBindingTypeAndVersioning=[[Z8.prototype._setValue_direct,Z8.prototype._setValue_direct_setNeedsUpdate,Z8.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Z8.prototype._setValue_array,Z8.prototype._setValue_array_setNeedsUpdate,Z8.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Z8.prototype._setValue_arrayElement,Z8.prototype._setValue_arrayElement_setNeedsUpdate,Z8.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Z8.prototype._setValue_fromArray,Z8.prototype._setValue_fromArray_setNeedsUpdate,Z8.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pU=new Float32Array(1);class LZ{constructor(J,$,Q=0,Z=1/0){this.ray=new IJ(J,$),this.near=Q,this.far=Z,this.camera=null,this.layers=new p$,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,$){this.ray.set(J,$)}setFromCamera(J,$){if($.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition($.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject($).sub(this.ray.origin).normalize(),this.camera=$;else if($.isOrthographicCamera)this.ray.origin.set(J.x,J.y,($.near+$.far)/($.near-$.far)).unproject($),this.ray.direction.set(0,0,-1).transformDirection($.matrixWorld),this.camera=$;else console.error("THREE.Raycaster: Unsupported camera type: "+$.type)}intersectObject(J,$=!0,Q=[]){return eQ(J,this,Q,$),Q.sort(z6),Q}intersectObjects(J,$=!0,Q=[]){for(let Z=0,K=J.length;Z<K;Z++)eQ(J[Z],this,Q,$);return Q.sort(z6),Q}}function z6(J,$){return J.distance-$.distance}function eQ(J,$,Q,Z){if(J.layers.test($.layers))J.raycast($,Q);if(Z===!0){let K=J.children;for(let W=0,X=K.length;W<X;W++)eQ(K[W],$,Q,!0)}}class a${constructor(J=1,$=0,Q=0){return this.radius=J,this.phi=$,this.theta=Q,this}set(J,$,Q){return this.radius=J,this.phi=$,this.theta=Q,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=Math.max(0.000001,Math.min(Math.PI-0.000001,this.phi)),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,$,Q){if(this.radius=Math.sqrt(J*J+$*$+Q*Q),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,Q),this.phi=Math.acos(f8($/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="160";var EK={type:"change"},CZ={type:"start"},NK={type:"end"},t$=new IJ,RK=new L9,$4=Math.cos(70*u$.DEG2RAD);class AZ extends m9{constructor(J,$){super();this.object=J,this.domElement=$,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new w,this.cursor=new w,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:BJ.ROTATE,MIDDLE:BJ.DOLLY,RIGHT:BJ.PAN},this.touches={ONE:zJ.ROTATE,TWO:zJ.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return X.phi},this.getAzimuthalAngle=function(){return X.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(j){j.addEventListener("keydown",z0),this._domElementKeyEvents=j},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",z0),this._domElementKeyEvents=null},this.saveState=function(){Q.target0.copy(Q.target),Q.position0.copy(Q.object.position),Q.zoom0=Q.object.zoom},this.reset=function(){Q.target.copy(Q.target0),Q.object.position.copy(Q.position0),Q.object.zoom=Q.zoom0,Q.object.updateProjectionMatrix(),Q.dispatchEvent(EK),Q.update(),K=Z.NONE},this.update=function(){let j=new w,$0=new M9().setFromUnitVectors(J.up,new w(0,1,0)),U0=$0.clone().invert(),R0=new w,u0=new M9,H0=new w,y=2*Math.PI;return function(N0=null){let b0=Q.object.position;if(j.copy(b0).sub(Q.target),j.applyQuaternion($0),X.setFromVector3(j),Q.autoRotate&&K===Z.NONE)b(I(N0));if(Q.enableDamping)X.theta+=Y.theta*Q.dampingFactor,X.phi+=Y.phi*Q.dampingFactor;else X.theta+=Y.theta,X.phi+=Y.phi;let{minAzimuthAngle:A0,maxAzimuthAngle:r0}=Q;if(isFinite(A0)&&isFinite(r0)){if(A0<-Math.PI)A0+=y;else if(A0>Math.PI)A0-=y;if(r0<-Math.PI)r0+=y;else if(r0>Math.PI)r0-=y;if(A0<=r0)X.theta=Math.max(A0,Math.min(r0,X.theta));else X.theta=X.theta>(A0+r0)/2?Math.max(A0,X.theta):Math.min(r0,X.theta)}if(X.phi=Math.max(Q.minPolarAngle,Math.min(Q.maxPolarAngle,X.phi)),X.makeSafe(),Q.enableDamping===!0)Q.target.addScaledVector(q,Q.dampingFactor);else Q.target.add(q);if(Q.target.sub(Q.cursor),Q.target.clampLength(Q.minTargetRadius,Q.maxTargetRadius),Q.target.add(Q.cursor),Q.zoomToCursor&&C||Q.object.isOrthographicCamera)X.radius=h(X.radius);else X.radius=h(X.radius*H);if(j.setFromSpherical(X),j.applyQuaternion(U0),b0.copy(Q.target).add(j),Q.object.lookAt(Q.target),Q.enableDamping===!0)Y.theta*=1-Q.dampingFactor,Y.phi*=1-Q.dampingFactor,q.multiplyScalar(1-Q.dampingFactor);else Y.set(0,0,0),q.set(0,0,0);let $8=!1;if(Q.zoomToCursor&&C){let U8=null;if(Q.object.isPerspectiveCamera){let M8=j.length();U8=h(M8*H);let a0=M8-U8;Q.object.position.addScaledVector(B,a0),Q.object.updateMatrixWorld()}else if(Q.object.isOrthographicCamera){let M8=new w(z.x,z.y,0);M8.unproject(Q.object),Q.object.zoom=Math.max(Q.minZoom,Math.min(Q.maxZoom,Q.object.zoom/H)),Q.object.updateProjectionMatrix(),$8=!0;let a0=new w(z.x,z.y,0);a0.unproject(Q.object),Q.object.position.sub(a0).add(M8),Q.object.updateMatrixWorld(),U8=j.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),Q.zoomToCursor=!1;if(U8!==null)if(this.screenSpacePanning)Q.target.set(0,0,-1).transformDirection(Q.object.matrix).multiplyScalar(U8).add(Q.object.position);else if(t$.origin.copy(Q.object.position),t$.direction.set(0,0,-1).transformDirection(Q.object.matrix),Math.abs(Q.object.up.dot(t$.direction))<$4)J.lookAt(Q.target);else RK.setFromNormalAndCoplanarPoint(Q.object.up,Q.target),t$.intersectPlane(RK,Q.target)}else if(Q.object.isOrthographicCamera)Q.object.zoom=Math.max(Q.minZoom,Math.min(Q.maxZoom,Q.object.zoom/H)),Q.object.updateProjectionMatrix(),$8=!0;if(H=1,C=!1,$8||R0.distanceToSquared(Q.object.position)>W||8*(1-u0.dot(Q.object.quaternion))>W||H0.distanceToSquared(Q.target)>0)return Q.dispatchEvent(EK),R0.copy(Q.object.position),u0.copy(Q.object.quaternion),H0.copy(Q.target),!0;return!1}}(),this.dispose=function(){if(Q.domElement.removeEventListener("contextmenu",K0),Q.domElement.removeEventListener("pointerdown",j0),Q.domElement.removeEventListener("pointercancel",M),Q.domElement.removeEventListener("wheel",Q0),Q.domElement.removeEventListener("pointermove",T),Q.domElement.removeEventListener("pointerup",M),Q._domElementKeyEvents!==null)Q._domElementKeyEvents.removeEventListener("keydown",z0),Q._domElementKeyEvents=null};let Q=this,Z={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},K=Z.NONE,W=0.000001,X=new a$,Y=new a$,H=1,q=new w,U=new O0,F=new O0,V=new O0,G=new O0,N=new O0,E=new O0,O=new O0,D=new O0,R=new O0,B=new w,z=new O0,C=!1,L=[],A={},_=!1;function I(j){if(j!==null)return 2*Math.PI/60*Q.autoRotateSpeed*j;else return 2*Math.PI/60/60*Q.autoRotateSpeed}function k(j){let $0=Math.abs(j*0.01);return Math.pow(0.95,Q.zoomSpeed*$0)}function b(j){Y.theta-=j}function s(j){Y.phi-=j}let a=function(){let j=new w;return function(U0,R0){j.setFromMatrixColumn(R0,0),j.multiplyScalar(-U0),q.add(j)}}(),x=function(){let j=new w;return function(U0,R0){if(Q.screenSpacePanning===!0)j.setFromMatrixColumn(R0,1);else j.setFromMatrixColumn(R0,0),j.crossVectors(Q.object.up,j);j.multiplyScalar(U0),q.add(j)}}(),v=function(){let j=new w;return function(U0,R0){let u0=Q.domElement;if(Q.object.isPerspectiveCamera){let H0=Q.object.position;j.copy(H0).sub(Q.target);let y=j.length();y*=Math.tan(Q.object.fov/2*Math.PI/180),a(2*U0*y/u0.clientHeight,Q.object.matrix),x(2*R0*y/u0.clientHeight,Q.object.matrix)}else if(Q.object.isOrthographicCamera)a(U0*(Q.object.right-Q.object.left)/Q.object.zoom/u0.clientWidth,Q.object.matrix),x(R0*(Q.object.top-Q.object.bottom)/Q.object.zoom/u0.clientHeight,Q.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),Q.enablePan=!1}}();function m(j){if(Q.object.isPerspectiveCamera||Q.object.isOrthographicCamera)H/=j;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Q.enableZoom=!1}function o(j){if(Q.object.isPerspectiveCamera||Q.object.isOrthographicCamera)H*=j;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Q.enableZoom=!1}function p(j,$0){if(!Q.zoomToCursor)return;C=!0;let U0=Q.domElement.getBoundingClientRect(),R0=j-U0.left,u0=$0-U0.top,H0=U0.width,y=U0.height;z.x=R0/H0*2-1,z.y=-(u0/y)*2+1,B.set(z.x,z.y,1).unproject(Q.object).sub(Q.object.position).normalize()}function h(j){return Math.max(Q.minDistance,Math.min(Q.maxDistance,j))}function c(j){U.set(j.clientX,j.clientY)}function J0(j){p(j.clientX,j.clientX),O.set(j.clientX,j.clientY)}function f(j){G.set(j.clientX,j.clientY)}function e(j){F.set(j.clientX,j.clientY),V.subVectors(F,U).multiplyScalar(Q.rotateSpeed);let $0=Q.domElement;b(2*Math.PI*V.x/$0.clientHeight),s(2*Math.PI*V.y/$0.clientHeight),U.copy(F),Q.update()}function Z0(j){if(D.set(j.clientX,j.clientY),R.subVectors(D,O),R.y>0)m(k(R.y));else if(R.y<0)o(k(R.y));O.copy(D),Q.update()}function W0(j){N.set(j.clientX,j.clientY),E.subVectors(N,G).multiplyScalar(Q.panSpeed),v(E.x,E.y),G.copy(N),Q.update()}function G0(j){if(p(j.clientX,j.clientY),j.deltaY<0)o(k(j.deltaY));else if(j.deltaY>0)m(k(j.deltaY));Q.update()}function S0(j){let $0=!1;switch(j.code){case Q.keys.UP:if(j.ctrlKey||j.metaKey||j.shiftKey)s(2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else v(0,Q.keyPanSpeed);$0=!0;break;case Q.keys.BOTTOM:if(j.ctrlKey||j.metaKey||j.shiftKey)s(-2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else v(0,-Q.keyPanSpeed);$0=!0;break;case Q.keys.LEFT:if(j.ctrlKey||j.metaKey||j.shiftKey)b(2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else v(Q.keyPanSpeed,0);$0=!0;break;case Q.keys.RIGHT:if(j.ctrlKey||j.metaKey||j.shiftKey)b(-2*Math.PI*Q.rotateSpeed/Q.domElement.clientHeight);else v(-Q.keyPanSpeed,0);$0=!0;break}if($0)j.preventDefault(),Q.update()}function x0(j){if(L.length===1)U.set(j.pageX,j.pageY);else{let $0=B0(j),U0=0.5*(j.pageX+$0.x),R0=0.5*(j.pageY+$0.y);U.set(U0,R0)}}function _0(j){if(L.length===1)G.set(j.pageX,j.pageY);else{let $0=B0(j),U0=0.5*(j.pageX+$0.x),R0=0.5*(j.pageY+$0.y);G.set(U0,R0)}}function m0(j){let $0=B0(j),U0=j.pageX-$0.x,R0=j.pageY-$0.y,u0=Math.sqrt(U0*U0+R0*R0);O.set(0,u0)}function g(j){if(Q.enableZoom)m0(j);if(Q.enablePan)_0(j)}function q8(j){if(Q.enableZoom)m0(j);if(Q.enableRotate)x0(j)}function d0(j){if(L.length==1)F.set(j.pageX,j.pageY);else{let U0=B0(j),R0=0.5*(j.pageX+U0.x),u0=0.5*(j.pageY+U0.y);F.set(R0,u0)}V.subVectors(F,U).multiplyScalar(Q.rotateSpeed);let $0=Q.domElement;b(2*Math.PI*V.x/$0.clientHeight),s(2*Math.PI*V.y/$0.clientHeight),U.copy(F)}function L0(j){if(L.length===1)N.set(j.pageX,j.pageY);else{let $0=B0(j),U0=0.5*(j.pageX+$0.x),R0=0.5*(j.pageY+$0.y);N.set(U0,R0)}E.subVectors(N,G).multiplyScalar(Q.panSpeed),v(E.x,E.y),G.copy(N)}function P0(j){let $0=B0(j),U0=j.pageX-$0.x,R0=j.pageY-$0.y,u0=Math.sqrt(U0*U0+R0*R0);D.set(0,u0),R.set(0,Math.pow(D.y/O.y,Q.zoomSpeed)),m(R.y),O.copy(D);let H0=(j.pageX+$0.x)*0.5,y=(j.pageY+$0.y)*0.5;p(H0,y)}function f0(j){if(Q.enableZoom)P0(j);if(Q.enablePan)L0(j)}function k0(j){if(Q.enableZoom)P0(j);if(Q.enableRotate)d0(j)}function j0(j){if(Q.enabled===!1)return;if(L.length===0)Q.domElement.setPointerCapture(j.pointerId),Q.domElement.addEventListener("pointermove",T),Q.domElement.addEventListener("pointerup",M);if(G8(j),j.pointerType==="touch")M0(j);else l(j)}function T(j){if(Q.enabled===!1)return;if(j.pointerType==="touch")v0(j);else X0(j)}function M(j){if(p0(j),L.length===0)Q.domElement.releasePointerCapture(j.pointerId),Q.domElement.removeEventListener("pointermove",T),Q.domElement.removeEventListener("pointerup",M);Q.dispatchEvent(NK),K=Z.NONE}function l(j){let $0;switch(j.button){case 0:$0=Q.mouseButtons.LEFT;break;case 1:$0=Q.mouseButtons.MIDDLE;break;case 2:$0=Q.mouseButtons.RIGHT;break;default:$0=-1}switch($0){case BJ.DOLLY:if(Q.enableZoom===!1)return;J0(j),K=Z.DOLLY;break;case BJ.ROTATE:if(j.ctrlKey||j.metaKey||j.shiftKey){if(Q.enablePan===!1)return;f(j),K=Z.PAN}else{if(Q.enableRotate===!1)return;c(j),K=Z.ROTATE}break;case BJ.PAN:if(j.ctrlKey||j.metaKey||j.shiftKey){if(Q.enableRotate===!1)return;c(j),K=Z.ROTATE}else{if(Q.enablePan===!1)return;f(j),K=Z.PAN}break;default:K=Z.NONE}if(K!==Z.NONE)Q.dispatchEvent(CZ)}function X0(j){switch(K){case Z.ROTATE:if(Q.enableRotate===!1)return;e(j);break;case Z.DOLLY:if(Q.enableZoom===!1)return;Z0(j);break;case Z.PAN:if(Q.enablePan===!1)return;W0(j);break}}function Q0(j){if(Q.enabled===!1||Q.enableZoom===!1||K!==Z.NONE)return;j.preventDefault(),Q.dispatchEvent(CZ),G0(Y0(j)),Q.dispatchEvent(NK)}function Y0(j){let $0=j.deltaMode,U0={clientX:j.clientX,clientY:j.clientY,deltaY:j.deltaY};switch($0){case 1:U0.deltaY*=16;break;case 2:U0.deltaY*=100;break}if(j.ctrlKey&&!_)U0.deltaY*=10;return U0}function T0(j){if(j.key==="Control")_=!0,document.addEventListener("keyup",q0,{passive:!0,capture:!0})}function q0(j){if(j.key==="Control")_=!1,document.removeEventListener("keyup",q0,{passive:!0,capture:!0})}function z0(j){if(Q.enabled===!1||Q.enablePan===!1)return;S0(j)}function M0(j){switch(y0(j),L.length){case 1:switch(Q.touches.ONE){case zJ.ROTATE:if(Q.enableRotate===!1)return;x0(j),K=Z.TOUCH_ROTATE;break;case zJ.PAN:if(Q.enablePan===!1)return;_0(j),K=Z.TOUCH_PAN;break;default:K=Z.NONE}break;case 2:switch(Q.touches.TWO){case zJ.DOLLY_PAN:if(Q.enableZoom===!1&&Q.enablePan===!1)return;g(j),K=Z.TOUCH_DOLLY_PAN;break;case zJ.DOLLY_ROTATE:if(Q.enableZoom===!1&&Q.enableRotate===!1)return;q8(j),K=Z.TOUCH_DOLLY_ROTATE;break;default:K=Z.NONE}break;default:K=Z.NONE}if(K!==Z.NONE)Q.dispatchEvent(CZ)}function v0(j){switch(y0(j),K){case Z.TOUCH_ROTATE:if(Q.enableRotate===!1)return;d0(j),Q.update();break;case Z.TOUCH_PAN:if(Q.enablePan===!1)return;L0(j),Q.update();break;case Z.TOUCH_DOLLY_PAN:if(Q.enableZoom===!1&&Q.enablePan===!1)return;f0(j),Q.update();break;case Z.TOUCH_DOLLY_ROTATE:if(Q.enableZoom===!1&&Q.enableRotate===!1)return;k0(j),Q.update();break;default:K=Z.NONE}}function K0(j){if(Q.enabled===!1)return;j.preventDefault()}function G8(j){L.push(j.pointerId)}function p0(j){delete A[j.pointerId];for(let $0=0;$0<L.length;$0++)if(L[$0]==j.pointerId){L.splice($0,1);return}}function y0(j){let $0=A[j.pointerId];if($0===void 0)$0=new O0,A[j.pointerId]=$0;$0.set(j.pageX,j.pageY)}function B0(j){let $0=j.pointerId===L[0]?L[1]:L[0];return A[$0]}Q.domElement.addEventListener("contextmenu",K0),Q.domElement.addEventListener("pointerdown",j0),Q.domElement.addEventListener("pointercancel",M),Q.domElement.addEventListener("wheel",Q0,{passive:!1}),document.addEventListener("keydown",T0,{passive:!0,capture:!0}),this.update()}}function l9(J){if(J===void 0)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return J}function PK(J,$){J.prototype=Object.create($.prototype),J.prototype.constructor=J,J.__proto__=$}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var $9={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},o7={duration:0.5,overwrite:!1,delay:0},dZ,v8,N8,D9=1e8,X8=1/D9,jZ=Math.PI*2,Q4=jZ/4,Z4=0,SK=Math.sqrt,K4=Math.cos,W4=Math.sin,x8=function($){return typeof $==="string"},C8=function($){return typeof $==="function"},n9=function($){return typeof $==="number"},HQ=function($){return typeof $>"u"},_9=function($){return typeof $==="object"},J9=function($){return $!==!1},pZ=function(){return typeof window<"u"},e$=function($){return C8($)||x8($)},wK=typeof ArrayBuffer==="function"&&ArrayBuffer.isView||function(){},c8=Array.isArray,Y4=/random\([^)]+\)/g,X4=/,\s*/g,BK=/(?:-?\.?\d|\.)+/gi,lZ=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,kJ=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,MZ=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,cZ=/[+-]=-?[.\d]+/,H4=/[^,'"\[\]\s]+/gi,q4=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,z8,S9,xZ,nZ,q9={},ZQ={},_K,TK=function($){return(ZQ=G7($,q9))&&n8},qQ=function($,Q){return console.warn("Invalid property",$,"set to",Q,"Missing plugin? gsap.registerPlugin()")},r7=function($,Q){return!Q&&console.warn($)},jK=function($,Q){return $&&(q9[$]=Q)&&ZQ&&(ZQ[$]=Q)||q9},a7=function(){return 0},U4={suppressEvents:!0,isStart:!0,kill:!1},JQ={suppressEvents:!0,kill:!1},F4={suppressEvents:!0},sZ={},ZJ=[],yZ={},xK,t8={},kZ={},zK=30,$Q=[],iZ="",oZ=function($){var Q=$[0],Z,K;if(_9(Q)||C8(Q)||($=[$]),!(Z=(Q._gsap||{}).harness)){K=$Q.length;while(K--&&!$Q[K].targetTest(Q));Z=$Q[K]}K=$.length;while(K--)$[K]&&($[K]._gsap||($[K]._gsap=new eZ($[K],Z)))||$.splice(K,1);return $},KJ=function($){return $._gsap||oZ(E9($))[0]._gsap},rZ=function($,Q,Z){return(Z=$[Q])&&C8(Z)?$[Q]():HQ(Z)&&$.getAttribute&&$.getAttribute(Q)||Z},o8=function($,Q){return($=$.split(",")).forEach(Q)||$},A8=function($){return Math.round($*1e5)/1e5||0},B8=function($){return Math.round($*1e7)/1e7||0},PJ=function($,Q){var Z=Q.charAt(0),K=parseFloat(Q.substr(2));return $=parseFloat($),Z==="+"?$+K:Z==="-"?$-K:Z==="*"?$*K:$/K},V4=function($,Q){var Z=Q.length,K=0;for(;$.indexOf(Q[K])<0&&++K<Z;);return K<Z},KQ=function(){var $=ZJ.length,Q=ZJ.slice(0),Z,K;yZ={},ZJ.length=0;for(Z=0;Z<$;Z++)K=Q[Z],K&&K._lazy&&(K.render(K._lazy[0],K._lazy[1],!0)._lazy=0)},aZ=function($){return!!($._initted||$._startAt||$.add)},yK=function($,Q,Z,K){ZJ.length&&!v8&&KQ(),$.render(Q,Z,K||!!(v8&&Q<0&&aZ($))),ZJ.length&&!v8&&KQ()},bK=function($){var Q=parseFloat($);return(Q||Q===0)&&($+"").match(H4).length<2?Q:x8($)?$.trim():$},fK=function($){return $},Q9=function($,Q){for(var Z in Q)Z in $||($[Z]=Q[Z]);return $},G4=function($){return function(Q,Z){for(var K in Z)K in Q||K==="duration"&&$||K==="ease"||(Q[K]=Z[K])}},G7=function($,Q){for(var Z in Q)$[Z]=Q[Z];return $},IK=function J($,Q){for(var Z in Q)Z!=="__proto__"&&Z!=="constructor"&&Z!=="prototype"&&($[Z]=_9(Q[Z])?J($[Z]||($[Z]={}),Q[Z]):Q[Z]);return $},WQ=function($,Q){var Z={},K;for(K in $)K in Q||(Z[K]=$[K]);return Z},n7=function($){var Q=$.parent||z8,Z=$.keyframes?G4(c8($.keyframes)):Q9;if(J9($.inherit))while(Q)Z($,Q.vars.defaults),Q=Q.parent||Q._dp;return $},O4=function($,Q){var Z=$.length,K=Z===Q.length;while(K&&Z--&&$[Z]===Q[Z]);return Z<0},hK=function($,Q,Z,K,W){if(Z===void 0)Z="_first";if(K===void 0)K="_last";var X=$[K],Y;if(W){Y=Q[W];while(X&&X[W]>Y)X=X._prev}if(X)Q._next=X._next,X._next=Q;else Q._next=$[Z],$[Z]=Q;if(Q._next)Q._next._prev=Q;else $[K]=Q;return Q._prev=X,Q.parent=Q._dp=$,Q},J$=function($,Q,Z,K){if(Z===void 0)Z="_first";if(K===void 0)K="_last";var{_prev:W,_next:X}=Q;if(W)W._next=X;else if($[Z]===Q)$[Z]=X;if(X)X._prev=W;else if($[K]===Q)$[K]=W;Q._next=Q._prev=Q.parent=null},WJ=function($,Q){$.parent&&(!Q||$.parent.autoRemoveChildren)&&$.parent.remove&&$.parent.remove($),$._act=0},CJ=function($,Q){if($&&(!Q||Q._end>$._dur||Q._start<0)){var Z=$;while(Z)Z._dirty=1,Z=Z.parent}return $},D4=function($){var Q=$.parent;while(Q&&Q.parent)Q._dirty=1,Q.totalDuration(),Q=Q.parent;return $},bZ=function($,Q,Z,K){return $._startAt&&(v8?$._startAt.revert(JQ):$.vars.immediateRender&&!$.vars.autoRevert||$._startAt.render(Q,!0,K))},E4=function J($){return!$||$._ts&&J($.parent)},LK=function($){return $._repeat?O7($._tTime,$=$.duration()+$._rDelay)*$:0},O7=function($,Q){var Z=Math.floor($=B8($/Q));return $&&Z===$?Z-1:Z},YQ=function($,Q){return($-Q._start)*Q._ts+(Q._ts>=0?0:Q._dirty?Q.totalDuration():Q._tDur)},UQ=function($){return $._end=B8($._start+($._tDur/Math.abs($._ts||$._rts||X8)||0))},FQ=function($,Q){var Z=$._dp;if(Z&&Z.smoothChildTiming&&$._ts)$._start=B8(Z._time-($._ts>0?Q/$._ts:(($._dirty?$.totalDuration():$._tDur)-Q)/-$._ts)),UQ($),Z._dirty||CJ(Z,$);return $},vK=function($,Q){var Z;if(Q._time||!Q._dur&&Q._initted||Q._start<$._time&&(Q._dur||!Q.add)){if(Z=YQ($.rawTime(),Q),!Q._dur||$$(0,Q.totalDuration(),Z)-Q._tTime>X8)Q.render(Z,!0)}if(CJ($,Q)._dp&&$._initted&&$._time>=$._dur&&$._ts){if($._dur<$.duration()){Z=$;while(Z._dp)Z.rawTime()>=0&&Z.totalTime(Z._tTime),Z=Z._dp}$._zTime=-X8}},w9=function($,Q,Z,K){return Q.parent&&WJ(Q),Q._start=B8((n9(Z)?Z:Z||$!==z8?O9($,Z,Q):$._time)+Q._delay),Q._end=B8(Q._start+(Q.totalDuration()/Math.abs(Q.timeScale())||0)),hK($,Q,"_first","_last",$._sort?"_start":0),fZ(Q)||($._recent=Q),K||vK($,Q),$._ts<0&&FQ($,$._tTime),$},gK=function($,Q){return(q9.ScrollTrigger||qQ("scrollTrigger",Q))&&q9.ScrollTrigger.create(Q,$)},mK=function($,Q,Z,K,W){if(Q5($,Q,W),!$._initted)return 1;if(!Z&&$._pt&&!v8&&($._dur&&$.vars.lazy!==!1||!$._dur&&$.vars.lazy)&&xK!==e8.frame)return ZJ.push($),$._lazy=[W,K],1},N4=function J($){var Q=$.parent;return Q&&Q._ts&&Q._initted&&!Q._lock&&(Q.rawTime()<0||J(Q))},fZ=function($){var Q=$.data;return Q==="isFromStart"||Q==="isStart"},R4=function($,Q,Z,K){var W=$.ratio,X=Q<0||!Q&&(!$._start&&N4($)&&!(!$._initted&&fZ($))||($._ts<0||$._dp._ts<0)&&!fZ($))?0:1,Y=$._rDelay,H=0,q,U,F;if(Y&&$._repeat){if(H=$$(0,$._tDur,Q),U=O7(H,Y),$._yoyo&&U&1&&(X=1-X),U!==O7($._tTime,Y))W=1-X,$.vars.repeatRefresh&&$._initted&&$.invalidate()}if(X!==W||v8||K||$._zTime===X8||!Q&&$._zTime){if(!$._initted&&mK($,Q,K,Z,H))return;F=$._zTime,$._zTime=Q||(Z?X8:0),Z||(Z=Q&&!F),$.ratio=X,$._from&&(X=1-X),$._time=0,$._tTime=H,q=$._pt;while(q)q.r(X,q.d),q=q._next;if(Q<0&&bZ($,Q,Z,!0),$._onUpdate&&!Z&&H9($,"onUpdate"),H&&$._repeat&&!Z&&$.parent&&H9($,"onRepeat"),(Q>=$._tDur||Q<0)&&$.ratio===X){if(X&&WJ($,1),!Z&&!v8)H9($,X?"onComplete":"onReverseComplete",!0),$._prom&&$._prom()}}else if(!$._zTime)$._zTime=Q},B4=function($,Q,Z){var K;if(Z>Q){K=$._first;while(K&&K._start<=Z){if(K.data==="isPause"&&K._start>Q)return K;K=K._next}}else{K=$._last;while(K&&K._start>=Z){if(K.data==="isPause"&&K._start<Q)return K;K=K._prev}}},D7=function($,Q,Z,K){var W=$._repeat,X=B8(Q)||0,Y=$._tTime/$._tDur;return Y&&!K&&($._time*=X/$._dur),$._dur=X,$._tDur=!W?X:W<0?10000000000:B8(X*(W+1)+$._rDelay*W),Y>0&&!K&&FQ($,$._tTime=$._tDur*Y),$.parent&&UQ($),Z||CJ($.parent,$),$},CK=function($){return $ instanceof l8?CJ($):D7($,$._dur)},z4={_start:0,endTime:a7,totalDuration:a7},O9=function J($,Q,Z){var K=$.labels,W=$._recent||z4,X=$.duration()>=D9?W.endTime(!1):$._dur,Y,H,q;if(x8(Q)&&(isNaN(Q)||(Q in K))){if(H=Q.charAt(0),q=Q.substr(-1)==="%",Y=Q.indexOf("="),H==="<"||H===">")return Y>=0&&(Q=Q.replace(/=/,"")),(H==="<"?W._start:W.endTime(W._repeat>=0))+(parseFloat(Q.substr(1))||0)*(q?(Y<0?W:Z).totalDuration()/100:1);if(Y<0)return Q in K||(K[Q]=X),K[Q];if(H=parseFloat(Q.charAt(Y-1)+Q.substr(Y+1)),q&&Z)H=H/100*(c8(Z)?Z[0]:Z).totalDuration();return Y>1?J($,Q.substr(0,Y-1),Z)+H:X+H}return Q==null?X:+Q},s7=function($,Q,Z){var K=n9(Q[1]),W=(K?2:1)+($<2?0:1),X=Q[W],Y,H;if(K&&(X.duration=Q[1]),X.parent=Z,$){Y=X,H=Z;while(H&&!("immediateRender"in Y))Y=H.vars.defaults||{},H=J9(H.vars.inherit)&&H.parent;X.immediateRender=J9(Y.immediateRender),$<2?X.runBackwards=1:X.startAt=Q[W-1]}return new P8(Q[0],X,Q[W+1])},YJ=function($,Q){return $||$===0?Q($):Q},$$=function($,Q,Z){return Z<$?$:Z>Q?Q:Z},g8=function($,Q){return!x8($)||!(Q=q4.exec($))?"":Q[1]},I4=function($,Q,Z){return YJ(Z,function(K){return $$($,Q,K)})},hZ=[].slice,uK=function($,Q){return $&&_9($)&&"length"in $&&(!Q&&!$.length||($.length-1 in $)&&_9($[0]))&&!$.nodeType&&$!==S9},L4=function($,Q,Z){if(Z===void 0)Z=[];return $.forEach(function(K){var W;return x8(K)&&!Q||uK(K,1)?(W=Z).push.apply(W,E9(K)):Z.push(K)})||Z},E9=function($,Q,Z){return N8&&!Q&&N8.selector?N8.selector($):x8($)&&!Z&&(xZ||!E7())?hZ.call((Q||nZ).querySelectorAll($),0):c8($)?L4($,Z):uK($)?hZ.call($,0):$?[$]:[]},vZ=function($){return $=E9($)[0]||r7("Invalid scope")||{},function(Q){var Z=$.current||$.nativeElement||$;return E9(Q,Z.querySelectorAll?Z:Z===$?r7("Invalid scope")||nZ.createElement("div"):$)}},dK=function($){return $.sort(function(){return 0.5-Math.random()})},pK=function($){if(C8($))return $;var Q=_9($)?$:{each:$},Z=AJ(Q.ease),K=Q.from||0,W=parseFloat(Q.base)||0,X={},Y=K>0&&K<1,H=isNaN(K)||Y,q=Q.axis,U=K,F=K;if(x8(K))U=F={center:0.5,edges:0.5,end:1}[K]||0;else if(!Y&&H)U=K[0],F=K[1];return function(V,G,N){var E=(N||Q).length,O=X[E],D,R,B,z,C,L,A,_,I;if(!O){if(I=Q.grid==="auto"?0:(Q.grid||[1,D9])[1],!I){A=-D9;while(A<(A=N[I++].getBoundingClientRect().left)&&I<E);I<E&&I--}O=X[E]=[],D=H?Math.min(I,E)*U-0.5:K%I,R=I===D9?0:H?E*F/I-0.5:K/I|0,A=0,_=D9;for(L=0;L<E;L++)B=L%I-D,z=R-(L/I|0),O[L]=C=!q?SK(B*B+z*z):Math.abs(q==="y"?z:B),C>A&&(A=C),C<_&&(_=C);K==="random"&&dK(O),O.max=A-_,O.min=_,O.v=E=(parseFloat(Q.amount)||parseFloat(Q.each)*(I>E?E-1:!q?Math.max(I,E/I):q==="y"?E/I:I)||0)*(K==="edges"?-1:1),O.b=E<0?W-E:W,O.u=g8(Q.amount||Q.each)||0,Z=Z&&E<0?b4(Z):Z}return E=(O[V]-O.min)/O.max||0,B8(O.b+(Z?Z(E):E)*O.v)+O.u}},gZ=function($){var Q=Math.pow(10,(($+"").split(".")[1]||"").length);return function(Z){var K=B8(Math.round(parseFloat(Z)/$)*$*Q);return(K-K%1)/Q+(n9(Z)?0:g8(Z))}},lK=function($,Q){var Z=c8($),K,W;if(!Z&&_9($))if(K=Z=$.radius||D9,$.values){if($=E9($.values),W=!n9($[0]))K*=K}else $=gZ($.increment);return YJ(Q,!Z?gZ($):C8($)?function(X){return W=$(X),Math.abs(W-X)<=K?W:X}:function(X){var Y=parseFloat(W?X.x:X),H=parseFloat(W?X.y:0),q=D9,U=0,F=$.length,V,G;while(F--){if(W)V=$[F].x-Y,G=$[F].y-H,V=V*V+G*G;else V=Math.abs($[F]-Y);if(V<q)q=V,U=F}return U=!K||q<=K?$[U]:X,W||U===X||n9(X)?U:U+g8(X)})},cK=function($,Q,Z,K){return YJ(c8($)?!Q:Z===!0?!!(Z=0):!K,function(){return c8($)?$[~~(Math.random()*$.length)]:(Z=Z||0.00001)&&(K=Z<1?Math.pow(10,(Z+"").length-2):1)&&Math.floor(Math.round(($-Z/2+Math.random()*(Q-$+Z*0.99))/Z)*Z*K)/K})},C4=function(){for(var $=arguments.length,Q=Array($),Z=0;Z<$;Z++)Q[Z]=arguments[Z];return function(K){return Q.reduce(function(W,X){return X(W)},K)}},A4=function($,Q){return function(Z){return $(parseFloat(Z))+(Q||g8(Z))}},M4=function($,Q,Z){return sK($,Q,0,1,Z)},nK=function($,Q,Z){return YJ(Z,function(K){return $[~~Q(K)]})},k4=function J($,Q,Z){var K=Q-$;return c8($)?nK($,J(0,$.length),Q):YJ(Z,function(W){return(K+(W-$)%K)%K+$})},P4=function J($,Q,Z){var K=Q-$,W=K*2;return c8($)?nK($,J(0,$.length-1),Q):YJ(Z,function(X){return X=(W+(X-$)%W)%W||0,$+(X>K?W-X:X)})},N7=function($){return $.replace(Y4,function(Q){var Z=Q.indexOf("[")+1,K=Q.substring(Z||7,Z?Q.indexOf("]"):Q.length-1).split(X4);return cK(Z?K:+K[0],Z?0:+K[1],+K[2]||0.00001)})},sK=function($,Q,Z,K,W){var X=Q-$,Y=K-Z;return YJ(W,function(H){return Z+((H-$)/X*Y||0)})},S4=function J($,Q,Z,K){var W=isNaN($+Q)?0:function(G){return(1-G)*$+G*Q};if(!W){var X=x8($),Y={},H,q,U,F,V;if(Z===!0&&(K=1)&&(Z=null),X)$={p:$},Q={p:Q};else if(c8($)&&!c8(Q)){U=[],F=$.length,V=F-2;for(q=1;q<F;q++)U.push(J($[q-1],$[q]));F--,W=function(N){N*=F;var E=Math.min(V,~~N);return U[E](N-E)},Z=Q}else if(!K)$=G7(c8($)?[]:{},$);if(!U){for(H in Q)J5.call(Y,$,H,"get",Q[H]);W=function(N){return W5(N,Y)||(X?$.p:$)}}}return YJ(Z,W)},AK=function($,Q,Z){var K=$.labels,W=D9,X,Y,H;for(X in K)if(Y=K[X]-Q,Y<0===!!Z&&Y&&W>(Y=Math.abs(Y)))H=X,W=Y;return H},H9=function($,Q,Z){var K=$.vars,W=K[Q],X=N8,Y=$._ctx,H,q,U;if(!W)return;return H=K[Q+"Params"],q=K.callbackScope||$,Z&&ZJ.length&&KQ(),Y&&(N8=Y),U=H?W.apply(q,H):W.call(q),N8=X,U},l7=function($){return WJ($),$.scrollTrigger&&$.scrollTrigger.kill(!!v8),$.progress()<1&&H9($,"onInterrupt"),$},V7,iK=[],oK=function($){if(!$)return;if($=!$.name&&$.default||$,pZ()||$.headless){var Q=$.name,Z=C8($),K=Q&&!Z&&$.init?function(){this._props=[]}:$,W={init:a7,render:W5,add:J5,kill:c4,modifier:l4,rawVars:0},X={targetTest:0,get:0,getSetter:VQ,aliases:{},register:0};if(E7(),$!==K){if(t8[Q])return;if(Q9(K,Q9(WQ($,W),X)),G7(K.prototype,G7(W,WQ($,X))),t8[K.prop=Q]=K,$.targetTest)$Q.push(K),sZ[Q]=1;Q=(Q==="css"?"CSS":Q.charAt(0).toUpperCase()+Q.substr(1))+"Plugin"}jK(Q,K),$.register&&$.register(n8,K,r8)}else iK.push($)},Y8=255,c7={aqua:[0,Y8,Y8],lime:[0,Y8,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Y8],navy:[0,0,128],white:[Y8,Y8,Y8],olive:[128,128,0],yellow:[Y8,Y8,0],orange:[Y8,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Y8,0,0],pink:[Y8,192,203],cyan:[0,Y8,Y8],transparent:[Y8,Y8,Y8,0]},PZ=function($,Q,Z){return $+=$<0?1:$>1?-1:0,($*6<1?Q+(Z-Q)*$*6:$<0.5?Z:$*3<2?Q+(Z-Q)*(0.6666666666666666-$)*6:Q)*Y8+0.5|0},rK=function($,Q,Z){var K=!$?c7.black:n9($)?[$>>16,$>>8&Y8,$&Y8]:0,W,X,Y,H,q,U,F,V,G,N;if(!K){if($.substr(-1)===",")$=$.substr(0,$.length-1);if(c7[$])K=c7[$];else if($.charAt(0)==="#"){if($.length<6)W=$.charAt(1),X=$.charAt(2),Y=$.charAt(3),$="#"+W+W+X+X+Y+Y+($.length===5?$.charAt(4)+$.charAt(4):"");if($.length===9)return K=parseInt($.substr(1,6),16),[K>>16,K>>8&Y8,K&Y8,parseInt($.substr(7),16)/255];$=parseInt($.substr(1),16),K=[$>>16,$>>8&Y8,$&Y8]}else if($.substr(0,3)==="hsl"){if(K=N=$.match(BK),!Q)H=+K[0]%360/360,q=+K[1]/100,U=+K[2]/100,X=U<=0.5?U*(q+1):U+q-U*q,W=U*2-X,K.length>3&&(K[3]*=1),K[0]=PZ(H+0.3333333333333333,W,X),K[1]=PZ(H,W,X),K[2]=PZ(H-0.3333333333333333,W,X);else if(~$.indexOf("="))return K=$.match(lZ),Z&&K.length<4&&(K[3]=1),K}else K=$.match(BK)||c7.transparent;K=K.map(Number)}if(Q&&!N){if(W=K[0]/Y8,X=K[1]/Y8,Y=K[2]/Y8,F=Math.max(W,X,Y),V=Math.min(W,X,Y),U=(F+V)/2,F===V)H=q=0;else G=F-V,q=U>0.5?G/(2-F-V):G/(F+V),H=F===W?(X-Y)/G+(X<Y?6:0):F===X?(Y-W)/G+2:(W-X)/G+4,H*=60;K[0]=~~(H+0.5),K[1]=~~(q*100+0.5),K[2]=~~(U*100+0.5)}return Z&&K.length<4&&(K[3]=1),K},aK=function($){var Q=[],Z=[],K=-1;return $.split(c9).forEach(function(W){var X=W.match(kJ)||[];Q.push.apply(Q,X),Z.push(K+=X.length+1)}),Q.c=Z,Q},MK=function($,Q,Z){var K="",W=($+K).match(c9),X=Q?"hsla(":"rgba(",Y=0,H,q,U,F;if(!W)return $;if(W=W.map(function(V){return(V=rK(V,Q,1))&&X+(Q?V[0]+","+V[1]+"%,"+V[2]+"%,"+V[3]:V.join(","))+")"}),Z){if(U=aK($),H=Z.c,H.join(K)!==U.c.join(K)){q=$.replace(c9,"1").split(kJ),F=q.length-1;for(;Y<F;Y++)K+=q[Y]+(~H.indexOf(Y)?W.shift()||X+"0,0,0,0)":(U.length?U:W.length?W:Z).shift())}}if(!q){q=$.split(c9),F=q.length-1;for(;Y<F;Y++)K+=q[Y]+W[Y]}return K+q[F]},c9=function(){var J="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",$;for($ in c7)J+="|"+$+"\\b";return new RegExp(J+")","gi")}(),w4=/hsl[a]?\(/,tZ=function($){var Q=$.join(" "),Z;if(c9.lastIndex=0,c9.test(Q))return Z=w4.test(Q),$[1]=MK($[1],Z),$[0]=MK($[0],Z,aK($[1])),!0},t7,e8=function(){var J=Date.now,$=500,Q=33,Z=J(),K=Z,W=4.166666666666667,X=W,Y=[],H,q,U,F,V,G,N=function E(O){var D=J()-K,R=O===!0,B,z,C,L;if((D>$||D<0)&&(Z+=D-Q),K+=D,C=K-Z,B=C-X,B>0||R)L=++F.frame,V=C-F.time*1000,F.time=C=C/1000,X+=B+(B>=W?4:W-B),z=1;if(R||(H=q(E)),z)for(G=0;G<Y.length;G++)Y[G](C,V,L,O)};return F={time:0,frame:0,tick:function(){N(!0)},deltaRatio:function(O){return V/(1000/(O||60))},wake:function(){if(_K){if(!xZ&&pZ())S9=xZ=window,nZ=S9.document||{},q9.gsap=n8,(S9.gsapVersions||(S9.gsapVersions=[])).push(n8.version),TK(ZQ||S9.GreenSockGlobals||!S9.gsap&&S9||{}),iK.forEach(oK);U=typeof requestAnimationFrame<"u"&&requestAnimationFrame,H&&F.sleep(),q=U||function(O){return setTimeout(O,X-F.time*1000+1|0)},t7=1,N(2)}},sleep:function(){(U?cancelAnimationFrame:clearTimeout)(H),t7=0,q=a7},lagSmoothing:function(O,D){$=O||1/0,Q=Math.min(D||33,$)},fps:function(O){W=1000/(O||240),X=F.time*1000+W},add:function(O,D,R){var B=D?function(z,C,L,A){O(z,C,L,A),F.remove(B)}:O;return F.remove(O),Y[R?"unshift":"push"](B),E7(),B},remove:function(O,D){~(D=Y.indexOf(O))&&Y.splice(D,1)&&G>=D&&G--},_listeners:Y},F}(),E7=function(){return!t7&&e8.wake()},e0={},_4=/^[\d.\-M][\d.\-,\s]/,T4=/["']/g,j4=function($){var Q={},Z=$.substr(1,$.length-3).split(":"),K=Z[0],W=1,X=Z.length,Y,H,q;for(;W<X;W++)H=Z[W],Y=W!==X-1?H.lastIndexOf(","):H.length,q=H.substr(0,Y),Q[K]=isNaN(q)?q.replace(T4,"").trim():+q,K=H.substr(Y+1).trim();return Q},x4=function($){var Q=$.indexOf("(")+1,Z=$.indexOf(")"),K=$.indexOf("(",Q);return $.substring(Q,~K&&K<Z?$.indexOf(")",Z+1):Z)},y4=function($){var Q=($+"").split("("),Z=e0[Q[0]];return Z&&Q.length>1&&Z.config?Z.config.apply(null,~$.indexOf("{")?[j4(Q[1])]:x4($).split(",").map(bK)):e0._CE&&_4.test($)?e0._CE("",$):Z},b4=function($){return function(Q){return 1-$(1-Q)}},AJ=function($,Q){return!$?Q:(C8($)?$:e0[$]||y4($))||Q},SJ=function($,Q,Z,K){if(Z===void 0)Z=function(H){return 1-Q(1-H)};if(K===void 0)K=function(H){return H<0.5?Q(H*2)/2:1-Q((1-H)*2)/2};var W={easeIn:Q,easeOut:Z,easeInOut:K},X;return o8($,function(Y){e0[Y]=q9[Y]=W,e0[X=Y.toLowerCase()]=Z;for(var H in W)e0[X+(H==="easeIn"?".in":H==="easeOut"?".out":".inOut")]=e0[Y+"."+H]=W[H]}),W},tK=function($){return function(Q){return Q<0.5?(1-$(1-Q*2))/2:0.5+$((Q-0.5)*2)/2}},SZ=function J($,Q,Z){var K=Q>=1?Q:1,W=(Z||($?0.3:0.45))/(Q<1?Q:1),X=W/jZ*(Math.asin(1/K)||0),Y=function(U){return U===1?1:K*Math.pow(2,-10*U)*W4((U-X)*W)+1},H=$==="out"?Y:$==="in"?function(q){return 1-Y(1-q)}:tK(Y);return W=jZ/W,H.config=function(q,U){return J($,q,U)},H},wZ=function J($,Q){if(Q===void 0)Q=1.70158;var Z=function(X){return X?--X*X*((Q+1)*X+Q)+1:0},K=$==="out"?Z:$==="in"?function(W){return 1-Z(1-W)}:tK(Z);return K.config=function(W){return J($,W)},K};o8("Linear,Quad,Cubic,Quart,Quint,Strong",function(J,$){var Q=$<5?$+1:$;SJ(J+",Power"+(Q-1),$?function(Z){return Math.pow(Z,Q)}:function(Z){return Z},function(Z){return 1-Math.pow(1-Z,Q)},function(Z){return Z<0.5?Math.pow(Z*2,Q)/2:1-Math.pow((1-Z)*2,Q)/2})});e0.Linear.easeNone=e0.none=e0.Linear.easeIn;SJ("Elastic",SZ("in"),SZ("out"),SZ());(function(J,$){var Q=1/$,Z=2*Q,K=2.5*Q,W=function(Y){return Y<Q?J*Y*Y:Y<Z?J*Math.pow(Y-1.5/$,2)+0.75:Y<K?J*(Y-=2.25/$)*Y+0.9375:J*Math.pow(Y-2.625/$,2)+0.984375};SJ("Bounce",function(X){return 1-W(1-X)},W)})(7.5625,2.75);SJ("Expo",function(J){return Math.pow(2,10*(J-1))*J+J*J*J*J*J*J*(1-J)});SJ("Circ",function(J){return-(SK(1-J*J)-1)});SJ("Sine",function(J){return J===1?1:-K4(J*Q4)+1});SJ("Back",wZ("in"),wZ("out"),wZ());e0.SteppedEase=e0.steps=q9.SteppedEase={config:function($,Q){if($===void 0)$=1;var Z=1/$,K=$+(Q?0:1),W=Q?1:0,X=1-X8;return function(Y){return((K*$$(0,X,Y)|0)+W)*Z}}};o7.ease=e0["quad.out"];o8("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(J){return iZ+=J+","+J+"Params,"});var eZ=function($,Q){this.id=Z4++,$._gsap=this,this.target=$,this.harness=Q,this.get=Q?Q.get:rZ,this.set=Q?Q.getSetter:VQ},e7=function(){function J(Q){if(this.vars=Q,this._delay=+Q.delay||0,this._repeat=Q.repeat===1/0?-2:Q.repeat||0)this._rDelay=Q.repeatDelay||0,this._yoyo=!!Q.yoyo||!!Q.yoyoEase;if(this._ts=1,D7(this,+Q.duration,1,1),this.data=Q.data,N8)this._ctx=N8,N8.data.push(this);t7||e8.wake()}var $=J.prototype;return $.delay=function(Z){if(Z||Z===0)return this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+Z-this._delay),this._delay=Z,this;return this._delay},$.duration=function(Z){return arguments.length?this.totalDuration(this._repeat>0?Z+(Z+this._rDelay)*this._repeat:Z):this.totalDuration()&&this._dur},$.totalDuration=function(Z){if(!arguments.length)return this._tDur;return this._dirty=0,D7(this,this._repeat<0?Z:(Z-this._repeat*this._rDelay)/(this._repeat+1))},$.totalTime=function(Z,K){if(E7(),!arguments.length)return this._tTime;var W=this._dp;if(W&&W.smoothChildTiming&&this._ts){FQ(this,Z),!W._dp||W.parent||vK(W,this);while(W&&W.parent){if(W.parent._time!==W._start+(W._ts>=0?W._tTime/W._ts:(W.totalDuration()-W._tTime)/-W._ts))W.totalTime(W._tTime,!0);W=W.parent}if(!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&Z<this._tDur||this._ts<0&&Z>0||!this._tDur&&!Z))w9(this._dp,this,this._start-this._delay)}if(this._tTime!==Z||!this._dur&&!K||this._initted&&Math.abs(this._zTime)===X8||!this._initted&&this._dur&&Z||!Z&&!this._initted&&(this.add||this._ptLookup))this._ts||(this._pTime=Z),yK(this,Z,K);return this},$.time=function(Z,K){return arguments.length?this.totalTime(Math.min(this.totalDuration(),Z+LK(this))%(this._dur+this._rDelay)||(Z?this._dur:0),K):this._time},$.totalProgress=function(Z,K){return arguments.length?this.totalTime(this.totalDuration()*Z,K):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},$.progress=function(Z,K){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-Z:Z)+LK(this),K):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},$.iteration=function(Z,K){var W=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(Z-1)*W,K):this._repeat?O7(this._tTime,W)+1:1},$.timeScale=function(Z,K){if(!arguments.length)return this._rts===-X8?0:this._rts;if(this._rts===Z)return this;var W=this.parent&&this._ts?YQ(this.parent._time,this):this._tTime;return this._rts=+Z||0,this._ts=this._ps||Z===-X8?0:this._rts,this.totalTime($$(-Math.abs(this._delay),this.totalDuration(),W),K!==!1),UQ(this),D4(this)},$.paused=function(Z){if(!arguments.length)return this._ps;if(this._ps!==Z)if(this._ps=Z,Z)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else E7(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==X8&&(this._tTime-=X8));return this},$.startTime=function(Z){if(arguments.length){this._start=B8(Z);var K=this.parent||this._dp;return K&&(K._sort||!this.parent)&&w9(K,this,this._start-this._delay),this}return this._start},$.endTime=function(Z){return this._start+(J9(Z)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},$.rawTime=function(Z){var K=this.parent||this._dp;return!K?this._tTime:Z&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):!this._ts?this._tTime:YQ(K.rawTime(Z),this)},$.revert=function(Z){if(Z===void 0)Z=F4;var K=v8;if(v8=Z,aZ(this))this.timeline&&this.timeline.revert(Z),this.totalTime(-0.01,Z.suppressEvents);return this.data!=="nested"&&Z.kill!==!1&&this.kill(),v8=K,this},$.globalTime=function(Z){var K=this,W=arguments.length?Z:K.rawTime();while(K)W=K._start+W/(Math.abs(K._ts)||1),K=K._dp;return!this.parent&&this._sat?this._sat.globalTime(Z):W},$.repeat=function(Z){if(arguments.length)return this._repeat=Z===1/0?-2:Z,CK(this);return this._repeat===-2?1/0:this._repeat},$.repeatDelay=function(Z){if(arguments.length){var K=this._time;return this._rDelay=Z,CK(this),K?this.time(K):this}return this._rDelay},$.yoyo=function(Z){if(arguments.length)return this._yoyo=Z,this;return this._yoyo},$.seek=function(Z,K){return this.totalTime(O9(this,Z),J9(K))},$.restart=function(Z,K){return this.play().totalTime(Z?-this._delay:0,J9(K)),this._dur||(this._zTime=-X8),this},$.play=function(Z,K){return Z!=null&&this.seek(Z,K),this.reversed(!1).paused(!1)},$.reverse=function(Z,K){return Z!=null&&this.seek(Z||this.totalDuration(),K),this.reversed(!0).paused(!1)},$.pause=function(Z,K){return Z!=null&&this.seek(Z,K),this.paused(!0)},$.resume=function(){return this.paused(!1)},$.reversed=function(Z){if(arguments.length)return!!Z!==this.reversed()&&this.timeScale(-this._rts||(Z?-X8:0)),this;return this._rts<0},$.invalidate=function(){return this._initted=this._act=0,this._zTime=-X8,this},$.isActive=function(){var Z=this.parent||this._dp,K=this._start,W;return!!(!Z||this._ts&&this._initted&&Z.isActive()&&(W=Z.rawTime(!0))>=K&&W<this.endTime(!0)-X8)},$.eventCallback=function(Z,K,W){var X=this.vars;if(arguments.length>1){if(!K)delete X[Z];else X[Z]=K,W&&(X[Z+"Params"]=W),Z==="onUpdate"&&(this._onUpdate=K);return this}return X[Z]},$.then=function(Z){var K=this,W=K._prom;return new Promise(function(X){var Y=C8(Z)?Z:fK,H=function(){var U=K.then;K.then=null,W&&W(),C8(Y)&&(Y=Y(K))&&(Y.then||Y===K)&&(K.then=U),X(Y),K.then=U};if(K._initted&&K.totalProgress()===1&&K._ts>=0||!K._tTime&&K._ts<0)H();else K._prom=H})},$.kill=function(){l7(this)},J}();Q9(e7.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-X8,_prom:0,_ps:!1,_rts:1});var l8=function(J){PK($,J);function $(Z,K){var W;if(Z===void 0)Z={};return W=J.call(this,Z)||this,W.labels={},W.smoothChildTiming=!!Z.smoothChildTiming,W.autoRemoveChildren=!!Z.autoRemoveChildren,W._sort=J9(Z.sortChildren),z8&&w9(Z.parent||z8,l9(W),K),Z.reversed&&W.reverse(),Z.paused&&W.paused(!0),Z.scrollTrigger&&gK(l9(W),Z.scrollTrigger),W}var Q=$.prototype;return Q.to=function(K,W,X){return s7(0,arguments,this),this},Q.from=function(K,W,X){return s7(1,arguments,this),this},Q.fromTo=function(K,W,X,Y){return s7(2,arguments,this),this},Q.set=function(K,W,X){return W.duration=0,W.parent=this,n7(W).repeatDelay||(W.repeat=0),W.immediateRender=!!W.immediateRender,new P8(K,W,O9(this,X),1),this},Q.call=function(K,W,X){return w9(this,P8.delayedCall(0,K,W),X)},Q.staggerTo=function(K,W,X,Y,H,q,U){return X.duration=W,X.stagger=X.stagger||Y,X.onComplete=q,X.onCompleteParams=U,X.parent=this,new P8(K,X,O9(this,H)),this},Q.staggerFrom=function(K,W,X,Y,H,q,U){return X.runBackwards=1,n7(X).immediateRender=J9(X.immediateRender),this.staggerTo(K,W,X,Y,H,q,U)},Q.staggerFromTo=function(K,W,X,Y,H,q,U,F){return Y.startAt=X,n7(Y).immediateRender=J9(Y.immediateRender),this.staggerTo(K,W,Y,H,q,U,F)},Q.render=function(K,W,X){var Y=this._time,H=this._dirty?this.totalDuration():this._tDur,q=this._dur,U=K<=0?0:B8(K),F=this._zTime<0!==K<0&&(this._initted||!q),V,G,N,E,O,D,R,B,z,C,L,A;if(this!==z8&&U>H&&K>=0&&(U=H),U!==this._tTime||X||F){if(Y!==this._time&&q)U+=this._time-Y,K+=this._time-Y;if(V=U,z=this._start,B=this._ts,D=!B,F)q||(Y=this._zTime),(K||!W)&&(this._zTime=K);if(this._repeat){if(L=this._yoyo,O=q+this._rDelay,this._repeat<-1&&K<0)return this.totalTime(O*100+K,W,X);if(V=B8(U%O),U===H)E=this._repeat,V=q;else{if(C=B8(U/O),E=~~C,E&&E===C)V=q,E--;V>q&&(V=q)}if(C=O7(this._tTime,O),!Y&&this._tTime&&C!==E&&this._tTime-C*O-this._dur<=0&&(C=E),L&&E&1)V=q-V,A=1;if(E!==C&&!this._lock){var _=L&&C&1,I=_===(L&&E&1);if(E<C&&(_=!_),Y=_?0:U%q?q:U,this._lock=1,this.render(Y||(A?0:B8(E*O)),W,!q)._lock=0,this._tTime=U,!W&&this.parent&&H9(this,"onRepeat"),this.vars.repeatRefresh&&!A)this.invalidate()._lock=1,C=E;if(Y&&Y!==this._time||D!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(q=this._dur,H=this._tDur,I)this._lock=2,Y=_?q:-0.0001,this.render(Y,!0),this.vars.repeatRefresh&&!A&&this.invalidate();if(this._lock=0,!this._ts&&!D)return this}}if(this._hasPause&&!this._forcing&&this._lock<2){if(R=B4(this,B8(Y),B8(V)),R)U-=V-(V=R._start)}if(this._tTime=U,this._time=V,this._act=!!B,!this._initted)this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=K,Y=0;if(!Y&&U&&q&&!W&&!C){if(H9(this,"onStart"),this._tTime!==U)return this}if(V>=Y&&K>=0){G=this._first;while(G){if(N=G._next,(G._act||V>=G._start)&&G._ts&&R!==G){if(G.parent!==this)return this.render(K,W,X);if(G.render(G._ts>0?(V-G._start)*G._ts:(G._dirty?G.totalDuration():G._tDur)+(V-G._start)*G._ts,W,X),V!==this._time||!this._ts&&!D){R=0,N&&(U+=this._zTime=-X8);break}}G=N}}else{G=this._last;var k=K<0?K:V;while(G){if(N=G._prev,(G._act||k<=G._end)&&G._ts&&R!==G){if(G.parent!==this)return this.render(K,W,X);if(G.render(G._ts>0?(k-G._start)*G._ts:(G._dirty?G.totalDuration():G._tDur)+(k-G._start)*G._ts,W,X||v8&&aZ(G)),V!==this._time||!this._ts&&!D){R=0,N&&(U+=this._zTime=k?-X8:X8);break}}G=N}}if(R&&!W){if(this.pause(),R.render(V>=Y?0:-X8)._zTime=V>=Y?1:-1,this._ts)return this._start=z,UQ(this),this.render(K,W,X)}if(this._onUpdate&&!W&&H9(this,"onUpdate",!0),U===H&&this._tTime>=this.totalDuration()||!U&&Y){if(z===this._start||Math.abs(B)!==Math.abs(this._ts)){if(!this._lock){if((K||!q)&&(U===H&&this._ts>0||!U&&this._ts<0)&&WJ(this,1),!W&&!(K<0&&!Y)&&(U||Y||!H))H9(this,U===H&&K>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(U<H&&this.timeScale()>0)&&this._prom()}}}}return this},Q.add=function(K,W){var X=this;if(n9(W)||(W=O9(this,W,K)),!(K instanceof e7)){if(c8(K))return K.forEach(function(Y){return X.add(Y,W)}),this;if(x8(K))return this.addLabel(K,W);if(C8(K))K=P8.delayedCall(0,K);else return this}return this!==K?w9(this,K,W):this},Q.getChildren=function(K,W,X,Y){if(K===void 0)K=!0;if(W===void 0)W=!0;if(X===void 0)X=!0;if(Y===void 0)Y=-D9;var H=[],q=this._first;while(q){if(q._start>=Y)if(q instanceof P8)W&&H.push(q);else X&&H.push(q),K&&H.push.apply(H,q.getChildren(!0,W,X));q=q._next}return H},Q.getById=function(K){var W=this.getChildren(1,1,1),X=W.length;while(X--)if(W[X].vars.id===K)return W[X]},Q.remove=function(K){if(x8(K))return this.removeLabel(K);if(C8(K))return this.killTweensOf(K);if(K.parent===this&&J$(this,K),K===this._recent)this._recent=this._last;return CJ(this)},Q.totalTime=function(K,W){if(!arguments.length)return this._tTime;if(this._forcing=1,!this._dp&&this._ts)this._start=B8(e8.time-(this._ts>0?K/this._ts:(this.totalDuration()-K)/-this._ts));return J.prototype.totalTime.call(this,K,W),this._forcing=0,this},Q.addLabel=function(K,W){return this.labels[K]=O9(this,W),this},Q.removeLabel=function(K){return delete this.labels[K],this},Q.addPause=function(K,W,X){var Y=P8.delayedCall(0,W||a7,X);return Y.data="isPause",this._hasPause=1,w9(this,Y,O9(this,K))},Q.removePause=function(K){var W=this._first;K=O9(this,K);while(W){if(W._start===K&&W.data==="isPause")WJ(W);W=W._next}},Q.killTweensOf=function(K,W,X){var Y=this.getTweensOf(K,X),H=Y.length;while(H--)QJ!==Y[H]&&Y[H].kill(K,W);return this},Q.getTweensOf=function(K,W){var X=[],Y=E9(K),H=this._first,q=n9(W),U;while(H){if(H instanceof P8){if(V4(H._targets,Y)&&(q?(!QJ||H._initted&&H._ts)&&H.globalTime(0)<=W&&H.globalTime(H.totalDuration())>W:!W||H.isActive()))X.push(H)}else if((U=H.getTweensOf(Y,W)).length)X.push.apply(X,U);H=H._next}return X},Q.tweenTo=function(K,W){W=W||{};var X=this,Y=O9(X,K),H=W,q=H.startAt,U=H.onStart,F=H.onStartParams,V=H.immediateRender,G,N=P8.to(X,Q9({ease:W.ease||"none",lazy:!1,immediateRender:!1,time:Y,overwrite:"auto",duration:W.duration||Math.abs((Y-(q&&"time"in q?q.time:X._time))/X.timeScale())||X8,onStart:function(){if(X.pause(),!G){var O=W.duration||Math.abs((Y-(q&&"time"in q?q.time:X._time))/X.timeScale());N._dur!==O&&D7(N,O,0,1).render(N._time,!0,!0),G=1}U&&U.apply(N,F||[])}},W));return V?N.render(0):N},Q.tweenFromTo=function(K,W,X){return this.tweenTo(W,Q9({startAt:{time:O9(this,K)}},X))},Q.recent=function(){return this._recent},Q.nextLabel=function(K){if(K===void 0)K=this._time;return AK(this,O9(this,K))},Q.previousLabel=function(K){if(K===void 0)K=this._time;return AK(this,O9(this,K),1)},Q.currentLabel=function(K){return arguments.length?this.seek(K,!0):this.previousLabel(this._time+X8)},Q.shiftChildren=function(K,W,X){if(X===void 0)X=0;var Y=this._first,H=this.labels,q;K=B8(K);while(Y){if(Y._start>=X)Y._start+=K,Y._end+=K;Y=Y._next}if(W){for(q in H)if(H[q]>=X)H[q]+=K}return CJ(this)},Q.invalidate=function(K){var W=this._first;this._lock=0;while(W)W.invalidate(K),W=W._next;return J.prototype.invalidate.call(this,K)},Q.clear=function(K){if(K===void 0)K=!0;var W=this._first,X;while(W)X=W._next,this.remove(W),W=X;return this._dp&&(this._time=this._tTime=this._pTime=0),K&&(this.labels={}),CJ(this)},Q.totalDuration=function(K){var W=0,X=this,Y=X._last,H=D9,q,U,F;if(arguments.length)return X.timeScale((X._repeat<0?X.duration():X.totalDuration())/(X.reversed()?-K:K));if(X._dirty){F=X.parent;while(Y){if(q=Y._prev,Y._dirty&&Y.totalDuration(),U=Y._start,U>H&&X._sort&&Y._ts&&!X._lock)X._lock=1,w9(X,Y,U-Y._delay,1)._lock=0;else H=U;if(U<0&&Y._ts){if(W-=U,!F&&!X._dp||F&&F.smoothChildTiming)X._start+=B8(U/X._ts),X._time-=U,X._tTime-=U;X.shiftChildren(-U,!1,-1/0),H=0}Y._end>W&&Y._ts&&(W=Y._end),Y=q}D7(X,X===z8&&X._time>W?X._time:W,1,1),X._dirty=0}return X._tDur},$.updateRoot=function(K){if(z8._ts)yK(z8,YQ(K,z8)),xK=e8.frame;if(e8.frame>=zK){zK+=$9.autoSleep||120;var W=z8._first;if(!W||!W._ts){if($9.autoSleep&&e8._listeners.length<2){while(W&&!W._ts)W=W._next;W||e8.sleep()}}}},$}(e7);Q9(l8.prototype,{_lock:0,_hasPause:0,_forcing:0});var f4=function($,Q,Z,K,W,X,Y){var H=new r8(this._pt,$,Q,0,1,K5,null,W),q=0,U=0,F,V,G,N,E,O,D,R;if(H.b=Z,H.e=K,Z+="",K+="",D=~K.indexOf("random("))K=N7(K);if(X)R=[Z,K],X(R,$,Q),Z=R[0],K=R[1];V=Z.match(MZ)||[];while(F=MZ.exec(K)){if(N=F[0],E=K.substring(q,F.index),G)G=(G+1)%5;else if(E.substr(-5)==="rgba(")G=1;if(N!==V[U++])O=parseFloat(V[U-1])||0,H._pt={_next:H._pt,p:E||U===1?E:",",s:O,c:N.charAt(1)==="="?PJ(O,N)-O:parseFloat(N)-O,m:G&&G<4?Math.round:0},q=MZ.lastIndex}if(H.c=q<K.length?K.substring(q,K.length):"",H.fp=Y,cZ.test(K)||D)H.e=0;return this._pt=H,H},J5=function($,Q,Z,K,W,X,Y,H,q,U){C8(K)&&(K=K(W||0,$,X));var F=$[Q],V=Z!=="get"?Z:!C8(F)?F:q?$[Q.indexOf("set")||!C8($["get"+Q.substr(3)])?Q:"get"+Q.substr(3)](q):$[Q](),G=!C8(F)?Z5:q?u4:$W,N;if(x8(K)){if(~K.indexOf("random("))K=N7(K);if(K.charAt(1)==="="){if(N=PJ(V,K)+(g8(V)||0),N||N===0)K=N}}if(!U||V!==K||mZ){if(!isNaN(V*K)&&K!=="")return N=new r8(this._pt,$,Q,+V||0,K-(V||0),typeof F==="boolean"?p4:QW,0,G),q&&(N.fp=q),Y&&N.modifier(Y,this,$),this._pt=N;return!F&&!(Q in $)&&qQ(Q,K),f4.call(this,$,Q,V,K,G,H||$9.stringFilter,q)}},h4=function($,Q,Z,K,W){if(C8($)&&($=i7($,W,Q,Z,K)),!_9($)||$.style&&$.nodeType||c8($)||wK($))return x8($)?i7($,W,Q,Z,K):$;var X={},Y;for(Y in $)X[Y]=i7($[Y],W,Q,Z,K);return X},$5=function($,Q,Z,K,W,X){var Y,H,q,U;if(t8[$]&&(Y=new t8[$]).init(W,Y.rawVars?Q[$]:h4(Q[$],K,W,X,Z),Z,K,X)!==!1){if(Z._pt=H=new r8(Z._pt,W,$,0,1,Y.render,Y,0,Y.priority),Z!==V7){q=Z._ptLookup[Z._targets.indexOf(W)],U=Y._props.length;while(U--)q[Y._props[U]]=H}}return Y},QJ,mZ,Q5=function J($,Q,Z){var K=$.vars,W=K.ease,X=K.startAt,Y=K.immediateRender,H=K.lazy,q=K.onUpdate,U=K.runBackwards,F=K.yoyoEase,V=K.keyframes,G=K.autoRevert,N=$._dur,E=$._startAt,O=$._targets,D=$.parent,R=D&&D.data==="nested"?D.vars.targets:O,B=$._overwrite==="auto"&&!dZ,z=$.timeline,C=K.easeReverse||F,L,A,_,I,k,b,s,a,x,v,m,o,p;if(z&&(!V||!W)&&(W="none"),$._ease=AJ(W,o7.ease),$._rEase=C&&(AJ(C)||$._ease),$._from=!z&&!!K.runBackwards,$._from)$.ratio=1;if(!z||V&&!K.stagger){if(a=O[0]?KJ(O[0]).harness:0,o=a&&K[a.prop],L=WQ(K,sZ),E)E._zTime<0&&E.progress(1),Q<0&&U&&Y&&!G?E.render(-1,!0):E.revert(U&&N?JQ:U4),E._lazy=0;if(X){if(WJ($._startAt=P8.set(O,Q9({data:"isStart",overwrite:!1,parent:D,immediateRender:!0,lazy:!E&&J9(H),startAt:null,delay:0,onUpdate:q&&function(){return H9($,"onUpdate")},stagger:0},X))),$._startAt._dp=0,$._startAt._sat=$,Q<0&&(v8||!Y&&!G)&&$._startAt.revert(JQ),Y){if(N&&Q<=0&&Z<=0){Q&&($._zTime=Q);return}}}else if(U&&N){if(!E){if(Q&&(Y=!1),_=Q9({overwrite:!1,data:"isFromStart",lazy:Y&&!E&&J9(H),immediateRender:Y,stagger:0,parent:D},L),o&&(_[a.prop]=o),WJ($._startAt=P8.set(O,_)),$._startAt._dp=0,$._startAt._sat=$,Q<0&&(v8?$._startAt.revert(JQ):$._startAt.render(-1,!0)),$._zTime=Q,!Y)J($._startAt,X8,X8);else if(!Q)return}}$._pt=$._ptCache=0,H=N&&J9(H)||H&&!N;for(A=0;A<O.length;A++){if(k=O[A],s=k._gsap||oZ(O)[A]._gsap,$._ptLookup[A]=v={},yZ[s.id]&&ZJ.length&&KQ(),m=R===O?A:R.indexOf(k),a&&(x=new a).init(k,o||L,$,m,R)!==!1)$._pt=I=new r8($._pt,k,x.name,0,1,x.render,x,0,x.priority),x._props.forEach(function(h){v[h]=I}),x.priority&&(b=1);if(!a||o)for(_ in L)if(t8[_]&&(x=$5(_,L,$,m,k,R)))x.priority&&(b=1);else v[_]=I=J5.call($,k,_,"get",L[_],m,R,0,K.stringFilter);if($._op&&$._op[A]&&$.kill(k,$._op[A]),B&&$._pt)QJ=$,z8.killTweensOf(k,v,$.globalTime(Q)),p=!$.parent,QJ=0;$._pt&&H&&(yZ[s.id]=1)}b&&Y5($),$._onInit&&$._onInit($)}$._onUpdate=q,$._initted=(!$._op||$._pt)&&!p,V&&Q<=0&&z.render(D9,!0,!0)},v4=function($,Q,Z,K,W,X,Y,H){var q=($._pt&&$._ptCache||($._ptCache={}))[Q],U,F,V,G;if(!q){q=$._ptCache[Q]=[],V=$._ptLookup,G=$._targets.length;while(G--){if(U=V[G][Q],U&&U.d&&U.d._pt){U=U.d._pt;while(U&&U.p!==Q&&U.fp!==Q)U=U._next}if(!U)return mZ=1,$.vars[Q]="+=0",Q5($,Y),mZ=0,H?r7(Q+" not eligible for reset. Try splitting into individual properties"):1;q.push(U)}}G=q.length;while(G--)F=q[G],U=F._pt||F,U.s=(K||K===0)&&!W?K:U.s+(K||0)+X*U.c,U.c=Z-U.s,F.e&&(F.e=A8(Z)+g8(F.e)),F.b&&(F.b=U.s+g8(F.b))},g4=function($,Q){var Z=$[0]?KJ($[0]).harness:0,K=Z&&Z.aliases,W,X,Y,H;if(!K)return Q;W=G7({},Q);for(X in K)if(X in W){H=K[X].split(","),Y=H.length;while(Y--)W[H[Y]]=W[X]}return W},m4=function($,Q,Z,K){var W=Q.ease||K||"power1.inOut",X,Y;if(c8(Q))Y=Z[$]||(Z[$]=[]),Q.forEach(function(H,q){return Y.push({t:q/(Q.length-1)*100,v:H,e:W})});else for(X in Q)Y=Z[X]||(Z[X]=[]),X==="ease"||Y.push({t:parseFloat($),v:Q[X],e:W})},i7=function($,Q,Z,K,W){return C8($)?$.call(Q,Z,K,W):x8($)&&~$.indexOf("random(")?N7($):$},eK=iZ+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",JW={};o8(eK+",id,stagger,delay,duration,paused,scrollTrigger",function(J){return JW[J]=1});var P8=function(J){PK($,J);function $(Z,K,W,X){var Y;if(typeof K==="number")W.duration=K,K=W,W=null;Y=J.call(this,X?K:n7(K))||this;var H=Y.vars,q=H.duration,U=H.delay,F=H.immediateRender,V=H.stagger,G=H.overwrite,N=H.keyframes,E=H.defaults,O=H.scrollTrigger,D=K.parent||z8,R=(c8(Z)||wK(Z)?n9(Z[0]):("length"in K))?[Z]:E9(Z),B,z,C,L,A,_,I,k;if(Y._targets=R.length?oZ(R):r7("GSAP target "+Z+" not found. https://gsap.com",!$9.nullTargetWarn)||[],Y._ptLookup=[],Y._overwrite=G,N||V||e$(q)||e$(U)){K=Y.vars;var b=K.easeReverse||K.yoyoEase;if(B=Y.timeline=new l8({data:"nested",defaults:E||{},targets:D&&D.data==="nested"?D.vars.targets:R}),B.kill(),B.parent=B._dp=l9(Y),B._start=0,V||e$(q)||e$(U)){if(L=R.length,I=V&&pK(V),_9(V)){for(A in V)if(~eK.indexOf(A))k||(k={}),k[A]=V[A]}for(z=0;z<L;z++){if(C=WQ(K,JW),C.stagger=0,b&&(C.easeReverse=b),k&&G7(C,k),_=R[z],C.duration=+i7(q,l9(Y),z,_,R),C.delay=(+i7(U,l9(Y),z,_,R)||0)-Y._delay,!V&&L===1&&C.delay)Y._delay=U=C.delay,Y._start+=U,C.delay=0;B.to(_,C,I?I(z,_,R):0),B._ease=e0.none}B.duration()?q=U=0:Y.timeline=0}else if(N){n7(Q9(B.vars.defaults,{ease:"none"})),B._ease=AJ(N.ease||K.ease||"none");var s=0,a,x,v;if(c8(N))N.forEach(function(m){return B.to(R,m,">")}),B.duration();else{C={};for(A in N)A==="ease"||A==="easeEach"||m4(A,N[A],C,N.easeEach);for(A in C){a=C[A].sort(function(m,o){return m.t-o.t}),s=0;for(z=0;z<a.length;z++)x=a[z],v={ease:x.e,duration:(x.t-(z?a[z-1].t:0))/100*q},v[A]=x.v,B.to(R,v,s),s+=v.duration}B.duration()<q&&B.to({},{duration:q-B.duration()})}}q||Y.duration(q=B.duration())}else Y.timeline=0;if(G===!0&&!dZ)QJ=l9(Y),z8.killTweensOf(R),QJ=0;if(w9(D,l9(Y),W),K.reversed&&Y.reverse(),K.paused&&Y.paused(!0),F||!q&&!N&&Y._start===B8(D._time)&&J9(F)&&E4(l9(Y))&&D.data!=="nested")Y._tTime=-X8,Y.render(Math.max(0,-U)||0);return O&&gK(l9(Y),O),Y}var Q=$.prototype;return Q.render=function(K,W,X){var Y=this._time,H=this._tDur,q=this._dur,U=K<0,F=K>H-X8&&!U?H:K<X8?0:K,V,G,N,E,O,D,R,B;if(!q)R4(this,K,W,X);else if(F!==this._tTime||!K||X||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==U||this._lazy){if(V=F,B=this.timeline,this._repeat){if(E=q+this._rDelay,this._repeat<-1&&U)return this.totalTime(E*100+K,W,X);if(V=B8(F%E),F===H)N=this._repeat,V=q;else if(O=B8(F/E),N=~~O,N&&N===O)V=q,N--;else if(V>q)V=q;if(D=this._yoyo&&N&1,D)V=q-V;if(O=O7(this._tTime,E),V===Y&&!X&&this._initted&&N===O)return this._tTime=F,this;if(N!==O){if(this.vars.repeatRefresh&&!D&&!this._lock&&V!==E&&this._initted)this._lock=X=1,this.render(B8(E*N),!0).invalidate()._lock=0}}if(!this._initted){if(mK(this,U?K:V,X,W,F))return this._tTime=0,this;if(Y!==this._time&&!(X&&this.vars.repeatRefresh&&N!==O))return this;if(q!==this._dur)return this.render(K,W,X)}if(this._rEase){var z=V<Y;if(z!==this._inv){var C=z?Y:q-Y;if(this._inv=z,this._from)this.ratio=1-this.ratio;this._invRatio=this.ratio,this._invTime=Y,this._invRecip=C?(z?-1:1)/C:0,this._invScale=z?-this.ratio:1-this.ratio,this._invEase=z?this._rEase:this._ease}this.ratio=R=this._invRatio+this._invScale*this._invEase((V-this._invTime)*this._invRecip)}else this.ratio=R=this._ease(V/q);if(this._from)this.ratio=R=1-R;if(this._tTime=F,this._time=V,!this._act&&this._ts)this._act=1,this._lazy=0;if(!Y&&F&&!W&&!O){if(H9(this,"onStart"),this._tTime!==F)return this}G=this._pt;while(G)G.r(R,G.d),G=G._next;if(B&&B.render(K<0?K:B._dur*B._ease(V/this._dur),W,X)||this._startAt&&(this._zTime=K),this._onUpdate&&!W)U&&bZ(this,K,W,X),H9(this,"onUpdate");if(this._repeat&&N!==O&&this.vars.onRepeat&&!W&&this.parent&&H9(this,"onRepeat"),(F===this._tDur||!F)&&this._tTime===F){if(U&&!this._onUpdate&&bZ(this,K,!0,!0),(K||!q)&&(F===this._tDur&&this._ts>0||!F&&this._ts<0)&&WJ(this,1),!W&&!(U&&!Y)&&(F||Y||D))H9(this,F===H?"onComplete":"onReverseComplete",!0),this._prom&&!(F<H&&this.timeScale()>0)&&this._prom()}}return this},Q.targets=function(){return this._targets},Q.invalidate=function(K){return(!K||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(K),J.prototype.invalidate.call(this,K)},Q.resetTo=function(K,W,X,Y,H){t7||e8.wake(),this._ts||this.play();var q=Math.min(this._dur,(this._dp._time-this._start)*this._ts),U;if(this._initted||Q5(this,q),U=this._ease(q/this._dur),v4(this,K,W,X,Y,U,q,H))return this.resetTo(K,W,X,Y,1);return FQ(this,0),this.parent||hK(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0)},Q.kill=function(K,W){if(W===void 0)W="all";if(!K&&(!W||W==="all"))return this._lazy=this._pt=0,this.parent?l7(this):this.scrollTrigger&&this.scrollTrigger.kill(!!v8),this;if(this.timeline){var X=this.timeline.totalDuration();return this.timeline.killTweensOf(K,W,QJ&&QJ.vars.overwrite!==!0)._first||l7(this),this.parent&&X!==this.timeline.totalDuration()&&D7(this,this._dur*this.timeline._tDur/X,0,1),this}var Y=this._targets,H=K?E9(K):Y,q=this._ptLookup,U=this._pt,F,V,G,N,E,O,D;if((!W||W==="all")&&O4(Y,H))return W==="all"&&(this._pt=0),l7(this);if(F=this._op=this._op||[],W!=="all"){if(x8(W))E={},o8(W,function(R){return E[R]=1}),W=E;W=g4(Y,W)}D=Y.length;while(D--)if(~H.indexOf(Y[D])){if(V=q[D],W==="all")F[D]=W,N=V,G={};else G=F[D]=F[D]||{},N=W;for(E in N){if(O=V&&V[E],O){if(!("kill"in O.d)||O.d.kill(E)===!0)J$(this,O,"_pt");delete V[E]}if(G!=="all")G[E]=1}}return this._initted&&!this._pt&&U&&l7(this),this},$.to=function(K,W){return new $(K,W,arguments[2])},$.from=function(K,W){return s7(1,arguments)},$.delayedCall=function(K,W,X,Y){return new $(W,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:K,onComplete:W,onReverseComplete:W,onCompleteParams:X,onReverseCompleteParams:X,callbackScope:Y})},$.fromTo=function(K,W,X){return s7(2,arguments)},$.set=function(K,W){return W.duration=0,W.repeatDelay||(W.repeat=0),new $(K,W)},$.killTweensOf=function(K,W,X){return z8.killTweensOf(K,W,X)},$}(e7);Q9(P8.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});o8("staggerTo,staggerFrom,staggerFromTo",function(J){P8[J]=function(){var $=new l8,Q=hZ.call(arguments,0);return Q.splice(J==="staggerFromTo"?5:4,0,0),$[J].apply($,Q)}});var Z5=function($,Q,Z){return $[Q]=Z},$W=function($,Q,Z){return $[Q](Z)},u4=function($,Q,Z,K){return $[Q](K.fp,Z)},d4=function($,Q,Z){return $.setAttribute(Q,Z)},VQ=function($,Q){return C8($[Q])?$W:HQ($[Q])&&$.setAttribute?d4:Z5},QW=function($,Q){return Q.set(Q.t,Q.p,Math.round((Q.s+Q.c*$)*1e6)/1e6,Q)},p4=function($,Q){return Q.set(Q.t,Q.p,!!(Q.s+Q.c*$),Q)},K5=function($,Q){var Z=Q._pt,K="";if(!$&&Q.b)K=Q.b;else if($===1&&Q.e)K=Q.e;else{while(Z)K=Z.p+(Z.m?Z.m(Z.s+Z.c*$):Math.round((Z.s+Z.c*$)*1e4)/1e4)+K,Z=Z._next;K+=Q.c}Q.set(Q.t,Q.p,K,Q)},W5=function($,Q){var Z=Q._pt;while(Z)Z.r($,Z.d),Z=Z._next},l4=function($,Q,Z,K){var W=this._pt,X;while(W)X=W._next,W.p===K&&W.modifier($,Q,Z),W=X},c4=function($){var Q=this._pt,Z,K;while(Q){if(K=Q._next,Q.p===$&&!Q.op||Q.op===$)J$(this,Q,"_pt");else if(!Q.dep)Z=1;Q=K}return!Z},n4=function($,Q,Z,K){K.mSet($,Q,K.m.call(K.tween,Z,K.mt),K)},Y5=function($){var Q=$._pt,Z,K,W,X;while(Q){Z=Q._next,K=W;while(K&&K.pr>Q.pr)K=K._next;if(Q._prev=K?K._prev:X)Q._prev._next=Q;else W=Q;if(Q._next=K)K._prev=Q;else X=Q;Q=Z}$._pt=W},r8=function(){function J(Q,Z,K,W,X,Y,H,q,U){if(this.t=Z,this.s=W,this.c=X,this.p=K,this.r=Y||QW,this.d=H||this,this.set=q||Z5,this.pr=U||0,this._next=Q,Q)Q._prev=this}var $=J.prototype;return $.modifier=function(Z,K,W){this.mSet=this.mSet||this.set,this.set=n4,this.m=Z,this.mt=W,this.tween=K},J}();o8(iZ+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(J){return sZ[J]=1});q9.TweenMax=q9.TweenLite=P8;q9.TimelineLite=q9.TimelineMax=l8;z8=new l8({sortChildren:!1,defaults:o7,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});$9.stringFilter=tZ;var MJ=[],QQ={},s4=[],kK=0,i4=0,_Z=function($){return(QQ[$]||s4).map(function(Q){return Q()})},uZ=function(){var $=Date.now(),Q=[];if($-kK>2)_Z("matchMediaInit"),MJ.forEach(function(Z){var{queries:K,conditions:W}=Z,X,Y,H,q;for(Y in K)if(X=S9.matchMedia(K[Y]).matches,X&&(H=1),X!==W[Y])W[Y]=X,q=1;if(q)Z.revert(),H&&Q.push(Z)}),_Z("matchMediaRevert"),Q.forEach(function(Z){return Z.onMatch(Z,function(K){return Z.add(null,K)})}),kK=$,_Z("matchMedia")},ZW=function(){function J(Q,Z){this.selector=Z&&vZ(Z),this.data=[],this._r=[],this.isReverted=!1,this.id=i4++,Q&&this.add(Q)}var $=J.prototype;return $.add=function(Z,K,W){if(C8(Z))W=K,K=Z,Z=C8;var X=this,Y=function(){var q=N8,U=X.selector,F;return q&&q!==X&&q.data.push(X),W&&(X.selector=vZ(W)),N8=X,F=K.apply(X,arguments),C8(F)&&X._r.push(F),N8=q,X.selector=U,X.isReverted=!1,F};return X.last=Y,Z===C8?Y(X,function(H){return X.add(null,H)}):Z?X[Z]=Y:Y},$.ignore=function(Z){var K=N8;N8=null,Z(this),N8=K},$.getTweens=function(){var Z=[];return this.data.forEach(function(K){return K instanceof J?Z.push.apply(Z,K.getTweens()):K instanceof P8&&!(K.parent&&K.parent.data==="nested")&&Z.push(K)}),Z},$.clear=function(){this._r.length=this.data.length=0},$.kill=function(Z,K){var W=this;if(Z)(function(){var Y=W.getTweens(),H=W.data.length,q;while(H--)if(q=W.data[H],q.data==="isFlip")q.revert(),q.getChildren(!0,!0,!1).forEach(function(U){return Y.splice(Y.indexOf(U),1)});Y.map(function(U){return{g:U._dur||U._delay||U._sat&&!U._sat.vars.immediateRender?U.globalTime(0):-1/0,t:U}}).sort(function(U,F){return F.g-U.g||-1/0}).forEach(function(U){return U.t.revert(Z)}),H=W.data.length;while(H--)if(q=W.data[H],q instanceof l8){if(q.data!=="nested")q.scrollTrigger&&q.scrollTrigger.revert(),q.kill()}else!(q instanceof P8)&&q.revert&&q.revert(Z);W._r.forEach(function(U){return U(Z,W)}),W.isReverted=!0})();else this.data.forEach(function(Y){return Y.kill&&Y.kill()});if(this.clear(),K){var X=MJ.length;while(X--)MJ[X].id===this.id&&MJ.splice(X,1)}},$.revert=function(Z){this.kill(Z||{})},J}(),o4=function(){function J(Q){this.contexts=[],this.scope=Q,N8&&N8.data.push(this)}var $=J.prototype;return $.add=function(Z,K,W){_9(Z)||(Z={matches:Z});var X=new ZW(0,W||this.scope),Y=X.conditions={},H,q,U;N8&&!X.selector&&(X.selector=N8.selector),this.contexts.push(X),K=X.add("onMatch",K),X.queries=Z;for(q in Z)if(q==="all")U=1;else if(H=S9.matchMedia(Z[q]),H)MJ.indexOf(X)<0&&MJ.push(X),(Y[q]=H.matches)&&(U=1),H.addListener?H.addListener(uZ):H.addEventListener("change",uZ);return U&&K(X,function(F){return X.add(null,F)}),this},$.revert=function(Z){this.kill(Z||{})},$.kill=function(Z){this.contexts.forEach(function(K){return K.kill(Z,!0)})},J}(),XQ={registerPlugin:function(){for(var $=arguments.length,Q=Array($),Z=0;Z<$;Z++)Q[Z]=arguments[Z];Q.forEach(function(K){return oK(K)})},timeline:function($){return new l8($)},getTweensOf:function($,Q){return z8.getTweensOf($,Q)},getProperty:function($,Q,Z,K){x8($)&&($=E9($)[0]);var W=KJ($||{}).get,X=Z?fK:bK;return Z==="native"&&(Z=""),!$?$:!Q?function(Y,H,q){return X((t8[Y]&&t8[Y].get||W)($,Y,H,q))}:X((t8[Q]&&t8[Q].get||W)($,Q,Z,K))},quickSetter:function($,Q,Z){if($=E9($),$.length>1){var K=$.map(function(U){return n8.quickSetter(U,Q,Z)}),W=K.length;return function(U){var F=W;while(F--)K[F](U)}}$=$[0]||{};var X=t8[Q],Y=KJ($),H=Y.harness&&(Y.harness.aliases||{})[Q]||Q,q=X?function(U){var F=new X;V7._pt=0,F.init($,Z?U+Z:U,V7,0,[$]),F.render(1,F),V7._pt&&W5(1,V7)}:Y.set($,H);return X?q:function(U){return q($,H,Z?U+Z:U,Y,1)}},quickTo:function($,Q,Z){var K,W=n8.to($,Q9((K={},K[Q]="+=0.1",K.paused=!0,K.stagger=0,K),Z||{})),X=function(H,q,U){return W.resetTo(Q,H,q,U)};return X.tween=W,X},isTweening:function($){return z8.getTweensOf($,!0).length>0},defaults:function($){return $&&$.ease&&($.ease=AJ($.ease,o7.ease)),IK(o7,$||{})},config:function($){return IK($9,$||{})},registerEffect:function($){var{name:Q,effect:Z,plugins:K,defaults:W,extendTimeline:X}=$;if((K||"").split(",").forEach(function(Y){return Y&&!t8[Y]&&!q9[Y]&&r7(Q+" effect requires "+Y+" plugin.")}),kZ[Q]=function(Y,H,q){return Z(E9(Y),Q9(H||{},W),q)},X)l8.prototype[Q]=function(Y,H,q){return this.add(kZ[Q](Y,_9(H)?H:(q=H)&&{},this),q)}},registerEase:function($,Q){e0[$]=AJ(Q)},parseEase:function($,Q){return arguments.length?AJ($,Q):e0},getById:function($){return z8.getById($)},exportRoot:function($,Q){if($===void 0)$={};var Z=new l8($),K,W;Z.smoothChildTiming=J9($.smoothChildTiming),z8.remove(Z),Z._dp=0,Z._time=Z._tTime=z8._time,K=z8._first;while(K){if(W=K._next,Q||!(!K._dur&&K instanceof P8&&K.vars.onComplete===K._targets[0]))w9(Z,K,K._start-K._delay);K=W}return w9(z8,Z,0),Z},context:function($,Q){return $?new ZW($,Q):N8},matchMedia:function($){return new o4($)},matchMediaRefresh:function(){return MJ.forEach(function($){var Q=$.conditions,Z,K;for(K in Q)if(Q[K])Q[K]=!1,Z=1;Z&&$.revert()})||uZ()},addEventListener:function($,Q){var Z=QQ[$]||(QQ[$]=[]);~Z.indexOf(Q)||Z.push(Q)},removeEventListener:function($,Q){var Z=QQ[$],K=Z&&Z.indexOf(Q);K>=0&&Z.splice(K,1)},utils:{wrap:k4,wrapYoyo:P4,distribute:pK,random:cK,snap:lK,normalize:M4,getUnit:g8,clamp:I4,splitColor:rK,toArray:E9,selector:vZ,mapRange:sK,pipe:C4,unitize:A4,interpolate:S4,shuffle:dK},install:TK,effects:kZ,ticker:e8,updateRoot:l8.updateRoot,plugins:t8,globalTimeline:z8,core:{PropTween:r8,globals:jK,Tween:P8,Timeline:l8,Animation:e7,getCache:KJ,_removeLinkedListItem:J$,reverting:function(){return v8},context:function($){if($&&N8)N8.data.push($),$._ctx=N8;return N8},suppressOverwrites:function($){return dZ=$}}};o8("to,from,fromTo,delayedCall,set,killTweensOf",function(J){return XQ[J]=P8[J]});e8.add(l8.updateRoot);V7=XQ.to({},{duration:0});var r4=function($,Q){var Z=$._pt;while(Z&&Z.p!==Q&&Z.op!==Q&&Z.fp!==Q)Z=Z._next;return Z},a4=function($,Q){var Z=$._targets,K,W,X;for(K in Q){W=Z.length;while(W--)if(X=$._ptLookup[W][K],X&&(X=X.d)){if(X._pt)X=r4(X,K);X&&X.modifier&&X.modifier(Q[K],$,Z[W],K)}}},TZ=function($,Q){return{name:$,headless:1,rawVars:1,init:function(K,W,X){X._onInit=function(Y){var H,q;if(x8(W))H={},o8(W,function(U){return H[U]=1}),W=H;if(Q){H={};for(q in W)H[q]=Q(W[q]);W=H}a4(Y,W)}}}},n8=XQ.registerPlugin({name:"attr",init:function($,Q,Z,K,W){var X,Y,H;this.tween=Z;for(X in Q)H=$.getAttribute(X)||"",Y=this.add($,"setAttribute",(H||0)+"",Q[X],K,W,0,0,X),Y.op=X,Y.b=H,this._props.push(X)},render:function($,Q){var Z=Q._pt;while(Z)v8?Z.set(Z.t,Z.p,Z.b,Z):Z.r($,Z.d),Z=Z._next}},{name:"endArray",headless:1,init:function($,Q){var Z=Q.length;while(Z--)this.add($,Z,$[Z]||0,Q[Z],0,0,0,0,0,1)}},TZ("roundProps",gZ),TZ("modifiers"),TZ("snap",lK))||XQ;P8.version=l8.version=n8.version="3.15.0";_K=1;pZ()&&E7();var{Power0:t4,Power1:e4,Power2:JU,Power3:$U,Power4:QU,Linear:ZU,Quad:KU,Cubic:WU,Quart:YU,Quint:XU,Strong:HU,Elastic:qU,Back:UU,SteppedEase:FU,Bounce:VU,Sine:GU,Expo:OU,Circ:DU}=e0;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var KW,XJ,B7,V5,jJ,EU,WW,G5,NU=function(){return typeof window<"u"},i9={},TJ=180/Math.PI,z7=Math.PI/180,R7=Math.atan2,YW=1e8,O5=/([A-Z])/g,RU=/(left|right|width|margin|padding|x)/i,BU=/[\s,\(]\S/,T9={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},H5=function($,Q){return Q.set(Q.t,Q.p,Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u,Q)},zU=function($,Q){return Q.set(Q.t,Q.p,$===1?Q.e:Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u,Q)},IU=function($,Q){return Q.set(Q.t,Q.p,$?Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u:Q.b,Q)},LU=function($,Q){return Q.set(Q.t,Q.p,$===1?Q.e:$?Math.round((Q.s+Q.c*$)*1e4)/1e4+Q.u:Q.b,Q)},CU=function($,Q){var Z=Q.s+Q.c*$;Q.set(Q.t,Q.p,~~(Z+(Z<0?-0.5:0.5))+Q.u,Q)},OW=function($,Q){return Q.set(Q.t,Q.p,$?Q.e:Q.b,Q)},DW=function($,Q){return Q.set(Q.t,Q.p,$!==1?Q.b:Q.e,Q)},AU=function($,Q,Z){return $.style[Q]=Z},MU=function($,Q,Z){return $.style.setProperty(Q,Z)},kU=function($,Q,Z){return $._gsap[Q]=Z},PU=function($,Q,Z){return $._gsap.scaleX=$._gsap.scaleY=Z},SU=function($,Q,Z,K,W){var X=$._gsap;X.scaleX=X.scaleY=Z,X.renderTransform(W,X)},wU=function($,Q,Z,K,W){var X=$._gsap;X[Q]=Z,X.renderTransform(W,X)},I8="transform",Z9=I8+"Origin",_U=function J($,Q){var Z=this,K=this.target,W=K.style,X=K._gsap;if($ in i9&&W){if(this.tfm=this.tfm||{},$!=="transform")$=T9[$]||$,~$.indexOf(",")?$.split(",").forEach(function(Y){return Z.tfm[Y]=s9(K,Y)}):this.tfm[$]=X.x?X[$]:s9(K,$),$===Z9&&(this.tfm.zOrigin=X.zOrigin);else return T9.transform.split(",").forEach(function(Y){return J.call(Z,Y,Q)});if(this.props.indexOf(I8)>=0)return;if(X.svg)this.svgo=K.getAttribute("data-svg-origin"),this.props.push(Z9,Q,"");$=I8}(W||Q)&&this.props.push($,Q,W[$])},EW=function($){if($.translate)$.removeProperty("translate"),$.removeProperty("scale"),$.removeProperty("rotate")},TU=function(){var $=this.props,Q=this.target,Z=Q.style,K=Q._gsap,W,X;for(W=0;W<$.length;W+=3)if(!$[W+1])$[W+2]?Z[$[W]]=$[W+2]:Z.removeProperty($[W].substr(0,2)==="--"?$[W]:$[W].replace(O5,"-$1").toLowerCase());else if($[W+1]===2)Q[$[W]]($[W+2]);else Q[$[W]]=$[W+2];if(this.tfm){for(X in this.tfm)K[X]=this.tfm[X];if(K.svg)K.renderTransform(),Q.setAttribute("data-svg-origin",this.svgo||"");if(W=G5(),(!W||!W.isStart)&&!Z[I8]){if(EW(Z),K.zOrigin&&Z[Z9])Z[Z9]+=" "+K.zOrigin+"px",K.zOrigin=0,K.renderTransform();K.uncache=1}}},NW=function($,Q){var Z={target:$,props:[],revert:TU,save:_U};return $._gsap||n8.core.getCache($),Q&&$.style&&$.nodeType&&Q.split(",").forEach(function(K){return Z.save(K)}),Z},RW,q5=function($,Q){var Z=XJ.createElementNS?XJ.createElementNS((Q||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),$):XJ.createElement($);return Z&&Z.style?Z:XJ.createElement($)},U9=function J($,Q,Z){var K=getComputedStyle($);return K[Q]||K.getPropertyValue(Q.replace(O5,"-$1").toLowerCase())||K.getPropertyValue(Q)||!Z&&J($,I7(Q)||Q,1)||""},XW="O,Moz,ms,Ms,Webkit".split(","),I7=function($,Q,Z){var K=Q||jJ,W=K.style,X=5;if($ in W&&!Z)return $;$=$.charAt(0).toUpperCase()+$.substr(1);while(X--&&!(XW[X]+$ in W));return X<0?null:(X===3?"ms":X>=0?XW[X]:"")+$},U5=function(){if(NU()&&window.document)KW=window,XJ=KW.document,B7=XJ.documentElement,jJ=q5("div")||{style:{}},EU=q5("div"),I8=I7(I8),Z9=I8+"Origin",jJ.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",RW=!!I7("perspective"),G5=n8.core.reverting,V5=1},HW=function($){var Q=$.ownerSVGElement,Z=q5("svg",Q&&Q.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),K=$.cloneNode(!0),W;K.style.display="block",Z.appendChild(K),B7.appendChild(Z);try{W=K.getBBox()}catch(X){}return Z.removeChild(K),B7.removeChild(Z),W},qW=function($,Q){var Z=Q.length;while(Z--)if($.hasAttribute(Q[Z]))return $.getAttribute(Q[Z])},BW=function($){var Q,Z;try{Q=$.getBBox()}catch(K){Q=HW($),Z=1}return Q&&(Q.width||Q.height)||Z||(Q=HW($)),Q&&!Q.width&&!Q.x&&!Q.y?{x:+qW($,["x","cx","x1"])||0,y:+qW($,["y","cy","y1"])||0,width:0,height:0}:Q},zW=function($){return!!($.getCTM&&(!$.parentNode||$.ownerSVGElement)&&BW($))},qJ=function($,Q){if(Q){var Z=$.style,K;if(Q in i9&&Q!==Z9)Q=I8;if(Z.removeProperty){if(K=Q.substr(0,2),K==="ms"||Q.substr(0,6)==="webkit")Q="-"+Q;Z.removeProperty(K==="--"?Q:Q.replace(O5,"-$1").toLowerCase())}else Z.removeAttribute(Q)}},HJ=function($,Q,Z,K,W,X){var Y=new r8($._pt,Q,Z,0,1,X?DW:OW);return $._pt=Y,Y.b=K,Y.e=W,$._props.push(Z),Y},UW={deg:1,rad:1,turn:1},jU={grid:1,flex:1},UJ=function J($,Q,Z,K){var W=parseFloat(Z)||0,X=(Z+"").trim().substr((W+"").length)||"px",Y=jJ.style,H=RU.test(Q),q=$.tagName.toLowerCase()==="svg",U=(q?"client":"offset")+(H?"Width":"Height"),F=100,V=K==="px",G=K==="%",N,E,O,D;if(K===X||!W||UW[K]||UW[X])return W;if(X!=="px"&&!V&&(W=J($,Q,Z,"px")),D=$.getCTM&&zW($),(G||X==="%")&&(i9[Q]||~Q.indexOf("adius")))return N=D?$.getBBox()[H?"width":"height"]:$[U],A8(G?W/N*F:W/100*N);if(Y[H?"width":"height"]=F+(V?X:K),E=K!=="rem"&&~Q.indexOf("adius")||K==="em"&&$.appendChild&&!q?$:$.parentNode,D)E=($.ownerSVGElement||{}).parentNode;if(!E||E===XJ||!E.appendChild)E=XJ.body;if(O=E._gsap,O&&G&&O.width&&H&&O.time===e8.time&&!O.uncache)return A8(W/O.width*F);else{if(G&&(Q==="height"||Q==="width")){var R=$.style[Q];$.style[Q]=F+K,N=$[U],R?$.style[Q]=R:qJ($,Q)}else(G||X==="%")&&!jU[U9(E,"display")]&&(Y.position=U9($,"position")),E===$&&(Y.position="static"),E.appendChild(jJ),N=jJ[U],E.removeChild(jJ),Y.position="absolute";if(H&&G)O=KJ(E),O.time=e8.time,O.width=E[U]}return A8(V?N*W/F:N&&W?F/N*W:0)},s9=function($,Q,Z,K){var W;if(V5||U5(),Q in T9&&Q!=="transform"){if(Q=T9[Q],~Q.indexOf(","))Q=Q.split(",")[0]}if(i9[Q]&&Q!=="transform")W=K$($,K),W=Q!=="transformOrigin"?W[Q]:W.svg?W.origin:OQ(U9($,Z9))+" "+W.zOrigin+"px";else if(W=$.style[Q],!W||W==="auto"||K||~(W+"").indexOf("calc("))W=GQ[Q]&&GQ[Q]($,Q,Z)||U9($,Q)||rZ($,Q)||(Q==="opacity"?1:0);return Z&&!~(W+"").trim().indexOf(" ")?UJ($,Q,W,Z)+Z:W},xU=function($,Q,Z,K){if(!Z||Z==="none"){var W=I7(Q,$,1),X=W&&U9($,W,1);if(X&&X!==Z)Q=W,Z=X;else if(Q==="borderColor")Z=U9($,"borderTopColor")}var Y=new r8(this._pt,$.style,Q,0,1,K5),H=0,q=0,U,F,V,G,N,E,O,D,R,B,z,C;if(Y.b=Z,Y.e=K,Z+="",K+="",K.substring(0,6)==="var(--")K=U9($,K.substring(4,K.indexOf(")")));if(K==="auto")E=$.style[Q],$.style[Q]=K,K=U9($,Q)||K,E?$.style[Q]=E:qJ($,Q);if(U=[Z,K],tZ(U),Z=U[0],K=U[1],V=Z.match(kJ)||[],C=K.match(kJ)||[],C.length){while(F=kJ.exec(K)){if(O=F[0],R=K.substring(H,F.index),N)N=(N+1)%5;else if(R.substr(-5)==="rgba("||R.substr(-5)==="hsla(")N=1;if(O!==(E=V[q++]||"")){if(G=parseFloat(E)||0,z=E.substr((G+"").length),O.charAt(1)==="="&&(O=PJ(G,O)+z),D=parseFloat(O),B=O.substr((D+"").length),H=kJ.lastIndex-B.length,!B){if(B=B||$9.units[Q]||z,H===K.length)K+=B,Y.e+=B}if(z!==B)G=UJ($,Q,E,B)||0;Y._pt={_next:Y._pt,p:R||q===1?R:",",s:G,c:D-G,m:N&&N<4||Q==="zIndex"?Math.round:0}}}Y.c=H<K.length?K.substring(H,K.length):""}else Y.r=Q==="display"&&K==="none"?DW:OW;return cZ.test(K)&&(Y.e=0),this._pt=Y,Y},FW={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},yU=function($){var Q=$.split(" "),Z=Q[0],K=Q[1]||"50%";if(Z==="top"||Z==="bottom"||K==="left"||K==="right")$=Z,Z=K,K=$;return Q[0]=FW[Z]||Z,Q[1]=FW[K]||K,Q.join(" ")},bU=function($,Q){if(Q.tween&&Q.tween._time===Q.tween._dur){var Z=Q.t,K=Z.style,W=Q.u,X=Z._gsap,Y,H,q;if(W==="all"||W===!0)K.cssText="",H=1;else{W=W.split(","),q=W.length;while(--q>-1){if(Y=W[q],i9[Y])H=1,Y=Y==="transformOrigin"?Z9:I8;qJ(Z,Y)}}if(H){if(qJ(Z,I8),X)X.svg&&Z.removeAttribute("transform"),K.scale=K.rotate=K.translate="none",K$(Z,1),X.uncache=1,EW(K)}}},GQ={clearProps:function($,Q,Z,K,W){if(W.data!=="isFromStart"){var X=$._pt=new r8($._pt,Q,Z,0,0,bU);return X.u=K,X.pr=-10,X.tween=W,$._props.push(Z),1}}},Z$=[1,0,0,1,0,0],IW={},LW=function($){return $==="matrix(1, 0, 0, 1, 0, 0)"||$==="none"||!$},VW=function($){var Q=U9($,I8);return LW(Q)?Z$:Q.substr(7).match(lZ).map(A8)},D5=function($,Q){var Z=$._gsap||KJ($),K=$.style,W=VW($),X,Y,H,q;if(Z.svg&&$.getAttribute("transform"))return H=$.transform.baseVal.consolidate().matrix,W=[H.a,H.b,H.c,H.d,H.e,H.f],W.join(",")==="1,0,0,1,0,0"?Z$:W;else if(W===Z$&&!$.offsetParent&&$!==B7&&!Z.svg){if(H=K.display,K.display="block",X=$.parentNode,!X||!$.offsetParent&&!$.getBoundingClientRect().width)q=1,Y=$.nextElementSibling,B7.appendChild($);if(W=VW($),H?K.display=H:qJ($,"display"),q)Y?X.insertBefore($,Y):X?X.appendChild($):B7.removeChild($)}return Q&&W.length>6?[W[0],W[1],W[4],W[5],W[12],W[13]]:W},F5=function($,Q,Z,K,W,X){var Y=$._gsap,H=W||D5($,!0),q=Y.xOrigin||0,U=Y.yOrigin||0,F=Y.xOffset||0,V=Y.yOffset||0,G=H[0],N=H[1],E=H[2],O=H[3],D=H[4],R=H[5],B=Q.split(" "),z=parseFloat(B[0])||0,C=parseFloat(B[1])||0,L,A,_,I;if(!Z)L=BW($),z=L.x+(~B[0].indexOf("%")?z/100*L.width:z),C=L.y+(~(B[1]||B[0]).indexOf("%")?C/100*L.height:C);else if(H!==Z$&&(A=G*O-N*E))_=z*(O/A)+C*(-E/A)+(E*R-O*D)/A,I=z*(-N/A)+C*(G/A)-(G*R-N*D)/A,z=_,C=I;if(K||K!==!1&&Y.smooth)D=z-q,R=C-U,Y.xOffset=F+(D*G+R*E)-D,Y.yOffset=V+(D*N+R*O)-R;else Y.xOffset=Y.yOffset=0;if(Y.xOrigin=z,Y.yOrigin=C,Y.smooth=!!K,Y.origin=Q,Y.originIsAbsolute=!!Z,$.style[Z9]="0px 0px",X)HJ(X,Y,"xOrigin",q,z),HJ(X,Y,"yOrigin",U,C),HJ(X,Y,"xOffset",F,Y.xOffset),HJ(X,Y,"yOffset",V,Y.yOffset);$.setAttribute("data-svg-origin",z+" "+C)},K$=function($,Q){var Z=$._gsap||new eZ($);if("x"in Z&&!Q&&!Z.uncache)return Z;var K=$.style,W=Z.scaleX<0,X="px",Y="deg",H=getComputedStyle($),q=U9($,Z9)||"0",U,F,V,G,N,E,O,D,R,B,z,C,L,A,_,I,k,b,s,a,x,v,m,o,p,h,c,J0,f,e,Z0,W0;if(U=F=V=E=O=D=R=B=z=0,G=N=1,Z.svg=!!($.getCTM&&zW($)),H.translate){if(H.translate!=="none"||H.scale!=="none"||H.rotate!=="none")K[I8]=(H.translate!=="none"?"translate3d("+(H.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(H.rotate!=="none"?"rotate("+H.rotate+") ":"")+(H.scale!=="none"?"scale("+H.scale.split(" ").join(",")+") ":"")+(H[I8]!=="none"?H[I8]:"");K.scale=K.rotate=K.translate="none"}if(A=D5($,Z.svg),Z.svg){if(Z.uncache)p=$.getBBox(),q=Z.xOrigin-p.x+"px "+(Z.yOrigin-p.y)+"px",o="";else o=!Q&&$.getAttribute("data-svg-origin");F5($,o||q,!!o||Z.originIsAbsolute,Z.smooth!==!1,A)}if(C=Z.xOrigin||0,L=Z.yOrigin||0,A!==Z$){if(b=A[0],s=A[1],a=A[2],x=A[3],U=v=A[4],F=m=A[5],A.length===6){if(G=Math.sqrt(b*b+s*s),N=Math.sqrt(x*x+a*a),E=b||s?R7(s,b)*TJ:0,R=a||x?R7(a,x)*TJ+E:0,R&&(N*=Math.abs(Math.cos(R*z7))),Z.svg)U-=C-(C*b+L*a),F-=L-(C*s+L*x)}else{if(W0=A[6],e=A[7],c=A[8],J0=A[9],f=A[10],Z0=A[11],U=A[12],F=A[13],V=A[14],_=R7(W0,f),O=_*TJ,_)I=Math.cos(-_),k=Math.sin(-_),o=v*I+c*k,p=m*I+J0*k,h=W0*I+f*k,c=v*-k+c*I,J0=m*-k+J0*I,f=W0*-k+f*I,Z0=e*-k+Z0*I,v=o,m=p,W0=h;if(_=R7(-a,f),D=_*TJ,_)I=Math.cos(-_),k=Math.sin(-_),o=b*I-c*k,p=s*I-J0*k,h=a*I-f*k,Z0=x*k+Z0*I,b=o,s=p,a=h;if(_=R7(s,b),E=_*TJ,_)I=Math.cos(_),k=Math.sin(_),o=b*I+s*k,p=v*I+m*k,s=s*I-b*k,m=m*I-v*k,b=o,v=p;if(O&&Math.abs(O)+Math.abs(E)>359.9)O=E=0,D=180-D;G=A8(Math.sqrt(b*b+s*s+a*a)),N=A8(Math.sqrt(m*m+W0*W0)),_=R7(v,m),R=Math.abs(_)>0.0002?_*TJ:0,z=Z0?1/(Z0<0?-Z0:Z0):0}if(Z.svg)o=$.getAttribute("transform"),Z.forceCSS=$.setAttribute("transform","")||!LW(U9($,I8)),o&&$.setAttribute("transform",o)}if(Math.abs(R)>90&&Math.abs(R)<270)if(W)G*=-1,R+=E<=0?180:-180,E+=E<=0?180:-180;else N*=-1,R+=R<=0?180:-180;if(Q=Q||Z.uncache,Z.x=U-((Z.xPercent=U&&(!Q&&Z.xPercent||(Math.round($.offsetWidth/2)===Math.round(-U)?-50:0)))?$.offsetWidth*Z.xPercent/100:0)+X,Z.y=F-((Z.yPercent=F&&(!Q&&Z.yPercent||(Math.round($.offsetHeight/2)===Math.round(-F)?-50:0)))?$.offsetHeight*Z.yPercent/100:0)+X,Z.z=V+X,Z.scaleX=A8(G),Z.scaleY=A8(N),Z.rotation=A8(E)+Y,Z.rotationX=A8(O)+Y,Z.rotationY=A8(D)+Y,Z.skewX=R+Y,Z.skewY=B+Y,Z.transformPerspective=z+X,Z.zOrigin=parseFloat(q.split(" ")[2])||!Q&&Z.zOrigin||0)K[Z9]=OQ(q);return Z.xOffset=Z.yOffset=0,Z.force3D=$9.force3D,Z.renderTransform=Z.svg?hU:RW?CW:fU,Z.uncache=0,Z},OQ=function($){return($=$.split(" "))[0]+" "+$[1]},X5=function($,Q,Z){var K=g8(Q);return A8(parseFloat(Q)+parseFloat(UJ($,"x",Z+"px",K)))+K},fU=function($,Q){Q.z="0px",Q.rotationY=Q.rotationX="0deg",Q.force3D=0,CW($,Q)},wJ="0deg",Q$="0px",_J=") ",CW=function($,Q){var Z=Q||this,K=Z.xPercent,W=Z.yPercent,X=Z.x,Y=Z.y,H=Z.z,q=Z.rotation,U=Z.rotationY,F=Z.rotationX,V=Z.skewX,G=Z.skewY,N=Z.scaleX,E=Z.scaleY,O=Z.transformPerspective,D=Z.force3D,R=Z.target,B=Z.zOrigin,z="",C=D==="auto"&&$&&$!==1||D===!0;if(B&&(F!==wJ||U!==wJ)){var L=parseFloat(U)*z7,A=Math.sin(L),_=Math.cos(L),I;L=parseFloat(F)*z7,I=Math.cos(L),X=X5(R,X,A*I*-B),Y=X5(R,Y,-Math.sin(L)*-B),H=X5(R,H,_*I*-B+B)}if(O!==Q$)z+="perspective("+O+_J;if(K||W)z+="translate("+K+"%, "+W+"%) ";if(C||X!==Q$||Y!==Q$||H!==Q$)z+=H!==Q$||C?"translate3d("+X+", "+Y+", "+H+") ":"translate("+X+", "+Y+_J;if(q!==wJ)z+="rotate("+q+_J;if(U!==wJ)z+="rotateY("+U+_J;if(F!==wJ)z+="rotateX("+F+_J;if(V!==wJ||G!==wJ)z+="skew("+V+", "+G+_J;if(N!==1||E!==1)z+="scale("+N+", "+E+_J;R.style[I8]=z||"translate(0, 0)"},hU=function($,Q){var Z=Q||this,K=Z.xPercent,W=Z.yPercent,X=Z.x,Y=Z.y,H=Z.rotation,q=Z.skewX,U=Z.skewY,F=Z.scaleX,V=Z.scaleY,G=Z.target,N=Z.xOrigin,E=Z.yOrigin,O=Z.xOffset,D=Z.yOffset,R=Z.forceCSS,B=parseFloat(X),z=parseFloat(Y),C,L,A,_,I;if(H=parseFloat(H),q=parseFloat(q),U=parseFloat(U),U)U=parseFloat(U),q+=U,H+=U;if(H||q){if(H*=z7,q*=z7,C=Math.cos(H)*F,L=Math.sin(H)*F,A=Math.sin(H-q)*-V,_=Math.cos(H-q)*V,q){if(U*=z7,I=Math.tan(q-U),I=Math.sqrt(1+I*I),A*=I,_*=I,U)I=Math.tan(U),I=Math.sqrt(1+I*I),C*=I,L*=I}C=A8(C),L=A8(L),A=A8(A),_=A8(_)}else C=F,_=V,L=A=0;if(B&&!~(X+"").indexOf("px")||z&&!~(Y+"").indexOf("px"))B=UJ(G,"x",X,"px"),z=UJ(G,"y",Y,"px");if(N||E||O||D)B=A8(B+N-(N*C+E*A)+O),z=A8(z+E-(N*L+E*_)+D);if(K||W)I=G.getBBox(),B=A8(B+K/100*I.width),z=A8(z+W/100*I.height);I="matrix("+C+","+L+","+A+","+_+","+B+","+z+")",G.setAttribute("transform",I),R&&(G.style[I8]=I)},vU=function($,Q,Z,K,W){var X=360,Y=x8(W),H=parseFloat(W)*(Y&&~W.indexOf("rad")?TJ:1),q=H-K,U=K+q+"deg",F,V;if(Y){if(F=W.split("_")[1],F==="short"){if(q%=X,q!==q%(X/2))q+=q<0?X:-X}if(F==="cw"&&q<0)q=(q+X*YW)%X-~~(q/X)*X;else if(F==="ccw"&&q>0)q=(q-X*YW)%X-~~(q/X)*X}return $._pt=V=new r8($._pt,Q,Z,K,q,zU),V.e=U,V.u="deg",$._props.push(Z),V},GW=function($,Q){for(var Z in Q)$[Z]=Q[Z];return $},gU=function($,Q,Z){var K=GW({},Z._gsap),W="perspective,force3D,transformOrigin,svgOrigin",X=Z.style,Y,H,q,U,F,V,G,N;if(K.svg)q=Z.getAttribute("transform"),Z.setAttribute("transform",""),X[I8]=Q,Y=K$(Z,1),qJ(Z,I8),Z.setAttribute("transform",q);else q=getComputedStyle(Z)[I8],X[I8]=Q,Y=K$(Z,1),X[I8]=q;for(H in i9)if(q=K[H],U=Y[H],q!==U&&W.indexOf(H)<0)G=g8(q),N=g8(U),F=G!==N?UJ(Z,H,q,N):parseFloat(q),V=parseFloat(U),$._pt=new r8($._pt,Y,H,F,V-F,H5),$._pt.u=N||0,$._props.push(H);GW(Y,K)};o8("padding,margin,Width,Radius",function(J,$){var Q="Top",Z="Right",K="Bottom",W="Left",X=($<3?[Q,Z,K,W]:[Q+W,Q+Z,K+Z,K+W]).map(function(Y){return $<2?J+Y:"border"+Y+J});GQ[$>1?"border"+J:J]=function(Y,H,q,U,F){var V,G;if(arguments.length<4)return V=X.map(function(N){return s9(Y,N,q)}),G=V.join(" "),G.split(V[0]).length===5?V[0]:G;V=(U+"").split(" "),G={},X.forEach(function(N,E){return G[N]=V[E]=V[E]||V[(E-1)/2|0]}),Y.init(H,G,F)}});var E5={name:"css",register:U5,targetTest:function($){return $.style&&$.nodeType},init:function($,Q,Z,K,W){var X=this._props,Y=$.style,H=Z.vars.startAt,q,U,F,V,G,N,E,O,D,R,B,z,C,L,A,_,I;V5||U5(),this.styles=this.styles||NW($),_=this.styles.props,this.tween=Z;for(E in Q){if(E==="autoRound")continue;if(U=Q[E],t8[E]&&$5(E,Q,Z,K,$,W))continue;if(G=typeof U,N=GQ[E],G==="function")U=U.call(Z,K,$,W),G=typeof U;if(G==="string"&&~U.indexOf("random("))U=N7(U);if(N)N(this,$,E,U,Z)&&(A=1);else if(E.substr(0,2)==="--"){if(q=(getComputedStyle($).getPropertyValue(E)+"").trim(),U+="",c9.lastIndex=0,!c9.test(q))O=g8(q),D=g8(U),D?O!==D&&(q=UJ($,E,q,D)+D):O&&(U+=O);this.add(Y,"setProperty",q,U,K,W,0,0,E),X.push(E),_.push(E,0,Y[E])}else if(G!=="undefined"){if(H&&E in H)q=typeof H[E]==="function"?H[E].call(Z,K,$,W):H[E],x8(q)&&~q.indexOf("random(")&&(q=N7(q)),g8(q+"")||q==="auto"||(q+=$9.units[E]||g8(s9($,E))||""),(q+"").charAt(1)==="="&&(q=s9($,E));else q=s9($,E);if(V=parseFloat(q),R=G==="string"&&U.charAt(1)==="="&&U.substr(0,2),R&&(U=U.substr(2)),F=parseFloat(U),E in T9){if(E==="autoAlpha"){if(V===1&&s9($,"visibility")==="hidden"&&F)V=0;_.push("visibility",0,Y.visibility),HJ(this,Y,"visibility",V?"inherit":"hidden",F?"inherit":"hidden",!F)}if(E!=="scale"&&E!=="transform")E=T9[E],~E.indexOf(",")&&(E=E.split(",")[0])}if(B=E in i9,B){if(this.styles.save(E),I=U,G==="string"&&U.substring(0,6)==="var(--"){if(U=U9($,U.substring(4,U.indexOf(")"))),U.substring(0,5)==="calc("){var k=$.style.perspective;$.style.perspective=U,U=U9($,"perspective"),k?$.style.perspective=k:qJ($,"perspective")}F=parseFloat(U)}if(!z)C=$._gsap,C.renderTransform&&!Q.parseTransform||K$($,Q.parseTransform),L=Q.smoothOrigin!==!1&&C.smooth,z=this._pt=new r8(this._pt,Y,I8,0,1,C.renderTransform,C,0,-1),z.dep=1;if(E==="scale")this._pt=new r8(this._pt,C,"scaleY",C.scaleY,(R?PJ(C.scaleY,R+F):F)-C.scaleY||0,H5),this._pt.u=0,X.push("scaleY",E),E+="X";else if(E==="transformOrigin"){if(_.push(Z9,0,Y[Z9]),U=yU(U),C.svg)F5($,U,0,L,0,this);else D=parseFloat(U.split(" ")[2])||0,D!==C.zOrigin&&HJ(this,C,"zOrigin",C.zOrigin,D),HJ(this,Y,E,OQ(q),OQ(U));continue}else if(E==="svgOrigin"){F5($,U,1,L,0,this);continue}else if(E in IW){vU(this,C,E,V,R?PJ(V,R+U):U);continue}else if(E==="smoothOrigin"){HJ(this,C,"smooth",C.smooth,U);continue}else if(E==="force3D"){C[E]=U;continue}else if(E==="transform"){gU(this,U,$);continue}}else if(!(E in Y))E=I7(E)||E;if(B||(F||F===0)&&(V||V===0)&&!BU.test(U)&&E in Y){if(O=(q+"").substr((V+"").length),F||(F=0),D=g8(U)||(E in $9.units?$9.units[E]:O),O!==D&&(V=UJ($,E,q,D)),this._pt=new r8(this._pt,B?C:Y,E,V,(R?PJ(V,R+F):F)-V,!B&&(D==="px"||E==="zIndex")&&Q.autoRound!==!1?CU:H5),this._pt.u=D||0,B&&I!==U)this._pt.b=q,this._pt.e=I,this._pt.r=LU;else if(O!==D&&D!=="%")this._pt.b=q,this._pt.r=IU}else if(!(E in Y)){if(E in $)this.add($,E,q||$[E],R?R+U:U,K,W);else if(E!=="parseTransform"){qQ(E,U);continue}}else xU.call(this,$,E,q,R?R+U:U);B||(E in Y?_.push(E,0,Y[E]):typeof $[E]==="function"?_.push(E,2,$[E]()):_.push(E,1,q||$[E])),X.push(E)}}A&&Y5(this)},render:function($,Q){if(Q.tween._time||!G5()){var Z=Q._pt;while(Z)Z.r($,Z.d),Z=Z._next}else Q.styles.revert()},get:s9,aliases:T9,getSetter:function($,Q,Z){var K=T9[Q];return K&&K.indexOf(",")<0&&(Q=K),Q in i9&&Q!==Z9&&($._gsap.x||s9($,"x"))?Z&&WW===Z?Q==="scale"?PU:kU:(WW=Z||{})&&(Q==="scale"?SU:wU):$.style&&!HQ($.style[Q])?AU:~Q.indexOf("-")?MU:VQ($,Q)},core:{_removeProperty:qJ,_getMatrix:D5}};n8.utils.checkPrefix=I7;n8.core.getStyleSaver=NW;(function(J,$,Q,Z){var K=o8(J+","+$+","+Q,function(W){i9[W]=1});o8($,function(W){$9.units[W]="deg",IW[W]=1}),T9[K[13]]=J+","+$,o8(Z,function(W){var X=W.split(":");T9[X[1]]=K[X[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");o8("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(J){$9.units[J]="px"});n8.registerPlugin(E5);var C0=n8.registerPlugin(E5)||n8,aU=C0.core.Tween;class N5{container;scene;camera;renderer;controls;audio;raycaster=new LZ;mousePos=new O0;rootGroup=new F0;sceneryGroup=new F0;trackGroup=new F0;viaductGroup=new F0;trainGroup=new F0;weatherGroup=new F0;celestialGroup=new F0;locoCar=new F0;tenderCar=new F0;coachCar=new F0;cabooseCar=new F0;rotatingWheels=[];coachWindowMat;headlampBeam=null;headlampCoreBeam=null;headlampLight=null;headlampSpotLight=null;headlampTrackPool=null;coachInteriorLight1=null;coachInteriorLight2=null;tailLight=null;lanternLight=null;crossingLight1=null;crossingLight2=null;crossingLamp1=null;crossingLamp2=null;mooredBoat=null;viaductLanterns=[];viaductLanternLights=[];interactiveSheep=[];interactivePoles=[];tunnelLight=null;railClickAccumulator=0;lastBlinkCycle=!1;lastHoverRippleTime=0;windmillGroup=null;windmillSails=null;windmillLight=null;windmillBaseSpeed=0.009;windmillCurrentSpeed=0.009;watermillGroup=null;waterwheel=null;watermillLight=null;cottageGroup=null;cottageLight=null;semaphoreGroup=null;semaphoreArm=null;semaphoreLight=null;semaphoreIsRaised=!1;firefliesGroup=null;fireflies=[];alpineRidgeGroup=new F0;campsiteGroup=new F0;campfireLight=null;campfireFlame=null;campfireParticles=null;campfireParticlePos;waterTowerGroup=new F0;waterTowerSpout=null;waterSprayPoints=null;isWaterTowerSpraying=!1;hotAirBalloonGroup=new F0;balloonBurnerLight=null;balloonBurnerFlame=null;villageWellGroup=new F0;villageWellBucket=null;townFountainGroup=new F0;townFountainJet=null;farmBarnGroup=new F0;depotShedGroup=new F0;butterflies=[];leftSideRod=null;rightSideRod=null;wheelAngle=0;currentViewMode="isometric";directorShotIndex=0;directorTimer=0;directorShotDuration=6.8;directorNeedsCut=!0;engineBankRoll=0;lastAnimTime=0;ambientLight;hemiLight;sunLight;fillLight;sunMesh;sunCorona;moonMesh;moonLight;starsPoints;isNightMode=!1;isRaining=!1;rainStreaks=null;rainCount=360;rainGeo=null;rainPositions=null;splashRipples=[];steamParticles=[];steamTimer=0;trackCurve;progress=0;trainSpeed=0.0016;speedMultiplier=1;clockHand=null;clockTowerGroup=null;interactiveTrees=[];waterMesh=null;animFrameId=0;isDestroyed=!1;constructor(J,$){let Q=document.getElementById(J);if(!Q)throw Error(`ThreeStage container #${J} not found`);this.container=Q,this.audio=$,this.scene=new FZ;let Z=this.container.clientWidth||920,K=this.container.clientHeight||520;this.camera=new p8(38,Z/K,0.02,100),this.camera.position.set(5,3.85,5),this.camera.lookAt(0,0.1,-0.2),this.renderer=new n$({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(Z,K),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=I6,this.renderer.toneMapping=C6,this.renderer.toneMappingExposure=1.15,this.container.appendChild(this.renderer.domElement),this.controls=new AZ(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=0.06,this.controls.autoRotate=!1,this.controls.autoRotateSpeed=0,this.controls.minPolarAngle=Math.PI*0.18,this.controls.maxPolarAngle=Math.PI*0.44,this.controls.minDistance=1.6,this.controls.maxDistance=12.5,this.controls.target.set(0,0.1,-0.2),this.scene.add(this.rootGroup),this.scene.add(this.celestialGroup),this.scene.add(this.weatherGroup),this.rootGroup.add(this.sceneryGroup),this.rootGroup.add(this.viaductGroup),this.rootGroup.add(this.trackGroup),this.rootGroup.add(this.trainGroup),this.rootGroup.scale.setScalar(0.96),this.setupLighting(),this.buildCelestialElements(),this.buildSculptedIsland(),this.buildScenicCanalAndBridge(),this.buildInfiniteTrackCurve(),this.buildPhysicalRailsAndTies(),this.buildStoneViaductAndTunnel(),this.buildMiniatureStationAndTown(),this.buildDutchWindmill(),this.buildWestFarmlandAndBarn(),this.buildCanalWatermill(),this.buildVillageCottageAndSignals(),this.buildEastVillageAndPlaza(),this.buildBioluminescentFireflies(),this.buildLevelCrossingAndTelegraph(),this.buildLushNatureAndFlock(),this.buildArticulatedTrain(),this.buildAlpineMountainRidge(),this.buildCampsiteAndCampfire(),this.buildRailwayWaterTower(),this.buildRailwayServiceDepot(),this.buildHotAirBalloon(),this.buildMiniatureVillageLife(),this.setupWeatherSystem(),this.bindEvents(),this.setNightMode(!1,!0),this.animate()}createStoneBrickTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#dfd7c9",$.fillRect(0,0,512,512);let Q=32,Z=64;for(let W=0;W<512;W+=Q){let Y=W/Q%2===1?Z/2:0;for(let H=-Z;H<512+Z;H+=Z){let q=H+Y,U=Math.floor(Math.random()*20-10);$.fillStyle=`rgb(${218+U}, ${210+U}, ${196+U})`,$.fillRect(q+1,W+1,Z-2,Q-2),$.fillStyle="rgba(255,255,255,0.22)",$.fillRect(q+1,W+1,Z-2,2),$.fillStyle="rgba(0,0,0,0.12)",$.fillRect(q+1,W+Q-3,Z-2,2)}}let K=new d9(J);return K.wrapS=h7,K.wrapT=h7,K.repeat.set(2,2),K}createWoodSleeperTexture(){let J=document.createElement("canvas");J.width=256,J.height=64;let $=J.getContext("2d");$.fillStyle="#5c3d2e",$.fillRect(0,0,256,64),$.strokeStyle="#43281c",$.lineWidth=1;for(let Z=0;Z<18;Z++){let K=Math.random()*64;$.beginPath(),$.moveTo(0,K),$.bezierCurveTo(80,K+Math.random()*4-2,180,K+Math.random()*4-2,256,K),$.stroke()}return $.fillStyle="#262626",$.fillRect(48,8,28,48),$.fillRect(180,8,28,48),$.fillStyle="#d4d4d8",$.beginPath(),$.arc(62,32,3,0,Math.PI*2),$.arc(194,32,3,0,Math.PI*2),$.fill(),new d9(J)}createMeadowTexture(){let J=document.createElement("canvas");J.width=512,J.height=512;let $=J.getContext("2d");$.fillStyle="#4fa65b",$.fillRect(0,0,512,512);for(let Z=0;Z<1600;Z++){let K=Math.random()*512,W=Math.random()*512,X=1.5+Math.random()*2.5,Y=0.08+Math.random()*0.15;$.fillStyle=Math.random()>0.5?`rgba(90, 180, 100, ${Y})`:`rgba(60, 140, 70, ${Y})`,$.beginPath(),$.arc(K,W,X,0,Math.PI*2),$.fill()}let Q=new d9(J);return Q.wrapS=h7,Q.wrapT=h7,Q.repeat.set(3,3),Q}createVolumetricBeamTexture(){let J=document.createElement("canvas");J.width=128,J.height=512;let $=J.getContext("2d"),Q=$.createLinearGradient(0,0,0,512);return Q.addColorStop(0,"rgba(255, 252, 235, 0.85)"),Q.addColorStop(0.12,"rgba(254, 240, 138, 0.45)"),Q.addColorStop(0.35,"rgba(253, 224, 71, 0.20)"),Q.addColorStop(0.65,"rgba(250, 204, 21, 0.05)"),Q.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Q,$.fillRect(0,0,128,512),new d9(J)}createHeadlampPoolTexture(){let J=document.createElement("canvas");J.width=256,J.height=256;let $=J.getContext("2d"),Q=$.createRadialGradient(128,128,16,128,128,124);return Q.addColorStop(0,"rgba(254, 240, 138, 0.75)"),Q.addColorStop(0.35,"rgba(253, 224, 71, 0.40)"),Q.addColorStop(0.7,"rgba(234, 179, 8, 0.12)"),Q.addColorStop(1,"rgba(0, 0, 0, 0.0)"),$.fillStyle=Q,$.fillRect(0,0,256,256),new d9(J)}setupLighting(){this.ambientLight=new BZ(16777215,2.1),this.scene.add(this.ambientLight),this.hemiLight=new NZ(16776171,14870768,1.2),this.hemiLight.position.set(0,10,0),this.scene.add(this.hemiLight),this.sunLight=new p7(16776171,2.6),this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.camera.near=1,this.sunLight.shadow.camera.far=18,this.sunLight.shadow.camera.left=-4.5,this.sunLight.shadow.camera.right=4.5,this.sunLight.shadow.camera.top=4.5,this.sunLight.shadow.camera.bottom=-4.5,this.sunLight.shadow.bias=-0.0006,this.sunLight.shadow.normalBias=0.02,this.scene.add(this.sunLight),this.fillLight=new p7(15857145,1.1),this.fillLight.position.set(-4.5,4,-3.5),this.scene.add(this.fillLight),this.moonLight=new p7(16317180,0),this.moonLight.position.set(-3.5,5.5,-3.5),this.moonLight.castShadow=!0,this.moonLight.shadow.mapSize.width=1024,this.moonLight.shadow.mapSize.height=1024,this.moonLight.shadow.camera.near=1,this.moonLight.shadow.camera.far=18,this.moonLight.shadow.bias=-0.0008,this.moonLight.shadow.normalBias=0.04,this.scene.add(this.moonLight)}buildCelestialElements(){let J=new V8(0.22,24,24),$=new d({color:16710083,emissive:16707722,emissiveIntensity:0.9,roughness:0.4});this.moonMesh=new S(J,$),this.moonMesh.position.set(-2.4,2.8,-2.4),this.moonMesh.scale.setScalar(0.001),this.celestialGroup.add(this.moonMesh);let Q=document.createElement("canvas");Q.width=128,Q.height=128;let Z=Q.getContext("2d"),K=Z.createRadialGradient(64,64,12,64,64,64);K.addColorStop(0,"rgba(254, 240, 138, 0.7)"),K.addColorStop(0.4,"rgba(147, 197, 253, 0.35)"),K.addColorStop(1,"rgba(0, 0, 0, 0)"),Z.fillStyle=K,Z.fillRect(0,0,128,128);let W=new d9(Q),X=new s$({map:W,transparent:!0,blending:Z7,opacity:0}),Y=new VZ(X);Y.scale.set(1.5,1.5,1),this.moonMesh.add(Y);let H=200,q=new E8,U=new Float32Array(H*3);for(let R=0;R<H;R++){let B=Math.PI*1.25+(Math.random()-0.5)*0.95,z=0.6+Math.random()*1.5,C=3+Math.random()*1.8;U[R*3]=Math.cos(B)*C,U[R*3+1]=z,U[R*3+2]=Math.sin(B)*C}q.setAttribute("position",new h8(U,3));let F=new LJ({color:16777215,size:0.04,transparent:!0,opacity:0});this.starsPoints=new X7(q,F),this.celestialGroup.add(this.starsPoints);let V=new F0,G=new V8(0.24,24,24),N=new d({color:16776171,emissive:16498468,emissiveIntensity:1.6,roughness:0.2,metalness:0.1}),E=new S(G,N);V.add(E);let O=new W8({color:16707722,transparent:!0,opacity:0.22,side:L6,depthWrite:!1}),D=new S(new V8(0.36,16,16),O);V.add(D),this.sunCorona=D,V.position.set(1.3,2.1,-1.8),this.sunMesh=V,this.celestialGroup.add(this.sunMesh)}buildSculptedIsland(){let J=new g7(5.4,64),$=document.createElement("canvas");$.width=256,$.height=256;let Q=$.getContext("2d"),Z=Q.createRadialGradient(128,128,20,128,128,112);Z.addColorStop(0,"rgba(0, 0, 0, 0.12)"),Z.addColorStop(0.4,"rgba(0, 0, 0, 0.03)"),Z.addColorStop(0.72,"rgba(0, 0, 0, 0)"),Z.addColorStop(1,"rgba(0, 0, 0, 0)"),Q.fillStyle=Z,Q.fillRect(0,0,256,256);let K=new d9($),W=new W8({map:K,transparent:!0,depthWrite:!1}),X=new S(J,W);X.rotation.x=-Math.PI*0.5,X.position.y=-0.22,this.sceneryGroup.add(X);let Y=new d({color:15986146,roughness:0.45,metalness:0.02}),H=this.createMeadowTexture(),q=new d({color:5219931,map:H,roughness:0.65,metalness:0.02}),U=new d({color:4295245,map:H,roughness:0.7,metalness:0.02}),F=0.22,V=1.8,G=1.85,N=new S(new D0(V,V+0.08,F,52),Y);N.position.set(-G,-F*0.5,0),N.scale.set(1,1,0.94),N.receiveShadow=!0,this.sceneryGroup.add(N);let E=new S(new D0(V-0.02,V,0.035,52),q);E.position.set(-G,0.015,0),E.scale.set(1,1,0.94),E.receiveShadow=!0,this.sceneryGroup.add(E);let O=new S(new D0(V,V+0.08,F,52),Y);O.position.set(G,-F*0.5,0),O.scale.set(1,1,0.94),O.receiveShadow=!0,this.sceneryGroup.add(O);let D=new S(new D0(V-0.02,V,0.035,52),q);D.position.set(G,0.015,0),D.scale.set(1,1,0.94),D.receiveShadow=!0,this.sceneryGroup.add(D);let R=new S(new t(G*2,F,1.7),Y);R.position.set(0,-F*0.5,0),R.receiveShadow=!0,this.sceneryGroup.add(R);let B=new S(new t(G*2,0.035,1.68),q);B.position.set(0,0.015,0),B.receiveShadow=!0,this.sceneryGroup.add(B);let z=2.1,C=-1.2,L=-2.6,A=new S(new D0(z,z+0.06,F,48),Y);A.position.set(C,-F*0.5,L),A.receiveShadow=!0,this.sceneryGroup.add(A);let _=new S(new D0(z-0.02,z,0.035,48),U);_.position.set(C,0.015,L),_.receiveShadow=!0,this.sceneryGroup.add(_);let I=1.7,k=1.6,b=-2.1,s=new S(new D0(I,I+0.06,F,40),Y);s.position.set(k,-F*0.5,b),s.receiveShadow=!0,this.sceneryGroup.add(s);let a=new S(new D0(I-0.02,I,0.035,40),U);a.position.set(k,0.015,b),a.receiveShadow=!0,this.sceneryGroup.add(a);let x=0.72,v=0,m=1.2,o=new S(new D0(x,x+0.06,F,40),Y);o.position.set(v,-F*0.5,m),o.receiveShadow=!0,this.sceneryGroup.add(o);let p=new S(new D0(x-0.02,x,0.035,40),q);p.position.set(v,0.015,m),p.receiveShadow=!0,this.sceneryGroup.add(p);let h=q;[{x:-2.25,y:0.025,z:-0.45,r:0.7,h:0.04},{x:-2.05,y:0.025,z:0.25,r:0.65,h:0.035},{x:2.05,y:0.02,z:0,r:0.75,h:0.03},{x:2.45,y:0.02,z:0.3,r:0.6,h:0.03},{x:1.6,y:0.025,z:-2.1,r:0.75,h:0.035},{x:0,y:0.02,z:1.2,r:0.6,h:0.03}].forEach((W0)=>{let G0=new S(new D0(W0.r*0.45,W0.r,W0.h,18),h);G0.position.set(W0.x,W0.y,W0.z),G0.receiveShadow=!0,this.sceneryGroup.add(G0)});let J0=new d({color:13154456,roughness:0.9});[[-0.18,0.82],[-0.36,0.76],[-0.55,0.68],[-0.74,0.58],[-0.95,0.46],[-1.15,0.35],[0.18,0.82],[0.36,0.76],[0.55,0.68],[0.74,0.58],[0.95,0.46],[1.15,0.32],[1.32,0.18],[-0.14,0.16],[-0.08,0.1],[0,0],[0.08,-0.1],[0.14,-0.16]].forEach(([W0,G0],S0)=>{let x0=new S(new D0(0.045,0.052,0.008,7),J0);x0.position.set(W0,0.034,G0),x0.rotation.y=S0*0.7,x0.receiveShadow=!0,this.sceneryGroup.add(x0)});let e=new d({color:7162945,roughness:0.75});[{start:[-1.55,-0.4],end:[-1.2,-0.4]},{start:[-1.2,-0.4],end:[-1.2,-0.22]},{start:[-1.55,-0.22],end:[-1.55,-0.4]}].forEach(({start:W0,end:G0})=>{let[S0,x0]=W0,[_0,m0]=G0,g=_0-S0,q8=m0-x0,d0=Math.sqrt(g*g+q8*q8),L0=Math.atan2(q8,g),P0=(S0+_0)*0.5,f0=(x0+m0)*0.5;[-d0*0.48,d0*0.48].forEach((k0)=>{let j0=new S(new t(0.018,0.1,0.018),e),T=P0+Math.cos(L0)*k0,M=f0+Math.sin(L0)*k0;j0.position.set(T,0.08,M),j0.castShadow=!0,this.sceneryGroup.add(j0)}),[0.065,0.105].forEach((k0)=>{let j0=new S(new t(d0,0.012,0.012),e);j0.position.set(P0,k0,f0),j0.rotation.y=-L0,j0.castShadow=!0,this.sceneryGroup.add(j0)})})}buildScenicCanalAndBridge(){let J=new F0,$=new D0(0.46,0.5,0.022,36),Q=new d({color:481669,roughness:0.75}),Z=new S($,Q);Z.scale.set(1.45,1,1.95),Z.rotation.y=0.7854,Z.position.set(0,0.015,-0.04),Z.receiveShadow=!0,J.add(Z);let K=new d({color:13621468,map:this.createStoneBrickTexture(),roughness:0.55,metalness:0.05}),W=36;for(let h=0;h<W;h++){let c=h/W*Math.PI*2,J0=Math.cos(c)*0.44*1.45,f=Math.sin(c)*0.44*1.95,e=J0*Math.cos(0.7854)-f*Math.sin(0.7854),Z0=J0*Math.sin(0.7854)+f*Math.cos(0.7854);if(Math.abs(Z0-e)/Math.SQRT2<0.22)continue;if(Math.hypot(e- -0.247,Z0-0.247)<0.2||Math.hypot(e-0.247,Z0- -0.247)<0.2)continue;let G0=new S(new t(0.1,0.04,0.052),K);G0.position.set(e,0.038,Z0),G0.rotation.y=0.7854-c,G0.castShadow=!0,G0.receiveShadow=!0,J.add(G0)}let X=new d({color:165063,emissive:223649,emissiveIntensity:0.18,roughness:0.04,metalness:0.15,transparent:!0,opacity:0.88}),Y=new D0(0.43,0.45,0.016,36),H=new S(Y,X);H.scale.set(1.42,1,1.9),H.rotation.y=0.7854,H.position.set(0,0.034,-0.04),H.receiveShadow=!0,this.waterMesh=H,J.add(H);let q=[6583435,4674921,9741240,5395035];[[-0.42,-0.26],[-0.38,-0.34],[-0.22,-0.48],[0.15,-0.46],[0.38,-0.32],[0.44,-0.18],[0.46,0.1],[0.38,0.28],[0.24,0.44],[-0.18,0.45],[-0.36,0.32],[-0.45,0.12]].filter(([h,c])=>Math.abs(c-h)/Math.SQRT2>=0.22).forEach(([h,c],J0)=>{let f=new d({color:q[J0%q.length],roughness:0.6}),e=new S(new T8(0.026+J0%3*0.012,1),f);e.position.set(h,0.038,c),e.rotation.set(J0*0.5,J0*0.8,J0*0.3),e.castShadow=!0,J.add(e)});let F=new F0;F.position.set(-0.3,0.04,-0.32),F.rotation.y=0.65;let V=new d({color:7877903,roughness:0.7});[-0.07,0.07].forEach((h)=>{let c=new S(new D0(0.012,0.014,0.09,6),V);c.position.set(h,-0.01,0.09),c.castShadow=!0,F.add(c)});for(let h=0;h<4;h++){let c=new S(new t(0.18,0.01,0.042),V);c.position.set(0,0.028,-0.06+h*0.045),c.castShadow=!0,F.add(c)}let G=new d({color:1976635,metalness:0.8,roughness:0.3}),N=new S(new D0(0.007,0.01,0.02,8),G);N.position.set(0.06,0.042,0.075),F.add(N),J.add(F);let E=new F0;E.position.set(-0.4,0.038,-0.24),E.rotation.y=0.45;let O=new d({color:9584654,roughness:0.5}),D=new d({color:4528643,roughness:0.6}),R=new S(new t(0.2,0.042,0.09),O);R.position.y=0.018,R.castShadow=!0,E.add(R);let B=new S(new t(0.208,0.008,0.098),D);B.position.y=0.04,E.add(B);let z=new d({color:11817737,roughness:0.4}),C=new S(new t(0.038,0.014,0.082),z);C.position.set(0,0.028,0),E.add(C);let L=new S(new t(0.042,0.014,0.082),z);L.position.set(-0.075,0.028,0),E.add(L);let A=new d({color:14251782,roughness:0.4});[-1,1].forEach((h)=>{let c=new F0,J0=new S(new D0(0.004,0.004,0.16,6),A);J0.rotation.z=Math.PI*0.5,c.add(J0);let f=new S(new t(0.038,0.003,0.018),A);f.position.x=0.08,c.add(f),c.position.set(0.01,0.044,h*0.052),c.rotation.y=h*0.25,c.rotation.z=h*0.1,E.add(c)});let _=new d({color:13935475,roughness:0.9}),I=new S(new D0(0.003,0.003,0.12,4),_);I.position.set(0.12,0.035,-0.04),I.rotation.z=-Math.PI*0.35,I.rotation.y=0.4,E.add(I),this.mooredBoat=E,J.add(E);let k=new d({color:1467700,roughness:0.6}),b=new d({color:4528643,roughness:0.8});[[-0.2,-0.42],[0.22,-0.38],[-0.38,0.15],[0.38,-0.18]].filter(([h,c])=>Math.abs(c-h)/Math.SQRT2>=0.22).forEach(([h,c])=>{for(let J0=0;J0<3;J0++){let f=new F0,e=(Math.random()-0.5)*0.05,Z0=(Math.random()-0.5)*0.05;f.position.set(h+e,0.035,c+Z0);let W0=new S(new D0(0.003,0.004,0.1+J0*0.02,4),k);W0.position.y=0.05+J0*0.01,f.add(W0);let G0=new S(new D0(0.008,0.008,0.032,6),b);G0.position.y=0.085+J0*0.01,f.add(G0),J.add(f)}});let a=new d({color:1409085,roughness:0.35}),x=new d({color:16020150,roughness:0.25}),v=new d({color:16638023,roughness:0.25});[[-0.3,0.038,0.06],[0.3,0.038,-0.06],[-0.38,0.038,-0.15],[0.38,0.038,0.15]].filter(([h,,c])=>Math.abs(c-h)/Math.SQRT2>=0.22).forEach(([h,c,J0],f)=>{let e=new S(new D0(0.04,0.04,0.004,12,1,!1,0,Math.PI*1.85),a);e.position.set(h,c,J0),e.rotation.y=f*1.4,J.add(e);let Z0=new S(new T8(0.016,0),f%2===0?x:v);Z0.position.set(h,c+0.012,J0),J.add(Z0)});let o=new d({color:4528643,roughness:0.85});[-0.28,-0.14,0,0.14,0.28].forEach((h)=>{let c=h*0.7071,J0=h*0.7071,f=new S(new t(0.24,0.024,0.055),o);f.position.set(c,0.044,J0),f.rotation.y=-Math.PI*0.25,f.castShadow=!0,J.add(f),[-0.075,0.075].forEach((e)=>{let Z0=c-e*0.7071,W0=J0+e*0.7071,G0=new S(new D0(0.014,0.016,0.065,8),o);G0.position.set(Z0,0.02,W0),G0.castShadow=!0,J.add(G0)})}),[-0.045,0.045].forEach((h)=>{let c=new S(new t(0.64,0.018,0.035),o),J0=-h*0.7071,f=h*0.7071;c.position.set(J0,0.048,f),c.rotation.y=Math.PI*0.25,c.castShadow=!0,J.add(c)}),this.sceneryGroup.add(J)}buildInfiniteTrackCurve(){let J=[],$=260,Q=0.95,Z=0.055,K=0.38;for(let W=0;W<260;W++){let X=W/260*Math.PI*2,Y=Math.sin(X)*3.3,H=Math.sin(2*X)*1.6,q=Math.abs(X-Math.PI),U=0.055;if(q<0.95){let F=Math.cos(q/0.95*(Math.PI*0.5));U=0.055+0.38*Math.pow(F,2)}J.push(new w(Y,U,H))}this.trackCurve=new H7(J,!0,"centripetal")}buildPhysicalRailsAndTies(){let J=new t(0.24,0.022,0.06),$=this.createWoodSleeperTexture(),Q=new d({color:6044974,map:$,roughness:0.7,metalness:0.1}),Z=160,K=new w(0,1,0);for(let O=0;O<160;O++){let D=O/160,R=this.trackCurve.getPointAt(D),B=this.trackCurve.getTangentAt(D).normalize(),z=new w().crossVectors(B,K).normalize();if(z.lengthSq()<0.001)z.set(1,0,0);let C=new S(J,Q);C.position.set(R.x,R.y-0.012,R.z),C.lookAt(R.clone().add(z)),C.castShadow=!0,C.receiveShadow=!0,this.trackGroup.add(C)}let W=280,X=0.066,Y=[],H=[];for(let O=0;O<=W;O++){let D=O/W,R=this.trackCurve.getPointAt(D),B=this.trackCurve.getTangentAt(D).normalize(),z=new w().crossVectors(B,K).normalize();if(z.lengthSq()<0.001)z.set(1,0,0);Y.push(R.clone().addScaledVector(z,X)),H.push(R.clone().addScaledVector(z,-X))}let q=new H7(Y,!0),U=new H7(H,!0),F=new u7(q,280,0.013,8,!0),V=new u7(U,280,0.013,8,!0),G=new d({color:13948120,metalness:0.92,roughness:0.18}),N=new S(F,G),E=new S(V,G);N.castShadow=!0,N.receiveShadow=!0,E.castShadow=!0,E.receiveShadow=!0,this.trackGroup.add(N),this.trackGroup.add(E)}buildStoneViaductAndTunnel(){this.viaductGroup.rotation.y=0.7702;let J=this.createStoneBrickTexture(),$=new d({color:14603717,map:J,roughness:0.52,metalness:0.04}),Q=new d({color:9074529,roughness:0.45}),Z=new d({color:6583435,map:J,roughness:0.65}),K=new d({color:3033643,roughness:0.85}),W=new t(0.24,0.4,0.48);[-0.35,0.35].forEach((R)=>{let B=new S(W,$);B.position.set(R,0.2,0),B.castShadow=!0,B.receiveShadow=!0,this.viaductGroup.add(B);let z=new S(new t(0.28,0.07,0.54),Z);z.position.set(R,0.035,0),z.castShadow=!0,z.receiveShadow=!0,this.viaductGroup.add(z),[-0.29,0.29].forEach((C)=>{let L=new S(new D0(0.001,0.12,0.22,3),Z);L.position.set(R,0.09,C),L.rotation.y=C>0?0:Math.PI,L.castShadow=!0,this.viaductGroup.add(L)}),[-0.14,0.14].forEach((C)=>{let L=new S(new T8(0.024,0),K);L.position.set(R+(R>0?-0.12:0.12),0.06+Math.random()*0.04,C),this.viaductGroup.add(L)})});let X=new t(1.12,0.045,0.44),Y=new S(X,$);Y.position.set(0,0.4,0),Y.castShadow=!0,Y.receiveShadow=!0,this.viaductGroup.add(Y);for(let R=0;R<9;R++){let B=-0.44+R*0.11;[-0.21,0.21].forEach((z)=>{let C=new S(new t(0.032,0.028,0.038),Q);C.position.set(B,0.375,z),C.castShadow=!0,this.viaductGroup.add(C)})}let H=new d({color:13156008,map:J,roughness:0.58,metalness:0.04,side:g9}),q=new D0(0.23,0.23,0.48,28,1,!0,-Math.PI*0.5,Math.PI),U=new S(q,H);U.rotation.x=-Math.PI*0.5,U.position.set(0,0.17,0),U.castShadow=!0,U.receiveShadow=!0,this.viaductGroup.add(U),this.tunnelLight=new j8(16498468,0.9,1.4),this.tunnelLight.position.set(0,0.32,0),this.viaductGroup.add(this.tunnelLight),[-0.242,0.242].forEach((R)=>{for(let z=0;z<=9;z++){let C=z/9*Math.PI,L=z===Math.floor(4.5),A=Math.cos(C)*0.235,_=0.17+Math.sin(C)*0.235,I=L?new t(0.048,0.064,0.042):new t(0.038,0.042,0.03),k=new S(I,L?Q:$);k.position.set(A,_,R),k.rotation.z=C-Math.PI*0.5,k.castShadow=!0,this.viaductGroup.add(k)}[-0.18,0.18].forEach((z)=>{let C=new S(new t(0.09,0.07,0.024),$);C.position.set(z,0.365,R),C.castShadow=!0,this.viaductGroup.add(C)})});let F=new t(1.12,0.085,0.04),V=new S(F,Q);V.position.set(0,0.46,0.2),V.castShadow=!0,this.viaductGroup.add(V);let G=new S(F,Q);G.position.set(0,0.46,-0.2),G.castShadow=!0,this.viaductGroup.add(G);let N=new F8(0.035,0.075,4);[[-0.54,0.525,0.2],[0.54,0.525,0.2],[-0.54,0.525,-0.2],[0.54,0.525,-0.2]].forEach(([R,B,z])=>{let C=new S(N,Q);C.position.set(R,B,z),C.rotation.y=Math.PI*0.25,C.castShadow=!0,this.viaductGroup.add(C)}),this.viaductLanterns=[],this.viaductLanternLights=[];let E=new d({color:1976635,metalness:0.85,roughness:0.3}),O=new d({color:14251782,metalness:0.8,roughness:0.2}),D=new d({color:16707722,emissive:16498468,emissiveIntensity:1.8,roughness:0.1,transparent:!0,opacity:0.9});[{x:-0.38,z:0.25},{x:0.38,z:0.25},{x:-0.38,z:-0.25},{x:0.38,z:-0.25}].forEach(({x:R,z:B})=>{let z=new F0;z.position.set(R,0.29,B);let C=new S(new t(0.012,0.045,0.045),E);C.position.set(R>0?-0.02:0.02,0,0),z.add(C);let L=new S(new D0(0.022,0.016,0.04,6),O);L.position.set(0,0.01,0),L.castShadow=!0,z.add(L);let A=new S(new D0(0.016,0.012,0.028,6),D);A.position.set(0,0.01,0),z.add(A);let _=new j8(16498468,this.isNightMode?1.4:0,1.6);_.position.set(0,0.01,0),z.add(_),this.viaductLanternLights.push(_),this.viaductLanterns.push(z),this.viaductGroup.add(z)})}buildMiniatureStationAndTown(){let J=new F0;J.position.set(0,0.04,1.25),J.rotation.y=0;let $=new d({color:14870768,roughness:0.4}),Q=new d({color:8736014,roughness:0.5}),Z=new d({color:14510880,roughness:0.35}),K=new S(new t(0.62,0.05,0.22),$);K.position.y=0.025,K.castShadow=!0,K.receiveShadow=!0,J.add(K);let W=new t(0.024,0.28,0.024),X=new S(W,Q);X.position.set(-0.16,0.16,-0.06),J.add(X);let Y=new S(W,Q);Y.position.set(0.08,0.16,-0.06),J.add(Y);let H=new S(new t(0.38,0.024,0.2),Z);H.position.set(-0.04,0.3,-0.02),H.rotation.x=0.12,H.castShadow=!0,J.add(H),this.clockTowerGroup=new F0,this.clockTowerGroup.position.set(0.2,0,-0.04);let q=new S(new t(0.12,0.42,0.12),$);q.position.y=0.235,q.castShadow=!0,this.clockTowerGroup.add(q);let U=new S(new F8(0.1,0.18,4),Z);U.position.y=0.53,U.rotation.y=Math.PI*0.25,U.castShadow=!0,this.clockTowerGroup.add(U);let F=new S(new D0(0.038,0.038,0.01,16),new d({color:16777215,roughness:0.1}));F.rotation.x=Math.PI*0.5,F.position.set(0,0.36,0.065),this.clockTowerGroup.add(F);let V=new t(0.005,0.028,0.005);this.clockHand=new S(V,new W8({color:988970})),this.clockHand.position.set(0,0.36,0.072),this.clockTowerGroup.add(this.clockHand),J.add(this.clockTowerGroup);let G=new S(new t(0.18,0.038,0.05),Q);G.position.set(-0.06,0.065,-0.04),J.add(G);let N=new S(new t(0.04,0.03,0.022),new d({color:9584654}));N.position.set(-0.16,0.065,-0.04),J.add(N);let E=new d({color:9741240,metalness:0.85,roughness:0.3});[-0.19,-0.21].forEach((R,B)=>{let z=new S(new D0(0.016,0.018,0.036,8),E);z.position.set(R,0.065,0.04+B*0.03),z.castShadow=!0,J.add(z)}),[2450411,14251782].forEach((R,B)=>{let z=new F0,C=new S(new D0(0.02,0.026,0.07,8),new d({color:R,roughness:0.4}));C.position.y=0.085;let L=new S(new V8(0.02,8,8),new d({color:16772565}));L.position.y=0.135,z.add(C),z.add(L),z.position.set(-0.02+B*0.06,0,0.01),z.castShadow=!0,J.add(z)}),this.lanternLight=new j8(16708551,0.8,1.6),this.lanternLight.position.set(-0.04,0.26,-0.02),J.add(this.lanternLight);let D=new S(new V8(0.022,8,8),new W8({color:16707722}));D.position.copy(this.lanternLight.position),J.add(D),this.sceneryGroup.add(J)}buildDutchWindmill(){this.windmillGroup=new F0,this.windmillGroup.position.set(-2.25,0.035,-0.45);let J=this.createStoneBrickTexture(),$=new d({color:14076856,map:J,roughness:0.65,metalness:0.05}),Q=new d({color:7877903,roughness:0.7}),Z=new d({color:14604492,roughness:0.6,metalness:0.02}),K=new d({color:3359061,roughness:0.45,metalness:0.2}),W=new d({color:16710083,roughness:0.8,side:g9}),X=new S(new D0(0.18,0.21,0.08,8),$);X.position.y=0.04,X.castShadow=!0,X.receiveShadow=!0,this.windmillGroup.add(X);let Y=new S(new D0(0.11,0.17,0.36,8),Z);Y.position.y=0.26,Y.castShadow=!0,Y.receiveShadow=!0,this.windmillGroup.add(Y);let H=new S(new F8(0.13,0.1,8),K);H.position.y=0.49,H.castShadow=!0,this.windmillGroup.add(H),this.windmillSails=new F0,this.windmillSails.position.set(0,0.44,0.13);let q=new S(new D0(0.024,0.024,0.024,8),Q);q.rotation.x=Math.PI*0.5,this.windmillSails.add(q);for(let V=0;V<4;V++){let G=new F0;G.rotation.z=V*Math.PI/2;let N=new S(new t(0.012,0.28,0.01),Q);N.position.y=0.14,G.add(N);let E=new S(new X9(0.055,0.22),W);E.position.set(0.032,0.15,0.005),E.rotation.y=0.15,G.add(E),this.windmillSails.add(G)}this.windmillGroup.add(this.windmillSails);let U=new d({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.6:0.1,roughness:0.1}),F=new S(new t(0.012,0.03,0.024),U);F.position.set(0.125,0.27,0.04),this.windmillGroup.add(F),this.windmillLight=new j8(16498468,this.isNightMode?0.85:0,1.4),this.windmillLight.position.set(0.08,0.28,0),this.windmillGroup.add(this.windmillLight),this.sceneryGroup.add(this.windmillGroup)}buildWestFarmlandAndBarn(){let J=new F0;J.position.set(-2.05,0.04,0.15);let $=new d({color:10033947,roughness:0.65}),Q=new d({color:16317180,roughness:0.45}),Z=new d({color:3359061,roughness:0.6}),K=new d({color:9741240,roughness:0.8}),W=new d({color:16436245,roughness:0.85}),X=new d({color:9741240,metalness:0.75,roughness:0.25}),Y=new d({color:4528643,roughness:0.9}),H=new d({color:15381256,roughness:0.8}),q=new d({color:1483594,roughness:0.6}),U=new F0,F=new S(new t(0.34,0.04,0.24),K);F.position.y=0.02,F.castShadow=!0,U.add(F);let V=new S(new t(0.32,0.16,0.22),$);V.position.y=0.12,V.castShadow=!0,U.add(V);let G=new S(new t(0.06,0.1,0.01),Q);G.position.set(-0.035,0.09,0.112),U.add(G);let N=new S(new t(0.06,0.1,0.01),Q);N.position.set(0.035,0.09,0.112),U.add(N);let E=new S(new t(0.36,0.06,0.25),Z);E.position.y=0.23,E.castShadow=!0,U.add(E);let O=new S(new F8(0.14,0.08,4),Z);O.rotation.y=Math.PI*0.25,O.position.y=0.29,O.scale.set(1.1,1,1.8),O.castShadow=!0,U.add(O);let D=new S(new t(0.05,0.05,0.01),Q);D.position.set(0,0.23,0.128),U.add(D);let R=new j8(16707722,0.6,0.8);R.position.set(0,0.26,0.14),U.add(R),J.add(U),this.farmBarnGroup=J;let B=new F0;B.position.set(-0.22,0,0.1);let z=new S(new D0(0.065,0.065,0.32,16),X);z.position.y=0.16,z.castShadow=!0,B.add(z);let C=new S(new V8(0.066,12,12,0,Math.PI*2,0,Math.PI*0.5),X);C.position.y=0.32,C.castShadow=!0,B.add(C);for(let m=0;m<6;m++){let o=new S(new t(0.02,0.005,0.005),Q);o.position.set(0,0.08+m*0.045,0.068),B.add(o)}J.add(B);let L=new F0;L.position.set(-0.25,0,-0.08);let A=new S(new D0(0.038,0.038,0.06,12),W);A.rotation.z=Math.PI*0.5,A.position.set(0,0.038,0),A.castShadow=!0,L.add(A);let _=new S(new t(0.07,0.035,0.045),W);_.position.set(0.08,0.018,0.02),_.castShadow=!0,L.add(_);let I=new S(new t(0.07,0.035,0.045),W);I.position.set(0.08,0.053,0.02),I.rotation.y=0.2,I.castShadow=!0,L.add(I),J.add(L);let k=new F0;k.position.set(-0.45,0,-0.22);let b=new S(new t(0.28,0.015,0.22),Y);b.position.y=0.008,k.add(b),[-0.08,0,0.08].forEach((m,o)=>{for(let p=-0.1;p<=0.1;p+=0.04)if(o%2===0){let h=new S(new D0(0.006,0.008,0.045,5),H);h.position.set(p,0.035,m),k.add(h)}else{let h=new S(new T8(0.014,0),q);h.position.set(p,0.025,m),k.add(h)}}),J.add(k);let s=new F0;s.position.set(-0.35,0,-0.4);let a=new S(new D0(0.02,0.026,0.14,6),$);a.position.y=0.07,s.add(a);let x=new S(new T8(0.11,1),q);x.position.y=0.18,s.add(x);let v=new W8({color:15680580});[[-0.06,0.16,0.05],[0.06,0.19,-0.04],[0,0.22,0.07],[0.04,0.15,0.06]].forEach(([m,o,p])=>{let h=new S(new V8(0.012,6,6),v);h.position.set(m,o,p),s.add(h)}),J.add(s)}buildCanalWatermill(){this.watermillGroup=new F0,this.watermillGroup.position.set(0,0.035,-0.88);let J=this.createStoneBrickTexture(),$=new d({color:13621468,map:J,roughness:0.65,metalness:0.05}),Q=new d({color:7877903,roughness:0.7}),Z=new d({color:15857145,roughness:0.85}),K=new d({color:10105874,roughness:0.5}),W=new S(new t(0.32,0.1,0.26),$);W.position.y=0.05,W.castShadow=!0,W.receiveShadow=!0,this.watermillGroup.add(W);let X=new S(new t(0.3,0.13,0.24),Z);X.position.y=0.165,X.castShadow=!0,X.receiveShadow=!0,this.watermillGroup.add(X),[-0.145,0.145].forEach((N)=>{let E=new S(new t(0.015,0.13,0.245),Q);E.position.set(N,0.165,0),this.watermillGroup.add(E)});let Y=new S(new t(0.34,0.024,0.17),K);Y.position.set(0,0.275,-0.06),Y.rotation.x=0.68,Y.castShadow=!0,this.watermillGroup.add(Y);let H=new S(new t(0.34,0.024,0.17),K);H.position.set(0,0.275,0.06),H.rotation.x=-0.68,H.castShadow=!0,this.watermillGroup.add(H),[-0.148,0.148].forEach((N)=>{let E=new S(new F8(0.12,0.09,3),Q);E.position.set(N,0.275,0),E.rotation.y=N>0?Math.PI*0.5:-Math.PI*0.5,this.watermillGroup.add(E)});let q=new S(new t(0.045,0.16,0.045),$);q.position.set(0.09,0.3,-0.07),q.castShadow=!0,this.watermillGroup.add(q);let U=new S(new t(0.08,0.022,0.16),Q);U.position.set(0,0.18,0.17),U.rotation.x=0.15,U.castShadow=!0,this.watermillGroup.add(U),this.waterwheel=new F0,this.waterwheel.position.set(0,0.065,0.18);let F=new S(new D0(0.014,0.014,0.08,8),Q);F.rotation.z=Math.PI*0.5,this.waterwheel.add(F),[-0.03,0.03].forEach((N)=>{let E=new S(new m7(0.105,0.125,16),Q);E.rotation.y=Math.PI*0.5,E.position.x=N,this.waterwheel.add(E)});for(let N=0;N<12;N++){let E=N/12*Math.PI*2,O=new F0;if(O.rotation.x=E,N%2===0){let R=new S(new t(0.012,0.11,0.01),Q);R.position.y=0.055,O.add(R)}let D=new S(new t(0.068,0.008,0.036),Q);D.position.set(0,0.115,0),D.castShadow=!0,O.add(D),this.waterwheel.add(O)}this.watermillGroup.add(this.waterwheel);let V=new S(new t(0.012,0.012,0.045),Q);V.position.set(0.09,0.18,0.14),this.watermillGroup.add(V),this.watermillLight=new j8(16498468,this.isNightMode?0.85:0,1.4),this.watermillLight.position.set(0.09,0.16,0.16),this.watermillGroup.add(this.watermillLight);let G=new S(new V8(0.016,8,8),new W8({color:16707722}));G.position.copy(this.watermillLight.position),this.watermillGroup.add(G),this.sceneryGroup.add(this.watermillGroup)}buildVillageCottageAndSignals(){this.cottageGroup=new F0,this.cottageGroup.position.set(2.4,0.035,-0.35),this.cottageGroup.rotation.y=-0.35;let J=new d({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),$=new d({color:16448249,roughness:0.85}),Q=new d({color:4528643,roughness:0.7}),Z=new d({color:8736014,roughness:0.9}),K=new d({color:16707722,emissive:16498468,emissiveIntensity:this.isNightMode?1.8:0.1,roughness:0.1}),W=new S(new t(0.36,0.05,0.26),J);W.position.y=0.025,W.castShadow=!0,W.receiveShadow=!0,this.cottageGroup.add(W);let X=new S(new t(0.34,0.14,0.24),$);X.position.y=0.12,X.castShadow=!0,X.receiveShadow=!0,this.cottageGroup.add(X),[-0.165,0.165].forEach((_)=>{let I=new S(new t(0.016,0.14,0.244),Q);I.position.set(_,0.12,0),this.cottageGroup.add(I)});let Y=new S(new t(0.344,0.016,0.244),Q);Y.position.set(0,0.12,0),this.cottageGroup.add(Y);let H=new S(new t(0.38,0.026,0.17),Z);H.position.set(0,0.225,-0.06),H.rotation.x=0.72,H.castShadow=!0,this.cottageGroup.add(H);let q=new S(new t(0.38,0.026,0.17),Z);q.position.set(0,0.225,0.06),q.rotation.x=-0.72,q.castShadow=!0,this.cottageGroup.add(q);let U=new S(new t(0.07,0.06,0.06),$);U.position.set(-0.06,0.22,0.08),U.castShadow=!0,this.cottageGroup.add(U);let F=new S(new F8(0.05,0.04,3),Z);F.position.set(-0.06,0.265,0.08),F.rotation.y=Math.PI*0.5,this.cottageGroup.add(F);let V=new S(new t(0.042,0.18,0.042),J);V.position.set(0.12,0.26,-0.06),V.castShadow=!0,this.cottageGroup.add(V);let G=new S(new t(0.012,0.038,0.032),K);G.position.set(0.07,0.12,0.122),this.cottageGroup.add(G);let N=new S(new t(0.012,0.038,0.032),K);N.position.set(-0.07,0.12,0.122),this.cottageGroup.add(N);let E=new S(new t(0.042,0.07,0.012),Q);E.position.set(0,0.085,0.122),this.cottageGroup.add(E),this.cottageLight=new j8(16498468,this.isNightMode?1.1:0,1.6),this.cottageLight.position.set(0,0.14,0),this.cottageGroup.add(this.cottageLight),this.sceneryGroup.add(this.cottageGroup),this.semaphoreGroup=new F0,this.semaphoreGroup.position.set(-0.35,0.035,1.25);let O=new d({color:1976635,metalness:0.8,roughness:0.3}),D=new d({color:14427686,roughness:0.4}),R=new d({color:16777215,roughness:0.4}),B=new S(new D0(0.01,0.014,0.38,8),O);B.position.y=0.19,B.castShadow=!0,this.semaphoreGroup.add(B);for(let _=0;_<6;_++){let I=new S(new t(0.028,0.004,0.004),O);I.position.set(0,0.08+_*0.045,0.014),this.semaphoreGroup.add(I)}let z=new S(new V8(0.014,6,6),O);z.position.y=0.385,this.semaphoreGroup.add(z),this.semaphoreArm=new F0,this.semaphoreArm.position.set(0,0.32,0.01);let C=new S(new t(0.12,0.022,0.005),D);C.position.x=0.06,C.castShadow=!0,this.semaphoreArm.add(C);let L=new S(new t(0.022,0.024,0.006),R);L.position.x=0.09,this.semaphoreArm.add(L);let A=new S(new t(0.03,0.018,0.01),O);A.position.x=-0.02,this.semaphoreArm.add(A),this.semaphoreGroup.add(this.semaphoreArm),this.semaphoreLight=new j8(14427686,0.6,0.8),this.semaphoreLight.position.set(0.01,0.32,0.02),this.semaphoreGroup.add(this.semaphoreLight),this.sceneryGroup.add(this.semaphoreGroup)}buildEastVillageAndPlaza(){let J=new F0;J.position.set(2.05,0.04,0);let $=new d({color:13621468,map:this.createStoneBrickTexture(),roughness:0.65}),Q=new d({color:4528643,roughness:0.7}),Z=new d({color:16448249,roughness:0.85}),K=new d({color:12730636,roughness:0.5}),W=new d({color:165063,roughness:0.1,metalness:0.2}),X=new d({color:1976635,roughness:0.5,metalness:0.8}),Y=new d({color:16707722,emissive:16498468,emissiveIntensity:1.2}),H=new S(new D0(0.38,0.4,0.012,24),$);H.position.y=0.006,H.receiveShadow=!0,J.add(H);let q=new F0,U=new S(new D0(0.18,0.2,0.07,16),$);U.position.y=0.035,U.castShadow=!0,q.add(U);let F=new S(new D0(0.165,0.165,0.01,16),W);F.position.y=0.065,q.add(F);let V=new S(new D0(0.045,0.06,0.14,12),$);V.position.y=0.13,q.add(V);let G=new S(new D0(0.09,0.1,0.04,12),$);G.position.y=0.19,G.castShadow=!0,q.add(G);let N=new S(new D0(0.08,0.08,0.01,12),W);N.position.y=0.205,q.add(N);let E=new S(new F8(0.02,0.05,8),$);E.position.y=0.24,q.add(E);let O=28,D=new E8,R=new Float32Array(O*3);for(let x=0;x<O;x++){let v=x/O*Math.PI*2,m=0.02+Math.random()*0.05;R[x*3]=Math.cos(v)*m,R[x*3+1]=0.24+Math.random()*0.08,R[x*3+2]=Math.sin(v)*m}D.setAttribute("position",new h8(R,3));let B=new LJ({color:3718648,size:0.022,transparent:!0,opacity:0.85});this.townFountainJet=new X7(D,B),q.add(this.townFountainJet),J.add(q),this.townFountainGroup=J;let z=new F0;z.position.set(0.25,0,0.28),z.rotation.y=-0.55;let C=new S(new t(0.3,0.04,0.22),$);C.position.y=0.02,z.add(C);let L=new S(new t(0.28,0.14,0.2),Z);L.position.y=0.11,L.castShadow=!0,z.add(L);let A=new S(new t(0.32,0.022,0.14),K);A.position.set(0,0.21,-0.05),A.rotation.x=0.65,A.castShadow=!0,z.add(A);let _=new S(new t(0.32,0.022,0.14),K);_.position.set(0,0.21,0.05),_.rotation.x=-0.65,_.castShadow=!0,z.add(_);let I=new d({color:14251782,roughness:0.6}),k=new S(new t(0.12,0.015,0.06),I);k.position.set(0,0.13,0.125),k.rotation.x=0.35,z.add(k);let b=new W8({color:16707722}),s=new S(new X9(0.08,0.05),b);s.position.set(0,0.09,0.102),z.add(s),J.add(z),[[-0.18,0.14],[-0.18,-0.14]].forEach(([x,v])=>{let m=new F0;m.position.set(x,0,v);let o=new S(new D0(0.008,0.012,0.24,8),X);o.position.y=0.12,o.castShadow=!0,m.add(o);let p=new S(new T8(0.022,0),Y);p.position.y=0.25,m.add(p),J.add(m)});let a=new S(new t(0.14,0.035,0.045),Q);a.position.set(0.08,0.025,-0.22),a.rotation.y=-0.3,a.castShadow=!0,J.add(a),this.sceneryGroup.add(J)}buildBioluminescentFireflies(){this.firefliesGroup=new F0,this.fireflies=[];let J=new V8(0.007,6,6),$=new W8({color:13434624,transparent:!0,opacity:this.isNightMode?0.85:0});[[-0.15,0.08,-0.45],[0.12,0.12,-0.35],[-0.05,0.1,-0.2],[0.22,0.09,-0.15],[-0.25,0.14,0.1],[0.08,0.11,0.25],[-0.18,0.09,0.38],[0.15,0.13,0.42],[-1.5,0.12,0.2],[-1.3,0.16,-0.15],[-1.65,0.18,-0.1],[-1.2,0.11,0.3],[-1.45,0.14,-0.35],[-1.1,0.1,-0.1],[-1.55,0.2,0.1],[-1.35,0.15,0.12],[1.35,0.12,0.35],[1.5,0.15,0.1],[1.25,0.14,-0.2],[1.4,0.11,-0.3],[1.1,0.1,0.25],[1.2,0.16,0.5],[0.95,0.12,0.15],[1.45,0.13,0.05]].forEach(([Z,K,W],X)=>{let Y=new S(J,$.clone());Y.position.set(Z,K,W),this.firefliesGroup.add(Y),this.fireflies.push({mesh:Y,baseX:Z,baseY:K,baseZ:W,speed:0.6+X%5*0.25,phase:X*0.75,radius:0.035+X%3*0.02})}),this.sceneryGroup.add(this.firefliesGroup)}triggerWindmillSpin(){if(!this.windmillSails)return;if(this.windmillCurrentSpeed=0.075,this.audio.playWindmillSpin(),this.windmillGroup)C0.to(this.windmillGroup.scale,{y:1.08,duration:0.15,yoyo:!0,repeat:1,ease:"power1.out"})}triggerWaterwheelSpin(){if(!this.waterwheel)return;if(this.audio.playWaterwheel(),this.triggerSplash(0,0.035,-0.73),this.watermillGroup)C0.to(this.watermillGroup.scale,{y:1.06,duration:0.12,yoyo:!0,repeat:1,ease:"power1.out"})}triggerSemaphoreToggle(){if(!this.semaphoreArm)return;this.semaphoreIsRaised=!this.semaphoreIsRaised;let J=this.semaphoreIsRaised?Math.PI*0.25:0;if(C0.to(this.semaphoreArm.rotation,{z:J,duration:0.35,ease:"back.out(1.8)"}),this.semaphoreLight)this.semaphoreLight.color.set(this.semaphoreIsRaised?1096065:14427686);this.audio.playSwitchClick()}triggerCottageChimney(){if(!this.cottageGroup)return;this.audio.playSteamChuff(!1),this.triggerTelegraphPing(this.cottageGroup)}buildLevelCrossingAndTelegraph(){let J=new F0;J.position.set(-0.45,0,0.82);let $=new S(new D0(0.016,0.018,0.38,8),new d({color:3359061,metalness:0.6}));$.position.y=0.19,$.castShadow=!0,J.add($);let Q=new d({color:16777215}),Z=new S(new t(0.16,0.026,0.008),Q);Z.position.set(0,0.34,0.015),Z.rotation.z=Math.PI*0.25,J.add(Z);let K=new S(new t(0.16,0.026,0.008),Q);K.position.set(0,0.34,0.015),K.rotation.z=-Math.PI*0.25,J.add(K);let W=new W8({color:15680580});this.crossingLamp1=new S(new V8(0.022,8,8),W),this.crossingLamp1.position.set(-0.05,0.27,0.022),J.add(this.crossingLamp1),this.crossingLight1=new j8(15680580,0.8,0.8),this.crossingLight1.position.copy(this.crossingLamp1.position),J.add(this.crossingLight1),this.crossingLamp2=new S(new V8(0.022,8,8),W),this.crossingLamp2.position.set(0.05,0.27,0.022),J.add(this.crossingLamp2),this.crossingLight2=new j8(15680580,0.2,0.8),this.crossingLight2.position.copy(this.crossingLamp2.position),J.add(this.crossingLight2),this.sceneryGroup.add(J);let X=[[-1.2,1.45],[-0.45,1.35],[0.45,-1.35],[1.2,-1.45]],Y=new d({color:7877903,roughness:0.8});X.forEach(([H,q])=>{let U=new F0;U.position.set(H,0,q);let F=new S(new D0(0.018,0.024,0.44,6),Y);F.position.y=0.22,F.castShadow=!0,U.add(F);let V=new S(new t(0.16,0.016,0.016),Y);V.position.y=0.4,U.add(V);let G=new d({color:16777215,roughness:0.2});[-0.06,0.06].forEach((N)=>{let E=new S(new D0(0.008,0.008,0.02,6),G);E.position.set(N,0.415,0),U.add(E)}),this.sceneryGroup.add(U),this.interactivePoles.push(U)})}getApproxDistanceToTrack(J,$){let Q=1/0,Z=140;for(let K=0;K<Z;K++){let W=K/Z*Math.PI*2,X=Math.sin(W)*3.3,Y=Math.sin(2*W)*1.6,H=Math.hypot(X-J,Y-$);if(H<Q)Q=H}return Q}buildLushNatureAndFlock(){let J=[{x:-2.75,z:0.1,type:"deciduous",col:1409085,scale:1.1},{x:-2.6,z:-0.35,type:"pine",col:1467700,scale:1.2},{x:-2.8,z:-0.1,type:"deciduous",col:2278750,scale:1},{x:-1.75,z:-0.55,type:"pine",col:1332013,scale:1.15},{x:-1.45,z:0.45,type:"deciduous",col:6660877,scale:1.05},{x:-1.15,z:-0.3,type:"pine",col:1409085,scale:0.95},{x:2.75,z:0.1,type:"deciduous",col:1409085,scale:1.1},{x:2.6,z:-0.45,type:"pine",col:1467700,scale:1.2},{x:2.8,z:-0.1,type:"deciduous",col:2278750,scale:1},{x:1.75,z:0.5,type:"pine",col:1332013,scale:1.15},{x:1.45,z:-0.45,type:"deciduous",col:6660877,scale:1.05},{x:1.15,z:0.3,type:"pine",col:1409085,scale:0.95}],$=new d({color:7877903,roughness:0.7});J.forEach(({x:G,z:N,type:E,col:O,scale:D})=>{let R=new F0;R.position.set(G,0,N),R.scale.setScalar(D);let B=new S(new D0(0.026,0.034,0.16,6),$);B.position.y=0.08,B.castShadow=!0,R.add(B);let z=new d({color:O,roughness:0.5});if(E==="pine"){let C=new S(new F8(0.18,0.22,6),z);C.position.y=0.22,C.castShadow=!0,R.add(C);let L=new S(new F8(0.13,0.18,6),z);L.position.y=0.32,L.castShadow=!0,R.add(L);let A=new S(new F8(0.08,0.13,6),z);A.position.y=0.41,A.castShadow=!0,R.add(A)}else{let C=new S(new T8(0.18,1),z);C.position.set(0,0.25,0),C.castShadow=!0,R.add(C);let L=new S(new T8(0.13,1),z);L.position.set(0.04,0.35,0.02),L.castShadow=!0,R.add(L)}this.interactiveTrees.push(R),this.sceneryGroup.add(R)});let Q=new d({color:16317180,roughness:0.9}),Z=new d({color:1976635,roughness:0.5});[[-1.85,0.04,0.35],[-2.2,0.04,0.38],[-2.35,0.04,-0.15],[1.75,0.04,-0.15],[2.15,0.04,-0.4]].forEach(([G,N,E])=>{let O=new F0;O.position.set(G,N,E);let D=new S(new T8(0.045,1),Q);D.position.y=0.045,D.scale.set(1.2,0.9,0.9),O.add(D);let R=new S(new V8(0.022,6,6),Z);R.position.set(0.05,0.05,0),O.add(R),this.interactiveSheep.push(O),this.sceneryGroup.add(O)});let W=new F0;W.position.set(-1.62,0.04,-0.22);let X=new d({color:11817737,roughness:0.85}),Y=new d({color:16710083,roughness:0.35}),H=new S(new t(0.12,0.08,0.07),X);H.position.y=0.055,W.add(H);let q=new S(new t(0.06,0.06,0.06),X);q.position.set(0.08,0.075,0),W.add(q);let U=new S(new F8(0.012,0.05,5),Y);U.rotation.z=-Math.PI*0.35,U.position.set(0.08,0.11,0.035),W.add(U);let F=new S(new F8(0.012,0.05,5),Y);F.rotation.z=-Math.PI*0.35,F.position.set(0.08,0.11,-0.035),W.add(F),this.interactiveSheep.push(W),this.sceneryGroup.add(W);let V=[15680580,16436245,16777215,11032055];for(let G=0;G<48;G++){let N=G%2===0?-1.15:1.15,E=0.22+G%5*0.14,O=G*1.35,D=N+Math.cos(O)*E,R=Math.sin(O)*E;if(this.getApproxDistanceToTrack(D,R)<0.35)continue;let B=V[G%V.length],z=new W8({color:B}),C=new S(new V8(0.016,6,6),z);C.position.set(D,0.04,R),this.sceneryGroup.add(C)}}buildArticulatedTrain(){let J=new F0,$=new d({color:10033947,roughness:0.35}),Q=new S(new t(0.38,0.04,0.18),$);Q.position.y=0.05,Q.castShadow=!0,J.add(Q);let Z=new S(new F8(0.1,0.08,4),new d({color:12131356}));Z.rotation.y=Math.PI*0.25,Z.rotation.x=-Math.PI*0.5,Z.position.set(0.2,0.045,0),Z.castShadow=!0,J.add(Z);let K=new d({color:292951,roughness:0.25,metalness:0.12}),W=new S(new D0(0.075,0.075,0.22,16),K);W.rotation.z=Math.PI*0.5,W.position.set(0.07,0.125,0),W.castShadow=!0,J.add(W);let X=new S(new V8(0.074,12,12),K);X.position.set(0.18,0.125,0),X.castShadow=!0,J.add(X);let Y=new d({color:16096779,metalness:0.8,roughness:0.25});[-0.01,0.06,0.14].forEach(($0)=>{let U0=new S(new p9(0.076,0.006,8,16),Y);U0.rotation.y=Math.PI*0.5,U0.position.set($0,0.125,0),J.add(U0)});let H=new d({color:1976635,roughness:0.4}),q=new S(new D0(0.024,0.018,0.08,8),H);q.position.set(0.13,0.22,0),q.castShadow=!0,J.add(q);let U=new S(new p9(0.024,0.005,6,12),Y);U.rotation.x=Math.PI*0.5,U.position.set(0.13,0.26,0),J.add(U);let F=new S(new V8(0.032,10,10),Y);F.position.set(0.02,0.21,0),F.castShadow=!0,J.add(F);let V=new d({color:417606,roughness:0.3}),G=new S(new t(0.16,0.16,0.176),V);G.position.set(-0.1,0.15,0),G.castShadow=!0,J.add(G);let N=new S(new t(0.18,0.025,0.19),Y);N.position.set(-0.1,0.24,0),N.castShadow=!0,J.add(N);let E=new W8({color:16707722}),O=new S(new X9(0.06,0.06),E);O.position.set(-0.1,0.16,0.089),J.add(O);let D=new S(new X9(0.06,0.06),E);D.rotation.y=Math.PI,D.position.set(-0.1,0.16,-0.089),J.add(D);let R=new S(new D0(0.034,0.028,0.044,16),Y);R.rotation.z=Math.PI*0.5,R.position.set(0.2,0.14,0),R.castShadow=!0,J.add(R);let B=new S(new p9(0.034,0.005,8,16),Y);B.rotation.y=Math.PI*0.5,B.position.set(0.222,0.14,0),J.add(B);let z=new d({color:16777215,metalness:0.95,roughness:0.08}),C=new S(new F8(0.028,0.022,16,1,!0),z);C.rotation.z=-Math.PI*0.5,C.position.set(0.21,0.14,0),J.add(C);let L=new d({color:16776171,emissive:16707722,emissiveIntensity:3.2,roughness:0.1}),A=new S(new V8(0.013,8,8),L);A.position.set(0.218,0.14,0),J.add(A);let _=new d({color:16772565,emissive:16707722,emissiveIntensity:1.5,roughness:0.1,metalness:0.2,transparent:!0,opacity:0.85}),I=new S(new V8(0.031,12,12,0,Math.PI*2,0,Math.PI*0.5),_);I.rotation.z=-Math.PI*0.5,I.position.set(0.222,0.14,0),J.add(I),this.headlampLight=new j8(16707722,1.8,1.2),this.headlampLight.position.set(0.26,0.14,0),J.add(this.headlampLight),this.headlampSpotLight=new RZ(16775149,2.2,2,Math.PI*0.16,0.85,1.4),this.headlampSpotLight.position.set(0.23,0.14,0);let k=new D8;k.position.set(0.85,0.04,0),J.add(k),this.headlampSpotLight.target=k,J.add(this.headlampSpotLight);let b=new D0(0.024,0.09,0.46,24,1,!0);b.translate(0,-0.23,0),b.rotateZ(Math.PI*0.5),b.rotateY(-0.06);let s=new W8({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.32,blending:Z7,side:g9,depthWrite:!1});this.headlampBeam=new S(b,s),this.headlampBeam.position.set(0.22,0.14,0),this.headlampBeam.visible=!1,J.add(this.headlampBeam);let a=new D0(0.012,0.042,0.28,16,1,!0);a.translate(0,-0.14,0),a.rotateZ(Math.PI*0.5),a.rotateY(-0.06);let x=new W8({map:this.createVolumetricBeamTexture(),transparent:!0,opacity:0.38,blending:Z7,side:g9,depthWrite:!1});this.headlampCoreBeam=new S(a,x),this.headlampCoreBeam.position.set(0.22,0.14,0),this.headlampCoreBeam.visible=!1,J.add(this.headlampCoreBeam);let v=new W8({map:this.createHeadlampPoolTexture(),transparent:!0,opacity:0.45,blending:Z7,depthWrite:!1});this.headlampTrackPool=new S(new X9(0.24,0.44),v),this.headlampTrackPool.rotation.x=-Math.PI*0.5,this.headlampTrackPool.rotation.z=-Math.PI*0.5,this.headlampTrackPool.position.set(0.4,0.058,0),this.headlampTrackPool.visible=!1,J.add(this.headlampTrackPool);let m=new d({color:16096779,metalness:0.85,roughness:0.2}),o=new S(new D0(0.032,0.038,0.045,12),m);o.position.set(0.04,0.175,0),o.castShadow=!0,J.add(o);let p=new S(new D0(0.006,0.006,0.035,6),m);p.position.set(-0.03,0.19,0.03),J.add(p);let h=new d({color:988970,roughness:0.45,metalness:0.4}),c=new S(new D0(0.072,0.072,0.012,16),h);c.rotation.z=Math.PI*0.5,c.position.set(0.186,0.125,0),c.castShadow=!0,J.add(c);let J0=new S(new D0(0.024,0.024,0.006,12),m);J0.rotation.z=Math.PI*0.5,J0.position.set(0.193,0.125,0),J.add(J0);let f=new d({color:1976635,roughness:0.35,metalness:0.7});[-0.102,0.102].forEach(($0)=>{let U0=new S(new D0(0.026,0.026,0.088,12),f);U0.rotation.z=Math.PI*0.5,U0.position.set(0.09,0.045,$0),U0.castShadow=!0,J.add(U0);let R0=new S(new D0(0.01,0.01,0.05,8),m);R0.rotation.z=Math.PI*0.5,R0.position.set(0.035,0.045,$0),J.add(R0)});let e=new W8({color:16347926}),Z0=new S(new t(0.045,0.05,0.01),e);Z0.position.set(-0.02,0.1,0),J.add(Z0);let W0=new j8(16347926,0.8,0.6);W0.position.set(-0.04,0.12,0),J.add(W0);let G0=new d({color:1976635,metalness:0.8,roughness:0.4}),S0=new S(new t(0.04,0.016,0.024),G0);S0.position.set(-0.19,0.048,0),J.add(S0),this.attachWheels(J,[[0.08,0.045,0.09],[-0.08,0.045,0.09],[0.08,0.045,-0.09],[-0.08,0.045,-0.09]],0.045);let x0=new d({color:13948120,metalness:0.85,roughness:0.2}),_0=new t(0.18,0.01,0.006);this.leftSideRod=new S(_0,x0),this.leftSideRod.position.set(0,0.045,0.104),this.leftSideRod.castShadow=!0,J.add(this.leftSideRod),this.rightSideRod=new S(_0,x0),this.rightSideRod.position.set(0,0.045,-0.104),this.rightSideRod.castShadow=!0,J.add(this.rightSideRod),this.locoCar=J,this.trainGroup.add(this.locoCar);let m0=new F0,g=new d({color:3359061,roughness:0.5}),q8=new S(new t(0.24,0.11,0.17),g);q8.position.y=0.095,q8.castShadow=!0,m0.add(q8);let d0=new d({color:988970,roughness:0.9}),L0=new S(new T8(0.08,1),d0);L0.position.set(0,0.14,0),L0.scale.set(1.2,0.6,0.85),L0.castShadow=!0,m0.add(L0);let P0=new S(new t(0.04,0.016,0.024),G0);P0.position.set(0.13,0.048,0),m0.add(P0);let f0=new S(new t(0.04,0.016,0.024),G0);f0.position.set(-0.13,0.048,0),m0.add(f0),this.attachWheels(m0,[[0.065,0.038,0.088],[-0.065,0.038,0.088],[0.065,0.038,-0.088],[-0.065,0.038,-0.088]],0.038),this.tenderCar=m0,this.trainGroup.add(this.tenderCar);let k0=new F0,j0=new d({color:14251782,roughness:0.3}),T=new S(new t(0.36,0.14,0.176),j0);T.position.y=0.11,T.castShadow=!0,k0.add(T);let M=new d({color:16777215,roughness:0.3}),l=new S(new t(0.38,0.028,0.19),M);l.position.y=0.19,l.castShadow=!0,k0.add(l);let X0=new S(new t(0.3,0.022,0.11),M);X0.position.y=0.21,X0.castShadow=!0,k0.add(X0);let Q0=new d({color:1976635,metalness:0.8,roughness:0.4});[-0.19,0.19].forEach(($0)=>{let U0=new S(new t(0.04,0.012,0.15),Q0);U0.position.set($0,0.046,0),k0.add(U0);let R0=new S(new t(0.01,0.045,0.15),Q0);R0.position.set($0,0.072,0),k0.add(R0)}),this.coachWindowMat=new d({color:16707722,emissive:0,emissiveIntensity:0,roughness:0.1}),[-0.1,0,0.1].forEach(($0)=>{let U0=new S(new X9(0.055,0.055),this.coachWindowMat);U0.position.set($0,0.125,0.089),k0.add(U0);let R0=new S(new X9(0.055,0.055),this.coachWindowMat);R0.rotation.y=Math.PI,R0.position.set($0,0.125,-0.089),k0.add(R0)}),this.coachInteriorLight1=new j8(16707722,0,1.2),this.coachInteriorLight1.position.set(-0.06,0.125,0),k0.add(this.coachInteriorLight1),this.coachInteriorLight2=new j8(16707722,0,1.2),this.coachInteriorLight2.position.set(0.06,0.125,0),k0.add(this.coachInteriorLight2);let Y0=new S(new t(0.04,0.016,0.024),G0);Y0.position.set(0.19,0.048,0),k0.add(Y0);let T0=new S(new t(0.04,0.016,0.024),G0);T0.position.set(-0.19,0.048,0),k0.add(T0),this.attachWheels(k0,[[0.1,0.038,0.088],[-0.1,0.038,0.088],[0.1,0.038,-0.088],[-0.1,0.038,-0.088]],0.038),this.coachCar=k0,this.trainGroup.add(this.coachCar);let q0=new F0,z0=new d({color:12456508,roughness:0.35}),M0=new S(new t(0.3,0.13,0.176),z0);M0.position.y=0.105,M0.castShadow=!0,q0.add(M0);let v0=new S(new t(0.12,0.07,0.14),z0);v0.position.set(-0.02,0.2,0),v0.castShadow=!0,q0.add(v0);let K0=new S(new t(0.14,0.018,0.16),M);K0.position.set(-0.02,0.245,0),q0.add(K0);let G8=new W8({color:16707722});[-0.072,0.072].forEach(($0)=>{let U0=new S(new X9(0.06,0.035),G8);if(U0.position.set(-0.02,0.2,$0),$0<0)U0.rotation.y=Math.PI;q0.add(U0)});let p0=new S(new t(0.05,0.012,0.15),G0);p0.position.set(-0.175,0.046,0),q0.add(p0);let y0=new S(new t(0.01,0.045,0.15),m);y0.position.set(-0.195,0.072,0),q0.add(y0);let B0=new S(new t(0.04,0.016,0.024),G0);B0.position.set(0.16,0.048,0),q0.add(B0);let j=new S(new V8(0.024,8,8),new W8({color:15680580}));j.position.set(-0.16,0.12,0),q0.add(j),this.tailLight=new j8(15680580,0.8,1.2),this.tailLight.position.set(-0.2,0.12,0),q0.add(this.tailLight),this.attachWheels(q0,[[0.08,0.038,0.088],[-0.08,0.038,0.088],[0.08,0.038,-0.088],[-0.08,0.038,-0.088]],0.038),this.cabooseCar=q0,this.trainGroup.add(this.cabooseCar);for(let $0=0;$0<16;$0++){let U0=new S(new T8(0.036+$0%3*0.014,1),new d({color:16777215,roughness:0.1,transparent:!0,opacity:0,depthWrite:!1}));U0.visible=!1,U0.position.set(0,-100,0),this.rootGroup.add(U0),this.steamParticles.push({mesh:U0,life:0,vx:0,vy:0,vz:0})}}attachWheels(J,$,Q){let Z=new d({color:1976635,metalness:0.75,roughness:0.25}),K=new d({color:14251782,metalness:0.85,roughness:0.25}),W=new d({color:14251782,metalness:0.55,roughness:0.35}),X=new D0(Q,Q,0.018,20);X.rotateX(Math.PI*0.5);let Y=new D0(Q*0.36,Q*0.36,0.024,12);Y.rotateX(Math.PI*0.5);let H=new t(Q*1.6,Q*0.2,0.02),q=new t(Q*0.2,Q*1.6,0.02);$.forEach(([U,F,V])=>{let G=new S(X,Z);G.position.set(U,F,V),G.castShadow=!0;let N=new S(Y,K);G.add(N);let E=new S(H,W);G.add(E);let O=new S(q,W);G.add(O),J.add(G),this.rotatingWheels.push(G)})}buildAlpineMountainRidge(){let J=new F0,$=new d({color:4674921,roughness:0.88,flatShading:!0}),Q=new d({color:16317180,roughness:0.35,emissive:16777215,emissiveIntensity:0.08,flatShading:!0}),Z=new d({color:1332013,roughness:0.65}),K=new d({color:4528643,roughness:0.8}),W=new d({color:3359061,roughness:0.9,flatShading:!0}),X=new d({color:6583435,roughness:0.82,flatShading:!0}),Y=-1.35,H=-2.95,q=1.6,U=2.75,F=0.96,V=8;Q.polygonOffset=!0,Q.polygonOffsetFactor=-1,Q.polygonOffsetUnits=-1;let G=new S(new F8(1.6,2.75,8,1),$);G.position.set(-1.35,1.155,-2.95),G.rotation.y=0.4,G.receiveShadow=!0,G.castShadow=!0,J.add(G);let N=new S(new F8(0.5864727272727274,0.96,8,1),Q);N.position.set(-1.35,2.06,-2.95),N.rotation.y=G.rotation.y,N.receiveShadow=!0,J.add(N),[{x:-2.8,z:-2.3,s:0.18},{x:-2.3,z:-2,s:0.22},{x:-1.1,z:-2.1,s:0.16},{x:0.4,z:-2.4,s:0.2},{x:-0.1,z:-2.5,s:0.15}].forEach((D)=>{let R=new S(new T8(D.s,0),X);R.position.set(D.x,0.08,D.z),R.rotation.set(0.4,0.7,0.2),R.castShadow=!0,R.receiveShadow=!0,J.add(R)}),[[-2.9,-2.4],[-2.5,-2.2],[-2.1,-2.1],[-1.4,-2.3],[-0.8,-2.2],[-0.2,-2.4],[0.3,-2.6],[-3.1,-3],[-2.6,-3.4],[-1,-3.3],[0.6,-3.2]].forEach(([D,R],B)=>{let z=new F0;z.position.set(D,0,R);let C=0.75+B%3*0.18;z.scale.setScalar(C);let L=new S(new D0(0.02,0.03,0.14,5),K);L.position.y=0.07,z.add(L);let A=new S(new F8(0.14,0.24,6),Z);A.position.y=0.22,A.castShadow=!0,z.add(A);let _=new S(new F8(0.1,0.18,6),Z);_.position.y=0.33,z.add(_),J.add(z)}),this.alpineRidgeGroup=J,this.sceneryGroup.add(this.alpineRidgeGroup)}buildCampsiteAndCampfire(){let J=new F0;J.position.set(-1.3,0.04,-2.1);let $=new F0;$.position.set(-0.16,0,0.08),$.rotation.y=0.42;let Q=new d({color:16096779,roughness:0.6,side:g9}),Z=new D0(0.11,0.11,0.24,3,1,!1),K=new S(Z,Q);K.rotation.z=Math.PI*0.5,K.rotation.y=Math.PI*0.5,K.position.y=0.08,K.castShadow=!0,$.add(K);let W=new W8({color:4528643}),X=new S(new g7(0.05,3),W);X.position.set(0,0.055,0.121),$.add(X),J.add($);let Y=new F0;Y.position.set(0.15,0,0.1),Y.rotation.y=-0.65;let H=new d({color:1981066,roughness:0.6,side:g9}),q=new S(Z,H);q.rotation.z=Math.PI*0.5,q.rotation.y=Math.PI*0.5,q.position.y=0.08,q.castShadow=!0,Y.add(q),J.add(Y);let U=new F0;U.position.set(0,0,-0.1);let F=new d({color:7893356,roughness:0.8});for(let z=0;z<8;z++){let C=z/8*Math.PI*2,L=new S(new T8(0.035,1),F);L.position.set(Math.cos(C)*0.14,0.02,Math.sin(C)*0.14),U.add(L)}let V=new d({color:7877903,roughness:0.85});for(let z=0;z<3;z++){let C=new S(new D0(0.02,0.022,0.2,6),V);C.rotation.z=Math.PI*0.5,C.rotation.y=z*Math.PI/3,C.position.y=0.025,U.add(C)}let G=new W8({color:16347926}),N=new S(new F8(0.07,0.18,7),G);N.position.y=0.1,U.add(N),this.campfireFlame=N;let E=new W8({color:16707722}),O=new S(new F8(0.035,0.11,7),E);O.position.y=0.08,U.add(O),this.campfireLight=new j8(16347926,1.4,1.8),this.campfireLight.position.set(0,0.18,0),U.add(this.campfireLight);let D=20,R=new E8;this.campfireParticlePos=new Float32Array(D*3);for(let z=0;z<D;z++)this.campfireParticlePos[z*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[z*3+1]=0.06+Math.random()*0.22,this.campfireParticlePos[z*3+2]=(Math.random()-0.5)*0.12;R.setAttribute("position",new h8(this.campfireParticlePos,3));let B=new LJ({color:16498468,size:0.03,transparent:!0,blending:Z7,opacity:0.85});this.campfireParticles=new X7(R,B),U.add(this.campfireParticles),J.add(U),this.campsiteGroup=J,this.sceneryGroup.add(this.campsiteGroup)}buildRailwayWaterTower(){let J=new F0;J.position.set(1.65,0.04,-2.35);let $=new d({color:7877903,roughness:0.75}),Q=new d({color:9584654,roughness:0.65}),Z=new d({color:1976635,roughness:0.4,metalness:0.7}),K=new d({color:11817737,roughness:0.6}),W=0.48,X=0.04,Y=0.22;[[-Y,-Y],[Y,-Y],[-Y,Y],[Y,Y]].forEach(([L,A])=>{let _=new S(new t(X,W,X),$);_.position.set(L,W*0.5,A),_.castShadow=!0,J.add(_)});let H=new S(new t(Y*2+0.12,0.04,Y*2+0.12),$);H.position.y=W,H.castShadow=!0,J.add(H);let q=0.42,U=0.28,F=new S(new D0(U,U,q,16),Q);F.position.y=W+q*0.5+0.02,F.castShadow=!0,J.add(F),[-0.14,0,0.14].forEach((L)=>{let A=new S(new p9(U+0.006,0.009,6,20),Z);A.rotation.x=Math.PI*0.5,A.position.y=F.position.y+L,J.add(A)});let V=new S(new F8(U+0.06,0.22,16),K);V.position.y=F.position.y+q*0.5+0.11,V.castShadow=!0,J.add(V);let G=new S(new V8(0.03,8,8),Z);G.position.y=V.position.y+0.13,J.add(G);let N=new F0;N.position.set(-0.28,W+0.24,0),N.rotation.y=-Math.PI*0.5,N.rotation.x=0.25;let E=new d({color:3359061,roughness:0.5,metalness:0.4}),O=new S(new D0(0.035,0.055,0.32,12),E);O.rotation.x=Math.PI*0.5,O.position.z=0.16,N.add(O);let D=new S(new V8(0.04,8,8),Z);D.position.set(0,0.12,0.05),N.add(D),J.add(N),this.waterTowerSpout=N;let R=35,B=new E8,z=new Float32Array(R*3);for(let L=0;L<R;L++)z[L*3]=(Math.random()-0.5)*0.06,z[L*3+1]=-Math.random()*0.35,z[L*3+2]=0.3+(Math.random()-0.5)*0.06;B.setAttribute("position",new h8(z,3));let C=new LJ({color:3718648,size:0.035,transparent:!0,opacity:0.75});this.waterSprayPoints=new X7(B,C),this.waterSprayPoints.position.copy(N.position),this.waterSprayPoints.visible=!1,J.add(this.waterSprayPoints),this.waterTowerGroup=J,this.sceneryGroup.add(this.waterTowerGroup)}buildRailwayServiceDepot(){let J=new F0;J.position.set(1.7,0.04,-2.1);let $=new d({color:6583435,roughness:0.8}),Q=new d({color:4528643,roughness:0.7}),Z=new d({color:4674921,metalness:0.8,roughness:0.35}),K=new d({color:1976635,metalness:0.9,roughness:0.25}),W=new d({color:592399,roughness:0.95}),X=new d({color:165063,metalness:0.7,roughness:0.3}),Y=new F0,H=new S(new t(0.38,0.03,0.28),$);H.position.y=0.015,Y.add(H),[-0.16,0.16].forEach((D)=>{[-0.12,0.12].forEach((R)=>{let B=new S(new t(0.02,0.18,0.02),Q);B.position.set(D,0.1,R),B.castShadow=!0,Y.add(B)})});let q=new S(new t(0.42,0.016,0.16),Z);q.position.set(0,0.23,-0.06),q.rotation.x=0.45,q.castShadow=!0,Y.add(q);let U=new S(new t(0.42,0.016,0.16),Z);U.position.set(0,0.23,0.06),U.rotation.x=-0.45,U.castShadow=!0,Y.add(U);let F=new S(new t(0.34,0.16,0.015),Q);F.position.set(0,0.1,-0.12),Y.add(F);let V=new S(new t(0.18,0.07,0.06),Q);V.position.set(0,0.045,-0.08),V.castShadow=!0,Y.add(V);let G=new S(new t(0.05,0.025,0.03),K);G.position.set(0.04,0.09,-0.08),Y.add(G),J.add(Y);let N=new F0;N.position.set(-0.28,0,0.05);let E=new S(new t(0.18,0.09,0.16),Q);E.position.y=0.045,E.castShadow=!0,N.add(E);let O=new S(new T8(0.07,1),W);O.position.set(0,0.08,0),O.scale.set(1.1,0.6,0.9),O.castShadow=!0,N.add(O),J.add(N),[[-0.24,0,-0.1],[-0.29,0,-0.08]].forEach(([D,R,B])=>{let z=new S(new D0(0.026,0.026,0.08,10),X);z.position.set(D,0.04,B),z.castShadow=!0,J.add(z)}),this.depotShedGroup=J,this.sceneryGroup.add(this.depotShedGroup)}buildHotAirBalloon(){let J=new F0;J.position.set(1.6,2.7,0.6);let $=new d({color:14753096,roughness:0.45}),Q=new d({color:16498468,roughness:0.45}),Z=new d({color:889992,roughness:0.45}),K=new V8(0.42,24,16,0,Math.PI*2,0,Math.PI*0.65),W=new S(K,$);J.add(W);let X=new p9(0.4,0.03,8,24),Y=new S(X,Q);Y.rotation.x=Math.PI*0.5,Y.position.y=-0.05,J.add(Y);let H=new D0(0.39,0.16,0.34,24,1,!0),q=new S(H,Z);q.position.y=-0.22,J.add(q);let U=new d({color:4674921,metalness:0.8,roughness:0.3}),F=new S(new p9(0.08,0.015,6,16),U);F.rotation.x=Math.PI*0.5,F.position.y=-0.42,J.add(F);let V=new W8({color:16347926}),G=new S(new F8(0.06,0.14,8),V);G.position.y=-0.4,J.add(G),this.balloonBurnerFlame=G,this.balloonBurnerLight=new j8(16347926,0.5,2.2),this.balloonBurnerLight.position.y=-0.4,J.add(this.balloonBurnerLight);let N=new v7({color:7877903}),E=[new w(-0.15,-0.38,-0.15),new w(-0.08,-0.62,-0.08),new w(0.15,-0.38,-0.15),new w(0.08,-0.62,-0.08),new w(-0.15,-0.38,0.15),new w(-0.08,-0.62,0.08),new w(0.15,-0.38,0.15),new w(0.08,-0.62,0.08)],O=new E8().setFromPoints(E),D=new i$(O,N);J.add(D);let R=new d({color:14251782,roughness:0.85}),B=new S(new t(0.18,0.14,0.18),R);B.position.y=-0.69,B.castShadow=!0,J.add(B),this.hotAirBalloonGroup=J,this.celestialGroup.add(this.hotAirBalloonGroup)}buildMiniatureVillageLife(){let J=new F0,$=new d({color:7877903,roughness:0.75}),Q=new d({color:9741240,roughness:0.85}),Z=new F0;Z.position.set(0.1,0.04,1.38),Z.rotation.y=0.35;let K=new S(new t(0.14,0.012,0.045),$);K.position.y=0.038,K.castShadow=!0,Z.add(K);let W=new S(new t(0.14,0.045,0.01),$);W.position.set(0,0.065,-0.02),W.castShadow=!0,Z.add(W),[-0.055,0.055].forEach((L)=>{let A=new S(new t(0.012,0.038,0.04),Q);A.position.set(L,0.019,0),Z.add(A)}),J.add(Z);let X=new d({color:1976635,roughness:0.6,metalness:0.8}),Y=new d({color:16707722,emissive:16498468,emissiveIntensity:0.85,roughness:0.2});[[-0.26,0.04,1.38],[0.26,0.04,1.38]].forEach(([L,A,_])=>{let I=new F0;I.position.set(L,A,_);let k=new S(new D0(0.01,0.014,0.26,8),X);k.position.y=0.13,k.castShadow=!0,I.add(k);let b=new S(new T8(0.024,0),Y);b.position.y=0.27,I.add(b),J.add(I)});let q=new d({color:15680580,roughness:0.5}),U=new d({color:16436245,roughness:0.5}),F=new d({color:6333946,roughness:0.5}),V=new d({color:12616956,roughness:0.5}),G=new d({color:1409085,roughness:0.8}),N=[[-0.75,0.3],[-0.82,0.35],[-0.7,0.25],[-0.62,0.32],[0.68,0.25],[0.74,0.32],[0.62,0.2],[0.8,0.22],[-0.45,-0.45],[-0.5,-0.4],[-0.38,-0.48]],E=[q,U,F,V];N.forEach(([L,A],_)=>{if(this.getApproxDistanceToTrack(L,A)<0.45)return;let I=new S(new D0(0.003,0.004,0.04,4),G);I.position.set(L,0.06,A),J.add(I);let k=E[_%E.length],b=new S(new T8(0.014,0),k);b.position.set(L,0.082,A),J.add(b)});let O=[16638023,3718648,16486972,12616956];[new w(-0.72,0.14,0.3),new w(0.7,0.15,0.26),new w(-0.45,0.12,-0.42),new w(-1.1,0.16,0.25)].forEach((L,A)=>{let _=new F0;_.position.copy(L);let I=new W8({color:O[A%O.length],side:g9}),k=new X9(0.016,0.024),b=new S(k,I);b.position.x=-0.009,b.rotation.y=Math.PI*0.5,_.add(b);let s=new S(k,I);s.position.x=0.009,s.rotation.y=-Math.PI*0.5,_.add(s),J.add(_),this.butterflies.push({mesh:_,basePos:L.clone(),phase:A*1.5,speed:0.8+A*0.2})});let R=new F0;R.position.set(-0.16,0.09,1.25);let B=new S(new t(0.065,0.038,0.04),$);B.position.set(0,0.019,0),B.castShadow=!0,R.add(B);let z=new S(new t(0.05,0.032,0.032),new d({color:10105874,roughness:0.7}));z.position.set(0.005,0.052,0),z.rotation.y=0.15,z.castShadow=!0,R.add(z);let C=new d({color:9741240,roughness:0.35,metalness:0.6});[-0.05,0.06].forEach((L)=>{let A=new S(new D0(0.014,0.016,0.045,8),C);A.position.set(L,0.022,0.03),A.castShadow=!0,R.add(A)}),J.add(R),this.sceneryGroup.add(J)}setupWeatherSystem(){this.rainPositions=new Float32Array(this.rainCount*6),this.rainGeo=new E8;let J=0.18;for(let K=0;K<this.rainCount;K++){let W=(Math.random()-0.5)*5.5,X=Math.random()*3.5,Y=(Math.random()-0.5)*4.5;this.rainPositions[K*6]=W,this.rainPositions[K*6+1]=X,this.rainPositions[K*6+2]=Y,this.rainPositions[K*6+3]=W-0.02,this.rainPositions[K*6+4]=X-J,this.rainPositions[K*6+5]=Y-0.01}this.rainGeo.setAttribute("position",new h8(this.rainPositions,3));let $=new v7({color:9684477,transparent:!0,opacity:0});this.rainStreaks=new i$(this.rainGeo,$),this.weatherGroup.add(this.rainStreaks);let Q=new W8({color:12248829,transparent:!0,opacity:0,side:g9}),Z=new m7(0.01,0.02,12);Z.rotateX(-Math.PI*0.5);for(let K=0;K<20;K++){let W=new S(Z,Q.clone());W.position.set(0,-10,0),this.weatherGroup.add(W),this.splashRipples.push({mesh:W,life:0,maxRadius:0.12})}}setWeather(J){if(this.isRaining=J==="rain",this.rainStreaks){let $=this.isRaining?0.65:0;C0.to(this.rainStreaks.material,{opacity:$,duration:0.8})}this.audio.setRain(this.isRaining)}triggerSplash(J,$,Q){let Z=this.splashRipples.find((K)=>K.life<=0);if(!Z)return;Z.mesh.position.set(J,$+0.005,Q),Z.mesh.scale.setScalar(0.2),Z.mesh.material.opacity=0.6,Z.life=1}bindEvents(){window.addEventListener("resize",()=>{let J=this.container.clientWidth,$=this.container.clientHeight;if(J===0||$===0)return;this.camera.aspect=J/$,this.camera.updateProjectionMatrix(),this.renderer.setSize(J,$)}),this.container.addEventListener("pointerdown",(J)=>{let $=this.container.getBoundingClientRect();if(this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera),this.raycaster.intersectObjects([this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],!0).length>0){this.triggerWhistleHop();return}if(this.clockTowerGroup){if(this.raycaster.intersectObject(this.clockTowerGroup,!0).length>0){this.triggerClockBell();return}}let Z=this.raycaster.intersectObjects(this.interactiveTrees,!0);if(Z.length>0){let Y=Z[0].object;while(Y&&!this.interactiveTrees.includes(Y))Y=Y.parent;if(Y){this.triggerTreeWobble(Y);return}}if(this.mooredBoat){if(this.raycaster.intersectObject(this.mooredBoat,!0).length>0){this.triggerBoatRock();return}}let K=this.raycaster.intersectObjects(this.interactiveSheep,!0);if(K.length>0){let Y=K[0].object;while(Y&&!this.interactiveSheep.includes(Y))Y=Y.parent;if(Y){this.triggerSheepHop(Y);return}}if(this.raycaster.intersectObjects(this.viaductLanterns,!0).length>0){this.triggerLanternSpark();return}let X=this.raycaster.intersectObjects(this.interactivePoles,!0);if(X.length>0){let Y=X[0].object;while(Y&&!this.interactivePoles.includes(Y))Y=Y.parent;if(Y){this.triggerTelegraphPing(Y);return}}if(this.windmillGroup){if(this.raycaster.intersectObject(this.windmillGroup,!0).length>0){this.triggerWindmillSpin();return}}if(this.watermillGroup){if(this.raycaster.intersectObject(this.watermillGroup,!0).length>0){this.triggerWaterwheelSpin();return}}if(this.semaphoreGroup){if(this.raycaster.intersectObject(this.semaphoreGroup,!0).length>0){this.triggerSemaphoreToggle();return}}if(this.cottageGroup){if(this.raycaster.intersectObject(this.cottageGroup,!0).length>0){this.triggerCottageChimney();return}}if(this.campsiteGroup){if(this.raycaster.intersectObject(this.campsiteGroup,!0).length>0){this.triggerCampfirePop();return}}if(this.waterTowerGroup){if(this.raycaster.intersectObject(this.waterTowerGroup,!0).length>0){this.triggerWaterTowerSpray();return}}if(this.hotAirBalloonGroup){if(this.raycaster.intersectObject(this.hotAirBalloonGroup,!0).length>0){this.triggerBalloonBurner();return}}if(this.townFountainGroup){if(this.raycaster.intersectObject(this.townFountainGroup,!0).length>0){this.triggerFountainSurge();return}}if(this.farmBarnGroup){if(this.raycaster.intersectObject(this.farmBarnGroup,!0).length>0){this.triggerBarnBoop();return}}if(this.waterMesh){let Y=this.raycaster.intersectObject(this.waterMesh,!0);if(Y.length>0){let H=Y[0].point;this.triggerSplash(H.x,H.y,H.z),this.audio.playWaterDrop()}}}),this.controls.addEventListener("start",()=>{if(this.currentViewMode!=="isometric"&&this.currentViewMode!=="top")this.currentViewMode="isometric",this.updateActiveViewPill("isometric")}),this.container.addEventListener("pointermove",(J)=>{let $=this.container.getBoundingClientRect();this.mousePos.x=(J.clientX-$.left)/$.width*2-1,this.mousePos.y=-((J.clientY-$.top)/$.height)*2+1,this.raycaster.setFromCamera(this.mousePos,this.camera);let Q=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar,...this.clockTowerGroup?[this.clockTowerGroup]:[],...this.interactiveTrees,...this.mooredBoat?[this.mooredBoat]:[],...this.interactiveSheep,...this.viaductLanterns,...this.windmillGroup?[this.windmillGroup]:[],...this.watermillGroup?[this.watermillGroup]:[],...this.cottageGroup?[this.cottageGroup]:[],...this.semaphoreGroup?[this.semaphoreGroup]:[],...this.campsiteGroup?[this.campsiteGroup]:[],...this.waterTowerGroup?[this.waterTowerGroup]:[],...this.hotAirBalloonGroup?[this.hotAirBalloonGroup]:[],...this.townFountainGroup?[this.townFountainGroup]:[],...this.farmBarnGroup?[this.farmBarnGroup]:[]];if(this.raycaster.intersectObjects(Q,!0).length>0)this.container.style.cursor="pointer";else{if(this.waterMesh){let K=this.raycaster.intersectObject(this.waterMesh,!0);if(K.length>0){this.container.style.cursor="cell";let W=performance.now();if(W-this.lastHoverRippleTime>160){this.lastHoverRippleTime=W;let X=K[0].point;this.triggerSplash(X.x,0.034,X.z)}return}}this.container.style.cursor="grab"}}),window.addEventListener("keydown",(J)=>{if(J.target instanceof HTMLInputElement||J.target instanceof HTMLTextAreaElement)return;if(J.code==="Space")J.preventDefault(),this.triggerWhistleHop();else if(J.code==="KeyR"){let $=!this.isRaining;this.setWeather($?"rain":"fair"),document.querySelectorAll("[data-weather]").forEach((Q)=>{Q.classList.toggle("active",Q.getAttribute("data-weather")===($?"rain":"fair"))})}else if(J.code==="KeyT")if(document.documentElement.getAttribute("data-theme")!=="dark")document.documentElement.setAttribute("data-theme","dark"),this.audio.playChime(523.25,0.08),this.setNightMode(!0);else document.documentElement.removeAttribute("data-theme"),this.audio.playMorningBirdSong(),this.setNightMode(!1);else if(J.code==="Digit1")this.setViewMode("isometric"),this.updateActiveViewPill("isometric");else if(J.code==="Digit2")this.setViewMode("top"),this.updateActiveViewPill("top");else if(J.code==="Digit3")this.setViewMode("engine"),this.updateActiveViewPill("engine");else if(J.code==="Digit4")this.setViewMode("director"),this.updateActiveViewPill("director");else if(J.code==="Digit5")this.setViewMode("trackside"),this.updateActiveViewPill("trackside");else if(J.code==="ArrowUp")this.setSpeed(Math.min(3.6,this.speedMultiplier+0.5));else if(J.code==="ArrowDown")this.setSpeed(Math.max(0.5,this.speedMultiplier-0.5))})}updateActiveViewPill(J){document.querySelectorAll("[data-view]").forEach(($)=>{let Q=$.getAttribute("data-view"),Z=Q===J||J==="engine"&&Q==="cinematic"||J==="cinematic"&&Q==="engine";$.classList.toggle("active",Z)})}triggerBoatRock(){if(!this.mooredBoat)return;this.audio.playBoatSlosh(),C0.killTweensOf(this.mooredBoat.rotation),C0.to(this.mooredBoat.rotation,{z:0.18,duration:0.22,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{if(this.mooredBoat)C0.to(this.mooredBoat.rotation,{z:0,duration:0.3})}});let J=this.mooredBoat.position;this.triggerSplash(J.x,0.034,J.z)}triggerSheepHop(J){this.audio.playSheepBleat(),C0.to(J.position,{y:0.14,duration:0.18,yoyo:!0,repeat:1,ease:"power2.out",onComplete:()=>{J.position.y=0.04}}),C0.to(J.rotation,{y:"+=0.6",duration:0.18,yoyo:!0,repeat:1,ease:"sine.inOut"})}triggerCampfirePop(){if(this.audio.playCampfirePop(),this.campfireLight){let J=this.campfireLight.intensity;C0.to(this.campfireLight,{intensity:3.6,duration:0.12,yoyo:!0,repeat:3,ease:"power1.inOut",onComplete:()=>{if(this.campfireLight)this.campfireLight.intensity=J}})}if(this.campfireFlame)C0.to(this.campfireFlame.scale,{x:1.5,y:1.8,z:1.5,duration:0.2,yoyo:!0,repeat:1,ease:"power2.out"})}triggerWaterTowerSpray(){if(this.isWaterTowerSpraying||!this.waterTowerSpout)return;this.isWaterTowerSpraying=!0,this.audio.playWaterTowerSpray(),C0.to(this.waterTowerSpout.rotation,{x:0.82,duration:0.35,ease:"back.out(1.4)",onComplete:()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!0;setTimeout(()=>{if(this.waterSprayPoints)this.waterSprayPoints.visible=!1;if(this.waterTowerSpout)C0.to(this.waterTowerSpout.rotation,{x:0.25,duration:0.45,ease:"bounce.out",onComplete:()=>{this.isWaterTowerSpraying=!1}})},500)}})}triggerBalloonBurner(){if(this.audio.playBalloonBurner(),this.balloonBurnerLight)C0.to(this.balloonBurnerLight,{intensity:3.2,duration:0.2,yoyo:!0,repeat:1});if(this.balloonBurnerFlame)C0.to(this.balloonBurnerFlame.scale,{x:2.2,y:2.5,z:2.2,duration:0.2,yoyo:!0,repeat:1});if(this.hotAirBalloonGroup)C0.to(this.hotAirBalloonGroup.position,{y:"+=0.28",duration:0.45,yoyo:!0,repeat:1,ease:"power1.out"})}triggerFountainSurge(){if(!this.townFountainJet)return;this.audio.playChime(659.25,0.08),this.audio.playWaterDrop(),C0.killTweensOf(this.townFountainJet.scale),C0.to(this.townFountainJet.scale,{x:1.8,y:2.2,z:1.8,duration:0.35,yoyo:!0,repeat:1,ease:"power2.out"})}triggerBarnBoop(){if(!this.farmBarnGroup)return;this.audio.playChime(523.25,0.08),C0.killTweensOf(this.farmBarnGroup.scale),C0.to(this.farmBarnGroup.scale,{x:1.08,y:1.12,z:1.08,duration:0.25,yoyo:!0,repeat:1,ease:"back.out(2)"})}triggerLanternSpark(){this.audio.playLanternSpark(),this.viaductLanternLights.forEach((J)=>{let $=J.intensity;C0.to(J,{intensity:3.5,duration:0.1,yoyo:!0,repeat:1,onComplete:()=>{J.intensity=$}})})}triggerWhistleHop(){this.audio.playWhistle(),[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar].forEach(($,Q)=>{C0.to($.position,{y:"+=0.16",duration:0.16,delay:Q*0.04,yoyo:!0,repeat:1,ease:"power2.out"}),C0.to($.scale,{y:1.18,x:0.92,z:0.92,duration:0.16,delay:Q*0.04,yoyo:!0,repeat:1,ease:"power2.out"})});for(let $=0;$<5;$++)setTimeout(()=>this.spawnSteamPuff(1.4),$*50)}triggerClockBell(){if(this.audio.playBoardingBell(),setTimeout(()=>this.audio.playStationClock(),200),this.clockTowerGroup)C0.to(this.clockTowerGroup.scale,{y:1.15,x:0.92,z:0.92,duration:0.15,yoyo:!0,repeat:1,ease:"power2.out"});if(this.clockHand)C0.to(this.clockHand.rotation,{z:"-="+Math.PI*4,duration:0.8,ease:"power2.out"})}triggerTelegraphPing(J){this.audio.playTelegraphPing(),C0.to(J.rotation,{z:0.12,duration:0.1,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{C0.to(J.rotation,{z:0,duration:0.15})}})}triggerTreeWobble(J){this.audio.playRustle(),C0.to(J.rotation,{z:0.16,duration:0.12,yoyo:!0,repeat:3,ease:"sine.inOut",onComplete:()=>{C0.to(J.rotation,{z:0,duration:0.2})}})}spawnSteamPuff(J=1){let $=this.steamParticles.find((W)=>W.life<=0);if(!$)return;let Q=new w(0.13,0.26,0);this.locoCar.localToWorld(Q),this.rootGroup.worldToLocal(Q),$.mesh.position.copy(Q),$.mesh.scale.setScalar(0.7*J),$.mesh.visible=!0,$.life=1;let Z=this.trackCurve.getTangentAt(this.progress).normalize();$.vx=-Z.x*0.012*this.speedMultiplier+(Math.random()-0.5)*0.004,$.vy=0.014+Math.random()*0.007,$.vz=-Z.z*0.012*this.speedMultiplier+(Math.random()-0.5)*0.004;let K=this.isTrainInTunnel();this.audio.playSteamChuff(K)}isTrainInTunnel(){let J=(this.progress+1)%1;return J<0.045||J>0.955}setSpeed(J){if(this.speedMultiplier=J,this.audio.playSpeedWhoosh(J),J>=3)this.triggerWhistleHop();if(this.currentViewMode==="engine"||this.currentViewMode==="cinematic"){let $=J>=3?64:J>=2?54:48;C0.to(this.camera,{fov:$,duration:0.45,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()})}}setViewMode(J){if(this.currentViewMode=J,this.controls.enabled=J==="isometric"||J==="top",this.controls.autoRotate=!1,J==="engine"||J==="cinematic"){this.camera.near=0.02,this.camera.updateProjectionMatrix();let $=this.speedMultiplier>=3?64:this.speedMultiplier>=2?54:48;C0.to(this.camera,{fov:$,duration:0.8,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()});let Q=new w(0.32,0.2,0),Z=this.locoCar.localToWorld(Q.clone()),K=new w(1.8,0.12,0),W=this.locoCar.localToWorld(K.clone());if(C0.killTweensOf(this.camera.position),C0.killTweensOf(this.controls.target),this.camera.position.copy(Z),this.camera.lookAt(W),this.controls.target.copy(W),this.headlampBeam)this.headlampBeam.visible=!1;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.4;this.audio.playWhistle()}else{if(this.camera.near=0.1,this.camera.updateProjectionMatrix(),this.engineBankRoll=0,this.camera.up.set(0,1,0),this.camera.fov!==38)C0.to(this.camera,{fov:38,duration:0.8,ease:"power2.out",onUpdate:()=>this.camera.updateProjectionMatrix()});if(this.isNightMode){if(this.headlampBeam)this.headlampBeam.visible=!0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0}else{if(this.headlampBeam)this.headlampBeam.visible=!1;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}}if(J==="top")this.controls.enabled=!1,C0.to(this.controls.target,{x:0,y:0,z:0,duration:0.85,ease:"power2.inOut"}),C0.to(this.camera.position,{x:0.01,y:7.2,z:0.01,duration:0.85,ease:"power2.inOut",onComplete:()=>{this.controls.enabled=!0,this.controls.update()}});else if(J==="isometric")this.controls.enabled=!1,C0.to(this.controls.target,{x:0,y:0.1,z:-0.2,duration:0.85,ease:"power2.inOut"}),C0.to(this.camera.position,{x:5,y:3.85,z:5,duration:0.85,ease:"power2.inOut",onComplete:()=>{this.controls.enabled=!0,this.controls.update()}});else if(J==="director")this.directorShotIndex=0,this.directorTimer=0,this.directorNeedsCut=!0}setNightMode(J,$=!1){if(this.isNightMode=J,$){if(J){if(this.ambientLight)this.ambientLight.color.set(1579035),this.ambientLight.intensity=0.65;if(this.hemiLight)this.hemiLight.color.set(2565930),this.hemiLight.groundColor.set(592396),this.hemiLight.intensity=0.35;if(this.sunLight)this.sunLight.position.set(6.5,0.25,1.8),this.sunLight.color.set(16317180),this.sunLight.intensity=0.15;if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),this.sunMesh.scale.setScalar(0.001),this.sunCorona)this.sunCorona.material.opacity=0}if(this.moonLight)this.moonLight.intensity=1.45;if(this.moonMesh){if(this.moonMesh.position.set(-2.4,2.8,-2.4),this.moonMesh.scale.set(1,1,1),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0.85}if(this.starsPoints)this.starsPoints.material.opacity=0.85;if(this.headlampLight)this.headlampLight.intensity=1.8;if(this.headlampSpotLight)this.headlampSpotLight.intensity=2.2;if(this.headlampBeam)this.headlampBeam.visible=!0,this.headlampBeam.material.opacity=0.32;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,this.headlampCoreBeam.material.opacity=0.38;if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,this.headlampTrackPool.material.opacity=0.45;if(this.coachWindowMat)this.coachWindowMat.emissive.set(16498468),this.coachWindowMat.emissiveIntensity=1.8;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=1.2;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=1.2;if(this.tailLight)this.tailLight.intensity=1.8;if(this.lanternLight)this.lanternLight.intensity=2.2;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Z)=>Z.intensity=1.4);if(this.tunnelLight)this.tunnelLight.intensity=0.9;if(this.windmillLight)this.windmillLight.intensity=0.85;if(this.watermillLight)this.watermillLight.intensity=0.85;if(this.cottageLight)this.cottageLight.intensity=1.1;this.fireflies.forEach((Z)=>{Z.mesh.visible=!0,Z.mesh.material.opacity=0.85}),this.audio.setNightAmbience(!0)}else{if(this.ambientLight)this.ambientLight.color.set(16777215),this.ambientLight.intensity=2.1;if(this.hemiLight)this.hemiLight.color.set(16776171),this.hemiLight.groundColor.set(14870768),this.hemiLight.intensity=1.2;if(this.sunLight)this.sunLight.position.set(5.5,7.5,4.2),this.sunLight.color.set(16776171),this.sunLight.intensity=2.6;if(this.sunMesh){if(this.sunMesh.position.set(1.3,2.1,-1.8),this.sunMesh.scale.set(1,1,1),this.sunCorona)this.sunCorona.material.opacity=0.22}if(this.moonLight)this.moonLight.intensity=0;if(this.moonMesh){if(this.moonMesh.position.set(-2.4,-0.7,-2.4),this.moonMesh.scale.setScalar(0.001),this.moonMesh.children[0])this.moonMesh.children[0].material.opacity=0}if(this.starsPoints)this.starsPoints.material.opacity=0;if(this.headlampLight)this.headlampLight.intensity=0.6;if(this.headlampSpotLight)this.headlampSpotLight.intensity=0;if(this.headlampBeam)this.headlampBeam.visible=!1,this.headlampBeam.material.opacity=0;if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1,this.headlampCoreBeam.material.opacity=0;if(this.headlampTrackPool)this.headlampTrackPool.visible=!1,this.headlampTrackPool.material.opacity=0;if(this.coachWindowMat)this.coachWindowMat.emissive.set(0),this.coachWindowMat.emissiveIntensity=0;if(this.coachInteriorLight1)this.coachInteriorLight1.intensity=0;if(this.coachInteriorLight2)this.coachInteriorLight2.intensity=0;if(this.tailLight)this.tailLight.intensity=0.8;if(this.lanternLight)this.lanternLight.intensity=0.8;if(this.viaductLanternLights)this.viaductLanternLights.forEach((Z)=>Z.intensity=0);if(this.tunnelLight)this.tunnelLight.intensity=0.2;if(this.windmillLight)this.windmillLight.intensity=0;if(this.watermillLight)this.watermillLight.intensity=0;if(this.cottageLight)this.cottageLight.intensity=0;this.fireflies.forEach((Z)=>{Z.mesh.visible=!1,Z.mesh.material.opacity=0}),this.audio.setNightAmbience(!1)}return}let Q=1.6;if(J){let Z=C0.timeline();if(this.sunLight){Z.to(this.sunLight.position,{x:6.5,y:0.25,z:1.8,duration:Q,ease:"power2.inOut"},0);let K={r:1,g:0.98,b:0.92};Z.to(K,{r:0.92,g:0.35,b:0.05,duration:Q*0.5,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},0),Z.to(K,{r:0.97,g:0.98,b:0.98,duration:Q*0.5,ease:"power1.in",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},Q*0.5),Z.to(this.sunLight,{intensity:0.15,duration:Q,ease:"power2.inOut"},0)}if(this.sunMesh){if(Z.to(this.sunMesh.position,{x:4.5,y:-0.8,z:2,duration:Q,ease:"power2.in"},0),Z.to(this.sunMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Q*0.8},Q*0.2),this.sunCorona)Z.to(this.sunCorona.material,{opacity:0,duration:Q*0.7},Q*0.2)}if(this.ambientLight){let K={r:1,g:1,b:1};Z.to(K,{r:0.98,g:0.57,b:0.24,duration:Q*0.45,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},0),Z.to(K,{r:0.1,g:0.1,b:0.11,duration:Q*0.55,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Q*0.45),Z.to(this.ambientLight,{intensity:0.65,duration:Q},0)}if(this.hemiLight)Z.to(this.hemiLight,{intensity:0.35,duration:Q},0);if(this.moonMesh){if(this.moonMesh.position.set(-2.4,-0.7,-2.4),Z.to(this.moonMesh.position,{y:2.8,duration:Q,ease:"power2.out"},Q*0.2),Z.to(this.moonMesh.scale,{x:1,y:1,z:1,duration:Q,ease:"back.out(1.2)"},Q*0.2),this.moonMesh.children[0])Z.to(this.moonMesh.children[0].material,{opacity:0.85,duration:Q*0.8},Q*0.3)}if(this.moonLight)Z.to(this.moonLight,{intensity:1.45,duration:Q},Q*0.3);if(this.starsPoints)Z.to(this.starsPoints.material,{opacity:0.85,duration:Q*0.8},Q*0.3);if(this.headlampLight)Z.to(this.headlampLight,{intensity:1.8,duration:Q*0.7},Q*0.3);if(this.headlampSpotLight)Z.to(this.headlampSpotLight,{intensity:2.2,duration:Q*0.7},Q*0.3);if(this.headlampBeam)this.headlampBeam.visible=!0,Z.to(this.headlampBeam.material,{opacity:0.32,duration:Q*0.7},Q*0.3);if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!0,Z.to(this.headlampCoreBeam.material,{opacity:0.38,duration:Q*0.7},Q*0.3);if(this.headlampTrackPool)this.headlampTrackPool.visible=!0,Z.to(this.headlampTrackPool.material,{opacity:0.45,duration:Q*0.7},Q*0.3);if(this.coachWindowMat)Z.to(this.coachWindowMat.emissive,{r:0.98,g:0.75,b:0.14,duration:Q*0.7},Q*0.3),Z.to(this.coachWindowMat,{emissiveIntensity:1.8,duration:Q*0.7},Q*0.3);if(this.coachInteriorLight1)Z.to(this.coachInteriorLight1,{intensity:1.2,duration:Q*0.7},Q*0.3);if(this.coachInteriorLight2)Z.to(this.coachInteriorLight2,{intensity:1.2,duration:Q*0.7},Q*0.3);if(this.tailLight)Z.to(this.tailLight,{intensity:1.8,duration:Q*0.7},Q*0.3);if(this.lanternLight)Z.to(this.lanternLight,{intensity:2.2,duration:Q*0.7},Q*0.3);if(this.viaductLanternLights.forEach((K)=>{Z.to(K,{intensity:1.4,duration:Q*0.7},Q*0.3)}),this.tunnelLight)Z.to(this.tunnelLight,{intensity:0.9,duration:Q*0.7},Q*0.3);if(this.windmillLight)Z.to(this.windmillLight,{intensity:0.85,duration:Q*0.7},Q*0.3);if(this.watermillLight)Z.to(this.watermillLight,{intensity:0.85,duration:Q*0.7},Q*0.3);if(this.cottageLight)Z.to(this.cottageLight,{intensity:1.1,duration:Q*0.7},Q*0.3);this.fireflies.forEach((K)=>{K.mesh.visible=!0,Z.to(K.mesh.material,{opacity:0.85,duration:Q*0.7},Q*0.3)}),this.audio.setNightAmbience(!0)}else{let Z=C0.timeline();if(this.moonMesh){if(Z.to(this.moonMesh.position,{y:-0.7,duration:Q*0.7,ease:"power2.in"},0),Z.to(this.moonMesh.scale,{x:0.001,y:0.001,z:0.001,duration:Q*0.7},0),this.moonMesh.children[0])Z.to(this.moonMesh.children[0].material,{opacity:0,duration:Q*0.5},0)}if(this.moonLight)Z.to(this.moonLight,{intensity:0,duration:Q*0.6},0);if(this.starsPoints)Z.to(this.starsPoints.material,{opacity:0,duration:Q*0.6},0);if(this.headlampLight)Z.to(this.headlampLight,{intensity:0.6,duration:Q*0.6},0);if(this.headlampSpotLight)Z.to(this.headlampSpotLight,{intensity:0,duration:Q*0.6},0);if(this.headlampBeam)Z.to(this.headlampBeam.material,{opacity:0,duration:Q*0.5,onComplete:()=>{if(this.headlampBeam)this.headlampBeam.visible=!1}},0);if(this.headlampCoreBeam)Z.to(this.headlampCoreBeam.material,{opacity:0,duration:Q*0.5,onComplete:()=>{if(this.headlampCoreBeam)this.headlampCoreBeam.visible=!1}},0);if(this.headlampTrackPool)Z.to(this.headlampTrackPool.material,{opacity:0,duration:Q*0.5,onComplete:()=>{if(this.headlampTrackPool)this.headlampTrackPool.visible=!1}},0);if(this.coachWindowMat)Z.to(this.coachWindowMat.emissive,{r:0,g:0,b:0,duration:Q*0.6},0),Z.to(this.coachWindowMat,{emissiveIntensity:0,duration:Q*0.6},0);if(this.coachInteriorLight1)Z.to(this.coachInteriorLight1,{intensity:0,duration:Q*0.6},0);if(this.coachInteriorLight2)Z.to(this.coachInteriorLight2,{intensity:0,duration:Q*0.6},0);if(this.tailLight)Z.to(this.tailLight,{intensity:0.8,duration:Q*0.6},0);if(this.lanternLight)Z.to(this.lanternLight,{intensity:0.8,duration:Q*0.6},0);if(this.viaductLanternLights.forEach((K)=>{Z.to(K,{intensity:0,duration:Q*0.5},0)}),this.tunnelLight)Z.to(this.tunnelLight,{intensity:0.2,duration:Q*0.5},0);if(this.windmillLight)Z.to(this.windmillLight,{intensity:0,duration:Q*0.5},0);if(this.watermillLight)Z.to(this.watermillLight,{intensity:0,duration:Q*0.5},0);if(this.cottageLight)Z.to(this.cottageLight,{intensity:0,duration:Q*0.5},0);if(this.fireflies.forEach((K)=>{Z.to(K.mesh.material,{opacity:0,duration:Q*0.5,onComplete:()=>{K.mesh.visible=!1}},0)}),this.audio.setNightAmbience(!1),this.sunLight){this.sunLight.position.set(6.5,0.25,1.8),Z.to(this.sunLight.position,{x:5.5,y:7.5,z:4.2,duration:Q,ease:"power2.out"},Q*0.15);let K={r:0.96,g:0.45,b:0.15};this.sunLight.color.setRGB(K.r,K.g,K.b),Z.to(K,{r:1,g:0.98,b:0.92,duration:Q*0.85,ease:"power1.out",onUpdate:()=>{this.sunLight.color.setRGB(K.r,K.g,K.b)}},Q*0.15),Z.to(this.sunLight,{intensity:2.6,duration:Q},Q*0.1)}if(this.sunMesh){if(this.sunMesh.position.set(4.5,-0.8,2),Z.to(this.sunMesh.position,{x:1.3,y:2.1,z:-1.8,duration:Q,ease:"power2.out"},Q*0.15),Z.to(this.sunMesh.scale,{x:1,y:1,z:1,duration:Q,ease:"back.out(1.2)"},Q*0.2),this.sunCorona)Z.to(this.sunCorona.material,{opacity:0.22,duration:Q*0.8},Q*0.25)}if(this.ambientLight){let K={r:0.12,g:0.16,b:0.23};Z.to(K,{r:0.99,g:0.9,b:0.65,duration:Q*0.4,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Q*0.1),Z.to(K,{r:1,g:1,b:1,duration:Q*0.5,onUpdate:()=>{this.ambientLight.color.setRGB(K.r,K.g,K.b)}},Q*0.5),Z.to(this.ambientLight,{intensity:2.1,duration:Q},Q*0.1)}if(this.hemiLight)Z.to(this.hemiLight,{intensity:1.2,duration:Q},Q*0.1)}}animate=()=>{if(this.isDestroyed)return;this.progress=(this.progress+this.trainSpeed*this.speedMultiplier)%1;let J=[0,-0.022,-0.044,-0.066],$=[this.locoCar,this.tenderCar,this.coachCar,this.cabooseCar],Q=new w(0,1,0);$.forEach((V,G)=>{let N=(this.progress+J[G]+1)%1,E=this.trackCurve.getPointAt(N),O=this.trackCurve.getTangentAt(N).normalize(),D=new w().crossVectors(O,Q).normalize(),R=new w().crossVectors(D,O).normalize(),B=new H8().makeBasis(O,R,D);V.quaternion.setFromRotationMatrix(B),V.position.copy(E)});let Z=0.08*this.speedMultiplier;if(this.wheelAngle=(this.wheelAngle-Z)%(Math.PI*2),this.rotatingWheels.forEach((V)=>{V.rotation.z-=Z}),this.leftSideRod&&this.rightSideRod){let G=Math.cos(this.wheelAngle)*0.022,N=Math.sin(this.wheelAngle)*0.022;this.leftSideRod.position.set(G,0.045+N,0.104),this.rightSideRod.position.set(G,0.045+N,-0.104)}let K=this.locoCar.position.clone().project(this.camera),W=Math.max(-0.85,Math.min(0.85,K.x)),X=this.camera.position.distanceTo(this.locoCar.position),Y=this.currentViewMode==="engine"||this.currentViewMode==="cinematic",H=Y?1.6:Math.max(0.35,Math.min(1.7,5.2/Math.max(1,X))),q=Y?0:W;if(this.railClickAccumulator+=this.trainSpeed*this.speedMultiplier,this.railClickAccumulator>=0.034){this.railClickAccumulator=0;let V=this.isTrainInTunnel();this.audio.playRailClickClack(this.speedMultiplier,V,H,q)}let U=Y?16:28;if(this.steamTimer+=this.speedMultiplier,this.steamTimer>=U)this.steamTimer=0,this.spawnSteamPuff(1),this.audio.playSteamChuff(this.isTrainInTunnel(),H,q);if(this.steamParticles.forEach((V)=>{if(V.life>0)V.life-=0.024,V.mesh.position.x+=V.vx,V.mesh.position.y+=V.vy,V.mesh.position.z+=V.vz,V.mesh.scale.multiplyScalar(1.035),V.mesh.visible=!0,V.mesh.material.opacity=Math.max(0,V.life*0.75);else V.mesh.visible=!1,V.mesh.position.set(0,-100,0),V.mesh.material.opacity=0}),this.isRaining&&this.rainPositions&&this.rainGeo){for(let G=0;G<this.rainCount;G++)if(this.rainPositions[G*6+1]-=0.11,this.rainPositions[G*6+4]-=0.11,this.rainPositions[G*6+1]<0.02){let N=(Math.random()-0.5)*5.2,E=3.2+Math.random()*0.5,O=(Math.random()-0.5)*4.2;this.triggerSplash(this.rainPositions[G*6],0.025,this.rainPositions[G*6+2]),this.rainPositions[G*6]=N,this.rainPositions[G*6+1]=E,this.rainPositions[G*6+2]=O,this.rainPositions[G*6+3]=N-0.02,this.rainPositions[G*6+4]=E-0.18,this.rainPositions[G*6+5]=O-0.01}this.rainGeo.attributes.position.needsUpdate=!0}this.splashRipples.forEach((V)=>{if(V.life>0){V.life-=0.045;let G=1-V.life;V.mesh.scale.setScalar(0.2+G*V.maxRadius*8),V.mesh.material.opacity=Math.max(0,V.life*0.5)}else V.mesh.material.opacity=0});let F=Date.now()%800<400;if(this.crossingLamp1&&this.crossingLamp2&&this.crossingLight1&&this.crossingLight2){if(this.crossingLamp1.visible=F,this.crossingLight1.intensity=F?0.9:0,this.crossingLight2.visible=!F,this.crossingLight2.intensity=!F?0.9:0,this.lastBlinkCycle!==F){if(this.lastBlinkCycle=F,F){let V=this.locoCar.position;if(Math.hypot(V.x- -0.45,V.z-0.82)<0.95)this.audio.playCrossingBell()}}}if(this.clockHand)this.clockHand.rotation.z=-Date.now()*0.001;if(this.waterMesh)this.waterMesh.material.opacity=0.86+Math.sin(Date.now()*0.0018)*0.04;if(this.mooredBoat)this.mooredBoat.rotation.z=Math.sin(Date.now()*0.0015)*0.025,this.mooredBoat.position.y=0.038+Math.sin(Date.now()*0.0015)*0.0012;if(this.windmillSails){if(this.windmillSails.rotation.x-=this.windmillCurrentSpeed,this.windmillCurrentSpeed>this.windmillBaseSpeed)this.windmillCurrentSpeed=u$.lerp(this.windmillCurrentSpeed,this.windmillBaseSpeed,0.015)}if(this.waterwheel)this.waterwheel.rotation.x+=0.016*this.speedMultiplier;if(this.townFountainJet)this.townFountainJet.rotation.y+=0.02;if(this.fireflies.length>0){let V=Date.now()*0.001;this.fireflies.forEach((G)=>{if(G.mesh.position.x=G.baseX+Math.sin(V*G.speed+G.phase)*G.radius,G.mesh.position.y=G.baseY+Math.sin(V*G.speed*1.6+G.phase)*0.035,G.mesh.position.z=G.baseZ+Math.cos(V*G.speed*1.1+G.phase)*G.radius,this.isNightMode){G.mesh.visible=!0;let N=0.5+Math.sin(V*3.2+G.phase)*0.45;G.mesh.material.opacity=N}else G.mesh.visible=!1,G.mesh.material.opacity=0})}if(this.campfireParticles&&this.campfireParticlePos){for(let V=0;V<20;V++)if(this.campfireParticlePos[V*3+1]+=0.0025,this.campfireParticlePos[V*3+1]>0.32)this.campfireParticlePos[V*3+1]=0.06,this.campfireParticlePos[V*3]=(Math.random()-0.5)*0.12,this.campfireParticlePos[V*3+2]=(Math.random()-0.5)*0.12;this.campfireParticles.geometry.attributes.position.needsUpdate=!0}if(this.hotAirBalloonGroup){let V=Date.now()*0.001;this.hotAirBalloonGroup.position.y=2.7+Math.sin(V*1.2)*0.08,this.hotAirBalloonGroup.rotation.z=Math.sin(V*0.8)*0.04}if(this.butterflies.length>0){let V=Date.now()*0.003;this.butterflies.forEach((G)=>{let N=G.mesh.children[0],E=G.mesh.children[1];if(N&&E){let O=Math.sin(V*9+G.phase)*0.75;N.rotation.z=0.3+O,E.rotation.z=-0.3-O}G.mesh.position.x=G.basePos.x+Math.sin(V*G.speed+G.phase)*0.12,G.mesh.position.y=G.basePos.y+Math.abs(Math.cos(V*G.speed*1.5+G.phase))*0.08,G.mesh.position.z=G.basePos.z+Math.cos(V*G.speed+G.phase)*0.12,G.mesh.rotation.y=Math.sin(V*G.speed+G.phase)*0.8})}if(this.interactiveSheep.length>0){let V=Date.now()*0.002;this.interactiveSheep.forEach((G,N)=>{let E=G.children.find((O)=>O.isMesh&&O.position.y>0.06);if(E)E.rotation.x=Math.sin(V*1.2+N*1.5)*0.12})}if(this.currentViewMode==="director"){let V=performance.now(),G=this.lastAnimTime?(V-this.lastAnimTime)*0.001:0.016;if(this.directorTimer+=G,this.directorTimer>=this.directorShotDuration)this.directorTimer=0,this.directorShotIndex=(this.directorShotIndex+1)%4,this.directorNeedsCut=!0;let N=this.locoCar.position,E=this.trackCurve.getTangentAt(this.progress).normalize(),O,D;if(this.directorShotIndex===0)O=new w(1.15,0.4,1.15),D=N.clone().add(new w(0,0.08,0));else if(this.directorShotIndex===1){if(O=N.clone().sub(E.clone().multiplyScalar(0.72)).add(new w(0,0.38,0)),this.isTrainInTunnel())O.y=Math.max(0.48,O.y);D=N.clone().add(E.clone().multiplyScalar(0.75)).add(new w(0,0.12,0))}else if(this.directorShotIndex===2)O=new w(-0.45,0.28,1.55),D=N.clone().add(new w(0,0.08,0));else{let R=Date.now()*0.00028;O=new w(Math.cos(R)*3.4,2.95,Math.sin(R)*3.4),D=new w(0,0.25,0)}if(this.directorNeedsCut)this.camera.position.copy(O),this.camera.lookAt(D),this.controls.target.copy(D),this.directorNeedsCut=!1;else this.camera.position.lerp(O,0.08),this.camera.lookAt(D),this.controls.target.copy(D)}else if(this.currentViewMode==="cinematic"||this.currentViewMode==="engine"){let V=this.progress,G=(this.progress+0.024)%1,N=this.trackCurve.getTangentAt(V).normalize(),E=this.trackCurve.getTangentAt(G).normalize(),O=N.x*E.z-N.z*E.x,D=Math.max(-0.025,Math.min(0.025,-O*1.5));this.engineBankRoll+=(D-this.engineBankRoll)*0.08;let R=Math.sin(Date.now()*0.026*this.speedMultiplier)*0.0012,B=new w(0.32,0.2+R,0),z=this.locoCar.localToWorld(B.clone());z.y=Math.max(z.y,0.18);let C=new w(1.8,0.12,0),L=this.locoCar.localToWorld(C.clone());if(this.camera.position.lerp(z,0.25),this.camera.up.set(0,1,0),this.camera.lookAt(L),Math.abs(this.engineBankRoll)>0.001)this.camera.rotateZ(this.engineBankRoll);this.controls.target.copy(L)}else if(this.currentViewMode==="trackside"){let V=new w(0.55,0.32,1.65);this.camera.position.lerp(V,0.08);let G=this.locoCar.position.clone().add(new w(0,0.1,0));this.camera.lookAt(G),this.controls.target.copy(G)}else this.controls.update();this.lastAnimTime=performance.now(),this.rootGroup.position.y=Math.sin(Date.now()*0.0012)*0.025,this.renderer.render(this.scene,this.camera),this.animFrameId=requestAnimationFrame(this.animate)};destroy(){this.isDestroyed=!0,cancelAnimationFrame(this.animFrameId),this.controls.dispose(),this.renderer.dispose()}}function AW(){let J=new BQ;window.samtagonAudio=J;let $=null;try{$=new N5("three-viewport",J),window.samtagonStage=$}catch(Q){console.warn("Three.js stage init fallback:",Q)}mU($,J),console.log("Samtagon Studios online. Zen mode active.")}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",AW);else AW();function mU(J,$){let Q=localStorage.getItem("samtagon_theme"),Z=new URLSearchParams(window.location.search),K=Z.get("theme"),W=K?K==="dark":Q?Q==="dark":!0,X=(B,z=!1)=>{if(B)document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("samtagon_theme","dark"),J?.setNightMode(!0,z);else document.documentElement.removeAttribute("data-theme"),localStorage.setItem("samtagon_theme","light"),J?.setNightMode(!1,z)};X(W,!0),window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change",(B)=>{if(W=B.matches,X(W,!1),W)$.playChime(523.25,0.08);else $.playMorningBirdSong()}),document.getElementById("theme-toggle-btn")?.addEventListener("click",()=>{if(W=!W,X(W,!1),W)$.playChime(523.25,0.08);else $.playMorningBirdSong()});let H=document.getElementById("audio-toggle-btn"),q=H?.querySelector(".audio-on-icon"),U=H?.querySelector(".audio-off-icon"),F=(B)=>{if(q&&U)q.style.display=B?"block":"none",U.style.display=B?"none":"block"};H?.addEventListener("click",()=>{let B=$.toggleMute();F(B)}),window.addEventListener("keydown",(B)=>{if(B.code==="KeyM"){let z=$.toggleMute();F(z)}});let V=document.querySelectorAll("[data-view]");V.forEach((B)=>{B.addEventListener("click",()=>{V.forEach((C)=>C.classList.remove("active")),B.classList.add("active");let z=B.dataset.view;J?.setViewMode(z),$.playButtonPress()})});let G=document.querySelectorAll("[data-speed]");G.forEach((B)=>{B.addEventListener("click",()=>{G.forEach((C)=>C.classList.remove("active")),B.classList.add("active");let z=parseFloat(B.dataset.speed||"1");J?.setSpeed(z),$.playButtonPress()})});let N=document.querySelectorAll("[data-weather]");N.forEach((B)=>{B.addEventListener("click",()=>{N.forEach((C)=>C.classList.remove("active")),B.classList.add("active");let z=B.dataset.weather==="rain";J?.setWeather(z?"rain":"fair"),$.playButtonPress()})}),document.getElementById("whistle-btn")?.addEventListener("click",()=>{J?.triggerWhistleHop()}),document.getElementById("play-flagship-btn")?.addEventListener("click",()=>{$.playChime(660,0.1)}),document.querySelectorAll(".game-pill").forEach((B,z)=>{let C=[523.25,587.33,659.25,783.99,880,1046.5],L=C[z%C.length];B.addEventListener("mouseenter",()=>{$.playChime(L,0.04)}),B.addEventListener("click",()=>{$.playChime(L*1.5,0.08),J?.triggerWhistleHop()})}),document.querySelector(".zen-brand")?.addEventListener("click",()=>{$.playChime(880,0.12),J?.triggerWhistleHop()});let R=Z.get("view");if(R)V.forEach((B)=>B.classList.toggle("active",B.dataset.view===R)),J?.setViewMode(R);uU()}function uU(){document.querySelectorAll(".zen-btn").forEach((W)=>{let X=W.querySelector(".btn-arrow-icon"),Y=W.querySelector("svg:not(.btn-arrow-icon)");W.addEventListener("mouseenter",()=>{if(C0.to(W,{y:-3,scale:1.025,duration:0.16,ease:"power2.out",overwrite:"auto"}),X)C0.to(X,{x:3,y:-3,duration:0.16,ease:"power2.out",overwrite:"auto"});if(Y)C0.to(Y,{scale:1.15,duration:0.18,ease:"back.out(2)",overwrite:"auto"})}),W.addEventListener("mouseleave",()=>{if(C0.to(W,{y:0,scale:1,duration:0.2,ease:"power2.out",overwrite:"auto"}),X)C0.to(X,{x:0,y:0,duration:0.2,ease:"power2.out",overwrite:"auto"});if(Y)C0.to(Y,{scale:1,rotation:0,duration:0.2,ease:"power2.out",overwrite:"auto"})}),W.addEventListener("mousedown",()=>{C0.to(W,{y:1,scale:0.96,duration:0.08,ease:"power1.in",overwrite:"auto"})}),W.addEventListener("mouseup",()=>{C0.to(W,{y:-3,scale:1.025,duration:0.24,ease:"back.out(2.5)",overwrite:"auto"})})}),document.querySelectorAll(".stage-icon-btn, .stage-speed-btn, .zen-theme-toggle").forEach((W)=>{let X=W.querySelector("svg");W.addEventListener("mouseenter",()=>{if(C0.to(W,{y:-2,duration:0.14,ease:"power2.out",overwrite:"auto"}),X)C0.to(X,{scale:1.15,duration:0.16,ease:"back.out(2)",overwrite:"auto"})}),W.addEventListener("mouseleave",()=>{if(C0.to(W,{y:0,scale:1,duration:0.2,ease:"power2.out",overwrite:"auto"}),X)C0.to(X,{scale:1,rotation:0,x:0,y:0,duration:0.2,ease:"power2.out",overwrite:"auto"})}),W.addEventListener("mousedown",()=>{C0.to(W,{scale:0.92,duration:0.08,ease:"power1.in",overwrite:"auto"})}),W.addEventListener("mouseup",()=>{C0.to(W,{scale:1,duration:0.2,ease:"back.out(3)",overwrite:"auto"})})});let Q=document.getElementById("whistle-btn");Q?.addEventListener("click",()=>{let W=Q.querySelector("svg");if(W)C0.fromTo(W,{rotation:-16,scale:1.25},{rotation:16,scale:1.1,duration:0.045,repeat:7,yoyo:!0,ease:"sine.inOut",onComplete:()=>{C0.to(W,{rotation:0,scale:1,duration:0.12})}})});let Z=document.querySelector('[data-view="engine"]');Z?.addEventListener("click",()=>{let W=Z.querySelector("svg");if(W)C0.fromTo(W,{x:-5,scale:1.2},{x:4,duration:0.09,repeat:3,yoyo:!0,ease:"power2.inOut",onComplete:()=>{C0.to(W,{x:0,scale:1,duration:0.12})}})});let K=document.getElementById("theme-toggle-btn");K?.addEventListener("click",()=>{let W=K.querySelector('svg:not([style*="none"])')||K.querySelector("svg");if(W)C0.fromTo(W,{rotation:-180,scale:0.6},{rotation:0,scale:1,duration:0.45,ease:"back.out(2)"})})}
