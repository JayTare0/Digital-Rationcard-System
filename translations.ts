
export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      apply: "Apply Now",
      status: "Check Status",
      contact: "Contact",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      admin: "Admin Panel",
      logout: "Logout"
    },
    home: {
      heroTitle: "Digital Ration Card System",
      heroSubtitle: "Empowering citizens through transparent and efficient digital distribution.",
      ctaApply: "New Application",
      ctaStatus: "Check Status",
      stats: {
        issued: "Cards Issued",
        active: "Active Users",
        villages: "Villages Covered",
        centers: "Fair Price Shops"
      },
      benefitsTitle: "Key Benefits",
      benefits: [
        { title: "Paperless Process", desc: "Completely digital and eco-friendly application process." },
        { title: "Transparency", desc: "Real-time tracking of your application and rations." },
        { title: "Multi-language Support", desc: "Access services in English, Hindi, or Marathi." },
        { title: "Secure Data", desc: "Your personal information is protected by industry standards." }
      ]
    },
    apply: {
      title: "New Ration Card Application",
      steps: ["Personal", "Address", "Card Details", "Family", "Review"],
      personal: {
        title: "Personal Information",
        fullName: "Full Name",
        fatherName: "Father's/Husband's Name",
        dob: "Date of Birth",
        gender: "Gender",
        mobile: "Mobile Number",
        email: "Email Address",
        aadhar: "Aadhar Number (12 Digits)"
      },
      address: {
        title: "Address Details",
        line1: "Address Line 1",
        line2: "Address Line 2",
        city: "City",
        state: "State",
        pincode: "Pincode (6 Digits)"
      },
      details: {
        title: "Card Selection",
        type: "Select Card Type",
        income: "Annual Family Income (₹)",
        memberCount: "Number of Family Members"
      },
      family: {
        title: "Family Member Information",
        addMember: "Add Member",
        name: "Member Name",
        relation: "Relation",
        age: "Age",
        aadhar: "Aadhar No."
      }
    },
    status: {
      title: "Track Application Status",
      placeholder: "Enter Aadhar or Card Number",
      button: "Check Status",
      resultTitle: "Application Status Tracking",
      timeline: {
        applied: "Submitted on",
        verifying: "Under Verification",
        approved: "Approved on",
        rejected: "Rejected"
      }
    },
    common: {
      next: "Next",
      prev: "Previous",
      submit: "Submit Application",
      loading: "Processing...",
      error: "Something went wrong",
      success: "Operation successful",
      required: "This field is required"
    },
    about: {
      title: "About the Digital Ration Card",
      desc: "Revolutionizing food security through digital innovation. Our mission is to ensure that no citizen is left behind by providing a seamless, transparent, and multi-lingual platform for ration card management.",
      typesTitle: "Types of Ration Cards",
      types: {
        aay: {
          title: "Antyodaya Anna Yojana (AAY)",
          desc: "Issued to the poorest of poor families, identified by the State Govts. Entitled to 35kg of foodgrains per month at highly subsidized rates."
        },
        bpl: {
          title: "Below Poverty Line (BPL)",
          desc: "Issued to families living below the poverty line. Subsidy rates are determined by the central government."
        },
        apl: {
          title: "Above Poverty Line (APL)",
          desc: "Issued to households having an income above the poverty line. Entitlement depends on the availability of stock."
        }
      },
      eligibilityTitle: "Eligibility Criteria",
      eligibility: {
        citizenship: {
          title: "Citizenship",
          desc: "The applicant must be a permanent citizen of India and a resident of the state where applying."
        },
        family: {
          title: "Family Status",
          desc: "The applicant must not already possess a ration card in their name or any other family member's name."
        },
        income: {
          title: "Income Level",
          desc: "Application for specific card types (BPL/AAY) depends on the family's total annual income as per state guidelines."
        }
      }
    },
    contact: {
      title: "Get in Touch",
      desc: "Have queries or complaints regarding your ration card? Reach out to us through the form below or use our helpline numbers.",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
        sending: "Sending...",
        success: "Thank you! Your message has been received.",
        placeholders: {
          name: "John Doe",
          email: "john@example.com",
          subject: "How can we help?",
          message: "Write your query here..."
        }
      },
      office: {
        title: "Our Office",
        address: "Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001",
        phone: "011-23386666 / 23381414",
        hours: "Mon - Fri: 9:00 AM - 5:30 PM"
      },
      grievance: {
        title: "Grievance Cell",
        desc: "Facing issues with fair price shop owners? File a direct complaint with our grievance officer.",
        call: "Call 1967 (Toll Free)"
      }
    }
  },
  hi: {
    nav: {
      home: "मुखपृष्ठ",
      about: "हमारे बारे में",
      apply: "अभी आवेदन करें",
      status: "स्थिति जांचें",
      contact: "संपर्क करें",
      login: "लॉगिन",
      register: "पंजीकरण",
      dashboard: "डैशबोर्ड",
      admin: "एडमिन पैनल",
      logout: "लॉगआउट"
    },
    home: {
      heroTitle: "डिजिटल राशन कार्ड प्रणाली",
      heroSubtitle: "पारदर्शी और कुशल डिजिटल वितरण के माध्यम से नागरिकों को सशक्त बनाना।",
      ctaApply: "नया आवेदन",
      ctaStatus: "स्थिति जांचें",
      stats: {
        issued: "जारी किए गए कार्ड",
        active: "सक्रिय उपयोगकर्ता",
        villages: "कवर किए गए गांव",
        centers: "उचित मूल्य की दुकानें"
      },
      benefitsTitle: "प्रमुख लाभ",
      benefits: [
        { title: "कागज रहित प्रक्रिया", desc: "पूरी तरह से डिजिटल और पर्यावरण के अनुकूल आवेदन प्रक्रिया।" },
        { title: "पारदर्शिता", desc: "आपके आवेदन और राशन की रीयल-टाइम ट्रैकिंग।" },
        { title: "बहुभाषी समर्थन", desc: "अंग्रेजी, हिंदी या मराठी में सेवाओं का उपयोग करें।" },
        { title: "सुरक्षित डेटा", desc: "आपकी व्यक्तिगत जानकारी उद्योग मानकों द्वारा सुरक्षित है।" }
      ]
    },
    apply: {
      title: "नया राशन कार्ड आवेदन",
      steps: ["व्यक्तिगत", "पता", "कार्ड विवरण", "परिवार", "समीक्षा"],
      personal: {
        title: "व्यक्तिगत जानकारी",
        fullName: "पूरा नाम",
        fatherName: "पिता/पति का नाम",
        dob: "जन्म तिथि",
        gender: "लिंग",
        mobile: "मोबाइल नंबर",
        email: "ईमेल पता",
        aadhar: "आधार नंबर (12 अंक)"
      },
      address: {
        title: "पते का विवरण",
        line1: "पता पंक्ति 1",
        line2: "पता पंक्ति 2",
        city: "शहर",
        state: "राज्य",
        pincode: "पिनकोड (6 अंक)"
      },
      details: {
        title: "कार्ड चयन",
        type: "कार्ड प्रकार चुनें",
        income: "वार्षिक पारिवारिक आय (₹)",
        memberCount: "परिवार के सदस्यों की संख्या"
      },
      family: {
        title: "परिवार के सदस्यों की जानकारी",
        addMember: "सदस्य जोड़ें",
        name: "सदस्य का नाम",
        relation: "संबंध",
        age: "आयु",
        aadhar: "आधार नंबर"
      }
    },
    status: {
      title: "आवेदन की स्थिति ट्रैक करें",
      placeholder: "आधार या कार्ड नंबर दर्ज करें",
      button: "स्थिति जांचें",
      resultTitle: "आवेदन स्थिति ट्रैकिंग",
      timeline: {
        applied: "को सबमिट किया गया",
        verifying: "सत्यापन के अधीन",
        approved: "को स्वीकृत",
        rejected: "अस्वीकृत"
      }
    },
    common: {
      next: "अगला",
      prev: "पिछला",
      submit: "आवेदन जमा करें",
      loading: "प्रक्रिया चल रही है...",
      error: "कुछ गलत हो गया",
      success: "सफल संचालन",
      required: "यह फ़ील्ड आवश्यक है"
    },
    about: {
      title: "डिजिटल राशन कार्ड के बारे में",
      desc: "डिजिटल नवाचार के माध्यम से खाद्य सुरक्षा में क्रांति लाना। हमारा मिशन नागरिकों को राशन कार्ड प्रबंधन के लिए एक सहज, पारदर्शी और बहुभाषी मंच प्रदान करके यह सुनिश्चित करना है कि कोई भी नागरिक पीछे न छूटे।",
      typesTitle: "राशन कार्ड के प्रकार",
      types: {
        aay: {
          title: "अंत्योदय अन्न योजना (AAY)",
          desc: "राज्य सरकारों द्वारा पहचाने गए सबसे गरीब परिवारों को जारी किया जाता है। अत्यधिक सब्सिडी वाली दरों पर प्रति माह 35 किलोग्राम अनाज के हकदार।"
        },
        bpl: {
          title: "गरीबी रेखा से नीचे (BPL)",
          desc: "गरीबी रेखा से नीचे रहने वाले परिवारों को जारी किया जाता है। सब्सिडी दरें केंद्र सरकार द्वारा निर्धारित की जाती हैं।"
        },
        apl: {
          title: "गरीबी रेखा से ऊपर (APL)",
          desc: "गरीबी रेखा से ऊपर आय वाले परिवारों को जारी किया जाता है। पात्रता स्टॉक की उपलब्धता पर निर्भर करती है।"
        }
      },
      eligibilityTitle: "पात्रता मानदंड",
      eligibility: {
        citizenship: {
          title: "नागरिकता",
          desc: "आवेदक को भारत का स्थायी नागरिक होना चाहिए और उस राज्य का निवासी होना चाहिए जहां आवेदन कर रहा है।"
        },
        family: {
          title: "परिवार की स्थिति",
          desc: "आवेदक के पास पहले से अपने या परिवार के किसी अन्य सदस्य के नाम पर राशन कार्ड नहीं होना चाहिए।"
        },
        income: {
          title: "आय स्तर",
          desc: "विशिष्ट कार्ड प्रकारों (BPL/AAY) के लिए आवेदन राज्य के दिशानिर्देशों के अनुसार परिवार की कुल वार्षिक आय पर निर्भर करता है।"
        }
      }
    },
    contact: {
      title: "संपर्क करें",
      desc: "क्या आपके राशन कार्ड के बारे में कोई प्रश्न या शिकायत है? नीचे दिए गए फॉर्म के माध्यम से हमसे संपर्क करें या हमारे हेल्पलाइन नंबरों का उपयोग करें।",
      form: {
        name: "पूरा नाम",
        email: "ईमेल पता",
        subject: "विषय",
        message: "संदेश",
        submit: "संदेश भेजें",
        sending: "भेज रहा है...",
        success: "धन्यवाद! आपका संदेश प्राप्त हो गया है।",
        placeholders: {
          name: "जॉन डो",
          email: "john@example.com",
          subject: "हम कैसे मदद कर सकते हैं?",
          message: "अपना प्रश्न यहाँ लिखें..."
        }
      },
      office: {
        title: "हमारा कार्यालय",
        address: "कृषि भवन, डॉ. राजेंद्र प्रसाद रोड, नई दिल्ली - 110001",
        phone: "011-23386666 / 23381414",
        hours: "सोम - शुक्र: सुबह 9:00 - शाम 5:30"
      },
      grievance: {
        title: "शिकायत प्रकोष्ठ",
        desc: "उचित मूल्य की दुकान के मालिकों के साथ समस्याओं का सामना करना पड़ रहा है? हमारे शिकायत अधिकारी के पास सीधी शिकायत दर्ज करें।",
        call: "कॉल करें 1967 (टोल फ्री)"
      }
    }
  },
  mr: {
    nav: {
      home: "होम",
      about: "आमच्याबद्दल",
      apply: "आताच अर्ज करा",
      status: "स्थिती तपासा",
      contact: "संपर्क",
      login: "लॉगिन",
      register: "नोंदणी",
      dashboard: "डॅशबोर्ड",
      admin: "प्रशासक पॅनेल",
      logout: "लॉगआउट"
    },
    home: {
      heroTitle: "डिजिटल रेशन कार्ड प्रणाली",
      heroSubtitle: "पारदर्शक आणि कार्यक्षम डिजिटल वितरणाद्वारे नागरिकांचे सक्षमीकरण.",
      ctaApply: "नवीन अर्ज",
      ctaStatus: "स्थिती तपासा",
      stats: {
        issued: "कार्ड जारी केले",
        active: "सक्रिय वापरकर्ते",
        villages: "गावे समाविष्ट",
        centers: "स्तस्त धान्य दुकाने"
      },
      benefitsTitle: "प्रमुख फायदे",
      benefits: [
        { title: "कागदविरहित प्रक्रिया", desc: "पूर्णपणे डिजिटल आणि पर्यावरणास अनुकूल अर्ज प्रक्रिया." },
        { title: "पारदर्शकता", desc: "तुमच्या अर्जाचा आणि रेशनचा रिअल-टाइम मागोवा." },
        { title: "बहुभाषिक समर्थन", desc: "इंग्रजी, हिंदी किंवा मराठीत सेवा मिळवा." },
        { title: "सुरक्षित डेटा", desc: "तुमची वैयक्तिक माहिती सुरक्षित आहे." }
      ]
    },
    apply: {
      title: "नवीन रेशन कार्ड अर्ज",
      steps: ["वैयक्तिक", "पत्ता", "कार्ड तपशील", "कुटुंब", "पुनरावलोकन"],
      personal: {
        title: "वैयक्तिक माहिती",
        fullName: "पूर्ण नाव",
        fatherName: "वडील/पतीचे नाव",
        dob: "जन्म तारीख",
        gender: "लिंग",
        mobile: "मोबाईल नंबर",
        email: "ईमेल पत्ता",
        aadhar: "आधार नंबर (१२ अंक)"
      },
      address: {
        title: "पत्त्याचा तपशील",
        line1: "पत्ता ओळ १",
        line2: "पत्ता ओळ २",
        city: "शहर",
        state: "राज्य",
        pincode: "पिनकोड (६ अंक)"
      },
      details: {
        title: "कार्ड निवड",
        type: "कार्ड प्रकार निवडा",
        income: "वार्षिक कौटुंबिक उत्पन्न (₹)",
        memberCount: "कुटुंब सदस्यांची संख्या"
      },
      family: {
        title: "कुटुंब सदस्यांची माहिती",
        addMember: "सदस्य जोडा",
        name: "सदस्याचे नाव",
        relation: "नाते",
        age: "वय",
        aadhar: "आधार नंबर"
      }
    },
    status: {
      title: "अर्ज स्थिती मागोवा",
      placeholder: "आधार किंवा कार्ड नंबर प्रविष्ट करा",
      button: "स्थिती तपासा",
      resultTitle: "अर्ज स्थिती ट्रॅकिंग",
      timeline: {
        applied: "रोजी सबमिट केले",
        verifying: "पडताळणी सुरू",
        approved: "रोजी मंजूर",
        rejected: "नाकारले"
      }
    },
    common: {
      next: "पुढील",
      prev: "मागील",
      submit: "अर्ज सादर करा",
      loading: "प्रक्रिया सुरू आहे...",
      error: "काहीतरी चुकले",
      success: "यशस्वी प्रक्रिया",
      required: "हे क्षेत्र आवश्यक आहे"
    },
    about: {
      title: "डिजिटल रेशन कार्ड बद्दल",
      desc: "डिजिटल नवोपक्रमाद्वारे अन्न सुरक्षेत क्रांती घडवून आणणे. आमचे ध्येय हे सुनिश्चित करणे आहे की रेशन कार्ड व्यवस्थापनासाठी एक अखंड, पारदर्शक आणि बहुभाषिक व्यासपीठ प्रदान करून कोणताही नागरिक मागे राहणार नाही.",
      typesTitle: "रेशन कार्ड्सचे प्रकार",
      types: {
        aay: {
          title: "अंत्योदय अन्न योजना (AAY)",
          desc: "राज्य सरकारांनी ओळखलेल्या सर्वात गरीब कुटुंबांना जारी केले जाते. अत्यंत अनुदानित दराने दरमहा ३५ किलो अन्नधान्यासाठी पात्र."
        },
        bpl: {
          title: "दारिद्र्य रेषेखालील (BPL)",
          desc: "दारिद्र्य रेषेखालील कुटुंबांना जारी केले जाते. अनुदानाचे दर केंद्र सरकारने ठरवले आहेत."
        },
        apl: {
          title: "दारिद्र्य रेषेवरील (APL)",
          desc: "दारिद्र्य रेषेपेक्षा जास्त उत्पन्न असलेल्या कुटुंबांना जारी केले जाते. पात्रता साठ्याच्या उपलब्धतेवर अवलंबून असते."
        }
      },
      eligibilityTitle: "पात्रता निकष",
      eligibility: {
        citizenship: {
          title: "नागरिकत्व",
          desc: "अर्जदार भारताचा कायमचा नागरिक आणि अर्ज करत असलेल्या राज्याचा निवासी असणे आवश्यक आहे."
        },
        family: {
          title: "कौटुंबिक स्थिती",
          desc: "अर्जदाराकडे आधीच स्वतःच्या किंवा कुटुंबातील इतर कोणत्याही सदस्याच्या नावावर रेशन कार्ड नसावे."
        },
        income: {
          title: "उत्पन्न पातळी",
          desc: "विशिष्ट कार्ड प्रकारांसाठी (BPL/AAY) अर्ज राज्य मार्गदर्शक तत्त्वांनुसार कुटुंबाच्या एकूण वार्षिक उत्पन्नावर अवलंबून असतो."
        }
      }
    },
    contact: {
      title: "संपर्क साधा",
      desc: "तुमच्या रेशन कार्डाबाबत काही प्रश्न किंवा तक्रारी आहेत का? खालील फॉर्मद्वारे आमच्याशी संपर्क साधा किंवा आमचे हेल्पलाइन नंबर वापरा.",
      form: {
        name: "पूर्ण नाव",
        email: "ईमेल पत्ता",
        subject: "विषय",
        message: "संदेश",
        submit: "संदेश पाठवा",
        sending: "पाठवत आहे...",
        success: "धन्यवाद! तुमचा संदेश प्राप्त झाला आहे.",
        placeholders: {
          name: "जॉन डो",
          email: "john@example.com",
          subject: "आम्ही कशी मदत करू शकतो?",
          message: "तुमचा प्रश्न येथे लिहा..."
        }
      },
      office: {
        title: "आमचे कार्यालय",
        address: "कृषी भवन, डॉ. राजेंद्र प्रसाद मार्ग, नवी दिल्ली - ११०००१",
        phone: "०११-२३३८६६६६ / २३३८१४१४",
        hours: "सोम - शुक्र: सकाळी ९:०० - संध्याकाळी ५:३०"
      },
      grievance: {
        title: "तक्रार निवारण कक्ष",
        desc: "स्वस्त धान्य दुकान मालकांकडून समस्या भेडसावत आहेत? आमच्या तक्रार निवारण अधिकाऱ्याकडे थेट तक्रार नोंदवा.",
        call: "कॉल करा १९६७ (टोल फ्री)"
      }
    }
  }
};
