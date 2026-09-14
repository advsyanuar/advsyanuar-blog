import CRTWarp from "../decoratives/crt-warp";

export default function CrtBackground() {
  return (
    <CRTWarp
    color="#dfdcdc"
    backgroundColor="#05010a"
    speed={0.5}
    curvature={0.15}
    scanlineStrength={0.25}
    scanlineFrequency={300}
    waveAmplitude={0.3}
    waveFrequency={1.4}
    bloom={0.35}
    bloomRadius={1}
    noise={0.21}
    vignette={0}
    brightness={0.95}
    pixelation={1}
    rgbShift={0.024}
    mouseReact
    mouseStrength={0.5}
    dpr={1}
    fps={30}
    paused={false}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}