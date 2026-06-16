import Link from "next/link";

interface Props {
  id: string; name: string; description: string;
  icon: string; color: string; bgColor: string;
}

const ICONS: Record<string, React.ReactNode> = {
  agents: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>,
  coding: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
  search: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  infra:  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/><circle cx="6" cy="5.5" r="1" fill="currentColor"/><circle cx="6" cy="12.5" r="1" fill="currentColor"/><circle cx="6" cy="19" r="1" fill="currentColor"/></svg>,
  security:<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>,
  health: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

export default function CategoryCard({ id, name, description, icon, color, bgColor }: Props) {
  return (
    <Link href={`/startups/category/${id}`}
      className="
bg-white
border
border-[#EBEBEB]
rounded-2xl
p-4
min-w-0
flex
flex-col
items-center
text-center
hover:shadow-md
hover:border-[#D5D5D5]
transition-all
duration-200
group
">
      <div className="w-15 h-15 rounded-xl flex items-center justify-center mb-3" style={{ background: bgColor, color }}>
        {ICONS[icon]}
      </div>
      <h3 className="text-[13px] font-semibold text-[#1A1A1A] mb-1.5">{name}</h3>
      <p className="
text-[11px]
text-[#9CA3AF]
leading-relaxed
mb-4
flex-1
line-clamp-2
overflow-hidden
">{description}</p>
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] group-hover:scale-110 transition-transform"
        style={{ background: color }}>→</div>
    </Link>
  );
}
