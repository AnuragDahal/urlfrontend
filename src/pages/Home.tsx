import { useState, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader, Copy, LinkIcon, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Hero } from "@/components/Hero";

const API_URL = import.meta.env.VITE_SHORTEN_URL;

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const Home = () => {
  const { toast } = useToast();
  const textRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isInputEditable, setIsInputEditable] = useState(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const encodedUrl = encodeURIComponent(longUrl);
      const requestUrl = `${API_URL}?long_url=${encodedUrl}`;

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
      setIsInputEditable(false);
      toast({
        title: "URL Shortened Successfully",
        description: `Your short URL is ready to use.`,
        variant: "success",
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
      copyToClipboard(textRef.current.value);
      toast({
        title: "Copied to Clipboard",
        description: "The short URL has been copied to your clipboard.",
        variant: "default",
      });
    }
  };

  const handleTryAnother = () => {
    setLongUrl("");
    setShortUrl("");
    setError(null);
    setIsInputEditable(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around bg-gradient-to-b from-background to-muted">
      <Hero />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Shorten Your URL</CardTitle>
          <CardDescription>
            Enter a long URL to get a shortened version.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Enter your long URL here"
              value={longUrl}
              onChange={(event) => setLongUrl(event.target.value)}
              required
              className="min-h-[100px]"
              disabled={!isInputEditable}
            />
            {isInputEditable ? (
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  <>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Shorten URL
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleTryAnother}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Another
              </Button>
            )}
          </form>
        </CardContent>
        {shortUrl && (
          <CardFooter className="flex flex-col space-y-2">
            <div className="flex w-full items-center space-x-2">
              <Input
                ref={textRef}
                value={shortUrl}
                readOnly
                className="flex-grow"
              />
              <Button size="icon" variant="outline" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your shortened URL is ready to use!
            </p>
          </CardFooter>
        )}
        {error && (
          <CardFooter>
            <p className="text-sm text-destructive">{error}</p>
          </CardFooter>
        )}
      </Card>
    </main>
  );
};

export default Home;
