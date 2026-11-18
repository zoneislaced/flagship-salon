// CUSTOMISE THIS NUMBER with the salon's WhatsApp number in international format.
// Kenya example: 2547XXXXXXXX (digits only, no +, spaces or leading 0).
const WHATSAPP_NUMBER = "254700000000";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20), { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent selecting a date in the past.
const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
dateInput.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const details = [
    "Hello Maison Élise! I'd like to request an appointment.",
    "",
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Service: ${form.get("service")}`,
    `Preferred date: ${form.get("date")}`,
    `Preferred time: ${form.get("time")}`,
    `Notes: ${form.get("notes") || "None"}`
  ].join("\n");

  if (WHATSAPP_NUMBER === "254700000000") {
    alert("Before using bookings, open script.js and replace the placeholder WhatsApp number with the salon's real number.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
});
