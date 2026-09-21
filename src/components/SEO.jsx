import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }) {
  const fullTitle = title
    ? `${title} | روژان`
    : "روژان | آرایشگاه زنانه ";
  const desc =
    description ||
    "آرایشگاه زنانه روژان — رنگ، کوتاهی، کراتینه، شینیون عروس و مراقبت پوست، با رزرو آنلاین نوبت.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
    </Helmet>
  );
}
