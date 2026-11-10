import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./utils/mouseUtils";
import { setProgress } from "../Loading";
import { gsap } from "gsap";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      // Capping at 1.5 keeps the model sharp while rendering ~44% fewer
      // pixels than 2x on retina and phone screens.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headPivot: THREE.Object3D | null = null;

      let onResize: (() => void) | null = null;

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter()
        .then(({ rig }) => {
          const character = rig.model;
          headPivot = rig.head;
          setChar(character);
          // Start slightly lowered and hidden; the intro raises it into view.
          character.visible = false;
          scene.add(character);
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              character.visible = true;
              gsap.fromTo(
                character.position,
                { y: character.position.y - 1.5 },
                { y: character.position.y, duration: 1.6, ease: "power3.out" }
              );
            }, 1200);
          });
          onResize = () => handleResize(renderer, camera, canvasDiv, rig);
          window.addEventListener("resize", onResize);
        })
        .catch(() => progress.clear());

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      // Previously every touch added another touchmove listener, so the page
      // got slower the more someone scrolled on a phone. Use one listener and
      // only track the finger after a short hold, as before.
      let debounce: number | undefined;
      let trackTouch = false;
      const onTouchMove = (e: TouchEvent) => {
        if (trackTouch) handleTouchMove(e, (x, y) => (mouse = { x, y }));
      };
      const onTouchStart = () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          trackTouch = true;
        }, 200);
      };

      const onTouchEnd = () => {
        clearTimeout(debounce);
        trackTouch = false;
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove, { passive: true });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
        landingDiv.addEventListener("touchmove", onTouchMove, { passive: true });
        landingDiv.addEventListener("touchend", onTouchEnd, { passive: true });
      }

      let isVisible = true;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.05 }
      );
      if (canvasDiv.current) {
        observer.observe(canvasDiv.current);
      }

      let frameId = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!isVisible) return;
        if (headPivot) {
          // Near the top of the page the head turns to follow the cursor;
          // further down it eases back to looking straight ahead.
          const follow = window.scrollY < 200;
          const yaw = follow ? THREE.MathUtils.clamp(mouse.x, -1, 1) * 0.5 : 0;
          const pitch = follow
            ? THREE.MathUtils.clamp(-mouse.y, -0.6, 1) * 0.22
            : 0;
          headPivot.rotation.y = THREE.MathUtils.lerp(
            headPivot.rotation.y,
            yaw,
            interpolation.y * 0.6
          );
          headPivot.rotation.x = THREE.MathUtils.lerp(
            headPivot.rotation.x,
            pitch,
            interpolation.x * 0.6
          );
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        observer.disconnect();
        if (onResize) window.removeEventListener("resize", onResize);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchmove", onTouchMove);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
