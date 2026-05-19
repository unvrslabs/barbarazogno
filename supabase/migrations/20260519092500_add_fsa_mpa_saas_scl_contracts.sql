-- Add 4 new contract templates: FSA, MPA, SaaS, Source Code License
-- Apply 70% discount across all paid contracts (existing + new).
-- price = sale price (~30% of original); original_price = list price (shown struck-through in UI).

-- ============================================================================
-- 1) INSERT new contracts (already discounted -70%)
-- ============================================================================
INSERT INTO contract_templates (
  studio_id,
  name, name_en,
  description, description_en,
  category, category_en,
  price, original_price,
  features, features_en,
  is_bestseller,
  display_order,
  is_active,
  color,
  file_url,
  preview_url,
  stripe_price_id
) VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'Frame Supply Agreement (FSA)',
  'Frame Supply Agreement (FSA)',
  'Accordo quadro per fornitura ricorrente di prodotti o componenti, con ordini d''acquisto applicativi, prezzi, volumi e termini commerciali stabili nel tempo.',
  'Framework agreement for recurring supply of products or components, with applicable purchase orders, pricing, volumes, and stable commercial terms over time.',
  'Sviluppo e Fornitura',
  'Development & Supply',
  60, 199,
  ARRAY[
    'Condizioni generali e ordini applicativi',
    'Prezzi, volumi e termini di consegna',
    'Garanzie e gestione difetti',
    'Proprietà intellettuale e riservatezza',
    'Risoluzione e legge applicabile'
  ],
  ARRAY[
    'General terms & applicable orders',
    'Pricing, volumes & delivery terms',
    'Warranties & defect management',
    'IP rights & confidentiality',
    'Termination & governing law'
  ],
  false, 8, true,
  'from-emerald-500 to-teal-600',
  'Frame_Supply_Agreement_Template.docx',
  '/contracts/Frame_Supply_Agreement_DATA_SHEET.pdf',
  'price_1TYiGZKMHtAMmeThhB5tVXtB'
),
(
  'a0000000-0000-0000-0000-000000000001',
  'Master Purchase Agreement (MPA)',
  'Master Purchase Agreement (MPA)',
  'Contratto quadro per l''acquisto ricorrente di beni o servizi da un fornitore, con ordini d''acquisto applicativi e condizioni commerciali e legali predefinite.',
  'Master agreement for the recurring purchase of goods or services from a supplier, with applicable purchase orders and predefined commercial and legal terms.',
  'Sviluppo e Fornitura',
  'Development & Supply',
  60, 199,
  ARRAY[
    'Condizioni di acquisto standardizzate',
    'Ordini, listini e modalità di consegna',
    'Garanzie qualità e accettazione prodotti',
    'Indennità, responsabilità e assicurazioni',
    'Clausole anti-corruzione e compliance'
  ],
  ARRAY[
    'Standardized purchasing conditions',
    'Orders, pricing & delivery terms',
    'Quality warranties & product acceptance',
    'Indemnities, liability & insurance',
    'Anti-corruption & compliance clauses'
  ],
  false, 9, true,
  'from-blue-500 to-cyan-600',
  'Master_Purchase_Agreement_Template.docx',
  '/contracts/Master_Purchase_Agreement_DATA_SHEET.pdf',
  'price_1TYiGbKMHtAMmeThX0mpoTv0'
),
(
  'a0000000-0000-0000-0000-000000000001',
  'SaaS Agreement',
  'SaaS Agreement',
  'Accordo per la fornitura di servizi software in modalità Software-as-a-Service, con licenza d''uso non esclusiva, SLA, trattamento dati e gestione del servizio in cloud.',
  'Agreement for the provision of software services in Software-as-a-Service mode, with non-exclusive license, SLA, data processing, and cloud service management.',
  'SaaS / Cloud',
  'SaaS / Cloud',
  75, 249,
  ARRAY[
    'Licenza d''uso e accesso al servizio',
    'Service Level Agreement (SLA)',
    'Trattamento dati e GDPR',
    'Canoni, fatturazione e rinnovi',
    'Limitazione responsabilità e uptime'
  ],
  ARRAY[
    'License & service access',
    'Service Level Agreement (SLA)',
    'Data processing & GDPR',
    'Fees, billing & renewals',
    'Liability limitation & uptime'
  ],
  false, 10, true,
  'from-violet-500 to-purple-600',
  'SaaS_Agreement_Template.docx',
  '/contracts/SaaS_Agreement_DATA_SHEET.pdf',
  'price_1TYiGeKMHtAMmeThVKRYe9gz'
),
(
  'a0000000-0000-0000-0000-000000000001',
  'Source Code License Agreement',
  'Source Code License Agreement',
  'Contratto di licenza per la concessione in uso del codice sorgente di un software, con definizione di ambito d''uso, diritti di modifica, distribuzione e royalty.',
  'License agreement granting use of software source code, defining scope of use, modification rights, distribution, and royalties.',
  'Licenze Software',
  'Software Licensing',
  54, 179,
  ARRAY[
    'Concessione e ambito della licenza',
    'Diritti di modifica e opere derivate',
    'Royalty, canoni e revenue share',
    'Garanzie di non violazione IP di terzi',
    'Escrow del codice sorgente opzionale'
  ],
  ARRAY[
    'License grant & scope',
    'Modification & derivative works rights',
    'Royalties, fees & revenue share',
    'Third-party IP non-infringement',
    'Optional source code escrow'
  ],
  false, 11, true,
  'from-indigo-600 to-violet-500',
  'Source_Code_License_Agreement_Template.docx',
  '/contracts/Source_Code_License_Agreement_DATA_SHEET.pdf',
  'price_1TYiGjKMHtAMmeThmXJdfN4a'
);

-- ============================================================================
-- 2) Apply -70% discount to existing paid contracts (NDA gratuito escluso)
-- ============================================================================

-- Development and Purchase Agreement + SOW: 299 -> 90
UPDATE contract_templates SET price = 90, original_price = 299, stripe_price_id = 'price_1TYiHmKMHtAMmeThLIXYGf8S'
  WHERE id = '43c1c358-c620-44b6-9ebf-e051553c2868';

-- End User License Agreement (EULA): 18 -> 5
UPDATE contract_templates SET price = 5, original_price = 18, stripe_price_id = 'price_1TYiHpKMHtAMmeThAww23Y7z'
  WHERE id = 'b0aec757-e6c3-444d-b025-7dc79f71a09a';

-- Reseller Agreement + EULA + SLA: list 399 -> 120 (gia' aveva original_price = 399)
UPDATE contract_templates SET price = 120, original_price = 399, stripe_price_id = 'price_1TYiHsKMHtAMmeTh4w3tbKpY'
  WHERE id = 'dfa21fe1-5c06-4131-a513-de60713f1265';

-- T&M Lato Cliente: 139 -> 42
UPDATE contract_templates SET price = 42, original_price = 139, stripe_price_id = 'price_1TYiHvKMHtAMmeThgo3ABQvi'
  WHERE id = '862ac2d8-5346-46e9-b4a7-092c5d9a2c09';

-- Master Development & Supply Agreement con MPV - Lato Fornitore: 299 -> 90
UPDATE contract_templates SET price = 90, original_price = 299, stripe_price_id = 'price_1TYiHyKMHtAMmeThk80WrIzE'
  WHERE id = '86352c33-df55-4565-943f-d88ba967a9b2';

-- T&M Lato Fornitore: 139 -> 42
UPDATE contract_templates SET price = 42, original_price = 139, stripe_price_id = 'price_1TYiI1KMHtAMmeThak55DjNr'
  WHERE id = '27e3e399-901e-4d24-b049-248dd3d42ab4';
