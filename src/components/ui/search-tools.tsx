"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Tool {
  title: string;
  description: string;
  href: string;
  category: string;
  icon?: React.ReactNode;
}

interface SearchToolsProps {
  tools: Tool[];
  onSearchChange?: (query: string) => void;
  variant?: "inline" | "command-palette";
}

export function SearchTools({ tools, onSearchChange, variant = "command-palette" }: SearchToolsProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Filter tools based on search
  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase()) ||
    tool.category.toLowerCase().includes(search.toLowerCase())
  );

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  }, [onSearchChange]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle Cmd+K for command palette variant
      if (variant === "command-palette" && (e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        return;
      }
      
      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
        setSelectedIndex(0);
        if (onSearchChange) onSearchChange("");
      }

      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredTools.length - 1));
        }
        
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
        }
        
        if (e.key === "Enter" && filteredTools[selectedIndex]) {
          e.preventDefault();
          router.push(filteredTools[selectedIndex].href);
          setOpen(false);
          setSearch("");
          setSelectedIndex(0);
          if (onSearchChange) onSearchChange("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredTools, selectedIndex, router, variant, onSearchChange]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleToolSelect = (tool: Tool) => {
    router.push(tool.href);
    setOpen(false);
    setSearch("");
    setSelectedIndex(0);
    if (onSearchChange) onSearchChange("");
  };

  // Inline search variant
  if (variant === "inline") {
    return (
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search any tool (e.g., 'markdown', 'scraper', 'converter')"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    );
  }

  // Command palette variant
  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-2xl mx-auto flex items-center gap-3 px-4 py-3 text-left border border-border rounded-lg bg-background/50 hover:bg-accent/50 transition-colors group"
      >
        <Search className="h-5 w-5 text-muted-foreground" />
        <span className="flex-1 text-muted-foreground">
          Search any tool (e.g., 'markdown', 'scraper', 'converter')
        </span>
        <div className="hidden sm:flex items-center gap-1">
          <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </button>

      {/* Command Palette Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle>Search Tools</DialogTitle>
        <DialogContent className="max-w-2xl p-0 gap-0">
          <div className="flex items-center border-b border-border px-4">
            <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search tools..."
              className="border-0 bg-transparent p-4 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>
          
          {filteredTools.length > 0 ? (
            <div className="max-h-96 overflow-auto p-2">
              {filteredTools.map((tool, index) => (
                <button
                  key={tool.href}
                  onClick={() => handleToolSelect(tool)}
                  className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-colors ${
                    index === selectedIndex 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-accent/50"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{tool.title}</h3>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          ) : search ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No tools found for &quot;{search}&quot;</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>Start typing to search tools...</p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-muted rounded">↑↓</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-muted rounded">↵</kbd>
                  <span>select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-muted rounded">esc</kbd>
                  <span>close</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 