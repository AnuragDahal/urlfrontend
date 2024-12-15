import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="container flex flex-col items-center gap-6 text-center">
        <h1 className="w-full font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Simplify your Links
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl lg:text-2xl">
          Transform long, complex URLs into short, memorable links with just a
          click.
        </p>
        <Button size="lg" className="mt-4">
          Get Started
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
