import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import RescheduleModal from "../components/booking/RescheduleModal";
import SEO from "../components/SEO";
import ConfirmCancelModal from "../components/booking/ConfirmCancelModal";

const statusLabels = {
  pending: "در انتظار تأیید",
  confirmed: "تأییدشده",
  cancelled: "لغوشده",
  completed: "انجام‌شده",
};

const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-charcoal/10 text-charcoal-2",
};

export default function MyAppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [rescheduling, setRescheduling] = useState(null);
const [cancelling, setCancelling] = useState(null);

  const fetchAppointments = () => {
    supabase
      .from("appointments")
      .select(
        `*, services ( title, price, duration_minutes ), stylists ( name )`
      )
      .eq("user_id", user.id)
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true })
      .then(({ data }) => {
        setAppointments(data || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  const confirmCancel = async () => {
    const id = cancelling;
    setCancellingId(id);
    await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", id);
    setCancellingId(null);
    setCancelling(null);
    fetchAppointments();
  };

  const todayIso = new Date().toISOString().slice(0, 10);

  const upcoming = appointments.filter(
    (a) =>
      a.appointment_date >= todayIso &&
      (a.status === "pending" || a.status === "confirmed")
  );
  const history = appointments.filter(
    (a) =>
      a.appointment_date < todayIso ||
      a.status === "cancelled" ||
      a.status === "completed"
  );

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto px-8 py-20">
        <p className="text-charcoal-2 text-sm">در حال بارگذاری نوبت‌ها...</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-8 py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-charcoal-2 hover:text-charcoal transition-colors mb-8"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
        بازگشت به صفحه اصلی
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl mb-2">نوبت‌های من</h1>
        <p className="text-charcoal-2 text-sm mb-8">
          نوبت‌هایی که ثبت کردی رو اینجا می‌بینی و می‌تونی مدیریتشون کنی.
        </p>

        {appointments.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-10">
            <div className="bg-cream-2 rounded-sm p-4 text-center">
              <div className="font-display text-2xl text-rose-deep mb-1">
                {upcoming.length}
              </div>
              <div className="text-[12px] text-charcoal-2">نوبت پیش‌رو</div>
            </div>
            <div className="bg-cream-2 rounded-sm p-4 text-center">
              <div className="font-display text-2xl mb-1">
                {appointments.filter((a) => a.status === "completed").length}
              </div>
              <div className="text-[12px] text-charcoal-2">انجام‌شده</div>
            </div>
            <div className="bg-cream-2 rounded-sm p-4 text-center">
              <div className="font-display text-2xl mb-1">
                {appointments.length}
              </div>
              <div className="text-[12px] text-charcoal-2">مجموع نوبت‌ها</div>
            </div>
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-charcoal/15 rounded-sm">
            <div className="w-14 h-14 rounded-full bg-cream-2 text-rose-deep flex items-center justify-center mx-auto mb-5 text-xl">
              ✂
            </div>
            <h2 className="font-display text-xl mb-2">هنوز نوبتی نداری</h2>
            <p className="text-charcoal-2 text-sm mb-7 max-w-xs mx-auto">
              اولین نوبتت رو بگیر تا اینجا نمایش داده بشه.
            </p>
            <Link
              to="/booking"
              className="inline-block bg-rose-deep text-cream px-8 py-3 text-sm hover:bg-[#7f4448] transition-colors"
            >
              رزرو نوبت
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {upcoming.length > 0 && (
              <div>
                <h2 className="text-sm text-charcoal-2 mb-4">
                  نوبت‌های پیش‌رو
                </h2>
                <div className="space-y-3">
                  {upcoming.map((a, i) => (
                    <AppointmentCard
                      key={a.id}
                      appointment={a}
                      index={i}
                      canManage
                      onCancel={() => setCancelling(a.id)}
                      onReschedule={
                        a.status === "pending" ? () => setRescheduling(a) : null
                      }
                      cancelling={cancellingId === a.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div>
                <h2 className="text-sm text-charcoal-2 mb-4">تاریخچه</h2>
                <div className="space-y-3">
                  {history.map((a, i) => (
                    <AppointmentCard
                      key={a.id}
                      appointment={a}
                      index={i}
                      canManage={false}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 text-center">
              <Link
                to="/booking"
                className="inline-block border border-charcoal/20 text-charcoal px-8 py-3 text-sm hover:border-charcoal/40 transition-colors"
              >
                + رزرو نوبت جدید
              </Link>
            </div>
          </div>
        )}
      </motion.div>

      {rescheduling && (
        <RescheduleModal
          appointment={rescheduling}
          onClose={() => setRescheduling(null)}
          onDone={() => {
            setRescheduling(null);
            fetchAppointments();
          }}
        />
      )}
      {cancelling && (
        <ConfirmCancelModal
          cancelling={cancellingId === cancelling}
          onClose={() => setCancelling(null)}
          onConfirm={confirmCancel}
        />
      )}
    </section>
  );
}

function AppointmentCard({
  appointment: a,
  index,
  canManage,
  onCancel,
  onReschedule,
  cancelling,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-charcoal/10 rounded-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <SEO
        title="نوبت‌های من"
        description="مشاهده و مدیریت نوبت‌های رزروشده‌ت."
      />
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="text-[16px]">{a.services?.title}</h3>
          <span
            className={`text-[11px] px-2.5 py-1 rounded-full ${
              statusStyles[a.status]
            }`}
          >
            {statusLabels[a.status]}
          </span>
        </div>
        <p className="text-[13.5px] text-charcoal-2">
          استایلیست: {a.stylists?.name} —{" "}
          {new Date(a.appointment_date).toLocaleDateString("fa-IR", {
            day: "numeric",
            month: "long",
          })}{" "}
          ساعت {a.appointment_time?.slice(0, 5)}
        </p>
        {a.services?.price && (
          <p className="text-[13px] text-rose-deep mt-1">
            {a.services.price.toLocaleString("fa-IR", { useGrouping: false })}{" "}
            تومان
          </p>
        )}
      </div>

      {canManage && (
        <div className="flex gap-2 shrink-0">
          {onReschedule && (
            <button
              onClick={onReschedule}
              className="px-4 py-2 text-[13px] border border-charcoal/20 rounded-sm hover:border-charcoal/40 transition-colors"
            >
              تغییر زمان
            </button>
          )}
          <button
            onClick={onCancel}
            disabled={cancelling}
            className="px-4 py-2 text-[13px] border border-red-200 text-red-700 rounded-sm hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            {cancelling ? "در حال لغو..." : "لغو نوبت"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
