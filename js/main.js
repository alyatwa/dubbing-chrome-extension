
	var audio = document.getElementById('audio'),
      player = document.querySelectorAll('.player')[0],
		play = document.querySelectorAll('.btn__play')[0],
		icoPlay = document.querySelectorAll('.btn__play__arrow')[0],
		icoPause = document.querySelectorAll('.btn__play__pause')[0],
		/*volumeProgress = document.querySelectorAll('.player__volume__progress')[0],
		volumeBar = document.querySelectorAll('.player__volume__bar')[0],
		btnVolume = document.querySelectorAll('.btn__volume')[0],
		timeline = document.querySelectorAll('.player__timeline')[0],
		timeProgress = document.querySelectorAll('.player__timeline__progress')[0],
		timeNow = document.querySelectorAll('.player__timeline__time--now')[0],
		timeEnd = document.querySelectorAll('.player__timeline__time--end')[0],*/
		duration;

		/*timeProgress.style.width = '0%';
		timeNow.innerHTML = '00:00:00';
		timeEnd.innerHTML = '00:00:00';
		audio.volume = 0.7;*/

		audio.addEventListener("canplaythrough", function () {
			duration = audio.duration;
		}, false);

	function playAudio() {
		if (audio.paused) {
			audio.play();
			icoPause.style.display = 'block';
			icoPlay.style.display = 'none';
		} else { 
			audio.pause();
			icoPause.style.display = 'none';
			icoPlay.style.display = 'block';
		}
	}
	/*function uptadeTime() {
		var now = 100 * (audio.currentTime / duration);
		timeProgress.style.width = now + '%';
		timeNow.innerHTML = formatTime(audio.currentTime);
		timeEnd.innerHTML = formatTime(duration);
	}

	function formatTime(secs){
		var times = new Array(3600, 60, 1);
		var time = '';
		var tmp;
		for(var i = 0; i < times.length; i++){
			tmp = Math.floor(secs / times[i]);
			if(tmp < 1){
				tmp = '00';
			}
			else if(tmp < 10){
				tmp = '0' + tmp;
			}
			time += tmp;
			if(i < 2){
				time += ':';
			}
			secs = secs % times[i];
		}
		return time;
	}

	function clickPercent(e) {
		return ((e.pageX - timeline.offsetLeft-player.offsetLeft) / timeline.offsetWidth);
	}
	 
	function updateTimeline(e) {
		var newSize = e.pageX - timeline.offsetLeft-9;
	        
		if (newSize >= 0 && newSize <= timeline.offsetWidth) {
			timeProgress.style.width = newSize + "px";
		}
		if (newSize < 0) {
			timeProgress.style.width = "0px";
		}
		if (newSize > timeline.offsetWidth) {
			timeProgress.style.width = timeline.offsetWidth + "px";
		}
	}
	function updateAudio(e) {
		var percent = ((e.pageX - volumeBar.offsetLeft-player.offsetLeft) / volumeBar.offsetWidth);

		if (percent >= 0 && percent <= volumeBar.offsetWidth) {
			volumeProgress.style.width = 100*percent + "%";
			btnVolume.classList.remove('fa-volume-off');
			btnVolume.classList.add('fa-volume-up');
		}
		if (percent <= 0) {
			volumeProgress.style.width = "0";
			btnVolume.classList.remove('fa-volume-up');
			btnVolume.classList.add('fa-volume-off');
		}
		if (percent > volumeBar.offsetWidth) {
			volumeProgress.style.width = "100%";
			btnVolume.classList.remove('fa-volume-off');
			btnVolume.classList.add('fa-volume-up');
		}

		audio.volume = percent;
	}*/

	function autoStop() {
		if(audio.paused || audio.currentTime >= duration) {
			icoPause.style.display = 'none';
			icoPlay.style.display = 'block';
			audio.pause();
		}
	}

	/*function audioVolume() {
		if(audio.volume > 0) {
			audio.volume = 0;
			btnVolume.classList.remove('fa-volume-up');
			btnVolume.classList.add('fa-volume-off');
			volumeProgress.style.width = "0%";
		}
		else {
			audio.volume = 0.7;
			btnVolume.classList.remove('fa-volume-off');
			btnVolume.classList.add('fa-volume-up');
			volumeProgress.style.width = "70%";
		}
	}

	//Eventos
	timeline.addEventListener("click", function (event) {
		updateTimeline(event);
		audio.currentTime = duration * clickPercent(event);
	}, false);
	audio.addEventListener("timeupdate", uptadeTime, false);
	audio.addEventListener("timeupdate", autoStop, false);*/
	play.addEventListener('click', function(e) {
		playAudio();
	});
	/*btnVolume.addEventListener('click',audioVolume,false);
	volumeBar.addEventListener('click',function(event) {
		updateAudio(event);
	});*/
