interface Props {
  html: string
  style?: React.CSSProperties
}
export default function CodeBlock({ html, style }: Props) {
  return <div className="code-block" style={style} dangerouslySetInnerHTML={{ __html: html }} />
}
