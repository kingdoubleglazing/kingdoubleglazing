import {
  Html, Head, Body, Container, Section,
  Heading, Text, Button, Hr, Preview,
} from '@react-email/components'
import { siteConfig } from '@/data/site'

interface WindowRow {
  heightMm: number
  widthMm: number
  quantity: number
  secondStorey: boolean
}

interface Props {
  name: string
  email: string
  phone: string
  suburb?: string
  glassOption: string
  glassLabel: string
  glassSubLabel: string
  glassSpec: string
  noisePct: number
  heatPct: number
  windows: WindowRow[]
  windowCount: number
  total: number
  quoteId: number
  confirmUrl: string
}

export function QuoteNotificationEmail({
  name, email, phone, suburb,
  glassOption, glassLabel, glassSubLabel, glassSpec, noisePct, heatPct,
  windows, windowCount, total,
  quoteId, confirmUrl,
}: Props) {
  const copy = siteConfig.emailCopy ?? {}
  const confirmButton = copy.quoteNotifConfirmButton ?? '✓ Confirm This Quote'
  const confirmNote   = copy.quoteNotifConfirmNote   ?? 'Tapping confirm sends the client their booking confirmation email.'

  return (
    <Html lang="en">
      <Head />
      <Preview>New quote from {name} · ${total.toLocaleString()} · Option {glassOption}</Preview>
      <Body style={body}>
        <Section style={header}>
          <Text style={brandText}>KING DOUBLE GLAZING</Text>
          <Text style={crownAccent}>◆</Text>
        </Section>

        <Container style={container}>
          <Section style={headingSection}>
            <Heading style={h1}>New Quote #{quoteId}</Heading>
          </Section>

          {/* Total */}
          <Section style={totalSection}>
            <Text style={totalLabel}>Quote total</Text>
            <Text style={totalValue}>${total.toLocaleString()}</Text>
          </Section>

          {/* Contact */}
          <Section style={dataSection}>
            <SectionHeading>Customer</SectionHeading>
            <Row label="Name"   value={name} />
            <Row label="Phone"  value={phone} />
            <Row label="Email"  value={email} />
            {suburb && <Row label="Suburb" value={suburb} />}
          </Section>

          <Hr style={divider} />

          {/* Glass option — explicit */}
          <Section style={dataSection}>
            <SectionHeading>Glass Selection</SectionHeading>

            {/* Option badge */}
            <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 12 }}>
              <tbody>
                <tr>
                  <td style={optionBadge}>{glassOption}</td>
                  <td style={{ paddingLeft: 14, verticalAlign: 'middle' }}>
                    <span style={optionLabelStyle}>{glassLabel}</span>
                    <br />
                    <span style={optionSubLabel}>{glassSubLabel}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <Row label="Spec"        value={glassSpec} />
            <Row label="Noise"       value={`${noisePct}% quieter than single glazing`} />
            <Row label="Heat loss"   value={`${heatPct}% less heat loss`} />
            <Row label="Windows"     value={`${windowCount} window${windowCount !== 1 ? 's' : ''}`} />
          </Section>

          <Hr style={divider} />

          {/* Window breakdown table */}
          <Section style={dataSection}>
            <SectionHeading>Window Breakdown</SectionHeading>
            <table width="100%" cellPadding={0} cellSpacing={0} style={breakdownTable}>
              <thead>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Size (mm)</th>
                  <th style={thStyle}>Qty</th>
                  <th style={thStyle}>2nd floor</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Area (m²)</th>
                </tr>
              </thead>
              <tbody>
                {windows.map((w, i) => {
                  const sqm = (w.heightMm / 1000) * (w.widthMm / 1000) * w.quantity
                  const isEven = i % 2 === 0
                  return (
                    <tr key={i} style={isEven ? trEven : trOdd}>
                      <td style={tdStyle}>{i + 1}</td>
                      <td style={tdStyle}>{w.heightMm} × {w.widthMm}</td>
                      <td style={tdStyle}>{w.quantity}</td>
                      <td style={tdStyle}>{w.secondStorey ? 'Yes' : '—'}</td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>{sqm.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Section>

          <Hr style={divider} />

          <Section style={{ textAlign: 'center' }}>
            <Button href={confirmUrl} style={ctaButton}>{confirmButton}</Button>
            <Text style={ctaNote}>{confirmNote}</Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Text style={footerText}>kingdoubleglazing.com.au</Text>
        </Section>
      </Body>
    </Html>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text style={sectionHeadingStyle}>{children}</Text>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
      <tbody>
        <tr>
          <td style={rowLabel}>{label}</td>
          <td style={rowValue}>{value}</td>
        </tr>
      </tbody>
    </table>
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

const totalSection: React.CSSProperties = {
  backgroundColor: '#000000',
  padding: '16px 20px',
  marginBottom: 24,
}

const totalLabel: React.CSSProperties = {
  color: '#AAAAAA',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: '0 0 6px',
}

const totalValue: React.CSSProperties = {
  color: '#F5C518',
  fontSize: 32,
  fontWeight: 700,
  margin: 0,
  lineHeight: '1',
}

const dataSection: React.CSSProperties = {
  marginTop: 8,
}

const sectionHeadingStyle: React.CSSProperties = {
  color: '#777777',
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  margin: '0 0 10px',
}

const rowLabel: React.CSSProperties = {
  color: '#555555',
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  width: 110,
  paddingRight: 12,
  verticalAlign: 'top',
  paddingTop: 2,
}

const rowValue: React.CSSProperties = {
  color: '#111111',
  fontSize: 14,
}

const optionBadge: React.CSSProperties = {
  backgroundColor: '#F5C518',
  color: '#000000',
  fontSize: 28,
  fontWeight: 900,
  width: 52,
  height: 52,
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '52px',
}

const optionLabelStyle: React.CSSProperties = {
  color: '#111111',
  fontSize: 15,
  fontWeight: 700,
}

const optionSubLabel: React.CSSProperties = {
  color: '#666666',
  fontSize: 12,
}

const breakdownTable: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  fontSize: 13,
}

const thStyle: React.CSSProperties = {
  backgroundColor: '#111111',
  color: '#FFFFFF',
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: '8px 10px',
  textAlign: 'left',
}

const trEven: React.CSSProperties = { backgroundColor: '#FAFAFA' }
const trOdd:  React.CSSProperties = { backgroundColor: '#FFFFFF' }

const tdStyle: React.CSSProperties = {
  color: '#111111',
  fontSize: 13,
  padding: '8px 10px',
  borderBottom: '1px solid #EEEEEE',
  verticalAlign: 'middle',
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
