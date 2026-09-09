export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-[#242424]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end md:justify-between gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A5A5A] mb-3">
            Index / 00
          </p>
          <p className="font-display text-3xl md:text-4xl text-[#F5F5F5] leading-[1.05] max-w-md">
            Let's build something quiet, and considered.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/anuj-shukla-aba470196/"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline text-xs uppercase tracking-[0.18em] text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/file/d/1gerUpX21IzRlN5F18LThwrSOnyEElQ91/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline text-xs uppercase tracking-[0.18em] text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
            >
              Resume
            </a>
            <a
              href="mailto:anujshukla521as@gmail.com"
              className="animated-underline text-xs uppercase tracking-[0.18em] text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
            >
              Email
            </a>
          </div>
          <p className="text-[#5A5A5A] text-xs">
            &copy; {new Date().getFullYear()} Anuj Shukla. Designed in the dark.
          </p>
        </div>
      </div>
    </footer>
  )
}
