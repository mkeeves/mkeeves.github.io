# mkeeves.github.io

Personal blog site built with Jekyll and TypeScript.

## Development Setup

### Prerequisites
- Node.js 18+ 
- Ruby 3.1+
- Bundler

### Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Install Ruby dependencies:
```bash
bundle install
```

### Building

#### TypeScript to JavaScript
The TypeScript source files are in `src/ts/` and are compiled to `assets/js/`:

```bash
npm run build
```

For development with watch mode:
```bash
npm run watch
```

#### Jekyll Site
To build the Jekyll site locally:

```bash
bundle exec jekyll build
```

To serve locally:

```bash
bundle exec jekyll serve
```

## Project Structure

- `src/ts/` - TypeScript source files
- `assets/js/` - Compiled JavaScript files (generated)
- `_posts/` - Blog posts in Markdown
- `_layouts/` - Jekyll layout templates
- `_includes/` - Jekyll include files

## GitHub Pages Deployment

The site is automatically built and deployed via GitHub Pages. The GitHub Actions workflow:
1. Compiles TypeScript to JavaScript
2. Commits the compiled files
3. GitHub Pages builds the Jekyll site

## Notes

- The compiled JavaScript files in `assets/js/` are committed to the repository so GitHub Pages can serve them
- TypeScript source files are in `src/ts/` for development
- Run `npm run build` before committing changes to ensure JavaScript is up to date
