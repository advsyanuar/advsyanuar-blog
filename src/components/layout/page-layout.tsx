import type { PropsWithChildren } from "react";
import CrtBackground from "./crt-background";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-transparent text-white font-mono antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <CrtBackground />
      <div className="z-20 w-full h-full flex flex-col">
        <article className="flex-1">
            {children}
        </article>
      </div>
    </main>
  );
}