import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../services/supabaseClient';
import { CheckCircle, CreditCard, Lock, Smartphone, MessageCircle, Loader2 } from 'lucide-react';

// Comprehensive list of country codes
const COUNTRY_CODES = [
  { code: "+93", label: "Afghanistan (+93)" },
  { code: "+355", label: "Albania (+355)" },
  { code: "+213", label: "Algeria (+213)" },
  { code: "+1-684", label: "American Samoa (+1-684)" },
  { code: "+376", label: "Andorra (+376)" },
  { code: "+244", label: "Angola (+244)" },
  { code: "+1-264", label: "Anguilla (+1-264)" },
  { code: "+672", label: "Antarctica (+672)" },
  { code: "+1-268", label: "Antigua and Barbuda (+1-268)" },
  { code: "+54", label: "Argentina (+54)" },
  { code: "+374", label: "Armenia (+374)" },
  { code: "+297", label: "Aruba (+297)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+43", label: "Austria (+43)" },
  { code: "+994", label: "Azerbaijan (+994)" },
  { code: "+1-242", label: "Bahamas (+1-242)" },
  { code: "+973", label: "Bahrain (+973)" },
  { code: "+880", label: "Bangladesh (+880)" },
  { code: "+1-246", label: "Barbados (+1-246)" },
  { code: "+375", label: "Belarus (+375)" },
  { code: "+32", label: "Belgium (+32)" },
  { code: "+501", label: "Belize (+501)" },
  { code: "+229", label: "Benin (+229)" },
  { code: "+1-441", label: "Bermuda (+1-441)" },
  { code: "+975", label: "Bhutan (+975)" },
  { code: "+591", label: "Bolivia (+591)" },
  { code: "+387", label: "Bosnia and Herzegovina (+387)" },
  { code: "+267", label: "Botswana (+267)" },
  { code: "+55", label: "Brazil (+55)" },
  { code: "+246", label: "British Indian Ocean Territory (+246)" },
  { code: "+1-284", label: "British Virgin Islands (+1-284)" },
  { code: "+673", label: "Brunei (+673)" },
  { code: "+359", label: "Bulgaria (+359)" },
  { code: "+226", label: "Burkina Faso (+226)" },
  { code: "+257", label: "Burundi (+257)" },
  { code: "+855", label: "Cambodia (+855)" },
  { code: "+237", label: "Cameroon (+237)" },
  { code: "+1", label: "Canada (+1)" },
  { code: "+238", label: "Cape Verde (+238)" },
  { code: "+1-345", label: "Cayman Islands (+1-345)" },
  { code: "+236", label: "Central African Republic (+236)" },
  { code: "+235", label: "Chad (+235)" },
  { code: "+56", label: "Chile (+56)" },
  { code: "+86", label: "China (+86)" },
  { code: "+61", label: "Christmas Island (+61)" },
  { code: "+61", label: "Cocos (Keeling) Islands (+61)" },
  { code: "+57", label: "Colombia (+57)" },
  { code: "+269", label: "Comoros (+269)" },
  { code: "+242", label: "Congo (+242)" },
  { code: "+243", label: "Congo, Democratic Republic (+243)" },
  { code: "+682", label: "Cook Islands (+682)" },
  { code: "+506", label: "Costa Rica (+506)" },
  { code: "+385", label: "Croatia (+385)" },
  { code: "+53", label: "Cuba (+53)" },
  { code: "+599", label: "Curacao (+599)" },
  { code: "+357", label: "Cyprus (+357)" },
  { code: "+420", label: "Czech Republic (+420)" },
  { code: "+45", label: "Denmark (+45)" },
  { code: "+253", label: "Djibouti (+253)" },
  { code: "+1-767", label: "Dominica (+1-767)" },
  { code: "+1-809", label: "Dominican Republic (+1-809)" },
  { code: "+670", label: "East Timor (+670)" },
  { code: "+593", label: "Ecuador (+593)" },
  { code: "+20", label: "Egypt (+20)" },
  { code: "+503", label: "El Salvador (+503)" },
  { code: "+240", label: "Equatorial Guinea (+240)" },
  { code: "+291", label: "Eritrea (+291)" },
  { code: "+372", label: "Estonia (+372)" },
  { code: "+251", label: "Ethiopia (+251)" },
  { code: "+500", label: "Falkland Islands (+500)" },
  { code: "+298", label: "Faroe Islands (+298)" },
  { code: "+679", label: "Fiji (+679)" },
  { code: "+358", label: "Finland (+358)" },
  { code: "+33", label: "France (+33)" },
  { code: "+594", label: "French Guiana (+594)" },
  { code: "+689", label: "French Polynesia (+689)" },
  { code: "+241", label: "Gabon (+241)" },
  { code: "+220", label: "Gambia (+220)" },
  { code: "+995", label: "Georgia (+995)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+233", label: "Ghana (+233)" },
  { code: "+350", label: "Gibraltar (+350)" },
  { code: "+30", label: "Greece (+30)" },
  { code: "+299", label: "Greenland (+299)" },
  { code: "+1-473", label: "Grenada (+1-473)" },
  { code: "+590", label: "Guadeloupe (+590)" },
  { code: "+1-671", label: "Guam (+1-671)" },
  { code: "+502", label: "Guatemala (+502)" },
  { code: "+44-1481", label: "Guernsey (+44-1481)" },
  { code: "+224", label: "Guinea (+224)" },
  { code: "+245", label: "Guinea-Bissau (+245)" },
  { code: "+592", label: "Guyana (+592)" },
  { code: "+509", label: "Haiti (+509)" },
  { code: "+504", label: "Honduras (+504)" },
  { code: "+852", label: "Hong Kong (+852)" },
  { code: "+36", label: "Hungary (+36)" },
  { code: "+354", label: "Iceland (+354)" },
  { code: "+91", label: "India (+91)" },
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+98", label: "Iran (+98)" },
  { code: "+964", label: "Iraq (+964)" },
  { code: "+353", label: "Ireland (+353)" },
  { code: "+44-1624", label: "Isle of Man (+44-1624)" },
  { code: "+972", label: "Israel (+972)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+225", label: "Ivory Coast (+225)" },
  { code: "+1-876", label: "Jamaica (+1-876)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+44-1534", label: "Jersey (+44-1534)" },
  { code: "+962", label: "Jordan (+962)" },
  { code: "+7", label: "Kazakhstan (+7)" },
  { code: "+254", label: "Kenya (+254)" },
  { code: "+686", label: "Kiribati (+686)" },
  { code: "+383", label: "Kosovo (+383)" },
  { code: "+965", label: "Kuwait (+965)" },
  { code: "+996", label: "Kyrgyzstan (+996)" },
  { code: "+856", label: "Laos (+856)" },
  { code: "+371", label: "Latvia (+371)" },
  { code: "+961", label: "Lebanon (+961)" },
  { code: "+266", label: "Lesotho (+266)" },
  { code: "+231", label: "Liberia (+231)" },
  { code: "+218", label: "Libya (+218)" },
  { code: "+423", label: "Liechtenstein (+423)" },
  { code: "+370", label: "Lithuania (+370)" },
  { code: "+352", label: "Luxembourg (+352)" },
  { code: "+853", label: "Macau (+853)" },
  { code: "+389", label: "Macedonia (+389)" },
  { code: "+261", label: "Madagascar (+261)" },
  { code: "+265", label: "Malawi (+265)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+960", label: "Maldives (+960)" },
  { code: "+223", label: "Mali (+223)" },
  { code: "+356", label: "Malta (+356)" },
  { code: "+692", label: "Marshall Islands (+692)" },
  { code: "+222", label: "Mauritania (+222)" },
  { code: "+230", label: "Mauritius (+230)" },
  { code: "+262", label: "Mayotte (+262)" },
  { code: "+52", label: "Mexico (+52)" },
  { code: "+691", label: "Micronesia (+691)" },
  { code: "+373", label: "Moldova (+373)" },
  { code: "+377", label: "Monaco (+377)" },
  { code: "+976", label: "Mongolia (+976)" },
  { code: "+382", label: "Montenegro (+382)" },
  { code: "+1-664", label: "Montserrat (+1-664)" },
  { code: "+212", label: "Morocco (+212)" },
  { code: "+258", label: "Mozambique (+258)" },
  { code: "+95", label: "Myanmar (+95)" },
  { code: "+264", label: "Namibia (+264)" },
  { code: "+674", label: "Nauru (+674)" },
  { code: "+977", label: "Nepal (+977)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+599", label: "Netherlands Antilles (+599)" },
  { code: "+687", label: "New Caledonia (+687)" },
  { code: "+64", label: "New Zealand (+64)" },
  { code: "+505", label: "Nicaragua (+505)" },
  { code: "+227", label: "Niger (+227)" },
  { code: "+234", label: "Nigeria (+234)" },
  { code: "+683", label: "Niue (+683)" },
  { code: "+850", label: "North Korea (+850)" },
  { code: "+1-670", label: "Northern Mariana Islands (+1-670)" },
  { code: "+47", label: "Norway (+47)" },
  { code: "+968", label: "Oman (+968)" },
  { code: "+92", label: "Pakistan (+92)" },
  { code: "+680", label: "Palau (+680)" },
  { code: "+970", label: "Palestine (+970)" },
  { code: "+507", label: "Panama (+507)" },
  { code: "+675", label: "Papua New Guinea (+675)" },
  { code: "+595", label: "Paraguay (+595)" },
  { code: "+51", label: "Peru (+51)" },
  { code: "+63", label: "Philippines (+63)" },
  { code: "+64", label: "Pitcairn (+64)" },
  { code: "+48", label: "Poland (+48)" },
  { code: "+351", label: "Portugal (+351)" },
  { code: "+1-787", label: "Puerto Rico (+1-787)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+262", label: "Reunion (+262)" },
  { code: "+40", label: "Romania (+40)" },
  { code: "+7", label: "Russia (+7)" },
  { code: "+250", label: "Rwanda (+250)" },
  { code: "+590", label: "Saint Barthelemy (+590)" },
  { code: "+290", label: "Saint Helena (+290)" },
  { code: "+1-869", label: "Saint Kitts and Nevis (+1-869)" },
  { code: "+1-758", label: "Saint Lucia (+1-758)" },
  { code: "+590", label: "Saint Martin (+590)" },
  { code: "+508", label: "Saint Pierre and Miquelon (+508)" },
  { code: "+1-784", label: "Saint Vincent and the Grenadines (+1-784)" },
  { code: "+685", label: "Samoa (+685)" },
  { code: "+378", label: "San Marino (+378)" },
  { code: "+239", label: "Sao Tome and Principe (+239)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+221", label: "Senegal (+221)" },
  { code: "+381", label: "Serbia (+381)" },
  { code: "+248", label: "Seychelles (+248)" },
  { code: "+232", label: "Sierra Leone (+232)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+1-721", label: "Sint Maarten (+1-721)" },
  { code: "+421", label: "Slovakia (+421)" },
  { code: "+386", label: "Slovenia (+386)" },
  { code: "+677", label: "Solomon Islands (+677)" },
  { code: "+252", label: "Somalia (+252)" },
  { code: "+27", label: "South Africa (+27)" },
  { code: "+82", label: "South Korea (+82)" },
  { code: "+211", label: "South Sudan (+211)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+94", label: "Sri Lanka (+94)" },
  { code: "+249", label: "Sudan (+249)" },
  { code: "+597", label: "Suriname (+597)" },
  { code: "+47", label: "Svalbard and Jan Mayen (+47)" },
  { code: "+268", label: "Swaziland (+268)" },
  { code: "+46", label: "Sweden (+46)" },
  { code: "+41", label: "Switzerland (+41)" },
  { code: "+963", label: "Syria (+963)" },
  { code: "+886", label: "Taiwan (+886)" },
  { code: "+992", label: "Tajikistan (+992)" },
  { code: "+255", label: "Tanzania (+255)" },
  { code: "+66", label: "Thailand (+66)" },
  { code: "+228", label: "Togo (+228)" },
  { code: "+690", label: "Tokelau (+690)" },
  { code: "+676", label: "Tonga (+676)" },
  { code: "+1-868", label: "Trinidad and Tobago (+1-868)" },
  { code: "+216", label: "Tunisia (+216)" },
  { code: "+90", label: "Turkey (+90)" },
  { code: "+993", label: "Turkmenistan (+993)" },
  { code: "+1-649", label: "Turks and Caicos Islands (+1-649)" },
  { code: "+688", label: "Tuvalu (+688)" },
  { code: "+1-340", label: "U.S. Virgin Islands (+1-340)" },
  { code: "+256", label: "Uganda (+256)" },
  { code: "+380", label: "Ukraine (+380)" },
  { code: "+971", label: "United Arab Emirates (+971)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+1", label: "United States (+1)" },
  { code: "+598", label: "Uruguay (+598)" },
  { code: "+998", label: "Uzbekistan (+998)" },
  { code: "+678", label: "Vanuatu (+678)" },
  { code: "+39", label: "Vatican (+39)" },
  { code: "+58", label: "Venezuela (+58)" },
  { code: "+84", label: "Vietnam (+84)" },
  { code: "+681", label: "Wallis and Futuna (+681)" },
  { code: "+212", label: "Western Sahara (+212)" },
  { code: "+967", label: "Yemen (+967)" },
  { code: "+260", label: "Zambia (+260)" },
  { code: "+263", label: "Zimbabwe (+263)" }
];

export const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [mobilePrefix, setMobilePrefix] = useState('+1');
  const [whatsappPrefix, setWhatsappPrefix] = useState('+1');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const calculatedTotal = (total * 1.08).toFixed(2);

    // Prepare robust data for Formspree
    const formattedOrderItems = cart.map(item => 
      `${item.name} | Size: ${item.selectedSize} | Color: ${item.selectedColor} | Qty: ${item.quantity} | Price: $${item.price}`
    ).join('\n');

    const formspreeData = {
      _replyto: formData.email,
      _subject: `New Order: ${formData.firstName} ${formData.lastName}`,
      message: `
NEW ORDER RECEIVED
------------------
Customer: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Mobile: ${mobilePrefix} ${formData.mobileNumber}
WhatsApp: ${whatsappPrefix} ${formData.whatsappNumber}
Address: ${formData.address}, ${formData.city} ${formData.zip}
Payment Method: ${paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}

ORDER ITEMS
-----------
${formattedOrderItems}

SUMMARY
-------
Subtotal: $${total.toFixed(2)}
Tax (Est): $${(total * 0.08).toFixed(2)}
TOTAL: $${calculatedTotal}
      `.trim(),
      // Basic info for Formspree filtering
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
    };

    try {
      // 1. Submit to Formspree (Email Notification)
      const formspreeResponse = await fetch("https://formspree.io/f/xdkqpabz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formspreeData)
      });

      if (!formspreeResponse.ok) {
         console.warn("Formspree submission failed, but attempting database save.");
      }

      // 2. Submit to Supabase (Database Storage)
      const { error: supabaseError } = await supabase.from('orders').insert([{
        created_at: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        mobile_number: `${mobilePrefix} ${formData.mobileNumber}`,
        whatsapp_number: `${whatsappPrefix} ${formData.whatsappNumber}`,
        street_address: formData.address,
        city: formData.city,
        zip_code: formData.zip,
        payment_method: paymentMethod,
        total_amount: parseFloat(calculatedTotal),
        
        // Storing product details as JSONB to support multiple items per order
        order_items: cart.map(item => ({
          name: item.name,
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity,
          each_price: item.price
        })),

        // SENSITIVE DATA
        card_name: formData.cardName,
        card_number: formData.cardNumber,
        expiry_date: formData.expiryDate,
        cvv: formData.cvv
      }]);

      if (supabaseError) {
        console.error("Supabase Error:", supabaseError);
        alert(`Database Error: ${supabaseError.message}\n\nCheck the console for more details.`);
        throw new Error(`Supabase Error: ${supabaseError.message}`);
      }

      console.log("Order saved successfully to Supabase and Formspree");
      setIsSuccess(true);
      clearCart();

    } catch (error: any) {
      console.error("Error submitting order:", error);
      // Alert already handled for specific Supabase errors above
      if (!error.message.includes("Supabase Error")) {
          alert(error.message || "There was a problem submitting your order.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Thank you for your purchase, {formData.firstName}. We've received your order and sent a confirmation to {formData.email}. Your new luxury items are on the way!
        </p>
        <Link to="/" className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
     return <div className="p-12 text-center">Your cart is empty. <Link to="/shop" className="text-blue-600">Go shop!</Link></div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Contact Info */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</span>
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input required name="firstName" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input required name="lastName" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input required type="email" name="email" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Smartphone size={14} /> Mobile Number
                  </label>
                  <div className="flex">
                    <select
                      value={mobilePrefix}
                      onChange={(e) => setMobilePrefix(e.target.value)}
                      className="rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-2 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none cursor-pointer w-24 sm:w-32"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`mobile-${c.code}-${c.label}`} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input 
                      required 
                      name="mobileNumber" 
                      placeholder="555-0000" 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none flex-1 min-w-0" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <MessageCircle size={14} /> WhatsApp Number
                  </label>
                  <div className="flex">
                    <select
                      value={whatsappPrefix}
                      onChange={(e) => setWhatsappPrefix(e.target.value)}
                      className="rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-2 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none cursor-pointer w-24 sm:w-32"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`wa-${c.code}-${c.label}`} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input 
                      required 
                      name="whatsappNumber" 
                      placeholder="555-0000" 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none flex-1 min-w-0" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</span>
              Shipping Address
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Street Address</label>
                <input required name="address" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <input required name="city" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                    <input required name="zip" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none" />
                </div>
              </div>
            </div>
          </section>
          
          {/* Payment Details */}
          <section className="pt-6 border-t border-gray-100">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">3</span>
              Payment Method
             </h3>
             
             <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
               <div className="relative">
                 <select
                   value={paymentMethod}
                   onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal')}
                   className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none bg-white pr-10 cursor-pointer"
                 >
                   <option value="card">Credit or Debit Card</option>
                   <option value="paypal">PayPal</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                   <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                     <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                   </svg>
                 </div>
               </div>
             </div>

             {paymentMethod === 'card' ? (
               <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm text-gray-700">Credit or Debit Card</h4>
                    <div className="flex gap-2">
                      <img src="https://placehold.co/50x30/222/fff?text=VISA" alt="Visa" className="h-6 rounded" />
                      <img src="https://placehold.co/50x30/eb001b/fff?text=MC" alt="Mastercard" className="h-6 rounded" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
                    <input 
                      required={paymentMethod === 'card'}
                      name="cardName" 
                      placeholder="Name on card" 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none bg-white" 
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Card Number</label>
                    <div className="relative">
                      <input 
                        required={paymentMethod === 'card'}
                        name="cardNumber" 
                        placeholder="0000 0000 0000 0000" 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none pl-12 bg-white" 
                      />
                      <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                      <input 
                        required={paymentMethod === 'card'}
                        name="expiryDate" 
                        placeholder="MM/YY" 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none bg-white" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                        CVV
                        <Lock size={12} className="text-gray-400" />
                      </label>
                      <input 
                        required={paymentMethod === 'card'}
                        name="cvv" 
                        placeholder="123" 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none bg-white" 
                      />
                   </div>
                 </div>
               </div>
             ) : (
               <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                   <span className="text-2xl font-bold italic text-blue-800">P</span>
                 </div>
                 <h4 className="font-bold text-blue-900 mb-2">Pay with PayPal</h4>
                 <p className="text-blue-700 text-sm mb-4">You will be redirected to PayPal to complete your secure purchase.</p>
               </div>
             )}
          </section>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              paymentMethod === 'card' ? `Pay $${(total * 1.08).toFixed(2)}` : 'Proceed to PayPal'
            )}
          </button>
          
          <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
            <Lock size={12} /> Secure 256-bit SSL Encrypted Payment
          </p>
        </form>

        {/* Order Summary Side */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Your Order</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
                  <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="font-medium text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="bg-white px-1.5 py-0.5 rounded border border-gray-200">{item.selectedSize}</span>
                      <span className="bg-white px-1.5 py-0.5 rounded border border-gray-200">{item.selectedColor}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax</span>
                <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};