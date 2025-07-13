# AI Reading Assistant 📚🤖

A sophisticated web application that transforms your reading experience with AI-powered jargon explanations, intelligent note-taking, and interactive word clouds. Built with **Next.js**, **TypeScript**, and **Google Gemini AI**.

## ✨ Features

### 🧠 AI-Powered Jargon Explanations
- Double-tap any word for instant contextual explanations
- Category-aware intelligence adapts to your selected field (Law, ML, Medicine, etc.)
- Comprehensive definitions with examples and related terms
- Difficulty indicators (Basic, Intermediate, Advanced)

### 📝 Smart Note-Taking
- Save important text snippets with full context
- Create notes directly from selected text
- Organize and manage your research insights
- Real-time note editing and deletion

### ☁️ Interactive Word Clouds
- Visualize related concepts around any term
- Beautiful radial layouts showing term relationships
- Enhances understanding of complex topics

### 📄 Document Management
- Upload and manage multiple documents
- Sample documents for immediate testing
- Clean, Adobe Acrobat-like reading interface
- Zoom controls and document navigation

### 🎯 Multi-Domain Support
- **Machine Learning & AI**: Neural networks, algorithms, deep learning
- **Legal**: Jurisprudence, torts, constitutional law
- **Medicine & Epidemiology**: Biostatistics, herd immunity, clinical trials
- **And more**: Expandable to any domain

## 🚀 Quick Start

### Clone and Install
```bash
git clone <repository-url>
cd ai-reading-assistant
bun install
```

### Set up Gemini API (Optional - works with mock data too)
```bash
cp .env.example .env.local
# Add your Gemini API key to .env.local
```

### Run the Application
```bash
bun run dev
```
Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Google Gemini API Setup
For real AI explanations (optional - the app works great with mock data):

1. Get your free API key from [Google AI Studio](https://aistudio.google.com)
2. Add it to `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```
3. See `SETUP.md` for detailed instructions.

## 🎯 How to Use
- **Start Reading**: Click "Try Sample Document" or upload your own
- **Get Explanations**: Double-tap any technical term
- **Explore Concepts**: Use the tabbed explanations (Examples, Related, Cloud)
- **Take Notes**: Select important text and create contextual notes
- **Switch Domains**: Change the category in the header for specialized explanations

## 🏗️ Tech Stack
- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: Google Gemini 1.5 Flash
- **Visualization**: Custom SVG word clouds
- **Development**: Bun, ESLint, Biome

## 📱 Features Demo
The application includes comprehensive sample documents covering:
- **AI/ML**: Neural networks, gradient descent, overfitting
- **Legal**: Constitutional law, tort liability, due process
- **Health**: Epidemiological studies, statistical analysis

## 🌟 Perfect For
- Students learning complex subjects
- Researchers reading technical papers
- Professionals working across domains
- Anyone who encounters unfamiliar jargon

## 🛠️ Development
Built with modern web technologies for optimal performance:
- Server-side rendering with Next.js
- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- Component-based architecture
- Real-time AI integration

## 📄 License
MIT License - Feel free to use and modify for your projects!
