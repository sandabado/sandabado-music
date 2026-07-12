"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Dodecahedron, Edges, Float, Icosahedron, Octahedron, Tetrahedron } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

type Solid = "Tetrahedron" | "Octahedron" | "Icosahedron" | "Cube" | "Dodecahedron"
const colours: Record<Solid, string> = { Tetrahedron:"#C2542D", Octahedron:"#D4AF37", Icosahedron:"#2BA8A0", Cube:"#4A6741", Dodecahedron:"#6D4AFF" }

function Geometry({ solid }: { solid: Solid }) { const ref = useRef<THREE.Group>(null); useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.x += delta*.16; ref.current.rotation.y += delta*.24 } }); const colour = colours[solid]; const material = <meshStandardMaterial color={colour} emissive={colour} emissiveIntensity={.48} transparent opacity={.26} metalness={.25} roughness={.35}/>; const edges = <Edges color={colour} transparent opacity={.9}/>; return <Float speed={1} floatIntensity={.2}><group ref={ref}>{solid === "Tetrahedron" ? <Tetrahedron args={[1.1,0]}>{material}{edges}</Tetrahedron> : null}{solid === "Octahedron" ? <Octahedron args={[1.12,0]}>{material}{edges}</Octahedron> : null}{solid === "Icosahedron" ? <Icosahedron args={[1.08,0]}>{material}{edges}</Icosahedron> : null}{solid === "Cube" ? <Box args={[1.35,1.35,1.35]}>{material}{edges}</Box> : null}{solid === "Dodecahedron" ? <Dodecahedron args={[1,0]}>{material}{edges}</Dodecahedron> : null}</group></Float> }

export function PillarSolid({ solid }: { solid: Solid }) { return <div className="h-24 overflow-hidden border border-current/20 bg-[var(--void)]/50"><Canvas camera={{ fov:42, position:[0,0,4.2] }} dpr={[1,1.4]}><ambientLight intensity={.5}/><pointLight position={[2,2,3]} intensity={2} color="#F5D58B"/><Geometry solid={solid}/></Canvas></div> }
