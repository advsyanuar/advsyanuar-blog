import type { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-transparent text-beige font-mono antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* <CrtBackground /> */}
      <img src="https://images.unsplash.com/photo-1788848826442-d99576c9b241?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full fixed z-0" />
      <div className="z-20 w-full h-full flex flex-col">
        <article className="flex-1">
            {children}
        </article>
      </div>
    </main>
  );
}