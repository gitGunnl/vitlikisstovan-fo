  Why you should do it regularly: https://github.com/browserslist/update-db#readme
12:22:03 PM [vite] hmr update /src/pages/home.tsx, /src/index.css?v=9JUXX05OYGvYkEG2PFycz
12:22:03 PM [vite] Internal server error: /home/runner/workspace/client/src/pages/home.tsx: Unexpected token (66:10)

  64 |         {/* Content container */}
  65 |         <div className="relative z-10 max-w-4xl mx-auto text-center px-4"
> 66 |           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white hero-text">
     |           ^
  67 |             {siteConfig.hero.title}
  68 |           </h1>
  69 |           <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-xl mx-auto hero-text">
  Plugin: vite:react-babel
  File: /home/runner/workspace/client/src/pages/home.tsx:66:10
  64 |          {/* Content container */}
  65 |          <div className="relative z-10 max-w-4xl mx-auto text-center px-4"
  66 |            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white hero-text">
     |            ^
  67 |              {siteConfig.hero.title}
  68 |            </h1>
      at toParseError (/home/runner/workspace/node_modules/@babel/parser/src/parse-error.ts:95:45)
      at raise (/home/runner/workspace/node_modules/@babel/parser/src/tokenizer/index.ts:1497:19)
      at unexpected (/home/runner/workspace/node_modules/@babel/parser/src/tokenizer/index.ts:1537:16)
      at jsxParseIdentifier (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:278:14)
      at jsxParseNamespacedName (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:288:25)
      at jsxParseAttribute (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:413:24)
      at jsxParseOpeningElementAfterName (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:440:30)
      at jsxParseOpeningElementAfterName (/home/runner/workspace/node_modules/@babel/parser/src/plugins/typescript/index.ts:4054:20)
      at jsxParseOpeningElementAt (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:430:19)
      at jsxParseElementAt (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:470:35)
      at jsxParseElementAt (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:483:34)
      at jsxParseElementAt (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:483:34)
      at jsxParseElementAt (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:483:34)
      at jsxParseElement (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:559:19)
      at parseExprAtom (/home/runner/workspace/node_modules/@babel/parser/src/plugins/jsx/index.ts:573:21)
      at parseExprSubscripts (/home/runner/workspace/node_modules/@babel/parser/src/parser/expression.ts:714:23)
      at parseUpdate (/home/runner/workspace/node_modules/@babel/parser/src/parser/expression.ts:693:21)
      at parseMaybeUnary (/home/runner/workspace/node_modules/@babel/parser/src