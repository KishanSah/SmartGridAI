import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>This is Landing Page</h1>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>Routes</h1>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/dashboard"
          rel="noopener noreferrer"
        >
          
          /dashboard
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/lida"

          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          /lida
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/simulator"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          /simulator
        </a>
      </footer>
    </div>
  );
}
