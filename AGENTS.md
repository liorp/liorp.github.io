# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal technical blog built with Jekyll and the Minimal Mistakes theme, hosted on GitHub Pages at blog.liorp.dev.

## Development Commands

```bash
# Start local development server (auto-reloads on changes, except _config.yml)
bundle exec jekyll serve

# Alternative via Rake
rake build

# Install dependencies (first time setup)
bundle install
```

The site runs at `http://localhost:4000` by default. Changes to `_config.yml` require restarting the server.

## Architecture

- **Static site generator**: Jekyll with remote Minimal Mistakes theme
- **Content**: Markdown files with YAML front matter
- **Styling**: SCSS extending the theme's sunrise skin

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `_posts/` | Blog articles (YYYY-MM-DD-title.md format) |
| `_pages/` | Static pages (404, resume, archives) |
| `_data/navigation.yml` | Site navigation structure |
| `assets/css/main.scss` | Custom styles (Poppins font, code block scrolling) |
| `assets/js/` | Mermaid diagrams, Klaro cookie consent |
| `assets/images/` | Images organized by date subdirectories |

### Post Front Matter

Posts use these common fields:
```yaml
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +0300
categories: [category]
tags: [tag1, tag2]
header:
  overlay_image: /assets/images/...
  teaser: /assets/images/...
```

### Features Enabled

- Mermaid diagrams (use fenced code blocks with `mermaid` language)
- Utterances comments (GitHub-based)
- Algolia search
- Google Analytics (with Klaro consent)
