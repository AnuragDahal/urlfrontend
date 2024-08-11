"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";
import { Loader } from "lucide-react";
import { Copy } from "lucide-react";  

const URL_API = process.env.API_URL;
console.log(URL_API);

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => console.log("Copied to clipboard"),
    (err) => console.error("Failed to copy to clipboard", err)
  );
};

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleCopy = () => {
    if (textRef.current) {
      copyToClipboard(textRef.current.innerText);
    }
  };

  return (
    <main className="container">
      <div id="heading" className="flex items-center justify-center h-auto">
        <h1 className="pt-5 font-bold text-4xl">Shortify</h1>
      </div>
      <div className="flex items-center justify-center mt-32 flex-col gap-8">
        <div className="flex max-w-md justify-center gap-4 items-center w-full">
          <Textarea placeholder="Enter URL here" />
          <Button
            onClick={() => {
              setLoading(true);
              // Simulate an API call
              setTimeout(() => {
                setShortUrl("http://short.url/example"); // Replace with actual URL generation
                setLoading(false);
              }, 2000);
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <Loader size="1.5rem" className="animate-spin" /> : "Shorten"}
          </Button>
        </div>

        {shortUrl && (
          <div
            id="Copy"
            className="bg-muted border h-fit px-6 py-2 rounded-md bg-green-400 flex items-center gap-4"
          >
            <p className="text-center flex-grow">Your short URL is: <span ref={textRef}>{shortUrl}</span></p>
            <Copy
              className="text-center text-sm w-8 text-muted-foreground cursor-pointer"
              onClick={handleCopy}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Hero;
