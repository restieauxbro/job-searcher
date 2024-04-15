import { baseTemplate } from "@/cv-templates/base-template";

let productEngineerTemplate = { ...baseTemplate };
productEngineerTemplate.title = "Product Engineer";
productEngineerTemplate.intro = `I’m someone with a unique journey into web and app development – one grounded in a rich history of user experience design and digital marketing. I haven’t always been a programmer, in fact my career begins solely in the marketing space; and when I found how our advertising efforts were limited by stilted digital experiences and a slow pipeline from design to code I took up the responsibility to drive the digital strategy and got onto the tools.

I'm using this term to describe what I do: I'm a Product Engineer. A Product Engineer is someone who develops solutions and then builds them. It's someone who can come up with and programme features that are mindfully connected to the whole digital strategy. A software engineer who markets and a marketer who codes.<br/><br/>

Most recently I’ve been problem-solving AI-based solutions and writing code for Te Pūkenga as their Artificial Intelligence Architect. Te Pūkenga was New Zealand's super-polytech; an entity that was bringing together 24 private entities into one national network that constituted the largest digital transformation project the country had ever seen. My role saw me design and develop applications to plug-in to the many websites – a challenge of developing front-end code that integrates seamlessly and scales, and backend architecture that is enriched with real-time customer data and an intelligence layer. My strength is that I simplify complex issues using market-leading tools for creating integrated, high-converting products. My transition from Digital Marketing Executive to Product Engineer, and the focus that gave me for distilling user needs and behaviours into cohesive multi platform experiences has given me a comprehensive understanding of both the user-centric and the technical aspects it takes to succeed in the market today.
<br/><br/>
Let’s talk about the challenges you’re currently tackling. Coffee’s on me.
`;
productEngineerTemplate.employment["tp-ai-architect"].description =
  "In my role as AI Architect at Te Pūkenga I focused on designing and implementing AI solutions to simplify user navigation across networks. This included creating modular applications that were scalable and embeddable. I centralised elements of Te Pūkenga’s data into a layer able to be leveraged by AI APIs, a Customer Data Platform, a CMS and a complete integration design pattern, all for the purpose of accessing and transforming real-time data in intelligent ways for learners.";
// productEngineerTemplate.employment["cz-digital-experience-lead"].description =
//   "Ownership of the customer's digital experience from ad channels to the website, from lead nurture through to conversion. My time at Competenz was focused on building a micro-services architecture to scale personalised experiences driven by data. We automated nurture funnels that set unqualified learners up with recruitment coaching that integrated with our digital systems. We rebuilt content delivery systems to suit the micro-campaign strategy of the organisation.";
productEngineerTemplate.employment = {
  ...productEngineerTemplate.employment,
  "lead-dev": {
    company: "Oscar Tango",
    endDate: "Present",
    position: "Full-stack Developer / Co-founder",
    startDate: "Nov 2023",
    description:
      "Oscar Tango is a boutique development agency I co-founded that sub-contracts from creative agencies when they need extra resource building AI applications. We specialise in building knowledge-bases, enhanced search and chat interfaces for agency clients to sell on to their clients. I am the principle developer and consult on digital strategy.",
    hightlights: ["Web Development"],
    achievements: [
      "Created a full-stack RAG AI application as a knowledge-base alternative that saved our client 100 hours of development time on an old-school solution",
      "Developed a cost per conversion service that ensures a ROI on limits AI features when as they become more or less effective on each user. Our client had a controlled ",
      "Developed a chatbot that resists and reports adversarial attacks, staying on brand and on message",
    ],
    totalDuration: "5 months",
  },
};
productEngineerTemplate.skills = [
  ...(productEngineerTemplate.skills || []),
  "Full-stack Development",
  "AWS",
  "Identity",
  "Product Strategy",
];
delete productEngineerTemplate.employment["uxbridge-arts-culture"];

export { productEngineerTemplate };
