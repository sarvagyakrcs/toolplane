"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Code, Copy, Check, ExternalLink, Zap, Shield } from "lucide-react";

interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

interface ApiExample {
  request: string;
  requestBody?: any;
  response: any;
}

interface ApiCardProps {
  title: string;
  description: string;
  method: "GET" | "POST";
  endpoint: string;
  parameters: ApiParameter[];
  example: ApiExample;
  rateLimit: string;
  category: "scrape" | "generate" | "convert";
}

export function ApiCard({ 
  title, 
  description, 
  method, 
  endpoint, 
  parameters, 
  example, 
  rateLimit,
  category 
}: ApiCardProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getRateLimitColor = (category: string) => {
    switch (category) {
      case 'scrape': return 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-200';
      case 'generate': return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200';
      case 'convert': return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200';
      default: return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Card className="mt-8 border-2 border-dashed border-primary/20">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center gap-3 mb-2">
          <Code className="h-6 w-6 text-primary" />
          <div className="flex items-center gap-2">
            <Badge variant={method === 'GET' ? 'default' : 'secondary'}>{method}</Badge>
            <code className="text-sm bg-background px-2 py-1 rounded border">{endpoint}</code>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{rateLimit}</span>
          </div>
        </div>
        <CardTitle className="text-lg">🔌 API Access</CardTitle>
        <CardDescription className="text-sm">
          Use this tool programmatically in your applications. {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className={`p-3 rounded-lg border mb-6 ${getRateLimitColor(category)}`}>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-4 w-4" />
            <span className="font-medium text-sm">Rate Limit: {rateLimit}</span>
          </div>
          <p className="text-xs opacity-90">
            Free to use • No authentication required • Fair usage policy applies
          </p>
        </div>

        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">Quick Start</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="mt-4 space-y-4">
            <div>
              <Label className="text-sm font-medium">Try it now</Label>
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <code className="text-sm break-all">{example.request}</code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleCopy(example.request, 'request')}
                  >
                    {copied === 'request' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">cURL</Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-xs font-mono">
                  <div className="flex items-start justify-between">
                    <pre className="whitespace-pre-wrap break-all flex-1">
{method === 'GET' 
  ? `curl "${typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}${example.request}"`
  : `curl -X POST "${typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}${endpoint}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(example.requestBody, null, 2)}'`}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopy(
                        method === 'GET' 
                          ? `curl "${typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}${example.request}"`
                          : `curl -X POST "${typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}${endpoint}" -H "Content-Type: application/json" -d '${JSON.stringify(example.requestBody)}'`,
                        'curl'
                      )}
                    >
                      {copied === 'curl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">JavaScript</Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-xs font-mono">
                  <div className="flex items-start justify-between">
                    <pre className="whitespace-pre-wrap break-all flex-1">
{method === 'GET' 
  ? `fetch('${endpoint}${example.request.includes('?') ? example.request.substring(example.request.indexOf('?')) : ''}')
  .then(res => res.json())
  .then(data => console.log(data));`
  : `fetch('${endpoint}', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(${JSON.stringify(example.requestBody, null, 2)})
}).then(res => res.json());`}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopy(
                        method === 'GET' 
                          ? `fetch('${endpoint}${example.request.includes('?') ? example.request.substring(example.request.indexOf('?')) : ''}').then(res => res.json()).then(data => console.log(data));`
                          : `fetch('${endpoint}', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(${JSON.stringify(example.requestBody)}) }).then(res => res.json());`,
                        'js'
                      )}
                    >
                      {copied === 'js' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="mt-4">
            <div className="space-y-3">
              {parameters.map((param, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm font-medium">{param.name}</code>
                    <Badge variant={param.required ? 'destructive' : 'secondary'} className="text-xs">
                      {param.required ? 'required' : 'optional'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{param.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{param.description}</p>
                  {param.example && (
                    <div className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      Example: {param.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Request</Label>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                  <code>{example.request}</code>
                </pre>
                {example.requestBody && (
                  <>
                    <Label className="text-sm font-medium mt-4 block">Request Body</Label>
                    <pre className="mt-2 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                      <code>{JSON.stringify(example.requestBody, null, 2)}</code>
                    </pre>
                  </>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium">Response</Label>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                  <code>{JSON.stringify(example.response, null, 2)}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-3">
            Need higher rate limits or have questions? 
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/thesarvagyakumar/ghostbox" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/api-docs">
                <Code className="h-3 w-3 mr-1" />
                Full API Docs
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 