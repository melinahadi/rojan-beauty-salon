import Reveal from "../ui/Reveal";
export default function Testimonial() {
  return (
    <section className="py-32 text-center">
      <Reveal >
        <div className="max-w-6xl mx-auto px-8">
          <blockquote className="font-display text-2xl md:text-3xl leading-relaxed max-w-3xl mx-auto mb-6">
            «اولین‌باری که رفتم فقط برای کوتاهی بود، ولی الان دو ساله فقط روژان
            می‌رم. هم دقت کارشون هم آرامش فضاش، فرقی با بقیه جاها داره.»
          </blockquote>
          <cite className="not-italic text-sm text-charcoal-2">
            — الهام رضایی، مشتری دائمی
          </cite>
        </div>
      </Reveal>
    </section>
  );
}
