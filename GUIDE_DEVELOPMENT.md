# Guide Development Documentation

This document explains how to create and structure user guides for the website. It covers everything you need to convert a Word document into a code-ready React component guide.

## Table of Contents
1. [File Structure](#file-structure)
2. [Basic Guide Template](#basic-guide-template)
3. [Available HTML/JSX Elements](#available-htmljsx-elements)
4. [Styling Options](#styling-options)
5. [Print/PDF Optimization](#printpdf-optimization)
6. [Step-by-Step Conversion Process](#step-by-step-conversion-process)
7. [Examples](#examples)

## File Structure

### Location
All guide files should be placed in: `client/src/pages/`

### Naming Convention
- File name: `[guide-name]-guide.tsx` (use kebab-case)
- Example: `getting-started-guide.tsx`, `api-reference-guide.tsx`

### Required Structure
Each guide must:
1. Be a React component (`.tsx` file)
2. Export default function
3. Include print mode support
4. Have proper SEO metadata

## Basic Guide Template

```tsx
import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { seoConfig } from "@/content/seo";

export default function YourGuideNameGuide() {
  const search = useSearch();
  const isPrintMode = search === "?print=true";

  useEffect(() => {
    document.title = "Your Guide Title - " + seoConfig.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Brief description of your guide for SEO.";
    if (metaDescription) {
      metaDescription.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      document.head.appendChild(meta);
    }

    // Auto-print if print mode
    if (isPrintMode) {
      window.print();
    }
  }, [isPrintMode]);

  const handlePrint = () => {
    window.print();
  };

  // Custom styles for this specific guide
  const customStyles = `
    @media print {
      .no-print { display: none !important; }
      .guide-content { 
        max-width: 100% !important;
        padding: 0 !important;
        font-size: 12pt !important;
      }
      /* Add your custom print styles here */
    }
    
    /* Custom theme colors for this guide */
    .guide-accent { color: #2563eb; }
    .guide-bg-accent { background-color: #eff6ff; }
    .guide-border-accent { border-color: #2563eb; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {!isPrintMode && <Header />}
      
      {/* Print-only header - hidden on screen, shown in print */}
      <div className="print-header hidden">
        <div className="flex justify-between items-center">
          <span>Your Guide Title</span>
          <span>Your Organization Name</span>
        </div>
      </div>
      
      {/* Print-only footer - hidden on screen, shown in print */}
      <div className="print-footer hidden">
        <div className="flex justify-between items-center text-xs">
          <span>© 2024 Your Organization</span>
          <span className="print-page-number"></span>
        </div>
      </div>
      
      <main className={`${!isPrintMode ? 'pt-16' : ''} bg-white`}>
        {/* Navigation - Hidden in print */}
        {!isPrintMode && (
          <div className="no-print border-b">
            <Section className="py-4">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                <Link href="/user-guides">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Guides
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print / Save as PDF
                </Button>
              </div>
            </Section>
          </div>
        )}

        {/* Guide Content */}
        <Section className="py-8 sm:py-12">
          <article className="guide-content mx-auto max-w-4xl prose prose-gray prose-lg">
            {/* YOUR GUIDE CONTENT GOES HERE */}
          </article>
        </Section>
      </main>

      {!isPrintMode && <Footer />}
    </>
  );
}
```

## Available HTML/JSX Elements

### Text Elements

#### Headings
```jsx
<h1>Main Title (use only once per guide)</h1>
<h2>Chapter/Section Title</h2>
<h3>Subsection Title</h3>
<h4>Minor Heading</h4>
```

#### Paragraphs and Text
```jsx
<p>Regular paragraph text</p>
<strong>Bold text</strong>
<em>Italic text</em>
<code>Inline code</code>
```

#### Lists
```jsx
// Unordered list
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

// Ordered list
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>

// Definition list
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

### Block Elements

#### Code Blocks
```jsx
<pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
  <code>{`
// Your code here
const example = "code";
console.log(example);
  `}</code>
</pre>
```

#### Blockquotes
```jsx
<blockquote className="border-l-4 border-blue-500 pl-4 my-6">
  <p>Important quote or note</p>
</blockquote>
```

#### Tables
```jsx
<table className="w-full">
  <thead>
    <tr className="border-b">
      <th className="text-left p-2">Column 1</th>
      <th className="text-left p-2">Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b">
      <td className="p-2">Data 1</td>
      <td className="p-2">Data 2</td>
    </tr>
  </tbody>
</table>
```

### Special Sections

#### Info/Warning/Success Boxes
```jsx
// Info Box (Blue)
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
  <h4 className="font-semibold text-blue-800">Info</h4>
  <p className="text-blue-700">Information text here</p>
</div>

// Warning Box (Yellow/Orange)
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
  <h4 className="font-semibold text-yellow-800">Warning</h4>
  <p className="text-yellow-700">Warning message here</p>
</div>

// Success Box (Green)
<div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
  <h4 className="font-semibold text-green-800">Success</h4>
  <p className="text-green-700">Success message here</p>
</div>

// Error Box (Red)
<div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
  <h4 className="font-semibold text-red-800">Error</h4>
  <p className="text-red-700">Error message here</p>
</div>
```

#### Table of Contents
```jsx
<section className="guide-bg-accent p-6 rounded-lg mb-8">
  <h2>Table of Contents</h2>
  <nav>
    <ol className="space-y-2">
      <li><a href="#section1">1. Section Title</a></li>
      <li><a href="#section2">2. Section Title</a></li>
    </ol>
  </nav>
</section>
```

## Styling Options

### Custom Colors Per Guide
You can define custom accent colors in the `customStyles` variable:

```jsx
const customStyles = `
  /* Blue theme */
  .guide-accent { color: #2563eb; }
  .guide-bg-accent { background-color: #eff6ff; }
  .guide-border-accent { border-color: #2563eb; }
  
  /* Green theme */
  .guide-accent { color: #059669; }
  .guide-bg-accent { background-color: #f0fdf4; }
  .guide-border-accent { border-color: #059669; }
  
  /* Purple theme */
  .guide-accent { color: #7c3aed; }
  .guide-bg-accent { background-color: #f5f3ff; }
  .guide-border-accent { border-color: #7c3aed; }
`;
```

### Spacing Classes
```jsx
// Margins
className="mt-4"  // margin-top
className="mb-6"  // margin-bottom
className="my-8"  // margin vertical
className="mx-auto"  // margin horizontal auto (centers)

// Padding
className="p-4"   // padding all sides
className="pt-6"  // padding-top
className="px-8"  // padding horizontal

// Spacing between elements
className="space-y-4"  // vertical spacing between children
```

### Text Styling
```jsx
// Size
className="text-sm"   // small
className="text-base" // normal
className="text-lg"   // large
className="text-xl"   // extra large
className="text-2xl"  // 2x large
className="text-3xl"  // 3x large

// Weight
className="font-normal"
className="font-semibold"
className="font-bold"

// Color
className="text-gray-600"
className="text-muted-foreground"
className="guide-accent"  // uses custom color
```

## Print/PDF Optimization

### Headers and Footers

Print headers and footers are automatically supported in all guides. They appear on every printed page and contain:

#### Header Content (top of each page)
- Left side: Guide title
- Right side: Organization name

#### Footer Content (bottom of each page)
- Left side: Copyright notice
- Right side: Page number (automatic)

#### How to Customize Headers/Footers

In your guide template, update these elements:

```jsx
{/* Print-only header */}
<div className="print-header hidden">
  <div className="flex justify-between items-center">
    <span>Your Guide Title Here</span>
    <span>Your Organization Name</span>
  </div>
</div>

{/* Print-only footer */}
<div className="print-footer hidden">
  <div className="flex justify-between items-center text-xs">
    <span>© 2024 Your Organization</span>
    <span className="print-page-number"></span> {/* Auto page numbers */}
  </div>
</div>
```

**Important Notes:**
- Headers/footers are hidden on screen (`hidden` class) but visible in print
- Page numbers are automatically generated using CSS counters
- The styles are defined in `client/src/index.css` globally
- Each guide can customize the text content but the layout is consistent

#### Advanced Customization

If you need different header/footer styles for a specific guide, add to your `customStyles`:

```css
@media print {
  .print-header {
    font-size: 11pt !important;
    color: #333 !important;
    /* Your custom header styles */
  }
  
  .print-footer {
    font-size: 8pt !important;
    /* Your custom footer styles */
  }
}
```

### Page Breaks
```jsx
// Force page break before element
<section className="page-break">

// Prevent breaking inside element
<div className="avoid-break">

// Custom print-only styles in customStyles
@media print {
  .page-break { page-break-before: always; }
  .avoid-break { page-break-inside: avoid; }
}
```

### Hide Elements in Print
Add `no-print` class to any element that shouldn't appear in PDF:
```jsx
<div className="no-print">
  This won't appear in PDF
</div>
```

## Step-by-Step Conversion Process

### Step 1: Prepare Your Word Document
1. Review your Word document structure
2. Identify main sections and subsections
3. Note any special formatting (tables, code blocks, warnings)
4. Export or copy the text content

### Step 2: Create the Guide File
1. Copy the basic template above
2. Name your file: `client/src/pages/[your-guide-name]-guide.tsx`
3. Update the component name to match your guide

### Step 3: Add Metadata
```jsx
// Update the title
document.title = "Your Guide Title - " + seoConfig.title;

// Update the description
const content = "Your guide description for SEO";
```

### Step 4: Structure Your Content

#### Title Section
```jsx
<div className="text-center mb-12">
  <h1 className="text-4xl font-bold mb-4">Your Guide Title</h1>
  <p className="text-xl text-gray-600">Brief subtitle or description</p>
  <div className="mt-8 text-sm text-gray-500">
    <p>Version 1.0</p>
    <p>Last Updated: November 2024</p>
  </div>
</div>
```

#### Table of Contents
```jsx
<section className="guide-bg-accent p-6 rounded-lg mb-8">
  <h2>Table of Contents</h2>
  <nav>
    <ol className="space-y-2">
      <li><a href="#introduction">1. Introduction</a></li>
      <li><a href="#chapter1">2. Chapter 1 Title</a></li>
      {/* Add all your sections */}
    </ol>
  </nav>
</section>
```

#### Content Sections
For each main section in your Word document:

```jsx
<section id="section-id" className="mb-12">
  <h2 className="text-3xl font-semibold mb-4 guide-accent">Section Title</h2>
  <p>
    Section introduction paragraph...
  </p>
  
  <h3 className="text-xl font-semibold mt-6 mb-3">Subsection Title</h3>
  <p>
    Subsection content...
  </p>
  
  {/* Add lists, code blocks, tables as needed */}
</section>
```

### Step 5: Convert Special Elements

#### Word Bulleted List → JSX
```jsx
<ul className="space-y-2">
  <li>First bullet point</li>
  <li>Second bullet point</li>
</ul>
```

#### Word Numbered List → JSX
```jsx
<ol className="space-y-2">
  <li>Step one</li>
  <li>Step two</li>
</ol>
```

#### Word Table → JSX
```jsx
<table className="w-full">
  <thead>
    <tr className="border-b">
      <th className="text-left p-2">Header 1</th>
      <th className="text-left p-2">Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b">
      <td className="p-2">Cell 1</td>
      <td className="p-2">Cell 2</td>
    </tr>
  </tbody>
</table>
```

#### Word Highlighted Text → JSX Info Box
```jsx
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
  <p className="text-blue-700">
    Your highlighted/important text here
  </p>
</div>
```

### Step 6: Add to Router
1. Open `client/src/App.tsx`
2. Import your guide: 
   ```tsx
   import YourGuide from "@/pages/your-guide-name-guide";
   ```
3. Add route:
   ```tsx
   <Route path="/user-guides/your-guide-name" component={YourGuide} />
   ```

### Step 7: Add to Guide List
1. Open `client/src/pages/user-guides.tsx`
2. Add your guide to the guides array:
   ```tsx
   {
     id: "your-guide-id",
     title: "Your Guide Title",
     description: "Brief description of your guide",
     href: "/user-guides/your-guide-name"
   }
   ```

## Examples

### Example 1: Simple Instructional Section
```jsx
<section id="setup" className="mb-12">
  <h2 className="text-3xl font-semibold mb-4 guide-accent">Setup Instructions</h2>
  <p>
    Follow these steps to set up your environment:
  </p>
  
  <ol className="space-y-3 mt-4">
    <li>
      <strong>Install Prerequisites:</strong> Make sure you have Node.js installed
    </li>
    <li>
      <strong>Clone Repository:</strong> Run the following command:
      <pre className="bg-gray-50 p-2 rounded mt-2">
        <code>git clone https://github.com/your-repo.git</code>
      </pre>
    </li>
    <li>
      <strong>Install Dependencies:</strong> Navigate to the folder and run:
      <pre className="bg-gray-50 p-2 rounded mt-2">
        <code>npm install</code>
      </pre>
    </li>
  </ol>
  
  <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
    <h4 className="font-semibold text-green-800">Success!</h4>
    <p className="text-green-700">
      Your environment is now ready.
    </p>
  </div>
</section>
```

### Example 2: Feature Comparison Table
```jsx
<section id="comparison" className="mb-12">
  <h2 className="text-3xl font-semibold mb-4 guide-accent">Feature Comparison</h2>
  
  <table className="w-full mt-6">
    <thead>
      <tr className="border-b bg-gray-50">
        <th className="text-left p-3">Feature</th>
        <th className="text-center p-3">Basic</th>
        <th className="text-center p-3">Pro</th>
        <th className="text-center p-3">Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b">
        <td className="p-3 font-semibold">Users</td>
        <td className="p-3 text-center">5</td>
        <td className="p-3 text-center">25</td>
        <td className="p-3 text-center">Unlimited</td>
      </tr>
      <tr className="border-b">
        <td className="p-3 font-semibold">Storage</td>
        <td className="p-3 text-center">10 GB</td>
        <td className="p-3 text-center">100 GB</td>
        <td className="p-3 text-center">1 TB</td>
      </tr>
    </tbody>
  </table>
</section>
```

### Example 3: FAQ Section
```jsx
<section id="faq" className="mb-12">
  <h2 className="text-3xl font-semibold mb-4 guide-accent">Frequently Asked Questions</h2>
  
  <div className="space-y-6">
    <div className="border-l-4 border-gray-300 pl-4">
      <h4 className="font-semibold mb-2">How do I reset my password?</h4>
      <p className="text-gray-600">
        Click on the "Forgot Password" link on the login page and follow the instructions.
      </p>
    </div>
    
    <div className="border-l-4 border-gray-300 pl-4">
      <h4 className="font-semibold mb-2">Can I export my data?</h4>
      <p className="text-gray-600">
        Yes, you can export all your data from Settings → Export Data.
      </p>
    </div>
  </div>
</section>
```

## Tips and Best Practices

### Content Organization
1. **Use clear hierarchy**: H1 → H2 → H3 → H4
2. **Keep sections focused**: One topic per section
3. **Use consistent formatting**: Same style for similar elements
4. **Add navigation aids**: Table of contents, section IDs

### Readability
1. **Short paragraphs**: 3-5 sentences max
2. **Use lists**: Break up long text with bullets/numbers
3. **Highlight important info**: Use info boxes for key points
4. **Add visual breaks**: Use spacing and dividers

### Code Examples
1. **Keep it simple**: Show only relevant code
2. **Add comments**: Explain complex parts
3. **Use syntax highlighting**: Wrap in proper code blocks
4. **Test your code**: Ensure examples work

### Images (if needed)
```jsx
// Import image at top of file
import exampleImage from '@assets/guides/example.png';

// Use in content
<img src={exampleImage} alt="Description" className="w-full rounded-lg my-6" />
```

### Accessibility
1. **Use semantic HTML**: Proper heading structure
2. **Add alt text**: For all images
3. **Color contrast**: Ensure text is readable
4. **Link descriptions**: Make link text descriptive

## Common Conversions from Word

| Word Feature | JSX Equivalent |
|--------------|----------------|
| Bold text | `<strong>text</strong>` |
| Italic text | `<em>text</em>` |
| Underline | `<span className="underline">text</span>` |
| Highlight yellow | `<mark className="bg-yellow-200">text</mark>` |
| Bullet list | `<ul><li>item</li></ul>` |
| Numbered list | `<ol><li>item</li></ol>` |
| Table | `<table>...</table>` structure |
| Text box | `<div className="border p-4">...</div>` |
| Page break | `<div className="page-break"></div>` |
| Header/Footer | Handled by Header/Footer components |
| Footnote | `<sup>1</sup>` and reference section |

## Troubleshooting

### Common Issues

1. **Guide not appearing in list**
   - Check if added to guides array in `user-guides.tsx`
   - Verify route is added in `App.tsx`

2. **Print layout broken**
   - Check print-specific CSS in customStyles
   - Ensure no-print class on navigation elements

3. **Styling not applying**
   - Verify className syntax
   - Check if custom styles are in the style tag

4. **Links not working**
   - Use proper anchor format: `href="#section-id"`
   - Ensure matching `id` on target section

## Questions or Need Help?

This documentation covers the essential aspects of creating guides. For specific questions or advanced features, refer to the existing guide examples:
- `getting-started-guide.tsx` - Basic guide structure
- `best-practices-guide.tsx` - Advanced styling and layouts

Remember: The goal is to create clean, readable guides that work well both on screen and when printed to PDF.