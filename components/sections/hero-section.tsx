"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { hero, heroCard } from "@/constants/contents";
import ParticleNetwork from "../canvas/particle-network";

interface HeroSectionProps {
  cardPosition?: "left" | "middle" | "right";
}

function Scene({ scrollImpulse = 0 }: { scrollImpulse?: number }) {
  const groupRef = useRef<any>(null);
  const velRef = useRef(0);

  // Apply incoming scroll impulse to velocity; Scene re-renders when prop changes
  useEffect(() => {
    if (!Number.isFinite(scrollImpulse)) return;
    velRef.current += scrollImpulse * 0.04; // scale impulse to angular velocity
  }, [scrollImpulse]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    // Integrate velocity into rotation (rotate to the right on positive impulse)
    g.rotation.y += velRef.current;
    // Dampen velocity smoothly
    velRef.current *= 0.92;
    if (Math.abs(velRef.current) < 1e-4) velRef.current = 0;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <group ref={groupRef}>
        <Float speed={1.6} rotationIntensity={0.45} floatIntensity={0.45}>
          <mesh>
            <torusKnotGeometry args={[1, 0.3, 96, 12]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
      />
      <Environment preset="city" />
    </>
  );
}

export function HeroSection({ cardPosition = "right" }: HeroSectionProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef<number | null>(null);
  const [scrollImpulse, setScrollImpulse] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (!isScrolling) setIsScrolling(true);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => setIsScrolling(false), 180);

      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      // Map scroll delta to a small impulse; positive dy (scroll down) => rotate right
      const mag = Math.min(Math.abs(dy), 120) / 120; // 0..1
      const dir = dy >= 0 ? 1 : -1;
      // nudge the Scene; sign determines direction
      setScrollImpulse(dir * mag);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrolling]);

  return (
    <section
      id="home"
      className="scroll-section relative min-h-screen flex items-start md:items-center justify-start md:justify-center overflow-hidden"
    >
      {/* Canvas Background */}
      <ParticleNetwork />
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-primary/40" />

      <div className="container relative z-10 px-4 pt-20 md:pt-32 pb-0">
        <div className="flex flex-col items-center">
          {/* Header Text */}
          <div className="text-center mb-4 md:mb-10 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 md:pt-4 text-balance">
              {hero.heroText}{" "}
              <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {hero.heroTextWithGradient}
              </span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {hero.heroTextDetail}
            </p>
          </div>

          {/* 3D Model Container (relative for overlay card) */}
          <div
            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 md:mb-12"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={isScrolling ? 1 : [1, 1.5]}
              gl={{ powerPreference: "high-performance", antialias: true }}
            >
              <Suspense fallback={null}>
                <Scene scrollImpulse={scrollImpulse} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
      {/* Section-level overlay Card: bottom on mobile, bottom-left on desktop */}
      <div className="w-full pointer-events-auto absolute bottom-6 md:bottom-40 flex items-start z-20">
        <div
          className={cn(
            // Keep within hero container scope
            "w-full pl-8 pr-8 md:pl-32 md:pr-0 flex justify-start",
            // Desktop left alignment with small left padding
            cardPosition === "left" && "md:justify-start",
            // Desktop middle/right alignment
            cardPosition === "middle" && "md:justify-center",
            cardPosition === "right" && "md:justify-end",
          )}
        >
          <Card className="w-full md:w-[350px] backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                Discover More
              </CardTitle>
              <CardDescription className="text-base">
                Explore our innovative features and cutting-edge technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {heroCard.heroCardBulletPoint.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full group cursor-pointer" size="lg">
                Explore Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
