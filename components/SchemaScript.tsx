type SchemaScriptProps = {
  schemas: object[]
}

export function SchemaScript({ schemas }: SchemaScriptProps) {
  if (!schemas.length) return null
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          // biome-ignore lint/suspicious/noArrayIndexKey: static schema order never changes
          key={i}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
