import { projects as fallbackProjects } from "./content";

function normalizeTechStack(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeUrl(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeGalleryUrls(value) {
  const urls = Array.isArray(value) ? value : [];
  return urls.map(normalizeUrl).filter(Boolean);
}

function normalizeProject(project, index) {
  const title = project.title || `Project ${index + 1}`;
  const tech = normalizeTechStack(project.tech_stack ?? project.tech);
  const description = project.description || project.details || "";
  const id = project.id ? String(project.id).replace(/^0+(?=\d)/, "") : String(index + 1);
  const displayId = String(id).padStart(2, "0");
  const imageUrl = normalizeUrl(project.image_url);

  return {
    ...project,
    id,
    display_id: displayId,
    title,
    subtitle: project.subtitle || project.description || "",
    description,
    details: project.details || description,
    category: project.category || "Project",
    image_url: imageUrl,
    scope: project.scope || [project.category].filter(Boolean),
    tech,
    tech_stack: tech,
    demo_url: normalizeUrl(project.demo_url),
    gallery_urls: normalizeGalleryUrls(project.gallery_urls),
    role: project.role || project.category || "Project",
    features: project.features || []
  };
}

export function normalizeProjects(projects) {
  return projects.map((project, index) => normalizeProject(project, index));
}

export function getFallbackProjects() {
  return normalizeProjects(fallbackProjects);
}

export async function getProjects() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return getFallbackProjects();
  }

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/projects?select=id,image_url,title,subtitle,description,tech_stack,category,demo_url,gallery_urls&order=id.asc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        },
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase projects request failed: ${response.status}`);
    }

    const projects = await response.json();
    return normalizeProjects(projects);
  } catch (error) {
    console.error(error);
    return getFallbackProjects();
  }
}

export async function getProjectById(id) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return getFallbackProjects().find((project) => project.id === String(id));
  }

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/projects?select=id,image_url,title,subtitle,description,tech_stack,category,demo_url,gallery_urls&id=eq.${encodeURIComponent(id)}&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        },
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase project detail request failed: ${response.status}`);
    }

    const projects = await response.json();
    return normalizeProjects(projects)[0];
  } catch (error) {
    console.error(error);
    return getFallbackProjects().find((project) => project.id === String(id));
  }
}
