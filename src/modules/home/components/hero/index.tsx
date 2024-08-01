import { Github } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";

const Hero = () => {
  return (
    <div
      className="h-[75vh] w-full border-b border-ui-border-base relative bg-cover bg-center"
      style={{
        backgroundImage: "url('https://ac-bucket.fra1.digitaloceanspaces.com/Sewing_Machines-164-2_Chapstick_HOlder.webp')",
      }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-4 small:p-32 gap-4 backdrop-blur-md bg-black bg-opacity-50">
        <span>
          <Heading
            level="h1"
            className="text-5xl leading-tight text-white font-bold drop-shadow-lg"
          >
            Scopri gli strumenti giusti per te
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-tight text-gray-200 font-light mt-2 drop-shadow-lg"
          >
            Shop with Medusa and Next.js
          </Heading>
        </span>
        <a
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
        >
          <Button variant="secondary" className="mt-4 flex items-center gap-2">
            View on GitHub
            <Github />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
