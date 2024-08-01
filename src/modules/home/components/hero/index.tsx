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
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-4 small:p-32 gap-4 bg-black bg-opacity-30">
        <span>
          <Heading
            level="h1"
            className="text-5xl leading-tight text-white font-bold drop-shadow-lg shadow-black"
          >
            Scopri gli strumenti giusti per te
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-tight text-gray-100 font-light mt-2 drop-shadow-lg shadow-black"
          >
            nel nostro ricco catalogo
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
