import {
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import "./style.css"
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const scene = new Scene();

/* Create a Sphere */

/* geometry -> is just the shape */
const geometry = new SphereGeometry(3, 64, 64);
//radius,width and height segments.

/*What the shape is filled with -> material */
const material = new MeshStandardMaterial({
  color: "#00ff83", //reason for green color
});

//mesh -> combination of geometry and material
const mesh = new Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Camera
// const camera = new PerspectiveCamera(45, 800 / 600);
const camera = new PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20; // if this is not given, then sphere and camera will be in same position. -> so won't be able to see anything on scene.
scene.add(camera);
//fov, and aspect ratios.
//fov above 50 can cause distortion

//Light
const light = new PointLight(0xFFFFFF, 100, 100);
//first arg -> hexadecimal number of color -> what is this.
//second arg -> intensity -> if set to 1 not able to see anything on my screen, but works for yt.
light.position.set(0,10,10)
scene.add(light);


//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new WebGLRenderer({ canvas });
//how big canvas is and where to render it - code below
// renderer.setSize(800, 600);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2); //much smoother edges.
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true

//Resize
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width/ sizes.height;
  camera.updateProjectionMatrix() // what does this do? 
  renderer.setSize(sizes.width, sizes.height);

  // renderer.render(scene,camera); // this will re-render on resize.
})

//animation loop
function animate() {
  controls.update() //makes the movement keep going even after mouse release.
  renderer.render(scene,camera)
  window.requestAnimationFrame(animate)
} 
//we know what this code does? but why does it work the way it does?
animate();

//Timeline
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, {z:0,x:0,y:0}, {z:1,x:1,y:1})
//what is mesh.scale?
tl.fromTo("nav", {y:'-100%'}, {y: '0%'})
tl.fromTo(".title", {opacity:0}, {opacity:1})