export const digitalMarketerCoverLetter = ({
  intro,
  role,
}: {
  intro?: string;
  role?: string;
}) => {
  return `${
    intro ||
    `I am writing to express my enthusiasm for the ${
      role ? `role of ${role}` : "Digital Marketer position"
    }. My career, deeply entrenched in digital marketing, is marked by a consistent pursuit of growth and innovation through cutting-edge technologies. I am eager to apply my expertise in new and challenging projects.`
  } 
     
     As a marketer who codes, I bring a unique blend of skills to the table. My proficiency extends beyond navigating consoles and dashboards; I have developed advanced tools that utilise AI, automation, and customer data optimisation to streamline user journeys and enhance conversion rates. My career to date has covered a number of digital disciplines, starting with fundamental operations positions, evolving through campaign marketing, and culminating in leadership roles such as Digital Experience Lead and Artificial Intelligence Architect at Te Pūkenga, New Zealand’s pioneering super-polytech.
     
     In these roles, I have crafted marketing technology solutions that were integral to the most ambitious digital transformation projects in the NZ public sector. My use of predictive behavioural models has been instrumental in strategising, developing, and executing campaign experiences with impressive conversion rates, such as in our most recent category campaign where our team achieved a 12% conversion rate.
     
     My expertise extends to managing large digital campaigns and taking product ownership over customer facing platforms – I worked with a large range of stakeholders and managed the development of a number of digital products, including an assistant that has been used by over 100,000 learners in vocational education, a recommendation algorithm that boosted learner trust in their options, and much more. I have also developed a number of internal tools to automate and optimise marketing processes, including pipelines for our customer data platform that have enabled us to cohere 24 training institutions into a single network experience.
     
     I am excited about the opportunity to bring my background in leveraging technology for strategic marketing initiatives to your team. I look forward to the possibility of discussing how my skills, experience, and vision align with your objectives.
     
     Thank you for considering my application. Coffee’s on me when you’re free to discuss.
     
     Warm regards,
     Tim Restieaux`;
};
