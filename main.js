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
renderer.render(scene, camera);

//Resize
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width/ sizes.height;
  camera.updateProjectionMatrix() // what does this do? 
  renderer.setSize(sizes.width, sizes.height);

  renderer.render(scene,camera); // this will re-render on resize.
})