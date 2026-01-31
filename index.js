
			// 1. 时钟更新功能
			const clock = document.querySelector('.time .time');

			function updateClock() {
				const now = new Date();
				let hours = now.getHours().toString().padStart(2, '0');
				let minutes = now.getMinutes().toString().padStart(2, '0');
				let seconds = now.getSeconds().toString().padStart(2, '0');
				const timeStr = `${hours}:${minutes}:${seconds}`;
				clock.innerText = "现在的时间是:" + timeStr;
			}
			updateClock();
			setInterval(updateClock, 1000);

			// 2. 按钮跳转功能
			document.getElementById('btn1').onclick = () => window.location.href =
				'https://space.bilibili.com/1124528023?spm_id_from=333.337.0.0';
			document.getElementById('delt').onclick = () => window.location.href = 'https://deltaforce.com/';
			let hasUserInteracted = false;
			const container = document.getElementById('videoContainer');
			const video = document.getElementById('hoverVideo');
			let isClickActive = false;


			const container2 = document.getElementById('videoContainer2');
			const video2 = document.getElementById('hoverVideo2');
			let isClickActive2 = false;


			function playVideo() {
				if (video.paused && hasUserInteracted) {
					video.play().catch(err => {
						console.log('第一段视频播放失败：', err);
					});
				}
			}

			function pauseAndResetVideo() {
				if (!video.paused) {
					video.pause();
					video.currentTime = 0;
				}
				container.classList.remove('active');
				isClickActive = false;
			}

			// 第二个视频播放/暂停函数（修正原代码声明顺序问题）
			function playVideo2() {
				if (video2.paused && hasUserInteracted) {
					video2.play().catch(err => {
						console.log('第二段视频播放失败：', err);
					});
				}
			}

			function pauseAndResetVideo2() {
				if (!video2.paused) {
					video2.pause();
					video2.currentTime = 0;
				}
				container2.classList.remove('active');
				isClickActive2 = false;
			}

			// 4. 关键：获取用户主动交互权限（解决浏览器自动播放限制）
			document.addEventListener('click', () => {
				if (!hasUserInteracted) {
					hasUserInteracted = true;
					console.log('已获得用户交互权限，可播放视频');
				}
			}, {
				once: true
			}); // 仅执行一次，避免重复绑定

			// 5. 第一个视频事件绑定
			container.addEventListener('mouseenter', () => {
				if (!isClickActive) {
					playVideo();
				}
			});
			container.addEventListener('mouseleave', () => {
				if (!isClickActive) {
					pauseAndResetVideo();
				}
			});
			container.addEventListener('click', (e) => {
				if (e.target.classList.contains('useless-btn')) {
					e.stopPropagation();
					isClickActive = !isClickActive;
					if (isClickActive) {
						container.classList.add('active');
						playVideo();
					} else {
						pauseAndResetVideo();
					}
				}
			});
			document.addEventListener('click', (e) => {
				if (isClickActive && !container.contains(e.target)) {
					pauseAndResetVideo();
				}
			});

			// 6. 第二个视频事件绑定
			container2.addEventListener('mouseenter', () => {
				if (!isClickActive2) {
					playVideo2();
				}
			});
			container2.addEventListener('mouseleave', () => {
				if (!isClickActive2) {
					pauseAndResetVideo2();
				}
			});
			container2.addEventListener('click', (e) => {
				if (e.target.classList.contains('useless-btn')) {
					e.stopPropagation();
					isClickActive2 = !isClickActive2;
					if (isClickActive2) {
						container2.classList.add('active');
						playVideo2();
					} else {
						pauseAndResetVideo2();
					}
				}
			});
			document.addEventListener('click', (e) => {
				if (isClickActive2 && !container2.contains(e.target)) {
					pauseAndResetVideo2();
				}
			});
			function downloadFile(filePath, fileName) {
  // 动态创建a标签（隐藏，仅用于触发下载）
  const link = document.createElement('a');
  link.href = filePath; // 文件路径（相对/绝对都可）
  link.download = fileName; // 下载后的自定义文件名
  link.click(); // 模拟点击a标签，触发浏览器下载
  link.remove(); // 下载后移除临时创建的a标签
}
