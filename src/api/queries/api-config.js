const GYM_BRO_SERVICE = import.meta.env.VITE_GYM_BRO_SERVICE;
const GYM_API_KEY = import.meta.env.VITE_GYM_API_KEY;

/**
 *
 * @param {*} method
 * @param {*} domain
 * @param {*} data
 * @returns
 */
export const getApiConfig = (
  method,
  domain,
  data = {},
  params = {},
  pathParams = "",
) => {
  if (!domain) throw new Error("Domain not found");
  if (!GYM_BRO_SERVICE || !GYM_API_KEY) {
    console.error("Supabase environment variables are missing");
    throw new Error("Supabase environment variables are missing");
  }

  return {
    method,
    url: `${GYM_BRO_SERVICE}/${domain}/${pathParams}`,
    headers: {
      Authorization: `Bearer ${GYM_API_KEY}`,
      apikey: GYM_API_KEY,
      "Content-Type": "application/json",
    },
    ...(data && { data }),
    ...(params && { params }),
  };
};
