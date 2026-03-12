window.addEventListener('load', async event => {
	let THREE = await import('https://cdn.skypack.dev/pin/three@v0.132.2-1edwuDlviJO0abBvWgKd/mode=imports,min/optimized/three.js');
	let Joypad = await import('./joypad.js');
	console.log(Joypad.keys);

	let canvas = document.getElementById("canvas");

	let scene = new THREE.Scene();
	let camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);

	let renderer = new THREE.WebGLRenderer();
	renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
	canvas.appendChild(renderer.domElement);

	let geometry = new THREE.BoxGeometry();
	let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	let cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	camera.position.z = 5;

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	};

	animate();
});