export const getApiConfig = (method, domain, data = {}) => {
  if (domain === undefined) throw new Error("Domain not found");

  return {
    method,
    url: `https://wfzjvttkycxqxbpyukba.supabase.co/functions/v1/${domain}`,
    headers: {
      Authorization: "Bearer sb_publishable_Ie30z4Mr4jaUf20c3_mDmA_g-gi9UH6",
      apikey: "sb_publishable_Ie30z4Mr4jaUf20c3_mDmA_g-gi9UH6",
      "Content-Type": "application/json",
    },
    ...(data && { data }),
  };
};
