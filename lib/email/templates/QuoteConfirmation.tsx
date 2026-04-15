import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Preview,
} from '@react-email/components'
import { siteConfig } from '@/data/site'

interface Props {
  name: string
  email: string
  estimateLow: number | null
  estimateHigh: number | null
  windowCount: number | null
  glassType: string | null
}

const GLASS_LABELS: Record<string, string> = {
  standard: 'Standard Double Glazing',
  lowe:     'Tinted Low-E Glass',
  acoustic: 'Acoustic Laminated Glass',
}

export function QuoteConfirmationEmail({ name, estimateLow, estimateHigh, windowCount, glassType }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your King Double Glazing quote is confirmed — Tas will call within 2 hours</Preview>
      <Body style={body}>
        {/* Header */}
        <Section style={header}>
          <Text style={brandText}>KING DOUBLE GLAZING</Text>
          <Text style={crownAccent}>◆</Text>
        </Section>

        <Container style={container}>
          {/* Heading */}
          <Section style={headingSection}>
            <Heading style={h1}>Your quote is confirmed.</Heading>
          </Section>

          <Text style={intro}>
            Hi {name} — Tas will be in touch within 2 hours to arrange your free in-home assessment.
          </Text>

          {/* Summary */}
          {(windowCount || glassType || estimateLow) && (
            <Section style={summarySection}>
              <Text style={summaryHeading}>Your summary</Text>
              {windowCount != null && (
                <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                  <tbody>
                    <tr>
                      <td style={rowLabel}>Windows</td>
                      <td style={rowValue}>{windowCount}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {glassType && (
                <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                  <tbody>
                    <tr>
                      <td style={rowLabel}>Glass type</td>
                      <td style={rowValue}>{GLASS_LABELS[glassType] ?? glassType}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {estimateLow != null && estimateHigh != null && (
                <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                  <tbody>
                    <tr>
                      <td style={rowLabel}>Estimate range</td>
                      <td style={{ ...rowValue, fontWeight: 700 }}>
                        ${estimateLow.toLocaleString()} – ${estimateHigh.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </Section>
          )}

          <Hr style={divider} />

          <Text style={contactNote}>
            Questions? Reply to this email or call{' '}
            <a href={siteConfig.phoneHref} style={{ color: '#F5C518' }}>
              {siteConfig.phone}
            </a>
            .
          </Text>
        </Container>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>kingdoubleglazing.com.au</Text>
        </Section>
      </Body>
    </Html>
  )
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

const intro: React.CSSProperties = {
  color: '#333333',
  fontSize: 15,
  lineHeight: '1.6',
  margin: '0 0 24px',
}

const summarySection: React.CSSProperties = {
  backgroundColor: '#F9F9F9',
  padding: '16px 20px',
  marginBottom: 8,
}

const summaryHeading: React.CSSProperties = {
  color: '#555555',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: '0 0 12px',
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
}

const rowValue: React.CSSProperties = {
  color: '#111111',
  fontSize: 14,
}

const divider: React.CSSProperties = {
  borderColor: '#E5E5E5',
  margin: '24px 0',
}

const contactNote: React.CSSProperties = {
  color: '#555555',
  fontSize: 13,
  lineHeight: '1.5',
  margin: 0,
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
