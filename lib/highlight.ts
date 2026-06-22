const KW = new Set([
  'function','const','let','var','return','if','else','while','for','of','in',
  'new','null','undefined','true','false','void','break','continue','typeof',
  'class','type','this','do','switch','case','default','throw','try','catch',
  'finally','import','export','from','interface','extends','implements',
  'number','string','boolean','any','never','unknown',
]);

export function hl(code: string): string {
  return code.split('\n').map(hlLine).join('\n');
}

function hlLine(line: string): string {
  const ci = line.indexOf('//');
  const src = ci >= 0 ? line.slice(0, ci) : line;
  const cmt = ci >= 0 ? `<span class="cm">${esc(line.slice(ci))}</span>` : '';
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|\b[A-Za-z_]\w*\b|\b\d+\.?\d*\b|&&|=>|[<>&]|.)/g;
  let out = '';
  let prevTok = '';
  for (const [tok] of src.matchAll(re)) {
    if (tok[0] === '"' || tok[0] === "'" || tok[0] === '`') {
      out += `<span class="str">${esc(tok)}</span>`;
    } else if (/^\d/.test(tok)) {
      out += `<span class="num">${tok}</span>`;
    } else if (/^[A-Za-z_]/.test(tok)) {
      if (KW.has(tok)) {
        out += `<span class="kw">${tok}</span>`;
      } else if (prevTok === 'function' || out.endsWith('(') === false && /[(\s]/.test(src[src.indexOf(tok) + tok.length] ?? '')) {
        // heuristic: identifier followed by '(' is a function call
        const afterIdx = src.indexOf(tok, out.replace(/<[^>]+>/g, '').length) + tok.length;
        if (src[afterIdx] === '(') {
          out += `<span class="fn">${tok}</span>`;
        } else {
          out += tok;
        }
      } else {
        out += tok;
      }
    } else if (tok === '&&') {
      out += '&amp;&amp;';
    } else if (tok === '=>') {
      out += '=&gt;';
    } else if (tok === '<') {
      out += '&lt;';
    } else if (tok === '>') {
      out += '&gt;';
    } else if (tok === '&') {
      out += '&amp;';
    } else {
      out += tok;
    }
    prevTok = tok;
  }
  return out + cmt;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
