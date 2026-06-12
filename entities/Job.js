export const JobSchema = {
  name: "Job",
  type: "object",
  properties: {
    title: { type: "string", description: "Job title" },
    company: { type: "string", description: "Company name" },
    logo_bg: { type: "string", description: "Tailwind-safe hex background for logo chip" },
    logo_color: { type: "string", description: "Hex text color for logo chip" },
    location: { type: "string", description: "City / region" },
    category: {
      type: "string",
      enum: ["AI Agents","AI Coding","AI Infrastructure","AI Security","AI Healthcare","AI Finance","Robotics","AI Search","Legal AI","Generative AI","AI Data","AI Sales"],
      description: "Primary category"
    },
    job_type: { type: "string", enum: ["Full-time","Part-time","Contract","Internship"] },
    work_mode: { type: "string", enum: ["Remote","Hybrid","On-site"] },
    experience: { type: "string", enum: ["Entry level","Mid-level","Senior","Lead / Staff"] },
    funding_stage: { type: "string", enum: ["Seed","Series A-B","Series C+","Public"] },
    region: { type: "string", enum: ["Worldwide","North America","Europe","Asia-Pacific","India"] },
    salary_min: { type: "number", description: "Annual salary minimum (USD thousands)" },
    salary_max: { type: "number", description: "Annual salary maximum (USD thousands)" },
    currency: { type: "string", default: "$" },
    tags: { type: "array", items: { type: "string" }, description: "Skill tags" },
    featured: { type: "boolean", default: false },
    badge: { type: "string", enum: ["Hot","New","Remote","Featured",""], description: "Card badge" },
    posted_hours_ago: { type: "number", description: "Hours since posting" }
  },
  required: ["title", "company", "category"]
};
