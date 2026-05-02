const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  ExternalHyperlink, LevelFormat, PageNumber, Header, Footer,
  UnderlineType
} = require('docx');
const fs = require('fs');

const BRAND = '1A3C5E'; // dark navy
const ACCENT = '2A7FAF'; // blue
const LIGHT_BG = 'EBF4FA';
const GRAY = 'F5F5F5';
const WHITE = 'FFFFFF';
const TEXT = '1A1A1A';

const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160 },
    children: [new TextRun({ text, bold: true, size: 36, color: BRAND, font: 'Arial' })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT } },
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28, color: BRAND, font: 'Arial' })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 24, color: ACCENT, font: 'Arial' })],
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, font: 'Arial', color: TEXT, ...opts })],
  });
}

function pRuns(runs) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: runs,
  });
}

function run(text, opts = {}) {
  return new TextRun({ text, size: 22, font: 'Arial', color: TEXT, ...opts });
}

function bold(text) {
  return run(text, { bold: true });
}

function link(text, url) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, size: 22, font: 'Arial', color: ACCENT, underline: { type: UnderlineType.SINGLE } })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: 'Arial', color: TEXT })],
  });
}

function step(num, text) {
  return new Paragraph({
    numbering: { reference: 'steps', level: 0 },
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, font: 'Arial', color: TEXT })],
  });
}

function screenshotNote(text) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 4, color: 'E8A000' }, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E8A000' }, left: { style: BorderStyle.SINGLE, size: 4, color: 'E8A000' }, right: { style: BorderStyle.SINGLE, size: 4, color: 'E8A000' } },
        shading: { fill: 'FFF8E1', type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({
          children: [
            new TextRun({ text: '📸  SCREENSHOT NEEDED: ', bold: true, size: 20, font: 'Arial', color: '7A4F00' }),
            new TextRun({ text, size: 20, font: 'Arial', color: '7A4F00' }),
          ],
        })],
      })],
    })],
  });
}

function tip(text) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT }, bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT }, left: { style: BorderStyle.SINGLE, size: 12, color: ACCENT }, right: { style: BorderStyle.SINGLE, size: 4, color: ACCENT } },
        shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({
          children: [
            new TextRun({ text: 'TIP: ', bold: true, size: 20, font: 'Arial', color: ACCENT }),
            new TextRun({ text, size: 20, font: 'Arial', color: '1A3C5E' }),
          ],
        })],
      })],
    })],
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 120, after: 0 }, children: [new TextRun('')] });
}

function serviceRow(service, loginMethod, purpose, url) {
  return new TableRow({
    children: [
      new TableCell({
        borders, width: { size: 1800, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: service, bold: true, size: 20, font: 'Arial', color: BRAND })] })],
      }),
      new TableCell({
        borders, width: { size: 3000, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: purpose, size: 20, font: 'Arial', color: TEXT })] })],
      }),
      new TableCell({
        borders, width: { size: 2160, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: loginMethod, size: 20, font: 'Arial', color: TEXT })] })],
      }),
      new TableCell({
        borders, width: { size: 2400, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new ExternalHyperlink({ link: url, children: [new TextRun({ text: url.replace('https://', ''), size: 18, font: 'Arial', color: ACCENT, underline: { type: UnderlineType.SINGLE } })] })] })],
      }),
    ],
  });
}

function headerRow(cols, widths) {
  return new TableRow({
    tableHeader: true,
    children: cols.map((col, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: BRAND, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: col, bold: true, size: 20, font: 'Arial', color: WHITE })] })],
    })),
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }, {
          level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } },
        }],
      },
      {
        reference: 'steps',
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 22, color: TEXT } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT } },
          spacing: { after: 0 },
          children: [new TextRun({ text: 'King Double Glazing — Website Handover Guide', size: 18, font: 'Arial', color: '666666' })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' } },
          children: [
            new TextRun({ text: 'Page ', size: 18, font: 'Arial', color: '888888' }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: 'Arial', color: '888888' }),
            new TextRun({ text: ' — Confidential — King Double Glazing', size: 18, font: 'Arial', color: '888888' }),
          ],
        })],
      }),
    },
    children: [

      // ── COVER ─────────────────────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 80 },
        children: [new TextRun({ text: 'KING DOUBLE GLAZING', bold: true, size: 56, font: 'Arial', color: BRAND })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: 'Website Handover Guide', size: 36, font: 'Arial', color: ACCENT })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 480 },
        children: [new TextRun({ text: 'kingdoubleglazing.com.au', size: 24, font: 'Arial', color: '666666' })],
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [4680, 4680],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 4680, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [
              new Paragraph({ children: [new TextRun({ text: 'Prepared for:', size: 20, font: 'Arial', color: '888888' })] }),
              new Paragraph({ children: [new TextRun({ text: 'Tas — Brooklyn Glass Pty Ltd', bold: true, size: 22, font: 'Arial', color: BRAND })] }),
            ]}),
            new TableCell({ borders: noBorders, width: { size: 4680, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [
              new Paragraph({ children: [new TextRun({ text: 'Date:', size: 20, font: 'Arial', color: '888888' })] }),
              new Paragraph({ children: [new TextRun({ text: 'May 2026', bold: true, size: 22, font: 'Arial', color: BRAND })] }),
            ]}),
          ]}),
        ],
      }),
      new Paragraph({ spacing: { before: 400, after: 0 }, children: [new TextRun('')] }),

      // ── SECTION 1: OVERVIEW ───────────────────────────────────────────────
      h1('1. What You Now Own'),
      p('Your website is live and fully set up. This document tells you everything you need to know about running it — from changing your phone number to adding a gallery photo. No technical knowledge required for the day-to-day stuff.'),
      spacer(),
      p('Here is a quick summary of everything that has been transferred to your accounts:'),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1800, 3000, 2160, 2400],
        rows: [
          headerRow(['Service', 'What it does', 'How to log in', 'Website'], [1800, 3000, 2160, 2400]),
          serviceRow('Vercel', 'Google or GitHub', 'Hosts your website — keeps it live 24/7', 'https://vercel.com'),
          serviceRow('Neon', 'Google or GitHub', 'Stores all your leads and quote requests', 'https://neon.tech'),
          serviceRow('Resend', 'Google or GitHub', 'Sends you email notifications for new quotes', 'https://resend.com'),
          serviceRow('GitHub', 'Google or GitHub', 'Stores the website code (you probably won\'t need this)', 'https://github.com'),
          serviceRow('TinaCMS', 'Email + Password\n(see separate doc)', 'The editor you use to change website content', 'https://app.tina.io'),
        ],
      }),
      spacer(),
      tip('All of the above are in your own accounts. Nobody else controls your website or your data.'),
      spacer(),

      // ── SECTION 2: CONTENT EDITING ─────────────────────────────────────────
      h1('2. Changing Content on Your Website'),
      p('Everything you need to edit — text, images, phone numbers, prices, FAQs — can be changed through the Content Editor. You do not need to touch any code.'),
      spacer(),

      h2('2.1  Logging In to the Editor'),
      step(1, 'Open your browser and go to: https://kingdoubleglazing.com.au/admin'),
      step(2, 'You will see a TinaCMS login screen.'),
      step(3, 'Log in with the email and password from the separate credentials document.'),
      step(4, 'You are now in the editor. You will see a list of pages and settings on the left side.'),
      spacer(),
      screenshotNote('The TinaCMS login page and the editor dashboard showing the left-hand menu.'),
      spacer(),
      tip('Bookmark https://kingdoubleglazing.com.au/admin on your phone and computer so you can get to it quickly.'),
      spacer(),

      h2('2.2  How the Editor Works'),
      p('On the left you will see a list of things you can edit:'),
      bullet('Pages — Home, Gallery, Services, Estimate, Warranty, Contact, About'),
      bullet('Settings — your business phone, email, address, pricing, and navigation links'),
      spacer(),
      p('Click on anything to open it. The fields appear on the left and a live preview of the website appears on the right. When you are done, click the blue Save button at the top.'),
      spacer(),
      screenshotNote('The editor open on the Settings page, showing the two-panel layout (fields on left, website preview on right) with the Save button highlighted.'),
      spacer(),

      // ── SECTION 3: SETTINGS ────────────────────────────────────────────────
      h1('3. Updating Your Business Details'),
      p('Go to: Editor → Settings. This is the most important section — it controls information that appears everywhere on the site.'),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          headerRow(['Field', 'What it controls'], [3000, 6360]),
          ...[
            ['Business Name', 'Your trading name shown in the header and footer'],
            ['Legal Name', 'Brooklyn Glass Pty Ltd — shown in legal/warranty text'],
            ['ABN', 'Your ABN number shown in the footer'],
            ['Licence Number', 'Your builder’s licence number'],
            ['Phone (display)', 'The phone number shown to customers, e.g. 0406 470 595'],
            ['Phone E.164', 'The machine-readable version, e.g. +61406470595 — used for click-to-call'],
            ['Email', 'Your public contact email'],
            ['Notification Email', 'Where quote alert emails get sent — usually the same as your email'],
            ['Address', 'Your service area address'],
            ['Footer Tagline', 'The short slogan in the footer'],
            ['Footer Bio', 'The short paragraph about the business in the footer'],
          ].map(([field, desc]) => new TableRow({ children: [
            new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, shading: { fill: GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: field, bold: true, size: 20, font: 'Arial', color: BRAND })] })] }),
            new TableCell({ borders, width: { size: 6360, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: desc, size: 20, font: 'Arial', color: TEXT })] })] }),
          ]})),
        ],
      }),
      spacer(),
      tip('Whenever you change your phone number or email, update it in Settings. It will automatically update everywhere on the site in one go.'),
      spacer(),

      // ── SECTION 4: EMAIL TEMPLATES ─────────────────────────────────────────
      h1('4. Editing Your Email Templates'),
      p('Every time a customer submits a quote or fills in the contact form, two emails are sent automatically:'),
      bullet('One to the customer confirming their request.'),
      bullet('One to you as an internal notification.'),
      spacer(),
      p('You can change the wording of both without touching any code. Go to:'),
      p('Editor (admin) → Settings → Email Copy'),
      spacer(),

      h2('4.1  Quote Confirmation (sent to the customer)'),
      p('This is what the customer receives after they submit an instant quote. You can edit:'),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3200, 6160],
        rows: [
          headerRow(['Field in editor', 'What it controls'], [3200, 6160]),
          ...[
            ['Quote confirm: subject line', 'The subject line of the email the customer receives'],
            ['Quote confirm: heading', 'The big heading inside the email body'],
            ['Quote confirm: intro', 'The paragraph after "Hi [customer name] —". Write naturally, e.g. "Thanks for getting in touch..."'],
            ['Quote confirm: summary label', 'The label above the quote summary box, e.g. "Your estimate"'],
            ['Quote confirm: contact note', 'A short note at the bottom. Use {phone} and it will be replaced with your actual phone number automatically'],
          ].map(([field, desc], i) => new TableRow({ children: [
            new TableCell({ borders, width: { size: 3200, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: field, bold: true, size: 20, font: 'Arial', color: BRAND })] })] }),
            new TableCell({ borders, width: { size: 6160, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: desc, size: 20, font: 'Arial', color: TEXT })] })] }),
          ]})),
        ],
      }),
      spacer(),

      h2('4.2  Contact Notification (sent to you)'),
      p('This is the internal email you receive when someone fills in the contact form. You can edit:'),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3200, 6160],
        rows: [
          headerRow(['Field in editor', 'What it controls'], [3200, 6160]),
          ...[
            ['Contact notification: heading', 'The heading in the email you receive, e.g. "New contact enquiry"'],
            ['Contact notification: reply note', 'A reminder note at the bottom. Use {name} and it is replaced with the customer\'s name'],
          ].map(([field, desc], i) => new TableRow({ children: [
            new TableCell({ borders, width: { size: 3200, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: field, bold: true, size: 20, font: 'Arial', color: BRAND })] })] }),
            new TableCell({ borders, width: { size: 6160, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: desc, size: 20, font: 'Arial', color: TEXT })] })] }),
          ]})),
        ],
      }),
      spacer(),

      h2('4.3  Quote Notification (sent to you)'),
      p('This is the internal email you receive when someone submits an instant quote request. You can edit:'),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3200, 6160],
        rows: [
          headerRow(['Field in editor', 'What it controls'], [3200, 6160]),
          ...[
            ['Quote notification: confirm button label', 'The text on the button you click to confirm a quote, e.g. "Confirm this quote"'],
            ['Quote notification: confirm note', 'A short note explaining what confirming the quote does'],
          ].map(([field, desc], i) => new TableRow({ children: [
            new TableCell({ borders, width: { size: 3200, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: field, bold: true, size: 20, font: 'Arial', color: BRAND })] })] }),
            new TableCell({ borders, width: { size: 6160, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: desc, size: 20, font: 'Arial', color: TEXT })] })] }),
          ]})),
        ],
      }),
      spacer(),
      tip('The placeholders like {name} and {phone} are special — they get replaced with the real values automatically. Do not delete the curly braces when editing.'),
      screenshotNote('Settings → Email Copy open in the editor, showing the quote confirmation fields.'),
      spacer(),

      // ── SECTION 5: PAGES ───────────────────────────────────────────────────
      h1('5. Editing Your Pages'),

      h2('4.1  Home Page'),
      p('This is the first thing people see. You can edit:'),
      bullet('The main headline and sub-headline at the top'),
      bullet('The call-to-action buttons (e.g. “Get a Free Quote”)'),
      bullet('Each section of the page — they are listed one by one in the editor'),
      bullet('FAQs at the bottom of the page'),
      spacer(),
      screenshotNote('The Home page open in the editor, showing the list of page sections/blocks on the left.'),
      spacer(),

      h2('4.2  Gallery Page'),
      p('This is where your project photos live. To add a new photo:'),
      step(1, 'Go to Gallery in the left menu.'),
      step(2, 'Click the + Add Item button.'),
      step(3, 'Fill in the title, suburb, and glass type.'),
      step(4, 'Click the image field and upload a photo from your phone or computer.'),
      step(5, 'Click Save.'),
      spacer(),
      p('To remove a photo, open the Gallery, find the item, and click the rubbish bin / delete icon next to it.'),
      spacer(),
      screenshotNote('The Gallery editor showing existing items with the + Add Item button and delete icon visible.'),
      spacer(),

      h2('4.3  Services Page'),
      p('Lists all the services you offer. You can edit the title, description, and details for each service.'),
      spacer(),

      h2('4.4  Estimate Page (Quote Calculator)'),
      p('This is the instant quote tool. Customers fill it in and get an instant price range. You can edit:'),
      bullet('The headline and intro text at the top'),
      bullet('The pricing ranges used in the calculator (in Settings → Pricing)'),
      spacer(),
      tip('If your pricing changes, update it in Settings → Pricing, not directly on the Estimate page.'),
      spacer(),

      h2('4.5  Warranty Page'),
      p('Explains your warranty. You can edit the headline, the coverage details, and the FAQs.'),
      spacer(),

      h2('4.6  Contact Page'),
      p('Shows your contact details and a contact form. The details are pulled from Settings automatically — you do not need to edit this page separately unless you want to change the intro text.'),
      spacer(),

      h2('4.7  About Page'),
      p('Your story and team. You can edit all the text here.'),
      spacer(),

      // ── SECTION 6: LEADS / QUOTES ─────────────────────────────────────────
      h1('6. Viewing Customer Leads and Quote Requests'),
      p('Every time someone fills in the contact form or uses the instant quote calculator, the details are saved to your database and you get an email notification.'),
      spacer(),
      p('To view all leads and quote requests:'),
      step(1, 'Go to https://neon.tech and log in with Google or GitHub.'),
      step(2, 'Open your project (it will be named something like kingdoubleglazing).'),
      step(3, 'Click on Tables in the left menu.'),
      step(4, 'You will see two tables: leads (contact form submissions) and quotes (instant quote requests).'),
      spacer(),
      screenshotNote('The Neon dashboard showing the Tables view with the leads and quotes tables listed.'),
      spacer(),
      tip('You will also receive an email every time someone submits a quote. Check your inbox (and spam folder the first time) to make sure those are coming through.'),
      spacer(),

      // ── SECTION 7: EMAILS ─────────────────────────────────────────────────
      h1('7. Email Notifications (Resend)'),
      p('Resend is the service that sends you an email every time a customer submits a quote. It is already set up and working.'),
      spacer(),
      p('You normally do not need to log in to Resend unless you want to:'),
      bullet('Check how many emails were sent'),
      bullet('See if a specific email was delivered'),
      bullet('Update the From address on the emails'),
      spacer(),
      p('Log in at https://resend.com using Google or GitHub.'),
      spacer(),

      // ── SECTION 8: HOSTING ─────────────────────────────────────────────────
      h1('8. Your Website Hosting (Vercel)'),
      p('Vercel keeps your website live. It is fully automatic — you do not need to do anything day to day.'),
      spacer(),
      p('The only times you would log in to Vercel (https://vercel.com) are:'),
      bullet('To check if the website is online'),
      bullet('To add a developer to the project so they can deploy code changes'),
      bullet('To update environment settings if your email or API keys change'),
      spacer(),
      tip('If the website ever goes down, check vercel.com first. The dashboard will tell you if there is an issue.'),
      spacer(),

      // ── SECTION 9: CODE CHANGES ────────────────────────────────────────────
      h1('9. Making Bigger Changes (Code)'),
      p('For anything beyond text and images — like adding a new page, changing the layout, or adding a new feature — someone will need to edit the code.'),
      spacer(),
      p('You have two options:'),
      spacer(),

      h2('Option A: Hire a Developer'),
      p('Give the developer the link to your GitHub repository. They will have everything they need to make changes and deploy them.'),
      spacer(),
      pRuns([
        run('Your GitHub repository: '),
        link('github.com/Clupai8o0/kingdoubleglazing', 'https://github.com/Clupai8o0/kingdoubleglazing'),
      ]),
      spacer(),
      p('The site is built with Next.js (a popular framework), Tailwind CSS, and TypeScript. Any web developer familiar with these will be able to work on it quickly.'),
      spacer(),

      h2('Option B: Use ChatGPT as a Guide'),
      p('You can ask ChatGPT to help you understand or make simple code changes. To get the best results, paste the code from the relevant file directly into ChatGPT and describe what you want to change.'),
      spacer(),
      p('A good prompt to start with:'),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({ children: [new TableCell({
          borders: { top: border, bottom: border, left: { style: BorderStyle.SINGLE, size: 12, color: '888888' }, right: border },
          shading: { fill: GRAY, type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 200, right: 200 },
          width: { size: 9360, type: WidthType.DXA },
          children: [
            new Paragraph({ children: [new TextRun({ text: '"I have a Next.js website. Here is the code for [page name]. I want to [describe the change]. Please show me exactly what to change."', size: 20, font: 'Courier New', color: '333333' })] }),
          ],
        })]})],
      }),
      spacer(),
      p('Once you have the updated code, paste it back into the file using GitHub’s web editor, or give it to a developer to deploy.'),
      spacer(),
      tip('For anything that will go live on the public website, always test it on a staging/preview link first (Vercel automatically creates one for every code change).'),
      spacer(),

      // ── SECTION 10: DOMAIN ──────────────────────────────────────────────────
      h1('10. Your Domain Name'),
      p('Your domain is kingdoubleglazing.com.au. It is pointed to your Vercel hosting.'),
      spacer(),
      p('The domain is managed separately from this setup. If you ever need to renew it or update DNS records, contact whoever you registered the domain with (check your email for the original registration receipt).'),
      spacer(),

      // ── SECTION 11: QUICK REFERENCE ────────────────────────────────────────
      h1('11. Quick Reference — Common Tasks'),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3600, 5760],
        rows: [
          headerRow(['I want to…', 'How to do it'], [3600, 5760]),
          ...[
            ['Change my phone number', 'Editor (admin) → Settings → Phone fields → Save'],
            ['Change my email address', 'Editor (admin) → Settings → Email → Save'],
            ['Update my pricing', 'Editor (admin) → Settings → Pricing section → Save'],
            ['Edit the quote email customers receive', 'Editor (admin) → Settings → Email Copy → Quote confirm fields → Save'],
            ['Edit my internal notification emails', 'Editor (admin) → Settings → Email Copy → Contact/Quote notification fields → Save'],
            ['Add a gallery photo', 'Editor (admin) → Gallery → + Add Item → Upload photo → Save'],
            ['Remove a gallery photo', 'Editor (admin) → Gallery → Click item → Delete icon → Save'],
            ['Edit the home page headline', 'Editor (admin) → Pages → Home → Edit Hero section → Save'],
            ['Add an FAQ', 'Editor (admin) → Pages → [relevant page] → FAQs → + Add → Save'],
            ['View new quote requests', 'neon.tech → Log in → Tables → quotes'],
            ['Check if the website is online', 'vercel.com → Log in → check project status'],
            ['Get a developer to help', 'Give them: github.com/Clupai8o0/kingdoubleglazing'],
          ].map(([task, how], i) => new TableRow({ children: [
            new TableCell({ borders, width: { size: 3600, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: task, bold: true, size: 20, font: 'Arial', color: BRAND })] })] }),
            new TableCell({ borders, width: { size: 5760, type: WidthType.DXA }, shading: { fill: i % 2 === 0 ? WHITE : GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: how, size: 20, font: 'Arial', color: TEXT })] })] }),
          ]})),
        ],
      }),
      spacer(),

      // ── SECTION 12: NEED HELP ──────────────────────────────────────────────
      h1('12. Need Help?'),
      p('If something does not look right on the website or you are not sure how to make a change, you have a few options:'),
      spacer(),
      bullet('Use ChatGPT — describe the problem and paste in the relevant section of this document for context.'),
      bullet('Check the Vercel dashboard to see if there is a deployment error.'),
      bullet('Contact your developer and share the GitHub repository link with them.'),
      spacer(),
      p('Everything you need is in your own accounts — you are not dependent on anyone to keep your website running.'),
      spacer(),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/Users/clupa/Documents/projects/kingdoubleglazing/King-Double-Glazing-Handover.docx', buffer);
  console.log('Done: King-Double-Glazing-Handover.docx');
});
