import { CVTemplate, baseTemplate } from "./base-template";

let modifiedTemplate = { ...baseTemplate };
modifiedTemplate.title = "AI Architect and Product Engineer";
modifiedTemplate.intro = `I’m someone with a unique journey into digital product development – one grounded in a rich history of user experience design and digital marketing. I haven’t always been a programmer, in fact my career begins solely in the marketing space; and when I found how our advertising efforts were limited by digital experiences and a slow pipeline from design to code I took up the responsibility to drive the digital strategy and got onto the tools. I now work with stakeholders to simplify complex issues using market-leading tools and create integrated high-converting products.`;
modifiedTemplate.employment[
  "tp-ai-architect"
].description = `In my role as AI Architect I was responsible for designing solutions that would help learners navigate the network. I worked with stakeholders and UX researchers to take requirements and develop the digital experiences that used AI. I was also responsible for aiding in the adoption of generative AI in the marketing and HR teams, and working with enterprise architects and engineers to deliver the full-stack solutions. I frequently wrote and reviewed code in these projects.`;
modifiedTemplate.employment["tp-ai-architect"].achievements = [
  // ...(modifiedTemplate.employment["tp-ai-architect"].achievements || []),
  "Architected our web 'Intelligence Layer' – a microservice for extracting and transforming data across products and users, enhancing with LLMs and passing back to the front-end to power personalisation. In the 6 months following its launch the website conversion rate increased from 1.5% to 3.5%.",
  'Fine-tuned a model for parsing user queries into structured data and using it in our recommendation algorithm. Qualitative research showed a 78% boost in the sentiment "I got exactly what I needed".',
  'Fine-tuned an internal "Brand Voice" model for HR to generate job description drafts. The department chief estimated a 80% reduction in time spent on job descriptions.',
  "Architected a method for our front-end applications to generate components from a centralised design system and automate A/B testing. In our sample testing we were able to increase the click-through rate by 22%.",
  "Developed a chatbot framework that resists and reports adversarial attacks, as well as redirecting conversation flows from natural language rules in a CMS.",
];
modifiedTemplate.employment["cz-digital-experience-lead"].description =
  "Ownership of the customer's digital experience from ad channels to the website, from lead nurture through to conversion, as well as the technology stack of our new platforms. My time at Competenz was focused on building a micro-services architecture to scale personalised experiences driven by data. We automated nurture funnels that set unqualified learners up with recruitment coaching and that integrated with our digital systems. We rebuilt content delivery systems to suit the micro-campaign strategy of the organisation.";
// modifiedTemplate.employment = {
//   ...modifiedTemplate.employment,
//   "lead-dev": {
//     company: "Oscar Tango",
//     endDate: "Present",
//     position: "Full-stack Developer / Co-founder",
//     startDate: "Nov 2023",
//     description:
//       "Oscar Tango is a boutique development agency I co-founded that sub-contracts from creative agencies when they need extra resource building AI applications. We specialise in building knowledge-bases, enhanced search and chat interfaces for agency clients to sell on to their clients. I am the principle developer and consult on digital strategy.",
//     highlights: ["Web Development"],
//     achievements: [
//       "Created a full-stack RAG AI application as a knowledge-base alternative that saved our client 100 hours of development time on an old-school solution.",
//       "Developed a chatbot that resists and reports adversarial attacks, staying on brand and on message.",
//     ],
//     totalDuration: "4 months",
//

//};
modifiedTemplate.skills = [
  "AI Solution Design",
  "Full-stack Development",
  ...(modifiedTemplate.skills || []),
  "Typescript",
  "Customer Experience",
  "Agile",
];
delete modifiedTemplate.employment["uxbridge-arts-culture"];

export const aIEngineeringTemplate: CVTemplate = modifiedTemplate;
