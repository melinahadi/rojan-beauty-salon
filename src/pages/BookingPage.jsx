import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import StepIndicator from "../components/booking/StepIndicator";
import ServiceStep from "../components/booking/ServiceStep";
import StylistStep from "../components/booking/StylistStep";
import DateTimeStep from "../components/booking/DateTimeStep";
import ConfirmStep from "../components/booking/ConfirmStep";
import BookingSummary from "../components/booking/BookingSummary";
import SEO from "../components/SEO";
import { useSearchParams } from "react-router-dom";
import { useServices } from "../hooks/useServices";

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [stylist, setStylist] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get("service");
  const { services } = useServices();

  useEffect(() => {
    if (!preselectedServiceId || service) return;

    const match = services.find((s) => s.id === preselectedServiceId);
    if (!match) return;

    queueMicrotask(() => {
      setService(match);
      setStep(1);
    });
  }, [preselectedServiceId, services, service]);

  const canGoNext =
    (step === 0 && service) ||
    (step === 1 && stylist) ||
    (step === 2 && date && time);

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");

    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      service_id: service.id,
      stylist_id: stylist.id,
      appointment_date: date,
      appointment_time: time,
      notes: notes || null,
    });

    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        setSubmitError(
          "این ساعت همین الان توسط شخص دیگه‌ای رزرو شد. لطفاً یه ساعت دیگه انتخاب کن."
        );
        setStep(2); // برگردون به مرحله انتخاب تاریخ/ساعت
        setTime(null); // ساعت انتخابی رو خالی کن تا مجبور بشه دوباره انتخاب کنه
      } else {
        setSubmitError("مشکلی پیش اومد، دوباره تلاش کن.");
      }
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <section className="min-h-[75vh] flex items-center justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-rose-deep/10 text-rose-deep flex items-center justify-center mx-auto mb-6 text-2xl">
            ✓
          </div>
          <h1 className="font-display text-3xl mb-3">نوبتت ثبت شد</h1>
          <p className="text-charcoal-2 mb-8 max-w-sm">
            به‌زودی برای تأیید نهایی باهات تماس می‌گیریم. منتظرت هستیم.
          </p>

          <p className="text-charcoal-2 text-sm mb-4">
            می‌خوای سرویس دیگه‌ای هم وقت بگیری؟
          </p>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => {
                setService(null);
                setStylist(null);
                setDate(null);
                setTime(null);
                setNotes("");
                setStep(0);
                setDone(false);
              }}
              className="bg-rose-deep text-cream px-10 py-3.5 text-sm hover:bg-[#7f4448] transition-colors cursor-pointer"
            >
              بله، یه نوبت دیگه هم بگیر
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-sm text-charcoal-2 hover:text-charcoal underline underline-offset-4 decoration-charcoal/25 hover:decoration-charcoal transition-colors cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-8 py-16 min-h-[80vh]">
      <SEO
        title="رزرو نوبت"
        description="نوبت خودت رو برای خدمات روژان آنلاین رزرو کن."
      />
      <StepIndicator current={step} />

      <div className="grid md:grid-cols-[1fr_280px] gap-12">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <ServiceStep
                  selected={service}
                  onSelect={(s) => {
                    setService(s);
                    goNext();
                  }}
                />
              )}
              {step === 1 && (
                <StylistStep
                  serviceId={service?.id}
                  selected={stylist}
                  onSelect={(s) => {
                    setStylist(s);
                    goNext();
                  }}
                />
              )}
              {step === 2 && (
                <DateTimeStep
                  stylistId={stylist?.id}
                  durationMinutes={service?.duration_minutes}
                  date={date}
                  time={time}
                  onSelectDate={(d) => {
                    setDate(d);
                    setTime(null);
                  }}
                  onSelectTime={setTime}
                />
              )}
              
              {step === 3 && (
                <ConfirmStep
                  service={service}
                  stylist={stylist}
                  date={date}
                  time={time}
                  notes={notes}
                  onNotesChange={setNotes}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <p className="text-[13px] text-red-700 bg-red-50 border border-red-100 rounded-sm px-3 py-2 mt-4">
              {submitError}
            </p>
          )}

          <div className="flex justify-between mt-10">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="text-sm text-charcoal-2 hover:text-charcoal transition-colors disabled:opacity-0 cursor-pointer"
            >
              ← مرحله قبل
            </button>

            {step < 2 && (
              <button
                onClick={goNext}
                disabled={!canGoNext}
                className="bg-charcoal text-cream px-8 py-3 text-sm hover:bg-rose-deep transition-colors disabled:opacity-30 disabled:hover:bg-charcoal cursor-pointer"
              >
                مرحله بعد
              </button>
            )}
            {step === 2 && (
              <button
                onClick={goNext}
                disabled={!canGoNext}
                className="bg-charcoal text-cream px-8 py-3 text-sm hover:bg-rose-deep transition-colors disabled:opacity-30 disabled:hover:bg-charcoal cursor-pointer"
              >
                مرحله بعد
              </button>
            )}
            {step === 3 && (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-rose-deep text-cream px-8 py-3 text-sm hover:bg-[#7f4448] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "در حال ثبت..." : "ثبت نهایی نوبت"}
              </button>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <BookingSummary
            service={service}
            stylist={stylist}
            date={date}
            time={time}
          />
        </div>
      </div>
    </section>
  );
}
