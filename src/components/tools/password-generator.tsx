"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, Copy, Check, Key, RefreshCw } from "lucide-react";
import { generatePassword } from "@/app/actions/generatePassword";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  });

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const newPassword = await generatePassword(options);
      setPassword(newPassword);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Password Generator</CardTitle>
        <CardDescription>
          Generate secure passwords with customizable criteria.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Password Length: {options.length}</Label>
            <Slider
              value={[options.length]}
              onValueChange={(value) => setOptions({...options, length: value[0]})}
              max={64}
              min={4}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Character Types</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="uppercase" 
                  checked={options.includeUppercase} 
                  onCheckedChange={(checked) => setOptions({...options, includeUppercase: !!checked})} 
                />
                <Label htmlFor="uppercase" className="font-normal">Uppercase (A-Z)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="lowercase" 
                  checked={options.includeLowercase} 
                  onCheckedChange={(checked) => setOptions({...options, includeLowercase: !!checked})} 
                />
                <Label htmlFor="lowercase" className="font-normal">Lowercase (a-z)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="numbers" 
                  checked={options.includeNumbers} 
                  onCheckedChange={(checked) => setOptions({...options, includeNumbers: !!checked})} 
                />
                <Label htmlFor="numbers" className="font-normal">Numbers (0-9)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="symbols" 
                  checked={options.includeSymbols} 
                  onCheckedChange={(checked) => setOptions({...options, includeSymbols: !!checked})} 
                />
                <Label htmlFor="symbols" className="font-normal">Symbols (!@#$)</Label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="excludeSimilar" 
                checked={options.excludeSimilar} 
                onCheckedChange={(checked) => setOptions({...options, excludeSimilar: !!checked})} 
              />
              <Label htmlFor="excludeSimilar" className="font-normal">Exclude similar characters (0, O, l, I)</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={loading} className="flex-1">
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Key className="mr-2 h-4 w-4" />
                  <span>Generate Password</span>
                </div>
              )}
            </Button>
            {password && (
              <Button onClick={handleGenerate} variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {password && !loading && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Generated Password</Label>
                  <Button onClick={handleCopy} variant="ghost" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-md font-mono text-sm break-all">
                  {password}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 