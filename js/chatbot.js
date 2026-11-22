(function () {
  if (typeof CHATBASE_ID === "undefined" || CHATBASE_ID === "" || CHATBASE_ID === "DAN_CHATBOT_ID_VAO_DAY") {
    console.info("Chatbot: chưa có CHATBASE_ID trong js/config.js — bỏ qua phần chatbot.");
    return;
  }

  window.embeddedChatbotConfig = { chatbotId: CHATBASE_ID, domain: "www.chatbase.co" };

  const the_script = document.createElement("script");
  the_script.src = "https://www.chatbase.co/embed.min.js";
  the_script.setAttribute("chatbotId", CHATBASE_ID);
  the_script.setAttribute("domain", "www.chatbase.co");
  the_script.defer = true;
  document.body.appendChild(the_script);
})();
