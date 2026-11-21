// =========================================================================
// NESA HSC YEAR 12 BUSINESS STUDIES — COMPLETE SYLLABUS DATABASE (RIPS / RIPSE)
// Structured for 2-Part Dot-Point Note-Taking (Core Theory + Case Study)
// Integrated with Gemini Notebook Videos, Infographics & PDF Study Decks
// =========================================================================

const SYLLABUS_DATA = {
    notebookUrl: "https://notebook.google.com/notebook/96479e04-bdd6-457b-9cea-a1b3624e895e",

    // Global Masterclass Videos & Documents Library
    mediaLibrary: [
        {
            id: "vid-ops-arch",
            title: "The Architecture of Advantage (Operations Role & Strategy)",
            topic: "operations",
            section: "Role & Strategies",
            type: "video",
            src: "assets/videos/operations_architecture_of_advantage.mp4",
            badge: "Operations Masterclass",
            desc: "Deep dive into strategic role of operations, cost leadership vs differentiation, and competitive advantage."
        },
        {
            id: "vid-ops-mcd",
            title: "The Fast Food Masterclass: McDonald's Operations Engine",
            topic: "operations",
            section: "Processes & Strategies",
            type: "video",
            src: "assets/videos/operations_mcdonalds_masterclass.mp4",
            badge: "Case Study Video",
            desc: "How McDonald's applies the IPO model, 4Vs, JIT inventory, technology, and quality management globally."
        },
        {
            id: "vid-mkt-proc",
            title: "The Marketing Process Masterclass (6-Step Framework)",
            topic: "marketing",
            section: "Processes",
            type: "video",
            src: "assets/videos/marketing_process_masterclass.mp4",
            badge: "Marketing Masterclass",
            desc: "Complete walkthrough of Situational Analysis (SWOT & PLC), Market Research, Objectives, Target Markets, 4Ps, and Monitoring."
        },
        {
            id: "vid-exam-report1",
            title: "Writing a Band 6 HSC Business Studies Section III Report",
            topic: "exam",
            section: "Section III Business Report",
            type: "video",
            src: "assets/videos/exam_section_iii_report.mp4",
            badge: "Band 6 Exam Guide",
            desc: "Step-by-step executive summary, stimulus integration, subheadings, and evaluation for Section III."
        },
        {
            id: "vid-exam-report2",
            title: "How to Structure a Band 6 HSC Business Report",
            topic: "exam",
            section: "Section III Business Report",
            type: "video",
            src: "assets/videos/exam_band6_business_report.mp4",
            badge: "Report Structure",
            desc: "Formatting rules, NESA directive verbs, and linking business problems to syllabus strategies."
        },
        {
            id: "vid-exam-report3",
            title: "How to Structure an HSC Business Report (Quick Guide)",
            topic: "exam",
            section: "Section III Business Report",
            type: "video",
            src: "assets/videos/exam_structure_business_report.mp4",
            badge: "Quick Overview",
            desc: "Essential checklist for Section III Business Reports."
        },
        {
            id: "vid-exam-ext1",
            title: "Mastering the HSC Business Studies Extended Response (Section IV)",
            topic: "exam",
            section: "Section IV Extended Response",
            type: "video",
            src: "assets/videos/exam_mastering_extended_response.mp4",
            badge: "Section IV Masterclass",
            desc: "How to integrate real-world case studies (McDonald's, Apple, Qantas) with statistics for 19-20/20 marks."
        },
        {
            id: "vid-exam-ext2",
            title: "How to Structure a Band 6 Extended Response",
            topic: "exam",
            section: "Section IV Extended Response",
            type: "video",
            src: "assets/videos/exam_band6_extended_response.mp4",
            badge: "Section IV Structure",
            desc: "Introduction thesis, PEEL body paragraphs, case study synthesis, and evaluative conclusion."
        },
        {
            id: "vid-ai-engine",
            title: "Learn Studio: The Syllabus-Calibrated AI Engine",
            topic: "operations",
            section: "Platform Overview",
            type: "video",
            src: "assets/videos/learn_studio_ai_engine.mp4",
            badge: "Learn Studio",
            desc: "Overview of how the syllabus-calibrated learning engine maps NESA dot points to Band 6 evidence."
        }
    ],

    // Topics organized by Official NESA HSC Syllabus (25% weighting each)
    topics: {
        operations: {
            id: "operations",
            name: "Operations",
            code: "TOPIC 1",
            weight: "25% of HSC",
            icon: "⚙️",
            accent: "#ea580c",
            tagline: "Transformation, Value Creation, Supply Chain & Operational Efficiency",
            summary: "Operations focuses on the transformation of inputs into outputs, achieving cost leadership or goods/services differentiation, managing global supply chains, and overcoming resistance to change.",
            resources: {
                videos: [
                    { title: "The Architecture of Advantage", src: "assets/videos/operations_architecture_of_advantage.mp4", tag: "Role & Strategy" },
                    { title: "The Fast Food Masterclass (McDonald's)", src: "assets/videos/operations_mcdonalds_masterclass.mp4", tag: "Case Study" }
                ],
                infographics: [
                    { title: "Operations Role: The Engine of Business Success", src: "assets/infographics/operations_role.png", section: "Role" },
                    { title: "Operations Under Pressure: 7 External Influences", src: "assets/infographics/operations_influences.png", section: "Influences" },
                    { title: "The Operations Blueprint: Mastering the IPO Model", src: "assets/infographics/operations_processes.png", section: "Processes" },
                    { title: "Strategic Operations Blueprint for Competitive Advantage", src: "assets/infographics/operations_strategies.png", section: "Strategies" }
                ],
                docs: [
                    { title: "Operating Under Pressure: 7 Influences & McDonald's Deck (PDF)", src: "assets/docs/Operations_Influences_McDonalds_Deck.pdf" },
                    { title: "HSC Business Studies Operations Study Guide (PDF)", src: "assets/docs/HSC_Business_Studies_Operations_Guide.pdf" },
                    { title: "Full HSC Revision Workbook (PDF)", src: "assets/docs/HSC_Business_Studies_Revision_Workbook.pdf" }
                ]
            },
            sections: [
                {
                    id: "ops-role",
                    code: "R",
                    title: "1. Role of Operations Management",
                    subtitle: "Strategic direction, cost leadership, differentiation & interdependence",
                    infographic: "assets/infographics/operations_role.png",
                    video: "assets/videos/operations_architecture_of_advantage.mp4",
                    dotPoints: [
                        {
                            id: "ops_r_1",
                            code: "1.1",
                            title: "Strategic role of operations management — cost leadership, good/service differentiation",
                            subPoints: [
                                "Define 'strategic' (long-term 3–5+ year goal alignment affecting all key business functions)",
                                "Cost leadership: aiming to have the lowest costs or be the most price-competitive in the market (economies of scale, bulk buying, standardisation)",
                                "Good/service differentiation: distinguishing products (features, quality, augmented features) or services (time, expertise, customisation, self-service)"
                            ],
                            theoryPrompt: "Define the strategic role of operations. Contrast Cost Leadership (economies of scale, reducing per-unit input/transformation costs) with Goods/Services Differentiation.",
                            casePrompt: "Explain how McDonald's achieves Cost Leadership (bulk global procurement, standardized kitchen layout, $1-$2 Loose Change Menu) AND Differentiation (Create Your Taste / McCafé barista quality / MyMacca's app customisation).",
                            keyTerms: ["strategic role", "cost leadership", "economies of scale", "differentiation", "profit maximisation"],
                            exemplarChip: "McDonald's: Standardized 'Made for You' kitchens cut food waste by 15% (Cost Leadership), while McCafé & AI drive-thru personalisation differentiate service."
                        },
                        {
                            id: "ops_r_2",
                            code: "1.2",
                            title: "Goods and/or services in different industries",
                            subPoints: [
                                "Standardised goods (mass-produced, uniform quality, assembly line) vs Customised goods (varied according to customer needs)",
                                "Perishable goods (high quality/safety, short lead times, cold-chain storage) vs Non-perishable goods (durable, inventory management)",
                                "Intermediate goods (processed more than once, become inputs for further processing)",
                                "Services: standardised vs customised (e.g. fast-food counter service vs bespoke accounting/legal advice)"
                            ],
                            theoryPrompt: "Compare operational requirements for standardised vs customised goods, perishable vs non-perishable goods, intermediate goods, and services.",
                            casePrompt: "How does McDonald's manage perishable goods (strict cold-chain logistics at 1–4°C, short shelf life for beef patties/produce) alongside standardized fast-food service?",
                            keyTerms: ["standardised", "customised", "perishable", "non-perishable", "intermediate goods", "cold-chain"],
                            exemplarChip: "McDonald's: Combines perishable food handling (strict HACCP temperature controls) with mass-customised ordering ('Made for You' grilling to order)."
                        },
                        {
                            id: "ops_r_3",
                            code: "1.3",
                            title: "Interdependence with other key business functions",
                            subPoints: [
                                "Operations ↔ Marketing: Marketing researches customer wants; Operations designs/produces within cost & capacity constraints",
                                "Operations ↔ Finance: Finance budgets capital for machinery/tech & monitors cost minimization; Operations generates revenue via quality output",
                                "Operations ↔ Human Resources: HR recruits, trains, and rosters staff with skills required for new operational technologies"
                            ],
                            theoryPrompt: "Explain mutual dependence (synergy) between Operations and Marketing, Finance, and Human Resources. Give a specific operational trigger and how all 3 other functions respond.",
                            casePrompt: "When McDonald's rolled out Digital Self-Order Kiosks & McCafé: Finance funded the $150k+ store upgrades, Marketing promoted convenience, and HR retrained crew members as Guest Experience Leaders.",
                            keyTerms: ["interdependence", "synergy", "cross-functional", "resource allocation", "strategic alignment"],
                            exemplarChip: "McDonald's All-Day Breakfast launch required Operations (new dual-temp grills), Finance (equipment capex), HR (crew cross-training), and Marketing (national campaign)."
                        }
                    ]
                },
                {
                    id: "ops-influences",
                    code: "I",
                    title: "2. Influences on Operations Management",
                    subtitle: "7 External forces + Corporate Social Responsibility (Legal vs Ethical)",
                    infographic: "assets/infographics/operations_influences.png",
                    pdf: "assets/docs/Operations_Influences_McDonalds_Deck.pdf",
                    dotPoints: [
                        {
                            id: "ops_i_1",
                            code: "2.1",
                            title: "Globalisation, technology, quality expectations, cost-based competition, government policies, legal regulation, environmental sustainability",
                            subPoints: [
                                "Globalisation: removing trade barriers, global web of supply chains, economies of scale vs geopolitical risk",
                                "Technology: CAD/CAM, robotics, AI ordering systems, automation reducing labour costs & error rates",
                                "Quality expectations: durability, reliability, fit for purpose (goods); professionalism, competence, cleanliness (services)",
                                "Cost-based competition: fixed vs variable cost reduction when prices cannot easily be raised (e.g. tight 5-cent profit margins)",
                                "Government policies: subsidies, taxation, interest rates, free trade agreements, carbon policies",
                                "Legal regulation (compliance costs): WHS Act 2011, Fair Work Act, Food Act / mandatory kilojoule labelling, environmental laws",
                                "Environmental sustainability: precautionary principle, renewable energy, circular packaging, carbon footprint reduction"
                            ],
                            theoryPrompt: "Break down all 7 external influences on operations. Explain how each influence forces operations managers to adapt transformation processes and cost structures.",
                            casePrompt: "Use the McDonald's 'Operating Under Pressure' case facts: (1) Globalisation: 2022 exit from Russia (~850 restaurants, $1.2B write-off); (2) Tech: $300M Dynamic Yield AI drive-thru acquisition; (3) Gov/Legal: WHS compliance, mandatory calorie display laws, $30M wage subsidies; (4) Sustainability: 100% renewable/recycled fibre packaging target by 2025.",
                            keyTerms: ["global web", "compliance costs", "fixed vs variable costs", "Dynamic Yield AI", "WHS Act 2011", "ecological sustainability"],
                            exemplarChip: "McDonald's Russia exit (2022) cost ~$1.2B due to geopolitical supply chain exposure; Dynamic Yield AI kiosks boosted average order value via weather-based upselling."
                        },
                        {
                            id: "ops_i_2",
                            code: "2.2",
                            title: "Corporate social responsibility (CSR) — legal compliance vs ethical responsibility; environmental sustainability & social responsibility",
                            subPoints: [
                                "Difference between legal compliance (minimum prescribed by law; penalties for breach) and ethical responsibility (going beyond the law based on moral 'triple bottom line' principles)",
                                "Outsourcing compliance: onshore vs offshore outsourcing (using ILO labour standards vs exploiting weaker foreign labor/environmental laws)",
                                "Environmental sustainability & social responsibility: community investment, ethical sourcing, waste minimization"
                            ],
                            theoryPrompt: "Distinguish between Legal Compliance (statutory minimum + compliance costs) and Ethical Responsibility (voluntary moral commitment / Triple Bottom Line: People, Planet, Profit).",
                            casePrompt: "Contrast McDonald's legal compliance (Australia's Food Standards Code, Fair Work minimum award wages) with its voluntary CSR initiatives (RSPO-certified sustainable palm oil, Rainforest Alliance coffee, Ronald McDonald House Charities, phasing out single-use plastics).",
                            keyTerms: ["corporate social responsibility", "triple bottom line", "legal compliance", "ethical responsibility", "ILO standards"],
                            exemplarChip: "McDonald's sources 100% Rainforest Alliance certified espresso beans for McCafé and recycles used cooking oil into biodiesel for delivery trucks."
                        }
                    ]
                },
                {
                    id: "ops-processes",
                    code: "P",
                    title: "3. Operations Processes (The IPO Model)",
                    subtitle: "Inputs, Transformation (4Vs, Sequencing/Scheduling, Tech, Monitoring) & Outputs",
                    infographic: "assets/infographics/operations_processes.png",
                    video: "assets/videos/operations_mcdonalds_masterclass.mp4",
                    dotPoints: [
                        {
                            id: "ops_p_1",
                            code: "3.1",
                            title: "Inputs — transformed resources (materials, information, customers) & transforming resources (human resources, facilities)",
                            subPoints: [
                                "Transformed resources (inputs changed or converted): Materials (raw & intermediate), Information (internal KPIs, external market data), Customers (needs/choices shape output)",
                                "Transforming resources (carry out the transformation): Human resources (staff skill & productivity) and Facilities (plant, kitchen layout, machinery)"
                            ],
                            theoryPrompt: "Distinguish between Transformed Resources (Materials, Information, Customers) and Transforming Resources (Human Resources, Facilities) with clear operational examples.",
                            casePrompt: "Identify McDonald's inputs: Transformed = 100% Aussie beef patties, lettuce, POS sales data, customer custom orders; Transforming = 115,000+ Australian crew members, 'Made for You' kitchen grills, dual-lane drive-thru facilities.",
                            keyTerms: ["transformed resources", "transforming resources", "intermediate materials", "facilities", "value adding"],
                            exemplarChip: "In a single year, McDonald's Australia transforms >380 million beef patties, 86 million kilos of potatoes, and real-time POS order data using 115,000+ crew."
                        },
                        {
                            id: "ops_p_2",
                            code: "3.2",
                            title: "Transformation processes — the 4Vs (volume, variety, variation in demand, visibility)",
                            subPoints: [
                                "Volume: how much of a product is made (high volume = standardisation & low unit costs; low volume = customisation)",
                                "Variety: mix flexibility / range of products offered (high variety = complex operations; low variety = assembly-line efficiency)",
                                "Variation in demand: seasonal/time-of-day spikes requiring flexible staffing & inventory forecasting",
                                "Visibility (customer contact): how much of the process is witnessed by the customer (front-office service vs back-office production)"
                            ],
                            theoryPrompt: "Explain how each of the 4Vs (Volume, Variety, Variation in Demand, Visibility) shapes an operations system's layout, lead times, and unit costs.",
                            casePrompt: "Apply the 4Vs to McDonald's: High Volume (~2 million Aussie customers daily), Moderate Variety (core menu + Loose Change + McCafé), High Variation in Demand (lunch/dinner peaks & summer soft-serve spikes), Moderate Visibility (open assembly counter + MyMacca's order tracker).",
                            keyTerms: ["volume", "variety", "variation in demand", "visibility", "lead time", "mixed model production"],
                            exemplarChip: "McDonald's manages high variation in demand (12pm–2pm & 6pm–8pm peaks) using predictive roster software and holding cabinets that keep cooked proteins for up to 15 mins."
                        },
                        {
                            id: "ops_p_3",
                            code: "3.3",
                            title: "Sequencing and scheduling — Gantt charts, Critical Path Analysis (CPA)",
                            subPoints: [
                                "Sequencing: the order in which activities in the operations process occur",
                                "Scheduling: the length of time activities take within the operations process",
                                "Gantt charts: bar chart showing scheduled and completed work over a timeline (easy to monitor progress & overlapping tasks)",
                                "Critical Path Analysis (CPA): network diagram showing what tasks need to be done, how long they take, and the 'critical path' (LONGEST path through the network = minimum time needed to complete the whole project with zero float/slack)"
                            ],
                            theoryPrompt: "Distinguish between sequencing and scheduling. Explain the purpose of Gantt charts and why the Critical Path in CPA is always the LONGEST path (in time) required to complete all interdependent tasks.",
                            casePrompt: "Explain how McDonald's uses CPA when constructing a new store (4-month build) AND micro-scheduling inside the kitchen (assembling a Big Mac in under 50 seconds; target drive-thru service time under 180 seconds).",
                            keyTerms: ["sequencing", "scheduling", "Gantt chart", "Critical Path Analysis", "longest path", "simultaneous tasks"],
                            exemplarChip: "HSC Trap Alert: In CPA, the Critical Path is the LONGEST path (e.g. 22 days), because every dependent task must finish before the final output is complete!"
                        },
                        {
                            id: "ops_p_4",
                            code: "3.4",
                            title: "Technology, task design and process layout",
                            subPoints: [
                                "Technology: office/service tech (POS, Kiosks, cloud) vs manufacturing tech (robotics, CAD, CAM, FMS)",
                                "Task design: classifying job activities to make it easy for an employee to successfully perform and complete the task (skills audit → job analysis)",
                                "Process layout: arrangement of machines/equipment (Process/functional layout, Product/assembly line layout, Fixed-position layout, Office layout)"
                            ],
                            theoryPrompt: "Explain how technology, task design, and plant/process layout work together to eliminate bottlenecks and improve worker productivity.",
                            casePrompt: "How did McDonald's 'Made for You' kitchen redesign use task design (breaking burger assembly into toaster, dresser, grill stations) and product layout (parallel assembly lines) to cut assembly time from 95s to 35s?",
                            keyTerms: ["CAD/CAM", "task design", "skills audit", "product layout", "process layout", "fixed-position layout"],
                            exemplarChip: "McDonald's 'Made for You' kitchen uses a twin-sided product layout where buns toast in 11 seconds while condiments are applied simultaneously."
                        },
                        {
                            id: "ops_p_5",
                            code: "3.5",
                            title: "Monitoring, control and improvement",
                            subPoints: [
                                "Monitoring: measuring actual performance against planned KPIs (lead times, defect rates, inventory turnover, IT/maintenance costs)",
                                "Control: assessing KPIs against predetermined targets and taking corrective action when discrepancies occur",
                                "Improvement: systematic reduction of inefficiencies, wastage, poor work processes, and bottlenecks (Kaizen / continuous improvement)"
                            ],
                            theoryPrompt: "Define Monitoring, Control, and Improvement. List at least 4 operational KPIs used to measure transformation performance.",
                            casePrompt: "How does McDonald's monitor and control operations? Real-time overhead kitchen screens track OEPE (Order End-to-Present End) times in seconds; if drive-thru exceeds 120s, managers reallocate crew to bottleneck stations.",
                            keyTerms: ["monitoring", "Key Performance Indicators", "control", "corrective action", "bottlenecks", "continuous improvement"],
                            exemplarChip: "McDonald's tracks Drive-Thru OEPE (Order-End to Present-End) in real time on kitchen monitors, flagging red if wait times exceed target thresholds."
                        },
                        {
                            id: "ops_p_6",
                            code: "3.6",
                            title: "Outputs — customer service and warranties",
                            subPoints: [
                                "Outputs: the final good or service delivered to the customer, plus intangible outputs",
                                "Customer service: how well a business meets and exceeds the expectations of customers in all aspects of its operations (drives repeat business & market share)",
                                "Warranties: a promise made by a business to correct any defects in the goods it produces or in the services it delivers (measuring warranty claims reveals operational quality flaws)"
                            ],
                            theoryPrompt: "Explain why Customer Service and Warranties are classified as vital operational outputs, and how tracking warranty/refund claims drives operational improvement.",
                            casePrompt: "How does McDonald's use its '100% Satisfaction Guarantee' (instant meal replacement if an order is cold or inaccurate) and MyMacca's app feedback scores to fix kitchen errors?",
                            keyTerms: ["tangible outputs", "customer service", "warranties", "Australian Consumer Law", "defect rate"],
                            exemplarChip: "Apple's 1-year hardware warranty + ACL consumer guarantees provide defect data directly back to Foxconn engineers; McDonald's replaces inaccurate orders on the spot."
                        }
                    ]
                },
                {
                    id: "ops-strategies",
                    code: "S",
                    title: "4. Operations Strategies",
                    subtitle: "Performance Objectives, New Product Design, Supply Chain, Outsourcing, Tech, Inventory, Quality & Change",
                    infographic: "assets/infographics/operations_strategies.png",
                    video: "assets/videos/operations_architecture_of_advantage.mp4",
                    dotPoints: [
                        {
                            id: "ops_s_1",
                            code: "4.1",
                            title: "Performance objectives — quality, speed, dependability, flexibility, customisation, cost",
                            subPoints: [
                                "Quality: design, conformance to specifications, and service quality",
                                "Speed: time it takes for production and operations processes to respond to changes in market demand (reduced wait/lead times)",
                                "Dependability: how consistent and reliable a business's products or services are",
                                "Flexibility: how quickly operations processes can adjust to changes in the market",
                                "Customisation: creation of individualised products to meet specific customer needs (mass customisation)",
                                "Cost: minimisation of expenses so that operations processes are conducted as cheaply as possible"
                            ],
                            theoryPrompt: "Define all 6 Performance Objectives (Quality, Speed, Dependability, Flexibility, Customisation, Cost) and explain how focusing on one can create a domino effect on the others.",
                            casePrompt: "Show how McDonald's balances all 6 objectives: Quality (HACCP food safety), Speed (60-second counter goal), Dependability (identical Big Mac taste in 100+ countries), Flexibility (seasonal McRib/Cadbury Creme Egg McFlurry), Customisation (' grill order' +/- ingredients), Cost (supply chain scale).",
                            keyTerms: ["quality of conformance", "speed", "dependability", "flexibility", "mass customisation", "cost minimisation"],
                            exemplarChip: "McDonald's 'Made for You' system achieved Mass Customisation (removing pickles/adding bacon on demand) without sacrificing Speed or Cost."
                        },
                        {
                            id: "ops_s_2",
                            code: "4.2",
                            title: "New product or service design and development",
                            subPoints: [
                                "Consumer preference approach (market research driven) vs Changes and innovations in technology approach (R&D driven, e.g. Apple)",
                                "Important considerations in design: quality, supply chain management, capacity management, and cost",
                                "Service design: explicit service (tangible application of time, expertise, skill) vs implicit service (psychological feeling of being looked after)"
                            ],
                            theoryPrompt: "Contrast the consumer-preference approach with the technology-innovation approach to new product design. Explain explicit vs implicit service design.",
                            casePrompt: "Compare McDonald's consumer-driven menu development (introducing McPlant, McCrispy, and healthier salads in response to wellness trends) with Apple's technology-driven R&D (Apple Silicon M-series chips, Vision Pro).",
                            keyTerms: ["consumer preferences", "explicit service", "implicit service", "capacity management", "utility"],
                            exemplarChip: "McDonald's tests new menu items in its Romeoville Innovation Center (Illinois) to verify kitchen capacity and supply chain scalability before global launch."
                        },
                        {
                            id: "ops_s_3",
                            code: "4.3",
                            title: "Supply chain management — logistics, e-commerce, global sourcing",
                            subPoints: [
                                "Logistics: distribution, transportation modes, storage, warehousing, distribution centres, materials handling and packaging",
                                "E-commerce: B2B (e-procurement, EDI automatic stock reordering) and B2C (online ordering, delivery partnerships)",
                                "Global sourcing: purchasing supplies/services without being constrained by location (cost, expertise, access to resources vs exchange rate & lead time risks)"
                            ],
                            theoryPrompt: "Define Supply Chain Management (SCM) and explain how Logistics, E-commerce (B2B/B2C), and Global Sourcing streamline transformation.",
                            casePrompt: "Explain McDonald's 'Three-Legged Stool' supply chain (Suppliers, Franchisees, Company) and exclusive logistics partner Martin-Brower, which uses EDI e-procurement to automatically replenish restaurant stock before run-outs.",
                            keyTerms: ["logistics", "distribution hubs", "e-procurement", "B2B / B2C", "global sourcing", "Martin-Brower"],
                            exemplarChip: "McDonald's partners with Martin-Brower for temperature-controlled logistics and uses B2C e-commerce via MyMacca's app & McDelivery (UberEats/DoorDash)."
                        },
                        {
                            id: "ops_s_4",
                            code: "4.4",
                            title: "Outsourcing — advantages and disadvantages",
                            subPoints: [
                                "Outsourcing (Business Process Outsourcing - BPO): using external specialist providers to perform non-core or production activities",
                                "Advantages: simplification, efficiency & cost savings, increased process capability, access to skills/tech lacking internally, strategic focus on core competencies",
                                "Disadvantages: payback periods & cost, communication/language barriers, loss of control over quality/security, hierarchies, organisational change & CSR/reputational risks"
                            ],
                            theoryPrompt: "Evaluate the advantages and disadvantages of outsourcing operations functions domestically and offshore.",
                            casePrompt: "Evaluate why McDonald's outsources 100% of its agricultural production, food processing (OSI Group for beef, McCain for fries), and logistics (Martin-Brower), while keeping brand standards and kitchen design in-house. Mention the 2014 Shanghai Husi food safety scandal as a loss-of-control risk!",
                            keyTerms: ["outsourcing", "core competencies", "economies of scale", "loss of control", "payback period", "reputational risk"],
                            exemplarChip: "Case Warning: In 2014, outsourced supplier Shanghai Husi was caught supplying expired meat to McDonald's China, causing a 7.3% drop in Asia-Pacific sales (loss of quality control)."
                        },
                        {
                            id: "ops_s_5",
                            code: "4.5",
                            title: "Technology — leading edge, established",
                            subPoints: [
                                "Leading edge (bleeding edge) technology: most advanced/innovative technology currently available — creates competitive advantage & speed, but carries high R&D cost, bugs, and staff training risks",
                                "Established technology: technology that has been developed, widely used, and proven — reliable, lower cost, known productivity (e.g. EFTPOS, barcode scanning, CAD, EDI)"
                            ],
                            theoryPrompt: "Distinguish between Leading Edge and Established technology in operations, evaluating the risk-return trade-off of each.",
                            casePrompt: "Contrast McDonald's Leading Edge technology (AI-powered automated voice drive-thrus with IBM/Google Cloud, Dynamic Yield predictive menu boards, robotic fryers in Texas test stores) with Established technology (EFTPOS terminals, POS registers, clamshell grills).",
                            keyTerms: ["leading edge technology", "established technology", "competitive advantage", "EDI", "automation"],
                            exemplarChip: "McDonald's clamshell grills (cooking both sides of a patty at once in 42 seconds) are Established tech; AI voice-recognition drive-thrus are Leading Edge."
                        },
                        {
                            id: "ops_s_6",
                            code: "4.6",
                            title: "Inventory management — advantages & disadvantages of holding stock, LIFO, FIFO, JIT",
                            subPoints: [
                                "Holding stock: Pros (meets consumer demand, reduces lead times, bulk-buying discounts) vs Cons (storage/spoilage/insurance costs, tied-up working capital, obsolescence)",
                                "LIFO (Last-In-First-Out): last stock purchased is sold first; used for non-perishables; in inflation, overstates COGS and understates gross profit (tax advantage)",
                                "FIFO (First-In-First-Out): oldest stock sold first; essential for perishable goods to prevent spoilage; understates COGS and overstates closing stock/profit during inflation",
                                "JIT (Just-In-Time): lean inventory approach where exact amounts of stock arrive only as needed in the operations process (minimises holding costs, requires ultra-reliable supply chain)"
                            ],
                            theoryPrompt: "Evaluate the pros and cons of holding stock. Compare LIFO, FIFO (including both physical flow and accounting valuation impacts on COGS/profit), and JIT.",
                            casePrompt: "Explain how McDonald's combines physical FIFO (strict 'first-in, first-out' rotation of milk, buns, and beef patties to eliminate spoilage) with a JIT kitchen assembly system ('Made for You' cooks burgers only when ordered on POS).",
                            keyTerms: ["holding stock", "obsolescence", "LIFO", "FIFO", "Just-In-Time (JIT)", "COGS valuation"],
                            exemplarChip: "McDonald's uses FIFO in coolrooms for perishable ingredients, and JIT at the assembly line so burgers aren't sitting under heat lamps."
                        },
                        {
                            id: "ops_s_7",
                            code: "4.7",
                            title: "Quality management — control, assurance, improvement (TQM)",
                            subPoints: [
                                "Quality Control (QC): reactive inspection at stages of production using sampling and benchmarks to catch defective outputs",
                                "Quality Assurance (QA): proactive system of procedures/standards (e.g. ISO 9001, HACCP) designed to prevent defects from occurring in the first place",
                                "Quality Improvement: Continuous Improvement (Kaizen — incremental ongoing refinements) and Total Quality Management (TQM — holistic, whole-business commitment where every employee owns quality)"
                            ],
                            theoryPrompt: "Distinguish between Quality Control (reactive inspection), Quality Assurance (proactive standards/ISO), and Quality Improvement (Kaizen & TQM).",
                            casePrompt: "How does McDonald's apply all three? QA = mandatory HACCP food safety certification for all suppliers; QC = digital temperature probes checking beef patties reach 71°C internally; TQM = continuous crew feedback & mystery shopper audits.",
                            keyTerms: ["quality control", "quality assurance", "ISO 9001", "HACCP", "continuous improvement (Kaizen)", "Total Quality Management (TQM)"],
                            exemplarChip: "McDonald's suppliers must pass SQMS (Supplier Quality Management System) & HACCP audits (QA), while crew probe beef patties every run to ensure ≥71°C (QC)."
                        },
                        {
                            id: "ops_s_8",
                            code: "4.8",
                            title: "Overcoming resistance to change & Global factors",
                            subPoints: [
                                "Financial costs of change: purchasing new equipment, redundancy payouts, retraining staff, reorganising plant layout",
                                "Psychological/human resistance: inertia (fear of the unknown, deskilling, job loss) — overcome via Kurt Lewin's Unfreeze-Change-Refreeze model and change agents",
                                "Global factors (strategies): Global sourcing, Economies of scale, Scanning and learning (Kaizen), Research and development (R&D)"
                            ],
                            theoryPrompt: "Categorise resistance to change into Financial Costs (equipment, redundancies, retraining, layout) and Psychological Inertia. Then explain the 4 Global Operations Strategies.",
                            casePrompt: "When McDonald's introduced Self-Order Kiosks and 'Experience of the Future' stores ($1B+ global refit): analyze the equipment & layout costs, crew retraining, overcoming franchisee inertia, and global scanning & learning (piloting McCafé in Melbourne 1993 before expanding to 4,000+ stores globally!).",
                            keyTerms: ["redundancy", "retraining", "plant layout", "inertia", "change agent", "scanning and learning", "economies of scale"],
                            exemplarChip: "Scanning & Learning: McCafé was invented by a Melbourne franchisee in 1993; McDonald's HQ scanned the success and scaled it globally, boosting store sales by 15%."
                        }
                    ]
                }
            ]
        },

        marketing: {
            id: "marketing",
            name: "Marketing",
            code: "TOPIC 2",
            weight: "25% of HSC",
            icon: "📣",
            accent: "#2563eb",
            tagline: "Customer Value, Market Research, Buyer Behaviour & The Extended 7Ps",
            summary: "Marketing connects customer needs to revenue generation through situational analysis, market research, segmentation, consumer laws (ACL), and the 7Ps marketing mix.",
            resources: {
                videos: [
                    { title: "The Marketing Process Masterclass (6-Step Framework)", src: "assets/videos/marketing_process_masterclass.mp4", tag: "Processes" }
                ],
                infographics: [
                    { title: "Navigating Marketing Influences & Ethics (ACL, Psychological, Sugging)", src: "assets/infographics/marketing_influences.png", section: "Influences" },
                    { title: "Mastering the Marketing Process (6 Steps)", src: "assets/infographics/marketing_processes.png", section: "Processes" },
                    { title: "HSC Marketing Process: Strategic Framework for Success", src: "assets/infographics/marketing_processes_framework.png", section: "Processes" },
                    { title: "Mastering Marketing Strategy: The Blueprint for Growth (7Ps)", src: "assets/infographics/marketing_strategies.png", section: "Strategies" }
                ],
                docs: [
                    { title: "Full HSC Revision Workbook (PDF)", src: "assets/docs/HSC_Business_Studies_Revision_Workbook.pdf" }
                ]
            },
            sections: [
                {
                    id: "mkt-role",
                    code: "R",
                    title: "1. Role of Marketing",
                    subtitle: "Strategic role, interdependence, production/selling/marketing approaches & types of markets",
                    dotPoints: [
                        {
                            id: "mkt_r_1",
                            code: "1.1",
                            title: "Strategic role of marketing goods and services & Interdependence",
                            subPoints: [
                                "Strategic role: translating the overarching goal of profit maximisation into a customer-focused marketing plan that builds brand awareness, customer loyalty, and market share",
                                "Interdependence: Marketing researches demand → Operations manufactures to spec → Finance funds campaigns/sets budgets → HR hires/trains customer-facing & sales staff"
                            ],
                            theoryPrompt: "Define the strategic role of marketing (achieving profit maximisation via customer satisfaction & market share) and its interdependence with Operations, Finance, and HR.",
                            casePrompt: "How does McDonald's marketing ('I'm Lovin' It', Monopoly promotion, MyMacca's loyalty rewards) drive revenue maximisation, and how does it depend on Operations (supplying promotional items) and Finance (promotional ROI)?",
                            keyTerms: ["profit maximisation", "brand awareness", "customer loyalty", "market share", "marketing plan"],
                            exemplarChip: "McDonald's annual Monopoly promotion boosts Australian sales by ~5–8%, requiring tight coordination with Operations to print/distribute millions of game pieces."
                        },
                        {
                            id: "mkt_r_2",
                            code: "1.2",
                            title: "Production, selling, marketing approaches",
                            subPoints: [
                                "Production approach (1820s–1920s): 'If we make it, they will buy it' — focus on mass production and output quality",
                                "Selling approach (1920s–1960s): focus on persuasive sales reps and advertising to offload surplus inventory",
                                "Marketing approach Stage 1 (1960s–1980s): customer-oriented — researching discretionary consumer needs before producing",
                                "Marketing approach Stage 2 (1980s–present): corporate social responsibility (CSR), customer orientation, and relationship marketing (long-term repeat loyalty)"
                            ],
                            theoryPrompt: "Trace the evolution from the Production Approach to the Selling Approach and Marketing Approach (Stages 1 & 2, including Relationship Marketing & CSR).",
                            casePrompt: "Explain how McDonald's evolved from a 1950s Production/Selling approach (standardized 15-cent assembly-line burgers) to Marketing Approach Stage 2 (MyMacca's loyalty app with 10M+ active users & CSR health/packaging shifts).",
                            keyTerms: ["production approach", "selling approach", "customer orientation", "relationship marketing", "discretionary income"],
                            exemplarChip: "Relationship Marketing: MyMacca's Rewards gives 100 points per $1 spent, driving repeat purchase frequency and personalized push notifications."
                        },
                        {
                            id: "mkt_r_3",
                            code: "1.3",
                            title: "Types of markets — resource, industrial, intermediate, consumer, mass, niche",
                            subPoints: [
                                "Resource market: primary producers (agriculture, mining, forestry, fishing)",
                                "Industrial market: businesses buying inputs to produce other goods/services",
                                "Intermediate market: wholesalers and retailers who resell finished products",
                                "Consumer market: individuals/households buying for personal consumption — split into Mass Markets (broad appeal, minimal segmentation) and Niche Markets (narrowly selected micro-market)"
                            ],
                            theoryPrompt: "Define and distinguish between Resource, Industrial, Intermediate, Consumer, Mass, and Niche markets with concrete examples.",
                            casePrompt: "Classify McDonald's across market types: buys from Resource/Industrial markets (Australian cattle farmers, McCain potato processors) and sells in the Consumer Mass Market (core burger menu) while targeting Niche segments (McCafé gluten-free/plant-based buyers).",
                            keyTerms: ["resource market", "industrial market", "intermediate market", "consumer market", "mass market", "niche market"],
                            exemplarChip: "McDonald's operates primarily in the Consumer Mass Market, but created McCafé to capture the specialty espresso segment."
                        }
                    ]
                },
                {
                    id: "mkt-influences",
                    code: "I",
                    title: "2. Influences on Marketing",
                    subtitle: "Factors influencing customer choice (PEGS), Consumer Laws (ACL) & Ethical Influences",
                    infographic: "assets/infographics/marketing_influences.png",
                    dotPoints: [
                        {
                            id: "mkt_i_1",
                            code: "2.1",
                            title: "Factors influencing customer choice — psychological, sociocultural, economic, government (PEGS)",
                            subPoints: [
                                "Psychological: perception, motives, attitudes, personality & self-image, learning",
                                "Sociocultural: social class (socioeconomic status), culture & subculture, family and roles, reference (peer) groups",
                                "Economic: boom vs recession phases of the business cycle affecting consumer confidence and discretionary spending",
                                "Government: fiscal/monetary policies, age restrictions, taxes, and regulatory interventions (e.g. 'Cash for Clunkers' or sugar/health regulations)"
                            ],
                            theoryPrompt: "Use the PEGS acronym (Psychological, Economic, Government, Sociocultural) to explain what drives consumer buying behaviour.",
                            casePrompt: "How do PEGS influences affect McDonald's? Psychological = 'Health Halo' perception of salads/wraps; Sociocultural = busy dual-income families & wellness trends; Economic = during inflation/cost-of-living squeezes, consumers trade down to McDonald's Loose Change Menu.",
                            keyTerms: ["psychological factors", "perception", "sociocultural", "reference groups", "boom vs recession", "discretionary income"],
                            exemplarChip: "Counter-Cyclical Resilience: During economic downturns/high inflation, McDonald's sales often rise as diners trade down from casual restaurants to value meals."
                        },
                        {
                            id: "mkt_i_2",
                            code: "2.2",
                            title: "Consumer laws — deceptive and misleading advertising, price discrimination, implied conditions, warranties",
                            subPoints: [
                                "Competition and Consumer Act 2010 (Cth) & Australian Consumer Law (ACL) enforced by the ACCC",
                                "Deceptive and misleading advertising: bait and switch, fine print,dishonest country of origin, exaggerated greenwashing/health claims",
                                "Price discrimination: charging different prices for identical products in separate markets (unlawful if it substantially lessens competition)",
                                "Implied conditions (consumer guarantees): acceptable quality, fit for purpose, matches description/sample",
                                "Warranties: legal obligation to offer a refund, repair, or replacement if a product breaches ACL consumer guarantees (regardless of store 'No Refunds' signs)"
                            ],
                            theoryPrompt: "Explain the 4 key areas of the Competition and Consumer Act 2010 (ACL): deceptive advertising, price discrimination, implied conditions, and warranties.",
                            casePrompt: "Analyze ACL compliance in fast food/retail: McDonald's must ensure promotional burger photos and '100% Aussie Beef' claims are accurate under ACL, and display mandatory kilojoule counts under state food laws.",
                            keyTerms: ["Competition and Consumer Act 2010", "Australian Consumer Law (ACL)", "ACCC", "bait and switch", "implied conditions", "acceptable quality"],
                            exemplarChip: "ACCC Enforcement: Businesses face fines up to $50 million (or 30% of adjusted turnover) for deceptive advertising or breaching ACL consumer guarantees."
                        },
                        {
                            id: "mkt_i_3",
                            code: "2.3",
                            title: "Ethical influences — truth, accuracy and good taste in advertising, products that may damage health, engaging in fair competition, sugging",
                            subPoints: [
                                "Truth, accuracy and good taste: avoiding concealed facts, exaggerated puffery, vague statements, and offensive imagery (self-regulated by Ad Standards / AANA Code of Ethics)",
                                "Products that may damage health: ethical debate over marketing junk food/high-sugar products to children (pester power)",
                                "Engaging in fair competition: avoiding anti-competitive conduct (cartels, predatory pricing, misuse of market power)",
                                "Sugging: 'Selling Under the Guise of a Survey' — disguising a direct sales pitch as market research (destroys consumer trust)"
                            ],
                            theoryPrompt: "Define puffery, pester power, anti-competitive conduct, and Sugging. Explain why ethical marketing goes beyond strict ACL compliance.",
                            casePrompt: "Discuss ethical scrutiny of McDonald's marketing to children (Happy Meals & Ronald McDonald) and how McDonald's responded by adhering to the Quick Service Restaurant Initiative for Responsible Advertising to Children (featuring apple slices & water in ads).",
                            keyTerms: ["puffery", "concealed facts", "Ad Standards", "pester power", "fair competition", "sugging"],
                            exemplarChip: "McDonald's Australia pledged not to advertise unhealthy food choices directly to children under 14, promoting apple bags and water in Happy Meal ads."
                        }
                    ]
                },
                {
                    id: "mkt-processes",
                    code: "P",
                    title: "3. Marketing Processes (The 6-Step Framework)",
                    subtitle: "Situational Analysis (SWOT/PLC), Market Research, Objectives, Target Markets, Developing Strategies & Monitoring",
                    infographic: "assets/infographics/marketing_processes.png",
                    video: "assets/videos/marketing_process_masterclass.mp4",
                    dotPoints: [
                        {
                            id: "mkt_p_1",
                            code: "3.1",
                            title: "Situational analysis — SWOT, product life cycle",
                            subPoints: [
                                "SWOT Analysis: Internal (Strengths, Weaknesses — controllable) vs External (Opportunities, Threats — uncontrollable environment)",
                                "Product Life Cycle (PLC): Introduction, Growth, Maturity, Post-Maturity (Decline or Renewal) — each stage requires distinct product, price, promotion, and place adjustments"
                            ],
                            theoryPrompt: "Explain how SWOT analysis and the 4 stages of the Product Life Cycle (Introduction, Growth, Maturity, Post-Maturity/Renewal) guide marketing decisions.",
                            casePrompt: "Construct a McDonald's SWOT (Strength: #1 global fast-food brand & real estate; Weakness: fast-food health stigma; Opportunity: AI drive-thru & delivery growth; Threat: Guzman y Gomez / Hungry Jack's competition) and show how McDonald's uses Product Renewal (McCafé, Loose Change Menu, celebrity meals) to avoid Decline.",
                            keyTerms: ["situational analysis", "SWOT", "Product Life Cycle", "maturity stage", "product renewal", "market saturation"],
                            exemplarChip: "McDonald's is in the Maturity stage in Australia, using continuous Product Renewal (e.g. McCrispy, Grimace Shake, Surfer Boy promotions) to re-ignite sales."
                        },
                        {
                            id: "mkt_p_2",
                            code: "3.2",
                            title: "Market research — 3 steps (determining info needs, data collection primary/secondary, data analysis)",
                            subPoints: [
                                "Step 1: Determining information needs (defining the specific marketing problem to solve)",
                                "Step 2: Data collection — Primary data (first-hand surveys, focus groups, observation/experiments) vs Secondary data (internal sales reports, external ABS census, industry reports)",
                                "Step 3: Data analysis and interpretation (statistical tabulation, identifying trends and cross-tabulating customer segments)"
                            ],
                            theoryPrompt: "Outline the 3 steps of Market Research and compare Primary Data (surveys, focus groups, observation) with Secondary Data (internal & external sources).",
                            casePrompt: "How does McDonald's gather market research? Primary = MyMacca's app customer satisfaction surveys, sensory taste-testing focus groups; Secondary = POS receipt analytics, Roy Morgan fast-food market share data.",
                            keyTerms: ["information needs", "primary data", "secondary data", "focus groups", "statistical interpretation"],
                            exemplarChip: "Before launching Create Your Taste and McCafé extensions, McDonald's used Australian focus groups (Primary) and POS basket-size analytics (Secondary)."
                        },
                        {
                            id: "mkt_p_3",
                            code: "3.3",
                            title: "Establishing market objectives — increasing market share, expanding product mix, maximising customer service",
                            subPoints: [
                                "SMART objectives (Specific, Measurable, Achievable, Realistic, Timed)",
                                "Increasing market share: business's percentage of total industry sales (drives dominance & economies of scale)",
                                "Expanding the product mix: changing the breadth and depth of products offered to capture evolving tastes",
                                "Maximising customer service: improving pre-sale and after-sale satisfaction to drive repeat retention"
                            ],
                            theoryPrompt: "Define the 3 core Marketing Objectives (Increasing Market Share, Expanding Product Mix, Maximising Customer Service) and why they must be SMART.",
                            casePrompt: "Link McDonald's actions to all 3 objectives: (1) Market Share: holding ~45% of the Australian QSR burger market; (2) Product Mix: adding McCafé, McDelivery, and Chicken Big Mac; (3) Customer Service: table service and MyMacca's mobile ordering.",
                            keyTerms: ["SMART objectives", "market share", "product mix", "product breadth", "customer retention"],
                            exemplarChip: "McDonald's expanded its product mix into specialty coffee (McCafé) and chicken (McCrispy) to capture breakfast and evening family occasions."
                        },
                        {
                            id: "mkt_p_4",
                            code: "3.4",
                            title: "Identifying target markets — mass, market segmentation, niche; primary vs secondary",
                            subPoints: [
                                "Target market: group of present and potential customers to which a business directs its marketing",
                                "Approaches: Mass marketing approach vs Market segmentation approach vs Niche market approach",
                                "Primary target market (main revenue source & focus of promotional budget) vs Secondary target market (smaller segment offering incremental sales)"
                            ],
                            theoryPrompt: "Compare Mass, Segmented, and Niche target market approaches, and distinguish between a Primary and Secondary target market.",
                            casePrompt: "Identify McDonald's Primary vs Secondary target markets: for Happy Meals, children aged 4–10 are the primary consumer segment while parents (seeking convenience/value) are the decision-makers; for McCafé, daily commuters aged 25–54 are the primary target.",
                            keyTerms: ["target market", "mass marketing", "market segmentation", "niche market", "primary target market", "secondary target market"],
                            exemplarChip: "By segmenting its market, McDonald's targets budget-conscious students with the Loose Change Menu and white-collar commuters with McCafé."
                        },
                        {
                            id: "mkt_p_5",
                            code: "3.5",
                            title: "Developing marketing strategies & Implementation, monitoring and controlling",
                            subPoints: [
                                "Developing marketing strategies: coordinating the Marketing Mix (4Ps / 7Ps) to achieve objectives",
                                "Implementation: putting the marketing plan into action (allocating financial & human resources)",
                                "Monitoring & Controlling: comparing planned vs actual KPIs via (1) Sales Analysis, (2) Market Share Analysis, and (3) Marketing Profitability Analysis (breaking down marketing costs by product/region)",
                                "Developing a financial forecast (cost estimate vs revenue estimate) and Revising the marketing strategy"
                            ],
                            theoryPrompt: "Explain how a business uses Financial Forecasts (Cost vs Revenue estimates) and the 3 Control tools: Sales Analysis, Market Share Analysis, and Marketing Profitability Analysis.",
                            casePrompt: "Explain why McDonald's discontinued the 'Create Your Taste' gourmet burger kiosks in 2016 after Monitoring & Controlling: Marketing Profitability Analysis revealed high kitchen labour/equipment costs and slow 10-minute wait times eroded store margins.",
                            keyTerms: ["financial forecast", "sales analysis", "market share analysis", "marketing profitability analysis", "corrective action"],
                            exemplarChip: "Case Example of Revising Strategy: McDonald's axed 'Create Your Taste' in 2016 after profitability analysis showed slow service times hurt core drive-thru volume."
                        }
                    ]
                },
                {
                    id: "mkt-strategies",
                    code: "S",
                    title: "4. Marketing Strategies",
                    subtitle: "Segmentation, Differentiation/Positioning, The Extended 7Ps, E-Marketing & Global Marketing",
                    infographic: "assets/infographics/marketing_strategies.png",
                    dotPoints: [
                        {
                            id: "mkt_s_1",
                            code: "4.1",
                            title: "Market segmentation, product/service differentiation and positioning",
                            subPoints: [
                                "4 Segmentation variables: Demographic (age, gender, income, family size), Geographic (urban/rural, climate), Psychographic (lifestyle, values, personality), Behavioural (purchase occasion, usage rate, loyalty)",
                                "Product/service differentiation: price, quality, environmental sustainability, convenience, ethical consumerism",
                                "Product/service positioning: the image or perception a product holds in the minds of consumers relative to competitors"
                            ],
                            theoryPrompt: "Detail the 4 segmentation variables (Demographic, Geographic, Psychographic, Behavioural) and explain how Differentiation creates Positioning.",
                            casePrompt: "Show how McDonald's uses all 4 variables: Demographic (Happy Meals for families; Loose Change for youth), Geographic (McSpicy in Asia; KiwiBurger in NZ), Psychographic (health-conscious salads/wraps), Behavioural (breakfast commuters 6am–10:30am).",
                            keyTerms: ["demographic", "geographic", "psychographic", "behavioural segmentation", "positioning", "unique selling proposition"],
                            exemplarChip: "Behavioural Segmentation: McDonald's segments by 'time of day' (Daypart marketing) — Breakfast menu before 10:30am, Value Lunch, Family Dinner, and Late-Night McDelivery."
                        },
                        {
                            id: "mkt_s_2",
                            code: "4.2",
                            title: "Products — goods and/or services (branding, packaging)",
                            subPoints: [
                                "Total product concept: tangible physical good + intangible benefits (brand prestige, warranty, service)",
                                "Branding: brand name, symbol/logo (Golden Arches, Apple logo) — Manufacturer's/national brand vs House/private label brand vs Generic brand",
                                "Packaging: physical container/wrapping that protects the product, attracts attention, communicates brand image, and satisfies sustainability expectations"
                            ],
                            theoryPrompt: "Explain the Total Product Concept and analyze the strategic value of Branding (manufacturer vs private label) and Packaging (functional vs promotional vs sustainable).",
                            casePrompt: "Analyze McDonald's Golden Arches logo (one of the world's most recognized brand symbols) and its functional/sustainable packaging shift (colour-coded clamshell boxes for kitchen speed + transition from plastic straws/cutlery to fibre packaging).",
                            keyTerms: ["total product concept", "brand equity", "trademark", "manufacturer brand", "packaging", "sustainable packaging"],
                            exemplarChip: "McDonald's colour-coded clamshell packaging both protects burger temperature (functional) and acts as instant visual brand recognition."
                        },
                        {
                            id: "mkt_s_3",
                            code: "4.3",
                            title: "Price including pricing methods — cost, market, competition-based; pricing strategies — skimming, penetration, loss leaders, price points",
                            subPoints: [
                                "Pricing methods (how base price is calculated): Cost-based (Cost + mark-up %), Market-based (supply & demand), Competition-based (below, equal to, or above rivals)",
                                "Pricing strategies: Price skimming (high initial price for innovative tech, e.g. Apple iPhone), Price penetration (low initial price to rapidly gain market share), Loss leader (selling below cost to attract foot traffic), Price points (lining products at set tiers, e.g. $2, $4, $6)",
                                "Price and quality interaction: prestige/premium pricing signals superior quality"
                            ],
                            theoryPrompt: "Distinguish between Pricing Methods (Cost, Market, Competition-based) and Pricing Strategies (Skimming, Penetration, Loss Leader, Price Points).",
                            casePrompt: "Contrast McDonald's pricing strategies: Competition-based pricing against Hungry Jack's/KFC, Loss Leaders ($1 frozen Coke or $2 hamburger to lure customers who then buy higher-margin fries/McCafé), and Bundle Pricing (Extra Value Meals) — vs Apple's Price Skimming on iPhone Pro models.",
                            keyTerms: ["cost-based pricing", "competition-based pricing", "price skimming", "price penetration", "loss leader", "price points", "bundle pricing"],
                            exemplarChip: "McDonald's uses $1–$2 Loose Change items as Loss Leaders / Penetration tactics to drive foot traffic, then upsells high-margin fries and drinks via Bundle Pricing."
                        },
                        {
                            id: "mkt_s_4",
                            code: "4.4",
                            title: "Promotion — elements of the promotion mix & the communication process",
                            subPoints: [
                                "Promotion mix (ASPPR): Advertising (mass media, digital), Personal selling (direct representative), Relationship marketing (loyalty programs), Sales promotions (coupons, competitions, samples), Publicity and Public Relations (free media coverage, crisis management, charity)",
                                "The communication process: Opinion leaders (celebrities/influencers) and Word of mouth (organic peer recommendations, social media)"
                            ],
                            theoryPrompt: "Define all 5 elements of the Promotion Mix (Advertising, Personal Selling, Relationship Marketing, Sales Promotion, Publicity/PR) and the role of Opinion Leaders & Word of Mouth.",
                            casePrompt: "Give a McDonald's example for each: Advertising (TV/TikTok 'Raise Your Arches'), Sales Promotion (Monopoly game & 30 Days 30 Deals in November), Relationship Marketing (MyMacca's Rewards), Publicity/PR (McHappy Day raising $5M+ for Ronald McDonald House), Opinion Leaders (Travis Scott / BTS Meals).",
                            keyTerms: ["promotion mix", "sales promotion", "public relations", "relationship marketing", "opinion leaders", "word of mouth"],
                            exemplarChip: "The McDonald's BTS Celebrity Meal (Opinion Leader strategy) boosted global Q2 comparable sales by 40.5% and drove record MyMacca's app downloads."
                        },
                        {
                            id: "mkt_s_5",
                            code: "4.5",
                            title: "Place/distribution — distribution channels, channel choice (intensive, selective, exclusive), physical distribution",
                            subPoints: [
                                "Distribution channels: Producer → Consumer; Producer → Retailer → Consumer; Producer → Wholesaler → Retailer → Consumer",
                                "Channel choice (market coverage): Intensive (saturating every outlet, e.g. Coca-Cola), Selective (moderate number of outlets, e.g. mid-tier electronics), Exclusive (one outlet/franchise per territory for prestige/control)",
                                "Physical distribution issues: transport, warehousing, and inventory control"
                            ],
                            theoryPrompt: "Outline the main distribution channels, contrast Intensive, Selective, and Exclusive channel choice, and explain physical distribution issues (transport, warehousing, inventory).",
                            casePrompt: "Explain McDonald's distribution strategy: selective/exclusive franchise territory allocation across 1,025+ Australian stores, combined with omni-channel access (walk-in, Drive-Thru, MyMacca's click-and-collect, and UberEats/DoorDash McDelivery).",
                            keyTerms: ["distribution channels", "intensive distribution", "selective distribution", "exclusive distribution", "physical distribution"],
                            exemplarChip: "Partnering with UberEats, Menulog, and DoorDash expanded McDonald's distribution channel directly into consumers' homes, growing McDelivery to >$1B globally."
                        },
                        {
                            id: "mkt_s_6",
                            code: "4.6",
                            title: "People, processes and physical evidence (Extended 7Ps for Services)",
                            subPoints: [
                                "People: quality of interaction between employees and customers (training, attitude, uniform, empathy)",
                                "Processes: flow of activities that a business follows in its delivery of a service (wait times, app ordering smoothness, booking systems)",
                                "Physical evidence: the environment in which the service is delivered and tangible cues of quality (cleanliness, decor, signage, packaging)"
                            ],
                            theoryPrompt: "Explain why Services require the 3 extended Ps (People, Processes, Physical Evidence) and how each influences customer perception of service quality.",
                            casePrompt: "Apply the 3 service Ps to McDonald's: People = crew trained in friendly hospitality & Guest Experience Leaders; Processes = dual-lane drive-thru & mobile order table service; Physical Evidence = modern wooden/stone 'Experience of the Future' store interiors, clean restrooms, digital menu boards.",
                            keyTerms: ["People", "Processes", "Physical Evidence", "extended marketing mix", "tangible cues"],
                            exemplarChip: "McDonald's 'Experience of the Future' store refits upgraded Physical Evidence (modern café seating, digital kiosks) and Processes (table delivery via Bluetooth locators)."
                        },
                        {
                            id: "mkt_s_7",
                            code: "4.7",
                            title: "E-marketing & Global marketing (global branding, standardization, customization, global pricing, competitive positioning)",
                            subPoints: [
                                "E-marketing: web pages, podcasts, SMS, blogs, social media advertising, location-based mobile apps",
                                "Global branding: worldwide use of a name, term, symbol or logo (economies of scale in advertising & instant recognition)",
                                "Standardisation (identical marketing mix globally) vs Customisation / Glocalisation (tailoring product, price, or promotion to local culture/laws)",
                                "Global pricing: Customised pricing, Market-customised pricing, Standard worldwide price",
                                "Competitive positioning: how a business differentiates its value proposition in global markets"
                            ],
                            theoryPrompt: "Explain E-marketing tools and the 5 pillars of Global Marketing: Global Branding, Standardisation vs Customisation, Global Pricing, and Competitive Positioning.",
                            casePrompt: "McDonald's is the textbook 'Glocalisation' (Standardisation + Customisation) case study: Standardized Golden Arches, Big Mac, and fries globally, paired with Customized local menus (McAloo Tikki vegetarian burger in India where beef/pork are avoided, Teriyaki Burger in Japan, McOz/Angus in Australia) and Market-Customised Pricing (Big Mac Index).",
                            keyTerms: ["e-marketing", "global branding", "standardisation", "customisation (glocalisation)", "market-customised pricing", "competitive positioning"],
                            exemplarChip: "In India, McDonald's customized 100% of its menu to exclude beef and pork, creating the McAloo Tikki and Maharaja Mac and separating vegetarian/non-veg kitchens."
                        }
                    ]
                }
            ]
        },

        finance: {
            id: "finance",
            name: "Finance",
            code: "TOPIC 3",
            weight: "25% of HSC",
            icon: "📊",
            accent: "#059669",
            tagline: "Financial Objectives (PLEGS), Debt vs Equity, Ratios & Cash Flow Management",
            summary: "Finance examines how businesses source funds, interpret financial statements (Income Statement, Balance Sheet, Cash Flow), calculate financial ratios, and manage working capital and global exchange rate risks.",
            resources: {
                videos: [
                    { title: "Writing a Band 6 HSC Business Studies Section III Report", src: "assets/videos/exam_section_iii_report.mp4", tag: "Financial Report Skills" }
                ],
                infographics: [],
                docs: [
                    { title: "The Golden Arches of Finance: McDonald's HSC Case Study Guide (PDF)", src: "assets/docs/Golden_Arches_of_Finance_McDonalds_Guide.pdf" },
                    { title: "Finance Foundations & Objectives Study Guide (PDF)", src: "assets/docs/Finance_Foundations_Guide.pdf" },
                    { title: "Chapter 12: Finance Strategies Guide (PDF)", src: "assets/docs/Finance_Strategies_Guide.pdf" },
                    { title: "Full HSC Revision Workbook (PDF)", src: "assets/docs/HSC_Business_Studies_Revision_Workbook.pdf" }
                ]
            },
            sections: [
                {
                    id: "fin-role",
                    code: "R",
                    title: "1. Role of Financial Management",
                    subtitle: "Strategic role, PLEGS Objectives (Short vs Long-term) & Interdependence",
                    pdf: "assets/docs/Golden_Arches_of_Finance_McDonalds_Guide.pdf",
                    dotPoints: [
                        {
                            id: "fin_r_1",
                            code: "1.1",
                            title: "Strategic role of financial management & Interdependence",
                            subPoints: [
                                "Strategic role: planning, monitoring, and controlling the business's financial resources to ensure long-term survival, growth, and achievement of strategic goals",
                                "Interdependence: Finance allocates budgets to Operations (capex for machinery), Marketing (promotional budgets based on sales ROI), and HR (wages, training, redundancy funds)"
                            ],
                            theoryPrompt: "Define the strategic role of financial management and explain how Finance acts as the lifeblood funding Operations, Marketing, and HR.",
                            casePrompt: "From 'The Golden Arches of Finance': Explain how McDonald's high-margin franchise real estate model (collecting rent + 4–5% royalties from >93% franchised stores) generates stable cash flows to fund $2B+ annual store modernization and dividends.",
                            keyTerms: ["financial management", "capital allocation", "franchise royalties", "budgeting", "interdependence"],
                            exemplarChip: "McDonald's 'Accelerating the Arches' financial strategy leverages predictable franchise rent/royalty streams to achieve an operating margin exceeding 45%."
                        },
                        {
                            id: "fin_r_2",
                            code: "1.2",
                            title: "Objectives of financial management — profitability, growth, efficiency, liquidity, solvency (PLEGS); short-term vs long-term",
                            subPoints: [
                                "Profitability: ability to maximise profits (Revenue − Expenses)",
                                "Liquidity: ability to meet short-term financial commitments (<12 months) as they fall due (converting current assets into cash)",
                                "Efficiency: ability to minimise costs and manage assets so maximum output is achieved with minimum inputs",
                                "Growth: ability to increase size, market share, asset value, and store network over time",
                                "Solvency (Gearing): ability to meet long-term financial commitments (>12 months)",
                                "Short-term objectives (tactical 1–2 yrs: maintaining liquidity/cash flow) vs Long-term objectives (strategic 5+ yrs: growth, solvency, wealth) — and potential conflicts between them!"
                            ],
                            theoryPrompt: "Define all 5 PLEGS financial objectives (Profitability, Liquidity, Efficiency, Growth, Solvency) and explain why Short-Term objectives (Liquidity) often conflict with Long-Term objectives (Growth/Profitability).",
                            casePrompt: "Explain the conflict of objectives at McDonald's: spending $2.4B on 'Experience of the Future' store renovations and opening 2,000+ new restaurants boosts long-term Growth & Profitability, but drains short-term Liquidity and increases long-term Debt/Gearing.",
                            keyTerms: ["Profitability", "Liquidity", "Efficiency", "Growth", "Solvency", "short-term vs long-term conflict"],
                            exemplarChip: "PLEGS Conflict Exam Tip: Investing heavily in new store expansion (Growth) reduces immediate cash reserves (Liquidity) and increases debt (Solvency risk) in the short term."
                        }
                    ]
                },
                {
                    id: "fin-influences",
                    code: "I",
                    title: "2. Influences on Financial Management",
                    subtitle: "Internal & External Sources of Finance, Financial Institutions, Government (ASIC/Tax) & Global Market Influences",
                    pdf: "assets/docs/Golden_Arches_of_Finance_McDonalds_Guide.pdf",
                    dotPoints: [
                        {
                            id: "fin_i_1",
                            code: "2.1",
                            title: "Internal vs External sources of finance (Debt & Equity)",
                            subPoints: [
                                "Internal finance: Owners' equity (capital injection) and Retained profits (undistributed net profit reinvested — no interest or dilution of control)",
                                "External Debt (Short-term <12m): Bank overdraft (flexible negative balance), Commercial bills ($100k+ non-bank loans, 30–180 days), Factoring (selling accounts receivable at a discount for immediate cash)",
                                "External Debt (Long-term >12m): Mortgage (secured against property), Debentures (fixed-rate corporate bonds secured over assets), Unsecured notes (bonds with no collateral = higher interest), Leasing (paying to use equipment without buying outright)",
                                "External Equity: Ordinary shares (New issues/IPO, Rights issues, Placements, Share Purchase Plans) and Private equity"
                            ],
                            theoryPrompt: "Compare Internal Finance (Retained Profits) with External Short-Term Debt (Overdraft, Commercial Bills, Factoring), Long-Term Debt (Mortgage, Debentures, Unsecured Notes, Leasing), and External Equity.",
                            casePrompt: "Analyze McDonald's capital structure: McDonald's relies heavily on Retained Profits ($8B+ annual net income) and Long-Term Corporate Bonds/Notes (taking advantage of investment-grade credit ratings and tax-deductible interest) while buying back its own shares.",
                            keyTerms: ["retained profits", "overdraft", "commercial bills", "factoring", "debentures", "unsecured notes", "leasing", "ordinary shares"],
                            exemplarChip: "Debt vs Equity Comparison: Debt interest is tax-deductible and doesn't dilute ownership, whereas Equity does not have to be repaid and carries no mandatory interest."
                        },
                        {
                            id: "fin_i_2",
                            code: "2.2",
                            title: "Financial institutions — banks, investment banks, finance companies, superannuation funds, life insurance companies, unit trusts, ASX",
                            subPoints: [
                                "Banks: accept deposits and provide business loans/overdrafts",
                                "Investment banks: advise on mergers & acquisitions (M&A), underwrite corporate bond/share issues, arrange project finance",
                                "Finance companies & Life insurance companies: non-bank lenders providing lease finance and secured/unsecured loans",
                                "Superannuation funds & Unit trusts: institutional investors pooling trillions in retirement/investor savings to buy shares, property, and corporate bonds",
                                "Australian Securities Exchange (ASX): primary market (raising new equity capital via IPOs) and secondary market (trading existing shares)"
                            ],
                            theoryPrompt: "Summarize the role of each of the 7 financial institutions in providing debt or equity finance to businesses.",
                            casePrompt: "Explain how multinational corporations like McDonald's (NYSE: MCD) and Qantas (ASX: QAN) use Investment Banks (e.g. Morgan Stanley, Goldman Sachs) to issue multi-billion-dollar corporate bond tranches and Superannuation/Institutional funds as major shareholders.",
                            keyTerms: ["investment banks", "finance companies", "superannuation funds", "unit trusts", "ASX primary vs secondary market"],
                            exemplarChip: "ASX Primary vs Secondary Market: Primary market raises NEW capital for the company (IPOs/Placements); Secondary market trades existing shares between investors."
                        },
                        {
                            id: "fin_i_3",
                            code: "2.3",
                            title: "Influence of government (ASIC, company taxation) & Global market influences (economic outlook, availability of funds, interest rates)",
                            subPoints: [
                                "ASIC (Australian Securities and Investments Commission): enforces the Corporations Act 2001, ensuring financial disclosure honesty and preventing insider trading",
                                "Company taxation: flat 30% company tax rate in Australia (25% for base rate small businesses) paid before net profit distribution",
                                "Global economic outlook: global growth vs recession affecting consumer demand and trade",
                                "Availability of funds: ease with which a business can access international credit markets (e.g. tightened during GFC/pandemic)",
                                "Interest rates: borrowing offshore for lower rates carries foreign exchange (currency depreciation) risk"
                            ],
                            theoryPrompt: "Explain how ASIC, Company Tax, and the 3 Global Market Influences (Economic Outlook, Availability of Funds, Interest Rates) shape financial decisions.",
                            casePrompt: "How does McDonald's navigate global financial influences? Operating in 100+ countries, McDonald's issues debt in multiple currencies (USD, EUR, AUD, JPY) to match lower offshore interest rates and hedge against foreign currency fluctuations.",
                            keyTerms: ["ASIC", "Corporations Act 2001", "company taxation", "economic outlook", "availability of funds", "interest rate differential"],
                            exemplarChip: "Borrowing overseas at lower interest rates can backfire if the domestic currency depreciates, causing foreign debt repayments to balloon!"
                        }
                    ]
                },
                {
                    id: "fin-processes",
                    code: "P",
                    title: "3. Processes of Financial Management",
                    subtitle: "Planning Cycle, Debt/Equity Risks, Financial Ratios (Interactive Calculator below!), Limitations & Ethics",
                    pdf: "assets/docs/Golden_Arches_of_Finance_McDonalds_Guide.pdf",
                    dotPoints: [
                        {
                            id: "fin_p_1",
                            code: "3.1",
                            title: "Planning and implementing — financial needs, budgets, record systems, financial risks, financial controls; Debt vs Equity",
                            subPoints: [
                                "Planning cycle: Determining financial needs → Developing budgets (Operating, Project, Financial) → Maintaining record systems → Identifying financial risks → Establishing financial controls",
                                "Debt finance: increases gearing/risk, requires regular interest & principal repayments, but interest is tax-deductible and owners keep full control",
                                "Equity finance: safer (no fixed repayment or interest), lowers gearing, but dilutes ownership/voting control and dividends are not tax-deductible",
                                "Matching the terms and source of finance to the business purpose: short-term assets (inventory) funded by short-term finance (overdraft); long-term assets (property/plant) funded by long-term finance (mortgage/debentures/equity)"
                            ],
                            theoryPrompt: "Outline the 5 steps of financial planning & implementation, compare Debt vs Equity in a table, and explain the 'Matching Principle' (matching the term of finance to the economic life of the asset).",
                            casePrompt: "Apply the Matching Principle to McDonald's: restaurant food inventory (lifespan <14 days) is matched with short-term trade credit/working capital, while 20-year restaurant land & building purchases are matched with 10–30 year corporate bonds or mortgages.",
                            keyTerms: ["operating budgets", "financial controls", "debt vs equity", "tax deductibility", "dilution of ownership", "matching principle"],
                            exemplarChip: "The Matching Principle: Never buy a 20-year factory with a short-term bank overdraft, and never buy perishable lettuce with a 15-year mortgage!"
                        },
                        {
                            id: "fin_p_2",
                            code: "3.2",
                            title: "Monitoring and controlling — Cash Flow Statement, Income Statement, Balance Sheet",
                            subPoints: [
                                "Cash Flow Statement: records cash inflows and outflows over a period across Operating, Investing, and Financing activities (Opening Balance + Net Cash Flow = Closing Balance)",
                                "Income Statement (Revenue Statement): shows Operating performance over a period — COGS = Opening Stock + Purchases − Closing Stock; Gross Profit = Sales − COGS; Net Profit = Gross Profit − Expenses",
                                "Balance Sheet: snapshot of financial stability at a single point in time — Accounting Equation: Assets (Current + Non-Current) = Liabilities (Current + Non-Current) + Owners' Equity"
                            ],
                            theoryPrompt: "Write out the exact formulas for the Cash Flow Statement (Closing Cash), Income Statement (COGS, Gross Profit, Net Profit), and Balance Sheet (A = L + OE).",
                            casePrompt: "How do all 3 statements connect at McDonald's? High Gross Profit Margin on franchise royalties flows through the Income Statement into Operating Cash Inflows on the Cash Flow Statement, strengthening Cash & Retained Earnings on the Balance Sheet.",
                            keyTerms: ["Cash Flow Statement", "Operating/Investing/Financing activities", "COGS", "Gross Profit", "Net Profit", "Accounting Equation (A = L + OE)"],
                            exemplarChip: "Formula Check: COGS = Opening Stock + Purchases - Closing Stock | Gross Profit = Sales - COGS | Net Profit = Gross Profit - Expenses."
                        },
                        {
                            id: "fin_p_3",
                            code: "3.3",
                            title: "Financial ratios — Liquidity, Gearing, Profitability, Efficiency & Comparative Ratio Analysis",
                            subPoints: [
                                "Liquidity: Current Ratio = Current Assets ÷ Current Liabilities (benchmark ~2:1)",
                                "Gearing (Solvency): Debt to Equity Ratio = Total Liabilities ÷ Total Equity (measures financial risk/leverage)",
                                "Profitability: Gross Profit Ratio = Gross Profit ÷ Sales; Net Profit Ratio = Net Profit ÷ Sales; Return on Owner's Equity (ROE) = Net Profit ÷ Total Equity",
                                "Efficiency: Expense Ratio = Total Expenses ÷ Sales (lower is better); Accounts Receivable Turnover Ratio = Sales ÷ Accounts Receivable (then 365 ÷ result = average collection days)",
                                "Comparative ratio analysis: comparing ratios (1) over different time periods, (2) against industry standards/benchmarks, and (3) with similar businesses"
                            ],
                            theoryPrompt: "List all 7 official NESA Financial Ratios, their exact formulas, what PLEGS objective each measures, and ideal benchmarks/interpretations.",
                            casePrompt: "Explain why McDonald's can safely operate with a Current Ratio around 1.2:1–1.4:1 (below the textbook 2:1 benchmark) and high Gearing: because fast-food sales are immediate cash/card (near-zero debtor days) and franchise rent inflows are ultra-predictable!",
                            keyTerms: ["current ratio", "debt to equity ratio", "gross profit ratio", "net profit ratio", "return on equity", "expense ratio", "accounts receivable turnover"],
                            exemplarChip: "Band 6 Insight: A 1.3:1 Current Ratio is healthy for McDonald's or Woolworths because high daily cash sales replenish liquidity instantly without idle working capital."
                        },
                        {
                            id: "fin_p_4",
                            code: "3.4",
                            title: "Limitations of financial reports & Ethical issues related to financial reports",
                            subPoints: [
                                "6 Limitations of financial reports: Normalised earnings (removing one-off events like land sales), Capitalising expenses (recording an expense as an asset to inflate profit), Valuing assets (historical cost vs market value / depreciation), Timing issues (matching principle manipulation), Debt repayments (off-balance-sheet leases, timing of roll-overs), Notes to the financial statements",
                                "Ethical issues: Independent audits (external verification under IFRS/AASB), Record keeping (avoiding cash tax evasion), Reporting practices (accurate disclosure to shareholders & ATO)"
                            ],
                            theoryPrompt: "Memorise and explain all 6 Limitations of Financial Reports (Normalised earnings, Capitalising expenses, Valuing assets, Timing issues, Debt repayments, Notes to the statements) plus Audited Accounts.",
                            casePrompt: "Give real examples of Financial Report Limitations: McDonald's 2022 financial statements reported 'Normalised Earnings' excluding the one-off $1.2B write-off from exiting Russia; and McDonald's historic land holdings are recorded at Historical Cost on the Balance Sheet, vastly understating their true $40B+ market value!",
                            keyTerms: ["normalised earnings", "capitalising expenses", "historical cost", "timing issues", "notes to the financial statements", "independent audit"],
                            exemplarChip: "McDonald's Balance Sheet records land at Historical Cost (~$6–7B), whereas independent analysts estimate the true market value of its real estate exceeds $40B!"
                        }
                    ]
                },
                {
                    id: "fin-strategies",
                    code: "S",
                    title: "4. Financial Management Strategies",
                    subtitle: "Cash Flow, Working Capital (Leasing/Sale & Lease-Back), Profitability & Global Financial Management",
                    pdf: "assets/docs/Finance_Strategies_Guide.pdf",
                    dotPoints: [
                        {
                            id: "fin_s_1",
                            code: "4.1",
                            title: "Cash flow management — cash flow statements, distribution of payments, discounts for early payment, factoring",
                            subPoints: [
                                "Distribution of payments: spreading large predictable expenses evenly across the 12 months rather than paying in one lump sum",
                                "Discounts for early payment: offering debtors a 2–5% discount if they pay invoices within 7–14 days (accelerates cash inflow)",
                                "Factoring: selling accounts receivable to a specialist factoring company at a discount for immediate cash injection (improves liquidity instantly, reduces admin costs)"
                            ],
                            theoryPrompt: "Explain the 3 Cash Flow Management strategies (Distribution of payments, Discounts for early payment, Factoring) and how they prevent short-term cash shortfalls.",
                            casePrompt: "How do businesses like McDonald's and Qantas manage cash flow? Spreading insurance/lease outflows monthly (Distribution of payments) and enforcing strict monthly direct-debit royalty collection from franchisees.",
                            keyTerms: ["cash flow management", "distribution of payments", "discounts for early payment", "factoring", "accounts receivable"],
                            exemplarChip: "Discounts for early payment is a win-win: the debtor saves 2–5% on their bill, and the business receives immediate cash inflow without borrowing on an overdraft."
                        },
                        {
                            id: "fin_s_2",
                            code: "4.2",
                            title: "Working capital management — control of current assets (cash, receivables, inventories), control of current liabilities (payables, loans, overdrafts), strategies (leasing, sale and lease-back)",
                            subPoints: [
                                "Net Working Capital = Current Assets − Current Liabilities",
                                "Control of Current Assets: Cash (budgets, avoiding idle cash vs deficits), Receivables (credit checks, reminders, factoring), Inventories (JIT, FIFO, avoiding overstocking)",
                                "Control of Current Liabilities: Payables (stretching payment to the final interest-free day, taking early-payment discounts), Loans (comparing interest/setup fees), Overdrafts (prompt repayment)",
                                "Strategies for Working Capital: Leasing (frees up cash by renting equipment/vehicles with tax-deductible payments) and Sale and lease-back (selling an owned non-current asset like a building/aircraft for a massive cash lump sum, then leasing it back long-term)"
                            ],
                            theoryPrompt: "Define Net Working Capital and explain how a manager controls Current Assets (Cash, Receivables, Inventory), Current Liabilities (Payables, Loans, Overdrafts), and uses Leasing vs Sale and Lease-Back.",
                            casePrompt: "Explain how Qantas used Sale and Lease-Back of aircraft/terminals to inject hundreds of millions in liquidity during downturns, while McDonald's uses JIT inventory and immediate POS payment to maintain razor-sharp working capital efficiency.",
                            keyTerms: ["net working capital", "accounts payable", "stretching payables", "leasing", "sale and lease-back"],
                            exemplarChip: "Sale and Lease-Back converts an illiquid Non-Current Asset (property/aircraft) into immediate Current Asset Cash while keeping operational use of the asset."
                        },
                        {
                            id: "fin_s_3",
                            code: "4.3",
                            title: "Profitability management — cost controls (fixed and variable, cost centres, expense minimisation) & revenue controls (marketing objectives)",
                            subPoints: [
                                "Cost controls: Fixed vs Variable costs (renegotiating supplier contracts, bulk buying, energy efficiency), Cost centres (assigning clear budgets & accountability to specific departments/stores), Expense minimisation (lean waste reduction, JIT, automation)",
                                "Revenue controls: Marketing objectives — sales objectives, sales mix analysis (promoting high-margin items and dropping low-margin items), and pricing policy (avoiding over-pricing or margin-destroying under-pricing)"
                            ],
                            theoryPrompt: "Break down Profitability Management into Cost Controls (Fixed/Variable, Cost Centres, Expense Minimisation) and Revenue Controls (Sales Objectives, Sales Mix, Pricing Policy).",
                            casePrompt: "How does McDonald's maximize profitability? Cost Controls = treating each store as an individual Cost Centre, installing AI kiosks to cut variable labour costs, and LED/energy-efficient fryers; Revenue Controls = Dynamic Yield menu boards upselling high-margin drinks/McFlurries (improving the Sales Mix).",
                            keyTerms: ["fixed vs variable costs", "cost centres", "expense minimisation", "revenue controls", "sales mix", "pricing policy"],
                            exemplarChip: "McDonald's shifted from 55% company-owned stores to 95% franchised ('Refranchising Strategy'), slashing fixed operating expenses and boosting Net Profit Margin from ~18% to >32%!"
                        },
                        {
                            id: "fin_s_4",
                            code: "4.4",
                            title: "Global financial management — exchange rates, interest rates, methods of international payment, hedging, derivatives",
                            subPoints: [
                                "Exchange rates: appreciation of AUD makes exports dearer & imports cheaper; depreciation makes exports cheaper & imports/USD debt dearer",
                                "Interest rates: borrowing offshore at lower rates vs exchange rate risk",
                                "4 Methods of international payment (ranked by exporter risk): Payment in advance (lowest risk to exporter, highest to importer), Letter of credit (bank guarantee — very safe), Bill of exchange (document against payment/acceptance), Clean payment (open account — goods shipped before payment, lowest risk to importer)",
                                "Hedging: natural hedging (matching foreign revenue & expenses in the same currency, local subsidiaries) vs financial instrument hedging",
                                "Derivatives: Forward exchange contracts (locking in an agreed exchange rate for a future date), Options contracts (right, but not obligation, to buy/sell currency), Swap contracts (currency swaps)"
                            ],
                            theoryPrompt: "Compare the 4 Methods of International Payment (Payment in Advance, Letter of Credit, Bill of Exchange, Clean Payment) and explain Natural Hedging vs Derivatives (Forward Exchange Contracts, Options, Swaps).",
                            casePrompt: "How does McDonald's manage foreign exchange risk across 100+ countries? (1) Natural Hedging: sourcing beef/potatoes locally in the same currency as store sales (AUD revenue pays AUD suppliers); (2) Derivatives: using Forward Exchange Contracts and Cross-Currency Swaps to protect USD royalty repatriations.",
                            keyTerms: ["appreciation / depreciation", "payment in advance", "letter of credit", "bill of exchange", "clean payment", "natural hedging", "forward exchange contract", "options", "swaps"],
                            exemplarChip: "McDonald's Australia is naturally hedged: 90%+ of its food inputs are bought from Australian suppliers in AUD, matching its AUD customer revenues."
                        }
                    ]
                }
            ]
        },

        hr: {
            id: "hr",
            name: "Human Resources",
            code: "TOPIC 4",
            weight: "25% of HSC",
            icon: "👥",
            accent: "#7c3aed",
            tagline: "Workforce Planning, Fair Work Framework, Strategies & HR Effectiveness (RIPSE)",
            summary: "Human Resources covers the strategic management of the employer-employee relationship, stakeholders, the Fair Work Act 2009 legal framework, the 4 HR Processes, HR Strategies, and Indicators of Effectiveness.",
            resources: {
                videos: [
                    { title: "Mastering the HSC Business Studies Extended Response", src: "assets/videos/exam_mastering_extended_response.mp4", tag: "HR Extended Response" }
                ],
                infographics: [],
                docs: [
                    { title: "Full HSC Revision Workbook (PDF)", src: "assets/docs/HSC_Business_Studies_Revision_Workbook.pdf" },
                    { title: "Business Report Assessment Scaffold (PDF)", src: "assets/docs/Business_Report_Assessment_Scaffold.pdf" }
                ]
            },
            sections: [
                {
                    id: "hr-role",
                    code: "R",
                    title: "1. Role of Human Resource Management",
                    subtitle: "Strategic role, interdependence & outsourcing HR (contractors: domestic vs global)",
                    dotPoints: [
                        {
                            id: "hr_r_1",
                            code: "1.1",
                            title: "Strategic role of human resources & Interdependence with other key business functions",
                            subPoints: [
                                "Strategic role of HR: managing the total relationship between employer and employees to align workforce capability, motivation, and productivity with long-term business goals",
                                "Interdependence: HR recruits/trains staff for Operations' technology changes, equips Marketing's sales/service teams, and works within Finance's wage/training budgets"
                            ],
                            theoryPrompt: "Define the strategic role of HRM and explain how HR is interdependent with Operations, Marketing, and Finance.",
                            casePrompt: "Explain how McDonald's Australia manages over 115,000 employees (one of Australia's largest youth employers) to deliver fast operational service and friendly customer interactions while managing wage costs (~30% of store revenue).",
                            keyTerms: ["strategic role of HR", "employer-employee relationship", "workforce productivity", "staff retention", "interdependence"],
                            exemplarChip: "McDonald's invests >$40M annually in training its 115,000+ Australian crew and managers (Registered Training Organisation status), directly lifting operational speed."
                        },
                        {
                            id: "hr_r_2",
                            code: "1.2",
                            title: "Outsourcing — human resource functions & using contractors (domestic, global)",
                            subPoints: [
                                "Outsourcing HR functions: hiring external specialists for recruitment, payroll, WHS audits, executive search, or mediation",
                                "Using contractors: independent external providers hired for specific projects/services (not permanent employees — saves on leave, superannuation, workers' comp, and redundancy costs)",
                                "Domestic subcontracting vs Global subcontracting (offshoring IT/call centres/manufacturing for lower wage costs vs quality, ethical, and cultural risks)"
                            ],
                            theoryPrompt: "Evaluate the pros and cons of outsourcing HR functions and using Independent Contractors (Domestic vs Global subcontracting).",
                            casePrompt: "Compare Qantas's controversial outsourcing of 2,000 domestic ground-handling jobs in 2020 (found to be adverse action by the High Court, resulting in $120M compensation) with McDonald's use of domestic contractors for store construction, IT maintenance, and delivery drivers (UberEats).",
                            keyTerms: ["HR outsourcing", "independent contractors", "sham contracting", "domestic subcontracting", "global subcontracting"],
                            exemplarChip: "Case Study Gold: Qantas outsourced 2,000 ground crew in 2020 to save $100M/yr, but lost a High Court appeal under the Fair Work Act and paid $120M in compensation."
                        }
                    ]
                },
                {
                    id: "hr-influences",
                    code: "I",
                    title: "2. Key Influences on Human Resource Management",
                    subtitle: "Stakeholders, Legal Framework (Fair Work Act, NES, Awards, EAs), Economic, Tech, Social & Ethics",
                    dotPoints: [
                        {
                            id: "hr_i_1",
                            code: "2.1",
                            title: "Stakeholders — employers, employees, employer associations, unions, government organisations, society",
                            subPoints: [
                                "Employers (seek productivity, flexibility, cost control) vs Employees (seek fair pay, job security, safe conditions, work-life balance)",
                                "Employer associations: represent employers in tribunals & lobbying (e.g. ACCI, Australian Industry Group, Restaurant & Catering Industry Association)",
                                "Unions (Trade Unions): represent employees in collective bargaining & disputes (e.g. ACTU, SDA for retail/fast food, TWU for aviation)",
                                "Government organisations: Fair Work Commission (FWC — Australia's industrial tribunal), Fair Work Ombudsman (enforces compliance), SafeWork NSW, AHRC",
                                "Society: expects ethical employment practices, no sweatshops or wage theft"
                            ],
                            theoryPrompt: "Identify all 6 HR Stakeholders (Employers, Employees, Employer Associations, Unions, Government Organisations, Society) and explain their competing interests.",
                            casePrompt: "In McDonald's HR negotiations, identify the stakeholders: McDonald's Corp & Franchisees (employers), 115,000+ crew (employees), the SDA / RAFFWU unions, and the Fair Work Commission (which oversaw McDonald's return to the Fast Food Industry Award in 2019).",
                            keyTerms: ["stakeholders", "employer associations", "trade unions", "Fair Work Commission (FWC)", "Fair Work Ombudsman", "SDA / TWU"],
                            exemplarChip: "In 2019, following union pressure from RAFFWU/SDA before the Fair Work Commission, McDonald's transitioned 100,000+ workers onto the Fast Food Industry Award with full weekend penalty rates."
                        },
                        {
                            id: "hr_i_2",
                            code: "2.2",
                            title: "Legal — the current legal framework (employment contract, Fair Work Act 2009, NES, Minimum Wage, Awards, Enterprise Agreements)",
                            subPoints: [
                                "The employment contract: common law rights and obligations of employers (duty of care, pay wages) and employees (obey lawful instructions, use skill/care)",
                                "Statutes: Fair Work Act 2009 (Cth), National Employment Standards (11 minimum NES entitlements), National Minimum Wage",
                                "Modern Awards: industry/occupation-based minimum pay and conditions (plus flexibility clauses)",
                                "Enterprise Agreements (Single-enterprise, Multi-enterprise, Greenfields): collective agreements negotiated at the workplace level that MUST pass the BOOT (Better Off Overall Test) enforced by the FWC",
                                "Other employment contracts: individual common law contracts (high-income earners), independent contractors, casuals, part-time",
                                "Work Health and Safety (WHS Act 2011), Workers Compensation, Anti-discrimination (Sex, Race, Age, Disability Acts) & EEO (Workplace Gender Equality Act)"
                            ],
                            theoryPrompt: "Explain the hierarchy of Australia's legal employment framework: Common Law obligations, the 11 National Employment Standards (NES), Modern Awards, and Enterprise Agreements (including the BOOT test), plus WHS and EEO laws.",
                            casePrompt: "Explain how McDonald's operates under the Fast Food Industry Modern Award (paying junior rates, casual loading of 25%, and weekend penalty rates) and complies with WHS Act 2011 (burn/slip hazard prevention for young workers).",
                            keyTerms: ["Fair Work Act 2009", "National Employment Standards (NES)", "Modern Awards", "Enterprise Agreements", "Better Off Overall Test (BOOT)", "WHS Act 2011", "EEO"],
                            exemplarChip: "Every Enterprise Agreement in Australia must pass the Fair Work Commission's BOOT (Better Off Overall Test) compared to the relevant Modern Award."
                        },
                        {
                            id: "hr_i_3",
                            code: "2.3",
                            title: "Economic, technological, social influences & Ethics and corporate social responsibility",
                            subPoints: [
                                "Economic: business cycle (boom = labour shortages & wage inflation; recession = downsizing & higher unemployment) and structural change (growth of services)",
                                "Technological: automation, AI, remote work software — increases productivity & flexible work, but requires retraining and causes structural redundancy",
                                "Social: changing work patterns (rise of casualisation/part-time, gig economy, remote work) and living standards / female participation / ageing workforce",
                                "Ethics and CSR: safe working conditions, living wages, diversity & inclusion, eradicating modern slavery in global supply chains"
                            ],
                            theoryPrompt: "Analyze how Economic cycles, Technological disruption, Social shifts (casualisation/female participation), and Ethical CSR shape HR planning.",
                            casePrompt: "Apply to McDonald's: Social = ~85% casual/part-time workforce suited to school/uni students seeking flexible rosters; Technological = AI kiosks shifting crew roles from order-taking to hospitality/McDelivery packing; CSR = Archways to Opportunity education pathways & diversity programs.",
                            keyTerms: ["economic cycle", "structural change", "casualisation", "flexible work patterns", "ethical HRM"],
                            exemplarChip: "Casualisation: Around 80%+ of McDonald's crew are employed casually or part-time, giving students study flexibility while allowing stores to match rosters to peak hours."
                        }
                    ]
                },
                {
                    id: "hr-processes",
                    code: "P",
                    title: "3. Processes of Human Resource Management (ADMS)",
                    subtitle: "Acquisition, Development, Maintenance & Separation (Voluntary vs Involuntary)",
                    dotPoints: [
                        {
                            id: "hr_p_1",
                            code: "3.1",
                            title: "Acquisition & Development",
                            subPoints: [
                                "Acquisition (identifying staffing needs, recruitment, selection): forecasting demand, internal vs external recruitment, selection via resumes, AI screening, interviews, psychometric/skills testing",
                                "Development (induction, training, organisational development, mentoring/coaching, performance appraisal): formal induction for safety/culture, on-the-job vs off-the-job training, flatter structures, developmental vs administrative performance appraisals"
                            ],
                            theoryPrompt: "Detail the steps of Acquisition (Staffing needs → Recruitment → Selection) and Development (Induction, Training, Mentoring, Performance Appraisal).",
                            casePrompt: "How does McDonald's acquire and develop staff? Acquisition = AI-assisted conversational recruitment ('McHire' with Paradox/Olivia reducing time-to-hire to 3 days); Development = digital 'Fred' onboarding platform, crew trainer mentoring, and Hamburger University leadership courses.",
                            keyTerms: ["acquisition", "internal vs external recruitment", "selection", "induction", "on-the-job training", "Hamburger University", "performance appraisal"],
                            exemplarChip: "McDonald's 'McHire' AI recruitment assistant cut applicant processing time by 60%, while Hamburger University has trained >275,000 restaurant managers globally."
                        },
                        {
                            id: "hr_p_2",
                            code: "3.2",
                            title: "Maintenance & Separation",
                            subPoints: [
                                "Maintenance: monetary and non-monetary benefits, flexible working arrangements, workplace culture, and legal compliance to retain talented employees and prevent costly turnover",
                                "Separation — Voluntary (retirement, resignation, voluntary redundancy) vs Involuntary (retrenchment/redundancy due to lack of work, summary or on-notice dismissal)",
                                "Unfair dismissal: when an employee is dismissed in a 'harsh, unjust or unreasonable' manner under the Fair Work Act 2009 (procedural fairness, warnings required)"
                            ],
                            theoryPrompt: "Explain Maintenance strategies, distinguish between Voluntary and Involuntary Separation, and outline how a business avoids Unfair Dismissal claims before the FWC.",
                            casePrompt: "How does McDonald's maintain staff (20% crew meal discounts, flexible study-friendly rosters, Employee of the Month awards) and handle separation (procedural fairness with formal written warnings to comply with Fair Work unfair dismissal laws)?",
                            keyTerms: ["maintenance", "monetary vs non-monetary rewards", "voluntary separation", "involuntary separation", "redundancy", "unfair dismissal", "procedural fairness"],
                            exemplarChip: "To avoid Unfair Dismissal rulings by the FWC, employers must follow procedural fairness: clear warnings, an opportunity to respond, and a valid performance/conduct reason."
                        }
                    ]
                },
                {
                    id: "hr-strategies",
                    code: "S",
                    title: "4. Strategies in Human Resource Management",
                    subtitle: "Leadership Style, Job Design, Recruitment, Training, Performance Management, Rewards, Global HR & Workplace Disputes",
                    dotPoints: [
                        {
                            id: "hr_s_1",
                            code: "4.1",
                            title: "Leadership style & Job design — general or specific tasks",
                            subPoints: [
                                "Leadership styles: Autocratic/Directive (top-down control, fast decisions in high-pressure/unskilled routines) vs Participative/Democratic (collaborative, empowers skilled staff & boosts morale)",
                                "Job design: Specific tasks (scientific management / specialisation — high efficiency on assembly lines but repetitive boredom) vs General tasks (job enlargement, job rotation, job enrichment — greater variety and autonomy)"
                            ],
                            theoryPrompt: "Contrast Autocratic vs Participative leadership styles and Specific vs General job design (including job rotation, enlargement, and enrichment).",
                            casePrompt: "Show how McDonald's blends both: Specific task design & directive leadership during peak kitchen rushes for speed/safety, combined with Job Rotation (rotating crew between grill, fry, counter, and McCafé) and Participative store management meetings to prevent burnout.",
                            keyTerms: ["autocratic leadership", "participative/democratic leadership", "specific task design", "job rotation", "job enrichment", "job enlargement"],
                            exemplarChip: "McDonald's uses Specific Task Design for standardized burger assembly, but rotates crew across stations (Job Rotation) to reduce monotony and wrist strain."
                        },
                        {
                            id: "hr_s_2",
                            code: "4.2",
                            title: "Recruitment (internal/external, general/specific skills) & Training and development (current or future skills)",
                            subPoints: [
                                "Recruitment: Internal (promotions — motivates staff, cheaper, knows culture) vs External (fresh ideas, wider talent pool); General skills (communication, teamwork, adaptability) vs Specific skills (technical qualifications)",
                                "Training & development: training for current skills (immediate job competence) vs developing for future skills (succession planning & leadership pipeline)"
                            ],
                            theoryPrompt: "Compare Internal vs External recruitment, General vs Specific skills, and Training for Current Skills vs Development for Future Skills.",
                            casePrompt: "Explain McDonald's 'Hire for Attitude, Train for Skill' philosophy: recruiting youth externally for General soft skills (teamwork, positivity), then using internal promotion pathways (over 50% of McDonald's corporate & store managers started as crew members!).",
                            keyTerms: ["internal recruitment", "external recruitment", "general skills", "specific skills", "future skills development", "succession planning"],
                            exemplarChip: "Internal Recruitment Success: Over 60% of McDonald's restaurant managers and many senior executives started as front-line crew members."
                        },
                        {
                            id: "hr_s_3",
                            code: "4.3",
                            title: "Performance management (developmental vs administrative) & Rewards (monetary/non-monetary, individual/group, performance pay)",
                            subPoints: [
                                "Performance management: Developmental model (focused on coaching, feedback, and growing future potential) vs Administrative model (focused on assessing KPIs for pay rises, promotions, or disciplinary action)",
                                "Rewards: Monetary (wages, bonuses, commissions, share plans) vs Non-monetary (flexible hours, recognition, career progression, fringe benefits); Individual vs Group rewards; Performance pay"
                            ],
                            theoryPrompt: "Distinguish between Developmental and Administrative Performance Management, and evaluate Monetary vs Non-Monetary and Individual vs Group rewards.",
                            casePrompt: "How does McDonald's use Performance Management & Rewards? Crew receive developmental shift coaching + bi-annual appraisals; store managers receive Group/Performance Pay bonuses tied to store QSC (Quality, Service, Cleanliness) scores and sales targets.",
                            keyTerms: ["developmental performance management", "administrative performance management", "monetary rewards", "non-monetary rewards", "performance pay", "extrinsic vs intrinsic"],
                            exemplarChip: "McDonald's Restaurant Managers receive performance-based quarterly bonuses linked to store Drive-Thru speed, food safety audits, and crew retention."
                        },
                        {
                            id: "hr_s_4",
                            code: "4.4",
                            title: "Global — costs, skills, supply; ethnocentric, polycentric, geocentric staffing",
                            subPoints: [
                                "Global HR drivers: high domestic labour costs, domestic skill shortages (using skilled migration visas), and global labour supply",
                                "Staffing approaches: Ethnocentric (all senior management positions filled by parent-company/home-country expats), Polycentric (host-country locals manage local subsidiaries — culturally sensitive & cheaper), Geocentric (best person globally hired for the job regardless of nationality)"
                            ],
                            theoryPrompt: "Define Ethnocentric, Polycentric, and Geocentric global staffing approaches and evaluate when a multinational should use each.",
                            casePrompt: "McDonald's uses a Polycentric & Geocentric staffing strategy: local Australian leadership runs McDonald's Australia (knowing local culture, Fair Work laws, and suppliers), while global best talent can rise to global CEO (e.g. Australian Charlie Bell became Global CEO of McDonald's!).",
                            keyTerms: ["ethnocentric", "polycentric", "geocentric", "expatriates", "skilled migration", "cultural alignment"],
                            exemplarChip: "Polycentric/Geocentric Exemplar: Australian Charlie Bell started as a 15-year-old crew member in Sydney and rose to become Global President & CEO of McDonald's Corp."
                        },
                        {
                            id: "hr_s_5",
                            code: "4.5",
                            title: "Workplace disputes — overt/covert industrial action & Resolution (negotiation, mediation, grievance procedures, courts and tribunals)",
                            subPoints: [
                                "Industrial disputes: Overt manifestations (strikes, lockouts, pickets, work bans) vs Covert manifestations (absenteeism, high turnover, sabotage, go-slow)",
                                "Dispute resolution steps (escalating order): (1) Grievance procedures (internal workplace policy), (2) Negotiation (direct discussion between employer & employees/unions), (3) Mediation (independent neutral 3rd party facilitates discussion without imposing a decision), (4) Conciliation & Arbitration via Courts and Tribunals (Fair Work Commission — arbitration makes a legally binding order)"
                            ],
                            theoryPrompt: "Contrast Overt vs Covert disputes, and trace the 4 escalating stages of Dispute Resolution: Grievance Procedures → Negotiation → Mediation → Conciliation & Binding Arbitration (FWC).",
                            casePrompt: "Contrast McDonald's internal Open Door Grievance Policy (resolving crew roster/safety issues in-store) with Qantas's 2011 industrial dispute (where covert/overt union strikes led CEO Alan Joyce to lock out staff and ground the entire fleet, triggering urgent Fair Work Australia binding arbitration).",
                            keyTerms: ["overt vs covert disputes", "grievance procedures", "negotiation", "mediation", "conciliation", "arbitration", "Fair Work Commission"],
                            exemplarChip: "Mediation vs Arbitration: A Mediator helps parties reach their own agreement; an Arbitrator (FWC) hears evidence like a judge and hands down a legally binding ruling."
                        }
                    ]
                },
                {
                    id: "hr-effectiveness",
                    code: "E",
                    title: "5. Effectiveness of Human Resource Management (Indicators)",
                    subtitle: "Corporate Culture, Benchmarking, Changes in Staff Turnover, Absenteeism, Accidents, Disputes & Worker Satisfaction",
                    dotPoints: [
                        {
                            id: "hr_e_1",
                            code: "5.1",
                            title: "Indicators of HR effectiveness — corporate culture, benchmarking key variables, staff turnover, absenteeism, accidents, levels of disputation, worker satisfaction",
                            subPoints: [
                                "Corporate culture: shared values, beliefs, and trust within the workplace (positive culture drives engagement & low turnover)",
                                "Benchmarking key variables: informal benchmarking, performance benchmarking, best-practice benchmarking, and balanced scorecard",
                                "Changes in staff turnover: percentage of employees leaving per year (high turnover = high recruitment/training costs & lost productivity)",
                                "Absenteeism: average days lost per employee due to unplanned absence (covert indicator of low morale/burnout)",
                                "Accidents: Lost Time Injury Frequency Rate (LTIFR) and workers' compensation claims (measures WHS effectiveness)",
                                "Levels of disputation: frequency of formal grievances, work bans, strikes, and FWC claims",
                                "Worker satisfaction: measured via anonymous employee engagement pulse surveys and exit interviews"
                            ],
                            theoryPrompt: "Memorise all 7 Indicators of HR Effectiveness and explain how an HR manager uses them as diagnostic KPIs to evaluate whether HR strategies are working.",
                            casePrompt: "How does McDonald's measure HR effectiveness? By tracking annual crew turnover against the fast-food industry benchmark, monitoring LTIFR kitchen burn/slip rates, conducting anonymous annual 'Crew Opinion Surveys' (achieving >80% pride scores), and maintaining low industrial disputation.",
                            keyTerms: ["corporate culture", "best-practice benchmarking", "balanced scorecard", "staff turnover", "absenteeism", "accidents (LTIFR)", "levels of disputation", "worker satisfaction"],
                            exemplarChip: "Exam Synthesis Tip: Always link HR Strategies (e.g. Training & Rewards) directly to measurable improvements in HR Effectiveness Indicators (lower turnover, lower absenteeism, higher worker satisfaction)!"
                        }
                    ]
                }
            ]
        }
    }
};
