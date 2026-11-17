import { useState } from "react";
import { useAdminStylists } from "../../hooks/useAdminStylists";
import StylistModal from "../../components/admin/StylistModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import ScheduleModal from "../../components/admin/ScheduleModal";

export default function AdminStylists() {
  const { stylists, loading, addStylist, updateStylist, deleteStylist } =
    useAdminStylists();
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [scheduling, setScheduling] = useState(null);

  const handleSave = (values, serviceIds) =>
    editing
      ? updateStylist(editing.id, values, serviceIds)
      : addStylist(values, serviceIds);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="font-display text-2xl">مدیریت استایلیست‌ها</h1>
        <button
          onClick={() => setCreating(true)}
          className="bg-charcoal text-cream px-5 py-2.5 text-sm hover:bg-rose-deep transition-colors whitespace-nowrap"
        >
          + استایلیست جدید
        </button>
      </div>

      {loading ? (
        <p className="text-charcoal-2 text-sm">در حال بارگذاری...</p>
      ) : stylists.length === 0 ? (
        <p className="text-charcoal-2 text-sm">هنوز استایلیستی ثبت نشده.</p>
      ) : (
        <div className="space-y-3">
          {stylists.map((s) => (
            <div
              key={s.id}
              className="bg-cream border border-charcoal/10 rounded-sm p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <h3 className="text-[15px] mb-1">{s.name}</h3>
                <p className="text-[13px] text-rose-deep">{s.role}</p>
                <p className="text-[12px] text-charcoal-2 mt-1 whitespace-nowrap">
                  {s.stylist_services?.length || 0} خدمت مرتبط
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 md:flex md:shrink-0">
                <button
                  onClick={() => setEditing(s)}
                  className="px-2.5 py-1.5 md:px-4 md:py-2 text-[12px] md:text-[13px] whitespace-nowrap border border-charcoal/20 rounded-sm hover:border-charcoal/40 transition-colors"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => setScheduling(s)}
                  className="px-2.5 py-1.5 md:px-4 md:py-2 text-[12px] md:text-[13px] whitespace-nowrap border border-charcoal/20 rounded-sm hover:border-charcoal/40 transition-colors"
                >
                  برنامه کاری
                </button>
                <button
                  onClick={() => setDeleting(s)}
                  className="px-2.5 py-1.5 md:px-4 md:py-2 text-[12px] md:text-[13px] whitespace-nowrap border border-red-200 text-red-700 rounded-sm hover:bg-red-50 transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <StylistModal
          stylist={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

      {deleting && (
        <ConfirmDeleteModal
          title={deleting.name}
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteStylist(deleting.id);
            setDeleting(null);
          }}
        />
      )}

      {scheduling && (
        <ScheduleModal
          stylist={scheduling}
          onClose={() => setScheduling(null)}
        />
      )}
    </div>
  );
}
