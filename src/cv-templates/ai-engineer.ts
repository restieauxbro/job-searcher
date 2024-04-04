import { CVTemplate, baseTemplate } from "./base-template";

let modifiedTemplate = { ...baseTemplate };
modifiedTemplate.title = "Product Engineer";
modifiedTemplate.intro = `I’m a full stack web development engineer with a background in optimising user experiences. My unique journey into web development, grounded in a rich history of user experience design and digital marketing has imbued me with a profound appreciation for creating websites that are not only effective but also user-centric and marketing-savvy. In my last three roles in cross-functional teams I’ve implemented digital strategy as the developer on front-end and back-end solutions. This makes me the perfect addition to a team that needs to move fast and creatively.

I am reaching out to express my keen interest in the Front End Developer position. I've most recently been writing code for Te Pūkenga  New Zealand's super-polytech; an entity that was bringing together 26 private entities into one national network in the largest digital transformation project the country had ever seen. My role saw me design and develop front end applications to plug-in to the many websites, a challenge that saw me develop front-end code that integrates seamlessly and scales, and backend code that is enriched with customer data. My strength is that I simplify complex issues using market-leading tools for creating integrated, high-converting websites. My transition from Digital Marketing Executive to Full Stack Developer, and the focus that gave me for distilling user needs and behaviours into cohesive multiplatform digital experiences, has given me a comprehensive understanding of both the user-centric and the technical aspects of development.
<br/><br/>
Thank you for considering my application. Coffee’s on me when you’re free to discuss.`;
modifiedTemplate.employment["tp-ai-architect"].description =
  "In my role as AI Architect at Te Pūkenga, I focused on designing and implementing AI solutions to simplify user navigation across networks. This included developing a comprehensive library of reusable AI models and automations, enhancing process efficiency, and reducing tech debt. My work involved close collaboration with engineering experts to refine AI solutions, ensuring they align with government requirements. My contribution was instrumental in driving automation and innovation in the organisation.";
modifiedTemplate.employment["cz-digital-experience-lead"].description =
  "At Competenz, I led the digital customer experience, focusing on scaling personalized experiences through data-driven micro-services architecture. This role involved creating automated systems and AI-driven tools, contributing to process efficiency and innovation. My ability to interrogate and utilise extensive libraries of existing designs was key in developing new, effective solutions.";
modifiedTemplate.employment = {
  ...modifiedTemplate.employment,
  "lead-dev": {
    company: "Oscar Tango",
    endDate: "Present",
    position: "Full-stack Developer / Co-founder",
    startDate: "Nov 2023",
    description:
      "Oscar Tango is a boutique development agency I co-founded that sub-contracts from creative agencies when they need extra resource building AI applications. We specialise in building knowledge-bases, enhanced search and chat interfaces for agency clients to sell on to their clients. I am the principle developer and consult on digital strategy.",
    hightlights: ["Web Development"],
    achievements: [
      "Created a full-stack RAG AI application as a knowledge-base alternative that saved our client 100 hours of development time on an old-school solution.",
      "Developed a chatbot that resists and reports adversarial attacks, staying on brand and on message.",
    ],
    totalDuration: "4 months",
  },
};
delete modifiedTemplate.employment["uxbridge-arts-culture"];

export const aIEngineeringTemplate: CVTemplate = modifiedTemplate;
