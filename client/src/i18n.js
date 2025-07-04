import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "login": "Login",
      "register": "Register",
      "email": "Email",
      "password": "Password",
      "name": "Name",
      "submit": "Submit",
      "issue_type": "Issue Type",
      "description": "Description",
      "location": "Location",
      "upload_image": "Upload Image",
      "status": "Status",
      "pending": "Pending",
      "in_progress": "In Progress",
      "resolved": "Resolved",
      "logout": "Logout"
    }
  },
  hi: {
    translation: {
      "login": "लॉगिन",
      "register": "रजिस्टर करें",
      "email": "ईमेल",
      "password": "पासवर्ड",
      "name": "नाम",
      "submit": "जमा करें",
      "issue_type": "समस्या का प्रकार",
      "description": "विवरण",
      "location": "स्थान",
      "upload_image": "छवि अपलोड करें",
      "status": "स्थिति",
      "pending": "लंबित",
      "in_progress": "प्रगति पर",
      "resolved": "सुलझा हुआ",
      "logout": "लॉग आउट"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
