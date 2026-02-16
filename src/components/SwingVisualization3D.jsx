import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

// Helper: renders a capsule-shaped limb connecting two 3D points
function Limb({ start, end, radius = 0.04, color = '#00e676', roughness = 0.5, metalness = 0.15 }) {
  const { position, quaternion, length } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().lerpVectors(s, e, 0.5);
    const dir = new THREE.Vector3().subVectors(e, s);
    const len = dir.length();
    dir.normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    return {
      position: [mid.x, mid.y, mid.z],
      quaternion: quat,
      length: Math.max(0.001, len - radius * 2),
    };
  }, [start, end, radius]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <capsuleGeometry args={[radius, length, 4, 12]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

// Animated 3D human golfer holding a driver
function GolferModel({ swingProfile, animationSpeed = 1, color = '#00e676' }) {
  const groupRef = useRef();
  const clubRef = useRef();
  const leftForearmRef = useRef();
  const swingPhaseRef = useRef(0);

  const bodyColor = color;
  const jointColor = '#e0e0e0';
  const shoeColor = '#1a1a2e';
  const gripColor = '#2a2a2a';
  const shaftColor = '#c0c0c0';
  const driverColor = '#333333';

  useFrame((state, delta) => {
    swingPhaseRef.current += delta * animationSpeed * 0.8;
    const phase = swingPhaseRef.current % (Math.PI * 2);

    if (groupRef.current && clubRef.current) {
      // Club/right arm swing arc
      const swingAngle = Math.sin(phase) * 1.5;
      clubRef.current.rotation.z = swingAngle - 0.3;
      clubRef.current.rotation.x = Math.sin(phase * 0.5) * 0.3;

      // Body rotation (coil/uncoil)
      const bodyRotation = Math.sin(phase) * 0.25 * (swingProfile?.hipRotation || 80) / 100;
      groupRef.current.rotation.y = bodyRotation;

      // Weight shift
      groupRef.current.position.x = Math.sin(phase) * 0.05;

      // Left forearm follows swing subtly
      if (leftForearmRef.current) {
        leftForearmRef.current.rotation.z = Math.sin(phase) * 0.2;
        leftForearmRef.current.rotation.x = Math.sin(phase * 0.5) * 0.12;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>

      {/* ===== HEAD ===== */}
      <mesh position={[0, 2.52, -0.02]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Golf cap - crown */}
      <mesh position={[0, 2.64, -0.01]} scale={[1, 0.55, 1]}>
        <sphereGeometry args={[0.145, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={shoeColor} roughness={0.8} />
      </mesh>
      {/* Golf cap - brim */}
      <mesh position={[0, 2.635, 0.06]} rotation={[-0.25, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.19, 0.015, 16, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={shoeColor} roughness={0.8} />
      </mesh>

      {/* ===== NECK ===== */}
      <Limb start={[0, 2.38, -0.01]} end={[0, 2.26, 0]} radius={0.055} color={bodyColor} />

      {/* ===== TORSO ===== */}
      {/* Chest - broad, slightly flattened front-to-back */}
      <mesh position={[0, 2.05, 0.01]} scale={[1.35, 1, 0.85]}>
        <capsuleGeometry args={[0.13, 0.22, 4, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.15} />
      </mesh>
      {/* Abdomen - slightly narrower */}
      <mesh position={[0, 1.78, 0.015]} scale={[1.15, 1, 0.85]}>
        <capsuleGeometry args={[0.11, 0.15, 4, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.15} />
      </mesh>
      {/* Pelvis / hip region */}
      <mesh position={[0, 1.56, 0.01]} scale={[1.35, 0.8, 0.85]}>
        <capsuleGeometry args={[0.1, 0.06, 4, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.15} />
      </mesh>

      {/* ===== SHOULDERS ===== */}
      <mesh position={[-0.28, 2.22, 0]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0.28, 2.22, 0]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.15} />
      </mesh>

      {/* ===== LEFT ARM ===== */}
      {/* Upper arm */}
      <Limb start={[-0.28, 2.22, 0]} end={[-0.42, 1.86, 0.1]} radius={0.05} color={bodyColor} />
      {/* Elbow */}
      <mesh position={[-0.42, 1.86, 0.1]}>
        <sphereGeometry args={[0.046, 10, 10]} />
        <meshStandardMaterial color={jointColor} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Forearm + hand (animated group pivoting at elbow) */}
      <group ref={leftForearmRef} position={[-0.42, 1.86, 0.1]}>
        <Limb start={[0, 0, 0]} end={[0.1, -0.34, 0.1]} radius={0.042} color={bodyColor} />
        {/* Wrist */}
        <mesh position={[0.1, -0.34, 0.1]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color={jointColor} roughness={0.3} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.12, -0.4, 0.12]} scale={[0.8, 1.1, 0.6]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial color={bodyColor} roughness={0.45} />
        </mesh>
      </group>

      {/* ===== RIGHT ARM + CLUB (swing group) ===== */}
      <group ref={clubRef} position={[0.28, 2.22, 0]}>
        {/* Upper arm */}
        <Limb start={[0, 0, 0]} end={[0.14, -0.36, 0.1]} radius={0.05} color={bodyColor} />
        {/* Elbow */}
        <mesh position={[0.14, -0.36, 0.1]}>
          <sphereGeometry args={[0.046, 10, 10]} />
          <meshStandardMaterial color={jointColor} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Forearm */}
        <Limb start={[0.14, -0.36, 0.1]} end={[0.05, -0.66, 0.18]} radius={0.042} color={bodyColor} />
        {/* Wrist */}
        <mesh position={[0.05, -0.66, 0.18]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color={jointColor} roughness={0.3} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.04, -0.72, 0.2]} scale={[0.8, 1.1, 0.6]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial color={bodyColor} roughness={0.45} />
        </mesh>

        {/* ===== GOLF DRIVER ===== */}
        {/* Grip (rubber) */}
        <Limb
          start={[0.035, -0.74, 0.2]}
          end={[0.02, -0.98, 0.22]}
          radius={0.016}
          color={gripColor}
          roughness={0.95}
          metalness={0}
        />
        {/* Shaft (chrome) */}
        <Limb
          start={[0.02, -0.98, 0.22]}
          end={[0.0, -1.6, 0.28]}
          radius={0.01}
          color={shaftColor}
          roughness={0.15}
          metalness={0.85}
        />
        {/* Hosel (connection piece) */}
        <mesh position={[0.0, -1.6, 0.28]}>
          <cylinderGeometry args={[0.015, 0.012, 0.04, 8]} />
          <meshStandardMaterial color="#555555" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Driver head - large, metallic, rounded */}
        <group position={[0.0, -1.64, 0.29]} rotation={[0.3, 0.1, 0.15]}>
          {/* Head body */}
          <mesh scale={[1.15, 0.5, 1]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={driverColor} roughness={0.1} metalness={0.92} />
          </mesh>
          {/* Face - slightly lighter, flat */}
          <mesh position={[0, 0, 0.095]} scale={[1.05, 0.8, 1]}>
            <circleGeometry args={[0.075, 16]} />
            <meshStandardMaterial color="#555555" roughness={0.25} metalness={0.8} />
          </mesh>
          {/* Crown accent line */}
          <mesh position={[0, 0.04, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={[1.1, 0.8, 1]}>
            <torusGeometry args={[0.06, 0.003, 4, 24, Math.PI]} />
            <meshStandardMaterial color="#00e676" roughness={0.3} metalness={0.5} emissive="#00e676" emissiveIntensity={0.3} />
          </mesh>
        </group>
      </group>

      {/* ===== LEFT LEG ===== */}
      {/* Hip joint */}
      <mesh position={[-0.17, 1.52, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Thigh */}
      <Limb start={[-0.17, 1.52, 0]} end={[-0.22, 0.96, 0.04]} radius={0.065} color={bodyColor} />
      {/* Knee */}
      <mesh position={[-0.22, 0.96, 0.04]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshStandardMaterial color={jointColor} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Calf */}
      <Limb start={[-0.22, 0.96, 0.04]} end={[-0.20, 0.4, 0]} radius={0.05} color={bodyColor} />
      {/* Ankle */}
      <mesh position={[-0.20, 0.4, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={jointColor} roughness={0.3} />
      </mesh>
      {/* Shoe */}
      <mesh position={[-0.20, 0.32, 0.06]}>
        <boxGeometry args={[0.11, 0.08, 0.22]} />
        <meshStandardMaterial color={shoeColor} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Shoe sole */}
      <mesh position={[-0.20, 0.28, 0.06]}>
        <boxGeometry args={[0.115, 0.015, 0.225]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* ===== RIGHT LEG ===== */}
      {/* Hip joint */}
      <mesh position={[0.17, 1.52, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Thigh */}
      <Limb start={[0.17, 1.52, 0]} end={[0.22, 0.96, 0.04]} radius={0.065} color={bodyColor} />
      {/* Knee */}
      <mesh position={[0.22, 0.96, 0.04]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshStandardMaterial color={jointColor} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Calf */}
      <Limb start={[0.22, 0.96, 0.04]} end={[0.20, 0.4, 0]} radius={0.05} color={bodyColor} />
      {/* Ankle */}
      <mesh position={[0.20, 0.4, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={jointColor} roughness={0.3} />
      </mesh>
      {/* Shoe */}
      <mesh position={[0.20, 0.32, 0.06]}>
        <boxGeometry args={[0.11, 0.08, 0.22]} />
        <meshStandardMaterial color={shoeColor} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Shoe sole */}
      <mesh position={[0.20, 0.28, 0.06]}>
        <boxGeometry args={[0.115, 0.015, 0.225]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* ===== GOLF BALL ON TEE ===== */}
      {/* Tee */}
      <Limb
        start={[0.1, 0.28, 0.3]}
        end={[0.1, 0.15, 0.3]}
        radius={0.007}
        color="#c4956a"
        roughness={0.7}
        metalness={0}
      />
      {/* Ball */}
      <mesh position={[0.1, 0.31, 0.3]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="white" roughness={0.35} metalness={0.05} />
      </mesh>
    </group>
  );
}

// Swing arc path visualization
function SwingArc({ profile, color = '#00e676' }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 50;
    const power = (profile?.power || 70) / 100;
    const radius = 1.2 + power * 0.5;

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 1.5 - Math.PI * 0.5;
      const x = Math.cos(t) * radius * 0.4;
      const y = Math.sin(t) * radius * 0.6 + 1.0;
      const z = Math.sin(t) * radius * 0.3;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [profile]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={0.3}
    />
  );
}

// Ground plane
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial color="#1a3d1a" transparent opacity={0.5} />
    </mesh>
  );
}

// Radar chart rendered in 3D
function RadarChart3D({ profile, position = [0, 2.5, -2] }) {
  const metrics = ['power', 'accuracy', 'tempo', 'balance', 'clubSpeed', 'faceControl'];
  const labels = ['PWR', 'ACC', 'TMP', 'BAL', 'SPD', 'FCE'];

  const points = useMemo(() => {
    return metrics.map((m, i) => {
      const angle = (i / metrics.length) * Math.PI * 2 - Math.PI / 2;
      const value = (profile?.[m] || 50) / 100;
      return new THREE.Vector3(
        Math.cos(angle) * value * 1.2,
        Math.sin(angle) * value * 1.2,
        0
      );
    });
  }, [profile]);

  const outerPoints = useMemo(() => {
    return metrics.map((_, i) => {
      const angle = (i / metrics.length) * Math.PI * 2 - Math.PI / 2;
      return new THREE.Vector3(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0);
    });
  }, []);

  return (
    <group position={position}>
      {/* Outer ring */}
      <Line
        points={[...outerPoints, outerPoints[0]]}
        color="#333333"
        lineWidth={1}
      />
      {/* Data polygon */}
      <Line
        points={[...points, points[0]]}
        color="#00e676"
        lineWidth={2}
      />
      {/* Labels */}
      {labels.map((label, i) => {
        const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <Text
            key={label}
            position={[Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0]}
            fontSize={0.12}
            color="#aaaaaa"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        );
      })}
    </group>
  );
}

// Main 3D visualization component
export default function SwingVisualization3D({
  swingProfile,
  comparisonProfile,
  height = '500px',
  showRadar = true,
  showComparison = false,
}) {
  return (
    <div style={{ width: '100%', height, borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [3, 2, 4], fov: 45 }}
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d2818 100%)' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} />
        <directionalLight position={[-3, 4, -2]} intensity={0.25} color="#4488ff" />
        <pointLight position={[-3, 3, 2]} intensity={0.4} color="#00e676" />
        <pointLight position={[2, 1, -3]} intensity={0.15} color="#ff9800" />

        {/* Main golfer */}
        <GolferModel swingProfile={swingProfile} color="#00e676" />
        <SwingArc profile={swingProfile} color="#00e676" />

        {/* Comparison golfer */}
        {showComparison && comparisonProfile && (
          <>
            <group position={[0, 0, 0]} scale={[1, 1, 1]}>
              <GolferModel
                swingProfile={comparisonProfile}
                animationSpeed={1.05}
                color="#ff9800"
              />
              <SwingArc profile={comparisonProfile} color="#ff9800" />
            </group>
          </>
        )}

        {/* Radar chart */}
        {showRadar && <RadarChart3D profile={swingProfile} />}

        <Ground />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          target={[0, 0.8, 0]}
        />
      </Canvas>
    </div>
  );
}
