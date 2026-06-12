import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import JobsSidebar from "../components/jobs/JobsSidebar";
import JobsTopbar from "../components/jobs/JobsTopbar";
import JobsHero from "../components/jobs/JobsHero";
import CategoryStrip from "../components/jobs/CategoryStrip";
import HiringBar from "../components/jobs/HiringBar";
import FilterPanel from "../components/jobs/FilterPanel";
import JobAlertBanner from "../components/jobs/JobAlertBanner";
import FeaturedJobs from "../components/jobs/FeaturedJobs";
import JobRow from "../components/jobs/JobRow";
import SalaryInsights from "../components/jobs/SalaryInsights";
import ExploreGraph from "../components/jobs/ExploreGraph";

const EMPTY_FILTERS = {
  job_type: [],
  work_mode: [],
  experience: [],
  funding_stage: [],
  region: [],
};

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Jobs");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [salaryMin, setSalaryMin] = useState("");
  const [sort, setSort] = useState("recent");
  const [saved, setSaved] = useState([]);
  const [visible, setVisible] = useState(8);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => base44.entities.Job.list("posted_hours_ago", 200),
  });

  const toggle = (key, opt) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(opt) ? f[key].filter((o) => o !== opt) : [...f[key], opt],
    }));

  const clearAll = () => {
    setFilters(EMPTY_FILTERS);
    setSalaryMin("");
    setCategory("All Jobs");
    setSearch("");
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let out = jobs.filter((j) => {
      if (category !== "All Jobs" && j.category !== category) return false;
      for (const key of Object.keys(filters)) {
        if (filters[key].length && !filters[key].includes(j[key])) return false;
      }
      if (salaryMin && (j.salary_max || 0) < Number(salaryMin)) return false;
      if (q) {
        const hay = `${j.title} ${j.company} ${j.location} ${j.category} ${(j.tags || []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "salary") out = [...out].sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0));
    else out = [...out].sort((a, b) => (a.posted_hours_ago || 0) - (b.posted_hours_ago || 0));
    return out;
  }, [jobs, category, filters, salaryMin, search, sort]);

  const counts = useMemo(() => {
    const c = {};
    Object.keys(EMPTY_FILTERS).forEach((key) => {
      c[key] = {};
      jobs.forEach((j) => {
        if (j[key]) c[key][j[key]] = (c[key][j[key]] || 0) + 1;
      });
    });
    return c;
  }, [jobs]);

  const categories = useMemo(() => {
    const byCat = {};
    jobs.forEach((j) => { byCat[j.category] = (byCat[j.category] || 0) + 1; });
    return [
      { name: "All Jobs", count: jobs.length },
      ...Object.entries(byCat)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count })),
    ];
  }, [jobs]);

  const hiringCompanies = useMemo(() => {
    const byCo = {};
    jobs.forEach((j) => {
      if (!byCo[j.company])
        byCo[j.company] = { name: j.company, count: 0, color: j.logo_color || "#111827" };
      byCo[j.company].count++;
    });
    return Object.values(byCo).sort((a, b) => b.count - a.count).slice(0, 8);
  }, [jobs]);

  const featured = filtered.filter((j) => j.featured);
  const list = filtered.filter((j) => !j.featured);

  const onSave = (id) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="flex min-h-screen bg-[#F3F5F7] text-[13px] text-gray-900 font-body antialiased">
      <JobsSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <JobsTopbar search={search} setSearch={setSearch} savedCount={saved.length} />
        <main className="flex-1 px-4 md:px-6 py-5 pb-12 max-w-[1400px] w-full mx-auto">
          <JobsHero
            search={search}
            setSearch={setSearch}
            total={jobs.length ? 12418 : 0}
            featured={jobs.filter((j) => j.featured)}
          />
          <CategoryStrip categories={categories} active={category} setActive={setCategory} />
          <HiringBar companies={hiringCompanies} onSelect={(name) => setSearch(name)} />

          <div className="grid lg:grid-cols-[210px,minmax(0,1fr)] gap-4 items-start">
            <FilterPanel
              filters={filters}
              toggle={toggle}
              clearAll={clearAll}
              counts={counts}
              salaryMin={salaryMin}
              setSalaryMin={setSalaryMin}
            />
            <div>
              <JobAlertBanner />
              <FeaturedJobs jobs={featured.slice(0, 4)} />

              <div className="flex items-end justify-between mb-2.5">
                <div>
                  <h2 className="text-[15px] font-bold tracking-tight">All open roles</h2>
                  <div className="text-[11.5px] text-gray-400 mt-0.5">
                    {filtered.length} matching position{filtered.length !== 1 ? "s" : ""} · Updated just now
                  </div>
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none cursor-pointer"
                >
                  <option value="recent">Most recent</option>
                  <option value="salary">Highest salary</option>
                </select>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {isLoading ? (
                  <div className="py-16 text-center text-gray-400 text-sm">Loading roles…</div>
                ) : list.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-1">No roles match your filters</div>
                    <button onClick={clearAll} className="text-xs text-[#D92B2B] font-medium hover:underline">
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  list.slice(0, visible).map((j) => (
                    <JobRow key={j.id} job={j} saved={saved.includes(j.id)} onSave={onSave} />
                  ))
                )}
              </div>

              {list.length > visible && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setVisible((v) => v + 8)}
                    className="px-7 py-2 border border-gray-200 rounded-lg bg-white text-[13px] text-gray-600 font-medium hover:border-[#D92B2B] hover:text-[#D92B2B] hover:bg-red-50 transition-colors"
                  >
                    Load more roles
                  </button>
                </div>
              )}

              <div className="mt-4">
                <SalaryInsights jobs={jobs} />
              </div>
            </div>
          </div>

          <ExploreGraph />
        </main>
      </div>
    </div>
  );
}
