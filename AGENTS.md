# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal technical blog built with Jekyll and the jekyll-theme-console theme, hosted on GitHub Pages at blog.liorp.dev.

## Development Commands

```bash
# Start local development server (auto-reloads on changes, except _config.yml)
bundle exec jekyll serve

# Install dependencies (first time setup)
bundle install
```

The site runs at `http://localhost:4000` by default. Changes to `_config.yml` require restarting the server.

## Architecture

- **Static site generator**: Jekyll with remote theme (b2a3e8/jekyll-theme-console)
- **Content**: Markdown files with YAML front matter
- **Style**: hacker (terminal-style dark theme)

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `_posts/` | Blog articles (YYYY-MM-DD-title.md format) |
| `_pages/` | Static pages (404, resume, settings) |
| `_layouts/default.html` | Custom layout with MathJax and custom styles |
| `_includes/header.html` | Site navigation |
| `assets/js/` | Mermaid diagrams, Klaro cookie consent |
| `assets/images/` | Images organized by date subdirectories |

### Post Front Matter

Posts use these common fields:
```yaml
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +0200
categories:
  - blog
  - category
tags:
  - tag1
  - tag2
excerpt: "Short description"
```

### Features Enabled

- MathJax for LaTeX rendering (inline `$...$` and display `$$...$$`)
- Mermaid diagrams (use fenced code blocks with `mermaid` language)
- Syntax highlighting for code blocks
