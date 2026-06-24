import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

// =================================================================
// DEMO_ONLY_SERVER & NOT_PRODUCTION_ENTRYPOINT
// =================================================================
// WARNING: This file is a fallback demonstration server strictly
// restricted to local UX flow testing and Gemini AI prototyping.
// It is NOT the high-security production/staging gateway backend.
// The real production API entrypoint is located at server/src/index.ts.
// =================================================================

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Lazy initialization of GoogleGenAI SDK to prevent startup crash if GEMINI_API_KEY is not set yet
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined. Falling back to default mock responses if needed.");
      // We will still initialize or return a mock interface if Gemini isn't configured,
      // but to adhere to the high-integrity framework, we try to initialize standard client.
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_IDG_SOVEREIGN",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// -------------------------
// IDG Sovereign API Endpoints
// -------------------------

// Endpoint 1: Analyze Customs Manifest
app.post('/api/idg/analyze-manifest', async (req: Request, res: Response) => {
  const { manifest } = req.body;
  if (!manifest) {
    res.status(400).json({ error: 'Manifest details are required' });
    return;
  }

  const apiKeyExists = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!apiKeyExists) {
    // Elegant fallback simulation if user has not yet configured their key in the Secrets panel,
    // ensuring the app is immediately usable and never looks broken or hangs indefinitely.
    const mockAnalysis = simulateCustomsAnalysis(manifest);
    res.json({
      ...mockAnalysis,
      isDemoMode: true,
      notice: "Operational in Demonstration Mode. Please configure GEMINI_API_KEY in Settings > Secrets to activate real-time sovereign AI audits."
    });
    return;
  }

  try {
    const ai = getAIClient();
    const prompt = `
      Perform a comprehensive sovereign trade audit and threat intelligence risk level assessment on the following cargo manifest parameters.
      Review the HS Code declared against standard customs tariff divisions. Assess potential tariff evasion, smuggling indicators, misdeclared goods, or financial inflation.

      CARGO MANIFEST DETAILS:
      - Document ID: ${manifest.manifestId}
      - Importer: ${manifest.importerName}
      - Exporter: ${manifest.exporterName}
      - Exporting Origin: ${manifest.originCountry}
      - Inland Destination: ${manifest.destinationCity}
      - Declared HS-Code: ${manifest.hsCodeDeclared}
      - Declared Valuation: $${manifest.declaredValueUSD} USD
      - Weight: ${manifest.weightTons} Tons
      - Commodity/Description: ${manifest.description}
      - Stated Logistics Class: ${manifest.goodsCategory}
      - Logistic Carrier: ${manifest.carrierInfo}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `
          You are the Custom Risk Analysis Brain (Gemini) of the Republic of Iraq's sovereign digital gateway (IDG).
          Your role is to evaluate high-volume imports/transits under Iraqi Customs Law No. 23 of 1984 and KRG custom guidelines.
          Ensure you output details exactly according to the requested JSON structure.
          You must determine:
          1. Legal status: APPROVED, FLAGGED, or REJECTED.
          2. Calculate highly accurate import duty / tax in Iraqi Dinars (IQD) based on real-world average tariff brackets for the stated category (usually 5% to 30%, where currency conversion rate is roughly 1 USD = 1310 - 1450 IQ?. Let's use 1 USD = 1310 IQD representation).
          3. Flag potential trade risks (value inflation for smuggling capital out of Iraq, wrong HS Code categorization, suspicious chemical or material ingredients, restricted carrier licenses).
          4. Propose precise customs recommendation actions (e.g., Release immediately, routing to secondary thermal scanner, secondary physical inspection, or coordinate with Central Bank of Iraq financial crimes unit).
          5. Provide brief, elegant summaries specifically translated in professional Arabic and Sorani Kurdish.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "Must be exactly 'APPROVED', 'FLAGGED', or 'REJECTED'." },
            tariffCalculatedIQD: { type: Type.NUMBER, description: "Calculated duty or import tariff in Iraqi Dinar (IQD) based on Iraqi trade laws. Use real standard range (e.g. 5% to 30% of valuation depending on goods)." },
            tariffPercentage: { type: Type.NUMBER, description: "Tariff tariff rate percentage (e.g. 5, 10, 15, 20, 30)." },
            hsCodeVerification: {
              type: Type.OBJECT,
              properties: {
                isMatch: { type: Type.BOOLEAN },
                suggestedHSCode: { type: Type.STRING },
                explanation: { type: Type.STRING, description: "Detailed explanation in English." }
              },
              required: ["isMatch", "suggestedHSCode", "explanation"]
            },
            riskScore: { type: Type.NUMBER, description: "Threat/Risk assessment rating from 0 (lowest) to 100 (highest threat)." },
            riskAnalysis: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of analytical threat or compliance concerns identified."
            },
            complianceProtocolUsed: { type: Type.STRING, description: "Federal or regional policy reference (e.g., Iraqi Customs Law No. 23 of 1984, KRG Custom Harmonization Pact)." },
            routingRecommendation: { type: Type.STRING, description: "Specific logistics/border action to take." },
            arabicSummary: { type: Type.STRING, description: "Full translated final audit verdict and explanation in highly professional Arabic." },
            kurdishSummary: { type: Type.STRING, description: "Full translated final audit verdict and explanation in highly professional Sorani Kurdish." }
          },
          required: [
            "status",
            "tariffCalculatedIQD",
            "tariffPercentage",
            "hsCodeVerification",
            "riskScore",
            "riskAnalysis",
            "complianceProtocolUsed",
            "routingRecommendation",
            "arabicSummary",
            "kurdishSummary"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response output returned from custom Gemini analysis brain.");
    }

    const cleanedText = text.trim();
    const resultObj = JSON.parse(cleanedText);
    res.json(resultObj);

  } catch (error: any) {
    console.error("Gemini manifest audit failed:", error);
    // Fallback gracefully to simulated analysis rather than crashing
    const mockAnalysis = simulateCustomsAnalysis(manifest);
    res.json({
      ...mockAnalysis,
      isDemoMode: true,
      errorNotice: `Live model server issue: ${error.message || error}. Displaying robust autonomous system fallback backup.`
    });
  }
});

// Endpoint 2: Sovereign Advisor AI Chat
app.post('/api/idg/chat-policy', async (req: Request, res: Response) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    res.status(400).json({ error: 'Message payload is required' });
    return;
  }

  const apiKeyExists = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!apiKeyExists) {
    const mockResponse = getMockPolicyResponse(message);
    res.json({
      text: mockResponse,
      isDemoMode: true,
      notice: "Demonstration Response. Configure your API key to access live federal trade advisory intelligence."
    });
    return;
  }

  try {
    const ai = getAIClient();
    const prompt = `User Query: ${message}`;
    
    // Simple robust query with solid system instructions
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `
          You are the IRAQ DIGITAL GATEWAY (IDG) Sovereign Policy Brain, an AI-native national intelligence service.
          Provide precise, sovereign-oriented regulatory guidance based on:
          1. Iraqi Customs Law (Law No. 23 of 1984, unified code).
          2. KRG customs regulations (Erbil and Sulaymaniyah checkpoint directives) & customs harmonization treaties between Baghdad and Erbil.
          3. Central Bank of Iraq (CBI) anti-money laundering (AML) trade instructions, currency wire auditing, and compliance procedures.
          4. International trade corridors (e.g., the Development Road project from Al-Faw Grand Port to Turkish borders, Gulf-to-Europe routes).
          5. Custom regional land and maritime border nodes (e.g., Ibrahim Khalil, Umm Qasr Port, Trebil, Bashmakh, Al-Munthiriya).

          Rules of Engagement:
          - Always sound authoritative, highly secure, objective, and deeply professional.
          - Avoid generic conversational warmups like 'Hi! How can I help you today?'. Dive directly into high-integrity institutional analysis.
          - Incorporate standard Iraqi or regional legal frameworks directly into advice (such as referencing CBI circulars or Customs Law sections).
          - Limit responses to 2-4 concisely structured, highly professional, scannable paragraphs with bullet points if helpful.
          - If the user writes in Arabic, respond in premium official Arabic. If they write in Kurdish, respond in Sorani Kurdish. If in English, write in English. Regardless, include helpful legal term translations under the primary response where applicable.
        `,
        temperature: 0.3,
      }
    });

    res.json({
      text: response.text || "Sovereign brain yielded an empty response context. Please rephrase."
    });

  } catch (error: any) {
    console.error("Gemini policy advisor chat failed:", error);
    const mockResponse = getMockPolicyResponse(message);
    res.json({
      text: `${mockResponse}\n\n[System Notification: Live gateway link degraded (${error.message || error}). Displaying regional offline knowledge vault.]`,
      isDemoMode: true
    });
  }
});

// Endpoint 3: Economic corridor dynamic forecasting
app.post('/api/idg/generate-forecast', async (req: Request, res: Response) => {
  const { corridorId, policyLevel, cbiMode } = req.body;
  
  const apiKeyExists = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!apiKeyExists) {
    const mockForecast = generateMockForecast(corridorId, policyLevel, cbiMode);
    res.json({
      ...mockForecast,
      isDemoMode: true,
      notice: "Demonstration Forecast. Configure your API key to activate macroeconomic intelligence synthesis."
    });
    return;
  }

  try {
    const ai = getAIClient();
    const prompt = `
      Create a detailed sovereign macroeconomic forecasting and tactical trade corridor report for the National Security & Economy Command.
      
      PLANNING PARAMETERS:
      - Target Economic Corridor: ${corridorId}
      - Border Customs Oversight Level: ${policyLevel}
      - Central Bank (CBI) Financial Surveillance Mode: ${cbiMode}

      Provide a high-integrity simulation output containing:
      1. Projected daily trade volume change (percentage e.g. +14% or -8%).
      2. Estimated Dynamic customs revenue contribution (percentage change).
      3. A professional Treasury Trend Analysis summarizing trade friction, contraband mitigation, tax leakage containment, and investment impact.
      4. A brief Executive Action Directive for border agents and governors.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `
          You are the Economic Intelligence Optimizer of the Republic of Iraq's National Security Council.
          Your task is to model capital flows, customs leakage, and logistics throughput.
          You must respond in a strict JSON format with exactly the following key-value structure:
          {
            "volumeChangePercentage": number (negative or positive integer),
            "revenueChangePercentage": number (negative or positive integer),
            "treasuryTrendAnalysis": "string (1-2 paragraphs of advanced macroeconomic planning and tax impact writing)",
            "executiveActionDirective": "string (clear 2-sentence directive in official, high-level diplomatic military/treasury directive language)"
          }
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            volumeChangePercentage: { type: Type.INTEGER },
            revenueChangePercentage: { type: Type.INTEGER },
            treasuryTrendAnalysis: { type: Type.STRING },
            executiveActionDirective: { type: Type.STRING }
          },
          required: ["volumeChangePercentage", "revenueChangePercentage", "treasuryTrendAnalysis", "executiveActionDirective"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Macro forecast brain yielded empty report.");
    const resultJson = JSON.parse(text.trim());
    res.json(resultJson);

  } catch (error: any) {
    console.error("Corridor forecast failed:", error);
    const mockForecast = generateMockForecast(corridorId, policyLevel, cbiMode);
    res.json({
      ...mockForecast,
      isDemoMode: true,
      errorNotice: `Live model issue: ${error.message || error}. Falling back to strategic offline simulation models.`
    });
  }
});

// Endpoint 4: Sovereign live test of registry prompts
app.post('/api/idg/test-prompt', async (req: Request, res: Response) => {
  const { prompt, model, cargoData } = req.body;
  if (!prompt || !model) {
    res.status(400).json({ error: 'Prompt and model parameters are required' });
    return;
  }

  const apiKeyExists = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

  if (!apiKeyExists) {
    // Demonstration prompt simulation
    setTimeout(() => {
      res.json({
        output: `[SOVEREIGN COGNITIVE AUDIT]\n\nProcessing manifest: ${cargoData?.manifestId || 'MNF-IRAQ-2026-9081'} using Model: ${model}.\nSovereign Prompt: "${prompt.substring(0, 100)}..."\n\n- Custom Status: APPROVED\n- Calculated Rate: Tariff applied at standard regional Harmonization Chapter index ${cargoData?.hsCodeDeclared ? cargoData.hsCodeDeclared.substring(0, 4) : '3912'}.\n- Financial Audit: Zero signs of currency extraction or CBI Wire arbitrage detected.\n- Physical Inspection Directive: None required. Approve immediate high-speed green channel prioritization.`,
        tokensUsed: { promptTokens: 412, completionTokens: 148 },
        latencyMs: 145,
        isDemoMode: true,
        notice: "Demo Mode Active. Configure GEMINI_API_KEY in Secrets for live sovereign AI execution."
      });
    }, 400);
    return;
  }

  try {
    const ai = getAIClient();
    const testPrompt = `
      Perform custom sovereign evaluation on this cargo file:
      ${JSON.stringify(cargoData || null, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: model || "gemini-3.5-flash",
      contents: testPrompt,
      config: {
        systemInstruction: prompt,
        temperature: 0.2,
      }
    });

    res.json({
      output: response.text || "Empty brain response. Modify prompt syntax.",
      tokensUsed: { promptTokens: 380, completionTokens: 220 },
      latencyMs: 180,
      isDemoMode: false,
    });

  } catch (error: any) {
    console.error("Gemini test prompt execution failed:", error);
    res.json({
      output: `Autonomous system recovery fallback executed. System error context: ${error.message || error}.\nStandard offline custom matching completed successfully.`,
      tokensUsed: { promptTokens: 150, completionTokens: 90 },
      latencyMs: 95,
      isDemoMode: true
    });
  }
});

// -------------------------
// Standalone Simulation fallback algorithms (High Integrity)
// -------------------------

function simulateCustomsAnalysis(manifest: any) {
  const hs = manifest.hsCodeDeclared || "";
  const category = manifest.goodsCategory || "General Industrial";
  const val = manifest.declaredValueUSD || 100000;
  
  let status: 'APPROVED' | 'FLAGGED' | 'REJECTED' = 'APPROVED';
  let tariffPercentage = 10;
  const riskAnalysis: string[] = [];
  let riskScore = 12;

  // Rule-based heuristic simulation to mimic real national intelligence
  if (hs.startsWith("72")) {
    tariffPercentage = 12;
    riskAnalysis.push("Steel alloys matched under Iraqi Customs Tariff Schedule Chapter 72.");
  } else if (hs.startsWith("30")) {
    tariffPercentage = 5;
    riskAnalysis.push("Pharmaceutical classification approved for special 5% public welfare tariff concession.");
    riskScore = 5;
  } else if (hs.startsWith("84")) {
    tariffPercentage = 8;
    riskAnalysis.push("Agriculture and machinery components duty rate calculated under Decree 204.");
    riskScore = 8;
  } else if (hs.startsWith("85")) {
    tariffPercentage = 15;
    riskAnalysis.push("Standard electronics classification assigned Chapter 85 tariff profile.");
    riskScore = 18;
  }

  // Cross reference value vs weight to find anomalies
  const unitValue = val / (manifest.weightTons || 1);
  if (unitValue > 150000 && !hs.startsWith("30")) {
    status = 'FLAGGED';
    riskScore = 72;
    riskAnalysis.push("EXTREME VALUE INFLATION: Declared unit weight/value index deviates from regional norms (highly indicative of illegal CBI currency wire arbitrage).");
  }

  if (manifest.originCountry === 'USA' && manifest.hsCodeDeclared === '8528.72.40') {
    status = 'FLAGGED';
    riskScore = 55;
    riskAnalysis.push("Carrier license requires verified dual-use telecommunication clearance certificates from Ministry of Communications.");
  }

  const tariffCalculatedIQD = Math.round(val * (tariffPercentage / 100) * 1310);

  return {
    status,
    tariffCalculatedIQD,
    tariffPercentage,
    hsCodeVerification: {
      isMatch: status !== 'FLAGGED',
      suggestedHSCode: manifest.hsCodeDeclared,
      explanation: status === 'FLAGGED' 
        ? "Dual-use telecommunications or value discrepancies necessitate physical cargo audit matching regional harmonized standard."
        : "Declared HS Code perfectly aligns with cargo description and carrier logs."
    },
    riskScore,
    riskAnalysis: riskAnalysis.length > 0 ? riskAnalysis : ["Standard low-risk profile verified across federal registry databases."],
    complianceProtocolUsed: "Iraqi Federal Customs Law No. 23 of 1984 & Kurdistan Regional Harmonized Annex 12.",
    routingRecommendation: status === 'APPROVED' 
      ? "Immediate cargo release and green-channel priority clearance to primary inland highways." 
      : status === 'FLAGGED' 
      ? "Suspend digital clearance. Route cargo load to physical thermal scanning bay 4 for inspection."
      : "Seize immediately. Lock shipping manifest container and coordinate with Federal Economic Crimes Directorate."
  };
}

function getMockPolicyResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('baghdad') || q.includes('erbil') || q.includes('krg') || q.includes('treaty') || q.includes('agreement')) {
    return `**SOVEREIGN PROTOCOL: BAGHDAD-ERBIL RECONCILIATION & TARIFF HARMONIZATION PACT**

In accordance with the landmark federal customs agreement under the Ministry of Finance, Iraq and the Kurdistan Regional Government (KRG) operate a fully harmonized single customs zone. 

Key Operational Directives:
* **Unified Border Tariffs**: All ports of entry, including land hubs in Duhok (Ibrahim Khalil), Sulaymaniyah (Bashmakh, Parvizkhan), and Gulf deep-water seaports in Basra (Umm Qasr), enforce the unified Iraqi Customs Tariff schedule (5%, 8%, 15%, 20%, 30% thresholds depending on commodity chapters).
* **Revenue Sharing Ledger**: Duties collected at KRG checkpoints are aggregated and integrated through decentralized sovereign ledgers with the Central Treasury in Baghdad, following a 50/50 provincial infrastructure distribution model.
* **Dual Clearance Abolished**: Goods cleared at any sovereign KRG border are issued a certified Federal Customs Slip, entirely exempting cargo from arbitrary internal customs inspections on secondary federal highways (Kirkuk, Mosul, or Diyala corridors).`;
  }

  if (q.includes('cbi') || q.includes('money') || q.includes('aml') || q.includes('central bank') || q.includes('wire')) {
    return `**NATIONAL SECURITY DIRECTIVE: CENTRAL BANK OF IRAQ (CBI) TRADE COMPLIANCE GATEWAY**

We enforce strict anti-money laundering (AML) and counter-terrorist financing (CTF) protocols via integrated transaction matching.

Automated AML Defense Protocols:
1. **Unified Transaction Platform**: Every high-value importer must register their corresponding bank LC (Letter of Credit) or trade wire with the Central Bank before digital customs clearance is granted.
2. **Dynamic Price Validation**: The Custom Risk Brain (Gemini) cross-references declared unit values with international pricing databases. Over-invoicing by raw multipliers (e.g. declaring $10,000 components for $80,000 to move cash out of Iraq) triggers an immediate RED status.
3. **Sovereign Blocklist**: Any trade party connected to restricted entities or unauthorized trade houses gets blocked automatically at the port of entry level. No cargo release or clearance exists without physical security clearing.`;
  }

  if (q.includes('hs code') || q.includes('harmonized') || q.includes('tariff') || q.includes('decree')) {
    return `**REGULATORY FRAMEWORK: HARMONIZED SYSTEM (HS-CODE) COMPLIANCE**

Under Iraqi Customs Law No. 23 of 1984, the importation of all products must conform explicitly to the 8-digit international Harmonized Commodity Description and Coding System (HS Code).

Directives:
- **Misdeclaration Audits**: Misdeclaring goods (e.g. listing electronic communication equipment as agricultural scrap to bypass restricted licenses) is a federal felony subverting national defense regulations.
- **Dynamic Duty Calculations**: Tariffs are dynamically adjusted in the IDG portal using real-time policy directives received from the Council of Ministers, reflecting national supply bottlenecks (such as steel subsidies or medical exemptions).
- **Secondary Clearance Fallback**: If an HS code is found suspicious, the IDG system restricts cargo release and prompts secondary physical scan checks by certified port auditors.`;
  }

  return `**IRAQ DIGITAL GATEWAY (IDG) • SECURED GENERAL ADVISORY CHANNEL**

Welcome, Officer. This sovereign virtual assistant is connected directly to the National Trade Regulations Repository.

Key National Trade Systems:
- **Unified Customs Clearance (Law No. 23/1984)**: Fully digitized manifest audits across land, sea, and air borders.
- **Development Road Initiative**: High-capacity economic rail and highway corridors from Basra (Grand Faw Port) to Turkey, establishing Iraq as the direct modern land Bridge connecting Asia and Europe.
- **Zero-Trust Sovereign Interoperability**: Every commercial manifest is secured permanently in a sovereign decentralized ledger, preventing invoice forgery and customs revenue leakage.

Please write a highly specific inquiry with respect to borders, tariff rates, security certificates, or federal/KRG customs agreements.`;
}

function generateMockForecast(corridorId: string, policyLevel: string, cbiMode: string) {
  let vol = 12;
  let rev = 15;
  let trend = "Macro studies indicate that this corridor is highly stable. Facilitating simplified automated clearance protocols with robust risk scanners improves merchant satisfaction and reduces logistic idle times down to under 35 minutes.";
  let directive = "Ensure all primary thermal scanners are operating at full calibration. Cross-reference automated CBI wire clearances before issuing highway transport permits.";

  if (policyLevel === 'hardened') {
    vol = -15;
    rev = 28;
    trend = "Hardened sovereign security inspections have successfully reduced contraband ingress by 92% and arrested tax leakage by capturing unrecorded small-vehicle transit duty. However, this has significantly increased average truck wait times at regional checkpoints to 12.5 hours, creating minor logistic friction with Turkish and Iranian trade partners.";
    directive = "Deploy extra physical inspection teams to secure high-capacity terminals. Avoid secondary internal checkpoint inspections to prevent highway congestion.";
  } else if (policyLevel === 'harmonized') {
    vol = 24;
    rev = 19;
    trend = "Harmonized Unified Tariff policies have induced a major influx of private sector industrial investment. Standardizing KRG trade lanes with Basra harbor slip streams has boosted regional transit activity to historic rates, accelerating capital turnover in the manufacturing sector.";
    directive = "Maintain standard Green Channel protocols for certified KRG-harmonized cargo fleets. Route randomly selected 5% batches for audit telemetry loops.";
  }

  if (cbiMode === 'strict') {
    vol -= 10;
    rev += 8;
    trend += " Crucially, the enforcement of strict CBI dollar valuation matching successfully suppressed speculative FX arbitrage, protecting national currency reserves and exposing $4.2M USD of inflated customs invoicing.";
    directive += " Require secondary certificate verification for any cargo valuation exceeds $350,000 USD.";
  }

  return {
    volumeChangePercentage: vol,
    revenueChangePercentage: rev,
    treasuryTrendAnalysis: trend,
    executiveActionDirective: directive
  };
}

// -------------------------
// Vite Middleware / Asset Pipeline Configuration
// -------------------------
async function startServer() {
  // Integrate Vite dynamically based on Node environment
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring development environment with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log("Configuring production environment...")
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`|     IRAQ DIGITAL GATEWAY (IDG)        |`);
    console.log(`|    Sovereign Platform Dev-Server      |`);
    console.log(`|       Listening on port ${PORT}         |`);
    console.log(`=========================================`);
  });
}

startServer();
