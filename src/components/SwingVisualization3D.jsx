import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D golfer stick figure with swing path
function GolferModel({ swingProfile, animationSpeed = 1, color = '#00e676' }) {
  const groupRef = useRef();
  const clubRef = useRef();
  const swingPhaseRef = useRef(0);

  // Swing animation
  useFrame((state, delta) => {
    swingPhaseRef.current += delta * animationSpeed * 0.8;
    const phase = swingPhaseRef.current % (Math.PI * 2);

    if (groupRef.current && clubRef.current) {
      // Swing the club in an arc
      const swingAngle = Math.sin(phase) * 1.5;
      clubRef.current.rotation.z = swingAngle - 0.3;
      clubRef.current.rotation.x = Math.sin(phase * 0.5) * 0.3;

      // Body rotation
      const bodyRotation = Math.sin(phase) * 0.25 * (swingProfile?.hipRotation || 80) / 100;
      groupRef.current.rotation.y = bodyRotation;

      // Weight shift
      groupRef.current.position.x = Math.sin(phase) * 0.05;
    }
  });

  const bodyColor = color;
  const jointColor = '#ffffff';

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Head */}
      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={jointColor} />
      </mesh>

      {/* Neck */}
      <Line points={[[0, 2.45, 0], [0, 2.3, 0]]} color={bodyColor} lineWidth={3} />

      {/* Torso */}
      <Line points={[[0, 2.3, 0], [0, 1.5, 0]]} color={bodyColor} lineWidth={4} />

      {/* Shoulders */}
      <Line points={[[-0.35, 2.2, 0], [0.35, 2.2, 0]]} color={bodyColor} lineWidth={3} />

      {/* Left arm */}
      <Line points={[[-0.35, 2.2, 0], [-0.5, 1.8, 0.1]]} color={bodyColor} lineWidth={3} />
      <Line points={[[-0.5, 1.8, 0.1], [-0.4, 1.5, 0.15]]} color={bodyColor} lineWidth={3} />
      <mesh position={[-0.35, 2.2, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={jointColor} />
      </mesh>

      {/* Right arm + club group */}
      <group ref={clubRef} position={[0.35, 2.2, 0]}>
        <mesh>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color={jointColor} />
        </mesh>
        {/* Upper arm */}
        <Line points={[[0, 0, 0], [0.15, -0.4, 0.1]]} color={bodyColor} lineWidth={3} />
        {/* Forearm */}
        <Line points={[[0.15, -0.4, 0.1], [0.05, -0.7, 0.15]]} color={bodyColor} lineWidth={3} />
        {/* Club shaft */}
        <Line points={[[0.05, -0.7, 0.15], [0.0, -1.5, 0.2]]} color="#cccccc" lineWidth={2} />
        {/* Club head */}
        <mesh position={[0.0, -1.5, 0.2]}>
          <boxGeometry args={[0.08, 0.04, 0.12]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Hips */}
      <Line points={[[-0.2, 1.5, 0], [0.2, 1.5, 0]]} color={bodyColor} lineWidth={3} />

      {/* Left leg */}
      <Line points={[[-0.2, 1.5, 0], [-0.25, 0.9, 0]]} color={bodyColor} lineWidth={3} />
      <Line points={[[-0.25, 0.9, 0], [-0.2, 0.3, 0]]} color={bodyColor} lineWidth={3} />
      <mesh position={[-0.2, 1.5, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={jointColor} />
      </mesh>
      <mesh position={[-0.25, 0.9, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={jointColor} />
      </mesh>

      {/* Right leg */}
      <Line points={[[0.2, 1.5, 0], [0.25, 0.9, 0]]} color={bodyColor} lineWidth={3} />
      <Line points={[[0.25, 0.9, 0], [0.2, 0.3, 0]]} color={bodyColor} lineWidth={3} />
      <mesh position={[0.2, 1.5, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={jointColor} />
      </mesh>
      <mesh position={[0.25, 0.9, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={jointColor} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.2, 0.28, 0.06]}>
        <boxGeometry args={[0.1, 0.04, 0.18]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[0.2, 0.28, 0.06]}>
        <boxGeometry args={[0.1, 0.04, 0.18]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Golf ball */}
      <mesh position={[0.1, 0.3, 0.3]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="white" />
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 3, 2]} intensity={0.3} color="#00e676" />

        {/* Main golfer */}
        <GolferModel swingProfile={swingProfile} color="#00e676" />
        <SwingArc profile={swingProfile} color="#00e676" />

        {/* Comparison golfer (semi-transparent) */}
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
