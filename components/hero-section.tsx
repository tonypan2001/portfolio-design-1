"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  cardPosition?: "left" | "middle" | "right"
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="city" />
    </>
  )
}

export function HeroSection({ cardPosition = "right" }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="flex flex-col items-center">
          {/* Header Text */}
          <div className="text-center mb-8 md:mb-12 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-balance">
              Welcome to the Future of{" "}
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                3D Web Design
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience the next generation of web interfaces with stunning 3D elements and modern design
            </p>
          </div>

          {/* 3D Model Container */}
          <div className="w-full max-w-5xl h-[300px] md:h-[400px] lg:h-[500px] mb-8 md:mb-12">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

          {/* Detail Card with configurable position */}
          <div
            className={cn(
              "w-full max-w-5xl",
              cardPosition === "left" && "flex justify-start",
              cardPosition === "middle" && "flex justify-center",
              cardPosition === "right" && "flex justify-end",
            )}
          >
            <Card className="w-full md:w-[400px] backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Discover More</CardTitle>
                <CardDescription className="text-base">
                  Explore our innovative features and cutting-edge technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span>Interactive 3D experiences</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span>Responsive across all devices</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span>Modern glassmorphic design</span>
                  </li>
                </ul>
                <Button className="w-full group" size="lg">
                  Explore Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
