import { NextRequest, NextResponse } from "next/server";

interface ApiLogEntry {
  timestamp: string;
  method: string;
  endpoint: string;
  ip: string;
  userAgent: string;
  response_time: number;
  status: number;
  error?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitEntry>();
const apiLogs: ApiLogEntry[] = [];

// Rate limiting configuration
const RATE_LIMITS = {
  default: { requests: 100, window: 60 * 1000 }, // 100 requests per minute
  scrape: { requests: 20, window: 60 * 1000 },   // 20 requests per minute for scraping
  generate: { requests: 50, window: 60 * 1000 }, // 50 requests per minute for generation
};

export class ApiPipe {
  private startTime: number;
  private request: NextRequest;
  private endpoint: string;

  constructor(request: NextRequest, endpoint: string) {
    this.request = request;
    this.endpoint = endpoint;
    this.startTime = Date.now();
  }

  private getClientIp(): string {
    const forwarded = this.request.headers.get('x-forwarded-for');
    const realIp = this.request.headers.get('x-real-ip');
    return forwarded?.split(',')[0] || realIp || 'unknown';
  }

  private getRateLimitType(): keyof typeof RATE_LIMITS {
    if (this.endpoint.includes('scrape')) return 'scrape';
    if (this.endpoint.includes('generate') || this.endpoint.includes('convert')) return 'generate';
    return 'default';
  }

  private checkRateLimit(): { allowed: boolean; remaining: number; resetTime: number } {
    const ip = this.getClientIp();
    const limitType = this.getRateLimitType();
    const limit = RATE_LIMITS[limitType];
    const key = `${ip}:${limitType}`;
    const now = Date.now();

    let entry = rateLimitStore.get(key);
    
    if (!entry || now > entry.resetTime) {
      entry = { count: 0, resetTime: now + limit.window };
      rateLimitStore.set(key, entry);
    }

    entry.count++;
    const allowed = entry.count <= limit.requests;
    const remaining = Math.max(0, limit.requests - entry.count);

    return { allowed, remaining, resetTime: entry.resetTime };
  }

  private log(status: number, error?: string) {
    const logEntry: ApiLogEntry = {
      timestamp: new Date().toISOString(),
      method: this.request.method,
      endpoint: this.endpoint,
      ip: this.getClientIp(),
      userAgent: this.request.headers.get('user-agent') || 'unknown',
      response_time: Date.now() - this.startTime,
      status,
      error,
    };

    apiLogs.push(logEntry);
    
    // Keep only the last 1000 log entries
    if (apiLogs.length > 1000) {
      apiLogs.splice(0, apiLogs.length - 1000);
    }

    console.log(`[API] ${logEntry.method} ${logEntry.endpoint} - ${status} (${logEntry.response_time}ms)`);
  }

  async process<T>(handler: () => Promise<T>): Promise<NextResponse> {
    try {
      // Check rate limit
      const rateLimit = this.checkRateLimit();
      
      if (!rateLimit.allowed) {
        this.log(429, 'Rate limit exceeded');
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': RATE_LIMITS[this.getRateLimitType()].requests.toString(),
              'X-RateLimit-Remaining': rateLimit.remaining.toString(),
              'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            }
          }
        );
      }

      // Execute the handler
      const result = await handler();
      
      this.log(200);
      return NextResponse.json(result, {
        headers: {
          'X-RateLimit-Limit': RATE_LIMITS[this.getRateLimitType()].requests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        }
      });

    } catch (error: any) {
      this.log(500, error.message);
      return NextResponse.json(
        { error: error.message || 'Internal server error' },
        { status: 500 }
      );
    }
  }

  static getLogs(): ApiLogEntry[] {
    return [...apiLogs].reverse(); // Return most recent first
  }

  static getStats() {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    const recentLogs = apiLogs.filter(log => new Date(log.timestamp).getTime() > oneHourAgo);
    
    return {
      total_requests: apiLogs.length,
      requests_last_hour: recentLogs.length,
      average_response_time: apiLogs.length > 0 
        ? Math.round(apiLogs.reduce((sum, log) => sum + log.response_time, 0) / apiLogs.length)
        : 0,
      error_rate: apiLogs.length > 0
        ? Math.round((apiLogs.filter(log => log.status >= 400).length / apiLogs.length) * 100)
        : 0,
      top_endpoints: this.getTopEndpoints(recentLogs),
    };
  }

  private static getTopEndpoints(logs: ApiLogEntry[]) {
    const endpointCounts = logs.reduce((acc, log) => {
      acc[log.endpoint] = (acc[log.endpoint] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(endpointCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([endpoint, count]) => ({ endpoint, count }));
  }
} 