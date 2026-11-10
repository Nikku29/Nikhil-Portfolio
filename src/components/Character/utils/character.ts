import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

// Kratos model by codyc2228 on Sketchfab, CC BY 4.0:
// https://sketchfab.com/3d-models/kratos-aa6f51d38b154373a207d20801d1b3bc
// Compressed from 36 MB to ~4.7 MB (Draco geometry + WebP textures).
const MODEL_URL = "/models/kratos.glb";

// The model has no skeleton, but the head is made of separate meshes.
// We regroup them under a pivot at the neck so the head can follow the cursor.
const HEAD_MESH_NAMES = [
  "Object_22", // head skin
  "Object_8", // beard
  "Object_20", // eyebrows
  "Object_38", // eyelashes
  "Object_40", // eye corners
  "Object_50", // eyes
];

// Target height of the character in scene units, and where its feet sit.
const TARGET_HEIGHT = 13.5;

export type CharacterRig = {
  model: THREE.Object3D;
  head: THREE.Object3D | null;
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () =>
    new Promise<{ gltf: GLTF; rig: CharacterRig }>((resolve, reject) => {
      loader.load(
        MODEL_URL,
        async (gltf) => {
          const model = gltf.scene;

          // Normalise size and put the feet on y = 0, centred on x/z.
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const scale = TARGET_HEIGHT / size.y;
          model.scale.setScalar(scale);
          box.setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.x -= center.x;
          model.position.z -= center.z;
          model.position.y -= box.min.y;
          model.updateMatrixWorld(true);

          const head = buildHeadPivot(model);

          model.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.frustumCulled = true;
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat && "envMapIntensity" in mat) mat.envMapIntensity = 1;
            }
          });

          await renderer.compileAsync(model, camera, scene);
          dracoLoader.dispose();

          const rig = { model, head };
          resolve({ gltf, rig });
          setCharTimeline(rig, camera);
          setAllTimeline();
        },
        undefined,
        (error) => {
          console.error("Error loading 3D model:", error);
          reject(error);
        }
      );
    });

  return { loadCharacter };
};

function buildHeadPivot(model: THREE.Object3D): THREE.Object3D | null {
  const parts = HEAD_MESH_NAMES.map((n) => model.getObjectByName(n)).filter(
    (o): o is THREE.Object3D => !!o
  );
  if (!parts.length) return null;

  // Pivot at the bottom-centre of the head skin (the neck), slightly back.
  const headSkin = parts[0];
  const box = new THREE.Box3().setFromObject(headSkin);
  const pivotWorld = new THREE.Vector3(
    (box.min.x + box.max.x) / 2,
    box.min.y + (box.max.y - box.min.y) * 0.12,
    (box.min.z + box.max.z) / 2
  );

  const pivot = new THREE.Group();
  pivot.name = "headPivot";
  model.add(pivot);
  pivot.position.copy(model.worldToLocal(pivotWorld.clone()));
  pivot.updateMatrixWorld(true);
  // attach() keeps each mesh exactly where it is in world space.
  parts.forEach((p) => pivot.attach(p));

  // Eyeballs and teeth live inside a mesh that also covers the body, so cut
  // out the triangles above the neck and move just those with the head.
  for (const name of SHARED_MESH_NAMES) {
    const mesh = model.getObjectByName(name) as THREE.Mesh | undefined;
    if (!mesh?.isMesh) continue;
    const upper = splitMeshAbove(mesh, box.min.y);
    if (upper) pivot.attach(upper);
  }
  return pivot;
}

// Meshes that mix head parts (eyes, teeth) with body parts.
const SHARED_MESH_NAMES = ["Object_42"];

function splitMeshAbove(mesh: THREE.Mesh, worldY: number): THREE.Mesh | null {
  const geo = mesh.geometry as THREE.BufferGeometry;
  const index = geo.getIndex();
  const pos = geo.getAttribute("position");
  if (!index || !pos) return null;

  mesh.updateMatrixWorld(true);
  const v = new THREE.Vector3();
  const above = new Uint8Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
    above[i] = v.y > worldY ? 1 : 0;
  }

  const upperIdx: number[] = [];
  const lowerIdx: number[] = [];
  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i), b = index.getX(i + 1), c = index.getX(i + 2);
    const target = above[a] && above[b] && above[c] ? upperIdx : lowerIdx;
    target.push(a, b, c);
  }
  if (!upperIdx.length) return null;

  const upperGeo = geo.clone();
  upperGeo.setIndex(upperIdx);
  geo.setIndex(lowerIdx);
  const upper = new THREE.Mesh(upperGeo, mesh.material);
  upper.name = mesh.name + "_head";
  mesh.parent!.add(upper);
  upper.position.copy(mesh.position);
  upper.quaternion.copy(mesh.quaternion);
  upper.scale.copy(mesh.scale);
  upper.updateMatrixWorld(true);
  return upper;
}

export default setCharacter;
