import { useState, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";
import { Loader as LoaderIcon, Copy as CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const API_URL = "https://snip-nsca.onrender.com/shorten";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => console.log("Copied to clipboard"),
    (err) => console.error("Failed to copy to clipboard", err)
  );
};

const Hero: React.FC = () => {
  const { toast } = useToast();
  const textRef = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(false);
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const encodedUrl = encodeURIComponent(longUrl);
      const requestUrl = `${API_URL}?long_url=${encodedUrl}`;

      console.log("Request URL:", requestUrl); // For debugging

      const response = await fetch(requestUrl, {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      const data = await response.json();
      setShortUrl(data.short_url || "");
      toast({
        title: "URL Shortened Successfully",
        description: `Your short URL is: ${data.short_url || ""}`,
        variant: "success"
      });
    } catch (err: any) {
      const errorMessage = err.message || "Failed to shorten URL";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (textRef.current) {
      copyToClipboard(textRef.current.innerText);
      toast({
        title: "Copied to Clipboard",
        description: "The short URL has been copied to your clipboard.",
        variant: "default",
      });
    }
  };

  return (
    <main className="container">
      <div id="heading" className="flex items-center justify-center h-auto">
        <h1 className="pt-5 font-bold text-4xl">Shortify</h1>
      </div>
      <div className="flex items-center justify-center mt-32 flex-col gap-8">
        <form
          className="flex max-w-md justify-center gap-4 items-center w-full"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Enter URL here"
            value={longUrl}
            onChange={(event) => setLongUrl(event.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="flex items-center justify-center">
            {loading ? (
              <div className="relative">
                <div className="spinner"></div>
                <span className="absolute inset-0 flex items-center justify-center text-blue-500">
                  <LoaderIcon size={24} className="opacity-0" />
                </span>
              </div>
            ) : (
              "Shorten"
            )}
          </Button>
        </form>

        {shortUrl && (
          <div
            id="Copy"
            className="bg-muted border h-fit px-6 py-2 rounded-md bg-green-400 flex items-center gap-4"
          >
            <p className="text-center flex-grow">
              Your short URL is: <span ref={textRef}>{shortUrl}</span>
            </p>
            <CopyIcon
              className="text-center text-sm w-8 text-muted-foreground cursor-pointer"
              onClick={handleCopy}
            />
          </div>
        )}

        {error && (
          <div className="text-red-500">
            {error}
          </div>
        )}
      </div>
    </main>
  );
};

export default Hero;