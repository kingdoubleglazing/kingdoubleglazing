import {
  Html, Head, Body, Container, Section,
  Heading, Text, Button, Hr, Preview,
} from '@react-email/components'

interface Props {
  name: string
  email: string
  phone: string
  propertyType: string
  windowCount: number
  glassType: string
  orientation: string
  storeys: number
  frameCondition: string
  priority: string
  low: number
  high: number
  confirmUrl: string
  quoteId: number
}

const GLASS_LABELS: Record<string, string> = {
  standard: 'Standard Double Glazing',
  lowe:     'Tinted Low-E Glass',
  acoustic: 'Acoustic Laminated Glass',
}

const PRIORITY_LABELS: Record<string, string> = {
  noise:   'Reduce noise',
  warmth:  'Stay warmer',
  both:    'Noise + warmth',
}

export function QuoteNotificationEmail({
  name, email, phone, propertyType, windowCount, glassType,
  orientation, storeys, frameCondition, priority,
  low, high, confirmUrl, quoteId,
}: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New quote from {name} · Est. ${low.toLocaleString()}–${high.toLocaleString()}</Preview>
      <Body style={body}>
        {/* Header */}
        <Section style={header}>
          <Text style={brandText}>KING DOUBLE GLAZING</Text>
          <Text style={crownAccent}>◆</Text>
        </Section>

        <Container style={container}>
          {/* Heading */}
          <Section style={headingSection}>
            <Heading style={h1}>New Quote Request #{quoteId}</Heading>
          </Section>

          {/* Estimate range */}
          <Section style={estimateSection}>
            <Text style={estimateLabel}>Estimate range</Text>
            <Text style={estimateValue}>
              ${low.toLocaleString()} – ${high.toLocaleString()}
            </Text>
          </Section>

          {/* Data rows */}
          <Section style={dataSection}>
            <Row label="Name"            value={name} />
            <Row label="Phone"           value={phone} />
            <Row label="Email"           value={email} />
            <Row label="Property type"   value={capitalise(propertyType)} />
            <Row label="Windows"         value={String(windowCount)} />
            <Row label="Glass type"      value={GLASS_LABELS[glassType] ?? glassType} />
            <Row label="Orientation"     value={capitalise(orientation)} />
            <Row label="Storeys"         value={String(storeys)} />
            <Row label="Frame condition" value={frameCondition === 'good' ? 'Good' : 'Needs work'} />
            <Row label="Priority"        value={PRIORITY_LABELS[priority] ?? priority} />
          </Section>

          <Hr style={divider} />

          {/* CTA */}
          <Section style={{ textAlign: 'center' }}>
            <Button href={confirmUrl} style={ctaButton}>
              ✓ Confirm This Quote
            </Button>
            <Text style={ctaNote}>
              Tapping confirm sends the client their booking confirmation email.
            </Text>
          </Section>
        </Container>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>kingdoubleglazing.com.au</Text>
        </Section>
      </Body>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 10 }}>
      <tbody>
        <tr>
          <td style={rowLabel}>{label}</td>
          <td style={rowValue}>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#F5F5F5',
  fontFamily: "'Poppins', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: 0,
}

const header: React.CSSProperties = {
  backgroundColor: '#000000',
  padding: '20px 32px',
  textAlign: 'center',
}

const brandText: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: '0.15em',
  margin: 0,
}

const crownAccent: React.CSSProperties = {
  color: '#F5C518',
  fontSize: 14,
  margin: '4px 0 0',
}

const container: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  margin: '0 auto',
  maxWidth: 560,
  padding: '32px 40px',
}

const headingSection: React.CSSProperties = {
  borderLeft: '4px solid #F5C518',
  paddingLeft: 16,
  marginBottom: 24,
}

const h1: React.CSSProperties = {
  color: '#111111',
  fontSize: 24,
  fontWeight: 700,
  margin: 0,
}

const estimateSection: React.CSSProperties = {
  backgroundColor: '#000000',
  padding: '16px 20px',
  marginBottom: 24,
}

const estimateLabel: React.CSSProperties = {
  color: '#AAAAAA',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: '0 0 6px',
}

const estimateValue: React.CSSProperties = {
  color: '#F5C518',
  fontSize: 32,
  fontWeight: 700,
  margin: 0,
  lineHeight: '1',
}

const dataSection: React.CSSProperties = {
  marginTop: 8,
}

const rowLabel: React.CSSProperties = {
  color: '#555555',
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  width: 140,
  paddingRight: 12,
  verticalAlign: 'top',
  paddingTop: 2,
}

const rowValue: React.CSSProperties = {
  color: '#111111',
  fontSize: 14,
}

const divider: React.CSSProperties = {
  borderColor: '#E5E5E5',
  margin: '24px 0',
}

const ctaButton: React.CSSProperties = {
  backgroundColor: '#F5C518',
  color: '#000000',
  fontSize: 16,
  fontWeight: 700,
  padding: '16px 32px',
  textDecoration: 'none',
  display: 'inline-block',
}

const ctaNote: React.CSSProperties = {
  color: '#999999',
  fontSize: 12,
  marginTop: 12,
}

const footer: React.CSSProperties = {
  backgroundColor: '#000000',
  padding: '16px 32px',
  textAlign: 'center',
}

const footerText: React.CSSProperties = {
  color: '#777777',
  fontSize: 11,
  margin: 0,
}
