import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section>
      <div className="container flex flex-col gap-3 items-center space-y- text-center pt-12">
        <div className="w-full font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Simplify your Links
        </div>
        <div>
          <p className="max-w-[700px] text-lg font-medium italic pt-3 md:text-xl lg:text-2xl lg:pt-4">
            Transform long, complex URLs into short, memorable links with just a
            click.
          </p>
        </div>
        <div className="pt-20">
          <Button>
            Get Started
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
