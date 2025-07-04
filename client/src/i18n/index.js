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
      "report_issue": "Report Issue",
      "admin_dashboard": "Admin Dashboard",
      "logout": "Logout",
      "issue_type": "Issue Type",
      "description": "Description",
      "location": "Location",
      "upload_image": "Upload Image",
      "status": "Status",
      "pending": "Pending",
      "in_progress": "In Progress",
      "resolved": "Resolved",
      // Add more keys here for all your text
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
      "report_issue": "समस्या रिपोर्ट करें",
      "admin_dashboard": "एडमिन डैशबोर्ड",
      "logout": "लॉग आउट",
      "issue_type": "समस्या का प्रकार",
      "description": "विवरण",
      "location": "स्थान",
      "upload_image": "छवि अपलोड करें",
      "status": "स्थिति",
      "pending": "लंबित",
      "in_progress": "प्रगति पर",
      "resolved": "सुलझा हुआ",
      // Add more keys here in Hindi
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
