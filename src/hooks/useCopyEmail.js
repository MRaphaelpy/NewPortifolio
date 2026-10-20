import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { site } from "../config/site";

export const useCopyEmail = () => {
  const { t } = useTranslation();

  return async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast.success(t("contact.emailCopied"));
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
};
