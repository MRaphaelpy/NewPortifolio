import { TbBrandGithub, TbBrandLinkedin, TbMail } from "react-icons/tb";
import { site } from "../config/site";

export const contacts = [
  {
    id: "email",
    Icon: TbMail,
    href: `mailto:${site.email}`,
    text: site.email,
  },
  {
    id: "linkedin",
    Icon: TbBrandLinkedin,
    href: site.linkedinUrl,
    text: "linkedin.com/in/mraphaelpy",
    external: true,
  },
  {
    id: "github",
    Icon: TbBrandGithub,
    href: site.githubUrl,
    text: "github.com/MRaphaelpy",
    external: true,
  },
];
