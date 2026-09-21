import { useEffect, useState, useMemo } from "react";

import { supabase } from "../../lib/supabaseClient";

import { DatePicker } from "@jalali-js/react";
import "@jalali-js/react/date-picker.css";

import Dropdown from "../../components/ui/Dropdown";

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

const filters = ["all", "pending", "confirmed", "cancelled", "completed"];

const sortOptions = [
  { value: "created_desc", label: "جدیدترین ثبت‌شده" },
  { value: "created_asc", label: "قدیمی‌ترین ثبت‌شده" },
  { value: "appt_asc", label: "نزدیک‌ترین تاریخ نوبت" },
  { value: "appt_desc", label: "دورترین تاریخ نوبت" },
];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [justUpdated, setJustUpdated] = useState(false);
  const [search, setSearch] = useState("");
  const [stylistFilter, setStylistFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("created_desc");

  const fetchAppointments = () => {
    supabase
      .from("appointments")
      .select(
        `
        *,
        services ( id, title, price ),
        stylists ( id, name ),
        profiles ( full_name, phone )
      `
      )
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setAppointments(data || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();

    supabase
      .from("services")
      .select("id, title")
      .then(({ data }) => setServices(data || []));

    supabase
      .from("stylists")
      .select("id, name")
      .then(({ data }) => setStylists(data || []));

    const channel = supabase
      .channel("admin-appointments-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => {
          fetchAppointments();
          setJustUpdated(true);
          setTimeout(() => setJustUpdated(false), 1500);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("appointments").update({ status }).eq("id", id);
    fetchAppointments();
  };

  const counts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  const visible = useMemo(() => {
    let list =
      filter === "all"
        ? appointments
        : appointments.filter((a) => a.status === filter);

    if (search.trim()) {
      const q = search.trim();
      list = list.filter(
        (a) =>
          a.profiles?.full_name?.includes(q) ||
          a.profiles?.phone?.includes(q)
      );
    }

    if (stylistFilter !== "all") {
      list = list.filter((a) => a.stylist_id === stylistFilter);
    }

    if (serviceFilter !== "all") {
      list = list.filter((a) => a.service_id === serviceFilter);
    }

    if (fromDate) {
      list = list.filter((a) => a.appointment_date >= fromDate);
    }

    if (toDate) {
      list = list.filter((a) => a.appointment_date <= toDate);
    }

    const sorted = [...list];

    switch (sortBy) {
      case "created_asc":
        sorted.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;

      case "created_desc":
        sorted.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;

      case "appt_asc":
        sorted.sort((a, b) =>
          (a.appointment_date + a.appointment_time).localeCompare(
            b.appointment_date + b.appointment_time
          )
        );
        break;

      case "appt_desc":
        sorted.sort((a, b) =>
          (b.appointment_date + b.appointment_time).localeCompare(
            a.appointment_date + a.appointment_time
          )
        );
        break;
    }

    return sorted;
  }, [
    appointments,
    filter,
    search,
    stylistFilter,
    serviceFilter,
    fromDate,
    toDate,
    sortBy,
  ]);

  const activeFilterCount =
    (search.trim() ? 1 : 0) +
    (stylistFilter !== "all" ? 1 : 0) +
    (serviceFilter !== "all" ? 1 : 0) +
    (fromDate ? 1 : 0) +
    (toDate ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setStylistFilter("all");
    setServiceFilter("all");
    setFromDate("");
    setToDate("");
  };

  return (
    <div>
      <h1 className="font-display text-2xl mb-8">مدیریت نوبت‌ها</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === f
                ? "bg-charcoal text-cream"
                : "bg-cream text-charcoal-2 hover:text-charcoal border border-charcoal/10"
            }`}
          >
            {f === "all" ? "همه" : statusLabels[f]} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="bg-cream border border-charcoal/10 rounded-sm p-5 mb-6 space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="جستجوی نام یا شماره مشتری"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-charcoal/20 rounded-sm px-3.5 py-2.5 text-sm bg-transparent focus:outline-none focus:border-rose-deep"
          />

          <Dropdown
            value={stylistFilter}
            onChange={setStylistFilter}
            placeholder="همه استایلیست‌ها"
            options={[
              { value: "all", label: "همه استایلیست‌ها" },
              ...stylists.map((s) => ({ value: s.id, label: s.name })),
            ]}
          />

          <Dropdown
            value={serviceFilter}
            onChange={setServiceFilter}
            placeholder="همه سرویس‌ها"
            options={[
              { value: "all", label: "همه سرویس‌ها" },
              ...services.map((s) => ({ value: s.id, label: s.title })),
            ]}
          />

          <Dropdown
            value={sortBy}
            onChange={setSortBy}
            placeholder="مرتب‌سازی"
            options={sortOptions}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-[13px] text-charcoal-2">از تاریخ</label>

            <DatePicker
              system="jalali"
              locale="fa"
              valueFormat="gregorian-iso"
              placeholder="انتخاب تاریخ"
              onChange={(value) => setFromDate(value || "")}
              className="admin-datepicker"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-[13px] text-charcoal-2">تا تاریخ</label>

            <DatePicker
              system="jalali"
              locale="fa"
              valueFormat="gregorian-iso"
              placeholder="انتخاب تاریخ"
              onChange={(value) => setToDate(value || "")}
              className="admin-datepicker"
            />
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-[13px] text-rose-deep hover:text-rose-800 transition-colors mr-auto"
            >
              حذف فیلترها ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {justUpdated && (
        <div className="mb-4 text-[13px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-sm px-3 py-2">
          لیست نوبت‌ها به‌روزرسانی شد
        </div>
      )}

      {loading ? (
        <p className="text-charcoal-2 text-sm">در حال بارگذاری...</p>
      ) : visible.length === 0 ? (
        <p className="text-charcoal-2 text-sm">
          نوبتی با این فیلترها پیدا نشد.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-[13px] text-charcoal-2 mb-2">
            {visible.length} نوبت
          </p>

          {visible.map((a) => (
            <div
              key={a.id}
              className="bg-cream border border-charcoal/10 rounded-sm p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-[15px]">
                    {a.profiles?.full_name || "بدون نام"}
                  </span>

                  <span className="text-[13px] text-charcoal-2" dir="ltr">
                    {a.profiles?.phone || "—"}
                  </span>

                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-full ${
                      statusStyles[a.status]
                    }`}
                  >
                    {statusLabels[a.status]}
                  </span>
                </div>

                <div className="text-[13.5px] text-charcoal-2 flex flex-wrap gap-x-4">
                  <span>{a.services?.title}</span>

                  <span>استایلیست: {a.stylists?.name}</span>

                  <span>
                    {new Date(a.appointment_date).toLocaleDateString("fa-IR", {
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    — {a.appointment_time?.slice(0, 5)}
                  </span>
                </div>

                {a.notes && (
                  <p className="text-[13px] text-charcoal-2/80 mt-2">
                    یادداشت: {a.notes}
                  </p>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                {a.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(a.id, "confirmed")}
                      className="px-4 py-2 text-[13px] bg-emerald-600 text-white rounded-sm hover:bg-emerald-700 transition-colors"
                    >
                      تأیید
                    </button>

                    <button
                      onClick={() => updateStatus(a.id, "cancelled")}
                      className="px-4 py-2 text-[13px] border border-red-200 text-red-700 rounded-sm hover:bg-red-50 transition-colors"
                    >
                      لغو
                    </button>
                  </>
                )}

                {a.status === "confirmed" && (
                  <>
                    <button
                      onClick={() => updateStatus(a.id, "completed")}
                      className="px-4 py-2 text-[13px] bg-charcoal text-cream rounded-sm hover:bg-rose-deep transition-colors"
                    >
                      انجام شد
                    </button>

                    <button
                      onClick={() => updateStatus(a.id, "cancelled")}
                      className="px-4 py-2 text-[13px] border border-red-200 text-red-700 rounded-sm hover:bg-red-50 transition-colors"
                    >
                      لغو
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
