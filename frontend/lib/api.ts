import { destinations, mockHotels, mockRestaurants, mockAttractions } from "./mockData";

const BACKEND_URL = "http://localhost:8000/api";

// Dynamic flag to check if the backend is connected
let isBackendOnline = false;

// Quick connection health check
async function checkBackendHealth() {
  try {
    const res = await fetch("http://localhost:8000/", { method: "GET", signal: AbortSignal.timeout(1000) });
    isBackendOnline = res.ok;
  } catch {
    isBackendOnline = false;
  }
}

// Call health check on import
if (typeof window !== "undefined") {
  checkBackendHealth();
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  await checkBackendHealth();

  if (isBackendOnline) {
    try {
      // Include cookies automatically for secure HTTPOnly session tokens
      options.credentials = "include";
      
      const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Server communication error.");
      }
      return await response.json();
    } catch (err: any) {
      if (err.message && err.message.includes("Failed to fetch")) {
        console.warn("Backend connection lost during request. Falling back to local mock data.");
        isBackendOnline = false;
      } else {
        throw err;
      }
    }
  }

  // Graceful Local Mock Fallbacks (Offline Mode)
  console.info(`[Offline Mode] Intercepting request to ${endpoint}`);
  
  if (endpoint.startsWith("/auth/me")) {
    // Return dummy authenticated user
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) throw new Error("Unauthorized");
    return {
      id: 1,
      email: "haneef@example.com",
      full_name: localStorage.getItem("fullName") || "Haneef Shaik",
      phone: "+91 9876543210",
      country: "India",
      role: "user",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      created_at: new Date().toISOString()
    };
  }

  if (endpoint.startsWith("/auth/login")) {
    const body = JSON.parse(options.body as string);
    if (body.email === "haneef@example.com" && body.password === "password123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("fullName", "Haneef Shaik");
      return {
        message: "Successfully logged in!",
        token: "mock-jwt-token-xyz",
        user: {
          id: 1,
          email: "haneef@example.com",
          full_name: "Haneef Shaik",
          role: "user"
        }
      };
    }
    throw new Error("Invalid email or password combination.");
  }

  if (endpoint.startsWith("/auth/register")) {
    const body = JSON.parse(options.body as string);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("fullName", body.full_name);
    return {
      id: 1,
      email: body.email,
      full_name: body.full_name,
      role: "user"
    };
  }

  if (endpoint.startsWith("/auth/logout")) {
    localStorage.removeItem("isLoggedIn");
    return { message: "Successfully logged out!" };
  }

  if (endpoint.startsWith("/destinations/")) {
    const destId = endpoint.split("/")[2];
    const match = destinations.find(d => d.id === destId);
    if (!match) throw new Error("Destination not found.");
    return match;
  }

  if (endpoint.startsWith("/destinations")) {
    return destinations;
  }

  if (endpoint.startsWith("/hotels")) {
    const urlParams = new URLSearchParams(endpoint.split("?")[1] || "");
    const destId = urlParams.get("destination_id");
    return destId ? (mockHotels[destId] || []) : Object.values(mockHotels).flat();
  }

  if (endpoint.startsWith("/restaurants")) {
    const urlParams = new URLSearchParams(endpoint.split("?")[1] || "");
    const destId = urlParams.get("destination_id");
    return destId ? (mockRestaurants[destId] || []) : Object.values(mockRestaurants).flat();
  }

  if (endpoint.startsWith("/places")) {
    const urlParams = new URLSearchParams(endpoint.split("?")[1] || "");
    const destId = urlParams.get("destination_id");
    return destId ? (mockAttractions[destId] || []) : Object.values(mockAttractions).flat();
  }

  if (endpoint.startsWith("/dashboard/summary")) {
    return {
      trips_count: 2,
      wishlist_count: 3,
      reviews_count: 4,
      membership_tier: "Gold Explorer",
      recent_searches_count: 3
    };
  }

  if (endpoint.startsWith("/notifications")) {
    return [
      {
        id: 1,
        title: "Welcome to FindTheWay!",
        message: "Your account is running in offline demo mode. Mock data is active.",
        is_read: false,
        created_at: new Date().toISOString()
      }
    ];
  }

  if (endpoint.startsWith("/trips")) {
    if (options.method === "POST") {
      const body = JSON.parse(options.body as string);
      return {
        id: Math.floor(Math.random() * 1000),
        user_id: 1,
        ...body,
        status: "upcoming",
        created_at: new Date().toISOString()
      };
    }
    // Return dummy list of user trips
    return [
      {
        id: 1,
        user_id: 1,
        title: "Family Getaway to Goa",
        destination_id: "goa",
        start_date: "2026-07-12",
        end_date: "2026-07-15",
        budget: 15000,
        travel_type: "family",
        status: "upcoming",
        created_at: new Date().toISOString()
      }
    ];
  }

  if (endpoint.startsWith("/search/autocomplete")) {
    const urlParams = new URLSearchParams(endpoint.split("?")[1] || "");
    const q = (urlParams.get("q") || "").toLowerCase();
    const suggestions = [];
    
    const dests = destinations.filter(d => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q));
    for (const d of dests) {
      suggestions.push({ id: d.id, name: d.name, type: "destination", state: d.state });
    }
    return suggestions;
  }

  return {};
}

export function getBackendStatus() {
  return isBackendOnline;
}
