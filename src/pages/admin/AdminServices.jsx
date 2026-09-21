import { useState } from "react";
import { useAdminServices } from "../../hooks/useAdminServices";
import ServiceModal from "../../components/admin/ServiceModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

export default function AdminServices() {
  const { services, loading, addService, updateService, deleteService } =
    useAdminServices();
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleSave = (values) =>
    editing ? updateService(editing.id, values) : addService(values);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">مدیریت خدمات</h1>
        <button
          onClick={() => setCreating(true)}
          className="bg-charcoal text-cream px-5 py-2.5 text-sm hover:bg-rose-deep transition-colors"
        >
          + خدمت جدید
        </button>
      </div>

      {loading ? (
        <p className="text-charcoal-2 text-sm">در حال بارگذاری...</p>
      ) : services.length === 0 ? (
        <p className="text-charcoal-2 text-sm">هنوز خدمتی ثبت نشده.</p>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-cream border border-charcoal/10 rounded-sm p-5 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-[15px] mb-1">{s.title}</h3>
                <p className="text-[13px] text-charcoal-2">
                  {s.price.toLocaleString("fa-IR", { useGrouping: false })}{" "}
                  تومان — حدود {s.duration_minutes} دقیقه
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditing(s)}
                  className="px-4 py-2 text-[13px] border border-charcoal/20 rounded-sm hover:border-charcoal/40 transition-colors"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => setDeleting(s)}
                  className="px-4 py-2 text-[13px] border border-red-200 text-red-700 rounded-sm hover:bg-red-50 transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <ServiceModal
          service={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

      {deleting && (
        <ConfirmDeleteModal
          title={deleting.title}
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteService(deleting.id);
            setDeleting(null);
          }}
        />
      )}
    </div>
  );
}
