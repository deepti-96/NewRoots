import OpenAI from "openai";

// ---------------------------------------------------------------------------
// User profile context — injected so the LLM personalizes answers for
// the user's state, family, employment situation, etc.
// ---------------------------------------------------------------------------
export interface UserContext {
  username: string;
  language: string;
  state: string | null;
  familySize: number | null;
  hasChildren: boolean | null;
  employmentStatus: string | null;
  hasInsurance: boolean | null;
  arrivalDate: string | null;
}

// ---------------------------------------------------------------------------
// Milestone knowledge base — grounded context for the LLM
// ---------------------------------------------------------------------------
const MILESTONE_KNOWLEDGE = `
You have access to the following 27 milestones in the user's 90-day resettlement journey:

WEEK 1 — FIRST 72 HOURS (SURVIVAL)
1. Get a Phone / SIM Card (URGENT): Walmart, T-Mobile, AT&T have prepaid plans from $25/mo. Mint Mobile and Tello are cheaper. No ID needed at many stores.
2. Establish a Mailing Address (URGENT): Shelter address works. Some nonprofits offer mail services. PO Boxes at USPS start at ~$30/6 months.
3. Download I-94 Record (URGENT): Free at https://i94.cbp.dhs.gov — needed for SSN, benefits, work authorization, and driver's license. Print multiple copies.
4. Attend Community Orientation (URGENT): Learn about U.S. laws, culture, transportation, tenant rights, and local resources from your resettlement agency.
5. Learn Emergency Numbers (URGENT): 911 = police, fire, ambulance. 211 = social services finder. 988 = mental health crisis (available in many languages).

WEEK 2 — KEY PAPERWORK & IDENTITY
6. Apply for Social Security Number / SSN (URGENT): Apply at local SSA office after 10+ days. Free. https://www.ssa.gov/number-card/request-number-first-time. Locator: https://www.ssa.gov/locator. Processing: 2-4 weeks.
7. Open a Bank Account (URGENT): No SSN needed per CFPB. Passport + proof of address. https://www.consumerfinance.gov/consumer-tools/bank-accounts/. Credit unions have lower fees.
8. Complete Initial Health Screening (URGENT): Required within 30 days. Local health depts conduct them free. Bring medical records from home country.
9. Enroll in Health Insurance (URGENT): Marketplace at https://www.healthcare.gov/immigrants/. Moving to US = 60-day Special Enrollment Period.
10. Enroll Children in School (URGENT): Free public education regardless of immigration status. Schools CANNOT ask about status. https://www.ed.gov/
11. Enroll in ESL / English Classes (RECOMMENDED): Free at public libraries. Online: USALearns.org. Community colleges offer low-cost ESL.

WEEK 3–4 — BENEFITS, FAMILY STABILITY & LEGAL COMPLIANCE
12. Apply for SNAP / Food Assistance (RECOMMENDED): EBT card for groceries. Refugees eligible immediately. https://www.benefits.gov/benefit/361
13. Apply for Refugee Cash Assistance / RCA (RECOMMENDED): Monthly cash up to 8 months. https://www.acf.hhs.gov/orr/programs/refugees/cma
14. Apply for Medicaid / CHIP (RECOMMENDED): Free/low-cost health insurance. https://www.healthcare.gov/medicaid-chip/
15. WIC — Food for Women, Infants & Children (RECOMMENDED): Free food, formula. https://www.fns.usda.gov/wic
16. Register for Selective Service (URGENT for males 18-25): Required within 30 days. https://www.sss.gov/register/immigrants/
17. Get State ID or Driver's License (RECOMMENDED): https://www.usa.gov/state-motor-vehicle-services
18. Apply for ITIN if no SSN eligible (RECOMMENDED): IRS Form W-7. https://www.irs.gov/individuals/individual-taxpayer-identification-number
19. File AR-11 Address Change with USCIS (URGENT if you move): Within 10 days. https://www.uscis.gov/ar-11

MONTH 2 — EMPLOYMENT & SELF-SUFFICIENCY
20. Apply for Work Authorization / EAD (URGENT): Form I-765. https://www.uscis.gov/i-765
21. Attend Employment Readiness Workshop (RECOMMENDED)
22. Start Applying for Jobs (RECOMMENDED): Indeed.com, LinkedIn, state job boards
23. Learn Public Transportation (RECOMMENDED)
24. Understand Your Lease & Tenant Rights (RECOMMENDED): https://www.hud.gov/topics/rental_assistance

MONTH 3 — TAX, LONG-TERM STABILITY & INTEGRATION
25. Start Building Credit History (RECOMMENDED)
26. File Taxes via VITA (RECOMMENDED): https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers
27. Connect with Immigration Legal Aid (RECOMMENDED): https://www.immigrationadvocates.org/legaldirectory/
`;

function buildSystemPrompt(userCtx?: UserContext): string {
  let userProfile = "";
  if (userCtx) {
    const parts: string[] = [];
    if (userCtx.state) parts.push(`Lives in: ${userCtx.state}`);
    if (userCtx.familySize) parts.push(`Family size: ${userCtx.familySize} people`);
    if (userCtx.hasChildren !== null) parts.push(`Has children: ${userCtx.hasChildren ? "Yes" : "No"}`);
    if (userCtx.employmentStatus) parts.push(`Employment: ${userCtx.employmentStatus}`);
    if (userCtx.hasInsurance !== null) parts.push(`Has health insurance: ${userCtx.hasInsurance ? "Yes" : "No"}`);
    if (userCtx.arrivalDate) {
      const days = Math.max(0, Math.floor((Date.now() - new Date(userCtx.arrivalDate).getTime()) / 86400000));
      parts.push(`Days since arrival in U.S.: ${days}`);
    }
    if (userCtx.language && userCtx.language !== "en") parts.push(`Preferred language: ${userCtx.language}`);
    if (parts.length > 0) {
      userProfile = `\n\nUSER PROFILE (use this to personalize your answers — give state-specific info, family-specific guidance, etc.):\n${parts.join("\n")}`;
    }
  }

  return `You are NewRoots AI — a compassionate, knowledgeable algorithmic caseworker helping newly arrived immigrant families navigate their first 90 days in the United States.

You have WEB SEARCH capability. Use it proactively to:
- Find STATE-SPECIFIC resources (e.g., "SNAP application California", "free ESL classes near [state]")
- Look up current government office hours, phone numbers, and addresses
- Find local nonprofit organizations that help immigrants in the user's state
- Get the latest policy changes or deadlines that might affect them
- Find specific links to state-level benefit applications

PERSONALITY:
- Warm, encouraging, and patient — like a trusted social worker
- Always assume the user may be reading in their second language
- Use simple, clear sentences. Avoid jargon unless you explain it
- When possible, provide direct links (URLs) so the user can take action immediately

CAPABILITIES:
- Answer questions about the 90-day resettlement process, U.S. immigration bureaucracy, benefits, housing, employment, health, education, and related topics
- Search the web for the most current and location-specific information
- Provide state-specific guidance based on the user's location
- If a question is about specific legal cases or asylum specifics, kindly suggest they contact a legal aid organization

CONVERSATION RULES:
- Keep answers concise — 2-4 sentences for simple questions, up to a short paragraph for complex ones
- Always end with an encouraging note
- If the user's question relates to a specific milestone, reference it by name
- Respond in the SAME LANGUAGE the user writes in
- When you search the web, cite the sources naturally (e.g., "According to [website]...")
- Prioritize .gov and .org sources over commercial sites

${MILESTONE_KNOWLEDGE}${userProfile}

Remember: You are not a lawyer. You cannot give legal advice. But you CAN guide families through bureaucratic processes with warmth and precision.`;
}

// ---------------------------------------------------------------------------
// Agent class — uses OpenAI Responses API with web_search_preview
// ---------------------------------------------------------------------------
export class NewRootsAgent {
  private openai: OpenAI;
  private conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = [];
  private userContext?: UserContext;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    this.openai = new OpenAI({ apiKey });
  }

  setUserContext(ctx: UserContext): void {
    this.userContext = ctx;
  }

  async chat(userMessage: string, milestoneContext?: string): Promise<string> {
    const enrichedMessage = milestoneContext
      ? `[The user is currently looking at the milestone: "${milestoneContext}"]\n\nUser question: ${userMessage}`
      : userMessage;

    this.conversationHistory.push({ role: "user", content: enrichedMessage });

    // Keep conversation history bounded (last 10 turns)
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    const systemPrompt = buildSystemPrompt(this.userContext);

    try {
      // Use OpenAI Responses API with web_search_preview for live search
      const response = await (this.openai as any).responses.create({
        model: "gpt-4o-mini",
        tools: [{ type: "web_search_preview" }],
        instructions: systemPrompt,
        input: this.conversationHistory.map(m => ({
          role: m.role,
          content: m.content,
        })),
      });

      const reply: string = response.output_text ?? "I'm sorry, I couldn't process that. Please try again.";
      this.conversationHistory.push({ role: "assistant", content: reply });
      return reply;
    } catch (err: any) {
      console.error("OpenAI Responses API error:", err?.message || err);

      // Fallback to Chat Completions API (no web search, but still works)
      try {
        console.log("Falling back to Chat Completions API...");
        const completion = await this.openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...this.conversationHistory,
          ],
          max_tokens: 600,
          temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content ?? "I'm sorry, I couldn't process that.";
        this.conversationHistory.push({ role: "assistant", content: reply });
        return reply;
      } catch (fallbackErr: any) {
        console.error("Chat Completions fallback error:", fallbackErr?.message);
        this.conversationHistory.pop();
        throw new Error("Failed to get response from AI assistant");
      }
    }
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}

// ---------------------------------------------------------------------------
// Per-user agent instances (keyed by numeric user ID)
// ---------------------------------------------------------------------------
const agents = new Map<number, NewRootsAgent>();

export function getAgentForUser(userId: number): NewRootsAgent {
  let agent = agents.get(userId);
  if (!agent) {
    agent = new NewRootsAgent();
    agents.set(userId, agent);
  }
  return agent;
}
