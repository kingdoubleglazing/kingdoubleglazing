import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Preview,
} from '@react-email/components'

interface Props {
  name: string
  email: string
  phone: string
  suburb?: string
  message?: string
  preferredTime?: string
}

const TIME_LABELS: Record<string, string> = {
  morning:   'Morning (before noon)',
  afternoon: 'Afternoon (noon–5pm)',
  evening:   'Evening (after 5pm)',
}

export function ContactNotificationEmail({ name, email, phone, suburb, message, preferredTime }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New enquiry from {name}{suburb ? ` · ${suburb}` : ''}</Preview>
      <Body style={body}>
        {/* Header */}
        <Section style={header}>
          <Text style={brandText}>KING DOUBLE GLAZING</Text>
          <Text style={crownAccent}>◆</Text>
        </Section>

        <Container style={container}>
          {/* Heading */}
          <Section style={headingSection}>
            <Heading style={h1}>New Enquiry</Heading>
          </Section>

          {/* Data rows */}
          <Section style={dataSection}>
            <Row label="Name" value={name} />
            <Row label="Phone" value={phone} />
            <Row label="Email" value={email} />
            {suburb && <Row label="Suburb" value={suburb} />}
            {preferredTime && <Row label="Preferred time" value={TIME_LABELS[preferredTime] ?? preferredTime} />}
            {message && <Row label="Message" value={message} multiline />}
          </Section>

          <Hr style={divider} />

          <Text style={replyNote}>
            Reply to this email to respond directly to {name}.
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

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 12 }}>
      <tbody>
        <tr>
          <td style={rowLabel}>{label}</td>
          <td style={multiline ? { ...rowValue, whiteSpace: 'pre-wrap' } : rowValue}>{value}</td>
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

const dataSection: React.CSSProperties = {
  marginTop: 8,
}

const rowLabel: React.CSSProperties = {
  color: '#555555',
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  width: 130,
  paddingRight: 12,
  verticalAlign: 'top',
  paddingTop: 2,
}

const rowValue: React.CSSProperties = {
  color: '#111111',
  fontSize: 14,
  lineHeight: '1.5',
}

const divider: React.CSSProperties = {
  borderColor: '#E5E5E5',
  margin: '24px 0',
}

const replyNote: React.CSSProperties = {
  color: '#777777',
  fontSize: 12,
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
