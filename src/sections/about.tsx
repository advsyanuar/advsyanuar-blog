import { motion, type Variants } from "motion/react";
import type { PropsWithChildren } from "react";
import useBio from "../hooks/useBio";
import type {
  Biography,
  BiographyAward,
  BiographyCertification,
  BiographyEducation,
  BiographyExperience,
  BiographyProject,
  BiographyPublication,
} from "../models/biography";

const wallVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

interface TileProps extends PropsWithChildren {
  label: string;
  className?: string;
}

const Tile = ({ label, className = "", children }: TileProps) => (
  <motion.section
    variants={tileVariants}
    className={`group relative flex flex-col overflow-hidden border border-white/10 bg-dark-teal/20 ${className}`}
  >
    <header className="mb-2 flex items-center gap-3 border-b border-ink-black bg-ash-grey px-4 py-2">
      <h3 className="font-ibm text-lg uppercase tracking-[0.3em] font-semibold text-ink-black">
        {label}
      </h3>
    </header>
    <div className="flex-1 p-4">{children}</div>
  </motion.section>
);

const Chip = ({ children }: PropsWithChildren) => (
  <span className="inline-flex items-center px-2.5 py-1 font-ibm text-xs text-neutral-200 bg-neutral-800/60 backdrop-blur-sm border border-white/10">
    {children}
  </span>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-1.5 last:border-b-0">
    <span className="font-ibm text-[10px] uppercase tracking-[0.25em] text-neutral-500 flex-none">
      {label}
    </span>
    <span className="text-sm text-neutral-200 text-right">{value}</span>
  </div>
);

const LoadingState = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 bg-neutral-950 text-white select-none overflow-hidden">
    <motion.p
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity }}
      className="font-mono text-sm tracking-[0.4em] uppercase text-neutral-400"
    >
      Loading
    </motion.p>
    <div className="flex gap-2">
      {[0, 1, 2, 3, 4].map((_, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.14 }}
          className={`h-3 w-3 ${i % 2 === 0 ? "bg-emerald-400" : "bg-neutral-600"} ${i === 2 ? "bg-emerald-400" : ""}`}
        />
      ))}
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="relative flex h-full w-full items-center justify-center bg-neutral-950 text-white select-none overflow-hidden p-8">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg bg-rose-500/40 p-6 md:p-8"
    >
      <h3 className="font-ibm text-base font-normal text-neutral-400 mt-3">
        Uh Oh! Looks like the service is on vacation. Try again later!
      </h3>
      <p className="mt-4 font-mono text-sm leading-relaxed text-red-300 wrap-break-word">
        {message}
      </p>
    </motion.div>
  </div>
);

const ExperienceBlock = ({
  item,
  isLast = false,
}: {
  item: BiographyExperience;
  isLast?: boolean;
}) => (
  <div className="relative flex gap-4">
    <div className="flex flex-col items-center pt-1.5">
      <span className="h-2 w-2 shrink-0 bg-emerald-400" />
      {!isLast && <span className="mt-1 w-px flex-1 bg-white/15" />}
    </div>
      <div className="min-w-0 flex-1 pb-6">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-xs text-emerald-400">
            {item.yearRange}
          </span>
          <span className="text-base font-semibold text-white">{item.role}</span>
          <span className="font-ibm text-xs text-neutral-400">
            {item.company}
          </span>
        </div>
        {item.responsibilities.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-neutral-300">
                <span className="flex-none text-emerald-400">–</span>
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        )}
        {item.techStacks.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.techStacks.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );

const EducationBlock = ({ item }: { item: BiographyEducation }) => (
  <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4 last:border-b-0">
    <div>
      <p className="text-sm font-semibold text-white">{item.degree}</p>
      <p className="mt-1 font-ibm text-xs text-neutral-400">{item.school}</p>
    </div>
    <div className="flex flex-none flex-col items-end gap-1">
      <span className="font-mono text-[11px] text-emerald-400">
        {item.yearRange}
      </span>
      {item.gpa && (
        <span className="font-ibm text-[11px] text-neutral-500">GPA {item.gpa}</span>
      )}
    </div>
  </div>
);

const CertificationBlock = ({ item }: { item: BiographyCertification }) => (
  <div className="border-b border-white/5 pb-4 last:border-b-0">
    <div className="flex items-baseline justify-between gap-4">
      <p className="text-sm text-white">{item.name}</p>
      <span className="font-mono text-[11px] text-emerald-400 flex-none">
        {item.year}
      </span>
    </div>
    <p className="mt-1 font-ibm text-xs text-neutral-400">{item.issuer}</p>
    {item.credentialLink && (
      <a
        href={item.credentialLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        credential ↗
      </a>
    )}
  </div>
);

const ProjectBlock = ({ item }: { item: BiographyProject }) => (
  <div className="group/project border-b border-white/5 pb-4 last:border-b-0">
    <div className="flex items-baseline justify-between gap-4">
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
      >
        {item.name}
      </a>
      <span className="font-mono text-[11px] text-emerald-400 flex-none">
        {item.yearRange}
      </span>
    </div>
    {item.description && (
      <p className="mt-2 text-xs leading-relaxed text-neutral-400">
        {item.description}
      </p>
    )}
  </div>
);

const AwardBlock = ({ item }: { item: BiographyAward }) => (
  <div className="border-b border-white/5 pb-3 last:border-b-0">
    <div className="flex items-baseline justify-between gap-4">
      <p className="text-sm font-semibold text-white">{item.name}</p>
      <span className="font-mono text-[11px] text-emerald-400 flex-none">
        {item.year}
      </span>
    </div>
    <p className="mt-1 font-ibm text-xs text-neutral-400">{item.issuer}</p>
  </div>
);

const PublicationBlock = ({ item }: { item: BiographyPublication }) => (
  <div className="border-b border-white/5 pb-3 last:border-b-0">
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-baseline justify-between gap-4 text-sm text-white hover:text-emerald-400 transition-colors"
    >
      <span>{item.title}</span>
      <span className="font-mono text-[11px] text-emerald-400 flex-none">
        {item.year}
      </span>
    </a>
  </div>
);

interface BioWallProps {
  bio: Biography;
}

// Please not to be confused with BioWare. MASS EFFECT IS ONE OF MY FAVORITE GAME.
const BioWall = ({ bio }: BioWallProps) => {
  const fullName = [bio.firstName, bio.middleName, bio.lastName]
    .filter(Boolean)
    .join(" ");
  const hasProjects = Boolean(bio.projects?.length);
  const hasAwards = Boolean(bio.awards?.length);
  const hasPublications = Boolean(bio.publications?.length);
  const siblingSpan = hasProjects ? "lg:col-span-1" : "lg:col-span-2";

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-ink-black text-beige select-none">
      <div className="flex-1 overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={wallVariants}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 md:p-6 lg:grid-cols-4 lg:gap-3.5"
        >
          <Tile label="Profile" className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
                  {bio.domicile} · Currently Unemployed :( 
                </p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl xl:text-6xl">
                  {fullName}
                </h2>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-neutral-300 md:text-base">
                  {bio.professionalSummary}
                </p>
              </div>
              <span className="hidden h-px flex-1 bg-white/10 md:mb-3 md:mx-8 md:block" />
            </div>
          </Tile>

          <Tile label="Personal" className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-5">
                <InfoRow label="Birth" value={bio.dateOfBitrh} />
                <InfoRow label="Domicile" value={bio.domicile} />
                <InfoRow label="Nationality" value={bio.nationality} />
              </div>
              {bio.languages.length > 0 && (
                <div>
                  <p className="mb-3 font-ibm text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bio.languages.map((l) => (
                      <Chip key={l}>{l}</Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Tile>

          <Tile label="Skills" className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6">
              {bio.skills.map((group) => (
                <div key={group.category}>
                  <p className="mb-3 font-ibm text-[10px] uppercase tracking-[0.25em] text-emerald-400/80">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Tile>

          <Tile label="Experience" className="lg:col-span-4">
            <div className="flex h-full flex-col">
              {bio.experiences.map((exp, i) => (
                <ExperienceBlock
                  key={`${exp.company}-${exp.yearRange}`}
                  item={exp}
                  isLast={i === bio.experiences.length - 1}
                />
              ))}
            </div>
          </Tile>

          <Tile label="Education" className="lg:col-span-2">
            <div className="space-y-4">
              {bio.educations.map((edu) => (
                <EducationBlock
                  key={`${edu.school}-${edu.degree}`}
                  item={edu}
                />
              ))}
            </div>
          </Tile>

          <Tile label="Certifications" className="lg:col-span-2">
            <div className="space-y-4">
              {bio.certifications.map((cert) => (
                <CertificationBlock
                  key={`${cert.name}-${cert.year}`}
                  item={cert}
                />
              ))}
            </div>
          </Tile>

          {hasProjects && (
            <Tile label="Projects" className="lg:col-span-2">
              <div className="space-y-4">
                {bio.projects!.map((p) => (
                  <ProjectBlock key={`${p.name}-${p.yearRange}`} item={p} />
                ))}
              </div>
            </Tile>
          )}

          {hasAwards && (
            <Tile label="Awards" className={siblingSpan}>
              <div className="space-y-3">
                {bio.awards!.map((a) => (
                  <AwardBlock key={`${a.name}-${a.year}`} item={a} />
                ))}
              </div>
            </Tile>
          )}

          {hasPublications && (
            <Tile label="Publications" className={siblingSpan}>
              <div className="space-y-3">
                {bio.publications!.map((p) => (
                  <PublicationBlock key={`${p.title}-${p.year}`} item={p} />
                ))}
              </div>
            </Tile>
          )}
        </motion.div>
      </div>

      <footer className="basis-1/12 flex-none flex items-center justify-between gap-4 border-t border-white/10 bg-neutral-900/90 px-6 py-4 backdrop-blur-md md:px-10">
        <div className="flex-none font-mono text-[11px] tracking-widest text-neutral-400">
          CURRENTLY PLAYED TRACK ON SPOTIFY (WILL BE) DISPLAYED HERE
        </div>
      </footer>
    </div>
  );
};

const About = () => {
  const { data, error } = useBio();
  if (error) return <ErrorState message={error} />;
  if (!data) return <LoadingState />;
  return <BioWall bio={data} />;
};

export default About;