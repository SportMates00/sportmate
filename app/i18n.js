// app/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome to My App!",
      subtitle: "Please log in or sign up to get started.",
      login: "Log In",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      loginBtn: "Login",
      signupBtn: "Sign Up",
      loginPage: "Login Page",
      signupPage: "Sign Up Page",
    }
  },
  am: {
    translation: {
      welcome: "Բարի Գալուստ Մեր ափ!",
      subtitle: "Por favor, inicie sesión o regístrese para comenzar.",
      login: "Մուտք",
      signup: "Գրանցվել",
      email: "Էլ. հասցե",
      password: "Գաղտնաբար",
      loginBtn: "Մուտք գործել",
      signupBtn: "Գրանցվել",
      loginPage: "Մուտքի Էջ",
      signupPage: "Գրանցվելու էջ",
    }
  },
  ru: {
    translation: {
      welcome: "Bienvenue dans mon application!",
      subtitle: "Veuillez vous connecter ou vous inscrire pour commencer.",
      login: "Se connecter",
      signup: "S'inscrire",
      email: "Email",
      password: "Password",
      loginBtn: "Login",
      signupBtn: "Sign Up",
      loginPage: "Login Page",
      signupPage: "Sign Up Page",
      
    }
  }
  // Add more languages as needed
};

i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources,
    lng: 'am', // Default language
    interpolation: {
      escapeValue: false, // Not needed for React
    },
  });

export default i18n;
