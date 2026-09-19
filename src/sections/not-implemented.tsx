import { motion } from "motion/react";

interface NotImplementedProps {
  title?: string;
  message?: string;
  features?: string[];
}

export default function NotImplemented({
  title = "Not Implemented",
  message = "This feature isn't built yet. Check back later!",
  features = [],
}: NotImplementedProps) {
  return (
    <div className="relative flex flex-col h-full w-full bg-dark-teal text-beige overflow-hidden select-none">
      <div className="flex-1 flex items-center justify-center overflow-y-auto p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-2xl border border-ash-grey border-dashed bg-ink-black/60"
        >
          <div className="px-5 py-8 md:py-10">
            <p className="font-ibm text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-beige">
              {title}
            </p>
            <p className="mt-5 max-w-xl font-ibm text-sm leading-relaxed text-ash-grey uppercase tracking-wider">
              {message}
            </p>

            {features.length > 0 && (
              <section className="mt-8">
                <h3 className="font-ibm text-[10px] uppercase tracking-[0.3em] text-ink-black bg-beige w-fit px-2 py-0.5">
                  Coming Soon
                </h3>
              </section>
            )}
          </div>

        </motion.div>
      </div>
    </div>
  );
}