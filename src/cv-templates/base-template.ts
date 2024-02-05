export type CVTemplate = {
  title: string;
  intro: string;
  employment: {
    [key: string]: Employment;
  };
  education?: Education[];
  skills?: string[];
};

export type Employment = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  totalDuration: string;
  description: string;
  hightlights: string[];
};

export type Education = {
  institution: string;
  qualification: string;
  details: string;
  startDate: string;
  endDate: string;
};

export const baseTemplate: CVTemplate = {
  title: "Product Designer and Engineer",
  intro:
    "As a Product Engineer with a unique blend of technical expertise and marketing acumen, I specialise in engineering innovative products that transform user experiences and drive business success. My background in mar-tech, combined with a deep understanding of market dynamics, equips me to design and develop products that not only meet but exceed user expectations. My experience in AI research, full-stack development, and process automation has been instrumental in pioneering solutions in the education and training sector. With a proven track record in leveraging technology for strategic product development and a commitment to continuous improvement, I excel in bridging the gap between technical possibilities and market needs, ensuring products are both technically sound and commercially viable.",
  employment: {
    "tp-ai-architect": {
      company: "Te Pūkenga",
      position: "Artificial Intelligence Architect",
      startDate: "Oct 2021",
      endDate: "Present",
      totalDuration: "2 years 3 months",
      description:
        "I was the Product Owner of “Intelligent Navigation”; a workstream of digital products for helping learners navigate the Te Pūkenga network. Here I architected, designed and was lead developer for our full-stack solutions. Creating modular applications that were scalable and embeddable. I centralised elements of Te Pūkenga’s data into a layer able to be leveraged by AI APIs, a Customer Data Platform, a CMS and a complete integration design pattern, all for the purpose of accessing and transforming real-time data in intelligent ways for learners.",
      hightlights: ["Product Owner", "Lead Developer"],
    },
    "cz-digital-experience-lead": {
      company: "Competenz",
      position: "Digital Experience Lead",
      startDate: "Oct 2021",
      endDate: "Jun 2022",
      totalDuration: "9 months",
      description:
        "Ownership of the customer's digital experience from ad channels to the website, from lead nurture through to conversion. My time at Competenz was focused on building a micro-services architecture to scale personalised experiences driven by data. We automated nurture funnels that set unqualified learners up with recruitment coaching that integrated with our digital systems. We rebuilt content delivery systems to suit the micro-campaign strategy of the organisation.",
      hightlights: ["UX Management"],
    },

    "cz-digital-marketing-lead": {
      company: "Competenz",
      position: "Digital Marketing Lead",
      startDate: "Feb 2021",
      endDate: "Oct 2021",
      totalDuration: "9 months",
      description:
        "All things digital marketing for New Zealand's largest Industry Training Organisation – using data to maximise ad spend across 32 discreet industry sectors. We used behavioural metadata to create distinct IDs and follow cross-channel engagement – the kind of thing a CDP does out-of-the-box I set up through semi-automated integrations with the technology we had available.",
      hightlights: ["Digital Channels"],
    },
    "cz-digital-marketing-executive": {
      company: "Competenz",
      position: "Digital Marketing Executive",
      startDate: "Oct 2019",
      endDate: "Feb 2021",
      totalDuration: "1 year 5 months",
      description:
        "As a Digital Marketing Executive, I collaborated with agencies and internal teams to execute strategically aligned digital campaigns. I tracked key metrics to measure campaign success and derive insights for potential improvements. My duties included managing social media, optimizing SEO, and developing digital marketing content. This role honed my skills in digital marketing and paved the way for my transition to the Digital Marketing Lead role.",
      hightlights: ["Marketing"],
    },
    "uxbridge-arts-culture": {
      company: "UXBRIDGE | Arts & Culture",
      position: "Operations Assistant",
      startDate: "May 2015",
      endDate: "Aug 2019",
      totalDuration: "4 years 4 months",
      description:
        "Providing essential assistance in coordinating and executing our organisations' studios, gallery, and event activities.",
      hightlights: ["Operations"],
    },
  },
  education: [
    {
      institution: "Auckland University of Technology",
      qualification: "Bachelor of Communications Studies",
      details: "Major in Creative Industries, Minor in Advertising",
      startDate: "2016",
      endDate: "2018",
    },
  ],
  skills: [
    "React",
    "Javascript",
    "Figma",
    "CSS",
    "Node",
    "PostgreSQL",
    "AI Finetuning",
    "User research"
  ],
}