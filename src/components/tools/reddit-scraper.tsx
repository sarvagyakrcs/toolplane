"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Loader2, ArrowUp, MessageCircle, User, ChevronRight, ChevronDown } from "lucide-react";
import { scrapeRedditPost } from "@/app/actions/scrapeReddit";
import { ApiCard } from "@/components/ui/api-card";

interface RedditComment {
  author: string;
  body: string;
  score: string;
  depth: number;
  replies?: RedditComment[];
}

interface RedditPostData {
  title: string | null;
  upvotes: string | null;
  comments: string | null;
  author: string | null;
  subreddit: string | null;
  postContent?: string | null;
  commentsList?: RedditComment[];
}

function CommentItem({ comment, isExpanded, onToggle }: { 
  comment: RedditComment; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasReplies = comment.replies && comment.replies.length > 0;
  const indentLevel = Math.min(comment.depth, 6); // Max 6 levels of indentation

  return (
    <div className={`${comment.depth > 0 ? 'ml-4 border-l-2 border-muted pl-3' : ''}`}>
      <div className="bg-muted/30 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              u/{comment.author}
            </span>
            <Badge variant="outline" className="text-xs">
              {comment.score} points
            </Badge>
            {comment.depth > 0 && (
              <Badge variant="secondary" className="text-xs">
                Reply
              </Badge>
            )}
          </div>
          {hasReplies && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? 
                <ChevronDown className="h-3 w-3" /> : 
                <ChevronRight className="h-3 w-3" />
              }
            </Button>
          )}
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {comment.body.length > 500 
            ? comment.body.substring(0, 500) + "..." 
            : comment.body
          }
        </p>
        {hasReplies && (
          <p className="text-xs text-muted-foreground mt-2">
            {comment.replies!.length} {comment.replies!.length === 1 ? 'reply' : 'replies'}
          </p>
        )}
      </div>
      
      {hasReplies && isExpanded && (
        <div className="space-y-1">
          {comment.replies!.map((reply, index) => (
            <CommentItem
              key={index}
              comment={reply}
              isExpanded={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function RedditScraper() {
  const [url, setUrl] = useState("");
  const [includeComments, setIncludeComments] = useState(false);
  const [data, setData] = useState<RedditPostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

  const apiDocumentation = {
    endpoint: "/api/scrape-reddit",
    method: "GET" as const,
    title: "Reddit Post Scraper API",
    description: "Extract post data from Reddit URLs including title, upvotes, comments count, author, and optionally the comments themselves.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "Reddit post URL",
        example: "https://www.reddit.com/r/programming/comments/xyz/awesome_post/"
      },
      {
        name: "includeComments",
        type: "boolean",
        required: false,
        description: "Whether to include comments in the response (default: false)",
        example: "true"
      }
    ],
    example: {
      request: "/api/scrape-reddit?url=https://www.reddit.com/r/programming/comments/xyz&includeComments=true",
      response: {
        title: "Why I Love Programming",
        upvotes: "1.2k",
        comments: "156",
        author: "coder123",
        subreddit: "programming",
        postContent: "Programming has changed my life...",
        commentsList: [
          {
            author: "developer456",
            body: "Great post! I completely agree.",
            score: "42",
            depth: 0,
            replies: []
          }
        ]
      }
    },
    rateLimit: "20 requests/minute",
    category: "scrape" as const
  };

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a Reddit post URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    setExpandedComments(new Set());

    try {
      const scrapedData = await scrapeRedditPost(url, includeComments);
      setData(scrapedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleComment = (index: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedComments(newExpanded);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Reddit Post Scraper</CardTitle>
        <CardDescription>
          Extract data from any Reddit post including upvotes, comments, and author. Optionally scrape comments too.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reddit-url">Reddit Post URL</Label>
            <Input
              id="reddit-url"
              type="url"
              placeholder="https://www.reddit.com/r/programming/comments/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-comments"
              checked={includeComments}
              onCheckedChange={(checked) => setIncludeComments(checked as boolean)}
            />
            <Label 
              htmlFor="include-comments" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include comments (may take longer)
            </Label>
          </div>
          
          <Button onClick={handleScrape} disabled={loading || !url} className="w-full sm:w-auto">
            {loading ? (
                <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>{includeComments ? 'Scraping post & comments...' : 'Scraping post...'}</span>
                </div>
            ) : "Scrape Post"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {data && !loading && (
          <div className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">r/{data.subreddit}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="h-4 w-4" />
                      <span>{data.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{data.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{data.author}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold leading-tight mb-3">{data.title}</h3>
                {data.postContent && (
                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {data.postContent.length > 1000 
                        ? data.postContent.substring(0, 1000) + "..." 
                        : data.postContent
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {data.commentsList && data.commentsList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Comments ({data.commentsList.length})
                  </CardTitle>
                  <CardDescription>
                    Top-level comments and their replies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full pr-4">
                    <div className="space-y-3">
                      {data.commentsList.map((comment, index) => (
                        <CommentItem
                          key={index}
                          comment={comment}
                          isExpanded={expandedComments.has(index)}
                          onToggle={() => toggleComment(index)}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {includeComments && (!data.commentsList || data.commentsList.length === 0) && (
              <Alert>
                <MessageCircle className="h-4 w-4" />
                <AlertTitle>No Comments Found</AlertTitle>
                <AlertDescription>
                  This post either has no comments or they couldn't be retrieved. 
                  Comments may not be available for some posts due to Reddit's restrictions.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>

    <ApiCard {...apiDocumentation} />
  </div>
  );
} 