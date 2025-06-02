// utils/utmUtils.ts

type UtmParams = {
  [key: string]: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

// Salva as UTMs da URL atual no localStorage
export const saveUtmsToLocalStorage = (): void => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  let utmsFound = false;

  UTM_KEYS.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      localStorage.setItem(key, value);
      utmsFound = true;
    }
  });

  // Opcional: marcar se UTMs foram salvas
  if (utmsFound) localStorage.setItem("utms_saved", "true");
};

// Recupera as UTMs do localStorage
export const getUtmsFromLocalStorage = (): UtmParams => {
  if (typeof window === "undefined") return {};

  const utms: UtmParams = {};

  UTM_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value) utms[key] = value;
  });

  return utms;
};

// Gera uma string de query com as UTMs salvas
export const generateUtmQueryString = (): string => {
  const utms = getUtmsFromLocalStorage();
  const params = new URLSearchParams(utms);
  return params.toString() ? `?${params.toString()}` : "";
};
